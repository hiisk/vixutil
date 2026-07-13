import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareRefinance, monthlyPayment } from '../lib/refinance.ts';

const base = {
  balance: 100_000_000,
  currentRate: 5,
  currentMonths: 120,
  newRate: 4,
  newMonths: 120,
  prepaymentFee: 0,
  setupCost: 0,
};

test('원리금균등 월 납입액이 정확하다', () => {
  // 1억, 연 5%, 10년(120개월) → 약 1,060,655원 (표준 원리금균등 공식)
  const p = monthlyPayment(100_000_000, 5, 120);
  assert.ok(Math.abs(p - 1_060_655) < 5, `예상 1,060,655 ≈ 실제 ${Math.round(p)}`);
});

test('무이자면 원금을 기간으로 나눈 값이다', () => {
  assert.equal(monthlyPayment(1_200_000, 0, 12), 100_000);
});

test('금리가 낮아지면 월 납입액과 총이자가 준다', () => {
  const r = compareRefinance(base);
  assert.ok(r.newPayment < r.currentPayment, '월 납입액이 줄어야 한다');
  assert.ok(r.interestSaved > 0, '이자가 절감돼야 한다');
  assert.ok(r.worthIt, '비용이 없으면 당연히 이득');
});

test('비용이 절감액보다 크면 갈아타면 손해다', () => {
  const r = compareRefinance({ ...base, prepaymentFee: 50_000_000, setupCost: 0 });
  assert.ok(r.interestSaved > 0, '이자 자체는 절감된다');
  assert.ok(r.netBenefit < 0, '비용을 반영하면 손해여야 한다');
  assert.equal(r.worthIt, false);
});

test('순이익 = 이자 절감액 - 초기 비용', () => {
  const r = compareRefinance({ ...base, prepaymentFee: 1_200_000, setupCost: 300_000 });
  assert.equal(r.upfrontCost, 1_500_000);
  assert.equal(r.netBenefit, r.interestSaved - r.upfrontCost);
});

test('손익분기점: 초기 비용을 월 절감액으로 나눈 개월 수', () => {
  const r = compareRefinance({ ...base, prepaymentFee: 1_000_000, setupCost: 0 });
  const monthlySaving = r.currentPayment - r.newPayment;
  assert.ok(monthlySaving > 0);
  assert.equal(r.breakEvenMonths, Math.ceil(1_000_000 / monthlySaving));
});

test('비용이 없으면 손익분기점은 0개월이다', () => {
  assert.equal(compareRefinance(base).breakEvenMonths, 0);
});

test('월 납입액이 줄지 않으면 손익분기점이 없다', () => {
  // 기간을 줄이면 월 납입액은 오히려 커진다 — 회수한다는 개념이 성립하지 않는다.
  const r = compareRefinance({ ...base, newMonths: 60 });
  assert.ok(r.newPayment > r.currentPayment, '기간이 짧아지면 월 납입액이 커진다');
  assert.equal(r.breakEvenMonths, null);
  assert.ok(r.interestSaved > 0, '그래도 총이자는 줄어든다 — 이게 핵심 함정이다');
});

test('기간을 늘리면 월 납입액은 줄지만 총이자는 늘 수 있다', () => {
  // 금리를 조금 낮추면서 기간을 크게 늘리는 갈아타기의 함정.
  const r = compareRefinance({ ...base, newRate: 4.9, newMonths: 240 });
  assert.ok(r.newPayment < r.currentPayment, '월 부담은 줄어 보인다');
  assert.ok(r.interestSaved < 0, '하지만 총이자는 오히려 늘어난다');
  assert.equal(r.worthIt, false);
});

test('금리가 같고 조건이 같으면 이득이 없다', () => {
  const r = compareRefinance({ ...base, newRate: 5 });
  assert.equal(r.paymentDiff, 0);
  assert.ok(Math.abs(r.interestSaved) < 2, '반올림 오차 범위');
});

test('0·음수 입력에서 터지지 않는다', () => {
  const r = compareRefinance({
    balance: 0, currentRate: -1, currentMonths: 0,
    newRate: NaN, newMonths: -5, prepaymentFee: -100, setupCost: NaN,
  });
  assert.equal(r.currentPayment, 0);
  assert.equal(r.newPayment, 0);
  assert.equal(r.upfrontCost, 0);
});
