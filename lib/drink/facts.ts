/**
 * 술 한 잔에 순수 알코올이 몇 그램인가.
 *
 *   순수 알코올(g) = 용량(ml) × 도수(%) ÷ 100 × 0.789
 *
 * 도수는 부피 비율이므로 용량에 곱하면 알코올의 부피가 나오고, 거기에 에탄올
 * 밀도를 곱하면 무게가 된다. 그것이 술을 나라 사이에서 견줄 수 있는 유일한
 * 값이다 — 잔의 크기도 도수도 저마다 다르기 때문이다.
 *
 * 그런데 "한 잔"의 크기가 나라마다 다르다.
 *
 *   영국   순수 알코올 10ml를 1유닛으로 센다 — 부피로 정의한다
 *   미국   순수 알코올 0.6 fl oz를 한 잔으로 센다 — 이것도 부피다
 *   WHO   순수 알코올 10g을 한 잔으로 센다 — 이쪽만 무게다
 *
 * 흔히 인용되는 8g·14g은 앞의 두 부피를 밀도로 무게로 바꾼 값이다. 그래서
 * 이 표는 8이나 14를 적어 두지 않고 부피 정의에서 계산한다 — 검사가 그
 * 값이 실제로 8과 14로 떨어지는지 확인한다.
 */
import {
  ETHANOL_G_PER_ML, KCAL_PER_G, ML_PER_FL_OZ, UK_UNIT_ML, US_FL_OZ, VOLUMES, VOLUME_LANDMARK,
  WHO_STANDARD_G, ABVS, type Cell, slugOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 순수 알코올의 부피(ml) */
export const alcoholMl = (ml: number, abv: number): number => (ml * abv) / 100;

/** 순수 알코올의 무게(g) */
export const alcoholGrams = (ml: number, abv: number): number => alcoholMl(ml, abv) * ETHANOL_G_PER_ML;

/** 미국이 한 잔으로 세는 무게(g) — 부피 정의에서 나온다 */
export const US_STANDARD_G = US_FL_OZ * ML_PER_FL_OZ * ETHANOL_G_PER_ML;

/** 영국이 1유닛으로 세는 무게(g) — 이것도 부피 정의에서 나온다 */
export const UK_UNIT_G = UK_UNIT_ML * ETHANOL_G_PER_ML;

export interface DrinkFacts {
  cell: Cell;
  slug: string;
  abv: number;
  ml: number;
  /** 순수 알코올 부피(ml) */
  pureMl: number;
  /** 순수 알코올 무게(g) */
  grams: number;
  /** 세계보건기구 기준 잔 수 */
  whoDrinks: number;
  /** 미국 기준 잔 수 */
  usDrinks: number;
  /** 영국 기준 유닛 */
  ukUnits: number;
  /** 알코올만의 열량(kcal) */
  kcal: number;
  /** 이 용량에 붙은 이름 */
  landmark: string | null;
  /** 같은 알코올 양이 되는 다른 칸 — 도수를 절반으로 하면 용량은 두 배다 */
  twin: string | null;
  /** 도수 한 눈금 아래·위 */
  weaker: string | null;
  stronger: string | null;
  /** 용량 한 눈금 아래·위 */
  smaller: string | null;
  larger: string | null;
}

export function drinkFacts(c: Cell): DrinkFacts {
  const pureMl = alcoholMl(c.ml, c.abv);
  const grams = alcoholGrams(c.ml, c.abv);

  const at = (abv: number, ml: number) => slugOf({ abv, ml });
  const iA = ABVS.indexOf(c.abv);
  const iV = VOLUMES.indexOf(c.ml);

  // 같은 알코올 양이 나오는 다른 칸을 목록에서 찾는다
  const twin = CELLS_BY_GRAMS.get(round(grams, 4))?.find(s => s !== slugOf(c)) ?? null;

  return {
    cell: c,
    slug: slugOf(c),
    abv: c.abv,
    ml: c.ml,
    pureMl: round(pureMl, 2),
    grams: round(grams, 1),
    whoDrinks: round(grams / WHO_STANDARD_G, 2),
    usDrinks: round(grams / US_STANDARD_G, 2),
    ukUnits: round(pureMl / UK_UNIT_ML, 2),
    kcal: Math.round(grams * KCAL_PER_G),
    landmark: VOLUME_LANDMARK[c.ml] ?? null,
    twin,
    weaker: iA > 0 ? at(ABVS[iA - 1], c.ml) : null,
    stronger: iA + 1 < ABVS.length ? at(ABVS[iA + 1], c.ml) : null,
    smaller: iV > 0 ? at(c.abv, VOLUMES[iV - 1]) : null,
    larger: iV + 1 < VOLUMES.length ? at(c.abv, VOLUMES[iV + 1]) : null,
  };
}

/** 알코올 양이 같은 칸끼리 묶어 둔다 — 도수와 용량이 서로를 되받는다 */
const CELLS_BY_GRAMS: Map<number, string[]> = (() => {
  const m = new Map<number, string[]>();
  for (const abv of ABVS) {
    for (const ml of VOLUMES) {
      const key = round(alcoholGrams(ml, abv), 4);
      const slug = slugOf({ abv, ml });
      const got = m.get(key);
      if (got) got.push(slug);
      else m.set(key, [slug]);
    }
  }
  return m;
})();

/** 같은 도수의 한 줄 */
export const atAbv = (abv: number): Cell[] => VOLUMES.map(ml => ({ abv, ml }));

/** 같은 용량의 한 줄 */
export const atVolume = (ml: number): Cell[] => ABVS.map(abv => ({ abv, ml }));
