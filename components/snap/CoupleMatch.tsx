'use client';
import ToolIcon from '@/components/ToolIcon';
import PageHero from '@/components/PageHero';
import LangPicker from '@/components/LangPicker';
import { ALL_LOCALES10 } from '@/lib/locales';
import { snapHubCopy } from '@/lib/snap-tools-intl';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import PageGlow from '@/components/PageGlow';
import ReferralCards from '@/components/ReferralCards';
import { getCoupleMatch, type FaceVector, type CoupleMatchResult } from '@/lib/couple-match-data';
import { COUPLE_LABELS_INTL, COUPLE_POOL_INTL, COUPLE_COMMENT_INTL, COUPLE_UI, type SnapIntlLang } from '@/lib/snap-intl';
import { hashString, mix32, pick } from '@/lib/ratio-pick';

/**
 * 커플 관상 궁합 — en/zh판.
 *
 * 사진을 두 장 받아야 해서 SnapShell(한 장 기준)을 쓰지 않고 자체 흐름을 갖는다.
 * 측정식과 점수 계산은 한국어 페이지·lib과 동일하다.
 */
type FaceApiModule = typeof import('@vladmandic/face-api');
type Slot = 0 | 1;

const clampUnit = (x: number) => Math.max(0, Math.min(1, x));
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
const widthOf = (pts: { x: number }[]) => Math.max(...pts.map(p => p.x)) - Math.min(...pts.map(p => p.x));
const midpoint = (pts: { x: number; y: number }[]) => ({
  x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
  y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
});

interface Landmarks {
  getJawOutline(): { x: number; y: number }[];
  getMouth(): { x: number; y: number }[];
  getLeftEye(): { x: number; y: number }[];
  getRightEye(): { x: number; y: number }[];
  getNose(): { x: number; y: number }[];
  getLeftEyeBrow(): { x: number; y: number }[];
  getRightEyeBrow(): { x: number; y: number }[];
}

/** 한국어 페이지의 measureFaceVector와 동일한 식 */
function measureFaceVector(boxWidth: number, lm: Landmarks): FaceVector {
  const jaw = lm.getJawOutline();
  const leftBrow = lm.getLeftEyeBrow();
  const rightBrow = lm.getRightEyeBrow();
  const nose = lm.getNose();
  const leftEye = lm.getLeftEye();
  const rightEye = lm.getRightEye();
  const mouth = lm.getMouth();

  const faceHeight = Math.max(...jaw.map(p => p.y)) - Math.min(...[...leftBrow, ...rightBrow].map(p => p.y));
  const browMid = midpoint([...leftBrow, ...rightBrow]);
  const faceLength = dist(browMid, jaw[8]);
  const widthToLength = faceLength > 0 ? dist(jaw[0], jaw[16]) / faceLength : 0.8;

  const noseCenterX = midpoint(nose).x;
  const tiltOf = (eye: { x: number; y: number }[]) => {
    const minXPt = eye.reduce((a, b) => (a.x < b.x ? a : b));
    const maxXPt = eye.reduce((a, b) => (a.x > b.x ? a : b));
    const outer = Math.abs(minXPt.x - noseCenterX) > Math.abs(maxXPt.x - noseCenterX) ? minXPt : maxXPt;
    const inner = outer === minXPt ? maxXPt : minXPt;
    return inner.y - outer.y;
  };

  return {
    faceShape: clampUnit((widthToLength - 0.6) / 0.5),
    eyeTilt: clampUnit(0.5 + ((tiltOf(leftEye) + tiltOf(rightEye)) / 2 / faceHeight) * 6),
    eyeWidth: clampUnit(((widthOf(leftEye) + widthOf(rightEye)) / 2 / boxWidth) * 4.2),
    jawWidth: clampUnit((dist(jaw[2], jaw[14]) / boxWidth) * 1.15),
    noseWidth: clampUnit((widthOf(nose) / boxWidth) * 3.3),
    mouthWidth: clampUnit((widthOf(mouth) / boxWidth) * 2.6),
  };
}

export default function CoupleMatch({ lang }: { lang: SnapIntlLang }) {
  const ui = COUPLE_UI[lang];
  const [modelState, setModelState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [previews, setPreviews] = useState<(string | null)[]>([null, null]);
  const [vectors, setVectors] = useState<(FaceVector | null)[]>([null, null]);
  const [busy, setBusy] = useState<Slot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const urlsRef = useRef<(string | null)[]>([null, null]);
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

  useEffect(() => () => { urlsRef.current.forEach(u => u && URL.revokeObjectURL(u)); }, []);

  const handleFile = useCallback(async (slot: Slot, file: File) => {
    const faceapi = faceapiRef.current;
    if (!file.type.startsWith('image/') || !faceapi) return;

    const old = urlsRef.current[slot];
    if (old) URL.revokeObjectURL(old);
    const url = URL.createObjectURL(file);
    urlsRef.current[slot] = url;
    setPreviews(p => { const n = [...p]; n[slot] = url; return n; });
    setVectors(v => { const n = [...v]; n[slot] = null; return n; });
    setError(null);
    setBusy(slot);

    const img = new Image();
    img.src = url;
    await new Promise<void>(res => { img.onload = () => res(); img.onerror = () => res(); });

    const started = Date.now();
    let det;
    try {
      det = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.5 }))
        .withFaceLandmarks();
    } catch { det = undefined; }

    const elapsed = Date.now() - started;
    if (elapsed < 800) await new Promise(r => setTimeout(r, 800 - elapsed));

    if (!det || det.detection.score < 0.6) {
      setError(ui.noFace);
      setBusy(null);
      return;
    }

    const vec = measureFaceVector(det.detection.box.width, det.landmarks as unknown as Landmarks);
    setVectors(v => { const n = [...v]; n[slot] = vec; return n; });
    setBusy(null);
  }, [ui.noFace]);

  function reset() {
    urlsRef.current.forEach(u => u && URL.revokeObjectURL(u));
    urlsRef.current = [null, null];
    setPreviews([null, null]);
    setVectors([null, null]);
    setError(null);
    inputRefs.forEach(r => { if (r.current) r.current.value = ''; });
  }

  const [a, b] = vectors;
  let result: (CoupleMatchResult & { headlineIntl: string; commentIntl: string }) | null = null;
  if (a && b) {
    const raw = getCoupleMatch(a, b);
    const labels = COUPLE_LABELS_INTL[lang];
    const keys = ['faceShape', 'eyeTilt', 'eyeWidth', 'jawWidth', 'noseWidth', 'mouthWidth'];
    const seed = mix32(Math.floor(raw.score * 99991) >>> 0);
    const pool = COUPLE_POOL_INTL[lang];
    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
    result = {
      ...raw,
      // breakdown 순서는 lib의 LABELS 키 순서와 같으므로 인덱스로 라벨만 갈아 끼운다
      breakdown: raw.breakdown.map((m, i) => ({ ...m, label: labels[keys[i]] ?? m.label })),
      headlineIntl: raw.score >= 88 ? pick(pool.slice(0, 2), seed) : raw.score >= 75 ? pool[2] : pick(pool.slice(3), seed),
      commentIntl: pick(COUPLE_COMMENT_INTL[lang], (hashString(ymd) ^ seed) >>> 0),
    };
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950">
      <PageGlow accent="rose" />
      <div className="h-1 topbar" />
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href={`/${lang}/snap`} className="page-back hover:text-rose-600">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            {snapHubCopy(lang).kicker}
          </Link>
          <span className="text-slate-200 dark:text-slate-700">·</span>
          <span className="row-name">{ui.title}</span>
          <span className="ml-auto shrink-0">
            <LangPicker current={lang} route="/snap/couple-match" available={ALL_LOCALES10} />
          </span>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="mb-6">
          <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="💞" className="h-6 w-6" /></span>
          <div className="hero-band">
            <PageHero title={ui.title} desc={ui.lead} />
          </div>
        </div>

        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-lg p-4 mb-6 text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
          <p className="font-bold mb-1">{lang === 'en' ? '🔒 Neither photo leaves this device' : '🔒 两张照片都不会离开这台设备'}</p>
          <p>{ui.privacy}</p>
        </div>

        {modelState === 'error' && (
          <div role="alert" className="rounded-lg border-2 border-dashed border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 py-10 text-center text-sm font-bold text-rose-600 mb-6">
            {lang === 'en' ? 'Could not load the face detection model' : '人脸识别模型加载失败'}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          {([0, 1] as Slot[]).map(slot => (
            <div key={slot}>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 text-center">
                {slot === 0 ? ui.photoA : ui.photoB}
              </p>
              <button
                type="button"
                onClick={() => inputRefs[slot].current?.click()}
                disabled={modelState !== 'ready'}
                className="w-full aspect-square rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-rose-400 transition-colors overflow-hidden flex items-center justify-center disabled:opacity-50"
              >
                {previews[slot] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previews[slot]!} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ToolIcon emoji="📷" className="w-8 h-8 text-slate-800 dark:text-slate-100" />
                )}
              </button>
              {busy === slot && (
                <p role="status" className="text-[11px] text-center text-slate-400 mt-1">
                  {lang === 'en' ? 'Analysing…' : '分析中…'}
                </p>
              )}
              {vectors[slot] && busy !== slot && (
                <p className="text-[11px] text-center text-emerald-600 font-bold mt-1">✓</p>
              )}
              <input ref={inputRefs[slot]} type="file" accept="image/*" className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(slot, f); }} />
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-lg p-4 mb-6 text-center text-sm font-bold text-amber-700 dark:text-amber-300">
            🙈 {error}
          </div>
        )}

        {result ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-rose-400 to-fuchsia-500 rounded-lg p-6 text-white text-center">
              <p className="text-sm font-semibold text-white/80 mb-2">{ui.score}</p>
              <p className="text-5xl font-black mb-3">{result.score}</p>
              <p className="text-sm leading-relaxed">{result.headlineIntl}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
              <p className="label-caps mb-3">{ui.breakdown}</p>
              <div className="flex flex-col gap-3">
                {result.breakdown.map(m => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{m.label}</span>
                      <span className="text-xs font-bold text-rose-500">{m.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-sec rounded-full" style={{ width: `${m.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-rose-50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-100 dark:border-rose-900/40 rounded-lg p-5">
              <p className="text-xs font-bold text-rose-600 uppercase tracking-wide mb-2">{ui.comment}</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.commentIntl}</p>
            </div>

            <button type="button" onClick={reset}
              className="w-full py-3.5 rounded-lg font-bold text-sm bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-rose-300 hover:text-rose-600 transition-colors">
              {ui.reset}
            </button>

            <ReferralCards lang="en" placement="result" />
            <p className="text-center text-xs text-slate-300 dark:text-slate-600 pt-2">{ui.disclaimer}</p>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-300 dark:text-slate-600">
            <span className="bg-sec-soft mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg"><ToolIcon emoji="☝️" className="h-6 w-6" /></span>
            <p className="text-sm">{ui.pickBoth}</p>
          </div>
        )}
      </div>
    </div>
  );
}
