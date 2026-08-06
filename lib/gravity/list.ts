/**
 * 몸무게 101가지 — 30kg부터 130kg까지 1kg 간격.
 *
 * 같은 몸이 다른 천체에서 몇 킬로그램으로 재지는지는 그 천체의 중력에서
 * 계산된다(facts.ts). 적는 것은 천체별 중력가속도 하나씩뿐이다.
 *
 * 1kg 간격인 이유는 사람들이 자기 몸무게를 그 단위로 알기 때문이다. 30~130은
 * 어린이부터 어른까지를 담는 범위다.
 */
export const LIGHTEST = 20;
export const HEAVIEST = 150;

export const WEIGHTS: number[] = Array.from(
  { length: HEAVIEST - LIGHTEST + 1 },
  (_, i) => LIGHTEST + i,
);

export const GRAVITY_SLUGS = WEIGHTS.map(String);

export const weightOf = (slug: string): number | undefined => WEIGHTS.find(w => String(w) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const GRAVITY_ICON = '🌍';

/**
 * 천체별 표면 중력가속도(m/s²) — 이 표에서 유일하게 적는 자료다.
 *
 * 지구는 9.80665로 정의된 값이고 나머지는 관측값이다. 목성·토성·천왕성·해왕성은
 * 단단한 표면이 없어 구름 꼭대기(1기압 자리) 기준이다.
 */
export const BODIES: { key: string; g: number }[] = [
  { key: 'sun', g: 274 },
  { key: 'mercury', g: 3.7 },
  { key: 'venus', g: 8.87 },
  { key: 'earth', g: 9.80665 },
  { key: 'moon', g: 1.62 },
  { key: 'mars', g: 3.72 },
  { key: 'jupiter', g: 24.79 },
  { key: 'saturn', g: 10.44 },
  { key: 'uranus', g: 8.87 },
  { key: 'neptune', g: 11.15 },
  { key: 'pluto', g: 0.62 },
  { key: 'io', g: 1.796 },
  { key: 'europa', g: 1.314 },
  { key: 'ganymede', g: 1.428 },
  { key: 'callisto', g: 1.235 },
  { key: 'titan', g: 1.352 },
  { key: 'enceladus', g: 0.113 },
  { key: 'triton', g: 0.779 },
  { key: 'ceres', g: 0.27 },
  { key: 'eris', g: 0.82 },
  { key: 'vesta', g: 0.25 },
];

/** 지구 — 모든 비교의 기준이다 */
export const EARTH_G = 9.80665;
