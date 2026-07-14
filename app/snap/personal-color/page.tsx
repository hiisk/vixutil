'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ShareButton from '@/components/ShareButton';
import SaveResultCard from '@/components/SaveResultCard';
import { getPersonalColor, type PersonalColorResult } from '@/lib/personal-color-data';
import { rgbToLab } from '@/lib/color-lab';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';

// face-api 타입은 무겁고 이 페이지에서만 쓰이므로 동적 import로 코드분할한다
type FaceApiModule = typeof import('@vladmandic/face-api');

interface Point { x: number; y: number }
interface Landmarks68 {
  getJawOutline(): Point[];
  getNose(): Point[];
  getLeftEye(): Point[];
  getRightEye(): Point[];
}

function clampUnit(x: number) {
  return Math.max(0, Math.min(1, x));
}

/** 캔버스에서 지정한 사각형 영역의 평균 RGB를 구한다. */
function sampleAvgColor(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, maxW: number, maxH: number) {
  const half = size / 2;
  const x = Math.max(0, Math.min(maxW - size, cx - half));
  const y = Math.max(0, Math.min(maxH - size, cy - half));
  const w = Math.max(1, Math.min(size, maxW - x));
  const h = Math.max(1, Math.min(size, maxH - y));
  const { data } = ctx.getImageData(x, y, w, h);
  let r = 0, g = 0, b = 0;
  const n = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i]; g += data[i + 1]; b += data[i + 2];
  }
  return { r: r / n, g: g / n, b: b / n };
}

/** 캔버스에서 지정한 사각형 영역의 픽셀을 채널별 배열로 반환한다(중앙값 계산용). */
function samplePatchPixels(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, maxW: number, maxH: number) {
  const half = size / 2;
  const x = Math.max(0, Math.min(maxW - size, cx - half));
  const y = Math.max(0, Math.min(maxH - size, cy - half));
  const w = Math.max(1, Math.min(size, maxW - x));
  const h = Math.max(1, Math.min(size, maxH - y));
  const { data } = ctx.getImageData(x, y, w, h);
  const rs: number[] = [], gs: number[] = [], bs: number[] = [];
  for (let i = 0; i < data.length; i += 4) {
    rs.push(data[i]); gs.push(data[i + 1]); bs.push(data[i + 2]);
  }
  return { rs, gs, bs };
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * 사진 전체를 작게 축소해 평균 RGB를 구한다. 실내 백열등처럼 사진 전체에
 * 색이 낀 조명 아래에서는 볼 색도 그 색으로 물들어서, 실제로는 쿨톤인
 * 피부가 웜 조명 때문에 웜톤으로 잘못 측정되는 문제가 있었다(그 반대도
 * 마찬가지). "사진 전체 평균은 대체로 무채색에 가깝다"는 그레이월드
 * 가정으로 조명 색을 추정해 볼 색에서 역보정한다.
 */
function estimateSceneAverage(img: HTMLImageElement): { r: number; g: number; b: number } {
  const longSide = Math.max(img.naturalWidth, img.naturalHeight);
  const scale = Math.min(1, 100 / longSide);
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { r: 128, g: 128, b: 128 };
  ctx.drawImage(img, 0, 0, w, h);
  return sampleAvgColor(ctx, w / 2, h / 2, Math.max(w, h), w, h);
}

/** 그레이월드 가정으로 추정한 조명색을 이용해 표본 색에서 조명 색캐스트를 역보정한다. */
function whiteBalance(sample: { r: number; g: number; b: number }, sceneAvg: { r: number; g: number; b: number }) {
  const gray = (sceneAvg.r + sceneAvg.g + sceneAvg.b) / 3;
  const clamp255 = (v: number) => Math.max(0, Math.min(255, v));
  return {
    r: clamp255(sample.r * (gray / Math.max(1, sceneAvg.r))),
    g: clamp255(sample.g * (gray / Math.max(1, sceneAvg.g))),
    b: clamp255(sample.b * (gray / Math.max(1, sceneAvg.b))),
  };
}

/**
 * 볼 부위(눈 아래 · 턱선 안쪽, 눈·입·눈썹은 배제)의 픽셀을 실제로 샘플링해
 * 웜/쿨·선명도·명도 세 지수를 계산한다. 68포인트 랜드마크에는 피부색을 직접
 * 알려주는 좌표가 없으므로, 눈·코·잘선 좌표로 안전한 볼 영역을 추정한다.
 * 좌우 볼 패치의 픽셀을 하나로 모아 채널별 중앙값을 쓰는데, 평균보다
 * 안경 반사·잔머리·잡티 같은 이상치 픽셀에 덜 흔들린다.
 */
function measurePersonalColorRatios(img: HTMLImageElement, landmarks: Landmarks68): { warmthRatio: number; clarityRatio: number; valueRatio: number } {
  const jaw = landmarks.getJawOutline();
  const nose = landmarks.getNose();
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const noseBottomY = Math.max(...nose.map(p => p.y));
  const faceWidth = Math.max(...jaw.map(p => p.x)) - Math.min(...jaw.map(p => p.x));

  const cheekCenter = (eye: Point[], jawPt: Point): Point => {
    const eyeBottom = Math.max(...eye.map(p => p.y));
    const eyeCenterX = eye.reduce((s, p) => s + p.x, 0) / eye.length;
    return {
      x: (eyeCenterX + jawPt.x) / 2,
      y: (Math.max(eyeBottom, noseBottomY) + jawPt.y) / 2,
    };
  };

  const leftCheek = cheekCenter(leftEye, jaw[2]);
  const rightCheek = cheekCenter(rightEye, jaw[14]);

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { warmthRatio: 0.5, clarityRatio: 0.5, valueRatio: 0.5 };
  ctx.drawImage(img, 0, 0);

  const patchSize = Math.max(6, faceWidth * 0.12);
  const left = samplePatchPixels(ctx, leftCheek.x, leftCheek.y, patchSize, canvas.width, canvas.height);
  const right = samplePatchPixels(ctx, rightCheek.x, rightCheek.y, patchSize, canvas.width, canvas.height);
  const rawCheek = {
    r: median([...left.rs, ...right.rs]),
    g: median([...left.gs, ...right.gs]),
    b: median([...left.bs, ...right.bs]),
  };

  // 조명 색캐스트를 역보정한 볼 색으로 웜/쿨을 판단한다.
  const sceneAvg = estimateSceneAverage(img);
  const { r, g, b } = whiteBalance(rawCheek, sceneAvg);

  const lab = rgbToLab(r, g, b);

  // 웜/쿨: b*(노랑↔파랑)가 a*(빨강↔초록)보다 상대적으로 크면 노란빛이 강한 웜톤,
  // a*가 더 크면 붉은/핑크빛이 강한 쿨톤 쪽으로 본다.
  const warmthRatio = clampUnit(0.5 + (lab.b - lab.a) / 60);

  // 선명도: a*·b*로 만든 채도(Lab chroma)가 높을수록 클리어(봄/겨울),
  // 낮을수록 뮤트(가을/여름)한 쪽으로 본다.
  const chroma = Math.hypot(lab.a, lab.b);
  const clarityRatio = clampUnit((chroma - 10) / 35);

  // 명도: L*(밝기)가 높을수록 라이트, 낮을수록 딥한 쪽으로 본다.
  const valueRatio = clampUnit((lab.l - 30) / 55);

  return { warmthRatio, clarityRatio, valueRatio };
}

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = '사진 한 장으로 보는 퍼스널컬러(웜/쿨톤) 진단 — vixutil.com';
    if (navigator.share) {
      try { await navigator.share({ title: text, url }); return; } catch { /* 사용자가 취소한 경우 */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch { /* 클립보드 권한 없음 */ }
  }, []);

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 text-xs font-semibold border rounded-xl px-3 py-1.5 transition-all bg-white/20 dark:bg-slate-900/20 border-white/30 dark:border-slate-700/30 text-white hover:bg-white/30"
    >
      {state === 'copied' ? '복사됨 ✓' : '공유'}
    </button>
  );
}

type ModelState = 'loading' | 'ready' | 'error';

export default function PersonalColorPage() {
  const [modelState, setModelState] = useState<ModelState>('loading');
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceError, setFaceError] = useState<string | null>(null);
  const [result, setResult] = useState<PersonalColorResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const faceapiRef = useRef<FaceApiModule | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const faceapi = await import('@vladmandic/face-api');
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        ]);
        if (cancelled) return;
        faceapiRef.current = faceapi;
        setModelState('ready');
      } catch {
        if (!cancelled) setModelState('error');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    return () => { if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current); };
  }, []);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const faceapi = faceapiRef.current;
    if (!faceapi) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreview(url);
    setResult(null);
    setFaceError(null);
    setAnalyzing(true);

    // 사진은 이 브라우저 안에서만 픽셀 단위로 분석될 뿐, 어디로도 전송되지 않는다.
    const img = new Image();
    img.src = url;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('image load failed'));
    }).catch(() => null);

    const startedAt = Date.now();
    let detection;
    try {
      detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 }))
        .withFaceLandmarks();
    } catch {
      detection = undefined;
    }

    const elapsed = Date.now() - startedAt;
    if (elapsed < 800) await new Promise(r => setTimeout(r, 800 - elapsed));

    const MIN_CONFIDENCE = 0.6;
    if (!detection || detection.detection.score < MIN_CONFIDENCE) {
      setFaceError('사진에서 얼굴을 뚜렷하게 찾지 못했어요. 밝은 곳에서 얼굴이 정면으로 크게 나온 사진으로 다시 시도해주세요.');
      setAnalyzing(false);
      return;
    }

    try {
      const { warmthRatio, clarityRatio, valueRatio } = measurePersonalColorRatios(img, detection.landmarks);
      setResult(getPersonalColor(warmthRatio, clarityRatio, valueRatio));
    } catch {
      setFaceError('사진을 분석하는 중 문제가 생겼어요. 다른 사진으로 다시 시도해주세요.');
      setAnalyzing(false);
      return;
    }
    setAnalyzing(false);
    setTimeout(() => document.getElementById('color-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, []);

  function handleReset() {
    setPreview(null);
    setResult(null);
    setFaceError(null);
    setAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="h-1 bg-gradient-to-r from-orange-400 via-rose-400 to-indigo-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/snap" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-rose-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            스냅테스트
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">퍼스널컬러 진단</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎨</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">퍼스널컬러 진단</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">실제 얼굴 인식으로 피부 톤을 분석해 12가지 유형과 나만의 컬러 팔레트를 찾아드려요</p>
        </div>

        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-2xl p-4 mb-6 text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>얼굴 인식과 피부 톤 측정은 이 브라우저 안에서만 실행되고, 사진은 어디에도 저장·전송되지 않습니다. 다만 사진 한 장의 조명·화질에 따라 결과가 달라질 수 있어 전문 드레이핑 진단을 대체하지는 않는 참고용 결과입니다.</p>
        </div>

        {modelState === 'loading' && (
          <div className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white dark:bg-slate-900">
            <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-rose-500 rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">얼굴 인식 모델을 불러오는 중...</span>
          </div>
        )}

        {modelState === 'error' && (
          <div className="w-full border-2 border-dashed border-rose-200 dark:border-rose-900/50 rounded-2xl py-12 px-4 flex flex-col items-center gap-2 bg-rose-50 dark:bg-rose-950/30 text-center">
            <span className="text-3xl">⚠️</span>
            <span className="text-sm font-bold text-rose-600">얼굴 인식 모델을 불러오지 못했어요</span>
            <span className="text-xs text-rose-400">네트워크 상태를 확인하고 새로고침 해주세요</span>
          </div>
        )}

        {modelState === 'ready' && !preview && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white dark:bg-slate-900 hover:border-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/40 transition-colors"
          >
            <span className="text-4xl">📷</span>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">사진을 선택해주세요</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">밝은 곳에서 찍은 정면 사진일수록 정확해요</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />

        {preview && (
          <div className="mb-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 aspect-square max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="업로드한 사진 미리보기" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-white/30 dark:border-slate-700/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white text-sm font-bold">피부 톤 분석 중...</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 mx-auto block text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-rose-600 transition-colors"
              >
                다른 사진으로 다시 보기
              </button>
            )}
          </div>
        )}

        {faceError && !analyzing && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-5 mb-6 text-center">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-3">🙈 {faceError}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2.5 transition-colors"
            >
              다른 사진 선택하기
            </button>
          </div>
        )}

        {result && !analyzing && (
          <div id="color-result" className="space-y-4">
            <div
              className="rounded-2xl p-6 text-white text-center"
              style={{ background: `linear-gradient(135deg, ${result.from} 0%, ${result.to} 100%)` }}
            >
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <div className="text-4xl mb-2">{result.emoji}</div>
              <p className="text-sm font-semibold text-white/80 mb-1">{result.vibe}</p>
              <p className="text-xl font-black mb-3">{result.label}</p>
              <p className="text-sm leading-relaxed">{result.text}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">🌡️ 웜/쿨 지수</p>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40 rounded-full px-2 py-0.5">
                  {result.warmthPercent}% {result.warmthPercent >= 50 ? '웜' : '쿨'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-sky-400 via-slate-300 to-orange-400 rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="relative h-3">
                <div className="absolute top-0 w-2 h-2 rounded-full bg-slate-700 border-2 border-white shadow" style={{ left: `calc(${result.warmthPercent}% - 4px)` }} />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">✨ 선명도 지수</p>
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-full px-2 py-0.5">
                  {result.clarityPercent}% {result.clarityPercent >= 50 ? '클리어' : '뮤트'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                <div className="h-full bg-gradient-to-r from-rose-400 to-fuchsia-500 rounded-full" style={{ width: `${result.clarityPercent}%` }} />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">☀️ 명도 지수</p>
                <span className="text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 rounded-full px-2 py-0.5">
                  {result.valuePercent}% {result.valuePercent >= 50 ? '라이트' : '딥'}
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1">
                <div className="h-full bg-gradient-to-r from-slate-700 to-amber-200 rounded-full" style={{ width: `${result.valuePercent}%` }} />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">🎨 추천 컬러 팔레트</p>
              <div className="grid grid-cols-3 gap-3">
                {result.palette.map(c => (
                  <div key={c.hex} className="text-center">
                    <div className="w-full aspect-square rounded-xl mb-1.5 border border-slate-200 dark:border-slate-700 shadow-sm" style={{ background: c.hex }} />
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{c.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">🙅 피하면 좋은 컬러</p>
              <div className="grid grid-cols-3 gap-3">
                {result.avoidPalette.map(c => (
                  <div key={c.hex} className="text-center opacity-70">
                    <div className="w-full aspect-square rounded-xl mb-1.5 border border-slate-200 dark:border-slate-700" style={{ background: c.hex }} />
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{c.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">💡 오늘의 스타일 팁</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.styleTip}</p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-rose-300 hover:text-rose-600 transition-colors"
            >
              🔄 다른 사진으로 다시 해보기
            </button>

            <SaveResultCard
              emoji={result.emoji}
              title={result.label}
              subtitle={result.vibe}
              body={result.text}
              from={result.from}
              to={result.to}
              fileName="personal-color-result"
            />

            <ShareButton title="퍼스널컬러 진단 결과" description={`${result.label} — ${result.text}`} type="fortune" />

            <p className="text-center text-xs text-slate-300 dark:text-slate-600 pt-2">
              얼굴 인식과 피부 톤 측정은 실제로 이뤄지지만, 웜/쿨 해석과 컬러 추천은 참고용이며 전문 퍼스널컬러 진단을 대체하지 않습니다.
            </p>
          </div>
        )}

        <Faq items={SECTION_FAQ['snap/personal-color']} />
      </div>
      <SiteFooter />
    </div>
  );
}
