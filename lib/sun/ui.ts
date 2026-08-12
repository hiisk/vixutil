/**
 * 태양 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "태양의 자리는 자료가 아니라 날짜와 위도에서 계산된다"이다.
 * 날짜가 적위를 정하고, 적위와 위도가 정오 고도·낮 길이·일출 시각·그림자 길이를
 * 정한다. 그리고 **어디까지가 어림인지 같이 말한다** — 대기 굴절과 균시차를 넣지
 * 않았으므로 이 표의 일출 시각은 시계에 맞춰 쓸 값이 아니다.
 *
 * ── 소수점 기호 ──────────────────────────────────────────
 * es·pt·de·fr는 소수점에 쉼표를 쓴다(73,44°). 표와 본문이 어긋나면 같은 값이 한
 * 화면에서 두 얼굴이 되므로, 문장 안의 숫자는 nc()로 갈아 끼우고 화면 컴포넌트는
 * fmtNum()을 쓴다 — 두 곳이 같은 규칙 하나를 본다. 시각(04:35)은 쌍점으로 갈라
 * 적으므로 언어를 가리지 않는다.
 *
 * ── 위도 이름과 날짜 이름을 여기서 만든다 ─────────────────
 * 축의 값은 숫자 하나(위도 40, 날짜 jun21)지만, 화면에 적는 말은 언어마다 다르다
 * (북위 40° · 40°N · 北緯40度 · 40° उत्तर). 그래서 달 이름 열두 개와 날짜를 적는
 * 꼴, 위도를 부르는 꼴을 언어마다 한 벌씩 둔다. 낱장 224장이 이 표에서 이름을
 * 받아 가므로 여기 한 곳만 맞으면 전부 맞는다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { SunDate, TurnKey } from './list.ts';
import type { SunFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface SunUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  latLabel: string;
  dateLabel: string;
  dayOfYearLabel: string;
  declLabel: string;
  noonLabel: string;
  dayLengthLabel: string;
  riseSetLabel: string;
  hourAngleLabel: string;
  shadowLabel: string;
  noonSideLabel: string;

  /** 백야·극야 — 시각을 적을 수 없는 자리에 이 말이 들어간다 */
  midnightSun: string;
  polarNight: string;
  /** 해가 안 떠 그림자가 생기지 않는 자리 */
  noShadow: string;
  /** 정오에 해가 천정의 어느 쪽인가 */
  northSide: string;
  southSide: string;
  zenithSide: string;
  /** 시각이 진태양시라는 것을 표 밑에 적는다 */
  solarTimeNote: string;
  /** 절기 이름 */
  turns: Record<TurnKey, string>;

  declTitle: string;
  declNote: string;
  dayTitle: string;
  dayNote: string;
  shadowTitle: string;
  shadowNote: string;
  approxTitle: string;
  approxNote: string;

  uvTitle: string;
  uvNote: string;
  uvLink: string;

  tableTitle: string;
  neighbourTitle: string;
  latRowTitle: string;
  dateRowTitle: string;

  desc: (f: SunFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: SunFacts) => string;
  metaDesc: (f: SunFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: SunFacts) => FaqItem[];
}

/** 소수점에 쉼표를 쓰는 언어 */
const COMMA_LANGS: ReadonlySet<Lang> = new Set<Lang>(['es', 'pt', 'de', 'fr']);

/** 화면 컴포넌트가 쓰는 자리 — 문장 쪽의 nc()와 같은 규칙이다 */
export const fmtNum = (lang: Lang, x: number): string =>
  COMMA_LANGS.has(lang) ? String(x).replace('.', ',') : String(x);

/** 쉼표 언어의 문장 안에서 쓴다 */
const nc = (x: number): string => String(x).replace('.', ',');

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 달 이름 열두 개 — 날짜를 적는 꼴은 DATE_FMT가 정한다 */
const MONTHS: L<string[]> = T<string[]>(
  ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्तूबर', 'नवंबर', 'दिसंबर'],
  ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
);

/** 달 이름과 날을 그 언어가 적는 차례로 — "6월 21일", "June 21", "21 de junio" */
const DATE_FMT: L<(month: string, day: number) => string> = T<(month: string, day: number) => string>(
  (m, d) => `${m} ${d}일`,
  (m, d) => `${m} ${d}`,
  (m, d) => `${d} de ${m}`,
  (m, d) => `${d} de ${m}`,
  (m, d) => `${m}${d}日`,
  (m, d) => `${d}. ${m}`,
  (m, d) => `${d} ${m}`,
  (m, d) => `${d} ${m}`,
  (m, d) => `${m}${d}日`,
  (m, d) => `${m}${d}日`,
);

/** 위도를 부르는 꼴 — 0은 적도다 */
const LAT_NAME: L<(lat: number) => string> = T<(lat: number) => string>(
  lat => (lat === 0 ? '적도' : lat > 0 ? `북위 ${lat}°` : `남위 ${-lat}°`),
  lat => (lat === 0 ? 'Equator' : lat > 0 ? `${lat}°N` : `${-lat}°S`),
  lat => (lat === 0 ? 'Ecuador' : lat > 0 ? `${lat}° N` : `${-lat}° S`),
  lat => (lat === 0 ? 'Equador' : lat > 0 ? `${lat}° N` : `${-lat}° S`),
  lat => (lat === 0 ? '赤道' : lat > 0 ? `北緯${lat}度` : `南緯${-lat}度`),
  lat => (lat === 0 ? 'Äquator' : lat > 0 ? `${lat}° N` : `${-lat}° S`),
  lat => (lat === 0 ? 'Équateur' : lat > 0 ? `${lat}° N` : `${-lat}° S`),
  lat => (lat === 0 ? 'भूमध्य रेखा' : lat > 0 ? `${lat}° उत्तर` : `${-lat}° दक्षिण`),
  lat => (lat === 0 ? '赤道' : lat > 0 ? `北纬${lat}°` : `南纬${-lat}°`),
  lat => (lat === 0 ? '赤道' : lat > 0 ? `北緯${lat}°` : `南緯${-lat}°`),
);

/** 시간과 분을 그 언어가 적는 꼴 — "14시간 51분", "14 h 51 min" */
const HM: L<(h: number, m: number) => string> = T<(h: number, m: number) => string>(
  (h, m) => `${h}시간 ${m}분`,
  (h, m) => `${h} h ${m} min`,
  (h, m) => `${h} h ${m} min`,
  (h, m) => `${h} h ${m} min`,
  (h, m) => `${h}時間${m}分`,
  (h, m) => `${h} Std. ${m} Min.`,
  (h, m) => `${h} h ${m} min`,
  (h, m) => `${h} घंटे ${m} मिनट`,
  (h, m) => `${h} 小时 ${m} 分`,
  (h, m) => `${h} 小時 ${m} 分`,
);

/** 위도 이름 — 화면과 검사가 같은 함수를 본다 */
export const latName = (lang: Lang, lat: number): string => LAT_NAME[lang](lat);

/** 날짜 이름 */
export const dateName = (lang: Lang, d: SunDate): string => DATE_FMT[lang](MONTHS[lang][d.month - 1], d.day);

/** 칸 이름 — "북위 40° · 6월 21일" */
export const cellName = (lang: Lang, f: SunFacts): string =>
  `${latName(lang, f.cell.lat)} · ${dateName(lang, f.day)}`;

/**
 * 낮 길이를 적는 말.
 *
 * 백야·극야에는 시·분이 뜻이 없다(24시간 0분·0시간 0분은 답이 아니라 상태다).
 * 그 자리에는 상태를 적는다 — 화면과 문장이 같은 함수를 보므로 한쪽만 시각을
 * 적어 버리는 일이 없다.
 */
export const dayLengthText = (lang: Lang, f: SunFacts): string => {
  const hm = HM[lang](f.dayHourPart, f.dayMinutePart);
  /* 백야는 24시간, 극야는 0시간이 맞는 답이다 — 시간과 함께 상태 이름을 붙인다 */
  return f.polar ? `${hm} (${SUN_UI[lang][f.polar]})` : hm;
};

/** 일출·일몰 — 백야·극야에는 시각 대신 상태를 적는다 */
export const riseSetText = (lang: Lang, f: SunFacts): string =>
  f.sunrise && f.sunset ? `${f.sunrise} – ${f.sunset}` : SUN_UI[lang][f.polar ?? 'polarNight'];

/** 그림자 길이 — 해가 안 뜨는 날에는 길이가 없다 */
export const shadowText = (lang: Lang, f: SunFacts): string =>
  f.shadow === null ? SUN_UI[lang].noShadow : `${fmtNum(lang, f.shadow)} m`;

/** 정오에 해가 천정의 어느 쪽인가 */
export const noonSideText = (lang: Lang, f: SunFacts): string =>
  f.noonSide === 'north' ? SUN_UI[lang].northSide
    : f.noonSide === 'south' ? SUN_UI[lang].southSide
      : SUN_UI[lang].zenithSide;

type Spec = { [K in keyof SunUI]: L<SunUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('태양 고도와 낮 길이', 'Sun angle and daylight', 'Altura del sol y luz diurna', 'Altura do sol e luz do dia', '太陽高度と昼の長さ', 'Sonnenhöhe und Tageslänge', 'Hauteur du soleil et durée du jour', 'सूर्य की ऊँचाई और दिन की लंबाई', '太阳高度与白天长度', '太陽高度與白天長度'),

  hubTitle: T(
    '태양 고도와 낮 길이 224칸 — 북위 40° 하지의 낮은 14시간 51분',
    '224 sun positions — at 40°N the June solstice runs 14 h 51 min of daylight',
    '224 posiciones del sol — a 40° N el solsticio de junio da 14 h 51 min de luz',
    '224 posições do sol — a 40° N o solstício de junho dá 14 h 51 min de luz',
    '太陽高度と昼の長さ224マス — 北緯40度の夏至は14時間51分',
    '224 Sonnenstände — auf 40° N bringt die Sonnenwende im Juni 14 Std. 51 Min. Tageslicht',
    '224 positions du soleil — à 40° N, le solstice de juin donne 14 h 51 min de jour',
    'सूर्य की 224 स्थितियाँ — 40° उत्तर पर जून संक्रांति का दिन 14 घंटे 51 मिनट',
    '太阳高度与白天长度 224 格 — 北纬 40° 夏至白天 14 小时 51 分',
    '太陽高度與白天長度 224 格 — 北緯 40° 夏至白天 14 小時 51 分',
  ),

  hubLead: T(
    '위도 14가지와 날짜 16가지가 만나는 칸마다 정오의 태양 고도, 낮 길이, 태양시 일출·일몰, 그림자 길이를 계산했습니다. 옮겨 적은 자료가 아니라 그 해의 몇 번째 날에서 적위를 구해 위도와 맞춘 값입니다. 대기 굴절과 균시차를 넣지 않은 어림이므로, 시계에 맞춘 일출 시각과는 몇 분에서 십몇 분 어긋납니다.',
    'Every pairing of 14 latitudes and 16 dates, worked out as a noon altitude, a length of day, sunrise and sunset in solar time, and a shadow length. Nothing is copied from a table: the day of the year gives the declination, and the declination meets the latitude. Refraction and the equation of time are left out, so these sunrise times sit several minutes — sometimes a quarter of an hour — away from clock time.',
    'Cada cruce de 14 latitudes y 16 fechas, resuelto en altura al mediodía, duración del día, salida y puesta en tiempo solar y longitud de la sombra. No hay tabla copiada: el día del año da la declinación y la declinación se cruza con la latitud. Sin refracción ni ecuación del tiempo, estas horas se apartan del reloj entre unos minutos y un cuarto de hora.',
    'Cada cruzamento de 14 latitudes e 16 datas, resolvido em altura ao meio-dia, duração do dia, nascer e pôr do sol em tempo solar e comprimento da sombra. Nada é copiado de tabela: o dia do ano dá a declinação e a declinação encontra a latitude. Sem refração nem equação do tempo, estes horários ficam de alguns minutos a um quarto de hora longe do relógio.',
    '緯度14種と日付16種が交わるマスごとに、南中高度・昼の長さ・太陽時の日の出と日の入り・影の長さを計算しました。表を写したものではなく、その年の何日目かから赤緯を出し、緯度と組み合わせた値です。大気差と均時差を入れていない目安なので、時計に合わせた日の出時刻とは数分から十数分ずれます。',
    'Jede Paarung aus 14 Breiten und 16 Daten, ausgerechnet als Mittagshöhe, Tageslänge, Auf- und Untergang in Sonnenzeit und Schattenlänge. Nichts ist aus einer Tabelle abgeschrieben: Der Tag des Jahres ergibt die Deklination, und die Deklination trifft die Breite. Refraktion und Zeitgleichung fehlen, also liegen diese Zeiten einige Minuten bis eine Viertelstunde neben der Uhr.',
    'Chaque croisement de 14 latitudes et 16 dates, résolu en hauteur à midi, durée du jour, lever et coucher en temps solaire et longueur d’ombre. Rien n’est recopié d’une table : le jour de l’année donne la déclinaison, et la déclinaison rencontre la latitude. Sans réfraction ni équation du temps, ces horaires s’écartent de l’heure de quelques minutes à un quart d’heure.',
    '14 अक्षांशों और 16 तारीख़ों के हर जोड़ के लिए दोपहर की सूर्य ऊँचाई, दिन की लंबाई, सौर समय में सूर्योदय-सूर्यास्त और छाया की लंबाई निकाली गई है। कोई तालिका नहीं उतारी गई: साल का दिन क्रांति देता है और क्रांति अक्षांश से मिलती है। वायुमंडलीय अपवर्तन और समय समीकरण शामिल नहीं हैं, इसलिए ये समय घड़ी से कुछ मिनट से पंद्रह मिनट तक हट सकते हैं।',
    '14 种纬度与 16 个日期相交的每一格，都算出了正午太阳高度、白天长度、太阳时的日出日落和影子长度。这不是抄来的表：由一年中的第几天得出赤纬，赤纬再与纬度相遇。没有计入大气折射和时差方程，所以这里的日出时刻与钟表时间会差几分钟到十几分钟。',
    '14 種緯度與 16 個日期相交的每一格，都算出了正午太陽高度、白天長度、太陽時的日出日落和影子長度。這不是抄來的表：由一年中的第幾天得出赤緯，赤緯再與緯度相遇。沒有計入大氣折射和時差方程，所以這裡的日出時刻與鐘錶時間會差幾分鐘到十幾分鐘。',
  ),

  latLabel: T('위도', 'Latitude', 'Latitud', 'Latitude', '緯度', 'Breite', 'Latitude', 'अक्षांश', '纬度', '緯度'),
  dateLabel: T('날짜', 'Date', 'Fecha', 'Data', '日付', 'Datum', 'Date', 'तारीख़', '日期', '日期'),
  dayOfYearLabel: T('그 해의 몇 번째 날', 'Day of the year', 'Día del año', 'Dia do ano', '年内通日', 'Tag des Jahres', 'Jour de l’année', 'साल का दिन', '一年中的第几天', '一年中的第幾天'),
  declLabel: T('적위', 'Declination', 'Declinación', 'Declinação', '赤緯', 'Deklination', 'Déclinaison', 'क्रांति', '赤纬', '赤緯'),
  noonLabel: T('정오의 태양 고도', 'Noon altitude', 'Altura al mediodía', 'Altura ao meio-dia', '南中高度', 'Mittagshöhe', 'Hauteur à midi', 'दोपहर की ऊँचाई', '正午太阳高度', '正午太陽高度'),
  dayLengthLabel: T('낮 길이', 'Length of day', 'Duración del día', 'Duração do dia', '昼の長さ', 'Tageslänge', 'Durée du jour', 'दिन की लंबाई', '白天长度', '白天長度'),
  riseSetLabel: T('일출·일몰', 'Sunrise and sunset', 'Salida y puesta', 'Nascer e pôr do sol', '日の出と日の入り', 'Auf- und Untergang', 'Lever et coucher', 'सूर्योदय और सूर्यास्त', '日出与日落', '日出與日落'),
  hourAngleLabel: T('반일호', 'Half-day angle', 'Ángulo semidiurno', 'Ângulo semidiurno', '半日周角', 'Halbtagsbogen', 'Angle semi-diurne', 'अर्ध-दिन कोण', '半昼弧', '半晝弧'),
  shadowLabel: T('1m 막대의 그림자', 'Shadow of a 1 m pole', 'Sombra de un poste de 1 m', 'Sombra de uma vara de 1 m', '1mの棒の影', 'Schatten eines 1-m-Stabs', 'Ombre d’un piquet de 1 m', '1 m डंडे की छाया', '1 米杆的影子', '1 公尺桿的影子'),
  noonSideLabel: T('정오에 해가 있는 쪽', 'Sun at noon', 'El sol al mediodía', 'O sol ao meio-dia', '南中時の方位', 'Sonne am Mittag', 'Le soleil à midi', 'दोपहर में सूर्य', '正午太阳的方位', '正午太陽的方位'),

  midnightSun: T('백야', 'Midnight sun', 'Sol de medianoche', 'Sol da meia-noite', '白夜', 'Mitternachtssonne', 'Soleil de minuit', 'आधी रात का सूरज', '极昼', '極晝'),
  polarNight: T('극야', 'Polar night', 'Noche polar', 'Noite polar', '極夜', 'Polarnacht', 'Nuit polaire', 'ध्रुवीय रात', '极夜', '極夜'),
  noShadow: T('없음', 'none', 'ninguna', 'nenhuma', 'なし', 'keiner', 'aucune', 'कोई नहीं', '无', '無'),
  northSide: T('북쪽', 'To the north', 'Al norte', 'Ao norte', '北側', 'Im Norden', 'Au nord', 'उत्तर की ओर', '偏北', '偏北'),
  southSide: T('남쪽', 'To the south', 'Al sur', 'Ao sul', '南側', 'Im Süden', 'Au sud', 'दक्षिण की ओर', '偏南', '偏南'),
  zenithSide: T('머리 위', 'Overhead', 'En el cenit', 'No zênite', 'ほぼ真上', 'Im Zenit', 'Au zénith', 'सिर के ऊपर', '近乎头顶', '近乎頭頂'),
  solarTimeNote: T(
    '시각은 태양이 정남(남반구에서는 정북)에 오는 때를 12:00으로 둔 진태양시입니다.',
    'Times are apparent solar time, with noon set to 12:00 when the sun crosses the meridian.',
    'Las horas son tiempo solar aparente: el mediodía es 12:00, cuando el sol cruza el meridiano.',
    'Os horários são tempo solar aparente: o meio-dia é 12:00, quando o sol cruza o meridiano.',
    '時刻は太陽が子午線を通る瞬間を12:00とした真太陽時です。',
    'Die Zeiten sind wahre Sonnenzeit: Mittag ist 12:00, wenn die Sonne den Meridian kreuzt.',
    'Les heures sont en temps solaire vrai : midi vaut 12:00, quand le soleil passe au méridien.',
    'समय वास्तविक सौर समय में है — जब सूर्य याम्योत्तर पार करता है, वही 12:00 है।',
    '时刻是真太阳时：太阳过子午线的那一刻定为 12:00。',
    '時刻是真太陽時：太陽過子午線的那一刻定為 12:00。',
  ),

  turns: T<Record<TurnKey, string>>(
    { marEquinox: '춘분', junSolstice: '하지', sepEquinox: '추분', decSolstice: '동지' },
    { marEquinox: 'March equinox', junSolstice: 'June solstice', sepEquinox: 'September equinox', decSolstice: 'December solstice' },
    { marEquinox: 'Equinoccio de marzo', junSolstice: 'Solsticio de junio', sepEquinox: 'Equinoccio de septiembre', decSolstice: 'Solsticio de diciembre' },
    { marEquinox: 'Equinócio de março', junSolstice: 'Solstício de junho', sepEquinox: 'Equinócio de setembro', decSolstice: 'Solstício de dezembro' },
    { marEquinox: '春分', junSolstice: '夏至', sepEquinox: '秋分', decSolstice: '冬至' },
    { marEquinox: 'Frühlingsäquinoktium', junSolstice: 'Junisonnenwende', sepEquinox: 'Herbstäquinoktium', decSolstice: 'Dezembersonnenwende' },
    { marEquinox: 'Équinoxe de mars', junSolstice: 'Solstice de juin', sepEquinox: 'Équinoxe de septembre', decSolstice: 'Solstice de décembre' },
    { marEquinox: 'मार्च विषुव', junSolstice: 'जून संक्रांति', sepEquinox: 'सितंबर विषुव', decSolstice: 'दिसंबर संक्रांति' },
    { marEquinox: '春分', junSolstice: '夏至', sepEquinox: '秋分', decSolstice: '冬至' },
    { marEquinox: '春分', junSolstice: '夏至', sepEquinox: '秋分', decSolstice: '冬至' },
  ),

  declTitle: T(
    '적위는 날짜만으로 정해진다',
    'The declination comes from the date alone',
    'La declinación sale solo de la fecha',
    'A declinação sai só da data',
    '赤緯は日付だけで決まる',
    'Die Deklination folgt allein aus dem Datum',
    'La déclinaison ne dépend que de la date',
    'क्रांति केवल तारीख़ से तय होती है',
    '赤纬只由日期决定',
    '赤緯只由日期決定',
  ),
  declNote: T(
    '지구의 자전축이 궤도면에 대해 23.44° 기울어 있어서, 정오에 태양이 어느 위도의 머리 위에 오는지가 한 해 동안 −23.44°와 +23.44° 사이를 오갑니다. 그 위도가 적위입니다. 널리 쓰는 근사식은 δ = 23.44° × sin(360° × (284 + N) ÷ 365)이고, N은 1월 1일부터 센 날 수입니다. 하지에 +23.44°, 동지에 −23.44°에 닿고 춘분과 추분에 0을 지납니다 — 다만 이 식은 0을 지나는 날을 이틀쯤 늦게 잡습니다.',
    'The earth’s axis leans 23.44° out of its orbital plane, so the latitude that has the sun directly overhead at noon travels between −23.44° and +23.44° over a year. That latitude is the declination. The formula in common use is δ = 23.44° × sin(360° × (284 + N) ÷ 365), where N counts the days from 1 January. It reaches +23.44° at the June solstice, −23.44° at the December solstice, and crosses zero at the equinoxes — though this approximation puts the crossing about two days late.',
    'El eje de la Tierra se inclina 23,44° respecto al plano de su órbita, así que la latitud que tiene el sol en el cenit al mediodía recorre entre −23,44° y +23,44° a lo largo del año. Esa latitud es la declinación. La fórmula habitual es δ = 23,44° × sin(360° × (284 + N) ÷ 365), donde N cuenta los días desde el 1 de enero. Llega a +23,44° en el solsticio de junio, a −23,44° en el de diciembre y pasa por cero en los equinoccios, aunque esta aproximación retrasa ese paso unos dos días.',
    'O eixo da Terra se inclina 23,44° em relação ao plano da órbita, então a latitude que tem o sol a pino ao meio-dia percorre entre −23,44° e +23,44° ao longo do ano. Essa latitude é a declinação. A fórmula usual é δ = 23,44° × sin(360° × (284 + N) ÷ 365), com N contando os dias desde 1 de janeiro. Chega a +23,44° no solstício de junho, a −23,44° no de dezembro e passa por zero nos equinócios, embora esta aproximação atrase essa passagem em cerca de dois dias.',
    '地球の自転軸が公転面に対して23.44度傾いているため、正午に太陽が真上に来る緯度は一年のあいだ−23.44度から+23.44度のあいだを行き来します。その緯度が赤緯です。よく使われる近似式はδ = 23.44° × sin(360° × (284 + N) ÷ 365)で、Nは1月1日から数えた日数です。夏至に+23.44度、冬至に−23.44度に達し、春分と秋分に0を通ります — ただしこの式は0を通る日を二日ほど遅く見ます。',
    'Die Erdachse steht 23,44° schief zur Bahnebene, deshalb wandert die Breite, über der die Sonne mittags senkrecht steht, im Jahreslauf zwischen −23,44° und +23,44°. Diese Breite ist die Deklination. Die gebräuchliche Formel lautet δ = 23,44° × sin(360° × (284 + N) ÷ 365), wobei N die Tage ab dem 1. Januar zählt. Zur Junisonnenwende erreicht sie +23,44°, zur Dezembersonnenwende −23,44°, und zu den Äquinoktien geht sie durch null — diese Näherung legt den Nulldurchgang allerdings etwa zwei Tage zu spät.',
    'L’axe de la Terre est incliné de 23,44° par rapport au plan de son orbite : la latitude qui a le soleil au zénith à midi se déplace donc entre −23,44° et +23,44° au cours de l’année. Cette latitude est la déclinaison. La formule d’usage est δ = 23,44° × sin(360° × (284 + N) ÷ 365), où N compte les jours depuis le 1er janvier. Elle atteint +23,44° au solstice de juin, −23,44° à celui de décembre, et passe par zéro aux équinoxes — cette approximation place toutefois ce passage deux jours trop tard.',
    'पृथ्वी का अक्ष अपने कक्षा-तल से 23.44° झुका है, इसलिए दोपहर में जिस अक्षांश के ठीक ऊपर सूर्य होता है वह साल भर में −23.44° से +23.44° के बीच घूमता है। वही अक्षांश क्रांति है। प्रचलित सूत्र δ = 23.44° × sin(360° × (284 + N) ÷ 365) है, जिसमें N 1 जनवरी से गिने दिन हैं। जून संक्रांति पर यह +23.44° और दिसंबर संक्रांति पर −23.44° तक पहुँचती है, और विषुवों पर शून्य से गुज़रती है — हालाँकि यह सन्निकटन उस शून्य को लगभग दो दिन देर से रखता है।',
    '地球自转轴相对公转面倾斜 23.44°，所以正午太阳直射的纬度一年之内在 −23.44° 与 +23.44° 之间来回移动。那个纬度就是赤纬。常用的近似式是 δ = 23.44° × sin(360° × (284 + N) ÷ 365)，其中 N 是从 1 月 1 日起算的天数。它在夏至达到 +23.44°，冬至达到 −23.44°，春分秋分经过零 — 只是这个式子把过零的日子推迟了约两天。',
    '地球自轉軸相對公轉面傾斜 23.44°，所以正午太陽直射的緯度一年之內在 −23.44° 與 +23.44° 之間來回移動。那個緯度就是赤緯。常用的近似式是 δ = 23.44° × sin(360° × (284 + N) ÷ 365)，其中 N 是從 1 月 1 日起算的天數。它在夏至達到 +23.44°，冬至達到 −23.44°，春分秋分經過零 — 只是這個式子把過零的日子推遲了約兩天。',
  ),

  dayTitle: T(
    '낮 길이는 위도와 적위 둘이 정한다',
    'Latitude and declination together fix the length of day',
    'La latitud y la declinación fijan juntas la duración del día',
    'A latitude e a declinação juntas fixam a duração do dia',
    '昼の長さは緯度と赤緯で決まる',
    'Breite und Deklination bestimmen zusammen die Tageslänge',
    'La latitude et la déclinaison fixent ensemble la durée du jour',
    'दिन की लंबाई अक्षांश और क्रांति मिलकर तय करते हैं',
    '白天长度由纬度和赤纬共同决定',
    '白天長度由緯度和赤緯共同決定',
  ),
  dayNote: T(
    '해가 지평선에 닿을 때의 시간각 H는 cos H = −tan(위도) × tan(적위)로 나옵니다. 하늘은 한 시간에 15°를 돌므로 낮 길이는 2H ÷ 15시간이고, 일출은 정오보다 H ÷ 15시간 앞, 일몰은 그만큼 뒤입니다. cos H의 절댓값이 1을 넘는 것은 계산이 깨진 것이 아니라 그 자체가 답입니다 — 1보다 크면 해가 뜨지 않는 극야, −1보다 작으면 해가 지지 않는 백야입니다. 이 표에서는 북위 70°의 6월과 12월에 실제로 나타나고, 그 칸에는 일출 시각을 적지 않습니다.',
    'The hour angle H at which the sun meets the horizon follows from cos H = −tan(latitude) × tan(declination). The sky turns 15° an hour, so the day lasts 2H ÷ 15 hours, sunrise falls H ÷ 15 hours before noon and sunset the same amount after. When |cos H| passes 1 the arithmetic has not broken — that is the answer: above 1 the sun never rises (polar night), below −1 it never sets (midnight sun). Both show up in this table at 70°N in June and December, and those cells carry no clock times.',
    'El ángulo horario H con el que el sol llega al horizonte sale de cos H = −tan(latitud) × tan(declinación). El cielo gira 15° por hora, así que el día dura 2H ÷ 15 horas, la salida cae H ÷ 15 horas antes del mediodía y la puesta otro tanto después. Que |cos H| pase de 1 no es un error de cálculo, es la respuesta: por encima de 1 el sol no sale (noche polar) y por debajo de −1 no se pone (sol de medianoche). Ambos aparecen aquí a 70° N en junio y en diciembre, y esas casillas no llevan horas.',
    'O ângulo horário H com que o sol chega ao horizonte sai de cos H = −tan(latitude) × tan(declinação). O céu gira 15° por hora, então o dia dura 2H ÷ 15 horas, o nascer fica H ÷ 15 horas antes do meio-dia e o pôr o mesmo tanto depois. Se |cos H| passa de 1 não houve erro de cálculo: acima de 1 o sol não nasce (noite polar) e abaixo de −1 não se põe (sol da meia-noite). Os dois aparecem aqui a 70° N em junho e dezembro, e essas casas não trazem horários.',
    '太陽が地平線に届くときの時角Hは、cos H = −tan(緯度) × tan(赤緯)から出ます。空は1時間に15度回るので昼の長さは2H ÷ 15時間、日の出は正午よりH ÷ 15時間前、日の入りは同じだけ後です。|cos H|が1を超えるのは計算が壊れたのではなく、それが答えです — 1より大きければ日が出ない極夜、−1より小さければ日が沈まない白夜です。この表では北緯70度の6月と12月に実際に現れ、そのマスには時刻を書きません。',
    'Der Stundenwinkel H, bei dem die Sonne den Horizont trifft, folgt aus cos H = −tan(Breite) × tan(Deklination). Der Himmel dreht sich 15° pro Stunde, also dauert der Tag 2H ÷ 15 Stunden, der Aufgang liegt H ÷ 15 Stunden vor Mittag und der Untergang ebenso danach. Wenn |cos H| über 1 geht, ist nicht die Rechnung kaputt — das ist die Antwort: über 1 geht die Sonne nicht auf (Polarnacht), unter −1 nicht unter (Mitternachtssonne). Beides tritt hier auf 70° N im Juni und im Dezember auf, und diese Felder nennen keine Uhrzeit.',
    'L’angle horaire H auquel le soleil atteint l’horizon vient de cos H = −tan(latitude) × tan(déclinaison). Le ciel tourne de 15° par heure : le jour dure donc 2H ÷ 15 heures, le lever tombe H ÷ 15 heures avant midi et le coucher autant après. Quand |cos H| dépasse 1, le calcul n’est pas cassé — c’est la réponse : au-dessus de 1 le soleil ne se lève pas (nuit polaire), en dessous de −1 il ne se couche pas (soleil de minuit). Les deux apparaissent ici à 70° N en juin et en décembre, et ces cases ne donnent aucune heure.',
    'सूर्य क्षितिज पर जिस घंटा-कोण H पर पहुँचता है वह cos H = −tan(अक्षांश) × tan(क्रांति) से मिलता है। आकाश हर घंटे 15° घूमता है, इसलिए दिन 2H ÷ 15 घंटे चलता है, सूर्योदय दोपहर से H ÷ 15 घंटे पहले और सूर्यास्त उतना ही बाद। |cos H| का 1 से बढ़ जाना गणना की ख़राबी नहीं, वही उत्तर है — 1 से ऊपर सूर्य उगता ही नहीं (ध्रुवीय रात), −1 से नीचे डूबता ही नहीं (आधी रात का सूरज)। दोनों इस तालिका में 70° उत्तर पर जून और दिसंबर में आते हैं, और उन ख़ानों में कोई समय नहीं लिखा जाता।',
    '太阳到达地平线时的时角 H 由 cos H = −tan(纬度) × tan(赤纬) 得出。天空每小时转 15°，所以白天长 2H ÷ 15 小时，日出在正午前 H ÷ 15 小时，日落在正午后同样时间。|cos H| 超过 1 并不是算错了，那本身就是答案 — 大于 1 是太阳不升的极夜，小于 −1 是太阳不落的极昼。这两种情况在本表北纬 70° 的 6 月和 12 月真的出现，那些格子里不写时刻。',
    '太陽到達地平線時的時角 H 由 cos H = −tan(緯度) × tan(赤緯) 得出。天空每小時轉 15°，所以白天長 2H ÷ 15 小時，日出在正午前 H ÷ 15 小時，日落在正午後同樣時間。|cos H| 超過 1 並不是算錯了，那本身就是答案 — 大於 1 是太陽不升的極夜，小於 −1 是太陽不落的極晝。這兩種情況在本表北緯 70° 的 6 月和 12 月真的出現，那些格子裡不寫時刻。',
  ),

  shadowTitle: T(
    '그림자 길이는 고도의 탄젠트로 되짚는다',
    'A shadow is the tangent of the altitude, read backwards',
    'La sombra es la tangente de la altura, leída al revés',
    'A sombra é a tangente da altura, lida ao contrário',
    '影の長さは高度のタンジェントで戻せる',
    'Der Schatten ist der Tangens der Höhe, rückwärts gelesen',
    'L’ombre est la tangente de la hauteur, lue à l’envers',
    'छाया ऊँचाई के टैंजेंट को उलटकर पढ़ना है',
    '影子长度是高度的正切反过来读',
    '影子長度是高度的正切反過來讀',
  ),
  shadowNote: T(
    '정오의 태양 고도가 h면 높이 1m 막대의 그림자는 1 ÷ tan h 미터입니다. 거꾸로 그림자를 재면 고도가 나오고, 고도에서 날짜나 위도를 되짚을 수도 있습니다 — 에라토스테네스가 기원전에 지구 둘레를 잰 방법이 그것입니다. 고도가 낮아질수록 그림자는 빠르게 길어집니다. 고도 45°에서 그림자는 키와 같고, 30°에서 1.7배, 5°에서는 11배가 넘습니다.',
    'If the noon altitude is h, a pole 1 m tall casts 1 ÷ tan h metres of shadow. Measure the shadow instead and the altitude falls out, and from the altitude you can work back to a date or a latitude — that is how Eratosthenes measured the earth in antiquity. Shadows stretch fast as the sun drops: at 45° the shadow equals the height, at 30° it is 1.7 times as long, and at 5° more than eleven times.',
    'Si la altura al mediodía es h, un poste de 1 m proyecta 1 ÷ tan h metros de sombra. Al revés, medir la sombra da la altura, y de la altura se puede volver a la fecha o a la latitud: así midió Eratóstenes la Tierra en la antigüedad. La sombra se alarga rápido cuando el sol baja: a 45° iguala la altura, a 30° es 1,7 veces y a 5° pasa de once veces.',
    'Se a altura ao meio-dia é h, uma vara de 1 m projeta 1 ÷ tan h metros de sombra. Ao contrário, medir a sombra dá a altura, e da altura se volta à data ou à latitude: foi assim que Eratóstenes mediu a Terra na antiguidade. A sombra se alonga rápido quando o sol baixa: a 45° iguala a altura, a 30° é 1,7 vezes e a 5° passa de onze vezes.',
    '南中高度がhなら、高さ1mの棒の影は1 ÷ tan h メートルです。逆に影を測れば高度が出て、高度から日付や緯度をたどることもできます — エラトステネスが紀元前に地球の大きさを測ったのがこれです。高度が下がると影は急に伸びます。45度で影は高さと同じ、30度で1.7倍、5度では11倍を超えます。',
    'Ist die Mittagshöhe h, wirft ein 1 m hoher Stab 1 ÷ tan h Meter Schatten. Umgekehrt liefert der gemessene Schatten die Höhe, und aus der Höhe lässt sich auf Datum oder Breite zurückrechnen — so hat Eratosthenes in der Antike die Erde gemessen. Sinkt die Sonne, wächst der Schatten schnell: bei 45° gleicht er der Höhe, bei 30° ist er 1,7-fach, bei 5° mehr als elffach.',
    'Si la hauteur à midi vaut h, un piquet de 1 m projette 1 ÷ tan h mètres d’ombre. À l’inverse, mesurer l’ombre donne la hauteur, et de la hauteur on remonte à une date ou à une latitude : c’est ainsi qu’Ératosthène a mesuré la Terre dans l’Antiquité. L’ombre s’allonge vite quand le soleil descend : à 45° elle égale la hauteur, à 30° elle vaut 1,7 fois, à 5° plus de onze fois.',
    'दोपहर की ऊँचाई h हो तो 1 m ऊँचे डंडे की छाया 1 ÷ tan h मीटर होती है। उलटा करें — छाया नापें तो ऊँचाई मिल जाती है, और ऊँचाई से तारीख़ या अक्षांश तक लौटा जा सकता है; इसी तरह एरैटोस्थनीज़ ने ईसा-पूर्व पृथ्वी नापी थी। सूर्य नीचा होते ही छाया तेज़ी से बढ़ती है: 45° पर छाया ऊँचाई के बराबर, 30° पर 1.7 गुना और 5° पर ग्यारह गुना से ज़्यादा।',
    '若正午太阳高度为 h，高 1 米的杆子影长 1 ÷ tan h 米。反过来，量影子就能得到高度，再从高度推回日期或纬度 — 埃拉托色尼在公元前就是这样量出地球周长的。太阳越低，影子拉长得越快：45° 时影长等于高度，30° 时是 1.7 倍，5° 时超过十一倍。',
    '若正午太陽高度為 h，高 1 公尺的桿子影長 1 ÷ tan h 公尺。反過來，量影子就能得到高度，再從高度推回日期或緯度 — 埃拉托斯特尼在公元前就是這樣量出地球周長的。太陽越低，影子拉長得越快：45° 時影長等於高度，30° 時是 1.7 倍，5° 時超過十一倍。',
  ),

  approxTitle: T(
    '어디까지가 어림인가',
    'What this leaves out',
    'Qué deja fuera este cálculo',
    'O que este cálculo deixa de fora',
    'どこまでが目安か',
    'Was hier fehlt',
    'Ce que ce calcul laisse de côté',
    'यह हिसाब क्या छोड़ देता है',
    '哪些部分只是估算',
    '哪些部分只是估算',
  ),
  approxNote: T(
    '이 표는 태양의 중심이 기하학적인 지평선(고도 0°)을 지나는 때를 일출로 봅니다. 실제 규약은 대기 굴절과 태양의 반지름을 더해 −0.833°를 쓰므로, 중위도에서는 낮이 8~10분쯤 더 깁니다. 시각은 진태양시라, 시계 시각으로 옮기려면 균시차(±16분), 표준시와 경도의 차이, 서머타임을 더해야 합니다. 적위 근사식 자체에 1.5° 안의 오차가 있고, 윤년은 세지 않아 3월 이후 날짜는 하루가 밀립니다. 관측자의 고도, 산과 건물이 지평선을 가리는 것도 넣지 않았습니다.',
    'Sunrise here means the centre of the sun crossing the geometric horizon, an altitude of 0°. The usual convention adds refraction and the sun’s own radius and uses −0.833°, which makes the day 8 to 10 minutes longer at mid-latitudes. The clock is apparent solar time: to reach civil time you still have to add the equation of time (±16 minutes), the gap between your longitude and your time zone, and any summer time. The declination formula carries an error of up to 1.5°, leap years are not counted, so dates after February sit one day out, and neither the observer’s elevation nor hills and buildings on the horizon are in here.',
    'Aquí la salida del sol es el centro del disco cruzando el horizonte geométrico, altura 0°. El convenio habitual añade la refracción y el radio solar y usa −0,833°, lo que alarga el día entre 8 y 10 minutos en latitudes medias. El reloj es tiempo solar aparente: para llegar al tiempo civil hay que sumar la ecuación del tiempo (±16 minutos), la diferencia entre tu longitud y tu huso, y el horario de verano. La fórmula de la declinación tiene un error de hasta 1,5°, no se cuentan los años bisiestos —las fechas posteriores a febrero quedan un día corridas— y no entran la altitud del observador ni los cerros y edificios del horizonte.',
    'Aqui o nascer do sol é o centro do disco cruzando o horizonte geométrico, altura 0°. A convenção usual soma a refração e o raio solar e usa −0,833°, o que alonga o dia de 8 a 10 minutos em latitudes médias. O relógio é tempo solar aparente: para chegar ao tempo civil ainda é preciso somar a equação do tempo (±16 minutos), a diferença entre a sua longitude e o seu fuso, e o horário de verão. A fórmula da declinação carrega erro de até 1,5°, os anos bissextos não são contados — datas depois de fevereiro ficam um dia deslocadas — e não entram a altitude do observador nem morros e prédios no horizonte.',
    'この表は太陽の中心が幾何学的な地平線(高度0度)を通る瞬間を日の出とします。実際の規約は大気差と太陽の半径を足して−0.833度を使うので、中緯度では昼が8~10分ほど長くなります。時刻は真太陽時なので、時計の時刻にするには均時差(±16分)、標準時と経度の差、夏時間を足す必要があります。赤緯の近似式そのものに1.5度以内の誤差があり、閏年を数えないため3月以降の日付は一日ずれます。観測者の高度、山や建物が地平線を隠すことも入れていません。',
    'Aufgang heißt hier: die Sonnenmitte kreuzt den geometrischen Horizont, Höhe 0°. Die übliche Konvention rechnet Refraktion und Sonnenradius dazu und nimmt −0,833°, was den Tag in mittleren Breiten 8 bis 10 Minuten länger macht. Die Uhr ist wahre Sonnenzeit: bis zur bürgerlichen Zeit fehlen noch die Zeitgleichung (±16 Minuten), der Abstand zwischen Länge und Zeitzone sowie die Sommerzeit. Die Deklinationsformel hat einen Fehler von bis zu 1,5°, Schaltjahre werden nicht gezählt — Daten nach Februar liegen einen Tag daneben —, und Höhe des Beobachters, Berge und Häuser am Horizont fehlen ebenso.',
    'Ici, le lever est le centre du soleil traversant l’horizon géométrique, hauteur 0°. La convention usuelle ajoute la réfraction et le rayon solaire et retient −0,833°, ce qui allonge le jour de 8 à 10 minutes aux latitudes moyennes. L’heure est le temps solaire vrai : pour l’heure légale, il reste à ajouter l’équation du temps (±16 minutes), l’écart entre votre longitude et votre fuseau, et l’heure d’été. La formule de la déclinaison porte une erreur allant jusqu’à 1,5°, les années bissextiles ne sont pas comptées — les dates après février sont décalées d’un jour — et ni l’altitude de l’observateur ni les reliefs et bâtiments à l’horizon ne sont pris en compte.',
    'यहाँ सूर्योदय का अर्थ है सूर्य का केंद्र ज्यामितीय क्षितिज (ऊँचाई 0°) पार करना। प्रचलित परिपाटी वायुमंडलीय अपवर्तन और सूर्य की त्रिज्या जोड़कर −0.833° लेती है, जिससे मध्य अक्षांशों पर दिन 8 से 10 मिनट लंबा हो जाता है। समय वास्तविक सौर समय है: घड़ी के समय तक पहुँचने के लिए समय समीकरण (±16 मिनट), आपके देशांतर और समय-क्षेत्र का अंतर, और डेलाइट सेविंग जोड़ना पड़ेगा। क्रांति के सूत्र में 1.5° तक की त्रुटि है, लीप वर्ष नहीं गिना गया इसलिए फ़रवरी के बाद की तारीख़ें एक दिन खिसकी हैं, और पर्यवेक्षक की ऊँचाई या क्षितिज पर पहाड़-इमारतें भी शामिल नहीं हैं।',
    '本表把太阳中心经过几何地平线（高度 0°）的时刻当作日出。通行的规约把大气折射和太阳半径算进去，用 −0.833°，这会让中纬度的白天多出 8 到 10 分钟。时刻是真太阳时：要换成钟表时间，还得加上时差方程（±16 分钟）、你所在经度与时区的差、以及夏令时。赤纬近似式本身有 1.5° 以内的误差，闰年没有计入，所以 2 月之后的日期会错一天；观测者的海拔、挡住地平线的山和建筑也都没有算。',
    '本表把太陽中心經過幾何地平線（高度 0°）的時刻當作日出。通行的規約把大氣折射和太陽半徑算進去，用 −0.833°，這會讓中緯度的白天多出 8 到 10 分鐘。時刻是真太陽時：要換成鐘錶時間，還得加上時差方程（±16 分鐘）、你所在經度與時區的差、以及夏令時。赤緯近似式本身有 1.5° 以內的誤差，閏年沒有計入，所以 2 月之後的日期會錯一天；觀測者的海拔、擋住地平線的山和建築也都沒有算。',
  ),

  uvTitle: T(
    '해가 높으면 자외선도 세진다',
    'A high sun is a strong sun',
    'Un sol alto es un sol fuerte',
    'Um sol alto é um sol forte',
    '太陽が高いと紫外線も強い',
    'Eine hohe Sonne ist eine starke Sonne',
    'Un soleil haut est un soleil fort',
    'ऊँचा सूर्य तेज़ सूर्य होता है',
    '太阳越高，紫外线越强',
    '太陽越高，紫外線越強',
  ),
  uvNote: T(
    '태양이 높이 뜨면 햇빛이 지나오는 대기가 얇아져 자외선이 세집니다. 그래서 그림자가 키보다 짧은 시간대가 대개 자외선이 가장 센 때입니다 — 화상까지 걸리는 시간은 자외선 지수와 피부 타입으로 갈립니다.',
    'The higher the sun, the less air its light passes through, and the stronger the ultraviolet. As a rule of thumb, when your shadow is shorter than you are, the ultraviolet is near its peak for the day — how long skin lasts before it reddens depends on the index and the skin type.',
    'Cuanto más alto está el sol, menos aire atraviesa su luz y más fuerte es el ultravioleta. Como regla, cuando tu sombra es más corta que tu altura el ultravioleta está cerca de su máximo del día: cuánto tarda la piel en enrojecer depende del índice y del tipo de piel.',
    'Quanto mais alto o sol, menos ar a sua luz atravessa e mais forte é o ultravioleta. Como regra, quando a sua sombra é mais curta que você, o ultravioleta está perto do máximo do dia: quanto a pele demora a avermelhar depende do índice e do tipo de pele.',
    '太陽が高く昇ると光が通る大気が薄くなり、紫外線が強くなります。目安として、影が身長より短い時間帯はその日の紫外線がほぼ最も強いときです — 肌が赤くなるまでの時間は指数と肌タイプで変わります。',
    'Je höher die Sonne, desto weniger Luft durchquert ihr Licht und desto stärker die Ultraviolettstrahlung. Als Faustregel: Ist der eigene Schatten kürzer als die Körpergröße, liegt die UV-Stärke nahe am Tagesmaximum — wie lange die Haut braucht, bis sie rot wird, hängt vom Index und vom Hauttyp ab.',
    'Plus le soleil est haut, moins sa lumière traverse d’air et plus l’ultraviolet est fort. En règle générale, quand votre ombre est plus courte que vous, l’ultraviolet est proche de son maximum du jour : le temps que met la peau à rougir dépend de l’indice et du type de peau.',
    'सूर्य जितना ऊँचा, उसकी रोशनी उतनी कम हवा से गुज़रती है और पराबैंगनी उतनी तेज़। मोटे तौर पर, जब आपकी छाया आपकी लंबाई से छोटी हो तब उस दिन की पराबैंगनी लगभग सबसे तेज़ होती है — त्वचा कितनी देर में लाल होगी यह सूचकांक और त्वचा के प्रकार से तय होता है।',
    '太阳越高，阳光穿过的大气越薄，紫外线就越强。有个粗略的判断：影子比身高短的时段，大致就是当天紫外线最强的时候 — 皮肤多久会晒红，取决于紫外线指数和皮肤类型。',
    '太陽越高，陽光穿過的大氣越薄，紫外線就越強。有個粗略的判斷：影子比身高短的時段，大致就是當天紫外線最強的時候 — 皮膚多久會曬紅，取決於紫外線指數和皮膚類型。',
  ),
  uvLink: T(
    '자외선 화상 시간 보기',
    'See burn times by UV index',
    'Ver tiempos de quemadura por índice UV',
    'Ver tempos de queimadura por índice UV',
    '紫外線と日焼け時間を見る',
    'Verbrennungszeiten nach UV-Index',
    'Voir les temps de brûlure selon l’indice UV',
    'यूवी सूचकांक के अनुसार जलने का समय देखें',
    '查看紫外线晒伤时间',
    '查看紫外線曬傷時間',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के खाने', '相邻组合', '相鄰組合'),
  latRowTitle: T('같은 위도의 다른 날짜', 'Same latitude, other dates', 'Misma latitud, otras fechas', 'Mesma latitude, outras datas', '同じ緯度の他の日付', 'Gleiche Breite, andere Daten', 'Même latitude, autres dates', 'वही अक्षांश, दूसरी तारीख़ें', '同一纬度的其他日期', '同一緯度的其他日期'),
  dateRowTitle: T('같은 날짜의 다른 위도', 'Same date, other latitudes', 'Misma fecha, otras latitudes', 'Mesma data, outras latitudes', '同じ日付の他の緯度', 'Gleiches Datum, andere Breiten', 'Même date, autres latitudes', 'वही तारीख़, दूसरे अक्षांश', '同一日期的其他纬度', '同一日期的其他緯度'),

  desc: T<(f: SunFacts) => string>(
    f => `${cellName('ko', f)}의 정오 태양 고도는 ${f.noonAltitude}°이고 낮 길이는 ${dayLengthText('ko', f)}입니다. 그날 적위 ${f.declination}°와 위도를 90° − |위도 − 적위|에 넣어 나온 값이며, 시각은 대기 굴절과 균시차를 넣지 않은 진태양시입니다.`,
    f => `At ${cellName('en', f)} the noon sun stands ${f.noonAltitude}° above the horizon and the day runs ${dayLengthText('en', f)}. That altitude is 90° − |latitude − declination| with a declination of ${f.declination}° for the date, and the times are apparent solar time — no refraction, no equation of time.`,
    f => `En ${cellName('es', f)} el sol del mediodía se alza ${nc(f.noonAltitude)}° sobre el horizonte y el día dura ${dayLengthText('es', f)}. Esa altura es 90° − |latitud − declinación| con una declinación de ${nc(f.declination)}° para la fecha, y las horas son tiempo solar aparente, sin refracción ni ecuación del tiempo.`,
    f => `Em ${cellName('pt', f)} o sol do meio-dia sobe ${nc(f.noonAltitude)}° acima do horizonte e o dia dura ${dayLengthText('pt', f)}. Essa altura é 90° − |latitude − declinação| com declinação de ${nc(f.declination)}° para a data, e os horários são tempo solar aparente, sem refração nem equação do tempo.`,
    f => `${cellName('ja', f)}の南中高度は${f.noonAltitude}度、昼の長さは${dayLengthText('ja', f)}です。その日の赤緯${f.declination}度と緯度を90° − |緯度 − 赤緯|に入れた値で、時刻は大気差と均時差を入れていない真太陽時です。`,
    f => `Auf ${cellName('de', f)} steht die Mittagssonne ${nc(f.noonAltitude)}° über dem Horizont, und der Tag dauert ${dayLengthText('de', f)}. Diese Höhe ist 90° − |Breite − Deklination| bei einer Deklination von ${nc(f.declination)}° für dieses Datum; die Zeiten sind wahre Sonnenzeit, ohne Refraktion und ohne Zeitgleichung.`,
    f => `À ${cellName('fr', f)}, le soleil de midi culmine à ${nc(f.noonAltitude)}° au-dessus de l’horizon et le jour dure ${dayLengthText('fr', f)}. Cette hauteur vaut 90° − |latitude − déclinaison| pour une déclinaison de ${nc(f.declination)}° à cette date, et les heures sont en temps solaire vrai, sans réfraction ni équation du temps.`,
    f => `${cellName('hi', f)} पर दोपहर का सूर्य क्षितिज से ${f.noonAltitude}° ऊपर रहता है और दिन ${dayLengthText('hi', f)} चलता है। यह ऊँचाई 90° − |अक्षांश − क्रांति| है, उस तारीख़ की क्रांति ${f.declination}° के साथ; समय वास्तविक सौर समय है — अपवर्तन और समय समीकरण के बिना।`,
    f => `${cellName('zh', f)} 的正午太阳高度是 ${f.noonAltitude}°，白天长 ${dayLengthText('zh', f)}。这个高度是 90° − |纬度 − 赤纬|，当天赤纬为 ${f.declination}°；时刻是真太阳时，没有计入大气折射和时差方程。`,
    f => `${cellName('tw', f)} 的正午太陽高度是 ${f.noonAltitude}°，白天長 ${dayLengthText('tw', f)}。這個高度是 90° − |緯度 − 赤緯|，當天赤緯為 ${f.declination}°；時刻是真太陽時，沒有計入大氣折射和時差方程。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '적위 δ = 23.44° × sin(360° × (284 + N) ÷ 365)이고, N은 1월 1일부터 센 날 수입니다.',
      '정오의 태양 고도 = 90° − |위도 − 적위|. 하지에 북반구 위도 φ에서는 90° − φ + 23.44°입니다.',
      '낮 길이 = 2H ÷ 15시간, cos H = −tan(위도) × tan(적위). |cos H|가 1을 넘으면 백야나 극야입니다.',
      '그림자 길이 = 물체 높이 ÷ tan(고도). 시각은 진태양시이고 대기 굴절과 균시차는 넣지 않았습니다.',
    ],
    [
      'Declination δ = 23.44° × sin(360° × (284 + N) ÷ 365), where N counts the days from 1 January.',
      'Noon altitude = 90° − |latitude − declination|; at the June solstice that is 90° − φ + 23.44° in the north.',
      'Length of day = 2H ÷ 15 hours with cos H = −tan(latitude) × tan(declination); beyond |cos H| = 1 lies polar day or night.',
      'Shadow = height ÷ tan(altitude). Times are apparent solar time, with refraction and the equation of time left out.',
    ],
    [
      'Declinación δ = 23,44° × sin(360° × (284 + N) ÷ 365), donde N cuenta los días desde el 1 de enero.',
      'Altura al mediodía = 90° − |latitud − declinación|; en el solsticio de junio son 90° − φ + 23,44° en el norte.',
      'Duración del día = 2H ÷ 15 horas con cos H = −tan(latitud) × tan(declinación); más allá de |cos H| = 1 hay día o noche polar.',
      'Sombra = altura ÷ tan(altura solar). Las horas son tiempo solar aparente, sin refracción ni ecuación del tiempo.',
    ],
    [
      'Declinação δ = 23,44° × sin(360° × (284 + N) ÷ 365), com N contando os dias desde 1 de janeiro.',
      'Altura ao meio-dia = 90° − |latitude − declinação|; no solstício de junho são 90° − φ + 23,44° no norte.',
      'Duração do dia = 2H ÷ 15 horas com cos H = −tan(latitude) × tan(declinação); além de |cos H| = 1 há dia ou noite polar.',
      'Sombra = altura ÷ tan(altura solar). Os horários são tempo solar aparente, sem refração nem equação do tempo.',
    ],
    [
      '赤緯δ = 23.44° × sin(360° × (284 + N) ÷ 365)、Nは1月1日から数えた日数です。',
      '南中高度 = 90° − |緯度 − 赤緯|。夏至の北半球の緯度φでは90° − φ + 23.44°です。',
      '昼の長さ = 2H ÷ 15時間、cos H = −tan(緯度) × tan(赤緯)。|cos H|が1を超えると白夜か極夜です。',
      '影の長さ = 物体の高さ ÷ tan(高度)。時刻は真太陽時で、大気差と均時差は入れていません。',
    ],
    [
      'Deklination δ = 23,44° × sin(360° × (284 + N) ÷ 365), wobei N die Tage ab dem 1. Januar zählt.',
      'Mittagshöhe = 90° − |Breite − Deklination|; zur Junisonnenwende sind das im Norden 90° − φ + 23,44°.',
      'Tageslänge = 2H ÷ 15 Stunden mit cos H = −tan(Breite) × tan(Deklination); jenseits von |cos H| = 1 liegt Polartag oder Polarnacht.',
      'Schatten = Höhe ÷ tan(Sonnenhöhe). Die Zeiten sind wahre Sonnenzeit, ohne Refraktion und Zeitgleichung.',
    ],
    [
      'Déclinaison δ = 23,44° × sin(360° × (284 + N) ÷ 365), où N compte les jours depuis le 1er janvier.',
      'Hauteur à midi = 90° − |latitude − déclinaison| ; au solstice de juin, cela fait 90° − φ + 23,44° dans l’hémisphère nord.',
      'Durée du jour = 2H ÷ 15 heures avec cos H = −tan(latitude) × tan(déclinaison) ; au-delà de |cos H| = 1, c’est le jour ou la nuit polaire.',
      'Ombre = hauteur ÷ tan(hauteur du soleil). Les heures sont en temps solaire vrai, sans réfraction ni équation du temps.',
    ],
    [
      'क्रांति δ = 23.44° × sin(360° × (284 + N) ÷ 365), जहाँ N 1 जनवरी से गिने दिन हैं।',
      'दोपहर की ऊँचाई = 90° − |अक्षांश − क्रांति|; जून संक्रांति पर उत्तर में यह 90° − φ + 23.44° है।',
      'दिन की लंबाई = 2H ÷ 15 घंटे, जहाँ cos H = −tan(अक्षांश) × tan(क्रांति); |cos H| के 1 पार जाने पर ध्रुवीय दिन या रात।',
      'छाया = ऊँचाई ÷ tan(सूर्य ऊँचाई)। समय वास्तविक सौर समय है, अपवर्तन और समय समीकरण के बिना।',
    ],
    [
      '赤纬 δ = 23.44° × sin(360° × (284 + N) ÷ 365)，其中 N 是从 1 月 1 日起算的天数。',
      '正午太阳高度 = 90° − |纬度 − 赤纬|；夏至时北半球纬度 φ 处为 90° − φ + 23.44°。',
      '白天长度 = 2H ÷ 15 小时，cos H = −tan(纬度) × tan(赤纬)；|cos H| 超过 1 就是极昼或极夜。',
      '影长 = 物体高度 ÷ tan(高度)。时刻是真太阳时，未计入大气折射与时差方程。',
    ],
    [
      '赤緯 δ = 23.44° × sin(360° × (284 + N) ÷ 365)，其中 N 是從 1 月 1 日起算的天數。',
      '正午太陽高度 = 90° − |緯度 − 赤緯|；夏至時北半球緯度 φ 處為 90° − φ + 23.44°。',
      '白天長度 = 2H ÷ 15 小時，cos H = −tan(緯度) × tan(赤緯)；|cos H| 超過 1 就是極晝或極夜。',
      '影長 = 物體高度 ÷ tan(高度)。時刻是真太陽時，未計入大氣折射與時差方程。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '태양 고도와 낮 길이 표 224칸 — 위도·날짜별 계산',
    'Sun altitude and daylight table — 224 latitude and date pairings',
    'Tabla de altura solar y luz diurna — 224 cruces de latitud y fecha',
    'Tabela de altura do sol e luz do dia — 224 cruzamentos de latitude e data',
    '太陽高度と昼の長さの表224マス — 緯度と日付で計算',
    'Tabelle für Sonnenhöhe und Tageslänge — 224 Paarungen aus Breite und Datum',
    'Table de hauteur du soleil et de durée du jour — 224 croisements latitude-date',
    'सूर्य ऊँचाई और दिन की लंबाई की तालिका — अक्षांश और तारीख़ के 224 जोड़',
    '太阳高度与白天长度表 224 格 — 按纬度和日期计算',
    '太陽高度與白天長度表 224 格 — 按緯度和日期計算',
  ),
  hubMetaDesc: T(
    '남위 60°부터 북위 70°까지 위도 14가지와 절기 넷·매달 15일 열둘이 만나는 224칸. 적위, 정오의 태양 고도, 낮 길이, 태양시 일출·일몰, 1m 막대의 그림자 길이를 계산하고 고위도의 백야·극야도 그대로 냅니다.',
    'The 224 pairings of 14 latitudes from 60°S to 70°N with four solstices and equinoxes plus the 15th of every month: declination, noon altitude, length of day, sunrise and sunset in solar time, the shadow of a 1 m pole, and the polar day and night that really occur at high latitudes.',
    'Los 224 cruces de 14 latitudes de 60° S a 70° N con los cuatro solsticios y equinoccios y el día 15 de cada mes: declinación, altura al mediodía, duración del día, salida y puesta en tiempo solar, sombra de un poste de 1 m y el día y la noche polares que de verdad ocurren en latitudes altas.',
    'Os 224 cruzamentos de 14 latitudes de 60° S a 70° N com os quatro solstícios e equinócios e o dia 15 de cada mês: declinação, altura ao meio-dia, duração do dia, nascer e pôr do sol em tempo solar, sombra de uma vara de 1 m e o dia e a noite polares que realmente acontecem em latitudes altas.',
    '南緯60度から北緯70度まで緯度14種と、二至二分および毎月15日の16日付が交わる224マス。赤緯・南中高度・昼の長さ・真太陽時の日の出と日の入り・1mの棒の影の長さを計算し、高緯度の白夜と極夜もそのまま示します。',
    'Die 224 Paarungen aus 14 Breiten von 60° S bis 70° N mit den vier Sonnenwenden und Äquinoktien sowie dem 15. jedes Monats: Deklination, Mittagshöhe, Tageslänge, Auf- und Untergang in Sonnenzeit, Schatten eines 1-m-Stabs und der Polartag und die Polarnacht, die in hohen Breiten wirklich vorkommen.',
    'Les 224 croisements de 14 latitudes de 60° S à 70° N avec les quatre solstices et équinoxes et le 15 de chaque mois : déclinaison, hauteur à midi, durée du jour, lever et coucher en temps solaire, ombre d’un piquet de 1 m, et le jour et la nuit polaires qui se produisent vraiment aux hautes latitudes.',
    '60° दक्षिण से 70° उत्तर तक 14 अक्षांश और चार संक्रांति-विषुव के साथ हर महीने की 15 तारीख़ — कुल 224 जोड़: क्रांति, दोपहर की ऊँचाई, दिन की लंबाई, सौर समय में सूर्योदय-सूर्यास्त, 1 m डंडे की छाया, और ऊँचे अक्षांशों पर सचमुच होने वाले ध्रुवीय दिन और रात।',
    '南纬 60° 到北纬 70° 共 14 种纬度，与二至二分及每月 15 日共 16 个日期组成的 224 格：赤纬、正午太阳高度、白天长度、真太阳时的日出日落、1 米杆的影长，以及高纬度真会出现的极昼与极夜。',
    '南緯 60° 到北緯 70° 共 14 種緯度，與二至二分及每月 15 日共 16 個日期組成的 224 格：赤緯、正午太陽高度、白天長度、真太陽時的日出日落、1 公尺桿的影長，以及高緯度真會出現的極晝與極夜。',
  ),

  metaTitle: T<(f: SunFacts) => string>(
    f => `${cellName('ko', f)} — 정오 고도 ${f.noonAltitude}°, 낮 ${dayLengthText('ko', f)}`,
    f => `${cellName('en', f)} — noon altitude ${f.noonAltitude}°, daylight ${dayLengthText('en', f)}`,
    f => `${cellName('es', f)} — altura al mediodía ${nc(f.noonAltitude)}°, luz ${dayLengthText('es', f)}`,
    f => `${cellName('pt', f)} — altura ao meio-dia ${nc(f.noonAltitude)}°, luz ${dayLengthText('pt', f)}`,
    f => `${cellName('ja', f)} — 南中高度${f.noonAltitude}度、昼${dayLengthText('ja', f)}`,
    f => `${cellName('de', f)} — Mittagshöhe ${nc(f.noonAltitude)}°, Tageslicht ${dayLengthText('de', f)}`,
    f => `${cellName('fr', f)} — hauteur à midi ${nc(f.noonAltitude)}°, jour ${dayLengthText('fr', f)}`,
    f => `${cellName('hi', f)} — दोपहर की ऊँचाई ${f.noonAltitude}°, दिन ${dayLengthText('hi', f)}`,
    f => `${cellName('zh', f)} — 正午高度 ${f.noonAltitude}°，白天 ${dayLengthText('zh', f)}`,
    f => `${cellName('tw', f)} — 正午高度 ${f.noonAltitude}°，白天 ${dayLengthText('tw', f)}`,
  ),

  metaDesc: T<(f: SunFacts) => string>(
    f => `${cellName('ko', f)} — 정오의 태양 고도 ${f.noonAltitude}°, 낮 길이 ${dayLengthText('ko', f)}, 태양시 일출·일몰 ${riseSetText('ko', f)}, 높이 1m 막대의 정오 그림자 ${shadowText('ko', f)}. 그날 적위는 ${f.declination}°(그 해 ${f.n}번째 날)이고, 대기 굴절과 균시차를 넣지 않은 어림입니다.`,
    f => `${cellName('en', f)} — noon altitude ${f.noonAltitude}°, length of day ${dayLengthText('en', f)}, sunrise and sunset in solar time ${riseSetText('en', f)}, noon shadow of a 1 m pole ${shadowText('en', f)}. The declination is ${f.declination}° on day ${f.n} of the year, and refraction and the equation of time are left out.`,
    f => `${cellName('es', f)} — altura al mediodía ${nc(f.noonAltitude)}°, duración del día ${dayLengthText('es', f)}, salida y puesta en tiempo solar ${riseSetText('es', f)}, sombra al mediodía de un poste de 1 m ${shadowText('es', f)}. La declinación es ${nc(f.declination)}° en el día ${f.n} del año, sin refracción ni ecuación del tiempo.`,
    f => `${cellName('pt', f)} — altura ao meio-dia ${nc(f.noonAltitude)}°, duração do dia ${dayLengthText('pt', f)}, nascer e pôr do sol em tempo solar ${riseSetText('pt', f)}, sombra ao meio-dia de uma vara de 1 m ${shadowText('pt', f)}. A declinação é ${nc(f.declination)}° no dia ${f.n} do ano, sem refração nem equação do tempo.`,
    f => `${cellName('ja', f)} — 南中高度${f.noonAltitude}度、昼の長さ${dayLengthText('ja', f)}、真太陽時の日の出と日の入り${riseSetText('ja', f)}、高さ1mの棒の南中時の影${shadowText('ja', f)}。その日の赤緯は${f.declination}度(年内通日${f.n}日)で、大気差と均時差を入れていない目安です。`,
    f => `${cellName('de', f)} — Mittagshöhe ${nc(f.noonAltitude)}°, Tageslänge ${dayLengthText('de', f)}, Auf- und Untergang in Sonnenzeit ${riseSetText('de', f)}, Mittagsschatten eines 1-m-Stabs ${shadowText('de', f)}. Die Deklination beträgt ${nc(f.declination)}° am ${f.n}. Tag des Jahres, ohne Refraktion und ohne Zeitgleichung.`,
    f => `${cellName('fr', f)} — hauteur à midi ${nc(f.noonAltitude)}°, durée du jour ${dayLengthText('fr', f)}, lever et coucher en temps solaire ${riseSetText('fr', f)}, ombre de midi d’un piquet de 1 m ${shadowText('fr', f)}. La déclinaison vaut ${nc(f.declination)}° au jour ${f.n} de l’année, sans réfraction ni équation du temps.`,
    f => `${cellName('hi', f)} — दोपहर की ऊँचाई ${f.noonAltitude}°, दिन की लंबाई ${dayLengthText('hi', f)}, सौर समय में सूर्योदय-सूर्यास्त ${riseSetText('hi', f)}, 1 m डंडे की दोपहर की छाया ${shadowText('hi', f)}। साल के ${f.n}वें दिन क्रांति ${f.declination}° है, और अपवर्तन तथा समय समीकरण शामिल नहीं हैं।`,
    f => `${cellName('zh', f)} — 正午太阳高度 ${f.noonAltitude}°，白天长度 ${dayLengthText('zh', f)}，真太阳时的日出日落 ${riseSetText('zh', f)}，1 米杆的正午影长 ${shadowText('zh', f)}。当天（一年中第 ${f.n} 天）赤纬为 ${f.declination}°，未计入大气折射与时差方程。`,
    f => `${cellName('tw', f)} — 正午太陽高度 ${f.noonAltitude}°，白天長度 ${dayLengthText('tw', f)}，真太陽時的日出日落 ${riseSetText('tw', f)}，1 公尺桿的正午影長 ${shadowText('tw', f)}。當天（一年中第 ${f.n} 天）赤緯為 ${f.declination}°，未計入大氣折射與時差方程。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '낮 길이는 어떻게 계산하나요?', a: 'cos H = −tan(위도) × tan(적위)로 시간각 H를 구하고 2H ÷ 15시간을 하면 됩니다. 적위는 날짜에서 나오므로 위도와 날짜만 있으면 계산됩니다. 춘분과 추분에는 적위가 0에 가까워 어느 위도에서도 12시간에 가깝습니다.' },
      { q: '적도는 왜 늘 12시간인가요?', a: '위도 0에서는 tan(위도)가 0이라 적위가 얼마든 cos H = 0, 곧 H = 90°가 됩니다. 계절이 있어도 낮 길이는 12시간에서 거의 움직이지 않습니다 — 대기 굴절을 넣으면 몇 분 더 깁니다.' },
      { q: '이 표의 일출 시각을 시계에 맞춰 쓸 수 있나요?', a: '그대로는 안 됩니다. 진태양시라 균시차(±16분), 표준시와 경도의 차이, 서머타임을 더해야 합니다. 대기 굴절도 빠져 있어 실제 일출은 이 표보다 4~5분 이릅니다.' },
    ],
    [
      { q: 'How do I work out the length of a day?', a: 'Take cos H = −tan(latitude) × tan(declination) to get the hour angle H, then the day lasts 2H ÷ 15 hours. The declination comes from the date, so latitude and date are all you need. At the equinoxes the declination is near zero and every latitude gets close to twelve hours.' },
      { q: 'Why does the equator always get twelve hours?', a: 'At latitude 0 the tangent of the latitude is 0, so cos H = 0 whatever the declination, which puts H at 90°. The seasons come and go but the day barely moves from twelve hours — add refraction and it runs a few minutes longer.' },
      { q: 'Can I set my clock by these sunrise times?', a: 'Not directly. They are apparent solar time, so you still have to add the equation of time (±16 minutes), the gap between your longitude and your time zone, and summer time. Refraction is missing too, which makes the real sunrise 4 to 5 minutes earlier than shown.' },
    ],
    [
      { q: '¿Cómo se calcula la duración del día?', a: 'Con cos H = −tan(latitud) × tan(declinación) se obtiene el ángulo horario H, y el día dura 2H ÷ 15 horas. La declinación sale de la fecha, así que basta con la latitud y la fecha. En los equinoccios la declinación está cerca de cero y cualquier latitud ronda las doce horas.' },
      { q: '¿Por qué el ecuador tiene siempre doce horas?', a: 'En latitud 0 la tangente de la latitud es 0, así que cos H = 0 sea cual sea la declinación y H queda en 90°. Las estaciones pasan pero el día apenas se mueve de las doce horas: con refracción sale unos minutos más largo.' },
      { q: '¿Puedo poner el reloj con estas horas de salida?', a: 'No directamente. Son tiempo solar aparente, así que hay que sumar la ecuación del tiempo (±16 minutos), la diferencia entre tu longitud y tu huso horario y el horario de verano. Tampoco está la refracción, que adelanta la salida real de 4 a 5 minutos.' },
    ],
    [
      { q: 'Como se calcula a duração do dia?', a: 'Com cos H = −tan(latitude) × tan(declinação) sai o ângulo horário H, e o dia dura 2H ÷ 15 horas. A declinação vem da data, então basta latitude e data. Nos equinócios a declinação fica perto de zero e qualquer latitude chega perto de doze horas.' },
      { q: 'Por que o equador tem sempre doze horas?', a: 'Na latitude 0 a tangente da latitude é 0, então cos H = 0 seja qual for a declinação e H fica em 90°. As estações passam mas o dia quase não sai das doze horas: com refração fica alguns minutos mais longo.' },
      { q: 'Posso ajustar o relógio por estes horários?', a: 'Não diretamente. São tempo solar aparente, então falta somar a equação do tempo (±16 minutos), a diferença entre a sua longitude e o seu fuso e o horário de verão. A refração também está de fora, e ela adianta o nascer real em 4 a 5 minutos.' },
    ],
    [
      { q: '昼の長さはどう計算しますか。', a: 'cos H = −tan(緯度) × tan(赤緯)で時角Hを求め、2H ÷ 15時間とします。赤緯は日付から出るので、緯度と日付だけで計算できます。春分と秋分は赤緯が0に近く、どの緯度でも12時間に近づきます。' },
      { q: '赤道はなぜいつも12時間なのですか。', a: '緯度0ではtan(緯度)が0なので、赤緯がいくつでもcos H = 0、つまりH = 90度になります。季節はめぐっても昼の長さは12時間からほとんど動きません — 大気差を入れると数分長くなります。' },
      { q: 'この表の日の出時刻を時計に合わせて使えますか。', a: 'そのままでは使えません。真太陽時なので、均時差(±16分)、標準時と経度の差、夏時間を足す必要があります。大気差も抜けているため、実際の日の出はこの表より4~5分早いです。' },
    ],
    [
      { q: 'Wie berechnet man die Tageslänge?', a: 'Aus cos H = −tan(Breite) × tan(Deklination) folgt der Stundenwinkel H, und der Tag dauert 2H ÷ 15 Stunden. Die Deklination kommt aus dem Datum, also genügen Breite und Datum. Zu den Äquinoktien liegt die Deklination nahe null und jede Breite kommt auf etwa zwölf Stunden.' },
      { q: 'Warum hat der Äquator immer zwölf Stunden?', a: 'Auf Breite 0 ist der Tangens der Breite 0, also cos H = 0 bei jeder Deklination und H = 90°. Die Jahreszeiten wechseln, der Tag bleibt praktisch bei zwölf Stunden — mit Refraktion ein paar Minuten länger.' },
      { q: 'Kann ich meine Uhr nach diesen Zeiten stellen?', a: 'Nicht unmittelbar. Es ist wahre Sonnenzeit, dazu kommen noch Zeitgleichung (±16 Minuten), der Abstand zwischen Länge und Zeitzone und die Sommerzeit. Auch die Refraktion fehlt, die den wirklichen Aufgang 4 bis 5 Minuten früher legt.' },
    ],
    [
      { q: 'Comment calcule-t-on la durée du jour ?', a: 'On tire l’angle horaire H de cos H = −tan(latitude) × tan(déclinaison), puis le jour dure 2H ÷ 15 heures. La déclinaison vient de la date : latitude et date suffisent. Aux équinoxes, la déclinaison est proche de zéro et toutes les latitudes approchent douze heures.' },
      { q: 'Pourquoi l’équateur fait-il toujours douze heures ?', a: 'À la latitude 0, la tangente de la latitude vaut 0 : cos H = 0 quelle que soit la déclinaison, donc H = 90°. Les saisons passent et le jour bouge à peine de douze heures — avec la réfraction, il gagne quelques minutes.' },
      { q: 'Peut-on régler sa montre sur ces heures de lever ?', a: 'Pas directement. C’est du temps solaire vrai : il reste à ajouter l’équation du temps (±16 minutes), l’écart entre votre longitude et votre fuseau, et l’heure d’été. La réfraction manque aussi, elle avance le lever réel de 4 à 5 minutes.' },
    ],
    [
      { q: 'दिन की लंबाई कैसे निकालें?', a: 'cos H = −tan(अक्षांश) × tan(क्रांति) से घंटा-कोण H निकालें, फिर दिन 2H ÷ 15 घंटे चलता है। क्रांति तारीख़ से आती है, इसलिए अक्षांश और तारीख़ ही चाहिए। विषुवों पर क्रांति शून्य के पास होती है और हर अक्षांश बारह घंटे के क़रीब आ जाता है।' },
      { q: 'भूमध्य रेखा पर दिन हमेशा बारह घंटे क्यों होता है?', a: 'अक्षांश 0 पर tan(अक्षांश) शून्य है, इसलिए क्रांति चाहे कुछ भी हो cos H = 0 और H = 90° रहता है। मौसम बदलते हैं पर दिन बारह घंटे से लगभग हिलता ही नहीं — अपवर्तन जोड़ें तो कुछ मिनट लंबा।' },
      { q: 'क्या इन सूर्योदय समयों से घड़ी मिलाई जा सकती है?', a: 'सीधे नहीं। ये वास्तविक सौर समय हैं, इसलिए समय समीकरण (±16 मिनट), आपके देशांतर और समय-क्षेत्र का अंतर तथा डेलाइट सेविंग जोड़ना होगा। अपवर्तन भी छूटा है, जिससे असली सूर्योदय यहाँ दिए समय से 4 से 5 मिनट पहले होता है।' },
    ],
    [
      { q: '白天长度怎么算？', a: '用 cos H = −tan(纬度) × tan(赤纬) 求出时角 H，白天就是 2H ÷ 15 小时。赤纬由日期得出，所以只要纬度和日期就够了。春分秋分时赤纬接近零，任何纬度都接近十二小时。' },
      { q: '赤道为什么总是十二小时？', a: '纬度 0 时 tan(纬度) 是 0，所以不论赤纬多少 cos H 都是 0，H 就是 90°。四季照样轮转，白天却几乎不离十二小时 — 若计入大气折射，会长几分钟。' },
      { q: '能按这里的日出时刻对钟表吗？', a: '不能直接用。这是真太阳时，还要加上时差方程（±16 分钟）、你所在经度与时区的差，以及夏令时。大气折射也没算，实际日出比表上早 4 到 5 分钟。' },
    ],
    [
      { q: '白天長度怎麼算？', a: '用 cos H = −tan(緯度) × tan(赤緯) 求出時角 H，白天就是 2H ÷ 15 小時。赤緯由日期得出，所以只要緯度和日期就夠了。春分秋分時赤緯接近零，任何緯度都接近十二小時。' },
      { q: '赤道為什麼總是十二小時？', a: '緯度 0 時 tan(緯度) 是 0，所以不論赤緯多少 cos H 都是 0，H 就是 90°。四季照樣輪轉，白天卻幾乎不離十二小時 — 若計入大氣折射，會長幾分鐘。' },
      { q: '能按這裡的日出時刻對鐘錶嗎？', a: '不能直接用。這是真太陽時，還要加上時差方程（±16 分鐘）、你所在經度與時區的差，以及夏令時。大氣折射也沒算，實際日出比錶上早 4 到 5 分鐘。' },
    ],
  ),

  cellFaq: T<(f: SunFacts) => FaqItem[]>(
    f => [
      { q: `${cellName('ko', f)}의 정오 태양 고도는 몇 도인가요?`, a: `${f.noonAltitude}°입니다. 90° − |위도 − 적위|로 나온 값이고, 그날 적위는 ${f.declination}°입니다. 낮 길이는 ${dayLengthText('ko', f)}입니다.` },
      { q: `${cellName('ko', f)}의 낮은 얼마나 긴가요?`, a: f.polar
        ? `${dayLengthText('ko', f)}입니다. 일출과 일몰 시각은 없습니다 — 해가 하루 동안 지평선을 지나지 않기 때문입니다.`
        : `${dayLengthText('ko', f)}입니다. 태양시로 일출은 ${f.sunrise}, 일몰은 ${f.sunset}이고, 반일호는 ${f.hourAngle}°입니다.` },
      { q: '정오 그림자는 얼마나 길어지나요?', a: f.shadow === null
        ? `정오에도 해가 지평선 위로 올라오지 않아 그림자가 없습니다. 정오 고도가 ${f.noonAltitude}°로 음수입니다.`
        : `높이 1m 막대의 정오 그림자가 ${f.shadow}m입니다. 1 ÷ tan ${f.noonAltitude}°이므로, 그림자에 tan(고도)를 곱하면 다시 높이 1m가 됩니다.` },
    ],
    f => [
      { q: `How high is the noon sun at ${cellName('en', f)}?`, a: `${f.noonAltitude}° above the horizon. That is 90° − |latitude − declination|, with a declination of ${f.declination}° that day, and the day itself runs ${dayLengthText('en', f)}.` },
      { q: `How long is the day at ${cellName('en', f)}?`, a: f.polar
        ? `${dayLengthText('en', f)}. There are no sunrise or sunset times to give — the sun does not cross the horizon that day.`
        : `${dayLengthText('en', f)}. In solar time the sun rises at ${f.sunrise} and sets at ${f.sunset}, and the half-day angle is ${f.hourAngle}°.` },
      { q: 'How long is the noon shadow?', a: f.shadow === null
        ? `There is none: even at noon the sun stays below the horizon, and the noon altitude is ${f.noonAltitude}°.`
        : `A 1 m pole casts ${f.shadow} m at noon. It is 1 ÷ tan ${f.noonAltitude}°, so multiplying the shadow by the tangent of the altitude gives the 1 m back.` },
    ],
    f => [
      { q: `¿Qué altura tiene el sol al mediodía en ${cellName('es', f)}?`, a: `${nc(f.noonAltitude)}° sobre el horizonte. Es 90° − |latitud − declinación|, con una declinación de ${nc(f.declination)}° ese día, y el día dura ${dayLengthText('es', f)}.` },
      { q: `¿Cuánto dura el día en ${cellName('es', f)}?`, a: f.polar
        ? `${dayLengthText('es', f)}. No hay horas de salida ni de puesta: el sol no cruza el horizonte ese día.`
        : `${dayLengthText('es', f)}. En tiempo solar el sol sale a las ${f.sunrise} y se pone a las ${f.sunset}, y el ángulo semidiurno es ${nc(f.hourAngle)}°.` },
      { q: '¿Cuánto mide la sombra al mediodía?', a: f.shadow === null
        ? `No hay sombra: ni al mediodía el sol pasa el horizonte, y la altura al mediodía es ${nc(f.noonAltitude)}°.`
        : `Un poste de 1 m proyecta ${nc(f.shadow)} m al mediodía. Es 1 ÷ tan ${nc(f.noonAltitude)}°, así que al multiplicar la sombra por la tangente de la altura vuelve el 1 m.` },
    ],
    f => [
      { q: `Que altura tem o sol ao meio-dia em ${cellName('pt', f)}?`, a: `${nc(f.noonAltitude)}° acima do horizonte. É 90° − |latitude − declinação|, com declinação de ${nc(f.declination)}° nesse dia, e o dia dura ${dayLengthText('pt', f)}.` },
      { q: `Quanto dura o dia em ${cellName('pt', f)}?`, a: f.polar
        ? `${dayLengthText('pt', f)}. Não há horários de nascer nem de pôr do sol: o sol não cruza o horizonte nesse dia.`
        : `${dayLengthText('pt', f)}. Em tempo solar o sol nasce às ${f.sunrise} e se põe às ${f.sunset}, e o ângulo semidiurno é ${nc(f.hourAngle)}°.` },
      { q: 'Qual o comprimento da sombra ao meio-dia?', a: f.shadow === null
        ? `Não há sombra: nem ao meio-dia o sol passa do horizonte, e a altura ao meio-dia é ${nc(f.noonAltitude)}°.`
        : `Uma vara de 1 m projeta ${nc(f.shadow)} m ao meio-dia. É 1 ÷ tan ${nc(f.noonAltitude)}°, então multiplicar a sombra pela tangente da altura devolve o 1 m.` },
    ],
    f => [
      { q: `${cellName('ja', f)}の南中高度は何度ですか。`, a: `${f.noonAltitude}度です。90° − |緯度 − 赤緯|で出た値で、その日の赤緯は${f.declination}度、昼の長さは${dayLengthText('ja', f)}です。` },
      { q: `${cellName('ja', f)}の昼はどれくらい長いですか。`, a: f.polar
        ? `${dayLengthText('ja', f)}です。日の出と日の入りの時刻はありません — その日は太陽が地平線を越えないからです。`
        : `${dayLengthText('ja', f)}です。真太陽時で日の出は${f.sunrise}、日の入りは${f.sunset}、半日周角は${f.hourAngle}度です。` },
      { q: '南中時の影はどれくらい伸びますか。', a: f.shadow === null
        ? `影はできません。南中でも太陽が地平線の上に出ず、南中高度は${f.noonAltitude}度です。`
        : `高さ1mの棒の影が${f.shadow}mになります。1 ÷ tan ${f.noonAltitude}°なので、影に高度のタンジェントを掛ければ高さ1mに戻ります。` },
    ],
    f => [
      { q: `Wie hoch steht die Mittagssonne auf ${cellName('de', f)}?`, a: `${nc(f.noonAltitude)}° über dem Horizont. Das ist 90° − |Breite − Deklination| bei einer Deklination von ${nc(f.declination)}° an diesem Tag, und der Tag dauert ${dayLengthText('de', f)}.` },
      { q: `Wie lang ist der Tag auf ${cellName('de', f)}?`, a: f.polar
        ? `${dayLengthText('de', f)}. Auf- und Untergangszeiten gibt es nicht — die Sonne kreuzt an diesem Tag den Horizont nicht.`
        : `${dayLengthText('de', f)}. In Sonnenzeit geht die Sonne um ${f.sunrise} auf und um ${f.sunset} unter, der Halbtagsbogen beträgt ${nc(f.hourAngle)}°.` },
      { q: 'Wie lang ist der Mittagsschatten?', a: f.shadow === null
        ? `Es gibt keinen: Auch mittags bleibt die Sonne unter dem Horizont, die Mittagshöhe liegt bei ${nc(f.noonAltitude)}°.`
        : `Ein 1 m hoher Stab wirft mittags ${nc(f.shadow)} m. Das ist 1 ÷ tan ${nc(f.noonAltitude)}°, also ergibt der Schatten mal dem Tangens der Höhe wieder 1 m.` },
    ],
    f => [
      { q: `Quelle est la hauteur du soleil à midi à ${cellName('fr', f)} ?`, a: `${nc(f.noonAltitude)}° au-dessus de l’horizon. C’est 90° − |latitude − déclinaison| pour une déclinaison de ${nc(f.declination)}° ce jour-là, et le jour dure ${dayLengthText('fr', f)}.` },
      { q: `Combien de temps dure le jour à ${cellName('fr', f)} ?`, a: f.polar
        ? `${dayLengthText('fr', f)}. Il n’y a pas d’heure de lever ni de coucher : le soleil ne franchit pas l’horizon ce jour-là.`
        : `${dayLengthText('fr', f)}. En temps solaire, le soleil se lève à ${f.sunrise} et se couche à ${f.sunset}, et l’angle semi-diurne vaut ${nc(f.hourAngle)}°.` },
      { q: 'Quelle est la longueur de l’ombre à midi ?', a: f.shadow === null
        ? `Il n’y en a pas : même à midi le soleil reste sous l’horizon, la hauteur de midi étant de ${nc(f.noonAltitude)}°.`
        : `Un piquet de 1 m projette ${nc(f.shadow)} m à midi. C’est 1 ÷ tan ${nc(f.noonAltitude)}°, donc l’ombre multipliée par la tangente de la hauteur redonne 1 m.` },
    ],
    f => [
      { q: `${cellName('hi', f)} पर दोपहर का सूर्य कितना ऊँचा होता है?`, a: `क्षितिज से ${f.noonAltitude}° ऊपर। यह 90° − |अक्षांश − क्रांति| है, उस दिन क्रांति ${f.declination}°, और दिन ${dayLengthText('hi', f)} चलता है।` },
      { q: `${cellName('hi', f)} पर दिन कितना लंबा है?`, a: f.polar
        ? `${dayLengthText('hi', f)}। सूर्योदय-सूर्यास्त का समय नहीं है — उस दिन सूर्य क्षितिज पार ही नहीं करता।`
        : `${dayLengthText('hi', f)}। सौर समय में सूर्य ${f.sunrise} पर उगता और ${f.sunset} पर डूबता है, और अर्ध-दिन कोण ${f.hourAngle}° है।` },
      { q: 'दोपहर की छाया कितनी लंबी होती है?', a: f.shadow === null
        ? `छाया बनती ही नहीं: दोपहर में भी सूर्य क्षितिज से ऊपर नहीं आता, दोपहर की ऊँचाई ${f.noonAltitude}° है।`
        : `1 m ऊँचे डंडे की छाया दोपहर में ${f.shadow} m होती है। यह 1 ÷ tan ${f.noonAltitude}° है, इसलिए छाया को ऊँचाई के टैंजेंट से गुणा करने पर फिर 1 m मिल जाता है।` },
    ],
    f => [
      { q: `${cellName('zh', f)} 正午太阳有多高？`, a: `在地平线以上 ${f.noonAltitude}°。这是 90° − |纬度 − 赤纬|，当天赤纬 ${f.declination}°，白天长 ${dayLengthText('zh', f)}。` },
      { q: `${cellName('zh', f)} 的白天有多长？`, a: f.polar
        ? `${dayLengthText('zh', f)}。没有日出日落时刻 — 这一天太阳根本不穿过地平线。`
        : `${dayLengthText('zh', f)}。真太阳时里 ${f.sunrise} 日出、${f.sunset} 日落，半昼弧为 ${f.hourAngle}°。` },
      { q: '正午的影子有多长？', a: f.shadow === null
        ? `没有影子：连正午太阳也没升到地平线以上，正午高度是 ${f.noonAltitude}°。`
        : `高 1 米的杆子正午影长 ${f.shadow} 米。它是 1 ÷ tan ${f.noonAltitude}°，所以把影长乘上高度的正切，又回到 1 米。` },
    ],
    f => [
      { q: `${cellName('tw', f)} 正午太陽有多高？`, a: `在地平線以上 ${f.noonAltitude}°。這是 90° − |緯度 − 赤緯|，當天赤緯 ${f.declination}°，白天長 ${dayLengthText('tw', f)}。` },
      { q: `${cellName('tw', f)} 的白天有多長？`, a: f.polar
        ? `${dayLengthText('tw', f)}。沒有日出日落時刻 — 這一天太陽根本不穿過地平線。`
        : `${dayLengthText('tw', f)}。真太陽時裡 ${f.sunrise} 日出、${f.sunset} 日落，半晝弧為 ${f.hourAngle}°。` },
      { q: '正午的影子有多長？', a: f.shadow === null
        ? `沒有影子：連正午太陽也沒升到地平線以上，正午高度是 ${f.noonAltitude}°。`
        : `高 1 公尺的桿子正午影長 ${f.shadow} 公尺。它是 1 ÷ tan ${f.noonAltitude}°，所以把影長乘上高度的正切，又回到 1 公尺。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const SUN_UI: L<SunUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<SunUI>;
