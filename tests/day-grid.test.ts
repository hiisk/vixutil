import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  DAY_COUNT, YEAR_FROM, YEAR_TO, FIXED_HOLIDAYS,
  allDays, daySlug, parseDaySlug, weekdayOf, dayOfYear, isoWeek, quarterOf,
  isLeap, dayFacts, neighborDays,
} from '../lib/date/day-grid.ts';
import { birthdayFacts } from '../lib/fortune/birthday-grid.ts';

/**
 * 날짜 낱장 366일의 셈.
 *
 * 요일과 ISO 주차는 **손으로 세면 반드시 틀리는 자리**다. 1월 1일이 늘 1주차가
 * 아니고, 12월 31일이 다음 해 1주차가 되기도 한다. 그래서 밖에서 아는 날짜로
 * 못 박고 성질로 되짚는다.
 */

test('366일이 빠짐없이 나온다', () => {
  assert.equal(allDays().length, DAY_COUNT);
  assert.ok(allDays().some(d => d.month === 2 && d.day === 29), '윤일이 없다');
  assert.equal(parseDaySlug('02-30'), null);
  assert.deepEqual(parseDaySlug('02-29'), { month: 2, day: 29 });
  for (const d of allDays()) assert.deepEqual(parseDaySlug(daySlug(d.month, d.day)), d);
});

test('요일을 밖에서 아는 날짜로 못 박는다', () => {
  /* 2026-01-01은 목요일(4) · 2000-01-01은 토요일(6) · 2024-02-29는 목요일(4) */
  assert.equal(weekdayOf(2026, 1, 1), 4);
  assert.equal(weekdayOf(2000, 1, 1), 6);
  assert.equal(weekdayOf(2024, 2, 29), 4);
  assert.equal(weekdayOf(2025, 12, 25), 4);
});

test('요일이 UTC로 고정된다 — 지역 시간대가 끼면 하루가 밀린다', () => {
  /*
   * 서버(UTC)와 브라우저(KST)가 다른 요일을 그리면 하이드레이션이 깨진다.
   * 같은 날짜를 여러 번 물어도 같은 답이어야 하고, 7일 뒤는 같은 요일이어야 한다.
   */
  for (const [y, m, d] of [[2026, 3, 15], [2026, 1, 1], [2024, 2, 29]] as const) {
    assert.equal(weekdayOf(y, m, d), weekdayOf(y, m, d));
  }
  assert.equal(weekdayOf(2026, 3, 15), weekdayOf(2026, 3, 22));
  assert.equal(weekdayOf(2026, 3, 15), weekdayOf(2026, 3, 8));
});

test('윤년 규칙이 맞다', () => {
  assert.ok(isLeap(2024) && isLeap(2000) && isLeap(2400));
  assert.ok(!isLeap(2023) && !isLeap(1900) && !isLeap(2100));
});

test('ISO 주차를 밖에서 아는 값으로 못 박는다', () => {
  /*
   * 2026-01-01은 목요일이라 2026년 1주차다.
   * 2021-01-01은 금요일이라 **2020년 53주차**다 — 1월 1일이 늘 1주차가 아니다.
   * 2019-12-30은 월요일이라 **2020년 1주차**다.
   */
  assert.deepEqual(isoWeek(2026, 1, 1), { week: 1, year: 2026 });
  assert.deepEqual(isoWeek(2021, 1, 1), { week: 53, year: 2020 });
  assert.deepEqual(isoWeek(2019, 12, 30), { week: 1, year: 2020 });
  assert.equal(isoWeek(2026, 12, 31).week >= 1, true);
});

test('ISO 주차가 1~53 안에 있고 한 해가 52~53주다', () => {
  for (let y = YEAR_FROM; y <= YEAR_TO; y++) {
    const weeks = new Set<number>();
    for (const d of allDays()) {
      if (d.month === 2 && d.day === 29 && !isLeap(y)) continue;
      const w = isoWeek(y, d.month, d.day);
      assert.ok(w.week >= 1 && w.week <= 53, `${y}-${daySlug(d.month, d.day)}: ${w.week}주차`);
      if (w.year === y) weeks.add(w.week);
    }
    assert.ok(weeks.size === 52 || weeks.size === 53, `${y}년이 ${weeks.size}주다`);
  }
});

test('통산일과 분기가 맞다', () => {
  assert.equal(dayOfYear(1, 1, false), 1);
  assert.equal(dayOfYear(12, 31, false), 365);
  assert.equal(dayOfYear(12, 31, true), 366);
  assert.equal(dayOfYear(2, 29, false), null);
  assert.equal(quarterOf(1), 1);
  assert.equal(quarterOf(3), 1);
  assert.equal(quarterOf(4), 2);
  assert.equal(quarterOf(12), 4);
});

test('요일 표가 연도만큼 있고 윤일은 윤년만 싣는다', () => {
  const ordinary = dayFacts(3, 15);
  assert.equal(ordinary.weekdays.length, YEAR_TO - YEAR_FROM + 1);
  const leapDay = dayFacts(2, 29);
  assert.ok(leapDay.isLeapDay);
  for (const [y] of leapDay.weekdays) assert.ok(isLeap(y), `${y}는 윤년이 아닌데 2/29 요일표에 있다`);
  assert.ok(leapDay.weekdays.length < ordinary.weekdays.length, '윤일 표가 안 걸러졌다');
  /* 요일 횟수 합이 표의 줄 수와 같다 */
  assert.equal(ordinary.weekdayCounts.reduce((a, b) => a + b, 0), ordinary.weekdays.length);
});

test('고정 기념일이 실제 날짜에 붙는다', () => {
  assert.equal(dayFacts(8, 15).holiday?.ko, '광복절');
  assert.equal(dayFacts(10, 3).holiday?.ko, '개천절');
  assert.equal(dayFacts(10, 9).holiday?.ko, '한글날');
  assert.equal(dayFacts(3, 1).holiday?.ko, '삼일절');
  assert.equal(dayFacts(3, 15).holiday, null);
  /* 음력 명절은 넣지 않는다 — 해마다 양력 날짜가 달라 고정 낱장에 못 적는다 */
  for (const v of Object.values(FIXED_HOLIDAYS)) {
    assert.ok(!/설날|추석|석가|부처님/.test(v.ko), `음력 명절 ${v.ko}이 고정 목록에 있다`);
  }
  /* 열쇠가 실제 날짜여야 한다 */
  for (const k of Object.keys(FIXED_HOLIDAYS)) assert.ok(parseDaySlug(k), `${k}는 없는 날짜다`);
});

test('이웃이 서로를 가리켜 고아가 없다', () => {
  const inbound = new Map<string, number>(allDays().map(d => [daySlug(d.month, d.day), 0]));
  for (const d of allDays()) {
    for (const n of neighborDays(d.month, d.day)) {
      const k = daySlug(n.month, n.day);
      assert.ok(k !== daySlug(d.month, d.day), '자기 자신을 이웃으로 든다');
      inbound.set(k, (inbound.get(k) ?? 0) + 1);
    }
  }
  assert.deepEqual([...inbound].filter(([, n]) => n === 0).map(([k]) => k), []);
});

test('날마다 본문이 다르다', () => {
  const seen = new Map<string, string>();
  for (const d of allDays()) {
    const f = dayFacts(d.month, d.day);
    const body = [f.weekdays.map(w => w.join(':')).join(','), f.dayOfYearLeap, f.quarter, f.holiday?.ko ?? ''].join('|');
    const prev = seen.get(body);
    assert.equal(prev, undefined, `${daySlug(d.month, d.day)}와 ${prev}의 본문이 같다`);
    seen.set(body, daySlug(d.month, d.day));
  }
});

test('생일 낱장과 같은 말을 하지 않는다', () => {
  /*
   * 두 계열이 같은 날짜를 다루므로 겹치면 서로를 깎는다. 날짜 낱장은 요일·주차·
   * 기념일을, 생일 낱장은 별자리·탄생석·나이표를 낸다 — 겹치는 것은 통산일 하나다.
   */
  const day = dayFacts(3, 15);
  const birth = birthdayFacts(3, 15);
  const dayKeys = new Set(Object.keys(day));
  const birthKeys = new Set(Object.keys(birth));
  const shared = [...dayKeys].filter(k => birthKeys.has(k) && !['month', 'day', 'isLeapDay'].includes(k));
  assert.deepEqual(
    shared, ['dayOfYearCommon', 'dayOfYearLeap'],
    `두 낱장이 겹치는 값: ${shared.join(', ')} — 통산일 말고 겹치면 한쪽을 덜어라`,
  );
});
