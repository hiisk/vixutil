/**
 * 물 경도 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "같은 물인데 나라마다 다른 숫자로 적힌다"이다.
 * 150ppm과 8.4°dH와 8.76gpg는 같은 물이고, 서로 정해진 비율로 환산된다.
 * 그 비율은 계수표가 아니라 각 단위의 정의에서 나온다 — 독일 도는 CaO로,
 * 프랑스 도는 CaCO₃로, 영국·미국 단위는 그레인과 갤런으로 정의되어 있다.
 *
 * 등급(연수·경수)은 다르다. **경계는 기준마다 다르고** 우리 표의 60·120·180ppm은
 * 널리 쓰이는 어림일 뿐이다. 독일 세제법(WRMG)은 150.1·250.2ppm에 선을 그으므로
 * 150ppm짜리 물이 우리 표에서는 "경수"이고 그 법에서는 "연수"다. 열 언어가 모두
 * 그것을 밝힌다 — 환산은 정해진 값이지만 등급은 고른 값이라는 것이 이 섹션의 요지다.
 *
 * ── 소수점 기호 ──────────────────────────────────────────
 * es·pt·de·fr는 소수점에 쉼표를 쓴다(8,4°dH). 표와 본문이 어긋나면 같은 값이
 * 한 화면에서 두 얼굴이 되므로, 문장 안의 숫자는 nc()로 갈아 끼우고 화면
 * 컴포넌트는 fmtNum()을 쓴다 — 두 곳이 같은 규칙 하나를 본다. 몰질량 100.09처럼
 * 문장에 박아 넣는 값도 그 언어에서는 쉼표로 적는다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { UnitKey } from './list.ts';
import type { HardnessFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface HardnessUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  /** 단위 이름 — 나라 이름이 곧 단위 이름이다 */
  unitNames: Record<UnitKey, string>;
  /** 우리 표의 등급 넷 */
  bandNames: string[];
  /** 독일 WRMG의 등급 셋 — 경계가 다르면 등급도 다르다는 것을 보이는 자리 */
  wrmgNames: string[];

  ppmLabel: string;
  bandLabel: string;
  wrmgLabel: string;
  doubleLabel: string;
  halfLabel: string;

  baseTitle: string;
  baseNote: string;
  factorTitle: string;
  factorNote: string;
  bandTitle: string;
  bandNote: string;
  useTitle: string;
  useNote: string;

  tableTitle: string;
  anchorTitle: string;
  anchorNote: string;
  neighbourTitle: string;

  desc: (f: HardnessFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: HardnessFacts) => string;
  metaDesc: (f: HardnessFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: HardnessFacts) => FaqItem[];
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

/** 문장이 되풀이해 쓰는 값 — 자리까지 자른 뒤의 값이라 표와 어긋나지 않는다 */
const v = (f: HardnessFacts, key: UnitKey): number => f.values.find(x => x.key === key)!.value;

/**
 * 등급 이름을 SPEC 밖에 두는 이유 — 낱장 문장이 이 이름을 불러야 한다.
 *
 * "이 물은 경수입니다"를 열 언어로 쓰려면 desc·metaDesc·질문이 자기 언어의 등급
 * 이름을 알아야 하는데, SPEC 안에서는 옆 항목을 볼 수 없다. 밖에 두면 화면에
 * 나가는 이름과 문장에 박히는 이름이 한 곳에서 나온다.
 */
const BAND_NAMES: L<string[]> = T<string[]>(
  ['연수', '약한 경수', '경수', '매우 센 경수'],
  ['soft', 'moderately hard', 'hard', 'very hard'],
  ['blanda', 'moderadamente dura', 'dura', 'muy dura'],
  ['branda', 'moderadamente dura', 'dura', 'muito dura'],
  ['軟水', 'やや硬水', '硬水', '非常に硬い水'],
  ['weich', 'mittelhart', 'hart', 'sehr hart'],
  ['douce', 'moyennement dure', 'dure', 'très dure'],
  ['मृदु', 'कुछ कठोर', 'कठोर', 'बहुत कठोर'],
  ['软水', '稍硬水', '硬水', '极硬水'],
  ['軟水', '稍硬水', '硬水', '極硬水'],
);

/** 독일 WRMG의 등급 셋 — 같은 물을 다른 자로 재면 이 이름이 붙는다 */
const WRMG_NAMES: L<string[]> = T<string[]>(
  ['연수', '중간', '경수'],
  ['soft', 'medium', 'hard'],
  ['blanda', 'media', 'dura'],
  ['branda', 'média', 'dura'],
  ['軟水', '中程度', '硬水'],
  ['weich', 'mittel', 'hart'],
  ['douce', 'moyenne', 'dure'],
  ['मृदु', 'मध्यम', 'कठोर'],
  ['软', '中等', '硬'],
  ['軟', '中等', '硬'],
);

type Spec = { [K in keyof HardnessUI]: L<HardnessUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('물 경도 환산', 'Water hardness', 'Dureza del agua', 'Dureza da água', '水の硬度', 'Wasserhärte', 'Dureté de l’eau', 'पानी की कठोरता', '水硬度', '水硬度'),

  hubTitle: T(
    '물 경도 120칸 — 150ppm은 8.4°dH이고 8.76gpg다',
    '120 water hardness cells — 150 ppm is 8.4 °dH and 8.76 gpg',
    '120 casillas de dureza del agua — 150 ppm son 8,4 °dH y 8,76 gpg',
    '120 casas de dureza da água — 150 ppm são 8,4 °dH e 8,76 gpg',
    '水の硬度120マス — 150ppmは8.4°dHで8.76gpg',
    '120 Wasserhärte-Felder — 150 ppm sind 8,4 °dH und 8,76 gpg',
    '120 cases de dureté de l’eau — 150 ppm valent 8,4 °dH et 8,76 gpg',
    'पानी की कठोरता के 120 खाने — 150 ppm यानी 8.4 °dH और 8.76 gpg',
    /* 간체와 번체 제목이 글자까지 같으면 검색 결과에서 두 장을 가릴 수 없다 — 换/換이 갈라 준다 */
    '水硬度换算 120 格 — 150ppm 就是 8.4°dH，也是 8.76gpg',
    '水硬度換算 120 格 — 150ppm 就是 8.4°dH，也是 8.76gpg',
  ),

  hubLead: T(
    '5ppm부터 1000ppm까지 120칸마다 여섯 단위로 같은 물을 적었습니다. 나라마다 쓰는 단위가 달라 숫자가 열 배 넘게 벌어져 보이지만, 환산 비율은 정해져 있습니다 — 각 단위의 정의에서 나오는 값이라 표를 외울 일이 아닙니다.',
    'Every one of 120 rungs from 5 to 1000 ppm, written out in six units. Countries use different ones, so the same water can look more than ten times apart, yet the ratios are fixed — each falls out of how the unit is defined, so there is no table to memorise.',
    'Cada uno de los 120 escalones de 5 a 1000 ppm, escrito en seis unidades. Cada país usa la suya, así que la misma agua puede parecer diez veces distinta, pero las proporciones están fijadas: salen de la definición de cada unidad, así que no hay tabla que memorizar.',
    'Cada um dos 120 degraus de 5 a 1000 ppm, escrito em seis unidades. Cada país usa a sua, então a mesma água pode parecer dez vezes diferente, mas as proporções são fixas: saem da definição de cada unidade, então não há tabela para decorar.',
    '5ppmから1000ppmまで120マス、それぞれを六つの単位で書きました。国ごとに使う単位が違うので同じ水が十倍以上違って見えますが、換算比は決まっています — どれも単位の定義から出る値なので、表を覚える話ではありません。',
    'Alle 120 Stufen von 5 bis 1000 ppm, in sechs Einheiten ausgeschrieben. Jedes Land nimmt eine andere, dasselbe Wasser sieht darum um mehr als das Zehnfache verschieden aus — die Verhältnisse stehen aber fest: Sie folgen aus der Definition jeder Einheit, es gibt also keine Tabelle zu lernen.',
    'Chacun des 120 échelons de 5 à 1000 ppm, écrit dans six unités. Chaque pays emploie la sienne, si bien que la même eau paraît dix fois différente ; les rapports sont pourtant fixés : ils découlent de la définition de chaque unité, aucune table à retenir.',
    '5 ppm से 1000 ppm तक के 120 खाने, हर एक छह इकाइयों में लिखा हुआ। हर देश अलग इकाई चलाता है, इसलिए वही पानी दस गुना से ज़्यादा अलग दिखता है, पर बदलने का अनुपात तय है — हर अनुपात इकाई की परिभाषा से निकलता है, कोई तालिका याद करने की ज़रूरत नहीं।',
    '从 5ppm 到 1000ppm 的 120 格，每一格都用六种单位写出同一份水。各国用的单位不同，同一份水看起来能差十倍以上，但换算比例是定死的 — 每个比例都从单位的定义得出，不是背表的事。',
    '從 5ppm 到 1000ppm 的 120 格，每一格都用六種單位寫出同一份水。各國用的單位不同，同一份水看起來能差十倍以上，但換算比例是定死的 — 每個比例都從單位的定義得出，不是背表的事。',
  ),

  unitNames: T<Record<UnitKey, string>>(
    { ppm: 'ppm (mg/L CaCO₃)', dh: '독일 도', fh: '프랑스 도', e: '영국 도 (클라크)', gpg: '미국 gpg', mmol: '몰 농도' },
    { ppm: 'ppm (mg/L CaCO₃)', dh: 'German degree', fh: 'French degree', e: 'English degree (Clark)', gpg: 'grains per US gallon', mmol: 'millimoles per litre' },
    { ppm: 'ppm (mg/L CaCO₃)', dh: 'grado alemán', fh: 'grado francés', e: 'grado inglés (Clark)', gpg: 'granos por galón EE. UU.', mmol: 'milimoles por litro' },
    { ppm: 'ppm (mg/L CaCO₃)', dh: 'grau alemão', fh: 'grau francês', e: 'grau inglês (Clark)', gpg: 'grãos por galão dos EUA', mmol: 'milimols por litro' },
    { ppm: 'ppm (mg/L CaCO₃)', dh: 'ドイツ硬度', fh: 'フランス硬度', e: 'イギリス硬度(クラーク)', gpg: '米国ガロン当たりグレーン', mmol: 'ミリモル濃度' },
    { ppm: 'ppm (mg/L CaCO₃)', dh: 'deutscher Grad', fh: 'französischer Grad', e: 'englischer Grad (Clark)', gpg: 'Grains je US-Gallone', mmol: 'Millimol je Liter' },
    { ppm: 'ppm (mg/L CaCO₃)', dh: 'degré allemand', fh: 'degré français', e: 'degré anglais (Clark)', gpg: 'grains par gallon US', mmol: 'millimoles par litre' },
    { ppm: 'ppm (mg/L CaCO₃)', dh: 'जर्मन डिग्री', fh: 'फ़्रेंच डिग्री', e: 'अंग्रेज़ी डिग्री (क्लार्क)', gpg: 'ग्रेन प्रति अमेरिकी गैलन', mmol: 'मिलीमोल प्रति लीटर' },
    { ppm: 'ppm (mg/L CaCO₃)', dh: '德国度', fh: '法国度', e: '英国度（克拉克）', gpg: '美制格林每加仑', mmol: '毫摩尔每升' },
    { ppm: 'ppm (mg/L CaCO₃)', dh: '德國度', fh: '法國度', e: '英國度（克拉克）', gpg: '美制格林每加侖', mmol: '毫莫耳每公升' },
  ),

  bandNames: BAND_NAMES,
  wrmgNames: WRMG_NAMES,

  ppmLabel: T('경도', 'Hardness', 'Dureza', 'Dureza', '硬度', 'Härte', 'Dureté', 'कठोरता', '硬度', '硬度'),
  bandLabel: T('이 표의 등급', 'Grade on this chart', 'Grado en esta tabla', 'Grau nesta tabela', 'この表の区分', 'Stufe in dieser Tabelle', 'Classe de ce tableau', 'इस तालिका का दर्जा', '本表等级', '本表等級'),
  wrmgLabel: T('독일 WRMG 등급', 'German WRMG grade', 'Grado WRMG alemán', 'Grau WRMG alemão', 'ドイツWRMGの区分', 'Stufe nach WRMG', 'Classe WRMG allemande', 'जर्मन WRMG दर्जा', '德国 WRMG 等级', '德國 WRMG 等級'),
  doubleLabel: T('두 배 진한 물', 'Twice as hard', 'El doble de dura', 'O dobro de dura', '2倍濃い水', 'Doppelt so hart', 'Deux fois plus dure', 'दोगुनी कठोर', '两倍硬度', '兩倍硬度'),
  halfLabel: T('절반인 물', 'Half as hard', 'La mitad de dura', 'A metade de dura', '半分の水', 'Halb so hart', 'Moitié moins dure', 'आधी कठोर', '一半硬度', '一半硬度'),

  baseTitle: T(
    'ppm은 탄산칼슘으로 셈한 값이다',
    'ppm counts the hardness as if it were all chalk',
    'El ppm cuenta la dureza como si todo fuera caliza',
    'O ppm conta a dureza como se tudo fosse calcário',
    'ppmは炭酸カルシウムに換算した値',
    'ppm rechnet die Härte, als wäre alles Kalk',
    'Le ppm compte la dureté comme si tout était du calcaire',
    'ppm कठोरता को ऐसे गिनता है जैसे सब चूना हो',
    'ppm 是折算成碳酸钙的值',
    'ppm 是折算成碳酸鈣的值',
  ),
  baseNote: T(
    '물의 경도를 만드는 것은 주로 칼슘과 마그네슘 이온인데, 두 가지를 따로 적으면 물끼리 비교가 안 됩니다. 그래서 관례는 그 전부를 탄산칼슘(CaCO₃)으로 환산해 한 숫자로 적는 것입니다 — 이것이 ppm이고, 물에서는 1L에 1mg이라는 뜻이라 mg/L와 같은 값입니다. 여섯 단위가 모두 이 한 숫자를 다르게 적은 것뿐이므로, 어느 단위로 적힌 값이든 서로 바꿀 수 있습니다.',
    'Hardness comes mostly from calcium and magnesium ions, and writing the two separately makes waters impossible to compare. The convention is therefore to express the lot as calcium carbonate, CaCO₃, in a single number — that is ppm, and since it means one milligram in one litre of water it is the same figure as mg/L. All six units are just that one number written differently, which is why any of them converts into any other.',
    'La dureza viene sobre todo de iones de calcio y magnesio, y anotar los dos por separado hace imposible comparar aguas. La convención es expresarlo todo como carbonato de calcio, CaCO₃, en un solo número: eso es el ppm, y como significa un miligramo en un litro de agua coincide con el mg/L. Las seis unidades son ese mismo número escrito de otro modo, y por eso cualquiera se convierte en cualquier otra.',
    'A dureza vem sobretudo de íons de cálcio e magnésio, e anotar os dois em separado torna impossível comparar águas. A convenção é expressar tudo como carbonato de cálcio, CaCO₃, num único número: é o ppm, e como significa um miligrama em um litro de água coincide com o mg/L. As seis unidades são esse mesmo número escrito de outro jeito, e por isso qualquer uma se converte em qualquer outra.',
    '水の硬度をつくるのは主にカルシウムとマグネシウムのイオンですが、二つを別々に書くと水同士を比べられません。そこで慣習として、その全部を炭酸カルシウム(CaCO₃)に換算して一つの数で書きます — これがppmで、水では1Lに1mgという意味なのでmg/Lと同じ値です。六つの単位はこの一つの数を違う書き方にしただけなので、どの単位の値でも互いに移せます。',
    'Härte kommt vor allem von Calcium- und Magnesiumionen, und schreibt man beide getrennt auf, lassen sich Wässer nicht mehr vergleichen. Üblich ist darum, das Ganze als Calciumcarbonat, CaCO₃, in einer einzigen Zahl anzugeben — das ist ppm, und da es ein Milligramm in einem Liter Wasser meint, ist es dieselbe Zahl wie mg/L. Alle sechs Einheiten sind nur diese eine Zahl in anderer Schreibweise, weshalb sich jede in jede umrechnen lässt.',
    'La dureté vient surtout des ions calcium et magnésium, et noter les deux séparément empêche de comparer deux eaux. L’usage est donc de tout exprimer en carbonate de calcium, CaCO₃, en un seul nombre : c’est le ppm, et comme il signifie un milligramme dans un litre d’eau, il coïncide avec le mg/L. Les six unités ne sont que ce nombre écrit autrement, et c’est pourquoi chacune se convertit en n’importe quelle autre.',
    'कठोरता मुख्य रूप से कैल्शियम और मैग्नीशियम आयनों से आती है, और दोनों को अलग-अलग लिखने पर दो पानियों की तुलना नहीं हो पाती। इसलिए चलन यह है कि पूरे को कैल्शियम कार्बोनेट (CaCO₃) में बदलकर एक ही अंक में लिखा जाए — यही ppm है, और चूँकि इसका अर्थ एक लीटर पानी में एक मिलीग्राम है, यह mg/L के बराबर है। छहों इकाइयाँ उसी एक अंक को अलग तरह से लिखती हैं, इसीलिए किसी को भी किसी में बदला जा सकता है।',
    '水的硬度主要来自钙离子和镁离子，把两者分开写就无法把不同的水放在一起比。于是惯例是把它们全部折算成碳酸钙（CaCO₃），写成一个数 — 这就是 ppm，在水里它的意思是每升一毫克，所以和 mg/L 是同一个数。六种单位只是把这一个数换了写法，因此任何一种都能换成另一种。',
    '水的硬度主要來自鈣離子和鎂離子，把兩者分開寫就無法把不同的水放在一起比。於是慣例是把它們全部折算成碳酸鈣（CaCO₃），寫成一個數 — 這就是 ppm，在水裡它的意思是每公升一毫克，所以和 mg/L 是同一個數。六種單位只是把這一個數換了寫法，因此任何一種都能換成另一種。',
  ),

  factorTitle: T(
    '환산 계수는 정의에서 나온다',
    'The conversion factors fall out of the definitions',
    'Los factores de conversión salen de las definiciones',
    'Os fatores de conversão saem das definições',
    '換算係数は定義から出る',
    'Die Umrechnungsfaktoren folgen aus den Definitionen',
    'Les facteurs de conversion découlent des définitions',
    'बदलने के गुणक परिभाषा से निकलते हैं',
    '换算系数出自定义',
    '換算係數出自定義',
  ),
  factorNote: T(
    '독일 도는 "1도 = 10mg/L의 산화칼슘(CaO)"으로 정의되어 있습니다. 기준 물질이 CaCO₃가 아니라 CaO이므로 몰질량 비 100.09 ÷ 56.08을 곱해야 하고, 그래서 1°dH가 17.85ppm입니다. 프랑스 도는 정의가 "10mg/L의 CaCO₃"라 기준과 같은 물질이어서 딱 10입니다 — 둘 다 "10mg/L에 1도"라는 같은 꼴인데 값이 1.78배 다른 까닭이 여기 있습니다. 영국 도는 CaCO₃ 1그레인이 영국 갤런 하나에 든 농도(14.25ppm), 미국 gpg는 같은 것을 미국 갤런으로 잰 값(17.12ppm)이고, mmol/L는 몰질량 그대로 100.09입니다. 이 표는 계수를 옮겨 적지 않고 저 정의에서 만듭니다.',
    'The German degree is defined as one degree per 10 mg/L of calcium oxide, CaO. Because the reference substance is CaO and not CaCO₃, the molar mass ratio 100.09 ÷ 56.08 has to come in, which is why one °dH is 17.85 ppm. The French degree is defined as 10 mg/L of CaCO₃ — the same substance as the base — so its factor is exactly 10. Both read "one degree per 10 mg/L", and the 1.78-fold gap between them is entirely that substance. The English degree is one grain of CaCO₃ in an imperial gallon (14.25 ppm), the American gpg is the same grain in a US gallon (17.12 ppm), and mmol/L is simply the molar mass, 100.09. This chart builds every factor from those definitions instead of copying them down.',
    'El grado alemán se define como un grado por cada 10 mg/L de óxido de calcio, CaO. Como la sustancia de referencia es CaO y no CaCO₃, entra la razón de masas molares 100,09 ÷ 56,08, y por eso un °dH son 17,85 ppm. El grado francés se define como 10 mg/L de CaCO₃ — la misma sustancia que la base — así que su factor es exactamente 10. Los dos se leen «un grado por 10 mg/L», y la diferencia de 1,78 veces entre ellos es solo esa sustancia. El grado inglés es un grano de CaCO₃ en un galón imperial (14,25 ppm), el gpg estadounidense es el mismo grano en un galón de EE. UU. (17,12 ppm), y el mmol/L es simplemente la masa molar, 100,09. Esta tabla construye cada factor a partir de esas definiciones en vez de copiarlo.',
    'O grau alemão é definido como um grau por cada 10 mg/L de óxido de cálcio, CaO. Como a substância de referência é o CaO e não o CaCO₃, entra a razão de massas molares 100,09 ÷ 56,08, e por isso um °dH são 17,85 ppm. O grau francês é definido como 10 mg/L de CaCO₃ — a mesma substância da base — então o seu fator é exatamente 10. Os dois se leem «um grau por 10 mg/L», e a diferença de 1,78 vezes entre eles é só essa substância. O grau inglês é um grão de CaCO₃ num galão imperial (14,25 ppm), o gpg americano é o mesmo grão num galão dos EUA (17,12 ppm), e o mmol/L é simplesmente a massa molar, 100,09. Esta tabela constrói cada fator a partir dessas definições em vez de copiá-lo.',
    'ドイツ硬度は「1度 = 10mg/Lの酸化カルシウム(CaO)」と定義されています。基準物質がCaCO₃ではなくCaOなので、モル質量の比100.09 ÷ 56.08を掛ける必要があり、だから1°dHは17.85ppmです。フランス硬度は定義が「10mg/LのCaCO₃」で基準と同じ物質なので、係数はちょうど10です — どちらも「10mg/Lで1度」という同じ形なのに1.78倍違うのは、この物質の違いだけです。イギリス硬度はCaCO₃ 1グレーンが英ガロン1杯に入った濃度(14.25ppm)、米国のgpgは同じものを米ガロンで量った値(17.12ppm)、mmol/Lはモル質量そのままの100.09です。この表は係数を書き写さず、その定義から作ります。',
    'Der deutsche Grad ist als ein Grad je 10 mg/L Calciumoxid, CaO, definiert. Weil die Bezugssubstanz CaO und nicht CaCO₃ ist, kommt das Verhältnis der Molmassen 100,09 ÷ 56,08 hinein, und darum ist ein °dH gleich 17,85 ppm. Der französische Grad ist als 10 mg/L CaCO₃ definiert — dieselbe Substanz wie die Basis — sein Faktor ist also genau 10. Beide lauten «ein Grad je 10 mg/L», und der Unterschied um das 1,78-Fache ist allein diese Substanz. Der englische Grad ist ein Grain CaCO₃ in einer imperialen Gallone (14,25 ppm), das amerikanische gpg dasselbe Grain in einer US-Gallone (17,12 ppm), und mmol/L ist einfach die Molmasse, 100,09. Diese Tabelle baut jeden Faktor aus diesen Definitionen, statt ihn abzuschreiben.',
    'Le degré allemand est défini comme un degré pour 10 mg/L d’oxyde de calcium, CaO. Comme la substance de référence est le CaO et non le CaCO₃, le rapport des masses molaires 100,09 ÷ 56,08 entre en jeu, et c’est pourquoi un °dH vaut 17,85 ppm. Le degré français est défini comme 10 mg/L de CaCO₃ — la même substance que la base — son facteur est donc exactement 10. Les deux se lisent «un degré pour 10 mg/L», et l’écart de 1,78 fois entre eux ne vient que de cette substance. Le degré anglais est un grain de CaCO₃ dans un gallon impérial (14,25 ppm), le gpg américain le même grain dans un gallon US (17,12 ppm), et le mmol/L est simplement la masse molaire, 100,09. Ce tableau construit chaque facteur à partir de ces définitions au lieu de le recopier.',
    'जर्मन डिग्री की परिभाषा है — प्रति 10 mg/L कैल्शियम ऑक्साइड (CaO) पर एक डिग्री। संदर्भ पदार्थ CaCO₃ नहीं बल्कि CaO है, इसलिए मोलर द्रव्यमान का अनुपात 100.09 ÷ 56.08 आना ही है, और तभी एक °dH 17.85 ppm बनता है। फ़्रेंच डिग्री की परिभाषा 10 mg/L CaCO₃ है — आधार वही पदार्थ — इसलिए उसका गुणक ठीक 10 है। दोनों का रूप एक ही है, «10 mg/L पर एक डिग्री», और उनके बीच 1.78 गुना का अंतर बस इसी पदार्थ का है। अंग्रेज़ी डिग्री एक ब्रिटिश गैलन में CaCO₃ का एक ग्रेन है (14.25 ppm), अमेरिकी gpg वही ग्रेन अमेरिकी गैलन में (17.12 ppm), और mmol/L सीधे मोलर द्रव्यमान 100.09 है। यह तालिका हर गुणक को उन परिभाषाओं से बनाती है, नक़ल करके नहीं लिखती।',
    '德国度的定义是「每 10mg/L 氧化钙（CaO）为一度」。基准物质是 CaO 而不是 CaCO₃，所以必须乘上摩尔质量之比 100.09 ÷ 56.08，于是 1°dH 等于 17.85ppm。法国度的定义是「10mg/L 的 CaCO₃」，和基准是同一种物质，系数就正好是 10 — 两者写法一样是「10mg/L 为一度」，相差 1.78 倍全在这个物质上。英国度是一英制加仑水里含一格林 CaCO₃（14.25ppm），美制 gpg 是同一格林用美制加仑来量（17.12ppm），mmol/L 就是摩尔质量本身 100.09。本表不抄系数，而是从这些定义算出来。',
    '德國度的定義是「每 10mg/L 氧化鈣（CaO）為一度」。基準物質是 CaO 而不是 CaCO₃，所以必須乘上莫耳質量之比 100.09 ÷ 56.08，於是 1°dH 等於 17.85ppm。法國度的定義是「10mg/L 的 CaCO₃」，和基準是同一種物質，係數就正好是 10 — 兩者寫法一樣是「10mg/L 為一度」，相差 1.78 倍全在這個物質上。英國度是一英制加侖水裡含一格林 CaCO₃（14.25ppm），美制 gpg 是同一格林用美制加侖來量（17.12ppm），mmol/L 就是莫耳質量本身 100.09。本表不抄係數，而是從這些定義算出來。',
  ),

  bandTitle: T(
    '연수·경수의 경계는 기준마다 다르다',
    'Where soft ends and hard begins depends on the standard',
    'Dónde acaba lo blando y empieza lo duro depende de la norma',
    'Onde acaba o brando e começa o duro depende da norma',
    '軟水と硬水の境目は基準ごとに違う',
    'Wo weich endet und hart beginnt, hängt vom Standard ab',
    'La frontière entre eau douce et eau dure dépend de la norme',
    'मृदु कहाँ ख़त्म और कठोर कहाँ शुरू, यह मानक पर है',
    '软水和硬水的界线因标准而异',
    '軟水和硬水的界線因標準而異',
  ),
  bandNote: T(
    '환산은 정해진 값이지만 등급은 고른 값입니다. 이 표는 널리 인용되는 60·120·180ppm에 선을 그었습니다 — 저희가 고른 어림이라는 뜻입니다. 독일 세제법(WRMG)은 1.5와 2.5mmol/L, 곧 150.1과 250.2ppm(8.4와 14°dH)에 선을 긋습니다. 그래서 150ppm짜리 물은 이 표에서 "경수"이고 그 법으로는 "연수"입니다 — 물이 달라진 것이 아니라 자를 바꾼 것입니다. 경계 근처의 값이라면 이 표로 판정하지 말고 쓰려는 제품이나 그 나라의 기준을 보십시오.',
    'The conversions are fixed; the grades are a choice. This chart draws its lines at the widely quoted 60, 120 and 180 ppm — meaning they are our approximation. The German detergent law, WRMG, draws its own at 1.5 and 2.5 mmol/L, that is 150.1 and 250.2 ppm, or 8.4 and 14 °dH. A 150 ppm water is therefore "hard" on this chart and "soft" under that law — the water did not change, the ruler did. Near a boundary, do not settle the question here: read the standard your appliance or your country actually uses.',
    'Las conversiones están fijadas; los grados son una elección. Esta tabla traza sus líneas en los muy citados 60, 120 y 180 ppm, es decir, nuestra aproximación. La ley alemana de detergentes, la WRMG, traza las suyas en 1,5 y 2,5 mmol/L, o sea 150,1 y 250,2 ppm (8,4 y 14 °dH). Un agua de 150 ppm resulta así «dura» en esta tabla y «blanda» según esa ley: no cambió el agua, cambió la regla. Si el valor está cerca de un límite, no lo resuelvas aquí: mira la norma que usa tu aparato o tu país.',
    'As conversões são fixas; os graus são uma escolha. Esta tabela traça as suas linhas nos muito citados 60, 120 e 180 ppm — ou seja, a nossa aproximação. A lei alemã dos detergentes, a WRMG, traça as suas em 1,5 e 2,5 mmol/L, isto é 150,1 e 250,2 ppm (8,4 e 14 °dH). Uma água de 150 ppm fica assim «dura» nesta tabela e «branda» segundo essa lei: não mudou a água, mudou a régua. Se o valor estiver perto de um limite, não decida aqui: veja a norma que o seu aparelho ou o seu país usa.',
    '換算は決まった値ですが、区分は選んだ値です。この表は広く引かれる60・120・180ppmに線を引いています — つまり私たちが選んだ目安です。ドイツの洗剤法(WRMG)は1.5と2.5mmol/L、つまり150.1と250.2ppm(8.4と14°dH)に線を引きます。だから150ppmの水はこの表では「硬水」で、その法律では「軟水」です — 水が変わったのではなく、ものさしを変えたのです。境目に近い値なら、ここで決めずに使う製品やその国の基準を見てください。',
    'Die Umrechnungen sind festgelegt, die Stufen sind eine Wahl. Diese Tabelle zieht ihre Linien bei den häufig genannten 60, 120 und 180 ppm — das ist unsere Näherung. Das deutsche Wasch- und Reinigungsmittelgesetz zieht seine bei 1,5 und 2,5 mmol/L, also 150,1 und 250,2 ppm (8,4 und 14 °dH). Ein Wasser mit 150 ppm ist damit in dieser Tabelle «hart» und nach jenem Gesetz «weich» — nicht das Wasser hat sich geändert, sondern der Maßstab. Liegt ein Wert nahe einer Grenze, entscheide es nicht hier: sieh nach, welchen Standard dein Gerät oder dein Land benutzt.',
    'Les conversions sont fixées ; les classes sont un choix. Ce tableau place ses limites aux 60, 120 et 180 ppm souvent cités — c’est donc notre approximation. La loi allemande sur les détergents, la WRMG, place les siennes à 1,5 et 2,5 mmol/L, soit 150,1 et 250,2 ppm (8,4 et 14 °dH). Une eau à 150 ppm est ainsi «dure» sur ce tableau et «douce» selon cette loi : ce n’est pas l’eau qui a changé, c’est la règle. Près d’une limite, ne tranchez pas ici : lisez la norme que votre appareil ou votre pays applique réellement.',
    'बदलने के अनुपात तय हैं, पर दर्जे चुने हुए हैं। यह तालिका बहुचर्चित 60, 120 और 180 ppm पर रेखा खींचती है — यानी यह हमारा अनुमान है। जर्मनी का डिटर्जेंट क़ानून (WRMG) अपनी रेखाएँ 1.5 और 2.5 mmol/L पर खींचता है, यानी 150.1 और 250.2 ppm (8.4 और 14 °dH)। इसलिए 150 ppm का पानी इस तालिका में «कठोर» है और उस क़ानून में «मृदु» — पानी नहीं बदला, पैमाना बदला। मान किसी सीमा के पास हो तो फ़ैसला यहाँ न करें: जो मानक आपका उपकरण या आपका देश चलाता है, वही देखें।',
    '换算是定死的，等级却是选出来的。本表把线画在广被引用的 60、120、180ppm — 也就是说，那是我们选的估数。德国洗涤剂法（WRMG）把线画在 1.5 和 2.5 mmol/L，也就是 150.1 和 250.2ppm（8.4 与 14°dH）。于是 150ppm 的水在本表里是「硬水」，在那部法律里是「软水」 — 变的不是水，是尺子。若数值靠近界线，别在这里下结论：去看你的电器或你所在国家真正采用的标准。',
    '換算是定死的，等級卻是選出來的。本表把線畫在廣被引用的 60、120、180ppm — 也就是說，那是我們選的估數。德國洗滌劑法（WRMG）把線畫在 1.5 和 2.5 mmol/L，也就是 150.1 和 250.2ppm（8.4 與 14°dH）。於是 150ppm 的水在本表裡是「硬水」，在那部法律裡是「軟水」 — 變的不是水，是尺。若數值靠近界線，別在這裡下結論：去看你的電器或你所在國家真正採用的標準。',
  ),

  useTitle: T(
    '해외 제품 설명서를 읽을 때',
    'Reading a manual written for another country',
    'Al leer un manual escrito para otro país',
    'Ao ler um manual escrito para outro país',
    '海外製品の説明書を読むとき',
    'Wenn die Anleitung für ein anderes Land geschrieben ist',
    'Quand la notice a été écrite pour un autre pays',
    'दूसरे देश के लिए लिखा मैनुअल पढ़ते समय',
    '读别国写的产品说明书时',
    '讀別國寫的產品說明書時',
  ),
  useNote: T(
    '연수기·정수기·식기세척기·커피머신을 살 때 이 환산이 필요합니다. 독일 식기세척기는 물 경도를 °dH로 입력하라고 하고, 미국 연수기는 gpg로 용량을 적으며, 프랑스 커피머신 설명서는 °fH로 필터 교체 주기를 정합니다. 같은 수돗물인데 8.4와 8.76과 15라는 세 숫자가 되니, 설명서의 눈금을 그대로 믿고 넣으면 필터를 너무 자주 갈거나 물때를 놓칩니다. 자기 물의 ppm은 수도사업자가 내는 수질검사 결과에 "경도"로 적혀 있고, 대개 mg/L 단위라 그대로 ppm입니다.',
    'You need this conversion when buying a softener, a filter jug, a dishwasher or an espresso machine. A German dishwasher asks you to enter the hardness in °dH, an American softener rates its capacity in gpg, and a French coffee machine sets its filter interval in °fH. The same tap water becomes three numbers — 8.4, 8.76 and 15 — so typing the manual’s scale straight in means changing filters too often or missing the scale build-up. Your own figure is on the water utility’s quality report under hardness, usually in mg/L, which is ppm unchanged.',
    'Necesitas esta conversión al comprar un descalcificador, una jarra filtrante, un lavavajillas o una cafetera. Un lavavajillas alemán pide la dureza en °dH, un descalcificador estadounidense mide su capacidad en gpg y una cafetera francesa fija el cambio de filtro en °fH. La misma agua del grifo se vuelve tres números —8,4, 8,76 y 15—, así que meter la escala del manual tal cual lleva a cambiar filtros de más o a no ver la cal. Tu cifra está en el informe de calidad de la empresa de aguas, bajo dureza, casi siempre en mg/L, que es ppm sin más.',
    'Você precisa desta conversão ao comprar um abrandador, uma jarra com filtro, uma lava-louças ou uma máquina de café. Uma lava-louças alemã pede a dureza em °dH, um abrandador americano mede a capacidade em gpg e uma máquina de café francesa marca a troca do filtro em °fH. A mesma água da torneira vira três números —8,4, 8,76 e 15—, então usar a escala do manual como está leva a trocar filtros demais ou a não ver o calcário. O seu número está no relatório de qualidade da companhia de água, em dureza, quase sempre em mg/L, que é ppm sem mudança.',
    '軟水器・浄水器・食器洗い機・コーヒーマシンを買うときにこの換算が必要です。ドイツの食器洗い機は硬度を°dHで入れろと言い、米国の軟水器はgpgで容量を書き、フランスのコーヒーマシンの説明書は°fHでフィルター交換の目安を決めます。同じ水道水なのに8.4と8.76と15の三つの数になるので、説明書の目盛りをそのまま信じて入れるとフィルターを替えすぎるか、水垢を見落とします。自分の水のppmは水道事業者が出す水質検査結果の「硬度」にあり、たいていmg/L単位なのでそのままppmです。',
    'Diese Umrechnung braucht man beim Kauf einer Enthärtungsanlage, eines Filterkrugs, einer Geschirrspülmaschine oder einer Kaffeemaschine. Eine deutsche Spülmaschine will die Härte in °dH, eine amerikanische Anlage gibt ihre Kapazität in gpg an, und die Anleitung einer französischen Kaffeemaschine legt den Filterwechsel in °fH fest. Dasselbe Leitungswasser wird zu drei Zahlen — 8,4, 8,76 und 15 —, wer also die Skala der Anleitung ungeprüft einträgt, wechselt Filter zu oft oder übersieht den Kalk. Den eigenen Wert nennt der Wasserversorger im Qualitätsbericht unter Härte, meist in mg/L, und das ist unverändert ppm.',
    'Cette conversion sert à l’achat d’un adoucisseur, d’une carafe filtrante, d’un lave-vaisselle ou d’une machine à café. Un lave-vaisselle allemand demande la dureté en °dH, un adoucisseur américain annonce sa capacité en gpg, et la notice d’une machine à café française fixe le changement de filtre en °fH. La même eau du robinet devient trois nombres — 8,4, 8,76 et 15 — : saisir la graduation de la notice telle quelle conduit à changer les filtres trop souvent ou à laisser le calcaire s’installer. Votre valeur figure au rapport de qualité du distributeur, à la ligne dureté, presque toujours en mg/L, ce qui est du ppm sans changement.',
    'यह बदलाव तब चाहिए जब आप सॉफ़्नर, फ़िल्टर, डिशवॉशर या कॉफ़ी मशीन ख़रीदते हैं। जर्मन डिशवॉशर कठोरता °dH में डालने को कहता है, अमेरिकी सॉफ़्नर अपनी क्षमता gpg में लिखता है, और फ़्रेंच कॉफ़ी मशीन का मैनुअल फ़िल्टर बदलने का अंतराल °fH में तय करता है। वही नल का पानी तीन अंक बन जाता है — 8.4, 8.76 और 15 — इसलिए मैनुअल का पैमाना जैसा है वैसा भर देने से फ़िल्टर बहुत जल्दी बदलते रहेंगे या जमी परत छूट जाएगी। अपने पानी का ppm जल विभाग की जाँच रिपोर्ट में «कठोरता» के नीचे मिलता है, आम तौर पर mg/L में, जो सीधे ppm ही है।',
    '买软水机、净水器、洗碗机或咖啡机时都要用到这个换算。德国洗碗机让你按 °dH 输入硬度，美国软水机用 gpg 标容量，法国咖啡机说明书按 °fH 定滤芯更换周期。同一份自来水就变成 8.4、8.76、15 三个数，照着说明书的刻度直接填，结果是滤芯换得太勤，或者根本没防住水垢。自己家水的 ppm 写在自来水公司的水质报告「硬度」一栏里，一般是 mg/L，直接就是 ppm。',
    '買軟水機、淨水器、洗碗機或咖啡機時都要用到這個換算。德國洗碗機讓你按 °dH 輸入硬度，美國軟水機用 gpg 標容量，法國咖啡機說明書按 °fH 定濾芯更換週期。同一份自來水就變成 8.4、8.76、15 三個數，照著說明書的刻度直接填，結果是濾芯換得太勤，或者根本沒防住水垢。自己家水的 ppm 寫在自來水公司的水質報告「硬度」一欄裡，一般是 mg/L，直接就是 ppm。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),

  anchorTitle: T(
    '다른 단위를 들고 왔다면',
    'If you arrived with another unit',
    'Si llegas con otra unidad',
    'Se você chegou com outra unidade',
    '別の単位を持ってきたなら',
    'Wenn du mit einer anderen Einheit kommst',
    'Si vous arrivez avec une autre unité',
    'अगर आप दूसरी इकाई लेकर आए हैं',
    '如果你手上是别的单位',
    '如果你手上是別的單位',
  ),
  anchorNote: T(
    '10°dH나 5gpg처럼 자기 단위의 값을 들고 왔다면 아래에서 그 값에 가장 가까운 칸으로 바로 갑니다. 주소는 ppm 하나로만 두었습니다 — 다른 단위는 ppm의 정해진 배수라 단위마다 주소를 내면 같은 물을 두 곳이 가리키게 됩니다.',
    'If you have a figure in your own unit — 10 °dH, 5 gpg — the list below jumps to the nearest cell. Addresses run on ppm alone: every other unit is a fixed multiple of it, so a page per unit would give the same water two homes.',
    'Si tienes una cifra en tu unidad —10 °dH, 5 gpg—, la lista de abajo salta a la casilla más cercana. Las direcciones van solo en ppm: cada otra unidad es un múltiplo fijo, así que una página por unidad daría dos casas a la misma agua.',
    'Se você tem um número na sua unidade —10 °dH, 5 gpg—, a lista abaixo salta para a casa mais próxima. Os endereços correm só em ppm: toda outra unidade é um múltiplo fixo, então uma página por unidade daria duas casas para a mesma água.',
    '10°dHや5gpgのように自分の単位の値を持ってきたなら、下の一覧から最も近いマスへ飛べます。住所はppmだけにしてあります — ほかの単位はppmの決まった倍数なので、単位ごとに住所を出すと同じ水を二か所が指すことになります。',
    'Wenn du einen Wert in deiner Einheit hast — 10 °dH, 5 gpg —, springt die Liste unten zum nächstgelegenen Feld. Die Adressen laufen allein über ppm: Jede andere Einheit ist ein festes Vielfaches davon, eine Seite je Einheit gäbe demselben Wasser also zwei Zuhause.',
    'Si vous avez une valeur dans votre unité — 10 °dH, 5 gpg —, la liste ci-dessous saute à la case la plus proche. Les adresses tiennent au seul ppm : toute autre unité en est un multiple fixe, une page par unité donnerait deux domiciles à la même eau.',
    'अगर आपके पास अपनी इकाई का मान है — 10 °dH, 5 gpg — तो नीचे की सूची से सबसे नज़दीकी खाने पर पहुँच जाइए। पते सिर्फ़ ppm पर चलते हैं: बाक़ी हर इकाई उसका तय गुणक है, इसलिए हर इकाई का अलग पन्ना बनाने पर एक ही पानी के दो घर हो जाते।',
    '如果你手上的数是 10°dH 或 5gpg 这样的本国单位，下面的清单直接跳到最接近的一格。地址只按 ppm 编：别的单位都是 ppm 的定倍数，若每个单位各出一页，同一份水就会有两个家。',
    '如果你手上的數是 10°dH 或 5gpg 這樣的本國單位，下面的清單直接跳到最接近的一格。地址只按 ppm 編：別的單位都是 ppm 的定倍數，若每個單位各出一頁，同一份水就會有兩個家。',
  ),

  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casas próximas', '近いマス', 'Nachbarfelder', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),

  desc: T<(f: HardnessFacts) => string>(
    f => `${f.ppm}ppm은 독일 도 ${v(f, 'dh')}°dH, 프랑스 도 ${v(f, 'fh')}°fH, 영국 도 ${v(f, 'e')}°e, 미국 ${v(f, 'gpg')}gpg, 몰 농도 ${v(f, 'mmol')}mmol/L과 같은 물입니다. 이 표의 구간으로는 ${BAND_NAMES.ko[f.band]}입니다.`,
    f => `${f.ppm} ppm is the same water as ${v(f, 'dh')} °dH in Germany, ${v(f, 'fh')} °fH in France, ${v(f, 'e')} °e in England, ${v(f, 'gpg')} gpg in the United States and ${v(f, 'mmol')} mmol/L in the lab. On this chart’s scale it counts as ${BAND_NAMES.en[f.band]}.`,
    f => `${nc(f.ppm)} ppm es la misma agua que ${nc(v(f, 'dh'))} °dH en Alemania, ${nc(v(f, 'fh'))} °fH en Francia, ${nc(v(f, 'e'))} °e en Inglaterra, ${nc(v(f, 'gpg'))} gpg en Estados Unidos y ${nc(v(f, 'mmol'))} mmol/L en el laboratorio. En la escala de esta tabla cuenta como ${BAND_NAMES.es[f.band]}.`,
    f => `${nc(f.ppm)} ppm é a mesma água que ${nc(v(f, 'dh'))} °dH na Alemanha, ${nc(v(f, 'fh'))} °fH na França, ${nc(v(f, 'e'))} °e na Inglaterra, ${nc(v(f, 'gpg'))} gpg nos Estados Unidos e ${nc(v(f, 'mmol'))} mmol/L no laboratório. Na escala desta tabela conta como ${BAND_NAMES.pt[f.band]}.`,
    f => `${f.ppm}ppmは、ドイツ硬度${v(f, 'dh')}°dH、フランス硬度${v(f, 'fh')}°fH、イギリス硬度${v(f, 'e')}°e、米国${v(f, 'gpg')}gpg、モル濃度${v(f, 'mmol')}mmol/Lと同じ水です。この表の区分では${BAND_NAMES.ja[f.band]}にあたります。`,
    f => `${nc(f.ppm)} ppm ist dasselbe Wasser wie ${nc(v(f, 'dh'))} °dH in Deutschland, ${nc(v(f, 'fh'))} °fH in Frankreich, ${nc(v(f, 'e'))} °e in England, ${nc(v(f, 'gpg'))} gpg in den USA und ${nc(v(f, 'mmol'))} mmol/L im Labor. Auf der Skala dieser Tabelle zählt es als ${BAND_NAMES.de[f.band]}.`,
    f => `${nc(f.ppm)} ppm, c’est la même eau que ${nc(v(f, 'dh'))} °dH en Allemagne, ${nc(v(f, 'fh'))} °fH en France, ${nc(v(f, 'e'))} °e en Angleterre, ${nc(v(f, 'gpg'))} gpg aux États-Unis et ${nc(v(f, 'mmol'))} mmol/L au laboratoire. Sur l’échelle de ce tableau, elle compte comme ${BAND_NAMES.fr[f.band]}.`,
    f => `${f.ppm} ppm वही पानी है जो जर्मनी में ${v(f, 'dh')} °dH, फ़्रांस में ${v(f, 'fh')} °fH, इंग्लैंड में ${v(f, 'e')} °e, अमेरिका में ${v(f, 'gpg')} gpg और प्रयोगशाला में ${v(f, 'mmol')} mmol/L कहलाता है। इस तालिका के पैमाने पर यह ${BAND_NAMES.hi[f.band]} गिना जाता है।`,
    f => `${f.ppm}ppm 的水，在德国是 ${v(f, 'dh')}°dH，在法国是 ${v(f, 'fh')}°fH，在英国是 ${v(f, 'e')}°e，在美国是 ${v(f, 'gpg')}gpg，实验室里是 ${v(f, 'mmol')}mmol/L — 都是同一份水。按本表的刻度，它算 ${BAND_NAMES.zh[f.band]}。`,
    f => `${f.ppm}ppm 的水，在德國是 ${v(f, 'dh')}°dH，在法國是 ${v(f, 'fh')}°fH，在英國是 ${v(f, 'e')}°e，在美國是 ${v(f, 'gpg')}gpg，實驗室裡是 ${v(f, 'mmol')}mmol/L — 都是同一份水。按本表的刻度，它算 ${BAND_NAMES.tw[f.band]}。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      'ppm(mg/L CaCO₃)이 기준이고, 다른 단위는 모두 이 값의 정해진 배수입니다.',
      '°dH는 ppm ÷ 17.85, gpg는 ppm ÷ 17.12, °fH는 ppm ÷ 10, °e는 ppm ÷ 14.25, mmol/L는 ppm ÷ 100.09입니다.',
      '°dH와 °fH는 둘 다 "10mg/L에 1도"인데 기준 물질이 CaO와 CaCO₃로 달라 1.78배 차이가 납니다.',
      '등급 경계는 기준마다 다릅니다 — 이 표의 60·120·180ppm은 저희가 고른 어림입니다.',
    ],
    [
      'ppm (mg/L CaCO₃) is the base, and every other unit is a fixed multiple of it.',
      '°dH is ppm ÷ 17.85, gpg is ppm ÷ 17.12, °fH is ppm ÷ 10, °e is ppm ÷ 14.25 and mmol/L is ppm ÷ 100.09.',
      '°dH and °fH both read "one degree per 10 mg/L", yet differ 1.78-fold because one counts CaO and the other CaCO₃.',
      'Grade boundaries differ between standards — the 60, 120 and 180 ppm on this chart are our chosen approximation.',
    ],
    [
      'El ppm (mg/L CaCO₃) es la base, y toda otra unidad es un múltiplo fijo suyo.',
      'El °dH es ppm ÷ 17,85, el gpg ppm ÷ 17,12, el °fH ppm ÷ 10, el °e ppm ÷ 14,25 y el mmol/L ppm ÷ 100,09.',
      '°dH y °fH se leen igual, «un grado por 10 mg/L», pero difieren 1,78 veces porque uno cuenta CaO y el otro CaCO₃.',
      'Los límites de grado cambian según la norma: los 60, 120 y 180 ppm de esta tabla son la aproximación que elegimos.',
    ],
    [
      'O ppm (mg/L CaCO₃) é a base, e toda outra unidade é um múltiplo fixo dele.',
      'O °dH é ppm ÷ 17,85, o gpg ppm ÷ 17,12, o °fH ppm ÷ 10, o °e ppm ÷ 14,25 e o mmol/L ppm ÷ 100,09.',
      '°dH e °fH se leem igual, «um grau por 10 mg/L», mas diferem 1,78 vezes porque um conta CaO e o outro CaCO₃.',
      'Os limites de grau mudam conforme a norma: os 60, 120 e 180 ppm desta tabela são a aproximação que escolhemos.',
    ],
    [
      'ppm(mg/L CaCO₃)が基準で、ほかの単位はすべてこの値の決まった倍数です。',
      '°dHはppm ÷ 17.85、gpgはppm ÷ 17.12、°fHはppm ÷ 10、°eはppm ÷ 14.25、mmol/Lはppm ÷ 100.09です。',
      '°dHと°fHはどちらも「10mg/Lで1度」ですが、基準物質がCaOとCaCO₃で違うため1.78倍ずれます。',
      '区分の境目は基準ごとに違います — この表の60・120・180ppmは私たちが選んだ目安です。',
    ],
    [
      'ppm (mg/L CaCO₃) ist die Basis, jede andere Einheit ein festes Vielfaches davon.',
      '°dH ist ppm ÷ 17,85, gpg ist ppm ÷ 17,12, °fH ist ppm ÷ 10, °e ist ppm ÷ 14,25 und mmol/L ist ppm ÷ 100,09.',
      '°dH und °fH lauten beide «ein Grad je 10 mg/L», unterscheiden sich aber um das 1,78-Fache: einmal CaO, einmal CaCO₃.',
      'Die Stufengrenzen unterscheiden sich je Standard — die 60, 120 und 180 ppm hier sind unsere gewählte Näherung.',
    ],
    [
      'Le ppm (mg/L CaCO₃) est la base, et toute autre unité en est un multiple fixe.',
      'Le °dH vaut ppm ÷ 17,85, le gpg ppm ÷ 17,12, le °fH ppm ÷ 10, le °e ppm ÷ 14,25 et le mmol/L ppm ÷ 100,09.',
      '°dH et °fH se lisent pareil, «un degré pour 10 mg/L», mais diffèrent de 1,78 fois : l’un compte le CaO, l’autre le CaCO₃.',
      'Les limites de classe changent selon la norme — les 60, 120 et 180 ppm de ce tableau sont notre approximation.',
    ],
    [
      'ppm (mg/L CaCO₃) आधार है, और बाक़ी हर इकाई उसका तय गुणक है।',
      '°dH = ppm ÷ 17.85, gpg = ppm ÷ 17.12, °fH = ppm ÷ 10, °e = ppm ÷ 14.25, और mmol/L = ppm ÷ 100.09।',
      '°dH और °fH दोनों «10 mg/L पर एक डिग्री» हैं, फिर भी 1.78 गुना अलग हैं क्योंकि एक CaO गिनता है, दूसरा CaCO₃।',
      'दर्जों की सीमाएँ मानक के साथ बदलती हैं — इस तालिका के 60, 120 और 180 ppm हमारा चुना अनुमान हैं।',
    ],
    [
      'ppm（mg/L CaCO₃）是基准，别的单位都是它的定倍数。',
      '°dH 是 ppm ÷ 17.85，gpg 是 ppm ÷ 17.12，°fH 是 ppm ÷ 10，°e 是 ppm ÷ 14.25，mmol/L 是 ppm ÷ 100.09。',
      '°dH 和 °fH 写法一样是「10mg/L 为一度」，却差 1.78 倍，因为一个算 CaO，一个算 CaCO₃。',
      '等级界线因标准而异 — 本表的 60、120、180ppm 是我们选的估数。',
    ],
    [
      'ppm（mg/L CaCO₃）是基準，別的單位都是它的定倍數。',
      '°dH 是 ppm ÷ 17.85，gpg 是 ppm ÷ 17.12，°fH 是 ppm ÷ 10，°e 是 ppm ÷ 14.25，mmol/L 是 ppm ÷ 100.09。',
      '°dH 和 °fH 寫法一樣是「10mg/L 為一度」，卻差 1.78 倍，因為一個算 CaO，一個算 CaCO₃。',
      '等級界線因標準而異 — 本表的 60、120、180ppm 是我們選的估數。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '물 경도 단위 환산표 120칸 — ppm·°dH·°fH·gpg',
    'Water hardness conversion chart — ppm, °dH, °fH, °e, gpg',
    'Tabla de conversión de dureza del agua — ppm, °dH, °fH, °e, gpg',
    'Tabela de conversão de dureza da água — ppm, °dH, °fH, °e, gpg',
    '水の硬度 単位換算表120マス — ppm・°dH・°fH・gpg',
    'Umrechnungstabelle Wasserhärte — ppm, °dH, °fH, °e, gpg',
    'Table de conversion de la dureté de l’eau — ppm, °dH, °fH, °e, gpg',
    'पानी की कठोरता बदलने की तालिका — ppm, °dH, °fH, °e, gpg',
    '水硬度单位换算表 120 格 — ppm、德国度、法国度、gpg',
    '水硬度單位換算表 120 格 — ppm、德國度、法國度、gpg',
  ),
  hubMetaDesc: T(
    '5ppm부터 1000ppm까지 120칸을 독일 도(°dH), 프랑스 도(°fH), 영국 도(°e), 미국 gpg, mmol/L로 환산했습니다. 계수는 각 단위의 정의에서 나오고, 연수·경수 등급 경계는 기준마다 다릅니다.',
    '120 rungs from 5 to 1000 ppm converted into German degrees (°dH), French degrees (°fH), English degrees (°e), US grains per gallon and mmol/L. Every factor comes from how the unit is defined, and the soft-to-hard boundaries differ between standards.',
    '120 escalones de 5 a 1000 ppm convertidos a grados alemanes (°dH), franceses (°fH), ingleses (°e), granos por galón de EE. UU. y mmol/L. Cada factor sale de la definición de la unidad, y los límites entre blanda y dura cambian según la norma.',
    '120 degraus de 5 a 1000 ppm convertidos em graus alemães (°dH), franceses (°fH), ingleses (°e), grãos por galão dos EUA e mmol/L. Cada fator sai da definição da unidade, e os limites entre branda e dura mudam conforme a norma.',
    '5ppmから1000ppmまで120マスを、ドイツ硬度(°dH)・フランス硬度(°fH)・イギリス硬度(°e)・米国gpg・mmol/Lに換算しました。係数は単位の定義から出て、軟水と硬水の境目は基準ごとに違います。',
    '120 Stufen von 5 bis 1000 ppm, umgerechnet in deutsche Grad (°dH), französische Grad (°fH), englische Grad (°e), US-Grains je Gallone und mmol/L. Jeder Faktor folgt aus der Definition der Einheit, und die Grenzen zwischen weich und hart unterscheiden sich je Standard.',
    '120 échelons de 5 à 1000 ppm convertis en degrés allemands (°dH), français (°fH), anglais (°e), grains par gallon US et mmol/L. Chaque facteur découle de la définition de l’unité, et les limites entre eau douce et eau dure changent selon la norme.',
    '5 से 1000 ppm तक के 120 खाने जर्मन डिग्री (°dH), फ़्रेंच डिग्री (°fH), अंग्रेज़ी डिग्री (°e), अमेरिकी gpg और mmol/L में बदले हुए। हर गुणक इकाई की परिभाषा से निकलता है, और मृदु से कठोर की सीमाएँ मानक के साथ बदलती हैं।',
    '把 5ppm 到 1000ppm 的 120 格换算成德国度（°dH）、法国度（°fH）、英国度（°e）、美制 gpg 和 mmol/L。每个系数都出自单位的定义，而软水与硬水的界线因标准而异。',
    '把 5ppm 到 1000ppm 的 120 格換算成德國度（°dH）、法國度（°fH）、英國度（°e）、美制 gpg 和 mmol/L。每個係數都出自單位的定義，而軟水與硬水的界線因標準而異。',
  ),

  metaTitle: T<(f: HardnessFacts) => string>(
    f => `${f.ppm}ppm 물 경도 — 독일 ${v(f, 'dh')}°dH, 미국 ${v(f, 'gpg')}gpg`,
    f => `${f.ppm} ppm water hardness — ${v(f, 'dh')} °dH, ${v(f, 'gpg')} gpg`,
    f => `Dureza del agua de ${nc(f.ppm)} ppm — ${nc(v(f, 'dh'))} °dH y ${nc(v(f, 'gpg'))} gpg`,
    f => `Dureza da água de ${nc(f.ppm)} ppm — ${nc(v(f, 'dh'))} °dH e ${nc(v(f, 'gpg'))} gpg`,
    f => `${f.ppm}ppmの水の硬度 — ドイツ${v(f, 'dh')}°dH、米国${v(f, 'gpg')}gpg`,
    f => `Wasserhärte ${nc(f.ppm)} ppm — ${nc(v(f, 'dh'))} °dH, ${nc(v(f, 'gpg'))} gpg`,
    f => `Dureté de l’eau de ${nc(f.ppm)} ppm — ${nc(v(f, 'dh'))} °dH, ${nc(v(f, 'gpg'))} gpg`,
    f => `${f.ppm} ppm पानी की कठोरता — ${v(f, 'dh')} °dH, ${v(f, 'gpg')} gpg`,
    f => `${f.ppm}ppm 的水硬度 — 德国度 ${v(f, 'dh')}°dH，美制 ${v(f, 'gpg')}gpg`,
    f => `${f.ppm}ppm 的水硬度 — 德國度 ${v(f, 'dh')}°dH，美制 ${v(f, 'gpg')}gpg`,
  ),

  metaDesc: T<(f: HardnessFacts) => string>(
    f => `${f.ppm}ppm(mg/L CaCO₃)은 독일 도 ${v(f, 'dh')}°dH, 프랑스 도 ${v(f, 'fh')}°fH, 영국 도 ${v(f, 'e')}°e, 미국 ${v(f, 'gpg')}gpg, ${v(f, 'mmol')}mmol/L입니다. 이 표의 구간으로는 ${BAND_NAMES.ko[f.band]}, 독일 WRMG로는 ${WRMG_NAMES.ko[f.wrmgBand]}입니다.`,
    f => `${f.ppm} ppm (mg/L CaCO₃) is ${v(f, 'dh')} °dH in Germany, ${v(f, 'fh')} °fH in France, ${v(f, 'e')} °e in England, ${v(f, 'gpg')} gpg in the US and ${v(f, 'mmol')} mmol/L. This chart calls it ${BAND_NAMES.en[f.band]}; the German WRMG calls it ${WRMG_NAMES.en[f.wrmgBand]}.`,
    f => `${nc(f.ppm)} ppm (mg/L CaCO₃) son ${nc(v(f, 'dh'))} °dH en Alemania, ${nc(v(f, 'fh'))} °fH en Francia, ${nc(v(f, 'e'))} °e en Inglaterra, ${nc(v(f, 'gpg'))} gpg en EE. UU. y ${nc(v(f, 'mmol'))} mmol/L. Esta tabla la llama ${BAND_NAMES.es[f.band]}; la WRMG alemana, ${WRMG_NAMES.es[f.wrmgBand]}.`,
    f => `${nc(f.ppm)} ppm (mg/L CaCO₃) são ${nc(v(f, 'dh'))} °dH na Alemanha, ${nc(v(f, 'fh'))} °fH na França, ${nc(v(f, 'e'))} °e na Inglaterra, ${nc(v(f, 'gpg'))} gpg nos EUA e ${nc(v(f, 'mmol'))} mmol/L. Esta tabela chama de ${BAND_NAMES.pt[f.band]}; a WRMG alemã, de ${WRMG_NAMES.pt[f.wrmgBand]}.`,
    f => `${f.ppm}ppm(mg/L CaCO₃)は、ドイツ${v(f, 'dh')}°dH、フランス${v(f, 'fh')}°fH、イギリス${v(f, 'e')}°e、米国${v(f, 'gpg')}gpg、${v(f, 'mmol')}mmol/Lです。この表では${BAND_NAMES.ja[f.band]}、ドイツWRMGでは${WRMG_NAMES.ja[f.wrmgBand]}にあたります。`,
    f => `${nc(f.ppm)} ppm (mg/L CaCO₃) sind ${nc(v(f, 'dh'))} °dH in Deutschland, ${nc(v(f, 'fh'))} °fH in Frankreich, ${nc(v(f, 'e'))} °e in England, ${nc(v(f, 'gpg'))} gpg in den USA und ${nc(v(f, 'mmol'))} mmol/L. Diese Tabelle nennt es ${BAND_NAMES.de[f.band]}, das WRMG nennt es ${WRMG_NAMES.de[f.wrmgBand]}.`,
    f => `${nc(f.ppm)} ppm (mg/L CaCO₃) font ${nc(v(f, 'dh'))} °dH en Allemagne, ${nc(v(f, 'fh'))} °fH en France, ${nc(v(f, 'e'))} °e en Angleterre, ${nc(v(f, 'gpg'))} gpg aux États-Unis et ${nc(v(f, 'mmol'))} mmol/L. Ce tableau la dit ${BAND_NAMES.fr[f.band]} ; la WRMG allemande la dit ${WRMG_NAMES.fr[f.wrmgBand]}.`,
    f => `${f.ppm} ppm (mg/L CaCO₃) यानी जर्मनी में ${v(f, 'dh')} °dH, फ़्रांस में ${v(f, 'fh')} °fH, इंग्लैंड में ${v(f, 'e')} °e, अमेरिका में ${v(f, 'gpg')} gpg और ${v(f, 'mmol')} mmol/L। यह तालिका इसे ${BAND_NAMES.hi[f.band]} कहती है, जर्मन WRMG इसे ${WRMG_NAMES.hi[f.wrmgBand]} कहता है।`,
    f => `${f.ppm}ppm（mg/L CaCO₃）在德国是 ${v(f, 'dh')}°dH，法国 ${v(f, 'fh')}°fH，英国 ${v(f, 'e')}°e，美国 ${v(f, 'gpg')}gpg，另记作 ${v(f, 'mmol')}mmol/L。本表称它 ${BAND_NAMES.zh[f.band]}，德国 WRMG 称它 ${WRMG_NAMES.zh[f.wrmgBand]}。`,
    f => `${f.ppm}ppm（mg/L CaCO₃）在德國是 ${v(f, 'dh')}°dH，法國 ${v(f, 'fh')}°fH，英國 ${v(f, 'e')}°e，美國 ${v(f, 'gpg')}gpg，另記作 ${v(f, 'mmol')}mmol/L。本表稱它 ${BAND_NAMES.tw[f.band]}，德國 WRMG 稱它 ${WRMG_NAMES.tw[f.wrmgBand]}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '우리 집 물이 몇 ppm인지 어디서 보나요?', a: '수도사업자가 내는 수질검사 결과에 "경도" 항목으로 있습니다. 대개 mg/L로 적혀 있고 그 값이 그대로 ppm입니다. 시험지로 재면 보통 °dH나 gpg로 나오므로 이 표에서 옮겨 보십시오.' },
      { q: 'ppm과 mg/L는 다른 값인가요?', a: '물에서는 같습니다. 물 1리터가 거의 1kg이라 1mg/L가 100만분의 1이 되기 때문입니다. 밀도가 1에서 크게 벗어나는 액체에서는 갈라지지만, 수돗물에서는 같은 값으로 씁니다.' },
      { q: '연수기는 몇 ppm부터 필요한가요?', a: '기준마다 다릅니다. 이 표로는 120ppm을 넘으면 경수이고 180ppm을 넘으면 매우 센 경수이며, 독일 WRMG로는 150.1ppm(8.4°dH)부터 중간입니다. 제품이 요구하는 값을 그 제품의 단위로 확인하는 쪽이 확실합니다.' },
    ],
    [
      { q: 'Where do I find my own water in ppm?', a: 'It is on the quality report your water utility publishes, under hardness. It is usually printed in mg/L, and that figure is ppm unchanged. Test strips instead read in °dH or gpg, so bring that number to this chart.' },
      { q: 'Are ppm and mg/L different numbers?', a: 'In water they are the same. A litre of water weighs almost exactly a kilogram, so one milligram in it is one part per million. They part company in liquids whose density is far from one, but for tap water the two are used interchangeably.' },
      { q: 'At what ppm do I need a softener?', a: 'It depends on the standard. On this chart anything over 120 ppm is hard and over 180 ppm very hard, while the German WRMG only calls it medium from 150.1 ppm, or 8.4 °dH. The safer move is to check the figure your appliance asks for, in the unit it asks for.' },
    ],
    [
      { q: '¿Dónde veo la dureza de mi agua en ppm?', a: 'Está en el informe de calidad que publica tu empresa de aguas, en la línea de dureza. Suele venir en mg/L, y esa cifra es ppm sin cambio. Las tiras reactivas, en cambio, marcan °dH o gpg, así que trae ese número a esta tabla.' },
      { q: '¿Son cifras distintas el ppm y el mg/L?', a: 'En agua son la misma. Un litro de agua pesa casi exactamente un kilo, así que un miligramo dentro es una parte por millón. Se separan en líquidos con densidad muy lejos de uno, pero para el agua del grifo se usan como equivalentes.' },
      { q: '¿A partir de cuántos ppm hace falta un descalcificador?', a: 'Depende de la norma. En esta tabla, por encima de 120 ppm es dura y por encima de 180 ppm muy dura; la WRMG alemana solo la llama media a partir de 150,1 ppm, es decir 8,4 °dH. Lo seguro es mirar la cifra que pide tu aparato, en la unidad en que la pide.' },
    ],
    [
      { q: 'Onde vejo a dureza da minha água em ppm?', a: 'Está no relatório de qualidade que a companhia de água publica, na linha de dureza. Normalmente vem em mg/L, e esse número é ppm sem mudança. As fitas de teste, por outro lado, marcam °dH ou gpg, então traga esse número para esta tabela.' },
      { q: 'ppm e mg/L são números diferentes?', a: 'Na água são o mesmo. Um litro de água pesa quase exatamente um quilo, então um miligrama dentro dele é uma parte por milhão. Eles se separam em líquidos com densidade bem longe de um, mas para água de torneira os dois são usados como equivalentes.' },
      { q: 'A partir de quantos ppm preciso de um abrandador?', a: 'Depende da norma. Nesta tabela, acima de 120 ppm é dura e acima de 180 ppm muito dura; a WRMG alemã só chama de média a partir de 150,1 ppm, ou seja 8,4 °dH. O seguro é olhar o número que o seu aparelho pede, na unidade em que ele pede.' },
    ],
    [
      { q: '自分の家の水が何ppmかはどこで見られますか。', a: '水道事業者が出す水質検査結果の「硬度」の欄にあります。たいていmg/Lで書かれていて、その値がそのままppmです。試験紙で測ると°dHやgpgで出るので、その数をこの表に持ってきてください。' },
      { q: 'ppmとmg/Lは違う値ですか。', a: '水では同じです。水1リットルがほぼ1kgなので、その中の1mgが100万分の1になります。密度が1から大きく外れる液体では分かれますが、水道水では同じ値として使います。' },
      { q: '軟水器は何ppmから必要ですか。', a: '基準ごとに違います。この表では120ppmを超えると硬水、180ppmを超えると非常に硬い水で、ドイツWRMGでは150.1ppm(8.4°dH)からようやく中程度です。使う製品が求める値を、その製品の単位で確かめるほうが確実です。' },
    ],
    [
      { q: 'Wo finde ich die Härte meines Wassers in ppm?', a: 'Sie steht im Qualitätsbericht des Wasserversorgers unter Härte. Meist ist sie in mg/L angegeben, und diese Zahl ist unverändert ppm. Teststreifen zeigen dagegen °dH oder gpg an — bring diese Zahl zu dieser Tabelle.' },
      { q: 'Sind ppm und mg/L verschiedene Zahlen?', a: 'In Wasser sind sie dieselbe. Ein Liter Wasser wiegt fast genau ein Kilogramm, ein Milligramm darin ist also ein Millionstel. In Flüssigkeiten weit weg von der Dichte eins gehen sie auseinander, bei Leitungswasser werden beide gleichbedeutend benutzt.' },
      { q: 'Ab wie viel ppm braucht man eine Enthärtungsanlage?', a: 'Das hängt vom Standard ab. In dieser Tabelle ist alles über 120 ppm hart und über 180 ppm sehr hart, das WRMG nennt es erst ab 150,1 ppm, also 8,4 °dH, mittel. Sicherer ist, den Wert nachzusehen, den das Gerät verlangt — in der Einheit, in der es ihn verlangt.' },
    ],
    [
      { q: 'Où lire la dureté de mon eau en ppm ?', a: 'Elle figure au rapport de qualité publié par le distributeur, à la ligne dureté. Elle y est en général en mg/L, et ce nombre est du ppm sans changement. Les bandelettes, elles, affichent des °dH ou des gpg : apportez ce nombre à ce tableau.' },
      { q: 'Le ppm et le mg/L sont-ils deux nombres différents ?', a: 'Dans l’eau, c’est le même. Un litre d’eau pèse presque exactement un kilogramme, donc un milligramme dedans fait une partie par million. Ils divergent dans les liquides dont la densité est loin de un, mais pour l’eau du robinet on les emploie indifféremment.' },
      { q: 'À partir de combien de ppm faut-il un adoucisseur ?', a: 'Cela dépend de la norme. Sur ce tableau, au-delà de 120 ppm l’eau est dure et au-delà de 180 ppm très dure ; la WRMG allemande ne la dit moyenne qu’à partir de 150,1 ppm, soit 8,4 °dH. Le plus sûr est de regarder la valeur que réclame votre appareil, dans l’unité où il la réclame.' },
    ],
    [
      { q: 'अपने पानी का ppm कहाँ देखूँ?', a: 'जल विभाग जो गुणवत्ता रिपोर्ट छापता है, उसमें «कठोरता» की पंक्ति में मिलता है। आम तौर पर mg/L में छपा होता है, और वही अंक सीधे ppm है। टेस्ट स्ट्रिप °dH या gpg में पढ़ती है, इसलिए वह अंक इस तालिका में लाइए।' },
      { q: 'ppm और mg/L अलग अंक हैं?', a: 'पानी में दोनों एक ही हैं। एक लीटर पानी लगभग ठीक एक किलो का होता है, इसलिए उसमें एक मिलीग्राम दस लाख में एक हिस्सा बनता है। जिन द्रवों का घनत्व एक से बहुत दूर है वहाँ दोनों अलग हो जाते हैं, पर नल के पानी में दोनों को एक ही मानकर चलते हैं।' },
      { q: 'कितने ppm से सॉफ़्नर चाहिए?', a: 'यह मानक पर है। इस तालिका में 120 ppm से ऊपर कठोर और 180 ppm से ऊपर बहुत कठोर है, जबकि जर्मन WRMG उसे 150.1 ppm यानी 8.4 °dH से ही मध्यम कहता है। सुरक्षित तरीक़ा यह है कि आपका उपकरण जो मान माँगता है, उसी इकाई में देख लें।' },
    ],
    [
      { q: '我家水的 ppm 在哪里看？', a: '在自来水公司公布的水质报告里，「硬度」那一栏。一般以 mg/L 印出，那个数直接就是 ppm。试纸读出来通常是 °dH 或 gpg，把那个数带到本表来换即可。' },
      { q: 'ppm 和 mg/L 是两个不同的数吗？', a: '在水里是同一个。一升水几乎正好一公斤，所以里面一毫克就是百万分之一。密度离 1 很远的液体里两者会分开，但自来水中两者当作同一个值来用。' },
      { q: '多少 ppm 才需要软水机？', a: '因标准而异。本表里超过 120ppm 算硬水，超过 180ppm 算极硬水；德国 WRMG 要到 150.1ppm（8.4°dH）才叫中等。更稳妥的做法是查你的电器要求的数值，并按它要求的单位来看。' },
    ],
    [
      { q: '我家水的 ppm 在哪裡看？', a: '在自來水公司公布的水質報告裡，「硬度」那一欄。一般以 mg/L 印出，那個數直接就是 ppm。試紙讀出來通常是 °dH 或 gpg，把那個數帶到本表來換即可。' },
      { q: 'ppm 和 mg/L 是兩個不同的數嗎？', a: '在水裡是同一個。一公升水幾乎正好一公斤，所以裡面一毫克就是百萬分之一。密度離 1 很遠的液體裡兩者會分開，但自來水中兩者當作同一個值來用。' },
      { q: '多少 ppm 才需要軟水機？', a: '因標準而異。本表裡超過 120ppm 算硬水，超過 180ppm 算極硬水；德國 WRMG 要到 150.1ppm（8.4°dH）才叫中等。更穩妥的做法是查你的電器要求的數值，並按它要求的單位來看。' },
    ],
  ),

  cellFaq: T<(f: HardnessFacts) => FaqItem[]>(
    f => [
      { q: `${f.ppm}ppm은 몇 °dH인가요?`, a: `${v(f, 'dh')}°dH입니다. ppm을 17.85로 나눈 값이고, 같은 물이 프랑스 도로는 ${v(f, 'fh')}°fH, 영국 도로는 ${v(f, 'e')}°e, 미국 단위로는 ${v(f, 'gpg')}gpg, 몰 농도로는 ${v(f, 'mmol')}mmol/L입니다.` },
      { q: `${f.ppm}ppm은 연수인가요, 경수인가요?`, a: `이 표의 구간으로는 ${BAND_NAMES.ko[f.band]}입니다. 다만 독일 WRMG 기준으로는 ${WRMG_NAMES.ko[f.wrmgBand]}입니다 — 경계를 다른 자리에 그었기 때문입니다. 경계 근처의 값이라면 쓰려는 제품의 기준을 보십시오.` },
      { q: '물이 두 배 진해지면 어떻게 되나요?', a: `${f.doublePpm}ppm이 되고 여섯 단위가 모두 정확히 두 배가 됩니다. 환산이 곱셈뿐이라 절반인 ${f.halfPpm}ppm에서는 모든 값이 절반이고, 0ppm에서는 어느 단위로 적어도 0입니다.` },
    ],
    f => [
      { q: `How many °dH is ${f.ppm} ppm?`, a: `${v(f, 'dh')} °dH — ppm divided by 17.85. The same water reads ${v(f, 'fh')} °fH in France, ${v(f, 'e')} °e in England, ${v(f, 'gpg')} gpg in the United States and ${v(f, 'mmol')} mmol/L as a molar concentration.` },
      { q: `Is ${f.ppm} ppm soft or hard?`, a: `On this chart’s scale it is ${BAND_NAMES.en[f.band]}. Under the German WRMG, though, it is ${WRMG_NAMES.en[f.wrmgBand]} — that standard draws its lines elsewhere. Close to a boundary, go by whatever standard your appliance uses.` },
      { q: 'What if the water were twice as hard?', a: `It would be ${f.doublePpm} ppm and every one of the six units would double exactly. Conversion is nothing but multiplication, so half of it, ${f.halfPpm} ppm, halves every figure, and at 0 ppm every unit reads zero.` },
    ],
    f => [
      { q: `¿Cuántos °dH son ${nc(f.ppm)} ppm?`, a: `${nc(v(f, 'dh'))} °dH: el ppm dividido entre 17,85. La misma agua marca ${nc(v(f, 'fh'))} °fH en Francia, ${nc(v(f, 'e'))} °e en Inglaterra, ${nc(v(f, 'gpg'))} gpg en Estados Unidos y ${nc(v(f, 'mmol'))} mmol/L como concentración molar.` },
      { q: `¿${nc(f.ppm)} ppm es agua blanda o dura?`, a: `En la escala de esta tabla es ${BAND_NAMES.es[f.band]}. Según la WRMG alemana, en cambio, es ${WRMG_NAMES.es[f.wrmgBand]}: esa norma traza sus límites en otro sitio. Cerca de un límite, hazle caso a la norma que use tu aparato.` },
      { q: '¿Y si el agua fuera el doble de dura?', a: `Serían ${f.doublePpm} ppm y las seis unidades se doblarían exactamente. La conversión es pura multiplicación: la mitad, ${nc(f.halfPpm)} ppm, reduce a la mitad todas las cifras, y a 0 ppm todas las unidades marcan cero.` },
    ],
    f => [
      { q: `Quantos °dH são ${nc(f.ppm)} ppm?`, a: `${nc(v(f, 'dh'))} °dH: o ppm dividido por 17,85. A mesma água marca ${nc(v(f, 'fh'))} °fH na França, ${nc(v(f, 'e'))} °e na Inglaterra, ${nc(v(f, 'gpg'))} gpg nos Estados Unidos e ${nc(v(f, 'mmol'))} mmol/L como concentração molar.` },
      { q: `${nc(f.ppm)} ppm é água branda ou dura?`, a: `Na escala desta tabela é ${BAND_NAMES.pt[f.band]}. Já pela WRMG alemã é ${WRMG_NAMES.pt[f.wrmgBand]}: essa norma traça os limites em outro lugar. Perto de um limite, siga a norma que o seu aparelho usa.` },
      { q: 'E se a água fosse o dobro de dura?', a: `Seriam ${f.doublePpm} ppm e as seis unidades dobrariam exatamente. A conversão é só multiplicação: a metade, ${nc(f.halfPpm)} ppm, reduz à metade todos os números, e a 0 ppm todas as unidades marcam zero.` },
    ],
    f => [
      { q: `${f.ppm}ppmは何°dHですか。`, a: `${v(f, 'dh')}°dHです。ppmを17.85で割った値で、同じ水がフランス硬度では${v(f, 'fh')}°fH、イギリス硬度では${v(f, 'e')}°e、米国単位では${v(f, 'gpg')}gpg、モル濃度では${v(f, 'mmol')}mmol/Lになります。` },
      { q: `${f.ppm}ppmは軟水ですか、硬水ですか。`, a: `この表の区分では${BAND_NAMES.ja[f.band]}です。ただしドイツWRMGでは${WRMG_NAMES.ja[f.wrmgBand]}です — 境目を別の位置に引いているからです。境目に近い値なら、使う製品の基準に従ってください。` },
      { q: '水が2倍濃くなったらどうなりますか。', a: `${f.doublePpm}ppmになり、六つの単位すべてがちょうど2倍になります。換算は掛け算だけなので、半分の${f.halfPpm}ppmではすべての値が半分になり、0ppmではどの単位で書いても0です。` },
    ],
    f => [
      { q: `Wie viel °dH sind ${nc(f.ppm)} ppm?`, a: `${nc(v(f, 'dh'))} °dH — ppm geteilt durch 17,85. Dasselbe Wasser liest sich in Frankreich als ${nc(v(f, 'fh'))} °fH, in England als ${nc(v(f, 'e'))} °e, in den USA als ${nc(v(f, 'gpg'))} gpg und als Stoffmengenkonzentration ${nc(v(f, 'mmol'))} mmol/L.` },
      { q: `Ist ${nc(f.ppm)} ppm weich oder hart?`, a: `Auf der Skala dieser Tabelle ist es ${BAND_NAMES.de[f.band]}. Nach dem deutschen WRMG dagegen ${WRMG_NAMES.de[f.wrmgBand]} — jener Standard zieht seine Linien anderswo. Nahe einer Grenze richte dich nach dem Standard deines Geräts.` },
      { q: 'Was wäre bei doppelt so hartem Wasser?', a: `Es wären ${f.doublePpm} ppm, und alle sechs Einheiten verdoppelten sich genau. Umrechnen ist nur Multiplizieren: die Hälfte, ${nc(f.halfPpm)} ppm, halbiert jede Zahl, und bei 0 ppm steht in jeder Einheit null.` },
    ],
    f => [
      { q: `Combien de °dH font ${nc(f.ppm)} ppm ?`, a: `${nc(v(f, 'dh'))} °dH : le ppm divisé par 17,85. La même eau se lit ${nc(v(f, 'fh'))} °fH en France, ${nc(v(f, 'e'))} °e en Angleterre, ${nc(v(f, 'gpg'))} gpg aux États-Unis et ${nc(v(f, 'mmol'))} mmol/L en concentration molaire.` },
      { q: `${nc(f.ppm)} ppm, est-ce une eau douce ou dure ?`, a: `Sur l’échelle de ce tableau, elle est ${BAND_NAMES.fr[f.band]}. Selon la WRMG allemande, en revanche, elle est ${WRMG_NAMES.fr[f.wrmgBand]} : cette norme place ses limites ailleurs. Près d’une limite, suivez la norme de votre appareil.` },
      { q: 'Et si l’eau était deux fois plus dure ?', a: `Ce serait ${f.doublePpm} ppm et les six unités doubleraient exactement. La conversion n’est qu’une multiplication : la moitié, ${nc(f.halfPpm)} ppm, divise par deux tous les nombres, et à 0 ppm chaque unité affiche zéro.` },
    ],
    f => [
      { q: `${f.ppm} ppm कितने °dH हैं?`, a: `${v(f, 'dh')} °dH — ppm को 17.85 से भाग देने पर। वही पानी फ़्रांस में ${v(f, 'fh')} °fH, इंग्लैंड में ${v(f, 'e')} °e, अमेरिका में ${v(f, 'gpg')} gpg और मोलर सांद्रता में ${v(f, 'mmol')} mmol/L पढ़ा जाता है।` },
      { q: `${f.ppm} ppm मृदु है या कठोर?`, a: `इस तालिका के पैमाने पर यह ${BAND_NAMES.hi[f.band]} है। पर जर्मन WRMG के अनुसार यह ${WRMG_NAMES.hi[f.wrmgBand]} है — वह मानक अपनी रेखाएँ कहीं और खींचता है। सीमा के पास हो तो अपने उपकरण के मानक के अनुसार चलिए।` },
      { q: 'पानी दोगुना कठोर हो जाए तो?', a: `${f.doublePpm} ppm हो जाएगा और छहों इकाइयाँ ठीक दोगुनी हो जाएँगी। बदलना केवल गुणा है, इसलिए आधे यानी ${f.halfPpm} ppm पर हर अंक आधा हो जाता है, और 0 ppm पर हर इकाई में शून्य ही रहता है।` },
    ],
    f => [
      { q: `${f.ppm}ppm 是多少 °dH？`, a: `${v(f, 'dh')}°dH — 把 ppm 除以 17.85。同一份水在法国读作 ${v(f, 'fh')}°fH，在英国 ${v(f, 'e')}°e，在美国 ${v(f, 'gpg')}gpg，以摩尔浓度记是 ${v(f, 'mmol')}mmol/L。` },
      { q: `${f.ppm}ppm 是软水还是硬水？`, a: `按本表的刻度是 ${BAND_NAMES.zh[f.band]}。可是按德国 WRMG 就是 ${WRMG_NAMES.zh[f.wrmgBand]} — 那部标准把界线画在别处。若靠近界线，就按你电器采用的标准来定。` },
      { q: '水的硬度翻一倍会怎样？', a: `会变成 ${f.doublePpm}ppm，六种单位全都正好翻一倍。换算只是乘法，所以减半的 ${f.halfPpm}ppm 上每个数都减半，而 0ppm 时无论用哪种单位都是零。` },
    ],
    f => [
      { q: `${f.ppm}ppm 是多少 °dH？`, a: `${v(f, 'dh')}°dH — 把 ppm 除以 17.85。同一份水在法國讀作 ${v(f, 'fh')}°fH，在英國 ${v(f, 'e')}°e，在美國 ${v(f, 'gpg')}gpg，以莫耳濃度記是 ${v(f, 'mmol')}mmol/L。` },
      { q: `${f.ppm}ppm 是軟水還是硬水？`, a: `按本表的刻度是 ${BAND_NAMES.tw[f.band]}。可是按德國 WRMG 就是 ${WRMG_NAMES.tw[f.wrmgBand]} — 那部標準把界線畫在別處。若靠近界線，就按你電器採用的標準來定。` },
      { q: '水的硬度翻一倍會怎樣？', a: `會變成 ${f.doublePpm}ppm，六種單位全都正好翻一倍。換算只是乘法，所以減半的 ${f.halfPpm}ppm 上每個數都減半，而 0ppm 時無論用哪種單位都是零。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const HARDNESS_UI: L<HardnessUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<HardnessUI>;
