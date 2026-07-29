import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  toBps, pegState, buildDepegRows, impliedUsdtBps, countByState,
  WATCH_BPS, DEPEG_BPS, type DepegInputRow,
} from '../lib/depeg.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

test('bp 변환 — 1.0 기준', () => {
  near(toBps(1)!, 0, 1e-9);
  near(toBps(0.999)!, -10, 1e-9, '0.1% 낮으면 −10bp');
  near(toBps(1.001)!, 10, 1e-9);
  near(toBps(0.95)!, -500, 1e-9, '5% 낮으면 −500bp');
});

test('bp 변환 잘못된 입력', () => {
  assert.equal(toBps(0), null);
  assert.equal(toBps(-1), null);
  assert.equal(toBps(NaN), null);
});

test('상태 경계 — 부호와 무관하게 절대값으로 판단', () => {
  assert.equal(pegState(0), 'pegged');
  assert.equal(pegState(WATCH_BPS - 1), 'pegged');
  assert.equal(pegState(WATCH_BPS), 'watch');
  assert.equal(pegState(DEPEG_BPS - 1), 'watch');
  assert.equal(pegState(DEPEG_BPS), 'depegged');
  // 아래로 벗어난 경우도 같다
  assert.equal(pegState(-WATCH_BPS), 'watch');
  assert.equal(pegState(-DEPEG_BPS), 'depegged');
});

const row = (base: string, price: number, low = price, high = price, vol = 1e6): DepegInputRow =>
  ({ base, price, low24h: low, high24h: high, quoteVolume: vol });

test('행은 이탈 절대값 내림차순이다', () => {
  const rows = buildDepegRows([row('A', 1.0), row('B', 0.99), row('C', 1.002)]);
  assert.deepEqual(rows.map(r => r.base), ['B', 'C', 'A']);
});

test('worst24h는 현재값과 24시간 고저 중 가장 먼 쪽이다', () => {
  // 지금은 1.0인데 장중 0.98까지 갔다면 200bp가 기록돼야 한다
  const r = buildDepegRows([row('A', 1.0, 0.98, 1.001)])[0];
  near(r.deviationBps, 0, 1e-9, '현재는 페그');
  near(r.worst24hBps, 200, 1e-9, '장중에는 200bp 벗어났다');
  assert.equal(r.state, 'pegged', '상태는 현재값으로 판단한다');
});

test('worst24h는 항상 양수다', () => {
  for (const r of buildDepegRows([row('A', 0.995, 0.99, 1.0), row('B', 1.005, 1.0, 1.01)])) {
    assert.ok(r.worst24hBps > 0, `${r.base}`);
  }
});

test('망가진 가격은 행에서 빠진다', () => {
  const rows = buildDepegRows([row('OK', 1.0), row('BAD', 0), row('WORSE', -1)]);
  assert.deepEqual(rows.map(r => r.base), ['OK']);
});

test('USDT 이탈은 다른 코인들의 중앙값을 뒤집은 값이다', () => {
  // 셋이 일제히 +20bp면 USDT가 −20bp인 쪽이 설명이 간단하다
  const rows = buildDepegRows([row('A', 1.002), row('B', 1.002), row('C', 1.002)]);
  near(impliedUsdtBps(rows)!, -20, 1e-9);
});

test('USDT 추정은 한 코인이 무너져도 끌려가지 않는다 — 중앙값을 쓰는 이유', () => {
  // 한 코인이 −5000bp(0.5달러)로 무너졌지만 나머지는 페그
  const rows = buildDepegRows([row('DEAD', 0.5), row('A', 1.0), row('B', 1.0), row('C', 1.0)]);
  near(impliedUsdtBps(rows)!, 0, 1e-9, '중앙값은 0 → USDT는 정상');
  // 평균을 썼다면 크게 왜곡됐을 것이다
  const avg = rows.reduce((s, r) => s + r.deviationBps, 0) / rows.length;
  assert.ok(Math.abs(avg) > 1000, `평균은 ${avg.toFixed(0)}bp로 끌려간다`);
});

test('코인이 2개 미만이면 USDT 추정 불가', () => {
  assert.equal(impliedUsdtBps(buildDepegRows([row('A', 1.0)])), null);
  assert.equal(impliedUsdtBps([]), null);
});

test('상태별 개수 집계', () => {
  const rows = buildDepegRows([
    row('A', 1.0),        // pegged
    row('B', 1.005),      // 50bp → watch
    row('C', 0.98),       // −200bp → depegged
    row('D', 0.9999),     // −1bp → pegged
  ]);
  const c = countByState(rows);
  assert.equal(c.pegged, 2);
  assert.equal(c.watch, 1);
  assert.equal(c.depegged, 1);
  assert.equal(c.pegged + c.watch + c.depegged, rows.length);
});

test('경계값이 관례값임을 상수로 노출한다', () => {
  assert.equal(WATCH_BPS, 30);
  assert.equal(DEPEG_BPS, 100);
  assert.ok(WATCH_BPS < DEPEG_BPS);
});
