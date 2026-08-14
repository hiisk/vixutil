import { test } from 'node:test';
import assert from 'node:assert/strict';

import { ZODIAC_SIGNS, ANIMALS } from '../lib/fortune-data.ts';
import {
  DAY_COUNT, AGE_REF_YEAR, allDays, daySlug, parseDaySlug,
  zodiacOf, dayOfYear, animalOf, birthdayFacts, neighborDays, sameZodiacDays,
} from '../lib/fortune/birthday-grid.ts';

/**
 * 생일 낱장 366일의 셈.
 *
 * 날짜 계산은 **눈으로 봐서 맞는지 알 수 없다** — 윤일·월말·해를 넘는 별자리가
 * 겹친다. 그래서 성질로 선다: 366일이 빠짐없이 덮이는가, 별자리 구간이 하루도
 * 안 겹치는가, 윤일이 따로 처리되는가.
 */

test('366일이 빠짐없이 나온다', () => {
  const days = allDays();
  assert.equal(days.length, DAY_COUNT);
  assert.equal(days.length, 366);
  /* 2월이 29일까지다 — 윤일이 빠지면 그 하루가 404가 된다 */
  assert.ok(days.some(d => d.month === 2 && d.day === 29), '2월 29일이 없다');
  assert.ok(!days.some(d => d.month === 2 && d.day === 30), '2월 30일이 있다');
  assert.ok(!days.some(d => d.month === 4 && d.day === 31), '4월 31일이 있다');
  assert.equal(new Set(days.map(d => daySlug(d.month, d.day))).size, 366, '같은 날이 두 번 있다');
});

test('주소 조각과 날짜가 서로의 역이다', () => {
  for (const d of allDays()) {
    const s = daySlug(d.month, d.day);
    assert.match(s, /^\d{2}-\d{2}$/, `${s}가 주소로 못 쓸 꼴이다`);
    assert.deepEqual(parseDaySlug(s), d, `${s}를 되돌리면 다르다`);
  }
});

test('없는 날짜와 이상한 꼴은 거른다', () => {
  for (const bad of ['', '3-15', '03-15-1', '00-01', '13-01', '02-30', '04-31', '06-31', '11-31', 'ab-cd', '0315']) {
    assert.equal(parseDaySlug(bad), null, `"${bad}"가 통과했다`);
  }
  /* 2월 29일은 살아 있어야 한다 */
  assert.deepEqual(parseDaySlug('02-29'), { month: 2, day: 29 });
});

test('별자리가 366일을 빠짐없이 덮고 겹치지 않는다', () => {
  /*
   * 표의 period 문자열에서 계산하므로, 경계를 잘못 읽으면 어떤 날이 두 별자리에
   * 들거나 어디에도 안 든다. 366일을 다 돌려 본다 — zodiacOf는 못 찾으면 던진다.
   */
  const count = new Map<string, number>(ZODIAC_SIGNS.map(s => [s.id, 0]));
  for (const d of allDays()) {
    const z = zodiacOf(d.month, d.day);
    count.set(z.id, count.get(z.id)! + 1);
  }
  const total = [...count.values()].reduce((a, b) => a + b, 0);
  assert.equal(total, 366, '별자리가 덮는 날이 366일이 아니다');
  for (const [id, n] of count) assert.ok(n >= 28, `${id}가 ${n}일뿐이다 — 구간을 잘못 읽었다`);
});

test('별자리 경계를 손으로 못 박는다', () => {
  /* 표 밖에서 아는 값으로 선다 — 함수를 돌려 답을 베끼면 검사가 함수를 따라간다 */
  assert.equal(zodiacOf(3, 21).id, 'aries');
  assert.equal(zodiacOf(3, 20).id, 'pisces');
  assert.equal(zodiacOf(4, 19).id, 'aries');
  assert.equal(zodiacOf(4, 20).id, 'taurus');
  /* 해를 넘기는 염소자리 */
  assert.equal(zodiacOf(12, 22).id, 'capricorn');
  assert.equal(zodiacOf(1, 19).id, 'capricorn');
  assert.equal(zodiacOf(1, 20).id, 'aquarius');
});

test('통산일이 맞고 윤일이 따로 처리된다', () => {
  assert.equal(dayOfYear(1, 1, false), 1);
  assert.equal(dayOfYear(12, 31, false), 365);
  assert.equal(dayOfYear(12, 31, true), 366);
  assert.equal(dayOfYear(3, 1, false), 60);
  assert.equal(dayOfYear(3, 1, true), 61);   // 윤일이 앞에 하나 더 있다
  /* 평년에는 2월 29일이 없다 */
  assert.equal(dayOfYear(2, 29, false), null);
  assert.equal(dayOfYear(2, 29, true), 60);
});

test('윤일 낱장은 윤년 출생연도만 싣는다', () => {
  const f = birthdayFacts(2, 29);
  assert.ok(f.isLeapDay);
  assert.equal(f.dayOfYearCommon, null, '평년 통산일이 있다 — 없는 날이다');
  assert.ok(f.ages.length > 0, '나이표가 비었다');
  for (const a of f.ages) {
    const leap = a.year % 4 === 0 && (a.year % 100 !== 0 || a.year % 400 === 0);
    assert.ok(leap, `${a.year}은 윤년이 아닌데 2월 29일 생일로 실렸다`);
  }
  /* 보통 날은 해마다 다 있다 */
  const ordinary = birthdayFacts(3, 15);
  assert.equal(ordinary.ages.length, 100, '보통 날의 나이표가 100줄이 아니다');
});

test('나이표가 기준연도와 맞물린다', () => {
  const f = birthdayFacts(3, 15);
  assert.equal(f.ages[0].year, AGE_REF_YEAR, '첫 줄이 기준연도가 아니다');
  assert.equal(f.ages[0].age, 0);
  for (const a of f.ages) assert.equal(a.age, AGE_REF_YEAR - a.year, `${a.year}의 나이가 어긋난다`);
});

test('띠가 열두 해로 돌아간다', () => {
  /* 자료의 years 목록과 맞는지 대조한다 — 기준점을 잘못 잡으면 통째로 한 칸 밀린다 */
  for (const a of ANIMALS) {
    for (const y of a.years) {
      assert.equal(animalOf(y).id, a.id, `${y}년이 ${a.name}이 아니라 ${animalOf(y).name}으로 나온다`);
    }
  }
  /* 12년 주기 */
  assert.equal(animalOf(2020).id, animalOf(2032).id);
  assert.equal(animalOf(2020).id, animalOf(2008).id);
});

test('이웃 날짜가 서로를 가리켜 고아가 없다', () => {
  const inbound = new Map<string, number>(allDays().map(d => [daySlug(d.month, d.day), 0]));
  for (const d of allDays()) {
    for (const n of neighborDays(d.month, d.day)) {
      const k = daySlug(n.month, n.day);
      assert.ok(inbound.has(k), `${daySlug(d.month, d.day)}의 이웃 ${k}가 목록 밖이다`);
      assert.ok(k !== daySlug(d.month, d.day), '자기 자신을 이웃으로 든다');
      inbound.set(k, inbound.get(k)! + 1);
    }
  }
  const orphans = [...inbound].filter(([, n]) => n === 0).map(([k]) => k);
  assert.deepEqual(orphans, [], `들어오는 링크가 0인 날 ${orphans.length}개`);
});

test('같은 별자리 링크가 실제로 같은 별자리다', () => {
  for (const [m, d] of [[3, 15], [1, 1], [12, 31], [2, 29]] as const) {
    const id = zodiacOf(m, d).id;
    const same = sameZodiacDays(m, d);
    assert.ok(same.length > 0, `${m}/${d}: 같은 별자리 날이 없다`);
    for (const s of same) {
      assert.equal(zodiacOf(s.month, s.day).id, id, `${m}/${d}의 짝 ${s.month}/${s.day}가 다른 별자리다`);
    }
  }
});

test('날마다 본문이 다르다', () => {
  const seen = new Map<string, string>();
  for (const d of allDays()) {
    const f = birthdayFacts(d.month, d.day);
    const body = [f.zodiac.id, f.birth.stone, f.dayOfYearCommon, f.dayOfYearLeap, f.daysLeft,
      sameZodiacDays(d.month, d.day).map(s => daySlug(s.month, s.day)).join(',')].join('|');
    const prev = seen.get(body);
    assert.equal(prev, undefined, `${daySlug(d.month, d.day)}와 ${prev}의 본문이 같다`);
    seen.set(body, daySlug(d.month, d.day));
  }
});

test('탄생석이 열두 달 다 있다', () => {
  for (const d of allDays()) {
    const f = birthdayFacts(d.month, d.day);
    assert.ok(f.birth?.stone, `${d.month}월 탄생석이 없다`);
    assert.ok(f.birth.flower, `${d.month}월 탄생화가 없다`);
  }
});
