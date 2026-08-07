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
  es: {
    title: 'Lectura del rostro',
    lead: 'Siete proporciones faciales medidas y leídas al estilo tradicional',
    privacy: 'Las siete proporciones vienen de posiciones reales de puntos faciales medidas en tu navegador. Las lecturas que se les asocian proceden de la fisiognomía, una práctica tradicional sin respaldo científico: las medidas son reales, la interpretación es para pasarlo bien.',
    overall: '🔮 Lectura general',
    features: '📊 Rasgo por rasgo',
    luck: '🍀 Hoy',
    disclaimer: 'Las proporciones se miden de verdad. La fisiognomía no tiene base científica: lee la interpretación como entretenimiento.',
  },
  'pt-br': {
    title: 'Leitura de rosto',
    lead: 'Sete proporções faciais medidas e lidas no estilo tradicional',
    privacy: 'As sete proporções vêm de posições reais de pontos faciais medidas no seu navegador. As leituras ligadas a elas vêm da fisiognomia, uma prática tradicional sem respaldo científico: as medidas são reais, a interpretação é diversão.',
    overall: '🔮 Leitura geral',
    features: '📊 Traço por traço',
    luck: '🍀 Hoje',
    disclaimer: 'As proporções são realmente medidas. A fisiognomia não tem base científica — leia a interpretação como entretenimento.',
  },
  ja: {
    title: '顔相診断',
    lead: '顔の7つの比率を測り、伝統的な読み方でみます',
    privacy: '7つの比率は、ブラウザ内で測った実際のランドマーク位置から出しています。それに付く読み方は人相学によるもので、科学的な裏づけはありません。測定は本物、解釈は遊びです。',
    overall: '🔮 総合の読み',
    features: '📊 パーツ別',
    luck: '🍀 今日は',
    disclaimer: '比率は実際に測っています。人相学に科学的根拠はないので、解釈は遊びとして読んでください。',
  },
  de: {
    title: 'Gesichtsdeutung',
    lead: 'Sieben Gesichtsproportionen, gemessen und traditionell gelesen',
    privacy: 'Die sieben Verhältnisse stammen aus echten, in deinem Browser gemessenen Landmarkenpositionen. Die Deutungen dazu kommen aus der Physiognomik, einer traditionellen Praxis ohne wissenschaftlichen Rückhalt — die Messungen sind echt, die Auslegung ist Spaß.',
    overall: '🔮 Gesamtdeutung',
    features: '📊 Merkmal für Merkmal',
    luck: '🍀 Heute',
    disclaimer: 'Die Proportionen werden tatsächlich gemessen. Physiognomik hat keine wissenschaftliche Grundlage — lies die Deutung als Unterhaltung.',
  },
  fr: {
    title: 'Lecture du visage',
    lead: 'Sept proportions du visage mesurées et lues à la manière traditionnelle',
    privacy: 'Les sept rapports viennent de positions réelles de points de repère mesurées dans votre navigateur. Les lectures qui s’y rattachent relèvent de la physiognomonie, une pratique traditionnelle sans validité scientifique : les mesures sont réelles, l’interprétation est pour s’amuser.',
    overall: '🔮 Lecture générale',
    features: '📊 Trait par trait',
    luck: '🍀 Aujourd’hui',
    disclaimer: 'Les proportions sont réellement mesurées. La physiognomonie n’a aucune base scientifique — lisez l’interprétation comme un divertissement.',
  },
  hi: {
    title: 'चेहरा पढ़ना',
    lead: 'चेहरे के सात अनुपात नापकर पारंपरिक तरीक़े से पढ़े जाते हैं',
    privacy: 'सातों अनुपात आपके ब्राउज़र में नापी गई असली लैंडमार्क जगहों से आते हैं। उनसे जुड़ी पढ़त सामुद्रिक शास्त्र से आती है, जिसका कोई वैज्ञानिक आधार नहीं — माप असली है, व्याख्या मज़े के लिए।',
    overall: '🔮 कुल पढ़त',
    features: '📊 हिस्से के हिसाब से',
    luck: '🍀 आज',
    disclaimer: 'अनुपात सचमुच नापे जाते हैं। सामुद्रिक शास्त्र का वैज्ञानिक आधार नहीं है — व्याख्या को मनोरंजन की तरह पढ़ें।',
  },
  'zh-hans': {
    title: '面相分析',
    lead: '测量七项面部比例，按传统方式解读',
    privacy: '这七个比例来自在你浏览器里测量的真实关键点位置。附在上面的解读来自面相学，一门没有科学依据的传统说法——测量是真的，解释是图个乐。',
    overall: '🔮 综合解读',
    features: '📊 分部位',
    luck: '🍀 今天',
    disclaimer: '比例是真的在测。面相学没有科学依据——把解读当娱乐看。',
  },
  'zh-hant': {
    title: '面相分析',
    lead: '測量七項臉部比例，按傳統方式解讀',
    privacy: '這七個比例來自在你瀏覽器裡測量的真實關鍵點位置。附在上面的解讀來自面相學，一門沒有科學依據的傳統說法——測量是真的，解釋是圖個樂。',
    overall: '🔮 綜合解讀',
    features: '📊 分部位',
    luck: '🍀 今天',
    disclaimer: '比例是真的在測。面相學沒有科學依據——把解讀當娛樂看。',
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
      slug="face-reading"
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
            <p className="label-caps mb-3">{c.features}</p>
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
