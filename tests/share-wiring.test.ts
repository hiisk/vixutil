import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const COMPONENTS = join(import.meta.dirname, '..', 'components');
const read = (name: string) => readFileSync(join(COMPONENTS, name), 'utf8');

/**
 * 결과를 만들어내는 엔진은 공유 경로가 있어야 한다.
 * 공유는 이 사이트의 주요 유입 채널인데, GeneratorEngine은 ShareButton에
 * 전용 CTA(GEN_CTA)까지 정의돼 있으면서도 정작 호출을 빠뜨리고 있었다.
 */
const ENGINES = ['TestEngine.tsx', 'QuizEngine.tsx', 'GeneratorEngine.tsx'];

test('결과 엔진은 모두 ShareButton을 렌더링한다', () => {
  const unwired = ENGINES.filter(f => {
    const src = read(f);
    return !src.includes("from './ShareButton'") || !src.includes('<ShareButton');
  });
  assert.deepEqual(unwired, [], `공유 버튼이 없는 엔진: ${unwired.join(', ')}`);
});

test('CTAType에 선언된 타입은 모두 실제로 쓰인다', () => {
  // 아무도 안 쓰는 CTA 타입은 곧 연결이 빠진 공유 경로이거나 죽은 코드다.
  const share = read('ShareButton.tsx');
  const union = share.match(/type CTAType = ([^;]+);/);
  assert.ok(union, 'CTAType 선언을 찾지 못함');

  const types = [...union[1].matchAll(/'(\w+)'/g)].map(m => m[1]);
  assert.ok(types.length >= 3, `CTA 타입이 너무 적음 (${types.length}개)`);

  // ShareButton을 쓰는 곳은 components의 엔진들과 app/snap의 결과 페이지들이다.
  const callSites = execSync("grep -rl '<ShareButton' app components", { cwd: join(COMPONENTS, '..') })
    .toString().trim().split('\n');
  const allSources = callSites.map(p => readFileSync(join(COMPONENTS, '..', p), 'utf8')).join('\n');

  const unused = types.filter(t => !allSources.includes(`type="${t}"`));
  assert.deepEqual(unused, [], `선언됐지만 아무 데서도 안 쓰는 CTA 타입: ${unused.join(', ')}`);
});

test('GeneratorEngine은 결과가 있을 때만 공유를 보여준다', () => {
  // 결과가 없는데 "결과 공유하기"가 뜨면 공유할 게 없다.
  const src = read('GeneratorEngine.tsx');
  const idx = src.indexOf('<ShareButton');
  const before = src.slice(0, idx);
  assert.ok(
    /hasResults && \(\s*(\/\/[^\n]*\n\s*)?$/.test(before.split('\n').slice(-4).join('\n') + ''),
    'ShareButton이 hasResults 조건 안에 있지 않음',
  );
});
