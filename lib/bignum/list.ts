/**
 * 큰 수 100칸 — 단위 열 가지 × 배수 열 가지.
 *
 * 세 자릿수 체계가 한자리에 모인다. 영어권은 셋씩 끊어 million·billion으로
 * 가고, 인도는 셋 뒤부터 둘씩 끊어 lakh·crore로 가며, 한국·일본·중국은
 * 넷씩 끊어 만·억·조로 간다. 같은 수를 서로 다른 자리에서 자르기 때문에
 * "1 crore가 몇 억인가"가 매번 헷갈린다.
 *
 * 값은 10의 거듭제곱이므로 자료가 아니라 계산이다. 자릿수가 19까지 올라가
 * 배정도 실수로는 정확하지 않아서, 값은 전부 BigInt로 다룬다.
 */

export type System = 'western' | 'indian' | 'east';

export interface Unit {
  key: string;
  system: System;
  /** 10의 몇 제곱인가 */
  exp: number;
}

/**
 * 단위 열 가지 — 세 체계에서 고르게 뽑았다.
 *
 * 인도 체계의 arab과 영어권의 billion은 둘 다 10^9이라 값이 같다. 같은 수를
 * 다른 이름으로 부르는 자리가 표 안에 함께 있어야 비교가 된다.
 */
export const UNITS: Unit[] = [
  { key: 'man', system: 'east', exp: 4 },
  { key: 'lakh', system: 'indian', exp: 5 },
  { key: 'million', system: 'western', exp: 6 },
  { key: 'crore', system: 'indian', exp: 7 },
  { key: 'eok', system: 'east', exp: 8 },
  { key: 'billion', system: 'western', exp: 9 },
  { key: 'arab', system: 'indian', exp: 9 },
  { key: 'trillion', system: 'western', exp: 12 },
  { key: 'jo', system: 'east', exp: 12 },
  { key: 'gyeong', system: 'east', exp: 16 },
];

/** 배수 열 가지 */
export const FACTORS: number[] = [1, 2, 3, 5, 10, 20, 50, 100, 500, 1000];

/** 영어권은 셋씩 끊는다 */
export const WESTERN_GROUP = 3;

/** 한국·일본·중국은 넷씩 끊는다 */
export const EAST_GROUP = 4;

/** 인도는 맨 뒤 셋을 떼고 그다음부터 둘씩 끊는다 */
export const INDIAN_HEAD = 3;
export const INDIAN_GROUP = 2;

export interface Cell {
  /** UNITS의 key */
  unit: string;
  /** 배수 */
  factor: number;
}

const BY_KEY = new Map(UNITS.map(u => [u.key, u]));

export const unitOf = (key: string): Unit | undefined => BY_KEY.get(key);

export const CELLS: Cell[] = UNITS.flatMap(u => FACTORS.map(factor => ({ unit: u.key, factor })));

export const slugOf = (c: Cell): string => `${c.factor}-${c.unit}`;

export const BIGNUM_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const BIGNUM_ICON = '🔢';
