import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { CATS } from '../lib/calculator-catalog.ts';
import { CHECKLISTS } from '../lib/checklist-data.ts';

const ROOT = join(import.meta.dirname, '..');

/**
 * lib/search-index.ts는 test-data/quiz-data/generator-data aggregator를 import하는데
 * 그것들이 확장자 없이 하위 파일을 import해 node로 직접 로드할 수 없다.
 * 계산기·체크리스트는 직접 검증하고, 나머지는 인덱스 소스가 올바른 형태인지 확인한다.
 */
const indexSrc = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');

test('검색 인덱스가 다섯 섹션을 모두 포함한다', () => {
  // 한 섹션이라도 빠지면 그 섹션은 통합 검색으로 찾을 수 없다.
  for (const section of ['calculator', 'test', 'quiz', 'generator', 'checklist']) {
    assert.ok(
      indexSrc.includes(`section: '${section}' as const`) || indexSrc.includes(`'${section}' as const`),
      `${section} 섹션이 인덱스에 없다`,
    );
  }
});

test('계산기 카탈로그의 href가 모두 실재한다', () => {
  // 검색 결과가 404로 보내면 안 된다. 카탈로그가 검색 인덱스의 유일한 출처다.
  const missing: string[] = [];
  for (const cat of CATS) {
    for (const c of cat.calcs) {
      const slug = c.href.replace('/calculator/', '');
      if (!existsSync(join(ROOT, 'app', 'calculator', slug, 'page.tsx'))) missing.push(c.href);
    }
  }
  assert.deepEqual(missing, [], `페이지가 없는 계산기: ${missing.join(', ')}`);
});

test('계산기 카탈로그에 중복 href가 없다', () => {
  const hrefs = CATS.flatMap(c => c.calcs.map(x => x.href));
  const dup = [...new Set(hrefs.filter((h, i) => hrefs.indexOf(h) !== i))];
  assert.deepEqual(dup, [], `중복 등록된 계산기: ${dup.join(', ')}`);
});

test('검색으로 같은 주제의 다른 섹션 콘텐츠를 찾을 수 있다', () => {
  // 통합 검색을 만든 이유가 이것이다. "실업급여"를 찾을 때 계산기만 나오면
  // 바로 다음에 필요한 신청 체크리스트에 닿지 못한다.
  const calcTitles = CATS.flatMap(c => c.calcs.map(x => x.title));
  const listTitles = CHECKLISTS.map(c => c.title);

  const pairs: [string, string][] = [
    ['실업급여', '실업급여'],
    ['청약', '청약'],
    ['전월세', '전세'],
  ];

  for (const [calcKw, listKw] of pairs) {
    assert.ok(calcTitles.some(t => t.includes(calcKw)), `계산기에 "${calcKw}" 없음`);
    assert.ok(listTitles.some(t => t.includes(listKw)), `체크리스트에 "${listKw}" 없음`);
  }
});

test('홈 화면 개수 배지가 데이터에서 나온다', () => {
  // 손으로 적으면 콘텐츠가 늘 때마다 낡는다. 실제로 "85+", "100+"로 굳어 있었다.
  const home = readFileSync(join(ROOT, 'app', 'page.tsx'), 'utf8');
  assert.ok(home.includes('SECTION_COUNTS'), '홈이 실제 개수를 쓰지 않는다');
  assert.doesNotMatch(home, /badge: '\d+\+'/, "배지에 '85+' 같은 하드코딩이 남아 있다");
  assert.doesNotMatch(home, /val: '\d+\+'/, "통계 바에 하드코딩된 숫자가 남아 있다");
});

test('검색 페이지가 사이트맵에 등록돼 있다', () => {
  const sitemap = readFileSync(join(ROOT, 'app', 'sitemap.ts'), 'utf8');
  assert.ok(sitemap.includes('/search'), '검색 페이지가 사이트맵에 없다');
});
