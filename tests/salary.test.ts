import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcSalary, annualForNetMonthly, earningDeduction } from '../lib/salary.ts';

test('연봉이 오르면 실수령액도 오른다 (단조증가)', () => {
  // 누진세 구간을 넘어도 실수령액 자체가 줄어들면 안 된다.
  // 역산이 이분 탐색을 쓸 수 있는 근거이기도 하다.
  let prev = -1;
  for (let annual = 12_000_000; annual <= 300_000_000; annual += 1_000_000) {
    const net = calcSalary(annual, 1, true).netMonthly;
    assert.ok(net > prev, `연봉 ${annual}에서 실수령액이 줄었다: ${prev} → ${net}`);
    prev = net;
  }
});

test('공제 합계가 항목의 합과 같다', () => {
  const r = calcSalary(50_000_000, 1, true);
  assert.equal(r.totalInsurance, r.pension + r.health + r.longCare + r.employment);
  assert.equal(r.totalTax, r.incomeTax + r.localTax);
  assert.equal(r.totalDeduction, r.totalInsurance + r.totalTax);
  assert.equal(r.netMonthly, r.monthly - r.totalDeduction);
});

test('국민연금은 기준소득월액 상한(617만원)에서 멈춘다', () => {
  const cap = Math.round(6_170_000 * 0.045);
  assert.equal(calcSalary(500_000_000, 1, true).pension, cap, '고연봉에서도 상한이 적용돼야 한다');
  assert.ok(calcSalary(36_000_000, 1, true).pension < cap, '상한 미만은 소득 비례');
});

test('지방소득세는 소득세의 10%다', () => {
  for (const annual of [30_000_000, 60_000_000, 120_000_000]) {
    const r = calcSalary(annual, 1, true);
    assert.equal(r.localTax, Math.round(r.incomeTax * 0.1));
  }
});

test('식대 비과세를 적용하면 세금이 줄어든다', () => {
  const withMeal = calcSalary(50_000_000, 1, true);
  const without = calcSalary(50_000_000, 1, false);
  assert.ok(withMeal.incomeTax < without.incomeTax, '식대 비과세가 과세표준을 낮춰야 한다');
  assert.ok(withMeal.netMonthly > without.netMonthly);
});

test('부양가족이 늘면 세금이 줄어든다', () => {
  const one = calcSalary(60_000_000, 1, true);
  const three = calcSalary(60_000_000, 3, true);
  assert.ok(three.incomeTax < one.incomeTax, '부양가족 공제가 반영돼야 한다');
});

test('역산: 목표 실수령액을 만족하는 최소 연봉을 찾는다', () => {
  for (const target of [2_000_000, 3_000_000, 4_500_000, 8_000_000]) {
    const found = annualForNetMonthly(target, 1, true);
    assert.ok(found, `${target}원에 대한 연봉을 못 찾았다`);

    // 찾은 연봉은 목표를 만족해야 하고
    assert.ok(found.result.netMonthly >= target,
      `목표 미달: ${found.result.netMonthly} < ${target}`);

    // 1원이라도 낮추면 목표에 못 미쳐야 한다 (최소값이라는 뜻)
    const lower = calcSalary(found.annual - 1, 1, true);
    assert.ok(lower.netMonthly < target,
      `최소 연봉이 아니다 — ${found.annual - 1}원으로도 목표를 만족한다`);
  }
});

test('역산과 정산은 서로 역함수다', () => {
  for (const annual of [30_000_000, 55_000_000, 90_000_000]) {
    const net = calcSalary(annual, 1, true).netMonthly;
    const back = annualForNetMonthly(net, 1, true)!;
    // 실수령액이 원 단위로 계단식이라 정확히 같은 연봉이 아닐 수 있다.
    // 다만 그 연봉의 실수령액은 같아야 한다.
    assert.equal(back.result.netMonthly, net, `${annual} → ${net} → ${back.annual}`);
    assert.ok(back.annual <= annual, '역산은 같은 실수령액을 내는 최소 연봉이어야 한다');
  }
});

test('역산: 도달 불가능한 목표는 null을 낸다', () => {
  assert.equal(annualForNetMonthly(1_000_000_000, 1, true), null, '월 10억은 불가능하다');
  assert.equal(annualForNetMonthly(0, 1, true), null);
  assert.equal(annualForNetMonthly(-100, 1, true), null);
  assert.equal(annualForNetMonthly(NaN, 1, true), null);
});

test('근로소득공제는 구간 경계에서 이어진다', () => {
  // 구간이 꺾이는 지점에서 값이 튀면 실수령액이 불연속이 된다.
  for (const edge of [500, 1500, 4500, 10000]) {
    const before = earningDeduction(edge - 0.01);
    const after = earningDeduction(edge + 0.01);
    assert.ok(Math.abs(after - before) < 1, `${edge}만원 경계에서 ${before} → ${after}로 튄다`);
  }
});
