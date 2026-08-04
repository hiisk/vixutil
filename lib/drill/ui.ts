/**
 * 드릴 비트 화면의 문구 — 열 언어.
 *
 * 이 표의 일은 계열 사이를 잇는 것이다. 도면에는 6.8mm라고 적혀 있는데 손에는
 * 인치 드릴뿐이거나, 나사 표에는 #7이라고만 적혀 있는 일이 흔하다.
 *
 * 번호·문자 계열은 미국에서만 쓰지만 나사 표에 그 이름으로 적혀 있는 일이 많아
 * 함께 싣는다. 다른 나라 사람이 봐도 "이건 몇 밀리인가"가 바로 나와야 한다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { DrillFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface DrillUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindName: (kind: string) => string;
  mmLabel: string;
  inchLabel: string;
  reducedLabel: string;
  areaLabel: string;
  nearLabel: string;
  tapLabel: string;
  noneTag: string;
  seriesTitle: string;
  seriesNote: string;
  numberTitle: string;
  numberNote: string;
  tapTitle: string;
  tapNote: string;
  nearTitle: string;
  nearNote: string;
  allTitle: string;
  neighbourTitle: string;
  desc: (f: DrillFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: DrillFacts) => string;
  metaDesc: (f: DrillFacts) => string;
  hubFaq: FaqItem[];
  drillFaq: (f: DrillFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 계열 이름 넷 — 한 줄로 받는다 */
const kind = (metric: string, fraction: string, number: string, letter: string) =>
  (key: string): string => ({ metric, fraction, number, letter }[key] ?? key);

type Spec = { [K in keyof DrillUI]: L<DrillUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('드릴 비트', 'Drill bits', 'Brocas', 'Brocas', 'ドリル径', 'Bohrer', 'Forets', 'ड्रिल बिट', '钻头', '鑽頭'),

  kindName: T<(key: string) => string>(
    kind('미터(mm)', '인치(분수)', '번호', '문자'),
    kind('metric (mm)', 'fractional inch', 'number', 'letter'),
    kind('métrica (mm)', 'pulgada fraccionaria', 'número', 'letra'),
    kind('métrica (mm)', 'polegada fracionária', 'número', 'letra'),
    kind('ミリ', '分数インチ', '番号', '文字'),
    kind('metrisch (mm)', 'Zoll-Bruch', 'Nummer', 'Buchstabe'),
    kind('métrique (mm)', 'pouce fractionnaire', 'numéro', 'lettre'),
    kind('मीट्रिक (मिमी)', 'भिन्न इंच', 'नंबर', 'अक्षर'),
    kind('公制（毫米）', '英寸分数', '号码', '字母'),
    kind('公制（毫米）', '英寸分數', '號碼', '字母'),
  ),

  hubTitle: T(
    '드릴 비트 187가지 — 네 계열을 한 표에',
    '187 drill bits — four series in one table',
    '187 brocas — cuatro series en una tabla',
    '187 brocas — quatro séries em uma tabela',
    'ドリル径187種 — 4系列を一つの表に',
    '187 Bohrer — vier Reihen in einer Tabelle',
    '187 forets — quatre séries dans un seul tableau',
    '187 ड्रिल बिट — चार श्रेणियाँ एक तालिका में',
    '187 种钻头 — 四个系列合成一表',
    '187 種鑽頭 — 四個系列合成一表',
  ),

  hubLead: T(
    '미터·인치 분수·번호·문자 네 계열의 지름을 한자리에 놓았습니다. 6.8mm가 어느 인치 드릴에 가까운지, #7이 몇 밀리인지, 어느 나사의 탭 드릴인지까지 계산합니다.',
    'Metric, fractional-inch, number and letter bits side by side. Which inch drill sits closest to 6.8 mm, how many millimetres a #7 is, and which screw thread each one taps.',
    'Brocas métricas, en pulgadas fraccionarias, por número y por letra, juntas. Qué broca en pulgadas se acerca a 6,8 mm, cuántos milímetros mide una #7 y qué rosca abre cada una.',
    'Brocas métricas, em polegadas fracionárias, por número e por letra, lado a lado. Qual broca em polegadas chega perto de 6,8 mm, quantos milímetros tem uma #7 e que rosca cada uma abre.',
    'ミリ・分数インチ・番号・文字の4系列を一か所に並べました。6.8mmに近いインチドリルはどれか、#7は何ミリか、どのねじの下穴かまで計算します。',
    'Metrische, zöllige, nummerierte und Buchstabenbohrer nebeneinander. Welcher Zollbohrer 6,8 mm am nächsten kommt, wie viele Millimeter ein #7 hat und welches Gewinde er vorbohrt.',
    'Forets métriques, en pouces fractionnaires, à numéro et à lettre, côte à côte. Quel foret en pouces approche 6,8 mm, combien de millimètres fait un #7, et quel filetage chacun prépare.',
    'मीट्रिक, भिन्न-इंच, नंबर और अक्षर — चारों श्रेणियाँ एक साथ। 6.8 मिमी के सबसे पास कौन-सी इंच ड्रिल है, #7 कितने मिलीमीटर का है, और वह किस थ्रेड का टैप ड्रिल है।',
    '公制、英寸分数、号码与字母四个系列并列。6.8 毫米最接近哪支英寸钻头、#7 是多少毫米、又是哪种螺纹的底孔，都算给你看。',
    '公制、英寸分數、號碼與字母四個系列並列。6.8 毫米最接近哪支英寸鑽頭、#7 是多少毫米、又是哪種螺紋的底孔，都算給你看。',
  ),

  mmLabel: T('지름', 'Diameter', 'Diámetro', 'Diâmetro', '直径', 'Durchmesser', 'Diamètre', 'व्यास', '直径', '直徑'),
  inchLabel: T('인치로', 'In inches', 'En pulgadas', 'Em polegadas', 'インチで', 'In Zoll', 'En pouces', 'इंच में', '英寸', '英寸'),
  reducedLabel: T('약분하면', 'Reduced', 'Reducida', 'Reduzida', '約分すると', 'Gekürzt', 'Réduite', 'सरल रूप', '约分', '約分'),
  areaLabel: T('단면적', 'Cross-section', 'Sección', 'Seção', '断面積', 'Querschnitt', 'Section', 'अनुप्रस्थ काट', '截面积', '截面積'),
  nearLabel: T('다른 계열에서 가장 가까운 것', 'Closest in other series', 'La más cercana en otras series', 'A mais próxima em outras séries', '他系列で一番近いもの', 'Nächstliegend in anderen Reihen', 'La plus proche des autres séries', 'अन्य श्रेणियों में निकटतम', '其他系列中最接近的', '其他系列中最接近的'),
  tapLabel: T('이 비트로 탭을 낼 나사', 'Threads this bit taps', 'Roscas que abre esta broca', 'Roscas que esta broca abre', 'このドリルで立てるねじ', 'Gewinde, die dieser Bohrer vorbereitet', 'Filetages préparés par ce foret', 'इस बिट से बनने वाले थ्रेड', '可用此钻头攻的螺纹', '可用此鑽頭攻的螺紋'),
  noneTag: T('없습니다', 'None', 'Ninguno', 'Nenhum', 'ありません', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  seriesTitle: T('계열마다 이름 짓는 방식이 다릅니다', 'Each series names its sizes differently', 'Cada serie nombra sus medidas de otro modo', 'Cada série nomeia suas medidas de outro modo', '系列ごとに呼び方が違います', 'Jede Reihe benennt ihre Größen anders', 'Chaque série nomme ses tailles autrement', 'हर श्रेणी नाम अलग तरह से देती है', '每个系列的命名方式不同', '每個系列的命名方式不同'),

  seriesNote: T(
    '미터 계열은 밀리미터를 그대로 적고, 인치 계열은 64분의 몇으로 적습니다. 번호와 문자 계열은 옛 철사 굵기에서 온 이름이라 숫자와 지름 사이에 식이 없습니다.',
    'Metric bits state the millimetres outright, inch bits state sixty-fourths. Number and letter bits carry names inherited from old wire gauges, where no formula links the label to the size.',
    'Las brocas métricas dan los milímetros directamente; las de pulgada, sesenta y cuatroavos. Las de número y letra heredan nombres de antiguos calibres de alambre, sin fórmula que ligue etiqueta y medida.',
    'As brocas métricas dão os milímetros diretamente; as de polegada, sessenta e quatro avos. As de número e letra herdam nomes de antigas bitolas de arame, sem fórmula ligando rótulo e medida.',
    'ミリ系列は数値をそのまま書き、インチ系列は64分の何かで書きます。番号・文字系列は古い針金の太さから来た名前なので、番号と直径の間に式がありません。',
    'Metrische Bohrer nennen die Millimeter direkt, zöllige Vierundsechzigstel. Nummern- und Buchstabenbohrer tragen Namen aus alten Drahtlehren — zwischen Bezeichnung und Maß liegt keine Formel.',
    'Les forets métriques donnent les millimètres tels quels, les forets en pouces des soixante-quatrièmes. Les forets à numéro et à lettre héritent de noms d’anciennes jauges de fil : aucune formule ne relie l’étiquette à la taille.',
    'मीट्रिक बिट मिलीमीटर सीधे बताते हैं, इंच वाले चौंसठवाँ हिस्सा। नंबर और अक्षर वाले पुराने तार-गेज से आए नाम हैं, जहाँ नाम और आकार के बीच कोई सूत्र नहीं।',
    '公制钻头直接写毫米，英寸钻头写六十四分之几。号码与字母钻头的名字来自旧时的线规，编号和直径之间没有公式。',
    '公制鑽頭直接寫毫米，英寸鑽頭寫六十四分之幾。號碼與字母鑽頭的名字來自舊時的線規，編號和直徑之間沒有公式。',
  ),

  numberTitle: T('#7이 몇 밀리인지는 외울 수밖에 없습니다', 'A #7 has to be looked up', 'El tamaño de una #7 hay que consultarlo', 'O tamanho de uma #7 tem que ser consultado', '#7が何ミリかは調べるしかありません', 'Ein #7 muss man nachschlagen', 'La taille d’un #7 doit se chercher', '#7 कितना है, देखना ही पड़ता है', '#7 是多少毫米只能查', '#7 是多少毫米只能查'),

  numberNote: T(
    '번호 계열은 #1이 가장 굵고 번호가 커질수록 가늘어집니다. 다만 얼마씩 가늘어지는지는 규칙이 없어서, #7이 5.1mm이고 #21이 4.04mm라는 것은 표를 봐야 압니다. 문자 계열 A~Z는 그 위를 이어 굵어집니다.',
    'In the number series #1 is the fattest and higher numbers get thinner — but by no fixed step. That a #7 is 5.1 mm and a #21 is 4.04 mm can only be looked up. Letters A to Z continue upward from there.',
    'En la serie numérica la #1 es la más gruesa y los números altos adelgazan, pero sin paso fijo. Que una #7 mida 5,1 mm y una #21 4,04 mm solo se sabe consultando. Las letras A–Z siguen hacia arriba.',
    'Na série numérica a #1 é a mais grossa e os números altos afinam, mas sem passo fixo. Que uma #7 meça 5,1 mm e uma #21 4,04 mm só se sabe consultando. As letras A–Z seguem para cima.',
    '番号系列は#1が一番太く、番号が大きいほど細くなります。ただし細くなる幅に規則がないので、#7が5.1mm、#21が4.04mmであることは表を見るしかありません。文字A〜Zはその上を継いで太くなります。',
    'In der Nummernreihe ist #1 der dickste, höhere Nummern werden dünner — ohne feste Schrittweite. Dass ein #7 5,1 mm und ein #21 4,04 mm misst, lässt sich nur nachschlagen. Die Buchstaben A bis Z setzen nach oben fort.',
    'Dans la série à numéros, le #1 est le plus gros et les numéros élevés s’affinent, sans pas fixe. Qu’un #7 fasse 5,1 mm et un #21 4,04 mm ne se sait qu’en consultant. Les lettres A à Z prolongent vers le haut.',
    'नंबर श्रेणी में #1 सबसे मोटा है और बड़े नंबर पतले होते जाते हैं — पर किसी निश्चित अंतर से नहीं। #7 का 5.1 मिमी और #21 का 4.04 मिमी होना केवल तालिका से पता चलता है। अक्षर A–Z उसी के ऊपर चलते हैं।',
    '号码系列里 #1 最粗，号码越大越细，但没有固定的递减量。#7 是 5.1 毫米、#21 是 4.04 毫米，只能查表得知。字母 A–Z 接在其上继续变粗。',
    '號碼系列裡 #1 最粗，號碼越大越細，但沒有固定的遞減量。#7 是 5.1 毫米、#21 是 4.04 毫米，只能查表得知。字母 A–Z 接在其上繼續變粗。',
  ),

  tapTitle: T('나사 탭을 낼 때 찾는 지름', 'The sizes you reach for when tapping', 'Las medidas que se buscan al roscar', 'As medidas que se procuram ao roscar', 'ねじを立てるときに探す径', 'Die Maße fürs Gewindeschneiden', 'Les tailles cherchées pour tarauder', 'टैप करते समय चाहिए ये नाप', '攻螺纹时要找的尺寸', '攻螺紋時要找的尺寸'),

  tapNote: T(
    '탭 드릴은 나사 외경에서 피치를 뺀 값이라, 눈금 사이의 어중간한 지름이 됩니다. M3은 2.5mm, M4는 3.3mm, M8은 6.8mm — 드릴 세트에 그 값들이 따로 들어 있는 까닭입니다.',
    'A tap drill is the thread’s outside diameter minus its pitch, which lands between the round numbers: 2.5 mm for M3, 3.3 for M4, 6.8 for M8. That is exactly why drill sets carry those odd sizes.',
    'La broca para macho es el diámetro exterior menos el paso, y cae entre los números redondos: 2,5 mm para M3, 3,3 para M4, 6,8 para M8. Por eso los juegos de brocas incluyen esas medidas raras.',
    'A broca para macho é o diâmetro externo menos o passo, e cai entre os números redondos: 2,5 mm para M3, 3,3 para M4, 6,8 para M8. Por isso os jogos de brocas trazem essas medidas estranhas.',
    '下穴径はねじの外径からピッチを引いた値なので、きりのいい数字の間に来ます。M3は2.5mm、M4は3.3mm、M8は6.8mm——ドリルセットにその半端な径が入っているのはそのためです。',
    'Das Kernloch ist Außendurchmesser minus Steigung und landet zwischen den runden Zahlen: 2,5 mm für M3, 3,3 für M4, 6,8 für M8. Genau deshalb liegen diese krummen Maße in jedem Bohrersatz.',
    'Le foret de taraudage vaut le diamètre extérieur moins le pas, et tombe entre les nombres ronds : 2,5 mm pour M3, 3,3 pour M4, 6,8 pour M8. D’où la présence de ces tailles bizarres dans les coffrets.',
    'टैप ड्रिल = थ्रेड का बाहरी व्यास घटा पिच, जो गोल संख्याओं के बीच पड़ता है: M3 के लिए 2.5 मिमी, M4 के लिए 3.3, M8 के लिए 6.8। इसीलिए ड्रिल सेट में ये अटपटे नाप होते हैं।',
    '底孔直径是螺纹外径减螺距，正好落在整数之间：M3 用 2.5 毫米，M4 用 3.3，M8 用 6.8。钻头套装里之所以有这些零碎尺寸，原因就在这里。',
    '底孔直徑是螺紋外徑減螺距，正好落在整數之間：M3 用 2.5 毫米，M4 用 3.3，M8 用 6.8。鑽頭套裝裡之所以有這些零碎尺寸，原因就在這裡。',
  ),

  nearTitle: T('계열을 건너뛰어 고르기', 'Crossing from one series to another', 'Saltar de una serie a otra', 'Pular de uma série para outra', '系列をまたいで選ぶ', 'Von einer Reihe in die andere', 'Passer d’une série à l’autre', 'एक श्रेणी से दूसरी में', '跨系列替代', '跨系列替代'),

  nearNote: T(
    '가진 드릴이 다른 계열뿐일 때 씁니다. 다만 나사 탭처럼 정확해야 하는 자리에서는 조금 굵은 쪽보다 조금 가는 쪽을 고르는 편이 안전합니다 — 구멍은 넓힐 수 있어도 좁힐 수는 없습니다.',
    'Use this when the only bits at hand belong to another series. For tapping, prefer the slightly smaller bit over the slightly larger one — a hole can be opened up later, never closed.',
    'Sirve cuando solo tienes brocas de otra serie. Para roscar, elige la ligeramente menor antes que la mayor: un agujero se puede agrandar después, nunca encoger.',
    'Serve quando só há brocas de outra série. Para roscar, prefira a ligeiramente menor à maior: um furo pode ser alargado depois, nunca encolhido.',
    '手元に別系列のドリルしかないときに使います。ただしねじを立てるような場面では、少し太い方より少し細い方を選ぶのが安全です——穴は広げられても狭められません。',
    'Nützlich, wenn nur Bohrer einer anderen Reihe zur Hand sind. Beim Gewindeschneiden lieber den etwas kleineren als den etwas größeren wählen — ein Loch lässt sich aufweiten, nie verengen.',
    'Utile quand on n’a que des forets d’une autre série. Pour tarauder, préférez le foret légèrement plus petit : un trou s’agrandit toujours, jamais l’inverse.',
    'तब काम आता है जब पास केवल दूसरी श्रेणी के बिट हों। टैप करते समय थोड़ा बड़ा नहीं, थोड़ा छोटा चुनना सुरक्षित है — छेद बड़ा किया जा सकता है, छोटा नहीं।',
    '手边只有别的系列时用得上。不过攻螺纹这种要准的活儿，宁可选略小的而不是略大的——孔能扩大，不能变小。',
    '手邊只有別的系列時用得上。不過攻螺紋這種要準的活兒，寧可選略小的而不是略大的——孔能擴大，不能變小。',
  ),

  allTitle: T('지름 순으로 늘어놓기', 'Everything by diameter', 'Todo por diámetro', 'Tudo por diâmetro', '直径順に並べる', 'Alles nach Durchmesser', 'Tout par diamètre', 'व्यास के क्रम में', '按直径排列', '按直徑排列'),
  neighbourTitle: T('바로 위아래', 'One step up and down', 'Un paso arriba y abajo', 'Um passo acima e abaixo', 'すぐ上と下', 'Eine Stufe größer und kleiner', 'Un cran au-dessus et en dessous', 'ठीक ऊपर और नीचे', '相邻上下', '相鄰上下'),

  desc: T<(f: DrillFacts) => string>(
    f => `${f.bit.name} 드릴은 지름 ${f.bit.mm}mm(${f.inch}인치)입니다. 다른 계열에서는 ${f.near.map(n => n.name).join(', ')}가 가장 가깝습니다.`,
    f => `The ${f.bit.name} bit measures ${f.bit.mm} mm (${f.inch} in). The closest bits in the other series are ${f.near.map(n => n.name).join(', ')}.`,
    f => `La broca ${f.bit.name} mide ${f.bit.mm} mm (${f.inch} pulgadas). Lo más cercano en las otras series es ${f.near.map(n => n.name).join(', ')}.`,
    f => `A broca ${f.bit.name} mede ${f.bit.mm} mm (${f.inch} pol). O mais próximo nas outras séries é ${f.near.map(n => n.name).join(', ')}.`,
    f => `${f.bit.name}のドリルは直径${f.bit.mm}mm（${f.inch}インチ）です。他系列では${f.near.map(n => n.name).join('、')}が最も近くなります。`,
    f => `Der Bohrer ${f.bit.name} misst ${f.bit.mm} mm (${f.inch} Zoll). Am nächsten liegen in den anderen Reihen ${f.near.map(n => n.name).join(', ')}.`,
    f => `Le foret ${f.bit.name} mesure ${f.bit.mm} mm (${f.inch} pouce). Les plus proches dans les autres séries sont ${f.near.map(n => n.name).join(', ')}.`,
    f => `${f.bit.name} बिट का व्यास ${f.bit.mm} मिमी (${f.inch} इंच) है। अन्य श्रेणियों में सबसे पास ${f.near.map(n => n.name).join(', ')} हैं।`,
    f => `${f.bit.name} 钻头直径为 ${f.bit.mm} 毫米（${f.inch} 英寸）。其他系列中最接近的是 ${f.near.map(n => n.name).join('、')}。`,
    f => `${f.bit.name} 鑽頭直徑為 ${f.bit.mm} 毫米（${f.inch} 英寸）。其他系列中最接近的是 ${f.near.map(n => n.name).join('、')}。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '인치 계열은 64분의 몇입니다 — 16/64는 약분하면 1/4입니다.',
      '번호는 클수록 가늘고, 문자는 뒤로 갈수록 굵습니다. 문자 A가 #1 위를 잇습니다.',
      '1인치는 25.4mm이므로 인치 값에 25.4를 곱하면 밀리미터가 됩니다.',
      '나사 탭을 낼 구멍은 나사 외경에서 피치를 뺀 값에 가장 가까운 비트로 뚫습니다.',
    ],
    [
      'Inch bits are counted in sixty-fourths — 16/64 reduces to 1/4.',
      'Higher numbers are thinner; later letters are thicker, with A picking up above #1.',
      'An inch is 25.4 mm, so multiply the inch value by 25.4 to get millimetres.',
      'For tapping, drill with the bit nearest to the thread’s outside diameter minus its pitch.',
    ],
    [
      'Las brocas en pulgadas se cuentan en sesenta y cuatroavos: 16/64 se reduce a 1/4.',
      'Los números altos son más finos; las letras tardías, más gruesas, y la A sigue por encima de la #1.',
      'Una pulgada son 25,4 mm: multiplica el valor en pulgadas por 25,4 para obtener milímetros.',
      'Para roscar, taladra con la broca más cercana al diámetro exterior menos el paso.',
    ],
    [
      'As brocas em polegadas contam-se em sessenta e quatro avos: 16/64 reduz para 1/4.',
      'Números altos são mais finos; letras tardias, mais grossas, e o A segue acima do #1.',
      'Uma polegada tem 25,4 mm: multiplique o valor em polegadas por 25,4 para obter milímetros.',
      'Para roscar, fure com a broca mais próxima do diâmetro externo menos o passo.',
    ],
    [
      'インチ系列は64分の何かです——16/64は約分すると1/4です。',
      '番号は大きいほど細く、文字は後ろほど太くなります。文字Aが#1の上を継ぎます。',
      '1インチは25.4mmなので、インチ値に25.4を掛けるとミリになります。',
      'ねじを立てる穴は、外径からピッチを引いた値に最も近いドリルで開けます。',
    ],
    [
      'Zöllige Bohrer zählen in Vierundsechzigsteln — 16/64 gekürzt ist 1/4.',
      'Höhere Nummern sind dünner, spätere Buchstaben dicker; A setzt oberhalb von #1 an.',
      'Ein Zoll sind 25,4 mm: Zollwert mal 25,4 ergibt Millimeter.',
      'Zum Gewindeschneiden mit dem Bohrer bohren, der Außendurchmesser minus Steigung am nächsten kommt.',
    ],
    [
      'Les forets en pouces se comptent en soixante-quatrièmes : 16/64 se réduit à 1/4.',
      'Les numéros élevés sont plus fins, les lettres tardives plus grosses, le A prenant la suite du #1.',
      'Un pouce vaut 25,4 mm : multipliez la valeur en pouces par 25,4 pour obtenir des millimètres.',
      'Pour tarauder, percez avec le foret le plus proche du diamètre extérieur moins le pas.',
    ],
    [
      'इंच श्रेणी चौंसठवें हिस्सों में गिनी जाती है — 16/64 सरल करने पर 1/4।',
      'बड़े नंबर पतले, बाद के अक्षर मोटे; A, #1 के ऊपर से शुरू होता है।',
      'एक इंच 25.4 मिमी है, इसलिए इंच मान को 25.4 से गुणा करें।',
      'टैप के लिए वही बिट लें जो बाहरी व्यास घटा पिच के सबसे पास हो।',
    ],
    [
      '英寸系列以六十四分之几计——16/64 约分后是 1/4。',
      '号码越大越细，字母越靠后越粗，字母 A 接在 #1 之上。',
      '一英寸是 25.4 毫米，把英寸值乘以 25.4 即得毫米。',
      '攻螺纹的底孔，用最接近“外径减螺距”的钻头。',
    ],
    [
      '英寸系列以六十四分之幾計——16/64 約分後是 1/4。',
      '號碼越大越細，字母越靠後越粗，字母 A 接在 #1 之上。',
      '一英寸是 25.4 毫米，把英寸值乘以 25.4 即得毫米。',
      '攻螺紋的底孔，用最接近「外徑減螺距」的鑽頭。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '드릴 비트 규격표 — 미터·인치·번호·문자 187가지',
    'Drill bit chart — 187 sizes across metric, inch, number and letter',
    'Tabla de brocas — 187 medidas en métrico, pulgada, número y letra',
    'Tabela de brocas — 187 medidas em métrico, polegada, número e letra',
    'ドリル径一覧 — ミリ・インチ・番号・文字の187種',
    'Bohrer-Tabelle — 187 Größen in metrisch, Zoll, Nummer und Buchstabe',
    'Tableau des forets — 187 tailles en métrique, pouce, numéro et lettre',
    'ड्रिल बिट चार्ट — मीट्रिक, इंच, नंबर और अक्षर की 187 नाप',
    '钻头规格表 — 公制、英寸、号码、字母共 187 种',
    '鑽頭規格表 — 公制、英寸、號碼、字母共 187 種',
  ),

  hubMetaDesc: T(
    '네 계열의 드릴 지름을 밀리미터와 인치로 나란히 두고, 계열을 건너뛴 대체 비트와 그 지름으로 탭을 낼 수 있는 미터 나사까지 계산했습니다.',
    'Every drill diameter in millimetres and inches across four series, with the nearest substitute in each other series and the metric threads that size taps.',
    'Cada diámetro de broca en milímetros y pulgadas en cuatro series, con el sustituto más cercano de cada serie y las roscas métricas que esa medida permite roscar.',
    'Cada diâmetro de broca em milímetros e polegadas em quatro séries, com o substituto mais próximo de cada série e as roscas métricas que aquela medida abre.',
    '4系列のドリル径をミリとインチで並べ、系列をまたいだ代替ドリルと、その径で立てられるメートルねじまで計算しました。',
    'Jeder Bohrerdurchmesser in Millimeter und Zoll über vier Reihen — mit dem nächstliegenden Ersatz in jeder anderen Reihe und den metrischen Gewinden, die dieses Maß vorbohrt.',
    'Chaque diamètre de foret en millimètres et en pouces sur quatre séries, avec le substitut le plus proche dans chaque autre série et les filetages métriques que cette taille prépare.',
    'चार श्रेणियों के हर ड्रिल व्यास को मिलीमीटर और इंच में, साथ में हर दूसरी श्रेणी का निकटतम विकल्प और वे मीट्रिक थ्रेड जो उस नाप से बनते हैं।',
    '四个系列的钻头直径以毫米与英寸并列，附各系列中最接近的替代钻头，以及该尺寸可攻的公制螺纹。',
    '四個系列的鑽頭直徑以毫米與英寸並列，附各系列中最接近的替代鑽頭，以及該尺寸可攻的公制螺紋。',
  ),

  metaTitle: T<(f: DrillFacts) => string>(
    f => `${f.bit.name} 드릴 — ${f.bit.mm}mm`,
    f => `${f.bit.name} drill bit — ${f.bit.mm} mm`,
    f => `Broca ${f.bit.name} — ${f.bit.mm} mm`,
    f => `Broca ${f.bit.name} — ${f.bit.mm} mm`,
    f => `${f.bit.name}のドリル — ${f.bit.mm}mm`,
    f => `Bohrer ${f.bit.name} — ${f.bit.mm} mm`,
    f => `Foret ${f.bit.name} — ${f.bit.mm} mm`,
    f => `${f.bit.name} ड्रिल — ${f.bit.mm} मिमी`,
    f => `${f.bit.name} 钻头 — ${f.bit.mm} 毫米`,
    f => `${f.bit.name} 鑽頭 — ${f.bit.mm} 毫米`,
  ),

  metaDesc: T<(f: DrillFacts) => string>(
    f => `${f.bit.name} 드릴은 ${f.bit.mm}mm, 인치로는 ${f.inch}입니다. 다른 계열에서는 ${f.near.map(n => `${n.name}(${n.mm}mm)`).join(', ')}가 가장 가깝고, ${f.taps.length ? `${f.taps.map(t => t.label).join(', ')}의 탭 드릴로 쓸 수 있습니다` : '이 지름에 딱 맞는 미터 나사 탭은 없습니다'}.`,
    f => `The ${f.bit.name} bit is ${f.bit.mm} mm, or ${f.inch} in. The nearest bits elsewhere are ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}, and ${f.taps.length ? `it serves as the tap drill for ${f.taps.map(t => t.label).join(', ')}` : 'no metric thread taps at exactly this size'}.`,
    f => `La broca ${f.bit.name} mide ${f.bit.mm} mm, o ${f.inch} pulgadas. Lo más cercano en otras series es ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}, y ${f.taps.length ? `sirve como broca para ${f.taps.map(t => t.label).join(', ')}` : 'ninguna rosca métrica encaja exactamente con esta medida'}.`,
    f => `A broca ${f.bit.name} mede ${f.bit.mm} mm, ou ${f.inch} pol. O mais próximo em outras séries é ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}, e ${f.taps.length ? `serve como broca para ${f.taps.map(t => t.label).join(', ')}` : 'nenhuma rosca métrica encaixa exatamente nesta medida'}.`,
    f => `${f.bit.name}のドリルは${f.bit.mm}mm、インチでは${f.inch}です。他系列では${f.near.map(n => `${n.name}（${n.mm}mm）`).join('、')}が最も近く、${f.taps.length ? `${f.taps.map(t => t.label).join('、')}の下穴に使えます` : 'この径にちょうど合うメートルねじの下穴はありません'}。`,
    f => `Der Bohrer ${f.bit.name} misst ${f.bit.mm} mm bzw. ${f.inch} Zoll. Am nächsten liegen ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}, und ${f.taps.length ? `er dient als Kernlochbohrer für ${f.taps.map(t => t.label).join(', ')}` : 'kein metrisches Gewinde passt genau zu diesem Maß'}.`,
    f => `Le foret ${f.bit.name} mesure ${f.bit.mm} mm, soit ${f.inch} pouce. Les plus proches ailleurs sont ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}, et ${f.taps.length ? `il sert de foret de taraudage pour ${f.taps.map(t => t.label).join(', ')}` : 'aucun filetage métrique ne correspond exactement à cette taille'}.`,
    f => `${f.bit.name} बिट ${f.bit.mm} मिमी यानी ${f.inch} इंच का है। अन्य श्रेणियों में सबसे पास ${f.near.map(n => `${n.name} (${n.mm} मिमी)`).join(', ')} हैं, और ${f.taps.length ? `यह ${f.taps.map(t => t.label).join(', ')} का टैप ड्रिल है` : 'इस नाप से ठीक मेल खाता कोई मीट्रिक थ्रेड नहीं'}।`,
    f => `${f.bit.name} 钻头为 ${f.bit.mm} 毫米，合 ${f.inch} 英寸。其他系列中最接近的是 ${f.near.map(n => `${n.name}（${n.mm} 毫米）`).join('、')}，${f.taps.length ? `可用作 ${f.taps.map(t => t.label).join('、')} 的底孔钻头` : '没有正好匹配这一尺寸的公制螺纹底孔'}。`,
    f => `${f.bit.name} 鑽頭為 ${f.bit.mm} 毫米，合 ${f.inch} 英寸。其他系列中最接近的是 ${f.near.map(n => `${n.name}（${n.mm} 毫米）`).join('、')}，${f.taps.length ? `可用作 ${f.taps.map(t => t.label).join('、')} 的底孔鑽頭` : '沒有正好匹配這一尺寸的公制螺紋底孔'}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '#7 드릴이 몇 밀리인가요?', a: '5.1mm입니다. 번호 계열은 옛 철사 굵기에서 온 이름이라 번호와 지름 사이에 식이 없어, 표를 봐야 알 수 있습니다.' },
      { q: '인치 드릴로 미터 나사 탭을 내도 되나요?', a: '가까운 것이 있으면 됩니다. 다만 조금 굵은 쪽보다 조금 가는 쪽을 고르세요 — 구멍은 넓힐 수 있어도 좁힐 수는 없습니다.' },
      { q: '드릴 세트에 왜 3.3mm 같은 어중간한 값이 있나요?', a: 'M4 나사의 탭 드릴이기 때문입니다. 탭 드릴은 외경에서 피치를 뺀 값이라 눈금 사이에 떨어집니다.' },
      { q: '문자 드릴과 번호 드릴은 어떻게 이어지나요?', a: '번호는 #1(5.79mm)이 가장 굵고, 문자는 A(5.94mm)부터 시작해 Z(10.49mm)까지 굵어집니다. 두 계열이 그 자리에서 이어집니다.' },
      { q: '64분법은 왜 쓰나요?', a: '인치를 반으로 계속 나눈 것이 64분의 1까지 내려간 것입니다. 그래서 16/64처럼 적힌 것은 약분해 1/4로 부릅니다.' },
    ],
    [
      { q: 'How many millimetres is a #7 drill?', a: '5.1 mm. The number series inherits its names from old wire gauges, so no formula connects the number to the size — you have to look it up.' },
      { q: 'Can I tap a metric thread with an inch bit?', a: 'If one is close enough, yes. Prefer the slightly smaller bit over the slightly larger: a hole can be opened up, never closed.' },
      { q: 'Why do drill sets include odd sizes like 3.3 mm?', a: 'Because that is the tap drill for M4. Tap drills are outside diameter minus pitch, which always lands between the round numbers.' },
      { q: 'How do letter and number drills meet?', a: 'The numbers top out at #1 (5.79 mm) and the letters start at A (5.94 mm), running up to Z (10.49 mm). The two series join right there.' },
      { q: 'Why sixty-fourths?', a: 'Halving an inch again and again lands on 1/64. That is why a bit marked 16/64 is simply called 1/4.' },
    ],
    [
      { q: '¿Cuántos milímetros mide una broca #7?', a: '5,1 mm. La serie numérica hereda sus nombres de antiguos calibres de alambre, así que ninguna fórmula liga número y medida: hay que consultarla.' },
      { q: '¿Puedo roscar métrica con una broca en pulgadas?', a: 'Si hay una lo bastante cercana, sí. Elige la ligeramente menor antes que la mayor: un agujero se agranda, nunca se encoge.' },
      { q: '¿Por qué los juegos traen medidas raras como 3,3 mm?', a: 'Porque es la broca para M4. Las brocas de macho son diámetro exterior menos paso, y eso cae siempre entre números redondos.' },
      { q: '¿Cómo se unen las brocas de letra y de número?', a: 'Los números terminan en #1 (5,79 mm) y las letras empiezan en A (5,94 mm), hasta la Z (10,49 mm). Ahí se enlazan las dos series.' },
      { q: '¿Por qué sesenta y cuatroavos?', a: 'Partir la pulgada a la mitad una y otra vez llega a 1/64. Por eso una broca marcada 16/64 se llama simplemente 1/4.' },
    ],
    [
      { q: 'Quantos milímetros tem uma broca #7?', a: '5,1 mm. A série numérica herda nomes de antigas bitolas de arame, então nenhuma fórmula liga número e medida — é preciso consultar.' },
      { q: 'Posso roscar métrica com broca em polegadas?', a: 'Se houver uma próxima o bastante, sim. Prefira a ligeiramente menor à maior: um furo se alarga, nunca encolhe.' },
      { q: 'Por que os jogos trazem medidas estranhas como 3,3 mm?', a: 'Porque é a broca para M4. Brocas para macho são diâmetro externo menos passo, e isso cai sempre entre números redondos.' },
      { q: 'Como brocas de letra e de número se encontram?', a: 'Os números terminam em #1 (5,79 mm) e as letras começam em A (5,94 mm), até Z (10,49 mm). É ali que as séries se emendam.' },
      { q: 'Por que sessenta e quatro avos?', a: 'Dividir a polegada ao meio repetidamente chega a 1/64. Por isso uma broca marcada 16/64 é chamada simplesmente 1/4.' },
    ],
    [
      { q: '#7のドリルは何ミリですか？', a: '5.1mmです。番号系列は古い針金の太さから来た名前なので、番号と直径の間に式がなく、表を見るしかありません。' },
      { q: 'インチドリルでメートルねじの下穴を開けてもよいですか？', a: '十分近いものがあれば構いません。ただし少し太い方より少し細い方を選んでください——穴は広げられても狭められません。' },
      { q: 'ドリルセットに3.3mmのような半端な径があるのはなぜですか？', a: 'M4の下穴径だからです。下穴径は外径からピッチを引いた値なので、きりのいい数字の間に落ちます。' },
      { q: '文字ドリルと番号ドリルはどうつながりますか？', a: '番号は#1(5.79mm)が最も太く、文字はA(5.94mm)から始まってZ(10.49mm)まで太くなります。そこで二つの系列がつながります。' },
      { q: 'なぜ64分法なのですか？', a: 'インチを半分に割り続けると1/64まで下がるからです。だから16/64と刻まれたものは約分して1/4と呼びます。' },
    ],
    [
      { q: 'Wie viele Millimeter hat ein #7-Bohrer?', a: '5,1 mm. Die Nummernreihe erbt ihre Namen von alten Drahtlehren — keine Formel verbindet Nummer und Maß, man muss nachschlagen.' },
      { q: 'Darf ich ein metrisches Gewinde mit einem Zollbohrer vorbohren?', a: 'Wenn einer nah genug liegt, ja. Nimm lieber den etwas kleineren als den etwas größeren: Ein Loch lässt sich aufweiten, nie verengen.' },
      { q: 'Warum liegen krumme Maße wie 3,3 mm im Bohrersatz?', a: 'Weil das das Kernloch für M4 ist. Kernlochmaße sind Außendurchmesser minus Steigung und landen stets zwischen den runden Zahlen.' },
      { q: 'Wie treffen Buchstaben- und Nummernbohrer aufeinander?', a: 'Die Nummern enden bei #1 (5,79 mm), die Buchstaben beginnen bei A (5,94 mm) und laufen bis Z (10,49 mm). Genau dort schließen die Reihen an.' },
      { q: 'Warum Vierundsechzigstel?', a: 'Halbiert man den Zoll immer weiter, landet man bei 1/64. Deshalb heißt ein mit 16/64 markierter Bohrer schlicht 1/4.' },
    ],
    [
      { q: 'Combien de millimètres fait un foret #7 ?', a: '5,1 mm. La série à numéros hérite de noms d’anciennes jauges de fil : aucune formule ne relie le numéro à la taille, il faut consulter.' },
      { q: 'Peut-on tarauder du métrique avec un foret en pouces ?', a: 'Si l’un est assez proche, oui. Préférez le foret légèrement plus petit : un trou s’agrandit, jamais l’inverse.' },
      { q: 'Pourquoi les coffrets contiennent-ils des tailles comme 3,3 mm ?', a: 'Parce que c’est le foret de taraudage du M4. Ces tailles valent diamètre extérieur moins pas, et tombent donc entre les nombres ronds.' },
      { q: 'Comment forets à lettre et à numéro se rejoignent-ils ?', a: 'Les numéros culminent au #1 (5,79 mm) et les lettres démarrent au A (5,94 mm) jusqu’au Z (10,49 mm). C’est là que les deux séries se raccordent.' },
      { q: 'Pourquoi des soixante-quatrièmes ?', a: 'Couper le pouce en deux encore et encore mène au 1/64. D’où un foret marqué 16/64 que l’on appelle simplement 1/4.' },
    ],
    [
      { q: '#7 ड्रिल कितने मिलीमीटर का है?', a: '5.1 मिमी। नंबर श्रेणी के नाम पुराने तार-गेज से आए हैं, इसलिए नंबर और आकार के बीच कोई सूत्र नहीं — देखना ही पड़ता है।' },
      { q: 'क्या इंच बिट से मीट्रिक थ्रेड टैप कर सकते हैं?', a: 'यदि कोई पर्याप्त पास हो तो हाँ। थोड़ा बड़ा नहीं, थोड़ा छोटा चुनिए — छेद बड़ा किया जा सकता है, छोटा नहीं।' },
      { q: 'ड्रिल सेट में 3.3 मिमी जैसे अटपटे नाप क्यों?', a: 'क्योंकि वह M4 का टैप ड्रिल है। टैप ड्रिल = बाहरी व्यास घटा पिच, जो हमेशा गोल संख्याओं के बीच पड़ता है।' },
      { q: 'अक्षर और नंबर ड्रिल कहाँ मिलते हैं?', a: 'नंबर #1 (5.79 मिमी) पर सबसे मोटे होते हैं और अक्षर A (5.94 मिमी) से शुरू होकर Z (10.49 मिमी) तक जाते हैं। दोनों श्रेणियाँ वहीं जुड़ती हैं।' },
      { q: 'चौंसठवें हिस्से ही क्यों?', a: 'इंच को बार-बार आधा करते जाएँ तो 1/64 पर पहुँचते हैं। इसीलिए 16/64 अंकित बिट को सीधे 1/4 कहा जाता है।' },
    ],
    [
      { q: '#7 钻头是多少毫米？', a: '5.1 毫米。号码系列的名字来自旧线规，编号与直径之间没有公式，只能查表。' },
      { q: '能用英寸钻头攻公制螺纹吗？', a: '有足够接近的就可以。宁可选略小的而不是略大的——孔能扩大，不能变小。' },
      { q: '钻头套装里为什么有 3.3 毫米这种零碎尺寸？', a: '因为那是 M4 的底孔。底孔直径是外径减螺距，总会落在整数之间。' },
      { q: '字母钻头和号码钻头怎么衔接？', a: '号码最粗到 #1（5.79 毫米），字母从 A（5.94 毫米）起一直到 Z（10.49 毫米）。两个系列正是在这里接上。' },
      { q: '为什么用六十四分之几？', a: '把一英寸不断对半分，就分到了 1/64。所以标着 16/64 的钻头，直接叫 1/4。' },
    ],
    [
      { q: '#7 鑽頭是多少毫米？', a: '5.1 毫米。號碼系列的名字來自舊線規，編號與直徑之間沒有公式，只能查表。' },
      { q: '能用英寸鑽頭攻公制螺紋嗎？', a: '有足夠接近的就可以。寧可選略小的而不是略大的——孔能擴大，不能變小。' },
      { q: '鑽頭套裝裡為什麼有 3.3 毫米這種零碎尺寸？', a: '因為那是 M4 的底孔。底孔直徑是外徑減螺距，總會落在整數之間。' },
      { q: '字母鑽頭和號碼鑽頭怎麼銜接？', a: '號碼最粗到 #1（5.79 毫米），字母從 A（5.94 毫米）起一直到 Z（10.49 毫米）。兩個系列正是在這裡接上。' },
      { q: '為什麼用六十四分之幾？', a: '把一英寸不斷對半分，就分到了 1/64。所以標著 16/64 的鑽頭，直接叫 1/4。' },
    ],
  ),

  drillFaq: T<(f: DrillFacts) => FaqItem[]>(
    f => [
      { q: `${f.bit.name} 드릴은 몇 mm인가요?`, a: `${f.bit.mm}mm입니다. 인치로는 ${f.inch}입니다.` },
      { q: `다른 계열에서는 무엇을 쓰나요?`, a: f.near.map(n => `${n.name}(${n.mm}mm)`).join(', ') + '가 가장 가깝습니다.' },
      { q: `이 지름으로 어떤 나사 탭을 낼 수 있나요?`, a: f.taps.length ? `${f.taps.map(t => `${t.label}(탭 드릴 ${t.tapDrill}mm)`).join(', ')}입니다.` : `이 표의 미터 나사 가운데 딱 맞는 것은 없습니다.` },
      { q: `구멍의 단면적은요?`, a: `${f.area}mm²입니다.` },
    ],
    f => [
      { q: `How wide is the ${f.bit.name} bit?`, a: `${f.bit.mm} mm, or ${f.inch} inches.` },
      { q: `What would I use from another series?`, a: `The closest are ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}.` },
      { q: `Which threads can this size tap?`, a: f.taps.length ? `${f.taps.map(t => `${t.label} (tap drill ${t.tapDrill} mm)`).join(', ')}.` : `None of the metric threads in this table match closely enough.` },
      { q: `What is the cross-section?`, a: `${f.area} mm².` },
    ],
    f => [
      { q: `¿Cuánto mide la broca ${f.bit.name}?`, a: `${f.bit.mm} mm, o ${f.inch} pulgadas.` },
      { q: `¿Qué uso de otra serie?`, a: `Lo más cercano es ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}.` },
      { q: `¿Qué roscas permite abrir esta medida?`, a: f.taps.length ? `${f.taps.map(t => `${t.label} (broca ${t.tapDrill} mm)`).join(', ')}.` : `Ninguna rosca métrica de esta tabla encaja lo suficiente.` },
      { q: `¿Cuál es la sección?`, a: `${f.area} mm².` },
    ],
    f => [
      { q: `Quanto mede a broca ${f.bit.name}?`, a: `${f.bit.mm} mm, ou ${f.inch} polegadas.` },
      { q: `O que uso de outra série?`, a: `O mais próximo é ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}.` },
      { q: `Que roscas esta medida abre?`, a: f.taps.length ? `${f.taps.map(t => `${t.label} (broca ${t.tapDrill} mm)`).join(', ')}.` : `Nenhuma rosca métrica desta tabela encaixa o bastante.` },
      { q: `Qual é a seção?`, a: `${f.area} mm².` },
    ],
    f => [
      { q: `${f.bit.name}のドリルは何mmですか？`, a: `${f.bit.mm}mmです。インチでは${f.inch}です。` },
      { q: `他の系列では何を使いますか？`, a: `${f.near.map(n => `${n.name}（${n.mm}mm）`).join('、')}が最も近いです。` },
      { q: `この径でどのねじを立てられますか？`, a: f.taps.length ? `${f.taps.map(t => `${t.label}（下穴${t.tapDrill}mm）`).join('、')}です。` : `この表のメートルねじの中にちょうど合うものはありません。` },
      { q: `穴の断面積は？`, a: `${f.area}mm²です。` },
    ],
    f => [
      { q: `Wie dick ist der Bohrer ${f.bit.name}?`, a: `${f.bit.mm} mm beziehungsweise ${f.inch} Zoll.` },
      { q: `Was nehme ich aus einer anderen Reihe?`, a: `Am nächsten liegen ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}.` },
      { q: `Welche Gewinde lassen sich damit vorbohren?`, a: f.taps.length ? `${f.taps.map(t => `${t.label} (Kernloch ${t.tapDrill} mm)`).join(', ')}.` : `Kein metrisches Gewinde dieser Tabelle passt nah genug.` },
      { q: `Wie groß ist der Querschnitt?`, a: `${f.area} mm².` },
    ],
    f => [
      { q: `Quel diamètre fait le foret ${f.bit.name} ?`, a: `${f.bit.mm} mm, soit ${f.inch} pouce.` },
      { q: `Que prendre dans une autre série ?`, a: `Les plus proches sont ${f.near.map(n => `${n.name} (${n.mm} mm)`).join(', ')}.` },
      { q: `Quels filetages cette taille prépare-t-elle ?`, a: f.taps.length ? `${f.taps.map(t => `${t.label} (foret ${t.tapDrill} mm)`).join(', ')}.` : `Aucun filetage métrique de ce tableau ne correspond d’assez près.` },
      { q: `Quelle est la section ?`, a: `${f.area} mm².` },
    ],
    f => [
      { q: `${f.bit.name} बिट कितने मिमी का है?`, a: `${f.bit.mm} मिमी, यानी ${f.inch} इंच।` },
      { q: `दूसरी श्रेणी से क्या लें?`, a: `सबसे पास ${f.near.map(n => `${n.name} (${n.mm} मिमी)`).join(', ')} हैं।` },
      { q: `इस नाप से कौन-से थ्रेड बनते हैं?`, a: f.taps.length ? `${f.taps.map(t => `${t.label} (टैप ड्रिल ${t.tapDrill} मिमी)`).join(', ')}।` : `इस तालिका के किसी मीट्रिक थ्रेड से पर्याप्त मेल नहीं।` },
      { q: `अनुप्रस्थ काट कितना है?`, a: `${f.area} मिमी²।` },
    ],
    f => [
      { q: `${f.bit.name} 钻头是多少毫米？`, a: `${f.bit.mm} 毫米，合 ${f.inch} 英寸。` },
      { q: `其他系列该用哪支？`, a: `最接近的是 ${f.near.map(n => `${n.name}（${n.mm} 毫米）`).join('、')}。` },
      { q: `这个尺寸能攻哪些螺纹？`, a: f.taps.length ? `${f.taps.map(t => `${t.label}（底孔 ${t.tapDrill} 毫米）`).join('、')}。` : `本表的公制螺纹里没有足够匹配的。` },
      { q: `孔的截面积是多少？`, a: `${f.area} 平方毫米。` },
    ],
    f => [
      { q: `${f.bit.name} 鑽頭是多少毫米？`, a: `${f.bit.mm} 毫米，合 ${f.inch} 英寸。` },
      { q: `其他系列該用哪支？`, a: `最接近的是 ${f.near.map(n => `${n.name}（${n.mm} 毫米）`).join('、')}。` },
      { q: `這個尺寸能攻哪些螺紋？`, a: f.taps.length ? `${f.taps.map(t => `${t.label}（底孔 ${t.tapDrill} 毫米）`).join('、')}。` : `本表的公制螺紋裡沒有足夠匹配的。` },
      { q: `孔的截面積是多少？`, a: `${f.area} 平方毫米。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const DRILL_UI: L<DrillUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<DrillUI>;
