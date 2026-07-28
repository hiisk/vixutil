import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RANDOM_TOOLS, RANDOM_TOOLS_MAP } from '../lib/random-tools.ts';

const ROOT = join(import.meta.dirname, '..');

test('도구가 하나 이상 있다', () => {
  assert.ok(RANDOM_TOOLS.length >= 4);
});

test('slug가 모두 유일하다', () => {
  const slugs = RANDOM_TOOLS.map(t => t.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test('slug는 소문자·숫자·하이픈만 사용한다', () => {
  for (const t of RANDOM_TOOLS) {
    assert.match(t.slug, /^[a-z0-9-]+$/, `잘못된 slug: ${t.slug}`);
  }
});

test('제목·설명·아이콘·카테고리·그라디언트가 모두 채워져 있다', () => {
  for (const t of RANDOM_TOOLS) {
    for (const field of ['title', 'desc', 'icon', 'category', 'gradient', 'long'] as const) {
      assert.ok(t[field] && t[field].trim().length > 0, `${t.slug}: ${field} 비어 있음`);
    }
  }
});

test('RANDOM_TOOLS_MAP이 모든 도구를 포함한다', () => {
  for (const t of RANDOM_TOOLS) {
    assert.equal(RANDOM_TOOLS_MAP[t.slug], t, `맵에 없음: ${t.slug}`);
  }
});

test('모든 slug가 상세 페이지 컴포넌트 매핑에 존재한다', () => {
  // app/random/[slug]/page.tsx의 switch가 모든 slug를 처리해야 한다
  const src = readFileSync(join(ROOT, 'app', 'random', '[slug]', 'page.tsx'), 'utf8');
  for (const t of RANDOM_TOOLS) {
    assert.ok(src.includes(`case '${t.slug}':`), `상세 페이지에 case 없음: ${t.slug}`);
  }
});
