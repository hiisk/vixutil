/**
 * 와인 병 화면의 문구 — 열 언어.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { WineFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface WineUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  bottleName: (key: string) => string;
  mlLabel: string;
  litreLabel: string;
  standardLabel: string;
  pourLabel: string;
  glassesLabel: string;
  fullLabel: string;
  remainderLabel: string;
  peopleLabel: string;
  bordeauxLabel: string;
  multipleTitle: string;
  multipleNote: string;
  nameTitle: string;
  nameNote: string;
  ageTitle: string;
  ageNote: string;
  pourTitle: string;
  pourNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  bottleRowTitle: string;
  pourRowTitle: string;
  desc: (f: WineFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: WineFacts) => string;
  metaDesc: (f: WineFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: WineFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Names = Record<string, string>;
const namer = (m: Names) => (key: string) => m[key] ?? key;

const wKo: Names = {
  piccolo: '피콜로', demi: '드미(하프)', jennie: '제니', standard: '표준병', magnum: '매그넘',
  'jeroboam-burgundy': '제로보암(부르고뉴)', rehoboam: '르호보암', 'jeroboam-bordeaux': '제로보암(보르도)',
  methuselah: '므두셀라', salmanazar: '살만아자르', balthazar: '발타자르',
  nebuchadnezzar: '느부갓네살', melchior: '멜키오르', primat: '프리마', doublemagnum: '더블 매그넘',
};
const wEn: Names = {
  piccolo: 'Piccolo', demi: 'Demi (half)', jennie: 'Jennie', standard: 'Standard', magnum: 'Magnum',
  'jeroboam-burgundy': 'Jeroboam (Burgundy)', rehoboam: 'Rehoboam', 'jeroboam-bordeaux': 'Jeroboam (Bordeaux)',
  methuselah: 'Methuselah', salmanazar: 'Salmanazar', balthazar: 'Balthazar',
  nebuchadnezzar: 'Nebuchadnezzar', melchior: 'Melchior', primat: 'Primat', doublemagnum: 'Double Magnum',
};
const wJa: Names = {
  piccolo: 'ピッコロ', demi: 'ドゥミ(ハーフ)', jennie: 'ジェニー', standard: '標準ボトル', magnum: 'マグナム',
  'jeroboam-burgundy': 'ジェロボアム(ブルゴーニュ)', rehoboam: 'レホボアム', 'jeroboam-bordeaux': 'ジェロボアム(ボルドー)',
  methuselah: 'メトシェラ', salmanazar: 'サルマナザール', balthazar: 'バルタザール',
  nebuchadnezzar: 'ネブカドネザル', melchior: 'メルキオール', primat: 'プリマ', doublemagnum: 'ダブルマグナム',
};
const wZh: Names = {
  piccolo: '皮克罗', demi: '半瓶', jennie: '珍妮', standard: '标准瓶', magnum: '马格南',
  'jeroboam-burgundy': '耶罗波安（勃艮第）', rehoboam: '罗波安', 'jeroboam-bordeaux': '耶罗波安（波尔多）',
  methuselah: '玛土撒拉', salmanazar: '撒缦以色', balthazar: '伯沙撒',
  nebuchadnezzar: '尼布甲尼撒', melchior: '梅尔基奥', primat: '普里马', doublemagnum: '双马格南',
};

type Spec = { [K in keyof WineUI]: L<WineUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('와인 병 크기', 'Wine bottle sizes', 'Tamaños de botella', 'Tamanhos de garrafa', 'ワインボトルの大きさ', 'Weinflaschengrößen', 'Formats de bouteille', 'वाइन बोतल आकार', '葡萄酒瓶容量', '葡萄酒瓶容量'),

  hubTitle: T(
    '와인 병 126칸 — 제로보암은 보르도에서 5리터, 부르고뉴에서 3리터입니다',
    '126 wine bottle cells — a Jeroboam is 5 litres in Bordeaux and 3 in Burgundy',
    '126 casillas de botellas — un Jeroboam son 5 litros en Burdeos y 3 en Borgoña',
    '126 células de garrafas — um Jeroboam são 5 litros em Bordeaux e 3 na Borgonha',
    'ワインボトル126マス — ジェロボアムはボルドーで5リットル、ブルゴーニュで3リットルです',
    '126 Weinflaschenfelder — ein Jeroboam fasst in Bordeaux 5, im Burgund 3 Liter',
    '126 cases de bouteilles — un jéroboam fait 5 litres à Bordeaux et 3 en Bourgogne',
    '126 वाइन बोतल खाने — Jeroboam बोर्दो में 5 लीटर, बरगंडी में 3',
    '126 格酒瓶 — 耶罗波安在波尔多是 5 升，在勃艮第是 3 升',
    '126 格酒瓶 — 耶羅波安在波爾多是 5 升，在勃艮第是 3 升',
  ),

  hubLead: T(
    '큰 병에는 성경 속 왕의 이름이 붙는데, 같은 이름이 지방마다 다른 크기를 가리킵니다. 크기 자체는 표준병 750ml의 배수라 계산으로 나옵니다 — 매그넘이 두 병, 므두셀라가 여덟 병, 느부갓네살이 스무 병입니다.',
    'The big bottles carry the names of biblical kings — and the same name means different volumes in different regions. The volumes themselves are multiples of the 750 ml standard, so they follow from arithmetic: a Magnum is two bottles, a Methuselah eight, a Nebuchadnezzar twenty.',
    'Las botellas grandes llevan nombres de reyes bíblicos, y el mismo nombre designa volúmenes distintos según la región. Los volúmenes son múltiplos de la botella estándar de 750 ml: un Magnum son dos botellas, un Methuselah ocho, un Nabucodonosor veinte.',
    'As garrafas grandes levam nomes de reis bíblicos, e o mesmo nome designa volumes diferentes conforme a região. Os volumes são múltiplos da garrafa padrão de 750 ml: um Magnum são duas garrafas, um Methuselah oito, um Nabucodonosor vinte.',
    '大きなボトルには聖書の王の名が付きますが、同じ名前が地方ごとに違う大きさを指します。大きさ自体は標準ボトル750mlの倍数なので計算で出ます — マグナムが2本、メトシェラが8本、ネブカドネザルが20本です。',
    'Die großen Flaschen tragen Namen biblischer Könige — und derselbe Name meint je nach Region ein anderes Volumen. Die Volumina selbst sind Vielfache der 750-ml-Standardflasche: ein Magnum sind zwei Flaschen, ein Methusalem acht, ein Nebukadnezar zwanzig.',
    'Les grands formats portent des noms de rois bibliques, et le même nom désigne des volumes différents selon la région. Les volumes, eux, sont des multiples de la bouteille standard de 750 ml : un magnum vaut deux bouteilles, un mathusalem huit, un nabuchodonosor vingt.',
    'बड़ी बोतलों पर बाइबिल के राजाओं के नाम होते हैं, और वही नाम अलग-अलग क्षेत्रों में अलग आयतन बताता है। आयतन स्वयं 750 ml मानक बोतल के गुणज हैं: Magnum दो बोतल, Methuselah आठ, Nebuchadnezzar बीस।',
    '大瓶用的是圣经里国王的名字，而同一个名字在不同产区指的容量并不相同。容量本身是 750ml 标准瓶的整数倍，算得出来：马格南等于两瓶，玛土撒拉八瓶，尼布甲尼撒二十瓶。',
    '大瓶用的是聖經裡國王的名字，而同一個名字在不同產區指的容量並不相同。容量本身是 750ml 標準瓶的整數倍，算得出來：馬格南等於兩瓶，瑪土撒拉八瓶，尼布甲尼撒二十瓶。',
  ),

  bottleName: T<(k: string) => string>(
    namer(wKo), namer(wEn), namer(wEn), namer(wEn), namer(wJa),
    namer(wEn), namer(wEn), namer(wEn), namer(wZh), namer(wZh),
  ),

  mlLabel: T('용량', 'Volume', 'Volumen', 'Volume', '容量', 'Volumen', 'Volume', 'आयतन', '容量', '容量'),
  litreLabel: T('리터', 'Litres', 'Litros', 'Litros', 'リットル', 'Liter', 'Litres', 'लीटर', '升', '公升'),
  standardLabel: T('표준병 몇 병분', 'Standard bottles', 'Botellas estándar', 'Garrafas padrão', '標準ボトル何本分', 'Standardflaschen', 'Bouteilles standard', 'मानक बोतलें', '折合标准瓶', '折合標準瓶'),
  pourLabel: T('한 잔에 따르는 양', 'Pour per glass', 'Servicio por copa', 'Serviço por taça', '1杯に注ぐ量', 'Menge je Glas', 'Service par verre', 'प्रति गिलास', '每杯倒量', '每杯倒量'),
  glassesLabel: T('잔 수', 'Glasses', 'Copas', 'Taças', '杯数', 'Gläser', 'Verres', 'गिलास', '杯数', '杯數'),
  fullLabel: T('가득 채운 잔', 'Full glasses', 'Copas llenas', 'Taças cheias', '満杯の杯', 'Volle Gläser', 'Verres pleins', 'भरे गिलास', '满杯数', '滿杯數'),
  remainderLabel: T('남는 양', 'Left over', 'Sobrante', 'Sobra', '残る量', 'Rest', 'Reste', 'बचा हुआ', '剩余', '剩餘'),
  peopleLabel: T('두 잔씩이면 몇 사람', 'People at two glasses each', 'Personas a dos copas', 'Pessoas a duas taças', '2杯ずつなら何人', 'Personen à zwei Gläser', 'Personnes à deux verres', 'दो-दो गिलास पर लोग', '每人两杯可供几人', '每人兩杯可供幾人'),
  bordeauxLabel: T('보르도에서 부르는 이름', 'Called in Bordeaux', 'En Burdeos se llama', 'Em Bordeaux chama-se', 'ボルドーでの呼び名', 'In Bordeaux genannt', 'Nom à Bordeaux', 'बोर्दो में नाम', '波尔多的叫法', '波爾多的叫法'),

  multipleTitle: T('크기는 표준병의 배수입니다', 'The volumes are multiples of one bottle', 'Los volúmenes son múltiplos de una botella', 'Os volumes são múltiplos de uma garrafa', '大きさは標準ボトルの倍数です', 'Die Volumina sind Vielfache einer Flasche', 'Les volumes sont des multiples d’une bouteille', 'आयतन एक बोतल के गुणज हैं', '容量是标准瓶的整数倍', '容量是標準瓶的整數倍'),

  multipleNote: T(
    '표준병 750ml를 하나로 세면 매그넘이 둘, 부르고뉴 제로보암이 넷, 르호보암이 여섯, 므두셀라가 여덟, 살만아자르가 열둘, 발타자르가 열여섯, 느부갓네살이 스물입니다. 보르도 제로보암 5리터만 6과 3분의 2로 딱 떨어지지 않는데, 다른 계보에서 온 크기이기 때문입니다.',
    'Counting the 750 ml standard as one, a Magnum is two, a Burgundy Jeroboam four, a Rehoboam six, a Methuselah eight, a Salmanazar twelve, a Balthazar sixteen and a Nebuchadnezzar twenty. Only the 5-litre Bordeaux Jeroboam refuses to divide evenly, at six and two thirds — it descends from a different tradition.',
    'Contando la botella estándar de 750 ml como una, un Magnum son dos, un Jeroboam de Borgoña cuatro, un Rehoboam seis, un Methuselah ocho, un Salmanazar doce, un Baltasar dieciséis y un Nabucodonosor veinte. Solo el Jeroboam bordelés de 5 litros no divide exacto, en seis y dos tercios: viene de otra tradición.',
    'Contando a garrafa padrão de 750 ml como uma, um Magnum são duas, um Jeroboam da Borgonha quatro, um Rehoboam seis, um Methuselah oito, um Salmanazar doze, um Baltazar dezesseis e um Nabucodonosor vinte. Só o Jeroboam bordalês de 5 litros não divide exato, em seis e dois terços: vem de outra tradição.',
    '標準ボトル750mlを1と数えると、マグナムが2、ブルゴーニュのジェロボアムが4、レホボアムが6、メトシェラが8、サルマナザールが12、バルタザールが16、ネブカドネザルが20です。ボルドーのジェロボアム5リットルだけが6と3分の2で割り切れませんが、別の系譜から来た大きさだからです。',
    'Zählt man die 750-ml-Standardflasche als eins, sind ein Magnum zwei, ein Burgunder Jeroboam vier, ein Rehabeam sechs, ein Methusalem acht, ein Salmanassar zwölf, ein Balthasar sechzehn und ein Nebukadnezar zwanzig. Nur der 5-Liter-Jeroboam aus Bordeaux geht nicht auf — sechs und zwei Drittel; er stammt aus einer anderen Linie.',
    'En comptant la bouteille standard de 750 ml pour une, un magnum en vaut deux, un jéroboam bourguignon quatre, un réhoboam six, un mathusalem huit, un salmanazar douze, un balthazar seize et un nabuchodonosor vingt. Seul le jéroboam bordelais de 5 litres ne tombe pas juste, à six et deux tiers : il vient d’une autre filiation.',
    '750 ml की मानक बोतल को एक गिनें तो Magnum दो, बरगंडी Jeroboam चार, Rehoboam छह, Methuselah आठ, Salmanazar बारह, Balthazar सोलह और Nebuchadnezzar बीस। केवल 5 लीटर वाला बोर्दो Jeroboam पूरा नहीं बँटता — छह और दो-तिहाई; वह दूसरी परंपरा से आया है।',
    '把 750ml 标准瓶算作一瓶，马格南是二，勃艮第耶罗波安四，罗波安六，玛土撒拉八，撒缦以色十二，伯沙撒十六，尼布甲尼撒二十。只有 5 升的波尔多耶罗波安除不尽，是六又三分之二——它出自另一套传统。',
    '把 750ml 標準瓶算作一瓶，馬格南是二，勃艮第耶羅波安四，羅波安六，瑪土撒拉八，撒縵以色十二，伯沙撒十六，尼布甲尼撒二十。只有 5 升的波爾多耶羅波安除不盡，是六又三分之二——它出自另一套傳統。',
  ),

  nameTitle: T('같은 이름이 다른 크기를 가리킵니다', 'One name, two volumes', 'Un nombre, dos volúmenes', 'Um nome, dois volumes', '同じ名前が違う大きさを指します', 'Ein Name, zwei Volumina', 'Un nom, deux volumes', 'एक नाम, दो आयतन', '同一个名字指两种容量', '同一個名字指兩種容量'),

  nameNote: T(
    '제로보암은 부르고뉴와 샹파뉴에서 3리터를, 보르도에서 5리터를 가리킵니다. 게다가 보르도는 3리터짜리를 더블 매그넘이라 부르므로, 같은 병을 두고 두 이름이 오갑니다. 큰 병을 살 때 이름만 보지 말고 리터를 확인해야 하는 이유입니다.',
    'A Jeroboam holds three litres in Burgundy and Champagne but five in Bordeaux. To compound it, Bordeaux calls the three-litre bottle a Double Magnum, so one bottle answers to two names. That is why buying a large format means reading the litres, not the name.',
    'Un Jeroboam contiene tres litros en Borgoña y Champaña, pero cinco en Burdeos. Para colmo, Burdeos llama Doble Magnum a la botella de tres litros, así que un mismo formato responde a dos nombres. Por eso, al comprar un formato grande, hay que mirar los litros y no el nombre.',
    'Um Jeroboam tem três litros na Borgonha e em Champanhe, mas cinco em Bordeaux. Para piorar, Bordeaux chama a garrafa de três litros de Double Magnum, então um mesmo formato atende por dois nomes. Por isso, ao comprar formato grande, leia os litros, não o nome.',
    'ジェロボアムはブルゴーニュとシャンパーニュで3リットル、ボルドーで5リットルを指します。しかもボルドーは3リットルのものをダブルマグナムと呼ぶので、同じボトルに二つの名前が行き来します。大きなボトルを買うとき名前ではなくリットルを確かめるべき理由です。',
    'Ein Jeroboam fasst im Burgund und in der Champagne drei Liter, in Bordeaux fünf. Erschwerend nennt Bordeaux die Drei-Liter-Flasche Doppelmagnum — dieselbe Flasche hört also auf zwei Namen. Darum liest man beim Großformat die Liter, nicht den Namen.',
    'Un jéroboam contient trois litres en Bourgogne et en Champagne, mais cinq à Bordeaux. Pis, Bordeaux appelle double magnum la bouteille de trois litres : un même flacon répond donc à deux noms. D’où la règle, pour un grand format : lire les litres, pas le nom.',
    'Jeroboam बरगंडी और शैंपेन में तीन लीटर रखता है, पर बोर्दो में पाँच। ऊपर से बोर्दो तीन लीटर वाली बोतल को Double Magnum कहता है, सो एक ही बोतल के दो नाम चलते हैं। इसीलिए बड़ा फ़ॉर्मैट ख़रीदते समय नाम नहीं, लीटर देखें।',
    '耶罗波安在勃艮第和香槟指三升，在波尔多指五升。更麻烦的是，波尔多把三升那只叫双马格南，于是同一只瓶子有两个名字。所以买大瓶时要看升数，别看名字。',
    '耶羅波安在勃艮第和香檳指三升，在波爾多指五升。更麻煩的是，波爾多把三升那隻叫雙馬格南，於是同一隻瓶子有兩個名字。所以買大瓶時要看升數，別看名字。',
  ),

  ageTitle: T('큰 병이 천천히 익습니다', 'Big bottles age more slowly', 'Las botellas grandes envejecen más despacio', 'Garrafas grandes envelhecem mais devagar', '大きなボトルはゆっくり熟成します', 'Große Flaschen reifen langsamer', 'Les grands formats vieillissent plus lentement', 'बड़ी बोतलें धीरे पकती हैं', '大瓶陈化更慢', '大瓶陳化更慢'),

  ageNote: T(
    '코르크가 닿는 면적은 병이 커져도 그대로인데 담긴 술은 늘어납니다. 그래서 술 한 몫에 닿는 공기가 줄어 매그넘 이상은 표준병보다 천천히 익습니다. 오래 두고 마실 와인을 큰 병으로 사는 관행이 여기서 나왔습니다.',
    'The cork’s surface stays the same however large the bottle grows, while the wine inside multiplies. Less air per unit of wine means a Magnum and larger mature more slowly than a standard bottle — which is why wines meant for long keeping are bought in big formats.',
    'La superficie del corcho no cambia por mucho que crezca la botella, pero el vino de dentro se multiplica. Menos aire por unidad de vino significa que un Magnum y formatos mayores evolucionan más despacio que la botella estándar: de ahí la costumbre de comprar en gran formato los vinos de guarda.',
    'A superfície da rolha não muda por maior que fique a garrafa, enquanto o vinho dentro se multiplica. Menos ar por unidade de vinho faz o Magnum e maiores amadurecerem mais devagar que a garrafa padrão — daí o costume de comprar em grande formato os vinhos de guarda.',
    'コルクが触れる面積はボトルが大きくなっても変わらないのに、入っている酒は増えます。だから酒一単位あたりに触れる空気が減り、マグナム以上は標準ボトルよりゆっくり熟成します。長く置いて飲むワインを大きなボトルで買う習わしはここから来ました。',
    'Die Korkfläche bleibt gleich, wie groß die Flasche auch wird, während der Inhalt sich vervielfacht. Weniger Luft je Weinmenge heißt: Magnum und größer reifen langsamer als die Standardflasche — daher kauft man lange zu lagernde Weine im Großformat.',
    'La surface du bouchon ne change pas quand la bouteille grandit, alors que le vin, lui, se multiplie. Moins d’air par unité de vin : magnum et au-delà évoluent plus lentement que la bouteille standard — d’où l’habitude d’acheter en grand format les vins de garde.',
    'बोतल कितनी भी बड़ी हो, कॉर्क का सतही क्षेत्रफल वही रहता है, जबकि भीतर की शराब बढ़ जाती है। प्रति इकाई शराब कम हवा का अर्थ है कि Magnum और उससे बड़े मानक बोतल से धीरे पकते हैं — इसीलिए लंबे समय रखने वाली वाइन बड़े फ़ॉर्मैट में ख़रीदी जाती है।',
    '不管瓶子多大，软木塞接触的面积不变，而里面的酒却成倍增加。每单位酒接触的空气更少，所以马格南及以上比标准瓶陈化更慢——要久藏的酒买大瓶，习惯就是这么来的。',
    '不管瓶子多大，軟木塞接觸的面積不變，而裡面的酒卻成倍增加。每單位酒接觸的空氣更少，所以馬格南及以上比標準瓶陳化更慢——要久藏的酒買大瓶，習慣就是這麼來的。',
  ),

  pourTitle: T('한 잔에 얼마나 따르나', 'How much goes in a glass', 'Cuánto se sirve en una copa', 'Quanto se serve numa taça', '1杯にどれだけ注ぐか', 'Wie viel ins Glas kommt', 'Combien verse-t-on', 'एक गिलास में कितना', '一杯倒多少', '一杯倒多少'),

  pourNote: T(
    '식당에서 잔으로 파는 양은 대개 125에서 175ml이고, 시음이라면 50에서 100ml입니다. 표준병 750ml를 150ml씩 따르면 딱 다섯 잔이 나오고, 175ml씩이면 네 잔에 50ml가 남습니다. 잔 크기가 아니라 따르는 양이라는 점을 유의하십시오 — 잔은 향이 모이도록 그보다 훨씬 큽니다.',
    'A restaurant glass is usually 125 to 175 ml, a tasting pour 50 to 100. Poured at 150 ml, a 750 ml standard bottle gives exactly five glasses; at 175 ml it gives four with 50 ml left. Note that this is the pour, not the glass — the glass itself is far larger, so the aromas have room to gather.',
    'Una copa de restaurante suele ser de 125 a 175 ml; una cata, de 50 a 100. Servida a 150 ml, la botella estándar de 750 ml da exactamente cinco copas; a 175 ml da cuatro y sobran 50 ml. Ojo: esto es el servicio, no la copa —la copa es mucho mayor para que se reúnan los aromas.',
    'Uma taça de restaurante costuma ter 125 a 175 ml; uma prova, 50 a 100. Servida a 150 ml, a garrafa padrão de 750 ml dá exatamente cinco taças; a 175 ml dá quatro e sobram 50 ml. Atenção: isto é o serviço, não a taça — a taça é bem maior para os aromas se juntarem.',
    'レストランでグラスで出す量はたいてい125から175ml、テイスティングなら50から100mlです。標準ボトル750mlを150mlずつ注げばちょうど5杯出て、175mlずつなら4杯に50ml残ります。グラスの大きさではなく注ぐ量である点にご注意ください — グラス自体は香りが集まるようもっと大きいです。',
    'Ein Restaurantglas fasst meist 125 bis 175 ml, eine Verkostungsprobe 50 bis 100. Zu 150 ml eingeschenkt ergibt die 750-ml-Flasche genau fünf Gläser, zu 175 ml vier mit 50 ml Rest. Gemeint ist die Ausschankmenge, nicht das Glas — das ist weit größer, damit sich die Aromen sammeln.',
    'Au restaurant, le verre fait généralement 125 à 175 ml, une dégustation 50 à 100. Servie à 150 ml, la bouteille standard de 750 ml donne exactement cinq verres ; à 175 ml, quatre et 50 ml de reste. Il s’agit du service, non du verre — celui-ci est bien plus grand pour laisser les arômes se rassembler.',
    'रेस्तराँ का गिलास आमतौर पर 125 से 175 ml होता है, चखने का 50 से 100। 150 ml डालें तो 750 ml की मानक बोतल से ठीक पाँच गिलास; 175 ml पर चार और 50 ml बचे। ध्यान रहे यह डालने की मात्रा है, गिलास नहीं — गिलास कहीं बड़ा होता है ताकि सुगंध इकट्ठी हो सके।',
    '餐厅按杯卖通常是 125 到 175ml，品鉴则 50 到 100ml。750ml 标准瓶按 150ml 倒，正好五杯；按 175ml 倒，四杯还剩 50ml。注意这是倒入量而不是杯子容量——杯子本身要大得多，好让香气聚拢。',
    '餐廳按杯賣通常是 125 到 175ml，品鑑則 50 到 100ml。750ml 標準瓶按 150ml 倒，正好五杯；按 175ml 倒，四杯還剩 50ml。注意這是倒入量而不是杯子容量——杯子本身要大得多，好讓香氣聚攏。',
  ),

  careTitle: T('아주 큰 병은 다루기가 다릅니다', 'The very large formats are another matter', 'Los formatos enormes son otra cosa', 'Os formatos enormes são outra história', 'とても大きなボトルは扱いが違います', 'Die ganz großen Formate sind eine eigene Sache', 'Les très grands formats, c’est autre chose', 'बहुत बड़े फ़ॉर्मैट अलग बात हैं', '超大瓶另当别论', '超大瓶另當別論'),

  careNote: T(
    '느부갓네살(15리터)은 채우면 25킬로그램이 넘어 혼자 따르기 어렵고, 냉장고나 셀러에 들어가지 않습니다. 잔 수는 계산으로 나오지만 실제로는 디캔터에 옮기거나 두 사람이 함께 잡아야 합니다. 그래서 이런 크기는 마시려고보다 자리를 위해 사는 일이 많습니다.',
    'A Nebuchadnezzar at 15 litres weighs over 25 kg when full — too much to pour single-handed, and it will not go in a fridge or a cellar rack. The glass count still comes out of the arithmetic, but in practice you decant it or hold it with two pairs of hands. Sizes like this are bought for the occasion more than for the drinking.',
    'Un Nabucodonosor de 15 litros pesa más de 25 kg lleno: no se sirve con una mano y no cabe en la nevera ni en el botellero. Las copas salen igual del cálculo, pero en la práctica se decanta o se sujeta entre dos. Estos formatos se compran más por la ocasión que por beber.',
    'Um Nabucodonosor de 15 litros pesa mais de 25 kg cheio: não se serve com uma mão e não cabe na geladeira nem na adega. As taças saem do cálculo do mesmo jeito, mas na prática se decanta ou se segura a quatro mãos. Estes formatos compram-se mais pela ocasião que pela bebida.',
    'ネブカドネザル(15リットル)は満たすと25キロを超え、一人では注ぎにくく冷蔵庫やセラーにも入りません。杯数は計算で出ますが、実際にはデキャンタに移すか二人で持つ必要があります。だからこの大きさは飲むためというより場のために買われることが多いです。',
    'Ein Nebukadnezar mit 15 Litern wiegt gefüllt über 25 kg — einhändig nicht einzuschenken und weder im Kühlschrank noch im Regal unterzubringen. Die Gläserzahl folgt weiter aus der Rechnung, praktisch dekantiert man oder hält zu zweit. Solche Formate kauft man eher für den Anlass als zum Trinken.',
    'Un nabuchodonosor de 15 litres pèse plus de 25 kg plein : impossible à servir d’une main, et il n’entre ni au frigo ni en cave à casiers. Le nombre de verres sort toujours du calcul, mais en pratique on décante ou l’on s’y met à deux. Ces formats s’achètent pour l’occasion plus que pour boire.',
    '15 लीटर का Nebuchadnezzar भरा हुआ 25 किलो से ऊपर होता है — एक हाथ से डालना मुश्किल, और वह फ़्रिज या सेलर में समाता नहीं। गिलासों की गिनती गणना से निकलती ही है, पर व्यवहार में डिकैंट करना पड़ता है या दो लोग मिलकर पकड़ते हैं। ऐसे फ़ॉर्मैट पीने से ज़्यादा मौक़े के लिए ख़रीदे जाते हैं।',
    '15 升的尼布甲尼撒装满超过 25 公斤，一个人倒不动，冰箱和酒柜也放不下。杯数照样算得出来，实际却要醒酒器或两个人一起端。这种规格更多是为场合买的，不是为了喝。',
    '15 公升的尼布甲尼撒裝滿超過 25 公斤，一個人倒不動，冰箱和酒櫃也放不下。杯數照樣算得出來，實際卻要醒酒器或兩個人一起端。這種規格更多是為場合買的，不是為了喝。',
  ),

  tableTitle: T('병과 잔으로 찾기', 'Find it by bottle and pour', 'Búscalo por botella y servicio', 'Ache por garrafa e serviço', 'ボトルと注ぐ量から探す', 'Nach Flasche und Menge suchen', 'Chercher par bouteille et service', 'बोतल और मात्रा से देखें', '按瓶型和倒量查找', '按瓶型和倒量查找'),
  neighbourTitle: T('가까운 잔 크기', 'Nearby pours', 'Servicios cercanos', 'Serviços próximos', '近い注ぐ量', 'Mengen daneben', 'Services voisins', 'पास की मात्राएँ', '相邻倒量', '相鄰倒量'),
  bottleRowTitle: T('같은 병, 다른 잔', 'Same bottle, other pours', 'Misma botella, otros servicios', 'Mesma garrafa, outros serviços', '同じボトル、別の量', 'Gleiche Flasche, andere Mengen', 'Même bouteille, autres services', 'वही बोतल, दूसरी मात्राएँ', '同一瓶，不同倒量', '同一瓶，不同倒量'),
  pourRowTitle: T('같은 잔, 다른 병', 'Same pour, other bottles', 'Mismo servicio, otras botellas', 'Mesmo serviço, outras garrafas', '同じ量、別のボトル', 'Gleiche Menge, andere Flaschen', 'Même service, autres bouteilles', 'वही मात्रा, दूसरी बोतलें', '同一倒量，不同瓶型', '同一倒量，不同瓶型'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '잔 수 = 병 용량 ÷ 한 잔에 따르는 양.',
      '큰 병의 크기는 표준병 750ml의 배수입니다.',
      '제로보암은 보르도 5리터, 부르고뉴 3리터로 갈립니다.',
      '사람 수는 한 사람 두 잔으로 어림한 값입니다.',
    ],
    [
      'Glasses = bottle volume ÷ the pour per glass.',
      'The large formats are multiples of the 750 ml standard.',
      'A Jeroboam is five litres in Bordeaux, three in Burgundy.',
      'The head count assumes two glasses each.',
    ],
    [
      'Copas = volumen de la botella ÷ servicio por copa.',
      'Los formatos grandes son múltiplos de la botella estándar de 750 ml.',
      'Un Jeroboam son cinco litros en Burdeos y tres en Borgoña.',
      'El número de personas supone dos copas por cabeza.',
    ],
    [
      'Taças = volume da garrafa ÷ serviço por taça.',
      'Os formatos grandes são múltiplos da garrafa padrão de 750 ml.',
      'Um Jeroboam são cinco litros em Bordeaux e três na Borgonha.',
      'A contagem de pessoas supõe duas taças por cabeça.',
    ],
    [
      '杯数 = ボトルの容量 ÷ 1杯に注ぐ量。',
      '大きなボトルの大きさは標準ボトル750mlの倍数です。',
      'ジェロボアムはボルドーで5リットル、ブルゴーニュで3リットルに分かれます。',
      '人数は1人2杯で見積もった値です。',
    ],
    [
      'Gläser = Flaschenvolumen ÷ Menge je Glas.',
      'Die Großformate sind Vielfache der 750-ml-Standardflasche.',
      'Ein Jeroboam fasst in Bordeaux fünf, im Burgund drei Liter.',
      'Die Personenzahl rechnet mit zwei Gläsern pro Kopf.',
    ],
    [
      'Verres = volume de la bouteille ÷ service par verre.',
      'Les grands formats sont des multiples de la bouteille de 750 ml.',
      'Un jéroboam fait cinq litres à Bordeaux, trois en Bourgogne.',
      'Le nombre de convives suppose deux verres par personne.',
    ],
    [
      'गिलास = बोतल का आयतन ÷ प्रति गिलास मात्रा।',
      'बड़े फ़ॉर्मैट 750 ml मानक बोतल के गुणज हैं।',
      'Jeroboam बोर्दो में पाँच लीटर, बरगंडी में तीन।',
      'लोगों की गिनती प्रति व्यक्ति दो गिलास मानकर है।',
    ],
    [
      '杯数 = 瓶容量 ÷ 每杯倒量。',
      '大瓶容量是 750ml 标准瓶的整数倍。',
      '耶罗波安在波尔多是五升，在勃艮第是三升。',
      '人数按每人两杯估算。',
    ],
    [
      '杯數 = 瓶容量 ÷ 每杯倒量。',
      '大瓶容量是 750ml 標準瓶的整數倍。',
      '耶羅波安在波爾多是五升，在勃艮第是三升。',
      '人數按每人兩杯估算。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '와인 병 크기와 잔 수 — 매그넘부터 느부갓네살까지',
    'Wine bottle sizes and glasses — from Magnum to Nebuchadnezzar',
    'Tamaños de botella y copas — del Magnum al Nabucodonosor',
    'Tamanhos de garrafa e taças — do Magnum ao Nabucodonosor',
    'ワインボトルの大きさと杯数 — マグナムからネブカドネザルまで',
    'Weinflaschengrößen und Gläser — vom Magnum bis zum Nebukadnezar',
    'Formats de bouteille et verres — du magnum au nabuchodonosor',
    'वाइन बोतल आकार और गिलास — Magnum से Nebuchadnezzar तक',
    '葡萄酒瓶容量与杯数 — 从马格南到尼布甲尼撒',
    '葡萄酒瓶容量與杯數 — 從馬格南到尼布甲尼撒',
  ),

  hubMetaDesc: T(
    '표준병 750ml를 150ml씩 따르면 다섯 잔입니다. 큰 병은 표준병의 배수라 매그넘이 두 병, 므두셀라가 여덟 병, 느부갓네살이 스무 병입니다. 제로보암만 보르도 5리터·부르고뉴 3리터로 갈립니다.',
    'A 750 ml standard bottle poured at 150 ml gives five glasses. The large formats are multiples of it: a Magnum is two bottles, a Methuselah eight, a Nebuchadnezzar twenty. Only the Jeroboam splits — five litres in Bordeaux, three in Burgundy.',
    'Una botella estándar de 750 ml servida a 150 ml da cinco copas. Los formatos grandes son múltiplos suyos: un Magnum son dos botellas, un Methuselah ocho, un Nabucodonosor veinte. Solo el Jeroboam se parte: cinco litros en Burdeos, tres en Borgoña.',
    'Uma garrafa padrão de 750 ml servida a 150 ml dá cinco taças. Os formatos grandes são múltiplos dela: um Magnum são duas garrafas, um Methuselah oito, um Nabucodonosor vinte. Só o Jeroboam se divide: cinco litros em Bordeaux, três na Borgonha.',
    '標準ボトル750mlを150mlずつ注げば5杯です。大きなボトルは標準ボトルの倍数で、マグナムが2本、メトシェラが8本、ネブカドネザルが20本です。ジェロボアムだけがボルドー5リットル・ブルゴーニュ3リットルに分かれます。',
    'Eine 750-ml-Standardflasche zu 150 ml eingeschenkt ergibt fünf Gläser. Die Großformate sind Vielfache davon: Magnum zwei Flaschen, Methusalem acht, Nebukadnezar zwanzig. Nur der Jeroboam teilt sich — fünf Liter in Bordeaux, drei im Burgund.',
    'Une bouteille standard de 750 ml servie à 150 ml donne cinq verres. Les grands formats en sont des multiples : magnum deux bouteilles, mathusalem huit, nabuchodonosor vingt. Seul le jéroboam se dédouble — cinq litres à Bordeaux, trois en Bourgogne.',
    '750 ml की मानक बोतल 150 ml डालने पर पाँच गिलास देती है। बड़े फ़ॉर्मैट इसके गुणज हैं: Magnum दो बोतल, Methuselah आठ, Nebuchadnezzar बीस। केवल Jeroboam बँटता है — बोर्दो में पाँच लीटर, बरगंडी में तीन।',
    '750ml 标准瓶按 150ml 倒是五杯。大瓶都是它的整数倍：马格南两瓶，玛土撒拉八瓶，尼布甲尼撒二十瓶。只有耶罗波安分家——波尔多五升，勃艮第三升。',
    '750ml 標準瓶按 150ml 倒是五杯。大瓶都是它的整數倍：馬格南兩瓶，瑪土撒拉八瓶，尼布甲尼撒二十瓶。只有耶羅波安分家——波爾多五升，勃艮第三升。',
  ),

  desc: T<(f: WineFacts) => string>(
    f => `${f.litres}리터, 표준병 ${f.standards}병분입니다. ${f.cell.pour}ml씩 따르면 ${f.fullGlasses}잔이 나오고 ${f.remainder}ml가 남습니다.`,
    f => `${f.litres} litres, or ${f.standards} standard bottles. Poured at ${f.cell.pour} ml it fills ${f.fullGlasses} glasses with ${f.remainder} ml left.`,
    f => `${f.litres} litros, o ${f.standards} botellas estándar. Servida a ${f.cell.pour} ml llena ${f.fullGlasses} copas y sobran ${f.remainder} ml.`,
    f => `${f.litres} litros, ou ${f.standards} garrafas padrão. Servida a ${f.cell.pour} ml enche ${f.fullGlasses} taças e sobram ${f.remainder} ml.`,
    f => `${f.litres}リットル、標準ボトル${f.standards}本分です。${f.cell.pour}mlずつ注げば${f.fullGlasses}杯出て${f.remainder}ml残ります。`,
    f => `${f.litres} Liter, also ${f.standards} Standardflaschen. Zu ${f.cell.pour} ml eingeschenkt ergibt das ${f.fullGlasses} Gläser mit ${f.remainder} ml Rest.`,
    f => `${f.litres} litres, soit ${f.standards} bouteilles standard. Servie à ${f.cell.pour} ml, elle remplit ${f.fullGlasses} verres et laisse ${f.remainder} ml.`,
    f => `${f.litres} लीटर, यानी ${f.standards} मानक बोतलें। ${f.cell.pour} ml डालने पर ${f.fullGlasses} गिलास भरते हैं और ${f.remainder} ml बचता है।`,
    f => `${f.litres} 升，折合 ${f.standards} 瓶标准瓶。按 ${f.cell.pour}ml 倒可斟 ${f.fullGlasses} 杯，剩 ${f.remainder}ml。`,
    f => `${f.litres} 公升，折合 ${f.standards} 瓶標準瓶。按 ${f.cell.pour}ml 倒可斟 ${f.fullGlasses} 杯，剩 ${f.remainder}ml。`,
  ),

  metaTitle: T<(f: WineFacts) => string>(
    f => `${wKo[f.cell.bottle]} · ${f.cell.pour}ml — ${f.fullGlasses}잔`,
    f => `${wEn[f.cell.bottle]} at ${f.cell.pour} ml — ${f.fullGlasses} glasses`,
    f => `${wEn[f.cell.bottle]} a ${f.cell.pour} ml — ${f.fullGlasses} copas`,
    f => `${wEn[f.cell.bottle]} a ${f.cell.pour} ml — ${f.fullGlasses} taças`,
    f => `${wJa[f.cell.bottle]}・${f.cell.pour}ml — ${f.fullGlasses}杯`,
    f => `${wEn[f.cell.bottle]} zu ${f.cell.pour} ml — ${f.fullGlasses} Gläser`,
    f => `${wEn[f.cell.bottle]} à ${f.cell.pour} ml — ${f.fullGlasses} verres`,
    f => `${wEn[f.cell.bottle]}, ${f.cell.pour} ml — ${f.fullGlasses} गिलास`,
    f => `${wZh[f.cell.bottle]} · ${f.cell.pour}ml — ${f.fullGlasses} 杯`,
    f => `${wZh[f.cell.bottle]} · ${f.cell.pour}ml — ${f.fullGlasses} 杯`,
  ),

  metaDesc: T<(f: WineFacts) => string>(
    f => `${wKo[f.cell.bottle]}은 ${f.litres}리터로 표준병 ${f.standards}병분입니다. ${f.cell.pour}ml씩 따르면 ${f.fullGlasses}잔이 나오고 ${f.remainder}ml가 남으며, 한 사람이 두 잔씩이면 ${f.people}사람 몫입니다.`,
    f => `${wEn[f.cell.bottle]} holds ${f.litres} litres, ${f.standards} standard bottles. At ${f.cell.pour} ml a glass it fills ${f.fullGlasses} glasses with ${f.remainder} ml left — enough for ${f.people} people at two glasses each.`,
    f => `${wEn[f.cell.bottle]} contiene ${f.litres} litros, ${f.standards} botellas estándar. A ${f.cell.pour} ml por copa llena ${f.fullGlasses} copas y sobran ${f.remainder} ml: alcanza para ${f.people} personas a dos copas.`,
    f => `${wEn[f.cell.bottle]} tem ${f.litres} litros, ${f.standards} garrafas padrão. A ${f.cell.pour} ml por taça enche ${f.fullGlasses} taças e sobram ${f.remainder} ml: dá para ${f.people} pessoas a duas taças.`,
    f => `${wJa[f.cell.bottle]}は${f.litres}リットルで標準ボトル${f.standards}本分です。${f.cell.pour}mlずつ注げば${f.fullGlasses}杯出て${f.remainder}ml残り、1人2杯なら${f.people}人分です。`,
    f => `${wEn[f.cell.bottle]} fasst ${f.litres} Liter, also ${f.standards} Standardflaschen. Zu ${f.cell.pour} ml je Glas ergibt das ${f.fullGlasses} Gläser mit ${f.remainder} ml Rest — genug für ${f.people} Personen à zwei Gläser.`,
    f => `${wEn[f.cell.bottle]} contient ${f.litres} litres, soit ${f.standards} bouteilles standard. À ${f.cell.pour} ml par verre, cela fait ${f.fullGlasses} verres et ${f.remainder} ml de reste — de quoi servir ${f.people} personnes à deux verres.`,
    f => `${wEn[f.cell.bottle]} में ${f.litres} लीटर, यानी ${f.standards} मानक बोतलें। ${f.cell.pour} ml प्रति गिलास पर ${f.fullGlasses} गिलास भरते हैं और ${f.remainder} ml बचता है — दो-दो गिलास पर ${f.people} लोगों के लिए।`,
    f => `${wZh[f.cell.bottle]} 容量 ${f.litres} 升，折合 ${f.standards} 瓶标准瓶。每杯 ${f.cell.pour}ml 可斟 ${f.fullGlasses} 杯，剩 ${f.remainder}ml；每人两杯可供 ${f.people} 人。`,
    f => `${wZh[f.cell.bottle]} 容量 ${f.litres} 公升，折合 ${f.standards} 瓶標準瓶。每杯 ${f.cell.pour}ml 可斟 ${f.fullGlasses} 杯，剩 ${f.remainder}ml；每人兩杯可供 ${f.people} 人。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '와인 한 병에 몇 잔이 나오나요?', a: '표준병 750ml를 150ml씩 따르면 다섯 잔입니다. 175ml씩이면 네 잔에 50ml가 남습니다.' },
      { q: '매그넘은 몇 리터인가요?', a: '1.5리터로 표준병 두 병분입니다.' },
      { q: '제로보암은 몇 리터인가요?', a: '지방마다 다릅니다. 부르고뉴·샹파뉴에서 3리터, 보르도에서 5리터입니다.' },
      { q: '느부갓네살은 얼마나 큰가요?', a: '15리터, 표준병 스무 병분입니다. 채우면 25kg이 넘어 혼자 따르기 어렵습니다.' },
      { q: '큰 병이 왜 천천히 익나요?', a: '코르크가 닿는 면적은 그대로인데 술이 늘어 술 한 몫에 닿는 공기가 줄기 때문입니다.' },
    ],
    [
      { q: 'How many glasses in a bottle?', a: 'A 750 ml standard poured at 150 ml gives five; at 175 ml it gives four with 50 ml left.' },
      { q: 'How big is a Magnum?', a: '1.5 litres — two standard bottles.' },
      { q: 'How big is a Jeroboam?', a: 'It depends on the region: three litres in Burgundy and Champagne, five in Bordeaux.' },
      { q: 'And a Nebuchadnezzar?', a: '15 litres, twenty standard bottles. Full, it weighs over 25 kg — not a one-handed pour.' },
      { q: 'Why do big bottles age more slowly?', a: 'The cork’s surface stays the same while the wine multiplies, so there is less air per unit of wine.' },
    ],
    [
      { q: '¿Cuántas copas salen de una botella?', a: 'Una estándar de 750 ml servida a 150 ml da cinco; a 175 ml da cuatro y sobran 50 ml.' },
      { q: '¿Cuánto es un Magnum?', a: '1,5 litros: dos botellas estándar.' },
      { q: '¿Cuánto es un Jeroboam?', a: 'Depende de la región: tres litros en Borgoña y Champaña, cinco en Burdeos.' },
      { q: '¿Y un Nabucodonosor?', a: '15 litros, veinte botellas estándar. Lleno pesa más de 25 kg: no se sirve con una mano.' },
      { q: '¿Por qué envejecen más despacio las botellas grandes?', a: 'La superficie del corcho no cambia mientras el vino se multiplica: hay menos aire por unidad de vino.' },
    ],
    [
      { q: 'Quantas taças saem de uma garrafa?', a: 'Uma padrão de 750 ml servida a 150 ml dá cinco; a 175 ml dá quatro e sobram 50 ml.' },
      { q: 'Quanto é um Magnum?', a: '1,5 litro: duas garrafas padrão.' },
      { q: 'Quanto é um Jeroboam?', a: 'Depende da região: três litros na Borgonha e em Champanhe, cinco em Bordeaux.' },
      { q: 'E um Nabucodonosor?', a: '15 litros, vinte garrafas padrão. Cheio pesa mais de 25 kg — não se serve com uma mão.' },
      { q: 'Por que garrafas grandes envelhecem mais devagar?', a: 'A superfície da rolha não muda enquanto o vinho se multiplica: há menos ar por unidade de vinho.' },
    ],
    [
      { q: 'ワイン1本で何杯出ますか？', a: '標準ボトル750mlを150mlずつ注げば5杯です。175mlずつなら4杯に50ml残ります。' },
      { q: 'マグナムは何リットルですか？', a: '1.5リットルで標準ボトル2本分です。' },
      { q: 'ジェロボアムは何リットルですか？', a: '地方によります。ブルゴーニュ・シャンパーニュで3リットル、ボルドーで5リットルです。' },
      { q: 'ネブカドネザルはどれくらい大きいですか？', a: '15リットル、標準ボトル20本分です。満たすと25kgを超え一人では注ぎにくいです。' },
      { q: 'なぜ大きなボトルはゆっくり熟成しますか？', a: 'コルクが触れる面積は変わらないのに酒が増え、酒一単位あたりに触れる空気が減るからです。' },
    ],
    [
      { q: 'Wie viele Gläser gibt eine Flasche?', a: 'Eine 750-ml-Standardflasche zu 150 ml ergibt fünf; zu 175 ml vier mit 50 ml Rest.' },
      { q: 'Wie groß ist ein Magnum?', a: '1,5 Liter — zwei Standardflaschen.' },
      { q: 'Wie groß ist ein Jeroboam?', a: 'Je nach Region: drei Liter im Burgund und in der Champagne, fünf in Bordeaux.' },
      { q: 'Und ein Nebukadnezar?', a: '15 Liter, zwanzig Standardflaschen. Gefüllt über 25 kg — einhändig nicht einzuschenken.' },
      { q: 'Warum reifen große Flaschen langsamer?', a: 'Die Korkfläche bleibt gleich, während der Wein sich vervielfacht — weniger Luft je Weinmenge.' },
    ],
    [
      { q: 'Combien de verres dans une bouteille ?', a: 'Une standard de 750 ml servie à 150 ml en donne cinq ; à 175 ml, quatre et 50 ml de reste.' },
      { q: 'Combien fait un magnum ?', a: '1,5 litre, soit deux bouteilles standard.' },
      { q: 'Combien fait un jéroboam ?', a: 'Cela dépend de la région : trois litres en Bourgogne et en Champagne, cinq à Bordeaux.' },
      { q: 'Et un nabuchodonosor ?', a: '15 litres, vingt bouteilles standard. Plein, il dépasse 25 kg : impossible à servir d’une main.' },
      { q: 'Pourquoi les grands formats vieillissent-ils plus lentement ?', a: 'La surface du bouchon ne change pas alors que le vin se multiplie : moins d’air par unité de vin.' },
    ],
    [
      { q: 'एक बोतल से कितने गिलास निकलते हैं?', a: '750 ml की मानक बोतल 150 ml पर पाँच; 175 ml पर चार और 50 ml बचा।' },
      { q: 'Magnum कितना बड़ा है?', a: '1.5 लीटर — दो मानक बोतलें।' },
      { q: 'Jeroboam कितना बड़ा है?', a: 'क्षेत्र पर निर्भर: बरगंडी और शैंपेन में तीन लीटर, बोर्दो में पाँच।' },
      { q: 'और Nebuchadnezzar?', a: '15 लीटर, बीस मानक बोतलें। भरा हुआ 25 किलो से ऊपर — एक हाथ से नहीं डलता।' },
      { q: 'बड़ी बोतलें धीरे क्यों पकती हैं?', a: 'कॉर्क का क्षेत्रफल वही रहता है जबकि शराब बढ़ती है — प्रति इकाई शराब कम हवा।' },
    ],
    [
      { q: '一瓶酒能倒几杯？', a: '750ml 标准瓶按 150ml 倒是五杯；按 175ml 倒是四杯，剩 50ml。' },
      { q: '马格南是多少升？', a: '1.5 升，等于两瓶标准瓶。' },
      { q: '耶罗波安是多少升？', a: '看产区：勃艮第和香槟是三升，波尔多是五升。' },
      { q: '尼布甲尼撒有多大？', a: '15 升，二十瓶标准瓶。装满超过 25 公斤，一个人倒不动。' },
      { q: '大瓶为什么陈化更慢？', a: '软木塞接触面积不变而酒量成倍增加，每单位酒接触的空气就少了。' },
    ],
    [
      { q: '一瓶酒能倒幾杯？', a: '750ml 標準瓶按 150ml 倒是五杯；按 175ml 倒是四杯，剩 50ml。' },
      { q: '馬格南是多少公升？', a: '1.5 公升，等於兩瓶標準瓶。' },
      { q: '耶羅波安是多少公升？', a: '看產區：勃艮第和香檳是三公升，波爾多是五公升。' },
      { q: '尼布甲尼撒有多大？', a: '15 公升，二十瓶標準瓶。裝滿超過 25 公斤，一個人倒不動。' },
      { q: '大瓶為什麼陳化更慢？', a: '軟木塞接觸面積不變而酒量成倍增加，每單位酒接觸的空氣就少了。' },
    ],
  ),

  cellFaq: T<(f: WineFacts) => FaqItem[]>(
    f => [
      { q: `${wKo[f.cell.bottle]}은 몇 리터인가요?`, a: `${f.litres}리터입니다. 표준병 ${f.standards}병분입니다.` },
      { q: `${f.cell.pour}ml씩 따르면 몇 잔인가요?`, a: `${f.fullGlasses}잔이 나오고 ${f.remainder}ml가 남습니다.` },
      { q: `몇 사람이 마실 수 있나요?`, a: `한 사람이 두 잔씩이면 ${f.people}사람입니다.` },
      { q: f.bordeaux ? `보르도에서는 뭐라고 부르나요?` : `다른 이름도 있나요?`, a: f.bordeaux ? `${wKo[f.bordeaux]}이라고 부릅니다. 같은 크기를 두 이름으로 부르는 자리입니다.` : `이 표에서는 다른 이름이 붙지 않습니다.` },
    ],
    f => [
      { q: `How many litres is a ${wEn[f.cell.bottle]}?`, a: `${f.litres} litres — ${f.standards} standard bottles.` },
      { q: `How many glasses at ${f.cell.pour} ml?`, a: `${f.fullGlasses} full glasses, with ${f.remainder} ml left over.` },
      { q: `How many people does that serve?`, a: `${f.people}, at two glasses each.` },
      { q: f.bordeaux ? `What does Bordeaux call it?` : `Does it go by another name?`, a: f.bordeaux ? `A ${wEn[f.bordeaux]} — the same volume under two names.` : `Not in this table.` },
    ],
    f => [
      { q: `¿Cuántos litros son un ${wEn[f.cell.bottle]}?`, a: `${f.litres} litros: ${f.standards} botellas estándar.` },
      { q: `¿Cuántas copas a ${f.cell.pour} ml?`, a: `${f.fullGlasses} copas llenas y ${f.remainder} ml de sobra.` },
      { q: `¿Para cuántas personas da?`, a: `Para ${f.people}, a dos copas cada una.` },
      { q: f.bordeaux ? `¿Cómo lo llaman en Burdeos?` : `¿Tiene otro nombre?`, a: f.bordeaux ? `${wEn[f.bordeaux]}: el mismo volumen con dos nombres.` : `En esta tabla, no.` },
    ],
    f => [
      { q: `Quantos litros são um ${wEn[f.cell.bottle]}?`, a: `${f.litres} litros: ${f.standards} garrafas padrão.` },
      { q: `Quantas taças a ${f.cell.pour} ml?`, a: `${f.fullGlasses} taças cheias e ${f.remainder} ml de sobra.` },
      { q: `Para quantas pessoas dá?`, a: `Para ${f.people}, a duas taças cada.` },
      { q: f.bordeaux ? `Como chamam em Bordeaux?` : `Tem outro nome?`, a: f.bordeaux ? `${wEn[f.bordeaux]}: o mesmo volume com dois nomes.` : `Nesta tabela, não.` },
    ],
    f => [
      { q: `${wJa[f.cell.bottle]}は何リットルですか？`, a: `${f.litres}リットルです。標準ボトル${f.standards}本分です。` },
      { q: `${f.cell.pour}mlずつ注ぐと何杯ですか？`, a: `${f.fullGlasses}杯出て${f.remainder}ml残ります。` },
      { q: `何人で飲めますか？`, a: `1人2杯なら${f.people}人です。` },
      { q: f.bordeaux ? `ボルドーでは何と呼びますか？` : `別の名前もありますか？`, a: f.bordeaux ? `${wJa[f.bordeaux]}と呼びます。同じ大きさを二つの名前で呼ぶ所です。` : `この表では別名はありません。` },
    ],
    f => [
      { q: `Wie viele Liter fasst ein ${wEn[f.cell.bottle]}?`, a: `${f.litres} Liter — ${f.standards} Standardflaschen.` },
      { q: `Wie viele Gläser zu ${f.cell.pour} ml?`, a: `${f.fullGlasses} volle Gläser, ${f.remainder} ml bleiben.` },
      { q: `Für wie viele Personen reicht das?`, a: `Für ${f.people}, zu je zwei Gläsern.` },
      { q: f.bordeaux ? `Wie heißt sie in Bordeaux?` : `Gibt es einen anderen Namen?`, a: f.bordeaux ? `${wEn[f.bordeaux]} — dasselbe Volumen unter zwei Namen.` : `In dieser Tabelle nicht.` },
    ],
    f => [
      { q: `Combien de litres fait un ${wEn[f.cell.bottle]} ?`, a: `${f.litres} litres, soit ${f.standards} bouteilles standard.` },
      { q: `Combien de verres à ${f.cell.pour} ml ?`, a: `${f.fullGlasses} verres pleins et ${f.remainder} ml de reste.` },
      { q: `Pour combien de personnes ?`, a: `Pour ${f.people}, à deux verres chacune.` },
      { q: f.bordeaux ? `Comment l’appelle-t-on à Bordeaux ?` : `Porte-t-il un autre nom ?`, a: f.bordeaux ? `Un ${wEn[f.bordeaux]} : le même volume sous deux noms.` : `Pas dans ce tableau.` },
    ],
    f => [
      { q: `${wEn[f.cell.bottle]} कितने लीटर का है?`, a: `${f.litres} लीटर — ${f.standards} मानक बोतलें।` },
      { q: `${f.cell.pour} ml पर कितने गिलास?`, a: `${f.fullGlasses} भरे गिलास और ${f.remainder} ml बचा।` },
      { q: `कितने लोगों के लिए?`, a: `${f.people} लोगों के लिए, दो-दो गिलास पर।` },
      { q: f.bordeaux ? `बोर्दो में इसे क्या कहते हैं?` : `क्या इसका कोई और नाम है?`, a: f.bordeaux ? `${wEn[f.bordeaux]} — वही आयतन, दो नाम।` : `इस तालिका में नहीं।` },
    ],
    f => [
      { q: `${wZh[f.cell.bottle]} 是多少升？`, a: `${f.litres} 升，折合 ${f.standards} 瓶标准瓶。` },
      { q: `按 ${f.cell.pour}ml 倒能倒几杯？`, a: `${f.fullGlasses} 满杯，剩 ${f.remainder}ml。` },
      { q: `够几个人喝？`, a: `每人两杯的话，够 ${f.people} 人。` },
      { q: f.bordeaux ? `波尔多怎么叫它？` : `它还有别的名字吗？`, a: f.bordeaux ? `叫${wZh[f.bordeaux]}——同一个容量两个名字。` : `本表中没有别名。` },
    ],
    f => [
      { q: `${wZh[f.cell.bottle]} 是多少公升？`, a: `${f.litres} 公升，折合 ${f.standards} 瓶標準瓶。` },
      { q: `按 ${f.cell.pour}ml 倒能倒幾杯？`, a: `${f.fullGlasses} 滿杯，剩 ${f.remainder}ml。` },
      { q: `夠幾個人喝？`, a: `每人兩杯的話，夠 ${f.people} 人。` },
      { q: f.bordeaux ? `波爾多怎麼叫它？` : `它還有別的名字嗎？`, a: f.bordeaux ? `叫${wZh[f.bordeaux]}——同一個容量兩個名字。` : `本表中沒有別名。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const WINE_UI: L<WineUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<WineUI>;
