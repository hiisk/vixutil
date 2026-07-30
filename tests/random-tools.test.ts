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

test('영어·중국어 번역 필드가 모두 채워져 있다', () => {
  // 도구를 새로 추가할 때 ko만 채우고 en/zh를 빠뜨리면 해당 언어 페이지가
  // undefined를 렌더한다. 빌드는 통과하므로 여기서 막는다.
  for (const t of RANDOM_TOOLS) {
    for (const field of ['titleEn', 'descEn', 'longEn', 'categoryEn', 'titleZh', 'descZh', 'longZh'] as const) {
      assert.ok(t[field] && t[field].trim().length > 0, `${t.slug}: ${field} 비어 있음`);
    }
  }
});

test('중국어 번역이 한국어 원문을 그대로 복사하지 않았다', () => {
  // 번역을 깜빡하고 ko 값을 붙여넣는 실수를 잡는다
  for (const t of RANDOM_TOOLS) {
    assert.notEqual(t.titleZh, t.title, `${t.slug}: titleZh가 한국어와 동일`);
    assert.notEqual(t.descZh, t.desc, `${t.slug}: descZh가 한국어와 동일`);
  }
});

test('en 상세 페이지도 모든 slug를 처리한다', () => {
  for (const locale of ['en']) {
    const src = readFileSync(join(ROOT, 'app', locale, 'random', '[slug]', 'page.tsx'), 'utf8');
    for (const t of RANDOM_TOOLS) {
      assert.ok(src.includes(`case '${t.slug}':`), `/${locale} 상세 페이지에 case 없음: ${t.slug}`);
    }
  }
});

test('두 언어 모두 허브 페이지가 있고 서로를 hreflang으로 가리킨다', () => {
  // 한쪽만 가리키는 hreflang은 구글이 대체 언어 관계로 인정하지 않는다
  const hubs = {
    ko: readFileSync(join(ROOT, 'app', 'random', 'page.tsx'), 'utf8'),
    en: readFileSync(join(ROOT, 'app', 'en', 'random', 'page.tsx'), 'utf8'),
  };
  for (const [locale, src] of Object.entries(hubs)) {
    for (const target of ["'ko':", "'en':"]) {
      assert.ok(src.includes(target), `/${locale} 허브의 languages에 ${target} 없음`);
    }
  }
});
