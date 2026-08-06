/**
 * 조명 160칸 — 방 넓이 20가지 × 쓰임 8가지.
 *
 * 필요한 밝기는 넓이와 쓰임 둘에서 나온다. 쓰임이 정하는 것은 바닥에 닿아야
 * 하는 밝기(럭스)이고, 거기에 넓이를 곱하면 조명이 내야 할 빛의 양(루멘)이
 * 된다. 와트는 그 다음에 광원의 효율로 나눠서 나오는 값일 뿐이다(facts.ts).
 *
 * 와트로 밝기를 고르던 버릇이 남아 있지만, LED는 같은 와트로 백열의 여덟 배를
 * 낸다. 그래서 이 표는 와트가 아니라 루멘에서 시작한다.
 */

/** 방 넓이(m²) — 작은 화장실부터 넓은 거실까지 */
export const AREAS: number[] = [
  3, 4, 5, 6, 8, 10, 12, 15, 17, 20,
  23, 26, 30, 33, 40, 45, 50, 60, 70, 80,
];

/**
 * 쓰임마다 바닥에 닿아야 하는 밝기(lux).
 *
 * 널리 쓰이는 실내 조도 기준을 따랐다. 같은 방이라도 무엇을 하느냐에 따라
 * 열 배까지 달라진다 — 복도 75, 정밀 작업 1000.
 */
export const USES: { key: string; lux: number }[] = [
  { key: 'storage', lux: 50 },
  { key: 'hall', lux: 75 },
  { key: 'bedroom', lux: 100 },
  { key: 'stairs', lux: 120 },
  { key: 'living', lux: 150 },
  { key: 'bath', lux: 200 },
  { key: 'kitchen', lux: 300 },
  { key: 'office', lux: 400 },
  { key: 'study', lux: 500 },
  { key: 'workshop', lux: 750 },
  { key: 'detail', lux: 1000 },
  { key: 'surgery', lux: 1500 },
];

/**
 * 광원마다의 효율(lm/W) — 같은 밝기를 내는 데 드는 전기가 여기서 갈린다.
 */
export const SOURCES: { key: string; efficacy: number }[] = [
  { key: 'led', efficacy: 100 },
  { key: 'fluorescent', efficacy: 60 },
  { key: 'halogen', efficacy: 20 },
  { key: 'incandescent', efficacy: 13 },
];

/** 흔한 전구 하나의 밝기(lm) — 몇 개가 필요한지 셀 때 쓴다 */
export const BULB_LUMEN = 800;

/** 1평은 3.3058제곱미터 */
export const PYEONG = 3.3058;

export interface Cell {
  /** 방 넓이(m²) */
  area: number;
  /** 쓰임 열쇠 */
  use: string;
}

export const CELLS: Cell[] = AREAS.flatMap(area => USES.map(u => ({ area, use: u.key })));

/** 20m² 서재 → 20-study */
export const slugOf = (c: Cell): string => `${c.area}-${c.use}`;

export const LUMEN_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const useOf = (key: string) => USES.find(u => u.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const LUMEN_ICON = '💡';
