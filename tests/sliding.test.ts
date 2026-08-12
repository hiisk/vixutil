import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  DEFAULT_SIZE, SIZES,
  type Game, type Tiles,
  blankIndex, canUndo, goalTiles, inversions, isAdjacent, isSolvable, isSolved,
  manhattan, moveAt, newGame, pushAt, shuffleTiles, sizeOf, undo,
} from '../lib/sliding.ts';
import { SLIDING_UI, SLIDING_UI_KEYS } from '../lib/sliding-ui.ts';
import { ALL_LOCALES10 } from '../lib/locales.ts';
import { GAME_TOOLS, findGameTool } from '../lib/game-tools.ts';
import { findGameToolIntl, type GameIntlLang } from '../lib/game-tools-intl.ts';
import { hanProblem, DENSE } from './han.ts';

/**
 * 슬라이딩 퍼즐의 셈 검사.
 *
 * 되짚을 것이 **풀림 판정**에 몰려 있다. 화면으로는 "잘 섞였다"까지만 보이고,
 * 그 판이 애초에 완성될 수 없는 판인지는 사람이 삼십 분 붙들어 봐야 의심한다.
 * 그래서 여기서는 판정을 두 갈래로 못 박는다 —
 *
 *   · **바깥에서 되짚기.** 2×2와 3×3은 완성판에서 갈 수 있는 판을 너비 우선으로
 *     전부 펼칠 수 있다. 그 목록과 isSolvable을 모든 배열에 대해 맞대 본다.
 *     짝수 변(2×2)과 홀수 변(3×3)의 규칙이 서로 다르므로 둘 다 이렇게 본다.
 *   · **불변량으로 되짚기.** 4×4·5×5는 펼칠 수 없으니, 합법적인 움직임이
 *     판정을 바꾸지 않는다는 성질로 잡는다.
 */

/* ────────────────────────── 검사용 도구 ────────────────────────── */

/** 완성판에서 합법적인 움직임으로 갈 수 있는 판 전부 (2×2·3×3에서만 쓴다) */
function reachableFromGoal(size: number): Set<string> {
  const start = goalTiles(size);
  const seen = new Set<string>([start.join(',')]);
  const stack: Tiles[] = [start];
  while (stack.length) {
    const tiles = stack.pop()!;
    const blank = tiles.indexOf(0);
    for (const step of [-1, 1, -size, size]) {
      const p = blank + step;
      if (!isAdjacent(size, p, blank)) continue;
      const next = tiles.slice();
      next[blank] = next[p];
      next[p] = 0;
      const key = next.join(',');
      if (seen.has(key)) continue;
      seen.add(key);
      stack.push(next);
    }
  }
  return seen;
}

/** 모든 배열 (Heap의 알고리즘) — 2×2는 24가지, 3×3은 362,880가지다 */
function* permutations(n: number): Generator<Tiles> {
  const arr: Tiles = [];
  for (let i = 0; i < n; i++) arr.push(i);
  const c = new Array<number>(n).fill(0);
  yield arr.slice();
  let i = 0;
  while (i < n) {
    if (c[i] < i) {
      const j = i % 2 === 0 ? 0 : c[i];
      [arr[i], arr[j]] = [arr[j], arr[i]];
      yield arr.slice();
      c[i]++;
      i = 0;
    } else {
      c[i] = 0;
      i++;
    }
  }
}

/** 씨앗에서 만든 걸음으로 합법적인 움직임을 되풀이한다 */
function walk(tiles: Tiles, steps: number, seed: number): Tiles {
  const size = sizeOf(tiles);
  let game: Game = { tiles: tiles.slice(), moves: 0, seed, history: [] };
  let s = seed >>> 0;
  const dirs = [-1, 1, -size, size];
  for (let k = 0; k < steps; k++) {
    s = (s * 1103515245 + 12345) >>> 0;
    const blank = blankIndex(game.tiles);
    game = moveAt(game, blank + dirs[(s >>> 16) % 4]);
  }
  return game.tiles;
}

/* ────────────────────────── 뒤섞기 ────────────────────────── */

test('뒤섞은 판은 언제나 풀 수 있다', () => {
  /*
   * 이 검사가 이 파일에서 가장 중요하다. 이것이 새면 사람이 완성할 수 없는 판을
   * 붙들고 앉는다 — 게임이 잘못된 것이 아니라 판이 잘못된 것인데, 그것을
   * 알아볼 방법이 화면에는 없다.
   */
  let checked = 0;
  for (const size of SIZES) {
    for (let seed = 1; seed <= 400; seed++) {
      const tiles = shuffleTiles(size, seed);
      assert.equal(tiles.length, size * size, `${size}×${size} 씨앗 ${seed}: 칸 수가 다르다`);
      assert.ok(isSolvable(tiles), `${size}×${size} 씨앗 ${seed}: 풀 수 없는 판이 나왔다 — [${tiles}]`);
      checked++;
    }
  }
  assert.equal(checked, SIZES.length * 400);
});

test('뒤섞은 판은 1..n²-1과 빈 칸을 정확히 한 번씩 담는다', () => {
  for (const size of SIZES) {
    for (let seed = 1; seed <= 60; seed++) {
      const tiles = shuffleTiles(size, seed);
      assert.deepEqual([...tiles].sort((a, b) => a - b), goalTiles(size).sort((a, b) => a - b),
        `${size}×${size} 씨앗 ${seed}: 담긴 값이 다르다`);
    }
  }
});

test('뒤섞은 판이 완성판으로 나오지 않는다', () => {
  // 다 맞춰진 판을 "섞었다"고 내밀면 사람은 자기가 뭘 잘못 눌렀는지 헤맨다
  for (const size of SIZES) {
    for (let seed = 1; seed <= 200; seed++) {
      assert.equal(isSolved(shuffleTiles(size, seed)), false, `${size}×${size} 씨앗 ${seed}: 완성판이 나왔다`);
    }
  }
});

test('같은 씨앗이면 같은 판, 다르면 갈린다', () => {
  for (const size of SIZES) {
    for (const seed of [1, 7, 99, 12345]) {
      assert.deepEqual(shuffleTiles(size, seed), shuffleTiles(size, seed), `${size}×${size} 씨앗 ${seed}: 판이 다르다`);
    }
    // 씨앗을 무시하고 고정 판을 내면 여기서 잡힌다
    const seen = new Set<string>();
    for (let seed = 1; seed <= 60; seed++) seen.add(shuffleTiles(size, seed).join(','));
    assert.ok(seen.size > 50, `${size}×${size}: 씨앗 60개가 판 ${seen.size}가지만 냈다`);
  }
});

/* ────────────────────────── 풀림 판정 ────────────────────────── */

test('완성판에서 두 칸만 맞바꾼 판은 풀 수 없다', () => {
  /*
   * 짝치환 하나짜리 판이다. 눈으로는 거의 다 맞춰진 쉬운 판처럼 보이는데
   * 실제로는 어떻게 해도 완성되지 않는다 — 이 퍼즐의 가장 잔인한 판이다.
   */
  for (const size of SIZES) {
    assert.ok(isSolvable(goalTiles(size)), `${size}×${size}: 완성판을 풀 수 없다고 한다`);
    for (const [a, b] of [[0, 1], [0, 5], [1, 2], [2, 3]] as const) {
      const tiles = goalTiles(size);
      [tiles[a], tiles[b]] = [tiles[b], tiles[a]];
      assert.equal(isSolvable(tiles), false, `${size}×${size}: ${a}·${b}를 맞바꾼 판을 풀 수 있다고 한다`);
      // 두 번 맞바꾸면 짝홀이 제자리로 돌아온다
      const twice = tiles.slice();
      [twice[a], twice[b]] = [twice[b], twice[a]];
      assert.ok(isSolvable(twice), `${size}×${size}: 두 번 맞바꾸니 판정이 어긋난다`);
    }
  }
});

test('짝수 변과 홀수 변에서 판정 규칙이 다르다', () => {
  /*
   * 타일 순서는 1,2,3…으로 그대로 두고 빈 칸만 옮겨 가며 본다. 짝치환 개수는
   * 언제나 0이라, 판정이 갈리는 것은 오직 빈 칸의 줄 때문이다.
   *
   *   · 홀수 변(3×3·5×5): 빈 칸이 어디 있어도 풀 수 있다 — 줄을 보지 않는다.
   *   · 짝수 변(4×4): 빈 칸의 줄이 홀수인 줄(맨 위를 0으로 셈)일 때만 풀 수 있다.
   *
   * 짝수 변에서 이 몫을 빠뜨리면 판정이 절반씩 뒤집힌다.
   */
  const withBlankAt = (size: number, at: number): Tiles => {
    const tiles: Tiles = [];
    for (let v = 1; v < size * size; v++) tiles.push(v);
    tiles.splice(at, 0, 0);
    return tiles;
  };

  for (const size of [3, 5]) {
    for (let at = 0; at < size * size; at++) {
      const tiles = withBlankAt(size, at);
      assert.equal(inversions(tiles), 0);
      assert.ok(isSolvable(tiles), `${size}×${size}: 빈 칸이 ${at}번일 때 풀 수 없다고 한다`);
    }
  }

  for (const size of [2, 4]) {
    for (let at = 0; at < size * size; at++) {
      const tiles = withBlankAt(size, at);
      const row = Math.floor(at / size);
      assert.equal(isSolvable(tiles), row % 2 === 1,
        `${size}×${size}: 빈 칸이 ${at}번(줄 ${row})일 때 판정이 어긋난다`);
    }
  }

  // 완성판으로 검산 — 짝수 변의 완성판은 빈 칸이 맨 아랫줄(홀수 줄)에 있다
  assert.ok(isSolvable(goalTiles(4)));
  assert.equal(Math.floor(blankIndex(goalTiles(4)) / 4) % 2, 1);
});

test('2×2와 3×3에서는 판정이 실제로 갈 수 있는 판과 한 칸도 어긋나지 않는다', () => {
  /*
   * 판정을 바깥에서 되짚는 자리다. 완성판에서 갈 수 있는 판을 전부 펼쳐 놓고
   * 모든 배열에 대해 isSolvable과 맞대 본다 — 규칙을 잘못 적었으면 여기서
   * 수천 칸이 어긋난다. 짝수 변(2×2)과 홀수 변(3×3)을 함께 보는 것이 요점이다.
   */
  for (const size of [2, 3]) {
    const reachable = reachableFromGoal(size);
    let all = 0, solvable = 0, wrong = 0;
    for (const tiles of permutations(size * size)) {
      all++;
      const can = isSolvable(tiles);
      if (can) solvable++;
      if (can !== reachable.has(tiles.join(','))) wrong++;
    }
    assert.equal(wrong, 0, `${size}×${size}: 판정이 ${wrong}가지 배열에서 어긋난다`);
    // 절반이 풀 수 있는 판이다 — 갈 수 있는 판의 수와도 맞아야 한다
    assert.equal(solvable * 2, all, `${size}×${size}: 풀 수 있는 판이 절반이 아니다`);
    assert.equal(reachable.size, all / 2, `${size}×${size}: 갈 수 있는 판이 ${reachable.size}가지다`);
  }
});

test('합법적인 움직임은 풀림을 바꾸지 않는다 — 불변량이다', () => {
  /*
   * 4×4·5×5는 전부 펼칠 수 없다. 대신 이 성질로 잡는다 — 풀 수 있는 판에서
   * 시작하면 아무리 움직여도 풀 수 있고, 풀 수 없는 판에서 시작하면 아무리
   * 움직여도 풀 수 없다. 그래서 판을 낼 때 한 번만 판정하면 된다.
   */
  for (const size of SIZES) {
    for (let seed = 1; seed <= 30; seed++) {
      const good = walk(goalTiles(size), 400, seed);
      assert.ok(isSolvable(good), `${size}×${size} 씨앗 ${seed}: 완성판에서 움직였는데 풀 수 없어졌다`);

      const bad = goalTiles(size);
      [bad[0], bad[1]] = [bad[1], bad[0]];
      assert.equal(isSolvable(walk(bad, 400, seed)), false,
        `${size}×${size} 씨앗 ${seed}: 풀 수 없는 판을 움직여 풀 수 있게 만들었다`);
    }
  }
});

test('짝치환 개수를 손으로 셈한 값과 맞춘다', () => {
  assert.equal(inversions([1, 2, 3, 4, 5, 6, 7, 8, 0]), 0);
  assert.equal(inversions([2, 1, 3, 4, 5, 6, 7, 8, 0]), 1);
  assert.equal(inversions([3, 2, 1, 4, 5, 6, 7, 8, 0]), 3);
  assert.equal(inversions([0, 8, 7, 6, 5, 4, 3, 2, 1]), 28);   // 8부터 거꾸로 = 8·7/2
  // 빈 칸은 세지 않는다 — 빈 칸을 가장 큰 값으로 세면 자리마다 값이 달라진다
  assert.equal(inversions([0, 1, 2, 3]), inversions([1, 2, 3, 0]));
});

/* ────────────────────────── 옮기기 ────────────────────────── */

test('빈 칸과 맞닿지 않은 칸은 안 옮겨진다', () => {
  const size = 4;
  const game = newGame(size, 20);
  const blank = blankIndex(game.tiles);
  let tried = 0;
  for (let i = 0; i < size * size; i++) {
    if (isAdjacent(size, i, blank)) {
      assert.notEqual(moveAt(game, i), game, `${i}번은 이웃인데 안 옮겨진다`);
      continue;
    }
    tried++;
    // 자기 자신·대각선·먼 칸·판 밖 모두 그대로여야 한다
    assert.equal(moveAt(game, i), game, `${i}번은 이웃이 아닌데 옮겨졌다`);
  }
  assert.ok(tried >= 10, `이웃이 아닌 칸을 ${tried}개만 봤다`);
  for (const out of [-1, -4, size * size, size * size + 3]) {
    assert.equal(moveAt(game, out), game, `${out}번(판 밖)이 옮겨졌다`);
  }
  // 이웃 판정 자체 — 대각선은 이웃이 아니고, 줄이 넘어가는 자리도 아니다
  assert.equal(isAdjacent(4, 0, 5), false, '대각선을 이웃이라고 한다');
  assert.equal(isAdjacent(4, 3, 4), false, '줄이 넘어가는 자리를 이웃이라고 한다');
  assert.equal(isAdjacent(4, 3, 7), true);
  assert.equal(isAdjacent(4, 5, 5), false, '자기 자신을 이웃이라고 한다');
});

test('옮긴 뒤 되돌리면 제자리다', () => {
  for (const size of SIZES) {
    let game = newGame(size, 5);
    for (let k = 0; k < 40; k++) {
      const blank = blankIndex(game.tiles);
      const target = [-1, 1, -size, size]
        .map(s => blank + s)
        .find(p => isAdjacent(size, p, blank))!;
      const before = game;
      const after = moveAt(game, target);
      assert.notEqual(after, before, '이웃을 눌렀는데 안 움직였다');
      assert.equal(after.moves, before.moves + 1, '움직인 수가 안 늘었다');
      assert.equal(canUndo(after), true, '움직였는데 되돌릴 수 없다');

      const back = undo(after);
      assert.deepEqual(back.tiles, before.tiles, '판이 안 돌아왔다');
      assert.equal(back.moves, before.moves, '움직인 수가 안 돌아왔다');
      assert.deepEqual(back.history, before.history, '되돌리기 기록이 안 돌아왔다');
      game = after;
    }
  }
});

test('되돌릴 것이 없으면 판이 그대로다', () => {
  const game = newGame(4, 9);
  assert.equal(canUndo(game), false, '새 판에 되돌릴 것이 있다');
  assert.equal(undo(game), game, '새 판에서 되돌아갔다');
  assert.equal(undo(undo(moveAt(game, blankIndex(game.tiles) + 1))).moves, 0, '없는 것을 또 되돌렸다');
});

test('한 줄 밀기는 사이의 칸을 한꺼번에 옮긴다', () => {
  // 빈 칸을 왼쪽 위에 두고 손으로 셈한 판을 쓴다
  const tiles: Tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const game: Game = { tiles, moves: 0, seed: 1, history: [] };

  // 같은 줄의 세 칸째를 누르면 세 칸이 밀린다
  const row = pushAt(game, 3);
  assert.deepEqual(row.tiles.slice(0, 4), [1, 2, 3, 0], `줄 밀기가 어긋난다 — [${row.tiles.slice(0, 4)}]`);
  assert.equal(row.moves, 3, `움직인 수가 ${row.moves}다`);
  assert.equal(row.history.length, 3, '되돌리기가 밀린 칸만큼 안 쌓였다');

  // 세 번 되돌리면 제자리 — 한 칸씩 되짚는다
  assert.deepEqual(undo(undo(undo(row))).tiles, tiles, '되돌려도 제자리가 아니다');
  assert.equal(undo(undo(undo(row))).moves, 0);

  // 같은 칸(세로)도 같다
  const col = pushAt(game, 8);
  assert.deepEqual(col.tiles, [4, 1, 2, 3, 8, 5, 6, 7, 0, 9, 10, 11, 12, 13, 14, 15], '세로 밀기가 어긋난다');
  assert.equal(col.moves, 2);

  // 줄도 칸도 다른 자리는 아무 일도 없다
  for (const i of [5, 6, 10, 15]) assert.equal(pushAt(game, i), game, `${i}번이 밀렸다`);
  assert.equal(pushAt(game, blankIndex(tiles)), game, '빈 칸을 눌러 밀렸다');

  // 맞닿은 칸을 누르면 moveAt과 같다 — 조작이 둘로 갈리지 않는다
  for (const i of [1, 4]) assert.deepEqual(pushAt(game, i).tiles, moveAt(game, i).tiles, `${i}번에서 둘이 다르다`);
});

test('밀어도 담긴 값과 풀림은 그대로다', () => {
  for (const size of SIZES) {
    let game = newGame(size, 13);
    const sorted = goalTiles(size).sort((a, b) => a - b);
    for (let k = 0; k < 60; k++) {
      game = pushAt(game, (k * 7 + 3) % (size * size));
      assert.deepEqual([...game.tiles].sort((a, b) => a - b), sorted, `${size}×${size}: 담긴 값이 바뀌었다`);
      assert.ok(isSolvable(game.tiles), `${size}×${size}: 밀어서 풀 수 없게 됐다`);
    }
    assert.ok(game.moves > 20, `${size}×${size}: ${game.moves}칸만 움직였다 — 미는 방식이 깨졌다`);
  }
});

/* ────────────────────────── 완성 판정과 남은 거리 ────────────────────────── */

test('완성 판정이 정확히 한 배열에서만 참이다', () => {
  // 3×3의 362,880가지를 전부 훑는다. 마지막 칸이 빈 칸인지 안 보면 여기서 걸린다
  let hits = 0;
  for (const tiles of permutations(9)) if (isSolved(tiles)) hits++;
  assert.equal(hits, 1, `완성판이라고 하는 배열이 ${hits}가지다`);
  assert.ok(isSolved(goalTiles(3)));
  // 마지막 두 칸만 바꾼 판 — 값은 다 제자리인데 빈 칸이 끝이 아니다
  assert.equal(isSolved([1, 2, 3, 4, 5, 6, 7, 0, 8]), false);
});

test('맨해튼 거리가 완성판에서 0이고 한 번 옮길 때 1만 바뀐다', () => {
  /*
   * 이 두 성질이 곧 "최소 움직임의 하한"이라는 뜻이다. 0으로 만들어야 끝나는데
   * 한 번에 1씩만 줄일 수 있으니, 남은 거리보다 적게 옮겨서는 끝낼 수 없다.
   */
  for (const size of SIZES) {
    assert.equal(manhattan(goalTiles(size)), 0, `${size}×${size}: 완성판의 남은 거리가 0이 아니다`);

    let game = newGame(size, 77);
    let dist = manhattan(game.tiles);
    assert.ok(dist > 0, `${size}×${size}: 섞인 판의 남은 거리가 0이다`);
    for (let k = 0; k < 300; k++) {
      const blank = blankIndex(game.tiles);
      const target = [-1, 1, -size, size]
        .map(s => blank + s)
        .filter(p => isAdjacent(size, p, blank))[(k * 3) % 2];
      const after = moveAt(game, target);
      if (after === game) continue;
      const next = manhattan(after.tiles);
      assert.equal(Math.abs(next - dist), 1, `${size}×${size}: 한 번 옮겼는데 ${next - dist}만큼 바뀌었다`);
      dist = next;
      game = after;
    }
    // 하한이라는 말을 값으로도 본다 — 움직인 수가 시작 거리보다 적으면서 끝날 수는 없다
    assert.ok(manhattan(game.tiles) >= 0);
  }
});

test('남은 거리가 0인 것과 완성판인 것이 같은 말이다', () => {
  for (const tiles of permutations(9)) {
    assert.equal(manhattan(tiles) === 0, isSolved(tiles), `남은 거리와 완성 판정이 어긋난다 — [${tiles}]`);
  }
});

test('판 만들기가 크기를 지킨다', () => {
  for (const size of SIZES) {
    const game = newGame(size, 3);
    assert.equal(sizeOf(game.tiles), size, `${size}×${size}: 한 변을 잘못 되짚는다`);
    assert.equal(game.moves, 0);
    assert.deepEqual(game.history, []);
  }
  // 없는 크기를 넣으면 기본 판이다 — 화면이 이상한 수를 넘겨도 판은 만들어져야 한다
  for (const bad of [0, 1, 2, 7, -3, 4.5]) {
    assert.equal(sizeOf(newGame(bad, 1).tiles), DEFAULT_SIZE, `${bad}을 넣었을 때 기본 판이 아니다`);
  }
  assert.equal(DEFAULT_SIZE, 4, '기본 판은 원래의 15 퍼즐이어야 한다');
  assert.deepEqual([...SIZES], [3, 4, 5]);
});

/* ────────────────────────── 등록과 문구 ────────────────────────── */

test('카탈로그에 슬라이딩 퍼즐이 있다', () => {
  const tool = findGameTool('sliding');
  assert.ok(tool, 'lib/game-tools.ts에 sliding이 없다');
  assert.equal(tool.slug, 'sliding');
  assert.ok(tool.metaTitle.includes(tool.title), 'metaTitle에 도구 이름이 없다');
  assert.ok(tool.features.length >= 3, `기능 설명이 ${tool.features.length}개뿐`);
  // 카테고리는 허브가 그리는 목록 안에 있어야 한다 — 밖이면 조용히 안 보인다
  assert.ok(GAME_TOOLS.some(t => t.slug !== 'sliding' && t.category === tool.category),
    `'${tool.category}'는 다른 도구가 쓰지 않는 분류다 — 허브 목록에 넣었는지 보라`);
});

test('한국어 라우트와 접힌 국제 라우트가 함께 있다', () => {
  /*
   * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 멀쩡히 끝나고, 아홉 언어에서
   * 그 페이지만 조용히 404가 된다. 그래서 세 자리를 함께 본다.
   */
  const root = join(import.meta.dirname, '..');
  assert.ok(existsSync(join(root, 'app', '(ko)', 'game', 'sliding', 'page.tsx')), '한국어 라우트가 없다');
  assert.ok(existsSync(join(root, 'lib', 'fold', 'pages', 'game__sliding.tsx')), '접힌 라우트 모듈이 없다');
  const registry = readFileSync(join(root, 'lib', 'fold', 'registry.ts'), 'utf8');
  assert.ok(registry.includes("'game/sliding': () => import('./pages/game__sliding')"),
    'lib/fold/registry.ts에 game/sliding이 없다 — 아홉 언어가 조용히 404다');
});

test('아홉 언어에 도구 문구가 있고 한국어를 물려받지 않는다', () => {
  const ko = findGameTool('sliding')!;
  const langs = ALL_LOCALES10.filter(l => l !== 'ko') as GameIntlLang[];
  assert.equal(langs.length, 9);
  for (const lang of langs) {
    const t = findGameToolIntl(lang, 'sliding');
    assert.ok(t, `${lang}: sliding이 없다`);
    /*
     * gameToolsIntl은 번역이 없으면 한국어로 폴백한다. 그 폴백이 미번역을
     * 가려서, 값이 있는지가 아니라 **한국어와 다른지**를 봐야 한다.
     */
    assert.notEqual(t.title, ko.title, `${lang}: 제목이 한국어 그대로다`);
    assert.notEqual(t.long, ko.long, `${lang}: 설명이 한국어 그대로다`);
    assert.notEqual(t.metaTitle, ko.metaTitle, `${lang}: metaTitle이 한국어 그대로다`);
    assert.notEqual(t.category, ko.category, `${lang}: 분류가 한국어 그대로다`);
    assert.ok(t.long.length >= (DENSE.has(lang.slice(0, 2)) ? 30 : 40), `${lang}: 설명이 너무 짧다`);
    assert.ok(t.features.length >= 3, `${lang}: 기능 설명이 ${t.features.length}개뿐`);
    assert.ok(t.metaTitle.includes(t.title), `${lang}: metaTitle에 도구 이름이 없다`);
    // 분류는 그 언어의 다른 도구가 쓰는 것이어야 한다 — 아니면 허브에서 빠진다
    const siblings = ['reaction', 'memory', 'math'].map(s => findGameToolIntl(lang, s)!.category);
    assert.ok(siblings.includes(t.category), `${lang}: 없는 분류를 쓴다 — ${t.category}`);
  }
});

test('화면 문구가 열 언어에 다 있고 비어 있지 않다', () => {
  assert.ok(SLIDING_UI_KEYS.length >= 12, `문구가 ${SLIDING_UI_KEYS.length}개뿐`);
  for (const lang of ALL_LOCALES10) {
    const ui = SLIDING_UI[lang];
    assert.ok(ui, `${lang}: 사전이 없다`);
    assert.deepEqual(Object.keys(ui).sort(), [...SLIDING_UI_KEYS].sort(), `${lang}: 열쇠가 목록과 다르다`);
    for (const k of SLIDING_UI_KEYS) {
      assert.ok(ui[k].trim().length > 0, `${lang}.${k}: 비어 있다`);
      if (lang !== 'ko') assert.notEqual(ui[k], SLIDING_UI.ko[k], `${lang}.${k}: 한국어 그대로다`);
    }
    const dense = DENSE.has(lang.slice(0, 2));
    assert.ok(ui.note.length >= (dense ? 40 : 80), `${lang}: 설명이 너무 짧다`);
    assert.ok(ui.distanceNote.length >= (dense ? 30 : 60), `${lang}: 남은 거리 설명이 너무 짧다`);
  }
});

test('화면 문구에 이모지가 없다', () => {
  // 판에 있는 것은 숫자뿐이다. 공유 카드에서 컬러 이모지가 걷혀 나간 일도 있었다
  const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
  for (const lang of ALL_LOCALES10) {
    for (const [k, v] of Object.entries(SLIDING_UI[lang])) {
      assert.equal(EMOJI.test(v), false, `${lang}.${k}: 이모지가 섞였다 — ${v}`);
    }
  }
});

test('남의 언어 글자가 섞이지 않았다', () => {
  const HANGUL = /[가-힣]/;
  const KANA = /[ぁ-んァ-ヶ]/;
  const DEVANAGARI = /[ऀ-ॿ]/;
  const CJK = /[一-鿿]/;

  for (const lang of ALL_LOCALES10) {
    for (const t of Object.values(SLIDING_UI[lang])) {
      if (lang !== 'ko') assert.ok(!HANGUL.test(t), `${lang}: 한글이 섞였다 — ${t}`);
      if (lang !== 'ja') assert.ok(!KANA.test(t), `${lang}: 가나가 섞였다 — ${t}`);
      if (lang !== 'hi') assert.ok(!DEVANAGARI.test(t), `${lang}: 데바나가리가 섞였다 — ${t}`);
      if (!['ko', 'ja', 'zh-hans', 'zh-hant'].includes(lang)) {
        assert.ok(!CJK.test(t), `${lang}: 한자가 섞였다 — ${t}`);
      }
      const key = lang === 'zh-hant' ? 'tw' : lang === 'zh-hans' ? 'zh' : null;
      if (key) assert.equal(hanProblem(key, t), '', `${lang}: 글자가 섞였다`);
    }
  }
});

test('도구 문구에도 남의 언어 글자가 섞이지 않았다', () => {
  for (const lang of ['zh-hans', 'zh-hant'] as GameIntlLang[]) {
    const t = findGameToolIntl(lang, 'sliding')!;
    const key = lang === 'zh-hant' ? 'tw' : 'zh';
    for (const s of [t.title, t.desc, t.category, t.metaTitle, t.long, ...t.features]) {
      assert.equal(hanProblem(key, s), '', `${lang}: ${s}`);
    }
  }
  for (const lang of ['en', 'es', 'pt-br', 'de', 'fr'] as GameIntlLang[]) {
    const t = findGameToolIntl(lang, 'sliding')!;
    for (const s of [t.title, t.desc, t.category, t.metaTitle, t.long, ...t.features]) {
      assert.ok(!/[가-힣ぁ-んァ-ヶ一-鿿]/.test(s), `${lang}: 다른 글자체가 섞였다 — ${s}`);
    }
  }
});
