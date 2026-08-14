/**
 * BMI 격자 낱장의 화면 문구 — 열 언어.
 *
 * 구간 이름은 **기준마다 다른 이름을 쓴다** — 아시아·태평양은 23·25에서 끊고
 * WHO는 25·30에서 끊으므로, 같은 사람이 두 기준에서 다른 이름을 받는다.
 * 한쪽만 적으면 다른 표를 본 사람에게 틀린 말이 된다.
 */
import type { AnyLocale10 } from '../locales.ts';

export interface BmiGridUI {
  h1: (h: string, w: string) => string;
  metaTitle: (h: string, w: string, bmi: string) => string;
  metaDesc: (h: string, w: string, bmi: string, band: string) => string;
  /** 아시아·태평양 다섯 구간 이름 */
  ap: readonly [string, string, string, string, string];
  /** WHO 다섯 구간 이름 */
  who: readonly [string, string, string, string, string];
  apLabel: string;
  whoLabel: string;
  idealTitle: string;
  ideal: (kg: string) => string;
  healthy: (lo: string, hi: string) => string;
  inRange: string;
  toLose: (kg: string) => string;
  toGain: (kg: string) => string;
  sameTitle: (bmi: string) => string;
  nearbyTitle: string;
  note: string;
}

export const BMI_GRID_UI: Record<AnyLocale10, BmiGridUI> = {
  ko: {
    h1: (h, w) => `키 ${h}cm 몸무게 ${w}kg — BMI는?`,
    metaTitle: (h, w, b) => `키 ${h} 몸무게 ${w} BMI ${b} — 표준체중과 정상 범위`,
    metaDesc: (h, w, b, band) => `키 ${h}cm 몸무게 ${w}kg의 체질량지수는 ${b}, 아시아·태평양 기준으로 ${band}입니다. 표준 체중과 정상 범위, 같은 BMI가 되는 다른 키·몸무게 조합까지 함께 봅니다.`,
    ap: ['저체중', '정상', '과체중', '경도 비만', '중등도 이상 비만'],
    who: ['저체중', '정상', '과체중', '비만 1단계', '비만 2단계 이상'],
    apLabel: '아시아·태평양 기준 (23·25)',
    whoLabel: 'WHO 국제 기준 (25·30)',
    idealTitle: '표준 체중과 정상 범위',
    ideal: kg => `BMI 22 기준 표준 체중은 ${kg}kg입니다.`,
    healthy: (lo, hi) => `정상 범위(BMI 18.5~22.9)는 ${lo}~${hi}kg입니다.`,
    inRange: '지금 몸무게는 그 범위 안에 있습니다.',
    toLose: kg => `범위 위끝까지 ${kg}kg 차이입니다.`,
    toGain: kg => `범위 아래끝까지 ${kg}kg 차이입니다.`,
    sameTitle: b => `BMI ${b}가 되는 다른 조합`,
    nearbyTitle: '가까운 키·몸무게',
    note: 'BMI는 근육과 지방을 구분하지 못합니다. 운동량이 많은 사람은 실제보다 높게 나오고, 진단이 아니라 참고 지표입니다.',
  },
  en: {
    h1: (h, w) => `BMI for ${h} cm and ${w} kg`,
    metaTitle: (h, w, b) => `${h} cm ${w} kg — BMI ${b}, healthy weight range`,
    metaDesc: (h, w, b, band) => `A height of ${h} cm and weight of ${w} kg gives a BMI of ${b}, which is ${band} on the Asia-Pacific scale. Includes the healthy weight range and other height–weight pairs with the same BMI.`,
    ap: ['underweight', 'normal', 'overweight', 'obese class I', 'obese class II or higher'],
    who: ['underweight', 'normal', 'overweight', 'obese class I', 'obese class II or higher'],
    apLabel: 'Asia-Pacific cut-offs (23 · 25)',
    whoLabel: 'WHO international cut-offs (25 · 30)',
    idealTitle: 'Reference weight and healthy range',
    ideal: kg => `At BMI 22 the reference weight is ${kg} kg.`,
    healthy: (lo, hi) => `The healthy range (BMI 18.5–22.9) is ${lo}–${hi} kg.`,
    inRange: 'This weight falls inside that range.',
    toLose: kg => `That is ${kg} kg above the top of the range.`,
    toGain: kg => `That is ${kg} kg below the bottom of the range.`,
    sameTitle: b => `Other pairs that also give BMI ${b}`,
    nearbyTitle: 'Nearby heights and weights',
    note: 'BMI cannot tell muscle from fat, so it reads high for people who train heavily. It is a reference figure, not a diagnosis.',
  },
  es: {
    h1: (h, w) => `IMC para ${h} cm y ${w} kg`,
    metaTitle: (h, w, b) => `${h} cm ${w} kg — IMC ${b} y peso saludable`,
    metaDesc: (h, w, b, band) => `Una estatura de ${h} cm con ${w} kg da un IMC de ${b}, es decir ${band}. Incluye el rango de peso saludable y otras combinaciones con el mismo IMC.`,
    ap: ['bajo peso', 'normal', 'sobrepeso', 'obesidad grado I', 'obesidad grado II o mayor'],
    who: ['bajo peso', 'normal', 'sobrepeso', 'obesidad grado I', 'obesidad grado II o mayor'],
    apLabel: 'Umbrales Asia-Pacífico (23 · 25)',
    whoLabel: 'Umbrales OMS (25 · 30)',
    idealTitle: 'Peso de referencia y rango saludable',
    ideal: kg => `Con IMC 22 el peso de referencia es ${kg} kg.`,
    healthy: (lo, hi) => `El rango saludable (IMC 18,5–22,9) va de ${lo} a ${hi} kg.`,
    inRange: 'Este peso está dentro de ese rango.',
    toLose: kg => `Son ${kg} kg por encima del límite superior.`,
    toGain: kg => `Son ${kg} kg por debajo del límite inferior.`,
    sameTitle: b => `Otras combinaciones con IMC ${b}`,
    nearbyTitle: 'Estaturas y pesos cercanos',
    note: 'El IMC no distingue músculo de grasa, por lo que resulta alto en personas muy entrenadas. Es una referencia, no un diagnóstico.',
  },
  'pt-br': {
    h1: (h, w) => `IMC para ${h} cm e ${w} kg`,
    metaTitle: (h, w, b) => `${h} cm ${w} kg — IMC ${b} e peso saudável`,
    metaDesc: (h, w, b, band) => `Altura de ${h} cm com ${w} kg resulta em IMC ${b}, ou seja ${band}. Inclui a faixa de peso saudável e outras combinações com o mesmo IMC.`,
    ap: ['abaixo do peso', 'normal', 'sobrepeso', 'obesidade grau I', 'obesidade grau II ou maior'],
    who: ['abaixo do peso', 'normal', 'sobrepeso', 'obesidade grau I', 'obesidade grau II ou maior'],
    apLabel: 'Limites Ásia-Pacífico (23 · 25)',
    whoLabel: 'Limites OMS (25 · 30)',
    idealTitle: 'Peso de referência e faixa saudável',
    ideal: kg => `Com IMC 22 o peso de referência é ${kg} kg.`,
    healthy: (lo, hi) => `A faixa saudável (IMC 18,5–22,9) vai de ${lo} a ${hi} kg.`,
    inRange: 'Este peso está dentro dessa faixa.',
    toLose: kg => `São ${kg} kg acima do limite superior.`,
    toGain: kg => `São ${kg} kg abaixo do limite inferior.`,
    sameTitle: b => `Outras combinações com IMC ${b}`,
    nearbyTitle: 'Alturas e pesos próximos',
    note: 'O IMC não separa músculo de gordura, então fica alto em quem treina bastante. É uma referência, não um diagnóstico.',
  },
  ja: {
    h1: (h, w) => `身長${h}cm 体重${w}kg のBMIは？`,
    metaTitle: (h, w, b) => `身長${h} 体重${w} BMI ${b} — 標準体重と適正範囲`,
    metaDesc: (h, w, b, band) => `身長${h}cm・体重${w}kgのBMIは${b}で、アジア太平洋基準では${band}です。標準体重と適正範囲、同じBMIになる別の組み合わせもまとめて確認できます。`,
    ap: ['低体重', '普通', '過体重', '肥満1度', '肥満2度以上'],
    who: ['低体重', '普通', '過体重', '肥満1度', '肥満2度以上'],
    apLabel: 'アジア太平洋基準（23・25）',
    whoLabel: 'WHO国際基準（25・30）',
    idealTitle: '標準体重と適正範囲',
    ideal: kg => `BMI 22 の標準体重は ${kg}kg です。`,
    healthy: (lo, hi) => `適正範囲（BMI 18.5〜22.9）は ${lo}〜${hi}kg です。`,
    inRange: '今の体重はその範囲の中にあります。',
    toLose: kg => `範囲の上限まで ${kg}kg の差です。`,
    toGain: kg => `範囲の下限まで ${kg}kg の差です。`,
    sameTitle: b => `BMI ${b} になる別の組み合わせ`,
    nearbyTitle: '近い身長・体重',
    note: 'BMIは筋肉と脂肪を区別できません。運動量が多い人は高めに出ます。診断ではなく目安です。',
  },
  de: {
    h1: (h, w) => `BMI bei ${h} cm und ${w} kg`,
    metaTitle: (h, w, b) => `${h} cm ${w} kg — BMI ${b} und Normalgewicht`,
    metaDesc: (h, w, b, band) => `${h} cm Körpergröße bei ${w} kg ergeben einen BMI von ${b}, also ${band}. Dazu der Normalbereich und weitere Kombinationen mit demselben BMI.`,
    ap: ['Untergewicht', 'Normalgewicht', 'Übergewicht', 'Adipositas Grad I', 'Adipositas Grad II oder höher'],
    who: ['Untergewicht', 'Normalgewicht', 'Übergewicht', 'Adipositas Grad I', 'Adipositas Grad II oder höher'],
    apLabel: 'Asien-Pazifik-Grenzwerte (23 · 25)',
    whoLabel: 'WHO-Grenzwerte (25 · 30)',
    idealTitle: 'Referenzgewicht und Normalbereich',
    ideal: kg => `Bei BMI 22 liegt das Referenzgewicht bei ${kg} kg.`,
    healthy: (lo, hi) => `Der Normalbereich (BMI 18,5–22,9) reicht von ${lo} bis ${hi} kg.`,
    inRange: 'Dieses Gewicht liegt in diesem Bereich.',
    toLose: kg => `Das sind ${kg} kg über der Obergrenze.`,
    toGain: kg => `Das sind ${kg} kg unter der Untergrenze.`,
    sameTitle: b => `Weitere Kombinationen mit BMI ${b}`,
    nearbyTitle: 'Ähnliche Größen und Gewichte',
    note: 'Der BMI unterscheidet nicht zwischen Muskeln und Fett und fällt bei viel Training zu hoch aus. Er ist ein Richtwert, keine Diagnose.',
  },
  fr: {
    h1: (h, w) => `IMC pour ${h} cm et ${w} kg`,
    metaTitle: (h, w, b) => `${h} cm ${w} kg — IMC ${b} et poids normal`,
    metaDesc: (h, w, b, band) => `Une taille de ${h} cm avec ${w} kg donne un IMC de ${b}, soit ${band}. Avec la fourchette de poids normal et d'autres couples au même IMC.`,
    ap: ['insuffisance pondérale', 'poids normal', 'surpoids', 'obésité de grade I', 'obésité de grade II ou plus'],
    who: ['insuffisance pondérale', 'poids normal', 'surpoids', 'obésité de grade I', 'obésité de grade II ou plus'],
    apLabel: 'Seuils Asie-Pacifique (23 · 25)',
    whoLabel: 'Seuils OMS (25 · 30)',
    idealTitle: 'Poids de référence et fourchette normale',
    ideal: kg => `À IMC 22, le poids de référence est de ${kg} kg.`,
    healthy: (lo, hi) => `La fourchette normale (IMC 18,5–22,9) va de ${lo} à ${hi} kg.`,
    inRange: 'Ce poids se situe dans cette fourchette.',
    toLose: kg => `C'est ${kg} kg au-dessus de la limite haute.`,
    toGain: kg => `C'est ${kg} kg en dessous de la limite basse.`,
    sameTitle: b => `Autres couples donnant un IMC de ${b}`,
    nearbyTitle: 'Tailles et poids voisins',
    note: "L'IMC ne distingue pas le muscle de la graisse et surestime les personnes très entraînées. C'est un repère, pas un diagnostic.",
  },
  hi: {
    h1: (h, w) => `${h} सेमी और ${w} किग्रा पर BMI`,
    metaTitle: (h, w, b) => `${h} सेमी ${w} किग्रा — BMI ${b} और स्वस्थ वज़न`,
    metaDesc: (h, w, b, band) => `${h} सेमी लंबाई और ${w} किग्रा वज़न पर BMI ${b} होता है, यानी ${band}। स्वस्थ वज़न की सीमा और उसी BMI वाले दूसरे संयोजन भी देखें।`,
    ap: ['कम वज़न', 'सामान्य', 'अधिक वज़न', 'मोटापा श्रेणी I', 'मोटापा श्रेणी II या ऊपर'],
    who: ['कम वज़न', 'सामान्य', 'अधिक वज़न', 'मोटापा श्रेणी I', 'मोटापा श्रेणी II या ऊपर'],
    apLabel: 'एशिया-प्रशांत सीमाएँ (23 · 25)',
    whoLabel: 'WHO अंतरराष्ट्रीय सीमाएँ (25 · 30)',
    idealTitle: 'संदर्भ वज़न और स्वस्थ सीमा',
    ideal: kg => `BMI 22 पर संदर्भ वज़न ${kg} किग्रा है।`,
    healthy: (lo, hi) => `स्वस्थ सीमा (BMI 18.5–22.9) ${lo}–${hi} किग्रा है।`,
    inRange: 'यह वज़न उसी सीमा के भीतर है।',
    toLose: kg => `यह ऊपरी सीमा से ${kg} किग्रा ज़्यादा है।`,
    toGain: kg => `यह निचली सीमा से ${kg} किग्रा कम है।`,
    sameTitle: b => `BMI ${b} देने वाले अन्य संयोजन`,
    nearbyTitle: 'आस-पास की लंबाई और वज़न',
    note: 'BMI मांसपेशी और चर्बी में फ़र्क़ नहीं करता, इसलिए ज़्यादा कसरत करने वालों में यह ऊँचा आता है। यह निदान नहीं, एक संकेतक है।',
  },
  'zh-hans': {
    h1: (h, w) => `身高${h}厘米 体重${w}公斤 的BMI`,
    metaTitle: (h, w, b) => `身高${h} 体重${w} — BMI ${b} 与标准体重`,
    metaDesc: (h, w, b, band) => `身高${h}厘米、体重${w}公斤的BMI是${b}，按亚太标准属于${band}。另有标准体重、正常范围，以及同样BMI的其他身高体重组合。`,
    ap: ['体重过轻', '正常', '超重', '肥胖一级', '肥胖二级以上'],
    who: ['体重过轻', '正常', '超重', '肥胖一级', '肥胖二级以上'],
    apLabel: '亚太标准（23 · 25）',
    whoLabel: 'WHO 国际标准（25 · 30）',
    idealTitle: '标准体重与正常范围',
    ideal: kg => `按BMI 22计算，标准体重为${kg}公斤。`,
    healthy: (lo, hi) => `正常范围（BMI 18.5–22.9）是${lo}–${hi}公斤。`,
    inRange: '当前体重就在这个范围内。',
    toLose: kg => `比上限高出${kg}公斤。`,
    toGain: kg => `比下限低${kg}公斤。`,
    sameTitle: b => `同样得到BMI ${b}的其他组合`,
    nearbyTitle: '相近的身高体重',
    note: 'BMI无法区分肌肉与脂肪，运动量大的人会偏高。它是参考指标，不是诊断。',
  },
  'zh-hant': {
    h1: (h, w) => `身高${h}公分 體重${w}公斤 的BMI`,
    metaTitle: (h, w, b) => `身高${h} 體重${w} — BMI ${b} 與標準體重`,
    metaDesc: (h, w, b, band) => `身高${h}公分、體重${w}公斤的BMI是${b}，依亞太標準屬於${band}。另有標準體重、正常範圍，以及同樣BMI的其他身高體重組合。`,
    ap: ['體重過輕', '正常', '過重', '肥胖一級', '肥胖二級以上'],
    who: ['體重過輕', '正常', '過重', '肥胖一級', '肥胖二級以上'],
    apLabel: '亞太標準（23 · 25）',
    whoLabel: 'WHO 國際標準（25 · 30）',
    idealTitle: '標準體重與正常範圍',
    ideal: kg => `依BMI 22計算，標準體重為${kg}公斤。`,
    healthy: (lo, hi) => `正常範圍（BMI 18.5–22.9）是${lo}–${hi}公斤。`,
    inRange: '目前體重就在這個範圍內。',
    toLose: kg => `比上限高出${kg}公斤。`,
    toGain: kg => `比下限低${kg}公斤。`,
    sameTitle: b => `同樣得到BMI ${b}的其他組合`,
    nearbyTitle: '相近的身高體重',
    note: 'BMI無法區分肌肉與脂肪，運動量大的人會偏高。它是參考指標，不是診斷。',
  },
};
