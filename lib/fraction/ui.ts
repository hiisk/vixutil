/**
 * 분수 사전 화면의 문구 — 열 언어.
 *
 * 숫자는 전부 계산에서 오고, 여기에는 틀만 있다. 다만 한 가지는 언어마다
 * 다르다 — **소수점 기호**. 0.375는 독일어·프랑스어·스페인어에서 0,375다.
 * 그런데 이 섹션의 소수는 부동소수점이 아니라 손으로 세운 나눗셈의 결과라
 * `toLocaleString`을 태울 수 없다(0.(3)은 수가 아니라 표기다). 그래서 점만
 * 갈아 끼운다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { Decimal, FractionFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface FractionUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  /** 0.375 → 0,375. 순환 표기까지 함께 옮긴다 */
  dec: (d: Decimal) => string;
  decimalLabel: string;
  percentLabel: string;
  ratioLabel: string;
  degreesLabel: string;
  minutesLabel: string;
  placesLabel: string;
  periodLabel: string;
  reciprocalLabel: string;
  equivalentLabel: string;
  terminatingLabel: string;
  repeatingLabel: string;
  periodNote: string;
  barTitle: string;
  barNote: string;
  denominatorTitle: string;
  denominatorNote: string;
  sameDenomTitle: string;
  nearbyTitle: string;
  noneLabel: string;
  desc: (f: FractionFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: FractionFacts) => string;
  metaDesc: (f: FractionFacts) => string;
  hubFaq: FaqItem[];
  fractionFaq: (f: FractionFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/**
 * 소수점 기호만 갈아 끼운다.
 *
 * 0.(3)의 괄호는 어느 언어에서나 같은 뜻으로 쓰이므로 그대로 둔다. 반면 점을
 * 안 바꾸면 독일어 화면에서 0.375가 "삼백칠십오"로 읽힌다 — 자릿수 구분 기호로
 * 보이기 때문이다.
 */
const dec = (mark: string) => (d: Decimal): string => d.text.replace('.', mark);

const DEC: L<(d: Decimal) => string> = {
  ko: dec('.'), en: dec('.'), es: dec(','), pt: dec(','), ja: dec('.'),
  de: dec(','), fr: dec(','), hi: dec('.'), zh: dec('.'), tw: dec('.'),
};

/** 대분수 — 1 2/5. 나머지가 없으면 정수만 적는다 */
const mixed = (r: FractionFacts['reciprocal']): string =>
  (r.rest === 0 ? String(r.whole) : `${r.whole} ${r.rest}/${r.d}`);

/**
 * 한국어 조사 — 분수를 읽은 소리가 정한다.
 *
 * 3/8은 "팔분의 삼"이라 끝이 분자다. 그래서 받침 여부는 분자의 끝자리로
 * 정해진다 — 2·4·5·9면 모음으로 끝나고 나머지는 받침이 있다.
 * ([[lib/number/ui.ts]]·[[lib/chmod/ui.ts]]와 같은 규칙)
 */
const KO_OPEN = new Set([2, 4, 5, 9]);
const ko = (n: number, withFinal: string, withoutFinal: string): string =>
  (KO_OPEN.has(n % 10) ? withoutFinal : withFinal);

type Spec = { [K in keyof FractionUI]: L<FractionUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('분수', 'Fractions', 'Fracciones', 'Frações', '分数', 'Brüche', 'Fractions', 'भिन्न', '分数', '分數'),

  dec: DEC,

  hubTitle: T(
    '분수 127가지와 소수',
    '127 fractions and their decimals',
    '127 fracciones y sus decimales',
    '127 frações e seus decimais',
    '分数127種と小数',
    '127 Brüche und ihre Dezimalzahlen',
    '127 fractions et leurs décimales',
    '127 भिन्न और उनके दशमलव',
    '127 个分数与它们的小数',
    '127 個分數與它們的小數',
  ),

  hubLead: T(
    '분모 20까지의 기약분수 전부. 소수는 나눗셈을 자리마다 세워 구하므로 0.1(6)처럼 순환마디까지 정확합니다.',
    'Every reduced fraction with a denominator up to 20. The decimals come from long division, so repeating parts are exact — 0.1(6), not 0.1666…',
    'Todas las fracciones irreducibles con denominador hasta 20. Los decimales salen de la división larga, así que el periodo es exacto: 0,1(6), no 0,1666…',
    'Todas as frações irredutíveis com denominador até 20. Os decimais vêm da divisão longa, então o período é exato: 0,1(6), não 0,1666…',
    '分母20までの既約分数すべて。小数は筆算のように桁ごとに求めるので、0.1(6)のように循環節まで正確です。',
    'Alle vollständig gekürzten Brüche mit Nenner bis 20. Die Dezimalzahlen entstehen durch schriftliche Division — die Periode ist exakt: 0,1(6), nicht 0,1666…',
    'Toutes les fractions irréductibles de dénominateur jusqu’à 20. Les décimales viennent de la division posée : la période est exacte — 0,1(6), pas 0,1666…',
    '20 तक के हर के साथ सभी सरलतम भिन्न। दशमलव लंबी भाग विधि से निकाले गए हैं, इसलिए आवर्त भी सटीक है — 0.1(6), 0.1666… नहीं।',
    '分母不超过 20 的全部最简分数。小数是按竖式一位一位除出来的，所以循环节是精确的——0.1(6)，不是 0.1666…',
    '分母不超過 20 的全部最簡分數。小數是按直式一位一位除出來的，所以循環節是精確的——0.1(6)，不是 0.1666…',
  ),

  decimalLabel: T('소수', 'Decimal', 'Decimal', 'Decimal', '小数', 'Dezimal', 'Décimal', 'दशमलव', '小数', '小數'),
  percentLabel: T('퍼센트', 'Percent', 'Porcentaje', 'Porcentagem', 'パーセント', 'Prozent', 'Pourcentage', 'प्रतिशत', '百分比', '百分比'),
  ratioLabel: T('비', 'Ratio', 'Razón', 'Razão', '比', 'Verhältnis', 'Rapport', 'अनुपात', '比', '比'),
  degreesLabel: T('원의 몇 도', 'Degrees of a circle', 'Grados de un círculo', 'Graus de um círculo', '円の何度', 'Grad im Kreis', 'Degrés d’un cercle', 'वृत्त के कितने अंश', '圆的多少度', '圓的多少度'),
  minutesLabel: T('한 시간 중 몇 분', 'Minutes of an hour', 'Minutos de una hora', 'Minutos de uma hora', '1時間のうち何分', 'Minuten einer Stunde', 'Minutes d’une heure', 'एक घंटे के कितने मिनट', '一小时里的多少分钟', '一小時裡的多少分鐘'),
  placesLabel: T('소수 자리 수', 'Decimal places', 'Cifras decimales', 'Casas decimais', '小数の桁数', 'Nachkommastellen', 'Décimales', 'दशमलव स्थान', '小数位数', '小數位數'),
  periodLabel: T('순환마디', 'Repeating part', 'Periodo', 'Período', '循環節', 'Periode', 'Période', 'आवर्त', '循环节', '循環節'),
  reciprocalLabel: T('역수', 'Reciprocal', 'Inverso', 'Inverso', '逆数', 'Kehrwert', 'Inverse', 'व्युत्क्रम', '倒数', '倒數'),
  equivalentLabel: T('같은 값의 분수', 'Equivalent fractions', 'Fracciones equivalentes', 'Frações equivalentes', '同じ値の分数', 'Gleichwertige Brüche', 'Fractions équivalentes', 'तुल्य भिन्न', '等值分数', '等值分數'),
  terminatingLabel: T('딱 떨어지는 소수', 'Terminating', 'Exacto', 'Exato', '有限小数', 'Endlich', 'Décimal exact', 'सांत', '有限小数', '有限小數'),
  repeatingLabel: T('순환소수', 'Repeating', 'Periódico', 'Periódico', '循環小数', 'Periodisch', 'Périodique', 'आवर्ती', '循环小数', '循環小數'),

  periodNote: T(
    '괄호 안의 자리가 끝없이 되풀이됩니다. 0.1(6)은 0.16666…이고, 0.(3)은 0.3333…입니다.',
    'The digits in brackets repeat for ever. 0.1(6) is 0.16666… and 0.(3) is 0.3333…',
    'Las cifras entre paréntesis se repiten sin fin. 0,1(6) es 0,16666… y 0,(3) es 0,3333…',
    'Os algarismos entre parênteses se repetem sem fim. 0,1(6) é 0,16666… e 0,(3) é 0,3333…',
    '括弧の中の桁が限りなく繰り返します。0.1(6)は0.16666…、0.(3)は0.3333…です。',
    'Die Ziffern in Klammern wiederholen sich endlos. 0,1(6) ist 0,16666… und 0,(3) ist 0,3333…',
    'Les chiffres entre parenthèses se répètent sans fin. 0,1(6) vaut 0,16666… et 0,(3) vaut 0,3333…',
    'कोष्ठक के अंक अनंत बार दोहराते हैं। 0.1(6) यानी 0.16666… और 0.(3) यानी 0.3333…',
    '括号里的数字会无限重复。0.1(6) 就是 0.16666…，0.(3) 就是 0.3333…',
    '括號裡的數字會無限重複。0.1(6) 就是 0.16666…，0.(3) 就是 0.3333…',
  ),

  barTitle: T('길이로 보기', 'Seen as a length', 'Visto como longitud', 'Visto como comprimento', '長さで見る', 'Als Länge gesehen', 'Vu comme une longueur', 'लंबाई के रूप में', '用长度看', '用長度看'),

  barNote: T(
    '전체를 분모만큼 나누고 분자만큼 칠했습니다. 옆의 눈금이 2분의 1 자리입니다.',
    'The whole is cut into as many parts as the denominator, and as many are filled as the numerator. The tick marks the halfway point.',
    'El total se corta en tantas partes como el denominador y se rellenan tantas como el numerador. La marca señala la mitad.',
    'O todo é cortado em tantas partes quanto o denominador, e preenchidas tantas quanto o numerador. A marca indica a metade.',
    '全体を分母の数だけ分け、分子の数だけ塗りました。目盛りは2分の1の位置です。',
    'Das Ganze wird in so viele Teile geschnitten, wie der Nenner sagt, und so viele gefüllt, wie der Zähler sagt. Die Marke zeigt die Hälfte.',
    'Le tout est découpé en autant de parts que le dénominateur, et autant sont remplies que le numérateur. Le repère marque la moitié.',
    'पूरे को हर के बराबर भागों में काटा और अंश जितने भाग भरे। निशान आधे की जगह बताता है।',
    '把整体按分母切分，按分子涂满。刻度标的是二分之一的位置。',
    '把整體按分母切分，按分子塗滿。刻度標的是二分之一的位置。',
  ),

  denominatorTitle: T('분모별로', 'By denominator', 'Por denominador', 'Por denominador', '分母ごとに', 'Nach Nenner', 'Par dénominateur', 'हर के अनुसार', '按分母', '按分母'),

  denominatorNote: T(
    '분모가 2와 5로만 이루어지면 소수가 딱 떨어지고, 3이나 7이 끼면 순환합니다. 10 = 2 × 5이기 때문입니다.',
    'A denominator made only of 2s and 5s gives a terminating decimal; bring in a 3 or a 7 and it repeats. That is because 10 = 2 × 5.',
    'Un denominador hecho solo de 2 y 5 da un decimal exacto; si entra un 3 o un 7, se vuelve periódico. Porque 10 = 2 × 5.',
    'Um denominador feito só de 2 e 5 dá decimal exato; se entrar um 3 ou um 7, ele passa a repetir. É porque 10 = 2 × 5.',
    '分母が2と5だけでできていれば小数は割り切れ、3や7が混じると循環します。10 = 2 × 5だからです。',
    'Ein Nenner nur aus 2en und 5en ergibt eine endliche Dezimalzahl; kommt eine 3 oder 7 dazu, wird sie periodisch. Denn 10 = 2 × 5.',
    'Un dénominateur fait seulement de 2 et de 5 donne un décimal exact ; ajoutez un 3 ou un 7 et il devient périodique. Car 10 = 2 × 5.',
    'जिस हर में केवल 2 और 5 हों, उसका दशमलव सांत होता है; 3 या 7 आते ही आवर्ती हो जाता है। क्योंकि 10 = 2 × 5।',
    '分母只由 2 和 5 组成时小数会除尽，掺进 3 或 7 就会循环。因为 10 = 2 × 5。',
    '分母只由 2 和 5 組成時小數會除盡，摻進 3 或 7 就會循環。因為 10 = 2 × 5。',
  ),

  sameDenomTitle: T('분모가 같은 분수', 'Same denominator', 'Mismo denominador', 'Mesmo denominador', '分母が同じ分数', 'Gleicher Nenner', 'Même dénominateur', 'वही हर', '同分母的分数', '同分母的分數'),
  nearbyTitle: T('값이 가까운 분수', 'Nearby values', 'Valores cercanos', 'Valores próximos', '値が近い分数', 'Werte daneben', 'Valeurs voisines', 'पास के मान', '数值相近的分数', '數值相近的分數'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  desc: T<(f: FractionFacts) => string>(
    f => `${f.n}/${f.d}${ko(f.n, '은', '는')} ${DEC.ko(f.decimal)}이고 ${DEC.ko(f.percent)}%입니다. ${f.decimal.terminating ? `소수점 아래 ${f.places}자리에서 끝납니다.` : `${f.periodLength}자리가 되풀이되는 순환소수입니다.`}`,
    f => `${f.n}/${f.d} is ${DEC.en(f.decimal)}, or ${DEC.en(f.percent)}%. ${f.decimal.terminating ? `It stops after ${f.places} decimal places.` : `It repeats with a period of ${f.periodLength} digits.`}`,
    f => `${f.n}/${f.d} es ${DEC.es(f.decimal)}, o sea ${DEC.es(f.percent)} %. ${f.decimal.terminating ? `Termina en ${f.places} cifras decimales.` : `Es periódico, con un periodo de ${f.periodLength} cifras.`}`,
    f => `${f.n}/${f.d} é ${DEC.pt(f.decimal)}, ou ${DEC.pt(f.percent)}%. ${f.decimal.terminating ? `Termina em ${f.places} casas decimais.` : `É periódico, com período de ${f.periodLength} algarismos.`}`,
    f => `${f.n}/${f.d}は${DEC.ja(f.decimal)}、${DEC.ja(f.percent)}%です。${f.decimal.terminating ? `小数点以下${f.places}桁で終わります。` : `${f.periodLength}桁が繰り返す循環小数です。`}`,
    f => `${f.n}/${f.d} ist ${DEC.de(f.decimal)}, also ${DEC.de(f.percent)} %. ${f.decimal.terminating ? `Er endet nach ${f.places} Nachkommastellen.` : `Er ist periodisch, mit einer Periode von ${f.periodLength} Ziffern.`}`,
    f => `${f.n}/${f.d} vaut ${DEC.fr(f.decimal)}, soit ${DEC.fr(f.percent)} %. ${f.decimal.terminating ? `Il s’arrête après ${f.places} décimales.` : `Il est périodique, avec une période de ${f.periodLength} chiffres.`}`,
    f => `${f.n}/${f.d} बराबर ${DEC.hi(f.decimal)} है, यानी ${DEC.hi(f.percent)}%। ${f.decimal.terminating ? `यह ${f.places} दशमलव स्थानों पर समाप्त होता है।` : `यह आवर्ती है, आवर्त ${f.periodLength} अंकों का।`}`,
    f => `${f.n}/${f.d} 等于 ${DEC.zh(f.decimal)}，也就是 ${DEC.zh(f.percent)}%。${f.decimal.terminating ? `它在小数点后 ${f.places} 位就除尽了。` : `它是循环小数，循环节 ${f.periodLength} 位。`}`,
    f => `${f.n}/${f.d} 等於 ${DEC.tw(f.decimal)}，也就是 ${DEC.tw(f.percent)}%。${f.decimal.terminating ? `它在小數點後 ${f.places} 位就除盡了。` : `它是循環小數，循環節 ${f.periodLength} 位。`}`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '괄호 안의 자리가 끝없이 되풀이됩니다 — 0.1(6)은 0.16666…입니다.',
      '분모에 2와 5 말고 다른 소인수가 없으면 소수가 딱 떨어집니다.',
      '같은 값의 분수는 주소를 따로 두지 않았습니다. 2/4를 찾으면 1/2로 옵니다.',
      '퍼센트는 100을 곱한 것이고, 각도는 360을 곱한 것입니다. 곱하는 수만 다릅니다.',
    ],
    [
      'The digits in brackets repeat for ever — 0.1(6) means 0.16666…',
      'If the denominator has no prime factors besides 2 and 5, the decimal stops.',
      'Equal fractions do not get separate pages: looking up 2/4 brings you to 1/2.',
      'A percentage is the same number times 100; degrees are the same number times 360.',
    ],
    [
      'Las cifras entre paréntesis se repiten sin fin: 0,1(6) es 0,16666…',
      'Si el denominador no tiene más factores primos que 2 y 5, el decimal termina.',
      'Las fracciones iguales no tienen página aparte: buscar 2/4 lleva a 1/2.',
      'El porcentaje es el mismo número por 100; los grados, el mismo número por 360.',
    ],
    [
      'Os algarismos entre parênteses se repetem sem fim: 0,1(6) é 0,16666…',
      'Se o denominador não tem outros fatores primos além de 2 e 5, o decimal termina.',
      'Frações iguais não ganham página própria: procurar 2/4 leva a 1/2.',
      'A porcentagem é o mesmo número vezes 100; os graus, o mesmo número vezes 360.',
    ],
    [
      '括弧の中の桁が限りなく繰り返します——0.1(6)は0.16666…です。',
      '分母に2と5以外の素因数がなければ小数は割り切れます。',
      '同じ値の分数に別の住所は与えていません。2/4を探すと1/2に着きます。',
      'パーセントは100倍、角度は360倍したものです。かける数が違うだけです。',
    ],
    [
      'Die Ziffern in Klammern wiederholen sich endlos — 0,1(6) heißt 0,16666…',
      'Hat der Nenner außer 2 und 5 keine Primfaktoren, endet die Dezimalzahl.',
      'Gleichwertige Brüche bekommen keine eigene Seite: 2/4 führt zu 1/2.',
      'Prozent ist dieselbe Zahl mal 100, Grad dieselbe Zahl mal 360.',
    ],
    [
      'Les chiffres entre parenthèses se répètent sans fin — 0,1(6) vaut 0,16666…',
      'Si le dénominateur n’a pas d’autre facteur premier que 2 et 5, la décimale s’arrête.',
      'Les fractions égales n’ont pas de page à part : chercher 2/4 mène à 1/2.',
      'Le pourcentage, c’est le même nombre fois 100 ; les degrés, fois 360.',
    ],
    [
      'कोष्ठक के अंक अनंत बार दोहराते हैं — 0.1(6) यानी 0.16666…',
      'यदि हर में 2 और 5 के अलावा कोई अभाज्य गुणनखंड न हो तो दशमलव समाप्त हो जाता है।',
      'तुल्य भिन्नों के अलग पृष्ठ नहीं हैं: 2/4 खोजने पर 1/2 पर पहुँचेंगे।',
      'प्रतिशत वही संख्या गुणा 100 है; अंश वही संख्या गुणा 360।',
    ],
    [
      '括号里的数字无限重复——0.1(6) 就是 0.16666…',
      '分母除了 2 和 5 没有别的质因数时，小数就会除尽。',
      '等值分数不另设地址：查 2/4 会到 1/2。',
      '百分比是同一个数乘 100，度数是同一个数乘 360，只是乘数不同。',
    ],
    [
      '括號裡的數字無限重複——0.1(6) 就是 0.16666…',
      '分母除了 2 和 5 沒有別的質因數時，小數就會除盡。',
      '等值分數不另設地址：查 2/4 會到 1/2。',
      '百分比是同一個數乘 100，度數是同一個數乘 360，只是乘數不同。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '분수를 소수로 — 분모 20까지 127가지',
    'Fraction to decimal — all 127 up to a denominator of 20',
    'De fracción a decimal — las 127 hasta denominador 20',
    'De fração para decimal — as 127 até denominador 20',
    '分数を小数に — 分母20までの127種',
    'Bruch in Dezimalzahl — alle 127 bis Nenner 20',
    'Fraction en décimal — les 127 jusqu’au dénominateur 20',
    'भिन्न से दशमलव — हर 20 तक सभी 127',
    '分数化小数 — 分母 20 以内的 127 种',
    '分數化小數 — 分母 20 以內的 127 種',
  ),

  hubMetaDesc: T(
    '1/2·3/8·5/7처럼 분모 20까지의 기약분수 127가지를 한 장씩. 소수와 퍼센트, 순환마디, 같은 값의 분수까지 계산했습니다.',
    'Each of the 127 reduced fractions up to a denominator of 20 — 1/2, 3/8, 5/7 — with its decimal, percentage, repeating part and equivalents.',
    'Cada una de las 127 fracciones irreducibles hasta denominador 20 — 1/2, 3/8, 5/7 — con su decimal, porcentaje, periodo y equivalentes.',
    'Cada uma das 127 frações irredutíveis até denominador 20 — 1/2, 3/8, 5/7 — com decimal, porcentagem, período e equivalentes.',
    '1/2・3/8・5/7など分母20までの既約分数127種を1ページずつ。小数とパーセント、循環節、同じ値の分数まで計算しました。',
    'Jeder der 127 gekürzten Brüche bis Nenner 20 — 1/2, 3/8, 5/7 — mit Dezimalzahl, Prozent, Periode und gleichwertigen Brüchen.',
    'Chacune des 127 fractions irréductibles jusqu’au dénominateur 20 — 1/2, 3/8, 5/7 — avec décimal, pourcentage, période et équivalents.',
    '20 तक के हर वाली 127 सरलतम भिन्नों में से हर एक — 1/2, 3/8, 5/7 — दशमलव, प्रतिशत, आवर्त और तुल्य भिन्नों के साथ।',
    '分母 20 以内的 127 个最简分数各一页——1/2、3/8、5/7——含小数、百分比、循环节和等值分数。',
    '分母 20 以內的 127 個最簡分數各一頁——1/2、3/8、5/7——含小數、百分比、循環節和等值分數。',
  ),

  metaTitle: T<(f: FractionFacts) => string>(
    f => `${f.n}/${f.d}${ko(f.n, '은', '는')} 소수로 ${DEC.ko(f.decimal)}`,
    f => `${f.n}/${f.d} as a decimal is ${DEC.en(f.decimal)}`,
    f => `${f.n}/${f.d} en decimal es ${DEC.es(f.decimal)}`,
    f => `${f.n}/${f.d} em decimal é ${DEC.pt(f.decimal)}`,
    f => `${f.n}/${f.d} を小数にすると ${DEC.ja(f.decimal)}`,
    f => `${f.n}/${f.d} als Dezimalzahl ist ${DEC.de(f.decimal)}`,
    f => `${f.n}/${f.d} en décimal vaut ${DEC.fr(f.decimal)}`,
    f => `${f.n}/${f.d} दशमलव में ${DEC.hi(f.decimal)}`,
    f => `${f.n}/${f.d} 化成小数是 ${DEC.zh(f.decimal)}`,
    f => `${f.n}/${f.d} 化成小數是 ${DEC.tw(f.decimal)}`,
  ),

  metaDesc: T<(f: FractionFacts) => string>(
    f => `${f.n}/${f.d}${ko(f.n, '을', '를')} 소수로 고치면 ${DEC.ko(f.decimal)}, 퍼센트로는 ${DEC.ko(f.percent)}%입니다. 역수는 ${mixed(f.reciprocal)}, 원의 ${DEC.ko(f.degrees)}도에 해당합니다.`,
    f => `${f.n}/${f.d} written as a decimal is ${DEC.en(f.decimal)}, or ${DEC.en(f.percent)}% as a percentage. Its reciprocal is ${mixed(f.reciprocal)} and it covers ${DEC.en(f.degrees)}° of a circle.`,
    f => `${f.n}/${f.d} en decimal es ${DEC.es(f.decimal)}, o ${DEC.es(f.percent)} % en porcentaje. Su inverso es ${mixed(f.reciprocal)} y abarca ${DEC.es(f.degrees)}° de un círculo.`,
    f => `${f.n}/${f.d} em decimal é ${DEC.pt(f.decimal)}, ou ${DEC.pt(f.percent)}% em porcentagem. Seu inverso é ${mixed(f.reciprocal)} e cobre ${DEC.pt(f.degrees)}° de um círculo.`,
    f => `${f.n}/${f.d}を小数にすると${DEC.ja(f.decimal)}、パーセントでは${DEC.ja(f.percent)}%です。逆数は${mixed(f.reciprocal)}、円の${DEC.ja(f.degrees)}度にあたります。`,
    f => `${f.n}/${f.d} ergibt als Dezimalzahl ${DEC.de(f.decimal)}, in Prozent ${DEC.de(f.percent)} %. Der Kehrwert ist ${mixed(f.reciprocal)}, im Kreis sind es ${DEC.de(f.degrees)}°.`,
    f => `${f.n}/${f.d} s’écrit ${DEC.fr(f.decimal)} en décimal, soit ${DEC.fr(f.percent)} %. Son inverse est ${mixed(f.reciprocal)} et il couvre ${DEC.fr(f.degrees)}° d’un cercle.`,
    f => `${f.n}/${f.d} दशमलव में ${DEC.hi(f.decimal)} है, प्रतिशत में ${DEC.hi(f.percent)}%। इसका व्युत्क्रम ${mixed(f.reciprocal)} है और यह वृत्त के ${DEC.hi(f.degrees)}° के बराबर है।`,
    f => `${f.n}/${f.d} 化成小数是 ${DEC.zh(f.decimal)}，百分比是 ${DEC.zh(f.percent)}%。它的倒数是 ${mixed(f.reciprocal)}，相当于圆的 ${DEC.zh(f.degrees)} 度。`,
    f => `${f.n}/${f.d} 化成小數是 ${DEC.tw(f.decimal)}，百分比是 ${DEC.tw(f.percent)}%。它的倒數是 ${mixed(f.reciprocal)}，相當於圓的 ${DEC.tw(f.degrees)} 度。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '0.375는 몇 분의 몇인가요?', a: '8분의 3입니다. 소수가 딱 떨어지는 분수는 분모가 2와 5로만 이루어진 것들이라, 0.375처럼 세 자리에서 끝나면 분모가 8입니다.' },
      { q: '왜 2/4는 없나요?', a: '1/2과 같은 수이기 때문입니다. 같은 값에 주소를 둘 두면 한 답을 두 페이지가 나눠 갖게 됩니다.' },
      { q: '0.(3) 표기는 무슨 뜻인가요?', a: '괄호 안이 끝없이 되풀이된다는 뜻입니다. 0.(3)은 0.3333…, 0.1(6)은 0.16666…입니다.' },
      { q: '어떤 분수가 순환소수가 되나요?', a: '분모에 2와 5 말고 다른 소인수가 있으면 순환합니다. 10 = 2 × 5라서 그렇습니다.' },
      { q: '분모 20까지만 있는 이유는요?', a: '소수를 손에 들고 찾아오는 분수는 대개 그 안에 듭니다. 2의 거듭제곱(2·4·8·16)과 5·10·20, 그리고 3·6·7·9·12가 모두 스무 개 안에 있습니다.' },
    ],
    [
      { q: 'What is 0.375 as a fraction?', a: 'Three eighths. Decimals that stop come from denominators built only of 2s and 5s, so a three-place decimal like 0.375 sits over 8.' },
      { q: 'Why is there no 2/4?', a: 'Because it is the same number as 1/2. Two addresses for one value would split a single answer across two pages.' },
      { q: 'What does the 0.(3) notation mean?', a: 'Whatever is inside the brackets repeats for ever. 0.(3) is 0.3333… and 0.1(6) is 0.16666…' },
      { q: 'Which fractions give repeating decimals?', a: 'Any whose denominator has a prime factor other than 2 or 5 — because 10 = 2 × 5.' },
      { q: 'Why stop at a denominator of 20?', a: 'Because the fractions people arrive with fall inside it: the powers of two (2, 4, 8, 16), 5, 10 and 20, and the everyday 3, 6, 7, 9 and 12.' },
    ],
    [
      { q: '¿Cuánto es 0,375 en fracción?', a: 'Tres octavos. Los decimales exactos vienen de denominadores hechos solo de 2 y 5, así que un decimal de tres cifras como 0,375 va sobre 8.' },
      { q: '¿Por qué no está 2/4?', a: 'Porque es el mismo número que 1/2. Dos direcciones para un valor repartirían una sola respuesta en dos páginas.' },
      { q: '¿Qué significa la notación 0,(3)?', a: 'Que lo que está entre paréntesis se repite sin fin. 0,(3) es 0,3333… y 0,1(6) es 0,16666…' },
      { q: '¿Qué fracciones dan decimales periódicos?', a: 'Aquellas cuyo denominador tiene algún factor primo distinto de 2 y 5, porque 10 = 2 × 5.' },
      { q: '¿Por qué parar en denominador 20?', a: 'Porque las fracciones con las que llega la gente caben ahí: las potencias de dos (2, 4, 8, 16), el 5, 10 y 20, y los cotidianos 3, 6, 7, 9 y 12.' },
    ],
    [
      { q: 'Quanto é 0,375 em fração?', a: 'Três oitavos. Decimais exatos vêm de denominadores feitos só de 2 e 5, então um decimal de três casas como 0,375 fica sobre 8.' },
      { q: 'Por que não existe 2/4?', a: 'Porque é o mesmo número que 1/2. Dois endereços para um valor dividiriam uma única resposta em duas páginas.' },
      { q: 'O que significa a notação 0,(3)?', a: 'Que o que está entre parênteses se repete sem fim. 0,(3) é 0,3333… e 0,1(6) é 0,16666…' },
      { q: 'Quais frações dão decimais periódicos?', a: 'Aquelas cujo denominador tem algum fator primo além de 2 e 5, porque 10 = 2 × 5.' },
      { q: 'Por que parar no denominador 20?', a: 'Porque as frações com que as pessoas chegam cabem aí: as potências de dois (2, 4, 8, 16), o 5, 10 e 20, e os corriqueiros 3, 6, 7, 9 e 12.' },
    ],
    [
      { q: '0.375は何分の何ですか？', a: '8分の3です。割り切れる小数は分母が2と5だけでできた分数から出るので、0.375のように3桁で終われば分母は8です。' },
      { q: 'なぜ2/4がないのですか？', a: '1/2と同じ数だからです。同じ値に住所を二つ与えると、一つの答えを二つのページが分け合ってしまいます。' },
      { q: '0.(3)という書き方は何ですか？', a: '括弧の中が限りなく繰り返すという意味です。0.(3)は0.3333…、0.1(6)は0.16666…です。' },
      { q: 'どんな分数が循環小数になりますか？', a: '分母に2と5以外の素因数があると循環します。10 = 2 × 5だからです。' },
      { q: '分母20までにした理由は？', a: '小数を手に持って探しに来る分数はたいていその中に入るからです。2の累乗(2・4・8・16)と5・10・20、それに3・6・7・9・12が全部20以内にあります。' },
    ],
    [
      { q: 'Was ist 0,375 als Bruch?', a: 'Drei Achtel. Endliche Dezimalzahlen stammen von Nennern aus lauter 2en und 5en, deshalb steht eine dreistellige wie 0,375 über 8.' },
      { q: 'Warum gibt es kein 2/4?', a: 'Weil es dieselbe Zahl wie 1/2 ist. Zwei Adressen für einen Wert würden eine Antwort auf zwei Seiten aufteilen.' },
      { q: 'Was bedeutet die Schreibweise 0,(3)?', a: 'Dass sich der Inhalt der Klammer endlos wiederholt. 0,(3) ist 0,3333… und 0,1(6) ist 0,16666…' },
      { q: 'Welche Brüche ergeben periodische Dezimalzahlen?', a: 'Alle, deren Nenner einen anderen Primfaktor als 2 oder 5 hat — denn 10 = 2 × 5.' },
      { q: 'Warum nur bis Nenner 20?', a: 'Weil die Brüche, mit denen Leute kommen, dort hineinpassen: die Zweierpotenzen (2, 4, 8, 16), 5, 10 und 20 sowie die alltäglichen 3, 6, 7, 9 und 12.' },
    ],
    [
      { q: 'Combien fait 0,375 en fraction ?', a: 'Trois huitièmes. Les décimaux exacts viennent de dénominateurs faits seulement de 2 et de 5 : un décimal à trois chiffres comme 0,375 se met sur 8.' },
      { q: 'Pourquoi 2/4 n’y est-il pas ?', a: 'Parce que c’est le même nombre que 1/2. Deux adresses pour une valeur partageraient une seule réponse entre deux pages.' },
      { q: 'Que signifie la notation 0,(3) ?', a: 'Que le contenu des parenthèses se répète sans fin. 0,(3) vaut 0,3333… et 0,1(6) vaut 0,16666…' },
      { q: 'Quelles fractions donnent des décimaux périodiques ?', a: 'Celles dont le dénominateur a un facteur premier autre que 2 ou 5 — puisque 10 = 2 × 5.' },
      { q: 'Pourquoi s’arrêter au dénominateur 20 ?', a: 'Parce que les fractions qu’on cherche y tiennent : les puissances de deux (2, 4, 8, 16), 5, 10 et 20, et les usuels 3, 6, 7, 9 et 12.' },
    ],
    [
      { q: '0.375 भिन्न में कितना है?', a: 'तीन बटा आठ। सांत दशमलव उन्हीं हरों से आते हैं जो केवल 2 और 5 से बने हों, इसलिए 0.375 जैसा तीन अंकों वाला दशमलव 8 पर बैठता है।' },
      { q: '2/4 क्यों नहीं है?', a: 'क्योंकि वह 1/2 के बराबर ही संख्या है। एक मान के दो पते होने पर एक उत्तर दो पृष्ठों में बँट जाता।' },
      { q: '0.(3) लेखन का क्या अर्थ है?', a: 'कोष्ठक के भीतर का भाग अनंत बार दोहराता है। 0.(3) यानी 0.3333… और 0.1(6) यानी 0.16666…' },
      { q: 'कौन-सी भिन्नें आवर्ती दशमलव देती हैं?', a: 'जिनके हर में 2 या 5 के अलावा कोई अभाज्य गुणनखंड हो — क्योंकि 10 = 2 × 5।' },
      { q: 'हर 20 तक ही क्यों?', a: 'क्योंकि लोग जिन भिन्नों के साथ आते हैं वे इसी में आ जाती हैं: दो की घातें (2, 4, 8, 16), 5, 10 और 20, तथा रोज़मर्रा के 3, 6, 7, 9 और 12।' },
    ],
    [
      { q: '0.375 是几分之几？', a: '八分之三。能除尽的小数来自只由 2 和 5 组成的分母，所以像 0.375 这样三位就结束的小数，分母是 8。' },
      { q: '为什么没有 2/4？', a: '因为它和 1/2 是同一个数。同一个值给两个地址，一个答案就被两页分走了。' },
      { q: '0.(3) 这种写法是什么意思？', a: '括号里的部分无限重复。0.(3) 就是 0.3333…，0.1(6) 就是 0.16666…' },
      { q: '哪些分数会变成循环小数？', a: '分母里有 2 和 5 以外的质因数的那些——因为 10 = 2 × 5。' },
      { q: '为什么只到分母 20？', a: '因为人们拿着小数来找的分数基本都在这里面：2 的幂（2、4、8、16）、5、10、20，还有常用的 3、6、7、9、12。' },
    ],
    [
      { q: '0.375 是幾分之幾？', a: '八分之三。能除盡的小數來自只由 2 和 5 組成的分母，所以像 0.375 這樣三位就結束的小數，分母是 8。' },
      { q: '為什麼沒有 2/4？', a: '因為它和 1/2 是同一個數。同一個值給兩個地址，一個答案就被兩頁分走了。' },
      { q: '0.(3) 這種寫法是什麼意思？', a: '括號裡的部分無限重複。0.(3) 就是 0.3333…，0.1(6) 就是 0.16666…' },
      { q: '哪些分數會變成循環小數？', a: '分母裡有 2 和 5 以外的質因數的那些——因為 10 = 2 × 5。' },
      { q: '為什麼只到分母 20？', a: '因為人們拿著小數來找的分數基本都在這裡面：2 的冪（2、4、8、16）、5、10、20，還有常用的 3、6、7、9、12。' },
    ],
  ),

  fractionFaq: T<(f: FractionFacts) => FaqItem[]>(
    f => [
      { q: `${f.n}/${f.d}${ko(f.n, '은', '는')} 소수로 얼마인가요?`, a: `${DEC.ko(f.decimal)}입니다. ${f.decimal.terminating ? `소수점 아래 ${f.places}자리에서 끝납니다.` : `괄호 안의 ${f.periodLength}자리가 끝없이 되풀이됩니다.`}` },
      { q: `${f.n}/${f.d}${ko(f.n, '은', '는')} 몇 퍼센트인가요?`, a: `${DEC.ko(f.percent)}%입니다.` },
      { q: `${f.n}/${f.d}${ko(f.n, '과', '와')} 같은 분수가 있나요?`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join(', ')} … 분자와 분모에 같은 수를 곱하면 값이 그대로입니다.` },
      { q: `${f.n}/${f.d}의 역수는 무엇인가요?`, a: `${f.reciprocal.n}/${f.reciprocal.d}, 대분수로는 ${mixed(f.reciprocal)}입니다.` },
    ],
    f => [
      { q: `What is ${f.n}/${f.d} as a decimal?`, a: `${DEC.en(f.decimal)}. ${f.decimal.terminating ? `It stops after ${f.places} decimal places.` : `The ${f.periodLength} digits in brackets repeat for ever.`}` },
      { q: `What is ${f.n}/${f.d} as a percentage?`, a: `${DEC.en(f.percent)}%.` },
      { q: `Which fractions equal ${f.n}/${f.d}?`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join(', ')} … multiplying top and bottom by the same number leaves the value unchanged.` },
      { q: `What is the reciprocal of ${f.n}/${f.d}?`, a: `${f.reciprocal.n}/${f.reciprocal.d}, or ${mixed(f.reciprocal)} as a mixed number.` },
    ],
    f => [
      { q: `¿Cuánto es ${f.n}/${f.d} en decimal?`, a: `${DEC.es(f.decimal)}. ${f.decimal.terminating ? `Termina en ${f.places} cifras decimales.` : `Las ${f.periodLength} cifras entre paréntesis se repiten sin fin.`}` },
      { q: `¿Cuánto es ${f.n}/${f.d} en porcentaje?`, a: `${DEC.es(f.percent)} %.` },
      { q: `¿Qué fracciones equivalen a ${f.n}/${f.d}?`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join(', ')}… multiplicar arriba y abajo por el mismo número no cambia el valor.` },
      { q: `¿Cuál es el inverso de ${f.n}/${f.d}?`, a: `${f.reciprocal.n}/${f.reciprocal.d}, o ${mixed(f.reciprocal)} como número mixto.` },
    ],
    f => [
      { q: `Quanto é ${f.n}/${f.d} em decimal?`, a: `${DEC.pt(f.decimal)}. ${f.decimal.terminating ? `Termina em ${f.places} casas decimais.` : `Os ${f.periodLength} algarismos entre parênteses se repetem sem fim.`}` },
      { q: `Quanto é ${f.n}/${f.d} em porcentagem?`, a: `${DEC.pt(f.percent)}%.` },
      { q: `Que frações equivalem a ${f.n}/${f.d}?`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join(', ')}… multiplicar em cima e embaixo pelo mesmo número não muda o valor.` },
      { q: `Qual é o inverso de ${f.n}/${f.d}?`, a: `${f.reciprocal.n}/${f.reciprocal.d}, ou ${mixed(f.reciprocal)} como número misto.` },
    ],
    f => [
      { q: `${f.n}/${f.d}を小数にするといくつですか？`, a: `${DEC.ja(f.decimal)}です。${f.decimal.terminating ? `小数点以下${f.places}桁で終わります。` : `括弧の中の${f.periodLength}桁が限りなく繰り返します。`}` },
      { q: `${f.n}/${f.d}は何パーセントですか？`, a: `${DEC.ja(f.percent)}%です。` },
      { q: `${f.n}/${f.d}と同じ値の分数は？`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join('、')}… 分子と分母に同じ数をかけても値は変わりません。` },
      { q: `${f.n}/${f.d}の逆数は？`, a: `${f.reciprocal.n}/${f.reciprocal.d}、帯分数では${mixed(f.reciprocal)}です。` },
    ],
    f => [
      { q: `Was ist ${f.n}/${f.d} als Dezimalzahl?`, a: `${DEC.de(f.decimal)}. ${f.decimal.terminating ? `Sie endet nach ${f.places} Nachkommastellen.` : `Die ${f.periodLength} Ziffern in Klammern wiederholen sich endlos.`}` },
      { q: `Wie viel Prozent sind ${f.n}/${f.d}?`, a: `${DEC.de(f.percent)} %.` },
      { q: `Welche Brüche sind gleich ${f.n}/${f.d}?`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join(', ')} … Zähler und Nenner mit derselben Zahl multipliziert, bleibt der Wert gleich.` },
      { q: `Was ist der Kehrwert von ${f.n}/${f.d}?`, a: `${f.reciprocal.n}/${f.reciprocal.d}, als gemischte Zahl ${mixed(f.reciprocal)}.` },
    ],
    f => [
      { q: `Combien vaut ${f.n}/${f.d} en décimal ?`, a: `${DEC.fr(f.decimal)}. ${f.decimal.terminating ? `Il s’arrête après ${f.places} décimales.` : `Les ${f.periodLength} chiffres entre parenthèses se répètent sans fin.`}` },
      { q: `Combien fait ${f.n}/${f.d} en pourcentage ?`, a: `${DEC.fr(f.percent)} %.` },
      { q: `Quelles fractions égalent ${f.n}/${f.d} ?`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join(', ')}… multiplier haut et bas par le même nombre ne change pas la valeur.` },
      { q: `Quel est l’inverse de ${f.n}/${f.d} ?`, a: `${f.reciprocal.n}/${f.reciprocal.d}, soit ${mixed(f.reciprocal)} en nombre mixte.` },
    ],
    f => [
      { q: `${f.n}/${f.d} दशमलव में कितना है?`, a: `${DEC.hi(f.decimal)}। ${f.decimal.terminating ? `यह ${f.places} दशमलव स्थानों पर समाप्त होता है।` : `कोष्ठक के ${f.periodLength} अंक अनंत बार दोहराते हैं।`}` },
      { q: `${f.n}/${f.d} कितने प्रतिशत है?`, a: `${DEC.hi(f.percent)}%।` },
      { q: `${f.n}/${f.d} के तुल्य भिन्न कौन-सी हैं?`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join(', ')} … अंश और हर दोनों को एक ही संख्या से गुणा करने पर मान नहीं बदलता।` },
      { q: `${f.n}/${f.d} का व्युत्क्रम क्या है?`, a: `${f.reciprocal.n}/${f.reciprocal.d}, मिश्र संख्या में ${mixed(f.reciprocal)}।` },
    ],
    f => [
      { q: `${f.n}/${f.d} 化成小数是多少？`, a: `${DEC.zh(f.decimal)}。${f.decimal.terminating ? `它在小数点后 ${f.places} 位就结束。` : `括号里的 ${f.periodLength} 位会无限重复。`}` },
      { q: `${f.n}/${f.d} 是百分之几？`, a: `${DEC.zh(f.percent)}%。` },
      { q: `有哪些分数和 ${f.n}/${f.d} 相等？`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join('、')}…… 分子分母同乘一个数，值不变。` },
      { q: `${f.n}/${f.d} 的倒数是多少？`, a: `${f.reciprocal.n}/${f.reciprocal.d}，写成带分数是 ${mixed(f.reciprocal)}。` },
    ],
    f => [
      { q: `${f.n}/${f.d} 化成小數是多少？`, a: `${DEC.tw(f.decimal)}。${f.decimal.terminating ? `它在小數點後 ${f.places} 位就結束。` : `括號裡的 ${f.periodLength} 位會無限重複。`}` },
      { q: `${f.n}/${f.d} 是百分之幾？`, a: `${DEC.tw(f.percent)}%。` },
      { q: `有哪些分數和 ${f.n}/${f.d} 相等？`, a: `${f.equivalents.map(e => `${e.n}/${e.d}`).join('、')}…… 分子分母同乘一個數，值不變。` },
      { q: `${f.n}/${f.d} 的倒數是多少？`, a: `${f.reciprocal.n}/${f.reciprocal.d}，寫成帶分數是 ${mixed(f.reciprocal)}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const FRACTION_UI: L<FractionUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<FractionUI>;
