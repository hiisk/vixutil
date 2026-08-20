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

test('여러 언어를 그리는 화면은 공유 컴포넌트에 lang을 넘긴다', () => {
  /*
   * ShareButton·SaveResultCard·CoupangAd는 lang 기본값이 'ko'다. 안 넘기면
   * 아홉 외국어 화면에 한국어 버튼과 한국어 이미지 카드가 붙는데, 로컬에서
   * 한국어로 보면 멀쩡해 보여서 눈으로는 안 잡힌다. 실제로 스냅테스트 다섯이
   * 쓰는 components/snap/MeasuredTest.tsx가 이 상태였다.
   *
   * lang이 그 파일 안에 아예 없으면 한국어 전용 화면이라 건너뛴다.
   */
  const ROOT = join(COMPONENTS, '..');
  const files = execSync("grep -rl '<ShareButton\\|<SaveResultCard\\|<CoupangAd' app components", { cwd: ROOT })
    .toString().trim().split('\n');
  const bad: string[] = [];
  for (const f of files) {
    const src = readFileSync(join(ROOT, f), 'utf8');
    // lang이 이 파일의 변수로 있을 때만 본다 — 없으면 한국어 전용 화면이다
    if (!/\blang\s*[,}]|\blang\s*:\s*\w/.test(src)) continue;
    for (const m of src.matchAll(/<(ShareButton|SaveResultCard|CoupangAd)\b[^>]*?\/>/g)) {
      if (!/\blang=/.test(m[0])) bad.push(`${f}: <${m[1]}>`);
    }
  }
  /*
   * 아직 안 고친 자리. SaveResultCard는 lang을 받아 놓고 그 안의 CoupangAd에는
   * 안 넘긴다 — referral을 끄지 않은 호출(components/snap/MeasuredTest.tsx)에서
   * 아홉 외국어 화면에 한국어 제휴 카드가 붙는다. 그 파일은 지금 다른 작업이
   * 동시에 만지고 있어 손대지 않았다. 고치면 이 줄을 지워라.
   */
  const KNOWN: string[] = [];
  assert.deepEqual(bad, KNOWN, `lang을 안 넘기는 공유 컴포넌트:\n  ${bad.join('\n  ')}`);
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
