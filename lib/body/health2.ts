/**
 * 몸 수치 - 건강 지표 둘째 묶음 (8종)
 *
 * 검사 결과지에 숫자만 적혀 나오는 것들을 지표로 바꾼다. 계산은 어디서나 같고
 * 판정 기준선도 국제 학회 값을 쓰므로 나라를 가리지 않는다.
 */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const HEALTH2_TOOLS: FormulaTool[] = [
  {
    slug: 'egfr',
    icon: '🫘',
    category: '건강 지표',
    fields: [
      { key: 'scr', term: 'creatinine', def: 0.9, min: 0.1, max: 15 },
      { key: 'age', term: 'ageYears', def: 55, min: 18, max: 100 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1 },
    ],
    formula: '{egfr} = 142 × ({creatinine} ÷ κ) ^ α × 0.9938 ^ {ageYears} × f({sexFactor})',
    compute: v => {
      const female = v.sex === 0;
      const k = female ? 0.7 : 0.9;
      const a = female ? -0.241 : -0.302;
      const r = ratio(v.scr, k);
      const val = 142 * Math.pow(Math.min(r, 1), a) * Math.pow(Math.max(r, 1), -1.2) * Math.pow(0.9938, v.age) * (female ? 1.012 : 1);
      return [
        { term: 'egfr', unit: 'none', value: round(val, 1), digits: 1, primary: true },
        { term: 'creatinine', unit: 'none', value: round(v.scr, 2), digits: 2 },
        { term: 'percent', unit: 'percent', value: round(ratio(val, 100) * 100, 0), digits: 0 },
      ];
    },
    verdict: (_v, out) => {
      const g = out[0].value;
      return g >= 90
        ? { ko: `${g}은 정상 범위(90 이상)입니다.`, en: `${g} is in the normal range (90 or above).`, l10n: { es: `${g} está en el rango normal (90 o más).`, 'pt-br': `${g} está na faixa normal (90 ou mais).`, ja: `${g}は正常範囲(90以上)です。`, de: `${g} liegt im Normbereich (90 oder darüber).`, fr: `${g} est dans la plage normale (90 ou plus).`, hi: `${g} सामान्य दायरे (90 या ऊपर) में है।` }, tone: 'good' }
        : g >= 60
          ? { ko: `${g}은 경미한 감소입니다. 다른 소견이 없으면 만성 신장병으로 보지 않습니다.`, en: `${g} is a mild reduction; without other findings it is not classed as chronic kidney disease.`, l10n: { es: `${g} es una reducción leve; sin otros hallazgos no se clasifica como enfermedad renal crónica.`, 'pt-br': `${g} é uma redução leve; sem outros achados não se classifica como doença renal crônica.`, ja: `${g}は軽度の低下です。他の所見がなければ慢性腎臓病とは扱いません。`, de: `${g} ist eine leichte Minderung; ohne weitere Befunde gilt das nicht als chronische Nierenerkrankung.`, fr: `${g} est une baisse légère ; sans autre anomalie, on ne parle pas de maladie rénale chronique.`, hi: `${g} हल्की गिरावट है; दूसरे लक्षण न हों तो इसे दीर्घकालिक गुर्दा रोग नहीं माना जाता।` }, tone: 'warn' }
          : g >= 30
            ? { ko: `${g}은 중등도 감소입니다. 신장 기능을 정기적으로 볼 구간입니다.`, en: `${g} is a moderate reduction — the range that calls for regular monitoring.`, l10n: { es: `${g} es una reducción moderada: el rango que pide seguimiento regular.`, 'pt-br': `${g} é uma redução moderada: a faixa que pede acompanhamento regular.`, ja: `${g}は中等度の低下です。腎機能を定期的に見ていく領域です。`, de: `${g} ist eine mäßige Minderung — der Bereich, der regelmäßige Kontrollen verlangt.`, fr: `${g} est une baisse modérée : la plage qui appelle un suivi régulier.`, hi: `${g} मध्यम गिरावट है — इस दायरे में गुर्दे की नियमित जाँच चाहिए।` }, tone: 'bad' }
            : { ko: `${g}은 크게 감소한 상태입니다. 전문의 진료가 필요합니다.`, en: `${g} is a severe reduction and needs specialist care.`, l10n: { es: `${g} es una reducción grave y necesita atención especializada.`, 'pt-br': `${g} é uma redução grave e precisa de atendimento especializado.`, ja: `${g}は大きく低下した状態です。専門医の診療が必要です。`, de: `${g} ist eine schwere Minderung und gehört in fachärztliche Betreuung.`, fr: `${g} est une baisse sévère et demande une prise en charge spécialisée.`, hi: `${g} भारी गिरावट है और इसके लिए विशेषज्ञ की देखभाल चाहिए।` }, tone: 'bad' };
    },
    ko: { title: 'eGFR 신장 기능 계산기', desc: '크레아티닌·나이·성별로 추정 사구체여과율을 구합니다.',
      long: '2021년 CKD-EPI 식을 씁니다. 크레아티닌 수치 자체는 근육량에 따라 흔들리므로 나이와 성별로 보정해야 신장이 1분에 얼마를 걸러 내는지에 가까워집니다. 90 이상이 정상, 60 아래가 지속되면 만성 신장병 범주입니다.',
      note: '근육이 아주 많거나 아주 적으면 이 식이 어긋납니다. 이 값은 진단이 아니라 검사 결과를 이해하는 참고이므로 판단은 의료진과 하세요.' },
    en: { title: 'eGFR Kidney Function', desc: 'Estimated filtration rate from creatinine, age and sex.',
      long: 'This uses the 2021 CKD-EPI equation. Raw creatinine swings with muscle mass, so it has to be adjusted for age and sex to approximate how much the kidneys filter per minute. Ninety and above is normal; sustained values under sixty fall into chronic kidney disease.',
      note: 'The equation drifts at very high or very low muscle mass. This is a reading aid, not a diagnosis — interpret it with a clinician.' },
  },
  {
    slug: 'creatinine-clearance',
    icon: '⚗️',
    category: '건강 지표',
    fields: [
      { key: 'scr', term: 'creatinine', def: 1.0, min: 0.1, max: 15 },
      { key: 'age', term: 'ageYears', def: 60, min: 18, max: 100 },
      { key: 'kg', term: 'weightKgB', unit: 'kg', def: 70, min: 20 },
      { key: 'sex', term: 'sexFactor', def: 1, min: 0, max: 1 },
    ],
    formula: '{crcl} = (140 − {ageYears}) × {weightKgB} ÷ (72 × {creatinine}) × f({sexFactor})',
    compute: v => {
      const base = ratio((140 - v.age) * v.kg, 72 * v.scr);
      const val = v.sex === 0 ? base * 0.85 : base;
      return [
        { term: 'crcl', unit: 'mlmin', value: round(val, 1), digits: 1, primary: true },
        { term: 'crclPerKg', unit: 'mlmin', value: round(ratio(val, v.kg), 2), digits: 2 },
        { term: 'ageYears', unit: 'none', value: Math.round(140 - v.age), digits: 0 },
      ];
    },
    ko: { title: '크레아티닌 청소율 (코크로프트-골트)', desc: '체중을 반영한 신장 청소율을 계산합니다.',
      long: '1976년에 나온 이 식은 체중을 직접 넣기 때문에 약 용량을 정할 때 지금도 쓰입니다. 나이가 들면 (140 − 나이)가 작아져 청소율이 떨어지고, 여성은 근육량 차이로 0.85를 곱합니다.',
      note: '비만이면 실제보다 높게 나옵니다. 그럴 때는 실제 체중 대신 이상 체중이나 보정 체중을 넣는 것이 관례입니다.' },
    en: { title: 'Creatinine Clearance (Cockcroft–Gault)', desc: 'Kidney clearance that takes body weight into account.',
      long: 'Published in 1976, this equation still governs drug dosing because weight enters it directly. Age lowers the result through (140 − age), and women are multiplied by 0.85 for muscle mass.',
      note: 'It overestimates in obesity; the convention there is to use ideal or adjusted body weight instead of actual.' },
  },
  {
    slug: 'triglyceride-hdl-ratio',
    icon: '🩸',
    category: '건강 지표',
    fields: [
      { key: 'tg', term: 'triglyceride', def: 150, min: 20, max: 1000 },
      { key: 'hdl', term: 'hdl', def: 50, min: 10, max: 120 },
    ],
    formula: '{tgHdl} = {triglyceride} ÷ {hdl}',
    compute: v => [
      { term: 'tgHdl', unit: 'none', value: round(ratio(v.tg, v.hdl), 2), digits: 2, primary: true },
      { term: 'triglyceride', unit: 'mgdlU', value: Math.round(v.tg), digits: 0 },
      { term: 'hdl', unit: 'mgdlU', value: Math.round(v.hdl), digits: 0 },
    ],
    verdict: (_v, out) => {
      const r = out[0].value;
      return r < 2
        ? { ko: `${r}은 좋은 편입니다. 2 아래를 목표로 봅니다.`, en: `${r} is good — under 2 is the target.`, l10n: { es: `${r} está bien: el objetivo es por debajo de 2.`, 'pt-br': `${r} está bom: a meta é abaixo de 2.`, ja: `${r}は良い方です。2未満を目標と見ます。`, de: `${r} ist gut — unter 2 ist das Ziel.`, fr: `${r} est bon : la cible est sous 2.`, hi: `${r} अच्छा है — लक्ष्य 2 से नीचे है।` }, tone: 'good' }
        : r < 3.5
          ? { ko: `${r}은 경계 구간입니다.`, en: `${r} sits in the borderline band.`, l10n: { es: `${r} cae en la franja límite.`, 'pt-br': `${r} fica na faixa limítrofe.`, ja: `${r}は境界域です。`, de: `${r} liegt im Grenzbereich.`, fr: `${r} se situe dans la zone limite.`, hi: `${r} सीमावर्ती दायरे में है।` }, tone: 'warn' }
          : { ko: `${r}은 높습니다. 인슐린 저항성과 함께 오는 경우가 많습니다.`, en: `${r} is high and often travels with insulin resistance.`, l10n: { es: `${r} es alto y suele venir acompañado de resistencia a la insulina.`, 'pt-br': `${r} é alto e costuma vir junto com resistência à insulina.`, ja: `${r}は高めです。インスリン抵抗性と一緒に現れることが多い値です。`, de: `${r} ist hoch und geht oft mit Insulinresistenz einher.`, fr: `${r} est élevé et va souvent de pair avec une résistance à l’insuline.`, hi: `${r} ऊँचा है और अक्सर इंसुलिन प्रतिरोध के साथ आता है।` }, tone: 'bad' };
    },
    ko: { title: '중성지방·HDL 비율 계산기', desc: '중성지방을 HDL로 나눠 대사 상태를 봅니다.',
      long: '두 값을 따로 보는 것보다 비율이 대사 상태를 잘 나타냅니다. 중성지방이 높고 HDL이 낮은 조합이 인슐린 저항성과 함께 오는 패턴이라, 비율이 그 조합을 한 숫자로 잡아 줍니다.',
      note: '중성지방은 식사 직후에 크게 올라갑니다. 9~12시간 공복 상태에서 잰 값을 쓰세요.' },
    en: { title: 'Triglyceride to HDL Ratio', desc: 'Divide triglycerides by HDL for a metabolic read.',
      long: 'The ratio says more about metabolic state than either number alone. High triglycerides with low HDL is the pattern that travels with insulin resistance, and the ratio captures that pairing in one figure.',
      note: 'Triglycerides spike after eating. Use a value taken after 9–12 hours of fasting.' },
  },
  {
    slug: 'quicki',
    icon: '📊',
    category: '건강 지표',
    fields: [
      { key: 'glucose', term: 'glucose', def: 95, min: 40, max: 400 },
      { key: 'insulin', term: 'insulin', def: 8, min: 0.5, max: 100 },
    ],
    formula: '{quicki} = 1 ÷ (log {insulin} + log {glucose})',
    compute: v => {
      const q = 1 / (Math.log10(v.insulin) + Math.log10(v.glucose));
      return [
        { term: 'quicki', unit: 'none', value: round(q, 4), digits: 4, primary: true },
        { term: 'homaIr', unit: 'none', value: round(v.glucose * v.insulin / 405, 2), digits: 2 },
        { term: 'glucose', unit: 'mgdlU', value: Math.round(v.glucose), digits: 0 },
      ];
    },
    verdict: (_v, out) => {
      const q = out[0].value;
      return q >= 0.357
        ? { ko: `${q}는 인슐린 감수성이 좋은 쪽입니다. 값이 클수록 좋습니다.`, en: `${q} indicates good insulin sensitivity — higher is better.`, l10n: { es: `${q} indica buena sensibilidad a la insulina: cuanto más alto, mejor.`, 'pt-br': `${q} indica boa sensibilidade à insulina: quanto mais alto, melhor.`, ja: `${q}はインスリン感受性が良い方です。値が大きいほど良好です。`, de: `${q} spricht für eine gute Insulinempfindlichkeit — höher ist besser.`, fr: `${q} indique une bonne sensibilité à l’insuline : plus c’est haut, mieux c’est.`, hi: `${q} अच्छी इंसुलिन संवेदनशीलता दिखाता है — जितना ऊँचा, उतना अच्छा।` }, tone: 'good' }
        : q >= 0.33
          ? { ko: `${q}는 경계 구간입니다.`, en: `${q} sits in the borderline band.`, l10n: { es: `${q} cae en la franja límite.`, 'pt-br': `${q} fica na faixa limítrofe.`, ja: `${q}は境界域です。`, de: `${q} liegt im Grenzbereich.`, fr: `${q} se situe dans la zone limite.`, hi: `${q} सीमावर्ती दायरे में है।` }, tone: 'warn' }
          : { ko: `${q}는 인슐린 저항성이 있는 쪽입니다. 값이 작을수록 저항성이 큽니다.`, en: `${q} points to insulin resistance — lower means more resistant.`, l10n: { es: `${q} apunta a resistencia a la insulina: cuanto más bajo, mayor la resistencia.`, 'pt-br': `${q} aponta resistência à insulina: quanto mais baixo, maior a resistência.`, ja: `${q}はインスリン抵抗性がある方です。値が小さいほど抵抗性が強くなります。`, de: `${q} deutet auf Insulinresistenz hin — niedriger heißt widerstandsfähiger.`, fr: `${q} pointe vers une résistance à l’insuline : plus c’est bas, plus la résistance est forte.`, hi: `${q} इंसुलिन प्रतिरोध की ओर इशारा करता है — जितना कम, उतना ज़्यादा प्रतिरोध।` }, tone: 'bad' };
    },
    ko: { title: 'QUICKI 인슐린 감수성 지수', desc: '공복 혈당과 인슐린으로 인슐린 감수성을 계산합니다.',
      long: 'HOMA-IR과 같은 두 값을 쓰지만 로그를 취해 분포를 고르게 만든 지수입니다. 방향이 반대로, HOMA-IR은 클수록 나쁘고 QUICKI는 클수록 좋습니다. 0.357 부근을 정상 기준으로 봅니다.',
      note: '두 값 모두 8시간 이상 공복에서 재야 합니다. 스트레스와 수면 부족만으로도 인슐린이 오르므로 하루 컨디션에 따라 흔들립니다.' },
    en: { title: 'QUICKI Insulin Sensitivity Index', desc: 'Insulin sensitivity from fasting glucose and insulin.',
      long: 'It uses the same two values as HOMA-IR but takes logarithms to even out the distribution. The direction flips: HOMA-IR is worse when high, QUICKI is better when high, with about 0.357 as the normal reference.',
      note: 'Both inputs need at least eight hours of fasting. Stress and short sleep alone raise insulin, so the figure moves with the day.' },
  },
  {
    slug: 'tyg-index',
    icon: '🔬',
    category: '건강 지표',
    fields: [
      { key: 'tg', term: 'triglyceride', def: 130, min: 20, max: 1000 },
      { key: 'glucose', term: 'glucose', def: 95, min: 40, max: 400 },
    ],
    formula: '{tygIndex} = log ({triglyceride} × {glucose} ÷ 2)',
    compute: v => {
      const t = Math.log(v.tg * v.glucose / 2);
      return [
        { term: 'tygIndex', unit: 'none', value: round(t, 3), digits: 3, primary: true },
        { term: 'triglyceride', unit: 'mgdlU', value: Math.round(v.tg), digits: 0 },
        { term: 'glucose', unit: 'mgdlU', value: Math.round(v.glucose), digits: 0 },
      ];
    },
    verdict: (_v, out) => {
      const t = out[0].value;
      return t < 8.5
        ? { ko: `${t}는 낮은 쪽입니다. 인슐린 저항성 가능성이 작습니다.`, en: `${t} is on the low side — insulin resistance is less likely.`, l10n: { es: `${t} está en la parte baja: la resistencia a la insulina es menos probable.`, 'pt-br': `${t} está no lado baixo: a resistência à insulina é menos provável.`, ja: `${t}は低い方です。インスリン抵抗性の可能性は小さめです。`, de: `${t} liegt eher niedrig — Insulinresistenz ist weniger wahrscheinlich.`, fr: `${t} est plutôt bas : une résistance à l’insuline est moins probable.`, hi: `${t} कम की तरफ़ है — इंसुलिन प्रतिरोध की संभावना कम है।` }, tone: 'good' }
        : t < 8.8
          ? { ko: `${t}는 경계 구간입니다.`, en: `${t} sits in the borderline band.`, l10n: { es: `${t} cae en la franja límite.`, 'pt-br': `${t} fica na faixa limítrofe.`, ja: `${t}は境界域です。`, de: `${t} liegt im Grenzbereich.`, fr: `${t} se situe dans la zone limite.`, hi: `${t} सीमावर्ती दायरे में है।` }, tone: 'warn' }
          : { ko: `${t}는 높은 쪽입니다. 인슐린 저항성을 의심하는 구간입니다.`, en: `${t} is high — the range where insulin resistance is suspected.`, l10n: { es: `${t} es alto: el rango donde se sospecha resistencia a la insulina.`, 'pt-br': `${t} é alto: a faixa em que se suspeita de resistência à insulina.`, ja: `${t}は高い方です。インスリン抵抗性を疑う領域です。`, de: `${t} ist hoch — der Bereich, in dem Insulinresistenz vermutet wird.`, fr: `${t} est élevé : la plage où l’on suspecte une résistance à l’insuline.`, hi: `${t} ऊँचा है — इसी दायरे में इंसुलिन प्रतिरोध का शक होता है।` }, tone: 'bad' };
    },
    ko: { title: 'TyG 지수 계산기', desc: '중성지방과 혈당만으로 인슐린 저항성을 가늠합니다.',
      long: '인슐린 검사 없이 흔한 혈액검사 두 항목만으로 인슐린 저항성을 추정하는 지수입니다. 인슐린 수치를 재지 않는 건강검진 결과로도 계산할 수 있는 것이 장점입니다.',
      note: '기준선은 연구 집단마다 8.5에서 8.8 사이로 조금씩 다릅니다. 절대값보다 같은 사람의 변화를 보는 데 쓰는 편이 낫습니다.' },
    en: { title: 'TyG Index', desc: 'Gauge insulin resistance from triglycerides and glucose alone.',
      long: 'This index estimates insulin resistance without an insulin assay, using two of the commonest blood results. Its appeal is that a standard health check-up already contains both numbers.',
      note: 'Cut-offs vary between study populations, roughly 8.5 to 8.8. It works better for tracking one person over time than as an absolute threshold.' },
  },
  {
    slug: 'fib-4',
    icon: '🧫',
    category: '건강 지표',
    fields: [
      { key: 'age', term: 'ageYears', def: 52, min: 18, max: 100 },
      { key: 'ast', term: 'ast', def: 34, min: 5, max: 500 },
      { key: 'alt', term: 'alt', def: 42, min: 5, max: 500 },
      { key: 'plt', term: 'platelet', def: 220, min: 20, max: 600 },
    ],
    formula: '{fib4} = {ageYears} × {ast} ÷ ({platelet} × √{alt})',
    compute: v => {
      const f = ratio(v.age * v.ast, v.plt * Math.sqrt(v.alt));
      return [
        { term: 'fib4', unit: 'none', value: round(f, 2), digits: 2, primary: true },
        { term: 'cholRatio', unit: 'none', value: round(ratio(v.ast, v.alt), 2), digits: 2 },
        { term: 'platelet', unit: 'none', value: Math.round(v.plt), digits: 0 },
      ];
    },
    verdict: (v, out) => {
      const f = out[0].value;
      const lo = v.age >= 65 ? 2.0 : 1.3;
      return f < lo
        ? { ko: `${f}는 낮은 구간(${lo} 미만)입니다. 진행된 섬유화 가능성이 낮습니다.`, en: `${f} is in the low band (under ${lo}); advanced fibrosis is unlikely.`, l10n: { es: `${f} está en la franja baja (por debajo de ${lo}); una fibrosis avanzada es poco probable.`, 'pt-br': `${f} está na faixa baixa (abaixo de ${lo}); fibrose avançada é pouco provável.`, ja: `${f}は低い区分(${lo}未満)です。進行した線維化の可能性は低めです。`, de: `${f} liegt im niedrigen Bereich (unter ${lo}); eine fortgeschrittene Fibrose ist unwahrscheinlich.`, fr: `${f} est dans la zone basse (sous ${lo}) ; une fibrose avancée est peu probable.`, hi: `${f} निचले दायरे (${lo} से कम) में है; बढ़ी हुई फ़ाइब्रोसिस की संभावना कम है।` }, tone: 'good' }
        : f <= 2.67
          ? { ko: `${f}는 중간 구간입니다. 추가 검사로 가려야 하는 범위입니다.`, en: `${f} is indeterminate — the range where further testing is needed.`, l10n: { es: `${f} es indeterminado: el rango en que hacen falta más pruebas.`, 'pt-br': `${f} é indeterminado: a faixa em que são necessários mais exames.`, ja: `${f}は中間の区分です。追加の検査で切り分ける必要がある範囲です。`, de: `${f} ist unbestimmt — der Bereich, in dem weitere Tests nötig sind.`, fr: `${f} est indéterminé : la zone où d’autres examens sont nécessaires.`, hi: `${f} अनिश्चित दायरे में है — यहाँ और जाँच करके तय करना पड़ता है।` }, tone: 'warn' }
          : { ko: `${f}는 높은 구간(2.67 초과)입니다. 전문의 평가가 필요합니다.`, en: `${f} is in the high band (above 2.67) and needs specialist assessment.`, l10n: { es: `${f} está en la franja alta (por encima de 2,67) y requiere valoración especializada.`, 'pt-br': `${f} está na faixa alta (acima de 2,67) e pede avaliação especializada.`, ja: `${f}は高い区分(2.67超)です。専門医の評価が必要です。`, de: `${f} liegt im hohen Bereich (über 2,67) und braucht eine fachärztliche Abklärung.`, fr: `${f} est dans la zone haute (au-dessus de 2,67) et demande un avis spécialisé.`, hi: `${f} ऊपरी दायरे (2.67 से ज़्यादा) में है और इसके लिए विशेषज्ञ का आकलन चाहिए।` }, tone: 'bad' };
    },
    ko: { title: 'FIB-4 간 섬유화 지수', desc: '나이와 간 수치, 혈소판으로 간 섬유화 위험을 가늠합니다.',
      long: '간 조직검사 없이 흔한 혈액검사만으로 섬유화 가능성을 가려내는 지수입니다. 낮으면 진행된 섬유화가 거의 없다고 볼 수 있어, 추가 검사가 필요한 사람을 골라내는 1차 도구로 쓰입니다.',
      note: '65세 이상은 낮은 쪽 기준선이 2.0으로 올라갑니다. 급성 간염이나 음주 직후에는 간 수치가 튀어 값이 왜곡됩니다.' },
    en: { title: 'FIB-4 Liver Fibrosis Index', desc: 'Gauge fibrosis risk from age, liver enzymes and platelets.',
      long: 'This index screens for fibrosis without a biopsy, using ordinary blood results. A low value largely rules out advanced fibrosis, which makes it a first-line filter for deciding who needs further testing.',
      note: 'Above 65 the lower cut-off rises to 2.0. Acute hepatitis or recent heavy drinking spikes the enzymes and distorts the result.' },
  },
  {
    slug: 'remnant-cholesterol',
    icon: '🧪',
    category: '건강 지표',
    fields: [
      { key: 'total', term: 'totalChol', def: 210, min: 80, max: 500 },
      { key: 'hdl', term: 'hdl', def: 52, min: 10, max: 120 },
      { key: 'ldl', term: 'ldl', def: 125, min: 20, max: 350 },
    ],
    formula: '{remnantChol} = {totalChol} − {hdl} − {ldl}',
    compute: v => {
      const remnant = v.total - v.hdl - v.ldl;
      return [
        { term: 'remnantChol', unit: 'mgdlU', value: round(remnant, 1), digits: 1, primary: true },
        { term: 'nonHdl', unit: 'mgdlU', value: round(v.total - v.hdl, 1), digits: 1 },
        { term: 'percent', unit: 'percent', value: round(ratio(remnant, v.total) * 100, 1), digits: 1 },
      ];
    },
    verdict: (_v, out) => {
      const r = out[0].value;
      return r <= 30
        ? { ko: `${r}은 낮은 편입니다. 30 아래를 바람직하게 봅니다.`, en: `${r} is low — under 30 is considered desirable.`, l10n: { es: `${r} es bajo: por debajo de 30 se considera deseable.`, 'pt-br': `${r} é baixo: abaixo de 30 é considerado desejável.`, ja: `${r}は低い方です。30未満が望ましいとされます。`, de: `${r} ist niedrig — unter 30 gilt als wünschenswert.`, fr: `${r} est bas : sous 30 est considéré comme souhaitable.`, hi: `${r} कम है — 30 से नीचे रहना बेहतर माना जाता है।` }, tone: 'good' }
        : { ko: `${r}은 높은 편입니다. LDL이 정상인데도 위험이 남아 있는 경우가 여기서 드러납니다.`, en: `${r} is high; this is where risk that survives a normal LDL shows up.`, l10n: { es: `${r} es alto; aquí es donde aparece el riesgo que sobrevive a un LDL normal.`, 'pt-br': `${r} é alto; é aqui que aparece o risco que sobrevive a um LDL normal.`, ja: `${r}は高い方です。LDLが正常でも残る危険は、ここに現れます。`, de: `${r} ist hoch; hier zeigt sich das Risiko, das ein normales LDL überlebt.`, fr: `${r} est élevé ; c’est ici qu’apparaît le risque qui survit à un LDL normal.`, hi: `${r} ऊँचा है; LDL सामान्य होने पर भी जो जोखिम बचा रहता है, वह यहीं दिखता है।` }, tone: 'warn' };
    },
    ko: { title: '잔여 콜레스테롤 계산기', desc: '총콜레스테롤에서 HDL과 LDL을 빼 남는 부분을 구합니다.',
      long: 'LDL이 정상인데도 혈관 위험이 남는 이유를 설명하는 값입니다. 중성지방을 실어 다니는 지단백에 든 콜레스테롤이 여기 잡히는데, 이 부분은 LDL 검사에 안 나옵니다.',
      note: '총콜레스테롤·HDL·LDL을 같은 날 같은 검사로 잰 값을 넣어야 합니다. 서로 다른 날 값을 섞으면 음수가 나오기도 합니다.' },
    en: { title: 'Remnant Cholesterol', desc: 'Total cholesterol minus HDL and LDL — what is left over.',
      long: 'This is the figure that explains vascular risk persisting despite a normal LDL. It captures cholesterol carried in triglyceride-rich lipoproteins, which an LDL measurement does not see.',
      note: 'Use total, HDL and LDL from the same panel on the same day. Mixing dates can even produce a negative number.' },
  },
  {
    slug: 'a1c-ifcc',
    icon: '🔁',
    category: '건강 지표',
    fields: [
      { key: 'a1c', term: 'a1c', unit: 'percent', def: 6.5, min: 3, max: 20 },
    ],
    formula: '{a1cIfcc} = ({a1c} − 2.15) × 10.929',
    compute: v => {
      const ifcc = (v.a1c - 2.15) * 10.929;
      return [
        { term: 'a1cIfcc', unit: 'mmolMol', value: round(ifcc, 1), digits: 1, primary: true },
        { term: 'avgGlucose', unit: 'mgdlU', value: round(28.7 * v.a1c - 46.7, 1), digits: 1 },
        { term: 'mmolL', unit: 'mmolU', value: round((28.7 * v.a1c - 46.7) / 18, 2), digits: 2 },
      ];
    },
    ko: { title: '당화혈색소 단위 환산 (% ↔ IFCC)', desc: 'NGSP 퍼센트와 IFCC mmol/mol을 서로 바꿉니다.',
      long: '같은 검사인데 나라마다 단위가 다릅니다. 미국·한국·일본은 %(NGSP), 유럽 상당 지역은 mmol/mol(IFCC)을 씁니다. 6.5%는 48mmol/mol입니다. 평균 혈당까지 함께 보여 줍니다.',
      note: '두 단위는 선형 관계라 환산에 오차가 없습니다. 다만 평균 혈당 환산식은 통계적 추정이라 개인차가 있습니다.' },
    en: { title: 'HbA1c Unit Converter (% ↔ IFCC)', desc: 'Convert between NGSP percent and IFCC mmol/mol.',
      long: 'It is the same test reported in different units: the US, Korea and Japan use percent (NGSP) while much of Europe uses mmol/mol (IFCC). 6.5% is 48 mmol/mol. The estimated average glucose is shown too.',
      note: 'The two units are linearly related, so the conversion is exact. The average-glucose estimate, however, is statistical and varies between people.' },
  },
  {
    slug: 'ldl-hdl-ratio',
    icon: '🩸',
    category: '건강 지표',
    fields: [
      { key: 'ldl', term: 'ldl', unit: 'mgdlU', def: 130, min: 0 },
      { key: 'hdl', term: 'hdl', unit: 'mgdlU', def: 50, min: 0 },
    ],
    formula: '{cholRatio} = {ldl} ÷ {hdl}',
    compute: v => [
      { term: 'cholRatio', unit: 'none', value: round(ratio(v.ldl, v.hdl), 2), digits: 2, primary: true },
      { term: 'nonHdl', unit: 'mgdlU', value: Math.round(v.ldl), digits: 0 },
    ],
    ko: { title: 'LDL·HDL 비율', desc: '나쁜 콜레스테롤을 좋은 콜레스테롤로 나눈 비율을 봅니다.',
      long: '총콜레스테롤 대신 LDL만 놓고 HDL과 견주는 방식입니다. 총콜레스테롤에는 HDL이 이미 섞여 있어서, LDL만 떼어 보면 방향이 더 또렷해집니다.',
      note: '나라와 학회마다 권하는 기준이 다릅니다. 어느 수치 하나로 판단하지 말고 검사지 전체와 함께 보세요.' },
    en: { title: 'LDL to HDL Ratio', desc: 'Divide the harmful cholesterol by the protective kind.',
      long: 'This puts LDL alone against HDL instead of using total cholesterol, which already has HDL folded into it. Separating them makes the direction of travel clearer.',
      note: 'Recommended thresholds differ between countries and guidelines. Read it alongside the whole panel, never on its own.' },
  },
];
