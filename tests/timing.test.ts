import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  indexedReturns, growthWhere, perfectTiming, extremeDays,
  distancesToNearest, countWithin, adjacentPairs,
  formatMultiple, formatReturn, EXTREME_COUNTS, type IndexedReturn,
} from '../lib/timing.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

const DAY = 86_400_000;
const D0 = Date.UTC(2020, 0, 1);
const mk = (pcts: number[]): IndexedReturn[] =>
  pcts.map((pct, i) => ({ i, day: D0 + i * DAY, pct }));

test('종가에서 수익률을 만든다', () => {
  const r = indexedReturns([
    { day: D0, close: 100 },
    { day: D0 + DAY, close: 110 },
    { day: D0 + 2 * DAY, close: 99 },
  ]);
  assert.equal(r.length, 2);
  near(r[0].pct, 10, 1e-9);
  near(r[1].pct, -10, 1e-9);
  assert.deepEqual(r.map(x => x.i), [0, 1], '순번은 0부터 연속이다');
});

test('망가진 가격을 건너뛰어도 순번은 연속이다', () => {
  const r = indexedReturns([
    { day: D0, close: 100 },
    { day: D0 + DAY, close: 0 },
    { day: D0 + 2 * DAY, close: 110 },
    { day: D0 + 3 * DAY, close: 121 },
  ]);
  assert.equal(r.length, 1, '0을 낀 두 수익률은 버린다');
  assert.deepEqual(r.map(x => x.i), [0]);
});

test('보유 성장은 그냥 복리다', () => {
  const g = growthWhere(mk([10, 10, 10]))!;
  near(g.multiple, 1.331, 1e-9);
  near(g.log10, Math.log10(1.331), 1e-12);
});

test('건너뛴 날은 수익률 0으로 친다', () => {
  const rets = mk([10, -50, 10]);
  const skipped = growthWhere(rets, r => r.pct < 0)!;
  near(skipped.multiple, 1.21, 1e-9, '−50%인 날을 현금으로 비켜 있었다면');
  const held = growthWhere(rets)!;
  near(held.multiple, 1.21 * 0.5, 1e-9);
});

test('완벽한 타이밍은 상승일만 취한다', () => {
  const g = perfectTiming(mk([10, -50, 20, -30]))!;
  near(g.multiple, 1.1 * 1.2, 1e-9);
});

test('완벽한 타이밍은 언제나 보유 이상이다', () => {
  const rets = mk([5, -8, 12, -3, 7, -15, 2]);
  assert.ok(perfectTiming(rets)!.log10 >= growthWhere(rets)!.log10);
});

test('배수가 double을 넘어도 log10은 살아 있다', () => {
  // 하루 +50%를 2000일 → 10^352, double 범위(1.8e308) 밖
  const g = growthWhere(mk(Array(2000).fill(50)))!;
  assert.equal(g.multiple, Infinity, '배수는 넘친다');
  assert.ok(isFinite(g.log10) && g.log10 > 300, `log10=${g.log10.toFixed(0)}는 유효하다`);
  assert.match(formatMultiple(g), /^10\^35\d\.\d ×$/);
});

test('−100% 이하는 전액 소실로 처리한다', () => {
  const g = growthWhere(mk([10, -100, 10]))!;
  assert.equal(g.multiple, 0);
  assert.equal(g.log10, -Infinity);
  assert.equal(formatReturn(g), '−100%');
});

test('상위/하위 n일을 정확히 뽑는다', () => {
  const { best, worst } = extremeDays(mk([1, -5, 9, 3, -2, 7, -8]), 2);
  assert.deepEqual(best.map(x => x.pct), [9, 7]);
  assert.deepEqual(worst.map(x => x.pct), [-8, -5], '가장 나쁜 날이 앞에 온다');
});

test('n이 데이터 절반을 넘으면 잘라낸다 — 상위·하위가 겹치면 안 된다', () => {
  const rets = mk([1, 2, 3, 4, 5]);
  const { best, worst } = extremeDays(rets, 99);
  assert.equal(best.length, 2);
  assert.equal(worst.length, 2);
  const overlap = best.filter(b => worst.some(w => w.i === b.i));
  assert.equal(overlap.length, 0, '같은 날이 양쪽에 들어가면 이중 계산된다');
});

test('최고의 날과 최악의 날이 붙어 있는 경우를 잡는다 — 페이지의 핵심', () => {
  // 인덱스 5에 폭락, 6에 반등 (2020-03-12 → 03-13 형태)
  const pcts = Array(20).fill(0.1);
  pcts[5] = -39.5;
  pcts[6] = 16.2;
  const rets = mk(pcts);
  const { best, worst } = extremeDays(rets, 3);
  const d = distancesToNearest(best, worst);
  assert.equal(Math.min(...d), 1, '최고의 날 바로 옆이 최악의 날이다');

  const pairs = adjacentPairs(best, worst);
  assert.equal(pairs.length, 1);
  assert.equal(pairs[0].best.pct, 16.2);
  assert.equal(pairs[0].worst.pct, -39.5);
  assert.equal(pairs[0].gap, -1, '최악의 날이 하루 앞선다');
});

test('거리 임계값 집계', () => {
  assert.equal(countWithin([1, 3, 8, 40, 100], 7), 2);
  assert.equal(countWithin([1, 3, 8, 40, 100], 30), 3);
  assert.equal(countWithin([], 7), 0);
});

test('최고의 날을 놓치면 수익이 무너진다', () => {
  // 소소한 날 + 큰 하루
  const pcts = Array(100).fill(0.05);
  pcts[42] = 60;
  const rets = mk(pcts);
  const held = growthWhere(rets)!;
  const { best } = extremeDays(rets, 1);
  const skip = new Set(best.map(x => x.i));
  const missed = growthWhere(rets, r => skip.has(r.i))!;
  assert.ok(missed.multiple < held.multiple * 0.7,
    `1일 놓쳐서 ${held.multiple.toFixed(2)}× → ${missed.multiple.toFixed(2)}×`);
});

test('빈 입력', () => {
  assert.equal(growthWhere([]), null);
  assert.equal(perfectTiming([]), null);
  assert.deepEqual(extremeDays([], 5), { best: [], worst: [] });
  assert.deepEqual(distancesToNearest([], mk([1])), []);
  assert.deepEqual(adjacentPairs(mk([1]), []), []);
});

test('표기 — 작은 배수는 그대로, 큰 배수는 지수로', () => {
  assert.equal(formatMultiple({ multiple: 2.5, log10: Math.log10(2.5) }), '2.50×');
  assert.equal(formatMultiple({ multiple: 14.89, log10: Math.log10(14.89) }), '14.9×');
  assert.equal(formatMultiple({ multiple: 250, log10: Math.log10(250) }), '250×');
  assert.equal(formatReturn({ multiple: 1.5, log10: Math.log10(1.5) }), '+50.0%');
  assert.equal(formatReturn({ multiple: 0.4, log10: Math.log10(0.4) }), '−60.0%');
  assert.equal(formatReturn({ multiple: 14.89, log10: Math.log10(14.89) }), '+1389%');
});

test('선택지 목록', () => {
  assert.deepEqual(EXTREME_COUNTS, [5, 10, 20, 30]);
});
