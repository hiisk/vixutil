/**
 * 이슬점 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "습도 60%라는 말만으로는 눅눅한지 알 수 없다"이다.
 * 30도의 60%와 10도의 60%는 품은 물의 양이 세 배 넘게 차이 나기 때문이다.
 *
 * 이슬점은 그 물의 양을 온도 하나로 말한 값이라, 기온이 오르내려도 잘 변하지
 * 않는다. 여름밤이 왜 그렇게 눅눅한지를 재려면 습도가 아니라 이슬점을 본다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { DewFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface DewUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  comfortName: (key: string) => string;
  dewLabel: string;
  spreadLabel: string;
  tempLabel: string;
  humidLabel: string;
  absoluteLabel: string;
  capacityLabel: string;
  comfortLabel: string;
  fahrenheitLabel: string;
  whyTitle: string;
  whyNote: string;
  comfortTitle: string;
  comfortNote: string;
  fogTitle: string;
  fogNote: string;
  capacityTitle: string;
  capacityNote: string;
  tableTitle: string;
  neighbourTitle: string;
  desc: (f: DewFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: DewFacts) => string;
  metaDesc: (f: DewFacts) => string;
  hubFaq: FaqItem[];
  dewFaq: (f: DewFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 눅눅함 눈금 다섯 — 한 줄로 받는다 */
const comfort = (dry: string, pleasant: string, sticky: string, muggy: string, oppressive: string) =>
  (key: string): string => ({ dry, pleasant, sticky, muggy, oppressive }[key] ?? key);

type Spec = { [K in keyof DewUI]: L<DewUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('이슬점', 'Dew point', 'Punto de rocío', 'Ponto de orvalho', '露点', 'Taupunkt', 'Point de rosée', 'ओसांक', '露点', '露點'),

  comfortName: T<(key: string) => string>(
    comfort('보송함', '쾌적함', '끈적임', '눅눅함', '숨 막힘'),
    comfort('dry', 'pleasant', 'sticky', 'muggy', 'oppressive'),
    comfort('seco', 'agradable', 'pegajoso', 'bochornoso', 'sofocante'),
    comfort('seco', 'agradável', 'pegajoso', 'abafado', 'sufocante'),
    comfort('からっと', '快適', 'べたつく', '蒸す', '息苦しい'),
    comfort('trocken', 'angenehm', 'klebrig', 'schwül', 'drückend'),
    comfort('sec', 'agréable', 'collant', 'lourd', 'étouffant'),
    comfort('शुष्क', 'सुखद', 'चिपचिपा', 'उमस भरा', 'दमघोंटू'),
    comfort('干爽', '舒适', '黏腻', '闷湿', '窒闷'),
    comfort('乾爽', '舒適', '黏膩', '悶濕', '窒悶'),
  ),

  hubTitle: T(
    '이슬점 189칸 — 습도 60%가 늘 같지 않은 이유',
    '189 dew points — why 60% humidity is never the same twice',
    '189 puntos de rocío — por qué el 60% de humedad nunca es igual',
    '189 pontos de orvalho — por que 60% de umidade nunca é igual',
    '露点189マス — 湿度60%が同じでない理由',
    '189 Taupunkte — warum 60 % Luftfeuchte nie dasselbe heißt',
    '189 points de rosée — pourquoi 60 % d’humidité n’est jamais pareil',
    '189 ओसांक — 60% आर्द्रता हर बार एक जैसी क्यों नहीं',
    '189 个露点 — 为什么同样 60% 的湿度感觉不同',
    '189 個露點 — 為什麼同樣 60% 的濕度感覺不同',
  ),

  hubLead: T(
    '기온 21가지와 습도 9가지가 만나는 칸마다 이슬점을 계산했습니다. 30도의 60%는 10도의 60%보다 물을 세 배 넘게 품고 있습니다.',
    'A dew point for every meeting of 21 temperatures and 9 humidities. Air at 30 °C and 60% holds more than three times the water of 10 °C at the same 60%.',
    'Un punto de rocío para cada cruce de 21 temperaturas y 9 humedades. El aire a 30 °C con 60% lleva más del triple de agua que a 10 °C con el mismo 60%.',
    'Um ponto de orvalho para cada cruzamento de 21 temperaturas e 9 umidades. O ar a 30 °C com 60% carrega mais do triplo de água que a 10 °C com os mesmos 60%.',
    '気温21通りと湿度9通りが出会う各マスの露点を計算しました。30度の60%は10度の60%より3倍以上の水を含んでいます。',
    'Für jede Begegnung von 21 Temperaturen und 9 Feuchtewerten ein Taupunkt. Luft bei 30 °C und 60 % trägt über dreimal so viel Wasser wie 10 °C bei denselben 60 %.',
    'Un point de rosée pour chaque croisement de 21 températures et 9 humidités. L’air à 30 °C et 60 % contient plus du triple d’eau qu’à 10 °C au même 60 %.',
    '21 तापमान और 9 आर्द्रताओं के हर मेल का ओसांक। 30 °C पर 60% हवा में 10 °C के उसी 60% से तीन गुना से अधिक पानी होता है।',
    '21 种气温与 9 种湿度交汇的每一格都算出露点。30 度的 60% 所含水汽是 10 度 60% 的三倍多。',
    '21 種氣溫與 9 種濕度交匯的每一格都算出露點。30 度的 60% 所含水汽是 10 度 60% 的三倍多。',
  ),

  dewLabel: T('이슬점', 'Dew point', 'Punto de rocío', 'Ponto de orvalho', '露点', 'Taupunkt', 'Point de rosée', 'ओसांक', '露点', '露點'),
  spreadLabel: T('기온과의 거리', 'Gap from the air', 'Distancia al aire', 'Distância do ar', '気温との差', 'Abstand zur Luft', 'Écart avec l’air', 'वायु से अंतर', '与气温的差', '與氣溫的差'),
  tempLabel: T('기온', 'Air temperature', 'Temperatura del aire', 'Temperatura do ar', '気温', 'Lufttemperatur', 'Température de l’air', 'वायु तापमान', '气温', '氣溫'),
  humidLabel: T('상대습도', 'Relative humidity', 'Humedad relativa', 'Umidade relativa', '相対湿度', 'Relative Luftfeuchte', 'Humidité relative', 'सापेक्ष आर्द्रता', '相对湿度', '相對濕度'),
  absoluteLabel: T('품은 물', 'Water in the air', 'Agua en el aire', 'Água no ar', '含む水の量', 'Wasser in der Luft', 'Eau dans l’air', 'हवा में पानी', '空气含水量', '空氣含水量'),
  capacityLabel: T('품을 수 있는 최대', 'Maximum it could hold', 'Máximo que puede contener', 'Máximo que pode conter', '含める最大量', 'Maximal möglich', 'Maximum possible', 'अधिकतम क्षमता', '最大可含', '最大可含'),
  comfortLabel: T('느낌', 'How it feels', 'Cómo se siente', 'Como se sente', '感じ方', 'Empfinden', 'Ressenti', 'कैसा लगता है', '体感', '體感'),
  fahrenheitLabel: T('화씨로', 'In Fahrenheit', 'En Fahrenheit', 'Em Fahrenheit', '華氏で', 'In Fahrenheit', 'En Fahrenheit', 'फ़ारेनहाइट में', '华氏', '華氏'),

  whyTitle: T('습도만으로는 알 수 없습니다', 'Humidity alone tells you little', 'La humedad sola dice poco', 'A umidade sozinha diz pouco', '湿度だけではわかりません', 'Die Feuchte allein sagt wenig', 'L’humidité seule ne dit pas grand-chose', 'केवल आर्द्रता से पता नहीं चलता', '只看湿度看不出来', '只看濕度看不出來'),

  whyNote: T(
    '상대습도는 "지금 공기가 품을 수 있는 최대치의 몇 퍼센트인가"입니다. 그 최대치가 기온에 따라 크게 달라지므로, 같은 60%라도 30도에서는 1세제곱미터에 18g, 10도에서는 6g밖에 되지 않습니다. 이슬점은 그 물의 양을 온도 하나로 말한 값이라 훨씬 곧게 읽힙니다.',
    'Relative humidity says what share of the maximum the air is carrying — and that maximum swings hard with temperature. The same 60% means about 18 g of water per cubic metre at 30 °C but only 6 g at 10 °C. The dew point states that quantity as a single temperature, which reads far more directly.',
    'La humedad relativa dice qué parte del máximo lleva el aire, y ese máximo cambia mucho con la temperatura. El mismo 60% son unos 18 g de agua por metro cúbico a 30 °C y solo 6 g a 10 °C. El punto de rocío expresa esa cantidad como una sola temperatura, mucho más directa.',
    'A umidade relativa diz que fração do máximo o ar carrega, e esse máximo varia muito com a temperatura. Os mesmos 60% são cerca de 18 g de água por metro cúbico a 30 °C e apenas 6 g a 10 °C. O ponto de orvalho expressa essa quantidade como uma única temperatura, bem mais direta.',
    '相対湿度は「今の空気が含める最大量の何パーセントか」です。その最大量が気温で大きく変わるので、同じ60%でも30度では1立方メートルあたり18g、10度では6gにしかなりません。露点はその量を温度ひとつで言い表すので、ずっと素直に読めます。',
    'Relative Feuchte gibt an, welchen Anteil des Maximums die Luft trägt — und dieses Maximum schwankt stark mit der Temperatur. Dieselben 60 % bedeuten bei 30 °C rund 18 g Wasser je Kubikmeter, bei 10 °C nur 6 g. Der Taupunkt nennt diese Menge als eine einzige Temperatur und liest sich viel direkter.',
    'L’humidité relative indique quelle part du maximum l’air transporte, et ce maximum varie fortement avec la température. Les mêmes 60 % font environ 18 g d’eau par mètre cube à 30 °C, mais seulement 6 g à 10 °C. Le point de rosée exprime cette quantité en une seule température, bien plus parlante.',
    'सापेक्ष आर्द्रता बताती है कि हवा अधिकतम क्षमता का कितना प्रतिशत ले जा रही है — और वह क्षमता तापमान के साथ बहुत बदलती है। वही 60% 30 °C पर लगभग 18 ग्राम प्रति घन मीटर है, पर 10 °C पर केवल 6 ग्राम। ओसांक उसी मात्रा को एक तापमान में कहता है, जो कहीं सीधा पढ़ा जाता है।',
    '相对湿度说的是空气装了最大容量的百分之几，而这个最大容量随气温剧烈变化。同样是 60%，30 度时每立方米约有 18 克水，10 度时只有 6 克。露点把这个含水量用一个温度说清楚，读起来直接得多。',
    '相對濕度說的是空氣裝了最大容量的百分之幾，而這個最大容量隨氣溫劇烈變化。同樣是 60%，30 度時每立方公尺約有 18 克水，10 度時只有 6 克。露點把這個含水量用一個溫度說清楚，讀起來直接得多。',
  ),

  comfortTitle: T('여름밤은 이슬점으로 재야 합니다', 'Summer nights are measured in dew points', 'Las noches de verano se miden en punto de rocío', 'As noites de verão se medem em ponto de orvalho', '夏の夜は露点で測ります', 'Sommernächte misst man am Taupunkt', 'Les nuits d’été se mesurent au point de rosée', 'गर्मी की रातें ओसांक से नापी जाती हैं', '夏夜要用露点来衡量', '夏夜要用露點來衡量'),

  comfortNote: T(
    '이슬점 16도 아래면 쾌적하고, 20도를 넘으면 끈적이며, 24도를 넘으면 숨이 막힙니다. 기온이 밤에 내려가도 이슬점은 잘 내려가지 않아서, 열대야가 그렇게 끈질긴 것입니다.',
    'Below 16 °C it feels pleasant, above 20 °C sticky, above 24 °C oppressive. Air temperature falls at night but the dew point barely does — which is exactly why a humid night stays unbearable.',
    'Por debajo de 16 °C resulta agradable; por encima de 20 °C, pegajoso; por encima de 24 °C, sofocante. La temperatura baja de noche, pero el punto de rocío apenas: por eso una noche húmeda no da tregua.',
    'Abaixo de 16 °C é agradável; acima de 20 °C, pegajoso; acima de 24 °C, sufocante. A temperatura cai à noite, mas o ponto de orvalho quase não: por isso uma noite úmida não dá trégua.',
    '露点16度以下なら快適、20度を超えるとべたつき、24度を超えると息苦しくなります。夜に気温が下がっても露点はあまり下がらないので、熱帯夜はしつこいのです。',
    'Unter 16 °C fühlt es sich angenehm an, über 20 °C klebrig, über 24 °C drückend. Nachts fällt die Lufttemperatur, der Taupunkt kaum — deshalb bleibt eine schwüle Nacht unerträglich.',
    'Sous 16 °C, c’est agréable ; au-dessus de 20 °C, collant ; au-dessus de 24 °C, étouffant. La température baisse la nuit, mais pas le point de rosée : voilà pourquoi une nuit humide n’offre aucun répit.',
    '16 °C से नीचे सुखद, 20 °C से ऊपर चिपचिपा, 24 °C से ऊपर दमघोंटू। रात में तापमान गिरता है पर ओसांक मुश्किल से — इसीलिए उमस भरी रात टिकी रहती है।',
    '露点低于 16 度舒适，高于 20 度黏腻，高于 24 度窒闷。夜里气温会降，露点却几乎不降——这正是闷热夜晚难熬的原因。',
    '露點低於 16 度舒適，高於 20 度黏膩，高於 24 度窒悶。夜裡氣溫會降，露點卻幾乎不降——這正是悶熱夜晚難熬的原因。',
  ),

  fogTitle: T('이슬점까지 식으면 이슬이 맺힙니다', 'Cool the air to the dew point and it condenses', 'Enfría el aire al punto de rocío y se condensa', 'Resfrie o ar ao ponto de orvalho e ele condensa', '露点まで冷えると露が結びます', 'Kühlt die Luft auf den Taupunkt, schlägt sie sich nieder', 'Refroidissez l’air au point de rosée et il se condense', 'ओसांक तक ठंडा होते ही संघनन', '冷到露点就会结露', '冷到露點就會結露'),

  fogNote: T(
    '이슬점은 "여기까지 식히면 물이 맺힌다"는 온도입니다. 새벽 기온이 이슬점까지 내려가면 풀잎에 이슬이 맺히고 안개가 낍니다. 찬 음료 잔에 물이 맺히는 것도 잔 둘레의 공기가 이슬점 아래로 식었기 때문입니다.',
    'The dew point is the temperature at which water starts to condense. When the pre-dawn air cools to it, dew forms on the grass and fog appears. The same reason beads water on a cold glass: the air touching it fell below its dew point.',
    'El punto de rocío es la temperatura a la que el agua empieza a condensarse. Cuando el aire del amanecer llega a él, se forma rocío y niebla. Por eso mismo suda un vaso frío: el aire pegado al vidrio bajó de su punto de rocío.',
    'O ponto de orvalho é a temperatura em que a água começa a condensar. Quando o ar da madrugada chega nele, forma-se orvalho e neblina. É o mesmo motivo do copo gelado suar: o ar encostado nele caiu abaixo do ponto de orvalho.',
    '露点は「ここまで冷えると水が結ぶ」温度です。明け方の気温が露点まで下がると草に露が結び、霧が出ます。冷たいグラスに水滴がつくのも、周りの空気が露点より冷えたからです。',
    'Der Taupunkt ist die Temperatur, bei der Wasser auszukondensieren beginnt. Kühlt die Luft am Morgen darauf ab, bildet sich Tau auf dem Gras und Nebel. Aus demselben Grund beschlägt ein kaltes Glas: die anliegende Luft fiel unter ihren Taupunkt.',
    'Le point de rosée est la température à laquelle l’eau commence à se condenser. Quand l’air d’avant l’aube y descend, la rosée se dépose sur l’herbe et le brouillard se lève. C’est aussi pourquoi un verre froid perle : l’air à son contact est passé sous son point de rosée.',
    'ओसांक वह तापमान है जिस पर पानी संघनित होने लगता है। भोर की हवा वहाँ तक ठंडी हो जाए तो घास पर ओस और कोहरा बनता है। ठंडे गिलास पर बूँदें भी इसीलिए आती हैं — उससे लगी हवा अपने ओसांक से नीचे चली गई।',
    '露点是水开始凝结的温度。凌晨气温降到露点，草叶上就结露、起雾。冷饮杯外壁出水也是同一回事：贴着杯子的空气降到了露点以下。',
    '露點是水開始凝結的溫度。凌晨氣溫降到露點，草葉上就結露、起霧。冷飲杯外壁出水也是同一回事：貼著杯子的空氣降到了露點以下。',
  ),

  capacityTitle: T('따뜻한 공기가 더 많이 품습니다', 'Warm air carries more', 'El aire cálido lleva más', 'O ar quente carrega mais', '暖かい空気ほど多く含みます', 'Warme Luft trägt mehr', 'L’air chaud en contient davantage', 'गर्म हवा अधिक ले जाती है', '暖空气能装更多水', '暖空氣能裝更多水'),

  capacityNote: T(
    '기온이 10도 오를 때마다 품을 수 있는 물의 양이 대략 두 배가 됩니다. 겨울에 방을 데우면 습도가 뚝 떨어지는 것도 그래서입니다 — 물은 그대로인데 품을 수 있는 그릇이 커진 것입니다.',
    'Roughly every 10 °C doubles how much water the air can hold. That is why heating a room in winter sends the humidity plunging: the water is unchanged, but the container just got bigger.',
    'Cada 10 °C aproximadamente duplica el agua que el aire puede contener. Por eso al calentar una habitación en invierno la humedad se desploma: el agua es la misma, pero el recipiente creció.',
    'Cada 10 °C aproximadamente dobra a água que o ar pode conter. Por isso aquecer um cômodo no inverno derruba a umidade: a água é a mesma, mas o recipiente ficou maior.',
    '気温が10度上がるごとに含める水の量はおよそ二倍になります。冬に部屋を暖めると湿度がぐっと下がるのもそのためです——水は同じで、入れ物が大きくなっただけです。',
    'Etwa alle 10 °C verdoppelt sich, wie viel Wasser die Luft fassen kann. Deshalb stürzt die Feuchte ab, wenn man im Winter heizt: Das Wasser bleibt, nur das Gefäß wurde größer.',
    'Environ tous les 10 °C, la quantité d’eau que l’air peut contenir double. C’est pourquoi chauffer une pièce en hiver fait chuter l’humidité : l’eau est la même, mais le récipient a grandi.',
    'लगभग हर 10 °C पर हवा की जल-क्षमता दोगुनी हो जाती है। इसीलिए सर्दियों में कमरा गर्म करते ही आर्द्रता गिर जाती है — पानी उतना ही है, बर्तन बड़ा हो गया।',
    '气温每升高约 10 度，空气能装的水就翻一倍。所以冬天一开暖气，湿度就骤降——水没变，只是容器变大了。',
    '氣溫每升高約 10 度，空氣能裝的水就翻一倍。所以冬天一開暖氣，濕度就驟降——水沒變，只是容器變大了。',
  ),

  tableTitle: T('기온과 습도로 찾기', 'Find it by temperature and humidity', 'Búscalo por temperatura y humedad', 'Ache por temperatura e umidade', '気温と湿度から探す', 'Nach Temperatur und Feuchte suchen', 'Chercher par température et humidité', 'तापमान और आर्द्रता से देखें', '按气温和湿度查找', '按氣溫和濕度查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),

  desc: T<(f: DewFacts) => string>(
    f => `기온 ${f.cell.t}도에 습도 ${f.cell.rh}%면 이슬점은 ${f.dew}도입니다. 공기 1세제곱미터가 물 ${f.absolute}g을 품고 있는 셈입니다.`,
    f => `At ${f.cell.t} °C and ${f.cell.rh}% humidity the dew point is ${f.dew} °C — about ${f.absolute} g of water in every cubic metre of air.`,
    f => `A ${f.cell.t} °C con ${f.cell.rh}% de humedad el punto de rocío es ${f.dew} °C: unos ${f.absolute} g de agua por metro cúbico de aire.`,
    f => `A ${f.cell.t} °C com ${f.cell.rh}% de umidade o ponto de orvalho é ${f.dew} °C: cerca de ${f.absolute} g de água por metro cúbico de ar.`,
    f => `気温${f.cell.t}度で湿度${f.cell.rh}%なら露点は${f.dew}度です。空気1立方メートルに水を${f.absolute}g含んでいることになります。`,
    f => `Bei ${f.cell.t} °C und ${f.cell.rh} % Feuchte liegt der Taupunkt bei ${f.dew} °C — rund ${f.absolute} g Wasser je Kubikmeter Luft.`,
    f => `À ${f.cell.t} °C avec ${f.cell.rh} % d’humidité, le point de rosée vaut ${f.dew} °C, soit environ ${f.absolute} g d’eau par mètre cube d’air.`,
    f => `${f.cell.t} °C और ${f.cell.rh}% आर्द्रता पर ओसांक ${f.dew} °C है — यानी हर घन मीटर हवा में लगभग ${f.absolute} ग्राम पानी।`,
    f => `气温 ${f.cell.t} 度、湿度 ${f.cell.rh}% 时露点为 ${f.dew} 度，相当于每立方米空气含水约 ${f.absolute} 克。`,
    f => `氣溫 ${f.cell.t} 度、濕度 ${f.cell.rh}% 時露點為 ${f.dew} 度，相當於每立方公尺空氣含水約 ${f.absolute} 克。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '이슬점은 그 공기를 어디까지 식히면 물이 맺히는지를 나타낸 온도입니다.',
      '습도 100%면 이슬점이 기온과 같고, 낮을수록 이슬점도 내려갑니다.',
      '기온과 이슬점의 거리가 좁을수록 눅눅합니다 — 0이면 안개가 낀 상태입니다.',
      '같은 습도라도 기온이 10도 오르면 품은 물의 양은 대략 두 배가 됩니다.',
    ],
    [
      'The dew point is how far you would have to cool this air before water condenses.',
      'At 100% humidity the dew point equals the air temperature; lower humidity pulls it down.',
      'The narrower the gap between air and dew point, the muggier it feels — zero means fog.',
      'At the same humidity, ten degrees warmer means roughly twice the water in the air.',
    ],
    [
      'El punto de rocío es cuánto habría que enfriar este aire para que el agua se condense.',
      'Con 100% de humedad el punto de rocío iguala a la temperatura; menos humedad lo baja.',
      'Cuanto menor la distancia entre aire y rocío, más bochorno: cero significa niebla.',
      'Con la misma humedad, diez grados más suponen casi el doble de agua en el aire.',
    ],
    [
      'O ponto de orvalho é o quanto seria preciso resfriar este ar para a água condensar.',
      'Com 100% de umidade o ponto de orvalho iguala a temperatura; menos umidade o abaixa.',
      'Quanto menor a distância entre ar e orvalho, mais abafado: zero significa neblina.',
      'Com a mesma umidade, dez graus a mais significam quase o dobro de água no ar.',
    ],
    [
      '露点は、その空気をどこまで冷やすと水が結ぶかを表す温度です。',
      '湿度100%なら露点は気温と同じで、湿度が低いほど露点も下がります。',
      '気温と露点の差が小さいほど蒸します——0なら霧が出ている状態です。',
      '同じ湿度でも気温が10度上がれば、含む水の量はおよそ二倍になります。',
    ],
    [
      'Der Taupunkt sagt, wie weit man diese Luft kühlen müsste, bis Wasser kondensiert.',
      'Bei 100 % Feuchte entspricht er der Lufttemperatur; weniger Feuchte drückt ihn nach unten.',
      'Je kleiner der Abstand zwischen Luft und Taupunkt, desto schwüler — null bedeutet Nebel.',
      'Bei gleicher Feuchte bedeuten zehn Grad mehr etwa doppelt so viel Wasser in der Luft.',
    ],
    [
      'Le point de rosée indique jusqu’où refroidir cet air pour que l’eau se condense.',
      'À 100 % d’humidité il égale la température ; moins d’humidité l’abaisse.',
      'Plus l’écart entre l’air et le point de rosée est faible, plus c’est lourd — zéro, c’est le brouillard.',
      'À humidité égale, dix degrés de plus, c’est environ deux fois plus d’eau dans l’air.',
    ],
    [
      'ओसांक बताता है कि इस हवा को कितना ठंडा करने पर पानी संघनित होगा।',
      '100% आर्द्रता पर ओसांक तापमान के बराबर होता है; कम आर्द्रता उसे नीचे खींचती है।',
      'हवा और ओसांक का अंतर जितना कम, उतनी उमस — शून्य यानी कोहरा।',
      'समान आर्द्रता पर दस डिग्री अधिक तापमान का अर्थ है लगभग दोगुना पानी।',
    ],
    [
      '露点表示要把这团空气冷到多少度，水才会凝结。',
      '湿度 100% 时露点等于气温；湿度越低，露点越低。',
      '气温与露点越接近就越闷，差为零就是起雾的状态。',
      '同样湿度下，气温高十度，空气里的水约多一倍。',
    ],
    [
      '露點表示要把這團空氣冷到多少度，水才會凝結。',
      '濕度 100% 時露點等於氣溫；濕度越低，露點越低。',
      '氣溫與露點越接近就越悶，差為零就是起霧的狀態。',
      '同樣濕度下，氣溫高十度，空氣裡的水約多一倍。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '이슬점표 — 기온과 습도로 보는 189칸',
    'Dew point chart — 189 cells of temperature and humidity',
    'Tabla de punto de rocío — 189 casillas de temperatura y humedad',
    'Tabela de ponto de orvalho — 189 células de temperatura e umidade',
    '露点表 — 気温と湿度で見る189マス',
    'Taupunkt-Tabelle — 189 Felder aus Temperatur und Feuchte',
    'Table du point de rosée — 189 cases de température et d’humidité',
    'ओसांक चार्ट — तापमान और आर्द्रता के 189 खाने',
    '露点表 — 气温与湿度交汇的 189 格',
    '露點表 — 氣溫與濕度交匯的 189 格',
  ),

  hubMetaDesc: T(
    '기온 0~40도와 상대습도 20~100%가 만나는 칸마다 이슬점과 공기가 품은 물의 양을 계산했습니다. 습도만으로는 눅눅함을 알 수 없는 까닭까지 함께 냅니다.',
    'Dew point and the water actually in the air for every pairing of 0–40 °C with 20–100% humidity — and why the humidity figure alone never settles how muggy it feels.',
    'Punto de rocío y agua realmente presente en el aire para cada par de 0–40 °C con 20–100% de humedad, y por qué la humedad sola nunca dice cuánto bochorno hace.',
    'Ponto de orvalho e a água realmente presente no ar para cada par de 0–40 °C com 20–100% de umidade, e por que a umidade sozinha nunca diz o quanto abafa.',
    '気温0〜40度と相対湿度20〜100%が出会う各マスの露点と、空気が実際に含む水の量を計算しました。湿度だけでは蒸し暑さがわからない理由も示します。',
    'Taupunkt und die tatsächliche Wassermenge in der Luft für jede Paarung von 0–40 °C mit 20–100 % Feuchte — und warum die Feuchtezahl allein nie sagt, wie schwül es ist.',
    'Point de rosée et eau réellement présente dans l’air pour chaque couple 0–40 °C et 20–100 % d’humidité, et pourquoi l’humidité seule ne dit jamais à quel point c’est lourd.',
    '0–40 °C और 20–100% आर्द्रता के हर जोड़े के लिए ओसांक और हवा में मौजूद पानी — और क्यों केवल आर्द्रता से उमस का पता नहीं चलता।',
    '气温 0–40 度与相对湿度 20–100% 每一组合的露点与空气实际含水量，并说明为何只看湿度判断不了闷热。',
    '氣溫 0–40 度與相對濕度 20–100% 每一組合的露點與空氣實際含水量，並說明為何只看濕度判斷不了悶熱。',
  ),

  metaTitle: T<(f: DewFacts) => string>(
    f => `기온 ${f.cell.t}도 · 습도 ${f.cell.rh}% — 이슬점 ${f.dew}도`,
    f => `${f.cell.t} °C at ${f.cell.rh}% humidity — dew point ${f.dew} °C`,
    f => `${f.cell.t} °C con ${f.cell.rh}% de humedad — rocío ${f.dew} °C`,
    f => `${f.cell.t} °C com ${f.cell.rh}% de umidade — orvalho ${f.dew} °C`,
    f => `気温${f.cell.t}度・湿度${f.cell.rh}% — 露点${f.dew}度`,
    f => `${f.cell.t} °C bei ${f.cell.rh} % Feuchte — Taupunkt ${f.dew} °C`,
    f => `${f.cell.t} °C à ${f.cell.rh} % d’humidité — rosée ${f.dew} °C`,
    f => `${f.cell.t} °C, ${f.cell.rh}% आर्द्रता — ओसांक ${f.dew} °C`,
    f => `气温 ${f.cell.t} 度、湿度 ${f.cell.rh}% — 露点 ${f.dew} 度`,
    f => `氣溫 ${f.cell.t} 度、濕度 ${f.cell.rh}% — 露點 ${f.dew} 度`,
  ),

  metaDesc: T<(f: DewFacts) => string>(
    f => `기온 ${f.cell.t}도에 상대습도 ${f.cell.rh}%면 이슬점은 ${f.dew}도(화씨 ${f.fahrenheit}도)이고, 공기 1세제곱미터가 물 ${f.absolute}g을 품습니다. 기온과 이슬점의 거리는 ${f.spread}도입니다.`,
    f => `${f.cell.t} °C at ${f.cell.rh}% relative humidity gives a dew point of ${f.dew} °C (${f.fahrenheit} °F), with ${f.absolute} g of water per cubic metre and a ${f.spread}-degree gap between air and dew point.`,
    f => `${f.cell.t} °C con ${f.cell.rh}% de humedad relativa dan un punto de rocío de ${f.dew} °C (${f.fahrenheit} °F), con ${f.absolute} g de agua por metro cúbico y ${f.spread} grados de distancia entre aire y rocío.`,
    f => `${f.cell.t} °C com ${f.cell.rh}% de umidade relativa dão ponto de orvalho de ${f.dew} °C (${f.fahrenheit} °F), com ${f.absolute} g de água por metro cúbico e ${f.spread} graus entre ar e orvalho.`,
    f => `気温${f.cell.t}度・相対湿度${f.cell.rh}%なら露点は${f.dew}度（華氏${f.fahrenheit}度）、空気1立方メートルあたり水${f.absolute}gで、気温との差は${f.spread}度です。`,
    f => `${f.cell.t} °C bei ${f.cell.rh} % relativer Feuchte ergeben einen Taupunkt von ${f.dew} °C (${f.fahrenheit} °F), ${f.absolute} g Wasser je Kubikmeter und ${f.spread} Grad Abstand zur Lufttemperatur.`,
    f => `${f.cell.t} °C à ${f.cell.rh} % d’humidité relative donnent un point de rosée de ${f.dew} °C (${f.fahrenheit} °F), ${f.absolute} g d’eau par mètre cube et ${f.spread} degrés d’écart avec l’air.`,
    f => `${f.cell.t} °C पर ${f.cell.rh}% सापेक्ष आर्द्रता से ओसांक ${f.dew} °C (${f.fahrenheit} °F) बनता है, हवा में ${f.absolute} ग्राम प्रति घन मीटर पानी और वायु से ${f.spread} डिग्री का अंतर।`,
    f => `气温 ${f.cell.t} 度、相对湿度 ${f.cell.rh}% 时露点为 ${f.dew} 度（华氏 ${f.fahrenheit} 度），每立方米含水 ${f.absolute} 克，气温与露点相差 ${f.spread} 度。`,
    f => `氣溫 ${f.cell.t} 度、相對濕度 ${f.cell.rh}% 時露點為 ${f.dew} 度（華氏 ${f.fahrenheit} 度），每立方公尺含水 ${f.absolute} 克，氣溫與露點相差 ${f.spread} 度。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '습도 60%인데 왜 어떤 날은 안 눅눅한가요?', a: '기온이 다르기 때문입니다. 30도의 60%는 1세제곱미터에 18g을 품지만 10도의 60%는 6g뿐입니다. 눅눅함은 그 물의 양을 따라가고, 그것을 온도로 말한 것이 이슬점입니다.' },
      { q: '이슬점이 몇 도부터 불쾌한가요?', a: '보통 16도 아래면 쾌적하고 20도를 넘으면 끈적이며 24도를 넘으면 숨이 막힙니다. 여름 장마철 이슬점이 대개 22~25도입니다.' },
      { q: '겨울에 난방하면 왜 건조해지나요?', a: '공기가 품을 수 있는 최대량이 기온과 함께 커지기 때문입니다. 물의 양은 그대로인데 그릇이 커지니 상대습도가 떨어집니다 — 이슬점은 거의 그대로입니다.' },
      { q: '찬 물잔에 물이 맺히는 것도 같은 이유인가요?', a: '그렇습니다. 잔 둘레의 공기가 이슬점 아래로 식으면 품고 있던 수증기가 더 버티지 못하고 물로 맺힙니다.' },
      { q: '이슬점이 기온보다 높을 수 있나요?', a: '없습니다. 상대습도가 100%를 넘을 수 없기 때문에 이슬점의 최대값이 기온입니다. 둘이 같아지면 안개가 낀 상태입니다.' },
    ],
    [
      { q: 'Why does 60% humidity feel different from day to day?', a: 'Because the temperature differs. At 30 °C that 60% is 18 g of water per cubic metre; at 10 °C it is only 6 g. Mugginess follows the water, and the dew point is that water stated as a temperature.' },
      { q: 'What dew point starts to feel unpleasant?', a: 'Below 16 °C is comfortable, above 20 °C turns sticky and above 24 °C becomes oppressive. A rainy-season night usually sits at 22–25 °C.' },
      { q: 'Why does heating dry out a room in winter?', a: 'Warmer air can hold more, so the same water fills a smaller share of a bigger container and the relative humidity collapses. The dew point barely moves.' },
      { q: 'Is a sweating cold glass the same thing?', a: 'Yes. The air touching the glass cools below its dew point, and the vapour it was carrying has nowhere to stay but on the surface.' },
      { q: 'Can the dew point exceed the air temperature?', a: 'No. Relative humidity cannot pass 100%, so the air temperature is the ceiling. When the two meet, you are standing in fog.' },
    ],
    [
      { q: '¿Por qué el 60% de humedad se siente distinto según el día?', a: 'Porque cambia la temperatura. A 30 °C ese 60% son 18 g de agua por metro cúbico; a 10 °C, solo 6 g. El bochorno sigue al agua, y el punto de rocío es esa agua expresada como temperatura.' },
      { q: '¿Desde qué punto de rocío empieza a molestar?', a: 'Por debajo de 16 °C se está cómodo, por encima de 20 °C se vuelve pegajoso y por encima de 24 °C, sofocante. Una noche de monzón suele estar en 22–25 °C.' },
      { q: '¿Por qué calefactar reseca la casa en invierno?', a: 'El aire cálido puede contener más, así que la misma agua ocupa una fracción menor de un recipiente mayor y la humedad relativa se hunde. El punto de rocío apenas se mueve.' },
      { q: '¿El vaso frío que suda es lo mismo?', a: 'Sí. El aire que toca el vidrio baja de su punto de rocío y el vapor que llevaba no tiene dónde quedarse salvo en la superficie.' },
      { q: '¿Puede el rocío superar la temperatura del aire?', a: 'No. La humedad relativa no pasa del 100%, así que el techo es la propia temperatura. Cuando coinciden, estás dentro de la niebla.' },
    ],
    [
      { q: 'Por que 60% de umidade parece diferente a cada dia?', a: 'Porque a temperatura muda. A 30 °C esses 60% são 18 g de água por metro cúbico; a 10 °C, só 6 g. O abafamento segue a água, e o ponto de orvalho é essa água dita como temperatura.' },
      { q: 'A partir de que ponto de orvalho incomoda?', a: 'Abaixo de 16 °C é confortável, acima de 20 °C fica pegajoso e acima de 24 °C, sufocante. Uma noite de verão úmido costuma ficar em 22–25 °C.' },
      { q: 'Por que aquecer resseca a casa no inverno?', a: 'O ar quente cabe mais, então a mesma água ocupa fração menor de um recipiente maior e a umidade relativa despenca. O ponto de orvalho quase não muda.' },
      { q: 'O copo gelado suando é a mesma coisa?', a: 'É. O ar encostado no vidro cai abaixo do ponto de orvalho e o vapor que ele carregava não tem onde ficar senão na superfície.' },
      { q: 'O orvalho pode passar da temperatura do ar?', a: 'Não. A umidade relativa não passa de 100%, então o teto é a própria temperatura. Quando os dois se encontram, você está na neblina.' },
    ],
    [
      { q: '同じ湿度60%でも日によって蒸し方が違うのはなぜですか？', a: '気温が違うからです。30度の60%は1立方メートルに18g、10度の60%は6gしかありません。蒸し暑さはその水の量に従い、それを温度で言ったのが露点です。' },
      { q: '露点が何度から不快になりますか？', a: '16度以下なら快適、20度を超えるとべたつき、24度を超えると息苦しくなります。梅雨や真夏の夜はたいてい22〜25度です。' },
      { q: '冬に暖房すると乾くのはなぜですか？', a: '暖かい空気ほど多く含めるので、水の量は同じでも入れ物が大きくなり相対湿度が下がります。露点はほとんど動きません。' },
      { q: '冷たいグラスの水滴も同じですか？', a: '同じです。グラスに触れた空気が露点より冷えると、含んでいた水蒸気は表面に結ぶしかなくなります。' },
      { q: '露点が気温より高くなることはありますか？', a: 'ありません。相対湿度は100%を超えられないので、気温が露点の上限です。二つが一致すれば霧が出ている状態です。' },
    ],
    [
      { q: 'Warum fühlen sich 60 % Feuchte von Tag zu Tag anders an?', a: 'Weil die Temperatur eine andere ist. Bei 30 °C sind das 18 g Wasser je Kubikmeter, bei 10 °C nur 6 g. Die Schwüle folgt dem Wasser — und der Taupunkt nennt genau dieses Wasser als Temperatur.' },
      { q: 'Ab welchem Taupunkt wird es unangenehm?', a: 'Unter 16 °C ist es angenehm, über 20 °C klebrig, über 24 °C drückend. Eine schwüle Sommernacht liegt meist bei 22–25 °C.' },
      { q: 'Warum trocknet Heizen die Wohnung im Winter aus?', a: 'Warme Luft fasst mehr; dieselbe Wassermenge füllt ein größeres Gefäß nur zum kleineren Teil, und die relative Feuchte stürzt ab. Der Taupunkt bleibt fast gleich.' },
      { q: 'Ist das beschlagene kalte Glas dasselbe?', a: 'Ja. Die Luft am Glas kühlt unter ihren Taupunkt, und der mitgeführte Dampf kann nur noch auf der Oberfläche bleiben.' },
      { q: 'Kann der Taupunkt über der Lufttemperatur liegen?', a: 'Nein. Die relative Feuchte kann 100 % nicht überschreiten, also ist die Lufttemperatur die Obergrenze. Treffen sich beide, steht man im Nebel.' },
    ],
    [
      { q: 'Pourquoi 60 % d’humidité ne se ressent pas pareil selon les jours ?', a: 'Parce que la température diffère. À 30 °C, ces 60 % font 18 g d’eau par mètre cube ; à 10 °C, seulement 6 g. La lourdeur suit l’eau, et le point de rosée nomme cette eau sous forme de température.' },
      { q: 'À partir de quel point de rosée est-ce désagréable ?', a: 'Sous 16 °C c’est confortable, au-dessus de 20 °C ça colle, au-dessus de 24 °C c’est étouffant. Une nuit d’été humide se tient souvent entre 22 et 25 °C.' },
      { q: 'Pourquoi chauffer assèche-t-il l’hiver ?', a: 'L’air chaud contient davantage : la même eau n’occupe qu’une part plus faible d’un récipient plus grand, et l’humidité relative s’effondre. Le point de rosée, lui, bouge à peine.' },
      { q: 'Le verre froid qui perle, c’est pareil ?', a: 'Oui. L’air au contact du verre passe sous son point de rosée, et la vapeur qu’il portait n’a plus qu’à se déposer sur la surface.' },
      { q: 'Le point de rosée peut-il dépasser la température ?', a: 'Non. L’humidité relative ne dépasse pas 100 %, donc la température est le plafond. Quand les deux se rejoignent, on est dans le brouillard.' },
    ],
    [
      { q: '60% आर्द्रता हर दिन अलग क्यों लगती है?', a: 'क्योंकि तापमान अलग होता है। 30 °C पर वही 60% यानी 18 ग्राम प्रति घन मीटर, 10 °C पर केवल 6 ग्राम। उमस पानी के पीछे चलती है, और ओसांक उसी पानी को तापमान में कहता है।' },
      { q: 'ओसांक कितने से असहज लगने लगता है?', a: '16 °C से नीचे आरामदेह, 20 °C से ऊपर चिपचिपा, 24 °C से ऊपर दमघोंटू। मानसून की रातें प्रायः 22–25 °C पर रहती हैं।' },
      { q: 'सर्दियों में हीटिंग से हवा सूखी क्यों लगती है?', a: 'गर्म हवा अधिक समा सकती है, इसलिए उतना ही पानी बड़े बर्तन का छोटा हिस्सा भरता है और सापेक्ष आर्द्रता गिर जाती है। ओसांक लगभग वहीं रहता है।' },
      { q: 'ठंडे गिलास पर बूँदें भी यही बात है?', a: 'हाँ। गिलास से लगी हवा अपने ओसांक से नीचे चली जाती है और उसमें मौजूद वाष्प सतह पर ही ठहर पाती है।' },
      { q: 'क्या ओसांक तापमान से ऊपर जा सकता है?', a: 'नहीं। सापेक्ष आर्द्रता 100% से ऊपर नहीं जाती, इसलिए तापमान ही ऊपरी सीमा है। दोनों मिल जाएँ तो आप कोहरे में हैं।' },
    ],
    [
      { q: '同样 60% 的湿度，为什么有的天不闷？', a: '因为气温不同。30 度的 60% 是每立方米 18 克水，10 度的 60% 只有 6 克。闷不闷跟着含水量走，而露点就是把这个含水量说成一个温度。' },
      { q: '露点到多少度开始难受？', a: '低于 16 度舒适，高于 20 度黏腻，高于 24 度窒闷。梅雨和盛夏的夜晚通常在 22–25 度。' },
      { q: '冬天开暖气为什么变干？', a: '暖空气能装更多，水量没变但容器变大了，相对湿度自然跌下来。露点几乎没动。' },
      { q: '冷饮杯外壁出水也是这个道理吗？', a: '是的。贴着杯子的空气降到露点以下，原本带着的水汽就只能凝在表面。' },
      { q: '露点会高过气温吗？', a: '不会。相对湿度不能超过 100%，所以气温就是上限。两者相等时，你正站在雾里。' },
    ],
    [
      { q: '同樣 60% 的濕度，為什麼有的天不悶？', a: '因為氣溫不同。30 度的 60% 是每立方公尺 18 克水，10 度的 60% 只有 6 克。悶不悶跟著含水量走，而露點就是把這個含水量說成一個溫度。' },
      { q: '露點到多少度開始難受？', a: '低於 16 度舒適，高於 20 度黏膩，高於 24 度窒悶。梅雨和盛夏的夜晚通常在 22–25 度。' },
      { q: '冬天開暖氣為什麼變乾？', a: '暖空氣能裝更多，水量沒變但容器變大了，相對濕度自然跌下來。露點幾乎沒動。' },
      { q: '冷飲杯外壁出水也是這個道理嗎？', a: '是的。貼著杯子的空氣降到露點以下，原本帶著的水汽就只能凝在表面。' },
      { q: '露點會高過氣溫嗎？', a: '不會。相對濕度不能超過 100%，所以氣溫就是上限。兩者相等時，你正站在霧裡。' },
    ],
  ),

  dewFaq: T<(f: DewFacts) => FaqItem[]>(
    f => [
      { q: `기온 ${f.cell.t}도에 습도 ${f.cell.rh}%면 이슬점이 몇 도인가요?`, a: `${f.dew}도입니다. 기온과 ${f.spread}도 떨어져 있습니다.` },
      { q: `공기가 물을 얼마나 품고 있나요?`, a: `1세제곱미터에 ${f.absolute}g입니다. 이 기온에서 품을 수 있는 최대는 ${f.capacity}g입니다.` },
      { q: `느낌은 어떤가요?`, a: `이슬점 ${f.dew}도는 대체로 ${['dry', 'pleasant'].includes(f.comfort) ? '견딜 만한' : '눅눅한'} 쪽입니다. 기온보다 이슬점이 몸에 닿는 느낌에 가깝습니다.` },
      { q: `화씨로는 몇 도인가요?`, a: `${f.fahrenheit}도입니다.` },
    ],
    f => [
      { q: `What is the dew point at ${f.cell.t} °C and ${f.cell.rh}%?`, a: `${f.dew} °C — ${f.spread} degrees below the air.` },
      { q: `How much water is in that air?`, a: `${f.absolute} g per cubic metre; the most it could hold at this temperature is ${f.capacity} g.` },
      { q: `How does it feel?`, a: `A dew point of ${f.dew} °C sits on the ${['dry', 'pleasant'].includes(f.comfort) ? 'bearable' : 'muggy'} side. Dew point tracks what your skin notices better than temperature does.` },
      { q: `What is that in Fahrenheit?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `¿Cuál es el punto de rocío a ${f.cell.t} °C y ${f.cell.rh}%?`, a: `${f.dew} °C, es decir ${f.spread} grados por debajo del aire.` },
      { q: `¿Cuánta agua lleva ese aire?`, a: `${f.absolute} g por metro cúbico; a esta temperatura podría llevar como máximo ${f.capacity} g.` },
      { q: `¿Cómo se siente?`, a: `Un punto de rocío de ${f.dew} °C cae del lado ${['dry', 'pleasant'].includes(f.comfort) ? 'llevadero' : 'bochornoso'}. El rocío describe lo que nota la piel mejor que la temperatura.` },
      { q: `¿Cuánto es en Fahrenheit?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `Qual o ponto de orvalho a ${f.cell.t} °C e ${f.cell.rh}%?`, a: `${f.dew} °C, ou seja ${f.spread} graus abaixo do ar.` },
      { q: `Quanta água há nesse ar?`, a: `${f.absolute} g por metro cúbico; nesta temperatura caberiam no máximo ${f.capacity} g.` },
      { q: `Como se sente?`, a: `Um ponto de orvalho de ${f.dew} °C fica do lado ${['dry', 'pleasant'].includes(f.comfort) ? 'suportável' : 'abafado'}. O orvalho descreve o que a pele nota melhor que a temperatura.` },
      { q: `Quanto é em Fahrenheit?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `気温${f.cell.t}度・湿度${f.cell.rh}%の露点は？`, a: `${f.dew}度です。気温とは${f.spread}度離れています。` },
      { q: `その空気はどれだけ水を含んでいますか？`, a: `1立方メートルあたり${f.absolute}gです。この気温で含める最大は${f.capacity}gです。` },
      { q: `感じ方はどうですか？`, a: `露点${f.dew}度はおおむね${['dry', 'pleasant'].includes(f.comfort) ? '過ごしやすい' : '蒸す'}側です。肌が感じる度合いは気温より露点に近いです。` },
      { q: `華氏では何度ですか？`, a: `${f.fahrenheit}度です。` },
    ],
    f => [
      { q: `Wie hoch ist der Taupunkt bei ${f.cell.t} °C und ${f.cell.rh} %?`, a: `${f.dew} °C — ${f.spread} Grad unter der Lufttemperatur.` },
      { q: `Wie viel Wasser steckt in dieser Luft?`, a: `${f.absolute} g je Kubikmeter; bei dieser Temperatur wären höchstens ${f.capacity} g möglich.` },
      { q: `Wie fühlt sich das an?`, a: `Ein Taupunkt von ${f.dew} °C liegt auf der ${['dry', 'pleasant'].includes(f.comfort) ? 'erträglichen' : 'schwülen'} Seite. Was die Haut merkt, folgt eher dem Taupunkt als der Temperatur.` },
      { q: `Wie viel ist das in Fahrenheit?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `Quel est le point de rosée à ${f.cell.t} °C et ${f.cell.rh} % ?`, a: `${f.dew} °C, soit ${f.spread} degrés sous l’air.` },
      { q: `Combien d’eau contient cet air ?`, a: `${f.absolute} g par mètre cube ; à cette température, il pourrait en contenir au plus ${f.capacity} g.` },
      { q: `Quel ressenti ?`, a: `Un point de rosée de ${f.dew} °C se range du côté ${['dry', 'pleasant'].includes(f.comfort) ? 'supportable' : 'lourd'}. Ce que la peau perçoit suit le point de rosée plus que la température.` },
      { q: `Combien est-ce en Fahrenheit ?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `${f.cell.t} °C और ${f.cell.rh}% पर ओसांक कितना है?`, a: `${f.dew} °C — वायु तापमान से ${f.spread} डिग्री नीचे।` },
      { q: `उस हवा में कितना पानी है?`, a: `${f.absolute} ग्राम प्रति घन मीटर; इस तापमान पर अधिकतम ${f.capacity} ग्राम समा सकता है।` },
      { q: `महसूस कैसा होगा?`, a: `${f.dew} °C का ओसांक ${['dry', 'pleasant'].includes(f.comfort) ? 'सहनीय' : 'उमस भरे'} पक्ष में आता है। त्वचा जो महसूस करती है वह तापमान से अधिक ओसांक के साथ चलता है।` },
      { q: `फ़ारेनहाइट में कितना?`, a: `${f.fahrenheit} °F।` },
    ],
    f => [
      { q: `气温 ${f.cell.t} 度、湿度 ${f.cell.rh}% 时露点是多少？`, a: `${f.dew} 度，比气温低 ${f.spread} 度。` },
      { q: `这团空气含多少水？`, a: `每立方米 ${f.absolute} 克；该气温下最多能含 ${f.capacity} 克。` },
      { q: `体感如何？`, a: `露点 ${f.dew} 度大体偏${['dry', 'pleasant'].includes(f.comfort) ? '好受' : '闷'}。皮肤的感受更贴近露点而不是气温。` },
      { q: `换成华氏是多少？`, a: `${f.fahrenheit} 华氏度。` },
    ],
    f => [
      { q: `氣溫 ${f.cell.t} 度、濕度 ${f.cell.rh}% 時露點是多少？`, a: `${f.dew} 度，比氣溫低 ${f.spread} 度。` },
      { q: `這團空氣含多少水？`, a: `每立方公尺 ${f.absolute} 克；該氣溫下最多能含 ${f.capacity} 克。` },
      { q: `體感如何？`, a: `露點 ${f.dew} 度大體偏${['dry', 'pleasant'].includes(f.comfort) ? '好受' : '悶'}。皮膚的感受更貼近露點而不是氣溫。` },
      { q: `換成華氏是多少？`, a: `${f.fahrenheit} 華氏度。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const DEW_UI: L<DewUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<DewUI>;
