/**
 * 현금·할부·리스 — 같은 차를 세 방식으로 살 때 정해진 기간의 총비용.
 *
 * 할부 계산기(/calculator/car-installment)는 월 상환액을, 감가상각 계산기
 * (/calculator/car-depreciation)는 해마다 남는 값을 각각 낸다. 이 파일이 하는
 * 일은 그 둘을 **한 자리에 놓고 세 방식을 맞대는 것**이다. 새로 세는 식은
 * 없다 — 원리금균등은 lib/loan-schedule.ts, 잔존가치는 lib/depreciation.ts를
 * 그대로 쓴다.
 *
 * ── 나간 돈을 그냥 더하면 안 된다 ────────────────────────────────
 * 세 방식은 돈이 나가는 **시점**이 다르다. 현금은 첫날에 전부, 할부와 리스는
 * 매달 조금씩이다. 첫날에 낸 돈은 그 기간 동안 다른 데서 벌 수 있었던 것까지
 * 잃은 것이라, 단순 합으로는 현금이 늘 이긴다.
 *
 * 그래서 모든 돈을 **기간 말 시점의 값**으로 옮겨 더한다.
 *
 *   t개월째에 낸 돈 A의 기간 말 값 = A × (1 + 월수익률)^(n − t)
 *
 * 기회수익률을 0으로 두면 (1+0)^k = 1이라 그냥 단순 합이 된다. 곧 이 셈은
 * 단순 합을 품고 있고, 수익률을 올린 만큼만 앞당겨 낸 돈에 벌점이 붙는다.
 *
 * ── 잔존가치가 비교의 핵심이다 ───────────────────────────────────
 * 기간이 끝나면 현금·할부는 차가 내 것이라 그 값이 자산으로 남고, 리스는
 * 반납하면 아무것도 안 남는다. 이것을 안 빼면 "월 리스료가 할부금보다 싸다"는
 * 말만 남아 리스가 늘 이긴다. 그래서 총비용에서 기간 말 잔존가치를 **뺀다**.
 *
 * ── 왜 아무 숫자도 박아 두지 않는가 ──────────────────────────────
 * 금리·리스료·감가율·기회수익률은 차종과 사람마다 다르고, 프로모션과 신용도에
 * 따라 같은 차도 갈린다. lib/lease-renewal.ts의 전월세전환율과 같은 이유로
 * 전부 입력으로 받는다 — 확인 못 한 숫자가 답처럼 보이면 안 된다.
 *
 * ── 세지 않는 것 ────────────────────────────────────────────────
 * 유류비·정비비·자동차세처럼 세 방식이 똑같이 물리는 유지비는 넣지 않았다.
 * 양쪽에 같은 값을 더해도 순위가 안 바뀌므로 비교에 아무 일도 하지 않는다.
 * 그쪽은 /calculator/car-cost가 센다. 보험료는 다르다 — 리스료에 들어가는
 * 경우가 있어 방식마다 실제로 갈리므로 포함 여부를 입력으로 받는다.
 */

import { equalPayment, monthlyRate } from './loan-schedule.ts';
import { decliningValue } from './depreciation.ts';

export type PlanKey = 'cash' | 'loan' | 'lease';

export interface CarPlanInput {
  /** 차값(원) — 세 방식 모두 같은 차를 본다 */
  price: number;
  /** 비교 기간(개월) — 할부 기간이자 리스 기간이다 */
  months: number;
  /** 취등록세·등록 대행비 등 첫날에 내는 돈(원). /calculator/car-registration이 세 준다 */
  upfrontFee: number;
  /** 연 감가율(%) — 15%면 15. 기간 말 잔존가치를 이것으로 낸다 */
  annualDepreciation: number;
  /** 기회수익률(연 %) — 그 돈을 차에 묶지 않았다면 벌었을 수익률 */
  opportunityRate: number;
  /** 연 보험료(원) — 리스가 포함해 주는 경우가 있어 방식마다 갈린다 */
  annualInsurance: number;

  /** 할부 선수금(원) — 차값을 넘겨 넣으면 차값으로 깎는다 */
  loanDown: number;
  /** 할부 연 금리(%) — 제시받은 값을 그대로 넣는다 */
  loanRate: number;

  /** 리스 보증금(원) */
  leaseDeposit: number;
  /** 만기에 보증금을 돌려받는가 — 계약마다 다르다 */
  leaseDepositReturned: boolean;
  /** 리스 선수금(원) — 선납한 리스료라 돌려받지 않는다 */
  leasePrepaid: number;
  /** 월 리스료(원) */
  leaseMonthly: number;
  /** 취등록세 등 초기비용이 리스료에 포함되는가 */
  leaseIncludesFee: boolean;
  /** 보험료가 리스료에 포함되는가 */
  leaseIncludesInsurance: boolean;
  /** 만기 인수금(원). null이면 반납한다 — 그러면 잔존가치가 손에 안 남는다 */
  leaseBuyout: number | null;
}

export interface Plan {
  key: PlanKey;
  label: string;
  /** 첫날에 나가는 목돈(원) */
  upfront: number;
  /** 매달 나가는 돈(원) */
  monthly: number;
  /** 만기에 한 번 더 나가는 돈(원) — 리스 인수금 */
  endPayment: number;
  /** 지갑에서 나간 돈의 단순 합(원) */
  paidOut: number;
  /** 앞당겨 낸 탓에 못 번 돈(원) — 기회수익률이 0이면 0 */
  opportunityCost: number;
  /** 기간 말에 손에 남는 차의 값(원) — 리스를 반납하면 0 */
  residual: number;
  /** 만기에 돌려받는 돈(원) — 리스 보증금 */
  refund: number;
  /** 총비용 = paidOut + opportunityCost − residual − refund */
  total: number;
  /** 총비용 순위 — 1이 가장 싸다 */
  rank: number;
  /** 가장 싼 방식과의 차액(원) — 1위는 0 */
  gap: number;
}

/**
 * t개월째에 낸 돈이 기간 말에 갖는 값.
 *
 * monthsLeft는 그 돈이 굴러갈 수 있었던 남은 개월수다. 만기에 내는 돈은 0이라
 * 제 액수 그대로다 — 벌 시간이 없었으니 기회비용도 없다.
 */
export const atEnd = (amount: number, monthsLeft: number, m: number): number =>
  amount * (1 + m) ** Math.max(monthsLeft, 0);

/**
 * 매달 말에 같은 돈을 n번 낼 때, 그 합이 기간 말에 갖는 값.
 *
 *   S = A × ((1+m)^n − 1) ÷ m
 *
 * 첫 달에 낸 돈은 n−1개월, 마지막 달에 낸 돈은 0개월을 굴린다. 그 합을 한 줄로
 * 접은 것이 위 식이다. 수익률이 0이면 0으로 나뉘므로 그때는 그냥 A × n이다.
 */
export function streamAtEnd(monthly: number, months: number, m: number): number {
  if (months <= 0) return 0;
  if (m === 0) return monthly * months;
  return (monthly * ((1 + m) ** months - 1)) / m;
}

/**
 * 기간 말 잔존가치 — lib/depreciation.ts의 정률법을 개월 단위로 쓴다.
 *
 *   잔존가치 = 차값 × (1 − 연 감가율)^(개월수 ÷ 12)
 *
 * 감가율을 100%로 두면 기간 말에 아무 값도 안 남는다 — 잔가를 뺐을 때와
 * 안 뺐을 때가 얼마나 다른지 보려고 검사가 쓰는 자리다.
 */
export const residualValue = (price: number, annualDepreciation: number, months: number): number =>
  decliningValue(Math.max(0, price), annualDepreciation / 100, months / 12);

export interface LoanPart {
  /** 대출 원금 — 차값에서 선수금을 뺀 것(원) */
  principal: number;
  /** 월 상환액(원) */
  monthly: number;
  /** 갚는 돈의 합 — 선수금은 안 넣는다(원) */
  totalPaid: number;
  /** 이자 합계(원) */
  totalInterest: number;
}

/** 실제로 낼 수 있는 선수금 — 차값을 넘길 수는 없다 */
const loanDownOf = (input: CarPlanInput): number =>
  Math.min(Math.max(0, input.loanDown), Math.max(0, input.price));

/**
 * 할부의 원리금균등 — 식은 lib/loan-schedule.ts의 equalPayment를 그대로 쓴다.
 *
 *   A = P × r × (1+r)^n ÷ ((1+r)^n − 1)
 *
 * 금리 0%에서 0으로 나뉘는 것도 그쪽에서 이미 막았다(원금 ÷ 개월수). 같은 식을
 * 여기 또 적으면 한쪽만 고쳐지는 날이 온다 — lib/dti.ts가 같은 이유로 그쪽을 쓴다.
 */
export function loanPart(input: CarPlanInput): LoanPart {
  const principal = Math.max(0, input.price - loanDownOf(input));
  const monthly = equalPayment(principal, input.loanRate, input.months);
  const totalPaid = monthly * Math.max(0, input.months);
  return { principal, monthly, totalPaid, totalInterest: totalPaid - principal };
}

/**
 * 한 방식의 총비용.
 *
 * 첫날 목돈과 매달 나가는 돈을 기간 말로 옮겨 더하고, 기간 말에 손에 남는 것
 * (차의 값·돌려받는 보증금)을 뺀다. 남는 쪽은 이미 기간 말 시점의 돈이므로
 * 따로 옮기지 않는다.
 */
function build(
  key: PlanKey,
  label: string,
  parts: { upfront: number; monthly: number; endPayment: number; residual: number; refund: number },
  months: number,
  m: number,
): Omit<Plan, 'rank' | 'gap'> {
  const { upfront, monthly, endPayment, residual, refund } = parts;
  const n = Math.max(0, months);
  const paidOut = upfront + monthly * n + endPayment;
  const grown = atEnd(upfront, n, m) + streamAtEnd(monthly, n, m) + endPayment;
  return {
    key,
    label,
    upfront,
    monthly,
    endPayment,
    paidOut,
    opportunityCost: grown - paidOut,
    residual,
    refund,
    total: grown - residual - refund,
  };
}

export interface Comparison {
  /** 현금·할부·리스 순서 그대로 — 화면이 표를 그리는 순서다 */
  plans: Plan[];
  /** 총비용이 싼 순서 */
  ranked: Plan[];
  /** 가장 싼 방식 */
  best: Plan;
  loan: LoanPart;
  /** 기간 말 잔존가치(원) — 현금·할부에 남고, 리스는 인수할 때만 남는다 */
  residual: number;
}

/**
 * 세 방식을 맞댄다.
 *
 * 방식마다 무엇이 어디로 들어가는지가 이 계산의 전부다.
 *
 *   현금  첫날에 차값 전액 + 초기비용. 보험은 내가 든다. 차는 내 것.
 *   할부  첫날에 선수금 + 초기비용, 매달 원리금. 보험은 내가 든다. 차는 내 것.
 *   리스  첫날에 보증금 + 선수금(+ 초기비용이 리스료에 안 들었다면 그것도),
 *         매달 리스료. 만기에 인수하면 인수금을 내고 차가 내 것이 되고,
 *         반납하면 잔존가치가 0이다. 보증금은 계약이 돌려주기로 했으면 돌아온다.
 *
 * 순위가 같은 값으로 겹치면 plans의 순서(현금·할부·리스)가 앞선다 — Array.sort가
 * 안정 정렬이라 그렇다.
 */
export function comparePlans(input: CarPlanInput): Comparison {
  const m = monthlyRate(input.opportunityRate);
  const n = Math.max(0, input.months);
  const insurancePerMonth = input.annualInsurance / 12;
  const residual = residualValue(input.price, input.annualDepreciation, n);
  const loan = loanPart(input);
  const bought = input.leaseBuyout !== null;

  const drafts = [
    build('cash', '현금', {
      upfront: input.price + input.upfrontFee,
      monthly: insurancePerMonth,
      endPayment: 0,
      residual,
      refund: 0,
    }, n, m),
    build('loan', '할부', {
      upfront: loanDownOf(input) + input.upfrontFee,
      monthly: loan.monthly + insurancePerMonth,
      endPayment: 0,
      residual,
      refund: 0,
    }, n, m),
    build('lease', '리스', {
      upfront: input.leaseDeposit + input.leasePrepaid + (input.leaseIncludesFee ? 0 : input.upfrontFee),
      monthly: input.leaseMonthly + (input.leaseIncludesInsurance ? 0 : insurancePerMonth),
      endPayment: input.leaseBuyout ?? 0,
      // 반납하면 차가 내 것이 아니므로 남는 값이 없다 — 이 한 줄이 비교를 뒤집는다
      residual: bought ? residual : 0,
      refund: input.leaseDepositReturned ? input.leaseDeposit : 0,
    }, n, m),
  ];

  const order = [...drafts].sort((a, b) => a.total - b.total);
  const cheapest = order[0].total;
  const rankOf = new Map(order.map((p, i) => [p.key, i + 1]));
  const plans: Plan[] = drafts.map(d => ({
    ...d,
    rank: rankOf.get(d.key)!,
    gap: d.total - cheapest,
  }));
  const ranked = [...plans].sort((a, b) => a.total - b.total);

  return { plans, ranked, best: ranked[0], loan, residual };
}
