'use client';
import SnapShell, { type SnapDetection, type SnapTheme } from './SnapShell';
import { hashString, mix32, pick } from '@/lib/ratio-pick';
import { PHI, ratioScore } from '@/lib/golden-ratio-data';
import {
  GOLDEN_OVERALL_INTL, GOLDEN_METRIC_LABELS, GOLDEN_TIP_INTL, type SnapIntlLang,
} from '@/lib/snap-intl';

/** 측정식·점수식은 한국어 페이지와 동일하다 (ratioScore는 lib에서 그대로 가져온다) */
const THEME: SnapTheme = {
  hover: 'hover:text-amber-600',
  notice: 'bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 text-amber-800 dark:text-amber-300',
  spinner: 'border-t-amber-500',
  dropHover: 'hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/40',
  resetHover: 'hover:border-amber-300 hover:text-amber-600',
};

const COPY = {
  en: {
    title: 'Golden Ratio Test',
    lead: 'Measures how close your feature proportions sit to φ ≈ 1.618',
    privacy: 'The ratios are calculated from real landmark coordinates in your browser, not made up. But the golden ratio is not an absolute standard of beauty — it is one historical reference among many, so treat the score as a bit of fun.',
    overall: '📐 Golden ratio score',
    breakdown: '📊 Measured ratios',
    tip: '💡 Tip',
    phiNote: `Closer to φ ≈ ${PHI} scores higher`,
    disclaimer: 'The ratios are measured from real coordinates; calling any of them "ideal" is entertainment.',
  },
  es: {
    title: 'Test de proporción áurea',
    lead: 'Mide cuánto se acercan las proporciones de tus rasgos a φ ≈ 1,618',
    privacy: 'Las proporciones se calculan a partir de coordenadas reales de puntos faciales en tu navegador, no están inventadas. Pero la proporción áurea no es un estándar absoluto de belleza: es una referencia histórica entre muchas, así que tómate la puntuación como un juego.',
    overall: '📐 Puntuación áurea',
    breakdown: '📊 Proporciones medidas',
    tip: '💡 Consejo',
    phiNote: `Cuanto más cerca de φ ≈ ${PHI}, más alta la puntuación`,
    disclaimer: 'Las proporciones se miden con coordenadas reales; llamar «ideal» a alguna de ellas es entretenimiento.',
  },
  'pt-br': {
    title: 'Teste da proporção áurea',
    lead: 'Mede o quanto as proporções dos seus traços chegam perto de φ ≈ 1,618',
    privacy: 'As proporções são calculadas a partir de coordenadas reais dos pontos faciais no seu navegador, não são inventadas. Mas a proporção áurea não é um padrão absoluto de beleza: é uma referência histórica entre várias, então leve a pontuação na brincadeira.',
    overall: '📐 Pontuação áurea',
    breakdown: '📊 Proporções medidas',
    tip: '💡 Dica',
    phiNote: `Quanto mais perto de φ ≈ ${PHI}, maior a pontuação`,
    disclaimer: 'As proporções são medidas com coordenadas reais; chamar alguma delas de "ideal" é entretenimento.',
  },
  ja: {
    title: '黄金比テスト',
    lead: 'パーツの比率が φ ≒ 1.618 にどれだけ近いかを測ります',
    privacy: '比率はブラウザ内で実際のランドマーク座標から計算していて、でたらめではありません。ただし黄金比は絶対的な美の基準ではなく、数ある歴史的な目安のひとつです。スコアは遊びとして受け取ってください。',
    overall: '📐 黄金比スコア',
    breakdown: '📊 測定した比率',
    tip: '💡 ヒント',
    phiNote: `φ ≒ ${PHI} に近いほど高くなります`,
    disclaimer: '比率は実座標からの測定ですが、どれかを「理想」と呼ぶのは遊びです。',
  },
  de: {
    title: 'Goldener-Schnitt-Test',
    lead: 'Misst, wie nah deine Proportionen an φ ≈ 1,618 liegen',
    privacy: 'Die Verhältnisse werden aus echten Landmarkenkoordinaten in deinem Browser berechnet, nicht erfunden. Der Goldene Schnitt ist aber kein absoluter Schönheitsmaßstab — er ist eine historische Referenz unter vielen, nimm die Punktzahl also als Spaß.',
    overall: '📐 Goldener-Schnitt-Wert',
    breakdown: '📊 Gemessene Verhältnisse',
    tip: '💡 Tipp',
    phiNote: `Je näher an φ ≈ ${PHI}, desto höher`,
    disclaimer: 'Die Verhältnisse sind aus echten Koordinaten gemessen; eines davon „ideal“ zu nennen, ist Unterhaltung.',
  },
  fr: {
    title: 'Test du nombre d’or',
    lead: 'Mesure à quel point vos proportions s’approchent de φ ≈ 1,618',
    privacy: 'Les rapports sont calculés à partir de vraies coordonnées de points de repère dans votre navigateur, ils ne sont pas inventés. Mais le nombre d’or n’est pas un critère absolu de beauté : c’est une référence historique parmi d’autres, prenez donc le score comme un jeu.',
    overall: '📐 Score nombre d’or',
    breakdown: '📊 Rapports mesurés',
    tip: '💡 Astuce',
    phiNote: `Plus c’est proche de φ ≈ ${PHI}, plus le score monte`,
    disclaimer: 'Les rapports sont mesurés sur de vraies coordonnées ; qualifier l’un d’eux d’« idéal » est un divertissement.',
  },
  hi: {
    title: 'गोल्डन रेशियो टेस्ट',
    lead: 'नापता है कि आपके नक़्श का अनुपात φ ≈ 1.618 के कितना पास है',
    privacy: 'अनुपात आपके ब्राउज़र में असली लैंडमार्क निर्देशांकों से निकाले जाते हैं, बनाए नहीं जाते। पर गोल्डन रेशियो सुंदरता का कोई पक्का पैमाना नहीं — यह कई ऐतिहासिक संदर्भों में से एक है, इसलिए स्कोर को मज़े के लिए लें।',
    overall: '📐 गोल्डन रेशियो स्कोर',
    breakdown: '📊 नापे गए अनुपात',
    tip: '💡 सुझाव',
    phiNote: `φ ≈ ${PHI} के जितना पास, स्कोर उतना ऊपर`,
    disclaimer: 'अनुपात असली निर्देशांकों से नापे गए हैं; किसी को "आदर्श" कहना मनोरंजन है।',
  },
  'zh-hans': {
    title: '黄金比例测试',
    lead: '测量你的五官比例离 φ ≈ 1.618 有多近',
    privacy: '比例是在你的浏览器里用真实的关键点坐标算出来的，不是编的。但黄金比例并不是绝对的美的标准——它只是众多历史参照中的一个，所以把分数当成好玩的就行。',
    overall: '📐 黄金比例得分',
    breakdown: '📊 实测比例',
    tip: '💡 提示',
    phiNote: `越接近 φ ≈ ${PHI} 分数越高`,
    disclaimer: '比例是用真实坐标测的；把其中某个叫作「理想」则是娱乐。',
  },
  'zh-hant': {
    title: '黃金比例測驗',
    lead: '測量你的五官比例離 φ ≈ 1.618 有多近',
    privacy: '比例是在你的瀏覽器裡用真實的關鍵點座標算出來的，不是編的。但黃金比例並不是絕對的美的標準——它只是眾多歷史參照中的一個，所以把分數當成好玩的就行。',
    overall: '📐 黃金比例得分',
    breakdown: '📊 實測比例',
    tip: '💡 提示',
    phiNote: `越接近 φ ≈ ${PHI} 分數越高`,
    disclaimer: '比例是用真實座標測的；把其中某個叫作「理想」則是娛樂。',
  },
} as const;

interface Result {
  totalScore: number;
  overall: string;
  metrics: { key: string; label: string; desc: string; ratio: number; score: number }[];
  tip: string;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
const widthOf = (pts: { x: number }[]) => Math.max(...pts.map(p => p.x)) - Math.min(...pts.map(p => p.x));
const midpoint = (pts: { x: number; y: number }[]) => ({
  x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
  y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
});

export default function GoldenRatio({ lang }: { lang: SnapIntlLang }) {
  const c = COPY[lang];

  function analyze(d: SnapDetection): Result {
    const lm = d.landmarks;
    const jaw = lm.getJawOutline();
    const nose = lm.getNose();
    const mouth = lm.getMouth();
    const leftEye = lm.getLeftEye();
    const rightEye = lm.getRightEye();

    const browMid = midpoint([...lm.getLeftEyeBrow(), ...lm.getRightEyeBrow()]);
    const noseTip = nose[6] ?? nose[nose.length - 1];
    const chin = jaw[8];

    const upper = dist(browMid, noseTip);
    const lower = dist(noseTip, chin);
    const faceThirds = lower > 0 && upper > 0 ? Math.max(upper, lower) / Math.min(upper, lower) : 1.6;

    const cheekWidth = dist(jaw[0], jaw[16]);
    const faceWidth = cheekWidth > 0 ? dist(browMid, chin) / cheekWidth : 1.6;

    const innerEyeGap = dist(
      leftEye.reduce((a, b) => (a.x > b.x ? a : b)),
      rightEye.reduce((a, b) => (a.x < b.x ? a : b)),
    );
    const mouthW = widthOf(mouth);
    const eyeMouth = innerEyeGap > 0 ? (mouthW / innerEyeGap) * 1.618 : 1.6;

    const noseW = widthOf(nose);
    const noseMouth = noseW > 0 ? mouthW / noseW : 1.6;

    const ratios: Record<string, number> = { faceThirds, faceWidth, eyeMouth, noseMouth };
    const labels = GOLDEN_METRIC_LABELS[lang];
    const metrics = Object.entries(ratios).map(([key, ratio]) => ({
      key,
      label: labels[key]?.label ?? key,
      desc: labels[key]?.desc ?? '',
      ratio,
      score: ratioScore(ratio),
    }));

    const totalScore = Math.round(metrics.reduce((s, m) => s + m.score, 0) / metrics.length);
    const seed = mix32(Math.floor(totalScore * 99991) >>> 0);
    const pool = GOLDEN_OVERALL_INTL[lang];
    const overall = totalScore >= 80 ? pick(pool.slice(0, 4), seed) : pick(pool.slice(4), seed);

    const today = new Date();
    const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
    const tip = pick(GOLDEN_TIP_INTL[lang], (hashString(ymd) ^ seed) >>> 0);

    return { totalScore, overall, metrics, tip };
  }

  return (
    <SnapShell<Result>
      slug="golden-ratio"
      lang={lang}
      icon="📐"
      title={c.title}
      lead={c.lead}
      privacyBody={c.privacy}
      bar="from-amber-400 via-yellow-500 to-orange-500"
      theme={THEME}
      resultId="golden-result"
      analyze={analyze}
      disclaimer={c.disclaimer}
    >
      {result => (
        <>
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white text-center">
            <p className="text-sm font-semibold text-white/80 mb-2">{c.overall}</p>
            <p className="text-4xl font-black mb-3">{result.totalScore}</p>
            <p className="text-sm leading-relaxed">{result.overall}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <div className="flex items-baseline justify-between mb-3">
              <p className="label-caps">{c.breakdown}</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">{c.phiNote}</p>
            </div>
            <div className="flex flex-col gap-3">
              {result.metrics.map(m => (
                <div key={m.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                      {m.label}
                      <span className="block text-[10px] font-normal text-slate-400 dark:text-slate-500">{m.desc}</span>
                    </span>
                    <span className="text-xs font-bold text-amber-600 shrink-0 ml-2">
                      {m.ratio.toFixed(2)} <span className="text-slate-400 dark:text-slate-500 font-medium">· {m.score}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sec rounded-full" style={{ width: `${m.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-5">
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">{c.tip}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{result.tip}</p>
          </div>
        </>
      )}
    </SnapShell>
  );
}
