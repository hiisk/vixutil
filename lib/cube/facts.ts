/**
 * 공식이 푸는 "경우"를 공식에서 계산한다.
 *
 * 다 맞춘 큐브에 공식의 역순을 걸면, 그 공식이 풀어야 할 모양이 그대로 나온다.
 * 그래서 자료에는 공식만 적고 경우 번호도 모양도 여기서 뽑는다. 공식을 한 수
 * 잘못 적으면 아래 두 층이 깨지거나 다른 공식과 같은 경우가 되어 검사에서 걸린다.
 */
import { apply, f2lIntact, reverseAlg, solved, tokens, type Cube } from './sim.ts';
import type { Alg, Step } from './list.ts';

/** 마지막 층 네 모서리 — 시계 방향으로 UFR, UFL, UBL, UBR. 각 줄은 [윗면, 옆면, 옆면] */
export const CORNER_SLOTS = [
  [8, 20, 9],
  [6, 38, 18],
  [0, 47, 36],
  [2, 11, 45],
];

/** 마지막 층 네 변 — 같은 차례로 UF, UL, UB, UR */
export const EDGE_SLOTS = [
  [7, 19],
  [3, 37],
  [1, 46],
  [5, 10],
];

/** 각 자리에 원래 놓일 조각의 옆면 — 색이 아니라 면 번호로 적는다 */
const CORNER_HOME = [
  [2, 1],
  [4, 2],
  [5, 4],
  [1, 5],
];
const EDGE_HOME = [2, 4, 5, 1];

/** 면의 색은 그 면 가운데 칸이 정한다 — 큐브가 기울어져 있어도 읽히게 */
const centre = (c: Cube, face: number): number => c[face * 9 + 4];

export interface LlState {
  /** 모서리 방향 — 0이면 윗면 색이 위를 본다 */
  co: number[];
  /** 변 방향 */
  eo: number[];
  /** 모서리 자리마다 어느 집의 조각이 앉아 있나 */
  cp: number[];
  /** 변 자리마다 어느 집의 조각이 앉아 있나 */
  ep: number[];
}

const rot = <T,>(a: T[], r: number): T[] => a.map((_, i) => a[(i + r) % a.length]);

/** 큐브 한 판에서 마지막 층의 방향과 자리를 읽는다 */
export function readLastLayer(c: Cube): LlState {
  const up = centre(c, 0);
  const co = CORNER_SLOTS.map(s => s.findIndex(i => c[i] === up));
  const eo = EDGE_SLOTS.map(s => s.findIndex(i => c[i] === up));
  const cp = CORNER_SLOTS.map(s => {
    const mine = new Set(s.map(i => c[i]).filter(v => v !== up));
    return CORNER_HOME.findIndex(h => h.every(f => mine.has(centre(c, f))));
  });
  const ep = EDGE_SLOTS.map(s => {
    const other = s.map(i => c[i]).find(v => v !== up)!;
    return EDGE_HOME.findIndex(f => centre(c, f) === other);
  });
  return { co, eo, cp, ep };
}

/**
 * 방향만 보는 열쇠 — 네 방향으로 돌려 본 것 중 사전순으로 가장 앞선 것.
 * 같은 모양을 어느 쪽에서 보든 한 이름으로 모으기 위해서다.
 */
export function ollKey(s: LlState): string {
  const forms = [0, 1, 2, 3].map(r => [...rot(s.co, r), ...rot(s.eo, r)].join(''));
  return forms.sort()[0];
}

/**
 * 자리만 보는 열쇠 — 돌려 보는 네 가지에 더해, 마지막에 윗면을 돌리는 네 가지까지
 * 함께 본다. 같은 퍼뮤테이션은 윗면을 몇 칸 돌려 놓고 시작하든 같은 경우다.
 */
export function pllKey(s: LlState): string {
  const forms: string[] = [];
  for (let r = 0; r < 4; r++) {
    for (let shift = 0; shift < 4; shift++) {
      const cp = rot(s.cp, r).map(v => (v + shift) % 4);
      const ep = rot(s.ep, r).map(v => (v + shift) % 4);
      forms.push([...cp, ...ep].join(''));
    }
  }
  return forms.sort()[0];
}

/**
 * 큐브를 든 방향을 바로잡는다.
 *
 * 공식에 x나 y가 섞이면 다 돌리고 난 큐브가 통째로 기울어져 있다. 경우는 큐브를
 * 어느 쪽으로 들었든 같은 경우이므로, 가운데 칸이 제자리로 오는 회전을 찾아 편다.
 */
const ORIENTATIONS = ['', 'x', 'x2', "x'", 'z', "z'"].flatMap(a => ['', 'y', 'y2', "y'"].map(b => `${a} ${b}`.trim()));
const CENTERS = [4, 13, 22, 31, 40, 49];

export function upright(c: Cube): Cube {
  const s = solved();
  let fallback: Cube | null = null;
  for (const r of ORIENTATIONS) {
    const t = r ? apply(c, r) : c;
    // 흐트러진 층이 위로 오는 방향을 고른다 — 공식에 따라 마지막 층이 아래에 놓이기도 한다
    if (!f2lIntact(t)) continue;
    if (CENTERS.every(i => t[i] === s[i])) return t;
    fallback ??= t;
  }
  return fallback ?? c;
}

/** 큐브를 통째로 돌리는 수는 손을 놀린 것이 아니므로 세지 않는다 */
const ROTATIONS = new Set(['x', 'y', 'z']);

export type CaseKind = 'oll' | 'pll' | 'broken';

/* ────────────────────────── F2L ────────────────────────── */

/** 오른쪽 앞 슬롯의 다섯 칸 — 모서리(D·F·R)와 변(F·R) */
const PAIR_FACELETS = new Set([29, 26, 15, 23, 12]);
const LL_FACELETS = new Set([...Array.from({ length: 9 }, (_, i) => i), 9, 10, 11, 18, 19, 20, 36, 37, 38, 45, 46, 47]);

/** 짝과 마지막 층을 뺀 나머지가 제자리인가 */
export function f2lRestIntact(c: Cube): boolean {
  for (let i = 0; i < 54; i++) {
    if (LL_FACELETS.has(i) || PAIR_FACELETS.has(i)) continue;
    if (c[i] !== centre(c, Math.floor(i / 9))) return false;
  }
  return true;
}

/** 짝이 놓일 수 있는 자리 — 윗면 네 자리와 슬롯 */
const CORNER_SPOTS = [[8, 20, 9], [6, 38, 18], [0, 47, 36], [2, 11, 45], [29, 26, 15]];
const EDGE_SPOTS = [[7, 19], [3, 37], [1, 46], [5, 10], [23, 12]];
const SLOT = 4;

export interface F2lSpot {
  /** 0~3이면 윗면, 4면 슬롯 안 */
  cornerAt: number;
  /** 아랫면 색이 어느 칸을 보는가 */
  cornerOri: number;
  edgeAt: number;
  edgeOri: number;
}

export function readPair(c: Cube): F2lSpot | null {
  const down = centre(c, 3);
  const front = centre(c, 2);
  const right = centre(c, 1);
  let cornerAt = -1;
  let cornerOri = -1;
  CORNER_SPOTS.forEach((s, i) => {
    const cols = s.map(x => c[x]);
    if (cols.includes(down) && cols.includes(front) && cols.includes(right)) {
      cornerAt = i;
      cornerOri = cols.indexOf(down);
    }
  });
  let edgeAt = -1;
  let edgeOri = -1;
  EDGE_SPOTS.forEach((s, i) => {
    const cols = s.map(x => c[x]);
    if (cols.includes(front) && cols.includes(right)) {
      edgeAt = i;
      edgeOri = cols.indexOf(front);
    }
  });
  if (cornerAt < 0 || edgeAt < 0) return null;
  return { cornerAt, cornerOri, edgeAt, edgeOri };
}

/** 윗면을 몇 칸 돌려 놓고 시작하든 같은 경우다 */
export function f2lKey(c: Cube): string {
  const forms: string[] = [];
  let t = c;
  for (let r = 0; r < 4; r++) {
    const p = readPair(t);
    if (!p) return '';
    forms.push(`${p.cornerAt}${p.cornerOri}${p.edgeAt}${p.edgeOri}`);
    t = apply(t, 'U');
  }
  return forms.sort()[0];
}

/* ────────────────────── 모양 가르기 ────────────────────── */

/** 윗면 변 넷의 모양 — 점·ㄱ자·일자·십자 */
export type EdgeShape = 'dot' | 'corner' | 'line' | 'cross';

export function edgeShape(eo: number[]): EdgeShape {
  const up = eo.map((v, i) => (v === 0 ? i : -1)).filter(i => i >= 0);
  if (up.length === 0) return 'dot';
  if (up.length === 4) return 'cross';
  // 두 개가 서 있을 때, 마주 보면 일자 아니면 ㄱ자
  return (up[1] - up[0]) % 2 === 0 ? 'line' : 'corner';
}

/** 마지막 층에서 무엇이 움직이는가 */
export type PllMoves = 'corners' | 'edges' | 'both';

export function pllMoves(s: LlState): PllMoves {
  const cornersHome = s.cp.every((v, i) => v === i);
  const edgesHome = s.ep.every((v, i) => v === i);
  if (edgesHome) return 'corners';
  if (cornersHome) return 'edges';
  return 'both';
}

/** 짝이 어디에 있는가 */
export type PairPlace = 'both-up' | 'corner-in' | 'edge-in' | 'both-in';

export function pairPlace(p: F2lSpot): PairPlace {
  const c = p.cornerAt === SLOT;
  const e = p.edgeAt === SLOT;
  return c && e ? 'both-in' : c ? 'corner-in' : e ? 'edge-in' : 'both-up';
}

/* ─────────────────── 공식 한 줄이 가진 값 ─────────────────── */

export interface CaseFacts {
  slug: string;
  step: Step;
  label: string;
  alg: string;
  /** 이 공식이 푸는 모양 */
  state: Cube;
  /** 수의 개수 — 돌리기(x y z)는 세지 않는다 */
  moves: number;
  /** 이 경우를 가리키는 열쇠 — 같은 경우면 같은 값이 나온다 */
  key: string;
  /** 성립하는 공식인가 */
  sound: boolean;
  /** 윗면 변의 모양 (F2L에는 없다) */
  shape?: EdgeShape;
  /** 윗면 색이 위를 보는 모서리 수 (OLL) */
  cornersUp?: number;
  /** 무엇이 움직이나 (PLL) */
  moving?: PllMoves;
  /** 짝이 어디에 있나 (F2L) */
  place?: PairPlace;
}

export function caseFacts(item: Alg): CaseFacts {
  const state = upright(apply(solved(), reverseAlg(item.alg)));
  const moves = tokens(item.alg).filter(t => !ROTATIONS.has(t[0])).length;
  const base = { slug: item.slug, step: item.step, label: item.label, alg: item.alg, state, moves };

  if (item.step === 'f2l') {
    const p = readPair(state);
    return {
      ...base,
      key: f2lKey(state),
      sound: f2lRestIntact(state) && p !== null,
      place: p ? pairPlace(p) : undefined,
    };
  }

  const ll = readLastLayer(state);
  const broken = !f2lIntact(state) || ll.co.includes(-1) || ll.eo.includes(-1);
  const oriented = ll.co.every(v => v === 0) && ll.eo.every(v => v === 0);

  if (item.step === 'pll') {
    return {
      ...base,
      key: pllKey(ll),
      sound: !broken && oriented && !(ll.cp.every((v, i) => v === i) && ll.ep.every((v, i) => v === i)),
      moving: pllMoves(ll),
    };
  }

  return {
    ...base,
    key: ollKey(ll),
    sound: !broken && !oriented,
    shape: edgeShape(ll.eo),
    cornersUp: ll.co.filter(v => v === 0).length,
  };
}

/** 이 경우와 상관없는 칸을 칠할 자리 — 그림에서 회색이 된다 */
export const GREY = 6;

/**
 * 그림에 넘길 스티커 배열.
 *
 * OLL은 윗면 색인지 아닌지만 보이면 되고, F2L은 짝 두 조각만 보이면 된다.
 * PLL은 옆면 색이 그대로 보여야 어느 조각이 어디로 가는지 읽힌다.
 */
export function diagram(f: CaseFacts): number[] {
  const c = f.state;
  const up = centre(c, 0);
  if (f.step === 'pll') return Array.from(c);
  if (f.step === 'oll') return Array.from(c, v => (v === up ? up : GREY));
  const p = readPair(c);
  if (!p) return Array.from(c, () => GREY);
  const keep = new Set([...CORNER_SPOTS[p.cornerAt], ...EDGE_SPOTS[p.edgeAt]]);
  return Array.from(c, (v, i) => (keep.has(i) ? v : GREY));
}
