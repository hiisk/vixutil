import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  LEVELS, LEVEL_ORDER, bbbv, boardFromMap, flagCount, markAt, neighbors,
  newBoard, openAt, plant, remaining, seededRng, type Board, type Level,
} from '../lib/minesweeper.ts';
import { MINESWEEPER_UI, MINESWEEPER_UI_KEYS } from '../lib/minesweeper-ui.ts';
import { GAME_TOOLS } from '../lib/game-tools.ts';
import { findGameToolIntl } from '../lib/game-tools-intl.ts';
import { LANG_CODES, langOfLocale } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

/**
 * 지뢰찾기의 셈 검사.
 *
 * 눈으로 못 잡는 것을 잡는다 — 가장자리에서 이웃을 잘못 세는 것, 이어 열기가
 * 새는 것, 어쩌다 첫 클릭이 지뢰인 것. 셋 다 화면에서는 "숫자가 좀 이상한데"로
 * 보일 뿐이라 몇 판 해서는 모른다.
 *
 * ── 여기서 이웃을 다시 세는 이유 ──────────────────────────────
 * 아래 countNear는 lib/minesweeper.ts의 neighbors를 **쓰지 않는다.** 그것을
 * 쓰면 가장자리 셈이 틀렸을 때 검사도 똑같이 틀리게 세어 통과한다. 가로·세로를
 * 직접 돌려서 따로 센다.
 */
function countNear(board: Board, col: number, row: number): number {
  let n = 0;
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r === row && c === col) continue;
      if (c < 0 || c >= board.cols || r < 0 || r >= board.rows) continue;
      if (board.mine[r * board.cols + c]) n++;
    }
  }
  return n;
}

/** 검사가 직접 쓰는 이웃 — 위와 같은 이유로 라이브러리를 안 쓴다 */
function neighborsHere(cols: number, rows: number, i: number): number[] {
  const col = i % cols;
  const row = Math.floor(i / cols);
  const out: number[] = [];
  for (let r = row - 1; r <= row + 1; r++) {
    for (let c = col - 1; c <= col + 1; c++) {
      if (r === row && c === col) continue;
      if (c < 0 || c >= cols || r < 0 || r >= rows) continue;
      out.push(r * cols + c);
    }
  }
  return out;
}

const SEEDS = [1, 2, 3, 7, 42, 99, 1234, 20260812, 0, 4294967295];

/* ────────── 씨앗 ────────── */

test('씨앗이 같으면 같은 난수 줄이 나온다', () => {
  const a = seededRng(777);
  const b = seededRng(777);
  for (let i = 0; i < 200; i++) assert.equal(a(), b());
});

test('난수가 0 이상 1 미만이고 한 값에 머물지 않는다', () => {
  const rng = seededRng(5);
  const seen = new Set<number>();
  for (let i = 0; i < 5000; i++) {
    const v = rng();
    assert.ok(v >= 0 && v < 1, `범위를 벗어났다: ${v}`);
    seen.add(v);
  }
  assert.ok(seen.size > 4900, `같은 값이 너무 자주 나온다 (${seen.size}/5000)`);
});

/* ────────── 판 규격 ────────── */

test('널리 쓰이는 세 판이 그대로 있다', () => {
  assert.deepEqual(LEVEL_ORDER, ['beginner', 'intermediate', 'expert']);
  assert.deepEqual(LEVELS.beginner, { cols: 9, rows: 9, mines: 10 });
  assert.deepEqual(LEVELS.intermediate, { cols: 16, rows: 16, mines: 40 });
  assert.deepEqual(LEVELS.expert, { cols: 30, rows: 16, mines: 99 });
});

test('지뢰 밀도가 세 판 모두 사람이 풀 만한 범위다', () => {
  for (const lv of LEVEL_ORDER) {
    const { cols, rows, mines } = LEVELS[lv];
    const density = mines / (cols * rows);
    assert.ok(density > 0.1 && density < 0.25, `${lv}: 밀도 ${density.toFixed(3)}`);
  }
});

/* ────────── 지뢰 수 ────────── */

test('여러 씨앗·난이도에서 지뢰 개수가 정확하다', () => {
  for (const lv of LEVEL_ORDER) {
    const shape = LEVELS[lv];
    for (const seed of SEEDS) {
      // 첫 클릭 자리를 바꿔 가며 — 안전지대를 비우고도 수가 줄지 않아야 한다
      for (const safe of [0, 5, shape.cols - 1, shape.cols * shape.rows - 1, Math.floor(shape.cols * shape.rows / 2)]) {
        const b = plant(newBoard(shape, seed), safe);
        const count = b.mine.filter(Boolean).length;
        assert.equal(count, shape.mines, `${lv} 씨앗 ${seed} 안전칸 ${safe}: 지뢰 ${count}개`);
      }
    }
  }
});

test('지뢰 수를 칸 수 아래로 자른다', () => {
  const b = newBoard({ cols: 3, rows: 3, mines: 100 }, 1);
  assert.equal(b.mines, 8, '전부 지뢰면 첫 클릭에 안전한 칸이 없다');
});

test('안전지대가 판을 다 덮으면 클릭한 칸만 비운다', () => {
  // 3×3에 지뢰 여덟 — 이웃까지 비우면 놓을 자리가 0이다
  const b = plant(newBoard({ cols: 3, rows: 3, mines: 8 }, 3), 4);
  assert.equal(b.mine.filter(Boolean).length, 8);
  assert.equal(b.mine[4], false, '첫 클릭 자리는 그래도 안전해야 한다');
});

/* ────────── 이웃 세기 ────────── */

test('모든 칸의 주변 지뢰 수가 맞다', () => {
  for (const lv of LEVEL_ORDER) {
    const shape = LEVELS[lv];
    for (const seed of SEEDS) {
      const b = plant(newBoard(shape, seed), 0);
      for (let row = 0; row < b.rows; row++) {
        for (let col = 0; col < b.cols; col++) {
          const i = row * b.cols + col;
          assert.equal(b.near[i], countNear(b, col, row), `${lv} 씨앗 ${seed}: (${col},${row})`);
        }
      }
    }
  }
});

test('가장자리 칸의 이웃이 줄을 넘어가지 않는다', () => {
  // 5×4 판에서 왼쪽 끝·오른쪽 끝·네 귀퉁이의 이웃 수를 못 박는다
  const cols = 5, rows = 4;
  const corner = [0, cols - 1, (rows - 1) * cols, rows * cols - 1];
  for (const i of corner) assert.equal(neighbors(cols, rows, i).length, 3, `귀퉁이 ${i}`);
  // 왼쪽 끝 줄 가운데 — 오른쪽 끝을 이웃으로 세면 8이 된다
  assert.equal(neighbors(cols, rows, cols).length, 5, '왼쪽 끝');
  assert.equal(neighbors(cols, rows, cols * 2 - 1).length, 5, '오른쪽 끝');
  assert.equal(neighbors(cols, rows, cols + 2).length, 8, '한가운데');
  // 자리까지 못 박는다
  assert.deepEqual(neighbors(cols, rows, 0).sort((a, b) => a - b), [1, 5, 6]);
  assert.deepEqual(neighbors(cols, rows, 5).sort((a, b) => a - b), [0, 1, 6, 10, 11]);
});

test('이웃 셈이 검사의 셈과 모든 자리에서 같다', () => {
  for (const [cols, rows] of [[1, 1], [1, 7], [7, 1], [2, 3], [9, 9], [30, 16]]) {
    for (let i = 0; i < cols * rows; i++) {
      assert.deepEqual(
        neighbors(cols, rows, i).slice().sort((a, b) => a - b),
        neighborsHere(cols, rows, i).slice().sort((a, b) => a - b),
        `${cols}×${rows} ${i}번`,
      );
    }
  }
});

test('이웃이 자기 자신을 넣지 않고 중복도 없다', () => {
  for (let i = 0; i < 9 * 9; i++) {
    const ns = neighbors(9, 9, i);
    assert.ok(!ns.includes(i), `${i}: 자기 자신`);
    assert.equal(new Set(ns).size, ns.length, `${i}: 중복`);
  }
});

/* ────────── 첫 클릭 ────────── */

test('첫 클릭은 지뢰가 아니고, 언제나 0이다', () => {
  for (const lv of LEVEL_ORDER) {
    const shape = LEVELS[lv];
    const total = shape.cols * shape.rows;
    for (const seed of SEEDS) {
      // 판 전체를 훑는다 — 어느 칸을 먼저 눌러도 안전해야 한다
      for (let i = 0; i < total; i++) {
        const b = openAt(newBoard(shape, seed), i);
        assert.equal(b.mine[i], false, `${lv} 씨앗 ${seed} ${i}번이 지뢰다`);
        assert.equal(b.near[i], 0, `${lv} 씨앗 ${seed} ${i}번이 0이 아니다`);
        assert.equal(b.status, 'playing', `${lv} 씨앗 ${seed} ${i}번: 상태가 ${b.status}`);
      }
    }
  }
});

test('첫 클릭 자리의 이웃 여덟도 비어 있다', () => {
  for (const seed of SEEDS) {
    for (const i of [0, 4, 40, 80]) {
      const b = openAt(newBoard(LEVELS.beginner, seed), i);
      for (const n of neighborsHere(b.cols, b.rows, i)) {
        assert.equal(b.mine[n], false, `씨앗 ${seed} ${i}번의 이웃 ${n}이 지뢰다`);
      }
    }
  }
});

test('첫 클릭에 여러 칸이 열린다', () => {
  // 첫 클릭이 0이라는 말은 곧 한 칸만 열리고 끝나지 않는다는 뜻이다
  for (const seed of SEEDS) {
    const b = openAt(newBoard(LEVELS.beginner, seed), 40);
    assert.ok(b.open.filter(Boolean).length >= 9, `씨앗 ${seed}: ${b.open.filter(Boolean).length}칸만 열렸다`);
  }
});

test('빈 판은 아직 지뢰를 놓지 않았다', () => {
  const b = newBoard(LEVELS.expert, 1);
  assert.equal(b.placed, false);
  assert.equal(b.status, 'ready');
  assert.equal(b.mine.filter(Boolean).length, 0);
  assert.equal(b.open.filter(Boolean).length, 0);
});

/* ────────── 이어 열기 ────────── */

/**
 * 열린 영역의 경계가 모두 숫자 칸인가.
 *
 * 열린 0 칸의 이웃 여덟이 하나도 빠짐없이 열려 있어야 한다. 하나라도 안 열려
 * 있으면 그 안에 안 열린 0이 남았다는 뜻이고, 이어 열기가 샌 것이다.
 *
 * 거꾸로는 성립하지 않는다 — 안 열린 0 칸이 열린 **숫자** 칸에 붙어 있는 것은
 * 정상이다. 그 숫자 칸은 다른 덩어리의 경계로 열렸을 뿐이다.
 */
function floodLeak(b: Board): string {
  for (let i = 0; i < b.open.length; i++) {
    if (!b.open[i]) continue;
    if (b.near[i] !== 0) continue;          // 숫자 칸은 경계라서 여기서 멈춘다
    for (const n of neighborsHere(b.cols, b.rows, i)) {
      if (!b.open[n]) return `${i}번(0)의 이웃 ${n}이 안 열렸다`;
    }
  }
  return '';
}

/** 한 칸을 눌렀을 때 열려야 하는 칸 — 라이브러리를 안 쓰고 따로 센다 */
function shouldOpen(b: Board, start: number): Set<number> {
  const out = new Set<number>([start]);
  if (b.near[start] !== 0 || b.mine[start]) return out;
  const stack = [start];
  while (stack.length) {
    const j = stack.pop()!;
    for (const n of neighborsHere(b.cols, b.rows, j)) {
      if (out.has(n)) continue;
      out.add(n);
      if (!b.mine[n] && b.near[n] === 0) stack.push(n);
    }
  }
  return out;
}

test('0인 칸을 열면 이어서 열리고, 경계가 모두 숫자 칸이다', () => {
  for (const lv of LEVEL_ORDER) {
    const shape = LEVELS[lv];
    for (const seed of SEEDS) {
      const b = openAt(newBoard(shape, seed), Math.floor(shape.cols * shape.rows / 2));
      assert.equal(floodLeak(b), '', `${lv} 씨앗 ${seed}`);
    }
  }
});

test('열린 칸이 따로 센 것과 한 칸도 어긋나지 않는다', () => {
  // 경계만 보면 "너무 많이 열렸다"를 놓친다 — 자리를 통째로 맞춰 본다
  for (const lv of LEVEL_ORDER) {
    const shape = LEVELS[lv];
    for (const seed of SEEDS) {
      const first = Math.floor(shape.cols * shape.rows / 2);
      const b = openAt(newBoard(shape, seed), first);
      const want = shouldOpen(b, first);
      const got = new Set([...b.open.keys()].filter(i => b.open[i]));
      assert.deepEqual([...got].sort((x, y) => x - y), [...want].sort((x, y) => x - y),
        `${lv} 씨앗 ${seed}`);
    }
  }
});

test('숫자 칸에서 이어 열기가 시작되지 않는다', () => {
  for (const seed of SEEDS) {
    // 첫 클릭으로 판을 만든 뒤, 아직 안 열린 숫자 칸을 하나 눌러 본다
    const b = openAt(newBoard(LEVELS.intermediate, seed), 0);
    const numbered = [...b.near.keys()].find(i => !b.open[i] && !b.mine[i] && b.near[i] > 0);
    assert.ok(numbered !== undefined, `씨앗 ${seed}: 누를 숫자 칸이 없다`);
    const after = openAt(b, numbered);
    const grew = [...after.open.keys()].filter(i => after.open[i] && !b.open[i]);
    assert.deepEqual(grew, [numbered], `씨앗 ${seed}: ${grew.length}칸이 열렸다`);
  }
});

test('여러 번 열어도 경계가 유지된다', () => {
  // 판을 한 칸씩 다 눌러 본다 — 지뢰만 빼고
  for (const seed of SEEDS) {
    let b = openAt(newBoard(LEVELS.intermediate, seed), 0);
    for (let i = 0; i < b.mine.length; i++) {
      if (b.mine[i]) continue;
      b = openAt(b, i);
      assert.notEqual(b.status, 'lost', `씨앗 ${seed}: ${i}번에서 졌다`);
    }
    assert.equal(floodLeak(b), '', `씨앗 ${seed}`);
    assert.equal(b.status, 'won', `씨앗 ${seed}: 다 열었는데 ${b.status}`);
  }
});

test('열린 영역이 지뢰를 삼키지 않는다', () => {
  for (const seed of SEEDS) {
    const b = openAt(newBoard(LEVELS.expert, seed), 200);
    for (let i = 0; i < b.mine.length; i++) {
      assert.ok(!(b.mine[i] && b.open[i]), `씨앗 ${seed}: ${i}번 지뢰가 열려 있다`);
    }
  }
});

test('숫자 칸을 열면 그 칸만 열린다', () => {
  const b = boardFromMap([
    '*....',
    '.....',
    '.....',
  ]);
  const one = openAt(b, 1);     // (1,0)은 1이다
  assert.equal(one.near[1], 1);
  assert.deepEqual(one.open.map(Boolean), [
    false, true, false, false, false,
    false, false, false, false, false,
    false, false, false, false, false,
  ]);
});

test('이어 열기가 두 덩어리를 잇지 않는다', () => {
  /*
   * 아래 판은 0 덩어리가 왼쪽·오른쪽 둘로 갈려 있다. 왼쪽을 눌렀을 때
   * 오른쪽 덩어리까지 열리면 이어 열기가 벽을 넘은 것이다.
   */
  const b = openAt(boardFromMap([
    '.....',
    '..*..',
    '.....',
  ]), 0);
  assert.equal(b.open[4], false, '오른쪽 끝(0)까지 열렸다');
  assert.equal(b.open[14], false, '오른쪽 아래(0)까지 열렸다');
  // 왼쪽 덩어리 세 칸과 그것에 닿은 숫자 칸 세 칸, 여섯 칸만 열린다
  assert.deepEqual([...b.open.keys()].filter(i => b.open[i]), [0, 1, 5, 6, 10, 11]);
  assert.equal(b.open[2], false, '가운데 위 숫자 칸은 어느 덩어리에도 닿지 않는다');
});

/* ────────── 재현 ────────── */

test('씨앗과 첫 클릭이 같으면 판이 같다', () => {
  for (const lv of LEVEL_ORDER) {
    for (const seed of SEEDS) {
      const a = openAt(newBoard(LEVELS[lv], seed), 3);
      const b = openAt(newBoard(LEVELS[lv], seed), 3);
      assert.deepEqual(a.mine, b.mine, `${lv} 씨앗 ${seed}`);
      assert.deepEqual(a.near, b.near, `${lv} 씨앗 ${seed}`);
      assert.deepEqual(a.open, b.open, `${lv} 씨앗 ${seed}`);
    }
  }
});

test('씨앗이 다르면 판이 다르다', () => {
  const key = (b: Board) => b.mine.map(m => (m ? 1 : 0)).join('');
  const seen = new Map<string, number>();
  for (let seed = 1; seed <= 200; seed++) {
    const k = key(plant(newBoard(LEVELS.beginner, seed), 40));
    const had = seen.get(k);
    assert.equal(had, undefined, `씨앗 ${seed}가 ${had}와 같은 판을 낸다`);
    seen.set(k, seed);
  }
});

test('첫 클릭 자리가 다르면 배치도 달라진다', () => {
  // 안전지대가 자리마다 다르므로 같은 씨앗이라도 배치가 갈린다
  const a = plant(newBoard(LEVELS.beginner, 11), 0);
  const b = plant(newBoard(LEVELS.beginner, 11), 80);
  assert.notDeepEqual(a.mine, b.mine);
});

test('지뢰가 판 한쪽에 몰리지 않는다', () => {
  // 부분 셔플이 앞자리만 뽑으면 지뢰가 위쪽 줄에 쏠린다
  const half = [0, 0];
  for (let seed = 1; seed <= 400; seed++) {
    const b = plant(newBoard(LEVELS.expert, seed), 240);
    for (let i = 0; i < b.mine.length; i++) {
      if (b.mine[i]) half[i < b.mine.length / 2 ? 0 : 1]++;
    }
  }
  const ratio = half[0] / (half[0] + half[1]);
  assert.ok(ratio > 0.45 && ratio < 0.55, `위쪽 절반에 ${(ratio * 100).toFixed(1)}%`);
});

/* ────────── 승패 ────────── */

test('지뢰가 아닌 칸을 다 열면 이긴다', () => {
  const b = plant(newBoard(LEVELS.beginner, 8), 40);
  let cur = b;
  for (let i = 0; i < cur.mine.length; i++) if (!cur.mine[i]) cur = openAt(cur, i);
  assert.equal(cur.status, 'won');
  assert.equal(cur.open.filter(Boolean).length, 81 - 10);
});

test('마지막 한 칸을 남기면 아직 안 이긴다', () => {
  let cur = plant(newBoard(LEVELS.beginner, 8), 40);
  const safe = [...cur.mine.keys()].filter(i => !cur.mine[i]);
  for (const i of safe.slice(0, -1)) cur = openAt(cur, i);
  const last = safe[safe.length - 1];
  if (cur.open[last]) return;              // 이어 열기로 이미 다 열렸다면 이 판은 넘긴다
  assert.equal(cur.status, 'playing');
  cur = openAt(cur, last);
  assert.equal(cur.status, 'won');
});

test('지뢰를 열면 진다', () => {
  const b = plant(newBoard(LEVELS.beginner, 8), 40);
  const mineAt = b.mine.indexOf(true);
  const lost = openAt(b, mineAt);
  assert.equal(lost.status, 'lost');
  assert.equal(lost.blast, mineAt, '밟은 자리를 기억해야 화면이 그것만 붉게 그린다');
  assert.equal(lost.open[mineAt], true);
});

test('끝난 판에서는 아무 일도 일어나지 않는다', () => {
  const b = plant(newBoard(LEVELS.beginner, 8), 40);
  const lost = openAt(b, b.mine.indexOf(true));
  const safe = b.mine.indexOf(false);
  assert.equal(openAt(lost, safe), lost, '진 뒤에 칸이 열린다');
  assert.equal(markAt(lost, safe), lost, '진 뒤에 깃발이 꽂힌다');
});

test('판 밖을 누르면 판이 그대로다', () => {
  const b = plant(newBoard(LEVELS.beginner, 8), 40);
  assert.equal(openAt(b, -1), b);
  assert.equal(openAt(b, 81), b);
  assert.equal(markAt(b, 81), b);
});

/* ────────── 깃발 ────────── */

test('깃발을 꽂은 칸은 열리지 않는다', () => {
  const b = plant(newBoard(LEVELS.beginner, 8), 40);
  const safe = b.mine.indexOf(false);
  const flagged = markAt(b, safe);
  assert.equal(flagged.mark[safe], 'flag');
  const after = openAt(flagged, safe);
  assert.equal(after.open[safe], false, '깃발이 꽂혔는데 열렸다');
  assert.equal(after.status, 'playing');
});

test('깃발이 지뢰 위에 있으면 밟지 않는다', () => {
  const b = plant(newBoard(LEVELS.beginner, 8), 40);
  const mineAt = b.mine.indexOf(true);
  const after = openAt(markAt(b, mineAt), mineAt);
  assert.equal(after.status, 'playing', '깃발을 꽂은 지뢰를 밟았다');
});

test('이어 열기가 깃발에서 멈춘다', () => {
  // 깃발은 "건드리지 말라"는 자물쇠다 — 이어 열기가 그것을 넘으면 안 된다
  const b = boardFromMap([
    '.....',
    '.....',
    '....*',
  ]);
  const flagged = markAt(b, 6);
  const after = openAt(flagged, 0);
  assert.equal(after.open[6], false, '깃발 칸이 열렸다');
  assert.equal(after.open[0], true);
});

test('표시가 없음 → 깃발 → 물음표 → 없음으로 돈다', () => {
  const b = plant(newBoard(LEVELS.beginner, 8), 40);
  const i = b.mine.indexOf(false);
  const a = markAt(b, i);
  const c = markAt(a, i);
  const d = markAt(c, i);
  assert.deepEqual([a.mark[i], c.mark[i], d.mark[i]], ['flag', 'guess', 'none']);
});

test('물음표는 남은 지뢰 수에서 세지 않는다', () => {
  let b = plant(newBoard(LEVELS.beginner, 8), 40);
  assert.equal(remaining(b), 10);
  b = markAt(b, 0);                    // 깃발
  assert.equal(remaining(b), 9);
  assert.equal(flagCount(b), 1);
  b = markAt(b, 0);                    // 물음표
  assert.equal(remaining(b), 10);
  assert.equal(flagCount(b), 0);
});

test('깃발을 지뢰 수보다 많이 꽂으면 남은 수가 음수가 된다', () => {
  // 감추면 사람이 "깃발을 어디 잘못 꽂았다"를 알 길이 없다
  let b = plant(newBoard(LEVELS.beginner, 8), 40);
  for (let i = 0; i < 12; i++) b = markAt(b, i);
  assert.equal(remaining(b), -2);
});

test('열린 칸에는 깃발이 꽂히지 않는다', () => {
  const b = openAt(newBoard(LEVELS.beginner, 8), 40);
  assert.equal(markAt(b, 40).mark[40], 'none');
});

/* ────────── 3BV ────────── */

test('손으로 센 3BV와 맞는다', () => {
  /*
   * 0 덩어리가 왼쪽 한 줄·오른쪽 한 줄로 둘, 그 덩어리에 닿지 않는 숫자 칸이
   * 가운데 위아래로 둘((0,2)와 (2,2)). 그래서 2 + 2 = 4다.
   */
  assert.equal(bbbv(boardFromMap([
    '.....',
    '..*..',
    '.....',
  ])), 4);

  // 0인 칸이 하나도 없으면 지뢰 아닌 칸 전부를 눌러야 한다 — 다섯 칸
  assert.equal(bbbv(boardFromMap([
    '*.*',
    '...',
    '*.*',
  ])), 5);

  // 지뢰 하나가 귀퉁이에 — 판 전체가 한 덩어리로 열린다
  assert.equal(bbbv(boardFromMap([
    '*..',
    '...',
    '...',
  ])), 1);

  // 지뢰가 없으면 아무 칸이나 한 번
  assert.equal(bbbv(boardFromMap(['...', '...', '...'])), 1);

  // 한 줄짜리 판 — 0이 없어 세 칸을 따로 누른다
  assert.equal(bbbv(boardFromMap(['.*.*.'])), 3);
});

test('3BV만큼 눌러서 판이 끝난다', () => {
  /*
   * 3BV의 정의를 되짚는다 — 덩어리마다 한 칸, 덩어리에 안 닿은 숫자 칸마다
   * 한 칸을 고르면 그 수가 3BV와 같고, 그것만 눌러서 이겨야 한다.
   * 고르는 셈은 라이브러리를 안 쓰고 여기서 따로 한다.
   */
  for (const lv of LEVEL_ORDER) {
    for (const seed of SEEDS) {
      const b = plant(newBoard(LEVELS[lv], seed), 0);
      const total = b.cols * b.rows;
      const seen = new Set<number>();
      const clicks: number[] = [];

      for (let i = 0; i < total; i++) {
        if (b.mine[i] || b.near[i] !== 0 || seen.has(i)) continue;
        clicks.push(i);
        seen.add(i);
        const stack = [i];
        while (stack.length) {
          const j = stack.pop()!;
          for (const n of neighborsHere(b.cols, b.rows, j)) {
            if (seen.has(n)) continue;
            seen.add(n);
            if (!b.mine[n] && b.near[n] === 0) stack.push(n);
          }
        }
      }
      for (let i = 0; i < total; i++) if (!b.mine[i] && !seen.has(i)) clicks.push(i);

      assert.equal(clicks.length, bbbv(b), `${lv} 씨앗 ${seed}: 클릭 수와 3BV가 다르다`);
      let cur = b;
      for (const i of clicks) cur = openAt(cur, i);
      assert.equal(cur.status, 'won', `${lv} 씨앗 ${seed}: ${clicks.length}번 눌렀는데 ${cur.status}`);
    }
  }
});

test('3BV가 1 이상, 지뢰 아닌 칸 수 이하다', () => {
  for (const lv of LEVEL_ORDER) {
    for (const seed of SEEDS) {
      const b = plant(newBoard(LEVELS[lv], seed), 0);
      const safe = b.cols * b.rows - b.mines;
      const v = bbbv(b);
      assert.ok(v >= 1 && v <= safe, `${lv} 씨앗 ${seed}: 3BV ${v} (안전칸 ${safe})`);
    }
  }
});

test('고급 판의 3BV가 널리 알려진 범위에 든다', () => {
  // 30×16·99개의 3BV는 대개 100~200 사이다. 크게 벗어나면 배치나 셈이 이상하다
  const vals: number[] = [];
  for (let seed = 1; seed <= 60; seed++) vals.push(bbbv(plant(newBoard(LEVELS.expert, seed), 240)));
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  assert.ok(mean > 100 && mean < 200, `평균 3BV ${mean.toFixed(1)}`);
});

/* ────────── 열 언어 문구 ────────── */

const INTL_TO_KEY: Record<string, string> = {
  en: 'en', es: 'es', 'pt-br': 'pt', ja: 'ja', de: 'de',
  fr: 'fr', hi: 'hi', 'zh-hans': 'zh', 'zh-hant': 'tw',
};

test('열 언어 화면 문구가 다 채워져 있다', () => {
  const locales = Object.keys(MINESWEEPER_UI);
  assert.equal(locales.length, 10, `언어가 ${locales.length}개뿐`);
  for (const locale of locales) {
    const ui = MINESWEEPER_UI[locale as keyof typeof MINESWEEPER_UI];
    for (const key of MINESWEEPER_UI_KEYS) {
      const v = ui[key];
      assert.equal(typeof v, 'string', `${locale}.${key}: 문자열이 아니다`);
      assert.ok(v.trim().length > 0, `${locale}.${key}: 비어 있다`);
    }
  }
});

test('화면 문구에 이모지가 섞이지 않는다', () => {
  // 공유 카드에서 컬러 이모지가 걷혀 나가는 일이 있었고, 이 화면은 SVG로 그린다
  const emoji = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
  for (const [locale, ui] of Object.entries(MINESWEEPER_UI)) {
    for (const key of MINESWEEPER_UI_KEYS) {
      assert.ok(!emoji.test(ui[key]), `${locale}.${key}: 이모지가 있다 — ${ui[key]}`);
    }
  }
});

test('화면 문구에 남의 언어 한자가 안 섞인다', () => {
  for (const [locale, ui] of Object.entries(MINESWEEPER_UI)) {
    const key = langOfLocale(locale);
    for (const k of MINESWEEPER_UI_KEYS) {
      assert.equal(hanProblem(key, ui[k]), '', `${locale}.${k}`);
    }
  }
});

test('언어마다 문구가 실제로 갈린다', () => {
  /*
   * 폴백으로 영어를 그대로 물려받으면 열 언어가 아니라 한 언어다.
   *
   * 열쇠를 하나씩 못 박지는 않는다 — 'Expert'는 영어와 프랑스어에서 같은
   * 낱말이고, 그런 자리를 억지로 갈라 놓으면 오히려 이상한 번역이 된다.
   * 대신 언어마다 **몇 개나 영어와 같은지**를 본다. 절반을 넘으면 옮겨 적기를
   * 안 한 것이다.
   */
  for (const [locale, ui] of Object.entries(MINESWEEPER_UI)) {
    if (locale === 'en') continue;
    const same = MINESWEEPER_UI_KEYS.filter(k => ui[k] === MINESWEEPER_UI.en[k]);
    assert.ok(
      same.length * 2 < MINESWEEPER_UI_KEYS.length,
      `${locale}: ${same.length}/${MINESWEEPER_UI_KEYS.length}개가 영어와 같다 — ${same.join(', ')}`,
    );
    // 긴 문장은 반드시 갈려야 한다 — 여기가 같으면 그냥 안 옮긴 것이다
    for (const k of ['modeHint', 'how', 'note', 'wide'] as const) {
      assert.notEqual(ui[k], MINESWEEPER_UI.en[k], `${locale}.${k}가 영어 그대로다`);
    }
  }
});

test('한국어 카탈로그에 지뢰찾기가 있다', () => {
  const t = GAME_TOOLS.find(g => g.slug === 'minesweeper');
  assert.ok(t, '카탈로그에 없다');
  assert.ok(t.title.trim(), 'title 없음');
  assert.ok(t.metaTitle.includes(t.title), 'metaTitle에 이름이 없다');
  assert.ok(t.long.length >= 40, `설명이 짧다 (${t.long.length}자)`);
  assert.ok(t.features.length >= 4, `기능이 ${t.features.length}개뿐`);
  assert.ok(
    new Set(GAME_TOOLS.map(g => g.category)).has(t.category),
    `분류 ${t.category}가 기존 목록에 없다`,
  );
});

test('아홉 언어 도구 문구가 폴백이 아니다', () => {
  const ko = GAME_TOOLS.find(g => g.slug === 'minesweeper')!;
  for (const locale of Object.keys(INTL_TO_KEY)) {
    const t = findGameToolIntl(locale as never, 'minesweeper');
    assert.ok(t, `${locale}: 도구가 없다`);
    assert.notEqual(t.title, ko.title, `${locale}: 제목이 한국어 그대로다`);
    assert.notEqual(t.long, ko.long, `${locale}: 설명이 한국어 그대로다`);
    assert.ok(t.metaTitle.includes(t.title), `${locale}: metaTitle에 이름이 없다`);
    assert.equal(t.features.length, ko.features.length, `${locale}: 기능 수가 다르다`);
    const min = DENSE.has(INTL_TO_KEY[locale]) ? 24 : 40;
    assert.ok(t.long.length >= min, `${locale}: 설명이 짧다 (${t.long.length}자)`);
  }
});

test('도구 문구에 남의 언어 한자가 안 섞인다', () => {
  for (const [locale, key] of Object.entries(INTL_TO_KEY)) {
    const t = findGameToolIntl(locale as never, 'minesweeper')!;
    for (const text of [t.title, t.desc, t.category, t.metaTitle, t.long, ...t.features]) {
      assert.equal(hanProblem(key, text), '', `${locale}`);
    }
  }
});

test('아홉 언어 분류가 그 언어의 기존 분류 가운데 하나다', () => {
  // 새 분류를 만들면 허브에서 그 묶음이 그려지지 않는다
  for (const locale of Object.keys(INTL_TO_KEY)) {
    const mine = findGameToolIntl(locale as never, 'minesweeper')!;
    const others = ['reaction', 'memory', 'math', 'stroop', 'hearing']
      .map(s => findGameToolIntl(locale as never, s)!.category);
    assert.ok(others.includes(mine.category), `${locale}: 새 분류 ${mine.category}`);
  }
});

test('열 언어 열쇠가 언어 목록과 어긋나지 않는다', () => {
  // MINESWEEPER_UI는 경로형 로케일을 열쇠로 쓴다 — 자료 열쇠로 바꿔 대조한다
  const keys = new Set(Object.keys(MINESWEEPER_UI).map(langOfLocale));
  for (const code of LANG_CODES) assert.ok(keys.has(code), `${code} 문구가 없다`);
  assert.equal(keys.size, LANG_CODES.length);
});

/* ────────── 난이도 이름 ────────── */

test('난이도 라벨이 세 판 모두 있다', () => {
  for (const locale of Object.keys(MINESWEEPER_UI)) {
    const ui = MINESWEEPER_UI[locale as keyof typeof MINESWEEPER_UI];
    for (const lv of LEVEL_ORDER) {
      const label = ui[`level_${lv}` as (typeof MINESWEEPER_UI_KEYS)[number]];
      assert.ok(label && label.trim(), `${locale}: ${lv} 라벨이 없다`);
    }
  }
});

test('난이도 열쇠가 판 목록과 정확히 짝이 맞는다', () => {
  const fromUi = MINESWEEPER_UI_KEYS.filter(k => k.startsWith('level_')).map(k => k.slice(6));
  assert.deepEqual(fromUi.slice().sort(), LEVEL_ORDER.slice().sort() as string[]);
});

/* ────────── 기록 열쇠 ────────── */

test('난이도마다 기록 열쇠가 갈린다', () => {
  // 초급 10초와 고급 300초를 한 열쇠에 담으면 고급 기록이 영원히 안 남는다
  const keys = LEVEL_ORDER.map((lv: Level) => `minesweeper-${lv}`);
  assert.equal(new Set(keys).size, keys.length);
  for (const k of keys) assert.match(k, /^minesweeper-[a-z]+$/);
});
