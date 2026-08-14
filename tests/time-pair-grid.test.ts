import { test } from 'node:test';
import assert from 'node:assert/strict';

import { LANG_CODES } from '../lib/i18n/lang.ts';
import { TIME_CITIES, timeCity } from '../lib/time/cities8.ts';
import { gapMinutes, timeFacts } from '../lib/time/facts.ts';
import { PAIR_UI } from '../lib/time/pair-ui.ts';
import {
  PAIR_YEAR, VS,
  representativeCities, allCityPairs, pairSlug, parsePairSlug, pairFacts, neighborPairs,
} from '../lib/time/pair-grid.ts';

const city = (slug: string) => {
  const c = timeCity(slug);
  assert.ok(c, `${slug}가 도시 표에 없다`);
  return c!;
};

/**
 * 도시 쌍 시차 낱장의 셈.
 *
 * 시차는 **눈으로 봐서 맞는지 알 수 없다**. 서머타임이 한쪽에만 있으면 시차가
 * 해마다 두 번 바뀌고, 인도는 30분·네팔은 45분 단위라 정시끼리 대응하지 않는다.
 * 그래서 밖에서 아는 값으로 못 박고 나머지는 성질로 선다.
 */

test('대표 도시가 나라마다 하나씩이다', () => {
  const reps = representativeCities();
  const countries = new Set(TIME_CITIES.map(c => c.country));
  assert.equal(reps.length, countries.size, '대표 수가 나라 수와 다르다');
  assert.equal(new Set(reps.map(c => c.country)).size, reps.length, '한 나라에 대표가 둘이다');
  /* 표에서 앞에 있는 도시가 대표다 */
  assert.equal(reps.find(c => c.country === 'kr')!.slug, 'seoul');
  assert.equal(reps.find(c => c.country === 'jp')!.slug, 'tokyo');
  assert.equal(reps.find(c => c.country === 'us')!.slug, 'new-york');
});

test('쌍 목록에 한쪽은 반드시 대표 도시가 있다', () => {
  const reps = new Set(representativeCities().map(c => c.slug));
  const pairs = allCityPairs();
  assert.ok(pairs.length > 5000, `쌍이 ${pairs.length}개뿐이다`);
  for (const p of pairs) {
    assert.ok(reps.has(p.a.slug) || reps.has(p.b.slug),
      `${pairSlug(p.a, p.b)}에 대표 도시가 없다`);
    assert.notEqual(p.a.slug, p.b.slug, '같은 도시끼리 쌍이 됐다');
  }
});

test('주소가 한 쌍에 하나뿐이다 — 뒤집힌 것은 안 받는다', () => {
  /* 순서를 안 고정하면 같은 쌍이 두 주소가 되고 정경로가 갈라진다 */
  const seoul = city('seoul'), ny = city('new-york');
  assert.equal(pairSlug(seoul, ny), pairSlug(ny, seoul));
  const s = pairSlug(seoul, ny);
  assert.ok(parsePairSlug(s), `${s}를 못 읽는다`);
  const flipped = `${s.split(VS)[1]}${VS}${s.split(VS)[0]}`;
  assert.equal(parsePairSlug(flipped), null, `뒤집힌 주소 ${flipped}가 통과했다`);

  const slugs = allCityPairs().map(p => pairSlug(p.a, p.b));
  assert.equal(new Set(slugs).size, slugs.length, '같은 주소가 두 번 있다');
});

test('주소 조각과 값이 서로의 역이다', () => {
  for (const p of allCityPairs()) {
    const s = pairSlug(p.a, p.b);
    const back = parsePairSlug(s);
    assert.ok(back, `${s}를 못 읽는다`);
    assert.equal(pairSlug(back!.a, back!.b), s);
  }
});

test('이름에 하이픈이 있는 도시가 안 깨진다', () => {
  /* new-york·ho-chi-minh·los-angeles는 slug 안에 하이픈이 있다 */
  for (const [x, y] of [['new-york', 'tokyo'], ['los-angeles', 'seoul'], ['ho-chi-minh', 'paris'],
    ['new-york', 'los-angeles'], ['sao-paulo', 'cape-town']] as const) {
    const s = pairSlug(city(x), city(y));
    const back = parsePairSlug(s);
    assert.ok(back, `${s}를 못 읽는다`);
    assert.deepEqual([back!.a.slug, back!.b.slug].sort(), [x, y].sort());
  }
});

test('목록 밖과 이상한 꼴은 거른다', () => {
  for (const bad of ['', 'seoul', 'seoul-vs-', '-vs-tokyo', 'seoul-vs-seoul',
    'seoul-vs-nowhere', 'nowhere-vs-tokyo', 'seoul-vs-tokyo-vs-paris',
    'busan-vs-daegu', 'incheon-vs-busan']) {
    assert.equal(parsePairSlug(bad), null, `"${bad}"가 통과했다`);
  }
  /* 대표 도시가 한쪽에 있으면 통과한다 */
  assert.ok(parsePairSlug(pairSlug(city('seoul'), city('busan'))));
});

test('시차를 밖에서 아는 값으로 못 박는다', () => {
  /*
   * 서울 +9(서머타임 없음) · 뉴욕 −5/−4 · 런던 0/+1 · 도쿄 +9 · 델리 +5:30.
   * 겨울과 여름 값을 둘 다 본다 — 한쪽만 맞으면 서머타임 처리가 틀린 것이다.
   */
  const seoulNy = pairFacts(city('seoul'), city('new-york'));
  /* 주소 순서가 사전순이라 어느 쪽이 a인지 정해져 있지 않다 — 부호를 맞춘다 */
  const sign = seoulNy.a.slug === 'seoul' ? 1 : -1;
  assert.equal(seoulNy.winterMinutes * sign, 14 * 60, '서울–뉴욕 겨울 시차가 14시간이 아니다');
  assert.equal(seoulNy.summerMinutes * sign, 13 * 60, '서울–뉴욕 여름 시차가 13시간이 아니다');
  assert.ok(seoulNy.shifts && seoulNy.shiftBy === 60);

  const seoulTokyo = pairFacts(city('seoul'), city('tokyo'));
  assert.equal(seoulTokyo.winterMinutes, 0, '서울–도쿄에 시차가 있다');
  assert.equal(seoulTokyo.aAhead, null);
  assert.ok(!seoulTokyo.shifts, '서울–도쿄 시차가 계절에 따라 바뀐다');

  const seoulDelhi = pairFacts(city('seoul'), city('delhi'));
  const ds = seoulDelhi.a.slug === 'seoul' ? 1 : -1;
  assert.equal(seoulDelhi.winterMinutes * ds, 3 * 60 + 30, '서울–델리가 3시간 30분이 아니다');
});

test('서머타임이 한쪽만 있을 때만 시차가 바뀐다', () => {
  for (const p of allCityPairs()) {
    const f = pairFacts(p.a, p.b);
    const oneSide = f.aDst !== f.bDst;
    if (!oneSide && f.shifts) {
      /* 둘 다 쓰는데 바뀔 수 있다 — 남반구와 북반구는 시기가 반대다 */
      assert.ok(f.aDst && f.bDst, `${f.slug}: 둘 다 서머타임이 아닌데 시차가 바뀐다`);
    }
    if (oneSide) assert.ok(f.shifts, `${f.slug}: 한쪽만 서머타임인데 시차가 안 바뀐다`);
  }
});

test('시차가 도시 낱장의 계산과 같다', () => {
  /* 격자가 제 식을 새로 쓰면 여기서 갈린다 */
  for (const p of allCityPairs().slice(0, 300)) {
    const f = pairFacts(p.a, p.b);
    assert.equal(f.winterMinutes, gapMinutes(p.a, p.b, new Date(Date.UTC(PAIR_YEAR, 0, 15))));
    assert.equal(f.aDst, timeFacts(p.a, PAIR_YEAR).dst);
    assert.equal(f.bDst, timeFacts(p.b, PAIR_YEAR).dst);
  }
});

test('24시간 표가 24줄이고 날짜 넘김이 맞다', () => {
  for (const p of allCityPairs().slice(0, 200)) {
    const f = pairFacts(p.a, p.b);
    assert.equal(f.clock.length, 24);
    for (const c of f.clock) {
      assert.ok(c.aHour >= 0 && c.aHour < 24, `a시각 ${c.aHour}`);
      assert.ok(c.bHour >= 0 && c.bHour < 24, `${f.slug}: b시각 ${c.bHour}`);
      assert.ok(c.bMinute >= 0 && c.bMinute < 60, `${f.slug}: b분 ${c.bMinute}`);
      assert.ok(Math.abs(c.dayDelta) <= 1, `${f.slug}: 날짜가 ${c.dayDelta}일 넘어간다`);
      /* 표가 실제 시차와 맞는지 되짚는다 */
      const back = c.bHour * 60 + c.bMinute + c.dayDelta * 1440;
      assert.equal(back, c.aHour * 60 - f.winterMinutes, `${f.slug}: ${c.aHour}시 줄이 시차와 안 맞는다`);
    }
    assert.equal(new Set(f.clock.map(c => c.aHour)).size, 24, '같은 시각이 두 줄 있다');
  }
});

test('30분 시간대가 표에서 안 뭉개진다', () => {
  /* 서울–델리는 3:30 차이라 정시 대응이 아니다 — 시만 적으면 30분 틀린다 */
  const f = pairFacts(city('seoul'), city('delhi'));
  assert.ok(f.clock.some(c => c.bMinute === 30), '분이 전부 0이다 — 30분 시간대를 잃었다');
});

test('겹치는 업무시간이 실제로 양쪽 다 업무시간이다', () => {
  for (const p of allCityPairs().slice(0, 300)) {
    const f = pairFacts(p.a, p.b);
    for (const h of f.overlap) {
      const row = f.clock.find(c => c.aHour === h)!;
      assert.ok(h >= 9 && h < 18, `${f.slug}: a의 ${h}시는 업무시간이 아니다`);
      assert.ok(row.bHour >= 9 && row.bHour < 18, `${f.slug}: b의 ${row.bHour}시는 업무시간이 아니다`);
    }
    /* 시차가 0이면 아홉 시간이 통째로 겹친다 */
    if (f.winterMinutes === 0) assert.equal(f.overlap.length, 9, `${f.slug}: 시차 0인데 ${f.overlap.length}시간만 겹친다`);
  }
});

test('이웃 쌍이 목록 안이고 자기 자신이 아니다', () => {
  for (const [x, y] of [['seoul', 'new-york'], ['london', 'tokyo'], ['sydney', 'paris']] as const) {
    const ns = neighborPairs(city(x), city(y));
    assert.equal(ns.length, 8);
    const self = pairSlug(city(x), city(y));
    for (const n of ns) {
      const k = pairSlug(n.a, n.b);
      assert.notEqual(k, self, '자기 자신을 이웃으로 든다');
      assert.ok(parsePairSlug(k), `이웃 ${k}가 목록 밖이다`);
    }
    assert.equal(new Set(ns.map(n => pairSlug(n.a, n.b))).size, 8, '같은 이웃이 두 번 있다');
  }
});

test('이웃이 목록을 한 바퀴 감아 고아가 없다', () => {
  /* 앞에서 N개만 뽑으면 목록 뒤쪽이 통째로 고아가 된다 — 끝에서 처음으로 감기는지 본다 */
  const pairs = allCityPairs();
  const last = pairs[pairs.length - 1];
  const ns = neighborPairs(last.a, last.b).map(n => pairSlug(n.a, n.b));
  assert.ok(ns.includes(pairSlug(pairs[0].a, pairs[0].b)), '마지막 쌍이 처음으로 안 감긴다');
});

test('열 언어의 문구가 서로 다르다 — 폴백으로 영어가 새지 않는다', () => {
  const a = city('seoul'), b = city('new-york');
  const titles = LANG_CODES.map(l => PAIR_UI[l].title(a.name[l], b.name[l]));
  assert.equal(new Set(titles).size, LANG_CODES.length,
    `제목이 ${new Set(titles).size}가지뿐이다 — 어느 언어가 다른 언어를 그대로 쓴다`);
  for (const l of LANG_CODES) {
    const px = PAIR_UI[l];
    const f = pairFacts(a, b);
    const faq = px.faq(a.name[l], b.name[l], px.dur(14, 0), px.dur(13, 0), f.shifts, f.overlap.length);
    assert.equal(faq.length, 3, `${l}: FAQ가 셋이 아니다`);
    for (const q of faq) {
      assert.ok(q.q.length > 5 && q.a.length > 20, `${l}: FAQ가 비었다`);
      assert.ok(!/undefined/.test(q.q + q.a), `${l}: FAQ에 undefined가 있다`);
    }
    const desc = px.metaDesc(a.name[l], b.name[l], px.dur(14, 0), px.dur(13, 0), true);
    assert.ok(desc.length > 40 && !/undefined/.test(desc), `${l}: 메타 설명이 이상하다`);
  }
  assert.equal(Object.keys(PAIR_UI).length, LANG_CODES.length);

  /* 시차를 그 언어의 말로 적는지 — "+14:00"은 시계 시각처럼 읽힌다 */
  const durs = LANG_CODES.map(l => PAIR_UI[l].dur(3, 30));
  assert.equal(new Set(durs).size >= 6, true, `시차 표기가 ${new Set(durs).size}가지뿐이다`);
  for (const l of LANG_CODES) {
    assert.ok(!/:/.test(PAIR_UI[l].dur(14, 0)), `${l}: 시차를 "14:00" 꼴로 적는다`);
    assert.ok(/30/.test(PAIR_UI[l].dur(3, 30)), `${l}: 30분이 사라진다 — 인도·네팔이 틀린다`);
    /* 시차 0은 "0시간"이 아니라 말로 적는다 */
    assert.ok(PAIR_UI[l].noGap.length > 0 && !/0/.test(PAIR_UI[l].noGap), `${l}: 시차 없음이 숫자로 적힌다`);
  }
  assert.equal(new Set(LANG_CODES.map(l => PAIR_UI[l].noGap)).size, LANG_CODES.length,
    '시차 없음 문구가 언어마다 다르지 않다');
});

test('오늘 날짜에 기대지 않는다', () => {
  const a = city('seoul'), b = city('london');
  assert.deepEqual(pairFacts(a, b), pairFacts(a, b));
  /* 기준 연도를 바꾸면 값이 달라질 수 있어도, 같은 연도면 늘 같다 */
  assert.equal(pairFacts(a, b, 2026).winterMinutes, pairFacts(a, b, 2026).winterMinutes);
});
