import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeLiquidation, maxLeverageForBuffer, type Side } from '../lib/liquidation.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다 (차이 ${Math.abs(a - b)})`);

/** 청산 조건을 정의식으로 되짚어 검산한다: 총증거금 − 손실 = 유지증거금 */
function residual(entry: number, side: Side, leverage: number, mmrPct: number, margin: number, extra = 0) {
  const r = computeLiquidation({ entry, side, leverage, mmrPct, margin, extraMargin: extra })!;
  const loss = side === 'long' ? r.quantity * (entry - r.liqPrice) : r.quantity * (r.liqPrice - entry);
  const maint = (mmrPct / 100) * r.quantity * r.liqPrice;
  return r.totalMargin - loss - maint;
}

test('청산 정의식을 만족한다 — 총증거금 − 손실 = 유지증거금', () => {
  for (const side of ['long', 'short'] as Side[]) {
    for (const L of [2, 5, 10, 25, 50, 100]) {
      for (const mmr of [0, 0.4, 0.5, 1]) {
        if (mmr / 100 >= 1 / L) continue;
        near(residual(100, side, L, mmr, 1000), 0, 1e-9, `${side} L=${L} mmr=${mmr}%`);
      }
    }
  }
});

test('유지증거금은 진입가가 아니라 청산가의 명목가에 붙는다', () => {
  // 이 구분을 빠뜨린 계산기는 롱 청산가를 P(1−1/L)로 계산한다. 고배율일수록 벌어진다.
  const r = computeLiquidation({ entry: 100, side: 'long', leverage: 10, mmrPct: 0.5, margin: 1000 })!;
  near(r.liqPrice, 100 * (1 - 1 / 10) / (1 - 0.005), 1e-12);
  near(r.liqPrice, 90.4522613065327, 1e-10);
  assert.ok(r.liqPrice > 90, '유지증거금이 먼저 잠식되므로 순진한 90보다 위에 있어야 한다');
});

test('숏은 진입가 위에서 청산되고, 순진한 값보다 아래다', () => {
  const r = computeLiquidation({ entry: 100, side: 'short', leverage: 10, mmrPct: 0.5, margin: 1000 })!;
  near(r.liqPrice, 100 * (1 + 1 / 10) / (1 + 0.005), 1e-12);
  assert.ok(r.liqPrice > 100 && r.liqPrice < 110, `숏 청산가 ${r.liqPrice}는 100과 110 사이여야 한다`);
});

test('배율 1·유지증거금 0인 현물 롱은 청산되지 않는다', () => {
  const r = computeLiquidation({ entry: 100, side: 'long', leverage: 1, mmrPct: 0, margin: 1000 })!;
  near(r.liqPrice, 0, 1e-12);
  assert.equal(r.liquidatable, false, '가격이 0이 되기 전엔 청산이 없다');
});

test('배율이 오르면 청산가가 진입가에 붙는다 (단조)', () => {
  let prev = -Infinity;
  for (const L of [2, 5, 10, 20, 50, 100, 125]) {
    const r = computeLiquidation({ entry: 100, side: 'long', leverage: L, mmrPct: 0.4, margin: 1000 })!;
    assert.ok(r.liqPrice > prev, `L=${L}에서 청산가가 단조 증가해야 한다`);
    prev = r.liqPrice;
  }
  // 125배는 실제 바이낸스처럼 1% 미만 거리여야 한다
  const hi = computeLiquidation({ entry: 100, side: 'long', leverage: 125, mmrPct: 0.4, margin: 1000 })!;
  assert.ok(hi.distancePct < 1, `125배 청산 거리 ${hi.distancePct}%는 1% 미만이어야 한다`);
});

test('증거금을 추가하면 청산가가 멀어진다', () => {
  const base = computeLiquidation({ entry: 100, side: 'long', leverage: 10, mmrPct: 0.5, margin: 1000 })!;
  const added = computeLiquidation({ entry: 100, side: 'long', leverage: 10, mmrPct: 0.5, margin: 1000, extraMargin: 500 })!;
  assert.ok(added.liqPrice < base.liqPrice, '롱은 추가 납입 시 청산가가 내려가야 한다');
  assert.equal(added.notional, base.notional, '추가 증거금은 명목가를 바꾸지 않는다');
  assert.equal(added.quantity, base.quantity, '수량도 그대로다');
});

test('파산가는 항상 청산가보다 진입가에서 멀다', () => {
  for (const side of ['long', 'short'] as Side[]) {
    const r = computeLiquidation({ entry: 100, side, leverage: 20, mmrPct: 0.5, margin: 1000 })!;
    const dLiq = Math.abs(r.liqPrice - 100);
    const dBank = Math.abs(r.bankruptcyPrice - 100);
    assert.ok(dBank > dLiq, `${side}: 파산가(${r.bankruptcyPrice})가 청산가(${r.liqPrice})보다 멀어야 한다`);
  }
});

test('명목가·수량이 증거금과 배율에서 바르게 나온다', () => {
  const r = computeLiquidation({ entry: 50, side: 'long', leverage: 20, mmrPct: 0.5, margin: 200 })!;
  near(r.notional, 4000, 1e-12);
  near(r.quantity, 80, 1e-12);
});

test('유지증거금률이 1/배율 이상이면 열 수 없는 포지션이라 null', () => {
  assert.equal(computeLiquidation({ entry: 100, side: 'long', leverage: 100, mmrPct: 1, margin: 1000 }), null);
  assert.equal(computeLiquidation({ entry: 100, side: 'long', leverage: 100, mmrPct: 2, margin: 1000 }), null);
  assert.ok(computeLiquidation({ entry: 100, side: 'long', leverage: 100, mmrPct: 0.5, margin: 1000 }));
});

test('잘못된 입력은 null을 돌려준다', () => {
  const ok = { entry: 100, side: 'long' as Side, leverage: 10, mmrPct: 0.5, margin: 1000 };
  assert.equal(computeLiquidation({ ...ok, entry: 0 }), null);
  assert.equal(computeLiquidation({ ...ok, entry: -1 }), null);
  assert.equal(computeLiquidation({ ...ok, leverage: 0.5 }), null, '1배 미만은 없다');
  assert.equal(computeLiquidation({ ...ok, margin: 0 }), null);
  assert.equal(computeLiquidation({ ...ok, mmrPct: -1 }), null);
  assert.equal(computeLiquidation({ ...ok, mmrPct: NaN }), null);
  assert.equal(computeLiquidation({ ...ok, extraMargin: -5 }), null);
});

test('moveToLiqPct 부호가 방향과 맞는다', () => {
  const l = computeLiquidation({ entry: 100, side: 'long', leverage: 10, mmrPct: 0.5, margin: 1000 })!;
  const s = computeLiquidation({ entry: 100, side: 'short', leverage: 10, mmrPct: 0.5, margin: 1000 })!;
  assert.ok(l.moveToLiqPct < 0, '롱은 가격이 내려가야 청산된다');
  assert.ok(s.moveToLiqPct > 0, '숏은 가격이 올라가야 청산된다');
  near(Math.abs(l.moveToLiqPct), l.distancePct, 1e-12);
});

test('maxLeverageForBuffer는 computeLiquidation과 왕복 일치한다', () => {
  for (const side of ['long', 'short'] as Side[]) {
    for (const target of [5, 10, 20, 50]) {
      for (const mmr of [0, 0.5, 1]) {
        const L = maxLeverageForBuffer(target, mmr, side);
        if (L == null) continue;
        const r = computeLiquidation({ entry: 100, side, leverage: L, mmrPct: mmr, margin: 1000 })!;
        near(r.distancePct, target, 1e-9, `${side} 목표 ${target}% mmr ${mmr}%`);
      }
    }
  }
});

test('maxLeverageForBuffer 경계값', () => {
  assert.equal(maxLeverageForBuffer(0, 0.5), null);
  assert.equal(maxLeverageForBuffer(100, 0.5), null);
  assert.equal(maxLeverageForBuffer(-5, 0.5), null);
  // 유지증거금 0이면 "10% 버퍼 = 10배"라는 교과서 값이 나온다
  near(maxLeverageForBuffer(10, 0)!, 10, 1e-12);
});
