/**
 * 렌더 중에 무작위나 현재 시각을 쓰지 않는지 본다.
 *
 * useState의 초기값 자리는 브라우저에서만 도는 것처럼 보이지만 서버에서도 한 번
 * 돌아간다. 거기서 Math.random()이나 Date.now()를 부르면 서버가 그린 HTML과
 * 브라우저가 그린 것이 달라지고, React는 그 가지를 통째로 버리고 다시 그린다.
 *
 * 이 고장은 화면으로 드러나지 않는다. 사다리는 어차피 무작위라 한 번 다시
 * 그려져도 "원래 그런가 보다" 싶고, 공유 버튼 문구는 바뀌어도 아무도 안 본다.
 * 콘솔을 열어야만 보이는데, 그때는 이미 스물일곱 장이 같은 상태였다.
 *
 * 실제로 겪은 것 셋:
 *  - ShareButton이 useState 초기값에서 문구를 무작위로 골랐다 (27장)
 *  - LadderGame이 useState 초기값에서 사다리를 놓았다
 *  - 코인 시세판이 useState 초기값에 Date.now()를 넣어 빌드 시각이 HTML에 박혔다
 *
 * 셋 다 고친 방식은 같다 — 서버는 정해진 값을 그리고, 붙은 뒤에 useEffect에서
 * 바꿔 끼운다. 기능은 그대로 살아 있고 서버와 브라우저가 어긋나지 않는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { appEntries } from './app-path.ts';

const ROOT = join(import.meta.dirname, '..');

function tsxFiles(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) tsxFiles(p, out);
    else if (e.name.endsWith('.tsx')) out.push(p);
  }
  return out;
}

/** useState(...) 한 번의 인자만 — 여는 괄호부터 짝이 맞는 닫는 괄호까지 */
function stateArgs(src: string): { text: string; line: number }[] {
  const out: { text: string; line: number }[] = [];
  const re = /\buseState\s*(<[^>]*>)?\s*\(/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    let depth = 0;
    let i = m.index + m[0].length - 1;
    const start = i;
    for (; i < src.length; i++) {
      if (src[i] === '(') depth++;
      else if (src[i] === ')') {
        depth--;
        if (depth === 0) break;
      }
    }
    out.push({ text: src.slice(start + 1, i), line: src.slice(0, m.index).split('\n').length });
  }
  return out;
}

test('useState 초기값에서 무작위나 현재 시각을 쓰지 않는다', () => {
  const bad: string[] = [];
  for (const f of [...tsxFiles(join(ROOT, 'components')), ...tsxFiles(join(ROOT, 'app'))]) {
    const src = readFileSync(f, 'utf8');
    if (!src.includes('useState')) continue;
    for (const { text, line } of stateArgs(src)) {
      // 함수를 값으로 넘기는 것은 괜찮다 — 눌렀을 때 도는 것이지 렌더 때가 아니다.
      // 초기값 자리(첫 인자)에서 부르는 것만 본다.
      const call = /Math\.random\s*\(|Date\.now\s*\(|new Date\s*\(\s*\)/.exec(text);
      if (call) bad.push(`${relative(ROOT, f)}:${line} — useState 초기값의 ${call[0].trim()}`);
    }
  }
  assert.deepEqual(
    bad, [],
    `서버와 브라우저가 다른 값을 그리게 된다. 서버용 기본값을 두고 useEffect에서 바꿔 끼워라:\n  ${bad.join('\n  ')}`,
  );
});
