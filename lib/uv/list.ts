/**
 * 자외선 126칸 — 지수 21가지 × 피부 타입 6가지.
 *
 * 같은 햇빛 아래에서도 화상까지 걸리는 시간은 사람마다 다섯 배 넘게 다르다.
 * 자외선 지수는 내리쬐는 양이고, 피부 타입은 그것을 얼마나 견디는가다. 둘을
 * 나눠야 "몇 분"이 나온다(facts.ts).
 */

/**
 * 자외선 지수 — 1부터 11까지 0.5씩.
 *
 * 지수 1은 홍반에 유효한 자외선 0.025W/m²다. 예보가 소수로 나오는 일이
 * 흔해서 0.5 눈금으로 잡았다.
 */
export const UV_STEP = 0.5;
export const UV_MIN = 1;
export const UV_MAX = 11;

export const INDEXES: number[] = Array.from(
  { length: Math.round((UV_MAX - UV_MIN) / UV_STEP) + 1 },
  (_, i) => Number((UV_MIN + i * UV_STEP).toFixed(1)),
);

/** 지수 1이 뜻하는 홍반 유효 조사량(W/m²) */
export const PER_INDEX = 0.025;

/**
 * 피부 타입과 최소 홍반량(J/m²).
 *
 * 피츠패트릭 분류다. 최소 홍반량은 "그만큼 쬐면 여덟 시간 뒤 발갛게 되는"
 * 자외선의 양이고, 타입이 올라갈수록 커진다 — I형과 VI형이 다섯 배다.
 */
export const SKINS: { key: string; roman: string; med: number }[] = [
  { key: 'i', roman: 'I', med: 200 },
  { key: 'ii', roman: 'II', med: 250 },
  { key: 'iii', roman: 'III', med: 350 },
  { key: 'iv', roman: 'IV', med: 450 },
  { key: 'v', roman: 'V', med: 600 },
  { key: 'vi', roman: 'VI', med: 1000 },
];

/**
 * 세계보건기구가 가른 지수 구간.
 *
 * 예보에서 "보통"과 "높음"을 가르는 자리가 여기다.
 */
export const BANDS: { below: number; key: string }[] = [
  { below: 3, key: 'low' },
  { below: 6, key: 'moderate' },
  { below: 8, key: 'high' },
  { below: 11, key: 'veryHigh' },
  { below: Infinity, key: 'extreme' },
];

/** 흔히 파는 차단 지수 */
export const SPFS: number[] = [15, 30, 50];

/** 밖에 이만큼 있을 작정이면 — 필요한 차단 지수를 되짚는 데 쓴다(분) */
export const OUTING = 120;

export interface Cell {
  /** 자외선 지수 */
  uv: number;
  /** 피부 타입 열쇠 */
  skin: string;
}

export const CELLS: Cell[] = INDEXES.flatMap(uv => SKINS.map(s => ({ uv, skin: s.key })));

/** 지수 3.5·II형 → 3-5-ii */
export const slugOf = (c: Cell): string => `${String(c.uv).replace('.', '-')}-${c.skin}`;

export const UV_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const skinOf = (key: string) => SKINS.find(s => s.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const UV_ICON = '☀️';
