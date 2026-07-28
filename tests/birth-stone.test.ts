import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BIRTH_INFO, getBirthInfo } from '../lib/birth-stone.ts';

test('1~12월 모두 있고 월이 유일하다', () => {
  assert.equal(BIRTH_INFO.length, 12);
  const months = BIRTH_INFO.map(b => b.month).sort((a, b) => a - b);
  assert.deepEqual(months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

test('모든 항목의 필드가 채워져 있다', () => {
  for (const b of BIRTH_INFO) {
    for (const f of ['stone', 'stoneEn', 'emoji', 'color', 'stoneMeaning', 'flower', 'flowerMeaning', 'blurb'] as const) {
      assert.ok(b[f] && String(b[f]).trim().length > 0, `${b.month}월: ${f} 비어 있음`);
    }
    assert.match(b.color, /^#[0-9a-fA-F]{6}$/, `${b.month}월 color가 hex가 아님`);
  }
});

test('getBirthInfo는 해당 월을 정확히 반환한다', () => {
  assert.equal(getBirthInfo(7)?.stone, '루비');
  assert.equal(getBirthInfo(1)?.month, 1);
  assert.equal(getBirthInfo(0), null);
  assert.equal(getBirthInfo(13), null);
});
