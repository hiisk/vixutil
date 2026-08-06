/**
 * 스코어와 슬로프 하나가 만드는 스코어 디퍼렌셜.
 *
 *   디퍼렌셜 = (조정 총타수 − 코스 레이팅) × 113 ÷ 슬로프 레이팅
 *
 * 슬로프가 113이면 곱하는 값이 1이 되어 아무것도 바꾸지 않는다. 그보다
 * 어려운 코스(슬로프가 큰 코스)에서는 같은 타수가 더 작은 디퍼렌셜이 되고,
 * 쉬운 코스에서는 더 커진다 — 같은 90타라도 코스에 따라 다른 실력이라는
 * 뜻이다.
 *
 * 핸디캡 인덱스는 최근 스무 라운드의 디퍼렌셜 가운데 좋은 여덟 개를 평균한
 * 값이다. 이 표는 한 라운드만 다루므로 인덱스가 아니라 그 한 라운드가 내는
 * 디퍼렌셜을 낸다.
 */
import {
  COURSE_RATING, PAR, SCORES, SLOPES, STANDARD_SLOPE,
  type Cell, slugOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 스코어 디퍼렌셜 */
export const differentialOf = (score: number, rating: number, slope: number): number =>
  ((score - rating) * STANDARD_SLOPE) / slope;

/** 핸디캡 인덱스에서 그 코스의 코스 핸디캡으로 */
export const courseHandicapOf = (index: number, slope: number, rating: number, par: number): number =>
  (index * slope) / STANDARD_SLOPE + (rating - par);

export interface Neighbour {
  slug: string;
  score: number;
  slope: number;
}

export interface GolfFacts {
  cell: Cell;
  slug: string;
  /** 파에 견준 타수 */
  overPar: number;
  /** 스코어 디퍼렌셜 */
  differential: number;
  /** 슬로프 보정 곱셈값 — 113 ÷ 슬로프 */
  factor: number;
  /** 표준 코스(슬로프 113)였다면 얼마였을까 */
  atStandard: number;
  /** 이 디퍼렌셜이 그대로 인덱스라면 그 코스의 코스 핸디캡 */
  courseHandicap: number;
  easier: Neighbour | null;
  harder: Neighbour | null;
}

export function golfFacts(c: Cell): GolfFacts {
  const diff = differentialOf(c.score, COURSE_RATING, c.slope);
  const i = SLOPES.indexOf(c.slope);
  const near = (slope: number): Neighbour => ({ slug: slugOf({ score: c.score, slope }), score: c.score, slope });

  return {
    cell: c,
    slug: slugOf(c),
    overPar: c.score - PAR,
    differential: round(diff),
    factor: round(STANDARD_SLOPE / c.slope, 3),
    atStandard: round(differentialOf(c.score, COURSE_RATING, STANDARD_SLOPE)),
    courseHandicap: round(courseHandicapOf(diff, c.slope, COURSE_RATING, PAR)),
    easier: i > 0 ? near(SLOPES[i - 1]) : null,
    harder: i + 1 < SLOPES.length ? near(SLOPES[i + 1]) : null,
  };
}

/** 같은 스코어의 한 줄 */
export const atScore = (score: number): Cell[] => SLOPES.map(slope => ({ score, slope }));

/** 같은 슬로프의 한 줄 */
export const atSlope = (slope: number): Cell[] => SCORES.map(score => ({ score, slope }));
