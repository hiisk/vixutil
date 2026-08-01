import type { Lang } from './fortune-intl.ts';

/**
 * 생년월일을 받는 운세 도구 세 개(바이오리듬·오늘의 운세·행운의 숫자)가 함께
 * 쓰는 문구.
 *
 * 예전에는 세 컴포넌트가 각자 COPY에 같은 아홉 줄(생년월일·연·월·일 placeholder,
 * 오류 다섯 가지)을 갖고 있었다. 언어가 아홉이 되면 그 아홉 줄이 스물일곱 벌이
 * 되고, 곧 한 곳만 고친 채로 남는다.
 *
 * 달 이름은 탄생석 페이지도 쓴다.
 */
export type FormLang = Exclude<Lang, 'ko'>;

export interface DateForm {
  birthLabel: string;
  yearPh: string; monthPh: string; dayPh: string;
  errAll: string; errMonth: string; errDay: string; errInvalid: string; errFuture: string;
}

export const DATE_FORM: Record<FormLang, DateForm> = {
  en: {
    birthLabel: 'Date of birth', yearPh: 'e.g. 1995', monthPh: 'Month', dayPh: 'Day',
    errAll: 'Please fill in the full date of birth.',
    errMonth: 'Month must be between 1 and 12.',
    errDay: 'Day must be between 1 and 31.',
    errInvalid: 'That date does not exist.',
    errFuture: 'Your date of birth is in the future.',
  },
  es: {
    birthLabel: 'Fecha de nacimiento', yearPh: 'p. ej. 1995', monthPh: 'Mes', dayPh: 'Día',
    errAll: 'Completa la fecha de nacimiento entera.',
    errMonth: 'El mes tiene que estar entre 1 y 12.',
    errDay: 'El día tiene que estar entre 1 y 31.',
    errInvalid: 'Esa fecha no existe.',
    errFuture: 'Tu fecha de nacimiento está en el futuro.',
  },
  'pt-br': {
    birthLabel: 'Data de nascimento', yearPh: 'ex.: 1995', monthPh: 'Mês', dayPh: 'Dia',
    errAll: 'Preencha a data de nascimento inteira.',
    errMonth: 'O mês precisa estar entre 1 e 12.',
    errDay: 'O dia precisa estar entre 1 e 31.',
    errInvalid: 'Essa data não existe.',
    errFuture: 'Sua data de nascimento está no futuro.',
  },
  ja: {
    birthLabel: '生年月日', yearPh: '例: 1995', monthPh: '月', dayPh: '日',
    errAll: '生年月日をすべて入力してください。',
    errMonth: '月は1〜12で入力してください。',
    errDay: '日は1〜31で入力してください。',
    errInvalid: 'その日付は存在しません。',
    errFuture: '生年月日が未来になっています。',
  },
  de: {
    birthLabel: 'Geburtsdatum', yearPh: 'z. B. 1995', monthPh: 'Monat', dayPh: 'Tag',
    errAll: 'Bitte das vollständige Geburtsdatum eintragen.',
    errMonth: 'Der Monat muss zwischen 1 und 12 liegen.',
    errDay: 'Der Tag muss zwischen 1 und 31 liegen.',
    errInvalid: 'Dieses Datum gibt es nicht.',
    errFuture: 'Dein Geburtsdatum liegt in der Zukunft.',
  },
  fr: {
    birthLabel: 'Date de naissance', yearPh: 'ex. 1995', monthPh: 'Mois', dayPh: 'Jour',
    errAll: 'Renseignez la date de naissance complète.',
    errMonth: 'Le mois doit être compris entre 1 et 12.',
    errDay: 'Le jour doit être compris entre 1 et 31.',
    errInvalid: 'Cette date n’existe pas.',
    errFuture: 'Votre date de naissance est dans le futur.',
  },
  hi: {
    birthLabel: 'जन्म तिथि', yearPh: 'जैसे 1995', monthPh: 'महीना', dayPh: 'दिन',
    errAll: 'कृपया पूरी जन्म तिथि भरें।',
    errMonth: 'महीना 1 से 12 के बीच होना चाहिए।',
    errDay: 'दिन 1 से 31 के बीच होना चाहिए।',
    errInvalid: 'यह तारीख़ मौजूद नहीं है।',
    errFuture: 'आपकी जन्म तिथि भविष्य में है।',
  },
  'zh-hans': {
    birthLabel: '出生日期', yearPh: '例如 1995', monthPh: '月', dayPh: '日',
    errAll: '请把出生日期填完整。',
    errMonth: '月份要在 1 到 12 之间。',
    errDay: '日期要在 1 到 31 之间。',
    errInvalid: '这个日期不存在。',
    errFuture: '出生日期在未来。',
  },
  'zh-hant': {
    birthLabel: '出生日期', yearPh: '例如 1995', monthPh: '月', dayPh: '日',
    errAll: '請把出生日期填完整。',
    errMonth: '月份要在 1 到 12 之間。',
    errDay: '日期要在 1 到 31 之間。',
    errInvalid: '這個日期不存在。',
    errFuture: '出生日期在未來。',
  },
};

/** 달 이름 열두 개 — 탄생석 페이지와 날짜 표기가 쓴다 */
export const MONTHS: Record<FormLang, readonly string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  'pt-br': ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
  'zh-hans': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  'zh-hant': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
};

/**
 * 달력에 쓸 짧은 달 이름.
 *
 * 영어는 세 글자로 자르면 되지만(January → Jan) 한자권은 자르면 "一"만 남아
 * 뜻이 사라지고, 힌디는 자소가 잘린다. 그래서 자르지 않고 따로 둔다.
 */
export const MONTHS_SHORT: Record<FormLang, readonly string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  'pt-br': ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  fr: ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
  hi: ['जन', 'फ़र', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्तू', 'नव', 'दिस'],
  'zh-hans': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  'zh-hant': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
};
