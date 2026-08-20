'use client';
import { shareOne } from '@/lib/share/ui';
import ToolIcon from '@/components/ToolIcon';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ShareButton from '@/components/ShareButton';
import SaveResultCard from '@/components/SaveResultCard';
import { getSmileScore, type SmileScoreResult } from '@/lib/smile-score-data';
import Faq from '@/components/Faq';
import { SECTION_FAQ } from '@/lib/section-faq';
import PageGlow from '@/components/PageGlow';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { pickBackend } from '@/lib/snap/backend';
import { detectFace } from '@/lib/snap/detect';
import { useDropPaste } from '@/lib/snap/useDropPaste';

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
 * 입 랜드마크로 세 가지를 실측한다:
 *  1) 입꼬리 올라감(smile): 입꼬리가 입 세로 중심보다 얼마나 위에 있는지
 *  2) 입 벌어짐(openness): 입 세로 높이 대비 가로 너비 비율
 *  3) 좌우 균형(balance): 두 입꼬리의 높이 차이가 적을수록 대칭
 * 모두 입 자체 크기 기준의 상대값이라 사람마다 다른 입 크기에 덜 흔들린다.
 */
function measureSmile(landmarks: Landmarks68): { smile: number; openness: number; balance: number } {
  const jaw = landmarks.getJawOutline();
  const mouth = landmarks.getMouth();
  const faceHeight = Math.max(...jaw.map(p => p.y)) - Math.min(...jaw.map(p => p.y));
  if (faceHeight <= 0) return { smile: 0.5, openness: 0.3, balance: 0.8 };

  const xs = mouth.map(p => p.x);
  const ys = mouth.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const leftCorner = mouth[xs.indexOf(minX)];
  const rightCorner = mouth[xs.indexOf(maxX)];
  const cornerY = (leftCorner.y + rightCorner.y) / 2;
  const midY = (minY + maxY) / 2;
  const cornerLift = midY - cornerY; // 양수 = 입꼬리가 중심보다 위(웃는 방향)
  const smile = clampUnit(0.5 + (cornerLift / faceHeight) * 10);

  // 입 벌어짐: 입 세로 높이 / 가로 너비 (활짝 웃을수록 커짐)
  const mouthW = maxX - minX;
  const mouthH = maxY - minY;
  const openness = clampUnit(mouthW > 0 ? ((mouthH / mouthW) - 0.15) / 0.5 : 0.3);

  // 좌우 균형: 두 입꼬리 높이 차이가 작을수록 1에 가깝게
  const cornerDiff = Math.abs(leftCorner.y - rightCorner.y);
  const balance = clampUnit(1 - (cornerDiff / faceHeight) * 12);

  return { smile, openness, balance };
}

function ShareBtn() {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const handleShare = useCallback(async () => {
    // 문구와 주소가 한 덩이로 나간다 — 예전엔 title 칸이라 카톡이 통째로 버렸다
    if (await shareOne('사진 한 장으로 보는 미소 지수 측정 — vixutil.com')) {
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    }
  }, []);
  return (
    <button onClick={handleShare} className="flex items-center gap-1.5 text-xs font-semibold border rounded-xl px-3 py-1.5 transition-all bg-white/20 dark:bg-slate-900/20 border-white/30 dark:border-slate-700/30 text-white hover:bg-white/30">
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
        /* 모델을 받기 전에 백엔드를 세운다 — 까닭은 lib/snap/backend.ts */
        await pickBackend(faceapi.tf);
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
    /* 크기를 바꿔 가며 세 번 본다 — 까닭은 lib/snap/detect.ts */
    const detection = await detectFace(faceapi, img, { expressions: false, minScore: 0.6 });

    const elapsed = Date.now() - startedAt;
    if (elapsed < 800) await new Promise(r => setTimeout(r, 800 - elapsed));

    const MIN_CONFIDENCE = 0.6;
    if (!detection || detection.detection.score < MIN_CONFIDENCE) {
      setFaceError('사진에서 얼굴을 뚜렷하게 찾지 못했어요. 밝은 곳에서 얼굴이 정면으로 크게 나온 사진으로 다시 시도해주세요.');
      setAnalyzing(false);
      return;
    }

    const { smile, openness, balance } = measureSmile(detection.landmarks);
    setResult(getSmileScore(smile, openness, balance));
    setAnalyzing(false);
    setTimeout(() => document.getElementById('smile-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }, []);

  /* 끌어다 놓기·붙여넣기로도 받는다 — 까닭은 lib/snap/useDropPaste.ts */
  useDropPaste(handleFile);

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
      <div className="h-1 topbar" />

      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/snap" className="page-back hover:text-orange-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            스냅테스트
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">미소 지수 측정</span>
          <span className="ml-auto shrink-0">
            <LangPicker current="ko" route="/snap/smile-score" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="hero-band max-w-xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="😊" className="h-6 w-6" /></span>
          <h1 className="page-h1">미소 지수 측정</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">실제 얼굴 인식으로 입꼬리를 분석해요</p>
        </div>

        <div className="note mb-6">
          <p className="font-bold mb-1">🔒 사진은 서버에 전송되지 않아요</p>
          <p>입꼬리 위치는 이 브라우저 안에서 실제로 측정되지만, 무표정 사진이라고 나쁜 게 아니에요! 표정과 상관없이 매력적인 사진은 얼마든지 있으니 재미로만 봐주세요.</p>
        </div>

        {modelState === 'loading' && (
          <div className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg py-16 flex flex-col items-center gap-3 bg-white dark:bg-slate-900">
            <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-orange-500 rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">얼굴 인식 모델을 불러오는 중...</span>
          </div>
        )}

        {modelState === 'error' && (
          <div className="w-full border-2 border-dashed border-rose-200 dark:border-rose-900/50 rounded-lg py-12 px-4 flex flex-col items-center gap-2 bg-rose-50 dark:bg-rose-950/30 text-center">
            <ToolIcon emoji="⚠️" className="w-8 h-8 text-slate-800 dark:text-slate-100" />
            <span className="text-sm font-bold text-rose-600">얼굴 인식 모델을 불러오지 못했어요</span>
            <span className="text-xs text-rose-400">네트워크 상태를 확인하고 새로고침 해주세요</span>
          </div>
        )}

        {modelState === 'ready' && !preview && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-lg py-16 flex flex-col items-center gap-3 bg-white dark:bg-slate-900 hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/40 transition-colors"
          >
            <ToolIcon emoji="📷" className="w-9 h-9 text-slate-800 dark:text-slate-100" />
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">사진을 선택해주세요</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">입이 잘 보이는 정면 사진일수록 정확해요</span>
          </button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

        {preview && (
          <div className="mb-6">
            <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 aspect-square max-w-xs mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="업로드한 사진 미리보기" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/60 gap-3">
                  <div className="w-10 h-10 border-4 border-white/30 dark:border-slate-700/30 border-t-white rounded-full animate-spin" />
                  <p className="text-white text-sm font-bold">표정 분석 중...</p>
                </div>
              )}
            </div>
            {!analyzing && (
              <button onClick={() => fileInputRef.current?.click()} className="mt-3 mx-auto block text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-orange-600 transition-colors">
                다른 사진으로 다시 보기
              </button>
            )}
          </div>
        )}

        {faceError && !analyzing && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-5 mb-6 text-center">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-3">🙈 {faceError}</p>
            <button onClick={() => fileInputRef.current?.click()} className="text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2.5 transition-colors">
              다른 사진 선택하기
            </button>
          </div>
        )}

        {result && !analyzing && (
          <div id="smile-result" className="space-y-4">
            <div className="bg-sec rounded-lg p-6 text-center">
              <div className="flex justify-end mb-2">
                <ShareBtn />
              </div>
              <p className="text-sm font-semibold text-white/80 mb-2">종합 미소 지수</p>
              <p className="text-4xl font-bold mb-3">{result.percent}%</p>
              <p className="text-sm leading-relaxed">{result.text}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
              <p className="label-caps mb-3">미소 세부 분석</p>
              <div className="flex flex-col gap-3">
                {result.metrics.map(m => (
                  <div key={m.key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{m.label}</span>
                      <span className="text-xs font-bold text-rose-500">{m.percent}% <span className="text-slate-500 dark:text-slate-400 font-medium">· {m.comment}</span></span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-sec rounded-full" style={{ width: `${m.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 dark:border-amber-900/40 rounded-lg p-5">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">표정 팁</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
            </div>

            <button onClick={handleReset} className="w-full py-3.5 rounded-lg font-bold text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-orange-600 transition-colors">다른 사진으로 다시 해보기
            </button>

            <SaveResultCard
              emoji="😊"
              title={`미소 지수 ${result.percent}%`}
              subtitle="미소 지수 측정"
              body={result.text}
              from="#fbbf24"
              to="#f43f5e"
              fileName="smile-score-result"
            />

            <ShareButton title="미소 지수 측정 결과" description={`미소 지수 ${result.percent}% — ${result.text}`} type="fortune" />

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2">
              입꼬리 위치 측정은 실제로 이뤄지지만, 표정 해석은 참고용 오락 콘텐츠입니다.
            </p>
          </div>
        )}

        <Faq items={SECTION_FAQ['snap/smile-score']} />
      </div>
      <SiteFooter />
    </div>
  );
}
