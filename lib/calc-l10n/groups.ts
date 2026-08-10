import type { CalcLang } from './types.ts';

/**
 * 다국어 계산기 허브의 갈래.
 *
 * 허브는 목록을 한 줄로 두고 있었다. 그때는 그게 맞았다 — 열넷이었으니
 * 갈래를 나누면 갈래마다 한두 개씩 놓였다(CalcIntlHub의 주석이 그렇게 적어
 * 두었다). 쉰이 넘으면 반대가 된다. 한 줄로 늘어놓으면 찾는 사람이 쉰 개를
 * 훑어야 하고, 검색엔진에도 이 페이지가 무엇의 모음인지가 안 보인다.
 *
 * 갈래 이름은 한국어 허브(lib/calculator-catalog.ts)의 여덟 갈래를 그대로
 * 옮기지 않는다 — 저쪽은 직장인·세금처럼 한국 제도에 붙은 갈래가 반이고,
 * 이쪽에 온 것은 나라를 안 타는 계산뿐이라 모이는 자리가 다르다.
 *
 * 슬러그를 여기 적는 대신 갈래별로 나열한다. 어디에도 안 적힌 슬러그는
 * 허브에서 사라지므로, 빠뜨리면 검사가 잡는다
 * ([[tests/calc-intl.test.ts]] "갈래에 빠진 계산기가 없다").
 */
export type CalcGroupId = 'money' | 'home' | 'health' | 'dates' | 'units' | 'dev';

export const CALC_GROUPS: { id: CalcGroupId; icon: string; slugs: string[] }[] = [
  {
    id: 'money', icon: '📈',
    slugs: [
      'loan', 'loan-method', 'refinance', 'ltv', 'deposit', 'savings',
      'compound-goal', 'dividend', 'inflation', 'retirement', 'breakeven',
      'avg-price', 'exchange', 'rental-yield',
    ],
  },
  {
    id: 'home', icon: '🏠',
    slugs: [
      'appliance-power', 'car-installment', 'car-cost', 'fuel-efficiency',
      'gas-cost', 'ev-charge', 'volumetric-weight', 'shoe-size', 'pet-age',
    ],
  },
  {
    id: 'health', icon: '🫀',
    slugs: ['calorie', 'protein', 'body-fat', 'calories-burn', 'caffeine', 'blood-pressure'],
  },
  {
    id: 'dates', icon: '📅',
    slugs: ['dday', 'time-diff', 'birthday', 'ovulation', 'pregnancy', 'work-hours', 'overtime'],
  },
  {
    id: 'units', icon: '🔢',
    slugs: ['unit-length', 'unit-weight', 'unit-temp', 'binary', 'percent', 'average', 'gpa'],
  },
  {
    id: 'dev', icon: '💻',
    slugs: [
      'dev/json', 'dev/base64', 'dev/url-encode', 'dev/timestamp', 'dev/jwt',
      'dev/hash', 'dev/regex', 'dev/uuid', 'dev/color', 'dev/cron', 'dev/sql',
      'dev/word-count', 'dev/diff',
    ],
  },
];

/** 갈래 이름 — 아홉 언어. */
export const CALC_GROUP_LABEL: Record<CalcLang, Record<CalcGroupId, string>> = {
  en: {
    money: 'Money and loans', home: 'Home and car', health: 'Body and health',
    dates: 'Dates and hours', units: 'Numbers and units', dev: 'Developer tools',
  },
  es: {
    money: 'Dinero y préstamos', home: 'Casa y coche', health: 'Cuerpo y salud',
    dates: 'Fechas y horas', units: 'Números y unidades', dev: 'Herramientas de programación',
  },
  'pt-br': {
    money: 'Dinheiro e empréstimos', home: 'Casa e carro', health: 'Corpo e saúde',
    dates: 'Datas e horas', units: 'Números e unidades', dev: 'Ferramentas de desenvolvimento',
  },
  ja: {
    money: 'お金と借入', home: '住まいと車', health: 'からだと健康',
    dates: '日付と時間', units: '数と単位', dev: '開発者向け',
  },
  de: {
    money: 'Geld und Kredite', home: 'Wohnen und Auto', health: 'Körper und Gesundheit',
    dates: 'Datum und Arbeitszeit', units: 'Zahlen und Einheiten', dev: 'Entwickler-Werkzeuge',
  },
  fr: {
    money: 'Argent et crédits', home: 'Logement et voiture', health: 'Corps et santé',
    dates: 'Dates et heures', units: 'Nombres et unités', dev: 'Outils pour développeurs',
  },
  hi: {
    money: 'पैसा और लोन', home: 'घर और गाड़ी', health: 'शरीर और सेहत',
    dates: 'तारीख़ और घंटे', units: 'संख्या और इकाइयाँ', dev: 'डेवलपर टूल',
  },
  'zh-hans': {
    money: '理财与贷款', home: '居家与用车', health: '身体与健康',
    dates: '日期与工时', units: '数字与单位', dev: '开发者工具',
  },
  'zh-hant': {
    money: '理財與貸款', home: '居家與用車', health: '身體與健康',
    dates: '日期與工時', units: '數字與單位', dev: '開發者工具',
  },
};
