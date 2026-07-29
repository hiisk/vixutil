'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { pickByRatio, toPercent, hashString, mix32, pick } from '@/lib/ratio-pick';
import {
  SYMMETRY_POOL_INTL, SYMMETRY_REGION_LABELS, SYMMETRY_REGION_COMMENT,
  SYMMETRY_TIP_POOL_INTL, type SnapIntlLang,
} from '@/lib/snap-intl';

/** 측정식은 한국어 페이지의 measureSymmetry와 동일하다 */
const THEME: SnapTheme = {
  hover: 'hover:text-violet-600',
  notice: 'bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/40 text-violet-800 dark:text-violet-300',
  spinner: 'border-t-violet-500',
  dropHover: 'hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-950/40',
  resetHover: 'hover:border-violet-300 hover:text-violet-600',
};

const COPY = {
  en: {
    title: 'Face Symmetry',
    lead: 'Real landmarks measure the left–right balance of each feature',
    privacy: 'The balance really is measured from landmark positions, here in your browser. Almost no face is perfectly symmetrical, and natural asymmetry is widely considered part of what makes a face distinctive — a lower number is not a worse face.',
    overall: '⚖️ Overall symmetry',
    breakdown: '📊 By feature',
    best: 'Most balanced',
    tip: '📸 Photo tip',
    disclaimer: 'The landmark measurement is real; the interpretation is entertainment.',
  },
  zh: {
    title: '脸部对称度',
    lead: '用真实关键点分部位测量左右平衡',
    privacy: '左右平衡确实是根据关键点位置在这个浏览器里实测的。几乎没有完全对称的脸，自然的不对称通常被视为个性的一部分 —— 分数低并不代表不好看。',
    overall: '⚖️ 综合对称度',
    breakdown: '📊 分部位',
    best: '最均衡的部位',
    tip: '📸 拍照建议',
    disclaimer: '关键点测量为实测，解读仅供娱乐参考。',
  },
} as const;

interface Result {
  percent: number;
  text: string;
  regions: { key: string; label: string; percent: number; comment: string }[];
  bestRegion: string;
  tip: string;
}

const clampUnit = (x: number) => Math.max(0, Math.min(1, x));
const avgX = (pts: { x: number }[]) => pts.reduce((s, p) => s + p.x, 0) / pts.length;

export default function FaceSymmetry({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result {
    const lm = d.landmarks;
    const jaw = lm.getJawOutline();
    const nose = lm.getNose();
    const mouth = lm.getMouth();

    const midlineX = avgX(nose.slice(0, 4));
    const faceWidth = Math.max(...jaw.map(p => p.x)) - Math.min(...jaw.map(p => p.x));
    const ratios: Record<string, number> =
      faceWidth <= 0
        ? { eye: 0.5, brow: 0.5, mouth: 0.5, jaw: 0.5 }
        : (() => {
            const asymOf = (l: number, r: number) => Math.abs(Math.abs(l - midlineX) - Math.abs(r - midlineX));
            const toSym = (a: number) => clampUnit(1 - (a / faceWidth) * 6);
            const mx = mouth.map(p => p.x);
            const ml = mouth[mx.indexOf(Math.min(...mx))];
            const mr = mouth[mx.indexOf(Math.max(...mx))];
            return {
              eye: toSym(asymOf(avgX(lm.getLeftEye()), avgX(lm.getRightEye()))),
              brow: toSym(asymOf(avgX(lm.getLeftEyeBrow()), avgX(lm.getRightEyeBrow()))),
              mouth: toSym(asymOf(ml.x, mr.x)),
              jaw: toSym((asymOf(jaw[0].x, jaw[16].x) + asymOf(jaw[2].x, jaw[14].x) + asymOf(jaw[4].x, jaw[12].x)) / 3),
            };
          })();

    const labels = SYMMETRY_REGION_LABELS[lang];
    const bands = SYMMETRY_REGION_COMMENT[lang];
    const commentFor = (p: number) => (bands.find(b => p >= b.min) ?? bands[bands.length - 1]).text;

    const keys = ['eye', 'brow', 'mouth', 'jaw'];
    const regions = keys.map(k => {
      const percent = toPercent(ratios[k] ?? 0.5);
      return { key: k, label: labels[k], percent, comment: commentFor(percent) };
    });

    const avgRatio = keys.reduce((s, k) => s + (ratios[k] ?? 0.5), 0) / keys.length;
    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
    const tipSeed = (hashString(ymd) ^ mix32(Math.floor(avgRatio * 99991) >>> 0)) >>> 0;

    return {
      percent: toPercent(avgRatio),
      text: pickByRatio(SYMMETRY_POOL_INTL[lang], avgRatio),
      regions,
      bestRegion: [...regions].sort((a, b) => b.percent - a.percent)[0].label,
      tip: pick(SYMMETRY_TIP_POOL_INTL[lang], tipSeed),
    };
  }

  return (
    <SnapShell<Result>
      lang={lang}
      icon="⚖️"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-violet-500 via-purple-500 to-fuchsia-500"
      theme={THEME}
      glow="violet"
      resultId="symmetry-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl p-6 text-white text-center">
            <p className="text-sm font-semibold text-white/80 mb-2">{c.overall}</p>
            <p className="text-4xl font-black mb-3">{result.percent}%</p>
            <p className="text-sm leading-relaxed">{result.text}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{c.breakdown}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{c.best} · <strong className="text-violet-600">{result.bestRegion}</strong></p>
            </div>
            <div className="flex flex-col gap-3">
              {result.regions.map(r => (
                <div key={r.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="text-xs font-bold text-violet-500">
                      {r.percent}% <span className="text-slate-400 dark:text-slate-500 font-medium">· {r.comment}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" style={{ width: `${r.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20 border border-violet-100 dark:border-violet-900/40 rounded-2xl p-5">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
