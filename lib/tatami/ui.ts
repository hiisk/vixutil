/**
 * 다다미 방 넓이 화면의 문구 — 열 언어.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { TatamiFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface TatamiUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindName: (key: string) => string;
  matsLabel: string;
  sizeLabel: string;
  oneLabel: string;
  sqmLabel: string;
  pyeongLabel: string;
  sqftLabel: string;
  spreadLabel: string;
  ratioTitle: string;
  ratioNote: string;
  spreadTitle: string;
  spreadNote: string;
  originTitle: string;
  originNote: string;
  rentTitle: string;
  rentNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  kindRowTitle: string;
  matsRowTitle: string;
  desc: (f: TatamiFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: TatamiFacts) => string;
  metaDesc: (f: TatamiFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: TatamiFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Names = Record<string, string>;
const namer = (m: Names) => (key: string) => m[key] ?? key;

const kKo: Names = { kyoma: '교마(京間)', rokuichi: '로쿠이치마(六一間)', chukyo: '주쿄마(中京間)', edo: '에도마(江戸間)', danchi: '단치마(団地間)' };
const kEn: Names = { kyoma: 'Kyōma (京間, Kansai)', rokuichi: 'Rokuichima (六一間)', chukyo: 'Chūkyōma (中京間, Nagoya)', edo: 'Edoma (江戸間, Kantō)', danchi: 'Danchima (団地間, flats)' };
const kJa: Names = { kyoma: '京間', rokuichi: '六一間', chukyo: '中京間', edo: '江戸間', danchi: '団地間' };
const kZh: Names = { kyoma: '京間（关西）', rokuichi: '六一間', chukyo: '中京間（名古屋）', edo: '江戸間（关东）', danchi: '団地間（公寓）' };
const kTw: Names = { kyoma: '京間（關西）', rokuichi: '六一間', chukyo: '中京間（名古屋）', edo: '江戸間（關東）', danchi: '団地間（公寓）' };
const kHi: Names = { kyoma: 'क्योमा (京間)', rokuichi: 'रोकुइचिमा (六一間)', chukyo: 'चूक्योमा (中京間)', edo: 'एदोमा (江戸間)', danchi: 'दान्चिमा (団地間)' };

type Spec = { [K in keyof TatamiUI]: L<TatamiUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('다다미 방 넓이', 'Tatami room size', 'Tamaño de habitación en tatami', 'Tamanho de quarto em tatami', '畳の広さ', 'Tatami-Zimmergröße', 'Surface en tatamis', 'तातामी कमरे का आकार', '榻榻米房间面积', '榻榻米房間面積'),

  hubTitle: T(
    '다다미 100칸 — 같은 6첩이 10.94㎡이기도 하고 8.67㎡이기도 합니다',
    '100 tatami rooms — the same “six mats” can be 10.94 m² or 8.67 m²',
    '100 habitaciones de tatami — los mismos «seis tatamis» pueden ser 10,94 m² u 8,67 m²',
    '100 quartos de tatami — os mesmos «seis tatamis» podem ser 10,94 m² ou 8,67 m²',
    '畳100マス — 同じ6畳が10.94㎡にも8.67㎡にもなります',
    '100 Tatami-Zimmer — dieselben „sechs Matten“ sind 10,94 m² oder 8,67 m²',
    '100 pièces en tatamis — les mêmes « six tatamis » font 10,94 m² ou 8,67 m²',
    '100 तातामी कमरे — वही «छह चटाई» 10.94 m² भी है और 8.67 m² भी',
    '100 格榻榻米 — 同样的"六叠"，可能是 10.94㎡，也可能是 8.67㎡',
    '100 格榻榻米 — 同樣的「六疊」，可能是 10.94㎡，也可能是 8.67㎡',
  ),

  hubLead: T(
    '다다미 한 장의 크기가 지역마다 다릅니다. JIS도 여러 규격을 나란히 인정하므로 "6첩"만으로는 넓이가 정해지지 않습니다. 규격 다섯과 장수 스무 가지가 만나는 칸마다 제곱미터·평·제곱피트를 계산했습니다.',
    'A tatami mat is not one size. Regional standards differ and JIS lists several side by side, so “six mats” does not fix a floor area. Every meeting of 5 standards and 20 mat counts is worked out in square metres, pyeong and square feet.',
    'Un tatami no tiene una sola medida. Los estándares regionales difieren y la JIS reconoce varios a la vez, así que «seis tatamis» no fija una superficie. Cada cruce de 5 estándares y 20 recuentos se calcula en metros cuadrados, pyeong y pies cuadrados.',
    'Um tatami não tem tamanho único. Os padrões regionais diferem e a JIS lista vários lado a lado, então «seis tatamis» não fixa uma área. Cada cruzamento de 5 padrões e 20 contagens é calculado em metros quadrados, pyeong e pés quadrados.',
    '畳一枚の大きさは地域で違います。JISも複数の規格を並べて認めているので、「6畳」だけでは広さが決まりません。規格5つと枚数20通りが出会う各マスの平米・坪・平方フィートを計算しました。',
    'Eine Tatami hat nicht eine Größe. Regionale Normen unterscheiden sich, und die JIS führt mehrere nebeneinander — „sechs Matten“ legt also keine Fläche fest. Jede Begegnung von 5 Normen und 20 Mattenzahlen ist in Quadratmetern, Pyeong und Quadratfuß gerechnet.',
    'Un tatami n’a pas une seule taille. Les normes régionales diffèrent et la JIS en reconnaît plusieurs, si bien que « six tatamis » ne fixe pas une surface. Chaque croisement de 5 normes et 20 nombres de tatamis est calculé en mètres carrés, pyeong et pieds carrés.',
    'तातामी का एक ही आकार नहीं होता। क्षेत्रीय मानक अलग हैं और JIS कई को साथ मान्यता देता है, इसलिए «छह चटाई» से क्षेत्रफल तय नहीं होता। 5 मानकों और 20 गिनतियों के हर मेल का वर्ग मीटर, प्योंग और वर्ग फ़ुट निकाला गया है।',
    '榻榻米一张的尺寸因地区而异。JIS 也并列认可多种规格，所以只说"六叠"并不能定下面积。5 种规格与 20 种张数交汇的每一格，都算出平方米、坪和平方英尺。',
    '榻榻米一張的尺寸因地區而異。JIS 也並列認可多種規格，所以只說「六疊」並不能定下面積。5 種規格與 20 種張數交匯的每一格，都算出平方公尺、坪和平方英尺。',
  ),

  kindName: T<(k: string) => string>(
    namer(kKo), namer(kEn), namer(kEn), namer(kEn), namer(kJa),
    namer(kEn), namer(kEn), namer(kHi), namer(kZh), namer(kTw),
  ),

  matsLabel: T('장수', 'Mats', 'Tatamis', 'Tatamis', '枚数', 'Matten', 'Tatamis', 'चटाइयाँ', '张数', '張數'),
  sizeLabel: T('한 장의 치수', 'Mat dimensions', 'Medidas del tatami', 'Medidas do tatami', '一枚の寸法', 'Mattenmaß', 'Dimensions du tatami', 'चटाई का माप', '单张尺寸', '單張尺寸'),
  oneLabel: T('한 장의 넓이', 'Area of one mat', 'Superficie de un tatami', 'Área de um tatami', '一枚の面積', 'Fläche einer Matte', 'Surface d’un tatami', 'एक चटाई का क्षेत्रफल', '单张面积', '單張面積'),
  sqmLabel: T('방 넓이', 'Floor area', 'Superficie', 'Área', '部屋の広さ', 'Bodenfläche', 'Surface', 'फ़र्श क्षेत्रफल', '房间面积', '房間面積'),
  pyeongLabel: T('평', 'Pyeong', 'Pyeong', 'Pyeong', '坪', 'Pyeong', 'Pyeong', 'प्योंग', '坪', '坪'),
  sqftLabel: T('제곱피트', 'Square feet', 'Pies cuadrados', 'Pés quadrados', '平方フィート', 'Quadratfuß', 'Pieds carrés', 'वर्ग फ़ुट', '平方英尺', '平方英尺'),
  spreadLabel: T('규격 사이의 차이', 'Spread between standards', 'Diferencia entre estándares', 'Diferença entre padrões', '規格の間の差', 'Unterschied der Normen', 'Écart entre normes', 'मानकों के बीच अंतर', '规格之间的差', '規格之間的差'),

  ratioTitle: T('다섯 규격 모두 정확히 2:1입니다', 'All five standards are exactly 2:1', 'Los cinco estándares son exactamente 2:1', 'Os cinco padrões são exatamente 2:1', '五つの規格はどれも正確に2:1です', 'Alle fünf Normen sind genau 2:1', 'Les cinq normes sont exactement 2:1', 'पाँचों मानक ठीक 2:1 हैं', '五种规格都正好是 2:1', '五種規格都正好是 2:1'),

  ratioNote: T(
    '긴 변이 짧은 변의 정확히 두 배입니다. 반 장 둘을 나란히 놓으면 한 장이 되어야 방이 짜이기 때문입니다. 그래서 한 장의 넓이는 짧은 변의 제곱에 2를 곱한 값이고, 규격이 달라도 이 성질만은 같습니다 — 京間 955mm, 中京間 910mm, 団地間 850mm처럼 짧은 변만 다릅니다.',
    'The long side is exactly twice the short one, because two half mats must make a whole for the floor to tile. So a mat’s area is twice the square of its short side, and that holds across every standard — only the short side changes: 955 mm for Kyōma, 910 for Chūkyōma, 850 for Danchima.',
    'El lado largo mide exactamente el doble que el corto, porque dos medios tatamis deben formar uno entero para que el suelo encaje. Así, la superficie es dos veces el cuadrado del lado corto, y eso vale para todos los estándares: solo cambia el lado corto (955 mm en Kyōma, 910 en Chūkyōma, 850 en Danchima).',
    'O lado longo mede exatamente o dobro do curto, porque dois meios tatamis precisam formar um inteiro para o piso encaixar. Assim, a área é duas vezes o quadrado do lado curto, e isso vale para todos os padrões: só muda o lado curto (955 mm no Kyōma, 910 no Chūkyōma, 850 no Danchima).',
    '長い辺が短い辺のちょうど二倍です。半畳二枚で一畳にならないと部屋が組めないからです。だから一枚の面積は短い辺の二乗の二倍で、規格が変わってもこの性質だけは同じです — 京間955mm、中京間910mm、団地間850mmのように短い辺だけが違います。',
    'Die lange Seite misst genau das Doppelte der kurzen, denn zwei halbe Matten müssen eine ganze ergeben, damit der Boden aufgeht. Die Fläche ist somit das Doppelte des Quadrats der kurzen Seite — und das gilt für jede Norm; nur die kurze Seite ändert sich: 955 mm bei Kyōma, 910 bei Chūkyōma, 850 bei Danchima.',
    'Le grand côté vaut exactement le double du petit, car deux demi-tatamis doivent en former un entier pour que le sol se pave. La surface vaut donc deux fois le carré du petit côté, et cela tient pour toutes les normes : seul le petit côté change — 955 mm en Kyōma, 910 en Chūkyōma, 850 en Danchima.',
    'लंबी भुजा छोटी की ठीक दोगुनी है, क्योंकि दो आधी चटाइयों से एक पूरी बननी चाहिए तभी फ़र्श बैठता है। इसलिए एक चटाई का क्षेत्रफल छोटी भुजा के वर्ग का दोगुना है, और यह हर मानक पर लागू है — बस छोटी भुजा बदलती है: क्योमा 955 मिमी, चूक्योमा 910, दान्चिमा 850।',
    '长边正好是短边的两倍——两块半张要能拼成一整张，房间才铺得起来。所以单张面积就是短边平方的两倍，这一点各规格都一样，只有短边不同：京間 955mm，中京間 910mm，団地間 850mm。',
    '長邊正好是短邊的兩倍——兩塊半張要能拼成一整張，房間才鋪得起來。所以單張面積就是短邊平方的兩倍，這一點各規格都一樣，只有短邊不同：京間 955mm，中京間 910mm，団地間 850mm。',
  ),

  spreadTitle: T('같은 6첩에서 2.27㎡가 벌어집니다', 'Six mats can differ by 2.27 m²', 'Seis tatamis pueden diferir 2,27 m²', 'Seis tatamis podem diferir 2,27 m²', '同じ6畳で2.27㎡開きます', 'Sechs Matten unterscheiden sich um 2,27 m²', 'Six tatamis peuvent varier de 2,27 m²', 'छह चटाइयों में 2.27 m² का अंतर', '同样六叠可差 2.27㎡', '同樣六疊可差 2.27㎡'),

  spreadNote: T(
    '가장 넓은 京間으로 깔면 10.94㎡, 가장 좁은 団地間으로 깔면 8.67㎡입니다. 26%가 벌어지는데, 이 비율은 장수와 상관없이 그대로입니다 — 넓이가 장수에 정비례하므로 비가 약분되기 때문입니다. 京間 6첩만큼을 団地間으로 채우려면 일곱 장으로도 모자라 7.6장이 듭니다.',
    'Six mats in the widest Kyōma make 10.94 m²; in the narrowest Danchima, 8.67 m². That is 26 %, and the ratio does not change with the count — the areas scale together, so it cancels. Filling a Kyōma six-mat room with Danchima mats would take 7.6 of them.',
    'Seis tatamis en el amplio Kyōma dan 10,94 m²; en el estrecho Danchima, 8,67 m². Son un 26 %, y la proporción no cambia con el número: las superficies escalan juntas y se cancela. Llenar una sala Kyōma de seis con tatamis Danchima exigiría 7,6.',
    'Seis tatamis no amplo Kyōma dão 10,94 m²; no estreito Danchima, 8,67 m². São 26 %, e a proporção não muda com a contagem: as áreas escalam juntas e se cancela. Encher uma sala Kyōma de seis com tatamis Danchima exigiria 7,6.',
    '最も広い京間で敷けば10.94㎡、最も狭い団地間で敷けば8.67㎡です。26%開きますが、この比は枚数に関係なく同じです — 面積が枚数に比例するので約分されるからです。京間6畳の分を団地間で埋めるには七枚でも足りず7.6枚要ります。',
    'Sechs Matten ergeben im weiten Kyōma 10,94 m², im engen Danchima 8,67 m². Das sind 26 %, und das Verhältnis bleibt unabhängig von der Mattenzahl — die Flächen wachsen gleich, es kürzt sich weg. Ein Kyōma-Sechsmattenraum bräuchte 7,6 Danchima-Matten.',
    'Six tatamis en Kyōma, le plus large, font 10,94 m² ; en Danchima, le plus étroit, 8,67 m². Soit 26 %, et le rapport ne dépend pas du nombre : les surfaces croissent de concert et il se simplifie. Remplir une pièce Kyōma de six tatamis en Danchima en demanderait 7,6.',
    'सबसे चौड़े क्योमा में छह चटाइयाँ 10.94 m² बनाती हैं, सबसे सँकरे दान्चिमा में 8.67 m²। यह 26% है, और यह अनुपात गिनती से नहीं बदलता — क्षेत्रफल साथ बढ़ते हैं तो कट जाता है। क्योमा के छह-चटाई कमरे को दान्चिमा से भरने में 7.6 चटाइयाँ लगेंगी।',
    '铺最宽的京間是 10.94㎡，铺最窄的団地間是 8.67㎡，相差 26%。这个比例与张数无关——面积随张数同比增长，比值就约掉了。要用団地間填满京間六叠的地方，七张还不够，得 7.6 张。',
    '鋪最寬的京間是 10.94㎡，鋪最窄的団地間是 8.67㎡，相差 26%。這個比例與張數無關——面積隨張數同比增長，比值就約掉了。要用団地間填滿京間六疊的地方，七張還不夠，得 7.6 張。',
  ),

  originTitle: T('坪은 원래 다다미 두 장입니다', 'A tsubo is two mats', 'Un tsubo son dos tatamis', 'Um tsubo são dois tatamis', '坪はもともと畳二枚です', 'Ein Tsubo sind zwei Matten', 'Un tsubo, c’est deux tatamis', 'एक त्सुबो यानी दो चटाइयाँ', '坪本来就是两张榻榻米', '坪本來就是兩張榻榻米'),

  originNote: T(
    '1평(坪)은 400/121제곱미터, 곧 3.3058㎡입니다. 中京間 두 장이 3.312㎡라 0.2% 안으로 맞아떨어집니다 — 이 단위가 다다미에서 나왔다는 자취입니다. 그래서 6첩은 대략 3평, 8첩은 4평이라고 어림하는 것이고, 어느 규격으로 깔았느냐에 따라 그 어림이 조금씩 어긋납니다.',
    'One tsubo is 400/121 square metres, or 3.3058 m². Two Chūkyōma mats come to 3.312 m² — within 0.2 %, which is the trace of the unit’s origin in tatami. That is why six mats are loosely called three tsubo and eight mats four; how far the shorthand drifts depends on which standard was laid.',
    'Un tsubo son 400/121 metros cuadrados, es decir 3,3058 m². Dos tatamis Chūkyōma suman 3,312 m², dentro de un 0,2 %: el rastro del origen de la unidad. De ahí que seis tatamis se llamen tres tsubo y ocho, cuatro; cuánto se desvía la regla depende del estándar usado.',
    'Um tsubo são 400/121 metros quadrados, ou 3,3058 m². Dois tatamis Chūkyōma dão 3,312 m², dentro de 0,2 % — o rastro da origem da unidade. Por isso seis tatamis são ditos três tsubo e oito, quatro; o desvio depende do padrão usado.',
    '1坪は400/121平方メートル、つまり3.3058㎡です。中京間二枚が3.312㎡で0.2%以内に収まります — この単位が畳から出た名残です。だから6畳をおよそ3坪、8畳を4坪と見積もるわけで、どの規格で敷いたかによってその見積もりが少しずつずれます。',
    'Ein Tsubo sind 400/121 Quadratmeter, also 3,3058 m². Zwei Chūkyōma-Matten ergeben 3,312 m² — auf 0,2 % genau, die Spur des Ursprungs im Tatami. Darum gelten sechs Matten grob als drei Tsubo und acht als vier; wie weit die Faustregel abweicht, hängt von der verlegten Norm ab.',
    'Un tsubo vaut 400/121 mètres carrés, soit 3,3058 m². Deux tatamis Chūkyōma font 3,312 m², à 0,2 % près — la trace de l’origine de l’unité. D’où l’habitude de compter six tatamis pour trois tsubo et huit pour quatre ; l’écart dépend de la norme posée.',
    'एक त्सुबो 400/121 वर्ग मीटर यानी 3.3058 m² है। दो चूक्योमा चटाइयाँ 3.312 m² बनाती हैं — 0.2% के भीतर, जो इस इकाई के तातामी-मूल का निशान है। इसीलिए छह चटाइयों को मोटे तौर पर तीन त्सुबो और आठ को चार कहा जाता है; यह अनुमान कितना खिसकेगा, यह बिछाए गए मानक पर निर्भर है।',
    '1 坪是 400/121 平方米，即 3.3058㎡。中京間两张合 3.312㎡，误差在 0.2% 以内——这就是这个单位源自榻榻米的痕迹。所以六叠约莫算三坪、八叠算四坪，而这个约数偏多少，取决于铺的是哪种规格。',
    '1 坪是 400/121 平方公尺，即 3.3058㎡。中京間兩張合 3.312㎡，誤差在 0.2% 以內——這就是這個單位源自榻榻米的痕跡。所以六疊約莫算三坪、八疊算四坪，而這個約數偏多少，取決於鋪的是哪種規格。',
  ),

  rentTitle: T('집을 구할 때 첩수만 보면 안 됩니다', 'When renting, the mat count is not enough', 'Al alquilar, el número de tatamis no basta', 'Ao alugar, o número de tatamis não basta', '部屋探しでは畳数だけ見てはいけません', 'Bei der Wohnungssuche zählt nicht nur die Mattenzahl', 'Pour louer, le nombre de tatamis ne suffit pas', 'किराए पर लेते समय चटाई गिनती काफ़ी नहीं', '租房时不能只看叠数', '租房時不能只看疊數'),

  rentNote: T(
    '같은 "6첩"으로 올라온 두 방이 2㎡ 넘게 다를 수 있습니다. 특히 団地間은 아파트에 맞춰 좁게 잡은 규격이라 도쿄권의 江戸間보다도 작습니다. 일본 부동산 광고는 대개 제곱미터를 함께 적으므로, 첩수 옆의 ㎡를 보는 편이 확실합니다.',
    'Two listings that both say “six mats” can differ by more than two square metres. Danchima in particular was cut down to fit apartment blocks and is smaller even than Tokyo’s Edoma. Japanese listings usually print the square metres too — that is the number to read.',
    'Dos anuncios que digan «seis tatamis» pueden diferir en más de dos metros cuadrados. El Danchima, en particular, se recortó para los bloques de pisos y es aún menor que el Edoma de Tokio. Los anuncios japoneses suelen incluir los metros cuadrados: ese es el dato fiable.',
    'Dois anúncios que digam «seis tatamis» podem diferir em mais de dois metros quadrados. O Danchima, em particular, foi encolhido para os blocos de apartamentos e é menor até que o Edoma de Tóquio. Anúncios japoneses costumam trazer os metros quadrados — é esse o número a ler.',
    '同じ「6畳」で出ている二つの部屋が2㎡以上違うことがあります。とくに団地間は集合住宅に合わせて狭く取った規格で、東京圏の江戸間よりも小さいです。日本の物件広告はたいてい平米も併記するので、畳数の隣の㎡を見るほうが確かです。',
    'Zwei Inserate mit „sechs Matten“ können sich um mehr als zwei Quadratmeter unterscheiden. Besonders Danchima wurde für Wohnblocks verkleinert und ist sogar kleiner als das Tokioter Edoma. Japanische Inserate nennen meist auch die Quadratmeter — auf die kommt es an.',
    'Deux annonces affichant « six tatamis » peuvent différer de plus de deux mètres carrés. Le Danchima en particulier a été rétréci pour les immeubles et se révèle plus petit encore que l’Edoma de Tokyo. Les annonces japonaises indiquent en général les mètres carrés : c’est ce chiffre qu’il faut lire.',
    '«छह चटाई» लिखे दो विज्ञापन दो वर्ग मीटर से अधिक भिन्न हो सकते हैं। ख़ासकर दान्चिमा को अपार्टमेंट ब्लॉकों के लिए छोटा किया गया और वह टोक्यो के एदोमा से भी छोटा है। जापानी विज्ञापन आमतौर पर वर्ग मीटर भी छापते हैं — वही संख्या देखें।',
    '两则同样写"六叠"的房源，实际可能差两平米以上。尤其団地間是为集合住宅缩小的规格，比东京一带的江戸間还小。日本房源广告通常会并列标出平方米——看叠数旁边的㎡更靠谱。',
    '兩則同樣寫「六疊」的房源，實際可能差兩平方公尺以上。尤其団地間是為集合住宅縮小的規格，比東京一帶的江戸間還小。日本房源廣告通常會並列標出平方公尺——看疊數旁邊的㎡更靠譜。',
  ),

  careTitle: T('실제 방은 이보다 조금 다릅니다', 'A real room differs a little', 'Una habitación real difiere un poco', 'Um quarto real difere um pouco', '実際の部屋は少し違います', 'Ein echtes Zimmer weicht etwas ab', 'Une pièce réelle diffère un peu', 'असली कमरा थोड़ा भिन्न होता है', '实际房间会略有出入', '實際房間會略有出入'),

  careNote: T(
    '여기 넓이는 다다미가 덮는 바닥만 센 값입니다. 기둥이 서 있는 자리, 벽장(押入れ), 문턱은 빼거나 더해야 합니다. 또 요즘 집은 마루 위에 다다미를 얹지 않고 첩수만 관습으로 쓰는 곳도 많아, 광고의 첩수가 실제로 깔린 장수가 아닐 수 있습니다.',
    'These figures count only the floor the mats cover. Pillars, the built-in closet (oshiire) and thresholds have to be added or taken off. Many modern rooms also keep the mat count as a convention without laying mats at all, so a listing’s number may not describe anything physically on the floor.',
    'Estas cifras cuentan solo el suelo que cubren los tatamis. Pilares, el armario empotrado (oshiire) y los umbrales hay que sumarlos o restarlos. Además, muchas viviendas modernas conservan el recuento como convención sin poner tatamis, así que el número del anuncio puede no describir nada real.',
    'Estes números contam só o piso coberto pelos tatamis. Pilares, o armário embutido (oshiire) e soleiras precisam ser somados ou subtraídos. Muitas casas modernas mantêm a contagem por convenção sem colocar tatamis, então o número do anúncio pode não descrever nada físico.',
    'ここの広さは畳が覆う床だけを数えた値です。柱の立つ所、押入れ、敷居は引くか足す必要があります。また今の住宅は畳を敷かずに畳数だけ慣習で使う所も多く、広告の畳数が実際に敷かれた枚数とは限りません。',
    'Diese Werte zählen nur den von Matten bedeckten Boden. Pfosten, der Einbauschrank (Oshiire) und Schwellen müssen abgezogen oder addiert werden. Viele moderne Räume behalten die Mattenzahl zudem als Konvention, ohne Matten zu verlegen — die Zahl im Inserat beschreibt dann nichts Gelegtes.',
    'Ces surfaces ne comptent que le sol couvert par les tatamis. Les poteaux, le placard encastré (oshiire) et les seuils sont à ajouter ou retrancher. Beaucoup de logements modernes gardent d’ailleurs le décompte par convention sans poser de tatamis : le chiffre de l’annonce ne décrit alors rien de posé.',
    'ये आँकड़े केवल उस फ़र्श को गिनते हैं जिसे चटाइयाँ ढकती हैं। खंभे, बिल्ट-इन अलमारी (ओशीइरे) और दहलीज़ जोड़नी या घटानी पड़ती हैं। कई आधुनिक कमरे बिना चटाई बिछाए भी परंपरा से गिनती रखते हैं, तो विज्ञापन की संख्या ज़मीन पर कुछ बताती ही न हो।',
    '这里的面积只算榻榻米覆盖的地面。柱子占位、壁橱（押入れ）、门槛都要另加或另减。而且如今很多房子并不真铺榻榻米，只是沿用叠数的说法，所以广告上的叠数未必对应地上真有几张。',
    '這裡的面積只算榻榻米覆蓋的地面。柱子占位、壁櫥（押入れ）、門檻都要另加或另減。而且如今很多房子並不真鋪榻榻米，只是沿用疊數的說法，所以廣告上的疊數未必對應地上真有幾張。',
  ),

  tableTitle: T('규격과 장수로 찾기', 'Find it by standard and mat count', 'Búscalo por estándar y número', 'Ache por padrão e contagem', '規格と枚数から探す', 'Nach Norm und Mattenzahl suchen', 'Chercher par norme et nombre', 'मानक और गिनती से देखें', '按规格和张数查找', '按規格和張數查找'),
  neighbourTitle: T('가까운 장수', 'Nearby mat counts', 'Recuentos cercanos', 'Contagens próximas', '近い枚数', 'Mattenzahlen daneben', 'Nombres voisins', 'पास की गिनतियाँ', '相邻张数', '相鄰張數'),
  kindRowTitle: T('같은 규격, 다른 장수', 'Same standard, other counts', 'Mismo estándar, otros recuentos', 'Mesmo padrão, outras contagens', '同じ規格、別の枚数', 'Gleiche Norm, andere Zahlen', 'Même norme, autres nombres', 'वही मानक, दूसरी गिनतियाँ', '同一规格，不同张数', '同一規格，不同張數'),
  matsRowTitle: T('같은 장수, 다른 규격', 'Same count, other standards', 'Mismo recuento, otros estándares', 'Mesma contagem, outros padrões', '同じ枚数、別の規格', 'Gleiche Zahl, andere Normen', 'Même nombre, autres normes', 'वही गिनती, दूसरे मानक', '同一张数，不同规格', '同一張數，不同規格'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '한 장의 넓이 = 짧은 변 × 긴 변. 다섯 규격 모두 긴 변이 짧은 변의 두 배입니다.',
      '방 넓이 = 한 장의 넓이 × 장수.',
      '같은 장수라도 규격이 다르면 26%까지 벌어집니다.',
      '1평은 3.3058㎡이고, 中京間 두 장이 거의 그 값입니다.',
    ],
    [
      'Mat area = short side × long side. In all five standards the long side is double the short.',
      'Floor area = mat area × number of mats.',
      'At the same count, standards differ by as much as 26 %.',
      'One tsubo is 3.3058 m², which two Chūkyōma mats very nearly make.',
    ],
    [
      'Superficie del tatami = lado corto × lado largo. En los cinco, el largo es el doble del corto.',
      'Superficie = superficie del tatami × número de tatamis.',
      'Con el mismo número, los estándares difieren hasta un 26 %.',
      'Un tsubo son 3,3058 m², casi exactamente dos tatamis Chūkyōma.',
    ],
    [
      'Área do tatami = lado curto × lado longo. Nos cinco, o longo é o dobro do curto.',
      'Área = área do tatami × número de tatamis.',
      'Com a mesma contagem, os padrões diferem até 26 %.',
      'Um tsubo são 3,3058 m², quase exatamente dois tatamis Chūkyōma.',
    ],
    [
      '一枚の面積 = 短い辺 × 長い辺。五つの規格すべて長い辺が短い辺の二倍です。',
      '部屋の広さ = 一枚の面積 × 枚数。',
      '同じ枚数でも規格が違えば26%まで開きます。',
      '1坪は3.3058㎡で、中京間二枚がほぼその値です。',
    ],
    [
      'Mattenfläche = kurze Seite × lange Seite. In allen fünf Normen ist die lange doppelt so lang.',
      'Bodenfläche = Mattenfläche × Mattenzahl.',
      'Bei gleicher Zahl unterscheiden sich die Normen um bis zu 26 %.',
      'Ein Tsubo sind 3,3058 m² — fast genau zwei Chūkyōma-Matten.',
    ],
    [
      'Surface du tatami = petit côté × grand côté. Dans les cinq normes, le grand vaut le double.',
      'Surface = surface du tatami × nombre de tatamis.',
      'À nombre égal, les normes s’écartent jusqu’à 26 %.',
      'Un tsubo vaut 3,3058 m², soit presque exactement deux tatamis Chūkyōma.',
    ],
    [
      'चटाई क्षेत्रफल = छोटी भुजा × लंबी भुजा। पाँचों मानकों में लंबी भुजा दोगुनी है।',
      'फ़र्श क्षेत्रफल = चटाई क्षेत्रफल × चटाइयों की संख्या।',
      'समान गिनती पर भी मानक 26% तक भिन्न होते हैं।',
      'एक त्सुबो 3.3058 m² है, जो लगभग ठीक दो चूक्योमा चटाइयाँ हैं।',
    ],
    [
      '单张面积 = 短边 × 长边。五种规格的长边都是短边的两倍。',
      '房间面积 = 单张面积 × 张数。',
      '张数相同，规格不同，面积最多差 26%。',
      '1 坪是 3.3058㎡，正好接近中京間两张。',
    ],
    [
      '單張面積 = 短邊 × 長邊。五種規格的長邊都是短邊的兩倍。',
      '房間面積 = 單張面積 × 張數。',
      '張數相同，規格不同，面積最多差 26%。',
      '1 坪是 3.3058㎡，正好接近中京間兩張。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '다다미 6첩은 몇 ㎡인가 — 지역 규격 다섯을 나란히',
    'How many square metres is six tatami? Five regional standards side by side',
    '¿Cuántos metros cuadrados son seis tatamis? Cinco estándares comparados',
    'Quantos metros quadrados são seis tatamis? Cinco padrões lado a lado',
    '6畳は何平米か — 地域規格五つを並べて',
    'Wie viele Quadratmeter sind sechs Tatami? Fünf Normen im Vergleich',
    'Combien font six tatamis en m² ? Cinq normes régionales comparées',
    'छह तातामी कितने वर्ग मीटर? पाँच क्षेत्रीय मानक साथ-साथ',
    '六叠是多少平方米 — 五种地区规格并排对照',
    '六疊是多少平方公尺 — 五種地區規格並排對照',
  ),

  hubMetaDesc: T(
    '京間으로 깔면 10.94㎡, 団地間으로 깔면 8.67㎡입니다. 다다미 한 장의 크기가 지역마다 달라 "6첩"만으로는 넓이가 정해지지 않습니다. 규격 5가지 × 장수 20가지 100칸의 제곱미터·평·제곱피트.',
    'Six mats make 10.94 m² in Kyōma and 8.67 m² in Danchima. Mat size varies by region, so “six mats” does not fix an area. Square metres, pyeong and square feet for 5 standards × 20 mat counts.',
    'Seis tatamis dan 10,94 m² en Kyōma y 8,67 m² en Danchima. El tamaño varía por región, así que «seis tatamis» no fija una superficie. Metros cuadrados, pyeong y pies cuadrados para 5 estándares × 20 recuentos.',
    'Seis tatamis dão 10,94 m² no Kyōma e 8,67 m² no Danchima. O tamanho varia por região, então «seis tatamis» não fixa uma área. Metros quadrados, pyeong e pés quadrados para 5 padrões × 20 contagens.',
    '京間で敷けば10.94㎡、団地間なら8.67㎡です。畳一枚の大きさが地域で違うので「6畳」だけでは広さが決まりません。規格5つ×枚数20通りの100マスの平米・坪・平方フィート。',
    'Sechs Matten ergeben in Kyōma 10,94 m², in Danchima 8,67 m². Die Mattengröße hängt von der Region ab — „sechs Matten“ legt keine Fläche fest. Quadratmeter, Pyeong und Quadratfuß für 5 Normen × 20 Mattenzahlen.',
    'Six tatamis font 10,94 m² en Kyōma et 8,67 m² en Danchima. La taille varie selon la région : « six tatamis » ne fixe pas une surface. Mètres carrés, pyeong et pieds carrés pour 5 normes × 20 nombres.',
    'छह चटाइयाँ क्योमा में 10.94 m² और दान्चिमा में 8.67 m² बनाती हैं। आकार क्षेत्र से बदलता है, इसलिए «छह चटाई» क्षेत्रफल तय नहीं करता। 5 मानक × 20 गिनतियों के वर्ग मीटर, प्योंग और वर्ग फ़ुट।',
    '铺京間是 10.94㎡，铺団地間是 8.67㎡。榻榻米单张尺寸因地区而异，只说"六叠"定不下面积。5 种规格 × 20 种张数的平方米、坪与平方英尺。',
    '鋪京間是 10.94㎡，鋪団地間是 8.67㎡。榻榻米單張尺寸因地區而異，只說「六疊」定不下面積。5 種規格 × 20 種張數的平方公尺、坪與平方英尺。',
  ),

  desc: T<(f: TatamiFacts) => string>(
    f => `한 장이 ${f.short} × ${f.long}mm이므로 ${f.cell.mats}첩은 ${f.sqm}㎡입니다. ${f.pyeong}평, ${f.sqft}제곱피트에 해당합니다.`,
    f => `Each mat is ${f.short} × ${f.long} mm, so ${f.cell.mats} of them make ${f.sqm} m² — ${f.pyeong} pyeong or ${f.sqft} square feet.`,
    f => `Cada tatami mide ${f.short} × ${f.long} mm, así que ${f.cell.mats} suman ${f.sqm} m²: ${f.pyeong} pyeong o ${f.sqft} pies cuadrados.`,
    f => `Cada tatami mede ${f.short} × ${f.long} mm, então ${f.cell.mats} somam ${f.sqm} m²: ${f.pyeong} pyeong ou ${f.sqft} pés quadrados.`,
    f => `一枚が${f.short} × ${f.long}mmなので${f.cell.mats}畳は${f.sqm}㎡です。${f.pyeong}坪、${f.sqft}平方フィートに当たります。`,
    f => `Eine Matte misst ${f.short} × ${f.long} mm, ${f.cell.mats} davon ergeben ${f.sqm} m² — ${f.pyeong} Pyeong oder ${f.sqft} Quadratfuß.`,
    f => `Chaque tatami fait ${f.short} × ${f.long} mm ; ${f.cell.mats} en font ${f.sqm} m², soit ${f.pyeong} pyeong ou ${f.sqft} pieds carrés.`,
    f => `हर चटाई ${f.short} × ${f.long} मिमी है, तो ${f.cell.mats} चटाइयाँ ${f.sqm} m² बनाती हैं — ${f.pyeong} प्योंग या ${f.sqft} वर्ग फ़ुट।`,
    f => `单张为 ${f.short} × ${f.long}mm，所以 ${f.cell.mats} 叠是 ${f.sqm}㎡，合 ${f.pyeong} 坪、${f.sqft} 平方英尺。`,
    f => `單張為 ${f.short} × ${f.long}mm，所以 ${f.cell.mats} 疊是 ${f.sqm}㎡，合 ${f.pyeong} 坪、${f.sqft} 平方英尺。`,
  ),

  metaTitle: T<(f: TatamiFacts) => string>(
    f => `${kKo[f.cell.kind]} ${f.cell.mats}첩 — ${f.sqm}㎡`,
    f => `${f.cell.mats} mats in ${kEn[f.cell.kind]} — ${f.sqm} m²`,
    f => `${f.cell.mats} tatamis en ${kEn[f.cell.kind]} — ${f.sqm} m²`,
    f => `${f.cell.mats} tatamis em ${kEn[f.cell.kind]} — ${f.sqm} m²`,
    f => `${kJa[f.cell.kind]}${f.cell.mats}畳 — ${f.sqm}㎡`,
    f => `${f.cell.mats} Matten in ${kEn[f.cell.kind]} — ${f.sqm} m²`,
    f => `${f.cell.mats} tatamis en ${kEn[f.cell.kind]} — ${f.sqm} m²`,
    f => `${kHi[f.cell.kind]} में ${f.cell.mats} चटाइयाँ — ${f.sqm} m²`,
    f => `${kZh[f.cell.kind]} ${f.cell.mats} 叠 — ${f.sqm}㎡`,
    f => `${kTw[f.cell.kind]} ${f.cell.mats} 疊 — ${f.sqm}㎡`,
  ),

  metaDesc: T<(f: TatamiFacts) => string>(
    f => `${kKo[f.cell.kind]} 규격은 한 장이 ${f.short} × ${f.long}mm이라 ${f.cell.mats}첩이 ${f.sqm}㎡(${f.pyeong}평)입니다. 같은 ${f.cell.mats}첩이라도 규격에 따라 ${f.spread}㎡까지 벌어집니다.`,
    f => `In ${kEn[f.cell.kind]} a mat is ${f.short} × ${f.long} mm, so ${f.cell.mats} mats come to ${f.sqm} m² (${f.pyeong} pyeong). The same ${f.cell.mats} mats vary by up to ${f.spread} m² across standards.`,
    f => `En ${kEn[f.cell.kind]} un tatami mide ${f.short} × ${f.long} mm, así que ${f.cell.mats} dan ${f.sqm} m² (${f.pyeong} pyeong). Los mismos ${f.cell.mats} varían hasta ${f.spread} m² según el estándar.`,
    f => `Em ${kEn[f.cell.kind]} um tatami mede ${f.short} × ${f.long} mm, então ${f.cell.mats} dão ${f.sqm} m² (${f.pyeong} pyeong). Os mesmos ${f.cell.mats} variam até ${f.spread} m² conforme o padrão.`,
    f => `${kJa[f.cell.kind]}は一枚が${f.short} × ${f.long}mmなので${f.cell.mats}畳で${f.sqm}㎡(${f.pyeong}坪)です。同じ${f.cell.mats}畳でも規格によって${f.spread}㎡まで開きます。`,
    f => `Bei ${kEn[f.cell.kind]} misst eine Matte ${f.short} × ${f.long} mm, ${f.cell.mats} Matten ergeben also ${f.sqm} m² (${f.pyeong} Pyeong). Dieselben ${f.cell.mats} Matten schwanken je nach Norm um bis zu ${f.spread} m².`,
    f => `En ${kEn[f.cell.kind]}, un tatami fait ${f.short} × ${f.long} mm : ${f.cell.mats} tatamis donnent ${f.sqm} m² (${f.pyeong} pyeong). Les mêmes ${f.cell.mats} varient jusqu’à ${f.spread} m² selon la norme.`,
    f => `${kHi[f.cell.kind]} में एक चटाई ${f.short} × ${f.long} मिमी है, तो ${f.cell.mats} चटाइयाँ ${f.sqm} m² (${f.pyeong} प्योंग) बनाती हैं। वही ${f.cell.mats} चटाइयाँ मानक के अनुसार ${f.spread} m² तक बदलती हैं।`,
    f => `${kZh[f.cell.kind]}单张为 ${f.short} × ${f.long}mm，所以 ${f.cell.mats} 叠是 ${f.sqm}㎡（${f.pyeong} 坪）。同样 ${f.cell.mats} 叠，不同规格最多差 ${f.spread}㎡。`,
    f => `${kTw[f.cell.kind]}單張為 ${f.short} × ${f.long}mm，所以 ${f.cell.mats} 疊是 ${f.sqm}㎡（${f.pyeong} 坪）。同樣 ${f.cell.mats} 疊，不同規格最多差 ${f.spread}㎡。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '6첩은 몇 제곱미터인가요?', a: '규격에 달렸습니다. 京間이면 10.94㎡, 中京間 9.94㎡, 江戸間 9.29㎡, 団地間 8.67㎡입니다.' },
      { q: '왜 규격이 여러 가지인가요?', a: '지역마다 집 짓는 치수가 달라 굳어진 것이고, JIS도 여러 규격을 나란히 인정합니다. 団地間은 아파트에 맞춰 나중에 좁게 잡은 것입니다.' },
      { q: '1첩은 몇 평인가요?', a: '규격마다 다릅니다. 中京間 한 장이 0.5평 남짓이라 두 장이 대략 1평입니다.' },
      { q: '다다미는 왜 2:1인가요?', a: '반 장 둘이 한 장이 되어야 방을 여러 모양으로 짤 수 있기 때문입니다. 다섯 규격 모두 정확히 2:1입니다.' },
      { q: '집을 구할 때 무엇을 봐야 하나요?', a: '첩수보다 제곱미터를 보십시오. 같은 6첩이라도 2㎡ 넘게 다를 수 있습니다.' },
    ],
    [
      { q: 'How many square metres is a six-mat room?', a: 'It depends on the standard: 10.94 m² in Kyōma, 9.94 in Chūkyōma, 9.29 in Edoma, 8.67 in Danchima.' },
      { q: 'Why are there several standards?', a: 'Building dimensions settled differently by region, and JIS lists them side by side. Danchima was cut later to fit apartment blocks.' },
      { q: 'How much is one mat in tsubo?', a: 'It varies. A Chūkyōma mat is a little over half a tsubo, so two make roughly one.' },
      { q: 'Why is a tatami 2:1?', a: 'So that two half mats make a whole one and rooms can be tiled in several patterns. All five standards hold the ratio exactly.' },
      { q: 'What should I check when renting?', a: 'Read the square metres rather than the mat count — two “six-mat” rooms can differ by more than 2 m².' },
    ],
    [
      { q: '¿Cuántos metros cuadrados son seis tatamis?', a: 'Depende del estándar: 10,94 m² en Kyōma, 9,94 en Chūkyōma, 9,29 en Edoma y 8,67 en Danchima.' },
      { q: '¿Por qué hay varios estándares?', a: 'Las medidas de construcción cuajaron distinto según la región y la JIS los reconoce a la vez. El Danchima se recortó después para los bloques de pisos.' },
      { q: '¿Cuánto es un tatami en tsubo?', a: 'Varía. Un tatami Chūkyōma pasa apenas de medio tsubo, así que dos hacen aproximadamente uno.' },
      { q: '¿Por qué el tatami es 2:1?', a: 'Para que dos medios formen uno entero y la sala pueda embaldosarse de varias formas. Los cinco estándares mantienen la proporción exacta.' },
      { q: '¿Qué mirar al alquilar?', a: 'Los metros cuadrados antes que el número de tatamis: dos salas de «seis» pueden diferir en más de 2 m².' },
    ],
    [
      { q: 'Quantos metros quadrados são seis tatamis?', a: 'Depende do padrão: 10,94 m² no Kyōma, 9,94 no Chūkyōma, 9,29 no Edoma e 8,67 no Danchima.' },
      { q: 'Por que há vários padrões?', a: 'As medidas de construção firmaram-se de modo diferente por região, e a JIS os reconhece juntos. O Danchima foi encolhido depois para blocos de apartamentos.' },
      { q: 'Quanto é um tatami em tsubo?', a: 'Varia. Um tatami Chūkyōma passa pouco de meio tsubo, então dois fazem cerca de um.' },
      { q: 'Por que o tatami é 2:1?', a: 'Para que dois meios formem um inteiro e a sala possa ser ladrilhada de várias formas. Os cinco padrões mantêm a proporção exata.' },
      { q: 'O que verificar ao alugar?', a: 'Os metros quadrados, não a contagem: duas salas de «seis» podem diferir em mais de 2 m².' },
    ],
    [
      { q: '6畳は何平米ですか？', a: '規格によります。京間なら10.94㎡、中京間9.94㎡、江戸間9.29㎡、団地間8.67㎡です。' },
      { q: 'なぜ規格がいくつもあるのですか？', a: '地域ごとに家を建てる寸法が違って定着したもので、JISも複数を並べて認めています。団地間は集合住宅に合わせて後から狭く取ったものです。' },
      { q: '1畳は何坪ですか？', a: '規格ごとに違います。中京間一枚が0.5坪あまりなので、二枚でおよそ1坪です。' },
      { q: '畳はなぜ2:1なのですか？', a: '半畳二枚で一畳になってこそ部屋をいろいろな形に組めるからです。五つの規格すべて正確に2:1です。' },
      { q: '部屋探しでは何を見ますか？', a: '畳数より平米を見てください。同じ6畳でも2㎡以上違うことがあります。' },
    ],
    [
      { q: 'Wie viele Quadratmeter hat ein Sechsmattenzimmer?', a: 'Je nach Norm: 10,94 m² in Kyōma, 9,94 in Chūkyōma, 9,29 in Edoma, 8,67 in Danchima.' },
      { q: 'Warum gibt es mehrere Normen?', a: 'Baumaße setzten sich regional unterschiedlich durch, und die JIS führt sie nebeneinander. Danchima wurde später für Wohnblocks verkleinert.' },
      { q: 'Wie viel Tsubo ist eine Matte?', a: 'Das schwankt. Eine Chūkyōma-Matte liegt knapp über einem halben Tsubo, zwei ergeben also etwa eines.' },
      { q: 'Warum ist eine Tatami 2:1?', a: 'Damit zwei halbe eine ganze ergeben und Räume in mehreren Mustern ausgelegt werden können. Alle fünf Normen halten das Verhältnis exakt.' },
      { q: 'Worauf beim Mieten achten?', a: 'Auf die Quadratmeter statt auf die Mattenzahl — zwei „Sechsmattenzimmer“ können über 2 m² auseinanderliegen.' },
    ],
    [
      { q: 'Combien font six tatamis en mètres carrés ?', a: 'Cela dépend de la norme : 10,94 m² en Kyōma, 9,94 en Chūkyōma, 9,29 en Edoma, 8,67 en Danchima.' },
      { q: 'Pourquoi plusieurs normes ?', a: 'Les cotes de construction se sont fixées différemment selon les régions, et la JIS les reconnaît ensemble. Le Danchima a été rétréci plus tard pour les immeubles.' },
      { q: 'Combien vaut un tatami en tsubo ?', a: 'Cela varie. Un tatami Chūkyōma dépasse à peine le demi-tsubo : deux en font environ un.' },
      { q: 'Pourquoi le rapport 2:1 ?', a: 'Pour que deux demi-tatamis en fassent un entier et que la pièce se pave de plusieurs façons. Les cinq normes tiennent le rapport exactement.' },
      { q: 'Que regarder pour louer ?', a: 'Les mètres carrés plutôt que le nombre de tatamis : deux pièces « de six » peuvent différer de plus de 2 m².' },
    ],
    [
      { q: 'छह चटाई का कमरा कितने वर्ग मीटर है?', a: 'मानक पर निर्भर: क्योमा में 10.94 m², चूक्योमा 9.94, एदोमा 9.29, दान्चिमा 8.67।' },
      { q: 'कई मानक क्यों हैं?', a: 'क्षेत्र के अनुसार निर्माण माप अलग-अलग जमे, और JIS उन्हें साथ मान्यता देता है। दान्चिमा को बाद में अपार्टमेंट ब्लॉकों के लिए छोटा किया गया।' },
      { q: 'एक चटाई कितने त्सुबो है?', a: 'यह बदलता है। चूक्योमा की एक चटाई आधे त्सुबो से थोड़ी ऊपर है, तो दो मिलकर लगभग एक।' },
      { q: 'तातामी 2:1 क्यों है?', a: 'ताकि दो आधी मिलकर एक पूरी बनें और कमरा कई तरह से बिछाया जा सके। पाँचों मानक यह अनुपात ठीक रखते हैं।' },
      { q: 'किराए पर लेते समय क्या देखें?', a: 'चटाई गिनती से पहले वर्ग मीटर देखें — दो «छह-चटाई» कमरे 2 m² से ज़्यादा भिन्न हो सकते हैं।' },
    ],
    [
      { q: '六叠是多少平方米？', a: '看规格：京間 10.94㎡，中京間 9.94㎡，江戸間 9.29㎡，団地間 8.67㎡。' },
      { q: '为什么有好几种规格？', a: '各地建房尺寸不同而各自定型，JIS 也并列认可。団地間是后来为集合住宅缩小的。' },
      { q: '一叠是多少坪？', a: '各规格不同。中京間一张略多于半坪，两张约合一坪。' },
      { q: '榻榻米为什么是 2:1？', a: '因为两块半张要能拼成一整张，房间才能有多种铺法。五种规格都严格保持这个比例。' },
      { q: '租房时该看什么？', a: '看平方米而不是叠数——同样"六叠"，实际可能差两平米以上。' },
    ],
    [
      { q: '六疊是多少平方公尺？', a: '看規格：京間 10.94㎡，中京間 9.94㎡，江戸間 9.29㎡，団地間 8.67㎡。' },
      { q: '為什麼有好幾種規格？', a: '各地建房尺寸不同而各自定型，JIS 也並列認可。団地間是後來為集合住宅縮小的。' },
      { q: '一疊是多少坪？', a: '各規格不同。中京間一張略多於半坪，兩張約合一坪。' },
      { q: '榻榻米為什麼是 2:1？', a: '因為兩塊半張要能拼成一整張，房間才能有多種鋪法。五種規格都嚴格保持這個比例。' },
      { q: '租房時該看什麼？', a: '看平方公尺而不是疊數——同樣「六疊」，實際可能差兩平方公尺以上。' },
    ],
  ),

  cellFaq: T<(f: TatamiFacts) => FaqItem[]>(
    f => [
      { q: `${kKo[f.cell.kind]} ${f.cell.mats}첩은 몇 ㎡인가요?`, a: `${f.sqm}㎡입니다. 한 장이 ${f.one}㎡이므로 ${f.cell.mats}을 곱한 값입니다.` },
      { q: `평으로는 얼마인가요?`, a: `${f.pyeong}평입니다. 제곱피트로는 ${f.sqft}입니다.` },
      { q: `다른 규격으로 깔면요?`, a: f.others.map(o => `${kKo[o.key]} ${o.sqm}㎡`).join(' · ') },
      { q: `규격에 따라 얼마나 벌어지나요?`, a: `가장 넓은 쪽과 가장 좁은 쪽이 ${f.spread}㎡, 곧 ${f.spreadPct}% 차이입니다.` },
    ],
    f => [
      { q: `How large is ${f.cell.mats} mats in ${kEn[f.cell.kind]}?`, a: `${f.sqm} m². One mat is ${f.one} m², times ${f.cell.mats}.` },
      { q: `What is that in pyeong?`, a: `${f.pyeong} pyeong, or ${f.sqft} square feet.` },
      { q: `And in the other standards?`, a: f.others.map(o => `${kEn[o.key]} ${o.sqm} m²`).join(' · ') },
      { q: `How far apart are the standards?`, a: `The widest and narrowest differ by ${f.spread} m², or ${f.spreadPct} %.` },
    ],
    f => [
      { q: `¿Cuánto mide ${f.cell.mats} tatamis en ${kEn[f.cell.kind]}?`, a: `${f.sqm} m². Un tatami son ${f.one} m², por ${f.cell.mats}.` },
      { q: `¿Cuánto es en pyeong?`, a: `${f.pyeong} pyeong, o ${f.sqft} pies cuadrados.` },
      { q: `¿Y en los demás estándares?`, a: f.others.map(o => `${kEn[o.key]} ${o.sqm} m²`).join(' · ') },
      { q: `¿Cuánto se separan los estándares?`, a: `El más amplio y el más estrecho difieren ${f.spread} m², es decir ${f.spreadPct} %.` },
    ],
    f => [
      { q: `Quanto mede ${f.cell.mats} tatamis em ${kEn[f.cell.kind]}?`, a: `${f.sqm} m². Um tatami é ${f.one} m², vezes ${f.cell.mats}.` },
      { q: `Quanto é em pyeong?`, a: `${f.pyeong} pyeong, ou ${f.sqft} pés quadrados.` },
      { q: `E nos outros padrões?`, a: f.others.map(o => `${kEn[o.key]} ${o.sqm} m²`).join(' · ') },
      { q: `Quanto os padrões se afastam?`, a: `O mais amplo e o mais estreito diferem ${f.spread} m², ou seja ${f.spreadPct} %.` },
    ],
    f => [
      { q: `${kJa[f.cell.kind]}${f.cell.mats}畳は何平米ですか？`, a: `${f.sqm}㎡です。一枚が${f.one}㎡なので${f.cell.mats}を掛けた値です。` },
      { q: `坪ではいくつですか？`, a: `${f.pyeong}坪です。平方フィートでは${f.sqft}です。` },
      { q: `別の規格で敷くと？`, a: f.others.map(o => `${kJa[o.key]} ${o.sqm}㎡`).join(' · ') },
      { q: `規格でどれくらい開きますか？`, a: `最も広い方と狭い方が${f.spread}㎡、つまり${f.spreadPct}%の差です。` },
    ],
    f => [
      { q: `Wie groß sind ${f.cell.mats} Matten in ${kEn[f.cell.kind]}?`, a: `${f.sqm} m². Eine Matte misst ${f.one} m², mal ${f.cell.mats}.` },
      { q: `Wie viel ist das in Pyeong?`, a: `${f.pyeong} Pyeong, oder ${f.sqft} Quadratfuß.` },
      { q: `Und in den anderen Normen?`, a: f.others.map(o => `${kEn[o.key]} ${o.sqm} m²`).join(' · ') },
      { q: `Wie weit liegen die Normen auseinander?`, a: `Die weiteste und die engste unterscheiden sich um ${f.spread} m², also ${f.spreadPct} %.` },
    ],
    f => [
      { q: `Quelle surface font ${f.cell.mats} tatamis en ${kEn[f.cell.kind]} ?`, a: `${f.sqm} m². Un tatami vaut ${f.one} m², multiplié par ${f.cell.mats}.` },
      { q: `Combien en pyeong ?`, a: `${f.pyeong} pyeong, ou ${f.sqft} pieds carrés.` },
      { q: `Et dans les autres normes ?`, a: f.others.map(o => `${kEn[o.key]} ${o.sqm} m²`).join(' · ') },
      { q: `Quel écart entre les normes ?`, a: `La plus large et la plus étroite diffèrent de ${f.spread} m², soit ${f.spreadPct} %.` },
    ],
    f => [
      { q: `${kHi[f.cell.kind]} में ${f.cell.mats} चटाइयाँ कितनी बड़ी हैं?`, a: `${f.sqm} m²। एक चटाई ${f.one} m² है, ${f.cell.mats} से गुणा।` },
      { q: `प्योंग में कितना?`, a: `${f.pyeong} प्योंग, या ${f.sqft} वर्ग फ़ुट।` },
      { q: `दूसरे मानकों में?`, a: f.others.map(o => `${kHi[o.key]} ${o.sqm} m²`).join(' · ') },
      { q: `मानकों में कितना अंतर है?`, a: `सबसे चौड़े और सबसे सँकरे में ${f.spread} m², यानी ${f.spreadPct}% का अंतर।` },
    ],
    f => [
      { q: `${kZh[f.cell.kind]} ${f.cell.mats} 叠是多少平方米？`, a: `${f.sqm}㎡。单张 ${f.one}㎡，乘以 ${f.cell.mats}。` },
      { q: `折成坪是多少？`, a: `${f.pyeong} 坪，合 ${f.sqft} 平方英尺。` },
      { q: `换成其他规格呢？`, a: f.others.map(o => `${kZh[o.key]} ${o.sqm}㎡`).join(' · ') },
      { q: `各规格相差多少？`, a: `最宽与最窄相差 ${f.spread}㎡，即 ${f.spreadPct}%。` },
    ],
    f => [
      { q: `${kTw[f.cell.kind]} ${f.cell.mats} 疊是多少平方公尺？`, a: `${f.sqm}㎡。單張 ${f.one}㎡，乘以 ${f.cell.mats}。` },
      { q: `折成坪是多少？`, a: `${f.pyeong} 坪，合 ${f.sqft} 平方英尺。` },
      { q: `換成其他規格呢？`, a: f.others.map(o => `${kTw[o.key]} ${o.sqm}㎡`).join(' · ') },
      { q: `各規格相差多少？`, a: `最寬與最窄相差 ${f.spread}㎡，即 ${f.spreadPct}%。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const TATAMI_UI: L<TatamiUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<TatamiUI>;
