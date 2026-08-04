/**
 * 기온과 풍속 하나가 만드는 체감온도 — 2001년 북미 표준식으로 계산한다.
 *
 *   체감 = 13.12 + 0.6215T − 11.37V^0.16 + 0.3965T·V^0.16
 *
 * T는 섭씨, V는 시속 킬로미터다. 지수 0.16이 붙은 항이 두 개인 것이 요령인데,
 * 바람이 세질수록 열을 뺏는 정도가 빠르게 커지다가 완만해지는 모양을 그 지수가
 * 만든다. 그래서 시속 5km와 20km의 차이는 크고, 40km와 50km의 차이는 작다.
 *
 * 이 식은 바람이 살갗에서 열을 얼마나 빨리 뺏는지를 온도로 바꿔 놓은 것이지,
 * 실제 기온이 내려간다는 뜻이 아니다. 물 한 컵은 체감온도가 아니라 기온대로 언다.
 */
import { CELLS, FROSTBITE, type Cell, slugOf } from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface WindchillFacts {
  cell: Cell;
  slug: string;
  /** 체감온도(℃) */
  felt: number;
  /** 기온보다 몇 도 낮게 느껴지는가 */
  drop: number;
  /** 동상까지 걸리는 시간(분) — 위험 구간이 아니면 null */
  frostbite: number | null;
  /** 같은 기온에서 바람이 없다시피 할 때(시속 5km)의 체감온도 */
  calm: number;
  /** 화씨로 적은 체감온도 */
  fahrenheit: number;
  colder: Cell | null;
  warmer: Cell | null;
  windier: Cell | null;
  calmer: Cell | null;
}

/** 2001년 북미 표준 체감온도 */
export const feltOf = (t: number, v: number): number => {
  const p = v ** 0.16;
  return round(13.12 + 0.6215 * t - 11.37 * p + 0.3965 * t * p);
};

/** 체감온도가 이 값이면 드러난 살갗이 몇 분 만에 어는가 */
export const frostbiteOf = (felt: number): number | null =>
  FROSTBITE.find(f => felt <= f.below)?.minutes ?? null;

export function windchillFacts(c: Cell): WindchillFacts {
  const felt = feltOf(c.t, c.v);
  const has = (t: number, v: number) => CELLS.find(o => o.t === t && o.v === v) ?? null;

  return {
    cell: c,
    slug: slugOf(c),
    felt,
    drop: round(c.t - felt),
    frostbite: frostbiteOf(felt),
    calm: feltOf(c.t, 5),
    fahrenheit: round(felt * 9 / 5 + 32),
    colder: has(c.t - 2, c.v),
    warmer: has(c.t + 2, c.v),
    windier: has(c.t, c.v + 5),
    calmer: has(c.t, c.v - 5),
  };
}

/** 한 기온의 풍속별 줄 */
export const alongWind = (t: number): Cell[] => CELLS.filter(c => c.t === t);

/** 한 풍속의 기온별 줄 */
export const alongTemp = (v: number): Cell[] => CELLS.filter(c => c.v === v);

/** 동상 위험이 있는 칸 */
export const dangerous = (): Cell[] => CELLS.filter(c => frostbiteOf(feltOf(c.t, c.v)) !== null);
