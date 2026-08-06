/**
 * 제곱근 200가지 — 자료를 한 줄도 적지 않는다.
 *
 * 1부터 200까지의 제곱근이다. 소수도, 근호를 간단히 한 꼴(√50 = 5√2)도,
 * 어느 두 정수 사이인지도 전부 그 수에서 계산된다(facts.ts).
 *
 * 200에서 끊은 이유는 그 위가 잘 검색되지 않기 때문이다. 사람들이 손에 들고
 * 오는 수는 대개 두 자리이거나 100·144·169처럼 표에서 본 수다.
 */
export const MAX_N = 230;

export const NUMBERS: number[] = Array.from({ length: MAX_N }, (_, i) => i + 1);

export const SQRT_SLUGS = NUMBERS.map(String);

export const numberOf = (slug: string): number | undefined => NUMBERS.find(n => String(n) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const SQRT_ICON = '📐';
