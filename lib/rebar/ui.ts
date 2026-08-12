/**
 * 철근 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "철근 무게는 표가 아니라 밀도에서 나온다"이다. 공칭지름이
 * 단면적을 정하고, 거기에 강의 밀도를 곱하면 단위중량이고, 길이와 개수를 곱하면
 * 총 중량이다. 널리 쓰이는 0.006165 계수도 그 식을 정리한 값일 뿐이다.
 *
 * ── 소수점 기호 ──────────────────────────────────────────
 * es·pt·de·fr는 소수점에 쉼표를 쓴다(0,995kg/m). 표와 본문이 어긋나면 같은 값이
 * 한 화면에서 두 얼굴이 되므로, 문장 안의 숫자는 nc()로 갈아 끼우고 화면 컴포넌트는
 * fmtNum()을 쓴다 — 두 곳이 같은 규칙 하나를 본다. 밀도 7850은 자리 구분 기호를
 * 아예 쓰지 않는다(독일어는 자리 구분에 점을 쓰므로, 넣으면 소수점과 헷갈린다).
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { RebarFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface RebarUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  barLabel: string;
  lengthLabel: string;
  diameterLabel: string;
  areaLabel: string;
  unitLabel: string;
  perBarLabel: string;
  perHundredLabel: string;
  perTonLabel: string;
  lapLabel: string;
  orderLabel: string;

  densityTitle: string;
  densityNote: string;
  nominalTitle: string;
  nominalNote: string;
  countTitle: string;
  countNote: string;
  orderTitle: string;
  orderNote: string;

  tableTitle: string;
  neighbourTitle: string;
  barRowTitle: string;
  lengthRowTitle: string;

  desc: (f: RebarFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: RebarFacts) => string;
  metaDesc: (f: RebarFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: RebarFacts) => FaqItem[];
}

/** 호칭은 열 언어 모두 D13 그대로다 — 옮겨 적는 언어가 없다 */
export const barName = (d: number): string => `D${d}`;

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

/** 문장 여러 곳에서 같은 이름을 쓴다 — "D13 6m" */
const label = (f: RebarFacts): string => `${barName(f.cell.d)} ${f.cell.length}m`;

type Spec = { [K in keyof RebarUI]: L<RebarUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('철근 물량', 'Rebar weight', 'Peso de varilla', 'Peso de barras de aço', '鉄筋の重量', 'Betonstahl-Gewicht', 'Poids des armatures', 'सरिया का वज़न', '钢筋重量', '鋼筋重量'),

  hubTitle: T(
    '철근 117칸 — D13 6m 한 가닥은 5.97kg',
    '117 rebar cells — a 6 m D13 bar weighs 5.97 kg',
    '117 casillas de varilla — una D13 de 6 m pesa 5,97 kg',
    '117 casas de barras de aço — uma D13 de 6 m pesa 5,97 kg',
    '鉄筋117マス — D13の6mは1本5.97kg',
    '117 Betonstahl-Felder — 6 m D13 wiegen 5,97 kg',
    '117 cases d’armatures — un D13 de 6 m pèse 5,97 kg',
    'सरिया के 117 खाने — 6 m का D13 सरिया 5.97 kg',
    '钢筋 117 格 — D13 的 6 米一根重 5.97 千克',
    '鋼筋 117 格 — D13 的 6 公尺一根重 5.97 公斤',
  ),

  hubLead: T(
    '규격 13가지와 길이 9가지가 만나는 칸마다 무게를 계산했습니다. 표를 외울 일이 아닙니다 — 공칭지름이 단면적을 정하고, 거기에 강의 밀도 7850kg/m³을 곱하면 단위중량이 나오며, 길이와 개수를 곱하면 총 중량이 됩니다.',
    'Every pairing of 13 bar sizes and 9 lengths, worked out as kilograms. There is no table to memorise — the nominal diameter fixes the cross-section, multiplying that by the density of steel, 7850 kg/m³, gives the weight per metre, and length times count gives the total.',
    'Cada cruce de 13 calibres y 9 longitudes, resuelto en kilogramos. No hay tabla que memorizar: el diámetro nominal fija la sección, multiplicarla por la densidad del acero, 7850 kg/m³, da el peso por metro, y longitud por cantidad da el total.',
    'Cada cruzamento de 13 bitolas e 9 comprimentos, resolvido em quilogramas. Não há tabela para decorar: o diâmetro nominal fixa a seção, multiplicá-la pela densidade do aço, 7850 kg/m³, dá o peso por metro, e comprimento vezes quantidade dá o total.',
    '呼び名13種と長さ9種が交わるマスごとに重さを計算しました。表を覚える話ではありません — 呼び径が断面積を決め、そこに鋼の密度7850kg/m³を掛けると単位質量になり、長さと本数を掛ければ総重量です。',
    'Jede Paarung aus 13 Größen und 9 Längen, ausgerechnet in Kilogramm. Es gibt keine Tabelle zu lernen — der Nenndurchmesser legt den Querschnitt fest, mal der Dichte von Stahl, 7850 kg/m³, ergibt das Gewicht je Meter, und Länge mal Anzahl ergibt die Gesamtmasse.',
    'Chaque croisement de 13 calibres et 9 longueurs, résolu en kilogrammes. Aucune table à retenir : le diamètre nominal fixe la section, multipliée par la densité de l’acier, 7850 kg/m³, elle donne le poids au mètre, et longueur fois quantité donne le total.',
    '13 मापों और 9 लंबाइयों के हर जोड़ का वज़न निकाला गया है। कोई तालिका याद करने की ज़रूरत नहीं — नाममात्र व्यास काट का क्षेत्र तय करता है, उसे स्टील के घनत्व 7850 kg/m³ से गुणा करने पर प्रति मीटर वज़न मिलता है, और लंबाई गुणा संख्या से कुल वज़न।',
    '13 种规格与 9 种长度相交的每一格，都算出了重量。这不是背表的事 — 公称直径定下截面积，乘上钢的密度 7850kg/m³ 就是每米重量，再乘长度和根数就是总重。',
    '13 種規格與 9 種長度相交的每一格，都算出了重量。這不是背表的事 — 標稱直徑定下截面積，乘上鋼的密度 7850kg/m³ 就是每公尺重量，再乘長度和根數就是總重。',
  ),

  barLabel: T('규격', 'Bar size', 'Calibre', 'Bitola', '呼び名', 'Größe', 'Calibre', 'माप', '规格', '規格'),
  lengthLabel: T('길이', 'Length', 'Longitud', 'Comprimento', '長さ', 'Länge', 'Longueur', 'लंबाई', '长度', '長度'),
  diameterLabel: T('공칭지름', 'Nominal diameter', 'Diámetro nominal', 'Diâmetro nominal', '呼び径', 'Nenndurchmesser', 'Diamètre nominal', 'नाममात्र व्यास', '公称直径', '標稱直徑'),
  areaLabel: T('단면적', 'Cross-section', 'Sección', 'Seção', '断面積', 'Querschnitt', 'Section', 'काट का क्षेत्र', '截面积', '截面積'),
  unitLabel: T('단위중량', 'Weight per metre', 'Peso por metro', 'Peso por metro', '単位質量', 'Gewicht je Meter', 'Poids au mètre', 'प्रति मीटर वज़न', '每米重量', '每公尺重量'),
  perBarLabel: T('한 가닥 무게', 'Weight per bar', 'Peso por varilla', 'Peso por barra', '1本の重さ', 'Gewicht je Stab', 'Poids par barre', 'प्रति सरिया वज़न', '每根重量', '每根重量'),
  perHundredLabel: T('100가닥', '100 bars', '100 varillas', '100 barras', '100本', '100 Stäbe', '100 barres', '100 सरिये', '100 根', '100 根'),
  perTonLabel: T('1톤에 몇 가닥', 'Bars per tonne', 'Varillas por tonelada', 'Barras por tonelada', '1トンあたりの本数', 'Stäbe je Tonne', 'Barres par tonne', 'प्रति टन सरिये', '每吨根数', '每公噸根數'),
  lapLabel: T('겹침이음', 'Lap splice', 'Traslape', 'Traspasse', '重ね継手', 'Übergreifungsstoß', 'Recouvrement', 'लैप जोड़', '搭接长度', '搭接長度'),
  orderLabel: T('발주 무게', 'Order weight', 'Peso a pedir', 'Peso a pedir', '発注重量', 'Bestellgewicht', 'Poids à commander', 'ऑर्डर वज़न', '订货重量', '訂貨重量'),

  densityTitle: T('단위중량은 밀도에서 나온다', 'The weight per metre comes out of the density', 'El peso por metro sale de la densidad', 'O peso por metro sai da densidade', '単位質量は密度から出る', 'Das Gewicht je Meter kommt aus der Dichte', 'Le poids au mètre vient de la densité', 'प्रति मीटर वज़न घनत्व से निकलता है', '每米重量出自密度', '每公尺重量出自密度'),
  densityNote: T(
    '철근은 단면이 원인 긴 막대라 1미터의 부피가 정해져 있고, 그 무게는 부피에 강의 밀도 7850kg/m³을 곱한 값입니다. 그래서 단위중량은 π/4 × 공칭지름² × 7850 ÷ 10⁶이고, 현장에서 쓰는 0.006165 × 지름² 계수가 바로 이 식을 정리한 값입니다. 계수를 외우는 대신 어디서 나온 것인지 알면 규격표가 없어도 어떤 지름이든 셀 수 있습니다.',
    'Rebar is a long bar with a round cross-section, so the volume of one metre is fixed, and its weight is that volume times the density of steel, 7850 kg/m³. The weight per metre is therefore π/4 × diameter² × 7850 ÷ 10⁶, and the 0.006165 × diameter² shortcut used on site is nothing but that formula tidied up. Knowing where the number came from beats memorising it: any diameter can be worked out without a table.',
    'La varilla es una barra de sección circular, así que el volumen de un metro está fijado y su peso es ese volumen por la densidad del acero, 7850 kg/m³. El peso por metro es π/4 × diámetro² × 7850 ÷ 10⁶, y el atajo de obra 0,006165 × diámetro² no es más que esa fórmula ordenada. Saber de dónde sale el número vale más que memorizarlo: cualquier diámetro se calcula sin tabla.',
    'A barra de aço é uma peça de seção circular: o volume de um metro é fixo e o peso é esse volume vezes a densidade do aço, 7850 kg/m³. O peso por metro é π/4 × diâmetro² × 7850 ÷ 10⁶, e o atalho de obra 0,006165 × diâmetro² é só essa fórmula arrumada. Saber de onde vem o número vale mais que decorá-lo: qualquer diâmetro sai sem tabela.',
    '鉄筋は断面が円の長い棒なので1メートルの体積は決まっていて、その重さは体積に鋼の密度7850kg/m³を掛けた値です。つまり単位質量はπ/4 × 呼び径² × 7850 ÷ 10⁶であり、現場で使う0.006165 × 径²の係数はこの式を整理しただけのものです。係数を覚えるより出どころを知っておけば、規格表がなくてもどの径でも計算できます。',
    'Betonstahl ist ein Stab mit rundem Querschnitt: Das Volumen eines Meters steht fest, sein Gewicht ist dieses Volumen mal der Dichte von Stahl, 7850 kg/m³. Das Gewicht je Meter ist also π/4 × Durchmesser² × 7850 ÷ 10⁶, und der auf der Baustelle benutzte Faktor 0,006165 × Durchmesser² ist nur diese Formel aufgeräumt. Die Herkunft der Zahl zu kennen ist mehr wert als sie zu lernen — jeder Durchmesser geht dann ohne Tabelle.',
    'Le fer à béton est une barre de section circulaire : le volume d’un mètre est fixé, son poids est ce volume multiplié par la densité de l’acier, 7850 kg/m³. Le poids au mètre vaut donc π/4 × diamètre² × 7850 ÷ 10⁶, et le raccourci de chantier 0,006165 × diamètre² n’est que cette formule mise au propre. Savoir d’où vient le nombre vaut mieux que de l’apprendre : n’importe quel diamètre se calcule sans table.',
    'सरिया गोल काट वाली लंबी छड़ है, इसलिए एक मीटर का आयतन तय है और उसका वज़न उस आयतन को स्टील के घनत्व 7850 kg/m³ से गुणा करने पर मिलता है। यानी प्रति मीटर वज़न π/4 × व्यास² × 7850 ÷ 10⁶ है, और साइट पर चलने वाला 0.006165 × व्यास² वाला गुणक इसी सूत्र का सजा हुआ रूप है। गुणक रटने से बेहतर है यह जानना कि वह कहाँ से आया — फिर किसी भी व्यास का हिसाब बिना तालिका हो जाता है।',
    '钢筋是截面为圆的长棒，一米的体积是固定的，重量等于体积乘以钢的密度 7850kg/m³。所以每米重量就是 π/4 × 公称直径² × 7850 ÷ 10⁶，工地上常用的 0.006165 × 直径² 只是把这个式子整理了一遍。与其背系数，不如知道它从哪来 — 没有规格表也能算任何直径。',
    '鋼筋是截面為圓的長棒，一公尺的體積是固定的，重量等於體積乘以鋼的密度 7850kg/m³。所以每公尺重量就是 π/4 × 標稱直徑² × 7850 ÷ 10⁶，工地上常用的 0.006165 × 直徑² 只是把這個式子整理了一遍。與其背係數，不如知道它從哪來 — 沒有規格表也能算任何直徑。',
  ),

  nominalTitle: T('호칭 D13과 공칭지름 12.7mm는 다른 값이다', 'D13 is a name, 12.7 mm is the diameter', 'D13 es un nombre, 12,7 mm es el diámetro', 'D13 é um nome, 12,7 mm é o diâmetro', '呼び名D13と呼び径12.7mmは別の値', 'D13 ist ein Name, 12,7 mm ist der Durchmesser', 'D13 est un nom, 12,7 mm est le diamètre', 'D13 नाम है, व्यास 12.7 mm है', 'D13 是名称，直径是 12.7mm', 'D13 是名稱，直徑是 12.7mm'),
  nominalNote: T(
    'D13의 13은 이름이고, 셈에 넣는 공칭지름은 12.7mm입니다(1/2인치에서 온 값입니다). 이름의 숫자를 그대로 넣으면 1.042kg/m가 나와 규격값 0.995kg/m보다 5% 무겁게 셉니다. 마디가 도드라진 철근을 매끈한 원기둥으로 셀 수 있는 것도 같은 이유입니다 — 규격이 실제 무게에 맞도록 공칭지름을 따로 정해 두었기 때문입니다.',
    'The 13 in D13 is a label; the diameter that goes into the formula is 12.7 mm, inherited from a half inch. Feed the label into the formula and you get 1.042 kg/m, 5 % heavier than the standard value of 0.995 kg/m. The same choice is why a ribbed bar can be treated as a smooth cylinder at all: the standard sets the nominal diameter so that it reproduces the real mass.',
    'El 13 de D13 es una etiqueta; el diámetro que entra en la fórmula es 12,7 mm, heredado de media pulgada. Si metes la etiqueta salen 1,042 kg/m, un 5 % más que el valor normalizado de 0,995 kg/m. Por lo mismo se puede tratar una varilla corrugada como un cilindro liso: la norma fija el diámetro nominal para que reproduzca la masa real.',
    'O 13 de D13 é um rótulo; o diâmetro que entra na fórmula é 12,7 mm, herdado de meia polegada. Se você usar o rótulo, saem 1,042 kg/m, 5 % acima do valor normalizado de 0,995 kg/m. É pelo mesmo motivo que uma barra nervurada pode ser tratada como cilindro liso: a norma fixa o diâmetro nominal para reproduzir a massa real.',
    'D13の13は名前で、式に入れる呼び径は12.7mmです(1/2インチ由来の値です)。名前の数字をそのまま入れると1.042kg/mになり、規格値0.995kg/mより5%重く出ます。節のある鉄筋を滑らかな円柱として計算できるのも同じ理由です — 規格が実際の質量に合うように呼び径を定めているからです。',
    'Die 13 in D13 ist eine Bezeichnung; in die Formel geht der Nenndurchmesser 12,7 mm ein, ein halbes Zoll. Setzt man die Bezeichnung ein, kommen 1,042 kg/m heraus — 5 % mehr als der Normwert 0,995 kg/m. Aus demselben Grund darf man einen gerippten Stab wie einen glatten Zylinder rechnen: Die Norm legt den Nenndurchmesser so fest, dass er die wirkliche Masse trifft.',
    'Le 13 de D13 est une étiquette ; le diamètre qui entre dans la formule vaut 12,7 mm, hérité du demi-pouce. Avec l’étiquette on obtient 1,042 kg/m, soit 5 % de plus que la valeur normalisée de 0,995 kg/m. C’est aussi pourquoi une barre crénelée se calcule comme un cylindre lisse : la norme fixe le diamètre nominal pour retrouver la masse réelle.',
    'D13 का 13 नाम है; सूत्र में जाने वाला नाममात्र व्यास 12.7 mm है (आधे इंच से आया)। नाम का अंक डालें तो 1.042 kg/m निकलता है, जो मानक मान 0.995 kg/m से 5% भारी है। इसी कारण उभरी पसलियों वाले सरिये को चिकने बेलन की तरह गिना जा सकता है — मानक नाममात्र व्यास इसी तरह तय करता है कि असली वज़न मिल जाए।',
    'D13 里的 13 是名称，进式子的公称直径是 12.7mm（来自二分之一英寸）。把名称的数字直接代入会得到 1.042kg/m，比标准值 0.995kg/m 重了 5%。带肋的钢筋能当作光滑圆柱来算，也是同一个道理 — 标准把公称直径定成能还原真实质量的值。',
    'D13 裡的 13 是名稱，進式子的標稱直徑是 12.7mm（來自二分之一英寸）。把名稱的數字直接代入會得到 1.042kg/m，比標準值 0.995kg/m 重了 5%。帶肋的鋼筋能當作光滑圓柱來算，也是同一個道理 — 標準把標稱直徑定成能還原真實質量的值。',
  ),

  countTitle: T('길이와 개수를 곱하면 총 중량이다', 'Length times count is the total', 'Longitud por cantidad es el total', 'Comprimento vezes quantidade é o total', '長さと本数を掛ければ総重量', 'Länge mal Anzahl ist die Gesamtmasse', 'Longueur fois quantité donne le total', 'लंबाई गुणा संख्या ही कुल वज़न है', '长度乘根数就是总重', '長度乘根數就是總重'),
  countNote: T(
    '단위중량이 나오면 나머지는 곱셈입니다. D13 6m 한 가닥은 0.995 × 6 = 5.97kg이고, 100가닥이면 597kg, 1톤에는 167가닥이 들어갑니다. 거꾸로 실려 온 무게를 단위중량으로 나누면 총 길이가 나오므로, 도면 없이도 받은 양을 저울로 확인할 수 있습니다.',
    'Once the weight per metre is known, the rest is multiplication. A 6 m D13 bar is 0.995 × 6 = 5.97 kg, a hundred of them come to 597 kg, and a tonne holds 167 bars. Run it backwards — delivered weight divided by the weight per metre — and you get total length, so a weighbridge alone can check what arrived.',
    'Con el peso por metro, lo demás es multiplicar. Una D13 de 6 m son 0,995 × 6 = 5,97 kg, cien varillas 597 kg y en una tonelada entran 167. Al revés, el peso recibido dividido entre el peso por metro da la longitud total: una báscula basta para comprobar lo que llegó.',
    'Com o peso por metro, o resto é multiplicar. Uma D13 de 6 m dá 0,995 × 6 = 5,97 kg, cem barras 597 kg e em uma tonelada cabem 167. Ao contrário, o peso recebido dividido pelo peso por metro dá o comprimento total: uma balança basta para conferir o que chegou.',
    '単位質量が出れば、あとは掛け算です。D13の6mは0.995 × 6 = 5.97kg、100本で597kg、1トンには167本入ります。逆に、届いた重さを単位質量で割れば総延長が出るので、図面がなくてもはかりだけで受け入れ量を確かめられます。',
    'Ist das Gewicht je Meter bekannt, bleibt nur Multiplizieren. Ein 6-m-Stab D13 wiegt 0,995 × 6 = 5,97 kg, hundert Stäbe 597 kg, und in eine Tonne gehen 167. Umgekehrt: geliefertes Gewicht geteilt durch das Gewicht je Meter ergibt die Gesamtlänge — eine Waage genügt zur Kontrolle.',
    'Une fois le poids au mètre connu, le reste est une multiplication. Un D13 de 6 m fait 0,995 × 6 = 5,97 kg, cent barres 597 kg, et une tonne en contient 167. À l’inverse, le poids livré divisé par le poids au mètre donne la longueur totale : une bascule suffit à vérifier la livraison.',
    'प्रति मीटर वज़न मिल जाए तो बाकी गुणा भर है। 6 m का D13 सरिया 0.995 × 6 = 5.97 kg है, सौ सरिये 597 kg, और एक टन में 167 सरिये आते हैं। उलटा करें — आए हुए वज़न को प्रति मीटर वज़न से भाग दें — तो कुल लंबाई मिलती है, यानी तराज़ू से ही आवक जाँची जा सकती है।',
    '每米重量一出，剩下的就是乘法。D13 的 6 米一根是 0.995 × 6 = 5.97 千克，一百根 597 千克，一吨装得下 167 根。反过来，把到货重量除以每米重量就是总长度 — 光靠地磅也能核对收了多少。',
    '每公尺重量一出，剩下的就是乘法。D13 的 6 公尺一根是 0.995 × 6 = 5.97 公斤，一百根 597 公斤，一公噸裝得下 167 根。反過來，把到貨重量除以每公尺重量就是總長度 — 光靠地磅也能核對收了多少。',
  ),

  orderTitle: T('발주 물량은 이음과 로스를 더한 값이다', 'Ordered tonnage adds splices and waste', 'El pedido suma traslapes y merma', 'O pedido soma traspasses e perda', '発注量は継手とロスを足した値', 'Die Bestellmenge enthält Stöße und Verschnitt', 'La commande ajoute recouvrements et chutes', 'ऑर्डर में जोड़ और बर्बादी जुड़ती है', '订货量要加上搭接和损耗', '訂貨量要加上搭接和損耗'),
  orderNote: T(
    '도면에서 뽑은 길이는 순 길이입니다. 겹침이음 한 곳마다 지름의 40배가 더 들어가고(D13이면 0.508m), 자르고 남는 토막까지 보면 3~5%가 더 필요합니다. 이 표는 로스 5%를 얹은 무게를 함께 적습니다 — 40배는 어림이고, 실제 이음 길이는 콘크리트 강도와 철근 등급으로 설계도가 정합니다.',
    'Lengths taken off a drawing are net. Every lap splice adds about 40 diameters — 0.508 m for a D13 — and offcuts push the order 3 to 5 % higher. Each cell here also lists the weight with 5 % waste added. Forty diameters is a rule of thumb: the real lap length is set by the drawing, following the concrete strength and the steel grade.',
    'Las longitudes de plano son netas. Cada traslape añade unos 40 diámetros (0,508 m en una D13) y los recortes suben el pedido entre un 3 y un 5 %. Cada casilla indica también el peso con un 5 % de merma. Los 40 diámetros son una regla práctica: la longitud real la fija el plano según la resistencia del hormigón y el grado del acero.',
    'Os comprimentos do projeto são líquidos. Cada traspasse acrescenta cerca de 40 diâmetros (0,508 m numa D13) e as sobras elevam o pedido de 3 a 5 %. Cada casa traz também o peso com 5 % de perda. Os 40 diâmetros são uma regra prática: o comprimento real vem do projeto, conforme a resistência do concreto e a categoria do aço.',
    '図面から拾った長さは正味です。重ね継手1か所ごとに径の40倍が加わり(D13なら0.508m)、切り落としを見れば3~5%は余分に要ります。この表はロス5%を足した重さも並べています — 40倍は目安で、実際の継手長さはコンクリート強度と鉄筋の種類から設計図が決めます。',
    'Längen aus der Zeichnung sind Nettomaße. Jeder Übergreifungsstoß bringt rund 40 Durchmesser dazu (bei D13 sind das 0,508 m), und mit Verschnitt liegt die Bestellung 3 bis 5 % höher. Jedes Feld nennt darum auch das Gewicht mit 5 % Verschnitt. Die 40 Durchmesser sind ein Richtwert — die wirkliche Stoßlänge legt die Zeichnung nach Betonfestigkeit und Stahlsorte fest.',
    'Les longueurs relevées sur un plan sont nettes. Chaque recouvrement ajoute environ 40 diamètres (0,508 m pour un D13) et les chutes font monter la commande de 3 à 5 %. Chaque case donne donc aussi le poids avec 5 % de chutes. Les 40 diamètres sont un ordre de grandeur : la longueur réelle est fixée par le plan, selon la résistance du béton et la nuance d’acier.',
    'नक़्शे से निकाली लंबाई शुद्ध होती है। हर लैप जोड़ पर व्यास का 40 गुना और जुड़ता है (D13 में 0.508 m), और कटाई का बचा टुकड़ा देखें तो 3–5% ज़्यादा चाहिए। यहाँ हर खाने में 5% बर्बादी जोड़ा वज़न भी दिया है — 40 गुना अनुमान है, असली जोड़ लंबाई कंक्रीट की मज़बूती और स्टील की श्रेणी से नक़्शा तय करता है।',
    '图纸上量出的长度是净长。每处搭接要多加约 40 倍直径（D13 是 0.508 米），再算上切下的余料，订货要多出 3~5%。这里每一格还列出加了 5% 损耗的重量 — 40 倍只是估数，真正的搭接长度由图纸按混凝土强度和钢筋等级定。',
    '圖紙上量出的長度是淨長。每處搭接要多加約 40 倍直徑（D13 是 0.508 公尺），再算上切下的餘料，訂貨要多出 3~5%。這裡每一格還列出加了 5% 損耗的重量 — 40 倍只是估數，真正的搭接長度由圖紙按混凝土強度和鋼筋等級定。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के खाने', '相邻组合', '相鄰組合'),
  barRowTitle: T('같은 규격의 다른 길이', 'Same size, other lengths', 'Mismo calibre, otras longitudes', 'Mesma bitola, outros comprimentos', '同じ呼び名の他の長さ', 'Gleiche Größe, andere Längen', 'Même calibre, autres longueurs', 'वही माप, दूसरी लंबाई', '同一规格的其他长度', '同一規格的其他長度'),
  lengthRowTitle: T('같은 길이의 다른 규격', 'Same length, other sizes', 'Misma longitud, otros calibres', 'Mesmo comprimento, outras bitolas', '同じ長さの他の呼び名', 'Gleiche Länge, andere Größen', 'Même longueur, autres calibres', 'वही लंबाई, दूसरे माप', '同一长度的其他规格', '同一長度的其他規格'),

  desc: T<(f: RebarFacts) => string>(
    f => `${label(f)} 철근은 한 가닥이 ${f.perBar}kg입니다. 단위중량 ${f.unit}kg/m는 공칭지름 ${f.bar.mm}mm의 단면적 ${f.area}mm²에 밀도 7850kg/m³을 곱해 나온 값이고, 100가닥이면 ${f.perHundred}kg, 1톤에는 ${f.barsPerTon}가닥이 들어갑니다.`,
    f => `A ${label(f)} bar weighs ${f.perBar} kg. The ${f.unit} kg/m comes from the ${f.area} mm² cross-section of a ${f.bar.mm} mm nominal diameter times a density of 7850 kg/m³, so 100 bars are ${f.perHundred} kg and a tonne holds ${f.barsPerTon} bars.`,
    f => `Una varilla ${label(f)} pesa ${nc(f.perBar)} kg. Los ${nc(f.unit)} kg/m salen de la sección de ${nc(f.area)} mm² de un diámetro nominal de ${nc(f.bar.mm)} mm por una densidad de 7850 kg/m³: 100 varillas son ${nc(f.perHundred)} kg y en una tonelada entran ${f.barsPerTon}.`,
    f => `Uma barra ${label(f)} pesa ${nc(f.perBar)} kg. Os ${nc(f.unit)} kg/m vêm da seção de ${nc(f.area)} mm² de um diâmetro nominal de ${nc(f.bar.mm)} mm vezes a densidade de 7850 kg/m³: 100 barras dão ${nc(f.perHundred)} kg e em uma tonelada cabem ${f.barsPerTon}.`,
    f => `${label(f)}の鉄筋は1本${f.perBar}kgです。単位質量${f.unit}kg/mは呼び径${f.bar.mm}mmの断面積${f.area}mm²に密度7850kg/m³を掛けた値で、100本なら${f.perHundred}kg、1トンには${f.barsPerTon}本入ります。`,
    f => `Ein Stab ${label(f)} wiegt ${nc(f.perBar)} kg. Die ${nc(f.unit)} kg/m ergeben sich aus dem Querschnitt von ${nc(f.area)} mm² bei ${nc(f.bar.mm)} mm Nenndurchmesser mal einer Dichte von 7850 kg/m³: 100 Stäbe sind ${nc(f.perHundred)} kg, in eine Tonne gehen ${f.barsPerTon}.`,
    f => `Une barre ${label(f)} pèse ${nc(f.perBar)} kg. Les ${nc(f.unit)} kg/m viennent de la section de ${nc(f.area)} mm² d’un diamètre nominal de ${nc(f.bar.mm)} mm multipliée par une densité de 7850 kg/m³ : 100 barres font ${nc(f.perHundred)} kg et une tonne en contient ${f.barsPerTon}.`,
    f => `${label(f)} सरिये का एक टुकड़ा ${f.perBar} kg का है। ${f.unit} kg/m ${f.bar.mm} mm नाममात्र व्यास की ${f.area} mm² काट को घनत्व 7850 kg/m³ से गुणा करने पर आता है, इसलिए 100 सरिये ${f.perHundred} kg और एक टन में ${f.barsPerTon} सरिये।`,
    f => `${label(f)} 钢筋一根重 ${f.perBar} 千克。每米 ${f.unit} 千克来自公称直径 ${f.bar.mm}mm 的截面积 ${f.area}mm² 乘以密度 7850kg/m³，所以 100 根是 ${f.perHundred} 千克，一吨装 ${f.barsPerTon} 根。`,
    f => `${label(f)} 鋼筋一根重 ${f.perBar} 公斤。每公尺 ${f.unit} 公斤來自標稱直徑 ${f.bar.mm}mm 的截面積 ${f.area}mm² 乘以密度 7850kg/m³，所以 100 根是 ${f.perHundred} 公斤，一公噸裝 ${f.barsPerTon} 根。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '단위중량(kg/m)은 π/4 × 공칭지름² × 7850 ÷ 10⁶입니다 — 0.006165 계수가 이 식입니다.',
      '식에 넣는 것은 호칭 숫자가 아니라 공칭지름입니다. D13은 12.7mm입니다.',
      '총 중량은 단위중량 × 길이 × 개수이고, 지름이 2배면 무게는 4배가 됩니다.',
      '발주 물량에는 겹침이음(지름의 40배쯤)과 로스 3~5%를 더합니다.',
    ],
    [
      'Weight per metre (kg/m) is π/4 × nominal diameter² × 7850 ÷ 10⁶ — that is the 0.006165 factor.',
      'What goes into the formula is the nominal diameter, not the label: D13 means 12.7 mm.',
      'Total weight is weight per metre × length × count, and doubling the diameter quadruples the weight.',
      'An order adds lap splices, roughly 40 diameters each, and 3 to 5 % for waste.',
    ],
    [
      'El peso por metro (kg/m) es π/4 × diámetro nominal² × 7850 ÷ 10⁶: ese es el factor 0,006165.',
      'En la fórmula entra el diámetro nominal, no la etiqueta: D13 significa 12,7 mm.',
      'El peso total es peso por metro × longitud × cantidad, y al doblar el diámetro el peso se cuadruplica.',
      'El pedido suma los traslapes, unos 40 diámetros cada uno, y un 3 a 5 % de merma.',
    ],
    [
      'O peso por metro (kg/m) é π/4 × diâmetro nominal² × 7850 ÷ 10⁶: é esse o fator 0,006165.',
      'Na fórmula entra o diâmetro nominal, não o rótulo: D13 quer dizer 12,7 mm.',
      'O peso total é peso por metro × comprimento × quantidade, e dobrar o diâmetro quadruplica o peso.',
      'O pedido soma os traspasses, cerca de 40 diâmetros cada, e 3 a 5 % de perda.',
    ],
    [
      '単位質量(kg/m)はπ/4 × 呼び径² × 7850 ÷ 10⁶です — 0.006165の係数がこの式です。',
      '式に入れるのは呼び名の数字ではなく呼び径です。D13は12.7mmです。',
      '総重量は単位質量 × 長さ × 本数で、径が2倍になれば重さは4倍です。',
      '発注量には重ね継手(径の40倍ほど)とロス3~5%を足します。',
    ],
    [
      'Gewicht je Meter (kg/m) ist π/4 × Nenndurchmesser² × 7850 ÷ 10⁶ — das ist der Faktor 0,006165.',
      'In die Formel geht der Nenndurchmesser, nicht die Bezeichnung: D13 heißt 12,7 mm.',
      'Die Gesamtmasse ist Gewicht je Meter × Länge × Anzahl; doppelter Durchmesser heißt vierfaches Gewicht.',
      'Zur Bestellung kommen Übergreifungsstöße von je etwa 40 Durchmessern und 3 bis 5 % Verschnitt.',
    ],
    [
      'Le poids au mètre (kg/m) vaut π/4 × diamètre nominal² × 7850 ÷ 10⁶ : c’est le facteur 0,006165.',
      'Dans la formule entre le diamètre nominal, pas l’étiquette : D13 veut dire 12,7 mm.',
      'Le poids total est poids au mètre × longueur × quantité, et doubler le diamètre quadruple le poids.',
      'La commande ajoute les recouvrements, environ 40 diamètres chacun, et 3 à 5 % de chutes.',
    ],
    [
      'प्रति मीटर वज़न (kg/m) = π/4 × नाममात्र व्यास² × 7850 ÷ 10⁶ — यही 0.006165 गुणक है।',
      'सूत्र में नाम का अंक नहीं, नाममात्र व्यास जाता है: D13 का मतलब 12.7 mm।',
      'कुल वज़न = प्रति मीटर वज़न × लंबाई × संख्या, और व्यास दुगुना हो तो वज़न चौगुना।',
      'ऑर्डर में लैप जोड़ (हर एक लगभग 40 व्यास) और 3–5% बर्बादी जोड़ें।',
    ],
    [
      '每米重量（kg/m）= π/4 × 公称直径² × 7850 ÷ 10⁶ — 这就是 0.006165 这个系数。',
      '代入式子的是公称直径，不是名称：D13 指 12.7mm。',
      '总重 = 每米重量 × 长度 × 根数，直径翻倍，重量变四倍。',
      '订货量还要加上搭接（每处约 40 倍直径）和 3~5% 的损耗。',
    ],
    [
      '每公尺重量（kg/m）= π/4 × 標稱直徑² × 7850 ÷ 10⁶ — 這就是 0.006165 這個係數。',
      '代入式子的是標稱直徑，不是名稱：D13 指 12.7mm。',
      '總重 = 每公尺重量 × 長度 × 根數，直徑翻倍，重量變四倍。',
      '訂貨量還要加上搭接（每處約 40 倍直徑）和 3~5% 的損耗。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '철근 단위중량표 117칸 — 규격과 길이별 무게',
    'Rebar weight chart — kilograms by bar size and length',
    'Tabla de peso de varilla — kilogramos por calibre y longitud',
    'Tabela de peso de barras de aço — quilos por bitola e comprimento',
    '鉄筋単位質量表117マス — 呼び名と長さ別の重さ',
    'Betonstahl-Gewichtstabelle — Kilogramm nach Größe und Länge',
    'Table des poids d’armatures — kilogrammes par calibre et longueur',
    'सरिया वज़न तालिका — माप और लंबाई के अनुसार किलोग्राम',
    '钢筋重量表 117 格 — 按规格和长度的公斤数',
    '鋼筋重量表 117 格 — 按規格和長度的公斤數',
  ),
  hubMetaDesc: T(
    'D6부터 D51까지 규격 13가지와 길이 9가지가 만나는 117칸. 단위중량이 밀도에서 나오는 과정, 한 가닥 무게와 1톤당 가닥 수, 겹침이음과 로스를 얹은 발주 물량까지 함께 봅니다.',
    'The 117 pairings of 13 bar sizes from D6 to D51 and 9 lengths: how the weight per metre falls out of the density, the weight of one bar, how many bars make a tonne, and the ordered weight once splices and waste are added.',
    'Los 117 cruces de 13 calibres de D6 a D51 y 9 longitudes: cómo sale el peso por metro de la densidad, el peso de una varilla, cuántas hacen una tonelada y el peso a pedir con traslapes y merma.',
    'Os 117 cruzamentos de 13 bitolas de D6 a D51 e 9 comprimentos: como o peso por metro sai da densidade, o peso de uma barra, quantas fazem uma tonelada e o peso a pedir com traspasses e perda.',
    'D6からD51まで呼び名13種と長さ9種が交わる117マス。単位質量が密度から出る筋道、1本の重さ、1トンあたりの本数、継手とロスを足した発注量まで。',
    'Die 117 Paarungen aus 13 Größen von D6 bis D51 und 9 Längen: wie das Gewicht je Meter aus der Dichte folgt, was ein Stab wiegt, wie viele eine Tonne ergeben und welches Gewicht mit Stößen und Verschnitt bestellt wird.',
    'Les 117 croisements de 13 calibres de D6 à D51 et 9 longueurs : comment le poids au mètre découle de la densité, le poids d’une barre, combien font une tonne, et le poids à commander avec recouvrements et chutes.',
    'D6 से D51 तक 13 मापों और 9 लंबाइयों के 117 जोड़: प्रति मीटर वज़न घनत्व से कैसे निकलता है, एक सरिये का वज़न, एक टन में कितने, और जोड़ व बर्बादी सहित ऑर्डर वज़न।',
    'D6 到 D51 共 13 种规格与 9 种长度组成的 117 格：每米重量如何从密度得出、一根有多重、一吨多少根，以及加上搭接和损耗后的订货重量。',
    'D6 到 D51 共 13 種規格與 9 種長度組成的 117 格：每公尺重量如何從密度得出、一根有多重、一公噸多少根，以及加上搭接和損耗後的訂貨重量。',
  ),

  metaTitle: T<(f: RebarFacts) => string>(
    f => `${label(f)} 철근 무게 — 한 가닥 ${f.perBar}kg`,
    f => `${label(f)} rebar — ${f.perBar} kg per bar`,
    f => `Varilla ${label(f)} — ${nc(f.perBar)} kg por varilla`,
    f => `Barra ${label(f)} — ${nc(f.perBar)} kg por barra`,
    f => `${label(f)} 鉄筋の重さ — 1本${f.perBar}kg`,
    f => `Betonstahl ${label(f)} — ${nc(f.perBar)} kg je Stab`,
    f => `Fer à béton ${label(f)} — ${nc(f.perBar)} kg par barre`,
    f => `${label(f)} सरिया — प्रति सरिया ${f.perBar} kg`,
    f => `${label(f)} 钢筋重量 — 每根 ${f.perBar} 千克`,
    f => `${label(f)} 鋼筋重量 — 每根 ${f.perBar} 公斤`,
  ),

  metaDesc: T<(f: RebarFacts) => string>(
    f => `${barName(f.cell.d)}(공칭지름 ${f.bar.mm}mm) ${f.cell.length}m는 한 가닥 ${f.perBar}kg, 100가닥 ${f.perHundred}kg, 1톤에 ${f.barsPerTon}가닥입니다. 단위중량 ${f.unit}kg/m는 단면적 ${f.area}mm²에 밀도 7850kg/m³을 곱한 값이고, 겹침이음 한 곳에 ${f.lapMetres}m가 더 듭니다.`,
    f => `${barName(f.cell.d)} at a nominal ${f.bar.mm} mm, cut to ${f.cell.length} m: ${f.perBar} kg per bar, ${f.perHundred} kg per 100, ${f.barsPerTon} bars to the tonne. The ${f.unit} kg/m is the ${f.area} mm² cross-section times a density of 7850 kg/m³, and each lap splice adds ${f.lapMetres} m.`,
    f => `${barName(f.cell.d)} (diámetro nominal ${nc(f.bar.mm)} mm) de ${f.cell.length} m: ${nc(f.perBar)} kg por varilla, ${nc(f.perHundred)} kg cada 100 y ${f.barsPerTon} varillas por tonelada. Los ${nc(f.unit)} kg/m son la sección de ${nc(f.area)} mm² por una densidad de 7850 kg/m³, y cada traslape añade ${nc(f.lapMetres)} m.`,
    f => `${barName(f.cell.d)} (diâmetro nominal ${nc(f.bar.mm)} mm) de ${f.cell.length} m: ${nc(f.perBar)} kg por barra, ${nc(f.perHundred)} kg a cada 100 e ${f.barsPerTon} barras por tonelada. Os ${nc(f.unit)} kg/m são a seção de ${nc(f.area)} mm² vezes a densidade de 7850 kg/m³, e cada traspasse acrescenta ${nc(f.lapMetres)} m.`,
    f => `${barName(f.cell.d)}(呼び径${f.bar.mm}mm)の${f.cell.length}mは1本${f.perBar}kg、100本で${f.perHundred}kg、1トンに${f.barsPerTon}本です。単位質量${f.unit}kg/mは断面積${f.area}mm²に密度7850kg/m³を掛けた値で、重ね継手1か所に${f.lapMetres}mが加わります。`,
    f => `${barName(f.cell.d)} mit ${nc(f.bar.mm)} mm Nenndurchmesser, ${f.cell.length} m lang: ${nc(f.perBar)} kg je Stab, ${nc(f.perHundred)} kg je 100 Stück, ${f.barsPerTon} Stäbe auf die Tonne. Die ${nc(f.unit)} kg/m sind der Querschnitt von ${nc(f.area)} mm² mal einer Dichte von 7850 kg/m³, und jeder Stoß bringt ${nc(f.lapMetres)} m dazu.`,
    f => `${barName(f.cell.d)} (diamètre nominal ${nc(f.bar.mm)} mm) en ${f.cell.length} m : ${nc(f.perBar)} kg par barre, ${nc(f.perHundred)} kg les 100, ${f.barsPerTon} barres à la tonne. Les ${nc(f.unit)} kg/m sont la section de ${nc(f.area)} mm² multipliée par une densité de 7850 kg/m³, et chaque recouvrement ajoute ${nc(f.lapMetres)} m.`,
    f => `${barName(f.cell.d)} (नाममात्र व्यास ${f.bar.mm} mm), ${f.cell.length} m: प्रति सरिया ${f.perBar} kg, 100 सरिये ${f.perHundred} kg, एक टन में ${f.barsPerTon} सरिये। ${f.unit} kg/m ${f.area} mm² काट को घनत्व 7850 kg/m³ से गुणा करने पर आता है, और हर लैप जोड़ पर ${f.lapMetres} m जुड़ता है।`,
    f => `${barName(f.cell.d)}（公称直径 ${f.bar.mm}mm）的 ${f.cell.length} 米：一根 ${f.perBar} 千克，100 根 ${f.perHundred} 千克，一吨 ${f.barsPerTon} 根。每米 ${f.unit} 千克是截面积 ${f.area}mm² 乘以密度 7850kg/m³，每处搭接再加 ${f.lapMetres} 米。`,
    f => `${barName(f.cell.d)}（標稱直徑 ${f.bar.mm}mm）的 ${f.cell.length} 公尺：一根 ${f.perBar} 公斤，100 根 ${f.perHundred} 公斤，一公噸 ${f.barsPerTon} 根。每公尺 ${f.unit} 公斤是截面積 ${f.area}mm² 乘以密度 7850kg/m³，每處搭接再加 ${f.lapMetres} 公尺。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '철근 단위중량은 어떻게 계산하나요?', a: 'π/4 × 공칭지름² × 7850 ÷ 10⁶입니다. 정리하면 0.006165 × 지름²이고, D13(12.7mm)이면 0.995kg/m가 나옵니다. 계수는 강의 밀도 7850kg/m³와 π에서 나온 값이라 따로 외울 것이 없습니다.' },
      { q: 'D13은 지름이 13mm인가요?', a: '아닙니다. 13은 호칭이고 공칭지름은 12.7mm입니다. 13을 그대로 식에 넣으면 1.042kg/m가 되어 규격값보다 5% 무겁게 나옵니다.' },
      { q: '발주할 때 도면 길이만 보면 되나요?', a: '겹침이음과 로스를 더해야 합니다. 이음 한 곳에 지름의 40배쯤(D13이면 0.508m)이 더 들고, 자르고 남는 것까지 보면 3~5%를 더 봅니다.' },
    ],
    [
      { q: 'How do I work out the weight per metre?', a: 'π/4 × nominal diameter² × 7850 ÷ 10⁶. Tidied up that is 0.006165 × diameter², which gives 0.995 kg/m for a D13 at 12.7 mm. The factor is just the density of steel, 7850 kg/m³, and π — nothing to memorise.' },
      { q: 'Is a D13 bar 13 mm across?', a: 'No. The 13 is a label; the nominal diameter is 12.7 mm. Putting 13 into the formula returns 1.042 kg/m, about 5 % above the standard value.' },
      { q: 'Can I order straight off the lengths on the drawing?', a: 'Add splices and waste first. Each lap splice runs about 40 diameters — 0.508 m for a D13 — and offcuts add another 3 to 5 %.' },
    ],
    [
      { q: '¿Cómo se calcula el peso por metro?', a: 'π/4 × diámetro nominal² × 7850 ÷ 10⁶. Ordenado queda 0,006165 × diámetro², que da 0,995 kg/m para una D13 de 12,7 mm. El factor es solo la densidad del acero, 7850 kg/m³, y π: no hay nada que memorizar.' },
      { q: '¿Una varilla D13 mide 13 mm?', a: 'No. El 13 es una etiqueta; el diámetro nominal es 12,7 mm. Con 13 en la fórmula salen 1,042 kg/m, un 5 % por encima del valor normalizado.' },
      { q: '¿Puedo pedir con las longitudes del plano tal cual?', a: 'Primero suma traslapes y merma. Cada traslape ronda los 40 diámetros (0,508 m en una D13) y los recortes añaden otro 3 a 5 %.' },
    ],
    [
      { q: 'Como se calcula o peso por metro?', a: 'π/4 × diâmetro nominal² × 7850 ÷ 10⁶. Arrumado fica 0,006165 × diâmetro², que dá 0,995 kg/m para uma D13 de 12,7 mm. O fator é só a densidade do aço, 7850 kg/m³, e π: não há o que decorar.' },
      { q: 'Uma barra D13 tem 13 mm?', a: 'Não. O 13 é um rótulo; o diâmetro nominal é 12,7 mm. Com 13 na fórmula saem 1,042 kg/m, uns 5 % acima do valor normalizado.' },
      { q: 'Posso pedir com os comprimentos do projeto direto?', a: 'Some traspasses e perda antes. Cada traspasse fica em torno de 40 diâmetros (0,508 m numa D13) e as sobras acrescentam mais 3 a 5 %.' },
    ],
    [
      { q: '鉄筋の単位質量はどう計算しますか。', a: 'π/4 × 呼び径² × 7850 ÷ 10⁶です。整理すると0.006165 × 径²で、D13(12.7mm)なら0.995kg/mになります。係数は鋼の密度7850kg/m³とπから出た値なので、覚える必要はありません。' },
      { q: 'D13は直径13mmですか。', a: 'いいえ。13は呼び名で、呼び径は12.7mmです。13をそのまま式に入れると1.042kg/mになり、規格値より5%重く出ます。' },
      { q: '発注は図面の長さだけで足りますか。', a: '継手とロスを足します。重ね継手1か所で径の40倍ほど(D13なら0.508m)、切り落としでさらに3~5%見ます。' },
    ],
    [
      { q: 'Wie rechnet man das Gewicht je Meter?', a: 'π/4 × Nenndurchmesser² × 7850 ÷ 10⁶. Aufgeräumt ist das 0,006165 × Durchmesser², bei D13 mit 12,7 mm also 0,995 kg/m. Der Faktor ist nur die Dichte von Stahl, 7850 kg/m³, und π — nichts zum Lernen.' },
      { q: 'Hat ein Stab D13 13 mm Durchmesser?', a: 'Nein. Die 13 ist eine Bezeichnung, der Nenndurchmesser ist 12,7 mm. Mit 13 in der Formel kommen 1,042 kg/m heraus, rund 5 % über dem Normwert.' },
      { q: 'Kann ich nach den Längen der Zeichnung bestellen?', a: 'Erst Stöße und Verschnitt dazurechnen. Ein Übergreifungsstoß liegt bei etwa 40 Durchmessern (bei D13 sind das 0,508 m), Verschnitt bringt weitere 3 bis 5 %.' },
    ],
    [
      { q: 'Comment calculer le poids au mètre ?', a: 'π/4 × diamètre nominal² × 7850 ÷ 10⁶. Mis au propre, cela donne 0,006165 × diamètre², soit 0,995 kg/m pour un D13 de 12,7 mm. Le facteur n’est que la densité de l’acier, 7850 kg/m³, et π : rien à apprendre.' },
      { q: 'Une barre D13 mesure-t-elle 13 mm ?', a: 'Non. Le 13 est une étiquette ; le diamètre nominal vaut 12,7 mm. Avec 13 dans la formule on obtient 1,042 kg/m, environ 5 % au-dessus de la valeur normalisée.' },
      { q: 'Peut-on commander d’après les longueurs du plan ?', a: 'Ajoutez d’abord recouvrements et chutes. Un recouvrement fait environ 40 diamètres (0,508 m pour un D13) et les chutes ajoutent 3 à 5 %.' },
    ],
    [
      { q: 'प्रति मीटर वज़न कैसे निकालें?', a: 'π/4 × नाममात्र व्यास² × 7850 ÷ 10⁶। सजाकर लिखें तो 0.006165 × व्यास², जिससे D13 (12.7 mm) पर 0.995 kg/m आता है। गुणक केवल स्टील के घनत्व 7850 kg/m³ और π से बना है — याद करने जैसा कुछ नहीं।' },
      { q: 'क्या D13 सरिये का व्यास 13 mm है?', a: 'नहीं। 13 नाम है, नाममात्र व्यास 12.7 mm है। सूत्र में 13 डालने पर 1.042 kg/m आता है, जो मानक मान से लगभग 5% भारी है।' },
      { q: 'क्या नक़्शे की लंबाई से ही ऑर्डर कर सकते हैं?', a: 'पहले जोड़ और बर्बादी जोड़ें। हर लैप जोड़ लगभग 40 व्यास का होता है (D13 में 0.508 m) और कटाई से 3–5% और लगता है।' },
    ],
    [
      { q: '钢筋每米重量怎么算？', a: 'π/4 × 公称直径² × 7850 ÷ 10⁶。整理后是 0.006165 × 直径²，D13（12.7mm）算出 0.995kg/m。这个系数只是钢的密度 7850kg/m³ 和 π 的组合，不用背。' },
      { q: 'D13 的直径就是 13mm 吗？', a: '不是。13 是名称，公称直径是 12.7mm。把 13 直接代入会得到 1.042kg/m，比标准值重约 5%。' },
      { q: '订货能直接按图纸长度算吗？', a: '要先加搭接和损耗。每处搭接约 40 倍直径（D13 是 0.508 米），切下的余料再算 3~5%。' },
    ],
    [
      { q: '鋼筋每公尺重量怎麼算？', a: 'π/4 × 標稱直徑² × 7850 ÷ 10⁶。整理後是 0.006165 × 直徑²，D13（12.7mm）算出 0.995kg/m。這個係數只是鋼的密度 7850kg/m³ 和 π 的組合，不用背。' },
      { q: 'D13 的直徑就是 13mm 嗎？', a: '不是。13 是名稱，標稱直徑是 12.7mm。把 13 直接代入會得到 1.042kg/m，比標準值重約 5%。' },
      { q: '訂貨能直接按圖紙長度算嗎？', a: '要先加搭接和損耗。每處搭接約 40 倍直徑（D13 是 0.508 公尺），切下的餘料再算 3~5%。' },
    ],
  ),

  cellFaq: T<(f: RebarFacts) => FaqItem[]>(
    f => [
      { q: `${label(f)} 철근 한 가닥은 몇 kg인가요?`, a: `${f.perBar}kg입니다. 단위중량 ${f.unit}kg/m에 길이 ${f.cell.length}m를 곱한 값이고, 10가닥이면 ${f.perTen}kg, 100가닥이면 ${f.perHundred}kg입니다.` },
      { q: '1톤에 몇 가닥 들어가나요?', a: `${f.barsPerTon}가닥입니다. 1000을 한 가닥 무게 ${f.perBar}kg으로 나눈 값이고, 100가닥은 ${f.tonsPerHundred}톤입니다. 로스 5%를 얹어 발주하면 ${f.orderPerHundred}kg입니다.` },
      { q: `단위중량 ${f.unit}kg/m는 어떻게 나온 값인가요?`, a: `공칭지름 ${f.bar.mm}mm의 단면적 ${f.area}mm²를 m²로 고쳐 밀도 7850kg/m³을 곱한 값입니다. 호칭 숫자 ${f.cell.d}을 그대로 넣으면 ${f.nameUnit}kg/m가 되어 어긋납니다.` },
    ],
    f => [
      { q: `How much does one ${label(f)} bar weigh?`, a: `${f.perBar} kg — ${f.unit} kg/m times ${f.cell.length} m. Ten bars come to ${f.perTen} kg and a hundred to ${f.perHundred} kg.` },
      { q: 'How many bars make a tonne?', a: `${f.barsPerTon}. That is 1000 divided by ${f.perBar} kg, and 100 bars weigh ${f.tonsPerHundred} t. Ordered with 5 % waste, those 100 become ${f.orderPerHundred} kg.` },
      { q: `Where does ${f.unit} kg/m come from?`, a: `The ${f.area} mm² cross-section of a ${f.bar.mm} mm nominal diameter, converted to m² and multiplied by a density of 7850 kg/m³. Using the label ${f.cell.d} instead would give ${f.nameUnit} kg/m, which is wrong.` },
    ],
    f => [
      { q: `¿Cuánto pesa una varilla ${label(f)}?`, a: `${nc(f.perBar)} kg: ${nc(f.unit)} kg/m por ${f.cell.length} m. Diez varillas son ${nc(f.perTen)} kg y cien, ${nc(f.perHundred)} kg.` },
      { q: '¿Cuántas varillas hacen una tonelada?', a: `${f.barsPerTon}. Es 1000 entre ${nc(f.perBar)} kg, y 100 varillas pesan ${nc(f.tonsPerHundred)} t. Con un 5 % de merma, esas 100 se piden como ${nc(f.orderPerHundred)} kg.` },
      { q: `¿De dónde salen los ${nc(f.unit)} kg/m?`, a: `De la sección de ${nc(f.area)} mm² de un diámetro nominal de ${nc(f.bar.mm)} mm, pasada a m² y multiplicada por una densidad de 7850 kg/m³. Con la etiqueta ${f.cell.d} saldrían ${nc(f.nameUnit)} kg/m, que es incorrecto.` },
    ],
    f => [
      { q: `Quanto pesa uma barra ${label(f)}?`, a: `${nc(f.perBar)} kg: ${nc(f.unit)} kg/m vezes ${f.cell.length} m. Dez barras dão ${nc(f.perTen)} kg e cem, ${nc(f.perHundred)} kg.` },
      { q: 'Quantas barras fazem uma tonelada?', a: `${f.barsPerTon}. É 1000 dividido por ${nc(f.perBar)} kg, e 100 barras pesam ${nc(f.tonsPerHundred)} t. Com 5 % de perda, essas 100 são pedidas como ${nc(f.orderPerHundred)} kg.` },
      { q: `De onde vêm os ${nc(f.unit)} kg/m?`, a: `Da seção de ${nc(f.area)} mm² de um diâmetro nominal de ${nc(f.bar.mm)} mm, passada a m² e multiplicada pela densidade de 7850 kg/m³. Com o rótulo ${f.cell.d} sairiam ${nc(f.nameUnit)} kg/m, o que está errado.` },
    ],
    f => [
      { q: `${label(f)}の鉄筋1本は何kgですか。`, a: `${f.perBar}kgです。単位質量${f.unit}kg/mに長さ${f.cell.length}mを掛けた値で、10本なら${f.perTen}kg、100本なら${f.perHundred}kgです。` },
      { q: '1トンに何本入りますか。', a: `${f.barsPerTon}本です。1000を1本${f.perBar}kgで割った値で、100本は${f.tonsPerHundred}トンです。ロス5%を足して発注すると${f.orderPerHundred}kgになります。` },
      { q: `単位質量${f.unit}kg/mはどこから出た値ですか。`, a: `呼び径${f.bar.mm}mmの断面積${f.area}mm²をm²に直し、密度7850kg/m³を掛けた値です。呼び名の${f.cell.d}をそのまま入れると${f.nameUnit}kg/mになり、合いません。` },
    ],
    f => [
      { q: `Wie schwer ist ein Stab ${label(f)}?`, a: `${nc(f.perBar)} kg — ${nc(f.unit)} kg/m mal ${f.cell.length} m. Zehn Stäbe sind ${nc(f.perTen)} kg, hundert ${nc(f.perHundred)} kg.` },
      { q: 'Wie viele Stäbe ergeben eine Tonne?', a: `${f.barsPerTon}. Das sind 1000 geteilt durch ${nc(f.perBar)} kg; 100 Stäbe wiegen ${nc(f.tonsPerHundred)} t. Mit 5 % Verschnitt bestellt man die 100 als ${nc(f.orderPerHundred)} kg.` },
      { q: `Woher kommen die ${nc(f.unit)} kg/m?`, a: `Vom Querschnitt ${nc(f.area)} mm² bei ${nc(f.bar.mm)} mm Nenndurchmesser, umgerechnet in m² und mal einer Dichte von 7850 kg/m³. Mit der Bezeichnung ${f.cell.d} kämen ${nc(f.nameUnit)} kg/m heraus, und das ist falsch.` },
    ],
    f => [
      { q: `Combien pèse une barre ${label(f)} ?`, a: `${nc(f.perBar)} kg : ${nc(f.unit)} kg/m fois ${f.cell.length} m. Dix barres font ${nc(f.perTen)} kg et cent, ${nc(f.perHundred)} kg.` },
      { q: 'Combien de barres font une tonne ?', a: `${f.barsPerTon}. C’est 1000 divisé par ${nc(f.perBar)} kg, et 100 barres pèsent ${nc(f.tonsPerHundred)} t. Avec 5 % de chutes, ces 100 se commandent à ${nc(f.orderPerHundred)} kg.` },
      { q: `D’où viennent les ${nc(f.unit)} kg/m ?`, a: `De la section de ${nc(f.area)} mm² d’un diamètre nominal de ${nc(f.bar.mm)} mm, convertie en m² et multipliée par une densité de 7850 kg/m³. Avec l’étiquette ${f.cell.d}, on obtiendrait ${nc(f.nameUnit)} kg/m, ce qui est faux.` },
    ],
    f => [
      { q: `${label(f)} सरिये का एक टुकड़ा कितने kg का है?`, a: `${f.perBar} kg — ${f.unit} kg/m गुणा ${f.cell.length} m। दस सरिये ${f.perTen} kg और सौ सरिये ${f.perHundred} kg।` },
      { q: 'एक टन में कितने सरिये आते हैं?', a: `${f.barsPerTon}। यह 1000 को ${f.perBar} kg से भाग देने पर आता है, और 100 सरिये ${f.tonsPerHundred} टन के होते हैं। 5% बर्बादी जोड़कर ऑर्डर करें तो ${f.orderPerHundred} kg।` },
      { q: `${f.unit} kg/m कहाँ से आया?`, a: `${f.bar.mm} mm नाममात्र व्यास की ${f.area} mm² काट को m² में बदलकर घनत्व 7850 kg/m³ से गुणा करने पर। नाम का अंक ${f.cell.d} डालें तो ${f.nameUnit} kg/m आता है, जो ग़लत है।` },
    ],
    f => [
      { q: `${label(f)} 钢筋一根多重？`, a: `${f.perBar} 千克 — 每米 ${f.unit} 千克乘 ${f.cell.length} 米。十根 ${f.perTen} 千克，一百根 ${f.perHundred} 千克。` },
      { q: '一吨装多少根？', a: `${f.barsPerTon} 根。用 1000 除以一根 ${f.perBar} 千克得到，100 根是 ${f.tonsPerHundred} 吨。加 5% 损耗下单就是 ${f.orderPerHundred} 千克。` },
      { q: `每米 ${f.unit} 千克是怎么来的？`, a: `把公称直径 ${f.bar.mm}mm 的截面积 ${f.area}mm² 换成 m²，再乘密度 7850kg/m³。若直接代入名称里的 ${f.cell.d}，会得到 ${f.nameUnit}kg/m，那是错的。` },
    ],
    f => [
      { q: `${label(f)} 鋼筋一根多重？`, a: `${f.perBar} 公斤 — 每公尺 ${f.unit} 公斤乘 ${f.cell.length} 公尺。十根 ${f.perTen} 公斤，一百根 ${f.perHundred} 公斤。` },
      { q: '一公噸裝多少根？', a: `${f.barsPerTon} 根。用 1000 除以一根 ${f.perBar} 公斤得到，100 根是 ${f.tonsPerHundred} 公噸。加 5% 損耗下單就是 ${f.orderPerHundred} 公斤。` },
      { q: `每公尺 ${f.unit} 公斤是怎麼來的？`, a: `把標稱直徑 ${f.bar.mm}mm 的截面積 ${f.area}mm² 換成 m²，再乘密度 7850kg/m³。若直接代入名稱裡的 ${f.cell.d}，會得到 ${f.nameUnit}kg/m，那是錯的。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const REBAR_UI: L<RebarUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<RebarUI>;
