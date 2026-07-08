/**
 * 실측 비율(0~1)을 시드로 삼아 콘텐츠 풀에서 항목을 고르는 공통 유틸.
 * 사진 분석 기반 참여형 콘텐츠(관상 테스트, 퍼스널컬러 진단 등)에서 공유한다.
 */

export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

/**
 * 32비트 정수 비트 믹서(splitmix32 계열). 작은 배열에 mod 연산을 적용할 때
 * 하위 비트에만 의존해 서로 다른 입력이 같은 결과로 몰리는 것을 방지한다.
 */
export function mix32(x: number): number {
  x = x >>> 0;
  x ^= x >>> 16;
  x = Math.imul(x, 0x85ebca6b) >>> 0;
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35) >>> 0;
  x ^= x >>> 16;
  return x >>> 0;
}

export function pick<T>(arr: T[], seed: number): T {
  return arr[mix32(seed) % arr.length];
}

export function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

/** 0~1 비율값을 풀 안의 인덱스로 매핑한다 (실측값 기반 선택). */
export function pickByRatio<T>(arr: T[], ratio: number): T {
  const idx = Math.min(arr.length - 1, Math.floor(clamp01(ratio) * arr.length));
  return arr[idx];
}

/** 0~1 비율값을 화면에 보여줄 0~100 정수 퍼센트로 변환한다. */
export function toPercent(ratio: number): number {
  return Math.round(clamp01(ratio) * 100);
}
