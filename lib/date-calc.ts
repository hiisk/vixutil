/**
 * 날짜·시간 계산의 순수 함수 모음.
 *
 * 날짜 계산은 손으로 확인하기 어렵다 — 근무일 23일이 맞는지 달력을 세어 봐야
 * 알고, 윤년과 월말이 얽히면 사람도 자주 틀린다. 계산을 여기 모으고 알려진
 * 값으로 테스트에 고정한다.
 *
 * 모든 함수는 넘겨받은 Date만 쓴다. 안에서 new Date()를 부르면 같은 입력에
 * 다른 답이 나와 테스트할 수 없다.
 */

export const MS_DAY = 24 * 60 * 60 * 1000;

/** 시각을 떼고 날짜만 남긴다 — 하루 차이 계산에서 시각이 섞이면 하루씩 어긋난다 */
export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** 두 날짜 사이의 일수(뒤 - 앞) */
export function daysBetween(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / MS_DAY);
}

export function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

/**
 * 개월을 더한다. 1월 31일 + 1개월은 2월 31일이 없으므로 그 달의 마지막 날로 맞춘다 —
 * 그냥 두면 3월 3일로 넘어가 버린다.
 */
export function addMonths(d: Date, months: number): Date {
  const day = d.getDate();
  const out = new Date(d.getFullYear(), d.getMonth() + months, 1);
  const lastDay = new Date(out.getFullYear(), out.getMonth() + 1, 0).getDate();
  out.setDate(Math.min(day, lastDay));
  return out;
}

export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export function weekdayName(d: Date): string {
  return WEEKDAYS[d.getDay()];
}

export function isWeekend(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

/**
 * 주말을 뺀 근무일 수(양 끝 포함). 공휴일은 목록으로 받아 뺀다 —
 * 한국 공휴일은 음력과 대체공휴일 때문에 해마다 달라 코드로 못 정한다.
 */
export function workdaysBetween(from: Date, to: Date, holidays: string[] = []): number {
  const set = new Set(holidays);
  let cursor = startOfDay(from);
  const end = startOfDay(to);
  const step = cursor <= end ? 1 : -1;
  let count = 0;

  while (step > 0 ? cursor <= end : cursor >= end) {
    if (!isWeekend(cursor) && !set.has(toISODate(cursor))) count++;
    cursor = addDays(cursor, step);
  }
  return count;
}

/** 근무일 기준으로 n일 뒤(주말·공휴일 건너뜀) */
export function addWorkdays(from: Date, days: number, holidays: string[] = []): Date {
  const set = new Set(holidays);
  let cursor = startOfDay(from);
  let left = Math.abs(days);
  const step = days >= 0 ? 1 : -1;

  while (left > 0) {
    cursor = addDays(cursor, step);
    if (!isWeekend(cursor) && !set.has(toISODate(cursor))) left--;
  }
  return cursor;
}

export function toISODate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function formatKo(d: Date): string {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${weekdayName(d)})`;
}

/**
 * ISO 8601 주차. 그 주의 목요일이 속한 해를 기준으로 삼는 규칙이라,
 * 1월 1일이 금·토·일이면 전년도 마지막 주차가 된다.
 */
export function isoWeek(d: Date): { year: number; week: number } {
  const target = startOfDay(d);
  // 목요일로 옮긴다 (월요일 시작 기준)
  const dayNum = (target.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNum + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDayNum = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNum + 3);
  const week = 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * MS_DAY));
  return { year: target.getFullYear(), week };
}

export function quarter(d: Date): number {
  return Math.floor(d.getMonth() / 3) + 1;
}

/** 그 해의 몇 번째 날인지 */
export function dayOfYear(d: Date): number {
  return daysBetween(new Date(d.getFullYear(), 0, 1), d) + 1;
}

export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export interface LivedSpan {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  weeks: number;
}

/** 두 시각 사이를 여러 단위로 풀어 준다 */
export function span(from: Date, to: Date): LivedSpan {
  const ms = to.getTime() - from.getTime();

  /*
    "몇 개월 며칠"은 뺄셈으로 구하면 틀린다. 1월 31일에서 3월 1일까지를
    자릿수로 빼면 -30일이 되고, 앞 달(2월 28일)을 빌려도 여전히 음수다.
    대신 addMonths를 그대로 써서 "넘지 않는 최대 개월"을 찾고 나머지를 일수로
    센다 — 월말 처리가 addMonths와 어긋나지 않는다는 이점도 있다.
  */
  let m = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  if (addMonths(from, m) > to) m--;
  const anchor = addMonths(from, m);

  const years = Math.floor(m / 12);
  const months = m % 12;
  const days = daysBetween(anchor, to);

  const totalDays = Math.floor(ms / MS_DAY);
  return {
    years, months, days, totalDays,
    weeks: Math.floor(totalDays / 7),
    totalHours: Math.floor(ms / (60 * 60 * 1000)),
    totalMinutes: Math.floor(ms / (60 * 1000)),
    totalSeconds: Math.floor(ms / 1000),
  };
}

/** 밀리초를 00:00:00 형태로 */
export function formatDuration(ms: number, withMs = false): string {
  const total = Math.max(0, Math.floor(ms));
  const h = Math.floor(total / 3600000);
  const m = Math.floor((total % 3600000) / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const p = (n: number) => String(n).padStart(2, '0');
  const base = h > 0 ? `${p(h)}:${p(m)}:${p(s)}` : `${p(m)}:${p(s)}`;
  return withMs ? `${base}.${String(Math.floor((total % 1000) / 10)).padStart(2, '0')}` : base;
}
