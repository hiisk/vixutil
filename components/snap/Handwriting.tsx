'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { pickByRatio, toPercent, hashString, mix32, pick } from '@/lib/ratio-pick';
import {
  SLANT_POOL_INTL, PRESSURE_POOL_INTL, HANDWRITING_TIP_INTL, type SnapIntlLang,
} from '@/lib/snap-intl';

/**
 * 손글씨 심리 — en/zh판.
 *
 * 얼굴이 아니라 글씨 사진이므로 requiresFace={false}. 기울기는 구조텐서로
 * 이미지 그라디언트 방향을 분석해 구하고(지문 인식에도 쓰는 방식), 필압은
 * 어두운 픽셀 비율로 잰다. 측정식은 한국어 페이지와 동일하다.
 */
const THEME: SnapTheme = {
  hover: 'hover:text-teal-600',
  notice: 'bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 text-teal-800 dark:text-teal-300',
  spinner: 'border-t-teal-500',
  dropHover: 'hover:border-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-950/40',
  resetHover: 'hover:border-teal-300 hover:text-teal-600',
};

const COPY = {
  en: {
    title: 'Handwriting Analysis',
    lead: 'Photograph some handwriting — the slant and pressure are measured from the strokes',
    privacy: 'The slant is derived from the image gradients using a structure tensor, the same approach used in fingerprint analysis, and the pressure from how dark the strokes are. The measurement is real; the personality reading attached to it is graphology, which is entertainment rather than science.',
    result: '✍️ Your handwriting',
    slant: 'Slant',
    pressure: 'Pressure',
    tip: '💡 Today',
    noStrokes: 'Not enough stroke edges were found. Try a photo with clear, dark writing on a light background, filling most of the frame.',
    disclaimer: 'Slant and pressure are genuinely measured. Graphology is not an established science — read the interpretation as entertainment.',
  },
  zh: {
    title: '笔迹分析',
    lead: '拍一张手写字 —— 从笔画测量倾斜度与笔压',
    privacy: '倾斜度用结构张量分析图像梯度方向得出（指纹识别也用这个方法），笔压则由笔画的深浅计算。测量是真实的，但附在上面的性格解读属于笔迹学，仅供娱乐而非科学结论。',
    result: '✍️ 你的笔迹',
    slant: '倾斜度',
    pressure: '笔压',
    tip: '💡 今日建议',
    noStrokes: '没有找到足够的笔画边缘。请用浅色背景、字迹清晰且占满画面的照片再试一次。',
    disclaimer: '倾斜度与笔压为真实测量。笔迹学并非公认的科学，解读部分仅供娱乐。',
  },
} as const;

interface Result {
  slantPercent: number;
  slantDeg: number;
  slantText: string;
  pressurePercent: number;
  pressureText: string;
  tip: string;
}

const clampUnit = (x: number) => Math.max(0, Math.min(1, x));

export default function Handwriting({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result | null {
    const img = d.image;
    const longSide = Math.max(img.naturalWidth, img.naturalHeight);
    const scale = Math.min(1, 700 / longSide);
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    const gray = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      const o = i * 4;
      gray[i] = 0.299 * data[o] + 0.587 * data[o + 1] + 0.114 * data[o + 2];
    }

    let Sxx = 0, Syy = 0, Sxy = 0, edgeCount = 0, darkCount = 0;
    const EDGE_THRESHOLD = 24;
    const DARK_THRESHOLD = 150;

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        if (gray[i] < DARK_THRESHOLD) darkCount++;
        const gx = gray[i + 1] - gray[i - 1];
        const gy = gray[i + w] - gray[i - w];
        if (Math.hypot(gx, gy) > EDGE_THRESHOLD) {
          edgeCount++;
          Sxx += gx * gx; Syy += gy * gy; Sxy += gx * gy;
        }
      }
    }

    const totalPixels = w * h;
    const pressureRatio = clampUnit((darkCount / totalPixels - 0.02) / 0.18);

    // 획의 경계로 볼 만한 픽셀이 너무 적으면(빈 종이 등) 결과를 내지 않는다.
    if (edgeCount < totalPixels * 0.003) return null;

    const ridgeAngle = 0.5 * Math.atan2(2 * Sxy, Sxx - Syy) + Math.PI / 2;
    let deg = (ridgeAngle * 180) / Math.PI;
    while (deg > 90) deg -= 180;
    while (deg < -90) deg += 180;
    const clampedDeg = Math.max(-35, Math.min(35, deg));
    const slantRatio = clampUnit((clampedDeg + 35) / 70);

    const seed = mix32(Math.floor(slantRatio * 99991 + pressureRatio * 15485863) >>> 0);
    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;

    return {
      slantPercent: toPercent(slantRatio),
      slantDeg: Math.round((slantRatio - 0.5) * 70),
      slantText: pickByRatio(SLANT_POOL_INTL[lang], slantRatio),
      pressurePercent: toPercent(pressureRatio),
      pressureText: pickByRatio(PRESSURE_POOL_INTL[lang], pressureRatio),
      tip: pick(HANDWRITING_TIP_INTL[lang], (hashString(ymd) ^ seed) >>> 0),
    };
  }

  return (
    <SnapShell<Result>
      lang={lang}
      icon="✍️"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-teal-400 via-emerald-500 to-cyan-500"
      theme={THEME}
      glow="emerald"
      requiresFace={false}
      resultId="handwriting-result"
      analyze={analyze}
      noResultMessage={c.noStrokes}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-6 text-white text-center">
            <p className="text-sm font-semibold text-white/80 mb-2">{c.result}</p>
            <p className="text-4xl font-black mb-1">{result.slantDeg > 0 ? '+' : ''}{result.slantDeg}°</p>
            <p className="text-xs text-white/80">{c.slant}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wide">{c.slant}</span>
              <span className="text-xs font-bold text-teal-600">{result.slantPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full" style={{ width: `${result.slantPercent}%` }} />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.slantText}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{c.pressure}</span>
              <span className="text-xs font-bold text-emerald-600">{result.pressurePercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" style={{ width: `${result.pressurePercent}%` }} />
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{result.pressureText}</p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border border-teal-100 dark:border-teal-900/40 rounded-2xl p-5">
            <p className="text-xs font-bold text-teal-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
