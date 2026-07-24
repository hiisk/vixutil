/**
 * 이자·배당 소득세 — 원천징수 15.4% 기준.
 *
 * 예금·적금 계산기는 세전 이자를 보여준다. 정작 통장에 찍히는 건 세금을 뗀 뒤인데,
 * 그 15.4%를 따로 계산해 주는 도구가 없었다. "예금 이자 실수령"으로 검색하는 사람이
 * 찾는 게 이것이다.
 *
 * 이자·배당 등 금융소득은 원천징수로 소득세 14% + 지방소득세 1.4% = 15.4%가 떼인다.
 * 다만 연간 금융소득이 2,000만원을 넘으면 초과분이 다른 소득과 합산돼 종합과세되므로,
 * 그 경우 이 단순 계산과 달라진다는 점을 플래그로 알린다.
 */

export const INCOME_TAX_RATE = 0.14;
export const LOCAL_TAX_RATE = 0.014;
export const WITHHOLDING_RATE = INCOME_TAX_RATE + LOCAL_TAX_RATE; // 0.154
export const COMPREHENSIVE_THRESHOLD = 20_000_000;

export interface InterestTaxResult {
  grossInterest: number;
  incomeTax: number;
  localTax: number;
  totalTax: number;
  /** 세후 실수령 이자 */
  netInterest: number;
  /** 금융소득이 2천만원을 넘어 종합과세 대상인가 */
  overThreshold: boolean;
}

/** 세전 이자소득에서 원천징수 세금과 실수령액을 계산한다 */
export function calcInterestTax(grossInterest: number): InterestTaxResult {
  const gross = Math.max(0, grossInterest);
  const incomeTax = Math.floor(gross * INCOME_TAX_RATE);
  const localTax = Math.floor(gross * LOCAL_TAX_RATE);
  const totalTax = incomeTax + localTax;

  return {
    grossInterest: gross,
    incomeTax,
    localTax,
    totalTax,
    netInterest: gross - totalTax,
    overThreshold: gross > COMPREHENSIVE_THRESHOLD,
  };
}

export interface DepositInterestInput {
  /** 예치 원금 */
  principal: number;
  /** 연이율 (%) */
  annualRate: number;
  /** 예치 개월 수 */
  months: number;
}

/**
 * 예금(단리) 세전 이자를 먼저 구해 세금까지 계산하는 편의 함수.
 * 이자 = 원금 × 연이율 × (개월/12).
 */
export function calcDepositAfterTax(input: DepositInterestInput): InterestTaxResult & { principal: number } {
  const principal = Math.max(0, input.principal);
  const rate = Math.max(0, input.annualRate) / 100;
  const months = Math.max(0, input.months);
  const gross = principal * rate * (months / 12);

  return { principal, ...calcInterestTax(gross) };
}
