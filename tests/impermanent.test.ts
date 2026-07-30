import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  impermanentLoss, weightedImpermanentLoss, poolPosition,
  breakevenFeePct, breakevenDailyVolume,
  PRICE_SCENARIOS, POOL_FEE_TIERS, IL_LANDMARKS,
} from '../lib/impermanent.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

test('가격이 그대로면 손실이 없다', () => {
  near(impermanentLoss(1)!, 0, 1e-12);
});

test('알려진 값과 맞는다', () => {
  // 2배 → 2√2/3 − 1
  near(impermanentLoss(2)!, (2 * Math.SQRT2 / 3 - 1) * 100, 1e-12);
  near(impermanentLoss(2)!, -5.719095841793644, 1e-9, '널리 인용되는 −5.72%');
  // 4배 → 2·2/5 − 1 = 정확히 −20%
  near(impermanentLoss(4)!, -20, 1e-12);
  // 5배 → 2√5/6 − 1
  near(impermanentLoss(5)!, (2 * Math.sqrt(5) / 6 - 1) * 100, 1e-12);
  near(impermanentLoss(5)!, -25.4644, 1e-4, '널리 인용되는 −25.5%');
  // 1.25배 → 널리 인용되는 −0.6%
  near(impermanentLoss(1.25)!, -0.6192, 1e-4);
});

test('오르든 내리든 언제나 손해다 — 이 페이지의 요점', () => {
  for (const r of [0.1, 0.25, 0.5, 0.9, 1.1, 2, 4, 10]) {
    assert.ok(impermanentLoss(r)! < 0, `${r}배에서 손실이어야 한다`);
  }
});

test('r과 1/r은 같은 손실을 준다 — 대칭이다', () => {
  for (const r of [2, 3, 5, 10]) {
    near(impermanentLoss(r)!, impermanentLoss(1 / r)!, 1e-9, `${r}배와 1/${r}배`);
  }
});

test('가격이 더 벌어질수록 손실이 커진다', () => {
  const up = [1.25, 1.5, 2, 3, 5, 10].map(r => impermanentLoss(r)!);
  for (let i = 1; i < up.length; i++) {
    assert.ok(up[i] < up[i - 1], `${i}번째가 더 나빠야 한다`);
  }
});

test('가중치 50:50이면 기본 식과 같아진다', () => {
  for (const r of [0.5, 1, 2, 5]) {
    near(weightedImpermanentLoss(r, 0.5)!, impermanentLoss(r)!, 1e-9, `r=${r}`);
  }
});

test('가중치가 치우칠수록 손실이 작다 — 80/20 풀의 근거', () => {
  const balanced = weightedImpermanentLoss(4, 0.5)!;
  const skewed = weightedImpermanentLoss(4, 0.8)!;
  assert.ok(skewed > balanced, `80/20 ${skewed.toFixed(2)}% > 50/50 ${balanced.toFixed(2)}%`);
  assert.ok(skewed < 0, '그래도 손실이다');
});

test('풀 포지션 — 가격이 그대로면 보유와 같다', () => {
  const p = poolPosition(10_000, 1, 0)!;
  near(p.holdValue, 10_000, 1e-9);
  near(p.poolValue, 10_000, 1e-9);
  near(p.vsHold, 0, 1e-9);
});

test('풀 포지션 — 2배에서 보유가 이긴다', () => {
  const p = poolPosition(10_000, 2, 0)!;
  near(p.holdValue, 15_000, 1e-9, '(1+2)/2 = 1.5배');
  near(p.poolValue, 10_000 * Math.SQRT2, 1e-9, '√2배');
  assert.ok(p.vsHold < 0);
  near(p.vsHoldPct, impermanentLoss(2)!, 1e-9, 'IL과 같아야 한다');
});

test('수수료가 충분하면 보유를 이긴다', () => {
  const be = breakevenFeePct(2)!;              // 2배에서 필요한 수수료(%)
  const under = poolPosition(10_000, 2, be - 1)!;
  const over = poolPosition(10_000, 2, be + 1)!;
  assert.ok(under.vsHold < 0, '모자라면 진다');
  assert.ok(over.vsHold > 0, '넘으면 이긴다');
  const exact = poolPosition(10_000, 2, be)!;
  near(exact.vsHold, 0, 1e-6, '정확히 손익분기');
});

test('출금 수량은 오른 쪽이 줄고 내린 쪽이 는다', () => {
  const p = poolPosition(10_000, 4, 0)!;
  // A가 4배 올랐으면 A 수량은 1/2배, B는 2배
  near(p.qtyA, 5_000 / 2, 1e-9);
  near(p.qtyB, 5_000 * 2, 1e-9);
});

test('손익분기 수수료는 IL의 크기와 대응한다', () => {
  // 손익분기 수수료(예치금 대비) = hold − pool
  for (const r of [0.5, 2, 4]) {
    const be = breakevenFeePct(r)!;
    const p = poolPosition(100, r, be)!;
    near(p.netValue, p.holdValue, 1e-9, `r=${r}`);
  }
});

test('손익분기 거래량 — 수수료율이 낮을수록 더 많은 거래가 필요하다', () => {
  const lo = breakevenDailyVolume(2, 0.05, 30)!;
  const hi = breakevenDailyVolume(2, 0.3, 30)!;
  assert.ok(lo > hi, `0.05% 풀이 0.3% 풀보다 많은 거래량을 요구한다 (${lo.toFixed(1)} vs ${hi.toFixed(1)})`);
  // 0.3% 풀, 30일, 2배 변동 → be 5.72% / (0.3 × 30) = 0.635배/일
  near(hi, breakevenFeePct(2)! / (0.3 * 30), 1e-9);
});

test('기간이 길수록 하루치 요구 거래량은 준다', () => {
  assert.ok(breakevenDailyVolume(2, 0.3, 90)! < breakevenDailyVolume(2, 0.3, 30)!);
});

test('가격이 안 변하면 필요한 거래량이 0이다', () => {
  near(breakevenDailyVolume(1, 0.3, 30)!, 0, 1e-12);
});

test('경계값', () => {
  assert.equal(impermanentLoss(0), null);
  assert.equal(impermanentLoss(-1), null);
  assert.equal(impermanentLoss(NaN), null);
  assert.equal(weightedImpermanentLoss(2, 0), null);
  assert.equal(weightedImpermanentLoss(2, 1), null);
  assert.equal(poolPosition(0, 2), null);
  assert.equal(poolPosition(100, 0), null);
  assert.equal(poolPosition(100, 2, -1), null, '음수 수수료는 없다');
  assert.equal(breakevenDailyVolume(2, 0, 30), null);
  assert.equal(breakevenDailyVolume(2, 0.3, 0), null);
});

test('상수 목록', () => {
  assert.ok(PRICE_SCENARIOS.includes(1), '변동 없음 기준선이 있어야 한다');
  assert.deepEqual(POOL_FEE_TIERS, [0.01, 0.05, 0.3, 1]);
  assert.equal(IL_LANDMARKS.length, 6);
  assert.deepEqual(IL_LANDMARKS.map(([, v]) => v), [1.25, 1.5, 2, 3, 5, 10]);
});
