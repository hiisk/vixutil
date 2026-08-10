/** /craft 섹션 설정 */
import { CRAFT_TOOLS, CRAFT_CATEGORIES } from './craft-tools.ts';
import type { Lang, FormulaLang } from './formula/terms.ts';
import type { SectionConfig, SectionMeta } from './formula/section.ts';

export const CRAFT_META = {
  ko: {
    section: '공예',
    hubTitle: '공예 계산기',
    hubLead: '실 소요량·원단 길이·왁스 무게·가성소다까지 손으로 만들 때 필요한 계산 {n}가지',
    hubNotice: '🧶 값을 넣으면 바로 계산되고 공식도 함께 보여줍니다.',
    footNote: '재료마다 밀도와 흡수가 다릅니다. 라벨에 적힌 값이 있으면 그것을 넣으세요 — 기본값은 흔히 쓰이는 값일 뿐입니다.',
    metaTitle: '공예 계산기 — 실·원단·왁스·수지 소요량 {n}종',
    metaDesc:
      '뜨개 실 소요량과 게이지, 원단 길이와 시접, 퀼트 바인딩, 양초 왁스와 향 비율, 비누 가성소다, 에폭시 수지 배합까지 만들기 전에 얼마나 필요한지 계산 {n}가지를 공식과 함께 봅니다.',
  },
  en: {
    section: 'Crafts',
    hubTitle: 'Craft Calculators',
    hubLead: '{n} calculators for making things by hand — yarn, fabric, wax, lye and resin quantities',
    hubNotice: '🧶 Results update as you type, and every page shows the formula.',
    footNote: 'Materials differ in density and absorption. If your label states a figure, use it — the defaults here are only common values.',
    metaTitle: 'Craft Calculators — Yarn, Fabric, Wax & Resin ({n} Tools)',
    metaDesc:
      'Yarn requirements and knitting gauge, fabric yardage and seam allowance, quilt binding, candle wax and fragrance load, soap lye, epoxy resin ratios — {n} craft calculators that tell you how much you need before you start.',
  },
} as const;

export const CRAFT_CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '뜨개': '뜨개', '재봉': '재봉', '퀼트·자수': '퀼트·자수',
    '양초': '양초', '비누·수지': '비누·수지', '구슬·포장': '구슬·포장',
  },
  en: {
    '뜨개': 'Knitting & Crochet', '재봉': 'Sewing', '퀼트·자수': 'Quilting & Stitching',
    '양초': 'Candles', '비누·수지': 'Soap & Resin', '구슬·포장': 'Beads & Wrapping',
  },
};

/**
 * 번역 여덟 언어의 섹션 문구.
 *
 * footNote는 "라벨 값을 넣어라"는 말인데, 이것이 이 섹션에서 가장 중요한 경고다.
 * 왁스 밀도도 SAP 값도 실 길이도 제조사마다 다르고, 기본값을 그대로 쓰면 남의
 * 재료 답이 된다.
 */
export const CRAFT_META_INTL: Partial<Record<FormulaLang, SectionMeta>> = {
  es: {
    section: 'Manualidades',
    hubTitle: 'Calculadoras para manualidades',
    hubLead: '{n} calculadoras para hacer a mano: lana, tela, cera, sosa y resina',
    hubNotice: '🧶 El resultado se actualiza mientras escribes, y cada página muestra la fórmula.',
    footNote: 'Cada material tiene su densidad y su absorción. Si la etiqueta trae un dato, úsalo: los valores por defecto solo son los habituales.',
    metaTitle: 'Calculadoras de manualidades — lana, tela, cera y resina ({n})',
    metaDesc: 'Cuánta lana necesitas y tu muestra de puntos, metros de tela y margen de costura, ribete de patchwork, cera y porcentaje de fragancia, sosa para jabón, mezcla de resina epoxi: {n} calculadoras con sus fórmulas.',
  },
  'pt-br': {
    section: 'Artesanato',
    hubTitle: 'Calculadoras de artesanato',
    hubLead: '{n} calculadoras para fazer à mão: lã, tecido, cera, soda e resina',
    hubNotice: '🧶 O resultado atualiza enquanto você digita, e cada página mostra a fórmula.',
    footNote: 'Cada material tem densidade e absorção próprias. Se a etiqueta traz um número, use ele — os valores padrão aqui são só os mais comuns.',
    metaTitle: 'Calculadoras de artesanato — lã, tecido, cera e resina ({n})',
    metaDesc: 'Quanto de lã você precisa e a amostra de pontos, metragem de tecido e margem de costura, viés de patchwork, cera e porcentagem de essência, soda cáustica para sabão, mistura de resina epóxi: {n} calculadoras com as fórmulas.',
  },
  ja: {
    section: 'ハンドメイド',
    hubTitle: 'ハンドメイドの計算機',
    hubLead: '毛糸の必要量から生地の長さ、ワックスの重さ、苛性ソーダまで、手で作るときの計算{n}種',
    hubNotice: '🧶 入力するとその場で計算され、式も一緒に表示します。',
    footNote: '材料ごとに密度も吸いも違います。ラベルに数値があればそれを入れてください — ここの初期値はよく使われる値にすぎません。',
    metaTitle: 'ハンドメイド計算機 — 毛糸・生地・ワックス・レジン{n}種',
    metaDesc: '毛糸の必要量とゲージ、生地の長さと縫い代、キルトのバインディング、キャンドルのワックス量と香料の割合、石けんの苛性ソーダ、レジンの配合まで、作る前に必要な量がわかる計算{n}種を式つきで。',
  },
  de: {
    section: 'Handarbeit',
    hubTitle: 'Rechner für Handarbeit',
    hubLead: '{n} Rechner fürs Selbermachen — Wolle, Stoff, Wachs, Lauge und Resin',
    hubNotice: '🧶 Das Ergebnis aktualisiert sich beim Tippen, und jede Seite zeigt die Formel.',
    footNote: 'Jedes Material hat seine eigene Dichte und Aufnahme. Steht auf dem Etikett ein Wert, nimm den — die Vorgaben hier sind nur gängige Werte.',
    metaTitle: 'Handarbeits-Rechner — Wolle, Stoff, Wachs und Resin ({n})',
    metaDesc: 'Wollverbrauch und Maschenprobe, Stoffbedarf und Nahtzugabe, Quilt-Einfassung, Wachsmenge und Duftanteil, Natronlauge für Seife, Mischverhältnis für Epoxidharz — {n} Rechner mit Formeln, die vorher sagen, wie viel du brauchst.',
  },
  fr: {
    section: 'Loisirs créatifs',
    hubTitle: 'Calculateurs pour loisirs créatifs',
    hubLead: '{n} calculateurs pour faire soi-même : laine, tissu, cire, soude et résine',
    hubNotice: '🧶 Le résultat se met à jour pendant la saisie, et chaque page montre la formule.',
    footNote: 'Chaque matière a sa densité et son absorption. Si l’étiquette donne une valeur, prends-la : celles par défaut ne sont que des valeurs courantes.',
    metaTitle: 'Calculateurs loisirs créatifs — laine, tissu, cire, résine ({n})',
    metaDesc: 'Quantité de laine et échantillon, métrage de tissu et marge de couture, biais de patchwork, cire et taux de parfum, soude pour le savon, dosage de résine époxy : {n} calculateurs avec leurs formules.',
  },
  hi: {
    section: 'हस्तकला',
    hubTitle: 'हस्तकला के कैलकुलेटर',
    hubLead: 'ऊन, कपड़ा, मोम, सोडा और रेज़िन — हाथ से बनाने के लिए ज़रूरी {n} गणनाएँ',
    hubNotice: '🧶 टाइप करते ही नतीजा बदलता है, और हर पन्ने पर सूत्र भी दिखता है।',
    footNote: 'हर सामग्री का घनत्व और सोख अलग है। लेबल पर आंकड़ा हो तो वही डालिए — यहाँ के डिफ़ॉल्ट सिर्फ़ आम मान हैं।',
    metaTitle: 'हस्तकला कैलकुलेटर — ऊन, कपड़ा, मोम और रेज़िन ({n})',
    metaDesc: 'कितनी ऊन चाहिए और गेज, कपड़े की लंबाई और सीवन भत्ता, क्विल्ट बाइंडिंग, मोमबत्ती का मोम और सुगंध का अनुपात, साबुन के लिए कास्टिक सोडा, एपॉक्सी रेज़िन का मिश्रण — बनाने से पहले मात्रा बताने वाली {n} गणनाएँ, सूत्र के साथ।',
  },
  'zh-hans': {
    section: '手作',
    hubTitle: '手作计算器',
    hubLead: '毛线用量、布料长度、蜡的重量、烧碱——手工制作要算的 {n} 种',
    hubNotice: '🧶 边输入边出结果，每页都附公式。',
    footNote: '每种材料的密度和吸收都不同。标签上有数值就填那个——这里的默认值只是常见值。',
    metaTitle: '手作计算器 — 毛线·布料·蜡·树脂共 {n} 种',
    metaDesc: '毛线用量与编织密度、布料用量与缝份、拼布包边、蜡量与香精比例、手工皂烧碱、环氧树脂配比——动手之前先算清要用多少，{n} 个计算器都附公式。',
  },
  'zh-hant': {
    section: '手作',
    hubTitle: '手作計算機',
    hubLead: '毛線用量、布料長度、蠟的重量、氫氧化鈉——手工製作要算的 {n} 種',
    hubNotice: '🧶 邊輸入邊出結果，每頁都附公式。',
    footNote: '每種材料的密度和吸收都不同。標籤上有數值就填那個——這裡的預設值只是常見值。',
    metaTitle: '手作計算機 — 毛線·布料·蠟·樹脂共 {n} 種',
    metaDesc: '毛線用量與編織密度、布料用量與縫份、拼布包邊、蠟量與香精比例、手工皂鹼量、環氧樹脂配比——動手之前先算清要用多少，{n} 個計算機都附公式。',
  },
};

export const CRAFT_CATEGORY_INTL: Partial<Record<FormulaLang, Record<string, string>>> = {
  es: {
    '뜨개': 'Punto y ganchillo', '재봉': 'Costura', '퀼트·자수': 'Patchwork y bordado',
    '양초': 'Velas', '비누·수지': 'Jabón y resina', '구슬·포장': 'Abalorios y envoltura',
  },
  'pt-br': {
    '뜨개': 'Tricô e crochê', '재봉': 'Costura', '퀼트·자수': 'Patchwork e bordado',
    '양초': 'Velas', '비누·수지': 'Sabão e resina', '구슬·포장': 'Miçangas e embalagem',
  },
  ja: {
    '뜨개': '編み物', '재봉': 'ソーイング', '퀼트·자수': 'キルト・刺しゅう',
    '양초': 'キャンドル', '비누·수지': '石けん・レジン', '구슬·포장': 'ビーズ・ラッピング',
  },
  de: {
    '뜨개': 'Stricken und Häkeln', '재봉': 'Nähen', '퀼트·자수': 'Quilten und Sticken',
    '양초': 'Kerzen', '비누·수지': 'Seife und Resin', '구슬·포장': 'Perlen und Verpacken',
  },
  fr: {
    '뜨개': 'Tricot et crochet', '재봉': 'Couture', '퀼트·자수': 'Patchwork et broderie',
    '양초': 'Bougies', '비누·수지': 'Savon et résine', '구슬·포장': 'Perles et emballage',
  },
  hi: {
    '뜨개': 'बुनाई', '재봉': 'सिलाई', '퀼트·자수': 'क्विल्ट और कढ़ाई',
    '양초': 'मोमबत्ती', '비누·수지': 'साबुन और रेज़िन', '구슬·포장': 'मोती और पैकिंग',
  },
  'zh-hans': {
    '뜨개': '编织', '재봉': '缝纫', '퀼트·자수': '拼布·刺绣',
    '양초': '蜡烛', '비누·수지': '手工皂·树脂', '구슬·포장': '串珠·包装',
  },
  'zh-hant': {
    '뜨개': '編織', '재봉': '縫紉', '퀼트·자수': '拼布·刺繡',
    '양초': '蠟燭', '비누·수지': '手工皂·樹脂', '구슬·포장': '串珠·包裝',
  },
};

/** 공예도 처음부터 열 언어를 연다 */
export const CRAFT_LANGS: FormulaLang[] = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

export const CRAFT_SECTION: SectionConfig = {
  key: 'craft',
  tools: CRAFT_TOOLS,
  categories: CRAFT_CATEGORIES,
  meta: CRAFT_META,
  categoryLabel: CRAFT_CATEGORY_LABEL,
  metaIntl: CRAFT_META_INTL,
  categoryIntl: CRAFT_CATEGORY_INTL,
  accent: 'amber',
  grad: 'from-amber-500 to-rose-500',
  gradBar: 'from-amber-500 to-rose-500',
  hoverBorder: 'hover:border-amber-300',
  textAccent: 'text-amber-600',
  focusBorder: 'focus:border-amber-400',
  hoverText: 'group-hover:text-amber-700',
  linkHover: 'hover:text-amber-600',
  ogFrom: '#f59e0b',
  ogTo: '#f43f5e',
};
