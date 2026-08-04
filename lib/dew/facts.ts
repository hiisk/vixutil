/**
 * 기온과 상대습도 하나가 만드는 이슬점 — 마그누스 식으로 계산한다.
 *
 * 상대습도는 "지금 공기가 품을 수 있는 최대치의 몇 퍼센트를 품고 있나"이다.
 * 그 최대치가 기온에 따라 크게 달라지기 때문에, 같은 60%라도 30도의 60%와
 * 10도의 60%는 품은 물의 양이 세 배 넘게 차이 난다.
 *
 * 이슬점은 그 물의 양을 온도 하나로 말한 것이다 — 공기를 어디까지 식히면
 * 품고 있던 수증기가 이슬로 맺히는지. 그래서 이슬점은 습도와 달리 기온이
 * 오르내려도 잘 변하지 않고, 눅눅함을 재는 데 더 곧다.
 *
 *   γ = ln(RH/100) + (b·T)/(c+T)
 *   이슬점 = (c·γ) / (b − γ)        b = 17.62, c = 243.12
 */
import { CELLS, COMFORT, type Cell, slugOf } from './list.ts';

const B = 17.62;
const C = 243.12;

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface DewFacts {
  cell: Cell;
  slug: string;
  /** 이슬점(℃) */
  dew: number;
  /** 기온에서 이슬점까지의 거리 — 좁을수록 눅눅하다 */
  spread: number;
  /** 공기 1세제곱미터가 품은 물의 양(g) */
  absolute: number;
  /** 그 기온에서 품을 수 있는 최대량(g/m³) */
  capacity: number;
  /** 눅눅함 눈금 */
  comfort: string;
  /** 이 공기를 그대로 식힐 때 안개가 끼기 시작하는 온도 = 이슬점 */
  fahrenheit: number;
  drier: Cell | null;
  wetter: Cell | null;
  colder: Cell | null;
  warmer: Cell | null;
}

/** 그 기온에서의 포화 수증기압(hPa) — 마그누스 식 */
export const saturationOf = (t: number): number => round(6.112 * Math.exp((B * t) / (C + t)), 3);

/** 이슬점 — 상대습도를 되돌려 온도로 만든다 */
export const dewOf = (t: number, rh: number): number => {
  const g = Math.log(rh / 100) + (B * t) / (C + t);
  return round((C * g) / (B - g));
};

/**
 * 공기 1세제곱미터가 품은 물의 양(g).
 *
 * 수증기압 e에서 절대습도는 216.7 × e ÷ (273.15 + T)로 나온다.
 */
export const absoluteOf = (t: number, rh: number): number =>
  round((216.7 * (saturationOf(t) * rh / 100)) / (273.15 + t), 2);

/** 이슬점이 어느 눈금에 드는가 */
export const comfortOf = (dew: number): string =>
  COMFORT.find(c => dew < c.below)?.key ?? COMFORT[COMFORT.length - 1].key;

export function dewFacts(c: Cell): DewFacts {
  const dew = dewOf(c.t, c.rh);
  const has = (t: number, rh: number) => CELLS.find(o => o.t === t && o.rh === rh) ?? null;

  return {
    cell: c,
    slug: slugOf(c),
    dew,
    spread: round(c.t - dew),
    absolute: absoluteOf(c.t, c.rh),
    capacity: absoluteOf(c.t, 100),
    comfort: comfortOf(dew),
    fahrenheit: round(dew * 9 / 5 + 32),
    drier: has(c.t, c.rh - 10),
    wetter: has(c.t, c.rh + 10),
    colder: has(c.t - 2, c.rh),
    warmer: has(c.t + 2, c.rh),
  };
}

/** 한 기온의 습도별 줄 */
export const alongHumid = (t: number): Cell[] => CELLS.filter(c => c.t === t);

/** 한 습도의 기온별 줄 */
export const alongTemp = (rh: number): Cell[] => CELLS.filter(c => c.rh === rh);
