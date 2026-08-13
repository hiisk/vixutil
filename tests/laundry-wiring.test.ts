/**
 * 세탁 기호 배선 — 계산이 아니라 이어짐을 본다(규칙은 laundry-symbol.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 등록부·껍데기·사이트맵·
 * 카드·홈·검색 색인이 실제로 이어져 있는지를 파일과 데이터로 되짚는다.
 *
 * ── 이 검사가 먼저 빨갛게 나는 것이 정상인 때가 있다 ──────
 * 섹션을 만든 뒤 배선(등록부 두 표·사이트맵·검색 색인·홈·카드)을 아직 안 넣었으면
 * 여기가 그 목록을 하나씩 짚어 준다. 통과하려고 검사를 무르게 고치지 말고 배선을
 * 넣으라 — 무르게 고치면 아홉 언어의 404를 아무도 못 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { koLeafSrc } from './app-path.ts';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { CELLS, LAUNDRY_ICON, LAUNDRY_SLUGS } from '../lib/laundry/list.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

test('빨래 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(ICON_FOR[LAUNDRY_ICON], `${LAUNDRY_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`);
});

test('등록부에 세탁 기호 두 줄이 있다 — 빠지면 아홉 언어에서 조용히 404다', () => {
  const src = readFileSync(join(ROOT, 'lib', 'fold', 'registry.ts'), 'utf8');
  assert.ok(src.includes(`'laundry': () => import('./pages/laundry')`), 'STATIC_ROUTES에 laundry가 없다 — 아홉 언어 허브가 404다');
  assert.ok(src.includes(`'laundry': () => import('./pages/laundry__slug')`), 'SLUG_ROUTES에 laundry가 없다 — 아홉 언어 낱장이 404다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'laundry.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'laundry__slug.tsx')), '낱장 공유 모듈이 없다');
  // 한국어 낱장은 lib/ko/registry.ts가 부른다 — 빠지면 한국어에서만 404다
  const ko = readFileSync(join(ROOT, 'lib', 'ko', 'registry.ts'), 'utf8');
  assert.ok(ko.includes(`'laundry': () => import('./pages/laundry__slug')`), 'KO_LEAVES에 laundry가 없다 — 한국어 낱장이 404다');
});

test('사이트맵이 허브와 낱장 86칸을 열 언어로 내건다', () => {
  /*
   * 등록부와 사이트맵은 서로 모른다 — 한쪽에만 있으면 크롤러가 404를 받거나
   * 페이지가 색인에서 빠진다. 낱장 수는 데이터에서 세므로 칸을 늘리면 따라온다.
   */
  const src = readFileSync(join(ROOT, 'app', 'sitemap.ts'), 'utf8');
  assert.ok(src.includes(`from "@/lib/laundry/list"`), '사이트맵이 세탁 기호 목록을 안 불러온다');
  assert.match(src, /\/laundry`, changeFrequency: weekly, priority: 0\.85/, '허브 줄(우선순위 .85)이 없다');
  assert.match(src, /LAUNDRY_CELLS\.map/, '낱장 줄이 없다 — 86칸이 사이트맵에서 빠진다');
  // 허브 1 + 낱장 86이 열 언어씩 — 낱장 수가 틀리면 목록 쪽이 깨진 것이다
  assert.equal(LAUNDRY_SLUGS.length, 86);
  assert.equal(LANGS.length, 10);
  assert.equal((1 + LAUNDRY_SLUGS.length) * LANGS.length, 870);
});

test('낱장 껍데기가 아홉 언어에 있고 제 언어로 부른다', () => {
  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'laundry', '[slug]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 낱장 껍데기가 없다`);
    const src = readFileSync(p, 'utf8');
    assert.ok(src.includes(`build('${lang}')`), `${lang} 껍데기가 제 언어로 안 부른다`);
    /* 2026-08-13: force-dynamic → ISR. 둘이 함께 있어야 캐시가 걸린다 —
       revalidate만 있으면 라우트가 동적으로 잡혀 아무 효과가 없다(실측 확인).
       까닭은 tests/prerender-budget.test.ts 머리말. */
    assert.ok(/export const revalidate = \d+/.test(src), `${lang} 낱장에 revalidate가 없다 — 캐시가 안 걸린다`);
    assert.ok(src.includes('generateStaticParams'), `${lang} 낱장이 generateStaticParams를 안 내보낸다 — revalidate만으로는 안 걸린다`);
  }
  // 한국어 허브는 접지 않는다 — 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'laundry', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 한국어 낱장은 lib/ko/pages 모듈이다(라우팅 표 2,048 한도). force-dynamic은
   * 모듈이 아니라 디스패처 라우트가 선언하므로 여기서 보지 않는다 —
   * generateStaticParams는 디스패처가 모아 쓰는 손잡이라 여기서 본다.
   */
  const ko = koLeafSrc('laundry');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
  assert.ok(ko.includes('laundryParams'), '한국어 낱장이 세탁 기호 목록을 안 돌린다');
});

test('공유 카드 열쇠가 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    assert.ok(CARD_KEYS[lang].includes('laundry'), `${lang} 카드 열쇠에 laundry가 없다 — 그 언어만 상위 카드를 물려받는다`);
    const src = readFileSync(join(ROOT, 'lib', 'og-cards', `${lang}.tsx`), 'utf8');
    assert.ok(src.includes(`'laundry': () => laundryHub('${lang}')`), `${lang}.tsx에 카드 본체가 없다 — keys.ts와 어긋나 /og가 404다`);
  }
});

test('홈과 한국어 검색 색인이 세탁 기호를 건다', () => {
  // 홈에서 안 걸리면 낱장 860장이 사이트맵에만 있는 상태가 된다
  const ko = readFileSync(join(ROOT, 'app', '(ko)', 'page.tsx'), 'utf8');
  assert.ok(ko.includes(`href: '/laundry'`), '한국어 홈에 카드가 없다');
  const home = readFileSync(join(ROOT, 'lib', 'locale-home.ts'), 'utf8');
  assert.ok(home.includes(`route: '/laundry'`), '아홉 언어 홈에 카드가 없다');
  const idx = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(idx.includes(`section: 'laundry' as const`), '검색 색인에 세탁 기호 항목이 없다');
  assert.ok(idx.includes(`{ href: '/laundry',`), '검색 색인에 허브 항목이 없다');
  assert.ok(/laundry:\s*\{ label:/.test(idx), 'SECTION_META에 세탁 기호 이름표가 없다');
});

test('낱장 주소가 검색 색인에 86칸 그대로 들어간다', () => {
  /*
   * 색인은 낱장을 데이터에서 만들어야 한다 — 손으로 몇 개만 적으면 나머지는
   * 사이트 안에서 찾을 수 없다. 목록을 불러오는지와 주소를 만드는지를 함께 본다.
   */
  const idx = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(idx.includes(`from './laundry/list.ts'`), '검색 색인이 세탁 기호 목록을 안 불러온다');
  assert.match(idx, /\/laundry\/\$\{/, '색인이 낱장 주소를 만들지 않는다');
  assert.equal(CELLS.length, 86);
});
