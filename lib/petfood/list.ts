/**
 * 반려동물 하루 사료량 100칸 — 종·상태 열 가지 × 종별 체중 열 가지.
 *
 * 자료로 적는 것은 상태마다의 계수 범위와 체중 사다리뿐이고, 열량과 그램은
 * 모두 계산한다(facts.ts).
 *
 * 계수를 하나가 아니라 **범위**로 두는 데에는 이유가 있다. 널리 인용되는 표들이
 * 서로 다른 숫자를 쓴다 — 중성화 성견을 어디는 1.6 하나로, 어디는 1.4~1.6으로
 * 적고, 감량은 아예 기준이 갈린다(지금 체중에 0.8을 곱하는 쪽과 목표 체중에
 * 1.0을 곱하는 쪽). 하나를 골라 적으면 그 표를 본 사람에게는 틀린 값이 된다.
 */

/** 종 */
export type Species = 'dog' | 'cat';

export interface State {
  key: string;
  species: Species;
  /** 계수의 아래끝 */
  lo: number;
  /** 계수의 위끝 */
  hi: number;
}

/**
 * 상태별 계수 — 두 표에서 함께 확인한 범위다.
 *
 * 개는 중성화 1.4~1.6, 비중성화 1.6~1.8, 4개월 미만 2.0~3.0, 4개월~1년
 * 1.6~2.0, 비만·감량 0.8~1.0이고, 고양이는 같은 단계가 한 단계씩 낮다.
 * 고양이가 낮은 것은 몸집에 견준 활동량이 개보다 적기 때문이다.
 */
export const STATES: State[] = [
  { key: 'dog-puppy', species: 'dog', lo: 2.0, hi: 3.0 },
  { key: 'dog-junior', species: 'dog', lo: 1.6, hi: 2.0 },
  { key: 'dog-intact', species: 'dog', lo: 1.6, hi: 1.8 },
  { key: 'dog-neutered', species: 'dog', lo: 1.4, hi: 1.6 },
  { key: 'dog-diet', species: 'dog', lo: 0.8, hi: 1.0 },
  { key: 'cat-kitten', species: 'cat', lo: 2.5, hi: 3.0 },
  { key: 'cat-junior', species: 'cat', lo: 1.8, hi: 2.5 },
  { key: 'cat-intact', species: 'cat', lo: 1.2, hi: 1.4 },
  { key: 'cat-neutered', species: 'cat', lo: 1.0, hi: 1.2 },
  { key: 'cat-diet', species: 'cat', lo: 0.8, hi: 1.0 },
];

/** 체중 사다리는 종마다 다르다 — 40kg 고양이 칸을 만들지 않으려고 */
export const WEIGHTS: Record<Species, number[]> = {
  dog: [2, 4, 6, 8, 10, 15, 20, 25, 30, 40],
  cat: [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7],
};

/** 기초대사량의 지수식 — 어느 표든 이 식을 먼저 적는다 */
export const RER_COEF = 70;
export const RER_POWER = 0.75;

/** 국내 글이 자주 쓰는 선형 어림식 — 2~45kg 구간용이다 */
export const LINEAR_SLOPE = 30;
export const LINEAR_BASE = 70;

/** 건사료 열량 밀도(kcal/g) — 포장지 값이 이 언저리다 */
export const DENSITIES = [3.5, 4.0] as const;

export interface Cell {
  /** STATES의 key */
  state: string;
  /** 체중(kg) */
  kg: number;
}

const BY_KEY = new Map(STATES.map(s => [s.key, s]));

export const stateOf = (key: string): State | undefined => BY_KEY.get(key);

export const CELLS: Cell[] = STATES.flatMap(s => WEIGHTS[s.species].map(kg => ({ state: s.key, kg })));

/** dog-neutered와 10kg → dog-neutered-10 */
export const slugOf = (c: Cell): string => `${c.state}-${String(c.kg).replace('.', '-')}`;

export const PETFOOD_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const PETFOOD_ICON = '🐕';
