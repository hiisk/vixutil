/**
 * 목재 공칭 대 실측 100칸 — 규격 열 가지 × 길이 열 가지.
 *
 * "투바이포"는 2인치도 4인치도 아니다. 통나무에서 켤 때는 그 치수였지만
 * 말리면서 줄고 대패질로 또 깎여 38 × 89mm가 된다. 줄어드는 양에는 규칙이
 * 있어서(facts.ts) 표를 옮겨 적을 것이 없다.
 *
 *   공칭 1인치        → 1/4인치를 뺀다
 *   공칭 2~7인치      → 1/2인치를 뺀다
 *   공칭 8인치 이상   → 3/4인치를 뺀다
 *
 * 여기 적는 것은 공칭 규격 열 가지와 길이 사다리뿐이다.
 */

export interface Size {
  key: string;
  /** 공칭 두께(인치) */
  t: number;
  /** 공칭 너비(인치) */
  w: number;
}

/** 공칭 규격 열 가지 — 북미 목재상에서 부르는 이름 그대로다 */
export const SIZES: Size[] = [
  { key: '1x4', t: 1, w: 4 },
  { key: '1x6', t: 1, w: 6 },
  { key: '2x2', t: 2, w: 2 },
  { key: '2x4', t: 2, w: 4 },
  { key: '2x6', t: 2, w: 6 },
  { key: '2x8', t: 2, w: 8 },
  { key: '2x10', t: 2, w: 10 },
  { key: '2x12', t: 2, w: 12 },
  { key: '4x4', t: 4, w: 4 },
  { key: '6x6', t: 6, w: 6 },
];

/** 길이(피트) 열 가지 */
export const LENGTHS: number[] = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

/** 1인치는 25.4밀리미터 */
export const MM_PER_INCH = 25.4;

/** 1피트는 12인치 */
export const INCH_PER_FOOT = 12;

/**
 * 깎여 나가는 양(인치) — 공칭 두께에 따라 세 갈래다.
 *
 * 8인치를 넘는 두꺼운 재는 3/4인치를 빼는 것이 PS 20의 규정이다. 얇은 재를
 * 더 적게 깎는 것은 남는 살이 적기 때문이다.
 */
export const CUT_THIN = 1 / 4;
export const CUT_MID = 1 / 2;
export const CUT_THICK = 3 / 4;

/** 그 위부터 3/4인치를 빼는 경계 */
export const THICK_FROM = 8;

/** 1인치까지는 1/4인치만 뺀다 */
export const THIN_UPTO = 1;

export interface Cell {
  /** SIZES의 key */
  size: string;
  /** 길이(피트) */
  feet: number;
}

const BY_KEY = new Map(SIZES.map(s => [s.key, s]));

export const sizeOf = (key: string): Size | undefined => BY_KEY.get(key);

export const CELLS: Cell[] = SIZES.flatMap(s => LENGTHS.map(feet => ({ size: s.key, feet })));

export const slugOf = (c: Cell): string => `${c.size}-${c.feet}ft`;

export const LUMBER_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const LUMBER_ICON = '🪵';
