/**
 * /rate 섹션 설정 — 카탈로그·카테고리 이름·색을 한곳에 모은다.
 *
 * 몸 수치(/body)와 도형(/geometry)도 같은 엔진을 쓰므로, 섹션마다 다른 것만
 * 이 파일에 두고 화면 코드는 이 설정을 받아 그린다.
 */
import { RATE_TOOLS, RATE_CATEGORIES } from './rate-tools.ts';
import type { FormulaLang, Lang } from './formula/terms.ts';
import type { SectionConfig, SectionMeta } from './formula/section.ts';

export const RATE_META = {
  ko: {
    section: '비율 계산',
    hubTitle: '비율·환산 계산기',
    hubLead: '할인율·부가세·이자·농도까지 공식 하나로 끝나는 계산 100가지',
    hubNotice: '📐 값을 넣으면 바로 계산됩니다. 계산식도 함께 보여줍니다.',
    footNote: '세율과 이자 계산 방식은 나라와 상품에 따라 다릅니다. 실제 거래는 계약 조건을 확인하세요.',
    metaTitle: '비율 계산기 — 할인율·부가세·이자·농도 100종',
    metaDesc:
      '할인율, 삼중 할인, N+1 실질 할인, 부가세, 관세, 실효세율, 증감률, 퍼센트포인트, 백분위, 복리, 대출 한도, 중도상환, 농도와 희석까지 100가지 비율 계산을 한 곳에서. 계산식·입력 설명·값별 결과 표를 함께 봅니다.',
  },
  en: {
    section: 'Rate Calculators',
    hubTitle: 'Percentage & Rate Calculators',
    hubLead: 'A hundred one-formula calculators — discounts, tax, interest, concentration',
    hubNotice: '📐 Results update as you type, and every page shows the formula.',
    footNote: 'Tax rates and interest conventions differ by country and product — check your contract for real transactions.',
    metaTitle: 'Percentage Calculators — 100 Rate & Ratio Tools',
    metaDesc:
      'Discounts, stacked discounts, buy-one-get-one, VAT, import duty, effective tax rate, percent change, percentage points, percentiles, compound interest, borrowing limits, dilution and blending — 100 rate calculators, each with the formula, an input guide and a reference table.',
  },
} as const;

/** 카테고리 이름의 3언어 — 카탈로그는 한국어 키를 쓰고 화면에서만 갈아 끼운다 */
export const RATE_CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '할인·가격': '할인·가격', '세금·정산': '세금·정산', '비율·증감': '비율·증감',
    '금융·이자': '금융·이자', '농도·배합': '농도·배합', '점수·달성': '점수·달성',
  },
  en: {
    '할인·가격': 'Price & Discount', '세금·정산': 'Tax & Payout', '비율·증감': 'Percentage & Change',
    '금융·이자': 'Interest & Return', '농도·배합': 'Concentration', '점수·달성': 'Scores & Targets',
  },
};


/**
 * 번역 여섯 언어의 섹션 문구.
 *
 * metaTitle·metaDesc는 화면의 제목과 다르게 쓴다 — 사람들이 검색창에 치는 말은
 * "비율 계산"보다 "할인율 계산기"이기 때문이다.
 */
export const RATE_META_INTL: Partial<Record<FormulaLang, SectionMeta>> = {
  es: {
    section: 'Calculadoras de porcentaje',
    hubTitle: 'Calculadoras de porcentajes y proporciones',
    hubLead: 'Cien calculadoras de una sola fórmula: descuentos, impuestos, intereses, concentración',
    hubNotice: '📐 El resultado se actualiza mientras escribes, y cada página muestra la fórmula.',
    footNote: 'Los tipos impositivos y las convenciones de interés cambian según el país y el producto: para una operación real, mira tu contrato.',
    metaTitle: 'Calculadora de porcentajes — 100 herramientas de proporción',
    metaDesc: 'Descuentos, descuentos acumulados, 3x2, IVA, aranceles, tipo efectivo, variación porcentual, puntos porcentuales, percentiles, interés compuesto, capacidad de endeudamiento, diluciones y mezclas: 100 calculadoras, cada una con su fórmula, una guía de los datos y una tabla de referencia.',
  },
  'pt-br': {
    section: 'Calculadoras de porcentagem',
    hubTitle: 'Calculadoras de porcentagem e proporção',
    hubLead: 'Cem calculadoras de uma fórmula só: descontos, impostos, juros, concentração',
    hubNotice: '📐 O resultado atualiza enquanto você digita, e cada página mostra a fórmula.',
    footNote: 'Alíquotas e formas de calcular juros mudam conforme o país e o produto — em uma operação real, confira o contrato.',
    metaTitle: 'Calculadora de porcentagem — 100 ferramentas de proporção',
    metaDesc: 'Descontos, descontos acumulados, leve 3 pague 2, impostos, imposto de importação, alíquota efetiva, variação percentual, pontos percentuais, percentis, juros compostos, limite de crédito, diluição e mistura: 100 calculadoras, cada uma com a fórmula, um guia dos campos e uma tabela de referência.',
  },
  ja: {
    section: '割合の計算',
    hubTitle: '割合・比率の計算機',
    hubLead: '割引・税・利息・濃度まで、公式ひとつで終わる計算100種',
    hubNotice: '📐 値を入れるとすぐ計算します。計算式も一緒に見られます。',
    footNote: '税率と利息の計算方法は国と商品によって違います。実際の取引では契約条件を確かめてください。',
    metaTitle: '割合の計算機 — 割引・税・利息・濃度100種',
    metaDesc: '割引率、重ねがけ割引、2個買うと1個無料、消費税、関税、実効税率、変化率、パーセントポイント、パーセンタイル、複利、借入可能額、繰上返済、濃度と希釈まで100種類の割合計算。計算式・入力の説明・値ごとの結果表も一緒に見られます。',
  },
  de: {
    section: 'Prozentrechner',
    hubTitle: 'Prozent- und Verhältnisrechner',
    hubLead: 'Hundert Rechner mit je einer Formel — Rabatte, Steuern, Zinsen, Konzentration',
    hubNotice: '📐 Das Ergebnis rechnet beim Tippen mit, und jede Seite zeigt die Formel.',
    footNote: 'Steuersätze und Zinskonventionen unterscheiden sich je Land und Produkt — für ein echtes Geschäft gilt dein Vertrag.',
    metaTitle: 'Prozentrechner — 100 Werkzeuge für Anteile und Verhältnisse',
    metaDesc: 'Rabatte, gestapelte Rabatte, 3 für 2, Mehrwertsteuer, Zoll, effektiver Steuersatz, prozentuale Veränderung, Prozentpunkte, Perzentile, Zinseszins, Kreditrahmen, Verdünnen und Mischen — 100 Rechner, jeder mit Formel, Eingabehilfe und Referenztabelle.',
  },
  fr: {
    section: 'Calculatrices de pourcentage',
    hubTitle: 'Calculatrices de pourcentages et de rapports',
    hubLead: 'Cent calculatrices à une seule formule : remises, taxes, intérêts, concentration',
    hubNotice: '📐 Le résultat se met à jour pendant la saisie, et chaque page affiche la formule.',
    footNote: 'Les taux d’imposition et les conventions de calcul des intérêts varient selon le pays et le produit — pour une opération réelle, réfère-toi à ton contrat.',
    metaTitle: 'Calculatrice de pourcentage — 100 outils de rapport',
    metaDesc: 'Remises, remises cumulées, 3 pour 2, TVA, droits de douane, taux effectif, variation en pourcentage, points de pourcentage, centiles, intérêts composés, capacité d’emprunt, dilution et mélange : 100 calculatrices, chacune avec sa formule, un guide de saisie et un tableau de référence.',
  },
  hi: {
    section: 'प्रतिशत कैलकुलेटर',
    hubTitle: 'प्रतिशत और अनुपात के कैलकुलेटर',
    hubLead: 'एक सूत्र में निपटने वाले सौ कैलकुलेटर — छूट, कर, ब्याज, सांद्रता',
    hubNotice: '📐 लिखते ही परिणाम बदलता है, और हर पन्ने पर सूत्र भी दिखता है।',
    footNote: 'कर की दरें और ब्याज गिनने का तरीक़ा देश और उत्पाद के हिसाब से बदलता है — असली लेन-देन में अपना अनुबंध देखें।',
    metaTitle: 'प्रतिशत कैलकुलेटर — अनुपात के 100 औज़ार',
    metaDesc: 'छूट, एक पर एक छूट, तीन पर दो, GST, सीमा शुल्क, असली कर दर, प्रतिशत बदलाव, प्रतिशत अंक, पर्सेंटाइल, चक्रवृद्धि ब्याज, कर्ज़ की सीमा, तनुकरण और मिश्रण — 100 कैलकुलेटर, हर एक के साथ सूत्र, इनपुट की व्याख्या और मान के हिसाब से परिणाम की सारणी।',
  },
'zh-hans': {
    section: '比例计算',
    hubTitle: '百分比与比例计算器',
    hubLead: '折扣、税、利息、浓度，一个公式就能算完的100种',
    hubNotice: '📐 边填边算，每一页都把公式摆出来。',
    footNote: '税率和利息的算法因国家和产品而异。真要办业务时，以合同条款为准。',
    metaTitle: '百分比计算器 — 折扣·税·利息·浓度 100种',
    metaDesc: '折扣率、叠加折扣、买二送一、增值税、关税、实际税率、变化率、百分点、百分位、复利、可贷额度、提前还款、稀释与配比，共100种比例计算。每一种都附公式、填写说明和不同取值的结果表。',
  },
  'zh-hant': {
    section: '比例計算',
    hubTitle: '百分比與比例計算器',
    hubLead: '折扣、稅、利息、濃度，一個公式就能算完的100種',
    hubNotice: '📐 邊填邊算，每一頁都把公式擺出來。',
    footNote: '稅率和利息的算法因國家和產品而異。真要辦業務時，以合約條款為準。',
    metaTitle: '百分比計算器 — 折扣·稅·利息·濃度 100種',
    metaDesc: '折扣率、疊加折扣、買二送一、加值稅、關稅、實際稅率、變化率、百分點、百分位、複利、可貸額度、提前還款、稀釋與配比，共100種比例計算。每一種都附公式、填寫說明和不同取值的結果表。',
  },
};

/** 분류 이름의 번역 — 열쇠는 카탈로그의 한국어 문자열 그대로다 */
export const RATE_CATEGORY_INTL: Partial<Record<FormulaLang, Record<string, string>>> = {
  es: {
    '할인·가격': 'Precio y descuento', '세금·정산': 'Impuestos y liquidación', '비율·증감': 'Porcentaje y variación',
    '금융·이자': 'Interés y rentabilidad', '농도·배합': 'Concentración', '점수·달성': 'Notas y objetivos',
  },
  'pt-br': {
    '할인·가격': 'Preço e desconto', '세금·정산': 'Impostos e repasse', '비율·증감': 'Porcentagem e variação',
    '금융·이자': 'Juros e retorno', '농도·배합': 'Concentração', '점수·달성': 'Notas e metas',
  },
  ja: {
    '할인·가격': '割引・価格', '세금·정산': '税金・精算', '비율·증감': '割合・増減',
    '금융·이자': '金融・利息', '농도·배합': '濃度・配合', '점수·달성': '点数・達成',
  },
  de: {
    '할인·가격': 'Preis und Rabatt', '세금·정산': 'Steuern und Auszahlung', '비율·증감': 'Prozent und Veränderung',
    '금융·이자': 'Zinsen und Rendite', '농도·배합': 'Konzentration', '점수·달성': 'Noten und Ziele',
  },
  fr: {
    '할인·가격': 'Prix et remise', '세금·정산': 'Taxes et versement', '비율·증감': 'Pourcentage et variation',
    '금융·이자': 'Intérêts et rendement', '농도·배합': 'Concentration', '점수·달성': 'Notes et objectifs',
  },
  hi: {
    '할인·가격': 'क़ीमत और छूट', '세금·정산': 'कर और भुगतान', '비율·증감': 'प्रतिशत और बदलाव',
    '금융·이자': 'ब्याज और प्रतिफल', '농도·배합': 'सांद्रता', '점수·달성': 'अंक और लक्ष्य',
  },
'zh-hans': {
    '할인·가격': '折扣·价格', '세금·정산': '税金·结算', '비율·증감': '比例·增减',
    '금융·이자': '金融·利息', '농도·배합': '浓度·配比', '점수·달성': '分数·达标',
  },
  'zh-hant': {
    '할인·가격': '折扣·價格', '세금·정산': '稅金·結算', '비율·증감': '比例·增減',
    '금융·이자': '金融·利息', '농도·배합': '濃度·配比', '점수·달성': '分數·達標',
  },
};

/** 이 섹션이 나가는 언어 — hreflang과 라우트가 같은 목록을 본다 */
export const RATE_LANGS: FormulaLang[] = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

export const RATE_SECTION: SectionConfig = {
  key: 'rate',
  tools: RATE_TOOLS,
  categories: RATE_CATEGORIES,
  meta: RATE_META,
  categoryLabel: RATE_CATEGORY_LABEL,
  metaIntl: RATE_META_INTL,
  categoryIntl: RATE_CATEGORY_INTL,
  accent: 'emerald',
  grad: 'from-emerald-500 to-teal-600',
  gradBar: 'from-emerald-500 to-teal-600',
  hoverBorder: 'hover:border-emerald-300',
  textAccent: 'text-emerald-600',
  focusBorder: 'focus:border-emerald-400',
  hoverText: 'group-hover:text-emerald-700',
  linkHover: 'hover:text-emerald-600',
  ogFrom: '#10b981',
  ogTo: '#0d9488',
};
