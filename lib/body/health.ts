/** 몸 수치 - 건강 지표 (8종) */
import type { FormulaTool } from '../formula/types.ts';
import { ratio } from '../formula/types.ts';
import { round } from '../formula/num.ts';

export const HEALTH_TOOLS: FormulaTool[] = [
  {
    slug: 'mean-arterial-pressure',
    icon: '🩺',
    category: '건강 지표',
    fields: [
      { key: 'sys', term: 'systolic', unit: 'mmHg', def: 120, min: 50, max: 260 },
      { key: 'dia', term: 'diastolic', unit: 'mmHg', def: 80, min: 30, max: 160 },
    ],
    formula: '{map} = {diastolic} + ({systolic} − {diastolic}) ÷ 3',
    compute: v => [
      { term: 'map', unit: 'mmHg', value: round(v.dia + (v.sys - v.dia) / 3, 1), digits: 1, primary: true },
      { term: 'pulsePress', unit: 'mmHg', value: round(v.sys - v.dia, 0), digits: 0 },
    ],
    verdict: (v, out) => {
      const m = out[0].value;
      const low = m < 70;
      const high = m > 100;
      return {
        ko: low ? `평균 동맥압 ${m}mmHg는 낮습니다 — 장기 관류가 부족할 수 있습니다.` : high ? `평균 동맥압 ${m}mmHg는 높습니다.` : `평균 동맥압 ${m}mmHg는 통상 범위(70~100) 안입니다.`,
        en: low ? `A MAP of ${m} mmHg is low — organ perfusion may be inadequate.` : high ? `A MAP of ${m} mmHg is elevated.` : `A MAP of ${m} mmHg sits in the usual 70–100 range.`,
        l10n: { es: low ? `Una presión arterial media de ${m} mmHg es baja: la perfusión de los órganos puede quedarse corta.` : high ? `Una presión arterial media de ${m} mmHg está elevada.` : `Una presión arterial media de ${m} mmHg cae en el rango habitual de 70–100.`, 'pt-br': low ? `Uma pressão arterial média de ${m} mmHg é baixa: a perfusão dos órgãos pode ficar insuficiente.` : high ? `Uma pressão arterial média de ${m} mmHg está elevada.` : `Uma pressão arterial média de ${m} mmHg fica na faixa habitual de 70–100.`, ja: low ? `平均動脈圧${m}mmHgは低めです — 臓器への血流が足りない可能性があります。` : high ? `平均動脈圧${m}mmHgは高めです。` : `平均動脈圧${m}mmHgは通常の範囲(70〜100)内です。`, de: low ? `Ein mittlerer arterieller Druck von ${m} mmHg ist niedrig — die Organdurchblutung könnte nicht reichen.` : high ? `Ein mittlerer arterieller Druck von ${m} mmHg ist erhöht.` : `Ein mittlerer arterieller Druck von ${m} mmHg liegt im üblichen Bereich von 70–100.`, fr: low ? `Une pression artérielle moyenne de ${m} mmHg est basse : la perfusion des organes peut être insuffisante.` : high ? `Une pression artérielle moyenne de ${m} mmHg est élevée.` : `Une pression artérielle moyenne de ${m} mmHg se situe dans la plage habituelle de 70 à 100.`, hi: low ? `${m} mmHg का औसत धमनी दाब कम है — अंगों तक ख़ून की पहुँच अधूरी पड़ सकती है।` : high ? `${m} mmHg का औसत धमनी दाब बढ़ा हुआ है।` : `${m} mmHg का औसत धमनी दाब सामान्य दायरे (70–100) में है।` },
        tone: low || high ? 'warn' : 'good',
      };
    },
    ko: { title: '평균 동맥압 계산기', desc: '수축기·이완기 혈압으로 평균 동맥압과 맥압을 구합니다.',
      long: '심장은 한 주기의 3분의 1만 수축하므로 단순 평균이 아니라 이완기에 맥압의 3분의 1을 더합니다. 장기에 피가 얼마나 도는지를 보는 지표입니다.',
      note: '한 번 잰 값으로 판단하지 않습니다. 같은 시간대에 며칠 재서 평균을 보세요.' },
    en: { title: 'Mean Arterial Pressure', desc: 'Get MAP and pulse pressure from systolic and diastolic readings.',
      long: 'The heart spends only a third of each cycle contracting, so MAP is diastolic plus one third of the pulse pressure rather than a plain average. It reflects perfusion of the organs.',
      note: 'Never judge from a single reading — measure at the same time of day over several days and average.' },
  },
  {
    slug: 'pulse-pressure',
    icon: '💓',
    category: '건강 지표',
    fields: [
      { key: 'sys', term: 'systolic', unit: 'mmHg', def: 130, min: 50, max: 260 },
      { key: 'dia', term: 'diastolic', unit: 'mmHg', def: 80, min: 30, max: 160 },
    ],
    formula: '{pulsePress} = {systolic} − {diastolic}',
    compute: v => [
      { term: 'pulsePress', unit: 'mmHg', value: round(v.sys - v.dia, 0), digits: 0, primary: true },
      { term: 'percent', unit: 'percent', value: round(ratio(v.sys - v.dia, v.sys) * 100, 1), digits: 1 },
    ],
    verdict: (v, out) => {
      const p = out[0].value;
      const wide = p >= 60;
      const narrow = p < 30;
      return {
        ko: wide ? `맥압 ${p}mmHg는 넓습니다 — 혈관이 굳으면 넓어집니다.` : narrow ? `맥압 ${p}mmHg는 좁습니다.` : `맥압 ${p}mmHg는 통상 범위(30~50)입니다.`,
        en: wide ? `A pulse pressure of ${p} mmHg is wide — stiff arteries widen it.` : narrow ? `A pulse pressure of ${p} mmHg is narrow.` : `A pulse pressure of ${p} mmHg is in the usual 30–50 range.`,
        l10n: { es: wide ? `Una presión de pulso de ${p} mmHg es ancha: las arterias rígidas la ensanchan.` : narrow ? `Una presión de pulso de ${p} mmHg es estrecha.` : `Una presión de pulso de ${p} mmHg está en el rango habitual de 30–50.`, 'pt-br': wide ? `Uma pressão de pulso de ${p} mmHg é larga: artérias endurecidas a alargam.` : narrow ? `Uma pressão de pulso de ${p} mmHg é estreita.` : `Uma pressão de pulso de ${p} mmHg está na faixa habitual de 30–50.`, ja: wide ? `脈圧${p}mmHgは広めです — 血管が硬くなると広がります。` : narrow ? `脈圧${p}mmHgは狭めです。` : `脈圧${p}mmHgは通常の範囲(30〜50)です。`, de: wide ? `Eine Blutdruckamplitude von ${p} mmHg ist weit — steife Arterien machen sie weiter.` : narrow ? `Eine Blutdruckamplitude von ${p} mmHg ist schmal.` : `Eine Blutdruckamplitude von ${p} mmHg liegt im üblichen Bereich von 30–50.`, fr: wide ? `Une pression pulsée de ${p} mmHg est large : des artères rigides l’élargissent.` : narrow ? `Une pression pulsée de ${p} mmHg est étroite.` : `Une pression pulsée de ${p} mmHg est dans la plage habituelle de 30 à 50.`, hi: wide ? `${p} mmHg की नाड़ी दाब चौड़ी है — धमनियाँ कड़ी होने पर यह चौड़ी हो जाती है।` : narrow ? `${p} mmHg की नाड़ी दाब सँकरी है।` : `${p} mmHg की नाड़ी दाब सामान्य दायरे (30–50) में है।` },
        tone: wide || narrow ? 'warn' : 'good',
      };
    },
    ko: { title: '맥압 계산기', desc: '수축기와 이완기 혈압의 차이를 구합니다.',
      long: '맥압은 심장이 한 번 뛸 때 혈관에 실리는 압력의 폭입니다. 60mmHg 이상이면 동맥 경직도가 높다는 신호로 봅니다.',
      note: '나이가 들면 이완기 혈압은 떨어지고 수축기는 올라가면서 맥압이 자연히 넓어집니다.' },
    en: { title: 'Pulse Pressure', desc: 'The gap between your systolic and diastolic readings.',
      long: 'Pulse pressure is the swing in arterial pressure per heartbeat. Values of 60 mmHg or more are read as a sign of arterial stiffness.',
      note: 'With age, diastolic pressure falls while systolic rises, so pulse pressure naturally widens.' },
  },
  {
    slug: 'cholesterol-ratio',
    icon: '🧈',
    category: '건강 지표',
    fields: [
      { key: 'total', term: 'totalChol', unit: 'mgdlU', def: 200, min: 50, max: 500 },
      { key: 'hdl', term: 'hdl', unit: 'mgdlU', def: 50, min: 10, max: 150 },
    ],
    formula: '{cholRatio} = {totalChol} ÷ {hdl}',
    compute: v => [
      { term: 'cholRatio', value: round(ratio(v.total, v.hdl), 2), digits: 2, primary: true },
      { term: 'nonHdl', unit: 'mgdlU', value: round(v.total - v.hdl, 0), digits: 0 },
    ],
    verdict: (v, out) => {
      const r = out[0].value;
      const good = r < 3.5;
      const bad = r >= 5;
      return {
        ko: good ? `비율 ${r}은 양호합니다.` : bad ? `비율 ${r}은 위험 구간입니다 — 5 이상은 관리가 필요합니다.` : `비율 ${r}은 보통입니다. 목표는 3.5 아래입니다.`,
        en: good ? `A ratio of ${r} is favourable.` : bad ? `A ratio of ${r} is in the risk range — 5 or above needs attention.` : `A ratio of ${r} is average; aim below 3.5.`,
        l10n: { es: good ? `Una relación de ${r} es favorable.` : bad ? `Una relación de ${r} entra en la zona de riesgo: 5 o más pide atención.` : `Una relación de ${r} es normal; apunta por debajo de 3,5.`, 'pt-br': good ? `Uma relação de ${r} é favorável.` : bad ? `Uma relação de ${r} entra na zona de risco: 5 ou mais pede atenção.` : `Uma relação de ${r} é mediana; mire abaixo de 3,5.`, ja: good ? `比${r}は良好です。` : bad ? `比${r}は危険域です — 5以上は対応が必要です。` : `比${r}は平均的です。目標は3.5未満です。`, de: good ? `Ein Verhältnis von ${r} ist günstig.` : bad ? `Ein Verhältnis von ${r} liegt im Risikobereich — ab 5 ist Handeln gefragt.` : `Ein Verhältnis von ${r} ist durchschnittlich; ziel auf unter 3,5.`, fr: good ? `Un rapport de ${r} est favorable.` : bad ? `Un rapport de ${r} entre dans la zone à risque : 5 ou plus demande une prise en charge.` : `Un rapport de ${r} est moyen ; vise sous 3,5.`, hi: good ? `${r} का अनुपात अच्छा है।` : bad ? `${r} का अनुपात जोखिम के दायरे में है — 5 या ऊपर पर ध्यान देना ज़रूरी है।` : `${r} का अनुपात औसत है; लक्ष्य 3.5 से नीचे रखें।` },
        tone: good ? 'good' : bad ? 'bad' : 'warn',
      };
    },
    ko: { title: '콜레스테롤 비율 계산기', desc: '총콜레스테롤을 HDL로 나눈 심혈관 위험 지표입니다.',
      long: '총콜레스테롤 수치만으로는 위험을 알기 어렵습니다. HDL이 높으면 총수치가 높아도 비율은 좋아집니다. 3.5 아래가 목표, 5 이상은 위험으로 봅니다.',
      note: '검사는 9~12시간 금식 후에 받습니다. 중성지방은 식사에 크게 흔들립니다.' },
    en: { title: 'Cholesterol Ratio', desc: 'Total cholesterol divided by HDL — a cardiovascular risk marker.',
      long: 'Total cholesterol alone says little. High HDL improves the ratio even when the total is high. Below 3.5 is the goal; 5 or more is considered risky.',
      note: 'Test after 9–12 hours of fasting — triglycerides swing sharply with meals.' },
  },
  {
    slug: 'ldl-friedewald',
    icon: '🧪',
    category: '건강 지표',
    fields: [
      { key: 'total', term: 'totalChol', unit: 'mgdlU', def: 200, min: 50, max: 500 },
      { key: 'hdl', term: 'hdl', unit: 'mgdlU', def: 50, min: 10, max: 150 },
      { key: 'tg', term: 'triglyceride', unit: 'mgdlU', def: 120, min: 20, max: 800 },
    ],
    formula: '{ldl} = {totalChol} − {hdl} − {triglyceride} ÷ 5',
    compute: v => [
      { term: 'ldl', unit: 'mgdlU', value: round(v.total - v.hdl - v.tg / 5, 0), digits: 0, primary: true },
      { term: 'nonHdl', unit: 'mgdlU', value: round(v.total - v.hdl, 0), digits: 0 },
    ],
    verdict: v => v.tg >= 400 ? {
      ko: '중성지방이 400 이상이면 이 공식은 쓸 수 없습니다. 직접 측정한 LDL이 필요합니다.',
      en: 'Above 400 mg/dL of triglycerides this formula breaks down — a directly measured LDL is needed.',
      l10n: { es: 'Por encima de 400 mg/dL de triglicéridos esta fórmula deja de servir: hace falta un LDL medido directamente.', 'pt-br': 'Acima de 400 mg/dL de triglicerídeos esta fórmula deixa de valer: é preciso um LDL medido diretamente.', ja: '中性脂肪が400 mg/dLを超えるとこの式は使えません。直接測定したLDLが必要です。', de: 'Über 400 mg/dL Triglyzeride versagt diese Formel — dann braucht es ein direkt gemessenes LDL.', fr: 'Au-delà de 400 mg/dL de triglycérides, cette formule ne tient plus : il faut un LDL mesuré directement.', hi: 'ट्राइग्लिसराइड 400 mg/dL से ऊपर हो तो यह सूत्र काम नहीं करता — सीधे नापा गया LDL चाहिए।' },
      tone: 'bad',
    } : null,
    ko: { title: 'LDL 콜레스테롤 계산기', desc: '검사지의 세 값으로 LDL을 계산합니다(프리드발트 식).',
      long: '많은 검사에서 LDL은 직접 재지 않고 이 공식으로 구합니다. 중성지방을 5로 나눈 값이 VLDL 추정치입니다.',
      note: '중성지방이 400mg/dL 이상이면 공식이 부정확해져 직접 측정해야 합니다.' },
    en: { title: 'LDL Cholesterol (Friedewald)', desc: 'Calculate LDL from the three numbers on your lipid panel.',
      long: 'Many labs derive LDL with this formula rather than measuring it. Triglycerides divided by 5 stands in for VLDL cholesterol.',
      note: 'Above 400 mg/dL of triglycerides the estimate breaks down and LDL must be measured directly.' },
  },
  {
    slug: 'non-hdl',
    icon: '📋',
    category: '건강 지표',
    fields: [
      { key: 'total', term: 'totalChol', unit: 'mgdlU', def: 210, min: 50, max: 500 },
      { key: 'hdl', term: 'hdl', unit: 'mgdlU', def: 45, min: 10, max: 150 },
    ],
    formula: '{nonHdl} = {totalChol} − {hdl}',
    compute: v => [
      { term: 'nonHdl', unit: 'mgdlU', value: round(v.total - v.hdl, 0), digits: 0, primary: true },
      { term: 'cholRatio', value: round(ratio(v.total, v.hdl), 2), digits: 2 },
    ],
    verdict: (v, out) => {
      const n = out[0].value;
      const high = n >= 160;
      return {
        ko: high ? `non-HDL ${n}은 높습니다 — 130 아래가 일반 목표입니다.` : `non-HDL ${n}입니다. 일반 목표는 130 아래입니다.`,
        en: high ? `Non-HDL of ${n} is high — the general target is under 130.` : `Non-HDL is ${n}; the general target is under 130.`,
        l10n: { es: high ? `Un no-HDL de ${n} es alto: el objetivo general está por debajo de 130.` : `El no-HDL es ${n}; el objetivo general está por debajo de 130.`, 'pt-br': high ? `Um não-HDL de ${n} é alto: a meta geral fica abaixo de 130.` : `O não-HDL é ${n}; a meta geral fica abaixo de 130.`, ja: high ? `non-HDL ${n}は高めです — 一般的な目標は130未満です。` : `non-HDLは${n}です。一般的な目標は130未満です。`, de: high ? `Ein Nicht-HDL von ${n} ist hoch — das allgemeine Ziel liegt unter 130.` : `Das Nicht-HDL beträgt ${n}; das allgemeine Ziel liegt unter 130.`, fr: high ? `Un non-HDL de ${n} est élevé : la cible générale est sous 130.` : `Le non-HDL est de ${n} ; la cible générale est sous 130.`, hi: high ? `${n} का non-HDL ऊँचा है — आम लक्ष्य 130 से नीचे है।` : `non-HDL ${n} है; आम लक्ष्य 130 से नीचे रहता है।` },
        tone: high ? 'bad' : 'good',
      };
    },
    ko: { title: 'non-HDL 콜레스테롤', desc: '총콜레스테롤에서 HDL을 뺀 값으로, 나쁜 지질을 모두 합친 수치입니다.',
      long: 'LDL만 보면 중성지방이 실어 나르는 지질을 놓칩니다. non-HDL은 동맥경화를 일으키는 입자를 전부 포함해 LDL보다 예측력이 좋다는 평가를 받습니다.',
      note: '금식하지 않은 혈액으로도 계산할 수 있는 것이 LDL 대비 장점입니다.' },
    en: { title: 'Non-HDL Cholesterol', desc: 'Total minus HDL — every atherogenic lipid added together.',
      long: 'Looking only at LDL misses the lipids carried by triglyceride-rich particles. Non-HDL captures all atherogenic particles and is judged a better predictor than LDL.',
      note: 'Unlike calculated LDL, it works on non-fasting blood — that is its practical advantage.' },
  },
  {
    slug: 'homa-ir',
    icon: '🍬',
    category: '건강 지표',
    fields: [
      { key: 'glucose', term: 'glucose', unit: 'mgdlU', def: 95, min: 40, max: 400 },
      { key: 'insulin', term: 'insulin', def: 8, min: 0.5, max: 100, step: 0.1 },
    ],
    formula: '{homaIr} = {glucose} × {insulin} ÷ 405',
    compute: v => [
      { term: 'homaIr', value: round(ratio(v.glucose * v.insulin, 405), 2), digits: 2, primary: true },
    ],
    verdict: (v, out) => {
      const x = out[0].value;
      const high = x >= 2.5;
      return {
        ko: high ? `HOMA-IR ${x}는 인슐린 저항성이 의심되는 구간입니다.` : `HOMA-IR ${x}는 통상 범위(2.5 미만)입니다.`,
        en: high ? `A HOMA-IR of ${x} suggests insulin resistance.` : `A HOMA-IR of ${x} is within the usual range (under 2.5).`,
        l10n: { es: high ? `Un HOMA-IR de ${x} apunta a resistencia a la insulina.` : `Un HOMA-IR de ${x} está dentro del rango habitual (por debajo de 2,5).`, 'pt-br': high ? `Um HOMA-IR de ${x} aponta resistência à insulina.` : `Um HOMA-IR de ${x} está dentro da faixa habitual (abaixo de 2,5).`, ja: high ? `HOMA-IR ${x}はインスリン抵抗性が疑われる領域です。` : `HOMA-IR ${x}は通常の範囲(2.5未満)です。`, de: high ? `Ein HOMA-IR von ${x} deutet auf Insulinresistenz hin.` : `Ein HOMA-IR von ${x} liegt im üblichen Bereich (unter 2,5).`, fr: high ? `Un HOMA-IR de ${x} évoque une résistance à l’insuline.` : `Un HOMA-IR de ${x} reste dans la plage habituelle (sous 2,5).`, hi: high ? `${x} का HOMA-IR इंसुलिन प्रतिरोध की ओर इशारा करता है।` : `${x} का HOMA-IR सामान्य दायरे (2.5 से कम) में है।` },
        tone: high ? 'warn' : 'good',
      };
    },
    ko: { title: 'HOMA-IR 인슐린 저항성 지수', desc: '공복 혈당과 공복 인슐린으로 인슐린 저항성을 계산합니다.',
      long: '공복 혈당(mg/dL)과 공복 인슐린(μU/ml)을 곱해 405로 나눕니다. 혈당이 정상이어도 인슐린이 높으면 값이 커집니다 — 당뇨 전 단계를 미리 보는 지표입니다.',
      note: '기준선은 인구집단마다 다릅니다. 대체로 2.5를 쓰지만 검사실 기준을 확인하세요.' },
    en: { title: 'HOMA-IR Insulin Resistance', desc: 'Calculate insulin resistance from fasting glucose and fasting insulin.',
      long: 'Multiply fasting glucose (mg/dL) by fasting insulin (μU/mL) and divide by 405. Normal glucose with high insulin still raises the score — it flags pre-diabetes early.',
      note: 'Cut-offs vary by population; 2.5 is common, but check your laboratory’s reference.' },
  },
  {
    slug: 'a1c-glucose',
    icon: '🩸',
    category: '건강 지표',
    fields: [{ key: 'a1c', term: 'a1c', unit: 'percent', def: 6.5, min: 3, max: 20, step: 0.1 }],
    formula: '{avgGlucose} = 28.7 × {a1c} − 46.7',
    compute: v => [
      { term: 'avgGlucose', unit: 'mgdlU', value: round(28.7 * v.a1c - 46.7, 0), digits: 0, primary: true },
      { term: 'mmolL', unit: 'mmolU', value: round((28.7 * v.a1c - 46.7) / 18, 2), digits: 2 },
    ],
    verdict: v => {
      const a = v.a1c;
      const band = a < 5.7 ? 0 : a < 6.5 ? 1 : 2;
      const ko = ['정상', '당뇨 전 단계', '당뇨 진단 기준 이상'][band];
      const en = ['normal', 'pre-diabetes range', 'at or above the diabetes threshold'][band];
      return { ko: `HbA1c ${a}%는 ${ko}입니다.`, en: `An HbA1c of ${a}% is ${en}.`, l10n: { es: `Una HbA1c del ${a} % es ${['normal', 'prediabetes', 'igual o superior al umbral de diabetes'][band]}.`, 'pt-br': `Uma HbA1c de ${a} % é ${['normal', 'pré-diabetes', 'igual ou acima do limiar de diabetes'][band]}.`, ja: `HbA1c ${a}%は${['正常', '糖尿病予備群', '糖尿病の診断基準以上'][band]}です。`, de: `Ein HbA1c von ${a} % ist ${['normal', 'Prädiabetes', 'auf oder über der Diabetes-Schwelle'][band]}.`, fr: `Une HbA1c de ${a} % est ${['normale', 'un prédiabète', 'au niveau ou au-delà du seuil du diabète'][band]}.`, hi: `${a}% की HbA1c ${['सामान्य', 'मधुमेह-पूर्व अवस्था', 'मधुमेह की सीमा पर या ऊपर'][band]} है।` }, tone: band === 0 ? 'good' : band === 1 ? 'warn' : 'bad' };
    },
    ko: { title: 'HbA1c → 평균 혈당 변환', desc: '당화혈색소로 지난 2~3개월의 평균 혈당을 환산합니다.',
      long: 'HbA1c는 적혈구에 붙은 당의 비율이라 최근 2~3개월의 평균 혈당을 반영합니다. 6.5% 이상이면 당뇨 진단 기준입니다.',
      note: '빈혈이나 신장 질환이 있으면 HbA1c가 실제 혈당과 어긋날 수 있습니다.' },
    en: { title: 'HbA1c to Average Glucose', desc: 'Convert HbA1c into the average blood glucose of the last 2–3 months.',
      long: 'HbA1c is the share of haemoglobin with glucose attached, so it reflects the average over the red cells’ lifespan. 6.5% or higher meets the diabetes threshold.',
      note: 'Anaemia and kidney disease can make HbA1c disagree with actual glucose levels.' },
  },
  {
    slug: 'bsa-dose',
    icon: '💉',
    category: '건강 지표',
    fields: [
      { key: 'height', term: 'heightCm', def: 165, min: 30, max: 250 },
      { key: 'weight', term: 'weightKgB', def: 60, min: 2, max: 300 },
      { key: 'perM2', term: 'dosePerKg', def: 100, min: 0.1, max: 2000 },
    ],
    formula: '{doseMg} = √({heightCm} × {weightKgB} ÷ 3600) × {dosePerKg}',
    compute: v => {
      const bsa = Math.sqrt((v.height * v.weight) / 3600);
      return [
        { term: 'doseMg', unit: 'mg', value: round(bsa * v.perM2, 1), digits: 1, primary: true },
        { term: 'bsa', unit: 'm2', value: round(bsa, 3), digits: 3 },
      ];
    },
    ko: { title: '체표면적 기준 약 용량', desc: '체표면적 1㎡당 용량으로 실제 투여량을 계산합니다.',
      long: '항암제 등 일부 약은 체중이 아니라 체표면적을 기준으로 용량을 정합니다. Mosteller 식으로 체표면적을 구한 뒤 단위 용량을 곱합니다.',
      note: '실제 투여량은 처방과 신기능·간기능 조정을 따릅니다. 이 값은 처방 확인용입니다.' },
    en: { title: 'BSA-Based Drug Dose', desc: 'Compute a dose from a per-square-metre figure and body surface area.',
      long: 'Some drugs, chemotherapy in particular, are dosed by body surface area rather than weight. This takes BSA by the Mosteller formula and multiplies by the unit dose.',
      note: 'Real doses follow the prescription and any renal or hepatic adjustment — use this only to check.' },
  },
];
