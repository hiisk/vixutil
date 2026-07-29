import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeProfit, breakevenPrice, type Side } from '../lib/profit.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다 (차이 ${Math.abs(a - b)})`);

const base = { entry: 100, exit: 110, side: 'long' as Side, quantity: 10, feePct: 0 };

test('수수료가 없으면 손익은 가격차 × 수량이다', () => {
  const r = computeProfit(base)!;
  near(r.grossPnl, 100, 1e-9, '10원 × 10개');
  near(r.netPnl, 100, 1e-9);
  near(r.totalFees, 0);
  near(r.priceChangePct, 10);
});

test('숏은 가격이 내려야 이익이다', () => {
  const down = computeProfit({ ...base, side: 'short', exit: 90 })!;
  near(down.grossPnl, 100, 1e-9);
  near(down.priceChangePct, 10, 1e-9, '숏에서 −10% 하락은 +10% 성과다');
  const up = computeProfit({ ...base, side: 'short', exit: 110 })!;
  near(up.grossPnl, -100, 1e-9);
  near(up.priceChangePct, -10, 1e-9);
});

test('수수료는 진입과 청산 양쪽에 붙는다', () => {
  const r = computeProfit({ ...base, feePct: 0.1 })!;
  near(r.entryFee, 1000 * 0.001, 1e-12, '진입 명목가 1000의 0.1%');
  near(r.exitFee, 1100 * 0.001, 1e-12, '청산 대금 1100의 0.1% — 더 크다');
  near(r.totalFees, r.entryFee + r.exitFee, 1e-12);
  near(r.netPnl, r.grossPnl - r.totalFees, 1e-12);
  assert.ok(r.exitFee > r.entryFee, '이익이 났으면 청산 수수료가 더 크다');
});

test('본전 가격은 진입가가 아니다 — 이 페이지의 요점', () => {
  // 편도 0.1%면 롱 본전은 진입가의 +0.2002%이지 +0.2%가 아니다
  const be = breakevenPrice(100, 'long', 0.1)!;
  near(be, 100 * 1.001 / 0.999, 1e-12);
  assert.ok(be > 100.2, `본전 ${be}는 왕복 수수료 0.2%보다 위여야 한다`);
  near(be, 100.2002002002002, 1e-9);
});

test('숏 본전은 진입가보다 아래다', () => {
  const be = breakevenPrice(100, 'short', 0.1)!;
  near(be, 100 * 0.999 / 1.001, 1e-12);
  assert.ok(be < 100, '숏은 내려가야 수수료를 덮는다');
});

test('본전 가격에서 청산하면 순손익이 정확히 0이다', () => {
  for (const side of ['long', 'short'] as Side[]) {
    for (const fee of [0, 0.02, 0.04, 0.1, 0.5]) {
      const be = breakevenPrice(100, side, fee)!;
      const r = computeProfit({ entry: 100, exit: be, side, quantity: 10, feePct: fee })!;
      near(r.netPnl, 0, 1e-9, `${side} 수수료 ${fee}%`);
    }
  }
});

test('수수료 0이면 본전은 진입가다', () => {
  near(breakevenPrice(100, 'long', 0)!, 100, 1e-12);
  near(breakevenPrice(100, 'short', 0)!, 100, 1e-12);
});

test('레버리지는 손익 금액을 바꾸지 않고 ROI만 바꾼다', () => {
  const x1 = computeProfit({ ...base, leverage: 1 })!;
  const x10 = computeProfit({ ...base, leverage: 10 })!;
  near(x1.netPnl, x10.netPnl, 1e-12, '손익 금액은 같다');
  near(x1.quantity, x10.quantity, 1e-12);
  near(x1.margin, 1000, 1e-9);
  near(x10.margin, 100, 1e-9);
  near(x10.roiPct, x1.roiPct * 10, 1e-9, '증거금이 1/10이면 ROI는 10배');
});

test('투자 금액으로 수량을 역산한다', () => {
  const r = computeProfit({ entry: 50, exit: 60, side: 'long', notional: 1000, feePct: 0 })!;
  near(r.quantity, 20, 1e-12);
  near(r.cost, 1000, 1e-9);
  near(r.netPnl, 200, 1e-9);
});

test('수량과 투자금액을 둘 다 주면 수량이 이긴다', () => {
  const r = computeProfit({ entry: 100, exit: 110, side: 'long', quantity: 5, notional: 99999, feePct: 0 })!;
  near(r.quantity, 5, 1e-12);
});

test('수수료 비중은 손익 대비로 잰다', () => {
  const r = computeProfit({ ...base, exit: 100.5, feePct: 0.1 })!;
  // 가격은 +0.5%지만 수수료가 그 대부분을 먹는다
  assert.ok(r.feeShareOfGrossPct! > 30, `수수료 비중 ${r.feeShareOfGrossPct}%가 커야 한다`);
  assert.ok(r.netPnl < r.grossPnl);
});

test('본전 아래에서 청산하면 가격이 올랐어도 손실이다', () => {
  // 진입가보다 위인데 본전보다 아래 — 사람들이 "이익"이라고 착각하는 구간
  const r = computeProfit({ ...base, exit: 100.1, feePct: 0.1 })!;
  assert.ok(r.grossPnl > 0, '수수료 전에는 이익으로 보인다');
  assert.ok(r.netPnl < 0, '수수료를 넣으면 손실이다');
  assert.ok(100.1 < r.breakevenPrice, '본전 가격보다 아래에서 팔았기 때문이다');
});

test('잘못된 입력은 null', () => {
  assert.equal(computeProfit({ ...base, entry: 0 }), null);
  assert.equal(computeProfit({ ...base, exit: -1 }), null);
  assert.equal(computeProfit({ ...base, quantity: 0, notional: undefined }), null, '수량도 금액도 없다');
  assert.equal(computeProfit({ ...base, feePct: -1 }), null);
  assert.equal(computeProfit({ ...base, feePct: 100 }), null);
  assert.equal(computeProfit({ ...base, leverage: 0.5 }), null);
  assert.equal(breakevenPrice(0, 'long', 0.1), null);
  assert.equal(breakevenPrice(100, 'long', 100), null);
});

test('breakevenMovePct는 항상 양수이고 본전 가격과 정합한다', () => {
  for (const side of ['long', 'short'] as Side[]) {
    const r = computeProfit({ entry: 100, exit: 105, side, quantity: 1, feePct: 0.04 })!;
    assert.ok(r.breakevenMovePct > 0);
    near(r.breakevenMovePct, (Math.abs(r.breakevenPrice - 100) / 100) * 100, 1e-12);
  }
});
