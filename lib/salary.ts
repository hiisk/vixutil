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

/*
 * ── 요율을 이름 있는 상수로 내보낸다 (2026-08-13) ────────────
 * 같은 요율이 app/(ko)/calculator/four-insurance/page.tsx에도 박혀 있었다.
 * 그 파일은 클라이언트 컴포넌트라 node가 불러올 수 없어 검사가 못 보는 자리다 —
 * 이 저장소에서 그 자리에서 취득세 100배 버그, 종부세 절벽 버그, 복비 경계 버그,
 * 증여세 기납부세액 누락, 상속세 금융재산공제 오류가 나왔다.
 *
 * 4대보험 요율은 **해마다 바뀐다.** 두 곳에 적혀 있으면 한쪽만 고쳐진다.
 * lib/yearly-values.ts가 가리키는 자리도 이 파일이므로 여기를 원본으로 삼는다.
 */

/** 국민연금 보험료율 — 근로자 부담분 (사업주도 같은 요율) */
export const PENSION_RATE = 0.045;
/** 국민연금 기준소득월액 상한(원) */
export const PENSION_CAP = 6_170_000;
/** 건강보험료율 — 근로자 부담분 (사업주도 같은 요율) */
export const HEALTH_RATE = 0.03545;
/** 장기요양보험료율 — 건강보험료에 곱한다 */
export const LONG_CARE_RATE = 0.1295;
/** 고용보험료율 — 근로자 부담분 */
export const EMPLOYMENT_RATE = 0.009;
/** 고용보험료율 — 사업주 부담분(150인 미만 사업장. 규모에 따라 올라간다) */
export const EMPLOYER_EMPLOYMENT_RATE = 0.0115;
/** 산재보험료율 — 사업주 전액 부담. 업종에 따라 크게 다르다 */
export const ACCIDENT_RATE_DEFAULT = 0.0073;
/** 지방소득세 — 소득세에 곱한다 */
export const LOCAL_TAX_RATE = 0.1;
/** 기본공제 1인당(만원) */
export const PERSONAL_DEDUCTION = 150;

export const INCOME_BRACKETS = [
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

  const pension = Math.round(Math.min(monthly, PENSION_CAP) * PENSION_RATE);
  const health = Math.round(monthly * HEALTH_RATE);
  const longCare = Math.round(health * LONG_CARE_RATE);
  const employment = Math.round(monthly * EMPLOYMENT_RATE);

  // 과세표준 (만원 단위)
  const taxableAnnual = Math.max(0, annual - mealDeduction * 12);
  const a = taxableAnnual / 10000;
  const taxable = Math.max(0, a - earningDeduction(a) - PERSONAL_DEDUCTION * dependents);
  const b = INCOME_BRACKETS.find(br => taxable <= br.limit)!;
  const annualTax = Math.max(0, taxable * b.rate - b.deduct) * 10000;

  const incomeTax = Math.round(annualTax / 12);
  const localTax = Math.round(incomeTax * LOCAL_TAX_RATE);
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
