import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CROSS_LINKS } from '../lib/cross-links.ts';
import { CHECKLISTS } from '../lib/checklist-data.ts';
import { DEVICE_TOOLS } from '../lib/device-tools.ts';
import { IMAGE_TOOLS } from '../lib/image-tools.ts';
import { TEXT_TOOLS } from '../lib/text-tools.ts';
import { appJoin, koLeafSrc } from './app-path.ts';

const ROOT = join(import.meta.dirname, '..');

const checklistSlugs = new Set(CHECKLISTS.map(c => c.slug));
const deviceSlugs = new Set(DEVICE_TOOLS.map(t => t.slug));
const imageSlugs = new Set(IMAGE_TOOLS.map(t => t.slug));
const textSlugs = new Set(TEXT_TOOLS.map(t => t.slug));

/** 교차 링크가 오갈 수 있는 섹션의 경로가 실재하는지 */
function routeExists(href: string): boolean {
  // 계산기는 /calculator/dev/color처럼 한 단 더 들어가는 경로가 있어 나머지를 통째로 잇는다
  const [, section, ...rest] = href.split('/');
  if (section === 'calculator') return existsSync(appJoin('calculator', ...rest, 'page.tsx'));
  if (section === 'checklist') return checklistSlugs.has(rest[0]);
  if (section === 'device') return deviceSlugs.has(rest[0]);
  if (section === 'image') return imageSlugs.has(rest[0]);
  if (section === 'text') return textSlugs.has(rest[0]);
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

  const checklistPage = koLeafSrc('checklist');
  assert.ok(checklistPage.includes('<CrossLinks'), '체크리스트 상세가 CrossLinks를 렌더하지 않는다');

  // 기기 점검도 셸 하나가 열 페이지를 다 그린다 — 여기 빠지면 전부 빠진다.
  const deviceShell = readFileSync(join(ROOT, 'components', 'DeviceShell.tsx'), 'utf8');
  assert.ok(deviceShell.includes('<CrossLinks'), 'DeviceShell이 CrossLinks를 렌더하지 않는다');

  const imageShell = readFileSync(join(ROOT, 'components', 'ImageShell.tsx'), 'utf8');
  assert.ok(imageShell.includes('<CrossLinks'), 'ImageShell이 CrossLinks를 렌더하지 않는다');

  const textShell = readFileSync(join(ROOT, 'components', 'TextShell.tsx'), 'utf8');
  assert.ok(textShell.includes('<CrossLinks'), 'TextShell이 CrossLinks를 렌더하지 않는다');
});
