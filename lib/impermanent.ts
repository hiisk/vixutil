/**
 * 비영구적 손실(impermanent loss) — 유동성 공급의 진짜 비용.
 *
 * 상수곱 AMM(x·y=k)에 두 자산을 넣으면, 가격이 움직일 때 풀이 자동으로 오르는 쪽을
 * 팔고 내리는 쪽을 산다. 그래서 그냥 들고 있었을 때보다 자산 가치가 낮아진다.
 * 한쪽 가격이 r배가 됐을 때(상대 가격 기준):
 *
 *      IL(r) = 2·√r / (1 + r) − 1
 *
 * 근사가 아니라 정확한 식이다. 유도는 간단하다. 초기 가격 P에서 절반씩 넣었다면
 * 보유 가치는 (1+r)/2 배가 되고, 풀 가치는 √r 배가 된다. 비율이 위 식이다.
 *
 * ── 이름이 오해를 부른다 ────────────────────────────────
 * "비영구적"은 가격이 원래대로 돌아오면 사라진다는 뜻이지, 작다는 뜻이 아니다.
 * 출금하는 순간 확정되고, 대부분의 사람은 가격이 돌아오기 전에 나온다.
 *
 * ── 그래서 수수료와 같이 봐야 한다 ───────────────────────
 * LP의 손익은 (수수료 수익 − IL)이다. IL만 보면 "하지 마라"가 되고 수수료만 보면
 * "APR 40%!"가 된다. 이 모듈은 둘을 묶어 **손익분기 거래량**을 낸다 —
 * 내 유동성 대비 하루 몇 배가 거래돼야 IL을 메우는가.
 */

/** 한쪽 자산 가격이 r배 됐을 때의 IL(%). 음수로 돌려준다(손실이므로). */
export function impermanentLoss(priceRatio: number): number | null {
  if (!isFinite(priceRatio) || priceRatio <= 0) return null;
  return (2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1) * 100;
}

/**
 * 가중치가 다른 풀(예: Balancer 80/20)의 IL.
 *   V_pool/V_hold = ∏ r_i^w_i / (∑ w_i·r_i)
 * 두 자산에서 자산1의 비중이 w, 가격비가 r, 자산2는 기준(=1)일 때:
 *   IL = r^w / (w·r + (1−w)) − 1
 * w=0.5면 √r/((r+1)/2) = 2√r/(1+r) 로 위 식과 같아진다.
 */
export function weightedImpermanentLoss(priceRatio: number, weight: number): number | null {
  if (!isFinite(priceRatio) || priceRatio <= 0) return null;
  if (!isFinite(weight) || weight <= 0 || weight >= 1) return null;
  const pool = Math.pow(priceRatio, weight);
  const hold = weight * priceRatio + (1 - weight);
  if (!(hold > 0)) return null;
  return (pool / hold - 1) * 100;
}

export interface PositionResult {
  /** 비영구적 손실(%) — 음수 */
  ilPct: number;
  /** 그냥 들고 있었을 때의 가치 */
  holdValue: number;
  /** 풀에 넣었을 때의 가치 (수수료 제외) */
  poolValue: number;
  /** 수수료 수익 */
  feesEarned: number;
  /** 수수료까지 반영한 최종 가치 */
  netValue: number;
  /** 보유 대비 최종 손익 */
  vsHold: number;
  /** 보유 대비 최종 손익(%) */
  vsHoldPct: number;
  /** 출금 시 각 자산 수량 */
  qtyA: number;
  qtyB: number;
}

/**
 * 50:50 풀 포지션 전체 계산.
 *
 * 초기 예치금 `deposit`(기준통화)을 반반 넣고, 자산 A 가격이 `priceRatio`배가 됐으며
 * 그동안 예치금 대비 `feePct`만큼 수수료를 벌었다고 본다.
 *
 * 상수곱 풀에서 가격이 r배가 되면 보유 수량은 A가 1/√r 배, B가 √r 배가 된다.
 */
export function poolPosition(deposit: number, priceRatio: number, feePct = 0): PositionResult | null {
  if (!isFinite(deposit) || deposit <= 0) return null;
  if (!isFinite(priceRatio) || priceRatio <= 0) return null;
  if (!isFinite(feePct) || feePct < 0) return null;

  const il = impermanentLoss(priceRatio);
  if (il == null) return null;

  // 절반씩 넣었으므로 보유 가치는 (1 + r)/2 배
  const holdValue = deposit * (1 + priceRatio) / 2;
  const poolValue = deposit * Math.sqrt(priceRatio);
  const feesEarned = deposit * (feePct / 100);
  const netValue = poolValue + feesEarned;

  // 초기 수량: A는 (deposit/2)/P_A, B는 (deposit/2)/P_B — 기준통화 단위로 정규화해 표시
  const halfA = deposit / 2;
  const halfB = deposit / 2;
  return {
    ilPct: il,
    holdValue,
    poolValue,
    feesEarned,
    netValue,
    vsHold: netValue - holdValue,
    vsHoldPct: ((netValue - holdValue) / holdValue) * 100,
    qtyA: halfA / Math.sqrt(priceRatio),
    qtyB: halfB * Math.sqrt(priceRatio),
  };
}

/**
 * IL을 메우는 데 필요한 수수료 수익률(%).
 * IL은 음수이므로 부호를 뒤집는다. 정확히는 (hold − pool)/deposit 이다.
 */
export function breakevenFeePct(priceRatio: number): number | null {
  if (!isFinite(priceRatio) || priceRatio <= 0) return null;
  const hold = (1 + priceRatio) / 2;
  const pool = Math.sqrt(priceRatio);
  return ((hold - pool) / 1) * 100;
}

/**
 * 손익분기 일일 거래량 배수 — 내 유동성 대비 하루 몇 배가 거래돼야 IL을 메우는가.
 *
 * 수수료 수익 = 거래량 × 수수료율 × (내 지분). 내 지분 기준으로 정규화하면
 *   필요 거래량/유동성 = 손익분기 수수료율 / (수수료율 × 일수)
 *
 * 이 숫자가 크면 "APR이 높다"는 광고가 그 거래량을 전제하고 있다는 뜻이다.
 */
export function breakevenDailyVolume(
  priceRatio: number,
  poolFeePct: number,
  days: number,
): number | null {
  const be = breakevenFeePct(priceRatio);
  if (be == null) return null;
  if (!isFinite(poolFeePct) || poolFeePct <= 0) return null;
  if (!isFinite(days) || days <= 0) return null;
  return be / (poolFeePct * days);
}

/** 표에 쓸 가격 변동 시나리오 (배수) */
export const PRICE_SCENARIOS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 5, 10];

/** 자주 쓰는 풀 수수료율(%) */
export const POOL_FEE_TIERS = [0.01, 0.05, 0.3, 1];

/**
 * IL이 인상보다 훨씬 완만하다는 점을 보여주는 참고값.
 * 2배 올라도 −5.7%, 4배 올라도 −20%다. 문제는 크기가 아니라 **비대칭**이다 —
 * 오르든 내리든 언제나 손해라서, 방향을 맞혀도 보상받지 못한다.
 */
export const IL_LANDMARKS: [string, number][] = [
  ['1.25×', 1.25],
  ['1.5×', 1.5],
  ['2×', 2],
  ['3×', 3],
  ['5×', 5],
  ['10×', 10],
];
