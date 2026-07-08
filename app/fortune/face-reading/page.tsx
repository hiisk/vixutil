'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { getFaceReading, type FaceReadingResult, type FaceRatios } from '@/lib/face-reading-data';

// face-api 타입은 무겁고 이 페이지에서만 쓰이므로 동적 import로 코드분할한다
type FaceApiModule = typeof import('@vladmandic/face-api');

interface Point { x: number; y: number }
interface FaceBox { x: number; y: number; width: number; height: number }
interface Landmarks68 {
  getJawOutline(): Point[];
  getLeftEyeBrow(): Point[];
  getRightEyeBrow(): Point[];
  getNose(): Point[];
  getLeftEye(): Point[];
  getRightEye(): Point[];
  getMouth(): Point[];
}

function clampUnit(x: number) {
  return Math.max(0, Math.min(1, x));
}

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function widthOf(points: Point[]) {
  const xs = points.map(p => p.x);
  return Math.max(...xs) - Math.min(...xs);
}

function avgY(points: Point[]) {
  return points.reduce((s, p) => s + p.y, 0) / points.length;
}

/** 68포인트 랜드마크 + 얼굴 박스로부터 이목구비 비율을 계산한다 */
function measureRatios(box: FaceBox, landmarks: Landmarks68): FaceRatios {
  const jaw = landmarks.getJawOutline();
  const leftBrow = landmarks.getLeftEyeBrow();
  const rightBrow = landmarks.getRightEyeBrow();
  const nose = landmarks.getNose();
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const mouth = landmarks.getMouth();

  const faceWidth = box.width;
  const faceHeight = box.height;

  // 이마: 얼굴 박스 상단 ~ 눈썹 평균 높이 사이 공간 (박스 상단이 헤어라인 근처를 포함하는 경향을 이용한 근사치)
  const eyebrowY = (avgY(leftBrow) + avgY(rightBrow)) / 2;
  const foreheadSpace = Math.max(0, eyebrowY - box.y);
  const foreheadRatio = clampUnit((foreheadSpace / faceHeight) * 2.2);

  // 눈썹: 양끝 평균 높이 대비 중앙이 얼마나 위로 솟았는지(아치 정도)
  const archOf = (brow: { x: number; y: number }[]) => {
    const ys = brow.map(p => p.y);
    const endAvg = (ys[0] + ys[ys.length - 1]) / 2;
    return endAvg - Math.min(...ys);
  };
  const browArch = (archOf(leftBrow) + archOf(rightBrow)) / 2;
  const eyebrowArchRatio = clampUnit((browArch / faceHeight) * 8);

  // 눈: 눈 너비의 얼굴 대비 비율
  const eyeWidthAvg = (widthOf(leftEye) + widthOf(rightEye)) / 2;
  const eyeWidthRatio = clampUnit((eyeWidthAvg / faceWidth) * 4.2);

  // 코: 콧볼 너비의 얼굴 대비 비율
  const noseWidthRatio = clampUnit((widthOf(nose) / faceWidth) * 3.3);

  // 입: 입 너비의 얼굴 대비 비율
  const mouthWidthRatio = clampUnit((widthOf(mouth) / faceWidth) * 2.6);

  // 턱선: 귀 높이 부근 잘선(2번·14번 포인트) 너비의 얼굴 대비 비율
  const jawWidthRatio = clampUnit((dist(jaw[2], jaw[14]) / faceWidth) * 1.15);

  return { foreheadRatio, eyebrowArchRatio, eyeWidthRatio, noseWidthRatio, mouthWidthRatio, jawWidthRatio };
}

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = '사진 한 장으로 보는 재미있는 관상 테스트 — vixutil.com';
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
      className="flex items-center gap-1.5 text-xs font-semibold border rounded-xl px-3 py-1.5 transition-all bg-white/20 border-white/30 text-white hover:bg-white/30"
    >
      {state === 'copied' ? '복사됨 ✓' : '공유'}
    </button>
  );
}

type ModelState = 'loading' | 'ready' | 'error';

export default function FaceReadingPage() {
  const [modelState, setModelState] = useState<ModelState>('loading');
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceError, setFaceError] = useState<string | null>(null);
  const [result, setResult] = useState<FaceReadingResult | null>(null);
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
          faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
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
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true);
    } catch {
      detection = undefined;
    }

    // 너무 빠르게 반짝이면 "분석"의 실감이 안 나서, 최소 800ms는 로딩을 보여준다
    const elapsed = Date.now() - startedAt;
    if (elapsed < 800) await new Promise(r => setTimeout(r, 800 - elapsed));

    if (!detection) {
      setFaceError('사진에서 얼굴을 찾지 못했어요. 얼굴이 선명하게 나온 정면 사진으로 다시 시도해주세요.');
      setAnalyzing(false);
      return;
    }

    const box = detection.detection.box;
    const ratios = measureRatios(box, detection.landmarks);
    setResult(getFaceReading(ratios));
    setAnalyzing(false);
    setTimeout(() => document.getElementById('face-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, []);

  function handleReset() {
    setPreview(null);
    setResult(null);
    setFaceError(null);
    setAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-1 bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-teal-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">관상 테스트</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🪞</div>
          <h1 className="text-2xl font-black text-slate-900 mb-1.5">관상 테스트</h1>
          <p className="text-slate-500 text-sm">실제 얼굴 인식으로 이목구비 비율을 분석해요</p>
        </div>

        {/* 안내 · 개인정보 보호 고지 */}
        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mb-6 text-xs text-teal-800 leading-relaxed">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>얼굴 인식은 이 브라우저 안에서만 실행되고, 사진은 어디에도 저장·전송되지 않습니다. 이목구비 비율은 실제로 측정하지만, 여기에 붙는 성격·운세 해석은 관상학에 근거한 오락 콘텐츠입니다.</p>
        </div>

        {modelState === 'loading' && (
          <div className="w-full border-2 border-dashed border-slate-200 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-500">얼굴 인식 모델을 불러오는 중...</span>
          </div>
        )}

        {modelState === 'error' && (
          <div className="w-full border-2 border-dashed border-rose-200 rounded-2xl py-12 px-4 flex flex-col items-center gap-2 bg-rose-50 text-center">
            <span className="text-3xl">⚠️</span>
            <span className="text-sm font-bold text-rose-600">얼굴 인식 모델을 불러오지 못했어요</span>
            <span className="text-xs text-rose-400">네트워크 상태를 확인하고 새로고침 해주세요</span>
          </div>
        )}

        {/* 업로드 영역 */}
        {modelState === 'ready' && !preview && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white hover:border-teal-400 hover:bg-teal-50/50 transition-colors"
          >
            <span className="text-4xl">📷</span>
            <span className="text-sm font-bold text-slate-600">사진을 선택해주세요</span>
            <span className="text-xs text-slate-400">얼굴이 잘 보이는 정면 사진일수록 좋아요</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />

        {/* 미리보기 */}
        {preview && (
          <div className="mb-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-square max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="업로드한 사진 미리보기" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white text-sm font-bold">얼굴 분석 중...</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 mx-auto block text-xs font-semibold text-slate-400 hover:text-teal-600 transition-colors"
              >
                다른 사진으로 다시 보기
              </button>
            )}
          </div>
        )}

        {/* 얼굴 미검출 안내 */}
        {faceError && !analyzing && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-center">
            <p className="text-sm font-bold text-amber-700 mb-3">🙈 {faceError}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2.5 transition-colors"
            >
              다른 사진 선택하기
            </button>
          </div>
        )}

        {/* 결과 */}
        {result && !analyzing && (
          <div id="face-result" className="space-y-4">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-700 rounded-2xl p-6 text-white text-center">
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <p className="text-sm font-semibold text-teal-100 mb-2">✨ 전체 인상</p>
              <p className="text-sm leading-relaxed">{result.overall}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {result.features.map(f => (
                <div key={f.key} className="bg-white border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{f.icon} {f.label}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">🔮 오늘의 관상운</p>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.todayLuck}</p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-white border-2 border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-600 transition-colors"
            >
              🔄 다른 사진으로 다시 해보기
            </button>

            <p className="text-center text-xs text-slate-300 pt-2">
              얼굴 인식은 실제로 이뤄지지만, 관상 해석은 오락 목적이며 과학적·의학적 근거가 없습니다.
            </p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
