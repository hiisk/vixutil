'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { hashString, mix32, pick } from '@/lib/ratio-pick';
import { measurePersonalColor } from '@/lib/personal-color-measure';
import {
  SUBTYPE_META, getPersonalizedPalette, getAvoidPalette,
  type MainSeason, type SubtypeKey,
} from '@/lib/personal-color-data';
import {
  SUBTYPE_LABELS_INTL, SWATCH_NAMES_INTL, PERSONAL_COLOR_POOL_INTL, PERSONAL_COLOR_TIP_INTL,
  type SnapIntlLang,
} from '@/lib/snap-intl';

/**
 * 퍼스널컬러 — en/zh판.
 *
 * 측정과 팔레트 생성은 한국어 lib을 그대로 쓴다. 팔레트 색은 실측값에서
 * 계산되므로 세 언어가 같은 사진에서 같은 hex를 낸다 — 여기서는 색 이름만
 * 언어별로 바꾼다.
 */
const THEME: SnapTheme = {
  hover: 'hover:text-pink-600',
  notice: 'bg-pink-50 dark:bg-pink-950/30 border border-pink-100 dark:border-pink-900/40 text-pink-800 dark:text-pink-300',
  spinner: 'border-t-pink-500',
  dropHover: 'hover:border-pink-400 hover:bg-pink-50/50 dark:hover:bg-pink-950/40',
  resetHover: 'hover:border-pink-300 hover:text-pink-600',
};

const COPY = {
  en: {
    title: 'Personal Colour Analysis',
    lead: 'Your cheek tone is sampled to place you in one of twelve seasonal types',
    privacy: 'Cheek pixels are read in your browser and white-balanced against the whole photo, because indoor lighting otherwise pushes cool skin to warm and vice versa. Lighting still affects the result — try it twice in different light before treating it as settled.',
    result: '🎨 Your type',
    palette: '✅ Colours that suit you',
    avoid: '🚫 Colours to go easy on',
    metrics: '📊 Measured',
    tip: '💡 Styling tip',
    warmth: 'Warm ↔ cool', clarity: 'Clarity', value: 'Lightness',
    disclaimer: 'The skin tone is genuinely sampled and white-balanced. Seasonal colour analysis is a styling convention, not a measurement standard.',
  },
} as const;

interface Swatch { name: string; hex: string }
interface Result {
  label: string; vibe: string; from: string; to: string; emoji: string;
  text: string;
  palette: Swatch[]; avoidPalette: Swatch[];
  warmthPercent: number; clarityPercent: number; valuePercent: number;
  tip: string;
}

const SUBTYPE_BY_BAND: Record<MainSeason, Record<'low' | 'mid' | 'high', SubtypeKey>> = {
  spring: { low: 'warmSpring', mid: 'trueSpring', high: 'lightSpring' },
  summer: { low: 'softSummer', mid: 'trueSummer', high: 'lightSummer' },
  autumn: { low: 'deepAutumn', mid: 'trueAutumn', high: 'softAutumn' },
  winter: { low: 'deepWinter', mid: 'trueWinter', high: 'brightWinter' },
};

const ORDER: SubtypeKey[] = [
  'warmSpring', 'trueSpring', 'lightSpring', 'softSummer', 'trueSummer', 'lightSummer',
  'deepAutumn', 'trueAutumn', 'softAutumn', 'deepWinter', 'trueWinter', 'brightWinter',
];

export default function PersonalColor({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result | null {
    const lm = d.landmarks;
    const r = measurePersonalColor(d.image, {
      jaw: lm.getJawOutline(), nose: lm.getNose(),
      leftEye: lm.getLeftEye(), rightEye: lm.getRightEye(),
    });

    const warm = r.warmthRatio >= 0.5;
    const clear = r.clarityRatio >= 0.5;
    const mainSeason: MainSeason = warm ? (clear ? 'spring' : 'autumn') : (clear ? 'winter' : 'summer');
    const band = r.valueRatio < 1 / 3 ? 'low' : r.valueRatio < 2 / 3 ? 'mid' : 'high';
    const subtype = SUBTYPE_BY_BAND[mainSeason][band];

    const meta = SUBTYPE_META[subtype];
    const intl = SUBTYPE_LABELS_INTL[lang][subtype];
    const names = SWATCH_NAMES_INTL[lang];
    // 색 이름이 표에 없으면 한국어 원본을 그대로 쓴다 — 빈칸보다는 낫다
    const rename = (s: Swatch): Swatch => ({ name: names[s.name] ?? s.name, hex: s.hex });

    const seed = mix32(
      Math.floor(r.warmthRatio * 99991 + r.clarityRatio * 15485863 + r.valueRatio * 1299709) >>> 0,
    );
    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;

    return {
      label: intl.label,
      vibe: intl.vibe,
      emoji: meta.emoji,
      from: meta.from,
      to: meta.to,
      text: PERSONAL_COLOR_POOL_INTL[lang][ORDER.indexOf(subtype)],
      palette: getPersonalizedPalette(mainSeason, r.clarityRatio, r.valueRatio).map(rename),
      avoidPalette: getAvoidPalette(mainSeason, r.clarityRatio, r.valueRatio).map(rename),
      warmthPercent: Math.round(r.warmthRatio * 100),
      clarityPercent: Math.round(r.clarityRatio * 100),
      valuePercent: Math.round(r.valueRatio * 100),
      tip: pick(PERSONAL_COLOR_TIP_INTL[lang], (hashString(ymd) ^ seed) >>> 0),
    };
  }

  return (
    <SnapShell<Result>
      lang={lang}
      icon="🎨"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-pink-400 via-rose-500 to-violet-500"
      theme={THEME}
      glow="rose"
      resultId="color-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="rounded-2xl p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${result.from}, ${result.to})` }}>
            <p className="text-sm font-semibold text-white/80 mb-2">{c.result}</p>
            <div className="text-5xl mb-2">{result.emoji}</div>
            <p className="text-2xl font-black mb-1">{result.label}</p>
            <p className="text-xs text-white/80 mb-3">{result.vibe}</p>
            <p className="text-sm leading-relaxed">{result.text}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-3">{c.palette}</p>
            <div className="grid grid-cols-3 gap-2">
              {result.palette.map(s => (
                <div key={s.hex} className="text-center">
                  <div className="w-full aspect-square rounded-xl border border-slate-200 dark:border-slate-700" style={{ background: s.hex }} />
                  <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 mt-1">{s.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-rose-500 uppercase tracking-wide mb-3">{c.avoid}</p>
            <div className="grid grid-cols-3 gap-2">
              {result.avoidPalette.map(s => (
                <div key={s.hex} className="text-center opacity-70">
                  <div className="w-full aspect-square rounded-xl border border-slate-200 dark:border-slate-700" style={{ background: s.hex }} />
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1">{s.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.metrics}</p>
            <div className="flex flex-col gap-3">
              {[
                { label: c.warmth, percent: result.warmthPercent },
                { label: c.clarity, percent: result.clarityPercent },
                { label: c.value, percent: result.valuePercent },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{m.label}</span>
                    <span className="text-xs font-bold text-pink-600">{m.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.percent}%`, background: `linear-gradient(90deg, ${result.from}, ${result.to})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-violet-50 dark:from-pink-950/20 dark:to-violet-950/20 border border-pink-100 dark:border-pink-900/40 rounded-2xl p-5">
            <p className="text-xs font-bold text-pink-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
