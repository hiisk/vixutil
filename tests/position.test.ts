import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computePosition, breakevenWinRate, type Side } from '../lib/position.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다 (차이 ${Math.abs(a - b)})`);

const base = { account: 10_000, riskPct: 1, entry: 100, stop: 95, side: 'long' as Side };

test('손절에 걸리면 정확히 리스크 금액만큼 잃는다', () => {
  // 이 모듈의 존재 이유 — 수량은 그걸 만족하도록 역산된다
  const r = computePosition(base)!;
  near(r.riskAmount, 100, 1e-9, '계좌 10,000의 1%');
  near(r.quantity * r.stopDistance, r.riskAmount, 1e-9, '수량 × 손절폭 = 잃는 금액');
  near(r.quantity, 20, 1e-9, '100원 / 5원');
  near(r.notional, 2000, 1e-9);
});

test('손절이 넓어지면 수량이 줄어 손실 금액은 그대로다', () => {
  const tight = computePosition({ ...base, stop: 99 })!;
  const wide = computePosition({ ...base, stop: 90 })!;
  assert.ok(tight.quantity > wide.quantity, '좁은 손절일수록 수량이 크다');
  near(tight.riskAmount, wide.riskAmount, 1e-9, '잃는 금액은 손절폭과 무관하게 같다');
  near(tight.quantity * tight.stopDistance, wide.quantity * wide.stopDistance, 1e-9);
});

test('숏은 손절이 진입가 위에 있다', () => {
  const r = computePosition({ ...base, side: 'short', stop: 105 })!;
  near(r.stopDistance, 5, 1e-9);
  near(r.quantity, 20, 1e-9);
  near(r.stopDistancePct, 5, 1e-9);
});

test('방향과 어긋난 손절은 계산하지 않는다', () => {
  // 롱인데 손절이 진입가 위면 손절이 아니다. 절대값으로 조용히 처리하면 틀린 수량이 나온다.
  assert.equal(computePosition({ ...base, stop: 105 }), null, '롱 + 위쪽 손절');
  assert.equal(computePosition({ ...base, side: 'short', stop: 95 }), null, '숏 + 아래쪽 손절');
  assert.equal(computePosition({ ...base, stop: 100 }), null, '손절 = 진입가');
});

test('레버리지는 수량을 바꾸지 않고 필요 증거금만 바꾼다', () => {
  const x1 = computePosition({ ...base, leverage: 1 })!;
  const x10 = computePosition({ ...base, leverage: 10 })!;
  near(x1.quantity, x10.quantity, 1e-12, '사이즈는 리스크가 정한다 — 레버리지가 아니다');
  near(x1.notional, x10.notional, 1e-12);
  near(x1.marginRequired, 2000, 1e-9);
  near(x10.marginRequired, 200, 1e-9, '10배면 증거금은 1/10');
});

test('필요 배율은 명목가를 계좌로 나눈 값이다', () => {
  // 손절이 아주 좁으면 리스크는 그대로여도 명목가가 계좌를 넘어간다
  const r = computePosition({ ...base, stop: 99.5 })!;
  near(r.notional, (100 / 0.5) * 100, 1e-9);
  near(r.leverageNeeded, r.notional / 10_000, 1e-12);
  assert.equal(r.exceedsAccount, true, '20,000 명목가는 10,000 계좌를 넘는다');

  const small = computePosition(base)!;
  assert.equal(small.exceedsAccount, false);
  assert.ok(small.leverageNeeded < 1, '레버리지가 필요 없는 경우');
});

test('R 배수와 목표 수익', () => {
  const r = computePosition({ ...base, target: 110 })!;
  near(r.rMultiple!, 2, 1e-9, '위로 10, 손절 5 → 2R');
  near(r.targetProfit!, 200, 1e-9, '2R × 100원');
});

test('방향과 어긋난 목표가는 무시한다', () => {
  const r = computePosition({ ...base, target: 90 })!;
  assert.equal(r.rMultiple, null, '롱인데 목표가 아래면 목표가 아니다');
  assert.equal(r.targetProfit, null);
  const s = computePosition({ ...base, side: 'short', stop: 105, target: 110 })!;
  assert.equal(s.rMultiple, null, '숏인데 목표가 위');
});

test('목표가가 없으면 R은 null이다', () => {
  const r = computePosition(base)!;
  assert.equal(r.rMultiple, null);
  assert.equal(r.targetProfit, null);
});

test('잘못된 입력은 null', () => {
  assert.equal(computePosition({ ...base, account: 0 }), null);
  assert.equal(computePosition({ ...base, account: -1 }), null);
  assert.equal(computePosition({ ...base, riskPct: 0 }), null);
  assert.equal(computePosition({ ...base, riskPct: 101 }), null, '100% 초과');
  assert.equal(computePosition({ ...base, riskPct: NaN }), null);
  assert.equal(computePosition({ ...base, entry: 0 }), null);
  assert.equal(computePosition({ ...base, leverage: 0.5 }), null, '1배 미만은 없다');
});

test('리스크 100%는 허용되지만 계좌 전체를 건다', () => {
  const r = computePosition({ ...base, riskPct: 100 })!;
  near(r.riskAmount, 10_000, 1e-9);
});

test('본전 승률은 R 배수만으로 정해진다', () => {
  near(breakevenWinRate(1)!, 50, 1e-9, '1:1이면 50%');
  near(breakevenWinRate(2)!, 100 / 3, 1e-9, '2:1이면 33.3%');
  near(breakevenWinRate(3)!, 25, 1e-9, '3:1이면 25%');
  near(breakevenWinRate(0.5)!, 100 * 2 / 3, 1e-9, '0.5:1이면 66.7%가 필요하다');
  assert.equal(breakevenWinRate(0), null);
  assert.equal(breakevenWinRate(-1), null);
});

test('본전 승률과 기대값이 정합한다', () => {
  // p = 1/(R+1) 에서 기대값 p·R − (1−p) 가 0이어야 한다
  for (const R of [0.5, 1, 1.5, 2, 3, 5]) {
    const p = breakevenWinRate(R)! / 100;
    near(p * R - (1 - p), 0, 1e-12, `R=${R}`);
  }
});
