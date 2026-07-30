import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  bestBidAsk, midPrice, spreadBps, fillMarketOrder,
  depthWithin, imbalance, costToMove,
  slippageLabel, ORDER_SIZES, DEPTH_BANDS, type Book,
} from '../lib/orderbook.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

/** 100을 중심으로 한 균일 호가창 — 각 단 수량 10 */
const flat: Book = {
  bids: [[99.9, 10], [99.8, 10], [99.7, 10], [99.6, 10], [99.5, 10]],
  asks: [[100.1, 10], [100.2, 10], [100.3, 10], [100.4, 10], [100.5, 10]],
};

test('최우선 호가와 중간가', () => {
  const bb = bestBidAsk(flat)!;
  near(bb.bid, 99.9, 1e-9);
  near(bb.ask, 100.1, 1e-9);
  near(midPrice(flat)!, 100, 1e-9);
});

test('정렬이 뒤집혀 와도 최우선을 찾는다', () => {
  const messy: Book = { bids: [[99.5, 1], [99.9, 1], [99.7, 1]], asks: [[100.5, 1], [100.1, 1]] };
  const bb = bestBidAsk(messy)!;
  near(bb.bid, 99.9, 1e-9);
  near(bb.ask, 100.1, 1e-9);
});

test('스프레드는 중간가 기준 bp다', () => {
  // (100.1 − 99.9)/100 = 0.002 → 20bp
  near(spreadBps(flat)!, 20, 1e-9);
});

test('최우선 호가 안에 들어가면 슬리피지가 0이다', () => {
  // 100.1 × 10 = 1001까지는 첫 단에서 다 채워진다
  const f = fillMarketOrder(flat, 'buy', 500)!;
  near(f.avgPrice, 100.1, 1e-9);
  near(f.slippageBps, 0, 1e-9);
  assert.equal(f.levels, 1);
  assert.equal(f.exhausted, false);
});

test('한 단 체결은 정확히 0이어야 한다 — 음수 0이 나오면 안 된다', () => {
  // 나눗셈 잔차가 남으면 toFixed(2)가 "-0.00 bp"로 찍혀 이득처럼 읽힌다
  // 첫 단 안에 들어가는 값만 쓴다 — 매도 쪽 첫 단은 99.9 × 10 = 999가 상한이다
  for (const notional of [1, 7, 137.77, 998.99]) {
    for (const side of ['buy', 'sell'] as const) {
      const f = fillMarketOrder(flat, side, notional)!;
      assert.equal(f.levels, 1);
      assert.equal(Object.is(f.slippageBps, -0) ? 0 : f.slippageBps, 0,
        `${side} ${notional} → ${f.slippageBps}`);
      assert.ok(!(f.slippageBps < 0), '음수 슬리피지는 없다');
    }
  }
});

test('가격이 딱 떨어지지 않는 호가에서도 음수가 안 나온다', () => {
  const odd: Book = { bids: [[63991.01, 8.37544]], asks: [[63991.02, 3.11119]] };
  for (const side of ['buy', 'sell'] as const) {
    const f = fillMarketOrder(odd, side, 10_000)!;
    assert.ok(f.slippageBps >= 0, `${side} → ${f.slippageBps}`);
    assert.equal(f.slippageBps, 0);
  }
});

test('여러 단을 먹으면 평균가가 나빠진다', () => {
  // 첫 단 1001을 다 먹고 둘째 단으로 넘어간다
  const f = fillMarketOrder(flat, 'buy', 2000)!;
  assert.equal(f.levels, 2);
  assert.ok(f.avgPrice > 100.1, `평균 ${f.avgPrice}가 최우선보다 높아야 한다`);
  assert.ok(f.slippageBps > 0);
  near(f.filled, 2000, 1e-9);
  // 수량 검증: 1001/100.1 = 10, 나머지 999/100.2
  near(f.qty, 10 + 999 / 100.2, 1e-9);
  near(f.avgPrice, 2000 / f.qty, 1e-9);
});

test('매도는 아래로 먹으며 슬리피지가 양수로 나온다', () => {
  const f = fillMarketOrder(flat, 'sell', 2000)!;
  assert.ok(f.avgPrice < 99.9, `평균 ${f.avgPrice}가 최우선보다 낮아야 한다`);
  assert.ok(f.slippageBps > 0, '방향과 무관하게 비용은 양수로 표시한다');
  near(f.bestPrice, 99.9, 1e-9);
});

test('주문이 클수록 슬리피지가 커진다 — 이 페이지의 요점', () => {
  const sizes = [500, 2000, 4000, 5000];
  const slips = sizes.map(s => fillMarketOrder(flat, 'buy', s)!.slippageBps);
  for (let i = 1; i < slips.length; i++) {
    assert.ok(slips[i] >= slips[i - 1], `${sizes[i]}가 ${sizes[i - 1]}보다 나빠야 한다`);
  }
  assert.ok(slips[0] === 0 && slips.at(-1)! > 0);
});

test('호가창을 다 먹으면 exhausted가 선다', () => {
  // 매도호가 총액 = 100.1~100.5 × 10 ≈ 5015
  const f = fillMarketOrder(flat, 'buy', 100_000)!;
  assert.equal(f.exhausted, true);
  assert.ok(f.filled < 100_000, '채운 금액이 요청보다 적다');
  near(f.filled, (100.1 + 100.2 + 100.3 + 100.4 + 100.5) * 10, 1e-9);
  assert.equal(f.levels, 5);
});

test('얇은 호가창이 두꺼운 것보다 훨씬 나쁘다', () => {
  const thin: Book = { bids: [[99.9, 0.1]], asks: [[100.1, 0.1], [105, 100]] };
  const thick = flat;
  const a = fillMarketOrder(thin, 'buy', 5000)!;
  const b = fillMarketOrder(thick, 'buy', 5000)!;
  assert.ok(a.slippageBps > b.slippageBps * 5,
    `얇은 쪽 ${a.slippageBps.toFixed(0)}bp vs 두꺼운 쪽 ${b.slippageBps.toFixed(0)}bp`);
});

test('구간 안 유동성', () => {
  // 중간가 100, ±0.25% → 99.75 ~ 100.25
  const d = depthWithin(flat, 0.25)!;
  near(d.bidValue, 99.9 * 10 + 99.8 * 10, 1e-9, '99.9와 99.8만 든다');
  near(d.askValue, 100.1 * 10 + 100.2 * 10, 1e-9);
});

test('구간을 넓히면 유동성이 는다', () => {
  const narrow = depthWithin(flat, 0.15)!;
  const wide = depthWithin(flat, 1)!;
  assert.ok(wide.bidValue > narrow.bidValue);
  assert.ok(wide.askValue > narrow.askValue);
});

test('불균형 — 매수벽이 두꺼우면 양수', () => {
  near(imbalance(1000, 1000)!, 0, 1e-12);
  near(imbalance(1500, 500)!, 0.5, 1e-12);
  near(imbalance(500, 1500)!, -0.5, 1e-12);
  assert.equal(imbalance(0, 0), null);
});

test('가격을 밀어올리는 비용', () => {
  // 100.1에서 0.25% 위 = 100.35까지 → 100.1, 100.2, 100.3 세 단
  const c = costToMove(flat, 'buy', 0.25)!;
  near(c, (100.1 + 100.2 + 100.3) * 10, 1e-9);
});

test('호가창 밖으로 밀려면 알 수 없다고 답한다', () => {
  assert.equal(costToMove(flat, 'buy', 50), null, '50%는 호가창 밖이다');
});

test('얇은 쪽을 미는 게 더 싸다', () => {
  // 목표가 밖에도 호가가 있어야 한다 — 없으면 "닿지 않는다"로 null이 나온다
  const lopsided: Book = {
    bids: [[99.9, 100], [99.8, 100], [99.7, 100], [99.6, 100]],   // 두껍다
    asks: [[100.1, 1], [100.2, 1], [100.3, 1], [100.4, 1]],       // 얇다
  };
  const up = costToMove(lopsided, 'buy', 0.25)!;
  const down = costToMove(lopsided, 'sell', 0.25)!;
  assert.ok(up != null && down != null, '양쪽 다 목표가에 닿아야 한다');
  assert.ok(up < down, `위로 밀기 ${up.toFixed(0)} < 아래로 밀기 ${down.toFixed(0)}`);
  near(up, (100.1 + 100.2 + 100.3) * 1, 1e-9);
  near(down, (99.9 + 99.8 + 99.7) * 100, 1e-9);
});

test('망가진 호가는 무시한다', () => {
  const dirty: Book = {
    bids: [[99.9, 10], [NaN, 5], [99.8, -1], [0, 100]],
    asks: [[100.1, 10]],
  };
  const bb = bestBidAsk(dirty)!;
  near(bb.bid, 99.9, 1e-9, '0이나 NaN이 최우선이 되면 안 된다');
  const f = fillMarketOrder(dirty, 'sell', 500)!;
  near(f.avgPrice, 99.9, 1e-9);
});

test('빈 호가창', () => {
  const empty: Book = { bids: [], asks: [] };
  assert.equal(bestBidAsk(empty), null);
  assert.equal(midPrice(empty), null);
  assert.equal(spreadBps(empty), null);
  assert.equal(fillMarketOrder(empty, 'buy', 100), null);
  assert.equal(depthWithin(empty, 1), null);
  assert.equal(costToMove(empty, 'buy', 1), null);
});

test('잘못된 주문 크기', () => {
  assert.equal(fillMarketOrder(flat, 'buy', 0), null);
  assert.equal(fillMarketOrder(flat, 'buy', -100), null);
  assert.equal(fillMarketOrder(flat, 'buy', NaN), null);
  assert.equal(depthWithin(flat, 0), null);
});

test('슬리피지 라벨', () => {
  assert.equal(slippageLabel(0.5), 'negligible');
  assert.equal(slippageLabel(5), 'under one fee');
  assert.equal(slippageLabel(30), 'several times the fee');
  assert.equal(slippageLabel(100), 'dominates the fee');
  assert.equal(slippageLabel(500), 'the trade is the problem');
});

test('상수 목록', () => {
  assert.equal(ORDER_SIZES[0], 1_000);
  assert.equal(ORDER_SIZES.at(-1), 1_000_000);
  assert.deepEqual(DEPTH_BANDS, [0.1, 0.5, 1, 2]);
});
