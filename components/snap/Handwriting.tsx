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
  es: {
    title: 'Análisis de letra',
    lead: 'Fotografía algo escrito a mano — la inclinación y la presión se miden en los trazos',
    privacy: 'La inclinación se obtiene de los gradientes de la imagen con un tensor de estructura, el mismo método que se usa en el análisis de huellas, y la presión, de lo oscuros que son los trazos. La medición es real; la lectura de personalidad que se le añade es grafología, es decir, entretenimiento más que ciencia.',
    result: '✍️ Tu letra',
    slant: 'Inclinación',
    pressure: 'Presión',
    tip: '💡 Hoy',
    noStrokes: 'No se encontraron bordes de trazo suficientes. Prueba con una foto de escritura clara y oscura sobre fondo claro, que ocupe casi todo el encuadre.',
    disclaimer: 'La inclinación y la presión se miden de verdad. La grafología no es una ciencia establecida: lee la interpretación como entretenimiento.',
  },
  'pt-br': {
    title: 'Análise de letra',
    lead: 'Fotografe algo escrito à mão — a inclinação e a pressão são medidas nos traços',
    privacy: 'A inclinação vem dos gradientes da imagem por meio de um tensor de estrutura, o mesmo método usado na análise de impressões digitais, e a pressão vem do quanto os traços são escuros. A medição é real; a leitura de personalidade ligada a ela é grafologia, ou seja, entretenimento e não ciência.',
    result: '✍️ Sua letra',
    slant: 'Inclinação',
    pressure: 'Pressão',
    tip: '💡 Hoje',
    noStrokes: 'Não foram encontradas bordas de traço suficientes. Tente uma foto com escrita nítida e escura sobre fundo claro, ocupando quase todo o enquadramento.',
    disclaimer: 'Inclinação e pressão são realmente medidas. A grafologia não é uma ciência estabelecida — leia a interpretação como entretenimento.',
  },
  ja: {
    title: '筆跡診断',
    lead: '手書きの文字を撮ると、線の傾きと筆圧を測ります',
    privacy: '傾きは構造テンソルという方法で画像の勾配から求めていて、これは指紋解析と同じ考え方です。筆圧は線の濃さから出しています。測定は本物ですが、そこに付く性格の読み取りは筆跡学であり、科学というより遊びです。',
    result: '✍️ あなたの筆跡',
    slant: '傾き',
    pressure: '筆圧',
    tip: '💡 今日は',
    noStrokes: '線の輪郭が十分に見つかりませんでした。明るい紙に濃くはっきり書いた文字が画面いっぱいに写るように撮り直してください。',
    disclaimer: '傾きと筆圧は実際に測っています。筆跡学は確立した科学ではないので、解釈は遊びとして読んでください。',
  },
  de: {
    title: 'Handschrift-Analyse',
    lead: 'Fotografiere etwas Handgeschriebenes — Neigung und Druck werden aus den Strichen gemessen',
    privacy: 'Die Neigung kommt über einen Strukturtensor aus den Bildgradienten, dasselbe Verfahren wie in der Fingerabdruckanalyse, der Druck aus der Dunkelheit der Striche. Die Messung ist echt; die daran geknüpfte Persönlichkeitsdeutung ist Graphologie und damit eher Unterhaltung als Wissenschaft.',
    result: '✍️ Deine Handschrift',
    slant: 'Neigung',
    pressure: 'Druck',
    tip: '💡 Heute',
    noStrokes: 'Es wurden zu wenige Strichkanten gefunden. Versuch ein Foto mit klarer, dunkler Schrift auf hellem Grund, die den Großteil des Bildes ausfüllt.',
    disclaimer: 'Neigung und Druck werden tatsächlich gemessen. Graphologie ist keine etablierte Wissenschaft — lies die Deutung als Unterhaltung.',
  },
  fr: {
    title: 'Analyse d’écriture',
    lead: 'Photographiez de l’écriture manuscrite — l’inclinaison et la pression sont mesurées sur les traits',
    privacy: 'L’inclinaison est obtenue à partir des gradients de l’image via un tenseur de structure, la même approche qu’en analyse d’empreintes, et la pression à partir de la noirceur des traits. La mesure est réelle ; la lecture de personnalité qu’on y accroche relève de la graphologie, donc du divertissement plus que de la science.',
    result: '✍️ Votre écriture',
    slant: 'Inclinaison',
    pressure: 'Pression',
    tip: '💡 Aujourd’hui',
    noStrokes: 'Pas assez de contours de traits ont été trouvés. Essayez une photo d’une écriture nette et foncée sur fond clair, occupant l’essentiel du cadre.',
    disclaimer: 'L’inclinaison et la pression sont réellement mesurées. La graphologie n’est pas une science établie — lisez l’interprétation comme un divertissement.',
  },
  hi: {
    title: 'लिखावट विश्लेषण',
    lead: 'हाथ की लिखाई की फ़ोटो लीजिए — झुकाव और दबाव लकीरों से नापे जाते हैं',
    privacy: 'झुकाव स्ट्रक्चर टेंसर से छवि के ग्रेडिएंट से निकाला जाता है — वही तरीका जो उँगलियों के निशान के विश्लेषण में इस्तेमाल होता है — और दबाव लकीरों के गहरेपन से। माप असली है; उससे जुड़ी व्यक्तित्व की पढ़त ग्राफोलॉजी है, यानी विज्ञान नहीं, मनोरंजन।',
    result: '✍️ आपकी लिखावट',
    slant: 'झुकाव',
    pressure: 'दबाव',
    tip: '💡 आज',
    noStrokes: 'लकीरों के पर्याप्त किनारे नहीं मिले। हल्के काग़ज़ पर साफ़, गहरी लिखाई की ऐसी फ़ोटो लें जो फ़्रेम में बड़ी दिखे।',
    disclaimer: 'झुकाव और दबाव सचमुच नापे जाते हैं। ग्राफोलॉजी स्थापित विज्ञान नहीं है — व्याख्या को मनोरंजन की तरह पढ़ें।',
  },
  'zh-hans': {
    title: '笔迹分析',
    lead: '拍一张手写字——笔画的倾斜和力度都从线条里量出来',
    privacy: '倾斜是用结构张量从图像梯度里求出来的，和指纹分析用的是同一套方法；力度则来自笔画的深浅。测量是真的，但附在上面的性格解读属于笔迹学，是娱乐而不是科学。',
    result: '✍️ 你的笔迹',
    slant: '倾斜',
    pressure: '力度',
    tip: '💡 今天',
    noStrokes: '没找到足够的笔画边缘。换一张浅色纸上写得清楚、颜色深、并且占满画面的照片试试。',
    disclaimer: '倾斜和力度是真的在测。笔迹学不是成立的科学——把解读当娱乐看。',
  },
  'zh-hant': {
    title: '筆跡分析',
    lead: '拍一張手寫字——筆畫的傾斜和力道都從線條裡量出來',
    privacy: '傾斜是用結構張量從影像梯度裡求出來的，和指紋分析用的是同一套方法；力道則來自筆畫的深淺。測量是真的，但附在上面的性格解讀屬於筆跡學，是娛樂而不是科學。',
    result: '✍️ 你的筆跡',
    slant: '傾斜',
    pressure: '力道',
    tip: '💡 今天',
    noStrokes: '沒找到足夠的筆畫邊緣。換一張淺色紙上寫得清楚、顏色深、並且佔滿畫面的照片試試。',
    disclaimer: '傾斜和力道是真的在測。筆跡學不是成立的科學——把解讀當娛樂看。',
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
