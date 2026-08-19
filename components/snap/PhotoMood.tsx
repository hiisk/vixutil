'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { hashString, mix32, pick } from '@/lib/ratio-pick';
import { MOOD_META } from '@/lib/photo-mood-data';
import {
  MOOD_META_INTL, MOOD_POOL_INTL, MOOD_CAPTION_TIP_INTL,
  type MoodKeyIntl, type SnapIntlLang,
} from '@/lib/snap-intl';

/**
 * 사진 감성 — en/zh판.
 *
 * 얼굴 인식이 필요 없다(requiresFace={false}). 풍경·소품 사진도 받아야 하는데
 * 얼굴을 요구하면 정상적인 입력을 거부하게 된다.
 *
 * 그라디언트 색(from/to)은 한국어 MOOD_META에서 그대로 가져온다. 같은 사분면이면
 * 세 언어가 같은 색을 써야 하고, 색값을 복제해두면 한쪽만 바뀌기 쉽다.
 */
const THEME: SnapTheme = {
  hover: 'hover:text-sky-600',
  notice: 'bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 text-sky-800 dark:text-sky-300',
  spinner: 'border-t-sky-500',
  dropHover: 'hover:border-sky-400 hover:bg-sec-soft ',
  resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-sky-600',
};

const COPY = {
  en: {
    title: 'Photo Mood Analyser',
    lead: 'Any photo — brightness, saturation, warmth and contrast are measured from the pixels',
    privacy: 'The pixels are read here in your browser and nothing is uploaded. No face is needed, so landscapes, objects and pets all work.',
    result: '🎨 Photo mood',
    metrics: '📊 Measured',
    palette: '🎨 Dominant colours',
    tip: '✍️ Caption tip',
    brightness: 'Brightness', saturation: 'Saturation', warmth: 'Warm ↔ cool', contrast: 'Contrast',
    disclaimer: 'The pixel statistics are real measurements; the mood naming is entertainment.',
  },
  es: {
    title: 'Analizador de ambiente de foto',
    lead: 'Cualquier foto — brillo, saturación, calidez y contraste medidos desde los píxeles',
    privacy: 'Los píxeles se leen aquí en tu navegador y no se sube nada. No hace falta que haya una cara, así que paisajes, objetos y mascotas también funcionan.',
    result: '🎨 Ambiente de la foto',
    metrics: '📊 Medido',
    palette: '🎨 Colores dominantes',
    tip: '✍️ Idea para el pie de foto',
    brightness: 'Brillo', saturation: 'Saturación', warmth: 'Cálido ↔ frío', contrast: 'Contraste',
    disclaimer: 'Las estadísticas de píxeles son mediciones reales; ponerle nombre al ambiente es entretenimiento.',
  },
  'pt-br': {
    title: 'Analisador de clima da foto',
    lead: 'Qualquer foto — brilho, saturação, calidez e contraste medidos nos pixels',
    privacy: 'Os pixels são lidos aqui no seu navegador e nada é enviado. Não precisa ter rosto, então paisagens, objetos e pets também funcionam.',
    result: '🎨 Clima da foto',
    metrics: '📊 Medido',
    palette: '🎨 Cores dominantes',
    tip: '✍️ Ideia de legenda',
    brightness: 'Brilho', saturation: 'Saturação', warmth: 'Quente ↔ frio', contrast: 'Contraste',
    disclaimer: 'As estatísticas de pixel são medições reais; dar nome ao clima é entretenimento.',
  },
  ja: {
    title: '写真ムード解析',
    lead: 'どんな写真でも — 明るさ・彩度・暖かさ・コントラストをピクセルから測ります',
    privacy: 'ピクセルはブラウザの中で読み取り、どこにも送りません。顔は必要ないので、風景でも物でもペットでも使えます。',
    result: '🎨 写真のムード',
    metrics: '📊 測定値',
    palette: '🎨 主要な色',
    tip: '✍️ キャプションのヒント',
    brightness: '明るさ', saturation: '彩度', warmth: '暖 ↔ 寒', contrast: 'コントラスト',
    disclaimer: 'ピクセルの統計は本物の測定ですが、ムードの名づけは遊びです。',
  },
  de: {
    title: 'Foto-Stimmungsanalyse',
    lead: 'Jedes Foto — Helligkeit, Sättigung, Wärme und Kontrast direkt aus den Pixeln gemessen',
    privacy: 'Die Pixel werden hier in deinem Browser gelesen, hochgeladen wird nichts. Ein Gesicht braucht es nicht, also funktionieren auch Landschaften, Objekte und Haustiere.',
    result: '🎨 Stimmung des Fotos',
    metrics: '📊 Gemessen',
    palette: '🎨 Dominante Farben',
    tip: '✍️ Bildtext-Tipp',
    brightness: 'Helligkeit', saturation: 'Sättigung', warmth: 'Warm ↔ kalt', contrast: 'Kontrast',
    disclaimer: 'Die Pixelstatistik ist eine echte Messung; die Benennung der Stimmung ist Unterhaltung.',
  },
  fr: {
    title: 'Analyseur d’ambiance photo',
    lead: 'N’importe quelle photo — luminosité, saturation, chaleur et contraste mesurés sur les pixels',
    privacy: 'Les pixels sont lus ici dans votre navigateur et rien n’est envoyé. Aucun visage n’est nécessaire : paysages, objets et animaux fonctionnent aussi.',
    result: '🎨 Ambiance de la photo',
    metrics: '📊 Mesuré',
    palette: '🎨 Couleurs dominantes',
    tip: '✍️ Idée de légende',
    brightness: 'Luminosité', saturation: 'Saturation', warmth: 'Chaud ↔ froid', contrast: 'Contraste',
    disclaimer: 'Les statistiques de pixels sont de vraies mesures ; nommer l’ambiance est un divertissement.',
  },
  hi: {
    title: 'फ़ोटो मूड विश्लेषक',
    lead: 'कोई भी फ़ोटो — चमक, संतृप्ति, गरमाहट और कंट्रास्ट सीधे पिक्सल से नापे जाते हैं',
    privacy: 'पिक्सल यहीं आपके ब्राउज़र में पढ़े जाते हैं, कुछ भी अपलोड नहीं होता। चेहरा ज़रूरी नहीं, इसलिए नज़ारे, चीज़ें और पालतू जानवर भी चलते हैं।',
    result: '🎨 फ़ोटो का मूड',
    metrics: '📊 नापा गया',
    palette: '🎨 प्रमुख रंग',
    tip: '✍️ कैप्शन टिप',
    brightness: 'चमक', saturation: 'संतृप्ति', warmth: 'गर्म ↔ ठंडा', contrast: 'कंट्रास्ट',
    disclaimer: 'पिक्सल के आँकड़े असली माप हैं; मूड को नाम देना मनोरंजन है।',
  },
  'zh-hans': {
    title: '照片氛围分析',
    lead: '任何照片——亮度、饱和度、冷暖和对比度都从像素里量出来',
    privacy: '像素在你的浏览器里读取，什么都不会上传。不需要有脸，所以风景、物品和宠物都行。',
    result: '🎨 照片氛围',
    metrics: '📊 实测',
    palette: '🎨 主要颜色',
    tip: '✍️ 文案建议',
    brightness: '亮度', saturation: '饱和度', warmth: '暖 ↔ 冷', contrast: '对比度',
    disclaimer: '像素统计是真实测量；给氛围起名字则是娱乐。',
  },
  'zh-hant': {
    title: '照片氛圍分析',
    lead: '任何照片——亮度、飽和度、冷暖和對比都從像素裡量出來',
    privacy: '像素在你的瀏覽器裡讀取，什麼都不會上傳。不需要有臉，所以風景、物品和寵物都行。',
    result: '🎨 照片氛圍',
    metrics: '📊 實測',
    palette: '🎨 主要顏色',
    tip: '✍️ 文案建議',
    brightness: '亮度', saturation: '飽和度', warmth: '暖 ↔ 冷', contrast: '對比',
    disclaimer: '像素統計是真實測量；給氛圍起名字則是娛樂。',
  },
} as const;

interface Result {
  mood: MoodKeyIntl;
  label: string;
  vibe: string;
  from: string;
  to: string;
  text: string;
  brightnessPercent: number;
  saturationPercent: number;
  warmthPercent: number;
  contrastPercent: number;
  palette: string[];
  captionTip: string;
}

const clampUnit = (x: number) => Math.max(0, Math.min(1, x));

function saturationOf(r: number, g: number, b: number) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  return mx === 0 ? 0 : (mx - mn) / mx;
}

/** sRGB → Lab (a·b만 쓴다) — 한국어 페이지와 같은 식 */
function rgbToLab(r: number, g: number, b: number) {
  const f = (c: number) => {
    const v = c / 255;
    return v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92;
  };
  const R = f(r), G = f(g), B = f(b);
  const x = (R * 0.4124 + G * 0.3576 + B * 0.1805) / 0.95047;
  const y = R * 0.2126 + G * 0.7152 + B * 0.0722;
  const z = (R * 0.0193 + G * 0.1192 + B * 0.9505) / 1.08883;
  const t = (c: number) => (c > 0.008856 ? Math.cbrt(c) : 7.787 * c + 16 / 116);
  return { a: 500 * (t(x) - t(y)), b: 200 * (t(y) - t(z)) };
}

export default function PhotoMood({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result | null {
    const img = d.image;
    const longSide = Math.max(img.naturalWidth, img.naturalHeight);
    const scale = Math.min(1, 120 / longSide);
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    let sumR = 0, sumG = 0, sumB = 0, sumLum = 0, sumLumSq = 0, sumSat = 0;
    const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();
    const n = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      sumR += r; sumG += g; sumB += b;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      sumLum += lum; sumLumSq += lum * lum;
      sumSat += saturationOf(r, g, b);
      const key = `${Math.round(r / 32) * 32},${Math.round(g / 32) * 32},${Math.round(b / 32) * 32}`;
      const bk = buckets.get(key);
      if (bk) { bk.count++; bk.r += r; bk.g += g; bk.b += b; }
      else buckets.set(key, { count: 1, r, g, b });
    }

    const avgLum = sumLum / n;
    const stddev = Math.sqrt(Math.max(0, sumLumSq / n - avgLum * avgLum));
    const lab = rgbToLab(sumR / n, sumG / n, sumB / n);

    const brightnessRatio = clampUnit(avgLum / 255);
    const contrastRatio = clampUnit(stddev / 70);
    const saturationRatio = clampUnit((sumSat / n - 0.05) / 0.45);
    const warmthRatio = clampUnit(0.5 + (lab.b - lab.a) / 60);

    const palette = [...buckets.values()]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map(bk => {
        const r = Math.round(bk.r / bk.count), g = Math.round(bk.g / bk.count), b = Math.round(bk.b / bk.count);
        return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
      });

    const bright = brightnessRatio >= 0.5;
    const vivid = saturationRatio >= 0.5;
    const mood: MoodKeyIntl = bright ? (vivid ? 'vivid' : 'pastel') : (vivid ? 'neon' : 'moody');

    const seed = mix32(
      Math.floor(brightnessRatio * 997 + saturationRatio * 7919 + warmthRatio * 104729 + contrastRatio * 500009) >>> 0,
    );
    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;

    const meta = MOOD_META_INTL[lang][mood];
    return {
      mood,
      label: meta.label,
      vibe: meta.vibe,
      from: MOOD_META[mood].from,
      to: MOOD_META[mood].to,
      text: pick(MOOD_POOL_INTL[lang][mood], seed),
      brightnessPercent: Math.round(brightnessRatio * 100),
      saturationPercent: Math.round(saturationRatio * 100),
      warmthPercent: Math.round(warmthRatio * 100),
      contrastPercent: Math.round(contrastRatio * 100),
      palette,
      captionTip: pick(MOOD_CAPTION_TIP_INTL[lang], (hashString(ymd) ^ seed) >>> 0),
    };
  }

  return (
    <SnapShell<Result>
      slug="photo-mood"
      lang={lang}
      icon="🎨"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-sky-400 via-violet-500 to-pink-500"
      theme={THEME}
      glow="sky"
      requiresFace={false}
      resultId="mood-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="rounded-lg p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${result.from}, ${result.to})` }}>
            <p className="text-sm font-semibold text-white/80 mb-2">{c.result}</p>
            <p className="text-3xl font-black mb-1">{result.label}</p>
            <p className="text-xs text-white/80 mb-3">{result.vibe}</p>
            <p className="text-sm leading-relaxed">{result.text}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
            <p className="label-caps mb-3">{c.metrics}</p>
            <div className="flex flex-col gap-3">
              {[
                { label: c.brightness, percent: result.brightnessPercent },
                { label: c.saturation, percent: result.saturationPercent },
                { label: c.warmth, percent: result.warmthPercent },
                { label: c.contrast, percent: result.contrastPercent },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{m.label}</span>
                    <span className="text-xs font-bold text-sky-600">{m.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${m.percent}%`, background: `linear-gradient(90deg, ${result.from}, ${result.to})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {result.palette.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
              <p className="label-caps mb-3">{c.palette}</p>
              <div className="flex gap-2">
                {result.palette.map(hex => (
                  <div key={hex} className="flex-1 text-center">
                    <div className="w-full aspect-square rounded-xl border border-slate-200 dark:border-slate-700" style={{ background: hex }} />
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 font-mono">{hex}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-sky-50 dark:from-sky-950/20 dark:to-violet-950/20 border border-sky-100 dark:border-sky-900/40 rounded-lg p-5">
            <p className="text-xs font-bold text-sky-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.captionTip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
