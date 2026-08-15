import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { GAME_TOOLS, findGameTool, relatedGameTools } from '../lib/game-tools.ts';
import { SECTION_FAQ } from '../lib/section-faq.ts';
import { appEntries, appJoin, koLeafFile, footerSrc } from './app-path.ts';
import { hasOwnCard } from '../lib/og-cards/index.ts';

const ROOT = join(import.meta.dirname, '..');
const APP = appJoin('game');

/**
 * 카탈로그(lib/game-tools.ts) 하나를 허브·상세 셸·검색 인덱스·사이트맵·FAQ가
 * 나눠 읽는다. 도구를 늘리다가 한 곳을 빠뜨리면 화면에는 보이는데 검색에서
 * 안 나오거나 색인이 안 된다.
 */

test('열 개 이상의 도구를 담는다', () => {
  assert.ok(GAME_TOOLS.length >= 10, `도구가 ${GAME_TOOLS.length}개뿐`);
  assert.ok(new Set(GAME_TOOLS.map(t => t.category)).size >= 3, '분류가 너무 적다');
});

test('도구마다 페이지와 OG 이미지가 있다', () => {
  const missing: string[] = [];
  for (const t of GAME_TOOLS) {
    if (!existsSync(join(APP, t.slug, 'page.tsx'))) missing.push(`${t.slug}/page.tsx`);
    // 카드는 이제 파일이 아니라 lib/og-cards의 대응표에 있다
    if (!hasOwnCard(`/game/${t.slug}`)) missing.push(`/game/${t.slug} 공유 카드`);
  }
  assert.deepEqual(missing, [], `없는 파일: ${missing.join(', ')}`);
});

test('페이지 폴더마다 카탈로그 항목이 있다', () => {
  const orphans = readdirSync(APP, { withFileTypes: true })
    .filter(e => e.isDirectory())
    // cube·chess·poker는 게임이 아니라 자료 갈래다 — 큐브 공식 119가지, 체스 오프닝
    // 174가지, 홀덤 시작 핸드 169가지를 그린다. 목록이 lib/<갈래>/list.ts에서 오므로
    // 게임 카탈로그가 셀 대상이 아니다
    .filter(e => !['cube', 'chess', 'poker'].includes(e.name))
    .map(e => e.name)
    .filter(name => !findGameTool(name));
  assert.deepEqual(orphans, [], `카탈로그에 없는 페이지 폴더: ${orphans.join(', ')}`);
});

test('큐브 공식 라우트는 공식 목록에서 페이지를 만든다', () => {
  // 위 검사에서 cube를 빼 주었으니, 그 라우트가 실제로 공식 목록을 쓰는지 여기서 본다
  const src = readFileSync(koLeafFile('game/cube'), 'utf8');
  assert.ok(src.includes('algParams'), '[slug] 라우트가 공식 목록을 돌지 않는다');
  assert.ok(src.includes('generateStaticParams'), '[slug] 라우트가 정적 경로를 만들지 않는다');
  assert.ok(existsSync(join(APP, 'cube', 'page.tsx')), '큐브 공식 목록 페이지가 없다');
});

test('체스 오프닝 라우트는 오프닝 목록에서 페이지를 만든다', () => {
  // 위 검사에서 chess를 빼 주었으니, 그 라우트가 실제로 목록을 쓰는지 여기서 본다
  const src = readFileSync(koLeafFile('game/chess'), 'utf8');
  assert.ok(src.includes('openingParams'), '[slug] 라우트가 오프닝 목록을 돌지 않는다');
  assert.ok(src.includes('generateStaticParams'), '[slug] 라우트가 정적 경로를 만들지 않는다');
  assert.ok(existsSync(join(APP, 'chess', 'page.tsx')), '오프닝 목록 페이지가 없다');
});

test('홀덤 핸드 라우트는 핸드 목록에서 페이지를 만든다', () => {
  const src = readFileSync(koLeafFile('game/poker'), 'utf8');
  assert.ok(src.includes('handParams'), '[slug] 라우트가 핸드 목록을 돌지 않는다');
  assert.ok(src.includes('generateStaticParams'), '[slug] 라우트가 정적 경로를 만들지 않는다');
  assert.ok(existsSync(join(APP, 'poker', 'page.tsx')), '핸드 목록 페이지가 없다');
});

test('slug가 중복되지 않는다', () => {
  const slugs = GAME_TOOLS.map(t => t.slug);
  const dup = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
  assert.deepEqual(dup, [], `중복 slug: ${dup.join(', ')}`);
});

test('메타데이터가 비어 있지 않다', () => {
  for (const t of GAME_TOOLS) {
    assert.ok(t.title.trim(), `${t.slug}: title 없음`);
    assert.ok(t.desc.trim().length >= 8, `${t.slug}: desc가 너무 짧다`);
    assert.ok(t.metaTitle.includes(t.title), `${t.slug}: metaTitle에 도구 이름이 없다`);
    assert.ok(t.long.length >= 40, `${t.slug}: 설명이 너무 짧다 (${t.long.length}자)`);
    assert.ok(t.features.length >= 3, `${t.slug}: 기능 설명이 ${t.features.length}개뿐`);
    assert.match(t.gradient, /^from-\S+ to-\S+$/, `${t.slug}: gradient 형식이 다르다`);
    assert.ok(t.og.every(c => /^#[0-9a-f]{6}$/.test(c)), `${t.slug}: OG 색이 hex가 아니다`);
  }
});

test('제목과 설명이 서로 겹치지 않는다', () => {
  for (const key of ['metaTitle', 'long'] as const) {
    const vals = GAME_TOOLS.map(t => t[key]);
    const dup = [...new Set(vals.filter((v, i) => vals.indexOf(v) !== i))];
    assert.deepEqual(dup, [], `${key}가 겹친다: ${dup.join(' / ')}`);
  }
});

test('상세 페이지는 공용 셸을 쓴다', () => {
  const bad: string[] = [];
  for (const t of GAME_TOOLS) {
    const src = readFileSync(join(APP, t.slug, 'page.tsx'), 'utf8');
    if (!src.includes('GameShell')) bad.push(`${t.slug}: 셸 미사용`);
    if (!src.includes(`slug="${t.slug}"`)) bad.push(`${t.slug}: 셸에 넘긴 slug가 다르다`);
    if (!src.includes(`canonical: '/game/${t.slug}'`)) bad.push(`${t.slug}: canonical 없음`);
    if (/min-h-screen|<h1/.test(src)) bad.push(`${t.slug}: 페이지가 직접 레이아웃을 그린다`);
  }
  assert.deepEqual(bad, [], `셸 규약 위반:\n  ${bad.join('\n  ')}`);
});

test('모든 도구에 FAQ가 있다', () => {
  const missing = GAME_TOOLS.filter(t => (SECTION_FAQ[`game/${t.slug}`] ?? []).length < 2).map(t => t.slug);
  assert.deepEqual(missing, [], `FAQ가 2개 미만인 도구: ${missing.join(', ')}`);
  assert.ok((SECTION_FAQ.game ?? []).length >= 3, '허브 FAQ가 부족하다');
});

test('허브가 모든 도구를 링크한다', () => {
  const hub = readFileSync(join(APP, 'page.tsx'), 'utf8');
  const declared = /const CATEGORY_ORDER = \[([^\]]+)\]/.exec(hub);
  assert.ok(declared, '허브에서 카테고리 목록을 찾지 못함');
  const known = new Set(declared[1].match(/'([^']+)'/g)?.map(s => s.slice(1, -1)));
  const orphan = GAME_TOOLS.filter(t => !known.has(t.category)).map(t => `${t.slug}(${t.category})`);
  assert.deepEqual(orphan, [], `허브에 안 그려지는 도구: ${orphan.join(', ')}`);
});

test('검색 인덱스·사이트맵·푸터가 이 섹션을 싣는다', () => {
  const index = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(index.includes('GAME_TOOLS'), '검색 인덱스가 이 섹션을 싣지 않는다');
  assert.ok(index.includes('game:'), 'SECTION_META에 game가 없다');

  const sitemap = readFileSync(appJoin('sitemap.ts'), 'utf8');
  assert.ok(sitemap.includes('/game'), '사이트맵에 허브가 없다');
  assert.ok(sitemap.includes('GAME_TOOLS'), '사이트맵에 상세 페이지가 없다');

  const footer = footerSrc();
  assert.ok(footer.includes('"/game"'), '푸터에 이 섹션이 없다');
});

test('관련 도구 추천이 자기 자신을 넣지 않는다', () => {
  for (const t of GAME_TOOLS) {
    const related = relatedGameTools(t.slug);
    assert.ok(related.length > 0, `${t.slug}: 추천이 비어 있다`);
    assert.ok(!related.some(r => r.slug === t.slug), `${t.slug}: 자기 자신을 추천한다`);
    assert.equal(new Set(related.map(r => r.slug)).size, related.length, `${t.slug}: 추천에 중복이 있다`);
  }
});

test('없는 slug로는 도구를 찾지 못한다', () => {
  assert.equal(findGameTool('없는도구'), undefined);
  assert.deepEqual(relatedGameTools('없는도구'), []);
});
