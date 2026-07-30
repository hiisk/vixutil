/**
 * 리밸런싱 — 정해진 비중으로 되돌리는 것이 실제로 도움이 됐는가.
 *
 * "정기적으로 리밸런싱하라"는 조언은 거의 언제나 검증 없이 반복된다. 실제로는 자산의
 * 성격에 따라 도움이 되기도 하고 손해가 되기도 한다.
 *
 *   - 서로 엎치락뒤치락하는 자산들 → 리밸런싱이 비싼 것을 팔고 싼 것을 사므로 이득
 *   - 한 자산이 계속 이기는 경우   → 이기는 쪽을 계속 잘라내므로 손해
 *
 * 암호화폐에서는 후자가 흔하다. 그래서 이 모듈은 두 경로를 같이 계산하고 차이를 낸다.
 *
 * 낙폭도 방향이 하나가 아니다. 되돌리기는 오른 자산을 팔아 떨어지는 자산을 사들이므로,
 * 하락이 추세적이면 낙폭을 **키운다**(실측: 61.8% vs 방치 56.6%). 리밸런싱이 낙폭을
 * 줄이는 것은 자산들이 엎치락뒤치락할 때뿐이다. "리밸런싱은 위험을 줄인다"는 말이
 * 조건부라는 뜻이고, 두 경로의 낙폭을 나란히 내는 이유다.
 *
 * ── 정직성 장치 ────────────────────────────────────────────
 * 리밸런싱은 거래를 발생시키므로 수수료가 붙는다. 수수료를 빼고 비교하면 리밸런싱이
 * 실제보다 좋게 보인다. 그래서 회전율(turnover)을 세고 수수료를 차감한다.
 */

export interface RebalanceInput {
  /** 자산별 일별 종가 — 길이가 같아야 한다 */
  series: number[][];
  /** 목표 비중 (합이 1이 되도록 정규화한다) */
  weights: number[];
  /** 며칠마다 되돌릴 것인가. 0이면 리밸런싱 없음 */
  intervalDays: number;
  /** 편도 거래 수수료(%) */
  feePct?: number;
}

export interface RebalanceResult {
  /** 리밸런싱한 경로의 최종 배수 (1 = 원금) */
  rebalancedMultiple: number;
  /** 방치한 경로의 최종 배수 */
  buyHoldMultiple: number;
  /** 리밸런싱 − 방치 (%p) */
  edgePp: number;
  /** 리밸런싱 횟수 */
  rebalances: number;
  /** 누적 회전율(%) — 원금 대비 사고팔은 총액 */
  turnoverPct: number;
  /** 수수료로 나간 총액(원금 대비 %) */
  feeCostPct: number;
  /** 두 경로의 최대낙폭(%) */
  rebalancedMaxDdPct: number;
  buyHoldMaxDdPct: number;
  /** 방치했을 때 마지막 시점의 비중 — 얼마나 쏠렸는지 */
  finalDriftWeights: number[];
}

const maxDd = (path: number[]): number => {
  let peak = -Infinity, worst = 0;
  for (const v of path) {
    if (!(v > 0)) continue;
    if (v > peak) peak = v;
    const d = (1 - v / peak) * 100;
    if (d > worst) worst = d;
  }
  return worst;
};

/**
 * 두 경로를 동시에 계산한다.
 * 자산 수량을 들고 가는 방식으로 구현한다 — 비중만 다루면 리밸런싱 시점의 회전율을
 * 정확히 셀 수 없다.
 */
export function simulateRebalance(input: RebalanceInput): RebalanceResult | null {
  const { series, weights, intervalDays } = input;
  const fee = (input.feePct ?? 0) / 100;

  if (!Array.isArray(series) || series.length < 2) return null;
  if (weights.length !== series.length) return null;
  if (!isFinite(intervalDays) || intervalDays < 0) return null;
  if (fee < 0 || fee >= 1) return null;

  const n = Math.min(...series.map(s => s.length));
  if (!(n >= 3)) return null;
  for (const s of series) {
    for (let i = 0; i < n; i++) if (!(s[i] > 0)) return null;
  }

  const wSum = weights.reduce((a, b) => a + (isFinite(b) && b > 0 ? b : 0), 0);
  if (!(wSum > 0)) return null;
  const w = weights.map(x => (isFinite(x) && x > 0 ? x : 0) / wSum);

  // 초기 자본 1을 목표 비중대로 나눠 수량을 산다
  const qtyReb = w.map((wi, i) => wi / series[i][0]);
  const qtyBh = w.map((wi, i) => wi / series[i][0]);

  const valueAt = (qty: number[], t: number) => qty.reduce((s, q, i) => s + q * series[i][t], 0);

  const pathReb: number[] = [1];
  const pathBh: number[] = [1];
  let rebalances = 0;
  let turnover = 0;
  let feeCost = 0;

  for (let t = 1; t < n; t++) {
    const vReb = valueAt(qtyReb, t);
    pathReb.push(vReb);
    pathBh.push(valueAt(qtyBh, t));

    if (intervalDays > 0 && t % intervalDays === 0) {
      // 목표 비중으로 되돌린다. 거래량은 |현재금액 − 목표금액| 의 합.
      let traded = 0;
      for (let i = 0; i < qtyReb.length; i++) {
        const cur = qtyReb[i] * series[i][t];
        const target = vReb * w[i];
        traded += Math.abs(cur - target);
      }
      // 매수·매도가 짝을 이루므로 실제 거래대금은 절반이다
      const notional = traded / 2;
      const cost = notional * fee;
      turnover += (notional / vReb) * 100;
      feeCost += (cost / pathReb[0]) * 100;

      const after = vReb - cost;
      for (let i = 0; i < qtyReb.length; i++) qtyReb[i] = (after * w[i]) / series[i][t];
      rebalances++;
      // 수수료를 반영한 값으로 경로를 고친다
      pathReb[pathReb.length - 1] = after;
    }
  }

  const finalReb = pathReb[pathReb.length - 1];
  const finalBh = pathBh[pathBh.length - 1];

  // 방치했을 때 최종 비중 — 얼마나 한쪽으로 쏠렸는가
  const bhValues = qtyBh.map((q, i) => q * series[i][n - 1]);
  const bhTotal = bhValues.reduce((a, b) => a + b, 0);

  return {
    rebalancedMultiple: finalReb,
    buyHoldMultiple: finalBh,
    edgePp: (finalReb - finalBh) * 100,
    rebalances,
    turnoverPct: turnover,
    feeCostPct: feeCost,
    rebalancedMaxDdPct: maxDd(pathReb),
    buyHoldMaxDdPct: maxDd(pathBh),
    finalDriftWeights: bhTotal > 0 ? bhValues.map(v => v / bhTotal) : w,
  };
}

/** 자주 쓰는 리밸런싱 주기 */
export const INTERVALS: [string, number][] = [
  ['Never', 0],
  ['Weekly', 7],
  ['Monthly', 30],
  ['Quarterly', 90],
];
