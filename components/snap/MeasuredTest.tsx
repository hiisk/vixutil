'use client';
import SnapShell, { type SnapDetection, type SnapLang, type SnapTheme } from './SnapShell';
import SaveResultCard from '@/components/SaveResultCard';
import { analyzeSnap, type SnapResult } from '@/lib/snap/analyze';
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
      dropHover: 'hover:border-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-950/40',
      resetHover: 'hover:border-sky-300 hover:text-sky-600',
    },
  },
  'head-pose': {
    icon: '🧭', bar: 'from-emerald-500 to-teal-600', glow: 'emerald',
    theme: {
      hover: 'hover:text-emerald-600',
      notice: 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300',
      spinner: 'border-t-emerald-500',
      dropHover: 'hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/40',
      resetHover: 'hover:border-emerald-300 hover:text-emerald-600',
    },
  },
  'real-smile': {
    icon: '😄', bar: 'from-amber-400 to-rose-500', glow: 'rose',
    theme: {
      hover: 'hover:text-rose-600',
      notice: 'bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-rose-800 dark:text-rose-300',
      spinner: 'border-t-rose-500',
      dropHover: 'hover:border-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/40',
      resetHover: 'hover:border-rose-300 hover:text-rose-600',
    },
  },
  'eye-open': {
    icon: '👁️', bar: 'from-violet-500 to-fuchsia-600', glow: 'violet',
    theme: {
      hover: 'hover:text-violet-600',
      notice: 'bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 text-violet-800 dark:text-violet-300',
      spinner: 'border-t-violet-500',
      dropHover: 'hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-950/40',
      resetHover: 'hover:border-violet-300 hover:text-violet-600',
    },
  },
  framing: {
    icon: '🖼️', bar: 'from-indigo-500 to-sky-500', glow: 'indigo',
    theme: {
      hover: 'hover:text-indigo-600',
      notice: 'bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-indigo-800 dark:text-indigo-300',
      spinner: 'border-t-indigo-500',
      dropHover: 'hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40',
      resetHover: 'hover:border-indigo-300 hover:text-indigo-600',
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
};

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

export default function MeasuredTest({ lang, slug }: { lang: SnapLang; slug: NewSnapSlug }) {
  const t = TOOL_TEXT[lang].tools[slug];
  const v = VOCAB[lang];
  const s = THEMES[slug];

  return (
    <SnapShell<SnapResult>
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
      analyze={d => analyzeSnap(lang, slug, toFace(d))}
      disclaimer={v.measured}
    >
      {(r, reset) => (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-5xl font-black tabular-nums text-slate-900 dark:text-slate-100">{r.percent}%</div>
            <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">{r.headline}</p>
          </div>

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

          <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
            <b>{v.advice}</b> — {r.weakest}
          </p>

          {/* 결과를 그림으로 저장·공유한다. 제휴 카드도 이 컴포넌트가 함께 든다. */}
          <SaveResultCard
            emoji={s.icon}
            title={`${t.title} ${r.percent}%`}
            subtitle={r.band}
            body={r.metrics.map(x => `${x.label} ${x.percent}%`).join(' · ')}
            from={CARD_COLOR[slug].from}
            to={CARD_COLOR[slug].to}
            fileName={`vixutil-${slug}`}
          />

          <button
            onClick={reset}
            className={`w-full rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-colors dark:border-slate-700 dark:text-slate-300 ${s.theme.resetHover}`}
          >
            ↺
          </button>
        </div>
      )}
    </SnapShell>
  );
}
