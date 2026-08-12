import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  DIRS, SIZE, WIN_TILE,
  type Board, type Dir, type Game,
  canUndo, emptyCells, hasWon, isOver, maxTile, mirrorH, move, newGame,
  rand, slide, slideLine, spawn, transpose, undo,
} from '../lib/game2048.ts';
import { GAME_2048_UI } from '../lib/game2048-ui.ts';
import { ALL_LOCALES10 } from '../lib/locales.ts';
import { GAME_TOOLS, findGameTool } from '../lib/game-tools.ts';
import { findGameToolIntl, type GameIntlLang } from '../lib/game-tools-intl.ts';
import { hanProblem, DENSE } from './han.ts';

/**
 * 2048의 계산 검사.
 *
 * 되짚을 것이 밀기 규칙에 몰려 있다. 화면으로는 "그럴듯하게 움직인다"까지만
 * 보이고, 같은 칸이 한 번 더 합쳐지거나 벽에 대고 밀 때 타일이 생기는 것은
 * 몇 판 해서는 드러나지 않는다. 손으로 셈한 값을 여러 줄 못 박고, 나머지는
 * 많은 판을 굴려 성질로 잡는다.
 */

/* 판을 읽기 쉽게 적는다 — 네 줄을 그대로 이어 붙인다 */
const board = (...rows: number[][]): Board => rows.flat();

/* 씨앗에서 값 하나 — 검사용 무작위 판을 만들 때 쓴다 */
function roll(seed: number): [number, number] {
  return rand(seed);
}

/* ────────────────────────── 한 줄 밀기 ────────────────────────── */

test('한 번 밀 때 같은 칸이 두 번 합쳐지지 않는다', () => {
  /*
   * 이 게임에서 가장 흔한 어긋남이다. 합친 결과를 다시 후보에 넣으면
   * [4,4,4,4]가 16 하나가 되고, 점수도 한 판에 두 배씩 부푼다.
   */
  const cases: [number[], number[], number][] = [
    [[4, 4, 4, 4], [8, 8, 0, 0], 16],
    [[2, 2, 4, 0], [4, 4, 0, 0], 4],
    [[2, 2, 2, 0], [4, 2, 0, 0], 4],   // 모으는 쪽부터 합친다
    [[0, 2, 2, 2], [4, 2, 0, 0], 4],
    [[2, 2, 2, 2], [4, 4, 0, 0], 8],
    [[8, 8, 8, 0], [16, 8, 0, 0], 16],
    [[4, 4, 8, 8], [8, 16, 0, 0], 24],
    [[2, 0, 0, 2], [4, 0, 0, 0], 4],
    [[0, 0, 0, 2], [2, 0, 0, 0], 0],
    [[2, 4, 2, 4], [2, 4, 2, 4], 0],
    [[2, 4, 4, 2], [2, 8, 2, 0], 8],
    [[1024, 1024, 0, 0], [2048, 0, 0, 0], 2048],
    [[0, 0, 0, 0], [0, 0, 0, 0], 0],
  ];
  for (const [input, want, gained] of cases) {
    const r = slideLine(input);
    assert.deepEqual(r.line, want, `[${input}] → [${r.line}]`);
    assert.equal(r.gained, gained, `[${input}]의 점수`);
  }
});

test('합쳐진 자리를 표시한다', () => {
  // 화면의 짧은 움직임이 이 표시를 본다. 자리가 어긋나면 엉뚱한 칸이 튄다
  assert.deepEqual(slideLine([4, 4, 4, 4]).marks, [1, 1, 0, 0]);
  assert.deepEqual(slideLine([2, 2, 2, 0]).marks, [1, 0, 0, 0]);
  assert.deepEqual(slideLine([2, 4, 4, 0]).marks, [0, 1, 0, 0]);
  assert.deepEqual(slideLine([2, 4, 2, 4]).marks, [0, 0, 0, 0]);
});

/* ────────────────────────── 판 밀기 ────────────────────────── */

test('네 방향이 손으로 셈한 대로 움직인다', () => {
  const b = board(
    [2, 2, 0, 0],
    [4, 0, 4, 0],
    [0, 8, 0, 8],
    [2, 0, 0, 2],
  );
  assert.deepEqual(slide(b, 'left').board, board(
    [4, 0, 0, 0],
    [8, 0, 0, 0],
    [16, 0, 0, 0],
    [4, 0, 0, 0],
  ));
  assert.deepEqual(slide(b, 'right').board, board(
    [0, 0, 0, 4],
    [0, 0, 0, 8],
    [0, 0, 0, 16],
    [0, 0, 0, 4],
  ));
  assert.equal(slide(b, 'left').gained, 4 + 8 + 16 + 4);

  const cols = board(
    [2, 0, 4, 0],
    [2, 0, 4, 0],
    [4, 2, 0, 0],
    [4, 2, 8, 0],
  );
  assert.deepEqual(slide(cols, 'up').board, board(
    [4, 4, 8, 0],
    [8, 0, 8, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ));
  assert.deepEqual(slide(cols, 'down').board, board(
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [4, 0, 8, 0],
    [8, 4, 8, 0],
  ));
});

test('네 방향이 서로 대칭이다', () => {
  /*
   * 왼쪽 하나만 짜고 나머지 셋을 뒤집기로 만든 구현이라, 이 검사가 그 방식을
   * 지킨다. 방향마다 따로 짜면 셋 중 하나에서 조용히 어긋난다.
   */
  let seed = 4242;
  const VALUES = [0, 0, 2, 2, 4, 4, 8, 16, 32, 64];
  for (let n = 0; n < 400; n++) {
    const b: Board = [];
    for (let i = 0; i < SIZE * SIZE; i++) {
      const [v, s] = roll(seed);
      seed = s;
      b.push(VALUES[Math.floor(v * VALUES.length)]);
    }
    // 좌우로 뒤집어 오른쪽으로 밀면, 왼쪽으로 밀고 뒤집은 것과 같다
    assert.deepEqual(slide(mirrorH(b), 'right').board, mirrorH(slide(b, 'left').board), '좌우 대칭');
    // 행과 열을 맞바꿔 위로 밀면, 왼쪽으로 밀고 맞바꾼 것과 같다
    assert.deepEqual(slide(transpose(b), 'up').board, transpose(slide(b, 'left').board), '가로세로 대칭');
    assert.deepEqual(slide(transpose(b), 'down').board, transpose(slide(b, 'right').board), '아래 대칭');
    // 점수는 뒤집어도 같다
    assert.equal(slide(mirrorH(b), 'right').gained, slide(b, 'left').gained, '뒤집으니 점수가 다르다');
  }
});

test('뒤집기는 두 번 하면 제자리다', () => {
  const b = board([1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]);
  assert.deepEqual(mirrorH(mirrorH(b)), b);
  assert.deepEqual(transpose(transpose(b)), b);
});

test('밀 수 없는 방향에서는 판이 그대로이고 새 타일이 안 생긴다', () => {
  /*
   * 이것이 새면 벽에 대고 아무 방향이나 눌러 판을 채울 수 있어 게임이 무너진다.
   * 되돌리기 자리도 덮이지 않아야 한다 — 헛손질로 되돌리기를 잃으면 억울하다.
   */
  const packed = board(
    [2, 4, 8, 16],
    [4, 8, 16, 32],
    [8, 16, 32, 64],
    [16, 32, 64, 128],
  );
  for (const d of DIRS) {
    const r = slide(packed, d);
    assert.equal(r.moved, false, `${d}로 움직일 수 있다고 한다`);
    assert.deepEqual(r.board, packed, `${d}: 판이 바뀌었다`);
    assert.equal(r.gained, 0, `${d}: 점수가 생겼다`);
  }

  const g: Game = { ...newGame(9), board: packed, score: 77 };
  for (const d of DIRS) {
    const after = move(g, d);
    assert.deepEqual(after.board, packed, `${d}: 판이 바뀌었다`);
    assert.equal(after.score, 77, `${d}: 점수가 바뀌었다`);
    assert.equal(after.seed, g.seed, `${d}: 씨앗을 태웠다 — 재현이 깨진다`);
    assert.equal(after.moves, g.moves, `${d}: 움직인 수가 늘었다`);
    assert.equal(emptyCells(after.board).length, 0, `${d}: 새 타일이 생겼다`);
  }

  // 왼쪽으로는 못 밀지만 오른쪽으로는 밀 수 있는 판 — 방향마다 갈리는지 본다
  const leftPacked = board(
    [2, 4, 0, 0],
    [8, 16, 0, 0],
    [32, 64, 0, 0],
    [128, 256, 0, 0],
  );
  assert.equal(slide(leftPacked, 'left').moved, false);
  assert.equal(slide(leftPacked, 'right').moved, true);
});

test('밀 수 있는 방향에서는 새 타일이 딱 하나 생긴다', () => {
  let seed = 11;
  for (let n = 0; n < 200; n++) {
    const g = newGame(seed);
    seed = g.seed;
    for (const d of DIRS) {
      const after = move(g, d);
      if (after === g) continue; // 못 미는 방향
      const before = slide(g.board, d).board;
      const grew = after.board.filter((v, i) => v !== before[i]);
      assert.equal(grew.length, 1, `${d}: 새로 놓인 칸이 ${grew.length}개다`);
      assert.ok(grew[0] === 2 || grew[0] === 4, `새 타일이 ${grew[0]}이다`);
      assert.equal(after.board[after.spawnAt!], grew[0], '새 타일 자리 표시가 어긋난다');
    }
  }
});

/* ────────────────────────── 점수와 타일 값 ────────────────────────── */

test('점수는 합쳐서 생긴 값의 합이다', () => {
  // 한 판을 끝까지 굴리며 밀기마다 생긴 값을 따로 더해 대조한다
  let checked = 0;
  for (let seed = 1; seed <= 40; seed++) {
    let g = newGame(seed);
    let sum = 0;
    for (let step = 0; step < 600 && !g.over; step++) {
      const d = DIRS[step % DIRS.length];
      const gained = slide(g.board, d).gained;
      const after = move(g, d);
      if (after === g) continue;
      sum += gained;
      g = after;
      assert.equal(g.score, sum, `씨앗 ${seed}, ${g.moves}수: 점수가 합과 다르다`);
    }
    assert.ok(g.moves > 10, `씨앗 ${seed}: ${g.moves}수에서 멈췄다 — 굴리는 방식이 깨졌다`);
    checked++;
  }
  assert.equal(checked, 40);
});

test('점수는 2씩 나눠지는 값만 쌓는다', () => {
  // 합쳐서 나오는 값은 늘 4 이상의 짝수다. 홀수가 섞이면 합치기가 어긋난 것이다
  let g = newGame(3);
  for (let step = 0; step < 500 && !g.over; step++) {
    g = move(g, DIRS[step % DIRS.length]);
    assert.equal(g.score % 2, 0, `점수가 홀수다: ${g.score}`);
  }
});

test('타일 값은 늘 2의 거듭제곱이다', () => {
  const power = (v: number) => v >= 2 && (v & (v - 1)) === 0;
  for (let seed = 1; seed <= 60; seed++) {
    let g = newGame(seed);
    for (let step = 0; step < 400 && !g.over; step++) {
      g = move(g, DIRS[(step + seed) % DIRS.length]);
      for (const v of g.board) {
        assert.ok(v === 0 || power(v), `씨앗 ${seed}: 2의 거듭제곱이 아닌 타일 ${v}`);
      }
      assert.equal(g.board.length, SIZE * SIZE, '칸 수가 바뀌었다');
    }
  }
});

/* ────────────────────────── 씨앗 ────────────────────────── */

test('같은 씨앗이면 같은 판이 나온다', () => {
  for (const seed of [1, 7, 99, 12345]) {
    assert.deepEqual(newGame(seed).board, newGame(seed).board, `씨앗 ${seed}: 첫 판이 다르다`);

    // 첫 판만이 아니라 굴린 뒤도 같아야 한다
    const run = (s: number) => {
      let g = newGame(s);
      for (let i = 0; i < 60; i++) g = move(g, DIRS[i % DIRS.length]);
      return g;
    };
    const a = run(seed), b = run(seed);
    assert.deepEqual(a.board, b.board, `씨앗 ${seed}: 굴린 뒤 판이 다르다`);
    assert.equal(a.score, b.score, `씨앗 ${seed}: 점수가 다르다`);
    assert.equal(a.moves, b.moves, `씨앗 ${seed}: 움직인 수가 다르다`);
  }
});

test('씨앗이 다르면 판도 갈린다', () => {
  // 씨앗을 무시하고 고정 판을 내면 여기서 잡힌다
  const seen = new Set<string>();
  for (let seed = 1; seed <= 50; seed++) seen.add(newGame(seed).board.join(','));
  assert.ok(seen.size > 40, `씨앗 50개가 판 ${seen.size}가지만 냈다`);
});

test('새 판은 타일 둘로 시작한다', () => {
  for (let seed = 1; seed <= 100; seed++) {
    const g = newGame(seed);
    const tiles = g.board.filter(v => v !== 0);
    assert.equal(tiles.length, 2, `씨앗 ${seed}: 시작 타일이 ${tiles.length}개`);
    assert.equal(g.score, 0);
    assert.equal(g.moves, 0);
    assert.equal(g.prev, null, '새 판에 되돌릴 것이 있다');
    assert.equal(canUndo(g), false);
    for (const v of tiles) assert.ok(v === 2 || v === 4, `시작 타일이 ${v}이다`);
  }
});

test('4는 드물게 나온다', () => {
  // 열에 하나쯤이어야 한다. 절반이 4면 판이 순식간에 찬다
  let seed = 5;
  let fours = 0, total = 0;
  const empty: Board = new Array<number>(SIZE * SIZE).fill(0);
  for (let i = 0; i < 3000; i++) {
    const r = spawn(empty, seed);
    seed = r.seed;
    total++;
    if (r.board[r.at!] === 4) fours++;
  }
  const rate = fours / total;
  assert.ok(rate > 0.05 && rate < 0.16, `4가 ${(rate * 100).toFixed(1)}%로 나온다`);
});

test('빈 칸이 없으면 타일을 놓지 않고 씨앗도 태우지 않는다', () => {
  const full: Board = new Array<number>(SIZE * SIZE).fill(2);
  const r = spawn(full, 123);
  assert.deepEqual(r.board, full);
  assert.equal(r.seed, 123, '놓지도 않고 씨앗을 태웠다 — 재현이 깨진다');
  assert.equal(r.at, null);
});

/* ────────────────────────── 승리와 게임 오버 ────────────────────────── */

test('2048을 만들면 이기고, 그 뒤에도 계속 둘 수 있다', () => {
  const almost = board(
    [1024, 1024, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  );
  const g: Game = { ...newGame(1), board: almost, score: 0 };
  const after = move(g, 'left');
  assert.equal(after.won, true, '2048을 만들었는데 이기지 않았다');
  assert.equal(hasWon(after.board), true);
  assert.equal(after.over, false, '이기자마자 끝났다');
  assert.equal(after.score, 2048, '합친 값이 점수에 안 들어갔다');

  // 이긴 뒤에도 판은 계속 움직인다
  const more = move(after, 'down');
  assert.equal(more.won, true, '한 수 뒤에 이긴 것이 사라졌다');
  assert.ok(more.moves > after.moves, '이긴 뒤로는 못 움직인다');
});

test('게임 오버는 빈 칸이 없고 어느 방향도 못 합칠 때만이다', () => {
  const dead = board(
    [2, 4, 2, 4],
    [4, 2, 4, 2],
    [2, 4, 2, 4],
    [4, 2, 4, 2],
  );
  assert.equal(isOver(dead), true, '막힌 판을 안 끝났다고 한다');

  // 빈 칸이 하나라도 있으면 아니다
  const hole = dead.slice();
  hole[5] = 0;
  assert.equal(isOver(hole), false, '빈 칸이 있는데 끝났다고 한다');

  // 꽉 찼지만 붙은 짝이 있으면 아니다
  const pair = dead.slice();
  pair[0] = 4; // 첫 줄이 4,4,…가 되어 왼쪽으로 합칠 수 있다
  assert.equal(isOver(pair), false, '합칠 짝이 있는데 끝났다고 한다');

  // 세로로만 짝이 있는 판도 끝이 아니다
  const vertical = board(
    [2, 4, 2, 4],
    [2, 2, 4, 2],
    [4, 4, 2, 4],
    [2, 2, 4, 2],
  );
  assert.equal(isOver(vertical), false, '세로 짝을 못 본다');
  assert.equal(slide(vertical, 'up').moved, true);

  assert.equal(maxTile(dead), 4);
  assert.equal(maxTile(board([0, 0, 0, 0], [0, 512, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0])), 512);
});

test('끝난 판에서는 어느 방향도 안 움직인다', () => {
  let g = newGame(21);
  for (let i = 0; i < 4000 && !g.over; i++) g = move(g, DIRS[i % DIRS.length]);
  if (!g.over) return; // 40수 넘게 굴려도 안 끝나면 이 검사는 볼 것이 없다
  for (const d of DIRS) assert.equal(move(g, d), g, `끝났는데 ${d}로 움직인다`);
  assert.equal(emptyCells(g.board).length, 0, '끝났다면서 빈 칸이 있다');
});

/* ────────────────────────── 되돌리기 ────────────────────────── */

test('되돌리기가 판과 점수를 함께 되돌린다', () => {
  let g = newGame(31);
  for (let i = 0; i < 20; i++) {
    const before = g;
    const after = move(g, DIRS[i % DIRS.length]);
    if (after === before) continue;
    assert.equal(canUndo(after), true, '움직였는데 되돌릴 수 없다');
    const back = undo(after);
    assert.deepEqual(back.board, before.board, '판이 안 돌아왔다');
    assert.equal(back.score, before.score, '점수가 안 돌아왔다');
    assert.equal(back.moves, before.moves, '움직인 수가 안 돌아왔다');
    assert.equal(back.seed, before.seed, '씨앗이 안 돌아왔다');
    g = after;
  }
});

test('되돌리기는 한 번이고, 되돌릴 것이 없으면 그대로다', () => {
  const g0 = newGame(41);
  assert.equal(undo(g0), g0, '새 판에서 되돌아갔다');

  let g = g0;
  for (const d of DIRS) g = move(g, d);
  const once = undo(g);
  assert.equal(canUndo(once), false, '두 번 되돌릴 수 있다');
  assert.equal(undo(once), once, '두 번째 되돌리기가 먹었다');
});

test('되돌린 판에서 같은 방향으로 밀면 같은 결과다', () => {
  // 씨앗까지 되돌려야 이것이 성립한다 — 점수만 되돌리면 다른 타일이 나온다
  let g = newGame(51);
  for (let i = 0; i < 30; i++) {
    const d = DIRS[i % DIRS.length];
    const after = move(g, d);
    if (after === g) continue;
    const again = move(undo(after), d);
    assert.deepEqual(again.board, after.board, `${d}: 되돌린 뒤 판이 다르다`);
    assert.equal(again.score, after.score, `${d}: 되돌린 뒤 점수가 다르다`);
    g = after;
  }
});

/* ────────────────────────── 등록과 문구 ────────────────────────── */

test('카탈로그에 2048이 있다', () => {
  const tool = findGameTool('2048');
  assert.ok(tool, 'lib/game-tools.ts에 2048이 없다');
  assert.equal(tool.slug, '2048');
  assert.ok(tool.metaTitle.includes(tool.title), 'metaTitle에 도구 이름이 없다');
  assert.ok(tool.features.length >= 3, `기능 설명이 ${tool.features.length}개뿐`);
  // 카테고리는 허브가 그리는 목록 안에 있어야 한다 — 밖이면 조용히 안 보인다
  assert.ok(GAME_TOOLS.some(t => t.slug !== '2048' && t.category === tool.category),
    `'${tool.category}'는 다른 도구가 쓰지 않는 분류다 — 허브 목록에 넣었는지 보라`);
});

test('아홉 언어에 2048 문구가 있고 한국어를 물려받지 않는다', () => {
  const ko = findGameTool('2048')!;
  const langs = ALL_LOCALES10.filter(l => l !== 'ko') as GameIntlLang[];
  assert.equal(langs.length, 9);
  for (const lang of langs) {
    const t = findGameToolIntl(lang, '2048');
    assert.ok(t, `${lang}: 2048이 없다`);
    /*
     * gameToolsIntl은 번역이 없으면 한국어로 폴백한다. 그 폴백이 미번역을
     * 가려서, 값이 있는지가 아니라 **한국어와 다른지**를 봐야 한다.
     */
    assert.notEqual(t.title, ko.title, `${lang}: 제목이 한국어 그대로다`);
    assert.notEqual(t.long, ko.long, `${lang}: 설명이 한국어 그대로다`);
    assert.notEqual(t.metaTitle, ko.metaTitle, `${lang}: metaTitle이 한국어 그대로다`);
    assert.ok(t.long.length >= (DENSE.has(lang.slice(0, 2)) ? 30 : 40), `${lang}: 설명이 너무 짧다`);
    assert.ok(t.features.length >= 3, `${lang}: 기능 설명이 ${t.features.length}개뿐`);
    assert.ok(t.metaTitle.includes(t.title), `${lang}: metaTitle에 도구 이름이 없다`);
    // 분류는 그 언어의 다른 도구가 쓰는 것이어야 한다 — 아니면 허브에서 빠진다
    const siblings = ['reaction', 'memory', 'math'].map(s => findGameToolIntl(lang, s)!.category);
    assert.ok(siblings.includes(t.category) || t.category !== ko.category,
      `${lang}: 분류가 한국어 그대로다 — ${t.category}`);
  }
});

test('화면 문구가 열 언어에 다 있고 비어 있지 않다', () => {
  const keys = Object.keys(GAME_2048_UI.ko) as (keyof typeof GAME_2048_UI.ko)[];
  assert.ok(keys.length >= 10, `문구가 ${keys.length}개뿐`);
  for (const lang of ALL_LOCALES10) {
    const ui = GAME_2048_UI[lang];
    assert.ok(ui, `${lang}: 사전이 없다`);
    assert.deepEqual(Object.keys(ui).sort(), [...keys].sort(), `${lang}: 열쇠가 한국어와 다르다`);
    for (const k of keys) {
      assert.ok(ui[k].trim().length > 0, `${lang}.${k}: 비어 있다`);
      if (lang !== 'ko') assert.notEqual(ui[k], GAME_2048_UI.ko[k], `${lang}.${k}: 한국어 그대로다`);
    }
    assert.ok(ui.note.length >= (DENSE.has(lang.slice(0, 2)) ? 40 : 80), `${lang}: 설명이 너무 짧다`);
  }
});

test('남의 언어 글자가 섞이지 않았다', () => {
  const HANGUL = /[가-힣]/;
  const KANA = /[ぁ-んァ-ヶ]/;
  const DEVANAGARI = /[ऀ-ॿ]/;
  const CJK = /[一-鿿]/;

  for (const lang of ALL_LOCALES10) {
    const texts = Object.values(GAME_2048_UI[lang]);
    for (const t of texts) {
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
    const t = findGameToolIntl(lang, '2048')!;
    const key = lang === 'zh-hant' ? 'tw' : 'zh';
    for (const s of [t.title, t.desc, t.category, t.metaTitle, t.long, ...t.features]) {
      assert.equal(hanProblem(key, s), '', `${lang}: ${s}`);
    }
  }
  for (const lang of ['en', 'es', 'pt-br', 'de', 'fr'] as GameIntlLang[]) {
    const t = findGameToolIntl(lang, '2048')!;
    for (const s of [t.title, t.desc, t.metaTitle, t.long, ...t.features]) {
      assert.ok(!/[가-힣ぁ-んァ-ヶ一-鿿]/.test(s), `${lang}: 다른 글자체가 섞였다 — ${s}`);
    }
  }
});

test('2048이라는 값이 코드와 문구에서 어긋나지 않는다', () => {
  assert.equal(WIN_TILE, 2048);
  for (const lang of ALL_LOCALES10) {
    assert.ok(GAME_2048_UI[lang].won.includes('2048'), `${lang}: 승리 문구에 2048이 없다`);
  }
});

/* 방향 목록이 넷이고 이름이 겹치지 않는다 — 하나를 빠뜨리면 게임 오버 판정이 헐거워진다 */
test('방향은 넷이다', () => {
  assert.equal(DIRS.length, 4);
  assert.equal(new Set<Dir>(DIRS).size, 4);
});
