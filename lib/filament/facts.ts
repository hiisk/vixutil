/**
 * 재료 하나와 스풀 무게 하나가 만드는 길이.
 *
 * 필라멘트는 단면이 원인 긴 줄이므로, 1미터의 부피는 단면적 × 1000mm이고
 * 무게는 거기에 밀도를 곱한 값이다.
 *
 *   1m의 무게(g) = π × (지름/2)² × 밀도      (지름 mm, 밀도 g/cm³)
 *   길이(m) = 스풀 무게 ÷ 1m의 무게
 *
 * 단위가 딱 맞아떨어지는 것은 mm² × 1000mm = cm³ × 1이기 때문이다 —
 * 1cm³ = 1000mm³이고 1m = 1000mm라 서로 지워진다.
 */
import { CELLS, DIAMETERS, MATERIALS, SPOOLS, type Cell, materialOf, slugOf } from './list.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface PerDiameter {
  /** 지름(mm) */
  diameter: number;
  /** 1미터의 무게(g) */
  gramsPerMetre: number;
  /** 이 스풀의 길이(m) */
  metres: number;
  /** 10g으로 뽑을 수 있는 길이(m) — 남은 무게를 길이로 되짚을 때 쓴다 */
  metresPer10g: number;
}

export interface Neighbour {
  slug: string;
  material: string;
  grams: number;
}

export interface FilamentFacts {
  cell: Cell;
  slug: string;
  /** 밀도(g/cm³) */
  density: number;
  /** 스풀의 부피(cm³) — 밀도로 나눈 값이라 지름과 무관하다 */
  volume: number;
  /** 지름별 길이 */
  diameters: PerDiameter[];
  /** 같은 무게의 다른 재료들과 길이 차이(1.75mm 기준) */
  denser: Neighbour | null;
  lighter: Neighbour | null;
  bigger: Neighbour | null;
  smaller: Neighbour | null;
}

/** 1미터의 무게(g) — 지름 mm, 밀도 g/cm³ */
export const gramsPerMetre = (diameter: number, density: number): number =>
  Math.PI * (diameter / 2) ** 2 * density;

/** 스풀 무게(g)를 길이(m)로 */
export const metresOf = (grams: number, diameter: number, density: number): number =>
  grams / gramsPerMetre(diameter, density);

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

/** 밀도 차례로 늘어놓은 재료 — 이웃을 "더 무거운 재료"로 잇는다 */
const BY_DENSITY = [...MATERIALS].sort((a, b) => a.density - b.density);

export function filamentFacts(c: Cell): FilamentFacts {
  const mat = materialOf(c.material);
  if (!mat) throw new Error(`모르는 재료: ${c.material}`);
  if (!SPOOLS.includes(c.grams)) throw new Error(`모르는 스풀: ${c.grams}`);

  const si = SPOOLS.indexOf(c.grams);
  const di = BY_DENSITY.findIndex(m => m.key === c.material);
  const near = (material: string, grams: number): Neighbour => ({ slug: slugOf({ material, grams }), material, grams });

  return {
    cell: c,
    slug: slugOf(c),
    density: mat.density,
    volume: round(c.grams / mat.density),
    diameters: DIAMETERS.map(diameter => {
      const gpm = gramsPerMetre(diameter, mat.density);
      return {
        diameter,
        gramsPerMetre: round(gpm, 3),
        metres: round(metresOf(c.grams, diameter, mat.density), 1),
        metresPer10g: round(10 / gpm, 2),
      };
    }),
    denser: step(BY_DENSITY, di, 1) === null ? null : near((step(BY_DENSITY, di, 1) as { key: string }).key, c.grams),
    lighter: step(BY_DENSITY, di, -1) === null ? null : near((step(BY_DENSITY, di, -1) as { key: string }).key, c.grams),
    bigger: step(SPOOLS, si, 1) === null ? null : near(c.material, step(SPOOLS, si, 1) as number),
    smaller: step(SPOOLS, si, -1) === null ? null : near(c.material, step(SPOOLS, si, -1) as number),
  };
}

/** 같은 재료의 한 줄 */
export const atMaterial = (material: string): Cell[] => SPOOLS.map(grams => ({ material, grams }));

/** 같은 무게의 한 줄 */
export const atSpool = (grams: number): Cell[] => CELLS.filter(c => c.grams === grams);
