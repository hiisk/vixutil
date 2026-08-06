/**
 * 규격과 방 폭 하나가 만드는 통로.
 *
 *   남는 폭 = 방의 짧은 변 − 침대 폭
 *   한쪽 통로 = 남는 폭 ÷ 2   (침대를 가운데 놓았을 때)
 *
 * 사람이 옆으로 지나가려면 한쪽에 60cm쯤은 있어야 한다. 그래서 이 표는
 * 넓이가 아니라 **양쪽 통로가 60cm를 넘는지**로 판정한다 — 벽에 붙이면
 * 한쪽만 쓰게 되므로 그 경우도 함께 낸다.
 *
 * 같은 이름의 다른 나라 규격도 나란히 짚는다. 한국 퀸과 미국 퀸은 2.4cm
 * 차이지만, 킹은 160과 193으로 33cm가 벌어진다.
 */
import { BEDS, ROOMS, SQM_PER_PYEONG, WALKWAY, type Cell, bedOf, slugOf } from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 침대를 가운데 놓았을 때 한쪽에 남는 폭(mm) */
export const gapOf = (room: number, bedWidth: number): number => (room - bedWidth) / 2;

/** 벽에 붙였을 때 한쪽에 남는 폭(mm) */
export const wallGapOf = (room: number, bedWidth: number): number => room - bedWidth;

export type Fit = 'both' | 'one' | 'tight' | 'no';

/**
 * 어떻게 들어가는가.
 *
 *   both  양쪽에 통로가 나온다
 *   one   벽에 붙이면 한쪽 통로가 나온다
 *   tight 들어가기는 하나 통로가 모자란다
 *   no    폭이 모자라 아예 안 들어간다
 */
export function fitOf(room: number, bedWidth: number): Fit {
  if (bedWidth > room) return 'no';
  if (gapOf(room, bedWidth) >= WALKWAY) return 'both';
  return wallGapOf(room, bedWidth) >= WALKWAY ? 'one' : 'tight';
}

export interface Same {
  key: string;
  slug: string;
  /** 폭 차이(mm) — 양수면 그쪽이 넓다 */
  diff: number;
}

export interface Neighbour {
  slug: string;
  bed: string;
  room: number;
}

export interface BedFacts {
  cell: Cell;
  slug: string;
  /** 침대 폭·길이(mm) */
  width: number;
  length: number;
  /** 넓이(㎡) */
  area: number;
  /** 두 사람이 누울 때 1인당 폭(mm) */
  perPerson: number;
  /** 가운데 놓았을 때 한쪽 통로(mm) */
  gap: number;
  /** 벽에 붙였을 때 통로(mm) */
  wallGap: number;
  fit: Fit;
  /** 방을 정사각형으로 볼 때의 평수 — 어림잡이용이다 */
  roomPyeong: number;
  /** 같은 이름의 다른 나라 규격 */
  twin: Same | null;
  smaller: Neighbour | null;
  larger: Neighbour | null;
}

/** 이름이 짝을 이루는 규격 — 한국과 미국의 같은 이름 */
const TWINS: Record<string, string> = {
  'kr-queen': 'us-queen',
  'us-queen': 'kr-queen',
  'kr-king': 'us-king',
  'us-king': 'kr-king',
  'kr-single': 'us-twin',
  'us-twin': 'kr-single',
  'kr-double': 'us-full',
  'us-full': 'kr-double',
};

export function bedFacts(c: Cell): BedFacts {
  const b = bedOf(c.bed);
  if (!b) throw new Error(`규격이 없다: ${c.bed}`);
  const i = ROOMS.indexOf(c.room);
  const near = (room: number): Neighbour => ({ slug: slugOf({ bed: c.bed, room }), bed: c.bed, room });
  const twinKey = TWINS[c.bed];
  const twinBed = twinKey ? bedOf(twinKey) : undefined;

  return {
    cell: c,
    slug: slugOf(c),
    width: b.w,
    length: b.h,
    area: round((b.w * b.h) / 1e6, 2),
    perPerson: round(b.w / 2, 0),
    gap: round(gapOf(c.room, b.w), 0),
    wallGap: round(wallGapOf(c.room, b.w), 0),
    fit: fitOf(c.room, b.w),
    roomPyeong: round((c.room / 1000) ** 2 / SQM_PER_PYEONG, 1),
    twin: twinBed ? { key: twinKey, slug: slugOf({ bed: twinKey, room: c.room }), diff: twinBed.w - b.w } : null,
    smaller: i > 0 ? near(ROOMS[i - 1]) : null,
    larger: i + 1 < ROOMS.length ? near(ROOMS[i + 1]) : null,
  };
}

/** 같은 규격의 한 줄 */
export const atBed = (bed: string): Cell[] => ROOMS.map(room => ({ bed, room }));

/** 같은 방 폭의 한 줄 */
export const atRoom = (room: number): Cell[] => BEDS.map(b => ({ bed: b.key, room }));
