import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { CONVERT_TOOLS } from '../lib/convert-tools.ts';
import { valuesFor, valueSlug, VALUES_PER_PAIR } from '../lib/convert/values.ts';
import { LEAF_UI } from '../lib/convert/leaf-ui.ts';
import { ALL_LOCALES10 } from '../lib/locales.ts';
import { isIndexable, EXCLUDED_PREFIXES } from '../lib/search-index-policy.ts';
import { SEARCH_INDEX } from '../lib/search-index.ts';
import { sitemapRoutes } from './app-path.ts';

/**
 * 값 낱장이 **열 언어에서 실제로 열리고, 들어갈 곳에만 들어가는지** 본다.
 *
 * ── 이 계열의 위험이 다른 곳과 다르다 ───────────────────────
 * 33,120장은 한 번에 잘못되면 크게 잘못된다. 위험이 셋이다.
 *
 *   1. 라우트가 한 언어에서만 빠진다 — 그 언어의 3,312장이 통째로 404
 *   2. 검색 색인에 들어간다 — 프리렌더 짐이 19MB를 넘어 런타임에 죽는다
 *   3. 사이트맵에 안 들어간다 — 만들어 놓고 아무도 못 찾는다
 *
 * 셋 다 화면으로는 안 보인다. 그래서 여기서 센다.
 */
const ROOT = join(import.meta.dirname, '..');

test('세 칸 라우트가 열 언어에 다 있다', () => {
  /*
   * 국제 아홉은 [a]/[b]/[slug] 하나가 받고, 한국어는 [section]/[slug]/[deep]이다.
   * 언어 하나가 빠지면 그 언어의 값 낱장 3,312장이 통째로 404가 된다.
   */
  const intl = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];
  const missing = intl.filter(l => {
    try {
      readFileSync(join(ROOT, 'app', `(${l})`, l, '[a]', '[b]', '[slug]', 'page.tsx'), 'utf8');
      return false;
    } catch { return true; }
  });
  assert.deepEqual(missing, [], `세 칸 라우트가 없는 언어: ${missing.join(', ')}`);
  assert.ok(
    readFileSync(join(ROOT, 'app', '(ko)', '[section]', '[slug]', '[deep]', 'page.tsx'), 'utf8').length > 0,
    '한국어 세 칸 라우트가 없다',
  );
});

test('두 라우트가 접두 등록부를 본다 — 없으면 값 낱장이 통째로 404다', () => {
  /*
   * 값 낱장은 등록부 열쇠가 `convert/<쌍>`이 아니라 접두사 `convert` 하나다
   * (쌍이 138개라 열쇠를 하나씩 두면 등록부에 138줄이 붙는다).
   * 두 라우트가 모두 그 접두 등록부를 봐야 열 언어가 함께 열린다.
   */
  const intlDeep = readFileSync(join(ROOT, 'lib', 'fold', 'pages', 'deep__slug.tsx'), 'utf8');
  const koDeep = readFileSync(join(ROOT, 'app', '(ko)', '[section]', '[slug]', '[deep]', 'page.tsx'), 'utf8');
  /* 2026-08-15: 클라이언트 청크를 가르면서 서버 쪽이 뷰 등록부(DEEP_PREFIX_ROUTES)가 아니라
     메타 등록부(DEEP_PREFIX_META)를 본다 — 까닭은 components/FoldView.tsx 머리말.
     보는 표만 바뀌었고 "두 라우트가 접두 갈래를 안다"는 요건은 그대로다. */
  for (const [name, src] of [['국제 deep__slug', intlDeep], ['한국어 [deep]', koDeep]] as const) {
    assert.match(src, /DEEP_PREFIX_META/, `${name}가 접두 등록부를 안 본다`);
  }
  /* 정확한 열쇠가 먼저다 — 뒤집으면 접두가 game/chess 같은 고정 갈래를 가로챈다 */
  assert.ok(
    intlDeep.indexOf('DEEP_META[exact]') < intlDeep.indexOf('DEEP_PREFIX_META[a]'),
    '접두 등록부가 고정 갈래보다 먼저 잡힌다',
  );
});

test('열 언어 문구가 다 있고 다른 언어가 새지 않는다', () => {
  const keys = ['h1', 'metaTitle', 'metaDesc', 'answer', 'inverseTitle', 'roundSafe', 'roundRough', 'tableTitle', 'otherTitle', 'neighborTitle', 'formula', 'openTool'];
  for (const lang of ALL_LOCALES10) {
    const ui = LEAF_UI[lang];
    assert.ok(ui, `${lang} 문구가 없다 — 그 언어 낱장이 undefined로 죽는다`);
    for (const k of keys) assert.ok(k in ui, `${lang}에 ${k}가 없다`);
  }
  /* 제 문자를 쓰는지 — 영어를 베껴 두면 여기서 걸린다 */
  const sample = (lang: (typeof ALL_LOCALES10)[number]) => LEAF_UI[lang].h1('70', 'kg', 'lb');
  assert.match(sample('ko'), /[가-힣]/, '한국어 문구에 한글이 없다');
  assert.match(sample('ja'), /[ぁ-んァ-ン一-龯]/, '일본어 문구에 가나·한자가 없다');
  assert.match(sample('hi'), /[ऀ-ॿ]/, '힌디어 문구에 데바나가리가 없다');
  assert.match(sample('zh-hans'), /[一-龯]/, '중국어 문구에 한자가 없다');
  /*
   * 한 언어를 복사해 두면 걸린다. 다만 **중국어 두 갈래는 짧은 문장에서 실제로
   * 같다** — "70kg是多少lb？"는 간체·번체가 같은 글자다. 그래서 그 하나만 허용하고,
   * 대신 둘이 어딘가에서는 갈리는지(換算/换算) 따로 본다.
   */
  const all = ALL_LOCALES10.map(sample);
  assert.ok(new Set(all).size >= all.length - 1, `${all.length - new Set(all).size + 1}개 언어가 같은 문장을 쓴다`);
  assert.notEqual(
    LEAF_UI['zh-hans'].metaDesc('70', 'kg', 'lb', '154'),
    LEAF_UI['zh-hant'].metaDesc('70', 'kg', 'lb', '154'),
    '간체와 번체가 통째로 같다 — 한쪽을 복사해 둔 것이다',
  );
});

test('값 낱장이 사이트맵에 열 언어로 들어간다', { skip: sitemapRoutes() ? false : '빌드 산출물 없음' }, () => {
  const urls = new Set(sitemapRoutes()!.map(u => u.replace(/^\//, '')));
  const want = [
    'convert/kg-lb/70',
    'en/convert/kg-lb/70',
    'ja/convert/cm-inch/180',
    'zh-hant/convert/celsius-fahrenheit/37',
  ];
  for (const w of want) assert.ok(urls.has(w), `사이트맵에 ${w}가 없다`);

  /* 장수 — 138쌍 × 24값 × 열 언어 = 33,120 */
  const count = [...urls].filter(u => /(^|\/)convert\/[^/]+\/[^/]+$/.test(u)).length;
  assert.equal(
    count, CONVERT_TOOLS.length * VALUES_PER_PAIR * 10,
    `사이트맵의 값 낱장이 ${count}개다 — 138 × 24 × 10 = 33,120이어야 한다`,
  );
});

test('값 낱장은 사이트 검색에 안 들어간다 — 프리렌더 짐이 19MB에서 죽는다', () => {
  /*
   * 쌍 페이지는 들어가고 값 낱장은 빠진다. 규칙과 까닭은 lib/search-index-policy.ts.
   * 여기서는 **실제 색인**을 훑어 확인한다 — 정책만 적어 두고 안 지키면 뜻이 없다.
   */
  assert.ok(EXCLUDED_PREFIXES.some(e => e.prefix === '/convert/'), '정책에 convert가 없다');
  assert.ok(isIndexable('/convert/kg-lb'), '쌍 페이지까지 빠졌다');
  assert.ok(!isIndexable('/convert/kg-lb/70'), '값 낱장이 색인에 들어간다');

  const leaked = SEARCH_INDEX.filter(e => !isIndexable(e.href));
  assert.deepEqual(
    leaked.slice(0, 5).map(e => e.href), [],
    `색인에 들어간 값 낱장 ${leaked.length}개 — 계열 전체가 들어오면 검색 짐이 터진다`,
  );
  /* 쌍 페이지는 그대로 있어야 한다 */
  assert.ok(SEARCH_INDEX.some(e => e.href === '/convert/kg-lb'), '쌍 페이지가 색인에서 빠졌다');
});

test('주소가 겹치지 않는다 — 같은 값이 두 쌍에 실리면 중복이다', () => {
  const seen = new Set<string>();
  for (const t of CONVERT_TOOLS) {
    for (const v of valuesFor(t.slug)) {
      const href = `/convert/${t.slug}/${valueSlug(v)}`;
      assert.ok(!seen.has(href), `${href}가 두 번 나온다`);
      seen.add(href);
    }
  }
  assert.equal(seen.size, CONVERT_TOOLS.length * VALUES_PER_PAIR, '한국어 값 낱장이 3,312장이 아니다');
});
