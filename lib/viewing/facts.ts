/**
 * 화면 크기와 해상도 하나가 만드는 거리들.
 *
 * 대각 길이만 알면 16:9에서 가로세로가 나온다 — 피타고라스다.
 *
 *   가로 = 대각 × 16 / √(16² + 9²)
 *   세로 = 대각 ×  9 / √(16² + 9²)
 *
 * 권장 거리는 화면이 시야에서 차지하는 각으로 정한다. 화면 폭이 각 θ를
 * 채우려면 거리는 (폭/2) ÷ tan(θ/2)다. SMPTE는 30도, THX는 40도를 든다.
 *
 * 마지막 하나가 이 표의 핵심이다. **화소가 보이기 시작하는 거리**는 화소
 * 하나가 시력 1.0의 분해능인 1분각으로 보이는 거리다. 그보다 멀리 앉으면
 * 화소를 갈라 볼 수 없으니 해상도를 올려도 달라지지 않는다.
 */
import {
  CM_PER_INCH, EYE_ARCMIN, INCHES, RATIO_H, RATIO_W, RESOLUTIONS, SMPTE_ANGLE, THX_ANGLE,
  type Cell, resolutionOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

const rad = (deg: number) => (deg * Math.PI) / 180;

/** 대각선에서 가로가 차지하는 몫 — 16:9면 0.8716이다 */
export const widthShare = (): number => RATIO_W / Math.hypot(RATIO_W, RATIO_H);

/** 대각 인치에서 화면 가로(cm) */
export const widthCm = (inch: number): number => inch * widthShare() * CM_PER_INCH;

/** 대각 인치에서 화면 세로(cm) */
export const heightCm = (inch: number): number => (widthCm(inch) * RATIO_H) / RATIO_W;

/** 화면 폭이 시야각 θ를 채우는 거리(cm) */
export const distanceFor = (widthOfScreen: number, angle: number): number =>
  widthOfScreen / 2 / Math.tan(rad(angle) / 2);

/** 화소 하나가 1분각으로 보이는 거리(cm) — 이보다 멀면 화소가 안 보인다 */
export const pixelLimitCm = (widthOfScreen: number, pixels: number): number =>
  widthOfScreen / pixels / Math.tan(rad(EYE_ARCMIN / 60));

export interface Neighbour {
  slug: string;
  inch: number;
  res: string;
}

export interface ViewingFacts {
  cell: Cell;
  slug: string;
  /** 화면 가로(cm) */
  width: number;
  /** 화면 세로(cm) */
  height: number;
  /** SMPTE가 드는 30도를 채우는 거리(cm) */
  smpte: number;
  /** THX가 드는 40도를 채우는 거리(cm) */
  thx: number;
  /** 화소가 보이기 시작하는 거리(cm) */
  limit: number;
  /** 가로 화소 */
  pixels: number;
  /** 세로 화소 */
  lines: number;
  /** 인치당 화소 */
  ppi: number;
  /**
   * 한 단계 아래 해상도의 화소 한계 거리(cm) — 이 해상도가 값을 하는 자리다.
   *
   * 이보다 멀리 앉으면 아래 단계의 화소마저 갈라 보이지 않으므로, 해상도를
   * 올린 것이 눈에 닿지 않는다. 가장 낮은 단계에는 아래가 없어 null이다.
   */
  worth: number | null;
  /** SMPTE가 드는 자리에 앉으면 이 해상도가 값을 하는가 */
  smpteWorth: boolean;
  /** THX가 드는 자리에 앉으면 이 해상도가 값을 하는가 */
  thxWorth: boolean;
  smaller: Neighbour | null;
  bigger: Neighbour | null;
}

export function viewingFacts(c: Cell): ViewingFacts {
  const r = resolutionOf(c.res);
  if (!r) throw new Error(`해상도가 없다: ${c.res}`);
  const w = widthCm(c.inch);
  const limit = pixelLimitCm(w, r.w);
  const smpte = distanceFor(w, SMPTE_ANGLE);
  const thx = distanceFor(w, THX_ANGLE);
  const below = RESOLUTIONS[RESOLUTIONS.findIndex(x => x.key === r.key) - 1];
  const worth = below ? pixelLimitCm(w, below.w) : null;
  const i = INCHES.indexOf(c.inch);
  const near = (inch: number): Neighbour => ({ slug: slugOf({ inch, res: c.res }), inch, res: c.res });

  return {
    cell: c,
    slug: slugOf(c),
    width: round(w),
    height: round(heightCm(c.inch)),
    smpte: round(smpte),
    thx: round(thx),
    limit: round(limit),
    worth: worth === null ? null : round(worth),
    pixels: r.w,
    lines: r.h,
    ppi: round(r.w / (c.inch * widthShare())),
    smpteWorth: worth === null || smpte <= worth,
    thxWorth: worth === null || thx <= worth,
    smaller: i > 0 ? near(INCHES[i - 1]) : null,
    bigger: i + 1 < INCHES.length ? near(INCHES[i + 1]) : null,
  };
}

/** 같은 해상도의 한 줄 */
export const atResolution = (res: string): Cell[] => INCHES.map(inch => ({ inch, res }));

/** 같은 크기의 한 줄 */
export const atInch = (inch: number): Cell[] => RESOLUTIONS.map(r => ({ inch, res: r.key }));
