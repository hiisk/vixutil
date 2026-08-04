/**
 * 남은 점수 하나의 마무리 — 판에서 찾아낸다.
 *
 * 다트판에 있는 값은 정해져 있다. 1~20의 싱글·더블·트리플과 바깥 불(25),
 * 가운데 불(50). 마무리는 **반드시 더블로 끝나야** 하므로 마지막 다트는
 * 더블 스물과 가운데 불 가운데 하나다.
 *
 * 그래서 "몇 다트에 끝나는가"는 탐색이다 — 한 다트로 되는지, 안 되면 두 다트,
 * 그래도 안 되면 세 다트. 셋으로도 안 되는 수가 일곱 개 있고(159·162·163·
 * 165·166·168·169) 그것을 보기(bogey) 수라 부른다. 목록에서 빼지 않고 남겨 둔
 * 이유는, 찾는 사람이 그 수를 들고 오기 때문이다 — "169는 왜 안 되나".
 */
import { MAX_SCORE } from './list.ts';

export type Ring = 'single' | 'double' | 'triple' | 'outer-bull' | 'bull';

export interface Throw {
  /** S20 · D16 · T20 · 25 · BULL */
  label: string;
  value: number;
  ring: Ring;
  /** 몇 번 구역인가 — 불은 25로 둔다 */
  sector: number;
}

const sector = (n: number): Throw[] => [
  { label: `S${n}`, value: n, ring: 'single', sector: n },
  { label: `D${n}`, value: n * 2, ring: 'double', sector: n },
  { label: `T${n}`, value: n * 3, ring: 'triple', sector: n },
];

/** 판에서 던져 얻을 수 있는 모든 값 */
export const THROWS: Throw[] = [
  ...Array.from({ length: 20 }, (_, i) => sector(i + 1)).flat(),
  { label: '25', value: 25, ring: 'outer-bull', sector: 25 },
  { label: 'BULL', value: 50, ring: 'bull', sector: 25 },
];

/** 마무리 다트가 될 수 있는 것 — 더블과 가운데 불 */
export const FINISHERS: Throw[] = THROWS.filter(t => t.ring === 'double' || t.ring === 'bull');

/**
 * 마무리로 좋은 더블의 순서.
 *
 * D20은 빗나가도 20이 남아 다시 D10으로 갈 수 있고, D16은 D8·D4·D2로 곱게
 * 반씩 나뉜다. 이 선호는 사람의 관습이라 계산으로 나오지 않으므로 규칙으로 적는다.
 */
const FINISH_RANK = [40, 32, 16, 8, 4, 2, 50, 24, 20, 12, 36, 28, 10, 6, 18, 14, 22, 26, 30, 34, 38];

const finishScore = (value: number): number => {
  const i = FINISH_RANK.indexOf(value);
  return i === -1 ? FINISH_RANK.length : i;
};

export interface DartsFacts {
  score: number;
  /** 몇 다트에 끝나는가. 못 끝내면 null */
  darts: number | null;
  /** 가장 좋은 수순 한 벌 */
  route: Throw[];
  /** 같은 다트 수로 끝나는 다른 수순의 개수 */
  routeCount: number;
  /** 세 다트로 못 끝내는 수인가 */
  bogey: boolean;
  /** 한 다트로 끝나는가 — 더블 하나면 된다 */
  oneDart: boolean;
}

/** 마무리 전에 더블을 쓴 횟수 — 적을수록 좋다 */
const midDoubles = (r: Throw[]): number => r.slice(0, -1).filter(t => t.ring === 'double').length;

/**
 * 수순을 견주는 잣대.
 *
 * 1. 다트 수가 적은 쪽
 * 2. 도중에 더블을 덜 쓴 쪽 — 더블은 좁아서 도중에 걸면 빗나갈 때 손해가 크다
 * 3. 마무리 더블이 좋은 쪽(D20·D16…)
 * 4. 첫 다트가 큰 쪽
 *
 * 이 순서로 고르면 잘 알려진 수순이 그대로 나온다 — 60은 S20 D20, 100은 T20 D20.
 * 관습을 표로 베끼지 않고 규칙으로 적었으므로 "왜 이 수순인가"에 답할 수 있다.
 */
const better = (a: Throw[], b: Throw[]): Throw[] => {
  if (a.length !== b.length) return a.length < b.length ? a : b;
  const ma = midDoubles(a);
  const mb = midDoubles(b);
  if (ma !== mb) return ma < mb ? a : b;
  const fa = finishScore(a[a.length - 1].value);
  const fb = finishScore(b[b.length - 1].value);
  if (fa !== fb) return fa < fb ? a : b;
  return a[0].value >= b[0].value ? a : b;
};

export function dartsFacts(score: number): DartsFacts {
  const routes: Throw[][] = [];

  // 한 다트
  for (const f of FINISHERS) if (f.value === score) routes.push([f]);
  // 두 다트
  if (routes.length === 0) {
    for (const first of THROWS) {
      for (const f of FINISHERS) if (first.value + f.value === score) routes.push([first, f]);
    }
  }
  // 세 다트
  if (routes.length === 0) {
    for (const first of THROWS) {
      for (const second of THROWS) {
        for (const f of FINISHERS) {
          if (first.value + second.value + f.value === score) routes.push([first, second, f]);
        }
      }
    }
  }

  const best = routes.reduce<Throw[] | null>((acc, r) => (acc === null ? r : better(acc, r)), null);

  return {
    score,
    darts: best ? best.length : null,
    route: best ?? [],
    routeCount: routes.length,
    bogey: best === null,
    oneDart: best !== null && best.length === 1,
  };
}

/** 세 다트로 끝나지 않는 수 — 계산에서 나온다 */
export const bogeyScores = (): number[] => {
  const out: number[] = [];
  for (let s = 2; s <= MAX_SCORE; s++) if (dartsFacts(s).bogey) out.push(s);
  return out;
};

/** 몇 다트에 끝나는지로 묶는다 */
export const scoresOfDarts = (n: number | null, scores: number[]): number[] =>
  scores.filter(s => dartsFacts(s).darts === n);

/** 앞뒤 점수 */
export const neighbours = (score: number, span = 3): number[] =>
  Array.from({ length: span * 2 + 1 }, (_, i) => score - span + i)
    .filter(s => s >= 2 && s <= MAX_SCORE && s !== score);
