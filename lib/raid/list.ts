/**
 * RAID 192칸 — 레벨 여덟 × 디스크 2~25개.
 *
 * 적는 자료는 레벨의 정의뿐이다. 그룹마다 패리티를 몇 장 쓰는지, 한 그룹에
 * 최소 몇 장이 필요한지, 미러인지 아닌지. 쓸 수 있는 용량도, 견딜 수 있는
 * 고장 수도, 아예 안 되는 조합도 전부 거기서 나온다(facts.ts).
 *
 * 안 되는 칸이 있다는 것이 이 표의 절반이다. 디스크 세 장으로는 RAID 6을
 * 만들 수 없고, 홀수 장으로는 RAID 10을 만들 수 없다. 일곱 장으로는 RAID 50이
 * 안 되는데, 같은 크기 그룹으로 갈라지지 않기 때문이다 — 7은 소수다.
 */

export interface Level {
  key: string;
  /** 그룹마다 쓰는 패리티 디스크 수 */
  parity: number;
  /** 같은 자료를 그대로 복사해 두는가 */
  mirror: boolean;
  /** 한 그룹에 필요한 최소 디스크 */
  minPerGroup: number;
  /** 최소 그룹 수 — 50·60만 둘 이상이다 */
  minGroups: number;
  /** 미러 한 쌍이 몇 장인가 — 미러 레벨에서만 쓴다 */
  mirrorWidth?: number;
  /** 한 장이 죽어도 나머지 장의 자료는 그대로인가 */
  independent?: boolean;
}

/**
 * 레벨 여덟.
 *
 * RAID 1과 RAID 10을 나눠 적은 것은 미러를 쓰는 방식이 다르기 때문이다.
 * RAID 1은 몇 장이 있든 모두가 같은 자료를 들고 있어 쓸 수 있는 것은 한
 * 장분이고, RAID 10은 두 장씩 짝지어 미러를 만든 뒤 그 짝들을 이어 붙인다.
 */
export const LEVELS: Level[] = [
  { key: 'raid0', parity: 0, mirror: false, minPerGroup: 2, minGroups: 1 },
  { key: 'raid1', parity: 0, mirror: true, minPerGroup: 2, minGroups: 1 },
  { key: 'raid5', parity: 1, mirror: false, minPerGroup: 3, minGroups: 1 },
  { key: 'raid6', parity: 2, mirror: false, minPerGroup: 4, minGroups: 1 },
  { key: 'raid10', parity: 0, mirror: true, minPerGroup: 2, minGroups: 2, mirrorWidth: 2 },
  { key: 'raid50', parity: 1, mirror: false, minPerGroup: 3, minGroups: 2 },
  { key: 'raid60', parity: 2, mirror: false, minPerGroup: 4, minGroups: 2 },
  { key: 'jbod', parity: 0, mirror: false, minPerGroup: 2, minGroups: 1, independent: true },
];

/** 디스크 개수 — 두 장부터 스물다섯 장까지 */
export const MIN_DISKS = 2;
export const MAX_DISKS = 25;
export const DISKS: number[] = Array.from(
  { length: MAX_DISKS - MIN_DISKS + 1 },
  (_, i) => MIN_DISKS + i,
);

/** 낱장에 함께 보여 주는 디스크 크기(TB, 10진) — 겉면에 적힌 숫자다 */
export const SIZES: number[] = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

const BY_KEY = new Map(LEVELS.map(l => [l.key, l]));

export const levelOf = (key: string): Level | undefined => BY_KEY.get(key);

/** 사람이 읽는 표기 — 만국 공통이라 옮기지 않는다 */
export const levelLabel = (l: Level): string =>
  l.key === 'jbod' ? 'JBOD' : `RAID ${l.key.slice(4)}`;

export interface Cell {
  /** LEVELS의 key */
  level: string;
  /** 디스크 개수 */
  disks: number;
}

export const CELLS: Cell[] = LEVELS.flatMap(l => DISKS.map(disks => ({ level: l.key, disks })));

export const slugOf = (c: Cell): string => `${c.level}-${c.disks}`;

export const RAID_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const RAID_ICON = '💽';
