/**
 * 거리와 오름 하나가 만드는 산행 시간.
 *
 * 네이스미스의 규칙은 두 줄이다 — 평지 5킬로미터에 한 시간, 오름 600미터에
 * 한 시간. 놀라운 것은 이 둘만으로 "오름 1미터가 평지 몇 미터인가"가 따라
 * 나온다는 점이다. 600미터를 오르는 데 드는 시간이 5킬로미터를 걷는 시간과
 * 같으므로, 오름 1미터는 평지 8.33미터인 셈이다.
 *
 * 그래서 이 표는 등가 거리를 함께 낸다. 오름을 평지로 환산해 더하면 코스
 * 하나를 숫자 하나로 견줄 수 있다.
 *
 * 내려오는 쪽은 랭뮤어가 손봤다. 완만한 내리막은 300미터마다 10분을 빼고,
 * 가파르면 조심하느라 오히려 10분을 더한다 — 가르는 자리가 평균 경사 12도다.
 */
import {
  ASCENTS, ASCENT_MH, CELLS, DESCENT_M, DESCENT_MIN, DISTANCES, FLAT_KMH, GRADES, STEEP_DEG,
  type Cell, slugOf,
} from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Neighbour {
  slug: string;
  km: number;
  up: number;
}

export interface HikeFacts {
  cell: Cell;
  slug: string;
  /** 올라가는 데 걸리는 시간(분) */
  upMinutes: number;
  /** 같은 길을 되짚어 내려오는 시간(분) */
  downMinutes: number;
  /** 왕복(분) */
  roundMinutes: number;
  /** 평균 경사(도) */
  slope: number;
  /** 가파른 쪽인가 — 하산 보정의 부호가 여기서 갈린다 */
  steep: boolean;
  /** 오름을 평지로 환산해 더한 거리(km) */
  equivalent: number;
  /** 오름 1미터가 평지 몇 미터인가 */
  ratio: number;
  /** 올라가는 동안의 평균 속도(km/h) */
  speed: number;
  /** 코스의 무게 */
  grade: string;
  longer: Neighbour | null;
  shorter: Neighbour | null;
  higher: Neighbour | null;
  lower: Neighbour | null;
}

/** 오름 1미터가 평지 몇 미터인가 — 규칙 두 줄에서 따라 나온다 */
export const flatPerMetre = (): number => (FLAT_KMH * 1000) / ASCENT_MH;

/** 네이스미스 — 올라가는 시간(분) */
export const upMinutesOf = (km: number, up: number): number =>
  (km / FLAT_KMH) * 60 + (up / ASCENT_MH) * 60;

/** 평균 경사(도) — 오름을 거리로 나눈 각이다 */
export const slopeOf = (km: number, up: number): number =>
  km === 0 ? 0 : (Math.atan(up / (km * 1000)) * 180) / Math.PI;

/**
 * 랭뮤어 — 같은 길을 되짚어 내려오는 시간(분).
 *
 * 평지 걷는 시간에서 완만하면 빼고 가파르면 더한다. 아무리 완만해도 걷는
 * 시간이 반 아래로 내려가지는 않으므로 거기서 멈춘다.
 */
export const downMinutesOf = (km: number, up: number): number => {
  const flat = (km / FLAT_KMH) * 60;
  const fix = (up / DESCENT_M) * DESCENT_MIN;
  return slopeOf(km, up) > STEEP_DEG ? flat + fix : Math.max(flat / 2, flat - fix);
};

export const gradeOf = (equivalent: number): string => GRADES.find(g => equivalent < g.below)!.key;

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

export function hikeFacts(c: Cell): HikeFacts {
  const up = upMinutesOf(c.km, c.up);
  const down = downMinutesOf(c.km, c.up);
  const equivalent = c.km + (c.up * flatPerMetre()) / 1000;
  const di = DISTANCES.indexOf(c.km);
  const ai = ASCENTS.indexOf(c.up);
  const near = (cell: Cell): Neighbour => ({ slug: slugOf(cell), km: cell.km, up: cell.up });

  return {
    cell: c,
    slug: slugOf(c),
    upMinutes: Math.round(up),
    downMinutes: Math.round(down),
    roundMinutes: Math.round(up + down),
    slope: round(slopeOf(c.km, c.up), 1),
    steep: slopeOf(c.km, c.up) > STEEP_DEG,
    equivalent: round(equivalent),
    ratio: round(flatPerMetre()),
    speed: round(c.km / (up / 60)),
    grade: gradeOf(equivalent),
    longer: step(DISTANCES, di, 1) === null ? null : near({ km: step(DISTANCES, di, 1) as number, up: c.up }),
    shorter: step(DISTANCES, di, -1) === null ? null : near({ km: step(DISTANCES, di, -1) as number, up: c.up }),
    higher: step(ASCENTS, ai, 1) === null ? null : near({ km: c.km, up: step(ASCENTS, ai, 1) as number }),
    lower: step(ASCENTS, ai, -1) === null ? null : near({ km: c.km, up: step(ASCENTS, ai, -1) as number }),
  };
}

/** 같은 거리의 한 줄 */
export const atDistance = (km: number): Cell[] => ASCENTS.map(up => ({ km, up }));

/** 같은 오름의 한 줄 */
export const atAscent = (up: number): Cell[] => CELLS.filter(c => c.up === up);
