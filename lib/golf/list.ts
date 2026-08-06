/**
 * 골프 핸디캡 100칸 — 스코어 열 가지 × 슬로프 레이팅 열 가지.
 *
 * 같은 90타가 코스마다 다른 실력을 뜻한다. 세계 핸디캡 시스템(WHS)은 코스의
 * 난이도를 두 수로 적어 그것을 보정한다 — 코스 레이팅은 스크래치 골퍼가
 * 칠 것으로 보는 타수이고, 슬로프 레이팅은 보기 골퍼가 스크래치 골퍼보다
 * 얼마나 더 고전하는지다.
 *
 * 여기 적는 것은 스코어 사다리와 슬로프 목록, 그리고 이 표가 쓰는 코스
 * 레이팅과 파뿐이다. 나머지는 계산한다(facts.ts).
 */

/** 조정 총타수(Adjusted Gross Score) 열 가지 */
export const SCORES: number[] = [72, 75, 78, 81, 85, 90, 95, 100, 108, 115];

/**
 * 슬로프 레이팅 열 가지.
 *
 * 규정이 두는 범위가 55에서 155이고, 113이 표준 난이도다. 그래서 식에 113이
 * 들어간다 — 슬로프가 113인 코스에서는 보정이 1이 되어 아무것도 바꾸지 않는다.
 */
export const SLOPES: number[] = [55, 75, 95, 105, 113, 120, 130, 140, 148, 155];

/** 표준 난이도의 슬로프 — 식의 분자에 그대로 들어간다 */
export const STANDARD_SLOPE = 113;

/**
 * 이 표가 쓰는 코스 레이팅과 파.
 *
 * 코스마다 다른 값이지만 표를 만들려면 하나를 골라야 한다. 파 72에 코스
 * 레이팅 72.0은 스크래치 골퍼에게 파와 같은 난이도라는 뜻이라, 두 값이
 * 계산에서 서로를 지운다 — 슬로프만의 효과를 보이기에 알맞은 자리다.
 */
export const COURSE_RATING = 72;
export const PAR = 72;

/** 규정이 두는 슬로프의 아래끝과 위끝 */
export const SLOPE_MIN = 55;
export const SLOPE_MAX = 155;

export interface Cell {
  /** 조정 총타수 */
  score: number;
  /** 슬로프 레이팅 */
  slope: number;
}

export const CELLS: Cell[] = SCORES.flatMap(score => SLOPES.map(slope => ({ score, slope })));

export const slugOf = (c: Cell): string => `${c.score}-${c.slope}`;

export const GOLF_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const GOLF_ICON = '⛳';
