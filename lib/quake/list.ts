/**
 * 지진 규모 111칸 — 규모 4.0에서 9.5까지 0.05 단위.
 *
 * 규모는 관측소가 소수 한 자리까지 발표하지만, 재계산으로 0.05가 오르내리는
 * 일이 흔하다. 그래서 0.05 단위로 끊었다 — 4.0에서 9.5까지 111칸이 된다.
 *
 * 규모가 로그라는 것이 이 표의 요지다. 규모 1이 오르면 에너지가 31.6배,
 * 2가 오르면 1000배가 된다. "규모 7이 6의 두 배"라는 어림이 크게 어긋나는
 * 자리다.
 */

/** 가장 작은 규모와 가장 큰 규모, 그리고 눈금 */
export const MIN_MAGNITUDE = 4;
export const MAX_MAGNITUDE = 9.5;
export const STEP = 0.05;

/**
 * 에너지 식의 두 상수 — log10(E) = 1.5M + 4.8, E는 줄(J)이다.
 *
 * 기울기 1.5가 "규모 1당 10^1.5 = 31.6배"를 만든다. 이 값이 흔들리면 표
 * 전체가 흔들리므로 검사가 여러 자리에서 붙든다.
 */
export const ENERGY_SLOPE = 1.5;
export const ENERGY_BASE = 4.8;

/** TNT 1톤이 내는 에너지(J) */
export const JOULE_PER_TNT_TON = 4.184e9;

/** 히로시마에 떨어진 폭탄의 에너지를 TNT로 환산한 톤수 */
export const HIROSHIMA_TNT_TONS = 15000;

export const MAGNITUDES: number[] = Array.from(
  { length: Math.round((MAX_MAGNITUDE - MIN_MAGNITUDE) / STEP) + 1 },
  (_, i) => Math.round((MIN_MAGNITUDE + i * STEP) * 100) / 100,
);

export const slugOf = (m: number): string => m.toFixed(2).replace('.', '-');

export const QUAKE_SLUGS = MAGNITUDES.map(slugOf);

const BY_SLUG = new Map(MAGNITUDES.map(m => [slugOf(m), m]));

export const magnitudeOf = (slug: string): number | undefined => BY_SLUG.get(slug);

export const QUAKE_ICON = '🌋';
