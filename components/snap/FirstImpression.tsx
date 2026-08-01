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
  es: {
    title: 'Analizador de primera impresión',
    lead: 'El tamaño de los ojos, la proporción de la cara y la elevación de la boca deciden cuál de seis impresiones transmites',
    privacy: 'Las tres proporciones salen de posiciones reales de puntos faciales medidas en tu navegador. Describen la geometría de una foto: cambia el ángulo o la luz y cambia la lectura, que es exactamente como funcionan también las primeras impresiones.',
    result: '✨ Tu primera impresión',
    scores: '📊 Lo que se midió',
    strength: '💪 Dónde te funciona',
    tip: '💡 Consejo',
    eye: 'Tamaño de ojos', face: 'Largo de cara', mouth: 'Elevación de boca',
    disclaimer: 'Las proporciones se miden; ponerle nombre a una impresión a partir de ellas es entretenimiento.',
  },
  'pt-br': {
    title: 'Analisador de primeira impressão',
    lead: 'Tamanho dos olhos, proporção do rosto e elevação da boca decidem qual das seis impressões você passa',
    privacy: 'As três proporções vêm de posições reais de pontos faciais medidas no seu navegador. Elas descrevem a geometria de uma foto: mude o ângulo ou a luz e a leitura muda — que é exatamente como as primeiras impressões funcionam.',
    result: '✨ Sua primeira impressão',
    scores: '📊 O que foi medido',
    strength: '💪 Onde isso joga a seu favor',
    tip: '💡 Dica',
    eye: 'Tamanho dos olhos', face: 'Comprimento do rosto', mouth: 'Elevação da boca',
    disclaimer: 'As proporções são medidas; dar nome a uma impressão a partir delas é entretenimento.',
  },
  ja: {
    title: '第一印象アナライザー',
    lead: '目の大きさ・顔の比率・口角の上がり方から、6つの印象のどれに近いかを見ます',
    privacy: '3つの比率は、ブラウザ内で測った実際のランドマーク位置から出しています。示しているのは1枚の写真の形であって、角度や光が変われば読み取りも変わります。第一印象そのものも、まさにそういうものです。',
    result: '✨ あなたの第一印象',
    scores: '📊 測ったもの',
    strength: '💪 強みが出る場面',
    tip: '💡 ヒント',
    eye: '目の大きさ', face: '顔の縦横', mouth: '口角の上がり',
    disclaimer: '比率は測定値ですが、そこから印象に名前を付けるのは遊びです。',
  },
  de: {
    title: 'Erster-Eindruck-Analyse',
    lead: 'Augengröße, Gesichtsproportion und Mundwinkel entscheiden, welcher von sechs Eindrücken auf dich passt',
    privacy: 'Die drei Verhältnisse stammen aus echten, in deinem Browser gemessenen Landmarkenpositionen. Sie beschreiben die Geometrie eines Fotos — ändere Winkel oder Licht, und die Lesart ändert sich. Genau so funktionieren erste Eindrücke auch.',
    result: '✨ Dein erster Eindruck',
    scores: '📊 Was gemessen wurde',
    strength: '💪 Wo dir das hilft',
    tip: '💡 Tipp',
    eye: 'Augengröße', face: 'Gesichtslänge', mouth: 'Mundwinkel',
    disclaimer: 'Die Verhältnisse sind gemessen; daraus einen Eindruck zu benennen, ist Unterhaltung.',
  },
  fr: {
    title: 'Analyseur de première impression',
    lead: 'La taille des yeux, la proportion du visage et la remontée de la bouche déterminent laquelle des six impressions vous renvoyez',
    privacy: 'Les trois rapports viennent de positions réelles de points de repère mesurées dans votre navigateur. Ils décrivent la géométrie d’une photo : changez l’angle ou la lumière et la lecture change — c’est exactement ainsi que fonctionnent les premières impressions.',
    result: '✨ Votre première impression',
    scores: '📊 Ce qui a été mesuré',
    strength: '💪 Là où ça joue pour vous',
    tip: '💡 Astuce',
    eye: 'Taille des yeux', face: 'Longueur du visage', mouth: 'Remontée de la bouche',
    disclaimer: 'Les rapports sont mesurés ; en tirer un nom d’impression est un divertissement.',
  },
  hi: {
    title: 'पहली छाप विश्लेषक',
    lead: 'आँखों का आकार, चेहरे का अनुपात और होंठों का उठाव तय करते हैं कि छह में से कौन-सी छाप आप छोड़ते हैं',
    privacy: 'तीनों अनुपात आपके ब्राउज़र में नापी गई असली लैंडमार्क जगहों से आते हैं। ये एक फ़ोटो की ज्यामिति बताते हैं — कोण या रोशनी बदलिए, पढ़त बदल जाएगी। पहली छाप भी ठीक ऐसे ही काम करती है।',
    result: '✨ आपकी पहली छाप',
    scores: '📊 क्या नापा गया',
    strength: '💪 यह कहाँ काम आता है',
    tip: '💡 सुझाव',
    eye: 'आँखों का आकार', face: 'चेहरे की लंबाई', mouth: 'होंठों का उठाव',
    disclaimer: 'अनुपात नापे जाते हैं; उनसे छाप का नाम रखना मनोरंजन है।',
  },
  'zh-hans': {
    title: '第一印象分析',
    lead: '眼睛大小、脸部比例和嘴角上扬，决定你更接近六种印象中的哪一种',
    privacy: '这三个比例来自在你浏览器里测量的真实关键点位置。它们描述的是一张照片的几何形状——换个角度或换个光，读数就会变，而第一印象本来就是这样运作的。',
    result: '✨ 你的第一印象',
    scores: '📊 测了什么',
    strength: '💪 这在哪里帮得上你',
    tip: '💡 提示',
    eye: '眼睛大小', face: '脸部长度', mouth: '嘴角上扬',
    disclaimer: '比例是测出来的；由它给印象起名字则是娱乐。',
  },
  'zh-hant': {
    title: '第一印象分析',
    lead: '眼睛大小、臉部比例和嘴角上揚，決定你更接近六種印象中的哪一種',
    privacy: '這三個比例來自在你瀏覽器裡測量的真實關鍵點位置。它們描述的是一張照片的幾何形狀——換個角度或換個光，讀數就會變，而第一印象本來就是這樣運作的。',
    result: '✨ 你的第一印象',
    scores: '📊 測了什麼',
    strength: '💪 這在哪裡幫得上你',
    tip: '💡 提示',
    eye: '眼睛大小', face: '臉部長度', mouth: '嘴角上揚',
    disclaimer: '比例是測出來的；由它給印象起名字則是娛樂。',
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
