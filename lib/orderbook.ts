/**
 * 호가창 깊이와 슬리피지 — "얼마짜리 주문이면 가격이 얼마나 밀리나".
 *
 * 시장가 주문은 최우선 호가에 체결되지 않는다. 호가를 위에서부터 먹어 내려가며
 * 체결되고, 그래서 **평균 체결가**가 최우선 호가보다 나쁘다. 그 차이가 슬리피지다.
 *
 * 사람들이 수수료(0.1% 수준)는 꼼꼼히 비교하면서 이건 잘 안 본다. 유동성이 얕은
 * 코인에서는 슬리피지가 수수료의 수십 배가 되고, 그건 왕복 두 번 물린다.
 *
 * ── 이 모듈이 재는 것 ───────────────────────────────
 *   · 주문 크기별 평균 체결가와 슬리피지(bp)
 *   · 스프레드 — 아무것도 안 해도 왕복에 드는 최소 비용
 *   · ±% 구간 안에 쌓인 유동성. 호가창은 위쪽으로 갈수록 얇아지므로
 *     "1% 안에 얼마"가 "총 호가 개수"보다 훨씬 쓸모 있다.
 *   · 매수/매도 불균형 — 한쪽이 두꺼우면 반대쪽으로 밀기 쉽다
 *
 * ── 한계를 분명히 ──────────────────────────────────
 * 호가창은 스냅샷이다. 큰 주문이 들어오면 사라지는 호가(스푸핑 포함)가 있고,
 * 반대로 새로 채워지기도 한다. 그래서 이 계산은 **하한**에 가깝다. 그리고
 * 아이스버그·숨은 유동성은 애초에 보이지 않는다.
 */

/** [가격, 수량] — 바이낸스 호가 형식 그대로 */
export type Level = [number, number];

export interface Book {
  bids: Level[];
  asks: Level[];
}

export interface FillResult {
  /** 요청한 주문 금액(견적통화) */
  notional: number;
  /** 실제로 채운 금액 */
  filled: number;
  /** 채운 수량(기초자산) */
  qty: number;
  /** 평균 체결가 */
  avgPrice: number;
  /** 최우선 호가 */
  bestPrice: number;
  /** 슬리피지(bp) — 최우선 호가 대비 */
  slippageBps: number;
  /** 마지막으로 먹은 호가 가격 */
  worstPrice: number;
  /** 호가창을 다 먹고도 못 채웠는가 */
  exhausted: boolean;
  /** 소모한 호가 단 수 */
  levels: number;
}

const clean = (l: Level[]): Level[] =>
  l.filter(([p, q]) => isFinite(p) && isFinite(q) && p > 0 && q > 0);

/** 최우선 매수/매도 */
export function bestBidAsk(book: Book): { bid: number; ask: number } | null {
  const b = clean(book.bids);
  const a = clean(book.asks);
  if (!b.length || !a.length) return null;
  // 바이낸스는 정렬해서 주지만 믿지 않는다
  return { bid: Math.max(...b.map(x => x[0])), ask: Math.min(...a.map(x => x[0])) };
}

/** 중간가 */
export function midPrice(book: Book): number | null {
  const bb = bestBidAsk(book);
  return bb ? (bb.bid + bb.ask) / 2 : null;
}

/** 스프레드(bp) — 중간가 기준 */
export function spreadBps(book: Book): number | null {
  const bb = bestBidAsk(book);
  if (!bb) return null;
  const mid = (bb.bid + bb.ask) / 2;
  if (!(mid > 0)) return null;
  return ((bb.ask - bb.bid) / mid) * 10_000;
}

/**
 * 시장가 주문을 호가창에 물려 평균 체결가를 낸다.
 *
 * @param side 'buy'면 매도호가(asks)를 싼 것부터, 'sell'이면 매수호가(bids)를 비싼 것부터
 * @param notional 주문 금액(견적통화, 예: USDT)
 */
export function fillMarketOrder(book: Book, side: 'buy' | 'sell', notional: number): FillResult | null {
  if (!isFinite(notional) || notional <= 0) return null;
  const raw = side === 'buy' ? clean(book.asks) : clean(book.bids);
  if (!raw.length) return null;
  // 매수는 싼 호가부터, 매도는 비싼 호가부터 먹는다
  const levels = [...raw].sort((x, y) => (side === 'buy' ? x[0] - y[0] : y[0] - x[0]));

  const best = levels[0][0];
  let remaining = notional;
  let qty = 0;
  let spent = 0;
  let used = 0;
  let worst = best;

  for (const [price, size] of levels) {
    const avail = price * size;
    used++;
    worst = price;
    if (avail >= remaining) {
      qty += remaining / price;
      spent += remaining;
      remaining = 0;
      break;
    }
    qty += size;
    spent += avail;
    remaining -= avail;
  }

  if (!(qty > 0)) return null;
  const avg = spent / qty;
  // 매수는 평균가가 높을수록 나쁘고, 매도는 낮을수록 나쁘다 — 언제나 양수로 만든다
  let slip = side === 'buy' ? (avg / best - 1) : (1 - avg / best);
  // 한 단에서 다 채워지면 슬리피지는 **정의상 정확히 0**이다. 그런데 spent/qty를
  // 나눗셈으로 되돌리면 부동소수점 잔차가 남아 −1e-16 같은 값이 나오고,
  // toFixed(2)가 그걸 "-0.00 bp"로 찍는다. 있지도 않은 이득처럼 읽힌다.
  if (Math.abs(slip) < 1e-12) slip = 0;
  return {
    notional,
    filled: spent,
    qty,
    avgPrice: avg,
    bestPrice: best,
    slippageBps: slip * 10_000,
    worstPrice: worst,
    exhausted: remaining > 1e-9,
    levels: used,
  };
}

/**
 * 중간가에서 ±pct% 안에 쌓인 유동성(견적통화).
 *
 * "호가 5000단"보다 이 값이 쓸모 있다. 단 수는 거래소 설정이고, 실제로 중요한 건
 * 내가 밀 수 있는 범위 안에 돈이 얼마나 있느냐다.
 */
export function depthWithin(book: Book, pct: number): { bidValue: number; askValue: number } | null {
  const mid = midPrice(book);
  if (mid == null || !isFinite(pct) || pct <= 0) return null;
  const lo = mid * (1 - pct / 100);
  const hi = mid * (1 + pct / 100);
  const sum = (l: Level[], keep: (p: number) => boolean) =>
    clean(l).filter(([p]) => keep(p)).reduce((s, [p, q]) => s + p * q, 0);
  return {
    bidValue: sum(book.bids, p => p >= lo),
    askValue: sum(book.asks, p => p <= hi),
  };
}

/**
 * 매수/매도 불균형 — (매수 − 매도) / (매수 + 매도), −1..1.
 * 양수면 매수벽이 두껍다는 뜻이다. 방향 예측이 아니라 **어느 쪽으로 밀기 쉬운가**로
 * 읽어야 한다. 얇은 쪽이 같은 금액에 더 크게 밀린다.
 */
export function imbalance(bidValue: number, askValue: number): number | null {
  const total = bidValue + askValue;
  if (!isFinite(total) || total <= 0) return null;
  return (bidValue - askValue) / total;
}

/**
 * 가격을 pct% 밀려면 얼마가 필요한가 — 슬리피지의 역함수.
 * "1% 올리는 데 30만 달러" 같은 문장이 유동성을 가장 직관적으로 전달한다.
 */
export function costToMove(book: Book, side: 'buy' | 'sell', pct: number): number | null {
  const bb = bestBidAsk(book);
  if (!bb || !isFinite(pct) || pct <= 0) return null;
  const start = side === 'buy' ? bb.ask : bb.bid;
  const target = side === 'buy' ? start * (1 + pct / 100) : start * (1 - pct / 100);

  const raw = side === 'buy' ? clean(book.asks) : clean(book.bids);
  const levels = [...raw].sort((x, y) => (side === 'buy' ? x[0] - y[0] : y[0] - x[0]));

  let cost = 0;
  for (const [price, size] of levels) {
    if (side === 'buy' ? price > target : price < target) return cost;
    cost += price * size;
  }
  return null; // 호가창 안에서는 그 가격에 닿지 않는다
}

/** 표에 쓸 주문 크기(견적통화) */
export const ORDER_SIZES = [1_000, 10_000, 50_000, 100_000, 500_000, 1_000_000];

/** 깊이를 재는 구간(%) */
export const DEPTH_BANDS = [0.1, 0.5, 1, 2];

/** 슬리피지를 사람 말로 — 수수료(약 10bp)와 견줘 읽게 한다 */
export function slippageLabel(bps: number): string {
  if (bps < 1) return 'negligible';
  if (bps < 10) return 'under one fee';
  if (bps < 50) return 'several times the fee';
  if (bps < 200) return 'dominates the fee';
  return 'the trade is the problem';
}
