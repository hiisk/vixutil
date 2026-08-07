/**
 * 뽑기 도구 여섯의 계산 — 카드·가위바위보·빙고·가중치·당번표·예아니오.
 *
 * 화면과 갈라 두는 이유는 하나다: **무작위를 쓰는 코드일수록 검사가 필요하다.**
 * 눈으로는 늘 그럴듯해 보이지만, 빙고판에 같은 수가 두 번 들어가거나 가중치가
 * 실제로는 무시되고 있어도 몇 번 눌러서는 알 수 없다.
 *
 * 그래서 모든 함수가 **난수를 인자로 받는다.** 검사가 정해진 수열을 넣어
 * 결과를 못 박을 수 있고, 확률이 필요한 검사는 만 번을 돌려 분포를 본다.
 */

/** 0 이상 1 미만을 주는 함수 — 기본은 Math.random, 검사는 자기 것을 넣는다 */
export type Rng = () => number;

const pick = <T>(arr: readonly T[], rng: Rng): T => arr[Math.floor(rng() * arr.length)];

/** 피셔-예이츠 — 앞에서부터 섞으면 자리마다 나올 확률이 고르지 않다 */
export function shuffle<T>(arr: readonly T[], rng: Rng): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ────────────────────────── 트럼프 카드 ────────────────────────── */

export const SUITS = ['♠', '♥', '♦', '♣'] as const;
export const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;

export interface Card {
  suit: (typeof SUITS)[number];
  rank: (typeof RANKS)[number];
  /** ♥♦는 빨강 — 화면이 색을 정할 때 쓴다 */
  red: boolean;
}

export function fullDeck(): Card[] {
  return SUITS.flatMap(suit => RANKS.map(rank => ({ suit, rank, red: suit === '♥' || suit === '♦' })));
}

/**
 * 카드를 n장 뽑는다.
 *
 * **한 벌에서 뽑으므로 같은 카드가 두 번 나오지 않는다.** 매번 52장에서
 * 독립으로 뽑으면 같은 카드가 두 장 나와 카드놀이로 쓸 수 없다.
 */
export function drawCards(n: number, rng: Rng): Card[] {
  const want = Math.max(0, Math.min(52, Math.floor(n)));
  return shuffle(fullDeck(), rng).slice(0, want);
}

/* ────────────────────────── 가위바위보 ────────────────────────── */

export type Hand = 'rock' | 'paper' | 'scissors';
export const HANDS: Hand[] = ['rock', 'paper', 'scissors'];

/** 이기는 손 — beats[a] === b면 a가 b를 이긴다 */
const BEATS: Record<Hand, Hand> = { rock: 'scissors', scissors: 'paper', paper: 'rock' };

export type Outcome = 'win' | 'lose' | 'draw';

export function judge(mine: Hand, theirs: Hand): Outcome {
  if (mine === theirs) return 'draw';
  return BEATS[mine] === theirs ? 'win' : 'lose';
}

export function throwHand(rng: Rng): Hand {
  return pick(HANDS, rng);
}

/* ────────────────────────── 빙고판 ────────────────────────── */

export interface BingoBoard {
  size: number;
  /** 왼쪽 위부터 가로로. 가운데 무료 칸은 null */
  cells: (number | null)[];
}

/**
 * 빙고판을 만든다.
 *
 * 열마다 다른 숫자 구간을 쓰는 것이 미국식 빙고(B는 1~15, I는 16~30…)인데,
 * 여기서는 한국에서 흔한 **1부터 size²까지를 통째로 섞는 방식**을 쓴다.
 * 어느 쪽이든 **같은 수가 두 번 들어가면 안 된다** — 그러면 그 수가 불렸을 때
 * 두 칸이 함께 지워져 빙고가 빨리 나 버린다.
 */
export function bingoBoard(size: number, rng: Rng, freeCenter = false): BingoBoard {
  const n = Math.max(3, Math.min(9, Math.floor(size)));
  const total = n * n;
  const cells: (number | null)[] = shuffle(
    Array.from({ length: total }, (_, i) => i + 1),
    rng,
  );
  // 가운데 무료 칸은 홀수 판에서만 뜻이 있다 — 짝수 판에는 가운데가 없다
  if (freeCenter && n % 2 === 1) cells[(total - 1) / 2] = null;
  return { size: n, cells };
}

/** 이 판에서 빙고가 될 수 있는 줄 — 가로·세로·대각선 두 개 */
export function bingoLines(size: number): number[][] {
  const lines: number[][] = [];
  for (let r = 0; r < size; r++) lines.push(Array.from({ length: size }, (_, c) => r * size + c));
  for (let c = 0; c < size; c++) lines.push(Array.from({ length: size }, (_, r) => r * size + c));
  lines.push(Array.from({ length: size }, (_, i) => i * size + i));
  lines.push(Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)));
  return lines;
}

/** 지워진 칸으로 완성된 줄이 몇 개인지 */
export function bingoCount(size: number, marked: ReadonlySet<number>): number {
  return bingoLines(size).filter(line => line.every(i => marked.has(i))).length;
}

/* ────────────────────────── 가중치 추첨 ────────────────────────── */

export interface Weighted {
  label: string;
  /** 0보다 커야 뽑힌다 */
  weight: number;
}

/**
 * 가중치대로 하나를 뽑는다.
 *
 * 가중치 합을 구해 그 안의 한 점을 고르고, 앞에서부터 더해 가며 넘어서는
 * 항목을 고른다. 뽑힐 확률은 정확히 weight / 총합이다.
 *
 * 가중치가 0 이하인 항목은 아예 뺀다 — 남겨 두면 "0인데 뽑혔다"가 된다.
 */
export function weightedPick(items: readonly Weighted[], rng: Rng): Weighted | null {
  const usable = items.filter(i => i.weight > 0);
  if (usable.length === 0) return null;
  const total = usable.reduce((n, i) => n + i.weight, 0);
  let point = rng() * total;
  for (const i of usable) {
    point -= i.weight;
    if (point < 0) return i;
  }
  // 부동소수 오차로 여기 닿을 수 있다 — 마지막 항목으로 떨어뜨린다
  return usable[usable.length - 1];
}

/** 화면에 보여줄 확률(%) — 합이 100이 되게 반올림 오차를 마지막에 몰아준다 */
export function weightedPercents(items: readonly Weighted[]): number[] {
  const total = items.reduce((n, i) => n + Math.max(0, i.weight), 0);
  if (total <= 0) return items.map(() => 0);
  const raw = items.map(i => (Math.max(0, i.weight) / total) * 100);
  const rounded = raw.map(v => Math.round(v * 10) / 10);
  const drift = Math.round((100 - rounded.reduce((a, b) => a + b, 0)) * 10) / 10;
  if (drift !== 0) {
    const biggest = rounded.indexOf(Math.max(...rounded));
    rounded[biggest] = Math.round((rounded[biggest] + drift) * 10) / 10;
  }
  return rounded;
}

/* ────────────────────────── 당번표 ────────────────────────── */

export interface Duty {
  /** 몇 번째 차례인지 (0부터) */
  turn: number;
  /** 그 차례에 걸린 사람들 */
  people: string[];
}

/**
 * 당번표를 만든다.
 *
 * **한 바퀴를 다 돌기 전에는 같은 사람이 두 번 걸리지 않는다.** 매번 독립으로
 * 뽑으면 누구는 세 번 하고 누구는 한 번도 안 하는 표가 나오는데, 그건 당번표로
 * 쓸 수 없다. 그래서 명단을 섞어 한 바퀴씩 쓰고, 다 쓰면 다시 섞는다.
 *
 * 새로 섞을 때 **앞 바퀴의 마지막 사람이 다음 바퀴 첫 자리에 오면 다시 섞는다** —
 * 그러면 그 사람만 연달아 두 번 하게 된다.
 */
export function dutyRoster(names: readonly string[], turns: number, perTurn: number, rng: Rng): Duty[] {
  const people = names.filter(n => n.trim()).map(n => n.trim());
  const want = Math.max(0, Math.floor(turns));
  const each = Math.max(1, Math.floor(perTurn));
  if (people.length === 0 || want === 0) return [];

  const out: Duty[] = [];
  let pool: string[] = [];
  let last: string | null = null;

  const refill = () => {
    pool = shuffle(people, rng);
    // 사람이 둘 이상일 때만 앞뒤가 겹치지 않게 바꿀 수 있다
    if (people.length > 1 && last !== null && pool[0] === last) {
      [pool[0], pool[pool.length - 1]] = [pool[pool.length - 1], pool[0]];
    }
  };

  for (let t = 0; t < want; t++) {
    const chosen: string[] = [];
    for (let k = 0; k < each; k++) {
      if (pool.length === 0) refill();
      const who = pool.shift()!;
      chosen.push(who);
      last = who;
    }
    out.push({ turn: t, people: chosen });
  }
  return out;
}

/** 사람마다 몇 번 걸렸는지 — 화면이 고르게 나뉘었음을 보여줄 때 쓴다 */
export function dutyCounts(roster: readonly Duty[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const d of roster) for (const p of d.people) out[p] = (out[p] ?? 0) + 1;
  return out;
}

/* ────────────────────────── 예/아니오 ────────────────────────── */

export interface YesNo {
  yes: boolean;
  /** 0~100 — "예"가 나올 확률로 잡아 둔 값 */
  lean: number;
}

/**
 * 예/아니오를 정한다. lean은 "예"가 나올 확률(%)이다.
 *
 * 50이면 반반이고, 0이나 100으로 두면 한쪽만 나온다 — 그것도 쓸모가 있다
 * (마음이 이미 정해졌는지 확인하는 용도).
 */
export function decideYesNo(lean: number, rng: Rng): YesNo {
  const p = Math.max(0, Math.min(100, lean));
  return { yes: rng() * 100 < p, lean: p };
}
