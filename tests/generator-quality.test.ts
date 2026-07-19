import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 생성기 데이터 품질.
 *
 * lib/generator-data.ts는 하위 파일을 확장자 없이 import해 node로 직접 로드할
 * 수 없다(tests/search-index.test.ts에 같은 제약이 적혀 있다). 하위 파일은
 * 통째로 JSON 배열이라 그대로 파싱한다.
 *
 * 실제로 발견된 문제: 같은 항목이 두 번 들어 있어 뽑기 결과가 중복될 수 있었다.
 * dog-name의 "쿠키", cat-name의 "마카롱", grocery-list의 "[신선] 두부",
 * random-city의 "세비야"가 각각 두 번씩 있었다. random-city에는 같은 도시를
 * "교토"와 "쿄토"로 나눠 적은 것도 있었다.
 */

const LIB = join(import.meta.dirname, '..', 'lib');

interface Gen {
  slug: string;
  title: string;
  desc: string;
  type?: string;
  items?: string[];
  pools?: string[][];
  _file: string;
}

function loadGenerators(): Gen[] {
  const out: Gen[] = [];
  const files = readdirSync(LIB).filter(f => /^generator-data-[a-z]+\.ts$/.test(f));
  for (const file of files) {
    const src = readFileSync(join(LIB, file), 'utf8').trim();
    const m = src.match(/=\s*(\[[\s\S]*\]);?$/);
    assert.ok(m, `${file}: 배열을 찾지 못했다`);
    const data = JSON.parse(m[1]) as Gen[];
    for (const g of data) out.push({ ...g, _file: file });
  }
  return out;
}

const GENERATORS = loadGenerators();

test('생성기가 수집된다', () => {
  assert.ok(GENERATORS.length > 100, `생성기 수집 실패 (${GENERATORS.length}개)`);
});

test('slug이 중복되지 않는다', () => {
  const seen = new Set<string>();
  const dup: string[] = [];
  for (const g of GENERATORS) {
    if (seen.has(g.slug)) dup.push(`${g.slug} (${g._file})`);
    seen.add(g.slug);
  }
  assert.deepEqual(dup, [], `중복 slug: ${dup.join(', ')}`);
});

test('뽑기 항목에 같은 값이 두 번 들어 있지 않다', () => {
  // 중복이 있으면 같은 결과가 두 배 확률로 나오고, 두 번 눌렀을 때
  // 같은 값이 뜨는 일이 잦아진다.
  const bad: string[] = [];
  for (const g of GENERATORS) {
    if (!g.items) continue;
    const seen = new Set<string>();
    for (const item of g.items) {
      if (seen.has(item)) bad.push(`${g.slug}: "${item.slice(0, 30)}"`);
      seen.add(item);
    }
  }
  assert.deepEqual(bad, [], `중복 항목: ${bad.join(' / ')}`);
});

test('조합 풀 안에 같은 단어가 두 번 들어 있지 않다', () => {
  const bad: string[] = [];
  for (const g of GENERATORS) {
    if (!g.pools) continue;
    for (const [i, pool] of g.pools.entries()) {
      const seen = new Set<string>();
      for (const word of pool) {
        if (seen.has(word)) bad.push(`${g.slug} pool${i}: "${word}"`);
        seen.add(word);
      }
    }
  }
  assert.deepEqual(bad, [], `중복 단어: ${bad.join(' / ')}`);
});

test('조합 생성기의 가짓수가 충분하다', () => {
  // 가짓수가 너무 적으면 몇 번만 눌러도 같은 결과가 반복된다.
  const bad: string[] = [];
  for (const g of GENERATORS) {
    if (!g.pools?.length) continue;
    const combos = g.pools.reduce((n, p) => n * p.length, 1);
    if (combos < 50) bad.push(`${g.slug} (${combos}가지)`);
  }
  assert.deepEqual(bad, [], `조합 가짓수가 50가지 미만: ${bad.join(', ')}`);
});

test('뽑기 항목 수가 충분하다', () => {
  const bad: string[] = [];
  for (const g of GENERATORS) {
    if (!g.items) continue;
    if (g.items.length < 10) bad.push(`${g.slug} (${g.items.length}개)`);
  }
  assert.deepEqual(bad, [], `항목이 10개 미만: ${bad.join(', ')}`);
});

test('제목·설명·아이콘이 비어 있지 않다', () => {
  const bad = GENERATORS.filter(g => !g.slug?.trim() || !g.title?.trim() || !g.desc?.trim())
    .map(g => g.slug || g._file);
  assert.deepEqual(bad, [], `필수 항목 누락: ${bad.join(', ')}`);
});
