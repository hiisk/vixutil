'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ShareButton from '@/components/ShareButton';
import ReferralCards from '@/components/ReferralCards';
import { analyzeFirstImpression, type FirstImpressionResult } from '@/lib/first-impression-data';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';

type FaceApiModule = typeof import('@vladmandic/face-api');

interface Point { x: number; y: number }
interface Landmarks68 {
  getJawOutline(): Point[];
  getMouth(): Point[];
  getLeftEye(): Point[];
  getRightEye(): Point[];
}

const clampUnit = (x: number) => Math.max(0, Math.min(1, x));

/**
 * 랜드마크에서 세 비율을 실측한다. 전부 얼굴 자체 크기 기준의 상대값이라
 * 사진이 크든 작든, 얼굴이 크든 작든 같은 척도로 비교된다.
 *
 *  - eye:   눈 세로 높이 / 얼굴 높이 → 눈이 얼마나 또렷한가
 *  - face:  얼굴 세로 / 가로 → 갸름한가 넓은가
 *  - mouth: 입꼬리가 입 중심보다 얼마나 위인가 → 미소 정도
 *
 * 각 값을 사람 얼굴의 실제 분포 범위로 정규화해 0~1로 편다. 그냥 원값을
 * 쓰면 대부분이 한쪽으로 몰려 유형이 갈리지 않는다.
 */
function measure(landmarks: Landmarks68): { eye: number; face: number; mouth: number } {
  const jaw = landmarks.getJawOutline();
  const mouth = landmarks.getMouth();
  const leftEye = landmarks.getLeftEye();
  const rightEye = landmarks.getRightEye();

  const jawYs = jaw.map(p => p.y);
  const jawXs = jaw.map(p => p.x);
  const faceH = Math.max(...jawYs) - Math.min(...jawYs);
  const faceW = Math.max(...jawXs) - Math.min(...jawXs);
  if (faceH <= 0 || faceW <= 0) return { eye: 0.5, face: 0.5, mouth: 0.5 };

  // 눈 — 양쪽 평균 세로 높이를 얼굴 높이로 나눈다
  const eyeH = (eye: Point[]) => {
    const ys = eye.map(p => p.y);
    return Math.max(...ys) - Math.min(...ys);
  };
  const eyeRaw = ((eyeH(leftEye) + eyeH(rightEye)) / 2) / faceH;
  // 사람 얼굴에서 이 값은 대략 0.03~0.09 범위에 들어온다
  const eye = clampUnit((eyeRaw - 0.03) / 0.06);

  // 얼굴 — 세로/가로. 대략 1.1~1.6 범위
  const faceRaw = faceH / faceW;
  const face = clampUnit((faceRaw - 1.1) / 0.5);

  // 입꼬리 — 입 중심 대비 양 끝의 높이. 위로 올라갈수록(y가 작을수록) 미소
  const mYs = mouth.map(p => p.y);
  const mXs = mouth.map(p => p.x);
  const mouthH = Math.max(...mYs) - Math.min(...mYs);
  const mouthCenterY = (Math.max(...mYs) + Math.min(...mYs)) / 2;
  const leftCorner = mouth.reduce((a, p) => (p.x < a.x ? p : a), mouth[0]);
  const rightCorner = mouth.reduce((a, p) => (p.x > a.x ? p : a), mouth[0]);
  const cornerY = (leftCorner.y + rightCorner.y) / 2;
  const mouthRaw = mouthH > 0 ? (mouthCenterY - cornerY) / mouthH : 0;
  // -0.2(처짐) ~ 0.3(활짝) 범위를 편다
  const mouthScore = clampUnit((mouthRaw + 0.2) / 0.5);

  // 입 너비가 0에 가까우면 측정이 신뢰할 수 없다
  const mouthW = Math.max(...mXs) - Math.min(...mXs);
  return {
    eye,
    face,
    mouth: mouthW > 0 ? mouthScore : 0.5,
  };
}

type ModelState = 'loading' | 'ready' | 'error';

export default function FirstImpressionPage() {
  const [modelState, setModelState] = useState<ModelState>('loading');
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceError, setFaceError] = useState<string | null>(null);
  const [result, setResult] = useState<FirstImpressionResult | null>(null);
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

    // 분석이 너무 빨리 끝나면 "정말 분석했나" 싶어진다. 최소 시간을 둔다.
    const elapsed = Date.now() - startedAt;
    if (elapsed < 800) await new Promise(r => setTimeout(r, 800 - elapsed));

    const MIN_CONFIDENCE = 0.6;
    if (!detection || detection.detection.score < MIN_CONFIDENCE) {
      setFaceError('사진에서 얼굴을 뚜렷하게 찾지 못했어요. 밝은 곳에서 얼굴이 정면으로 크게 나온 사진으로 다시 시도해주세요.');
      setAnalyzing(false);
      return;
    }

    const { eye, face, mouth } = measure(detection.landmarks);
    setResult(analyzeFirstImpression(eye, face, mouth));
    setAnalyzing(false);
    setTimeout(() => document.getElementById('impression-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, []);

  function handleReset() {
    setPreview(null);
    setResult(null);
    setFaceError(null);
    setAnalyzing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="indigo" />
      <div className="h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/snap" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-indigo-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            스냅테스트
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">첫인상 분석</span>
        </div>
      </header>

      <div className="relative max-w-lg mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full">AI 얼굴 분석</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-3 mb-1.5">첫인상 분석</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            사진 속 얼굴에서 눈·얼굴선·입꼬리를 실제로 재어<br />
            사람들이 받는 첫인상 유형을 알려드려요.
          </p>
        </div>

        {/* 업로드 */}
        {!result && (
          <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/70 dark:border-slate-700/70 rounded-2xl p-6 shadow-[0_8px_24px_-12px_rgba(99,102,241,0.2)]">
            {modelState === 'loading' && (
              <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
                얼굴 인식 모델을 불러오는 중이에요…
              </p>
            )}

            {modelState === 'error' && (
              <p className="text-center text-sm text-red-500 dark:text-red-400 py-8">
                모델을 불러오지 못했어요. 새로고침 후 다시 시도해주세요.
              </p>
            )}

            {modelState === 'ready' && (
              <>
                {preview ? (
                  <div className="flex flex-col items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="분석할 사진" className="w-40 h-40 object-cover rounded-2xl border border-slate-200 dark:border-slate-700" />
                    {analyzing && <p className="text-sm text-indigo-600 dark:text-indigo-300 font-semibold">얼굴을 분석하고 있어요…</p>}
                    {faceError && (
                      <>
                        <p className="text-sm text-red-500 dark:text-red-400 text-center leading-relaxed">{faceError}</p>
                        <button onClick={handleReset} className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors">
                          다른 사진으로 다시 하기
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <label className="flex flex-col items-center gap-3 cursor-pointer py-6">
                    <span className="text-5xl">📷</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">사진 올리기</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed">
                      정면·밝은 곳에서 찍은 사진일수록 정확해요<br />
                      사진은 기기 밖으로 전송되지 않아요
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                    />
                  </label>
                )}
              </>
            )}
          </div>
        )}

        {/* 결과 */}
        {result && (
          <div id="impression-result" className="flex flex-col gap-4">
            <div className={`rounded-3xl bg-gradient-to-br ${result.type.color} p-6 text-white text-center shadow-lg`}>
              <p className="text-6xl mb-3">{result.type.emoji}</p>
              <h2 className="text-2xl font-black mb-2">{result.type.label}</h2>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {result.type.keywords.map(k => (
                  <span key={k} className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-full">{k}</span>
                ))}
              </div>
            </div>

            <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/70 dark:border-slate-700/70 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(99,102,241,0.2)]">
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.type.desc}</p>
            </div>

            <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/70 dark:border-slate-700/70 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(99,102,241,0.2)]">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">실제 측정값</p>
              {[
                { label: '눈의 또렷함', value: result.eyeScore },
                { label: '얼굴선 (갸름함)', value: result.faceScore },
                { label: '입꼬리 (미소)', value: result.mouthScore },
              ].map(m => (
                <div key={m.label} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{m.label}</span>
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-300">{m.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-700" style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl p-5">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide mb-1.5">이럴 때 강점이 돼요</p>
              <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">{result.type.strength}</p>
            </div>

            <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/70 dark:border-slate-700/70 rounded-2xl p-5 shadow-[0_8px_24px_-12px_rgba(99,102,241,0.2)]">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-1.5">💡 오늘의 팁</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.tip}</p>
            </div>

            <ShareButton
              title={`첫인상 분석 결과 — ${result.type.label}`}
              description={result.type.keywords.join(' · ')}
              type="fortune"
            />

            {/* 스냅 11개 중 이 페이지만 SaveResultCard를 안 쓴다 — 그래서 여기만 직접 붙인다 */}
            <ReferralCards placement="result" />

            <button
              onClick={handleReset}
              className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-xl py-3.5 font-bold text-sm transition-colors"
            >
              다른 사진으로 다시 하기
            </button>
          </div>
        )}

        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-8 leading-relaxed">
          재미로 보는 콘텐츠예요. 얼굴로 사람을 평가할 수 있다는 뜻이 아닙니다.<br />
          첫인상은 얼굴보다 표정과 태도에서 훨씬 크게 결정됩니다.
        </p>

        <Faq items={SECTION_FAQ['snap/first-impression']} />
      </div>

      <SiteFooter />
    </div>
  );
}
