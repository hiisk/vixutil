/**
 * 공칭 규격과 길이 하나가 만드는 실측 치수와 재적.
 *
 * 깎여 나가는 양은 공칭 치수가 정한다 — 1인치까지는 1/4, 2에서 7인치는
 * 1/2, 8인치부터는 3/4을 뺀다. 그래서 2×4는 1.5 × 3.5인치(38 × 89mm)다.
 *
 * 여기에 함정이 하나 더 있다. **재적(board feet)은 공칭으로 센다.** 실제
 * 나무보다 많이 계산되는데, 얼마나 많이인지는 규격마다 다르다 — 2×4는
 * 실측이 공칭의 66%지만 2×2는 56%밖에 안 된다. 얇을수록 깎이는 몫이
 * 상대적으로 크기 때문이다.
 */
import {
  CUT_MID, CUT_THICK, CUT_THIN, INCH_PER_FOOT, LENGTHS, MM_PER_INCH, SIZES,
  THICK_FROM, THIN_UPTO, type Cell, sizeOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 그 공칭 치수에서 깎여 나가는 양(인치) */
export function cutFor(nominal: number): number {
  if (nominal <= THIN_UPTO) return CUT_THIN;
  return nominal >= THICK_FROM ? CUT_THICK : CUT_MID;
}

/** 공칭에서 실측으로(인치) */
export const actualOf = (nominal: number): number => nominal - cutFor(nominal);

/** 인치를 밀리미터로 */
export const toMm = (inch: number): number => inch * MM_PER_INCH;

/** 재적(board feet) — 공칭 두께 × 공칭 너비 × 길이(피트) ÷ 12 */
export const boardFeet = (t: number, w: number, feet: number): number => (t * w * feet) / INCH_PER_FOOT;

export interface Neighbour {
  slug: string;
  size: string;
  feet: number;
}

export interface LumberFacts {
  cell: Cell;
  slug: string;
  /** 공칭 두께·너비(인치) */
  nomT: number;
  nomW: number;
  /** 실측 두께·너비(인치) */
  actT: number;
  actW: number;
  /** 실측 두께·너비(밀리미터) */
  mmT: number;
  mmW: number;
  /** 실측 단면적(제곱인치) */
  area: number;
  /** 공칭 단면적(제곱인치) */
  nomArea: number;
  /** 실측이 공칭의 몇 %인가 */
  share: number;
  /** 길이(미터) */
  metres: number;
  /** 재적 — 공칭으로 센다 */
  bf: number;
  /** 실제 부피(리터) */
  litres: number;
  shorter: Neighbour | null;
  longer: Neighbour | null;
}

export function lumberFacts(c: Cell): LumberFacts {
  const s = sizeOf(c.size);
  if (!s) throw new Error(`규격이 없다: ${c.size}`);
  const actT = actualOf(s.t);
  const actW = actualOf(s.w);
  const area = actT * actW;
  const nomArea = s.t * s.w;
  const i = LENGTHS.indexOf(c.feet);
  const near = (feet: number): Neighbour => ({ slug: slugOf({ size: c.size, feet }), size: c.size, feet });

  return {
    cell: c,
    slug: slugOf(c),
    nomT: s.t,
    nomW: s.w,
    actT,
    actW,
    mmT: round(toMm(actT), 1),
    mmW: round(toMm(actW), 1),
    area: round(area),
    nomArea,
    share: round((area / nomArea) * 100, 1),
    metres: round((c.feet * INCH_PER_FOOT * MM_PER_INCH) / 1000, 3),
    bf: round(boardFeet(s.t, s.w, c.feet)),
    litres: round((area * c.feet * INCH_PER_FOOT * MM_PER_INCH ** 3) / 1e6, 1),
    shorter: i > 0 ? near(LENGTHS[i - 1]) : null,
    longer: i + 1 < LENGTHS.length ? near(LENGTHS[i + 1]) : null,
  };
}

/** 같은 규격의 한 줄 */
export const atSize = (size: string): Cell[] => LENGTHS.map(feet => ({ size, feet }));

/** 같은 길이의 한 줄 */
export const atLength = (feet: number): Cell[] => SIZES.map(s => ({ size: s.key, feet }));
