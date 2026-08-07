/**
 * 도시 사이 342칸 — 열아홉 도시의 순서쌍.
 *
 * 적는 자료는 도시마다 위도·경도 두 숫자뿐이다. 거리도, 방위도, 비행시간도,
 * 시차도, 도착 시각도 전부 거기서 나온다(facts.ts).
 *
 * 도시 이름과 시간대는 `lib/cities.ts`가 이미 열 언어로 들고 있어 그대로
 * 가져다 쓴다 — 새로 옮길 낱말이 없다.
 *
 * 좌표는 도심 기준이다. 공항은 도심에서 수십 킬로 떨어져 있으므로 항공사가
 * 적는 공항 사이 거리와는 조금 다르다. 그 차이는 서울–뉴욕처럼 만 킬로가
 * 넘는 구간에서 1%가 안 된다.
 */
export { CITIES, type City } from '../cities.ts';
import { CITIES, findCityIn, type CityLang } from '../cities.ts';
import { localeOfLang, type Lang } from '../i18n/lang.ts';

export interface Coord {
  /** 위도 — 남반구는 음수 */
  lat: number;
  /** 경도 — 서반구는 음수 */
  lon: number;
}

/** 도심 좌표 — 이 섹션이 적는 자료의 전부다 */
export const COORDS: Record<string, Coord> = {
  seoul: { lat: 37.5660, lon: 126.9784 },
  tokyo: { lat: 35.7500, lon: 139.7500 },
  beijing: { lat: 39.9000, lon: 116.4667 },
  hongkong: { lat: 22.2855, lon: 114.1577 },
  singapore: { lat: 1.4167, lon: 103.8333 },
  bangkok: { lat: 13.7333, lon: 100.5000 },
  hanoi: { lat: 21.0245, lon: 105.8412 },
  delhi: { lat: 28.6333, lon: 77.2000 },
  dubai: { lat: 25.0772, lon: 55.3093 },
  moscow: { lat: 55.7500, lon: 37.7000 },
  london: { lat: 51.5083, lon: -0.1833 },
  paris: { lat: 48.8372, lon: 2.3372 },
  berlin: { lat: 52.5333, lon: 13.4167 },
  newyork: { lat: 40.7517, lon: -73.9942 },
  chicago: { lat: 41.8744, lon: -87.6394 },
  losangeles: { lat: 34.0542, lon: -118.2411 },
  saopaulo: { lat: -23.5475, lon: -46.6361 },
  sydney: { lat: -33.8667, lon: 151.2000 },
  auckland: { lat: -36.8667, lon: 174.7667 },
};

/** 좌표를 적어 둔 도시만 쓴다 — cities.ts가 늘어도 이쪽이 먼저다 */
export const FLIGHT_CITIES = CITIES.filter(c => c.id in COORDS);

export const coordOf = (id: string): Coord | undefined => COORDS[id];

const BY_ID = new Map(FLIGHT_CITIES.map(c => [c.id, c]));

export const cityOf = (id: string) => BY_ID.get(id);

export interface Cell {
  /** 떠나는 도시 id */
  from: string;
  /** 닿는 도시 id */
  to: string;
}

export const CELLS: Cell[] = FLIGHT_CITIES.flatMap(a =>
  FLIGHT_CITIES.filter(b => b.id !== a.id).map(b => ({ from: a.id, to: b.id })),
);

export const slugOf = (c: Cell): string => `${c.from}-to-${c.to}`;

export const FLIGHT_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/**
 * 그 언어에서 부르는 도시 이름 — cities.ts가 이미 들고 있는 것을 꺼내 쓴다.
 * AnyLocale10과 CityLang은 같은 문자열을 쓰므로 그대로 넘긴다.
 */
export const nameOf = (lang: Lang, id: string): string =>
  findCityIn(localeOfLang(lang) as CityLang, id)?.city ?? id;

export const FLIGHT_ICON = '✈️';
