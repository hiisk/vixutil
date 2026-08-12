/**
 * 슬라이딩 퍼즐(15 퍼즐) — 뒤섞기·풀림 판정·옮기기·완성·남은 거리.
 *
 * 이 게임에서 화면으로는 절대 못 잡는 것이 하나 있다. **뒤섞은 판이 풀 수 있는
 * 판인가.** 15 퍼즐의 배열 절반은 아무리 옮겨도 완성되지 않는다 — 두 칸만
 * 맞바꾼 판이 그렇다. 눈으로는 멀쩡한 판과 구별이 안 되고, 사람은 그것을
 * 삼십 분 붙들고 나서야 "내가 못 푸는 건가"를 의심한다. 그래서 판을 내는 쪽이
 * 반드시 판정해야 하고, 그 판정은 셈이라 여기 두고 검사가 붙든다.
 *
 * 난수는 씨앗에서 만든다. Math.random()을 쓰면 같은 판을 두 번 만들 수 없어
 * "이 씨앗의 판은 풀 수 있다"를 못 박을 수 없다.
 *
 * ── 최소 해를 구하지 않는 이유 ──────────────────────────────
 * 4×4의 최적해는 상태가 16!/2 ≈ 1.05×10¹³ 가지라 브라우저에서 풀 것이 아니다.
 * 대신 **맨해튼 거리 합**을 낸다 — 가볍고, 한 번 옮길 때 딱 1만 바뀌므로
 * 그대로 남은 움직임의 하한이 된다(아래 manhattan을 보라).
 */

/** 고를 수 있는 판. 4×4가 원래의 15 퍼즐이고 기본이다 */
export const SIZES = [3, 4, 5] as const;
export type Size = (typeof SIZES)[number];
export const DEFAULT_SIZE: Size = 4;

/** 한 줄로 눕힌 판. 0이 빈 칸이고 1..n²-1이 타일이다 */
export type Tiles = number[];

export interface Game {
  tiles: Tiles;
  /** 옮긴 칸 수. 한 줄을 밀면 밀린 칸만큼 늘어난다 */
  moves: number;
  /** 이 판을 낸 씨앗 — 같은 씨앗이면 같은 판이다 */
  seed: number;
  /**
   * 되돌리기용. 옮기기 직전 **빈 칸이 있던 자리**를 쌓는다.
   *
   * 판을 통째로 쌓지 않는 이유는 되돌리기가 옮기기의 역이기 때문이다 — 빈 칸이
   * b에서 i로 갔다면, i에 있는 빈 칸을 b의 타일과 다시 맞바꾸면 제자리다.
   * 한 칸씩 되짚으므로 한 줄 밀기는 밀린 칸만큼 되짚힌다.
   */
  history: number[];
}

/* ────────────────────────── 자리 셈 ────────────────────────── */

/** 판의 한 변. 칸 수에서 되짚는다 — size를 따로 들고 다니면 둘이 어긋난다 */
export const sizeOf = (tiles: Tiles): number => Math.round(Math.sqrt(tiles.length));

export const blankIndex = (tiles: Tiles): number => tiles.indexOf(0);

/** 완성판 — 1부터 차례로 놓고 빈 칸이 맨 끝이다 */
export function goalTiles(size: number): Tiles {
  const out: Tiles = [];
  for (let i = 1; i < size * size; i++) out.push(i);
  out.push(0);
  return out;
}

/** 가로세로로 딱 한 칸 떨어진 자리인가 — 대각선은 이웃이 아니다 */
export function isAdjacent(size: number, a: number, b: number): boolean {
  const total = size * size;
  if (a < 0 || b < 0 || a >= total || b >= total || a === b) return false;
  const dc = Math.abs((a % size) - (b % size));
  const dr = Math.abs(Math.floor(a / size) - Math.floor(b / size));
  return dc + dr === 1;
}

export function isSolved(tiles: Tiles): boolean {
  const last = tiles.length - 1;
  if (tiles[last] !== 0) return false;
  for (let i = 0; i < last; i++) if (tiles[i] !== i + 1) return false;
  return true;
}

/* ────────────────────────── 풀림 판정 ────────────────────────── */

/**
 * 짝치환 개수(inversion) — 빈 칸을 뺀 타일만 줄 단위로 쭉 이어 읽었을 때,
 * 앞의 수가 뒤의 수보다 큰 짝의 개수다. 완성판에서는 0이다.
 */
export function inversions(tiles: Tiles): number {
  const seq = tiles.filter(v => v !== 0);
  let count = 0;
  for (let i = 0; i < seq.length; i++) {
    for (let j = i + 1; j < seq.length; j++) if (seq[i] > seq[j]) count++;
  }
  return count;
}

/**
 * 이 판을 완성판까지 옮길 수 있는가.
 *
 * ── 왜 절반이 안 되는가 ─────────────────────────────────────
 * 한 번 옮기는 것은 빈 칸과 타일을 맞바꾸는 일이고, 맞바꿈 하나는 배열의
 * 짝홀(치환 부호)을 뒤집는다. 그 한 번에 빈 칸의 줄+칸도 1만 바뀌므로 그 짝홀도
 * 함께 뒤집힌다. 즉 **둘을 더한 짝홀은 아무리 옮겨도 바뀌지 않는다** — 불변량이다.
 * 완성판은 둘 다 짝수(치환 없음, 빈 칸이 (n-1,n-1))라 그 합이 짝수이므로,
 * 합이 홀수인 판은 완성판에 닿을 수 없다. 그래서 배열의 절반이 풀 수 없다.
 *
 * ── 그 불변량을 세는 식 ─────────────────────────────────────
 * 빈 칸을 가장 큰 값으로 보고 세면 치환의 짝홀은 (타일끼리의 짝치환 개수)에
 * (빈 칸 뒤에 남은 칸 수 = n²-1-k)를 더한 값의 짝홀이다. k는 빈 칸의 번호다.
 * 여기에 빈 칸의 줄+칸을 더해 짝수인지 보면 된다.
 *
 *   · **한 변이 홀수**면 k ≡ 줄+칸 (mod 2)이고 n²-1이 짝수라 뒤 몫이 모두
 *     지워진다. 남는 조건은 **짝치환 개수가 짝수**인 것 하나다.
 *   · **한 변이 짝수**면 그렇게 지워지지 않는다. 정리하면
 *     **짝치환 개수 + 빈 칸의 줄(맨 위가 0)이 홀수**여야 한다.
 *     완성판으로 검산하면 0 + (n-1)이고 n이 짝수라 홀수다 — 맞는다.
 *
 * 그래서 한 변이 짝수인 판에서는 **빈 칸이 어느 줄에 있는지**까지 봐야 한다.
 * 이것을 빠뜨리면 4×4에서 판정이 절반씩 뒤집혀, 풀 수 있는 판을 버리고 풀 수
 * 없는 판을 내놓는다.
 */
export function isSolvable(tiles: Tiles): boolean {
  const size = sizeOf(tiles);
  const inv = inversions(tiles);
  if (size % 2 === 1) return inv % 2 === 0;
  const row = Math.floor(blankIndex(tiles) / size);
  return (inv + row) % 2 === 1;
}

/* ────────────────────────── 뒤섞기 ────────────────────────── */

/**
 * 씨앗에서 난수를 만든다 (mulberry32).
 *
 * 고르게 흩어지고 씨앗이 같으면 같은 줄이 나오는 것만 필요하다. 암호에 쓰는
 * 것이 아니므로 짧은 것으로 충분하다.
 */
export function seededRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 타일 둘을 맞바꿔 짝치환 개수의 짝홀을 뒤집는다 — 풀 수 없는 판을 고치는 자리.
 *
 * 빈 칸은 건드리지 않는다. 빈 칸을 끼워 맞바꾸면 그것은 그냥 한 번 옮긴 것이라
 * 불변량이 그대로여서 아무것도 고쳐지지 않는다.
 */
function swapTwoTiles(tiles: Tiles): void {
  const a = tiles.findIndex(v => v !== 0);
  const b = tiles.findIndex((v, i) => v !== 0 && i > a);
  [tiles[a], tiles[b]] = [tiles[b], tiles[a]];
}

/**
 * 뒤섞은 판. **반드시 풀 수 있는 판만 낸다.**
 *
 * ── 두 방법 중 무엇을 골랐나 ────────────────────────────────
 * (ㄱ) 무작위로 늘어놓고 풀 수 없으면 타일 둘을 맞바꿔 고친다  ← 이것을 쓴다
 * (ㄴ) 완성판에서 합법적인 움직임을 여러 번 되풀이한다
 *
 * (ㄴ)은 만들기가 쉽고 늘 풀리지만 **섞임을 보장하지 못한다.** 빈 칸이 제자리로
 * 돌아오는 걸음이 흔해서 짧은 걸음은 거의 완성판을 내놓고, 4×4를 고르게 섞으려면
 * 수만 걸음이 필요하다. 게다가 "얼마나 섞였나"를 값으로 확인할 방법이 없어
 * 검사가 붙들 것이 없다 — 걸음 수를 잘못 줘도 조용히 쉬운 판만 나온다.
 *
 * (ㄱ)은 풀 수 있는 절반 위에서 고르다. 뒤섞기가 완전한 무작위 배열 하나이고,
 * 고치는 일은 맞바꿈 한 번이라 셈이 짧고 그 한 줄이 곧 검사할 자리가 된다.
 * 대신 판정을 반드시 옳게 적어야 한다 — 그래서 위 isSolvable에 규칙을 적었다.
 *
 * 완성판이 나오면 다시 뽑는다. 다 맞춰진 판을 "뒤섞었다"고 내밀 수는 없다.
 */
export function shuffleTiles(size: number, seed: number): Tiles {
  const rng = seededRng(seed);
  const total = size * size;

  for (let tries = 0; tries < 20; tries++) {
    const tiles = goalTiles(size);
    for (let i = total - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    if (!isSolvable(tiles)) swapTwoTiles(tiles);
    if (!isSolved(tiles)) return tiles;
  }

  /*
   * 스무 번을 뽑아 모두 완성판이 나오는 일은 3×3에서도 20160분의 1의 스무 제곱이라
   * 일어나지 않는다. 그래도 돌려줄 것은 있어야 하니 완성판에서 타일 셋만 돌린다 —
   * 세 칸 돌리기는 맞바꿈 두 번이라 짝치환 개수의 짝홀이 그대로여서 풀 수 있다.
   */
  const tiles = goalTiles(size);
  [tiles[0], tiles[1], tiles[2]] = [tiles[2], tiles[0], tiles[1]];
  return tiles;
}

/* ────────────────────────── 남은 거리 ────────────────────────── */

/**
 * 맨해튼 거리 합 — 타일마다 제자리까지의 가로세로 걸음을 더한다. 빈 칸은 뺀다.
 *
 * 완성판에서 0이고, 한 번 옮길 때 딱 1만 바뀐다(타일 하나가 한 칸 가까워지거나
 * 멀어진다). 그러므로 이 값을 0으로 만들려면 적어도 이 값만큼 옮겨야 한다 —
 * **최소 움직임의 하한**이다. 최적해를 찾는 탐색 없이 "얼마나 남았나"를
 * 보여줄 수 있는 것이 이 성질 덕이다.
 */
export function manhattan(tiles: Tiles): number {
  const size = sizeOf(tiles);
  let sum = 0;
  for (let i = 0; i < tiles.length; i++) {
    const v = tiles[i];
    if (v === 0) continue;
    const home = v - 1;
    sum += Math.abs((i % size) - (home % size));
    sum += Math.abs(Math.floor(i / size) - Math.floor(home / size));
  }
  return sum;
}

/* ────────────────────────── 판 만들기와 옮기기 ────────────────────────── */

const clampSize = (size: number): Size =>
  (SIZES as readonly number[]).includes(size) ? (size as Size) : DEFAULT_SIZE;

export function newGame(size: number, seed: number): Game {
  return { tiles: shuffleTiles(clampSize(size), seed), moves: 0, seed: seed >>> 0, history: [] };
}

/**
 * 칸 하나를 옮긴다. **빈 칸과 가로세로로 맞닿은 칸만** 움직인다.
 *
 * 옮길 수 없는 자리를 누르면 판을 그대로 돌려준다 — 새 객체를 만들지 않으므로
 * 화면도 다시 그리지 않고, 움직인 수도 늘지 않는다.
 */
export function moveAt(game: Game, i: number): Game {
  const size = sizeOf(game.tiles);
  const blank = blankIndex(game.tiles);
  if (!isAdjacent(size, i, blank)) return game;
  const tiles = game.tiles.slice();
  tiles[blank] = tiles[i];
  tiles[i] = 0;
  return { ...game, tiles, moves: game.moves + 1, history: [...game.history, blank] };
}

/**
 * 빈 칸과 같은 줄·칸에 있는 여러 개를 한 번에 민다.
 *
 * 손이 편해서 넣었다. 4×4에서 줄 하나를 옮기려면 세 번을 따로 눌러야 하는데,
 * 휴대폰에서 그 세 번은 오타가 나기 쉽다. 맞닿은 칸을 누르면 결과가 moveAt과
 * 같으니 조작이 둘로 갈리지도 않는다.
 *
 * 안쪽부터 한 칸씩 moveAt으로 옮긴다 — 빈 칸이 한 칸 다가오므로 다음 칸이 늘
 * 이웃이다. 움직인 수는 밀린 칸만큼 늘고, 되돌리기도 그만큼 쌓인다.
 */
export function pushAt(game: Game, i: number): Game {
  const size = sizeOf(game.tiles);
  const blank = blankIndex(game.tiles);
  if (i < 0 || i >= game.tiles.length || i === blank) return game;
  const sameRow = Math.floor(i / size) === Math.floor(blank / size);
  const sameCol = i % size === blank % size;
  if (!sameRow && !sameCol) return game;

  const step = sameRow ? (i > blank ? 1 : -1) : i > blank ? size : -size;
  let next = game;
  for (let p = blank + step; ; p += step) {
    next = moveAt(next, p);
    if (p === i) break;
  }
  return next;
}

export const canUndo = (game: Game): boolean => game.history.length > 0;

/** 한 칸 되돌린다. 되돌릴 것이 없으면 판이 그대로다 */
export function undo(game: Game): Game {
  if (!game.history.length) return game;
  const history = game.history.slice();
  const back = history.pop()!;
  const tiles = game.tiles.slice();
  const blank = blankIndex(tiles);
  tiles[blank] = tiles[back];
  tiles[back] = 0;
  return { ...game, tiles, moves: game.moves - 1, history };
}
