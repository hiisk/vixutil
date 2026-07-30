import { test } from 'node:test';
import assert from 'node:assert/strict';
import { simulateRebalance, INTERVALS } from '../lib/rebalance.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

/** 매일 pct% 오르는 계열 */
const grow = (n: number, pct: number, start = 100) => {
  const out = [start];
  for (let i = 1; i < n; i++) out.push(out[i - 1] * (1 + pct / 100));
  return out;
};

test('리밸런싱을 안 하면 두 경로가 같다', () => {
  const r = simulateRebalance({
    series: [grow(100, 0.5), grow(100, -0.2)],
    weights: [0.5, 0.5],
    intervalDays: 0,
  })!;
  near(r.rebalancedMultiple, r.buyHoldMultiple, 1e-12);
  near(r.edgePp, 0, 1e-9);
  assert.equal(r.rebalances, 0);
  near(r.turnoverPct, 0, 1e-12);
});

test('한 자산이 계속 이기면 리밸런싱이 손해다 — 암호화폐에서 흔한 경우', () => {
  const r = simulateRebalance({
    series: [grow(400, 0.5), grow(400, 0)],
    weights: [0.5, 0.5],
    intervalDays: 30,
  })!;
  assert.ok(r.buyHoldMultiple > r.rebalancedMultiple,
    `방치 ${r.buyHoldMultiple.toFixed(2)} > 리밸런싱 ${r.rebalancedMultiple.toFixed(2)}`);
  assert.ok(r.edgePp < 0, '엣지가 음수');
  assert.ok(r.rebalances > 10);
});

test('엎치락뒤치락하면 리밸런싱이 이득이다', () => {
  // 두 자산이 번갈아 오르고 내린다 — 되돌리기가 비싼 것을 팔고 싼 것을 산다
  const n = 400;
  const a: number[] = [100], b: number[] = [100];
  for (let i = 1; i < n; i++) {
    const up = Math.floor(i / 40) % 2 === 0;
    a.push(a[i - 1] * (up ? 1.01 : 0.99));
    b.push(b[i - 1] * (up ? 0.99 : 1.01));
  }
  const r = simulateRebalance({ series: [a, b], weights: [0.5, 0.5], intervalDays: 20 })!;
  assert.ok(r.rebalancedMultiple > r.buyHoldMultiple,
    `리밸런싱 ${r.rebalancedMultiple.toFixed(4)} > 방치 ${r.buyHoldMultiple.toFixed(4)}`);
  assert.ok(r.edgePp > 0);
});

test('방치하면 이기는 자산으로 비중이 쏠린다', () => {
  const r = simulateRebalance({
    series: [grow(400, 0.5), grow(400, 0)],
    weights: [0.5, 0.5],
    intervalDays: 0,
  })!;
  assert.ok(r.finalDriftWeights[0] > 0.8,
    `이긴 자산 비중이 ${(r.finalDriftWeights[0] * 100).toFixed(1)}%로 쏠린다`);
  near(r.finalDriftWeights.reduce((a, b) => a + b, 0), 1, 1e-9, '비중 합은 1');
});

test('수수료가 리밸런싱 성과를 깎는다', () => {
  const series = [grow(400, 0.3), grow(400, 0.1)];
  const free = simulateRebalance({ series, weights: [0.5, 0.5], intervalDays: 7, feePct: 0 })!;
  const paid = simulateRebalance({ series, weights: [0.5, 0.5], intervalDays: 7, feePct: 0.1 })!;
  assert.ok(paid.rebalancedMultiple < free.rebalancedMultiple, '수수료를 내면 성과가 낮다');
  assert.ok(paid.feeCostPct > 0);
  near(free.feeCostPct, 0, 1e-12);
  near(paid.buyHoldMultiple, free.buyHoldMultiple, 1e-12, '방치 경로는 수수료와 무관하다');
});

test('잦은 리밸런싱은 회전율과 수수료를 키운다', () => {
  const series = [grow(400, 0.3), grow(400, 0.1)];
  const weekly = simulateRebalance({ series, weights: [0.5, 0.5], intervalDays: 7, feePct: 0.1 })!;
  const quarterly = simulateRebalance({ series, weights: [0.5, 0.5], intervalDays: 90, feePct: 0.1 })!;
  assert.ok(weekly.rebalances > quarterly.rebalances);
  assert.ok(weekly.turnoverPct > quarterly.turnoverPct);
  assert.ok(weekly.feeCostPct > quarterly.feeCostPct);
});

test('비중은 정규화된다', () => {
  const series = [grow(200, 0.2), grow(200, 0.1)];
  const a = simulateRebalance({ series, weights: [0.5, 0.5], intervalDays: 30 })!;
  const b = simulateRebalance({ series, weights: [50, 50], intervalDays: 30 })!;
  near(a.rebalancedMultiple, b.rebalancedMultiple, 1e-12, '합이 1이 아니어도 같은 결과');
});

test('지속 하락하는 자산으로 리밸런싱하면 낙폭이 더 커진다', () => {
  /*
    처음엔 "리밸런싱이 낙폭을 줄인다"고 가정했는데 반대였다(61.8% vs 56.6%).
    되돌리기는 오른 자산을 팔아 떨어지는 자산을 계속 사들이므로, 하락이 추세적이면
    손실을 키운다. 리밸런싱이 낙폭을 줄이는 것은 자산들이 엎치락뒤치락할 때뿐이다.
    코드가 아니라 가정이 틀린 경우였고, 이 성질을 페이지에도 적었다.
  */
  const n = 300;
  const crash: number[] = [100], calm: number[] = [100];
  for (let i = 1; i < n; i++) {
    crash.push(crash[i - 1] * (i < 150 ? 1.005 : 0.985));
    calm.push(calm[i - 1] * 1.0005);
  }
  const r = simulateRebalance({ series: [crash, calm], weights: [0.5, 0.5], intervalDays: 30 })!;
  const bh = simulateRebalance({ series: [crash, calm], weights: [0.5, 0.5], intervalDays: 0 })!;
  assert.ok(r.rebalancedMaxDdPct > bh.buyHoldMaxDdPct,
    `추세 하락에서는 리밸런싱 낙폭 ${r.rebalancedMaxDdPct.toFixed(1)}%가 방치 ${bh.buyHoldMaxDdPct.toFixed(1)}%보다 크다`);
});

test('엎치락뒤치락할 때는 리밸런싱이 낙폭을 줄인다', () => {
  // 위 테스트의 대조군 — 평균회귀하는 쌍에서는 방향이 뒤집힌다
  const n = 400;
  const a: number[] = [100], b: number[] = [100];
  for (let i = 1; i < n; i++) {
    const up = Math.floor(i / 30) % 2 === 0;
    a.push(a[i - 1] * (up ? 1.015 : 0.985));
    b.push(b[i - 1] * (up ? 0.985 : 1.015));
  }
  const r = simulateRebalance({ series: [a, b], weights: [0.5, 0.5], intervalDays: 15 })!;
  const bh = simulateRebalance({ series: [a, b], weights: [0.5, 0.5], intervalDays: 0 })!;
  assert.ok(r.rebalancedMaxDdPct < bh.buyHoldMaxDdPct,
    `평균회귀에서는 리밸런싱 낙폭 ${r.rebalancedMaxDdPct.toFixed(1)}% < 방치 ${bh.buyHoldMaxDdPct.toFixed(1)}%`);
});

test('잘못된 입력은 null', () => {
  const s = [grow(100, 0.1), grow(100, 0.1)];
  assert.equal(simulateRebalance({ series: [s[0]], weights: [1], intervalDays: 30 }), null, '자산 1개');
  assert.equal(simulateRebalance({ series: s, weights: [0.5], intervalDays: 30 }), null, '비중 개수 불일치');
  assert.equal(simulateRebalance({ series: s, weights: [0, 0], intervalDays: 30 }), null, '비중 합 0');
  assert.equal(simulateRebalance({ series: s, weights: [0.5, 0.5], intervalDays: -1 }), null);
  assert.equal(simulateRebalance({ series: s, weights: [0.5, 0.5], intervalDays: 30, feePct: 100 }), null);
  assert.equal(simulateRebalance({ series: [[100, 0, 100], [100, 100, 100]], weights: [0.5, 0.5], intervalDays: 1 }), null, '0 가격');
  assert.equal(simulateRebalance({ series: [[100, 100], [100, 100]], weights: [0.5, 0.5], intervalDays: 1 }), null, '길이 부족');
});

test('길이가 다르면 짧은 쪽에 맞춘다', () => {
  const r = simulateRebalance({
    series: [grow(300, 0.2), grow(100, 0.2)],
    weights: [0.5, 0.5],
    intervalDays: 30,
  })!;
  // 100일 기준이므로 300일치 성장이 반영되지 않는다
  assert.ok(r.buyHoldMultiple < 2, `100일 기준이어야 한다 (${r.buyHoldMultiple.toFixed(2)})`);
});

test('주기 선택지', () => {
  const m = new Map(INTERVALS);
  assert.equal(m.get('Never'), 0);
  assert.equal(m.get('Weekly'), 7);
  assert.equal(m.get('Monthly'), 30);
  assert.equal(m.get('Quarterly'), 90);
});
