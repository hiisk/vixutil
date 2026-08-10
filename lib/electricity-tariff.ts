/**
 * 주택용 전기요금 — 누진 구간과 합계.
 *
 * 전기요금 계산기(app/(ko)/calculator/electricity)가 들고 있던 표를 여기로
 * 옮겼다. 가전별 요금 계산기가 같은 표를 써야 하는데, 두 벌을 두면 한쪽만
 * 고쳐져 두 페이지가 다른 답을 낸다.
 *
 * ── 누진이 뜻하는 것 ────────────────────────────────────────────
 * 구간을 넘긴 만큼만 비싼 단가가 붙지, 전체가 비싸지는 것이 아니다. 다만
 * **기본요금은 최종 구간 하나로 정해진다** — 401kWh를 쓰면 기본요금이
 * 1,600원에서 7,300원으로 한 번에 뛴다. 누진이 무서운 자리가 여기다.
 *
 * 부가세 10%와 전력산업기반기금 3.7%가 그 위에 붙는다.
 */

/** 구간별 상한(kWh)과 기본요금(원)·사용량 단가(원/kWh) */
export const TIERS: { limit: number; basic: number; rate: number }[] = [
  { limit: 200, basic: 910, rate: 120.0 },
  { limit: 400, basic: 1600, rate: 214.6 },
  { limit: Infinity, basic: 7300, rate: 307.3 },
];

/** 구간이 시작하는 자리 — TIERS에서 파생시킨다(손으로 적으면 어긋난다) */
const FLOORS: number[] = TIERS.map((_, i) => (i === 0 ? 0 : TIERS[i - 1].limit));

export const VAT_RATE = 0.1;
export const FUND_RATE = 0.037;

export interface Bill {
  basicFee: number;
  usageFee: number;
  subtotal: number;
  vat: number;
  fund: number;
  total: number;
}

/** 그 사용량이 속한 구간(0부터) */
export const tierOf = (kwh: number): number => {
  const i = TIERS.findIndex(t => kwh <= t.limit);
  return i === -1 ? TIERS.length - 1 : i;
};

/** 다음 구간까지 남은 kWh. 마지막 구간이면 null */
export const toNextTier = (kwh: number): number | null => {
  const t = TIERS[tierOf(kwh)];
  return t.limit === Infinity ? null : t.limit - kwh;
};

export function calcElectricity(kwh: number): Bill {
  const basicFee = TIERS[tierOf(kwh)].basic;

  let usageFee = 0;
  for (let i = 0; i < TIERS.length; i++) {
    const inTier = Math.min(Math.max(kwh - FLOORS[i], 0), TIERS[i].limit - FLOORS[i]);
    usageFee += inTier * TIERS[i].rate;
  }

  const subtotal = basicFee + usageFee;
  const vat = subtotal * VAT_RATE;
  const fund = subtotal * FUND_RATE;
  return { basicFee, usageFee, subtotal, vat, fund, total: subtotal + vat + fund };
}

/**
 * 이미 base만큼 쓰고 있을 때 add를 더 쓰면 얼마가 더 나오는가.
 *
 * 누진 요금제에서 "가전 하나의 전기요금"은 홀로 정해지지 않는다 — 같은
 * 에어컨도 이미 400kWh를 쓰고 있으면 그 위에 얹혀 훨씬 비싸진다. 그래서
 * 단독 요금이 아니라 **늘어나는 금액**으로 답한다.
 */
export const extraCost = (base: number, add: number): number =>
  calcElectricity(base + add).total - calcElectricity(base).total;

/**
 * 요금에서 사용량을 되찾는다.
 *
 * 누진표는 사용량 → 요금 한 방향으로만 풀린다. 반대로 가려면 구간마다
 * 뒤집어야 하는데, 기본요금이 구간에 따라 뛰어서 식이 이어지지 않는다.
 * 그래서 이분법으로 좁힌다 — 요금이 사용량을 따라 단조롭게 늘어나므로
 * 반드시 한 점으로 모인다.
 *
 * 부가세와 기금까지 포함한 **최종 청구액**을 넣는다.
 */
export function kwhForBill(total: number): number {
  if (total <= calcElectricity(0).total) return 0;
  let lo = 0;
  let hi = 100;
  while (calcElectricity(hi).total < total) hi *= 2;
  for (let n = 0; n < 60; n++) {
    const mid = (lo + hi) / 2;
    if (calcElectricity(mid).total < total) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
