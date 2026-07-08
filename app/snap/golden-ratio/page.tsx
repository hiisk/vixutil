'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ShareButton from '@/components/ShareButton';
import SaveResultCard from '@/components/SaveResultCard';
import { getGoldenRatio, type GoldenRatioResult } from '@/lib/golden-ratio-data';

type FaceApiModule = typeof import('@vladmandic/face-api');

interface Point { x: number; y: number }
interface Landmarks68 {
  getJawOutline(): Point[];
  getNose(): Point[];
  getLeftEye(): Point[];
  getRightEye(): Point[];
  getMouth(): Point[];
  getLeftEyeBrow(): Point[];
  getRightEyeBrow(): Point[];
}

function dist(a: Point, b: Point) { return Math.hypot(a.x - b.x, a.y - b.y); }
function widthOf(pts: Point[]) { const xs = pts.map(p => p.x); return Math.max(...xs) - Math.min(...xs); }
function midpoint(pts: Point[]): Point {
  return { x: pts.reduce((s, p) => s + p.x, 0) / pts.length, y: pts.reduce((s, p) => s + p.y, 0) / pts.length };
}

/**
 * 68포인트 랜드마크로 미의 황금비(φ)와 비교할 4가지 얼굴 비율을 계산한다.
 * 모두 눈썹 아래 좌표만 사용하므로 헤어스타일에 영향받지 않는다.
 */
function measureGoldenRatios(landmarks: Landmarks68): Record<string, number> {
  const jaw = landmarks.getJawOutline();
  const nose = landmarks.getNose();
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const mouth = landmarks.getMouth();
  const leftBrow = landmarks.getLeftEyeBrow();
  const rightBrow = landmarks.getRightEyeBrow();

  const browMid = midpoint([...leftBrow, ...rightBrow]);
  const noseTip = nose[6] ?? nose[nose.length - 1];
  const chin = jaw[8];

  // 얼굴 세로 비율: (눈썹~코끝) : (코끝~턱끝) → φ에 가까울수록 균형
  const upper = dist(browMid, noseTip);
  const lower = dist(noseTip, chin);
  const faceThirds = lower > 0 && upper > 0 ? Math.max(upper, lower) / Math.min(upper, lower) : 1.6;

  // 얼굴 가로세로 비율: 얼굴 길이 : 광대 너비
  const faceLength = dist(browMid, chin);
  const cheekWidth = dist(jaw[0], jaw[16]);
  const faceWidth = cheekWidth > 0 ? faceLength / cheekWidth : 1.6;

  // 눈~입 균형: 두 눈 안쪽 사이 간격 대비 입 너비의 비율(φ 스케일로 보정)
  const innerEyeGap = dist(
    leftEye.reduce((a, b) => (a.x > b.x ? a : b)),
    rightEye.reduce((a, b) => (a.x < b.x ? a : b)),
  );
  const mouthW = widthOf(mouth);
  const eyeMouth = innerEyeGap > 0 ? (mouthW / innerEyeGap) * 1.618 : 1.6;

  // 코~입 균형: 입 너비 대 코 너비
  const noseW = widthOf(nose);
  const noseMouth = noseW > 0 ? mouthW / noseW : 1.6;

  return { faceThirds, faceWidth, eyeMouth, noseMouth };
}

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = '사진 한 장으로 보는 얼굴 황금비율 테스트 — vixutil.com';
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

export default function GoldenRatioPage() {
  const [modelState, setModelState] = useState<ModelState>('loading');
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceError, setFaceError] = useState<string | null>(null);
  const [result, setResult] = useState<GoldenRatioResult | null>(null);
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

    if (!detection || detection.detection.score < 0.6) {
      setFaceError('사진에서 얼굴을 뚜렷하게 찾지 못했어요. 밝은 곳에서 얼굴이 정면으로 크게 나온 사진으로 다시 시도해주세요.');
      setAnalyzing(false);
      return;
    }

    const ratios = measureGoldenRatios(detection.landmarks);
    setResult(getGoldenRatio(ratios));
    setAnalyzing(false);
    setTimeout(() => document.getElementById('golden-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
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
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/snap" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            스냅테스트
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">황금비율 테스트</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📐</div>
          <h1 className="text-2xl font-black text-slate-900 mb-1.5">얼굴 황금비율 테스트</h1>
          <p className="text-slate-500 text-sm">실제 얼굴 인식으로 이목구비 비례가 황금비(φ)에 얼마나 가까운지 측정해요</p>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 text-xs text-amber-800 leading-relaxed">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>이목구비 비율은 이 브라우저 안에서 실제로 측정돼요. 다만 황금비는 미의 절대 기준이 아니라 하나의 참고 개념일 뿐이니, 점수는 재미로만 봐주세요.</p>
        </div>

        {modelState === 'loading' && (
          <div className="w-full border-2 border-dashed border-slate-200 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
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
            className="w-full border-2 border-dashed border-slate-300 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white hover:border-amber-400 hover:bg-amber-50/50 transition-colors"
          >
            <span className="text-4xl">📷</span>
            <span className="text-sm font-bold text-slate-600">사진을 선택해주세요</span>
            <span className="text-xs text-slate-400">정면으로 크게 나온 사진일수록 정확해요</span>
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
                  <p className="text-white text-sm font-bold">비율 분석 중...</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button onClick={() => fileInputRef.current?.click()} className="mt-3 mx-auto block text-xs font-semibold text-slate-400 hover:text-amber-600 transition-colors">
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
          <div id="golden-result" className="space-y-4">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white text-center">
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <div className="text-4xl mb-2">📐</div>
              <p className="text-sm font-semibold text-white/80 mb-1">황금비율 점수</p>
              <p className="text-4xl font-black mb-3">{result.totalScore}점</p>
              <p className="text-sm leading-relaxed">{result.overall}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">📊 세부 비율 (φ ≈ 1.618 기준)</p>
              <div className="flex flex-col gap-3">
                {result.metrics.map(m => (
                  <div key={m.key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-600">{m.label}</span>
                      <span className="text-xs font-bold text-amber-600">{m.score}점 <span className="text-slate-400 font-medium">(비율 {m.ratio.toFixed(2)})</span></span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-0.5">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${m.score}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">💡 참고 팁</p>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{result.tip}</p>
            </div>

            <button onClick={handleReset} className="w-full py-3.5 rounded-2xl font-bold text-sm bg-white border-2 border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-600 transition-colors">
              🔄 다른 사진으로 다시 해보기
            </button>

            <SaveResultCard
              emoji="📐"
              title={`황금비율 ${result.totalScore}점`}
              subtitle="얼굴 황금비율 테스트"
              body={result.overall}
              from="#f59e0b"
              to="#ea580c"
              fileName="golden-ratio-result"
            />

            <ShareButton title="얼굴 황금비율 테스트 결과" description={`황금비율 ${result.totalScore}점 — ${result.overall}`} type="fortune" />

            <p className="text-center text-xs text-slate-300 pt-2">
              비율 측정은 실제로 이뤄지지만, 황금비는 미의 절대 기준이 아닌 참고 개념이며 결과는 오락 목적입니다.
            </p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
