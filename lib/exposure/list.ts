/**
 * 노출값 209칸 — 조리개 열하나 × 셔터 열아홉.
 *
 * 적는 자료는 카메라 다이얼에 새겨진 숫자뿐이다. f/1.4, 1/125, 30" 처럼
 * 실제로 눈금에 박혀 있는 값을 그대로 적는다.
 *
 * 그런데 그 숫자들은 반올림한 것이다. f/1.4는 사실 √2 = 1.414이고 f/11은
 * 8√2 = 11.314이며, 1/60초는 사실 1/64초, 1/125초는 1/128초 자리다. 눈금은
 * 두 배씩 가는 등비수열인데 다이얼에는 읽기 좋은 수로 깎아 새긴다.
 *
 * 그래서 이 표는 두 가지 EV를 나란히 낸다 — 눈금 번호를 더한 EV(칸이 뜻하는
 * 값)와, 새겨진 숫자를 그대로 로그에 넣은 EV(계산하면 나오는 값)다. 둘이
 * 어긋나는 폭이 이 표의 물음이다(facts.ts).
 */

/** 조리개 눈금 열하나 — 다이얼에 새겨진 수다 */
export const APERTURES: number[] = [1, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];

export interface Shutter {
  /** 초 = num / den */
  num: number;
  den: number;
}

/**
 * 셔터 눈금 열아홉 — 1/8000초부터 30초까지.
 *
 * 분수로 적는 것은 1/8000을 소수로 적으면 자릿수가 잘리기 때문이다.
 */
export const SHUTTERS: Shutter[] = [
  { num: 1, den: 8000 }, { num: 1, den: 4000 }, { num: 1, den: 2000 }, { num: 1, den: 1000 },
  { num: 1, den: 500 }, { num: 1, den: 250 }, { num: 1, den: 125 }, { num: 1, den: 60 },
  { num: 1, den: 30 }, { num: 1, den: 15 }, { num: 1, den: 8 }, { num: 1, den: 4 },
  { num: 1, den: 2 }, { num: 1, den: 1 }, { num: 2, den: 1 }, { num: 4, den: 1 },
  { num: 8, den: 1 }, { num: 15, den: 1 }, { num: 30, den: 1 },
];

/** 기준 감도 — EV는 늘 이 감도에서 이야기한다 */
export const BASE_ISO = 100;

/** 낱장에 함께 보여 주는 감도 — 눈금 하나가 EV 하나다 */
export const ISOS: number[] = [50, 100, 200, 400, 800, 1600, 3200, 6400];

export const secondsOf = (s: Shutter): number => s.num / s.den;

/** f/5.6 → 'f5-6', f/8 → 'f8' */
export const apertureKey = (n: number): string => `f${String(n).replace('.', '-')}`;

/** 1/125초 → '1-125', 30초 → '30s' */
export const shutterKey = (s: Shutter): string => (s.den === 1 ? `${s.num}s` : `${s.num}-${s.den}`);

/** 사람이 읽는 셔터 표기 — 만국 공통이라 옮기지 않는다 */
export const shutterLabel = (s: Shutter): string => (s.den === 1 ? `${s.num}"` : `1/${s.den}`);

export const apertureLabel = (n: number): string => `f/${n}`;

export interface Cell {
  /** APERTURES의 값 */
  aperture: number;
  /** SHUTTERS에서의 자리 */
  shutter: number;
}

export const CELLS: Cell[] = APERTURES.flatMap((aperture, _i) =>
  SHUTTERS.map((_s, shutter) => ({ aperture, shutter })),
);

export const slugOf = (c: Cell): string => `${apertureKey(c.aperture)}-${shutterKey(SHUTTERS[c.shutter])}`;

export const EXPOSURE_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const EXPOSURE_ICON = '📷';
