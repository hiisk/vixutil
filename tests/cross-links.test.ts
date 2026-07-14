import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CROSS_LINKS } from '../lib/cross-links.ts';
import { CHECKLISTS } from '../lib/checklist-data.ts';

const ROOT = join(import.meta.dirname, '..');

const checklistSlugs = new Set(CHECKLISTS.map(c => c.slug));
const calcExists = (slug: string) => existsSync(join(ROOT, 'app', 'calculator', slug, 'page.tsx'));

/** '/calculator/foo' 또는 '/checklist/bar'가 실재하는지 */
function routeExists(href: string): boolean {
  const [, section, slug] = href.split('/');
  if (section === 'calculator') return calcExists(slug);
  if (section === 'checklist') return checklistSlugs.has(slug);
  return false;
}

test('교차 링크의 출발점이 실재한다', () => {
  const bad = Object.keys(CROSS_LINKS).filter(k => !routeExists('/' + k));
  assert.deepEqual(bad, [], `존재하지 않는 페이지에 걸린 교차 링크: ${bad.join(', ')}`);
});

test('교차 링크의 도착점이 실재한다', () => {
  // 404로 보내는 추천은 없느니만 못하다.
  const bad: string[] = [];
  for (const [from, links] of Object.entries(CROSS_LINKS)) {
    for (const l of links) {
      if (!routeExists(l.href)) bad.push(`${from} → ${l.href}`);
    }
  }
  assert.deepEqual(bad, [], `없는 곳을 가리키는 링크:\n  ${bad.join('\n  ')}`);
});

test('자기 자신을 추천하지 않는다', () => {
  const self: string[] = [];
  for (const [from, links] of Object.entries(CROSS_LINKS)) {
    for (const l of links) {
      if (l.href.replace(/^\//, '') === from) self.push(from);
    }
  }
  assert.deepEqual(self, [], `자기 자신을 가리킴: ${self.join(', ')}`);
});

test('각 링크에 제목·이유·아이콘이 있다', () => {
  // "왜 지금 이게 필요한지"가 없으면 클릭할 이유가 없다.
  for (const [from, links] of Object.entries(CROSS_LINKS)) {
    assert.ok(links.length > 0, `${from}: 링크가 비어 있다`);
    for (const l of links) {
      assert.ok(l.title?.trim(), `${from} → ${l.href}: 제목 없음`);
      assert.ok(l.why?.trim().length >= 10, `${from} → ${l.href}: 이유가 너무 짧다`);
      assert.ok(l.icon?.trim(), `${from} → ${l.href}: 아이콘 없음`);
    }
  }
});

test('한 페이지 안에 중복 링크가 없다', () => {
  for (const [from, links] of Object.entries(CROSS_LINKS)) {
    const hrefs = links.map(l => l.href);
    assert.equal(new Set(hrefs).size, hrefs.length, `${from}: 같은 곳을 두 번 추천한다`);
  }
});

test('계산기 페이지가 CrossLinks를 렌더한다', () => {
  // CalcShell에 들어 있어야 92개 계산기 전부에 자동 노출된다.
  const shell = readFileSync(join(ROOT, 'components', 'CalcShell.tsx'), 'utf8');
  assert.ok(shell.includes('<CrossLinks'), 'CalcShell이 CrossLinks를 렌더하지 않는다');

  const checklistPage = readFileSync(join(ROOT, 'app', 'checklist', '[slug]', 'page.tsx'), 'utf8');
  assert.ok(checklistPage.includes('<CrossLinks'), '체크리스트 상세가 CrossLinks를 렌더하지 않는다');
});
