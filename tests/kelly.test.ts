import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  kellyFraction, logGrowth, breakevenWinRate, computeKelly,
  zeroGrowthFraction, growthRetainedPct, drawdownProbabilityPct, KELLY_FRACTIONS,
} from '../lib/kelly.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

test('교과서 예시 — 승률 60%, 손익비 1이면 20%', () => {
  // f* = (0.6·1 − 0.4)/1 = 0.2
  near(kellyFraction(0.6, 1)!, 0.2, 1e-12);
});

test('손익비가 커지면 비율도 커진다', () => {
  // f* = (0.5·2 − 0.5)/2 = 0.25
  near(kellyFraction(0.5, 2)!, 0.25, 1e-12);
  assert.ok(kellyFraction(0.5, 3)! > kellyFraction(0.5, 2)!);
});

test('우위가 없으면 음수가 나온다 — 걸지 말라는 뜻', () => {
  // 승률 40%, 손익비 1 → (0.4 − 0.6)/1 = −0.2
  near(kellyFraction(0.4, 1)!, -0.2, 1e-12);
  const r = computeKelly(40, 1)!;
  assert.equal(r.hasEdge, false);
  assert.ok(r.fullKellyPct < 0);
});

test('본전 승률에서는 켈리가 정확히 0이다', () => {
  for (const b of [0.5, 1, 2, 3.7]) {
    const p = 1 / (b + 1);
    near(kellyFraction(p, b)!, 0, 1e-12, `손익비 ${b}`);
    near(breakevenWinRate(b)!, p * 100, 1e-12);
  }
});

test('본전 승률은 손익비가 클수록 낮다', () => {
  near(breakevenWinRate(1)!, 50, 1e-12);
  near(breakevenWinRate(2)!, 100 / 3, 1e-12);
  near(breakevenWinRate(3)!, 25, 1e-12);
});

test('켈리가 성장률을 최대화한다 — 주변을 훑어 확인', () => {
  const p = 0.6, b = 1.5;
  const f0 = kellyFraction(p, b)!;
  const best = logGrowth(p, b, f0)!;
  for (let f = 0.01; f < 0.95; f += 0.01) {
    assert.ok(logGrowth(p, b, f)! <= best + 1e-12,
      `f=${f.toFixed(2)}가 켈리 f*=${f0.toFixed(4)}보다 좋을 수 없다`);
  }
});

test('켈리의 2배는 성장률을 0 근처까지 떨구고 그 위는 음수다', () => {
  const p = 0.6, b = 1;
  const f0 = kellyFraction(p, b)!;      // 0.2
  const z = zeroGrowthFraction(p, b)!;
  assert.ok(z > f0, '0성장 지점은 켈리보다 크다');
  near(logGrowth(p, b, z)!, 0, 1e-9);
  assert.ok(logGrowth(p, b, z + 0.01)! < 0, '넘기면 장기적으로 자본이 줄어든다');
});

test('분할 켈리는 성장률을 조금 잃고 위험을 많이 줄인다', () => {
  const p = 0.6, b = 1;
  const f0 = kellyFraction(p, b)!;
  const full = logGrowth(p, b, f0)!;
  const half = logGrowth(p, b, f0 / 2)!;
  // 절반 켈리는 성장률의 약 3/4을 유지한다 — 이 페이지의 핵심 주장
  const kept = half / full;
  assert.ok(kept > 0.7 && kept < 0.8, `절반 켈리가 성장률 ${(kept * 100).toFixed(1)}%를 남긴다`);
});

test('전액 이상을 걸면 성장률이 −∞다', () => {
  assert.equal(logGrowth(0.6, 1, 1), -Infinity);
  assert.equal(logGrowth(0.9, 5, 1.5), -Infinity, '2배 켈리라도 f≥1이면 파산');
});

test('기대값은 R 단위로 낸다', () => {
  // 승률 40%, 손익비 3 → 0.4·3 − 0.6 = 0.6R
  near(computeKelly(40, 3)!.expectancyR, 0.6, 1e-12);
});

test('기대값이 양수인데 승률은 절반 미만일 수 있다', () => {
  const r = computeKelly(40, 3)!;
  assert.ok(r.hasEdge, '승률 40%여도 손익비 3이면 우위가 있다');
  assert.ok(r.breakevenWinRatePct < 40);
});

test('성장률은 우위가 있을 때만 양수다', () => {
  assert.ok(computeKelly(60, 1)!.fullGrowth > 0);
  assert.equal(computeKelly(40, 1)!.fullGrowth, 0, '우위 없으면 베팅 안 함 → 성장 0');
});

test('경계값은 null', () => {
  assert.equal(kellyFraction(0, 1), null);
  assert.equal(kellyFraction(1, 1), null, '승률 100%는 켈리가 정의되지만 입력으로 막는다');
  assert.equal(kellyFraction(0.6, 0), null);
  assert.equal(kellyFraction(0.6, -1), null);
  assert.equal(computeKelly(100, 1), null);
  assert.equal(computeKelly(0, 1), null);
  assert.equal(logGrowth(0.6, 1, -0.1), null);
  assert.equal(zeroGrowthFraction(0.4, 1), null, '우위가 없으면 0성장 지점도 없다');
});

test('성장률 유지 비율은 c(2−c)', () => {
  near(growthRetainedPct(0.5)!, 75, 1e-12, '절반 켈리 → 성장률 75%');
  near(growthRetainedPct(0.25)!, 43.75, 1e-12);
  near(growthRetainedPct(0.75)!, 93.75, 1e-12);
  near(growthRetainedPct(1)!, 100, 1e-12);
  near(growthRetainedPct(2)!, 0, 1e-12, '2배 켈리 → 성장률 0');
});

test('연속 근사가 이산 계산과 대체로 맞는다', () => {
  // 작은 베팅일수록 근사가 좋아진다 — 손익비 1, 승률 52%면 켈리가 4%로 작다
  const p = 0.52, b = 1;
  const f0 = kellyFraction(p, b)!;
  const full = logGrowth(p, b, f0)!;
  for (const c of [0.25, 0.5, 0.75]) {
    const exact = (logGrowth(p, b, f0 * c)! / full) * 100;
    const approx = growthRetainedPct(c)!;
    assert.ok(Math.abs(exact - approx) < 0.5,
      `c=${c}: 이산 ${exact.toFixed(2)}% vs 근사 ${approx}%`);
  }
});

test('전체 켈리는 언젠가 반토막을 50% 확률로 겪는다', () => {
  near(drawdownProbabilityPct(1, 50)!, 50, 1e-9);
  near(drawdownProbabilityPct(1, 25)!, 25, 1e-9, 'c=1이면 α 그대로');
});

test('낙폭 확률은 우위가 아니라 켈리 배수만으로 정해진다', () => {
  near(drawdownProbabilityPct(0.5, 50)!, 12.5, 1e-9, '절반 켈리 → 1/8');
  near(drawdownProbabilityPct(0.25, 50)!, 100 / 128, 1e-9, '1/4 켈리 → 1/128');
  // 배수를 줄이면 급격히 안전해진다
  assert.ok(drawdownProbabilityPct(0.25, 50)! < drawdownProbabilityPct(0.5, 50)! / 10);
});

test('켈리의 2배 이상이면 어떤 낙폭이든 언젠가 닿는다', () => {
  assert.equal(drawdownProbabilityPct(2, 50), 100);
  assert.equal(drawdownProbabilityPct(3, 1), 100, '성장률이 음수라 바닥까지 간다');
});

test('낙폭·유지비율 경계값', () => {
  assert.equal(growthRetainedPct(0), null);
  assert.equal(growthRetainedPct(-1), null);
  assert.equal(drawdownProbabilityPct(1, 0), null);
  assert.equal(drawdownProbabilityPct(1, 100), null, '100%는 낙폭이 아니다');
});

test('분할 배수 목록', () => {
  assert.deepEqual(KELLY_FRACTIONS.map(([, v]) => v), [0.25, 0.5, 0.75, 1, 2]);
  assert.equal(KELLY_FRACTIONS.find(([, v]) => v === 1)![0], 'Full');
});
