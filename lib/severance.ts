/**
 * 퇴직금 — 근로자퇴직급여 보장법 제8조, 근로기준법 제2조.
 *
 * ── 왜 lib에 있나 ───────────────────────────────────────────
 * 이 식은 `app/(ko)/calculator/severance/page.tsx` 안에 있었다. 페이지 안에 있으면
 * 검사가 못 보고, 값 낱장이 같은 식을 한 번 더 적게 된다 — 이 저장소는 요율이 두
 * 곳에 있어 한쪽만 고쳐진 적이 이미 있다. 그래서 계산은 여기 하나로 두고
 * 계산기 페이지와 `/calculator/severance/300-5` 낱장이 **같은 함수**를 부른다.
 *
 * ── 식 ──────────────────────────────────────────────────────
 * 1일 평균임금 = 퇴직 전 3개월 임금 총액 / 그 3개월의 실제 일수
 *   3개월 임금 총액 = 3개월 급여 합계
 *                   + 연간 상여금 × (3개월 일수 / 365)
 *                   + 연간 연차수당 × (3개월 일수 / 365)
 * 1일 통상임금 = 월 통상임금 / 30
 * 퇴직금 = max(1일 평균임금, 1일 통상임금) × 30 × (총 재직일수 / 365)
 *
 * 3개월 일수를 89~92로 **실제로 세는 것**이 핵심이다. 90으로 고정하면 퇴직월에
 * 따라 평균임금이 최대 3% 어긋난다.
 */

export interface SeveranceResult {
  severancePay: number;
  dailyAvgWage: number;
  dailyStdWage: number;
  appliedWage: number;
  totalDays: number;
  threeMonthDays: number;
  threeMonthTotal: number;
  wageBase: number;
  bonus3M: number;
  leave3M: number;
  years: number;
  months: number;
}

export interface SeveranceInput {
  startDate: Date;
  endDate: Date;
  wage1: number;
  wage2: number;
  wage3: number;
  annualBonus: number;
  annualLeavePay: number;
  monthlyStdWage: number;
}

/**
 * 퇴직일 직전 3개월의 실제 일수 — 달마다 89~92로 다르다.
 *
 * `setMonth(-3)` 하나로 끝내면 **말일에 무너진다**: 5월 31일에서 석 달을 빼면
 * 2월 31일이 되고 JS가 그것을 3월 3일로 넘겨 89일이 나온다(실제는 92일).
 * 그래서 1일로 내렸다가 달을 옮기고, 그 달의 말일로 자른다.
 */
export function threeMonthDays(endDate: Date): number {
  const day = endDate.getDate();
  const start = new Date(endDate);
  start.setDate(1);
  start.setMonth(start.getMonth() - 3);
  const lastOfMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
  start.setDate(Math.min(day, lastOfMonth));
  return Math.round((endDate.getTime() - start.getTime()) / 86400000);
}

export function calcSeverance({
  startDate, endDate,
  wage1, wage2, wage3,
  annualBonus, annualLeavePay,
  monthlyStdWage,
}: SeveranceInput): SeveranceResult {
  const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / 86400000);
  const d3m = threeMonthDays(endDate);

  const wageBase = wage1 + wage2 + wage3;
  const bonus3M = annualBonus * (d3m / 365);
  const leave3M = annualLeavePay * (d3m / 365);
  const threeMonthTotal = wageBase + bonus3M + leave3M;

  const dailyAvgWage = threeMonthTotal / d3m;
  const dailyStdWage = monthlyStdWage > 0 ? monthlyStdWage / 30 : 0;
  const appliedWage = dailyStdWage > dailyAvgWage ? dailyStdWage : dailyAvgWage;

  const severancePay = appliedWage * 30 * (totalDays / 365);

  const fullYears = Math.floor(totalDays / 365);
  const remDays = totalDays - fullYears * 365;
  const remMonths = Math.floor(remDays / 30);

  return {
    severancePay, dailyAvgWage, dailyStdWage, appliedWage,
    totalDays, threeMonthDays: d3m, threeMonthTotal,
    wageBase, bonus3M, leave3M,
    years: fullYears, months: remMonths,
  };
}
