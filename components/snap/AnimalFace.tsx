'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { hashString, mix32, pick } from '@/lib/ratio-pick';
import { ANIMAL_ARCHETYPE, ANIMAL_META } from '@/lib/animal-face-data';
import {
  ANIMAL_LABELS_INTL, ANIMAL_POOL_INTL, ANIMAL_TIP_INTL,
  type AnimalKeyIntl, type SnapIntlLang,
} from '@/lib/snap-intl';

/**
 * 동물상 — en/zh판.
 *
 * 기준 벡터(ANIMAL_ARCHETYPE)와 색(ANIMAL_META)은 한국어에서 그대로 가져온다.
 * 벡터를 복제해두면 한쪽만 조정됐을 때 같은 사진이 언어별로 다른 동물을 낸다.
 */
const THEME: SnapTheme = {
  hover: 'hover:text-orange-600',
  notice: 'bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40 text-orange-800 dark:text-orange-300',
  spinner: 'border-t-orange-500',
  dropHover: 'hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-950/40',
  resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-orange-600',
};

const COPY = {
  en: {
    title: 'Animal Face Type',
    lead: 'Four measured ratios are matched against twelve animal archetypes',
    privacy: 'Eye tilt, face shape, eye size and jaw width are measured from landmark positions in your browser, then compared to twelve reference vectors. It is a nearest-neighbour match, not a judgement — all twelve types are good ones.',
    result: '🐾 Closest match',
    runnerUp: 'Runner-up',
    tip: '💡 Note',
    disclaimer: 'The four ratios are real measurements; matching them to an animal is a game.',
  },
  es: {
    title: 'Tipo de cara animal',
    lead: 'Cuatro proporciones medidas se comparan con doce arquetipos animales',
    privacy: 'La inclinación de los ojos, la forma de la cara, el tamaño de los ojos y el ancho de la mandíbula se miden en tu navegador a partir de puntos faciales y luego se comparan con doce vectores de referencia. Es una coincidencia por vecino más cercano, no un juicio: los doce tipos son buenos.',
    result: '🐾 Coincidencia más cercana',
    runnerUp: 'Segundo lugar',
    tip: '💡 Nota',
    disclaimer: 'Las cuatro proporciones son mediciones reales; emparejarlas con un animal es un juego.',
  },
  'pt-br': {
    title: 'Tipo de rosto animal',
    lead: 'Quatro proporções medidas são comparadas com doze arquétipos de animais',
    privacy: 'A inclinação dos olhos, o formato do rosto, o tamanho dos olhos e a largura da mandíbula são medidos no seu navegador a partir de pontos faciais e comparados com doze vetores de referência. É uma correspondência por vizinho mais próximo, não um julgamento: os doze tipos são bons.',
    result: '🐾 Correspondência mais próxima',
    runnerUp: 'Segundo lugar',
    tip: '💡 Observação',
    disclaimer: 'As quatro proporções são medições reais; associá-las a um animal é brincadeira.',
  },
  ja: {
    title: '動物顔タイプ',
    lead: '測定した4つの比率を、12の動物タイプと照らし合わせます',
    privacy: '目の傾き・輪郭・目の大きさ・エラの幅をブラウザ内でランドマークから測り、12の基準ベクトルと比べています。いちばん近いものを選んでいるだけで、優劣ではありません。12タイプはどれも良いタイプです。',
    result: '🐾 いちばん近いタイプ',
    runnerUp: '次点',
    tip: '💡 ひとこと',
    disclaimer: '4つの比率は本物の測定値ですが、動物に当てはめるのは遊びです。',
  },
  de: {
    title: 'Tiergesichtstyp',
    lead: 'Vier gemessene Verhältnisse werden mit zwölf Tier-Archetypen abgeglichen',
    privacy: 'Augenneigung, Gesichtsform, Augengröße und Kieferbreite werden in deinem Browser aus Landmarkenpositionen gemessen und mit zwölf Referenzvektoren verglichen. Das ist ein Nächster-Nachbar-Abgleich, kein Urteil — alle zwölf Typen sind gute Typen.',
    result: '🐾 Nächster Treffer',
    runnerUp: 'Zweitplatziert',
    tip: '💡 Hinweis',
    disclaimer: 'Die vier Verhältnisse sind echte Messungen; sie einem Tier zuzuordnen, ist ein Spiel.',
  },
  fr: {
    title: 'Type de visage animal',
    lead: 'Quatre rapports mesurés sont comparés à douze archétypes animaux',
    privacy: 'L’inclinaison des yeux, la forme du visage, la taille des yeux et la largeur de la mâchoire sont mesurées dans votre navigateur à partir des points de repère, puis comparées à douze vecteurs de référence. C’est une correspondance au plus proche voisin, pas un jugement : les douze types sont bons.',
    result: '🐾 Correspondance la plus proche',
    runnerUp: 'Deuxième',
    tip: '💡 À noter',
    disclaimer: 'Les quatre rapports sont de vraies mesures ; les associer à un animal est un jeu.',
  },
  hi: {
    title: 'जानवर चेहरा टाइप',
    lead: 'नापे गए चार अनुपात बारह जानवर टाइपों से मिलाए जाते हैं',
    privacy: 'आँखों का झुकाव, चेहरे का आकार, आँखों का आकार और जबड़े की चौड़ाई आपके ब्राउज़र में लैंडमार्क से नापी जाती है और फिर बारह संदर्भ वेक्टरों से मिलाई जाती है। यह सबसे नज़दीकी मिलान है, कोई फ़ैसला नहीं — बारहों टाइप अच्छे हैं।',
    result: '🐾 सबसे नज़दीकी टाइप',
    runnerUp: 'दूसरे नंबर पर',
    tip: '💡 ध्यान दें',
    disclaimer: 'चारों अनुपात असली माप हैं; उन्हें जानवर से मिलाना खेल है।',
  },
  'zh-hans': {
    title: '动物脸型',
    lead: '把测出的四项比例和十二种动物原型做比对',
    privacy: '眼睛倾斜、脸型、眼睛大小和下颌宽度都在你的浏览器里从关键点测出，再和十二个参考向量比较。这是取最近的那一个，不是打分——十二种类型都是好类型。',
    result: '🐾 最接近的一类',
    runnerUp: '第二接近',
    tip: '💡 说明',
    disclaimer: '四项比例是真实测量；把它对应到动物则是游戏。',
  },
  'zh-hant': {
    title: '動物臉型',
    lead: '把測出的四項比例和十二種動物原型做比對',
    privacy: '眼睛傾斜、臉型、眼睛大小和下顎寬度都在你的瀏覽器裡從關鍵點測出，再和十二個參考向量比較。這是取最近的那一個，不是打分——十二種類型都是好類型。',
    result: '🐾 最接近的一類',
    runnerUp: '第二接近',
    tip: '💡 說明',
    disclaimer: '四項比例是真實測量；把它對應到動物則是遊戲。',
  },
} as const;

interface Result {
  animal: AnimalKeyIntl;
  label: string; emoji: string; from: string; to: string;
  text: string; matchPercent: number;
  runnerUp: { label: string; emoji: string; percent: number };
  tip: string;
}

type Vec4 = [number, number, number, number];
const clampUnit = (x: number) => Math.max(0, Math.min(1, x));
const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
const widthOf = (pts: { x: number }[]) => Math.max(...pts.map(p => p.x)) - Math.min(...pts.map(p => p.x));
const midpoint = (pts: { x: number; y: number }[]) => ({
  x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
  y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
});
const vecDist = (a: Vec4, b: Vec4) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]);

export default function AnimalFace({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result {
    const lm = d.landmarks;
    const jaw = lm.getJawOutline();
    const leftBrow = lm.getLeftEyeBrow();
    const rightBrow = lm.getRightEyeBrow();
    const nose = lm.getNose();
    const leftEye = lm.getLeftEye();
    const rightEye = lm.getRightEye();

    const faceWidth = widthOf(jaw);
    const faceHeight = Math.max(...jaw.map(p => p.y)) - Math.min(...[...leftBrow, ...rightBrow].map(p => p.y));

    const browMid = midpoint([...leftBrow, ...rightBrow]);
    const faceLength = dist(browMid, jaw[8]);
    const widthToLength = faceLength > 0 ? dist(jaw[0], jaw[16]) / faceLength : 0.8;
    const faceShapeRatio = clampUnit((widthToLength - 0.6) / 0.5);

    const noseCenterX = midpoint(nose).x;
    const tiltOf = (eye: { x: number; y: number }[]) => {
      const minXPt = eye.reduce((a, b) => (a.x < b.x ? a : b));
      const maxXPt = eye.reduce((a, b) => (a.x > b.x ? a : b));
      const outer = Math.abs(minXPt.x - noseCenterX) > Math.abs(maxXPt.x - noseCenterX) ? minXPt : maxXPt;
      const inner = outer === minXPt ? maxXPt : minXPt;
      return inner.y - outer.y;
    };
    const tiltPx = (tiltOf(leftEye) + tiltOf(rightEye)) / 2;
    const eyeTiltRatio = clampUnit(0.5 + (tiltPx / faceHeight) * 6);
    const eyeWidthRatio = clampUnit(((widthOf(leftEye) + widthOf(rightEye)) / 2 / faceWidth) * 4.2);
    const jawWidthRatio = clampUnit((dist(jaw[2], jaw[14]) / faceWidth) * 1.15);

    const v: Vec4 = [eyeTiltRatio, faceShapeRatio, eyeWidthRatio, jawWidthRatio];
    const ranked = (Object.entries(ANIMAL_ARCHETYPE) as [AnimalKeyIntl, Vec4][])
      .map(([key, arch]) => ({ key, d: vecDist(v, arch) }))
      .sort((a, b) => a.d - b.d);

    const best = ranked[0], second = ranked[1];
    const labels = ANIMAL_LABELS_INTL[lang];
    const matchPercent = Math.round(Math.max(55, Math.min(99, 100 - best.d * 130)));
    const runnerUpPercent = Math.round(Math.max(20, Math.min(matchPercent - 5, 100 - second.d * 130)));

    const seed = mix32(
      Math.floor(eyeTiltRatio * 997 + faceShapeRatio * 7919 + eyeWidthRatio * 104729 + jawWidthRatio * 1299709) >>> 0,
    );
    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;

    return {
      animal: best.key,
      label: labels[best.key],
      emoji: ANIMAL_META[best.key].emoji,
      from: ANIMAL_META[best.key].from,
      to: ANIMAL_META[best.key].to,
      text: pick(ANIMAL_POOL_INTL[lang][best.key], seed),
      matchPercent,
      runnerUp: { label: labels[second.key], emoji: ANIMAL_META[second.key].emoji, percent: runnerUpPercent },
      tip: pick(ANIMAL_TIP_INTL[lang], (hashString(ymd) ^ seed) >>> 0),
    };
  }

  return (
    <SnapShell<Result>
      slug="animal-face"
      lang={lang}
      icon="🐾"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-orange-400 via-amber-500 to-rose-500"
      theme={THEME}
      resultId="animal-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="rounded-lg p-6 text-white text-center" style={{ background: `linear-gradient(135deg, ${result.from}, ${result.to})` }}>
            <p className="text-sm font-semibold text-white/80 mb-2">{c.result}</p>
            <div className="text-6xl mb-2">{result.emoji}</div>
            <p className="text-2xl font-bold mb-1">{result.label}</p>
            <p className="text-sm font-bold text-white/80 mb-3">{result.matchPercent}%</p>
            <p className="text-sm leading-relaxed">{result.text}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 flex items-center gap-3">
            <span className="text-3xl">{result.runnerUp.emoji}</span>
            <div className="flex-1">
              <p className="text-xs text-slate-400 dark:text-slate-500">{c.runnerUp}</p>
              <p className="text-base font-bold text-slate-800 dark:text-slate-100">{result.runnerUp.label}</p>
            </div>
            <span className="text-sm font-bold text-orange-600">{result.runnerUp.percent}%</span>
          </div>

          <div className="bg-orange-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/40 rounded-lg p-5">
            <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
