/**
 * 최저임금 — 시급 하나와 월 환산.
 *
 * ── 왜 이 파일이 생겼나 (2026-08-13) ───────────────────────
 * 같은 값이 두 곳에 적혀 있었다.
 *
 *   app/(ko)/calculator/minimum-wage/page.tsx   const MIN_WAGE = 10_320;
 *   lib/maternity-leave.ts                      const MIN_HOURLY_WAGE = 10_320;
 *
 * 출산전후휴가 급여의 하한이 최저임금에 연동되는데, 최저임금 셈이 클라이언트
 * 페이지 안에 있어 가져올 수가 없었다. 그래서 옮겨 적을 수밖에 없었고, 그 파일에도
 * "두 곳을 함께 고쳐야 한다"는 주석이 달려 있었다. 최저임금은 **해마다 바뀌는**
 * 값이라 그 주석은 언젠가 잊힌다 — 한쪽만 고쳐지면 하한액이 조용히 작년 값으로
 * 남는다.
 *
 * 그래서 값을 이 파일 하나로 모았다. lib/yearly-values.ts가 가리키는 자리도
 * 이 파일이다.
 *
 * ── 월 환산이 209시간인 까닭 ───────────────────────────────
 * 주 40시간을 일하면 주휴 8시간이 붙어 48시간이고, 한 주는 365 ÷ 7 ÷ 12 ≈ 4.345주
 * 이므로 48 × 4.345 ≈ 209시간이 된다. 한 달을 4주로 잡아 160시간으로 셈하면
 * 실제보다 적게 나온다 — 주휴시간이 빠지기 때문이다.
 */

/** 최저시급(원). 해마다 전년 8월에 고시된다 */
export const MIN_HOURLY_WAGE = 10_320;

/** 이 시급이 적용되는 연도 — 화면과 검사가 함께 쓴다 */
export const MIN_WAGE_YEAR = 2026;

/*
 * 주휴시간은 lib/statutory-hours.ts 한 곳에서 온다.
 *
 * 여기에 따로 적어 두었을 때 두 파일이 갈라져 있었다 — 이 파일은 주휴시간을
 * 주당 근로시간의 5분의 1로 잡아 상한이 없었고, statutory-hours는 40시간에서
 * 끊어 8시간을 상한으로 두었다. 주 40시간까지는 값이 같아 아무도 몰랐는데,
 * 최저임금 페이지에 "52시간 (연장 포함 최대)" 선택지가 있다. 52시간을 고르면
 * 주휴가 10.4시간이 되어 나왔다 — 소정근로시간은 주 40시간을 넘을 수 없고
 * 그 위는 연장근로라 주휴 산정에 들어가지 않으므로 8시간이 맞다.
 */
export { WEEKS_PER_MONTH, weeklyHolidayHours, monthlyHours } from './statutory-hours.ts';
import { monthlyHours } from './statutory-hours.ts';

/** 주휴수당이 붙는 최소 주당 근로시간 */
export const WEEKLY_HOLIDAY_MIN_HOURS = 15;

/** 시급과 주당 근로시간 → 월급 */
export function monthlyPay(hourlyWage: number, weeklyHours = 40): number {
  return Math.max(0, hourlyWage) * monthlyHours(weeklyHours);
}

/** 최저임금 월 환산액(원) — 주 40시간 기준 약 209시간 */
export const minimumMonthlyWage = (weeklyHours = 40): number =>
  monthlyPay(MIN_HOURLY_WAGE, weeklyHours);
