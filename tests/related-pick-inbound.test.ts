import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { pickRelated, type RelatedItem } from '../lib/related.ts';

/**
 * `pickRelated`를 쓰는 네 섹션도 낱장마다 들어오는 링크가 있는지 본다.
 *
 * tests/related-inbound.test.ts는 `relatedFor`(lib/related-rotate.ts)를 쓰는
 * 열두 섹션만 본다. test·quiz·checklist·generator는 **다른 함수**를 쓰기 때문에
 * 그 검사에 안 걸린다. 즉 지금까지 이 네 섹션은 아무도 안 재고 있었다.
 *
 * `pickRelated`에는 "마지막 한 칸은 목록상 바로 다음 항목"이라는 고리가 있어서
 * 원리상 고아가 안 생겨야 한다. 그런데 174/504가 고아였던 앞선 일도
 * "같은 갈래를 먼저 채우니 괜찮겠지"라는 같은 종류의 믿음 때문이었다.
 * 재지 않으면 모르는 것이다.
 *
 * **왜 소스를 읽나**: lib/test-data.ts 같은 집계 파일은 하위 파일을 확장자 없이
 * import해서 node가 직접 못 읽는다(tests/test-data-quality.test.ts에 같은 제약이
 * 적혀 있다). pickRelated가 보는 것은 slug과 category뿐이라 그 둘만 뽑아 쓴다.
 *
 * **순서가 중요하다.** 고리도 쏠림도 배열 순서로 정해지는데, 파일 이름을
 * 알파벳순으로 읽으면 test는 a → aa → ab → … → b가 되어 실제 배열(A → B → … → AH)과
 * 어긋난다. 그래서 집계 파일의 전개(`...TESTS_A`) 순서를 그대로 따라간다.
 */
const LIB = join(import.meta.dirname, '..', 'lib');

/** `slug`과 `category` — 작은따옴표꼴과 JSON꼴(`"slug": "…"`)이 섞여 있다. */
const FIELD = /["']?\b(slug|category)\b["']?:\s*["']([^"']+)["']/g;

/**
 * 한 항목 안에서 slug이 먼저 나오고 category가 뒤따르는 꼴이라 순서대로 짝짓는다.
 * 짝이 안 맞으면 그 항목은 버려지고, 그러면 아래 개수 검사에서 드러난다.
 */
function itemsIn(src: string, constName: string): RelatedItem[] {
  // checklist는 `export` 없이 `const CHECKLISTS`로 두고 아래에서 합친다.
  const at = src.search(new RegExp(String.raw`(?:export )?const ${constName}\b`));
  if (at < 0) return [];
  const open = src.indexOf('[', at);
  if (open < 0) return [];
  const close = src.indexOf('\n];', open); // 배열 몸통은 맨 왼쪽 `];`에서 끝난다
  const body = src.slice(open, close < 0 ? undefined : close);

  const out: RelatedItem[] = [];
  let slug: string | null = null;
  for (const m of body.matchAll(FIELD)) {
    if (m[1] === 'slug') slug = m[2];
    else if (slug) {
      out.push({ slug, title: slug, desc: '', icon: '', category: m[2] });
      slug = null;
    }
  }
  return out;
}

/**
 * 집계 파일을 읽어 실제 배열 순서대로 항목을 모은다.
 * `...TESTS_AG` 같은 전개마다 그 이름이 어디서 왔는지 import 줄로 찾아간다.
 */
function sectionItems(section: string): RelatedItem[] {
  const path = join(LIB, `${section}-data.ts`);
  const src = readFileSync(path, 'utf8');
  const from = new Map<string, string>();
  for (const m of src.matchAll(/import \{ (\w+) \} from '\.\/([\w-]+)(?:\.ts)?'/g)) from.set(m[1], m[2]);

  const out: RelatedItem[] = [];
  for (const m of src.matchAll(/\.\.\.(\w+),/g)) {
    const name = m[1];
    const file = from.get(name);
    const owner = file ? join(LIB, `${file}.ts`) : path; // 집계 파일 안에 그대로 있는 것도 있다
    if (!existsSync(owner)) continue;
    out.push(...itemsIn(readFileSync(owner, 'utf8'), name));
  }
  return out;
}

const SECTIONS = ['test', 'quiz', 'checklist', 'generator'].map(
  name => [name, sectionItems(name)] as const,
);

test('네 섹션의 목록을 실제 배열 순서대로 읽어 왔다', () => {
  /*
   * 파일 꼴이 바뀌면 위 파싱이 0개를 내고, 그러면 아래 검사가 아무것도 안 보면서
   * 초록으로 통과한다. 빈 검사를 막는다 —
   * 개수는 화면이 말하는 수(TESTS.length 등)와 같아야 한다.
   */
  const seen = Object.fromEntries(SECTIONS.map(([n, i]) => [n, i.length]));
  assert.deepEqual(
    Object.entries(seen).filter(([, n]) => n < 10).map(([n]) => n),
    [],
    `너무 적게 읽혔다 — 파싱이 안 맞는 것이다: ${JSON.stringify(seen)}`,
  );
  for (const [name, items] of SECTIONS) {
    const uniq = new Set(items.map(i => i.slug));
    assert.equal(uniq.size, items.length, `${name}: slug이 겹치게 읽혔다 (${items.length} → ${uniq.size})`);
  }
});

test('낱장마다 들어오는 내부 링크가 하나 이상 있다', () => {
  const bad: string[] = [];
  for (const [name, items] of SECTIONS) {
    const inbound = new Map(items.map(i => [i.slug, 0]));
    for (const i of items) {
      for (const r of pickRelated(items, i.slug)) inbound.set(r.slug, (inbound.get(r.slug) ?? 0) + 1);
    }
    const orphans = [...inbound].filter(([, n]) => n === 0).map(([s]) => s);
    if (orphans.length) bad.push(`${name}: ${orphans.length}/${items.length} (${orphans.slice(0, 4).join(', ')}…)`);
  }
  assert.deepEqual(bad, [], `사이트맵에만 있고 안에서 아무도 안 가리키는 낱장:\n  ${bad.join('\n  ')}`);
});

test('관련 항목이 자기 자신을 가리키지 않고 겹치지도 않는다', () => {
  const bad: string[] = [];
  for (const [name, items] of SECTIONS) {
    for (const i of items) {
      const picked = pickRelated(items, i.slug);
      if (picked.some(r => r.slug === i.slug)) bad.push(`${name}/${i.slug}: 자기 자신을 가리킨다`);
      if (new Set(picked.map(r => r.slug)).size !== picked.length) bad.push(`${name}/${i.slug}: 같은 항목이 두 번`);
    }
  }
  assert.deepEqual(bad, [], bad.join('\n  '));
});

test('링크가 목록 앞쪽으로 쏠리지 않는다', () => {
  /*
   * 고아가 없다는 것만으로는 부족하다. 고리 덕에 모두 하나는 받지만 나머지
   * 다섯 칸이 전부 앞쪽으로 가면, 뒤에 붙인 낱장은 사실상 링크 하나짜리다.
   * 새 항목은 언제나 목록 끝에 붙으므로 이쪽이 실제로 걸리는 지점이다.
   * 고르게 나뉘면 5할이고, 3할을 밑돌면 쏠린 것으로 본다.
   */
  const bad: string[] = [];
  for (const [name, items] of SECTIONS) {
    const at = new Map(items.map((i, n) => [i.slug, n]));
    const half = Math.floor(items.length / 2);
    let back = 0;
    let all = 0;
    for (const i of items) {
      for (const r of pickRelated(items, i.slug)) {
        all++;
        if ((at.get(r.slug) ?? 0) >= half) back++;
      }
    }
    if (back / all < 0.3) bad.push(`${name}: 뒤쪽 절반이 받는 링크가 ${((back / all) * 100).toFixed(1)}%뿐`);
  }
  assert.deepEqual(bad, [], `링크가 목록 앞쪽에 쏠린다:\n  ${bad.join('\n  ')}`);
});
