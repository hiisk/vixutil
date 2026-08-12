import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  DIFFICULTIES, RANK_OF, UNITS, candidateMasks, cellName, colOf, conflicts, countSolutions,
  digitsOf, hintFor, isSolved, isUnique, makePuzzle, makeSolution, rngOf, rowOf, solve,
  techniqueNeeded, wrongCells, type Board, type Difficulty,
} from '../lib/sudoku.ts';
import { SUDOKU_UI, SUDOKU_UI_KEYS, fillSlots } from '../lib/sudoku-ui.ts';
import { GAME_TOOLS, findGameTool } from '../lib/game-tools.ts';
import { findGameToolIntl } from '../lib/game-tools-intl.ts';
import { LANG_CODES, langOfLocale } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';
import { appJoin } from './app-path.ts';

/**
 * 스도쿠 검사.
 *
 * 이 게임에서 눈으로 못 잡는 것은 셋이다 — **답이 둘인 문제**, **난이도가 안
 * 갈리는 것**, **틀린 힌트**. 셋 다 몇 판 해서는 모른다. 답이 둘인 문제는
 * 사람이 다른 답을 채우고 나서 "왜 틀렸다고 하지"로만 나타나고, 난이도는
 * 어차피 매번 다른 판이라 어려운 것을 뽑았다고 넘어간다.
 *
 * ── 여기서 풀이기를 다시 만드는 이유 ──────────────────────
 * 아래 naiveCount·nakedOnly·candidatesHere는 lib/sudoku.ts를 **쓰지 않는다.**
 * 라이브러리의 유일성 판정이 틀렸다면 그것으로 센 검사도 똑같이 틀리게 세어
 * 통과한다. 그래서 줄·칸·상자를 직접 훑는 순진한 풀이기를 따로 두고, 그것과
 * 견준다. 느리지만(어려움 한 판에 0.4초까지) 이 검사가 있어야 유일성이 실제로
 * 확인된다.
 */

/** 검사가 직접 세는 단위 — 라이브러리의 UNITS를 안 쓴다 */
function unitsHere(): number[][] {
  const out: number[][] = [];
  for (let r = 0; r < 9; r++) out.push(Array.from({ length: 9 }, (_, c) => r * 9 + c));
  for (let c = 0; c < 9; c++) out.push(Array.from({ length: 9 }, (_, r) => r * 9 + c));
  for (let b = 0; b < 9; b++) {
    const cells: number[] = [];
    for (let dr = 0; dr < 3; dr++) {
      for (let dc = 0; dc < 3; dc++) {
        cells.push((Math.floor(b / 3) * 3 + dr) * 9 + (b % 3) * 3 + dc);
      }
    }
    out.push(cells);
  }
  return out;
}

const UNITS_HERE = unitsHere();

/** 그 칸에 규칙상 놓을 수 있는 수 — 줄·칸·상자를 직접 훑는다 */
function candidatesHere(board: Board, i: number): number[] {
  if (board[i] !== 0) return [];
  const r = Math.floor(i / 9);
  const c = i % 9;
  const taken = new Set<number>();
  for (let k = 0; k < 9; k++) {
    taken.add(board[r * 9 + k]);
    taken.add(board[k * 9 + c]);
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let dr = 0; dr < 3; dr++) {
    for (let dc = 0; dc < 3; dc++) taken.add(board[(br + dr) * 9 + bc + dc]);
  }
  const out: number[] = [];
  for (let v = 1; v <= 9; v++) if (!taken.has(v)) out.push(v);
  return out;
}

/** 순진한 풀이기 — 답을 limit개까지 센다. 후보 전파도 MRV도 없다 */
function naiveCount(board: Board, limit = 2): number {
  const b = board.slice();
  let found = 0;
  const go = (): void => {
    const i = b.indexOf(0);
    if (i === -1) {
      found++;
      return;
    }
    for (const v of candidatesHere(b, i)) {
      b[i] = v;
      go();
      b[i] = 0;
      if (found >= limit) return;
    }
  };
  go();
  return found;
}

/** 후보가 하나뿐인 칸만 따라가서 끝까지 가는가 — 쉬움의 정의 */
function nakedOnly(board: Board): boolean {
  const b = board.slice();
  for (let moved = true; moved; ) {
    moved = false;
    for (let i = 0; i < 81; i++) {
      if (b[i] !== 0) continue;
      const cand = candidatesHere(b, i);
      if (cand.length === 1) {
        b[i] = cand[0];
        moved = true;
      }
    }
  }
  return !b.includes(0);
}

const parse = (s: string): Board => [...s].map(ch => (ch === '.' || ch === '0' ? 0 : Number(ch)));

/** 널리 알려진 두 판 — 등급 판정이 생성기와 무관하게 맞는지 붙들어 둔다 */
const KNOWN_EASY = parse('530070000600195000098000060800060003400803001700020006060000280000419005000080079');
const KNOWN_HARD = parse('4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......');

const SEEDS = [1, 2, 3, 5, 8, 13, 42, 99, 777, 1234, 20260812, 0];
/** 순진한 풀이기로 볼 씨앗 — 어려움 한 판에 0.4초까지 걸려 좁게 잡는다 */
const SLOW_SEEDS = [1, 7, 42, 999, 20260812];

/* ────────── 씨앗 ────────── */

test('씨앗이 같으면 같은 난수 줄이 나온다', () => {
  const a = rngOf(2026);
  const b = rngOf(2026);
  for (let i = 0; i < 300; i++) assert.equal(a(), b());
});

test('씨앗이 다르면 난수 줄이 갈린다', () => {
  const a = rngOf(1);
  const b = rngOf(2);
  const same = Array.from({ length: 50 }, () => a() === b()).filter(Boolean).length;
  assert.ok(same < 3, `50개 중 ${same}개가 같다 — 씨앗이 안 먹는다`);
});

test('난수가 0 이상 1 미만에 머문다', () => {
  const r = rngOf(5);
  for (let i = 0; i < 5000; i++) {
    const v = r();
    assert.ok(v >= 0 && v < 1, `${v}는 범위를 벗어난다`);
  }
});

/* ────────── 완성판 ────────── */

test('완성판은 모든 가로줄·세로줄·상자에 1~9가 한 번씩이다', () => {
  for (let seed = 1; seed <= 30; seed++) {
    const grid = makeSolution(rngOf(seed));
    assert.equal(grid.length, 81, `씨앗 ${seed}: 칸 수가 다르다`);
    assert.ok(grid.every(v => v >= 1 && v <= 9), `씨앗 ${seed}: 1~9가 아닌 값이 있다`);
    for (const [u, cells] of UNITS_HERE.entries()) {
      const seen = new Set(cells.map(i => grid[i]));
      assert.equal(seen.size, 9, `씨앗 ${seed}: ${u}번째 단위에 같은 수가 두 번 있다`);
    }
  }
});

test('씨앗이 다르면 완성판도 다르다', () => {
  const grids = new Set(Array.from({ length: 30 }, (_, i) => makeSolution(rngOf(i + 1)).join()));
  assert.equal(grids.size, 30, `완성판 30개 중 서로 다른 것이 ${grids.size}개뿐`);
});

/* ────────── 문제의 답이 하나인가 ────────── */

test('어느 씨앗·난이도든 답이 정확히 하나다', () => {
  // 이 검사가 이 파일에서 가장 중요하다 — 답이 둘인 문제를 내면 게임이 아니다
  for (const seed of SEEDS) {
    for (const d of DIFFICULTIES) {
      const p = makePuzzle(seed, d);
      assert.equal(countSolutions(p.board, 3), 1, `씨앗 ${seed} ${d}: 답이 하나가 아니다`);
      assert.ok(isUnique(p.board), `씨앗 ${seed} ${d}: isUnique가 아니라고 한다`);
    }
  }
});

test('답이 하나라는 것을 따로 만든 풀이기로도 확인한다', () => {
  /*
   * 위 검사는 라이브러리 풀이기로 셌다. 그 풀이기가 갈래를 하나 빠뜨리면
   * 답이 둘인 문제도 "하나"로 세고 검사가 통과한다. 그래서 여기서는 후보
   * 전파도 없는 순진한 풀이기로 다시 센다.
   */
  for (const seed of SLOW_SEEDS) {
    for (const d of DIFFICULTIES) {
      const p = makePuzzle(seed, d);
      assert.equal(naiveCount(p.board, 3), 1, `씨앗 ${seed} ${d}: 순진한 풀이기가 센 답이 하나가 아니다`);
    }
  }
});

test('문제를 풀면 완성판과 같다', () => {
  for (const seed of SEEDS) {
    for (const d of DIFFICULTIES) {
      const p = makePuzzle(seed, d);
      assert.deepEqual(solve(p.board), p.solution, `씨앗 ${seed} ${d}: 풀이가 완성판과 다르다`);
    }
  }
});

test('문제는 완성판에서 칸을 지운 것이다', () => {
  for (const seed of SEEDS) {
    for (const d of DIFFICULTIES) {
      const p = makePuzzle(seed, d);
      for (let i = 0; i < 81; i++) {
        if (p.board[i] === 0) continue;
        assert.equal(p.board[i], p.solution[i], `씨앗 ${seed} ${d}: ${i}번 칸의 단서가 답과 다르다`);
      }
      assert.equal(p.blanks, p.board.filter(v => v === 0).length, '빈칸 수가 판과 어긋난다');
      assert.ok(p.blanks > 0 && p.blanks < 81, `빈칸이 ${p.blanks}개`);
    }
  }
});

test('문제 자체에는 규칙을 어긴 칸이 없다', () => {
  for (const seed of SEEDS) {
    for (const d of DIFFICULTIES) {
      const p = makePuzzle(seed, d);
      assert.ok(!conflicts(p.board).some(Boolean), `씨앗 ${seed} ${d}: 문제에 겹친 수가 있다`);
    }
  }
});

/* ────────── 씨앗으로 되짚기 ────────── */

test('씨앗이 같으면 같은 문제가 나온다', () => {
  for (const d of DIFFICULTIES) {
    const a = makePuzzle(31337, d);
    const b = makePuzzle(31337, d);
    assert.deepEqual(a.board, b.board, `${d}: 같은 씨앗인데 문제가 다르다`);
    assert.deepEqual(a.solution, b.solution, `${d}: 같은 씨앗인데 답이 다르다`);
    assert.equal(a.seed, 31337);
  }
});

test('씨앗이 다르면 문제도 다르다', () => {
  for (const d of DIFFICULTIES) {
    const boards = new Set(SEEDS.map(s => makePuzzle(s, d).board.join()));
    assert.equal(boards.size, SEEDS.length, `${d}: 문제 ${SEEDS.length}개 중 서로 다른 것이 ${boards.size}개뿐`);
  }
});

/* ────────── 난이도 ────────── */

test('등급 판정이 알려진 두 판을 옳게 가른다', () => {
  // 생성기와 무관한 붙들 자리 — 등급 함수가 헐거워지면 여기서 걸린다
  assert.equal(techniqueNeeded(KNOWN_EASY), 1, '후보 하나만으로 풀리는 판을 1로 안 본다');
  assert.equal(techniqueNeeded(KNOWN_HARD), 3, '기법 둘로 막히는 판을 3으로 안 본다');
  assert.ok(nakedOnly(KNOWN_EASY), '따로 만든 판정도 쉬운 판을 못 푼다');
  assert.ok(!nakedOnly(KNOWN_HARD), '따로 만든 판정이 어려운 판을 풀어 버린다');
});

test('쉬움은 후보가 하나뿐인 칸만으로 끝까지 풀린다', () => {
  for (const seed of SEEDS) {
    const p = makePuzzle(seed, 'easy');
    assert.equal(p.rank, 1, `씨앗 ${seed}: 쉬움인데 등급이 ${p.rank}`);
    assert.ok(nakedOnly(p.board), `씨앗 ${seed}: 후보 하나만으로는 안 풀린다`);
  }
});

test('보통과 어려움은 후보 하나만으로는 안 풀린다', () => {
  // 이것이 갈리지 않으면 난이도는 이름만 다른 것이다
  for (const seed of SEEDS) {
    for (const d of ['normal', 'hard'] as Difficulty[]) {
      const p = makePuzzle(seed, d);
      assert.equal(p.rank, RANK_OF[d], `씨앗 ${seed} ${d}: 등급이 ${p.rank}`);
      assert.ok(!nakedOnly(p.board), `씨앗 ${seed} ${d}: 후보 하나만으로 다 풀린다`);
    }
  }
});

test('난이도가 오르면 빈칸이 줄지 않는다', () => {
  for (const seed of SEEDS) {
    const blanks = DIFFICULTIES.map(d => makePuzzle(seed, d).blanks);
    assert.ok(
      blanks[0] <= blanks[1] && blanks[1] <= blanks[2],
      `씨앗 ${seed}: 빈칸이 ${blanks.join(' → ')}로 거꾸로 간다`,
    );
  }
});

test('난이도별 빈칸 구간이 겹치지 않는다', () => {
  /*
   * 구간이 겹치면 어려움이 쉬움보다 단서가 많은 판이 섞여 나온다. 값은
   * lib/sudoku.ts의 WINDOW와 짝이다 — 그쪽을 넓히면 여기도 함께 넓혀야 한다.
   */
  const span: Record<Difficulty, [number, number]> = { easy: [99, 0], normal: [99, 0], hard: [99, 0] };
  for (const seed of SEEDS) {
    for (const d of DIFFICULTIES) {
      const { blanks } = makePuzzle(seed, d);
      span[d] = [Math.min(span[d][0], blanks), Math.max(span[d][1], blanks)];
    }
  }
  assert.ok(span.easy[0] >= 40, `쉬움 빈칸이 ${span.easy[0]}개까지 내려간다 — 단서가 너무 많다`);
  assert.ok(span.easy[1] < span.normal[0], `쉬움 ${span.easy[1]} · 보통 ${span.normal[0]} — 구간이 겹친다`);
  assert.ok(span.normal[1] < span.hard[0], `보통 ${span.normal[1]} · 어려움 ${span.hard[0]} — 구간이 겹친다`);
});

test('씨앗을 넓게 훑어도 난이도가 이름과 맞는다', () => {
  /*
   * 위 검사들은 씨앗 열두 개를 본다. 등급이 목표에 못 닿는 씨앗은 드물게
   * 나오므로 좁게 보면 놓친다 — 실제로 씨앗 300개 중 둘이 "어려움이라 적힌
   * 보통"이었고, 완성판을 새로 만들어 다시 파는 것으로 고쳤다. 그 자리를
   * 붙들어 두려고 여기서는 마흔 개를 훑되 값싼 것만 본다.
   */
  for (let seed = 100; seed < 140; seed++) {
    for (const d of DIFFICULTIES) {
      const p = makePuzzle(seed, d);
      assert.equal(p.rank, RANK_OF[d], `씨앗 ${seed} ${d}: 등급이 ${p.rank}인데 이름은 ${d}`);
      assert.ok(p.blanks >= 40, `씨앗 ${seed} ${d}: 빈칸이 ${p.blanks}개뿐`);
    }
  }
});

/* ────────── 힌트 ────────── */

test('힌트가 가리키는 값이 완성판과 같다', () => {
  for (const seed of SEEDS) {
    for (const d of DIFFICULTIES) {
      const p = makePuzzle(seed, d);
      const h = hintFor(p.board);
      assert.ok(h, `씨앗 ${seed} ${d}: 첫 힌트가 없다`);
      assert.equal(p.board[h.index], 0, '이미 채운 칸을 짚는다');
      assert.equal(h.value, p.solution[h.index], `씨앗 ${seed} ${d}: 힌트 값이 답과 다르다`);
    }
  }
});

test('힌트의 까닭이 실제로 성립한다', () => {
  for (const seed of SEEDS) {
    for (const d of DIFFICULTIES) {
      const p = makePuzzle(seed, d);
      // 몇 칸 채워 가며 여러 번 물어 두 갈래(naked·hidden)를 다 밟는다
      const board = p.board.slice();
      for (let step = 0; step < 12; step++) {
        const h = hintFor(board);
        if (!h) break;
        const where = `씨앗 ${seed} ${d} ${step}번째`;
        if (h.kind === 'naked') {
          assert.deepEqual(
            candidatesHere(board, h.index), [h.value],
            `${where}: 후보가 하나뿐이라는데 실제로는 아니다`,
          );
        } else {
          assert.ok(h.unit, `${where}: hidden인데 근거 단위가 없다`);
          const cells = UNITS_HERE[
            (h.unit.type === 'row' ? 0 : h.unit.type === 'col' ? 9 : 18) + h.unit.index
          ];
          assert.ok(cells.includes(h.index), `${where}: 짚은 칸이 그 단위에 없다`);
          assert.ok(!cells.some(i => board[i] === h.value), `${where}: 그 수가 이미 단위에 있다`);
          const spots = cells.filter(i => candidatesHere(board, i).includes(h.value));
          assert.deepEqual(spots, [h.index], `${where}: 그 수가 들어갈 자리가 ${spots.length}곳이다`);
        }
        assert.equal(h.value, p.solution[h.index], `${where}: 힌트 값이 답과 다르다`);
        board[h.index] = h.value;
      }
    }
  }
});

test('힌트가 짚은 단위 번호가 그 칸의 줄·칸·상자와 맞는다', () => {
  for (const seed of SEEDS) {
    const board = makePuzzle(seed, 'hard').board.slice();
    for (let step = 0; step < 20; step++) {
      const h = hintFor(board);
      if (!h) break;
      if (h.unit) {
        const { row, col } = cellName(h.index);
        if (h.unit.type === 'row') assert.equal(h.unit.index, row - 1, '가로줄 번호가 다르다');
        if (h.unit.type === 'col') assert.equal(h.unit.index, col - 1, '세로줄 번호가 다르다');
        if (h.unit.type === 'box') {
          const box = Math.floor((row - 1) / 3) * 3 + Math.floor((col - 1) / 3);
          assert.equal(h.unit.index, box, '상자 번호가 다르다');
        }
      }
      board[h.index] = h.value;
    }
  }
});

test('다 채운 판에는 힌트가 없다', () => {
  const p = makePuzzle(11, 'normal');
  assert.equal(hintFor(p.solution), null, '완성판에 힌트가 나온다');
});

test('막힌 판에서는 힌트가 없다고 말한다', () => {
  // 어려움은 도중에 확실한 칸이 끊기는 자리가 있다 — 그때 거짓 힌트를 내면 안 된다
  const stuck = hintFor(KNOWN_HARD);
  if (stuck) {
    assert.ok(candidatesHere(KNOWN_HARD, stuck.index).includes(stuck.value), '짚은 칸에 그 수가 못 들어간다');
  }
  // 규칙을 어긴 판은 짚을 자리가 없다
  const bad = KNOWN_EASY.slice();
  bad[1] = bad[0];
  assert.equal(hintFor(bad), null, '규칙을 어긴 판에 힌트가 나온다');
});

/* ────────── 틀린 판 ────────── */

test('규칙을 어긴 판은 답이 없다고 말한다', () => {
  for (const seed of [1, 2, 3]) {
    const p = makePuzzle(seed, 'easy');
    const board = p.board.slice();
    const empty = board.indexOf(0);
    // 같은 가로줄에 이미 있는 수를 넣는다
    const twin = UNITS_HERE[rowOf(empty)].find(i => board[i] !== 0)!;
    board[empty] = board[twin];
    assert.equal(solve(board), null, `씨앗 ${seed}: 겹친 판에 답을 준다`);
    assert.equal(countSolutions(board, 2), 0, `씨앗 ${seed}: 겹친 판의 답을 센다`);
    assert.equal(candidateMasks(board), null, '겹친 판의 후보를 계산한다');
    const bad = conflicts(board);
    assert.ok(bad[empty] && bad[twin], '겹친 두 칸을 짚지 않는다');
  }
});

test('답과 다르게 채운 판은 답이 없다', () => {
  // 규칙은 아직 안 어겼지만 완성까지 갈 수 없는 판 — 여기서 답을 주면 풀이기가 새는 것이다
  const p = makePuzzle(4, 'easy');
  const board = p.board.slice();
  const empty = board.indexOf(0);
  const wrong = candidatesHere(board, empty).find(v => v !== p.solution[empty]);
  assert.ok(wrong, '후보가 하나뿐인 칸이라 이 검사를 할 수 없다');
  board[empty] = wrong;
  assert.ok(!conflicts(board)[empty], '이 판은 규칙 위반이 아니어야 한다');
  assert.equal(solve(board), null, '답이 없는 판에 답을 준다');
  assert.deepEqual(wrongCells(board, p.solution), [empty], '답과 다른 칸을 못 짚는다');
});

test('빈칸이 있거나 어긋난 판은 완성으로 보지 않는다', () => {
  const p = makePuzzle(6, 'normal');
  assert.ok(isSolved(p.solution), '완성판을 완성으로 안 본다');
  assert.ok(!isSolved(p.board), '빈칸이 있는 판을 완성으로 본다');
  const swapped = p.solution.slice();
  [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
  assert.ok(!isSolved(swapped), '두 칸을 바꾼 판을 완성으로 본다');
  assert.ok(!isSolved(p.solution.slice(0, 80)), '80칸짜리를 완성으로 본다');
});

test('conflicts는 겹친 칸만 짚는다', () => {
  const p = makePuzzle(9, 'easy');
  assert.ok(!conflicts(p.solution).some(Boolean), '완성판에 겹친 칸이 있다고 한다');
  const board = new Array<number>(81).fill(0);
  board[0] = 5;
  board[8] = 5; // 같은 가로줄
  board[9] = 5; // 같은 세로줄이자 같은 상자
  const bad = conflicts(board);
  assert.deepEqual(bad.map((b, i) => (b ? i : -1)).filter(i => i >= 0), [0, 8, 9]);
  board[40] = 7;
  assert.ok(!conflicts(board)[40], '외톨이 수를 겹쳤다고 한다');
});

test('후보 계산이 줄·칸·상자를 모두 본다', () => {
  const p = makePuzzle(12, 'normal');
  const masks = candidateMasks(p.board);
  assert.ok(masks, '문제의 후보를 계산하지 못한다');
  for (let i = 0; i < 81; i++) {
    if (p.board[i] !== 0) {
      assert.equal(masks[i], 0, `${i}번: 이미 채운 칸에 후보가 남았다`);
      continue;
    }
    assert.deepEqual(digitsOf(masks[i]), candidatesHere(p.board, i), `${i}번 칸의 후보가 다르다`);
    assert.ok(digitsOf(masks[i]).includes(p.solution[i]), `${i}번: 답이 후보에서 빠졌다`);
  }
});

test('자리 계산이 판의 좌표와 맞는다', () => {
  for (let i = 0; i < 81; i++) {
    const { row, col } = cellName(i);
    assert.equal(row, rowOf(i) + 1);
    assert.equal(col, colOf(i) + 1);
    assert.ok(UNITS.find(u => u.type === 'row' && u.index === rowOf(i))!.cells.includes(i));
    assert.ok(UNITS.find(u => u.type === 'col' && u.index === colOf(i))!.cells.includes(i));
  }
  assert.equal(UNITS.length, 27, '단위가 27개가 아니다');
});

/* ────────── 등록 ────────── */

test('한국어 카탈로그에 스도쿠가 있다', () => {
  const t = findGameTool('sudoku');
  assert.ok(t, 'lib/game-tools.ts에 없다');
  assert.ok(t.title.trim(), 'title 없음');
  assert.ok(t.metaTitle.includes(t.title), 'metaTitle에 이름이 없다');
  assert.ok(t.long.length >= 40, `설명이 짧다 (${t.long.length}자)`);
  assert.ok(t.features.length >= 4, `기능이 ${t.features.length}개뿐`);
  assert.ok(
    GAME_TOOLS.some(g => g.slug !== 'sudoku' && g.category === t.category),
    `'${t.category}'를 쓰는 다른 도구가 없다 — 허브 목록에 없는 분류다`,
  );
});

test('라우트와 접힌 모듈이 있다', () => {
  const ko = join(appJoin('game'), 'sudoku', 'page.tsx');
  assert.ok(existsSync(ko), '한국어 라우트가 없다');
  const src = readFileSync(ko, 'utf8');
  assert.ok(src.includes('GameShell'), '공용 셸을 안 쓴다');
  assert.ok(src.includes('slug="sudoku"'), '셸에 넘긴 slug가 다르다');
  assert.ok(src.includes("canonical: '/game/sudoku'"), 'canonical이 없다');
  assert.ok(!/min-h-screen|<h1/.test(src), '페이지가 직접 레이아웃을 그린다');

  const root = join(import.meta.dirname, '..');
  const fold = join(root, 'lib', 'fold', 'pages', 'game__sudoku.tsx');
  assert.ok(existsSync(fold), '아홉 언어가 쓰는 접힌 모듈이 없다');
  assert.ok(readFileSync(fold, 'utf8').includes('GameShellIntl'), '국제 셸을 안 쓴다');

  const registry = readFileSync(join(root, 'lib', 'fold', 'registry.ts'), 'utf8');
  assert.ok(
    registry.includes("'game/sudoku': () => import('./pages/game__sudoku')"),
    'lib/fold/registry.ts에 줄이 없다 — 아홉 언어가 조용히 404가 된다',
  );
});

test('화면이 셈을 라이브러리에서 가져다 쓴다', () => {
  const src = readFileSync(join(import.meta.dirname, '..', 'components', 'game', 'SudokuGame.tsx'), 'utf8');
  assert.ok(src.includes("from '@/lib/sudoku'"), '판 만들기를 컴포넌트가 직접 한다');
  assert.ok(src.includes('makePuzzle'), '문제를 라이브러리에서 안 받는다');
  assert.ok(src.includes('hintFor'), '힌트를 라이브러리에서 안 받는다');
  // 기록은 공용 관용(vixutil:best:<게임>)을 따라야 다른 게임과 한자리에 남는다
  assert.match(src, /useBest\(`sudoku-\$\{difficulty\}`, lower\)/, '기록 열쇠 관용을 안 따른다');
  assert.ok(!src.includes('Math.random()') || src.includes('Math.floor(Math.random() * 100000)'),
    '판을 Math.random()으로 만든다 — 씨앗에서 만들어야 되짚을 수 있다');
});

test('난이도마다 기록 열쇠가 갈린다', () => {
  // 쉬움 3분과 어려움 20분을 한 열쇠에 담으면 어려움 기록이 영원히 안 남는다
  const keys = DIFFICULTIES.map(d => `sudoku-${d}`);
  assert.equal(new Set(keys).size, 3);
  for (const k of keys) assert.match(k, /^sudoku-[a-z]+$/);
});

/* ────────── 열 언어 ────────── */

const INTL: string[] = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

test('열 언어 문구가 다 있고 비어 있지 않다', () => {
  const langs = Object.keys(SUDOKU_UI);
  assert.equal(langs.length, 10, `언어가 ${langs.length}개`);
  for (const lang of langs) {
    const ui = SUDOKU_UI[lang as keyof typeof SUDOKU_UI];
    for (const k of SUDOKU_UI_KEYS) {
      assert.ok(ui[k] && ui[k].trim().length > 0, `${lang}.${k}가 비었다`);
    }
    const min = DENSE.has(langOfLocale(lang)) ? 40 : 70;
    assert.ok(ui.note.length >= min, `${lang}.note가 짧다 (${ui.note.length}자)`);
  }
});

test('열 언어 열쇠가 언어 목록과 어긋나지 않는다', () => {
  // SUDOKU_UI는 경로형 로케일을 열쇠로 쓴다 — 자료 열쇠로 바꿔 대조한다
  const keys = new Set(Object.keys(SUDOKU_UI).map(langOfLocale));
  for (const code of LANG_CODES) assert.ok(keys.has(code), `${code} 문구가 없다`);
  assert.equal(keys.size, LANG_CODES.length);
});

test('문구가 영어 그대로가 아니다', () => {
  for (const lang of Object.keys(SUDOKU_UI)) {
    if (lang === 'en') continue;
    const ui = SUDOKU_UI[lang as keyof typeof SUDOKU_UI];
    const same = SUDOKU_UI_KEYS.filter(k => ui[k] === SUDOKU_UI.en[k]);
    assert.ok(
      same.length * 3 < SUDOKU_UI_KEYS.length,
      `${lang}: ${same.length}/${SUDOKU_UI_KEYS.length}개가 영어와 같다 — ${same.join(', ')}`,
    );
    // 긴 문장이 같으면 그냥 안 옮긴 것이다
    for (const k of ['how', 'note', 'hintNaked', 'hintNone', 'conflict'] as const) {
      assert.notEqual(ui[k], SUDOKU_UI.en[k], `${lang}.${k}가 영어 그대로다`);
    }
  }
});

test('화면 문구에 남의 언어 한자가 안 섞인다', () => {
  for (const lang of Object.keys(SUDOKU_UI)) {
    const key = langOfLocale(lang);
    const ui = SUDOKU_UI[lang as keyof typeof SUDOKU_UI];
    for (const k of SUDOKU_UI_KEYS) {
      assert.equal(hanProblem(key, ui[k]), '', `${lang}.${k}`);
    }
  }
});

test('힌트 문장에 값과 자리를 끼울 곳이 남아 있다', () => {
  /*
   * 옮기다 {v}를 떨어뜨리면 "이 칸에는 만 들어갑니다"가 된다. 화면에서는
   * 그 언어를 쓰는 사람만 알아채므로 여기서 센다.
   */
  const need: Record<string, string[]> = {
    hintNaked: ['{v}', '{r}', '{c}'],
    hintRow: ['{v}', '{n}', '{c}'],
    hintCol: ['{v}', '{n}', '{r}'],
    hintBox: ['{v}', '{n}', '{r}', '{c}'],
    cellLabel: ['{r}', '{c}'],
  };
  for (const lang of Object.keys(SUDOKU_UI)) {
    const ui = SUDOKU_UI[lang as keyof typeof SUDOKU_UI];
    for (const [k, slots] of Object.entries(need)) {
      for (const s of slots) {
        assert.ok(ui[k as (typeof SUDOKU_UI_KEYS)[number]].includes(s), `${lang}.${k}에 ${s}가 없다`);
      }
    }
    // 자리가 없어야 하는 문장에 자리가 들어가 있으면 그대로 새어 나온다
    for (const k of ['how', 'note', 'newGame', 'hint', 'undo', 'notes', 'erase'] as const) {
      assert.ok(!ui[k].includes('{'), `${lang}.${k}에 바꿔 끼울 자리가 남아 있다`);
    }
  }
});

test('자리를 바꿔 끼우면 중괄호가 남지 않는다', () => {
  for (const lang of Object.keys(SUDOKU_UI)) {
    const ui = SUDOKU_UI[lang as keyof typeof SUDOKU_UI];
    for (const k of ['hintNaked', 'hintRow', 'hintCol', 'hintBox', 'cellLabel'] as const) {
      const out = fillSlots(ui[k], { v: 7, r: 3, c: 5, n: 2 });
      assert.ok(!out.includes('{'), `${lang}.${k}: ${out}`);
      assert.ok(out.includes('7') || k === 'cellLabel', `${lang}.${k}: 값이 안 들어갔다`);
    }
  }
  // 없는 자리는 건드리지 않는다 — 사전에 새 자리를 넣었을 때 조용히 지워지면 안 된다
  assert.equal(fillSlots('{x}와 {v}', { v: 1 }), '{x}와 1');
});

test('아홉 언어 도구 문구가 폴백이 아니다', () => {
  const ko = findGameTool('sudoku')!;
  for (const locale of INTL) {
    const t = findGameToolIntl(locale as never, 'sudoku');
    assert.ok(t, `${locale}: 도구가 없다`);
    assert.notEqual(t.title, ko.title, `${locale}: 제목이 한국어 그대로다`);
    assert.notEqual(t.long, ko.long, `${locale}: 설명이 한국어 그대로다`);
    assert.ok(t.metaTitle.includes(t.title), `${locale}: metaTitle에 이름이 없다`);
    assert.equal(t.features.length, ko.features.length, `${locale}: 기능 수가 다르다`);
    const min = DENSE.has(langOfLocale(locale)) ? 24 : 40;
    assert.ok(t.long.length >= min, `${locale}: 설명이 짧다 (${t.long.length}자)`);
  }
});

test('아홉 언어 분류가 그 언어의 기존 분류 가운데 하나다', () => {
  // 새 분류를 만들면 허브에서 그 묶음이 안 그려진다
  for (const locale of INTL) {
    const mine = findGameToolIntl(locale as never, 'sudoku')!;
    const others = ['reaction', 'memory', 'math', 'stroop', 'hearing']
      .map(s => findGameToolIntl(locale as never, s)!.category);
    assert.ok(others.includes(mine.category), `${locale}: 새 분류 ${mine.category}`);
  }
});

test('도구 문구에 남의 언어 한자가 안 섞인다', () => {
  for (const locale of INTL) {
    const t = findGameToolIntl(locale as never, 'sudoku')!;
    const key = langOfLocale(locale);
    for (const text of [t.title, t.desc, t.category, t.metaTitle, t.long, ...t.features]) {
      assert.equal(hanProblem(key, text), '', `${locale}`);
    }
  }
});
