/**
 * 적금 만기 금액 — 회차마다 예치 기간이 달라 예금과 셈이 다르다.
 *
 * ── 왜 이 파일이 새로 생겼나 (2026-08-12) ──────────────────
 * 이 셈은 `app/(ko)/calculator/savings/page.tsx` 본문에 인라인으로 박혀 있었다.
 * 그 자리는 **검사가 닿지 못하는 자리**다 — 클라이언트 컴포넌트라 node가 불러올
 * 수 없어서, 같은 날 취득세 계산기에서 100배 버그가 검사 3,013개를 통과한 것과
 * 정확히 같은 구조였다(세율 산식의 나눗수를 3억이 아니라 300만으로 적어 7억
 * 주택의 취득세를 32억으로 내고 있었다).
 *
 * 청년 목돈 계좌 계산기를 만들면서 "일반 적금과 얼마나 벌어지나"를 내려고 이
 * 셈이 필요해졌는데, 페이지 안에 있어 가져올 수가 없었다. 그래서 그 담당은 식을
 * 손으로 한 번 더 적어 대조했다 — 그것으로 지금은 맞는다는 것을 확인했지만,
 * 두 곳에 적힌 식은 한쪽만 고쳐질 때 조용히 어긋난다.
 *
 * ── 셈의 뼈대 ─────────────────────────────────────────────
 * 매달 같은 금액을 넣으면 첫 회차는 n개월, 마지막 회차는 1개월 예치된다.
 * 그래서 예치 개월의 합이 n + (n−1) + … + 1 = n(n+1)/2 이고,
 *
 *   이자 = 월 납입액 × n(n+1)/2 × (연이율 ÷ 12)
 *
 * 이것이 단리 적금의 식이다. 같은 금리 예금의 절반 남짓이 되는 까닭이 여기
 * 있다 — 광고 금리가 틀린 것이 아니라 돈이 계좌에 머문 기간이 짧다.
 *
 * 이자소득세는 lib/interest-tax.ts의 요율을 쓴다. 15.4%를 여기 다시 적으면
 * 세법이 바뀔 때 한쪽만 고쳐진다.
 */

import { WITHHOLDING_RATE } from './interest-tax.ts';

export interface SavingsInput {
  /** 월 납입액(원) */
  monthly: number;
  /** 연이율(%) */
  annualRate: number;
  /** 납입 개월수 */
  months: number;
}

export interface SavingsResult {
  /** 넣은 돈 합계(원) */
  principal: number;
  /** 세전 이자(원) */
  interest: number;
  /** 이자소득세(원) */
  tax: number;
  /** 만기에 받는 돈(원) */
  total: number;
}

/**
 * 예치 개월의 합 — n(n+1)/2.
 *
 * 이 값이 적금 이자의 전부다. 식을 따로 내보내는 것은 검사가 이것을 **하나씩
 * 더한 값**과 맞대어 볼 수 있게 하려는 것이다. 닫힌 식만 두면 그 식이 맞는지를
 * 확인할 상대가 없다.
 */
export const depositMonths = (months: number): number => {
  const n = Math.max(0, Math.floor(months));
  return (n * (n + 1)) / 2;
};

export function calcSavings({ monthly, annualRate, months }: SavingsInput): SavingsResult {
  const m = Math.max(0, monthly);
  const n = Math.max(0, Math.floor(months));
  const rate = Math.max(0, annualRate) / 100 / 12;

  const principal = m * n;
  const interest = m * depositMonths(n) * rate;
  const tax = interest * WITHHOLDING_RATE;

  return { principal, interest, tax, total: principal + interest - tax };
}

/**
 * 같은 결과를 내는 예금 금리 — 적금과 예금을 견주려면 이것이 필요하다.
 *
 * 적금은 돈이 평균적으로 절반쯤만 머물기 때문에, 같은 이자를 예금으로 받으려면
 * 금리가 훨씬 낮아도 된다. 그 값을 내면 "적금 4%가 예금 몇 %인가"에 답할 수 있다.
 *
 * 예금 이자 = 원금 × 연이율 × (개월 ÷ 12) 이므로 그것을 뒤집는다.
 * 개월이 0이거나 원금이 0이면 견줄 것이 없어 0을 낸다.
 */
export function equivalentDepositRate(input: SavingsInput): number {
  const r = calcSavings(input);
  const years = Math.max(0, Math.floor(input.months)) / 12;
  if (r.principal <= 0 || years <= 0) return 0;
  return (r.interest / (r.principal * years)) * 100;
}
