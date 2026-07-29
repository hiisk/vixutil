import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ZODIAC_SIGNS, ANIMALS, BLOOD_TYPES } from '../lib/fortune-data.ts';
import { ZODIAC_SIGNS_EN, ANIMALS_EN, BLOOD_TYPES_EN, FORTUNE_POOL_EN, ADVICE_POOL_EN, LUCKY_ITEMS_EN, KEYWORD_POOL_EN, LUCKY_COLORS_EN, LUCKY_DIRECTIONS_EN } from '../lib/fortune-en.ts';
import { ZODIAC_SIGNS_ZH, ANIMALS_ZH, BLOOD_TYPES_ZH, FORTUNE_POOL_ZH, ADVICE_POOL_ZH, LUCKY_ITEMS_ZH, KEYWORD_POOL_ZH, LUCKY_COLORS_ZH, LUCKY_DIRECTIONS_ZH } from '../lib/fortune-zh.ts';
import { getTodayFortuneIntl, formatToday, FORTUNE_UI } from '../lib/fortune-intl.ts';

const DOMAINS = ['overall', 'love', 'money', 'health', 'work'] as const;

test('세 언어의 주제 id가 정확히 일치한다', () => {
  // id가 어긋나면 ?id= 공유 링크가 언어를 바꾸는 순간 깨진다
  const sets = [
    ['zodiac', ZODIAC_SIGNS, ZODIAC_SIGNS_EN, ZODIAC_SIGNS_ZH],
    ['animal', ANIMALS, ANIMALS_EN, ANIMALS_ZH],
    ['blood', BLOOD_TYPES, BLOOD_TYPES_EN, BLOOD_TYPES_ZH],
  ] as const;
  for (const [label, ko, en, zh] of sets) {
    const ids = (arr: readonly { id: string }[]) => arr.map(x => x.id);
    assert.deepEqual(ids(en), ids(ko), `${label}: en의 id 순서/구성이 ko와 다르다`);
    assert.deepEqual(ids(zh), ids(ko), `${label}: zh의 id 순서/구성이 ko와 다르다`);
  }
});

test('en·zh 운세 풀이 비어 있지 않고 문장이 중복되지 않는다', () => {
  for (const [label, pool] of [['en', FORTUNE_POOL_EN], ['zh', FORTUNE_POOL_ZH]] as const) {
    for (const d of DOMAINS) {
      const lines = pool[d];
      assert.ok(lines.length >= 20, `${label}.${d}: 문장이 ${lines.length}개뿐 — 매일 같은 운세가 반복된다`);
      assert.equal(new Set(lines).size, lines.length, `${label}.${d}: 중복 문장이 있다`);
      for (const line of lines) {
        assert.ok(line.trim().length > 0, `${label}.${d}: 빈 문장`);
      }
    }
  }
});

test('en 풀에 한글이, zh 풀에 한글이 섞이지 않았다', () => {
  // 번역하다 만 문장이 남는 실수를 잡는다
  const hangul = /[가-힣]/;
  for (const [label, pool, advice, items, keywords] of [
    ['en', FORTUNE_POOL_EN, ADVICE_POOL_EN, LUCKY_ITEMS_EN, KEYWORD_POOL_EN],
    ['zh', FORTUNE_POOL_ZH, ADVICE_POOL_ZH, LUCKY_ITEMS_ZH, KEYWORD_POOL_ZH],
  ] as const) {
    for (const d of DOMAINS) {
      for (const line of pool[d]) {
        assert.ok(!hangul.test(line), `${label}.${d}에 한글이 남아 있다: ${line}`);
      }
    }
    for (const line of [...advice, ...items, ...keywords]) {
      assert.ok(!hangul.test(line), `${label} 보조 풀에 한글이 남아 있다: ${line}`);
    }
  }
});

test('행운 색·방향이 세 언어 모두 같은 개수다', () => {
  // 개수가 다르면 같은 시드가 언어별로 다른 색을 고르게 된다
  assert.equal(LUCKY_COLORS_EN.length, LUCKY_COLORS_ZH.length);
  assert.equal(LUCKY_DIRECTIONS_EN.length, LUCKY_DIRECTIONS_ZH.length);
  for (let i = 0; i < LUCKY_COLORS_EN.length; i++) {
    assert.equal(LUCKY_COLORS_EN[i][1], LUCKY_COLORS_ZH[i][1], `${i}번째 색상 hex가 언어별로 다르다`);
  }
});

test('같은 날 같은 주제면 언어가 달라도 별점과 행운의 숫자가 같다', () => {
  // 언어를 바꿨더니 운세 등급이 달라지면 어느 쪽이 진짜인지 알 수 없다
  for (const id of ['zodiac-aries', 'animal-dragon', 'blood-A']) {
    const ko = getTodayFortuneIntl(id, 'ko');
    const en = getTodayFortuneIntl(id, 'en');
    const zh = getTodayFortuneIntl(id, 'zh');
    assert.deepEqual(en.stars, ko.stars, `${id}: en 별점이 ko와 다르다`);
    assert.deepEqual(zh.stars, ko.stars, `${id}: zh 별점이 ko와 다르다`);
    assert.equal(en.luckyNumber, ko.luckyNumber, `${id}: en 행운의 숫자가 ko와 다르다`);
    assert.equal(zh.luckyNumber, ko.luckyNumber, `${id}: zh 행운의 숫자가 ko와 다르다`);
    assert.equal(en.luckyColorHex, ko.luckyColorHex, `${id}: en 행운의 색이 ko와 다르다`);
    assert.equal(zh.luckyColorHex, ko.luckyColorHex, `${id}: zh 행운의 색이 ko와 다르다`);
  }
});

test('운세 결과의 모든 문자열 필드가 채워진다', () => {
  for (const lang of ['ko', 'en', 'zh'] as const) {
    const f = getTodayFortuneIntl('zodiac-leo', lang);
    for (const key of [...DOMAINS, 'advice', 'luckyItem', 'luckyColor', 'luckyDirection'] as const) {
      assert.ok(String(f[key]).trim().length > 0, `${lang}: ${key}가 비어 있다`);
    }
    assert.equal(f.keywords.length, 2, `${lang}: 키워드가 2개가 아니다`);
    assert.notEqual(f.keywords[0], f.keywords[1], `${lang}: 키워드 2개가 같다`);
    assert.ok(f.luckyNumber >= 1 && f.luckyNumber <= 30, `${lang}: 행운의 숫자가 범위 밖`);
  }
});

test('UI 문구가 세 언어 모두 채워져 있다', () => {
  for (const [key, copy] of Object.entries(FORTUNE_UI)) {
    for (const lang of ['ko', 'en', 'zh'] as const) {
      assert.ok(copy[lang] && copy[lang].trim().length > 0, `FORTUNE_UI.${key}.${lang}가 비어 있다`);
    }
  }
});

test('날짜 표기가 언어별 형식을 따른다', () => {
  const d = new Date(2026, 6, 29);
  assert.equal(formatToday('ko', d), '2026년 7월 29일');
  assert.equal(formatToday('zh', d), '2026年7月29日');
  assert.match(formatToday('en', d), /July 29, 2026/);
});
