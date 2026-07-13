import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcPensionCredit, PENSION_RULES } from '../lib/pension-credit.ts';

const calc = (income: number, savings: number, irp: number, incomeType: 'salary' | 'comprehensive' = 'salary') =>
  calcPensionCredit({ incomeType, income, savings, irp });

test('총급여 5,500만원 이하는 16.5%가 적용된다', () => {
  const r = calc(50_000_000, 6_000_000, 3_000_000);
  assert.equal(r.rate, 0.165);
  assert.equal(r.eligibleTotal, 9_000_000);
  assert.equal(r.credit, 1_485_000); // 900만 × 16.5%
});

test('총급여 5,500만원 초과는 13.2%로 떨어진다', () => {
  const r = calc(60_000_000, 6_000_000, 3_000_000);
  assert.equal(r.rate, 0.132);
  assert.equal(r.credit, 1_188_000); // 900만 × 13.2%
});

test('경계값 5,500만원은 높은 공제율에 포함된다', () => {
  assert.equal(calc(55_000_000, 6_000_000, 3_000_000).rate, 0.165);
  assert.equal(calc(55_000_001, 6_000_000, 3_000_000).rate, 0.132);
});

test('종합소득금액은 4,500만원이 기준이다', () => {
  assert.equal(calc(45_000_000, 6_000_000, 0, 'comprehensive').rate, 0.165);
  assert.equal(calc(45_000_001, 6_000_000, 0, 'comprehensive').rate, 0.132);
  // 같은 금액이라도 근로자(총급여) 기준으로는 아직 높은 공제율이다.
  assert.equal(calc(50_000_000, 6_000_000, 0, 'comprehensive').rate, 0.132);
  assert.equal(calc(50_000_000, 6_000_000, 0, 'salary').rate, 0.165);
});

test('연금저축은 600만원까지만 인정된다', () => {
  const r = calc(50_000_000, 9_000_000, 0);
  assert.equal(r.eligibleSavings, 6_000_000, '연금저축 단독 한도를 넘겨 인정하면 안 된다');
  assert.equal(r.eligibleTotal, 6_000_000);
  assert.equal(r.excess, 3_000_000);
});

test('IRP만으로는 900만원 전액을 채울 수 있다', () => {
  const r = calc(50_000_000, 0, 9_000_000);
  assert.equal(r.eligibleIrp, 9_000_000);
  assert.equal(r.eligibleTotal, 9_000_000);
  assert.equal(r.excess, 0);
});

test('합산 한도 900만원을 넘는 납입은 공제되지 않는다', () => {
  const r = calc(50_000_000, 6_000_000, 6_000_000);
  assert.equal(r.eligibleTotal, 9_000_000);
  assert.equal(r.excess, 3_000_000, '초과 납입 300만원은 공제 대상이 아니다');
  assert.equal(r.eligibleSavings + r.eligibleIrp, r.eligibleTotal);
});

test('남은 여력과 다 채웠을 때의 공제액을 알려준다', () => {
  const r = calc(50_000_000, 3_000_000, 0);
  assert.equal(r.eligibleTotal, 3_000_000);
  assert.equal(r.roomLeft, 6_000_000);
  assert.equal(r.creditIfMaxed, 1_485_000);
  assert.ok(r.creditIfMaxed > r.credit);
});

test('한도를 다 채우면 남은 여력이 0이다', () => {
  assert.equal(calc(50_000_000, 6_000_000, 3_000_000).roomLeft, 0);
});

test('공제 대상 합계는 절대 한도를 넘지 않는다', () => {
  for (const s of [0, 3_000_000, 6_000_000, 12_000_000]) {
    for (const i of [0, 3_000_000, 9_000_000, 20_000_000]) {
      const r = calc(50_000_000, s, i);
      assert.ok(r.eligibleTotal <= PENSION_RULES.totalLimit, `합산 한도 초과: ${r.eligibleTotal}`);
      assert.ok(r.eligibleSavings <= PENSION_RULES.savingsLimit, `연금저축 한도 초과: ${r.eligibleSavings}`);
      assert.equal(r.eligibleSavings + r.eligibleIrp, r.eligibleTotal);
      assert.equal(r.excess, Math.max(0, s + i - r.eligibleTotal));
      assert.ok(r.excess >= 0);
    }
  }
});

test('음수·NaN 입력은 0으로 처리한다', () => {
  const r = calc(-100, -5_000_000, NaN);
  assert.equal(r.eligibleTotal, 0);
  assert.equal(r.credit, 0);
  assert.equal(r.excess, 0);
});

test('납입액이 0이면 공제액도 0이다', () => {
  const r = calc(50_000_000, 0, 0);
  assert.equal(r.credit, 0);
  assert.equal(r.roomLeft, PENSION_RULES.totalLimit);
});
