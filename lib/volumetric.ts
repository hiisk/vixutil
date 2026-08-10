/**
 * 택배 부피무게.
 *
 * 운송비는 실제 무게가 아니라 **실제 무게와 부피무게 중 큰 값**으로 매긴다.
 * 가볍고 큰 짐이 자리를 더 차지하기 때문이다. 그래서 스티로폼 한 상자가
 * 아령 한 개보다 비쌀 수 있다.
 *
 *   부피무게(kg) = 가로 × 세로 × 높이(cm) ÷ 계수
 *
 * 계수는 업체가 정한다. 항공 특송은 5000, 국내 택배는 6000을 흔히 쓰고,
 * 해상은 훨씬 큰 값을 쓴다. 계수가 클수록 부피무게가 작게 나와 유리하다.
 */

/** 흔히 쓰는 계수 */
export const DIVISORS: { key: string; label: string; value: number }[] = [
  { key: 'air', label: '항공 특송 (5000)', value: 5000 },
  { key: 'domestic', label: '국내 택배 (6000)', value: 6000 },
];

export interface Box {
  /** 가로(cm) */
  width: number;
  /** 세로(cm) */
  depth: number;
  /** 높이(cm) */
  height: number;
  /** 실제 무게(kg) */
  actual: number;
}

export interface Volumetric {
  /** 부피(㎤) */
  volume: number;
  /** 부피무게(kg) */
  volumetric: number;
  /** 요금이 매겨지는 무게(kg) — 둘 중 큰 값 */
  billable: number;
  /** 부피무게로 매겨지는가 */
  byVolume: boolean;
  /** 세 변의 합(cm) — 택배사가 따로 제한하는 값이다 */
  girth: number;
}

export function volumetricWeight({ width, depth, height, actual }: Box, divisor: number): Volumetric {
  const volume = width * depth * height;
  const volumetric = volume / divisor;
  const billable = Math.max(volumetric, actual);
  return {
    volume,
    volumetric,
    billable,
    // 같을 때는 부피 탓이 아니다 — 엄격하게 큰 경우만 참으로 둔다
    byVolume: volumetric > actual,
    girth: width + depth + height,
  };
}

/**
 * 부피무게가 실제 무게를 넘지 않으려면 세 변의 곱이 얼마 아래여야 하는가(㎤).
 *
 * "이 무게로 부치려면 상자를 얼마나 줄여야 하나"에 답한다.
 */
export const maxVolumeFor = (actualKg: number, divisor: number): number => actualKg * divisor;
