/**
 * 앞니 하나와 뒷니 하나가 만드는 기어.
 *
 * 체인은 늘어나지 않으므로 앞 체인링이 한 바퀴 돌면 뒤 스프라켓은 잇수의
 * 비만큼 돈다. 뒷바퀴는 스프라켓에 물려 있으니 그대로 따라 돈다.
 *
 *   기어비 = 앞니 ÷ 뒷니
 *   발전거리(m) = 바퀴 둘레 × 기어비        ← 페달 한 바퀴에 나아가는 거리
 *   속도(km/h) = 발전거리 × 케이던스 × 60 ÷ 1000
 *
 * 그래서 **기어비 하나만 같으면 앞뒤 조합이 달라도 같은 기어**다. 53×19와
 * 39×14가 비슷하게 느껴지는 까닭이 여기 있다.
 */
import {
  CADENCES, CELLS, CHAINRINGS, COGS, WHEEL_INCH, WHEEL_MM,
  type Cell, slugOf,
} from './list.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface AtCadence {
  /** 페달 회전수(rpm) */
  cadence: number;
  /** 그때의 속도(km/h) */
  speed: number;
}

export interface Neighbour {
  slug: string;
  front: number;
  rear: number;
}

export interface GearFacts {
  cell: Cell;
  slug: string;
  /** 앞니 ÷ 뒷니 */
  ratio: number;
  /** 페달 한 바퀴에 나아가는 거리(m) */
  development: number;
  /** 발전거리(gear inches) — 옛 방식이지만 아직 널리 쓴다 */
  gearInches: number;
  /** 케이던스별 속도 */
  speeds: AtCadence[];
  /** 이 조합과 기어비가 거의 같은 다른 조합들 */
  sameFeel: Neighbour[];
  heavier: Neighbour | null;
  lighter: Neighbour | null;
  biggerRing: Neighbour | null;
  smallerRing: Neighbour | null;
}

export const ratioOf = (front: number, rear: number): number => front / rear;

/** 페달 한 바퀴에 나아가는 거리(m) */
export const developmentOf = (front: number, rear: number): number =>
  (WHEEL_MM * ratioOf(front, rear)) / 1000;

/** 그 발전거리와 케이던스에서의 속도(km/h) */
export const speedOf = (development: number, cadence: number): number =>
  (development * cadence * 60) / 1000;

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

export function gearFacts(c: Cell): GearFacts {
  if (!CHAINRINGS.includes(c.front)) throw new Error(`모르는 체인링: ${c.front}`);
  if (!COGS.includes(c.rear)) throw new Error(`모르는 스프라켓: ${c.rear}`);

  const ratio = ratioOf(c.front, c.rear);
  const development = developmentOf(c.front, c.rear);
  const fi = CHAINRINGS.indexOf(c.front);
  const ri = COGS.indexOf(c.rear);
  const near = (front: number, rear: number): Neighbour => ({ slug: slugOf({ front, rear }), front, rear });

  return {
    cell: c,
    slug: slugOf(c),
    ratio: round(ratio, 3),
    development: round(development, 3),
    gearInches: round(WHEEL_INCH * ratio, 1),
    speeds: CADENCES.map(cadence => ({ cadence, speed: round(speedOf(development, cadence), 1) })),
    /*
     * 기어비가 1% 안에 드는 다른 조합 — "이 기어랑 똑같은 느낌"을 찾는 자리다.
     * 자기 자신은 뺀다.
     */
    sameFeel: CELLS
      .filter(o => slugOf(o) !== slugOf(c) && Math.abs(ratioOf(o.front, o.rear) / ratio - 1) < 0.01)
      .slice(0, 6)
      .map(o => near(o.front, o.rear)),
    // 뒷니가 작을수록 무겁다(더 멀리 나간다)
    heavier: step(COGS, ri, -1) === null ? null : near(c.front, step(COGS, ri, -1) as number),
    lighter: step(COGS, ri, 1) === null ? null : near(c.front, step(COGS, ri, 1) as number),
    biggerRing: step(CHAINRINGS, fi, 1) === null ? null : near(step(CHAINRINGS, fi, 1) as number, c.rear),
    smallerRing: step(CHAINRINGS, fi, -1) === null ? null : near(step(CHAINRINGS, fi, -1) as number, c.rear),
  };
}

/** 같은 체인링의 한 줄 */
export const atFront = (front: number): Cell[] => COGS.map(rear => ({ front, rear }));

/** 같은 스프라켓의 한 줄 */
export const atRear = (rear: number): Cell[] => CELLS.filter(c => c.rear === rear);
