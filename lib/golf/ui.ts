/**
 * 골프 핸디캡 화면의 문구 — 열 언어.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { GolfFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface GolfUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  scoreLabel: string;
  slopeLabel: string;
  overLabel: string;
  diffLabel: string;
  factorLabel: string;
  standardLabel: string;
  courseHcpLabel: string;
  ratingLabel: string;
  formulaTitle: string;
  formulaNote: string;
  slopeTitle: string;
  slopeNote: string;
  indexTitle: string;
  indexNote: string;
  backTitle: string;
  backNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  scoreRowTitle: string;
  slopeRowTitle: string;
  desc: (f: GolfFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: GolfFacts) => string;
  metaDesc: (f: GolfFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: GolfFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof GolfUI]: L<GolfUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('골프 핸디캡', 'Golf handicap', 'Hándicap de golf', 'Handicap de golfe', 'ゴルフのハンディキャップ', 'Golf-Handicap', 'Handicap de golf', 'गोल्फ हैंडीकैप', '高尔夫差点', '高爾夫差點'),

  hubTitle: T(
    '골프 핸디캡 100칸 — 같은 90타가 코스마다 다른 실력입니다',
    '100 handicap cells — the same 90 means different things on different courses',
    '100 casillas de hándicap — los mismos 90 golpes valen distinto en cada campo',
    '100 células de handicap — os mesmos 90 valem diferente em cada campo',
    'ゴルフのハンディキャップ100マス — 同じ90打がコースごとに違う実力です',
    '100 Handicap-Felder — dieselbe 90 bedeutet auf jedem Platz etwas anderes',
    '100 cases de handicap — le même 90 ne vaut pas pareil selon le parcours',
    '100 हैंडीकैप खाने — वही 90 हर कोर्स पर अलग मायने रखता है',
    '100 格差点 — 同样打 90 杆，在不同球场含金量不同',
    '100 格差點 — 同樣打 90 桿，在不同球場含金量不同',
  ),

  hubLead: T(
    '세계 핸디캡 시스템은 코스의 난이도를 두 수로 적습니다. 코스 레이팅은 스크래치 골퍼가 칠 타수이고, 슬로프 레이팅은 보통 골퍼가 얼마나 더 고전하는지입니다. 스코어 열 가지와 슬로프 열 가지가 만나는 칸마다 디퍼렌셜을 계산했습니다.',
    'The World Handicap System writes a course’s difficulty as two numbers: the Course Rating is what a scratch golfer is expected to shoot, and the Slope Rating says how much harder an average player finds it. Every meeting of 10 scores and 10 slope ratings gets its score differential worked out.',
    'El Sistema Mundial de Hándicap describe la dificultad con dos números: el Course Rating es lo que se espera de un jugador scratch, y el Slope Rating dice cuánto más le cuesta a un jugador medio. Cada cruce de 10 resultados y 10 slopes trae su diferencial calculado.',
    'O Sistema Mundial de Handicap descreve a dificuldade com dois números: o Course Rating é o que se espera de um jogador scratch, e o Slope Rating diz o quanto um jogador médio sofre mais. Cada cruzamento de 10 resultados e 10 slopes traz seu diferencial calculado.',
    '世界ハンディキャップシステムはコースの難しさを2つの数で表します。コースレーティングはスクラッチゴルファーが出す打数、スロープレーティングは普通のゴルファーがどれだけ苦戦するかです。スコア10通りとスロープ10通りが出会う各マスのディファレンシャルを計算しました。',
    'Das World Handicap System beschreibt die Schwierigkeit eines Platzes mit zwei Zahlen: Das Course Rating ist, was ein Scratch-Golfer spielt, das Slope Rating sagt, wie viel schwerer es ein Durchschnittsspieler hat. Für jede Begegnung von 10 Ergebnissen und 10 Slope-Werten steht das Score Differential.',
    'Le World Handicap System décrit la difficulté d’un parcours par deux nombres : le Course Rating est le score attendu d’un joueur scratch, le Slope Rating dit combien un joueur moyen peine davantage. Chaque croisement de 10 scores et 10 slopes donne son différentiel.',
    'विश्व हैंडीकैप प्रणाली कोर्स की कठिनाई दो संख्याओं में लिखती है: कोर्स रेटिंग वह स्कोर है जो स्क्रैच गोल्फ़र से अपेक्षित है, और स्लोप रेटिंग बताती है कि औसत खिलाड़ी को कितना अधिक कठिन लगता है। 10 स्कोरों और 10 स्लोपों के हर मेल का डिफ़रेंशियल यहाँ है।',
    '世界差点系统用两个数字描述球场难度：Course Rating 是零差点球手的预期杆数，Slope Rating 表示普通球手比他难多少。10 种成绩与 10 种坡度值交汇的每一格，都算出差值。',
    '世界差點系統用兩個數字描述球場難度：Course Rating 是零差點球手的預期桿數，Slope Rating 表示普通球手比他難多少。10 種成績與 10 種坡度值交匯的每一格，都算出差值。',
  ),

  scoreLabel: T('조정 총타수', 'Adjusted gross score', 'Resultado bruto ajustado', 'Resultado bruto ajustado', '調整後総打数', 'Bereinigtes Bruttoergebnis', 'Score brut ajusté', 'समायोजित कुल स्कोर', '调整后总杆', '調整後總桿'),
  slopeLabel: T('슬로프 레이팅', 'Slope Rating', 'Slope Rating', 'Slope Rating', 'スロープレーティング', 'Slope Rating', 'Slope Rating', 'स्लोप रेटिंग', '坡度值', '坡度值'),
  overLabel: T('파에 견준 타수', 'Strokes over par', 'Golpes sobre par', 'Tacadas sobre o par', 'パーに対する打数', 'Schläge über Par', 'Coups au-dessus du par', 'पार से ऊपर स्ट्रोक', '相对标准杆', '相對標準桿'),
  diffLabel: T('스코어 디퍼렌셜', 'Score Differential', 'Diferencial', 'Diferencial', 'スコアディファレンシャル', 'Score Differential', 'Différentiel', 'स्कोर डिफ़रेंशियल', '成绩差值', '成績差值'),
  factorLabel: T('슬로프 보정', 'Slope factor', 'Factor de slope', 'Fator de slope', 'スロープ補正', 'Slope-Faktor', 'Facteur de slope', 'स्लोप गुणक', '坡度修正', '坡度修正'),
  standardLabel: T('표준 코스였다면', 'On a standard course', 'En un campo estándar', 'Num campo padrão', '標準コースなら', 'Auf einem Standardplatz', 'Sur un parcours standard', 'मानक कोर्स पर', '在标准球场上', '在標準球場上'),
  courseHcpLabel: T('코스 핸디캡', 'Course Handicap', 'Hándicap de campo', 'Handicap do campo', 'コースハンディキャップ', 'Course Handicap', 'Handicap de parcours', 'कोर्स हैंडीकैप', '球场差点', '球場差點'),
  ratingLabel: T('코스 레이팅', 'Course Rating', 'Course Rating', 'Course Rating', 'コースレーティング', 'Course Rating', 'Course Rating', 'कोर्स रेटिंग', '球场难度值', '球場難度值'),

  formulaTitle: T('식은 곱셈 하나입니다', 'The formula is one multiplication', 'La fórmula es una multiplicación', 'A fórmula é uma multiplicação', '式は掛け算ひとつです', 'Die Formel ist eine Multiplikation', 'La formule est une multiplication', 'सूत्र एक गुणा है', '公式只是一次乘法', '公式只是一次乘法'),

  formulaNote: T(
    '디퍼렌셜 = (조정 총타수 − 코스 레이팅) × 113 ÷ 슬로프 레이팅입니다. 113은 표준 난이도의 슬로프라, 슬로프가 113인 코스에서는 곱하는 값이 1이 되어 아무것도 바꾸지 않습니다. 이 표는 파 72에 코스 레이팅 72.0인 코스를 상정해 슬로프만의 효과가 보이도록 했습니다.',
    'Differential = (adjusted gross score − Course Rating) × 113 ÷ Slope Rating. 113 is the slope of a course of standard difficulty, so on such a course the multiplier is exactly one and changes nothing. This table assumes a par-72 course rated 72.0, which isolates what the slope alone does.',
    'Diferencial = (resultado bruto ajustado − Course Rating) × 113 ÷ Slope Rating. 113 es el slope de un campo de dificultad estándar: allí el multiplicador vale uno y no cambia nada. Esta tabla supone un campo par 72 con rating 72,0, para aislar el efecto del slope.',
    'Diferencial = (resultado bruto ajustado − Course Rating) × 113 ÷ Slope Rating. 113 é o slope de um campo de dificuldade padrão: ali o multiplicador vale um e nada muda. Esta tabela supõe um campo par 72 com rating 72,0, isolando o efeito do slope.',
    'ディファレンシャル = (調整後総打数 − コースレーティング) × 113 ÷ スロープレーティングです。113は標準難度のスロープなので、スロープが113のコースでは掛ける値が1になり何も変えません。この表はパー72・コースレーティング72.0のコースを想定し、スロープだけの効果が見えるようにしました。',
    'Differential = (bereinigtes Bruttoergebnis − Course Rating) × 113 ÷ Slope Rating. 113 ist der Slope eines Platzes mit Standardschwierigkeit; dort ist der Faktor genau eins und ändert nichts. Diese Tabelle nimmt einen Par-72-Platz mit Rating 72,0 an, damit allein der Slope sichtbar wird.',
    'Différentiel = (score brut ajusté − Course Rating) × 113 ÷ Slope Rating. 113 est le slope d’un parcours de difficulté standard : le multiplicateur y vaut un et ne change rien. Ce tableau suppose un par 72 noté 72,0, ce qui isole l’effet du seul slope.',
    'डिफ़रेंशियल = (समायोजित कुल स्कोर − कोर्स रेटिंग) × 113 ÷ स्लोप रेटिंग। 113 मानक कठिनाई का स्लोप है, इसलिए ऐसे कोर्स पर गुणक ठीक एक होता है और कुछ नहीं बदलता। यह तालिका पार 72 और रेटिंग 72.0 वाला कोर्स मानती है, ताकि केवल स्लोप का असर दिखे।',
    '差值 =（调整后总杆 − Course Rating）× 113 ÷ Slope Rating。113 是标准难度球场的坡度值，所以在这样的球场上乘数正好是 1，什么都不改变。本表设定为标准杆 72、Course Rating 72.0 的球场，好把坡度单独的作用显出来。',
    '差值 =（調整後總桿 − Course Rating）× 113 ÷ Slope Rating。113 是標準難度球場的坡度值，所以在這樣的球場上乘數正好是 1，什麼都不改變。本表設定為標準桿 72、Course Rating 72.0 的球場，好把坡度單獨的作用顯出來。',
  ),

  slopeTitle: T('어려운 코스일수록 같은 타수가 좋아집니다', 'A harder course makes the same score better', 'Cuanto más difícil el campo, mejor vale el mismo resultado', 'Quanto mais difícil o campo, melhor vale o mesmo resultado', '難しいコースほど同じ打数が良くなります', 'Je schwerer der Platz, desto besser dasselbe Ergebnis', 'Plus le parcours est dur, meilleur devient le même score', 'कोर्स जितना कठिन, वही स्कोर उतना बेहतर', '球场越难，同样的杆数越有含金量', '球場越難，同樣的桿數越有含金量'),

  slopeNote: T(
    '슬로프가 클수록 113을 나누는 수가 커져 디퍼렌셜이 작아집니다. 슬로프 155인 어려운 코스에서 90타를 쳤다면 슬로프 95인 쉬운 코스의 90타보다 훨씬 좋은 성적입니다. 규정이 두는 슬로프의 범위는 55에서 155이고, 대부분의 코스가 105에서 145 사이에 놓입니다.',
    'A bigger slope divides 113 by more, so the differential comes out smaller. Ninety strokes on a slope-155 course is a far better round than ninety on a slope-95 course. The rules allow slopes from 55 to 155, and most courses land between 105 and 145.',
    'Un slope mayor divide 113 entre más, así que el diferencial sale menor. Noventa golpes en un campo de slope 155 es una vuelta mucho mejor que noventa en uno de slope 95. La norma permite slopes de 55 a 155, y la mayoría de campos cae entre 105 y 145.',
    'Um slope maior divide 113 por mais, então o diferencial sai menor. Noventa tacadas num campo de slope 155 é uma volta bem melhor que noventa num de slope 95. A norma permite slopes de 55 a 155, e a maioria dos campos fica entre 105 e 145.',
    'スロープが大きいほど113を割る数が大きくなり、ディファレンシャルは小さくなります。スロープ155の難しいコースで90打なら、スロープ95の易しいコースの90打よりずっと良い成績です。規定が置くスロープの範囲は55から155で、多くのコースは105から145の間に収まります。',
    'Ein größerer Slope teilt 113 durch mehr, das Differential fällt also kleiner aus. Neunzig Schläge auf einem Slope-155-Platz sind eine weit bessere Runde als neunzig auf einem Slope-95-Platz. Erlaubt sind Slopes von 55 bis 155; die meisten Plätze liegen zwischen 105 und 145.',
    'Un slope plus élevé divise 113 par davantage : le différentiel diminue. Quatre-vingt-dix coups sur un parcours de slope 155 valent bien mieux que quatre-vingt-dix sur un slope 95. La règle admet des slopes de 55 à 155, la plupart des parcours se situant entre 105 et 145.',
    'बड़ा स्लोप 113 को अधिक से भाग देता है, सो डिफ़रेंशियल छोटा निकलता है। स्लोप 155 वाले कठिन कोर्स पर 90 स्ट्रोक, स्लोप 95 वाले आसान कोर्स के 90 से कहीं बेहतर राउंड है। नियम 55 से 155 तक स्लोप देते हैं, और अधिकतर कोर्स 105 से 145 के बीच पड़ते हैं।',
    '坡度值越大，113 除以的数就越大，差值也就越小。在坡度 155 的难场打 90 杆，比在坡度 95 的易场打 90 杆好得多。规则允许的坡度范围是 55 到 155，多数球场落在 105 到 145 之间。',
    '坡度值越大，113 除以的數就越大，差值也就越小。在坡度 155 的難場打 90 桿，比在坡度 95 的易場打 90 桿好得多。規則允許的坡度範圍是 55 到 155，多數球場落在 105 到 145 之間。',
  ),

  indexTitle: T('한 라운드는 인덱스가 아닙니다', 'One round is not an index', 'Una vuelta no es un hándicap', 'Uma volta não é um handicap', '1ラウンドはインデックスではありません', 'Eine Runde ist kein Index', 'Une partie n’est pas un index', 'एक राउंड इंडेक्स नहीं है', '一轮成绩不是差点指数', '一輪成績不是差點指數'),

  indexNote: T(
    '핸디캡 인덱스는 최근 스무 라운드의 디퍼렌셜 가운데 좋은 여덟 개를 평균한 값입니다. 그러니 이 표가 내는 것은 인덱스가 아니라 **한 라운드가 내는 디퍼렌셜**입니다. 좋은 날 한 번으로 인덱스가 크게 내려가지 않는 것도 이 평균 때문입니다 — 스무 개 가운데 여덟 개만 세니, 나머지 열둘은 아무 영향이 없습니다.',
    'A Handicap Index is the average of the best eight differentials from your last twenty rounds. What this table gives is therefore not an index but **the differential a single round produces**. That averaging is also why one good day barely moves an index: only eight of twenty scores count, and the other twelve do nothing.',
    'El hándicap es la media de los ocho mejores diferenciales de las últimas veinte vueltas. Lo que da esta tabla no es un hándicap, sino **el diferencial de una sola vuelta**. Esa media explica también que un buen día apenas mueva el hándicap: solo cuentan ocho de veinte, y las otras doce no hacen nada.',
    'O handicap é a média dos oito melhores diferenciais das últimas vinte voltas. O que esta tabela dá não é um handicap, mas **o diferencial de uma única volta**. Essa média explica ainda por que um bom dia quase não mexe no handicap: contam só oito de vinte, e as outras doze não fazem nada.',
    'ハンディキャップインデックスは直近20ラウンドのディファレンシャルのうち良い8つを平均した値です。だからこの表が出すのはインデックスではなく**1ラウンドが出すディファレンシャル**です。良い日が一度あってもインデックスが大きく下がらないのもこの平均のためで、20のうち8しか数えないので残り12は何の影響もありません。',
    'Ein Handicap Index ist der Durchschnitt der besten acht Differentiale aus den letzten zwanzig Runden. Diese Tabelle liefert daher keinen Index, sondern **das Differential einer einzelnen Runde**. Diese Mittelung erklärt auch, warum ein guter Tag den Index kaum bewegt: nur acht von zwanzig zählen, die übrigen zwölf gar nicht.',
    'Un index de handicap est la moyenne des huit meilleurs différentiels des vingt dernières parties. Ce tableau ne donne donc pas un index mais **le différentiel d’une seule partie**. Cette moyenne explique aussi qu’un bon jour bouge à peine l’index : seuls huit scores sur vingt comptent, les douze autres ne pèsent rien.',
    'हैंडीकैप इंडेक्स पिछले बीस राउंड के डिफ़रेंशियल में से आठ सर्वोत्तम का औसत है। इसलिए यह तालिका इंडेक्स नहीं, बल्कि **एक राउंड का डिफ़रेंशियल** देती है। यही औसत बताता है कि एक अच्छा दिन इंडेक्स को क्यों बहुत नहीं गिराता: बीस में से केवल आठ गिने जाते हैं, बाक़ी बारह का कोई असर नहीं।',
    '差点指数是最近二十轮里最好的八个差值的平均。所以本表给的不是指数，而是**一轮成绩产生的差值**。这个平均也解释了为什么打好一场，指数几乎不动——二十场里只算八场，其余十二场毫无影响。',
    '差點指數是最近二十輪裡最好的八個差值的平均。所以本表給的不是指數，而是**一輪成績產生的差值**。這個平均也解釋了為什麼打好一場，指數幾乎不動——二十場裡只算八場，其餘十二場毫無影響。',
  ),

  backTitle: T('코스 핸디캡은 다시 입히는 값입니다', 'The Course Handicap puts it back', 'El hándicap de campo lo vuelve a aplicar', 'O handicap do campo aplica de volta', 'コースハンディキャップは戻す値です', 'Das Course Handicap trägt es zurück', 'Le handicap de parcours le réapplique', 'कोर्स हैंडीकैप उसे वापस लगाता है', '球场差点是把它再套回去', '球場差點是把它再套回去'),

  backNote: T(
    '디퍼렌셜이 코스의 난이도를 걷어낸 값이라면, 코스 핸디캡은 그것을 다시 그 코스에 입히는 값입니다 — 인덱스 × 슬로프 ÷ 113 + (코스 레이팅 − 파). 이 표처럼 코스 레이팅이 파와 같으면 두 계산이 서로를 지워 원래 타수로 돌아옵니다. 그래서 오늘 칠 코스의 슬로프가 크면 받는 스트로크도 늘어납니다.',
    'If the differential strips a course’s difficulty out, the Course Handicap puts it back in: index × slope ÷ 113 + (Course Rating − par). Where the rating equals par, as here, the two steps cancel and you land on the original strokes. It also means that the tougher today’s course, the more strokes you receive.',
    'Si el diferencial quita la dificultad del campo, el hándicap de campo la devuelve: índice × slope ÷ 113 + (Course Rating − par). Cuando el rating iguala al par, como aquí, ambos pasos se anulan y se vuelve a los golpes originales. También implica que cuanto más duro sea el campo de hoy, más golpes recibes.',
    'Se o diferencial tira a dificuldade do campo, o handicap do campo a devolve: índice × slope ÷ 113 + (Course Rating − par). Quando o rating iguala o par, como aqui, os dois passos se anulam e voltamos às tacadas originais. Também significa que quanto mais duro o campo de hoje, mais tacadas você recebe.',
    'ディファレンシャルがコースの難しさを取り除いた値なら、コースハンディキャップはそれを再びそのコースに入れる値です — インデックス × スロープ ÷ 113 + (コースレーティング − パー)。この表のようにコースレーティングがパーと同じなら二つの計算が互いを打ち消し、元の打数に戻ります。つまり今日のコースのスロープが大きいほど受けるストロークも増えます。',
    'Wenn das Differential die Platzschwierigkeit herausrechnet, trägt das Course Handicap sie wieder ein: Index × Slope ÷ 113 + (Course Rating − Par). Stimmt das Rating mit Par überein wie hier, heben sich beide Schritte auf und man landet bei den ursprünglichen Schlägen. Je schwerer der heutige Platz, desto mehr Vorgabeschläge gibt es also.',
    'Si le différentiel retire la difficulté du parcours, le handicap de parcours la réintroduit : index × slope ÷ 113 + (Course Rating − par). Quand le rating égale le par, comme ici, les deux étapes s’annulent et l’on retombe sur les coups d’origine. D’où le fait que plus le parcours du jour est dur, plus on reçoit de coups.',
    'यदि डिफ़रेंशियल कोर्स की कठिनाई निकाल देता है, तो कोर्स हैंडीकैप उसे वापस लगाता है: इंडेक्स × स्लोप ÷ 113 + (कोर्स रेटिंग − पार)। जहाँ रेटिंग पार के बराबर है, जैसे यहाँ, दोनों चरण एक-दूसरे को काट देते हैं और मूल स्ट्रोक पर लौट आते हैं। मतलब आज का कोर्स जितना कठिन, उतने अधिक स्ट्रोक मिलते हैं।',
    '差值把球场难度剥掉，球场差点则把它再套回去：指数 × 坡度 ÷ 113 +（Course Rating − 标准杆）。像本表这样 Rating 等于标准杆时，两步互相抵消，回到原来的杆数。这也意味着今天的球场越难，你能得到的让杆越多。',
    '差值把球場難度剝掉，球場差點則把它再套回去：指數 × 坡度 ÷ 113 +（Course Rating − 標準桿）。像本表這樣 Rating 等於標準桿時，兩步互相抵消，回到原來的桿數。這也意味著今天的球場越難，你能得到的讓桿越多。',
  ),

  careTitle: T('이 표가 상정한 것', 'What this table assumes', 'Lo que supone esta tabla', 'O que esta tabela supõe', 'この表が前提としたもの', 'Was diese Tabelle voraussetzt', 'Ce que suppose ce tableau', 'यह तालिका क्या मानती है', '本表的前提', '本表的前提'),

  careNote: T(
    '파 72에 코스 레이팅 72.0인 코스를 상정했습니다. 실제 코스는 레이팅이 파보다 높거나 낮고, 그 차이가 계산에 그대로 들어갑니다. 또 조정 총타수는 홀마다 상한(네트 더블 보기)을 적용한 뒤의 값이라 실제로 적어 낸 타수와 다를 수 있고, 그날의 날씨 보정(PCC)이 붙기도 합니다.',
    'It assumes a par-72 course rated exactly 72.0. Real courses rate above or below par, and that gap enters the arithmetic directly. The adjusted gross score is also capped hole by hole at net double bogey, so it can differ from what you actually wrote down, and a playing-conditions adjustment may be applied for the day.',
    'Supone un campo par 72 con rating exactamente 72,0. Los campos reales están por encima o por debajo del par, y esa diferencia entra directa en la cuenta. El resultado bruto ajustado además se limita hoyo a hoyo al doble bogey neto, así que puede diferir de lo anotado, y puede aplicarse un ajuste por condiciones del día.',
    'Supõe um campo par 72 com rating exatamente 72,0. Campos reais ficam acima ou abaixo do par, e essa diferença entra direto na conta. O resultado bruto ajustado também é limitado buraco a buraco ao duplo bogey líquido, podendo diferir do anotado, e pode haver ajuste pelas condições do dia.',
    'パー72・コースレーティング72.0のコースを前提にしました。実際のコースはレーティングがパーより高かったり低かったりし、その差がそのまま計算に入ります。また調整後総打数はホールごとに上限(ネットダブルボギー)を当てた後の値なので実際に書いた打数と違うことがあり、その日の天候補正(PCC)が付くこともあります。',
    'Angenommen wird ein Par-72-Platz mit Rating genau 72,0. Echte Plätze liegen darüber oder darunter, und diese Differenz geht direkt in die Rechnung ein. Das bereinigte Bruttoergebnis ist zudem je Loch auf Netto-Doppelbogey gedeckelt, kann also vom notierten Ergebnis abweichen, und eine Tagesanpassung für die Bedingungen kann hinzukommen.',
    'On suppose un par 72 noté exactement 72,0. Les vrais parcours sont notés au-dessus ou en dessous du par, et cet écart entre directement dans le calcul. Le score brut ajusté est en outre plafonné trou par trou au double bogey net, donc différent parfois de ce qui est écrit, et un ajustement des conditions du jour peut s’ajouter.',
    'यह पार 72 और ठीक 72.0 रेटिंग वाला कोर्स मानती है। असली कोर्स पार से ऊपर या नीचे रेट होते हैं, और वह अंतर सीधे गणना में जाता है। समायोजित कुल स्कोर भी हर होल पर नेट डबल बोगी तक सीमित होता है, सो लिखे स्कोर से भिन्न हो सकता है, और उस दिन की परिस्थिति के लिए समायोजन भी लग सकता है।',
    '本表设定标准杆 72、Course Rating 恰好 72.0 的球场。真实球场的 Rating 高于或低于标准杆，这个差会直接进入计算。调整后总杆还要按洞封顶到净双柏忌，所以可能与你实际记的杆数不同，另外当天还可能加上天气条件修正。',
    '本表設定標準桿 72、Course Rating 恰好 72.0 的球場。真實球場的 Rating 高於或低於標準桿，這個差會直接進入計算。調整後總桿還要按洞封頂到淨雙柏忌，所以可能與你實際記的桿數不同，另外當天還可能加上天氣條件修正。',
  ),

  tableTitle: T('스코어와 슬로프로 찾기', 'Find it by score and slope', 'Búscalo por resultado y slope', 'Ache por resultado e slope', 'スコアとスロープから探す', 'Nach Ergebnis und Slope suchen', 'Chercher par score et slope', 'स्कोर और स्लोप से देखें', '按成绩和坡度查找', '按成績和坡度查找'),
  neighbourTitle: T('가까운 슬로프', 'Nearby slopes', 'Slopes cercanos', 'Slopes próximos', '近いスロープ', 'Slopes daneben', 'Slopes voisins', 'पास के स्लोप', '相邻坡度', '相鄰坡度'),
  scoreRowTitle: T('같은 스코어, 다른 코스', 'Same score, other courses', 'Mismo resultado, otros campos', 'Mesmo resultado, outros campos', '同じスコア、別のコース', 'Gleiches Ergebnis, andere Plätze', 'Même score, autres parcours', 'वही स्कोर, दूसरे कोर्स', '同一成绩，不同球场', '同一成績，不同球場'),
  slopeRowTitle: T('같은 코스, 다른 스코어', 'Same course, other scores', 'Mismo campo, otros resultados', 'Mesmo campo, outros resultados', '同じコース、別のスコア', 'Gleicher Platz, andere Ergebnisse', 'Même parcours, autres scores', 'वही कोर्स, दूसरे स्कोर', '同一球场，不同成绩', '同一球場，不同成績'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '디퍼렌셜 = (총타수 − 코스 레이팅) × 113 ÷ 슬로프.',
      '113은 표준 난이도라, 슬로프가 113이면 아무것도 바뀌지 않습니다.',
      '슬로프가 클수록(어려운 코스일수록) 같은 타수가 더 좋은 값이 됩니다.',
      '핸디캡 인덱스는 최근 스무 라운드 가운데 좋은 여덟 개의 평균입니다.',
    ],
    [
      'Differential = (gross score − Course Rating) × 113 ÷ Slope.',
      '113 is standard difficulty, so at slope 113 nothing changes.',
      'The higher the slope — the harder the course — the better the same score reads.',
      'A Handicap Index averages the best eight of your last twenty rounds.',
    ],
    [
      'Diferencial = (resultado bruto − Course Rating) × 113 ÷ slope.',
      '113 es la dificultad estándar: con slope 113 nada cambia.',
      'A mayor slope —campo más difícil— mejor vale el mismo resultado.',
      'El hándicap promedia los ocho mejores de las últimas veinte vueltas.',
    ],
    [
      'Diferencial = (resultado bruto − Course Rating) × 113 ÷ slope.',
      '113 é a dificuldade padrão: com slope 113 nada muda.',
      'Quanto maior o slope — campo mais difícil — melhor vale o mesmo resultado.',
      'O handicap faz a média dos oito melhores das últimas vinte voltas.',
    ],
    [
      'ディファレンシャル = (総打数 − コースレーティング) × 113 ÷ スロープ。',
      '113は標準難度なので、スロープが113なら何も変わりません。',
      'スロープが大きいほど(難しいコースほど)同じ打数が良い値になります。',
      'ハンディキャップインデックスは直近20ラウンドのうち良い8つの平均です。',
    ],
    [
      'Differential = (Bruttoergebnis − Course Rating) × 113 ÷ Slope.',
      '113 ist Standardschwierigkeit — bei Slope 113 ändert sich nichts.',
      'Je höher der Slope, je schwerer der Platz, desto besser liest sich dasselbe Ergebnis.',
      'Der Handicap Index mittelt die besten acht der letzten zwanzig Runden.',
    ],
    [
      'Différentiel = (score brut − Course Rating) × 113 ÷ slope.',
      '113 est la difficulté standard : à slope 113, rien ne change.',
      'Plus le slope est élevé — parcours plus dur — mieux se lit le même score.',
      'L’index moyenne les huit meilleurs des vingt dernières parties.',
    ],
    [
      'डिफ़रेंशियल = (कुल स्कोर − कोर्स रेटिंग) × 113 ÷ स्लोप।',
      '113 मानक कठिनाई है, इसलिए स्लोप 113 पर कुछ नहीं बदलता।',
      'स्लोप जितना बड़ा (कोर्स जितना कठिन), वही स्कोर उतना बेहतर।',
      'हैंडीकैप इंडेक्स पिछले बीस राउंड में से आठ सर्वोत्तम का औसत है।',
    ],
    [
      '差值 =（总杆 − Course Rating）× 113 ÷ 坡度值。',
      '113 是标准难度，坡度为 113 时什么都不变。',
      '坡度越大（球场越难），同样的杆数读数越好。',
      '差点指数取最近二十轮里最好的八轮的平均。',
    ],
    [
      '差值 =（總桿 − Course Rating）× 113 ÷ 坡度值。',
      '113 是標準難度，坡度為 113 時什麼都不變。',
      '坡度越大（球場越難），同樣的桿數讀數越好。',
      '差點指數取最近二十輪裡最好的八輪的平均。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '골프 핸디캡 계산 — 슬로프가 같은 90타를 어떻게 바꾸나',
    'Golf handicap — what slope does to the same 90',
    'Hándicap de golf — qué le hace el slope a los mismos 90',
    'Handicap de golfe — o que o slope faz aos mesmos 90',
    'ゴルフのハンディキャップ計算 — スロープが同じ90打をどう変えるか',
    'Golf-Handicap — was der Slope aus derselben 90 macht',
    'Handicap de golf — ce que le slope fait au même 90',
    'गोल्फ हैंडीकैप — वही 90 पर स्लोप का असर',
    '高尔夫差点计算 — 坡度如何改变同样的 90 杆',
    '高爾夫差點計算 — 坡度如何改變同樣的 90 桿',
  ),

  hubMetaDesc: T(
    '슬로프 130 코스의 90타는 디퍼렌셜 15.6이고, 슬로프 95 코스라면 21.4입니다. 식은 (총타수 − 코스 레이팅) × 113 ÷ 슬로프 하나입니다. 스코어 10가지 × 슬로프 10가지 100칸.',
    'Ninety strokes on a slope-130 course is a differential of 15.6; on a slope-95 course the same round reads 21.4. The formula is one line: (gross − Course Rating) × 113 ÷ slope. 10 scores × 10 slope ratings.',
    'Noventa golpes en un campo de slope 130 dan un diferencial de 15,6; en uno de slope 95, la misma vuelta marca 21,4. La fórmula es una línea: (bruto − Course Rating) × 113 ÷ slope. 10 resultados × 10 slopes.',
    'Noventa tacadas num campo de slope 130 dão diferencial 15,6; num de slope 95, a mesma volta marca 21,4. A fórmula é uma linha: (bruto − Course Rating) × 113 ÷ slope. 10 resultados × 10 slopes.',
    'スロープ130のコースの90打はディファレンシャル15.6、スロープ95のコースなら21.4です。式は(総打数 − コースレーティング) × 113 ÷ スロープの一行です。スコア10通り×スロープ10通りの100マス。',
    'Neunzig Schläge auf einem Slope-130-Platz ergeben ein Differential von 15,6; auf einem Slope-95-Platz liest sich dieselbe Runde als 21,4. Die Formel ist eine Zeile: (Brutto − Course Rating) × 113 ÷ Slope. 10 Ergebnisse × 10 Slopes.',
    'Quatre-vingt-dix coups sur un parcours de slope 130 donnent un différentiel de 15,6 ; sur un slope 95, la même partie affiche 21,4. La formule tient en une ligne : (brut − Course Rating) × 113 ÷ slope. 10 scores × 10 slopes.',
    'स्लोप 130 वाले कोर्स पर 90 स्ट्रोक का डिफ़रेंशियल 15.6 है; स्लोप 95 पर वही राउंड 21.4 पढ़ा जाता है। सूत्र एक पंक्ति है: (कुल − कोर्स रेटिंग) × 113 ÷ स्लोप। 10 स्कोर × 10 स्लोप।',
    '在坡度 130 的球场打 90 杆，差值是 15.6；在坡度 95 的球场，同样一轮读作 21.4。公式只有一行：（总杆 − Course Rating）× 113 ÷ 坡度。10 种成绩 × 10 种坡度。',
    '在坡度 130 的球場打 90 桿，差值是 15.6；在坡度 95 的球場，同樣一輪讀作 21.4。公式只有一行：（總桿 − Course Rating）× 113 ÷ 坡度。10 種成績 × 10 種坡度。',
  ),

  desc: T<(f: GolfFacts) => string>(
    f => `파보다 ${f.overPar}타 많은 ${f.cell.score}타를 슬로프 ${f.cell.slope} 코스에서 쳤다면 디퍼렌셜은 ${f.differential}입니다. 표준 코스였다면 ${f.atStandard}이었을 값입니다.`,
    f => `Shooting ${f.cell.score} — ${f.overPar} over par — on a slope-${f.cell.slope} course gives a differential of ${f.differential}. On a standard course the same round would read ${f.atStandard}.`,
    f => `Firmar ${f.cell.score} (${f.overPar} sobre par) en un campo de slope ${f.cell.slope} da un diferencial de ${f.differential}. En un campo estándar la misma vuelta marcaría ${f.atStandard}.`,
    f => `Fazer ${f.cell.score} (${f.overPar} acima do par) num campo de slope ${f.cell.slope} dá diferencial ${f.differential}. Num campo padrão a mesma volta marcaria ${f.atStandard}.`,
    f => `パーより${f.overPar}打多い${f.cell.score}打をスロープ${f.cell.slope}のコースで出したなら、ディファレンシャルは${f.differential}です。標準コースなら${f.atStandard}でした。`,
    f => `Eine ${f.cell.score} — ${f.overPar} über Par — auf einem Slope-${f.cell.slope}-Platz ergibt ein Differential von ${f.differential}. Auf einem Standardplatz wären es ${f.atStandard}.`,
    f => `Rendre ${f.cell.score} (${f.overPar} au-dessus du par) sur un parcours de slope ${f.cell.slope} donne un différentiel de ${f.differential}. Sur un parcours standard, la même partie afficherait ${f.atStandard}.`,
    f => `स्लोप ${f.cell.slope} वाले कोर्स पर ${f.cell.score} (पार से ${f.overPar} ऊपर) खेलने पर डिफ़रेंशियल ${f.differential} है। मानक कोर्स पर वही राउंड ${f.atStandard} होता।`,
    f => `在坡度 ${f.cell.slope} 的球场打出 ${f.cell.score} 杆（高于标准杆 ${f.overPar} 杆），差值是 ${f.differential}。若在标准球场，同样一轮读作 ${f.atStandard}。`,
    f => `在坡度 ${f.cell.slope} 的球場打出 ${f.cell.score} 桿（高於標準桿 ${f.overPar} 桿），差值是 ${f.differential}。若在標準球場，同樣一輪讀作 ${f.atStandard}。`,
  ),

  metaTitle: T<(f: GolfFacts) => string>(
    f => `${f.cell.score}타 · 슬로프 ${f.cell.slope} — 디퍼렌셜 ${f.differential}`,
    f => `${f.cell.score} on slope ${f.cell.slope} — differential ${f.differential}`,
    f => `${f.cell.score} con slope ${f.cell.slope} — diferencial ${f.differential}`,
    f => `${f.cell.score} com slope ${f.cell.slope} — diferencial ${f.differential}`,
    f => `${f.cell.score}打・スロープ${f.cell.slope} — ディファレンシャル${f.differential}`,
    f => `${f.cell.score} bei Slope ${f.cell.slope} — Differential ${f.differential}`,
    f => `${f.cell.score} sur slope ${f.cell.slope} — différentiel ${f.differential}`,
    f => `${f.cell.score}, स्लोप ${f.cell.slope} — डिफ़रेंशियल ${f.differential}`,
    f => `${f.cell.score} 杆 · 坡度 ${f.cell.slope} — 差值 ${f.differential}`,
    f => `${f.cell.score} 桿 · 坡度 ${f.cell.slope} — 差值 ${f.differential}`,
  ),

  metaDesc: T<(f: GolfFacts) => string>(
    f => `슬로프 ${f.cell.slope} 코스에서 ${f.cell.score}타를 쳤다면 스코어 디퍼렌셜은 ${f.differential}입니다. 보정값은 113 ÷ ${f.cell.slope} = ${f.factor}이고, 표준 코스 기준으로는 ${f.atStandard}에 해당합니다.`,
    f => `A round of ${f.cell.score} on a slope-${f.cell.slope} course produces a Score Differential of ${f.differential}. The slope factor is 113 ÷ ${f.cell.slope} = ${f.factor}, and on a standard course the same score reads ${f.atStandard}.`,
    f => `Una vuelta de ${f.cell.score} en un campo de slope ${f.cell.slope} produce un diferencial de ${f.differential}. El factor es 113 ÷ ${f.cell.slope} = ${f.factor}, y en campo estándar el mismo resultado marca ${f.atStandard}.`,
    f => `Uma volta de ${f.cell.score} num campo de slope ${f.cell.slope} produz diferencial ${f.differential}. O fator é 113 ÷ ${f.cell.slope} = ${f.factor}, e em campo padrão o mesmo resultado marca ${f.atStandard}.`,
    f => `スロープ${f.cell.slope}のコースで${f.cell.score}打を出すとスコアディファレンシャルは${f.differential}です。補正値は113 ÷ ${f.cell.slope} = ${f.factor}で、標準コース基準では${f.atStandard}に当たります。`,
    f => `Eine Runde von ${f.cell.score} auf einem Slope-${f.cell.slope}-Platz ergibt ein Score Differential von ${f.differential}. Der Faktor ist 113 ÷ ${f.cell.slope} = ${f.factor}; auf einem Standardplatz läse sich dasselbe Ergebnis als ${f.atStandard}.`,
    f => `Une partie de ${f.cell.score} sur un parcours de slope ${f.cell.slope} donne un différentiel de ${f.differential}. Le facteur vaut 113 ÷ ${f.cell.slope} = ${f.factor} ; sur un parcours standard, le même score afficherait ${f.atStandard}.`,
    f => `स्लोप ${f.cell.slope} वाले कोर्स पर ${f.cell.score} का राउंड ${f.differential} डिफ़रेंशियल देता है। गुणक 113 ÷ ${f.cell.slope} = ${f.factor} है, और मानक कोर्स पर वही स्कोर ${f.atStandard} पढ़ा जाता है।`,
    f => `在坡度 ${f.cell.slope} 的球场打 ${f.cell.score} 杆，成绩差值为 ${f.differential}。修正系数是 113 ÷ ${f.cell.slope} = ${f.factor}，按标准球场折算相当于 ${f.atStandard}。`,
    f => `在坡度 ${f.cell.slope} 的球場打 ${f.cell.score} 桿，成績差值為 ${f.differential}。修正係數是 113 ÷ ${f.cell.slope} = ${f.factor}，按標準球場折算相當於 ${f.atStandard}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '슬로프 레이팅이 무엇인가요?', a: '보통 골퍼가 스크래치 골퍼보다 얼마나 더 고전하는지를 적은 수입니다. 55에서 155까지이고 113이 표준입니다.' },
      { q: '왜 하필 113인가요?', a: '표준 난이도 코스의 슬로프로 정해진 값입니다. 그래서 슬로프가 113이면 보정이 1이 되어 아무것도 바꾸지 않습니다.' },
      { q: '어려운 코스에서 친 90타가 더 좋은 건가요?', a: '그렇습니다. 슬로프 155에서 친 90타는 슬로프 95에서 친 90타보다 훨씬 낮은 디퍼렌셜이 됩니다.' },
      { q: '한 라운드로 핸디캡이 정해지나요?', a: '아닙니다. 최근 스무 라운드의 디퍼렌셜 가운데 좋은 여덟 개를 평균한 값이 인덱스입니다.' },
      { q: '코스 핸디캡은 무엇이 다른가요?', a: '인덱스를 오늘 칠 코스에 다시 입힌 값입니다 — 인덱스 × 슬로프 ÷ 113 + (코스 레이팅 − 파).' },
    ],
    [
      { q: 'What is a Slope Rating?', a: 'A number for how much harder an average player finds the course than a scratch golfer does. It runs from 55 to 155, with 113 as standard.' },
      { q: 'Why 113 of all numbers?', a: 'It is defined as the slope of a course of standard difficulty, so at slope 113 the factor is exactly one and changes nothing.' },
      { q: 'Is 90 on a hard course really better?', a: 'Yes. Ninety on a slope-155 course produces a much lower differential than ninety on a slope-95 course.' },
      { q: 'Does one round set a handicap?', a: 'No. The index averages the best eight differentials from your last twenty rounds.' },
      { q: 'How does the Course Handicap differ?', a: 'It puts the index back onto today’s course: index × slope ÷ 113 + (Course Rating − par).' },
    ],
    [
      { q: '¿Qué es el Slope Rating?', a: 'Un número que mide cuánto más difícil resulta el campo a un jugador medio que a uno scratch. Va de 55 a 155, con 113 como estándar.' },
      { q: '¿Por qué precisamente 113?', a: 'Es el slope definido para un campo de dificultad estándar; con slope 113 el factor vale uno y no cambia nada.' },
      { q: '¿Los 90 en un campo difícil valen más?', a: 'Sí. Noventa en slope 155 da un diferencial mucho menor que noventa en slope 95.' },
      { q: '¿Una vuelta fija el hándicap?', a: 'No. El índice promedia los ocho mejores diferenciales de las últimas veinte vueltas.' },
      { q: '¿En qué se diferencia el hándicap de campo?', a: 'Devuelve el índice al campo de hoy: índice × slope ÷ 113 + (Course Rating − par).' },
    ],
    [
      { q: 'O que é o Slope Rating?', a: 'Um número que mede quanto o campo é mais difícil para um jogador médio do que para um scratch. Vai de 55 a 155, com 113 como padrão.' },
      { q: 'Por que justamente 113?', a: 'É o slope definido para um campo de dificuldade padrão; com slope 113 o fator vale um e nada muda.' },
      { q: 'Os 90 num campo difícil valem mais?', a: 'Sim. Noventa em slope 155 dá diferencial bem menor que noventa em slope 95.' },
      { q: 'Uma volta define o handicap?', a: 'Não. O índice faz a média dos oito melhores diferenciais das últimas vinte voltas.' },
      { q: 'Como difere o handicap do campo?', a: 'Ele devolve o índice ao campo de hoje: índice × slope ÷ 113 + (Course Rating − par).' },
    ],
    [
      { q: 'スロープレーティングとは何ですか？', a: '普通のゴルファーがスクラッチゴルファーよりどれだけ苦戦するかを表す数です。55から155までで、113が標準です。' },
      { q: 'なぜ113なのですか？', a: '標準難度のコースのスロープとして定められた値だからです。だからスロープが113なら補正が1になり何も変えません。' },
      { q: '難しいコースの90打のほうが良いのですか？', a: 'はい。スロープ155で出した90打はスロープ95の90打よりずっと低いディファレンシャルになります。' },
      { q: '1ラウンドでハンディキャップが決まりますか？', a: 'いいえ。直近20ラウンドのディファレンシャルのうち良い8つを平均した値がインデックスです。' },
      { q: 'コースハンディキャップは何が違いますか？', a: 'インデックスを今日のコースに戻した値です — インデックス × スロープ ÷ 113 + (コースレーティング − パー)。' },
    ],
    [
      { q: 'Was ist ein Slope Rating?', a: 'Eine Zahl dafür, wie viel schwerer ein Durchschnittsspieler den Platz findet als ein Scratch-Golfer. Sie reicht von 55 bis 155, Standard ist 113.' },
      { q: 'Warum ausgerechnet 113?', a: 'So ist der Slope eines Platzes mit Standardschwierigkeit definiert — bei Slope 113 ist der Faktor genau eins.' },
      { q: 'Ist eine 90 auf schwerem Platz wirklich besser?', a: 'Ja. Neunzig bei Slope 155 ergibt ein deutlich niedrigeres Differential als neunzig bei Slope 95.' },
      { q: 'Legt eine Runde das Handicap fest?', a: 'Nein. Der Index mittelt die besten acht Differentiale der letzten zwanzig Runden.' },
      { q: 'Was unterscheidet das Course Handicap?', a: 'Es überträgt den Index auf den heutigen Platz: Index × Slope ÷ 113 + (Course Rating − Par).' },
    ],
    [
      { q: 'Qu’est-ce que le Slope Rating ?', a: 'Un nombre disant combien un joueur moyen peine plus qu’un joueur scratch sur ce parcours. Il va de 55 à 155, 113 étant la norme.' },
      { q: 'Pourquoi 113 ?', a: 'C’est le slope défini pour un parcours de difficulté standard : à 113, le facteur vaut un et ne change rien.' },
      { q: 'Un 90 sur parcours difficile vaut-il mieux ?', a: 'Oui. Quatre-vingt-dix sur slope 155 donne un différentiel bien plus bas que sur slope 95.' },
      { q: 'Une partie fixe-t-elle le handicap ?', a: 'Non. L’index moyenne les huit meilleurs différentiels des vingt dernières parties.' },
      { q: 'En quoi diffère le handicap de parcours ?', a: 'Il replace l’index sur le parcours du jour : index × slope ÷ 113 + (Course Rating − par).' },
    ],
    [
      { q: 'स्लोप रेटिंग क्या है?', a: 'यह संख्या बताती है कि औसत खिलाड़ी को कोर्स स्क्रैच गोल्फ़र से कितना अधिक कठिन लगता है। यह 55 से 155 तक है, 113 मानक है।' },
      { q: '113 ही क्यों?', a: 'यह मानक कठिनाई वाले कोर्स का स्लोप है — स्लोप 113 पर गुणक ठीक एक होता है और कुछ नहीं बदलता।' },
      { q: 'क्या कठिन कोर्स का 90 सचमुच बेहतर है?', a: 'हाँ। स्लोप 155 पर 90, स्लोप 95 पर 90 से कहीं कम डिफ़रेंशियल देता है।' },
      { q: 'क्या एक राउंड से हैंडीकैप तय होता है?', a: 'नहीं। इंडेक्स पिछले बीस राउंड के आठ सर्वोत्तम डिफ़रेंशियल का औसत है।' },
      { q: 'कोर्स हैंडीकैप कैसे अलग है?', a: 'वह इंडेक्स को आज के कोर्स पर लौटाता है: इंडेक्स × स्लोप ÷ 113 + (कोर्स रेटिंग − पार)।' },
    ],
    [
      { q: '什么是坡度值（Slope Rating）？', a: '它表示普通球手比零差点球手觉得这座球场难多少，范围 55 到 155，113 为标准。' },
      { q: '为什么偏偏是 113？', a: '因为它被定义为标准难度球场的坡度值，所以坡度为 113 时修正系数正好是 1，什么都不改。' },
      { q: '难场打的 90 杆真的更好吗？', a: '是的。坡度 155 上的 90 杆，差值远低于坡度 95 上的 90 杆。' },
      { q: '一轮就能定差点吗？', a: '不能。指数取最近二十轮里最好八轮差值的平均。' },
      { q: '球场差点有什么不同？', a: '它把指数套回今天的球场：指数 × 坡度 ÷ 113 +（Course Rating − 标准杆）。' },
    ],
    [
      { q: '什麼是坡度值（Slope Rating）？', a: '它表示普通球手比零差點球手覺得這座球場難多少，範圍 55 到 155，113 為標準。' },
      { q: '為什麼偏偏是 113？', a: '因為它被定義為標準難度球場的坡度值，所以坡度為 113 時修正係數正好是 1，什麼都不改。' },
      { q: '難場打的 90 桿真的更好嗎？', a: '是的。坡度 155 上的 90 桿，差值遠低於坡度 95 上的 90 桿。' },
      { q: '一輪就能定差點嗎？', a: '不能。指數取最近二十輪裡最好八輪差值的平均。' },
      { q: '球場差點有什麼不同？', a: '它把指數套回今天的球場：指數 × 坡度 ÷ 113 +（Course Rating − 標準桿）。' },
    ],
  ),

  cellFaq: T<(f: GolfFacts) => FaqItem[]>(
    f => [
      { q: `슬로프 ${f.cell.slope} 코스의 ${f.cell.score}타는 디퍼렌셜이 얼마인가요?`, a: `${f.differential}입니다. (${f.cell.score} − 72) × 113 ÷ ${f.cell.slope}로 계산합니다.` },
      { q: `보정값은 얼마인가요?`, a: `113 ÷ ${f.cell.slope} = ${f.factor}입니다. 1보다 ${f.factor > 1 ? '크므로 쉬운 코스' : f.factor < 1 ? '작으므로 어려운 코스' : '같으므로 표준 코스'}입니다.` },
      { q: `표준 코스였다면요?`, a: `${f.atStandard}입니다. 슬로프 113에서는 파 초과 타수가 그대로 디퍼렌셜이 됩니다.` },
      { q: `이 값이 곧 핸디캡인가요?`, a: `아닙니다. 인덱스는 최근 스무 라운드 가운데 좋은 여덟 개의 평균이라, 이 한 라운드는 그 후보 하나일 뿐입니다.` },
    ],
    f => [
      { q: `What differential does ${f.cell.score} on slope ${f.cell.slope} give?`, a: `${f.differential} — that is (${f.cell.score} − 72) × 113 ÷ ${f.cell.slope}.` },
      { q: `What is the slope factor?`, a: `113 ÷ ${f.cell.slope} = ${f.factor}, ${f.factor > 1 ? 'above one, so an easier course than standard' : f.factor < 1 ? 'below one, so a harder course than standard' : 'exactly one, a standard course'}.` },
      { q: `And on a standard course?`, a: `${f.atStandard}. At slope 113 the strokes over par become the differential unchanged.` },
      { q: `Is this my handicap?`, a: `No. An index averages the best eight of your last twenty rounds; this round is only one candidate.` },
    ],
    f => [
      { q: `¿Qué diferencial dan ${f.cell.score} en slope ${f.cell.slope}?`, a: `${f.differential}: (${f.cell.score} − 72) × 113 ÷ ${f.cell.slope}.` },
      { q: `¿Cuál es el factor?`, a: `113 ÷ ${f.cell.slope} = ${f.factor}, ${f.factor > 1 ? 'mayor que uno: campo más fácil que el estándar' : f.factor < 1 ? 'menor que uno: campo más difícil que el estándar' : 'exactamente uno: campo estándar'}.` },
      { q: `¿Y en un campo estándar?`, a: `${f.atStandard}. Con slope 113 los golpes sobre par pasan tal cual al diferencial.` },
      { q: `¿Es este mi hándicap?`, a: `No. El índice promedia los ocho mejores de las últimas veinte vueltas; esta es solo una candidata.` },
    ],
    f => [
      { q: `Que diferencial dão ${f.cell.score} em slope ${f.cell.slope}?`, a: `${f.differential}: (${f.cell.score} − 72) × 113 ÷ ${f.cell.slope}.` },
      { q: `Qual é o fator?`, a: `113 ÷ ${f.cell.slope} = ${f.factor}, ${f.factor > 1 ? 'maior que um: campo mais fácil que o padrão' : f.factor < 1 ? 'menor que um: campo mais difícil que o padrão' : 'exatamente um: campo padrão'}.` },
      { q: `E num campo padrão?`, a: `${f.atStandard}. Com slope 113 as tacadas acima do par viram o diferencial sem mudança.` },
      { q: `Isto é o meu handicap?`, a: `Não. O índice faz a média dos oito melhores das últimas vinte voltas; esta é só uma candidata.` },
    ],
    f => [
      { q: `スロープ${f.cell.slope}のコースの${f.cell.score}打はディファレンシャルいくつですか？`, a: `${f.differential}です。(${f.cell.score} − 72) × 113 ÷ ${f.cell.slope}で計算します。` },
      { q: `補正値はいくつですか？`, a: `113 ÷ ${f.cell.slope} = ${f.factor}です。1より${f.factor > 1 ? '大きいので易しいコース' : f.factor < 1 ? '小さいので難しいコース' : '等しいので標準コース'}です。` },
      { q: `標準コースならどうなりますか？`, a: `${f.atStandard}です。スロープ113ではパー超過打数がそのままディファレンシャルになります。` },
      { q: `この値がハンディキャップですか？`, a: `いいえ。インデックスは直近20ラウンドのうち良い8つの平均なので、この1ラウンドはその候補のひとつです。` },
    ],
    f => [
      { q: `Welches Differential ergibt ${f.cell.score} bei Slope ${f.cell.slope}?`, a: `${f.differential} — also (${f.cell.score} − 72) × 113 ÷ ${f.cell.slope}.` },
      { q: `Wie groß ist der Faktor?`, a: `113 ÷ ${f.cell.slope} = ${f.factor}, ${f.factor > 1 ? 'über eins — ein leichterer Platz als der Standard' : f.factor < 1 ? 'unter eins — ein schwererer Platz als der Standard' : 'genau eins — ein Standardplatz'}.` },
      { q: `Und auf einem Standardplatz?`, a: `${f.atStandard}. Bei Slope 113 werden die Schläge über Par unverändert zum Differential.` },
      { q: `Ist das mein Handicap?`, a: `Nein. Der Index mittelt die besten acht der letzten zwanzig Runden; diese Runde ist nur eine Kandidatin.` },
    ],
    f => [
      { q: `Quel différentiel donne ${f.cell.score} sur slope ${f.cell.slope} ?`, a: `${f.differential}, soit (${f.cell.score} − 72) × 113 ÷ ${f.cell.slope}.` },
      { q: `Quel est le facteur ?`, a: `113 ÷ ${f.cell.slope} = ${f.factor}, ${f.factor > 1 ? 'supérieur à un : parcours plus facile que la norme' : f.factor < 1 ? 'inférieur à un : parcours plus difficile que la norme' : 'égal à un : parcours standard'}.` },
      { q: `Et sur un parcours standard ?`, a: `${f.atStandard}. À slope 113, les coups au-dessus du par deviennent le différentiel tel quel.` },
      { q: `Est-ce mon handicap ?`, a: `Non. L’index moyenne les huit meilleurs des vingt dernières parties ; celle-ci n’est qu’une candidate.` },
    ],
    f => [
      { q: `स्लोप ${f.cell.slope} पर ${f.cell.score} का डिफ़रेंशियल क्या है?`, a: `${f.differential} — यानी (${f.cell.score} − 72) × 113 ÷ ${f.cell.slope}।` },
      { q: `गुणक कितना है?`, a: `113 ÷ ${f.cell.slope} = ${f.factor}, ${f.factor > 1 ? 'एक से बड़ा — मानक से आसान कोर्स' : f.factor < 1 ? 'एक से छोटा — मानक से कठिन कोर्स' : 'ठीक एक — मानक कोर्स'}।` },
      { q: `मानक कोर्स पर क्या होता?`, a: `${f.atStandard}। स्लोप 113 पर पार से ऊपर के स्ट्रोक ज्यों के त्यों डिफ़रेंशियल बन जाते हैं।` },
      { q: `क्या यही मेरा हैंडीकैप है?`, a: `नहीं। इंडेक्स पिछले बीस राउंड के आठ सर्वोत्तम का औसत है; यह राउंड बस एक उम्मीदवार है।` },
    ],
    f => [
      { q: `坡度 ${f.cell.slope} 打 ${f.cell.score} 杆，差值是多少？`, a: `${f.differential}，即（${f.cell.score} − 72）× 113 ÷ ${f.cell.slope}。` },
      { q: `修正系数是多少？`, a: `113 ÷ ${f.cell.slope} = ${f.factor}，${f.factor > 1 ? '大于 1，比标准球场容易' : f.factor < 1 ? '小于 1，比标准球场难' : '正好为 1，是标准球场'}。` },
      { q: `若在标准球场呢？`, a: `${f.atStandard}。坡度 113 时，高于标准杆的杆数原样成为差值。` },
      { q: `这就是我的差点吗？`, a: `不是。指数取最近二十轮里最好八轮的平均，这一轮只是候选之一。` },
    ],
    f => [
      { q: `坡度 ${f.cell.slope} 打 ${f.cell.score} 桿，差值是多少？`, a: `${f.differential}，即（${f.cell.score} − 72）× 113 ÷ ${f.cell.slope}。` },
      { q: `修正係數是多少？`, a: `113 ÷ ${f.cell.slope} = ${f.factor}，${f.factor > 1 ? '大於 1，比標準球場容易' : f.factor < 1 ? '小於 1，比標準球場難' : '正好為 1，是標準球場'}。` },
      { q: `若在標準球場呢？`, a: `${f.atStandard}。坡度 113 時，高於標準桿的桿數原樣成為差值。` },
      { q: `這就是我的差點嗎？`, a: `不是。指數取最近二十輪裡最好八輪的平均，這一輪只是候選之一。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const GOLF_UI: L<GolfUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<GolfUI>;
