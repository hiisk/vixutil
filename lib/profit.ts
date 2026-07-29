/**
 * 매매 손익 — 수수료를 포함해서 계산한다.
 *
 * 대부분의 수익 계산기가 수수료를 뺀다. 그래서 "진입가로 돌아오면 본전"이라는
 * 잘못된 감각이 생긴다. 실제로는 진입과 청산 양쪽에 수수료가 붙으므로 본전 가격은
 * 진입가보다 위에 있다.
 *
 *   롱 순손익 = 수량·청산가·(1−f) − 수량·진입가·(1+f)
 *   이걸 0으로 놓으면  청산가 = 진입가 × (1+f) / (1−f)
 *
 * 편도 0.1%면 본전은 진입가의 약 +0.2002%다 — 편도 수수료의 2배보다 아주 조금 더
 * 크다. 왕복 0.2%가 아니라 그보다 큰 이유는 청산 수수료가 진입가가 아니라 **더 큰
 * 청산 금액**에 붙기 때문이다. 작아 보이지만 하루에 여러 번 돌리면 이 차이가 성과를
 * 결정한다.
 *
 * 숏은 방향이 뒤집힌다: 청산가 = 진입가 × (1−f) / (1+f) 로 진입가보다 **아래**에 있다.
 *
 * 레버리지는 손익 금액을 바꾸지 않는다. 명목가가 정해지면 가격 변동에 따른 손익은
 * 같고, 레버리지는 그 명목가를 잡는 데 필요한 증거금만 줄인다 — 그래서 증거금 대비
 * 수익률(ROI)만 커진다. 이 구분을 결과에서 분리해 돌려준다.
 */

export type Side = 'long' | 'short';

export interface ProfitInput {
  entry: number;
  exit: number;
  side: Side;
  /** 수량을 직접 넣거나 */
  quantity?: number;
  /** 투자 금액(명목가)을 넣으면 수량을 역산한다 */
  notional?: number;
  /** 편도 수수료(%) — 진입과 청산에 각각 붙는다 */
  feePct: number;
  /** 배율 (기본 1) — 증거금과 ROI에만 영향을 준다 */
  leverage?: number;
}

export interface ProfitResult {
  quantity: number;
  /** 진입 명목가 */
  cost: number;
  /** 청산 대금 */
  proceeds: number;
  entryFee: number;
  exitFee: number;
  totalFees: number;
  /** 수수료 전 손익 */
  grossPnl: number;
  /** 수수료 후 손익 */
  netPnl: number;
  /** 가격 변동률(%) — 방향 반영 */
  priceChangePct: number;
  /** 증거금 = 명목가 / 배율 */
  margin: number;
  /** 증거금 대비 순수익률(%) */
  roiPct: number;
  /** 수수료를 덮고 본전이 되는 청산가 */
  breakevenPrice: number;
  /** 본전까지 필요한 가격 변동률(%) — 항상 양수 */
  breakevenMovePct: number;
  /** 수수료가 총손익에서 차지한 비중(%). 손익이 0이면 null. */
  feeShareOfGrossPct: number | null;
}

const pos = (v: number | undefined): v is number => typeof v === 'number' && isFinite(v) && v > 0;

/**
 * 수수료를 포함한 본전 청산가.
 * 롱은 진입가보다 위, 숏은 아래에 있다.
 */
export function breakevenPrice(entry: number, side: Side, feePct: number): number | null {
  if (!pos(entry)) return null;
  if (!isFinite(feePct) || feePct < 0 || feePct >= 100) return null;
  const f = feePct / 100;
  return side === 'long' ? (entry * (1 + f)) / (1 - f) : (entry * (1 - f)) / (1 + f);
}

/** 손익 계산. 입력이 성립하지 않으면 null. */
export function computeProfit(input: ProfitInput): ProfitResult | null {
  const { entry, exit, side, feePct } = input;
  const leverage = input.leverage ?? 1;

  if (!pos(entry) || !pos(exit) || !pos(leverage) || leverage < 1) return null;
  if (!isFinite(feePct) || feePct < 0 || feePct >= 100) return null;

  const quantity = pos(input.quantity)
    ? input.quantity
    : pos(input.notional)
      ? input.notional / entry
      : NaN;
  if (!pos(quantity)) return null;

  const f = feePct / 100;
  const cost = quantity * entry;
  const proceeds = quantity * exit;
  const entryFee = cost * f;
  const exitFee = proceeds * f;
  const totalFees = entryFee + exitFee;

  const grossPnl = side === 'long' ? proceeds - cost : cost - proceeds;
  const netPnl = grossPnl - totalFees;

  const margin = cost / leverage;
  const raw = ((exit - entry) / entry) * 100;
  const be = breakevenPrice(entry, side, feePct)!;

  return {
    quantity,
    cost,
    proceeds,
    entryFee,
    exitFee,
    totalFees,
    grossPnl,
    netPnl,
    priceChangePct: side === 'long' ? raw : -raw,
    margin,
    roiPct: margin > 0 ? (netPnl / margin) * 100 : 0,
    breakevenPrice: be,
    breakevenMovePct: (Math.abs(be - entry) / entry) * 100,
    feeShareOfGrossPct: grossPnl !== 0 ? (totalFees / Math.abs(grossPnl)) * 100 : null,
  };
}

/** 거래소별 흔한 편도 수수료(%) */
export const FEE_PRESETS: [string, number][] = [
  ['0%', 0],
  ['0.02% maker', 0.02],
  ['0.04% taker', 0.04],
  ['0.10% spot', 0.1],
];
