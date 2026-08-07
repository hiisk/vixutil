/**
 * 도시 사이 화면의 문구 — 열 언어.
 *
 * 도시 이름은 `lib/cities.ts`가 이미 열 언어로 들고 있어 여기서 옮기지 않는다.
 * 방위 약어(NNE)와 단위(km, mi)도 그대로 둔다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { FlightFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface FlightUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  distanceLabel: string;
  bearingLabel: string;
  timeLabel: string;
  shiftLabel: string;
  winterLabel: string;
  summerLabel: string;
  shareLabel: string;
  arriveTitle: string;
  arriveNote: string;
  departWord: string;
  nextDay: (n: number) => string;
  duration: (h: number, m: number) => string;
  shiftText: (minutes: number) => string;
  greatCircleTitle: string;
  greatCircleNote: string;
  windTitle: string;
  windNote: string;
  dstTitle: string;
  dstNote: string;
  centerTitle: string;
  centerNote: string;
  reverseTitle: string;
  fromRowTitle: string;
  toRowTitle: string;
  desc: (f: FlightFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: FlightFacts) => string;
  metaDesc: (f: FlightFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: FlightFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 시차를 '14시간 빠름' 꼴로 — 낱말만 언어마다 다르다 */
const shifter = (ahead: string, behind: string, same: string, half: string) => (minutes: number): string => {
  if (minutes === 0) return same;
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const body = m === 0 ? `${h}` : `${h}${half}${m}`;
  return minutes > 0 ? ahead.replace('{n}', body) : behind.replace('{n}', body);
};

const dur = (hw: string, mw: string) => (h: number, m: number) =>
  m === 0 ? `${h}${hw}` : `${h}${hw} ${m}${mw}`;

const nexter = (tpl: string, sameDay: string) => (n: number) =>
  n === 0 ? sameDay : tpl.replace('{n}', String(Math.abs(n))).replace('{sign}', n > 0 ? '+' : '−');

type Spec = { [K in keyof FlightUI]: L<FlightUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T(
    '도시 사이 거리와 비행시간', 'City distances and flight times', 'Distancias y tiempos de vuelo', 'Distâncias e tempos de voo',
    '都市間の距離と飛行時間', 'Städtedistanzen und Flugzeiten', 'Distances et temps de vol', 'शहरों की दूरी और उड़ान समय',
    '城市间距离与飞行时间', '城市間距離與飛行時間',
  ),

  hubTitle: T(
    '도시 사이 342칸 — 서울에서 뉴욕은 동쪽이 아니라 북쪽으로 떠납니다',
    '342 city pairs — leaving Seoul for New York, you head north, not east',
    '342 pares de ciudades — de Seúl a Nueva York se sale hacia el norte, no hacia el este',
    '342 pares de cidades — de Seul para Nova York parte-se para o norte, não para o leste',
    '都市間342マス — ソウルからニューヨークへは東ではなく北へ飛び立ちます',
    '342 Städtepaare — von Seoul nach New York startet man nach Norden, nicht nach Osten',
    '342 paires de villes — de Séoul à New York, on part vers le nord, pas vers l’est',
    '342 शहर-जोड़े — सियोल से न्यूयॉर्क के लिए पूर्व नहीं, उत्तर की ओर उड़ान भरते हैं',
    '342 组城市 — 从首尔飞纽约，起飞方向是北，不是东',
    '342 組城市 — 從首爾飛紐約，起飛方向是北，不是東',
  ),

  hubLead: T(
    '적는 것은 도시마다 위도·경도 두 숫자뿐입니다. 거리도 방위도 비행시간도 시차도 도착 시각도 전부 거기서 나옵니다. 지구가 둥그니 두 점을 잇는 가장 짧은 길은 지구 중심을 지나는 평면이 겉면을 자른 곡선이고, 평평한 지도가 그 곡선을 휘어 보이게 그릴 뿐입니다. 비행시간은 하나로 못 박지 않고 범위로 냅니다 — 편서풍을 타고 가는 쪽과 거스르는 쪽이 한두 시간씩 다르기 때문입니다.',
    'The only data written down is two numbers per city: latitude and longitude. Distance, initial heading, flight time, time difference and arrival time all follow from them. The Earth is round, so the shortest path between two points is the curve where a plane through the Earth’s centre cuts the surface — a flat map merely draws that curve bent. Flight times are given as a range rather than a single figure, because riding the jet stream and fighting it differ by an hour or two.',
    'Lo único que se anota son dos números por ciudad: latitud y longitud. La distancia, el rumbo inicial, el tiempo de vuelo, la diferencia horaria y la hora de llegada salen de ahí. La Tierra es redonda, así que el camino más corto entre dos puntos es la curva donde un plano que pasa por el centro corta la superficie; un mapa plano solo la dibuja arqueada. Los tiempos se dan como rango, no como cifra única: ir con la corriente en chorro o contra ella cambia una o dos horas.',
    'A única coisa anotada são dois números por cidade: latitude e longitude. Distância, rumo inicial, tempo de voo, diferença de fuso e hora de chegada saem daí. A Terra é redonda, então o caminho mais curto entre dois pontos é a curva onde um plano que passa pelo centro corta a superfície; um mapa plano apenas a desenha arqueada. Os tempos vêm como faixa, não como número único: pegar a corrente de jato ou enfrentá-la muda uma ou duas horas.',
    '書き留めるのは都市ごとの緯度・経度という二つの数だけです。距離も方位も飛行時間も時差も到着時刻も、すべてそこから出ます。地球は丸いので二点を結ぶ最短の道は、地球の中心を通る平面が表面を切る曲線であり、平らな地図がその曲線を曲がって見せているだけです。飛行時間は一つに決めず範囲で出します — 偏西風に乗る側と逆らう側で一、二時間違うからです。',
    'Aufgeschrieben werden nur zwei Zahlen je Stadt: Breite und Länge. Entfernung, Anfangskurs, Flugzeit, Zeitverschiebung und Ankunftszeit folgen daraus. Die Erde ist rund, der kürzeste Weg zwischen zwei Punkten ist also die Kurve, in der eine Ebene durch den Erdmittelpunkt die Oberfläche schneidet — eine flache Karte zeichnet diese Kurve bloß gebogen. Flugzeiten stehen als Spanne statt als eine Zahl, denn mit dem Jetstream und gegen ihn unterscheiden sich um ein bis zwei Stunden.',
    'On n’écrit que deux nombres par ville : latitude et longitude. Distance, cap initial, temps de vol, décalage horaire et heure d’arrivée en découlent. La Terre est ronde : le plus court chemin entre deux points est la courbe où un plan passant par le centre coupe la surface — une carte plate ne fait que la dessiner incurvée. Les temps de vol sont donnés en fourchette plutôt qu’en chiffre unique, car suivre le courant-jet ou le remonter change d’une à deux heures.',
    'लिखा जाता है सिर्फ़ हर शहर के दो अंक: अक्षांश और देशांतर। दूरी, आरंभिक दिशा, उड़ान समय, समय अंतर और पहुँचने का समय — सब वहीं से निकलते हैं। पृथ्वी गोल है, इसलिए दो बिंदुओं के बीच सबसे छोटा रास्ता वह वक्र है जहाँ केंद्र से गुज़रता तल सतह को काटता है; सपाट नक्शा उसे बस मुड़ा हुआ दिखाता है। उड़ान समय एक संख्या नहीं, परास में दिया गया है — जेट धारा के साथ और उसके विरुद्ध एक-दो घंटे का फ़र्क़ पड़ता है।',
    '写下来的只有每座城市的两个数字：纬度和经度。距离、起飞方向、飞行时间、时差、到达时刻，全都由此算出。地球是圆的，两点之间最短的路是过地心的平面切出的那条曲线，平面地图只是把它画弯了。飞行时间给的是区间而不是一个数——顺着急流飞和顶着急流飞，差一两个小时。',
    '寫下來的只有每座城市的兩個數字：緯度和經度。距離、起飛方向、飛行時間、時差、到達時刻，全都由此算出。地球是圓的，兩點之間最短的路是過地心的平面切出的那條曲線，平面地圖只是把它畫彎了。飛行時間給的是區間而不是一個數——順著噴射氣流飛和頂著飛，差一兩個小時。',
  ),

  distanceLabel: T('대권거리', 'Great-circle distance', 'Distancia ortodrómica', 'Distância ortodrômica', '大圏距離', 'Großkreisentfernung', 'Distance orthodromique', 'महावृत्त दूरी', '大圆距离', '大圓距離'),
  bearingLabel: T('떠날 때의 방위', 'Initial heading', 'Rumbo inicial', 'Rumo inicial', '出発時の方位', 'Anfangskurs', 'Cap initial', 'आरंभिक दिशा', '起飞方向', '起飛方向'),
  timeLabel: T('비행시간', 'Flight time', 'Tiempo de vuelo', 'Tempo de voo', '飛行時間', 'Flugzeit', 'Temps de vol', 'उड़ान समय', '飞行时间', '飛行時間'),
  shiftLabel: T('시차', 'Time difference', 'Diferencia horaria', 'Diferença de fuso', '時差', 'Zeitverschiebung', 'Décalage horaire', 'समय अंतर', '时差', '時差'),
  winterLabel: T('표준시', 'Standard time', 'Hora estándar', 'Hora padrão', '標準時', 'Normalzeit', 'Heure normale', 'मानक समय', '标准时间', '標準時間'),
  summerLabel: T('서머타임', 'Summer time', 'Horario de verano', 'Horário de verão', '夏時間', 'Sommerzeit', 'Heure d’été', 'ग्रीष्म समय', '夏令时', '夏令時'),
  shareLabel: T('지구 반 바퀴 대비', 'Share of half the globe', 'Sobre media vuelta al mundo', 'Sobre meia volta ao mundo', '地球半周比', 'Anteil am halben Erdumfang', 'Part d’un demi-tour du globe', 'आधी पृथ्वी का अंश', '占地球半圈', '佔地球半圈'),

  arriveTitle: T('언제 떠나면 몇 시에 닿는가', 'Leave at, arrive at', 'A qué hora se llega', 'A que horas se chega', '何時に出れば何時に着くか', 'Abflug und Ankunft', 'Départ et arrivée', 'कब निकलें, कब पहुँचें', '几点走，几点到', '幾點走，幾點到'),
  arriveNote: T(
    '떠나는 곳의 현지 시각에 비행시간을 얹고 시차를 더한 값입니다. 순풍 쪽 시간과 표준시 기준 시차를 썼습니다.',
    'Local departure time plus flight time plus the offset. Computed with the tailwind figure and the standard-time offset.',
    'Hora local de salida más tiempo de vuelo más el desfase. Calculado con la cifra a favor del viento y el desfase en hora estándar.',
    'Hora local de partida mais tempo de voo mais o deslocamento. Calculado com a cifra a favor do vento e o fuso em hora padrão.',
    '出発地の現地時刻に飛行時間を足し、時差を加えた値です。順風側の時間と標準時の時差を使いました。',
    'Örtliche Abflugzeit plus Flugzeit plus Verschiebung. Gerechnet mit dem Rückenwindwert und der Normalzeit-Verschiebung.',
    'Heure locale de départ plus temps de vol plus décalage. Calculé avec la valeur vent arrière et le décalage en heure normale.',
    'प्रस्थान की स्थानीय घड़ी में उड़ान समय और फिर समय अंतर जोड़ा गया है। पीछे से हवा वाली संख्या और मानक समय का अंतर लिया गया है।',
    '出发地当地时刻加上飞行时间，再加时差。用的是顺风那一档和标准时间的时差。',
    '出發地當地時刻加上飛行時間，再加時差。用的是順風那一檔和標準時間的時差。',
  ),
  departWord: T('출발', 'Depart', 'Salida', 'Partida', '出発', 'Abflug', 'Départ', 'प्रस्थान', '出发', '出發'),

  nextDay: T<(n: number) => string>(
    nexter('{sign}{n}일', '같은 날'),
    nexter('{sign}{n} day', 'same day'),
    nexter('{sign}{n} día', 'mismo día'),
    nexter('{sign}{n} dia', 'mesmo dia'),
    nexter('{sign}{n}日', '同じ日'),
    nexter('{sign}{n} Tag', 'selber Tag'),
    nexter('{sign}{n} jour', 'même jour'),
    nexter('{sign}{n} दिन', 'उसी दिन'),
    nexter('{sign}{n}天', '当天'),
    nexter('{sign}{n}天', '當天'),
  ),

  duration: T<(h: number, m: number) => string>(
    dur('시간', '분'), dur('h', 'm'), dur(' h', ' min'), dur(' h', ' min'), dur('時間', '分'),
    dur(' Std.', ' Min.'), dur(' h', ' min'), dur(' घं', ' मि'), dur('小时', '分'), dur('小時', '分'),
  ),

  shiftText: T<(m: number) => string>(
    shifter('{n}시간 빠름', '{n}시간 느림', '시차 없음', '시간 '),
    shifter('{n} h ahead', '{n} h behind', 'no difference', ':'),
    shifter('{n} h por delante', '{n} h por detrás', 'sin diferencia', ':'),
    shifter('{n} h à frente', '{n} h atrás', 'sem diferença', ':'),
    shifter('{n}時間進み', '{n}時間遅れ', '時差なし', '時間'),
    shifter('{n} Std. voraus', '{n} Std. zurück', 'kein Unterschied', ':'),
    shifter('{n} h d’avance', '{n} h de retard', 'aucun décalage', ':'),
    shifter('{n} घंटे आगे', '{n} घंटे पीछे', 'कोई अंतर नहीं', ':'),
    shifter('快 {n} 小时', '慢 {n} 小时', '没有时差', ':'),
    shifter('快 {n} 小時', '慢 {n} 小時', '沒有時差', ':'),
  ),

  greatCircleTitle: T('지도에서 휘어 보이는 까닭', 'Why the route looks bent on a map', 'Por qué la ruta parece curva en el mapa', 'Por que a rota parece curva no mapa', '地図で曲がって見える理由', 'Warum die Route auf der Karte gebogen wirkt', 'Pourquoi la route paraît courbée sur une carte', 'नक्शे पर रास्ता मुड़ा क्यों दिखता है', '航线在地图上为什么是弯的', '航線在地圖上為什麼是彎的'),
  greatCircleNote: T(
    '지구는 공이고 지도는 종이입니다. 공을 종이에 펴려면 어딘가를 늘려야 하고, 흔히 쓰는 지도는 극지방을 크게 늘립니다. 그래서 실제로는 가장 짧은 길인 북극 근처의 곡선이 지도에서는 멀리 돌아가는 것처럼 보입니다. 서울에서 뉴욕까지 위도만 따라 동쪽으로 가면 훨씬 멉니다 — 북쪽으로 떠나는 것이 지름길입니다.',
    'The Earth is a ball and a map is paper. Flattening a ball means stretching something, and the common maps stretch the poles the most. So the genuinely shortest path, a curve near the North Pole, is drawn as a long detour. Flying east along the same latitude from Seoul to New York is much further — heading north is the shortcut.',
    'La Tierra es una bola y el mapa es papel. Aplanar una bola obliga a estirar algo, y los mapas habituales estiran sobre todo los polos. Por eso el camino realmente más corto, una curva cerca del Polo Norte, se dibuja como un rodeo enorme. Ir hacia el este por la misma latitud de Seúl a Nueva York es mucho más largo: salir hacia el norte es el atajo.',
    'A Terra é uma bola e o mapa é papel. Achatar uma bola obriga a esticar algo, e os mapas comuns esticam sobretudo os polos. Por isso o caminho realmente mais curto, uma curva perto do Polo Norte, aparece como um desvio enorme. Ir para leste pela mesma latitude de Seul a Nova York é bem mais longe: partir para o norte é o atalho.',
    '地球は球で地図は紙です。球を紙に伸ばすにはどこかを引き伸ばすしかなく、よく使う地図は極地方を大きく伸ばします。だから実際には最短である北極近くの曲線が、地図では遠回りに見えます。ソウルからニューヨークまで緯度をたどって東へ行くとずっと遠く、北へ飛び立つほうが近道です。',
    'Die Erde ist eine Kugel, die Karte ist Papier. Eine Kugel flach zu legen heißt, irgendwo zu dehnen, und die gängigen Karten dehnen die Pole am stärksten. Deshalb erscheint der tatsächlich kürzeste Weg — eine Kurve nahe dem Nordpol — als weiter Umweg. Von Seoul nach New York entlang derselben Breite nach Osten zu fliegen ist viel weiter; nach Norden zu starten ist die Abkürzung.',
    'La Terre est une boule, la carte est du papier. Aplatir une boule oblige à étirer quelque part, et les cartes courantes étirent surtout les pôles. Le chemin réellement le plus court, une courbe près du pôle Nord, y apparaît donc comme un grand détour. Aller vers l’est en suivant la même latitude de Séoul à New York est bien plus long : partir vers le nord est le raccourci.',
    'पृथ्वी गोला है और नक्शा काग़ज़। गोले को चपटा करने के लिए कहीं न कहीं खींचना पड़ता है, और आम नक्शे ध्रुवों को सबसे ज़्यादा खींचते हैं। इसलिए असल में सबसे छोटा रास्ता — उत्तरी ध्रुव के पास का वक्र — नक्शे पर बड़ा चक्कर लगता है। सियोल से न्यूयॉर्क उसी अक्षांश पर पूर्व की ओर जाना कहीं ज़्यादा दूर है; उत्तर की ओर उड़ना ही शॉर्टकट है।',
    '地球是个球，地图是张纸。把球摊平就得拉伸某处，而常见的地图把两极拉得最厉害。所以真正最短的那条靠近北极的曲线，在地图上看着像绕远路。从首尔沿着同一纬度往东飞到纽约要远得多——朝北起飞才是近路。',
    '地球是個球，地圖是張紙。把球攤平就得拉伸某處，而常見的地圖把兩極拉得最厲害。所以真正最短的那條靠近北極的曲線，在地圖上看著像繞遠路。從首爾沿著同一緯度往東飛到紐約要遠得多——朝北起飛才是近路。',
  ),

  windTitle: T('가는 편과 오는 편이 다릅니다', 'The outbound and the return differ', 'La ida y la vuelta no duran igual', 'A ida e a volta não duram igual', '行きと帰りで違います', 'Hin- und Rückflug unterscheiden sich', 'L’aller et le retour diffèrent', 'जाना और लौटना अलग है', '去程和回程不一样', '去程和回程不一樣'),
  windNote: T(
    '거리는 방향에 상관없이 같지만 걸리는 시간은 다릅니다. 중위도 상공에는 서쪽에서 동쪽으로 부는 강한 바람(제트기류)이 있어, 동쪽으로 갈 때는 밀어 주고 서쪽으로 갈 때는 막아섭니다. 인천–LA처럼 태평양을 건너는 구간에서는 그 차이가 한두 시간에 이릅니다. 그래서 이 표는 시간을 하나로 적지 않고 범위로 냅니다.',
    'The distance is the same in either direction, but the time is not. High over the mid-latitudes runs a strong west-to-east wind — the jet stream — which pushes you going east and blocks you going west. Across the Pacific the gap reaches an hour or two. That is why the times here are a range rather than one number.',
    'La distancia es la misma en ambos sentidos, pero el tiempo no. Sobre las latitudes medias sopla un viento fuerte de oeste a este —la corriente en chorro— que empuja al ir hacia el este y frena al ir hacia el oeste. Cruzando el Pacífico la diferencia llega a una o dos horas. Por eso aquí los tiempos son un rango y no una cifra.',
    'A distância é a mesma nos dois sentidos, mas o tempo não. Sobre as latitudes médias sopra um vento forte de oeste para leste — a corrente de jato — que empurra na ida para leste e trava na ida para oeste. Cruzando o Pacífico a diferença chega a uma ou duas horas. Por isso os tempos aqui são uma faixa, não um número.',
    '距離は向きに関わらず同じですが、かかる時間は違います。中緯度の上空には西から東へ吹く強い風(ジェット気流)があり、東へ行くときは押してくれ、西へ行くときは阻みます。太平洋を渡る区間ではその差が一、二時間に達します。だからこの表は時間を一つに書かず範囲で出します。',
    'Die Entfernung ist in beide Richtungen gleich, die Zeit nicht. Hoch über den mittleren Breiten weht ein starker West-Ost-Wind — der Jetstream — der nach Osten schiebt und nach Westen bremst. Über dem Pazifik erreicht der Unterschied ein bis zwei Stunden. Deshalb stehen die Zeiten hier als Spanne und nicht als eine Zahl.',
    'La distance est la même dans les deux sens, le temps non. Au-dessus des latitudes moyennes souffle un vent fort d’ouest en est — le courant-jet — qui pousse vers l’est et freine vers l’ouest. Au-dessus du Pacifique l’écart atteint une à deux heures. D’où des temps donnés en fourchette plutôt qu’en un seul chiffre.',
    'दूरी दोनों दिशाओं में एक-सी है, समय नहीं। मध्य अक्षांशों के ऊपर पश्चिम से पूर्व बहती तेज़ हवा — जेट धारा — पूर्व जाते समय धकेलती है और पश्चिम जाते समय रोकती है। प्रशांत पार करते समय यह फ़र्क़ एक-दो घंटे तक पहुँचता है। इसीलिए यहाँ समय एक संख्या नहीं, परास है।',
    '距离两个方向一样，时间却不一样。中纬度高空有一股自西向东的强风——急流——往东飞时推你，往西飞时挡你。跨太平洋的航段，这个差能到一两个小时。所以这张表给的是区间，不是一个数。',
    '距離兩個方向一樣，時間卻不一樣。中緯度高空有一股自西向東的強風——噴射氣流——往東飛時推你，往西飛時擋你。跨太平洋的航段，這個差能到一兩個小時。所以這張表給的是區間，不是一個數。',
  ),

  dstTitle: T('시차도 하나가 아닙니다', 'The time difference is not one number either', 'El desfase tampoco es único', 'O fuso também não é um só', '時差も一つではありません', 'Auch die Zeitverschiebung ist nicht eine Zahl', 'Le décalage non plus n’est pas unique', 'समय अंतर भी एक नहीं है', '时差也不是一个数', '時差也不是一個數'),
  dstNote: T(
    '서머타임을 쓰는 도시는 여름과 겨울의 시차가 한 시간 다릅니다. 서울–뉴욕이 14시간일 때도 있고 13시간일 때도 있는 것이 그래서입니다. 시작·종료일은 나라마다 다르고 해마다 바뀌므로, 이 표는 숫자를 적어 두지 않고 표준시와 서머타임 두 값을 모두 냅니다.',
    'Cities that observe summer time sit an hour apart in July from where they sit in January. That is why Seoul and New York are sometimes 14 hours apart and sometimes 13. Start and end dates differ by country and move from year to year, so this chart does not hard-code a number — it gives both the standard-time and summer-time values.',
    'Las ciudades con horario de verano quedan a una hora de distinta separación en julio que en enero. Por eso Seúl y Nueva York están a veces a 14 horas y a veces a 13. Las fechas de inicio y fin cambian por país y por año, así que esta tabla no fija un número: da el valor en hora estándar y el de verano.',
    'Cidades com horário de verão ficam a uma hora de diferença em julho em relação a janeiro. Por isso Seul e Nova York às vezes distam 14 horas e às vezes 13. As datas de início e fim variam por país e por ano, então esta tabela não fixa um número: dá o valor em hora padrão e o de verão.',
    '夏時間を使う都市は、夏と冬で時差が一時間違います。ソウルとニューヨークが14時間のときも13時間のときもあるのはそのためです。開始・終了日は国ごとに違い年ごとに変わるので、この表は数字を書き留めず、標準時と夏時間の両方を出します。',
    'Städte mit Sommerzeit liegen im Juli eine Stunde anders zu einem als im Januar. Deshalb trennen Seoul und New York mal 14, mal 13 Stunden. Beginn und Ende unterscheiden sich je Land und verschieben sich jährlich — diese Tabelle schreibt daher keine Zahl fest, sondern nennt den Normalzeit- und den Sommerzeitwert.',
    'Les villes à heure d’été sont en juillet à une heure d’écart de ce qu’elles sont en janvier. D’où Séoul et New York tantôt à 14 heures, tantôt à 13. Les dates de début et de fin varient selon les pays et les années : ce tableau ne fige donc pas un chiffre, il donne la valeur en heure normale et celle en heure d’été.',
    'ग्रीष्म समय मानने वाले शहरों का अंतर जुलाई में जनवरी से एक घंटा अलग होता है। इसीलिए सियोल और न्यूयॉर्क कभी 14 घंटे दूर होते हैं, कभी 13। शुरू और अंत की तारीख़ें देश और वर्ष के साथ बदलती हैं, इसलिए यह तालिका कोई संख्या तय नहीं करती — मानक समय और ग्रीष्म समय दोनों देती है।',
    '实行夏令时的城市，七月和一月的时差差一个小时。首尔和纽约有时差 14 小时，有时 13 小时，就是这个缘故。起止日期各国不同、逐年变动，所以这张表不写死数字，而是把标准时间和夏令时两个值都给出来。',
    '實行夏令時的城市，七月和一月的時差差一個小時。首爾和紐約有時差 14 小時，有時 13 小時，就是這個緣故。起訖日期各國不同、逐年變動，所以這張表不寫死數字，而是把標準時間和夏令時兩個值都給出來。',
  ),

  centerTitle: T('공항이 아니라 도심 기준입니다', 'Measured from city centres, not airports', 'Medido desde el centro, no desde el aeropuerto', 'Medido do centro, não do aeroporto', '空港ではなく都心が基準です', 'Gemessen ab Stadtzentrum, nicht ab Flughafen', 'Mesuré depuis le centre-ville, pas l’aéroport', 'हवाई अड्डा नहीं, शहर के केंद्र से', '按市中心算，不是机场', '按市中心算，不是機場'),
  centerNote: T(
    '좌표는 도심 기준이라, 항공사가 적는 공항 사이 거리와는 조금 다릅니다. 공항은 대개 도심에서 수십 킬로 떨어져 있지만, 서울–뉴욕처럼 만 킬로가 넘는 구간에서는 그 차이가 1%가 안 됩니다.',
    'The coordinates are city centres, so these figures differ slightly from the airport-to-airport distances airlines quote. Airports usually sit tens of kilometres out, which on a route over 10,000 km comes to well under 1%.',
    'Las coordenadas son del centro urbano, así que estas cifras difieren un poco de las distancias entre aeropuertos que citan las aerolíneas. Los aeropuertos suelen estar a decenas de kilómetros, lo que en una ruta de más de 10.000 km supone bastante menos del 1%.',
    'As coordenadas são do centro da cidade, então estes números diferem um pouco das distâncias entre aeroportos que as companhias citam. Aeroportos costumam ficar a dezenas de quilômetros, o que numa rota de mais de 10.000 km dá bem menos de 1%.',
    '座標は都心基準なので、航空会社が示す空港間の距離とは少し違います。空港はたいてい都心から数十キロ離れていますが、ソウル–ニューヨークのような一万キロ超の区間では差が1%に届きません。',
    'Die Koordinaten sind Stadtzentren, weshalb diese Werte leicht von den Flughafen-zu-Flughafen-Entfernungen der Airlines abweichen. Flughäfen liegen meist Dutzende Kilometer außerhalb, was auf einer Strecke über 10.000 km deutlich unter 1% ausmacht.',
    'Les coordonnées sont celles des centres-villes : ces chiffres diffèrent donc un peu des distances d’aéroport à aéroport citées par les compagnies. Les aéroports sont généralement à des dizaines de kilomètres, ce qui, sur une route de plus de 10 000 km, reste bien sous 1%.',
    'निर्देशांक शहर के केंद्र के हैं, इसलिए ये आँकड़े एयरलाइनों द्वारा बताई गई हवाई अड्डा-से-हवाई अड्डा दूरी से थोड़े अलग हैं। हवाई अड्डे आम तौर पर दसियों किलोमीटर बाहर होते हैं, जो 10,000 किमी से लंबे मार्ग पर 1% से काफ़ी कम है।',
    '坐标取的是市中心，所以和航空公司标的机场间距离略有出入。机场通常在市区外几十公里，放在一万公里以上的航段里，差得远不到 1%。',
    '座標取的是市中心，所以和航空公司標的機場間距離略有出入。機場通常在市區外幾十公里，放在一萬公里以上的航段裡，差得遠不到 1%。',
  ),

  reverseTitle: T('되돌아가는 편', 'The return leg', 'El trayecto de vuelta', 'O trecho de volta', '帰りの便', 'Der Rückflug', 'Le trajet retour', 'वापसी', '回程', '回程'),
  fromRowTitle: T('이 도시에서 떠나는 곳', 'From this city', 'Desde esta ciudad', 'Desta cidade', 'この都市から', 'Von dieser Stadt', 'Depuis cette ville', 'इस शहर से', '从这座城市出发', '從這座城市出發'),
  toRowTitle: T('이 도시로 닿는 곳', 'To this city', 'Hacia esta ciudad', 'Para esta cidade', 'この都市へ', 'Zu dieser Stadt', 'Vers cette ville', 'इस शहर तक', '飞往这座城市', '飛往這座城市'),

  howTitle: T('읽는 법', 'How to read it', 'Cómo se lee', 'Como ler', '読み方', 'So liest man es', 'Comment le lire', 'कैसे पढ़ें', '怎么读', '怎麼讀'),

  how: T<string[]>(
    [
      '적는 것은 도시마다 위도·경도 두 숫자뿐입니다.',
      '거리는 하버사인으로 잽니다 — 좌표를 그냥 빼면 지구가 둥근 것을 놓칩니다.',
      '어떤 두 점도 지구 둘레의 절반인 20,015km보다 멀 수 없습니다.',
      '떠날 때의 방위는 가면서 바뀝니다. 대권은 곧은 방위로 가는 길이 아닙니다.',
      '비행시간은 거리 ÷ 대지속도 + 활주·이착륙 시간이고, 바람 때문에 범위로 냅니다.',
      '시차는 서머타임 때문에 반년마다 바뀌므로 표준시와 서머타임을 함께 적습니다.',
    ],
    [
      'The only data is two numbers per city: latitude and longitude.',
      'Distance comes from the haversine formula — subtracting coordinates would ignore that the Earth is round.',
      'No two points can be further apart than 20,015 km, half the Earth’s circumference.',
      'The initial heading changes as you go. A great circle is not a constant-bearing route.',
      'Flight time is distance ÷ ground speed plus taxi and climb, given as a range because of wind.',
      'The time difference shifts twice a year with summer time, so both values are listed.',
    ],
    [
      'Lo único que se anota son dos números por ciudad: latitud y longitud.',
      'La distancia sale de la fórmula del haversine: restar coordenadas ignoraría que la Tierra es redonda.',
      'Dos puntos no pueden distar más de 20.015 km, la mitad de la circunferencia terrestre.',
      'El rumbo inicial cambia sobre la marcha. Una ortodrómica no es una ruta de rumbo constante.',
      'El tiempo es distancia ÷ velocidad respecto al suelo más rodaje y ascenso, dado como rango por el viento.',
      'El desfase cambia dos veces al año con el horario de verano, así que se dan ambos valores.',
    ],
    [
      'A única coisa anotada são dois números por cidade: latitude e longitude.',
      'A distância vem da fórmula de haversine — subtrair coordenadas ignoraria que a Terra é redonda.',
      'Dois pontos não podem distar mais que 20.015 km, metade da circunferência terrestre.',
      'O rumo inicial muda ao longo do caminho. Uma ortodrômica não é rota de rumo constante.',
      'O tempo é distância ÷ velocidade em relação ao solo mais táxi e subida, dado como faixa por causa do vento.',
      'O fuso muda duas vezes por ano com o horário de verão, então os dois valores são listados.',
    ],
    [
      '書き留めるのは都市ごとの緯度・経度という二つの数だけです。',
      '距離はハバサインで測ります — 座標をそのまま引くと地球が丸いことを取りこぼします。',
      'どの二点も地球一周の半分である20,015kmより遠くはなれません。',
      '出発時の方位は進むにつれて変わります。大圏は方位一定の道ではありません。',
      '飛行時間は距離÷対地速度に滑走・上昇の時間を足したもので、風のため範囲で出します。',
      '時差は夏時間で半年ごとに変わるので、標準時と夏時間の両方を書きます。',
    ],
    [
      'Aufgeschrieben werden nur zwei Zahlen je Stadt: Breite und Länge.',
      'Die Entfernung stammt aus der Haversine-Formel — Koordinaten zu subtrahieren überginge die Kugelgestalt.',
      'Keine zwei Punkte liegen weiter auseinander als 20.015 km, den halben Erdumfang.',
      'Der Anfangskurs ändert sich unterwegs. Ein Großkreis ist keine Route mit festem Kurs.',
      'Die Flugzeit ist Entfernung ÷ Geschwindigkeit über Grund plus Rollen und Steigen, wegen des Windes als Spanne.',
      'Die Zeitverschiebung springt zweimal im Jahr mit der Sommerzeit, daher stehen beide Werte da.',
    ],
    [
      'On n’écrit que deux nombres par ville : latitude et longitude.',
      'La distance vient de la formule de haversine — soustraire les coordonnées ignorerait la rondeur de la Terre.',
      'Deux points ne peuvent être distants de plus de 20 015 km, la moitié de la circonférence terrestre.',
      'Le cap initial change en route. Une orthodromie n’est pas une route à cap constant.',
      'Le temps vaut distance ÷ vitesse sol plus roulage et montée, donné en fourchette à cause du vent.',
      'Le décalage bascule deux fois par an avec l’heure d’été : les deux valeurs sont indiquées.',
    ],
    [
      'लिखा जाता है सिर्फ़ हर शहर के दो अंक: अक्षांश और देशांतर।',
      'दूरी हैवरसाइन सूत्र से आती है — निर्देशांक घटाने से पृथ्वी का गोलपन छूट जाता।',
      'कोई भी दो बिंदु 20,015 किमी से ज़्यादा दूर नहीं हो सकते, यानी आधी परिधि।',
      'आरंभिक दिशा रास्ते में बदलती रहती है। महावृत्त स्थिर दिशा वाला मार्ग नहीं है।',
      'उड़ान समय = दूरी ÷ भू-गति, साथ में टैक्सी और चढ़ाई; हवा के कारण परास में दिया गया है।',
      'ग्रीष्म समय के कारण अंतर साल में दो बार बदलता है, इसलिए दोनों मान दिए गए हैं।',
    ],
    [
      '写下来的只有每座城市的两个数字：纬度和经度。',
      '距离用半正矢公式算——直接相减会漏掉地球是圆的这件事。',
      '任意两点相距不会超过 20,015 公里，也就是地球周长的一半。',
      '起飞方向一路都在变。大圆航线不是保持固定方位的路线。',
      '飞行时间 = 距离 ÷ 地速，再加滑行和爬升；因为风的缘故给的是区间。',
      '时差每半年随夏令时变一次，所以标准时间和夏令时都列出来。',
    ],
    [
      '寫下來的只有每座城市的兩個數字：緯度和經度。',
      '距離用半正矢公式算——直接相減會漏掉地球是圓的這件事。',
      '任意兩點相距不會超過 20,015 公里，也就是地球周長的一半。',
      '起飛方向一路都在變。大圓航線不是保持固定方位的路線。',
      '飛行時間 = 距離 ÷ 地速，再加滑行和爬升；因為風的緣故給的是區間。',
      '時差每半年隨夏令時變一次，所以標準時間和夏令時都列出來。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'सामान्य प्रश्न', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '도시 사이 거리와 비행시간 — 열아홉 도시 342칸',
    'City distances and flight times — 342 pairs across nineteen cities',
    'Distancias y tiempos de vuelo — 342 pares de diecinueve ciudades',
    'Distâncias e tempos de voo — 342 pares de dezenove cidades',
    '都市間の距離と飛行時間 — 19都市342マス',
    'Städtedistanzen und Flugzeiten — 342 Paare aus neunzehn Städten',
    'Distances et temps de vol — 342 paires sur dix-neuf villes',
    'शहरों की दूरी और उड़ान समय — उन्नीस शहरों के 342 जोड़े',
    '城市间距离与飞行时间 — 十九座城市 342 组',
    '城市間距離與飛行時間 — 十九座城市 342 組',
  ),
  hubMetaDesc: T(
    '위도·경도 두 숫자에서 거리·방위·비행시간·시차·도착 시각을 냅니다. 서울에서 뉴욕은 동쪽이 아니라 북쪽으로 떠납니다.',
    'Distance, heading, flight time, time difference and arrival time, all from two numbers per city. Leaving Seoul for New York you head north, not east.',
    'Distancia, rumbo, tiempo de vuelo, desfase y hora de llegada, todo a partir de dos números por ciudad. De Seúl a Nueva York se sale hacia el norte, no hacia el este.',
    'Distância, rumo, tempo de voo, fuso e hora de chegada, tudo a partir de dois números por cidade. De Seul para Nova York parte-se para o norte, não para o leste.',
    '緯度・経度の二つの数から距離・方位・飛行時間・時差・到着時刻を出します。ソウルからニューヨークへは東ではなく北へ飛び立ちます。',
    'Entfernung, Kurs, Flugzeit, Zeitverschiebung und Ankunftszeit — alles aus zwei Zahlen je Stadt. Von Seoul nach New York startet man nach Norden, nicht nach Osten.',
    'Distance, cap, temps de vol, décalage et heure d’arrivée, le tout à partir de deux nombres par ville. De Séoul à New York, on part vers le nord, pas vers l’est.',
    'हर शहर के दो अंकों से दूरी, दिशा, उड़ान समय, समय अंतर और पहुँचने का समय। सियोल से न्यूयॉर्क के लिए पूर्व नहीं, उत्तर की ओर।',
    '由每座城市的两个数字算出距离、方向、飞行时间、时差和到达时刻。从首尔飞纽约，起飞方向是北，不是东。',
    '由每座城市的兩個數字算出距離、方向、飛行時間、時差和到達時刻。從首爾飛紐約，起飛方向是北，不是東。',
  ),

  metaTitle: T<(f: FlightFacts) => string>(
    f => `${f.km.toLocaleString('en-US')}km`,
    f => `${f.km.toLocaleString('en-US')} km`,
    f => `${f.km.toLocaleString('en-US')} km`,
    f => `${f.km.toLocaleString('en-US')} km`,
    f => `${f.km.toLocaleString('en-US')}km`,
    f => `${f.km.toLocaleString('en-US')} km`,
    f => `${f.km.toLocaleString('en-US')} km`,
    f => `${f.km.toLocaleString('en-US')} km`,
    f => `${f.km.toLocaleString('en-US')} 公里`,
    f => `${f.km.toLocaleString('en-US')} 公里`,
  ),

  metaDesc: T<(f: FlightFacts) => string>(
    f => `대권거리 ${f.km.toLocaleString('en-US')}km(${f.miles.toLocaleString('en-US')}마일), 떠날 때의 방위는 ${f.bearing}도(${f.compass})입니다. 지구 반 바퀴의 ${f.share}%이고, 바람에 따라 걸리는 시간이 달라집니다.`,
    f => `${f.km.toLocaleString('en-US')} km (${f.miles.toLocaleString('en-US')} miles) as the great circle runs, on an initial heading of ${f.bearing}° (${f.compass}). That is ${f.share}% of half the globe, and the wind decides how long it takes.`,
    f => `${f.km.toLocaleString('en-US')} km (${f.miles.toLocaleString('en-US')} millas) por la ortodrómica, con rumbo inicial ${f.bearing}° (${f.compass}). Es el ${f.share}% de media vuelta al mundo, y el viento decide cuánto se tarda.`,
    f => `${f.km.toLocaleString('en-US')} km (${f.miles.toLocaleString('en-US')} milhas) pela ortodrômica, com rumo inicial ${f.bearing}° (${f.compass}). É ${f.share}% de meia volta ao mundo, e o vento decide quanto demora.`,
    f => `大圏距離 ${f.km.toLocaleString('en-US')}km(${f.miles.toLocaleString('en-US')}マイル)、出発時の方位は${f.bearing}度(${f.compass})です。地球半周の${f.share}%で、かかる時間は風が決めます。`,
    f => `${f.km.toLocaleString('en-US')} km (${f.miles.toLocaleString('en-US')} Meilen) auf dem Großkreis, Anfangskurs ${f.bearing}° (${f.compass}). Das sind ${f.share}% des halben Erdumfangs, und der Wind entscheidet über die Dauer.`,
    f => `${f.km.toLocaleString('en-US')} km (${f.miles.toLocaleString('en-US')} milles) à l’orthodromie, cap initial ${f.bearing}° (${f.compass}). Soit ${f.share}% d’un demi-tour du globe, et le vent décide de la durée.`,
    f => `महावृत्त दूरी ${f.km.toLocaleString('en-US')} किमी (${f.miles.toLocaleString('en-US')} मील), आरंभिक दिशा ${f.bearing}° (${f.compass})। यह आधी पृथ्वी का ${f.share}% है, और समय हवा तय करती है।`,
    f => `大圆距离 ${f.km.toLocaleString('en-US')} 公里（${f.miles.toLocaleString('en-US')} 英里），起飞方向 ${f.bearing}°（${f.compass}）。相当于地球半圈的 ${f.share}%，用多久由风决定。`,
    f => `大圓距離 ${f.km.toLocaleString('en-US')} 公里（${f.miles.toLocaleString('en-US')} 英里），起飛方向 ${f.bearing}°（${f.compass}）。相當於地球半圈的 ${f.share}%，用多久由風決定。`,
  ),

  desc: T<(f: FlightFacts) => string>(
    f => `대권거리 ${f.km.toLocaleString('en-US')}km, 떠날 때의 방위는 ${f.bearing}도(${f.compass})입니다. 지구 반 바퀴의 ${f.share}%입니다.`,
    f => `${f.km.toLocaleString('en-US')} km along the great circle, leaving on a heading of ${f.bearing}° (${f.compass}) — ${f.share}% of half the globe.`,
    f => `${f.km.toLocaleString('en-US')} km por la ortodrómica, saliendo con rumbo ${f.bearing}° (${f.compass}): el ${f.share}% de media vuelta al mundo.`,
    f => `${f.km.toLocaleString('en-US')} km pela ortodrômica, partindo com rumo ${f.bearing}° (${f.compass}): ${f.share}% de meia volta ao mundo.`,
    f => `大圏距離 ${f.km.toLocaleString('en-US')}km、出発時の方位は${f.bearing}度(${f.compass})です。地球半周の${f.share}%にあたります。`,
    f => `${f.km.toLocaleString('en-US')} km auf dem Großkreis, Start mit Kurs ${f.bearing}° (${f.compass}) — ${f.share}% des halben Erdumfangs.`,
    f => `${f.km.toLocaleString('en-US')} km à l’orthodromie, départ au cap ${f.bearing}° (${f.compass}) — ${f.share}% d’un demi-tour du globe.`,
    f => `महावृत्त पर ${f.km.toLocaleString('en-US')} किमी, प्रस्थान दिशा ${f.bearing}° (${f.compass}) — आधी पृथ्वी का ${f.share}%।`,
    f => `大圆距离 ${f.km.toLocaleString('en-US')} 公里，起飞方向 ${f.bearing}°（${f.compass}），相当于地球半圈的 ${f.share}%。`,
    f => `大圓距離 ${f.km.toLocaleString('en-US')} 公里，起飛方向 ${f.bearing}°（${f.compass}），相當於地球半圈的 ${f.share}%。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '왜 항로가 지도에서 북쪽으로 휘어 보이나요?', a: '실제로 그쪽이 짧기 때문입니다. 지구는 공인데 지도는 종이라, 공을 펴려면 극지방을 크게 늘려야 합니다. 그래서 북극 근처를 지나는 최단 경로가 지도에서는 멀리 도는 것처럼 그려집니다.' },
      { q: '가는 편과 오는 편의 시간이 왜 다른가요?', a: '중위도 상공에 서쪽에서 동쪽으로 부는 제트기류가 있어, 동쪽으로 갈 때는 밀어 주고 서쪽으로 갈 때는 막아섭니다. 거리는 같아도 시간이 한두 시간 벌어집니다.' },
      { q: '여기 적힌 시차가 지금과 다른데요?', a: '서머타임 때문입니다. 쓰는 도시는 여름과 겨울의 시차가 한 시간 다르므로 이 표는 두 값을 다 냅니다 — 표준시 기준과 서머타임 기준입니다.' },
      { q: '항공사가 적는 거리와 다릅니다.', a: '여기 좌표는 도심 기준이고 항공사는 공항 기준입니다. 공항은 도심에서 수십 킬로 떨어져 있어, 만 킬로가 넘는 구간에서는 1%가 안 되는 차이입니다. 실제 항로는 영공과 항공로를 따라 더 돌기도 합니다.' },
    ],
    [
      { q: 'Why does the route bend north on a map?', a: 'Because that really is shorter. The Earth is a ball and a map is paper; flattening the ball stretches the polar regions most, so the genuinely shortest path near the pole gets drawn as a detour.' },
      { q: 'Why do the outbound and return take different times?', a: 'A jet stream runs west to east high over the mid-latitudes, pushing you eastbound and blocking you westbound. Same distance, but an hour or two apart in time.' },
      { q: 'The time difference here does not match right now.', a: 'That is summer time. Cities that observe it sit an hour differently in July than in January, so this chart gives both values — the standard-time one and the summer-time one.' },
      { q: 'It differs from the distance my airline quotes.', a: 'These coordinates are city centres; airlines measure airport to airport. Airports sit tens of kilometres out, which is under 1% on a route over 10,000 km. Real routes also detour around airspace and along airways.' },
    ],
    [
      { q: '¿Por qué la ruta se curva hacia el norte en el mapa?', a: 'Porque realmente es más corta. La Tierra es una bola y el mapa es papel; al aplanarla se estiran sobre todo las zonas polares, así que el camino más corto cerca del polo se dibuja como un rodeo.' },
      { q: '¿Por qué la ida y la vuelta duran distinto?', a: 'Sobre las latitudes medias sopla una corriente en chorro de oeste a este que empuja hacia el este y frena hacia el oeste. Misma distancia, una o dos horas de diferencia.' },
      { q: 'El desfase que veo aquí no coincide con el de ahora.', a: 'Es el horario de verano. Las ciudades que lo aplican quedan a una hora distinta en julio que en enero, así que la tabla da ambos valores: hora estándar y horario de verano.' },
      { q: 'No coincide con la distancia que da mi aerolínea.', a: 'Estas coordenadas son del centro urbano; las aerolíneas miden de aeropuerto a aeropuerto. Los aeropuertos están a decenas de kilómetros, menos del 1% en rutas de más de 10.000 km. Las rutas reales además rodean espacios aéreos y siguen aerovías.' },
    ],
    [
      { q: 'Por que a rota se curva para o norte no mapa?', a: 'Porque de fato é mais curta. A Terra é uma bola e o mapa é papel; achatá-la estica sobretudo as regiões polares, então o caminho mais curto perto do polo é desenhado como desvio.' },
      { q: 'Por que a ida e a volta duram diferente?', a: 'Sobre as latitudes médias corre uma corrente de jato de oeste para leste, que empurra na ida para leste e trava na ida para oeste. Mesma distância, uma ou duas horas de diferença.' },
      { q: 'O fuso aqui não bate com o de agora.', a: 'É o horário de verão. Cidades que o adotam ficam a uma hora diferente em julho e em janeiro, então a tabela dá os dois valores: hora padrão e horário de verão.' },
      { q: 'Não bate com a distância que a companhia informa.', a: 'Estas coordenadas são do centro; as companhias medem de aeroporto a aeroporto. Aeroportos ficam a dezenas de quilômetros, menos de 1% em rotas acima de 10.000 km. Rotas reais ainda desviam por espaço aéreo e aerovias.' },
    ],
    [
      { q: 'なぜ航路が地図で北へ曲がって見えるのですか。', a: '実際にそちらが短いからです。地球は球で地図は紙なので、平らにすると極地方が大きく伸びます。そのため極の近くを通る最短経路が、地図では遠回りのように描かれます。' },
      { q: '行きと帰りで時間が違うのはなぜですか。', a: '中緯度の上空を西から東へジェット気流が流れていて、東へ行くときは押し、西へ行くときは阻みます。距離は同じでも一、二時間の差が出ます。' },
      { q: 'ここの時差が今と合いません。', a: '夏時間のためです。採用している都市は夏と冬で時差が一時間違うので、この表は標準時と夏時間の両方を出しています。' },
      { q: '航空会社の距離と違います。', a: 'ここの座標は都心、航空会社は空港どうしです。空港は都心から数十キロ離れており、一万キロ超の区間では1%未満の差です。実際の航路は空域や航空路に沿ってさらに回ることもあります。' },
    ],
    [
      { q: 'Warum biegt die Route auf der Karte nach Norden?', a: 'Weil sie so tatsächlich kürzer ist. Die Erde ist eine Kugel, die Karte Papier; beim Plattmachen werden die Polregionen am stärksten gedehnt, sodass der wirklich kürzeste Weg nahe dem Pol als Umweg erscheint.' },
      { q: 'Warum dauern Hin- und Rückflug unterschiedlich lang?', a: 'Hoch über den mittleren Breiten läuft ein Jetstream von West nach Ost, der ostwärts schiebt und westwärts bremst. Gleiche Entfernung, ein bis zwei Stunden Unterschied.' },
      { q: 'Die Zeitverschiebung hier stimmt gerade nicht.', a: 'Das ist die Sommerzeit. Städte, die sie nutzen, liegen im Juli anders als im Januar, deshalb nennt die Tabelle beide Werte — Normalzeit und Sommerzeit.' },
      { q: 'Es weicht von der Entfernung meiner Airline ab.', a: 'Diese Koordinaten sind Stadtzentren, Airlines messen von Flughafen zu Flughafen. Flughäfen liegen Dutzende Kilometer außerhalb, unter 1% auf Strecken über 10.000 km. Echte Routen weichen zudem Lufträumen aus und folgen Luftstraßen.' },
    ],
    [
      { q: 'Pourquoi la route s’incurve-t-elle vers le nord sur une carte ?', a: 'Parce que c’est réellement plus court. La Terre est une boule et la carte du papier ; l’aplatir étire surtout les régions polaires, si bien que le chemin le plus court près du pôle est dessiné comme un détour.' },
      { q: 'Pourquoi l’aller et le retour ne durent-ils pas pareil ?', a: 'Un courant-jet file d’ouest en est très haut au-dessus des latitudes moyennes : il pousse vers l’est et freine vers l’ouest. Même distance, une à deux heures d’écart.' },
      { q: 'Le décalage indiqué ne correspond pas à celui d’aujourd’hui.', a: 'C’est l’heure d’été. Les villes qui l’appliquent sont à une heure différente en juillet et en janvier ; le tableau donne donc les deux valeurs, heure normale et heure d’été.' },
      { q: 'Cela diffère de la distance annoncée par ma compagnie.', a: 'Ces coordonnées sont celles des centres-villes, les compagnies mesurent d’aéroport à aéroport. Les aéroports sont à des dizaines de kilomètres, soit moins de 1% sur plus de 10 000 km. Les routes réelles contournent en outre des espaces aériens et suivent des voies aériennes.' },
    ],
    [
      { q: 'नक्शे पर रास्ता उत्तर की ओर मुड़ा क्यों दिखता है?', a: 'क्योंकि वही सचमुच छोटा है। पृथ्वी गोला है और नक्शा काग़ज़; चपटा करने पर ध्रुवीय क्षेत्र सबसे ज़्यादा खिंचते हैं, इसलिए ध्रुव के पास से जाता सबसे छोटा रास्ता चक्कर जैसा दिखता है।' },
      { q: 'जाने और लौटने में समय अलग क्यों लगता है?', a: 'मध्य अक्षांशों के ऊपर पश्चिम से पूर्व बहती जेट धारा पूर्व जाते समय धकेलती है और पश्चिम जाते समय रोकती है। दूरी वही, पर एक-दो घंटे का फ़र्क़।' },
      { q: 'यहाँ लिखा समय अंतर अभी से मेल नहीं खाता।', a: 'ग्रीष्म समय के कारण। जो शहर उसे मानते हैं, उनका अंतर जुलाई और जनवरी में एक घंटा अलग होता है, इसलिए तालिका दोनों मान देती है।' },
      { q: 'एयरलाइन की बताई दूरी से अलग है।', a: 'यहाँ निर्देशांक शहर के केंद्र के हैं; एयरलाइनें हवाई अड्डे से हवाई अड्डे तक नापती हैं। हवाई अड्डे दसियों किलोमीटर बाहर होते हैं — 10,000 किमी से लंबे मार्ग पर 1% से कम। असली मार्ग वायुक्षेत्र और वायुमार्गों के कारण और घूमते हैं।' },
    ],
    [
      { q: '航线在地图上为什么向北弯？', a: '因为那样确实更近。地球是个球，地图是张纸；摊平时两极被拉得最厉害，所以真正最短的、贴近极点的那条路，在地图上就画成了绕远。' },
      { q: '去程和回程为什么用时不同？', a: '中纬度高空有一股自西向东的急流，往东推你，往西挡你。距离一样，时间能差一两个小时。' },
      { q: '这里写的时差跟现在对不上。', a: '是夏令时的缘故。实行夏令时的城市，七月和一月相差一小时，所以这张表把标准时间和夏令时两个值都给了。' },
      { q: '和航空公司标的距离不一样。', a: '这里的坐标取市中心，航空公司按机场算。机场在市区外几十公里，放在一万公里以上的航段里不到 1%。真实航线还要绕开空域、沿航路飞。' },
    ],
    [
      { q: '航線在地圖上為什麼向北彎？', a: '因為那樣確實更近。地球是個球，地圖是張紙；攤平時兩極被拉得最厲害，所以真正最短的、貼近極點的那條路，在地圖上就畫成了繞遠。' },
      { q: '去程和回程為什麼用時不同？', a: '中緯度高空有一股自西向東的噴射氣流，往東推你，往西擋你。距離一樣，時間能差一兩個小時。' },
      { q: '這裡寫的時差跟現在對不上。', a: '是夏令時的緣故。實行夏令時的城市，七月和一月相差一小時，所以這張表把標準時間和夏令時兩個值都給了。' },
      { q: '和航空公司標的距離不一樣。', a: '這裡的座標取市中心，航空公司按機場算。機場在市區外幾十公里，放在一萬公里以上的航段裡不到 1%。真實航線還要繞開空域、沿航路飛。' },
    ],
  ),

  cellFaq: T<(f: FlightFacts) => FaqItem[]>(
    f => [
      { q: `거리가 얼마인가요?`, a: `대권거리로 ${f.km.toLocaleString('en-US')}km, ${f.miles.toLocaleString('en-US')}마일입니다. 지구 반 바퀴의 ${f.share}%입니다.` },
      { q: `어느 쪽으로 떠나나요?`, a: `${f.bearing}도, 열여섯 방위로는 ${f.compass}입니다. 대권은 가면서 방위가 바뀌므로 이것은 떠날 때의 값입니다.` },
      { q: `시차는 몇 시간인가요?`, a: f.shiftVaries ? `표준시에는 ${Math.abs(f.winterShift) / 60}시간, 서머타임 기간에는 ${Math.abs(f.summerShift) / 60}시간입니다.` : `${Math.abs(f.winterShift) / 60}시간이고 계절에 따라 바뀌지 않습니다.` },
      { q: `되돌아올 때도 같은 시간이 걸리나요?`, a: `거리는 같지만 시간은 다릅니다. 제트기류가 서쪽에서 동쪽으로 불어, 동쪽으로 가는 편이 짧습니다.` },
    ],
    f => [
      { q: `How far is it?`, a: `${f.km.toLocaleString('en-US')} km, or ${f.miles.toLocaleString('en-US')} miles, along the great circle — ${f.share}% of half the globe.` },
      { q: `Which way do you set off?`, a: `${f.bearing}°, which is ${f.compass} on the sixteen-point rose. A great circle changes heading as it goes, so this is the departure value.` },
      { q: `What is the time difference?`, a: f.shiftVaries ? `${Math.abs(f.winterShift) / 60} hours on standard time and ${Math.abs(f.summerShift) / 60} hours while summer time is in force.` : `${Math.abs(f.winterShift) / 60} hours, and it does not change with the season.` },
      { q: `Does the return take the same time?`, a: `The distance is identical but the time is not. The jet stream blows west to east, so the eastbound leg is shorter.` },
    ],
    f => [
      { q: `¿Qué distancia hay?`, a: `${f.km.toLocaleString('en-US')} km, o ${f.miles.toLocaleString('en-US')} millas, por la ortodrómica: el ${f.share}% de media vuelta al mundo.` },
      { q: `¿Hacia dónde se sale?`, a: `${f.bearing}°, es decir ${f.compass} en la rosa de dieciséis rumbos. La ortodrómica cambia de rumbo sobre la marcha, así que este es el valor de salida.` },
      { q: `¿Cuál es la diferencia horaria?`, a: f.shiftVaries ? `${Math.abs(f.winterShift) / 60} horas en hora estándar y ${Math.abs(f.summerShift) / 60} durante el horario de verano.` : `${Math.abs(f.winterShift) / 60} horas, y no cambia con la estación.` },
      { q: `¿La vuelta tarda lo mismo?`, a: `La distancia es idéntica, el tiempo no. La corriente en chorro sopla de oeste a este, así que el tramo hacia el este es más corto.` },
    ],
    f => [
      { q: `Qual é a distância?`, a: `${f.km.toLocaleString('en-US')} km, ou ${f.miles.toLocaleString('en-US')} milhas, pela ortodrômica: ${f.share}% de meia volta ao mundo.` },
      { q: `Para que lado se parte?`, a: `${f.bearing}°, ou seja ${f.compass} na rosa de dezesseis rumos. A ortodrômica muda de rumo ao longo do caminho, então este é o valor de partida.` },
      { q: `Qual é a diferença de fuso?`, a: f.shiftVaries ? `${Math.abs(f.winterShift) / 60} horas em hora padrão e ${Math.abs(f.summerShift) / 60} durante o horário de verão.` : `${Math.abs(f.winterShift) / 60} horas, e não muda com a estação.` },
      { q: `A volta demora o mesmo?`, a: `A distância é idêntica, o tempo não. A corrente de jato sopra de oeste para leste, então o trecho para leste é mais curto.` },
    ],
    f => [
      { q: `距離はどれくらいですか。`, a: `大圏距離で ${f.km.toLocaleString('en-US')}km、${f.miles.toLocaleString('en-US')}マイルです。地球半周の${f.share}%にあたります。` },
      { q: `どちらへ飛び立ちますか。`, a: `${f.bearing}度、十六方位では${f.compass}です。大圏は進むにつれて方位が変わるので、これは出発時の値です。` },
      { q: `時差は何時間ですか。`, a: f.shiftVaries ? `標準時では${Math.abs(f.winterShift) / 60}時間、夏時間の期間は${Math.abs(f.summerShift) / 60}時間です。` : `${Math.abs(f.winterShift) / 60}時間で、季節によって変わりません。` },
      { q: `帰りも同じ時間がかかりますか。`, a: `距離は同じですが時間は違います。ジェット気流が西から東へ吹くので、東へ向かう便のほうが短くなります。` },
    ],
    f => [
      { q: `Wie weit ist es?`, a: `${f.km.toLocaleString('en-US')} km beziehungsweise ${f.miles.toLocaleString('en-US')} Meilen auf dem Großkreis — ${f.share}% des halben Erdumfangs.` },
      { q: `In welche Richtung startet man?`, a: `${f.bearing}°, auf der Sechzehn-Strich-Rose ${f.compass}. Ein Großkreis ändert unterwegs den Kurs, dies ist also der Abflugwert.` },
      { q: `Wie groß ist die Zeitverschiebung?`, a: f.shiftVaries ? `${Math.abs(f.winterShift) / 60} Stunden zur Normalzeit und ${Math.abs(f.summerShift) / 60} Stunden während der Sommerzeit.` : `${Math.abs(f.winterShift) / 60} Stunden, und sie ändert sich nicht mit der Jahreszeit.` },
      { q: `Dauert der Rückflug gleich lang?`, a: `Die Entfernung ist identisch, die Zeit nicht. Der Jetstream weht von West nach Ost, der Ostflug ist also kürzer.` },
    ],
    f => [
      { q: `Quelle distance ?`, a: `${f.km.toLocaleString('en-US')} km, soit ${f.miles.toLocaleString('en-US')} milles, à l’orthodromie — ${f.share}% d’un demi-tour du globe.` },
      { q: `Dans quelle direction part-on ?`, a: `${f.bearing}°, soit ${f.compass} sur la rose à seize aires. Une orthodromie change de cap en route : c’est la valeur au départ.` },
      { q: `Quel est le décalage horaire ?`, a: f.shiftVaries ? `${Math.abs(f.winterShift) / 60} heures en heure normale et ${Math.abs(f.summerShift) / 60} heures pendant l’heure d’été.` : `${Math.abs(f.winterShift) / 60} heures, sans changement selon la saison.` },
      { q: `Le retour dure-t-il autant ?`, a: `La distance est identique, le temps non. Le courant-jet souffle d’ouest en est : le trajet vers l’est est plus court.` },
    ],
    f => [
      { q: `दूरी कितनी है?`, a: `महावृत्त पर ${f.km.toLocaleString('en-US')} किमी, यानी ${f.miles.toLocaleString('en-US')} मील — आधी पृथ्वी का ${f.share}%।` },
      { q: `किस दिशा में उड़ान भरते हैं?`, a: `${f.bearing}°, सोलह दिशाओं में ${f.compass}। महावृत्त की दिशा रास्ते में बदलती है, यह प्रस्थान का मान है।` },
      { q: `समय अंतर कितना है?`, a: f.shiftVaries ? `मानक समय में ${Math.abs(f.winterShift) / 60} घंटे और ग्रीष्म समय के दौरान ${Math.abs(f.summerShift) / 60} घंटे।` : `${Math.abs(f.winterShift) / 60} घंटे, और मौसम के साथ नहीं बदलता।` },
      { q: `क्या लौटने में भी उतना ही समय लगता है?`, a: `दूरी वही है, समय नहीं। जेट धारा पश्चिम से पूर्व बहती है, इसलिए पूर्व की ओर का सफ़र छोटा पड़ता है।` },
    ],
    f => [
      { q: `有多远？`, a: `大圆距离 ${f.km.toLocaleString('en-US')} 公里，合 ${f.miles.toLocaleString('en-US')} 英里，相当于地球半圈的 ${f.share}%。` },
      { q: `朝哪个方向起飞？`, a: `${f.bearing}°，十六方位里是 ${f.compass}。大圆航线一路都在改方向，这是起飞时的值。` },
      { q: `时差是几个小时？`, a: f.shiftVaries ? `标准时间下 ${Math.abs(f.winterShift) / 60} 小时，夏令时期间 ${Math.abs(f.summerShift) / 60} 小时。` : `${Math.abs(f.winterShift) / 60} 小时，不随季节变。` },
      { q: `回程用时一样吗？`, a: `距离一样，时间不一样。急流自西向东吹，所以往东那一程更短。` },
    ],
    f => [
      { q: `有多遠？`, a: `大圓距離 ${f.km.toLocaleString('en-US')} 公里，合 ${f.miles.toLocaleString('en-US')} 英里，相當於地球半圈的 ${f.share}%。` },
      { q: `朝哪個方向起飛？`, a: `${f.bearing}°，十六方位裡是 ${f.compass}。大圓航線一路都在改方向，這是起飛時的值。` },
      { q: `時差是幾個小時？`, a: f.shiftVaries ? `標準時間下 ${Math.abs(f.winterShift) / 60} 小時，夏令時期間 ${Math.abs(f.summerShift) / 60} 小時。` : `${Math.abs(f.winterShift) / 60} 小時，不隨季節變。` },
      { q: `回程用時一樣嗎？`, a: `距離一樣，時間不一樣。噴射氣流自西向東吹，所以往東那一程更短。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const FLIGHT_UI: L<FlightUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<FlightUI>;
