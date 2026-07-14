'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ShareButton from '@/components/ShareButton';
import SaveResultCard from '@/components/SaveResultCard';
import { getCoupleMatch, type FaceVector, type CoupleMatchResult } from '@/lib/couple-match-data';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';

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

function clampUnit(x: number) { return Math.max(0, Math.min(1, x)); }
function dist(a: Point, b: Point) { return Math.hypot(a.x - b.x, a.y - b.y); }
function widthOf(pts: Point[]) { const xs = pts.map(p => p.x); return Math.max(...xs) - Math.min(...xs); }
function midpoint(pts: Point[]): Point {
  return { x: pts.reduce((s, p) => s + p.x, 0) / pts.length, y: pts.reduce((s, p) => s + p.y, 0) / pts.length };
}

/** 관상·동물상과 동일한 6개 인상 지표를 측정한다. */
function measureFaceVector(box: { width: number }, landmarks: Landmarks68): FaceVector {
  const jaw = landmarks.getJawOutline();
  const leftBrow = landmarks.getLeftEyeBrow();
  const rightBrow = landmarks.getRightEyeBrow();
  const nose = landmarks.getNose();
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();
  const mouth = landmarks.getMouth();

  const faceWidth = box.width;
  const faceHeight = Math.max(...jaw.map(p => p.y)) - Math.min(...[...leftBrow, ...rightBrow].map(p => p.y));

  const browMid = midpoint([...leftBrow, ...rightBrow]);
  const cheekWidth = dist(jaw[0], jaw[16]);
  const faceLength = dist(browMid, jaw[8]);
  const widthToLength = faceLength > 0 ? cheekWidth / faceLength : 0.8;
  const faceShape = clampUnit((widthToLength - 0.6) / 0.5);

  const noseCenterX = midpoint(nose).x;
  const tiltOf = (eye: Point[]) => {
    const minXPt = eye.reduce((a, b) => (a.x < b.x ? a : b));
    const maxXPt = eye.reduce((a, b) => (a.x > b.x ? a : b));
    const outer = Math.abs(minXPt.x - noseCenterX) > Math.abs(maxXPt.x - noseCenterX) ? minXPt : maxXPt;
    const inner = outer === minXPt ? maxXPt : minXPt;
    return inner.y - outer.y;
  };
  const tiltPx = (tiltOf(leftEye) + tiltOf(rightEye)) / 2;
  const eyeTilt = clampUnit(0.5 + (tiltPx / faceHeight) * 6);

  const eyeWidthAvg = (widthOf(leftEye) + widthOf(rightEye)) / 2;
  const eyeWidth = clampUnit((eyeWidthAvg / faceWidth) * 4.2);
  const jawWidth = clampUnit((dist(jaw[2], jaw[14]) / faceWidth) * 1.15);
  const noseWidth = clampUnit((widthOf(nose) / faceWidth) * 3.3);
  const mouthWidth = clampUnit((widthOf(mouth) / faceWidth) * 2.6);

  return { faceShape, eyeTilt, eyeWidth, jawWidth, noseWidth, mouthWidth };
}

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = '사진 두 장으로 보는 커플 관상 궁합 — vixutil.com';
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
    <button onClick={handleShare} className="flex items-center gap-1.5 text-xs font-semibold border rounded-xl px-3 py-1.5 transition-all bg-white/20 dark:bg-slate-900/20 border-white/30 dark:border-slate-700/30 text-white hover:bg-white/30">
      {state === 'copied' ? '복사됨 ✓' : '공유'}
    </button>
  );
}

type ModelState = 'loading' | 'ready' | 'error';
type Slot = 0 | 1;

export default function CoupleMatchPage() {
  const [modelState, setModelState] = useState<ModelState>('loading');
  const [previews, setPreviews] = useState<(string | null)[]>([null, null]);
  const [vectors, setVectors] = useState<(FaceVector | null)[]>([null, null]);
  const [errors, setErrors] = useState<(string | null)[]>([null, null]);
  const [busy, setBusy] = useState<Slot | null>(null);
  const [result, setResult] = useState<CoupleMatchResult | null>(null);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const objectUrls = useRef<(string | null)[]>([null, null]);
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
    return () => { objectUrls.current.forEach(u => { if (u) URL.revokeObjectURL(u); }); };
  }, []);

  const handleFile = useCallback(async (slot: Slot, file: File) => {
    if (!file.type.startsWith('image/')) return;
    const faceapi = faceapiRef.current;
    if (!faceapi) return;

    if (objectUrls.current[slot]) URL.revokeObjectURL(objectUrls.current[slot]!);
    const url = URL.createObjectURL(file);
    objectUrls.current[slot] = url;
    setPreviews(prev => { const n = [...prev]; n[slot] = url; return n; });
    setErrors(prev => { const n = [...prev]; n[slot] = null; return n; });
    setResult(null);
    setBusy(slot);

    const img = new Image();
    img.src = url;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('image load failed'));
    }).catch(() => null);

    let detection;
    try {
      detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 }))
        .withFaceLandmarks();
    } catch {
      detection = undefined;
    }

    if (!detection || detection.detection.score < 0.6) {
      setErrors(prev => { const n = [...prev]; n[slot] = '얼굴을 찾지 못했어요. 다른 사진으로 시도해주세요.'; return n; });
      setVectors(prev => { const n = [...prev]; n[slot] = null; return n; });
      setBusy(null);
      return;
    }

    const vec = measureFaceVector(detection.detection.box, detection.landmarks);
    setVectors(prev => { const n = [...prev]; n[slot] = vec; return n; });
    setBusy(null);
  }, []);

  function analyze() {
    if (vectors[0] && vectors[1]) {
      setResult(getCoupleMatch(vectors[0], vectors[1]));
      setTimeout(() => document.getElementById('couple-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }

  function handleReset() {
    objectUrls.current.forEach(u => { if (u) URL.revokeObjectURL(u); });
    objectUrls.current = [null, null];
    setPreviews([null, null]);
    setVectors([null, null]);
    setErrors([null, null]);
    setResult(null);
    inputRefs.forEach(r => { if (r.current) r.current.value = ''; });
  }

  const bothReady = !!(vectors[0] && vectors[1]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-red-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/snap" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-rose-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            스냅테스트
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">커플 관상 궁합</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">💑</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">커플 관상 궁합</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">두 사람의 사진으로 인상이 얼마나 닮았는지 궁합을 봐드려요</p>
        </div>

        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-2xl p-4 mb-6 text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>두 얼굴의 이목구비 비율은 이 브라우저 안에서 실제로 측정돼요. 사진은 어디에도 저장·전송되지 않으며, 궁합 해석은 참고용 오락 콘텐츠입니다.</p>
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

        {modelState === 'ready' && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {([0, 1] as Slot[]).map(slot => (
                <div key={slot}>
                  <button
                    onClick={() => inputRefs[slot].current?.click()}
                    className="w-full aspect-square rounded-2xl border-2 border-dashed border-slate-300 bg-white dark:bg-slate-900 hover:border-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/40 transition-colors overflow-hidden relative flex flex-col items-center justify-center gap-2"
                  >
                    {previews[slot] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={previews[slot]!} alt={`${slot + 1}번 사진`} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <span className="text-3xl">{slot === 0 ? '👤' : '👥'}</span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{slot + 1}번째 사진</span>
                      </>
                    )}
                    {busy === slot && (
                      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white/30 dark:border-slate-700/30 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                    {vectors[slot] && busy !== slot && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5">✓ 인식됨</div>
                    )}
                  </button>
                  {errors[slot] && <p className="text-[11px] text-rose-500 font-semibold mt-1.5 text-center">{errors[slot]}</p>}
                  <input ref={inputRefs[slot]} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(slot, f); }} />
                </div>
              ))}
            </div>

            <button
              onClick={analyze}
              disabled={!bothReady}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {bothReady ? '💘 궁합 보기' : '두 사진을 모두 올려주세요'}
            </button>
          </>
        )}

        {result && (
          <div id="couple-result" className="space-y-4 mt-6">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-6 text-white text-center">
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <div className="text-5xl mb-2">💘</div>
              <p className="text-sm font-semibold text-white/80 mb-1">커플 관상 궁합</p>
              <p className="text-4xl font-black mb-3">{result.score}%</p>
              <p className="text-sm leading-relaxed">{result.headline}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">💞 이목구비별 닮은 정도</p>
              <div className="flex flex-col gap-2.5">
                {result.breakdown.map(m => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{m.label}</span>
                      <span className="text-xs font-bold text-rose-500">{m.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full" style={{ width: `${m.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">💌 오늘의 커플 팁</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.comment}</p>
            </div>

            <button onClick={handleReset} className="w-full py-3.5 rounded-2xl font-bold text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-rose-300 hover:text-rose-600 transition-colors">
              🔄 다른 사진으로 다시 해보기
            </button>

            <SaveResultCard
              emoji="💘"
              title={`커플 궁합 ${result.score}%`}
              subtitle="커플 관상 궁합"
              body={result.headline}
              from="#f43f5e"
              to="#db2777"
              fileName="couple-match-result"
            />

            <ShareButton title="커플 관상 궁합 결과" description={`궁합 ${result.score}% — ${result.headline}`} type="fortune" />

            <p className="text-center text-xs text-slate-300 dark:text-slate-600 pt-2">
              이목구비 비율 측정은 실제로 이뤄지지만, 궁합 해석은 참고용 오락 콘텐츠입니다.
            </p>
          </div>
        )}

        <Faq items={SECTION_FAQ['snap/couple-match']} />
      </div>
      <SiteFooter />
    </div>
  );
}
