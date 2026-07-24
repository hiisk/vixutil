import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcSimpleVat, INDUSTRY_RATES, EXEMPTION_THRESHOLD, SIMPLE_TAX_CEILING,
} from '../lib/simple-vat.ts';

test('소매업 매출 6천만원의 납부세액', () => {
  // 6천만 × 15% × 10% = 90만원, 매입공제 없음
  const r = calcSimpleVat({ sales: 60_000_000, industryId: 'retail', purchases: 0 });
  assert.equal(r.industry.rate, 0.15);
  assert.equal(r.outputTax, 900_000);
  assert.equal(r.payable, 900_000);
  assert.equal(r.finalPayable, 900_000);
});

test('매입세액공제가 납부세액을 줄인다', () => {
  // 매입 2천만 × 0.5% = 10만원 공제
  const r = calcSimpleVat({ sales: 60_000_000, industryId: 'retail', purchases: 20_000_000 });
  assert.equal(r.purchaseCredit, 100_000);
  assert.equal(r.payable, 800_000);
});

test('업종 부가가치율이 높을수록 세액이 크다', () => {
  const prev = { rate: -1, tax: -1 };
  for (const ind of INDUSTRY_RATES) {
    const r = calcSimpleVat({ sales: 60_000_000, industryId: ind.id, purchases: 0 });
    assert.ok(r.industry.rate >= prev.rate);
    assert.ok(r.outputTax >= prev.tax, `${ind.label}: 세액이 줄었다`);
    prev.rate = r.industry.rate;
    prev.tax = r.outputTax;
  }
});

test('매출 4,800만원 미만은 납부가 면제된다', () => {
  const under = calcSimpleVat({ sales: EXEMPTION_THRESHOLD - 1, industryId: 'retail', purchases: 0 });
  const at = calcSimpleVat({ sales: EXEMPTION_THRESHOLD, industryId: 'retail', purchases: 0 });
  assert.equal(under.exempt, true);
  assert.equal(under.finalPayable, 0);       // 세액이 있어도 안 낸다
  assert.ok(under.payable > 0);              // 계산상 세액 자체는 존재
  assert.equal(at.exempt, false);
});

test('매출 8천만원 이상은 간이과세 대상이 아니라고 알린다', () => {
  const under = calcSimpleVat({ sales: SIMPLE_TAX_CEILING - 1, industryId: 'retail', purchases: 0 });
  const over = calcSimpleVat({ sales: SIMPLE_TAX_CEILING, industryId: 'retail', purchases: 0 });
  assert.equal(under.overCeiling, false);
  assert.equal(over.overCeiling, true);
});

test('매입공제가 매출세액보다 커도 납부세액은 음수가 아니다', () => {
  const r = calcSimpleVat({ sales: 50_000_000, industryId: 'retail', purchases: 9_999_999_999 });
  assert.equal(r.payable, 0);
});

test('알 수 없는 업종은 첫 번째로 폴백한다', () => {
  const r = calcSimpleVat({ sales: 50_000_000, industryId: 'nonexistent', purchases: 0 });
  assert.equal(r.industry.id, INDUSTRY_RATES[0].id);
});

test('0·음수 입력에서 터지지 않는다', () => {
  assert.equal(calcSimpleVat({ sales: 0, industryId: 'retail', purchases: 0 }).payable, 0);
  const neg = calcSimpleVat({ sales: -100, industryId: 'retail', purchases: -50 });
  assert.ok(Number.isFinite(neg.payable));
  assert.equal(neg.payable, 0);
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  const a = calcSimpleVat({ sales: 70_000_000, industryId: 'service', purchases: 10_000_000 });
  const b = calcSimpleVat({ sales: 70_000_000, industryId: 'service', purchases: 10_000_000 });
  assert.deepEqual(a, b);
});
