/**
 * 등산 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "산에서 시간을 가르는 것은 거리가 아니라 오름"이다.
 * 네이스미스의 규칙 두 줄에서 오름 1미터가 평지 8.33미터라는 비까지 따라
 * 나오므로, 코스 하나를 등가 거리 숫자 하나로 견줄 수 있다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { HikeFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface HikeUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  distanceLabel: string;
  ascentLabel: string;
  upLabel: string;
  downLabel: string;
  roundLabel: string;
  slopeLabel: string;
  equivalentLabel: string;
  speedLabel: string;
  gradeLabel: string;
  gradeName: (key: string) => string;
  clock: (minutes: number) => string;
  steepTag: string;
  gentleTag: string;
  ruleTitle: string;
  ruleNote: string;
  equalTitle: string;
  equalNote: string;
  downTitle: string;
  downNote: string;
  slopeTitle: string;
  slopeNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  ascentRowTitle: string;
  distanceRowTitle: string;
  desc: (f: HikeFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: HikeFacts) => string;
  metaDesc: (f: HikeFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: HikeFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** 분을 시간과 분으로 — 한 시간이 안 되면 분만 말한다 */
const clocker = (hour: string, min: string, join = ' ') =>
  (minutes: number): string => {
    if (minutes < 60) return `${minutes}${min}`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m === 0 ? `${h}${hour}` : [`${h}${hour}`, `${m}${min}`].join(join);
  };

const ko = clocker('시간', '분');
const en = clocker(' h', ' min');
const ja = clocker('時間', '分', '');
const hi = clocker(' घंटे', ' मिनट');
const zh = clocker('小时', '分', '');
const tw = clocker('小時', '分', '');

type Spec = { [K in keyof HikeUI]: L<HikeUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('등산 시간', 'Hiking time', 'Tiempo de senderismo', 'Tempo de caminhada', '登山の所要時間', 'Wanderzeit', 'Temps de randonnée', 'ट्रेकिंग समय', '登山时间', '登山時間'),

  clock: T<(minutes: number) => string>(ko, en, en, en, ja, en, en, hi, zh, tw),

  gradeName: T<(key: string) => string>(
    pick({ easy: '가벼움', moderate: '보통', hard: '힘듦', severe: '고됨' }),
    pick({ easy: 'easy', moderate: 'moderate', hard: 'hard', severe: 'severe' }),
    pick({ easy: 'fácil', moderate: 'moderada', hard: 'exigente', severe: 'dura' }),
    pick({ easy: 'fácil', moderate: 'moderada', hard: 'exigente', severe: 'dura' }),
    pick({ easy: '軽い', moderate: '普通', hard: 'きつい', severe: '過酷' }),
    pick({ easy: 'leicht', moderate: 'mittel', hard: 'anspruchsvoll', severe: 'sehr hart' }),
    pick({ easy: 'facile', moderate: 'modérée', hard: 'exigeante', severe: 'très dure' }),
    pick({ easy: 'आसान', moderate: 'मध्यम', hard: 'कठिन', severe: 'बहुत कठिन' }),
    pick({ easy: '轻松', moderate: '一般', hard: '吃力', severe: '艰苦' }),
    pick({ easy: '輕鬆', moderate: '一般', hard: '吃力', severe: '艱苦' }),
  ),

  steepTag: T('가파른 쪽입니다', 'On the steep side', 'Del lado empinado', 'Do lado íngreme', '急な部類です', 'Eher steil', 'Plutôt raide', 'ढलान तीखी है', '偏陡', '偏陡'),
  gentleTag: T('완만한 쪽입니다', 'On the gentle side', 'Del lado suave', 'Do lado suave', '緩やかな部類です', 'Eher sanft', 'Plutôt doux', 'ढलान हल्की है', '偏缓', '偏緩'),

  hubTitle: T(
    '등산 150칸 — 10킬로미터에 500미터를 올리면 2시간 50분',
    '150 hiking times — 10 km with 500 m of climb takes 2 h 50 min',
    '150 tiempos de ruta — 10 km con 500 m de subida son 2 h 50 min',
    '150 tempos de trilha — 10 km com 500 m de subida dão 2 h 50 min',
    '登山150マス — 10キロで500メートル登れば2時間50分',
    '150 Wanderzeiten — 10 km mit 500 m Anstieg dauern 2 h 50 min',
    '150 temps de marche — 10 km avec 500 m de montée font 2 h 50',
    '150 ट्रेक समय — 10 किमी में 500 मीटर चढ़ाई यानी 2 घंटे 50 मिनट',
    '150 个登山时间 — 10 公里爬升 500 米需 2 小时 50 分',
    '150 個登山時間 — 10 公里爬升 500 公尺需 2 小時 50 分',
  ),

  hubLead: T(
    '거리 15가지와 누적 오름 10가지가 만나는 칸마다 오르는 시간과 내려오는 시간을 계산했습니다. 산에서 시간을 가르는 것은 거리가 아니라 오름입니다.',
    'A time up and a time down for every meeting of 15 distances and 10 climbs. On a mountain it is the ascent, not the distance, that sets the clock.',
    'Un tiempo de subida y otro de bajada para cada cruce de 15 distancias y 10 desniveles. En la montaña manda el desnivel, no la distancia.',
    'Um tempo de subida e outro de descida para cada cruzamento de 15 distâncias e 10 desníveis. Na montanha quem manda é a subida, não a distância.',
    '距離15通りと累積の登り10通りが出会う各マスの、登りと下りの時間を計算しました。山で時間を決めるのは距離ではなく登りです。',
    'Eine Zeit hinauf und eine hinab für jede Begegnung von 15 Distanzen und 10 Anstiegen. Am Berg bestimmt der Anstieg die Uhr, nicht die Strecke.',
    'Un temps de montée et un de descente pour chaque croisement de 15 distances et 10 dénivelés. En montagne, c’est le dénivelé qui fait l’horaire, pas la distance.',
    '15 दूरियों और 10 चढ़ाइयों के हर मेल के लिए ऊपर जाने और नीचे आने का समय। पहाड़ पर समय दूरी नहीं, चढ़ाई तय करती है।',
    '15 种距离与 10 种累计爬升交汇的每一格都算出上山和下山的时间。在山上决定时间的是爬升，不是距离。',
    '15 種距離與 10 種累計爬升交匯的每一格都算出上山和下山的時間。在山上決定時間的是爬升，不是距離。',
  ),

  distanceLabel: T('걷는 거리', 'Distance on foot', 'Distancia a pie', 'Distância a pé', '歩く距離', 'Gehstrecke', 'Distance à pied', 'पैदल दूरी', '步行距离', '步行距離'),
  ascentLabel: T('누적 오름', 'Total climb', 'Desnivel acumulado', 'Subida acumulada', '累積の登り', 'Summe des Anstiegs', 'Dénivelé cumulé', 'कुल चढ़ाई', '累计爬升', '累計爬升'),
  upLabel: T('올라가는 시간', 'Time up', 'Tiempo de subida', 'Tempo de subida', '登りの時間', 'Zeit hinauf', 'Temps de montée', 'चढ़ने का समय', '上山时间', '上山時間'),
  downLabel: T('내려오는 시간', 'Time down', 'Tiempo de bajada', 'Tempo de descida', '下りの時間', 'Zeit hinab', 'Temps de descente', 'उतरने का समय', '下山时间', '下山時間'),
  roundLabel: T('왕복', 'There and back', 'Ida y vuelta', 'Ida e volta', '往復', 'Hin und zurück', 'Aller-retour', 'आना-जाना', '往返', '往返'),
  slopeLabel: T('평균 경사', 'Average slope', 'Pendiente media', 'Inclinação média', '平均斜度', 'Mittlere Steigung', 'Pente moyenne', 'औसत ढलान', '平均坡度', '平均坡度'),
  equivalentLabel: T('평지로 치면', 'As flat distance', 'En distancia llana', 'Em distância plana', '平地に直すと', 'Als flache Strecke', 'En distance plate', 'समतल दूरी में', '折合平地', '折合平地'),
  speedLabel: T('올라가는 평균 속도', 'Average speed up', 'Velocidad media de subida', 'Velocidade média na subida', '登りの平均速度', 'Mittleres Tempo bergauf', 'Vitesse moyenne en montée', 'चढ़ाई की औसत गति', '上山平均速度', '上山平均速度'),
  gradeLabel: T('코스의 무게', 'How hard it is', 'Dureza de la ruta', 'Dureza da trilha', 'コースの重さ', 'Schwere der Tour', 'Difficulté du parcours', 'ट्रेक की कठिनाई', '路线难度', '路線難度'),

  ruleTitle: T('네이스미스의 규칙은 두 줄입니다', 'Naismith’s rule is two lines', 'La regla de Naismith son dos líneas', 'A regra de Naismith são duas linhas', 'ネイスミスの法則は2行です', 'Naismiths Regel hat zwei Zeilen', 'La règle de Naismith tient en deux lignes', 'नेस्मिथ का नियम दो पंक्तियों का है', '内史密斯法则只有两行', '內史密斯法則只有兩行'),

  ruleNote: T(
    '평지 5킬로미터에 한 시간, 오름 600미터에 한 시간을 더합니다. 1892년에 나온 어림이 아직 기준으로 남아 있는 것은 두 줄뿐인데도 잘 맞기 때문입니다. 10킬로미터에 500미터를 올리면 두 시간에 오십 분을 더해 2시간 50분입니다.',
    'An hour for every 5 km on the flat, plus an hour for every 600 m of climb. That is the whole rule, written in 1892 and still the standard because two lines get surprisingly close. Ten kilometres with 500 m of climb comes to two hours plus fifty minutes — 2 h 50.',
    'Una hora por cada 5 km en llano, más una hora por cada 600 m de subida. Esa es toda la regla, escrita en 1892 y aún vigente porque dos líneas aciertan sorprendentemente bien. Diez kilómetros con 500 m de desnivel son dos horas más cincuenta minutos: 2 h 50.',
    'Uma hora para cada 5 km no plano, mais uma hora para cada 600 m de subida. É a regra inteira, escrita em 1892 e ainda padrão porque duas linhas acertam surpreendentemente bem. Dez quilômetros com 500 m de subida dão duas horas mais cinquenta minutos: 2 h 50.',
    '平地5キロに1時間、登り600メートルに1時間を足します。1892年に出た目安が今も基準なのは、2行しかないのによく当たるからです。10キロで500メートル登れば2時間に50分を足して2時間50分です。',
    'Eine Stunde je 5 km in der Ebene, plus eine Stunde je 600 m Anstieg. Mehr ist die Regel nicht — 1892 aufgeschrieben und bis heute Standard, weil zwei Zeilen erstaunlich nah kommen. Zehn Kilometer mit 500 m Anstieg ergeben zwei Stunden plus fünfzig Minuten: 2 h 50.',
    'Une heure pour 5 km à plat, plus une heure pour 600 m de montée. C’est toute la règle, écrite en 1892 et toujours la référence parce que deux lignes tombent étonnamment juste. Dix kilomètres avec 500 m de dénivelé font deux heures plus cinquante minutes : 2 h 50.',
    'समतल पर हर 5 किमी के लिए एक घंटा, और हर 600 मीटर चढ़ाई के लिए एक घंटा और। पूरा नियम इतना ही है — 1892 में लिखा गया और आज भी मानक, क्योंकि दो पंक्तियाँ हैरान करने वाली सटीकता देती हैं। 10 किमी में 500 मीटर चढ़ाई यानी दो घंटे और पचास मिनट: 2 घंटे 50 मिनट।',
    '平地每 5 公里一小时，再加每爬升 600 米一小时。整条法则就这么两行，1892 年写下至今仍是基准，因为两行就已经相当准。10 公里爬升 500 米，就是两小时加五十分钟，共 2 小时 50 分。',
    '平地每 5 公里一小時，再加每爬升 600 公尺一小時。整條法則就這麼兩行，1892 年寫下至今仍是基準，因為兩行就已經相當準。10 公里爬升 500 公尺，就是兩小時加五十分鐘，共 2 小時 50 分。',
  ),

  equalTitle: T('오름 1미터는 평지 8.33미터입니다', 'One metre up equals 8.33 flat', 'Un metro de subida son 8,33 en llano', 'Um metro de subida vale 8,33 no plano', '登り1メートルは平地8.33メートル', 'Ein Höhenmeter sind 8,33 flache Meter', 'Un mètre de montée vaut 8,33 mètres à plat', 'एक मीटर चढ़ाई = 8.33 मीटर समतल', '爬升 1 米相当于平地 8.33 米', '爬升 1 公尺相當於平地 8.33 公尺'),

  equalNote: T(
    '규칙 두 줄에서 따라 나오는 값입니다. 600미터를 오르는 시간이 5킬로미터를 걷는 시간과 같으니, 오름 1미터는 평지 8.33미터인 셈입니다. 오름을 이 비율로 평지에 더하면 코스 하나가 숫자 하나가 되어, 길이가 다른 산행끼리도 견줄 수 있습니다.',
    'This falls out of the two lines. Climbing 600 m takes as long as walking 5 km, so one metre of ascent is worth 8.33 metres on the flat. Add the climb back in at that rate and any route becomes a single number — which is how routes of different lengths can be compared at all.',
    'Sale de las dos líneas. Subir 600 m cuesta lo mismo que andar 5 km, así que un metro de desnivel vale 8,33 metros en llano. Al sumar la subida a ese ritmo, cualquier ruta se reduce a un número, y así se pueden comparar rutas de longitudes distintas.',
    'Isso decorre das duas linhas. Subir 600 m leva o mesmo que andar 5 km, então um metro de subida vale 8,33 metros no plano. Somando a subida nessa taxa, qualquer trilha vira um número só — é assim que trilhas de comprimentos diferentes podem ser comparadas.',
    '規則2行から出てくる値です。600メートル登る時間が5キロ歩く時間と同じなので、登り1メートルは平地8.33メートルに当たります。登りをこの比で平地に足すとコースが数字ひとつになり、長さの違う山行どうしも比べられます。',
    'Das folgt aus den zwei Zeilen. 600 Höhenmeter kosten so viel Zeit wie 5 km eben, also entspricht ein Höhenmeter 8,33 flachen Metern. Rechnet man den Anstieg so hinzu, wird jede Tour zu einer einzigen Zahl — nur so lassen sich unterschiedlich lange Touren vergleichen.',
    'Cela découle des deux lignes. Monter 600 m prend autant de temps que marcher 5 km : un mètre de dénivelé vaut donc 8,33 mètres à plat. En réintégrant la montée à ce taux, un parcours devient un seul nombre — c’est ainsi qu’on compare des sorties de longueurs différentes.',
    'यह उन्हीं दो पंक्तियों से निकलता है। 600 मीटर चढ़ने में उतना ही समय लगता है जितना 5 किमी चलने में, इसलिए एक मीटर चढ़ाई = 8.33 मीटर समतल। इस दर से चढ़ाई जोड़ दें तो कोई भी रास्ता एक संख्या बन जाता है — तभी अलग-अलग लंबाई के ट्रेक की तुलना हो पाती है।',
    '这是从那两行里推出来的。爬 600 米所花的时间与走 5 公里相同，所以爬升 1 米相当于平地 8.33 米。把爬升按这个比例折进平地，一条路线就变成一个数字，长度不同的行程也能互相比较。',
    '這是從那兩行裡推出來的。爬 600 公尺所花的時間與走 5 公里相同，所以爬升 1 公尺相當於平地 8.33 公尺。把爬升按這個比例折進平地，一條路線就變成一個數字，長度不同的行程也能互相比較。',
  ),

  downTitle: T('내려오는 길은 12도에서 갈립니다', 'Coming down turns at 12 degrees', 'La bajada cambia a los 12 grados', 'A descida muda aos 12 graus', '下りは12度で変わります', 'Beim Abstieg kippt es bei 12 Grad', 'La descente bascule à 12 degrés', 'उतराई 12 डिग्री पर पलटती है', '下山在 12 度处分界', '下山在 12 度處分界'),

  downNote: T(
    '완만한 내리막은 걸음이 빨라져 300미터마다 10분을 뺍니다. 그런데 가파른 내리막에서는 오히려 조심하느라 300미터마다 10분이 더 붙습니다. 가르는 자리가 평균 경사 12도입니다 — 랭뮤어가 네이스미스에 덧댄 보정입니다.',
    'A gentle descent speeds you up: take off ten minutes for every 300 m down. A steep one does the opposite — you brake, you place your feet, and it adds those same ten minutes per 300 m. The line between them is an average slope of 12 degrees. That correction is Langmuir’s, laid on top of Naismith.',
    'Una bajada suave acelera: resta diez minutos por cada 300 m. Una empinada hace lo contrario —frenas, colocas los pies— y suma esos mismos diez minutos por cada 300 m. La línea entre ambas es una pendiente media de 12 grados: la corrección de Langmuir sobre Naismith.',
    'Uma descida suave acelera: tire dez minutos a cada 300 m. Uma íngreme faz o oposto — você freia, escolhe onde pisar — e soma esses mesmos dez minutos a cada 300 m. A linha entre as duas é uma inclinação média de 12 graus: a correção de Langmuir sobre Naismith.',
    '緩やかな下りは足が速くなるので300メートルごとに10分引きます。ところが急な下りでは慎重になる分、300メートルごとに10分が逆に加わります。分かれ目が平均斜度12度です — ネイスミスにラングミュアが足した補正です。',
    'Ein sanfter Abstieg beschleunigt: zehn Minuten weniger je 300 Höhenmeter. Ein steiler kehrt das um — man bremst, setzt die Füße — und legt dieselben zehn Minuten je 300 m drauf. Die Grenze liegt bei 12 Grad mittlerer Neigung. Diese Korrektur stammt von Langmuir, aufgesetzt auf Naismith.',
    'Une descente douce accélère : retirez dix minutes par 300 m. Une descente raide fait l’inverse — on freine, on pose les pieds — et ajoute ces mêmes dix minutes par 300 m. La frontière est une pente moyenne de 12 degrés : c’est la correction de Langmuir posée sur Naismith.',
    'हल्की उतराई चाल तेज़ करती है: हर 300 मीटर पर दस मिनट घटाएँ। तीखी उतराई उलटा करती है — आप रुक-रुककर पैर रखते हैं — और वही दस मिनट हर 300 मीटर पर जोड़ देती है। दोनों के बीच की रेखा है 12 डिग्री औसत ढलान। यह सुधार लैंगम्यूर का है, नेस्मिथ के ऊपर।',
    '缓的下坡走得快，每下降 300 米减十分钟。陡的下坡正相反——要刹住、要找落脚点——同样每 300 米反而加十分钟。分界线是平均坡度 12 度。这条修正来自朗缪尔，叠在内史密斯之上。',
    '緩的下坡走得快，每下降 300 公尺減十分鐘。陡的下坡正相反——要煞住、要找落腳點——同樣每 300 公尺反而加十分鐘。分界線是平均坡度 12 度。這條修正來自朗繆爾，疊在內史密斯之上。',
  ),

  slopeTitle: T('평균 경사는 코스를 말해 줍니다', 'The average slope tells you the shape', 'La pendiente media describe la ruta', 'A inclinação média descreve a trilha', '平均斜度がコースを語ります', 'Die mittlere Steigung verrät die Tour', 'La pente moyenne décrit le parcours', 'औसत ढलान रास्ता बताती है', '平均坡度说明路线', '平均坡度說明路線'),

  slopeNote: T(
    '오름을 거리로 나눈 각입니다. 1킬로미터에 1,000미터를 올리면 45도이고, 실제 등산로는 대개 5도에서 25도 사이입니다. 다만 이것은 평균이라, 평평한 접근로와 가파른 깔딱고개가 섞인 코스도 같은 숫자로 나옵니다.',
    'It is the angle you get by dividing the climb by the distance. A kilometre gaining 1,000 m is 45 degrees; real trails mostly sit between 5 and 25. Remember it is an average — a flat approach followed by a brutal final pitch shows up as the same number as a steady grind.',
    'Es el ángulo de dividir el desnivel entre la distancia. Un kilómetro que gana 1.000 m son 45 grados; los senderos reales suelen estar entre 5 y 25. Recuerda que es un promedio: una aproximación llana seguida de una rampa brutal da el mismo número que una subida constante.',
    'É o ângulo de dividir a subida pela distância. Um quilômetro ganhando 1.000 m são 45 graus; trilhas reais ficam quase sempre entre 5 e 25. Lembre que é média: uma aproximação plana seguida de uma rampa brutal dá o mesmo número que uma subida constante.',
    '登りを距離で割った角です。1キロで1,000メートル登れば45度で、実際の登山道はたいてい5度から25度の間です。ただしこれは平均なので、平らなアプローチと急な急登が混ざったコースも同じ数字になります。',
    'Es ist der Winkel aus Anstieg geteilt durch Strecke. Ein Kilometer mit 1.000 Höhenmetern sind 45 Grad; echte Wege liegen meist zwischen 5 und 25. Es ist aber ein Mittelwert — flacher Zustieg plus brutaler Schlussanstieg ergibt dieselbe Zahl wie ein gleichmäßiger Anstieg.',
    'C’est l’angle obtenu en divisant le dénivelé par la distance. Un kilomètre gagnant 1 000 m fait 45 degrés ; les sentiers réels tiennent entre 5 et 25. C’est une moyenne : une approche plate suivie d’une rampe brutale donne le même chiffre qu’une montée régulière.',
    'यह चढ़ाई को दूरी से भाग देने पर मिला कोण है। एक किलोमीटर में 1,000 मीटर चढ़ें तो 45 डिग्री; असली रास्ते ज़्यादातर 5 से 25 के बीच रहते हैं। पर यह औसत है — समतल पहुँच और उसके बाद की तीखी चढ़ाई भी वही संख्या दिखाती है।',
    '这是用爬升除以距离得到的角度。一公里爬升 1000 米就是 45 度，实际登山道多在 5 到 25 度之间。但这是平均值——平缓的接近段加上一段陡坡，和全程均匀爬升会给出同一个数字。',
    '這是用爬升除以距離得到的角度。一公里爬升 1000 公尺就是 45 度，實際登山道多在 5 到 25 度之間。但這是平均值——平緩的接近段加上一段陡坡，和全程均勻爬升會給出同一個數字。',
  ),

  careTitle: T('이 값은 출발점입니다', 'These figures are a starting point', 'Estas cifras son un punto de partida', 'Estes números são um ponto de partida', 'この値は出発点です', 'Diese Werte sind ein Ausgangspunkt', 'Ces valeurs sont un point de départ', 'ये मान शुरुआती बिंदु हैं', '这些值只是起点', '這些值只是起點'),

  careNote: T(
    '쉬는 시간과 밥 먹는 시간은 들어 있지 않습니다. 짐이 무겁거나 눈이 쌓였거나 바위를 넘어야 하면 더 걸리고, 일행이 여럿이면 가장 느린 사람의 걸음이 됩니다. 해 지는 시각에서 거꾸로 세어 넉넉히 잡으십시오.',
    'Breaks and meals are not in here. A heavy pack, snow, or scrambling all add time, and a group moves at the pace of its slowest member. Count backwards from sunset and leave room.',
    'Aquí no hay descansos ni comidas. Una mochila pesada, la nieve o los pasos de trepada suman tiempo, y un grupo va al ritmo del más lento. Cuenta hacia atrás desde el ocaso y deja margen.',
    'Pausas e refeições não estão aqui. Mochila pesada, neve ou trechos de escalada somam tempo, e um grupo anda no ritmo do mais lento. Conte de trás para frente a partir do pôr do sol e deixe folga.',
    '休憩と食事の時間は入っていません。荷が重い、雪がある、岩を越えるといった条件では余計にかかり、複数で行けば一番遅い人の歩みになります。日没から逆算して余裕を持ってください。',
    'Pausen und Essen stecken nicht darin. Schwerer Rucksack, Schnee oder Kletterstellen kosten extra, und eine Gruppe geht im Tempo des Langsamsten. Rechnen Sie vom Sonnenuntergang rückwärts und lassen Sie Luft.',
    'Les pauses et les repas n’y sont pas. Sac lourd, neige ou passages d’escalade rallongent, et un groupe avance au rythme du plus lent. Comptez à rebours depuis le coucher du soleil et gardez de la marge.',
    'विश्राम और भोजन का समय इसमें नहीं है। भारी बैग, बर्फ़ या चट्टान चढ़ाई समय बढ़ाते हैं, और समूह सबसे धीमे सदस्य की चाल से चलता है। सूर्यास्त से उल्टा गिनकर गुंजाइश रखें।',
    '这里没有算休息和吃饭。背包重、有积雪、要手脚并用都会更慢，结伴同行则按最慢的人走。请从日落时刻倒推，留出余量。',
    '這裡沒有算休息和吃飯。背包重、有積雪、要手腳並用都會更慢，結伴同行則按最慢的人走。請從日落時刻倒推，留出餘量。',
  ),

  tableTitle: T('거리와 오름으로 찾기', 'Find it by distance and climb', 'Búscalo por distancia y desnivel', 'Ache por distância e subida', '距離と登りから探す', 'Nach Strecke und Anstieg suchen', 'Chercher par distance et dénivelé', 'दूरी और चढ़ाई से देखें', '按距离和爬升查找', '按距離和爬升查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  ascentRowTitle: T('같은 거리, 다른 오름', 'Same distance, other climbs', 'Misma distancia, otros desniveles', 'Mesma distância, outras subidas', '同じ距離、別の登り', 'Gleiche Strecke, andere Anstiege', 'Même distance, autres dénivelés', 'वही दूरी, दूसरी चढ़ाई', '同一距离，不同爬升', '同一距離，不同爬升'),
  distanceRowTitle: T('같은 오름, 다른 거리', 'Same climb, other distances', 'Mismo desnivel, otras distancias', 'Mesma subida, outras distâncias', '同じ登り、別の距離', 'Gleicher Anstieg, andere Strecken', 'Même dénivelé, autres distances', 'वही चढ़ाई, दूसरी दूरियाँ', '同一爬升，不同距离', '同一爬升，不同距離'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '오르는 시간은 평지 5킬로미터에 한 시간, 오름 600미터에 한 시간입니다.',
      '내려오는 시간은 같은 길을 되짚는다고 보고, 경사에 따라 300미터마다 10분을 빼거나 더합니다.',
      '쉬는 시간은 들어 있지 않습니다. 한 시간에 5분씩만 더해도 하루에 삼십 분이 넘습니다.',
      '누적 오름은 오르내림을 모두 더한 상승분입니다. 지도 앱이 알려 줍니다.',
    ],
    [
      'Going up: an hour per 5 km on the flat, plus an hour per 600 m of climb.',
      'Coming down assumes the same path back, adding or subtracting ten minutes per 300 m depending on the slope.',
      'Breaks are not included. Even five minutes an hour adds up to more than half an hour over a day.',
      'Total climb means every metre gained, including the ups after the downs. A map app will tell you.',
    ],
    [
      'Subida: una hora por cada 5 km en llano, más una hora por cada 600 m de desnivel.',
      'La bajada supone el mismo camino de vuelta, restando o sumando diez minutos por cada 300 m según la pendiente.',
      'No incluye descansos. Aunque sean cinco minutos por hora, en una jornada pasan de media hora.',
      'El desnivel acumulado suma todos los metros ganados, también los de después de bajar. Una app de mapas lo da.',
    ],
    [
      'Subida: uma hora por 5 km no plano, mais uma hora por 600 m de subida.',
      'A descida supõe o mesmo caminho de volta, tirando ou somando dez minutos a cada 300 m conforme a inclinação.',
      'Não inclui pausas. Mesmo cinco minutos por hora passam de meia hora num dia.',
      'A subida acumulada soma todos os metros ganhos, inclusive depois das descidas. Um app de mapas informa.',
    ],
    [
      '登りは平地5キロに1時間、登り600メートルに1時間です。',
      '下りは同じ道を戻るものとして、斜度に応じて300メートルごとに10分を引くか足します。',
      '休憩は入っていません。1時間に5分ずつでも1日で30分を超えます。',
      '累積の登りは下ったあとの登り返しも含めた上昇分です。地図アプリが教えてくれます。',
    ],
    [
      'Hinauf: eine Stunde je 5 km eben, plus eine Stunde je 600 Höhenmeter.',
      'Hinab wird derselbe Weg angenommen, je nach Neigung zehn Minuten je 300 m weniger oder mehr.',
      'Pausen fehlen. Schon fünf Minuten pro Stunde ergeben über den Tag mehr als eine halbe Stunde.',
      'Der Gesamtanstieg zählt jeden gewonnenen Höhenmeter, auch nach Zwischenabstiegen. Eine Karten-App zeigt ihn.',
    ],
    [
      'À la montée : une heure par 5 km à plat, plus une heure par 600 m de dénivelé.',
      'La descente suppose le même chemin, en retirant ou ajoutant dix minutes par 300 m selon la pente.',
      'Les pauses ne sont pas comptées. Même cinq minutes par heure font plus d’une demi-heure sur la journée.',
      'Le dénivelé cumulé additionne tous les mètres gagnés, y compris après une descente. Une appli de cartes le donne.',
    ],
    [
      'चढ़ाई: समतल पर हर 5 किमी के लिए एक घंटा, और हर 600 मीटर चढ़ाई के लिए एक घंटा।',
      'उतराई उसी रास्ते से लौटना मानती है, ढलान के अनुसार हर 300 मीटर पर दस मिनट घटाकर या जोड़कर।',
      'विश्राम शामिल नहीं है। घंटे में पाँच मिनट भी दिन भर में आधे घंटे से ऊपर हो जाते हैं।',
      'कुल चढ़ाई में हर चढ़ा हुआ मीटर गिना जाता है, उतरने के बाद की चढ़ाई भी। नक्शा ऐप बता देता है।',
    ],
    [
      '上山：平地每 5 公里一小时，加每爬升 600 米一小时。',
      '下山按原路返回计算，依坡度每 300 米减或加十分钟。',
      '没有算休息。哪怕每小时只歇五分钟，一天也超过半小时。',
      '累计爬升是所有上升的总和，包括下坡之后再爬的部分。地图应用会给出。',
    ],
    [
      '上山：平地每 5 公里一小時，加每爬升 600 公尺一小時。',
      '下山按原路返回計算，依坡度每 300 公尺減或加十分鐘。',
      '沒有算休息。哪怕每小時只歇五分鐘，一天也超過半小時。',
      '累計爬升是所有上升的總和，包括下坡之後再爬的部分。地圖應用會給出。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '등산 시간 계산 — 거리와 누적 오름으로',
    'Hiking time calculator — from distance and total climb',
    'Calculadora de tiempo de ruta — por distancia y desnivel',
    'Calculadora de tempo de trilha — por distância e subida',
    '登山の所要時間計算 — 距離と累積の登りから',
    'Wanderzeit berechnen — aus Strecke und Anstieg',
    'Calcul du temps de randonnée — distance et dénivelé',
    'ट्रेकिंग समय कैलकुलेटर — दूरी और कुल चढ़ाई से',
    '登山时间计算 — 按距离和累计爬升',
    '登山時間計算 — 按距離和累計爬升',
  ),

  hubMetaDesc: T(
    '10킬로미터에 500미터를 올리면 2시간 50분입니다. 거리 15가지와 오름 10가지가 만나는 150칸마다 오름·하산·왕복 시간과 평균 경사, 평지로 친 거리를 계산했습니다.',
    'Ten kilometres with 500 m of climb takes 2 h 50. For all 150 pairings of 15 distances and 10 climbs: time up, time down, there and back, the average slope, and the route as a flat distance.',
    'Diez kilómetros con 500 m de subida son 2 h 50. Para los 150 cruces de 15 distancias y 10 desniveles: subida, bajada, ida y vuelta, pendiente media y la ruta en distancia llana.',
    'Dez quilômetros com 500 m de subida dão 2 h 50. Para os 150 cruzamentos de 15 distâncias e 10 subidas: subida, descida, ida e volta, inclinação média e a trilha em distância plana.',
    '10キロで500メートル登れば2時間50分です。距離15通りと登り10通りが出会う150マスの登り・下り・往復の時間、平均斜度、平地換算の距離を計算しました。',
    'Zehn Kilometer mit 500 m Anstieg dauern 2 h 50. Für alle 150 Kombinationen aus 15 Strecken und 10 Anstiegen: Zeit hinauf, hinab, hin und zurück, mittlere Steigung und die Tour als flache Strecke.',
    'Dix kilomètres avec 500 m de dénivelé font 2 h 50. Pour les 150 croisements de 15 distances et 10 dénivelés : montée, descente, aller-retour, pente moyenne et le parcours en distance plate.',
    '10 किमी में 500 मीटर चढ़ाई यानी 2 घंटे 50 मिनट। 15 दूरियों और 10 चढ़ाइयों के सभी 150 मेलों का चढ़ने, उतरने और आने-जाने का समय, औसत ढलान और समतल दूरी।',
    '10 公里爬升 500 米需 2 小时 50 分。15 种距离与 10 种爬升交汇的 150 格，每格的上山、下山、往返时间、平均坡度和折合平地的距离。',
    '10 公里爬升 500 公尺需 2 小時 50 分。15 種距離與 10 種爬升交匯的 150 格，每格的上山、下山、往返時間、平均坡度和折合平地的距離。',
  ),

  desc: T<(f: HikeFacts) => string>(
    f => `평지 ${f.cell.km}킬로미터에 오름 ${f.cell.up}미터를 더하면 ${ko(f.upMinutes)}입니다. 평균 경사는 ${f.slope}도이고, 평지로 치면 ${f.equivalent}킬로미터를 걷는 셈입니다.`,
    f => `${f.cell.km} km on the flat plus ${f.cell.up} m of climb comes to ${en(f.upMinutes)}. The average slope is ${f.slope}°, and it costs what walking ${f.equivalent} km on the flat would.`,
    f => `${f.cell.km} km en llano más ${f.cell.up} m de subida dan ${en(f.upMinutes)}. La pendiente media es de ${f.slope}° y cuesta lo mismo que andar ${f.equivalent} km en llano.`,
    f => `${f.cell.km} km no plano mais ${f.cell.up} m de subida dão ${en(f.upMinutes)}. A inclinação média é de ${f.slope}° e custa o mesmo que andar ${f.equivalent} km no plano.`,
    f => `平地${f.cell.km}キロに登り${f.cell.up}メートルを足すと${ja(f.upMinutes)}です。平均斜度は${f.slope}度で、平地に直せば${f.equivalent}キロ歩くのと同じです。`,
    f => `${f.cell.km} km eben plus ${f.cell.up} m Anstieg ergeben ${en(f.upMinutes)}. Die mittlere Steigung liegt bei ${f.slope}°, der Aufwand entspricht ${f.equivalent} km in der Ebene.`,
    f => `${f.cell.km} km à plat plus ${f.cell.up} m de montée font ${en(f.upMinutes)}. La pente moyenne est de ${f.slope}°, soit l’équivalent de ${f.equivalent} km à plat.`,
    f => `समतल ${f.cell.km} किमी और ${f.cell.up} मीटर चढ़ाई मिलकर ${hi(f.upMinutes)} बनते हैं। औसत ढलान ${f.slope}° है, और यह समतल पर ${f.equivalent} किमी चलने जितना है।`,
    f => `平地 ${f.cell.km} 公里加爬升 ${f.cell.up} 米，共 ${zh(f.upMinutes)}。平均坡度 ${f.slope}°，折合平地约 ${f.equivalent} 公里。`,
    f => `平地 ${f.cell.km} 公里加爬升 ${f.cell.up} 公尺，共 ${tw(f.upMinutes)}。平均坡度 ${f.slope}°，折合平地約 ${f.equivalent} 公里。`,
  ),

  metaTitle: T<(f: HikeFacts) => string>(
    f => `${f.cell.km}km·오름 ${f.cell.up}m — ${ko(f.upMinutes)}`,
    f => `${f.cell.km} km, ${f.cell.up} m up — ${en(f.upMinutes)}`,
    f => `${f.cell.km} km, ${f.cell.up} m de subida — ${en(f.upMinutes)}`,
    f => `${f.cell.km} km, ${f.cell.up} m de subida — ${en(f.upMinutes)}`,
    f => `${f.cell.km}km・登り${f.cell.up}m — ${ja(f.upMinutes)}`,
    f => `${f.cell.km} km, ${f.cell.up} m Anstieg — ${en(f.upMinutes)}`,
    f => `${f.cell.km} km, ${f.cell.up} m de dénivelé — ${en(f.upMinutes)}`,
    f => `${f.cell.km} किमी, ${f.cell.up} मीटर चढ़ाई — ${hi(f.upMinutes)}`,
    f => `${f.cell.km}公里·爬升 ${f.cell.up}米 — ${zh(f.upMinutes)}`,
    f => `${f.cell.km}公里·爬升 ${f.cell.up}公尺 — ${tw(f.upMinutes)}`,
  ),

  metaDesc: T<(f: HikeFacts) => string>(
    f => `${f.cell.km}킬로미터에 ${f.cell.up}미터를 올리는 코스는 올라가는 데 ${ko(f.upMinutes)}, 내려오는 데 ${ko(f.downMinutes)}, 왕복 ${ko(f.roundMinutes)}입니다. 평균 경사 ${f.slope}도, 평지로 치면 ${f.equivalent}킬로미터입니다.`,
    f => `A route of ${f.cell.km} km with ${f.cell.up} m of climb takes ${en(f.upMinutes)} up, ${en(f.downMinutes)} down, ${en(f.roundMinutes)} there and back. Average slope ${f.slope}°, equal to ${f.equivalent} km on the flat.`,
    f => `Una ruta de ${f.cell.km} km con ${f.cell.up} m de subida son ${en(f.upMinutes)} de ida, ${en(f.downMinutes)} de vuelta y ${en(f.roundMinutes)} en total. Pendiente media ${f.slope}°, equivalente a ${f.equivalent} km llanos.`,
    f => `Uma trilha de ${f.cell.km} km com ${f.cell.up} m de subida leva ${en(f.upMinutes)} na subida, ${en(f.downMinutes)} na descida e ${en(f.roundMinutes)} ida e volta. Inclinação média ${f.slope}°, equivalente a ${f.equivalent} km planos.`,
    f => `${f.cell.km}キロで${f.cell.up}メートル登るコースは、登り${ja(f.upMinutes)}、下り${ja(f.downMinutes)}、往復${ja(f.roundMinutes)}です。平均斜度${f.slope}度、平地換算で${f.equivalent}キロです。`,
    f => `Eine Tour über ${f.cell.km} km mit ${f.cell.up} m Anstieg braucht ${en(f.upMinutes)} hinauf, ${en(f.downMinutes)} hinab, ${en(f.roundMinutes)} hin und zurück. Mittlere Steigung ${f.slope}°, entspricht ${f.equivalent} km eben.`,
    f => `Un parcours de ${f.cell.km} km avec ${f.cell.up} m de dénivelé demande ${en(f.upMinutes)} à la montée, ${en(f.downMinutes)} à la descente, ${en(f.roundMinutes)} aller-retour. Pente moyenne ${f.slope}°, soit ${f.equivalent} km à plat.`,
    f => `${f.cell.km} किमी और ${f.cell.up} मीटर चढ़ाई वाले रास्ते में चढ़ने में ${hi(f.upMinutes)}, उतरने में ${hi(f.downMinutes)}, आने-जाने में ${hi(f.roundMinutes)} लगते हैं। औसत ढलान ${f.slope}°, समतल में ${f.equivalent} किमी।`,
    f => `${f.cell.km} 公里、爬升 ${f.cell.up} 米的路线，上山 ${zh(f.upMinutes)}，下山 ${zh(f.downMinutes)}，往返 ${zh(f.roundMinutes)}。平均坡度 ${f.slope}°，折合平地 ${f.equivalent} 公里。`,
    f => `${f.cell.km} 公里、爬升 ${f.cell.up} 公尺的路線，上山 ${tw(f.upMinutes)}，下山 ${tw(f.downMinutes)}，往返 ${tw(f.roundMinutes)}。平均坡度 ${f.slope}°，折合平地 ${f.equivalent} 公里。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '10킬로미터에 500미터를 올리면 얼마나 걸리나요?', a: '올라가는 데 2시간 50분입니다. 평지 두 시간에 오름 오십 분을 더한 값입니다.' },
      { q: '네이스미스의 규칙이 무엇인가요?', a: '평지 5킬로미터에 한 시간, 오름 600미터에 한 시간을 더하는 어림입니다. 1892년에 나왔고 아직 기준으로 쓰입니다.' },
      { q: '내려올 때는 왜 더 걸리기도 하나요?', a: '가파른 내리막에서는 조심하느라 느려지기 때문입니다. 평균 경사 12도를 넘으면 300미터마다 10분이 오히려 더 붙습니다.' },
      { q: '오름 100미터는 평지로 얼마인가요?', a: '833미터입니다. 오름 600미터가 평지 5킬로미터와 같은 시간이라는 데서 나오는 비율입니다.' },
      { q: '쉬는 시간은 어떻게 잡나요?', a: '이 표에는 없습니다. 한 시간에 5분씩만 잡아도 여섯 시간 산행이면 삼십 분이 더 붙습니다.' },
    ],
    [
      { q: 'How long is 10 km with 500 m of climb?', a: 'Two hours fifty going up — two hours for the distance plus fifty minutes for the climb.' },
      { q: 'What is Naismith’s rule?', a: 'An hour per 5 km on the flat plus an hour per 600 m of ascent. Written in 1892 and still the working standard.' },
      { q: 'Why can coming down take longer?', a: 'Because a steep descent slows you down. Past an average slope of 12 degrees you add ten minutes per 300 m instead of subtracting them.' },
      { q: 'What is 100 m of climb worth on the flat?', a: '833 metres. It follows from 600 m of ascent costing the same hour as 5 km of walking.' },
      { q: 'How should I allow for breaks?', a: 'They are not in the table. Even five minutes an hour adds half an hour to a six-hour day.' },
    ],
    [
      { q: '¿Cuánto se tarda en 10 km con 500 m de subida?', a: 'Dos horas y cincuenta de subida: dos horas por la distancia más cincuenta minutos por el desnivel.' },
      { q: '¿Qué es la regla de Naismith?', a: 'Una hora por cada 5 km en llano más una hora por cada 600 m de subida. Es de 1892 y sigue usándose.' },
      { q: '¿Por qué a veces se tarda más al bajar?', a: 'Porque una bajada empinada frena. Pasada una pendiente media de 12 grados se suman diez minutos por 300 m en vez de restarlos.' },
      { q: '¿Cuánto valen 100 m de subida en llano?', a: '833 metros. Sale de que 600 m de subida cuestan la misma hora que 5 km de camino.' },
      { q: '¿Cómo cuento los descansos?', a: 'No están en la tabla. Cinco minutos por hora ya suman media hora en una jornada de seis.' },
    ],
    [
      { q: 'Quanto leva 10 km com 500 m de subida?', a: 'Duas horas e cinquenta na subida: duas horas pela distância mais cinquenta minutos pela subida.' },
      { q: 'O que é a regra de Naismith?', a: 'Uma hora por 5 km no plano mais uma hora por 600 m de subida. É de 1892 e continua sendo o padrão.' },
      { q: 'Por que às vezes a descida demora mais?', a: 'Porque uma descida íngreme freia o passo. Acima de 12 graus de inclinação média somam-se dez minutos por 300 m em vez de subtrair.' },
      { q: 'Quanto valem 100 m de subida no plano?', a: '833 metros. Decorre de 600 m de subida custarem a mesma hora que 5 km de caminhada.' },
      { q: 'Como contar as pausas?', a: 'Não estão na tabela. Cinco minutos por hora já somam meia hora num dia de seis.' },
    ],
    [
      { q: '10キロで500メートル登るとどれくらいですか？', a: '登りに2時間50分です。平地の2時間に登りの50分を足した値です。' },
      { q: 'ネイスミスの法則とは何ですか？', a: '平地5キロに1時間、登り600メートルに1時間を足す目安です。1892年に出て今も基準です。' },
      { q: '下りのほうが長くかかることがあるのはなぜですか？', a: '急な下りでは慎重になって遅くなるからです。平均斜度12度を超えると300メートルごとに10分が引かれず逆に足されます。' },
      { q: '登り100メートルは平地で何メートルですか？', a: '833メートルです。登り600メートルが平地5キロと同じ1時間だという点から出る比です。' },
      { q: '休憩はどう見ればよいですか？', a: 'この表には入っていません。1時間に5分でも6時間の山行なら30分増えます。' },
    ],
    [
      { q: 'Wie lange dauern 10 km mit 500 m Anstieg?', a: 'Zwei Stunden fünfzig hinauf — zwei Stunden für die Strecke plus fünfzig Minuten für den Anstieg.' },
      { q: 'Was ist Naismiths Regel?', a: 'Eine Stunde je 5 km eben plus eine Stunde je 600 Höhenmeter. 1892 formuliert und bis heute Standard.' },
      { q: 'Warum dauert der Abstieg manchmal länger?', a: 'Weil ein steiler Abstieg bremst. Über 12 Grad mittlerer Neigung kommen zehn Minuten je 300 m dazu, statt abzugehen.' },
      { q: 'Wie viel sind 100 Höhenmeter in der Ebene?', a: '833 Meter. Das folgt daraus, dass 600 Höhenmeter dieselbe Stunde kosten wie 5 km Gehen.' },
      { q: 'Wie plane ich Pausen ein?', a: 'Sie stehen nicht in der Tabelle. Schon fünf Minuten pro Stunde ergeben an einem Sechs-Stunden-Tag eine halbe Stunde.' },
    ],
    [
      { q: 'Combien de temps pour 10 km avec 500 m de dénivelé ?', a: 'Deux heures cinquante à la montée : deux heures pour la distance plus cinquante minutes pour le dénivelé.' },
      { q: 'Qu’est-ce que la règle de Naismith ?', a: 'Une heure par 5 km à plat plus une heure par 600 m de montée. Formulée en 1892, toujours la référence.' },
      { q: 'Pourquoi la descente peut-elle être plus longue ?', a: 'Parce qu’une descente raide freine. Au-delà de 12 degrés de pente moyenne, on ajoute dix minutes par 300 m au lieu de les retirer.' },
      { q: 'Que valent 100 m de montée à plat ?', a: '833 mètres. Cela découle du fait que 600 m de montée coûtent la même heure que 5 km de marche.' },
      { q: 'Comment prévoir les pauses ?', a: 'Elles ne sont pas dans le tableau. Cinq minutes par heure font déjà une demi-heure sur une journée de six.' },
    ],
    [
      { q: '10 किमी में 500 मीटर चढ़ाई में कितना समय?', a: 'चढ़ने में 2 घंटे 50 मिनट — दूरी के दो घंटे और चढ़ाई के पचास मिनट।' },
      { q: 'नेस्मिथ का नियम क्या है?', a: 'समतल पर हर 5 किमी के लिए एक घंटा और हर 600 मीटर चढ़ाई के लिए एक घंटा। 1892 का नियम, आज भी मानक।' },
      { q: 'उतरने में कभी ज़्यादा समय क्यों लगता है?', a: 'क्योंकि तीखी उतराई पर चाल धीमी पड़ती है। 12 डिग्री औसत ढलान से ऊपर हर 300 मीटर पर दस मिनट घटने के बजाय जुड़ते हैं।' },
      { q: '100 मीटर चढ़ाई समतल में कितनी है?', a: '833 मीटर। यह इसी से निकलता है कि 600 मीटर चढ़ाई और 5 किमी चलना एक ही घंटा लेते हैं।' },
      { q: 'विश्राम का समय कैसे जोड़ें?', a: 'तालिका में नहीं है। घंटे में पाँच मिनट भी छह घंटे के ट्रेक में आधा घंटा जोड़ देते हैं।' },
    ],
    [
      { q: '10 公里爬升 500 米要多久？', a: '上山 2 小时 50 分：距离两小时，加爬升五十分钟。' },
      { q: '什么是内史密斯法则？', a: '平地每 5 公里一小时，再加每爬升 600 米一小时。1892 年提出，至今仍是基准。' },
      { q: '为什么下山有时更久？', a: '因为陡坡下山要放慢。平均坡度超过 12 度时，每 300 米不是减十分钟而是加十分钟。' },
      { q: '爬升 100 米折合平地多少？', a: '833 米。因为爬升 600 米和走 5 公里花的是同一小时。' },
      { q: '休息时间怎么算？', a: '表里没有。每小时只歇五分钟，六小时的行程也要多出半小时。' },
    ],
    [
      { q: '10 公里爬升 500 公尺要多久？', a: '上山 2 小時 50 分：距離兩小時，加爬升五十分鐘。' },
      { q: '什麼是內史密斯法則？', a: '平地每 5 公里一小時，再加每爬升 600 公尺一小時。1892 年提出，至今仍是基準。' },
      { q: '為什麼下山有時更久？', a: '因為陡坡下山要放慢。平均坡度超過 12 度時，每 300 公尺不是減十分鐘而是加十分鐘。' },
      { q: '爬升 100 公尺折合平地多少？', a: '833 公尺。因為爬升 600 公尺和走 5 公里花的是同一小時。' },
      { q: '休息時間怎麼算？', a: '表裡沒有。每小時只歇五分鐘，六小時的行程也要多出半小時。' },
    ],
  ),

  cellFaq: T<(f: HikeFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.km}킬로미터에 ${f.cell.up}미터를 올리면 얼마나 걸리나요?`, a: `올라가는 데 ${ko(f.upMinutes)}, 내려오는 데 ${ko(f.downMinutes)}, 왕복 ${ko(f.roundMinutes)}입니다.` },
      { q: `평균 경사는 얼마나 되나요?`, a: `${f.slope}도로 ${f.steep ? '가파른' : '완만한'} 쪽입니다. 오름을 거리로 나눈 각입니다.` },
      { q: `평지로 치면 얼마나 되나요?`, a: `${f.equivalent}킬로미터입니다. 오름 1미터를 평지 ${f.ratio}미터로 쳐서 더한 값입니다.` },
      { q: `올라가는 속도는 얼마인가요?`, a: `시속 ${f.speed}킬로미터입니다. 평지 걸음이 시속 5킬로미터인 것과 견주십시오.` },
    ],
    f => [
      { q: `How long is ${f.cell.km} km with ${f.cell.up} m of climb?`, a: `${en(f.upMinutes)} up, ${en(f.downMinutes)} down, ${en(f.roundMinutes)} there and back.` },
      { q: `How steep is it on average?`, a: `${f.slope}°, which counts as the ${f.steep ? 'steep' : 'gentle'} side. It is the climb divided by the distance.` },
      { q: `What is it as a flat walk?`, a: `${f.equivalent} km, counting each metre of climb as ${f.ratio} metres on the flat.` },
      { q: `How fast is that going up?`, a: `${f.speed} km/h — compare it with the 5 km/h a flat path allows.` },
    ],
    f => [
      { q: `¿Cuánto se tarda en ${f.cell.km} km con ${f.cell.up} m de subida?`, a: `${en(f.upMinutes)} de subida, ${en(f.downMinutes)} de bajada y ${en(f.roundMinutes)} en total.` },
      { q: `¿Qué pendiente media tiene?`, a: `${f.slope}°, del lado ${f.steep ? 'empinado' : 'suave'}. Es el desnivel dividido por la distancia.` },
      { q: `¿Cuánto es en llano?`, a: `${f.equivalent} km, contando cada metro de subida como ${f.ratio} metros llanos.` },
      { q: `¿A qué velocidad se sube?`, a: `${f.speed} km/h. Compáralo con los 5 km/h de un camino llano.` },
    ],
    f => [
      { q: `Quanto leva ${f.cell.km} km com ${f.cell.up} m de subida?`, a: `${en(f.upMinutes)} na subida, ${en(f.downMinutes)} na descida e ${en(f.roundMinutes)} ida e volta.` },
      { q: `Qual a inclinação média?`, a: `${f.slope}°, do lado ${f.steep ? 'íngreme' : 'suave'}. É a subida dividida pela distância.` },
      { q: `Quanto é isso no plano?`, a: `${f.equivalent} km, contando cada metro de subida como ${f.ratio} metros planos.` },
      { q: `Que velocidade dá na subida?`, a: `${f.speed} km/h. Compare com os 5 km/h de um caminho plano.` },
    ],
    f => [
      { q: `${f.cell.km}キロで${f.cell.up}メートル登るとどれくらいですか？`, a: `登り${ja(f.upMinutes)}、下り${ja(f.downMinutes)}、往復${ja(f.roundMinutes)}です。` },
      { q: `平均斜度はどれくらいですか？`, a: `${f.slope}度で${f.steep ? '急な' : '緩やかな'}部類です。登りを距離で割った角です。` },
      { q: `平地に直すとどれくらいですか？`, a: `${f.equivalent}キロです。登り1メートルを平地${f.ratio}メートルとして足した値です。` },
      { q: `登りの速度はどれくらいですか？`, a: `時速${f.speed}キロです。平地の時速5キロと比べてみてください。` },
    ],
    f => [
      { q: `Wie lange dauern ${f.cell.km} km mit ${f.cell.up} m Anstieg?`, a: `${en(f.upMinutes)} hinauf, ${en(f.downMinutes)} hinab, ${en(f.roundMinutes)} hin und zurück.` },
      { q: `Wie steil ist es im Mittel?`, a: `${f.slope}° — das ist die ${f.steep ? 'steile' : 'sanfte'} Seite. Es ist Anstieg geteilt durch Strecke.` },
      { q: `Was ist das als flache Strecke?`, a: `${f.equivalent} km, wenn jeder Höhenmeter als ${f.ratio} flache Meter zählt.` },
      { q: `Wie schnell geht es bergauf?`, a: `${f.speed} km/h — zum Vergleich: eben sind es 5 km/h.` },
    ],
    f => [
      { q: `Combien de temps pour ${f.cell.km} km avec ${f.cell.up} m de montée ?`, a: `${en(f.upMinutes)} à la montée, ${en(f.downMinutes)} à la descente, ${en(f.roundMinutes)} aller-retour.` },
      { q: `Quelle est la pente moyenne ?`, a: `${f.slope}°, plutôt ${f.steep ? 'raide' : 'douce'}. C’est le dénivelé divisé par la distance.` },
      { q: `Cela fait combien à plat ?`, a: `${f.equivalent} km, en comptant chaque mètre de montée pour ${f.ratio} mètres plats.` },
      { q: `À quelle vitesse monte-t-on ?`, a: `${f.speed} km/h — à comparer aux 5 km/h d’un sentier plat.` },
    ],
    f => [
      { q: `${f.cell.km} किमी और ${f.cell.up} मीटर चढ़ाई में कितना समय?`, a: `चढ़ने में ${hi(f.upMinutes)}, उतरने में ${hi(f.downMinutes)}, आने-जाने में ${hi(f.roundMinutes)}।` },
      { q: `औसत ढलान कितनी है?`, a: `${f.slope}°, यानी ${f.steep ? 'तीखी' : 'हल्की'} तरफ़। यह चढ़ाई को दूरी से भाग देने पर मिलती है।` },
      { q: `समतल में यह कितना है?`, a: `${f.equivalent} किमी — हर मीटर चढ़ाई को ${f.ratio} मीटर समतल गिनकर।` },
      { q: `चढ़ाई की गति क्या रहती है?`, a: `${f.speed} किमी/घंटा। समतल रास्ते की 5 किमी/घंटा से तुलना करें।` },
    ],
    f => [
      { q: `${f.cell.km} 公里爬升 ${f.cell.up} 米要多久？`, a: `上山 ${zh(f.upMinutes)}，下山 ${zh(f.downMinutes)}，往返 ${zh(f.roundMinutes)}。` },
      { q: `平均坡度是多少？`, a: `${f.slope}°，属于${f.steep ? '偏陡' : '偏缓'}。用爬升除以距离得到。` },
      { q: `折合平地是多少？`, a: `${f.equivalent} 公里，按每爬升 1 米折算 ${f.ratio} 米平地。` },
      { q: `上山速度是多少？`, a: `每小时 ${f.speed} 公里，可与平地的每小时 5 公里对照。` },
    ],
    f => [
      { q: `${f.cell.km} 公里爬升 ${f.cell.up} 公尺要多久？`, a: `上山 ${tw(f.upMinutes)}，下山 ${tw(f.downMinutes)}，往返 ${tw(f.roundMinutes)}。` },
      { q: `平均坡度是多少？`, a: `${f.slope}°，屬於${f.steep ? '偏陡' : '偏緩'}。用爬升除以距離得到。` },
      { q: `折合平地是多少？`, a: `${f.equivalent} 公里，按每爬升 1 公尺折算 ${f.ratio} 公尺平地。` },
      { q: `上山速度是多少？`, a: `每小時 ${f.speed} 公里，可與平地的每小時 5 公里對照。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const HIKE_UI: L<HikeUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<HikeUI>;
