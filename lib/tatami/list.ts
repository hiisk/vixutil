/**
 * 다다미 방 넓이 100칸 — 지역 규격 다섯 × 장수 스무 가지.
 *
 * "6첩"이라고 하면 넓이가 정해질 것 같지만 그렇지 않다. 다다미 한 장의
 * 크기가 지역마다 다르고, JIS A 5901도 여러 규격을 나란히 인정한다. 그래서
 * 같은 6첩이라도 교토 쪽 규격으로는 10.94㎡, 단지용 규격으로는 8.67㎡다 —
 * 26% 차이다.
 *
 * 여기 적는 것은 규격 다섯의 치수와 장수 사다리뿐이고, 넓이·평·제곱피트는
 * 전부 계산한다(facts.ts).
 */

export interface Kind {
  key: string;
  /** 짧은 변(mm) */
  short: number;
  /** 긴 변(mm) */
  long: number;
}

/**
 * 규격 다섯 — 짧은 변과 긴 변.
 *
 * 다섯 모두 긴 변이 짧은 변의 정확히 두 배다. 반 장을 두 개 놓으면 한 장이
 * 되어야 방이 짜이기 때문이다 — 검사가 이 성질을 먼저 확인한다.
 */
export const KINDS: Kind[] = [
  { key: 'kyoma', short: 955, long: 1910 },
  { key: 'rokuichi', short: 925, long: 1850 },
  { key: 'chukyo', short: 910, long: 1820 },
  { key: 'edo', short: 880, long: 1760 },
  { key: 'danchi', short: 850, long: 1700 },
];

/**
 * 장수 스무 가지 — 다실 4.5첩부터 큰 방 36첩까지.
 *
 * 4.5가 들어 있는 것은 다실의 기본 크기이기 때문이다. 반 장이 실제로 쓰이는
 * 자리라 정수로만 끊으면 가장 많이 찾는 칸이 빠진다.
 */
export const MATS: number[] = [
  1, 2, 3, 4, 4.5, 5, 6, 7, 8, 9,
  10, 12, 14, 15, 16, 18, 20, 24, 30, 36,
];

/** 1평은 400/121제곱미터다 — 6자 × 6자를 미터로 옮긴 값 */
export const SQM_PER_PYEONG = 400 / 121;

/** 1제곱미터는 10.7639제곱피트 */
export const SQFT_PER_SQM = 10.7639104167;

export interface Cell {
  /** KINDS의 key */
  kind: string;
  /** 다다미 장수 */
  mats: number;
}

const BY_KEY = new Map(KINDS.map(k => [k.key, k]));

export const kindOf = (key: string): Kind | undefined => BY_KEY.get(key);

export const CELLS: Cell[] = KINDS.flatMap(k => MATS.map(mats => ({ kind: k.key, mats })));

export const slugOf = (c: Cell): string => `${c.kind}-${String(c.mats).replace('.', '-')}`;

export const TATAMI_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const TATAMI_ICON = '🏯';
