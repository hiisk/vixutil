/**
 * 주사위 합 하나에 딸린 값들 — 전부 셈으로 나온다.
 *
 * 경우의 수는 한 개짜리 분포에 주사위를 하나씩 겹쳐 가며 구한다. 확률은 그
 * 경우의 수를 6의 거듭제곱으로 나눈 값이고, 순위도 누적도 같은 표에서 나온다.
 * 그래서 표에 적어 둘 숫자가 없다.
 */
import { DICE_COUNTS, FACES, ROLLS, type Roll } from './list.ts';

/** n개를 굴렸을 때 합마다의 경우의 수 — 자리 0은 합 n이다 */
function distribution(dice: number): number[] {
  let ways = [1];
  for (let d = 0; d < dice; d++) {
    const next = new Array<number>(ways.length + FACES - 1).fill(0);
    for (let i = 0; i < ways.length; i++) {
      for (let f = 0; f < FACES; f++) next[i + f] += ways[i];
    }
    ways = next;
  }
  return ways;
}

/** 여섯 벌을 미리 구해 둔다 — 한 화면에서 백 번 넘게 쓰인다 */
const TABLE = new Map<number, number[]>(DICE_COUNTS.map(d => [d, distribution(d)]));

export const waysFor = (dice: number, sum: number): number => TABLE.get(dice)?.[sum - dice] ?? 0;

export const totalFor = (dice: number): number => FACES ** dice;

export interface RollFacts {
  slug: string;
  dice: number;
  sum: number;
  /** 이 합이 나오는 경우의 수 */
  ways: number;
  /** 나올 수 있는 모든 경우의 수 */
  total: number;
  /** 백분율 — 소수 둘째 자리 */
  percent: number;
  /** 몇 번에 한 번꼴인가 */
  oneIn: number;
  /** 이 합보다 흔한 합이 몇 개 있나 — 0이면 가장 흔한 합이다 */
  rank: number;
  /** 가장 흔한 합인가 */
  isPeak: boolean;
  /** 이 합 이상이 나올 확률(%) */
  atLeast: number;
  /** 이 합 이하가 나올 확률(%) */
  atMost: number;
  /** 눈의 합 평균 */
  mean: number;
  /** 그림에 쓸 분포 — 합마다의 경우의 수 */
  curve: { sum: number; ways: number }[];
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * 백분율은 소수 둘째 자리까지 — 다만 그렇게 자르면 0이 되는 값은 유효숫자 두 개로 남긴다.
 * 주사위 여섯 개로 합 6이 나올 확률은 0.0021%인데, 둘째 자리에서 자르면 "0%"가 되어
 * 나오지 않는다는 말이 되어 버린다.
 */
const pct = (n: number) => r2(n) || Number(n.toPrecision(2));

export function rollFacts(r: Roll): RollFacts {
  const ways = waysFor(r.dice, r.sum);
  const total = totalFor(r.dice);
  const table = TABLE.get(r.dice)!;
  const peak = Math.max(...table);
  // 이 합보다 경우의 수가 많은 합이 몇 개인가
  const rank = table.filter(w => w > ways).length;
  const atLeast = table.slice(r.sum - r.dice).reduce((n, w) => n + w, 0);
  const atMost = table.slice(0, r.sum - r.dice + 1).reduce((n, w) => n + w, 0);

  return {
    slug: r.slug,
    dice: r.dice,
    sum: r.sum,
    ways,
    total,
    percent: pct((ways / total) * 100),
    oneIn: r2(total / ways),
    rank,
    isPeak: ways === peak,
    atLeast: pct((atLeast / total) * 100),
    atMost: pct((atMost / total) * 100),
    mean: (FACES + 1) / 2 * r.dice,
    curve: table.map((w, i) => ({ sum: r.dice + i, ways: w })),
  };
}

/** 같은 개수에서 가장 흔한 합 — 짝수 개면 하나, 홀수 개면 둘이다 */
export function peakSums(dice: number): number[] {
  const table = TABLE.get(dice)!;
  const peak = Math.max(...table);
  return table.map((w, i) => (w === peak ? dice + i : -1)).filter(s => s > 0);
}

/** 확률이 비슷한 다른 굴림 — 감을 잡는 데 견줄 것이 있어야 한다 */
export function similarOdds(slug: string, limit = 6): Roll[] {
  const me = ROLLS.find(r => r.slug === slug);
  if (!me) return [];
  const mine = waysFor(me.dice, me.sum) / totalFor(me.dice);
  return ROLLS.filter(r => r.slug !== slug)
    .map(r => ({ r, gap: Math.abs(waysFor(r.dice, r.sum) / totalFor(r.dice) - mine) }))
    .sort((a, b) => a.gap - b.gap)
    .slice(0, limit)
    .map(x => x.r)
    .sort((a, b) => a.dice - b.dice || a.sum - b.sum);
}

/** 같은 개수의 이웃한 합 */
export function neighbourSums(slug: string, limit = 6): Roll[] {
  const me = ROLLS.find(r => r.slug === slug);
  if (!me) return [];
  return ROLLS.filter(r => r.dice === me.dice && r.slug !== me.slug)
    .sort((a, b) => Math.abs(a.sum - me.sum) - Math.abs(b.sum - me.sum))
    .slice(0, limit)
    .sort((a, b) => a.sum - b.sum);
}
