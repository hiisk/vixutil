'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { pickByRatio, toPercent, hashString, mix32, pick } from '@/lib/ratio-pick';
import {
  SMILE_POOL_INTL, SMILE_TIP_POOL_INTL, SMILE_LABELS, SMILE_COMMENTS,
  type SnapIntlLang,
} from '@/lib/snap-intl';

/**
 * 미소 지수 — en/zh판.
 *
 * 측정식은 한국어 페이지와 글자 그대로 같다. 같은 사진이면 세 언어가 같은
 * 퍼센트를 내야 하므로, 계산을 손대지 않고 문장 풀만 언어별로 바꿔 끼운다.
 */
const THEME: SnapTheme = {
  hover: 'hover:text-orange-600',
  notice: 'bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40 text-orange-800 dark:text-orange-300',
  spinner: 'border-t-orange-500',
  dropHover: 'hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/40',
  resetHover: 'hover:border-orange-300 hover:text-orange-600',
};

const COPY = {
  en: {
    title: 'Smile Score',
    lead: 'Real face detection measures the lift of your mouth corners',
    privacy: 'The corner positions really are measured, right here in your browser — but a neutral photo is not a bad photo. Plenty of great pictures have no smile in them at all, so take this as a bit of fun.',
    overall: '😊 Overall smile score',
    breakdown: '📊 Smile breakdown',
    tip: '📸 Photo tip',
    disclaimer: 'The mouth-corner measurement is real; the interpretation is entertainment.',
  },
  es: {
    title: 'Índice de sonrisa',
    lead: 'La detección facial real mide cuánto se elevan las comisuras de tu boca',
    privacy: 'La posición de las comisuras se mide de verdad, aquí en tu navegador — pero una foto sin sonrisa no es una mala foto. Muchísimas fotos buenas no tienen ninguna sonrisa, así que tómatelo como un juego.',
    overall: '😊 Índice de sonrisa',
    breakdown: '📊 Desglose de la sonrisa',
    tip: '📸 Consejo de foto',
    disclaimer: 'La medición de las comisuras es real; la interpretación es entretenimiento.',
  },
  'pt-br': {
    title: 'Índice de sorriso',
    lead: 'A detecção facial real mede o quanto os cantos da sua boca sobem',
    privacy: 'A posição dos cantos é medida de verdade, aqui no seu navegador — mas uma foto sem sorriso não é uma foto ruim. Muita foto boa não tem sorriso nenhum, então leve isso na brincadeira.',
    overall: '😊 Índice de sorriso',
    breakdown: '📊 Detalhes do sorriso',
    tip: '📸 Dica de foto',
    disclaimer: 'A medição dos cantos da boca é real; a interpretação é entretenimento.',
  },
  ja: {
    title: 'スマイル指数',
    lead: '実際の顔認識で、口角がどれだけ上がっているかを測ります',
    privacy: '口角の位置はブラウザの中で本当に測っています。ただし、無表情の写真が悪い写真ということではありません。笑っていない良い写真はいくらでもあるので、遊びとして受け取ってください。',
    overall: '😊 スマイル指数',
    breakdown: '📊 内訳',
    tip: '📸 撮影のコツ',
    disclaimer: '口角の測定は本物ですが、そこからの解釈は遊びです。',
  },
  de: {
    title: 'Lächel-Index',
    lead: 'Echte Gesichtserkennung misst, wie weit deine Mundwinkel gehen',
    privacy: 'Die Position der Mundwinkel wird wirklich gemessen, hier in deinem Browser — aber ein neutrales Foto ist kein schlechtes Foto. Sehr viele gute Bilder haben gar kein Lächeln, nimm das Ergebnis also als Spaß.',
    overall: '😊 Lächel-Index',
    breakdown: '📊 Aufschlüsselung',
    tip: '📸 Foto-Tipp',
    disclaimer: 'Die Messung der Mundwinkel ist echt, die Deutung ist Unterhaltung.',
  },
  fr: {
    title: 'Indice de sourire',
    lead: 'La détection de visage mesure vraiment la remontée des coins de votre bouche',
    privacy: 'La position des commissures est réellement mesurée, ici dans votre navigateur — mais une photo sans sourire n’est pas une mauvaise photo. Énormément de belles photos n’en comportent aucun : prenez ça comme un jeu.',
    overall: '😊 Indice de sourire',
    breakdown: '📊 Détail du sourire',
    tip: '📸 Conseil photo',
    disclaimer: 'La mesure des commissures est réelle ; l’interprétation est un divertissement.',
  },
  hi: {
    title: 'मुस्कान स्कोर',
    lead: 'असली फ़ेस डिटेक्शन नापता है कि आपके होंठों के कोने कितने ऊपर उठे हैं',
    privacy: 'कोनों की जगह सचमुच नापी जाती है, यहीं आपके ब्राउज़र में — लेकिन बिना मुस्कान वाली फ़ोटो खराब फ़ोटो नहीं होती। बहुत सी बेहतरीन तस्वीरों में मुस्कान होती ही नहीं, तो इसे मज़े के लिए लें।',
    overall: '😊 कुल मुस्कान स्कोर',
    breakdown: '📊 मुस्कान का ब्योरा',
    tip: '📸 फ़ोटो टिप',
    disclaimer: 'होंठों के कोनों की माप असली है; उसका मतलब निकालना मनोरंजन है।',
  },
  'zh-hans': {
    title: '微笑指数',
    lead: '真实的人脸识别，测量你的嘴角上扬了多少',
    privacy: '嘴角的位置是真的在你的浏览器里测量的——但没有笑的照片并不是坏照片。很多好照片里根本没有笑容，所以把它当成好玩的就行。',
    overall: '😊 综合微笑指数',
    breakdown: '📊 微笑分项',
    tip: '📸 拍照建议',
    disclaimer: '嘴角的测量是真的，从中读出的意思是娱乐。',
  },
  'zh-hant': {
    title: '微笑指數',
    lead: '真實的人臉辨識，測量你的嘴角上揚了多少',
    privacy: '嘴角的位置是真的在你的瀏覽器裡測量的——但沒有笑的照片並不是壞照片。很多好照片裡根本沒有笑容，所以把它當成好玩的就行。',
    overall: '😊 綜合微笑指數',
    breakdown: '📊 微笑分項',
    tip: '📸 拍照建議',
    disclaimer: '嘴角的測量是真的，從中讀出的意思是娛樂。',
  },
} as const;

interface Result {
  percent: number;
  text: string;
  metrics: { key: string; label: string; percent: number; comment: string }[];
  tip: string;
}

function clampUnit(x: number) {
  return Math.max(0, Math.min(1, x));
}

/** 한국어 페이지의 measureSmile과 동일한 식 */
function measure(d: SnapDetection) {
  const jaw = d.landmarks.getJawOutline();
  const mouth = d.landmarks.getMouth();
  const faceHeight = Math.max(...jaw.map(p => p.y)) - Math.min(...jaw.map(p => p.y));
  if (faceHeight <= 0) return { smile: 0.5, openness: 0.3, balance: 0.8 };

  const xs = mouth.map(p => p.x);
  const ys = mouth.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const leftCorner = mouth[xs.indexOf(minX)];
  const rightCorner = mouth[xs.indexOf(maxX)];
  const cornerY = (leftCorner.y + rightCorner.y) / 2;
  const midY = (minY + maxY) / 2;
  const smile = clampUnit(0.5 + ((midY - cornerY) / faceHeight) * 10);

  const mouthW = maxX - minX;
  const mouthH = maxY - minY;
  const openness = clampUnit(mouthW > 0 ? ((mouthH / mouthW) - 0.15) / 0.5 : 0.3);

  const cornerDiff = Math.abs(leftCorner.y - rightCorner.y);
  const balance = clampUnit(1 - (cornerDiff / faceHeight) * 12);

  return { smile, openness, balance };
}

export default function SmileScore({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result {
    const { smile, openness, balance } = measure(d);
    const labels = SMILE_LABELS[lang];
    const cm = SMILE_COMMENTS[lang];
    const sp = toPercent(smile), op = toPercent(openness), bp = toPercent(balance);

    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
    const seed = mix32(Math.floor(smile * 99991 + openness * 7919) >>> 0);
    const tipSeed = (hashString(ymd) ^ seed) >>> 0;

    return {
      percent: sp,
      text: pickByRatio(SMILE_POOL_INTL[lang], smile),
      metrics: [
        { key: 'curve', label: labels.curve, percent: sp, comment: cm.curve(sp) },
        { key: 'openness', label: labels.openness, percent: op, comment: cm.openness(op) },
        { key: 'balance', label: labels.balance, percent: bp, comment: cm.balance(bp) },
      ],
      tip: pick(SMILE_TIP_POOL_INTL[lang], tipSeed),
    };
  }

  return (
    <SnapShell<Result>
      slug="smile-score"
      lang={lang}
      icon="😊"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-amber-400 via-orange-500 to-rose-500"
      theme={THEME}
      resultId="smile-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="bg-gradient-to-br from-amber-400 to-rose-500 rounded-lg p-6 text-white text-center">
            <p className="text-sm font-semibold text-white/80 mb-2">{c.overall}</p>
            <p className="text-4xl font-black mb-3">{result.percent}%</p>
            <p className="text-sm leading-relaxed">{result.text}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
            <p className="label-caps mb-3">{c.breakdown}</p>
            <div className="flex flex-col gap-3">
              {result.metrics.map(m => (
                <div key={m.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{m.label}</span>
                    <span className="text-xs font-bold text-rose-500">
                      {m.percent}% <span className="text-slate-400 dark:text-slate-500 font-medium">· {m.comment}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sec rounded-full" style={{ width: `${m.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/40 rounded-lg p-5">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
