/**
 * 정지거리 141가지 — 시속 10km부터 150km까지 1km 간격.
 *
 * 공주거리도 제동거리도 그 속도에서 계산된다(facts.ts). 적는 것은 구간의 양
 * 끝과 간격, 그리고 노면 네 가지의 마찰계수뿐이다.
 *
 * 1km 간격인 이유는 제한속도가 그렇게 걸려 있기 때문이다 — 30·50·60·80·100·110.
 * 그 값들이 표 안에 그대로 있어야 "여기서 얼마"를 바로 볼 수 있다.
 */
export const SLOWEST = 10;
export const FASTEST = 150;

export const SPEEDS: number[] = Array.from({ length: FASTEST - SLOWEST + 1 }, (_, i) => SLOWEST + i);

export const STOP_SLUGS = SPEEDS.map(String);

export const speedOf = (slug: string): number | undefined => SPEEDS.find(s => String(s) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const STOP_ICON = '🚗';

/**
 * 노면과 마찰계수 — 이 표에서 유일하게 적는 자료다.
 *
 * 타이어와 노면 사이의 마찰계수는 실제로는 타이어·온도·마모에 따라 넓게
 * 흩어진다. 여기 값은 교통안전 교재에서 쓰는 대표값이고, 그래서 이 표는
 * 어림이지 측정이 아니다.
 */
export const SURFACES: { key: string; mu: number }[] = [
  { key: 'dry', mu: 0.8 },
  { key: 'wet', mu: 0.5 },
  { key: 'snow', mu: 0.25 },
  { key: 'ice', mu: 0.12 },
];

/** 사람이 반응하는 데 걸리는 시간(초) — 위험을 보고 브레이크를 밟기까지 */
export const REACTION_SEC = 1;

/** 제한속도로 흔한 값들 — 목록의 눈금이 된다 */
export const LIMITS = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
