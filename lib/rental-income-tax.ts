/**
 * 주택임대소득세 — 연 2,000만원 이하 분리과세 기준.
 *
 * 방금 만든 임대수익률 계산기가 "월세로 얼마 버나"를 보여준다면, 이건 "그 임대소득에서
 * 세금이 얼마인가"를 본다. 임대수익률을 계산한 사람이 곧바로 궁금해하는 다음 질문이다.
 *
 * 연 임대수입이 2,000만원 이하면 14% 분리과세를 선택할 수 있고, 대부분의 개인 집주인이
 * 여기 해당한다. 계산 구조:
 *   수입금액 − 필요경비 − 공제 = 과세표준
 *   과세표준 × 14% = 소득세, + 지방소득세 10%
 *
 * 등록임대사업자면 필요경비율(60%)과 공제(400만원)가 미등록(50%·200만원)보다 유리하다.
 * 공제는 종합소득금액이 2,000만원 이하일 때만 적용된다.
 *
 * 다루지 않는 것: 간주임대료(보증금에 대한 과세, 부부합산 3주택 이상 & 보증금 합계 3억
 * 초과일 때만), 종합과세를 택했을 때의 계산, 소형주택 세액감면. 연 수입이 2,000만원을
 * 넘으면 분리과세를 못 쓰므로 그 경우 플래그로 알린다.
 */

export const SEPARATE_TAX_THRESHOLD = 20_000_000;
export const SEPARATE_TAX_RATE = 0.14;
export const LOCAL_TAX_RATE = 0.1;

/** 종합소득금액 2,000만원 이하일 때만 적용되는 기본공제 한도 */
export const DEDUCTION_THRESHOLD = 20_000_000;

export interface RentalIncomeTaxInput {
  /** 연 임대수입 (월세 합계 + 간주임대료 등) */
  annualRent: number;
  /** 등록임대사업자 여부 */
  registered: boolean;
  /** 임대소득 외 종합소득금액 (공제 적용 판정용) */
  otherIncome: number;
}

export interface RentalIncomeTaxResult {
  income: number;
  /** 필요경비율 (0.6 또는 0.5) */
  expenseRate: number;
  necessaryExpense: number;
  /** 적용된 기본공제 */
  deduction: number;
  /** 공제를 받을 수 있는 조건이었는가 */
  deductionApplied: boolean;
  taxBase: number;
  incomeTax: number;
  localTax: number;
  totalTax: number;
  /** 연 수입이 2천만원을 넘어 분리과세 대상이 아닌가 */
  overThreshold: boolean;
  /** 실효세율 (총세금 / 수입) */
  effectiveRate: number;
}

export function calcRentalIncomeTax({
  annualRent, registered, otherIncome,
}: RentalIncomeTaxInput): RentalIncomeTaxResult {
  const income = Math.max(0, annualRent);
  const other = Math.max(0, otherIncome);

  const expenseRate = registered ? 0.6 : 0.5;
  const necessaryExpense = income * expenseRate;

  // 공제는 종합소득금액(임대소득 외)이 2,000만원 이하일 때만.
  const deductionApplied = other <= DEDUCTION_THRESHOLD;
  const deduction = deductionApplied ? (registered ? 4_000_000 : 2_000_000) : 0;

  const taxBase = Math.max(0, income - necessaryExpense - deduction);
  const incomeTax = Math.floor(taxBase * SEPARATE_TAX_RATE);
  const localTax = Math.floor(incomeTax * LOCAL_TAX_RATE);
  const totalTax = incomeTax + localTax;

  return {
    income,
    expenseRate,
    necessaryExpense,
    deduction,
    deductionApplied,
    taxBase,
    incomeTax,
    localTax,
    totalTax,
    overThreshold: income > SEPARATE_TAX_THRESHOLD,
    effectiveRate: income > 0 ? (totalTax / income) * 100 : 0,
  };
}
