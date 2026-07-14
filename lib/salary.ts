/**
 * 근로소득 실수령액 계산.
 *
 * 원래 app/calculator/salary/page.tsx 안에 있던 로직을 그대로 옮겼다. 페이지에
 * 박혀 있어 테스트도 재사용도 불가능했다 — 실수령액 역산 계산기가 같은 식을
 * 반대로 풀어야 해서 분리했다.
 *
 * 2026년 4대보험 요율
 *  - 국민연금 4.5% (기준소득월액 상한 617만원, 2025.7~2026.6)
 *  - 건강보험 3.545%
 *  - 장기요양 = 건강보험료 × 12.95%
 *  - 고용보험 0.9%
 * 근로소득세: 2023년 개정 소득세법(1,400만원 구간 신설) 기준.
 *
 * 회사의 비과세 항목과 추가 공제에 따라 실제 급여명세서와 다를 수 있는 추정치다.
 */

const BRACKETS = [
  { limit: 1400,     rate: 0.06, deduct: 0 },
  { limit: 5000,     rate: 0.15, deduct: 126 },
  { limit: 8800,     rate: 0.24, deduct: 576 },
  { limit: 15000,    rate: 0.35, deduct: 1544 },
  { limit: 30000,    rate: 0.38, deduct: 1994 },
  { limit: 50000,    rate: 0.40, deduct: 2594 },
  { limit: 100000,   rate: 0.42, deduct: 3594 },
  { limit: Infinity, rate: 0.45, deduct: 6594 },
];

/** 근로소득공제 (만원 단위) */
export function earningDeduction(a: number): number {
  if (a <= 500) return a * 0.7;
  if (a <= 1500) return 350 + (a - 500) * 0.4;
  if (a <= 4500) return 750 + (a - 1500) * 0.15;
  if (a <= 10000) return 1200 + (a - 4500) * 0.05;
  return Math.min(2000, 1475 + (a - 10000) * 0.02);
}

export interface SalaryResult {
  monthly: number;
  pension: number;
  health: number;
  longCare: number;
  employment: number;
  incomeTax: number;
  localTax: number;
  totalInsurance: number;
  totalTax: number;
  totalDeduction: number;
  netMonthly: number;
  netAnnual: number;
  /** 공제율 (%) */
  effectiveRate: number;
}

export function calcSalary(annual: number, dependents: number, mealExempt: boolean): SalaryResult {
  const mealDeduction = mealExempt ? 200_000 : 0;
  const monthly = Math.floor(annual / 12);

  const pension = Math.round(Math.min(monthly, 6_170_000) * 0.045);
  const health = Math.round(monthly * 0.03545);
  const longCare = Math.round(health * 0.1295);
  const employment = Math.round(monthly * 0.009);

  // 과세표준 (만원 단위)
  const taxableAnnual = Math.max(0, annual - mealDeduction * 12);
  const a = taxableAnnual / 10000;
  const taxable = Math.max(0, a - earningDeduction(a) - 150 - (dependents - 1) * 150);
  const b = BRACKETS.find(br => taxable <= br.limit)!;
  const annualTax = Math.max(0, taxable * b.rate - b.deduct) * 10000;

  const incomeTax = Math.round(annualTax / 12);
  const localTax = Math.round(incomeTax * 0.1);
  const totalInsurance = pension + health + longCare + employment;
  const totalTax = incomeTax + localTax;
  const totalDeduction = totalInsurance + totalTax;
  const netMonthly = monthly - totalDeduction;

  return {
    monthly, pension, health, longCare, employment, incomeTax, localTax,
    totalInsurance, totalTax, totalDeduction,
    netMonthly,
    netAnnual: netMonthly * 12,
    effectiveRate: monthly > 0 ? (totalDeduction / monthly) * 100 : 0,
  };
}

/**
 * 목표 월 실수령액에 필요한 연봉을 역산한다.
 *
 * 실수령액은 연봉에 대해 단조증가하지만(구간세율이 올라가도 실수령액 자체는
 * 줄지 않는다) 역함수를 닫힌 형태로 쓸 수 없다 — 근로소득공제와 누진세가
 * 구간별로 꺾이기 때문이다. 그래서 이분 탐색으로 찾는다.
 */
export function annualForNetMonthly(
  targetNet: number,
  dependents: number,
  mealExempt: boolean,
): { annual: number; result: SalaryResult } | null {
  if (!Number.isFinite(targetNet) || targetNet <= 0) return null;

  let lo = 0;
  let hi = 1_000_000_000; // 연봉 10억 — 이 위로는 의미가 없다
  if (calcSalary(hi, dependents, mealExempt).netMonthly < targetNet) return null;

  // 1원 단위까지 좁힌다 (약 30회 반복)
  for (let i = 0; i < 60 && hi - lo > 1; i++) {
    const mid = Math.floor((lo + hi) / 2);
    if (calcSalary(mid, dependents, mealExempt).netMonthly < targetNet) lo = mid;
    else hi = mid;
  }

  // 목표를 만족하는 최소 연봉은 hi 쪽이다.
  const annual = hi;
  return { annual, result: calcSalary(annual, dependents, mealExempt) };
}
