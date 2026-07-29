import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ruinProbability, breakevenWinRate, computeRuin } from '../lib/ruin.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

test('본전 승률은 1/(R+1)이다', () => {
  near(breakevenWinRate(1)!, 50, 1e-12);
  near(breakevenWinRate(2)!, 100 / 3, 1e-12);
  near(breakevenWinRate(3)!, 25, 1e-12);
  near(breakevenWinRate(0.5)!, 200 / 3, 1e-12);
  assert.equal(breakevenWinRate(0), null);
  assert.equal(breakevenWinRate(-1), null);
});

test('우위가 없으면 파산은 확실하다', () => {
  // 승률 50% 손익비 1 → 기대값 0 → 무한 시간에서 파산 확실
  near(ruinProbability(0.5, 1, 10)!, 100, 1e-9);
  // 기대값 음수도 마찬가지
  near(ruinProbability(0.4, 1, 20)!, 100, 1e-9);
  near(ruinProbability(0.2, 2, 20)!, 100, 1e-9, '0.2×2 = 0.4 < 0.8');
});

test('우위가 있으면 자본이 클수록 파산 확률이 낮아진다 (단조)', () => {
  let prev = Infinity;
  for (const units of [2, 5, 10, 20, 40]) {
    const r = ruinProbability(0.55, 1, units)!;
    assert.ok(r < prev, `자본 ${units}단위에서 단조 감소해야 한다 (${r.toFixed(3)}%)`);
    prev = r;
  }
});

test('우위가 크면 파산 확률이 낮아진다', () => {
  const weak = ruinProbability(0.52, 1, 10)!;
  const strong = ruinProbability(0.65, 1, 10)!;
  assert.ok(strong < weak, `승률 65% ${strong.toFixed(2)}% < 52% ${weak.toFixed(2)}%`);
});

test('손익비가 커지면 파산 확률이 낮아진다', () => {
  const r1 = ruinProbability(0.4, 2, 10)!;
  const r2 = ruinProbability(0.4, 3, 10)!;
  assert.ok(r2 < r1, `손익비 3 (${r2.toFixed(3)}%) < 2 (${r1.toFixed(3)}%)`);
});

test('고전 도박사 파산 공식과 일치한다 (손익비 1)', () => {
  // p로 +1, q로 −1, 자본 n, 목표 무한 → P(ruin) = (q/p)^n
  for (const [p, n] of [[0.55, 5], [0.6, 8], [0.7, 4]] as [number, number][]) {
    const q = 1 - p;
    const expected = Math.pow(q / p, n) * 100;
    const got = ruinProbability(p, 1, n)!;
    assert.ok(Math.abs(got - expected) < Math.max(0.5, expected * 0.05),
      `p=${p} n=${n}: 이론 ${expected.toFixed(4)}% vs 계산 ${got.toFixed(4)}%`);
  }
});

test('파산 확률은 0~100 범위 안이다', () => {
  for (const p of [0.05, 0.3, 0.5, 0.8, 0.95]) {
    for (const R of [0.5, 1, 2, 5]) {
      const r = ruinProbability(p, R, 8)!;
      assert.ok(r >= 0 && r <= 100, `p=${p} R=${R} → ${r}`);
    }
  }
});

test('잘못된 입력은 null', () => {
  assert.equal(ruinProbability(0, 1, 10), null);
  assert.equal(ruinProbability(1, 1, 10), null);
  assert.equal(ruinProbability(0.5, 0, 10), null);
  assert.equal(ruinProbability(0.5, 1, 0.5), null, '자본이 1단위 미만');
  assert.equal(ruinProbability(NaN, 1, 10), null);
});

const base = { winRatePct: 55, rMultiple: 1, riskPerTradePct: 2, ruinThresholdPct: 50 };

test('견딜 수 있는 연속 손실 = 감내폭 / 거래당 리스크', () => {
  const r = computeRuin(base)!;
  assert.equal(r.lossesToRuin, 25, '50% / 2% = 25회');
  const r2 = computeRuin({ ...base, riskPerTradePct: 5 })!;
  assert.equal(r2.lossesToRuin, 10, '50% / 5% = 10회');
});

test('거래당 리스크를 키우면 파산 확률이 오른다 — 이 페이지의 요점', () => {
  const small = computeRuin({ ...base, riskPerTradePct: 1 })!;
  const big = computeRuin({ ...base, riskPerTradePct: 10 })!;
  assert.ok(big.ruinPct > small.ruinPct,
    `10% 리스크 ${big.ruinPct.toFixed(2)}% > 1% 리스크 ${small.ruinPct.toFixed(4)}%`);
  // 같은 우위인데도 결과가 크게 갈린다
  assert.ok(big.ruinPct / Math.max(small.ruinPct, 1e-9) > 10, '차이가 한 자릿수를 넘는다');
});

test('기대값과 우위 판정이 정합한다', () => {
  const edge = computeRuin({ ...base, winRatePct: 55, rMultiple: 1 })!;
  assert.ok(edge.expectancyR > 0);
  assert.equal(edge.hasEdge, true);
  near(edge.breakevenWinRatePct, 50, 1e-12);

  const none = computeRuin({ ...base, winRatePct: 45, rMultiple: 1 })!;
  assert.ok(none.expectancyR < 0);
  assert.equal(none.hasEdge, false);
  near(none.ruinPct, 100, 1e-9);
});

test('본전 승률 근처에서는 우위 판정이 경계에 맞는다', () => {
  // 손익비 2 → 본전 33.33%
  const just = computeRuin({ ...base, winRatePct: 34, rMultiple: 2 })!;
  assert.equal(just.hasEdge, true);
  const below = computeRuin({ ...base, winRatePct: 33, rMultiple: 2 })!;
  assert.equal(below.hasEdge, false);
});

test('연속 손실 확률은 우위가 있어도 0이 아니다', () => {
  const r = computeRuin({ ...base, riskPerTradePct: 10 })!;
  assert.equal(r.lossesToRuin, 5);
  near(r.streakPct, Math.pow(0.45, 5) * 100, 1e-9);
  assert.ok(r.streakPct > 1, `10회 중 5연패 확률 ${r.streakPct.toFixed(2)}%는 무시할 수 없다`);
});

test('computeRuin 잘못된 입력', () => {
  assert.equal(computeRuin({ ...base, winRatePct: 0 }), null);
  assert.equal(computeRuin({ ...base, winRatePct: 100 }), null);
  assert.equal(computeRuin({ ...base, rMultiple: 0 }), null);
  assert.equal(computeRuin({ ...base, riskPerTradePct: 0 }), null);
  assert.equal(computeRuin({ ...base, ruinThresholdPct: 100 }), null);
  assert.equal(computeRuin({ ...base, riskPerTradePct: 60, ruinThresholdPct: 50 }), null,
    '한 번의 손실이 감내폭을 넘으면 단위가 1 미만이다');
});
