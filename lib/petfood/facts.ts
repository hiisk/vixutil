/**
 * 체중과 상태 하나가 만드는 하루 열량과 사료 그램.
 *
 * 순서는 어느 표나 같다.
 *
 *   RER(기초대사량) = 70 × 체중^0.75
 *   MER(하루 필요량) = RER × 상태 계수
 *   사료 g = MER ÷ 사료 열량 밀도(kcal/g)
 *
 * 여기서 두 가지를 함께 낸다.
 *
 * 하나, 계수는 범위다. 표마다 숫자가 달라 하나로 적으면 다른 표를 본 사람에게
 * 틀린 값이 된다. 그래서 아래끝과 위끝을 모두 계산해 폭을 보인다.
 *
 * 둘, **선형 어림식과 지수식은 같은 답을 주지 않는다.** 국내 글이 자주 쓰는
 * 30 × 체중 + 70은 작은 몸과 큰 몸에서 지수식보다 높고, 중간에서는 낮다.
 * 두 곡선이 두 번 만나기 때문이다 — 그 교차가 어디인지도 계산으로 낸다.
 */
import {
  DENSITIES, LINEAR_BASE, LINEAR_SLOPE, RER_COEF, RER_POWER, STATES, WEIGHTS,
  type Cell, type Species, slugOf, stateOf,
} from './list.ts';

const round = (x: number, digits = 0) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 기초대사량(kcal/일) — 지수식 */
export const rerOf = (kg: number): number => RER_COEF * kg ** RER_POWER;

/** 국내 글이 자주 쓰는 선형 어림식(kcal/일) */
export const linearOf = (kg: number): number => LINEAR_SLOPE * kg + LINEAR_BASE;

/** 선형식이 지수식보다 높은가 — 두 번 뒤집힌다 */
export const linearHigher = (kg: number): boolean => linearOf(kg) > rerOf(kg);

/** 사료 그램 = 열량 ÷ 밀도 */
export const gramsOf = (kcal: number, density: number): number => kcal / density;

export interface Bowl {
  /** 사료 열량 밀도(kcal/g) */
  density: number;
  lo: number;
  hi: number;
}

export interface Neighbour {
  slug: string;
  state: string;
  kg: number;
}

export interface PetFacts {
  cell: Cell;
  slug: string;
  species: Species;
  /** 기초대사량(kcal/일) */
  rer: number;
  /** 선형 어림식(kcal/일) */
  linear: number;
  /** 선형식이 지수식보다 높으면 양수, 낮으면 음수(%) */
  gap: number;
  /** 상태 계수 */
  lo: number;
  hi: number;
  /** 하루 필요 열량(kcal) 범위 */
  kcalLo: number;
  kcalHi: number;
  /** 밀도별 사료 그램 */
  bowls: Bowl[];
  lighter: Neighbour | null;
  heavier: Neighbour | null;
}

export function petFacts(c: Cell): PetFacts {
  const s = stateOf(c.state);
  if (!s) throw new Error(`상태가 없다: ${c.state}`);
  const rer = rerOf(c.kg);
  const linear = linearOf(c.kg);
  const ladder = WEIGHTS[s.species];
  const i = ladder.indexOf(c.kg);
  const near = (kg: number): Neighbour => ({ slug: slugOf({ state: c.state, kg }), state: c.state, kg });

  return {
    cell: c,
    slug: slugOf(c),
    species: s.species,
    rer: round(rer),
    linear: round(linear),
    gap: round(((linear - rer) / rer) * 100, 1),
    lo: s.lo,
    hi: s.hi,
    kcalLo: round(rer * s.lo),
    kcalHi: round(rer * s.hi),
    bowls: DENSITIES.map(density => ({
      density,
      lo: round(gramsOf(rer * s.lo, density)),
      hi: round(gramsOf(rer * s.hi, density)),
    })),
    lighter: i > 0 ? near(ladder[i - 1]) : null,
    heavier: i + 1 < ladder.length ? near(ladder[i + 1]) : null,
  };
}

/** 같은 상태의 한 줄 */
export const atState = (state: string): Cell[] => {
  const s = stateOf(state);
  return s ? WEIGHTS[s.species].map(kg => ({ state, kg })) : [];
};

/** 한 종의 상태 목록 — 목록을 두 번 적지 않으려고 STATES에서 걸러 낸다 */
export const statesOf = (species: Species): string[] =>
  STATES.filter(s => s.species === species).map(s => s.key);

/** 같은 체중, 같은 종의 다른 상태들 */
export const atWeight = (state: string, kg: number): Cell[] => {
  const s = stateOf(state);
  if (!s) return [];
  return statesOf(s.species).map(other => ({ state: other, kg }));
};
