import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aprToApy, apyToApr, computeCompound, aprApyGapPp, COMPOUND_FREQ } from '../lib/compound.ts';

const near = (a: number, b: number, eps = 1e-9, msg?: string) =>
  assert.ok(Math.abs(a - b) < eps, msg ?? `${a} ≈ ${b} 이어야 한다`);

test('APR → APY, 알려진 값', () => {
  // 12% APR 월복리 = 12.6825% APY (교과서 값)
  near(aprToApy(12, 12)!, 12.682503013196977, 1e-9);
  // 연 1회 복리면 APR = APY
  near(aprToApy(12, 1)!, 12, 1e-12);
  // 일복리는 연속복리에 가까워진다: e^0.12 − 1 = 12.7497%
  const daily = aprToApy(12, 365)!;
  near(daily, 12.747456, 1e-4);
  assert.ok(daily < (Math.exp(0.12) - 1) * 100, '연속복리를 넘지는 않는다');
});

test('복리가 잦을수록 APY가 커진다 (단조)', () => {
  let prev = -Infinity;
  for (const n of [1, 4, 12, 52, 365]) {
    const apy = aprToApy(20, n)!;
    assert.ok(apy > prev, `n=${n}에서 단조 증가해야 한다`);
    prev = apy;
  }
});

test('APR ↔ APY 왕복 변환', () => {
  for (const n of [1, 4, 12, 52, 365]) {
    for (const apr of [1, 5, 12, 50, 200]) {
      const apy = aprToApy(apr, n)!;
      near(apyToApr(apy, n)!, apr, 1e-9, `APR ${apr}% n=${n}`);
    }
  }
});

test('0%는 어느 쪽으로도 0%다', () => {
  near(aprToApy(0, 12)!, 0, 1e-12);
  near(apyToApr(0, 12)!, 0, 1e-12);
});

test('APR을 APY로 착각하면 생기는 오차', () => {
  // 이 페이지가 교정하려는 지점
  near(aprApyGapPp(12, 12)!, 0.682503013196977, 1e-9);
  near(aprApyGapPp(12, 1)!, 0, 1e-12, '연 1회면 차이가 없다');
  // 이율이 클수록 오차가 커진다
  assert.ok(aprApyGapPp(100, 365)! > aprApyGapPp(10, 365)!);
});

test('변환 잘못된 입력', () => {
  assert.equal(aprToApy(12, 0), null, '복리 횟수 1 미만');
  assert.equal(aprToApy(NaN, 12), null);
  assert.equal(aprToApy(-200, 1), null, '−100% 미만은 성립하지 않는다');
  assert.equal(apyToApr(-150, 12), null);
});

const base = { principal: 1000, ratePct: 12, rateKind: 'apr' as const, perYear: 12, years: 1 };

test('원금만 있을 때 최종 잔액 = 원금 × (1 + APY)', () => {
  const r = computeCompound(base)!;
  const apy = aprToApy(12, 12)!;
  near(r.finalBalance, 1000 * (1 + apy / 100), 1e-9);
  near(r.totalContributed, 1000, 1e-12);
  near(r.interestEarned, r.finalBalance - 1000, 1e-12);
  near(r.effectiveApyPct, apy, 1e-9);
});

test('APY로 입력해도 같은 상품이면 결과가 같다', () => {
  const asApr = computeCompound(base)!;
  const apy = aprToApy(12, 12)!;
  const asApy = computeCompound({ ...base, ratePct: apy, rateKind: 'apy' })!;
  near(asApy.finalBalance, asApr.finalBalance, 1e-9, '표기만 다른 같은 상품');
  near(asApy.aprPct, 12, 1e-9, 'APR로 되돌린다');
});

test('추가 납입은 매 복리 시점 말에 들어간다', () => {
  // 이자 0%면 최종 잔액 = 원금 + 납입 합
  const r = computeCompound({ ...base, ratePct: 0, contribution: 100 })!;
  near(r.finalBalance, 1000 + 100 * 12, 1e-9);
  near(r.totalContributed, 1000 + 100 * 12, 1e-9);
  near(r.interestEarned, 0, 1e-9);
});

test('추가 납입이 있으면 이자가 늘어난다', () => {
  const without = computeCompound(base)!;
  const with_ = computeCompound({ ...base, contribution: 100 })!;
  assert.ok(with_.interestEarned > without.interestEarned);
  assert.ok(with_.finalBalance > without.finalBalance);
});

test('본전 하락률은 수익률과 대칭이 아니다 — 이 페이지의 요점', () => {
  // 50% 늘었으면 33.3% 빠지면 본전이다 (50%가 아니다)
  const r = computeCompound({ principal: 100, ratePct: 50, rateKind: 'apy', perYear: 1, years: 1 })!;
  near(r.totalReturnPct, 50, 1e-9);
  near(r.breakevenDropPct, 100 * (1 - 1 / 1.5), 1e-9);
  near(r.breakevenDropPct, 33.333333333333336, 1e-9);
  assert.ok(r.breakevenDropPct < r.totalReturnPct, '항상 수익률보다 작다');
});

test('본전 하락률을 적용하면 정확히 원금이 된다', () => {
  for (const rate of [5, 12, 50, 120]) {
    const r = computeCompound({ principal: 1000, ratePct: rate, rateKind: 'apy', perYear: 1, years: 2 })!;
    const after = r.finalBalance * (1 - r.breakevenDropPct / 100);
    near(after, r.totalContributed, 1e-6, `이율 ${rate}%`);
  }
});

test('기간이 길면 잔액이 커진다', () => {
  const one = computeCompound({ ...base, years: 1 })!;
  const three = computeCompound({ ...base, years: 3 })!;
  assert.ok(three.finalBalance > one.finalBalance);
  near(three.effectiveApyPct, one.effectiveApyPct, 1e-12, 'APY는 기간과 무관하다');
});

test('음수 이율도 계산된다 (수수료가 이자를 넘는 경우)', () => {
  const r = computeCompound({ ...base, ratePct: -6 })!;
  assert.ok(r.finalBalance < 1000);
  assert.ok(r.interestEarned < 0);
  assert.ok(r.breakevenDropPct < 0, '이미 손실이면 본전에 상승이 필요하다');
});

test('잘못된 입력은 null', () => {
  assert.equal(computeCompound({ ...base, principal: -1 }), null);
  assert.equal(computeCompound({ ...base, principal: 0, contribution: 0 }), null, '넣는 돈이 없다');
  assert.equal(computeCompound({ ...base, years: 0 }), null);
  assert.equal(computeCompound({ ...base, perYear: 0 }), null);
  assert.equal(computeCompound({ ...base, contribution: -50 }), null);
  assert.equal(computeCompound({ ...base, ratePct: NaN }), null);
});

test('원금 0 + 납입만으로도 계산된다', () => {
  const r = computeCompound({ ...base, principal: 0, contribution: 100 })!;
  assert.ok(r.finalBalance > 0);
  near(r.totalContributed, 1200, 1e-9);
});

test('복리 주기 선택지가 연간 횟수와 맞는다', () => {
  const m = new Map(COMPOUND_FREQ);
  assert.equal(m.get('Daily'), 365);
  assert.equal(m.get('Weekly'), 52);
  assert.equal(m.get('Monthly'), 12);
  assert.equal(m.get('Quarterly'), 4);
  assert.equal(m.get('Annually'), 1);
});
