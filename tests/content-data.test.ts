import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CHECKLISTS } from '../lib/checklist-data.ts';

const ROOT = join(import.meta.dirname, '..');

/** 허브의 카테고리 목록은 컴포넌트에 하드코딩돼 있다. 소스에서 그대로 읽어와 대조한다. */
function hubCategories(component: string): string[] {
  const src = readFileSync(join(ROOT, 'components', component), 'utf8');
  const m = src.match(/const CATEGORIES = \[([^\]]+)\]/);
  assert.ok(m, `${component}: CATEGORIES 선언을 찾지 못함`);
  return [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
}

test('모든 체크리스트의 카테고리가 허브 목록에 있다', () => {
  // 허브는 CATEGORIES를 돌면서 그 카테고리에 속한 항목만 그린다.
  // 목록에 없는 카테고리를 쓰면 그 체크리스트는 허브 어디에도 나타나지 않는다 —
  // 페이지는 빌드되지만 사람이 닿을 수 없는 유령이 된다.
  const known = new Set(hubCategories('ChecklistSearch.tsx'));
  const orphans = CHECKLISTS.filter(c => !known.has(c.category)).map(c => `${c.slug}(${c.category})`);
  assert.deepEqual(orphans, [], `허브에 안 보이는 체크리스트: ${orphans.join(', ')}`);
});

test('체크리스트 slug가 중복되지 않는다', () => {
  const slugs = CHECKLISTS.map(c => c.slug);
  const dup = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  assert.deepEqual(dup, [], `중복 slug: ${dup.join(', ')}`);
});

test('체크리스트 항목 id가 같은 체크리스트 안에서 중복되지 않는다', () => {
  // ChecklistEngine이 id를 Set으로 관리하므로 중복되면 체크가 함께 켜지고 꺼진다.
  for (const c of CHECKLISTS) {
    const ids = c.sections.flatMap(s => s.items.map(i => i.id));
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    assert.deepEqual(dup, [], `${c.slug}: 중복 항목 id ${dup.join(', ')}`);
  }
});

test('체크리스트에 빈 섹션이나 빈 항목이 없다', () => {
  for (const c of CHECKLISTS) {
    assert.ok(c.sections.length > 0, `${c.slug}: 섹션이 없다`);
    assert.ok(c.title && c.desc && c.icon, `${c.slug}: 제목·설명·아이콘 누락`);
    for (const s of c.sections) {
      assert.ok(s.items.length > 0, `${c.slug} / ${s.title}: 항목이 없다`);
      for (const i of s.items) {
        assert.ok(i.text.trim().length > 0, `${c.slug}: 빈 항목 텍스트`);
      }
    }
  }
});
