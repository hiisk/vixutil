/**
 * 해상도와 주사율 하나가 만드는 초당 자료량, 그리고 규격이 감당하는지.
 *
 *   초당 자료량 = 가로 × 세로 × 주사율 × 화소당 비트
 *
 * 4K를 60Hz로 8비트 색에 내보내면 3840 × 2160 × 60 × 24 = 11.9Gbps다.
 * HDMI 2.0이 화면에 내주는 몫이 14.4Gbps이므로 지나간다. 같은 4K를 120Hz로
 * 올리면 23.9Gbps라 HDMI 2.0으로는 안 되고 2.1이 필요하다 — "케이블을
 * 샀는데 왜 120Hz가 안 뜨나"의 답이 여기 있다.
 *
 * 한 가지 더 있다. 실제 신호는 보이는 화소만 보내지 않고 줄과 줄 사이의 빈
 * 구간까지 함께 보낸다. 그 몫이 5% 언저리라, 계산한 값이 한계의 95%를 넘으면
 * 통과한다고 잘라 말하지 않고 아슬아슬한 자리로 표시한다.
 */
import {
  BITS_10, BITS_8, BLANKING, CELLS, RATES, RESOLUTIONS, SPECS,
  type Cell, resolutionOf, slugOf, specOf,
} from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 초당 자료량(Gbps) — 보이는 화소만 센 값 */
export const rawGbps = (w: number, h: number, hz: number, bits: number): number =>
  (w * h * hz * bits) / 1e9;

export type Verdict = 'pass' | 'tight' | 'fail';

/** 그 규격으로 지나가는가 */
export function verdictOf(raw: number, video: number): Verdict {
  if (raw > video) return 'fail';
  return raw > video * (1 - BLANKING) ? 'tight' : 'pass';
}

export interface SpecResult {
  key: string;
  video: number;
  verdict: Verdict;
  /** 한계에 견준 쓰임새(%) */
  used: number;
}

export interface Neighbour {
  slug: string;
  res: string;
  hz: number;
}

export interface CableFacts {
  cell: Cell;
  slug: string;
  w: number;
  h: number;
  /** 보이는 화소 수 */
  pixels: number;
  /** 8비트 색일 때 초당 자료량(Gbps) */
  raw8: number;
  /** 10비트 색일 때 */
  raw10: number;
  specs: SpecResult[];
  /** 8비트로 지나가는 가장 낮은 규격 — 없으면 null이고 그때는 압축이 필요하다 */
  lowest: string | null;
  slower: Neighbour | null;
  faster: Neighbour | null;
}

export function cableFacts(c: Cell): CableFacts {
  const r = resolutionOf(c.res);
  if (!r) throw new Error(`해상도가 없다: ${c.res}`);
  const raw8 = rawGbps(r.w, r.h, c.hz, BITS_8);
  const i = RATES.indexOf(c.hz);
  const near = (hz: number): Neighbour => ({ slug: slugOf({ res: c.res, hz }), res: c.res, hz });

  const specs: SpecResult[] = SPECS.map(s => ({
    key: s.key,
    video: s.video,
    verdict: verdictOf(raw8, s.video),
    used: round((raw8 / s.video) * 100, 1),
  }));

  /*
   * 가장 낮은 규격은 목록의 차례가 아니라 대역폭 순으로 고른다 — 목록은
   * 사람이 읽기 좋은 차례로 적혀 있어서 그대로 쓰면 엉뚱한 답이 나온다.
   */
  const passing = SPECS.filter(s => verdictOf(raw8, s.video) !== 'fail').sort((a, b) => a.video - b.video);

  return {
    cell: c,
    slug: slugOf(c),
    w: r.w,
    h: r.h,
    pixels: r.w * r.h,
    raw8: round(raw8),
    raw10: round(rawGbps(r.w, r.h, c.hz, BITS_10)),
    specs,
    lowest: passing.length ? passing[0].key : null,
    slower: i > 0 ? near(RATES[i - 1]) : null,
    faster: i + 1 < RATES.length ? near(RATES[i + 1]) : null,
  };
}

/** 같은 해상도의 한 줄 */
export const atResolution = (res: string): Cell[] => RATES.map(hz => ({ res, hz }));

/** 같은 주사율의 한 줄 */
export const atRate = (hz: number): Cell[] => RESOLUTIONS.map(r => ({ res: r.key, hz }));

/** 그 규격으로 지나가는 칸들 */
export const passingFor = (spec: string): Cell[] => {
  const s = specOf(spec);
  if (!s) return [];
  return CELLS.filter(c => {
    const r = resolutionOf(c.res)!;
    return verdictOf(rawGbps(r.w, r.h, c.hz, BITS_8), s.video) !== 'fail';
  });
};
