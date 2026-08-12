/**
 * 고시 요율이 한 곳에만 적혀 있는지 — 사본이 되살아나는 것을 막는다.
 *
 * ── 왜 이 검사가 생겼나 (2026-08-13) ───────────────────────
 * 4대보험 요율이 **네 곳**에 적혀 있었다.
 *
 *   lib/salary.ts                                   (등록부가 가리키는 원본)
 *   app/(ko)/calculator/four-insurance/page.tsx
 *   app/(ko)/calculator/dev/salary/page.tsx
 *   lib/yearly-values.ts                            (등록부 — 여기는 있어야 한다)
 *
 * 소득세 세율표는 **다섯 곳**(salary·capital-gains·comprehensive-tax·business-income·
 * local-income-tax), 상속·증여세 세율표는 두 곳, 재산세 세율표는 두 곳이었다.
 * 페이지 쪽 사본은 클라이언트 컴포넌트라 node가 불러올 수 없어 **검사가 보지
 * 못하는 자리**다. 이 저장소에서 정확히 그 자리에서 흠 다섯이 나왔다 — 취득세
 * 100배, 종부세 절벽, 복비 경계, 증여세 기납부세액 누락, 상속세 금융재산공제.
 *
 * 값이 같으면 지금은 아무 일도 없다. 문제는 **해마다 바뀔 때**다. 요율 고시가
 * 나오면 한 곳만 고쳐지고, 나머지는 조용히 작년 값으로 남는다. 어느 화면이
 * 낡았는지는 아무도 모른다.
 *
 * ── 이 검사가 하는 일 ─────────────────────────────────────
 * 고시값의 숫자를 찾아 **몇 개 파일에 나오는지** 센다. 원본과 등록부 말고
 * 나타나면 사본이다. 값 목록을 여기 적는 것이 아니라 **어느 파일이 원본인지**를
 * 적는다 — 요율이 개정되면 원본만 고치면 되고 이 검사는 그대로 산다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.next', '.git', 'out', 'scratchpad', 'tests']);

/**
 * 고시값과 그 원본.
 *
 * `needle`은 코드에 적히는 꼴 그대로다(숫자 구분용 밑줄까지). `owners`에 적힌
 * 파일 말고 다른 곳에 나오면 사본이다. 등록부(lib/yearly-values.ts)는 값을
 * 문자열로 들고 있어야 하므로 늘 허용한다.
 */
const REGISTRY = '/lib/yearly-values.ts';
const VALUES: { label: string; needle: string; owners: string[] }[] = [
  { label: '건강보험료율', needle: '0.03545', owners: ['/lib/salary.ts'] },
  { label: '장기요양보험료율', needle: '0.1295', owners: ['/lib/salary.ts'] },
  { label: '국민연금 기준소득월액 상한', needle: '6_170_000', owners: ['/lib/salary.ts'] },
  { label: '최저시급', needle: '10_320', owners: ['/lib/minimum-wage.ts'] },
  {
    label: '소득세 세율표 누진공제액',
    needle: '1544',
    owners: ['/lib/salary.ts'],
  },
  {
    label: '상속·증여세 최고구간 누진공제액',
    needle: '460_000_000',
    owners: ['/lib/gift-tax.ts'],
  },
  {
    label: '재산세 3구간 누적세액',
    needle: '570_000',
    owners: ['/lib/property-tax.ts'],
  },
  {
    label: '종부세 최고 세율',
    needle: '0.027',
    owners: ['/lib/holding-tax.ts'],
  },
];

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) sourceFiles(p, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(p);
  }
  return out;
}

/** 주석을 걷어낸 코드만 본다 — 주석의 숫자는 사람이 읽을 글이다 */
function codeOf(src: string): string {
  return src
    .split('\n')
    .filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l))
    .join('\n');
}

test('고시 요율이 원본 말고 다른 곳에 적혀 있지 않다', () => {
  const files = sourceFiles(ROOT);
  const bad: string[] = [];

  for (const { label, needle, owners } of VALUES) {
    const found: string[] = [];
    for (const file of files) {
      const rel = `/${relative(ROOT, file)}`;
      if (rel === REGISTRY || owners.includes(rel)) continue;
      if (codeOf(readFileSync(file, 'utf8')).includes(needle)) found.push(rel);
    }
    if (found.length > 0) {
      bad.push(`${label}(${needle}) 사본: ${found.join(', ')} — 원본은 ${owners.join(', ')}`);
    }
  }

  assert.deepStrictEqual(
    bad,
    [],
    `고시값이 두 곳 이상에 적혀 있다. 해마다 바뀌는 값이라 한쪽만 고쳐진다:\n  ${bad.join('\n  ')}`,
  );
});

test('원본에는 그 값이 실제로 있다', () => {
  /*
   * 위 검사만 있으면 원본에서 값을 지워도 초록이다 — 찾을 사본이 없어지기
   * 때문이다. 그러면 검사가 아무것도 지키지 않는 껍데기가 된다.
   */
  for (const { label, needle, owners } of VALUES) {
    for (const owner of owners) {
      const src = readFileSync(join(ROOT, owner.slice(1)), 'utf8');
      assert.ok(codeOf(src).includes(needle),
        `${label}: 원본 ${owner}에 ${needle}이 없다 — 이름이 바뀌었으면 이 검사의 목록도 고쳐라`);
    }
  }
});

test('등록부가 이 값들을 모두 훑는다', () => {
  /*
   * 값이 한 곳에 모여 있어도 등록부에 없으면 새해에 아무도 확인하지 않는다.
   * 원본 파일이 lib/yearly-values.ts에 등록돼 있는지 본다.
   */
  const registry = readFileSync(join(ROOT, REGISTRY.slice(1)), 'utf8');
  for (const { label, owners } of VALUES) {
    for (const owner of owners) {
      assert.ok(registry.includes(owner.slice(1)),
        `${label}: 원본 ${owner}이 연간 등록부에 없다`);
    }
  }
});
