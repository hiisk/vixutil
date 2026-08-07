/**
 * 방 하나와 공기청정기 하나가 만나면 무엇이 정해지는가.
 *
 *   시간당 환기 횟수(ACH) = 청정능력 × 60 ÷ 방 부피
 *
 * 청정능력(CADR)은 "깨끗한 공기를 분당 몇 세제곱미터 내보내는가"다. 그것을
 * 방 부피로 나누면 방 하나를 몇 번 갈아 치우는 셈인지가 나온다. 널리 쓰이는
 * 권장값은 시간당 다섯 번이다.
 *
 * 먼지가 줄어드는 모양은 지수 곡선이다. 깨끗한 공기가 들어오는 만큼 남은
 * 먼지도 비례해서 빠지므로, 절반이 되는 데 걸리는 시간은 처음 농도와 상관없이
 * 같다 — 반감기와 똑같은 계산이다.
 *
 *   절반이 되기까지(분) = 60 × ln2 ÷ ACH
 *
 * 그래서 ACH와 반감시간을 곱하면 늘 41.6분이다. 이 표는 그 성질로 자기 계산을
 * 되짚는다.
 *
 * 다만 이것은 방을 닫아 두고 먼지가 새로 생기지 않는다고 볼 때의 계산이다.
 * 실제로는 창틈으로 들어오고 사람이 움직이면 다시 날린다.
 */
import { AREAS, CADRS, CEILING_M, SQM_PER_PYEONG, TARGET_ACH, type Cell, slugOf, sqmOf } from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 방 부피(㎥) — 천장 높이는 시험 기준을 따른다 */
export const volumeOf = (pyeong: number): number => sqmOf(pyeong) * CEILING_M;

/** 시간당 환기 횟수 */
export const achOf = (cadr: number, pyeong: number): number => (cadr * 60) / volumeOf(pyeong);

/** 남은 먼지가 주어진 비율까지 줄기까지 걸리는 시간(분) */
export const minutesToFall = (ach: number, ratio: number): number => (60 * Math.log(1 / ratio)) / ach;

/** 이 넓이에 권장 환기 횟수를 내려면 얼마짜리가 필요한가(㎥/분) */
export const neededCadr = (pyeong: number): number => (TARGET_ACH * volumeOf(pyeong)) / 60;

/** 이 청정능력으로 권장 환기 횟수를 낼 수 있는 가장 넓은 방(평) */
export const coverablePyeong = (cadr: number): number => (cadr * 60) / (TARGET_ACH * CEILING_M * SQM_PER_PYEONG);

/** 넉넉한지 모자란지 */
export type Grade = 'ample' | 'enough' | 'tight' | 'short';

export function gradeOf(ach: number): Grade {
  if (ach >= TARGET_ACH * 1.5) return 'ample';
  if (ach >= TARGET_ACH) return 'enough';
  if (ach >= 2) return 'tight';
  return 'short';
}

export interface PurifierFacts {
  cell: Cell;
  slug: string;
  /** 방 넓이(평) */
  pyeong: number;
  /** 방 넓이(㎡) */
  sqm: number;
  /** 방 부피(㎥) */
  volume: number;
  /** 청정능력(㎥/분) */
  cadr: number;
  /** 시간당 환기 횟수 */
  ach: number;
  grade: Grade;
  /** 먼지가 절반이 되기까지(분) */
  halfMinutes: number;
  /** 십분의 일이 되기까지(분) */
  tenthMinutes: number;
  /** 이 방에 권장값을 내려면 필요한 청정능력(㎥/분) */
  needed: number;
  /** 모자란 만큼(㎥/분) — 넉넉하면 0 */
  shortfall: number;
  /** 이 청정능력이 권장값으로 덮는 넓이(평) */
  covers: number;
  /** 같은 넓이를 ㎡로 */
  coversSqm: number;
  /** 목록에서 이 방을 채우는 가장 작은 청정능력 */
  pick: number | null;
  /** 청정능력 한 눈금 아래·위 칸 */
  weaker: string | null;
  stronger: string | null;
  /** 넓이 한 눈금 아래·위 칸 */
  smaller: string | null;
  larger: string | null;
}

export function purifierFacts(c: Cell): PurifierFacts {
  const volume = volumeOf(c.area);
  const ach = achOf(c.cadr, c.area);
  const needed = neededCadr(c.area);

  const at = (area: number, cadr: number) => slugOf({ area, cadr });
  const iC = CADRS.indexOf(c.cadr);
  const areas = AREAS;
  const iA = areas.indexOf(c.area);

  return {
    cell: c,
    slug: slugOf(c),
    pyeong: c.area,
    sqm: round(sqmOf(c.area), 1),
    volume: round(volume, 1),
    cadr: c.cadr,
    ach: round(ach),
    grade: gradeOf(ach),
    halfMinutes: round(minutesToFall(ach, 0.5), 1),
    tenthMinutes: round(minutesToFall(ach, 0.1), 1),
    needed: round(needed, 1),
    shortfall: round(Math.max(0, needed - c.cadr), 1),
    covers: round(coverablePyeong(c.cadr), 1),
    coversSqm: round(sqmOf(coverablePyeong(c.cadr)), 1),
    pick: CADRS.find(x => achOf(x, c.area) >= TARGET_ACH) ?? null,
    weaker: iC > 0 ? at(c.area, CADRS[iC - 1]) : null,
    stronger: iC + 1 < CADRS.length ? at(c.area, CADRS[iC + 1]) : null,
    smaller: iA > 0 ? at(areas[iA - 1], c.cadr) : null,
    larger: iA + 1 < areas.length ? at(areas[iA + 1], c.cadr) : null,
  };
}

/** 같은 방의 한 줄 */
export const atArea = (area: number): Cell[] => CADRS.map(cadr => ({ area, cadr }));

/** 같은 청정능력의 한 줄 */
export const atCadr = (cadr: number): Cell[] => AREAS.map(area => ({ area, cadr }));
