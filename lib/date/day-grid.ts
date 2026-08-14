/**
 * 날짜 낱장 — `/date/03-15` 366일 × 열 언어 = 3,660장.
 *
 * ── 생일 낱장과 무엇이 다른가 ───────────────────────────────
 * `/fortune/birthday/03-15`은 **그 날 태어난 사람**을 다룬다(별자리·탄생석·나이표).
 * 여기는 **날짜 자체**를 다룬다 — 무슨 요일인가, 몇 주차인가, 무슨 날인가.
 * 검색하는 사람도 다르다("3월 15일 무슨 요일" ↔ "3월 15일생 별자리").
 * 두 장이 같은 말을 하지 않는지는 검사가 본다.
 *
 * ── 오늘에 기대지 않는다 ────────────────────────────────────
 * "D-day 며칠 남음"은 여는 날마다 달라져 ISR 캐시를 매번 다시 쓰게 만들고,
 * 하이드레이션도 깨뜨린다(이 저장소가 겪은 함정). 대신 **연도 표**를 낸다 —
 * 2020~2035년에 그 날짜가 무슨 요일인지. 표는 고정이고 사람이 찾는 답도 그것이다.
 */

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** 요일 표에 싣는 연도 — 늘리려면 여기만 고친다 */
export const YEAR_FROM = 2020;
export const YEAR_TO = 2035;

export const isLeap = (y: number): boolean => y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);

export function allDays(): { month: number; day: number }[] {
  const out: { month: number; day: number }[] = [];
  for (let m = 1; m <= 12; m++) for (let d = 1; d <= DAYS_IN_MONTH[m - 1]; d++) out.push({ month: m, day: d });
  return out;
}

export const DAY_COUNT = 366;

export const daySlug = (month: number, day: number): string =>
  `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

export function parseDaySlug(s: string): { month: number; day: number } | null {
  const m = /^(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const month = Number(m[1]), day = Number(m[2]);
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > DAYS_IN_MONTH[month - 1]) return null;
  return { month, day };
}

/**
 * 요일 — 젤러 공식이 아니라 UTC Date로 센다.
 *
 * **UTC로 고정하는 것이 핵심이다.** 지역 시간대로 만들면 서버(UTC)와 브라우저
 * (KST 등)가 다른 요일을 그려 하이드레이션이 깨진다 — 이 저장소가 날짜 계산에서
 * 이미 겪은 함정이라 lib/discharge.ts도 같은 방식이다.
 */
export const weekdayOf = (year: number, month: number, day: number): number =>
  new Date(Date.UTC(year, month - 1, day)).getUTCDay();

/** 그 해의 몇 번째 날 — 평년에 없는 날(2/29)은 null */
export function dayOfYear(month: number, day: number, leap: boolean): number | null {
  if (month === 2 && day === 29 && !leap) return null;
  let n = day;
  for (let m = 1; m < month; m++) n += m === 2 && !leap ? 28 : DAYS_IN_MONTH[m - 1];
  return n;
}

/**
 * ISO 8601 주차.
 *
 * 「그 주의 목요일이 속한 해가 그 주의 해」라는 규칙이다. 1월 1일이 늘 1주차가
 * 아니고(목요일 규칙 때문에 전해의 52·53주차가 될 수 있다), 12월 31일이 다음 해
 * 1주차가 되기도 한다. 손으로 세면 반드시 틀리는 자리다.
 */
export function isoWeek(year: number, month: number, day: number): { week: number; year: number } {
  const d = new Date(Date.UTC(year, month - 1, day));
  /* 그 주의 목요일로 옮긴다 — 일요일(0)을 7로 본다 */
  const dow = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dow);
  const isoYear = d.getUTCFullYear();
  const jan1 = new Date(Date.UTC(isoYear, 0, 1));
  const week = Math.ceil(((d.getTime() - jan1.getTime()) / 86_400_000 + 1) / 7);
  return { week, year: isoYear };
}

/** 분기 */
export const quarterOf = (month: number): number => Math.floor((month - 1) / 3) + 1;

/**
 * 날짜가 고정된 한국 기념일·공휴일.
 *
 * **음력 명절(설·추석)은 넣지 않는다** — 해마다 양력 날짜가 달라서 고정 날짜
 * 낱장에 적을 수 없다. 적으면 해가 바뀌는 순간 틀린 말이 된다.
 * 여기 있는 것은 법으로 날짜가 박힌 것들이다.
 */
export const FIXED_HOLIDAYS: Record<string, { ko: string; en: string; holiday: boolean }> = {
  '01-01': { ko: '신정', en: "New Year's Day", holiday: true },
  '03-01': { ko: '삼일절', en: 'Independence Movement Day', holiday: true },
  '04-05': { ko: '식목일', en: 'Arbor Day', holiday: false },
  '05-01': { ko: '근로자의 날', en: 'Labour Day', holiday: false },
  '05-05': { ko: '어린이날', en: "Children's Day", holiday: true },
  '05-08': { ko: '어버이날', en: 'Parents’ Day', holiday: false },
  '05-15': { ko: '스승의 날', en: 'Teachers’ Day', holiday: false },
  '06-06': { ko: '현충일', en: 'Memorial Day', holiday: true },
  '07-17': { ko: '제헌절', en: 'Constitution Day', holiday: false },
  '08-15': { ko: '광복절', en: 'Liberation Day', holiday: true },
  '10-01': { ko: '국군의 날', en: 'Armed Forces Day', holiday: false },
  '10-03': { ko: '개천절', en: 'National Foundation Day', holiday: true },
  '10-09': { ko: '한글날', en: 'Hangul Day', holiday: true },
  '12-25': { ko: '성탄절', en: 'Christmas Day', holiday: true },
};

export interface DayFacts {
  month: number;
  day: number;
  /** 연도별 요일 — [연도, 요일번호] */
  weekdays: [number, number][];
  /** 요일이 몇 번씩 나오는가 — 어느 요일이 가장 잦은지 */
  weekdayCounts: number[];
  dayOfYearCommon: number | null;
  dayOfYearLeap: number;
  isLeapDay: boolean;
  quarter: number;
  /** 기준 연도들의 ISO 주차 — 해마다 다를 수 있다 */
  weeks: [number, number][];
  holiday: { ko: string; en: string; holiday: boolean } | null;
}

export function dayFacts(month: number, day: number): DayFacts {
  const years: number[] = [];
  for (let y = YEAR_FROM; y <= YEAR_TO; y++) if (!(month === 2 && day === 29) || isLeap(y)) years.push(y);

  const weekdays = years.map(y => [y, weekdayOf(y, month, day)] as [number, number]);
  const weekdayCounts = Array.from({ length: 7 }, (_, i) => weekdays.filter(([, w]) => w === i).length);

  return {
    month, day, weekdays, weekdayCounts,
    dayOfYearCommon: dayOfYear(month, day, false),
    dayOfYearLeap: dayOfYear(month, day, true)!,
    isLeapDay: month === 2 && day === 29,
    quarter: quarterOf(month),
    weeks: years.map(y => [y, isoWeek(y, month, day).week] as [number, number]),
    holiday: FIXED_HOLIDAYS[daySlug(month, day)] ?? null,
  };
}

/** 이웃 날짜 — 앞뒤 이틀과 한 달 전후. 서로 가리켜 고아가 없다 */
export function neighborDays(month: number, day: number): { month: number; day: number }[] {
  const days = allDays();
  const at = days.findIndex(d => d.month === month && d.day === day);
  const pick = (k: number) => days[((at + k) % days.length + days.length) % days.length];
  return [pick(-2), pick(-1), pick(1), pick(2), pick(-30), pick(30)];
}
