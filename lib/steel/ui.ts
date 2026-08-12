/**
 * 강재 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "강재 무게는 표가 아니라 부피 × 밀도다"이다. 형상마다
 * 다른 것은 단면적 식 하나뿐이고, 거기에 밀도 7850kg/m³을 곱하면 단위중량이며,
 * 길이와 개수를 곱하면 총 중량이다. 현장의 계수 셋(두께 × 7.85 · 0.006165 × d² ·
 * 0.00785 × a²)도 그 식을 정리한 값일 뿐이다.
 *
 * ── 형상 이름 말고는 옮겨 적을 낱말이 거의 없다 ──────────
 * 치수 표기(⌀ 20 · 50 × 50 × 2)와 단면적 식(π/4 × d²)은 숫자와 기호뿐이라
 * list.ts가 한 벌만 갖고 열 언어가 그대로 쓴다. 여기서 언어마다 적는 것은
 * 형상 이름 일곱과 설명 문장이다 — 옮겨 적는 자리를 줄이면 어긋날 자리도 줄어든다.
 *
 * ── 소수점 기호 ──────────────────────────────────────────
 * es·pt·de·fr는 소수점에 쉼표를 쓴다(47,1kg/m²). 표와 본문이 어긋나면 같은 값이
 * 한 화면에서 두 얼굴이 되므로, 문장 안의 숫자는 nc()로 갈아 끼우고 화면 컴포넌트는
 * fmtNum()을 쓴다 — 두 곳이 같은 규칙 하나를 본다. 밀도 7850은 자리 구분 기호를
 * 아예 쓰지 않는다(독일어는 자리 구분에 점을 쓰므로, 넣으면 소수점과 헷갈린다).
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { ShapeKey } from './list.ts';
import type { SteelFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface SteelUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  /** 형상 이름 일곱 — 언어마다 적는다 */
  shapeLabel: Record<ShapeKey, string>;

  sizeLabel: string;
  formulaLabel: string;
  areaLabel: string;
  unitLabel: string;
  lengthLabel: string;
  perPieceLabel: string;
  perHundredLabel: string;
  perTonLabel: string;
  perSquareLabel: string;
  sheetAreaLabel: string;
  innerLabel: string;
  solidLabel: string;
  savingLabel: string;

  densityTitle: string;
  densityNote: string;
  formulaTitle: string;
  formulaNote: string;
  hollowTitle: string;
  hollowNote: string;
  excludedTitle: string;
  excludedNote: string;

  tableTitle: string;
  neighbourTitle: string;
  shapeRowTitle: string;
  /** 다른 섹션으로 건너가는 줄의 제목 — /rebar가 이 문구를 같이 쓴다 */
  relatedTitle: string;

  desc: (f: SteelFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: SteelFacts) => string;
  metaDesc: (f: SteelFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: SteelFacts) => FaqItem[];
}

/** 소수점에 쉼표를 쓰는 언어 */
const COMMA_LANGS: ReadonlySet<Lang> = new Set<Lang>(['es', 'pt', 'de', 'fr']);

/** 화면 컴포넌트가 쓰는 자리 — 문장 쪽의 nc()와 같은 규칙이다 */
export const fmtNum = (lang: Lang, x: number): string =>
  COMMA_LANGS.has(lang) ? String(x).replace('.', ',') : String(x);

/** 쉼표 언어의 문장 안에서 쓴다 */
const nc = (x: number): string => String(x).replace('.', ',');

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 형상 이름 일곱을 한 줄에 — 순서는 SHAPES와 같다 */
const S = (
  plate: string, flat: string, square: string, round: string,
  roundTube: string, squareTube: string, rectTube: string,
): Record<ShapeKey, string> => ({
  'plate': plate, 'flat': flat, 'square': square, 'round': round,
  'round-tube': roundTube, 'square-tube': squareTube, 'rect-tube': rectTube,
});

/** 그 언어에서 이 칸을 부르는 이름 — "각관 50 × 50 × 2" */
export const steelName = (f: SteelFacts, lang: Lang): string =>
  `${STEEL_UI[lang].shapeLabel[f.shape]} ${f.size}`;

type Spec = { [K in keyof SteelUI]: L<SteelUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('강재 무게', 'Steel weight', 'Peso del acero', 'Peso do aço', '鋼材の重量', 'Stahlgewicht', 'Poids de l’acier', 'स्टील का वज़न', '钢材重量', '鋼材重量'),

  hubTitle: T(
    '강재 149칸 — 두께 6mm 강판 1m²는 47.1kg',
    '149 steel cells — a 6 mm plate weighs 47.1 kg per m²',
    '149 casillas de acero — una chapa de 6 mm pesa 47,1 kg por m²',
    '149 casas de aço — uma chapa de 6 mm pesa 47,1 kg por m²',
    '鋼材149マス — 厚さ6mmの鋼板は1m²で47.1kg',
    '149 Stahl-Felder — 6 mm Blech wiegt 47,1 kg je m²',
    '149 cases d’acier — une tôle de 6 mm pèse 47,1 kg au m²',
    'स्टील के 149 खाने — 6 mm प्लेट का एक m² 47.1 kg',
    '钢材 149 格 — 厚 6mm 的钢板每平方米 47.1 千克',
    '鋼材 149 格 — 厚 6mm 的鋼板每平方公尺 47.1 公斤',
  ),

  hubLead: T(
    '강판·평철·각재·원형봉·원형관·각관 일곱 형상의 유통 치수마다 무게를 계산했습니다. 표를 외울 일이 아닙니다 — 형상마다 다른 것은 단면적 식 하나뿐이고, 그 단면적에 강의 밀도 7850kg/m³을 곱하면 단위중량이 나오며, 길이와 개수를 곱하면 총 중량이 됩니다.',
    'Every stocked size across seven shapes — plate, flat bar, square bar, round bar, round tube and box section — worked out as kilograms. There is no table to memorise: the only thing that changes with shape is the cross-section formula, multiplying that section by the density of steel, 7850 kg/m³, gives the weight per metre, and length times count gives the total.',
    'Cada medida de mercado en siete formas: chapa, pletina, barra cuadrada, barra redonda, tubo redondo y tubo hueco. No hay tabla que memorizar: lo único que cambia con la forma es la fórmula de la sección, multiplicarla por la densidad del acero, 7850 kg/m³, da el peso por metro, y longitud por cantidad da el total.',
    'Cada medida de mercado em sete formas: chapa, barra chata, barra quadrada, barra redonda, tubo redondo e tubo de seção fechada. Não há tabela para decorar: o que muda com a forma é apenas a fórmula da seção, multiplicá-la pela densidade do aço, 7850 kg/m³, dá o peso por metro, e comprimento vezes quantidade dá o total.',
    '鋼板・平鋼・角鋼・丸鋼・丸パイプ・角パイプの七形状について、流通する寸法ごとに重さを計算しました。表を覚える話ではありません — 形状で変わるのは断面積の式だけで、その断面積に鋼の密度7850kg/m³を掛けると単位質量になり、長さと本数を掛ければ総重量です。',
    'Jedes handelsübliche Maß in sieben Formen: Blech, Flachstahl, Vierkantstahl, Rundstahl, Rundrohr und Hohlprofil. Es gibt keine Tabelle zu lernen — mit der Form ändert sich nur die Formel für den Querschnitt; dieser Querschnitt mal der Dichte von Stahl, 7850 kg/m³, ergibt das Gewicht je Meter, und Länge mal Anzahl ergibt die Gesamtmasse.',
    'Chaque dimension courante pour sept formes : tôle, plat, carré, rond, tube rond et profilé creux. Aucune table à retenir : seule la formule de la section change avec la forme ; cette section multipliée par la densité de l’acier, 7850 kg/m³, donne le poids au mètre, et longueur fois quantité donne le total.',
    'सात आकारों — प्लेट, पट्टी, चौकोर छड़, गोल छड़, गोल पाइप और चौकोर पाइप — के बाज़ार में मिलने वाले हर नाप का वज़न निकाला गया है। कोई तालिका याद करने की ज़रूरत नहीं: आकार के साथ बदलती है सिर्फ़ काट के क्षेत्र की सूत्र, उस क्षेत्र को स्टील के घनत्व 7850 kg/m³ से गुणा करने पर प्रति मीटर वज़न मिलता है, और लंबाई गुणा संख्या से कुल वज़न।',
    '钢板、扁钢、方钢、圆钢、圆管、方管七种形状，按市面上流通的尺寸逐一算出重量。这不是背表的事 — 随形状变的只有截面积的算式，把截面积乘上钢的密度 7850kg/m³ 就是每米重量，再乘长度和根数就是总重。',
    '鋼板、扁鋼、方鋼、圓鋼、圓管、方管七種形狀，按市面上流通的尺寸逐一算出重量。這不是背表的事 — 隨形狀變的只有截面積的算式，把截面積乘上鋼的密度 7850kg/m³ 就是每公尺重量，再乘長度和根數就是總重。',
  ),

  shapeLabel: T<Record<ShapeKey, string>>(
    S('강판', '평철', '각재', '원형봉', '원형관', '각관', '직사각 각관'),
    S('Plate', 'Flat bar', 'Square bar', 'Round bar', 'Round tube', 'Square tube', 'Rectangular tube'),
    S('Chapa', 'Pletina', 'Barra cuadrada', 'Barra redonda', 'Tubo redondo', 'Tubo cuadrado', 'Tubo rectangular'),
    S('Chapa grossa', 'Barra chata', 'Barra quadrada', 'Barra redonda', 'Tubo redondo', 'Tubo quadrado', 'Tubo retangular'),
    S('鋼板', '平鋼', '角鋼', '丸鋼', '丸パイプ', '角パイプ', '長方形パイプ'),
    S('Blech', 'Flachstahl', 'Vierkantstahl', 'Rundstahl', 'Rundrohr', 'Quadratrohr', 'Rechteckrohr'),
    S('Tôle', 'Plat', 'Carré', 'Rond', 'Tube rond', 'Tube carré', 'Tube rectangulaire'),
    S('प्लेट', 'पट्टी', 'चौकोर छड़', 'गोल छड़', 'गोल पाइप', 'चौकोर पाइप', 'आयताकार पाइप'),
    S('钢板', '扁钢', '方钢', '圆钢', '圆管', '方管', '矩形管'),
    S('鋼板', '扁鋼', '方鋼', '圓鋼', '圓管', '方管', '矩形管'),
  ),

  sizeLabel: T('치수', 'Size', 'Medida', 'Medida', '寸法', 'Maß', 'Dimension', 'नाप', '尺寸', '尺寸'),
  formulaLabel: T('단면적 식', 'Section formula', 'Fórmula de la sección', 'Fórmula da seção', '断面積の式', 'Querschnittsformel', 'Formule de section', 'काट का सूत्र', '截面积算式', '截面積算式'),
  areaLabel: T('단면적', 'Cross-section', 'Sección', 'Seção', '断面積', 'Querschnitt', 'Section', 'काट का क्षेत्र', '截面积', '截面積'),
  unitLabel: T('단위중량', 'Weight per metre', 'Peso por metro', 'Peso por metro', '単位質量', 'Gewicht je Meter', 'Poids au mètre', 'प्रति मीटर वज़न', '每米重量', '每公尺重量'),
  lengthLabel: T('한 개 길이', 'Length of one', 'Longitud de una pieza', 'Comprimento de uma peça', '1本の長さ', 'Länge je Stück', 'Longueur d’une pièce', 'एक टुकड़े की लंबाई', '单件长度', '單件長度'),
  perPieceLabel: T('한 개 무게', 'Weight of one', 'Peso de una pieza', 'Peso de uma peça', '1本の重さ', 'Gewicht je Stück', 'Poids d’une pièce', 'एक टुकड़े का वज़न', '单件重量', '單件重量'),
  perHundredLabel: T('100개', '100 pieces', '100 piezas', '100 peças', '100本', '100 Stück', '100 pièces', '100 टुकड़े', '100 件', '100 件'),
  perTonLabel: T('1톤에 몇 개', 'Pieces per tonne', 'Piezas por tonelada', 'Peças por tonelada', '1トンあたりの本数', 'Stück je Tonne', 'Pièces par tonne', 'प्रति टन टुकड़े', '每吨件数', '每公噸件數'),
  perSquareLabel: T('m²당 무게', 'Weight per m²', 'Peso por m²', 'Peso por m²', '1m²あたりの重さ', 'Gewicht je m²', 'Poids au m²', 'प्रति m² वज़न', '每平方米重量', '每平方公尺重量'),
  sheetAreaLabel: T('한 장 넓이', 'Area of one sheet', 'Superficie de una chapa', 'Área de uma chapa', '1枚の面積', 'Fläche je Blech', 'Surface d’une tôle', 'एक शीट का क्षेत्र', '单张面积', '單張面積'),
  innerLabel: T('안쪽 치수', 'Inside size', 'Medida interior', 'Medida interna', '内側の寸法', 'Innenmaß', 'Dimension intérieure', 'भीतरी नाप', '内侧尺寸', '內側尺寸'),
  solidLabel: T('속이 찼다면', 'If it were solid', 'Si fuera macizo', 'Se fosse maciço', '中実だったら', 'Wenn massiv', 'S’il était plein', 'ठोस होता तो', '若是实心', '若是實心'),
  savingLabel: T('속을 비워 아낀 무게', 'Saved by being hollow', 'Ahorro por ser hueco', 'Economia por ser vazado', '中空で減った分', 'Ersparnis durch Hohlraum', 'Gain grâce au creux', 'खोखला होने से बचत', '空心省下的重量', '空心省下的重量'),

  densityTitle: T('무게는 부피 × 밀도다', 'Weight is volume times density', 'El peso es volumen por densidad', 'O peso é volume vezes densidade', '重さは体積 × 密度', 'Gewicht ist Volumen mal Dichte', 'Le poids est volume fois densité', 'वज़न = आयतन × घनत्व', '重量就是体积乘密度', '重量就是體積乘密度'),
  densityNote: T(
    '강재는 단면이 일정한 물건이라 1미터의 부피가 단면적으로 정해지고, 그 무게는 부피에 강의 밀도 7850kg/m³을 곱한 값입니다. 그래서 단위중량(kg/m)은 단면적(mm²) ÷ 10⁶ × 7850이고, 현장에서 쓰는 계수 셋도 모두 이 식을 정리한 값입니다 — 강판은 두께 × 7.85, 원형은 0.006165 × 지름², 사각은 0.00785 × 한 변². 계수를 외우는 대신 어디서 나온 것인지 알면 규격표가 없어도 어떤 치수든 셀 수 있습니다.',
    'Steel sections have a constant cross-section, so the volume of one metre is fixed by that section and its weight is that volume times the density of steel, 7850 kg/m³. The weight per metre is therefore section in mm² ÷ 10⁶ × 7850, and the three shortcuts used on site are just that formula tidied up: thickness × 7.85 for plate, 0.006165 × diameter² for round, 0.00785 × side² for square. Knowing where those numbers came from beats memorising them — any size can be worked out without a table.',
    'El acero tiene sección constante, así que el volumen de un metro queda fijado por esa sección y su peso es ese volumen por la densidad del acero, 7850 kg/m³. El peso por metro es sección en mm² ÷ 10⁶ × 7850, y los tres atajos de taller no son más que esa fórmula ordenada: espesor × 7,85 para la chapa, 0,006165 × diámetro² para el redondo, 0,00785 × lado² para el cuadrado. Saber de dónde salen vale más que memorizarlos: cualquier medida se calcula sin tabla.',
    'O aço tem seção constante, então o volume de um metro fica definido por essa seção e o peso é esse volume vezes a densidade do aço, 7850 kg/m³. O peso por metro é seção em mm² ÷ 10⁶ × 7850, e os três atalhos de oficina são só essa fórmula arrumada: espessura × 7,85 para a chapa, 0,006165 × diâmetro² para o redondo, 0,00785 × lado² para o quadrado. Saber de onde vêm vale mais que decorá-los: qualquer medida sai sem tabela.',
    '鋼材は断面が一定なので1メートルの体積は断面積で決まり、その重さは体積に鋼の密度7850kg/m³を掛けた値です。つまり単位質量(kg/m)は断面積(mm²) ÷ 10⁶ × 7850であり、現場で使う係数三つもこの式を整理しただけのものです — 鋼板は厚さ × 7.85、丸は0.006165 × 径²、角は0.00785 × 一辺²。係数を覚えるより出どころを知っておけば、規格表がなくてもどの寸法でも計算できます。',
    'Stahlprofile haben einen gleichbleibenden Querschnitt: Das Volumen eines Meters steht mit diesem Querschnitt fest, sein Gewicht ist dieses Volumen mal der Dichte von Stahl, 7850 kg/m³. Das Gewicht je Meter ist also Querschnitt in mm² ÷ 10⁶ × 7850, und die drei Werkstattfaktoren sind nur diese Formel aufgeräumt: Dicke × 7,85 beim Blech, 0,006165 × Durchmesser² beim Rundstahl, 0,00785 × Seite² beim Vierkant. Die Herkunft der Zahlen zu kennen ist mehr wert, als sie zu lernen — jedes Maß geht dann ohne Tabelle.',
    'L’acier a une section constante : le volume d’un mètre est fixé par cette section et son poids vaut ce volume multiplié par la densité de l’acier, 7850 kg/m³. Le poids au mètre est donc section en mm² ÷ 10⁶ × 7850, et les trois raccourcis d’atelier ne sont que cette formule mise au propre : épaisseur × 7,85 pour la tôle, 0,006165 × diamètre² pour le rond, 0,00785 × côté² pour le carré. Savoir d’où viennent ces nombres vaut mieux que de les apprendre : n’importe quelle dimension se calcule sans table.',
    'स्टील की काट पूरी लंबाई में एक जैसी रहती है, इसलिए एक मीटर का आयतन उसी काट से तय होता है और वज़न उस आयतन को स्टील के घनत्व 7850 kg/m³ से गुणा करने पर मिलता है। यानी प्रति मीटर वज़न (kg/m) = काट mm² में ÷ 10⁶ × 7850, और साइट पर चलने वाले तीनों गुणक इसी सूत्र के सजे हुए रूप हैं — प्लेट में मोटाई × 7.85, गोल में 0.006165 × व्यास², चौकोर में 0.00785 × भुजा²। गुणक रटने से बेहतर है यह जानना कि वे कहाँ से आए — फिर किसी भी नाप का हिसाब बिना तालिका हो जाता है।',
    '钢材的截面是一致的，一米的体积由截面积决定，重量等于体积乘以钢的密度 7850kg/m³。所以每米重量（kg/m）= 截面积（mm²） ÷ 10⁶ × 7850，工地上常用的三个系数只是把这个式子整理了一遍 — 钢板是厚度 × 7.85，圆是 0.006165 × 直径²，方是 0.00785 × 边长²。与其背系数，不如知道它们从哪来 — 没有规格表也能算任何尺寸。',
    '鋼材的截面是一致的，一公尺的體積由截面積決定，重量等於體積乘以鋼的密度 7850kg/m³。所以每公尺重量（kg/m）= 截面積（mm²） ÷ 10⁶ × 7850，工地上常用的三個係數只是把這個式子整理了一遍 — 鋼板是厚度 × 7.85，圓是 0.006165 × 直徑²，方是 0.00785 × 邊長²。與其背係數，不如知道它們從哪來 — 沒有規格表也能算任何尺寸。',
  ),

  formulaTitle: T('형상마다 다른 것은 단면적 식 하나다', 'Only the section formula changes with shape', 'Con la forma solo cambia la fórmula de la sección', 'Com a forma muda apenas a fórmula da seção', '形状で変わるのは断面積の式だけ', 'Mit der Form ändert sich nur die Querschnittsformel', 'Seule la formule de section change avec la forme', 'आकार के साथ बदलता है सिर्फ़ काट का सूत्र', '随形状变的只有截面积算式', '隨形狀變的只有截面積算式'),
  formulaNote: T(
    '강판과 평철은 두께 × 폭, 각재는 한 변², 원형봉은 π/4 × 지름²입니다. 관은 바깥 단면에서 안쪽 단면을 뺍니다 — 원형관은 π/4 × (바깥지름² − 안쪽지름²), 각관은 바깥² − 안쪽²이고, 안쪽 치수는 바깥에서 벽 두께를 양쪽으로 뺀 값(바깥 − 2t)입니다. 한쪽만 빼면 벽이 절반인 관이 되어 무게가 반쯤 나오므로, 2를 곱하는 그 자리가 이 셈에서 가장 자주 틀리는 곳입니다.',
    'Plate and flat bar are thickness × width, square bar is side², round bar is π/4 × diameter². Tubes are the outside section minus the inside one: π/4 × (outside² − inside²) for round tube, outside² − inside² for box section, where the inside size is the outside less the wall on both faces, outside − 2t. Subtract the wall only once and you get a tube with half the wall and roughly half the weight — that factor of two is the single most common slip in this calculation.',
    'La chapa y la pletina son espesor × ancho, la barra cuadrada lado², la redonda π/4 × diámetro². Los tubos son la sección exterior menos la interior: π/4 × (exterior² − interior²) en el tubo redondo, exterior² − interior² en el hueco; la medida interior es la exterior menos la pared por las dos caras, exterior − 2t. Si restas la pared una sola vez sale un tubo con la mitad de pared y casi la mitad de peso: ese factor dos es el fallo más frecuente del cálculo.',
    'A chapa e a barra chata são espessura × largura, a barra quadrada lado², a redonda π/4 × diâmetro². Os tubos são a seção externa menos a interna: π/4 × (externo² − interno²) no tubo redondo, externo² − interno² no tubo de seção fechada; a medida interna é a externa menos a parede nas duas faces, externo − 2t. Subtrair a parede uma só vez dá um tubo com metade da parede e quase metade do peso — esse fator dois é o erro mais comum da conta.',
    '鋼板と平鋼は厚さ × 幅、角鋼は一辺²、丸鋼はπ/4 × 径²です。パイプは外側の断面から内側の断面を引きます — 丸パイプはπ/4 × (外径² − 内径²)、角パイプは外² − 内²で、内側の寸法は外側から肉厚を両側ぶん引いた値(外 − 2t)です。片側だけ引くと肉厚が半分のパイプになり重さも半分ほどになるので、2を掛けるその一手がこの計算でいちばんよく間違える場所です。',
    'Blech und Flachstahl sind Dicke × Breite, Vierkant ist Seite², Rundstahl ist π/4 × Durchmesser². Rohre sind der Außenquerschnitt minus der Innenquerschnitt: π/4 × (Außen² − Innen²) beim Rundrohr, Außen² − Innen² beim Hohlprofil; das Innenmaß ist das Außenmaß minus die Wand auf beiden Seiten, außen − 2t. Zieht man die Wand nur einmal ab, entsteht ein Rohr mit halber Wand und fast halbem Gewicht — dieser Faktor zwei ist der häufigste Fehler in dieser Rechnung.',
    'La tôle et le plat valent épaisseur × largeur, le carré côté², le rond π/4 × diamètre². Les tubes valent la section extérieure moins l’intérieure : π/4 × (extérieur² − intérieur²) pour le tube rond, extérieur² − intérieur² pour le profilé creux ; la dimension intérieure est l’extérieure moins la paroi des deux côtés, extérieur − 2t. Ne retirer la paroi qu’une fois donne un tube à paroi moitié et à poids presque moitié : ce facteur deux est l’erreur la plus fréquente du calcul.',
    'प्लेट और पट्टी में मोटाई × चौड़ाई, चौकोर छड़ में भुजा², गोल छड़ में π/4 × व्यास²। पाइप में बाहरी काट से भीतरी काट घटाई जाती है — गोल पाइप में π/4 × (बाहरी² − भीतरी²), चौकोर पाइप में बाहरी² − भीतरी², और भीतरी नाप = बाहरी नाप में से दोनों तरफ़ की दीवार घटाकर, यानी बाहरी − 2t। दीवार एक ही बार घटाएँ तो आधी दीवार का पाइप बन जाता है और वज़न लगभग आधा आता है — दो से गुणा करने की वही जगह इस हिसाब में सबसे ज़्यादा चूकती है।',
    '钢板和扁钢是厚度 × 宽度，方钢是边长²，圆钢是 π/4 × 直径²。管子要用外侧截面减去内侧截面 — 圆管是 π/4 × （外径² − 内径²），方管是外² − 内²，而内侧尺寸等于外侧减去两边的壁厚，也就是外 − 2t。只减一次壁厚，就变成壁厚只有一半的管子，重量也差不多少一半 — 乘 2 的这一步是这道算式里最常出错的地方。',
    '鋼板和扁鋼是厚度 × 寬度，方鋼是邊長²，圓鋼是 π/4 × 直徑²。管子要用外側截面減去內側截面 — 圓管是 π/4 × （外徑² − 內徑²），方管是外² − 內²，而內側尺寸等於外側減去兩邊的壁厚，也就是外 − 2t。只減一次壁厚，就變成壁厚只有一半的管子，重量也差不多少一半 — 乘 2 的這一步是這道算式裡最常出錯的地方。',
  ),

  hollowTitle: T('각관은 모서리가 둥글어 조금 가볍다', 'Box sections have rounded corners and come out lighter', 'El tubo hueco tiene esquinas redondeadas y pesa algo menos', 'O tubo de seção fechada tem cantos arredondados e pesa um pouco menos', '角パイプは角が丸く、少し軽い', 'Hohlprofile haben runde Ecken und sind etwas leichter', 'Le profilé creux a des angles arrondis et pèse un peu moins', 'चौकोर पाइप के कोने गोल होते हैं, इसलिए वह थोड़ा हल्का होता है', '方管的角是圆的，所以略轻一些', '方管的角是圓的，所以略輕一些'),
  hollowNote: T(
    '이 표는 각관을 직각 모서리로 셈합니다. 실제 각관은 모서리가 둥글게 말려 있어 그 부분의 살이 빠지므로, 규격값보다 2~3% 무겁게 나옵니다(50 × 50 × 2.3의 규격 단위중량은 3.34kg/m인데 직각으로 셈하면 3.44kg/m입니다). 라운드 반지름은 제조사마다 다르고 겉보기 치수에 안 적혀 있어 계산에 넣을 수가 없습니다 — 그래서 무시하고, 무시했다는 사실을 여기 적어 둡니다. 원형관은 모서리가 없으니 이 셈이 규격값과 그대로 맞습니다.',
    'This table treats box sections as having square corners. Real ones are rolled with a radius, which removes metal at the four corners, so the figures here run 2 to 3 % above the published mass: a 50 × 50 × 2.3 is listed at 3.34 kg/m while the square-cornered calculation gives 3.44 kg/m. The corner radius varies by mill and is not part of the size designation, so it cannot go into the formula — it is left out, and that omission is stated here rather than hidden. Round tube has no corners, so the same calculation matches the published value exactly.',
    'Esta tabla calcula el tubo hueco con esquinas en ángulo recto. Los reales se laminan con radio, que quita material en las cuatro esquinas, así que estas cifras quedan entre un 2 y un 3 % por encima de la masa normalizada: un 50 × 50 × 2,3 figura como 3,34 kg/m y el cálculo en ángulo recto da 3,44 kg/m. El radio depende del fabricante y no forma parte de la designación, por lo que no puede entrar en la fórmula: se omite, y aquí se dice que se omite. El tubo redondo no tiene esquinas, así que ahí el cálculo coincide con el valor normalizado.',
    'Esta tabela calcula o tubo de seção fechada com cantos em ângulo reto. Os reais são laminados com raio, que retira material nos quatro cantos, então estes números ficam de 2 a 3 % acima da massa normalizada: um 50 × 50 × 2,3 é tabelado como 3,34 kg/m e a conta em ângulo reto dá 3,44 kg/m. O raio varia por fabricante e não faz parte da designação, então não pode entrar na fórmula: fica de fora, e isso está dito aqui em vez de escondido. O tubo redondo não tem cantos, e ali a conta bate com o valor normalizado.',
    'この表は角パイプを直角の角として計算しています。実物は角が丸められていてその分の肉が抜けるため、ここの値は規格質量より2~3%重く出ます(50 × 50 × 2.3の規格単位質量は3.34kg/mですが、直角で計算すると3.44kg/mです)。角の丸みの半径はメーカーごとに違い、呼び寸法にも書かれていないので式に入れられません — だから無視し、無視したことをここに書いておきます。丸パイプには角がないので、同じ計算が規格値とそのまま一致します。',
    'Diese Tabelle rechnet Hohlprofile mit rechtwinkligen Ecken. Wirkliche Profile werden mit Radius gewalzt, wodurch an den vier Ecken Material fehlt; die Werte hier liegen deshalb 2 bis 3 % über der Normmasse: ein 50 × 50 × 2,3 ist mit 3,34 kg/m angegeben, rechtwinklig gerechnet kommen 3,44 kg/m heraus. Der Eckradius hängt vom Werk ab und steht nicht in der Maßbezeichnung, kann also nicht in die Formel — er bleibt weg, und das steht hier, statt verschwiegen zu werden. Rundrohr hat keine Ecken; dort trifft dieselbe Rechnung den Normwert genau.',
    'Ce tableau calcule les profilés creux avec des angles droits. Les vrais sont laminés avec un rayon, qui retire de la matière aux quatre angles : les valeurs ici dépassent donc la masse normalisée de 2 à 3 % — un 50 × 50 × 2,3 est donné à 3,34 kg/m alors que le calcul à angles droits donne 3,44 kg/m. Le rayon dépend de l’usine et ne figure pas dans la désignation, il ne peut donc pas entrer dans la formule : il est écarté, et cela est écrit ici plutôt que masqué. Le tube rond n’a pas d’angles ; le même calcul y retrouve exactement la valeur normalisée.',
    'यह तालिका चौकोर पाइप को समकोण कोनों के साथ गिनती है। असली पाइप के कोने गोल बेले जाते हैं और वहाँ की धातु निकल जाती है, इसलिए यहाँ के आंकड़े मानक वज़न से 2~3% भारी आते हैं (50 × 50 × 2.3 का मानक प्रति मीटर वज़न 3.34 kg/m है, पर समकोण से गिनने पर 3.44 kg/m)। कोने की त्रिज्या हर निर्माता में अलग होती है और नाप के नाम में लिखी नहीं होती, इसलिए वह सूत्र में नहीं जा सकती — उसे छोड़ दिया गया है, और यह बात यहाँ लिखी है, छिपाई नहीं गई। गोल पाइप में कोने नहीं होते, वहाँ यही हिसाब मानक मान से पूरा मिलता है।',
    '这张表把方管当作直角的角来算。真正的方管四个角是滚圆的，那里的钢材被去掉了，所以这里的数字比标准重量高 2~3%（50 × 50 × 2.3 的标准每米重量是 3.34kg/m，按直角算得 3.44kg/m）。圆角半径各厂不同，也不写在尺寸名称里，没法放进算式 — 所以略去，并且把略去这件事写在这里，而不是藏起来。圆管没有角，同一道算式在那里与标准值完全吻合。',
    '這張表把方管當作直角的角來算。真正的方管四個角是滾圓的，那裡的鋼材被去掉了，所以這裡的數字比標準重量高 2~3%（50 × 50 × 2.3 的標準每公尺重量是 3.34kg/m，按直角算得 3.44kg/m）。圓角半徑各廠不同，也不寫在尺寸名稱裡，沒法放進算式 — 所以略去，並且把略去這件事寫在這裡，而不是藏起來。圓管沒有角，同一道算式在那裡與標準值完全吻合。',
  ),

  excludedTitle: T('H형강·ㄱ형강은 넣지 않았다', 'H-beams and angles are left out', 'Las vigas H y los angulares quedan fuera', 'Vigas H e cantoneiras ficaram de fora', 'H形鋼・山形鋼は入れていない', 'H-Träger und Winkelstahl fehlen hier', 'Les poutrelles H et les cornières sont exclues', 'H-बीम और एंगल यहाँ नहीं हैं', 'H 型钢和角钢没有收录', 'H 型鋼和角鋼沒有收錄'),
  excludedNote: T(
    'H형강·I형강·ㄱ형강(앵글)·ㄷ형강(찬넬)·경량 C형강·T형강은 단위중량이 규격표로만 정해집니다. 웨브와 플랜지가 만나는 자리의 필렛(모서리 살)과 플랜지 안쪽의 테이퍼가 무게를 좌우하는데, 그 치수는 H-200 × 100 × 5.5 × 8 같은 호칭에 안 적혀 있어 겉보기 치수로는 단면적이 나오지 않습니다. 표를 옮겨 적어 넣을 수도 있지만, 그러면 한 칸이 틀려도 아무도 못 잡습니다 — 여기 있는 숫자가 전부 밀도와 π로 되짚어지는 성질이 그 자리에서 깨집니다. 그래서 순수 기하로 계산되는 형상만 냈습니다.',
    'H-beams, I-beams, angles, channels, lipped C sections and tees have a mass per metre that only a standards table can give. What decides that mass is the fillet where web meets flange and the taper inside the flange, and neither appears in a designation like H-200 × 100 × 5.5 × 8 — the visible dimensions do not determine the area. Those rows could be copied in, but then a single mistyped figure would go unnoticed forever: the property that every number here can be re-derived from the density and π would break at that row. So only shapes that come out of pure geometry are listed.',
    'Las vigas H, las vigas I, los angulares, los canales, los perfiles C conformados y las tes tienen una masa por metro que solo da una tabla normalizada. Lo que decide esa masa es el acuerdo entre alma y ala y la conicidad interior del ala, y ninguno de los dos aparece en una designación como H-200 × 100 × 5,5 × 8: las medidas visibles no determinan la sección. Se podrían copiar esas filas, pero entonces una cifra mal transcrita no se detectaría nunca, y la propiedad de que todo número de aquí se rededuce de la densidad y π se rompería justo ahí. Por eso solo figuran las formas que salen de geometría pura.',
    'Vigas H, vigas I, cantoneiras, perfis U, perfis C enformados a frio e tês têm massa por metro que só uma tabela normalizada fornece. O que define essa massa é a concordância entre alma e mesa e a conicidade interna da mesa, e nenhuma das duas aparece numa designação como H-200 × 100 × 5,5 × 8: as medidas visíveis não determinam a seção. Essas linhas poderiam ser copiadas, mas então um número mal transcrito nunca seria notado, e a propriedade de que todo valor daqui se rededuz da densidade e de π quebraria ali. Por isso só entram as formas que saem de geometria pura.',
    'H形鋼・I形鋼・山形鋼(アングル)・溝形鋼(チャンネル)・軽量C形鋼・T形鋼は、単位質量が規格表でしか決まりません。ウェブとフランジが交わる部分のフィレット(隅肉)とフランジ内側のテーパーが重さを左右しますが、その寸法はH-200 × 100 × 5.5 × 8のような呼び名には書かれておらず、見える寸法だけでは断面積が出ません。表を写して入れることもできますが、そうすると一つの数字が違っていても誰も気づけません — ここの数字がすべて密度とπで検算できるという性質が、その行で崩れます。だから純粋な幾何で計算できる形状だけを載せました。',
    'H-Träger, I-Träger, Winkelstahl, U-Profile, kaltgeformte C-Profile und T-Stahl haben eine Masse je Meter, die nur eine Normtabelle liefert. Entscheidend sind der Ausrundungsradius zwischen Steg und Flansch und die Neigung der Flanschinnenseite — beides steht nicht in einer Bezeichnung wie H-200 × 100 × 5,5 × 8; die sichtbaren Maße legen den Querschnitt nicht fest. Man könnte diese Zeilen abschreiben, aber dann fiele eine falsch übertragene Zahl nie auf, und die Eigenschaft, dass sich hier jeder Wert aus Dichte und π zurückrechnen lässt, würde genau dort brechen. Deshalb stehen nur Formen darin, die aus reiner Geometrie folgen.',
    'Les poutrelles H, les poutrelles I, les cornières, les profilés U, les C formés à froid et les tés ont une masse au mètre que seule une table normalisée donne. Ce qui la décide, c’est le congé entre l’âme et la semelle et la conicité intérieure de la semelle, et aucun des deux n’apparaît dans une désignation comme H-200 × 100 × 5,5 × 8 : les dimensions visibles ne fixent pas la section. On pourrait recopier ces lignes, mais un chiffre mal reporté ne serait alors jamais repéré, et la propriété selon laquelle chaque valeur ici se retrouve à partir de la densité et de π se briserait à cet endroit. Ne figurent donc que les formes issues de géométrie pure.',
    'H-बीम, I-बीम, एंगल, चैनल, ठंडा-मोड़ा C सेक्शन और टी — इन सबका प्रति मीटर वज़न सिर्फ़ मानक तालिका से मिलता है। उस वज़न को तय करते हैं वेब और फ़्लैंज के जोड़ का फ़िलेट और फ़्लैंज के भीतर की ढलान, और ये दोनों H-200 × 100 × 5.5 × 8 जैसे नाम में लिखे नहीं होते — दिखने वाले नाप से काट का क्षेत्र नहीं निकलता। तालिका उतार कर डाली जा सकती थी, पर तब एक ग़लत लिखा अंक कभी पकड़ में नहीं आता, और यहाँ का हर आंकड़ा घनत्व तथा π से दोबारा निकाला जा सकता है — यह गुण उसी पंक्ति पर टूट जाता। इसलिए सिर्फ़ वे आकार दिए हैं जो शुद्ध ज्यामिति से निकलते हैं।',
    'H 型钢、I 型钢、角钢、槽钢、冷弯 C 型钢和 T 型钢的每米重量只能靠规格表。决定这个重量的是腹板与翼缘相交处的圆角和翼缘内侧的斜度，而这两个尺寸都不写在 H-200 × 100 × 5.5 × 8 这样的名称里 — 看得见的尺寸定不出截面积。把表抄进来当然可以，但那样一个抄错的数字永远没人发现，而这里每个数字都能用密度和 π 反推回去的性质，正好在那一行断掉。所以只收录能用纯几何算出来的形状。',
    'H 型鋼、I 型鋼、角鋼、槽鋼、冷彎 C 型鋼和 T 型鋼的每公尺重量只能靠規格表。決定這個重量的是腹板與翼緣相交處的圓角和翼緣內側的斜度，而這兩個尺寸都不寫在 H-200 × 100 × 5.5 × 8 這樣的名稱裡 — 看得見的尺寸定不出截面積。把表抄進來當然可以，但那樣一個抄錯的數字永遠沒人發現，而這裡每個數字都能用密度和 π 反推回去的性質，正好在那一行斷掉。所以只收錄能用純幾何算出來的形狀。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के खाने', '相邻组合', '相鄰組合'),
  shapeRowTitle: T('같은 형상의 다른 치수', 'Same shape, other sizes', 'Misma forma, otras medidas', 'Mesma forma, outras medidas', '同じ形状の他の寸法', 'Gleiche Form, andere Maße', 'Même forme, autres dimensions', 'वही आकार, दूसरे नाप', '同一形状的其他尺寸', '同一形狀的其他尺寸'),
  relatedTitle: T('같이 보는 표', 'Related tables', 'Tablas relacionadas', 'Tabelas relacionadas', '関連する表', 'Verwandte Tabellen', 'Tables liées', 'संबंधित तालिकाएँ', '相关表格', '相關表格'),

  desc: T<(f: SteelFacts) => string>(
    f => `${steelName(f, 'ko')}의 무게는 ${f.perPiece}kg입니다. 단면적 ${f.area}mm²에 밀도 7850kg/m³을 곱하면 단위중량 ${f.unit}kg/m이고, 100개면 ${f.perHundred}kg, 1톤에는 ${f.piecesPerTon}개가 들어갑니다.`,
    f => `${steelName(f, 'en')} weighs ${f.perPiece} kg. Its ${f.area} mm² section times a density of 7850 kg/m³ gives ${f.unit} kg/m, so 100 pieces come to ${f.perHundred} kg and a tonne holds ${f.piecesPerTon}.`,
    f => `${steelName(f, 'es')} pesa ${nc(f.perPiece)} kg. Su sección de ${nc(f.area)} mm² por una densidad de 7850 kg/m³ da ${nc(f.unit)} kg/m: 100 piezas son ${nc(f.perHundred)} kg y en una tonelada entran ${f.piecesPerTon}.`,
    f => `${steelName(f, 'pt')} pesa ${nc(f.perPiece)} kg. Sua seção de ${nc(f.area)} mm² vezes a densidade de 7850 kg/m³ dá ${nc(f.unit)} kg/m: 100 peças são ${nc(f.perHundred)} kg e em uma tonelada cabem ${f.piecesPerTon}.`,
    f => `${steelName(f, 'ja')}の重さは${f.perPiece}kgです。断面積${f.area}mm²に密度7850kg/m³を掛けると単位質量${f.unit}kg/mで、100本なら${f.perHundred}kg、1トンには${f.piecesPerTon}本入ります。`,
    f => `${steelName(f, 'de')} wiegt ${nc(f.perPiece)} kg. Der Querschnitt von ${nc(f.area)} mm² mal einer Dichte von 7850 kg/m³ ergibt ${nc(f.unit)} kg/m: 100 Stück sind ${nc(f.perHundred)} kg, in eine Tonne gehen ${f.piecesPerTon}.`,
    f => `${steelName(f, 'fr')} pèse ${nc(f.perPiece)} kg. Sa section de ${nc(f.area)} mm² multipliée par une densité de 7850 kg/m³ donne ${nc(f.unit)} kg/m : 100 pièces font ${nc(f.perHundred)} kg et une tonne en contient ${f.piecesPerTon}.`,
    f => `${steelName(f, 'hi')} का वज़न ${f.perPiece} kg है। ${f.area} mm² काट को घनत्व 7850 kg/m³ से गुणा करने पर ${f.unit} kg/m मिलता है, इसलिए 100 टुकड़े ${f.perHundred} kg और एक टन में ${f.piecesPerTon} टुकड़े।`,
    f => `${steelName(f, 'zh')} 一件重 ${f.perPiece} 千克。截面积 ${f.area}mm² 乘密度 7850kg/m³ 得每米 ${f.unit} 千克，所以 100 件是 ${f.perHundred} 千克，一吨装 ${f.piecesPerTon} 件。`,
    f => `${steelName(f, 'tw')} 一件重 ${f.perPiece} 公斤。截面積 ${f.area}mm² 乘密度 7850kg/m³ 得每公尺 ${f.unit} 公斤，所以 100 件是 ${f.perHundred} 公斤，一公噸裝 ${f.piecesPerTon} 件。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '단위중량(kg/m)은 단면적(mm²) ÷ 10⁶ × 7850입니다 — 형상마다 다른 것은 단면적 식뿐입니다.',
      '강판은 두께 × 7.85가 m²당 무게입니다. 6mm면 47.1kg/m², 12mm면 그 두 배입니다.',
      '관은 바깥 단면에서 안쪽 단면을 뺍니다. 안쪽 치수는 바깥에서 2t를 뺀 값입니다.',
      '치수가 2배면 단면적은 4배가 되고, 길이는 무게에 정비례합니다.',
    ],
    [
      'Weight per metre (kg/m) is section in mm² ÷ 10⁶ × 7850 — only the section formula changes with shape.',
      'For plate, thickness × 7.85 is the weight per m²: 47.1 kg/m² at 6 mm, twice that at 12 mm.',
      'For tube, subtract the inside section from the outside one; the inside size is the outside less 2t.',
      'Doubling a dimension quadruples the section, while length is directly proportional to weight.',
    ],
    [
      'El peso por metro (kg/m) es sección en mm² ÷ 10⁶ × 7850: con la forma solo cambia la fórmula de la sección.',
      'En la chapa, espesor × 7,85 es el peso por m²: 47,1 kg/m² con 6 mm y el doble con 12 mm.',
      'En el tubo se resta la sección interior de la exterior; la medida interior es la exterior menos 2t.',
      'Doblar una medida cuadruplica la sección, mientras la longitud es directamente proporcional al peso.',
    ],
    [
      'O peso por metro (kg/m) é seção em mm² ÷ 10⁶ × 7850: com a forma muda apenas a fórmula da seção.',
      'Na chapa, espessura × 7,85 é o peso por m²: 47,1 kg/m² com 6 mm e o dobro com 12 mm.',
      'No tubo, subtraia a seção interna da externa; a medida interna é a externa menos 2t.',
      'Dobrar uma medida quadruplica a seção, enquanto o comprimento é diretamente proporcional ao peso.',
    ],
    [
      '単位質量(kg/m)は断面積(mm²) ÷ 10⁶ × 7850です — 形状で変わるのは断面積の式だけです。',
      '鋼板は厚さ × 7.85が1m²あたりの重さです。6mmなら47.1kg/m²、12mmならその2倍です。',
      'パイプは外側の断面から内側の断面を引きます。内側の寸法は外側から2tを引いた値です。',
      '寸法が2倍になれば断面積は4倍になり、長さは重さに正比例します。',
    ],
    [
      'Gewicht je Meter (kg/m) ist Querschnitt in mm² ÷ 10⁶ × 7850 — mit der Form ändert sich nur die Querschnittsformel.',
      'Beim Blech ist Dicke × 7,85 das Gewicht je m²: 47,1 kg/m² bei 6 mm, das Doppelte bei 12 mm.',
      'Beim Rohr zieht man den Innenquerschnitt vom Außenquerschnitt ab; das Innenmaß ist das Außenmaß minus 2t.',
      'Doppeltes Maß heißt vierfacher Querschnitt, die Länge geht dagegen linear ins Gewicht.',
    ],
    [
      'Le poids au mètre (kg/m) vaut section en mm² ÷ 10⁶ × 7850 : seule la formule de section change avec la forme.',
      'Pour la tôle, épaisseur × 7,85 donne le poids au m² : 47,1 kg/m² à 6 mm, le double à 12 mm.',
      'Pour le tube, retirez la section intérieure de l’extérieure ; la dimension intérieure vaut l’extérieure moins 2t.',
      'Doubler une dimension quadruple la section, alors que la longueur est proportionnelle au poids.',
    ],
    [
      'प्रति मीटर वज़न (kg/m) = काट mm² में ÷ 10⁶ × 7850 — आकार के साथ बदलता है सिर्फ़ काट का सूत्र।',
      'प्लेट में मोटाई × 7.85 ही प्रति m² वज़न है: 6 mm पर 47.1 kg/m², 12 mm पर उसका दुगुना।',
      'पाइप में बाहरी काट से भीतरी काट घटाएँ; भीतरी नाप = बाहरी नाप घटा 2t।',
      'कोई नाप दुगुना हो तो काट चौगुनी हो जाती है, और लंबाई वज़न के सीधे अनुपात में रहती है।',
    ],
    [
      '每米重量（kg/m）= 截面积（mm²） ÷ 10⁶ × 7850 — 随形状变的只有截面积算式。',
      '钢板用厚度 × 7.85 得每平方米重量：6mm 是 47.1kg/m²，12mm 是它的两倍。',
      '管子要从外侧截面减去内侧截面；内侧尺寸等于外侧减 2t。',
      '尺寸翻倍，截面积变四倍；长度则与重量成正比。',
    ],
    [
      '每公尺重量（kg/m）= 截面積（mm²） ÷ 10⁶ × 7850 — 隨形狀變的只有截面積算式。',
      '鋼板用厚度 × 7.85 得每平方公尺重量：6mm 是 47.1kg/m²，12mm 是它的兩倍。',
      '管子要從外側截面減去內側截面；內側尺寸等於外側減 2t。',
      '尺寸翻倍，截面積變四倍；長度則與重量成正比。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '강재 단위중량표 149칸 — 형상별 무게 계산',
    'Steel weight chart — kilograms by shape and size',
    'Tabla de peso del acero — kilogramos por forma y medida',
    'Tabela de peso do aço — quilos por forma e medida',
    '鋼材単位質量表149マス — 形状別の重さ',
    'Stahl-Gewichtstabelle — Kilogramm nach Form und Maß',
    'Table des poids de l’acier — kilogrammes par forme et dimension',
    'स्टील वज़न तालिका — आकार और नाप के अनुसार किलोग्राम',
    '钢材重量表 149 格 — 按形状和尺寸的公斤数',
    '鋼材重量表 149 格 — 按形狀和尺寸的公斤數',
  ),
  hubMetaDesc: T(
    '강판·평철·각재·원형봉·원형관·각관 일곱 형상 149칸. 단면적 식에서 단위중량이 나오는 과정, 한 개 무게와 1톤당 개수, 각관 모서리 라운드를 무시한 만큼의 오차까지 함께 봅니다.',
    'The 149 stocked sizes across seven shapes — plate, flat bar, square bar, round bar, round tube and box section: how the section formula turns into a weight per metre, what one piece weighs, how many make a tonne, and how much the ignored corner radius costs on box section.',
    'Las 149 medidas de mercado en siete formas: chapa, pletina, barra cuadrada, barra redonda, tubo redondo y tubo hueco. Cómo la fórmula de la sección se convierte en peso por metro, cuánto pesa una pieza, cuántas hacen una tonelada y qué error deja el radio de esquina omitido.',
    'As 149 medidas de mercado em sete formas: chapa, barra chata, barra quadrada, barra redonda, tubo redondo e tubo de seção fechada. Como a fórmula da seção se torna peso por metro, quanto pesa uma peça, quantas fazem uma tonelada e que erro deixa o raio de canto omitido.',
    '鋼板・平鋼・角鋼・丸鋼・丸パイプ・角パイプの七形状149マス。断面積の式から単位質量が出る筋道、1本の重さ、1トンあたりの本数、角の丸みを無視した分の誤差まで。',
    'Die 149 handelsüblichen Maße in sieben Formen: Blech, Flachstahl, Vierkantstahl, Rundstahl, Rundrohr und Hohlprofil. Wie aus der Querschnittsformel ein Gewicht je Meter wird, was ein Stück wiegt, wie viele eine Tonne ergeben und welchen Fehler der weggelassene Eckradius hinterlässt.',
    'Les 149 dimensions courantes en sept formes : tôle, plat, carré, rond, tube rond et profilé creux. Comment la formule de section devient un poids au mètre, ce que pèse une pièce, combien font une tonne, et l’écart laissé par le rayon d’angle négligé.',
    'सात आकारों के 149 बाज़ारी नाप: प्लेट, पट्टी, चौकोर छड़, गोल छड़, गोल पाइप और चौकोर पाइप। काट का सूत्र प्रति मीटर वज़न कैसे बनता है, एक टुकड़े का वज़न, एक टन में कितने, और कोने की त्रिज्या छोड़ने से कितना अंतर पड़ता है।',
    '钢板、扁钢、方钢、圆钢、圆管、方管七种形状共 149 格：截面积算式如何变成每米重量、一件多重、一吨多少件，以及忽略方管圆角带来的偏差。',
    '鋼板、扁鋼、方鋼、圓鋼、圓管、方管七種形狀共 149 格：截面積算式如何變成每公尺重量、一件多重、一公噸多少件，以及忽略方管圓角帶來的偏差。',
  ),

  metaTitle: T<(f: SteelFacts) => string>(
    f => `${steelName(f, 'ko')} 강재 무게 — 한 개 ${f.perPiece}kg`,
    f => `${steelName(f, 'en')} in steel — ${f.perPiece} kg a piece`,
    f => `${steelName(f, 'es')} en acero — ${nc(f.perPiece)} kg por pieza`,
    f => `${steelName(f, 'pt')} em aço — ${nc(f.perPiece)} kg por peça`,
    f => `${steelName(f, 'ja')} の重量 — 1本${f.perPiece}kg`,
    f => `${steelName(f, 'de')} aus Stahl — ${nc(f.perPiece)} kg je Stück`,
    f => `${steelName(f, 'fr')} en acier — ${nc(f.perPiece)} kg la pièce`,
    f => `${steelName(f, 'hi')} स्टील — प्रति टुकड़ा ${f.perPiece} kg`,
    f => `${steelName(f, 'zh')} 钢材重量 — 每件 ${f.perPiece} 千克`,
    f => `${steelName(f, 'tw')} 鋼材重量 — 每件 ${f.perPiece} 公斤`,
  ),

  metaDesc: T<(f: SteelFacts) => string>(
    f => `${steelName(f, 'ko')}는 단면적 ${f.area}mm², 단위중량 ${f.unit}kg/m입니다. 한 개 ${f.perPiece}kg, 100개 ${f.perHundred}kg, 1톤에 ${f.piecesPerTon}개이고, 단면적은 ${f.formula}로 구한 뒤 밀도 7850kg/m³을 곱했습니다.`,
    f => `${steelName(f, 'en')} has a ${f.area} mm² section and weighs ${f.unit} kg/m: ${f.perPiece} kg a piece, ${f.perHundred} kg per 100, ${f.piecesPerTon} pieces to the tonne. The section comes from ${f.formula} and is then multiplied by a density of 7850 kg/m³.`,
    f => `${steelName(f, 'es')} tiene una sección de ${nc(f.area)} mm² y pesa ${nc(f.unit)} kg/m: ${nc(f.perPiece)} kg por pieza, ${nc(f.perHundred)} kg cada 100 y ${f.piecesPerTon} piezas por tonelada. La sección sale de ${f.formula} y se multiplica por una densidad de 7850 kg/m³.`,
    f => `${steelName(f, 'pt')} tem seção de ${nc(f.area)} mm² e pesa ${nc(f.unit)} kg/m: ${nc(f.perPiece)} kg por peça, ${nc(f.perHundred)} kg a cada 100 e ${f.piecesPerTon} peças por tonelada. A seção vem de ${f.formula} e é multiplicada pela densidade de 7850 kg/m³.`,
    f => `${steelName(f, 'ja')}は断面積${f.area}mm²、単位質量${f.unit}kg/mです。1本${f.perPiece}kg、100本で${f.perHundred}kg、1トンに${f.piecesPerTon}本で、断面積は${f.formula}で求めてから密度7850kg/m³を掛けています。`,
    f => `${steelName(f, 'de')} hat ${nc(f.area)} mm² Querschnitt und wiegt ${nc(f.unit)} kg/m: ${nc(f.perPiece)} kg je Stück, ${nc(f.perHundred)} kg je 100 Stück, ${f.piecesPerTon} Stück auf die Tonne. Der Querschnitt folgt aus ${f.formula} und wird mit einer Dichte von 7850 kg/m³ multipliziert.`,
    f => `${steelName(f, 'fr')} a une section de ${nc(f.area)} mm² et pèse ${nc(f.unit)} kg/m : ${nc(f.perPiece)} kg la pièce, ${nc(f.perHundred)} kg les 100, ${f.piecesPerTon} pièces à la tonne. La section vient de ${f.formula}, puis on multiplie par une densité de 7850 kg/m³.`,
    f => `${steelName(f, 'hi')} की काट ${f.area} mm² है और वज़न ${f.unit} kg/m: प्रति टुकड़ा ${f.perPiece} kg, 100 टुकड़े ${f.perHundred} kg, एक टन में ${f.piecesPerTon} टुकड़े। काट ${f.formula} से निकालकर घनत्व 7850 kg/m³ से गुणा की गई है।`,
    f => `${steelName(f, 'zh')} 的截面积是 ${f.area}mm²，每米 ${f.unit} 千克：一件 ${f.perPiece} 千克，100 件 ${f.perHundred} 千克，一吨 ${f.piecesPerTon} 件。截面积由 ${f.formula} 求得，再乘密度 7850kg/m³。`,
    f => `${steelName(f, 'tw')} 的截面積是 ${f.area}mm²，每公尺 ${f.unit} 公斤：一件 ${f.perPiece} 公斤，100 件 ${f.perHundred} 公斤，一公噸 ${f.piecesPerTon} 件。截面積由 ${f.formula} 求得，再乘密度 7850kg/m³。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '강재 무게는 어떻게 계산하나요?', a: '단면적을 구해 밀도를 곱합니다. 단위중량(kg/m) = 단면적(mm²) ÷ 10⁶ × 7850이고, 단면적 식만 형상마다 다릅니다 — 강판은 두께 × 폭, 원형봉은 π/4 × 지름², 관은 바깥 단면 − 안쪽 단면입니다.' },
      { q: '6mm 강판 1m²는 몇 kg인가요?', a: '47.1kg입니다. 두께 1mm가 1m²에 7.85kg이므로 6 × 7.85로 나옵니다. 이 7.85는 밀도 7850kg/m³을 1000으로 나눈 값일 뿐입니다.' },
      { q: 'H형강과 ㄱ형강은 왜 없나요?', a: '단위중량이 규격표로만 정해지기 때문입니다. 웨브와 플랜지가 만나는 필렛과 플랜지 안쪽 테이퍼가 무게를 좌우하는데 호칭에 그 치수가 없어, 겉보기 치수로는 단면적이 나오지 않습니다.' },
    ],
    [
      { q: 'How do I calculate the weight of a steel section?', a: 'Work out the cross-section and multiply by the density: weight per metre (kg/m) = section in mm² ÷ 10⁶ × 7850. Only the section formula changes with shape — thickness × width for plate, π/4 × diameter² for round bar, outside section minus inside section for tube.' },
      { q: 'How much does a square metre of 6 mm plate weigh?', a: '47.1 kg. Every millimetre of thickness is 7.85 kg per m², so it is 6 × 7.85. That 7.85 is nothing but the density of steel, 7850 kg/m³, divided by 1000.' },
      { q: 'Why are H-beams and angles missing?', a: 'Because their mass per metre only comes from a standards table. The fillet where web meets flange and the taper inside the flange decide that mass, and neither is part of the designation, so the visible dimensions do not give the area.' },
    ],
    [
      { q: '¿Cómo se calcula el peso de un perfil de acero?', a: 'Se halla la sección y se multiplica por la densidad: peso por metro (kg/m) = sección en mm² ÷ 10⁶ × 7850. Con la forma solo cambia la fórmula de la sección: espesor × ancho en la chapa, π/4 × diámetro² en la barra redonda, sección exterior menos interior en el tubo.' },
      { q: '¿Cuánto pesa un metro cuadrado de chapa de 6 mm?', a: '47,1 kg. Cada milímetro de espesor son 7,85 kg por m², así que es 6 × 7,85. Ese 7,85 no es más que la densidad del acero, 7850 kg/m³, dividida entre 1000.' },
      { q: '¿Por qué no están las vigas H ni los angulares?', a: 'Porque su masa por metro solo la da una tabla normalizada. La decide el acuerdo entre alma y ala y la conicidad interior del ala, y ninguno figura en la designación: las medidas visibles no dan la sección.' },
    ],
    [
      { q: 'Como se calcula o peso de um perfil de aço?', a: 'Calcule a seção e multiplique pela densidade: peso por metro (kg/m) = seção em mm² ÷ 10⁶ × 7850. Com a forma muda apenas a fórmula da seção: espessura × largura na chapa, π/4 × diâmetro² na barra redonda, seção externa menos interna no tubo.' },
      { q: 'Quanto pesa um metro quadrado de chapa de 6 mm?', a: '47,1 kg. Cada milímetro de espessura dá 7,85 kg por m², então é 6 × 7,85. Esse 7,85 é só a densidade do aço, 7850 kg/m³, dividida por 1000.' },
      { q: 'Por que não há vigas H nem cantoneiras?', a: 'Porque a massa por metro delas só sai de uma tabela normalizada. Ela é definida pela concordância entre alma e mesa e pela conicidade interna da mesa, e nenhuma aparece na designação: as medidas visíveis não dão a seção.' },
    ],
    [
      { q: '鋼材の重さはどう計算しますか。', a: '断面積を求めて密度を掛けます。単位質量(kg/m) = 断面積(mm²) ÷ 10⁶ × 7850で、形状ごとに違うのは断面積の式だけです — 鋼板は厚さ × 幅、丸鋼はπ/4 × 径²、パイプは外側の断面 − 内側の断面です。' },
      { q: '厚さ6mmの鋼板は1m²で何kgですか。', a: '47.1kgです。厚さ1mmが1m²で7.85kgなので6 × 7.85で出ます。この7.85は密度7850kg/m³を1000で割った値にすぎません。' },
      { q: 'H形鋼や山形鋼はなぜないのですか。', a: '単位質量が規格表でしか決まらないからです。ウェブとフランジが交わるフィレットとフランジ内側のテーパーが重さを左右しますが、呼び名にその寸法がなく、見える寸法だけでは断面積が出ません。' },
    ],
    [
      { q: 'Wie rechnet man das Gewicht eines Stahlprofils?', a: 'Querschnitt bestimmen und mit der Dichte multiplizieren: Gewicht je Meter (kg/m) = Querschnitt in mm² ÷ 10⁶ × 7850. Mit der Form ändert sich nur die Querschnittsformel — Dicke × Breite beim Blech, π/4 × Durchmesser² beim Rundstahl, Außenquerschnitt minus Innenquerschnitt beim Rohr.' },
      { q: 'Wie schwer ist ein Quadratmeter Blech mit 6 mm?', a: '47,1 kg. Jeder Millimeter Dicke bringt 7,85 kg je m², also 6 × 7,85. Diese 7,85 sind nur die Dichte von Stahl, 7850 kg/m³, geteilt durch 1000.' },
      { q: 'Warum fehlen H-Träger und Winkelstahl?', a: 'Weil ihre Masse je Meter nur aus einer Normtabelle kommt. Sie hängt am Ausrundungsradius zwischen Steg und Flansch und an der Neigung der Flanschinnenseite; beides steht nicht in der Bezeichnung, die sichtbaren Maße geben den Querschnitt also nicht her.' },
    ],
    [
      { q: 'Comment calculer le poids d’un profilé en acier ?', a: 'On calcule la section puis on multiplie par la densité : poids au mètre (kg/m) = section en mm² ÷ 10⁶ × 7850. Seule la formule de section change avec la forme — épaisseur × largeur pour la tôle, π/4 × diamètre² pour le rond, section extérieure moins intérieure pour le tube.' },
      { q: 'Combien pèse un mètre carré de tôle de 6 mm ?', a: '47,1 kg. Chaque millimètre d’épaisseur vaut 7,85 kg au m², soit 6 × 7,85. Ce 7,85 n’est que la densité de l’acier, 7850 kg/m³, divisée par 1000.' },
      { q: 'Pourquoi les poutrelles H et les cornières manquent-elles ?', a: 'Parce que leur masse au mètre ne vient que d’une table normalisée. Elle dépend du congé entre l’âme et la semelle et de la conicité intérieure de la semelle, et aucun des deux ne figure dans la désignation : les dimensions visibles ne donnent pas la section.' },
    ],
    [
      { q: 'स्टील सेक्शन का वज़न कैसे निकालें?', a: 'काट का क्षेत्र निकालकर घनत्व से गुणा करें: प्रति मीटर वज़न (kg/m) = काट mm² में ÷ 10⁶ × 7850। आकार के साथ बदलता है सिर्फ़ काट का सूत्र — प्लेट में मोटाई × चौड़ाई, गोल छड़ में π/4 × व्यास², पाइप में बाहरी काट घटा भीतरी काट।' },
      { q: '6 mm प्लेट का एक वर्ग मीटर कितने kg का होता है?', a: '47.1 kg। मोटाई का हर मिलीमीटर प्रति m² 7.85 kg देता है, इसलिए 6 × 7.85। यह 7.85 केवल स्टील के घनत्व 7850 kg/m³ को 1000 से भाग देने पर मिला मान है।' },
      { q: 'H-बीम और एंगल क्यों नहीं हैं?', a: 'क्योंकि उनका प्रति मीटर वज़न सिर्फ़ मानक तालिका से आता है। उसे वेब और फ़्लैंज के जोड़ का फ़िलेट तथा फ़्लैंज के भीतर की ढलान तय करती है, और ये दोनों नाम में नहीं होते — दिखने वाले नाप से काट नहीं निकलती।' },
    ],
    [
      { q: '钢材重量怎么算？', a: '先求截面积，再乘密度：每米重量（kg/m）= 截面积（mm²） ÷ 10⁶ × 7850。随形状变的只有截面积算式 — 钢板是厚度 × 宽度，圆钢是 π/4 × 直径²，管子是外侧截面 − 内侧截面。' },
      { q: '6mm 钢板一平方米多重？', a: '47.1 千克。厚度每 1mm 对应每平方米 7.85 千克，所以是 6 × 7.85。这个 7.85 只是钢的密度 7850kg/m³ 除以 1000。' },
      { q: '为什么没有 H 型钢和角钢？', a: '因为它们的每米重量只能查规格表。决定重量的是腹板与翼缘相交处的圆角和翼缘内侧的斜度，这两个尺寸都不写在名称里，看得见的尺寸算不出截面积。' },
    ],
    [
      { q: '鋼材重量怎麼算？', a: '先求截面積，再乘密度：每公尺重量（kg/m）= 截面積（mm²） ÷ 10⁶ × 7850。隨形狀變的只有截面積算式 — 鋼板是厚度 × 寬度，圓鋼是 π/4 × 直徑²，管子是外側截面 − 內側截面。' },
      { q: '6mm 鋼板一平方公尺多重？', a: '47.1 公斤。厚度每 1mm 對應每平方公尺 7.85 公斤，所以是 6 × 7.85。這個 7.85 只是鋼的密度 7850kg/m³ 除以 1000。' },
      { q: '為什麼沒有 H 型鋼和角鋼？', a: '因為它們的每公尺重量只能查規格表。決定重量的是腹板與翼緣相交處的圓角和翼緣內側的斜度，這兩個尺寸都不寫在名稱裡，看得見的尺寸算不出截面積。' },
    ],
  ),

  cellFaq: T<(f: SteelFacts) => FaqItem[]>(
    f => [
      { q: `${steelName(f, 'ko')} 한 개는 몇 kg인가요?`, a: `${f.perPiece}kg입니다. 단위중량 ${f.unit}kg/m에 길이를 곱한 값이고, 10개면 ${f.perTen}kg, 100개면 ${f.perHundred}kg입니다.` },
      { q: '1톤에 몇 개 들어가나요?', a: `${f.piecesPerTon}개입니다. 1000을 한 개 무게 ${f.perPiece}kg으로 나눈 값이고, 100개는 ${f.tonsPerHundred}톤입니다.` },
      { q: `단위중량 ${f.unit}kg/m는 어떻게 나온 값인가요?`, a: `단면적을 ${f.formula}로 구하면 ${f.area}mm²이고, 이것을 m²로 고쳐 밀도 7850kg/m³을 곱한 값입니다. 치수만 있으면 표 없이도 같은 값이 나옵니다.` },
    ],
    f => [
      { q: `How much does one ${steelName(f, 'en')} weigh?`, a: `${f.perPiece} kg — ${f.unit} kg/m times its length. Ten pieces come to ${f.perTen} kg and a hundred to ${f.perHundred} kg.` },
      { q: 'How many pieces make a tonne?', a: `${f.piecesPerTon}. That is 1000 divided by ${f.perPiece} kg, and 100 pieces weigh ${f.tonsPerHundred} t.` },
      { q: `Where does ${f.unit} kg/m come from?`, a: `The section is ${f.formula}, which gives ${f.area} mm²; convert that to m² and multiply by a density of 7850 kg/m³. With the dimensions in hand you get the same number without any table.` },
    ],
    f => [
      { q: `¿Cuánto pesa una pieza de ${steelName(f, 'es')}?`, a: `${nc(f.perPiece)} kg: ${nc(f.unit)} kg/m por su longitud. Diez piezas son ${nc(f.perTen)} kg y cien, ${nc(f.perHundred)} kg.` },
      { q: '¿Cuántas piezas hacen una tonelada?', a: `${f.piecesPerTon}. Es 1000 entre ${nc(f.perPiece)} kg, y 100 piezas pesan ${nc(f.tonsPerHundred)} t.` },
      { q: `¿De dónde salen los ${nc(f.unit)} kg/m?`, a: `La sección es ${f.formula}, que da ${nc(f.area)} mm²; se pasa a m² y se multiplica por una densidad de 7850 kg/m³. Con las medidas a mano sale el mismo número sin tabla alguna.` },
    ],
    f => [
      { q: `Quanto pesa uma peça de ${steelName(f, 'pt')}?`, a: `${nc(f.perPiece)} kg: ${nc(f.unit)} kg/m vezes o comprimento. Dez peças dão ${nc(f.perTen)} kg e cem, ${nc(f.perHundred)} kg.` },
      { q: 'Quantas peças fazem uma tonelada?', a: `${f.piecesPerTon}. É 1000 dividido por ${nc(f.perPiece)} kg, e 100 peças pesam ${nc(f.tonsPerHundred)} t.` },
      { q: `De onde vêm os ${nc(f.unit)} kg/m?`, a: `A seção é ${f.formula}, o que dá ${nc(f.area)} mm²; passa-se a m² e multiplica-se pela densidade de 7850 kg/m³. Com as medidas em mão sai o mesmo número sem tabela nenhuma.` },
    ],
    f => [
      { q: `${steelName(f, 'ja')}1本は何kgですか。`, a: `${f.perPiece}kgです。単位質量${f.unit}kg/mに長さを掛けた値で、10本なら${f.perTen}kg、100本なら${f.perHundred}kgです。` },
      { q: '1トンに何本入りますか。', a: `${f.piecesPerTon}本です。1000を1本${f.perPiece}kgで割った値で、100本は${f.tonsPerHundred}トンです。` },
      { q: `単位質量${f.unit}kg/mはどこから出た値ですか。`, a: `断面積を${f.formula}で求めると${f.area}mm²になり、これをm²に直して密度7850kg/m³を掛けた値です。寸法さえあれば表なしで同じ値が出ます。` },
    ],
    f => [
      { q: `Wie schwer ist ein Stück ${steelName(f, 'de')}?`, a: `${nc(f.perPiece)} kg — ${nc(f.unit)} kg/m mal seiner Länge. Zehn Stück sind ${nc(f.perTen)} kg, hundert ${nc(f.perHundred)} kg.` },
      { q: 'Wie viele Stück ergeben eine Tonne?', a: `${f.piecesPerTon}. Das sind 1000 geteilt durch ${nc(f.perPiece)} kg; 100 Stück wiegen ${nc(f.tonsPerHundred)} t.` },
      { q: `Woher kommen die ${nc(f.unit)} kg/m?`, a: `Der Querschnitt ist ${f.formula} und ergibt ${nc(f.area)} mm²; das wird in m² umgerechnet und mit einer Dichte von 7850 kg/m³ multipliziert. Mit den Maßen kommt dieselbe Zahl ganz ohne Tabelle heraus.` },
    ],
    f => [
      { q: `Combien pèse une pièce de ${steelName(f, 'fr')} ?`, a: `${nc(f.perPiece)} kg : ${nc(f.unit)} kg/m fois sa longueur. Dix pièces font ${nc(f.perTen)} kg et cent, ${nc(f.perHundred)} kg.` },
      { q: 'Combien de pièces font une tonne ?', a: `${f.piecesPerTon}. C’est 1000 divisé par ${nc(f.perPiece)} kg, et 100 pièces pèsent ${nc(f.tonsPerHundred)} t.` },
      { q: `D’où viennent les ${nc(f.unit)} kg/m ?`, a: `La section vaut ${f.formula}, soit ${nc(f.area)} mm² ; on la convertit en m² et on multiplie par une densité de 7850 kg/m³. Avec les dimensions, le même nombre sort sans aucune table.` },
    ],
    f => [
      { q: `${steelName(f, 'hi')} का एक टुकड़ा कितने kg का है?`, a: `${f.perPiece} kg — ${f.unit} kg/m गुणा उसकी लंबाई। दस टुकड़े ${f.perTen} kg और सौ टुकड़े ${f.perHundred} kg।` },
      { q: 'एक टन में कितने टुकड़े आते हैं?', a: `${f.piecesPerTon}। यह 1000 को ${f.perPiece} kg से भाग देने पर आता है, और 100 टुकड़े ${f.tonsPerHundred} टन के होते हैं।` },
      { q: `${f.unit} kg/m कहाँ से आया?`, a: `काट ${f.formula} से निकालने पर ${f.area} mm² होती है; उसे m² में बदलकर घनत्व 7850 kg/m³ से गुणा किया गया है। नाप हाथ में हो तो बिना किसी तालिका के वही मान निकलता है।` },
    ],
    f => [
      { q: `${steelName(f, 'zh')} 一件多重？`, a: `${f.perPiece} 千克 — 每米 ${f.unit} 千克乘它的长度。十件 ${f.perTen} 千克，一百件 ${f.perHundred} 千克。` },
      { q: '一吨装多少件？', a: `${f.piecesPerTon} 件。用 1000 除以一件 ${f.perPiece} 千克得到，100 件是 ${f.tonsPerHundred} 吨。` },
      { q: `每米 ${f.unit} 千克是怎么来的？`, a: `截面积按 ${f.formula} 求得 ${f.area}mm²，换成 m² 后再乘密度 7850kg/m³。只要有尺寸，不查表也能算出同一个值。` },
    ],
    f => [
      { q: `${steelName(f, 'tw')} 一件多重？`, a: `${f.perPiece} 公斤 — 每公尺 ${f.unit} 公斤乘它的長度。十件 ${f.perTen} 公斤，一百件 ${f.perHundred} 公斤。` },
      { q: '一公噸裝多少件？', a: `${f.piecesPerTon} 件。用 1000 除以一件 ${f.perPiece} 公斤得到，100 件是 ${f.tonsPerHundred} 公噸。` },
      { q: `每公尺 ${f.unit} 公斤是怎麼來的？`, a: `截面積按 ${f.formula} 求得 ${f.area}mm²，換成 m² 後再乘密度 7850kg/m³。只要有尺寸，不查表也能算出同一個值。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const STEEL_UI: L<SteelUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<SteelUI>;
