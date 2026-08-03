/**
 * 수 사전 화면의 문구 — 열 언어.
 *
 * 항목마다의 설명은 적지 않는다. 209개 × 열 언어면 2,090줄이고, 그중 한 줄이
 * 계산 결과와 어긋나도 아무도 못 잡는다. 그래서 여기에는 **틀**만 두고 수는
 * 계산에서 받아 끼운다.
 *
 * 끼울 때 두 가지가 언어마다 다르다. 하나는 자릿수 구분 기호 — 65,536은
 * 독일어로 65.536이고 프랑스어로는 65 536이다. 다른 하나는 단수·복수 —
 * 프랑스어는 0도 단수라서 "0 étapes"가 아니라 "0 étape"다. 둘 다 만들어 낸
 * 문장이라 눈으로는 안 보이고, 검사가 1과 0을 넣어 봐야 드러난다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import { factorText, type Family, type Kind, type NumberFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface NumberUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  /** 자릿수 구분 기호가 언어마다 다르다 */
  fmt: (v: number) => string;
  gridTitle: string;
  gridNote: string;
  primeTag: string;
  compositeTag: string;
  powersTitle: string;
  powersNote: string;
  familyTitle: string;
  familyLabel: Record<Family, string>;
  familyNote: Record<Family, string>;
  kindLabel: Record<Kind, string>;
  kindNote: Record<Kind, string>;
  factorLabel: string;
  /** 소수는 더 갈라지지 않는다 */
  factorPrime: string;
  divisorLabel: string;
  divisorSumLabel: string;
  properSumLabel: string;
  totientLabel: string;
  digitSumLabel: string;
  digitalRootLabel: string;
  romanLabel: string;
  romanNone: string;
  binLabel: string;
  octLabel: string;
  hexLabel: string;
  base36Label: string;
  bitsLabel: string;
  bitsValue: (k: number) => string;
  collatzLabel: string;
  collatzValue: (steps: number, peak: number) => string;
  prevPrimeLabel: string;
  nextPrimeLabel: string;
  noneLabel: string;
  rectTitle: string;
  rectNote: (f: NumberFacts) => string;
  divisorCount: (k: number) => string;
  neighbourTitle: string;
  desc: (f: NumberFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (n: number) => string;
  metaDesc: (f: NumberFacts) => string;
  hubFaq: FaqItem[];
  numberFaq: (f: NumberFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 자릿수 구분 — 65536을 독일어는 65.536, 프랑스어는 65 536으로 적는다 */
const N = (tag: string) => (v: number) => v.toLocaleString(tag);

/**
 * 한국어 조사 — 숫자 뒤에 붙는 은/는은 그 수를 읽은 소리가 정한다.
 *
 * 42는 "사십이"로 끝나 모음이니 "42는"이고, 47은 "사십칠"이라 "47은"이다.
 * 209장에 "42은(는)"이라고 적어 둘 수는 없어서 끝자리에서 고른다.
 * 끝자리가 0이면 십·백·천·만으로 읽혀 모두 받침으로 끝난다.
 */
const KO_OPEN = new Set([2, 4, 5, 9]);
const ko = (n: number, withFinal: string, withoutFinal: string): string =>
  (KO_OPEN.has(n % 10) ? withoutFinal : withFinal);

/**
 * 약수 개수 — 셋이 함께 쓰므로 한 곳에 둔다(설명·메타 설명·표).
 *
 * 여기저기 적으면 복수형이 한 곳만 틀린다. 실제로 1의 약수는 하나뿐이라
 * "1 divisores"가 나왔고, 209장 중 딱 한 장이라 눈으로는 찾지 못했다.
 */
const DIV: L<(k: number) => string> = {
  ko: k => `약수 ${k}개`,
  en: k => (k === 1 ? '1 divisor' : `${k} divisors`),
  es: k => (k === 1 ? '1 divisor' : `${k} divisores`),
  pt: k => (k === 1 ? '1 divisor' : `${k} divisores`),
  ja: k => `約数${k}個`,
  de: k => (k === 1 ? '1 Teiler' : `${k} Teiler`),
  fr: k => (k <= 1 ? `${k} diviseur` : `${k} diviseurs`),
  hi: k => `${k} भाजक`,
  zh: k => `${k} 个因数`,
  tw: k => `${k} 個因數`,
};

type Spec = { [K in keyof NumberUI]: L<NumberUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('수', 'Numbers', 'Números', 'Números', '数', 'Zahlen', 'Nombres', 'संख्याएँ', '数字', '數字'),

  hubTitle: T(
    '1부터 200까지, 수 하나하나',
    'Every number from 1 to 200',
    'Cada número del 1 al 200',
    'Cada número de 1 a 200',
    '1から200まで、数のひとつずつ',
    'Jede Zahl von 1 bis 200',
    'Chaque nombre de 1 à 200',
    '1 से 200 तक हर संख्या',
    '从 1 到 200，一个数一页',
    '從 1 到 200，一個數一頁',
  ),

  hubLead: T(
    '소인수분해와 약수, 진법과 로마 숫자까지 그 수에서 계산했습니다. 베껴 적은 표는 한 줄도 없습니다.',
    'Prime factors, divisors, bases and Roman numerals — all worked out from the number itself. Nothing here was copied from a table.',
    'Factores primos, divisores, bases y números romanos: todo sale del propio número. Aquí no se ha copiado ninguna tabla.',
    'Fatores primos, divisores, bases e algarismos romanos — tudo sai do próprio número. Nada aqui foi copiado de uma tabela.',
    '素因数分解も約数も、進法もローマ数字も、その数から計算しています。書き写した表は一行もありません。',
    'Primfaktoren, Teiler, Zahlensysteme und römische Zahlen — alles aus der Zahl selbst berechnet. Keine Zeile ist aus einer Tabelle abgeschrieben.',
    'Facteurs premiers, diviseurs, bases et chiffres romains : tout est calculé à partir du nombre. Rien n’est recopié d’une table.',
    'अभाज्य गुणनखंड, भाजक, आधार और रोमन अंक — सब कुछ उसी संख्या से निकाला गया है। यहाँ कोई तालिका नकल नहीं की गई।',
    '质因数分解、因数、进制、罗马数字，全部由这个数本身算出。这里没有一行是抄表来的。',
    '質因數分解、因數、進位、羅馬數字，全部由這個數本身算出。這裡沒有一行是抄表來的。',
  ),

  gridTitle: T('수의 격자', 'The grid', 'La cuadrícula', 'A grade', '数の格子', 'Das Raster', 'La grille', 'संख्याओं का जाल', '数字方格', '數字方格'),

  gridNote: T(
    '열 칸씩 스무 줄입니다. 진한 칸이 소수이고, 2와 5의 배수가 세로줄로 빠지는 모양이 보입니다.',
    'Ten per row, twenty rows. The filled cells are primes — you can see the multiples of 2 and 5 drop out in columns.',
    'Diez por fila, veinte filas. Las celdas marcadas son primos: se ven caer en columnas los múltiplos de 2 y de 5.',
    'Dez por linha, vinte linhas. As células marcadas são primos — dá para ver os múltiplos de 2 e de 5 caírem em colunas.',
    '横に10、縦に20。濃い升が素数です。2と5の倍数が縦の列ごと抜けていくのが見えます。',
    'Zehn pro Zeile, zwanzig Zeilen. Die gefüllten Felder sind Primzahlen — die Vielfachen von 2 und 5 fallen spaltenweise heraus.',
    'Dix par ligne, vingt lignes. Les cases pleines sont les nombres premiers : on voit les multiples de 2 et de 5 tomber par colonnes.',
    'हर पंक्ति में दस, कुल बीस पंक्तियाँ। गहरे खाने अभाज्य हैं — 2 और 5 के गुणज पूरे स्तंभ में गिरते दिखते हैं।',
    '每行十个，共二十行。深色格是质数——2 和 5 的倍数整列整列地掉出去。',
    '每列十個，共二十列。深色格是質數——2 和 5 的倍數整行整行地掉出去。',
  ),

  primeTag: T('소수', 'Prime', 'Primo', 'Primo', '素数', 'Primzahl', 'Premier', 'अभाज्य', '质数', '質數'),
  compositeTag: T('합성수', 'Composite', 'Compuesto', 'Composto', '合成数', 'Zusammengesetzt', 'Composé', 'भाज्य', '合数', '合數'),

  powersTitle: T('2의 거듭제곱', 'Powers of two', 'Potencias de dos', 'Potências de dois', '2の累乗', 'Zweierpotenzen', 'Puissances de deux', 'दो की घातें', '2 的幂', '2 的冪'),

  powersNote: T(
    '한 바이트가 256에서 끝나고 포트 번호가 65535에서 멈추는 이유가 여기 있습니다.',
    'This is why a byte stops at 256 and a port number stops at 65535.',
    'Por esto un byte se detiene en 256 y un número de puerto en 65535.',
    'É por isso que um byte para em 256 e um número de porta para em 65535.',
    '1バイトが256で終わり、ポート番号が65535で止まる理由がここにあります。',
    'Deshalb endet ein Byte bei 256 und eine Portnummer bei 65535.',
    'C’est pourquoi un octet s’arrête à 256 et un numéro de port à 65535.',
    'इसीलिए एक बाइट 256 पर खत्म होती है और पोर्ट संख्या 65535 पर रुकती है।',
    '一个字节到 256 为止、端口号停在 65535，原因就在这里。',
    '一個位元組到 256 為止、連接埠號停在 65535，原因就在這裡。',
  ),

  familyTitle: T('이 수가 든 갈래', 'Families it belongs to', 'Familias a las que pertenece', 'Famílias a que pertence', 'この数が入る仲間', 'Familien, zu denen sie gehört', 'Familles auxquelles il appartient', 'यह संख्या किन वर्गों में है', '它属于哪些数列', '它屬於哪些數列'),

  familyLabel: T(
    { prime: '소수', square: '제곱수', cube: '세제곱수', triangular: '삼각수', fibonacci: '피보나치 수', power2: '2의 거듭제곱', perfect: '완전수' },
    { prime: 'Prime', square: 'Square', cube: 'Cube', triangular: 'Triangular', fibonacci: 'Fibonacci', power2: 'Power of two', perfect: 'Perfect' },
    { prime: 'Primo', square: 'Cuadrado', cube: 'Cubo', triangular: 'Triangular', fibonacci: 'Fibonacci', power2: 'Potencia de dos', perfect: 'Perfecto' },
    { prime: 'Primo', square: 'Quadrado', cube: 'Cubo', triangular: 'Triangular', fibonacci: 'Fibonacci', power2: 'Potência de dois', perfect: 'Perfeito' },
    { prime: '素数', square: '平方数', cube: '立方数', triangular: '三角数', fibonacci: 'フィボナッチ数', power2: '2の累乗', perfect: '完全数' },
    { prime: 'Primzahl', square: 'Quadratzahl', cube: 'Kubikzahl', triangular: 'Dreieckszahl', fibonacci: 'Fibonacci-Zahl', power2: 'Zweierpotenz', perfect: 'Vollkommene Zahl' },
    { prime: 'Nombre premier', square: 'Carré', cube: 'Cube', triangular: 'Triangulaire', fibonacci: 'Fibonacci', power2: 'Puissance de deux', perfect: 'Nombre parfait' },
    { prime: 'अभाज्य', square: 'वर्ग संख्या', cube: 'घन संख्या', triangular: 'त्रिभुज संख्या', fibonacci: 'फिबोनैचि संख्या', power2: 'दो की घात', perfect: 'पूर्ण संख्या' },
    { prime: '质数', square: '平方数', cube: '立方数', triangular: '三角数', fibonacci: '斐波那契数', power2: '2 的幂', perfect: '完全数' },
    { prime: '質數', square: '平方數', cube: '立方數', triangular: '三角數', fibonacci: '費波那契數', power2: '2 的冪', perfect: '完全數' },
  ),

  familyNote: T(
    {
      prime: '1과 자기 자신 말고는 나누는 수가 없습니다.',
      square: '같은 수를 두 번 곱해 나옵니다 — 점을 정사각형으로 놓을 수 있습니다.',
      cube: '같은 수를 세 번 곱해 나옵니다 — 점을 정육면체로 쌓을 수 있습니다.',
      triangular: '1부터 차례로 더한 합입니다 — 점을 삼각형으로 쌓을 수 있습니다.',
      fibonacci: '앞의 두 수를 더해 이어지는 줄에 듭니다.',
      power2: '2를 거듭 곱해 나옵니다. 비트가 하나 늘 때마다 두 배가 됩니다.',
      perfect: '자기를 뺀 약수를 모두 더하면 자기 자신이 됩니다.',
    },
    {
      prime: 'Nothing divides it but 1 and itself.',
      square: 'A number times itself — the dots lay out as a square.',
      cube: 'A number times itself three times — the dots stack into a cube.',
      triangular: 'The running total of 1, 2, 3 … — the dots stack into a triangle.',
      fibonacci: 'It sits in the run where each number is the sum of the two before it.',
      power2: 'Two multiplied by itself. Every extra bit doubles it.',
      perfect: 'Add up its divisors except itself and you get the number back.',
    },
    {
      prime: 'Solo lo dividen el 1 y él mismo.',
      square: 'Un número por sí mismo: los puntos forman un cuadrado.',
      cube: 'Un número por sí mismo tres veces: los puntos forman un cubo.',
      triangular: 'La suma acumulada de 1, 2, 3…: los puntos forman un triángulo.',
      fibonacci: 'Está en la sucesión donde cada número es la suma de los dos anteriores.',
      power2: 'Dos multiplicado por sí mismo. Cada bit de más lo duplica.',
      perfect: 'Suma sus divisores salvo él mismo y vuelve a salir el número.',
    },
    {
      prime: 'Só o 1 e ele mesmo o dividem.',
      square: 'Um número vezes ele mesmo — os pontos formam um quadrado.',
      cube: 'Um número vezes ele mesmo três vezes — os pontos formam um cubo.',
      triangular: 'A soma corrida de 1, 2, 3… — os pontos formam um triângulo.',
      fibonacci: 'Está na sequência em que cada número é a soma dos dois anteriores.',
      power2: 'Dois multiplicado por si mesmo. Cada bit a mais dobra o valor.',
      perfect: 'Some os divisores menos ele mesmo e o número volta.',
    },
    {
      prime: '1と自分自身のほかに割り切る数がありません。',
      square: '同じ数を二度かけて得られます。点を正方形に並べられます。',
      cube: '同じ数を三度かけて得られます。点を立方体に積めます。',
      triangular: '1から順に足した合計です。点を三角形に積めます。',
      fibonacci: '前の二つを足して続く並びに入ります。',
      power2: '2をかけ続けて得られます。ビットが一つ増えるたびに倍になります。',
      perfect: '自分を除く約数を足すと、自分自身に戻ります。',
    },
    {
      prime: 'Außer 1 und sich selbst teilt sie nichts.',
      square: 'Eine Zahl mal sich selbst — die Punkte legen sich als Quadrat.',
      cube: 'Eine Zahl dreimal mit sich selbst multipliziert — die Punkte stapeln sich zum Würfel.',
      triangular: 'Die laufende Summe von 1, 2, 3 … — die Punkte stapeln sich zum Dreieck.',
      fibonacci: 'Sie steht in der Folge, in der jede Zahl die Summe der beiden davor ist.',
      power2: 'Zwei mit sich selbst multipliziert. Jedes zusätzliche Bit verdoppelt sie.',
      perfect: 'Addiert man ihre Teiler ohne sie selbst, kommt die Zahl wieder heraus.',
    },
    {
      prime: 'Rien ne le divise à part 1 et lui-même.',
      square: 'Un nombre multiplié par lui-même : les points forment un carré.',
      cube: 'Un nombre multiplié trois fois par lui-même : les points forment un cube.',
      triangular: 'La somme cumulée de 1, 2, 3… : les points forment un triangle.',
      fibonacci: 'Il figure dans la suite où chaque nombre est la somme des deux précédents.',
      power2: 'Deux multiplié par lui-même. Chaque bit de plus le double.',
      perfect: 'Additionnez ses diviseurs sauf lui-même et le nombre revient.',
    },
    {
      prime: '1 और स्वयं के अलावा कोई इसे नहीं बाँटता।',
      square: 'एक संख्या को स्वयं से गुणा — बिंदु वर्ग बनाते हैं।',
      cube: 'एक संख्या को स्वयं से तीन बार गुणा — बिंदु घन बनाते हैं।',
      triangular: '1, 2, 3 … का चलता योग — बिंदु त्रिभुज बनाते हैं।',
      fibonacci: 'यह उस श्रेणी में है जहाँ हर संख्या पिछली दो का योग है।',
      power2: 'दो को बार-बार गुणा करने से। हर अतिरिक्त बिट इसे दोगुना करता है।',
      perfect: 'स्वयं को छोड़कर भाजक जोड़ें तो वही संख्या लौट आती है।',
    },
    {
      prime: '除了 1 和它自己，没有数能整除它。',
      square: '一个数乘自己——点可以排成正方形。',
      cube: '一个数乘自己三次——点可以堆成正方体。',
      triangular: '从 1 依次相加的和——点可以堆成三角形。',
      fibonacci: '它在“每个数是前两个之和”的那串里。',
      power2: '2 一直乘下去。每多一个比特就翻一倍。',
      perfect: '把自己以外的因数加起来，正好等于它自己。',
    },
    {
      prime: '除了 1 和它自己，沒有數能整除它。',
      square: '一個數乘自己——點可以排成正方形。',
      cube: '一個數乘自己三次——點可以堆成正方體。',
      triangular: '從 1 依序相加的和——點可以堆成三角形。',
      fibonacci: '它在「每個數是前兩個之和」的那串裡。',
      power2: '2 一直乘下去。每多一個位元就翻一倍。',
      perfect: '把自己以外的因數加起來，正好等於它自己。',
    },
  ),

  kindLabel: T(
    { perfect: '완전수', abundant: '과잉수', deficient: '부족수' },
    { perfect: 'Perfect', abundant: 'Abundant', deficient: 'Deficient' },
    { perfect: 'Perfecto', abundant: 'Abundante', deficient: 'Deficiente' },
    { perfect: 'Perfeito', abundant: 'Abundante', deficient: 'Deficiente' },
    { perfect: '完全数', abundant: '過剰数', deficient: '不足数' },
    { perfect: 'Vollkommen', abundant: 'Abundant', deficient: 'Defizient' },
    { perfect: 'Parfait', abundant: 'Abondant', deficient: 'Déficient' },
    { perfect: 'पूर्ण', abundant: 'अधिक', deficient: 'न्यून' },
    { perfect: '完全数', abundant: '盈数', deficient: '亏数' },
    { perfect: '完全數', abundant: '盈數', deficient: '虧數' },
  ),

  kindNote: T(
    {
      perfect: '자기를 뺀 약수의 합이 자기와 꼭 같습니다.',
      abundant: '자기를 뺀 약수의 합이 자기보다 큽니다.',
      deficient: '자기를 뺀 약수의 합이 자기보다 작습니다.',
    },
    {
      perfect: 'Its divisors, itself excluded, add up to exactly the number.',
      abundant: 'Its divisors, itself excluded, add up to more than the number.',
      deficient: 'Its divisors, itself excluded, add up to less than the number.',
    },
    {
      perfect: 'Sus divisores, sin contarlo, suman exactamente el número.',
      abundant: 'Sus divisores, sin contarlo, suman más que el número.',
      deficient: 'Sus divisores, sin contarlo, suman menos que el número.',
    },
    {
      perfect: 'Seus divisores, sem contá-lo, somam exatamente o número.',
      abundant: 'Seus divisores, sem contá-lo, somam mais que o número.',
      deficient: 'Seus divisores, sem contá-lo, somam menos que o número.',
    },
    {
      perfect: '自分を除く約数の合計が、自分とちょうど同じです。',
      abundant: '自分を除く約数の合計が、自分より大きいです。',
      deficient: '自分を除く約数の合計が、自分より小さいです。',
    },
    {
      perfect: 'Ihre Teiler ohne sie selbst ergeben genau die Zahl.',
      abundant: 'Ihre Teiler ohne sie selbst ergeben mehr als die Zahl.',
      deficient: 'Ihre Teiler ohne sie selbst ergeben weniger als die Zahl.',
    },
    {
      perfect: 'Ses diviseurs, lui excepté, donnent exactement le nombre.',
      abundant: 'Ses diviseurs, lui excepté, donnent plus que le nombre.',
      deficient: 'Ses diviseurs, lui excepté, donnent moins que le nombre.',
    },
    {
      perfect: 'स्वयं को छोड़कर इसके भाजकों का योग ठीक इसी संख्या के बराबर है।',
      abundant: 'स्वयं को छोड़कर इसके भाजकों का योग इस संख्या से अधिक है।',
      deficient: 'स्वयं को छोड़कर इसके भाजकों का योग इस संख्या से कम है।',
    },
    {
      perfect: '除自己以外的因数之和，正好等于它。',
      abundant: '除自己以外的因数之和，比它大。',
      deficient: '除自己以外的因数之和，比它小。',
    },
    {
      perfect: '除自己以外的因數之和，正好等於它。',
      abundant: '除自己以外的因數之和，比它大。',
      deficient: '除自己以外的因數之和，比它小。',
    },
  ),

  factorLabel: T('소인수분해', 'Prime factors', 'Factores primos', 'Fatores primos', '素因数分解', 'Primfaktoren', 'Facteurs premiers', 'अभाज्य गुणनखंड', '质因数分解', '質因數分解'),
  factorPrime: T('더 갈라지지 않습니다', 'It does not break down further', 'No se descompone más', 'Não se decompõe mais', 'これ以上は分けられません', 'Lässt sich nicht weiter zerlegen', 'Il ne se décompose pas davantage', 'इससे आगे नहीं टूटती', '不能再分解了', '不能再分解了'),
  divisorLabel: T('약수', 'Divisors', 'Divisores', 'Divisores', '約数', 'Teiler', 'Diviseurs', 'भाजक', '因数', '因數'),
  divisorSumLabel: T('약수의 합', 'Sum of divisors', 'Suma de divisores', 'Soma dos divisores', '約数の和', 'Summe der Teiler', 'Somme des diviseurs', 'भाजकों का योग', '因数之和', '因數之和'),
  properSumLabel: T('자기를 뺀 합', 'Sum without itself', 'Suma sin él mismo', 'Soma sem ele mesmo', '自分を除く和', 'Summe ohne sich selbst', 'Somme sans lui-même', 'स्वयं को छोड़कर योग', '除自身之和', '除自身之和'),
  totientLabel: T('서로소인 수', 'Coprime below it', 'Coprimos menores', 'Coprimos menores', '互いに素な数', 'Teilerfremde darunter', 'Premiers avec lui', 'सह-अभाज्य संख्याएँ', '与它互质的数', '與它互質的數'),
  digitSumLabel: T('자릿수의 합', 'Digit sum', 'Suma de dígitos', 'Soma dos dígitos', '各桁の和', 'Quersumme', 'Somme des chiffres', 'अंकों का योग', '数字和', '數字和'),
  digitalRootLabel: T('디지털 루트', 'Digital root', 'Raíz digital', 'Raiz digital', '数根', 'Digitalwurzel', 'Racine numérique', 'अंक मूल', '数字根', '數字根'),
  romanLabel: T('로마 숫자', 'Roman numeral', 'Número romano', 'Algarismo romano', 'ローマ数字', 'Römische Zahl', 'Chiffre romain', 'रोमन अंक', '罗马数字', '羅馬數字'),
  romanNone: T('3999까지만 적을 수 있습니다', 'Only up to 3999', 'Solo hasta 3999', 'Só até 3999', '3999までしか書けません', 'Nur bis 3999', 'Seulement jusqu’à 3999', 'केवल 3999 तक', '只能写到 3999', '只能寫到 3999'),
  binLabel: T('2진수', 'Binary', 'Binario', 'Binário', '2進数', 'Binär', 'Binaire', 'द्विआधारी', '二进制', '二進位'),
  octLabel: T('8진수', 'Octal', 'Octal', 'Octal', '8進数', 'Oktal', 'Octal', 'अष्टाधारी', '八进制', '八進位'),
  hexLabel: T('16진수', 'Hexadecimal', 'Hexadecimal', 'Hexadecimal', '16進数', 'Hexadezimal', 'Hexadécimal', 'षोडश आधारी', '十六进制', '十六進位'),
  base36Label: T('36진수', 'Base 36', 'Base 36', 'Base 36', '36進数', 'Basis 36', 'Base 36', 'आधार 36', '36 进制', '36 進位'),
  bitsLabel: T('비트 수', 'Bits', 'Bits', 'Bits', 'ビット数', 'Bits', 'Bits', 'बिट', '比特数', '位元數'),

  bitsValue: T<(k: number) => string>(
    k => `${k}비트`,
    k => (k === 1 ? '1 bit' : `${k} bits`),
    k => (k === 1 ? '1 bit' : `${k} bits`),
    k => (k === 1 ? '1 bit' : `${k} bits`),
    k => `${k}ビット`,
    k => (k === 1 ? '1 Bit' : `${k} Bit`),
    k => (k <= 1 ? `${k} bit` : `${k} bits`),
    k => `${k} बिट`,
    k => `${k} 位`,
    k => `${k} 位元`,
  ),

  collatzLabel: T('콜라츠 걸음', 'Collatz steps', 'Pasos de Collatz', 'Passos de Collatz', 'コラッツの歩数', 'Collatz-Schritte', 'Étapes de Collatz', 'कोलैट्ज़ चरण', '考拉兹步数', '考拉茲步數'),

  collatzValue: T<(steps: number, peak: number) => string>(
    (s, p) => `${s}걸음 · 최고 ${N('ko')(p)}`,
    (s, p) => `${s === 1 ? '1 step' : `${s} steps`} · peaks at ${N('en')(p)}`,
    (s, p) => `${s === 1 ? '1 paso' : `${s} pasos`} · máximo ${N('es')(p)}`,
    (s, p) => `${s === 1 ? '1 passo' : `${s} passos`} · máximo ${N('pt-BR')(p)}`,
    (s, p) => `${s}歩 · 最高 ${N('ja')(p)}`,
    (s, p) => `${s === 1 ? '1 Schritt' : `${s} Schritte`} · Höchstwert ${N('de')(p)}`,
    // 프랑스어는 0도 단수다 — "0 étapes"가 아니라 "0 étape"
    (s, p) => `${s <= 1 ? `${s} étape` : `${s} étapes`} · maximum ${N('fr')(p)}`,
    (s, p) => `${s} चरण · शिखर ${N('en')(p)}`,
    (s, p) => `${s} 步 · 最高 ${N('zh')(p)}`,
    (s, p) => `${s} 步 · 最高 ${N('zh-Hant')(p)}`,
  ),

  prevPrimeLabel: T('앞의 소수', 'Prime before', 'Primo anterior', 'Primo anterior', '前の素数', 'Primzahl davor', 'Premier précédent', 'पिछला अभाज्य', '前一个质数', '前一個質數'),
  nextPrimeLabel: T('다음 소수', 'Prime after', 'Primo siguiente', 'Primo seguinte', '次の素数', 'Primzahl danach', 'Premier suivant', 'अगला अभाज्य', '下一个质数', '下一個質數'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  rectTitle: T('점으로 놓아 보기', 'Laid out as dots', 'Puesto en puntos', 'Disposto em pontos', '点で並べてみる', 'Als Punkte gelegt', 'Disposé en points', 'बिंदुओं में रखकर', '摆成点阵', '擺成點陣'),

  rectNote: T<(f: NumberFacts) => string>(
    f => (f.prime
      ? `한 줄로밖에 놓이지 않습니다. 직사각형이 하나뿐인 것이 소수라는 뜻입니다.`
      : `${f.rect.rows} × ${f.rect.cols}로 놓입니다. 약수가 많을수록 정사각형에 가까워집니다.`),
    f => (f.prime
      ? `It only fits in one row. Having no other rectangle is what being prime means.`
      : `It fits as ${f.rect.rows} × ${f.rect.cols}. The more divisors, the closer to a square.`),
    f => (f.prime
      ? `Solo cabe en una fila. No tener otro rectángulo es lo que significa ser primo.`
      : `Cabe como ${f.rect.rows} × ${f.rect.cols}. Cuantos más divisores, más cerca del cuadrado.`),
    f => (f.prime
      ? `Só cabe em uma linha. Não ter outro retângulo é o que significa ser primo.`
      : `Cabe como ${f.rect.rows} × ${f.rect.cols}. Quanto mais divisores, mais perto do quadrado.`),
    f => (f.prime
      ? `一列にしか並びません。長方形が一つしかないことが、素数だということです。`
      : `${f.rect.rows} × ${f.rect.cols} に並びます。約数が多いほど正方形に近づきます。`),
    f => (f.prime
      ? `Sie passt nur in eine Reihe. Kein zweites Rechteck zu haben, heißt Primzahl zu sein.`
      : `Sie passt als ${f.rect.rows} × ${f.rect.cols}. Je mehr Teiler, desto näher am Quadrat.`),
    f => (f.prime
      ? `Il ne tient que sur une ligne. N’avoir aucun autre rectangle, c’est être premier.`
      : `Il tient en ${f.rect.rows} × ${f.rect.cols}. Plus il y a de diviseurs, plus on approche du carré.`),
    f => (f.prime
      ? `यह केवल एक पंक्ति में बैठती है। दूसरा आयत न होना ही अभाज्य होना है।`
      : `यह ${f.rect.rows} × ${f.rect.cols} में बैठती है। जितने अधिक भाजक, उतना वर्ग के करीब।`),
    f => (f.prime
      ? `只能排成一行。排不出别的长方形，这就是质数的意思。`
      : `可以排成 ${f.rect.rows} × ${f.rect.cols}。因数越多，越接近正方形。`),
    f => (f.prime
      ? `只能排成一列。排不出別的長方形，這就是質數的意思。`
      : `可以排成 ${f.rect.rows} × ${f.rect.cols}。因數越多，越接近正方形。`),
  ),

  divisorCount: DIV,

  neighbourTitle: T('앞뒤의 수', 'Numbers either side', 'Números vecinos', 'Números vizinhos', '前後の数', 'Zahlen daneben', 'Nombres voisins', 'आस-पास की संख्याएँ', '相邻的数', '相鄰的數'),

  /*
    1은 소수도 합성수도 아니라 두 갈래 어디에도 안 들어간다. 209장 중 한 장뿐이라
    빼먹기 쉬운데, 빼먹으면 "1 = . Tem 1 divisores"처럼 빈 곱과 틀린 복수형이
    한꺼번에 나온다.
  */
  desc: T<(f: NumberFacts) => string>(
    f => (f.n === 1
      ? `1은 소수도 합성수도 아닙니다. 나누어떨어지게 하는 수가 자기 자신뿐이라 ${DIV.ko(1)}입니다.`
      : f.prime
        ? `${N('ko')(f.n)}${ko(f.n, '은', '는')} 1과 자기 자신으로만 나뉘는 소수입니다. 앞의 소수는 ${f.prevPrime === null ? '없고' : `${N('ko')(f.prevPrime)}${ko(f.prevPrime, '이고', '고')}`}, 다음은 ${N('ko')(f.nextPrime!)}입니다.`
        : `${N('ko')(f.n)} = ${factorText(f.factors)}. ${DIV.ko(f.divisors.length)}이고, 모두 더하면 ${N('ko')(f.divisorSum)}입니다.`),
    f => (f.n === 1
      ? `1 is neither prime nor composite. Only itself divides it, so it has ${DIV.en(1)}.`
      : f.prime
        ? `${N('en')(f.n)} is a prime: only 1 and itself divide it. The prime before is ${f.prevPrime === null ? 'none' : N('en')(f.prevPrime)}, the next is ${N('en')(f.nextPrime!)}.`
        : `${N('en')(f.n)} = ${factorText(f.factors)}. It has ${DIV.en(f.divisors.length)}, adding up to ${N('en')(f.divisorSum)}.`),
    f => (f.n === 1
      ? `1 no es primo ni compuesto. Solo él mismo lo divide, así que tiene ${DIV.es(1)}.`
      : f.prime
        ? `${N('es')(f.n)} es primo: solo lo dividen 1 y él mismo. El primo anterior es ${f.prevPrime === null ? 'ninguno' : N('es')(f.prevPrime)} y el siguiente, ${N('es')(f.nextPrime!)}.`
        : `${N('es')(f.n)} = ${factorText(f.factors)}. Tiene ${DIV.es(f.divisors.length)}, que suman ${N('es')(f.divisorSum)}.`),
    f => (f.n === 1
      ? `1 não é primo nem composto. Só ele mesmo o divide, portanto tem ${DIV.pt(1)}.`
      : f.prime
        ? `${N('pt-BR')(f.n)} é primo: só 1 e ele mesmo o dividem. O primo anterior é ${f.prevPrime === null ? 'nenhum' : N('pt-BR')(f.prevPrime)} e o seguinte, ${N('pt-BR')(f.nextPrime!)}.`
        : `${N('pt-BR')(f.n)} = ${factorText(f.factors)}. Tem ${DIV.pt(f.divisors.length)}, que somam ${N('pt-BR')(f.divisorSum)}.`),
    f => (f.n === 1
      ? `1は素数でも合成数でもありません。割り切れるのは自分自身だけで、${DIV.ja(1)}です。`
      : f.prime
        ? `${N('ja')(f.n)}は1と自分自身でしか割り切れない素数です。前の素数は${f.prevPrime === null ? 'なく' : `${N('ja')(f.prevPrime)}で`}、次は${N('ja')(f.nextPrime!)}です。`
        : `${N('ja')(f.n)} = ${factorText(f.factors)}。${DIV.ja(f.divisors.length)}で、全部足すと${N('ja')(f.divisorSum)}になります。`),
    f => (f.n === 1
      ? `1 ist weder Primzahl noch zusammengesetzt. Nur sie selbst teilt sie, also hat sie ${DIV.de(1)}.`
      : f.prime
        ? `${N('de')(f.n)} ist eine Primzahl: nur 1 und sie selbst teilen sie. Die Primzahl davor ist ${f.prevPrime === null ? 'keine' : N('de')(f.prevPrime)}, die danach ${N('de')(f.nextPrime!)}.`
        : `${N('de')(f.n)} = ${factorText(f.factors)}. Sie hat ${DIV.de(f.divisors.length)}, die zusammen ${N('de')(f.divisorSum)} ergeben.`),
    f => (f.n === 1
      ? `1 n’est ni premier ni composé. Seul lui-même le divise, il a donc ${DIV.fr(1)}.`
      : f.prime
        ? `${N('fr')(f.n)} est premier : seuls 1 et lui-même le divisent. Le premier précédent est ${f.prevPrime === null ? 'aucun' : N('fr')(f.prevPrime)}, le suivant ${N('fr')(f.nextPrime!)}.`
        : `${N('fr')(f.n)} = ${factorText(f.factors)}. Il a ${DIV.fr(f.divisors.length)}, dont la somme fait ${N('fr')(f.divisorSum)}.`),
    f => (f.n === 1
      ? `1 न अभाज्य है न भाज्य। इसे केवल स्वयं बाँटता है, इसलिए इसका ${DIV.hi(1)} है।`
      : f.prime
        ? `${N('en')(f.n)} अभाज्य है: इसे केवल 1 और स्वयं बाँटते हैं। पिछला अभाज्य ${f.prevPrime === null ? 'कोई नहीं' : N('en')(f.prevPrime)} है और अगला ${N('en')(f.nextPrime!)}।`
        : `${N('en')(f.n)} = ${factorText(f.factors)}। इसके ${DIV.hi(f.divisors.length)} हैं, जिनका योग ${N('en')(f.divisorSum)} है।`),
    f => (f.n === 1
      ? `1 既不是质数也不是合数。只有它自己能整除，所以只有 ${DIV.zh(1)}。`
      : f.prime
        ? `${N('zh')(f.n)} 是质数，只有 1 和它自己能整除。前一个质数是${f.prevPrime === null ? '没有' : N('zh')(f.prevPrime)}，下一个是 ${N('zh')(f.nextPrime!)}。`
        : `${N('zh')(f.n)} = ${factorText(f.factors)}。它有 ${DIV.zh(f.divisors.length)}，加起来是 ${N('zh')(f.divisorSum)}。`),
    f => (f.n === 1
      ? `1 既不是質數也不是合數。只有它自己能整除，所以只有 ${DIV.tw(1)}。`
      : f.prime
        ? `${N('zh-Hant')(f.n)} 是質數，只有 1 和它自己能整除。前一個質數是${f.prevPrime === null ? '沒有' : N('zh-Hant')(f.prevPrime)}，下一個是 ${N('zh-Hant')(f.nextPrime!)}。`
        : `${N('zh-Hant')(f.n)} = ${factorText(f.factors)}。它有 ${DIV.tw(f.divisors.length)}，加起來是 ${N('zh-Hant')(f.divisorSum)}。`),
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '소인수분해는 그 수를 만드는 재료입니다. 약수의 개수도 합도 여기서 나옵니다.',
      '약수를 다 더한 값에서 자기를 빼면 완전수·과잉수·부족수가 갈립니다.',
      '2진수의 자릿수가 곧 비트 수입니다. 255가 여덟 자리인 것이 한 바이트입니다.',
      '콜라츠는 짝수면 반으로, 홀수면 세 배 더하기 1. 1에 닿을 때까지의 걸음 수입니다.',
    ],
    [
      'The prime factors are what the number is made of. The count and sum of divisors both follow from them.',
      'Add the divisors, take the number away, and you get perfect, abundant or deficient.',
      'The length of the binary form is the bit count. 255 taking eight digits is what a byte is.',
      'Collatz: halve it if even, triple it and add one if odd. The count is how many moves reach 1.',
    ],
    [
      'Los factores primos son de lo que está hecho el número. De ahí salen el número de divisores y su suma.',
      'Suma los divisores, resta el propio número y sale perfecto, abundante o deficiente.',
      'La longitud del binario es el número de bits. Que 255 ocupe ocho dígitos es lo que es un byte.',
      'Collatz: si es par, a la mitad; si es impar, por tres más uno. El paso cuenta hasta llegar a 1.',
    ],
    [
      'Os fatores primos são do que o número é feito. Deles saem a quantidade de divisores e a soma.',
      'Some os divisores, tire o próprio número e sai perfeito, abundante ou deficiente.',
      'O comprimento do binário é a contagem de bits. 255 ocupar oito dígitos é o que é um byte.',
      'Collatz: se par, metade; se ímpar, três vezes mais um. A contagem vai até chegar a 1.',
    ],
    [
      '素因数分解はその数の材料です。約数の個数も和もここから出ます。',
      '約数を全部足して自分を引くと、完全数・過剰数・不足数に分かれます。',
      '2進数の桁数がそのままビット数です。255が八桁なのが1バイトということです。',
      'コラッツは偶数なら半分、奇数なら三倍して1を足す。1に着くまでの歩数です。',
    ],
    [
      'Die Primfaktoren sind der Stoff der Zahl. Anzahl und Summe der Teiler folgen daraus.',
      'Teiler addieren, die Zahl abziehen — so trennen sich vollkommen, abundant und defizient.',
      'Die Länge der Binärform ist die Bitzahl. Dass 255 acht Stellen braucht, ist ein Byte.',
      'Collatz: gerade halbieren, ungerade verdreifachen und eins dazu. Gezählt wird bis zur 1.',
    ],
    [
      'Les facteurs premiers sont la matière du nombre. Le nombre de diviseurs et leur somme en découlent.',
      'Additionnez les diviseurs, retirez le nombre : parfait, abondant ou déficient.',
      'La longueur de l’écriture binaire donne le nombre de bits. 255 sur huit chiffres, c’est un octet.',
      'Collatz : pair, on divise par deux ; impair, on triple et on ajoute un. On compte jusqu’à 1.',
    ],
    [
      'अभाज्य गुणनखंड ही संख्या की सामग्री हैं। भाजकों की संख्या और योग इन्हीं से निकलते हैं।',
      'भाजक जोड़कर संख्या घटाइए — पूर्ण, अधिक या न्यून सामने आ जाता है।',
      'द्विआधारी रूप की लंबाई ही बिट संख्या है। 255 का आठ अंकों में आना ही एक बाइट है।',
      'कोलैट्ज़: सम हो तो आधा, विषम हो तो तीन गुना और एक। गिनती 1 तक पहुँचने की है।',
    ],
    [
      '质因数是这个数的材料。因数的个数和总和都从这里出来。',
      '把因数加起来再减掉它自己，就分出完全数、盈数和亏数。',
      '二进制的位数就是比特数。255 占八位，这就是一个字节。',
      '考拉兹：偶数减半，奇数三倍加一。步数是走到 1 为止的次数。',
    ],
    [
      '質因數是這個數的材料。因數的個數和總和都從這裡出來。',
      '把因數加起來再減掉它自己，就分出完全數、盈數和虧數。',
      '二進位的位數就是位元數。255 佔八位，這就是一個位元組。',
      '考拉茲：偶數減半，奇數三倍加一。步數是走到 1 為止的次數。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '수 사전 — 1부터 200까지의 소인수분해와 약수',
    'Number reference — factors and divisors from 1 to 200',
    'Diccionario de números — factores y divisores del 1 al 200',
    'Dicionário de números — fatores e divisores de 1 a 200',
    '数の事典 — 1から200までの素因数分解と約数',
    'Zahlenlexikon — Primfaktoren und Teiler von 1 bis 200',
    'Dictionnaire des nombres — facteurs et diviseurs de 1 à 200',
    'संख्या कोश — 1 से 200 तक गुणनखंड और भाजक',
    '数字词典 — 1 到 200 的质因数与因数',
    '數字詞典 — 1 到 200 的質因數與因數',
  ),

  hubMetaDesc: T(
    '1부터 200까지와 2의 거듭제곱 아홉 개. 소인수분해·약수·약수의 합·진법·로마 숫자·콜라츠를 한 장에 모았습니다.',
    'Every number from 1 to 200 plus nine powers of two: prime factors, divisors, sums, bases, Roman numerals and Collatz steps on one page each.',
    'Del 1 al 200 más nueve potencias de dos: factores primos, divisores, sumas, bases, números romanos y pasos de Collatz.',
    'De 1 a 200 mais nove potências de dois: fatores primos, divisores, somas, bases, algarismos romanos e passos de Collatz.',
    '1から200までと2の累乗が9つ。素因数分解・約数・約数の和・進法・ローマ数字・コラッツを1ページにまとめました。',
    'Von 1 bis 200 plus neun Zweierpotenzen: Primfaktoren, Teiler, Summen, Zahlensysteme, römische Zahlen und Collatz-Schritte.',
    'De 1 à 200 plus neuf puissances de deux : facteurs premiers, diviseurs, sommes, bases, chiffres romains et étapes de Collatz.',
    '1 से 200 तक और दो की नौ घातें: अभाज्य गुणनखंड, भाजक, योग, आधार, रोमन अंक और कोलैट्ज़ चरण।',
    '从 1 到 200，外加九个 2 的幂：质因数分解、因数、因数之和、进制、罗马数字和考拉兹步数。',
    '從 1 到 200，外加九個 2 的冪：質因數分解、因數、因數之和、進位、羅馬數字和考拉茲步數。',
  ),

  /*
    제목에는 자릿수 구분을 넣지 않는다 — 여기 적히는 수는 글이 아니라 이름이다.
    검색창에 치는 것도 "1,024"가 아니라 "1024"다. 글 안의 수(약수의 합, 콜라츠
    최고값)는 반대로 그 언어의 방식대로 끊어 적는다.
  */
  metaTitle: T<(n: number) => string>(
    n => `숫자 ${n} — 소인수분해와 약수`,
    n => `The number ${n} — factors and divisors`,
    n => `El número ${n} — factores y divisores`,
    n => `O número ${n} — fatores e divisores`,
    n => `数字 ${n} — 素因数分解と約数`,
    n => `Die Zahl ${n} — Primfaktoren und Teiler`,
    n => `Le nombre ${n} — facteurs et diviseurs`,
    n => `संख्या ${n} — गुणनखंड और भाजक`,
    n => `数 ${n} — 质因数分解与因数`,
    n => `數 ${n} — 質因數分解與因數`,
  ),

  metaDesc: T<(f: NumberFacts) => string>(
    f => `${N('ko')(f.n)}의 소인수는 ${f.n === 1 ? '없고' : f.prime ? '자기 자신뿐이고' : `${factorText(f.factors)}이고`}, ${DIV.ko(f.divisors.length)}입니다. 2진수 ${f.bin}, 16진수 ${f.hex}${f.roman ? `, 로마 숫자 ${f.roman}` : ''}.`,
    f => `${N('en')(f.n)} factors into ${f.n === 1 ? 'nothing at all' : f.prime ? 'itself alone' : factorText(f.factors)} and has ${DIV.en(f.divisors.length)}. Binary ${f.bin}, hex ${f.hex}${f.roman ? `, Roman ${f.roman}` : ''}.`,
    f => `${N('es')(f.n)} se factoriza en ${f.n === 1 ? 'nada' : f.prime ? 'sí mismo' : factorText(f.factors)} y tiene ${DIV.es(f.divisors.length)}. Binario ${f.bin}, hex ${f.hex}${f.roman ? `, romano ${f.roman}` : ''}.`,
    f => `${N('pt-BR')(f.n)} fatora em ${f.n === 1 ? 'nada' : f.prime ? 'ele mesmo' : factorText(f.factors)} e tem ${DIV.pt(f.divisors.length)}. Binário ${f.bin}, hex ${f.hex}${f.roman ? `, romano ${f.roman}` : ''}.`,
    f => `${N('ja')(f.n)}の素因数は${f.n === 1 ? 'ありません' : f.prime ? '自分自身だけ' : factorText(f.factors)}で、${DIV.ja(f.divisors.length)}です。2進数 ${f.bin}、16進数 ${f.hex}${f.roman ? `、ローマ数字 ${f.roman}` : ''}。`,
    f => `${N('de')(f.n)} zerfällt in ${f.n === 1 ? 'nichts' : f.prime ? 'sich selbst' : factorText(f.factors)} und hat ${DIV.de(f.divisors.length)}. Binär ${f.bin}, hex ${f.hex}${f.roman ? `, römisch ${f.roman}` : ''}.`,
    f => `${N('fr')(f.n)} se factorise en ${f.n === 1 ? 'rien du tout' : f.prime ? 'lui-même' : factorText(f.factors)} et compte ${DIV.fr(f.divisors.length)}. Binaire ${f.bin}, hex ${f.hex}${f.roman ? `, romain ${f.roman}` : ''}.`,
    f => `${N('en')(f.n)} का गुणनखंड ${f.n === 1 ? 'कुछ नहीं' : f.prime ? 'स्वयं' : factorText(f.factors)} है और ${DIV.hi(f.divisors.length)} हैं। द्विआधारी ${f.bin}, हेक्स ${f.hex}${f.roman ? `, रोमन ${f.roman}` : ''}।`,
    f => `${N('zh')(f.n)} 分解为${f.n === 1 ? '空' : f.prime ? '它自己' : factorText(f.factors)}，共有 ${DIV.zh(f.divisors.length)}。二进制 ${f.bin}，十六进制 ${f.hex}${f.roman ? `，罗马数字 ${f.roman}` : ''}。`,
    f => `${N('zh-Hant')(f.n)} 分解為${f.n === 1 ? '空' : f.prime ? '它自己' : factorText(f.factors)}，共有 ${DIV.tw(f.divisors.length)}。二進位 ${f.bin}，十六進位 ${f.hex}${f.roman ? `，羅馬數字 ${f.roman}` : ''}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '소수는 몇 개인가요?', a: '200 이하의 소수는 46개입니다. 격자에서 진하게 칠해진 칸이 그것입니다.' },
      { q: '완전수는 무엇인가요?', a: '자기를 뺀 약수를 모두 더하면 자기 자신이 되는 수입니다. 200 이하에는 6과 28 둘뿐입니다.' },
      { q: '2의 거듭제곱을 따로 실은 이유는요?', a: '255·1024·65535는 수의 성질보다 한 바이트와 포트 번호의 끝을 찾는 사람이 많아서입니다.' },
      { q: '로마 숫자는 어디까지 나오나요?', a: '3999까지입니다. 그 위는 표기가 하나로 정해져 있지 않아 적지 않았습니다.' },
      { q: '자료는 어디서 가져왔나요?', a: '가져온 자료가 없습니다. 모든 값을 그 수에서 계산합니다.' },
    ],
    [
      { q: 'How many primes are there?', a: '46 primes at or below 200. They are the filled cells in the grid.' },
      { q: 'What is a perfect number?', a: 'One whose divisors, itself excluded, add back up to it. Below 200 there are only two: 6 and 28.' },
      { q: 'Why list powers of two separately?', a: 'Because people looking up 255, 1024 or 65535 usually want where a byte or a port number ends, not number theory.' },
      { q: 'How far do Roman numerals go?', a: 'To 3999. Above that there is no single agreed notation, so none is shown.' },
      { q: 'Where does the data come from?', a: 'There is no data. Every value on these pages is computed from the number.' },
    ],
    [
      { q: '¿Cuántos primos hay?', a: '46 primos hasta 200. Son las celdas marcadas de la cuadrícula.' },
      { q: '¿Qué es un número perfecto?', a: 'Aquel cuyos divisores, sin contarlo, suman el propio número. Hasta 200 solo hay dos: 6 y 28.' },
      { q: '¿Por qué van aparte las potencias de dos?', a: 'Porque quien busca 255, 1024 o 65535 suele querer dónde acaba un byte o un puerto, no teoría de números.' },
      { q: '¿Hasta dónde llegan los números romanos?', a: 'Hasta 3999. Por encima no hay una notación única acordada, así que no se muestra.' },
      { q: '¿De dónde salen los datos?', a: 'No hay datos. Todos los valores se calculan a partir del número.' },
    ],
    [
      { q: 'Quantos primos existem?', a: '46 primos até 200. São as células marcadas da grade.' },
      { q: 'O que é um número perfeito?', a: 'Aquele cujos divisores, sem contá-lo, somam o próprio número. Até 200 há apenas dois: 6 e 28.' },
      { q: 'Por que as potências de dois vêm à parte?', a: 'Porque quem procura 255, 1024 ou 65535 quer saber onde termina um byte ou uma porta, não teoria dos números.' },
      { q: 'Até onde vão os algarismos romanos?', a: 'Até 3999. Acima disso não há uma notação única, então nada é mostrado.' },
      { q: 'De onde vêm os dados?', a: 'Não há dados. Todos os valores são calculados a partir do número.' },
    ],
    [
      { q: '素数はいくつありますか？', a: '200以下の素数は46個です。格子で濃く塗られた升がそれです。' },
      { q: '完全数とは何ですか？', a: '自分を除く約数を足すと自分に戻る数です。200以下では6と28の二つだけです。' },
      { q: 'なぜ2の累乗を別に載せるのですか？', a: '255・1024・65535を調べる人は、数の性質より1バイトやポート番号の終わりを知りたいからです。' },
      { q: 'ローマ数字はどこまでですか？', a: '3999までです。その上は書き方が一つに決まっていないので載せていません。' },
      { q: 'データはどこから取りましたか？', a: '取ってきたデータはありません。すべての値をその数から計算しています。' },
    ],
    [
      { q: 'Wie viele Primzahlen gibt es?', a: '46 Primzahlen bis 200. Es sind die gefüllten Felder im Raster.' },
      { q: 'Was ist eine vollkommene Zahl?', a: 'Eine, deren Teiler ohne sie selbst wieder die Zahl ergeben. Unter 200 gibt es nur zwei: 6 und 28.' },
      { q: 'Warum stehen Zweierpotenzen extra?', a: 'Weil wer 255, 1024 oder 65535 nachschlägt meist wissen will, wo ein Byte oder eine Portnummer endet.' },
      { q: 'Wie weit gehen römische Zahlen?', a: 'Bis 3999. Darüber gibt es keine einheitliche Schreibweise, deshalb steht dort nichts.' },
      { q: 'Woher stammen die Daten?', a: 'Es gibt keine Daten. Jeder Wert wird aus der Zahl berechnet.' },
    ],
    [
      { q: 'Combien y a-t-il de nombres premiers ?', a: '46 nombres premiers jusqu’à 200. Ce sont les cases pleines de la grille.' },
      { q: 'Qu’est-ce qu’un nombre parfait ?', a: 'Celui dont les diviseurs, lui excepté, redonnent le nombre. Sous 200, il n’y en a que deux : 6 et 28.' },
      { q: 'Pourquoi les puissances de deux à part ?', a: 'Parce qu’on cherche 255, 1024 ou 65535 pour savoir où s’arrête un octet ou un port, pas pour l’arithmétique.' },
      { q: 'Jusqu’où vont les chiffres romains ?', a: 'Jusqu’à 3999. Au-delà, aucune notation ne fait consensus, donc rien n’est affiché.' },
      { q: 'D’où viennent les données ?', a: 'Il n’y a pas de données. Toutes les valeurs sont calculées à partir du nombre.' },
    ],
    [
      { q: 'कितनी अभाज्य संख्याएँ हैं?', a: '200 तक 46 अभाज्य संख्याएँ हैं। जाल में गहरे खाने वही हैं।' },
      { q: 'पूर्ण संख्या क्या है?', a: 'जिसके भाजक, स्वयं को छोड़कर, जोड़ने पर वही संख्या बनें। 200 तक केवल दो हैं: 6 और 28।' },
      { q: 'दो की घातें अलग क्यों दी हैं?', a: 'क्योंकि 255, 1024 या 65535 खोजने वाले प्रायः बाइट या पोर्ट की सीमा जानना चाहते हैं।' },
      { q: 'रोमन अंक कहाँ तक हैं?', a: '3999 तक। उससे ऊपर कोई एक तय लेखन नहीं है, इसलिए नहीं दिखाया गया।' },
      { q: 'डेटा कहाँ से आया?', a: 'कोई डेटा नहीं है। हर मान उसी संख्या से गिना जाता है।' },
    ],
    [
      { q: '质数一共有多少个？', a: '200 以内有 46 个质数，就是方格里的深色格。' },
      { q: '什么是完全数？', a: '除自己以外的因数加起来正好等于它自己。200 以内只有 6 和 28 两个。' },
      { q: '为什么把 2 的幂单独列出？', a: '因为查 255、1024、65535 的人多半想知道一个字节或端口号在哪里到头。' },
      { q: '罗马数字写到多少？', a: '到 3999。再往上没有统一写法，所以不显示。' },
      { q: '数据是从哪里来的？', a: '没有数据。每个值都由这个数算出来。' },
    ],
    [
      { q: '質數一共有多少個？', a: '200 以內有 46 個質數，就是方格裡的深色格。' },
      { q: '什麼是完全數？', a: '除自己以外的因數加起來正好等於它自己。200 以內只有 6 和 28 兩個。' },
      { q: '為什麼把 2 的冪單獨列出？', a: '因為查 255、1024、65535 的人多半想知道一個位元組或連接埠號在哪裡到頭。' },
      { q: '羅馬數字寫到多少？', a: '到 3999。再往上沒有統一寫法，所以不顯示。' },
      { q: '資料是從哪裡來的？', a: '沒有資料。每個值都由這個數算出來。' },
    ],
  ),

  numberFaq: T<(f: NumberFacts) => FaqItem[]>(
    f => [
      { q: `${N('ko')(f.n)}${ko(f.n, '은', '는')} 소수인가요?`, a: f.prime ? `네. 1과 자기 자신 말고는 나누는 수가 없습니다.` : `아니요. ${factorText(f.factors)}로 갈라집니다.` },
      { q: `${N('ko')(f.n)}의 약수는 무엇인가요?`, a: `${f.divisors.join(', ')} — 모두 ${DIV.ko(f.divisors.length)}이고 합은 ${N('ko')(f.divisorSum)}입니다.` },
      { q: `${N('ko')(f.n)}${ko(f.n, '을', '를')} 2진수로 어떻게 쓰나요?`, a: `${f.bin}입니다. ${f.bits}비트이고, 16진수로는 ${f.hex}입니다.` },
      { q: `${N('ko')(f.n)}의 콜라츠 걸음은 몇 번인가요?`, a: `${f.collatz.steps}번 만에 1에 닿고, 도중 최고값은 ${N('ko')(f.collatz.peak)}입니다.` },
    ],
    f => [
      { q: `Is ${N('en')(f.n)} a prime number?`, a: f.prime ? `Yes. Nothing divides it but 1 and itself.` : `No. It breaks down into ${factorText(f.factors)}.` },
      { q: `What are the divisors of ${N('en')(f.n)}?`, a: `${f.divisors.join(', ')} — ${DIV.en(f.divisors.length)} in all, adding up to ${N('en')(f.divisorSum)}.` },
      { q: `How is ${N('en')(f.n)} written in binary?`, a: `${f.bin}, which is ${f.bits} bits. In hexadecimal it is ${f.hex}.` },
      { q: `How many Collatz steps does ${N('en')(f.n)} take?`, a: `It reaches 1 in ${f.collatz.steps}, peaking at ${N('en')(f.collatz.peak)} on the way.` },
    ],
    f => [
      { q: `¿${N('es')(f.n)} es primo?`, a: f.prime ? `Sí. Solo lo dividen 1 y él mismo.` : `No. Se descompone en ${factorText(f.factors)}.` },
      { q: `¿Cuáles son los divisores de ${N('es')(f.n)}?`, a: `${f.divisors.join(', ')} — ${DIV.es(f.divisors.length)} en total, que suman ${N('es')(f.divisorSum)}.` },
      { q: `¿Cómo se escribe ${N('es')(f.n)} en binario?`, a: `${f.bin}, es decir ${f.bits} bits. En hexadecimal es ${f.hex}.` },
      { q: `¿Cuántos pasos de Collatz tiene ${N('es')(f.n)}?`, a: `Llega a 1 en ${f.collatz.steps} y por el camino alcanza ${N('es')(f.collatz.peak)}.` },
    ],
    f => [
      { q: `${N('pt-BR')(f.n)} é primo?`, a: f.prime ? `Sim. Só 1 e ele mesmo o dividem.` : `Não. Ele se decompõe em ${factorText(f.factors)}.` },
      { q: `Quais são os divisores de ${N('pt-BR')(f.n)}?`, a: `${f.divisors.join(', ')} — ${DIV.pt(f.divisors.length)} ao todo, somando ${N('pt-BR')(f.divisorSum)}.` },
      { q: `Como se escreve ${N('pt-BR')(f.n)} em binário?`, a: `${f.bin}, ou seja ${f.bits} bits. Em hexadecimal é ${f.hex}.` },
      { q: `Quantos passos de Collatz ${N('pt-BR')(f.n)} leva?`, a: `Chega a 1 em ${f.collatz.steps}, com máximo de ${N('pt-BR')(f.collatz.peak)} no caminho.` },
    ],
    f => [
      { q: `${N('ja')(f.n)}は素数ですか？`, a: f.prime ? `はい。1と自分自身のほかに割り切る数がありません。` : `いいえ。${factorText(f.factors)}に分かれます。` },
      { q: `${N('ja')(f.n)}の約数は何ですか？`, a: `${f.divisors.join('、')} — 全部で${DIV.ja(f.divisors.length)}、合計は${N('ja')(f.divisorSum)}です。` },
      { q: `${N('ja')(f.n)}を2進数でどう書きますか？`, a: `${f.bin}で、${f.bits}ビットです。16進数では${f.hex}です。` },
      { q: `${N('ja')(f.n)}のコラッツの歩数は？`, a: `${f.collatz.steps}歩で1に着きます。途中の最高値は${N('ja')(f.collatz.peak)}です。` },
    ],
    f => [
      { q: `Ist ${N('de')(f.n)} eine Primzahl?`, a: f.prime ? `Ja. Außer 1 und sich selbst teilt sie nichts.` : `Nein. Sie zerfällt in ${factorText(f.factors)}.` },
      { q: `Welche Teiler hat ${N('de')(f.n)}?`, a: `${f.divisors.join(', ')} — insgesamt ${DIV.de(f.divisors.length)}, zusammen ${N('de')(f.divisorSum)}.` },
      { q: `Wie schreibt man ${N('de')(f.n)} binär?`, a: `${f.bin}, also ${f.bits} Bit. Hexadezimal ist es ${f.hex}.` },
      { q: `Wie viele Collatz-Schritte braucht ${N('de')(f.n)}?`, a: `Nach ${f.collatz.steps} Schritten ist die 1 erreicht, unterwegs mit Höchstwert ${N('de')(f.collatz.peak)}.` },
    ],
    f => [
      { q: `${N('fr')(f.n)} est-il premier ?`, a: f.prime ? `Oui. Rien ne le divise à part 1 et lui-même.` : `Non. Il se décompose en ${factorText(f.factors)}.` },
      { q: `Quels sont les diviseurs de ${N('fr')(f.n)} ?`, a: `${f.divisors.join(', ')} — ${DIV.fr(f.divisors.length)} en tout, dont la somme fait ${N('fr')(f.divisorSum)}.` },
      { q: `Comment écrit-on ${N('fr')(f.n)} en binaire ?`, a: `${f.bin}, soit ${f.bits} bits. En hexadécimal, ${f.hex}.` },
      { q: `Combien d’étapes de Collatz pour ${N('fr')(f.n)} ?`, a: `Il atteint 1 en ${f.collatz.steps}, avec un maximum de ${N('fr')(f.collatz.peak)} en chemin.` },
    ],
    f => [
      { q: `क्या ${N('en')(f.n)} अभाज्य है?`, a: f.prime ? `हाँ। 1 और स्वयं के अलावा कोई इसे नहीं बाँटता।` : `नहीं। यह ${factorText(f.factors)} में टूटती है।` },
      { q: `${N('en')(f.n)} के भाजक क्या हैं?`, a: `${f.divisors.join(', ')} — कुल ${DIV.hi(f.divisors.length)}, जिनका योग ${N('en')(f.divisorSum)} है।` },
      { q: `${N('en')(f.n)} को द्विआधारी में कैसे लिखें?`, a: `${f.bin}, यानी ${f.bits} बिट। हेक्स में ${f.hex}।` },
      { q: `${N('en')(f.n)} के कोलैट्ज़ चरण कितने हैं?`, a: `${f.collatz.steps} चरणों में 1 पर पहुँचती है, रास्ते में शिखर ${N('en')(f.collatz.peak)}।` },
    ],
    f => [
      { q: `${N('zh')(f.n)} 是质数吗？`, a: f.prime ? `是。除了 1 和它自己，没有数能整除它。` : `不是。它可以分解成 ${factorText(f.factors)}。` },
      { q: `${N('zh')(f.n)} 的因数有哪些？`, a: `${f.divisors.join('、')} — 共 ${DIV.zh(f.divisors.length)}，加起来是 ${N('zh')(f.divisorSum)}。` },
      { q: `${N('zh')(f.n)} 的二进制怎么写？`, a: `${f.bin}，共 ${f.bits} 位。十六进制是 ${f.hex}。` },
      { q: `${N('zh')(f.n)} 的考拉兹步数是多少？`, a: `走 ${f.collatz.steps} 步到 1，途中最高到 ${N('zh')(f.collatz.peak)}。` },
    ],
    f => [
      { q: `${N('zh-Hant')(f.n)} 是質數嗎？`, a: f.prime ? `是。除了 1 和它自己，沒有數能整除它。` : `不是。它可以分解成 ${factorText(f.factors)}。` },
      { q: `${N('zh-Hant')(f.n)} 的因數有哪些？`, a: `${f.divisors.join('、')} — 共 ${DIV.tw(f.divisors.length)}，加起來是 ${N('zh-Hant')(f.divisorSum)}。` },
      { q: `${N('zh-Hant')(f.n)} 的二進位怎麼寫？`, a: `${f.bin}，共 ${f.bits} 位。十六進位是 ${f.hex}。` },
      { q: `${N('zh-Hant')(f.n)} 的考拉茲步數是多少？`, a: `走 ${f.collatz.steps} 步到 1，途中最高到 ${N('zh-Hant')(f.collatz.peak)}。` },
    ],
  ),

  fmt: T(N('ko'), N('en'), N('es'), N('pt-BR'), N('ja'), N('de'), N('fr'), N('en'), N('zh'), N('zh-Hant')),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const NUMBER_UI: L<NumberUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<NumberUI>;
