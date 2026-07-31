/**
 * 주파수 화면의 문구 — 열 언어.
 *
 * 113가지 × 8언어를 손으로 쓸 수 없다. 주파수마다 다른 것은 숫자와 쓰임뿐이므로
 * 문장 틀을 한 벌 두고 계산된 값을 끼워 넣는다.
 *
 * 항목마다 열 언어를 나란히 적는다. 한 언어씩 통째로 적으면 어느 항목이
 * 빠졌는지 눈으로 못 찾는데, 이렇게 두면 열 칸 중 빈 칸이 바로 보인다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { FreqRange, FreqTag } from './freqs.ts';
import type { FreqFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface SoundUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  rangeLabel: Record<FreqRange, string>;
  tagLabel: Record<FreqTag, string>;
  /** 갈래마다 한 줄 설명 — 이 주파수를 왜 찾는지는 계산으로 안 나온다 */
  tagNote: Record<FreqTag, string>;
  play: string;
  stop: string;
  volume: string;
  safety: string;
  noAudio: string;
  wavelength: string;
  period: string;
  note: string;
  cents: string;
  audible: string;
  audibleYes: string;
  audibleNo: string;
  harmonics: string;
  octaveDown: string;
  octaveUp: string;
  centsLabel: (n: number) => string;
  onPitchLabel: string;
  nearbyTitle: string;
  nearbyNote: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (hz: number) => string;
  metaDesc: (f: FreqFacts) => string;
  hubFaq: FaqItem[];
  freqFaq: (f: FreqFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof SoundUI]: L<SoundUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('주파수', 'Frequencies', 'Frecuencias', 'Frequências', '周波数', 'Frequenzen', 'Fréquences', 'फ़्रीक्वेंसी', '频率', '頻率'),

  hubTitle: T(
    '주파수 113가지 소리 듣기',
    'Listen to 113 frequencies',
    'Escucha 113 frecuencias',
    'Ouça 113 frequências',
    '113の周波数を聴く',
    '113 Frequenzen anhören',
    'Écouter 113 fréquences',
    '113 फ़्रीक्वेंसी सुनें',
    '听听这 113 种频率',
    '聽聽這 113 種頻率',
  ),

  hubLead: T(
    '20Hz부터 24kHz까지, 주파수를 골라 바로 들어 보세요. 파장과 주기, 가장 가까운 음이름까지 함께 계산해 보여 줍니다.',
    'From 20 Hz to 24 kHz — pick a frequency and hear it right away, with its wavelength, period and nearest musical note worked out for you.',
    'De 20 Hz a 24 kHz: elige una frecuencia y escúchala al instante, con su longitud de onda, su periodo y la nota musical más cercana ya calculados.',
    'De 20 Hz a 24 kHz: escolha uma frequência e ouça na hora, com comprimento de onda, período e a nota musical mais próxima já calculados.',
    '20Hzから24kHzまで、周波数を選んですぐに聴けます。波長と周期、いちばん近い音名まで計算して表示します。',
    'Von 20 Hz bis 24 kHz — Frequenz wählen und sofort hören, samt Wellenlänge, Periode und nächstgelegenem Notennamen.',
    "De 20 Hz à 24 kHz : choisissez une fréquence et écoutez-la aussitôt, avec sa longueur d'onde, sa période et la note la plus proche déjà calculées.",
    '20Hz से 24kHz तक — फ़्रीक्वेंसी चुनें और तुरंत सुनें, साथ में तरंगदैर्ध्य, आवर्तकाल और सबसे नज़दीकी संगीत स्वर की गणना भी।',
    '从 20Hz 到 24kHz，选一个频率就能马上听。波长、周期和最接近的音名，也一并算好给你。',
    '從 20Hz 到 24kHz，選一個頻率就能馬上聽。波長、週期和最接近的音名，也一併算好給你。',
  ),

  rangeLabel: T(
    { sub: '초저주파 (20Hz 미만)', low: '저음 (20~250Hz)', mid: '중음 (250Hz~4kHz)', high: '고음 (4~20kHz)', ultra: '초음파 (20kHz 초과)' },
    { sub: 'Infrasound (below 20 Hz)', low: 'Bass (20–250 Hz)', mid: 'Midrange (250 Hz–4 kHz)', high: 'Treble (4–20 kHz)', ultra: 'Ultrasound (above 20 kHz)' },
    { sub: 'Infrasonido (menos de 20 Hz)', low: 'Graves (20–250 Hz)', mid: 'Medios (250 Hz–4 kHz)', high: 'Agudos (4–20 kHz)', ultra: 'Ultrasonido (más de 20 kHz)' },
    { sub: 'Infrassom (abaixo de 20 Hz)', low: 'Graves (20–250 Hz)', mid: 'Médios (250 Hz–4 kHz)', high: 'Agudos (4–20 kHz)', ultra: 'Ultrassom (acima de 20 kHz)' },
    { sub: '超低周波（20Hz未満）', low: '低音（20〜250Hz）', mid: '中音（250Hz〜4kHz）', high: '高音（4〜20kHz）', ultra: '超音波（20kHz超）' },
    { sub: 'Infraschall (unter 20 Hz)', low: 'Bass (20–250 Hz)', mid: 'Mitten (250 Hz–4 kHz)', high: 'Höhen (4–20 kHz)', ultra: 'Ultraschall (über 20 kHz)' },
    { sub: 'Infrasons (moins de 20 Hz)', low: 'Graves (20–250 Hz)', mid: 'Médiums (250 Hz–4 kHz)', high: 'Aigus (4–20 kHz)', ultra: 'Ultrasons (plus de 20 kHz)' },
    { sub: 'इन्फ़्रासाउंड (20 Hz से नीचे)', low: 'बास (20–250 Hz)', mid: 'मिडरेंज (250 Hz–4 kHz)', high: 'ट्रेबल (4–20 kHz)', ultra: 'अल्ट्रासाउंड (20 kHz से ऊपर)' },
    { sub: '次声（低于 20Hz）', low: '低频（20~250Hz）', mid: '中频（250Hz~4kHz）', high: '高频（4~20kHz）', ultra: '超声（高于 20kHz）' },
    { sub: '次聲（低於 20Hz）', low: '低頻（20~250Hz）', mid: '中頻（250Hz~4kHz）', high: '高頻（4~20kHz）', ultra: '超聲（高於 20kHz）' },
  ),

  tagLabel: T(
    { band: '표준 대역', audiometry: '청력 검사', pitch: '조율 기준', note: '음이름', mains: '전원 잡음', dtmf: '전화 버튼음', mosquito: '모기 소리', solfeggio: '솔페지오', subsonic: '초저주파', ultrasonic: '초음파', round: '자주 찾는 값' },
    { band: 'Standard band', audiometry: 'Hearing test', pitch: 'Tuning pitch', note: 'Musical note', mains: 'Mains hum', dtmf: 'Phone keypad', mosquito: 'Mosquito tone', solfeggio: 'Solfeggio', subsonic: 'Infrasound', ultrasonic: 'Ultrasound', round: 'Common value' },
    { band: 'Banda estándar', audiometry: 'Audiometría', pitch: 'Diapasón', note: 'Nota musical', mains: 'Zumbido de red', dtmf: 'Teclado telefónico', mosquito: 'Tono mosquito', solfeggio: 'Solfeggio', subsonic: 'Infrasonido', ultrasonic: 'Ultrasonido', round: 'Valor habitual' },
    { band: 'Banda padrão', audiometry: 'Audiometria', pitch: 'Diapasão', note: 'Nota musical', mains: 'Zumbido da rede', dtmf: 'Teclado telefônico', mosquito: 'Tom mosquito', solfeggio: 'Solfeggio', subsonic: 'Infrassom', ultrasonic: 'Ultrassom', round: 'Valor comum' },
    { band: '標準帯域', audiometry: '聴力検査', pitch: '調律基準', note: '音名', mains: '電源ハム', dtmf: '電話のボタン音', mosquito: 'モスキート音', solfeggio: 'ソルフェジオ', subsonic: '超低周波', ultrasonic: '超音波', round: 'よく使う値' },
    { band: 'Normband', audiometry: 'Hörtest', pitch: 'Stimmton', note: 'Notenname', mains: 'Netzbrummen', dtmf: 'Telefontastatur', mosquito: 'Mückenton', solfeggio: 'Solfeggio', subsonic: 'Infraschall', ultrasonic: 'Ultraschall', round: 'Gängiger Wert' },
    { band: 'Bande normalisée', audiometry: 'Test auditif', pitch: 'Diapason', note: 'Note de musique', mains: 'Ronflement secteur', dtmf: 'Clavier téléphonique', mosquito: 'Son moustique', solfeggio: 'Solfeggio', subsonic: 'Infrasons', ultrasonic: 'Ultrasons', round: 'Valeur courante' },
    { band: 'मानक बैंड', audiometry: 'श्रवण जाँच', pitch: 'ट्यूनिंग मानक', note: 'संगीत स्वर', mains: 'बिजली की भनभनाहट', dtmf: 'फ़ोन कीपैड', mosquito: 'मॉस्किटो टोन', solfeggio: 'सोल्फ़ेजियो', subsonic: 'इन्फ़्रासाउंड', ultrasonic: 'अल्ट्रासाउंड', round: 'आम मान' },
    { band: '标准频带', audiometry: '听力检查', pitch: '调音基准', note: '音名', mains: '电源噪声', dtmf: '电话按键音', mosquito: '蚊音', solfeggio: '索尔菲吉欧', subsonic: '次声', ultrasonic: '超声', round: '常查的值' },
    { band: '標準頻帶', audiometry: '聽力檢查', pitch: '調音基準', note: '音名', mains: '電源雜訊', dtmf: '電話按鍵音', mosquito: '蚊音', solfeggio: '索爾菲吉歐', subsonic: '次聲', ultrasonic: '超聲', round: '常查的值' },
  ),

  tagNote: T(
    {
      band: '소음을 재고 스피커를 다룰 때 쓰는 1/3 옥타브 표준 대역의 중심 주파수입니다.',
      audiometry: '병원에서 청력을 잴 때 실제로 들려주는 주파수입니다. 이 대역이 사람 말소리와 겹칩니다.',
      pitch: '악기를 맞출 때 기준으로 삼는 음입니다.',
      note: '건반 위에 이름이 붙어 있는 음입니다.',
      mains: '전기가 흐르는 곳에서 새어 나오는 잡음입니다. 나라마다 50Hz나 60Hz이고, 그 두 배음도 함께 들립니다.',
      dtmf: '전화 버튼을 누를 때 나는 소리입니다. 가로 네 줄과 세로 네 줄이 격자를 이뤄 두 음이 겹쳐 납니다.',
      mosquito: '나이가 들면 먼저 안 들리는 높은 소리입니다. 스무 살에는 들리다가 마흔이 넘으면 대개 사라집니다.',
      solfeggio: '"치유 주파수"라며 널리 퍼진 값입니다. 그런 효과를 뒷받침하는 근거는 없지만, 찾는 사람이 많아 함께 실었습니다.',
      subsonic: '귀로는 못 듣고 몸으로 느끼는 저음입니다. 스피커도 이 아래는 거의 못 냅니다.',
      ultrasonic: '사람 가청 범위 위쪽이라 들리지 않습니다. 기기와 동물은 반응할 수 있습니다.',
      round: '검색과 시험에서 자주 쓰이는 값입니다.',
    },
    {
      band: 'A centre frequency of the standard one-third-octave bands used in noise measurement and speaker work.',
      audiometry: 'A frequency actually played during a clinical hearing test. This band overlaps the range of human speech.',
      pitch: 'A reference note used to tune instruments.',
      note: 'A note that has a name on the keyboard.',
      mains: 'Hum that leaks from anything running on mains power — 50 Hz or 60 Hz depending on the country, plus its harmonics.',
      dtmf: 'The sound a phone key makes. Four row tones and four column tones form a grid, and each key sounds two of them at once.',
      mosquito: 'A high tone that fades with age. Most twenty-year-olds hear it; by forty, most people no longer do.',
      solfeggio: 'A number widely circulated as a "healing frequency". No evidence supports that claim, but it is searched for often enough to list here.',
      subsonic: 'Bass you feel rather than hear. Most speakers can barely produce anything below this.',
      ultrasonic: 'Above the human hearing range, so you will not hear it. Devices and animals may still respond.',
      round: 'A value that comes up often in searches and tests.',
    },
    {
      band: 'Frecuencia central de las bandas normalizadas de un tercio de octava que se usan al medir ruido y ajustar altavoces.',
      audiometry: 'Frecuencia que se reproduce de verdad en una prueba de audición. Esta banda coincide con la voz humana.',
      pitch: 'Nota de referencia para afinar instrumentos.',
      note: 'Una nota con nombre propio en el teclado.',
      mains: 'Zumbido que se cuela desde cualquier aparato conectado a la red: 50 Hz o 60 Hz según el país, más sus armónicos.',
      dtmf: 'El sonido de una tecla del teléfono. Cuatro tonos de fila y cuatro de columna forman una rejilla, y cada tecla suena dos a la vez.',
      mosquito: 'Un tono agudo que se pierde con la edad. Casi todos lo oyen a los veinte; a los cuarenta, casi nadie.',
      solfeggio: 'Un número muy difundido como "frecuencia sanadora". No hay pruebas que lo respalden, pero se busca lo bastante como para incluirlo.',
      subsonic: 'Graves que se sienten más que se oyen. Pocos altavoces bajan de aquí.',
      ultrasonic: 'Por encima del oído humano, así que no se escucha. Los aparatos y los animales sí pueden reaccionar.',
      round: 'Un valor que aparece a menudo en búsquedas y pruebas.',
    },
    {
      band: 'Frequência central das bandas padronizadas de um terço de oitava usadas em medição de ruído e ajuste de caixas de som.',
      audiometry: 'Frequência realmente tocada num exame de audição. Essa faixa coincide com a fala humana.',
      pitch: 'Nota de referência para afinar instrumentos.',
      note: 'Uma nota com nome próprio no teclado.',
      mains: 'Zumbido que escapa de qualquer aparelho ligado à rede elétrica: 50 Hz ou 60 Hz conforme o país, mais os harmônicos.',
      dtmf: 'O som de uma tecla do telefone. Quatro tons de linha e quatro de coluna formam uma grade, e cada tecla toca dois de uma vez.',
      mosquito: 'Um tom agudo que some com a idade. Quase todo mundo ouve aos vinte; aos quarenta, quase ninguém.',
      solfeggio: 'Um número muito divulgado como "frequência curativa". Não há evidência que sustente isso, mas é procurado o bastante para entrar na lista.',
      subsonic: 'Graves que se sentem mais do que se ouvem. Poucas caixas descem até aqui.',
      ultrasonic: 'Acima da audição humana, então você não escuta. Aparelhos e animais ainda podem reagir.',
      round: 'Um valor que aparece muito em buscas e testes.',
    },
    {
      band: '騒音測定やスピーカー調整で使う1/3オクターブ標準帯域の中心周波数です。',
      audiometry: '聴力検査で実際に鳴らす周波数です。この帯域は人の話し声と重なります。',
      pitch: '楽器を合わせるときの基準音です。',
      note: '鍵盤の上に名前がついている音です。',
      mains: '電源につながった機器から漏れる雑音です。国によって50Hzか60Hzで、その倍音も一緒に鳴ります。',
      dtmf: '電話のボタンを押したときの音です。横四本と縦四本が格子をつくり、一つのボタンで二つの音が同時に鳴ります。',
      mosquito: '歳をとると先に聞こえなくなる高い音です。二十代では聞こえても、四十を過ぎるとたいてい消えます。',
      solfeggio: '「癒やしの周波数」として広まった値です。裏づけとなる根拠はありませんが、探す人が多いので載せています。',
      subsonic: '耳ではなく体で感じる低音です。スピーカーもこれより下はほとんど出せません。',
      ultrasonic: '人の可聴域より上なので聞こえません。機器や動物は反応することがあります。',
      round: '検索や試験でよく使われる値です。',
    },
    {
      band: 'Mittenfrequenz der genormten Terzbänder, die man bei Lärmmessung und Lautsprecherarbeit verwendet.',
      audiometry: 'Eine Frequenz, die beim Hörtest tatsächlich vorgespielt wird. Dieser Bereich überschneidet sich mit der menschlichen Sprache.',
      pitch: 'Ein Referenzton zum Stimmen von Instrumenten.',
      note: 'Ein Ton, der auf der Klaviatur einen Namen trägt.',
      mains: 'Brummen, das aus allem dringt, was am Stromnetz hängt — je nach Land 50 Hz oder 60 Hz, dazu die Oberwellen.',
      dtmf: 'Der Ton einer Telefontaste. Vier Zeilen- und vier Spaltentöne bilden ein Raster; jede Taste erklingt als zwei Töne zugleich.',
      mosquito: 'Ein hoher Ton, der mit dem Alter verschwindet. Mit zwanzig hören ihn die meisten, mit vierzig kaum noch jemand.',
      solfeggio: 'Eine Zahl, die als „Heilfrequenz" kursiert. Belege dafür gibt es nicht, gesucht wird sie trotzdem oft genug für diese Liste.',
      subsonic: 'Bass, den man eher spürt als hört. Kaum ein Lautsprecher reicht so tief.',
      ultrasonic: 'Oberhalb des menschlichen Hörbereichs, also unhörbar. Geräte und Tiere können trotzdem reagieren.',
      round: 'Ein Wert, der in Suchen und Tests häufig auftaucht.',
    },
    {
      band: "Fréquence centrale des bandes normalisées de tiers d'octave utilisées en mesure de bruit et en réglage d'enceintes.",
      audiometry: "Une fréquence réellement diffusée lors d'un test auditif. Cette bande recouvre la voix humaine.",
      pitch: 'Une note de référence pour accorder les instruments.',
      note: 'Une note qui porte un nom sur le clavier.',
      mains: "Ronflement qui s'échappe de tout appareil branché sur le secteur : 50 Hz ou 60 Hz selon le pays, plus ses harmoniques.",
      dtmf: "Le son d'une touche de téléphone. Quatre tons de ligne et quatre de colonne forment une grille, et chaque touche en fait sonner deux à la fois.",
      mosquito: "Un son aigu qui disparaît avec l'âge. À vingt ans presque tout le monde l'entend ; à quarante, presque plus personne.",
      solfeggio: "Un nombre largement diffusé comme « fréquence de guérison ». Rien ne l'étaye, mais il est assez recherché pour figurer ici.",
      subsonic: "Des graves que l'on ressent plus qu'on ne les entend. Peu d'enceintes descendent aussi bas.",
      ultrasonic: "Au-dessus de l'audition humaine, donc inaudible. Les appareils et les animaux peuvent réagir.",
      round: 'Une valeur qui revient souvent dans les recherches et les tests.',
    },
    {
      band: 'शोर मापने और स्पीकर सेट करने में इस्तेमाल होने वाले मानक एक-तिहाई ऑक्टेव बैंड की केंद्रीय फ़्रीक्वेंसी।',
      audiometry: 'श्रवण जाँच में असल में बजाई जाने वाली फ़्रीक्वेंसी। यह बैंड मानव आवाज़ की सीमा से मेल खाता है।',
      pitch: 'वाद्ययंत्र मिलाने के लिए मानक स्वर।',
      note: 'कीबोर्ड पर जिसका अपना नाम है, ऐसा स्वर।',
      mains: 'बिजली से चलने वाले उपकरणों से रिसने वाली भनभनाहट — देश के हिसाब से 50 Hz या 60 Hz, साथ में इसके हार्मोनिक भी।',
      dtmf: 'फ़ोन का बटन दबाने पर आने वाली आवाज़। चार पंक्ति-स्वर और चार स्तंभ-स्वर मिलकर जाली बनाते हैं, और हर बटन पर दो एक साथ बजते हैं।',
      mosquito: 'ऊँची आवाज़ जो उम्र के साथ सुनाई देना बंद हो जाती है। बीस की उम्र में ज़्यादातर लोग सुनते हैं, चालीस के बाद लगभग कोई नहीं।',
      solfeggio: '"उपचार फ़्रीक्वेंसी" के नाम से फैला हुआ मान। इसका कोई प्रमाण नहीं है, पर इसे इतना खोजा जाता है कि यहाँ शामिल किया गया है।',
      subsonic: 'ऐसा बास जो सुनाई कम, महसूस ज़्यादा होता है। इससे नीचे बहुत कम स्पीकर जा पाते हैं।',
      ultrasonic: 'मानव श्रवण सीमा से ऊपर, इसलिए सुनाई नहीं देगा। उपकरण और जानवर फिर भी प्रतिक्रिया दे सकते हैं।',
      round: 'खोज और परीक्षण में अक्सर आने वाला मान।',
    },
    {
      band: '量噪声、调音箱时用的 1/3 倍频程标准频带的中心频率。',
      audiometry: '医院查听力时真正放给你听的频率。这一段正好和人说话的声音重叠。',
      pitch: '调乐器时拿来当基准的音。',
      note: '键盘上有名字的那些音。',
      mains: '通电的地方漏出来的噪声。各国是 50Hz 或 60Hz，它的倍频也一起听得到。',
      dtmf: '按电话键时发出的声音。四横四竖组成一张格子，每次响的是两个音叠在一起。',
      mosquito: '上了年纪之后最先听不到的高音。二十岁时听得见，过了四十大多就没了。',
      solfeggio: '被说成「疗愈频率」而流传很广的一组值。这种效果没有依据，但查的人多，就一并收了进来。',
      subsonic: '耳朵听不见、身体却感觉得到的低音。音箱在这以下也几乎发不出声。',
      ultrasonic: '在人耳可听范围之上，所以听不见。仪器和动物则可能有反应。',
      round: '搜索和考试里常用到的值。',
    },
    {
      band: '量噪音、調音箱時用的 1/3 倍頻程標準頻帶的中心頻率。',
      audiometry: '醫院查聽力時真正放給你聽的頻率。這一段正好和人說話的聲音重疊。',
      pitch: '調樂器時拿來當基準的音。',
      note: '鍵盤上有名字的那些音。',
      mains: '通電的地方漏出來的雜訊。各國是 50Hz 或 60Hz，它的倍頻也一起聽得到。',
      dtmf: '按電話鍵時發出的聲音。四橫四直組成一張格子，每次響的是兩個音疊在一起。',
      mosquito: '上了年紀之後最先聽不到的高音。二十歲時聽得見，過了四十大多就沒了。',
      solfeggio: '被說成「療癒頻率」而流傳很廣的一組值。這種效果沒有依據，但查的人多，就一併收了進來。',
      subsonic: '耳朵聽不見、身體卻感覺得到的低音。喇叭在這以下也幾乎發不出聲。',
      ultrasonic: '在人耳可聽範圍之上，所以聽不見。儀器和動物則可能有反應。',
      round: '搜尋和考試裡常用到的值。',
    },
  ),

  play: T('재생', 'Play', 'Reproducir', 'Tocar', '再生', 'Abspielen', 'Écouter', 'चलाएँ', '播放', '播放'),
  stop: T('정지', 'Stop', 'Detener', 'Parar', '停止', 'Stopp', 'Arrêter', 'रोकें', '停止', '停止'),
  volume: T('음량', 'Volume', 'Volumen', 'Volume', '音量', 'Lautstärke', 'Volume', 'आवाज़', '音量', '音量'),

  safety: T(
    '음량을 낮춘 뒤 재생하세요. 순음은 같은 크기라도 귀에 부담이 큽니다.',
    'Turn the volume down before you play. A pure tone is harder on the ears than music at the same level.',
    'Baja el volumen antes de reproducir. Un tono puro cansa más el oído que la música al mismo nivel.',
    'Abaixe o volume antes de tocar. Um tom puro cansa mais o ouvido que música no mesmo nível.',
    '音量を下げてから再生してください。純音は同じ大きさでも耳への負担が大きくなります。',
    'Erst die Lautstärke senken. Ein reiner Ton belastet die Ohren stärker als Musik bei gleichem Pegel.',
    "Baissez le volume avant d'écouter. Un son pur fatigue plus l'oreille que de la musique au même niveau.",
    'चलाने से पहले आवाज़ कम कर लें। शुद्ध स्वर उसी स्तर के संगीत से कहीं ज़्यादा कान पर पड़ता है।',
    '请先把音量调低再播放。同样的响度下，纯音对耳朵的负担比音乐大得多。',
    '請先把音量調低再播放。同樣的響度下，純音對耳朵的負擔比音樂大得多。',
  ),

  noAudio: T(
    '이 브라우저는 소리를 만들 수 없습니다.',
    'This browser cannot generate sound.',
    'Este navegador no puede generar sonido.',
    'Este navegador não consegue gerar som.',
    'このブラウザーでは音を出せません。',
    'Dieser Browser kann keinen Ton erzeugen.',
    'Ce navigateur ne peut pas générer de son.',
    'यह ब्राउज़र ध्वनि नहीं बना सकता।',
    '这个浏览器发不出声音。',
    '這個瀏覽器發不出聲音。',
  ),

  wavelength: T('파장', 'Wavelength', 'Longitud de onda', 'Comprimento de onda', '波長', 'Wellenlänge', "Longueur d'onde", 'तरंगदैर्ध्य', '波长', '波長'),
  period: T('주기', 'Period', 'Periodo', 'Período', '周期', 'Periode', 'Période', 'आवर्तकाल', '周期', '週期'),
  note: T('가장 가까운 음', 'Nearest note', 'Nota más cercana', 'Nota mais próxima', 'いちばん近い音', 'Nächster Ton', 'Note la plus proche', 'सबसे नज़दीकी स्वर', '最接近的音', '最接近的音'),
  cents: T('음 차이', 'Off by', 'Diferencia', 'Diferença', '音のずれ', 'Abweichung', 'Écart', 'अंतर', '相差', '相差'),
  audible: T('가청 여부', 'Audible', 'Audible', 'Audível', '可聴', 'Hörbar', 'Audible', 'सुनाई देता है', '能否听到', '能否聽到'),
  audibleYes: T('들림', 'Yes', 'Sí', 'Sim', 'はい', 'Ja', 'Oui', 'हाँ', '听得到', '聽得到'),
  audibleNo: T('안 들림', 'No', 'No', 'Não', 'いいえ', 'Nein', 'Non', 'नहीं', '听不到', '聽不到'),
  harmonics: T('배음', 'Harmonics', 'Armónicos', 'Harmônicos', '倍音', 'Oberwellen', 'Harmoniques', 'हार्मोनिक', '泛音', '泛音'),
  octaveDown: T('한 옥타브 아래', 'One octave down', 'Una octava abajo', 'Uma oitava abaixo', '1オクターブ下', 'Eine Oktave tiefer', 'Une octave plus bas', 'एक ऑक्टेव नीचे', '低八度', '低八度'),
  octaveUp: T('한 옥타브 위', 'One octave up', 'Una octava arriba', 'Uma oitava acima', '1オクターブ上', 'Eine Oktave höher', 'Une octave plus haut', 'एक ऑक्टेव ऊपर', '高八度', '高八度'),

  centsLabel: T(
    (n: number) => `${n > 0 ? '+' : ''}${n}센트`,
    (n: number) => `${n > 0 ? '+' : ''}${n} cents`,
    (n: number) => `${n > 0 ? '+' : ''}${n} centésimas`,
    (n: number) => `${n > 0 ? '+' : ''}${n} cents`,
    (n: number) => `${n > 0 ? '+' : ''}${n}セント`,
    (n: number) => `${n > 0 ? '+' : ''}${n} Cent`,
    (n: number) => `${n > 0 ? '+' : ''}${n} cents`,
    (n: number) => `${n > 0 ? '+' : ''}${n} सेंट`,
    (n: number) => `${n > 0 ? '+' : ''}${n} 音分`,
    (n: number) => `${n > 0 ? '+' : ''}${n} 音分`,
  ),

  onPitchLabel: T('딱 맞음', 'In tune', 'Afinado', 'Afinado', 'ぴったり', 'Genau', 'Juste', 'सटीक', '正好对上', '正好對上'),

  nearbyTitle: T('가까운 주파수', 'Nearby frequencies', 'Frecuencias cercanas', 'Frequências próximas', '近い周波数', 'Nahe Frequenzen', 'Fréquences proches', 'नज़दीकी फ़्रीक्वेंसी', '相近的频率', '相近的頻率'),
  nearbyNote: T(
    '주파수는 배로 올라가야 한 옥타브입니다. 그래서 가까운 정도도 뺄셈이 아니라 몇 배인지로 잽니다.',
    'Frequency doubles for every octave, so closeness is measured in ratios, not differences.',
    'La frecuencia se duplica en cada octava, así que la cercanía se mide en proporciones, no en restas.',
    'A frequência dobra a cada oitava, então a proximidade se mede em proporções, não em subtrações.',
    '周波数は倍になって1オクターブです。だから近さも引き算ではなく何倍かで測ります。',
    'Die Frequenz verdoppelt sich pro Oktave, Nähe misst man daher als Verhältnis, nicht als Differenz.',
    "La fréquence double à chaque octave : la proximité se mesure donc en rapports, pas en différences.",
    'हर ऑक्टेव पर फ़्रीक्वेंसी दोगुनी होती है, इसलिए नज़दीकी अंतर से नहीं, अनुपात से नापी जाती है।',
    '频率要翻一倍才是一个八度。所以远近也不是用减法算，而是看差几倍。',
    '頻率要翻一倍才是一個八度。所以遠近也不是用減法算，而是看差幾倍。',
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这些数字', '怎麼看這些數字'),

  how: T(
    [
      '헤르츠는 1초에 공기가 몇 번 떨리는지입니다. 숫자가 클수록 높은 소리로 들립니다.',
      '파장은 소리 속도(20°C에서 초속 343m)를 주파수로 나눈 값입니다. 20Hz는 17미터, 20kHz는 1.7센티라 천 배 넘게 차이 납니다.',
      '사람은 대개 20Hz에서 20kHz까지 듣지만, 위쪽 한계는 나이가 들수록 내려갑니다. 그래서 15kHz가 넘어가면 들리는 사람과 안 들리는 사람이 갈립니다.',
      '들리지 않는다고 기기가 고장 난 것은 아닙니다. 작은 스피커는 저음을 못 내고, 고음은 귀가 먼저 못 따라갑니다.',
    ],
    [
      'Hertz counts how many times the air vibrates per second. The bigger the number, the higher the pitch.',
      'Wavelength is the speed of sound (343 m/s at 20 °C) divided by the frequency. That makes 20 Hz seventeen metres long and 20 kHz under two centimetres.',
      'People hear roughly 20 Hz to 20 kHz, but the upper limit drops with age. Past about 15 kHz, some hear the tone and some do not.',
      'Hearing nothing does not mean the equipment is broken. Small speakers cannot reach the low notes, and for the high ones it is the ear that gives up first.',
    ],
    [
      'El hercio cuenta cuántas veces vibra el aire por segundo. Cuanto mayor es el número, más agudo suena.',
      'La longitud de onda es la velocidad del sonido (343 m/s a 20 °C) dividida por la frecuencia: 20 Hz mide diecisiete metros y 20 kHz menos de dos centímetros.',
      'Se oye aproximadamente de 20 Hz a 20 kHz, pero el límite superior baja con la edad. Pasados los 15 kHz, unos lo oyen y otros no.',
      'No oír nada no significa que el equipo falle. Los altavoces pequeños no llegan a los graves, y en los agudos es el oído el que se rinde antes.',
    ],
    [
      'O hertz conta quantas vezes o ar vibra por segundo. Quanto maior o número, mais agudo o som.',
      'O comprimento de onda é a velocidade do som (343 m/s a 20 °C) dividida pela frequência: 20 Hz dá dezessete metros e 20 kHz menos de dois centímetros.',
      'Ouvimos mais ou menos de 20 Hz a 20 kHz, mas o limite de cima cai com a idade. Passando de 15 kHz, uns escutam e outros não.',
      'Não ouvir nada não quer dizer que o equipamento esteja com defeito. Caixas pequenas não alcançam os graves, e nos agudos é o ouvido que desiste primeiro.',
    ],
    [
      'ヘルツは1秒間に空気が何回震えるかです。数が大きいほど高い音に聞こえます。',
      '波長は音速（20°Cで秒速343m）を周波数で割った値です。20Hzは17メートル、20kHzは2センチ足らずと千倍以上違います。',
      '人はおおむね20Hzから20kHzまで聞こえますが、上の限界は歳とともに下がります。15kHzを超えると聞こえる人と聞こえない人に分かれます。',
      '聞こえなくても機器の故障とはかぎりません。小さなスピーカーは低音を出せず、高音では耳のほうが先に追いつけなくなります。',
    ],
    [
      'Hertz zählt, wie oft die Luft pro Sekunde schwingt. Je größer die Zahl, desto höher der Ton.',
      'Die Wellenlänge ist die Schallgeschwindigkeit (343 m/s bei 20 °C) geteilt durch die Frequenz: 20 Hz sind siebzehn Meter, 20 kHz keine zwei Zentimeter.',
      'Der Mensch hört etwa 20 Hz bis 20 kHz, doch die obere Grenze sinkt mit dem Alter. Ab rund 15 kHz hören ihn die einen, die anderen nicht mehr.',
      'Nichts zu hören heißt nicht, dass das Gerät defekt ist. Kleine Lautsprecher schaffen die Tiefen nicht, und oben gibt zuerst das Ohr auf.',
    ],
    [
      "Le hertz compte combien de fois l'air vibre par seconde. Plus le nombre est grand, plus le son est aigu.",
      "La longueur d'onde, c'est la vitesse du son (343 m/s à 20 °C) divisée par la fréquence : 20 Hz font dix-sept mètres, 20 kHz moins de deux centimètres.",
      "On entend en gros de 20 Hz à 20 kHz, mais la limite haute baisse avec l'âge. Au-delà de 15 kHz, certains entendent, d'autres non.",
      "Ne rien entendre ne veut pas dire que le matériel est en panne. Les petites enceintes ne descendent pas dans les graves, et dans les aigus c'est l'oreille qui lâche la première.",
    ],
    [
      'हर्ट्ज़ बताता है कि हवा एक सेकंड में कितनी बार कंपित होती है। संख्या जितनी बड़ी, आवाज़ उतनी ऊँची।',
      'तरंगदैर्ध्य ध्वनि की गति (20 °C पर 343 मी/से) को फ़्रीक्वेंसी से भाग देने पर मिलती है: 20 Hz सत्रह मीटर लंबी और 20 kHz दो सेंटीमीटर से भी कम।',
      'इंसान करीब 20 Hz से 20 kHz तक सुनता है, पर ऊपरी सीमा उम्र के साथ गिरती है। 15 kHz के बाद किसी को सुनाई देता है, किसी को नहीं।',
      'कुछ सुनाई न देने का मतलब उपकरण खराब होना नहीं है। छोटे स्पीकर नीचे के स्वर नहीं बना पाते, और ऊपर के स्वरों में कान पहले हार मानता है।',
    ],
    [
      '赫兹说的是空气一秒钟抖多少次。数字越大，听起来越高。',
      '波长是声速（20°C 时每秒 343 米）除以频率。20Hz 是 17 米，20kHz 只有 1.7 厘米，差了一千多倍。',
      '人一般能听到 20Hz 到 20kHz，但上限会随年龄往下掉。所以过了 15kHz，就开始有人听得见、有人听不见。',
      '听不到不代表设备坏了。小音箱发不出低音，而高音那头，是耳朵先跟不上。',
    ],
    [
      '赫茲說的是空氣一秒鐘抖多少次。數字越大，聽起來越高。',
      '波長是聲速（20°C 時每秒 343 公尺）除以頻率。20Hz 是 17 公尺，20kHz 只有 1.7 公分，差了一千多倍。',
      '人一般能聽到 20Hz 到 20kHz，但上限會隨年齡往下掉。所以過了 15kHz，就開始有人聽得見、有人聽不見。',
      '聽不到不代表裝置壞了。小喇叭發不出低音，而高音那頭，是耳朵先跟不上。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '주파수 113가지 소리 듣기 — 20Hz~24kHz 순음',
    'Listen to 113 frequencies — pure tones from 20 Hz to 24 kHz',
    'Escucha 113 frecuencias — tonos puros de 20 Hz a 24 kHz',
    'Ouça 113 frequências — tons puros de 20 Hz a 24 kHz',
    '113の周波数を聴く — 20Hz〜24kHzの純音',
    '113 Frequenzen anhören — reine Töne von 20 Hz bis 24 kHz',
    'Écouter 113 fréquences — sons purs de 20 Hz à 24 kHz',
    '113 फ़्रीक्वेंसी सुनें — 20 Hz से 24 kHz तक शुद्ध स्वर',
    '听 113 种频率 — 20Hz 到 24kHz 的纯音',
    '聽 113 種頻率 — 20Hz 到 24kHz 的純音',
  ),
  hubMetaDesc: T(
    '20Hz부터 24kHz까지 주파수 113가지를 브라우저에서 바로 들어 보세요. 파장·주기·가장 가까운 음이름을 함께 계산하고, 청력 검사 주파수와 모기 소리, 전화 버튼음도 함께 담았습니다.',
    'Play any of 113 frequencies from 20 Hz to 24 kHz right in the browser, with wavelength, period and nearest musical note computed — including hearing-test tones, mosquito tones and phone keypad tones.',
    'Reproduce cualquiera de las 113 frecuencias de 20 Hz a 24 kHz en el navegador, con longitud de onda, periodo y nota más cercana ya calculados, incluidas las de audiometría, el tono mosquito y los tonos del teclado telefónico.',
    'Toque qualquer uma das 113 frequências de 20 Hz a 24 kHz direto no navegador, com comprimento de onda, período e nota mais próxima calculados — incluindo tons de audiometria, tom mosquito e tons do teclado telefônico.',
    '20Hzから24kHzまで113の周波数をブラウザーでそのまま再生できます。波長・周期・いちばん近い音名を計算し、聴力検査の周波数やモスキート音、電話のボタン音も収めています。',
    'Spielen Sie 113 Frequenzen von 20 Hz bis 24 kHz direkt im Browser ab — samt Wellenlänge, Periode und nächstem Notennamen, inklusive Hörtest-, Mücken- und Telefontönen.',
    "Écoutez 113 fréquences de 20 Hz à 24 kHz directement dans le navigateur, avec longueur d'onde, période et note la plus proche calculées — y compris les tons de test auditif, le son moustique et les tonalités du clavier téléphonique.",
    '20 Hz से 24 kHz तक की 113 फ़्रीक्वेंसी ब्राउज़र में ही सुनें — तरंगदैर्ध्य, आवर्तकाल और सबसे नज़दीकी स्वर की गणना के साथ, श्रवण जाँच, मॉस्किटो टोन और फ़ोन कीपैड के स्वर भी शामिल।',
    '从 20Hz 到 24kHz 的 113 种频率，在浏览器里直接播放。波长、周期、最接近的音名都算好了，还收了听力检查用的频率、蚊音和电话按键音。',
    '從 20Hz 到 24kHz 的 113 種頻率，在瀏覽器裡直接播放。波長、週期、最接近的音名都算好了，還收了聽力檢查用的頻率、蚊音和電話按鍵音。',
  ),

  metaTitle: T(
    (hz: number) => `${hz}Hz 소리 듣기 — 파장·음이름`,
    (hz: number) => `${hz} Hz tone — wavelength and note`,
    (hz: number) => `Tono de ${hz} Hz — longitud de onda y nota`,
    (hz: number) => `Tom de ${hz} Hz — comprimento de onda e nota`,
    (hz: number) => `${hz}Hz の音 — 波長と音名`,
    (hz: number) => `${hz}-Hz-Ton — Wellenlänge und Note`,
    (hz: number) => `Son de ${hz} Hz — longueur d'onde et note`,
    (hz: number) => `${hz} Hz की ध्वनि — तरंगदैर्ध्य और स्वर`,
    (hz: number) => `听 ${hz}Hz 的声音 — 波长与音名`,
    (hz: number) => `聽 ${hz}Hz 的聲音 — 波長與音名`,
  ),

  metaDesc: T(
    (f: FreqFacts) => `${f.hz}Hz 순음을 바로 들어 보세요. 공기 중 파장은 ${f.wavelengthLabel}, 주기는 ${f.periodLabel}이고 가장 가까운 음은 ${f.note}입니다.`,
    (f: FreqFacts) => `Play a pure ${f.hz} Hz tone. Its wavelength in air is ${f.wavelengthLabel}, its period ${f.periodLabel}, and the nearest musical note is ${f.note}.`,
    (f: FreqFacts) => `Escucha un tono puro de ${f.hz} Hz. Su longitud de onda en el aire es ${f.wavelengthLabel}, su periodo ${f.periodLabel} y la nota más cercana es ${f.note}.`,
    (f: FreqFacts) => `Ouça um tom puro de ${f.hz} Hz. O comprimento de onda no ar é ${f.wavelengthLabel}, o período ${f.periodLabel} e a nota mais próxima é ${f.note}.`,
    (f: FreqFacts) => `${f.hz}Hz の純音をそのまま聴けます。空気中の波長は ${f.wavelengthLabel}、周期は ${f.periodLabel}、いちばん近い音は ${f.note} です。`,
    (f: FreqFacts) => `Hören Sie einen reinen ${f.hz}-Hz-Ton. Die Wellenlänge in Luft beträgt ${f.wavelengthLabel}, die Periode ${f.periodLabel}, der nächste Ton ist ${f.note}.`,
    (f: FreqFacts) => `Écoutez un son pur de ${f.hz} Hz. Sa longueur d'onde dans l'air est de ${f.wavelengthLabel}, sa période de ${f.periodLabel}, et la note la plus proche est ${f.note}.`,
    (f: FreqFacts) => `${f.hz} Hz का शुद्ध स्वर सुनें। हवा में इसकी तरंगदैर्ध्य ${f.wavelengthLabel}, आवर्तकाल ${f.periodLabel} और सबसे नज़दीकी स्वर ${f.note} है।`,
    (f: FreqFacts) => `直接听一段 ${f.hz}Hz 的纯音。它在空气中的波长是 ${f.wavelengthLabel}，周期为 ${f.periodLabel}，最接近的音是 ${f.note}。`,
    (f: FreqFacts) => `直接聽一段 ${f.hz}Hz 的純音。它在空氣中的波長是 ${f.wavelengthLabel}，週期為 ${f.periodLabel}，最接近的音是 ${f.note}。`,
  ),

  hubFaq: T(
    [
      { q: '사람은 몇 Hz까지 들을 수 있나요?', a: '보통 20Hz에서 20kHz까지로 봅니다. 다만 위쪽 한계는 나이가 들수록 내려가서, 스무 살에는 18kHz가 들리던 사람도 마흔이 넘으면 14kHz 근처에서 멈추는 일이 흔합니다. 아래쪽 20Hz는 귀보다 몸으로 느끼는 영역입니다.' },
      { q: '소리가 안 들리는데 스피커가 고장 난 건가요?', a: '아닐 가능성이 큽니다. 노트북이나 휴대폰의 작은 스피커는 100Hz 아래를 거의 못 내고, 15kHz가 넘어가면 기기가 아니라 귀가 먼저 못 따라갑니다. 헤드폰으로 바꿔 들어 보면 어느 쪽인지 갈립니다.' },
      { q: '순음을 오래 들어도 괜찮나요?', a: '음량을 낮추고 짧게 들으세요. 순음은 에너지가 한 주파수에 모여 있어 같은 크기의 음악보다 귀에 부담이 큽니다. 귀가 먹먹하거나 이명이 남으면 바로 멈추는 것이 좋습니다.' },
      { q: '440Hz와 432Hz는 뭐가 다른가요?', a: '둘 다 A음이지만 432Hz는 440Hz보다 32센트 낮습니다. 반음의 3분의 1쯤 되는 차이라 나란히 들으면 알 수 있습니다. 국제 기준은 440Hz이고, 432Hz가 더 좋다는 주장에는 근거가 없습니다.' },
      { q: '이 값들은 어떻게 계산했나요?', a: '적어 둔 것은 헤르츠 숫자 하나뿐입니다. 파장은 20°C 공기에서의 소리 속도 343m/s를 주파수로 나눈 값이고, 음이름은 440Hz를 A4로 두고 반음이 2의 12제곱근 배라는 관계에서 계산했습니다.' },
    ],
    [
      { q: 'What frequencies can people hear?', a: 'Roughly 20 Hz to 20 kHz. The upper limit falls with age, though: someone who heard 18 kHz at twenty often stops around 14 kHz by forty. At the bottom end, 20 Hz is felt in the body more than heard.' },
      { q: 'I hear nothing — are my speakers broken?', a: 'Probably not. The small speakers in a laptop or phone barely produce anything below 100 Hz, and above 15 kHz it is your ears, not the hardware, that run out first. Trying headphones usually settles which it is.' },
      { q: 'Is it safe to listen to a pure tone for a while?', a: 'Keep the volume low and the sessions short. A pure tone concentrates all its energy at one frequency, so it strains the ear more than music at the same level. If your ears feel dull or ring afterwards, stop.' },
      { q: 'What is the difference between 440 Hz and 432 Hz?', a: 'Both are an A, but 432 Hz sits 32 cents below 440 Hz — about a third of a semitone, clearly audible side by side. The international standard is 440 Hz; claims that 432 Hz is somehow better have no evidence behind them.' },
      { q: 'How are these numbers worked out?', a: 'Only the frequency itself is stored. Wavelength is the speed of sound in 20 °C air, 343 m/s, divided by the frequency; the note name comes from taking 440 Hz as A4 and the fact that one semitone is the twelfth root of two.' },
    ],
    [
      { q: '¿Qué frecuencias oye una persona?', a: 'Aproximadamente de 20 Hz a 20 kHz. El límite superior baja con la edad: quien oía 18 kHz a los veinte suele quedarse en unos 14 kHz a los cuarenta. Por abajo, los 20 Hz se sienten en el cuerpo más que se oyen.' },
      { q: 'No oigo nada, ¿están rotos los altavoces?', a: 'Probablemente no. Los altavoces pequeños de un portátil o un móvil apenas dan nada por debajo de 100 Hz, y por encima de 15 kHz es el oído, no el aparato, el que se queda corto. Probar con auriculares suele aclararlo.' },
      { q: '¿Es seguro escuchar un tono puro un rato?', a: 'Con el volumen bajo y en ratos cortos. Un tono puro concentra toda su energía en una frecuencia, así que cansa más el oído que la música al mismo nivel. Si notas los oídos tapados o zumbido, para.' },
      { q: '¿En qué se diferencian 440 Hz y 432 Hz?', a: 'Ambos son un la, pero 432 Hz queda 32 centésimas por debajo de 440 Hz: alrededor de un tercio de semitono, algo que se nota al compararlos. El estándar internacional es 440 Hz, y no hay pruebas de que 432 Hz sea mejor.' },
      { q: '¿Cómo se calculan estos datos?', a: 'Solo se guarda la frecuencia. La longitud de onda es la velocidad del sonido en aire a 20 °C, 343 m/s, dividida por la frecuencia; el nombre de la nota sale de tomar 440 Hz como la4 y de que un semitono es la raíz duodécima de dos.' },
    ],
    [
      { q: 'Que frequências uma pessoa escuta?', a: 'Mais ou menos de 20 Hz a 20 kHz. O limite de cima cai com a idade: quem ouvia 18 kHz aos vinte costuma parar perto de 14 kHz aos quarenta. Na ponta de baixo, 20 Hz é mais sentido no corpo do que ouvido.' },
      { q: 'Não ouço nada — a caixa de som quebrou?', a: 'Provavelmente não. As caixinhas de notebook ou celular quase não produzem nada abaixo de 100 Hz, e acima de 15 kHz é o ouvido, não o aparelho, que fica para trás. Testar com fone costuma resolver a dúvida.' },
      { q: 'Dá para ouvir um tom puro por muito tempo?', a: 'Com volume baixo e por pouco tempo. O tom puro concentra toda a energia numa frequência e cansa mais o ouvido que música no mesmo nível. Se ficar abafado ou zumbindo depois, pare.' },
      { q: 'Qual a diferença entre 440 Hz e 432 Hz?', a: 'Os dois são um lá, mas 432 Hz fica 32 cents abaixo de 440 Hz — cerca de um terço de semitom, perceptível ao comparar. O padrão internacional é 440 Hz, e não há evidência de que 432 Hz seja melhor.' },
      { q: 'Como esses números são calculados?', a: 'Só a frequência é guardada. O comprimento de onda é a velocidade do som no ar a 20 °C, 343 m/s, dividida pela frequência; o nome da nota vem de tomar 440 Hz como lá4 e do fato de um semitom ser a raiz duodécima de dois.' },
    ],
    [
      { q: '人は何Hzまで聞こえますか。', a: 'ふつう20Hzから20kHzまでとされます。ただし上の限界は歳とともに下がり、二十代で18kHzが聞こえた人も四十を過ぎると14kHz付近で止まることが珍しくありません。下の20Hzは耳より体で感じる領域です。' },
      { q: '音が聞こえないのですが、スピーカーの故障ですか。', a: 'たいていは違います。ノートPCやスマートフォンの小さなスピーカーは100Hz以下をほとんど出せず、15kHzを超えると機器より先に耳が追いつけなくなります。ヘッドホンで試すとどちらか分かります。' },
      { q: '純音を長く聴いても大丈夫ですか。', a: '音量を下げて短く聴いてください。純音はエネルギーが一つの周波数に集まるため、同じ大きさの音楽より耳への負担が大きくなります。耳が詰まった感じや耳鳴りが残るならすぐにやめてください。' },
      { q: '440Hzと432Hzは何が違いますか。', a: 'どちらもA音ですが、432Hzは440Hzより32セント低い音です。半音の三分の一ほどの差で、並べて聴けば分かります。国際基準は440Hzで、432Hzのほうが良いという主張に根拠はありません。' },
      { q: 'これらの値はどう計算していますか。', a: '持っているのはヘルツの数値だけです。波長は20°Cの空気での音速343m/sを周波数で割った値、音名は440HzをA4とし、半音が2の12乗根倍であるという関係から求めています。' },
    ],
    [
      { q: 'Welche Frequenzen hört der Mensch?', a: 'Etwa 20 Hz bis 20 kHz. Die obere Grenze sinkt allerdings mit dem Alter: Wer mit zwanzig 18 kHz hörte, kommt mit vierzig oft nur noch bis rund 14 kHz. Ganz unten spürt man 20 Hz eher im Körper, als dass man sie hört.' },
      { q: 'Ich höre nichts — ist der Lautsprecher kaputt?', a: 'Vermutlich nicht. Die kleinen Lautsprecher in Notebook oder Handy geben unter 100 Hz kaum etwas her, und über 15 kHz ist das Ohr schneller am Ende als die Technik. Ein Test mit Kopfhörern klärt meist, woran es liegt.' },
      { q: 'Ist längeres Hören eines reinen Tons unbedenklich?', a: 'Leise und kurz. Ein reiner Ton bündelt seine ganze Energie auf einer Frequenz und belastet das Ohr stärker als Musik beim gleichen Pegel. Wenn danach etwas dumpf klingt oder nachklingt, sofort aufhören.' },
      { q: 'Was unterscheidet 440 Hz von 432 Hz?', a: 'Beide sind ein A, doch 432 Hz liegt 32 Cent unter 440 Hz — etwa ein Drittel Halbton, im direkten Vergleich klar hörbar. Der internationale Standard ist 440 Hz; für die Behauptung, 432 Hz sei besser, gibt es keine Belege.' },
      { q: 'Wie entstehen diese Zahlen?', a: 'Gespeichert ist nur die Frequenz. Die Wellenlänge ist die Schallgeschwindigkeit in 20 °C warmer Luft, 343 m/s, geteilt durch die Frequenz; der Notenname folgt daraus, dass 440 Hz als A4 gilt und ein Halbton der zwölften Wurzel aus zwei entspricht.' },
    ],
    [
      { q: "Quelles fréquences l'oreille humaine perçoit-elle ?", a: "Environ 20 Hz à 20 kHz. La limite haute baisse avec l'âge : qui entendait 18 kHz à vingt ans s'arrête souvent vers 14 kHz à quarante. En bas, 20 Hz se ressent dans le corps plus qu'il ne s'entend." },
      { q: "Je n'entends rien : mes enceintes sont-elles en panne ?", a: "Sans doute pas. Les petites enceintes d'un portable ou d'un téléphone ne descendent quasiment pas sous 100 Hz, et au-dessus de 15 kHz c'est l'oreille, pas le matériel, qui s'arrête la première. Un essai au casque tranche en général." },
      { q: 'Peut-on écouter longtemps un son pur ?', a: "À faible volume et brièvement. Un son pur concentre toute son énergie sur une fréquence et fatigue plus l'oreille que de la musique au même niveau. Si les oreilles restent sourdes ou sifflent, arrêtez." },
      { q: 'Quelle différence entre 440 Hz et 432 Hz ?', a: "Les deux sont un la, mais 432 Hz se situe 32 cents sous 440 Hz, soit environ un tiers de demi-ton : la différence s'entend en comparant. La norme internationale est 440 Hz, et rien n'étaye l'idée que 432 Hz serait meilleur." },
      { q: 'Comment ces valeurs sont-elles calculées ?', a: "Seule la fréquence est enregistrée. La longueur d'onde est la vitesse du son dans l'air à 20 °C, 343 m/s, divisée par la fréquence ; le nom de la note découle de 440 Hz pris comme la4 et du fait qu'un demi-ton vaut la racine douzième de deux." },
    ],
    [
      { q: 'इंसान कितनी फ़्रीक्वेंसी तक सुन सकता है?', a: 'मोटे तौर पर 20 Hz से 20 kHz तक। ऊपरी सीमा उम्र के साथ गिरती है: बीस की उम्र में जिसे 18 kHz सुनाई देता था, चालीस तक अक्सर 14 kHz के आसपास रुक जाता है। नीचे की ओर 20 Hz कानों से कम और शरीर से ज़्यादा महसूस होता है।' },
      { q: 'कुछ सुनाई नहीं दे रहा — क्या स्पीकर खराब है?', a: 'शायद नहीं। लैपटॉप या फ़ोन के छोटे स्पीकर 100 Hz से नीचे लगभग कुछ नहीं देते, और 15 kHz से ऊपर उपकरण नहीं, कान पहले हार मानते हैं। हेडफ़ोन से जाँचने पर आमतौर पर साफ़ हो जाता है।' },
      { q: 'क्या शुद्ध स्वर देर तक सुनना ठीक है?', a: 'आवाज़ कम रखें और थोड़ी देर ही सुनें। शुद्ध स्वर की पूरी ऊर्जा एक ही फ़्रीक्वेंसी पर टिकी होती है, इसलिए वह उसी स्तर के संगीत से ज़्यादा दबाव डालता है। बाद में कान भारी लगें या घंटी बजे तो रोक दें।' },
      { q: '440 Hz और 432 Hz में क्या फ़र्क है?', a: 'दोनों ही "ला" स्वर हैं, पर 432 Hz, 440 Hz से 32 सेंट नीचे बैठता है — करीब एक तिहाई सेमीटोन, जो साथ-साथ सुनने पर पकड़ में आता है। अंतरराष्ट्रीय मानक 440 Hz है, और 432 Hz के बेहतर होने का कोई प्रमाण नहीं।' },
      { q: 'ये आँकड़े कैसे निकाले गए?', a: 'सिर्फ़ फ़्रीक्वेंसी दर्ज है। तरंगदैर्ध्य 20 °C हवा में ध्वनि की गति 343 मी/से को फ़्रीक्वेंसी से भाग देकर मिलती है; स्वर का नाम 440 Hz को A4 मानकर और इस तथ्य से निकलता है कि एक सेमीटोन दो का बारहवाँ मूल है।' },
    ],
    [
      { q: '人能听到多少 Hz？', a: '一般说是 20Hz 到 20kHz。不过上限会随年龄往下掉：二十岁听得见 18kHz 的人，过了四十常常在 14kHz 附近就到头了。下限那头的 20Hz，与其说是听见，不如说是身体感觉到。' },
      { q: '听不到声音，是音箱坏了吗？', a: '多半不是。笔记本和手机上的小喇叭几乎发不出 100Hz 以下的音；而过了 15kHz，跟不上的不是设备而是耳朵。换副耳机再听一遍，就能分清是哪一头的问题。' },
      { q: '纯音听久了要紧吗？', a: '把音量调低，短时间听。纯音的能量全挤在一个频率上，同样响度下比音乐更伤耳朵。要是听完觉得耳朵发闷或有耳鸣，就该马上停下。' },
      { q: '440Hz 和 432Hz 有什么不同？', a: '两个都是 A 音，但 432Hz 比 440Hz 低 32 音分，大约是半音的三分之一，挨着听就能听出来。国际标准是 440Hz；说 432Hz 更好，是没有依据的。' },
      { q: '这些数值是怎么算的？', a: '记录下来的只有赫兹这一个数字。波长是 20°C 空气中的声速 343 m/s 除以频率；音名则是把 440Hz 定为 A4，再按「半音等于 2 的 12 次方根倍」这个关系推出来的。' },
    ],
    [
      { q: '人能聽到多少 Hz？', a: '一般說是 20Hz 到 20kHz。不過上限會隨年齡往下掉：二十歲聽得見 18kHz 的人，過了四十常常在 14kHz 附近就到頭了。下限那頭的 20Hz，與其說是聽見，不如說是身體感覺到。' },
      { q: '聽不到聲音，是喇叭壞了嗎？', a: '多半不是。筆電和手機上的小喇叭幾乎發不出 100Hz 以下的音；而過了 15kHz，跟不上的不是裝置而是耳朵。換副耳機再聽一遍，就能分清是哪一頭的問題。' },
      { q: '純音聽久了要緊嗎？', a: '把音量調低，短時間聽。純音的能量全擠在一個頻率上，同樣響度下比音樂更傷耳朵。要是聽完覺得耳朵發悶或有耳鳴，就該馬上停下。' },
      { q: '440Hz 和 432Hz 有什麼不同？', a: '兩個都是 A 音，但 432Hz 比 440Hz 低 32 音分，大約是半音的三分之一，挨著聽就能聽出來。國際標準是 440Hz；說 432Hz 更好，是沒有依據的。' },
      { q: '這些數值是怎麼算的？', a: '記錄下來的只有赫茲這一個數字。波長是 20°C 空氣中的聲速 343 m/s 除以頻率；音名則是把 440Hz 定為 A4，再按「半音等於 2 的 12 次方根倍」這個關係推出來的。' },
    ],
  ),

  freqFaq: T(
    (f: FreqFacts) => [
      { q: `${f.hz}Hz는 어떤 소리인가요?`, a: `1초에 ${f.hz}번 떨리는 순음입니다. ${f.audible ? `사람이 들을 수 있는 범위 안이고, 가장 가까운 음이름은 ${f.note}입니다.` : `사람의 가청 범위(20Hz~20kHz) 밖이라 대부분 들리지 않습니다.`}` },
      { q: `${f.hz}Hz의 파장은 얼마인가요?`, a: `공기 중에서 ${f.wavelengthLabel}입니다. 20°C 공기에서 소리는 1초에 343미터를 가므로, 그 거리를 ${f.hz}으로 나눈 값입니다.` },
      { q: `${f.hz}Hz는 무슨 음인가요?`, a: `가장 가까운 음은 ${f.note}이고 ${f.onPitch ? '거의 정확히 그 음입니다.' : `그 음에서 ${Math.abs(f.cents)}센트 ${f.cents > 0 ? '높습니다' : '낮습니다'}. 반음이 100센트이니 반음의 ${Math.round(Math.abs(f.cents))}%쯤 되는 차이입니다.`}` },
      { q: `${f.hz}Hz가 안 들리면 문제가 있는 건가요?`, a: `${f.hz >= 14000 ? '높은 소리는 나이가 들수록 먼저 안 들리게 됩니다. 이 정도 높이는 스무 살에는 대개 들리지만 마흔이 넘으면 안 들리는 사람이 많습니다.' : f.hz <= 40 ? '이렇게 낮은 소리는 작은 스피커가 거의 내지 못합니다. 헤드폰이나 큰 스피커로 다시 들어 보세요.' : '이 대역은 대부분의 기기와 귀가 무리 없이 다루는 범위라, 안 들린다면 음량이나 출력 장치를 먼저 확인해 보세요.'}` },
      { q: `${f.hz}Hz의 배음은 무엇인가요?`, a: `정수배인 ${f.harmonics.join('Hz, ')}Hz입니다. 한 옥타브 위는 두 배인 ${f.octaveUp}Hz, 한 옥타브 아래는 절반인 ${f.octaveDown}Hz입니다.` },
    ],
    (f: FreqFacts) => [
      { q: `What does ${f.hz} Hz sound like?`, a: `It is a pure tone vibrating ${f.hz} times a second. ${f.audible ? `It falls inside the range people hear, and the nearest musical note is ${f.note}.` : `It sits outside the usual human range of 20 Hz to 20 kHz, so most people will hear nothing.`}` },
      { q: `What is the wavelength of ${f.hz} Hz?`, a: `${f.wavelengthLabel} in air. Sound travels 343 metres per second through 20 °C air, so the wavelength is that distance divided by ${f.hz}.` },
      { q: `What note is ${f.hz} Hz?`, a: `The nearest note is ${f.note}, and it is ${f.onPitch ? 'almost exactly that note.' : `${Math.abs(f.cents)} cents ${f.cents > 0 ? 'sharp' : 'flat'}. A semitone is 100 cents, so that is about ${Math.round(Math.abs(f.cents))}% of a semitone away.`}` },
      { q: `I cannot hear ${f.hz} Hz — is something wrong?`, a: `${f.hz >= 14000 ? 'High tones are the first to go with age. Most twenty-year-olds hear this pitch; past forty, many people no longer do.' : f.hz <= 40 ? 'Small speakers can barely produce bass this low. Try headphones or a larger speaker before assuming anything is broken.' : 'This band is comfortable for most equipment and most ears, so check the volume and the output device first.'}` },
      { q: `What are the harmonics of ${f.hz} Hz?`, a: `The whole-number multiples: ${f.harmonics.join(' Hz, ')} Hz. An octave up is double, ${f.octaveUp} Hz; an octave down is half, ${f.octaveDown} Hz.` },
    ],
    (f: FreqFacts) => [
      { q: `¿Cómo suena ${f.hz} Hz?`, a: `Es un tono puro que vibra ${f.hz} veces por segundo. ${f.audible ? `Está dentro del rango que oímos y la nota más cercana es ${f.note}.` : `Queda fuera del rango humano habitual de 20 Hz a 20 kHz, así que casi nadie lo oirá.`}` },
      { q: `¿Cuál es la longitud de onda de ${f.hz} Hz?`, a: `${f.wavelengthLabel} en el aire. El sonido recorre 343 metros por segundo en aire a 20 °C, así que la longitud de onda es esa distancia dividida por ${f.hz}.` },
      { q: `¿Qué nota es ${f.hz} Hz?`, a: `La nota más cercana es ${f.note}, y está ${f.onPitch ? 'prácticamente afinada.' : `${Math.abs(f.cents)} centésimas ${f.cents > 0 ? 'por encima' : 'por debajo'}. Un semitono son 100 centésimas, así que la diferencia ronda el ${Math.round(Math.abs(f.cents))}% de un semitono.`}` },
      { q: `No oigo ${f.hz} Hz, ¿pasa algo?`, a: `${f.hz >= 14000 ? 'Los agudos son los primeros que se pierden con la edad. A los veinte casi todos oyen este tono; pasados los cuarenta, muchos ya no.' : f.hz <= 40 ? 'Los altavoces pequeños apenas producen graves tan bajos. Prueba con auriculares o un altavoz mayor antes de dar nada por roto.' : 'Esta banda es cómoda para casi todos los equipos y oídos, así que revisa primero el volumen y la salida de audio.'}` },
      { q: `¿Cuáles son los armónicos de ${f.hz} Hz?`, a: `Los múltiplos enteros: ${f.harmonics.join(' Hz, ')} Hz. Una octava arriba es el doble, ${f.octaveUp} Hz; una octava abajo, la mitad, ${f.octaveDown} Hz.` },
    ],
    (f: FreqFacts) => [
      { q: `Como soa ${f.hz} Hz?`, a: `É um tom puro que vibra ${f.hz} vezes por segundo. ${f.audible ? `Está dentro da faixa que ouvimos, e a nota mais próxima é ${f.note}.` : `Fica fora da faixa humana usual de 20 Hz a 20 kHz, então quase ninguém vai ouvir.`}` },
      { q: `Qual é o comprimento de onda de ${f.hz} Hz?`, a: `${f.wavelengthLabel} no ar. O som percorre 343 metros por segundo em ar a 20 °C, então o comprimento de onda é essa distância dividida por ${f.hz}.` },
      { q: `Que nota é ${f.hz} Hz?`, a: `A nota mais próxima é ${f.note}, e está ${f.onPitch ? 'praticamente afinada.' : `${Math.abs(f.cents)} cents ${f.cents > 0 ? 'acima' : 'abaixo'}. Um semitom tem 100 cents, então a diferença é cerca de ${Math.round(Math.abs(f.cents))}% de um semitom.`}` },
      { q: `Não escuto ${f.hz} Hz — tem algo errado?`, a: `${f.hz >= 14000 ? 'Os agudos são os primeiros a sumir com a idade. Aos vinte quase todo mundo ouve esse tom; depois dos quarenta, muitos já não.' : f.hz <= 40 ? 'Caixas pequenas quase não produzem graves tão baixos. Teste com fone ou uma caixa maior antes de achar que quebrou.' : 'Essa faixa é confortável para a maioria dos aparelhos e ouvidos, então confira primeiro o volume e a saída de áudio.'}` },
      { q: `Quais são os harmônicos de ${f.hz} Hz?`, a: `Os múltiplos inteiros: ${f.harmonics.join(' Hz, ')} Hz. Uma oitava acima é o dobro, ${f.octaveUp} Hz; uma oitava abaixo, a metade, ${f.octaveDown} Hz.` },
    ],
    (f: FreqFacts) => [
      { q: `${f.hz}Hz はどんな音ですか。`, a: `1秒に ${f.hz} 回震える純音です。${f.audible ? `人が聞こえる範囲の中で、いちばん近い音名は ${f.note} です。` : `人の可聴域（20Hz〜20kHz）の外なので、ほとんどの人には聞こえません。`}` },
      { q: `${f.hz}Hz の波長はどれくらいですか。`, a: `空気中で ${f.wavelengthLabel} です。20°C の空気で音は1秒に343メートル進むので、その距離を ${f.hz} で割った値になります。` },
      { q: `${f.hz}Hz は何の音ですか。`, a: `いちばん近い音は ${f.note} で、${f.onPitch ? 'ほぼその音そのものです。' : `そこから ${Math.abs(f.cents)} セント${f.cents > 0 ? '高い' : '低い'}音です。半音が100セントなので、半音の ${Math.round(Math.abs(f.cents))}% ほどのずれになります。`}` },
      { q: `${f.hz}Hz が聞こえないのですが。`, a: `${f.hz >= 14000 ? '高い音は歳とともに先に聞こえなくなります。この高さは二十代ではたいてい聞こえますが、四十を過ぎると聞こえない人が増えます。' : f.hz <= 40 ? 'これほど低い音は小さなスピーカーではほとんど出せません。ヘッドホンや大きなスピーカーで試してみてください。' : 'この帯域は多くの機器と耳が無理なく扱える範囲なので、まず音量と出力先を確かめてください。'}` },
      { q: `${f.hz}Hz の倍音は何ですか。`, a: `整数倍の ${f.harmonics.join('Hz、')}Hz です。1オクターブ上は2倍の ${f.octaveUp}Hz、1オクターブ下は半分の ${f.octaveDown}Hz になります。` },
    ],
    (f: FreqFacts) => [
      { q: `Wie klingt ${f.hz} Hz?`, a: `Ein reiner Ton, der ${f.hz}-mal pro Sekunde schwingt. ${f.audible ? `Er liegt im hörbaren Bereich, der nächste Notenname ist ${f.note}.` : `Er liegt außerhalb des üblichen Hörbereichs von 20 Hz bis 20 kHz, die meisten hören also nichts.`}` },
      { q: `Wie lang ist die Welle bei ${f.hz} Hz?`, a: `${f.wavelengthLabel} in Luft. Schall legt in 20 °C warmer Luft 343 Meter pro Sekunde zurück, die Wellenlänge ist diese Strecke geteilt durch ${f.hz}.` },
      { q: `Welcher Ton ist ${f.hz} Hz?`, a: `Der nächste Ton ist ${f.note}, und zwar ${f.onPitch ? 'praktisch genau dieser Ton.' : `${Math.abs(f.cents)} Cent ${f.cents > 0 ? 'darüber' : 'darunter'}. Ein Halbton hat 100 Cent, der Abstand beträgt also rund ${Math.round(Math.abs(f.cents))} % eines Halbtons.`}` },
      { q: `Ich höre ${f.hz} Hz nicht — ist etwas kaputt?`, a: `${f.hz >= 14000 ? 'Hohe Töne verschwinden mit dem Alter zuerst. Mit zwanzig hören die meisten diese Höhe, ab vierzig viele nicht mehr.' : f.hz <= 40 ? 'So tiefe Bässe schaffen kleine Lautsprecher kaum. Probieren Sie es mit Kopfhörern oder einem größeren Lautsprecher.' : 'Dieses Band bewältigen die meisten Geräte und Ohren mühelos — prüfen Sie also zuerst Lautstärke und Ausgabegerät.'}` },
      { q: `Welche Oberwellen hat ${f.hz} Hz?`, a: `Die ganzzahligen Vielfachen: ${f.harmonics.join(' Hz, ')} Hz. Eine Oktave höher ist das Doppelte, ${f.octaveUp} Hz; eine Oktave tiefer die Hälfte, ${f.octaveDown} Hz.` },
    ],
    (f: FreqFacts) => [
      { q: `À quoi ressemble un son de ${f.hz} Hz ?`, a: `C'est un son pur qui vibre ${f.hz} fois par seconde. ${f.audible ? `Il est dans la plage audible, et la note la plus proche est ${f.note}.` : `Il sort de la plage humaine habituelle de 20 Hz à 20 kHz : la plupart des gens n'entendront rien.`}` },
      { q: `Quelle est la longueur d'onde de ${f.hz} Hz ?`, a: `${f.wavelengthLabel} dans l'air. Le son parcourt 343 mètres par seconde dans de l'air à 20 °C ; la longueur d'onde est cette distance divisée par ${f.hz}.` },
      { q: `Quelle note vaut ${f.hz} Hz ?`, a: `La note la plus proche est ${f.note}, et elle est ${f.onPitch ? 'quasiment juste.' : `${Math.abs(f.cents)} cents ${f.cents > 0 ? 'au-dessus' : 'en dessous'}. Un demi-ton fait 100 cents : l'écart vaut donc environ ${Math.round(Math.abs(f.cents))} % d'un demi-ton.`}` },
      { q: `Je n'entends pas ${f.hz} Hz, est-ce grave ?`, a: `${f.hz >= 14000 ? "Les aigus sont les premiers à disparaître avec l'âge. À vingt ans presque tout le monde entend cette hauteur ; après quarante, beaucoup ne l'entendent plus." : f.hz <= 40 ? 'Des graves aussi bas dépassent les petites enceintes. Essayez un casque ou une enceinte plus grande avant de conclure à une panne.' : "Cette bande passe sans peine sur la plupart des matériels et des oreilles : vérifiez d'abord le volume et la sortie audio."}` },
      { q: `Quelles sont les harmoniques de ${f.hz} Hz ?`, a: `Les multiples entiers : ${f.harmonics.join(' Hz, ')} Hz. Une octave au-dessus vaut le double, ${f.octaveUp} Hz ; une octave en dessous, la moitié, ${f.octaveDown} Hz.` },
    ],
    (f: FreqFacts) => [
      { q: `${f.hz} Hz कैसी ध्वनि है?`, a: `यह एक शुद्ध स्वर है जो एक सेकंड में ${f.hz} बार कंपित होता है। ${f.audible ? `यह सुनने की सीमा के भीतर है, और सबसे नज़दीकी स्वर ${f.note} है।` : `यह 20 Hz से 20 kHz की सामान्य मानव सीमा से बाहर है, इसलिए ज़्यादातर लोगों को कुछ सुनाई नहीं देगा।`}` },
      { q: `${f.hz} Hz की तरंगदैर्ध्य कितनी है?`, a: `हवा में ${f.wavelengthLabel}। 20 °C हवा में ध्वनि एक सेकंड में 343 मीटर चलती है, इसलिए तरंगदैर्ध्य वही दूरी ${f.hz} से भाग देने पर मिलती है।` },
      { q: `${f.hz} Hz कौन सा स्वर है?`, a: `सबसे नज़दीकी स्वर ${f.note} है, और यह ${f.onPitch ? 'लगभग ठीक वही स्वर है।' : `उससे ${Math.abs(f.cents)} सेंट ${f.cents > 0 ? 'ऊपर' : 'नीचे'} है। एक सेमीटोन 100 सेंट का होता है, यानी अंतर करीब एक सेमीटोन का ${Math.round(Math.abs(f.cents))}% है।`}` },
      { q: `${f.hz} Hz सुनाई नहीं दे रहा — क्या कोई गड़बड़ है?`, a: `${f.hz >= 14000 ? 'ऊँचे स्वर उम्र के साथ सबसे पहले जाते हैं। बीस की उम्र में यह ऊँचाई ज़्यादातर लोग सुनते हैं, चालीस के बाद कई नहीं।' : f.hz <= 40 ? 'इतने नीचे के बास छोटे स्पीकर मुश्किल से बनाते हैं। कुछ खराब मानने से पहले हेडफ़ोन या बड़े स्पीकर पर आज़माएँ।' : 'यह बैंड ज़्यादातर उपकरणों और कानों के लिए आसान है, इसलिए पहले आवाज़ और आउटपुट डिवाइस जाँचें।'}` },
      { q: `${f.hz} Hz के हार्मोनिक क्या हैं?`, a: `पूर्णांक गुणज: ${f.harmonics.join(' Hz, ')} Hz। एक ऑक्टेव ऊपर दोगुना ${f.octaveUp} Hz, और एक ऑक्टेव नीचे आधा ${f.octaveDown} Hz होता है।` },
    ],
    (f: FreqFacts) => [
      { q: `${f.hz}Hz 是什么样的声音？`, a: `是一秒钟抖 ${f.hz} 次的纯音。${f.audible ? `它落在人能听到的范围里，最接近的音名是 ${f.note}。` : `它在人耳可听范围（20Hz~20kHz）之外，大多数人听不到。`}` },
      { q: `${f.hz}Hz 的波长是多少？`, a: `在空气中是 ${f.wavelengthLabel}。20°C 的空气里声音一秒走 343 米，把这个距离除以 ${f.hz} 就得到它。` },
      { q: `${f.hz}Hz 是什么音？`, a: `最接近的音是 ${f.note}，${f.onPitch ? '而且几乎正好就是那个音。' : `比它${f.cents > 0 ? '高' : '低'} ${Math.abs(f.cents)} 音分。半音是 100 音分，所以差了大约半音的 ${Math.round(Math.abs(f.cents))}%。`}` },
      { q: `听不到 ${f.hz}Hz 是有问题吗？`, a: `${f.hz >= 14000 ? '高音是随年龄最先听不到的。这个高度二十岁时大多听得见，过了四十就有不少人听不到了。' : f.hz <= 40 ? '这么低的音，小喇叭几乎发不出来。换耳机或大音箱再听一次看看。' : '这一段是大多数设备和耳朵都应付得来的范围，听不到的话，先查一下音量和输出设备。'}` },
      { q: `${f.hz}Hz 的泛音有哪些？`, a: `是它的整数倍：${f.harmonics.join('Hz、')}Hz。高八度是两倍的 ${f.octaveUp}Hz，低八度是一半的 ${f.octaveDown}Hz。` },
    ],
    (f: FreqFacts) => [
      { q: `${f.hz}Hz 是什麼樣的聲音？`, a: `是一秒鐘抖 ${f.hz} 次的純音。${f.audible ? `它落在人能聽到的範圍裡，最接近的音名是 ${f.note}。` : `它在人耳可聽範圍（20Hz~20kHz）之外，大多數人聽不到。`}` },
      { q: `${f.hz}Hz 的波長是多少？`, a: `在空氣中是 ${f.wavelengthLabel}。20°C 的空氣裡聲音一秒走 343 公尺，把這個距離除以 ${f.hz} 就得到它。` },
      { q: `${f.hz}Hz 是什麼音？`, a: `最接近的音是 ${f.note}，${f.onPitch ? '而且幾乎正好就是那個音。' : `比它${f.cents > 0 ? '高' : '低'} ${Math.abs(f.cents)} 音分。半音是 100 音分，所以差了大約半音的 ${Math.round(Math.abs(f.cents))}%。`}` },
      { q: `聽不到 ${f.hz}Hz 是有問題嗎？`, a: `${f.hz >= 14000 ? '高音是隨年齡最先聽不到的。這個高度二十歲時大多聽得見，過了四十就有不少人聽不到了。' : f.hz <= 40 ? '這麼低的音，小喇叭幾乎發不出來。換耳機或大喇叭再聽一次看看。' : '這一段是大多數裝置和耳朵都應付得來的範圍，聽不到的話，先查一下音量和輸出裝置。'}` },
      { q: `${f.hz}Hz 的泛音有哪些？`, a: `是它的整數倍：${f.harmonics.join('Hz、')}Hz。高八度是兩倍的 ${f.octaveUp}Hz，低八度是一半的 ${f.octaveDown}Hz。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const SOUND_UI: L<SoundUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<SoundUI>;
