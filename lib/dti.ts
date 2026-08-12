/**
 * DTI(총부채상환비율) — 소득으로 갚을 수 있는 만큼만 빌리는지 보는 비율.
 *
 *   DTI = (주택담보대출 연 원리금 + 기타 대출 연 이자) ÷ 연소득 × 100
 *
 * ── DSR과 어디가 다른가 ─────────────────────────────────────────
 * 식의 모양은 DSR과 똑같고, **기타 대출을 어떻게 세느냐**만 다르다.
 *
 *   DTI  기타 대출은 **이자만** 센다.
 *   DSR  기타 대출도 **원금까지** 센다.
 *
 * 신용대출 5,000만원(연 6%)이 있다고 하면, DTI에 얹히는 것은 연 이자 300만원
 * 뿐이다. DSR은 그 원금을 몇 년에 나눠 갚는지까지 넣으므로 5년 분할이면 연
 * 1,100만원 넘게 얹힌다. 같은 사람도 DSR이 DTI보다 높게 나오는 이유이고,
 * DSR이 더 빡빡한 규제인 이유다.
 *
 * 기타 대출을 원리금으로 세려면 그 대출의 상환 기간이 있어야 한다. 여기서는
 * 받지 않는다 — 그 셈은 DSR 계산기(/calculator/dsr)가 이미 한다. 이 파일은
 * DTI 쪽, 곧 **이자만 세는 쪽**만 맡는다.
 *
 * ── 거치기간을 왜 다루는가 ──────────────────────────────────────
 * 거치기간(이자만 내는 기간)을 끼우면 상환액이 두 국면으로 갈린다. 거치 중에는
 * 이자만 내니 가볍고, 거치가 끝나면 남은 개월에 원금을 몰아 갚아야 하니 더
 * 무거워진다. **비율은 무거운 쪽으로 봐야 안전하므로** 이 파일의 DTI는 거치가
 * 끝난 뒤의 상환액을 쓴다. 거치 중 금액도 함께 내어 그 차이를 보게 한다.
 *
 * ── 숫자를 박지 않는 이유 ───────────────────────────────────────
 * DTI 규제 비율(40%·50%·60% 등)은 지역·주택 수·정책에 따라 계속 바뀌어 왔다.
 * lib/lease-renewal.ts의 전월세전환율과 같은 이유로 기본값을 두지 않고 인자로
 * 받는다 — 확인 못 한 숫자가 답처럼 보이면 안 된다.
 */

import { equalPayment, monthlyRate } from './loan-schedule.ts';

export interface Mortgage {
  /** 원금(원) */
  principal: number;
  /** 연이율(%) — 4.5%면 4.5 */
  annualRate: number;
  /** 전체 기간(개월). 거치기간을 포함한 값이다 */
  months: number;
  /** 거치기간(개월) — 이 동안은 이자만 낸다. 없으면 0 */
  graceMonths?: number;
}

export interface OtherDebt {
  /** 남은 잔액(원) */
  balance: number;
  /** 연이율(%) */
  annualRate: number;
}

export interface MortgageBurden {
  /** 거치기간 중 월 상환액 — 이자뿐(원) */
  monthlyDuringGrace: number;
  /** 거치가 끝난 뒤 월 원리금(원) */
  monthlyAfterGrace: number;
  /** 원금을 나눠 갚는 실제 개월수 — 전체 기간에서 거치기간을 뺀 값 */
  repayMonths: number;
  /** DTI에 넣는 연 원리금 — 무거운 쪽(거치 후) 기준(원) */
  annual: number;
}

/**
 * 주택담보대출의 월·연 상환액.
 *
 * 원리금균등의 월 상환액은 lib/loan-schedule.ts의 equalPayment를 그대로 쓴다.
 *
 *   A = P × r × (1+r)^n ÷ ((1+r)^n − 1)
 *
 * 같은 식을 여기 또 적으면 한쪽만 고쳐지는 날이 온다. 금리 0%에서 0으로
 * 나뉘는 것도 그쪽에서 이미 막아 두었다(원금 ÷ 개월수).
 *
 * 거치기간이 전체 기간을 다 먹으면 원금을 갚는 달이 없다 — 만기에 원금을 한꺼번에
 * 내는 만기일시가 되므로 거치 후 상환액도 이자로 둔다. 0으로 나누지 않으려는
 * 방어가 아니라, 그게 실제 모양이다.
 */
export function mortgageBurden({ principal, annualRate, months, graceMonths = 0 }: Mortgage): MortgageBurden {
  const grace = Math.min(Math.max(graceMonths, 0), Math.max(months, 0));
  const repayMonths = Math.max(months, 0) - grace;
  const interestOnly = principal * monthlyRate(annualRate);
  const monthlyAfterGrace = repayMonths > 0
    ? equalPayment(principal, annualRate, repayMonths)
    : interestOnly;
  return {
    monthlyDuringGrace: interestOnly,
    monthlyAfterGrace,
    repayMonths,
    annual: monthlyAfterGrace * 12,
  };
}

/**
 * 기타 대출의 연 이자 합계.
 *
 * 잔액 × 연이율이 전부다. 원금은 세지 않는다 — 그것이 DTI가 DSR과 갈리는 지점이다.
 */
export const otherInterestAnnual = (debts: OtherDebt[]): number =>
  debts.reduce((sum, d) => sum + d.balance * (d.annualRate / 100), 0);

export interface DtiInput {
  /** 연소득(원) — 세전 기준으로 넣는다 */
  annualIncome: number;
  mortgage: Mortgage;
  /** 기타 대출 목록 — 신용대출·자동차 할부 등. 이자만 센다 */
  others: OtherDebt[];
}

export interface DtiResult {
  /** DTI(%) */
  dti: number;
  /** 주담대 연 원리금(원) */
  mortgageAnnual: number;
  /** 기타 대출 연 이자(원) */
  otherAnnual: number;
  /** 둘을 합한 연 상환 부담(원) */
  totalAnnual: number;
  /** 월로 환산한 상환 부담(원) */
  totalMonthly: number;
  burden: MortgageBurden;
}

/**
 * DTI를 낸다.
 *
 * 소득이 0이면 비율이 정의되지 않는다. 이때 0을 내면 화면에서 "여유가 많다"로
 * 읽혀 거꾸로 위험하므로, 갚을 것이 있으면 Infinity를 낸다(갚을 것도 없으면 0).
 * 화면에서는 소득 0을 아예 계산 전에 막는다.
 */
export function dti({ annualIncome, mortgage, others }: DtiInput): DtiResult {
  const burden = mortgageBurden(mortgage);
  const otherAnnual = otherInterestAnnual(others);
  const totalAnnual = burden.annual + otherAnnual;
  return {
    dti: annualIncome > 0
      ? (totalAnnual / annualIncome) * 100
      : (totalAnnual > 0 ? Infinity : 0),
    mortgageAnnual: burden.annual,
    otherAnnual,
    totalAnnual,
    totalMonthly: totalAnnual / 12,
    burden,
  };
}

export interface MaxLoanInput {
  /** 연소득(원) */
  annualIncome: number;
  /** 지키려는 DTI 한도(%) — 40이면 40 */
  limitPercent: number;
  /** 새로 받을 주담대의 연이율(%) */
  annualRate: number;
  /** 새로 받을 주담대의 전체 기간(개월) */
  months: number;
  /** 거치기간(개월) */
  graceMonths?: number;
  /** 이미 있는 기타 대출 — 이 이자가 한도를 먼저 먹는다 */
  others: OtherDebt[];
}

export interface MaxLoan {
  /** 한도가 허락하는 연 상환액 — 연소득 × 한도(원) */
  allowedAnnual: number;
  /** 기타 대출 이자를 뺀, 주담대에 쓸 수 있는 연 상환액(원) */
  forMortgageAnnual: number;
  /** 그 상환액으로 빌릴 수 있는 최대 원금(원) */
  principal: number;
  /** 그때의 월 상환액(원) */
  monthly: number;
}

/**
 * 한도에서 거꾸로 최대 원금을 푼다 — 이 계산기의 값이 여기 있다.
 *
 * 정방향은 원금에서 상환액을 구하고 소득으로 나눴다. 역방향은 그 길을 되짚는다.
 *
 *   1. 한도가 허락하는 연 상환액 = 연소득 × 한도 ÷ 100
 *   2. 기타 대출 연 이자를 뺀다  → 주담대에 쓸 수 있는 몫
 *   3. 월 상환액으로 바꾸고, 원리금균등 식을 원금에 대해 푼다
 *
 *      A = P × r ÷ (1 − (1+r)^−n)  →  P = A × (1 − (1+r)^−n) ÷ r
 *
 * 금리가 0이면 이자가 없으니 P = A × n이다(1 − (1+0)^−n = 0이라 위 식은 0으로 나뉜다).
 *
 * 기타 대출 이자는 원금과 무관한 상수라서 이 역산이 정확히 맞는다 — 여기서 나온
 * 원금을 dti()에 다시 넣으면 비율이 한도에 딱 닿는다. tests/dti.test.ts가 왕복으로
 * 지킨다. 만약 기타 대출까지 원리금으로 셌다면(=DSR) 이 선형성이 깨진다.
 *
 * 이자를 갚을 몫조차 남지 않으면(또는 원금을 갚는 달이 없으면) 빌릴 수 있는 돈은 0이다.
 */
export function maxPrincipal(
  { annualIncome, limitPercent, annualRate, months, graceMonths = 0, others }: MaxLoanInput,
): MaxLoan {
  const allowedAnnual = (Math.max(annualIncome, 0) * limitPercent) / 100;
  const forMortgageAnnual = allowedAnnual - otherInterestAnnual(others);
  const grace = Math.min(Math.max(graceMonths, 0), Math.max(months, 0));
  const repayMonths = Math.max(months, 0) - grace;

  if (forMortgageAnnual <= 0 || repayMonths <= 0) {
    return { allowedAnnual, forMortgageAnnual, principal: 0, monthly: 0 };
  }

  const monthly = forMortgageAnnual / 12;
  const r = monthlyRate(annualRate);
  const principal = r === 0
    ? monthly * repayMonths
    : (monthly * (1 - (1 + r) ** -repayMonths)) / r;

  return { allowedAnnual, forMortgageAnnual, principal, monthly };
}
