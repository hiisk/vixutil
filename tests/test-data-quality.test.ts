import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 심리 테스트 데이터 구조 검사.
 *
 * lib/test-data.ts는 하위 파일을 확장자 없이 import해 node로 직접 로드할 수
 * 없다(tests/search-index.test.ts에 같은 제약이 적혀 있다). 그래서 소스를
 * 정규식으로 읽는다.
 *
 * 점수 구간에 빈틈이 있으면 그 점수가 나온 사용자에게 아무 결과도 안 뜨고,
 * 구간이 겹치면 어느 결과가 걸릴지가 배열 순서에 좌우된다. 둘 다 화면에서는
 * 티가 잘 안 나서 데이터 단계에서 막아야 한다.
 */

const LIB = join(import.meta.dirname, '..', 'lib');
const STR = String.raw`(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")`;

interface TestBlock {
  slug: string;
  body: string;
  /** MBTI형은 점수 구간 대신 축(EI/SN/TF/JP) 판정을 쓴다 — min/max는 전부 0이다. */
  isMbti: boolean;
  ranges: Array<[number, number]>;
}

function loadTests(): TestBlock[] {
  const out: TestBlock[] = [];
  const files = readdirSync(LIB).filter(f => /^test-data-[a-z]+\.ts$/.test(f));
  for (const file of files) {
    const src = readFileSync(join(LIB, file), 'utf8');
    const blocks = src.matchAll(new RegExp(String.raw`slug: ${STR},([\s\S]*?)(?=\n    slug: |\n\];)`, 'g'));
    for (const b of blocks) {
      const slug = b[1] ?? b[2];
      const body = b[3];
      const ranges = [...body.matchAll(/min: (\d+), max: (\d+)/g)]
        .map(m => [Number(m[1]), Number(m[2])] as [number, number]);
      out.push({ slug, body, isMbti: body.includes("type: 'mbti'"), ranges });
    }
  }
  return out;
}

const TESTS = loadTests();

test('심리 테스트가 수집된다', () => {
  assert.ok(TESTS.length > 150, `테스트 수집 실패 (${TESTS.length}개)`);
});

test('slug이 중복되지 않는다', () => {
  const seen = new Set<string>();
  const dup: string[] = [];
  for (const t of TESTS) {
    if (seen.has(t.slug)) dup.push(t.slug);
    seen.add(t.slug);
  }
  assert.deepEqual(dup, [], `중복 slug: ${dup.join(', ')}`);
});

test('점수 구간에 빈틈이 없다', () => {
  // 구간 사이가 비면 그 점수를 받은 사용자에게 결과가 안 뜬다.
  const bad: string[] = [];
  for (const t of TESTS) {
    if (t.isMbti || t.ranges.length < 2) continue;
    const sorted = [...t.ranges].sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i][1] + 1 < sorted[i + 1][0]) {
        bad.push(`${t.slug}: ${sorted[i][1]}과 ${sorted[i + 1][0]} 사이`);
      }
    }
  }
  assert.deepEqual(bad, [], `점수 구간 빈틈: ${bad.join(', ')}`);
});

test('점수 구간이 서로 겹치지 않는다', () => {
  // 겹치면 어느 결과가 나올지가 배열 순서에 달리게 된다.
  const bad: string[] = [];
  for (const t of TESTS) {
    if (t.isMbti || t.ranges.length < 2) continue;
    const sorted = [...t.ranges].sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i][1] >= sorted[i + 1][0]) {
        bad.push(`${t.slug}: [${sorted[i]}] 과 [${sorted[i + 1]}]`);
      }
    }
  }
  assert.deepEqual(bad, [], `점수 구간 겹침: ${bad.join(', ')}`);
});

test('MBTI형 테스트는 16유형과 4축을 모두 갖춘다', () => {
  const bad: string[] = [];
  for (const t of TESTS) {
    if (!t.isMbti) continue;
    const types = new Set([...t.body.matchAll(/mbtiType: '(\w+)'/g)].map(m => m[1]));
    if (types.size !== 16) bad.push(`${t.slug}: 유형 ${types.size}개`);
    for (const axis of ['EI', 'SN', 'TF', 'JP']) {
      const n = [...t.body.matchAll(new RegExp(`axis: '${axis}'`, 'g'))].length;
      if (n === 0) bad.push(`${t.slug}: ${axis}축 문항 없음`);
    }
  }
  assert.deepEqual(bad, [], `MBTI 구조 문제: ${bad.join(', ')}`);
});

test('결과마다 제목과 설명이 있다', () => {
  const bad: string[] = [];
  for (const t of TESTS) {
    const ri = t.body.indexOf('results:');
    if (ri < 0) continue;
    const results = t.body.slice(ri);
    const titles = [...results.matchAll(new RegExp(String.raw`title: ${STR}`, 'g'))].length;
    const descs = [...results.matchAll(new RegExp(String.raw`desc: ${STR}`, 'g'))].length;
    if (titles !== t.ranges.length || descs !== t.ranges.length) {
      bad.push(`${t.slug}: 결과 ${t.ranges.length}개인데 제목 ${titles}·설명 ${descs}`);
    }
  }
  assert.deepEqual(bad, [], `결과 필드 누락: ${bad.join(', ')}`);
});
