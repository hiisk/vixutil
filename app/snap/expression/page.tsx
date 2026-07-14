'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ShareButton from '@/components/ShareButton';
import SaveResultCard from '@/components/SaveResultCard';
import { getExpressionResult, EMOTION_ORDER, type ExpressionResult, type EmotionKey } from '@/lib/expression-data';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';

type FaceApiModule = typeof import('@vladmandic/face-api');

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const handleShare = useCallback(async () => {
    const url = window.location.href;
    const text = '사진 한 장으로 보는 표정 감정 분석 — vixutil.com';
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

export default function ExpressionPage() {
  const [modelState, setModelState] = useState<ModelState>('loading');
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceError, setFaceError] = useState<string | null>(null);
  const [result, setResult] = useState<ExpressionResult | null>(null);
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
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
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
        .withFaceExpressions();
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

    const e = detection.expressions;
    const probs = EMOTION_ORDER.reduce((acc, key) => {
      acc[key] = (e as unknown as Record<EmotionKey, number>)[key] ?? 0;
      return acc;
    }, {} as Record<EmotionKey, number>);

    setResult(getExpressionResult(probs));
    setAnalyzing(false);
    setTimeout(() => document.getElementById('expr-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
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
      <div className="h-1 bg-gradient-to-r from-amber-400 via-pink-500 to-violet-500" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/snap" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500 hover:text-pink-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            스냅테스트
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">표정 감정 분석</span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🎭</div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1.5">표정 감정 분석</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">AI 감정 인식 모델로 사진 속 표정을 7가지 감정으로 분석해요</p>
        </div>

        <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 rounded-2xl p-4 mb-6 text-xs text-pink-800 dark:text-pink-300 leading-relaxed">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>감정 인식은 이 브라우저 안에서 실제 AI 모델로 실행되고, 사진은 어디에도 저장·전송되지 않습니다. 결과는 참고용 오락 콘텐츠입니다.</p>
        </div>

        {modelState === 'loading' && (
          <div className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white dark:bg-slate-900">
            <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-pink-500 rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">감정 인식 모델을 불러오는 중...</span>
          </div>
        )}

        {modelState === 'error' && (
          <div className="w-full border-2 border-dashed border-rose-200 dark:border-rose-900/50 rounded-2xl py-12 px-4 flex flex-col items-center gap-2 bg-rose-50 dark:bg-rose-950/30 text-center">
            <span className="text-3xl">⚠️</span>
            <span className="text-sm font-bold text-rose-600">감정 인식 모델을 불러오지 못했어요</span>
            <span className="text-xs text-rose-400">네트워크 상태를 확인하고 새로고침 해주세요</span>
          </div>
        )}

        {modelState === 'ready' && !preview && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-2xl py-16 flex flex-col items-center gap-3 bg-white dark:bg-slate-900 hover:border-pink-400 hover:bg-pink-50/50 dark:hover:bg-pink-950/40 transition-colors"
          >
            <span className="text-4xl">📷</span>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">사진을 선택해주세요</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">표정이 잘 보이는 정면 사진일수록 정확해요</span>
          </button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

        {preview && (
          <div className="mb-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 aspect-square max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="업로드한 사진 미리보기" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-white/30 dark:border-slate-700/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white text-sm font-bold">감정 분석 중...</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button onClick={() => fileInputRef.current?.click()} className="mt-3 mx-auto block text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-pink-600 transition-colors">
                다른 사진으로 다시 보기
              </button>
            )}
          </div>
        )}

        {faceError && !analyzing && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-5 mb-6 text-center">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-3">🙈 {faceError}</p>
            <button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2.5 transition-colors">
              다른 사진 선택하기
            </button>
          </div>
        )}

        {result && !analyzing && (
          <div id="expr-result" className="space-y-4">
            <div
              className="rounded-2xl p-6 text-white text-center"
              style={{ background: `linear-gradient(135deg, ${result.from} 0%, ${result.to} 100%)` }}
            >
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <div className="text-5xl mb-2">{result.emoji}</div>
              <p className="text-sm font-semibold text-white/80 mb-1">가장 강한 감정</p>
              <p className="text-xl font-black mb-3">{result.label} {result.scores[0].percent}%</p>
              <p className="text-sm leading-relaxed">{result.text}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">😀 감정 분포</p>
              <div className="flex flex-col gap-2.5">
                {result.scores.map(s => (
                  <div key={s.key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{s.emoji} {s.label}</span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{s.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pink-400 to-violet-500 rounded-full" style={{ width: `${s.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">💡 오늘의 표정 팁</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
            </div>

            <button onClick={handleReset} className="w-full py-3.5 rounded-2xl font-bold text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-pink-300 hover:text-pink-600 transition-colors">
              🔄 다른 사진으로 다시 해보기
            </button>

            <SaveResultCard
              emoji={result.emoji}
              title={`${result.label} ${result.scores[0].percent}%`}
              subtitle="표정 감정 분석"
              body={result.text}
              from={result.from}
              to={result.to}
              fileName="expression-result"
            />

            <ShareButton title="표정 감정 분석 결과" description={`${result.label} ${result.scores[0].percent}% — ${result.text}`} type="fortune" />

            <p className="text-center text-xs text-slate-300 dark:text-slate-600 pt-2">
              감정 인식은 실제 AI 모델로 이뤄지지만, 결과 해석은 참고용 오락 콘텐츠입니다.
            </p>
          </div>
        )}

        <Faq items={SECTION_FAQ['snap/expression']} />
      </div>
      <SiteFooter />
    </div>
  );
}
