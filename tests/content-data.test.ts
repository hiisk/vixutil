import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CHECKLISTS } from '../lib/checklist-data.ts';

const ROOT = join(import.meta.dirname, '..');
const LIB = join(ROOT, 'lib');

/**
 * test/quiz/generator 데이터는 aggregator가 확장자 없이 import해 node로 직접
 * 로드할 수 없다. 소스를 읽어 slug와 category를 뽑는다. 두 따옴표 스타일이
 * 섞여 있어 둘 다 받는다.
 */
function itemsFromSource(prefix: string): { slug: string; category: string }[] {
  const files = readdirSync(LIB).filter(f => f.startsWith(`${prefix}-data-`) && f.endsWith('.ts'));
  assert.ok(files.length > 0, `${prefix} 데이터 파일을 찾지 못함`);

  const out: { slug: string; category: string }[] = [];
  const re = /["']?slug["']?:\s*["']([^"']+)["'][\s\S]{0,600}?["']?category["']?:\s*["']([^"']+)["']/g;
  for (const f of files) {
    const src = readFileSync(join(LIB, f), 'utf8');
    for (const m of src.matchAll(re)) out.push({ slug: m[1], category: m[2] });
  }
  return out;
}

/** 허브의 카테고리 목록은 컴포넌트에 하드코딩돼 있다. 소스에서 그대로 읽어와 대조한다. */
function hubCategories(component: string): string[] {
  const src = readFileSync(join(ROOT, 'components', component), 'utf8');
  const m = src.match(/const CATEGORIES = \[([^\]]+)\]/);
  assert.ok(m, `${component}: CATEGORIES 선언을 찾지 못함`);
  return [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
}

const SECTIONS = [
  { name: 'test',      hub: 'TestSearch.tsx',      items: itemsFromSource('test') },
  { name: 'quiz',      hub: 'QuizSearch.tsx',      items: itemsFromSource('quiz') },
  { name: 'generator', hub: 'GeneratorSearch.tsx', items: itemsFromSource('generator') },
  { name: 'checklist', hub: 'ChecklistSearch.tsx', items: CHECKLISTS.map(c => ({ slug: c.slug, category: c.category })) },
];

test('데이터가 실제로 수집된다', () => {
  for (const { name, items } of SECTIONS) {
    assert.ok(items.length > 20, `${name}: ${items.length}개만 수집됨 — 파싱이 깨졌을 수 있다`);
  }
});

test('모든 콘텐츠의 카테고리가 해당 허브 목록에 있다', () => {
  // 허브는 CATEGORIES를 돌면서 그 카테고리에 속한 항목만 그린다.
  // 목록에 없는 카테고리를 쓰면 그 항목은 허브 어디에도 나타나지 않는다 —
  // 페이지는 빌드되고 사이트맵에도 실리지만 사람이 클릭해 닿을 수 없는 유령이 된다.
  const problems: string[] = [];
  for (const { name, hub, items } of SECTIONS) {
    const known = new Set(hubCategories(hub));
    for (const i of items) {
      if (!known.has(i.category)) problems.push(`${name}/${i.slug} → "${i.category}"`);
    }
  }
  assert.deepEqual(problems, [], `허브에 안 보이는 콘텐츠:\n  ${problems.join('\n  ')}`);
});

test('허브 카테고리 탭에 빈 칸이 없다', () => {
  // 항목이 하나도 없는 카테고리 탭은 눌러도 빈 화면만 나온다.
  const empty: string[] = [];
  for (const { name, hub, items } of SECTIONS) {
    const used = new Set(items.map(i => i.category));
    for (const c of hubCategories(hub)) if (!used.has(c)) empty.push(`${name} → "${c}"`);
  }
  assert.deepEqual(empty, [], `항목이 없는 카테고리 탭:\n  ${empty.join('\n  ')}`);
});

test('NEW 배지 목록이 실제 존재하는 slug만 가리킨다', async () => {
  // 오타나 삭제된 slug가 남아 있으면 배지가 조용히 안 뜬다.
  const mod = await import('../lib/new-content.ts');
  const registries: Record<string, Set<string>> = {
    test: mod.NEW_TEST_SLUGS,
    quiz: mod.NEW_QUIZ_SLUGS,
    generator: mod.NEW_GENERATOR_SLUGS,
    checklist: mod.NEW_CHECKLIST_SLUGS,
  };

  const bad: string[] = [];
  for (const { name, items } of SECTIONS) {
    const known = new Set(items.map(i => i.slug));
    for (const slug of registries[name]) {
      if (!known.has(slug)) bad.push(`${name}/${slug}`);
    }
  }
  assert.deepEqual(bad, [], `존재하지 않는 slug를 가리키는 NEW 배지: ${bad.join(', ')}`);
});

test('섹션 안에서 slug가 중복되지 않는다', () => {
  for (const { name, items } of SECTIONS) {
    const slugs = items.map(i => i.slug);
    const dup = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
    assert.deepEqual(dup, [], `${name}: 중복 slug ${dup.join(', ')}`);
  }
});

test('체크리스트 항목 id가 같은 체크리스트 안에서 중복되지 않는다', () => {
  // ChecklistEngine이 id를 Set으로 관리하므로 중복되면 체크가 함께 켜지고 꺼진다.
  for (const c of CHECKLISTS) {
    const ids = c.sections.flatMap(s => s.items.map(i => i.id));
    const dup = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    assert.deepEqual(dup, [], `${c.slug}: 중복 항목 id ${dup.join(', ')}`);
  }
});

test('체크리스트에 빈 섹션이나 빈 항목이 없다', () => {
  for (const c of CHECKLISTS) {
    assert.ok(c.sections.length > 0, `${c.slug}: 섹션이 없다`);
    assert.ok(c.title?.trim() && c.desc?.trim() && c.icon?.trim(), `${c.slug}: 제목·설명·아이콘 누락`);
    for (const s of c.sections) {
      assert.ok(s.items.length > 0, `${c.slug} / ${s.title}: 항목이 없다`);
      for (const i of s.items) assert.ok(i.text.trim(), `${c.slug}: 빈 항목 텍스트`);
    }
  }
});
