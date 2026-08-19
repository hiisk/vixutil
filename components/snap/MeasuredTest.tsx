'use client';
import { useEffect, useRef } from 'react';
import SnapShell, { type SnapDetection, type SnapLang, type SnapTheme } from './SnapShell';
import SaveResultCard from '@/components/SaveResultCard';
import { analyzeSnap, NEEDS_PIXELS, type SnapResult } from '@/lib/snap/analyze';
import { computeStats } from '@/lib/snap/pixels';
import { TOOL_TEXT, type NewSnapSlug } from '@/lib/snap/tool-text';
import { VOCAB } from '@/lib/snap/copy';
import type { Face } from '@/lib/snap/measures';

/**
 * 랜드마크만 보는 새 스냅테스트 다섯이 함께 쓰는 화면.
 *
 * 다섯이 하는 일이 같다 — 얼굴을 재서 0~100 점수 하나와 항목 몇 개를 낸다.
 * 도구마다 컴포넌트를 따로 두면 같은 코드가 다섯 벌이 되고, 막대 하나를
 * 고칠 때 다섯 군데를 고치게 된다. 다른 것은 색과 문구뿐이라 그것만 받는다.
 */
const THEMES: Record<NewSnapSlug, { icon: string; bar: string; glow: SnapTheme extends never ? never : 'indigo' | 'violet' | 'rose' | 'emerald' | 'sky'; theme: SnapTheme }> = {
  'id-photo': {
    icon: '🪪', bar: 'from-sky-500 to-indigo-600', glow: 'sky',
    theme: {
      hover: 'hover:text-sky-600',
      notice: 'bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-sky-800 dark:text-sky-300',
      spinner: 'border-t-sky-500',
      dropHover: 'hover:border-sky-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-sky-600',
    },
  },
  'head-pose': {
    icon: '🧭', bar: 'from-emerald-500 to-teal-600', glow: 'emerald',
    theme: {
      hover: 'hover:text-emerald-600',
      notice: 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300',
      spinner: 'border-t-emerald-500',
      dropHover: 'hover:border-emerald-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-emerald-600',
    },
  },
  'real-smile': {
    icon: '😄', bar: 'from-amber-400 to-rose-500', glow: 'rose',
    theme: {
      hover: 'hover:text-rose-600',
      notice: 'bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-rose-800 dark:text-rose-300',
      spinner: 'border-t-rose-500',
      dropHover: 'hover:border-rose-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-rose-600',
    },
  },
  'eye-open': {
    icon: '👁️', bar: 'from-violet-500 to-fuchsia-600', glow: 'violet',
    theme: {
      hover: 'hover:text-violet-600',
      notice: 'bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 text-violet-800 dark:text-violet-300',
      spinner: 'border-t-violet-500',
      dropHover: 'hover:border-violet-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-violet-600',
    },
  },
  lighting: {
    icon: '💡', bar: 'from-amber-400 to-amber-700', glow: 'rose',
    theme: {
      hover: 'hover:text-amber-600',
      notice: 'bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-amber-800 dark:text-amber-300',
      spinner: 'border-t-amber-500',
      dropHover: 'hover:border-amber-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-amber-600',
    },
  },
  sharpness: {
    icon: '🔍', bar: 'from-cyan-500 to-blue-700', glow: 'sky',
    theme: {
      hover: 'hover:text-cyan-600',
      notice: 'bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/40 text-cyan-800 dark:text-cyan-300',
      spinner: 'border-t-cyan-500',
      dropHover: 'hover:border-cyan-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-cyan-600',
    },
  },
  'white-balance': {
    icon: '🎚️', bar: 'from-teal-400 to-violet-600', glow: 'violet',
    theme: {
      hover: 'hover:text-teal-600',
      notice: 'bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 text-teal-800 dark:text-teal-300',
      spinner: 'border-t-teal-500',
      dropHover: 'hover:border-teal-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-teal-600',
    },
  },
  distance: {
    icon: '📏', bar: 'from-lime-500 to-green-700', glow: 'emerald',
    theme: {
      hover: 'hover:text-lime-600',
      notice: 'bg-lime-50 dark:bg-lime-950/30 border border-lime-100 dark:border-lime-900/40 text-lime-800 dark:text-lime-300',
      spinner: 'border-t-lime-500',
      dropHover: 'hover:border-lime-400 hover:bg-lime-50/50 dark:hover:bg-lime-950/40',
      resetHover: 'hover:border-lime-300 hover:text-lime-600',
    },
  },
  mirror: {
    icon: '🪞', bar: 'from-purple-500 to-indigo-800', glow: 'violet',
    theme: {
      hover: 'hover:text-purple-600',
      notice: 'bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-purple-800 dark:text-purple-300',
      spinner: 'border-t-purple-500',
      dropHover: 'hover:border-purple-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-purple-600',
    },
  },
  framing: {
    icon: '🖼️', bar: 'from-indigo-500 to-sky-500', glow: 'indigo',
    theme: {
      hover: 'hover:text-indigo-600',
      notice: 'bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-300',
      spinner: 'border-t-indigo-500',
      dropHover: 'hover:border-indigo-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-indigo-600',
    },
  },
  'face-thirds': {
    icon: '📏', bar: 'from-amber-500 to-amber-800', glow: 'sky',
    theme: {
      hover: 'hover:text-amber-600',
      notice: 'bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-amber-800 dark:text-amber-300',
      spinner: 'border-t-amber-500',
      dropHover: 'hover:border-amber-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-amber-600',
    },
  },
  'eye-spacing': {
    icon: '👀', bar: 'from-sky-500 to-blue-700', glow: 'sky',
    theme: {
      hover: 'hover:text-sky-600',
      notice: 'bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-sky-800 dark:text-sky-300',
      spinner: 'border-t-sky-500',
      dropHover: 'hover:border-sky-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-sky-600',
    },
  },
  'face-shape': {
    icon: '🥚', bar: 'from-rose-500 to-rose-800', glow: 'rose',
    theme: {
      hover: 'hover:text-rose-600',
      notice: 'bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-rose-800 dark:text-rose-300',
      spinner: 'border-t-rose-500',
      dropHover: 'hover:border-rose-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-rose-600',
    },
  },
  'brows': {
    icon: '🤨', bar: 'from-violet-500 to-violet-800', glow: 'violet',
    theme: {
      hover: 'hover:text-violet-600',
      notice: 'bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 text-violet-800 dark:text-violet-300',
      spinner: 'border-t-violet-500',
      dropHover: 'hover:border-violet-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-violet-600',
    },
  },
  'lips': {
    icon: '👄', bar: 'from-pink-500 to-pink-800', glow: 'rose',
    theme: {
      hover: 'hover:text-rose-600',
      notice: 'bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-rose-800 dark:text-rose-300',
      spinner: 'border-t-rose-500',
      dropHover: 'hover:border-rose-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-rose-600',
    },
  },
  'contrast': {
    icon: '🌗', bar: 'from-indigo-500 to-indigo-900', glow: 'indigo',
    theme: {
      hover: 'hover:text-indigo-600',
      notice: 'bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-300',
      spinner: 'border-t-indigo-500',
      dropHover: 'hover:border-indigo-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-indigo-600',
    },
  },
  'backdrop': {
    icon: '🖼️', bar: 'from-emerald-500 to-emerald-800', glow: 'emerald',
    theme: {
      hover: 'hover:text-emerald-600',
      notice: 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300',
      spinner: 'border-t-emerald-500',
      dropHover: 'hover:border-emerald-400 hover:bg-sec-soft ',
      resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-emerald-600',
    },
  },
};

/** 결과 그림의 바탕색 — Tailwind 클래스가 아니라 실제 색이 필요하다 */
const CARD_COLOR: Record<NewSnapSlug, { from: string; to: string }> = {
  'id-photo': { from: '#0ea5e9', to: '#4f46e5' },
  'head-pose': { from: '#10b981', to: '#0d9488' },
  'real-smile': { from: '#fbbf24', to: '#f43f5e' },
  'eye-open': { from: '#8b5cf6', to: '#c026d3' },
  framing: { from: '#6366f1', to: '#0ea5e9' },
  lighting: { from: '#f59e0b', to: '#78350f' },
  sharpness: { from: '#0891b2', to: '#1e3a8a' },
  'white-balance': { from: '#14b8a6', to: '#7c3aed' },
  distance: { from: '#65a30d', to: '#166534' },
  mirror: { from: '#a855f7', to: '#1e1b4b' },
  'face-thirds': { from: '#f59e0b', to: '#b45309' },
  'eye-spacing': { from: '#0ea5e9', to: '#1d4ed8' },
  'face-shape': { from: '#f43f5e', to: '#be123c' },
  'brows': { from: '#8b5cf6', to: '#6d28d9' },
  'lips': { from: '#ec4899', to: '#9d174d' },
  'contrast': { from: '#6366f1', to: '#312e81' },
  'backdrop': { from: '#10b981', to: '#065f46' },
};

/**
 * 캔버스에서 픽셀 통계를 뽑는다.
 *
 * 계산은 lib/snap/pixels.ts에 있고 여기서는 읽기만 한다 — 브라우저 API가
 * 필요한 부분만 화면에 남기고, 셈은 검사가 부를 수 있는 자리에 둔다.
 *
 * 큰 사진을 그대로 읽으면 느리므로 가로 640으로 줄여서 읽는다. 통계값이라
 * 줄여도 결과가 거의 같다.
 */
function statsOf(d: SnapDetection) {
  const img = d.image;
  const scale = Math.min(1, 640 / (img.naturalWidth || 1));
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return undefined;
  ctx.drawImage(img, 0, 0, w, h);
  const box = {
    x: d.box.x * scale, y: d.box.y * scale,
    width: d.box.width * scale, height: d.box.height * scale,
  };
  return computeStats(ctx.getImageData(0, 0, w, h).data, w, h, box);
}

/** SnapDetection에서 측정에 필요한 것만 뽑는다 — 측정식은 face-api 타입을 모른다 */
function toFace(d: SnapDetection): Face {
  const lm = d.landmarks;
  return {
    jaw: lm.getJawOutline(), mouth: lm.getMouth(),
    leftEye: lm.getLeftEye(), rightEye: lm.getRightEye(), nose: lm.getNose(),
    leftBrow: lm.getLeftEyeBrow(), rightBrow: lm.getRightEyeBrow(),
    box: d.box, imageWidth: d.image.naturalWidth, imageHeight: d.image.naturalHeight,
  };
}

/**
 * 좌우 합성 얼굴 — 콧대를 축으로 한쪽 반쪽을 뒤집어 붙인다.
 *
 * 여기만 결과가 숫자가 아니라 그림이다. 점수 막대만 보여 주면 "이미지를
 * 뒤집어 붙인다"는 안내와 화면이 어긋난다.
 */
function MirrorPair({ img, axis, box }: { img: HTMLImageElement; axis: number; box: { x: number; y: number; width: number; height: number } }) {
  const left = useRef<HTMLCanvasElement>(null);
  const right = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    /* 얼굴 둘레로 조금 넉넉히 잘라 낸다 — 딱 맞게 자르면 턱선이 잘린다 */
    const pad = box.height * 0.35;
    const top = Math.max(0, box.y - pad);
    const bottom = Math.min(img.naturalHeight, box.y + box.height + pad * 0.6);
    const h = bottom - top;
    const half = Math.min(axis - Math.max(0, box.x - pad * 0.4), Math.min(img.naturalWidth, box.x + box.width + pad * 0.4) - axis);
    if (h <= 0 || half <= 0) return;

    for (const [ref, side] of [[left, -1], [right, 1]] as const) {
      const c = ref.current;
      const ctx = c?.getContext('2d');
      if (!c || !ctx) continue;
      c.width = Math.round(half * 2);
      c.height = Math.round(h);
      ctx.clearRect(0, 0, c.width, c.height);
      // 그 쪽 반쪽을 그리고, 같은 것을 좌우로 뒤집어 반대쪽에 붙인다
      const sx = side === -1 ? axis - half : axis;
      for (const flip of [false, true]) {
        ctx.save();
        if (flip !== (side === 1)) { ctx.translate(c.width, 0); ctx.scale(-1, 1); }
        ctx.drawImage(img, sx, top, half, h, flip ? half : 0, 0, half, h);
        ctx.restore();
      }
    }
  }, [img, axis, box]);

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* ref를 배열에 담아 돌면 React가 막는다 — 둘뿐이니 그냥 적는다 */}
      <canvas ref={left} className="w-full rounded-lg bg-slate-100 dark:bg-slate-800" />
      <canvas ref={right} className="w-full rounded-lg bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}

/*
 * 결과에 원본 이미지를 함께 담는다. ref에 넣어 두고 렌더에서 읽으면 React가
 * 막는다 — 렌더 중 ref 접근은 다시 그릴 때 값이 어긋날 수 있어서다.
 */
type Shown = SnapResult & { image: HTMLImageElement };

export default function MeasuredTest({ lang, slug }: { lang: SnapLang; slug: NewSnapSlug }) {
  const t = TOOL_TEXT[lang].tools[slug];
  const v = VOCAB[lang];
  const s = THEMES[slug];

  return (
    <SnapShell<Shown>
      lang={lang}
      slug={slug}
      icon={s.icon}
      title={t.title}
      lead={t.lead}
      privacyBody={t.privacy}
      bar={s.bar}
      theme={s.theme}
      glow={s.glow}
      resultId={`${slug}-result`}
      analyze={d => ({
        ...analyzeSnap(lang, slug, toFace(d), NEEDS_PIXELS.has(slug) ? statsOf(d) : undefined),
        image: d.image,
      })}
      disclaimer={v.measured}
    >
      {(r, reset) => (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-bold tabular-nums text-slate-900 dark:text-slate-100">{r.percent}%</div>
            <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{r.headline}</p>
          </div>

          {r.mirror && <MirrorPair img={r.image} axis={r.mirror.axis} box={r.mirror.box} />}

          <div>
            <h3 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">{v.detail}</h3>
            <ul className="space-y-3">
              {r.metrics.map(x => (
                <li key={x.key}>
                  <div className="mb-1 flex items-baseline justify-between text-sm">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{x.label}</span>
                    <span className="tabular-nums text-slate-500 dark:text-slate-400">
                      {x.raw ? `${x.raw} · ` : ''}{x.percent}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-full rounded-full bg-gradient-to-r ${s.bar}`} style={{ width: `${x.percent}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
            <b>{v.advice}</b> — {r.weakest}
          </p>

          {/*
            결과를 그림으로 저장·공유한다. 제휴 카드도 이 컴포넌트가 함께 든다.
            lang을 안 넘기면 SaveResultCard 기본값이 'ko'라 아홉 외국어 화면에
            한국어 버튼·카드가 붙는다.
          */}
          <SaveResultCard
            emoji={s.icon}
            title={`${t.title} ${r.percent}%`}
            subtitle={r.band}
            body={r.metrics.map(x => `${x.label} ${x.percent}%`).join(' · ')}
            from={CARD_COLOR[slug].from}
            to={CARD_COLOR[slug].to}
            fileName={`vixutil-${slug}`}
            lang={lang}
          />

          <button
            onClick={reset}
            className={`w-full rounded-lg border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-colors dark:border-slate-700 dark:text-slate-300 ${s.theme.resetHover}`}
          >
            ↺
          </button>
        </div>
      )}
    </SnapShell>
  );
}
