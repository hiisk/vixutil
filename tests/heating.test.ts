/**
 * 지역난방 요금 — 셈을 다른 길로 되짚는다.
 *
 * 누진이 없으므로 관계가 단순하고, 그래서 오히려 관계로 확인할 수 있다.
 * 열량을 두 배로 하면 사용요금만 두 배가 되고 기본요금은 그대로여야 한다 —
 * 두 요금을 뒤섞어 셈하면 여기서 갈린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PYEONG, VAT_RATE, afterSaving, calcHeating } from '../lib/heating.ts';

const base = { area: 84, basicRate: 52.4, mcal: 700, usageRate: 90, days: 31 };

test('손으로 센 값과 맞는다', () => {
  const b = calcHeating(base);
  assert.ok(Math.abs(b.basicFee - 84 * 52.4) < 1e-9);
  assert.ok(Math.abs(b.usageFee - 700 * 90) < 1e-9);
  assert.ok(Math.abs(b.subtotal - (b.basicFee + b.usageFee)) < 1e-9);
  assert.ok(Math.abs(b.vat - b.subtotal * VAT_RATE) < 1e-9);
  assert.ok(Math.abs(b.total - b.subtotal * 1.1) < 1e-9);
});

test('열량을 두 배로 하면 사용요금만 두 배다', () => {
  const a = calcHeating(base);
  const b = calcHeating({ ...base, mcal: base.mcal * 2 });
  assert.ok(Math.abs(b.usageFee - a.usageFee * 2) < 1e-9, '사용요금이 두 배가 아니다');
  assert.ok(Math.abs(b.basicFee - a.basicFee) < 1e-9, '기본요금이 따라 움직였다');
  assert.ok(b.total < a.total * 2, '기본요금까지 두 배가 됐다');
});

test('면적을 두 배로 하면 기본요금만 두 배다', () => {
  const a = calcHeating(base);
  const b = calcHeating({ ...base, area: base.area * 2 });
  assert.ok(Math.abs(b.basicFee - a.basicFee * 2) < 1e-9);
  assert.ok(Math.abs(b.usageFee - a.usageFee) < 1e-9, '사용요금이 면적을 따라갔다');
});

test('열량이 0이어도 기본요금은 남는다', () => {
  /*
   * "난방을 아예 껐는데 왜 돈이 나오나"의 답이다. 기본요금은 면적에 붙으므로
   * 사용량과 무관하다. 이 성질이 깨지면 절약 계산이 통째로 틀린다.
   */
  const b = calcHeating({ ...base, mcal: 0 });
  assert.equal(b.usageFee, 0);
  assert.ok(b.basicFee > 0);
  assert.ok(Math.abs(b.total - b.basicFee * 1.1) < 1e-9);
});

test('평당과 ㎡당은 평 환산만큼 차이 난다', () => {
  const b = calcHeating(base);
  assert.ok(Math.abs(b.perSquareMetre - b.total / base.area) < 1e-9);
  assert.ok(Math.abs(b.perPyeong - b.perSquareMetre * PYEONG) < 1e-6, '평 환산이 어긋난다');
  // 평이 ㎡보다 넓으므로 평당 금액이 더 크다
  assert.ok(b.perPyeong > b.perSquareMetre);
  assert.ok(Math.abs(PYEONG - 3.305785) < 1e-6);
});

test('하루 평균은 일수로 나눈 값이다', () => {
  const b = calcHeating(base);
  assert.ok(Math.abs(b.perDay * base.days - b.total) < 1e-6);
  // 0으로 나누지 않는다
  assert.equal(calcHeating({ ...base, days: 0 }).perDay, 0);
  assert.equal(calcHeating({ ...base, area: 0 }).perSquareMetre, 0);
  assert.equal(calcHeating({ ...base, area: 0 }).perPyeong, 0);
});

test('절반만 써도 요금이 절반이 되지는 않는다', () => {
  const full = calcHeating(base);
  const half = afterSaving(base, 0.5);
  assert.ok(Math.abs(half.usageFee - full.usageFee / 2) < 1e-9, '사용요금이 절반이 아니다');
  assert.ok(half.total > full.total / 2, '기본요금이 남지 않았다');
  // 줄어든 금액은 사용요금 절반에 부가세를 얹은 값이다
  const saved = full.total - half.total;
  assert.ok(Math.abs(saved - (full.usageFee / 2) * 1.1) < 1e-6);

  // 아예 안 써도 기본요금은 남는다
  const none = afterSaving(base, 1);
  assert.equal(none.usageFee, 0);
  assert.ok(Math.abs(none.total - full.basicFee * 1.1) < 1e-9);
});
