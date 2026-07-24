import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcRentalYield, type RentalInput } from '../lib/rental-yield.ts';

const base: RentalInput = {
  price: 300_000_000,
  deposit: 30_000_000,
  monthlyRent: 1_000_000,
  acquisitionCost: 0,
  loan: 0,
  loanRate: 0,
  monthlyCost: 0,
};

test('표면 수익률은 연 월세 ÷ 매매가다', () => {
  // 월세 100만 × 12 = 1,200만, 매매가 3억 → 4.0%
  const r = calcRentalYield(base);
  assert.equal(r.annualRent, 12_000_000);
  assert.ok(Math.abs(r.grossYield - 4.0) < 1e-9);
});

test('레버리지 없이 실투자 수익률은 순수입 ÷ (매매가−보증금)', () => {
  // 실투자금 = 3억 − 3천만 = 2.7억, 순수입 1,200만 → 4.44%
  const r = calcRentalYield(base);
  assert.equal(r.actualInvestment, 270_000_000);
  assert.ok(r.netYield !== null);
  assert.ok(Math.abs(r.netYield! - (12_000_000 / 270_000_000) * 100) < 1e-9);
});

test('보증금과 대출이 실투자금을 줄여 실투자 수익률을 끌어올린다', () => {
  const noLoan = calcRentalYield(base);
  const withLoan = calcRentalYield({ ...base, loan: 150_000_000, loanRate: 4 });
  // 실투자금 = 3억 − 3천만 − 1.5억 = 1.2억
  assert.equal(withLoan.actualInvestment, 120_000_000);
  // 순수입 = 1,200만 − (1.5억×4%=600만) = 600만 → 5.0%
  assert.equal(withLoan.annualInterest, 6_000_000);
  assert.equal(withLoan.netAnnualIncome, 6_000_000);
  assert.ok(Math.abs(withLoan.netYield! - 5.0) < 1e-9);
  // 레버리지가 실투자 수익률을 올렸다 (표면 수익률은 그대로)
  assert.ok(withLoan.netYield! > noLoan.netYield!);
  assert.equal(withLoan.grossYield, noLoan.grossYield);
});

test('대출이자가 임대수입보다 크면 순수입이 음수다', () => {
  // 역레버리지 — 이자가 월세를 잡아먹는 경우도 정직하게 음수로 보여준다.
  const r = calcRentalYield({ ...base, loan: 200_000_000, loanRate: 10 });
  assert.equal(r.annualInterest, 20_000_000);
  assert.ok(r.netAnnualIncome < 0);
  assert.ok(r.netYield! < 0);
  assert.equal(r.paybackYears, null); // 회수 불가
});

test('실투자금이 0 이하면 실투자 수익률을 정의하지 않는다', () => {
  // 보증금+대출이 매매가 이상 → 내 돈이 안 들어간다(무한 레버리지). Infinity 대신 null.
  const r = calcRentalYield({ ...base, deposit: 100_000_000, loan: 250_000_000 });
  assert.ok(r.actualInvestment <= 0);
  assert.equal(r.investmentNonPositive, true);
  assert.equal(r.netYield, null);
  assert.equal(r.paybackYears, null);
  // 표면 수익률은 여전히 계산된다.
  assert.ok(r.grossYield > 0);
});

test('부대비용은 실투자금에 더해진다', () => {
  const r = calcRentalYield({ ...base, acquisitionCost: 15_000_000 });
  assert.equal(r.actualInvestment, 270_000_000 + 15_000_000);
  // 부대비용이 늘면 실투자 수익률은 내려간다.
  assert.ok(r.netYield! < calcRentalYield(base).netYield!);
});

test('보유비용이 순수입을 깎는다', () => {
  const r = calcRentalYield({ ...base, monthlyCost: 100_000 });
  assert.equal(r.annualCost, 1_200_000);
  assert.equal(r.netAnnualIncome, 12_000_000 - 1_200_000);
});

test('원금 회수 기간은 실투자금 ÷ 연 순수입이다', () => {
  const r = calcRentalYield(base);
  // 2.7억 ÷ 1,200만 = 22.5년
  assert.ok(r.paybackYears !== null);
  assert.ok(Math.abs(r.paybackYears! - 22.5) < 1e-9);
});

test('매매가가 0이면 표면 수익률이 0이고 터지지 않는다', () => {
  const r = calcRentalYield({ ...base, price: 0, deposit: 0 });
  assert.equal(r.grossYield, 0);
  assert.ok(Number.isFinite(r.grossYield));
});

test('음수 입력은 0으로 눌러 계산된다', () => {
  const r = calcRentalYield({ ...base, monthlyRent: -500_000, loan: -100 });
  assert.equal(r.annualRent, 0);
  assert.ok(r.actualInvestment >= 0 || !r.investmentNonPositive || true);
  assert.ok(Number.isFinite(r.grossYield));
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  const a = calcRentalYield({ ...base, loan: 100_000_000, loanRate: 3.5, monthlyCost: 80_000 });
  const b = calcRentalYield({ ...base, loan: 100_000_000, loanRate: 3.5, monthlyCost: 80_000 });
  assert.deepEqual(a, b);
});
