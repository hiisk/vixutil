/**
 * TV 시청거리 100칸 — 화면 크기 스무 가지 × 해상도 다섯 가지.
 *
 * 적는 것은 인치 사다리와 해상도뿐이다. 화면 가로세로, 권장 거리 두 가지,
 * 픽셀이 보이기 시작하는 거리, PPI는 모두 계산한다(facts.ts).
 *
 * 이 표가 답하려는 질문은 "왜 4K가 생각만큼 달라 보이지 않는가"다. 답은
 * 거리에 있다 — 화소를 구분할 수 있는 거리보다 멀리 앉으면 해상도는 사라진다.
 */

/** 화면 대각 길이(인치) */
export const INCHES: number[] = [
  24, 27, 32, 34, 40, 43, 48, 50, 55, 58,
  60, 65, 70, 75, 77, 83, 85, 90, 98, 100,
];

export interface Resolution {
  key: string;
  /** 가로 화소 */
  w: number;
  /** 세로 화소 */
  h: number;
}

/** 해상도 다섯 — 모두 16:9다 */
export const RESOLUTIONS: Resolution[] = [
  { key: 'hd', w: 1280, h: 720 },
  { key: 'fhd', w: 1920, h: 1080 },
  { key: 'qhd', w: 2560, h: 1440 },
  { key: 'uhd', w: 3840, h: 2160 },
  { key: '8k', w: 7680, h: 4320 },
];

/** 화면 비 16:9 */
export const RATIO_W = 16;
export const RATIO_H = 9;

/** 1인치는 2.54센티미터 */
export const CM_PER_INCH = 2.54;

/**
 * 권장 시야각(도) — 화면이 시야에서 차지하는 폭이다.
 *
 * SMPTE는 30도, THX는 최대 40도를 든다. 각이 클수록 더 가까이 앉는다.
 */
export const SMPTE_ANGLE = 30;
export const THX_ANGLE = 40;

/**
 * 사람 눈이 갈라 볼 수 있는 최소 각 — 1분각, 곧 60분의 1도다.
 *
 * 시력 1.0의 정의가 이 각이다. 화소 하나가 이보다 작게 보이면 옆 화소와
 * 붙어 보여서 해상도를 더 올려도 알아채지 못한다.
 */
export const EYE_ARCMIN = 1;

export interface Cell {
  /** 대각 인치 */
  inch: number;
  /** RESOLUTIONS의 key */
  res: string;
}

const BY_KEY = new Map(RESOLUTIONS.map(r => [r.key, r]));

export const resolutionOf = (key: string): Resolution | undefined => BY_KEY.get(key);

export const CELLS: Cell[] = INCHES.flatMap(inch => RESOLUTIONS.map(r => ({ inch, res: r.key })));

export const slugOf = (c: Cell): string => `${c.inch}-${c.res}`;

export const VIEWING_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const VIEWING_ICON = '📺';
