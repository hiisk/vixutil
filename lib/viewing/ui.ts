/**
 * 시청거리 화면의 문구 — 열 언어.
 *
 * 이 화면이 답하려는 것은 "왜 4K가 생각만큼 달라 보이지 않는가"다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { ViewingFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface ViewingUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  resName: (key: string) => string;
  widthLabel: string;
  heightLabel: string;
  smpteLabel: string;
  thxLabel: string;
  limitLabel: string;
  worthLabel: string;
  ppiLabel: string;
  pixelLabel: string;
  sizeTitle: string;
  sizeNote: string;
  angleTitle: string;
  angleNote: string;
  limitTitle: string;
  limitNote: string;
  worthTitle: string;
  worthNote: string;
  roomTitle: string;
  roomNote: string;
  tableTitle: string;
  neighbourTitle: string;
  resRowTitle: string;
  inchRowTitle: string;
  desc: (f: ViewingFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: ViewingFacts) => string;
  metaDesc: (f: ViewingFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: ViewingFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 해상도 이름은 어느 언어에서나 같은 약칭을 쓴다 */
const RES: Record<string, string> = {
  hd: 'HD (1280×720)', fhd: 'FHD (1920×1080)', qhd: 'QHD (2560×1440)',
  uhd: '4K UHD (3840×2160)', '8k': '8K (7680×4320)',
};
const resName = (key: string) => RES[key] ?? key;

type Spec = { [K in keyof ViewingUI]: L<ViewingUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('TV 시청거리', 'TV viewing distance', 'Distancia de visión', 'Distância de visão', 'テレビの視聴距離', 'TV-Sitzabstand', 'Distance de visionnage', 'टीवी देखने की दूरी', '电视观看距离', '電視觀看距離'),

  hubTitle: T(
    'TV 시청거리 100칸 — 4K가 값을 하려면 얼마나 가까이 앉아야 하나',
    '100 viewing-distance cells — how close you must sit for 4K to matter',
    '100 distancias de visión — cuánto hay que acercarse para que el 4K cuente',
    '100 distâncias de visão — quão perto sentar para o 4K valer',
    'テレビの視聴距離100マス — 4Kが効くにはどれだけ近づくか',
    '100 Sitzabstände — wie nah man sitzen muss, damit 4K zählt',
    '100 distances de visionnage — à quelle distance la 4K compte vraiment',
    '100 दूरी खाने — 4K के मायने रखने के लिए कितना पास बैठें',
    '100 格观看距离 — 要坐多近，4K 才有意义',
    '100 格觀看距離 — 要坐多近，4K 才有意義',
  ),

  hubLead: T(
    '화면 크기 스무 가지와 해상도 다섯 가지가 만나는 칸마다 화면 가로세로, 권장 거리 두 가지, 화소가 보이기 시작하는 거리를 계산했습니다. 대각 길이 하나만 있으면 나머지는 전부 계산으로 나옵니다.',
    'Screen width and height, two recommended distances, and the distance at which pixels become visible — for every meeting of 20 screen sizes and 5 resolutions. One diagonal is enough; the rest follows.',
    'Ancho y alto de pantalla, dos distancias recomendadas y la distancia a la que se ven los píxeles, para cada cruce de 20 tamaños y 5 resoluciones. Basta la diagonal; lo demás se calcula.',
    'Largura e altura da tela, duas distâncias recomendadas e a distância em que os pixels aparecem, para cada cruzamento de 20 tamanhos e 5 resoluções. Basta a diagonal; o resto se calcula.',
    '画面の縦横、推奨距離2通り、画素が見え始める距離を、画面サイズ20通り×解像度5通りの各マスで計算しました。対角の長さ1つあれば残りはすべて計算で出ます。',
    'Bildbreite und -höhe, zwei empfohlene Abstände und die Entfernung, ab der Pixel sichtbar werden — für jede Begegnung von 20 Bildgrößen und 5 Auflösungen. Die Diagonale genügt, der Rest folgt.',
    'Largeur et hauteur de l’écran, deux distances recommandées et la distance à laquelle les pixels se voient, pour chaque croisement de 20 tailles et 5 définitions. La diagonale suffit ; le reste se calcule.',
    'स्क्रीन की चौड़ाई-ऊँचाई, दो अनुशंसित दूरियाँ, और वह दूरी जहाँ पिक्सेल दिखने लगते हैं — 20 आकारों और 5 रिज़ॉल्यूशनों के हर मेल के लिए। विकर्ण भर से बाकी सब निकल आता है।',
    '20 种屏幕尺寸与 5 种分辨率交汇的每一格，都算出屏幕宽高、两种推荐距离，以及像素开始可见的距离。只要有对角线，其余全部算得出来。',
    '20 種螢幕尺寸與 5 種解析度交匯的每一格，都算出螢幕寬高、兩種推薦距離，以及像素開始可見的距離。只要有對角線，其餘全部算得出來。',
  ),

  resName: T<(k: string) => string>(resName, resName, resName, resName, resName, resName, resName, resName, resName, resName),

  widthLabel: T('화면 가로', 'Screen width', 'Ancho de pantalla', 'Largura da tela', '画面の横', 'Bildbreite', 'Largeur d’écran', 'स्क्रीन चौड़ाई', '屏幕宽度', '螢幕寬度'),
  heightLabel: T('화면 세로', 'Screen height', 'Alto de pantalla', 'Altura da tela', '画面の縦', 'Bildhöhe', 'Hauteur d’écran', 'स्क्रीन ऊँचाई', '屏幕高度', '螢幕高度'),
  smpteLabel: T('SMPTE 권장(30도)', 'SMPTE distance (30°)', 'Distancia SMPTE (30°)', 'Distância SMPTE (30°)', 'SMPTE推奨(30度)', 'SMPTE-Abstand (30°)', 'Distance SMPTE (30°)', 'SMPTE दूरी (30°)', 'SMPTE 推荐（30°）', 'SMPTE 推薦（30°）'),
  thxLabel: T('THX 권장(40도)', 'THX distance (40°)', 'Distancia THX (40°)', 'Distância THX (40°)', 'THX推奨(40度)', 'THX-Abstand (40°)', 'Distance THX (40°)', 'THX दूरी (40°)', 'THX 推荐（40°）', 'THX 推薦（40°）'),
  limitLabel: T('화소가 보이는 거리', 'Where pixels become visible', 'Donde se ven los píxeles', 'Onde os pixels aparecem', '画素が見える距離', 'Ab hier sieht man Pixel', 'Distance où les pixels se voient', 'जहाँ पिक्सेल दिखते हैं', '像素可见距离', '像素可見距離'),
  worthLabel: T('이 해상도가 값을 하는 거리', 'Where this resolution earns its keep', 'Donde esta resolución aporta', 'Onde esta resolução vale', 'この解像度が効く距離', 'Ab hier lohnt die Auflösung', 'Distance où la définition compte', 'जहाँ यह रिज़ॉल्यूशन काम आता है', '该分辨率起作用的距离', '該解析度起作用的距離'),
  ppiLabel: T('인치당 화소', 'Pixels per inch', 'Píxeles por pulgada', 'Pixels por polegada', '1インチあたりの画素', 'Pixel pro Zoll', 'Pixels par pouce', 'प्रति इंच पिक्सेल', '每英寸像素', '每英寸像素'),
  pixelLabel: T('화소', 'Pixels', 'Píxeles', 'Pixels', '画素', 'Pixel', 'Pixels', 'पिक्सेल', '像素', '像素'),

  sizeTitle: T('대각 하나가 나머지를 정합니다', 'The diagonal decides the rest', 'La diagonal decide lo demás', 'A diagonal decide o resto', '対角1つが残りを決めます', 'Die Diagonale bestimmt den Rest', 'La diagonale décide du reste', 'विकर्ण ही बाकी तय करता है', '对角线决定其余一切', '對角線決定其餘一切'),

  sizeNote: T(
    '화면 크기는 대각 길이만 인치로 적습니다. 16:9라면 가로세로가 거기서 나옵니다 — 가로는 대각의 0.8716배, 세로는 0.4903배입니다. 그래서 55인치는 가로 121.8cm·세로 68.5cm입니다. 인치 숫자가 커도 가로는 생각보다 덜 늘어납니다. 대각이 √(가로² + 세로²)이기 때문입니다.',
    'A screen is sold by its diagonal alone. At 16:9 that fixes the rest: width is 0.8716 of the diagonal, height 0.4903. A 55-inch set is therefore 121.8 cm wide and 68.5 cm tall. The width grows more slowly than the inch number suggests, because the diagonal is √(width² + height²).',
    'Una pantalla se vende solo por su diagonal. En 16:9 eso fija lo demás: el ancho es 0,8716 de la diagonal y el alto 0,4903. Una de 55 pulgadas mide 121,8 cm de ancho y 68,5 de alto. El ancho crece más despacio de lo que sugiere el número de pulgadas, porque la diagonal es √(ancho² + alto²).',
    'Uma tela é vendida só pela diagonal. Em 16:9 isso fixa o resto: a largura é 0,8716 da diagonal e a altura 0,4903. Uma de 55 polegadas tem 121,8 cm de largura e 68,5 de altura. A largura cresce mais devagar do que o número de polegadas sugere, porque a diagonal é √(largura² + altura²).',
    '画面は対角の長さだけをインチで表します。16:9なら残りはそこから出ます — 横は対角の0.8716倍、縦は0.4903倍です。だから55インチは横121.8cm・縦68.5cmです。インチの数字が大きくても横は思ったほど伸びません。対角が√(横² + 縦²)だからです。',
    'Ein Bildschirm wird allein über die Diagonale verkauft. Bei 16:9 folgt daraus der Rest: die Breite ist das 0,8716-Fache der Diagonale, die Höhe das 0,4903-Fache. Ein 55-Zöller ist also 121,8 cm breit und 68,5 cm hoch. Die Breite wächst langsamer als die Zollzahl nahelegt, denn die Diagonale ist √(Breite² + Höhe²).',
    'Un écran se vend à la seule diagonale. En 16:9, cela fixe le reste : la largeur vaut 0,8716 fois la diagonale, la hauteur 0,4903. Un 55 pouces fait donc 121,8 cm de large et 68,5 de haut. La largeur croît plus lentement que le nombre de pouces ne le laisse croire, car la diagonale vaut √(largeur² + hauteur²).',
    'स्क्रीन केवल विकर्ण से बिकती है। 16:9 पर वही बाकी तय करता है — चौड़ाई विकर्ण की 0.8716 गुना, ऊँचाई 0.4903 गुना। इसलिए 55 इंच की चौड़ाई 121.8 सेमी और ऊँचाई 68.5 सेमी है। इंच की संख्या जितना कहती है, चौड़ाई उससे धीमे बढ़ती है, क्योंकि विकर्ण √(चौड़ाई² + ऊँचाई²) है।',
    '屏幕只按对角线尺寸标注。在 16:9 下其余就定了——宽是对角线的 0.8716 倍，高是 0.4903 倍。所以 55 英寸的宽是 121.8cm、高是 68.5cm。英寸数字变大，宽度增加得却没那么多，因为对角线是 √(宽² + 高²)。',
    '螢幕只按對角線尺寸標註。在 16:9 下其餘就定了——寬是對角線的 0.8716 倍，高是 0.4903 倍。所以 55 英寸的寬是 121.8cm、高是 68.5cm。英寸數字變大，寬度增加得卻沒那麼多，因為對角線是 √(寬² + 高²)。',
  ),

  angleTitle: T('권장 거리는 시야각이 정합니다', 'The recommended distance is an angle', 'La distancia recomendada es un ángulo', 'A distância recomendada é um ângulo', '推奨距離は視野角が決めます', 'Der empfohlene Abstand ist ein Winkel', 'La distance conseillée est un angle', 'अनुशंसित दूरी एक कोण है', '推荐距离其实是一个角度', '推薦距離其實是一個角度'),

  angleNote: T(
    '"몇 미터"가 아니라 "화면이 시야에서 몇 도를 차지하는가"가 기준입니다. SMPTE는 30도, THX는 40도를 듭니다. 각이 클수록 화면이 시야를 더 채우니 더 가까이 앉습니다 — 그래서 THX 거리가 늘 SMPTE보다 짧고, 둘의 비는 화면 크기와 상관없이 1.36으로 일정합니다. 55인치면 SMPTE 227cm, THX 167cm입니다.',
    'The standard is not “so many metres” but “how much of your field of view the screen fills”. SMPTE says 30 degrees, THX up to 40. A wider angle means sitting closer, so the THX distance is always shorter — and the ratio between them is a constant 1.36, whatever the screen size. For 55 inches: 227 cm and 167 cm.',
    'El criterio no es «tantos metros» sino «cuánto campo visual ocupa la pantalla». SMPTE dice 30 grados; THX, hasta 40. Más ángulo significa sentarse más cerca, así que la distancia THX siempre es menor, y la razón entre ambas es un 1,36 constante, sea cual sea el tamaño. Para 55 pulgadas: 227 cm y 167 cm.',
    'O critério não é “tantos metros”, e sim “quanto do campo de visão a tela ocupa”. A SMPTE diz 30 graus; a THX, até 40. Ângulo maior significa sentar mais perto, então a distância THX é sempre menor — e a razão entre as duas é 1,36, constante para qualquer tamanho. Para 55 polegadas: 227 cm e 167 cm.',
    '「何メートル」ではなく「画面が視野の何度を占めるか」が基準です。SMPTEは30度、THXは40度を挙げます。角が大きいほど画面が視野を埋めるので近くに座ります — だからTHXの距離は常にSMPTEより短く、2つの比は画面の大きさに関係なく1.36で一定です。55インチならSMPTE 227cm、THX 167cmです。',
    'Maßstab ist nicht „so viele Meter“, sondern „wie viel Sichtfeld der Bildschirm füllt“. SMPTE nennt 30 Grad, THX bis 40. Ein größerer Winkel heißt näher sitzen, darum ist der THX-Abstand stets kürzer — und ihr Verhältnis liegt konstant bei 1,36, unabhängig von der Größe. Bei 55 Zoll: 227 cm und 167 cm.',
    'Le repère n’est pas « tant de mètres » mais « quelle part du champ visuel l’écran occupe ». La SMPTE dit 30 degrés, THX jusqu’à 40. Un angle plus large veut dire s’asseoir plus près : la distance THX est toujours plus courte, et le rapport entre les deux vaut 1,36, quelle que soit la taille. Pour 55 pouces : 227 cm et 167 cm.',
    'मानक “कितने मीटर” नहीं बल्कि “स्क्रीन दृष्टि-क्षेत्र का कितना भाग भरती है” है। SMPTE 30 डिग्री कहता है, THX 40 तक। कोण बड़ा तो पास बैठना पड़ता है, इसलिए THX दूरी हमेशा कम रहती है — और दोनों का अनुपात आकार से निरपेक्ष 1.36 रहता है। 55 इंच पर: 227 सेमी और 167 सेमी।',
    '标准不是"几米"，而是"屏幕占据视野多少度"。SMPTE 取 30 度，THX 取到 40 度。角度越大就要坐得越近，所以 THX 距离总是更短，而两者之比恒为 1.36，与屏幕大小无关。55 英寸时是 227cm 和 167cm。',
    '標準不是「幾公尺」，而是「螢幕佔據視野多少度」。SMPTE 取 30 度，THX 取到 40 度。角度越大就要坐得越近，所以 THX 距離總是更短，而兩者之比恆為 1.36，與螢幕大小無關。55 英寸時是 227cm 和 167cm。',
  ),

  limitTitle: T('화소가 보이는 거리는 1분각이 정합니다', 'One arcminute decides where pixels show', 'Un minuto de arco marca dónde se ven los píxeles', 'Um minuto de arco marca onde os pixels aparecem', '画素が見える距離は1分角が決めます', 'Eine Bogenminute entscheidet, ab wann Pixel sichtbar sind', 'Une minute d’arc décide où les pixels se voient', 'एक आर्कमिनट तय करता है कि पिक्सेल कहाँ दिखेंगे', '像素何时可见由一角分决定', '像素何時可見由一角分決定'),

  limitNote: T(
    '시력 1.0은 1분각(60분의 1도)을 갈라 보는 능력으로 정의됩니다. 화소 하나가 그보다 작게 보이면 옆 화소와 붙어 보입니다. 그래서 화소가 1분각으로 보이는 거리를 계산하면 "이보다 가까이 앉으면 화소가 눈에 띈다"는 선이 나옵니다. 55인치라면 4K는 109cm, FHD는 218cm입니다 — 화소가 두 배 촘촘하면 그 선도 절반이 됩니다.',
    'Normal 20/20 vision is defined as resolving one arcminute, a sixtieth of a degree. A pixel smaller than that blends into its neighbour. Working out the distance at which one pixel spans an arcminute gives the line where the grid starts to show: 109 cm for 4K on a 55-inch screen, 218 cm for FHD. Twice the pixel density halves the line.',
    'La visión 20/20 se define como resolver un minuto de arco, un sesentavo de grado. Un píxel más pequeño que eso se funde con el vecino. Calcular la distancia a la que un píxel abarca un minuto de arco da la línea donde la rejilla empieza a notarse: 109 cm para 4K en 55 pulgadas, 218 cm para FHD. El doble de densidad, la mitad de la línea.',
    'A visão 20/20 é definida como resolver um minuto de arco, um sexagésimo de grau. Um pixel menor que isso se funde ao vizinho. Calcular a distância em que um pixel ocupa um minuto de arco dá a linha onde a grade começa a aparecer: 109 cm para 4K numa tela de 55 polegadas, 218 cm para FHD. O dobro da densidade, metade da linha.',
    '視力1.0は1分角(60分の1度)を分けて見る力と定義されます。画素1つがそれより小さく見えれば隣とくっついて見えます。だから画素が1分角に見える距離を計算すると「これより近づくと画素が目につく」線が出ます。55インチなら4Kは109cm、FHDは218cmです — 画素が2倍細かければその線も半分です。',
    'Normalsichtigkeit ist definiert als das Auflösen einer Bogenminute, eines Sechzigstel Grads. Ein kleiner erscheinendes Pixel verschmilzt mit dem Nachbarn. Die Entfernung, in der ein Pixel eine Bogenminute misst, markiert also, ab wann das Raster auffällt: 109 cm für 4K auf 55 Zoll, 218 cm für FHD. Doppelte Pixeldichte halbiert die Linie.',
    'Une vision de 10/10 se définit par la résolution d’une minute d’arc, un soixantième de degré. Un pixel plus petit que cela se fond dans son voisin. Calculer la distance à laquelle un pixel couvre une minute d’arc donne la limite où la trame se voit : 109 cm pour la 4K en 55 pouces, 218 cm pour la FHD. Doubler la densité divise la limite par deux.',
    'सामान्य दृष्टि की परिभाषा एक आर्कमिनट — डिग्री के साठवें भाग — को अलग देख पाना है। इससे छोटा दिखने वाला पिक्सेल पड़ोसी में घुल जाता है। जिस दूरी पर एक पिक्सेल एक आर्कमिनट घेरता है, वही रेखा है जहाँ से जाली दिखने लगती है: 55 इंच पर 4K के लिए 109 सेमी, FHD के लिए 218 सेमी। घनत्व दोगुना तो रेखा आधी।',
    '视力 1.0 的定义就是能分辨一角分，也就是六十分之一度。比这更小的像素会和邻居糊在一起。算出一个像素张角为一角分的距离，就得到"再近就看得见像素颗粒"的界线：55 英寸上 4K 是 109cm，FHD 是 218cm。像素密一倍，这条线就减半。',
    '視力 1.0 的定義就是能分辨一角分，也就是六十分之一度。比這更小的像素會和鄰居糊在一起。算出一個像素張角為一角分的距離，就得到「再近就看得見像素顆粒」的界線：55 英寸上 4K 是 109cm，FHD 是 218cm。像素密一倍，這條線就減半。',
  ),

  worthTitle: T('그래서 4K가 값을 하려면', 'So when does 4K actually earn its keep', 'Entonces, ¿cuándo aporta el 4K?', 'Então, quando o 4K vale mesmo?', 'では4Kが効くのはいつか', 'Wann lohnt 4K also wirklich', 'Alors, quand la 4K sert-elle vraiment', 'तो 4K कब वाकई काम आता है', '那么 4K 到底何时才有意义', '那麼 4K 到底何時才有意義'),

  worthNote: T(
    '해상도를 올린 것이 눈에 닿으려면, 한 단계 아래 해상도의 화소를 갈라 볼 수 있는 자리에 앉아야 합니다. 그보다 멀면 아래 단계도 이미 매끄러워 보이므로 차이가 없습니다. 여기서 재미있는 것이 나옵니다 — SMPTE가 드는 자리에서 FHD 화소는 딱 문턱에 섭니다(권장 거리가 화소 한계보다 4% 멀 뿐입니다). 화면이 커도 작아도 이 비는 그대로입니다. 둘 다 화면 폭에 정비례하기 때문입니다.',
    'For extra resolution to reach your eye, you have to sit close enough to resolve the pixels of the resolution one step below. Farther than that, the lower resolution already looks smooth and nothing changes. This turns up something neat: at the SMPTE distance, FHD pixels sit exactly on the threshold — the recommended distance is only 4 % beyond the pixel limit. The ratio holds for every screen size, because both quantities scale with screen width.',
    'Para que la resolución extra llegue al ojo hay que sentarse lo bastante cerca como para resolver los píxeles de la resolución inmediatamente inferior. Más lejos, la inferior ya se ve lisa y no cambia nada. De ahí sale algo curioso: a la distancia SMPTE los píxeles FHD quedan justo en el umbral, apenas un 4 % más allá del límite. La razón se mantiene en cualquier tamaño, porque ambas magnitudes escalan con el ancho.',
    'Para a resolução extra chegar ao olho, é preciso sentar perto o bastante para resolver os pixels da resolução um degrau abaixo. Mais longe, a inferior já parece lisa e nada muda. Daí sai algo curioso: na distância SMPTE os pixels FHD ficam exatamente no limiar, apenas 4 % além do limite. A razão vale para qualquer tamanho, porque ambas as grandezas escalam com a largura.',
    '解像度を上げたことが目に届くには、1段下の解像度の画素を分けて見られる位置に座る必要があります。それより遠ければ下の段もすでに滑らかに見えるので差が出ません。ここで面白いことが出ます — SMPTEが挙げる位置でFHDの画素はちょうど境目に立ちます(推奨距離が画素の限界より4%遠いだけです)。画面が大きくても小さくてもこの比は変わりません。どちらも画面の横幅に比例するからです。',
    'Damit mehr Auflösung überhaupt ankommt, muss man nah genug sitzen, um die Pixel der nächstniedrigeren Auflösung zu trennen. Weiter weg wirkt auch die niedrigere schon glatt, es ändert sich nichts. Dabei fällt Hübsches auf: Beim SMPTE-Abstand liegen FHD-Pixel genau an der Schwelle — der empfohlene Abstand liegt nur 4 % jenseits der Pixelgrenze. Das Verhältnis gilt für jede Größe, weil beide Größen mit der Bildbreite skalieren.',
    'Pour que la définition supplémentaire atteigne l’œil, il faut être assez près pour distinguer les pixels de la définition juste en dessous. Plus loin, celle-ci paraît déjà lisse et rien ne change. Il en sort une jolie coïncidence : à la distance SMPTE, les pixels FHD sont pile au seuil — la distance conseillée n’excède la limite que de 4 %. Le rapport tient pour toutes les tailles, les deux grandeurs étant proportionnelles à la largeur.',
    'अतिरिक्त रिज़ॉल्यूशन आँख तक पहुँचे, इसके लिए इतना पास बैठना होगा कि एक कदम नीचे वाले रिज़ॉल्यूशन के पिक्सेल अलग दिखें। उससे दूर बैठे तो नीचे वाला भी चिकना दिखता है और फ़र्क़ नहीं पड़ता। यहाँ एक मज़ेदार बात मिलती है — SMPTE दूरी पर FHD पिक्सेल ठीक दहलीज़ पर होते हैं (अनुशंसित दूरी सीमा से केवल 4% आगे)। यह अनुपात हर आकार पर वही रहता है, क्योंकि दोनों चौड़ाई के अनुपात में बढ़ते हैं।',
    '要让提高的分辨率真正进到眼里，就得坐得足够近，近到能分辨低一档分辨率的像素。再远的话，低一档本来就已经很平滑，看不出差别。这里冒出一件有意思的事——在 SMPTE 推荐的位置上，FHD 的像素正好卡在门槛上（推荐距离只比像素界线远 4%）。屏幕大小无关紧要，因为两个量都与屏幕宽度成正比。',
    '要讓提高的解析度真正進到眼裡，就得坐得足夠近，近到能分辨低一檔解析度的像素。再遠的話，低一檔本來就已經很平滑，看不出差別。這裡冒出一件有意思的事——在 SMPTE 推薦的位置上，FHD 的像素正好卡在門檻上（推薦距離只比像素界線遠 4%）。螢幕大小無關緊要，因為兩個量都與螢幕寬度成正比。',
  ),

  roomTitle: T('거실은 대개 그보다 멉니다', 'Living rooms are usually farther than that', 'Los salones suelen quedar más lejos', 'As salas costumam ficar mais longe', '居間はたいていそれより遠いです', 'Wohnzimmer sind meist weiter weg', 'Les salons sont souvent plus loin', 'बैठक आमतौर पर उससे दूर होती है', '客厅通常比这更远', '客廳通常比這更遠'),

  roomNote: T(
    '소파가 화면에서 2.5~3m 떨어진 거실이 흔합니다. 55인치 4K의 화소 한계는 109cm이므로, 그 자리에서는 4K와 그 아래 해상도가 갈리지 않습니다. 값을 하게 만드는 길은 둘입니다 — 더 가까이 앉거나, 같은 거리라면 화면을 키우는 것입니다. 화면을 키우면 화소도 함께 커져 한계 거리가 멀어지기 때문입니다.',
    'A sofa two and a half to three metres from the screen is common. The pixel limit for 4K on a 55-inch set is 109 cm, so from that seat 4K and the resolution below it look the same. There are two ways out: sit closer, or keep the distance and go bigger — a larger screen has larger pixels, which pushes the limit farther out.',
    'Es habitual un sofá a dos metros y medio o tres de la pantalla. El límite de píxel del 4K en 55 pulgadas es 109 cm, así que desde ahí el 4K y la resolución inferior se ven igual. Hay dos salidas: acercarse, o mantener la distancia y agrandar la pantalla, porque una pantalla mayor tiene píxeles mayores y aleja el límite.',
    'É comum um sofá a dois metros e meio ou três da tela. O limite de pixel do 4K numa tela de 55 polegadas é 109 cm, então desse lugar o 4K e a resolução abaixo parecem iguais. Há duas saídas: sentar mais perto, ou manter a distância e aumentar a tela — uma tela maior tem pixels maiores, o que afasta o limite.',
    'ソファが画面から2.5〜3m離れた居間はよくあります。55インチ4Kの画素限界は109cmなので、その位置では4Kとその下の解像度が分かれません。効かせる道は2つです — もっと近くに座るか、同じ距離なら画面を大きくするかです。画面が大きくなれば画素も大きくなり、限界の距離が遠くなるからです。',
    'Ein Sofa zweieinhalb bis drei Meter vom Bildschirm ist üblich. Die Pixelgrenze für 4K auf 55 Zoll liegt bei 109 cm — von dort sehen 4K und die Stufe darunter gleich aus. Zwei Auswege: näher rücken, oder bei gleichem Abstand größer kaufen. Ein größerer Bildschirm hat größere Pixel und schiebt die Grenze nach hinten.',
    'Un canapé à deux mètres et demi ou trois de l’écran est courant. La limite de pixel de la 4K en 55 pouces est de 109 cm : depuis ce siège, la 4K et la définition inférieure se ressemblent. Deux issues : se rapprocher, ou garder la distance et prendre plus grand — un écran plus grand a des pixels plus grands, ce qui repousse la limite.',
    'सोफ़ा स्क्रीन से ढाई से तीन मीटर दूर होना आम है। 55 इंच पर 4K की पिक्सेल सीमा 109 सेमी है, इसलिए उस जगह से 4K और उससे नीचे का रिज़ॉल्यूशन एक जैसे दिखते हैं। दो रास्ते हैं — पास बैठें, या दूरी वही रखकर बड़ी स्क्रीन लें, क्योंकि बड़ी स्क्रीन के पिक्सेल बड़े होते हैं और सीमा दूर खिसक जाती है।',
    '沙发离屏幕两米半到三米很常见。55 英寸 4K 的像素界线是 109cm，坐在那儿，4K 和低一档分辨率看起来一样。出路有两条——坐得更近，或者距离不变而把屏幕买大。屏幕更大，像素也更大，界线就往外推。',
    '沙發離螢幕兩公尺半到三公尺很常見。55 英寸 4K 的像素界線是 109cm，坐在那兒，4K 和低一檔解析度看起來一樣。出路有兩條——坐得更近，或者距離不變而把螢幕買大。螢幕更大，像素也更大，界線就往外推。',
  ),

  tableTitle: T('크기와 해상도로 찾기', 'Find it by size and resolution', 'Búscalo por tamaño y resolución', 'Ache por tamanho e resolução', 'サイズと解像度から探す', 'Nach Größe und Auflösung suchen', 'Chercher par taille et définition', 'आकार और रिज़ॉल्यूशन से देखें', '按尺寸和分辨率查找', '按尺寸和解析度查找'),
  neighbourTitle: T('가까운 크기', 'Nearby sizes', 'Tamaños cercanos', 'Tamanhos próximos', '近いサイズ', 'Größen daneben', 'Tailles voisines', 'पास के आकार', '相邻尺寸', '相鄰尺寸'),
  resRowTitle: T('같은 해상도, 다른 크기', 'Same resolution, other sizes', 'Misma resolución, otros tamaños', 'Mesma resolução, outros tamanhos', '同じ解像度、別のサイズ', 'Gleiche Auflösung, andere Größen', 'Même définition, autres tailles', 'वही रिज़ॉल्यूशन, दूसरे आकार', '同一分辨率，不同尺寸', '同一解析度，不同尺寸'),
  inchRowTitle: T('같은 크기, 다른 해상도', 'Same size, other resolutions', 'Mismo tamaño, otras resoluciones', 'Mesmo tamanho, outras resoluções', '同じサイズ、別の解像度', 'Gleiche Größe, andere Auflösungen', 'Même taille, autres définitions', 'वही आकार, दूसरे रिज़ॉल्यूशन', '同一尺寸，不同分辨率', '同一尺寸，不同解析度'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '가로 = 대각 × 0.8716, 세로 = 대각 × 0.4903 (16:9)',
      '권장 거리 = 화면 폭 ÷ 2 ÷ tan(시야각/2). SMPTE 30도, THX 40도.',
      '화소가 보이는 거리 = 화소 크기 ÷ tan(1분각).',
      '이 해상도가 값을 하려면 한 단계 아래의 화소 한계 안쪽에 앉아야 합니다.',
    ],
    [
      'Width = diagonal × 0.8716, height = diagonal × 0.4903 (16:9).',
      'Recommended distance = screen width ÷ 2 ÷ tan(angle/2). SMPTE 30°, THX 40°.',
      'Pixels become visible at pixel size ÷ tan(one arcminute).',
      'For this resolution to matter, sit inside the pixel limit of the step below.',
    ],
    [
      'Ancho = diagonal × 0,8716; alto = diagonal × 0,4903 (16:9).',
      'Distancia recomendada = ancho ÷ 2 ÷ tan(ángulo/2). SMPTE 30°, THX 40°.',
      'Los píxeles se ven a partir de tamaño de píxel ÷ tan(un minuto de arco).',
      'Para que esta resolución cuente, siéntate dentro del límite del escalón inferior.',
    ],
    [
      'Largura = diagonal × 0,8716; altura = diagonal × 0,4903 (16:9).',
      'Distância recomendada = largura ÷ 2 ÷ tan(ângulo/2). SMPTE 30°, THX 40°.',
      'Os pixels aparecem a partir de tamanho do pixel ÷ tan(um minuto de arco).',
      'Para esta resolução valer, sente-se dentro do limite do degrau abaixo.',
    ],
    [
      '横 = 対角 × 0.8716、縦 = 対角 × 0.4903 (16:9)',
      '推奨距離 = 画面の横幅 ÷ 2 ÷ tan(視野角/2)。SMPTE 30度、THX 40度。',
      '画素が見える距離 = 画素の大きさ ÷ tan(1分角)。',
      'この解像度を効かせるには1段下の画素限界の内側に座ります。',
    ],
    [
      'Breite = Diagonale × 0,8716, Höhe = Diagonale × 0,4903 (16:9).',
      'Empfohlener Abstand = Bildbreite ÷ 2 ÷ tan(Winkel/2). SMPTE 30°, THX 40°.',
      'Pixel werden sichtbar ab Pixelgröße ÷ tan(einer Bogenminute).',
      'Damit die Auflösung zählt, innerhalb der Pixelgrenze der Stufe darunter sitzen.',
    ],
    [
      'Largeur = diagonale × 0,8716 ; hauteur = diagonale × 0,4903 (16:9).',
      'Distance conseillée = largeur ÷ 2 ÷ tan(angle/2). SMPTE 30°, THX 40°.',
      'Les pixels se voient à partir de taille du pixel ÷ tan(une minute d’arc).',
      'Pour que cette définition compte, restez en deçà de la limite du cran inférieur.',
    ],
    [
      'चौड़ाई = विकर्ण × 0.8716, ऊँचाई = विकर्ण × 0.4903 (16:9)।',
      'अनुशंसित दूरी = चौड़ाई ÷ 2 ÷ tan(कोण/2)। SMPTE 30°, THX 40°।',
      'पिक्सेल दिखने लगते हैं: पिक्सेल आकार ÷ tan(एक आर्कमिनट)।',
      'यह रिज़ॉल्यूशन काम आए, इसके लिए नीचे वाले चरण की पिक्सेल सीमा के भीतर बैठें।',
    ],
    [
      '宽 = 对角线 × 0.8716，高 = 对角线 × 0.4903（16:9）。',
      '推荐距离 = 屏幕宽 ÷ 2 ÷ tan(视角/2)。SMPTE 30°，THX 40°。',
      '像素可见距离 = 像素大小 ÷ tan(一角分)。',
      '要让这个分辨率有意义，得坐在低一档像素界线以内。',
    ],
    [
      '寬 = 對角線 × 0.8716，高 = 對角線 × 0.4903（16:9）。',
      '推薦距離 = 螢幕寬 ÷ 2 ÷ tan(視角/2)。SMPTE 30°，THX 40°。',
      '像素可見距離 = 像素大小 ÷ tan(一角分)。',
      '要讓這個解析度有意義，得坐在低一檔像素界線以內。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'TV 시청거리 계산 — 인치별 권장 거리와 4K가 값을 하는 거리',
    'TV viewing distance — recommended by size, and where 4K matters',
    'Distancia de visión de TV — recomendada por tamaño y dónde cuenta el 4K',
    'Distância de visão de TV — recomendada por tamanho e onde o 4K vale',
    'テレビの視聴距離計算 — インチ別の推奨距離と4Kが効く距離',
    'TV-Sitzabstand — Empfehlung nach Größe und wo 4K zählt',
    'Distance de visionnage TV — recommandée par taille, et où la 4K compte',
    'टीवी देखने की दूरी — आकार अनुसार अनुशंसा और 4K कहाँ मायने रखता है',
    '电视观看距离计算 — 各尺寸推荐距离与 4K 起作用的距离',
    '電視觀看距離計算 — 各尺寸推薦距離與 4K 起作用的距離',
  ),

  hubMetaDesc: T(
    '55인치의 권장 거리는 SMPTE 227cm·THX 167cm이고, 4K 화소가 보이기 시작하는 거리는 109cm입니다. 거실 소파가 2.5m 밖이라면 4K와 그 아래 해상도가 갈리지 않습니다. 크기 20가지 × 해상도 5가지 100칸.',
    'For 55 inches the recommended distance is 227 cm by SMPTE and 167 cm by THX, and 4K pixels start showing at 109 cm. From a sofa 2.5 m away, 4K and the resolution below it look the same. 20 sizes × 5 resolutions, 100 cells.',
    'Para 55 pulgadas la distancia recomendada es 227 cm según SMPTE y 167 cm según THX, y los píxeles 4K se ven desde 109 cm. Desde un sofá a 2,5 m, el 4K y la resolución inferior se ven igual. 20 tamaños × 5 resoluciones, 100 casillas.',
    'Para 55 polegadas a distância recomendada é 227 cm pela SMPTE e 167 cm pela THX, e os pixels 4K aparecem a partir de 109 cm. De um sofá a 2,5 m, o 4K e a resolução abaixo parecem iguais. 20 tamanhos × 5 resoluções, 100 células.',
    '55インチの推奨距離はSMPTE 227cm・THX 167cmで、4Kの画素が見え始める距離は109cmです。居間のソファが2.5m先なら4Kとその下の解像度は分かれません。サイズ20通り×解像度5通りの100マス。',
    'Bei 55 Zoll liegt der empfohlene Abstand nach SMPTE bei 227 cm und nach THX bei 167 cm; 4K-Pixel werden ab 109 cm sichtbar. Vom Sofa in 2,5 m Entfernung sehen 4K und die Stufe darunter gleich aus. 20 Größen × 5 Auflösungen, 100 Felder.',
    'Pour 55 pouces, la distance conseillée est de 227 cm selon la SMPTE et 167 cm selon THX, et les pixels 4K apparaissent à 109 cm. Depuis un canapé à 2,5 m, la 4K et la définition inférieure se ressemblent. 20 tailles × 5 définitions, 100 cases.',
    '55 इंच पर अनुशंसित दूरी SMPTE के अनुसार 227 सेमी और THX के अनुसार 167 सेमी है, और 4K पिक्सेल 109 सेमी से दिखने लगते हैं। 2.5 मीटर दूर सोफ़े से 4K और उससे नीचे का रिज़ॉल्यूशन एक जैसे दिखते हैं। 20 आकार × 5 रिज़ॉल्यूशन, 100 खाने।',
    '55 英寸的推荐距离，SMPTE 为 227cm、THX 为 167cm，而 4K 像素从 109cm 起可见。若沙发在 2.5m 之外，4K 和低一档分辨率看不出差别。20 种尺寸 × 5 种分辨率，共 100 格。',
    '55 英寸的推薦距離，SMPTE 為 227cm、THX 為 167cm，而 4K 像素從 109cm 起可見。若沙發在 2.5m 之外，4K 和低一檔解析度看不出差別。20 種尺寸 × 5 種解析度，共 100 格。',
  ),

  desc: T<(f: ViewingFacts) => string>(
    f => `화면은 가로 ${f.width}cm·세로 ${f.height}cm이고, 권장 거리는 SMPTE ${f.smpte}cm·THX ${f.thx}cm입니다. 화소는 ${f.limit}cm보다 가까이 앉아야 눈에 띕니다.`,
    f => `The screen measures ${f.width} × ${f.height} cm, and the recommended distance is ${f.smpte} cm by SMPTE or ${f.thx} cm by THX. Pixels only show once you are closer than ${f.limit} cm.`,
    f => `La pantalla mide ${f.width} × ${f.height} cm y la distancia recomendada es ${f.smpte} cm (SMPTE) o ${f.thx} cm (THX). Los píxeles solo se notan a menos de ${f.limit} cm.`,
    f => `A tela mede ${f.width} × ${f.height} cm e a distância recomendada é ${f.smpte} cm (SMPTE) ou ${f.thx} cm (THX). Os pixels só aparecem a menos de ${f.limit} cm.`,
    f => `画面は横${f.width}cm・縦${f.height}cmで、推奨距離はSMPTE ${f.smpte}cm・THX ${f.thx}cmです。画素は${f.limit}cmより近づいて初めて目につきます。`,
    f => `Das Bild misst ${f.width} × ${f.height} cm, empfohlen sind ${f.smpte} cm nach SMPTE oder ${f.thx} cm nach THX. Pixel fallen erst näher als ${f.limit} cm auf.`,
    f => `L’écran fait ${f.width} × ${f.height} cm, et la distance conseillée est de ${f.smpte} cm (SMPTE) ou ${f.thx} cm (THX). Les pixels ne se voient qu’en deçà de ${f.limit} cm.`,
    f => `स्क्रीन ${f.width} × ${f.height} सेमी है, और अनुशंसित दूरी SMPTE से ${f.smpte} सेमी या THX से ${f.thx} सेमी है। पिक्सेल तभी दिखते हैं जब आप ${f.limit} सेमी से पास हों।`,
    f => `屏幕为 ${f.width} × ${f.height} cm，推荐距离 SMPTE 为 ${f.smpte}cm、THX 为 ${f.thx}cm。只有坐到 ${f.limit}cm 以内，像素才会看得出来。`,
    f => `螢幕為 ${f.width} × ${f.height} cm，推薦距離 SMPTE 為 ${f.smpte}cm、THX 為 ${f.thx}cm。只有坐到 ${f.limit}cm 以內，像素才會看得出來。`,
  ),

  metaTitle: T<(f: ViewingFacts) => string>(
    f => `${f.cell.inch}인치 ${resName(f.cell.res)} — 권장 ${f.smpte}cm`,
    f => `${f.cell.inch}-inch ${resName(f.cell.res)} — ${f.smpte} cm recommended`,
    f => `${f.cell.inch} pulgadas ${resName(f.cell.res)} — ${f.smpte} cm recomendados`,
    f => `${f.cell.inch} polegadas ${resName(f.cell.res)} — ${f.smpte} cm recomendados`,
    f => `${f.cell.inch}インチ ${resName(f.cell.res)} — 推奨${f.smpte}cm`,
    f => `${f.cell.inch} Zoll ${resName(f.cell.res)} — ${f.smpte} cm empfohlen`,
    f => `${f.cell.inch} pouces ${resName(f.cell.res)} — ${f.smpte} cm conseillés`,
    f => `${f.cell.inch} इंच ${resName(f.cell.res)} — ${f.smpte} सेमी अनुशंसित`,
    f => `${f.cell.inch} 英寸 ${resName(f.cell.res)} — 推荐 ${f.smpte}cm`,
    f => `${f.cell.inch} 英寸 ${resName(f.cell.res)} — 推薦 ${f.smpte}cm`,
  ),

  metaDesc: T<(f: ViewingFacts) => string>(
    f => `${f.cell.inch}인치 ${resName(f.cell.res)} 화면은 가로 ${f.width}cm·세로 ${f.height}cm입니다. SMPTE 권장 거리는 ${f.smpte}cm, THX는 ${f.thx}cm이고, 화소는 ${f.limit}cm보다 가까울 때 눈에 띕니다. 인치당 화소는 ${f.ppi}입니다.`,
    f => `A ${f.cell.inch}-inch ${resName(f.cell.res)} screen is ${f.width} cm wide and ${f.height} cm tall. SMPTE puts the seat at ${f.smpte} cm and THX at ${f.thx} cm; pixels show closer than ${f.limit} cm. That is ${f.ppi} pixels per inch.`,
    f => `Una pantalla de ${f.cell.inch} pulgadas ${resName(f.cell.res)} mide ${f.width} cm de ancho y ${f.height} de alto. SMPTE sitúa el asiento a ${f.smpte} cm y THX a ${f.thx} cm; los píxeles se notan a menos de ${f.limit} cm. Son ${f.ppi} píxeles por pulgada.`,
    f => `Uma tela de ${f.cell.inch} polegadas ${resName(f.cell.res)} tem ${f.width} cm de largura e ${f.height} de altura. A SMPTE põe o assento a ${f.smpte} cm e a THX a ${f.thx} cm; os pixels aparecem a menos de ${f.limit} cm. São ${f.ppi} pixels por polegada.`,
    f => `${f.cell.inch}インチ ${resName(f.cell.res)} の画面は横${f.width}cm・縦${f.height}cmです。SMPTEの推奨距離は${f.smpte}cm、THXは${f.thx}cmで、画素は${f.limit}cmより近いと目につきます。1インチあたりの画素は${f.ppi}です。`,
    f => `Ein ${f.cell.inch}-Zoll-Bild in ${resName(f.cell.res)} ist ${f.width} cm breit und ${f.height} cm hoch. SMPTE setzt den Platz auf ${f.smpte} cm, THX auf ${f.thx} cm; Pixel fallen näher als ${f.limit} cm auf. Das sind ${f.ppi} Pixel pro Zoll.`,
    f => `Un écran de ${f.cell.inch} pouces en ${resName(f.cell.res)} fait ${f.width} cm de large et ${f.height} de haut. La SMPTE place le siège à ${f.smpte} cm et THX à ${f.thx} cm ; les pixels se voient en deçà de ${f.limit} cm. Soit ${f.ppi} pixels par pouce.`,
    f => `${f.cell.inch} इंच की ${resName(f.cell.res)} स्क्रीन ${f.width} सेमी चौड़ी और ${f.height} सेमी ऊँची है। SMPTE सीट ${f.smpte} सेमी पर रखता है, THX ${f.thx} सेमी पर; पिक्सेल ${f.limit} सेमी से पास दिखते हैं। यह ${f.ppi} पिक्सेल प्रति इंच है।`,
    f => `${f.cell.inch} 英寸 ${resName(f.cell.res)} 屏幕宽 ${f.width}cm、高 ${f.height}cm。SMPTE 建议坐 ${f.smpte}cm，THX 为 ${f.thx}cm；坐到 ${f.limit}cm 以内才看得见像素。每英寸 ${f.ppi} 像素。`,
    f => `${f.cell.inch} 英寸 ${resName(f.cell.res)} 螢幕寬 ${f.width}cm、高 ${f.height}cm。SMPTE 建議坐 ${f.smpte}cm，THX 為 ${f.thx}cm；坐到 ${f.limit}cm 以內才看得見像素。每英寸 ${f.ppi} 像素。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '55인치 TV는 얼마나 떨어져 봐야 하나요?', a: 'SMPTE 기준 227cm, THX 기준 167cm입니다. 영화처럼 화면을 채우고 싶으면 THX 쪽이 가깝습니다.' },
      { q: '4K가 왜 생각만큼 달라 보이지 않나요?', a: '거리 때문입니다. 55인치 4K의 화소는 109cm보다 가까워야 갈라 보입니다. 소파가 2.5m 밖이면 아래 해상도와 구별되지 않습니다.' },
      { q: '같은 거리에서 화질을 올리려면요?', a: '화면을 키우면 됩니다. 화면이 커지면 화소도 커져서 화소를 갈라 볼 수 있는 거리가 멀어집니다.' },
      { q: '8K는 의미가 있나요?', a: '앉는 자리에 달렸습니다. 98인치 8K도 화소 한계가 97cm라, 그보다 멀면 4K와 갈리지 않습니다.' },
      { q: '이 계산은 무엇을 전제하나요?', a: '16:9 화면과 시력 1.0(1분각 분해능)입니다. 눈이 더 좋으면 화소가 더 멀리서도 보입니다.' },
    ],
    [
      { q: 'How far should I sit from a 55-inch TV?', a: '227 cm by SMPTE, 167 cm by THX. If you want the screen to fill your view like a cinema, THX is the closer figure.' },
      { q: 'Why does 4K not look as different as expected?', a: 'Distance. The pixels of a 55-inch 4K set only separate closer than 109 cm. From a sofa 2.5 m away it is indistinguishable from the resolution below.' },
      { q: 'How do I get more from the same seat?', a: 'Go bigger. A larger screen has larger pixels, which pushes the distance at which you can resolve them farther out.' },
      { q: 'Is 8K worth it?', a: 'It depends where you sit. Even a 98-inch 8K set has a pixel limit of 97 cm; beyond that it does not separate from 4K.' },
      { q: 'What does this calculation assume?', a: 'A 16:9 screen and 20/20 vision, defined as resolving one arcminute. Sharper eyes see pixels from farther away.' },
    ],
    [
      { q: '¿A qué distancia debo ver una tele de 55 pulgadas?', a: '227 cm según SMPTE, 167 cm según THX. Si quieres que la pantalla llene la vista como en el cine, THX es la cifra cercana.' },
      { q: '¿Por qué el 4K no se ve tan distinto?', a: 'Por la distancia. Los píxeles de un 4K de 55 pulgadas solo se separan a menos de 109 cm. Desde un sofá a 2,5 m no se distingue de la resolución inferior.' },
      { q: '¿Cómo mejoro sin moverme?', a: 'Con una pantalla mayor: sus píxeles son mayores, así que la distancia a la que se resuelven se aleja.' },
      { q: '¿Merece la pena el 8K?', a: 'Depende de dónde te sientes. Incluso un 8K de 98 pulgadas tiene su límite en 97 cm; más lejos no se separa del 4K.' },
      { q: '¿Qué supone este cálculo?', a: 'Pantalla 16:9 y visión 20/20, definida como resolver un minuto de arco. Una vista más fina ve los píxeles desde más lejos.' },
    ],
    [
      { q: 'A que distância ver uma TV de 55 polegadas?', a: '227 cm pela SMPTE, 167 cm pela THX. Se quiser a tela preenchendo a visão como no cinema, THX é o número mais próximo.' },
      { q: 'Por que o 4K não parece tão diferente?', a: 'Distância. Os pixels de um 4K de 55 polegadas só se separam a menos de 109 cm. De um sofá a 2,5 m não dá para distinguir da resolução abaixo.' },
      { q: 'Como melhorar sem mudar de lugar?', a: 'Com uma tela maior: pixels maiores afastam a distância em que dá para resolvê-los.' },
      { q: 'Vale a pena 8K?', a: 'Depende de onde você senta. Mesmo um 8K de 98 polegadas tem limite de 97 cm; além disso, não se separa do 4K.' },
      { q: 'O que este cálculo supõe?', a: 'Tela 16:9 e visão 20/20, definida como resolver um minuto de arco. Olhos mais aguçados veem pixels de mais longe.' },
    ],
    [
      { q: '55インチのテレビはどれくらい離れて見ますか？', a: 'SMPTE基準で227cm、THX基準で167cmです。映画のように画面を埋めたければTHXのほうが近いです。' },
      { q: '4Kが思ったほど違って見えないのはなぜですか？', a: '距離のせいです。55インチ4Kの画素は109cmより近くないと分かれません。ソファが2.5m先なら下の解像度と区別できません。' },
      { q: '同じ距離で画質を上げるには？', a: '画面を大きくします。画面が大きくなれば画素も大きくなり、分けて見られる距離が遠くなります。' },
      { q: '8Kに意味はありますか？', a: '座る位置しだいです。98インチ8Kでも画素の限界は97cmで、それより遠ければ4Kと分かれません。' },
      { q: 'この計算は何を前提にしていますか？', a: '16:9の画面と視力1.0(1分角の分解能)です。目がよければ画素はもっと遠くからでも見えます。' },
    ],
    [
      { q: 'Wie weit weg bei einem 55-Zöller?', a: '227 cm nach SMPTE, 167 cm nach THX. Soll das Bild wie im Kino das Sichtfeld füllen, gilt der nähere THX-Wert.' },
      { q: 'Warum wirkt 4K nicht so anders wie erwartet?', a: 'Der Abstand. Die Pixel eines 55-Zoll-4K-Geräts trennen sich erst näher als 109 cm. Vom Sofa in 2,5 m ist es von der Stufe darunter nicht zu unterscheiden.' },
      { q: 'Wie hole ich vom selben Platz mehr heraus?', a: 'Größer kaufen. Ein größerer Bildschirm hat größere Pixel, die Auflösungsgrenze rückt nach hinten.' },
      { q: 'Lohnt sich 8K?', a: 'Kommt auf den Platz an. Selbst ein 98-Zoll-8K-Gerät hat seine Grenze bei 97 cm; weiter weg trennt es sich nicht von 4K.' },
      { q: 'Was setzt diese Rechnung voraus?', a: 'Ein 16:9-Bild und normale Sehschärfe, definiert als Auflösen einer Bogenminute. Schärfere Augen sehen Pixel von weiter weg.' },
    ],
    [
      { q: 'À quelle distance regarder un 55 pouces ?', a: '227 cm selon la SMPTE, 167 cm selon THX. Pour que l’écran remplisse le regard comme au cinéma, retenez la valeur THX.' },
      { q: 'Pourquoi la 4K ne saute-t-elle pas aux yeux ?', a: 'La distance. Les pixels d’un 55 pouces 4K ne se séparent qu’en deçà de 109 cm. Depuis un canapé à 2,5 m, impossible de la distinguer de la définition inférieure.' },
      { q: 'Comment gagner sans bouger le canapé ?', a: 'Prendre plus grand : des pixels plus grands repoussent la distance à laquelle on les distingue.' },
      { q: 'La 8K en vaut-elle la peine ?', a: 'Cela dépend d’où l’on s’assoit. Même un 98 pouces 8K a sa limite à 97 cm ; au-delà, elle ne se sépare pas de la 4K.' },
      { q: 'Que suppose ce calcul ?', a: 'Un écran 16:9 et une vue de 10/10, définie par la résolution d’une minute d’arc. Un œil plus fin voit les pixels de plus loin.' },
    ],
    [
      { q: '55 इंच टीवी कितनी दूर से देखें?', a: 'SMPTE के अनुसार 227 सेमी, THX के अनुसार 167 सेमी। सिनेमा जैसा भरा-भरा चाहिए तो THX वाला पास का आँकड़ा लें।' },
      { q: '4K उतना अलग क्यों नहीं लगता?', a: 'दूरी की वजह से। 55 इंच 4K के पिक्सेल 109 सेमी से पास ही अलग दिखते हैं। 2.5 मीटर दूर सोफ़े से यह नीचे वाले रिज़ॉल्यूशन से अलग नहीं लगता।' },
      { q: 'उसी जगह से बेहतर कैसे हो?', a: 'बड़ी स्क्रीन लें। बड़ी स्क्रीन के पिक्सेल बड़े होते हैं, तो उन्हें अलग देख पाने की दूरी बढ़ जाती है।' },
      { q: 'क्या 8K सार्थक है?', a: 'यह बैठने की जगह पर निर्भर है। 98 इंच 8K की भी सीमा 97 सेमी है; उससे दूर वह 4K से अलग नहीं पड़ता।' },
      { q: 'यह गणना क्या मानकर चलती है?', a: '16:9 स्क्रीन और 20/20 दृष्टि, यानी एक आर्कमिनट को अलग देख पाना। तेज़ नज़र पिक्सेल दूर से भी देख लेती है।' },
    ],
    [
      { q: '55 英寸电视该坐多远？', a: 'SMPTE 为 227cm，THX 为 167cm。若想像影院那样填满视野，取更近的 THX 数字。' },
      { q: '4K 为什么没想象中那么不同？', a: '因为距离。55 英寸 4K 的像素要坐到 109cm 以内才分得开。沙发在 2.5m 外，就和低一档分辨率没区别。' },
      { q: '不挪沙发怎么变好？', a: '换更大的屏幕。屏幕大，像素也大，能分辨像素的距离就往外推。' },
      { q: '8K 有意义吗？', a: '看你坐哪儿。就算 98 英寸 8K，像素界线也只有 97cm，再远就和 4K 分不开。' },
      { q: '这个计算的前提是什么？', a: '16:9 屏幕和视力 1.0（能分辨一角分）。视力更好的人能从更远看见像素。' },
    ],
    [
      { q: '55 英寸電視該坐多遠？', a: 'SMPTE 為 227cm，THX 為 167cm。若想像影院那樣填滿視野，取更近的 THX 數字。' },
      { q: '4K 為什麼沒想像中那麼不同？', a: '因為距離。55 英寸 4K 的像素要坐到 109cm 以內才分得開。沙發在 2.5m 外，就和低一檔解析度沒區別。' },
      { q: '不挪沙發怎麼變好？', a: '換更大的螢幕。螢幕大，像素也大，能分辨像素的距離就往外推。' },
      { q: '8K 有意義嗎？', a: '看你坐哪兒。就算 98 英寸 8K，像素界線也只有 97cm，再遠就和 4K 分不開。' },
      { q: '這個計算的前提是什麼？', a: '16:9 螢幕和視力 1.0（能分辨一角分）。視力更好的人能從更遠看見像素。' },
    ],
  ),

  cellFaq: T<(f: ViewingFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.inch}인치는 얼마나 떨어져 봐야 하나요?`, a: `SMPTE 기준 ${f.smpte}cm, THX 기준 ${f.thx}cm입니다.` },
      { q: `화면 실제 크기는 얼마인가요?`, a: `가로 ${f.width}cm, 세로 ${f.height}cm입니다. 대각 ${f.cell.inch}인치를 16:9로 나눈 값입니다.` },
      { q: `화소는 언제부터 보이나요?`, a: `${f.limit}cm보다 가까울 때입니다. 화소 하나가 1분각보다 크게 보이는 거리입니다.` },
      { q: `이 해상도가 값을 하나요?`, a: f.worth === null ? `가장 낮은 단계라 견줄 아래가 없습니다.` : `${f.worth}cm 안쪽에 앉아야 한 단계 아래와 갈립니다. SMPTE 권장 자리(${f.smpte}cm)에서는 ${f.smpteWorth ? '갈립니다' : '갈리지 않습니다'}.` },
    ],
    f => [
      { q: `How far should I sit from ${f.cell.inch} inches?`, a: `${f.smpte} cm by SMPTE, ${f.thx} cm by THX.` },
      { q: `What is the actual screen size?`, a: `${f.width} cm wide and ${f.height} cm tall — a ${f.cell.inch}-inch diagonal split at 16:9.` },
      { q: `When do pixels become visible?`, a: `Closer than ${f.limit} cm, where one pixel spans more than an arcminute.` },
      { q: `Does this resolution earn its keep?`, a: f.worth === null ? `This is the lowest step, so there is nothing below to compare against.` : `You need to be within ${f.worth} cm for it to separate from the step below. At the SMPTE seat (${f.smpte} cm) it ${f.smpteWorth ? 'does' : 'does not'}.` },
    ],
    f => [
      { q: `¿A qué distancia ver ${f.cell.inch} pulgadas?`, a: `${f.smpte} cm según SMPTE, ${f.thx} cm según THX.` },
      { q: `¿Cuánto mide la pantalla?`, a: `${f.width} cm de ancho y ${f.height} de alto: una diagonal de ${f.cell.inch} pulgadas repartida en 16:9.` },
      { q: `¿Cuándo se ven los píxeles?`, a: `A menos de ${f.limit} cm, donde un píxel abarca más de un minuto de arco.` },
      { q: `¿Aporta esta resolución?`, a: f.worth === null ? `Es el escalón más bajo, no hay nada debajo con qué comparar.` : `Hay que estar dentro de ${f.worth} cm para separarla del escalón inferior. En el asiento SMPTE (${f.smpte} cm) ${f.smpteWorth ? 'sí' : 'no'}.` },
    ],
    f => [
      { q: `A que distância ver ${f.cell.inch} polegadas?`, a: `${f.smpte} cm pela SMPTE, ${f.thx} cm pela THX.` },
      { q: `Qual o tamanho real da tela?`, a: `${f.width} cm de largura e ${f.height} de altura — uma diagonal de ${f.cell.inch} polegadas repartida em 16:9.` },
      { q: `Quando os pixels aparecem?`, a: `A menos de ${f.limit} cm, onde um pixel ocupa mais de um minuto de arco.` },
      { q: `Esta resolução vale a pena?`, a: f.worth === null ? `É o degrau mais baixo, não há nada abaixo para comparar.` : `É preciso estar dentro de ${f.worth} cm para separá-la do degrau abaixo. No assento SMPTE (${f.smpte} cm) ${f.smpteWorth ? 'sim' : 'não'}.` },
    ],
    f => [
      { q: `${f.cell.inch}インチはどれくらい離れて見ますか？`, a: `SMPTE基準で${f.smpte}cm、THX基準で${f.thx}cmです。` },
      { q: `画面の実寸はいくつですか？`, a: `横${f.width}cm、縦${f.height}cmです。対角${f.cell.inch}インチを16:9で割った値です。` },
      { q: `画素はいつから見えますか？`, a: `${f.limit}cmより近づいたときです。画素1つが1分角より大きく見える距離です。` },
      { q: `この解像度は効きますか？`, a: f.worth === null ? `いちばん下の段なので見比べる下がありません。` : `${f.worth}cmの内側に座って初めて1段下と分かれます。SMPTEの推奨位置(${f.smpte}cm)では${f.smpteWorth ? '分かれます' : '分かれません'}。` },
    ],
    f => [
      { q: `Wie weit weg bei ${f.cell.inch} Zoll?`, a: `${f.smpte} cm nach SMPTE, ${f.thx} cm nach THX.` },
      { q: `Wie groß ist das Bild wirklich?`, a: `${f.width} cm breit, ${f.height} cm hoch — eine ${f.cell.inch}-Zoll-Diagonale im Verhältnis 16:9.` },
      { q: `Ab wann sieht man Pixel?`, a: `Näher als ${f.limit} cm, wo ein Pixel mehr als eine Bogenminute misst.` },
      { q: `Lohnt diese Auflösung?`, a: f.worth === null ? `Das ist die unterste Stufe, darunter gibt es nichts zum Vergleich.` : `Man muss innerhalb von ${f.worth} cm sitzen, damit sie sich von der Stufe darunter abhebt. Auf dem SMPTE-Platz (${f.smpte} cm) ${f.smpteWorth ? 'tut sie das' : 'tut sie das nicht'}.` },
    ],
    f => [
      { q: `À quelle distance pour ${f.cell.inch} pouces ?`, a: `${f.smpte} cm selon la SMPTE, ${f.thx} cm selon THX.` },
      { q: `Quelle est la taille réelle de l’écran ?`, a: `${f.width} cm de large et ${f.height} de haut — une diagonale de ${f.cell.inch} pouces répartie en 16:9.` },
      { q: `À partir de quand voit-on les pixels ?`, a: `En deçà de ${f.limit} cm, où un pixel dépasse la minute d’arc.` },
      { q: `Cette définition sert-elle à quelque chose ?`, a: f.worth === null ? `C’est le cran le plus bas : rien en dessous à comparer.` : `Il faut rester en deçà de ${f.worth} cm pour la distinguer du cran inférieur. À la place SMPTE (${f.smpte} cm), ${f.smpteWorth ? 'oui' : 'non'}.` },
    ],
    f => [
      { q: `${f.cell.inch} इंच को कितनी दूर से देखें?`, a: `SMPTE से ${f.smpte} सेमी, THX से ${f.thx} सेमी।` },
      { q: `स्क्रीन का असली आकार क्या है?`, a: `${f.width} सेमी चौड़ी, ${f.height} सेमी ऊँची — ${f.cell.inch} इंच विकर्ण को 16:9 में बाँटकर।` },
      { q: `पिक्सेल कब से दिखते हैं?`, a: `${f.limit} सेमी से पास, जहाँ एक पिक्सेल एक आर्कमिनट से बड़ा दिखता है।` },
      { q: `क्या यह रिज़ॉल्यूशन काम आता है?`, a: f.worth === null ? `यह सबसे नीचे का चरण है, तुलना को नीचे कुछ नहीं।` : `नीचे वाले चरण से अलग दिखने के लिए ${f.worth} सेमी के भीतर बैठना होगा। SMPTE वाली जगह (${f.smpte} सेमी) पर ${f.smpteWorth ? 'अलग दिखता है' : 'अलग नहीं दिखता'}।` },
    ],
    f => [
      { q: `${f.cell.inch} 英寸该坐多远？`, a: `SMPTE 为 ${f.smpte}cm，THX 为 ${f.thx}cm。` },
      { q: `屏幕实际多大？`, a: `宽 ${f.width}cm、高 ${f.height}cm，也就是 ${f.cell.inch} 英寸对角线按 16:9 分开。` },
      { q: `什么时候看得见像素？`, a: `坐到 ${f.limit}cm 以内时，此时一个像素的张角超过一角分。` },
      { q: `这个分辨率值不值？`, a: f.worth === null ? `这是最低一档，下面没有可比的。` : `要坐在 ${f.worth}cm 以内，才和低一档分得开。在 SMPTE 推荐位置（${f.smpte}cm）${f.smpteWorth ? '分得开' : '分不开'}。` },
    ],
    f => [
      { q: `${f.cell.inch} 英寸該坐多遠？`, a: `SMPTE 為 ${f.smpte}cm，THX 為 ${f.thx}cm。` },
      { q: `螢幕實際多大？`, a: `寬 ${f.width}cm、高 ${f.height}cm，也就是 ${f.cell.inch} 英寸對角線按 16:9 分開。` },
      { q: `什麼時候看得見像素？`, a: `坐到 ${f.limit}cm 以內時，此時一個像素的張角超過一角分。` },
      { q: `這個解析度值不值？`, a: f.worth === null ? `這是最低一檔，下面沒有可比的。` : `要坐在 ${f.worth}cm 以內，才和低一檔分得開。在 SMPTE 推薦位置（${f.smpte}cm）${f.smpteWorth ? '分得開' : '分不開'}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const VIEWING_UI: L<ViewingUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<ViewingUI>;
