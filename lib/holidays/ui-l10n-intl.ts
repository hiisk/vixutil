import type { HolidayUI } from './ui-l10n.ts';
import type { AnyLocale10 } from '../locales.ts';

/*
  ui-l10n.ts의 나머지 여덟 언어.

  제목 함수 안에서 나라 이름이 어떤 꼴로 들어가는지는 언어마다 다르다.
  countryTitle이 받는 것은 나라 코드가 아니라 이미 번역된 이름이라, 격·전치사가
  필요한 언어(독일어·프랑스어·포르투갈어)는 그 언어 블록 안에서 이름 문자열을
  열쇠로 삼아 갈라 쓴다. 표에 없는 이름은 그 언어의 가장 흔한 꼴로 떨어진다.
*/

const es: HolidayUI = {
  section: 'Días festivos',
  hubTitle: 'Días festivos por país',
  hubLede: 'Los días festivos de siete países, calculados a partir de las reglas en vez de copiados de una tabla, así que los años futuros también salen bien.',
  countryTitle: (c, y) => `Días festivos ${y} en ${c}`,
  countryDesc: (c, y, n) => `Los ${n} días festivos en ${c} durante ${y}, con la fecha, el día de la semana y los traslados.`,
  overviewTitle: c => `Días festivos en ${c}`,
  overviewDesc: c => `Los días festivos en ${c}, año por año, y qué pasa cuando caen en fin de semana.`,
  // «en» sirve para los siete; el artículo del Reino Unido va en el propio nombre.
  countries: {
    us: 'Estados Unidos', gb: 'el Reino Unido', de: 'Alemania', fr: 'Francia',
    es: 'España', br: 'Brasil', jp: 'Japón',
  },
  thDate: 'Fecha',
  thName: 'Día festivo',
  thWeekday: 'Día',
  observed: 'Trasladado',
  movedFrom: d => `Originalmente ${d}`,
  substituteNote: 'Cuando un día festivo cae en fin de semana se traslada a otro día. La fecha trasladada aparece en negrita.',
  noSubstitute: 'Este país no traslada los días festivos que caen en fin de semana: ese año simplemente se pierden.',
  today: 'Hoy',
  daysLeft: n => n === 0 ? 'Es hoy' : n === 1 ? 'Falta 1 día' : `Faltan ${n} días`,
  passed: 'Ya pasó',
  nextUp: 'Próximo día festivo',
  count: (n, y) => n === 0 ? `Sin días festivos en ${y}` : n === 1 ? `1 día festivo en ${y}` : `${n} días festivos en ${y}`,
  weekendCount: n => n === 0 ? 'Ninguno cae en fin de semana' : n === 1 ? '1 cae en fin de semana' : `${n} caen en fin de semana`,
  longWeekend: 'Puente',
  otherYears: 'Otros años',
  otherCountries: 'Otros países',
  disclaimer: 'Solo días festivos nacionales. No se incluyen los festivos autonómicos ni los locales.',
  sourceNote: 'Las fechas se calculan a partir de las reglas: la Pascua con el computus y los equinoccios japoneses a partir de la longitud solar.',
};

/** «no Brasil», «na Alemanha», «nos Estados Unidos» — em + artigo, país a país. */
const emPt: Record<string, string> = {
  'Estados Unidos': 'nos Estados Unidos',
  'Reino Unido': 'no Reino Unido',
  'Alemanha': 'na Alemanha',
  'França': 'na França',
  'Espanha': 'na Espanha',
  'Brasil': 'no Brasil',
  'Japão': 'no Japão',
};
const emBr = (c: string) => emPt[c] ?? `em ${c}`;

const ptBr: HolidayUI = {
  section: 'Feriados',
  hubTitle: 'Feriados por país',
  hubLede: 'As datas dos feriados de sete países, calculadas pelas regras em vez de copiadas de uma tabela — por isso os anos futuros também saem certos.',
  countryTitle: (c, y) => `Feriados ${y} ${emBr(c)}`,
  countryDesc: (c, y, n) => `Os ${n} feriados nacionais ${emBr(c)} em ${y}, com data, dia da semana e os dias transferidos.`,
  overviewTitle: c => `Feriados ${emBr(c)}`,
  overviewDesc: c => `Os feriados ${emBr(c)} ano a ano, incluindo o que acontece quando caem no fim de semana.`,
  countries: {
    us: 'Estados Unidos', gb: 'Reino Unido', de: 'Alemanha', fr: 'França',
    es: 'Espanha', br: 'Brasil', jp: 'Japão',
  },
  thDate: 'Data',
  thName: 'Feriado',
  thWeekday: 'Dia',
  observed: 'Transferido',
  movedFrom: d => `Originalmente ${d}`,
  substituteNote: 'Quando um feriado cai no fim de semana, ele é observado em outro dia. A data transferida aparece em negrito.',
  noSubstitute: 'Este país não transfere os feriados que caem no fim de semana — eles simplesmente se perdem naquele ano.',
  today: 'Hoje',
  daysLeft: n => n === 0 ? 'É hoje' : n === 1 ? 'Falta 1 dia' : `Faltam ${n} dias`,
  passed: 'Já passou',
  nextUp: 'Próximo feriado',
  count: (n, y) => n === 0 ? `Nenhum feriado em ${y}` : n === 1 ? `1 feriado em ${y}` : `${n} feriados em ${y}`,
  weekendCount: n => n === 0 ? 'Nenhum cai no fim de semana' : n === 1 ? '1 cai no fim de semana' : `${n} caem no fim de semana`,
  longWeekend: 'Feriadão',
  otherYears: 'Outros anos',
  otherCountries: 'Outros países',
  disclaimer: 'Somente feriados nacionais. Feriados estaduais e municipais não estão incluídos.',
  sourceNote: 'As datas são calculadas pelas regras — a Páscoa pelo computus e os equinócios japoneses pela longitude solar.',
};

const ja: HolidayUI = {
  section: '祝日',
  hubTitle: '国別の祝日カレンダー',
  hubLede: '7か国の祝日を、表を写すのではなく規則から計算しています。だから数年先の日付も正しく出ます。',
  countryTitle: (c, y) => `${y}年 ${c}の祝日`,
  countryDesc: (c, y, n) => `${y}年の${c}の祝日${n}日を、日付・曜日・振替の有無まで一覧にしました。`,
  overviewTitle: c => `${c}の祝日`,
  overviewDesc: c => `${c}の祝日を年ごとに見ていきます。週末と重なったときにどうなるかも合わせて。`,
  countries: {
    us: 'アメリカ', gb: 'イギリス', de: 'ドイツ', fr: 'フランス',
    es: 'スペイン', br: 'ブラジル', jp: '日本',
  },
  thDate: '日付',
  thName: '祝日',
  thWeekday: '曜日',
  observed: '振替',
  movedFrom: d => `本来は${d}`,
  substituteNote: '週末と重なった祝日は別の日に振り替えられます。振替後の日付を太字で示しています。',
  noSubstitute: 'この国では週末と重なった祝日を振り替えません。その年はそのまま消えます。',
  today: '今日',
  daysLeft: n => n === 0 ? '今日' : `あと${n}日`,
  passed: '終了',
  nextUp: '次の祝日',
  count: (n, y) => n === 0 ? `${y}年は祝日なし` : `${y}年の祝日 ${n}日`,
  weekendCount: n => n === 0 ? '週末と重なる日なし' : `週末と重なる日 ${n}日`,
  longWeekend: '連休',
  otherYears: '他の年',
  otherCountries: '他の国',
  disclaimer: '国全体の祝日のみを掲載しています。州や地域ごとの休日は含みません。',
  sourceNote: '日付は規則から計算しています。復活祭はコンプトゥス、日本の春分・秋分は太陽黄経で求めます。',
};

/** «in Deutschland», aber «in den USA» — Dativ, wo der Ländername einen Artikel hat. */
const inDeMap: Record<string, string> = {
  'die USA': 'in den USA',
  'das Vereinigte Königreich': 'im Vereinigten Königreich',
};
const inDe = (c: string) => inDeMap[c] ?? `in ${c}`;

const de: HolidayUI = {
  section: 'Feiertage',
  hubTitle: 'Feiertage nach Ländern',
  hubLede: 'Die Feiertage von sieben Ländern, aus den Regeln berechnet statt aus einer Tabelle abgeschrieben — deshalb stimmen auch künftige Jahre.',
  countryTitle: (c, y) => `Feiertage ${y} ${inDe(c)}`,
  countryDesc: (c, y, n) => `Alle ${n} gesetzlichen Feiertage ${inDe(c)} im Jahr ${y} — mit Datum, Wochentag und Ersatzruhetagen.`,
  overviewTitle: c => `Feiertage ${inDe(c)}`,
  overviewDesc: c => `Die Feiertage ${inDe(c)} Jahr für Jahr, samt der Frage, was passiert, wenn ein Feiertag auf ein Wochenende fällt.`,
  countries: {
    us: 'die USA', gb: 'das Vereinigte Königreich', de: 'Deutschland', fr: 'Frankreich',
    es: 'Spanien', br: 'Brasilien', jp: 'Japan',
  },
  thDate: 'Datum',
  thName: 'Feiertag',
  thWeekday: 'Wochentag',
  observed: 'Ersatztag',
  movedFrom: d => `Ursprünglich ${d}`,
  substituteNote: 'Fällt ein Feiertag auf ein Wochenende, wird er an einem anderen Tag nachgeholt. Der Ersatztag steht fett.',
  noSubstitute: 'Dieses Land holt Feiertage, die auf ein Wochenende fallen, nicht nach — sie entfallen in dem Jahr einfach.',
  today: 'Heute',
  daysLeft: n => n === 0 ? 'Heute' : n === 1 ? 'Noch 1 Tag' : `Noch ${n} Tage`,
  passed: 'Vorbei',
  nextUp: 'Nächster Feiertag',
  count: (n, y) => n === 0 ? `Keine Feiertage ${y}` : n === 1 ? `1 Feiertag ${y}` : `${n} Feiertage ${y}`,
  weekendCount: n => n === 0 ? 'Keiner fällt auf ein Wochenende' : n === 1 ? '1 Feiertag fällt auf ein Wochenende' : `${n} Feiertage fallen auf ein Wochenende`,
  longWeekend: 'Langes Wochenende',
  otherYears: 'Andere Jahre',
  otherCountries: 'Andere Länder',
  disclaimer: 'Nur bundesweite Feiertage. Feiertage einzelner Bundesländer oder Regionen sind nicht enthalten.',
  sourceNote: 'Die Daten werden aus den Regeln berechnet — Ostern per Computus, die japanischen Tagundnachtgleichen aus der ekliptikalen Länge der Sonne.',
};

/** « en Allemagne », mais « au Brésil » et « aux États-Unis ». */
const enFrMap: Record<string, string> = {
  'États-Unis': 'aux États-Unis',
  'Royaume-Uni': 'au Royaume-Uni',
  'Brésil': 'au Brésil',
  'Japon': 'au Japon',
};
const enFr = (c: string) => enFrMap[c] ?? `en ${c}`;

const fr: HolidayUI = {
  section: 'Jours fériés',
  hubTitle: 'Jours fériés par pays',
  hubLede: 'Les jours fériés de sept pays, calculés à partir des règles plutôt que recopiés d’un tableau — les années à venir sont donc justes elles aussi.',
  countryTitle: (c, y) => `Jours fériés ${y} ${enFr(c)}`,
  countryDesc: (c, y, n) => `Les ${n} jours fériés ${enFr(c)} en ${y} : dates, jours de la semaine et jours de report.`,
  overviewTitle: c => `Jours fériés ${enFr(c)}`,
  overviewDesc: c => `Les jours fériés ${enFr(c)}, année par année, et ce qui se passe quand un jour férié tombe un week-end.`,
  countries: {
    us: 'États-Unis', gb: 'Royaume-Uni', de: 'Allemagne', fr: 'France',
    es: 'Espagne', br: 'Brésil', jp: 'Japon',
  },
  thDate: 'Date',
  thName: 'Jour férié',
  thWeekday: 'Jour',
  observed: 'Reporté',
  movedFrom: d => `À l’origine le ${d}`,
  substituteNote: 'Quand un jour férié tombe un week-end, il est reporté à un autre jour. La date reportée est en gras.',
  noSubstitute: 'Ce pays ne reporte pas les jours fériés qui tombent un week-end : ils sont simplement perdus cette année-là.',
  today: 'Aujourd’hui',
  daysLeft: n => n === 0 ? 'C’est aujourd’hui' : n === 1 ? 'Dans 1 jour' : `Dans ${n} jours`,
  passed: 'Passé',
  nextUp: 'Prochain jour férié',
  count: (n, y) => n === 0 ? `Aucun jour férié en ${y}` : n === 1 ? `1 jour férié en ${y}` : `${n} jours fériés en ${y}`,
  weekendCount: n => n === 0 ? 'Aucun ne tombe un week-end' : n === 1 ? '1 tombe un week-end' : `${n} tombent un week-end`,
  longWeekend: 'Week-end prolongé',
  otherYears: 'Autres années',
  otherCountries: 'Autres pays',
  disclaimer: 'Uniquement les jours fériés nationaux. Les jours chômés propres à une région ou à un département ne sont pas inclus.',
  sourceNote: 'Les dates sont calculées à partir des règles : Pâques par le comput, les équinoxes japonais à partir de la longitude solaire.',
};

const hi: HolidayUI = {
  section: 'सार्वजनिक अवकाश',
  hubTitle: 'देश के अनुसार सार्वजनिक अवकाश',
  hubLede: 'सात देशों के अवकाश की तारीख़ें — किसी तालिका से नक़ल नहीं, नियमों से गिनी गई हैं, इसलिए आने वाले सालों की तारीख़ें भी सही निकलती हैं।',
  countryTitle: (c, y) => `${c} में सार्वजनिक अवकाश ${y}`,
  countryDesc: (c, y, n) => `${y} में ${c} के सभी ${n} सार्वजनिक अवकाश — तारीख़, दिन और स्थानापन्न छुट्टियों सहित।`,
  overviewTitle: c => `${c} में सार्वजनिक अवकाश`,
  overviewDesc: c => `${c} के सार्वजनिक अवकाश साल दर साल, और यह भी कि छुट्टी सप्ताहांत पर पड़ने पर क्या होता है।`,
  countries: {
    us: 'अमेरिका', gb: 'यूनाइटेड किंगडम', de: 'जर्मनी', fr: 'फ़्रांस',
    es: 'स्पेन', br: 'ब्राज़ील', jp: 'जापान',
  },
  thDate: 'तारीख़',
  thName: 'अवकाश',
  thWeekday: 'दिन',
  observed: 'स्थानापन्न',
  movedFrom: d => `मूल तिथि ${d}`,
  substituteNote: 'छुट्टी सप्ताहांत पर पड़ने पर उसे किसी दूसरे दिन मनाया जाता है। बदली हुई तारीख़ मोटे अक्षरों में दी गई है।',
  noSubstitute: 'यह देश सप्ताहांत पर पड़ने वाली छुट्टियाँ आगे नहीं बढ़ाता — उस साल वे यूँ ही चली जाती हैं।',
  today: 'आज',
  daysLeft: n => n === 0 ? 'आज ही है' : `${n} दिन बाक़ी`,
  passed: 'बीत चुका',
  nextUp: 'अगला अवकाश',
  count: (n, y) => n === 0 ? `${y} में कोई सार्वजनिक अवकाश नहीं` : `${y} में ${n} सार्वजनिक अवकाश`,
  weekendCount: n => n === 0 ? 'कोई भी सप्ताहांत पर नहीं पड़ता' : n === 1 ? '1 सप्ताहांत पर पड़ता है' : `${n} सप्ताहांत पर पड़ते हैं`,
  longWeekend: 'लंबा सप्ताहांत',
  otherYears: 'अन्य वर्ष',
  otherCountries: 'अन्य देश',
  disclaimer: 'केवल राष्ट्रीय अवकाश। किसी एक राज्य या क्षेत्र के अवकाश इसमें शामिल नहीं हैं।',
  sourceNote: 'तारीख़ें नियमों से गिनी जाती हैं — ईस्टर कंप्यूटस से और जापान के विषुव सौर देशांतर से।',
};

const zhHans: HolidayUI = {
  section: '法定节假日',
  hubTitle: '各国法定节假日',
  hubLede: '七个国家的节假日日期，不是照抄表格，而是按规则推算出来的——所以往后几年的日期也是对的。',
  countryTitle: (c, y) => `${y}年${c}法定节假日`,
  countryDesc: (c, y, n) => `${y}年${c}的 ${n} 个法定节假日，含日期、星期和调休安排。`,
  overviewTitle: c => `${c}法定节假日`,
  overviewDesc: c => `逐年查看${c}的法定节假日，以及节日碰上周末时怎么处理。`,
  countries: {
    us: '美国', gb: '英国', de: '德国', fr: '法国',
    es: '西班牙', br: '巴西', jp: '日本',
  },
  thDate: '日期',
  thName: '节日',
  thWeekday: '星期',
  observed: '补休',
  movedFrom: d => `原为${d}`,
  substituteNote: '节日碰上周末时会另择一天补休。补休当天以粗体标出。',
  noSubstitute: '这个国家不为碰上周末的节日安排补休——那一年就直接过去了。',
  today: '今天',
  daysLeft: n => n === 0 ? '就是今天' : `还有 ${n} 天`,
  passed: '已过',
  nextUp: '下一个节日',
  count: (n, y) => n === 0 ? `${y}年没有法定节假日` : `${y}年共 ${n} 个法定节假日`,
  weekendCount: n => n === 0 ? '没有碰上周末的' : `有 ${n} 个碰上周末`,
  longWeekend: '小长假',
  otherYears: '其他年份',
  otherCountries: '其他国家',
  disclaimer: '只收录全国性节假日，各州、各地区单独放假的日子不在其中。',
  sourceNote: '日期按规则推算——复活节用 computus 推算，日本的春分、秋分由太阳黄经求出。',
};

const zhHant: HolidayUI = {
  section: '國定假日',
  hubTitle: '各國國定假日',
  hubLede: '七個國家的假日日期，不是照抄表格，而是依規則推算出來的——所以往後幾年的日期也一樣準確。',
  countryTitle: (c, y) => `${y}年${c}國定假日`,
  countryDesc: (c, y, n) => `${y}年${c}的 ${n} 天國定假日，含日期、星期與補假安排。`,
  overviewTitle: c => `${c}國定假日`,
  overviewDesc: c => `逐年查看${c}的國定假日，以及假日遇到週末時如何處理。`,
  countries: {
    us: '美國', gb: '英國', de: '德國', fr: '法國',
    es: '西班牙', br: '巴西', jp: '日本',
  },
  thDate: '日期',
  thName: '假日',
  thWeekday: '星期',
  observed: '補假',
  movedFrom: d => `原為${d}`,
  substituteNote: '假日遇到週末時會另擇一天補假。補假當天以粗體標示。',
  noSubstitute: '這個國家不為遇到週末的假日補假——那一年就這樣過去了。',
  today: '今天',
  daysLeft: n => n === 0 ? '就是今天' : `還有 ${n} 天`,
  passed: '已過',
  nextUp: '下一個假日',
  count: (n, y) => n === 0 ? `${y}年沒有國定假日` : `${y}年共 ${n} 天國定假日`,
  weekendCount: n => n === 0 ? '沒有遇到週末的' : `有 ${n} 天遇到週末`,
  longWeekend: '連假',
  otherYears: '其他年份',
  otherCountries: '其他國家',
  disclaimer: '僅收錄全國性假日，各州、各地區單獨放假的日子不在其中。',
  sourceNote: '日期依規則推算——復活節以 computus 推算，日本的春分、秋分由太陽黃經求得。',
};

export const HOLIDAY_UI_INTL: Record<Exclude<AnyLocale10, 'ko' | 'en'>, HolidayUI> = {
  es,
  'pt-br': ptBr,
  ja,
  de,
  fr,
  hi,
  'zh-hans': zhHans,
  'zh-hant': zhHant,
};
