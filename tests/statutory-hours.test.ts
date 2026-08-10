/**
 * 월 소정근로시간 — 209시간이 어디서 나오는지 되짚는다.
 *
 * 주 단위 시간을 한 해로 펴서 열두 달로 나눈 값이므로, 거꾸로 12를 곱하고
 * 한 해 주수로 나누면 주 단위로 돌아와야 한다. 가산율은 통상시급의 배수라
 * 나눠 보면 정확히 1.5와 2가 나온다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  LEGAL_WEEKLY, NIGHT_RATE, OVERTIME_RATE, WEEKS_PER_MONTH,
  commonWage, monthlyHours, monthlyHoursRounded, weeklyHolidayHours,
} from '../lib/statutory-hours.ts';

test('주 40시간이면 209시간이 나온다', () => {
  // (40 + 8) × 365 ÷ 7 ÷ 12 = 208.57…
  assert.ok(Math.abs(monthlyHours(40) - 208.5714) < 0.001);
  assert.equal(monthlyHoursRounded(40), 209);
  // 널리 쓰이는 다른 값들도 맞는다
  assert.equal(monthlyHoursRounded(20), 105);   // 주 20시간
  assert.equal(monthlyHoursRounded(15), 79);    // 주휴가 붙는 가장 짧은 주
});

test('한 달 평균 주수를 거꾸로 풀면 한 해가 나온다', () => {
  assert.ok(Math.abs(WEEKS_PER_MONTH * 12 * 7 - 365) < 1e-9);
  for (const w of [10, 15, 20, 30, 40]) {
    const back = (monthlyHours(w) * 12) / (365 / 7);
    assert.ok(Math.abs(back - (w + weeklyHolidayHours(w))) < 1e-9, `${w}시간`);
  }
});

test('주휴는 15시간부터 붙고 40시간에서 8시간이 된다', () => {
  assert.equal(weeklyHolidayHours(14.9), 0, '15시간 미만은 주휴가 없다');
  assert.equal(weeklyHolidayHours(15), (15 / 40) * 8);
  assert.equal(weeklyHolidayHours(40), 8);
  // 40시간을 넘겨도 주휴는 8시간에서 멈춘다 — 연장은 주휴를 늘리지 않는다
  assert.equal(weeklyHolidayHours(52), 8);
  assert.equal(weeklyHolidayHours(60), 8);
  // 15시간 경계에서 시간이 한 번에 뛴다 — 그 자리를 못으로 박는다
  assert.ok(monthlyHours(15) - monthlyHours(14.9) > 10);
});

test('통상시급은 월급을 소정근로시간으로 나눈 값이다', () => {
  const w = commonWage(2_090_000, LEGAL_WEEKLY);
  assert.equal(w.hoursRounded, 209);
  assert.ok(Math.abs(w.hourly - 10_000) < 1e-9, '209시간에 209만원이면 시급 1만원이다');
  // 거꾸로 곱하면 월급이 나온다
  assert.ok(Math.abs(w.hourly * w.hoursRounded - 2_090_000) < 1e-6);
});

test('가산율은 통상시급의 배수다', () => {
  const w = commonWage(2_090_000, LEGAL_WEEKLY);
  assert.ok(Math.abs(w.overtime / w.hourly - 1.5) < 1e-12);
  assert.ok(Math.abs(w.night / w.hourly - 1.5) < 1e-12);
  // 연장이면서 야간이면 두 가산이 함께 붙어 두 배다
  assert.ok(Math.abs(w.overtimeNight / w.hourly - 2) < 1e-12);
  assert.ok(Math.abs(w.overtimeNight - w.hourly * (1 + OVERTIME_RATE + NIGHT_RATE)) < 1e-9);
});

test('일하는 시간이 늘면 시급은 준다', () => {
  let prev = Infinity;
  for (const weekly of [15, 20, 30, 40]) {
    const h = commonWage(2_000_000, weekly).hourly;
    assert.ok(h < prev, `주 ${weekly}시간에서 안 줄었다`);
    prev = h;
  }
  // 0시간이면 0으로 나누지 않는다
  assert.equal(commonWage(2_000_000, 0).hourly, 0);
});
