/**
 * 재료와 두께 하나가 만드는 단열 성능.
 *
 * 열저항은 두께를 열전도율로 나눈 값이다. 미터로 고쳐 나누므로 100밀리미터
 * 압출법(0.028)은 0.1 ÷ 0.028 = 3.57이 된다. 두께가 두 배면 열저항도 두 배라
 * 이 값은 곱하기로 다룰 수 있다.
 *
 *   열저항 R = 두께(m) ÷ 열전도율
 *   열관류율 U = 1 ÷ (R + 안쪽 표면 + 바깥 표면)
 *
 * 표면 저항 두 개를 더하는 것은 벽에 아무것도 안 붙여도 공기가 붙드는 몫이
 * 있기 때문이다. 그래서 두께 0에서도 U가 무한이 되지 않는다.
 *
 * 같은 열저항을 콘크리트로 내려면 두께가 몇 미터인지도 함께 낸다 — 열전도율이
 * 230배라 그 숫자가 단열재의 값어치를 가장 잘 보여 준다.
 */
import {
  CELLS, DELTA_T, MATERIALS, R_INSIDE, R_OUTSIDE, TARGETS, THICKNESSES,
  type Cell, materialOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Same {
  key: string;
  /** 같은 열저항을 내는 두께(mm) */
  mm: number;
}

export interface Neighbour {
  slug: string;
  key: string;
  mm: number;
}

export interface InsulFacts {
  cell: Cell;
  slug: string;
  /** 열전도율(W/m·K) */
  lambda: number;
  /** 열저항(m²·K/W) */
  r: number;
  /** 표면까지 더한 열저항 */
  total: number;
  /** 열관류율(W/m²·K) */
  u: number;
  /** 1제곱미터가 20도 차이에서 잃는 열(W) */
  loss: number;
  /** 같은 열저항을 내는 다른 재료의 두께 */
  same: Same[];
  /** 콘크리트로 치면 몇 미터인가 */
  concrete: number;
  /** 만족하는 기준들 */
  meets: string[];
  thicker: Neighbour | null;
  thinner: Neighbour | null;
  better: Neighbour | null;
  worse: Neighbour | null;
}

/** 열저항 — 두께를 미터로 고쳐 열전도율로 나눈다 */
export const rOf = (mm: number, lambda: number): number => mm / 1000 / lambda;

/** 열관류율 — 표면 저항을 더한 뒤 뒤집는다 */
export const uOf = (r: number): number => 1 / (r + R_INSIDE + R_OUTSIDE);

/** 그 열저항을 내려면 이 재료로 몇 밀리미터가 필요한가 */
export const thicknessFor = (r: number, lambda: number): number => r * lambda * 1000;

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

export function insulFacts(c: Cell): InsulFacts {
  const m = materialOf(c.key);
  if (!m) throw new Error(`모르는 재료: ${c.key}`);
  const r = rOf(c.mm, m.lambda);
  const total = r + R_INSIDE + R_OUTSIDE;
  const u = uOf(r);
  const mi = MATERIALS.findIndex(x => x.key === c.key);
  const ti = THICKNESSES.indexOf(c.mm);
  const near = (cell: Cell): Neighbour => ({ slug: slugOf(cell), key: cell.key, mm: cell.mm });

  return {
    cell: c,
    slug: slugOf(c),
    lambda: m.lambda,
    r: round(r),
    total: round(total),
    u: round(u, 3),
    loss: round(u * DELTA_T),
    same: MATERIALS.filter(x => x.key !== c.key).map(x => ({ key: x.key, mm: Math.round(thicknessFor(r, x.lambda)) })),
    concrete: round(thicknessFor(r, MATERIALS[MATERIALS.length - 1].lambda) / 1000),
    meets: TARGETS.filter(t => u <= t.u).map(t => t.key),
    thicker: step(THICKNESSES, ti, 1) === null ? null : near({ key: c.key, mm: step(THICKNESSES, ti, 1) as number }),
    thinner: step(THICKNESSES, ti, -1) === null ? null : near({ key: c.key, mm: step(THICKNESSES, ti, -1) as number }),
    // 목록이 열전도율 차례라, 앞은 더 잘 막고 뒤는 덜 막는다
    better: step(MATERIALS, mi, -1) === null ? null : near({ key: (step(MATERIALS, mi, -1) as { key: string }).key, mm: c.mm }),
    worse: step(MATERIALS, mi, 1) === null ? null : near({ key: (step(MATERIALS, mi, 1) as { key: string }).key, mm: c.mm }),
  };
}

/** 같은 재료의 한 줄 */
export const atMaterial = (key: string): Cell[] => THICKNESSES.map(mm => ({ key, mm }));

/** 같은 두께의 한 줄 */
export const atThickness = (mm: number): Cell[] => CELLS.filter(c => c.mm === mm);
