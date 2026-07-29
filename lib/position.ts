/**
 * 포지션 사이즈 — "한 번의 거래에서 잃어도 되는 금액"에서 수량을 역산한다.
 *
 * 사이즈를 감으로 정하면 손절폭이 좁을 때 과도하게 크고 넓을 때 과도하게 작아진다.
 * 기준을 뒤집어, 먼저 잃어도 되는 금액(계좌 × 리스크%)을 정하고 손절까지의 거리로
 * 나누면 수량이 나온다. 손절이 넓어지면 수량이 자동으로 줄어 손실 금액은 그대로다.
 *
 *   수량 = (계좌 × 리스크%) / |진입가 − 손절가|
 *
 * ── 이 계산이 답하지 않는 것 ─────────────────────────────
 * 위 식은 "손절에 걸리면 얼마를 잃는가"만 고정한다. **손절에 걸릴 확률**은 전혀
 * 다루지 않는데, 실제로는 그게 절반의 문제다. 변동성이 큰 코인에서 3% 손절은
 * 방향이 맞아도 스치고, 조용한 코인에서는 같은 3%가 좀처럼 닿지 않는다.
 * 그래서 페이지에서는 lib/barriers의 경로 시뮬레이션으로 "그 손절가에 닿을 확률"을
 * 함께 보여준다. 이 모듈은 순수 산술만 담당한다.
 *
 * 레버리지는 사이즈를 정하지 않는다. 사이즈는 리스크가 정하고, 레버리지는 그 사이즈를
 * 들고 있기 위해 증거금이 얼마나 필요한지만 바꾼다. 이 둘을 섞는 것이 흔한 오해라
 * 결과에서 명시적으로 분리해 돌려준다.
 */

export type Side = 'long' | 'short';

export interface PositionInput {
  /** 계좌 총액 (USDT) */
  account: number;
  /** 한 거래에서 감수할 비율 (%) */
  riskPct: number;
  entry: number;
  stop: number;
  side: Side;
  /** 목표가 (선택) — R 배수 계산용 */
  target?: number;
  /** 사용할 배율 (선택, 기본 1) — 필요 증거금 계산에만 쓴다 */
  leverage?: number;
}

export interface PositionResult {
  /** 손절 시 잃는 금액 = 계좌 × 리스크% */
  riskAmount: number;
  /** 진입가에서 손절가까지 거리 */
  stopDistance: number;
  stopDistancePct: number;
  /** 포지션 수량 (base 단위) */
  quantity: number;
  /** 명목가 = 수량 × 진입가 */
  notional: number;
  /** 이 사이즈를 들려면 최소로 필요한 배율 (명목가 / 계좌). 1 이하면 레버리지가 필요 없다. */
  leverageNeeded: number;
  /** 지정한 배율에서 묶이는 증거금 */
  marginRequired: number;
  /** 명목가가 계좌를 넘는가 — 레버리지 없이는 못 잡는 사이즈다 */
  exceedsAccount: boolean;
  /** 목표가까지의 R 배수 (없으면 null) */
  rMultiple: number | null;
  /** 목표 도달 시 수익 금액 (없으면 null) */
  targetProfit: number | null;
}

const ok = (v: number | undefined): v is number => typeof v === 'number' && isFinite(v) && v > 0;

/**
 * 유효하지 않으면 null. 손절가가 방향과 어긋나면(롱인데 손절이 진입가 위) 계산하지 않는다 —
 * 그건 손절이 아니라 다른 무언가이고, 조용히 절대값으로 처리하면 틀린 수량을 준다.
 */
export function computePosition(input: PositionInput): PositionResult | null {
  const { account, riskPct, entry, stop, side } = input;
  const leverage = input.leverage ?? 1;

  if (!ok(account) || !ok(entry) || !ok(stop) || !ok(leverage)) return null;
  if (!isFinite(riskPct) || riskPct <= 0 || riskPct > 100) return null;
  if (leverage < 1) return null;

  // 방향과 손절 위치가 맞는지
  if (side === 'long' && stop >= entry) return null;
  if (side === 'short' && stop <= entry) return null;

  const stopDistance = Math.abs(entry - stop);
  if (!(stopDistance > 0)) return null;

  const riskAmount = account * (riskPct / 100);
  const quantity = riskAmount / stopDistance;
  const notional = quantity * entry;

  let rMultiple: number | null = null;
  let targetProfit: number | null = null;
  if (ok(input.target)) {
    const t = input.target;
    // 목표가도 방향과 맞아야 의미가 있다
    const valid = side === 'long' ? t > entry : t < entry;
    if (valid) {
      rMultiple = Math.abs(t - entry) / stopDistance;
      targetProfit = rMultiple * riskAmount;
    }
  }

  return {
    riskAmount,
    stopDistance,
    stopDistancePct: (stopDistance / entry) * 100,
    quantity,
    notional,
    leverageNeeded: notional / account,
    marginRequired: notional / leverage,
    exceedsAccount: notional > account,
    rMultiple,
    targetProfit,
  };
}

/**
 * 승률이 얼마여야 본전인가 — R 배수만으로 정해진다.
 *   기대값 0  ⇔  p·R − (1−p) = 0  ⇔  p = 1/(R+1)
 * "손익비 2:1이면 33%만 맞아도 된다"는 흔한 말의 출처이고, 반대로 손익비가 낮으면
 * 요구 승률이 얼마나 가파르게 오르는지도 이 식이 보여준다.
 */
export function breakevenWinRate(rMultiple: number): number | null {
  if (!isFinite(rMultiple) || rMultiple <= 0) return null;
  return (1 / (rMultiple + 1)) * 100;
}

/** 자주 쓰는 리스크 비율(%) — 1~2%가 통상적인 상한이다 */
export const RISK_PRESETS = [0.5, 1, 2, 3] as const;
