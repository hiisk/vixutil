import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { RANDOM_TOOLS, RANDOM_TOOLS_MAP } from '../lib/random-tools.ts';
import { RANDOM_L10N, randomMetaIntl } from '../lib/random-ui-intl.ts';
import { ALL_LOCALES, INTL_LOCALES, localeHref, localeTag } from '../lib/locales.ts';
import { appJoin, hasPage } from './app-path.ts';

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
  const src = readFileSync(appJoin('random', '[slug]', 'page.tsx'), 'utf8');
  for (const t of RANDOM_TOOLS) {
    assert.ok(src.includes(`case '${t.slug}':`), `상세 페이지에 case 없음: ${t.slug}`);
  }
});

test('번역 일곱 언어의 문구가 모두 채워져 있다', () => {
  // 도구를 새로 추가할 때 ko만 채우고 나머지를 빠뜨리면 그 언어 페이지가
  // undefined를 렌더한다. 빌드는 통과하므로 여기서 막는다.
  for (const t of RANDOM_TOOLS) {
    for (const lang of INTL_LOCALES) {
      const l = RANDOM_L10N[lang][t.slug];
      assert.ok(l, `${t.slug}: ${lang} 문구가 통째로 없다`);
      for (const [field, min] of [['title', 3], ['desc', 10], ['long', 40], ['category', 2]] as const) {
        assert.ok(l[field].trim().length >= min, `${t.slug}: ${lang} ${field}가 짧거나 비었다`);
      }
    }
  }
});

test('번역이 한국어 원문을 그대로 복사하지 않았다', () => {
  // 번역을 깜빡하고 ko 값을 붙여넣는 실수를 잡는다
  for (const t of RANDOM_TOOLS) {
    for (const lang of INTL_LOCALES) {
      const l = RANDOM_L10N[lang][t.slug];
      assert.notEqual(l.title, t.title, `${t.slug}: ${lang} 제목이 한국어와 동일`);
      assert.notEqual(l.desc, t.desc, `${t.slug}: ${lang} 설명이 한국어와 동일`);
    }
  }
});

test('번역 라우트가 모든 slug를 처리한다', () => {
  /*
    일곱 언어는 상세 화면 하나(components/RandomToolPageIntl.tsx)를 같이 쓴다.
    그래서 case 목록도 한 곳이고, 여기서 그 한 곳만 검사하면 된다.
  */
  const src = readFileSync(join(ROOT, 'components', 'RandomToolPageIntl.tsx'), 'utf8');
  for (const t of RANDOM_TOOLS) {
    assert.ok(src.includes(`case '${t.slug}':`), `번역 상세 화면에 case 없음: ${t.slug}`);
  }
});

test('여덟 언어 라우트가 다 있고 hreflang이 서로를 가리킨다', () => {
  // 한쪽만 가리키는 hreflang은 구글이 대체 언어 관계로 인정하지 않는다
  for (const lang of ALL_LOCALES) {
    // 허브는 아홉 언어에서 접혔다 — 파일이 아니라 lib/fold/registry.ts가 쥔다
    assert.ok(hasPage(lang, '/random'), `${lang} 허브 없음`);
    const base = appJoin(...localeHref(lang, '/random').split('/').filter(Boolean));
    assert.ok(existsSync(join(base, '[slug]', 'page.tsx')), `${lang} 상세 없음`);
  }
  // 메타데이터 함수가 withCard를 거치면서 반환형이 Metadata로 넓어졌다 —
  // 리터럴 추론이 없어져서 언어 열쇠로 바로 못 찾는다
  const alt = (randomMetaIntl('es', 'roulette').alternates?.languages ?? {}) as Record<string, unknown>;
  for (const lang of ALL_LOCALES) {
    assert.equal(alt[localeTag(lang)], localeHref(lang, '/random/roulette'), `${lang} 대안 주소가 틀렸다`);
  }
});
