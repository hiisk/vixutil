import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  daysBetween, addDays, addMonths, workdaysBetween, addWorkdays, isoWeek,
  quarter, dayOfYear, isLeapYear, span, formatDuration, weekdayName, toISODate,
} from '../lib/date-calc.ts';

/**
 * 날짜 계산은 손으로 확인하기 어렵다 — 근무일 23일이 맞는지 달력을 세어 봐야
 * 알고, 윤년과 월말이 얽히면 사람도 자주 틀린다. 달력에서 확인한 값으로 고정한다.
 */
const d = (s: string) => new Date(`${s}T00:00:00`);

test('두 날짜 사이의 일수', () => {
  assert.equal(daysBetween(d('2026-01-01'), d('2026-01-31')), 30);
  assert.equal(daysBetween(d('2026-01-31'), d('2026-01-01')), -30, '거꾸로면 음수');
  assert.equal(daysBetween(d('2026-01-01'), d('2026-01-01')), 0);
  // 윤년 2월
  assert.equal(daysBetween(d('2028-02-01'), d('2028-03-01')), 29);
  assert.equal(daysBetween(d('2026-02-01'), d('2026-03-01')), 28);
});

test('개월 더하기는 월말을 넘기지 않는다', () => {
  // 1월 31일 + 1개월은 2월 31일이 없으므로 그 달 마지막 날로
  assert.equal(toISODate(addMonths(d('2026-01-31'), 1)), '2026-02-28');
  assert.equal(toISODate(addMonths(d('2028-01-31'), 1)), '2028-02-29', '윤년이면 29일');
  assert.equal(toISODate(addMonths(d('2026-01-15'), 1)), '2026-02-15');
  assert.equal(toISODate(addMonths(d('2026-03-31'), -1)), '2026-02-28', '거꾸로도 같다');
  assert.equal(toISODate(addMonths(d('2026-12-15'), 1)), '2027-01-15', '해를 넘어간다');
});

test('일 더하기', () => {
  assert.equal(toISODate(addDays(d('2026-12-31'), 1)), '2027-01-01');
  assert.equal(toISODate(addDays(d('2026-01-01'), -1)), '2025-12-31');
});

test('근무일은 주말을 뺀다', () => {
  // 2026-01-05는 월요일, 01-09는 금요일
  assert.equal(workdaysBetween(d('2026-01-05'), d('2026-01-09')), 5, '월~금은 5일');
  assert.equal(workdaysBetween(d('2026-01-05'), d('2026-01-11')), 5, '주말을 포함해도 5일');
  assert.equal(workdaysBetween(d('2026-01-10'), d('2026-01-11')), 0, '토·일만이면 0일');
  assert.equal(workdaysBetween(d('2026-01-05'), d('2026-01-05')), 1, '하루도 양 끝 포함');
});

test('근무일에서 공휴일을 뺀다', () => {
  assert.equal(workdaysBetween(d('2026-01-05'), d('2026-01-09'), ['2026-01-07']), 4);
  // 주말에 걸린 공휴일은 이미 빠져 있으므로 이중으로 빼지 않는다
  assert.equal(workdaysBetween(d('2026-01-05'), d('2026-01-09'), ['2026-01-10']), 5);
});

test('근무일 기준 n일 뒤', () => {
  // 금요일에서 근무일 1일 뒤는 월요일
  assert.equal(toISODate(addWorkdays(d('2026-01-09'), 1)), '2026-01-12');
  assert.equal(toISODate(addWorkdays(d('2026-01-05'), 5)), '2026-01-12', '5근무일 뒤는 다음 주 월요일');
  assert.equal(toISODate(addWorkdays(d('2026-01-12'), -1)), '2026-01-09', '음수는 과거로');
  assert.equal(toISODate(addWorkdays(d('2026-01-09'), 1, ['2026-01-12'])), '2026-01-13', '공휴일도 건너뛴다');
});

test('요일 이름', () => {
  assert.equal(weekdayName(d('2026-01-05')), '월');
  assert.equal(weekdayName(d('2026-01-11')), '일');
});

test('ISO 주차', () => {
  // 2026-01-01은 목요일이라 그 주가 1주차다
  assert.deepEqual(isoWeek(d('2026-01-01')), { year: 2026, week: 1 });
  assert.deepEqual(isoWeek(d('2026-01-05')), { year: 2026, week: 2 });
  // 2027-01-01은 금요일이라 전년도 마지막 주차가 된다
  assert.equal(isoWeek(d('2027-01-01')).year, 2026);
  assert.equal(isoWeek(d('2027-01-01')).week, 53);
});

test('분기와 연중 일수', () => {
  assert.equal(quarter(d('2026-01-15')), 1);
  assert.equal(quarter(d('2026-04-01')), 2);
  assert.equal(quarter(d('2026-12-31')), 4);
  assert.equal(dayOfYear(d('2026-01-01')), 1);
  assert.equal(dayOfYear(d('2026-12-31')), 365);
  assert.equal(dayOfYear(d('2028-12-31')), 366, '윤년은 366일');
});

test('윤년 판정', () => {
  assert.ok(isLeapYear(2028));
  assert.ok(!isLeapYear(2026));
  assert.ok(!isLeapYear(1900), '100으로 나뉘면 윤년이 아니다');
  assert.ok(isLeapYear(2000), '400으로 나뉘면 윤년이다');
});

test('기간을 년·월·일로 푼다', () => {
  const s = span(d('2000-01-15'), d('2026-07-29'));
  assert.equal(s.years, 26);
  assert.equal(s.months, 6);
  assert.equal(s.days, 14);
  // 날짜가 모자라면 앞 달에서 빌려온다
  const borrow = span(d('2026-01-31'), d('2026-03-01'));
  assert.equal(borrow.months, 1);
  assert.equal(borrow.days, 1);
});

test('총 일수·시간은 단위만 다르다', () => {
  const s = span(d('2026-01-01'), d('2026-01-11'));
  assert.equal(s.totalDays, 10);
  assert.equal(s.weeks, 1);
  assert.equal(s.totalHours, 240);
  assert.equal(s.totalMinutes, 14400);
});

test('시간 표기', () => {
  assert.equal(formatDuration(0), '00:00');
  assert.equal(formatDuration(65000), '01:05');
  assert.equal(formatDuration(3661000), '01:01:01', '한 시간이 넘으면 시를 붙인다');
  assert.equal(formatDuration(65430, true), '01:05.43', '100분의 1초까지');
  assert.equal(formatDuration(-500), '00:00', '음수는 0으로');
});
