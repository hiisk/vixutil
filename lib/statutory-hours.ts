/**
 * 월 소정근로시간과 통상시급.
 *
 * 급여명세서의 "209시간"이 어디서 나온 수인지가 이 파일의 전부다.
 *
 *   월 소정근로시간 = (주 소정근로시간 + 주휴시간) × 365 ÷ 7 ÷ 12
 *
 * 주 40시간이면 주휴 8시간이 붙어 48시간이고, 그것이 한 달 평균으로
 * 208.57시간이 된다. 실무에서 209로 올려 쓰는 까닭은 근로자에게 불리하지
 * 않게 올림하기 때문이다.
 *
 * 통상시급은 월 통상임금을 이 시간으로 나눈 값이고, 연장·야간·휴일수당이
 * 전부 여기서 나온다. 그래서 이 수가 틀리면 수당이 통째로 틀린다.
 */

/** 한 해의 날수와 한 주의 날수 — 평균 주수를 낼 때 쓴다 */
export const DAYS_PER_YEAR = 365;
export const DAYS_PER_WEEK = 7;
export const MONTHS_PER_YEAR = 12;

/** 법정 기준 — 주 40시간, 하루 8시간 */
export const LEGAL_WEEKLY = 40;
export const LEGAL_DAILY = 8;

/** 연장근로 가산율 — 통상임금의 50%를 더한다 */
export const OVERTIME_RATE = 0.5;
/** 야간(밤 10시~새벽 6시) 가산율 */
export const NIGHT_RATE = 0.5;

/**
 * 주휴시간 — 한 주에 15시간 이상 일하면 하루치 임금을 더 준다.
 *
 * 주 40시간이면 8시간이고, 그보다 적게 일하면 비례해서 준다.
 * 15시간 미만이면 주휴수당이 없다.
 */
export function weeklyHolidayHours(weeklyHours: number): number {
  if (weeklyHours < 15) return 0;
  return (Math.min(weeklyHours, LEGAL_WEEKLY) / LEGAL_WEEKLY) * LEGAL_DAILY;
}

/** 한 달 평균 주수 — 365 ÷ 7 ÷ 12 */
export const WEEKS_PER_MONTH = DAYS_PER_YEAR / DAYS_PER_WEEK / MONTHS_PER_YEAR;

/** 월 소정근로시간(주휴 포함). 음수는 0으로 — 부르는 곳마다 막지 않는다 */
export const monthlyHours = (weeklyHours: number): number => {
  const w = Math.max(0, weeklyHours);
  return (w + weeklyHolidayHours(w)) * WEEKS_PER_MONTH;
};

/** 실무에서 쓰는 올린 값 */
export const monthlyHoursRounded = (weeklyHours: number): number => Math.ceil(monthlyHours(weeklyHours));

export interface Wage {
  /** 월 소정근로시간(올리기 전) */
  hours: number;
  /** 실무에서 쓰는 올린 시간 */
  hoursRounded: number;
  /** 통상시급(원) */
  hourly: number;
  /** 연장근로 1시간의 값(원) — 통상시급의 1.5배 */
  overtime: number;
  /** 야간근로 1시간의 값(원) — 연장과 겹치면 2배가 된다 */
  night: number;
  /** 연장이면서 야간인 1시간(원) */
  overtimeNight: number;
}

export function commonWage(monthlyPay: number, weeklyHours: number): Wage {
  const hoursRounded = monthlyHoursRounded(weeklyHours);
  const hourly = hoursRounded > 0 ? monthlyPay / hoursRounded : 0;
  return {
    hours: monthlyHours(weeklyHours),
    hoursRounded,
    hourly,
    overtime: hourly * (1 + OVERTIME_RATE),
    night: hourly * (1 + NIGHT_RATE),
    overtimeNight: hourly * (1 + OVERTIME_RATE + NIGHT_RATE),
  };
}
