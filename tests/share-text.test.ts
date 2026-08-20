import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');

/**
 * 공유 글이 도메인을 되풀이하지 않는다.
 *
 * shareOne(글, 주소)는 둘을 한 덩이로 붙여 보낸다 — 글 바로 아랫줄이 주소다.
 * 그런데 글에도 「— vixutil.com」이 붙어 있어 같은 것이 두 번 나갔다.
 * 열두 곳이 그랬다(2026-08-21).
 *
 * **첫 인자만 본다.** 둘째 인자는 주소라 도메인이 들어 있는 것이 정상이다
 * (/fortune/dream이 그렇다). 그래서 shareOne( 바로 뒤의 따옴표 하나만 훑는다.
 * 글이 변수면 여기서 안 보인다 — 이 검사가 잡는 것은 글자로 적힌 것뿐이다.
 */
const files = execFileSync('grep', ['-rl', 'shareOne', 'components', 'app', 'lib'], {
  cwd: ROOT, encoding: 'utf8',
}).split('\n').filter(Boolean);

/** shareOne( 다음에 바로 오는 문자열/템플릿 리터럴 — 첫 인자다 */
const FIRST_ARG = /shareOne\(\s*(?:'([^']*)'|`([^`]*)`)/g;

test('공유 글에 도메인이 안 들어간다', () => {
  const bad: string[] = [];
  for (const f of files) {
    const src = readFileSync(join(ROOT, f), 'utf8');
    for (const m of src.matchAll(FIRST_ARG)) {
      const text = m[1] ?? m[2] ?? '';
      if (text.includes('vixutil.com')) bad.push(`${f}: ${text.slice(0, 60)}`);
    }
  }
  assert.deepEqual(bad, [], `주소가 바로 아래 붙는데 글에도 도메인이 있다:\n  ${bad.join('\n  ')}`);
});

test('공유하는 곳이 실제로 있고, 첫 인자를 읽어 낸다', () => {
  /*
    위 검사만 두면 파일을 하나도 못 읽어도 통과한다 — grep이 빗나가거나
    정규식이 안 맞으면 «bad가 빈 배열»이 되어 초록이다. 그래서 읽어 낸 수를 센다.
  */
  assert.ok(files.length >= 15, `shareOne을 부르는 파일이 ${files.length}개뿐이다`);
  const texts = files.flatMap(f =>
    [...readFileSync(join(ROOT, f), 'utf8').matchAll(FIRST_ARG)].map(m => m[1] ?? m[2] ?? ''));
  assert.ok(texts.length >= 10, `글자로 적힌 공유 글을 ${texts.length}개밖에 못 읽었다`);
  assert.ok(texts.some(t => t.length > 5), '읽어 낸 글이 전부 비어 있다');
});
