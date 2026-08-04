/**
 * 러닝 페이스 화면의 문구 — 열 언어.
 *
 * 페이스는 숫자가 작을수록 빠르고 속도는 클수록 빠르다. 뒤집힌 두 값을 나란히
 * 두는 화면이라, 문구가 그 방향을 계속 짚어 준다.
 *
 * 마일을 쓰는 곳(미국·영국)도 있어 킬로미터 페이스 옆에 마일 페이스를 함께
 * 낸다. 언어가 아니라 나라의 문제라, 열 언어 모두에 둘 다 보인다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { PaceFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface PaceUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  raceName: (key: string) => string;
  goalName: (key: string) => string;
  paceLabel: string;
  speedLabel: string;
  msLabel: string;
  mileLabel: string;
  lapLabel: string;
  finishTitle: string;
  finishNote: string;
  distanceTitle: string;
  distanceNote: string;
  goalTitle: string;
  goalNote: string;
  metTag: string;
  missTag: string;
  tableTitle: string;
  tableNote: string;
  neighbourTitle: string;
  desc: (f: PaceFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: PaceFacts) => string;
  metaDesc: (f: PaceFacts) => string;
  hubFaq: FaqItem[];
  paceFaq: (f: PaceFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 거리 이름 — 5K·10K는 어디서나 그대로 쓰고 하프·풀만 옮긴다 */
const race = (half: string, full: string) => (key: string): string =>
  ({ '5k': '5K', '10k': '10K', half, full }[key] ?? key);

/**
 * 목표 이름 — 거리 이름과 "얼마 안에"를 언어마다 다르게 붙인다.
 *
 * 숫자는 어디서나 그대로지만, 붙는 말은 다르다. 한국은 서브4, 일본은 サブ4,
 * 중국은 破4小时처럼 각자의 관용 표현이 있어 그것을 따른다.
 */
const goal = (half: string, full: string, fmt: (dist: string, v: string, hour: boolean) => string) =>
  (key: string): string => {
    const table: Record<string, [string, string, boolean]> = {
      'sub20-5k': ['5K', '20', false],
      'sub25-5k': ['5K', '25', false],
      'sub30-5k': ['5K', '30', false],
      'sub50-10k': ['10K', '50', false],
      'sub60-10k': ['10K', '60', false],
      'sub100-half': [half, '100', false],
      'sub2-half': [half, '2', true],
      'sub3-full': [full, '3', true],
      'sub330-full': [full, '3:30', true],
      'sub4-full': [full, '4', true],
      'sub5-full': [full, '5', true],
    };
    const row = table[key];
    return row ? fmt(row[0], row[1], row[2]) : key;
  };

type Spec = { [K in keyof PaceUI]: L<PaceUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('러닝 페이스', 'Running pace', 'Ritmo de carrera', 'Ritmo de corrida', 'ランニングペース', 'Lauftempo', 'Allure de course', 'रनिंग पेस', '跑步配速', '跑步配速'),

  raceName: T<(key: string) => string>(
    race('하프', '풀코스'),
    race('Half', 'Marathon'),
    race('Medio', 'Maratón'),
    race('Meia', 'Maratona'),
    race('ハーフ', 'フル'),
    race('Halb', 'Marathon'),
    race('Semi', 'Marathon'),
    race('हाफ़', 'फ़ुल'),
    race('半马', '全马'),
    race('半馬', '全馬'),
  ),

  goalName: T<(key: string) => string>(
    goal('하프', '풀코스', (d, v, h) => (h ? `${d} 서브${v}` : `${d} ${v}분`)),
    goal('Half', 'Marathon', (d, v, h) => `sub-${v}${h ? 'h' : ' min'} ${d}`),
    goal('Medio', 'Maratón', (d, v, h) => `${d} bajo ${v}${h ? ' h' : ' min'}`),
    goal('Meia', 'Maratona', (d, v, h) => `${d} abaixo de ${v}${h ? ' h' : ' min'}`),
    goal('ハーフ', 'フル', (d, v, h) => (h ? `${d} サブ${v}` : `${d} ${v}分`)),
    goal('Halb', 'Marathon', (d, v, h) => `${d} unter ${v}${h ? ' h' : ' min'}`),
    goal('Semi', 'Marathon', (d, v, h) => `${d} sous ${v}${h ? ' h' : ' min'}`),
    goal('हाफ़', 'फ़ुल', (d, v, h) => `${d} सब-${v}${h ? ' घं' : ' मिन'}`),
    goal('半马', '全马', (d, v, h) => `${d} 破${v}${h ? '小时' : '分'}`),
    goal('半馬', '全馬', (d, v, h) => `${d} 破${v}${h ? '小時' : '分'}`),
  ),

  hubTitle: T(
    '러닝 페이스표 241가지 — 1km 3분부터 7분까지',
    '241 running paces — 3:00 to 7:00 per kilometre',
    '241 ritmos de carrera — de 3:00 a 7:00 por kilómetro',
    '241 ritmos de corrida — de 3:00 a 7:00 por quilômetro',
    'ランニングペース表241種 — 1km 3分から7分まで',
    '241 Lauftempi — 3:00 bis 7:00 pro Kilometer',
    '241 allures de course — de 3:00 à 7:00 au kilomètre',
    '241 रनिंग पेस — प्रति किलोमीटर 3:00 से 7:00 तक',
    '241 种跑步配速 — 每公里 3:00 到 7:00',
    '241 種跑步配速 — 每公里 3:00 到 7:00',
  ),

  hubLead: T(
    '1초 간격으로 241가지. 페이스 하나마다 5K·10K·하프·풀코스 완주 시간과 시속, 마일 페이스를 계산했습니다.',
    'Two hundred and forty-one paces, one second apart. Each one carries its 5K, 10K, half and full marathon finish times, its speed and its mile pace.',
    'Doscientos cuarenta y un ritmos, de segundo en segundo. Cada uno trae sus tiempos de 5K, 10K, medio y maratón, su velocidad y su ritmo por milla.',
    'Duzentos e quarenta e um ritmos, de segundo em segundo. Cada um traz seus tempos de 5K, 10K, meia e maratona, sua velocidade e seu ritmo por milha.',
    '1秒刻みで241種。ペースごとに5K・10K・ハーフ・フルの完走時間と時速、マイルペースを計算しました。',
    'Zweihunderteinundvierzig Tempi im Sekundenabstand. Zu jedem gehören die Zielzeiten für 5K, 10K, Halb- und Marathon, die Geschwindigkeit und das Meilentempo.',
    'Deux cent quarante et une allures, à la seconde près. Chacune donne ses temps sur 5 km, 10 km, semi et marathon, sa vitesse et son allure au mile.',
    'एक-एक सेकंड के अंतर पर 241 पेस। हर पेस के साथ 5K, 10K, हाफ़ और फ़ुल मैराथन का समय, रफ़्तार और माइल पेस।',
    '以 1 秒为间隔的 241 种配速。每种都算出 5K、10K、半马、全马的完赛时间、时速与每英里配速。',
    '以 1 秒為間隔的 241 種配速。每種都算出 5K、10K、半馬、全馬的完賽時間、時速與每英里配速。',
  ),

  paceLabel: T('1km 페이스', 'Pace per km', 'Ritmo por km', 'Ritmo por km', '1kmペース', 'Tempo pro km', 'Allure au km', 'प्रति किमी पेस', '每公里配速', '每公里配速'),
  speedLabel: T('시속', 'Speed', 'Velocidad', 'Velocidade', '時速', 'Geschwindigkeit', 'Vitesse', 'रफ़्तार', '时速', '時速'),
  msLabel: T('초속', 'Metres per second', 'Metros por segundo', 'Metros por segundo', '秒速', 'Meter pro Sekunde', 'Mètres par seconde', 'मीटर प्रति सेकंड', '秒速', '秒速'),
  mileLabel: T('1마일 페이스', 'Pace per mile', 'Ritmo por milla', 'Ritmo por milha', '1マイルペース', 'Tempo pro Meile', 'Allure au mile', 'प्रति माइल पेस', '每英里配速', '每英里配速'),
  lapLabel: T('트랙 한 바퀴(400m)', 'One lap (400 m)', 'Una vuelta (400 m)', 'Uma volta (400 m)', 'トラック1周(400m)', 'Eine Runde (400 m)', 'Un tour (400 m)', 'एक चक्कर (400 मी)', '一圈（400 米）', '一圈（400 公尺）'),

  finishTitle: T('완주 시간', 'Finish times', 'Tiempos de meta', 'Tempos de chegada', '完走時間', 'Zielzeiten', 'Temps d’arrivée', 'समाप्ति समय', '完赛时间', '完賽時間'),

  finishNote: T(
    '처음부터 끝까지 이 페이스를 지켰을 때의 시간입니다. 실제로는 뒤로 갈수록 느려지므로 목표를 잡을 때는 여유를 둡니다.',
    'These assume you hold the pace from gun to tape. Most runners drift slower in the second half, so leave a margin when setting a target.',
    'Suponen que mantienes el ritmo de principio a fin. La mayoría se frena en la segunda mitad, así que deja margen al fijar un objetivo.',
    'Supõem que você segura o ritmo do início ao fim. A maioria desacelera na segunda metade, então deixe margem ao definir a meta.',
    '最初から最後までこのペースを保った場合の時間です。実際は後半で落ちるので、目標を立てるときは余裕を見ます。',
    'Sie gelten, wenn du das Tempo von Start bis Ziel hältst. Die meisten werden in der zweiten Hälfte langsamer — plane also Reserve ein.',
    'Ils supposent que vous tenez l’allure du départ à l’arrivée. La plupart ralentissent sur la seconde moitié : gardez une marge en fixant un objectif.',
    'यह मानकर कि आप शुरू से अंत तक यही पेस बनाए रखें। अधिकतर धावक दूसरे हिस्से में धीमे पड़ते हैं, इसलिए लक्ष्य में थोड़ी छूट रखें।',
    '这是全程保持该配速的时间。多数人后半程会慢下来，定目标时要留出余量。',
    '這是全程保持該配速的時間。多數人後半程會慢下來，定目標時要留出餘量。',
  ),

  distanceTitle: T('하프와 풀은 딱 떨어지지 않습니다', 'The half and the full are not round numbers', 'El medio y el maratón no son cifras redondas', 'A meia e a maratona não são números redondos', 'ハーフとフルは端数があります', 'Halb und Voll sind keine runden Zahlen', 'Le semi et le marathon ne sont pas ronds', 'हाफ़ और फ़ुल पूरे अंक नहीं हैं', '半马和全马不是整数', '半馬和全馬不是整數'),

  distanceNote: T(
    '풀코스는 42.195km, 하프는 21.0975km입니다. 42km로 어림하면 5분 페이스에서 한 시간이 아니라 1분쯤 어긋납니다.',
    'A marathon is 42.195 km and a half is 21.0975 km. Rounding to 42 km costs you about a minute at a 5:00 pace — small, but enough to miss a target.',
    'El maratón mide 42,195 km y el medio 21,0975 km. Redondear a 42 km cuesta cerca de un minuto a ritmo de 5:00: poco, pero basta para fallar un objetivo.',
    'A maratona tem 42,195 km e a meia 21,0975 km. Arredondar para 42 km custa cerca de um minuto a 5:00 de ritmo: pouco, mas suficiente para perder a meta.',
    'フルは42.195km、ハーフは21.0975kmです。42kmで丸めると5分ペースで1分ほどずれます——目標を落とすには十分な差です。',
    'Ein Marathon misst 42,195 km, ein Halbmarathon 21,0975 km. Auf 42 km gerundet fehlt bei 5:00er-Tempo rund eine Minute — wenig, aber genug für ein verpasstes Ziel.',
    'Un marathon fait 42,195 km et un semi 21,0975 km. Arrondir à 42 km coûte environ une minute à 5:00 au km — peu, mais assez pour manquer un objectif.',
    'फ़ुल मैराथन 42.195 किमी और हाफ़ 21.0975 किमी है। 42 किमी मान लेने पर 5:00 पेस पर लगभग एक मिनट का अंतर आ जाता है — लक्ष्य चूकने के लिए इतना काफ़ी है।',
    '全马是 42.195 公里，半马是 21.0975 公里。按 42 公里估算，在 5:00 配速下会差约一分钟——足以让目标落空。',
    '全馬是 42.195 公里，半馬是 21.0975 公里。按 42 公里估算，在 5:00 配速下會差約一分鐘——足以讓目標落空。',
  ),

  goalTitle: T('이 페이스로 끊을 수 있는 목표', 'What this pace breaks', 'Qué objetivos alcanza este ritmo', 'Que metas este ritmo alcança', 'このペースで届く目標', 'Was dieses Tempo schafft', 'Ce que cette allure permet', 'यह पेस कौन-से लक्ष्य पूरे करता है', '这个配速能达成的目标', '這個配速能達成的目標'),

  goalNote: T(
    '경계는 생각보다 빠듯합니다 — 서브4는 5분 41초까지이고, 1초만 느려도 4시간을 넘깁니다.',
    'The cut-offs are tighter than they look: a sub-4 marathon needs 5:41 per kilometre, and one second slower puts you over four hours.',
    'Los límites son más ajustados de lo que parecen: bajar de 4 horas exige 5:41 por kilómetro, y un segundo más lento te pasa de las cuatro.',
    'Os limites são mais apertados do que parecem: baixar de 4 horas exige 5:41 por quilômetro, e um segundo mais lento já passa das quatro.',
    '境目は思ったより厳しいです——サブ4は1km 5分41秒までで、1秒遅いだけで4時間を超えます。',
    'Die Grenzen sind knapper, als sie wirken: Für einen Marathon unter vier Stunden braucht es 5:41 pro Kilometer — eine Sekunde langsamer, und es reicht nicht.',
    'Les seuils sont plus serrés qu’ils n’en ont l’air : passer sous 4 heures demande 5:41 au kilomètre, et une seconde de plus vous fait dépasser.',
    'सीमाएँ दिखने से ज़्यादा कड़ी हैं — सब-4 के लिए प्रति किलोमीटर 5:41 चाहिए, और एक सेकंड धीमे होते ही चार घंटे पार।',
    '门槛比看上去更紧：破 4 小时需要每公里 5:41，慢一秒就超过四小时。',
    '門檻比看上去更緊：破 4 小時需要每公里 5:41，慢一秒就超過四小時。',
  ),

  metTag: T('끊습니다', 'yes', 'sí', 'sim', '届きます', 'ja', 'oui', 'हाँ', '可以', '可以'),
  missTag: T('못 끊습니다', 'no', 'no', 'não', '届きません', 'nein', 'non', 'नहीं', '不行', '不行'),

  tableTitle: T('30초 간격으로 보기', 'Every thirty seconds', 'Cada treinta segundos', 'A cada trinta segundos', '30秒刻みで見る', 'Alle dreißig Sekunden', 'Toutes les trente secondes', 'हर तीस सेकंड पर', '每三十秒一档', '每三十秒一檔'),

  tableNote: T(
    '자기 페이스가 어느 언저리인지 먼저 짚고, 낱장에서 초 단위로 맞춰 보세요.',
    'Find the neighbourhood first, then step second by second on the page for your pace.',
    'Ubica primero la zona y luego ajusta segundo a segundo en la página de tu ritmo.',
    'Ache primeiro a faixa e depois ajuste segundo a segundo na página do seu ritmo.',
    'まず自分のペースのあたりを見つけ、個別ページで1秒ずつ合わせてください。',
    'Erst die Gegend finden, dann auf der Seite deines Tempos sekundenweise nachjustieren.',
    'Repérez d’abord la zone, puis ajustez seconde par seconde sur la page de votre allure.',
    'पहले अपनी रेंज पहचानिए, फिर अपने पेस के पृष्ठ पर सेकंड-दर-सेकंड मिलाइए।',
    '先找到大致区间，再到自己配速的页面上按秒微调。',
    '先找到大致區間，再到自己配速的頁面上按秒微調。',
  ),

  neighbourTitle: T('가까운 페이스', 'Nearby paces', 'Ritmos cercanos', 'Ritmos próximos', '近いペース', 'Tempi daneben', 'Allures voisines', 'पास के पेस', '相邻配速', '相鄰配速'),

  desc: T<(f: PaceFacts) => string>(
    f => `1km를 ${f.label}에 가는 페이스입니다. 시속 ${f.kmh}km이고, 이대로 가면 하프는 ${f.finishes[2].text}, 풀코스는 ${f.finishes[3].text}에 들어옵니다.`,
    f => `Running ${f.label} per kilometre is ${f.kmh} km/h. Hold it and the half comes in at ${f.finishes[2].text}, the marathon at ${f.finishes[3].text}.`,
    f => `Correr a ${f.label} por kilómetro son ${f.kmh} km/h. Si lo mantienes, el medio maratón sale en ${f.finishes[2].text} y el maratón en ${f.finishes[3].text}.`,
    f => `Correr a ${f.label} por quilômetro dá ${f.kmh} km/h. Mantendo o ritmo, a meia sai em ${f.finishes[2].text} e a maratona em ${f.finishes[3].text}.`,
    f => `1kmを${f.label}で走るペースです。時速${f.kmh}kmで、このまま行けばハーフは${f.finishes[2].text}、フルは${f.finishes[3].text}でゴールします。`,
    f => `${f.label} pro Kilometer entsprechen ${f.kmh} km/h. Hältst du das Tempo, kommt der Halbmarathon in ${f.finishes[2].text} und der Marathon in ${f.finishes[3].text}.`,
    f => `Courir ${f.label} au kilomètre, c’est ${f.kmh} km/h. En tenant l’allure, le semi tombe à ${f.finishes[2].text} et le marathon à ${f.finishes[3].text}.`,
    f => `प्रति किलोमीटर ${f.label} यानी ${f.kmh} किमी/घंटा। यही पेस बनाए रखें तो हाफ़ ${f.finishes[2].text} और फ़ुल ${f.finishes[3].text} में पूरा होगा।`,
    f => `每公里 ${f.label} 的配速相当于时速 ${f.kmh} 公里。保持下去，半马 ${f.finishes[2].text}，全马 ${f.finishes[3].text} 完赛。`,
    f => `每公里 ${f.label} 的配速相當於時速 ${f.kmh} 公里。保持下去，半馬 ${f.finishes[2].text}，全馬 ${f.finishes[3].text} 完賽。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '페이스는 1km에 걸리는 시간이라 숫자가 작을수록 빠릅니다.',
      '시속으로 바꾸려면 3600을 페이스 초로 나눕니다 — 300초면 12km/h입니다.',
      '완주 시간은 페이스에 거리를 곱한 값입니다.',
      '마일 페이스는 킬로미터 페이스의 1.609344배입니다.',
    ],
    [
      'Pace is the time for one kilometre, so a smaller number means faster.',
      'To get speed, divide 3600 by the pace in seconds: 300 s gives 12 km/h.',
      'A finish time is simply the pace multiplied by the distance.',
      'Mile pace is kilometre pace times 1.609344.',
    ],
    [
      'El ritmo es el tiempo de un kilómetro: cuanto menor el número, más rápido.',
      'Para la velocidad, divide 3600 entre el ritmo en segundos: 300 s dan 12 km/h.',
      'El tiempo de meta es el ritmo multiplicado por la distancia.',
      'El ritmo por milla es el de kilómetro por 1,609344.',
    ],
    [
      'O ritmo é o tempo de um quilômetro: quanto menor o número, mais rápido.',
      'Para a velocidade, divida 3600 pelo ritmo em segundos: 300 s dão 12 km/h.',
      'O tempo de chegada é o ritmo multiplicado pela distância.',
      'O ritmo por milha é o de quilômetro vezes 1,609344.',
    ],
    [
      'ペースは1kmにかかる時間なので、数字が小さいほど速いです。',
      '時速にするには3600をペースの秒数で割ります——300秒なら12km/hです。',
      '完走時間はペースに距離を掛けただけの値です。',
      'マイルペースはキロメートルペースの1.609344倍です。',
    ],
    [
      'Das Tempo ist die Zeit für einen Kilometer — je kleiner die Zahl, desto schneller.',
      'Für die Geschwindigkeit 3600 durch das Tempo in Sekunden teilen: 300 s ergeben 12 km/h.',
      'Die Zielzeit ist schlicht Tempo mal Strecke.',
      'Das Meilentempo ist das Kilometertempo mal 1,609344.',
    ],
    [
      'L’allure est le temps d’un kilomètre : plus le nombre est petit, plus c’est rapide.',
      'Pour la vitesse, divisez 3600 par l’allure en secondes : 300 s donnent 12 km/h.',
      'Le temps d’arrivée est simplement l’allure multipliée par la distance.',
      'L’allure au mile vaut l’allure au kilomètre fois 1,609344.',
    ],
    [
      'पेस एक किलोमीटर का समय है — अंक जितना छोटा, उतना तेज़।',
      'रफ़्तार के लिए 3600 को पेस के सेकंड से भाग दें: 300 सेकंड यानी 12 किमी/घंटा।',
      'समाप्ति समय बस पेस गुणा दूरी है।',
      'माइल पेस किलोमीटर पेस का 1.609344 गुना है।',
    ],
    [
      '配速是跑一公里所用的时间，数字越小越快。',
      '换成时速就用 3600 除以配速秒数：300 秒即 12 公里/小时。',
      '完赛时间就是配速乘以距离。',
      '每英里配速是每公里配速的 1.609344 倍。',
    ],
    [
      '配速是跑一公里所用的時間，數字越小越快。',
      '換成時速就用 3600 除以配速秒數：300 秒即 12 公里/小時。',
      '完賽時間就是配速乘以距離。',
      '每英里配速是每公里配速的 1.609344 倍。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '러닝 페이스표 — 5K·10K·하프·풀코스 완주 시간 241가지',
    'Running pace chart — 5K, 10K, half and marathon times for 241 paces',
    'Tabla de ritmos — tiempos de 5K, 10K, medio y maratón para 241 ritmos',
    'Tabela de ritmos — tempos de 5K, 10K, meia e maratona para 241 ritmos',
    'ランニングペース表 — 5K・10K・ハーフ・フルの完走時間241種',
    'Lauftempo-Tabelle — 5K-, 10K-, Halb- und Marathonzeiten für 241 Tempi',
    'Tableau des allures — temps sur 5 km, 10 km, semi et marathon pour 241 allures',
    'रनिंग पेस चार्ट — 241 पेस के 5K, 10K, हाफ़ और फ़ुल समय',
    '跑步配速表 — 241 种配速的 5K、10K、半马、全马完赛时间',
    '跑步配速表 — 241 種配速的 5K、10K、半馬、全馬完賽時間',
  ),

  hubMetaDesc: T(
    '1km 3분부터 7분까지 1초 간격 241가지. 페이스마다 5K·10K·하프·풀코스 완주 시간과 시속, 마일 페이스, 끊을 수 있는 목표를 계산했습니다.',
    '241 paces from 3:00 to 7:00 per kilometre, one second apart, each with 5K, 10K, half and marathon finish times, speed, mile pace and the targets it breaks.',
    '241 ritmos de 3:00 a 7:00 por kilómetro, de segundo en segundo, con tiempos de 5K, 10K, medio y maratón, velocidad, ritmo por milla y objetivos alcanzables.',
    '241 ritmos de 3:00 a 7:00 por quilômetro, de segundo em segundo, com tempos de 5K, 10K, meia e maratona, velocidade, ritmo por milha e metas alcançáveis.',
    '1km 3分から7分まで1秒刻みで241種。ペースごとに5K・10K・ハーフ・フルの完走時間、時速、マイルペース、届く目標を計算しました。',
    '241 Tempi von 3:00 bis 7:00 pro Kilometer im Sekundenabstand — mit Zielzeiten für 5K, 10K, Halb und Marathon, Geschwindigkeit, Meilentempo und erreichbaren Zielen.',
    '241 allures de 3:00 à 7:00 au kilomètre, à la seconde près, avec les temps sur 5 km, 10 km, semi et marathon, la vitesse, l’allure au mile et les objectifs atteints.',
    '3:00 से 7:00 प्रति किलोमीटर तक, एक-एक सेकंड पर 241 पेस — 5K, 10K, हाफ़ और फ़ुल समय, रफ़्तार, माइल पेस और पूरे होने वाले लक्ष्य।',
    '每公里 3:00 到 7:00、以 1 秒为间隔的 241 种配速，含 5K、10K、半马、全马完赛时间、时速、每英里配速与可达成的目标。',
    '每公里 3:00 到 7:00、以 1 秒為間隔的 241 種配速，含 5K、10K、半馬、全馬完賽時間、時速、每英里配速與可達成的目標。',
  ),

  metaTitle: T<(f: PaceFacts) => string>(
    f => `${f.label} 페이스 — 풀코스 ${f.finishes[3].text}, 시속 ${f.kmh}km`,
    f => `${f.label} per km — marathon in ${f.finishes[3].text}, ${f.kmh} km/h`,
    f => `Ritmo ${f.label} — maratón en ${f.finishes[3].text}, ${f.kmh} km/h`,
    f => `Ritmo ${f.label} — maratona em ${f.finishes[3].text}, ${f.kmh} km/h`,
    f => `${f.label}ペース — フル${f.finishes[3].text}、時速${f.kmh}km`,
    f => `${f.label} pro km — Marathon in ${f.finishes[3].text}, ${f.kmh} km/h`,
    f => `Allure ${f.label} — marathon en ${f.finishes[3].text}, ${f.kmh} km/h`,
    f => `${f.label} पेस — फ़ुल मैराथन ${f.finishes[3].text}, ${f.kmh} किमी/घंटा`,
    f => `${f.label} 配速 — 全马 ${f.finishes[3].text}，时速 ${f.kmh} 公里`,
    f => `${f.label} 配速 — 全馬 ${f.finishes[3].text}，時速 ${f.kmh} 公里`,
  ),

  metaDesc: T<(f: PaceFacts) => string>(
    f => `1km ${f.label} 페이스로 가면 5K ${f.finishes[0].text}, 10K ${f.finishes[1].text}, 하프 ${f.finishes[2].text}, 풀코스 ${f.finishes[3].text}입니다. 시속 ${f.kmh}km, 마일 페이스 ${f.mileText}입니다.`,
    f => `At ${f.label} per kilometre you finish 5K in ${f.finishes[0].text}, 10K in ${f.finishes[1].text}, the half in ${f.finishes[2].text} and the marathon in ${f.finishes[3].text} — that is ${f.kmh} km/h, or ${f.mileText} per mile.`,
    f => `A ${f.label} por kilómetro terminas el 5K en ${f.finishes[0].text}, el 10K en ${f.finishes[1].text}, el medio en ${f.finishes[2].text} y el maratón en ${f.finishes[3].text}: son ${f.kmh} km/h, o ${f.mileText} por milla.`,
    f => `A ${f.label} por quilômetro você termina o 5K em ${f.finishes[0].text}, o 10K em ${f.finishes[1].text}, a meia em ${f.finishes[2].text} e a maratona em ${f.finishes[3].text}: são ${f.kmh} km/h, ou ${f.mileText} por milha.`,
    f => `1km ${f.label}のペースなら5Kは${f.finishes[0].text}、10Kは${f.finishes[1].text}、ハーフは${f.finishes[2].text}、フルは${f.finishes[3].text}です。時速${f.kmh}km、マイルペースは${f.mileText}です。`,
    f => `Mit ${f.label} pro Kilometer läufst du 5K in ${f.finishes[0].text}, 10K in ${f.finishes[1].text}, den Halbmarathon in ${f.finishes[2].text} und den Marathon in ${f.finishes[3].text} — das sind ${f.kmh} km/h oder ${f.mileText} pro Meile.`,
    f => `À ${f.label} au kilomètre, vous bouclez le 5 km en ${f.finishes[0].text}, le 10 km en ${f.finishes[1].text}, le semi en ${f.finishes[2].text} et le marathon en ${f.finishes[3].text} : soit ${f.kmh} km/h, ou ${f.mileText} au mile.`,
    f => `प्रति किलोमीटर ${f.label} पर 5K ${f.finishes[0].text}, 10K ${f.finishes[1].text}, हाफ़ ${f.finishes[2].text} और फ़ुल ${f.finishes[3].text} में पूरा होता है — यानी ${f.kmh} किमी/घंटा, या ${f.mileText} प्रति माइल।`,
    f => `每公里 ${f.label} 的配速下，5K 用时 ${f.finishes[0].text}，10K ${f.finishes[1].text}，半马 ${f.finishes[2].text}，全马 ${f.finishes[3].text}；相当于时速 ${f.kmh} 公里、每英里 ${f.mileText}。`,
    f => `每公里 ${f.label} 的配速下，5K 用時 ${f.finishes[0].text}，10K ${f.finishes[1].text}，半馬 ${f.finishes[2].text}，全馬 ${f.finishes[3].text}；相當於時速 ${f.kmh} 公里、每英里 ${f.mileText}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '서브4를 하려면 몇 분 페이스인가요?', a: '1km 5분 41초입니다. 42.195km를 곱하면 3시간 59분 45초라 15초가 남습니다. 5분 42초로 가면 4시간을 31초 넘깁니다.' },
      { q: '페이스와 시속 가운데 뭘 봐야 하나요?', a: '달릴 때는 페이스가 편합니다. 시계가 1km마다 알려 주니 목표와 바로 견줄 수 있습니다. 시속은 트레드밀에서 씁니다.' },
      { q: '이 표대로 가면 정말 그 시간에 들어오나요?', a: '처음부터 끝까지 같은 페이스를 지켰을 때의 값입니다. 실제로는 후반에 느려지므로, 마라톤이라면 목표보다 5~10초 빠른 페이스로 잡는 편이 안전합니다.' },
      { q: '트랙 한 바퀴는 몇 초인가요?', a: '400m이므로 1km 페이스의 0.4배입니다. 5분 페이스면 두 바퀴에 4분, 한 바퀴에 2분입니다.' },
      { q: '왜 3분에서 7분까지인가요?', a: '3분보다 빠르면 세계기록 언저리이고, 7분보다 느리면 걷기와 섞입니다. 그 사이가 사람들이 실제로 목표를 세우는 구간입니다.' },
    ],
    [
      { q: 'What pace do I need for a sub-4 marathon?', a: '5:41 per kilometre. Times 42.195 km that comes to 3:59:45 — fifteen seconds in hand. At 5:42 you finish 31 seconds over four hours.' },
      { q: 'Should I watch pace or speed?', a: 'Pace, when you are running: the watch calls out each kilometre and you can compare it to your target on the spot. Speed is what treadmills use.' },
      { q: 'Will I really finish in these times?', a: 'Only if you hold the same pace throughout. Most runners fade late, so for a marathon it is safer to train at five to ten seconds quicker than the target pace.' },
      { q: 'How long is one lap of the track?', a: 'It is 400 m, so 0.4 of your kilometre pace. At 5:00 per km that is two minutes a lap, four minutes for two laps.' },
      { q: 'Why stop at 3:00 and 7:00?', a: 'Below 3:00 you are near world-record territory; above 7:00 running blurs into walking. In between is where people actually set targets.' },
    ],
    [
      { q: '¿Qué ritmo necesito para bajar de 4 horas?', a: '5:41 por kilómetro. Multiplicado por 42,195 km da 3:59:45, con quince segundos de margen. A 5:42 terminas 31 segundos por encima de las cuatro horas.' },
      { q: '¿Miro el ritmo o la velocidad?', a: 'El ritmo mientras corres: el reloj lo canta cada kilómetro y lo comparas al instante con tu objetivo. La velocidad es lo que usan las cintas.' },
      { q: '¿De verdad terminaré en estos tiempos?', a: 'Solo si mantienes el mismo ritmo todo el rato. La mayoría se apaga al final, así que en maratón conviene apuntar de cinco a diez segundos más rápido que el objetivo.' },
      { q: '¿Cuánto dura una vuelta a la pista?', a: 'Son 400 m, es decir 0,4 de tu ritmo por kilómetro. A 5:00 el kilómetro, dos minutos por vuelta.' },
      { q: '¿Por qué de 3:00 a 7:00?', a: 'Por debajo de 3:00 estás cerca del récord mundial; por encima de 7:00 correr se mezcla con caminar. En medio está donde la gente fija objetivos.' },
    ],
    [
      { q: 'Que ritmo preciso para baixar de 4 horas?', a: '5:41 por quilômetro. Vezes 42,195 km dá 3:59:45, com quinze segundos de folga. A 5:42 você termina 31 segundos acima das quatro horas.' },
      { q: 'Olho o ritmo ou a velocidade?', a: 'O ritmo enquanto corre: o relógio avisa a cada quilômetro e você compara na hora com a meta. Velocidade é o que as esteiras usam.' },
      { q: 'Vou mesmo terminar nesses tempos?', a: 'Só se mantiver o mesmo ritmo o tempo todo. A maioria cai no fim, então na maratona é mais seguro mirar de cinco a dez segundos mais rápido que a meta.' },
      { q: 'Quanto dura uma volta na pista?', a: 'São 400 m, ou seja 0,4 do seu ritmo por quilômetro. A 5:00 o quilômetro, dois minutos por volta.' },
      { q: 'Por que de 3:00 a 7:00?', a: 'Abaixo de 3:00 você está perto do recorde mundial; acima de 7:00 correr se mistura com caminhar. No meio é onde as pessoas realmente traçam metas.' },
    ],
    [
      { q: 'サブ4に必要なペースは？', a: '1km 5分41秒です。42.195kmを掛けると3時間59分45秒で、15秒の余裕があります。5分42秒だと4時間を31秒超えます。' },
      { q: 'ペースと時速のどちらを見るべきですか？', a: '走っている間はペースが便利です。時計が1kmごとに知らせるので目標とすぐ比べられます。時速はトレッドミルで使います。' },
      { q: 'この表どおりに完走できますか？', a: '最初から最後まで同じペースを保てた場合の値です。実際は後半に落ちるので、マラソンなら目標より5〜10秒速いペースで組むほうが安全です。' },
      { q: 'トラック1周は何秒ですか？', a: '400mなので1kmペースの0.4倍です。5分ペースなら1周2分、2周で4分です。' },
      { q: 'なぜ3分から7分までですか？', a: '3分より速いと世界記録の領域、7分より遅いと歩きと混ざります。その間が実際に目標を立てる範囲です。' },
    ],
    [
      { q: 'Welches Tempo brauche ich für einen Marathon unter vier Stunden?', a: '5:41 pro Kilometer. Mal 42,195 km ergibt das 3:59:45 — fünfzehn Sekunden Puffer. Bei 5:42 liegst du 31 Sekunden über vier Stunden.' },
      { q: 'Tempo oder Geschwindigkeit im Blick behalten?', a: 'Beim Laufen das Tempo: Die Uhr meldet jeden Kilometer, und du vergleichst sofort mit dem Ziel. Geschwindigkeit ist die Sprache der Laufbänder.' },
      { q: 'Komme ich wirklich in diesen Zeiten an?', a: 'Nur wenn du das Tempo durchhältst. Die meisten brechen spät ein, deshalb ist es beim Marathon sicherer, fünf bis zehn Sekunden schneller als das Ziel zu planen.' },
      { q: 'Wie lange dauert eine Bahnrunde?', a: '400 m, also 0,4 deines Kilometertempos. Bei 5:00 pro Kilometer sind das zwei Minuten je Runde.' },
      { q: 'Warum von 3:00 bis 7:00?', a: 'Unter 3:00 bewegst du dich nahe am Weltrekord, über 7:00 geht Laufen ins Gehen über. Dazwischen liegt der Bereich, in dem Ziele gesetzt werden.' },
    ],
    [
      { q: 'Quelle allure pour un marathon sous 4 heures ?', a: '5:41 au kilomètre. Multiplié par 42,195 km, cela donne 3:59:45, quinze secondes de marge. À 5:42, vous finissez 31 secondes au-delà des quatre heures.' },
      { q: 'Faut-il regarder l’allure ou la vitesse ?', a: 'L’allure en course : la montre l’annonce à chaque kilomètre et la comparaison avec l’objectif est immédiate. La vitesse, c’est le langage des tapis.' },
      { q: 'Vais-je vraiment finir dans ces temps ?', a: 'Seulement en tenant la même allure de bout en bout. La plupart faiblissent sur la fin : pour un marathon, visez cinq à dix secondes plus vite que l’objectif.' },
      { q: 'Combien dure un tour de piste ?', a: '400 m, soit 0,4 de votre allure au kilomètre. À 5:00 au km, cela fait deux minutes par tour.' },
      { q: 'Pourquoi s’arrêter à 3:00 et 7:00 ?', a: 'En deçà de 3:00, on frôle le record du monde ; au-delà de 7:00, la course se confond avec la marche. Entre les deux se situent les objectifs réels.' },
    ],
    [
      { q: 'सब-4 मैराथन के लिए कौन-सा पेस चाहिए?', a: 'प्रति किलोमीटर 5:41। 42.195 किमी से गुणा करने पर 3:59:45 — पंद्रह सेकंड की गुंजाइश। 5:42 पर आप चार घंटे से 31 सेकंड ऊपर निकल जाते हैं।' },
      { q: 'पेस देखें या रफ़्तार?', a: 'दौड़ते समय पेस सुविधाजनक है — घड़ी हर किलोमीटर पर बताती है और लक्ष्य से तुरंत तुलना हो जाती है। रफ़्तार ट्रेडमिल की भाषा है।' },
      { q: 'क्या सचमुच इन्हीं समयों में पूरा होगा?', a: 'तभी, जब आप वही पेस अंत तक बनाए रखें। अधिकतर लोग आख़िर में धीमे पड़ते हैं, इसलिए मैराथन में लक्ष्य से पाँच-दस सेकंड तेज़ पेस रखना सुरक्षित है।' },
      { q: 'ट्रैक का एक चक्कर कितने समय का है?', a: '400 मीटर, यानी आपके किलोमीटर पेस का 0.4 गुना। 5:00 पेस पर एक चक्कर दो मिनट का।' },
      { q: '3:00 से 7:00 तक ही क्यों?', a: '3:00 से तेज़ होना विश्व रिकॉर्ड के आसपास है और 7:00 से धीमा होते ही दौड़ चलने में घुल जाती है। बीच का हिस्सा ही वह है जहाँ लोग लक्ष्य रखते हैं।' },
    ],
    [
      { q: '破 4 小时需要什么配速？', a: '每公里 5:41。乘以 42.195 公里是 3:59:45，还余十五秒。若是 5:42，就会比四小时多出 31 秒。' },
      { q: '该看配速还是时速？', a: '跑步时看配速：手表每公里报一次，能立刻和目标对照。时速是跑步机上用的说法。' },
      { q: '照这个表真能跑出这些成绩吗？', a: '前提是全程保持同一配速。多数人后程会掉，所以全马最好按比目标快五到十秒的配速来练。' },
      { q: '跑道一圈是多少秒？', a: '一圈 400 米，即每公里配速的 0.4 倍。5:00 配速下一圈两分钟。' },
      { q: '为什么只到 3:00 和 7:00？', a: '快于 3:00 已接近世界纪录，慢于 7:00 就和快走混在一起了。中间这一段才是大家真正设目标的范围。' },
    ],
    [
      { q: '破 4 小時需要什麼配速？', a: '每公里 5:41。乘以 42.195 公里是 3:59:45，還餘十五秒。若是 5:42，就會比四小時多出 31 秒。' },
      { q: '該看配速還是時速？', a: '跑步時看配速：手錶每公里報一次，能立刻和目標對照。時速是跑步機上用的說法。' },
      { q: '照這個表真能跑出這些成績嗎？', a: '前提是全程保持同一配速。多數人後程會掉，所以全馬最好按比目標快五到十秒的配速來練。' },
      { q: '跑道一圈是多少秒？', a: '一圈 400 公尺，即每公里配速的 0.4 倍。5:00 配速下一圈兩分鐘。' },
      { q: '為什麼只到 3:00 和 7:00？', a: '快於 3:00 已接近世界紀錄，慢於 7:00 就和快走混在一起了。中間這一段才是大家真正設目標的範圍。' },
    ],
  ),

  paceFaq: T<(f: PaceFacts) => FaqItem[]>(
    f => [
      { q: `${f.label} 페이스로 풀코스를 뛰면 몇 시간인가요?`, a: `${f.finishes[3].text}입니다. 하프는 ${f.finishes[2].text}, 10K는 ${f.finishes[1].text}, 5K는 ${f.finishes[0].text}입니다.` },
      { q: `${f.label} 페이스는 시속 몇 km인가요?`, a: `${f.kmh}km/h입니다. 초속으로는 ${f.ms}m입니다.` },
      { q: `마일로는 얼마인가요?`, a: `1마일에 ${f.mileText}입니다. 1마일이 1.609344km이기 때문입니다.` },
      { q: `트랙 한 바퀴는요?`, a: `400m에 ${f.lapText}입니다.` },
    ],
    f => [
      { q: `What marathon time does ${f.label} per km give?`, a: `${f.finishes[3].text}. The half comes in at ${f.finishes[2].text}, the 10K at ${f.finishes[1].text} and the 5K at ${f.finishes[0].text}.` },
      { q: `How fast is ${f.label} per km in km/h?`, a: `${f.kmh} km/h, or ${f.ms} metres per second.` },
      { q: `What is that per mile?`, a: `${f.mileText}, because a mile is 1.609344 km.` },
      { q: `And one lap of the track?`, a: `${f.lapText} for 400 m.` },
    ],
    f => [
      { q: `¿Qué maratón sale a ${f.label} por km?`, a: `${f.finishes[3].text}. El medio queda en ${f.finishes[2].text}, el 10K en ${f.finishes[1].text} y el 5K en ${f.finishes[0].text}.` },
      { q: `¿Cuántos km/h son ${f.label} por km?`, a: `${f.kmh} km/h, o ${f.ms} metros por segundo.` },
      { q: `¿Y por milla?`, a: `${f.mileText}, porque una milla son 1,609344 km.` },
      { q: `¿Y una vuelta a la pista?`, a: `${f.lapText} para 400 m.` },
    ],
    f => [
      { q: `Que maratona sai a ${f.label} por km?`, a: `${f.finishes[3].text}. A meia fica em ${f.finishes[2].text}, o 10K em ${f.finishes[1].text} e o 5K em ${f.finishes[0].text}.` },
      { q: `Quantos km/h são ${f.label} por km?`, a: `${f.kmh} km/h, ou ${f.ms} metros por segundo.` },
      { q: `E por milha?`, a: `${f.mileText}, porque uma milha tem 1,609344 km.` },
      { q: `E uma volta na pista?`, a: `${f.lapText} para 400 m.` },
    ],
    f => [
      { q: `${f.label}ペースでフルを走ると何時間ですか？`, a: `${f.finishes[3].text}です。ハーフは${f.finishes[2].text}、10Kは${f.finishes[1].text}、5Kは${f.finishes[0].text}です。` },
      { q: `${f.label}ペースは時速何kmですか？`, a: `${f.kmh}km/h、秒速では${f.ms}mです。` },
      { q: `マイルでは？`, a: `1マイル${f.mileText}です。1マイルが1.609344kmだからです。` },
      { q: `トラック1周は？`, a: `400mで${f.lapText}です。` },
    ],
    f => [
      { q: `Welche Marathonzeit ergibt ${f.label} pro km?`, a: `${f.finishes[3].text}. Der Halbmarathon liegt bei ${f.finishes[2].text}, die 10K bei ${f.finishes[1].text}, die 5K bei ${f.finishes[0].text}.` },
      { q: `Wie viel km/h sind ${f.label} pro km?`, a: `${f.kmh} km/h beziehungsweise ${f.ms} Meter pro Sekunde.` },
      { q: `Und pro Meile?`, a: `${f.mileText}, denn eine Meile misst 1,609344 km.` },
      { q: `Und eine Bahnrunde?`, a: `${f.lapText} für 400 m.` },
    ],
    f => [
      { q: `Quel temps au marathon avec ${f.label} au km ?`, a: `${f.finishes[3].text}. Le semi tombe à ${f.finishes[2].text}, le 10 km à ${f.finishes[1].text} et le 5 km à ${f.finishes[0].text}.` },
      { q: `Combien de km/h font ${f.label} au km ?`, a: `${f.kmh} km/h, soit ${f.ms} mètres par seconde.` },
      { q: `Et au mile ?`, a: `${f.mileText}, puisqu’un mile vaut 1,609344 km.` },
      { q: `Et un tour de piste ?`, a: `${f.lapText} pour 400 m.` },
    ],
    f => [
      { q: `${f.label} पेस पर फ़ुल मैराथन कितने समय में?`, a: `${f.finishes[3].text}। हाफ़ ${f.finishes[2].text}, 10K ${f.finishes[1].text} और 5K ${f.finishes[0].text}।` },
      { q: `${f.label} पेस कितने किमी/घंटा है?`, a: `${f.kmh} किमी/घंटा, यानी ${f.ms} मीटर प्रति सेकंड।` },
      { q: `प्रति माइल कितना?`, a: `${f.mileText}, क्योंकि एक माइल 1.609344 किमी होता है।` },
      { q: `और ट्रैक का एक चक्कर?`, a: `400 मीटर में ${f.lapText}।` },
    ],
    f => [
      { q: `${f.label} 配速跑全马要多久？`, a: `${f.finishes[3].text}。半马 ${f.finishes[2].text}，10K ${f.finishes[1].text}，5K ${f.finishes[0].text}。` },
      { q: `${f.label} 配速是时速多少？`, a: `${f.kmh} 公里/小时，也就是秒速 ${f.ms} 米。` },
      { q: `换成每英里呢？`, a: `${f.mileText}，因为一英里是 1.609344 公里。` },
      { q: `跑道一圈呢？`, a: `400 米用时 ${f.lapText}。` },
    ],
    f => [
      { q: `${f.label} 配速跑全馬要多久？`, a: `${f.finishes[3].text}。半馬 ${f.finishes[2].text}，10K ${f.finishes[1].text}，5K ${f.finishes[0].text}。` },
      { q: `${f.label} 配速是時速多少？`, a: `${f.kmh} 公里/小時，也就是秒速 ${f.ms} 公尺。` },
      { q: `換成每英里呢？`, a: `${f.mileText}，因為一英里是 1.609344 公里。` },
      { q: `跑道一圈呢？`, a: `400 公尺用時 ${f.lapText}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const PACE_UI: L<PaceUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<PaceUI>;
