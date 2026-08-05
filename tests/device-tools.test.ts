import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { DEVICE_TOOLS, findDeviceTool, relatedDeviceTools } from '../lib/device-tools.ts';
import { SECTION_FAQ } from '../lib/section-faq.ts';
import { appEntries, appJoin } from './app-path.ts';
import { hasOwnCard } from '../lib/og-cards/index.ts';

const ROOT = join(import.meta.dirname, '..');
const APP = appJoin('device');

/**
 * 기기 점검 섹션은 카탈로그(lib/device-tools.ts) 하나를 여러 곳이 나눠 읽는다 —
 * 허브 카드, 상세 셸, 검색 인덱스, 사이트맵, FAQ. 도구를 추가하면서 그중 하나를
 * 빠뜨리면 화면에는 멀쩡히 보이는데 검색에서 안 나오거나 색인이 안 된다.
 * 그 어긋남을 여기서 잡는다.
 */

test('도구마다 페이지와 OG 이미지가 있다', () => {
  const missing: string[] = [];
  for (const t of DEVICE_TOOLS) {
    if (!existsSync(join(APP, t.slug, 'page.tsx'))) missing.push(`${t.slug}/page.tsx`);
    // 카드는 이제 파일이 아니라 lib/og-cards의 대응표에 있다
    if (!hasOwnCard(`/device/${t.slug}`)) missing.push(`/device/${t.slug} 공유 카드`);
  }
  assert.deepEqual(missing, [], `없는 파일: ${missing.join(', ')}`);
});

test('페이지 폴더마다 카탈로그 항목이 있다', () => {
  // 반대 방향도 본다 — 카탈로그에서 지웠는데 폴더가 남으면 허브에서 닿을 수 없는
  // 고아 페이지가 색인된다.
  const orphans = readdirSync(APP, { withFileTypes: true })
    .filter(e => e.isDirectory())
    // screen은 점검 도구가 아니라 화면 규격 108가지를 그리는 자료 갈래다 —
    // 목록이 lib/device/screens.ts에서 오므로 도구 카탈로그가 셀 대상이 아니다
    .filter(e => e.name !== 'screen')
    .map(e => e.name)
    .filter(name => !findDeviceTool(name));
  assert.deepEqual(orphans, [], `카탈로그에 없는 페이지 폴더: ${orphans.join(', ')}`);
});

test('화면 규격 라우트는 화면 목록에서 페이지를 만든다', () => {
  // 위 검사에서 screen을 빼 주었으니, 그 라우트가 실제로 화면 목록을 쓰는지 여기서 본다
  const src = readFileSync(join(APP, 'screen', '[slug]', 'page.tsx'), 'utf8');
  assert.ok(src.includes('screenParams'), '[slug] 라우트가 화면 목록을 돌지 않는다');
  assert.ok(src.includes('generateStaticParams'), '[slug] 라우트가 정적 경로를 만들지 않는다');
  assert.ok(existsSync(join(APP, 'screen', 'page.tsx')), '화면 규격 목록 페이지가 없다');
});

test('slug가 중복되지 않는다', () => {
  const slugs = DEVICE_TOOLS.map(t => t.slug);
  const dup = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
  assert.deepEqual(dup, [], `중복 slug: ${dup.join(', ')}`);
});

test('메타데이터가 비어 있지 않다', () => {
  for (const t of DEVICE_TOOLS) {
    assert.ok(t.title.trim(), `${t.slug}: title 없음`);
    assert.ok(t.desc.trim().length >= 8, `${t.slug}: desc가 너무 짧다`);
    assert.ok(t.metaTitle.includes(t.title), `${t.slug}: metaTitle에 도구 이름이 없다`);
    assert.ok(t.long.length >= 40, `${t.slug}: 설명이 너무 짧다 (${t.long.length}자)`);
    assert.ok(t.checks.length >= 3, `${t.slug}: 점검 항목이 ${t.checks.length}개뿐`);
    assert.match(t.gradient, /^from-\S+ to-\S+$/, `${t.slug}: gradient 형식이 다르다`);
    assert.ok(t.og.every(c => /^#[0-9a-f]{6}$/.test(c)), `${t.slug}: OG 색이 hex가 아니다`);
  }
});

test('제목과 설명이 서로 겹치지 않는다', () => {
  // 같은 title/description이 둘 이상이면 검색엔진이 중복 페이지로 보고 하나만 색인한다.
  for (const key of ['metaTitle', 'long'] as const) {
    const vals = DEVICE_TOOLS.map(t => t[key]);
    const dup = [...new Set(vals.filter((v, i) => vals.indexOf(v) !== i))];
    assert.deepEqual(dup, [], `${key}가 겹친다: ${dup.join(' / ')}`);
  }
});

test('상세 페이지는 공용 셸을 쓴다', () => {
  // 셸이 h1·글로우·breadcrumb·FAQ를 책임진다. 페이지가 직접 화면을 그리기 시작하면
  // h1이 둘이 되거나 구조화 데이터가 빠진다.
  const bad: string[] = [];
  for (const t of DEVICE_TOOLS) {
    const src = readFileSync(join(APP, t.slug, 'page.tsx'), 'utf8');
    if (!src.includes('DeviceShell')) bad.push(`${t.slug}: 셸 미사용`);
    if (!src.includes(`slug="${t.slug}"`)) bad.push(`${t.slug}: 셸에 넘긴 slug가 다르다`);
    if (!src.includes(`canonical: '/device/${t.slug}'`)) bad.push(`${t.slug}: canonical 없음`);
    if (/min-h-screen|<h1/.test(src)) bad.push(`${t.slug}: 페이지가 직접 레이아웃을 그린다`);
  }
  assert.deepEqual(bad, [], `셸 규약 위반:\n  ${bad.join('\n  ')}`);
});

test('모든 도구에 FAQ가 있다', () => {
  const missing = DEVICE_TOOLS.filter(t => (SECTION_FAQ[`device/${t.slug}`] ?? []).length < 2).map(t => t.slug);
  assert.deepEqual(missing, [], `FAQ가 2개 미만인 도구: ${missing.join(', ')}`);
  assert.ok((SECTION_FAQ.device ?? []).length >= 3, '허브 FAQ가 부족하다');
});

test('허브가 모든 도구를 링크한다', () => {
  // 허브는 카탈로그를 순회하므로 코드로는 안 빠지지만, 카테고리로 나눠 그리기 때문에
  // 카탈로그에 없는 카테고리를 쓰면 그 도구만 화면에서 사라진다.
  const hub = readFileSync(join(APP, 'page.tsx'), 'utf8');
  const declared = /const CATEGORY_ORDER = \[([^\]]+)\]/.exec(hub);
  assert.ok(declared, '허브에서 카테고리 목록을 찾지 못함');
  const known = new Set(declared[1].match(/'([^']+)'/g)?.map(s => s.slice(1, -1)));
  const orphan = DEVICE_TOOLS.filter(t => !known.has(t.category)).map(t => `${t.slug}(${t.category})`);
  assert.deepEqual(orphan, [], `허브에 안 그려지는 도구: ${orphan.join(', ')}`);
});

test('검색 인덱스와 사이트맵이 이 섹션을 싣는다', () => {
  // search-index.ts는 확장자 없는 import 때문에 node로 직접 못 불러온다 — 소스를 본다.
  const index = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(index.includes('DEVICE_TOOLS'), '검색 인덱스가 기기 점검을 싣지 않는다');
  assert.ok(index.includes("device:"), 'SECTION_META에 device가 없다');

  const sitemap = readFileSync(appJoin('sitemap.ts'), 'utf8');
  assert.ok(sitemap.includes('/device'), '사이트맵에 허브가 없다');
  assert.ok(sitemap.includes('DEVICE_TOOLS'), '사이트맵에 상세 페이지가 없다');

  const footer = readFileSync(join(ROOT, 'components', 'SiteFooter.tsx'), 'utf8');
  assert.ok(footer.includes('"/device"'), '푸터에 기기 점검이 없다');
});

test('관련 도구 추천이 자기 자신을 넣지 않는다', () => {
  for (const t of DEVICE_TOOLS) {
    const related = relatedDeviceTools(t.slug);
    assert.ok(related.length > 0, `${t.slug}: 추천이 비어 있다`);
    assert.ok(!related.some(r => r.slug === t.slug), `${t.slug}: 자기 자신을 추천한다`);
    assert.equal(new Set(related.map(r => r.slug)).size, related.length, `${t.slug}: 추천에 중복이 있다`);
  }
});

test('같은 카테고리를 먼저 추천한다', () => {
  // 키보드를 보다가 다음에 볼 만한 건 마우스지, 기기 정보가 아니다.
  const keyboard = relatedDeviceTools('keyboard');
  assert.equal(keyboard[0].category, '입력장치', `첫 추천이 ${keyboard[0].category}`);
});

test('없는 slug로는 도구를 찾지 못한다', () => {
  assert.equal(findDeviceTool('없는도구'), undefined);
  assert.deepEqual(relatedDeviceTools('없는도구'), []);
});
