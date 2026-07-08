'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ShareButton from '@/components/ShareButton';
import { getSmileScore, type SmileScoreResult } from '@/lib/smile-score-data';

type FaceApiModule = typeof import('@vladmandic/face-api');

interface Point { x: number; y: number }
interface Landmarks68 {
  getJawOutline(): Point[];
  getMouth(): Point[];
}

function clampUnit(x: number) {
  return Math.max(0, Math.min(1, x));
}

/**
 * 입꼬리(가장 왼쪽·오른쪽 점)가 입 바운딩박스의 세로 중심보다 얼마나
 * 위에 있는지로 미소를 측정한다. 절대 크기가 아니라 입 자체의 세로
 * 중심 기준 상대 위치라, 사람마다 다른 입 크기에 영향을 덜 받는다.
 */
function measureSmile(landmarks: Landmarks68): number {
  const jaw = landmarks.getJawOutline();
  const mouth = landmarks.getMouth();
  const faceHeight = Math.max(...jaw.map(p => p.y)) - Math.min(...jaw.map(p => p.y));
  if (faceHeight <= 0) return 0.5;

  const xs = mouth.map(p => p.x);
  const ys = mouth.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const leftCorner = mouth[xs.indexOf(minX)];
  const rightCorner = mouth[xs.indexOf(maxX)];
  const cornerY = (leftCorner.y + rightCorner.y) / 2;
  const midY = (minY + maxY) / 2;
  const cornerLift = midY - cornerY; // 양수 = 입꼬리가 중심보다 위(웃는 방향)

  return clampUnit(0.5 + (cornerLift / faceHeight) * 10);
}

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = '사진 한 장으로 보는 미소 지수 측정 — vixutil.com';
    if (navigator.share) {
      try { await navigator.share({ title: text, url }); return; } catch { /* 취소 */ }
    }
    try {
      await navigator.clipboard.writeText(url);
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } catch { /* 권한 없음 */ }
  }, []);
  return (
    <button onClick={handleShare} className="flex items-center gap-1.5 text-xs font-semibold border rounded-xl px-3 py-1.5 transition-all bg-white/20 border-white/30 text-white hover:bg-white/30">
      {state === 'copied' ? '복사됨 ✓' : '공유'}
    </button>
  );
}

type ModelState = 'loading' | 'ready' | 'error';

export default function SmileScorePage() {
  const [modelState, setModelState] = useState<ModelState>('loading');
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceError, setFaceError] = useState<string | null>(null);
  const [result, setResult] = useState<SmileScoreResult | null>(null);
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

    const smileRatio = measureSmile(detection.landmarks);
    setResult(getSmileScore(smileRatio));
    setAnalyzing(false);
    setTimeout(() => document.getElementById('smile-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
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
      <div className="h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/fortune" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-orange-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            운세
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">미소 지수 측정</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">😊</div>
          <h1 className="text-2xl font-black text-slate-900 mb-1.5">미소 지수 측정</h1>
          <p className="text-slate-500 text-sm">실제 얼굴 인식으로 입꼬리를 분석해요</p>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-xs text-orange-800 leading-relaxed">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>입꼬리 위치는 이 브라우저 안에서 실제로 측정되지만, 무표정 사진이라고 나쁜 게 아니에요! 표정과 상관없이 매력적인 사진은 얼마든지 있으니 재미로만 봐주세요.</p>
        </div>

        {modelState === 'loading' && (
          <div className="w-full border-2 border-dashed border-slate-200 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin" />
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

        {modelState === 'ready' && !preview && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white hover:border-orange-400 hover:bg-orange-50/50 transition-colors"
          >
            <span className="text-4xl">📷</span>
            <span className="text-sm font-bold text-slate-600">사진을 선택해주세요</span>
            <span className="text-xs text-slate-400">입이 잘 보이는 정면 사진일수록 정확해요</span>
          </button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

        {preview && (
          <div className="mb-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white aspect-square max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="업로드한 사진 미리보기" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white text-sm font-bold">표정 분석 중...</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button onClick={() => fileInputRef.current?.click()} className="mt-3 mx-auto block text-xs font-semibold text-slate-400 hover:text-orange-600 transition-colors">
                다른 사진으로 다시 보기
              </button>
            )}
          </div>
        )}

        {faceError && !analyzing && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-center">
            <p className="text-sm font-bold text-amber-700 mb-3">🙈 {faceError}</p>
            <button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2.5 transition-colors">
              다른 사진 선택하기
            </button>
          </div>
        )}

        {result && !analyzing && (
          <div id="smile-result" className="space-y-4">
            <div className="bg-gradient-to-br from-amber-400 to-rose-500 rounded-2xl p-6 text-white text-center">
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <p className="text-sm font-semibold text-white/80 mb-2">😊 미소 지수</p>
              <p className="text-4xl font-black mb-3">{result.percent}%</p>
              <p className="text-sm leading-relaxed">{result.text}</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">📸 표정 팁</p>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.tip}</p>
            </div>

            <button onClick={handleReset} className="w-full py-3.5 rounded-2xl font-bold text-sm bg-white border-2 border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600 transition-colors">
              🔄 다른 사진으로 다시 해보기
            </button>

            <ShareButton title="미소 지수 측정 결과" description={`미소 지수 ${result.percent}% — ${result.text}`} type="fortune" />

            <p className="text-center text-xs text-slate-300 pt-2">
              입꼬리 위치 측정은 실제로 이뤄지지만, 표정 해석은 참고용 오락 콘텐츠입니다.
            </p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
