import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcInterestTax, calcDepositAfterTax, WITHHOLDING_RATE, COMPREHENSIVE_THRESHOLD,
} from '../lib/interest-tax.ts';

test('이자 100만원의 세금은 15.4만원이다', () => {
  const r = calcInterestTax(1_000_000);
  assert.equal(r.incomeTax, 140_000);   // 14%
  assert.equal(r.localTax, 14_000);     // 1.4%
  assert.equal(r.totalTax, 154_000);
  assert.equal(r.netInterest, 846_000);
});

test('원천징수율은 15.4%다', () => {
  assert.ok(Math.abs(WITHHOLDING_RATE - 0.154) < 1e-9);
});

test('세후 실수령 + 세금 = 세전 이자', () => {
  for (const gross of [50_000, 1_000_000, 19_999_999, 30_000_000]) {
    const r = calcInterestTax(gross);
    assert.equal(r.netInterest + r.totalTax, gross);
  }
});

test('2천만원 초과면 종합과세 대상으로 표시한다', () => {
  assert.equal(calcInterestTax(COMPREHENSIVE_THRESHOLD).overThreshold, false);
  assert.equal(calcInterestTax(COMPREHENSIVE_THRESHOLD + 1).overThreshold, true);
});

test('예금 세후 이자를 원금·이율·기간으로 계산한다', () => {
  // 1,000만원 × 4% × 1년 = 40만원 세전, 세금 6.16만원 → 세후 33.84만원
  const r = calcDepositAfterTax({ principal: 10_000_000, annualRate: 4, months: 12 });
  assert.equal(r.grossInterest, 400_000);
  assert.equal(r.totalTax, 61_600);
  assert.equal(r.netInterest, 338_400);
  assert.equal(r.principal, 10_000_000);
});

test('예치 기간이 짧으면 이자가 비례해 준다', () => {
  const full = calcDepositAfterTax({ principal: 10_000_000, annualRate: 4, months: 12 });
  const half = calcDepositAfterTax({ principal: 10_000_000, annualRate: 4, months: 6 });
  assert.ok(Math.abs(half.grossInterest - full.grossInterest / 2) < 1e-9);
});

test('0·음수 입력에서 터지지 않는다', () => {
  assert.equal(calcInterestTax(0).totalTax, 0);
  assert.equal(calcInterestTax(-100).totalTax, 0);
  assert.equal(calcDepositAfterTax({ principal: -100, annualRate: -4, months: -12 }).grossInterest, 0);
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  assert.deepEqual(calcInterestTax(1_234_567), calcInterestTax(1_234_567));
});
