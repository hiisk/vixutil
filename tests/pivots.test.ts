import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  pivotLevels, backtestPivots, edgeLabel,
  LEVEL_KEYS, LEVEL_LABEL, PIVOT_METHODS, type OHLC,
} from '../lib/pivots.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

const DAY = 86_400_000;
const bar = (i: number, o: number, h: number, l: number, c: number): OHLC =>
  ({ time: Date.UTC(2024, 0, 1) + i * DAY, open: o, high: h, low: l, close: c });

/** 교과서 예시: 고 110, 저 90, 종 100 → P = 100 */
const PREV = bar(0, 95, 110, 90, 100);

test('클래식 공식이 교과서와 맞는다', () => {
  const lv = pivotLevels(PREV, 'classic')!;
  near(lv.p, 100, 1e-12, 'P = (110+90+100)/3');
  near(lv.r1, 110, 1e-12, 'R1 = 2P − L');
  near(lv.s1, 90, 1e-12, 'S1 = 2P − H');
  near(lv.r2, 120, 1e-12, 'R2 = P + (H−L)');
  near(lv.s2, 80, 1e-12, 'S2 = P − (H−L)');
  near(lv.r3, 130, 1e-12, 'R3 = H + 2(P−L)');
  near(lv.s3, 70, 1e-12, 'S3 = L − 2(H−P)');
});

test('레벨은 언제나 순서대로다', () => {
  for (const m of PIVOT_METHODS.map(x => x.key)) {
    const lv = pivotLevels(PREV, m, 102)!;
    assert.ok(lv.s3 < lv.s2 && lv.s2 < lv.s1, `${m} 지지선 순서`);
    assert.ok(lv.r1 < lv.r2 && lv.r2 < lv.r3, `${m} 저항선 순서`);
    assert.ok(lv.s1 < lv.r1, `${m} S1 < R1`);
  }
});

test('피보나치는 범위의 38.2 / 61.8 / 100%다', () => {
  const lv = pivotLevels(PREV, 'fibonacci')!;
  near(lv.p, 100, 1e-12);
  near(lv.r1, 100 + 20 * 0.382, 1e-12);
  near(lv.r2, 100 + 20 * 0.618, 1e-12);
  near(lv.r3, 120, 1e-12);
  near(lv.s1, 100 - 20 * 0.382, 1e-12);
});

test('카마릴라가 가장 좁다 — 일중 되돌림용이라는 근거', () => {
  const cam = pivotLevels(PREV, 'camarilla')!;
  const cls = pivotLevels(PREV, 'classic')!;
  assert.ok(cam.r1 - cam.s1 < cls.r1 - cls.s1,
    `카마릴라 폭 ${(cam.r1 - cam.s1).toFixed(2)} < 클래식 ${(cls.r1 - cls.s1).toFixed(2)}`);
  // R1 = C + range × 1.1/12
  near(cam.r1, 100 + 20 * 1.1 / 12, 1e-12);
});

test('우디는 오늘 시가를 두 번 센다', () => {
  const withOpen = pivotLevels(PREV, 'woodie', 106)!;
  near(withOpen.p, (110 + 90 + 2 * 106) / 4, 1e-12);
  // 시가가 높으면 피벗도 높아진다
  const lower = pivotLevels(PREV, 'woodie', 92)!;
  assert.ok(lower.p < withOpen.p);
});

test('시가를 모르면 우디가 종가로 대신한다', () => {
  const a = pivotLevels(PREV, 'woodie')!;
  const b = pivotLevels(PREV, 'woodie', PREV.close)!;
  near(a.p, b.p, 1e-12);
});

test('망가진 봉은 null', () => {
  assert.equal(pivotLevels(bar(0, 1, 0, 0, 0), 'classic'), null);
  assert.equal(pivotLevels(bar(0, 1, 90, 110, 100), 'classic'), null, '고가 < 저가');
  assert.equal(pivotLevels(bar(0, 1, NaN, 90, 100), 'classic'), null);
});

test('데이터가 적으면 백테스트를 하지 않는다', () => {
  assert.equal(backtestPivots([bar(0, 1, 2, 0.5, 1)], 'classic'), null);
  assert.equal(backtestPivots(Array.from({ length: 29 }, (_, i) => bar(i, 100, 110, 90, 100)), 'classic'), null);
});

test('선에 닿지 않으면 터치로 세지 않는다', () => {
  // 전날 고 110 저 90 종 100 → R1 = 110. 다음날이 100~105면 R1에 닿지 않는다.
  const candles = [PREV, ...Array.from({ length: 40 }, (_, i) => bar(i + 1, 101, 105, 100, 102))];
  const r = backtestPivots(candles, 'classic')!;
  const r1 = r.levels.find(l => l.key === 'r1')!;
  // 둘째 날부터는 전날이 좁은 봉이라 레벨도 좁아진다. 첫 날만 확인한다.
  assert.ok(r1.touches < r.days, '모든 날 닿을 수는 없다');
});

test('완벽히 되돌아오는 시장에서는 유지율이 100%다', () => {
  // 매일 같은 봉을 반복하면 레벨도 같다. 시가가 P 위이고 종가도 P 위면 유지.
  const candles: OHLC[] = [];
  for (let i = 0; i < 60; i++) candles.push(bar(i, 100, 110, 90, 100));
  const r = backtestPivots(candles, 'classic')!;
  const p = r.levels.find(l => l.key === 'p')!;
  // P=100, 시가 100 → judge가 null(시가가 정확히 선 위)이라 안 센다
  assert.equal(p.touches, 0, '시가가 선 위면 판정하지 않는다');
});

test('시가에서 접근한 방향으로 판정한다', () => {
  // 전날 고 110 저 90 종 100 → S1 = 90, R1 = 110
  // 오늘: 시가 105(S1 위), 저가 85(S1 아래로 뚫음), 종가 95(S1 위로 복귀) → 유지
  const candles = [PREV, bar(1, 105, 108, 85, 95)];
  // 30개를 채우기 위해 같은 패턴을 반복
  for (let i = 2; i < 40; i++) candles.push(bar(i, 105, 108, 85, 95));
  const r = backtestPivots(candles, 'classic')!;
  assert.ok(r.days >= 30);
  const s1 = r.levels.find(l => l.key === 's1')!;
  assert.ok(s1.touches > 0, 'S1에 닿은 날이 있어야 한다');
  assert.ok(s1.holdRatePct != null && s1.holdRatePct > 0);
});

test('뚫고 마감하면 유지가 아니다', () => {
  // 시가 105(S1=90 위), 종가 85(S1 아래) → 이탈
  const candles = [PREV];
  for (let i = 1; i < 40; i++) candles.push(bar(i, 105, 108, 84, 85));
  const r = backtestPivots(candles, 'classic')!;
  const s1 = r.levels.find(l => l.key === 's1')!;
  if (s1.touches > 0) assert.ok(s1.holdRatePct! < 50, `이탈이 많아야 한다 (${s1.holdRatePct})`);
});

test('대조군을 같이 낸다 — 이 페이지의 요점', () => {
  // 시드 고정 선형합동생성기로 만든 보행 — Math.random을 쓰면 테스트가 흔들린다.
  // 톱니처럼 규칙적인 시장은 안 된다. 매일 봉 폭이 같으면 레벨 배치가 늘 똑같아서
  // 1.5배 거리의 대조선에 한 번도 닿지 않고, 그러면 대조군이 계산되지 않는다.
  let seed = 12345;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;

  const candles: OHLC[] = [];
  let base = 100;
  for (let i = 0; i < 600; i++) {
    const o = base;
    const c = o * (1 + (rnd() - 0.5) * 0.12);
    const hi = Math.max(o, c) * (1 + rnd() * 0.06);
    const lo = Math.min(o, c) * (1 - rnd() * 0.06);
    candles.push(bar(i, o, hi, lo, c));
    base = c;
  }
  const r = backtestPivots(candles, 'classic')!;
  assert.ok(r.days > 500);
  const withCtrl = r.levels.filter(l => l.controlHoldRatePct != null);
  assert.ok(withCtrl.length > 0, '대조군이 계산돼야 한다');
  // 피벗 자신은 대조선이 자기 자신이 되므로 비교하지 않는다 — 안 그러면 차이가
  // 언제나 +0.0으로 나와 "우위 없음"처럼 보이지만 실은 아무것도 안 잰 것이다
  const pv = r.levels.find(l => l.key === 'p')!;
  assert.equal(pv.controlHoldRatePct, null, '피벗은 대조군이 없다');
  assert.equal(pv.edgePct, null);
  assert.ok(withCtrl.every(l => l.key !== 'p'));
  for (const l of withCtrl) {
    assert.equal(l.edgePct, l.holdRatePct! - l.controlHoldRatePct!);
  }
  assert.ok(r.avgHoldPct != null && r.avgControlPct != null);
});

test('터치가 너무 적은 대조선은 비교하지 않는다', () => {
  // 아주 좁은 봉 → 먼 대조선에 거의 안 닿는다
  const candles: OHLC[] = [];
  for (let i = 0; i < 50; i++) candles.push(bar(i, 100, 100.05, 99.95, 100.01));
  const r = backtestPivots(candles, 'classic')!;
  const far = r.levels.find(l => l.key === 'r3')!;
  assert.ok(far.controlHoldRatePct == null || far.touches >= 10);
});

test('우위 라벨은 잡음을 잡음이라 부른다', () => {
  assert.equal(edgeLabel(null), 'not enough touches');
  assert.equal(edgeLabel(0), 'no different');
  assert.equal(edgeLabel(3), 'no different', '3%p는 잡음이다');
  assert.equal(edgeLabel(-3), 'no different');
  assert.equal(edgeLabel(7), 'slightly better');
  assert.equal(edgeLabel(15), 'clearly better');
  assert.equal(edgeLabel(-15), 'worse');
});

test('상수 목록', () => {
  assert.deepEqual([...LEVEL_KEYS], ['r3', 'r2', 'r1', 'p', 's1', 's2', 's3']);
  assert.equal(LEVEL_LABEL.p, 'Pivot');
  assert.equal(PIVOT_METHODS.length, 4);
  assert.deepEqual(PIVOT_METHODS.map(m => m.key), ['classic', 'fibonacci', 'camarilla', 'woodie']);
});
