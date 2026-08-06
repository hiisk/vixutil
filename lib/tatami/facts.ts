/**
 * 규격과 장수 하나가 만드는 방 넓이.
 *
 *   한 장의 넓이 = 짧은 변 × 긴 변
 *   방 넓이     = 한 장의 넓이 × 장수
 *
 * 계산은 이것뿐이다. 이 표가 보이려는 것은 계산이 아니라 **같은 장수라도
 * 규격이 다르면 넓이가 다르다**는 사실이다. 6첩을 놓고 보면 가장 넓은
 * 규격과 가장 좁은 규격이 2.27㎡, 곧 26%만큼 벌어진다.
 *
 * 평과 제곱피트도 함께 낸다. 1평은 400/121제곱미터이고, 마침 中京間 두
 * 장이 그 값에 거의 맞는다 — 坪이 원래 다다미 두 장에서 나온 단위다.
 */
import {
  KINDS, MATS, SQFT_PER_SQM, SQM_PER_PYEONG,
  type Cell, kindOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 다다미 한 장의 넓이(㎡) */
export const matArea = (short: number, long: number): number => (short * long) / 1e6;

/** 제곱미터를 평으로 */
export const toPyeong = (sqm: number): number => sqm / SQM_PER_PYEONG;

/** 제곱미터를 제곱피트로 */
export const toSqft = (sqm: number): number => sqm * SQFT_PER_SQM;

export interface Same {
  key: string;
  slug: string;
  sqm: number;
  /** 이 칸보다 넓으면 양수(㎡) */
  diff: number;
}

export interface Neighbour {
  slug: string;
  kind: string;
  mats: number;
}

export interface TatamiFacts {
  cell: Cell;
  slug: string;
  short: number;
  long: number;
  /** 한 장의 넓이(㎡) */
  one: number;
  /** 방 넓이(㎡) */
  sqm: number;
  pyeong: number;
  sqft: number;
  /** 같은 장수를 다른 규격으로 깔았을 때 */
  others: Same[];
  /** 가장 넓은 규격과 가장 좁은 규격의 차이(㎡) */
  spread: number;
  /** 그 차이가 가장 좁은 쪽에 견주어 몇 %인가 */
  spreadPct: number;
  fewer: Neighbour | null;
  more: Neighbour | null;
}

export function tatamiFacts(c: Cell): TatamiFacts {
  const k = kindOf(c.kind);
  if (!k) throw new Error(`규격이 없다: ${c.kind}`);
  const one = matArea(k.short, k.long);
  const sqm = one * c.mats;
  const i = MATS.indexOf(c.mats);
  const near = (mats: number): Neighbour => ({ slug: slugOf({ kind: c.kind, mats }), kind: c.kind, mats });

  const all = KINDS.map(x => matArea(x.short, x.long) * c.mats);
  const widest = Math.max(...all);
  const narrowest = Math.min(...all);

  return {
    cell: c,
    slug: slugOf(c),
    short: k.short,
    long: k.long,
    one: round(one, 3),
    sqm: round(sqm),
    pyeong: round(toPyeong(sqm)),
    sqft: round(toSqft(sqm), 1),
    others: KINDS.filter(x => x.key !== k.key).map(x => {
      const other = matArea(x.short, x.long) * c.mats;
      return { key: x.key, slug: slugOf({ kind: x.key, mats: c.mats }), sqm: round(other), diff: round(other - sqm) };
    }),
    spread: round(widest - narrowest),
    spreadPct: round(((widest - narrowest) / narrowest) * 100, 1),
    fewer: i > 0 ? near(MATS[i - 1]) : null,
    more: i + 1 < MATS.length ? near(MATS[i + 1]) : null,
  };
}

/** 같은 규격의 한 줄 */
export const atKind = (kind: string): Cell[] => MATS.map(mats => ({ kind, mats }));

/** 같은 장수의 한 줄 */
export const atMats = (mats: number): Cell[] => KINDS.map(k => ({ kind: k.key, mats }));

/** 그 넓이를 이 규격으로 깔면 몇 장인가 */
export const matsFor = (sqm: number, kind: string): number => {
  const k = kindOf(kind);
  return k ? sqm / matArea(k.short, k.long) : 0;
};
