/**
 * JSX가 삼킨 공백 — 글자가 붙어 렌더되는 것을 잡는다.
 *
 * ── 무엇이 틀려 있었나 (2026-08-12) ───────────────────────
 * 부의금 계산기를 만들다가 렌더된 화면에서 `없습니다.관습이고`, `식사까지
 * 하면부의금에`처럼 **글자가 붙어 나오는 것**을 찾았다. 원문은 이렇게 적혀 있었다.
 *
 *   <p>
 *     정해진 금액은 <strong>없습니다.</strong>
 *     관습이고 지역마다 다릅니다.
 *   </p>
 *
 * JSX는 줄바꿈을 품은 앞뒤 공백을 **없애 버린다**. 그래서 `</strong>` 다음의
 * `\n    `가 사라지고 두 낱말이 붙는다. 브라우저로 열어 보기 전에는 모르고,
 * 타입 검사도 린트도 이것을 보지 못한다. 사이트 전체를 훑었더니 일곱 군데가
 * 그랬다 — 전세 안전성 둘, 이사비용 둘, 기초연금·추납·부피무게 각 하나.
 *
 * ── 조사로 시작하면 붙는 것이 옳다 ────────────────────────
 * 한국어는 조사가 앞말에 붙는다. 아래처럼 적힌 것은 **고쳐서는 안 된다.**
 *
 *   <strong>총 학점</strong>
 *   입니다. 3학점 과목은…            → "총 학점입니다." 로 옳게 붙는다
 *
 * 그래서 이 검사는 닫는 태그 다음 줄이 조사·어미·문장부호로 시작하면 넘긴다.
 * 그 목록이 ALLOWED다. 목록이 짧으면 거짓 경보가 나고, 길면 진짜를 놓친다 —
 * 지금 목록으로 사이트 전체에서 거짓 경보 둘(`입니다`)만 났고 그 둘을 넣어 0이
 * 됐다. 새 낱말이 걸리면 그것이 조사인지 눈으로 보고 목록에 더하거나 원문을
 * 고쳐라. **목록에 넣는 쪽을 기본으로 삼지 마라** — 일곱 중 다섯이 마침표
 * 뒤였고, 그것은 조사가 아니라 잃어버린 띄어쓰기였다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const SKIP = new Set(['node_modules', '.next', '.git', 'out', 'scratchpad']);

/** 안쪽에 글을 감싸는 태그들 — 이것들 뒤에서 공백이 사라진다 */
const INLINE = ['strong', 'em', 'b', 'i', 'code', 'span', 'abbr', 'a', 'Link'];

/**
 * 뒤에 붙는 것이 옳은 시작 — 조사·어미·문장부호.
 *
 * 한 글자 조사는 낱말의 첫 글자와 겹칠 수 있다("도구"의 도, "이사"의 이).
 * 그래서 한 글자짜리는 **그 뒤가 공백이거나 문장이 끝날 때만** 조사로 본다.
 */
const PARTICLE_1 = ['은', '는', '이', '가', '을', '를', '의', '에', '와', '과', '도', '만', '로', '랑', '뿐', '씩'];
const ALLOWED = [
  '입니다', '이라는', '라는', '이라고', '라고', '이며', '며', '이고', '고',
  '으로', '에서', '에게', '에는', '이나', '나', '까지', '부터', '처럼', '보다',
  '조차', '마저', '대로', '이야', '야', '이란', '란', '이든', '든', '이면', '면',
  '와의', '과의', '으로도', '로도', '이었', '였',
];

function tsxFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) tsxFiles(p, out);
    else if (name.endsWith('.tsx')) out.push(p);
  }
  return out;
}

test('닫는 태그 뒤에서 공백이 사라지지 않는다', () => {
  /*
   * 닫는 태그 → 줄바꿈 → 글자. 그 사이의 공백은 JSX가 지운다. 다음 줄이 조사로
   * 시작하면 붙는 것이 옳으므로 넘기고, 그 밖은 잃어버린 띄어쓰기다.
   */
  const close = INLINE.map(t => `</${t}>`).join('|');
  const re = new RegExp(`(?:${close})[ \\t]*\\n[ \\t]*([^\\s<{/])`, 'g');
  const bad: string[] = [];

  for (const file of tsxFiles(ROOT)) {
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(re)) {
      const at = m.index! + m[0].length - 1;
      const tail = src.slice(at, at + 12);
      if (/^[.,)\]}·…?!:;%"'’”\d]/.test(tail)) continue;          // 문장부호·숫자는 붙는다
      if (ALLOWED.some(p => tail.startsWith(p))) continue;
      if (PARTICLE_1.some(p => tail.startsWith(p)) && /^.[\s.,]/.test(tail)) continue;
      const line = src.slice(0, at).split('\n').length;
      bad.push(`${file.slice(ROOT.length + 1)}:${line} …${tail.slice(0, 10)}`);
    }
  }

  assert.deepStrictEqual(
    bad,
    [],
    `줄 끝의 닫는 태그 뒤에 공백이 사라졌다 — 그 자리에 {' '}를 넣어라:\n  ${bad.join('\n  ')}`,
  );
});

test('이 검사가 실제로 물는다', () => {
  /*
   * 위 검사가 초록인 것만으로는 규칙이 사는지 알 수 없다 — 정규식이 아무것도
   * 잡지 못하게 망가져도 초록이다. 그래서 같은 규칙을 **일부러 어긋난 글**에
   * 매겨 본다. 고친 일곱 가운데 하나를 그대로 옮겨 왔다.
   */
  const close = INLINE.map(t => `</${t}>`).join('|');
  const re = new RegExp(`(?:${close})[ \\t]*\\n[ \\t]*([^\\s<{/])`);

  const broken = `<p>\n  짐은 <strong>사람마다 다릅니다.</strong>\n  방 수를 평수로 옮기지 않았습니다.\n</p>`;
  assert.match(broken, re, '어긋난 글을 잡지 못한다 — 규칙이 죽었다');

  const fixed = `<p>\n  짐은 <strong>사람마다 다릅니다.</strong>{' '}\n  방 수를 평수로 옮기지 않았습니다.\n</p>`;
  assert.ok(!re.test(fixed), "{' '}를 넣은 글까지 잡는다 — 거짓 경보가 난다");

  const particle = `<p>\n  평점은 <strong>총 학점</strong>\n  입니다. 3학점 과목은…\n</p>`;
  const m = particle.match(re);
  assert.ok(m && ALLOWED.some(p => particle.slice(m.index! + m[0].length - 1).startsWith(p)),
    '조사로 시작하는 줄을 넘기지 못한다');
});
