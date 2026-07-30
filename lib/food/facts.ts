/**
 * 재료 한 장에 들어가는 값 — 밀도 하나에서 전부 계산한다.
 *
 * 컵은 나라마다 다르다. 미국 컵은 240ml, 한국 컵은 200ml, 일본 컵은 200ml,
 * 영국의 옛 컵은 284ml다. 레시피에 "1컵"이라 적혀 있으면 어느 나라 레시피인지
 * 부터 봐야 하는데, 그것이 바로 무게로 재라고 하는 이유다. 그래서 이 페이지는
 * 컵을 하나로 정하지 않고 세 가지를 나란히 보여 준다.
 */
import type { Ingredient } from './ingredients8.ts';
import { INGREDIENTS, ingredient } from './ingredients8.ts';

/** 부피 단위와 밀리리터 */
export const VOLUMES = {
  cupUs: 240,
  cupMetric: 200,
  cupUk: 284,
  tbsp: 15,
  tsp: 5,
} as const;

export type VolumeKey = keyof typeof VOLUMES;

export interface FoodFacts {
  gPerL: number;
  /** 부피 단위마다 몇 g */
  grams: Record<VolumeKey, number>;
  /** 100g은 미국 컵으로 몇 컵인가 */
  cupsPer100g: number;
  /** 100g은 몇 ml인가 */
  mlPer100g: number;
  /** 물보다 무거운가 — 가라앉는지 뜨는지 */
  denserThanWater: boolean;
  /** 흔히 쓰는 분량표 — 1컵·½컵·⅓컵·¼컵 */
  cupTable: { label: string; ratio: number; grams: number }[];
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/**
 * 자리수는 양에 따라 다르게 끊는다.
 *
 * 20g이 넘으면 소수점이 뜻이 없고(밀가루 125.3g), 5g 미만에서는 둘째 자리까지
 * 필요하다 — 이스트 1작은술 3.13g과 3.1g은 반죽에서 다르게 나온다. 한 자리로
 * 뭉개면 큰술이 작은술의 세 배라는 관계도 어긋난다(1.25g이 1.3g이 되면서).
 */
const roundG = (n: number) =>
  n >= 20 ? Math.round(n) : n >= 5 ? Math.round(n * 10) / 10 : Math.round(n * 100) / 100;

export function foodFacts(ing: Ingredient): FoodFacts {
  const perMl = ing.gPerL / 1000;
  const grams = Object.fromEntries(
    (Object.keys(VOLUMES) as VolumeKey[]).map(k => [k, roundG(perMl * VOLUMES[k])]),
  ) as Record<VolumeKey, number>;
  return {
    gPerL: ing.gPerL,
    grams,
    cupsPer100g: round1(100 / (perMl * VOLUMES.cupUs)),
    mlPer100g: Math.round(100 / perMl),
    denserThanWater: ing.gPerL > 1000,
    // 레시피가 실제로 쓰는 분량만 — ⅛컵을 적어 둔 레시피는 거의 없다
    cupTable: [
      { label: '1', ratio: 1, grams: roundG(perMl * VOLUMES.cupUs) },
      { label: '3/4', ratio: 0.75, grams: roundG(perMl * VOLUMES.cupUs * 0.75) },
      { label: '1/2', ratio: 0.5, grams: roundG(perMl * VOLUMES.cupUs * 0.5) },
      { label: '1/3', ratio: 1 / 3, grams: roundG((perMl * VOLUMES.cupUs) / 3) },
      { label: '1/4', ratio: 0.25, grams: roundG(perMl * VOLUMES.cupUs * 0.25) },
    ],
  };
}

/**
 * 밀도가 비슷한 재료들 — 바꿔 넣을 때 부피가 얼마나 달라지는지 견주게 한다.
 *
 * 같은 갈래(가루끼리·기름끼리)를 먼저 준다. 밀가루 대신 설탕을 넣는 사람은 없고,
 * 박력분 대신 중력분을 넣는 사람은 많다.
 */
export function similarIngredients(slug: string, limit = 8): Ingredient[] {
  const me = ingredient(slug);
  if (!me) return [];
  const gap = (x: Ingredient) => Math.abs(x.gPerL - me.gPerL);
  const same = INGREDIENTS.filter(i => i.slug !== slug && i.category === me.category).sort((a, b) => gap(a) - gap(b));
  const other = INGREDIENTS.filter(i => i.slug !== slug && i.category !== me.category).sort((a, b) => gap(a) - gap(b));
  return [...same, ...other].slice(0, limit);
}

/** 그램을 넣으면 부피가 나온다 — 반대 방향 환산 */
export const mlOfGrams = (ing: Ingredient, grams: number): number =>
  Math.round((grams / (ing.gPerL / 1000)) * 10) / 10;
