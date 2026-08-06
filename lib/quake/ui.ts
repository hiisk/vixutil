/**
 * 지진 규모 화면의 문구 — 열 언어.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { QuakeFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface QuakeUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  magnitudeLabel: string;
  energyLabel: string;
  tntLabel: string;
  hiroshimaLabel: string;
  stepLabel: string;
  perLowerLabel: string;
  /** 큰 수를 10의 제곱으로 읽어 준다 */
  bigNumber: (log: number) => string;
  logTitle: string;
  logNote: string;
  amplitudeTitle: string;
  amplitudeNote: string;
  compareTitle: string;
  compareNote: string;
  intensityTitle: string;
  intensityNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  tenthTitle: string;
  desc: (f: QuakeFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: QuakeFacts) => string;
  metaDesc: (f: QuakeFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: QuakeFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof QuakeUI]: L<QuakeUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('지진 규모와 에너지', 'Earthquake magnitude', 'Magnitud de terremotos', 'Magnitude de terremotos', '地震の規模とエネルギー', 'Erdbebenstärke', 'Magnitude des séismes', 'भूकंप परिमाण', '地震震级与能量', '地震規模與能量'),

  hubTitle: T(
    '지진 규모 111칸 — 규모 7은 6의 두 배가 아니라 32배입니다',
    '111 magnitudes — a 7 is not twice a 6 but thirty-two times',
    '111 magnitudes — un 7 no es el doble de un 6, sino treinta y dos veces',
    '111 magnitudes — um 7 não é o dobro de um 6, mas trinta e duas vezes',
    '地震の規模111マス — 規模7は6の2倍ではなく32倍です',
    '111 Magnituden — eine 7 ist nicht doppelt so stark wie eine 6, sondern 32-mal',
    '111 magnitudes — un 7 ne vaut pas deux fois un 6 mais trente-deux fois',
    '111 परिमाण — 7 का भूकंप 6 से दोगुना नहीं, बत्तीस गुना है',
    '111 格震级 — 7 级不是 6 级的两倍，而是三十二倍',
    '111 格規模 — 7 級不是 6 級的兩倍，而是三十二倍',
  ),

  hubLead: T(
    '규모는 로그 눈금이라 한 칸이 곱셈입니다. 에너지의 상용로그가 1.5 × 규모 + 4.8이므로, 규모가 1 오르면 에너지는 31.6배, 2가 오르면 정확히 1000배가 됩니다. 4.0에서 9.5까지 0.05 단위로 111칸을 계산했습니다.',
    'Magnitude is a logarithmic scale, so one step is a multiplication. The base-ten log of the energy is 1.5 × magnitude + 4.8, which makes one whole point worth 31.6 times the energy and two points exactly a thousand. Here are 111 steps of 0.05 from 4.0 to 9.5.',
    'La magnitud es una escala logarítmica: un paso es una multiplicación. El logaritmo decimal de la energía vale 1,5 × magnitud + 4,8, así que un punto entero son 31,6 veces la energía y dos puntos exactamente mil. Aquí van 111 pasos de 0,05, de 4,0 a 9,5.',
    'A magnitude é uma escala logarítmica: um passo é uma multiplicação. O logaritmo decimal da energia vale 1,5 × magnitude + 4,8, então um ponto inteiro são 31,6 vezes a energia e dois pontos exatamente mil. Aqui vão 111 passos de 0,05, de 4,0 a 9,5.',
    '規模は対数目盛なので一段が掛け算です。エネルギーの常用対数が1.5 × 規模 + 4.8なので、規模が1上がるとエネルギーは31.6倍、2上がるとちょうど1000倍になります。4.0から9.5まで0.05刻みで111マスを計算しました。',
    'Die Magnitude ist eine logarithmische Skala — ein Schritt ist eine Multiplikation. Der Zehnerlogarithmus der Energie beträgt 1,5 × Magnitude + 4,8; ein ganzer Punkt bedeutet also die 31,6-fache Energie, zwei Punkte genau das Tausendfache. Hier 111 Schritte zu 0,05 von 4,0 bis 9,5.',
    'La magnitude est une échelle logarithmique : un pas est une multiplication. Le logarithme décimal de l’énergie vaut 1,5 × magnitude + 4,8, si bien qu’un point entier représente 31,6 fois l’énergie et deux points exactement mille. Voici 111 pas de 0,05, de 4,0 à 9,5.',
    'परिमाण एक लघुगणकीय पैमाना है, इसलिए एक चरण गुणा होता है। ऊर्जा का दशमलव लघुगणक 1.5 × परिमाण + 4.8 है, तो एक पूरा अंक 31.6 गुना ऊर्जा और दो अंक ठीक हज़ार गुना बनाता है। 4.0 से 9.5 तक 0.05 के 111 चरण यहाँ हैं।',
    '震级是对数刻度，所以一格就是一次乘法。能量的常用对数等于 1.5 × 震级 + 4.8，因此震级每升 1，能量就是 31.6 倍；升 2 恰好是一千倍。这里是 4.0 到 9.5、每 0.05 一格的 111 格。',
    '規模是對數刻度，所以一格就是一次乘法。能量的常用對數等於 1.5 × 規模 + 4.8，因此規模每升 1，能量就是 31.6 倍；升 2 恰好是一千倍。這裡是 4.0 到 9.5、每 0.05 一格的 111 格。',
  ),

  magnitudeLabel: T('규모', 'Magnitude', 'Magnitud', 'Magnitude', '規模', 'Magnitude', 'Magnitude', 'परिमाण', '震级', '規模'),
  energyLabel: T('에너지', 'Energy', 'Energía', 'Energia', 'エネルギー', 'Energie', 'Énergie', 'ऊर्जा', '能量', '能量'),
  tntLabel: T('TNT 환산', 'In TNT', 'En TNT', 'Em TNT', 'TNT換算', 'In TNT', 'En TNT', 'TNT में', '折合 TNT', '折合 TNT'),
  hiroshimaLabel: T('히로시마 폭탄', 'Hiroshima bombs', 'Bombas de Hiroshima', 'Bombas de Hiroshima', '広島型爆弾', 'Hiroshima-Bomben', 'Bombes d’Hiroshima', 'हिरोशिमा बम', '广岛原子弹', '廣島原子彈'),
  stepLabel: T('한 눈금(0.05) 차이', 'One 0.05 step', 'Un paso de 0,05', 'Um passo de 0,05', '1目盛(0.05)の差', 'Ein 0,05-Schritt', 'Un pas de 0,05', '0.05 का एक चरण', '一格（0.05）之差', '一格（0.05）之差'),
  perLowerLabel: T('규모 1 낮은 지진 몇 번', 'Quakes one point lower', 'Sismos un punto menores', 'Sismos um ponto menores', '規模1低い地震の回数', 'Beben einen Punkt niedriger', 'Séismes un point plus bas', 'एक अंक कम के भूकंप', '低一级地震的次数', '低一級地震的次數'),

  bigNumber: T<(log: number) => string>(
    log => `10의 ${log}제곱`, log => `10^${log}`, log => `10^${log}`, log => `10^${log}`,
    log => `10の${log}乗`, log => `10^${log}`, log => `10^${log}`, log => `10^${log}`,
    log => `10 的 ${log} 次方`, log => `10 的 ${log} 次方`,
  ),

  logTitle: T('한 칸이 곱셈입니다', 'One step is a multiplication', 'Un paso es una multiplicación', 'Um passo é uma multiplicação', '一段が掛け算です', 'Ein Schritt ist eine Multiplikation', 'Un pas est une multiplication', 'एक चरण गुणा है', '一格就是一次乘法', '一格就是一次乘法'),

  logNote: T(
    '에너지의 상용로그가 1.5 × 규모 + 4.8입니다. 기울기가 1.5라 규모 1당 10의 1.5제곱, 곧 31.6배입니다. 2가 오르면 10의 3제곱이 되어 정확히 1000배입니다. 규모 6과 7 사이에 규모 6짜리 서른 번이 들어간다는 뜻입니다.',
    'The base-ten log of the energy is 1.5 × magnitude + 4.8. With a slope of 1.5, one point of magnitude means ten to the power 1.5, or 31.6 times the energy. Two points make ten cubed — a thousand times exactly. In other words, thirty-odd magnitude-6 quakes fit inside a single 7.',
    'El logaritmo decimal de la energía es 1,5 × magnitud + 4,8. Con pendiente 1,5, un punto de magnitud significa diez elevado a 1,5, o sea 31,6 veces la energía. Dos puntos dan diez al cubo: mil veces exactas. Dicho de otro modo, en un 7 caben unos treinta sismos de magnitud 6.',
    'O logaritmo decimal da energia é 1,5 × magnitude + 4,8. Com inclinação 1,5, um ponto de magnitude significa dez elevado a 1,5, ou 31,6 vezes a energia. Dois pontos dão dez ao cubo: mil vezes exatas. Ou seja, num 7 cabem uns trinta sismos de magnitude 6.',
    'エネルギーの常用対数が1.5 × 規模 + 4.8です。傾きが1.5なので規模1あたり10の1.5乗、つまり31.6倍です。2上がれば10の3乗になりちょうど1000倍です。規模6と7の間に規模6の地震が三十回ほど入るという意味です。',
    'Der Zehnerlogarithmus der Energie ist 1,5 × Magnitude + 4,8. Bei einer Steigung von 1,5 bedeutet ein Magnitudenpunkt zehn hoch 1,5, also die 31,6-fache Energie. Zwei Punkte ergeben zehn hoch drei — genau das Tausendfache. Anders gesagt: in eine 7 passen gut dreißig Beben der Stärke 6.',
    'Le logarithme décimal de l’énergie vaut 1,5 × magnitude + 4,8. Avec une pente de 1,5, un point de magnitude vaut dix puissance 1,5, soit 31,6 fois l’énergie. Deux points donnent dix au cube : mille fois exactement. Autrement dit, une trentaine de séismes de magnitude 6 tiennent dans un seul 7.',
    'ऊर्जा का दशमलव लघुगणक 1.5 × परिमाण + 4.8 है। ढाल 1.5 होने से एक अंक का अर्थ है दस की 1.5 घात, यानी 31.6 गुना ऊर्जा। दो अंक पर दस का घन — ठीक हज़ार गुना। यानी एक 7 में परिमाण 6 के लगभग तीस भूकंप समा जाते हैं।',
    '能量的常用对数是 1.5 × 震级 + 4.8。斜率为 1.5，所以震级每升 1，能量就是 10 的 1.5 次方，即 31.6 倍；升 2 就是 10 的 3 次方，恰好一千倍。换句话说，一个 7 级里装得下三十来个 6 级。',
    '能量的常用對數是 1.5 × 規模 + 4.8。斜率為 1.5，所以規模每升 1，能量就是 10 的 1.5 次方，即 31.6 倍；升 2 就是 10 的 3 次方，恰好一千倍。換句話說，一個 7 級裡裝得下三十來個 6 級。',
  ),

  amplitudeTitle: T('흔들림은 10배, 에너지는 31.6배', 'Shaking ×10, energy ×31.6', 'Sacudida ×10, energía ×31,6', 'Tremor ×10, energia ×31,6', '揺れは10倍、エネルギーは31.6倍', 'Erschütterung ×10, Energie ×31,6', 'Secousse ×10, énergie ×31,6', 'कंपन ×10, ऊर्जा ×31.6', '晃动 ×10，能量 ×31.6', '晃動 ×10，能量 ×31.6'),

  amplitudeNote: T(
    '규모가 1 오르면 지진계가 그리는 흔들림의 폭은 10배가 되지만, 방출된 에너지는 31.6배가 됩니다. 두 수가 다른 것은 에너지가 진폭만이 아니라 흔들림이 이어진 시간과 끊어진 단층의 넓이에도 달렸기 때문입니다. 뉴스에서 "10배"라고 하면 흔들림 쪽, "32배"라고 하면 에너지 쪽입니다.',
    'One point of magnitude multiplies the amplitude a seismograph traces by ten, but the released energy by 31.6. The two differ because energy depends not only on how far the ground moves but on how long it shakes and how much fault surface tore. When the news says “ten times” it means the shaking; “thirty-two times” means the energy.',
    'Un punto de magnitud multiplica por diez la amplitud que traza un sismógrafo, pero por 31,6 la energía liberada. Difieren porque la energía no depende solo de cuánto se mueve el suelo, sino de cuánto tiempo tiembla y cuánta superficie de falla se rompió. Cuando las noticias dicen «diez veces» hablan de la sacudida; «treinta y dos veces», de la energía.',
    'Um ponto de magnitude multiplica por dez a amplitude que um sismógrafo traça, mas por 31,6 a energia liberada. Diferem porque a energia depende não só de quanto o solo se move, mas de quanto tempo treme e de quanta superfície de falha rompeu. Quando o noticiário diz «dez vezes», fala do tremor; «trinta e duas vezes», da energia.',
    '規模が1上がると地震計が描く揺れの幅は10倍になりますが、放出されたエネルギーは31.6倍になります。二つの数が違うのは、エネルギーが振幅だけでなく揺れの続いた時間と切れた断層の広さにも左右されるからです。ニュースで「10倍」と言えば揺れのほう、「32倍」と言えばエネルギーのほうです。',
    'Ein Magnitudenpunkt verzehnfacht den Ausschlag auf dem Seismogramm, die freigesetzte Energie aber ver-31,6-facht sich. Der Unterschied rührt daher, dass Energie nicht nur von der Bodenauslenkung abhängt, sondern auch von der Dauer und der gerissenen Bruchfläche. Sagt die Nachricht „zehnmal“, meint sie die Erschütterung; „32-mal“ meint die Energie.',
    'Un point de magnitude multiplie par dix l’amplitude tracée par le sismographe, mais par 31,6 l’énergie libérée. L’écart vient de ce que l’énergie ne dépend pas seulement du déplacement du sol, mais aussi de la durée de la secousse et de la surface de faille rompue. Quand on entend « dix fois », il s’agit de la secousse ; « trente-deux fois », de l’énergie.',
    'परिमाण एक अंक बढ़ने पर सिस्मोग्राफ की खींची लहर का आयाम दस गुना होता है, पर निकली ऊर्जा 31.6 गुना। अंतर इसलिए कि ऊर्जा केवल ज़मीन के हिलने पर नहीं, हिलने की अवधि और टूटी भ्रंश-सतह पर भी निर्भर है। ख़बरों में «दस गुना» कंपन की बात है, «बत्तीस गुना» ऊर्जा की।',
    '震级升 1，地震仪描出的晃动幅度是 10 倍，而释放的能量是 31.6 倍。两者不同，是因为能量不只取决于地面动了多少，还取决于晃了多久、断层撕开了多大面积。新闻里说"十倍"是指晃动，说"三十二倍"是指能量。',
    '規模升 1，地震儀描出的晃動幅度是 10 倍，而釋放的能量是 31.6 倍。兩者不同，是因為能量不只取決於地面動了多少，還取決於晃了多久、斷層撕開了多大面積。新聞裡說「十倍」是指晃動，說「三十二倍」是指能量。',
  ),

  compareTitle: T('견주어 볼 자를 함께 냅니다', 'Yardsticks to compare against', 'Varas de medir para comparar', 'Réguas para comparar', '見比べる物差しも出します', 'Maßstäbe zum Vergleichen', 'Des repères pour comparer', 'तुलना के लिए पैमाने', '给出可比的尺子', '給出可比的尺子'),

  compareNote: T(
    '줄(J)로 적으면 10의 20제곱 같은 수가 되어 크기가 잡히지 않으므로, TNT 톤수와 히로시마 폭탄 몇 발분인지도 함께 냅니다. 규모 6.0이 히로시마 한 발쯤이고, 규모 9.0은 그 삼만 배가 넘습니다. 다만 이것은 방출된 에너지를 견준 것일 뿐, 피해의 크기를 견준 것이 아닙니다.',
    'Written in joules the numbers run to ten to the twentieth and stop meaning anything, so tonnes of TNT and Hiroshima bombs are given alongside. Magnitude 6.0 is about one such bomb; magnitude 9.0 is more than thirty thousand of them. This compares released energy only — not damage.',
    'En julios los números llegan a diez elevado a veinte y dejan de decir nada, así que se añaden las toneladas de TNT y las bombas de Hiroshima. La magnitud 6,0 equivale a una de esas bombas; la 9,0, a más de treinta mil. Esto compara energía liberada, no daños.',
    'Em joules os números chegam a dez elevado a vinte e deixam de dizer algo, então vêm junto as toneladas de TNT e as bombas de Hiroshima. A magnitude 6,0 equivale a uma dessas bombas; a 9,0, a mais de trinta mil. Isto compara energia liberada, não danos.',
    'ジュールで書くと10の20乗のような数になり大きさがつかめないので、TNTトン数と広島型爆弾の何発分かも一緒に出します。規模6.0が広島型一発ほどで、規模9.0はその三万倍を超えます。ただしこれは放出されたエネルギーを見比べたもので、被害の大きさを見比べたものではありません。',
    'In Joule ausgedrückt erreichen die Zahlen zehn hoch zwanzig und sagen nichts mehr — darum stehen Tonnen TNT und Hiroshima-Bomben daneben. Magnitude 6,0 entspricht etwa einer solchen Bombe, Magnitude 9,0 mehr als dreißigtausend. Verglichen wird nur die freigesetzte Energie, nicht der Schaden.',
    'En joules, les nombres atteignent dix puissance vingt et ne disent plus rien : on ajoute donc les tonnes de TNT et les bombes d’Hiroshima. La magnitude 6,0 vaut environ une de ces bombes ; la 9,0, plus de trente mille. On compare l’énergie libérée, pas les dégâts.',
    'जूल में लिखने पर संख्याएँ दस की बीसवीं घात तक पहुँच जाती हैं और अर्थ खो देती हैं, इसलिए TNT टन और हिरोशिमा बम भी साथ दिए हैं। परिमाण 6.0 लगभग एक ऐसे बम के बराबर है; 9.0 उससे तीस हज़ार गुना से अधिक। यह केवल निकली ऊर्जा की तुलना है, नुक़सान की नहीं।',
    '用焦耳写会变成 10 的 20 次方这类数字，反而没了实感，所以同时给出 TNT 吨数和相当于几颗广岛原子弹。6.0 级约等于一颗，9.0 级超过三万颗。不过这只是比较释放的能量，不是比较损害。',
    '用焦耳寫會變成 10 的 20 次方這類數字，反而沒了實感，所以同時給出 TNT 噸數和相當於幾顆廣島原子彈。6.0 級約等於一顆，9.0 級超過三萬顆。不過這只是比較釋放的能量，不是比較損害。',
  ),

  intensityTitle: T('규모와 진도는 다른 것입니다', 'Magnitude is not intensity', 'La magnitud no es la intensidad', 'Magnitude não é intensidade', '規模と震度は別のものです', 'Magnitude ist nicht Intensität', 'La magnitude n’est pas l’intensité', 'परिमाण और तीव्रता अलग हैं', '震级和烈度不是一回事', '規模和烈度不是一回事'),

  intensityNote: T(
    '규모는 지진 자체가 낸 에너지라 지진 하나에 하나뿐이지만, 진도는 그 자리에서 얼마나 흔들렸는지라 지점마다 다릅니다. 그래서 규모 5의 얕은 지진이 바로 위에서는 규모 7의 깊은 지진보다 크게 흔들릴 수 있습니다. 깊이와 거리, 지반이 진도를 정합니다.',
    'Magnitude describes the energy the earthquake itself released, so there is one number per quake. Intensity describes how hard a particular place shook, so it differs from street to street. A shallow magnitude-5 directly underfoot can shake harder than a deep magnitude-7 far away — depth, distance and ground conditions decide intensity.',
    'La magnitud describe la energía que liberó el sismo, así que hay un solo número por terremoto. La intensidad describe cuánto tembló un lugar concreto y cambia de calle a calle. Un magnitud 5 superficial justo debajo puede sacudir más que un magnitud 7 profundo y lejano: profundidad, distancia y suelo deciden la intensidad.',
    'A magnitude descreve a energia que o sismo liberou, então há um número por terremoto. A intensidade descreve o quanto um lugar tremeu e muda de rua para rua. Um magnitude 5 raso logo abaixo pode sacudir mais que um magnitude 7 profundo e distante — profundidade, distância e solo decidem a intensidade.',
    '規模は地震そのものが出したエネルギーなので地震一つに一つですが、震度はその場所でどれだけ揺れたかなので地点ごとに違います。だから規模5の浅い地震が真上では規模7の深い地震より大きく揺れることがあります。深さと距離、地盤が震度を決めます。',
    'Die Magnitude beschreibt die vom Beben freigesetzte Energie — je Beben eine Zahl. Die Intensität beschreibt, wie stark ein bestimmter Ort geschüttelt wurde, und unterscheidet sich von Straße zu Straße. Ein flaches Beben der Stärke 5 direkt darunter kann heftiger rütteln als ein tiefes der Stärke 7 in der Ferne; Tiefe, Entfernung und Untergrund bestimmen die Intensität.',
    'La magnitude décrit l’énergie libérée par le séisme : un seul nombre par événement. L’intensité décrit la violence ressentie en un lieu donné et varie d’une rue à l’autre. Un séisme de magnitude 5 peu profond juste sous les pieds peut secouer plus fort qu’un magnitude 7 profond et lointain — profondeur, distance et sol décident de l’intensité.',
    'परिमाण भूकंप द्वारा छोड़ी ऊर्जा बताता है, इसलिए प्रति भूकंप एक ही संख्या। तीव्रता बताती है कि किसी जगह कितना हिला, और वह गली-गली बदलती है। ठीक नीचे आया उथला 5 परिमाण का भूकंप, दूर के गहरे 7 से अधिक हिला सकता है — गहराई, दूरी और ज़मीन तीव्रता तय करते हैं।',
    '震级描述的是地震本身释放的能量，一次地震只有一个数字；烈度描述的是某个地点摇得多厉害，逐街逐地都不同。所以正下方的浅源 5 级，可能比远处的深源 7 级摇得更凶——深度、距离和地质条件决定烈度。',
    '規模描述的是地震本身釋放的能量，一次地震只有一個數字；烈度描述的是某個地點搖得多厲害，逐街逐地都不同。所以正下方的淺源 5 級，可能比遠處的深源 7 級搖得更凶——深度、距離和地質條件決定烈度。',
  ),

  careTitle: T('규모는 나중에 고쳐지기도 합니다', 'Magnitudes get revised', 'Las magnitudes se revisan', 'As magnitudes são revisadas', '規模は後から直されることがあります', 'Magnituden werden nachträglich korrigiert', 'Les magnitudes sont révisées', 'परिमाण बाद में संशोधित होते हैं', '震级事后会被修订', '規模事後會被修訂'),

  careNote: T(
    '큰 지진일수록 처음 발표된 값이 뒤에 0.1에서 0.3쯤 조정되곤 합니다. 관측 자료가 더 모이면 끊어진 단층의 크기를 다시 재기 때문입니다. 0.05 단위로 칸을 나눈 것도 그래서입니다 — 소수 한 자리로만 끊으면 그 조정이 표에서 사라집니다.',
    'The first number announced for a large earthquake is often revised by a tenth or three later on, as more records arrive and the ruptured fault is re-measured. That is why the steps here are 0.05: rounding to a single decimal would hide exactly those revisions.',
    'La primera cifra anunciada para un gran terremoto suele revisarse entre una y tres décimas más tarde, cuando llegan más registros y se vuelve a medir la falla rota. Por eso los pasos aquí son de 0,05: redondear a un decimal escondería justo esas revisiones.',
    'O primeiro número anunciado para um grande terremoto costuma ser revisado em uma a três décimas depois, quando chegam mais registros e a falha rompida é medida de novo. Por isso os passos aqui são de 0,05: arredondar a uma casa esconderia justamente essas revisões.',
    '大きな地震ほど最初に発表された値が後で0.1から0.3ほど調整されることがあります。観測資料が集まると切れた断層の大きさを測り直すからです。0.05刻みでマスを分けたのもそのためで、小数一桁で切ると調整が表から消えてしまいます。',
    'Die zuerst gemeldete Zahl eines großen Bebens wird später oft um ein bis drei Zehntel korrigiert, wenn mehr Aufzeichnungen eintreffen und die Bruchfläche neu vermessen wird. Darum sind die Schritte hier 0,05 — bei einer Nachkommastelle verschwänden genau diese Korrekturen.',
    'Le premier chiffre annoncé pour un grand séisme est souvent révisé d’un à trois dixièmes ensuite, à mesure que les enregistrements arrivent et que la faille rompue est remesurée. D’où des pas de 0,05 ici : arrondir à une décimale masquerait précisément ces révisions.',
    'बड़े भूकंप के लिए पहले घोषित संख्या बाद में एक से तीन दशमांश तक संशोधित होती है, जब और अभिलेख आते हैं और टूटी भ्रंश फिर मापी जाती है। इसीलिए यहाँ चरण 0.05 के हैं — एक दशमलव पर गोल करने से वही संशोधन छिप जाते।',
    '大地震最初公布的数值，往往在之后被修订一到三个十分位——记录汇集后要重新测量破裂的断层。这也是本表按 0.05 分格的原因：只保留一位小数，恰好会把这些修订抹掉。',
    '大地震最初公布的數值，往往在之後被修訂一到三個十分位——記錄匯集後要重新測量破裂的斷層。這也是本表按 0.05 分格的原因：只保留一位小數，恰好會把這些修訂抹掉。',
  ),

  tableTitle: T('규모로 찾기', 'Find it by magnitude', 'Búscalo por magnitud', 'Ache por magnitude', '規模から探す', 'Nach Magnitude suchen', 'Chercher par magnitude', 'परिमाण से देखें', '按震级查找', '按規模查找'),
  neighbourTitle: T('가까운 규모', 'Nearby magnitudes', 'Magnitudes cercanas', 'Magnitudes próximas', '近い規模', 'Magnituden daneben', 'Magnitudes voisines', 'पास के परिमाण', '相邻震级', '相鄰規模'),
  tenthTitle: T('소수 첫째 자리가 같은 칸', 'Same first decimal', 'Mismo primer decimal', 'Mesma primeira casa', '小数第一位が同じマス', 'Gleiche erste Dezimale', 'Même première décimale', 'वही पहला दशमलव', '小数第一位相同', '小數第一位相同'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      'log10(에너지) = 1.5 × 규모 + 4.8, 에너지는 줄입니다.',
      '규모 1 차이는 에너지 31.6배, 2 차이는 정확히 1000배입니다.',
      '흔들림의 폭은 10배지만 에너지는 31.6배입니다.',
      '규모는 지진 하나의 값이고, 진도는 지점마다 다릅니다.',
    ],
    [
      'log10(energy) = 1.5 × magnitude + 4.8, with energy in joules.',
      'One point of magnitude is 31.6 times the energy; two points exactly a thousand.',
      'The amplitude grows tenfold, the energy 31.6-fold.',
      'Magnitude belongs to the quake; intensity differs from place to place.',
    ],
    [
      'log10(energía) = 1,5 × magnitud + 4,8, con la energía en julios.',
      'Un punto de magnitud son 31,6 veces la energía; dos puntos, mil exactas.',
      'La amplitud crece diez veces; la energía, 31,6.',
      'La magnitud es del sismo; la intensidad cambia según el lugar.',
    ],
    [
      'log10(energia) = 1,5 × magnitude + 4,8, com a energia em joules.',
      'Um ponto de magnitude são 31,6 vezes a energia; dois pontos, mil exatas.',
      'A amplitude cresce dez vezes; a energia, 31,6.',
      'A magnitude é do sismo; a intensidade muda conforme o lugar.',
    ],
    [
      'log10(エネルギー) = 1.5 × 規模 + 4.8、エネルギーはジュールです。',
      '規模1の差はエネルギー31.6倍、2の差はちょうど1000倍です。',
      '揺れの幅は10倍ですがエネルギーは31.6倍です。',
      '規模は地震一つの値、震度は地点ごとに違います。',
    ],
    [
      'log10(Energie) = 1,5 × Magnitude + 4,8, Energie in Joule.',
      'Ein Magnitudenpunkt ist die 31,6-fache Energie, zwei Punkte genau das Tausendfache.',
      'Der Ausschlag wächst zehnfach, die Energie 31,6-fach.',
      'Die Magnitude gehört zum Beben, die Intensität wechselt von Ort zu Ort.',
    ],
    [
      'log10(énergie) = 1,5 × magnitude + 4,8, l’énergie en joules.',
      'Un point de magnitude vaut 31,6 fois l’énergie ; deux points, mille exactement.',
      'L’amplitude est multipliée par dix, l’énergie par 31,6.',
      'La magnitude appartient au séisme ; l’intensité varie selon le lieu.',
    ],
    [
      'log10(ऊर्जा) = 1.5 × परिमाण + 4.8, ऊर्जा जूल में।',
      'एक अंक का अंतर 31.6 गुना ऊर्जा; दो अंक ठीक हज़ार गुना।',
      'आयाम दस गुना बढ़ता है, ऊर्जा 31.6 गुना।',
      'परिमाण भूकंप का है; तीव्रता जगह-जगह बदलती है।',
    ],
    [
      'log10(能量) = 1.5 × 震级 + 4.8，能量单位为焦耳。',
      '震级差 1 是能量 31.6 倍，差 2 恰好一千倍。',
      '晃动幅度是 10 倍，能量却是 31.6 倍。',
      '震级属于这次地震，烈度则逐地不同。',
    ],
    [
      'log10(能量) = 1.5 × 規模 + 4.8，能量單位為焦耳。',
      '規模差 1 是能量 31.6 倍，差 2 恰好一千倍。',
      '晃動幅度是 10 倍，能量卻是 31.6 倍。',
      '規模屬於這次地震，烈度則逐地不同。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '지진 규모와 에너지 — 규모 1 차이는 31.6배',
    'Earthquake magnitude and energy — one point is 31.6 times',
    'Magnitud y energía — un punto son 31,6 veces',
    'Magnitude e energia — um ponto são 31,6 vezes',
    '地震の規模とエネルギー — 規模1の差は31.6倍',
    'Erdbebenstärke und Energie — ein Punkt ist das 31,6-Fache',
    'Magnitude et énergie — un point vaut 31,6 fois',
    'भूकंप परिमाण और ऊर्जा — एक अंक = 31.6 गुना',
    '地震震级与能量 — 差 1 级是 31.6 倍',
    '地震規模與能量 — 差 1 級是 31.6 倍',
  ),

  hubMetaDesc: T(
    '규모 7은 6의 두 배가 아니라 31.6배입니다. log10(에너지) = 1.5 × 규모 + 4.8이라 2가 오르면 정확히 1000배가 됩니다. 4.0에서 9.5까지 0.05 단위 111칸의 에너지·TNT·히로시마 환산.',
    'A magnitude 7 is not twice a 6 but 31.6 times. Since log10(energy) = 1.5 × magnitude + 4.8, two points make exactly a thousand. Energy, TNT and Hiroshima equivalents for 111 steps of 0.05 from 4.0 to 9.5.',
    'Un 7 no es el doble de un 6, sino 31,6 veces. Como log10(energía) = 1,5 × magnitud + 4,8, dos puntos dan mil exactas. Energía, TNT y equivalentes de Hiroshima para 111 pasos de 0,05 entre 4,0 y 9,5.',
    'Um 7 não é o dobro de um 6, mas 31,6 vezes. Como log10(energia) = 1,5 × magnitude + 4,8, dois pontos dão mil exatas. Energia, TNT e equivalentes de Hiroshima para 111 passos de 0,05 entre 4,0 e 9,5.',
    '規模7は6の2倍ではなく31.6倍です。log10(エネルギー) = 1.5 × 規模 + 4.8なので2上がればちょうど1000倍になります。4.0から9.5まで0.05刻み111マスのエネルギー・TNT・広島換算。',
    'Eine 7 ist nicht doppelt so stark wie eine 6, sondern 31,6-mal. Da log10(Energie) = 1,5 × Magnitude + 4,8 gilt, ergeben zwei Punkte genau das Tausendfache. Energie, TNT und Hiroshima-Äquivalente für 111 Schritte zu 0,05 von 4,0 bis 9,5.',
    'Une magnitude 7 ne vaut pas deux fois une 6 mais 31,6 fois. Comme log10(énergie) = 1,5 × magnitude + 4,8, deux points donnent mille exactement. Énergie, TNT et équivalents Hiroshima pour 111 pas de 0,05 de 4,0 à 9,5.',
    '7 का भूकंप 6 से दोगुना नहीं, 31.6 गुना है। log10(ऊर्जा) = 1.5 × परिमाण + 4.8 होने से दो अंक ठीक हज़ार गुना बनाते हैं। 4.0 से 9.5 तक 0.05 के 111 चरणों की ऊर्जा, TNT और हिरोशिमा तुलना।',
    '7 级不是 6 级的两倍，而是 31.6 倍。因为 log10(能量) = 1.5 × 震级 + 4.8，升 2 级恰好一千倍。4.0 到 9.5、每 0.05 一格共 111 格的能量、TNT 与广岛当量。',
    '7 級不是 6 級的兩倍，而是 31.6 倍。因為 log10(能量) = 1.5 × 規模 + 4.8，升 2 級恰好一千倍。4.0 到 9.5、每 0.05 一格共 111 格的能量、TNT 與廣島當量。',
  ),

  desc: T<(f: QuakeFacts) => string>(
    f => `에너지는 10의 ${f.logJoule}제곱 줄, TNT로 ${Math.round(f.tntTons).toLocaleString()}톤입니다. 규모가 1 낮은 지진 ${f.perOneLower}번을 모아야 같아집니다.`,
    f => `The energy is 10^${f.logJoule} joules, or ${Math.round(f.tntTons).toLocaleString()} tonnes of TNT — the same as ${f.perOneLower} quakes one point lower.`,
    f => `La energía es 10^${f.logJoule} julios, o ${Math.round(f.tntTons).toLocaleString()} toneladas de TNT: lo mismo que ${f.perOneLower} sismos un punto menores.`,
    f => `A energia é 10^${f.logJoule} joules, ou ${Math.round(f.tntTons).toLocaleString()} toneladas de TNT — o mesmo que ${f.perOneLower} sismos um ponto menores.`,
    f => `エネルギーは10の${f.logJoule}乗ジュール、TNT換算で${Math.round(f.tntTons).toLocaleString()}トンです。規模が1低い地震${f.perOneLower}回分に当たります。`,
    f => `Die Energie beträgt 10^${f.logJoule} Joule, also ${Math.round(f.tntTons).toLocaleString()} Tonnen TNT — so viel wie ${f.perOneLower} Beben einen Punkt niedriger.`,
    f => `L’énergie vaut 10^${f.logJoule} joules, soit ${Math.round(f.tntTons).toLocaleString()} tonnes de TNT — autant que ${f.perOneLower} séismes un point plus bas.`,
    f => `ऊर्जा 10^${f.logJoule} जूल है, यानी ${Math.round(f.tntTons).toLocaleString()} टन TNT — एक अंक कम के ${f.perOneLower} भूकंपों के बराबर।`,
    f => `能量为 10 的 ${f.logJoule} 次方焦耳，折合 TNT ${Math.round(f.tntTons).toLocaleString()} 吨，相当于 ${f.perOneLower} 次低一级的地震。`,
    f => `能量為 10 的 ${f.logJoule} 次方焦耳，折合 TNT ${Math.round(f.tntTons).toLocaleString()} 噸，相當於 ${f.perOneLower} 次低一級的地震。`,
  ),

  metaTitle: T<(f: QuakeFacts) => string>(
    f => `규모 ${f.magnitude.toFixed(2)} — TNT ${Math.round(f.tntTons).toLocaleString()}톤`,
    f => `Magnitude ${f.magnitude.toFixed(2)} — ${Math.round(f.tntTons).toLocaleString()} t of TNT`,
    f => `Magnitud ${f.magnitude.toFixed(2)} — ${Math.round(f.tntTons).toLocaleString()} t de TNT`,
    f => `Magnitude ${f.magnitude.toFixed(2)} — ${Math.round(f.tntTons).toLocaleString()} t de TNT`,
    f => `規模${f.magnitude.toFixed(2)} — TNT ${Math.round(f.tntTons).toLocaleString()}トン`,
    f => `Magnitude ${f.magnitude.toFixed(2)} — ${Math.round(f.tntTons).toLocaleString()} t TNT`,
    f => `Magnitude ${f.magnitude.toFixed(2)} — ${Math.round(f.tntTons).toLocaleString()} t de TNT`,
    f => `परिमाण ${f.magnitude.toFixed(2)} — ${Math.round(f.tntTons).toLocaleString()} टन TNT`,
    f => `震级 ${f.magnitude.toFixed(2)} — TNT ${Math.round(f.tntTons).toLocaleString()} 吨`,
    f => `規模 ${f.magnitude.toFixed(2)} — TNT ${Math.round(f.tntTons).toLocaleString()} 噸`,
  ),

  metaDesc: T<(f: QuakeFacts) => string>(
    f => `규모 ${f.magnitude.toFixed(2)} 지진의 에너지는 10의 ${f.logJoule}제곱 줄로, TNT ${Math.round(f.tntTons).toLocaleString()}톤이자 히로시마 폭탄 ${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)}발분입니다. 규모가 1 낮은 지진 ${f.perOneLower}번과 같습니다.`,
    f => `A magnitude ${f.magnitude.toFixed(2)} earthquake releases 10^${f.logJoule} joules — ${Math.round(f.tntTons).toLocaleString()} tonnes of TNT, or ${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} Hiroshima bombs. That equals ${f.perOneLower} quakes one point lower.`,
    f => `Un sismo de magnitud ${f.magnitude.toFixed(2)} libera 10^${f.logJoule} julios: ${Math.round(f.tntTons).toLocaleString()} toneladas de TNT, o ${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} bombas de Hiroshima. Equivale a ${f.perOneLower} sismos un punto menores.`,
    f => `Um sismo de magnitude ${f.magnitude.toFixed(2)} libera 10^${f.logJoule} joules: ${Math.round(f.tntTons).toLocaleString()} toneladas de TNT, ou ${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} bombas de Hiroshima. Equivale a ${f.perOneLower} sismos um ponto menores.`,
    f => `規模${f.magnitude.toFixed(2)}の地震のエネルギーは10の${f.logJoule}乗ジュールで、TNT ${Math.round(f.tntTons).toLocaleString()}トン、広島型爆弾${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)}発分です。規模が1低い地震${f.perOneLower}回分に当たります。`,
    f => `Ein Beben der Stärke ${f.magnitude.toFixed(2)} setzt 10^${f.logJoule} Joule frei — ${Math.round(f.tntTons).toLocaleString()} Tonnen TNT oder ${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} Hiroshima-Bomben. Das entspricht ${f.perOneLower} Beben einen Punkt niedriger.`,
    f => `Un séisme de magnitude ${f.magnitude.toFixed(2)} libère 10^${f.logJoule} joules : ${Math.round(f.tntTons).toLocaleString()} tonnes de TNT, ou ${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} bombes d’Hiroshima. Soit ${f.perOneLower} séismes un point plus bas.`,
    f => `परिमाण ${f.magnitude.toFixed(2)} का भूकंप 10^${f.logJoule} जूल छोड़ता है — ${Math.round(f.tntTons).toLocaleString()} टन TNT, या ${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} हिरोशिमा बम। यह एक अंक कम के ${f.perOneLower} भूकंपों के बराबर है।`,
    f => `${f.magnitude.toFixed(2)} 级地震释放 10 的 ${f.logJoule} 次方焦耳，折合 TNT ${Math.round(f.tntTons).toLocaleString()} 吨，或 ${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} 颗广岛原子弹，相当于 ${f.perOneLower} 次低一级的地震。`,
    f => `${f.magnitude.toFixed(2)} 級地震釋放 10 的 ${f.logJoule} 次方焦耳，折合 TNT ${Math.round(f.tntTons).toLocaleString()} 噸，或 ${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} 顆廣島原子彈，相當於 ${f.perOneLower} 次低一級的地震。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '규모 7은 규모 6의 몇 배인가요?', a: '에너지로 31.6배입니다. 흔들림의 폭으로는 10배입니다.' },
      { q: '규모 2 차이는요?', a: '정확히 1000배입니다. 10의 3제곱이기 때문입니다.' },
      { q: '왜 흔들림은 10배인데 에너지는 31.6배인가요?', a: '에너지가 진폭만이 아니라 흔들린 시간과 끊어진 단층의 넓이에도 달렸기 때문입니다.' },
      { q: '규모와 진도는 무엇이 다른가요?', a: '규모는 지진 하나의 값이고, 진도는 그 자리에서 얼마나 흔들렸는지라 지점마다 다릅니다.' },
      { q: '왜 0.05 단위인가요?', a: '큰 지진은 처음 발표된 규모가 뒤에 0.1~0.3쯤 조정되곤 합니다. 소수 한 자리로만 끊으면 그 조정이 표에서 사라집니다.' },
    ],
    [
      { q: 'How much bigger is a 7 than a 6?', a: '31.6 times in energy — ten times in the amplitude a seismograph records.' },
      { q: 'And two points apart?', a: 'Exactly a thousand times, because that is ten cubed.' },
      { q: 'Why is the shaking ten but the energy 31.6?', a: 'Energy depends not only on how far the ground moves but on how long it shakes and how much fault surface tore.' },
      { q: 'What is the difference between magnitude and intensity?', a: 'Magnitude belongs to the earthquake — one number. Intensity is how hard one place shook, and it differs from place to place.' },
      { q: 'Why steps of 0.05?', a: 'Large quakes are often revised by a tenth or three after the first announcement. Rounding to one decimal would hide exactly those revisions.' },
    ],
    [
      { q: '¿Cuánto mayor es un 7 que un 6?', a: '31,6 veces en energía; diez veces en la amplitud que registra un sismógrafo.' },
      { q: '¿Y dos puntos de diferencia?', a: 'Mil veces exactas, porque es diez al cubo.' },
      { q: '¿Por qué la sacudida es diez y la energía 31,6?', a: 'La energía no depende solo del desplazamiento del suelo, sino del tiempo que tiembla y de la superficie de falla rota.' },
      { q: '¿Qué diferencia hay entre magnitud e intensidad?', a: 'La magnitud es del sismo: un solo número. La intensidad es cuánto tembló un lugar y cambia de sitio a sitio.' },
      { q: '¿Por qué pasos de 0,05?', a: 'Los grandes sismos suelen revisarse una a tres décimas tras el primer anuncio. Redondear a un decimal escondería esas revisiones.' },
    ],
    [
      { q: 'Quanto um 7 é maior que um 6?', a: '31,6 vezes em energia; dez vezes na amplitude registrada por um sismógrafo.' },
      { q: 'E dois pontos de diferença?', a: 'Mil vezes exatas, porque é dez ao cubo.' },
      { q: 'Por que o tremor é dez e a energia 31,6?', a: 'A energia não depende só do deslocamento do solo, mas do tempo de tremor e da superfície de falha rompida.' },
      { q: 'Qual a diferença entre magnitude e intensidade?', a: 'A magnitude é do sismo: um número só. A intensidade é o quanto um lugar tremeu, e muda de lugar para lugar.' },
      { q: 'Por que passos de 0,05?', a: 'Grandes sismos costumam ser revisados em uma a três décimas após o primeiro anúncio. Arredondar a uma casa esconderia essas revisões.' },
    ],
    [
      { q: '規模7は規模6の何倍ですか？', a: 'エネルギーで31.6倍です。揺れの幅では10倍です。' },
      { q: '規模2の差は？', a: 'ちょうど1000倍です。10の3乗だからです。' },
      { q: 'なぜ揺れは10倍でエネルギーは31.6倍なのですか？', a: 'エネルギーが振幅だけでなく揺れの続いた時間と切れた断層の広さにも左右されるからです。' },
      { q: '規模と震度は何が違いますか？', a: '規模は地震一つの値で、震度はその場所でどれだけ揺れたかなので地点ごとに違います。' },
      { q: 'なぜ0.05刻みですか？', a: '大きな地震は最初に発表された規模が後で0.1〜0.3ほど調整されることがあります。小数一桁で切るとその調整が表から消えます。' },
    ],
    [
      { q: 'Um wie viel ist eine 7 stärker als eine 6?', a: 'Um das 31,6-Fache an Energie — der Ausschlag ist zehnmal so groß.' },
      { q: 'Und zwei Punkte Unterschied?', a: 'Genau das Tausendfache, denn das ist zehn hoch drei.' },
      { q: 'Warum zehn beim Ausschlag, aber 31,6 bei der Energie?', a: 'Energie hängt nicht nur von der Bodenauslenkung ab, sondern auch von der Dauer und der gerissenen Bruchfläche.' },
      { q: 'Was unterscheidet Magnitude und Intensität?', a: 'Die Magnitude gehört zum Beben — eine Zahl. Die Intensität sagt, wie stark ein Ort geschüttelt wurde, und wechselt von Ort zu Ort.' },
      { q: 'Warum Schritte von 0,05?', a: 'Große Beben werden nach der ersten Meldung oft um ein bis drei Zehntel korrigiert. Eine Nachkommastelle würde genau das verbergen.' },
    ],
    [
      { q: 'Combien un 7 dépasse-t-il un 6 ?', a: 'De 31,6 fois en énergie ; l’amplitude enregistrée, elle, est dix fois plus grande.' },
      { q: 'Et deux points d’écart ?', a: 'Mille fois exactement, puisque c’est dix au cube.' },
      { q: 'Pourquoi dix pour la secousse et 31,6 pour l’énergie ?', a: 'L’énergie dépend aussi de la durée de la secousse et de la surface de faille rompue, pas seulement du déplacement du sol.' },
      { q: 'Quelle différence entre magnitude et intensité ?', a: 'La magnitude appartient au séisme : un seul nombre. L’intensité dit la violence ressentie en un lieu et varie d’un endroit à l’autre.' },
      { q: 'Pourquoi des pas de 0,05 ?', a: 'Les grands séismes sont souvent révisés d’un à trois dixièmes après la première annonce. Arrondir à une décimale masquerait ces révisions.' },
    ],
    [
      { q: '7 का भूकंप 6 से कितना बड़ा है?', a: 'ऊर्जा में 31.6 गुना; सिस्मोग्राफ पर दर्ज आयाम में दस गुना।' },
      { q: 'और दो अंक का अंतर?', a: 'ठीक हज़ार गुना, क्योंकि यह दस का घन है।' },
      { q: 'कंपन दस गुना पर ऊर्जा 31.6 गुना क्यों?', a: 'ऊर्जा केवल ज़मीन के हिलने पर नहीं, हिलने की अवधि और टूटी भ्रंश-सतह पर भी निर्भर है।' },
      { q: 'परिमाण और तीव्रता में क्या अंतर है?', a: 'परिमाण भूकंप का है — एक ही संख्या। तीव्रता बताती है कि कोई जगह कितना हिली, और वह जगह-जगह बदलती है।' },
      { q: '0.05 के चरण क्यों?', a: 'बड़े भूकंपों का पहला घोषित परिमाण बाद में एक से तीन दशमांश तक बदलता है। एक दशमलव पर गोल करने से वे बदलाव छिप जाते।' },
    ],
    [
      { q: '7 级比 6 级大多少？', a: '能量上是 31.6 倍；地震仪记录的晃动幅度是 10 倍。' },
      { q: '差两级呢？', a: '恰好一千倍，因为那是 10 的 3 次方。' },
      { q: '为什么晃动是十倍、能量却是 31.6 倍？', a: '因为能量不只看地面动了多少，还看晃了多久、断层撕开了多大面积。' },
      { q: '震级和烈度有什么区别？', a: '震级属于这次地震，只有一个数；烈度是某地摇得多厉害，逐地不同。' },
      { q: '为什么按 0.05 分格？', a: '大地震首次公布的震级常在之后被修订一到三个十分位。只保留一位小数，就会把这些修订抹掉。' },
    ],
    [
      { q: '7 級比 6 級大多少？', a: '能量上是 31.6 倍；地震儀記錄的晃動幅度是 10 倍。' },
      { q: '差兩級呢？', a: '恰好一千倍，因為那是 10 的 3 次方。' },
      { q: '為什麼晃動是十倍、能量卻是 31.6 倍？', a: '因為能量不只看地面動了多少，還看晃了多久、斷層撕開了多大面積。' },
      { q: '規模和烈度有什麼區別？', a: '規模屬於這次地震，只有一個數；烈度是某地搖得多厲害，逐地不同。' },
      { q: '為什麼按 0.05 分格？', a: '大地震首次公布的規模常在之後被修訂一到三個十分位。只保留一位小數，就會把這些修訂抹掉。' },
    ],
  ),

  cellFaq: T<(f: QuakeFacts) => FaqItem[]>(
    f => [
      { q: `규모 ${f.magnitude.toFixed(2)}은 에너지가 얼마인가요?`, a: `10의 ${f.logJoule}제곱 줄입니다. TNT로는 ${Math.round(f.tntTons).toLocaleString()}톤입니다.` },
      { q: `히로시마 폭탄 몇 발분인가요?`, a: `${f.hiroshima >= 1 ? `${Math.round(f.hiroshima).toLocaleString()}발` : `${f.hiroshima.toFixed(3)}발`}분입니다. 방출된 에너지를 견준 것이지 피해를 견준 것은 아닙니다.` },
      { q: `한 눈금 위와는 몇 배 차이인가요?`, a: `${f.stepRatio}배입니다. 0.05 차이는 어느 규모에서나 같은 배수입니다.` },
      { q: `규모가 1 낮은 지진 몇 번과 같나요?`, a: `${f.perOneLower}번입니다.` },
    ],
    f => [
      { q: `How much energy is magnitude ${f.magnitude.toFixed(2)}?`, a: `10^${f.logJoule} joules, or ${Math.round(f.tntTons).toLocaleString()} tonnes of TNT.` },
      { q: `How many Hiroshima bombs?`, a: `${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)}. This compares released energy, not damage.` },
      { q: `How far is one step up?`, a: `${f.stepRatio} times. A 0.05 step is the same multiple at any magnitude.` },
      { q: `How many quakes one point lower?`, a: `${f.perOneLower} of them.` },
    ],
    f => [
      { q: `¿Cuánta energía es la magnitud ${f.magnitude.toFixed(2)}?`, a: `10^${f.logJoule} julios, o ${Math.round(f.tntTons).toLocaleString()} toneladas de TNT.` },
      { q: `¿Cuántas bombas de Hiroshima?`, a: `${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)}. Compara energía liberada, no daños.` },
      { q: `¿Cuánto hay hasta el paso siguiente?`, a: `${f.stepRatio} veces. Un paso de 0,05 es el mismo múltiplo en cualquier magnitud.` },
      { q: `¿Cuántos sismos un punto menores?`, a: `${f.perOneLower}.` },
    ],
    f => [
      { q: `Quanta energia é a magnitude ${f.magnitude.toFixed(2)}?`, a: `10^${f.logJoule} joules, ou ${Math.round(f.tntTons).toLocaleString()} toneladas de TNT.` },
      { q: `Quantas bombas de Hiroshima?`, a: `${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)}. Compara energia liberada, não danos.` },
      { q: `Quanto vai até o passo seguinte?`, a: `${f.stepRatio} vezes. Um passo de 0,05 é o mesmo múltiplo em qualquer magnitude.` },
      { q: `Quantos sismos um ponto menores?`, a: `${f.perOneLower}.` },
    ],
    f => [
      { q: `規模${f.magnitude.toFixed(2)}のエネルギーはいくつですか？`, a: `10の${f.logJoule}乗ジュールです。TNTでは${Math.round(f.tntTons).toLocaleString()}トンです。` },
      { q: `広島型爆弾何発分ですか？`, a: `${f.hiroshima >= 1 ? `${Math.round(f.hiroshima).toLocaleString()}発` : `${f.hiroshima.toFixed(3)}発`}分です。放出エネルギーを見比べたもので、被害を見比べたものではありません。` },
      { q: `一目盛上とは何倍差ですか？`, a: `${f.stepRatio}倍です。0.05の差はどの規模でも同じ倍数です。` },
      { q: `規模が1低い地震何回分ですか？`, a: `${f.perOneLower}回分です。` },
    ],
    f => [
      { q: `Wie viel Energie steckt in Magnitude ${f.magnitude.toFixed(2)}?`, a: `10^${f.logJoule} Joule, also ${Math.round(f.tntTons).toLocaleString()} Tonnen TNT.` },
      { q: `Wie viele Hiroshima-Bomben?`, a: `${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)}. Verglichen wird freigesetzte Energie, nicht Schaden.` },
      { q: `Wie weit ist ein Schritt nach oben?`, a: `Das ${f.stepRatio}-Fache. Ein 0,05-Schritt ist bei jeder Magnitude derselbe Faktor.` },
      { q: `Wie viele Beben einen Punkt niedriger?`, a: `${f.perOneLower} Stück.` },
    ],
    f => [
      { q: `Quelle énergie pour la magnitude ${f.magnitude.toFixed(2)} ?`, a: `10^${f.logJoule} joules, soit ${Math.round(f.tntTons).toLocaleString()} tonnes de TNT.` },
      { q: `Combien de bombes d’Hiroshima ?`, a: `${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)}. On compare l’énergie libérée, pas les dégâts.` },
      { q: `Quel écart avec le pas suivant ?`, a: `${f.stepRatio} fois. Un pas de 0,05 vaut le même facteur à toute magnitude.` },
      { q: `Combien de séismes un point plus bas ?`, a: `${f.perOneLower}.` },
    ],
    f => [
      { q: `परिमाण ${f.magnitude.toFixed(2)} की ऊर्जा कितनी है?`, a: `10^${f.logJoule} जूल, यानी ${Math.round(f.tntTons).toLocaleString()} टन TNT।` },
      { q: `कितने हिरोशिमा बम?`, a: `${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)}। यह निकली ऊर्जा की तुलना है, नुक़सान की नहीं।` },
      { q: `एक चरण ऊपर से कितना अंतर?`, a: `${f.stepRatio} गुना। 0.05 का चरण हर परिमाण पर वही गुणक है।` },
      { q: `एक अंक कम के कितने भूकंप?`, a: `${f.perOneLower}।` },
    ],
    f => [
      { q: `${f.magnitude.toFixed(2)} 级的能量是多少？`, a: `10 的 ${f.logJoule} 次方焦耳，折合 TNT ${Math.round(f.tntTons).toLocaleString()} 吨。` },
      { q: `相当于几颗广岛原子弹？`, a: `${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} 颗。这是比较释放的能量，不是比较损害。` },
      { q: `和上一格差多少倍？`, a: `${f.stepRatio} 倍。0.05 之差在任何震级上都是同样的倍数。` },
      { q: `相当于多少次低一级的地震？`, a: `${f.perOneLower} 次。` },
    ],
    f => [
      { q: `${f.magnitude.toFixed(2)} 級的能量是多少？`, a: `10 的 ${f.logJoule} 次方焦耳，折合 TNT ${Math.round(f.tntTons).toLocaleString()} 噸。` },
      { q: `相當於幾顆廣島原子彈？`, a: `${f.hiroshima >= 1 ? Math.round(f.hiroshima).toLocaleString() : f.hiroshima.toFixed(3)} 顆。這是比較釋放的能量，不是比較損害。` },
      { q: `和上一格差多少倍？`, a: `${f.stepRatio} 倍。0.05 之差在任何規模上都是同樣的倍數。` },
      { q: `相當於多少次低一級的地震？`, a: `${f.perOneLower} 次。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const QUAKE_UI: L<QuakeUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<QuakeUI>;
