/**
 * 침대와 방 144칸 — 규격 열둘 × 방 폭 열둘.
 *
 * "퀸 사이즈"라는 말이 나라마다 다른 것을 가리킨다. 한국 퀸은 150 × 200cm,
 * 미국 퀸은 152.4 × 203.2cm이고, 킹에 이르면 160과 193으로 33cm나 벌어진다.
 * 이름만 보고 고르면 방에 안 들어가는 일이 생긴다.
 *
 * 그래서 두 나라 규격을 한 목록에 놓고, 방 폭과 짝지어 **양옆에 남는 통로**를
 * 계산한다(facts.ts). 넓이가 아니라 통로가 실제로 부딪히는 문제다.
 */

export type Origin = 'kr' | 'us';

export interface Bed {
  key: string;
  origin: Origin;
  /** 폭(mm) */
  w: number;
  /** 길이(mm) */
  h: number;
}

/**
 * 규격 열둘 — 한국 일곱, 미국 다섯.
 *
 * 한국 값은 업계가 쓰는 관용 치수다. 국가표준(KS)은 폭과 길이의 범위만
 * 정하고 '싱글·퀸' 같은 이름은 쓰지 않아서, 킹 이상은 업체마다 다르다.
 * 미국 값은 인치 규격을 밀리미터로 옮긴 것이다(38인치 = 965mm).
 */
export const BEDS: Bed[] = [
  { key: 'kr-single', origin: 'kr', w: 1000, h: 2000 },
  { key: 'kr-supersingle', origin: 'kr', w: 1100, h: 2000 },
  { key: 'kr-double', origin: 'kr', w: 1400, h: 2000 },
  { key: 'kr-queen', origin: 'kr', w: 1500, h: 2000 },
  { key: 'kr-king', origin: 'kr', w: 1600, h: 2000 },
  { key: 'kr-largeking', origin: 'kr', w: 1700, h: 2000 },
  { key: 'kr-superking', origin: 'kr', w: 1800, h: 2000 },
  { key: 'us-twin', origin: 'us', w: 965, h: 1905 },
  { key: 'us-twinxl', origin: 'us', w: 965, h: 2032 },
  { key: 'us-full', origin: 'us', w: 1372, h: 1905 },
  { key: 'us-queen', origin: 'us', w: 1524, h: 2032 },
  { key: 'us-king', origin: 'us', w: 1930, h: 2032 },
];

/** 방의 짧은 변(mm) 열둘 */
export const ROOMS: number[] = [2400, 2700, 3000, 3300, 3600, 3900, 4200, 4500, 4800, 5100, 5400, 6000];

/** 사람이 옆으로 지나가려면 이만큼은 있어야 한다(mm) */
export const WALKWAY = 600;

/** 1평은 400/121제곱미터 */
export const SQM_PER_PYEONG = 400 / 121;

export interface Cell {
  /** BEDS의 key */
  bed: string;
  /** 방의 짧은 변(mm) */
  room: number;
}

const BY_KEY = new Map(BEDS.map(b => [b.key, b]));

export const bedOf = (key: string): Bed | undefined => BY_KEY.get(key);

export const CELLS: Cell[] = BEDS.flatMap(b => ROOMS.map(room => ({ bed: b.key, room })));

export const slugOf = (c: Cell): string => `${c.bed}-${c.room}`;

export const BED_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const BED_ICON = '🛏️';
