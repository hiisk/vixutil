/**
 * 선형(USDⓈ-M) 무기한 선물의 청산가 — 격리 마진, 단일 포지션 기준.
 *
 * 유도. 진입가 P, 수량 Q, 총 증거금 M(초기 증거금 + 추가 납입분), 유지증거금률 mmr.
 * 청산은 "잔여 자기자본 = 유지증거금"인 순간에 일어난다. 유지증거금은 **청산 시점의
 * 명목가**에 붙으므로 우변이 mmr·Q·X 이지 mmr·Q·P 가 아니다 — 이 차이를 빠뜨린
 * 계산기가 흔하고, 고배율일수록 오차가 커진다.
 *
 *   롱:   M − Q(P − X) = mmr·Q·X   →   X = (P − M/Q) / (1 − mmr)
 *   숏:   M − Q(X − P) = mmr·Q·X   →   X = (P + M/Q) / (1 + mmr)
 *
 * 증거금으로 사이즈를 잡으면(M = 명목가/L → M/Q = P/L) 다음으로 정리된다.
 *
 *   롱:   X = P(1 − 1/L) / (1 − mmr)
 *   숏:   X = P(1 + 1/L) / (1 + mmr)
 *
 * 검산: L=10, mmr=0.5%, P=100 → 롱 90.45. 순진한 "−10% = 90"보다 **위**에 있다.
 * 유지증거금이 먼저 잠식되기 때문이고, 이 방향이 맞다. L=1·mmr=0이면 0이 나온다
 * (현물 롱은 가격이 0이 되기 전엔 청산되지 않는다).
 *
 * 파산가(bankruptcy price)는 증거금이 정확히 0이 되는 가격 — mmr=0을 넣은 값이다.
 * 청산은 그보다 먼저 일어나며, 둘 사이 구간이 거래소가 청산을 처리할 여유분이다.
 *
 * 범위 밖: 수수료, 펀딩비, 계층별 유지증거금액(maintenance amount), 교차 마진의
 * 다른 포지션 손익. 전부 실제 청산가를 **진입가 쪽으로 더 당긴다**. 즉 이 값은
 * 낙관적인 하한이며, UI에서 그렇게 밝힌다.
 */

export type Side = 'long' | 'short';

export interface LiquidationInput {
  /** 진입가 (USDT) */
  entry: number;
  side: Side;
  /** 배율 (1 이상) */
  leverage: number;
  /** 유지증거금률 (%) — 거래소·코인·명목가 계층마다 다르다 */
  mmrPct: number;
  /** 격리 증거금 (USDT) */
  margin: number;
  /** 추가 납입 증거금 (USDT) */
  extraMargin?: number;
}

export interface LiquidationResult {
  /** 청산가 (USDT). 롱에서 0 이하면 청산 불가라는 뜻이다 */
  liqPrice: number;
  /** 증거금이 정확히 0이 되는 가격 */
  bankruptcyPrice: number;
  /** 진입가 대비 청산가까지 거리 (%) — 항상 양수 */
  distancePct: number;
  /** 명목가 = 증거금 × 배율 */
  notional: number;
  /** 포지션 수량 (base 단위) */
  quantity: number;
  /** 총 증거금 = 격리 증거금 + 추가 납입 */
  totalMargin: number;
  /** 청산 시점 유지증거금 요구액 (USDT) */
  maintenanceMargin: number;
  /** 청산까지 갔을 때 잃는 금액 (USDT) — 총 증거금에서 남는 유지증거금을 뺀 값 */
  lossAtLiq: number;
  /** 청산가에 닿는 데 필요한 가격 변동률 (%) — 롱은 음수, 숏은 양수 */
  moveToLiqPct: number;
  /** 청산 없이 버틸 수 있는 최대 배율이 아니라, 이 배율에서 청산이 성립하는지 */
  liquidatable: boolean;
}

/** 유지증거금률 프리셋 (%) — 바이낸스 1계층 기준의 흔한 값들 */
export const MMR_PRESETS = [0.4, 0.5, 1, 2.5] as const;

/** 유효한 양수인지 */
const pos = (v: number | undefined): v is number => typeof v === 'number' && isFinite(v) && v > 0;

/**
 * 청산가와 딸린 수치들을 계산한다. 입력이 성립하지 않으면 null.
 * mmr이 1/L 이상이면 진입 즉시 유지증거금 미달이라 포지션 자체가 열리지 않는다.
 */
export function computeLiquidation(input: LiquidationInput): LiquidationResult | null {
  const { entry, side, leverage, mmrPct, margin } = input;
  const extra = input.extraMargin ?? 0;

  if (!pos(entry) || !pos(leverage) || !pos(margin) || leverage < 1) return null;
  if (!isFinite(mmrPct) || mmrPct < 0 || mmrPct >= 100) return null;
  if (!isFinite(extra) || extra < 0) return null;

  const mmr = mmrPct / 100;
  const notional = margin * leverage;
  const quantity = notional / entry;
  const totalMargin = margin + extra;
  const marginPerUnit = totalMargin / quantity;

  // 유지증거금이 초기 증거금보다 크면 애초에 열 수 없는 포지션이다
  if (mmr >= 1 / leverage) return null;

  const liqPrice =
    side === 'long'
      ? (entry - marginPerUnit) / (1 - mmr)
      : (entry + marginPerUnit) / (1 + mmr);

  const bankruptcyPrice = side === 'long' ? entry - marginPerUnit : entry + marginPerUnit;

  // 롱에서 증거금이 명목가를 넘으면(=배율 1, 추가 납입) 청산가가 0 이하로 내려간다.
  // 가격은 음수가 될 수 없으므로 "청산 없음"으로 다룬다.
  const liquidatable = liqPrice > 0;

  const maintenanceMargin = mmr * quantity * Math.max(liqPrice, 0);
  const lossAtLiq = totalMargin - maintenanceMargin;

  return {
    liqPrice,
    bankruptcyPrice,
    distancePct: (Math.abs(liqPrice - entry) / entry) * 100,
    notional,
    quantity,
    totalMargin,
    maintenanceMargin,
    lossAtLiq,
    moveToLiqPct: ((liqPrice - entry) / entry) * 100,
    liquidatable,
  };
}

/**
 * 청산가가 진입가에서 최소 `targetPct`% 떨어지도록 하는 최대 배율.
 * "10% 조정은 버티고 싶다"에서 배율을 역산하는 용도다.
 * 롱 기준 X = P(1−1/L)/(1−mmr) 를 (P−X)/P ≥ t 로 풀면 1/L ≥ t(1−mmr)+mmr.
 */
export function maxLeverageForBuffer(targetPct: number, mmrPct: number, side: Side = 'long'): number | null {
  if (!isFinite(targetPct) || targetPct <= 0 || targetPct >= 100) return null;
  if (!isFinite(mmrPct) || mmrPct < 0 || mmrPct >= 100) return null;
  const t = targetPct / 100;
  const mmr = mmrPct / 100;
  // 롱 거리 = (1/L − mmr)/(1 − mmr), 숏 거리 = (1/L − mmr)/(1 + mmr).
  // 각각 t로 놓고 풀면 1/L = t(1 ∓ mmr) + mmr — 양쪽 모두 mmr을 **더한다**.
  const invL = side === 'long' ? t * (1 - mmr) + mmr : t * (1 + mmr) + mmr;
  if (!(invL > 0)) return null;
  return 1 / invL;
}
