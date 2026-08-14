/**
 * 생일 낱장의 화면 문구 — 열 언어.
 *
 * 별자리·탄생석 이름은 자료(lib/fortune-data.ts · lib/birth-stone.ts)가 한국어로만
 * 갖고 있다. 그래서 **이름은 기존 번역 층에서 오고**(zodiacSigns(lang)) 여기에는
 * 틀 문장만 둔다 — 이름을 여기 또 적으면 두 곳이 어긋난다.
 */
import type { AnyLocale10 } from '../locales.ts';

export interface BirthdayUI {
  h1: (date: string) => string;
  metaTitle: (date: string, sign: string) => string;
  metaDesc: (date: string, sign: string, stone: string) => string;
  /** 날짜 표기 — 3월 15일 / March 15 */
  dateLabel: (m: number, d: number) => string;
  zodiacTitle: string;
  period: string;
  element: string;
  stoneTitle: string;
  stone: string;
  flower: string;
  dayNumTitle: string;
  dayNum: (n: string, left: string) => string;
  leapNote: string;
  ageTitle: (year: string) => string;
  ageRow: (year: string, age: string, animal: string) => string;
  sameZodiacTitle: (sign: string) => string;
  nearbyTitle: string;
  note: string;
}

const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const BIRTHDAY_UI: Record<AnyLocale10, BirthdayUI> = {
  ko: {
    h1: d => `${d}에 태어난 사람`,
    metaTitle: (d, s) => `${d} 생일 — ${s}, 탄생석과 나이표`,
    metaDesc: (d, s, st) => `${d}에 태어나면 별자리는 ${s}, 탄생석은 ${st}입니다. 그 해의 통산일과 출생연도별 만 나이·띠까지 한 번에 봅니다.`,
    dateLabel: (m, d) => `${m}월 ${d}일`,
    zodiacTitle: '별자리', period: '기간', element: '원소',
    stoneTitle: '탄생석과 탄생화', stone: '탄생석', flower: '탄생화',
    dayNumTitle: '그 해의 몇 번째 날',
    dayNum: (n, left) => `${n}번째 날이고, 그 해가 ${left}일 남았습니다.`,
    leapNote: '2월 29일은 윤년에만 있습니다 — 4년마다 한 번, 100으로 나뉘면 건너뛰고 400으로 나뉘면 다시 윤년입니다.',
    ageTitle: y => `${y}년 기준 나이와 띠`,
    ageRow: (y, a, an) => `${y}년생 · 만 ${a}세 · ${an}`,
    sameZodiacTitle: s => `같은 ${s}인 다른 날`,
    nearbyTitle: '가까운 날짜',
    note: '별자리·탄생석은 널리 통용되는 표를 옮긴 것이고, 성향 설명은 재미로 보는 참고입니다. 만 나이는 그 해 생일이 지난 뒤의 나이입니다.',
  },
  en: {
    h1: d => `Born on ${d}`,
    metaTitle: (d, s) => `${d} birthday — ${s}, birthstone and age chart`,
    metaDesc: (d, s, st) => `Anyone born on ${d} is ${s}, with ${st} as the birthstone. Includes the day number of the year and an age chart by birth year.`,
    dateLabel: (m, d) => `${MONTHS_EN[m - 1]} ${d}`,
    zodiacTitle: 'Star sign', period: 'Dates', element: 'Element',
    stoneTitle: 'Birthstone and flower', stone: 'Birthstone', flower: 'Flower',
    dayNumTitle: 'Day of the year',
    dayNum: (n, left) => `It is day ${n}, with ${left} days left in the year.`,
    leapNote: 'February 29 exists only in leap years — every four years, skipped on centuries unless divisible by 400.',
    ageTitle: y => `Age and zodiac animal as of ${y}`,
    ageRow: (y, a, an) => `Born ${y} · ${a} years old · ${an}`,
    sameZodiacTitle: s => `Other days that are also ${s}`,
    nearbyTitle: 'Nearby dates',
    note: 'Star signs and birthstones follow the widely used tables; personality notes are for fun. Ages assume the birthday has already passed that year.',
  },
  es: {
    h1: d => `Nacidos el ${d}`,
    metaTitle: (d, s) => `Cumpleaños ${d} — ${s}, piedra y tabla de edades`,
    metaDesc: (d, s, st) => `Quien nace el ${d} es ${s}, con ${st} como piedra de nacimiento. Incluye el día del año y la edad por año de nacimiento.`,
    dateLabel: (m, d) => `${d}/${m}`,
    zodiacTitle: 'Signo', period: 'Fechas', element: 'Elemento',
    stoneTitle: 'Piedra y flor', stone: 'Piedra', flower: 'Flor',
    dayNumTitle: 'Día del año',
    dayNum: (n, left) => `Es el día ${n}; quedan ${left} días del año.`,
    leapNote: 'El 29 de febrero solo existe en años bisiestos: cada cuatro años, salvo los seculares no divisibles entre 400.',
    ageTitle: y => `Edad y animal del zodiaco en ${y}`,
    ageRow: (y, a, an) => `Nacido en ${y} · ${a} años · ${an}`,
    sameZodiacTitle: s => `Otros días de ${s}`,
    nearbyTitle: 'Fechas cercanas',
    note: 'Los signos y las piedras siguen las tablas más difundidas; las notas de carácter son solo por diversión.',
  },
  'pt-br': {
    h1: d => `Nascidos em ${d}`,
    metaTitle: (d, s) => `Aniversário ${d} — ${s}, pedra e tabela de idades`,
    metaDesc: (d, s, st) => `Quem nasce em ${d} é de ${s}, com ${st} como pedra de nascimento. Inclui o dia do ano e a idade por ano de nascimento.`,
    dateLabel: (m, d) => `${d}/${m}`,
    zodiacTitle: 'Signo', period: 'Datas', element: 'Elemento',
    stoneTitle: 'Pedra e flor', stone: 'Pedra', flower: 'Flor',
    dayNumTitle: 'Dia do ano',
    dayNum: (n, left) => `É o dia ${n}; faltam ${left} dias para o fim do ano.`,
    leapNote: '29 de fevereiro só existe em anos bissextos: a cada quatro anos, exceto séculos não divisíveis por 400.',
    ageTitle: y => `Idade e signo animal em ${y}`,
    ageRow: (y, a, an) => `Nascido em ${y} · ${a} anos · ${an}`,
    sameZodiacTitle: s => `Outros dias de ${s}`,
    nearbyTitle: 'Datas próximas',
    note: 'Signos e pedras seguem as tabelas mais usadas; as notas de personalidade são só por diversão.',
  },
  ja: {
    h1: d => `${d}生まれ`,
    metaTitle: (d, s) => `${d}生まれ — ${s}・誕生石と年齢表`,
    metaDesc: (d, s, st) => `${d}生まれの星座は${s}、誕生石は${st}です。その年の通算日と、生まれ年ごとの年齢・干支もまとめて確認できます。`,
    dateLabel: (m, d) => `${m}月${d}日`,
    zodiacTitle: '星座', period: '期間', element: 'エレメント',
    stoneTitle: '誕生石と誕生花', stone: '誕生石', flower: '誕生花',
    dayNumTitle: 'その年の通算日',
    dayNum: (n, left) => `${n}日目で、その年は残り${left}日です。`,
    leapNote: '2月29日は閏年にだけあります — 4年に一度、100で割れる年は除き、400で割れる年は閏年です。',
    ageTitle: y => `${y}年時点の年齢と干支`,
    ageRow: (y, a, an) => `${y}年生まれ · ${a}歳 · ${an}`,
    sameZodiacTitle: s => `同じ${s}の別の日`,
    nearbyTitle: '近い日付',
    note: '星座・誕生石は広く使われている表によるもので、性格の説明は娯楽としてお読みください。',
  },
  de: {
    h1: d => `Geboren am ${d}`,
    metaTitle: (d, s) => `Geburtstag ${d} — ${s}, Geburtsstein und Alterstabelle`,
    metaDesc: (d, s, st) => `Wer am ${d} geboren ist, ist ${s}; der Geburtsstein ist ${st}. Dazu der Tag im Jahr und das Alter nach Geburtsjahr.`,
    dateLabel: (m, d) => `${d}.${m}.`,
    zodiacTitle: 'Sternzeichen', period: 'Zeitraum', element: 'Element',
    stoneTitle: 'Geburtsstein und -blume', stone: 'Stein', flower: 'Blume',
    dayNumTitle: 'Tag des Jahres',
    dayNum: (n, left) => `Es ist Tag ${n}; ${left} Tage bleiben im Jahr.`,
    leapNote: 'Den 29. Februar gibt es nur in Schaltjahren — alle vier Jahre, außer in Jahrhundertjahren, die nicht durch 400 teilbar sind.',
    ageTitle: y => `Alter und Tierkreiszeichen im Jahr ${y}`,
    ageRow: (y, a, an) => `Jahrgang ${y} · ${a} Jahre · ${an}`,
    sameZodiacTitle: s => `Weitere Tage im Zeichen ${s}`,
    nearbyTitle: 'Nahe Daten',
    note: 'Sternzeichen und Geburtssteine folgen den verbreiteten Tabellen; die Charakterhinweise sind Unterhaltung.',
  },
  fr: {
    h1: d => `Né le ${d}`,
    metaTitle: (d, s) => `Anniversaire ${d} — ${s}, pierre et table des âges`,
    metaDesc: (d, s, st) => `Les personnes nées le ${d} sont ${s}, avec ${st} comme pierre de naissance. Avec le jour de l'année et l'âge par année de naissance.`,
    dateLabel: (m, d) => `${d}/${m}`,
    zodiacTitle: 'Signe', period: 'Période', element: 'Élément',
    stoneTitle: 'Pierre et fleur', stone: 'Pierre', flower: 'Fleur',
    dayNumTitle: "Jour de l'année",
    dayNum: (n, left) => `C'est le jour ${n} ; il reste ${left} jours dans l'année.`,
    leapNote: "Le 29 février n'existe que les années bissextiles : tous les quatre ans, sauf les années séculaires non divisibles par 400.",
    ageTitle: y => `Âge et signe animal en ${y}`,
    ageRow: (y, a, an) => `Né en ${y} · ${a} ans · ${an}`,
    sameZodiacTitle: s => `Autres jours du signe ${s}`,
    nearbyTitle: 'Dates voisines',
    note: 'Les signes et les pierres suivent les tables les plus répandues ; les traits de caractère sont à lire pour le plaisir.',
  },
  hi: {
    h1: d => `${d} को जन्मे लोग`,
    metaTitle: (d, s) => `${d} जन्मदिन — ${s}, जन्म रत्न और आयु तालिका`,
    metaDesc: (d, s, st) => `${d} को जन्मे लोगों की राशि ${s} है और जन्म रत्न ${st}। साथ में वर्ष का दिन और जन्म वर्ष के अनुसार आयु भी।`,
    dateLabel: (m, d) => `${d}/${m}`,
    zodiacTitle: 'राशि', period: 'अवधि', element: 'तत्व',
    stoneTitle: 'जन्म रत्न और पुष्प', stone: 'रत्न', flower: 'पुष्प',
    dayNumTitle: 'वर्ष का कौन-सा दिन',
    dayNum: (n, left) => `यह ${n}वाँ दिन है; वर्ष के ${left} दिन बाकी हैं।`,
    leapNote: '29 फ़रवरी केवल लीप वर्ष में आता है — हर चार साल में, पर शताब्दी वर्ष तभी जब 400 से विभाज्य हो।',
    ageTitle: y => `${y} के अनुसार आयु और राशि-पशु`,
    ageRow: (y, a, an) => `${y} में जन्म · ${a} वर्ष · ${an}`,
    sameZodiacTitle: s => `${s} के अन्य दिन`,
    nearbyTitle: 'आस-पास की तारीख़ें',
    note: 'राशि और रत्न प्रचलित तालिकाओं से हैं; स्वभाव संबंधी बातें मनोरंजन के लिए हैं।',
  },
  'zh-hans': {
    h1: d => `${d}出生的人`,
    metaTitle: (d, s) => `${d}生日 — ${s}、诞生石与年龄表`,
    metaDesc: (d, s, st) => `${d}出生的星座是${s}，诞生石是${st}。还可查看当年的第几天，以及按出生年份的年龄和生肖。`,
    dateLabel: (m, d) => `${m}月${d}日`,
    zodiacTitle: '星座', period: '日期', element: '元素',
    stoneTitle: '诞生石与诞生花', stone: '诞生石', flower: '诞生花',
    dayNumTitle: '一年中的第几天',
    dayNum: (n, left) => `是第${n}天，这一年还剩${left}天。`,
    leapNote: '2月29日只在闰年出现——每四年一次，逢百不闰，逢四百又闰。',
    ageTitle: y => `${y}年的年龄与生肖`,
    ageRow: (y, a, an) => `${y}年生 · ${a}岁 · ${an}`,
    sameZodiacTitle: s => `同为${s}的其他日子`,
    nearbyTitle: '相近的日期',
    note: '星座与诞生石依据通行的表格，性格描述仅供娱乐。',
  },
  'zh-hant': {
    h1: d => `${d}出生的人`,
    metaTitle: (d, s) => `${d}生日 — ${s}、誕生石與年齡表`,
    metaDesc: (d, s, st) => `${d}出生的星座是${s}，誕生石是${st}。另可查看當年的第幾天，以及依出生年份的年齡與生肖。`,
    dateLabel: (m, d) => `${m}月${d}日`,
    zodiacTitle: '星座', period: '日期', element: '元素',
    stoneTitle: '誕生石與誕生花', stone: '誕生石', flower: '誕生花',
    dayNumTitle: '一年中的第幾天',
    dayNum: (n, left) => `是第${n}天，這一年還剩${left}天。`,
    leapNote: '2月29日只在閏年出現——每四年一次，逢百不閏，逢四百又閏。',
    ageTitle: y => `${y}年的年齡與生肖`,
    ageRow: (y, a, an) => `${y}年生 · ${a}歲 · ${an}`,
    sameZodiacTitle: s => `同為${s}的其他日子`,
    nearbyTitle: '相近的日期',
    note: '星座與誕生石依據通行的表格，性格描述僅供娛樂。',
  },
};
