/**
 * 스도쿠 — 문제 만들기·풀기·난이도 판정.
 *
 * 게임 로직을 컴포넌트에 두면 확인할 방법이 없다(lib/game-more.ts와 같은 이유).
 * 스도쿠는 그중에서도 되짚을 것이 많다 — **답이 하나뿐인가**는 화면에서 절대
 * 안 보이고, 답이 둘인 문제를 내면 그건 게임이 아니라 찍기가 된다.
 *
 * ── 난이도를 지운 칸 수로 정하지 않는 이유 ────────────────
 * 빈칸 55개인데 후보가 하나뿐인 칸만 따라가면 끝까지 풀리는 문제가 있고,
 * 빈칸 45개인데 줄에서 유일한 자리를 봐야 막히지 않는 문제가 있다. 사람이
 * 느끼는 어려움은 **푸는 데 필요한 기법**이지 빈칸 수가 아니다. 그래서 여기서는
 * 기법으로 등급을 재고(techniqueNeeded), 빈칸 수는 그 결과로만 남는다.
 *
 * ── 씨앗을 받는 이유 ──────────────────────────────────
 * Math.random()으로 만들면 같은 문제를 다시 볼 수 없고, 검사도 붙들 것이 없다.
 * 씨앗 하나가 완성판·지우는 순서까지 다 정하므로 같은 씨앗은 늘 같은 문제다.
 */

/** 81칸. 0은 빈칸, 1~9는 놓인 수. 왼쪽 위에서 오른쪽으로 읽는다 */
export type Board = number[];

export type Rng = () => number;

export type Difficulty = 'easy' | 'normal' | 'hard';
export const DIFFICULTIES: Difficulty[] = ['easy', 'normal', 'hard'];

/**
 * 푸는 데 필요한 기법의 단계 — 이 값이 난이도다.
 *
 * 1: 후보가 하나뿐인 칸(naked single)만 따라가면 끝까지 풀린다
 * 2: 줄·칸·상자에서 어떤 수가 들어갈 자리가 하나뿐인 것(hidden single)까지 봐야 한다
 * 3: 그 둘로는 막힌다 — 더 어려운 기법이나 갈래 따지기가 필요하다
 */
export type Rank = 1 | 2 | 3;

export const RANK_OF: Record<Difficulty, Rank> = { easy: 1, normal: 2, hard: 3 };

/* ────────────────────────── 자리 계산 ────────────────────────── */

export const rowOf = (i: number): number => (i / 9) | 0;
export const colOf = (i: number): number => i % 9;
export const boxOf = (i: number): number => ((i / 27) | 0) * 3 + (((i % 9) / 3) | 0);

const ROWS: number[][] = Array.from({ length: 9 }, (_, r) => Array.from({ length: 9 }, (_, c) => r * 9 + c));
const COLS: number[][] = Array.from({ length: 9 }, (_, c) => Array.from({ length: 9 }, (_, r) => r * 9 + c));
const BOXES: number[][] = Array.from({ length: 9 }, (_, b) => {
  const top = ((b / 3) | 0) * 27 + (b % 3) * 3;
  return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(o => top + o);
});

/** 가로줄 9 · 세로줄 9 · 상자 9. 힌트가 근거를 말할 때 이 세 갈래를 쓴다 */
export const UNITS: { type: 'row' | 'col' | 'box'; index: number; cells: number[] }[] = [
  ...ROWS.map((cells, index) => ({ type: 'row' as const, index, cells })),
  ...COLS.map((cells, index) => ({ type: 'col' as const, index, cells })),
  ...BOXES.map((cells, index) => ({ type: 'box' as const, index, cells })),
];

/** 한 칸이 값을 겹칠 수 없는 스무 칸 */
const PEERS: number[][] = Array.from({ length: 81 }, (_, i) => {
  const set = new Set<number>([...ROWS[rowOf(i)], ...COLS[colOf(i)], ...BOXES[boxOf(i)]]);
  set.delete(i);
  return [...set];
});

/* ────────────────────────── 씨앗 난수 ────────────────────────── */

/**
 * mulberry32. 씨앗 하나에서 같은 난수열이 나오면 그것으로 충분하다 —
 * 여기 난수는 문제를 흩는 데만 쓰이고 통계 성질을 요구하지 않는다.
 */
export function rngOf(seed: number): Rng {
  let a = (seed >>> 0) + 0x6d2b79f5;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 제자리에서 섞는다(Fisher–Yates) */
function shuffle<T>(list: T[], rng: Rng): T[] {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

/* ────────────────────────── 후보 상태 ────────────────────────── */

const ALL = 0x1ff; // 1~9를 비트로

/** 값과 후보를 함께 들고 다닌다. 후보를 그때그때 세면 백트래킹이 백배 느려진다 */
interface State {
  cand: Int16Array;
  val: Uint8Array;
  /** 아직 안 채운 칸 수 */
  left: number;
}

const digitOfBit = (bit: number): number => 32 - Math.clz32(bit);
const popcount = (m: number): number => {
  let n = 0;
  for (let x = m; x; x &= x - 1) n++;
  return n;
};

export function digitsOf(mask: number): number[] {
  const out: number[] = [];
  for (let v = 1; v <= 9; v++) if (mask & (1 << (v - 1))) out.push(v);
  return out;
}

function emptyState(): State {
  return { cand: new Int16Array(81).fill(ALL), val: new Uint8Array(81), left: 81 };
}

function cloneState(st: State): State {
  return { cand: st.cand.slice(), val: st.val.slice(), left: st.left };
}

/**
 * 한 칸에 값을 놓고 이웃 스무 칸의 후보에서 그 수를 뺀다.
 * 놓을 수 없거나 이웃이 갈 곳을 잃으면 false — 그 갈래는 여기서 접는다.
 */
function assign(st: State, i: number, v: number): boolean {
  const bit = 1 << (v - 1);
  if (!(st.cand[i] & bit)) return false; // 이미 이웃이 그 수를 쓰고 있다
  st.val[i] = v;
  st.cand[i] = 0;
  st.left--;
  for (const p of PEERS[i]) {
    if (st.cand[p] & bit) {
      st.cand[p] &= ~bit;
      if (st.cand[p] === 0 && st.val[p] === 0) return false;
    }
  }
  return true;
}

/** 판을 상태로 옮긴다. 규칙을 어긴 판이면 null */
function stateOf(board: Board): State | null {
  const st = emptyState();
  for (let i = 0; i < 81; i++) {
    const v = board[i];
    if (v === 0) continue;
    if (v < 1 || v > 9 || !assign(st, i, v)) return null;
  }
  return st;
}

/** 후보가 하나뿐인 칸을 더 없을 때까지 채운다 */
function fillSingles(st: State): boolean {
  for (let moved = true; moved; ) {
    moved = false;
    for (let i = 0; i < 81; i++) {
      if (st.val[i] !== 0) continue;
      const c = st.cand[i];
      if (c === 0) return false;
      if ((c & (c - 1)) === 0) {
        if (!assign(st, i, digitOfBit(c))) return false;
        moved = true;
      }
    }
  }
  return true;
}

/* ────────────────────────── 풀이기 ────────────────────────── */

/**
 * 답을 limit개까지 찾는다.
 *
 * 후보가 가장 적은 칸부터 파는 이유는, 갈래가 둘인 칸을 먼저 파면 헛걸음이
 * 절반으로 줄기 때문이다. 아홉 갈래인 칸을 먼저 잡으면 같은 판이 수천 배 느려진다.
 */
function search(st: State, out: Board[], limit: number, rng?: Rng): void {
  if (!fillSingles(st)) return;
  if (st.left === 0) {
    out.push(Array.from(st.val));
    return;
  }
  let pick = -1;
  let fewest = 10;
  for (let i = 0; i < 81; i++) {
    if (st.val[i] !== 0) continue;
    const n = popcount(st.cand[i]);
    if (n < fewest) {
      fewest = n;
      pick = i;
      if (n === 2) break;
    }
  }
  const order = digitsOf(st.cand[pick]);
  // 완성판을 만들 때만 섞는다 — 풀 때는 순서가 답을 바꾸지 않으므로 그대로 둔다
  if (rng) shuffle(order, rng);
  for (const v of order) {
    const next = cloneState(st);
    if (assign(next, pick, v)) search(next, out, limit, rng);
    if (out.length >= limit) return;
  }
}

/** 답을 limit개까지 모아 준다 */
export function solutions(board: Board, limit = 2): Board[] {
  const st = stateOf(board);
  if (!st) return [];
  const out: Board[] = [];
  search(st, out, limit);
  return out;
}

/** 답 하나. 규칙을 어긴 판이나 답이 없는 판이면 null */
export function solve(board: Board): Board | null {
  return solutions(board, 1)[0] ?? null;
}

/** 답이 몇 개인가 — limit까지만 센다(둘을 찾으면 더 셀 이유가 없다) */
export function countSolutions(board: Board, limit = 2): number {
  return solutions(board, limit).length;
}

/** 답이 정확히 하나인가. 문제를 낼 자격은 이것뿐이다 */
export function isUnique(board: Board): boolean {
  return countSolutions(board, 2) === 1;
}

/** 규칙을 어긴 칸 — 같은 줄·칸·상자에 같은 수가 또 있는 자리 */
export function conflicts(board: Board): boolean[] {
  const bad = new Array<boolean>(81).fill(false);
  for (let i = 0; i < 81; i++) {
    const v = board[i];
    if (v === 0) continue;
    for (const p of PEERS[i]) {
      if (board[p] === v) {
        bad[i] = true;
        break;
      }
    }
  }
  return bad;
}

/** 완성판이 규칙을 지키는가 — 모든 줄·칸·상자에 1~9가 한 번씩 */
export function isSolved(board: Board): boolean {
  if (board.length !== 81 || board.some(v => v < 1 || v > 9)) return false;
  for (const u of UNITS) {
    let seen = 0;
    for (const i of u.cells) seen |= 1 << (board[i] - 1);
    if (seen !== ALL) return false;
  }
  return true;
}

/** 칸마다 들어갈 수 있는 수. 규칙을 어긴 판이면 null */
export function candidateMasks(board: Board): number[] | null {
  const st = stateOf(board);
  if (!st) return null;
  return Array.from({ length: 81 }, (_, i) => (st.val[i] ? 0 : st.cand[i]));
}

/* ────────────────────────── 기법과 난이도 ────────────────────────── */

/** 후보가 하나뿐인 칸 */
function nakedSingle(st: State): { index: number; value: number } | null {
  for (let i = 0; i < 81; i++) {
    if (st.val[i] !== 0) continue;
    const c = st.cand[i];
    if (c !== 0 && (c & (c - 1)) === 0) return { index: i, value: digitOfBit(c) };
  }
  return null;
}

/** 어떤 단위에서 그 수가 들어갈 자리가 하나뿐인 칸 */
function hiddenSingle(st: State): { index: number; value: number; unit: HintUnit } | null {
  for (const u of UNITS) {
    for (let v = 1; v <= 9; v++) {
      const bit = 1 << (v - 1);
      let at = -1;
      let count = 0;
      let placed = false;
      for (const i of u.cells) {
        if (st.val[i] === v) { placed = true; break; }
        if (st.cand[i] & bit) { count++; at = i; }
      }
      if (placed || count !== 1) continue;
      return { index: at, value: v, unit: { type: u.type, index: u.index } };
    }
  }
  return null;
}

export interface HintUnit {
  type: 'row' | 'col' | 'box';
  /** 0부터 센 단위 번호 */
  index: number;
}

export interface Hint {
  index: number;
  value: number;
  /** naked: 이 칸에 들어갈 수가 하나뿐 · hidden: 이 단위에서 이 수가 들어갈 자리가 하나뿐 */
  kind: 'naked' | 'hidden';
  /** hidden의 근거가 된 단위. naked면 null이다 */
  unit: HintUnit | null;
}

/**
 * 지금 판에서 **확실히** 채울 수 있는 칸 하나와 그 까닭.
 *
 * 답을 알고 있어도 답에서 베껴 주지 않는다 — 지금 판만 보고 논리로 나오는 칸을
 * 짚어야 사람이 다음에는 혼자 찾을 수 있다. 논리로 나오는 칸이 없으면 null이고,
 * 그건 여기서부터는 갈래를 따져야 한다는 뜻이다.
 */
export function hintFor(board: Board): Hint | null {
  const st = stateOf(board);
  if (!st || st.left === 0) return null;
  const n = nakedSingle(st);
  if (n) return { ...n, kind: 'naked', unit: null };
  const h = hiddenSingle(st);
  if (h) return { index: h.index, value: h.value, kind: 'hidden', unit: h.unit };
  return null;
}

/**
 * 이 문제를 푸는 데 필요한 기법의 단계.
 *
 * 쉬운 기법부터 쓰고, 한 번이라도 더 센 기법이 필요했으면 그 단계가 등급이 된다.
 * 두 기법으로 끝까지 못 가면 3 — 이 판정이 이 파일의 값이다.
 */
export function techniqueNeeded(board: Board): Rank {
  const st = stateOf(board);
  if (!st) return 3;
  let rank: Rank = 1;
  for (;;) {
    if (st.left === 0) return rank;
    const n = nakedSingle(st);
    if (n) {
      if (!assign(st, n.index, n.value)) return 3;
      continue;
    }
    const h = hiddenSingle(st);
    if (!h) return 3;
    rank = 2;
    if (!assign(st, h.index, h.value)) return 3;
  }
}

/* ────────────────────────── 만들기 ────────────────────────── */

/** 규칙을 지키는 완성판 하나 */
export function makeSolution(rng: Rng): Board {
  const out: Board[] = [];
  search(emptyState(), out, 1, rng);
  return out[0];
}

/**
 * 답이 하나로 남고 등급이 target을 넘지 않는 한 파낸다.
 * 빈칸이 floor를 넘고 등급이 딱 target이 되면 그 자리에서 멈춘다.
 *
 * 지울 때마다 답이 하나인지 세는 것이 핵심이다. 이걸 건너뛰고 "몇 칸 지우기"로
 * 만들면 답이 둘인 문제가 섞여 나오고, 그건 화면에서 보이지 않는다.
 *
 * ── floor를 두는 이유 ────────────────────────────────
 * 등급이 난이도를 정하지만, 어디서 멈추느냐는 따로다. 후보가 하나뿐인 칸만으로
 * 풀리는 문제도 끝까지 파내면 단서가 스물여섯 칸까지 내려가고(실제로 그렇게
 * 나온다), 그러면 "쉬움"인데 그 한 칸을 찾느라 한참 헤맨다. 그래서 난이도마다
 * 파내기를 멈출 빈칸 하한만 두고, 등급은 그 안에서 기법이 정한다.
 */
function dig(solution: Board, target: Rank, floor: number, ceil: number, rng: Rng): Board {
  const puzzle = solution.slice();
  let blanks = 0;
  let rank: Rank = 1;
  for (const i of shuffle([...Array(81).keys()], rng)) {
    // 하한을 넘겼고 등급이 목표에 닿았으면 더 파지 않는다
    if (blanks >= floor && rank === target) break;
    // 상한까지 파도 등급이 안 오르면 이 판은 버린다 — 위 난이도의 자리를 넘지 않는다
    if (blanks >= ceil) break;
    const kept = puzzle[i];
    puzzle[i] = 0;
    if (!isUnique(puzzle)) {
      puzzle[i] = kept;
      continue;
    }
    const r = techniqueNeeded(puzzle);
    if (r > target) {
      puzzle[i] = kept; // 더 어려워지므로 이 칸은 남긴다
      continue;
    }
    blanks++;
    rank = r;
  }
  return puzzle;
}

/**
 * 난이도별로 빈칸이 들어갈 구간 [하한, 상한].
 *
 * 구간을 겹치지 않게 둔 이유가 있다. 등급이 목표에 닿을 때까지 파내다 보면
 * 보통이 쉬움보다 훨씬 깊이 내려가기도 하는데(후보 하나만으로 풀리는 판이
 * 쉰여섯 칸까지 이어지는 씨앗이 있었다), 그러면 어려움보다 빈칸이 많아진다.
 * 상한에 닿았는데도 등급이 안 오르면 그 판은 버리고 순서를 바꿔 다시 판다.
 * 어려움만 상한이 없다 — 위에 아무것도 없기 때문이다.
 */
const WINDOW: Record<Difficulty, [number, number]> = {
  easy: [42, 45],
  normal: [48, 53],
  hard: [54, 81],
};

export interface Puzzle {
  seed: number;
  difficulty: Difficulty;
  /** 문제 — 0이 빈칸 */
  board: Board;
  /** 하나뿐인 답 */
  solution: Board;
  /** 빈칸 수. 난이도의 결과일 뿐이고 난이도의 근거는 아니다 */
  blanks: number;
  /** 이 문제를 푸는 데 실제로 필요했던 기법 단계 */
  rank: Rank;
}

/**
 * 씨앗과 난이도로 문제 하나. 같은 씨앗은 늘 같은 문제다.
 *
 * 등급이 목표에 못 닿으면 지우는 순서를 바꿔 다시 판다. 이를테면 보통을
 * 노렸는데 하한까지 파고도 후보 하나만으로 풀리는 판이 나올 수 있다 — 그건
 * 보통이 아니라 쉬움이므로 그대로 내보내면 난이도가 거짓이 된다.
 *
 * 순서를 바꿔도 안 되면 완성판을 새로 만들어 다시 판다. 어려움에서 실제로
 * 있었던 일이다 — 씨앗 300개 중 둘은 그 완성판에서 어떻게 파도 기법 둘로
 * 풀려서, 어려움이라 적힌 보통이 나왔다. 난수는 같은 줄기에서 계속 뽑으므로
 * 몇 번을 다시 파도 씨앗만 같으면 결과가 같다.
 */
export function makePuzzle(seed: number, difficulty: Difficulty): Puzzle {
  const rng = rngOf(seed);
  const target = RANK_OF[difficulty];
  const [floor, ceil] = WINDOW[difficulty];
  let best: Puzzle | null = null;
  for (let round = 0; round < 4; round++) {
    const solution = makeSolution(rng);
    for (let attempt = 0; attempt < 4; attempt++) {
      // 하한에 0~3칸을 얹어 같은 난이도에서도 판이 똑같아 보이지 않게 한다
      const stop = Math.min(floor + Math.floor(rng() * 4), ceil);
      const board = dig(solution, target, stop, ceil, rng);
      const found: Puzzle = {
        seed,
        difficulty,
        board,
        solution,
        blanks: board.filter(v => v === 0).length,
        rank: techniqueNeeded(board),
      };
      if (found.rank === target && found.blanks >= floor && found.blanks <= ceil) return found;
      if (!best || found.blanks > best.blanks) best = found;
    }
  }
  return best!;
}

/* ────────────────────────── 화면이 쓰는 것 ────────────────────────── */

/** 답과 다르게 채운 칸 — 규칙은 아직 안 어겼지만 답으로 갈 수 없는 자리 */
export function wrongCells(board: Board, solution: Board): number[] {
  const out: number[] = [];
  for (let i = 0; i < 81; i++) if (board[i] !== 0 && board[i] !== solution[i]) out.push(i);
  return out;
}

/** 사람이 읽는 좌표 — "3행 5열" */
export const cellName = (i: number): { row: number; col: number } => ({
  row: rowOf(i) + 1,
  col: colOf(i) + 1,
});
