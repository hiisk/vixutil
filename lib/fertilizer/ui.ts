/**
 * 비료 시비량 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "성분량과 비료량은 다르다"이다. 질소를 10g 넣으려고
 * 요소를 10g 뿌리면 실제로 들어가는 질소는 4.6g이다. 봉지의 함량으로 **나눠야**
 * 뿌릴 양이 나오고(10 ÷ 0.46 = 21.7), 복합비료라면 그 나눗셈 한 번으로 나머지
 * 두 성분의 양까지 정해진다.
 *
 * ── 무엇을 옮기고 무엇을 안 옮기는가 ─────────────────────────────
 * **비료 이름은 옮긴다.** 요소는 urea·Harnstoff·urée이고, 그 낱말로 검색한다.
 * **성분 기호는 안 옮긴다.** N·P₂O₅·K₂O는 만국 공통 표기라 어느 나라 봉지에도
 * 같은 글자로 적혀 있다. 옮겨 적으면 화면과 봉지가 달라져 되짚을 수가 없다 —
 * 이 섹션이 하는 일이 봉지의 숫자를 받아 나누는 것이므로, 표기가 갈리면 값이 없다.
 *
 * ── 소수점 기호 ────────────────────────────────────────────────
 * es·pt·de·fr는 21,7이라고 쓴다. 자료에서 온 숫자를 문장에 그냥 넣으면 그 네
 * 언어에서만 21.7이 되어 어색해지는데, 화면은 멀쩡해 보여서 아무도 안 잡는다.
 * 그래서 숫자가 문장에 들어가는 자리는 모두 num()·mass()를 지난다. 검사도 같은
 * 함수로 기댓값을 만들므로, 한 자리라도 빼먹으면 그 언어에서 걸린다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import { isCompound, type NutrientKey } from './list.ts';
import { npkOf, type Dose, type FertilizerFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface FertilizerUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  fertilizerLabel: string;
  areaLabel: string;
  contentLabel: string;
  basisLabel: string;
  targetLabel: string;
  doseLabel: string;
  perM2Label: string;
  needLabel: string;
  alongLabel: string;
  elementLabel: string;

  divideTitle: string;
  divideNote: string;
  compoundTitle: string;
  compoundNote: string;
  oxideTitle: string;
  oxideNote: string;
  labelTitle: string;
  labelNote: string;

  tableTitle: string;
  neighbourTitle: string;
  fertilizerRowTitle: string;
  areaRowTitle: string;

  desc: (f: FertilizerFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: FertilizerFacts) => string;
  metaDesc: (f: FertilizerFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: FertilizerFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 봉지에 적히는 표기 — 옮기지 않는다 */
export const SYMBOL: Record<NutrientKey, string> = { n: 'N', p: 'P₂O₅', k: 'K₂O' };

/** 토양검정 성적서가 쓰는 원소 표기 */
export const ELEMENT: Record<NutrientKey, string> = { n: 'N', p: 'P', k: 'K' };

/** 면적 단위 — m²는 어느 언어에서도 그대로 읽힌다 */
export const AREA_UNIT = 'm²';

/**
 * 단일 성분 비료의 이름 — 열 언어.
 *
 * 괄호 안의 약칭(DAP·MAP·TSP·MOP·SOP·MKP)은 옮기지 않는다. 거래에서 그 글자로
 * 부르고 봉지에도 그대로 찍혀 나오는 상표 같은 표기다.
 */
const NAME: Record<string, L<string>> = {
  urea: T('요소', 'Urea', 'Urea', 'Ureia', '尿素', 'Harnstoff', 'Urée', 'यूरिया', '尿素', '尿素'),
  'ammonium-sulfate': T(
    '유안(황산암모늄)', 'Ammonium sulfate', 'Sulfato de amonio', 'Sulfato de amônio', '硫酸アンモニウム',
    'Ammoniumsulfat', 'Sulfate d’ammonium', 'अमोनियम सल्फेट', '硫酸铵', '硫酸銨',
  ),
  'ammonium-nitrate': T(
    '질산암모늄', 'Ammonium nitrate', 'Nitrato de amonio', 'Nitrato de amônio', '硝酸アンモニウム',
    'Ammoniumnitrat', 'Nitrate d’ammonium', 'अमोनियम नाइट्रेट', '硝酸铵', '硝酸銨',
  ),
  'calcium-nitrate': T(
    '질산칼슘', 'Calcium nitrate', 'Nitrato de calcio', 'Nitrato de cálcio', '硝酸カルシウム',
    'Calciumnitrat', 'Nitrate de calcium', 'कैल्शियम नाइट्रेट', '硝酸钙', '硝酸鈣',
  ),
  dap: T(
    '인산이암모늄 DAP', 'Diammonium phosphate DAP', 'Fosfato diamónico DAP', 'Fosfato diamônico DAP',
    'リン酸二アンモニウム DAP', 'Diammoniumphosphat DAP', 'Phosphate diammonique DAP',
    'डाइअमोनियम फॉस्फेट DAP', '磷酸二铵 DAP', '磷酸二銨 DAP',
  ),
  map: T(
    '인산일암모늄 MAP', 'Monoammonium phosphate MAP', 'Fosfato monoamónico MAP', 'Fosfato monoamônico MAP',
    'リン酸一アンモニウム MAP', 'Monoammoniumphosphat MAP', 'Phosphate monoammonique MAP',
    'मोनोअमोनियम फॉस्फेट MAP', '磷酸一铵 MAP', '磷酸一銨 MAP',
  ),
  tsp: T(
    '중과인산석회 TSP', 'Triple superphosphate TSP', 'Superfosfato triple TSP', 'Superfosfato triplo TSP',
    '重過リン酸石灰 TSP', 'Triplesuperphosphat TSP', 'Superphosphate triple TSP',
    'ट्रिपल सुपरफॉस्फेट TSP', '重过磷酸钙 TSP', '重過磷酸鈣 TSP',
  ),
  'potassium-chloride': T(
    '염화칼륨 MOP', 'Potassium chloride MOP', 'Cloruro de potasio MOP', 'Cloreto de potássio MOP',
    '塩化カリウム MOP', 'Kaliumchlorid MOP', 'Chlorure de potassium MOP',
    'पोटैशियम क्लोराइड MOP', '氯化钾 MOP', '氯化鉀 MOP',
  ),
  'potassium-sulfate': T(
    '황산칼륨 SOP', 'Potassium sulfate SOP', 'Sulfato de potasio SOP', 'Sulfato de potássio SOP',
    '硫酸カリウム SOP', 'Kaliumsulfat SOP', 'Sulfate de potassium SOP',
    'पोटैशियम सल्फेट SOP', '硫酸钾 SOP', '硫酸鉀 SOP',
  ),
  'potassium-nitrate': T(
    '질산칼륨', 'Potassium nitrate', 'Nitrato de potasio', 'Nitrato de potássio', '硝酸カリウム',
    'Kaliumnitrat', 'Nitrate de potassium', 'पोटैशियम नाइट्रेट', '硝酸钾', '硝酸鉀',
  ),
  mkp: T(
    '제1인산칼륨 MKP', 'Monopotassium phosphate MKP', 'Fosfato monopotásico MKP', 'Fosfato monopotássico MKP',
    'リン酸二水素カリウム MKP', 'Monokaliumphosphat MKP', 'Phosphate monopotassique MKP',
    'मोनोपोटैशियम फॉस्फेट MKP', '磷酸二氢钾 MKP', '磷酸二氫鉀 MKP',
  ),
};

/**
 * 복합비료는 낱말 하나에 세 숫자를 붙여 만든다.
 *
 * 21-17-17·17-21-17·20-20-20·10-10-10을 이름째로 네 벌씩 적으면 마흔 줄이
 * 되는데, 그 마흔 줄이 담는 정보는 낱말 하나와 자료에 이미 있는 숫자다.
 * 숫자를 자료에서 가져오면 함량을 고칠 때 이름이 따라 고쳐진다 — 손으로 적으면
 * 20-20-20이라고 적힌 봉지에서 10%가 나오는 일이 조용히 생긴다.
 */
const COMPOUND: L<string> = T(
  '복합비료', 'Compound NPK', 'Abono compuesto NPK', 'Adubo composto NPK', '複合肥料',
  'NPK-Dünger', 'Engrais NPK', 'मिश्रित NPK उर्वरक', '复合肥', '複合肥',
);

/** 비료 이름 — 복합비료는 낱말 + 봉지의 세 숫자다 */
export const fertilizerName = (key: string, lang: Lang, npk?: string): string => {
  if (isCompound(key)) return `${COMPOUND[lang]} ${npk ?? key.slice(4)}`;
  return NAME[key]?.[lang] ?? key;
};

/** 낱장 제목이 쓰는 이름 — 함량 표시가 자료에서 온다 */
export const labelOf = (f: FertilizerFacts, lang: Lang): string => fertilizerName(f.fert.key, lang, npkOf(f.fert));

/** 소수점에 쉼표를 쓰는 언어 */
const COMMA: ReadonlySet<Lang> = new Set<Lang>(['es', 'pt', 'de', 'fr']);

/** 숫자 하나를 그 언어의 표기로 */
export const num = (lang: Lang, x: number): string => (COMMA.has(lang) ? String(x).replace('.', ',') : String(x));

/** 무게 — 1000g부터는 kg으로 적는다. 봉지가 kg으로 팔리기 때문이다 */
export const mass = (lang: Lang, grams: number): string =>
  grams >= 1000
    ? `${num(lang, Math.round(grams / 10) / 100)} kg`
    : `${num(lang, Math.round(grams * 10) / 10)} g`;

/**
 * 언어 하나에 매인 도우미 묶음.
 *
 * 문장마다 lang을 다시 적지 않게 한다. 베껴 쓰다 한 칸에 남의 언어 도우미가
 * 남으면 그 언어의 이름이나 소수점 기호가 섞여 검사가 그 자리를 짚는다 —
 * 튜플은 칸이 채워졌는지만 보므로, 값을 세는 쪽은 이 도우미밖에 없다.
 */
const of = (lang: Lang) => ({
  /** 숫자 */
  n: (x: number) => num(lang, x),
  /** 무게 */
  m: (g: number) => mass(lang, g),
  /** 비료 이름 */
  f: (x: FertilizerFacts) => fertilizerName(x.fert.key, lang, npkOf(x.fert)),
  /** 함께 들어가는 성분들 — 'P₂O₅ 809.5 g, K₂O 809.5 g' */
  a: (d: Dose) => d.along.map(x => `${SYMBOL[x.key]} ${mass(lang, x.grams)}`).join(', '),
});

const KO = of('ko'), EN = of('en'), ES = of('es'), PT = of('pt'), JA = of('ja');
const DE = of('de'), FR = of('fr'), HI = of('hi'), ZH = of('zh'), TW = of('tw');

type Spec = { [K in keyof FertilizerUI]: L<FertilizerUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('비료 시비량', 'Fertilizer amount', 'Dosis de abono', 'Dose de adubo', '施肥量', 'Düngermenge', 'Dose d’engrais', 'उर्वरक मात्रा', '施肥量', '施肥量'),

  hubTitle: T(
    '비료 135칸 — N 10 g/m²에 요소는 21.74 g/m²',
    '135 fertilizer cases — 10 g/m² of N needs 21.74 g/m² of urea',
    '135 casos de abono — 10 g/m² de N piden 21,74 g/m² de urea',
    '135 casos de adubo — 10 g/m² de N pedem 21,74 g/m² de ureia',
    '施肥量135マス — N 10 g/m²には尿素21.74 g/m²',
    '135 Düngerfälle — 10 g/m² N brauchen 21,74 g/m² Harnstoff',
    '135 cas d’engrais — 10 g/m² de N demandent 21,74 g/m² d’urée',
    'उर्वरक के 135 खाने — N 10 g/m² के लिए यूरिया 21.74 g/m²',
    '施肥量 135 格 — N 10 g/m² 要用尿素 21.74 g/m²',
    '施肥量 135 格 — N 10 g/m² 要用尿素 21.74 g/m²',
  ),

  hubLead: T(
    '비료 15가지와 밭 면적 9가지가 만나는 칸마다 뿌릴 양을 계산했습니다. 성분량과 비료량은 다릅니다 — 봉지의 함량이 그 둘 사이의 비율을 정하고, 필요한 성분량을 그 함량으로 나눠야 실제로 뿌릴 양이 나옵니다. 복합비료는 한 성분을 맞추는 순간 나머지 둘도 정해집니다.',
    'Every pairing of 15 fertilizers and 9 plot sizes, worked out as the amount to spread. Nutrient and fertilizer are not the same quantity — the analysis on the bag sets the ratio between them, and only dividing the nutrient you need by that content gives the weight to spread. With a compound, matching one nutrient fixes the other two as well.',
    'Cada cruce de 15 abonos y 9 superficies, resuelto como cantidad a esparcir. Nutriente y abono no son la misma cifra: la riqueza del saco fija la proporción entre ambos, y solo dividiendo el nutriente que necesitas entre ese contenido sale el peso a esparcir. En un compuesto, ajustar un nutriente fija también los otros dos.',
    'Cada cruzamento de 15 adubos e 9 áreas, resolvido como quantidade a espalhar. Nutriente e adubo não são a mesma cifra: a garantia do saco fixa a proporção entre os dois, e só dividindo o nutriente necessário por esse teor sai o peso a espalhar. Num composto, acertar um nutriente já fixa os outros dois.',
    '肥料15種と面積9種が交わるマスごとに、まく量を計算しました。成分量とまく量は別の数です — 袋の成分含有率が両者の比を決め、必要な成分量をその含有率で割ってはじめてまく量になります。複合肥料では、ひとつの成分を合わせた瞬間に残り二つも決まります。',
    'Jede Paarung aus 15 Düngern und 9 Flächen, ausgerechnet als Streumenge. Nährstoff und Dünger sind nicht dieselbe Zahl — der Gehalt auf dem Sack legt das Verhältnis fest, und erst der benötigte Nährstoff geteilt durch diesen Gehalt ergibt die Streumenge. Bei einem Volldünger legt ein angepasster Nährstoff die beiden anderen mit fest.',
    'Chaque croisement de 15 engrais et 9 surfaces, résolu en quantité à épandre. Le nutriment et l’engrais ne sont pas le même nombre : la teneur inscrite sur le sac fixe le rapport entre les deux, et seul le nutriment nécessaire divisé par cette teneur donne la quantité à épandre. Avec un engrais composé, régler un nutriment fixe aussi les deux autres.',
    '15 उर्वरकों और 9 क्षेत्रफलों के हर जोड़ पर, कितना डालना है यह निकाला गया है। पोषक तत्व की मात्रा और उर्वरक की मात्रा एक ही संख्या नहीं हैं — बोरी पर लिखा अंश दोनों का अनुपात तय करता है, और ज़रूरी पोषक मात्रा को उसी अंश से भाग देने पर ही डालने का वज़न मिलता है। मिश्रित उर्वरक में एक तत्व मिलाते ही बाकी दो भी तय हो जाते हैं।',
    '15 种肥料与 9 种面积相交的每一格，都算出了要撒多少。成分量和肥料量是两个数 — 袋子上的含量决定两者的比，把需要的成分量除以这个含量才是要撒的重量。用复合肥时，把一种成分对准，另外两种也就跟着定了。',
    '15 種肥料與 9 種面積相交的每一格，都算出了要撒多少。成分量和肥料量是兩個數 — 袋子上的含量決定兩者的比，把需要的成分量除以這個含量才是要撒的重量。用複合肥時，把一種成分對準，另外兩種也就跟著定了。',
  ),

  fertilizerLabel: T('비료', 'Fertilizer', 'Abono', 'Adubo', '肥料', 'Dünger', 'Engrais', 'उर्वरक', '肥料', '肥料'),
  areaLabel: T('면적', 'Area', 'Superficie', 'Área', '面積', 'Fläche', 'Surface', 'क्षेत्रफल', '面积', '面積'),
  contentLabel: T('함량', 'Content', 'Riqueza', 'Teor', '含有率', 'Gehalt', 'Teneur', 'अंश', '含量', '含量'),
  basisLabel: T('기준 성분', 'Nutrient matched', 'Nutriente ajustado', 'Nutriente acertado', '基準成分', 'Leitnährstoff', 'Nutriment de référence', 'आधार तत्व', '基准成分', '基準成分'),
  targetLabel: T('목표 시비량', 'Target rate', 'Dosis objetivo', 'Dose alvo', '目標施肥量', 'Zielgabe', 'Dose visée', 'लक्ष्य मात्रा', '目标施肥量', '目標施肥量'),
  doseLabel: T('뿌릴 비료량', 'Fertilizer to spread', 'Abono a esparcir', 'Adubo a espalhar', 'まく肥料量', 'Streumenge', 'Engrais à épandre', 'डालने का उर्वरक', '要撒的肥料量', '要撒的肥料量'),
  perM2Label: T('m²당', 'Per m²', 'Por m²', 'Por m²', 'm²あたり', 'Je m²', 'Par m²', 'प्रति m²', '每 m²', '每 m²'),
  needLabel: T('필요 성분량', 'Nutrient needed', 'Nutriente necesario', 'Nutriente necessário', '必要成分量', 'Nährstoffbedarf', 'Nutriment nécessaire', 'ज़रूरी पोषक मात्रा', '需要的成分量', '需要的成分量'),
  alongLabel: T('함께 들어가는 성분', 'Comes along with it', 'Entra de paso', 'Entra de carona', '一緒に入る成分', 'Kommt mit', 'Apporté en même temps', 'साथ में जाने वाले तत्व', '一并带入的成分', '一併帶入的成分'),
  elementLabel: T('원소 표기', 'As the element', 'Como elemento', 'Como elemento', '元素表記', 'Als Element', 'En élément', 'तत्व रूप में', '元素表示', '元素表示'),

  divideTitle: T('함량으로 나눈다, 곱하지 않는다', 'Divide by the content, never multiply', 'Se divide por la riqueza, no se multiplica', 'Divide-se pelo teor, não se multiplica', '含有率で割る、掛けない', 'Durch den Gehalt teilen, nicht multiplizieren', 'On divise par la teneur, on ne multiplie pas', 'अंश से भाग दें, गुणा नहीं', '除以含量，不是乘', '除以含量，不是乘'),
  divideNote: T(
    '요소는 질소가 46%뿐입니다. 그러니 질소를 10 g 넣으려면 요소를 10 ÷ 0.46 = 21.74 g 뿌려야 합니다. 여기서 곱하면 4.6 g이 나오는데, 그 숫자도 그럴듯한 자리에 앉기 때문에 틀린 줄 모르고 넘어갑니다. 함량이 100%보다 작으면 뿌릴 비료는 성분보다 늘 많습니다 — 방향을 헷갈렸는지 확인하는 가장 빠른 길입니다.',
    'Urea is only 46% nitrogen, so putting 10 g of N down means spreading 10 ÷ 0.46 = 21.74 g of urea. Multiply instead and you get 4.6 g, a number that looks plausible enough to pass unnoticed. Whenever the content is below 100%, the fertilizer weight is always larger than the nutrient weight — that is the fastest check that you have the division the right way round.',
    'La urea solo tiene 46% de nitrógeno, así que poner 10 g de N exige esparcir 10 ÷ 0,46 = 21,74 g de urea. Si multiplicas salen 4,6 g, una cifra bastante verosímil para pasar inadvertida. Cuando la riqueza es menor que 100%, el peso de abono siempre supera el de nutriente: es la comprobación más rápida de que la división va en el sentido correcto.',
    'A ureia tem só 46% de nitrogênio, então colocar 10 g de N exige espalhar 10 ÷ 0,46 = 21,74 g de ureia. Multiplicando dá 4,6 g, número verossímil o bastante para passar batido. Quando o teor é menor que 100%, o peso de adubo é sempre maior que o de nutriente: é a checagem mais rápida de que a divisão está no sentido certo.',
    '尿素の窒素は46%しかありません。だから窒素を10 g入れるには尿素を10 ÷ 0.46 = 21.74 gまく必要があります。ここで掛けると4.6 gになり、その数もそれらしい位に収まるので誤りに気づかず通ります。含有率が100%より小さいなら、まく肥料は必ず成分より多くなります — 割る向きを間違えていないか確かめる一番早い道です。',
    'Harnstoff enthält nur 46% Stickstoff. Für 10 g N muss man also 10 ÷ 0,46 = 21,74 g Harnstoff streuen. Multipliziert kommen 4,6 g heraus — eine Zahl, die plausibel genug aussieht, um unbemerkt durchzugehen. Liegt der Gehalt unter 100%, ist die Düngermenge immer größer als die Nährstoffmenge; das ist die schnellste Prüfung, ob die Division richtig herum steht.',
    'L’urée ne contient que 46% d’azote : pour apporter 10 g de N il faut donc épandre 10 ÷ 0,46 = 21,74 g d’urée. En multipliant on obtient 4,6 g, un nombre assez vraisemblable pour passer inaperçu. Dès que la teneur est inférieure à 100%, la masse d’engrais dépasse toujours celle du nutriment — c’est la vérification la plus rapide du sens de la division.',
    'यूरिया में नाइट्रोजन केवल 46% है, इसलिए 10 g N देने के लिए यूरिया 10 ÷ 0.46 = 21.74 g डालना पड़ता है। गुणा कर दें तो 4.6 g आता है, और वह संख्या भी इतनी संभाव्य लगती है कि ग़लती पकड़ में नहीं आती। अंश 100% से कम हो तो उर्वरक का वज़न पोषक तत्व से हमेशा ज़्यादा रहता है — भाग की दिशा जाँचने का यही सबसे तेज़ तरीक़ा है।',
    '尿素里的氮只有 46%，所以要施入 10 g 氮，就得撒尿素 10 ÷ 0.46 = 21.74 g。这里改成乘会得到 4.6 g，而这个数看着也挺像样，错了都不容易发觉。只要含量小于 100%，要撒的肥料就一定比成分多 — 这是检查除法方向有没有搞反的最快办法。',
    '尿素裡的氮只有 46%，所以要施入 10 g 氮，就得撒尿素 10 ÷ 0.46 = 21.74 g。這裡改成乘會得到 4.6 g，而這個數看著也挺像樣，錯了都不容易發覺。只要含量小於 100%，要撒的肥料就一定比成分多 — 這是檢查除法方向有沒有搞反的最快辦法。',
  ),

  compoundTitle: T('복합비료는 하나를 맞추면 둘이 따라온다', 'With a compound, one match fixes the other two', 'En un compuesto, ajustar uno fija los otros dos', 'Num composto, acertar um fixa os outros dois', '複合肥料はひとつ合わせると二つ従う', 'Beim Volldünger legt einer die anderen zwei fest', 'Avec un composé, régler l’un fixe les deux autres', 'मिश्रित में एक मिलाने से बाकी दो तय', '复合肥对准一种，另外两种跟着定', '複合肥對準一種，另外兩種跟著定'),
  compoundNote: T(
    '21-17-17로 질소를 m²당 10 g 맞추면 비료는 47.62 g/m²가 되고, 그 47.62 g에는 P₂O₅ 8.1 g과 K₂O 8.1 g이 함께 들어갑니다. 고를 수 있는 것이 아닙니다 — 비료량이 정해지는 순간 나머지 둘은 함량 비율대로 끌려옵니다. 그래서 복합비료 한 봉지로 세 성분을 다 목표에 맞추는 일은 대개 안 됩니다. 어느 하나를 맞추고 남거나 모자란 것을 단일 비료로 메우는 것이 순서입니다.',
    'Matching 10 g/m² of N with a 21-17-17 puts the fertilizer at 47.62 g/m², and those 47.62 g carry 8.1 g of P₂O₅ and 8.1 g of K₂O with them. You do not get to choose: once the fertilizer weight is fixed, the other two are dragged along in proportion to their content. That is why one compound bag rarely hits all three targets. The order of work is to match one, then top up or accept the surplus with straight fertilizers.',
    'Ajustar 10 g/m² de N con un 21-17-17 deja el abono en 47,62 g/m², y esos 47,62 g arrastran 8,1 g de P₂O₅ y 8,1 g de K₂O. No se elige: en cuanto queda fijado el peso de abono, los otros dos entran en proporción a su riqueza. Por eso un solo saco compuesto casi nunca acierta los tres objetivos. El orden es ajustar uno y completar o asumir el excedente con abonos simples.',
    'Acertar 10 g/m² de N com um 21-17-17 deixa o adubo em 47,62 g/m², e esses 47,62 g levam 8,1 g de P₂O₅ e 8,1 g de K₂O. Não há escolha: fixado o peso de adubo, os outros dois vêm na proporção do teor. Por isso um saco composto quase nunca acerta os três alvos. A ordem é acertar um e completar ou aceitar a sobra com adubos simples.',
    '21-17-17で窒素をm²あたり10 gに合わせると肥料は47.62 g/m²になり、その47.62 gにはP₂O₅が8.1 g、K₂Oが8.1 g一緒に入ります。選べるものではありません — 肥料量が決まった瞬間、残り二つは含有率の比で引きずられます。だから複合肥料ひと袋で三成分すべてを目標に合わせるのはたいてい無理です。どれかひとつを合わせ、余りや不足を単肥で埋めるのが順序です。',
    'Wer mit einem 21-17-17 auf 10 g/m² N geht, landet bei 47,62 g/m² Dünger — und diese 47,62 g bringen 8,1 g P₂O₅ und 8,1 g K₂O mit. Wählbar ist das nicht: sobald die Düngermenge feststeht, werden die anderen zwei im Verhältnis ihres Gehalts mitgezogen. Darum trifft ein einzelner Volldünger selten alle drei Ziele. Die Reihenfolge lautet: einen treffen, den Rest mit Einzeldüngern auffüllen oder den Überschuss hinnehmen.',
    'Régler 10 g/m² de N avec un 21-17-17 amène l’engrais à 47,62 g/m², et ces 47,62 g emportent 8,1 g de P₂O₅ et 8,1 g de K₂O. Cela ne se choisit pas : dès que la masse d’engrais est fixée, les deux autres suivent au prorata de leur teneur. Voilà pourquoi un seul sac composé atteint rarement les trois objectifs. L’ordre est de régler l’un, puis de compléter ou d’accepter l’excédent avec des engrais simples.',
    '21-17-17 से N को प्रति m² 10 g पर मिलाएँ तो उर्वरक 47.62 g/m² हो जाता है, और उन 47.62 g के साथ P₂O₅ 8.1 g और K₂O 8.1 g भी चले जाते हैं। यह चुनने की बात नहीं है — उर्वरक का वज़न तय होते ही बाकी दो अपने अंश के अनुपात में खिंच आते हैं। इसीलिए एक मिश्रित बोरी से तीनों लक्ष्य पूरे करना आमतौर पर नहीं होता। क्रम यही है: किसी एक को मिलाएँ, और कमी या अधिकता को एकल उर्वरक से सँभालें।',
    '用 21-17-17 把 N 对到每 m² 10 g，肥料就是 47.62 g/m²，而这 47.62 g 会顺带带入 P₂O₅ 8.1 g 和 K₂O 8.1 g。这不是能挑的 — 肥料量一定下来，另外两种就按含量的比被拽着进去。所以一袋复合肥很少能把三种成分同时对准。次序是先对准一种，再用单一肥料补足或接受多出来的那部分。',
    '用 21-17-17 把 N 對到每 m² 10 g，肥料就是 47.62 g/m²，而這 47.62 g 會順帶帶入 P₂O₅ 8.1 g 和 K₂O 8.1 g。這不是能挑的 — 肥料量一定下來，另外兩種就按含量的比被拽著進去。所以一袋複合肥很少能把三種成分同時對準。次序是先對準一種，再用單一肥料補足或接受多出來的那部分。',
  ),

  oxideTitle: T('P₂O₅와 P는 같은 인이 아니다', 'P₂O₅ and P are not the same number', 'P₂O₅ y P no son la misma cifra', 'P₂O₅ e P não são a mesma cifra', 'P₂O₅とPは同じ数ではない', 'P₂O₅ und P sind nicht dieselbe Zahl', 'P₂O₅ et P ne sont pas le même nombre', 'P₂O₅ और P एक ही संख्या नहीं', 'P₂O₅ 和 P 不是同一个数', 'P₂O₅ 和 P 不是同一個數'),
  oxideNote: T(
    '봉지의 두 번째·세 번째 숫자는 원소가 아니라 산화물 무게입니다(P₂O₅·K₂O). 토양검정 성적서나 문헌은 원소(P·K)로 적는 곳도 있어, 같은 밭을 두고 숫자가 두 배 넘게 달라 보입니다. 계수는 분자량 비율이라 정해져 있습니다 — P = P₂O₅ × 0.436, K = K₂O × 0.830입니다. 질소는 봉지도 원소로 적어 바꿀 것이 없습니다. 어느 표기로 적힌 목표인지 먼저 확인하지 않으면, 나눗셈이 맞아도 답은 두 배 틀립니다.',
    'The second and third numbers on the bag are oxide weights, not elements: P₂O₅ and K₂O. Soil reports and some references use the elements P and K instead, so the same field can show figures that differ by more than a factor of two. The factors are fixed molecular-weight ratios — P = P₂O₅ × 0.436 and K = K₂O × 0.830. Nitrogen is already stated as the element, so nothing changes there. Check which notation your target is written in first: with the wrong one, the division is right and the answer is still twice off.',
    'El segundo y el tercer número del saco son pesos de óxido, no elementos: P₂O₅ y K₂O. Los análisis de suelo y parte de la bibliografía usan los elementos P y K, así que el mismo terreno puede mostrar cifras que difieren más del doble. Los factores son razones de masa molecular fijas: P = P₂O₅ × 0,436 y K = K₂O × 0,830. El nitrógeno ya va como elemento y no cambia. Comprueba primero en qué notación está tu objetivo: con la equivocada, la división es correcta y la respuesta sigue estando al doble.',
    'O segundo e o terceiro número do saco são pesos de óxido, não elementos: P₂O₅ e K₂O. Análises de solo e parte da literatura usam os elementos P e K, então o mesmo terreno pode mostrar cifras que diferem em mais do dobro. Os fatores são razões de massa molecular fixas: P = P₂O₅ × 0,436 e K = K₂O × 0,830. O nitrogênio já vem como elemento e não muda. Verifique primeiro em que notação está seu alvo: na errada, a divisão está certa e a resposta continua ao dobro.',
    '袋の二番目・三番目の数字は元素ではなく酸化物の重さです(P₂O₅・K₂O)。土壌診断書や文献は元素(P・K)で書く場所もあり、同じ畑なのに数字が二倍以上違って見えます。係数は分子量の比なので決まっています — P = P₂O₅ × 0.436、K = K₂O × 0.830です。窒素は袋も元素で書くので変えるものがありません。目標がどちらの表記かを先に確かめないと、割り算が合っていても答えは二倍ずれます。',
    'Die zweite und dritte Zahl auf dem Sack sind Oxidgewichte, keine Elemente: P₂O₅ und K₂O. Bodenanalysen und Teile der Literatur rechnen dagegen in den Elementen P und K, sodass dasselbe Feld Zahlen zeigt, die um mehr als das Doppelte auseinanderliegen. Die Faktoren sind feste Molmassenverhältnisse — P = P₂O₅ × 0,436 und K = K₂O × 0,830. Stickstoff steht schon als Element da und bleibt unverändert. Prüfen Sie zuerst, in welcher Schreibweise Ihr Ziel steht: in der falschen stimmt die Division und die Antwort ist trotzdem doppelt daneben.',
    'Les deuxième et troisième nombres du sac sont des masses d’oxyde, pas des éléments : P₂O₅ et K₂O. Les analyses de sol et une partie de la littérature utilisent les éléments P et K, si bien que la même parcelle affiche des chiffres qui diffèrent de plus du double. Les facteurs sont des rapports de masse molaire fixes — P = P₂O₅ × 0,436 et K = K₂O × 0,830. L’azote est déjà donné en élément et ne change pas. Vérifiez d’abord dans quelle notation votre objectif est écrit : dans la mauvaise, la division est juste et la réponse reste fausse du double.',
    'बोरी पर दूसरा और तीसरा अंक तत्व नहीं, ऑक्साइड का वज़न है — P₂O₅ और K₂O। मिट्टी जाँच की रिपोर्ट और कुछ पुस्तकें तत्व (P·K) में लिखती हैं, इसलिए एक ही खेत के आँकड़े दुगुने से भी ज़्यादा अलग दिख सकते हैं। गुणांक अणुभार के अनुपात हैं और तय हैं — P = P₂O₅ × 0.436 और K = K₂O × 0.830। नाइट्रोजन बोरी पर भी तत्व रूप में ही है, वहाँ बदलने को कुछ नहीं। पहले देख लें कि आपका लक्ष्य किस रूप में लिखा है: ग़लत रूप में भाग सही रहेगा और उत्तर फिर भी दुगुना ग़लत होगा।',
    '袋子上第二、第三个数字是氧化物的重量，不是元素：P₂O₅ 和 K₂O。土壤检测报告和一部分文献按元素 P、K 来写，于是同一块地的数字看着能差出两倍多。系数是分子量的比，是定好的 — P = P₂O₅ × 0.436，K = K₂O × 0.830。氮在袋子上本来就按元素写，不用换。先确认你的目标是按哪种写法给的：写法错了，除法再对，答案照样差一倍。',
    '袋子上第二、第三個數字是氧化物的重量，不是元素：P₂O₅ 和 K₂O。土壤檢測報告和一部分文獻按元素 P、K 來寫，於是同一塊地的數字看著能差出兩倍多。係數是分子量的比，是定好的 — P = P₂O₅ × 0.436，K = K₂O × 0.830。氮在袋子上本來就按元素寫，不用換。先確認你的目標是按哪種寫法給的：寫法錯了，除法再對，答案照樣差一倍。',
  ),

  labelTitle: T('함량은 봉지의 세 숫자를 그대로 읽는다', 'Read the content off the bag, not from a table', 'La riqueza se lee en el saco, no en una tabla', 'O teor se lê no saco, não numa tabela', '含有率は袋の三つの数字をそのまま読む', 'Den Gehalt vom Sack lesen, nicht aus einer Tabelle', 'La teneur se lit sur le sac, pas dans un tableau', 'अंश बोरी से पढ़ें, तालिका से नहीं', '含量照着袋子上的三个数字读', '含量照著袋子上的三個數字讀'),
  labelNote: T(
    '이 표에 담은 15가지는 표시 함량이 널리 통용되는 비료입니다 — 요소 46%는 CO(NH₂)₂의 질소 무게 비율이라 어느 나라 봉지에도 같은 숫자로 적혀 있습니다. 반면 계분·퇴비·유기질 비료는 건조와 부숙 정도에 따라 질소가 1%에서 4%까지 몇 배씩 갈리고, 과인산석회는 16%와 20% 표시가 나라마다 다릅니다. 그런 비료는 일부러 표에 넣지 않았습니다. 지어낸 함량은 그럴듯해서 아무도 못 잡기 때문입니다. 봉지의 세 숫자를 읽어 같은 나눗셈에 넣으면 결과는 똑같습니다.',
    'The 15 fertilizers here are the ones whose stated analysis is widely settled — urea at 46% is the nitrogen fraction of CO(NH₂)₂ by weight, printed the same way on bags anywhere. Poultry manure, compost and other organics are different: nitrogen swings from about 1% to 4% with drying and maturity, and single superphosphate is labelled 16% in some markets and 20% in others. Those were deliberately left out, because an invented content looks plausible and nobody catches it. Read the three numbers off your bag and put them through the same division; the arithmetic does not change.',
    'Los 15 abonos de esta tabla son los de riqueza declarada ampliamente asentada: la urea al 46% es la fracción de nitrógeno en peso del CO(NH₂)₂, impresa igual en cualquier saco del mundo. La gallinaza, el compost y los orgánicos son otra cosa: el nitrógeno oscila entre 1% y 4% según secado y madurez, y el superfosfato simple se etiqueta 16% en unos mercados y 20% en otros. Se dejaron fuera a propósito, porque una riqueza inventada resulta verosímil y nadie la detecta. Lee los tres números de tu saco y pásalos por la misma división: la cuenta no cambia.',
    'Os 15 adubos desta tabela são os de garantia amplamente consolidada: a ureia a 46% é a fração de nitrogênio em peso do CO(NH₂)₂, impressa igual em qualquer saco. Cama de aviário, composto e orgânicos em geral são outra história: o nitrogênio varia de cerca de 1% a 4% conforme secagem e maturação, e o superfosfato simples é rotulado 16% em alguns mercados e 20% em outros. Foram deixados de fora de propósito, porque um teor inventado parece plausível e ninguém o pega. Leia os três números do seu saco e passe-os pela mesma divisão: a conta não muda.',
    'この表に入れた15種は、表示含有率が広く定まっている肥料です — 尿素の46%はCO(NH₂)₂の窒素の重量比なので、どの国の袋にも同じ数字で書かれています。一方、鶏ふん・堆肥・有機質肥料は乾燥と熟成の程度で窒素が1%から4%まで何倍も振れ、過リン酸石灰は16%表示と20%表示が国によって違います。そうした肥料はあえて表に入れていません。作った含有率はそれらしく見えて誰にも見つけられないからです。袋の三つの数字を読んで同じ割り算に入れれば、結果は変わりません。',
    'Die 15 Dünger hier sind die mit weithin gefestigter Gehaltsangabe — Harnstoff mit 46% ist der Stickstoffanteil von CO(NH₂)₂ nach Gewicht und steht auf Säcken überall gleich. Hühnermist, Kompost und organische Dünger sind anders: Der Stickstoff schwankt je nach Trocknung und Reife von etwa 1% bis 4%, und Superphosphat wird in manchen Märkten mit 16%, in anderen mit 20% ausgewiesen. Die wurden bewusst weggelassen, denn ein erfundener Gehalt sieht plausibel aus und fällt niemandem auf. Lesen Sie die drei Zahlen von Ihrem Sack und schicken Sie sie durch dieselbe Division; an der Rechnung ändert das nichts.',
    'Les 15 engrais retenus ici sont ceux dont la teneur déclarée est largement stabilisée : l’urée à 46% est la fraction massique d’azote de CO(NH₂)₂, imprimée à l’identique sur les sacs partout. Le fumier de volaille, le compost et les organiques, c’est autre chose : l’azote va d’environ 1% à 4% selon le séchage et la maturité, et le superphosphate simple est étiqueté 16% sur certains marchés et 20% sur d’autres. Ils ont été écartés volontairement, car une teneur inventée paraît vraisemblable et personne ne la repère. Lisez les trois nombres de votre sac et passez-les dans la même division : le calcul ne change pas.',
    'इस तालिका के 15 उर्वरक वे हैं जिनका घोषित अंश व्यापक रूप से तय है — यूरिया का 46% CO(NH₂)₂ में नाइट्रोजन का भार-अंश है और हर देश की बोरी पर वही संख्या छपती है। मुर्गी की खाद, कम्पोस्ट और जैविक उर्वरक अलग हैं: सुखाने और पकने के अनुसार नाइट्रोजन 1% से 4% तक कई गुना बदलता है, और सिंगल सुपरफॉस्फेट कहीं 16% तो कहीं 20% लिखा मिलता है। उन्हें जान-बूझकर छोड़ा गया है, क्योंकि गढ़ा हुआ अंश संभाव्य लगता है और कोई पकड़ता नहीं। अपनी बोरी के तीन अंक पढ़कर उसी भाग में डाल दें; गणित वही रहता है।',
    '这张表里的 15 种，是标示含量已经广泛定下来的肥料 — 尿素的 46% 是 CO(NH₂)₂ 中氮的重量占比，哪国的袋子上都写同一个数。鸡粪、堆肥这类有机肥不一样：随着干燥和腐熟程度，氮从大约 1% 到 4% 能差好几倍；过磷酸钙在有些市场标 16%，有些标 20%。这些是故意没放进表里的，因为编出来的含量看着挺合理，谁也发现不了。把你袋子上的三个数字读出来，放进同一个除法，结果一样。',
    '這張表裡的 15 種，是標示含量已經廣泛定下來的肥料 — 尿素的 46% 是 CO(NH₂)₂ 中氮的重量占比，哪國的袋子上都寫同一個數。雞糞、堆肥這類有機肥不一樣：隨著乾燥和腐熟程度，氮從大約 1% 到 4% 能差好幾倍；過磷酸鈣在有些市場標 16%，有些標 20%。這些是故意沒放進表裡的，因為編出來的含量看著挺合理，誰也發現不了。把你袋子上的三個數字讀出來，放進同一個除法，結果一樣。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के खाने', '相邻组合', '相鄰組合'),
  fertilizerRowTitle: T('같은 비료의 다른 면적', 'Same fertilizer, other areas', 'Mismo abono, otras superficies', 'Mesmo adubo, outras áreas', '同じ肥料の他の面積', 'Gleicher Dünger, andere Flächen', 'Même engrais, autres surfaces', 'वही उर्वरक, दूसरे क्षेत्रफल', '同一肥料的其他面积', '同一肥料的其他面積'),
  areaRowTitle: T('같은 면적의 다른 비료', 'Same area, other fertilizers', 'Misma superficie, otros abonos', 'Mesma área, outros adubos', '同じ面積の他の肥料', 'Gleiche Fläche, andere Dünger', 'Même surface, autres engrais', 'वही क्षेत्रफल, दूसरे उर्वरक', '同一面积的其他肥料', '同一面積的其他肥料'),

  desc: T<(f: FertilizerFacts) => string>(
    f => `${KO.f(f)}로 ${KO.n(f.cell.area)} m²에 ${SYMBOL[f.basis]}를 m²당 ${KO.n(f.main.target)} g 넣으려면 ${KO.m(f.main.grams)}을 뿌립니다 — m²당 ${KO.n(f.main.perM2)} g입니다. 함량이 ${KO.n(f.content)}%라 필요 성분량 ${KO.m(f.main.need)}을 그것으로 나눈 값입니다.`,
    f => `To put ${EN.n(f.main.target)} g/m² of ${SYMBOL[f.basis]} on ${EN.n(f.cell.area)} m² with ${EN.f(f)}, spread ${EN.m(f.main.grams)} — that is ${EN.n(f.main.perM2)} g per m². At ${EN.n(f.content)}% content it is simply the ${EN.m(f.main.need)} of nutrient you need divided by that figure.`,
    f => `Para poner ${ES.n(f.main.target)} g/m² de ${SYMBOL[f.basis]} en ${ES.n(f.cell.area)} m² con ${ES.f(f)}, esparce ${ES.m(f.main.grams)}, o sea ${ES.n(f.main.perM2)} g por m². Con una riqueza del ${ES.n(f.content)}% es el nutriente que necesitas, ${ES.m(f.main.need)}, dividido entre esa cifra.`,
    f => `Para colocar ${PT.n(f.main.target)} g/m² de ${SYMBOL[f.basis]} em ${PT.n(f.cell.area)} m² com ${PT.f(f)}, espalhe ${PT.m(f.main.grams)}, ou seja ${PT.n(f.main.perM2)} g por m². Com teor de ${PT.n(f.content)}% é o nutriente necessário, ${PT.m(f.main.need)}, dividido por essa cifra.`,
    f => `${JA.f(f)}で${JA.n(f.cell.area)} m²に${SYMBOL[f.basis]}をm²あたり${JA.n(f.main.target)} g入れるには、${JA.m(f.main.grams)}をまきます — m²あたり${JA.n(f.main.perM2)} gです。含有率が${JA.n(f.content)}%なので、必要成分量${JA.m(f.main.need)}をそれで割った値です。`,
    f => `Für ${DE.n(f.main.target)} g/m² ${SYMBOL[f.basis]} auf ${DE.n(f.cell.area)} m² mit ${DE.f(f)} streuen Sie ${DE.m(f.main.grams)} — das sind ${DE.n(f.main.perM2)} g je m². Bei ${DE.n(f.content)}% Gehalt ist es einfach der Bedarf von ${DE.m(f.main.need)}, geteilt durch diesen Wert.`,
    f => `Pour apporter ${FR.n(f.main.target)} g/m² de ${SYMBOL[f.basis]} sur ${FR.n(f.cell.area)} m² avec ${FR.f(f)}, épandez ${FR.m(f.main.grams)}, soit ${FR.n(f.main.perM2)} g par m². À ${FR.n(f.content)}% de teneur, c’est le besoin de ${FR.m(f.main.need)} divisé par ce chiffre.`,
    f => `${HI.f(f)} से ${HI.n(f.cell.area)} m² पर ${SYMBOL[f.basis]} प्रति m² ${HI.n(f.main.target)} g देने के लिए ${HI.m(f.main.grams)} डालें — यानी प्रति m² ${HI.n(f.main.perM2)} g। अंश ${HI.n(f.content)}% है, इसलिए ज़रूरी ${HI.m(f.main.need)} पोषक मात्रा को उसी से भाग दिया गया है।`,
    f => `用${ZH.f(f)}在 ${ZH.n(f.cell.area)} m² 上把 ${SYMBOL[f.basis]} 施到每 m² ${ZH.n(f.main.target)} g，要撒 ${ZH.m(f.main.grams)} — 每 m² ${ZH.n(f.main.perM2)} g。含量是 ${ZH.n(f.content)}%，所以就是把需要的 ${ZH.m(f.main.need)} 成分量除以它。`,
    f => `用${TW.f(f)}在 ${TW.n(f.cell.area)} m² 上把 ${SYMBOL[f.basis]} 施到每 m² ${TW.n(f.main.target)} g，要撒 ${TW.m(f.main.grams)} — 每 m² ${TW.n(f.main.perM2)} g。含量是 ${TW.n(f.content)}%，所以就是把需要的 ${TW.m(f.main.need)} 成分量除以它。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '뿌릴 비료량 = 필요 성분량 ÷ (함량 ÷ 100)입니다. 나누는 것이지 곱하는 것이 아닙니다.',
      '필요 성분량 = 면적 × 목표 시비량이라, 면적이 두 배면 비료량도 두 배입니다.',
      '함량이 절반인 비료는 같은 성분을 넣는 데 두 배가 듭니다 — 반비례입니다.',
      '복합비료는 한 성분을 맞추면 나머지 둘이 함량 비율대로 따라 들어갑니다.',
    ],
    [
      'Fertilizer to spread = nutrient needed ÷ (content ÷ 100). It is a division, never a multiplication.',
      'Nutrient needed = area × target rate, so twice the area means twice the fertilizer.',
      'A fertilizer with half the content takes twice as much for the same nutrient — inverse proportion.',
      'With a compound, matching one nutrient drags the other two in at their content ratio.',
    ],
    [
      'Abono a esparcir = nutriente necesario ÷ (riqueza ÷ 100). Es una división, nunca una multiplicación.',
      'Nutriente necesario = superficie × dosis objetivo, así que el doble de superficie es el doble de abono.',
      'Un abono con la mitad de riqueza exige el doble para el mismo nutriente: proporción inversa.',
      'En un compuesto, ajustar un nutriente arrastra los otros dos en proporción a su riqueza.',
    ],
    [
      'Adubo a espalhar = nutriente necessário ÷ (teor ÷ 100). É uma divisão, nunca uma multiplicação.',
      'Nutriente necessário = área × dose alvo, então o dobro da área é o dobro do adubo.',
      'Um adubo com metade do teor exige o dobro para o mesmo nutriente: proporção inversa.',
      'Num composto, acertar um nutriente arrasta os outros dois na proporção do teor.',
    ],
    [
      'まく肥料量 = 必要成分量 ÷ (含有率 ÷ 100)です。割るのであって掛けるのではありません。',
      '必要成分量 = 面積 × 目標施肥量なので、面積が二倍なら肥料量も二倍です。',
      '含有率が半分の肥料は、同じ成分を入れるのに二倍かかります — 反比例です。',
      '複合肥料はひとつの成分を合わせると、残り二つが含有率の比で一緒に入ります。',
    ],
    [
      'Streumenge = Nährstoffbedarf ÷ (Gehalt ÷ 100). Es wird geteilt, nie multipliziert.',
      'Nährstoffbedarf = Fläche × Zielgabe, doppelte Fläche heißt also doppelte Düngermenge.',
      'Ein Dünger mit halbem Gehalt braucht für denselben Nährstoff das Doppelte — umgekehrt proportional.',
      'Beim Volldünger zieht ein angepasster Nährstoff die anderen zwei im Gehaltsverhältnis mit.',
    ],
    [
      'Engrais à épandre = nutriment nécessaire ÷ (teneur ÷ 100). C’est une division, jamais une multiplication.',
      'Nutriment nécessaire = surface × dose visée : deux fois la surface, deux fois l’engrais.',
      'Un engrais deux fois moins riche demande deux fois plus pour le même nutriment — proportion inverse.',
      'Avec un composé, régler un nutriment entraîne les deux autres au prorata de leur teneur.',
    ],
    [
      'डालने का उर्वरक = ज़रूरी पोषक मात्रा ÷ (अंश ÷ 100)। यह भाग है, गुणा कभी नहीं।',
      'ज़रूरी पोषक मात्रा = क्षेत्रफल × लक्ष्य मात्रा, इसलिए क्षेत्रफल दुगुना तो उर्वरक भी दुगुना।',
      'आधे अंश वाले उर्वरक से वही पोषक तत्व देने में दुगुना लगता है — व्युत्क्रम अनुपात।',
      'मिश्रित उर्वरक में एक तत्व मिलाने पर बाकी दो अपने अंश के अनुपात में साथ चले जाते हैं।',
    ],
    [
      '要撒的肥料量 = 需要的成分量 ÷（含量 ÷ 100）。是除，绝不是乘。',
      '需要的成分量 = 面积 × 目标施肥量，所以面积翻倍，肥料量也翻倍。',
      '含量只有一半的肥料，施同样的成分要用两倍 — 成反比。',
      '复合肥里对准一种成分，另外两种就按含量的比一并带入。',
    ],
    [
      '要撒的肥料量 = 需要的成分量 ÷（含量 ÷ 100）。是除，絕不是乘。',
      '需要的成分量 = 面積 × 目標施肥量，所以面積翻倍，肥料量也翻倍。',
      '含量只有一半的肥料，施同樣的成分要用兩倍 — 成反比。',
      '複合肥裡對準一種成分，另外兩種就按含量的比一併帶入。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '비료 시비량표 135칸 — 성분량으로 뿌릴 양 구하기',
    'Fertilizer rate chart — turn a nutrient target into the weight to spread',
    'Tabla de dosis de abono — del nutriente objetivo al peso a esparcir',
    'Tabela de dose de adubo — do nutriente alvo ao peso a espalhar',
    '施肥量表135マス — 成分量からまく量を出す',
    'Düngermengen-Tabelle — vom Nährstoffziel zur Streumenge',
    'Table des doses d’engrais — du nutriment visé à la quantité à épandre',
    'उर्वरक मात्रा तालिका — पोषक लक्ष्य से डालने का वज़न',
    '施肥量表 135 格 — 从成分量求出要撒多少',
    '施肥量表 135 格 — 從成分量求出要撒多少',
  ),
  hubMetaDesc: T(
    '비료 15가지와 면적 9가지가 만나는 135칸. N-P-K 함량으로 나눠 뿌릴 양을 구하고, 복합비료에서 한 성분을 맞췄을 때 나머지 둘이 얼마 들어가는지, P₂O₅↔P·K₂O↔K 환산까지 함께 봅니다.',
    'The 135 pairings of 15 fertilizers and 9 plot sizes: divide by the N-P-K content to get the weight to spread, see what the other two nutrients add up to when you match one on a compound, and convert between P₂O₅ and P, K₂O and K.',
    'Los 135 cruces de 15 abonos y 9 superficies: divide por la riqueza N-P-K para el peso a esparcir, mira cuánto entran los otros dos nutrientes al ajustar uno en un compuesto y convierte entre P₂O₅ y P, K₂O y K.',
    'Os 135 cruzamentos de 15 adubos e 9 áreas: divida pelo teor N-P-K para o peso a espalhar, veja quanto entram os outros dois nutrientes ao acertar um num composto e converta entre P₂O₅ e P, K₂O e K.',
    '肥料15種と面積9種が交わる135マス。N-P-Kの含有率で割ってまく量を出し、複合肥料でひとつの成分を合わせたときに残り二つがどれだけ入るか、P₂O₅↔P・K₂O↔Kの換算まで。',
    'Die 135 Paarungen aus 15 Düngern und 9 Flächen: durch den N-P-K-Gehalt teilen für die Streumenge, sehen, wie viel die anderen zwei Nährstoffe beim Volldünger mitbringen, und zwischen P₂O₅ und P, K₂O und K umrechnen.',
    'Les 135 croisements de 15 engrais et 9 surfaces : diviser par la teneur N-P-K pour la quantité à épandre, voir ce qu’apportent les deux autres nutriments quand on en règle un sur un composé, et convertir entre P₂O₅ et P, K₂O et K.',
    '15 उर्वरकों और 9 क्षेत्रफलों के 135 जोड़: N-P-K अंश से भाग देकर डालने का वज़न, मिश्रित उर्वरक में एक तत्व मिलाने पर बाकी दो कितने जाते हैं, और P₂O₅↔P, K₂O↔K का रूपांतरण।',
    '15 种肥料与 9 种面积组成的 135 格：按 N-P-K 含量相除求出要撒的重量，看复合肥对准一种成分时另外两种带入多少，还有 P₂O₅↔P、K₂O↔K 的换算。',
    '15 種肥料與 9 種面積組成的 135 格：按 N-P-K 含量相除求出要撒的重量，看複合肥對準一種成分時另外兩種帶入多少，還有 P₂O₅↔P、K₂O↔K 的換算。',
  ),

  metaTitle: T<(f: FertilizerFacts) => string>(
    f => `${KO.f(f)} ${KO.n(f.cell.area)} m² — ${SYMBOL[f.basis]} ${KO.n(f.main.target)} g/m²에 ${KO.m(f.main.grams)}`,
    f => `${EN.f(f)} on ${EN.n(f.cell.area)} m² — ${EN.m(f.main.grams)} for ${EN.n(f.main.target)} g/m² of ${SYMBOL[f.basis]}`,
    f => `${ES.f(f)} en ${ES.n(f.cell.area)} m² — ${ES.m(f.main.grams)} para ${ES.n(f.main.target)} g/m² de ${SYMBOL[f.basis]}`,
    f => `${PT.f(f)} em ${PT.n(f.cell.area)} m² — ${PT.m(f.main.grams)} para ${PT.n(f.main.target)} g/m² de ${SYMBOL[f.basis]}`,
    f => `${JA.f(f)} ${JA.n(f.cell.area)} m² — ${SYMBOL[f.basis]} ${JA.n(f.main.target)} g/m²で${JA.m(f.main.grams)}`,
    f => `${DE.f(f)} auf ${DE.n(f.cell.area)} m² — ${DE.m(f.main.grams)} für ${DE.n(f.main.target)} g/m² ${SYMBOL[f.basis]}`,
    f => `${FR.f(f)} sur ${FR.n(f.cell.area)} m² — ${FR.m(f.main.grams)} pour ${FR.n(f.main.target)} g/m² de ${SYMBOL[f.basis]}`,
    f => `${HI.f(f)} — ${HI.n(f.cell.area)} m² पर ${SYMBOL[f.basis]} ${HI.n(f.main.target)} g/m² के लिए ${HI.m(f.main.grams)}`,
    f => `${ZH.f(f)} ${ZH.n(f.cell.area)} m² — ${SYMBOL[f.basis]} ${ZH.n(f.main.target)} g/m² 要撒 ${ZH.m(f.main.grams)}`,
    f => `${TW.f(f)} ${TW.n(f.cell.area)} m² — ${SYMBOL[f.basis]} ${TW.n(f.main.target)} g/m² 要撒 ${TW.m(f.main.grams)}`,
  ),

  metaDesc: T<(f: FertilizerFacts) => string>(
    f => `${KO.f(f)}의 ${SYMBOL[f.basis]} 함량은 ${KO.n(f.content)}%입니다. ${KO.n(f.cell.area)} m²에 ${SYMBOL[f.basis]}를 m²당 ${KO.n(f.main.target)} g 넣으려면 필요 성분량 ${KO.m(f.main.need)}을 함량으로 나눠 ${KO.m(f.main.grams)}, m²당 ${KO.n(f.main.perM2)} g을 뿌립니다. 목표 ${KO.n(f.doses[0].target)}·${KO.n(f.doses[f.doses.length - 1].target)} g/m²의 값과 함께 들어가는 성분도 함께 봅니다.`,
    f => `${EN.f(f)} carries ${EN.n(f.content)}% ${SYMBOL[f.basis]}. For ${EN.n(f.main.target)} g/m² of ${SYMBOL[f.basis]} over ${EN.n(f.cell.area)} m², the ${EN.m(f.main.need)} of nutrient needed divided by that content gives ${EN.m(f.main.grams)}, or ${EN.n(f.main.perM2)} g per m². Rates of ${EN.n(f.doses[0].target)} and ${EN.n(f.doses[f.doses.length - 1].target)} g/m² and the nutrients that come along are shown too.`,
    f => `${ES.f(f)} tiene ${ES.n(f.content)}% de ${SYMBOL[f.basis]}. Para ${ES.n(f.main.target)} g/m² de ${SYMBOL[f.basis]} en ${ES.n(f.cell.area)} m², el nutriente necesario ${ES.m(f.main.need)} dividido entre esa riqueza da ${ES.m(f.main.grams)}, o ${ES.n(f.main.perM2)} g por m². También se muestran las dosis de ${ES.n(f.doses[0].target)} y ${ES.n(f.doses[f.doses.length - 1].target)} g/m² y los nutrientes que entran de paso.`,
    f => `${PT.f(f)} tem ${PT.n(f.content)}% de ${SYMBOL[f.basis]}. Para ${PT.n(f.main.target)} g/m² de ${SYMBOL[f.basis]} em ${PT.n(f.cell.area)} m², o nutriente necessário ${PT.m(f.main.need)} dividido por esse teor dá ${PT.m(f.main.grams)}, ou ${PT.n(f.main.perM2)} g por m². Também aparecem as doses de ${PT.n(f.doses[0].target)} e ${PT.n(f.doses[f.doses.length - 1].target)} g/m² e os nutrientes que entram de carona.`,
    f => `${JA.f(f)}の${SYMBOL[f.basis]}含有率は${JA.n(f.content)}%です。${JA.n(f.cell.area)} m²に${SYMBOL[f.basis]}をm²あたり${JA.n(f.main.target)} g入れるには、必要成分量${JA.m(f.main.need)}を含有率で割って${JA.m(f.main.grams)}、m²あたり${JA.n(f.main.perM2)} gをまきます。目標${JA.n(f.doses[0].target)}・${JA.n(f.doses[f.doses.length - 1].target)} g/m²の値と一緒に入る成分も示します。`,
    f => `${DE.f(f)} enthält ${DE.n(f.content)}% ${SYMBOL[f.basis]}. Für ${DE.n(f.main.target)} g/m² ${SYMBOL[f.basis]} auf ${DE.n(f.cell.area)} m² ergibt der Bedarf von ${DE.m(f.main.need)} geteilt durch diesen Gehalt ${DE.m(f.main.grams)}, also ${DE.n(f.main.perM2)} g je m². Auch die Gaben ${DE.n(f.doses[0].target)} und ${DE.n(f.doses[f.doses.length - 1].target)} g/m² und die mitgelieferten Nährstoffe stehen dabei.`,
    f => `${FR.f(f)} contient ${FR.n(f.content)}% de ${SYMBOL[f.basis]}. Pour ${FR.n(f.main.target)} g/m² de ${SYMBOL[f.basis]} sur ${FR.n(f.cell.area)} m², le besoin de ${FR.m(f.main.need)} divisé par cette teneur donne ${FR.m(f.main.grams)}, soit ${FR.n(f.main.perM2)} g par m². Les doses de ${FR.n(f.doses[0].target)} et ${FR.n(f.doses[f.doses.length - 1].target)} g/m² et les nutriments apportés au passage sont aussi indiqués.`,
    f => `${HI.f(f)} में ${SYMBOL[f.basis]} का अंश ${HI.n(f.content)}% है। ${HI.n(f.cell.area)} m² पर ${SYMBOL[f.basis]} प्रति m² ${HI.n(f.main.target)} g देने के लिए ज़रूरी ${HI.m(f.main.need)} को अंश से भाग देने पर ${HI.m(f.main.grams)}, यानी प्रति m² ${HI.n(f.main.perM2)} g। ${HI.n(f.doses[0].target)} और ${HI.n(f.doses[f.doses.length - 1].target)} g/m² की मात्राएँ तथा साथ जाने वाले तत्व भी दिए हैं।`,
    f => `${ZH.f(f)} 的 ${SYMBOL[f.basis]} 含量为 ${ZH.n(f.content)}%。在 ${ZH.n(f.cell.area)} m² 上把 ${SYMBOL[f.basis]} 施到每 m² ${ZH.n(f.main.target)} g，需要的 ${ZH.m(f.main.need)} 成分量除以含量得 ${ZH.m(f.main.grams)}，即每 m² ${ZH.n(f.main.perM2)} g。同时给出 ${ZH.n(f.doses[0].target)} 与 ${ZH.n(f.doses[f.doses.length - 1].target)} g/m² 的数值以及一并带入的成分。`,
    f => `${TW.f(f)} 的 ${SYMBOL[f.basis]} 含量為 ${TW.n(f.content)}%。在 ${TW.n(f.cell.area)} m² 上把 ${SYMBOL[f.basis]} 施到每 m² ${TW.n(f.main.target)} g，需要的 ${TW.m(f.main.need)} 成分量除以含量得 ${TW.m(f.main.grams)}，即每 m² ${TW.n(f.main.perM2)} g。同時給出 ${TW.n(f.doses[0].target)} 與 ${TW.n(f.doses[f.doses.length - 1].target)} g/m² 的數值以及一併帶入的成分。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '질소 10g을 넣으려면 요소를 몇 그램 뿌리나요?', a: '21.74g입니다. 요소의 질소 함량이 46%이므로 10 ÷ 0.46으로 나눕니다. 요소 10g을 뿌리면 실제로 들어가는 질소는 4.6g뿐입니다 — 성분량과 비료량을 같은 숫자로 보는 것이 가장 흔한 실수입니다.' },
      { q: '봉지의 두 번째 숫자는 P인가요, P₂O₅인가요?', a: 'P₂O₅입니다. 세 번째도 K가 아니라 K₂O입니다. 토양검정 성적서가 원소로 적혀 있으면 P = P₂O₅ × 0.436, K = K₂O × 0.830으로 옮겨야 같은 자리에서 견줄 수 있습니다. 질소만 양쪽이 같은 표기입니다.' },
      { q: '목표 시비량은 얼마로 잡아야 하나요?', a: '이 표가 정해 줄 수 있는 값이 아닙니다. 작물과 토양검정 결과가 정하고, 같은 작물도 앞 작물이 남긴 양에 따라 달라집니다. 이 표가 하는 일은 그렇게 정해진 목표를 받아 봉지의 함량으로 나눠 뿌릴 양으로 옮기는 것입니다.' },
    ],
    [
      { q: 'How much urea puts down 10 g of nitrogen?', a: '21.74 g. Urea is 46% nitrogen, so you divide: 10 ÷ 0.46. Spread 10 g of urea and only 4.6 g of nitrogen actually goes in — treating the nutrient weight and the fertilizer weight as one number is the commonest mistake here.' },
      { q: 'Is the second number on the bag P or P₂O₅?', a: 'P₂O₅. The third is K₂O, not K. If your soil report is written in elements, convert with P = P₂O₅ × 0.436 and K = K₂O × 0.830 before comparing. Only nitrogen uses the same notation on both sides.' },
      { q: 'What target rate should I use?', a: 'That is not a number this chart can give you. The crop and the soil test set it, and even the same crop shifts with what the previous one left behind. What this chart does is take that target and divide it by the content on the bag to get the weight to spread.' },
    ],
    [
      { q: '¿Cuánta urea hacen falta para aportar 10 g de nitrógeno?', a: '21,74 g. La urea tiene 46% de nitrógeno, así que se divide: 10 ÷ 0,46. Si esparces 10 g de urea solo entran 4,6 g de nitrógeno; confundir el peso del nutriente con el del abono es el error más común.' },
      { q: '¿El segundo número del saco es P o P₂O₅?', a: 'P₂O₅. El tercero es K₂O, no K. Si tu análisis de suelo va en elementos, convierte con P = P₂O₅ × 0,436 y K = K₂O × 0,830 antes de comparar. Solo el nitrógeno usa la misma notación en ambos lados.' },
      { q: '¿Qué dosis objetivo debo usar?', a: 'Esa cifra no la puede dar esta tabla. La fijan el cultivo y el análisis de suelo, y hasta el mismo cultivo cambia según lo que dejó el anterior. Lo que hace esta tabla es tomar ese objetivo y dividirlo entre la riqueza del saco para dar el peso a esparcir.' },
    ],
    [
      { q: 'Quanta ureia coloca 10 g de nitrogênio?', a: '21,74 g. A ureia tem 46% de nitrogênio, então divide-se: 10 ÷ 0,46. Espalhe 10 g de ureia e entram só 4,6 g de nitrogênio; tratar o peso do nutriente e o do adubo como um só número é o erro mais comum aqui.' },
      { q: 'O segundo número do saco é P ou P₂O₅?', a: 'P₂O₅. O terceiro é K₂O, não K. Se sua análise de solo vem em elementos, converta com P = P₂O₅ × 0,436 e K = K₂O × 0,830 antes de comparar. Só o nitrogênio usa a mesma notação nos dois lados.' },
      { q: 'Que dose alvo devo usar?', a: 'Essa cifra não é algo que esta tabela possa dar. Quem define é a cultura e a análise de solo, e até a mesma cultura muda conforme o que a anterior deixou. O que esta tabela faz é pegar esse alvo e dividir pelo teor do saco para dar o peso a espalhar.' },
    ],
    [
      { q: '窒素10gを入れるには尿素を何グラムまきますか。', a: '21.74gです。尿素の窒素含有率は46%なので10 ÷ 0.46で割ります。尿素を10gまいても実際に入る窒素は4.6gだけです — 成分量とまく量を同じ数と見るのが一番多い誤りです。' },
      { q: '袋の二番目の数字はPですか、P₂O₅ですか。', a: 'P₂O₅です。三番目もKではなくK₂Oです。土壌診断書が元素で書かれているなら、P = P₂O₅ × 0.436、K = K₂O × 0.830で換算してから見比べます。窒素だけは両方が同じ表記です。' },
      { q: '目標施肥量はどう決めますか。', a: 'この表が決められる値ではありません。作物と土壌診断の結果が決めるもので、同じ作物でも前作が残した量で変わります。この表がするのは、そうして決まった目標を受け取り、袋の含有率で割ってまく量に移すことです。' },
    ],
    [
      { q: 'Wie viel Harnstoff bringt 10 g Stickstoff aus?', a: '21,74 g. Harnstoff hat 46% Stickstoff, also wird geteilt: 10 ÷ 0,46. Streut man 10 g Harnstoff, gehen nur 4,6 g Stickstoff hinein — Nährstoffgewicht und Düngergewicht für eine Zahl zu halten ist hier der häufigste Fehler.' },
      { q: 'Ist die zweite Zahl auf dem Sack P oder P₂O₅?', a: 'P₂O₅. Die dritte ist K₂O, nicht K. Steht Ihre Bodenanalyse in Elementen, rechnen Sie vor dem Vergleich mit P = P₂O₅ × 0,436 und K = K₂O × 0,830 um. Nur Stickstoff nutzt auf beiden Seiten dieselbe Schreibweise.' },
      { q: 'Welche Zielgabe soll ich nehmen?', a: 'Diese Zahl kann die Tabelle nicht liefern. Kultur und Bodenanalyse legen sie fest, und selbst dieselbe Kultur verschiebt sich mit dem, was die vorige zurückließ. Die Tabelle nimmt dieses Ziel und teilt es durch den Gehalt auf dem Sack, um die Streumenge zu geben.' },
    ],
    [
      { q: 'Combien d’urée pour apporter 10 g d’azote ?', a: '21,74 g. L’urée titre 46% d’azote, on divise donc : 10 ÷ 0,46. Épandez 10 g d’urée et il n’entre que 4,6 g d’azote ; confondre la masse du nutriment et celle de l’engrais est l’erreur la plus fréquente ici.' },
      { q: 'Le deuxième nombre du sac, c’est P ou P₂O₅ ?', a: 'P₂O₅. Le troisième est K₂O, pas K. Si votre analyse de sol est en éléments, convertissez avec P = P₂O₅ × 0,436 et K = K₂O × 0,830 avant de comparer. Seul l’azote emploie la même notation des deux côtés.' },
      { q: 'Quelle dose visée faut-il retenir ?', a: 'Ce chiffre, cette table ne peut pas le donner. La culture et l’analyse de sol le fixent, et la même culture varie selon ce que la précédente a laissé. Ce que fait cette table, c’est prendre cet objectif et le diviser par la teneur du sac pour donner la quantité à épandre.' },
    ],
    [
      { q: '10 g नाइट्रोजन देने के लिए कितना यूरिया डालें?', a: '21.74 g। यूरिया में नाइट्रोजन 46% है, इसलिए भाग देते हैं: 10 ÷ 0.46। 10 g यूरिया डालें तो असल में सिर्फ़ 4.6 g नाइट्रोजन जाता है — पोषक वज़न और उर्वरक वज़न को एक ही संख्या मान लेना यहाँ की सबसे आम भूल है।' },
      { q: 'बोरी पर दूसरा अंक P है या P₂O₅?', a: 'P₂O₅। तीसरा भी K नहीं, K₂O है। आपकी मिट्टी जाँच रिपोर्ट तत्व में हो तो तुलना से पहले P = P₂O₅ × 0.436 और K = K₂O × 0.830 से बदल लें। सिर्फ़ नाइट्रोजन दोनों तरफ़ एक ही रूप में लिखा जाता है।' },
      { q: 'लक्ष्य मात्रा कितनी रखें?', a: 'यह संख्या यह तालिका नहीं दे सकती। इसे फ़सल और मिट्टी जाँच तय करते हैं, और वही फ़सल भी पिछली फ़सल के छोड़े अंश से बदल जाती है। यह तालिका उस तय लक्ष्य को लेकर बोरी के अंश से भाग देकर डालने का वज़न निकालती है।' },
    ],
    [
      { q: '要施入 10 g 氮，尿素得撒多少？', a: '21.74 g。尿素的氮含量是 46%，所以做除法：10 ÷ 0.46。撒 10 g 尿素，实际进去的氮只有 4.6 g — 把成分量和肥料量当成同一个数，是这里最常见的错。' },
      { q: '袋子上第二个数字是 P 还是 P₂O₅？', a: '是 P₂O₅。第三个也不是 K，而是 K₂O。如果土壤检测报告按元素写，比较之前先用 P = P₂O₅ × 0.436、K = K₂O × 0.830 换算。只有氮两边写法一致。' },
      { q: '目标施肥量该定多少？', a: '这个数不是这张表能给的。它由作物和土壤检测结果决定，同一种作物也会因为前一茬留下多少而变。这张表做的是接过那个目标，除以袋子上的含量，换成要撒的重量。' },
    ],
    [
      { q: '要施入 10 g 氮，尿素得撒多少？', a: '21.74 g。尿素的氮含量是 46%，所以做除法：10 ÷ 0.46。撒 10 g 尿素，實際進去的氮只有 4.6 g — 把成分量和肥料量當成同一個數，是這裡最常見的錯。' },
      { q: '袋子上第二個數字是 P 還是 P₂O₅？', a: '是 P₂O₅。第三個也不是 K，而是 K₂O。如果土壤檢測報告按元素寫，比較之前先用 P = P₂O₅ × 0.436、K = K₂O × 0.830 換算。只有氮兩邊寫法一致。' },
      { q: '目標施肥量該定多少？', a: '這個數不是這張表能給的。它由作物和土壤檢測結果決定，同一種作物也會因為前一茬留下多少而變。這張表做的是接過那個目標，除以袋子上的含量，換成要撒的重量。' },
    ],
  ),

  cellFaq: T<(f: FertilizerFacts) => FaqItem[]>(
    f => [
      { q: `${KO.f(f)}를 ${KO.n(f.cell.area)} m²에 얼마나 뿌리나요?`, a: `${SYMBOL[f.basis]}를 m²당 ${KO.n(f.main.target)} g 넣는다면 ${KO.m(f.main.grams)}, m²당 ${KO.n(f.main.perM2)} g입니다. 필요 성분량 ${KO.m(f.main.need)}을 함량 ${KO.n(f.content)}%로 나눈 값입니다.` },
      { q: '목표를 두 배로 올리면 비료도 두 배인가요?', a: `그렇습니다. 목표와 비료량은 정비례입니다 — m²당 ${KO.n(f.doses[0].target)} g이면 ${KO.m(f.doses[0].grams)}, ${KO.n(f.doses[f.doses.length - 1].target)} g이면 ${KO.m(f.doses[f.doses.length - 1].grams)}입니다. 면적도 같아서, 면적이 두 배면 비료량도 두 배입니다.` },
      { q: '함께 들어가는 다른 성분은 얼마인가요?', a: f.main.along.length
        ? `${SYMBOL[f.basis]}를 목표에 맞추면 ${KO.a(f.main)}이 함께 들어갑니다. 고를 수 있는 것이 아니라 함량 비율대로 끌려오는 양입니다.`
        : `${KO.f(f)}는 ${SYMBOL[f.basis]} 하나만 든 비료라 함께 들어가는 성분이 없습니다. 나머지 성분은 다른 비료로 따로 채웁니다.` },
    ],
    f => [
      { q: `How much ${EN.f(f)} goes on ${EN.n(f.cell.area)} m²?`, a: `At ${EN.n(f.main.target)} g/m² of ${SYMBOL[f.basis]}, ${EN.m(f.main.grams)} — that is ${EN.n(f.main.perM2)} g per m². It is the ${EN.m(f.main.need)} of nutrient needed divided by the ${EN.n(f.content)}% content.` },
      { q: 'If I double the target, do I double the fertilizer?', a: `Yes. Target and fertilizer weight are directly proportional — ${EN.n(f.doses[0].target)} g/m² takes ${EN.m(f.doses[0].grams)} and ${EN.n(f.doses[f.doses.length - 1].target)} g/m² takes ${EN.m(f.doses[f.doses.length - 1].grams)}. Area behaves the same way: twice the area, twice the fertilizer.` },
      { q: 'What else goes in along with it?', a: f.main.along.length
        ? `Matching ${SYMBOL[f.basis]} to the target also puts in ${EN.a(f.main)}. That is not a choice — those amounts are dragged in at their content ratio.`
        : `${EN.f(f)} carries only ${SYMBOL[f.basis]}, so nothing else comes along. The other nutrients have to be supplied by separate fertilizers.` },
    ],
    f => [
      { q: `¿Cuánto ${ES.f(f)} lleva ${ES.n(f.cell.area)} m²?`, a: `Con ${ES.n(f.main.target)} g/m² de ${SYMBOL[f.basis]}, ${ES.m(f.main.grams)}, o sea ${ES.n(f.main.perM2)} g por m². Es el nutriente necesario, ${ES.m(f.main.need)}, dividido entre la riqueza del ${ES.n(f.content)}%.` },
      { q: '¿Si duplico la dosis objetivo, duplico el abono?', a: `Sí. Objetivo y peso de abono son directamente proporcionales: ${ES.n(f.doses[0].target)} g/m² pide ${ES.m(f.doses[0].grams)} y ${ES.n(f.doses[f.doses.length - 1].target)} g/m² pide ${ES.m(f.doses[f.doses.length - 1].grams)}. La superficie se comporta igual: el doble de superficie, el doble de abono.` },
      { q: '¿Qué más entra con ello?', a: f.main.along.length
        ? `Ajustar ${SYMBOL[f.basis]} al objetivo mete además ${ES.a(f.main)}. No es una elección: esas cantidades entran arrastradas por su riqueza.`
        : `${ES.f(f)} solo aporta ${SYMBOL[f.basis]}, así que no entra nada más. Los otros nutrientes hay que darlos con abonos aparte.` },
    ],
    f => [
      { q: `Quanto ${PT.f(f)} vai em ${PT.n(f.cell.area)} m²?`, a: `Com ${PT.n(f.main.target)} g/m² de ${SYMBOL[f.basis]}, ${PT.m(f.main.grams)}, ou seja ${PT.n(f.main.perM2)} g por m². É o nutriente necessário, ${PT.m(f.main.need)}, dividido pelo teor de ${PT.n(f.content)}%.` },
      { q: 'Se eu dobrar a dose alvo, dobro o adubo?', a: `Sim. Alvo e peso de adubo são diretamente proporcionais: ${PT.n(f.doses[0].target)} g/m² pede ${PT.m(f.doses[0].grams)} e ${PT.n(f.doses[f.doses.length - 1].target)} g/m² pede ${PT.m(f.doses[f.doses.length - 1].grams)}. A área se comporta igual: o dobro da área, o dobro do adubo.` },
      { q: 'O que mais entra junto?', a: f.main.along.length
        ? `Acertar ${SYMBOL[f.basis]} no alvo coloca também ${PT.a(f.main)}. Não é escolha: essas quantidades vêm arrastadas pelo teor.`
        : `${PT.f(f)} traz só ${SYMBOL[f.basis]}, então nada mais entra. Os outros nutrientes precisam de adubos separados.` },
    ],
    f => [
      { q: `${JA.f(f)}を${JA.n(f.cell.area)} m²にどれだけまきますか。`, a: `${SYMBOL[f.basis]}をm²あたり${JA.n(f.main.target)} g入れるなら${JA.m(f.main.grams)}、m²あたり${JA.n(f.main.perM2)} gです。必要成分量${JA.m(f.main.need)}を含有率${JA.n(f.content)}%で割った値です。` },
      { q: '目標を二倍にすると肥料も二倍ですか。', a: `そうです。目標とまく量は正比例です — m²あたり${JA.n(f.doses[0].target)} gなら${JA.m(f.doses[0].grams)}、${JA.n(f.doses[f.doses.length - 1].target)} gなら${JA.m(f.doses[f.doses.length - 1].grams)}です。面積も同じで、面積が二倍なら肥料量も二倍になります。` },
      { q: '一緒に入る他の成分はどれだけですか。', a: f.main.along.length
        ? `${SYMBOL[f.basis]}を目標に合わせると${JA.a(f.main)}が一緒に入ります。選べるものではなく、含有率の比で引きずられる量です。`
        : `${JA.f(f)}は${SYMBOL[f.basis]}だけの肥料なので、一緒に入る成分はありません。残りの成分は別の肥料で補います。` },
    ],
    f => [
      { q: `Wie viel ${DE.f(f)} kommt auf ${DE.n(f.cell.area)} m²?`, a: `Bei ${DE.n(f.main.target)} g/m² ${SYMBOL[f.basis]} sind es ${DE.m(f.main.grams)} — also ${DE.n(f.main.perM2)} g je m². Es ist der Bedarf von ${DE.m(f.main.need)}, geteilt durch den Gehalt von ${DE.n(f.content)}%.` },
      { q: 'Doppelte Zielgabe, doppelte Düngermenge?', a: `Ja. Ziel und Düngermenge sind direkt proportional — ${DE.n(f.doses[0].target)} g/m² brauchen ${DE.m(f.doses[0].grams)}, ${DE.n(f.doses[f.doses.length - 1].target)} g/m² brauchen ${DE.m(f.doses[f.doses.length - 1].grams)}. Mit der Fläche ist es genauso: doppelte Fläche, doppelte Menge.` },
      { q: 'Was kommt sonst noch mit hinein?', a: f.main.along.length
        ? `Wer ${SYMBOL[f.basis]} auf das Ziel bringt, bringt auch ${DE.a(f.main)} hinein. Wählbar ist das nicht — diese Mengen werden im Gehaltsverhältnis mitgezogen.`
        : `${DE.f(f)} liefert nur ${SYMBOL[f.basis]}, es kommt also nichts mit. Die anderen Nährstoffe müssen aus getrennten Düngern kommen.` },
    ],
    f => [
      { q: `Quelle quantité de ${FR.f(f)} sur ${FR.n(f.cell.area)} m² ?`, a: `À ${FR.n(f.main.target)} g/m² de ${SYMBOL[f.basis]}, ${FR.m(f.main.grams)} — soit ${FR.n(f.main.perM2)} g par m². C’est le besoin de ${FR.m(f.main.need)} divisé par la teneur de ${FR.n(f.content)}%.` },
      { q: 'Si je double la dose visée, je double l’engrais ?', a: `Oui. Dose visée et masse d’engrais sont directement proportionnelles — ${FR.n(f.doses[0].target)} g/m² demandent ${FR.m(f.doses[0].grams)} et ${FR.n(f.doses[f.doses.length - 1].target)} g/m² demandent ${FR.m(f.doses[f.doses.length - 1].grams)}. La surface se comporte pareil : deux fois la surface, deux fois l’engrais.` },
      { q: 'Qu’est-ce qui entre en même temps ?', a: f.main.along.length
        ? `Régler ${SYMBOL[f.basis]} sur l’objectif apporte aussi ${FR.a(f.main)}. Ce n’est pas un choix : ces quantités sont entraînées au prorata de leur teneur.`
        : `${FR.f(f)} n’apporte que ${SYMBOL[f.basis]}, rien n’entre donc en plus. Les autres nutriments doivent venir d’engrais séparés.` },
    ],
    f => [
      { q: `${HI.f(f)} ${HI.n(f.cell.area)} m² पर कितना डालें?`, a: `${SYMBOL[f.basis]} प्रति m² ${HI.n(f.main.target)} g देना हो तो ${HI.m(f.main.grams)}, यानी प्रति m² ${HI.n(f.main.perM2)} g। यह ज़रूरी ${HI.m(f.main.need)} पोषक मात्रा को ${HI.n(f.content)}% अंश से भाग देने पर मिलता है।` },
      { q: 'लक्ष्य दुगुना करें तो उर्वरक भी दुगुना?', a: `हाँ। लक्ष्य और उर्वरक वज़न सीधे अनुपात में हैं — प्रति m² ${HI.n(f.doses[0].target)} g पर ${HI.m(f.doses[0].grams)} और ${HI.n(f.doses[f.doses.length - 1].target)} g पर ${HI.m(f.doses[f.doses.length - 1].grams)}। क्षेत्रफल भी वैसा ही है: क्षेत्रफल दुगुना तो उर्वरक दुगुना।` },
      { q: 'साथ में और क्या जाता है?', a: f.main.along.length
        ? `${SYMBOL[f.basis]} को लक्ष्य पर मिलाने से ${HI.a(f.main)} भी साथ चला जाता है। यह चुनने की बात नहीं — ये मात्राएँ अंश के अनुपात में खिंच आती हैं।`
        : `${HI.f(f)} में केवल ${SYMBOL[f.basis]} है, इसलिए साथ कुछ नहीं जाता। बाकी तत्व अलग उर्वरकों से देने पड़ते हैं।` },
    ],
    f => [
      { q: `${ZH.n(f.cell.area)} m² 要撒多少${ZH.f(f)}？`, a: `${SYMBOL[f.basis]} 按每 m² ${ZH.n(f.main.target)} g 施，就是 ${ZH.m(f.main.grams)}，每 m² ${ZH.n(f.main.perM2)} g。这是把需要的 ${ZH.m(f.main.need)} 成分量除以 ${ZH.n(f.content)}% 含量得来的。` },
      { q: '目标翻倍，肥料也翻倍吗？', a: `是的。目标和肥料量成正比 — 每 m² ${ZH.n(f.doses[0].target)} g 要 ${ZH.m(f.doses[0].grams)}，${ZH.n(f.doses[f.doses.length - 1].target)} g 要 ${ZH.m(f.doses[f.doses.length - 1].grams)}。面积也一样：面积翻倍，肥料翻倍。` },
      { q: '还会一并带进什么成分？', a: f.main.along.length
        ? `把 ${SYMBOL[f.basis]} 对准目标，同时会带入 ${ZH.a(f.main)}。这不是能挑的 — 这些量是按含量的比被拽进去的。`
        : `${ZH.f(f)} 只含 ${SYMBOL[f.basis]}，所以不会带入别的。其余成分要用另外的肥料单独补。` },
    ],
    f => [
      { q: `${TW.n(f.cell.area)} m² 要撒多少${TW.f(f)}？`, a: `${SYMBOL[f.basis]} 按每 m² ${TW.n(f.main.target)} g 施，就是 ${TW.m(f.main.grams)}，每 m² ${TW.n(f.main.perM2)} g。這是把需要的 ${TW.m(f.main.need)} 成分量除以 ${TW.n(f.content)}% 含量得來的。` },
      { q: '目標翻倍，肥料也翻倍嗎？', a: `是的。目標和肥料量成正比 — 每 m² ${TW.n(f.doses[0].target)} g 要 ${TW.m(f.doses[0].grams)}，${TW.n(f.doses[f.doses.length - 1].target)} g 要 ${TW.m(f.doses[f.doses.length - 1].grams)}。面積也一樣：面積翻倍，肥料翻倍。` },
      { q: '還會一併帶進什麼成分？', a: f.main.along.length
        ? `把 ${SYMBOL[f.basis]} 對準目標，同時會帶入 ${TW.a(f.main)}。這不是能挑的 — 這些量是按含量的比被拽進去的。`
        : `${TW.f(f)} 只含 ${SYMBOL[f.basis]}，所以不會帶入別的。其餘成分要用另外的肥料單獨補。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const FERTILIZER_UI: L<FertilizerUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<FertilizerUI>;
