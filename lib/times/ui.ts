/**
 * 곱셈표 화면의 문구 — 열 언어.
 *
 * 외우는 범위가 나라마다 다르다는 것만은 문구가 알아야 한다. 한국·일본은 9단,
 * 영어권은 12단, 인도는 20단까지 외운다. 표를 20까지 두고 그 사정을 각 언어의
 * 자리에서 적으면, 어디서 와도 "내가 아는 표"로 읽힌다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { TimesFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface TimesUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  tableTitle: string;
  tableNote: string;
  tableName: (n: number) => string;
  productLabel: string;
  divisionLabel: string;
  repeatedLabel: string;
  swappedLabel: string;
  beforeLabel: string;
  afterLabel: string;
  otherPairsLabel: string;
  squareLabel: string;
  evenLabel: string;
  yes: string;
  no: string;
  noneLabel: string;
  gridTitle: string;
  gridNote: string;
  neighbourTitle: string;
  desc: (f: TimesFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: TimesFacts) => string;
  metaDesc: (f: TimesFacts) => string;
  hubFaq: FaqItem[];
  productFaq: (f: TimesFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof TimesUI]: L<TimesUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('곱셈표', 'Times tables', 'Tablas de multiplicar', 'Tabuada', 'かけ算表', 'Einmaleins', 'Tables de multiplication', 'पहाड़े', '乘法表', '乘法表'),

  hubTitle: T(
    '곱셈표 210칸 — 1단부터 20단까지',
    'Times tables to 20 — all 210 facts',
    'Tablas hasta el 20 — las 210 combinaciones',
    'Tabuada até 20 — as 210 combinações',
    'かけ算表210マス — 1の段から20の段まで',
    'Einmaleins bis 20 — alle 210 Aufgaben',
    'Tables jusqu’à 20 — les 210 produits',
    '20 तक के पहाड़े — सभी 210 गुणा',
    '乘法表 210 格 — 从 1 到 20',
    '乘法表 210 格 — 從 1 到 20',
  ),

  hubLead: T(
    '나라마다 외우는 범위가 다릅니다 — 우리는 9단까지, 영어권은 12단까지, 인도에서는 20단까지 외웁니다. 20까지 다 두었습니다.',
    'How far people learn differs: nine in Korea and Japan, twelve in the English-speaking world, twenty in India. This table goes to twenty.',
    'Cada país aprende hasta un punto distinto: hasta el nueve en Corea y Japón, hasta el doce en el mundo anglosajón, hasta el veinte en India. Aquí llega al veinte.',
    'Cada país aprende até um ponto diferente: até nove na Coreia e no Japão, até doze no mundo anglófono, até vinte na Índia. Aqui vai até vinte.',
    '国によって覚える範囲が違います——韓国と日本は9の段まで、英語圏は12まで、インドは20まで。ここは20まで置きました。',
    'Wie weit gelernt wird, ist verschieden: bis neun in Korea und Japan, bis zwölf im englischsprachigen Raum, bis zwanzig in Indien. Diese Tabelle geht bis zwanzig.',
    'On n’apprend pas jusqu’au même nombre partout : neuf en Corée et au Japon, douze dans le monde anglophone, vingt en Inde. Ce tableau va jusqu’à vingt.',
    'हर देश अलग-अलग तक याद करता है — कोरिया और जापान में नौ तक, अंग्रेज़ी-भाषी देशों में बारह तक, भारत में बीस तक। यह तालिका बीस तक जाती है।',
    '各国背到的范围不同——韩国和日本到 9，英语国家到 12，印度到 20。这里一直放到 20。',
    '各國背到的範圍不同——韓國和日本到 9，英語國家到 12，印度到 20。這裡一直放到 20。',
  ),

  tableTitle: T('단으로 보기', 'By table', 'Por tablas', 'Por tabuada', '段で見る', 'Nach Reihen', 'Par table', 'पहाड़े के अनुसार', '按段看', '按段看'),

  tableNote: T(
    '한 단은 스무 칸입니다. 7단이라면 1×7부터 7×20까지, 7이 든 칸 전부입니다.',
    'Each table has twenty facts. The seven times table is every fact with a seven in it, from 1×7 to 7×20.',
    'Cada tabla tiene veinte productos. La del siete son todos los que llevan un siete, de 1×7 a 7×20.',
    'Cada tabuada tem vinte produtos. A do sete são todos os que levam um sete, de 1×7 a 7×20.',
    '一つの段は20マスです。7の段なら1×7から7×20まで、7が入るマス全部です。',
    'Jede Reihe hat zwanzig Aufgaben. Die Siebenerreihe sind alle mit einer Sieben darin, von 1×7 bis 7×20.',
    'Chaque table compte vingt produits. La table de sept, ce sont tous ceux qui contiennent un sept, de 1×7 à 7×20.',
    'हर पहाड़े में बीस गुणा होते हैं। सात का पहाड़ा यानी हर वह गुणा जिसमें सात है — 1×7 से 7×20 तक।',
    '一个段有二十格。7 的段就是所有带 7 的格，从 1×7 到 7×20。',
    '一個段有二十格。7 的段就是所有帶 7 的格，從 1×7 到 7×20。',
  ),

  tableName: T<(n: number) => string>(
    n => `${n}단`,
    n => `${n} times table`,
    n => `Tabla del ${n}`,
    n => `Tabuada do ${n}`,
    n => `${n}の段`,
    n => `${n}er-Reihe`,
    n => `Table de ${n}`,
    n => `${n} का पहाड़ा`,
    n => `${n} 的乘法`,
    n => `${n} 的乘法`,
  ),

  productLabel: T('곱', 'Product', 'Producto', 'Produto', '積', 'Produkt', 'Produit', 'गुणनफल', '积', '積'),
  divisionLabel: T('나누기로 되돌리면', 'As division', 'Como división', 'Como divisão', '割り算にすると', 'Als Division', 'En division', 'भाग के रूप में', '写成除法', '寫成除法'),
  repeatedLabel: T('더하기로 풀면', 'As repeated addition', 'Como suma repetida', 'Como soma repetida', '足し算にすると', 'Als wiederholte Addition', 'En addition répétée', 'बार-बार जोड़ने पर', '写成连加', '寫成連加'),
  swappedLabel: T('순서를 바꿔도', 'Order does not matter', 'El orden no importa', 'A ordem não importa', '順を変えても', 'Reihenfolge egal', 'L’ordre est indifférent', 'क्रम बदलने पर भी', '交换顺序', '交換順序'),
  beforeLabel: T('한 칸 앞', 'One step back', 'Un paso atrás', 'Um passo atrás', '一つ前', 'Ein Schritt zurück', 'Un cran avant', 'एक कदम पीछे', '前一格', '前一格'),
  afterLabel: T('한 칸 뒤', 'One step on', 'Un paso adelante', 'Um passo à frente', '一つ後', 'Ein Schritt weiter', 'Un cran après', 'एक कदम आगे', '后一格', '後一格'),
  otherPairsLabel: T('같은 답을 주는 다른 곱', 'Other pairs with the same product', 'Otros pares con el mismo producto', 'Outros pares com o mesmo produto', '同じ積になる別の組', 'Andere Paare mit gleichem Produkt', 'Autres paires au même produit', 'उसी गुणनफल के अन्य जोड़े', '同样积的其他组合', '同樣積的其他組合'),
  squareLabel: T('제곱', 'Square', 'Cuadrado', 'Quadrado', '平方', 'Quadratzahl', 'Carré', 'वर्ग', '平方', '平方'),
  evenLabel: T('짝수', 'Even', 'Par', 'Par', '偶数', 'Gerade', 'Pair', 'सम', '偶数', '偶數'),
  yes: T('네', 'Yes', 'Sí', 'Sim', 'はい', 'Ja', 'Oui', 'हाँ', '是', '是'),
  no: T('아니요', 'No', 'No', 'Não', 'いいえ', 'Nein', 'Non', 'नहीं', '否', '否'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  gridTitle: T('전체 표', 'The whole grid', 'La tabla completa', 'A tabela inteira', '表の全体', 'Das ganze Raster', 'Le tableau complet', 'पूरी तालिका', '完整表格', '完整表格'),

  gridNote: T(
    '가로와 세로가 만나는 칸이 그 곱입니다. 대각선이 제곱수이고, 그 위아래가 거울처럼 같습니다 — 7×8과 8×7이 한 칸으로 묶이는 이유입니다.',
    'Row meets column at the product. The diagonal holds the squares, and the two halves mirror each other — which is why 7×8 and 8×7 share one page.',
    'La fila y la columna se cruzan en el producto. La diagonal son los cuadrados y las dos mitades se reflejan: por eso 7×8 y 8×7 comparten página.',
    'A linha encontra a coluna no produto. A diagonal traz os quadrados e as duas metades se espelham — por isso 7×8 e 8×7 dividem uma página.',
    '横と縦が交わるマスがその積です。対角線が平方数で、その上下が鏡のように同じ——7×8と8×7が一つのページになる理由です。',
    'Zeile trifft Spalte im Produkt. Auf der Diagonale stehen die Quadratzahlen, und beide Hälften spiegeln sich — darum teilen sich 7×8 und 8×7 eine Seite.',
    'La ligne et la colonne se croisent sur le produit. La diagonale porte les carrés et les deux moitiés se reflètent : voilà pourquoi 7×8 et 8×7 partagent une page.',
    'पंक्ति और स्तंभ जहाँ मिलते हैं वही गुणनफल है। विकर्ण पर वर्ग हैं और दोनों आधे दर्पण जैसे हैं — इसीलिए 7×8 और 8×7 एक ही पृष्ठ पर हैं।',
    '行与列相交的格就是积。对角线上是平方数，两半互为镜像——这就是 7×8 和 8×7 共用一页的原因。',
    '列與欄相交的格就是積。對角線上是平方數，兩半互為鏡像——這就是 7×8 和 8×7 共用一頁的原因。',
  ),

  neighbourTitle: T('같은 단의 앞뒤 칸', 'Nearby in the same table', 'Vecinos de la misma tabla', 'Vizinhos da mesma tabuada', '同じ段の前後', 'Nachbarn derselben Reihe', 'Voisins de la même table', 'उसी पहाड़े के पास वाले', '同段的相邻格', '同段的相鄰格'),

  desc: T<(f: TimesFacts) => string>(
    f => `${f.a} × ${f.b} = ${f.product}입니다. ${f.b}를 ${f.a}씩 세어도, ${f.a}를 ${f.b}씩 세어도 같은 값이고, ${f.product} ÷ ${f.a} = ${f.b}로 되돌아갑니다.`,
    f => `${f.a} × ${f.b} = ${f.product}. Counting ${f.a} ${f.b} times gives the same as counting ${f.b} ${f.a} times, and ${f.product} ÷ ${f.a} = ${f.b} takes you back.`,
    f => `${f.a} × ${f.b} = ${f.product}. Contar ${f.a} unas ${f.b} veces da lo mismo que contar ${f.b} unas ${f.a} veces, y ${f.product} ÷ ${f.a} = ${f.b} lo deshace.`,
    f => `${f.a} × ${f.b} = ${f.product}. Contar ${f.a} umas ${f.b} vezes dá o mesmo que contar ${f.b} umas ${f.a} vezes, e ${f.product} ÷ ${f.a} = ${f.b} desfaz.`,
    f => `${f.a} × ${f.b} = ${f.product}です。${f.a}を${f.b}回数えても、${f.b}を${f.a}回数えても同じで、${f.product} ÷ ${f.a} = ${f.b}で戻ります。`,
    f => `${f.a} × ${f.b} = ${f.product}. ${f.a} ${f.b}-mal zu zählen ergibt dasselbe wie ${f.b} ${f.a}-mal, und ${f.product} ÷ ${f.a} = ${f.b} führt zurück.`,
    f => `${f.a} × ${f.b} = ${f.product}. Compter ${f.a} ${f.b} fois revient à compter ${f.b} ${f.a} fois, et ${f.product} ÷ ${f.a} = ${f.b} fait le chemin inverse.`,
    f => `${f.a} × ${f.b} = ${f.product}। ${f.a} को ${f.b} बार गिनें या ${f.b} को ${f.a} बार — मान वही रहता है, और ${f.product} ÷ ${f.a} = ${f.b} से वापस पहुँचते हैं।`,
    f => `${f.a} × ${f.b} = ${f.product}。把 ${f.a} 数 ${f.b} 次，和把 ${f.b} 数 ${f.a} 次是一样的，而 ${f.product} ÷ ${f.a} = ${f.b} 可以倒回去。`,
    f => `${f.a} × ${f.b} = ${f.product}。把 ${f.a} 數 ${f.b} 次，和把 ${f.b} 數 ${f.a} 次是一樣的，而 ${f.product} ÷ ${f.a} = ${f.b} 可以倒回去。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '순서를 바꿔도 답은 같습니다. 7×8과 8×7은 한 페이지입니다.',
      '한 칸 옆으로 가면 그 단만큼 커집니다 — 7단은 일곱씩 자랍니다.',
      '나누기는 곱셈을 되돌리는 것입니다. 56 ÷ 7 = 8이면 7 × 8 = 56입니다.',
      '같은 답을 주는 다른 곱이 있습니다 — 24는 3×8이기도 4×6이기도 합니다.',
    ],
    [
      'Swapping the order does not change the answer, so 7×8 and 8×7 are one page.',
      'Moving one step along adds that table — the sevens grow by seven each time.',
      'Division undoes multiplication: 56 ÷ 7 = 8 means 7 × 8 = 56.',
      'Some products come from more than one pair — 24 is 3×8 and also 4×6.',
    ],
    [
      'Cambiar el orden no cambia el resultado: 7×8 y 8×7 son una misma página.',
      'Avanzar una casilla suma esa tabla: la del siete crece de siete en siete.',
      'La división deshace la multiplicación: 56 ÷ 7 = 8 significa 7 × 8 = 56.',
      'Algunos productos salen de más de un par: 24 es 3×8 y también 4×6.',
    ],
    [
      'Trocar a ordem não muda o resultado: 7×8 e 8×7 são a mesma página.',
      'Avançar uma casa soma aquela tabuada: a do sete cresce de sete em sete.',
      'A divisão desfaz a multiplicação: 56 ÷ 7 = 8 quer dizer 7 × 8 = 56.',
      'Alguns produtos vêm de mais de um par: 24 é 3×8 e também 4×6.',
    ],
    [
      '順を変えても答えは同じです。7×8と8×7は一つのページです。',
      '一マス進むとその段の分だけ増えます——7の段は七ずつ育ちます。',
      '割り算はかけ算を戻すことです。56 ÷ 7 = 8なら7 × 8 = 56です。',
      '同じ積になる別の組があります——24は3×8でも4×6でもあります。',
    ],
    [
      'Die Reihenfolge ändert nichts: 7×8 und 8×7 sind eine Seite.',
      'Ein Schritt weiter addiert die Reihe — die Siebenerreihe wächst um sieben.',
      'Division macht Multiplikation rückgängig: 56 ÷ 7 = 8 heißt 7 × 8 = 56.',
      'Manche Produkte stammen aus mehreren Paaren — 24 ist 3×8 und auch 4×6.',
    ],
    [
      'Changer l’ordre ne change pas le résultat : 7×8 et 8×7 forment une seule page.',
      'Avancer d’une case ajoute la table : celle de sept grandit de sept en sept.',
      'La division défait la multiplication : 56 ÷ 7 = 8 veut dire 7 × 8 = 56.',
      'Certains produits viennent de plusieurs paires : 24, c’est 3×8 et aussi 4×6.',
    ],
    [
      'क्रम बदलने से उत्तर नहीं बदलता — 7×8 और 8×7 एक ही पृष्ठ हैं।',
      'एक कदम आगे बढ़ने पर उतना ही जुड़ता है — सात का पहाड़ा सात-सात बढ़ता है।',
      'भाग गुणा को उलट देता है: 56 ÷ 7 = 8 यानी 7 × 8 = 56।',
      'कुछ गुणनफल एक से अधिक जोड़ों से आते हैं — 24 यानी 3×8 और 4×6 भी।',
    ],
    [
      '交换顺序答案不变，所以 7×8 和 8×7 是同一页。',
      '往右挪一格就加上那个段——7 的段每次长 7。',
      '除法是乘法的逆运算：56 ÷ 7 = 8 就意味着 7 × 8 = 56。',
      '有些积不止一种组合——24 既是 3×8，也是 4×6。',
    ],
    [
      '交換順序答案不變，所以 7×8 和 8×7 是同一頁。',
      '往右挪一格就加上那個段——7 的段每次長 7。',
      '除法是乘法的逆運算：56 ÷ 7 = 8 就意味著 7 × 8 = 56。',
      '有些積不止一種組合——24 既是 3×8，也是 4×6。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '곱셈표 — 1단부터 20단까지 210칸',
    'Times tables — every fact from 1 to 20',
    'Tablas de multiplicar — del 1 al 20',
    'Tabuada — do 1 ao 20',
    'かけ算表 — 1の段から20の段まで',
    'Einmaleins — jede Aufgabe von 1 bis 20',
    'Tables de multiplication — de 1 à 20',
    'पहाड़े — 1 से 20 तक',
    '乘法表 — 从 1 到 20 的 210 格',
    '乘法表 — 從 1 到 20 的 210 格',
  ),

  hubMetaDesc: T(
    '1×1부터 20×20까지 곱셈 210칸을 한 장씩. 곱과 나누기, 더하기로 푼 식, 같은 답을 주는 다른 곱까지 함께 봅니다.',
    'One page for each of the 210 multiplication facts up to 20×20: the product, the matching divisions, the repeated addition and other pairs with the same answer.',
    'Una página por cada uno de los 210 productos hasta 20×20: el resultado, las divisiones que lo deshacen, la suma repetida y otros pares con el mismo resultado.',
    'Uma página para cada um dos 210 produtos até 20×20: o resultado, as divisões que o desfazem, a soma repetida e outros pares com o mesmo resultado.',
    '1×1から20×20まで210マスを1ページずつ。積と割り算、足し算に開いた式、同じ答えになる別の組も一緒に見ます。',
    'Je eine Seite für alle 210 Aufgaben bis 20×20: Produkt, passende Divisionen, wiederholte Addition und andere Paare mit demselben Ergebnis.',
    'Une page pour chacun des 210 produits jusqu’à 20×20 : le résultat, les divisions inverses, l’addition répétée et les autres paires au même résultat.',
    '20×20 तक के 210 गुणा में हर एक का पृष्ठ: गुणनफल, उलटी भाग क्रियाएँ, बार-बार जोड़ और उसी उत्तर के अन्य जोड़े।',
    '20×20 以内 210 个乘法各一页：积、对应的除法、连加写法，以及同样答案的其他组合。',
    '20×20 以內 210 個乘法各一頁：積、對應的除法、連加寫法，以及同樣答案的其他組合。',
  ),

  metaTitle: T<(f: TimesFacts) => string>(
    f => `${f.a} × ${f.b} = ${f.product}`,
    f => `${f.a} × ${f.b} = ${f.product} — times table fact`,
    f => `${f.a} × ${f.b} = ${f.product} — tabla de multiplicar`,
    f => `${f.a} × ${f.b} = ${f.product} — tabuada`,
    f => `${f.a} × ${f.b} = ${f.product} — かけ算表`,
    f => `${f.a} × ${f.b} = ${f.product} — Einmaleins`,
    f => `${f.a} × ${f.b} = ${f.product} — table de multiplication`,
    f => `${f.a} × ${f.b} = ${f.product} — पहाड़ा`,
    f => `${f.a} × ${f.b} = ${f.product} — 乘法表`,
    f => `${f.a} × ${f.b} = ${f.product} — 乘法表（繁體）`,
  ),

  metaDesc: T<(f: TimesFacts) => string>(
    f => `${f.a} 곱하기 ${f.b}는 ${f.product}입니다. ${f.b} 곱하기 ${f.a}도 같은 값이고, ${f.product} ÷ ${f.a} = ${f.b}·${f.product} ÷ ${f.b} = ${f.a}로 되돌아갑니다.`,
    f => `${f.a} times ${f.b} is ${f.product}. ${f.b} times ${f.a} gives the same, and it undoes as ${f.product} ÷ ${f.a} = ${f.b} and ${f.product} ÷ ${f.b} = ${f.a}.`,
    f => `${f.a} por ${f.b} es ${f.product}. ${f.b} por ${f.a} da lo mismo, y se deshace con ${f.product} ÷ ${f.a} = ${f.b} y ${f.product} ÷ ${f.b} = ${f.a}.`,
    f => `${f.a} vezes ${f.b} é ${f.product}. ${f.b} vezes ${f.a} dá o mesmo, e desfaz-se com ${f.product} ÷ ${f.a} = ${f.b} e ${f.product} ÷ ${f.b} = ${f.a}.`,
    f => `${f.a}かける${f.b}は${f.product}です。${f.b}かける${f.a}も同じで、${f.product} ÷ ${f.a} = ${f.b}、${f.product} ÷ ${f.b} = ${f.a}で戻ります。`,
    f => `${f.a} mal ${f.b} ist ${f.product}. ${f.b} mal ${f.a} ergibt dasselbe, und ${f.product} ÷ ${f.a} = ${f.b} sowie ${f.product} ÷ ${f.b} = ${f.a} führen zurück.`,
    f => `${f.a} fois ${f.b} font ${f.product}. ${f.b} fois ${f.a} donne le même résultat, et ${f.product} ÷ ${f.a} = ${f.b} et ${f.product} ÷ ${f.b} = ${f.a} l’annulent.`,
    f => `${f.a} गुणा ${f.b} बराबर ${f.product} है। ${f.b} गुणा ${f.a} भी वही देता है, और ${f.product} ÷ ${f.a} = ${f.b} तथा ${f.product} ÷ ${f.b} = ${f.a} से वापस मिलता है।`,
    f => `${f.a} 乘 ${f.b} 等于 ${f.product}。${f.b} 乘 ${f.a} 结果相同，${f.product} ÷ ${f.a} = ${f.b}、${f.product} ÷ ${f.b} = ${f.a} 可以倒回去。`,
    f => `${f.a} 乘 ${f.b} 等於 ${f.product}。${f.b} 乘 ${f.a} 結果相同，${f.product} ÷ ${f.a} = ${f.b}、${f.product} ÷ ${f.b} = ${f.a} 可以倒回去。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '왜 7×8과 8×7이 한 페이지인가요?', a: '답이 같기 때문입니다. 주소를 둘로 두면 한 답을 두 페이지가 나눠 갖게 되므로, 뒤집어 찾아와도 같은 칸으로 옵니다.' },
      { q: '구구단은 9단까지인데 왜 20단까지 있나요?', a: '나라마다 외우는 범위가 다르기 때문입니다. 영어권은 12단, 인도는 20단까지 외웁니다. 넓게 두고 필요한 단만 보면 됩니다.' },
      { q: '곱셈표를 외우는 요령이 있나요?', a: '한 칸 옆으로 갈 때마다 그 단만큼 커진다는 것을 쓰면 됩니다. 7×8을 잊었어도 7×7=49에 7을 더하면 56입니다.' },
      { q: '9단이 쉬운 이유가 있나요?', a: '9단의 두 자리를 더하면 늘 9가 됩니다 — 18·27·36·45… 십의 자리는 하나씩 커지고 일의 자리는 하나씩 작아집니다.' },
      { q: '같은 답이 나오는 곱은 어떻게 찾나요?', a: '그 수의 약수를 짝지으면 됩니다. 24라면 2×12·3×8·4×6입니다. 각 페이지에 그 목록이 있습니다.' },
    ],
    [
      { q: 'Why are 7×8 and 8×7 one page?', a: 'They give the same answer. Two addresses would split one answer between two pages, so a flipped search lands on the same card.' },
      { q: 'Why go to twenty when school stops at twelve?', a: 'Because it stops at a different place in each country — nine in Korea and Japan, twelve in English-speaking schools, twenty in India. The wider table covers all of them.' },
      { q: 'Any trick for learning the tables?', a: 'Use the step: each move along adds the table itself. Forgot 7×8? Take 7×7 = 49 and add seven to get 56.' },
      { q: 'Why is the nine times table easy?', a: 'Its digits always add up to nine — 18, 27, 36, 45… the tens go up by one while the units go down by one.' },
      { q: 'How do I find other pairs with the same product?', a: 'Pair up the divisors of that number. For 24 they are 2×12, 3×8 and 4×6; every page lists them.' },
    ],
    [
      { q: '¿Por qué 7×8 y 8×7 son una sola página?', a: 'Dan el mismo resultado. Dos direcciones repartirían una respuesta entre dos páginas, así que buscar al revés lleva a la misma ficha.' },
      { q: '¿Por qué llegar al veinte si en la escuela se para en el diez?', a: 'Porque cada país para en un punto distinto: nueve en Corea y Japón, doce en el mundo anglosajón, veinte en India. La tabla ancha los cubre a todos.' },
      { q: '¿Algún truco para aprenderlas?', a: 'Usa el paso: cada casilla suma la propia tabla. ¿Olvidaste 7×8? Toma 7×7 = 49 y suma siete: 56.' },
      { q: '¿Por qué la tabla del nueve es fácil?', a: 'Sus cifras siempre suman nueve: 18, 27, 36, 45… las decenas suben de una en una y las unidades bajan igual.' },
      { q: '¿Cómo encuentro otros pares con el mismo producto?', a: 'Empareja los divisores de ese número. Para 24 son 2×12, 3×8 y 4×6; cada página los lista.' },
    ],
    [
      { q: 'Por que 7×8 e 8×7 são uma página só?', a: 'Dão o mesmo resultado. Dois endereços dividiriam uma resposta entre duas páginas, então buscar ao contrário chega ao mesmo lugar.' },
      { q: 'Por que ir até vinte se a escola para no dez?', a: 'Porque cada país para num ponto diferente: nove na Coreia e no Japão, doze no mundo anglófono, vinte na Índia. A tabela larga cobre todos.' },
      { q: 'Existe truque para aprender?', a: 'Use o passo: cada casa soma a própria tabuada. Esqueceu 7×8? Pegue 7×7 = 49 e some sete: 56.' },
      { q: 'Por que a tabuada do nove é fácil?', a: 'Os algarismos sempre somam nove: 18, 27, 36, 45… as dezenas sobem de um em um e as unidades descem igual.' },
      { q: 'Como acho outros pares com o mesmo produto?', a: 'Emparelhe os divisores do número. Para 24 são 2×12, 3×8 e 4×6; cada página traz a lista.' },
    ],
    [
      { q: 'なぜ7×8と8×7が一つのページなのですか？', a: '答えが同じだからです。住所を二つにすると一つの答えを二ページで分け合うので、逆から探しても同じマスに来ます。' },
      { q: '九九は9の段までなのに、なぜ20まであるのですか？', a: '国によって覚える範囲が違うからです。英語圏は12まで、インドは20まで覚えます。広く置いて必要な段だけ見れば済みます。' },
      { q: '覚えるコツはありますか？', a: '一マス進むごとにその段の分だけ増えることを使います。7×8を忘れても、7×7=49に7を足せば56です。' },
      { q: '9の段が易しいのはなぜですか？', a: '9の段は二桁を足すと必ず9になります——18・27・36・45…十の位が一つ増え、一の位が一つ減ります。' },
      { q: '同じ答えになる組はどう探しますか？', a: 'その数の約数を組にすれば出ます。24なら2×12・3×8・4×6です。各ページに一覧があります。' },
    ],
    [
      { q: 'Warum sind 7×8 und 8×7 eine Seite?', a: 'Sie ergeben dasselbe. Zwei Adressen würden eine Antwort auf zwei Seiten aufteilen — die umgedrehte Suche landet also auf derselben Karte.' },
      { q: 'Warum bis zwanzig, wenn die Schule bei zehn aufhört?', a: 'Weil jedes Land woanders aufhört: neun in Korea und Japan, zwölf im englischsprachigen Raum, zwanzig in Indien. Die breite Tabelle deckt alle ab.' },
      { q: 'Gibt es einen Lerntrick?', a: 'Nutze den Schritt: jede Stelle addiert die Reihe selbst. 7×8 vergessen? 7×7 = 49 plus sieben ergibt 56.' },
      { q: 'Warum ist die Neunerreihe leicht?', a: 'Ihre Ziffern ergeben zusammen immer neun — 18, 27, 36, 45… die Zehner steigen um eins, die Einer fallen um eins.' },
      { q: 'Wie finde ich andere Paare mit gleichem Produkt?', a: 'Man paart die Teiler der Zahl. Bei 24 sind das 2×12, 3×8 und 4×6; jede Seite listet sie auf.' },
    ],
    [
      { q: 'Pourquoi 7×8 et 8×7 sur une seule page ?', a: 'Le résultat est le même. Deux adresses partageraient une réponse entre deux pages : la recherche inversée arrive donc sur la même fiche.' },
      { q: 'Pourquoi aller jusqu’à vingt alors que l’école s’arrête à dix ?', a: 'Parce que chaque pays s’arrête ailleurs : neuf en Corée et au Japon, douze dans le monde anglophone, vingt en Inde. Le tableau large les couvre tous.' },
      { q: 'Une astuce pour apprendre ?', a: 'Servez-vous du pas : chaque case ajoute la table elle-même. Oublié 7×8 ? Prenez 7×7 = 49 et ajoutez sept : 56.' },
      { q: 'Pourquoi la table de neuf est-elle facile ?', a: 'Ses chiffres font toujours neuf : 18, 27, 36, 45… les dizaines montent d’un cran, les unités descendent d’autant.' },
      { q: 'Comment trouver d’autres paires au même produit ?', a: 'On apparie les diviseurs du nombre. Pour 24 : 2×12, 3×8 et 4×6 ; chaque page les indique.' },
    ],
    [
      { q: '7×8 और 8×7 एक ही पृष्ठ क्यों?', a: 'उत्तर एक ही है। दो पते होने पर एक उत्तर दो पृष्ठों में बँट जाता, इसलिए उलटकर खोजने पर भी वही पृष्ठ मिलता है।' },
      { q: 'स्कूल में दस तक पढ़ाते हैं, फिर बीस तक क्यों?', a: 'क्योंकि हर देश अलग जगह रुकता है — कोरिया-जापान में नौ, अंग्रेज़ी-भाषी देशों में बारह, भारत में बीस। चौड़ी तालिका सबको समेट लेती है।' },
      { q: 'याद करने की कोई तरकीब?', a: 'कदम का उपयोग कीजिए: हर अगला खाना उतना ही जोड़ता है। 7×8 भूल गए? 7×7 = 49 में सात जोड़िए, 56।' },
      { q: 'नौ का पहाड़ा आसान क्यों है?', a: 'इसके अंकों का योग हमेशा नौ होता है — 18, 27, 36, 45… दहाई एक-एक बढ़ती है और इकाई एक-एक घटती है।' },
      { q: 'उसी गुणनफल के अन्य जोड़े कैसे खोजें?', a: 'उस संख्या के भाजकों को जोड़े में रखिए। 24 के लिए 2×12, 3×8 और 4×6; हर पृष्ठ पर सूची है।' },
    ],
    [
      { q: '为什么 7×8 和 8×7 是同一页？', a: '因为答案相同。分成两个地址就把一个答案拆到两页上，所以反过来搜也会落到同一格。' },
      { q: '学校只背到 9，为什么放到 20？', a: '因为各国停的地方不同——韩国日本到 9，英语国家到 12，印度到 20。放宽一点，谁来都能找到自己的段。' },
      { q: '背乘法表有什么窍门？', a: '用“每挪一格就加一个段”。忘了 7×8？拿 7×7 = 49 再加 7，就是 56。' },
      { q: '9 的段为什么好背？', a: '它的两位数相加总是 9——18、27、36、45……十位加一，个位减一。' },
      { q: '怎么找同样积的其他组合？', a: '把这个数的因数两两配对。24 就是 2×12、3×8、4×6；每页都列了出来。' },
    ],
    [
      { q: '為什麼 7×8 和 8×7 是同一頁？', a: '因為答案相同。分成兩個地址就把一個答案拆到兩頁上，所以反過來搜也會落到同一格。' },
      { q: '學校只背到 9，為什麼放到 20？', a: '因為各國停的地方不同——韓國日本到 9，英語國家到 12，印度到 20。放寬一點，誰來都能找到自己的段。' },
      { q: '背乘法表有什麼訣竅？', a: '用「每挪一格就加一個段」。忘了 7×8？拿 7×7 = 49 再加 7，就是 56。' },
      { q: '9 的段為什麼好背？', a: '它的兩位數相加總是 9——18、27、36、45……十位加一，個位減一。' },
      { q: '怎麼找同樣積的其他組合？', a: '把這個數的因數兩兩配對。24 就是 2×12、3×8、4×6；每頁都列了出來。' },
    ],
  ),

  productFaq: T<(f: TimesFacts) => FaqItem[]>(
    f => [
      { q: `${f.a} 곱하기 ${f.b}는 얼마인가요?`, a: `${f.product}입니다.` },
      { q: `${f.b} 곱하기 ${f.a}도 같나요?`, a: `같습니다. 순서를 바꿔도 곱은 변하지 않습니다.` },
      { q: `나누기로 어떻게 되돌리나요?`, a: `${f.divisions.join(', ')}입니다.` },
      { q: `${f.product}이 되는 다른 곱이 있나요?`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join(', ')}도 ${f.product}입니다.` : `이 표 안에서는 없습니다.` },
    ],
    f => [
      { q: `What is ${f.a} times ${f.b}?`, a: `${f.product}.` },
      { q: `Is ${f.b} times ${f.a} the same?`, a: `Yes — swapping the order never changes a product.` },
      { q: `How does it undo as division?`, a: `${f.divisions.join(', ')}.` },
      { q: `Which other pairs make ${f.product}?`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join(', ')} also give ${f.product}.` : `None inside this table.` },
    ],
    f => [
      { q: `¿Cuánto es ${f.a} por ${f.b}?`, a: `${f.product}.` },
      { q: `¿${f.b} por ${f.a} da lo mismo?`, a: `Sí: cambiar el orden nunca cambia el producto.` },
      { q: `¿Cómo se deshace con divisiones?`, a: `${f.divisions.join(', ')}.` },
      { q: `¿Qué otros pares dan ${f.product}?`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join(', ')} también dan ${f.product}.` : `Ninguno dentro de esta tabla.` },
    ],
    f => [
      { q: `Quanto é ${f.a} vezes ${f.b}?`, a: `${f.product}.` },
      { q: `${f.b} vezes ${f.a} dá o mesmo?`, a: `Dá: trocar a ordem nunca muda o produto.` },
      { q: `Como se desfaz com divisão?`, a: `${f.divisions.join(', ')}.` },
      { q: `Que outros pares dão ${f.product}?`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join(', ')} também dão ${f.product}.` : `Nenhum dentro desta tabuada.` },
    ],
    f => [
      { q: `${f.a}かける${f.b}はいくつですか？`, a: `${f.product}です。` },
      { q: `${f.b}かける${f.a}も同じですか？`, a: `同じです。順を変えても積は変わりません。` },
      { q: `割り算にするとどうなりますか？`, a: `${f.divisions.join('、')}です。` },
      { q: `${f.product}になる別の組はありますか？`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join('、')}も${f.product}です。` : `この表の中にはありません。` },
    ],
    f => [
      { q: `Wie viel ist ${f.a} mal ${f.b}?`, a: `${f.product}.` },
      { q: `Ist ${f.b} mal ${f.a} dasselbe?`, a: `Ja — die Reihenfolge ändert ein Produkt nie.` },
      { q: `Wie sieht das als Division aus?`, a: `${f.divisions.join(', ')}.` },
      { q: `Welche anderen Paare ergeben ${f.product}?`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join(', ')} ergeben ebenfalls ${f.product}.` : `In dieser Tabelle keines.` },
    ],
    f => [
      { q: `Combien font ${f.a} fois ${f.b} ?`, a: `${f.product}.` },
      { q: `${f.b} fois ${f.a}, est-ce pareil ?`, a: `Oui : l’ordre ne change jamais un produit.` },
      { q: `Comment cela s’écrit-il en division ?`, a: `${f.divisions.join(', ')}.` },
      { q: `Quelles autres paires donnent ${f.product} ?`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join(', ')} donnent aussi ${f.product}.` : `Aucune dans ce tableau.` },
    ],
    f => [
      { q: `${f.a} गुणा ${f.b} कितना होता है?`, a: `${f.product}।` },
      { q: `क्या ${f.b} गुणा ${f.a} भी वही है?`, a: `हाँ — क्रम बदलने से गुणनफल कभी नहीं बदलता।` },
      { q: `भाग के रूप में यह कैसे उलटता है?`, a: `${f.divisions.join(', ')}।` },
      { q: `${f.product} देने वाले और कौन-से जोड़े हैं?`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join(', ')} भी ${f.product} देते हैं।` : `इस तालिका में कोई नहीं।` },
    ],
    f => [
      { q: `${f.a} 乘 ${f.b} 等于多少？`, a: `${f.product}。` },
      { q: `${f.b} 乘 ${f.a} 一样吗？`, a: `一样，交换顺序不会改变积。` },
      { q: `写成除法是什么样？`, a: `${f.divisions.join('、')}。` },
      { q: `还有哪些组合等于 ${f.product}？`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join('、')} 也等于 ${f.product}。` : `这张表里没有。` },
    ],
    f => [
      { q: `${f.a} 乘 ${f.b} 等於多少？`, a: `${f.product}。` },
      { q: `${f.b} 乘 ${f.a} 一樣嗎？`, a: `一樣，交換順序不會改變積。` },
      { q: `寫成除法是什麼樣？`, a: `${f.divisions.join('、')}。` },
      { q: `還有哪些組合等於 ${f.product}？`, a: f.otherPairs.length ? `${f.otherPairs.map(p => `${p.a} × ${p.b}`).join('、')} 也等於 ${f.product}。` : `這張表裡沒有。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const TIMES_UI: L<TimesUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<TimesUI>;
