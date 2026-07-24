import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcRentalIncomeTax } from '../lib/rental-income-tax.ts';

test('미등록·연 1,200만원 수입의 분리과세', () => {
  // 필요경비 50% = 600만, 공제 200만 → 과세표준 400만
  // 소득세 400만×14% = 56만, 지방세 5.6만 → 총 61.6만
  const r = calcRentalIncomeTax({ annualRent: 12_000_000, registered: false, otherIncome: 0 });
  assert.equal(r.necessaryExpense, 6_000_000);
  assert.equal(r.deduction, 2_000_000);
  assert.equal(r.taxBase, 4_000_000);
  assert.equal(r.incomeTax, 560_000);
  assert.equal(r.localTax, 56_000);
  assert.equal(r.totalTax, 616_000);
});

test('등록임대사업자는 경비율·공제가 더 크다', () => {
  // 필요경비 60% = 720만, 공제 400만 → 과세표준 80만
  // 소득세 80만×14% = 11.2만 → 11.2만 절사 후 112,000
  const r = calcRentalIncomeTax({ annualRent: 12_000_000, registered: true, otherIncome: 0 });
  assert.equal(r.expenseRate, 0.6);
  assert.equal(r.necessaryExpense, 7_200_000);
  assert.equal(r.deduction, 4_000_000);
  assert.equal(r.taxBase, 800_000);
  assert.equal(r.incomeTax, 112_000);
});

test('등록이 미등록보다 세금이 적다', () => {
  const reg = calcRentalIncomeTax({ annualRent: 15_000_000, registered: true, otherIncome: 0 });
  const unreg = calcRentalIncomeTax({ annualRent: 15_000_000, registered: false, otherIncome: 0 });
  assert.ok(reg.totalTax < unreg.totalTax);
});

test('종합소득이 2천만원 초과면 기본공제가 사라진다', () => {
  const withDed = calcRentalIncomeTax({ annualRent: 12_000_000, registered: false, otherIncome: 20_000_000 });
  const noDed = calcRentalIncomeTax({ annualRent: 12_000_000, registered: false, otherIncome: 20_000_001 });
  assert.equal(withDed.deduction, 2_000_000);
  assert.equal(withDed.deductionApplied, true);
  assert.equal(noDed.deduction, 0);
  assert.equal(noDed.deductionApplied, false);
  assert.ok(noDed.totalTax > withDed.totalTax);
});

test('연 수입 2천만원 초과는 분리과세 대상이 아니라고 알린다', () => {
  const under = calcRentalIncomeTax({ annualRent: 20_000_000, registered: false, otherIncome: 0 });
  const over = calcRentalIncomeTax({ annualRent: 20_000_001, registered: false, otherIncome: 0 });
  assert.equal(under.overThreshold, false);
  assert.equal(over.overThreshold, true);
});

test('과세표준은 음수가 되지 않는다', () => {
  // 소액 수입이면 경비+공제가 수입을 넘어 과세표준이 0이어야 한다.
  const r = calcRentalIncomeTax({ annualRent: 3_000_000, registered: false, otherIncome: 0 });
  assert.equal(r.taxBase, 0);
  assert.equal(r.totalTax, 0);
});

test('지방소득세는 소득세의 10%다', () => {
  const r = calcRentalIncomeTax({ annualRent: 18_000_000, registered: false, otherIncome: 0 });
  assert.equal(r.localTax, Math.floor(r.incomeTax * 0.1));
  assert.equal(r.totalTax, r.incomeTax + r.localTax);
});

test('실효세율은 0~수입 범위 안이다', () => {
  for (const rent of [5_000_000, 12_000_000, 20_000_000]) {
    for (const reg of [true, false]) {
      const r = calcRentalIncomeTax({ annualRent: rent, registered: reg, otherIncome: 0 });
      assert.ok(r.effectiveRate >= 0 && r.effectiveRate < 100);
      assert.ok(r.totalTax >= 0 && r.totalTax < rent);
    }
  }
});

test('0·음수 입력에서 터지지 않는다', () => {
  assert.equal(calcRentalIncomeTax({ annualRent: 0, registered: false, otherIncome: 0 }).totalTax, 0);
  const neg = calcRentalIncomeTax({ annualRent: -1000, registered: true, otherIncome: -5 });
  assert.ok(Number.isFinite(neg.totalTax));
  assert.equal(neg.totalTax, 0);
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  const a = calcRentalIncomeTax({ annualRent: 14_400_000, registered: true, otherIncome: 10_000_000 });
  const b = calcRentalIncomeTax({ annualRent: 14_400_000, registered: true, otherIncome: 10_000_000 });
  assert.deepEqual(a, b);
});
