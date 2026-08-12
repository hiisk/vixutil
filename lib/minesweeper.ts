/**
 * 지뢰찾기의 셈 — 판 만들기·이웃 세기·이어 열기·승패·3BV.
 *
 * 화면에 두면 확인할 방법이 없는 것이 세 가지다.
 *   · **이웃 세기**가 판 가장자리에서 틀린다. 왼쪽 끝 칸이 오른쪽 끝 칸을
 *     이웃으로 세는 실수는 숫자를 보고도 알아채기 어렵다 — 1이 2로 보일 뿐이다.
 *   · **이어 열기**가 샌다. 0인 칸을 열었는데 그 옆의 0이 안 열리면 판 한가운데
 *     구멍이 남는데, 몇 판 해서는 "원래 그런가" 싶다.
 *   · **첫 클릭**이 지뢰였는지. 어쩌다 한 번 걸리는 일이라 눈으로는 못 잡는다.
 *
 * 그래서 여기 함수들은 전부 순수하고, 난수는 **씨앗**에서 만든다. Math.random을
 * 쓰면 같은 판을 두 번 만들 수 없어 검사가 붙들 것이 없다.
 *
 * ── 판이 무엇으로 정해지는가 ────────────────────────────────
 * (가로·세로·지뢰 수, 씨앗, 첫 클릭 자리) 셋이면 판이 하나로 정해진다.
 * 첫 클릭 자리가 들어가는 이유는 아래 plant를 보라 — 배치를 첫 클릭 뒤로
 * 미루기 때문이다.
 */

export type Rng = () => number;

/**
 * 씨앗에서 난수를 만든다 (mulberry32).
 *
 * 자리마다 고르게 흩어지고 씨앗이 같으면 같은 줄이 나오는 것만 필요하다.
 * 암호에 쓰는 것이 아니므로 짧은 것으로 충분하다.
 */
export function seededRng(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ────────────────────────── 판의 규격 ────────────────────────── */

export type Level = 'beginner' | 'intermediate' | 'expert';

export interface Shape {
  cols: number;
  rows: number;
  mines: number;
}

/**
 * 널리 쓰이는 세 판. 1990년대 윈도 판에서 굳은 값이고, 기록을 견주는 자리마다
 * 이 셋을 쓴다. 우리가 임의로 고치면 "고급 30초"가 남의 기록과 견줄 수 없어진다.
 */
export const LEVELS: Record<Level, Shape> = {
  beginner: { cols: 9, rows: 9, mines: 10 },
  intermediate: { cols: 16, rows: 16, mines: 40 },
  expert: { cols: 30, rows: 16, mines: 99 },
};

export const LEVEL_ORDER: Level[] = ['beginner', 'intermediate', 'expert'];

/** 칸에 사람이 붙인 표시. 물음표는 "지뢰인지 아닌지 아직 모른다"는 자리 표시다 */
export type Mark = 'none' | 'flag' | 'guess';

/** ready는 아직 지뢰를 놓지 않은 상태다 — 첫 클릭이 그때 배치를 만든다 */
export type Status = 'ready' | 'playing' | 'won' | 'lost';

export interface Board {
  cols: number;
  rows: number;
  mines: number;
  seed: number;
  /** 지뢰를 놓았는가. 첫 클릭 자리를 알아야 그 자리를 비울 수 있어 미뤄 둔다 */
  placed: boolean;
  mine: boolean[];
  /** 이웃 여덟 칸의 지뢰 수. 지뢰 칸도 셈은 해 둔다 — 화면이 안 쓸 뿐이다 */
  near: number[];
  open: boolean[];
  mark: Mark[];
  status: Status;
  /** 밟은 지뢰 자리. 없으면 -1 — 화면이 이 칸만 붉게 그린다 */
  blast: number;
}

/* ────────────────────────── 자리 셈 ────────────────────────── */

export const colOf = (cols: number, i: number): number => i % cols;
export const rowOf = (cols: number, i: number): number => Math.floor(i / cols);

/**
 * 이웃 여덟 칸. 판 밖으로 나가는 것은 뺀다.
 *
 * 여기가 이 파일에서 가장 자주 틀리는 곳이다. 번호만으로 ±1·±cols를 더하면
 * 왼쪽 끝 칸이 윗줄 오른쪽 끝을 이웃으로 삼는다 — 칸 번호로는 딱 옆자리이기
 * 때문이다. 그래서 가로·세로로 풀어서 본다.
 */
export function neighbors(cols: number, rows: number, i: number): number[] {
  const col = colOf(cols, i);
  const row = rowOf(cols, i);
  const out: number[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nc = col + dc;
      const nr = row + dr;
      if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;
      out.push(nr * cols + nc);
    }
  }
  return out;
}

/* ────────────────────────── 판 만들기 ────────────────────────── */

/**
 * 빈 판. 지뢰는 아직 없다 — 첫 클릭 때 plant가 놓는다.
 *
 * 지뢰 수는 칸 수보다 하나 적은 값으로 자른다. 전부 지뢰면 첫 클릭에 안전한
 * 칸이 없어 게임이 성립하지 않는다.
 */
export function newBoard(shape: Shape, seed: number): Board {
  const cols = Math.max(1, Math.floor(shape.cols));
  const rows = Math.max(1, Math.floor(shape.rows));
  const total = cols * rows;
  const mines = Math.max(0, Math.min(Math.floor(shape.mines), total - 1));
  return {
    cols,
    rows,
    mines,
    seed: seed >>> 0,
    placed: false,
    mine: new Array<boolean>(total).fill(false),
    near: new Array<number>(total).fill(0),
    open: new Array<boolean>(total).fill(false),
    mark: new Array<Mark>(total).fill('none'),
    status: 'ready',
    blast: -1,
  };
}

/**
 * 지뢰를 놓는다. `safe` 칸과 그 이웃 여덟은 비운다.
 *
 * ── 첫 클릭을 왜 이렇게 다루나 ──────────────────────────────
 * 먼저 놓고 나서 첫 클릭이 지뢰면 옮기는 방식이 흔하지만, 그러면 첫 클릭이
 * 숫자 칸일 때가 대부분이라 한 칸만 열리고 시작한다. 첫 판이 늘 찍기로
 * 시작하는 것이다. 이웃까지 비우면 첫 클릭이 반드시 0이 되어 넓게 열리고,
 * 거기서부터 실제로 추론할 수 있다. 요즘 구현이 대개 이쪽이다.
 *
 * 이웃까지 비우면 놓을 자리가 모자랄 수 있다(3×3에 지뢰 여덟). 그럴 때는
 * 클릭한 칸 하나만 비운다 — 첫 클릭이 지뢰가 아니라는 약속이 더 중요하다.
 */
export function plant(board: Board, safe: number): Board {
  const { cols, rows, mines } = board;
  const total = cols * rows;
  const wide = new Set<number>([safe, ...neighbors(cols, rows, safe)]);
  // 넓은 안전지대를 다 비우고도 지뢰가 들어가는지 본다
  const zone = mines <= total - wide.size ? wide : new Set<number>([safe]);

  const pool: number[] = [];
  for (let i = 0; i < total; i++) if (!zone.has(i)) pool.push(i);

  // 앞에서 mines개만 뽑는 부분 셔플 — 같은 자리가 두 번 뽑히지 않는다
  const rng = seededRng(board.seed);
  const take = Math.min(mines, pool.length);
  for (let k = 0; k < take; k++) {
    const j = k + Math.floor(rng() * (pool.length - k));
    [pool[k], pool[j]] = [pool[j], pool[k]];
  }

  const mine = new Array<boolean>(total).fill(false);
  for (let k = 0; k < take; k++) mine[pool[k]] = true;

  const near = new Array<number>(total).fill(0);
  for (let i = 0; i < total; i++) {
    let n = 0;
    for (const j of neighbors(cols, rows, i)) if (mine[j]) n++;
    near[i] = n;
  }

  return { ...board, mine, near, placed: true, status: 'playing' };
}

/**
 * 그림에서 판을 만든다 — '*'가 지뢰, 그 밖은 빈 칸.
 *
 * 검사가 손으로 셀 수 있는 판을 두려면 배치를 직접 적어야 한다. 씨앗으로는
 * "3BV가 4다" 같은 값을 못 박을 수 없다.
 */
export function boardFromMap(map: string[]): Board {
  const rows = map.length;
  const cols = map[0]?.length ?? 0;
  if (!rows || !cols) throw new Error('minesweeper: 빈 그림');
  if (map.some(line => line.length !== cols)) throw new Error('minesweeper: 줄 길이가 다르다');

  const total = cols * rows;
  const mine = new Array<boolean>(total).fill(false);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) if (map[r][c] === '*') mine[r * cols + c] = true;
  }
  const near = new Array<number>(total).fill(0);
  for (let i = 0; i < total; i++) {
    let n = 0;
    for (const j of neighbors(cols, rows, i)) if (mine[j]) n++;
    near[i] = n;
  }
  return {
    cols,
    rows,
    mines: mine.filter(Boolean).length,
    seed: 0,
    placed: true,
    mine,
    near,
    open: new Array<boolean>(total).fill(false),
    mark: new Array<Mark>(total).fill('none'),
    status: 'playing',
    blast: -1,
  };
}

/* ────────────────────────── 열기 ────────────────────────── */

/**
 * 이어 열기. 0인 칸을 열면 이웃까지 번져 나간다.
 *
 * 깃발이 꽂힌 칸에서는 멈춘다 — 깃발은 "여기는 건드리지 말라"는 자물쇠이고,
 * 이어 열기가 그것을 무시하면 잘못 꽂은 깃발 하나가 판을 날린다.
 * (그래서 깃발이 있는 판에서는 열린 영역 안에 안 열린 0이 남을 수 있다.)
 */
function flood(cols: number, rows: number, near: number[], open: boolean[], mark: Mark[], start: number): void {
  const stack = [start];
  while (stack.length) {
    const i = stack.pop()!;
    if (open[i] || mark[i] === 'flag') continue;
    open[i] = true;
    if (near[i] !== 0) continue;
    for (const j of neighbors(cols, rows, i)) if (!open[j]) stack.push(j);
  }
}

/** 지뢰가 아닌 칸이 다 열렸는가 */
function cleared(board: Board): boolean {
  for (let i = 0; i < board.mine.length; i++) if (!board.mine[i] && !board.open[i]) return false;
  return true;
}

/**
 * 칸 하나를 연다.
 *
 * 아직 지뢰를 안 놓은 판이면 여기서 놓는다 — 그래서 첫 클릭은 언제나 안전하고
 * 언제나 0이다. 깃발이 꽂힌 칸과 이미 열린 칸, 끝난 판은 아무 일도 없다.
 */
export function openAt(board: Board, i: number): Board {
  if (board.status === 'won' || board.status === 'lost') return board;
  if (i < 0 || i >= board.mine.length) return board;
  if (board.mark[i] === 'flag') return board;

  const base = board.placed ? board : plant(board, i);
  if (base.open[i]) return base;

  if (base.mine[i]) {
    const open = [...base.open];
    open[i] = true;
    return { ...base, open, status: 'lost', blast: i };
  }

  const open = [...base.open];
  flood(base.cols, base.rows, base.near, open, base.mark, i);
  const next: Board = { ...base, open, status: 'playing' };
  return cleared(next) ? { ...next, status: 'won' } : next;
}

/**
 * 표시를 한 칸 돌린다: 없음 → 깃발 → 물음표 → 없음.
 *
 * 물음표를 둔 이유는 고급 판(지뢰 99개)에서 "아마 지뢰"와 "확실히 지뢰"를
 * 가려 둬야 남은 지뢰 수가 쓸모 있어지기 때문이다. 남은 수는 깃발만 센다.
 */
export function markAt(board: Board, i: number): Board {
  if (board.status === 'won' || board.status === 'lost') return board;
  if (i < 0 || i >= board.mine.length) return board;
  if (board.open[i]) return board;
  const mark = [...board.mark];
  mark[i] = mark[i] === 'none' ? 'flag' : mark[i] === 'flag' ? 'guess' : 'none';
  return { ...board, mark };
}

/** 꽂은 깃발 수 */
export const flagCount = (board: Board): number => board.mark.filter(m => m === 'flag').length;

/** 남은 지뢰 수 — 실제로 남은 수가 아니라 "지뢰 수 − 깃발 수"다. 음수가 될 수 있다 */
export const remaining = (board: Board): number => board.mines - flagCount(board);

/* ────────────────────────── 3BV ────────────────────────── */

/**
 * 3BV — 이 판을 깃발 없이 푸는 데 필요한 최소 클릭 수.
 *
 * 지뢰찾기에서 실력을 견주는 값이다. 같은 30초라도 3BV 150짜리 판과 80짜리
 * 판은 전혀 다른 일이라, 초만 재면 쉬운 판을 뽑은 사람이 이긴다.
 *
 * 셈은 두 몫이다.
 *   · 0인 칸 덩어리 하나는 클릭 한 번이다 — 어디를 눌러도 덩어리 전체와
 *     그것에 닿은 숫자 칸까지 함께 열린다.
 *   · 그렇게 열리지 않는 숫자 칸(0에 닿지 않은 칸)은 하나씩 눌러야 한다.
 */
export function bbbv(board: Board): number {
  const { cols, rows, mine, near } = board;
  const total = cols * rows;
  const seen = new Uint8Array(total);
  let clicks = 0;

  for (let i = 0; i < total; i++) {
    if (mine[i] || near[i] !== 0 || seen[i]) continue;
    clicks++;
    seen[i] = 1;
    const stack = [i];
    while (stack.length) {
      const j = stack.pop()!;
      for (const n of neighbors(cols, rows, j)) {
        if (seen[n]) continue;
        // 덩어리에 닿은 숫자 칸도 함께 열린다 — 그래서 따로 세지 않는다
        seen[n] = 1;
        if (!mine[n] && near[n] === 0) stack.push(n);
      }
    }
  }

  for (let i = 0; i < total; i++) if (!mine[i] && !seen[i]) clicks++;
  return clicks;
}
