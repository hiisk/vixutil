/**
 * 고도 101가지 — 해발 0m부터 5000m까지 50m 간격.
 *
 * 기압도 끓는점도 산소 분압도 그 고도에서 계산된다(facts.ts). 적는 것은 구간의
 * 양 끝과 간격뿐이다.
 *
 * 5000m에서 끊은 것은 그 위가 사람이 오래 머무는 곳이 아니기 때문이다. 백두산
 * 2744m, 후지산 3776m, 몽블랑 4808m이 모두 이 안에 들어온다. 50m 간격인 이유는
 * 도시의 고도가 그 정도로 갈리기 때문이다 — 멕시코시티 2240m, 덴버 1609m.
 */
export const LOWEST = 0;
export const HIGHEST = 5000;
export const STEP = 50;

export const ALTITUDES: number[] = Array.from(
  { length: (HIGHEST - LOWEST) / STEP + 1 },
  (_, i) => LOWEST + i * STEP,
);

export const ALTITUDE_SLUGS = ALTITUDES.map(String);

export const altitudeOf = (slug: string): number | undefined =>
  ALTITUDES.find(a => String(a) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const ALTITUDE_ICON = '⛰️';

/**
 * 사람이 아는 자리들 — 이 표에서 유일하게 적는 자료다.
 *
 * 높이는 나라마다 공표값이 조금씩 다르고 측량이 바뀌기도 한다. 여기 값은
 * 널리 쓰이는 값이고, 표의 고도를 50m 눈금에 맞춰 가장 가까운 칸으로 보낸다.
 */
export const PLACES: { key: string; m: number }[] = [
  { key: 'sea', m: 0 },
  { key: 'seoul', m: 50 },
  { key: 'denver', m: 1600 },
  { key: 'baekdu', m: 2750 },
  { key: 'mexico', m: 2250 },
  { key: 'fuji', m: 3800 },
  { key: 'lhasa', m: 3650 },
  { key: 'blanc', m: 4800 },
];

/** 500m 간격의 눈금 */
export const ROUND_ALTITUDES = ALTITUDES.filter(a => a % 500 === 0);
