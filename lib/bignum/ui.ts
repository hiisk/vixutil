/**
 * 큰 수 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "세 체계가 자리를 다르게 끊는다"이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { BigNumFacts } from './facts.ts';
import type { System } from './list.ts';

export interface FaqItem { q: string; a: string }

export interface BigNumUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  unitName: (key: string) => string;
  systemName: (s: System) => string;
  valueLabel: string;
  digitsLabel: string;
  westernLabel: string;
  indianLabel: string;
  eastLabel: string;
  twinLabel: string;
  amountTitle: string;
  groupTitle: string;
  groupNote: string;
  indianTitle: string;
  indianNote: string;
  eastTitle: string;
  eastNote: string;
  twinTitle: string;
  twinNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  unitRowTitle: string;
  factorRowTitle: string;
  desc: (f: BigNumFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: BigNumFacts) => string;
  metaDesc: (f: BigNumFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: BigNumFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Names = Record<string, string>;
const namer = (m: Names) => (key: string) => m[key] ?? key;

const uKo: Names = { man: '만', lakh: '라크', million: '밀리언', crore: '크로르', eok: '억', billion: '빌리언', arab: '아랍', trillion: '트릴리언', jo: '조', gyeong: '경' };
const uEn: Names = { man: 'man (万)', lakh: 'lakh', million: 'million', crore: 'crore', eok: 'eok (億)', billion: 'billion', arab: 'arab', trillion: 'trillion', jo: 'jo (兆)', gyeong: 'gyeong (京)' };
const uJa: Names = { man: '万', lakh: 'ラーク', million: 'ミリオン', crore: 'クロール', eok: '億', billion: 'ビリオン', arab: 'アラブ', trillion: 'トリリオン', jo: '兆', gyeong: '京' };
const uZh: Names = { man: '万', lakh: '拉克 lakh', million: 'million', crore: '克若尔 crore', eok: '亿', billion: 'billion', arab: '阿拉伯 arab', trillion: 'trillion', jo: '兆', gyeong: '京' };
const uTw: Names = { man: '萬', lakh: '拉克 lakh', million: 'million', crore: '克若爾 crore', eok: '億', billion: 'billion', arab: '阿拉伯 arab', trillion: 'trillion', jo: '兆', gyeong: '京' };
const uHi: Names = { man: 'मान (万)', lakh: 'लाख', million: 'मिलियन', crore: 'करोड़', eok: 'ओक (億)', billion: 'बिलियन', arab: 'अरब', trillion: 'ट्रिलियन', jo: 'जो (兆)', gyeong: 'ग्योंग (京)' };
const uEs: Names = { man: 'man (万)', lakh: 'lakh', million: 'millón', crore: 'crore', eok: 'eok (億)', billion: 'billion (mil millones)', arab: 'arab', trillion: 'trillion (billón)', jo: 'jo (兆)', gyeong: 'gyeong (京)' };
const uPt: Names = { man: 'man (万)', lakh: 'lakh', million: 'milhão', crore: 'crore', eok: 'eok (億)', billion: 'billion (bilhão)', arab: 'arab', trillion: 'trillion (trilhão)', jo: 'jo (兆)', gyeong: 'gyeong (京)' };
const uDe: Names = { man: 'man (万)', lakh: 'Lakh', million: 'Million', crore: 'Crore', eok: 'Eok (億)', billion: 'Billion (Milliarde)', arab: 'Arab', trillion: 'Trillion (Billion)', jo: 'Jo (兆)', gyeong: 'Gyeong (京)' };
const uFr: Names = { man: 'man (万)', lakh: 'lakh', million: 'million', crore: 'crore', eok: 'eok (億)', billion: 'billion (milliard)', arab: 'arab', trillion: 'trillion (billion)', jo: 'jo (兆)', gyeong: 'gyeong (京)' };

const sysKo = (s: System) => ({ western: '영어권', indian: '인도', east: '동아시아' })[s];
const sysEn = (s: System) => ({ western: 'Western', indian: 'Indian', east: 'East Asian' })[s];
const sysEs = (s: System) => ({ western: 'occidental', indian: 'indio', east: 'de Asia oriental' })[s];
const sysPt = (s: System) => ({ western: 'ocidental', indian: 'indiano', east: 'do Leste Asiático' })[s];
const sysJa = (s: System) => ({ western: '英語圏', indian: 'インド', east: '東アジア' })[s];
const sysDe = (s: System) => ({ western: 'westlich', indian: 'indisch', east: 'ostasiatisch' })[s];
const sysFr = (s: System) => ({ western: 'occidental', indian: 'indien', east: 'est-asiatique' })[s];
const sysHi = (s: System) => ({ western: 'पश्चिमी', indian: 'भारतीय', east: 'पूर्वी एशियाई' })[s];
const sysZh = (s: System) => ({ western: '西方', indian: '印度', east: '东亚' })[s];
const sysTw = (s: System) => ({ western: '西方', indian: '印度', east: '東亞' })[s];

type Spec = { [K in keyof BigNumUI]: L<BigNumUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('큰 수 단위', 'Large number units', 'Unidades de números grandes', 'Unidades de números grandes', '大きな数の単位', 'Große Zahlenwörter', 'Unités des grands nombres', 'बड़ी संख्याओं की इकाइयाँ', '大数单位', '大數單位'),

  hubTitle: T(
    '큰 수 100칸 — 세 체계가 자리를 다르게 끊습니다',
    '100 large numbers — three systems cut the digits differently',
    '100 números grandes — tres sistemas cortan las cifras de otro modo',
    '100 números grandes — três sistemas cortam os dígitos de modos diferentes',
    '大きな数100マス — 3つの体系は桁の切り方が違います',
    '100 große Zahlen — drei Systeme gruppieren die Ziffern anders',
    '100 grands nombres — trois systèmes découpent les chiffres autrement',
    '100 बड़ी संख्याएँ — तीन प्रणालियाँ अंकों को अलग-अलग काटती हैं',
    '100 个大数 — 三种体系的分节位置不同',
    '100 個大數 — 三種體系的分節位置不同',
  ),

  hubLead: T(
    '영어권은 셋씩, 인도는 셋 뒤부터 둘씩, 동아시아는 넷씩 끊습니다. 그래서 1 crore가 몇 억인지가 매번 헷갈립니다. 단위 열 가지와 배수 열 가지가 만나는 칸마다 세 가지 표기와 옮겨 센 값을 모두 계산했습니다.',
    'The West groups by three, India takes three then twos, East Asia groups by four. That is why “how many 억 is a crore” never sticks. For every meeting of 10 units and 10 multipliers: all three groupings, and the amount converted into each system.',
    'Occidente agrupa de tres en tres, la India toma tres y luego de dos en dos, y Asia oriental agrupa de cuatro en cuatro. Por eso nunca se recuerda cuántos 억 son un crore. Para cada cruce de 10 unidades y 10 multiplicadores: las tres agrupaciones y la cantidad convertida.',
    'O Ocidente agrupa de três em três, a Índia toma três e depois de dois em dois, o Leste Asiático agrupa de quatro em quatro. Por isso nunca se fixa quantos 억 são um crore. Para cada cruzamento de 10 unidades e 10 multiplicadores: os três agrupamentos e o valor convertido.',
    '英語圏は3桁ずつ、インドは3桁の後は2桁ずつ、東アジアは4桁ずつ区切ります。だから1 croreが何億かが毎回あやふやになります。単位10通りと倍数10通りが出会う各マスで、3通りの表記と換算した値をすべて計算しました。',
    'Der Westen gruppiert zu dritt, Indien nimmt drei und dann je zwei, Ostasien gruppiert zu viert. Darum bleibt nie hängen, wie viele 억 ein Crore sind. Für jede Begegnung von 10 Einheiten und 10 Faktoren: alle drei Gruppierungen und der umgerechnete Wert.',
    'L’Occident groupe par trois, l’Inde prend trois puis des paires, l’Asie de l’Est groupe par quatre. D’où la confusion permanente sur le nombre de 억 dans un crore. Pour chaque croisement de 10 unités et 10 multiplicateurs : les trois découpages et la valeur convertie.',
    'पश्चिम तीन-तीन में बाँटता है, भारत पहले तीन फिर दो-दो में, और पूर्वी एशिया चार-चार में। इसीलिए यह याद नहीं रहता कि एक करोड़ में कितने 억 होते हैं। 10 इकाइयों और 10 गुणकों के हर मेल के लिए तीनों बँटाई और परिवर्तित मान।',
    '西方每三位一节，印度先三位再两位一节，东亚每四位一节。所以"1 crore 是几亿"总是记不住。10 种单位与 10 种倍数交汇的每一格，都算出三种分节写法和换算后的数值。',
    '西方每三位一節，印度先三位再兩位一節，東亞每四位一節。所以「1 crore 是幾億」總是記不住。10 種單位與 10 種倍數交匯的每一格，都算出三種分節寫法和換算後的數值。',
  ),

  unitName: T<(k: string) => string>(
    namer(uKo), namer(uEn), namer(uEs), namer(uPt), namer(uJa),
    namer(uDe), namer(uFr), namer(uHi), namer(uZh), namer(uTw),
  ),

  systemName: T<(s: System) => string>(sysKo, sysEn, sysEs, sysPt, sysJa, sysDe, sysFr, sysHi, sysZh, sysTw),

  valueLabel: T('값', 'Value', 'Valor', 'Valor', '値', 'Wert', 'Valeur', 'मान', '数值', '數值'),
  digitsLabel: T('자릿수', 'Digits', 'Cifras', 'Dígitos', '桁数', 'Stellen', 'Chiffres', 'अंक', '位数', '位數'),
  westernLabel: T('셋씩 끊기', 'Grouped by three', 'Agrupado de tres', 'Agrupado de três', '3桁区切り', 'Dreiergruppen', 'Groupes de trois', 'तीन-तीन में', '三位分节', '三位分節'),
  indianLabel: T('인도식 끊기', 'Indian grouping', 'Agrupación india', 'Agrupamento indiano', 'インド式区切り', 'Indische Gruppierung', 'Découpage indien', 'भारतीय बँटाई', '印度式分节', '印度式分節'),
  eastLabel: T('넷씩 끊기', 'Grouped by four', 'Agrupado de cuatro', 'Agrupado de quatro', '4桁区切り', 'Vierergruppen', 'Groupes de quatre', 'चार-चार में', '四位分节', '四位分節'),
  twinLabel: T('같은 값의 다른 이름', 'Same value, another name', 'Mismo valor, otro nombre', 'Mesmo valor, outro nome', '同じ値の別名', 'Gleicher Wert, anderer Name', 'Même valeur, autre nom', 'वही मान, दूसरा नाम', '同值异名', '同值異名'),
  amountTitle: T('다른 단위로 세면', 'Counted in other units', 'Contado en otras unidades', 'Contado em outras unidades', '別の単位で数えると', 'In anderen Einheiten', 'Compté en d’autres unités', 'अन्य इकाइयों में', '换成其他单位', '換成其他單位'),

  groupTitle: T('왜 자리마다 다르게 끊나', 'Why the groupings differ', 'Por qué difieren las agrupaciones', 'Por que os agrupamentos diferem', 'なぜ区切り方が違うのか', 'Warum die Gruppen abweichen', 'Pourquoi les découpages diffèrent', 'बँटाई अलग क्यों है', '为什么分节方式不同', '為什麼分節方式不同'),

  groupNote: T(
    '자릿점은 그 언어에 새 이름이 생기는 자리에 찍습니다. 영어권은 thousand·million·billion이 세 자리마다 나오므로 셋씩 끊고, 동아시아는 만·억·조가 네 자리마다 나오므로 넷씩 끊습니다. 규칙이 다른 게 아니라 세는 말이 다른 것입니다.',
    'A separator marks where the language gets a new name. English gains thousand, million, billion every three digits, so it cuts by three. East Asian counting gains 만, 억, 조 every four, so it cuts by four. The rule is not different — the words are.',
    'El separador marca dónde el idioma estrena un nombre. El inglés gana thousand, million, billion cada tres cifras, así que corta de tres. El conteo de Asia oriental gana 만, 억, 조 cada cuatro, así que corta de cuatro. No cambia la regla: cambian las palabras.',
    'O separador marca onde a língua ganha um nome novo. O inglês ganha thousand, million, billion a cada três dígitos, então corta de três. A contagem do Leste Asiático ganha 만, 억, 조 a cada quatro, então corta de quatro. A regra não muda — as palavras é que mudam.',
    '桁区切りは、その言語に新しい名前が生まれる位置に打ちます。英語圏はthousand・million・billionが3桁ごとに出るので3桁ずつ、東アジアは万・億・兆が4桁ごとに出るので4桁ずつ区切ります。規則が違うのではなく、数える言葉が違うのです。',
    'Ein Trennzeichen steht dort, wo die Sprache einen neuen Namen bekommt. Englisch gewinnt alle drei Stellen thousand, million, billion — also Dreiergruppen. Die ostasiatische Zählung gewinnt alle vier Stellen 만, 억, 조 — also Vierergruppen. Nicht die Regel unterscheidet sich, sondern die Wörter.',
    'Le séparateur marque l’endroit où la langue acquiert un nom nouveau. L’anglais gagne thousand, million, billion tous les trois chiffres : il coupe par trois. Le comptage est-asiatique gagne 만, 억, 조 tous les quatre : il coupe par quatre. Ce n’est pas la règle qui diffère, ce sont les mots.',
    'विभाजक वहीं लगता है जहाँ भाषा को नया नाम मिलता है। अंग्रेज़ी में हर तीन अंक पर thousand, million, billion आते हैं, इसलिए तीन-तीन में। पूर्वी एशियाई गिनती में हर चार अंक पर 만, 억, 조 आते हैं, इसलिए चार-चार में। नियम अलग नहीं, शब्द अलग हैं।',
    '分节符打在语言出现新名称的位置。英语每三位出现 thousand、million、billion，所以三位一节；东亚计数每四位出现万、亿、兆，所以四位一节。不是规则不同，是数数的词不同。',
    '分節符打在語言出現新名稱的位置。英語每三位出現 thousand、million、billion，所以三位一節；東亞計數每四位出現萬、億、兆，所以四位一節。不是規則不同，是數數的詞不同。',
  ),

  indianTitle: T('인도식만 사이가 고르지 않습니다', 'Only the Indian grouping is uneven', 'Solo la agrupación india es irregular', 'Só o agrupamento indiano é irregular', 'インド式だけ間隔が不揃いです', 'Nur die indische Gruppierung ist ungleich', 'Seul le découpage indien est irrégulier', 'केवल भारतीय बँटाई असमान है', '只有印度式的间隔不均匀', '只有印度式的間隔不均勻'),

  indianNote: T(
    '맨 뒤 세 자리만 떼고, 그다음부터는 두 자리씩 끊습니다. lakh(10만)와 crore(1000만)가 각각 두 자리씩 올라가기 때문입니다. 그래서 1000만이 10,000,000이 아니라 1,00,00,000으로 적힙니다. 처음 보면 콤마를 잘못 찍은 것처럼 보이지만, 인도·파키스탄·방글라데시에서는 이쪽이 표준입니다.',
    'Only the last three digits are taken off; after that it goes in twos. That is because lakh (10⁵) and crore (10⁷) each step up by two digits. Ten million is therefore written 1,00,00,000 rather than 10,000,000. It looks like a misplaced comma at first, but it is the standard across India, Pakistan and Bangladesh.',
    'Solo se separan las tres últimas cifras; a partir de ahí van de dos en dos, porque lakh (10⁵) y crore (10⁷) suben de dos en dos. Diez millones se escribe 1,00,00,000 y no 10,000,000. Al principio parece una coma mal puesta, pero es el estándar en India, Pakistán y Bangladés.',
    'Só os três últimos dígitos são separados; depois vai de dois em dois, porque lakh (10⁵) e crore (10⁷) sobem de dois em dois. Dez milhões escreve-se 1,00,00,000 e não 10,000,000. Parece vírgula fora do lugar, mas é o padrão na Índia, no Paquistão e em Bangladesh.',
    '末尾の3桁だけを切り、その先は2桁ずつ区切ります。lakh(10⁵)とcrore(10⁷)がそれぞれ2桁ずつ上がるからです。だから1000万は10,000,000ではなく1,00,00,000と書きます。最初は打ち間違いに見えますが、インド・パキスタン・バングラデシュではこちらが標準です。',
    'Nur die letzten drei Ziffern werden abgetrennt, danach geht es in Zweiergruppen — weil Lakh (10⁵) und Crore (10⁷) je zwei Stellen weiterspringen. Zehn Millionen schreibt man daher 1,00,00,000 statt 10,000,000. Das wirkt zunächst wie ein verrutschtes Komma, ist in Indien, Pakistan und Bangladesch aber Standard.',
    'Seuls les trois derniers chiffres sont détachés ; ensuite on va par deux, car lakh (10⁵) et crore (10⁷) montent de deux chiffres chacun. Dix millions s’écrit donc 1,00,00,000 et non 10,000,000. On croirait une virgule mal placée, mais c’est la norme en Inde, au Pakistan et au Bangladesh.',
    'केवल अंतिम तीन अंक अलग होते हैं; उसके बाद दो-दो में, क्योंकि लाख (10⁵) और करोड़ (10⁷) दो-दो अंक ऊपर जाते हैं। इसलिए एक करोड़ 10,000,000 नहीं बल्कि 1,00,00,000 लिखा जाता है। बाहर वालों को अल्पविराम ग़लत जगह लगा दिखता है, पर भारत, पाकिस्तान और बांग्लादेश में यही मानक है।',
    '只把最后三位分开，之后每两位一节——因为 lakh（10⁵）和 crore（10⁷）各自跨两位。所以一千万写作 1,00,00,000 而不是 10,000,000。初看像逗号打错了，但在印度、巴基斯坦、孟加拉这是标准写法。',
    '只把最後三位分開，之後每兩位一節——因為 lakh（10⁵）和 crore（10⁷）各自跨兩位。所以一千萬寫作 1,00,00,000 而不是 10,000,000。初看像逗號打錯了，但在印度、巴基斯坦、孟加拉這是標準寫法。',
  ),

  eastTitle: T('동아시아는 넷씩입니다', 'East Asia counts in fours', 'Asia oriental cuenta de cuatro', 'O Leste Asiático conta de quatro', '東アジアは4桁ずつです', 'Ostasien zählt in Vierern', 'L’Asie de l’Est compte par quatre', 'पूर्वी एशिया चार-चार में गिनता है', '东亚按四位数', '東亞按四位數'),

  eastNote: T(
    '만 다음이 억, 억 다음이 조, 조 다음이 경입니다 — 네 자리마다 새 이름이 붙습니다. 그런데 화면에 찍히는 콤마는 대개 셋씩이라, 한국·일본·중국에서 숫자를 읽을 때 콤마와 단위가 어긋납니다. 1,000,000,000을 보고 "십억"이라고 읽으려면 콤마를 무시하고 뒤에서 네 자리씩 다시 세야 합니다.',
    'After 만 comes 억, then 조, then 경 — a new name every four digits. But the commas printed on screens are usually in threes, so in Korea, Japan and China the separators and the words fall out of step. Reading 1,000,000,000 as 십억 means ignoring the commas and recounting in fours from the right.',
    'Tras 만 viene 억, luego 조 y después 경: un nombre nuevo cada cuatro cifras. Pero las comas que se imprimen suelen ir de tres en tres, así que en Corea, Japón y China los separadores y las palabras se desfasan. Leer 1,000,000,000 como 십억 obliga a ignorar las comas y recontar de cuatro en cuatro desde la derecha.',
    'Depois de 만 vem 억, depois 조, depois 경 — um nome novo a cada quatro dígitos. Mas as vírgulas impressas costumam ir de três em três, então na Coreia, no Japão e na China separadores e palavras ficam fora de compasso. Ler 1,000,000,000 como 십억 exige ignorar as vírgulas e recontar de quatro em quatro pela direita.',
    '万の次が億、億の次が兆、兆の次が京です — 4桁ごとに新しい名前が付きます。ところが画面に打たれるカンマはたいてい3桁ずつなので、日本や韓国や中国では区切りと単位がずれます。1,000,000,000を「十億」と読むには、カンマを無視して右から4桁ずつ数え直す必要があります。',
    'Auf 만 folgt 억, dann 조, dann 경 — alle vier Stellen ein neues Wort. Die gedruckten Kommas stehen aber meist in Dreiergruppen, sodass in Korea, Japan und China Trennung und Wort auseinanderlaufen. Wer 1,000,000,000 als 십억 liest, muss die Kommas ignorieren und von rechts in Vierern nachzählen.',
    'Après 만 vient 억, puis 조, puis 경 — un nom nouveau tous les quatre chiffres. Mais les virgules affichées vont généralement par trois : en Corée, au Japon et en Chine, séparateurs et mots se désynchronisent. Lire 1,000,000,000 comme 십억 suppose d’ignorer les virgules et de recompter par quatre depuis la droite.',
    '만 के बाद 억, फिर 조, फिर 경 — हर चार अंक पर नया नाम। पर स्क्रीन पर छपने वाले अल्पविराम आमतौर पर तीन-तीन में होते हैं, इसलिए कोरिया, जापान और चीन में विभाजक और शब्द बेमेल हो जाते हैं। 1,000,000,000 को 십억 पढ़ने के लिए अल्पविराम भुलाकर दाएँ से चार-चार गिनना पड़ता है।',
    '万之后是亿，亿之后是兆，兆之后是京——每四位出现一个新名称。可屏幕上打的逗号通常是三位一节，于是在韩国、日本、中国，分节符和单位对不上。要把 1,000,000,000 读成"十亿"，得忽略逗号，从右边重新按四位数。',
    '萬之後是億，億之後是兆，兆之後是京——每四位出現一個新名稱。可螢幕上打的逗號通常是三位一節，於是在韓國、日本、中國，分節符和單位對不上。要把 1,000,000,000 讀成「十億」，得忽略逗號，從右邊重新按四位數。',
  ),

  twinTitle: T('같은 값에 이름이 둘일 때', 'When one value has two names', 'Cuando un valor tiene dos nombres', 'Quando um valor tem dois nomes', '同じ値に名前が2つあるとき', 'Wenn ein Wert zwei Namen hat', 'Quand une valeur porte deux noms', 'जब एक मान के दो नाम हों', '当同一个值有两个名字', '當同一個值有兩個名字'),

  twinNote: T(
    'arab과 billion은 둘 다 10의 9제곱이고, 조와 trillion은 둘 다 10의 12제곱입니다. 값이 같아도 쓰는 곳이 갈리므로, 이 표에서는 두 이름을 같은 자리에 나란히 둡니다. 영어 billion이 나라에 따라 10의 12제곱을 뜻하던 때도 있었지만, 지금 금융과 통계는 10의 9제곱으로 통일해 씁니다.',
    'Arab and billion are both 10⁹; 조 and trillion are both 10¹². The value is the same but the audiences differ, so both names sit side by side here. English billion once meant 10¹² in some countries, but finance and statistics now use 10⁹ everywhere.',
    'Arab y billion son ambos 10⁹; 조 y trillion son ambos 10¹². El valor coincide pero el público no, así que aquí ambos nombres van juntos. El billion inglés llegó a significar 10¹² en algunos países, pero hoy las finanzas y la estadística usan 10⁹.',
    'Arab e billion são ambos 10⁹; 조 e trillion são ambos 10¹². O valor é o mesmo mas o público difere, então aqui os dois nomes ficam lado a lado. O billion inglês já significou 10¹² em alguns países, mas hoje finanças e estatística usam 10⁹.',
    'arabとbillionはどちらも10の9乗、兆とtrillionはどちらも10の12乗です。値が同じでも使う場所が違うので、この表では2つの名前を並べて置きます。英語のbillionが国によって10の12乗を指した時代もありましたが、いまの金融と統計は10の9乗で統一しています。',
    'Arab und Billion sind beide 10⁹, 조 und Trillion beide 10¹². Der Wert stimmt überein, das Publikum nicht — darum stehen beide Namen hier nebeneinander. Das englische billion meinte in manchen Ländern einst 10¹², heute rechnen Finanzwesen und Statistik einheitlich mit 10⁹.',
    'Arab et billion valent tous deux 10⁹ ; 조 et trillion valent tous deux 10¹². La valeur est la même, le public non : les deux noms figurent donc côte à côte. Le billion anglais a désigné 10¹² dans certains pays, mais la finance et la statistique s’en tiennent aujourd’hui à 10⁹.',
    'अरब और billion दोनों 10⁹ हैं; 조 और trillion दोनों 10¹²। मान एक है पर उपयोगकर्ता अलग, इसलिए यहाँ दोनों नाम साथ रखे हैं। अंग्रेज़ी billion कुछ देशों में कभी 10¹² था, पर अब वित्त और सांख्यिकी में सर्वत्र 10⁹ चलता है।',
    'arab 和 billion 都是 10⁹，兆和 trillion 都是 10¹²。数值相同但使用的圈子不同，所以本表把两个名字并排放。英语 billion 在某些国家曾表示 10¹²，但如今金融和统计一律用 10⁹。',
    'arab 和 billion 都是 10⁹，兆和 trillion 都是 10¹²。數值相同但使用的圈子不同，所以本表把兩個名字並排放。英語 billion 在某些國家曾表示 10¹²，但如今金融和統計一律用 10⁹。',
  ),

  careTitle: T('옮겨 적을 때 자주 틀리는 곳', 'Where conversions go wrong', 'Dónde fallan las conversiones', 'Onde as conversões erram', '書き換えでよく間違う所', 'Wo Umrechnungen schiefgehen', 'Où les conversions dérapent', 'रूपांतरण कहाँ ग़लत होता है', '换算时最容易出错的地方', '換算時最容易出錯的地方'),

  careNote: T(
    '자릿수를 세지 않고 이름만 맞바꾸면 열 배씩 어긋납니다. 1 crore는 1000만이지 1억이 아니고, 1 billion은 10억이지 1조가 아닙니다. 옮길 때는 이름이 아니라 10의 제곱을 견주는 편이 안전합니다 — 이 표가 모든 칸에 지수를 함께 적어 둔 이유입니다.',
    'Swapping names without counting digits slips by factors of ten. A crore is 1,000만, not 1억; a billion is 10억, not 1조. The safe move is to compare powers of ten rather than words — which is why every cell here carries its exponent.',
    'Cambiar nombres sin contar cifras desliza factores de diez. Un crore son 1.000만, no 1억; un billion son 10억, no 1조. Lo seguro es comparar potencias de diez en vez de palabras: por eso cada casilla lleva su exponente.',
    'Trocar nomes sem contar dígitos desliza fatores de dez. Um crore são 1.000만, não 1억; um billion são 10억, não 1조. O seguro é comparar potências de dez em vez de palavras — por isso cada célula traz o expoente.',
    '桁を数えずに名前だけ入れ替えると10倍ずつずれます。1 croreは1000万で1億ではなく、1 billionは10億で1兆ではありません。書き換えるときは名前ではなく10の何乗かを見比べるほうが安全です — この表が全マスに指数を併記している理由です。',
    'Namen zu tauschen, ohne Stellen zu zählen, verrutscht um Zehnerfaktoren. Ein Crore sind 1.000만, nicht 1억; eine Billion sind 10억, nicht 1조. Sicherer ist es, Zehnerpotenzen statt Wörter zu vergleichen — darum trägt hier jedes Feld seinen Exponenten.',
    'Échanger les noms sans compter les chiffres décale d’un facteur dix. Un crore vaut 1 000만, pas 1억 ; un billion vaut 10억, pas 1조. Le plus sûr est de comparer des puissances de dix plutôt que des mots — d’où l’exposant présent dans chaque case.',
    'अंक गिने बिना नाम बदल देने से दस गुने की चूक होती है। एक करोड़ 1,000만 है, 1억 नहीं; एक billion 10억 है, 1조 नहीं। सुरक्षित तरीका है शब्दों की जगह दस की घातें मिलाना — इसीलिए यहाँ हर खाने में घातांक साथ है।',
    '不数位数只换名字，就会差出十倍。1 crore 是 1000万，不是 1亿；1 billion 是 10亿，不是 1兆。换算时比较 10 的幂比比较词更稳妥——所以这里每一格都标了指数。',
    '不數位數只換名字，就會差出十倍。1 crore 是 1000萬，不是 1億；1 billion 是 10億，不是 1兆。換算時比較 10 的冪比比較詞更穩妥——所以這裡每一格都標了指數。',
  ),

  tableTitle: T('단위와 배수로 찾기', 'Find it by unit and multiplier', 'Búscalo por unidad y multiplicador', 'Ache por unidade e multiplicador', '単位と倍数から探す', 'Nach Einheit und Faktor suchen', 'Chercher par unité et multiplicateur', 'इकाई और गुणक से देखें', '按单位和倍数查找', '按單位和倍數查找'),
  neighbourTitle: T('가까운 배수', 'Nearby multipliers', 'Multiplicadores cercanos', 'Multiplicadores próximos', '近い倍数', 'Faktoren daneben', 'Multiplicateurs voisins', 'पास के गुणक', '相邻倍数', '相鄰倍數'),
  unitRowTitle: T('같은 단위, 다른 배수', 'Same unit, other multipliers', 'Misma unidad, otros multiplicadores', 'Mesma unidade, outros multiplicadores', '同じ単位、別の倍数', 'Gleiche Einheit, andere Faktoren', 'Même unité, autres multiplicateurs', 'वही इकाई, दूसरे गुणक', '同一单位，不同倍数', '同一單位，不同倍數'),
  factorRowTitle: T('같은 배수, 다른 단위', 'Same multiplier, other units', 'Mismo multiplicador, otras unidades', 'Mesmo multiplicador, outras unidades', '同じ倍数、別の単位', 'Gleicher Faktor, andere Einheiten', 'Même multiplicateur, autres unités', 'वही गुणक, दूसरी इकाइयाँ', '同一倍数，不同单位', '同一倍數，不同單位'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '값 = 배수 × 10의 거듭제곱. 자료가 아니라 계산입니다.',
      '셋씩·인도식·넷씩 세 가지로 끊어 나란히 보입니다.',
      '단위를 옮기는 것은 소수점을 옮기는 일이라, 반올림이 없습니다.',
      '이름이 아니라 10의 제곱을 견주십시오. 1 crore는 0.1억입니다.',
    ],
    [
      'Value = multiplier × a power of ten. Nothing here is stored data.',
      'The same number is shown cut three ways: by three, Indian style, and by four.',
      'Changing units only moves the decimal point, so nothing is rounded.',
      'Compare powers of ten, not names. A crore is 0.1억.',
    ],
    [
      'Valor = multiplicador × una potencia de diez. Aquí no hay datos guardados.',
      'El mismo número se muestra cortado de tres formas: de tres, a la india y de cuatro.',
      'Cambiar de unidad solo mueve la coma decimal: no se redondea nada.',
      'Compara potencias de diez, no nombres. Un crore son 0,1억.',
    ],
    [
      'Valor = multiplicador × uma potência de dez. Nada aqui é dado guardado.',
      'O mesmo número aparece cortado de três modos: de três, à indiana e de quatro.',
      'Mudar de unidade só move a vírgula decimal, então nada é arredondado.',
      'Compare potências de dez, não nomes. Um crore são 0,1억.',
    ],
    [
      '値 = 倍数 × 10の累乗。資料ではなく計算です。',
      '同じ数を3桁・インド式・4桁の3通りで区切って並べます。',
      '単位を移すのは小数点を移すことなので、丸めがありません。',
      '名前ではなく10の何乗かを見比べてください。1 croreは0.1億です。',
    ],
    [
      'Wert = Faktor × Zehnerpotenz. Nichts davon ist gespeicherte Angabe.',
      'Dieselbe Zahl erscheint dreifach gruppiert: zu dritt, indisch, zu viert.',
      'Ein Einheitenwechsel verschiebt nur das Komma — es wird nichts gerundet.',
      'Vergleichen Sie Zehnerpotenzen statt Namen. Ein Crore ist 0,1억.',
    ],
    [
      'Valeur = multiplicateur × puissance de dix. Rien n’est stocké ici.',
      'Le même nombre est découpé de trois façons : par trois, à l’indienne, par quatre.',
      'Changer d’unité ne fait que déplacer la virgule : aucun arrondi.',
      'Comparez les puissances de dix, pas les noms. Un crore vaut 0,1억.',
    ],
    [
      'मान = गुणक × दस की घात। यहाँ कुछ भी संचित आँकड़ा नहीं है।',
      'वही संख्या तीन तरह से कटी दिखती है: तीन-तीन, भारतीय, और चार-चार।',
      'इकाई बदलना केवल दशमलव खिसकाना है, इसलिए कोई गोलाई नहीं।',
      'नामों की नहीं, दस की घातों की तुलना करें। एक करोड़ = 0.1억।',
    ],
    [
      '数值 = 倍数 × 10 的幂，不是存下来的数据。',
      '同一个数按三位、印度式、四位三种方式分节并排展示。',
      '换单位只是移动小数点，所以不存在四舍五入。',
      '比较 10 的幂而不是名称。1 crore 是 0.1 亿。',
    ],
    [
      '數值 = 倍數 × 10 的冪，不是存下來的資料。',
      '同一個數按三位、印度式、四位三種方式分節並排展示。',
      '換單位只是移動小數點，所以不存在四捨五入。',
      '比較 10 的冪而不是名稱。1 crore 是 0.1 億。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'lakh·crore·억·조 환산 — 세 자릿수 체계를 한 표에',
    'Lakh, crore, 억, trillion — three numbering systems in one table',
    'Lakh, crore, 억, billón — tres sistemas en una tabla',
    'Lakh, crore, 억, trilhão — três sistemas numa tabela',
    'lakh・crore・億・兆の換算 — 3つの体系を1つの表に',
    'Lakh, Crore, 억, Billion — drei Zahlensysteme in einer Tabelle',
    'Lakh, crore, 억, trillion — trois systèmes dans un tableau',
    'लाख, करोड़, 억, ट्रिलियन — तीन प्रणालियाँ एक तालिका में',
    'lakh·crore·亿·兆 换算 — 三种计数体系一表尽览',
    'lakh·crore·億·兆 換算 — 三種計數體系一表盡覽',
  ),

  hubMetaDesc: T(
    '1 crore는 1000만이라 0.1억이고 10 million입니다. 영어권은 셋씩, 인도는 셋 뒤부터 둘씩, 동아시아는 넷씩 끊기 때문에 이름만 맞바꾸면 열 배씩 어긋납니다. 단위 10가지 × 배수 10가지 100칸.',
    'A crore is ten million, which is 0.1억 and 10 million. The West cuts digits by three, India by three then twos, East Asia by four — swap names without counting and you slip by factors of ten. 10 units × 10 multipliers, 100 cells.',
    'Un crore son diez millones, es decir 0,1억 y 10 million. Occidente corta de tres, la India de tres y luego de dos, Asia oriental de cuatro: cambiar nombres sin contar desliza factores de diez. 10 unidades × 10 multiplicadores, 100 casillas.',
    'Um crore são dez milhões, ou seja 0,1억 e 10 million. O Ocidente corta de três, a Índia de três e depois de dois, o Leste Asiático de quatro: trocar nomes sem contar desliza fatores de dez. 10 unidades × 10 multiplicadores, 100 células.',
    '1 croreは1000万なので0.1億であり10 millionです。英語圏は3桁ずつ、インドは3桁の後2桁ずつ、東アジアは4桁ずつ区切るため、名前だけ入れ替えると10倍ずつずれます。単位10通り×倍数10通りの100マス。',
    'Ein Crore sind zehn Millionen, also 0,1억 und 10 million. Der Westen gruppiert zu dritt, Indien drei und dann zwei, Ostasien zu viert — wer nur Namen tauscht, verrutscht um Zehnerfaktoren. 10 Einheiten × 10 Faktoren, 100 Felder.',
    'Un crore vaut dix millions, soit 0,1억 et 10 million. L’Occident coupe par trois, l’Inde par trois puis par deux, l’Asie de l’Est par quatre : échanger les noms sans compter décale d’un facteur dix. 10 unités × 10 multiplicateurs, 100 cases.',
    'एक करोड़ यानी एक सौ लाख, जो 0.1억 और 10 million है। पश्चिम तीन-तीन, भारत तीन फिर दो-दो, पूर्वी एशिया चार-चार में काटता है — बिना गिने नाम बदलने पर दस गुने की चूक होती है। 10 इकाइयाँ × 10 गुणक, 100 खाने।',
    '1 crore 是一千万，也就是 0.1 亿、10 million。西方三位一节，印度先三位再两位，东亚四位一节——只换名字不数位数就会差出十倍。10 种单位 × 10 种倍数，共 100 格。',
    '1 crore 是一千萬，也就是 0.1 億、10 million。西方三位一節，印度先三位再兩位，東亞四位一節——只換名字不數位數就會差出十倍。10 種單位 × 10 種倍數，共 100 格。',
  ),

  desc: T<(f: BigNumFacts) => string>(
    f => `10의 ${f.exp}제곱에 ${f.cell.factor}을 곱한 ${f.digits}자리 수입니다. 셋씩 끊으면 ${f.western}, 인도식으로는 ${f.indian}, 넷씩 끊으면 ${f.east}입니다.`,
    f => `${f.cell.factor} times 10^${f.exp}, a ${f.digits}-digit number. Cut by three it reads ${f.western}, Indian style ${f.indian}, and by four ${f.east}.`,
    f => `${f.cell.factor} por 10^${f.exp}, un número de ${f.digits} cifras. De tres en tres se lee ${f.western}; a la india, ${f.indian}; de cuatro en cuatro, ${f.east}.`,
    f => `${f.cell.factor} vezes 10^${f.exp}, um número de ${f.digits} dígitos. De três em três lê-se ${f.western}; à indiana, ${f.indian}; de quatro em quatro, ${f.east}.`,
    f => `10の${f.exp}乗に${f.cell.factor}を掛けた${f.digits}桁の数です。3桁区切りなら${f.western}、インド式なら${f.indian}、4桁区切りなら${f.east}です。`,
    f => `${f.cell.factor} mal 10^${f.exp}, eine ${f.digits}-stellige Zahl. In Dreiergruppen ${f.western}, indisch ${f.indian}, in Vierergruppen ${f.east}.`,
    f => `${f.cell.factor} fois 10^${f.exp}, un nombre à ${f.digits} chiffres. Par trois : ${f.western} ; à l’indienne : ${f.indian} ; par quatre : ${f.east}.`,
    f => `${f.cell.factor} गुणा 10^${f.exp}, यानी ${f.digits} अंकों की संख्या। तीन-तीन में ${f.western}, भारतीय शैली में ${f.indian}, चार-चार में ${f.east}।`,
    f => `10 的 ${f.exp} 次方乘以 ${f.cell.factor}，是一个 ${f.digits} 位数。三位分节写作 ${f.western}，印度式写作 ${f.indian}，四位分节写作 ${f.east}。`,
    f => `10 的 ${f.exp} 次方乘以 ${f.cell.factor}，是一個 ${f.digits} 位數。三位分節寫作 ${f.western}，印度式寫作 ${f.indian}，四位分節寫作 ${f.east}。`,
  ),

  metaTitle: T<(f: BigNumFacts) => string>(
    f => `${f.cell.factor} ${uKo[f.cell.unit]} — ${f.western}`,
    f => `${f.cell.factor} ${uEn[f.cell.unit]} — ${f.western}`,
    f => `${f.cell.factor} ${uEs[f.cell.unit]} — ${f.western}`,
    f => `${f.cell.factor} ${uPt[f.cell.unit]} — ${f.western}`,
    f => `${f.cell.factor} ${uJa[f.cell.unit]} — ${f.western}`,
    f => `${f.cell.factor} ${uDe[f.cell.unit]} — ${f.western}`,
    f => `${f.cell.factor} ${uFr[f.cell.unit]} — ${f.western}`,
    f => `${f.cell.factor} ${uHi[f.cell.unit]} — ${f.western}`,
    f => `${f.cell.factor} ${uZh[f.cell.unit]} — ${f.western}`,
    f => `${f.cell.factor} ${uTw[f.cell.unit]} — ${f.western}`,
  ),

  metaDesc: T<(f: BigNumFacts) => string>(
    f => `${f.cell.factor} ${uKo[f.cell.unit]}은 ${f.western}, 곧 10의 ${f.exp}제곱에 ${f.cell.factor}을 곱한 ${f.digits}자리 수입니다. 인도식으로는 ${f.indian}, 넷씩 끊으면 ${f.east}로 적습니다.`,
    f => `${f.cell.factor} ${uEn[f.cell.unit]} is ${f.western} — ${f.cell.factor} times 10^${f.exp}, a ${f.digits}-digit number. Indian grouping writes it ${f.indian}, four-digit grouping ${f.east}.`,
    f => `${f.cell.factor} ${uEs[f.cell.unit]} es ${f.western}: ${f.cell.factor} por 10^${f.exp}, un número de ${f.digits} cifras. A la india se escribe ${f.indian}; de cuatro en cuatro, ${f.east}.`,
    f => `${f.cell.factor} ${uPt[f.cell.unit]} é ${f.western}: ${f.cell.factor} vezes 10^${f.exp}, um número de ${f.digits} dígitos. À indiana escreve-se ${f.indian}; de quatro em quatro, ${f.east}.`,
    f => `${f.cell.factor} ${uJa[f.cell.unit]}は${f.western}、つまり10の${f.exp}乗に${f.cell.factor}を掛けた${f.digits}桁の数です。インド式では${f.indian}、4桁区切りでは${f.east}と書きます。`,
    f => `${f.cell.factor} ${uDe[f.cell.unit]} sind ${f.western} — ${f.cell.factor} mal 10^${f.exp}, eine ${f.digits}-stellige Zahl. Indisch geschrieben ${f.indian}, in Vierergruppen ${f.east}.`,
    f => `${f.cell.factor} ${uFr[f.cell.unit]} vaut ${f.western} : ${f.cell.factor} fois 10^${f.exp}, un nombre à ${f.digits} chiffres. À l’indienne : ${f.indian} ; par quatre : ${f.east}.`,
    f => `${f.cell.factor} ${uHi[f.cell.unit]} = ${f.western}, यानी ${f.cell.factor} गुणा 10^${f.exp}, ${f.digits} अंकों की संख्या। भारतीय शैली में ${f.indian}, चार-चार में ${f.east}।`,
    f => `${f.cell.factor} ${uZh[f.cell.unit]} 是 ${f.western}，即 10 的 ${f.exp} 次方乘以 ${f.cell.factor}，共 ${f.digits} 位。印度式写作 ${f.indian}，四位分节写作 ${f.east}。`,
    f => `${f.cell.factor} ${uTw[f.cell.unit]} 是 ${f.western}，即 10 的 ${f.exp} 次方乘以 ${f.cell.factor}，共 ${f.digits} 位。印度式寫作 ${f.indian}，四位分節寫作 ${f.east}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '1 crore는 몇 억인가요?', a: '0.1억입니다. crore는 1000만이고 억은 1억이라 열 배 차이가 납니다.' },
      { q: '1 lakh는 얼마인가요?', a: '10만입니다. 10의 5제곱이라 만의 열 배입니다.' },
      { q: '왜 인도식은 콤마 사이가 고르지 않나요?', a: '맨 뒤 세 자리만 떼고 그다음부터 두 자리씩 끊기 때문입니다. lakh와 crore가 각각 두 자리씩 올라갑니다.' },
      { q: '1 billion은 10억인가요, 1조인가요?', a: '10억입니다. 예전에 나라에 따라 10의 12제곱을 뜻하기도 했지만, 지금 금융과 통계는 10의 9제곱으로 씁니다.' },
      { q: '왜 한국에서는 콤마가 헷갈리나요?', a: '단위는 넷씩(만·억·조) 올라가는데 화면의 콤마는 셋씩 찍히기 때문입니다. 읽을 때는 뒤에서 네 자리씩 다시 세야 합니다.' },
    ],
    [
      { q: 'How many 억 is one crore?', a: '0.1억. A crore is ten million while 억 is a hundred million — a factor of ten apart.' },
      { q: 'How much is one lakh?', a: 'One hundred thousand, or 10⁵ — ten times 만.' },
      { q: 'Why are Indian commas unevenly spaced?', a: 'Only the last three digits are taken off; after that it goes in twos, because lakh and crore each step up two digits.' },
      { q: 'Is a billion 10⁹ or 10¹²?', a: '10⁹. Some countries once used it for 10¹², but finance and statistics now settle on 10⁹.' },
      { q: 'Why do commas confuse Korean readers?', a: 'The words step up every four digits (만, 억, 조) while the printed commas fall every three. Reading means recounting in fours from the right.' },
    ],
    [
      { q: '¿Cuántos 억 son un crore?', a: '0,1억. Un crore son diez millones y un 억 son cien millones: factor diez.' },
      { q: '¿Cuánto es un lakh?', a: 'Cien mil, o sea 10⁵: diez veces 만.' },
      { q: '¿Por qué las comas indias no van parejas?', a: 'Solo se separan las tres últimas cifras; luego van de dos en dos, porque lakh y crore suben dos cifras cada uno.' },
      { q: '¿Un billion es 10⁹ o 10¹²?', a: '10⁹. Algunos países lo usaron para 10¹², pero finanzas y estadística se quedan con 10⁹.' },
      { q: '¿Por qué confunden las comas en coreano?', a: 'Las palabras suben cada cuatro cifras (만, 억, 조) mientras las comas caen cada tres. Hay que recontar de cuatro en cuatro desde la derecha.' },
    ],
    [
      { q: 'Quantos 억 são um crore?', a: '0,1억. Um crore são dez milhões e um 억 são cem milhões: fator dez.' },
      { q: 'Quanto é um lakh?', a: 'Cem mil, ou 10⁵ — dez vezes 만.' },
      { q: 'Por que as vírgulas indianas são desiguais?', a: 'Só os três últimos dígitos se separam; depois vai de dois em dois, porque lakh e crore sobem dois dígitos cada.' },
      { q: 'Um billion é 10⁹ ou 10¹²?', a: '10⁹. Alguns países já usaram para 10¹², mas finanças e estatística ficam com 10⁹.' },
      { q: 'Por que as vírgulas confundem em coreano?', a: 'As palavras sobem a cada quatro dígitos (만, 억, 조) e as vírgulas caem a cada três. É preciso recontar de quatro em quatro pela direita.' },
    ],
    [
      { q: '1 croreは何億ですか？', a: '0.1億です。croreは1000万、億は1億なので10倍の差があります。' },
      { q: '1 lakhはいくつですか？', a: '10万です。10の5乗なので万の10倍です。' },
      { q: 'なぜインド式はカンマの間隔が不揃いなのですか？', a: '末尾の3桁だけを切り、その先は2桁ずつ区切るからです。lakhとcroreがそれぞれ2桁ずつ上がります。' },
      { q: '1 billionは10億ですか、1兆ですか？', a: '10億です。かつて国によって10の12乗を指しましたが、いまの金融と統計は10の9乗で使います。' },
      { q: 'なぜ日本語や韓国語ではカンマが分かりにくいのですか？', a: '単位は4桁ごと(万・億・兆)に上がるのに、カンマは3桁ごとに打たれるからです。読むときは右から4桁ずつ数え直します。' },
    ],
    [
      { q: 'Wie viele 억 sind ein Crore?', a: '0,1억. Ein Crore sind zehn Millionen, ein 억 hundert Millionen — Faktor zehn.' },
      { q: 'Wie viel ist ein Lakh?', a: 'Hunderttausend, also 10⁵ — das Zehnfache von 만.' },
      { q: 'Warum stehen indische Kommas ungleich?', a: 'Nur die letzten drei Ziffern werden abgetrennt, danach je zwei — weil Lakh und Crore je zwei Stellen weiterspringen.' },
      { q: 'Ist eine Billion 10⁹ oder 10¹²?', a: 'Das englische billion meint 10⁹. Früher stand es mancherorts für 10¹², heute rechnen Finanzwesen und Statistik mit 10⁹.' },
      { q: 'Warum verwirren Kommas im Koreanischen?', a: 'Die Wörter springen alle vier Stellen (만, 억, 조), die Kommas stehen alle drei. Man zählt von rechts in Vierern nach.' },
    ],
    [
      { q: 'Combien de 억 dans un crore ?', a: '0,1억. Un crore vaut dix millions, un 억 cent millions : facteur dix.' },
      { q: 'Combien vaut un lakh ?', a: 'Cent mille, soit 10⁵ — dix fois 만.' },
      { q: 'Pourquoi les virgules indiennes sont-elles irrégulières ?', a: 'Seuls les trois derniers chiffres sont détachés, puis on va par deux, car lakh et crore montent de deux chiffres chacun.' },
      { q: 'Un billion vaut-il 10⁹ ou 10¹² ?', a: '10⁹. Certains pays l’ont employé pour 10¹², mais la finance et la statistique retiennent 10⁹.' },
      { q: 'Pourquoi les virgules déroutent-elles en coréen ?', a: 'Les mots montent tous les quatre chiffres (만, 억, 조) alors que les virgules tombent tous les trois. Il faut recompter par quatre depuis la droite.' },
    ],
    [
      { q: 'एक करोड़ में कितने 억 होते हैं?', a: '0.1억। करोड़ एक सौ लाख है और 억 दस करोड़ — दस गुने का अंतर।' },
      { q: 'एक लाख कितना होता है?', a: 'एक सौ हज़ार, यानी 10⁵ — 만 का दस गुना।' },
      { q: 'भारतीय अल्पविराम असमान क्यों हैं?', a: 'केवल अंतिम तीन अंक अलग होते हैं, फिर दो-दो में — क्योंकि लाख और करोड़ दो-दो अंक ऊपर जाते हैं।' },
      { q: 'क्या billion 10⁹ है या 10¹²?', a: '10⁹। कुछ देशों में कभी 10¹² चलता था, पर अब वित्त और सांख्यिकी 10⁹ ही मानते हैं।' },
      { q: 'कोरियाई में अल्पविराम क्यों उलझाते हैं?', a: 'शब्द हर चार अंक पर बदलते हैं (만, 억, 조) जबकि अल्पविराम हर तीन पर लगते हैं। दाएँ से चार-चार गिनना पड़ता है।' },
    ],
    [
      { q: '1 crore 等于多少亿？', a: '0.1 亿。crore 是一千万，而亿是一亿，差十倍。' },
      { q: '1 lakh 是多少？', a: '十万，即 10⁵，是万的十倍。' },
      { q: '印度式的逗号为什么间隔不齐？', a: '因为只把最后三位分开，之后每两位一节——lakh 和 crore 各跨两位。' },
      { q: '1 billion 是十亿还是一兆？', a: '十亿。个别国家过去用它表示 10¹²，但如今金融和统计都按 10⁹ 用。' },
      { q: '为什么中文韩文里逗号让人犯迷糊？', a: '单位每四位换一个（万、亿、兆），而逗号每三位打一个。读的时候要从右边重新按四位数。' },
    ],
    [
      { q: '1 crore 等於多少億？', a: '0.1 億。crore 是一千萬，而億是一億，差十倍。' },
      { q: '1 lakh 是多少？', a: '十萬，即 10⁵，是萬的十倍。' },
      { q: '印度式的逗號為什麼間隔不齊？', a: '因為只把最後三位分開，之後每兩位一節——lakh 和 crore 各跨兩位。' },
      { q: '1 billion 是十億還是一兆？', a: '十億。個別國家過去用它表示 10¹²，但如今金融和統計都按 10⁹ 用。' },
      { q: '為什麼中文韓文裡逗號讓人犯迷糊？', a: '單位每四位換一個（萬、億、兆），而逗號每三位打一個。讀的時候要從右邊重新按四位數。' },
    ],
  ),

  cellFaq: T<(f: BigNumFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.factor} ${uKo[f.cell.unit]}은 숫자로 얼마인가요?`, a: `${f.western}입니다. 10의 ${f.exp}제곱에 ${f.cell.factor}을 곱한 ${f.digits}자리 수입니다.` },
      { q: `인도식으로는 어떻게 적나요?`, a: `${f.indian}입니다. 맨 뒤 세 자리를 떼고 그다음부터 두 자리씩 끊습니다.` },
      { q: `넷씩 끊으면 어떻게 되나요?`, a: `${f.east}입니다. 만·억·조가 네 자리마다 올라가기 때문입니다.` },
      { q: `다른 단위로 세면 얼마인가요?`, a: f.amounts.map(a => `${uKo[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
    f => [
      { q: `What is ${f.cell.factor} ${uEn[f.cell.unit]} in figures?`, a: `${f.western} — ${f.cell.factor} times 10^${f.exp}, a ${f.digits}-digit number.` },
      { q: `How is it written Indian style?`, a: `${f.indian}. The last three digits come off first, then it goes in twos.` },
      { q: `And grouped by four?`, a: `${f.east}, because 만, 억 and 조 step up every four digits.` },
      { q: `What is it in other units?`, a: f.amounts.map(a => `${uEn[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
    f => [
      { q: `¿Cuánto es ${f.cell.factor} ${uEs[f.cell.unit]} en cifras?`, a: `${f.western}: ${f.cell.factor} por 10^${f.exp}, un número de ${f.digits} cifras.` },
      { q: `¿Cómo se escribe a la india?`, a: `${f.indian}. Primero salen las tres últimas cifras y luego se va de dos en dos.` },
      { q: `¿Y agrupado de cuatro?`, a: `${f.east}, porque 만, 억 y 조 suben cada cuatro cifras.` },
      { q: `¿Cuánto es en otras unidades?`, a: f.amounts.map(a => `${uEs[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
    f => [
      { q: `Quanto é ${f.cell.factor} ${uPt[f.cell.unit]} em algarismos?`, a: `${f.western}: ${f.cell.factor} vezes 10^${f.exp}, um número de ${f.digits} dígitos.` },
      { q: `Como se escreve à indiana?`, a: `${f.indian}. Saem primeiro os três últimos dígitos e depois vai de dois em dois.` },
      { q: `E agrupado de quatro?`, a: `${f.east}, porque 만, 억 e 조 sobem a cada quatro dígitos.` },
      { q: `Quanto é em outras unidades?`, a: f.amounts.map(a => `${uPt[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
    f => [
      { q: `${f.cell.factor} ${uJa[f.cell.unit]}は数字でいくつですか？`, a: `${f.western}です。10の${f.exp}乗に${f.cell.factor}を掛けた${f.digits}桁の数です。` },
      { q: `インド式ではどう書きますか？`, a: `${f.indian}です。末尾の3桁を切り、その先は2桁ずつ区切ります。` },
      { q: `4桁区切りではどうなりますか？`, a: `${f.east}です。万・億・兆が4桁ごとに上がるからです。` },
      { q: `別の単位で数えるといくつですか？`, a: f.amounts.map(a => `${uJa[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
    f => [
      { q: `Wie viel ist ${f.cell.factor} ${uDe[f.cell.unit]} in Ziffern?`, a: `${f.western} — ${f.cell.factor} mal 10^${f.exp}, eine ${f.digits}-stellige Zahl.` },
      { q: `Wie schreibt man es indisch?`, a: `${f.indian}. Zuerst kommen die letzten drei Ziffern weg, danach geht es in Zweiern.` },
      { q: `Und in Vierergruppen?`, a: `${f.east}, denn 만, 억 und 조 springen alle vier Stellen weiter.` },
      { q: `Wie viel ist das in anderen Einheiten?`, a: f.amounts.map(a => `${uDe[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
    f => [
      { q: `Combien fait ${f.cell.factor} ${uFr[f.cell.unit]} en chiffres ?`, a: `${f.western} : ${f.cell.factor} fois 10^${f.exp}, un nombre à ${f.digits} chiffres.` },
      { q: `Comment l’écrit-on à l’indienne ?`, a: `${f.indian}. On détache d’abord les trois derniers chiffres, puis on va par deux.` },
      { q: `Et par groupes de quatre ?`, a: `${f.east}, car 만, 억 et 조 montent tous les quatre chiffres.` },
      { q: `Combien cela fait-il en d’autres unités ?`, a: f.amounts.map(a => `${uFr[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
    f => [
      { q: `${f.cell.factor} ${uHi[f.cell.unit]} अंकों में कितना है?`, a: `${f.western} — ${f.cell.factor} गुणा 10^${f.exp}, ${f.digits} अंकों की संख्या।` },
      { q: `भारतीय शैली में कैसे लिखते हैं?`, a: `${f.indian}। पहले अंतिम तीन अंक अलग होते हैं, फिर दो-दो में।` },
      { q: `चार-चार में बाँटें तो?`, a: `${f.east}, क्योंकि 만, 억 और 조 हर चार अंक पर बदलते हैं।` },
      { q: `दूसरी इकाइयों में यह कितना है?`, a: f.amounts.map(a => `${uHi[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
    f => [
      { q: `${f.cell.factor} ${uZh[f.cell.unit]} 写成数字是多少？`, a: `${f.western}，即 10 的 ${f.exp} 次方乘以 ${f.cell.factor}，共 ${f.digits} 位。` },
      { q: `印度式怎么写？`, a: `${f.indian}。先分出最后三位，之后每两位一节。` },
      { q: `四位分节呢？`, a: `${f.east}，因为万、亿、兆每四位换一个。` },
      { q: `换成其他单位是多少？`, a: f.amounts.map(a => `${uZh[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
    f => [
      { q: `${f.cell.factor} ${uTw[f.cell.unit]} 寫成數字是多少？`, a: `${f.western}，即 10 的 ${f.exp} 次方乘以 ${f.cell.factor}，共 ${f.digits} 位。` },
      { q: `印度式怎麼寫？`, a: `${f.indian}。先分出最後三位，之後每兩位一節。` },
      { q: `四位分節呢？`, a: `${f.east}，因為萬、億、兆每四位換一個。` },
      { q: `換成其他單位是多少？`, a: f.amounts.map(a => `${uTw[a.key] ?? a.key} ${a.amount}`).join(' · ') },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const BIGNUM_UI: L<BigNumUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<BigNumUI>;
