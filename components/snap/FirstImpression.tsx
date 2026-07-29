'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { hashString, toPercent, pick } from '@/lib/ratio-pick';
import {
  IMPRESSION_TYPES_INTL, IMPRESSION_TIPS_INTL,
  type ImpressionIdIntl, type SnapIntlLang,
} from '@/lib/snap-intl';

/** 유형 판정 규칙과 측정식은 한국어 페이지·lib과 동일하다 */
const THEME: SnapTheme = {
  hover: 'hover:text-fuchsia-600',
  notice: 'bg-fuchsia-50 dark:bg-fuchsia-950/30 border border-fuchsia-100 dark:border-fuchsia-900/40 text-fuchsia-800 dark:text-fuchsia-300',
  spinner: 'border-t-fuchsia-500',
  dropHover: 'hover:border-fuchsia-400 hover:bg-fuchsia-50/50 dark:hover:bg-fuchsia-950/40',
  resetHover: 'hover:border-fuchsia-300 hover:text-fuchsia-600',
};

const COPY = {
  en: {
    title: 'First Impression Analyser',
    lead: 'Eye size, face proportion and mouth lift decide which of six impressions you read as',
    privacy: 'The three ratios come from real landmark positions measured in your browser. What they describe is the geometry of one photo — change the angle or the light and the reading changes, which is exactly how first impressions work too.',
    result: '✨ Your first impression',
    scores: '📊 What was measured',
    strength: '💪 Where this works for you',
    tip: '💡 Tip',
    eye: 'Eye size', face: 'Face length', mouth: 'Mouth lift',
    disclaimer: 'The ratios are measured; naming an impression from them is entertainment.',
  },
  zh: {
    title: '第一印象分析',
    lead: '眼睛大小、脸型比例与嘴角上扬决定你属于六种印象中的哪一种',
    privacy: '三项比例来自在你浏览器内实测的关键点位置。它描述的是这一张照片的几何形状 —— 换个角度或光线，结果就会变，而第一印象本来也是这样运作的。',
    result: '✨ 你的第一印象',
    scores: '📊 实测数据',
    strength: '💪 这在什么场合有优势',
    tip: '💡 小建议',
    eye: '眼睛大小', face: '脸部长度', mouth: '嘴角上扬',
    disclaimer: '比例为实测，由此命名印象类型则仅供娱乐。',
  },
} as const;

interface Result {
  id: ImpressionIdIntl;
  label: string; emoji: string; desc: string; strength: string; keywords: string[]; color: string;
  eyeScore: number; faceScore: number; mouthScore: number;
  tip: string;
}

const clampUnit = (x: number) => Math.max(0, Math.min(1, x));

export default function FirstImpression({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result {
    const lm = d.landmarks;
    const jaw = lm.getJawOutline();
    const mouth = lm.getMouth();
    const leftEye = lm.getLeftEye();
    const rightEye = lm.getRightEye();

    const jawYs = jaw.map(p => p.y);
    const jawXs = jaw.map(p => p.x);
    const faceH = Math.max(...jawYs) - Math.min(...jawYs);
    const faceW = Math.max(...jawXs) - Math.min(...jawXs);

    let eye = 0.5, face = 0.5, mouthScore = 0.5;
    if (faceH > 0 && faceW > 0) {
      const eyeH = (e: { y: number }[]) => Math.max(...e.map(p => p.y)) - Math.min(...e.map(p => p.y));
      eye = clampUnit((((eyeH(leftEye) + eyeH(rightEye)) / 2) / faceH - 0.03) / 0.06);
      face = clampUnit((faceH / faceW - 1.1) / 0.5);

      const mYs = mouth.map(p => p.y);
      const mouthH = Math.max(...mYs) - Math.min(...mYs);
      const mouthCenterY = (Math.max(...mYs) + Math.min(...mYs)) / 2;
      const leftCorner = mouth.reduce((a, p) => (p.x < a.x ? p : a), mouth[0]);
      const rightCorner = mouth.reduce((a, p) => (p.x > a.x ? p : a), mouth[0]);
      const cornerY = (leftCorner.y + rightCorner.y) / 2;
      const raw = mouthH > 0 ? (mouthCenterY - cornerY) / mouthH : 0;
      mouthScore = clampUnit((raw + 0.2) / 0.5);
    }

    // 좌표가 겹치면 NaN이 나온다. 그대로 두면 화면에 NaN%가 찍히므로 중간값으로 막는다.
    const safe = (x: number) => (Number.isFinite(x) ? clampUnit(x) : 0.5);
    const eyeRatio = safe(eye), faceRatio = safe(face), mouthRatio = safe(mouthScore);

    const bigEyes = eyeRatio >= 0.5;
    const longFace = faceRatio >= 0.5;
    const smiling = mouthRatio >= 0.5;

    let id: ImpressionIdIntl;
    if (bigEyes && smiling) id = longFace ? 'energetic' : 'bright';
    else if (bigEyes && !smiling) id = longFace ? 'chic' : 'energetic';
    else if (!bigEyes && smiling) id = longFace ? 'elegant' : 'soft';
    else id = longFace ? 'elegant' : 'calm';

    const type = IMPRESSION_TYPES_INTL[lang][id];
    const seed = hashString(`${eyeRatio.toFixed(3)}-${faceRatio.toFixed(3)}-${mouthRatio.toFixed(3)}`);

    return {
      id, ...type,
      eyeScore: toPercent(eyeRatio),
      faceScore: toPercent(faceRatio),
      mouthScore: toPercent(mouthRatio),
      tip: pick(IMPRESSION_TIPS_INTL[lang], seed),
    };
  }

  return (
    <SnapShell<Result>
      lang={lang}
      icon="✨"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-fuchsia-500 via-violet-500 to-sky-500"
      theme={THEME}
      glow="violet"
      resultId="impression-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className={`bg-gradient-to-br ${result.color} rounded-2xl p-6 text-white text-center`}>
            <p className="text-sm font-semibold text-white/80 mb-2">{c.result}</p>
            <div className="text-5xl mb-2">{result.emoji}</div>
            <p className="text-2xl font-black mb-3">{result.label}</p>
            <p className="text-sm leading-relaxed">{result.desc}</p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-4">
              {result.keywords.map(k => (
                <span key={k} className="text-xs font-bold bg-white/25 rounded-full px-3 py-1">#{k}</span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.scores}</p>
            <div className="flex flex-col gap-3">
              {[
                { label: c.eye, percent: result.eyeScore },
                { label: c.face, percent: result.faceScore },
                { label: c.mouth, percent: result.mouthScore },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{m.label}</span>
                    <span className="text-xs font-bold text-fuchsia-600">{m.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-full" style={{ width: `${m.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-2">{c.strength}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.strength}</p>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-50 to-violet-50 dark:from-fuchsia-950/20 dark:to-violet-950/20 border border-fuchsia-100 dark:border-fuchsia-900/40 rounded-2xl p-5">
            <p className="text-xs font-bold text-fuchsia-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
