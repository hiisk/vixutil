import { test } from 'node:test';
import assert from 'node:assert/strict';
import { easter, equinox, holidaysOf, nthWeekday, type CountryDef } from '../lib/holidays/engine.ts';

/**
 * 공휴일 엔진.
 *
 * 날짜는 «그럴듯해 보인다»로 확인할 수 없다. 세상에 알려진 값에 못을 박는다 —
 * 부활절은 교회력 표가 있고, 미국 추수감사절은 11월 넷째 목요일이며, 일본
 * 춘분의 날은 관보로 확정된다.
 */

const iso = (d: Date) => d.toISOString().slice(0, 10);

test('부활절이 알려진 해와 맞는다', () => {
  /* 서방 교회 부활절 — 널리 인용되는 값들 */
  const KNOWN: [number, string][] = [
    [2024, '2024-03-31'], [2025, '2025-04-20'], [2026, '2026-04-05'],
    [2027, '2027-03-28'], [2028, '2028-04-16'], [2030, '2030-04-21'],
    [2000, '2000-04-23'], [1999, '1999-04-04'],
  ];
  for (const [y, want] of KNOWN) assert.equal(iso(easter(y)), want, `${y}년 부활절`);
});

test('부활절은 늘 일요일이고 3월 22일~4월 25일 사이다', () => {
  for (let y = 1900; y <= 2100; y++) {
    const e = easter(y);
    assert.equal(e.getUTCDay(), 0, `${y}년 부활절이 일요일이 아니다`);
    const md = iso(e).slice(5);
    assert.ok(md >= '03-22' && md <= '04-25', `${y}년 부활절이 ${md}이다`);
  }
});

test('n번째 요일 — 앞에서도 뒤에서도 센다', () => {
  /* 2026년 11월 넷째 목요일 = 추수감사절 11월 26일 */
  assert.equal(iso(nthWeekday(2026, 11, 4, 4)), '2026-11-26');
  /* 2026년 5월 마지막 월요일 = 메모리얼 데이 5월 25일 */
  assert.equal(iso(nthWeekday(2026, 5, 1, -1)), '2026-05-25');
  /* 2026년 1월 셋째 월요일 = 마틴 루서 킹 데이 1월 19일 */
  assert.equal(iso(nthWeekday(2026, 1, 1, 3)), '2026-01-19');
  /* 달의 1일이 그 요일인 경우 — 2026년 2월 1일은 일요일 */
  assert.equal(iso(nthWeekday(2026, 2, 0, 1)), '2026-02-01');
});

test('일본 춘분·추분이 관보와 맞는다', () => {
  /* 일본 국립천문대가 확정해 관보에 실은 값 */
  const SPRING: [number, string][] = [
    [2024, '2024-03-20'], [2025, '2025-03-20'], [2026, '2026-03-20'], [2027, '2027-03-21'],
  ];
  const AUTUMN: [number, string][] = [
    [2024, '2024-09-22'], [2025, '2025-09-23'], [2026, '2026-09-23'], [2027, '2027-09-23'],
  ];
  for (const [y, want] of SPRING) assert.equal(iso(equinox(y, 'spring')), want, `${y} 춘분`);
  for (const [y, want] of AUTUMN) assert.equal(iso(equinox(y, 'autumn')), want, `${y} 추분`);
});

test('주말과 겹칠 때의 처리가 나라마다 다르다', () => {
  const fixedJul4: CountryDef = {
    code: 'x', observance: 'nearest',
    holidays: [{ slug: 'a', rule: { kind: 'fixed', month: 7, day: 4 } }],
  };
  /* 2026-07-04는 토요일 → 미국식은 금요일로 당긴다 */
  assert.equal(holidaysOf(fixedJul4, 2026)[0].observed, '2026-07-03');
  assert.equal(holidaysOf(fixedJul4, 2026)[0].date, '2026-07-04');
  assert.equal(holidaysOf(fixedJul4, 2026)[0].moved, true);

  /* 영국식은 다음 평일로 민다 → 월요일 */
  const gb = { ...fixedJul4, observance: 'next' as const };
  assert.equal(holidaysOf(gb, 2026)[0].observed, '2026-07-06');

  /* 독일식은 그냥 사라진다 — 날짜가 그대로다 */
  const de = { ...fixedJul4, observance: 'none' as const };
  assert.equal(holidaysOf(de, 2026)[0].observed, '2026-07-04');
  assert.equal(holidaysOf(de, 2026)[0].moved, false);
});

test('영국식 대체는 이미 찬 날을 건너뛴다', () => {
  /* 크리스마스와 박싱데이가 토·일이면 월·화로 밀린다 — 둘이 같은 날에 겹치면 안 된다 */
  const gb: CountryDef = {
    code: 'gb', observance: 'next',
    holidays: [
      { slug: 'christmas', rule: { kind: 'fixed', month: 12, day: 25 } },
      { slug: 'boxing', rule: { kind: 'fixed', month: 12, day: 26 } },
    ],
  };
  /* 2027-12-25는 토, 26은 일 */
  const h = holidaysOf(gb, 2027);
  assert.equal(h.find(x => x.slug === 'christmas')!.observed, '2027-12-27');
  assert.equal(h.find(x => x.slug === 'boxing')!.observed, '2027-12-28');
  assert.equal(new Set(h.map(x => x.observed)).size, 2, '두 공휴일이 같은 날에 겹쳤다');
});

test('생긴 해·없어진 해를 지킨다', () => {
  const c: CountryDef = {
    code: 'x', observance: 'none',
    holidays: [
      { slug: 'new', rule: { kind: 'fixed', month: 6, day: 19 }, from: 2021 },
      { slug: 'old', rule: { kind: 'fixed', month: 5, day: 1 }, until: 2020 },
    ],
  };
  assert.deepEqual(holidaysOf(c, 2020).map(h => h.slug), ['old']);
  assert.deepEqual(holidaysOf(c, 2021).map(h => h.slug), ['new']);
});

test('손으로 덮어쓴 날이 계산을 이긴다', () => {
  const c: CountryDef = {
    code: 'jp', observance: 'none', tzOffsetHours: 9,
    holidays: [{ slug: 'shunbun', rule: { kind: 'equinox', which: 'spring' } }],
    overrides: { '2026:shunbun': '2026-03-21' },
  };
  assert.equal(holidaysOf(c, 2026)[0].date, '2026-03-21');
});

test('날짜순으로 나온다', () => {
  const c: CountryDef = {
    code: 'x', observance: 'none',
    holidays: [
      { slug: 'dec', rule: { kind: 'fixed', month: 12, day: 25 } },
      { slug: 'jan', rule: { kind: 'fixed', month: 1, day: 1 } },
      { slug: 'jul', rule: { kind: 'fixed', month: 7, day: 4 } },
    ],
  };
  assert.deepEqual(holidaysOf(c, 2026).map(h => h.slug), ['jan', 'jul', 'dec']);
});

test('이 검사가 실제로 문다', () => {
  /* 부활절을 하루 밀면 알려진 값과 달라야 한다 */
  const e = easter(2026);
  assert.notEqual(iso(new Date(e.getTime() + 86400000)), '2026-04-05');
  /* 춘분이 상수를 내지 않는지 — 해마다 달라야 한다 */
  const springs = new Set([2024, 2025, 2026, 2027].map(y => iso(equinox(y, 'spring'))));
  assert.ok(springs.size >= 2, '춘분이 모든 해에 같은 날이라고 나온다');
});
