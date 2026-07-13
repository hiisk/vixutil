/**
 * 대출 갈아타기(대환) 비교.
 *
 * 금리만 보고 갈아타면 손해 볼 수 있다. 중도상환수수료와 신규 대출 부대비용을
 * 합친 초기 비용을, 매달 아끼는 이자로 몇 달 만에 회수하는지(손익분기점)까지
 * 봐야 실제 이득인지 알 수 있다.
 *
 * 원리금균등상환 기준. 실제 금액은 금융사 산정 방식(일할계산 등)에 따라
 * 소폭 달라질 수 있다.
 */

export interface RefinanceInput {
  /** 남은 원금 (원) */
  balance: number;
  /** 현재 연이율 (%) */
  currentRate: number;
  /** 남은 기간 (개월) */
  currentMonths: number;
  /** 갈아탈 연이율 (%) */
  newRate: number;
  /** 갈아탄 뒤 상환 기간 (개월) */
  newMonths: number;
  /** 중도상환수수료 (원) */
  prepaymentFee: number;
  /** 인지세·근저당 설정비 등 신규 대출 부대비용 (원) */
  setupCost: number;
}

export interface RefinanceResult {
  currentPayment: number;
  newPayment: number;
  /** 월 납입액 변화 (음수면 줄어든다) */
  paymentDiff: number;

  currentTotalInterest: number;
  newTotalInterest: number;
  /** 이자 절감액 (양수면 이득) */
  interestSaved: number;

  /** 갈아탈 때 즉시 드는 비용 */
  upfrontCost: number;
  /** 비용까지 반영한 순이익 (양수면 갈아타는 게 이득) */
  netBenefit: number;

  /**
   * 초기 비용을 월 절감액으로 회수하는 데 걸리는 개월 수.
   * 월 납입액이 줄지 않으면(기간을 늘려 이자가 더 붙는 등) null.
   */
  breakEvenMonths: number | null;
  worthIt: boolean;
}

/** 원리금균등상환 월 납입액 */
export function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

const clamp = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

export function compareRefinance(input: RefinanceInput): RefinanceResult {
  const balance = clamp(input.balance);
  const currentMonths = Math.floor(clamp(input.currentMonths));
  const newMonths = Math.floor(clamp(input.newMonths));
  const currentRate = clamp(input.currentRate);
  const newRate = clamp(input.newRate);
  const prepaymentFee = clamp(input.prepaymentFee);
  const setupCost = clamp(input.setupCost);

  const currentPayment = monthlyPayment(balance, currentRate, currentMonths);
  const newPayment = monthlyPayment(balance, newRate, newMonths);

  const currentTotalInterest = currentPayment * currentMonths - balance;
  const newTotalInterest = newPayment * newMonths - balance;

  const interestSaved = currentTotalInterest - newTotalInterest;
  const upfrontCost = prepaymentFee + setupCost;
  const netBenefit = interestSaved - upfrontCost;

  // 월 납입액이 줄어야 초기 비용을 회수한다는 개념이 성립한다.
  const monthlySaving = currentPayment - newPayment;
  const breakEvenMonths =
    monthlySaving > 0 && upfrontCost > 0
      ? Math.ceil(upfrontCost / monthlySaving)
      : monthlySaving > 0
      ? 0
      : null;

  return {
    currentPayment: Math.round(currentPayment),
    newPayment: Math.round(newPayment),
    paymentDiff: Math.round(newPayment - currentPayment),
    currentTotalInterest: Math.round(currentTotalInterest),
    newTotalInterest: Math.round(newTotalInterest),
    interestSaved: Math.round(interestSaved),
    upfrontCost: Math.round(upfrontCost),
    netBenefit: Math.round(netBenefit),
    breakEvenMonths,
    worthIt: netBenefit > 0,
  };
}
