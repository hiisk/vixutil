/**
 * 계약갱신청구권을 쓸 때의 인상 한도.
 *
 * 주택임대차보호법은 갱신 때 올릴 수 있는 폭을 **20분의 1(5%)**로 묶어 둔다.
 * 보증금과 월차임 각각에 걸리는 상한이므로, 둘 다 5%씩 올리는 것은 되지만
 * 한쪽을 10% 올리고 다른 쪽을 동결하는 것은 안 된다.
 *
 * ── 전월세전환율은 왜 입력받는가 ────────────────────────────────
 * 올린 보증금의 일부를 월세로 돌릴 때 쓰는 비율은 **한국은행 기준금리에
 * 대통령령이 정한 이율을 더한 값**과 연 1할 중 낮은 쪽이다. 기준금리가
 * 바뀌면 따라 바뀌므로 코드에 박지 않는다 — 그 달의 값을 넣어 쓴다.
 *
 * 여기서 내는 것은 **상한**이다. 합의로 더 적게 올리거나 동결할 수 있고,
 * 임대인이 실제 거주하려는 등 법이 정한 사유가 있으면 갱신 자체를 거절할 수도
 * 있다. 이 계산은 "갱신이 된다면 얼마까지"에만 답한다.
 */

/** 법이 정한 증액 상한 — 20분의 1 */
export const CAP_RATIO = 0.05;

export interface Lease {
  /** 지금 보증금(원) */
  deposit: number;
  /** 지금 월차임(원). 전세면 0 */
  monthly: number;
}

export interface RenewalCap {
  /** 올릴 수 있는 보증금 상한(원) */
  maxDeposit: number;
  /** 올릴 수 있는 월차임 상한(원) */
  maxMonthly: number;
  /** 보증금 증액분(원) */
  depositRise: number;
  /** 월차임 증액분(원) */
  monthlyRise: number;
}

export function renewalCap({ deposit, monthly }: Lease): RenewalCap {
  const maxDeposit = deposit * (1 + CAP_RATIO);
  const maxMonthly = monthly * (1 + CAP_RATIO);
  return {
    maxDeposit,
    maxMonthly,
    depositRise: maxDeposit - deposit,
    monthlyRise: maxMonthly - monthly,
  };
}

/**
 * 보증금 얼마를 월세로 돌리면 월세가 얼마 오르는가.
 *
 *   월세 = 전환할 보증금 × 전환율 ÷ 12
 *
 * 반대로 월세를 보증금으로 돌리는 것도 같은 식을 뒤집으면 된다.
 */
export const depositToMonthly = (amount: number, annualRate: number): number =>
  (amount * annualRate) / 12;

export const monthlyToDeposit = (monthly: number, annualRate: number): number =>
  annualRate === 0 ? 0 : (monthly * 12) / annualRate;

/**
 * 법이 정한 전환율 — 기준금리에 더하는 이율과 연 1할 중 낮은 쪽.
 *
 * 두 값 모두 바뀔 수 있어 인자로 받는다. 기본값을 두지 않는 것은
 * lib/heating.ts와 같은 이유다 — 확인 못 한 숫자가 답처럼 보이면 안 된다.
 */
export const conversionRate = (baseRate: number, addedRate: number, ceiling: number): number =>
  Math.min(baseRate + addedRate, ceiling);

export interface AllMonthly {
  /** 보증금을 그대로 두고 월세만 5% 올렸을 때 */
  monthlyOnly: number;
  /** 보증금 증액분까지 모두 월세로 돌렸을 때의 월세 */
  depositAsMonthly: number;
  /** 그때 늘어나는 월 부담(원) */
  extraPerMonth: number;
}

/**
 * 올릴 수 있는 만큼을 모두 월세로 받으면 월세가 얼마가 되는가.
 *
 * 보증금은 그대로 두고 "5% 올릴 수 있는 보증금 증액분"을 월세로 환산해
 * 얹는 셈이다. 임대인이 흔히 제안하는 모양이라 따로 낸다.
 */
export function allAsMonthly(lease: Lease, annualRate: number): AllMonthly {
  const cap = renewalCap(lease);
  const fromDeposit = depositToMonthly(cap.depositRise, annualRate);
  return {
    monthlyOnly: cap.maxMonthly,
    depositAsMonthly: cap.maxMonthly + fromDeposit,
    extraPerMonth: cap.monthlyRise + fromDeposit,
  };
}
