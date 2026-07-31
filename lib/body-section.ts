/** /body 섹션 설정 — 카탈로그·카테고리 이름·색을 한곳에 모은다 */
import { BODY_TOOLS, BODY_CATEGORIES } from './body-tools.ts';
import type { Lang, FormulaLang } from './formula/terms.ts';
import type { SectionConfig, SectionMeta } from './formula/section.ts';

export const BODY_META = {
  ko: {
    section: '몸 수치',
    hubTitle: '몸 수치 계산기',
    hubLead: 'BMI·기초대사량·심박수·혈압 지표까지 몸으로 재는 수치 100가지',
    hubNotice: '🩺 참고용 계산입니다. 진단과 치료는 의료진의 판단을 따르세요.',
    footNote: '이 계산기는 건강 정보를 이해하기 위한 참고 도구이며 진단·처방을 대신하지 않습니다. 증상이 있으면 의료기관을 찾으세요.',
    metaTitle: '몸 수치 계산기 — BMI·기초대사량·심박수·혈압 100종',
    metaDesc:
      'BMI, 표준 체중, 체지방률, 기초대사량과 TDEE, 목표 심박수, 1RM, 달리기 페이스, 평균 동맥압, LDL과 HOMA-IR까지 몸으로 재는 수치 100가지를 계산식과 함께 봅니다.',
  },
  en: {
    section: 'Body Metrics',
    hubTitle: 'Body Metric Calculators',
    hubLead: 'A hundred body numbers — BMI, BMR, heart rate zones, blood pressure markers',
    hubNotice: '🩺 For reference only — diagnosis and treatment belong to your clinician.',
    footNote: 'These calculators help you understand health figures; they do not replace diagnosis or prescription. See a clinician if you have symptoms.',
    metaTitle: 'Body Metric Calculators — BMI, BMR, Heart Rate & 97 More',
    metaDesc:
      'BMI, ideal weight, body fat, BMR and TDEE, target heart rate, one-rep max, running pace, mean arterial pressure, LDL and HOMA-IR — 100 body metrics with the formula behind each one.',
  },
} as const;

export const BODY_CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '체중·체형': '체중·체형', '대사·칼로리': '대사·칼로리', '심장·운동': '심장·운동',
    '아이·성장': '아이·성장', '건강 지표': '건강 지표', '생활 대사': '생활 대사',
  },
  en: {
    '체중·체형': 'Weight & Shape', '대사·칼로리': 'Metabolism & Calories', '심장·운동': 'Heart & Exercise',
    '아이·성장': 'Children & Growth', '건강 지표': 'Health Markers', '생활 대사': 'Daily Metabolism',
  },
};

/**
 * 번역 여섯 언어의 섹션 문구.
 *
 * hubNotice와 footNote는 의료 면책이라 언어마다 문장을 다시 썼다 — 나라마다
 * "의사에게 가라"에 해당하는 말이 다르고(clinician·médico·Arzt·医師),
 * 직역하면 안내문이 아니라 번역문처럼 읽힌다.
 */
export const BODY_META_INTL: Partial<Record<FormulaLang, SectionMeta>> = {
  es: {
    section: 'Medidas del cuerpo',
    hubTitle: 'Calculadoras de medidas corporales',
    hubLead: 'Cien números del cuerpo: IMC, metabolismo basal, zonas de pulso, marcadores de tensión',
    hubNotice: '🩺 Solo como referencia: el diagnóstico y el tratamiento los decide tu médico.',
    footNote: 'Estas calculadoras ayudan a entender cifras de salud; no sustituyen un diagnóstico ni una receta. Si tienes síntomas, acude a tu médico.',
    metaTitle: 'Calculadora de IMC, metabolismo basal y 98 medidas más',
    metaDesc: 'IMC, peso ideal, porcentaje de grasa, metabolismo basal y TDEE, pulso objetivo, 1RM, ritmo de carrera, presión arterial media, LDL y HOMA-IR: 100 medidas del cuerpo, cada una con la fórmula que hay detrás.',
  },
  'pt-br': {
    section: 'Medidas do corpo',
    hubTitle: 'Calculadoras de medidas corporais',
    hubLead: 'Cem números do corpo: IMC, metabolismo basal, zonas de batimento, marcadores de pressão',
    hubNotice: '🩺 Apenas para referência — diagnóstico e tratamento são decisão do seu médico.',
    footNote: 'Estas calculadoras ajudam a entender números de saúde; não substituem diagnóstico nem receita. Se você tem sintomas, procure um médico.',
    metaTitle: 'Calculadora de IMC, metabolismo basal e mais 98 medidas',
    metaDesc: 'IMC, peso ideal, percentual de gordura, metabolismo basal e TDEE, batimento alvo, 1RM, ritmo de corrida, pressão arterial média, LDL e HOMA-IR: 100 medidas do corpo, cada uma com a fórmula por trás.',
  },
  ja: {
    section: '体の数値',
    hubTitle: '体の数値の計算機',
    hubLead: 'BMI・基礎代謝・心拍ゾーン・血圧指標まで、体で測る数値100種',
    hubNotice: '🩺 参考用の計算です。診断と治療は医師の判断に従ってください。',
    footNote: 'この計算機は健康の数値を理解するための参考であって、診断や処方の代わりにはなりません。症状があるときは医療機関へ。',
    metaTitle: 'BMI・基礎代謝・心拍数の計算機 — 体の数値100種',
    metaDesc: 'BMI、標準体重、体脂肪率、基礎代謝とTDEE、目標心拍数、1RM、ランニングペース、平均動脈圧、LDL、HOMA-IRまで、体で測る数値100種を計算式つきで。',
  },
  de: {
    section: 'Körperwerte',
    hubTitle: 'Rechner für Körperwerte',
    hubLead: 'Hundert Zahlen zum Körper: BMI, Grundumsatz, Herzfrequenzzonen, Blutdruckwerte',
    hubNotice: '🩺 Nur zur Orientierung — Diagnose und Behandlung gehören in ärztliche Hand.',
    footNote: 'Diese Rechner helfen beim Verständnis von Gesundheitswerten; sie ersetzen weder Diagnose noch Verordnung. Bei Beschwerden gehen Sie zur Ärztin oder zum Arzt.',
    metaTitle: 'BMI-, Grundumsatz- und Herzfrequenzrechner — 100 Körperwerte',
    metaDesc: 'BMI, Normalgewicht, Körperfettanteil, Grundumsatz und Gesamtumsatz, Zielpuls, 1RM, Lauftempo, mittlerer arterieller Druck, LDL und HOMA-IR: 100 Körperwerte, jeder mit der Formel dahinter.',
  },
  fr: {
    section: 'Mesures du corps',
    hubTitle: 'Calculateurs de mesures corporelles',
    hubLead: 'Cent chiffres du corps : IMC, métabolisme de base, zones de fréquence cardiaque, marqueurs de tension',
    hubNotice: '🩺 À titre indicatif — le diagnostic et le traitement relèvent de votre médecin.',
    footNote: 'Ces calculateurs aident à comprendre des chiffres de santé ; ils ne remplacent ni un diagnostic ni une prescription. En cas de symptômes, consultez un médecin.',
    metaTitle: 'Calcul IMC, métabolisme de base et 98 autres mesures',
    metaDesc: 'IMC, poids idéal, masse grasse, métabolisme de base et dépense totale, fréquence cardiaque cible, 1RM, allure de course, pression artérielle moyenne, LDL et HOMA-IR : 100 mesures du corps, chacune avec sa formule.',
  },
  hi: {
    section: 'शरीर के आँकड़े',
    hubTitle: 'शरीर के आँकड़ों के कैलकुलेटर',
    hubLead: 'शरीर से नापे जाने वाले सौ आँकड़े — BMI, बेसल चयापचय, हृदय गति क्षेत्र, रक्तचाप संकेतक',
    hubNotice: '🩺 सिर्फ़ जानकारी के लिए — निदान और इलाज का फ़ैसला आपके डॉक्टर का है।',
    footNote: 'ये कैलकुलेटर सेहत के आँकड़े समझने में मदद करते हैं; ये निदान या दवा की जगह नहीं लेते। लक्षण हों तो डॉक्टर को दिखाएँ।',
    metaTitle: 'BMI, बेसल चयापचय और हृदय गति कैलकुलेटर — 100 आँकड़े',
    metaDesc: 'BMI, आदर्श वज़न, शरीर में वसा का प्रतिशत, बेसल चयापचय और TDEE, लक्ष्य हृदय गति, 1RM, दौड़ की रफ़्तार, औसत धमनी दाब, LDL और HOMA-IR — शरीर के 100 आँकड़े, हर एक अपने सूत्र के साथ।',
  },
};

export const BODY_CATEGORY_INTL: Partial<Record<FormulaLang, Record<string, string>>> = {
  es: {
    '체중·체형': 'Peso y forma', '대사·칼로리': 'Metabolismo y calorías', '심장·운동': 'Corazón y ejercicio',
    '아이·성장': 'Niños y crecimiento', '건강 지표': 'Marcadores de salud', '생활 대사': 'Metabolismo diario',
  },
  'pt-br': {
    '체중·체형': 'Peso e forma', '대사·칼로리': 'Metabolismo e calorias', '심장·운동': 'Coração e exercício',
    '아이·성장': 'Crianças e crescimento', '건강 지표': 'Marcadores de saúde', '생활 대사': 'Metabolismo do dia a dia',
  },
  ja: {
    '체중·체형': '体重・体型', '대사·칼로리': '代謝・カロリー', '심장·운동': '心臓・運動',
    '아이·성장': '子ども・成長', '건강 지표': '健康指標', '생활 대사': '生活の代謝',
  },
  de: {
    '체중·체형': 'Gewicht und Form', '대사·칼로리': 'Stoffwechsel und Kalorien', '심장·운동': 'Herz und Sport',
    '아이·성장': 'Kinder und Wachstum', '건강 지표': 'Gesundheitswerte', '생활 대사': 'Alltagsstoffwechsel',
  },
  fr: {
    '체중·체형': 'Poids et silhouette', '대사·칼로리': 'Métabolisme et calories', '심장·운동': 'Cœur et sport',
    '아이·성장': 'Enfants et croissance', '건강 지표': 'Marqueurs de santé', '생활 대사': 'Métabolisme du quotidien',
  },
  hi: {
    '체중·체형': 'वज़न और आकार', '대사·칼로리': 'चयापचय और कैलोरी', '심장·운동': 'हृदय और व्यायाम',
    '아이·성장': 'बच्चे और वृद्धि', '건강 지표': 'सेहत के संकेतक', '생활 대사': 'रोज़मर्रा का चयापचय',
  },
};

/** ko·en에 번역 여섯 언어를 더한 여덟 — body는 전 언어가 열려 있다 */
export const BODY_LANGS: FormulaLang[] = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi'];

export const BODY_SECTION: SectionConfig = {
  key: 'body',
  tools: BODY_TOOLS,
  categories: BODY_CATEGORIES,
  meta: BODY_META,
  categoryLabel: BODY_CATEGORY_LABEL,
  metaIntl: BODY_META_INTL,
  categoryIntl: BODY_CATEGORY_INTL,
  accent: 'rose',
  grad: 'from-rose-500 to-pink-600',
  gradBar: 'from-rose-500 to-pink-600',
  hoverBorder: 'hover:border-rose-300',
  textAccent: 'text-rose-600',
  focusBorder: 'focus:border-rose-400',
  hoverText: 'group-hover:text-rose-700',
  linkHover: 'hover:text-rose-600',
  ogFrom: '#f43f5e',
  ogTo: '#db2777',
};
