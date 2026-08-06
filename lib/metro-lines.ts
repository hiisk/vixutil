/**
 * 지하철 노선 카탈로그 — 도시별 파일을 모은다.
 *
 * 도시 목록은 데이터에서 뽑는다. 손으로 적어 두면 도시를 더할 때 한 곳을
 * 빼먹는다.
 */
import { CITIES } from './metro/cities.ts';
import type { MetroLine } from './metro/types.ts';
import { SEOUL_LINES } from './metro/seoul.ts';
import { WORLD_LINES } from './metro/world.ts';
import { CAPITAL2_LINES } from './metro/capitals2.ts';
import { SECOND_CITY_LINES } from './metro/second-city.ts';
import { WORLD2_LINES } from './metro/world2.ts';
import { WORLD3_LINES } from './metro/world3.ts';
import { relatedFor } from './related-rotate.ts';

export const METRO_LINES: MetroLine[] = [
  ...SEOUL_LINES, ...WORLD_LINES, ...CAPITAL2_LINES, ...SECOND_CITY_LINES, ...WORLD2_LINES,
  ...WORLD3_LINES,
];

export const metroLine = (slug: string): MetroLine | undefined =>
  METRO_LINES.find(l => l.slug === slug);

export const METRO_SLUGS = METRO_LINES.map(l => l.slug);

/** 도시 열쇠 목록 — 데이터에 나온 순서를 지킨다 */
export const METRO_CITIES: string[] = [...new Set(METRO_LINES.map(l => l.city))];

/** 수도의 도시와 그렇지 않은 도시 — 허브에서 두 덩이로 보여준다 */
export const CAPITAL_CITIES: string[] = METRO_CITIES.filter(c => !CITIES[c]?.secondCity);
export const SECOND_CITIES: string[] = METRO_CITIES.filter(c => CITIES[c]?.secondCity);

/** 그 도시의 노선 */
export const linesOfCity = (city: string): MetroLine[] =>
  METRO_LINES.filter(l => l.city === city);

/** 같은 도시를 먼저, 그다음 다른 도시로 채운다 */
export function relatedLines(slug: string, limit = 6): MetroLine[] {
  const me = metroLine(slug);
  if (!me) return [];
  // 갈래 안의 자리부터 돌려 고른다 — 앞 여섯만 뽑으면 목록 뒤쪽은 들어오는 링크가 0이 된다
  return relatedFor(METRO_LINES, me, l => l.city === me.city, limit);
}

/** 노선의 역 수 합계 — 허브 배지에 쓴다 */
export const totalStations = (): number =>
  METRO_LINES.reduce((n, l) => n + l.stations.length, 0);
