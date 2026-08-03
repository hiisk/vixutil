/**
 * 저항 색띠 화면의 문구 — 열 언어.
 *
 * 여기서 꼭 옮겨야 하는 것은 **색 이름**이다. 저항을 찾는 사람은 값을 모르는
 * 채로 "노랑 보라 빨강"을 보고 오므로, 색 이름이 그 나라 말로 적혀 있지 않으면
 * 찾을 방법이 없다. 나머지 문장은 계산한 값에서 만든다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { BandColor, ResistorFacts, Series } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface ResistorUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  colorLabel: Record<BandColor, string>;
  bandTitle: string;
  bandNote: string;
  band4Label: string;
  band5Label: string;
  valueLabel: string;
  codeLabel: string;
  toleranceLabel: string;
  rangeLabel: string;
  seriesLabel: string;
  multiplierLabel: string;
  seriesName: Record<Series, string>;
  seriesNote: Record<Series, string>;
  readTitle: string;
  readNote: string;
  decadeTitle: string;
  decadeNote: string;
  sameDecadeTitle: string;
  neighbourTitle: string;
  desc: (f: ResistorFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: ResistorFacts) => string;
  metaDesc: (f: ResistorFacts) => string;
  hubFaq: FaqItem[];
  valueFaq: (f: ResistorFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/**
 * 색 이름 — 설명 문장도 이 표를 쓴다.
 *
 * 저항을 찾는 사람은 값을 모르는 채 "노랑 보라 빨강"을 보고 온다. 그러니 색
 * 이름은 라벨로만 있어서는 안 되고 문장 안에도 그 나라 말로 들어가야 한다.
 */
const COLOR: L<Record<BandColor, string>> = {
  ko: { black: '검정', brown: '갈색', red: '빨강', orange: '주황', yellow: '노랑', green: '초록', blue: '파랑', violet: '보라', grey: '회색', white: '흰색', gold: '금색', silver: '은색', none: '없음' },
  en: { black: 'Black', brown: 'Brown', red: 'Red', orange: 'Orange', yellow: 'Yellow', green: 'Green', blue: 'Blue', violet: 'Violet', grey: 'Grey', white: 'White', gold: 'Gold', silver: 'Silver', none: 'None' },
  es: { black: 'Negro', brown: 'Marrón', red: 'Rojo', orange: 'Naranja', yellow: 'Amarillo', green: 'Verde', blue: 'Azul', violet: 'Violeta', grey: 'Gris', white: 'Blanco', gold: 'Oro', silver: 'Plata', none: 'Ninguna' },
  pt: { black: 'Preto', brown: 'Marrom', red: 'Vermelho', orange: 'Laranja', yellow: 'Amarelo', green: 'Verde', blue: 'Azul', violet: 'Violeta', grey: 'Cinza', white: 'Branco', gold: 'Ouro', silver: 'Prata', none: 'Nenhuma' },
  ja: { black: '黒', brown: '茶', red: '赤', orange: '橙', yellow: '黄', green: '緑', blue: '青', violet: '紫', grey: '灰', white: '白', gold: '金', silver: '銀', none: 'なし' },
  de: { black: 'Schwarz', brown: 'Braun', red: 'Rot', orange: 'Orange', yellow: 'Gelb', green: 'Grün', blue: 'Blau', violet: 'Violett', grey: 'Grau', white: 'Weiß', gold: 'Gold', silver: 'Silber', none: 'Keiner' },
  fr: { black: 'Noir', brown: 'Marron', red: 'Rouge', orange: 'Orange', yellow: 'Jaune', green: 'Vert', blue: 'Bleu', violet: 'Violet', grey: 'Gris', white: 'Blanc', gold: 'Or', silver: 'Argent', none: 'Aucun' },
  hi: { black: 'काला', brown: 'भूरा', red: 'लाल', orange: 'नारंगी', yellow: 'पीला', green: 'हरा', blue: 'नीला', violet: 'बैंगनी', grey: 'स्लेटी', white: 'सफ़ेद', gold: 'सुनहरा', silver: 'चाँदी', none: 'कोई नहीं' },
  zh: { black: '黑', brown: '棕', red: '红', orange: '橙', yellow: '黄', green: '绿', blue: '蓝', violet: '紫', grey: '灰', white: '白', gold: '金', silver: '银', none: '无' },
  tw: { black: '黑', brown: '棕', red: '紅', orange: '橙', yellow: '黃', green: '綠', blue: '藍', violet: '紫', grey: '灰', white: '白', gold: '金', silver: '銀', none: '無' },
};

/** 띠를 그 언어의 색 이름으로 늘어놓는다 */
const bandText = (bands: BandColor[], lang: Lang): string => bands.map(c => COLOR[lang][c]).join(' · ');

type Spec = { [K in keyof ResistorUI]: L<ResistorUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('저항 색띠', 'Resistors', 'Resistencias', 'Resistores', '抵抗のカラーコード', 'Widerstände', 'Résistances', 'रेज़िस्टर', '电阻色环', '電阻色環'),

  hubTitle: T(
    '저항값 144가지와 색띠',
    '144 resistor values and their bands',
    '144 valores de resistencia y sus bandas',
    '144 valores de resistor e suas faixas',
    '抵抗値144種とカラーコード',
    '144 Widerstandswerte und ihre Ringe',
    '144 valeurs de résistance et leurs anneaux',
    '144 रेज़िस्टर मान और उनके बैंड',
    '144 个电阻值与色环',
    '144 個電阻值與色環',
  ),

  hubLead: T(
    '10Ω부터 9.1MΩ까지 E24 계열 전부. 색띠는 자릿수를 색으로 적은 것뿐이라 값에서 그대로 계산됩니다.',
    'The whole E24 series from 10 Ω to 9.1 MΩ. The bands are just the digits written in colour, so they follow from the value.',
    'Toda la serie E24, de 10 Ω a 9,1 MΩ. Las bandas son los dígitos escritos en color, así que salen del propio valor.',
    'Toda a série E24, de 10 Ω a 9,1 MΩ. As faixas são os dígitos escritos em cor, então saem do próprio valor.',
    '10Ωから9.1MΩまでE24系列のすべて。カラーコードは桁を色で書いただけなので、値からそのまま出ます。',
    'Die ganze E24-Reihe von 10 Ω bis 9,1 MΩ. Die Ringe sind nur die Ziffern in Farbe — sie folgen aus dem Wert.',
    'Toute la série E24, de 10 Ω à 9,1 MΩ. Les anneaux ne sont que les chiffres écrits en couleur : ils découlent de la valeur.',
    '10 Ω से 9.1 MΩ तक पूरी E24 श्रेणी। बैंड बस अंकों को रंग में लिखना है, इसलिए वे मान से ही निकलते हैं।',
    '从 10Ω 到 9.1MΩ 的整个 E24 系列。色环不过是把数字写成颜色，所以由数值直接算出。',
    '從 10Ω 到 9.1MΩ 的整個 E24 系列。色環不過是把數字寫成顏色，所以由數值直接算出。',
  ),

  colorLabel: COLOR,

  bandTitle: T('색띠', 'The bands', 'Las bandas', 'As faixas', 'カラーコード', 'Die Ringe', 'Les anneaux', 'बैंड', '色环', '色環'),

  bandNote: T(
    '앞의 두 띠가 숫자이고, 셋째 띠는 뒤에 붙는 0의 개수입니다. 마지막 금색 띠는 오차 ±5%입니다.',
    'The first two bands are digits; the third is how many zeros follow. The gold band at the end is the ±5% tolerance.',
    'Las dos primeras bandas son dígitos; la tercera, cuántos ceros siguen. La banda dorada del final es la tolerancia del ±5%.',
    'As duas primeiras faixas são dígitos; a terceira é quantos zeros vêm depois. A faixa dourada no fim é a tolerância de ±5%.',
    '前の二本が数字で、三本目は後ろに付く0の数です。最後の金色は誤差±5%です。',
    'Die ersten beiden Ringe sind Ziffern, der dritte sagt, wie viele Nullen folgen. Der goldene Ring am Ende ist die Toleranz ±5 %.',
    'Les deux premiers anneaux sont des chiffres ; le troisième dit combien de zéros suivent. L’anneau doré final donne la tolérance ±5 %.',
    'पहले दो बैंड अंक हैं; तीसरा बताता है कि आगे कितने शून्य लगेंगे। अंत का सुनहरा बैंड ±5% सहनशीलता है।',
    '前两环是数字，第三环是后面跟几个 0。末尾的金环表示 ±5% 的误差。',
    '前兩環是數字，第三環是後面跟幾個 0。末尾的金環表示 ±5% 的誤差。',
  ),

  band4Label: T('네 띠', 'Four bands', 'Cuatro bandas', 'Quatro faixas', '4本', 'Vier Ringe', 'Quatre anneaux', 'चार बैंड', '四环', '四環'),
  band5Label: T('다섯 띠', 'Five bands', 'Cinco bandas', 'Cinco faixas', '5本', 'Fünf Ringe', 'Cinq anneaux', 'पाँच बैंड', '五环', '五環'),
  valueLabel: T('저항값', 'Value', 'Valor', 'Valor', '抵抗値', 'Wert', 'Valeur', 'मान', '阻值', '阻值'),
  codeLabel: T('4k7 표기', '4k7 notation', 'Notación 4k7', 'Notação 4k7', '4k7表記', '4k7-Schreibweise', 'Notation 4k7', '4k7 लेखन', '4k7 写法', '4k7 寫法'),
  toleranceLabel: T('오차', 'Tolerance', 'Tolerancia', 'Tolerância', '誤差', 'Toleranz', 'Tolérance', 'सहनशीलता', '误差', '誤差'),
  rangeLabel: T('실제 범위', 'Actual range', 'Rango real', 'Faixa real', '実際の範囲', 'Tatsächlicher Bereich', 'Plage réelle', 'वास्तविक परास', '实际范围', '實際範圍'),
  seriesLabel: T('계열', 'Series', 'Serie', 'Série', '系列', 'Reihe', 'Série', 'श्रेणी', '系列', '系列'),
  multiplierLabel: T('곱하는 수', 'Multiplier', 'Multiplicador', 'Multiplicador', '倍率', 'Multiplikator', 'Multiplicateur', 'गुणक', '倍率', '倍率'),

  seriesName: T(
    { E6: 'E6 계열', E12: 'E12 계열', E24: 'E24 계열' },
    { E6: 'E6 series', E12: 'E12 series', E24: 'E24 series' },
    { E6: 'Serie E6', E12: 'Serie E12', E24: 'Serie E24' },
    { E6: 'Série E6', E12: 'Série E12', E24: 'Série E24' },
    { E6: 'E6系列', E12: 'E12系列', E24: 'E24系列' },
    { E6: 'E6-Reihe', E12: 'E12-Reihe', E24: 'E24-Reihe' },
    { E6: 'Série E6', E12: 'Série E12', E24: 'Série E24' },
    { E6: 'E6 श्रेणी', E12: 'E12 श्रेणी', E24: 'E24 श्रेणी' },
    { E6: 'E6 系列', E12: 'E12 系列', E24: 'E24 系列' },
    { E6: 'E6 系列', E12: 'E12 系列', E24: 'E24 系列' },
  ),

  seriesNote: T(
    {
      E6: '한 자릿수를 여섯으로 나눈 가장 성긴 계열. 어느 서랍에도 들어 있는 값입니다.',
      E12: '열둘로 나눈 계열. E6 사이를 채웁니다.',
      E24: '스물넷으로 나눈 계열. 여기 싣는 값은 모두 E24에 듭니다.',
    },
    {
      E6: 'The coarsest series, six values per decade. These sit in every parts drawer.',
      E12: 'Twelve per decade, filling the gaps between the E6 values.',
      E24: 'Twenty-four per decade. Every value on this site belongs to E24.',
    },
    {
      E6: 'La serie más gruesa, seis valores por década. Están en cualquier cajón de componentes.',
      E12: 'Doce por década, que rellenan los huecos de la E6.',
      E24: 'Veinticuatro por década. Todos los valores de aquí pertenecen a la E24.',
    },
    {
      E6: 'A série mais grossa, seis valores por década. Estão em qualquer gaveta de componentes.',
      E12: 'Doze por década, preenchendo os vãos da E6.',
      E24: 'Vinte e quatro por década. Todos os valores daqui pertencem à E24.',
    },
    {
      E6: '一桁を六つに分けた一番粗い系列。どの部品箱にも入っている値です。',
      E12: '十二に分けた系列。E6のあいだを埋めます。',
      E24: '二十四に分けた系列。ここに載る値はすべてE24に入ります。',
    },
    {
      E6: 'Die gröbste Reihe, sechs Werte je Dekade. Die liegen in jeder Bauteilschublade.',
      E12: 'Zwölf je Dekade; sie füllen die Lücken der E6.',
      E24: 'Vierundzwanzig je Dekade. Jeder Wert hier gehört zur E24.',
    },
    {
      E6: 'La série la plus grossière, six valeurs par décade. On les trouve dans tous les tiroirs.',
      E12: 'Douze par décade, qui comblent les trous de la E6.',
      E24: 'Vingt-quatre par décade. Toutes les valeurs d’ici appartiennent à la E24.',
    },
    {
      E6: 'सबसे मोटी श्रेणी, हर दशक में छह मान। ये हर पुर्ज़े की दराज़ में मिलते हैं।',
      E12: 'हर दशक में बारह, जो E6 के बीच की जगह भरते हैं।',
      E24: 'हर दशक में चौबीस। यहाँ के सभी मान E24 में आते हैं।',
    },
    {
      E6: '每十倍分成六档，最粗的一档。哪个元件抽屉里都有。',
      E12: '每十倍十二档，填在 E6 的空档之间。',
      E24: '每十倍二十四档。这里收的值全都属于 E24。',
    },
    {
      E6: '每十倍分成六檔，最粗的一檔。哪個零件抽屜裡都有。',
      E12: '每十倍十二檔，填在 E6 的空檔之間。',
      E24: '每十倍二十四檔。這裡收的值全都屬於 E24。',
    },
  ),

  readTitle: T('어느 쪽부터 읽나', 'Which end to start from', 'Por qué extremo empezar', 'Por qual ponta começar', 'どちらから読むか', 'Von welcher Seite lesen', 'Par quel bout commencer', 'किस सिरे से पढ़ें', '从哪一头读起', '從哪一頭讀起'),

  readNote: T(
    '오차 띠는 끝에서 조금 떨어져 있습니다. 그쪽이 뒤이므로, 띠가 몰려 있는 쪽부터 읽습니다. 금색이나 은색이 보이면 그 띠가 마지막입니다.',
    'The tolerance band sits a little apart from the rest. Start from the crowded end. If you can see gold or silver, that band is the last one.',
    'La banda de tolerancia queda algo separada del resto. Empieza por el extremo donde se agrupan. Si ves oro o plata, esa banda es la última.',
    'A faixa de tolerância fica um pouco afastada das outras. Comece pela ponta onde elas se juntam. Se você vê ouro ou prata, essa faixa é a última.',
    '誤差の帯だけ少し離れています。帯が寄っている側から読みます。金や銀が見えたら、それが最後の帯です。',
    'Der Toleranzring steht etwas abseits. Man liest von der Seite, wo die Ringe eng beieinander stehen. Sieht man Gold oder Silber, ist das der letzte Ring.',
    'L’anneau de tolérance est un peu à l’écart. On commence par le côté où les anneaux se serrent. Si vous voyez de l’or ou de l’argent, c’est le dernier.',
    'सहनशीलता का बैंड बाकी से थोड़ा अलग रहता है। जिस सिरे पर बैंड पास-पास हों, वहीं से पढ़ें। सुनहरा या चाँदी दिखे तो वही आखिरी बैंड है।',
    '误差环离其他环稍远一点。从环挨得密的那头读起。看到金色或银色，那就是最后一环。',
    '誤差環離其他環稍遠一點。從環擠得密的那頭讀起。看到金色或銀色，那就是最後一環。',
  ),

  decadeTitle: T('자릿수별로', 'By decade', 'Por décadas', 'Por décadas', '桁ごとに', 'Nach Dekaden', 'Par décades', 'दशक के अनुसार', '按数量级', '按數量級'),

  decadeNote: T(
    '같은 스물네 값이 자릿수만 바꿔 되풀이됩니다 — 4.7Ω·47Ω·470Ω·4.7kΩ이 같은 색 두 띠를 씁니다.',
    'The same twenty-four values repeat with a different number of zeros — 47 Ω, 470 Ω and 4.7 kΩ all start with the same two colours.',
    'Los mismos veinticuatro valores se repiten con más ceros: 47 Ω, 470 Ω y 4,7 kΩ empiezan con los mismos dos colores.',
    'Os mesmos vinte e quatro valores se repetem com mais zeros: 47 Ω, 470 Ω e 4,7 kΩ começam com as mesmas duas cores.',
    '同じ二十四の値が桁を変えて繰り返します——47Ω・470Ω・4.7kΩは最初の二本が同じ色です。',
    'Dieselben vierundzwanzig Werte wiederholen sich mit mehr Nullen — 47 Ω, 470 Ω und 4,7 kΩ beginnen mit denselben zwei Farben.',
    'Les mêmes vingt-quatre valeurs reviennent avec plus de zéros : 47 Ω, 470 Ω et 4,7 kΩ commencent par les deux mêmes couleurs.',
    'वही चौबीस मान अलग-अलग शून्यों के साथ दोहराते हैं — 47 Ω, 470 Ω और 4.7 kΩ के पहले दो रंग एक ही हैं।',
    '同样的二十四个值只是零的个数不同——47Ω、470Ω、4.7kΩ 的前两环颜色完全一样。',
    '同樣的二十四個值只是零的個數不同——47Ω、470Ω、4.7kΩ 的前兩環顏色完全一樣。',
  ),

  sameDecadeTitle: T('같은 자릿수의 값', 'Same decade', 'Misma década', 'Mesma década', '同じ桁の値', 'Gleiche Dekade', 'Même décade', 'उसी दशक के मान', '同一数量级', '同一數量級'),
  neighbourTitle: T('가까운 값', 'Nearby values', 'Valores cercanos', 'Valores próximos', '近い値', 'Werte daneben', 'Valeurs voisines', 'पास के मान', '相邻的值', '相鄰的值'),

  desc: T<(f: ResistorFacts) => string>(
    f => `${f.display}은 색띠로 ${bandText(f.bands4.slice(0, 3), 'ko')}입니다. 오차 ±${f.tolerance}%면 실제 값은 ${f.min}Ω에서 ${f.max}Ω 사이입니다.`,
    f => `${f.display} reads as ${bandText(f.bands4.slice(0, 3), 'en')} in bands. With ±${f.tolerance}% it may sit anywhere from ${f.min} Ω to ${f.max} Ω.`,
    f => `${f.display} se lee ${bandText(f.bands4.slice(0, 3), 'es')} en bandas. Con ±${f.tolerance}% el valor real va de ${f.min} Ω a ${f.max} Ω.`,
    f => `${f.display} se lê ${bandText(f.bands4.slice(0, 3), 'pt')} em faixas. Com ±${f.tolerance}% o valor real vai de ${f.min} Ω a ${f.max} Ω.`,
    f => `${f.display}はカラーコードで ${bandText(f.bands4.slice(0, 3), 'ja')} です。誤差±${f.tolerance}%なら実際の値は${f.min}Ωから${f.max}Ωの間になります。`,
    f => `${f.display} liest sich als ${bandText(f.bands4.slice(0, 3), 'de')}. Bei ±${f.tolerance} % liegt der wirkliche Wert zwischen ${f.min} Ω und ${f.max} Ω.`,
    f => `${f.display} se lit ${bandText(f.bands4.slice(0, 3), 'fr')} en anneaux. À ±${f.tolerance} %, la valeur réelle va de ${f.min} Ω à ${f.max} Ω.`,
    f => `${f.display} बैंड में ${bandText(f.bands4.slice(0, 3), 'hi')} है। ±${f.tolerance}% पर असली मान ${f.min} Ω से ${f.max} Ω के बीच रहता है।`,
    f => `${f.display} 的色环是 ${bandText(f.bands4.slice(0, 3), 'zh')}。按 ±${f.tolerance}% 计，实际值在 ${f.min}Ω 到 ${f.max}Ω 之间。`,
    f => `${f.display} 的色環是 ${bandText(f.bands4.slice(0, 3), 'tw')}。按 ±${f.tolerance}% 計，實際值在 ${f.min}Ω 到 ${f.max}Ω 之間。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '색은 숫자입니다. 검정 0, 갈색 1, 빨강 2, 주황 3, 노랑 4, 초록 5, 파랑 6, 보라 7, 회색 8, 흰색 9.',
      '셋째 띠는 뒤에 붙는 0의 개수입니다. 노랑·보라·빨강이면 47 뒤에 0이 두 개, 곧 4.7kΩ입니다.',
      '다섯 띠는 숫자를 셋 읽으므로 곱하는 수가 한 자리 작아집니다.',
      '오차 띠는 끝에서 조금 떨어져 있어, 그쪽이 뒤라는 표시가 됩니다.',
    ],
    [
      'Colours are digits: black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9.',
      'The third band counts the zeros. Yellow, violet, red means 47 with two zeros — 4.7 kΩ.',
      'A five-band resistor reads three digits, so its multiplier band drops by one step.',
      'The tolerance band sits slightly apart, which is how you know which end is the back.',
    ],
    [
      'Los colores son dígitos: negro 0, marrón 1, rojo 2, naranja 3, amarillo 4, verde 5, azul 6, violeta 7, gris 8, blanco 9.',
      'La tercera banda cuenta los ceros. Amarillo, violeta, rojo es 47 con dos ceros: 4,7 kΩ.',
      'Una resistencia de cinco bandas lee tres dígitos, así que su multiplicador baja un paso.',
      'La banda de tolerancia queda algo separada: así se sabe cuál es el extremo final.',
    ],
    [
      'As cores são dígitos: preto 0, marrom 1, vermelho 2, laranja 3, amarelo 4, verde 5, azul 6, violeta 7, cinza 8, branco 9.',
      'A terceira faixa conta os zeros. Amarelo, violeta, vermelho é 47 com dois zeros: 4,7 kΩ.',
      'Um resistor de cinco faixas lê três dígitos, então o multiplicador cai um passo.',
      'A faixa de tolerância fica um pouco afastada: é assim que se sabe qual é a ponta final.',
    ],
    [
      '色は数字です。黒0・茶1・赤2・橙3・黄4・緑5・青6・紫7・灰8・白9。',
      '三本目は0の数です。黄・紫・赤なら47のうしろに0が二つ、つまり4.7kΩ。',
      '五本のものは数字を三つ読むので、倍率の帯が一段下がります。',
      '誤差の帯だけ少し離れていて、それがうしろ側の印になります。',
    ],
    [
      'Farben sind Ziffern: Schwarz 0, Braun 1, Rot 2, Orange 3, Gelb 4, Grün 5, Blau 6, Violett 7, Grau 8, Weiß 9.',
      'Der dritte Ring zählt die Nullen. Gelb, Violett, Rot heißt 47 mit zwei Nullen — 4,7 kΩ.',
      'Ein Widerstand mit fünf Ringen liest drei Ziffern, sein Multiplikator rückt daher eine Stufe zurück.',
      'Der Toleranzring steht etwas abseits — daran erkennt man das hintere Ende.',
    ],
    [
      'Les couleurs sont des chiffres : noir 0, marron 1, rouge 2, orange 3, jaune 4, vert 5, bleu 6, violet 7, gris 8, blanc 9.',
      'Le troisième anneau compte les zéros. Jaune, violet, rouge donne 47 suivi de deux zéros : 4,7 kΩ.',
      'Une résistance à cinq anneaux lit trois chiffres : son multiplicateur recule d’un cran.',
      'L’anneau de tolérance est légèrement à l’écart : c’est ainsi qu’on repère l’arrière.',
    ],
    [
      'रंग ही अंक हैं: काला 0, भूरा 1, लाल 2, नारंगी 3, पीला 4, हरा 5, नीला 6, बैंगनी 7, स्लेटी 8, सफ़ेद 9।',
      'तीसरा बैंड शून्य गिनता है। पीला, बैंगनी, लाल यानी 47 के आगे दो शून्य — 4.7 kΩ।',
      'पाँच बैंड वाला तीन अंक पढ़ता है, इसलिए उसका गुणक एक कदम घट जाता है।',
      'सहनशीलता का बैंड थोड़ा अलग रहता है — इसी से पिछला सिरा पहचाना जाता है।',
    ],
    [
      '颜色就是数字：黑 0、棕 1、红 2、橙 3、黄 4、绿 5、蓝 6、紫 7、灰 8、白 9。',
      '第三环数的是 0 的个数。黄、紫、红就是 47 后面加两个 0，即 4.7kΩ。',
      '五环电阻要读三位数字，所以倍率环往下退一档。',
      '误差环离得稍远，这就是分辨哪一头是尾的标记。',
    ],
    [
      '顏色就是數字：黑 0、棕 1、紅 2、橙 3、黃 4、綠 5、藍 6、紫 7、灰 8、白 9。',
      '第三環數的是 0 的個數。黃、紫、紅就是 47 後面加兩個 0，即 4.7kΩ。',
      '五環電阻要讀三位數字，所以倍率環往下退一檔。',
      '誤差環離得稍遠，這就是分辨哪一頭是尾的標記。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '저항 색띠표 — 10Ω부터 9.1MΩ까지 E24 계열',
    'Resistor colour code — the E24 series from 10 Ω to 9.1 MΩ',
    'Código de colores de resistencias — serie E24 de 10 Ω a 9,1 MΩ',
    'Código de cores de resistores — série E24 de 10 Ω a 9,1 MΩ',
    '抵抗カラーコード表 — 10Ωから9.1MΩまでのE24系列',
    'Widerstands-Farbcode — die E24-Reihe von 10 Ω bis 9,1 MΩ',
    'Code couleur des résistances — série E24 de 10 Ω à 9,1 MΩ',
    'रेज़िस्टर रंग कोड — 10 Ω से 9.1 MΩ तक E24 श्रेणी',
    '电阻色环表 — 从 10Ω 到 9.1MΩ 的 E24 系列',
    '電阻色環表 — 從 10Ω 到 9.1MΩ 的 E24 系列',
  ),

  hubMetaDesc: T(
    'E24 계열 144가지의 색띠를 한 장씩. 네 띠와 다섯 띠, 오차 범위, 4k7 표기, 어느 계열에 드는지까지 값에서 계산했습니다.',
    'The bands for all 144 E24 values, one page each: four- and five-band forms, the tolerance range, the 4k7 notation and which series it belongs to.',
    'Las bandas de los 144 valores E24, uno por página: formas de cuatro y cinco bandas, el rango de tolerancia, la notación 4k7 y su serie.',
    'As faixas dos 144 valores E24, um por página: formas de quatro e cinco faixas, a faixa de tolerância, a notação 4k7 e a série.',
    'E24系列144種のカラーコードを1ページずつ。4本と5本、誤差の範囲、4k7表記、どの系列に入るかまで値から計算しました。',
    'Die Ringe aller 144 E24-Werte, je eine Seite: Vier- und Fünf-Ring-Form, Toleranzbereich, 4k7-Schreibweise und Reihenzugehörigkeit.',
    'Les anneaux des 144 valeurs E24, une page chacune : formes à quatre et cinq anneaux, plage de tolérance, notation 4k7 et série.',
    'सभी 144 E24 मानों के बैंड, एक-एक पृष्ठ: चार और पाँच बैंड रूप, सहनशीलता परास, 4k7 लेखन और श्रेणी।',
    'E24 系列 144 个值的色环各一页：四环与五环写法、误差范围、4k7 写法，以及属于哪个系列。',
    'E24 系列 144 個值的色環各一頁：四環與五環寫法、誤差範圍、4k7 寫法，以及屬於哪個系列。',
  ),

  metaTitle: T<(f: ResistorFacts) => string>(
    f => `${f.display} 저항 색띠 (${f.code})`,
    f => `${f.display} resistor colour code (${f.code})`,
    f => `Resistencia de ${f.display}: código de colores (${f.code})`,
    f => `Resistor de ${f.display}: código de cores (${f.code})`,
    f => `${f.display} 抵抗のカラーコード（${f.code}）`,
    f => `${f.display} Widerstand — Farbcode (${f.code})`,
    f => `Résistance de ${f.display} — code couleur (${f.code})`,
    f => `${f.display} रेज़िस्टर रंग कोड (${f.code})`,
    f => `${f.display} 电阻色环（${f.code}）`,
    f => `${f.display} 電阻色環（${f.code}）`,
  ),

  metaDesc: T<(f: ResistorFacts) => string>(
    f => `${f.display}(${f.code})의 네 띠는 ${bandText(f.bands4, 'ko')}입니다. 오차 ±${f.tolerance}%로 ${f.min}~${f.max}Ω, ${f.series} 계열입니다.`,
    f => `${f.display} (${f.code}) has four bands: ${bandText(f.bands4, 'en')}. At ±${f.tolerance}% that is ${f.min}–${f.max} Ω, and it belongs to ${f.series}.`,
    f => `${f.display} (${f.code}) tiene cuatro bandas: ${bandText(f.bands4, 'es')}. Con ±${f.tolerance}% son ${f.min}–${f.max} Ω, y pertenece a ${f.series}.`,
    f => `${f.display} (${f.code}) tem quatro faixas: ${bandText(f.bands4, 'pt')}. Com ±${f.tolerance}% dá ${f.min}–${f.max} Ω, e pertence à ${f.series}.`,
    f => `${f.display}（${f.code}）の4本は ${bandText(f.bands4, 'ja')} です。誤差±${f.tolerance}%で${f.min}〜${f.max}Ω、${f.series}系列です。`,
    f => `${f.display} (${f.code}) hat vier Ringe: ${bandText(f.bands4, 'de')}. Bei ±${f.tolerance} % sind das ${f.min}–${f.max} Ω, Reihe ${f.series}.`,
    f => `${f.display} (${f.code}) a quatre anneaux : ${bandText(f.bands4, 'fr')}. À ±${f.tolerance} %, cela fait ${f.min}–${f.max} Ω, série ${f.series}.`,
    f => `${f.display} (${f.code}) के चार बैंड: ${bandText(f.bands4, 'hi')}। ±${f.tolerance}% पर ${f.min}–${f.max} Ω, श्रेणी ${f.series}।`,
    f => `${f.display}（${f.code}）的四环是 ${bandText(f.bands4, 'zh')}。按 ±${f.tolerance}% 为 ${f.min}–${f.max}Ω，属于 ${f.series} 系列。`,
    f => `${f.display}（${f.code}）的四環是 ${bandText(f.bands4, 'tw')}。按 ±${f.tolerance}% 為 ${f.min}–${f.max}Ω，屬於 ${f.series} 系列。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '색띠는 어느 쪽부터 읽나요?', a: '오차 띠가 조금 떨어져 있는 쪽이 뒤입니다. 금색이나 은색이 보이면 그 띠가 마지막입니다.' },
      { q: 'E24 계열이 무엇인가요?', a: '한 자릿수를 스물넷으로 나눈 표준 값들입니다. 10·11·12·13·15… 처럼 로그로 고르게 벌어져 있어, 어떤 값이 필요해도 5% 안에 하나가 있습니다.' },
      { q: '왜 4700Ω 대신 4k7이라고 적나요?', a: '소수점이 인쇄에서 흐려지거나 지워지면 4.7과 47을 구별할 수 없기 때문입니다. 단위를 소수점 자리에 끼워 넣으면 그런 일이 없습니다.' },
      { q: '띠가 다섯 개인 저항은 어떻게 읽나요?', a: '숫자를 셋 읽고 그다음이 곱하는 수입니다. 자리가 하나 늘었으므로 곱하는 수는 한 단계 작아집니다.' },
      { q: '±5%면 실제로 얼마나 다른가요?', a: '4.7kΩ이면 4,465Ω에서 4,935Ω 사이입니다. 옆 값인 4.3kΩ·5.1kΩ의 범위와 거의 맞닿습니다.' },
    ],
    [
      { q: 'Which end do I read from?', a: 'The end where the tolerance band sits slightly apart is the back. If you can see gold or silver, that band is the last one.' },
      { q: 'What is the E24 series?', a: 'The standard values that split each decade into twenty-four steps: 10, 11, 12, 13, 15 … Spaced logarithmically, so whatever value you need, one is within 5%.' },
      { q: 'Why write 4k7 instead of 4700 Ω?', a: 'Because a decimal point can fade or vanish in print, and 4.7 then looks like 47. Putting the unit where the point would go removes the risk.' },
      { q: 'How do I read a five-band resistor?', a: 'Three digits, then the multiplier. Since one more digit is read, the multiplier steps down by one.' },
      { q: 'How much does ±5% actually matter?', a: 'A 4.7 kΩ part may be anywhere from 4,465 Ω to 4,935 Ω — nearly touching the ranges of its neighbours 4.3 kΩ and 5.1 kΩ.' },
    ],
    [
      { q: '¿Por qué extremo se lee?', a: 'El extremo donde la banda de tolerancia queda algo separada es el final. Si ves oro o plata, esa banda es la última.' },
      { q: '¿Qué es la serie E24?', a: 'Los valores estándar que dividen cada década en veinticuatro pasos: 10, 11, 12, 13, 15… Están espaciados logarítmicamente, así que siempre hay uno a menos del 5%.' },
      { q: '¿Por qué se escribe 4k7 y no 4700 Ω?', a: 'Porque una coma decimal puede borrarse en la impresión y 4,7 pasaría por 47. Poner la unidad en el lugar de la coma elimina el riesgo.' },
      { q: '¿Cómo se lee una resistencia de cinco bandas?', a: 'Tres dígitos y luego el multiplicador. Como se lee un dígito más, el multiplicador baja un paso.' },
      { q: '¿Cuánto importa de verdad el ±5%?', a: 'Una de 4,7 kΩ puede estar entre 4.465 Ω y 4.935 Ω, casi tocando los rangos de sus vecinas de 4,3 kΩ y 5,1 kΩ.' },
    ],
    [
      { q: 'Por qual ponta se lê?', a: 'A ponta onde a faixa de tolerância fica afastada é o fim. Se você vê ouro ou prata, essa faixa é a última.' },
      { q: 'O que é a série E24?', a: 'Os valores padrão que dividem cada década em vinte e quatro passos: 10, 11, 12, 13, 15… Espaçados logaritmicamente, então sempre há um a menos de 5%.' },
      { q: 'Por que escrever 4k7 em vez de 4700 Ω?', a: 'Porque a vírgula decimal pode sumir na impressão e 4,7 viraria 47. Pôr a unidade no lugar da vírgula elimina o risco.' },
      { q: 'Como se lê um resistor de cinco faixas?', a: 'Três dígitos e depois o multiplicador. Como se lê um dígito a mais, o multiplicador desce um passo.' },
      { q: 'Quanto importa mesmo o ±5%?', a: 'Um de 4,7 kΩ pode estar entre 4.465 Ω e 4.935 Ω, quase encostando nas faixas dos vizinhos 4,3 kΩ e 5,1 kΩ.' },
    ],
    [
      { q: 'カラーコードはどちらから読みますか？', a: '誤差の帯が少し離れている側がうしろです。金や銀が見えたら、それが最後の帯です。' },
      { q: 'E24系列とは何ですか？', a: '一桁を二十四に分けた標準値です。10・11・12・13・15…と対数で等間隔に並ぶので、どんな値が要っても5%以内に一つあります。' },
      { q: 'なぜ4700Ωでなく4k7と書くのですか？', a: '小数点は印刷でかすれて消えることがあり、4.7が47に見えてしまうからです。単位を小数点の位置に入れればその心配がありません。' },
      { q: '帯が5本の抵抗はどう読みますか？', a: '数字を三つ読み、その次が倍率です。桁が一つ増えるので倍率は一段小さくなります。' },
      { q: '±5%は実際どれくらい違いますか？', a: '4.7kΩなら4,465Ω〜4,935Ωです。隣の4.3kΩ・5.1kΩの範囲とほとんど接します。' },
    ],
    [
      { q: 'Von welcher Seite liest man?', a: 'Die Seite, auf der der Toleranzring etwas abseits steht, ist hinten. Sieht man Gold oder Silber, ist das der letzte Ring.' },
      { q: 'Was ist die E24-Reihe?', a: 'Die Normwerte, die jede Dekade in vierundzwanzig Schritte teilen: 10, 11, 12, 13, 15 … Logarithmisch gleichmäßig, sodass zu jedem Wunschwert einer innerhalb von 5 % liegt.' },
      { q: 'Warum 4k7 statt 4700 Ω?', a: 'Weil ein Dezimalkomma im Druck verblassen kann und 4,7 dann wie 47 aussieht. Die Einheit an die Kommastelle zu setzen behebt das.' },
      { q: 'Wie liest man einen Widerstand mit fünf Ringen?', a: 'Drei Ziffern, dann der Multiplikator. Da eine Ziffer mehr gelesen wird, rückt der Multiplikator eine Stufe zurück.' },
      { q: 'Wie viel macht ±5 % wirklich aus?', a: 'Ein 4,7-kΩ-Widerstand darf zwischen 4.465 Ω und 4.935 Ω liegen — fast an den Bereichen der Nachbarn 4,3 kΩ und 5,1 kΩ.' },
    ],
    [
      { q: 'Par quel bout lit-on ?', a: 'Le bout où l’anneau de tolérance est légèrement à l’écart est l’arrière. Si vous voyez de l’or ou de l’argent, c’est le dernier anneau.' },
      { q: 'Qu’est-ce que la série E24 ?', a: 'Les valeurs normalisées qui découpent chaque décade en vingt-quatre pas : 10, 11, 12, 13, 15… Réparties logarithmiquement, de sorte qu’une valeur se trouve toujours à moins de 5 %.' },
      { q: 'Pourquoi écrire 4k7 plutôt que 4700 Ω ?', a: 'Parce qu’une virgule peut s’effacer à l’impression et 4,7 devient 47. Mettre l’unité à la place de la virgule supprime le risque.' },
      { q: 'Comment lire une résistance à cinq anneaux ?', a: 'Trois chiffres, puis le multiplicateur. Comme on lit un chiffre de plus, le multiplicateur recule d’un cran.' },
      { q: 'Le ±5 %, ça change quoi ?', a: 'Une 4,7 kΩ peut valoir entre 4 465 Ω et 4 935 Ω — presque au contact des plages de ses voisines 4,3 kΩ et 5,1 kΩ.' },
    ],
    [
      { q: 'बैंड किस सिरे से पढ़ें?', a: 'जिस सिरे पर सहनशीलता का बैंड थोड़ा अलग हो, वही पिछला है। सुनहरा या चाँदी दिखे तो वही आखिरी बैंड है।' },
      { q: 'E24 श्रेणी क्या है?', a: 'हर दशक को चौबीस चरणों में बाँटने वाले मानक मान: 10, 11, 12, 13, 15… लघुगणकीय रूप से समान दूरी पर, इसलिए किसी भी ज़रूरत के 5% के भीतर एक मिल जाता है।' },
      { q: '4700 Ω की जगह 4k7 क्यों लिखते हैं?', a: 'क्योंकि छपाई में दशमलव मिट सकता है और 4.7, 47 जैसा दिखने लगता है। इकाई को दशमलव की जगह रखने से यह खतरा नहीं रहता।' },
      { q: 'पाँच बैंड वाला रेज़िस्टर कैसे पढ़ें?', a: 'तीन अंक, फिर गुणक। एक अंक ज़्यादा पढ़ने के कारण गुणक एक कदम घट जाता है।' },
      { q: '±5% से सचमुच कितना फर्क पड़ता है?', a: '4.7 kΩ वाला 4,465 Ω से 4,935 Ω के बीच हो सकता है — पड़ोसी 4.3 kΩ और 5.1 kΩ की परास से लगभग सटा हुआ।' },
    ],
    [
      { q: '色环该从哪一头读？', a: '误差环稍稍离开的那一头是尾。看到金色或银色，那就是最后一环。' },
      { q: 'E24 系列是什么？', a: '把每十倍分成二十四档的标准值：10、11、12、13、15……按对数均匀排开，所以不管要什么值，都有一个落在 5% 以内。' },
      { q: '为什么写 4k7 而不是 4700Ω？', a: '因为小数点在印刷时会糊掉或消失，4.7 就看成了 47。把单位放在小数点的位置就不会认错。' },
      { q: '五环电阻怎么读？', a: '先读三位数字，接着是倍率。因为多读一位，倍率要往下退一档。' },
      { q: '±5% 实际差多少？', a: '4.7kΩ 的可以在 4,465Ω 到 4,935Ω 之间，几乎挨着隔壁 4.3kΩ 和 5.1kΩ 的范围。' },
    ],
    [
      { q: '色環該從哪一頭讀？', a: '誤差環稍稍離開的那一頭是尾。看到金色或銀色，那就是最後一環。' },
      { q: 'E24 系列是什麼？', a: '把每十倍分成二十四檔的標準值：10、11、12、13、15……按對數均勻排開，所以不管要什麼值，都有一個落在 5% 以內。' },
      { q: '為什麼寫 4k7 而不是 4700Ω？', a: '因為小數點在印刷時會糊掉或消失，4.7 就看成了 47。把單位放在小數點的位置就不會認錯。' },
      { q: '五環電阻怎麼讀？', a: '先讀三位數字，接著是倍率。因為多讀一位，倍率要往下退一檔。' },
      { q: '±5% 實際差多少？', a: '4.7kΩ 的可以在 4,465Ω 到 4,935Ω 之間，幾乎挨著隔壁 4.3kΩ 和 5.1kΩ 的範圍。' },
    ],
  ),

  valueFaq: T<(f: ResistorFacts) => FaqItem[]>(
    f => [
      { q: `${f.display} 저항의 색띠는 무엇인가요?`, a: `${bandText(f.bands4, 'ko')} 네 띠입니다. 다섯 띠로는 ${bandText(f.bands5, 'ko')}입니다.` },
      { q: `${f.display}은 어떻게 읽나요?`, a: `앞의 두 자리가 ${f.base}이고 그 뒤에 0이 ${f.exp}개 붙어 ${f.ohms}Ω이 됩니다. 짧게는 ${f.code}로 적습니다.` },
      { q: `오차를 감안하면 실제 값은 얼마인가요?`, a: `±${f.tolerance}%이므로 ${f.min}Ω에서 ${f.max}Ω 사이입니다.` },
      { q: `${f.display}은 흔한 값인가요?`, a: `${f.series} 계열에 듭니다. ${f.series === 'E6' ? '가장 성긴 계열이라 어디서나 구할 수 있습니다.' : f.series === 'E12' ? '웬만한 부품 상자에는 들어 있습니다.' : 'E24까지 갖춘 곳에서 구할 수 있습니다.'}` },
    ],
    f => [
      { q: `What are the colour bands for ${f.display}?`, a: `${bandText(f.bands4, 'en')} in four bands, or ${bandText(f.bands5, 'en')} in five.` },
      { q: `How is ${f.display} read?`, a: `The first two digits are ${f.base}, followed by ${f.exp} zeros, giving ${f.ohms} Ω. In short form, ${f.code}.` },
      { q: `What is the real value once tolerance is counted?`, a: `At ±${f.tolerance}% it lies between ${f.min} Ω and ${f.max} Ω.` },
      { q: `Is ${f.display} a common value?`, a: `It belongs to ${f.series}. ${f.series === 'E6' ? 'That is the coarsest series, so it turns up everywhere.' : f.series === 'E12' ? 'Most parts boxes carry it.' : 'You will find it wherever the full E24 range is stocked.'}` },
    ],
    f => [
      { q: `¿Cuáles son las bandas de ${f.display}?`, a: `${bandText(f.bands4, 'es')} en cuatro bandas, o ${bandText(f.bands5, 'es')} en cinco.` },
      { q: `¿Cómo se lee ${f.display}?`, a: `Los dos primeros dígitos son ${f.base}, seguidos de ${f.exp} ceros: ${f.ohms} Ω. En forma corta, ${f.code}.` },
      { q: `¿Cuál es el valor real con la tolerancia?`, a: `Con ±${f.tolerance}% queda entre ${f.min} Ω y ${f.max} Ω.` },
      { q: `¿Es ${f.display} un valor común?`, a: `Pertenece a ${f.series}. ${f.series === 'E6' ? 'Es la serie más gruesa, así que aparece en todas partes.' : f.series === 'E12' ? 'Casi cualquier caja de componentes lo lleva.' : 'Se encuentra donde tengan la E24 completa.'}` },
    ],
    f => [
      { q: `Quais são as faixas de ${f.display}?`, a: `${bandText(f.bands4, 'pt')} em quatro faixas, ou ${bandText(f.bands5, 'pt')} em cinco.` },
      { q: `Como se lê ${f.display}?`, a: `Os dois primeiros dígitos são ${f.base}, seguidos de ${f.exp} zeros: ${f.ohms} Ω. Em forma curta, ${f.code}.` },
      { q: `Qual é o valor real com a tolerância?`, a: `Com ±${f.tolerance}% fica entre ${f.min} Ω e ${f.max} Ω.` },
      { q: `${f.display} é um valor comum?`, a: `Pertence à ${f.series}. ${f.series === 'E6' ? 'É a série mais grossa, então aparece em toda parte.' : f.series === 'E12' ? 'Quase toda caixa de componentes tem.' : 'Encontra-se onde houver a E24 completa.'}` },
    ],
    f => [
      { q: `${f.display} 抵抗のカラーコードは？`, a: `4本なら ${bandText(f.bands4, 'ja')}、5本なら ${bandText(f.bands5, 'ja')} です。` },
      { q: `${f.display}はどう読みますか？`, a: `前の二桁が${f.base}で、そのうしろに0が${f.exp}個ついて${f.ohms}Ωになります。短くは${f.code}と書きます。` },
      { q: `誤差を入れると実際の値は？`, a: `±${f.tolerance}%なので${f.min}Ω〜${f.max}Ωです。` },
      { q: `${f.display}はよくある値ですか？`, a: `${f.series}系列に入ります。${f.series === 'E6' ? '一番粗い系列なので、どこでも手に入ります。' : f.series === 'E12' ? 'たいていの部品箱に入っています。' : 'E24まで揃えている店なら手に入ります。'}` },
    ],
    f => [
      { q: `Welche Ringe hat ${f.display}?`, a: `${bandText(f.bands4, 'de')} bei vier Ringen, ${bandText(f.bands5, 'de')} bei fünf.` },
      { q: `Wie liest man ${f.display}?`, a: `Die ersten beiden Ziffern sind ${f.base}, dahinter ${f.exp} Nullen — also ${f.ohms} Ω. Kurz: ${f.code}.` },
      { q: `Wie groß ist der wirkliche Wert mit Toleranz?`, a: `Bei ±${f.tolerance} % liegt er zwischen ${f.min} Ω und ${f.max} Ω.` },
      { q: `Ist ${f.display} ein gängiger Wert?`, a: `Er gehört zur ${f.series}. ${f.series === 'E6' ? 'Das ist die gröbste Reihe — den gibt es überall.' : f.series === 'E12' ? 'In den meisten Sortimentskästen enthalten.' : 'Zu finden, wo die volle E24 geführt wird.'}` },
    ],
    f => [
      { q: `Quels anneaux pour ${f.display} ?`, a: `${bandText(f.bands4, 'fr')} à quatre anneaux, ou ${bandText(f.bands5, 'fr')} à cinq.` },
      { q: `Comment lit-on ${f.display} ?`, a: `Les deux premiers chiffres font ${f.base}, suivis de ${f.exp} zéros : ${f.ohms} Ω. En abrégé, ${f.code}.` },
      { q: `Quelle est la valeur réelle avec la tolérance ?`, a: `À ±${f.tolerance} %, elle est comprise entre ${f.min} Ω et ${f.max} Ω.` },
      { q: `${f.display} est-elle une valeur courante ?`, a: `Elle appartient à la ${f.series}. ${f.series === 'E6' ? 'C’est la série la plus grossière : on la trouve partout.' : f.series === 'E12' ? 'La plupart des boîtes d’assortiment en contiennent.' : 'On la trouve là où la E24 complète est proposée.'}` },
    ],
    f => [
      { q: `${f.display} के रंग बैंड क्या हैं?`, a: `चार बैंड में ${bandText(f.bands4, 'hi')}, पाँच बैंड में ${bandText(f.bands5, 'hi')}।` },
      { q: `${f.display} कैसे पढ़ें?`, a: `पहले दो अंक ${f.base} हैं, उसके बाद ${f.exp} शून्य — यानी ${f.ohms} Ω। छोटे रूप में ${f.code}।` },
      { q: `सहनशीलता के साथ असली मान क्या है?`, a: `±${f.tolerance}% पर यह ${f.min} Ω से ${f.max} Ω के बीच रहता है।` },
      { q: `क्या ${f.display} आम मान है?`, a: `यह ${f.series} में आता है। ${f.series === 'E6' ? 'सबसे मोटी श्रेणी है, हर जगह मिल जाता है।' : f.series === 'E12' ? 'अधिकतर पुर्ज़ों के डिब्बों में होता है।' : 'जहाँ पूरी E24 रखी हो, वहाँ मिलता है।'}` },
    ],
    f => [
      { q: `${f.display} 电阻的色环是什么？`, a: `四环是 ${bandText(f.bands4, 'zh')}，五环是 ${bandText(f.bands5, 'zh')}。` },
      { q: `${f.display} 怎么读出来？`, a: `前两位是 ${f.base}，后面跟 ${f.exp} 个 0，就是 ${f.ohms}Ω。简写作 ${f.code}。` },
      { q: `算上误差，实际值是多少？`, a: `按 ±${f.tolerance}%，在 ${f.min}Ω 到 ${f.max}Ω 之间。` },
      { q: `${f.display} 常见吗？`, a: `它属于 ${f.series} 系列。${f.series === 'E6' ? '这是最粗的一档，到处都有。' : f.series === 'E12' ? '一般的元件盒里都有。' : '备齐 E24 的地方能买到。'}` },
    ],
    f => [
      { q: `${f.display} 電阻的色環是什麼？`, a: `四環是 ${bandText(f.bands4, 'tw')}，五環是 ${bandText(f.bands5, 'tw')}。` },
      { q: `${f.display} 怎麼讀出來？`, a: `前兩位是 ${f.base}，後面跟 ${f.exp} 個 0，就是 ${f.ohms}Ω。簡寫作 ${f.code}。` },
      { q: `算上誤差，實際值是多少？`, a: `按 ±${f.tolerance}%，在 ${f.min}Ω 到 ${f.max}Ω 之間。` },
      { q: `${f.display} 常見嗎？`, a: `它屬於 ${f.series} 系列。${f.series === 'E6' ? '這是最粗的一檔，到處都有。' : f.series === 'E12' ? '一般的零件盒裡都有。' : '備齊 E24 的地方能買到。'}` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const RESISTOR_UI: L<ResistorUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<ResistorUI>;
