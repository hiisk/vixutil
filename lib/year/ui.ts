/**
 * 연도 사전 화면의 문구 — 열 언어.
 *
 * 요일·띠·간지 이름은 언어마다 다르지만, 십간십이지는 한자문화권 밖에서는
 * 옮길 낱말이 없다. 그래서 한국은 한글 음, 일본·중국은 한자, 나머지는 로마자
 * 표기를 쓴다 — 없는 낱말을 지어내는 것보다 소리를 적어 주는 편이 낫다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import { extraWeekdays, yearReasonKeys, type YearFacts, type YearReasonKey } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface YearUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  /** 일요일부터 일곱 개 */
  weekdays: string[];
  /** 자(쥐)부터 열두 개 — 십이지와 자리가 같다 */
  zodiac: string[];
  stems: string[];
  branches: string[];
  leapLabel: string;
  daysLabel: string;
  febLabel: string;
  firstDayLabel: string;
  lastDayLabel: string;
  weeksLabel: string;
  cycleLabel: string;
  zodiacLabel: string;
  prevLeapLabel: string;
  nextLeapLabel: string;
  yes: string;
  no: string;
  leapTitle: string;
  leapNote: string;
  ruleText: (f: YearFacts) => string;
  weekTitle: string;
  weekNote: string;
  cycleTitle: string;
  cycleNote: string;
  skippedTitle: string;
  skippedNote: string;
  monthTitle: string;
  decadeTitle: string;
  decadeName: (from: number) => string;
  neighbourTitle: string;
  /**
   * 이 해가 왜 그런지 — 달력 규칙에서 갈래를 뽑아 문장으로 낸다.
   *
   * 갈래 열쇠는 facts.ts의 yearReasonKeys가 정한다(언어를 안 가린다). 241해가
   * 스물세 가지 조합으로 갈리고, 가장 큰 조합이 11%다.
   */
  reasons: (f: YearFacts) => string[];
  reasonsTitle: string;
  desc: (f: YearFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: YearFacts) => string;
  metaDesc: (f: YearFacts) => string;
  hubFaq: FaqItem[];
  yearFaq: (f: YearFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 십간·십이지는 한자문화권 밖에 옮길 낱말이 없어 소리를 적는다 */
const HAN_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const HAN_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ROMAN_STEMS = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
const ROMAN_BRANCHES = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];
const KO_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const KO_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

/*
 * ── 갈래마다 한 줄 (2026-08-12) ─────────────────────────────
 * 열쇠는 facts.ts의 yearReasonKeys가 정하고, 여기는 그 열쇠에 붙는 문장만 갖는다.
 * 요일 이름이 문장 안에 들어가므로 같은 열쇠라도 해마다 갈린다 — 그것이 241해를
 * 스물세 갈래로 벌리는 축이다. 전에는 형제끼리 낱말 96%가 같았다.
 *
 * 요일 이름은 위의 weekdays 표를 그대로 쓴다. 두 벌로 두면 한쪽만 고쳐진다.
 */
const YEAR_REASON: L<Record<YearReasonKey, (f: YearFacts, week: string[]) => string>> = {
  ko: {
    not4: f => `${f.year}는 4로 나뉘지 않아 평년입니다. 2월이 28일이고 한 해가 365일입니다.`,
    by4: f => `${f.year}는 4로 나뉘어 윤년입니다. 지구가 태양을 도는 데 365일보다 약 6시간이 더 걸려, 넉 해마다 하루를 얹어 맞춥니다.`,
    by100: f => `${f.year}는 4로 나뉘지만 100으로도 나뉘어 윤년에서 빠집니다. 넉 해마다 하루를 얹으면 조금 과해서, 백 해마다 한 번 건너뜁니다.`,
    by400: f => `${f.year}는 100으로 나뉘지만 400으로도 나뉘어 다시 윤년입니다. 백 해마다 건너뛰는 것도 조금 과해서, 사백 해마다 한 번은 건너뛰지 않습니다.`,
    weeks53: f => `ISO 기준으로 53주짜리 해입니다. 목요일이 든 주를 그 해의 주로 세는데, 이 해에는 목요일이 53번 들어옵니다.`,
    ganjiFirst: f => `간지 60년 주기가 이 해에 다시 시작합니다 — 갑자년입니다.`,
    centuryStart: f => `${f.year}는 세기의 첫 해입니다. 세기를 1년부터 100년까지로 세기 때문입니다.`,
    centuryEnd: f => `${f.year}는 세기의 끝 해입니다. 0으로 끝나는 해가 그 세기의 마지막입니다.`,
    sameEnds: (f, w) => `1월 1일과 12월 31일이 모두 ${w[f.firstWeekday]}입니다. 평년은 365일이라 52주에 하루가 남아 앞뒤가 같은 요일로 맞물립니다.`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join('과 ');
      return `${f.year}에는 ${days}이 53번 들어옵니다. ${f.leap ? '366일은 52주에 이틀이 남아 두 요일이 하나씩 더 듭니다.' : '365일은 52주에 하루가 남아 한 요일만 하나 더 듭니다.'}`;
    },
  },
  en: {
    not4: f => `${f.year} is not divisible by 4, so it is a common year: February has 28 days and the year runs 365.`,
    by4: f => `${f.year} is divisible by 4, so it is a leap year. The Earth takes about six hours more than 365 days to go round the Sun, so a day is added every fourth year.`,
    by100: f => `${f.year} is divisible by 4 but also by 100, so the leap day is skipped. Adding a day every fourth year overshoots slightly, so one is dropped every hundred years.`,
    by400: f => `${f.year} is divisible by 100 but also by 400, so it is a leap year after all. Skipping every hundredth year overshoots too, so every four hundredth year keeps its leap day.`,
    weeks53: f => `By ISO reckoning this year runs 53 weeks. A week belongs to the year that holds its Thursday, and this year holds 53 Thursdays.`,
    ganjiFirst: f => `The sixty-year sexagenary cycle starts again this year — it is a Jiazi year.`,
    centuryStart: f => `${f.year} is the first year of its century, because centuries are counted from year 1 to year 100.`,
    centuryEnd: f => `${f.year} is the last year of its century: the year ending in 00 closes it.`,
    sameEnds: (f, w) => `Both 1 January and 31 December fall on a ${w[f.firstWeekday]}. A common year is 365 days — 52 weeks plus one — so the two ends meet on the same weekday.`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join(' and ');
      return `${f.year} holds 53 of one weekday: ${days}. ${f.leap ? '366 days leave two days over 52 weeks, so two weekdays come round an extra time.' : '365 days leave one day over 52 weeks, so only one weekday comes round again.'}`;
    },
  },
  es: {
    not4: f => `${f.year} no es divisible por 4, así que es común: febrero tiene 28 días y el año dura 365.`,
    by4: f => `${f.year} es divisible por 4, así que es bisiesto. La Tierra tarda unas seis horas más de 365 días en dar la vuelta al Sol, y por eso se añade un día cada cuatro años.`,
    by100: f => `${f.year} es divisible por 4 pero también por 100, así que se salta el día extra. Añadirlo cada cuatro años se pasa un poco, y se quita uno cada cien.`,
    by400: f => `${f.year} es divisible por 100 pero también por 400, así que sí es bisiesto. Saltarlo cada cien años también se pasa, y cada cuatrocientos se mantiene.`,
    weeks53: f => `Según la ISO este año abarca 53 semanas. Una semana pertenece al año que contiene su jueves, y este año tiene 53 jueves.`,
    ganjiFirst: f => `El ciclo sexagenario vuelve a empezar este año: es un año Jiazi.`,
    centuryStart: f => `${f.year} es el primer año de su siglo, porque los siglos se cuentan del año 1 al 100.`,
    centuryEnd: f => `${f.year} es el último año de su siglo: el año que acaba en 00 lo cierra.`,
    sameEnds: (f, w) => `El 1 de enero y el 31 de diciembre caen en ${w[f.firstWeekday]}. Un año común tiene 365 días —52 semanas y uno— y los dos extremos coinciden.`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join(' y ');
      return `${f.year} tiene 53 veces un día: ${days}. ${f.leap ? '366 días dejan dos sobre 52 semanas, así que dos días se repiten.' : '365 días dejan uno sobre 52 semanas, así que solo un día se repite.'}`;
    },
  },
  pt: {
    not4: f => `${f.year} não é divisível por 4, então é comum: fevereiro tem 28 dias e o ano dura 365.`,
    by4: f => `${f.year} é divisível por 4, então é bissexto. A Terra leva cerca de seis horas mais que 365 dias para dar a volta ao Sol, e por isso se acrescenta um dia a cada quatro anos.`,
    by100: f => `${f.year} é divisível por 4 mas também por 100, então o dia extra é saltado. Acrescentá-lo a cada quatro anos passa um pouco, e tira-se um a cada cem.`,
    by400: f => `${f.year} é divisível por 100 mas também por 400, então é bissexto mesmo assim. Saltar a cada cem anos também passa, e a cada quatrocentos mantém-se.`,
    weeks53: f => `Pela ISO este ano tem 53 semanas. Uma semana pertence ao ano que contém a sua quinta-feira, e este ano tem 53 delas.`,
    ganjiFirst: f => `O ciclo sexagenário começa de novo neste ano: é um ano Jiazi.`,
    centuryStart: f => `${f.year} é o primeiro ano do seu século, porque os séculos contam-se do ano 1 ao 100.`,
    centuryEnd: f => `${f.year} é o último ano do seu século: o ano que acaba em 00 fecha-o.`,
    sameEnds: (f, w) => `1 de janeiro e 31 de dezembro caem em ${w[f.firstWeekday]}. Um ano comum tem 365 dias — 52 semanas e um — e as duas pontas encontram-se.`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join(' e ');
      return `${f.year} tem 53 vezes um dia: ${days}. ${f.leap ? '366 dias deixam dois sobre 52 semanas, então dois dias repetem-se.' : '365 dias deixam um sobre 52 semanas, então só um dia se repete.'}`;
    },
  },
  ja: {
    not4: f => `${f.year}年は4で割れないので平年です。2月が28日で、1年は365日です。`,
    by4: f => `${f.year}年は4で割れるので閏年です。地球が太陽を回るのに365日より約6時間長くかかるため、4年ごとに1日を足して合わせます。`,
    by100: f => `${f.year}年は4で割れますが100でも割れるので閏年から外れます。4年ごとに1日足すと少し行き過ぎるため、100年ごとに1回飛ばします。`,
    by400: f => `${f.year}年は100で割れますが400でも割れるので、やはり閏年です。100年ごとに飛ばすのも少し行き過ぎるため、400年ごとに1回は飛ばしません。`,
    weeks53: f => `ISOでは53週の年です。木曜を含む週をその年の週と数えるので、この年には木曜が53回入ります。`,
    ganjiFirst: f => `干支の60年周期がこの年から始まります——甲子の年です。`,
    centuryStart: f => `${f.year}年はその世紀の最初の年です。世紀を1年から100年までと数えるからです。`,
    centuryEnd: f => `${f.year}年はその世紀の最後の年です。00で終わる年がその世紀を閉じます。`,
    sameEnds: (f, w) => `1月1日と12月31日がどちらも${w[f.firstWeekday]}です。平年は365日で52週に1日余るため、前と後ろが同じ曜日で噛み合います。`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join('と');
      return `${f.year}年には${days}が53回入ります。${f.leap ? '366日は52週に2日余るので、2つの曜日が1回ずつ多く入ります。' : '365日は52週に1日余るので、1つの曜日だけが1回多く入ります。'}`;
    },
  },
  de: {
    not4: f => `${f.year} ist nicht durch 4 teilbar, also ein Gemeinjahr: Der Februar hat 28 Tage und das Jahr 365.`,
    by4: f => `${f.year} ist durch 4 teilbar, also ein Schaltjahr. Die Erde braucht etwa sechs Stunden mehr als 365 Tage um die Sonne, darum kommt jedes vierte Jahr ein Tag dazu.`,
    by100: f => `${f.year} ist durch 4 teilbar, aber auch durch 100 — der Schalttag fällt weg. Jedes vierte Jahr einen Tag zu geben, ist etwas zu viel, darum lässt man alle hundert Jahre einen aus.`,
    by400: f => `${f.year} ist durch 100 teilbar, aber auch durch 400 — also doch ein Schaltjahr. Alle hundert Jahre auszulassen, ist auch etwas zu viel, darum bleibt jedes vierhundertste Jahr ein Schaltjahr.`,
    weeks53: f => `Nach ISO hat dieses Jahr 53 Wochen. Eine Woche gehört zu dem Jahr, in dem ihr Donnerstag liegt, und dieses Jahr hat 53 Donnerstage.`,
    ganjiFirst: f => `Der sechzigjährige Zyklus beginnt in diesem Jahr neu — es ist ein Jiazi-Jahr.`,
    centuryStart: f => `${f.year} ist das erste Jahr seines Jahrhunderts, denn Jahrhunderte zählen von Jahr 1 bis Jahr 100.`,
    centuryEnd: f => `${f.year} ist das letzte Jahr seines Jahrhunderts: Das Jahr auf 00 schließt es ab.`,
    sameEnds: (f, w) => `Der 1. Januar und der 31. Dezember fallen beide auf einen ${w[f.firstWeekday]}. Ein Gemeinjahr hat 365 Tage — 52 Wochen und einen — darum treffen sich die beiden Enden.`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join(' und ');
      return `${f.year} enthält einen Wochentag 53 Mal: ${days}. ${f.leap ? '366 Tage lassen zwei über 52 Wochen übrig, darum kommen zwei Wochentage einmal mehr.' : '365 Tage lassen einen über 52 Wochen übrig, darum kommt nur ein Wochentag einmal mehr.'}`;
    },
  },
  fr: {
    not4: f => `${f.year} n’est pas divisible par 4, c’est donc une année commune : février a 28 jours et l’année 365.`,
    by4: f => `${f.year} est divisible par 4, c’est donc une année bissextile. La Terre met environ six heures de plus que 365 jours pour tourner autour du Soleil, d’où un jour ajouté tous les quatre ans.`,
    by100: f => `${f.year} est divisible par 4 mais aussi par 100 : le jour ajouté est sauté. Ajouter un jour tous les quatre ans dépasse un peu, on en retire un tous les cent ans.`,
    by400: f => `${f.year} est divisible par 100 mais aussi par 400 : c’est bien une année bissextile. Sauter tous les cent ans dépasse aussi, alors tous les quatre cents ans on ne saute pas.`,
    weeks53: f => `Selon l’ISO cette année compte 53 semaines. Une semaine appartient à l’année qui contient son jeudi, et cette année en a 53.`,
    ganjiFirst: f => `Le cycle sexagésimal recommence cette année : c’est une année Jiazi.`,
    centuryStart: f => `${f.year} est la première année de son siècle, car les siècles se comptent de l’an 1 à l’an 100.`,
    centuryEnd: f => `${f.year} est la dernière année de son siècle : l’année en 00 le referme.`,
    sameEnds: (f, w) => `Le 1er janvier et le 31 décembre tombent tous deux un ${w[f.firstWeekday]}. Une année commune fait 365 jours — 52 semaines et un — et les deux bouts se rejoignent.`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join(' et ');
      return `${f.year} contient 53 fois un jour : ${days}. ${f.leap ? '366 jours laissent deux jours sur 52 semaines, donc deux jours reviennent une fois de plus.' : '365 jours laissent un jour sur 52 semaines, donc un seul jour revient une fois de plus.'}`;
    },
  },
  hi: {
    not4: f => `${f.year} 4 से नहीं कटता, इसलिए सामान्य वर्ष है: फ़रवरी 28 दिन की और वर्ष 365 दिन का।`,
    by4: f => `${f.year} 4 से कटता है, इसलिए लीप वर्ष है। पृथ्वी को सूर्य का चक्कर लगाने में 365 दिन से लगभग छह घंटे अधिक लगते हैं, इसलिए हर चौथे वर्ष एक दिन जोड़ा जाता है।`,
    by100: f => `${f.year} 4 से कटता है पर 100 से भी, इसलिए लीप दिन छूट जाता है। हर चौथे वर्ष जोड़ना कुछ अधिक है, इसलिए हर सौ वर्ष में एक छोड़ दिया जाता है।`,
    by400: f => `${f.year} 100 से कटता है पर 400 से भी, इसलिए यह लीप वर्ष ही है। हर सौ वर्ष छोड़ना भी कुछ अधिक है, इसलिए हर चार सौ वर्ष में नहीं छोड़ा जाता।`,
    weeks53: f => `ISO के अनुसार इस वर्ष में 53 सप्ताह हैं। सप्ताह उस वर्ष का माना जाता है जिसमें उसका गुरुवार पड़े, और इस वर्ष 53 गुरुवार हैं।`,
    ganjiFirst: f => `साठ वर्ष का चक्र इस वर्ष से फिर शुरू होता है — यह जियाज़ी वर्ष है।`,
    centuryStart: f => `${f.year} अपनी शताब्दी का पहला वर्ष है, क्योंकि शताब्दी वर्ष 1 से 100 तक गिनी जाती है।`,
    centuryEnd: f => `${f.year} अपनी शताब्दी का अंतिम वर्ष है: 00 पर ख़त्म होने वाला वर्ष उसे बंद करता है।`,
    sameEnds: (f, w) => `1 जनवरी और 31 दिसंबर दोनों ${w[f.firstWeekday]} पड़ते हैं। सामान्य वर्ष 365 दिन का है — 52 सप्ताह और एक — इसलिए दोनों सिरे मिल जाते हैं।`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join(' और ');
      return `${f.year} में एक दिन 53 बार आता है: ${days}। ${f.leap ? '366 दिन 52 सप्ताह पर दो दिन छोड़ते हैं, इसलिए दो दिन एक बार अधिक आते हैं।' : '365 दिन 52 सप्ताह पर एक दिन छोड़ते हैं, इसलिए केवल एक दिन अधिक आता है।'}`;
    },
  },
  zh: {
    not4: f => `${f.year} 不能被 4 整除，所以是平年：二月 28 天，全年 365 天。`,
    by4: f => `${f.year} 能被 4 整除，所以是闰年。地球绕太阳一圈比 365 天多约六小时，所以每四年加一天补上。`,
    by100: f => `${f.year} 能被 4 整除，但也能被 100 整除，于是不加这一天。每四年加一天略微多了，所以每一百年跳过一次。`,
    by400: f => `${f.year} 能被 100 整除，但也能被 400 整除，所以仍是闰年。每一百年跳过也略微多了，所以每四百年不跳。`,
    weeks53: f => `按 ISO 算这一年有 53 周。一周归入含其星期四的那一年，而这一年有 53 个星期四。`,
    ganjiFirst: f => `六十年的干支周期从这一年重新开始——这是甲子年。`,
    centuryStart: f => `${f.year} 是本世纪的第一年，因为世纪从第 1 年数到第 100 年。`,
    centuryEnd: f => `${f.year} 是本世纪的最后一年：以 00 结尾的年份把它收尾。`,
    sameEnds: (f, w) => `1 月 1 日和 12 月 31 日都是${w[f.firstWeekday]}。平年 365 天，52 周之外多出一天，所以首尾落在同一个星期。`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join('和');
      return `${f.year} 里${days}出现 53 次。${f.leap ? '366 天在 52 周之外多出两天，所以有两个星期各多出现一次。' : '365 天在 52 周之外多出一天，所以只有一个星期多出现一次。'}`;
    },
  },
  tw: {
    not4: f => `${f.year} 不能被 4 整除，所以是平年：二月 28 天，全年 365 天。`,
    by4: f => `${f.year} 能被 4 整除，所以是閏年。地球繞太陽一圈比 365 天多約六小時，所以每四年加一天補上。`,
    by100: f => `${f.year} 能被 4 整除，但也能被 100 整除，於是不加這一天。每四年加一天略微多了，所以每一百年跳過一次。`,
    by400: f => `${f.year} 能被 100 整除，但也能被 400 整除，所以仍是閏年。每一百年跳過也略微多了，所以每四百年不跳。`,
    weeks53: f => `按 ISO 算這一年有 53 週。一週歸入含其星期四的那一年，而這一年有 53 個星期四。`,
    ganjiFirst: f => `六十年的干支週期從這一年重新開始——這是甲子年。`,
    centuryStart: f => `${f.year} 是本世紀的第一年，因為世紀從第 1 年數到第 100 年。`,
    centuryEnd: f => `${f.year} 是本世紀的最後一年：以 00 結尾的年份把它收尾。`,
    sameEnds: (f, w) => `1 月 1 日和 12 月 31 日都是${w[f.firstWeekday]}。平年 365 天，52 週之外多出一天，所以首尾落在同一個星期。`,
    extraWeekday: (f, w) => {
      const days = extraWeekdays(f).map(d => w[d]).join('和');
      return `${f.year} 裡${days}出現 53 次。${f.leap ? '366 天在 52 週之外多出兩天，所以有兩個星期各多出現一次。' : '365 天在 52 週之外多出一天，所以只有一個星期多出現一次。'}`;
    },
  },
};

type Spec = { [K in keyof YearUI]: L<YearUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('연도 사전', 'Years', 'Años', 'Anos', '年の事典', 'Jahre', 'Années', 'वर्ष', '年份词典', '年份詞典'),

  weekdays: T<string[]>(
    ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
    ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
    ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  ),

  zodiac: T<string[]>(
    ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'],
    ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'],
    ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'],
    ['Rato', 'Boi', 'Tigre', 'Coelho', 'Dragão', 'Serpente', 'Cavalo', 'Cabra', 'Macaco', 'Galo', 'Cão', 'Porco'],
    ['ねずみ', 'うし', 'とら', 'うさぎ', 'たつ', 'へび', 'うま', 'ひつじ', 'さる', 'とり', 'いぬ', 'いのしし'],
    ['Ratte', 'Ochse', 'Tiger', 'Hase', 'Drache', 'Schlange', 'Pferd', 'Ziege', 'Affe', 'Hahn', 'Hund', 'Schwein'],
    ['Rat', 'Bœuf', 'Tigre', 'Lapin', 'Dragon', 'Serpent', 'Cheval', 'Chèvre', 'Singe', 'Coq', 'Chien', 'Cochon'],
    ['चूहा', 'बैल', 'बाघ', 'खरगोश', 'ड्रैगन', 'साँप', 'घोड़ा', 'बकरी', 'बंदर', 'मुर्गा', 'कुत्ता', 'सूअर'],
    ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
    ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'],
  ),

  stems: T<string[]>(
    KO_STEMS, ROMAN_STEMS, ROMAN_STEMS, ROMAN_STEMS, HAN_STEMS,
    ROMAN_STEMS, ROMAN_STEMS, ROMAN_STEMS, HAN_STEMS, HAN_STEMS,
  ),

  branches: T<string[]>(
    KO_BRANCHES, ROMAN_BRANCHES, ROMAN_BRANCHES, ROMAN_BRANCHES, HAN_BRANCHES,
    ROMAN_BRANCHES, ROMAN_BRANCHES, ROMAN_BRANCHES, HAN_BRANCHES, HAN_BRANCHES,
  ),

  hubTitle: T(
    '연도 사전 201해 — 윤년·요일·주 수·띠',
    '201 years — leap years, weekdays, week counts and zodiac signs',
    '201 años — bisiestos, días de la semana, semanas y signos del zodiaco',
    '201 anos — bissextos, dias da semana, semanas e signos do zodíaco',
    '年の事典201年分 — うるう年・曜日・週数・干支',
    '201 Jahre — Schaltjahre, Wochentage, Wochenzahl und Tierkreis',
    '201 années — bissextiles, jours de la semaine, nombre de semaines et zodiaque',
    '201 वर्ष — लीप वर्ष, वार, सप्ताह-संख्या और राशिचक्र',
    '201 个年份 — 闰年、星期、周数与生肖',
    '201 個年份 — 閏年、星期、週數與生肖',
  ),

  hubLead: T(
    '1900년부터 2100년까지 한 해씩. 윤년인지, 며칠인지, 1월 1일이 무슨 요일인지, 몇 주짜리 해인지, 간지와 띠까지 계산해 냅니다.',
    'Every year from 1900 to 2100: whether it is a leap year, how many days it holds, what weekday New Year’s Day falls on, how many ISO weeks it has, and which sign of the sixty-year cycle it carries.',
    'Cada año de 1900 a 2100: si es bisiesto, cuántos días tiene, en qué día cae el 1 de enero, cuántas semanas ISO abarca y qué signo del ciclo de sesenta años le toca.',
    'Cada ano de 1900 a 2100: se é bissexto, quantos dias tem, em que dia cai 1º de janeiro, quantas semanas ISO abrange e qual signo do ciclo de sessenta anos lhe cabe.',
    '1900年から2100年まで1年ずつ。うるう年かどうか、何日あるか、1月1日が何曜日か、何週の年か、干支まで計算します。',
    'Jedes Jahr von 1900 bis 2100: ob Schaltjahr, wie viele Tage, auf welchen Wochentag Neujahr fällt, wie viele ISO-Wochen es hat und welches Zeichen des Sechzigjahrzyklus.',
    'Chaque année de 1900 à 2100 : bissextile ou non, son nombre de jours, le jour du 1er janvier, son nombre de semaines ISO et son signe dans le cycle de soixante ans.',
    '1900 से 2100 तक हर वर्ष: लीप है या नहीं, कितने दिन, 1 जनवरी किस वार, कितने ISO सप्ताह, और साठ-वर्षीय चक्र का कौन-सा चिह्न।',
    '从 1900 到 2100 逐年列出：是否闰年、共几天、1 月 1 日是星期几、有几个 ISO 周，以及干支与生肖。',
    '從 1900 到 2100 逐年列出：是否閏年、共幾天、1 月 1 日是星期幾、有幾個 ISO 週，以及干支與生肖。',
  ),

  leapLabel: T('윤년', 'Leap year', 'Bisiesto', 'Bissexto', 'うるう年', 'Schaltjahr', 'Bissextile', 'लीप वर्ष', '闰年', '閏年'),
  daysLabel: T('그 해 날 수', 'Days in the year', 'Días del año', 'Dias no ano', '年の日数', 'Tage im Jahr', 'Jours dans l’année', 'वर्ष के दिन', '全年天数', '全年天數'),
  febLabel: T('2월', 'February', 'Febrero', 'Fevereiro', '2月', 'Februar', 'Février', 'फ़रवरी', '二月', '二月'),
  firstDayLabel: T('1월 1일', '1 January', '1 de enero', '1º de janeiro', '1月1日', '1. Januar', '1er janvier', '1 जनवरी', '1 月 1 日', '1 月 1 日'),
  lastDayLabel: T('12월 31일', '31 December', '31 de diciembre', '31 de dezembro', '12月31日', '31. Dezember', '31 décembre', '31 दिसंबर', '12 月 31 日', '12 月 31 日'),
  weeksLabel: T('ISO 주 수', 'ISO weeks', 'Semanas ISO', 'Semanas ISO', 'ISO週数', 'ISO-Wochen', 'Semaines ISO', 'ISO सप्ताह', 'ISO 周数', 'ISO 週數'),
  cycleLabel: T('간지', 'Sexagenary sign', 'Signo sexagenario', 'Signo sexagenário', '干支', 'Sechzigjahrzeichen', 'Signe sexagésimal', 'षष्ठिवर्षीय चिह्न', '干支', '干支'),
  zodiacLabel: T('띠', 'Zodiac animal', 'Animal del zodiaco', 'Animal do zodíaco', '十二支の動物', 'Tierkreiszeichen', 'Animal du zodiaque', 'राशि पशु', '生肖', '生肖'),
  prevLeapLabel: T('앞 윤년', 'Previous leap year', 'Bisiesto anterior', 'Bissexto anterior', '前のうるう年', 'Vorheriges Schaltjahr', 'Bissextile précédente', 'पिछला लीप वर्ष', '上一个闰年', '上一個閏年'),
  nextLeapLabel: T('다음 윤년', 'Next leap year', 'Próximo bisiesto', 'Próximo bissexto', '次のうるう年', 'Nächstes Schaltjahr', 'Prochaine bissextile', 'अगला लीप वर्ष', '下一个闰年', '下一個閏年'),
  yes: T('예', 'Yes', 'Sí', 'Sim', 'はい', 'Ja', 'Oui', 'हाँ', '是', '是'),
  no: T('아니요', 'No', 'No', 'Não', 'いいえ', 'Nein', 'Non', 'नहीं', '否', '否'),

  leapTitle: T('윤년을 가르는 규칙', 'The rule for leap years', 'La regla de los bisiestos', 'A regra dos bissextos', 'うるう年を決める規則', 'Die Schaltjahresregel', 'La règle des années bissextiles', 'लीप वर्ष का नियम', '闰年的判定规则', '閏年的判定規則'),

  leapNote: T(
    '4로 나뉘면 윤년, 100으로 나뉘면 윤년이 아니고, 400으로 나뉘면 다시 윤년입니다. 그래서 1900년은 윤년이 아니고 2000년은 윤년이었습니다.',
    'Divisible by 4 makes a leap year, divisible by 100 takes it back, divisible by 400 grants it again. That is why 1900 was not a leap year and 2000 was.',
    'Divisible entre 4, año bisiesto; divisible entre 100, deja de serlo; divisible entre 400, vuelve a serlo. Por eso 1900 no fue bisiesto y 2000 sí.',
    'Divisível por 4 é bissexto; divisível por 100 deixa de ser; divisível por 400 volta a ser. Por isso 1900 não foi bissexto e 2000 foi.',
    '4で割り切れればうるう年、100で割り切れると外れ、400で割り切れると再びうるう年です。だから1900年はうるう年でなく、2000年はうるう年でした。',
    'Durch 4 teilbar heißt Schaltjahr, durch 100 teilbar nimmt es zurück, durch 400 teilbar gibt es wieder. Deshalb war 1900 kein Schaltjahr und 2000 eines.',
    'Divisible par 4 : bissextile ; divisible par 100 : elle ne l’est plus ; divisible par 400 : elle l’est de nouveau. Voilà pourquoi 1900 ne l’était pas et 2000 si.',
    '4 से विभाज्य हो तो लीप वर्ष, 100 से विभाज्य हो तो नहीं, और 400 से विभाज्य हो तो फिर से लीप। इसीलिए 1900 लीप नहीं था और 2000 था।',
    '能被 4 整除是闰年，能被 100 整除则不是，能被 400 整除又是。所以 1900 年不是闰年，2000 年是。',
    '能被 4 整除是閏年，能被 100 整除則不是，能被 400 整除又是。所以 1900 年不是閏年，2000 年是。',
  ),

  ruleText: T<(f: YearFacts) => string>(
    f => ({ not4: `${f.year}은 4로 나뉘지 않습니다`, by4: `${f.year} ÷ 4 = ${f.year / 4} — 나뉘고 100으로는 나뉘지 않습니다`, by100: `${f.year}은 100으로 나뉘고 400으로는 나뉘지 않습니다`, by400: `${f.year} ÷ 400 = ${f.year / 400} — 400으로 나뉩니다` })[f.rule],
    f => ({ not4: `${f.year} is not divisible by 4`, by4: `${f.year} ÷ 4 = ${f.year / 4}, and it is not divisible by 100`, by100: `${f.year} is divisible by 100 but not by 400`, by400: `${f.year} ÷ 400 = ${f.year / 400}` })[f.rule],
    f => ({ not4: `${f.year} no es divisible entre 4`, by4: `${f.year} ÷ 4 = ${f.year / 4}, y no es divisible entre 100`, by100: `${f.year} es divisible entre 100 pero no entre 400`, by400: `${f.year} ÷ 400 = ${f.year / 400}` })[f.rule],
    f => ({ not4: `${f.year} não é divisível por 4`, by4: `${f.year} ÷ 4 = ${f.year / 4}, e não é divisível por 100`, by100: `${f.year} é divisível por 100, mas não por 400`, by400: `${f.year} ÷ 400 = ${f.year / 400}` })[f.rule],
    f => ({ not4: `${f.year}は4で割り切れません`, by4: `${f.year} ÷ 4 = ${f.year / 4}、100では割り切れません`, by100: `${f.year}は100で割り切れ、400では割り切れません`, by400: `${f.year} ÷ 400 = ${f.year / 400}` })[f.rule],
    f => ({ not4: `${f.year} ist nicht durch 4 teilbar`, by4: `${f.year} ÷ 4 = ${f.year / 4}, und nicht durch 100 teilbar`, by100: `${f.year} ist durch 100 teilbar, aber nicht durch 400`, by400: `${f.year} ÷ 400 = ${f.year / 400}` })[f.rule],
    f => ({ not4: `${f.year} n’est pas divisible par 4`, by4: `${f.year} ÷ 4 = ${f.year / 4}, et pas divisible par 100`, by100: `${f.year} est divisible par 100 mais pas par 400`, by400: `${f.year} ÷ 400 = ${f.year / 400}` })[f.rule],
    f => ({ not4: `${f.year} 4 से विभाज्य नहीं है`, by4: `${f.year} ÷ 4 = ${f.year / 4}, और 100 से विभाज्य नहीं`, by100: `${f.year} 100 से विभाज्य है पर 400 से नहीं`, by400: `${f.year} ÷ 400 = ${f.year / 400}` })[f.rule],
    f => ({ not4: `${f.year} 不能被 4 整除`, by4: `${f.year} ÷ 4 = ${f.year / 4}，且不能被 100 整除`, by100: `${f.year} 能被 100 整除，但不能被 400 整除`, by400: `${f.year} ÷ 400 = ${f.year / 400}` })[f.rule],
    f => ({ not4: `${f.year} 不能被 4 整除`, by4: `${f.year} ÷ 4 = ${f.year / 4}，且不能被 100 整除`, by100: `${f.year} 能被 100 整除，但不能被 400 整除`, by400: `${f.year} ÷ 400 = ${f.year / 400}` })[f.rule],
  ),

  weekTitle: T('52주인 해와 53주인 해', 'Years of 52 weeks and of 53', 'Años de 52 semanas y de 53', 'Anos de 52 semanas e de 53', '52週の年と53週の年', 'Jahre mit 52 und mit 53 Wochen', 'Années de 52 et de 53 semaines', '52 और 53 सप्ताह वाले वर्ष', '52 周与 53 周的年份', '52 週與 53 週的年份'),

  weekNote: T(
    'ISO는 목요일이 든 주를 그 해의 주로 셉니다. 그래서 목요일이 53번 드는 해만 53주가 됩니다 — 1월 1일이 목요일이거나, 윤년이면서 수요일인 해입니다.',
    'ISO counts a week as belonging to the year that holds its Thursday. A year runs to 53 weeks only when it contains 53 Thursdays — that is, when 1 January is a Thursday, or a Wednesday in a leap year.',
    'La ISO asigna cada semana al año que contiene su jueves. Un año llega a 53 semanas solo si tiene 53 jueves: cuando el 1 de enero cae en jueves, o en miércoles siendo bisiesto.',
    'A ISO atribui cada semana ao ano que contém sua quinta-feira. Um ano chega a 53 semanas só quando tem 53 quintas-feiras: quando 1º de janeiro cai numa quinta, ou numa quarta em ano bissexto.',
    'ISOは木曜日が入る週をその年の週として数えます。だから木曜日が53回ある年だけが53週になります——1月1日が木曜日、またはうるう年で水曜日の年です。',
    'Die ISO zählt eine Woche zu dem Jahr, in dem ihr Donnerstag liegt. Auf 53 Wochen kommt ein Jahr nur mit 53 Donnerstagen — wenn der 1. Januar ein Donnerstag ist oder im Schaltjahr ein Mittwoch.',
    'L’ISO rattache une semaine à l’année qui contient son jeudi. Une année n’atteint 53 semaines qu’avec 53 jeudis : quand le 1er janvier tombe un jeudi, ou un mercredi en année bissextile.',
    'ISO सप्ताह को उसी वर्ष का मानता है जिसमें उसका गुरुवार पड़ता है। इसलिए 53 सप्ताह उसी वर्ष में होते हैं जिसमें 53 गुरुवार हों — यानी 1 जनवरी गुरुवार हो, या लीप वर्ष में बुधवार।',
    'ISO 把一周归给包含其星期四的那一年。所以只有含 53 个星期四的年份才有 53 周——1 月 1 日是星期四，或闰年里是星期三。',
    'ISO 把一週歸給包含其星期四的那一年。所以只有含 53 個星期四的年份才有 53 週——1 月 1 日是星期四，或閏年裡是星期三。',
  ),

  cycleTitle: T('간지는 60년마다 돌아옵니다', 'The sixty-year cycle', 'El ciclo de sesenta años', 'O ciclo de sessenta anos', '干支は60年で一巡します', 'Der Sechzigjahrzyklus', 'Le cycle de soixante ans', 'साठ वर्ष का चक्र', '干支六十年一轮', '干支六十年一輪'),

  cycleNote: T(
    '십간 열 개와 십이지 열두 개가 한 칸씩 함께 넘어가므로, 같은 짝은 60년 만에 돌아옵니다. 띠만 보면 12년입니다.',
    'Ten heavenly stems and twelve earthly branches advance together, one step each year, so the same pair returns only after sixty years. The animal alone repeats every twelve.',
    'Diez troncos celestes y doce ramas terrestres avanzan a la vez, un paso por año, así que el mismo par vuelve a los sesenta años. El animal solo se repite cada doce.',
    'Dez troncos celestes e doze ramos terrestres avançam juntos, um passo por ano, então o mesmo par volta só depois de sessenta anos. O animal sozinho se repete a cada doze.',
    '十干10個と十二支12個が毎年1つずつ一緒に進むので、同じ組は60年でしか戻りません。動物だけなら12年です。',
    'Zehn Himmelsstämme und zwölf Erdzweige rücken jedes Jahr gemeinsam um eins vor, dasselbe Paar kehrt also erst nach sechzig Jahren wieder. Das Tier allein wiederholt sich alle zwölf.',
    'Dix troncs célestes et douze branches terrestres avancent ensemble d’un cran par an : la même paire ne revient qu’au bout de soixante ans. L’animal seul revient tous les douze ans.',
    'दस स्वर्गीय तने और बारह पार्थिव शाखाएँ हर वर्ष एक-एक कदम साथ बढ़ती हैं, इसलिए वही जोड़ी साठ वर्ष बाद लौटती है। केवल पशु बारह वर्ष में दोहराता है।',
    '十天干与十二地支每年各进一位，因此同一组合六十年才重现。单看生肖则是十二年一轮。',
    '十天干與十二地支每年各進一位，因此同一組合六十年才重現。單看生肖則是十二年一輪。',
  ),

  skippedTitle: T('4로 나뉘는데 윤년이 아닌 해', 'Divisible by four, yet not a leap year', 'Divisibles entre cuatro y no bisiestos', 'Divisíveis por quatro e não bissextos', '4で割り切れるのにうるう年でない年', 'Durch vier teilbar und doch kein Schaltjahr', 'Divisibles par quatre et pourtant non bissextiles', 'चार से विभाज्य पर लीप नहीं', '能被 4 整除却不是闰年', '能被 4 整除卻不是閏年'),

  skippedNote: T(
    '이 구간에는 1900년과 2100년 둘뿐입니다. 100으로 나뉘고 400으로는 나뉘지 않아 걸러집니다.',
    'Only 1900 and 2100 fall this way here: divisible by 100, not by 400, so the rule takes the day back.',
    'Aquí solo 1900 y 2100 caen así: divisibles entre 100, no entre 400, y la regla les quita el día.',
    'Aqui só 1900 e 2100 caem assim: divisíveis por 100, não por 400, e a regra tira o dia.',
    'この期間では1900年と2100年の2つだけです。100で割り切れ、400では割り切れないため外れます。',
    'In diesem Zeitraum trifft es nur 1900 und 2100: durch 100 teilbar, nicht durch 400 — die Regel nimmt den Tag zurück.',
    'Sur cette période, seules 1900 et 2100 sont dans ce cas : divisibles par 100, pas par 400, la règle leur retire le jour.',
    'इस अवधि में केवल 1900 और 2100 ऐसे हैं: 100 से विभाज्य, 400 से नहीं — इसलिए नियम वह दिन वापस ले लेता है।',
    '这一区间只有 1900 和 2100 是这样：能被 100 整除却不能被 400 整除，规则便收回那一天。',
    '這一區間只有 1900 和 2100 是這樣：能被 100 整除卻不能被 400 整除，規則便收回那一天。',
  ),

  monthTitle: T('달마다 며칠인지', 'Days in each month', 'Días de cada mes', 'Dias de cada mês', '月ごとの日数', 'Tage je Monat', 'Jours de chaque mois', 'हर महीने के दिन', '各月天数', '各月天數'),
  decadeTitle: T('십 년씩 묶어 보기', 'Decade by decade', 'Década a década', 'Década a década', '10年ごとに見る', 'Jahrzehnt für Jahrzehnt', 'Décennie par décennie', 'दशक दर दशक', '按十年查看', '按十年查看'),

  decadeName: T<(from: number) => string>(
    from => `${from}년대`,
    from => `${from}s`,
    from => `Años ${from}`,
    from => `Anos ${from}`,
    from => `${from}年代`,
    from => `${from}er-Jahre`,
    from => `Années ${from}`,
    from => `${from} का दशक`,
    from => `${from} 年代`,
    from => `${from} 年代`,
  ),

  neighbourTitle: T('가까운 해', 'Nearby years', 'Años cercanos', 'Anos próximos', '近い年', 'Jahre daneben', 'Années voisines', 'पास के वर्ष', '相邻的年份', '相鄰的年份'),

  reasonsTitle: T(
    '이 해가 왜 그런가', 'Why this year reads that way', 'Por qué este año sale así', 'Por que este ano sai assim',
    'この年がそうなる理由', 'Warum dieses Jahr so ausf\u00e4llt', 'Pourquoi cette ann\u00e9e dit cela',
    'यह वर्ष ऐसा क्यों', '这一年为什么这样', '這一年為什麼這樣',
  ),

  reasons: T<(f: YearFacts) => string[]>(
    ...(LANG_CODES.map(lang => (f: YearFacts) =>
      yearReasonKeys(f).map(k => YEAR_REASON[lang][k](f, SPEC_WEEK[lang]))) as
      Parameters<typeof T<(f: YearFacts) => string[]>>),
  ),

  desc: T<(f: YearFacts) => string>(
    f => `${f.year}년은 ${f.leap ? '윤년이라 366일' : '평년이라 365일'}이고, 1월 1일이 ${SPEC_WEEK.ko[f.firstWeekday]}입니다. ISO로는 ${f.isoWeeks}주짜리 해입니다.`,
    f => `${f.year} ${f.leap ? 'is a leap year of 366 days' : 'is a common year of 365 days'}, and 1 January falls on a ${SPEC_WEEK.en[f.firstWeekday]}. By ISO reckoning it runs ${f.isoWeeks} weeks.`,
    f => `${f.year} ${f.leap ? 'es bisiesto y tiene 366 días' : 'es común y tiene 365 días'}, y el 1 de enero cae en ${SPEC_WEEK.es[f.firstWeekday]}. Según la ISO abarca ${f.isoWeeks} semanas.`,
    f => `${f.year} ${f.leap ? 'é bissexto e tem 366 dias' : 'é comum e tem 365 dias'}, e 1º de janeiro cai numa ${SPEC_WEEK.pt[f.firstWeekday]}. Pela ISO abrange ${f.isoWeeks} semanas.`,
    f => `${f.year}年は${f.leap ? 'うるう年で366日' : '平年で365日'}、1月1日は${SPEC_WEEK.ja[f.firstWeekday]}です。ISOでは${f.isoWeeks}週の年になります。`,
    f => `${f.year} ${f.leap ? 'ist ein Schaltjahr mit 366 Tagen' : 'ist ein Gemeinjahr mit 365 Tagen'}, der 1. Januar fällt auf einen ${SPEC_WEEK.de[f.firstWeekday]}. Nach ISO umfasst es ${f.isoWeeks} Wochen.`,
    f => `${f.year} ${f.leap ? 'est bissextile et compte 366 jours' : 'est commune et compte 365 jours'} ; le 1er janvier tombe un ${SPEC_WEEK.fr[f.firstWeekday]}. Selon l’ISO, elle couvre ${f.isoWeeks} semaines.`,
    f => `${f.year} ${f.leap ? 'लीप वर्ष है और इसमें 366 दिन हैं' : 'सामान्य वर्ष है और इसमें 365 दिन हैं'}; 1 जनवरी को ${SPEC_WEEK.hi[f.firstWeekday]} पड़ता है। ISO के अनुसार इसमें ${f.isoWeeks} सप्ताह हैं।`,
    f => `${f.year} 年${f.leap ? '是闰年，共 366 天' : '是平年，共 365 天'}，1 月 1 日是${SPEC_WEEK.zh[f.firstWeekday]}。按 ISO 计，这一年有 ${f.isoWeeks} 周。`,
    f => `${f.year} 年${f.leap ? '是閏年，共 366 天' : '是平年，共 365 天'}，1 月 1 日是${SPEC_WEEK.tw[f.firstWeekday]}。按 ISO 計，這一年有 ${f.isoWeeks} 週。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '4로 나뉘면 윤년, 100으로 나뉘면 아니고, 400으로 나뉘면 다시 윤년입니다.',
      '윤년은 366일이고 2월이 29일까지 있습니다.',
      'ISO 주 수는 목요일이 몇 번 드느냐로 갈립니다 — 53번이면 53주입니다.',
      '간지는 60년, 띠는 12년마다 같은 자리로 돌아옵니다.',
    ],
    [
      'Divisible by 4 is a leap year, by 100 is not, by 400 is again.',
      'A leap year holds 366 days, and February runs to the 29th.',
      'The ISO week count follows the Thursdays: 53 of them make a 53-week year.',
      'The sexagenary sign returns every 60 years, the animal every 12.',
    ],
    [
      'Divisible entre 4 es bisiesto; entre 100 no lo es; entre 400 vuelve a serlo.',
      'Un año bisiesto tiene 366 días y febrero llega al 29.',
      'Las semanas ISO siguen a los jueves: 53 jueves hacen un año de 53 semanas.',
      'El signo sexagenario vuelve cada 60 años; el animal, cada 12.',
    ],
    [
      'Divisível por 4 é bissexto; por 100 não é; por 400 volta a ser.',
      'Um ano bissexto tem 366 dias e fevereiro vai até o dia 29.',
      'As semanas ISO seguem as quintas-feiras: 53 delas fazem um ano de 53 semanas.',
      'O signo sexagenário volta a cada 60 anos; o animal, a cada 12.',
    ],
    [
      '4で割り切れればうるう年、100で割り切れると外れ、400で割り切れると再びうるう年です。',
      'うるう年は366日あり、2月が29日まであります。',
      'ISOの週数は木曜日の数で決まります——53回あれば53週です。',
      '干支は60年、動物だけなら12年で同じ位置に戻ります。',
    ],
    [
      'Durch 4 teilbar ist Schaltjahr, durch 100 nicht, durch 400 wieder.',
      'Ein Schaltjahr hat 366 Tage, und der Februar reicht bis zum 29.',
      'Die ISO-Wochenzahl folgt den Donnerstagen: 53 davon ergeben ein 53-Wochen-Jahr.',
      'Das Sechzigjahrzeichen kehrt alle 60 Jahre wieder, das Tier alle 12.',
    ],
    [
      'Divisible par 4 : bissextile ; par 100 : non ; par 400 : de nouveau oui.',
      'Une année bissextile compte 366 jours et février va jusqu’au 29.',
      'Le nombre de semaines ISO suit les jeudis : 53 jeudis font une année de 53 semaines.',
      'Le signe sexagésimal revient tous les 60 ans, l’animal tous les 12.',
    ],
    [
      '4 से विभाज्य हो तो लीप, 100 से हो तो नहीं, 400 से हो तो फिर लीप।',
      'लीप वर्ष में 366 दिन होते हैं और फ़रवरी 29 तक चलती है।',
      'ISO सप्ताह-संख्या गुरुवारों से तय होती है — 53 गुरुवार यानी 53 सप्ताह।',
      'षष्ठिवर्षीय चिह्न 60 वर्ष में और पशु 12 वर्ष में लौटता है।',
    ],
    [
      '能被 4 整除是闰年，能被 100 整除不是，能被 400 整除又是。',
      '闰年有 366 天，二月到 29 日。',
      'ISO 周数看星期四的个数——有 53 个就是 53 周。',
      '干支 60 年一轮，生肖 12 年一轮。',
    ],
    [
      '能被 4 整除是閏年，能被 100 整除不是，能被 400 整除又是。',
      '閏年有 366 天，二月到 29 日。',
      'ISO 週數看星期四的個數——有 53 個就是 53 週。',
      '干支 60 年一輪，生肖 12 年一輪。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '연도 사전 — 1900년부터 2100년까지 윤년·요일·띠',
    'Year reference — leap years, weekdays and zodiac signs, 1900 to 2100',
    'Diccionario de años — bisiestos, días y zodiaco, de 1900 a 2100',
    'Dicionário de anos — bissextos, dias e zodíaco, de 1900 a 2100',
    '年の事典 — 1900年から2100年までのうるう年・曜日・干支',
    'Jahres-Nachschlagewerk — Schaltjahre, Wochentage und Tierkreis, 1900 bis 2100',
    'Dictionnaire des années — bissextiles, jours et zodiaque, de 1900 à 2100',
    'वर्ष कोश — 1900 से 2100 तक लीप वर्ष, वार और राशिचक्र',
    '年份词典 — 1900 到 2100 的闰年、星期与生肖',
    '年份詞典 — 1900 到 2100 的閏年、星期與生肖',
  ),

  hubMetaDesc: T(
    '1900년부터 2100년까지 201해를 한 장씩. 윤년 여부와 그 이유, 날 수, 1월 1일 요일, ISO 주 수, 간지와 띠를 계산했습니다.',
    'One page for each of the 201 years from 1900 to 2100, with the leap-year verdict and its reason, the day count, the weekday of 1 January, the ISO week count and the sexagenary sign.',
    'Una página por cada uno de los 201 años de 1900 a 2100: si es bisiesto y por qué, cuántos días tiene, el día del 1 de enero, las semanas ISO y el signo sexagenario.',
    'Uma página para cada um dos 201 anos de 1900 a 2100: se é bissexto e por quê, quantos dias tem, o dia de 1º de janeiro, as semanas ISO e o signo sexagenário.',
    '1900年から2100年までの201年を1ページずつ。うるう年かどうかとその理由、日数、1月1日の曜日、ISO週数、干支をまとめました。',
    'Je eine Seite für alle 201 Jahre von 1900 bis 2100 — mit Schaltjahresurteil samt Begründung, Tageszahl, Wochentag des 1. Januar, ISO-Wochenzahl und Sechzigjahrzeichen.',
    'Une page pour chacune des 201 années de 1900 à 2100 : bissextile ou non et pourquoi, nombre de jours, jour du 1er janvier, semaines ISO et signe sexagésimal.',
    '1900 से 2100 तक के सभी 201 वर्षों का एक-एक पृष्ठ: लीप है या नहीं और क्यों, दिनों की संख्या, 1 जनवरी का वार, ISO सप्ताह और षष्ठिवर्षीय चिह्न।',
    '1900 到 2100 共 201 个年份各一页：是否闰年及其原因、天数、1 月 1 日星期几、ISO 周数与干支生肖。',
    '1900 到 2100 共 201 個年份各一頁：是否閏年及其原因、天數、1 月 1 日星期幾、ISO 週數與干支生肖。',
  ),

  metaTitle: T<(f: YearFacts) => string>(
    f => `${f.year}년 — ${f.leap ? '윤년' : '평년'} ${f.days}일, 1월 1일 ${SPEC_WEEK.ko[f.firstWeekday]}`,
    f => `${f.year} — ${f.leap ? 'leap year' : 'common year'} of ${f.days} days, 1 January on a ${SPEC_WEEK.en[f.firstWeekday]}`,
    f => `${f.year} — año ${f.leap ? 'bisiesto' : 'común'} de ${f.days} días, 1 de enero en ${SPEC_WEEK.es[f.firstWeekday]}`,
    f => `${f.year} — ano ${f.leap ? 'bissexto' : 'comum'} de ${f.days} dias, 1º de janeiro numa ${SPEC_WEEK.pt[f.firstWeekday]}`,
    f => `${f.year}年 — ${f.leap ? 'うるう年' : '平年'}${f.days}日、1月1日は${SPEC_WEEK.ja[f.firstWeekday]}`,
    f => `${f.year} — ${f.leap ? 'Schaltjahr' : 'Gemeinjahr'} mit ${f.days} Tagen, 1. Januar an einem ${SPEC_WEEK.de[f.firstWeekday]}`,
    f => `${f.year} — année ${f.leap ? 'bissextile' : 'commune'} de ${f.days} jours, 1er janvier un ${SPEC_WEEK.fr[f.firstWeekday]}`,
    f => `${f.year} — ${f.leap ? 'लीप' : 'सामान्य'} वर्ष, ${f.days} दिन, 1 जनवरी ${SPEC_WEEK.hi[f.firstWeekday]}`,
    f => `${f.year} 年 — ${f.leap ? '闰年' : '平年'}${f.days} 天，1 月 1 日${SPEC_WEEK.zh[f.firstWeekday]}`,
    f => `${f.year} 年 — ${f.leap ? '閏年' : '平年'}${f.days} 天，1 月 1 日${SPEC_WEEK.tw[f.firstWeekday]}`,
  ),

  metaDesc: T<(f: YearFacts) => string>(
    f => `${f.year}년은 ${f.leap ? '윤년으로 2월이 29일까지' : '평년으로 2월이 28일까지'} 있습니다. 1월 1일 ${SPEC_WEEK.ko[f.firstWeekday]}, 12월 31일 ${SPEC_WEEK.ko[f.lastWeekday]}, ISO ${f.isoWeeks}주, ${SPEC_STEM.ko[f.stem]}${SPEC_BRANCH.ko[f.branch]}년입니다.`,
    f => `${f.year} is a ${f.leap ? 'leap year, so February reaches the 29th' : 'common year, so February stops at the 28th'}. 1 January is a ${SPEC_WEEK.en[f.firstWeekday]}, 31 December a ${SPEC_WEEK.en[f.lastWeekday]}, with ${f.isoWeeks} ISO weeks in the year of ${SPEC_STEM.en[f.stem]}-${SPEC_BRANCH.en[f.branch]}.`,
    f => `${f.year} es un año ${f.leap ? 'bisiesto, así que febrero llega al 29' : 'común, así que febrero se detiene en el 28'}. El 1 de enero cae en ${SPEC_WEEK.es[f.firstWeekday]}, el 31 de diciembre en ${SPEC_WEEK.es[f.lastWeekday]}, con ${f.isoWeeks} semanas ISO en el año ${SPEC_STEM.es[f.stem]}-${SPEC_BRANCH.es[f.branch]}.`,
    f => `${f.year} é um ano ${f.leap ? 'bissexto, então fevereiro chega ao dia 29' : 'comum, então fevereiro para no dia 28'}. 1º de janeiro cai numa ${SPEC_WEEK.pt[f.firstWeekday]}, 31 de dezembro numa ${SPEC_WEEK.pt[f.lastWeekday]}, com ${f.isoWeeks} semanas ISO no ano ${SPEC_STEM.pt[f.stem]}-${SPEC_BRANCH.pt[f.branch]}.`,
    f => `${f.year}年は${f.leap ? 'うるう年で2月が29日まで' : '平年で2月が28日まで'}あります。1月1日は${SPEC_WEEK.ja[f.firstWeekday]}、12月31日は${SPEC_WEEK.ja[f.lastWeekday]}、ISOでは${f.isoWeeks}週、${SPEC_STEM.ja[f.stem]}${SPEC_BRANCH.ja[f.branch]}の年です。`,
    f => `${f.year} ist ein ${f.leap ? 'Schaltjahr, der Februar reicht bis zum 29.' : 'Gemeinjahr, der Februar endet am 28.'} Der 1. Januar ist ein ${SPEC_WEEK.de[f.firstWeekday]}, der 31. Dezember ein ${SPEC_WEEK.de[f.lastWeekday]}, mit ${f.isoWeeks} ISO-Wochen im Jahr ${SPEC_STEM.de[f.stem]}-${SPEC_BRANCH.de[f.branch]}.`,
    f => `${f.year} est une année ${f.leap ? 'bissextile : février va jusqu’au 29' : 'commune : février s’arrête au 28'}. Le 1er janvier tombe un ${SPEC_WEEK.fr[f.firstWeekday]}, le 31 décembre un ${SPEC_WEEK.fr[f.lastWeekday]}, avec ${f.isoWeeks} semaines ISO dans l’année ${SPEC_STEM.fr[f.stem]}-${SPEC_BRANCH.fr[f.branch]}.`,
    f => `${f.year} ${f.leap ? 'लीप वर्ष है, इसलिए फ़रवरी 29 तक चलती है' : 'सामान्य वर्ष है, इसलिए फ़रवरी 28 पर रुकती है'}। 1 जनवरी ${SPEC_WEEK.hi[f.firstWeekday]}, 31 दिसंबर ${SPEC_WEEK.hi[f.lastWeekday]}, ISO सप्ताह ${f.isoWeeks}, वर्ष ${SPEC_STEM.hi[f.stem]}-${SPEC_BRANCH.hi[f.branch]}।`,
    f => `${f.year} 年是${f.leap ? '闰年，二月到 29 日' : '平年，二月到 28 日'}。1 月 1 日${SPEC_WEEK.zh[f.firstWeekday]}，12 月 31 日${SPEC_WEEK.zh[f.lastWeekday]}，ISO 共 ${f.isoWeeks} 周，为${SPEC_STEM.zh[f.stem]}${SPEC_BRANCH.zh[f.branch]}年。`,
    f => `${f.year} 年是${f.leap ? '閏年，二月到 29 日' : '平年，二月到 28 日'}。1 月 1 日${SPEC_WEEK.tw[f.firstWeekday]}，12 月 31 日${SPEC_WEEK.tw[f.lastWeekday]}，ISO 共 ${f.isoWeeks} 週，為${SPEC_STEM.tw[f.stem]}${SPEC_BRANCH.tw[f.branch]}年。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '2100년은 왜 윤년이 아닌가요?', a: '100으로 나뉘고 400으로는 나뉘지 않기 때문입니다. 지구가 태양을 도는 데 365.2422일이 걸려, 4년마다 하루를 더하면 조금 넘칩니다. 100년마다 한 번 빼고 400년마다 다시 넣어 그 차이를 맞춥니다.' },
      { q: '한 해가 53주인 것도 있나요?', a: '있습니다. ISO는 목요일이 든 주를 그 해의 주로 세는데, 목요일이 53번 드는 해가 있습니다. 201해 가운데 서른여섯 해가 그렇습니다.' },
      { q: '2월 29일에 태어나면 생일이 언제인가요?', a: '나라마다 다릅니다. 평년에 2월 28일로 보는 곳도, 3월 1일로 보는 곳도 있습니다. 법으로 정해 둔 나라도 있고 관습에 맡긴 나라도 있습니다.' },
      { q: '띠는 1월 1일에 바뀌나요?', a: '아닙니다. 음력설이나 입춘을 기준으로 삼기 때문에 양력 1월과 2월 초에 태어난 사람은 앞 해의 띠일 수 있습니다. 이 표의 간지는 해 전체를 한 칸으로 셉니다.' },
      { q: '왜 1900년부터인가요?', a: '1900년과 2100년이 둘 다 4로 나뉘는데 윤년이 아니어서, 규칙이 깨지는 두 해를 양 끝에 두었습니다.' },
    ],
    [
      { q: 'Why is 2100 not a leap year?', a: 'Because it divides by 100 but not by 400. The Earth takes 365.2422 days to orbit the Sun, so adding a day every four years overshoots slightly; skipping one every century and restoring it every four centuries settles the difference.' },
      { q: 'Can a year really have 53 weeks?', a: 'Yes. ISO assigns a week to the year holding its Thursday, and some years contain 53 Thursdays — thirty-six of the 201 years here.' },
      { q: 'When do people born on 29 February celebrate?', a: 'It varies by country. Some treat 28 February as the legal date in common years, others 1 March. A few countries write it into law; most leave it to custom.' },
      { q: 'Does the zodiac animal change on 1 January?', a: 'No. It turns at the lunar new year or at the start of spring, so anyone born in January or early February may still carry the previous year’s animal. The signs on these pages count whole calendar years.' },
      { q: 'Why start at 1900?', a: 'Because 1900 and 2100 both divide by 4 without being leap years — putting the two exceptions at either end of the range.' },
    ],
    [
      { q: '¿Por qué 2100 no es bisiesto?', a: 'Porque es divisible entre 100 pero no entre 400. La Tierra tarda 365,2422 días en rodear al Sol, así que añadir un día cada cuatro años se pasa un poco; saltarse uno cada siglo y devolverlo cada cuatro siglos ajusta la diferencia.' },
      { q: '¿De verdad hay años de 53 semanas?', a: 'Sí. La ISO asigna cada semana al año que contiene su jueves, y algunos años tienen 53 jueves: treinta y seis de los 201 aquí.' },
      { q: '¿Cuándo cumplen años los nacidos el 29 de febrero?', a: 'Depende del país. Unos toman el 28 de febrero en años comunes, otros el 1 de marzo. Algunos lo fijan por ley; la mayoría lo deja a la costumbre.' },
      { q: '¿El animal del zodiaco cambia el 1 de enero?', a: 'No. Cambia con el año nuevo lunar o el comienzo de la primavera, así que quien nace en enero o a principios de febrero puede llevar el animal del año anterior. Aquí los signos cuentan años completos del calendario.' },
      { q: '¿Por qué empezar en 1900?', a: 'Porque 1900 y 2100 son divisibles entre 4 sin ser bisiestos: así las dos excepciones quedan en los extremos.' },
    ],
    [
      { q: 'Por que 2100 não é bissexto?', a: 'Porque é divisível por 100, mas não por 400. A Terra leva 365,2422 dias para dar a volta no Sol, então acrescentar um dia a cada quatro anos passa um pouco; pular um a cada século e devolvê-lo a cada quatro séculos acerta a diferença.' },
      { q: 'Existe mesmo ano de 53 semanas?', a: 'Existe. A ISO dá a semana ao ano que contém sua quinta-feira, e alguns anos têm 53 quintas-feiras: trinta e seis dos 201 aqui.' },
      { q: 'Quando fazem aniversário os nascidos em 29 de fevereiro?', a: 'Varia conforme o país. Alguns adotam 28 de fevereiro nos anos comuns, outros 1º de março. Poucos fixam em lei; a maioria deixa ao costume.' },
      { q: 'O animal do zodíaco muda em 1º de janeiro?', a: 'Não. Ele muda no ano-novo lunar ou no início da primavera, então quem nasce em janeiro ou começo de fevereiro pode carregar o animal do ano anterior. Aqui os signos contam anos civis inteiros.' },
      { q: 'Por que começar em 1900?', a: 'Porque 1900 e 2100 são divisíveis por 4 sem serem bissextos — as duas exceções ficam nas pontas.' },
    ],
    [
      { q: 'なぜ2100年はうるう年ではないのですか？', a: '100で割り切れ、400では割り切れないからです。地球が太陽を回るのに365.2422日かかるので、4年ごとに1日足すと少し行き過ぎます。100年ごとに1回抜き、400年ごとに戻して差を合わせています。' },
      { q: '53週の年が本当にあるのですか？', a: 'あります。ISOは木曜日が入る週をその年の週とするので、木曜日が53回ある年が出ます。ここの201年のうち36年がそうです。' },
      { q: '2月29日生まれの誕生日はいつですか？', a: '国によって違います。平年は2月28日とするところも、3月1日とするところもあります。法律で決めた国もあれば、慣習に任せた国もあります。' },
      { q: '干支は1月1日に変わりますか？', a: '変わりません。旧正月や立春を境にするので、1月や2月初めに生まれた人は前の年の動物になることがあります。このページの干支は暦年をまるごと1つとして数えています。' },
      { q: 'なぜ1900年からですか？', a: '1900年と2100年はどちらも4で割り切れるのにうるう年ではないので、規則が破れる2年を両端に置きました。' },
    ],
    [
      { q: 'Warum ist 2100 kein Schaltjahr?', a: 'Weil es durch 100 teilbar ist, aber nicht durch 400. Die Erde braucht 365,2422 Tage um die Sonne; ein Tag alle vier Jahre schießt also leicht übers Ziel. Ein Auslassen pro Jahrhundert und ein Zurückgeben alle vier Jahrhunderte gleicht das aus.' },
      { q: 'Gibt es wirklich Jahre mit 53 Wochen?', a: 'Ja. Die ISO gibt jede Woche dem Jahr, das ihren Donnerstag enthält, und manche Jahre haben 53 Donnerstage — sechsunddreißig der 201 Jahre hier.' },
      { q: 'Wann feiern am 29. Februar Geborene Geburtstag?', a: 'Das ist von Land zu Land verschieden. Mancherorts gilt in Gemeinjahren der 28. Februar, anderswo der 1. März. Einige Länder regeln es im Gesetz, die meisten überlassen es dem Brauch.' },
      { q: 'Wechselt das Tierzeichen am 1. Januar?', a: 'Nein. Es wechselt zum Mondneujahr oder zum Frühlingsbeginn, wer also im Januar oder Anfang Februar geboren ist, trägt womöglich noch das Tier des Vorjahres. Die Zeichen hier zählen ganze Kalenderjahre.' },
      { q: 'Warum ab 1900?', a: 'Weil 1900 und 2100 beide durch 4 teilbar sind und dennoch keine Schaltjahre — so liegen die zwei Ausnahmen an den Rändern.' },
    ],
    [
      { q: 'Pourquoi 2100 n’est-elle pas bissextile ?', a: 'Parce qu’elle est divisible par 100 mais pas par 400. La Terre met 365,2422 jours à faire le tour du Soleil : ajouter un jour tous les quatre ans dépasse légèrement. En sauter un par siècle et le rendre tous les quatre siècles compense l’écart.' },
      { q: 'Existe-t-il vraiment des années de 53 semaines ?', a: 'Oui. L’ISO attribue chaque semaine à l’année qui contient son jeudi, et certaines années comptent 53 jeudis — trente-six des 201 années présentées ici.' },
      { q: 'Quand fêtent leur anniversaire les nés le 29 février ?', a: 'Cela dépend des pays. Certains retiennent le 28 février les années communes, d’autres le 1er mars. Quelques-uns le fixent par la loi, la plupart s’en remettent à l’usage.' },
      { q: 'L’animal du zodiaque change-t-il le 1er janvier ?', a: 'Non. Il change au nouvel an lunaire ou au début du printemps : une personne née en janvier ou début février peut donc relever de l’animal de l’année précédente. Ici, les signes couvrent des années civiles entières.' },
      { q: 'Pourquoi commencer en 1900 ?', a: 'Parce que 1900 et 2100 sont toutes deux divisibles par 4 sans être bissextiles : les deux exceptions encadrent ainsi la période.' },
    ],
    [
      { q: '2100 लीप वर्ष क्यों नहीं है?', a: 'क्योंकि यह 100 से विभाज्य है पर 400 से नहीं। पृथ्वी सूर्य का चक्कर 365.2422 दिन में लगाती है, इसलिए हर चार वर्ष में एक दिन जोड़ने पर थोड़ा अधिक हो जाता है; हर शताब्दी में एक बार छोड़ना और हर चार शताब्दी में लौटाना उस अंतर को साध देता है।' },
      { q: 'क्या सचमुच 53 सप्ताह वाले वर्ष होते हैं?', a: 'हाँ। ISO सप्ताह को उसी वर्ष का मानता है जिसमें उसका गुरुवार हो, और कुछ वर्षों में 53 गुरुवार होते हैं — यहाँ के 201 वर्षों में छत्तीस।' },
      { q: '29 फ़रवरी को जन्मे लोग जन्मदिन कब मनाते हैं?', a: 'देश के अनुसार अलग। कहीं सामान्य वर्षों में 28 फ़रवरी, कहीं 1 मार्च। कुछ देशों में यह क़ानून में है, अधिकतर में प्रथा पर छोड़ा गया है।' },
      { q: 'क्या राशि पशु 1 जनवरी को बदलता है?', a: 'नहीं। यह चंद्र नववर्ष या वसंत के आरंभ पर बदलता है, इसलिए जनवरी या फ़रवरी की शुरुआत में जन्मे लोग पिछले वर्ष के पशु के हो सकते हैं। इन पृष्ठों पर चिह्न पूरे कैलेंडर वर्ष के लिए गिने गए हैं।' },
      { q: '1900 से ही क्यों?', a: 'क्योंकि 1900 और 2100 दोनों 4 से विभाज्य होकर भी लीप नहीं हैं — दोनों अपवाद सिरों पर आ जाते हैं।' },
    ],
    [
      { q: '2100 年为什么不是闰年？', a: '因为它能被 100 整除却不能被 400 整除。地球绕太阳一圈需 365.2422 天，每四年加一天略微多了；每百年少加一次、每四百年再补回来，正好抵消这个差。' },
      { q: '真有 53 周的年份吗？', a: '有。ISO 把一周归给包含其星期四的那一年，有些年份含 53 个星期四——这里 201 年中有三十六年如此。' },
      { q: '2 月 29 日出生的人什么时候过生日？', a: '各国不同。有的在平年按 2 月 28 日算，有的按 3 月 1 日。少数国家写进法律，多数留给习惯。' },
      { q: '生肖是 1 月 1 日换吗？', a: '不是。生肖以农历新年或立春为界，所以一月和二月初出生的人可能还属上一年的生肖。本页的干支按整个公历年份计。' },
      { q: '为什么从 1900 年开始？', a: '因为 1900 和 2100 都能被 4 整除却不是闰年，把这两个例外放在了区间两端。' },
    ],
    [
      { q: '2100 年為什麼不是閏年？', a: '因為它能被 100 整除卻不能被 400 整除。地球繞太陽一圈需 365.2422 天，每四年加一天略微多了；每百年少加一次、每四百年再補回來，正好抵消這個差。' },
      { q: '真有 53 週的年份嗎？', a: '有。ISO 把一週歸給包含其星期四的那一年，有些年份含 53 個星期四——這裡 201 年中有三十六年如此。' },
      { q: '2 月 29 日出生的人什麼時候過生日？', a: '各國不同。有的在平年按 2 月 28 日算，有的按 3 月 1 日。少數國家寫進法律，多數留給習慣。' },
      { q: '生肖是 1 月 1 日換嗎？', a: '不是。生肖以農曆新年或立春為界，所以一月和二月初出生的人可能還屬上一年的生肖。本頁的干支按整個西曆年份計。' },
      { q: '為什麼從 1900 年開始？', a: '因為 1900 和 2100 都能被 4 整除卻不是閏年，把這兩個例外放在了區間兩端。' },
    ],
  ),

  yearFaq: T<(f: YearFacts) => FaqItem[]>(
    f => [
      { q: `${f.year}년은 윤년인가요?`, a: `${f.leap ? '윤년입니다' : '윤년이 아닙니다'}. ${SPEC_RULE.ko(f)}.` },
      { q: `${f.year}년 1월 1일은 무슨 요일인가요?`, a: `${SPEC_WEEK.ko[f.firstWeekday]}입니다. 12월 31일은 ${SPEC_WEEK.ko[f.lastWeekday]}입니다.` },
      { q: `${f.year}년은 몇 주인가요?`, a: `ISO 기준 ${f.isoWeeks}주입니다. 그 해에 목요일이 ${f.isoWeeks}번 들기 때문입니다.` },
      { q: `${f.year}년은 무슨 띠인가요?`, a: `${SPEC_STEM.ko[f.stem]}${SPEC_BRANCH.ko[f.branch]}년, ${SPEC_ZODIAC.ko[f.branch]}띠입니다. 다만 띠는 음력설을 기준으로 바뀝니다.` },
    ],
    f => [
      { q: `Is ${f.year} a leap year?`, a: `${f.leap ? 'It is' : 'It is not'}. ${SPEC_RULE.en(f)}.` },
      { q: `What weekday is 1 January ${f.year}?`, a: `A ${SPEC_WEEK.en[f.firstWeekday]}, and 31 December falls on a ${SPEC_WEEK.en[f.lastWeekday]}.` },
      { q: `How many weeks does ${f.year} have?`, a: `${f.isoWeeks} by ISO reckoning, because the year holds ${f.isoWeeks} Thursdays.` },
      { q: `Which zodiac animal is ${f.year}?`, a: `The year of ${SPEC_STEM.en[f.stem]}-${SPEC_BRANCH.en[f.branch]}, the ${SPEC_ZODIAC.en[f.branch]}. Note that the animal turns at the lunar new year, not on 1 January.` },
    ],
    f => [
      { q: `¿${f.year} es bisiesto?`, a: `${f.leap ? 'Sí' : 'No'}. ${SPEC_RULE.es(f)}.` },
      { q: `¿En qué día cae el 1 de enero de ${f.year}?`, a: `En ${SPEC_WEEK.es[f.firstWeekday]}; el 31 de diciembre cae en ${SPEC_WEEK.es[f.lastWeekday]}.` },
      { q: `¿Cuántas semanas tiene ${f.year}?`, a: `${f.isoWeeks} según la ISO, porque el año contiene ${f.isoWeeks} jueves.` },
      { q: `¿Qué animal del zodiaco corresponde a ${f.year}?`, a: `El año ${SPEC_STEM.es[f.stem]}-${SPEC_BRANCH.es[f.branch]}, del ${SPEC_ZODIAC.es[f.branch]}. Ten en cuenta que el animal cambia con el año nuevo lunar, no el 1 de enero.` },
    ],
    f => [
      { q: `${f.year} é bissexto?`, a: `${f.leap ? 'É' : 'Não é'}. ${SPEC_RULE.pt(f)}.` },
      { q: `Em que dia cai 1º de janeiro de ${f.year}?`, a: `Numa ${SPEC_WEEK.pt[f.firstWeekday]}; 31 de dezembro cai numa ${SPEC_WEEK.pt[f.lastWeekday]}.` },
      { q: `Quantas semanas tem ${f.year}?`, a: `${f.isoWeeks} pela ISO, porque o ano contém ${f.isoWeeks} quintas-feiras.` },
      { q: `Qual animal do zodíaco é ${f.year}?`, a: `O ano ${SPEC_STEM.pt[f.stem]}-${SPEC_BRANCH.pt[f.branch]}, do ${SPEC_ZODIAC.pt[f.branch]}. Lembre que o animal muda no ano-novo lunar, não em 1º de janeiro.` },
    ],
    f => [
      { q: `${f.year}年はうるう年ですか？`, a: `${f.leap ? 'うるう年です' : 'うるう年ではありません'}。${SPEC_RULE.ja(f)}。` },
      { q: `${f.year}年1月1日は何曜日ですか？`, a: `${SPEC_WEEK.ja[f.firstWeekday]}です。12月31日は${SPEC_WEEK.ja[f.lastWeekday]}です。` },
      { q: `${f.year}年は何週ありますか？`, a: `ISOで${f.isoWeeks}週です。その年に木曜日が${f.isoWeeks}回あるからです。` },
      { q: `${f.year}年の干支は何ですか？`, a: `${SPEC_STEM.ja[f.stem]}${SPEC_BRANCH.ja[f.branch]}、${SPEC_ZODIAC.ja[f.branch]}年です。ただし干支は旧正月を境に変わります。` },
    ],
    f => [
      { q: `Ist ${f.year} ein Schaltjahr?`, a: `${f.leap ? 'Ja' : 'Nein'}. ${SPEC_RULE.de(f)}.` },
      { q: `Auf welchen Wochentag fällt der 1. Januar ${f.year}?`, a: `Auf einen ${SPEC_WEEK.de[f.firstWeekday]}; der 31. Dezember fällt auf einen ${SPEC_WEEK.de[f.lastWeekday]}.` },
      { q: `Wie viele Wochen hat ${f.year}?`, a: `${f.isoWeeks} nach ISO, denn das Jahr enthält ${f.isoWeeks} Donnerstage.` },
      { q: `Welches Tierzeichen trägt ${f.year}?`, a: `Das Jahr ${SPEC_STEM.de[f.stem]}-${SPEC_BRANCH.de[f.branch]}, das Zeichen ${SPEC_ZODIAC.de[f.branch]}. Beachte: Es wechselt zum Mondneujahr, nicht am 1. Januar.` },
    ],
    f => [
      { q: `${f.year} est-elle bissextile ?`, a: `${f.leap ? 'Oui' : 'Non'}. ${SPEC_RULE.fr(f)}.` },
      { q: `Quel jour tombe le 1er janvier ${f.year} ?`, a: `Un ${SPEC_WEEK.fr[f.firstWeekday]} ; le 31 décembre tombe un ${SPEC_WEEK.fr[f.lastWeekday]}.` },
      { q: `Combien de semaines compte ${f.year} ?`, a: `${f.isoWeeks} selon l’ISO, car l’année contient ${f.isoWeeks} jeudis.` },
      { q: `Quel animal du zodiaque pour ${f.year} ?`, a: `L’année ${SPEC_STEM.fr[f.stem]}-${SPEC_BRANCH.fr[f.branch]}, celle du ${SPEC_ZODIAC.fr[f.branch]}. À noter : l’animal change au nouvel an lunaire, pas le 1er janvier.` },
    ],
    f => [
      { q: `क्या ${f.year} लीप वर्ष है?`, a: `${f.leap ? 'हाँ' : 'नहीं'}। ${SPEC_RULE.hi(f)}।` },
      { q: `${f.year} की 1 जनवरी को कौन-सा वार है?`, a: `${SPEC_WEEK.hi[f.firstWeekday]}; 31 दिसंबर को ${SPEC_WEEK.hi[f.lastWeekday]}।` },
      { q: `${f.year} में कितने सप्ताह हैं?`, a: `ISO के अनुसार ${f.isoWeeks}, क्योंकि इस वर्ष में ${f.isoWeeks} गुरुवार हैं।` },
      { q: `${f.year} किस राशि पशु का वर्ष है?`, a: `${SPEC_STEM.hi[f.stem]}-${SPEC_BRANCH.hi[f.branch]} वर्ष, यानी ${SPEC_ZODIAC.hi[f.branch]}। ध्यान रहे कि पशु चंद्र नववर्ष पर बदलता है, 1 जनवरी को नहीं।` },
    ],
    f => [
      { q: `${f.year} 年是闰年吗？`, a: `${f.leap ? '是' : '不是'}。${SPEC_RULE.zh(f)}。` },
      { q: `${f.year} 年 1 月 1 日是星期几？`, a: `${SPEC_WEEK.zh[f.firstWeekday]}；12 月 31 日是${SPEC_WEEK.zh[f.lastWeekday]}。` },
      { q: `${f.year} 年有几周？`, a: `按 ISO 计为 ${f.isoWeeks} 周，因为这一年有 ${f.isoWeeks} 个星期四。` },
      { q: `${f.year} 年是什么生肖？`, a: `${SPEC_STEM.zh[f.stem]}${SPEC_BRANCH.zh[f.branch]}年，属${SPEC_ZODIAC.zh[f.branch]}。不过生肖以农历新年为界，并非 1 月 1 日。` },
    ],
    f => [
      { q: `${f.year} 年是閏年嗎？`, a: `${f.leap ? '是' : '不是'}。${SPEC_RULE.tw(f)}。` },
      { q: `${f.year} 年 1 月 1 日是星期幾？`, a: `${SPEC_WEEK.tw[f.firstWeekday]}；12 月 31 日是${SPEC_WEEK.tw[f.lastWeekday]}。` },
      { q: `${f.year} 年有幾週？`, a: `按 ISO 計為 ${f.isoWeeks} 週，因為這一年有 ${f.isoWeeks} 個星期四。` },
      { q: `${f.year} 年是什麼生肖？`, a: `${SPEC_STEM.tw[f.stem]}${SPEC_BRANCH.tw[f.branch]}年，屬${SPEC_ZODIAC.tw[f.branch]}。不過生肖以農曆新年為界，並非 1 月 1 日。` },
    ],
  ),
};

/** 문장 안에서도 쓰는 표들 — SPEC 밖으로 꺼내 두어야 문구가 제 언어를 쓴다 */
const SPEC_WEEK = SPEC.weekdays;
const SPEC_ZODIAC = SPEC.zodiac;
const SPEC_STEM = SPEC.stems;
const SPEC_BRANCH = SPEC.branches;
const SPEC_RULE = SPEC.ruleText;

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const YEAR_UI: L<YearUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<YearUI>;
