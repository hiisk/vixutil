import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  FORTUNE_POOL, ADVICE_POOL, LUCKY_ITEMS, KEYWORD_POOL, LUCKY_COLORS, LUCKY_DIRECTIONS,
  ZODIAC_SIGNS, ANIMALS,
  getTodayFortune, starRating, todaySeed, pick,
} from '../lib/fortune-data.ts';

/**
 * 운세는 날짜 시드로 매일 바뀌므로, 문장 풀이 얕으면 같은 문장이 금방 반복된다.
 * 재방문 동기가 사라지지 않도록 풀 크기의 하한선을 지킨다.
 */
const MIN_POOL = 40;

test('운세 문장 풀이 최소 크기를 넘는다', () => {
  for (const [domain, pool] of Object.entries(FORTUNE_POOL)) {
    assert.ok(pool.length >= MIN_POOL, `${domain}: ${pool.length}개 — 최소 ${MIN_POOL}개 필요`);
  }
  assert.ok(ADVICE_POOL.length >= MIN_POOL, `조언 풀: ${ADVICE_POOL.length}개`);
});

test('보조 풀에 충분한 항목이 있다', () => {
  assert.ok(LUCKY_ITEMS.length >= 24);
  assert.ok(KEYWORD_POOL.length >= 24);
  assert.ok(LUCKY_COLORS.length >= 8);
  assert.ok(LUCKY_DIRECTIONS.length >= 4);
});

test('모든 풀에 중복 문장이 없다', () => {
  for (const [domain, pool] of Object.entries(FORTUNE_POOL)) {
    assert.equal(new Set(pool).size, pool.length, `${domain}: 중복 문장 존재`);
  }
  assert.equal(new Set(ADVICE_POOL).size, ADVICE_POOL.length, '조언 풀 중복');
  assert.equal(new Set(LUCKY_ITEMS).size, LUCKY_ITEMS.length, '행운 아이템 중복');
  assert.equal(new Set(KEYWORD_POOL).size, KEYWORD_POOL.length, '키워드 중복');
});

test('같은 날 같은 대상은 항상 같은 운세를 준다', () => {
  // 새로고침할 때마다 운세가 바뀌면 신뢰를 잃는다. 시드가 결정론적이어야 한다.
  const a = getTodayFortune('aries');
  const b = getTodayFortune('aries');
  assert.deepEqual(a, b);
});

test('대상이 다르면 운세도 갈린다', () => {
  // 12별자리가 전부 같은 운세를 받으면 운세라고 할 수 없다.
  const overalls = new Set(ZODIAC_SIGNS.map(z => getTodayFortune(z.id).overall));
  assert.ok(overalls.size >= 5, `12별자리 중 총운이 ${overalls.size}종류뿐`);
});

test('날짜가 바뀌면 시드도 바뀐다', () => {
  const seed = todaySeed('aries', 'overall');
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  assert.equal(seed, `aries-overall-${ymd}`);
});

test('별점은 항상 1~5 사이다', () => {
  for (const subject of [...ZODIAC_SIGNS, ...ANIMALS]) {
    for (const domain of ['overall', 'love', 'money', 'health', 'work']) {
      const n = starRating(subject.id, domain);
      assert.ok(Number.isInteger(n) && n >= 1 && n <= 5, `${subject.id}/${domain}: ${n}`);
    }
  }
});

test('별점이 한 값에 쏠리지 않는다', () => {
  // 모두 3점만 나오면 별점을 보여줄 이유가 없다.
  const counts = new Map<number, number>();
  for (let i = 0; i < 500; i++) {
    const n = starRating(`subject-${i}`, 'overall');
    counts.set(n, (counts.get(n) ?? 0) + 1);
  }
  assert.ok(counts.size >= 4, `별점이 ${counts.size}종류만 나옴`);
});

test('getTodayFortune이 모든 필드를 채운다', () => {
  const f = getTodayFortune('rat');
  for (const key of ['overall', 'love', 'money', 'health', 'work'] as const) {
    assert.ok(typeof f[key] === 'string' && f[key].length > 0, `${key} 비어 있음`);
  }
  assert.ok(f.stars && typeof f.stars.overall === 'number');
});

test('pick은 풀 범위를 벗어나지 않는다', () => {
  for (let i = 0; i < 200; i++) {
    assert.ok(FORTUNE_POOL.overall.includes(pick(FORTUNE_POOL.overall, `seed-${i}`)));
  }
});

test('별자리·띠 id가 중복되지 않는다', () => {
  const zi = ZODIAC_SIGNS.map(z => z.id);
  const ai = ANIMALS.map(a => a.id);
  assert.equal(new Set(zi).size, 12);
  assert.equal(new Set(ai).size, 12);
});
