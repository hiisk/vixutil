import type { AnyLocale10 } from '../locales.ts';
import { HOLIDAY_UI_INTL } from './ui-l10n-intl.ts';

/**
 * 공휴일 화면의 글월 — 열 언어.
 *
 * ── 왜 제목이 함수인가 ─────────────────────────────────────
 * 「독일의 2027년 공휴일」과 「Feiertage 2027 in Deutschland」와
 * 「2027年ドイツの祝日」은 낱말 순서가 다르다. 틀을 하나로 박고 값만 끼우면
 * 어느 언어에선가 반드시 어색해진다. 그래서 언어마다 문장을 짓게 둔다.
 *
 * ── 나라 이름 ──────────────────────────────────────────────
 * countries에 언어별 나라 이름을 담는다. 제목에서 나라 이름이 격변화하는
 * 언어(독일어 «in den USA»)가 있어, 나라 이름은 주격으로 적고 제목 함수가
 * 필요하면 자기 언어의 방식으로 손본다.
 */
export interface HolidayUI {
  /** 갈래 이름 — 「공휴일」 */
  section: string;
  hubTitle: string;
  hubLede: string;
  /** 「독일의 2027년 공휴일」 */
  countryTitle: (country: string, year: number) => string;
  countryDesc: (country: string, year: number, n: number) => string;
  /** 연도 없는 나라 개관 */
  overviewTitle: (country: string) => string;
  overviewDesc: (country: string) => string;
  /** 나라 이름 — 코드 → 그 언어의 이름 */
  countries: Record<string, string>;
  thDate: string;
  thName: string;
  thWeekday: string;
  /** 대체·관측 */
  observed: string;
  movedFrom: (d: string) => string;
  substituteNote: string;
  noSubstitute: string;
  /** 남은 날 */
  today: string;
  daysLeft: (n: number) => string;
  passed: string;
  nextUp: string;
  /** 세는 말 */
  count: (n: number, year: number) => string;
  weekendCount: (n: number) => string;
  longWeekend: string;
  /** 오가는 길 */
  otherYears: string;
  otherCountries: string;
  /** 밝힘 */
  disclaimer: string;
  sourceNote: string;
}

const ko: HolidayUI = {
  section: '공휴일',
  hubTitle: '나라별 공휴일',
  hubLede: '일곱 나라의 공휴일을 해마다 계산해서 냅니다. 표를 박아 둔 것이 아니라 규칙으로 풀어, 몇 해 뒤 것도 맞습니다.',
  countryTitle: (c, y) => `${c} ${y}년 공휴일`,
  countryDesc: (c, y, n) => `${y}년 ${c}의 공휴일 ${n}일을 날짜·요일·대체 여부까지 정리했습니다.`,
  overviewTitle: c => `${c} 공휴일`,
  overviewDesc: c => `${c}의 공휴일을 연도별로 봅니다. 주말과 겹칠 때 어떻게 되는지도 함께 봅니다.`,
  countries: {
    us: '미국', gb: '영국', de: '독일', fr: '프랑스',
    es: '스페인', br: '브라질', jp: '일본',
  },
  thDate: '날짜',
  thName: '이름',
  thWeekday: '요일',
  observed: '대체',
  movedFrom: d => `원래 ${d}`,
  substituteNote: '주말과 겹치면 다른 날로 옮겨 쉽니다. 옮겨 간 날을 굵게 적었습니다.',
  noSubstitute: '이 나라는 주말과 겹쳐도 옮기지 않습니다 — 그 해에는 그냥 사라집니다.',
  today: '오늘',
  daysLeft: n => `${n}일 남음`,
  passed: '지남',
  nextUp: '다음 공휴일',
  count: (n, y) => `${y}년 공휴일 ${n}일`,
  weekendCount: n => n === 0 ? '주말과 겹치는 날 없음' : `주말과 겹치는 날 ${n}일`,
  longWeekend: '연휴',
  otherYears: '다른 해',
  otherCountries: '다른 나라',
  disclaimer: '전국 공휴일만 담았습니다. 주(州)·지방마다 따로 쉬는 날은 빠져 있습니다.',
  sourceNote: '날짜는 규칙으로 계산합니다. 부활절은 computus, 일본 춘분·추분은 태양 황경으로 풉니다.',
};

/*
  관사는 이름이 아니라 문장이 붙인다.

  countries에 «the United Kingdom»을 넣었더니 제목이 「the United Kingdom
  public holidays 2027」이 됐다. 이름은 홀로 찍히는 자리(목록·단추)에도 쓰이니
  관사 없이 두고, «…에서»를 뜻하는 자리에서만 the를 붙인다. 독일어·프랑스어가
  격과 전치사를 그렇게 다루는 것과 같은 이유다.
*/
const THE_EN = new Set(['United States', 'United Kingdom']);
const theEn = (c: string) => (THE_EN.has(c) ? `the ${c}` : c);

const en: HolidayUI = {
  section: 'Public Holidays',
  hubTitle: 'Public holidays by country',
  hubLede: 'Holiday dates for seven countries, worked out from the rules rather than copied from a table — so future years are right too.',
  countryTitle: (c, y) => `${c} public holidays ${y}`,
  countryDesc: (c, y, n) => `All ${n} public holidays in ${theEn(c)} for ${y}, with dates, weekdays and substitute days.`,
  overviewTitle: c => `Public holidays in ${theEn(c)}`,
  overviewDesc: c => `Public holidays in ${theEn(c)} year by year, including what happens when a holiday falls on a weekend.`,
  countries: {
    us: 'United States', gb: 'United Kingdom', de: 'Germany', fr: 'France',
    es: 'Spain', br: 'Brazil', jp: 'Japan',
  },
  thDate: 'Date',
  thName: 'Holiday',
  thWeekday: 'Day',
  observed: 'Observed',
  movedFrom: d => `Originally ${d}`,
  substituteNote: 'When a holiday lands on a weekend it is observed on another day. The observed date is shown in bold.',
  noSubstitute: 'This country does not move holidays that fall on a weekend — they are simply lost that year.',
  today: 'Today',
  daysLeft: n => `${n} day${n === 1 ? '' : 's'} away`,
  passed: 'Passed',
  nextUp: 'Next holiday',
  count: (n, y) => `${n} public holidays in ${y}`,
  weekendCount: n => n === 0 ? 'None fall on a weekend' : `${n} fall${n === 1 ? 's' : ''} on a weekend`,
  longWeekend: 'Long weekend',
  otherYears: 'Other years',
  otherCountries: 'Other countries',
  disclaimer: 'National holidays only. Days observed in a single state or region are not included.',
  sourceNote: 'Dates are computed from the rules — Easter by computus, the Japanese equinoxes from solar longitude.',
};

/*
  나머지 여덟은 따로 둔다. 스프레드에 빈 객체를 캐스팅해 끼우면 타입은
  통과하고 런타임에 undefined가 되므로 그렇게 하지 않는다 — 언어 하나가
  통째로 빈 것은 화면이 하얘져야 알 수 있는 종류의 구멍이다.
  아래 Record<AnyLocale10, …>가 여덟이 다 있는지 tsc로 강제한다.
*/
export const HOLIDAY_UI: Record<AnyLocale10, HolidayUI> = { ko, en, ...HOLIDAY_UI_INTL };

export const uiOf = (locale: AnyLocale10): HolidayUI => HOLIDAY_UI[locale] ?? en;

/**
 * 경로형 로케일을 Intl 태그로 — 요일·달 이름을 그 언어로 뽑는 데 쓴다.
 *
 * 'pt-br'·'zh-hans'·'zh-hant' 셋만 꼴이 다르다. 세 곳에서 각자 갈아 끼우면
 * 한 곳이 남으므로 여기 한 번만 둔다.
 */
export const intlTag = (locale: AnyLocale10): string =>
  locale === 'pt-br' ? 'pt-BR' : locale === 'zh-hans' ? 'zh-Hans' : locale === 'zh-hant' ? 'zh-Hant' : locale;
