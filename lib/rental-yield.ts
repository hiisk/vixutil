/**
 * 임대수익률 — 부동산 임대 투자의 두 가지 수익률을 낸다.
 *
 * 이 사이트에는 주식 투자 수익률(ROI)은 있지만 부동산 임대수익률은 없었다.
 * 부동산 투자자가 매물을 볼 때 가장 먼저 계산하는 숫자다.
 *
 * 두 수익률을 함께 보여주는 이유:
 *   - 표면(총) 수익률: 연 월세 ÷ 매매가. 매물 광고에 흔히 적히는 값으로, 비용과
 *     보증금·대출을 무시하므로 실제보다 좋아 보인다. 매물끼리 거칠게 비교할 때만 쓴다.
 *   - 실투자 수익률: 순수입(월세−대출이자) ÷ 실제로 들어간 내 돈. 보증금과 대출로
 *     레버리지를 쓰면 실투자금이 줄어 이 수익률이 표면 수익률보다 크게 뛴다.
 *     같은 이유로 위험도 함께 커진다는 점은 페이지에서 밝힌다.
 *
 * 한쪽만 보여주면 오해를 부른다. 표면만 보면 레버리지 효과를 놓치고, 실투자만 보면
 * 대출로 부풀린 수익률을 실력으로 착각한다.
 */

export interface RentalInput {
  /** 매매가 */
  price: number;
  /** 임대 보증금 */
  deposit: number;
  /** 월세 */
  monthlyRent: number;
  /** 취득세·중개수수료 등 부대비용 */
  acquisitionCost: number;
  /** 대출금액 */
  loan: number;
  /** 대출 연이율 (%) */
  loanRate: number;
  /** 월 관리·수선 등 보유비용 */
  monthlyCost: number;
}

export interface RentalResult {
  /** 연 임대수입 = 월세 × 12 */
  annualRent: number;
  /** 연 보유비용 = 월 비용 × 12 */
  annualCost: number;
  /** 연 대출이자 */
  annualInterest: number;
  /** 연 순수입 = 임대수입 − 보유비용 − 대출이자 */
  netAnnualIncome: number;
  /** 실투자금 = 매매가 + 부대비용 − 보증금 − 대출 */
  actualInvestment: number;
  /** 표면 수익률(%) = 연 임대수입 ÷ 매매가 */
  grossYield: number;
  /** 실투자 수익률(%) = 순수입 ÷ 실투자금. 실투자금 ≤ 0이면 null */
  netYield: number | null;
  /** 실투자금이 0 이하라 수익률이 정의되지 않는가 (무한 레버리지) */
  investmentNonPositive: boolean;
  /** 원금 회수 기간(년) = 실투자금 ÷ 연 순수입. 회수 불가면 null */
  paybackYears: number | null;
}

export function calcRentalYield(input: RentalInput): RentalResult {
  // 음수 입력은 0으로 눌러 계산이 뒤틀리지 않게 한다.
  const price = Math.max(0, input.price);
  const deposit = Math.max(0, input.deposit);
  const monthlyRent = Math.max(0, input.monthlyRent);
  const acquisitionCost = Math.max(0, input.acquisitionCost);
  const loan = Math.max(0, input.loan);
  const loanRate = Math.max(0, input.loanRate);
  const monthlyCost = Math.max(0, input.monthlyCost);

  const annualRent = monthlyRent * 12;
  const annualCost = monthlyCost * 12;
  const annualInterest = loan * (loanRate / 100);
  const netAnnualIncome = annualRent - annualCost - annualInterest;

  const actualInvestment = price + acquisitionCost - deposit - loan;
  const investmentNonPositive = actualInvestment <= 0;

  const grossYield = price > 0 ? (annualRent / price) * 100 : 0;

  // 실투자금이 0 이하면 수익률·회수기간을 정의할 수 없다(0으로 나눔). null로 알린다.
  const netYield = investmentNonPositive ? null : (netAnnualIncome / actualInvestment) * 100;

  // 순수입이 0 이하면 원금을 회수하지 못한다.
  const paybackYears =
    investmentNonPositive || netAnnualIncome <= 0 ? null : actualInvestment / netAnnualIncome;

  return {
    annualRent,
    annualCost,
    annualInterest,
    netAnnualIncome,
    actualInvestment,
    grossYield,
    netYield,
    investmentNonPositive,
    paybackYears,
  };
}
