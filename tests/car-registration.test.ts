import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcRegistration, CAR_TYPES, LIGHT_CAR_EXEMPTION,
  type RegistrationInput,
} from '../lib/car-registration.ts';

const base: RegistrationInput = {
  price: 30_000_000,
  carType: 'passenger',
  bondRate: 0,
  bondDiscountRate: 0,
  etcFee: 0,
};

test('승용차 취득세는 차값의 7%다', () => {
  const r = calcRegistration(base);
  assert.equal(r.acquisitionTaxBefore, 2_100_000);
  assert.equal(r.exemption, 0);
  assert.equal(r.acquisitionTax, 2_100_000);
});

test('승합·화물차는 5%다', () => {
  for (const carType of ['van', 'truck'] as const) {
    const r = calcRegistration({ ...base, carType });
    assert.equal(r.acquisitionTax, 1_500_000, carType);
  }
});

test('경차는 4%를 매기고 감면 한도까지 면제한다', () => {
  // 2,000만원 경차: 4% = 80만원, 감면 한도 75만원을 빼면 5만원만 낸다
  const r = calcRegistration({ ...base, price: 20_000_000, carType: 'light' });
  assert.equal(r.acquisitionTaxBefore, 800_000);
  assert.equal(r.exemption, LIGHT_CAR_EXEMPTION);
  assert.equal(r.acquisitionTax, 50_000);
});

test('경차 세액이 감면 한도보다 작으면 전액 면제된다', () => {
  // 1,000만원 경차: 4% = 40만원 < 감면 한도 75만원 → 0원
  const r = calcRegistration({ ...base, price: 10_000_000, carType: 'light' });
  assert.equal(r.acquisitionTax, 0);
  assert.equal(r.exemption, 400_000, '실제 세액만큼만 감면해야 한다');
  assert.ok(r.acquisitionTax >= 0, '감면이 세액보다 커서 음수가 되면 안 된다');
});

test('공채는 매입액이 아니라 매도 손실만 비용으로 잡는다', () => {
  // 공채 매입 12% = 360만원, 즉시 매도 시 8% 손실 → 실제 비용 28.8만원
  const r = calcRegistration({ ...base, bondRate: 12, bondDiscountRate: 8 });
  assert.equal(r.bondPurchase, 3_600_000);
  assert.equal(r.bondCost, 288_000);
  // 부대비용에는 매입액 전체가 아니라 손실만 들어간다
  assert.equal(r.extraTotal, r.acquisitionTax + 288_000);
});

test('공채를 끝까지 보유하면(할인율 0) 비용이 0이다', () => {
  const r = calcRegistration({ ...base, bondRate: 12, bondDiscountRate: 0 });
  assert.equal(r.bondPurchase, 3_600_000);
  assert.equal(r.bondCost, 0);
});

test('공채 할인율은 0~100%로 묶인다', () => {
  const over = calcRegistration({ ...base, bondRate: 10, bondDiscountRate: 150 });
  assert.equal(over.bondCost, over.bondPurchase, '100%를 넘으면 매입액을 초과할 수 없다');
  const under = calcRegistration({ ...base, bondRate: 10, bondDiscountRate: -50 });
  assert.equal(under.bondCost, 0, '음수는 0으로 본다');
});

test('총액은 차값과 부대비용의 합이다', () => {
  const r = calcRegistration({ ...base, bondRate: 12, bondDiscountRate: 8, etcFee: 150_000 });
  assert.equal(r.grandTotal, base.price + r.extraTotal);
  assert.equal(r.extraTotal, r.acquisitionTax + r.bondCost + r.etcFee);
});

test('부대비용 비율을 차값 대비로 낸다', () => {
  const r = calcRegistration(base);
  // 취득세만 있으면 7%
  assert.ok(Math.abs(r.extraRate - 7) < 0.001, `${r.extraRate}`);
});

test('차값이 0이면 나눗셈이 터지지 않는다', () => {
  const r = calcRegistration({ ...base, price: 0 });
  assert.equal(r.extraRate, 0);
  assert.ok(Number.isFinite(r.extraRate));
  assert.equal(r.grandTotal, 0);
});

test('음수 입력은 0으로 처리한다', () => {
  const r = calcRegistration({ ...base, price: -1_000_000, etcFee: -50_000 });
  assert.equal(r.acquisitionTax, 0);
  assert.equal(r.etcFee, 0);
  assert.ok(r.grandTotal >= 0);
});

test('모든 차종에 라벨과 세율이 있다', () => {
  for (const t of CAR_TYPES) {
    assert.ok(t.label.trim(), `${t.id} 라벨 없음`);
    assert.ok(t.rate > 0 && t.rate < 1, `${t.id} 세율 이상: ${t.rate}`);
  }
  const ids = CAR_TYPES.map(t => t.id);
  assert.equal(new Set(ids).size, ids.length, '차종 id 중복');
});
