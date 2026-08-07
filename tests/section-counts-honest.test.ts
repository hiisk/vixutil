import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 화면 문구에 적은 개수가 실제 자료와 맞는지 본다.
 *
 * 두 축을 곱하는 섹션은 축을 넓혀 칸을 늘린다 — 그것이 이 저장소에서 가장 싼
 * 늘리는 방법이다. 그런데 **문구의 숫자는 같이 안 늘어난다.** 2026-08-07에
 * 재 보니 여덟 섹션이 틀린 수를 말하고 있었다:
 *
 *   paper      "규격 35가지와 해상도 8가지" → 실제 해상도는 12가지, 칸은 420
 *   wire       "굵기 20가지와 전류 10가지"  → 실제 23 × 15 = 345칸
 *   torque · lumen · dew · bandwidth · battery · windchill 도 같은 꼴
 *
 * 열 언어에 같은 숫자가 적혀 있으니 한 섹션에 스무 곳씩, 모두 160곳이 틀렸다.
 * 사람이 눈으로 셀 수 있는 양이 아니다.
 *
 * 그래서 **파일에 적힌 수를 실제 배열 길이와 대조**한다. 숫자를 박아 두어도
 * 되지만, 자료를 늘리면 여기서 걸리므로 같이 고치게 된다.
 * (공식 세 섹션은 {n}으로 채우는 쪽을 골랐다 — tests/formula-section-checks.ts)
 */
const ROOT = join(import.meta.dirname, '..');
const LIB = join(ROOT, 'lib');

/** 문구에서 "몇 칸"이라고 말한 수 — 열 언어가 같은 숫자를 쓴다 */
const CELL_COUNT = /(?<![\d.])(\d{2,4})(?=\s*(?:칸|개 칸))/g;

function sectionsWithGrid(): string[] {
  return readdirSync(LIB, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)
    .filter(n => existsSync(join(LIB, n, 'ui.ts')) && existsSync(join(LIB, n, 'list.ts')));
}

test('문구가 말하는 칸 수가 실제 칸 수와 맞는다', async () => {
  const bad: string[] = [];
  for (const sec of sectionsWithGrid()) {
    let cells: number | null = null;
    try {
      const mod = await import(join(LIB, sec, 'list.ts'));
      const arr = (mod as Record<string, unknown>).CELLS;
      if (Array.isArray(arr)) cells = arr.length;
    } catch {
      continue;
    }
    if (!cells) continue;
    const ui = readFileSync(join(LIB, sec, 'ui.ts'), 'utf8');
    const said = [...new Set([...ui.matchAll(CELL_COUNT)].map(m => Number(m[1])))];
    const wrong = said.filter(v => v !== cells);
    if (wrong.length) bad.push(`${sec}: 실제 ${cells}칸인데 문구는 ${wrong.join(', ')}`);
  }
  assert.deepEqual(bad, [], `문구의 칸 수가 자료와 어긋난다 — 축을 넓혔으면 문구도 고치라:\n  ${bad.join('\n  ')}`);
});

test('"A가지와 B가지" 문장의 두 수를 곱하면 칸 수가 된다', async () => {
  /*
   * 칸 수만 맞추고 축 수를 안 고치면 문장이 스스로 모순된다 —
   * "35가지와 8가지가 만나는 420칸"처럼. 곱해서 확인한다.
   */
  const PAIR = /(?<![\d.])(\d{1,3})가지와[^']{0,20}?(\d{1,3})가지/;
  const bad: string[] = [];
  for (const sec of sectionsWithGrid()) {
    let cells: number | null = null;
    try {
      const mod = await import(join(LIB, sec, 'list.ts'));
      const arr = (mod as Record<string, unknown>).CELLS;
      if (Array.isArray(arr)) cells = arr.length;
    } catch {
      continue;
    }
    if (!cells) continue;
    const ui = readFileSync(join(LIB, sec, 'ui.ts'), 'utf8');
    const m = ui.match(PAIR);
    if (!m) continue;
    const [a, b] = [Number(m[1]), Number(m[2])];
    if (a * b !== cells) bad.push(`${sec}: ${a} × ${b} = ${a * b}인데 실제는 ${cells}칸`);
  }
  assert.deepEqual(bad, [], `축 수를 곱해도 칸 수가 안 나온다:\n  ${bad.join('\n  ')}`);
});
