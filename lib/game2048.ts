/**
 * 2048 — 4×4 판을 밀어 같은 수를 합친다.
 *
 * 계산을 컴포넌트에 두면 확인할 방법이 없다. 이 게임에서 눈으로 못 잡는 것은
 * **밀기 규칙**이다. 흔한 어긋남이 셋 있고 셋 다 몇 판 해서는 안 드러난다 —
 *
 *   1. 한 번 밀 때 같은 칸이 두 번 합쳐진다. 4·4·4·4를 왼쪽으로 밀면 8·8이지만,
 *      합친 것을 다시 후보에 넣으면 16이 된다. 몇 수 뒤 점수가 부풀 뿐이라
 *      화면만 보고는 어디서 어긋났는지 알 수 없다.
 *   2. 안 움직이는 방향으로 밀었는데 새 타일이 생긴다. 그러면 벽에 대고 아무
 *      방향이나 눌러 판을 채울 수 있어 게임이 무너진다.
 *   3. 방향마다 따로 짜서 넷이 서로 안 맞는다. 그래서 여기서는 **왼쪽 하나만**
 *      짜고 나머지 셋은 판을 뒤집어 만든다 — 뒤집기는 자기가 자기 역함수라
 *      되돌리기가 공짜다.
 *
 * 난수는 씨앗에서 만든다. Math.random()을 쓰면 검사가 붙들 것이 없다 — 같은
 * 씨앗이 같은 판을 내야 "이 판에서 이 점수가 나온다"를 못 박을 수 있다.
 * 그래서 씨앗을 상태에 넣고 다닌다.
 */

export const SIZE = 4;
/** 2048을 만들어도 끝이 아니다 — 이 값은 승리 표시일 뿐 판을 멈추지 않는다 */
export const WIN_TILE = 2048;

/** 16칸을 한 줄로 눕힌 판. 0은 빈 칸이다 */
export type Board = number[];

export type Dir = 'left' | 'right' | 'up' | 'down';
export const DIRS: readonly Dir[] = ['left', 'right', 'up', 'down'];

/** 되돌리기가 되살릴 것 — 판만 되돌리고 점수를 두면 점수로 이기는 게임이 된다 */
interface Snapshot {
  board: Board;
  score: number;
  seed: number;
  won: boolean;
  over: boolean;
  moves: number;
}

export interface Game extends Snapshot {
  /** 이번 밀기에서 새로 놓인 타일의 자리 — 화면의 짧은 움직임이 이것을 본다 */
  spawnAt: number | null;
  /** 이번 밀기에서 합쳐진 자리들 */
  merged: number[];
  /** 되돌리기는 한 번이다. 직전 것만 들고 있는다 */
  prev: Snapshot | null;
}

/* ────────────────────────── 씨앗 난수 ────────────────────────── */

/**
 * 씨앗 하나에서 0 이상 1 미만의 값과 **다음 씨앗**을 낸다 (mulberry32).
 *
 * 함수가 아니라 값과 씨앗을 함께 돌려주는 꼴인 이유는, 상태에 담아 나르려면
 * 난수기가 아니라 숫자여야 하기 때문이다. 클로저를 상태에 넣으면 그 상태를
 * 복제하는 순간(되돌리기·검사) 두 판이 같은 난수기를 나눠 쓴다.
 */
export function rand(seed: number): [number, number] {
  const a = (seed + 0x6d2b79f5) >>> 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return [((t ^ (t >>> 14)) >>> 0) / 4294967296, a];
}

/* ────────────────────────── 판 뒤집기 ────────────────────────── */

/** 행과 열을 맞바꾼다 — 위아래 밀기를 왼쪽 밀기로 바꿀 때 쓴다 */
export function transpose(board: Board): Board {
  const out: Board = [];
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) out.push(board[c * SIZE + r]);
  return out;
}

/** 좌우로 뒤집는다 — 오른쪽 밀기를 왼쪽 밀기로 바꿀 때 쓴다 */
export function mirrorH(board: Board): Board {
  const out: Board = [];
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) out.push(board[r * SIZE + (SIZE - 1 - c)]);
  return out;
}

/*
 * 방향 → "왼쪽으로 밀기"로 바꾸는 변환과 그 되돌림.
 *
 * transpose와 mirrorH는 둘 다 자기가 자기 역함수라, 되돌림은 순서만 뒤집으면 된다.
 * 아래로 밀기는 열을 행으로 눕힌 뒤(transpose) 좌우로 뒤집으면(mirrorH) 왼쪽 밀기가 된다.
 */
const same = (b: Board): Board => b.slice();
const TO_LEFT: Record<Dir, (b: Board) => Board> = {
  left: same,
  right: mirrorH,
  up: transpose,
  down: b => mirrorH(transpose(b)),
};
const FROM_LEFT: Record<Dir, (b: Board) => Board> = {
  left: same,
  right: mirrorH,
  up: transpose,
  down: b => transpose(mirrorH(b)),
};

/* ────────────────────────── 밀기 ────────────────────────── */

export interface LineResult {
  line: number[];
  /** 합쳐진 타일이 앉은 자리 — 1이면 이 칸에서 합쳐졌다 */
  marks: number[];
  /** 합쳐서 생긴 값의 합. 점수는 이것만 쌓는다 */
  gained: number;
}

/**
 * 한 줄을 앞쪽(0번 칸)으로 모아 합친다.
 *
 * **합친 타일은 이 밀기에서 다시 안 합쳐진다.** 그래서 짝을 찾으면 두 칸을
 * 한꺼번에 소비하고 다음 칸으로 넘어간다 — 결과를 후보에 되돌려 놓지 않는다.
 *
 *   [4,4,4,4] → [8,8,0,0]   (16이 되면 이 규칙이 깨진 것이다)
 *   [2,2,4,0] → [4,4,0,0]
 *   [2,2,2,0] → [4,2,0,0]   모으는 쪽부터 합친다
 */
export function slideLine(line: readonly number[]): LineResult {
  const tiles = line.filter(v => v !== 0);
  const out: number[] = [];
  const marks: number[] = [];
  let gained = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (i + 1 < tiles.length && tiles[i] === tiles[i + 1]) {
      const merged = tiles[i] * 2;
      out.push(merged);
      marks.push(1);
      gained += merged;
      i++; // 짝을 이룬 뒤 칸은 이번 밀기에서 끝났다
    } else {
      out.push(tiles[i]);
      marks.push(0);
    }
  }
  while (out.length < line.length) { out.push(0); marks.push(0); }
  return { line: out, marks, gained };
}

export interface SlideResult {
  board: Board;
  /** 합쳐진 칸들의 자리 */
  merged: number[];
  gained: number;
  /** 한 칸이라도 움직였는가. 아니면 이 방향은 밀 수 없다 */
  moved: boolean;
}

/** 판 전체를 한 방향으로 민다. 왼쪽 하나만 짜고 나머지는 뒤집어서 만든다 */
export function slide(board: Board, dir: Dir): SlideResult {
  const turned = TO_LEFT[dir](board);
  const rows: number[] = [];
  const marks: number[] = [];
  let gained = 0;
  for (let r = 0; r < SIZE; r++) {
    const res = slideLine(turned.slice(r * SIZE, r * SIZE + SIZE));
    rows.push(...res.line);
    marks.push(...res.marks);
    gained += res.gained;
  }
  const next = FROM_LEFT[dir](rows);
  const back = FROM_LEFT[dir](marks);
  return {
    board: next,
    merged: back.flatMap((m, i) => (m ? [i] : [])),
    gained,
    moved: next.some((v, i) => v !== board[i]),
  };
}

/* ────────────────────────── 타일 놓기 ────────────────────────── */

/** 빈 칸의 자리들 */
export function emptyCells(board: Board): number[] {
  return board.flatMap((v, i) => (v === 0 ? [i] : []));
}

/**
 * 빈 자리 하나에 2 또는 4를 놓는다. 4가 나올 확률은 10분의 1이다.
 *
 * 빈 자리가 없으면 판과 씨앗을 그대로 돌려준다 — 씨앗을 태우면 같은 씨앗에서
 * 같은 판이 나온다는 약속이 깨진다.
 */
export function spawn(board: Board, seed: number): { board: Board; seed: number; at: number | null } {
  const holes = emptyCells(board);
  if (!holes.length) return { board: board.slice(), seed, at: null };
  const [pick, s1] = rand(seed);
  const [four, s2] = rand(s1);
  const at = holes[Math.floor(pick * holes.length)];
  const next = board.slice();
  next[at] = four < 0.1 ? 4 : 2;
  return { board: next, seed: s2, at };
}

/* ────────────────────────── 판정 ────────────────────────── */

/** 2048 타일이 있는가 */
export const hasWon = (board: Board): boolean => board.includes(WIN_TILE);

/** 어느 방향으로도 못 미는가 — 빈 칸이 없고 붙은 짝도 없을 때만 참이다 */
export function isOver(board: Board): boolean {
  if (board.includes(0)) return false;
  return DIRS.every(d => !slide(board, d).moved);
}

/* ────────────────────────── 한 판 ────────────────────────── */

const snapshot = (g: Game): Snapshot => ({
  board: g.board.slice(), score: g.score, seed: g.seed, won: g.won, over: g.over, moves: g.moves,
});

/** 새 판 — 타일 둘로 시작한다 */
export function newGame(seed = 1): Game {
  let board: Board = new Array<number>(SIZE * SIZE).fill(0);
  let s = seed;
  let at: number | null = null;
  for (let i = 0; i < 2; i++) {
    const r = spawn(board, s);
    board = r.board; s = r.seed; at = r.at;
  }
  return { board, score: 0, seed: s, won: false, over: false, moves: 0, spawnAt: at, merged: [], prev: null };
}

/**
 * 한 번 민다.
 *
 * **안 움직이는 방향이면 받은 판을 그대로 돌려준다** — 새 타일도 안 생기고
 * 되돌리기 자리도 안 덮인다. 헛손질로 되돌리기를 잃으면 그쪽이 더 억울하다.
 */
export function move(game: Game, dir: Dir): Game {
  const res = slide(game.board, dir);
  if (!res.moved) return game;
  const put = spawn(res.board, game.seed);
  return {
    board: put.board,
    score: game.score + res.gained,
    seed: put.seed,
    // 2048은 합칠 때 나온다. 한 번 이겼으면 계속 두어도 이긴 것이다
    won: game.won || hasWon(res.board),
    over: isOver(put.board),
    moves: game.moves + 1,
    spawnAt: put.at,
    merged: res.merged,
    prev: snapshot(game),
  };
}

/** 한 수 되돌린다 — 판·점수·씨앗을 함께 되돌린다. 되돌릴 것이 없으면 그대로다 */
export function undo(game: Game): Game {
  if (!game.prev) return game;
  return { ...game.prev, board: game.prev.board.slice(), spawnAt: null, merged: [], prev: null };
}

/** 되돌릴 수 있는가 — 화면의 단추가 이것을 본다 */
export const canUndo = (game: Game): boolean => game.prev !== null;

/** 판에서 가장 큰 타일 — 게임이 끝난 뒤 "어디까지 갔나"를 보여준다 */
export const maxTile = (board: Board): number => board.reduce((m, v) => (v > m ? v : m), 0);
