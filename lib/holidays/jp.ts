import type { CountryDef } from './engine.ts';

/**
 * 일본 국민의 축일 (国民の祝日).
 *
 * ── 춘분·추분은 계산이다 ───────────────────────────────────
 * 春分の日·秋分の日은 날짜가 법에 안 적혀 있다. 국립천문대가 태양이 춘분점·
 * 추분점을 지나는 순간을 계산해 전해 2월 관보로 확정한다. 그래서 표가 아니라
 * 계산으로 낸다 — 엔진의 equinox가 일본 표준시(+9) 기준 날짜를 준다.
 *
 * ── 해피 먼데이 ────────────────────────────────────────────
 * 성인의 날·바다의 날·경로의 날·체육의 날 넷은 «해피 먼데이 제도»로 월요일에
 * 붙었다. 각각 2000년·2003년부터라 from으로 가른다. 그 전 날짜는 이 목록에
 * 안 넣는다 — 2000년 이전을 보는 사람은 거의 없고, 넣으면 규칙이 두 배가 된다.
 *
 * ── 대체 휴일 ──────────────────────────────────────────────
 * 일요일과 겹치면 다음 평일이 «振替休日»가 된다. 토요일은 대체가 없다 —
 * 그래서 sundayNext다(미국식 nearest가 아니다).
 *
 * ── 스포츠의 날 ────────────────────────────────────────────
 * 2020·2021년은 올림픽 때문에 날짜가 특별법으로 옮겨졌다. 그 두 해는
 * overrides로 덮어쓴다 — 규칙으로 풀 수 없는 예외다.
 */
export const JP: CountryDef = {
  code: 'jp',
  observance: 'sundayNext',
  tzOffsetHours: 9,
  holidays: [
    { slug: 'ganjitsu', rule: { kind: 'fixed', month: 1, day: 1 } },
    /* 1월 둘째 월요일 — 2000년부터 */
    { slug: 'seijin', rule: { kind: 'nth', month: 1, weekday: 1, n: 2 }, from: 2000 },
    { slug: 'kenkoku', rule: { kind: 'fixed', month: 2, day: 11 } },
    /* 2020년 신설 — 상황 즉위로 천황탄생일이 12/23에서 옮겨 왔다 */
    { slug: 'tenno-tanjobi', rule: { kind: 'fixed', month: 2, day: 23 }, from: 2020 },
    { slug: 'shunbun', rule: { kind: 'equinox', which: 'spring' } },
    { slug: 'showa', rule: { kind: 'fixed', month: 4, day: 29 } },
    { slug: 'kenpo', rule: { kind: 'fixed', month: 5, day: 3 } },
    { slug: 'midori', rule: { kind: 'fixed', month: 5, day: 4 } },
    { slug: 'kodomo', rule: { kind: 'fixed', month: 5, day: 5 } },
    /* 7월 셋째 월요일 — 2003년부터 */
    { slug: 'umi', rule: { kind: 'nth', month: 7, weekday: 1, n: 3 }, from: 2003 },
    /* 2016년 신설 */
    { slug: 'yama', rule: { kind: 'fixed', month: 8, day: 11 }, from: 2016 },
    /* 9월 셋째 월요일 — 2003년부터 */
    { slug: 'keiro', rule: { kind: 'nth', month: 9, weekday: 1, n: 3 }, from: 2003 },
    { slug: 'shubun', rule: { kind: 'equinox', which: 'autumn' } },
    /* 10월 둘째 월요일 — 2000년부터. 2020년에 이름이 体育→スポーツ로 바뀌었다 */
    { slug: 'sports', rule: { kind: 'nth', month: 10, weekday: 1, n: 2 }, from: 2000 },
    { slug: 'bunka', rule: { kind: 'fixed', month: 11, day: 3 } },
    { slug: 'kinro', rule: { kind: 'fixed', month: 11, day: 23 } },
  ],
  overrides: {
    /* 올림픽 특별법 — 규칙으로 풀 수 없다 */
    '2020:umi': '2020-07-23',
    '2020:sports': '2020-07-24',
    '2020:yama': '2020-08-10',
    '2021:umi': '2021-07-22',
    '2021:sports': '2021-07-23',
    '2021:yama': '2021-08-08',
  },
};
