/**
 * 문구 표 안에 자리표시자가 그대로 남은 곳을 잡는다.
 *
 * TestEngine의 한국어 문구에 `traits: '{ui.traits}'`가 들어 있었다. JSX 본문에
 * 쓰던 `{ui.traits}`를 문구 표로 옮기면서 중괄호까지 따옴표 안으로 딸려 들어간
 * 것이다. 타입은 string이라 통과하고, 값이 비어 있지도 않으니 길이를 세는 검사도
 * 초록이 뜬다. 화면에는 "주요 특성"이 있어야 할 자리에 `{ui.traits}`가 그대로
 * 찍혔고, **문제를 다 푼 뒤에야 나오는 결과 화면**이라 정적 HTML을 훑어도
 * 걸리지 않았다. 결과에 traits가 달린 한국어 항목이 924개였다.
 *
 * 그래서 렌더 결과가 아니라 원본을 본다 — 따옴표 안에 `{무엇.무엇}` 꼴이 있으면
 * 그것은 옮기다 만 자리표시자다. 진짜 값을 끼우고 싶었으면 백틱과 `${}`를 썼을
 * 것이므로, 작은따옴표·큰따옴표 안의 이 꼴은 예외 없이 실수다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['lib', 'components', 'app'];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.tsx?$/.test(name)) out.push(p);
  }
  return out;
}

/**
 * 문자열 **전체가** `{이름.이름}` 하나뿐인 경우만 잡는다.
 *
 * 처음에는 "따옴표 안에 자리표시자가 들어 있으면"으로 넓게 잡았다가 200곳 넘게
 * 걸렸는데 전부 헛짚음이었다 — 줄 단위로 훑으니 여러 줄에 걸친 템플릿 리터럴의
 * 가운데 토막이 따옴표 쌍처럼 보였다. 진짜 실수는 JSX의 `{ui.x}`를 통째로
 * 따옴표 안에 옮겨 담은 꼴이라 문자열에 그것 말고는 아무것도 없다. 이 좁은 꼴은
 * 정당한 쓰임이 없어서 헛짚음이 나오지 않는다.
 */
const WHOLE = /(?:'|")\{[A-Za-z_$][\w$]*\.[\w$]+\}(?:'|")/g;

test('문구에 옮기다 만 자리표시자가 없다', () => {
  const bad: string[] = [];
  for (const root of ROOTS) {
    for (const file of walk(root)) {
      const src = readFileSync(file, 'utf8');
      const lines = src.split('\n');
      for (let i = 0; i < lines.length; i++) {
        WHOLE.lastIndex = 0;
        let m: RegExpExecArray | null;
        while ((m = WHOLE.exec(lines[i]))) bad.push(`${file}:${i + 1}  ${m[0]}`);
      }
    }
  }
  assert.deepEqual(
    bad, [],
    `따옴표 안에 자리표시자가 남았다 — 화면에 중괄호째 찍힌다:\n  ${bad.join('\n  ')}`,
  );
});
