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
  dropHover: 'hover:border-violet-400 hover:bg-sec-soft ',
  resetHover: 'hover:border-slate-300 dark:hover:border-slate-700 hover:text-violet-600',
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
  es: {
    title: 'Simetría facial',
    lead: 'Puntos faciales reales miden el equilibrio izquierda–derecha de cada rasgo',
    privacy: 'El equilibrio se mide de verdad a partir de las posiciones de los puntos faciales, aquí en tu navegador. Casi ninguna cara es perfectamente simétrica, y la asimetría natural se considera parte de lo que hace distintiva a una cara: un número más bajo no es una cara peor.',
    overall: '⚖️ Simetría general',
    breakdown: '📊 Por rasgo',
    best: 'Lo más equilibrado',
    tip: '📸 Consejo de foto',
    disclaimer: 'La medición de los puntos faciales es real; la interpretación es entretenimiento.',
  },
  'pt-br': {
    title: 'Simetria facial',
    lead: 'Pontos faciais reais medem o equilíbrio esquerda–direita de cada traço',
    privacy: 'O equilíbrio é medido de verdade a partir das posições dos pontos faciais, aqui no seu navegador. Quase nenhum rosto é perfeitamente simétrico, e a assimetria natural é considerada parte do que torna um rosto marcante: um número menor não é um rosto pior.',
    overall: '⚖️ Simetria geral',
    breakdown: '📊 Por traço',
    best: 'Mais equilibrado',
    tip: '📸 Dica de foto',
    disclaimer: 'A medição dos pontos faciais é real; a interpretação é entretenimento.',
  },
  ja: {
    title: '顔の左右対称',
    lead: '実際のランドマークから、パーツごとの左右バランスを測ります',
    privacy: 'バランスはランドマークの位置から本当に測っています。完全に左右対称な顔はほとんどなく、自然な非対称はその人らしさの一部と広く考えられています。数字が低いことは悪い顔という意味ではありません。',
    overall: '⚖️ 総合対称性',
    breakdown: '📊 パーツ別',
    best: '最もそろっている部分',
    tip: '📸 撮影のコツ',
    disclaimer: 'ランドマークの測定は本物ですが、そこからの解釈は遊びです。',
  },
  de: {
    title: 'Gesichtssymmetrie',
    lead: 'Echte Landmarken messen die Links-rechts-Balance jedes Merkmals',
    privacy: 'Die Balance wird wirklich aus den Landmarkenpositionen gemessen, hier in deinem Browser. Kaum ein Gesicht ist perfekt symmetrisch, und natürliche Asymmetrie gilt weithin als Teil dessen, was ein Gesicht unverwechselbar macht — ein niedrigerer Wert ist kein schlechteres Gesicht.',
    overall: '⚖️ Gesamtsymmetrie',
    breakdown: '📊 Nach Merkmal',
    best: 'Am ausgeglichensten',
    tip: '📸 Foto-Tipp',
    disclaimer: 'Die Messung der Landmarken ist echt, die Deutung ist Unterhaltung.',
  },
  fr: {
    title: 'Symétrie du visage',
    lead: 'De vrais points de repère mesurent l’équilibre gauche–droite de chaque trait',
    privacy: 'L’équilibre est réellement mesuré à partir des positions des points de repère, ici dans votre navigateur. Presque aucun visage n’est parfaitement symétrique, et l’asymétrie naturelle est largement considérée comme ce qui rend un visage reconnaissable : un chiffre plus bas n’est pas un moins beau visage.',
    overall: '⚖️ Symétrie globale',
    breakdown: '📊 Par trait',
    best: 'Le plus équilibré',
    tip: '📸 Conseil photo',
    disclaimer: 'La mesure des points de repère est réelle ; l’interprétation est un divertissement.',
  },
  hi: {
    title: 'चेहरे की समरूपता',
    lead: 'असली लैंडमार्क हर हिस्से का बाएँ–दाएँ संतुलन नापते हैं',
    privacy: 'संतुलन सचमुच लैंडमार्क की जगहों से नापा जाता है, यहीं आपके ब्राउज़र में। लगभग कोई चेहरा पूरी तरह समरूप नहीं होता, और स्वाभाविक असमानता को चेहरे की पहचान का हिस्सा माना जाता है — कम अंक का मतलब खराब चेहरा नहीं है।',
    overall: '⚖️ कुल समरूपता',
    breakdown: '📊 हिस्से के हिसाब से',
    best: 'सबसे संतुलित',
    tip: '📸 फ़ोटो टिप',
    disclaimer: 'लैंडमार्क की माप असली है; उसका मतलब निकालना मनोरंजन है।',
  },
  'zh-hans': {
    title: '面部对称',
    lead: '用真实的关键点，测量每个部位的左右平衡',
    privacy: '平衡是真的从关键点位置测出来的，就在你的浏览器里。几乎没有完全对称的脸，自然的不对称通常被看作一张脸有辨识度的原因——分数低不等于脸不好看。',
    overall: '⚖️ 综合对称度',
    breakdown: '📊 分部位',
    best: '最均衡的部位',
    tip: '📸 拍照建议',
    disclaimer: '关键点的测量是真的，从中读出的意思是娱乐。',
  },
  'zh-hant': {
    title: '臉部對稱',
    lead: '用真實的關鍵點，測量每個部位的左右平衡',
    privacy: '平衡是真的從關鍵點位置測出來的，就在你的瀏覽器裡。幾乎沒有完全對稱的臉，自然的不對稱通常被看作一張臉有辨識度的原因——分數低不等於臉不好看。',
    overall: '⚖️ 綜合對稱度',
    breakdown: '📊 分部位',
    best: '最均衡的部位',
    tip: '📸 拍照建議',
    disclaimer: '關鍵點的測量是真的，從中讀出的意思是娛樂。',
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
      slug="face-symmetry"
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
          <div className="bg-sec rounded-lg p-6 text-center">
            <p className="text-sm font-semibold text-white/80 mb-2">{c.overall}</p>
            <p className="text-4xl font-bold mb-3">{result.percent}%</p>
            <p className="text-sm leading-relaxed">{result.text}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5">
            <div className="flex items-baseline justify-between mb-3">
              <p className="label-caps">{c.breakdown}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{c.best} · <strong className="text-violet-600">{result.bestRegion}</strong></p>
            </div>
            <div className="flex flex-col gap-3">
              {result.regions.map(r => (
                <div key={r.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{r.label}</span>
                    <span className="text-xs font-bold text-violet-500">
                      {r.percent}% <span className="text-slate-500 dark:text-slate-400 font-medium">· {r.comment}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sec rounded-full" style={{ width: `${r.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-violet-50 dark:from-violet-950/20 dark:to-fuchsia-950/20 border border-violet-100 dark:border-violet-900/40 rounded-lg p-5">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
