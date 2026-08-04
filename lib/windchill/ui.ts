/**
 * 체감온도 화면의 문구 — 열 언어.
 *
 * 가장 흔한 오해를 푸는 것이 이 화면의 일이다. 체감온도가 영하 20도라고 해서
 * 물이 영하 20도에서 얼지 않는다. 그 값은 바람이 살갗에서 열을 얼마나 빨리
 * 뺏는지를 온도로 바꿔 놓은 것이지, 공기가 그만큼 차가워졌다는 뜻이 아니다.
 *
 * 사람에게만 해당한다는 것도 짚어 준다. 자동차 냉각수도, 수도관도, 화분도
 * 체감온도가 아니라 기온을 따른다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { WindchillFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface WindchillUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  tempName: (t: number) => string;
  windName: (v: number) => string;
  feltLabel: string;
  dropLabel: string;
  tempLabel: string;
  windLabel: string;
  frostbiteLabel: string;
  fahrenheitLabel: string;
  calmLabel: string;
  safeTag: string;
  minuteUnit: (n: number) => string;
  notRealTitle: string;
  notRealNote: string;
  windTitle: string;
  windNote: string;
  frostbiteTitle: string;
  frostbiteNote: string;
  rangeTitle: string;
  rangeNote: string;
  tableTitle: string;
  neighbourTitle: string;
  caution: string;
  desc: (f: WindchillFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: WindchillFacts) => string;
  metaDesc: (f: WindchillFacts) => string;
  hubFaq: FaqItem[];
  windchillFaq: (f: WindchillFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof WindchillUI]: L<WindchillUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('체감온도', 'Wind chill', 'Sensación térmica', 'Sensação térmica', '体感温度', 'Windchill', 'Refroidissement éolien', 'विंड चिल', '体感温度', '體感溫度'),

  tempName: T<(t: number) => string>(
    t => (t < 0 ? `영하 ${-t}도` : `영상 ${t}도`),
    t => `${t} °C`,
    t => `${t} °C`,
    t => `${t} °C`,
    t => (t < 0 ? `氷点下${-t}度` : `${t}度`),
    t => `${t} °C`,
    t => `${t} °C`,
    t => `${t} °C`,
    t => (t < 0 ? `零下 ${-t} 度` : `${t} 度`),
    t => (t < 0 ? `零下 ${-t} 度` : `${t} 度`),
  ),

  windName: T<(v: number) => string>(
    v => `시속 ${v}km`,
    v => `${v} km/h`,
    v => `${v} km/h`,
    v => `${v} km/h`,
    v => `時速${v}km`,
    v => `${v} km/h`,
    v => `${v} km/h`,
    v => `${v} किमी/घंटा`,
    v => `${v} 公里/小时`,
    v => `${v} 公里/小時`,
  ),

  hubTitle: T(
    '체감온도 210가지 — 기온과 바람이 만드는 추위',
    '210 wind chills — what temperature and wind add up to',
    '210 sensaciones térmicas — lo que suman temperatura y viento',
    '210 sensações térmicas — o que temperatura e vento somam',
    '体感温度210通り — 気温と風がつくる寒さ',
    '210 Windchill-Werte — was Temperatur und Wind zusammen ergeben',
    '210 refroidissements éoliens — ce que la température et le vent additionnent',
    '210 विंड चिल — तापमान और हवा मिलकर क्या बनाते हैं',
    '210 种体感温度 — 气温和风合起来有多冷',
    '210 種體感溫度 — 氣溫和風合起來有多冷',
  ),

  hubLead: T(
    '기온 21가지와 풍속 10가지가 만나는 칸마다 체감온도를 계산했습니다. 영하 10도에 시속 30km 바람이면 체감은 영하 20도쯤입니다.',
    'A wind chill for every meeting of 21 temperatures and 10 wind speeds. At −10 °C with a 30 km/h wind, it feels like about −20 °C.',
    'Una sensación térmica para cada cruce de 21 temperaturas y 10 velocidades de viento. A −10 °C con viento de 30 km/h se siente como −20 °C.',
    'Uma sensação térmica para cada cruzamento de 21 temperaturas e 10 velocidades de vento. A −10 °C com vento de 30 km/h, parece −20 °C.',
    '気温21通りと風速10通りが出会う各マスの体感温度を計算しました。氷点下10度で時速30kmの風なら体感は氷点下20度ほどです。',
    'Für jede Begegnung von 21 Temperaturen und 10 Windgeschwindigkeiten ein Windchill-Wert. Bei −10 °C und 30 km/h fühlt es sich wie −20 °C an.',
    'Un refroidissement éolien pour chaque croisement de 21 températures et 10 vitesses de vent. À −10 °C avec 30 km/h, on ressent environ −20 °C.',
    '21 तापमान और 10 हवा-गतियों के हर मेल के लिए विंड चिल। −10 °C पर 30 किमी/घंटा हवा हो तो लगभग −20 °C जैसा लगता है।',
    '21 种气温与 10 种风速交汇的每一格都算出体感温度。零下 10 度、风速 30 公里时，体感约为零下 20 度。',
    '21 種氣溫與 10 種風速交匯的每一格都算出體感溫度。零下 10 度、風速 30 公里時，體感約為零下 20 度。',
  ),

  feltLabel: T('체감온도', 'Feels like', 'Sensación', 'Sensação', '体感温度', 'Gefühlt wie', 'Ressenti', 'महसूस होता है', '体感温度', '體感溫度'),
  dropLabel: T('기온보다', 'Below the actual air', 'Bajo la temperatura real', 'Abaixo da temperatura real', '気温より', 'Unter der Lufttemperatur', 'Sous la température réelle', 'वास्तविक तापमान से नीचे', '低于实际气温', '低於實際氣溫'),
  tempLabel: T('기온', 'Air temperature', 'Temperatura del aire', 'Temperatura do ar', '気温', 'Lufttemperatur', 'Température de l’air', 'वायु तापमान', '气温', '氣溫'),
  windLabel: T('풍속', 'Wind speed', 'Velocidad del viento', 'Velocidade do vento', '風速', 'Windgeschwindigkeit', 'Vitesse du vent', 'हवा की गति', '风速', '風速'),
  frostbiteLabel: T('동상까지', 'Frostbite in', 'Congelación en', 'Congelamento em', '凍傷まで', 'Erfrierung in', 'Gelure en', 'शीतदंश में', '冻伤时间', '凍傷時間'),
  fahrenheitLabel: T('화씨로', 'In Fahrenheit', 'En Fahrenheit', 'Em Fahrenheit', '華氏で', 'In Fahrenheit', 'En Fahrenheit', 'फ़ारेनहाइट में', '华氏', '華氏'),
  calmLabel: T('바람이 잔잔할 때', 'With barely any wind', 'Con viento apenas', 'Com vento fraco', '風がほぼないとき', 'Bei kaum Wind', 'Par vent faible', 'लगभग बिना हवा', '几乎无风时', '幾乎無風時'),
  safeTag: T('이 표의 위험 구간은 아닙니다', 'not in this table’s danger range', 'fuera del rango de riesgo', 'fora da faixa de risco', 'この表の危険域ではありません', 'außerhalb des Gefahrenbereichs', 'hors de la plage à risque', 'इस तालिका के ख़तरे में नहीं', '不在本表的危险区间', '不在本表的危險區間'),

  minuteUnit: T<(n: number) => string>(
    n => `${n}분`,
    n => `${n} minutes`,
    n => `${n} minutos`,
    n => `${n} minutos`,
    n => `${n}分`,
    n => `${n} Minuten`,
    n => `${n} minutes`,
    n => `${n} मिनट`,
    n => `${n} 分钟`,
    n => `${n} 分鐘`,
  ),

  notRealTitle: T('공기가 그만큼 차가워진 것은 아닙니다', 'The air did not actually get colder', 'El aire no se ha enfriado de verdad', 'O ar não esfriou de verdade', '空気がそこまで冷えたわけではありません', 'Die Luft ist nicht wirklich kälter geworden', 'L’air n’est pas devenu plus froid', 'हवा सचमुच उतनी ठंडी नहीं हुई', '空气并没有真的变那么冷', '空氣並沒有真的變那麼冷'),

  notRealNote: T(
    '체감온도는 바람이 살갗에서 열을 얼마나 빨리 뺏는지를 온도로 바꿔 놓은 값입니다. 기온이 영하 10도라면 물은 체감 영하 20도와 무관하게 영하 10도에서 업니다 — 수도관도, 자동차 냉각수도 기온을 따릅니다.',
    'Wind chill translates how fast moving air strips heat from skin into a temperature. If the air is −10 °C, water still freezes at −10 °C no matter that it feels like −20 — and so do pipes, radiators and everything else that is not a person.',
    'La sensación térmica traduce a temperatura la rapidez con que el viento roba calor a la piel. Si el aire está a −10 °C, el agua se congela a −10 °C aunque se sienta como −20; lo mismo las tuberías y el refrigerante del coche.',
    'A sensação térmica traduz em temperatura a rapidez com que o vento rouba calor da pele. Se o ar está a −10 °C, a água congela a −10 °C mesmo parecendo −20 — e o mesmo vale para canos e o líquido de arrefecimento.',
    '体感温度は、風が皮膚から熱をどれだけ速く奪うかを温度に置き換えた値です。気温が氷点下10度なら、体感が氷点下20度でも水は氷点下10度で凍ります——水道管も冷却水も気温に従います。',
    'Windchill übersetzt, wie schnell bewegte Luft der Haut Wärme entzieht, in eine Temperatur. Bei −10 °C Luft gefriert Wasser weiterhin bei −10 °C, auch wenn es sich wie −20 anfühlt — ebenso Leitungen und Kühlwasser.',
    'Le refroidissement éolien traduit en température la vitesse à laquelle le vent arrache la chaleur de la peau. Si l’air est à −10 °C, l’eau gèle toujours à −10 °C même si l’on ressent −20 — de même pour les canalisations et le liquide de refroidissement.',
    'विंड चिल यह बताता है कि हवा त्वचा से कितनी तेज़ी से गर्मी छीनती है, उसे तापमान में बदलकर। यदि हवा −10 °C है तो पानी −10 °C पर ही जमेगा, भले महसूस −20 हो — पाइप और कूलेंट भी वास्तविक तापमान मानते हैं।',
    '体感温度是把风从皮肤带走热量的快慢换算成温度。气温若是零下 10 度，水依然在零下 10 度结冰，哪怕体感是零下 20 度——水管和冷却液也只认气温。',
    '體感溫度是把風從皮膚帶走熱量的快慢換算成溫度。氣溫若是零下 10 度，水依然在零下 10 度結冰，哪怕體感是零下 20 度——水管和冷卻液也只認氣溫。',
  ),

  windTitle: T('처음 부는 바람이 가장 큽니다', 'The first breeze does the most', 'La primera brisa es la que más cuenta', 'A primeira brisa é a que mais conta', '最初の風が一番効きます', 'Der erste Wind wirkt am stärksten', 'C’est la première brise qui compte le plus', 'पहली हवा सबसे ज़्यादा असर करती है', '最初的那点风影响最大', '最初的那點風影響最大'),

  windNote: T(
    '시속 5km에서 20km로 오를 때 체감이 크게 떨어지지만, 40km에서 50km로 오를 때는 조금밖에 떨어지지 않습니다. 공식에 붙은 0.16 제곱이 그 모양을 만듭니다.',
    'Going from 5 to 20 km/h drops the felt temperature sharply; going from 40 to 50 barely moves it. The 0.16 exponent in the formula is what bends the curve that way.',
    'Pasar de 5 a 20 km/h hunde la sensación; pasar de 40 a 50 apenas la mueve. El exponente 0,16 de la fórmula es lo que curva así el efecto.',
    'Passar de 5 para 20 km/h derruba a sensação; de 40 para 50 quase não muda. O expoente 0,16 da fórmula é o que curva o efeito assim.',
    '時速5kmから20kmに上がるときは体感が大きく下がりますが、40kmから50kmではわずかしか下がりません。式についた0.16乗がその形をつくります。',
    'Von 5 auf 20 km/h fällt das Gefühl stark, von 40 auf 50 kaum noch. Der Exponent 0,16 in der Formel biegt die Kurve so.',
    'Passer de 5 à 20 km/h fait chuter le ressenti ; passer de 40 à 50 ne change presque rien. C’est l’exposant 0,16 de la formule qui courbe ainsi l’effet.',
    '5 से 20 किमी/घंटा जाने पर महसूस बहुत गिरता है, पर 40 से 50 पर मुश्किल से बदलता है। सूत्र का 0.16 घातांक ही यह मोड़ बनाता है।',
    '风速从 5 涨到 20 公里，体感骤降；从 40 涨到 50，几乎不再变。公式里 0.16 次方正是这条曲线的成因。',
    '風速從 5 漲到 20 公里，體感驟降；從 40 漲到 50，幾乎不再變。公式裡 0.16 次方正是這條曲線的成因。',
  ),

  frostbiteTitle: T('드러난 살갗이 어는 시간', 'How long bare skin lasts', 'Cuánto aguanta la piel descubierta', 'Quanto a pele exposta aguenta', '露出した肌が凍るまで', 'Wie lange nackte Haut übersteht', 'Combien de temps la peau nue tient', 'खुली त्वचा कितनी देर', '裸露皮肤能撑多久', '裸露皮膚能撐多久'),

  frostbiteNote: T(
    '캐나다 기상청 기준으로 체감 영하 28도부터 30분, 영하 38도부터 10분, 영하 48도부터 2분입니다. 옷차림과 습기, 젖은 정도에 따라 크게 달라집니다.',
    'By Environment Canada’s scale, exposed skin can freeze in 30 minutes below −28, in 10 below −38 and in 2 below −48. Clothing, damp and wind gusts shift those numbers a lot.',
    'Según Environment Canada, la piel expuesta puede congelarse en 30 minutos por debajo de −28, en 10 bajo −38 y en 2 bajo −48. La ropa, la humedad y las rachas cambian mucho esas cifras.',
    'Pela escala do Environment Canada, a pele exposta pode congelar em 30 minutos abaixo de −28, em 10 abaixo de −38 e em 2 abaixo de −48. Roupa, umidade e rajadas mudam muito esses números.',
    'カナダ環境省の基準で、体感氷点下28度から30分、38度から10分、48度から2分です。服装や湿り気、濡れ具合で大きく変わります。',
    'Nach der Skala von Environment Canada friert freie Haut unter −28 in 30 Minuten, unter −38 in 10 und unter −48 in 2. Kleidung, Nässe und Böen verschieben das erheblich.',
    'Selon Environnement Canada, la peau nue peut geler en 30 minutes sous −28, en 10 sous −38 et en 2 sous −48. Vêtements, humidité et rafales changent beaucoup ces durées.',
    'एनवायरनमेंट कनाडा के अनुसार खुली त्वचा −28 से नीचे 30 मिनट में, −38 से नीचे 10 में और −48 से नीचे 2 मिनट में जम सकती है। कपड़े, नमी और झोंके इन्हें बहुत बदल देते हैं।',
    '按加拿大环境部的标准，体感低于零下 28 度时裸露皮肤 30 分钟可能冻伤，低于 38 度 10 分钟，低于 48 度 2 分钟。衣着、潮湿与阵风会大幅改变这些时间。',
    '按加拿大環境部的標準，體感低於零下 28 度時裸露皮膚 30 分鐘可能凍傷，低於 38 度 10 分鐘，低於 48 度 2 分鐘。衣著、潮濕與陣風會大幅改變這些時間。',
  ),

  rangeTitle: T('영상 10도까지만 씁니다', 'The formula stops at 10 °C', 'La fórmula se detiene en 10 °C', 'A fórmula para em 10 °C', '使えるのは10度までです', 'Die Formel gilt nur bis 10 °C', 'La formule s’arrête à 10 °C', 'सूत्र 10 °C तक ही', '公式只用到 10 度', '公式只用到 10 度'),

  rangeNote: T(
    '이 공식은 기온 10도 이하, 풍속 시속 4.8km 이상에서만 쓰도록 정해져 있습니다. 그 위의 더위에서는 바람이 오히려 시원하게 해 주므로 다른 지표(열지수)를 씁니다.',
    'It is defined only for air at 10 °C or below with wind of at least 4.8 km/h. Above that, wind cools you off rather than punishing you, so summer uses a different index entirely.',
    'Solo está definida para aire a 10 °C o menos con viento de al menos 4,8 km/h. Por encima, el viento refresca en vez de castigar, así que el verano usa otro índice.',
    'Só é definida para ar a 10 °C ou menos com vento de pelo menos 4,8 km/h. Acima disso, o vento refresca em vez de castigar, então o verão usa outro índice.',
    'この式は気温10度以下、風速時速4.8km以上でのみ使うと定められています。それより暖かいときは風がむしろ涼しくしてくれるので、別の指標(暑さ指数)を使います。',
    'Sie gilt nur für Luft bei 10 °C oder darunter und Wind ab 4,8 km/h. Darüber kühlt Wind eher, weshalb der Sommer einen ganz anderen Index verwendet.',
    'Elle n’est définie que pour un air à 10 °C ou moins avec un vent d’au moins 4,8 km/h. Au-dessus, le vent rafraîchit plutôt qu’il ne punit : l’été utilise un tout autre indice.',
    'यह सूत्र केवल 10 °C या उससे कम तापमान और कम से कम 4.8 किमी/घंटा हवा के लिए है। इससे ऊपर हवा ठंडक देती है, इसलिए गर्मी में दूसरा सूचकांक चलता है।',
    '这条公式只适用于气温 10 度及以下、风速至少 4.8 公里的情况。再暖和时风反而让人凉快，夏天要用另一套指数。',
    '這條公式只適用於氣溫 10 度及以下、風速至少 4.8 公里的情況。再暖和時風反而讓人涼快，夏天要用另一套指數。',
  ),

  tableTitle: T('기온과 풍속으로 찾기', 'Find it by temperature and wind', 'Búscalo por temperatura y viento', 'Ache por temperatura e vento', '気温と風速から探す', 'Nach Temperatur und Wind suchen', 'Chercher par température et vent', 'तापमान और हवा से देखें', '按气温和风速查找', '按氣溫和風速查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),

  caution: T(
    '어림입니다. 이 값은 마른 살갗과 그늘, 평지에서 잰 표준식이라 해가 나면 덜 춥게, 젖으면 훨씬 춥게 느껴집니다. 옷차림과 바람의 방향도 그만큼 크게 작용합니다.',
    'These are estimates. The standard formula assumes dry skin, shade and level ground: sunshine makes it feel warmer, wet clothing far colder, and what you wear matters as much as the number.',
    'Son estimaciones. La fórmula estándar supone piel seca, sombra y terreno llano: el sol hace que se sienta menos frío, la ropa mojada mucho más, y lo que llevas puesto pesa tanto como la cifra.',
    'São estimativas. A fórmula padrão supõe pele seca, sombra e terreno plano: o sol faz parecer menos frio, roupa molhada muito mais, e o que você veste pesa tanto quanto o número.',
    '目安です。標準式は乾いた肌・日陰・平地を前提にしているので、日が差せば暖かく、濡れればずっと寒く感じます。服装や風向きも同じくらい効きます。',
    'Das sind Schätzwerte. Die Standardformel unterstellt trockene Haut, Schatten und ebenes Gelände: Sonne lässt es wärmer wirken, nasse Kleidung viel kälter — und die Kleidung zählt so viel wie die Zahl.',
    'Ce sont des estimations. La formule standard suppose peau sèche, ombre et terrain plat : le soleil réchauffe la sensation, les vêtements mouillés la refroidissent bien plus, et l’habillement compte autant que le chiffre.',
    'ये अनुमान हैं। मानक सूत्र सूखी त्वचा, छाया और समतल भूमि मानता है: धूप में कम ठंड लगती है, भीगने पर कहीं अधिक — और कपड़े उतने ही मायने रखते हैं जितनी यह संख्या।',
    '这些是估算值。标准公式假定皮肤干燥、处于背阴与平地：出太阳会觉得没那么冷，衣服湿了则冷得多，穿什么和这个数字一样重要。',
    '這些是估算值。標準公式假定皮膚乾燥、處於背陰與平地：出太陽會覺得沒那麼冷，衣服濕了則冷得多，穿什麼和這個數字一樣重要。',
  ),

  desc: T<(f: WindchillFacts) => string>(
    f => `기온 ${f.cell.t}도에 시속 ${f.cell.v}km 바람이면 체감온도는 ${f.felt}도입니다. 기온보다 ${f.drop}도 낮게 느껴지는 셈입니다.`,
    f => `At ${f.cell.t} °C with a ${f.cell.v} km/h wind it feels like ${f.felt} °C — ${f.drop} degrees below the actual air.`,
    f => `A ${f.cell.t} °C con viento de ${f.cell.v} km/h se siente como ${f.felt} °C, es decir ${f.drop} grados menos que el aire.`,
    f => `A ${f.cell.t} °C com vento de ${f.cell.v} km/h parece ${f.felt} °C — ${f.drop} graus abaixo do ar.`,
    f => `気温${f.cell.t}度で時速${f.cell.v}kmの風なら体感温度は${f.felt}度です。気温より${f.drop}度低く感じることになります。`,
    f => `Bei ${f.cell.t} °C und ${f.cell.v} km/h Wind fühlt es sich wie ${f.felt} °C an — ${f.drop} Grad unter der Lufttemperatur.`,
    f => `À ${f.cell.t} °C avec un vent de ${f.cell.v} km/h, on ressent ${f.felt} °C, soit ${f.drop} degrés sous la température de l’air.`,
    f => `${f.cell.t} °C पर ${f.cell.v} किमी/घंटा हवा हो तो ${f.felt} °C जैसा लगता है — यानी वायु तापमान से ${f.drop} डिग्री नीचे।`,
    f => `气温 ${f.cell.t} 度、风速 ${f.cell.v} 公里时，体感为 ${f.felt} 度，比实际气温低 ${f.drop} 度。`,
    f => `氣溫 ${f.cell.t} 度、風速 ${f.cell.v} 公里時，體感為 ${f.felt} 度，比實際氣溫低 ${f.drop} 度。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '체감 = 13.12 + 0.6215T − 11.37V^0.16 + 0.3965T·V^0.16 (T는 섭씨, V는 시속 km).',
      '바람이 셀수록 체감이 내려가지만, 세질수록 내려가는 폭은 작아집니다.',
      '기온 10도 이하, 풍속 시속 4.8km 이상에서만 쓰는 값입니다.',
      '사람이 느끼는 추위이지 공기의 온도가 아닙니다 — 물은 기온대로 업니다.',
    ],
    [
      'Feels like = 13.12 + 0.6215T − 11.37V^0.16 + 0.3965T·V^0.16, with T in °C and V in km/h.',
      'Stronger wind always lowers the number, but each extra km/h lowers it less than the last.',
      'The formula applies only at 10 °C or below with wind of at least 4.8 km/h.',
      'It is a measure of how cold a person feels, not of the air — water still freezes at the air temperature.',
    ],
    [
      'Sensación = 13,12 + 0,6215T − 11,37V^0,16 + 0,3965T·V^0,16, con T en °C y V en km/h.',
      'Más viento siempre baja la cifra, pero cada km/h extra la baja menos que el anterior.',
      'Solo se aplica a 10 °C o menos con viento de al menos 4,8 km/h.',
      'Mide el frío que siente una persona, no el aire: el agua se congela según la temperatura real.',
    ],
    [
      'Sensação = 13,12 + 0,6215T − 11,37V^0,16 + 0,3965T·V^0,16, com T em °C e V em km/h.',
      'Mais vento sempre baixa o número, mas cada km/h extra baixa menos que o anterior.',
      'Só vale a 10 °C ou menos com vento de pelo menos 4,8 km/h.',
      'Mede o frio que a pessoa sente, não o ar: a água congela conforme a temperatura real.',
    ],
    [
      '体感 = 13.12 + 0.6215T − 11.37V^0.16 + 0.3965T·V^0.16（Tは摂氏、Vは時速km）。',
      '風が強いほど体感は下がりますが、強くなるほど下がり幅は小さくなります。',
      '気温10度以下、風速時速4.8km以上でのみ使う値です。',
      '人が感じる寒さであって空気の温度ではありません——水は気温どおりに凍ります。',
    ],
    [
      'Gefühlt = 13,12 + 0,6215T − 11,37V^0,16 + 0,3965T·V^0,16, T in °C, V in km/h.',
      'Mehr Wind senkt den Wert stets, doch jedes weitere km/h senkt ihn weniger als das vorige.',
      'Gültig nur bei 10 °C oder darunter und Wind ab 4,8 km/h.',
      'Gemessen wird die Kälte für den Menschen, nicht die Luft — Wasser gefriert bei der Lufttemperatur.',
    ],
    [
      'Ressenti = 13,12 + 0,6215T − 11,37V^0,16 + 0,3965T·V^0,16, T en °C et V en km/h.',
      'Plus de vent abaisse toujours la valeur, mais chaque km/h supplémentaire l’abaisse moins que le précédent.',
      'La formule ne vaut qu’à 10 °C ou moins avec un vent d’au moins 4,8 km/h.',
      'Elle mesure le froid ressenti par une personne, pas l’air : l’eau gèle à la température réelle.',
    ],
    [
      'महसूस = 13.12 + 0.6215T − 11.37V^0.16 + 0.3965T·V^0.16 (T °C में, V किमी/घंटा में)।',
      'हवा तेज़ होने पर मान गिरता है, पर हर अगला किमी/घंटा पिछले से कम गिराता है।',
      'यह केवल 10 °C या कम तापमान और कम से कम 4.8 किमी/घंटा हवा पर लागू है।',
      'यह व्यक्ति को लगने वाली ठंड है, हवा का तापमान नहीं — पानी वास्तविक तापमान पर ही जमता है।',
    ],
    [
      '体感 = 13.12 + 0.6215T − 11.37V^0.16 + 0.3965T·V^0.16（T 为摄氏度，V 为公里/小时）。',
      '风越大体感越低，但每多一公里带来的降幅越来越小。',
      '该公式只用于气温 10 度及以下、风速至少 4.8 公里的情况。',
      '它衡量的是人感到的冷，不是空气温度——水仍按实际气温结冰。',
    ],
    [
      '體感 = 13.12 + 0.6215T − 11.37V^0.16 + 0.3965T·V^0.16（T 為攝氏度，V 為公里/小時）。',
      '風越大體感越低，但每多一公里帶來的降幅越來越小。',
      '該公式只用於氣溫 10 度及以下、風速至少 4.8 公里的情況。',
      '它衡量的是人感到的冷，不是空氣溫度——水仍按實際氣溫結冰。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '체감온도표 — 기온과 풍속으로 보는 210칸',
    'Wind chill chart — 210 cells of temperature and wind',
    'Tabla de sensación térmica — 210 casillas de temperatura y viento',
    'Tabela de sensação térmica — 210 células de temperatura e vento',
    '体感温度表 — 気温と風速で見る210マス',
    'Windchill-Tabelle — 210 Felder aus Temperatur und Wind',
    'Table du refroidissement éolien — 210 cases de température et de vent',
    'विंड चिल चार्ट — तापमान और हवा के 210 खाने',
    '体感温度表 — 气温与风速交汇的 210 格',
    '體感溫度表 — 氣溫與風速交匯的 210 格',
  ),

  hubMetaDesc: T(
    '기온 영하 30도부터 영상 10도까지, 풍속 시속 5km부터 50km까지 체감온도를 계산했습니다. 동상까지 걸리는 시간과 화씨 값도 함께 냅니다.',
    'Wind chill for air from −30 to 10 °C and wind from 5 to 50 km/h, with the time bare skin can take and the value in Fahrenheit.',
    'Sensación térmica para aire de −30 a 10 °C y viento de 5 a 50 km/h, con el tiempo que aguanta la piel descubierta y el valor en Fahrenheit.',
    'Sensação térmica para ar de −30 a 10 °C e vento de 5 a 50 km/h, com o tempo que a pele exposta aguenta e o valor em Fahrenheit.',
    '気温氷点下30度から10度、風速時速5kmから50kmまでの体感温度を計算しました。凍傷までの時間と華氏の値も示します。',
    'Windchill für Luft von −30 bis 10 °C und Wind von 5 bis 50 km/h — mit der Zeit, die nackte Haut übersteht, und dem Wert in Fahrenheit.',
    'Refroidissement éolien pour un air de −30 à 10 °C et un vent de 5 à 50 km/h, avec le temps que tient la peau nue et la valeur en Fahrenheit.',
    '−30 से 10 °C तापमान और 5 से 50 किमी/घंटा हवा के लिए विंड चिल, साथ में खुली त्वचा का समय और फ़ारेनहाइट मान।',
    '气温从零下 30 度到 10 度、风速 5 到 50 公里的体感温度，并给出裸露皮肤可撑时间与华氏值。',
    '氣溫從零下 30 度到 10 度、風速 5 到 50 公里的體感溫度，並給出裸露皮膚可撐時間與華氏值。',
  ),

  metaTitle: T<(f: WindchillFacts) => string>(
    f => `기온 ${f.cell.t}도 · 바람 시속 ${f.cell.v}km — 체감 ${f.felt}도`,
    f => `${f.cell.t} °C with ${f.cell.v} km/h wind — feels like ${f.felt} °C`,
    f => `${f.cell.t} °C con viento de ${f.cell.v} km/h — se siente ${f.felt} °C`,
    f => `${f.cell.t} °C com vento de ${f.cell.v} km/h — parece ${f.felt} °C`,
    f => `気温${f.cell.t}度・風速${f.cell.v}km — 体感${f.felt}度`,
    f => `${f.cell.t} °C bei ${f.cell.v} km/h Wind — gefühlt ${f.felt} °C`,
    f => `${f.cell.t} °C avec ${f.cell.v} km/h de vent — ressenti ${f.felt} °C`,
    f => `${f.cell.t} °C, हवा ${f.cell.v} किमी/घंटा — महसूस ${f.felt} °C`,
    f => `气温 ${f.cell.t} 度、风速 ${f.cell.v} 公里 — 体感 ${f.felt} 度`,
    f => `氣溫 ${f.cell.t} 度、風速 ${f.cell.v} 公里 — 體感 ${f.felt} 度`,
  ),

  metaDesc: T<(f: WindchillFacts) => string>(
    f => `기온 ${f.cell.t}도에 시속 ${f.cell.v}km 바람이 불면 체감온도는 ${f.felt}도(화씨 ${f.fahrenheit}도)입니다. 기온보다 ${f.drop}도 낮고, ${f.frostbite !== null ? `드러난 살갗은 ${f.frostbite}분 만에 얼 수 있습니다` : '이 표의 동상 위험 구간은 아닙니다'}.`,
    f => `${f.cell.t} °C with ${f.cell.v} km/h of wind feels like ${f.felt} °C (${f.fahrenheit} °F) — ${f.drop} degrees below the air. ${f.frostbite !== null ? `Bare skin can freeze in ${f.frostbite} minutes.` : 'That is outside this table’s frostbite range.'}`,
    f => `${f.cell.t} °C con viento de ${f.cell.v} km/h se siente como ${f.felt} °C (${f.fahrenheit} °F), ${f.drop} grados menos que el aire. ${f.frostbite !== null ? `La piel expuesta puede congelarse en ${f.frostbite} minutos.` : 'Queda fuera del rango de congelación de esta tabla.'}`,
    f => `${f.cell.t} °C com vento de ${f.cell.v} km/h parece ${f.felt} °C (${f.fahrenheit} °F), ${f.drop} graus abaixo do ar. ${f.frostbite !== null ? `A pele exposta pode congelar em ${f.frostbite} minutos.` : 'Fica fora da faixa de congelamento desta tabela.'}`,
    f => `気温${f.cell.t}度で時速${f.cell.v}kmの風が吹くと体感は${f.felt}度（華氏${f.fahrenheit}度）です。気温より${f.drop}度低く、${f.frostbite !== null ? `露出した肌は${f.frostbite}分で凍ることがあります` : 'この表の凍傷危険域ではありません'}。`,
    f => `${f.cell.t} °C bei ${f.cell.v} km/h Wind fühlen sich wie ${f.felt} °C (${f.fahrenheit} °F) an — ${f.drop} Grad unter der Luft. ${f.frostbite !== null ? `Freie Haut kann in ${f.frostbite} Minuten erfrieren.` : 'Das liegt außerhalb des Erfrierungsbereichs dieser Tabelle.'}`,
    f => `${f.cell.t} °C avec ${f.cell.v} km/h de vent donnent un ressenti de ${f.felt} °C (${f.fahrenheit} °F), soit ${f.drop} degrés sous l’air. ${f.frostbite !== null ? `La peau nue peut geler en ${f.frostbite} minutes.` : 'C’est hors de la plage de gelure de cette table.'}`,
    f => `${f.cell.t} °C पर ${f.cell.v} किमी/घंटा हवा से महसूस ${f.felt} °C (${f.fahrenheit} °F) होता है — वायु से ${f.drop} डिग्री नीचे। ${f.frostbite !== null ? `खुली त्वचा ${f.frostbite} मिनट में जम सकती है।` : 'यह इस तालिका की शीतदंश सीमा में नहीं है।'}`,
    f => `气温 ${f.cell.t} 度、风速 ${f.cell.v} 公里时体感为 ${f.felt} 度（华氏 ${f.fahrenheit} 度），比气温低 ${f.drop} 度。${f.frostbite !== null ? `裸露皮肤可能在 ${f.frostbite} 分钟内冻伤。` : '不在本表的冻伤区间内。'}`,
    f => `氣溫 ${f.cell.t} 度、風速 ${f.cell.v} 公里時體感為 ${f.felt} 度（華氏 ${f.fahrenheit} 度），比氣溫低 ${f.drop} 度。${f.frostbite !== null ? `裸露皮膚可能在 ${f.frostbite} 分鐘內凍傷。` : '不在本表的凍傷區間內。'}`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '체감온도가 영하 20도면 물이 그때 어나요?', a: '아닙니다. 물은 기온을 따릅니다. 체감온도는 바람이 살갗에서 열을 뺏는 속도를 온도로 바꾼 값이라 사람에게만 해당합니다.' },
      { q: '바람이 두 배로 세지면 두 배 추운가요?', a: '아닙니다. 공식에 0.16 제곱이 붙어 있어 처음 부는 바람이 가장 크게 작용하고, 이미 센 바람에서는 더 세져도 조금밖에 달라지지 않습니다.' },
      { q: '해가 나면 이 값이 맞나요?', a: '표준식은 그늘을 전제로 합니다. 햇볕이 강하면 실제로는 몇 도쯤 덜 춥게 느껴집니다.' },
      { q: '왜 영상 10도까지만 있나요?', a: '이 공식이 그 범위에서만 쓰도록 정해졌기 때문입니다. 더 따뜻할 때는 바람이 오히려 시원하게 해 주므로 여름에는 열지수라는 다른 지표를 씁니다.' },
      { q: '옷을 두껍게 입으면 달라지나요?', a: '체감온도 값 자체는 그대로입니다. 그 값은 드러난 살갗을 기준으로 하기 때문입니다 — 옷은 그 추위를 막아 주는 쪽입니다.' },
    ],
    [
      { q: 'If it feels like −20, does water freeze at −20?', a: 'No. Water follows the air temperature. Wind chill converts how fast wind strips heat from skin into a temperature, so it applies to people only.' },
      { q: 'Does twice the wind mean twice the chill?', a: 'No. The 0.16 exponent means the first breeze does most of the work; once the wind is already strong, more of it changes little.' },
      { q: 'Does the number hold in bright sun?', a: 'The standard formula assumes shade. In strong sunshine it typically feels a few degrees warmer than the table says.' },
      { q: 'Why does the table stop at 10 °C?', a: 'Because the formula is defined only up to there. In warmer air wind cools you off, so summer uses the heat index instead.' },
      { q: 'Does dressing warmly change the value?', a: 'Not the value itself — it is defined for bare skin. Clothing is what stands between you and that number.' },
    ],
    [
      { q: 'Si se sienten −20, ¿el agua se congela a −20?', a: 'No. El agua sigue la temperatura del aire. La sensación térmica traduce a temperatura la rapidez con que el viento roba calor a la piel, así que solo vale para personas.' },
      { q: '¿El doble de viento es el doble de frío?', a: 'No. El exponente 0,16 hace que la primera brisa haga casi todo el trabajo; con viento ya fuerte, más viento cambia poco.' },
      { q: '¿Vale el número a pleno sol?', a: 'La fórmula estándar supone sombra. Con sol fuerte suele sentirse unos grados menos frío de lo que dice la tabla.' },
      { q: '¿Por qué la tabla acaba en 10 °C?', a: 'Porque la fórmula solo está definida hasta ahí. Con aire más cálido el viento refresca, y el verano usa el índice de calor.' },
      { q: '¿Abrigarse cambia el valor?', a: 'El valor no: está definido para piel descubierta. La ropa es justamente lo que se interpone entre tú y esa cifra.' },
    ],
    [
      { q: 'Se parece −20, a água congela a −20?', a: 'Não. A água segue a temperatura do ar. A sensação térmica traduz em temperatura a rapidez com que o vento rouba calor da pele, então vale só para pessoas.' },
      { q: 'O dobro de vento é o dobro de frio?', a: 'Não. O expoente 0,16 faz a primeira brisa realizar quase todo o efeito; com vento já forte, mais vento muda pouco.' },
      { q: 'O número vale sob sol forte?', a: 'A fórmula padrão supõe sombra. Com sol forte costuma parecer alguns graus menos frio do que a tabela diz.' },
      { q: 'Por que a tabela para em 10 °C?', a: 'Porque a fórmula só é definida até ali. Com ar mais quente o vento refresca, e o verão usa o índice de calor.' },
      { q: 'Agasalhar-se muda o valor?', a: 'O valor não: ele é definido para pele exposta. A roupa é justamente o que fica entre você e esse número.' },
    ],
    [
      { q: '体感が氷点下20度なら水もそこで凍りますか？', a: 'いいえ。水は気温に従います。体感温度は風が皮膚から熱を奪う速さを温度に置き換えた値なので、人にしか当てはまりません。' },
      { q: '風が二倍になれば二倍寒いですか？', a: 'いいえ。式に0.16乗が付いているため最初の風が最も効き、すでに強い風ではさらに強くなってもわずかしか変わりません。' },
      { q: '日が差していてもこの値ですか？', a: '標準式は日陰を前提にしています。強い日差しの下では実際には数度ほど暖かく感じます。' },
      { q: 'なぜ10度までしかないのですか？', a: 'この式がその範囲でしか使えないと定められているからです。もっと暖かいときは風がむしろ涼しくするので、夏は暑さ指数という別の指標を使います。' },
      { q: '厚着をすると値が変わりますか？', a: '値そのものは変わりません。露出した肌を基準にした値だからです——服はその寒さを防ぐ側にあります。' },
    ],
    [
      { q: 'Gefriert Wasser bei gefühlten −20 °C?', a: 'Nein. Wasser richtet sich nach der Lufttemperatur. Windchill übersetzt nur, wie schnell Wind der Haut Wärme entzieht — er gilt für Menschen.' },
      { q: 'Doppelter Wind, doppelte Kälte?', a: 'Nein. Wegen des Exponenten 0,16 wirkt der erste Wind am stärksten; bei bereits kräftigem Wind ändert mehr davon wenig.' },
      { q: 'Stimmt der Wert bei Sonnenschein?', a: 'Die Standardformel unterstellt Schatten. Bei kräftiger Sonne fühlt es sich meist ein paar Grad wärmer an, als die Tabelle sagt.' },
      { q: 'Warum endet die Tabelle bei 10 °C?', a: 'Weil die Formel nur bis dahin definiert ist. In wärmerer Luft kühlt Wind, deshalb nutzt der Sommer den Hitzeindex.' },
      { q: 'Ändert warme Kleidung den Wert?', a: 'Den Wert nicht — er gilt für nackte Haut. Kleidung ist genau das, was zwischen dir und dieser Zahl steht.' },
    ],
    [
      { q: 'Si l’on ressent −20, l’eau gèle-t-elle à −20 ?', a: 'Non. L’eau suit la température de l’air. Le refroidissement éolien traduit la vitesse à laquelle le vent prend la chaleur de la peau : il ne vaut que pour les personnes.' },
      { q: 'Deux fois plus de vent, deux fois plus froid ?', a: 'Non. L’exposant 0,16 fait que la première brise fait presque tout ; quand le vent est déjà fort, en ajouter change peu.' },
      { q: 'Le chiffre tient-il en plein soleil ?', a: 'La formule standard suppose l’ombre. Sous un soleil vif, on ressent en général quelques degrés de moins que ce qu’indique la table.' },
      { q: 'Pourquoi la table s’arrête-t-elle à 10 °C ?', a: 'Parce que la formule n’est définie que jusque-là. Dans un air plus chaud, le vent rafraîchit : l’été utilise l’indice de chaleur.' },
      { q: 'Se couvrir change-t-il la valeur ?', a: 'Pas la valeur : elle est définie pour la peau nue. Les vêtements sont précisément ce qui s’interpose entre vous et ce chiffre.' },
    ],
    [
      { q: 'महसूस −20 हो तो क्या पानी −20 पर जमेगा?', a: 'नहीं। पानी वायु तापमान मानता है। विंड चिल केवल यह बताता है कि हवा त्वचा से कितनी तेज़ी से गर्मी लेती है — यह लोगों पर लागू है।' },
      { q: 'हवा दोगुनी तो ठंड दोगुनी?', a: 'नहीं। 0.16 घातांक के कारण पहली हवा सबसे अधिक असर करती है; पहले से तेज़ हवा में और तेज़ी से थोड़ा ही बदलता है।' },
      { q: 'तेज़ धूप में भी यही मान रहेगा?', a: 'मानक सूत्र छाया मानता है। तेज़ धूप में आमतौर पर तालिका से कुछ डिग्री कम ठंड लगती है।' },
      { q: 'तालिका 10 °C पर क्यों रुकती है?', a: 'क्योंकि सूत्र वहीं तक परिभाषित है। गर्म हवा में हवा ठंडक देती है, इसलिए गर्मी में हीट इंडेक्स चलता है।' },
      { q: 'गर्म कपड़े पहनने से मान बदलेगा?', a: 'मान नहीं — वह खुली त्वचा के लिए है। कपड़े तो वही हैं जो आपके और इस संख्या के बीच खड़े रहते हैं।' },
    ],
    [
      { q: '体感零下 20 度，水就会在零下 20 度结冰吗？', a: '不会。水只认气温。体感温度是把风从皮肤带走热量的快慢换算成温度，只适用于人。' },
      { q: '风大一倍就冷一倍吗？', a: '不是。公式里的 0.16 次方让最初的风起最大作用；风已经很大时，再大也变化不多。' },
      { q: '出太阳时这个数还准吗？', a: '标准公式假定在背阴处。阳光强时通常会比表上感觉暖几度。' },
      { q: '为什么表只到 10 度？', a: '因为公式只在这一范围内适用。更暖时风反而让人凉快，夏天要用热指数。' },
      { q: '穿厚一点会改变这个数吗？', a: '数值本身不变——它是按裸露皮肤定义的。衣服正是挡在你和这个数字之间的东西。' },
    ],
    [
      { q: '體感零下 20 度，水就會在零下 20 度結冰嗎？', a: '不會。水只認氣溫。體感溫度是把風從皮膚帶走熱量的快慢換算成溫度，只適用於人。' },
      { q: '風大一倍就冷一倍嗎？', a: '不是。公式裡的 0.16 次方讓最初的風起最大作用；風已經很大時，再大也變化不多。' },
      { q: '出太陽時這個數還準嗎？', a: '標準公式假定在背陰處。陽光強時通常會比表上感覺暖幾度。' },
      { q: '為什麼表只到 10 度？', a: '因為公式只在這一範圍內適用。更暖時風反而讓人涼快，夏天要用熱指數。' },
      { q: '穿厚一點會改變這個數嗎？', a: '數值本身不變——它是按裸露皮膚定義的。衣服正是擋在你和這個數字之間的東西。' },
    ],
  ),

  windchillFaq: T<(f: WindchillFacts) => FaqItem[]>(
    f => [
      { q: `기온 ${f.cell.t}도에 시속 ${f.cell.v}km면 체감이 몇 도인가요?`, a: `${f.felt}도입니다. 기온보다 ${f.drop}도 낮게 느껴집니다.` },
      { q: `바람이 없으면 어떤가요?`, a: `같은 기온에 바람이 잔잔하면(시속 5km) 체감은 ${f.calm}도입니다.` },
      { q: `드러난 살갗은 괜찮나요?`, a: f.frostbite !== null ? `체감 ${f.felt}도면 ${f.frostbite}분 만에 얼 수 있습니다. 귀와 코부터 가리세요.` : `이 표의 동상 위험 구간은 아닙니다. 다만 젖으면 훨씬 위험해집니다.` },
      { q: `화씨로는 몇 도인가요?`, a: `${f.fahrenheit}도입니다.` },
    ],
    f => [
      { q: `What does ${f.cell.t} °C with ${f.cell.v} km/h feel like?`, a: `Like ${f.felt} °C — ${f.drop} degrees below the actual air.` },
      { q: `And with almost no wind?`, a: `At the same temperature with a 5 km/h breeze it would feel like ${f.calm} °C.` },
      { q: `Is bare skin safe?`, a: f.frostbite !== null ? `At ${f.felt} °C it can freeze in ${f.frostbite} minutes — cover ears and nose first.` : `It is outside this table’s frostbite range, though getting wet changes that quickly.` },
      { q: `What is that in Fahrenheit?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `¿Cómo se siente ${f.cell.t} °C con ${f.cell.v} km/h?`, a: `Como ${f.felt} °C, es decir ${f.drop} grados menos que el aire.` },
      { q: `¿Y casi sin viento?`, a: `A la misma temperatura con brisa de 5 km/h se sentirían ${f.calm} °C.` },
      { q: `¿Es seguro para la piel descubierta?`, a: f.frostbite !== null ? `A ${f.felt} °C puede congelarse en ${f.frostbite} minutos: cubre orejas y nariz primero.` : `Queda fuera del rango de congelación de esta tabla, aunque mojarse lo cambia rápido.` },
      { q: `¿Cuánto es en Fahrenheit?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `Como parece ${f.cell.t} °C com ${f.cell.v} km/h?`, a: `Como ${f.felt} °C, ou seja ${f.drop} graus abaixo do ar.` },
      { q: `E quase sem vento?`, a: `Na mesma temperatura com brisa de 5 km/h pareceria ${f.calm} °C.` },
      { q: `A pele exposta está segura?`, a: f.frostbite !== null ? `A ${f.felt} °C pode congelar em ${f.frostbite} minutos — cubra orelhas e nariz primeiro.` : `Fica fora da faixa de congelamento desta tabela, embora se molhar mude isso rápido.` },
      { q: `Quanto é em Fahrenheit?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `気温${f.cell.t}度・時速${f.cell.v}kmの体感は？`, a: `${f.felt}度です。気温より${f.drop}度低く感じます。` },
      { q: `風がほとんどないときは？`, a: `同じ気温で時速5kmなら体感は${f.calm}度です。` },
      { q: `露出した肌は大丈夫ですか？`, a: f.frostbite !== null ? `体感${f.felt}度では${f.frostbite}分で凍ることがあります。耳と鼻から覆ってください。` : `この表の凍傷危険域ではありません。ただし濡れると一気に危うくなります。` },
      { q: `華氏では何度ですか？`, a: `${f.fahrenheit}度です。` },
    ],
    f => [
      { q: `Wie fühlen sich ${f.cell.t} °C bei ${f.cell.v} km/h an?`, a: `Wie ${f.felt} °C — ${f.drop} Grad unter der Lufttemperatur.` },
      { q: `Und bei fast keinem Wind?`, a: `Bei gleicher Temperatur und 5 km/h wären es gefühlte ${f.calm} °C.` },
      { q: `Ist nackte Haut sicher?`, a: f.frostbite !== null ? `Bei ${f.felt} °C kann sie in ${f.frostbite} Minuten erfrieren — Ohren und Nase zuerst bedecken.` : `Es liegt außerhalb des Erfrierungsbereichs dieser Tabelle; nass wird das jedoch schnell anders.` },
      { q: `Wie viel ist das in Fahrenheit?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `Que ressent-on à ${f.cell.t} °C avec ${f.cell.v} km/h ?`, a: `Comme ${f.felt} °C, soit ${f.drop} degrés sous l’air.` },
      { q: `Et presque sans vent ?`, a: `À la même température avec 5 km/h, on ressentirait ${f.calm} °C.` },
      { q: `La peau nue risque-t-elle quelque chose ?`, a: f.frostbite !== null ? `À ${f.felt} °C, elle peut geler en ${f.frostbite} minutes — couvrez d’abord oreilles et nez.` : `C’est hors de la plage de gelure de cette table, mais être mouillé change vite la donne.` },
      { q: `Combien est-ce en Fahrenheit ?`, a: `${f.fahrenheit} °F.` },
    ],
    f => [
      { q: `${f.cell.t} °C और ${f.cell.v} किमी/घंटा पर कैसा लगता है?`, a: `${f.felt} °C जैसा — वायु तापमान से ${f.drop} डिग्री नीचे।` },
      { q: `और लगभग बिना हवा के?`, a: `उसी तापमान पर 5 किमी/घंटा हवा हो तो ${f.calm} °C जैसा लगेगा।` },
      { q: `क्या खुली त्वचा सुरक्षित है?`, a: f.frostbite !== null ? `${f.felt} °C पर वह ${f.frostbite} मिनट में जम सकती है — पहले कान और नाक ढकिए।` : `यह इस तालिका की शीतदंश सीमा में नहीं है, पर भीगते ही बात बदल जाती है।` },
      { q: `फ़ारेनहाइट में कितना?`, a: `${f.fahrenheit} °F।` },
    ],
    f => [
      { q: `气温 ${f.cell.t} 度、风速 ${f.cell.v} 公里，体感是多少？`, a: `${f.felt} 度，比实际气温低 ${f.drop} 度。` },
      { q: `几乎没风时呢？`, a: `同样气温下风速 5 公里时，体感为 ${f.calm} 度。` },
      { q: `裸露皮肤安全吗？`, a: f.frostbite !== null ? `体感 ${f.felt} 度时可能 ${f.frostbite} 分钟内冻伤，先护住耳朵和鼻子。` : `不在本表的冻伤区间，但一旦淋湿就完全不同了。` },
      { q: `换成华氏是多少？`, a: `${f.fahrenheit} 华氏度。` },
    ],
    f => [
      { q: `氣溫 ${f.cell.t} 度、風速 ${f.cell.v} 公里，體感是多少？`, a: `${f.felt} 度，比實際氣溫低 ${f.drop} 度。` },
      { q: `幾乎沒風時呢？`, a: `同樣氣溫下風速 5 公里時，體感為 ${f.calm} 度。` },
      { q: `裸露皮膚安全嗎？`, a: f.frostbite !== null ? `體感 ${f.felt} 度時可能 ${f.frostbite} 分鐘內凍傷，先護住耳朵和鼻子。` : `不在本表的凍傷區間，但一旦淋濕就完全不同了。` },
      { q: `換成華氏是多少？`, a: `${f.fahrenheit} 華氏度。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const WINDCHILL_UI: L<WindchillUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<WindchillUI>;
