/**
 * 연금계좌(연금저축 + IRP) 세액공제 계산.
 *
 * 2023년 개정으로 납입 한도가 상향된 이후의 기준이며, 세법이 바뀌면 아래 상수만
 * 고치면 된다. 결과는 참고용 추정치이고 실제 공제액은 국세청 연말정산 간소화
 * 자료와 확정 신고 기준을 따른다.
 */

/** 소득 기준 — 근로자는 총급여, 그 외는 종합소득금액으로 판정한다. */
export type IncomeType = 'salary' | 'comprehensive';

export const PENSION_RULES = {
  /** 연금저축 단독 납입 한도 */
  savingsLimit: 6_000_000,
  /** 연금저축 + IRP 합산 납입 한도 */
  totalLimit: 9_000_000,
  /** 높은 공제율이 적용되는 소득 상한 */
  cap: { salary: 55_000_000, comprehensive: 45_000_000 } as Record<IncomeType, number>,
  /** 소득세 15% + 지방소득세 1.5% */
  highRate: 0.165,
  /** 소득세 12% + 지방소득세 1.2% */
  lowRate: 0.132,
} as const;

export interface PensionCreditInput {
  incomeType: IncomeType;
  /** 총급여 또는 종합소득금액 (원) */
  income: number;
  /** 연금저축 연간 납입액 (원) */
  savings: number;
  /** IRP 연간 납입액 (원) */
  irp: number;
}

export interface PensionCreditResult {
  /** 공제 대상으로 인정된 연금저축 납입액 */
  eligibleSavings: number;
  /** 공제 대상으로 인정된 IRP 납입액 */
  eligibleIrp: number;
  /** 공제 대상 합계 */
  eligibleTotal: number;
  /** 한도를 넘겨 공제받지 못하는 납입액 */
  excess: number;
  /** 적용 공제율 (지방소득세 포함) */
  rate: number;
  /** 예상 세액공제액 */
  credit: number;
  /** 한도까지 더 넣을 수 있는 금액 (IRP로 채울 수 있는 여력) */
  roomLeft: number;
  /** 여력을 다 채웠을 때 추가로 받는 공제액 */
  creditIfMaxed: number;
}

const clamp = (n: number) => (Number.isFinite(n) && n > 0 ? Math.floor(n) : 0);

export function calcPensionCredit(input: PensionCreditInput): PensionCreditResult {
  const { savingsLimit, totalLimit, cap, highRate, lowRate } = PENSION_RULES;

  const income = clamp(input.income);
  const savings = clamp(input.savings);
  const irp = clamp(input.irp);

  // 연금저축은 600만 원까지만 인정되고, IRP를 더해도 합산 900만 원을 넘지 못한다.
  const eligibleSavings = Math.min(savings, savingsLimit);
  const eligibleTotal = Math.min(eligibleSavings + irp, totalLimit);
  const eligibleIrp = eligibleTotal - eligibleSavings;

  const excess = savings + irp - eligibleTotal;

  // 소득이 기준을 넘으면 공제율이 떨어진다. 소득 0(미입력)은 판정하지 않고
  // 높은 쪽 세율을 보여준다 — 입력하면 곧바로 정확해진다.
  const rate = income === 0 || income <= cap[input.incomeType] ? highRate : lowRate;

  const credit = Math.floor(eligibleTotal * rate);
  const roomLeft = totalLimit - eligibleTotal;
  const creditIfMaxed = Math.floor(totalLimit * rate);

  return {
    eligibleSavings,
    eligibleIrp,
    eligibleTotal,
    excess,
    rate,
    credit,
    roomLeft,
    creditIfMaxed,
  };
}
