/**
 * 침대와 방 화면의 문구 — 열 언어.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { BedFacts, Fit } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface BedUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  bedName: (key: string) => string;
  fitName: (f: Fit) => string;
  sizeLabel: string;
  areaLabel: string;
  perPersonLabel: string;
  roomLabel: string;
  gapLabel: string;
  wallGapLabel: string;
  fitLabel: string;
  twinLabel: string;
  nameTitle: string;
  nameNote: string;
  walkTitle: string;
  walkNote: string;
  personTitle: string;
  personNote: string;
  ksTitle: string;
  ksNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  bedRowTitle: string;
  roomRowTitle: string;
  desc: (f: BedFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: BedFacts) => string;
  metaDesc: (f: BedFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: BedFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Names = Record<string, string>;
const namer = (m: Names) => (key: string) => m[key] ?? key;

const bKo: Names = {
  'kr-single': '싱글(한국)', 'kr-supersingle': '슈퍼싱글(한국)', 'kr-double': '더블(한국)',
  'kr-queen': '퀸(한국)', 'kr-king': '킹(한국)', 'kr-largeking': '라지킹(한국)', 'kr-superking': '슈퍼킹(한국)',
  'us-twin': 'Twin(미국)', 'us-twinxl': 'Twin XL(미국)', 'us-full': 'Full(미국)',
  'us-queen': 'Queen(미국)', 'us-king': 'King(미국)',
};
const bEn: Names = {
  'kr-single': 'Single (KR)', 'kr-supersingle': 'Super Single (KR)', 'kr-double': 'Double (KR)',
  'kr-queen': 'Queen (KR)', 'kr-king': 'King (KR)', 'kr-largeking': 'Large King (KR)', 'kr-superking': 'Super King (KR)',
  'us-twin': 'Twin (US)', 'us-twinxl': 'Twin XL (US)', 'us-full': 'Full (US)',
  'us-queen': 'Queen (US)', 'us-king': 'King (US)',
};
const bJa: Names = {
  'kr-single': 'シングル(韓国)', 'kr-supersingle': 'スーパーシングル(韓国)', 'kr-double': 'ダブル(韓国)',
  'kr-queen': 'クイーン(韓国)', 'kr-king': 'キング(韓国)', 'kr-largeking': 'ラージキング(韓国)', 'kr-superking': 'スーパーキング(韓国)',
  'us-twin': 'Twin(米国)', 'us-twinxl': 'Twin XL(米国)', 'us-full': 'Full(米国)',
  'us-queen': 'Queen(米国)', 'us-king': 'King(米国)',
};
const bZh: Names = {
  'kr-single': '单人（韩国）', 'kr-supersingle': '加大单人（韩国）', 'kr-double': '双人（韩国）',
  'kr-queen': 'Queen（韩国）', 'kr-king': 'King（韩国）', 'kr-largeking': 'Large King（韩国）', 'kr-superking': 'Super King（韩国）',
  'us-twin': 'Twin（美国）', 'us-twinxl': 'Twin XL（美国）', 'us-full': 'Full（美国）',
  'us-queen': 'Queen（美国）', 'us-king': 'King（美国）',
};

const fit = (both: string, one: string, tight: string, no: string) => (f: Fit) =>
  ({ both, one, tight, no })[f];

type Spec = { [K in keyof BedUI]: L<BedUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('침대 규격과 방', 'Bed sizes and rooms', 'Camas y habitaciones', 'Camas e quartos', 'ベッドの規格と部屋', 'Bettgrößen und Zimmer', 'Lits et chambres', 'बेड आकार और कमरा', '床垫规格与房间', '床墊規格與房間'),

  hubTitle: T(
    '침대 144칸 — 한국 킹과 미국 King은 33cm 다릅니다',
    '144 bed cells — a Korean King and an American King differ by 33 cm',
    '144 casillas de camas — la King coreana y la King estadounidense difieren 33 cm',
    '144 células de camas — a King coreana e a King americana diferem 33 cm',
    'ベッド144マス — 韓国のキングと米国のKingは33cm違います',
    '144 Bettfelder — koreanisches King und amerikanisches King trennen 33 cm',
    '144 cases de lits — le King coréen et le King américain diffèrent de 33 cm',
    '144 बेड खाने — कोरियाई King और अमेरिकी King में 33 सेमी का अंतर',
    '144 格床垫 — 韩国 King 和美国 King 相差 33cm',
    '144 格床墊 — 韓國 King 和美國 King 相差 33cm',
  ),

  hubLead: T(
    '"퀸"이나 "킹" 같은 이름은 나라마다 다른 것을 가리킵니다. 그래서 규격 열둘을 한 목록에 놓고, 방의 짧은 변과 짝지어 양옆에 남는 통로를 계산했습니다. 넓이가 아니라 통로가 실제로 부딪히는 문제입니다.',
    'Names like “Queen” and “King” point at different objects in different countries. Twelve of them are gathered here and paired with the short wall of a room, working out the walkway left on each side. The problem people actually hit is the walkway, not the floor area.',
    'Nombres como «Queen» o «King» designan cosas distintas según el país. Aquí se reúnen doce y se cruzan con el lado corto de la habitación para calcular el paso que queda a cada lado. El problema real no es la superficie, sino el paso.',
    'Nomes como «Queen» e «King» apontam para coisas diferentes conforme o país. Doze deles estão reunidos aqui e cruzados com a parede curta do quarto, calculando a passagem que sobra de cada lado. O problema real é a passagem, não a área.',
    '「クイーン」や「キング」といった名前は国ごとに違うものを指します。そこで規格12を一つの目録に置き、部屋の短い辺と組み合わせて両脇に残る通路を計算しました。実際にぶつかるのは広さではなく通路です。',
    'Namen wie „Queen“ und „King“ meinen je nach Land etwas anderes. Zwölf davon stehen hier zusammen, gepaart mit der kurzen Zimmerwand, und es wird der Gang berechnet, der links und rechts bleibt. Das echte Problem ist der Gang, nicht die Fläche.',
    'Des noms comme « Queen » ou « King » désignent des objets différents selon les pays. Douze d’entre eux sont réunis ici et croisés avec le petit côté de la pièce pour calculer le passage restant de chaque côté. Le vrai problème, c’est le passage, pas la surface.',
    '«Queen» और «King» जैसे नाम देश-देश में अलग चीज़ों की ओर इशारा करते हैं। यहाँ बारह को एक सूची में रखकर कमरे की छोटी दीवार से जोड़ा गया है, और दोनों ओर बचने वाला रास्ता निकाला गया है। असली दिक़्क़त क्षेत्रफल नहीं, रास्ता है।',
    '"Queen""King"这类名字，在不同国家指的其实不是同一件东西。这里把十二种规格放在一张表上，和房间的短边配对，算出两侧还剩多少过道。真正会撞上的问题是过道，不是面积。',
    '「Queen」「King」這類名字，在不同國家指的其實不是同一件東西。這裡把十二種規格放在一張表上，和房間的短邊配對，算出兩側還剩多少過道。真正會撞上的問題是過道，不是面積。',
  ),

  bedName: T<(k: string) => string>(
    namer(bKo), namer(bEn), namer(bEn), namer(bEn), namer(bJa),
    namer(bEn), namer(bEn), namer(bEn), namer(bZh), namer(bZh),
  ),

  fitName: T<(f: Fit) => string>(
    fit('양쪽 통로', '벽에 붙이면', '통로가 모자람', '안 들어감'),
    fit('walkway on both sides', 'one side against the wall', 'no room to pass', 'does not fit'),
    fit('paso a ambos lados', 'contra la pared', 'sin sitio para pasar', 'no cabe'),
    fit('passagem dos dois lados', 'encostada na parede', 'sem espaço para passar', 'não cabe'),
    fit('両側に通路', '壁付けなら', '通路が足りない', '入らない'),
    fit('Gang auf beiden Seiten', 'an die Wand geschoben', 'kein Durchgang', 'passt nicht'),
    fit('passage des deux côtés', 'contre le mur', 'pas de passage', 'ne rentre pas'),
    fit('दोनों ओर रास्ता', 'दीवार से सटाकर', 'निकलने की जगह नहीं', 'नहीं समाता'),
    fit('两侧都有过道', '靠墙才行', '过不去', '放不下'),
    fit('兩側都有過道', '靠牆才行', '過不去', '放不下'),
  ),

  sizeLabel: T('침대 크기', 'Bed size', 'Medidas de la cama', 'Medidas da cama', 'ベッドの大きさ', 'Bettmaß', 'Dimensions du lit', 'बेड का आकार', '床垫尺寸', '床墊尺寸'),
  areaLabel: T('침대 넓이', 'Bed area', 'Superficie de la cama', 'Área da cama', 'ベッドの面積', 'Bettfläche', 'Surface du lit', 'बेड क्षेत्रफल', '床垫面积', '床墊面積'),
  perPersonLabel: T('둘이 누울 때 1인당', 'Per person for two', 'Por persona si duermen dos', 'Por pessoa se dormem dois', '2人で寝るとき1人あたり', 'Pro Person zu zweit', 'Par personne à deux', 'दो के लिए प्रति व्यक्ति', '两人时人均', '兩人時人均'),
  roomLabel: T('방의 짧은 변', 'Short wall of the room', 'Lado corto de la habitación', 'Parede curta do quarto', '部屋の短い辺', 'Kurze Zimmerwand', 'Petit côté de la pièce', 'कमरे की छोटी दीवार', '房间短边', '房間短邊'),
  gapLabel: T('가운데 놓았을 때 한쪽', 'Each side, bed centred', 'Cada lado, cama centrada', 'Cada lado, cama centrada', '中央に置いたとき片側', 'Je Seite, Bett mittig', 'De chaque côté, lit centré', 'बीच में रखने पर हर ओर', '居中摆放时单侧', '居中擺放時單側'),
  wallGapLabel: T('벽에 붙였을 때', 'Against the wall', 'Contra la pared', 'Encostada na parede', '壁付けのとき', 'An der Wand', 'Contre le mur', 'दीवार से सटाने पर', '靠墙摆放时', '靠牆擺放時'),
  fitLabel: T('들어가는 모양', 'How it fits', 'Cómo encaja', 'Como encaixa', '入り方', 'Wie es passt', 'Comment ça rentre', 'कैसे समाता है', '摆放情况', '擺放情況'),
  twinLabel: T('같은 이름의 다른 나라', 'Same name elsewhere', 'El mismo nombre en otro país', 'O mesmo nome noutro país', '同じ名前の別の国', 'Gleicher Name anderswo', 'Même nom ailleurs', 'वही नाम, दूसरा देश', '同名的另一国规格', '同名的另一國規格'),

  nameTitle: T('이름은 규격이 아닙니다', 'The name is not a standard', 'El nombre no es una norma', 'O nome não é uma norma', '名前は規格ではありません', 'Der Name ist keine Norm', 'Le nom n’est pas une norme', 'नाम कोई मानक नहीं है', '名字不等于规格', '名字不等於規格'),

  nameNote: T(
    '한국 퀸은 150 × 200cm, 미국 Queen은 152.4 × 203.2cm로 조금 다릅니다. 그런데 킹에 이르면 한국 160cm, 미국 193cm로 33cm나 벌어집니다. 미국 King은 한국 기준으로 슈퍼킹(180)보다도 넓습니다. 해외 침구를 살 때 이름만 맞추면 시트가 안 맞는 이유입니다.',
    'A Korean Queen is 150 × 200 cm and an American Queen 152.4 × 203.2 — close enough. But at King the two part ways: 160 cm against 193, a gap of 33. An American King is wider even than a Korean Super King at 180. That is why matching names when buying bedding abroad leaves you with sheets that do not fit.',
    'Una Queen coreana mide 150 × 200 cm y una Queen estadounidense 152,4 × 203,2: casi lo mismo. Pero en King se separan: 160 cm frente a 193, treinta y tres de diferencia. Una King estadounidense es más ancha incluso que la Super King coreana de 180. Por eso, al comprar ropa de cama fuera, fiarse del nombre deja sábanas que no encajan.',
    'Uma Queen coreana mede 150 × 200 cm e uma Queen americana 152,4 × 203,2 — quase igual. Mas na King elas se separam: 160 cm contra 193, trinta e três de diferença. Uma King americana é mais larga até que a Super King coreana de 180. Por isso, ao comprar roupa de cama fora, confiar no nome deixa lençóis que não servem.',
    '韓国のクイーンは150 × 200cm、米国のQueenは152.4 × 203.2cmで少し違います。ところがキングになると韓国160cm、米国193cmで33cmも開きます。米国のKingは韓国基準のスーパーキング(180)よりも広いです。海外の寝具を買うとき名前だけ合わせるとシーツが合わない理由です。',
    'Ein koreanisches Queen misst 150 × 200 cm, ein amerikanisches 152,4 × 203,2 — nah beieinander. Beim King trennen sie sich jedoch: 160 cm gegen 193, ganze 33 Unterschied. Ein amerikanisches King ist sogar breiter als ein koreanisches Super King mit 180. Darum passen Bezüge nicht, wenn man im Ausland nach dem Namen kauft.',
    'Un Queen coréen fait 150 × 200 cm, un Queen américain 152,4 × 203,2 : presque pareil. Mais au King, les deux divergent : 160 cm contre 193, soit 33 d’écart. Un King américain est même plus large qu’un Super King coréen de 180. D’où des draps qui ne tombent pas quand on achète à l’étranger en se fiant au nom.',
    'कोरियाई Queen 150 × 200 सेमी है और अमेरिकी Queen 152.4 × 203.2 — लगभग बराबर। पर King पर दोनों अलग हो जाते हैं: 160 सेमी बनाम 193, यानी 33 का अंतर। अमेरिकी King तो कोरियाई Super King (180) से भी चौड़ा है। विदेश से बिस्तर की चादर नाम देखकर लेने पर वह फिट नहीं बैठती, कारण यही है।',
    '韩国 Queen 是 150 × 200cm，美国 Queen 是 152.4 × 203.2cm，相差不大。可到了 King 就分道扬镳：韩国 160cm，美国 193cm，差 33cm。美国 King 甚至比韩国的 Super King（180）还宽。所以在海外照着名字买床品，床单往往对不上。',
    '韓國 Queen 是 150 × 200cm，美國 Queen 是 152.4 × 203.2cm，相差不大。可到了 King 就分道揚鑣：韓國 160cm，美國 193cm，差 33cm。美國 King 甚至比韓國的 Super King（180）還寬。所以在海外照著名字買床品，床單往往對不上。',
  ),

  walkTitle: T('부딪히는 것은 넓이가 아니라 통로입니다', 'What you hit is the walkway', 'Con lo que chocas es con el paso', 'O que atrapalha é a passagem', 'ぶつかるのは広さではなく通路です', 'Woran es scheitert, ist der Gang', 'Ce qui coince, c’est le passage', 'दिक़्क़त क्षेत्रफल नहीं, रास्ता है', '真正卡住的是过道', '真正卡住的是過道'),

  walkNote: T(
    '방 넓이가 넉넉해도 침대를 놓고 나면 지나갈 자리가 안 나오는 일이 흔합니다. 사람이 옆으로 지나가려면 한쪽에 60cm쯤은 있어야 하고, 서랍장이나 옷장 문을 열려면 더 필요합니다. 그래서 이 표는 방의 짧은 변에서 침대 폭을 빼고 둘로 나눠 한쪽 통로를 냅니다 — 벽에 붙이면 한쪽만 쓰는 대신 그 폭이 두 배가 됩니다.',
    'A room can be roomy on paper and still leave nowhere to walk once the bed is in. Squeezing past sideways needs about 60 cm on one side, and opening a wardrobe or a drawer needs more. So this table subtracts the bed’s width from the room’s short wall and halves what is left — push the bed against a wall and you give up one side but double the other.',
    'Una habitación puede ser amplia sobre el papel y aun así no dejar por dónde pasar con la cama dentro. Colarse de lado pide unos 60 cm a un lado, y abrir un armario o un cajón pide más. Por eso aquí se resta el ancho de la cama al lado corto y se divide entre dos: pegada a la pared se pierde un lado pero el otro se dobla.',
    'Um quarto pode ser amplo no papel e ainda assim não deixar por onde passar com a cama dentro. Passar de lado pede uns 60 cm de um lado, e abrir um armário ou gaveta pede mais. Por isso aqui se subtrai a largura da cama da parede curta e divide-se por dois: encostada na parede perde-se um lado, mas o outro dobra.',
    '部屋の広さが十分でも、ベッドを置くと通る場所がなくなることがよくあります。人が横向きに通るには片側に60cmほど必要で、引き出しやクローゼットの扉を開けるにはもっと要ります。だからこの表は部屋の短い辺からベッドの幅を引き、二つに割って片側の通路を出します — 壁付けにすれば片側を捨てる代わりにもう片側が二倍になります。',
    'Ein Zimmer kann auf dem Papier großzügig sein und trotzdem keinen Weg lassen, sobald das Bett steht. Sich seitlich vorbeizuschieben braucht rund 60 cm auf einer Seite, eine Schranktür oder Schublade mehr. Darum zieht diese Tabelle die Bettbreite von der kurzen Wand ab und halbiert den Rest — an der Wand gibt man eine Seite auf und verdoppelt die andere.',
    'Une chambre peut être vaste sur le papier et ne plus laisser passer une fois le lit installé. Se faufiler de côté demande environ 60 cm d’un côté, ouvrir une armoire ou un tiroir davantage. Ce tableau retranche donc la largeur du lit au petit côté et divise par deux : collé au mur, on sacrifie un côté mais l’autre double.',
    'कमरा काग़ज़ पर बड़ा हो सकता है, फिर भी बेड रखते ही चलने की जगह नहीं बचती। बग़ल से निकलने को एक ओर लगभग 60 सेमी चाहिए, और अलमारी या दराज़ खोलने को उससे ज़्यादा। इसलिए यह तालिका छोटी दीवार से बेड की चौड़ाई घटाकर आधा करती है — दीवार से सटाने पर एक ओर छोड़नी पड़ती है पर दूसरी दोगुनी हो जाती है।',
    '房间纸面上再宽敞，床一放进去也常常没地方走。人侧身过去，一边大约需要 60cm；要开抽屉或衣柜门则需要更多。所以本表用房间短边减去床宽再除以二，得出单侧过道——靠墙摆则舍掉一侧，另一侧翻倍。',
    '房間紙面上再寬敞，床一放進去也常常沒地方走。人側身過去，一邊大約需要 60cm；要開抽屜或衣櫃門則需要更多。所以本表用房間短邊減去床寬再除以二，得出單側過道——靠牆擺則捨掉一側，另一側翻倍。',
  ),

  personTitle: T('둘이 누우면 싱글보다 좁아집니다', 'Two people get less than a single bed each', 'Dos personas tienen menos que una cama individual cada una', 'Dois têm menos que uma cama de solteiro cada', '2人で寝るとシングルより狭くなります', 'Zu zweit bleibt weniger als ein Einzelbett je Person', 'À deux, chacun a moins qu’un lit simple', 'दो लोगों को सिंगल से भी कम मिलता है', '两人睡，人均比单人床还窄', '兩人睡，人均比單人床還窄'),

  personNote: T(
    '한국 퀸(150cm)에 둘이 누우면 1인당 75cm입니다. 싱글 한 장이 100cm이니 각자 싱글보다 25cm씩 좁게 자는 셈입니다. 킹(160cm)이라도 1인당 80cm입니다. 침대 이름이 커진다고 1인당 폭이 싱글을 넘지는 않는다는 것이 이 표의 숫자에서 바로 보입니다.',
    'Two people on a Korean Queen at 150 cm get 75 cm each. A single bed is 100 cm, so each sleeper has 25 cm less than a single. Even a King at 160 cm gives 80 cm apiece. The numbers make it plain: no matter how grand the name, sharing does not buy you a single bed’s width each.',
    'Dos personas en una Queen coreana de 150 cm tienen 75 cm cada una. Una individual mide 100 cm, así que cada uno duerme con 25 cm menos que en una individual. Ni siquiera una King de 160 cm pasa de 80 cm por persona. Los números lo dejan claro: por grande que suene el nombre, compartir no da a cada uno el ancho de una individual.',
    'Duas pessoas numa Queen coreana de 150 cm ficam com 75 cm cada. Uma cama de solteiro tem 100 cm, então cada um dorme com 25 cm a menos. Nem uma King de 160 cm passa de 80 cm por pessoa. Os números deixam claro: por maior que seja o nome, dividir não dá a cada um a largura de uma solteiro.',
    '韓国のクイーン(150cm)に2人で寝ると1人あたり75cmです。シングル1枚が100cmなので、それぞれシングルより25cmずつ狭く寝ることになります。キング(160cm)でも1人あたり80cmです。ベッドの名前が大きくなっても1人あたりの幅がシングルを超えないことが、この表の数字からそのまま見えます。',
    'Zwei Personen auf einem koreanischen Queen mit 150 cm haben je 75 cm. Ein Einzelbett misst 100 cm — jeder liegt also 25 cm schmaler als in einem Einzelbett. Selbst ein King mit 160 cm gibt nur 80 cm pro Person. Die Zahlen zeigen es klar: so groß der Name auch klingt, geteilt bleibt weniger als ein Einzelbett je Person.',
    'À deux sur un Queen coréen de 150 cm, chacun dispose de 75 cm. Un lit simple fait 100 cm : chacun dort donc 25 cm plus à l’étroit. Même un King de 160 cm ne donne que 80 cm par personne. Les chiffres le disent : quel que soit le nom, partager ne procure pas à chacun la largeur d’un lit simple.',
    'कोरियाई Queen (150 सेमी) पर दो लोग सोएँ तो प्रति व्यक्ति 75 सेमी। सिंगल बेड 100 सेमी का होता है, यानी हर कोई सिंगल से 25 सेमी कम में सोता है। King (160 सेमी) पर भी प्रति व्यक्ति 80 सेमी ही। संख्याएँ साफ़ कहती हैं: नाम कितना भी बड़ा हो, साझा करने पर प्रति व्यक्ति सिंगल जितनी चौड़ाई नहीं मिलती।',
    '两人睡韩国 Queen（150cm），人均 75cm。单人床是 100cm，等于每人比单人床还窄 25cm。就算是 King（160cm），人均也只有 80cm。数字直接说明：名字再大，两人分着睡也换不来每人一张单人床的宽度。',
    '兩人睡韓國 Queen（150cm），人均 75cm。單人床是 100cm，等於每人比單人床還窄 25cm。就算是 King（160cm），人均也只有 80cm。數字直接說明：名字再大，兩人分著睡也換不來每人一張單人床的寬度。',
  ),

  ksTitle: T('표준에는 이 이름들이 없습니다', 'The standard does not use these names', 'La norma no usa estos nombres', 'A norma não usa esses nomes', '規格にはこれらの名前がありません', 'Die Norm kennt diese Namen nicht', 'La norme n’emploie pas ces noms', 'मानक में ये नाम हैं ही नहीं', '标准里根本没有这些名字', '標準裡根本沒有這些名字'),

  ksNote: T(
    '한국 국가표준은 매트리스의 폭과 길이 범위를 정할 뿐 「싱글·슈퍼싱글·퀸」 같은 말을 쓰지 않습니다. 그래서 싱글부터 퀸까지는 업체들이 대체로 같은 치수를 쓰지만, 킹 이상은 회사마다 다른 값을 씁니다. 여기 적은 한국 값은 업계에서 널리 통하는 관용 치수입니다.',
    'The Korean national standard fixes ranges for a mattress’s width and length but never uses words like “single”, “super single” or “queen”. Makers therefore agree closely from single up to queen, and diverge above king, where each company picks its own figures. The Korean numbers here are the trade’s common usage, not a legal size.',
    'La norma nacional coreana fija rangos de ancho y largo pero no emplea palabras como «individual», «super single» o «queen». Por eso los fabricantes coinciden bastante de individual a queen y se separan de king en adelante, donde cada empresa elige sus cifras. Los valores coreanos de aquí son el uso común del sector, no una medida legal.',
    'A norma nacional coreana fixa faixas de largura e comprimento mas não usa palavras como «solteiro», «super single» ou «queen». Por isso os fabricantes coincidem bastante de solteiro a queen e divergem de king em diante, onde cada empresa escolhe seus números. Os valores coreanos aqui são o uso comum do setor, não uma medida legal.',
    '韓国の国家規格はマットレスの幅と長さの範囲を定めるだけで、「シングル・スーパーシングル・クイーン」といった言葉を使いません。だからシングルからクイーンまではメーカーがおおむね同じ寸法を使いますが、キング以上は会社ごとに違う値を使います。ここに書いた韓国の値は業界で広く通る慣用寸法です。',
    'Die koreanische Norm legt Spannen für Breite und Länge fest, verwendet aber nie Wörter wie „Single“, „Super Single“ oder „Queen“. Von Single bis Queen stimmen die Hersteller daher weitgehend überein, ab King gehen sie auseinander und jede Firma wählt eigene Werte. Die koreanischen Zahlen hier sind branchenüblicher Sprachgebrauch, kein Rechtsmaß.',
    'La norme nationale coréenne fixe des plages de largeur et de longueur mais n’emploie jamais les mots « single », « super single » ou « queen ». Les fabricants s’accordent donc bien du single au queen, et divergent à partir du king, où chacun choisit ses chiffres. Les valeurs coréennes indiquées ici relèvent de l’usage du métier, non d’une cote légale.',
    'कोरियाई राष्ट्रीय मानक गद्दे की चौड़ाई और लंबाई की परास तय करता है, पर «सिंगल, सुपर सिंगल, क्वीन» जैसे शब्द नहीं बरतता। इसीलिए सिंगल से क्वीन तक निर्माता लगभग एक जैसे माप रखते हैं और किंग से ऊपर अलग-अलग। यहाँ दिए कोरियाई मान उद्योग का प्रचलित व्यवहार हैं, कोई क़ानूनी माप नहीं।',
    '韩国国家标准只规定床垫宽度和长度的范围，并不使用"单人、加大单人、Queen"这类叫法。所以从单人到 Queen，各家尺寸大体一致；到了 King 以上，各公司就各按各的。这里给出的韩国数值是业界通行的习惯尺寸，不是法定规格。',
    '韓國國家標準只規定床墊寬度和長度的範圍，並不使用「單人、加大單人、Queen」這類叫法。所以從單人到 Queen，各家尺寸大體一致；到了 King 以上，各公司就各按各的。這裡給出的韓國數值是業界通行的習慣尺寸，不是法定規格。',
  ),

  careTitle: T('프레임은 매트리스보다 큽니다', 'The frame is bigger than the mattress', 'El somier es mayor que el colchón', 'A estrutura é maior que o colchão', 'フレームはマットレスより大きいです', 'Der Rahmen ist größer als die Matratze', 'Le cadre dépasse le matelas', 'फ़्रेम गद्दे से बड़ा होता है', '床架比床垫大', '床架比床墊大'),

  careNote: T(
    '여기 값은 매트리스 치수입니다. 프레임은 보통 폭이 5~15cm 더 크고, 헤드보드가 있으면 길이도 늘어납니다. 통로가 아슬아슬한 칸이라면 프레임 치수를 따로 확인하십시오. 또 방문이 안쪽으로 열리는 자리, 붙박이장 문이 열리는 폭도 통로에서 빼야 합니다.',
    'These are mattress dimensions. A frame usually adds 5–15 cm of width, and a headboard adds length. Where the walkway is tight, check the frame’s own figures. Remember too that an inward-swinging door and the sweep of a wardrobe door both come out of the same walkway.',
    'Estas son medidas de colchón. El somier suele añadir de 5 a 15 cm de ancho, y un cabecero añade largo. Si el paso queda justo, comprueba las medidas del somier. Y recuerda que una puerta que abre hacia dentro y el barrido de la puerta del armario salen del mismo paso.',
    'Estas são medidas de colchão. A estrutura costuma somar 5–15 cm de largura, e uma cabeceira soma comprimento. Onde a passagem fica justa, confira as medidas da estrutura. Lembre também que uma porta que abre para dentro e o giro da porta do armário saem da mesma passagem.',
    'ここの値はマットレスの寸法です。フレームはたいてい幅が5〜15cm大きく、ヘッドボードがあれば長さも伸びます。通路がぎりぎりのマスならフレームの寸法を別に確かめてください。また内開きのドアや作り付けクローゼットの扉が開く幅も通路から引く必要があります。',
    'Dies sind Matratzenmaße. Ein Rahmen bringt meist 5–15 cm mehr Breite, ein Kopfteil zusätzliche Länge. Wo der Gang knapp ist, die Rahmenmaße gesondert prüfen. Und bedenken: eine nach innen schlagende Tür und der Schwenkbereich einer Schranktür gehen vom selben Gang ab.',
    'Ce sont des cotes de matelas. Un cadre ajoute en général 5 à 15 cm de largeur, une tête de lit ajoute de la longueur. Si le passage est juste, vérifiez les cotes du cadre. N’oubliez pas non plus qu’une porte ouvrant vers l’intérieur et le débattement d’une porte de placard se prennent sur ce même passage.',
    'ये गद्दे के माप हैं। फ़्रेम आमतौर पर 5–15 सेमी अधिक चौड़ा होता है, और हेडबोर्ड लंबाई बढ़ाता है। जहाँ रास्ता तंग हो, फ़्रेम के माप अलग से देखें। यह भी याद रखें कि अंदर खुलने वाला दरवाज़ा और अलमारी के पल्ले का घेरा उसी रास्ते से जाता है।',
    '这里给的是床垫尺寸。床架通常还要宽 5~15cm，带床头板还会加长。过道本来就紧的格子，请另外核对床架尺寸。另外，向内开的房门和衣柜门开启所需的空间，也都要从这条过道里扣。',
    '這裡給的是床墊尺寸。床架通常還要寬 5~15cm，帶床頭板還會加長。過道本來就緊的格子，請另外核對床架尺寸。另外，向內開的房門和衣櫃門開啟所需的空間，也都要從這條過道裡扣。',
  ),

  tableTitle: T('규격과 방 폭으로 찾기', 'Find it by bed and room', 'Búscalo por cama y habitación', 'Ache por cama e quarto', '規格と部屋の幅から探す', 'Nach Bett und Zimmer suchen', 'Chercher par lit et pièce', 'बेड और कमरे से देखें', '按床垫和房间查找', '按床墊和房間查找'),
  neighbourTitle: T('가까운 방 폭', 'Nearby room widths', 'Anchos de habitación cercanos', 'Larguras de quarto próximas', '近い部屋の幅', 'Zimmerbreiten daneben', 'Largeurs de pièce voisines', 'पास की कमरा चौड़ाइयाँ', '相邻房间宽度', '相鄰房間寬度'),
  bedRowTitle: T('같은 침대, 다른 방', 'Same bed, other rooms', 'Misma cama, otras habitaciones', 'Mesma cama, outros quartos', '同じベッド、別の部屋', 'Gleiches Bett, andere Zimmer', 'Même lit, autres pièces', 'वही बेड, दूसरे कमरे', '同一张床，不同房间', '同一張床，不同房間'),
  roomRowTitle: T('같은 방, 다른 침대', 'Same room, other beds', 'Misma habitación, otras camas', 'Mesmo quarto, outras camas', '同じ部屋、別のベッド', 'Gleiches Zimmer, andere Betten', 'Même pièce, autres lits', 'वही कमरा, दूसरे बेड', '同一房间，不同床垫', '同一房間，不同床墊'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '한쪽 통로 = (방의 짧은 변 − 침대 폭) ÷ 2',
      '사람이 지나가려면 한쪽에 60cm쯤은 있어야 합니다.',
      '벽에 붙이면 한쪽을 버리는 대신 다른 쪽이 두 배가 됩니다.',
      '여기 값은 매트리스 치수이고, 프레임은 5~15cm 더 큽니다.',
    ],
    [
      'Walkway per side = (short wall − bed width) ÷ 2.',
      'Squeezing past needs about 60 cm on one side.',
      'Against a wall you lose one side but double the other.',
      'These are mattress dimensions; a frame adds 5–15 cm.',
    ],
    [
      'Paso por lado = (lado corto − ancho de la cama) ÷ 2.',
      'Pasar de lado pide unos 60 cm.',
      'Contra la pared se pierde un lado y se dobla el otro.',
      'Son medidas de colchón; el somier añade de 5 a 15 cm.',
    ],
    [
      'Passagem por lado = (parede curta − largura da cama) ÷ 2.',
      'Passar de lado pede uns 60 cm.',
      'Encostada na parede perde-se um lado e dobra-se o outro.',
      'São medidas de colchão; a estrutura soma 5–15 cm.',
    ],
    [
      '片側の通路 = (部屋の短い辺 − ベッドの幅) ÷ 2',
      '人が通るには片側に60cmほど必要です。',
      '壁付けにすると片側を捨てる代わりにもう片側が二倍になります。',
      'ここの値はマットレス寸法で、フレームは5〜15cm大きいです。',
    ],
    [
      'Gang je Seite = (kurze Wand − Bettbreite) ÷ 2.',
      'Zum Vorbeikommen braucht es rund 60 cm auf einer Seite.',
      'An der Wand verliert man eine Seite und verdoppelt die andere.',
      'Dies sind Matratzenmaße; ein Rahmen bringt 5–15 cm mehr.',
    ],
    [
      'Passage par côté = (petit côté − largeur du lit) ÷ 2.',
      'Se faufiler demande environ 60 cm d’un côté.',
      'Contre le mur, on perd un côté et l’on double l’autre.',
      'Ce sont des cotes de matelas ; un cadre ajoute 5 à 15 cm.',
    ],
    [
      'प्रति ओर रास्ता = (छोटी दीवार − बेड चौड़ाई) ÷ 2।',
      'बग़ल से निकलने को एक ओर लगभग 60 सेमी चाहिए।',
      'दीवार से सटाने पर एक ओर छूटती है और दूसरी दोगुनी हो जाती है।',
      'ये गद्दे के माप हैं; फ़्रेम 5–15 सेमी और जोड़ता है।',
    ],
    [
      '单侧过道 =（房间短边 − 床宽）÷ 2。',
      '人侧身过去，一边约需 60cm。',
      '靠墙摆放则舍掉一侧，另一侧翻倍。',
      '这里是床垫尺寸，床架还要大 5~15cm。',
    ],
    [
      '單側過道 =（房間短邊 − 床寬）÷ 2。',
      '人側身過去，一邊約需 60cm。',
      '靠牆擺放則捨掉一側，另一側翻倍。',
      '這裡是床墊尺寸，床架還要大 5~15cm。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '침대 규격과 방 크기 — 통로가 몇 cm 남나',
    'Bed sizes and room width — how much walkway is left',
    'Camas y ancho de habitación — cuánto paso queda',
    'Camas e largura do quarto — quanta passagem sobra',
    'ベッドの規格と部屋の広さ — 通路は何cm残るか',
    'Bettgrößen und Zimmerbreite — wie viel Gang bleibt',
    'Lits et largeur de pièce — combien de passage reste-t-il',
    'बेड आकार और कमरे की चौड़ाई — कितना रास्ता बचता है',
    '床垫规格与房间宽度 — 还剩多少过道',
    '床墊規格與房間寬度 — 還剩多少過道',
  ),

  hubMetaDesc: T(
    '한국 킹은 160cm, 미국 King은 193cm로 33cm 다릅니다. 3.6m 방에 한국 퀸을 놓으면 한쪽에 105cm가 남습니다. 규격 12가지 × 방 폭 12가지 144칸의 통로와 판정.',
    'A Korean King is 160 cm and an American King 193 — a 33 cm gap. Put a Korean Queen in a 3.6 m room and 105 cm is left on each side. Walkways and verdicts for 12 bed sizes × 12 room widths.',
    'Una King coreana mide 160 cm y una estadounidense 193: 33 de diferencia. Con una Queen coreana en una habitación de 3,6 m quedan 105 cm a cada lado. Pasos y veredictos para 12 camas × 12 anchos.',
    'Uma King coreana mede 160 cm e uma americana 193: 33 de diferença. Com uma Queen coreana num quarto de 3,6 m sobram 105 cm de cada lado. Passagens e vereditos para 12 camas × 12 larguras.',
    '韓国のキングは160cm、米国のKingは193cmで33cm違います。3.6mの部屋に韓国のクイーンを置くと片側に105cm残ります。規格12通り×部屋の幅12通りの144マスの通路と判定。',
    'Ein koreanisches King misst 160 cm, ein amerikanisches 193 — 33 cm Unterschied. In einem 3,6-m-Zimmer lässt ein koreanisches Queen je Seite 105 cm. Gänge und Urteile für 12 Bettgrößen × 12 Zimmerbreiten.',
    'Un King coréen fait 160 cm, un King américain 193 — 33 cm d’écart. Dans une pièce de 3,6 m, un Queen coréen laisse 105 cm de chaque côté. Passages et verdicts pour 12 lits × 12 largeurs.',
    'कोरियाई King 160 सेमी है और अमेरिकी King 193 — 33 सेमी का अंतर। 3.6 मीटर के कमरे में कोरियाई Queen रखने पर हर ओर 105 सेमी बचते हैं। 12 बेड × 12 चौड़ाइयों के रास्ते और फ़ैसले।',
    '韩国 King 是 160cm，美国 King 是 193cm，相差 33cm。3.6m 的房间放韩国 Queen，两侧各剩 105cm。12 种规格 × 12 种房间宽度的过道与判定。',
    '韓國 King 是 160cm，美國 King 是 193cm，相差 33cm。3.6m 的房間放韓國 Queen，兩側各剩 105cm。12 種規格 × 12 種房間寬度的過道與判定。',
  ),

  desc: T<(f: BedFacts) => string>(
    f => `침대는 ${f.width} × ${f.length}mm이고, 방의 짧은 변이 ${f.cell.room}mm이면 가운데 놓았을 때 한쪽에 ${f.gap}mm가 남습니다.`,
    f => `The bed is ${f.width} × ${f.length} mm; with a ${f.cell.room} mm short wall, centring it leaves ${f.gap} mm on each side.`,
    f => `La cama mide ${f.width} × ${f.length} mm; con un lado corto de ${f.cell.room} mm, centrada deja ${f.gap} mm a cada lado.`,
    f => `A cama mede ${f.width} × ${f.length} mm; com parede curta de ${f.cell.room} mm, centrada deixa ${f.gap} mm de cada lado.`,
    f => `ベッドは${f.width} × ${f.length}mmで、部屋の短い辺が${f.cell.room}mmなら中央に置いたとき片側に${f.gap}mm残ります。`,
    f => `Das Bett misst ${f.width} × ${f.length} mm; bei ${f.cell.room} mm kurzer Wand bleiben mittig je Seite ${f.gap} mm.`,
    f => `Le lit fait ${f.width} × ${f.length} mm ; avec un petit côté de ${f.cell.room} mm, centré il laisse ${f.gap} mm de chaque côté.`,
    f => `बेड ${f.width} × ${f.length} मिमी है; ${f.cell.room} मिमी की छोटी दीवार पर बीच में रखने से हर ओर ${f.gap} मिमी बचते हैं।`,
    f => `床垫为 ${f.width} × ${f.length}mm；房间短边 ${f.cell.room}mm 时，居中摆放两侧各剩 ${f.gap}mm。`,
    f => `床墊為 ${f.width} × ${f.length}mm；房間短邊 ${f.cell.room}mm 時，居中擺放兩側各剩 ${f.gap}mm。`,
  ),

  metaTitle: T<(f: BedFacts) => string>(
    f => `${bKo[f.cell.bed]} · 방 ${f.cell.room}mm — 통로 ${f.gap}mm`,
    f => `${bEn[f.cell.bed]} in a ${f.cell.room} mm room — ${f.gap} mm each side`,
    f => `${bEn[f.cell.bed]} en ${f.cell.room} mm — ${f.gap} mm por lado`,
    f => `${bEn[f.cell.bed]} em ${f.cell.room} mm — ${f.gap} mm por lado`,
    f => `${bJa[f.cell.bed]}・部屋${f.cell.room}mm — 通路${f.gap}mm`,
    f => `${bEn[f.cell.bed]} bei ${f.cell.room} mm — ${f.gap} mm je Seite`,
    f => `${bEn[f.cell.bed]} en ${f.cell.room} mm — ${f.gap} mm par côté`,
    f => `${bEn[f.cell.bed]}, कमरा ${f.cell.room} मिमी — ${f.gap} मिमी हर ओर`,
    f => `${bZh[f.cell.bed]} · 房间 ${f.cell.room}mm — 单侧 ${f.gap}mm`,
    f => `${bZh[f.cell.bed]} · 房間 ${f.cell.room}mm — 單側 ${f.gap}mm`,
  ),

  metaDesc: T<(f: BedFacts) => string>(
    f => `${bKo[f.cell.bed]}은 ${f.width} × ${f.length}mm입니다. 짧은 변이 ${f.cell.room}mm인 방에 가운데로 놓으면 한쪽에 ${f.gap}mm, 벽에 붙이면 ${f.wallGap}mm가 남습니다. 둘이 누우면 1인당 ${f.perPerson}mm입니다.`,
    f => `${bEn[f.cell.bed]} measures ${f.width} × ${f.length} mm. In a room whose short wall is ${f.cell.room} mm, centring leaves ${f.gap} mm each side and pushing it to the wall leaves ${f.wallGap} mm. Shared by two, that is ${f.perPerson} mm each.`,
    f => `${bEn[f.cell.bed]} mide ${f.width} × ${f.length} mm. En una habitación de ${f.cell.room} mm de lado corto, centrada deja ${f.gap} mm a cada lado y contra la pared ${f.wallGap} mm. Entre dos, ${f.perPerson} mm por persona.`,
    f => `${bEn[f.cell.bed]} mede ${f.width} × ${f.length} mm. Num quarto de ${f.cell.room} mm de parede curta, centrada deixa ${f.gap} mm de cada lado e encostada ${f.wallGap} mm. Dividida por dois, ${f.perPerson} mm por pessoa.`,
    f => `${bJa[f.cell.bed]}は${f.width} × ${f.length}mmです。短い辺が${f.cell.room}mmの部屋に中央へ置くと片側に${f.gap}mm、壁付けなら${f.wallGap}mm残ります。2人で寝ると1人あたり${f.perPerson}mmです。`,
    f => `${bEn[f.cell.bed]} misst ${f.width} × ${f.length} mm. In einem Zimmer mit ${f.cell.room} mm kurzer Wand bleiben mittig ${f.gap} mm je Seite, an der Wand ${f.wallGap} mm. Zu zweit sind das ${f.perPerson} mm pro Person.`,
    f => `${bEn[f.cell.bed]} fait ${f.width} × ${f.length} mm. Dans une pièce au petit côté de ${f.cell.room} mm, centré il laisse ${f.gap} mm de chaque côté, contre le mur ${f.wallGap} mm. À deux, cela fait ${f.perPerson} mm par personne.`,
    f => `${bEn[f.cell.bed]} का माप ${f.width} × ${f.length} मिमी है। ${f.cell.room} मिमी छोटी दीवार वाले कमरे में बीच में रखने पर हर ओर ${f.gap} मिमी और दीवार से सटाने पर ${f.wallGap} मिमी बचते हैं। दो लोगों में प्रति व्यक्ति ${f.perPerson} मिमी।`,
    f => `${bZh[f.cell.bed]} 为 ${f.width} × ${f.length}mm。房间短边 ${f.cell.room}mm 时，居中摆放两侧各剩 ${f.gap}mm，靠墙摆放剩 ${f.wallGap}mm。两人分睡，人均 ${f.perPerson}mm。`,
    f => `${bZh[f.cell.bed]} 為 ${f.width} × ${f.length}mm。房間短邊 ${f.cell.room}mm 時，居中擺放兩側各剩 ${f.gap}mm，靠牆擺放剩 ${f.wallGap}mm。兩人分睡，人均 ${f.perPerson}mm。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '한국 퀸과 미국 Queen이 같은가요?', a: '거의 같습니다. 150 × 200cm와 152.4 × 203.2cm로 2~3cm 차이입니다.' },
      { q: '킹은요?', a: '많이 다릅니다. 한국 킹이 160cm인데 미국 King은 193cm로 33cm 넓습니다. 한국 슈퍼킹(180)보다도 넓습니다.' },
      { q: '3.6m 방에 퀸을 놓으면 통로가 얼마나 남나요?', a: '가운데 놓으면 한쪽에 105cm, 벽에 붙이면 한쪽에 210cm가 남습니다.' },
      { q: '통로는 얼마나 있어야 하나요?', a: '사람이 옆으로 지나가려면 60cm쯤입니다. 서랍이나 옷장 문을 열려면 더 필요합니다.' },
      { q: '한국 국가표준에 싱글·퀸이 있나요?', a: '없습니다. 표준은 폭과 길이의 범위만 정하고 이름은 쓰지 않아, 킹 이상은 업체마다 다릅니다.' },
    ],
    [
      { q: 'Is a Korean Queen the same as an American one?', a: 'Nearly. 150 × 200 cm against 152.4 × 203.2 — a couple of centimetres apart.' },
      { q: 'And King?', a: 'Very different. A Korean King is 160 cm, an American King 193 — 33 cm wider, and wider even than a Korean Super King at 180.' },
      { q: 'How much walkway does a Queen leave in a 3.6 m room?', a: '105 cm on each side if centred, or 210 cm on one side if pushed against a wall.' },
      { q: 'How much walkway do I need?', a: 'About 60 cm to squeeze past sideways. Opening drawers or a wardrobe needs more.' },
      { q: 'Does the Korean standard define “single” and “queen”?', a: 'No. It fixes ranges for width and length without using the names, which is why king and above vary by maker.' },
    ],
    [
      { q: '¿Es igual la Queen coreana que la estadounidense?', a: 'Casi. 150 × 200 cm frente a 152,4 × 203,2: un par de centímetros.' },
      { q: '¿Y la King?', a: 'Muy distinta. La King coreana mide 160 cm y la estadounidense 193: 33 más, y más ancha incluso que la Super King coreana de 180.' },
      { q: '¿Cuánto paso deja una Queen en 3,6 m?', a: '105 cm a cada lado si va centrada, o 210 cm a un lado si va pegada a la pared.' },
      { q: '¿Cuánto paso hace falta?', a: 'Unos 60 cm para pasar de lado. Abrir cajones o el armario pide más.' },
      { q: '¿La norma coreana define «individual» o «queen»?', a: 'No. Fija rangos de ancho y largo sin usar los nombres; por eso de king en adelante cada fabricante difiere.' },
    ],
    [
      { q: 'A Queen coreana é igual à americana?', a: 'Quase. 150 × 200 cm contra 152,4 × 203,2 — uns dois centímetros.' },
      { q: 'E a King?', a: 'Bem diferente. A King coreana tem 160 cm e a americana 193: 33 a mais, e mais larga até que a Super King coreana de 180.' },
      { q: 'Quanta passagem sobra com uma Queen num quarto de 3,6 m?', a: '105 cm de cada lado se centrada, ou 210 cm de um lado se encostada.' },
      { q: 'De quanta passagem preciso?', a: 'Uns 60 cm para passar de lado. Abrir gavetas ou armário pede mais.' },
      { q: 'A norma coreana define «solteiro» ou «queen»?', a: 'Não. Fixa faixas de largura e comprimento sem usar os nomes; por isso de king em diante cada fabricante difere.' },
    ],
    [
      { q: '韓国のクイーンと米国のQueenは同じですか？', a: 'ほぼ同じです。150 × 200cmと152.4 × 203.2cmで2〜3cmの差です。' },
      { q: 'キングは？', a: '大きく違います。韓国のキングが160cmなのに米国のKingは193cmで33cm広く、韓国のスーパーキング(180)よりも広いです。' },
      { q: '3.6mの部屋にクイーンを置くと通路はどれくらい残りますか？', a: '中央に置けば片側に105cm、壁付けなら片側に210cm残ります。' },
      { q: '通路はどれくらい要りますか？', a: '横向きに通るなら60cmほどです。引き出しやクローゼットを開けるにはもっと要ります。' },
      { q: '韓国の国家規格にシングルやクイーンはありますか？', a: 'ありません。規格は幅と長さの範囲だけを定めて名前を使わないので、キング以上は業者ごとに違います。' },
    ],
    [
      { q: 'Ist ein koreanisches Queen dasselbe wie ein amerikanisches?', a: 'Fast. 150 × 200 cm gegen 152,4 × 203,2 — ein paar Zentimeter Unterschied.' },
      { q: 'Und King?', a: 'Sehr verschieden. Koreanisch 160 cm, amerikanisch 193 — 33 cm mehr, und breiter noch als ein koreanisches Super King mit 180.' },
      { q: 'Wie viel Gang lässt ein Queen in einem 3,6-m-Zimmer?', a: 'Mittig 105 cm je Seite, an die Wand geschoben 210 cm auf einer Seite.' },
      { q: 'Wie viel Gang brauche ich?', a: 'Etwa 60 cm zum seitlichen Vorbeikommen. Schubladen oder Schranktüren brauchen mehr.' },
      { q: 'Kennt die koreanische Norm „Single“ oder „Queen“?', a: 'Nein. Sie legt Spannen für Breite und Länge fest, ohne die Namen zu verwenden — darum weichen King und größer je Hersteller ab.' },
    ],
    [
      { q: 'Un Queen coréen équivaut-il à un américain ?', a: 'Presque. 150 × 200 cm contre 152,4 × 203,2 : deux ou trois centimètres.' },
      { q: 'Et le King ?', a: 'Très différent. Le King coréen fait 160 cm, l’américain 193 — 33 de plus, et plus large même qu’un Super King coréen de 180.' },
      { q: 'Quel passage laisse un Queen dans une pièce de 3,6 m ?', a: '105 cm de chaque côté s’il est centré, ou 210 cm d’un seul côté contre le mur.' },
      { q: 'Quel passage faut-il ?', a: 'Environ 60 cm pour se faufiler de côté. Ouvrir un tiroir ou un placard en demande plus.' },
      { q: 'La norme coréenne définit-elle « single » ou « queen » ?', a: 'Non. Elle fixe des plages de largeur et de longueur sans employer ces noms ; d’où les écarts entre fabricants à partir du king.' },
    ],
    [
      { q: 'क्या कोरियाई Queen और अमेरिकी Queen एक ही हैं?', a: 'लगभग। 150 × 200 सेमी बनाम 152.4 × 203.2 — दो-तीन सेंटीमीटर का फ़र्क़।' },
      { q: 'और King?', a: 'बहुत अलग। कोरियाई King 160 सेमी, अमेरिकी 193 — 33 सेमी अधिक, और कोरियाई Super King (180) से भी चौड़ा।' },
      { q: '3.6 मीटर के कमरे में Queen रखने पर कितना रास्ता बचता है?', a: 'बीच में रखें तो हर ओर 105 सेमी, दीवार से सटाएँ तो एक ओर 210 सेमी।' },
      { q: 'कितना रास्ता चाहिए?', a: 'बग़ल से निकलने को लगभग 60 सेमी। दराज़ या अलमारी खोलने को और अधिक।' },
      { q: 'क्या कोरियाई मानक «सिंगल» या «क्वीन» तय करता है?', a: 'नहीं। वह चौड़ाई और लंबाई की परास तय करता है, नाम नहीं बरतता — इसीलिए King से ऊपर निर्माता-दर-निर्माता फ़र्क़ है।' },
    ],
    [
      { q: '韩国 Queen 和美国 Queen 一样吗？', a: '几乎一样。150 × 200cm 对 152.4 × 203.2cm，相差两三厘米。' },
      { q: 'King 呢？', a: '差很多。韩国 King 是 160cm，美国 King 是 193cm，宽 33cm，甚至比韩国 Super King（180）还宽。' },
      { q: '3.6m 房间放 Queen 还剩多少过道？', a: '居中摆放两侧各剩 105cm；靠墙摆放一侧剩 210cm。' },
      { q: '过道要留多少？', a: '侧身通过约需 60cm。要开抽屉或衣柜门则需要更多。' },
      { q: '韩国国家标准里有"单人""Queen"吗？', a: '没有。标准只规定宽度和长度的范围、不用这些名字，所以 King 以上各家不同。' },
    ],
    [
      { q: '韓國 Queen 和美國 Queen 一樣嗎？', a: '幾乎一樣。150 × 200cm 對 152.4 × 203.2cm，相差兩三公分。' },
      { q: 'King 呢？', a: '差很多。韓國 King 是 160cm，美國 King 是 193cm，寬 33cm，甚至比韓國 Super King（180）還寬。' },
      { q: '3.6m 房間放 Queen 還剩多少過道？', a: '居中擺放兩側各剩 105cm；靠牆擺放一側剩 210cm。' },
      { q: '過道要留多少？', a: '側身通過約需 60cm。要開抽屜或衣櫃門則需要更多。' },
      { q: '韓國國家標準裡有「單人」「Queen」嗎？', a: '沒有。標準只規定寬度和長度的範圍、不用這些名字，所以 King 以上各家不同。' },
    ],
  ),

  cellFaq: T<(f: BedFacts) => FaqItem[]>(
    f => [
      { q: `${bKo[f.cell.bed]}의 크기는 얼마인가요?`, a: `${f.width} × ${f.length}mm입니다. 넓이로는 ${f.area}㎡입니다.` },
      { q: `방의 짧은 변이 ${f.cell.room}mm면 통로가 얼마나 남나요?`, a: `가운데 놓으면 한쪽에 ${f.gap}mm, 벽에 붙이면 ${f.wallGap}mm입니다.` },
      { q: `둘이 누우면 1인당 얼마인가요?`, a: `${f.perPerson}mm입니다. 싱글 한 장이 1000mm인 것과 견주어 보십시오.` },
      { q: f.twin ? `같은 이름의 다른 나라 규격은요?` : `이 이름이 다른 나라에도 있나요?`, a: f.twin ? `${bKo[f.twin.key]}은 폭이 ${f.twin.diff > 0 ? `${f.twin.diff}mm 더 넓습니다` : `${-f.twin.diff}mm 더 좁습니다`}.` : `이 표에서는 짝이 되는 이름이 없습니다.` },
    ],
    f => [
      { q: `How big is a ${bEn[f.cell.bed]}?`, a: `${f.width} × ${f.length} mm, an area of ${f.area} m².` },
      { q: `What walkway does a ${f.cell.room} mm short wall leave?`, a: `${f.gap} mm on each side if centred, ${f.wallGap} mm if pushed against the wall.` },
      { q: `How much is that per person for two?`, a: `${f.perPerson} mm each — compare that with a single bed at 1000 mm.` },
      { q: f.twin ? `What about the same name elsewhere?` : `Does this name exist elsewhere?`, a: f.twin ? `${bEn[f.twin.key]} is ${f.twin.diff > 0 ? `${f.twin.diff} mm wider` : `${-f.twin.diff} mm narrower`}.` : `No paired name in this table.` },
    ],
    f => [
      { q: `¿Cuánto mide una ${bEn[f.cell.bed]}?`, a: `${f.width} × ${f.length} mm, una superficie de ${f.area} m².` },
      { q: `¿Qué paso deja un lado corto de ${f.cell.room} mm?`, a: `${f.gap} mm a cada lado centrada, ${f.wallGap} mm pegada a la pared.` },
      { q: `¿Cuánto toca por persona entre dos?`, a: `${f.perPerson} mm cada uno; una individual mide 1000 mm.` },
      { q: f.twin ? `¿Y el mismo nombre en otro país?` : `¿Existe este nombre en otro país?`, a: f.twin ? `${bEn[f.twin.key]} es ${f.twin.diff > 0 ? `${f.twin.diff} mm más ancha` : `${-f.twin.diff} mm más estrecha`}.` : `En esta tabla no tiene pareja.` },
    ],
    f => [
      { q: `Quanto mede uma ${bEn[f.cell.bed]}?`, a: `${f.width} × ${f.length} mm, área de ${f.area} m².` },
      { q: `Que passagem deixa uma parede curta de ${f.cell.room} mm?`, a: `${f.gap} mm de cada lado centrada, ${f.wallGap} mm encostada.` },
      { q: `Quanto sobra por pessoa entre dois?`, a: `${f.perPerson} mm cada; uma de solteiro tem 1000 mm.` },
      { q: f.twin ? `E o mesmo nome noutro país?` : `Este nome existe noutro país?`, a: f.twin ? `${bEn[f.twin.key]} é ${f.twin.diff > 0 ? `${f.twin.diff} mm mais larga` : `${-f.twin.diff} mm mais estreita`}.` : `Nesta tabela não há par.` },
    ],
    f => [
      { q: `${bJa[f.cell.bed]}の大きさは？`, a: `${f.width} × ${f.length}mmです。面積では${f.area}㎡です。` },
      { q: `部屋の短い辺が${f.cell.room}mmなら通路はどれくらい？`, a: `中央に置けば片側に${f.gap}mm、壁付けなら${f.wallGap}mmです。` },
      { q: `2人で寝ると1人あたりいくつ？`, a: `${f.perPerson}mmです。シングル1枚が1000mmであることと見比べてください。` },
      { q: f.twin ? `同じ名前の別の国の規格は？` : `この名前は別の国にもありますか？`, a: f.twin ? `${bJa[f.twin.key]}は幅が${f.twin.diff > 0 ? `${f.twin.diff}mm広い` : `${-f.twin.diff}mm狭い`}です。` : `この表では対になる名前がありません。` },
    ],
    f => [
      { q: `Wie groß ist ein ${bEn[f.cell.bed]}?`, a: `${f.width} × ${f.length} mm, also ${f.area} m² Fläche.` },
      { q: `Welchen Gang lässt eine ${f.cell.room}-mm-Wand?`, a: `Mittig ${f.gap} mm je Seite, an der Wand ${f.wallGap} mm.` },
      { q: `Wie viel bleibt zu zweit pro Person?`, a: `${f.perPerson} mm — ein Einzelbett misst 1000 mm.` },
      { q: f.twin ? `Und derselbe Name anderswo?` : `Gibt es diesen Namen anderswo?`, a: f.twin ? `${bEn[f.twin.key]} ist ${f.twin.diff > 0 ? `${f.twin.diff} mm breiter` : `${-f.twin.diff} mm schmaler`}.` : `In dieser Tabelle gibt es kein Gegenstück.` },
    ],
    f => [
      { q: `Quelle taille fait un ${bEn[f.cell.bed]} ?`, a: `${f.width} × ${f.length} mm, soit ${f.area} m².` },
      { q: `Quel passage laisse un petit côté de ${f.cell.room} mm ?`, a: `${f.gap} mm de chaque côté centré, ${f.wallGap} mm contre le mur.` },
      { q: `Combien par personne à deux ?`, a: `${f.perPerson} mm chacun ; un lit simple fait 1000 mm.` },
      { q: f.twin ? `Et le même nom ailleurs ?` : `Ce nom existe-t-il ailleurs ?`, a: f.twin ? `${bEn[f.twin.key]} est ${f.twin.diff > 0 ? `${f.twin.diff} mm plus large` : `${-f.twin.diff} mm plus étroit`}.` : `Pas d’équivalent dans ce tableau.` },
    ],
    f => [
      { q: `${bEn[f.cell.bed]} का आकार क्या है?`, a: `${f.width} × ${f.length} मिमी, क्षेत्रफल ${f.area} m²।` },
      { q: `${f.cell.room} मिमी की छोटी दीवार पर कितना रास्ता बचता है?`, a: `बीच में रखने पर हर ओर ${f.gap} मिमी, दीवार से सटाने पर ${f.wallGap} मिमी।` },
      { q: `दो लोगों में प्रति व्यक्ति कितना?`, a: `${f.perPerson} मिमी — सिंगल बेड 1000 मिमी का होता है।` },
      { q: f.twin ? `दूसरे देश का वही नाम?` : `क्या यह नाम कहीं और भी है?`, a: f.twin ? `${bEn[f.twin.key]} ${f.twin.diff > 0 ? `${f.twin.diff} मिमी चौड़ा` : `${-f.twin.diff} मिमी सँकरा`} है।` : `इस तालिका में इसका जोड़ा नहीं है।` },
    ],
    f => [
      { q: `${bZh[f.cell.bed]} 有多大？`, a: `${f.width} × ${f.length}mm，面积 ${f.area}㎡。` },
      { q: `房间短边 ${f.cell.room}mm 时还剩多少过道？`, a: `居中摆放两侧各 ${f.gap}mm，靠墙摆放 ${f.wallGap}mm。` },
      { q: `两人分睡，人均多少？`, a: `${f.perPerson}mm——单人床是 1000mm，可以对照看。` },
      { q: f.twin ? `同名的另一国规格呢？` : `别的国家有这个名字吗？`, a: f.twin ? `${bZh[f.twin.key]} ${f.twin.diff > 0 ? `宽 ${f.twin.diff}mm` : `窄 ${-f.twin.diff}mm`}。` : `本表中没有对应的同名规格。` },
    ],
    f => [
      { q: `${bZh[f.cell.bed]} 有多大？`, a: `${f.width} × ${f.length}mm，面積 ${f.area}㎡。` },
      { q: `房間短邊 ${f.cell.room}mm 時還剩多少過道？`, a: `居中擺放兩側各 ${f.gap}mm，靠牆擺放 ${f.wallGap}mm。` },
      { q: `兩人分睡，人均多少？`, a: `${f.perPerson}mm——單人床是 1000mm，可以對照看。` },
      { q: f.twin ? `同名的另一國規格呢？` : `別的國家有這個名字嗎？`, a: f.twin ? `${bZh[f.twin.key]} ${f.twin.diff > 0 ? `寬 ${f.twin.diff}mm` : `窄 ${-f.twin.diff}mm`}。` : `本表中沒有對應的同名規格。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const BED_UI: L<BedUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<BedUI>;
