/**
 * 혈액형 유전 화면의 문구 — 열 언어.
 *
 * 혈액형 표기(A+, O−)와 유전자형 표기(AO, Dd)는 어느 나라 교과서에도 같은
 * 모양이라 옮기지 않는다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { HeredityFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface HeredityUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  fatherLabel: string;
  motherLabel: string;
  childLabel: string;
  verdictYes: string;
  verdictNo: string;
  chanceLabel: string;
  genotypeLabel: string;
  possibleLabel: string;
  impossibleLabel: string;
  noneLabel: string;
  routesTitle: string;
  routesNote: (f: HeredityFacts) => string;
  swapTitle: string;
  swapNote: string;
  parentsTitle: string;
  rhTitle: string;
  rhNote: string;
  punnettTitle: string;
  punnettNote: string;
  exceptionTitle: string;
  exceptionNote: string;
  proofTitle: string;
  proofNote: string;
  desc: (f: HeredityFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: HeredityFacts) => string;
  metaDesc: (f: HeredityFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: HeredityFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const dad = (f: HeredityFacts) => `${f.father.abo}${f.father.rh ? '+' : '−'}`;
const mom = (f: HeredityFacts) => `${f.mother.abo}${f.mother.rh ? '+' : '−'}`;
const kid = (f: HeredityFacts) => `${f.child.abo}${f.child.rh ? '+' : '−'}`;

/** 확률을 문장에 넣을 때 — 한 갈래면 값 하나, 여러 갈래면 범위다 */
const span = (f: HeredityFacts) => f.chanceText;

type Spec = { [K in keyof HeredityUI]: L<HeredityUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T(
    '혈액형 유전표', 'Blood type inheritance', 'Herencia del grupo sanguíneo', 'Herança do tipo sanguíneo',
    '血液型の遺伝表', 'Blutgruppenvererbung', 'Hérédité des groupes sanguins', 'रक्त समूह की वंशानुगति',
    '血型遗传表', '血型遺傳表',
  ),

  hubTitle: T(
    '혈액형 유전 512칸 — AB형과 O형 사이에서는 AB형도 O형도 나오지 않습니다',
    '512 inheritance cells — an AB and an O parent can have neither an AB nor an O child',
    '512 casillas de herencia — de un padre AB y otro O no nace ni AB ni O',
    '512 células de herança — de um pai AB e outro O não nasce nem AB nem O',
    '血液型の遺伝512マス — AB型とO型の間からはAB型もO型も生まれません',
    '512 Vererbungsfelder — aus AB und O entsteht weder AB noch O',
    '512 cases d’hérédité — d’un parent AB et d’un parent O ne naît ni AB ni O',
    '512 वंशानुगति खाने — AB और O माता-पिता से न AB होता है न O',
    '512 格血型遗传表 — AB 型和 O 型的父母，生不出 AB 型，也生不出 O 型',
    '512 格血型遺傳表 — AB 型和 O 型的父母，生不出 AB 型，也生不出 O 型',
  ),

  hubLead: T(
    '부모는 저마다 가진 두 개 가운데 하나를 물려줍니다. 그래서 아이의 유전자형은 네 가지이고, 네 칸을 세면 확률이 나옵니다. A와 B는 서로 지지 않고 O에만 이기며, Rh는 D 하나만 있어도 양성입니다. 부모의 혈액형만으로는 유전자형이 하나로 정해지지 않으므로(A형은 AA일 수도 AO일 수도 있습니다), 확률은 부모의 유전자형이 정해졌을 때의 값으로 냅니다. 아버지 8 × 어머니 8 × 아이 8, 512칸입니다.',
    'Each parent passes on one of the two alleles they carry, so the child has four possible genotypes — count the four squares and you have the probability. A and B beat neither each other nor lose to anything but O; for Rh, a single D makes you positive. A parent’s blood type does not pin down their genotype (an A parent may be AA or AO), so the probabilities here are given for a fixed pair of parental genotypes. Eight fathers × eight mothers × eight children: 512 cells.',
    'Cada progenitor transmite uno de los dos alelos que lleva, así que el hijo tiene cuatro genotipos posibles: se cuentan las cuatro casillas y sale la probabilidad. A y B no se vencen entre sí y solo ganan a O; para el Rh, una sola D basta para ser positivo. El grupo de un progenitor no fija su genotipo (un A puede ser AA o AO), por eso las probabilidades se dan para un par de genotipos concreto. Ocho padres × ocho madres × ocho hijos: 512 casillas.',
    'Cada progenitor transmite um dos dois alelos que carrega, então o filho tem quatro genótipos possíveis: contam-se os quatro quadrados e sai a probabilidade. A e B não se vencem e só ganham de O; no Rh, um único D já torna positivo. O tipo de um progenitor não fixa seu genótipo (um A pode ser AA ou AO), por isso as probabilidades são dadas para um par de genótipos definido. Oito pais × oito mães × oito filhos: 512 células.',
    '親はそれぞれ持っている二つのうち一つを渡します。だから子の遺伝子型は四通りで、四マスを数えれば確率が出ます。AとBは互いに負けず、Oにだけ勝ちます。RhはDが一つあれば陽性です。親の血液型だけでは遺伝子型が一つに決まらない(A型はAAかもAOかもしれません)ので、確率は親の遺伝子型が決まったときの値で出します。父8 × 母8 × 子8 の512マスです。',
    'Jeder Elternteil gibt eines seiner beiden Allele weiter, das Kind hat also vier mögliche Genotypen — vier Felder auszählen, und die Wahrscheinlichkeit steht da. A und B unterliegen einander nicht und setzen sich nur gegen O durch; beim Rhesus genügt ein einziges D für positiv. Die Blutgruppe eines Elternteils legt seinen Genotyp nicht fest (A kann AA oder AO sein), deshalb gelten die Wahrscheinlichkeiten hier für ein festes Genotyppaar. Acht Väter × acht Mütter × acht Kinder: 512 Felder.',
    'Chaque parent transmet l’un des deux allèles qu’il porte : l’enfant a donc quatre génotypes possibles, et compter les quatre cases donne la probabilité. A et B ne se dominent pas l’un l’autre et ne l’emportent que sur O ; côté Rhésus, un seul D suffit pour être positif. Le groupe d’un parent ne fixe pas son génotype (un A peut être AA ou AO), aussi les probabilités sont-elles données pour un couple de génotypes donné. Huit pères × huit mères × huit enfants : 512 cases.',
    'हर माता-पिता अपने दो में से एक एलील देते हैं, इसलिए बच्चे के चार संभावित जीनोटाइप होते हैं — चार खाने गिनिए, संभावना मिल जाएगी। A और B एक-दूसरे से नहीं हारते, केवल O पर भारी पड़ते हैं; Rh में एक D ही धनात्मक बनाने को काफी है। माता-पिता का समूह उनका जीनोटाइप तय नहीं करता (A वाला AA भी हो सकता है, AO भी), इसलिए संभावनाएँ एक निश्चित जीनोटाइप जोड़े के लिए दी गई हैं। आठ पिता × आठ माता × आठ संतान: 512 खाने।',
    '父母各自把两个等位基因中的一个传下去，所以孩子的基因型有四种，数一数四个格子就是概率。A 和 B 互不相让，只压得住 O；Rh 只要有一个 D 就是阳性。父母的血型定不出基因型（A 型可能是 AA，也可能是 AO），因此这里的概率是在父母基因型确定的前提下给的。父 8 × 母 8 × 子 8，共 512 格。',
    '父母各自把兩個等位基因中的一個傳下去，所以孩子的基因型有四種，數一數四個格子就是機率。A 和 B 互不相讓，只壓得住 O；Rh 只要有一個 D 就是陽性。父母的血型定不出基因型（A 型可能是 AA，也可能是 AO），因此這裡的機率是在父母基因型確定的前提下給的。父 8 × 母 8 × 子 8，共 512 格。',
  ),

  fatherLabel: T('아버지', 'Father', 'Padre', 'Pai', '父', 'Vater', 'Père', 'पिता', '父亲', '父親'),
  motherLabel: T('어머니', 'Mother', 'Madre', 'Mãe', '母', 'Mutter', 'Mère', 'माता', '母亲', '母親'),
  childLabel: T('아이', 'Child', 'Hijo', 'Filho', '子', 'Kind', 'Enfant', 'संतान', '孩子', '孩子'),
  verdictYes: T('가능', 'Possible', 'Posible', 'Possível', '可能', 'Möglich', 'Possible', 'संभव', '可能', '可能'),
  verdictNo: T('불가능', 'Impossible', 'Imposible', 'Impossível', '不可能', 'Unmöglich', 'Impossible', 'असंभव', '不可能', '不可能'),
  chanceLabel: T('확률', 'Probability', 'Probabilidad', 'Probabilidade', '確率', 'Wahrscheinlichkeit', 'Probabilité', 'संभावना', '概率', '機率'),
  genotypeLabel: T('유전자형', 'Genotype', 'Genotipo', 'Genótipo', '遺伝子型', 'Genotyp', 'Génotype', 'जीनोटाइप', '基因型', '基因型'),
  possibleLabel: T('나올 수 있는 혈액형', 'Possible children', 'Hijos posibles', 'Filhos possíveis', '生まれうる血液型', 'Mögliche Kinder', 'Enfants possibles', 'संभव संतान', '可能的血型', '可能的血型'),
  impossibleLabel: T('나올 수 없는 혈액형', 'Impossible children', 'Hijos imposibles', 'Filhos impossíveis', '生まれない血液型', 'Unmögliche Kinder', 'Enfants impossibles', 'असंभव संतान', '不可能的血型', '不可能的血型'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  routesTitle: T('부모의 유전자형별 확률', 'Probability by parental genotype', 'Probabilidad según el genotipo de los padres', 'Probabilidade por genótipo dos pais', '親の遺伝子型ごとの確率', 'Wahrscheinlichkeit je Elterngenotyp', 'Probabilité selon le génotype des parents', 'माता-पिता के जीनोटाइप के अनुसार संभावना', '按父母基因型分的概率', '按父母基因型分的機率'),

  routesNote: T<(f: HeredityFacts) => string>(
    f => f.possible
      ? `${f.routes.length === 1 ? '한 갈래뿐입니다' : `${f.routes.length}갈래가 있습니다`} — 확률은 ${span(f)}입니다. ${f.fatherFixed && f.motherFixed ? '두 분 다 유전자형이 하나로 정해집니다.' : '부모의 유전자형이 갈리기 때문에 하나로 못 박을 수 없습니다.'}`
      : `어느 유전자형 조합으로도 ${kid(f)} 아이는 나오지 않습니다.`,
    f => f.possible
      ? `${f.routes.length === 1 ? 'There is one route' : `There are ${f.routes.length} routes`} — the probability is ${span(f)}. ${f.fatherFixed && f.motherFixed ? 'Both parents have only one possible genotype.' : 'The parents’ genotypes are not pinned down, so it cannot be a single figure.'}`
      : `No combination of parental genotypes produces a ${kid(f)} child.`,
    f => f.possible
      ? `${f.routes.length === 1 ? 'Hay una sola vía' : `Hay ${f.routes.length} vías`}: la probabilidad es ${span(f)}. ${f.fatherFixed && f.motherFixed ? 'Ambos progenitores tienen un único genotipo posible.' : 'Los genotipos de los padres no están fijados, así que no puede ser una cifra única.'}`
      : `Ninguna combinación de genotipos paternos da un hijo ${kid(f)}.`,
    f => f.possible
      ? `${f.routes.length === 1 ? 'Há um único caminho' : `Há ${f.routes.length} caminhos`}: a probabilidade é ${span(f)}. ${f.fatherFixed && f.motherFixed ? 'Ambos os pais têm um único genótipo possível.' : 'Os genótipos dos pais não estão fixados, então não pode ser um número único.'}`
      : `Nenhuma combinação de genótipos dos pais gera um filho ${kid(f)}.`,
    f => f.possible
      ? `${f.routes.length === 1 ? '道筋は一つだけです' : `道筋が${f.routes.length}通りあります`} — 確率は${span(f)}です。${f.fatherFixed && f.motherFixed ? '二人とも遺伝子型が一つに決まります。' : '親の遺伝子型が定まらないので一つの値には決められません。'}`
      : `どの遺伝子型の組み合わせでも${kid(f)}の子は生まれません。`,
    f => f.possible
      ? `${f.routes.length === 1 ? 'Es gibt einen Weg' : `Es gibt ${f.routes.length} Wege`} — die Wahrscheinlichkeit liegt bei ${span(f)}. ${f.fatherFixed && f.motherFixed ? 'Beide Eltern haben nur einen möglichen Genotyp.' : 'Die Genotypen der Eltern stehen nicht fest, daher kein einzelner Wert.'}`
      : `Keine Kombination elterlicher Genotypen ergibt ein Kind mit ${kid(f)}.`,
    f => f.possible
      ? `${f.routes.length === 1 ? 'Il n’y a qu’une voie' : `Il y a ${f.routes.length} voies`} — la probabilité est de ${span(f)}. ${f.fatherFixed && f.motherFixed ? 'Les deux parents n’ont qu’un génotype possible.' : 'Les génotypes des parents ne sont pas fixés : impossible de donner un chiffre unique.'}`
      : `Aucune combinaison de génotypes parentaux ne donne un enfant ${kid(f)}.`,
    f => f.possible
      ? `${f.routes.length === 1 ? 'केवल एक रास्ता है' : `${f.routes.length} रास्ते हैं`} — संभावना ${span(f)} है। ${f.fatherFixed && f.motherFixed ? 'दोनों का जीनोटाइप एक ही संभव है।' : 'माता-पिता के जीनोटाइप तय नहीं हैं, इसलिए एक ही आँकड़ा नहीं दिया जा सकता।'}`
      : `माता-पिता के किसी भी जीनोटाइप संयोजन से ${kid(f)} संतान नहीं होती।`,
    f => f.possible
      ? `${f.routes.length === 1 ? '只有一条路径' : `有 ${f.routes.length} 条路径`}——概率是 ${span(f)}。${f.fatherFixed && f.motherFixed ? '两位的基因型都只有一种可能。' : '父母的基因型定不下来，所以给不出单一数值。'}`
      : `父母的任何基因型组合都生不出 ${kid(f)} 的孩子。`,
    f => f.possible
      ? `${f.routes.length === 1 ? '只有一條路徑' : `有 ${f.routes.length} 條路徑`}——機率是 ${span(f)}。${f.fatherFixed && f.motherFixed ? '兩位的基因型都只有一種可能。' : '父母的基因型定不下來，所以給不出單一數值。'}`
      : `父母的任何基因型組合都生不出 ${kid(f)} 的孩子。`,
  ),

  swapTitle: T('아버지와 어머니를 바꾸면', 'Swapping father and mother', 'Si se intercambian padre y madre', 'Trocando pai e mãe', '父と母を入れ替えると', 'Vater und Mutter vertauscht', 'En échangeant père et mère', 'पिता और माता बदलने पर', '把父母调换', '把父母調換'),
  swapNote: T(
    'ABO도 Rh도 성염색체에 있지 않아, 아버지와 어머니를 바꿔도 답이 똑같습니다. 512칸이지만 실제로 다른 답은 그 절반쯤입니다.',
    'Neither ABO nor Rh sits on a sex chromosome, so swapping father and mother changes nothing. There are 512 cells, but only about half of them are distinct answers.',
    'Ni el ABO ni el Rh están en un cromosoma sexual, así que intercambiar padre y madre no cambia nada. Hay 512 casillas, pero solo la mitad son respuestas distintas.',
    'Nem o ABO nem o Rh ficam num cromossomo sexual, então trocar pai e mãe não muda nada. São 512 células, mas só cerca de metade são respostas distintas.',
    'ABOもRhも性染色体にないので、父と母を入れ替えても答えは同じです。512マスありますが、実際に違う答えはその半分ほどです。',
    'Weder ABO noch Rhesus liegen auf einem Geschlechtschromosom — Vater und Mutter zu vertauschen ändert nichts. 512 Felder, aber nur etwa die Hälfte sind verschiedene Antworten.',
    'Ni ABO ni Rhésus ne siègent sur un chromosome sexuel : échanger père et mère ne change rien. Il y a 512 cases, mais seule la moitié environ donne des réponses distinctes.',
    'ABO और Rh दोनों लिंग गुणसूत्र पर नहीं हैं, इसलिए पिता और माता बदलने से उत्तर नहीं बदलता। 512 खाने हैं, पर अलग उत्तर लगभग आधे ही।',
    'ABO 和 Rh 都不在性染色体上，所以把父母调换，答案一样。512 格里，真正不同的答案只有一半左右。',
    'ABO 和 Rh 都不在性染色體上，所以把父母調換，答案一樣。512 格裡，真正不同的答案只有一半左右。',
  ),

  parentsTitle: T('이 부모에게서 나올 수 있는 여덟', 'All eight children for these parents', 'Los ocho hijos para estos padres', 'Os oito filhos para estes pais', 'この親から生まれうる八つ', 'Alle acht Kinder für diese Eltern', 'Les huit enfants pour ces parents', 'इन माता-पिता की आठों संतानें', '这对父母的八种孩子', '這對父母的八種孩子'),

  punnettTitle: T('퍼넷 사각형', 'The Punnett square', 'El cuadro de Punnett', 'O quadrado de Punnett', 'パネットの方形', 'Das Punnett-Quadrat', 'L’échiquier de Punnett', 'पनेट वर्ग', '庞纳特方格', '龐納特方格'),
  punnettNote: T(
    '아버지의 두 개를 가로, 어머니의 두 개를 세로에 놓고 네 칸을 채우면 그것이 아이의 유전자형 전부입니다. 네 칸을 표현형으로 바꿔 세면 확률이 나옵니다. ABO와 Rh는 서로 다른 염색체에 있어 따로 놀기 때문에, 둘을 각각 세어 곱하면 됩니다 — 네 칸 × 네 칸으로 열여섯 칸이 되는 셈입니다.',
    'Put the father’s two alleles across the top and the mother’s down the side, fill in the four squares, and that is every genotype the child can have. Translate the four into phenotypes and count: there is the probability. ABO and Rh sit on different chromosomes and are inherited independently, so you count each separately and multiply — four squares times four squares, sixteen in all.',
    'Ponga los dos alelos del padre arriba y los de la madre al lado, rellene las cuatro casillas y ahí están todos los genotipos posibles del hijo. Tradúzcalos a fenotipos y cuente: esa es la probabilidad. ABO y Rh están en cromosomas distintos y se heredan por separado, así que se cuenta cada uno y se multiplica: cuatro por cuatro, dieciséis casillas.',
    'Ponha os dois alelos do pai em cima e os da mãe ao lado, preencha os quatro quadrados e ali estão todos os genótipos possíveis do filho. Traduza-os em fenótipos e conte: essa é a probabilidade. ABO e Rh ficam em cromossomos diferentes e são herdados separadamente, então conta-se cada um e multiplica-se: quatro por quatro, dezesseis casas.',
    '父の二つを横に、母の二つを縦に置いて四マスを埋めれば、それが子の遺伝子型のすべてです。四マスを表現型に直して数えれば確率が出ます。ABOとRhは別の染色体にあって独立に伝わるので、それぞれ数えて掛ければよく、四マス × 四マスで十六マスになります。',
    'Die beiden Allele des Vaters nach oben, die der Mutter an die Seite, die vier Felder ausfüllen — das sind alle Genotypen, die das Kind haben kann. In Phänotypen übersetzen und auszählen: das ist die Wahrscheinlichkeit. ABO und Rhesus liegen auf verschiedenen Chromosomen und werden unabhängig vererbt, also zählt man beide getrennt und multipliziert: vier mal vier, sechzehn Felder.',
    'Placez les deux allèles du père en haut, ceux de la mère sur le côté, remplissez les quatre cases : voilà tous les génotypes possibles de l’enfant. Traduisez-les en phénotypes et comptez, c’est la probabilité. ABO et Rhésus sont sur des chromosomes différents et se transmettent indépendamment : on compte chacun puis on multiplie — quatre fois quatre, seize cases.',
    'पिता के दो एलील ऊपर, माता के दो बगल में रखिए और चार खाने भरिए — वही बच्चे के सभी संभव जीनोटाइप हैं। चारों को फेनोटाइप में बदलकर गिनिए, संभावना मिल जाएगी। ABO और Rh अलग गुणसूत्रों पर हैं और स्वतंत्र रूप से मिलते हैं, इसलिए दोनों को अलग गिनकर गुणा कीजिए — चार गुणा चार, कुल सोलह।',
    '把父亲的两个等位基因放在上边，母亲的放在侧边，填满四个格子，那就是孩子所有可能的基因型。把四格换成表现型再数，概率就出来了。ABO 和 Rh 在不同染色体上，各自独立遗传，所以分开数再相乘——四格乘四格，一共十六格。',
    '把父親的兩個等位基因放在上邊，母親的放在側邊，填滿四個格子，那就是孩子所有可能的基因型。把四格換成表現型再數，機率就出來了。ABO 和 Rh 在不同染色體上，各自獨立遺傳，所以分開數再相乘——四格乘四格，一共十六格。',
  ),

  rhTitle: T('Rh+ 부모에게서 Rh− 아이가 나옵니다', 'Rh+ parents can have an Rh− child', 'De padres Rh+ puede nacer un hijo Rh−', 'De pais Rh+ pode nascer um filho Rh−', 'Rh+ の親からRh− の子が生まれます', 'Rh+ Eltern können ein Rh− Kind bekommen', 'Des parents Rh+ peuvent avoir un enfant Rh−', 'Rh+ माता-पिता से Rh− संतान हो सकती है', 'Rh+ 的父母会生出 Rh− 的孩子', 'Rh+ 的父母會生出 Rh− 的孩子'),
  rhNote: T(
    'D가 하나만 있어도 Rh+ 로 보이므로, Rh+ 인 사람은 DD일 수도 Dd일 수도 있습니다. 부모가 둘 다 Dd이면 넷 중 하나꼴로 dd, 곧 Rh− 아이가 나옵니다. 거꾸로 Rh− 는 dd 하나뿐이라, Rh− 부모 둘에게서는 Rh− 아이만 나옵니다 — 이쪽은 예외가 없습니다.',
    'A single D already reads as Rh positive, so an Rh+ person may be DD or Dd. If both parents are Dd, one child in four is dd — Rh negative. The reverse has no escape hatch: Rh− is only ever dd, so two Rh− parents can have only Rh− children.',
    'Una sola D ya se lee como Rh positivo, así que una persona Rh+ puede ser DD o Dd. Si ambos progenitores son Dd, uno de cada cuatro hijos es dd, es decir Rh negativo. Al revés no hay escapatoria: Rh− solo puede ser dd, así que de dos progenitores Rh− solo nacen hijos Rh−.',
    'Um único D já se lê como Rh positivo, então uma pessoa Rh+ pode ser DD ou Dd. Se ambos os pais forem Dd, um filho em quatro é dd, ou seja Rh negativo. No sentido inverso não há saída: Rh− só pode ser dd, então de dois pais Rh− só nascem filhos Rh−.',
    'Dが一つあるだけでRh陽性に見えるので、Rh+ の人はDDかもDdかもしれません。両親ともDdなら四人に一人はdd、つまりRh− の子が生まれます。逆はありません — Rh− はddだけなので、Rh− の親二人からはRh− の子しか生まれません。',
    'Schon ein einzelnes D gilt als Rhesus-positiv, ein Rh+ Mensch kann also DD oder Dd sein. Sind beide Eltern Dd, ist jedes vierte Kind dd, also Rh−. Umgekehrt gibt es kein Schlupfloch: Rh− ist immer dd, aus zwei Rh− Eltern kommen nur Rh− Kinder.',
    'Un seul D suffit à paraître Rhésus positif : une personne Rh+ peut donc être DD ou Dd. Si les deux parents sont Dd, un enfant sur quatre est dd, c’est-à-dire Rh−. L’inverse ne souffre pas d’exception : Rh− est toujours dd, donc deux parents Rh− n’ont que des enfants Rh−.',
    'एक ही D होने पर Rh धनात्मक दिखता है, इसलिए Rh+ व्यक्ति DD भी हो सकता है और Dd भी। यदि दोनों Dd हों तो चार में एक dd यानी Rh− होगा। उल्टा रास्ता नहीं है: Rh− हमेशा dd ही होता है, इसलिए दो Rh− माता-पिता से केवल Rh− संतान होती है।',
    '只要有一个 D 就显示 Rh 阳性，所以 Rh+ 的人可能是 DD，也可能是 Dd。父母都是 Dd 的话，四个孩子里会有一个是 dd，也就是 Rh 阴性。反过来则没有例外：Rh− 只能是 dd，所以两个 Rh− 的父母只会生出 Rh− 的孩子。',
    '只要有一個 D 就顯示 Rh 陽性，所以 Rh+ 的人可能是 DD，也可能是 Dd。父母都是 Dd 的話，四個孩子裡會有一個是 dd，也就是 Rh 陰性。反過來則沒有例外：Rh− 只能是 dd，所以兩個 Rh− 的父母只會生出 Rh− 的孩子。',
  ),

  exceptionTitle: T('아주 드문 예외가 있습니다', 'There are very rare exceptions', 'Hay excepciones muy raras', 'Há exceções muito raras', 'ごくまれな例外があります', 'Es gibt sehr seltene Ausnahmen', 'Il existe de très rares exceptions', 'बहुत दुर्लभ अपवाद हैं', '有极罕见的例外', '有極罕見的例外'),
  exceptionNote: T(
    '봄베이 표현형인 사람은 A나 B 유전자를 갖고 있어도 검사에서 O형으로 나옵니다. A와 B가 한 염색체에 붙어 함께 물려지는 cis-AB도 있어, AB형 부모에게서 O형 아이가 나온 사례가 보고돼 있습니다. 아주 드문 일이지만, 이 표에 어긋나는 결과가 곧 무언가의 증거는 아니라는 뜻입니다.',
    'People with the Bombay phenotype test as group O even though they carry A or B genes. There is also cis-AB, where A and B sit on the same chromosome and pass together — cases of an O child from an AB parent have been reported. These are very rare, but they mean a result that contradicts this chart is not by itself evidence of anything.',
    'Quienes tienen el fenotipo Bombay dan grupo O en la prueba aunque lleven genes A o B. También existe el cis-AB, con A y B en el mismo cromosoma pasando juntos: se han descrito hijos O de un progenitor AB. Son casos rarísimos, pero significan que un resultado que contradiga esta tabla no prueba nada por sí solo.',
    'Quem tem o fenótipo Bombaim dá grupo O no exame mesmo carregando genes A ou B. Existe também o cis-AB, com A e B no mesmo cromossomo passando juntos: já se relataram filhos O de um pai AB. São casos raríssimos, mas significam que um resultado que contrarie esta tabela não prova nada por si só.',
    'ボンベイ型の人は、AやBの遺伝子を持っていても検査ではO型と出ます。AとBが同じ染色体に並んで一緒に伝わるcis-ABもあり、AB型の親からO型の子が生まれた例が報告されています。ごくまれですが、この表に合わない結果がそれだけで何かの証拠にはならないということです。',
    'Menschen mit Bombay-Phänotyp werden als Gruppe O typisiert, obwohl sie A- oder B-Gene tragen. Dazu kommt cis-AB, bei dem A und B auf demselben Chromosom liegen und gemeinsam weitergegeben werden — Fälle eines O-Kindes von einem AB-Elternteil sind beschrieben. Sehr selten, aber es heißt: ein Ergebnis, das dieser Tabelle widerspricht, beweist für sich genommen nichts.',
    'Les porteurs du phénotype Bombay sont typés groupe O bien qu’ils portent des gènes A ou B. Il existe aussi le cis-AB, où A et B siègent sur le même chromosome et se transmettent ensemble : des enfants O nés d’un parent AB ont été décrits. C’est très rare, mais cela signifie qu’un résultat contredisant ce tableau ne prouve rien à lui seul.',
    'बॉम्बे फेनोटाइप वाले लोग A या B जीन रखते हुए भी जाँच में O समूह दिखाते हैं। cis-AB भी है, जिसमें A और B एक ही गुणसूत्र पर साथ चलते हैं — AB माता-पिता से O संतान के मामले दर्ज हैं। ये बहुत दुर्लभ हैं, पर इसका अर्थ है कि इस तालिका से मेल न खाता परिणाम अपने आप में किसी बात का प्रमाण नहीं।',
    '孟买型的人即便带着 A 或 B 基因，化验出来也是 O 型。还有 cis-AB，A 和 B 长在同一条染色体上一起传下去——已有 AB 型父母生出 O 型孩子的报告。这些都极其罕见，但它意味着：与本表不符的结果，本身并不证明什么。',
    '孟買型的人即便帶著 A 或 B 基因，化驗出來也是 O 型。還有 cis-AB，A 和 B 長在同一條染色體上一起傳下去——已有 AB 型父母生出 O 型孩子的報告。這些都極其罕見，但它意味著：與本表不符的結果，本身並不證明什麼。',
  ),

  proofTitle: T('혈액형은 친자 확인이 아닙니다', 'Blood type is not a parentage test', 'El grupo sanguíneo no es una prueba de paternidad', 'O tipo sanguíneo não é teste de paternidade', '血液型は親子鑑定ではありません', 'Die Blutgruppe ist kein Abstammungstest', 'Le groupe sanguin n’est pas un test de filiation', 'रक्त समूह पितृत्व परीक्षण नहीं है', '血型不是亲子鉴定', '血型不是親子鑑定'),
  proofNote: T(
    '이 표가 할 수 있는 것은 배제뿐입니다. 어떤 조합이 불가능하다고 말할 수는 있어도, 가능하다고 해서 친자라는 뜻은 아닙니다 — 같은 혈액형을 가진 사람이 세상에 아주 많기 때문입니다. 게다가 위의 드문 예외들이 있어 배제조차 확정이 아닙니다. 친자 확인은 DNA 검사가 하는 일입니다.',
    'All this chart can do is exclude. It can say a combination is impossible; it cannot say that a possible one means the child is yours — far too many people share any given blood type. And the rare exceptions above mean even the exclusions are not certainties. Parentage is settled by DNA testing.',
    'Lo único que puede hacer esta tabla es excluir. Puede decir que una combinación es imposible; no puede decir que una posible signifique paternidad, porque demasiada gente comparte cualquier grupo. Y con las raras excepciones de arriba, ni siquiera las exclusiones son certezas. La filiación la determina una prueba de ADN.',
    'Tudo o que esta tabela faz é excluir. Pode dizer que uma combinação é impossível; não pode dizer que uma possível signifique paternidade, porque gente demais compartilha qualquer tipo. E com as raras exceções acima, nem as exclusões são certezas. A filiação é resolvida por exame de DNA.',
    'この表にできるのは除外だけです。ある組み合わせが不可能だとは言えても、可能だからといって親子だという意味にはなりません — 同じ血液型の人が世の中にあまりに多いからです。しかも上の例外があるので、除外すら確定ではありません。親子鑑定はDNA検査の仕事です。',
    'Diese Tabelle kann nur ausschließen. Sie kann sagen, dass eine Kombination unmöglich ist; sie kann nicht sagen, dass eine mögliche Abstammung bedeutet — viel zu viele Menschen teilen jede Blutgruppe. Und wegen der seltenen Ausnahmen oben sind selbst die Ausschlüsse keine Gewissheiten. Über Abstammung entscheidet ein DNA-Test.',
    'Ce tableau ne sait qu’exclure. Il peut dire qu’une combinaison est impossible ; il ne peut pas dire qu’une combinaison possible établit la filiation — bien trop de gens partagent n’importe quel groupe. Et avec les rares exceptions ci-dessus, même les exclusions ne sont pas des certitudes. La filiation se tranche par test ADN.',
    'यह तालिका केवल बाहर कर सकती है। वह कह सकती है कि कोई संयोजन असंभव है; पर संभव होने का अर्थ पितृत्व नहीं — किसी भी रक्त समूह के लोग बहुत ज़्यादा हैं। और ऊपर के दुर्लभ अपवादों के कारण बाहर करना भी निश्चित नहीं। पितृत्व DNA जाँच से तय होता है।',
    '这张表能做的只是排除。它可以说某个组合不可能，却不能说可能就等于亲生——同一血型的人实在太多。加上上面那些罕见例外，连排除也不是定论。亲子关系由 DNA 检测判定。',
    '這張表能做的只是排除。它可以說某個組合不可能，卻不能說可能就等於親生——同一血型的人實在太多。加上上面那些罕見例外，連排除也不是定論。親子關係由 DNA 檢測判定。',
  ),

  desc: T<(f: HeredityFacts) => string>(
    f => `${dad(f)} 아버지와 ${mom(f)} 어머니 사이에서 ${kid(f)} 아이는 ${f.possible ? `나올 수 있습니다 — 부모의 유전자형에 따라 ${span(f)}입니다` : '나오지 않습니다'}. 이 부모에게서 나올 수 있는 혈액형은 ${f.possibleChildren.length}가지입니다.`,
    f => `An ${dad(f)} father and a ${mom(f)} mother ${f.possible ? `can have a ${kid(f)} child — ${span(f)} depending on their genotypes` : `cannot have a ${kid(f)} child`}. These parents can produce ${f.possibleChildren.length} of the eight blood types.`,
    f => `Un padre ${dad(f)} y una madre ${mom(f)} ${f.possible ? `pueden tener un hijo ${kid(f)}: ${span(f)} según sus genotipos` : `no pueden tener un hijo ${kid(f)}`}. Estos padres dan ${f.possibleChildren.length} de los ocho grupos.`,
    f => `Um pai ${dad(f)} e uma mãe ${mom(f)} ${f.possible ? `podem ter um filho ${kid(f)}: ${span(f)} conforme os genótipos` : `não podem ter um filho ${kid(f)}`}. Estes pais dão ${f.possibleChildren.length} dos oito tipos.`,
    f => `${dad(f)} の父と ${mom(f)} の母から ${kid(f)} の子は${f.possible ? `生まれえます — 親の遺伝子型によって${span(f)}です` : '生まれません'}。この親から生まれうる血液型は${f.possibleChildren.length}種類です。`,
    f => `Ein Vater mit ${dad(f)} und eine Mutter mit ${mom(f)} ${f.possible ? `können ein Kind mit ${kid(f)} bekommen — je nach Genotyp ${span(f)}` : `können kein Kind mit ${kid(f)} bekommen`}. Diese Eltern bringen ${f.possibleChildren.length} der acht Blutgruppen hervor.`,
    f => `Un père ${dad(f)} et une mère ${mom(f)} ${f.possible ? `peuvent avoir un enfant ${kid(f)} — ${span(f)} selon leurs génotypes` : `ne peuvent pas avoir d’enfant ${kid(f)}`}. Ces parents donnent ${f.possibleChildren.length} des huit groupes.`,
    f => `${dad(f)} पिता और ${mom(f)} माता से ${kid(f)} संतान ${f.possible ? `हो सकती है — जीनोटाइप के अनुसार ${span(f)}` : 'नहीं हो सकती'}। इन माता-पिता से आठ में से ${f.possibleChildren.length} समूह संभव हैं।`,
    f => `${dad(f)} 的父亲和 ${mom(f)} 的母亲${f.possible ? `可以生出 ${kid(f)} 的孩子——看基因型，${span(f)}` : `生不出 ${kid(f)} 的孩子`}。这对父母能生出八种血型中的 ${f.possibleChildren.length} 种。`,
    f => `${dad(f)} 的父親和 ${mom(f)} 的母親${f.possible ? `可以生出 ${kid(f)} 的孩子——看基因型，${span(f)}` : `生不出 ${kid(f)} 的孩子`}。這對父母能生出八種血型中的 ${f.possibleChildren.length} 種。`,
  ),

  howTitle: T('읽는 법', 'How to read it', 'Cómo se lee', 'Como ler', '読み方', 'So liest man es', 'Comment le lire', 'कैसे पढ़ें', '怎么读', '怎麼讀'),

  how: T<string[]>(
    [
      'ABO 대립유전자는 A·B·O 셋이고, 사람은 그중 둘을 갖습니다.',
      'A와 B는 서로 지지 않고 O에만 이깁니다 — 그래서 AB형이 있습니다.',
      'A형은 AA일 수도 AO일 수도 있고, O형은 OO 하나뿐입니다.',
      'Rh는 D가 d에 이깁니다. Rh+ 는 DD나 Dd, Rh− 는 dd입니다.',
      '아버지의 둘과 어머니의 둘을 짝지어 네 칸을 세면 확률이 나옵니다.',
      'ABO와 Rh는 다른 염색체에 있으니 따로 세어 곱합니다.',
    ],
    [
      'There are three ABO alleles — A, B and O — and each person carries two of them.',
      'A and B do not lose to each other and beat only O, which is why AB exists.',
      'An A person may be AA or AO; an O person can only be OO.',
      'For Rh, D beats d: Rh+ is DD or Dd, Rh− is dd.',
      'Pair the father’s two with the mother’s two, count the four squares, and you have the probability.',
      'ABO and Rh sit on different chromosomes, so count them separately and multiply.',
    ],
    [
      'Hay tres alelos ABO —A, B y O— y cada persona lleva dos.',
      'A y B no se vencen entre sí y solo ganan a O: por eso existe el AB.',
      'Una persona A puede ser AA o AO; una O solo puede ser OO.',
      'En el Rh, D vence a d: Rh+ es DD o Dd, Rh− es dd.',
      'Empareje los dos del padre con los dos de la madre, cuente las cuatro casillas y tiene la probabilidad.',
      'ABO y Rh están en cromosomas distintos: cuéntelos por separado y multiplique.',
    ],
    [
      'Há três alelos ABO — A, B e O — e cada pessoa carrega dois.',
      'A e B não se vencem e só ganham de O: por isso existe o AB.',
      'Uma pessoa A pode ser AA ou AO; uma O só pode ser OO.',
      'No Rh, D vence d: Rh+ é DD ou Dd, Rh− é dd.',
      'Cruze os dois do pai com os dois da mãe, conte os quatro quadrados e tem a probabilidade.',
      'ABO e Rh ficam em cromossomos diferentes: conte separadamente e multiplique.',
    ],
    [
      'ABOの対立遺伝子はA・B・Oの三つで、人はそのうち二つを持ちます。',
      'AとBは互いに負けず、Oにだけ勝ちます — だからAB型があります。',
      'A型はAAかもAOかもしれず、O型はOOだけです。',
      'RhはDがdに勝ちます。Rh+ はDDかDd、Rh− はddです。',
      '父の二つと母の二つを組み合わせて四マスを数えれば確率が出ます。',
      'ABOとRhは別の染色体にあるので、別々に数えて掛けます。',
    ],
    [
      'Es gibt drei ABO-Allele — A, B und O — und jeder Mensch trägt zwei davon.',
      'A und B unterliegen einander nicht und setzen sich nur gegen O durch; daher gibt es AB.',
      'Ein A-Mensch kann AA oder AO sein, ein O-Mensch nur OO.',
      'Beim Rhesus schlägt D das d: Rh+ ist DD oder Dd, Rh− ist dd.',
      'Die zwei des Vaters mit den zwei der Mutter kombinieren, vier Felder auszählen — fertig ist die Wahrscheinlichkeit.',
      'ABO und Rhesus liegen auf verschiedenen Chromosomen: getrennt zählen und multiplizieren.',
    ],
    [
      'Il y a trois allèles ABO — A, B et O — et chacun en porte deux.',
      'A et B ne se dominent pas et ne l’emportent que sur O : d’où le groupe AB.',
      'Une personne A peut être AA ou AO ; une personne O ne peut être que OO.',
      'Pour le Rhésus, D l’emporte sur d : Rh+ est DD ou Dd, Rh− est dd.',
      'Croisez les deux du père et les deux de la mère, comptez les quatre cases : voilà la probabilité.',
      'ABO et Rhésus sont sur des chromosomes différents : comptez séparément puis multipliez.',
    ],
    [
      'ABO के तीन एलील हैं — A, B और O — और हर व्यक्ति उनमें से दो रखता है।',
      'A और B एक-दूसरे से नहीं हारते, केवल O पर भारी पड़ते हैं — इसीलिए AB समूह है।',
      'A वाला AA भी हो सकता है, AO भी; O वाला केवल OO।',
      'Rh में D, d को हराता है: Rh+ यानी DD या Dd, Rh− यानी dd।',
      'पिता के दो और माता के दो को जोड़कर चार खाने गिनिए, संभावना मिल जाएगी।',
      'ABO और Rh अलग गुणसूत्रों पर हैं, इसलिए अलग गिनकर गुणा कीजिए।',
    ],
    [
      'ABO 有三个等位基因——A、B、O——每个人带其中两个。',
      'A 和 B 互不相让，只压得住 O，所以才有 AB 型。',
      'A 型可能是 AA，也可能是 AO；O 型只能是 OO。',
      'Rh 里 D 压得住 d：Rh+ 是 DD 或 Dd，Rh− 是 dd。',
      '把父亲的两个和母亲的两个配对，数四个格子，概率就出来了。',
      'ABO 和 Rh 在不同染色体上，分开数再相乘。',
    ],
    [
      'ABO 有三個等位基因——A、B、O——每個人帶其中兩個。',
      'A 和 B 互不相讓，只壓得住 O，所以才有 AB 型。',
      'A 型可能是 AA，也可能是 AO；O 型只能是 OO。',
      'Rh 裡 D 壓得住 d：Rh+ 是 DD 或 Dd，Rh− 是 dd。',
      '把父親的兩個和母親的兩個配對，數四個格子，機率就出來了。',
      'ABO 和 Rh 在不同染色體上，分開數再相乘。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'सामान्य प्रश्न', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '혈액형 유전표 — 부모 조합 512칸',
    'Blood type inheritance chart — 512 parent combinations',
    'Tabla de herencia del grupo sanguíneo — 512 combinaciones',
    'Tabela de herança do tipo sanguíneo — 512 combinações',
    '血液型の遺伝表 — 親の組み合わせ512マス',
    'Blutgruppen-Vererbungstabelle — 512 Elternkombinationen',
    'Tableau d’hérédité des groupes sanguins — 512 combinaisons',
    'रक्त समूह वंशानुगति तालिका — 512 संयोजन',
    '血型遗传表 — 父母组合 512 格',
    '血型遺傳表 — 父母組合 512 格',
  ),
  hubMetaDesc: T(
    '어떤 부모에게서 어떤 아이가 나올 수 있는지, 퍼넷 사각형으로 풀었습니다. AB형과 O형 사이에서는 AB형도 O형도 나오지 않습니다.',
    'Which children which parents can have, worked out with Punnett squares. An AB and an O parent can have neither an AB nor an O child.',
    'Qué hijos pueden tener qué padres, resuelto con cuadros de Punnett. De un progenitor AB y otro O no nace ni AB ni O.',
    'Que filhos quais pais podem ter, resolvido com quadrados de Punnett. De um pai AB e outro O não nasce nem AB nem O.',
    'どの親からどの子が生まれうるかをパネットの方形で解きました。AB型とO型の間からはAB型もO型も生まれません。',
    'Welche Kinder welche Eltern bekommen können, mit Punnett-Quadraten hergeleitet. Aus AB und O entsteht weder AB noch O.',
    'Quels enfants pour quels parents, établi par des échiquiers de Punnett. D’un parent AB et d’un parent O ne naît ni AB ni O.',
    'किन माता-पिता से कौन-सी संतान संभव है, पनेट वर्ग से निकाला गया। AB और O माता-पिता से न AB होता है न O।',
    '什么样的父母能生出什么样的孩子，用庞纳特方格推出来。AB 型和 O 型的父母，生不出 AB 型，也生不出 O 型。',
    '什麼樣的父母能生出什麼樣的孩子，用龐納特方格推出來。AB 型和 O 型的父母，生不出 AB 型，也生不出 O 型。',
  ),

  metaTitle: T<(f: HeredityFacts) => string>(
    f => `${dad(f)} × ${mom(f)} 부모의 ${kid(f)} 아이 — ${f.possible ? '가능' : '불가능'}`,
    f => `${dad(f)} × ${mom(f)} parents, ${kid(f)} child — ${f.possible ? 'possible' : 'impossible'}`,
    f => `Padres ${dad(f)} × ${mom(f)}, hijo ${kid(f)} — ${f.possible ? 'posible' : 'imposible'}`,
    f => `Pais ${dad(f)} × ${mom(f)}, filho ${kid(f)} — ${f.possible ? 'possível' : 'impossível'}`,
    f => `${dad(f)} × ${mom(f)} の親と ${kid(f)} の子 — ${f.possible ? '可能' : '不可能'}`,
    f => `Eltern ${dad(f)} × ${mom(f)}, Kind ${kid(f)} — ${f.possible ? 'möglich' : 'unmöglich'}`,
    f => `Parents ${dad(f)} × ${mom(f)}, enfant ${kid(f)} — ${f.possible ? 'possible' : 'impossible'}`,
    f => `${dad(f)} × ${mom(f)} माता-पिता, ${kid(f)} संतान — ${f.possible ? 'संभव' : 'असंभव'}`,
    f => `${dad(f)} × ${mom(f)} 父母，${kid(f)} 孩子 — ${f.possible ? '可能' : '不可能'}`,
    f => `${dad(f)} × ${mom(f)} 父母，${kid(f)} 孩子 — ${f.possible ? '可能' : '不可能'}`,
  ),

  metaDesc: T<(f: HeredityFacts) => string>(
    f => `${dad(f)} 와 ${mom(f)} 사이에서 ${kid(f)} 아이가 나올 수 있는지 퍼넷 사각형으로 풀었습니다. ${f.possible ? `유전자형에 따라 ${span(f)}입니다.` : '어느 유전자형으로도 나오지 않습니다.'}`,
    f => `Whether ${dad(f)} and ${mom(f)} parents can have a ${kid(f)} child, worked out with a Punnett square. ${f.possible ? `${span(f)}, depending on their genotypes.` : 'No genotype combination produces it.'}`,
    f => `Si unos padres ${dad(f)} y ${mom(f)} pueden tener un hijo ${kid(f)}, resuelto con un cuadro de Punnett. ${f.possible ? `${span(f)} según sus genotipos.` : 'Ninguna combinación de genotipos lo produce.'}`,
    f => `Se pais ${dad(f)} e ${mom(f)} podem ter um filho ${kid(f)}, resolvido com um quadrado de Punnett. ${f.possible ? `${span(f)} conforme os genótipos.` : 'Nenhuma combinação de genótipos o produz.'}`,
    f => `${dad(f)} と ${mom(f)} の親から ${kid(f)} の子が生まれうるかをパネットの方形で解きました。${f.possible ? `遺伝子型によって${span(f)}です。` : 'どの遺伝子型でも生まれません。'}`,
    f => `Ob Eltern mit ${dad(f)} und ${mom(f)} ein Kind mit ${kid(f)} bekommen können — mit einem Punnett-Quadrat hergeleitet. ${f.possible ? `${span(f)}, je nach Genotyp.` : 'Keine Genotypkombination bringt es hervor.'}`,
    f => `Si des parents ${dad(f)} et ${mom(f)} peuvent avoir un enfant ${kid(f)}, établi par un échiquier de Punnett. ${f.possible ? `${span(f)} selon leurs génotypes.` : 'Aucune combinaison de génotypes ne le donne.'}`,
    f => `${dad(f)} और ${mom(f)} माता-पिता से ${kid(f)} संतान संभव है या नहीं, पनेट वर्ग से। ${f.possible ? `जीनोटाइप के अनुसार ${span(f)}।` : 'किसी भी जीनोटाइप संयोजन से नहीं।'}`,
    f => `${dad(f)} 和 ${mom(f)} 的父母能不能生出 ${kid(f)} 的孩子，用庞纳特方格推出来。${f.possible ? `看基因型，${span(f)}。` : '任何基因型组合都生不出。'}`,
    f => `${dad(f)} 和 ${mom(f)} 的父母能不能生出 ${kid(f)} 的孩子，用龐納特方格推出來。${f.possible ? `看基因型，${span(f)}。` : '任何基因型組合都生不出。'}`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'A형 부모에게서 O형 아이가 나올 수 있나요?', a: '나올 수 있습니다. A형은 AA일 수도 AO일 수도 있는데, 부모가 둘 다 AO이면 넷 중 하나꼴로 OO, 곧 O형이 됩니다. 부모가 겉으로는 둘 다 A형이라도 O를 숨겨 갖고 있는 것입니다.' },
      { q: 'AB형과 O형 부모에게서는 왜 AB형이 안 나오나요?', a: 'AB형은 A와 B를 하나씩 물려받아야 하는데, O형 부모는 O밖에 줄 수 없기 때문입니다. 같은 이유로 O형도 안 나옵니다 — AB형 부모가 O를 갖고 있지 않으니까요. 남는 것은 A형과 B형뿐입니다.' },
      { q: 'Rh+ 부모에게서 Rh− 아이가 나올 수 있나요?', a: '나올 수 있습니다. Rh+ 는 DD일 수도 Dd일 수도 있어, 부모가 둘 다 Dd이면 넷 중 하나가 dd입니다. 거꾸로 Rh− 부모 둘에게서 Rh+ 아이는 나오지 않습니다.' },
      { q: '이 표로 친자를 가릴 수 있나요?', a: '없습니다. 불가능한 조합을 말해 줄 수는 있어도 가능하다고 해서 친자라는 뜻은 아니고, 봄베이 표현형이나 cis-AB 같은 드문 예외가 있어 배제조차 확정이 아닙니다. 친자 확인은 DNA 검사가 합니다.' },
    ],
    [
      { q: 'Can two A parents have an O child?', a: 'Yes. An A person may be AA or AO, and if both parents are AO then one child in four is OO — group O. Both parents look like A while quietly carrying an O.' },
      { q: 'Why can an AB and an O parent not have an AB child?', a: 'An AB child needs an A from one side and a B from the other, and the O parent has only O to give. The same reasoning rules out an O child, since the AB parent carries no O. That leaves A and B.' },
      { q: 'Can Rh+ parents have an Rh− child?', a: 'Yes. Rh+ may be DD or Dd, so if both parents are Dd, one child in four is dd. The reverse does not happen: two Rh− parents cannot have an Rh+ child.' },
      { q: 'Can this chart settle parentage?', a: 'No. It can name impossible combinations, but a possible one proves nothing, and rare exceptions like the Bombay phenotype or cis-AB mean even the exclusions are not certainties. Parentage is settled by DNA testing.' },
    ],
    [
      { q: '¿Pueden dos padres A tener un hijo O?', a: 'Sí. Una persona A puede ser AA o AO, y si ambos son AO, uno de cada cuatro hijos es OO, es decir grupo O. Los dos parecen A mientras llevan una O escondida.' },
      { q: '¿Por qué un progenitor AB y otro O no pueden tener un hijo AB?', a: 'Un hijo AB necesita una A de un lado y una B del otro, y el progenitor O solo puede dar O. Por lo mismo queda descartado el hijo O, porque el progenitor AB no lleva ninguna O. Quedan A y B.' },
      { q: '¿Pueden unos padres Rh+ tener un hijo Rh−?', a: 'Sí. Rh+ puede ser DD o Dd, así que si ambos son Dd, uno de cada cuatro es dd. Lo contrario no ocurre: dos progenitores Rh− no pueden tener un hijo Rh+.' },
      { q: '¿Sirve esta tabla para determinar la paternidad?', a: 'No. Puede señalar combinaciones imposibles, pero una posible no prueba nada, y excepciones raras como el fenotipo Bombay o el cis-AB hacen que ni las exclusiones sean certezas. La paternidad la determina una prueba de ADN.' },
    ],
    [
      { q: 'Dois pais A podem ter um filho O?', a: 'Podem. Uma pessoa A pode ser AA ou AO, e se ambos forem AO, um filho em quatro é OO — grupo O. Os dois parecem A carregando um O escondido.' },
      { q: 'Por que um pai AB e outro O não podem ter um filho AB?', a: 'Um filho AB precisa de um A de um lado e um B do outro, e o pai O só tem O para dar. Pelo mesmo motivo fica excluído o filho O, pois o pai AB não carrega nenhum O. Sobram A e B.' },
      { q: 'Pais Rh+ podem ter um filho Rh−?', a: 'Podem. Rh+ pode ser DD ou Dd, então se ambos forem Dd, um filho em quatro é dd. O inverso não acontece: dois pais Rh− não têm filho Rh+.' },
      { q: 'Esta tabela resolve paternidade?', a: 'Não. Ela aponta combinações impossíveis, mas uma possível não prova nada, e exceções raras como o fenótipo Bombaim ou o cis-AB fazem com que nem as exclusões sejam certezas. Paternidade se resolve com exame de DNA.' },
    ],
    [
      { q: 'A型の両親からO型の子が生まれますか。', a: '生まれます。A型はAAかもAOかもしれず、両親ともAOなら四人に一人はOO、つまりO型です。二人とも見た目はA型のままOを隠し持っているわけです。' },
      { q: 'AB型とO型の親からなぜAB型が生まれないのですか。', a: 'AB型になるには片方からA、もう片方からBをもらう必要がありますが、O型の親はOしか渡せないからです。同じ理由でO型も生まれません — AB型の親はOを持っていないからです。残るのはA型とB型だけです。' },
      { q: 'Rh+ の両親からRh− の子が生まれますか。', a: '生まれます。Rh+ はDDかDdなので、両親ともDdなら四人に一人がddです。逆はなく、Rh− の親二人からRh+ の子は生まれません。' },
      { q: 'この表で親子鑑定ができますか。', a: 'できません。不可能な組み合わせは言えても、可能だからといって親子だという意味にはならず、ボンベイ型やcis-ABのような例外があるので除外すら確定ではありません。親子鑑定はDNA検査が行います。' },
    ],
    [
      { q: 'Können zwei Eltern mit A ein Kind mit O bekommen?', a: 'Ja. Ein A-Mensch kann AA oder AO sein; sind beide AO, ist jedes vierte Kind OO, also Gruppe O. Beide sehen nach A aus und tragen still ein O mit.' },
      { q: 'Warum können AB und O kein AB-Kind bekommen?', a: 'Ein AB-Kind braucht ein A von der einen und ein B von der anderen Seite, und der O-Elternteil hat nur O zu vergeben. Aus demselben Grund fällt auch ein O-Kind aus, denn der AB-Elternteil trägt kein O. Übrig bleiben A und B.' },
      { q: 'Können Rh+ Eltern ein Rh− Kind bekommen?', a: 'Ja. Rh+ kann DD oder Dd sein; sind beide Dd, ist jedes vierte Kind dd. Umgekehrt geht es nicht: zwei Rh− Eltern bekommen kein Rh+ Kind.' },
      { q: 'Lässt sich damit die Abstammung klären?', a: 'Nein. Die Tabelle kann unmögliche Kombinationen benennen, eine mögliche beweist aber nichts, und seltene Ausnahmen wie der Bombay-Phänotyp oder cis-AB machen selbst die Ausschlüsse unsicher. Über Abstammung entscheidet ein DNA-Test.' },
    ],
    [
      { q: 'Deux parents A peuvent-ils avoir un enfant O ?', a: 'Oui. Une personne A peut être AA ou AO ; si les deux sont AO, un enfant sur quatre est OO, donc groupe O. Tous deux paraissent A tout en portant discrètement un O.' },
      { q: 'Pourquoi un parent AB et un parent O ne peuvent-ils avoir un enfant AB ?', a: 'Un enfant AB doit recevoir un A d’un côté et un B de l’autre, or le parent O ne peut donner que du O. Pour la même raison, pas d’enfant O non plus, le parent AB ne portant aucun O. Restent A et B.' },
      { q: 'Des parents Rh+ peuvent-ils avoir un enfant Rh− ?', a: 'Oui. Rh+ peut être DD ou Dd : si les deux sont Dd, un enfant sur quatre est dd. L’inverse est exclu, deux parents Rh− n’ont pas d’enfant Rh+.' },
      { q: 'Ce tableau permet-il d’établir la filiation ?', a: 'Non. Il désigne des combinaisons impossibles, mais une combinaison possible ne prouve rien, et de rares exceptions comme le phénotype Bombay ou le cis-AB rendent même les exclusions incertaines. La filiation se tranche par test ADN.' },
    ],
    [
      { q: 'क्या दो A माता-पिता से O संतान हो सकती है?', a: 'हाँ। A वाला AA भी हो सकता है और AO भी; यदि दोनों AO हों तो चार में एक OO यानी O समूह होगा। दोनों बाहर से A दिखते हुए भीतर एक O लिए रहते हैं।' },
      { q: 'AB और O माता-पिता से AB क्यों नहीं होता?', a: 'AB बनने के लिए एक ओर से A और दूसरी ओर से B चाहिए, पर O वाला केवल O ही दे सकता है। इसी कारण O भी नहीं होता — AB वाले के पास कोई O नहीं। बचते हैं A और B।' },
      { q: 'क्या Rh+ माता-पिता से Rh− संतान हो सकती है?', a: 'हाँ। Rh+ DD भी हो सकता है और Dd भी; दोनों Dd हों तो चार में एक dd होगा। उल्टा नहीं होता: दो Rh− माता-पिता से Rh+ संतान नहीं होती।' },
      { q: 'क्या इस तालिका से पितृत्व तय होता है?', a: 'नहीं। यह असंभव संयोजन बता सकती है, पर संभव होना कुछ सिद्ध नहीं करता, और बॉम्बे फेनोटाइप या cis-AB जैसे दुर्लभ अपवादों के कारण बाहर करना भी निश्चित नहीं। पितृत्व DNA जाँच से तय होता है।' },
    ],
    [
      { q: '两个 A 型的父母能生出 O 型孩子吗？', a: '能。A 型可能是 AA，也可能是 AO；父母都是 AO 的话，四个孩子里会有一个 OO，也就是 O 型。两人表面上都是 A 型，其实各自藏着一个 O。' },
      { q: 'AB 型和 O 型的父母为什么生不出 AB 型？', a: 'AB 型要一边给 A、一边给 B，而 O 型的一方只能给 O。同样的道理，O 型也生不出来——AB 型的一方身上没有 O。剩下的只有 A 型和 B 型。' },
      { q: 'Rh+ 的父母能生出 Rh− 的孩子吗？', a: '能。Rh+ 可能是 DD，也可能是 Dd；父母都是 Dd 的话，四个里有一个是 dd。反过来不行：两个 Rh− 的父母生不出 Rh+ 的孩子。' },
      { q: '能用这张表判断亲子关系吗？', a: '不能。它能指出不可能的组合，但“可能”并不证明什么；再加上孟买型、cis-AB 这类罕见例外，连排除也不是定论。亲子关系由 DNA 检测判定。' },
    ],
    [
      { q: '兩個 A 型的父母能生出 O 型孩子嗎？', a: '能。A 型可能是 AA，也可能是 AO；父母都是 AO 的話，四個孩子裡會有一個 OO，也就是 O 型。兩人表面上都是 A 型，其實各自藏著一個 O。' },
      { q: 'AB 型和 O 型的父母為什麼生不出 AB 型？', a: 'AB 型要一邊給 A、一邊給 B，而 O 型的一方只能給 O。同樣的道理，O 型也生不出來——AB 型的一方身上沒有 O。剩下的只有 A 型和 B 型。' },
      { q: 'Rh+ 的父母能生出 Rh− 的孩子嗎？', a: '能。Rh+ 可能是 DD，也可能是 Dd；父母都是 Dd 的話，四個裡有一個是 dd。反過來不行：兩個 Rh− 的父母生不出 Rh+ 的孩子。' },
      { q: '能用這張表判斷親子關係嗎？', a: '不能。它能指出不可能的組合，但「可能」並不證明什麼；再加上孟買型、cis-AB 這類罕見例外，連排除也不是定論。親子關係由 DNA 檢測判定。' },
    ],
  ),

  cellFaq: T<(f: HeredityFacts) => FaqItem[]>(
    f => [
      { q: `${dad(f)} 와 ${mom(f)} 사이에서 ${kid(f)} 아이가 나올 수 있나요?`, a: f.possible ? `나올 수 있습니다. 부모의 유전자형에 따라 ${span(f)}입니다.` : `나오지 않습니다. 어느 유전자형 조합으로도 만들 수 없습니다.` },
      { q: `이 부모에게서 나올 수 있는 혈액형은 무엇인가요?`, a: `${f.possibleChildren.length}가지입니다. 나올 수 없는 것은 ${f.impossibleChildren.length}가지입니다.` },
      { q: `왜 확률이 하나로 안 나오나요?`, a: f.fatherFixed && f.motherFixed ? `이 부모는 유전자형이 하나로 정해져 확률도 하나입니다 — ${f.maxChance}%입니다.` : `부모의 혈액형만으로는 유전자형이 정해지지 않기 때문입니다. 갈래가 ${f.routes.length || 1}가지라 ${span(f)} 사이입니다.` },
      { q: `아버지와 어머니를 바꾸면 달라지나요?`, a: `달라지지 않습니다. ABO도 Rh도 성염색체에 있지 않습니다.` },
    ],
    f => [
      { q: `Can ${dad(f)} and ${mom(f)} parents have a ${kid(f)} child?`, a: f.possible ? `Yes — ${span(f)}, depending on their genotypes.` : `No. No combination of parental genotypes can produce it.` },
      { q: `Which blood types can these parents have?`, a: `${f.possibleChildren.length} of the eight are possible; ${f.impossibleChildren.length} are ruled out.` },
      { q: `Why is the probability not a single number?`, a: f.fatherFixed && f.motherFixed ? `Here it is: both parents have only one possible genotype, so the answer is ${f.maxChance}%.` : `Because a parent's blood type does not pin down their genotype. There are ${f.routes.length || 1} routes, giving ${span(f)}.` },
      { q: `Does it change if you swap father and mother?`, a: `No. Neither ABO nor Rh sits on a sex chromosome.` },
    ],
    f => [
      { q: `¿Pueden unos padres ${dad(f)} y ${mom(f)} tener un hijo ${kid(f)}?`, a: f.possible ? `Sí: ${span(f)} según sus genotipos.` : `No. Ninguna combinación de genotipos puede producirlo.` },
      { q: `¿Qué grupos pueden tener estos padres?`, a: `${f.possibleChildren.length} de los ocho son posibles; ${f.impossibleChildren.length} quedan descartados.` },
      { q: `¿Por qué la probabilidad no es un solo número?`, a: f.fatherFixed && f.motherFixed ? `Aquí sí lo es: ambos tienen un único genotipo posible, así que la respuesta es ${f.maxChance}%.` : `Porque el grupo de un progenitor no fija su genotipo. Hay ${f.routes.length || 1} vías, de ahí ${span(f)}.` },
      { q: `¿Cambia si se intercambian padre y madre?`, a: `No. Ni el ABO ni el Rh están en un cromosoma sexual.` },
    ],
    f => [
      { q: `Pais ${dad(f)} e ${mom(f)} podem ter um filho ${kid(f)}?`, a: f.possible ? `Podem: ${span(f)} conforme os genótipos.` : `Não. Nenhuma combinação de genótipos consegue produzi-lo.` },
      { q: `Que tipos estes pais podem ter?`, a: `${f.possibleChildren.length} dos oito são possíveis; ${f.impossibleChildren.length} ficam excluídos.` },
      { q: `Por que a probabilidade não é um número só?`, a: f.fatherFixed && f.motherFixed ? `Aqui é: ambos têm um único genótipo possível, então a resposta é ${f.maxChance}%.` : `Porque o tipo de um progenitor não fixa seu genótipo. São ${f.routes.length || 1} caminhos, daí ${span(f)}.` },
      { q: `Muda se trocar pai e mãe?`, a: `Não muda. Nem o ABO nem o Rh ficam num cromossomo sexual.` },
    ],
    f => [
      { q: `${dad(f)} と ${mom(f)} の親から ${kid(f)} の子は生まれますか。`, a: f.possible ? `生まれえます。親の遺伝子型によって${span(f)}です。` : `生まれません。どの遺伝子型の組み合わせでも作れません。` },
      { q: `この親から生まれうる血液型は何ですか。`, a: `八つのうち${f.possibleChildren.length}種類です。生まれないのが${f.impossibleChildren.length}種類あります。` },
      { q: `なぜ確率が一つに決まらないのですか。`, a: f.fatherFixed && f.motherFixed ? `ここでは決まります。二人とも遺伝子型が一つなので${f.maxChance}%です。` : `親の血液型だけでは遺伝子型が定まらないからです。道筋が${f.routes.length || 1}通りあり、${span(f)}になります。` },
      { q: `父と母を入れ替えると変わりますか。`, a: `変わりません。ABOもRhも性染色体にありません。` },
    ],
    f => [
      { q: `Können Eltern mit ${dad(f)} und ${mom(f)} ein Kind mit ${kid(f)} bekommen?`, a: f.possible ? `Ja — ${span(f)}, je nach Genotyp.` : `Nein. Keine Kombination elterlicher Genotypen bringt es hervor.` },
      { q: `Welche Blutgruppen sind bei diesen Eltern möglich?`, a: `${f.possibleChildren.length} der acht sind möglich, ${f.impossibleChildren.length} ausgeschlossen.` },
      { q: `Warum ist die Wahrscheinlichkeit keine einzelne Zahl?`, a: f.fatherFixed && f.motherFixed ? `Hier ist sie es: beide Eltern haben nur einen Genotyp, also ${f.maxChance}%.` : `Weil die Blutgruppe eines Elternteils seinen Genotyp nicht festlegt. Es gibt ${f.routes.length || 1} Wege, daher ${span(f)}.` },
      { q: `Ändert sich etwas, wenn man Vater und Mutter tauscht?`, a: `Nein. Weder ABO noch Rhesus liegt auf einem Geschlechtschromosom.` },
    ],
    f => [
      { q: `Des parents ${dad(f)} et ${mom(f)} peuvent-ils avoir un enfant ${kid(f)} ?`, a: f.possible ? `Oui — ${span(f)} selon leurs génotypes.` : `Non. Aucune combinaison de génotypes parentaux ne le donne.` },
      { q: `Quels groupes ces parents peuvent-ils avoir ?`, a: `${f.possibleChildren.length} des huit sont possibles, ${f.impossibleChildren.length} sont exclus.` },
      { q: `Pourquoi la probabilité n’est-elle pas un seul chiffre ?`, a: f.fatherFixed && f.motherFixed ? `Ici elle l’est : les deux parents n’ont qu’un génotype, donc ${f.maxChance}%.` : `Parce que le groupe d’un parent ne fixe pas son génotype. Il y a ${f.routes.length || 1} voies, d’où ${span(f)}.` },
      { q: `Cela change-t-il si l’on échange père et mère ?`, a: `Non. Ni ABO ni Rhésus ne siège sur un chromosome sexuel.` },
    ],
    f => [
      { q: `क्या ${dad(f)} और ${mom(f)} माता-पिता से ${kid(f)} संतान हो सकती है?`, a: f.possible ? `हाँ — जीनोटाइप के अनुसार ${span(f)}।` : `नहीं। किसी भी जीनोटाइप संयोजन से नहीं।` },
      { q: `इन माता-पिता से कौन-से समूह संभव हैं?`, a: `आठ में से ${f.possibleChildren.length} संभव हैं, ${f.impossibleChildren.length} असंभव।` },
      { q: `संभावना एक ही संख्या क्यों नहीं?`, a: f.fatherFixed && f.motherFixed ? `यहाँ है: दोनों का जीनोटाइप एक ही है, इसलिए ${f.maxChance}%।` : `क्योंकि माता-पिता का समूह उनका जीनोटाइप तय नहीं करता। ${f.routes.length || 1} रास्ते हैं, इसलिए ${span(f)}।` },
      { q: `पिता और माता बदलने से बदलेगा?`, a: `नहीं। ABO और Rh दोनों लिंग गुणसूत्र पर नहीं हैं।` },
    ],
    f => [
      { q: `${dad(f)} 和 ${mom(f)} 的父母能生出 ${kid(f)} 的孩子吗？`, a: f.possible ? `能——看基因型，${span(f)}。` : `不能。任何基因型组合都做不到。` },
      { q: `这对父母能生出哪些血型？`, a: `八种里有 ${f.possibleChildren.length} 种可能，${f.impossibleChildren.length} 种被排除。` },
      { q: `为什么概率不是一个确定的数？`, a: f.fatherFixed && f.motherFixed ? `这里是确定的：两位的基因型都只有一种，所以是 ${f.maxChance}%。` : `因为父母的血型定不出基因型。路径有 ${f.routes.length || 1} 条，所以是 ${span(f)}。` },
      { q: `把父母调换会不一样吗？`, a: `不会。ABO 和 Rh 都不在性染色体上。` },
    ],
    f => [
      { q: `${dad(f)} 和 ${mom(f)} 的父母能生出 ${kid(f)} 的孩子嗎？`, a: f.possible ? `能——看基因型，${span(f)}。` : `不能。任何基因型組合都做不到。` },
      { q: `這對父母能生出哪些血型？`, a: `八種裡有 ${f.possibleChildren.length} 種可能，${f.impossibleChildren.length} 種被排除。` },
      { q: `為什麼機率不是一個確定的數？`, a: f.fatherFixed && f.motherFixed ? `這裡是確定的：兩位的基因型都只有一種，所以是 ${f.maxChance}%。` : `因為父母的血型定不出基因型。路徑有 ${f.routes.length || 1} 條，所以是 ${span(f)}。` },
      { q: `把父母調換會不一樣嗎？`, a: `不會。ABO 和 Rh 都不在性染色體上。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const HEREDITY_UI: L<HeredityUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<HeredityUI>;
