import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { IMAGE_TOOLS, findImageTool, relatedImageTools } from '../lib/image-tools.ts';
import { SECTION_FAQ } from '../lib/section-faq.ts';
import { appEntries, appJoin } from './app-path.ts';

const ROOT = join(import.meta.dirname, '..');
const APP = appJoin('image');

/**
 * 기기 점검과 같은 구조다 — 카탈로그(lib/image-tools.ts) 하나를 허브·상세 셸·
 * 검색 인덱스·사이트맵·FAQ가 나눠 읽는다. 도구를 늘리다가 한 곳을 빠뜨리면
 * 화면에는 보이는데 검색에서 안 나오거나 색인이 안 된다.
 */

test('도구마다 페이지와 OG 이미지가 있다', () => {
  const missing: string[] = [];
  for (const t of IMAGE_TOOLS) {
    if (!existsSync(join(APP, t.slug, 'page.tsx'))) missing.push(`${t.slug}/page.tsx`);
    if (!existsSync(join(APP, t.slug, 'opengraph-image.tsx'))) missing.push(`${t.slug}/opengraph-image.tsx`);
  }
  assert.deepEqual(missing, [], `없는 파일: ${missing.join(', ')}`);
});

test('페이지 폴더마다 카탈로그 항목이 있다', () => {
  const orphans = readdirSync(APP, { withFileTypes: true })
    .filter(e => e.isDirectory())
    // size는 도구가 아니라 이미지 크기 116가지를 그리는 자료 갈래다 —
    // 목록이 lib/imgsize/list.ts에서 오므로 도구 카탈로그가 셀 대상이 아니다
    .filter(e => e.name !== 'size')
    .map(e => e.name)
    .filter(name => !findImageTool(name));
  assert.deepEqual(orphans, [], `카탈로그에 없는 페이지 폴더: ${orphans.join(', ')}`);
});

test('이미지 크기 라우트는 크기 목록에서 페이지를 만든다', () => {
  // 위 검사에서 size를 빼 주었으니, 그 라우트가 실제로 크기 목록을 쓰는지 여기서 본다
  const src = readFileSync(join(APP, 'size', '[slug]', 'page.tsx'), 'utf8');
  assert.ok(src.includes('sizeParams'), '[slug] 라우트가 크기 목록을 돌지 않는다');
  assert.ok(src.includes('generateStaticParams'), '[slug] 라우트가 정적 경로를 만들지 않는다');
  assert.ok(existsSync(join(APP, 'size', 'page.tsx')), '이미지 크기 목록 페이지가 없다');
});

test('slug가 중복되지 않는다', () => {
  const slugs = IMAGE_TOOLS.map(t => t.slug);
  const dup = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
  assert.deepEqual(dup, [], `중복 slug: ${dup.join(', ')}`);
});

test('메타데이터가 비어 있지 않다', () => {
  for (const t of IMAGE_TOOLS) {
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
    const vals = IMAGE_TOOLS.map(t => t[key]);
    const dup = [...new Set(vals.filter((v, i) => vals.indexOf(v) !== i))];
    assert.deepEqual(dup, [], `${key}가 겹친다: ${dup.join(' / ')}`);
  }
});

test('상세 페이지는 공용 셸을 쓴다', () => {
  const bad: string[] = [];
  for (const t of IMAGE_TOOLS) {
    const src = readFileSync(join(APP, t.slug, 'page.tsx'), 'utf8');
    if (!src.includes('ImageShell')) bad.push(`${t.slug}: 셸 미사용`);
    if (!src.includes(`slug="${t.slug}"`)) bad.push(`${t.slug}: 셸에 넘긴 slug가 다르다`);
    if (!src.includes(`canonical: '/image/${t.slug}'`)) bad.push(`${t.slug}: canonical 없음`);
    if (/min-h-screen|<h1/.test(src)) bad.push(`${t.slug}: 페이지가 직접 레이아웃을 그린다`);
  }
  assert.deepEqual(bad, [], `셸 규약 위반:\n  ${bad.join('\n  ')}`);
});

test('모든 도구에 FAQ가 있다', () => {
  const missing = IMAGE_TOOLS.filter(t => (SECTION_FAQ[`image/${t.slug}`] ?? []).length < 2).map(t => t.slug);
  assert.deepEqual(missing, [], `FAQ가 2개 미만인 도구: ${missing.join(', ')}`);
  assert.ok((SECTION_FAQ.image ?? []).length >= 3, '허브 FAQ가 부족하다');
});

test('허브가 모든 도구를 링크한다', () => {
  const hub = readFileSync(join(APP, 'page.tsx'), 'utf8');
  const declared = /const CATEGORY_ORDER = \[([^\]]+)\]/.exec(hub);
  assert.ok(declared, '허브에서 카테고리 목록을 찾지 못함');
  const known = new Set(declared[1].match(/'([^']+)'/g)?.map(s => s.slice(1, -1)));
  const orphan = IMAGE_TOOLS.filter(t => !known.has(t.category)).map(t => `${t.slug}(${t.category})`);
  assert.deepEqual(orphan, [], `허브에 안 그려지는 도구: ${orphan.join(', ')}`);
});

test('검색 인덱스·사이트맵·푸터가 이 섹션을 싣는다', () => {
  const index = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(index.includes('IMAGE_TOOLS'), '검색 인덱스가 이미지 도구를 싣지 않는다');
  assert.ok(index.includes('image:'), 'SECTION_META에 image가 없다');

  const sitemap = readFileSync(appJoin('sitemap.ts'), 'utf8');
  assert.ok(sitemap.includes('/image'), '사이트맵에 허브가 없다');
  assert.ok(sitemap.includes('IMAGE_TOOLS'), '사이트맵에 상세 페이지가 없다');

  const footer = readFileSync(join(ROOT, 'components', 'SiteFooter.tsx'), 'utf8');
  assert.ok(footer.includes('"/image"'), '푸터에 이미지 도구가 없다');
});

test('편집 컴포넌트가 사진을 밖으로 내보내지 않는다', () => {
  // 이 섹션의 약속은 "사진이 브라우저를 벗어나지 않는다"이다. 코드에 업로드
  // 경로가 생기면 그 약속이 조용히 깨진다. FAQ와 안내 문구가 거짓이 되는 순간이다.
  const dir = join(ROOT, 'components', 'image');
  const offenders: string[] = [];
  for (const file of readdirSync(dir).filter(f => f.endsWith('.tsx'))) {
    const src = readFileSync(join(dir, file), 'utf8');
    if (/\bfetch\s*\(|XMLHttpRequest|navigator\.sendBeacon|new WebSocket/.test(src)) {
      offenders.push(file);
    }
  }
  assert.deepEqual(offenders, [], `사진을 전송할 수 있는 코드가 있다: ${offenders.join(', ')}`);
});

test('관련 도구 추천이 자기 자신을 넣지 않는다', () => {
  for (const t of IMAGE_TOOLS) {
    const related = relatedImageTools(t.slug);
    assert.ok(related.length > 0, `${t.slug}: 추천이 비어 있다`);
    assert.ok(!related.some(r => r.slug === t.slug), `${t.slug}: 자기 자신을 추천한다`);
    assert.equal(new Set(related.map(r => r.slug)).size, related.length, `${t.slug}: 추천에 중복이 있다`);
  }
});

test('같은 카테고리를 먼저 추천한다', () => {
  const compress = relatedImageTools('compress');
  assert.equal(compress[0].category, '용량·크기', `첫 추천이 ${compress[0].category}`);
});

test('없는 slug로는 도구를 찾지 못한다', () => {
  assert.equal(findImageTool('없는도구'), undefined);
  assert.deepEqual(relatedImageTools('없는도구'), []);
});
