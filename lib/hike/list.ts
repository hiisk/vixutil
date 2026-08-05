/**
 * 등산 150칸 — 거리 15가지 × 누적 오름 10가지.
 *
 * 산에서 시간을 가르는 것은 거리가 아니라 오름이다. 같은 10킬로미터도 평지면
 * 두 시간, 1,000미터를 올려야 하면 네 시간이 넘는다. 그래서 두 축을 둔다.
 *
 * 적는 것은 두 목록과 규칙 하나뿐이고, 시간도 평균 경사도 등가 거리도
 * 거기서 계산된다(facts.ts).
 */

/** 걷는 거리(km) — 동네 뒷산부터 종주까지 */
export const DISTANCES: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 25];

/** 누적 오름(m) — 오르내림을 더한 상승분 */
export const ASCENTS: number[] = [0, 100, 200, 300, 500, 700, 900, 1200, 1500, 2000];

/**
 * 네이스미스의 규칙 — 1892년에 나온 어림이 아직도 기준이다.
 *
 * 평지 5킬로미터에 한 시간, 오름 600미터에 한 시간을 더한다. 이 둘만으로
 * "오름 1미터는 평지 몇 미터인가"까지 따라 나온다(facts.ts).
 */
export const FLAT_KMH = 5;
export const ASCENT_MH = 600;

/**
 * 랭뮤어의 하산 보정 — 내리막은 300미터마다 10분.
 *
 * 완만하면 그만큼 빨라지고, 가파르면 오히려 조심하느라 그만큼 느려진다.
 * 가르는 자리는 평균 경사 12도다.
 */
export const DESCENT_M = 300;
export const DESCENT_MIN = 10;
export const STEEP_DEG = 12;

/** 등가 거리로 가르는 코스의 무게 */
export const GRADES: { below: number; key: string }[] = [
  { below: 8, key: 'easy' },
  { below: 15, key: 'moderate' },
  { below: 25, key: 'hard' },
  { below: Infinity, key: 'severe' },
];

export interface Cell {
  /** 거리(km) */
  km: number;
  /** 누적 오름(m) */
  up: number;
}

export const CELLS: Cell[] = DISTANCES.flatMap(km => ASCENTS.map(up => ({ km, up })));

/** 10킬로미터에 500미터 오름 → 10-500 */
export const slugOf = (c: Cell): string => `${c.km}-${c.up}`;

export const HIKE_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const HIKE_ICON = '⛰️';
