'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { pickByRatio, toPercent, hashString, mix32, pick } from '@/lib/ratio-pick';
import { FEATURE_META } from '@/lib/face-reading-data';
import {
  FEATURE_LABELS_INTL, FEATURE_POOL_INTL, FACE_READING_OVERALL_INTL, FACE_READING_LUCK_INTL,
  type FeatureKeyIntl, type SnapIntlLang,
} from '@/lib/snap-intl';

/**
 * 관상 — en/zh판. 중화권에서는 面相이 본토 문화라 zh 수요가 크다.
 * 7개 부위 비율 측정식은 한국어 페이지와 동일하다.
 */
const THEME: SnapTheme = {
  hover: 'hover:text-amber-600',
  notice: 'bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-amber-800 dark:text-amber-300',
  spinner: 'border-t-amber-500',
  dropHover: 'hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/40',
  resetHover: 'hover:border-amber-300 hover:text-amber-600',
};

const COPY = {
  en: {
    title: 'Face Reading',
    lead: 'Seven facial proportions measured and read in the traditional style',
    privacy: 'The seven ratios come from real landmark positions measured in your browser. The readings attached to them come from physiognomy, a traditional practice with no scientific standing — the measurements are real, the interpretation is for fun.',
    overall: '🔮 Overall reading',
    features: '📊 Feature by feature',
    luck: '🍀 Today',
    disclaimer: 'The proportions are genuinely measured. Physiognomy has no scientific basis — read the interpretation as entertainment.',
  },
  zh: {
    title: '面相分析',
    lead: '实测七处五官比例，按传统面相解读',
    privacy: '七项比例来自在你浏览器内实测的关键点位置。附上的解读出自面相学 —— 这是传统说法，并无科学依据。测量是真的，解读只是图个乐子。',
    overall: '🔮 整体面相',
    features: '📊 分部位解读',
    luck: '🍀 今日',
    disclaimer: '比例为真实测量。面相学没有科学依据，解读部分仅供娱乐。',
  },
} as const;

interface Result {
  overall: string;
  features: { key: FeatureKeyIntl; label: string; icon: string; text: string; percent: number }[];
  todayLuck: string;
}

const clampUnit = (x: number) => Math.max(0, Math.min(1, x));
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
const widthOf = (pts: { x: number }[]) => Math.max(...pts.map(p => p.x)) - Math.min(...pts.map(p => p.x));
const midpoint = (pts: { x: number; y: number }[]) => ({
  x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
  y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
});

export default function FaceReading({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result {
    const lm = d.landmarks;
    const jaw = lm.getJawOutline();
    const leftBrow = lm.getLeftEyeBrow();
    const rightBrow = lm.getRightEyeBrow();
    const nose = lm.getNose();
    const leftEye = lm.getLeftEye();
    const rightEye = lm.getRightEye();
    const mouth = lm.getMouth();

    const faceWidth = d.box.width;
    const faceHeight = d.box.height;

    const browMid = midpoint([...leftBrow, ...rightBrow]);
    const faceLength = dist(browMid, jaw[8]);
    const widthToLength = faceLength > 0 ? dist(jaw[0], jaw[16]) / faceLength : 0.8;
    const faceShapeRatio = clampUnit((widthToLength - 0.6) / 0.5);

    const archOf = (brow: { y: number }[]) => {
      const ys = brow.map(p => p.y);
      return (ys[0] + ys[ys.length - 1]) / 2 - Math.min(...ys);
    };
    const eyebrowArchRatio = clampUnit(((archOf(leftBrow) + archOf(rightBrow)) / 2 / faceHeight) * 8);
    const eyeWidthRatio = clampUnit(((widthOf(leftEye) + widthOf(rightEye)) / 2 / faceWidth) * 4.2);

    const noseCenterX = midpoint(nose).x;
    const tiltOf = (eye: { x: number; y: number }[]) => {
      const minXPt = eye.reduce((a, b) => (a.x < b.x ? a : b));
      const maxXPt = eye.reduce((a, b) => (a.x > b.x ? a : b));
      const outer = Math.abs(minXPt.x - noseCenterX) > Math.abs(maxXPt.x - noseCenterX) ? minXPt : maxXPt;
      const inner = outer === minXPt ? maxXPt : minXPt;
      return inner.y - outer.y;
    };
    const eyeTiltRatio = clampUnit(0.5 + ((tiltOf(leftEye) + tiltOf(rightEye)) / 2 / faceHeight) * 6);
    const noseWidthRatio = clampUnit((widthOf(nose) / faceWidth) * 3.3);
    const mouthWidthRatio = clampUnit((widthOf(mouth) / faceWidth) * 2.6);
    const jawWidthRatio = clampUnit((dist(jaw[2], jaw[14]) / faceWidth) * 1.15);

    const labels = FEATURE_LABELS_INTL[lang];
    const pools = FEATURE_POOL_INTL[lang];
    const pairs: [FeatureKeyIntl, number][] = [
      ['faceShape', faceShapeRatio], ['eyebrow', eyebrowArchRatio], ['eye', eyeWidthRatio],
      ['eyeTilt', eyeTiltRatio], ['nose', noseWidthRatio], ['mouth', mouthWidthRatio], ['chin', jawWidthRatio],
    ];

    const packed =
      faceShapeRatio * 997 + eyebrowArchRatio * 7919 + eyeWidthRatio * 104729 +
      eyeTiltRatio * 500009 + noseWidthRatio * 1299709 + mouthWidthRatio * 15485863 + jawWidthRatio * 179424673;
    const seed = mix32(Math.floor(packed * 1000) >>> 0);

    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;

    return {
      overall: pick(FACE_READING_OVERALL_INTL[lang], seed),
      features: pairs.map(([key, ratio]) => ({
        key,
        label: labels[key],
        icon: FEATURE_META[key].icon,
        text: pickByRatio(pools[key], ratio),
        percent: toPercent(ratio),
      })),
      todayLuck: pick(FACE_READING_LUCK_INTL[lang], (hashString(ymd) ^ seed) >>> 0),
    };
  }

  return (
    <SnapShell<Result>
      lang={lang}
      icon="🔮"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-amber-400 via-orange-500 to-red-500"
      theme={THEME}
      resultId="reading-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="bg-gradient-to-br from-amber-500 to-red-500 rounded-2xl p-6 text-white text-center">
            <p className="text-sm font-semibold text-white/80 mb-2">{c.overall}</p>
            <p className="text-sm leading-relaxed">{result.overall}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.features}</p>
            <div className="flex flex-col gap-4">
              {result.features.map(f => (
                <div key={f.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{f.icon} {f.label}</span>
                    <span className="text-xs font-bold text-amber-600">{f.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-1.5">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${f.percent}%` }} />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-5">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">{c.luck}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.todayLuck}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
