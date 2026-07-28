import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORLDCUPS, WORLDCUPS_MAP } from '../lib/worldcup-data.ts';

function isPowerOfTwo(n: number): boolean {
  return n >= 2 && (n & (n - 1)) === 0;
}

test('월드컵이 하나 이상 있다', () => {
  assert.ok(WORLDCUPS.length >= 4);
});

test('slug가 모두 유일하다', () => {
  const slugs = WORLDCUPS.map(w => w.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test('slug는 소문자·숫자·하이픈만 사용한다', () => {
  for (const w of WORLDCUPS) {
    assert.match(w.slug, /^[a-z0-9-]+$/, `잘못된 slug: ${w.slug}`);
  }
});

test('WORLDCUPS_MAP이 모든 월드컵을 포함한다', () => {
  for (const w of WORLDCUPS) {
    assert.equal(WORLDCUPS_MAP[w.slug], w, `맵에 없음: ${w.slug}`);
  }
});

test('후보 수는 2의 거듭제곱이어야 토너먼트가 성립한다', () => {
  for (const w of WORLDCUPS) {
    assert.ok(isPowerOfTwo(w.items.length), `${w.slug}: ${w.items.length}강은 2의 거듭제곱이 아님`);
  }
});

test('한 월드컵 안에서 후보 이름은 중복되지 않는다', () => {
  for (const w of WORLDCUPS) {
    const names = w.items.map(i => i.name);
    assert.equal(new Set(names).size, names.length, `${w.slug}에 중복 후보가 있음`);
  }
});

test('모든 후보에 이름과 이모지가 있다', () => {
  for (const w of WORLDCUPS) {
    for (const it of w.items) {
      assert.ok(it.name.trim().length > 0, `${w.slug}: 빈 이름`);
      assert.ok(it.emoji.trim().length > 0, `${w.slug}/${it.name}: 이모지 없음`);
    }
  }
});

test('제목·설명·아이콘·카테고리가 모두 채워져 있다', () => {
  for (const w of WORLDCUPS) {
    for (const field of ['title', 'desc', 'icon', 'category'] as const) {
      assert.ok(w[field] && w[field].trim().length > 0, `${w.slug}: ${field} 비어 있음`);
    }
  }
});
