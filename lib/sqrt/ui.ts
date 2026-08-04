/**
 * 제곱근 화면의 문구 — 열 언어.
 *
 * 소수는 반올림한 값이고 근호 꼴은 정확한 값이다. 그 차이를 문구가 계속
 * 짚어 준다 — 시험지에 5√2라고 적어야 하는 자리에 7.07을 적으면 틀린다.
 *
 * 소수점 기호는 언어마다 다르다(7,071068). 그런데 이 값은 자릿수를 끊지 않으므로
 * toLocaleString 대신 점만 갈아 끼운다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { SqrtFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface SqrtUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  /** 7.071068 → 7,071068 */
  dec: (v: number) => string;
  valueLabel: string;
  radicalLabel: string;
  betweenLabel: string;
  squareLabel: string;
  cbrtLabel: string;
  exactTag: string;
  approxTag: string;
  simplifyTitle: string;
  simplifyNote: string;
  squaresTitle: string;
  squaresNote: string;
  simplifiableTitle: string;
  simplifiableNote: string;
  allTitle: string;
  neighbourTitle: string;
  desc: (f: SqrtFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: SqrtFacts) => string;
  metaDesc: (f: SqrtFacts) => string;
  hubFaq: FaqItem[];
  sqrtFaq: (f: SqrtFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const dec = (mark: string) => (v: number): string => String(v).replace('.', mark);

const DEC: L<(v: number) => string> = {
  ko: dec('.'), en: dec('.'), es: dec(','), pt: dec(','), ja: dec('.'),
  de: dec(','), fr: dec(','), hi: dec('.'), zh: dec('.'), tw: dec('.'),
};

type Spec = { [K in keyof SqrtUI]: L<SqrtUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('제곱근', 'Square roots', 'Raíces cuadradas', 'Raízes quadradas', '平方根', 'Quadratwurzeln', 'Racines carrées', 'वर्गमूल', '平方根', '平方根'),

  dec: DEC,

  hubTitle: T(
    '제곱근 200가지 — 1부터 200까지',
    'Square roots of 1 to 200',
    'Raíces cuadradas del 1 al 200',
    'Raízes quadradas de 1 a 200',
    '平方根200種 — 1から200まで',
    'Quadratwurzeln von 1 bis 200',
    'Racines carrées de 1 à 200',
    '1 से 200 तक के वर्गमूल',
    '1 到 200 的平方根',
    '1 到 200 的平方根',
  ),

  hubLead: T(
    '소수로 반올림한 값과, 근호를 간단히 한 정확한 꼴을 함께 냅니다 — √50은 7.071068이면서 5√2입니다.',
    'The rounded decimal and the exact simplified surd, side by side: √50 is 7.071068 and also 5√2.',
    'El decimal redondeado y la forma exacta simplificada, juntos: √50 es 7,071068 y también 5√2.',
    'O decimal arredondado e a forma exata simplificada, lado a lado: √50 é 7,071068 e também 5√2.',
    '四捨五入した小数と、根号を簡単にした正確な形を並べます——√50は7.071068であり5√2でもあります。',
    'Der gerundete Dezimalwert und die exakt vereinfachte Wurzel nebeneinander: √50 ist 7,071068 und zugleich 5√2.',
    'La valeur décimale arrondie et la forme exacte simplifiée côte à côte : √50 vaut 7,071068 et aussi 5√2.',
    'गोल किया दशमलव और सरल किया हुआ सटीक रूप, साथ-साथ: √50 यानी 7.071068 और 5√2 भी।',
    '四舍五入的小数与化简后的精确根式并排——√50 既是 7.071068，也是 5√2。',
    '四捨五入的小數與化簡後的精確根式並排——√50 既是 7.071068，也是 5√2。',
  ),

  valueLabel: T('소수로', 'As a decimal', 'En decimal', 'Em decimal', '小数で', 'Als Dezimalzahl', 'En décimal', 'दशमलव में', '小数', '小數'),
  radicalLabel: T('간단히 한 근호', 'Simplified surd', 'Radical simplificado', 'Radical simplificado', '簡単にした根号', 'Vereinfachte Wurzel', 'Radical simplifié', 'सरल किया मूल', '化简根式', '化簡根式'),
  betweenLabel: T('두 정수 사이', 'Between', 'Entre', 'Entre', '二つの整数の間', 'Zwischen', 'Entre', 'किन के बीच', '介于', '介於'),
  squareLabel: T('제곱하면', 'Squared', 'Al cuadrado', 'Ao quadrado', '二乗すると', 'Quadriert', 'Au carré', 'वर्ग करने पर', '平方', '平方'),
  cbrtLabel: T('세제곱근', 'Cube root', 'Raíz cúbica', 'Raiz cúbica', '立方根', 'Kubikwurzel', 'Racine cubique', 'घनमूल', '立方根', '立方根'),
  exactTag: T('딱 떨어집니다', 'Exact', 'Exacta', 'Exata', '割り切れます', 'Exakt', 'Exacte', 'सटीक', '整数', '整數'),
  approxTag: T('무리수입니다', 'Irrational', 'Irracional', 'Irracional', '無理数です', 'Irrational', 'Irrationnelle', 'अपरिमेय', '无理数', '無理數'),

  simplifyTitle: T('근호를 간단히 하는 법', 'How the surd is simplified', 'Cómo se simplifica el radical', 'Como o radical é simplificado', '根号を簡単にする方法', 'Wie die Wurzel vereinfacht wird', 'Comment on simplifie le radical', 'मूल कैसे सरल होता है', '根式怎么化简', '根式怎麼化簡'),

  simplifyNote: T(
    '제곱인 약수 가운데 가장 큰 것을 밖으로 꺼냅니다. 50 = 25 × 2이므로 25의 뿌리인 5가 나오고 2가 남아 5√2가 됩니다.',
    'Pull out the largest square factor. Since 50 = 25 × 2, the root of 25 comes out as 5 and the 2 stays behind: 5√2.',
    'Se saca el mayor factor cuadrado. Como 50 = 25 × 2, la raíz de 25 sale como 5 y el 2 se queda dentro: 5√2.',
    'Tira-se o maior fator quadrado. Como 50 = 25 × 2, a raiz de 25 sai como 5 e o 2 fica dentro: 5√2.',
    '平方の約数のうち一番大きいものを外に出します。50 = 25 × 2なので25の根である5が出て2が残り、5√2になります。',
    'Man zieht den größten quadratischen Faktor heraus. Da 50 = 25 × 2 ist, kommt die Wurzel aus 25 als 5 heraus und die 2 bleibt: 5√2.',
    'On sort le plus grand facteur carré. Comme 50 = 25 × 2, la racine de 25 sort en 5 et le 2 reste : 5√2.',
    'सबसे बड़ा वर्ग गुणनखंड बाहर निकाला जाता है। 50 = 25 × 2 है, तो 25 का मूल 5 बाहर आता है और 2 भीतर रहता है: 5√2।',
    '把最大的平方因数提到根号外。50 = 25 × 2，所以 25 的根 5 出来，2 留下，写作 5√2。',
    '把最大的平方因數提到根號外。50 = 25 × 2，所以 25 的根 5 出來，2 留下，寫作 5√2。',
  ),

  squaresTitle: T('완전제곱수 열넷', 'The fourteen perfect squares', 'Los catorce cuadrados perfectos', 'Os catorze quadrados perfeitos', '完全平方数14個', 'Die vierzehn Quadratzahlen', 'Les quatorze carrés parfaits', 'चौदह पूर्ण वर्ग', '十四个完全平方数', '十四個完全平方數'),

  squaresNote: T(
    '200까지 딱 떨어지는 제곱근은 열넷뿐입니다. 나머지 186개는 소수점이 끝나지 않는 무리수입니다.',
    'Only fourteen of them come out whole below 200. The other 186 are irrational — their decimals never end.',
    'Solo catorce dan un resultado entero por debajo de 200. Los otros 186 son irracionales: su decimal no termina.',
    'Só catorze dão resultado inteiro abaixo de 200. Os outros 186 são irracionais: o decimal não termina.',
    '200までで割り切れる平方根は14個だけです。残り186個は小数が終わらない無理数です。',
    'Nur vierzehn gehen unter 200 glatt auf. Die anderen 186 sind irrational — ihre Dezimalen enden nie.',
    'Seules quatorze tombent juste sous 200. Les 186 autres sont irrationnelles : leurs décimales ne s’arrêtent jamais.',
    '200 तक केवल चौदह पूर्ण वर्गमूल देते हैं। बाकी 186 अपरिमेय हैं — उनका दशमलव कभी नहीं रुकता।',
    '200 以内只有十四个能开出整数，其余 186 个是小数无穷不循环的无理数。',
    '200 以內只有十四個能開出整數，其餘 186 個是小數無窮不循環的無理數。',
  ),

  simplifiableTitle: T('근호가 간단해지는 수', 'Roots that simplify', 'Raíces que se simplifican', 'Raízes que simplificam', '簡単になる数', 'Wurzeln, die sich vereinfachen', 'Racines qui se simplifient', 'जो मूल सरल होते हैं', '能化简的数', '能化簡的數'),

  simplifiableNote: T(
    '제곱인 약수를 가진 수들입니다. 시험지에는 7.07이 아니라 이 꼴로 적어야 맞습니다.',
    'These have a square factor to pull out. On an exam this form, not 7.07, is the right answer.',
    'Tienen un factor cuadrado que sacar. En un examen la respuesta correcta es esta forma, no 7,07.',
    'Têm um fator quadrado para tirar. Numa prova a resposta certa é esta forma, não 7,07.',
    '平方の約数を持つ数です。答案には7.07ではなくこの形で書くのが正解です。',
    'Sie haben einen quadratischen Faktor. In einer Klausur ist diese Form die richtige Antwort, nicht 7,07.',
    'Elles ont un facteur carré à sortir. À l’examen, c’est cette forme qu’il faut écrire, pas 7,07.',
    'इनमें वर्ग गुणनखंड होता है। परीक्षा में 7.07 नहीं, यही रूप सही उत्तर है।',
    '这些数带有平方因数。考卷上要写这种形式，而不是 7.07。',
    '這些數帶有平方因數。考卷上要寫這種形式，而不是 7.07。',
  ),

  allTitle: T('1부터 200까지', 'From 1 to 200', 'Del 1 al 200', 'De 1 a 200', '1から200まで', 'Von 1 bis 200', 'De 1 à 200', '1 से 200 तक', '从 1 到 200', '從 1 到 200'),
  neighbourTitle: T('가까운 수', 'Nearby numbers', 'Números cercanos', 'Números próximos', '近い数', 'Zahlen daneben', 'Nombres voisins', 'पास की संख्याएँ', '相邻的数', '相鄰的數'),

  desc: T<(f: SqrtFacts) => string>(
    f => (f.exact !== null
      ? `${f.n}의 제곱근은 ${f.exact}입니다. ${f.exact} × ${f.exact} = ${f.n}이므로 딱 떨어집니다.`
      : `${f.n}의 제곱근은 약 ${DEC.ko(f.value)}이고, 정확히 적으면 ${f.radical}입니다. 값은 ${f.between[0]}과 ${f.between[1]} 사이입니다.`),
    f => (f.exact !== null
      ? `The square root of ${f.n} is ${f.exact}, because ${f.exact} × ${f.exact} = ${f.n}.`
      : `The square root of ${f.n} is about ${DEC.en(f.value)}, or exactly ${f.radical}. It lies between ${f.between[0]} and ${f.between[1]}.`),
    f => (f.exact !== null
      ? `La raíz cuadrada de ${f.n} es ${f.exact}, porque ${f.exact} × ${f.exact} = ${f.n}.`
      : `La raíz cuadrada de ${f.n} es unos ${DEC.es(f.value)}, o exactamente ${f.radical}. Queda entre ${f.between[0]} y ${f.between[1]}.`),
    f => (f.exact !== null
      ? `A raiz quadrada de ${f.n} é ${f.exact}, pois ${f.exact} × ${f.exact} = ${f.n}.`
      : `A raiz quadrada de ${f.n} é cerca de ${DEC.pt(f.value)}, ou exatamente ${f.radical}. Fica entre ${f.between[0]} e ${f.between[1]}.`),
    f => (f.exact !== null
      ? `${f.n}の平方根は${f.exact}です。${f.exact} × ${f.exact} = ${f.n}なので割り切れます。`
      : `${f.n}の平方根はおよそ${DEC.ja(f.value)}、正確に書くと${f.radical}です。値は${f.between[0]}と${f.between[1]}の間にあります。`),
    f => (f.exact !== null
      ? `Die Quadratwurzel aus ${f.n} ist ${f.exact}, denn ${f.exact} × ${f.exact} = ${f.n}.`
      : `Die Quadratwurzel aus ${f.n} beträgt etwa ${DEC.de(f.value)}, exakt ${f.radical}. Sie liegt zwischen ${f.between[0]} und ${f.between[1]}.`),
    f => (f.exact !== null
      ? `La racine carrée de ${f.n} vaut ${f.exact}, car ${f.exact} × ${f.exact} = ${f.n}.`
      : `La racine carrée de ${f.n} vaut environ ${DEC.fr(f.value)}, exactement ${f.radical}. Elle est comprise entre ${f.between[0]} et ${f.between[1]}.`),
    f => (f.exact !== null
      ? `${f.n} का वर्गमूल ${f.exact} है, क्योंकि ${f.exact} × ${f.exact} = ${f.n}।`
      : `${f.n} का वर्गमूल लगभग ${DEC.hi(f.value)} है, और सटीक रूप में ${f.radical}। यह ${f.between[0]} और ${f.between[1]} के बीच है।`),
    f => (f.exact !== null
      ? `${f.n} 的平方根是 ${f.exact}，因为 ${f.exact} × ${f.exact} = ${f.n}。`
      : `${f.n} 的平方根约为 ${DEC.zh(f.value)}，精确写作 ${f.radical}，落在 ${f.between[0]} 和 ${f.between[1]} 之间。`),
    f => (f.exact !== null
      ? `${f.n} 的平方根是 ${f.exact}，因為 ${f.exact} × ${f.exact} = ${f.n}。`
      : `${f.n} 的平方根約為 ${DEC.tw(f.value)}，精確寫作 ${f.radical}，落在 ${f.between[0]} 和 ${f.between[1]} 之間。`),
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '소수는 반올림한 값이고, 근호 꼴이 정확한 값입니다.',
      '제곱인 약수를 밖으로 꺼내면 근호가 간단해집니다 — √50 = 5√2.',
      '완전제곱수가 아니면 소수점이 끝나지 않습니다(무리수).',
      '어느 두 정수 사이인지 알면 암산으로 어림할 수 있습니다.',
    ],
    [
      'The decimal is rounded; the surd form is the exact value.',
      'Pulling out a square factor simplifies the surd — √50 = 5√2.',
      'If the number is not a perfect square, the decimal never ends (irrational).',
      'Knowing which two integers it sits between is enough to estimate in your head.',
    ],
    [
      'El decimal está redondeado; la forma con radical es el valor exacto.',
      'Sacar un factor cuadrado simplifica el radical: √50 = 5√2.',
      'Si el número no es un cuadrado perfecto, el decimal no termina (irracional).',
      'Saber entre qué dos enteros cae basta para estimar de cabeza.',
    ],
    [
      'O decimal está arredondado; a forma com radical é o valor exato.',
      'Tirar um fator quadrado simplifica o radical: √50 = 5√2.',
      'Se o número não é quadrado perfeito, o decimal não termina (irracional).',
      'Saber entre quais dois inteiros ele cai já basta para estimar de cabeça.',
    ],
    [
      '小数は四捨五入した値で、根号の形が正確な値です。',
      '平方の約数を外に出すと根号が簡単になります——√50 = 5√2。',
      '完全平方数でなければ小数は終わりません（無理数）。',
      'どの二つの整数の間かが分かれば暗算で見当がつきます。',
    ],
    [
      'Der Dezimalwert ist gerundet; die Wurzelform ist der exakte Wert.',
      'Einen quadratischen Faktor herauszuziehen vereinfacht die Wurzel — √50 = 5√2.',
      'Ist die Zahl keine Quadratzahl, endet die Dezimaldarstellung nie (irrational).',
      'Zu wissen, zwischen welchen zwei ganzen Zahlen sie liegt, reicht zum Schätzen im Kopf.',
    ],
    [
      'La décimale est arrondie ; la forme radicale est la valeur exacte.',
      'Sortir un facteur carré simplifie le radical — √50 = 5√2.',
      'Si le nombre n’est pas un carré parfait, les décimales ne s’arrêtent jamais (irrationnel).',
      'Savoir entre quels deux entiers elle tombe suffit pour estimer de tête.',
    ],
    [
      'दशमलव गोल किया हुआ है; मूल-रूप ही सटीक मान है।',
      'वर्ग गुणनखंड बाहर निकालने से मूल सरल हो जाता है — √50 = 5√2।',
      'यदि संख्या पूर्ण वर्ग नहीं है तो दशमलव कभी नहीं रुकता (अपरिमेय)।',
      'किन दो पूर्णांकों के बीच है, यह जान लेने भर से मन में अंदाज़ा लग जाता है।',
    ],
    [
      '小数是四舍五入的，根式才是精确值。',
      '把平方因数提出来，根式就化简了——√50 = 5√2。',
      '不是完全平方数，小数就永远除不尽（无理数）。',
      '知道它落在哪两个整数之间，心算估值就够了。',
    ],
    [
      '小數是四捨五入的，根式才是精確值。',
      '把平方因數提出來，根式就化簡了——√50 = 5√2。',
      '不是完全平方數，小數就永遠除不盡（無理數）。',
      '知道它落在哪兩個整數之間，心算估值就夠了。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '제곱근표 — 1부터 200까지 소수와 근호 꼴',
    'Square root table — 1 to 200 in decimals and surds',
    'Tabla de raíces cuadradas — del 1 al 200 en decimal y radical',
    'Tabela de raízes quadradas — de 1 a 200 em decimal e radical',
    '平方根表 — 1から200までの小数と根号',
    'Quadratwurzel-Tabelle — 1 bis 200 als Dezimalzahl und Wurzel',
    'Table des racines carrées — de 1 à 200 en décimal et en radical',
    'वर्गमूल तालिका — 1 से 200 तक दशमलव और मूल-रूप में',
    '平方根表 — 1 到 200 的小数与根式',
    '平方根表 — 1 到 200 的小數與根式',
  ),

  hubMetaDesc: T(
    '1부터 200까지 제곱근을 한 장씩. 반올림한 소수와 근호를 간단히 한 정확한 꼴, 어느 두 정수 사이인지까지 계산했습니다.',
    'One page per square root from 1 to 200: the rounded decimal, the exact simplified surd and the two integers it falls between.',
    'Una página por raíz cuadrada del 1 al 200: el decimal redondeado, el radical exacto simplificado y los dos enteros entre los que cae.',
    'Uma página por raiz quadrada de 1 a 200: o decimal arredondado, o radical exato simplificado e os dois inteiros entre os quais fica.',
    '1から200までの平方根を1ページずつ。四捨五入した小数、簡単にした正確な根号、どの二つの整数の間かまで計算しました。',
    'Je eine Seite pro Quadratwurzel von 1 bis 200: gerundeter Dezimalwert, exakt vereinfachte Wurzel und die beiden ganzen Zahlen, dazwischen sie liegt.',
    'Une page par racine carrée de 1 à 200 : la décimale arrondie, le radical exact simplifié et les deux entiers qui l’encadrent.',
    '1 से 200 तक हर वर्गमूल का एक पृष्ठ: गोल किया दशमलव, सरल किया सटीक मूल-रूप और वे दो पूर्णांक जिनके बीच वह है।',
    '1 到 200 每个平方根各一页：四舍五入的小数、化简后的精确根式，以及它落在哪两个整数之间。',
    '1 到 200 每個平方根各一頁：四捨五入的小數、化簡後的精確根式，以及它落在哪兩個整數之間。',
  ),

  metaTitle: T<(f: SqrtFacts) => string>(
    f => `${f.n}의 제곱근 — ${f.exact !== null ? f.exact : `${DEC.ko(f.value)} (${f.radical})`}`,
    f => `Square root of ${f.n} — ${f.exact !== null ? f.exact : `${DEC.en(f.value)} (${f.radical})`}`,
    f => `Raíz cuadrada de ${f.n} — ${f.exact !== null ? f.exact : `${DEC.es(f.value)} (${f.radical})`}`,
    f => `Raiz quadrada de ${f.n} — ${f.exact !== null ? f.exact : `${DEC.pt(f.value)} (${f.radical})`}`,
    f => `${f.n}の平方根 — ${f.exact !== null ? f.exact : `${DEC.ja(f.value)}（${f.radical}）`}`,
    f => `Quadratwurzel aus ${f.n} — ${f.exact !== null ? f.exact : `${DEC.de(f.value)} (${f.radical})`}`,
    f => `Racine carrée de ${f.n} — ${f.exact !== null ? f.exact : `${DEC.fr(f.value)} (${f.radical})`}`,
    f => `${f.n} का वर्गमूल — ${f.exact !== null ? f.exact : `${DEC.hi(f.value)} (${f.radical})`}`,
    f => `${f.n} 的平方根 — ${f.exact !== null ? f.exact : `${DEC.zh(f.value)}（${f.radical}）`}`,
    f => `${f.n} 的平方根（繁體） — ${f.exact !== null ? f.exact : `${DEC.tw(f.value)}（${f.radical}）`}`,
  ),

  metaDesc: T<(f: SqrtFacts) => string>(
    f => `${f.n}의 제곱근은 ${f.exact !== null ? `${f.exact}로 딱 떨어집니다` : `약 ${DEC.ko(f.value)}이고 정확히는 ${f.radical}입니다`}. 세제곱근은 약 ${DEC.ko(f.cbrt)}, ${f.n}을 제곱하면 ${f.square}입니다.`,
    f => `The square root of ${f.n} is ${f.exact !== null ? `exactly ${f.exact}` : `about ${DEC.en(f.value)}, exactly ${f.radical}`}. Its cube root is about ${DEC.en(f.cbrt)}, and ${f.n} squared is ${f.square}.`,
    f => `La raíz cuadrada de ${f.n} es ${f.exact !== null ? `exactamente ${f.exact}` : `unos ${DEC.es(f.value)}, exactamente ${f.radical}`}. Su raíz cúbica ronda ${DEC.es(f.cbrt)} y ${f.n} al cuadrado es ${f.square}.`,
    f => `A raiz quadrada de ${f.n} é ${f.exact !== null ? `exatamente ${f.exact}` : `cerca de ${DEC.pt(f.value)}, exatamente ${f.radical}`}. A raiz cúbica fica em ${DEC.pt(f.cbrt)} e ${f.n} ao quadrado é ${f.square}.`,
    f => `${f.n}の平方根は${f.exact !== null ? `ちょうど${f.exact}です` : `およそ${DEC.ja(f.value)}、正確には${f.radical}です`}。立方根はおよそ${DEC.ja(f.cbrt)}、${f.n}を二乗すると${f.square}です。`,
    f => `Die Quadratwurzel aus ${f.n} ist ${f.exact !== null ? `genau ${f.exact}` : `etwa ${DEC.de(f.value)}, exakt ${f.radical}`}. Die Kubikwurzel liegt bei ${DEC.de(f.cbrt)}, und ${f.n} zum Quadrat ergibt ${f.square}.`,
    f => `La racine carrée de ${f.n} vaut ${f.exact !== null ? `exactement ${f.exact}` : `environ ${DEC.fr(f.value)}, exactement ${f.radical}`}. Sa racine cubique avoisine ${DEC.fr(f.cbrt)} et ${f.n} au carré fait ${f.square}.`,
    f => `${f.n} का वर्गमूल ${f.exact !== null ? `ठीक ${f.exact} है` : `लगभग ${DEC.hi(f.value)} है, सटीक रूप में ${f.radical}`}। घनमूल लगभग ${DEC.hi(f.cbrt)} और ${f.n} का वर्ग ${f.square} है।`,
    f => `${f.n} 的平方根${f.exact !== null ? `正好是 ${f.exact}` : `约为 ${DEC.zh(f.value)}，精确写作 ${f.radical}`}。立方根约 ${DEC.zh(f.cbrt)}，${f.n} 的平方是 ${f.square}。`,
    f => `${f.n} 的平方根${f.exact !== null ? `正好是 ${f.exact}` : `約為 ${DEC.tw(f.value)}，精確寫作 ${f.radical}`}。立方根約 ${DEC.tw(f.cbrt)}，${f.n} 的平方是 ${f.square}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '√50이 왜 5√2인가요?', a: '50을 25 × 2로 나누면 25가 제곱수라 뿌리 5가 밖으로 나옵니다. 남은 2는 더 나뉘지 않아 근호 안에 남습니다.' },
      { q: '소수로 적으면 안 되나요?', a: '쓰임에 따라 다릅니다. 길이를 재는 자리에서는 7.07이 편하지만, 수학 답안에서는 반올림하지 않은 5√2가 정답입니다.' },
      { q: '무리수가 무슨 뜻인가요?', a: '분수로 적을 수 없고 소수점이 끝나지도 되풀이되지도 않는 수입니다. 완전제곱수가 아닌 수의 제곱근이 그렇습니다.' },
      { q: '암산으로 어림하려면요?', a: '가까운 완전제곱수를 찾으면 됩니다. √50이라면 49가 7²이므로 7보다 조금 큽니다.' },
      { q: '200까지만 있는 이유는요?', a: '찾는 수가 대개 두 자리이거나 100·144·169처럼 표에서 본 수이기 때문입니다.' },
    ],
    [
      { q: 'Why is √50 equal to 5√2?', a: 'Split 50 into 25 × 2. Since 25 is a square, its root 5 comes out; the 2 has no square factor left, so it stays under the sign.' },
      { q: 'Can I just use the decimal?', a: 'It depends. For measuring, 7.07 is easier; in a maths answer the unrounded 5√2 is what counts as correct.' },
      { q: 'What does irrational mean?', a: 'It cannot be written as a fraction, and its decimal neither ends nor repeats. Any square root of a non-square is like this.' },
      { q: 'How do I estimate one in my head?', a: 'Find the nearest perfect square. For √50, 49 is 7², so the answer is just above 7.' },
      { q: 'Why stop at 200?', a: 'Because the numbers people look up are mostly two-digit, or the ones from the table like 100, 144 and 169.' },
    ],
    [
      { q: '¿Por qué √50 es 5√2?', a: 'Divide 50 en 25 × 2. Como 25 es un cuadrado, su raíz 5 sale fuera; al 2 no le queda factor cuadrado y se queda dentro.' },
      { q: '¿Puedo usar solo el decimal?', a: 'Depende. Para medir, 7,07 es más cómodo; en una respuesta de matemáticas lo correcto es 5√2 sin redondear.' },
      { q: '¿Qué significa irracional?', a: 'Que no se puede escribir como fracción y su decimal no termina ni se repite. Así es la raíz de cualquier número que no sea cuadrado perfecto.' },
      { q: '¿Cómo lo estimo de cabeza?', a: 'Busca el cuadrado perfecto más cercano. Para √50, 49 es 7², así que el resultado pasa un poco de 7.' },
      { q: '¿Por qué parar en 200?', a: 'Porque los números que se consultan suelen ser de dos cifras, o los de la tabla como 100, 144 y 169.' },
    ],
    [
      { q: 'Por que √50 é 5√2?', a: 'Divida 50 em 25 × 2. Como 25 é quadrado, sua raiz 5 sai; ao 2 não resta fator quadrado e ele fica dentro.' },
      { q: 'Posso usar só o decimal?', a: 'Depende. Para medir, 7,07 é mais prático; numa resposta de matemática o certo é 5√2 sem arredondar.' },
      { q: 'O que quer dizer irracional?', a: 'Que não dá para escrever como fração e o decimal não termina nem se repete. É assim com a raiz de qualquer número que não seja quadrado perfeito.' },
      { q: 'Como estimo de cabeça?', a: 'Procure o quadrado perfeito mais próximo. Para √50, 49 é 7², então o resultado passa um pouco de 7.' },
      { q: 'Por que parar em 200?', a: 'Porque os números procurados costumam ter dois algarismos, ou são os da tabela como 100, 144 e 169.' },
    ],
    [
      { q: 'なぜ√50は5√2なのですか？', a: '50を25 × 2に分けると、25が平方数なので根の5が外に出ます。残った2はそれ以上分けられず根号の中に残ります。' },
      { q: '小数で書いてはいけませんか？', a: '用途によります。長さを測る場面では7.07が便利ですが、数学の答案では四捨五入しない5√2が正解です。' },
      { q: '無理数とはどういう意味ですか？', a: '分数で書けず、小数が終わりも繰り返しもしない数です。完全平方数でない数の平方根がそれです。' },
      { q: '暗算で見当をつけるには？', a: '近い完全平方数を探します。√50なら49が7²なので、7より少し大きい値です。' },
      { q: '200までにした理由は？', a: '調べる数はたいてい二桁か、100・144・169のように表で見た数だからです。' },
    ],
    [
      { q: 'Warum ist √50 gleich 5√2?', a: 'Zerlege 50 in 25 × 2. Da 25 eine Quadratzahl ist, kommt ihre Wurzel 5 heraus; der 2 bleibt kein quadratischer Faktor, sie bleibt unter der Wurzel.' },
      { q: 'Reicht nicht der Dezimalwert?', a: 'Kommt darauf an. Beim Messen ist 7,07 bequemer; in einer Mathelösung gilt das ungerundete 5√2 als richtig.' },
      { q: 'Was heißt irrational?', a: 'Nicht als Bruch schreibbar, und die Dezimaldarstellung endet nicht und wiederholt sich nicht. So ist jede Wurzel aus einer Nicht-Quadratzahl.' },
      { q: 'Wie schätzt man im Kopf?', a: 'Die nächste Quadratzahl suchen. Bei √50 ist 49 = 7², also liegt das Ergebnis knapp über 7.' },
      { q: 'Warum nur bis 200?', a: 'Weil die nachgeschlagenen Zahlen meist zweistellig sind oder aus der Tabelle stammen — 100, 144, 169.' },
    ],
    [
      { q: 'Pourquoi √50 vaut-il 5√2 ?', a: 'Décomposez 50 en 25 × 2. Comme 25 est un carré, sa racine 5 sort ; il ne reste au 2 aucun facteur carré, il demeure sous le radical.' },
      { q: 'Le décimal ne suffit-il pas ?', a: 'Cela dépend. Pour mesurer, 7,07 est plus commode ; dans une copie de maths, c’est 5√2 non arrondi qui est juste.' },
      { q: 'Que signifie irrationnel ?', a: 'Impossible à écrire comme fraction, avec des décimales qui ne s’arrêtent ni ne se répètent. C’est le cas de la racine de tout nombre non carré.' },
      { q: 'Comment estimer de tête ?', a: 'Cherchez le carré parfait le plus proche. Pour √50, 49 = 7² : le résultat dépasse à peine 7.' },
      { q: 'Pourquoi s’arrêter à 200 ?', a: 'Parce que les nombres cherchés ont le plus souvent deux chiffres, ou viennent de la table : 100, 144, 169.' },
    ],
    [
      { q: '√50 बराबर 5√2 क्यों है?', a: '50 को 25 × 2 में बाँटिए। 25 वर्ग है, इसलिए उसका मूल 5 बाहर आ जाता है; 2 में कोई वर्ग गुणनखंड नहीं बचता, वह भीतर रहता है।' },
      { q: 'क्या केवल दशमलव नहीं चलेगा?', a: 'निर्भर करता है। नापने में 7.07 सुविधाजनक है; गणित के उत्तर में बिना गोल किया 5√2 ही सही माना जाता है।' },
      { q: 'अपरिमेय का क्या अर्थ है?', a: 'जिसे भिन्न में नहीं लिखा जा सकता और जिसका दशमलव न रुकता है न दोहराता है। हर गैर-पूर्ण-वर्ग का वर्गमूल ऐसा ही है।' },
      { q: 'मन में अंदाज़ा कैसे लगाएँ?', a: 'निकटतम पूर्ण वर्ग खोजिए। √50 के लिए 49 = 7² है, तो उत्तर 7 से थोड़ा ऊपर है।' },
      { q: '200 तक ही क्यों?', a: 'क्योंकि जो संख्याएँ खोजी जाती हैं वे प्रायः दो अंकों की होती हैं, या 100, 144, 169 जैसी तालिका वाली।' },
    ],
    [
      { q: '√50 为什么等于 5√2？', a: '把 50 拆成 25 × 2。25 是平方数，它的根 5 提到外面；2 再没有平方因数，就留在根号里。' },
      { q: '直接用小数不行吗？', a: '看场合。量长度时 7.07 更顺手；但在数学答题里，不四舍五入的 5√2 才算对。' },
      { q: '无理数是什么意思？', a: '写不成分数，小数既不终止也不循环。凡不是完全平方数的数，它的平方根都是这样。' },
      { q: '怎么心算估个大概？', a: '找最近的完全平方数。√50 的话，49 = 7²，所以结果比 7 大一点点。' },
      { q: '为什么只到 200？', a: '因为大家查的数多半是两位数，或者是 100、144、169 这些表上见过的数。' },
    ],
    [
      { q: '√50 為什麼等於 5√2？', a: '把 50 拆成 25 × 2。25 是平方數，它的根 5 提到外面；2 再沒有平方因數，就留在根號裡。' },
      { q: '直接用小數不行嗎？', a: '看場合。量長度時 7.07 更順手；但在數學答題裡，不四捨五入的 5√2 才算對。' },
      { q: '無理數是什麼意思？', a: '寫不成分數，小數既不終止也不循環。凡不是完全平方數的數，它的平方根都是這樣。' },
      { q: '怎麼心算估個大概？', a: '找最近的完全平方數。√50 的話，49 = 7²，所以結果比 7 大一點點。' },
      { q: '為什麼只到 200？', a: '因為大家查的數多半是兩位數，或者是 100、144、169 這些表上見過的數。' },
    ],
  ),

  sqrtFaq: T<(f: SqrtFacts) => FaqItem[]>(
    f => [
      { q: `${f.n}의 제곱근은 얼마인가요?`, a: f.exact !== null ? `${f.exact}입니다. 딱 떨어집니다.` : `약 ${DEC.ko(f.value)}입니다. 정확히 적으면 ${f.radical}입니다.` },
      { q: `근호를 더 간단히 할 수 있나요?`, a: f.outside > 1 ? `${f.n} = ${f.outside * f.outside} × ${f.inside}이므로 ${f.outside}를 밖으로 꺼내 ${f.radical}가 됩니다.` : `없습니다. 제곱인 약수가 없어 그대로 둡니다.` },
      { q: `어느 두 정수 사이인가요?`, a: f.exact !== null ? `정수 ${f.exact}입니다.` : `${f.between[0]}과 ${f.between[1]} 사이입니다.` },
      { q: `${f.n}의 세제곱근은요?`, a: f.cbrtExact !== null ? `${f.cbrtExact}입니다.` : `약 ${DEC.ko(f.cbrt)}입니다.` },
    ],
    f => [
      { q: `What is the square root of ${f.n}?`, a: f.exact !== null ? `${f.exact} exactly.` : `About ${DEC.en(f.value)}, or exactly ${f.radical}.` },
      { q: `Can the surd be simplified?`, a: f.outside > 1 ? `Yes: ${f.n} = ${f.outside * f.outside} × ${f.inside}, so ${f.outside} comes out and it becomes ${f.radical}.` : `No — there is no square factor to pull out.` },
      { q: `Between which integers does it fall?`, a: f.exact !== null ? `It is the whole number ${f.exact}.` : `Between ${f.between[0]} and ${f.between[1]}.` },
      { q: `What is the cube root of ${f.n}?`, a: f.cbrtExact !== null ? `${f.cbrtExact}.` : `About ${DEC.en(f.cbrt)}.` },
    ],
    f => [
      { q: `¿Cuál es la raíz cuadrada de ${f.n}?`, a: f.exact !== null ? `${f.exact} exacta.` : `Unos ${DEC.es(f.value)}, o exactamente ${f.radical}.` },
      { q: `¿Se puede simplificar el radical?`, a: f.outside > 1 ? `Sí: ${f.n} = ${f.outside * f.outside} × ${f.inside}, así que sale ${f.outside} y queda ${f.radical}.` : `No, no hay factor cuadrado que sacar.` },
      { q: `¿Entre qué enteros cae?`, a: f.exact !== null ? `Es el entero ${f.exact}.` : `Entre ${f.between[0]} y ${f.between[1]}.` },
      { q: `¿Y la raíz cúbica de ${f.n}?`, a: f.cbrtExact !== null ? `${f.cbrtExact}.` : `Unos ${DEC.es(f.cbrt)}.` },
    ],
    f => [
      { q: `Qual é a raiz quadrada de ${f.n}?`, a: f.exact !== null ? `${f.exact} exata.` : `Cerca de ${DEC.pt(f.value)}, ou exatamente ${f.radical}.` },
      { q: `Dá para simplificar o radical?`, a: f.outside > 1 ? `Dá: ${f.n} = ${f.outside * f.outside} × ${f.inside}, então sai ${f.outside} e fica ${f.radical}.` : `Não — não há fator quadrado para tirar.` },
      { q: `Entre quais inteiros ela fica?`, a: f.exact !== null ? `É o inteiro ${f.exact}.` : `Entre ${f.between[0]} e ${f.between[1]}.` },
      { q: `E a raiz cúbica de ${f.n}?`, a: f.cbrtExact !== null ? `${f.cbrtExact}.` : `Cerca de ${DEC.pt(f.cbrt)}.` },
    ],
    f => [
      { q: `${f.n}の平方根はいくつですか？`, a: f.exact !== null ? `${f.exact}です。割り切れます。` : `およそ${DEC.ja(f.value)}、正確には${f.radical}です。` },
      { q: `根号はもっと簡単になりますか？`, a: f.outside > 1 ? `${f.n} = ${f.outside * f.outside} × ${f.inside}なので${f.outside}が外に出て${f.radical}になります。` : `なりません。平方の約数がありません。` },
      { q: `どの二つの整数の間ですか？`, a: f.exact !== null ? `整数${f.exact}です。` : `${f.between[0]}と${f.between[1]}の間です。` },
      { q: `${f.n}の立方根は？`, a: f.cbrtExact !== null ? `${f.cbrtExact}です。` : `およそ${DEC.ja(f.cbrt)}です。` },
    ],
    f => [
      { q: `Wie groß ist die Quadratwurzel aus ${f.n}?`, a: f.exact !== null ? `Genau ${f.exact}.` : `Etwa ${DEC.de(f.value)}, exakt ${f.radical}.` },
      { q: `Lässt sich die Wurzel vereinfachen?`, a: f.outside > 1 ? `Ja: ${f.n} = ${f.outside * f.outside} × ${f.inside}, also kommt ${f.outside} heraus und es bleibt ${f.radical}.` : `Nein — es gibt keinen quadratischen Faktor.` },
      { q: `Zwischen welchen ganzen Zahlen liegt sie?`, a: f.exact !== null ? `Sie ist die ganze Zahl ${f.exact}.` : `Zwischen ${f.between[0]} und ${f.between[1]}.` },
      { q: `Und die Kubikwurzel aus ${f.n}?`, a: f.cbrtExact !== null ? `${f.cbrtExact}.` : `Etwa ${DEC.de(f.cbrt)}.` },
    ],
    f => [
      { q: `Combien vaut la racine carrée de ${f.n} ?`, a: f.exact !== null ? `Exactement ${f.exact}.` : `Environ ${DEC.fr(f.value)}, exactement ${f.radical}.` },
      { q: `Le radical se simplifie-t-il ?`, a: f.outside > 1 ? `Oui : ${f.n} = ${f.outside * f.outside} × ${f.inside}, donc ${f.outside} sort et il reste ${f.radical}.` : `Non — aucun facteur carré à sortir.` },
      { q: `Entre quels entiers se situe-t-elle ?`, a: f.exact !== null ? `C’est l’entier ${f.exact}.` : `Entre ${f.between[0]} et ${f.between[1]}.` },
      { q: `Et la racine cubique de ${f.n} ?`, a: f.cbrtExact !== null ? `${f.cbrtExact}.` : `Environ ${DEC.fr(f.cbrt)}.` },
    ],
    f => [
      { q: `${f.n} का वर्गमूल कितना है?`, a: f.exact !== null ? `ठीक ${f.exact}।` : `लगभग ${DEC.hi(f.value)}, सटीक रूप में ${f.radical}।` },
      { q: `क्या मूल और सरल हो सकता है?`, a: f.outside > 1 ? `हाँ: ${f.n} = ${f.outside * f.outside} × ${f.inside}, इसलिए ${f.outside} बाहर आता है और ${f.radical} बचता है।` : `नहीं — बाहर निकालने योग्य वर्ग गुणनखंड नहीं है।` },
      { q: `यह किन पूर्णांकों के बीच है?`, a: f.exact !== null ? `यह पूर्णांक ${f.exact} है।` : `${f.between[0]} और ${f.between[1]} के बीच।` },
      { q: `${f.n} का घनमूल?`, a: f.cbrtExact !== null ? `${f.cbrtExact}।` : `लगभग ${DEC.hi(f.cbrt)}।` },
    ],
    f => [
      { q: `${f.n} 的平方根是多少？`, a: f.exact !== null ? `正好是 ${f.exact}。` : `约 ${DEC.zh(f.value)}，精确写作 ${f.radical}。` },
      { q: `根式还能化简吗？`, a: f.outside > 1 ? `能：${f.n} = ${f.outside * f.outside} × ${f.inside}，所以 ${f.outside} 提出来，写作 ${f.radical}。` : `不能，没有可提的平方因数。` },
      { q: `它落在哪两个整数之间？`, a: f.exact !== null ? `它就是整数 ${f.exact}。` : `在 ${f.between[0]} 和 ${f.between[1]} 之间。` },
      { q: `${f.n} 的立方根呢？`, a: f.cbrtExact !== null ? `${f.cbrtExact}。` : `约 ${DEC.zh(f.cbrt)}。` },
    ],
    f => [
      { q: `${f.n} 的平方根是多少？`, a: f.exact !== null ? `正好是 ${f.exact}。` : `約 ${DEC.tw(f.value)}，精確寫作 ${f.radical}。` },
      { q: `根式還能化簡嗎？`, a: f.outside > 1 ? `能：${f.n} = ${f.outside * f.outside} × ${f.inside}，所以 ${f.outside} 提出來，寫作 ${f.radical}。` : `不能，沒有可提的平方因數。` },
      { q: `它落在哪兩個整數之間？`, a: f.exact !== null ? `它就是整數 ${f.exact}。` : `在 ${f.between[0]} 和 ${f.between[1]} 之間。` },
      { q: `${f.n} 的立方根呢？`, a: f.cbrtExact !== null ? `${f.cbrtExact}。` : `約 ${DEC.tw(f.cbrt)}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const SQRT_UI: L<SqrtUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<SqrtUI>;
