/**
 * 케이블 대역폭 100칸 — 해상도 열 가지 × 주사율 열 가지.
 *
 * "케이블을 샀는데 왜 120Hz가 안 뜨나"에 답하는 표다. 화면이 초당 내보내야
 * 하는 자료의 양은 곱셈 하나로 나오고(facts.ts), 그것을 규격이 감당하는지는
 * 공표된 대역폭과 견주면 정해진다.
 */

export interface Resolution {
  key: string;
  w: number;
  h: number;
}

/** 해상도 열 가지 — 흔히 쓰이는 것만 */
export const RESOLUTIONS: Resolution[] = [
  { key: '720p', w: 1280, h: 720 },
  { key: '1080p', w: 1920, h: 1080 },
  { key: 'uw1080', w: 2560, h: 1080 },
  { key: '1440p', w: 2560, h: 1440 },
  { key: 'uw1440', w: 3440, h: 1440 },
  { key: 'uw1600', w: 3840, h: 1600 },
  { key: '4k', w: 3840, h: 2160 },
  { key: '5k2k', w: 5120, h: 2160 },
  { key: '5k', w: 5120, h: 2880 },
  { key: '8k', w: 7680, h: 4320 },
];

/** 주사율 열 가지 */
export const RATES: number[] = [24, 30, 60, 75, 100, 120, 144, 165, 240, 360];

export interface Spec {
  key: string;
  /** 규격이 내건 총 대역폭(Gbps) */
  total: number;
  /**
   * 그 가운데 화면 자료가 쓸 수 있는 몫(Gbps).
   *
   * 링크는 부호화 때문에 총량을 다 쓰지 못한다. 8b/10b는 열 비트에 여덟
   * 비트만 담고, HDMI 2.1의 FRL은 18비트에 16비트, DP 2.1은 132비트에
   * 128비트를 담는다. 그래서 이 값은 총량에 그 비율을 곱한 것이다.
   */
  video: number;
  /** 부호화 비율 — video ÷ total이 이 값과 맞아야 한다 */
  encoding: [number, number];
}

/**
 * 규격 여섯 — 총 대역폭과 화면이 쓸 수 있는 몫.
 *
 * 두 수를 함께 적어 두는 이유는 검사가 서로를 잡게 하려는 것이다. 어느
 * 하나를 잘못 옮겨 적으면 부호화 비율이 어긋난다.
 */
export const SPECS: Spec[] = [
  { key: 'hdmi14', total: 10.2, video: 8.16, encoding: [8, 10] },
  { key: 'dp12', total: 21.6, video: 17.28, encoding: [8, 10] },
  { key: 'hdmi20', total: 18, video: 14.4, encoding: [8, 10] },
  { key: 'dp14', total: 32.4, video: 25.92, encoding: [8, 10] },
  { key: 'hdmi21', total: 48, video: 42.67, encoding: [16, 18] },
  { key: 'dp21', total: 80, video: 77.37, encoding: [128, 132] },
];

/** 8비트 색이면 화소 하나에 24비트다 — 빨강·초록·파랑이 여덟씩 */
export const BITS_8 = 24;

/** 10비트 색이면 30비트 */
export const BITS_10 = 30;

/**
 * 화면 밖 여백(블랭킹)이 차지하는 몫.
 *
 * 실제 신호는 보이는 화소만 보내지 않고 줄과 줄 사이, 화면과 화면 사이에
 * 빈 구간을 함께 보낸다. 요즘 규격(CVT-R2)에서 이 몫이 5% 언저리라, 계산한
 * 값이 한계의 95%를 넘으면 아슬아슬한 자리로 본다.
 */
export const BLANKING = 0.05;

export interface Cell {
  /** RESOLUTIONS의 key */
  res: string;
  /** 주사율(Hz) */
  hz: number;
}

const BY_RES = new Map(RESOLUTIONS.map(r => [r.key, r]));
const BY_SPEC = new Map(SPECS.map(s => [s.key, s]));

export const resolutionOf = (key: string): Resolution | undefined => BY_RES.get(key);
export const specOf = (key: string): Spec | undefined => BY_SPEC.get(key);

export const CELLS: Cell[] = RESOLUTIONS.flatMap(r => RATES.map(hz => ({ res: r.key, hz })));

export const slugOf = (c: Cell): string => `${c.res}-${c.hz}`;

export const CABLE_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const CABLE_ICON = '🔌';
