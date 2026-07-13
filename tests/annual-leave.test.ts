import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcAnnualLeave, LEAVE_RULES } from '../lib/annual-leave.ts';

test('1년 이상 근속하면 기본 15일이다', () => {
  assert.equal(calcAnnualLeave(1).days, 15);
  assert.equal(calcAnnualLeave(2).days, 15, '2년차까지는 가산이 없다');
});

test('3년차부터 2년마다 1일씩 늘어난다', () => {
  // 근로기준법 제60조 제4항 — 최초 1년을 초과하는 매 2년마다 1일 가산
  const expected: Record<number, number> = {
    3: 16, 4: 16,
    5: 17, 6: 17,
    7: 18, 8: 18,
    9: 19, 10: 19,
    11: 20, 12: 20,
  };
  for (const [y, days] of Object.entries(expected)) {
    assert.equal(calcAnnualLeave(Number(y)).days, days, `${y}년차`);
  }
});

test('법정 상한 25일을 넘지 않는다', () => {
  assert.equal(calcAnnualLeave(21).days, 25, '21년차에 25일 도달');
  assert.equal(calcAnnualLeave(30).days, 25);
  assert.equal(calcAnnualLeave(100).days, LEAVE_RULES.cap);
  assert.equal(calcAnnualLeave(21).capped, true);
  assert.equal(calcAnnualLeave(20).capped, false);
});

test('1년 미만은 개근한 달마다 1일, 최대 11일이다', () => {
  assert.equal(calcAnnualLeave(0, 0).days, 0);
  assert.equal(calcAnnualLeave(0, 1).days, 1);
  assert.equal(calcAnnualLeave(0, 6).days, 6);
  assert.equal(calcAnnualLeave(0, 11).days, 11);
  assert.equal(calcAnnualLeave(0, 12).days, 11, '12개월을 개근해도 11일이 상한');
  assert.equal(calcAnnualLeave(0, 99).days, LEAVE_RULES.underOneYearMax);
  assert.equal(calcAnnualLeave(0, 5).underOneYear, true);
});

test('가산 일수를 따로 알려준다', () => {
  assert.equal(calcAnnualLeave(1).bonus, 0);
  assert.equal(calcAnnualLeave(3).bonus, 1);
  assert.equal(calcAnnualLeave(5).bonus, 2);
  assert.equal(calcAnnualLeave(21).bonus, 10);
});

test('다음으로 연차가 늘어나는 해를 알려준다', () => {
  assert.equal(calcAnnualLeave(1).nextIncreaseYear, 3);
  assert.equal(calcAnnualLeave(2).nextIncreaseYear, 3);
  assert.equal(calcAnnualLeave(3).nextIncreaseYear, 5);
  assert.equal(calcAnnualLeave(4).nextIncreaseYear, 5);
  assert.equal(calcAnnualLeave(20).nextIncreaseYear, 21);
  assert.equal(calcAnnualLeave(21).nextIncreaseYear, null, '상한에 도달하면 더 늘지 않는다');
  assert.equal(calcAnnualLeave(0, 3).nextIncreaseYear, 1);
});

test('일수는 절대 감소하지 않는다 (근속이 길수록 같거나 많다)', () => {
  let prev = 0;
  for (let y = 1; y <= 40; y++) {
    const d = calcAnnualLeave(y).days;
    assert.ok(d >= prev, `${y}년차에 일수가 줄었다: ${prev} → ${d}`);
    assert.ok(d >= LEAVE_RULES.base && d <= LEAVE_RULES.cap, `${y}년차 범위 이탈: ${d}`);
    prev = d;
  }
});

test('음수·NaN 입력은 0으로 처리한다', () => {
  assert.equal(calcAnnualLeave(-5).days, 0);
  assert.equal(calcAnnualLeave(NaN).days, 0);
  assert.equal(calcAnnualLeave(0, -3).days, 0);
  assert.equal(calcAnnualLeave(0, NaN).days, 0);
});

test('소수 연차는 내림 처리한다', () => {
  assert.equal(calcAnnualLeave(2.9).days, 15, '2.9년은 아직 2년차');
  assert.equal(calcAnnualLeave(3.1).days, 16);
});
