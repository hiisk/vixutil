/**
 * 두 도시 사이의 거리·방위·비행시간·시차.
 *
 * 지구는 둥그니 좌표를 그냥 빼면 안 된다. 두 점을 잇는 가장 짧은 길은 지구
 * 중심을 지나는 평면이 겉면을 자른 곡선(대권)이고, 그 길이는 하버사인으로
 * 잰다. 지도에서 서울–뉴욕 항로가 북쪽으로 휘어 보이는 것은 항로가 돌아서
 * 가기 때문이 아니라, 평평한 지도가 곡선을 그렇게 그리기 때문이다.
 *
 * 비행시간은 범위로 낸다. 순항속도는 마하 0.85 언저리로 비슷하지만 실제로
 * 걸리는 시간은 바람이 정한다 — 편서풍을 타고 동쪽으로 갈 때와 거슬러 서쪽으로
 * 갈 때가 한두 시간씩 다르다. 하나로 못 박으면 둘 중 하나는 틀린 값이 된다.
 *
 * 시차도 하나가 아니다. 서머타임을 쓰는 도시는 여름과 겨울의 시차가 한 시간
 * 다르다. 그래서 두 값을 다 낸다 — 어느 한쪽만 적으면 반년은 틀린다.
 */
import { COORDS, FLIGHT_CITIES, type Cell, cityOf, coordOf, slugOf } from './list.ts';

/** 지구 평균 반지름(km) */
export const EARTH_RADIUS_KM = 6371;
/** 대권으로 갈 수 있는 가장 먼 거리 — 지구 둘레의 절반이다 */
export const MAX_DISTANCE_KM = Math.PI * EARTH_RADIUS_KM;

/** 순풍을 탔을 때의 대지속도(km/h) */
export const FAST_KMH = 920;
/** 맞바람을 거슬렀을 때의 대지속도(km/h) */
export const SLOW_KMH = 820;
/** 활주·이륙·강하에 얹히는 시간(분) */
export const GROUND_MINUTES = 30;

/** 시차를 재는 기준 시각 — 겨울과 여름을 따로 본다 */
export const WINTER_AT = Date.UTC(2026, 0, 15, 12);
export const SUMMER_AT = Date.UTC(2026, 6, 15, 12);

/** 도착 시각을 보여 줄 출발 시각(현지 24시각) */
export const DEPARTURES = [9, 14, 22];

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

const round = (x: number, digits = 0) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 하버사인 — 두 점을 잇는 대권의 길이(km) */
export function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** 떠날 때 바라보는 방위(도) — 대권은 가면서 방위가 바뀐다 */
export function bearingDeg(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const dLon = rad(b.lon - a.lon);
  const y = Math.sin(dLon) * Math.cos(rad(b.lat));
  const x =
    Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) -
    Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(dLon);
  return (deg(Math.atan2(y, x)) + 360) % 360;
}

/** 열여섯 방위 — 이름은 만국 공통 약어라 옮기지 않는다 */
export const COMPASS = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
] as const;

export const compassOf = (b: number): string => COMPASS[Math.round(b / 22.5) % 16];

/**
 * 그 시간대가 그 시각에 UTC보다 몇 분 앞서는가.
 *
 * 숫자를 적어 두지 않고 Intl에게 묻는다 — 서머타임 규칙은 나라마다 다르고
 * 해마다 바뀌는데, 브라우저와 node가 그 표를 이미 들고 있다.
 */
export function offsetMinutes(zone: string, at: number): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const parts: Record<string, string> = {};
  for (const p of dtf.formatToParts(new Date(at))) parts[p.type] = p.value;
  const asUtc = Date.UTC(
    Number(parts.year), Number(parts.month) - 1, Number(parts.day),
    Number(parts.hour) % 24, Number(parts.minute), Number(parts.second),
  );
  return Math.round((asUtc - at) / 60000);
}

export interface Arrival {
  /** 떠나는 곳의 현지 출발 시각(시) */
  departHour: number;
  /** 닿는 곳의 현지 도착 시각 — 'HH:MM' */
  arriveText: string;
  /** 날짜가 며칠 넘어가는가 — 0이면 같은 날 */
  dayShift: number;
}

export interface FlightFacts {
  cell: Cell;
  slug: string;
  fromId: string;
  toId: string;
  fromZone: string;
  toZone: string;
  /** 대권거리(km) */
  km: number;
  /** 마일 */
  miles: number;
  /** 지구 둘레의 절반에 대한 비율(퍼센트) */
  share: number;
  /** 떠날 때의 방위(도) */
  bearing: number;
  /** 열여섯 방위 약어 */
  compass: string;
  /** 순풍일 때의 소요 시간(분) */
  fastMinutes: number;
  /** 맞바람일 때의 소요 시간(분) */
  slowMinutes: number;
  /** 겨울 기준 시차(분) — 닿는 곳이 앞서면 양수 */
  winterShift: number;
  /** 여름 기준 시차(분) */
  summerShift: number;
  /** 서머타임 때문에 시차가 달라지는가 */
  shiftVaries: boolean;
  /** 출발 시각별 도착 시각 — 빠른 쪽 기준이다 */
  arrivals: Arrival[];
  /** 되돌아가는 칸 */
  reverseSlug: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function flightFacts(c: Cell): FlightFacts {
  const from = cityOf(c.from);
  const to = cityOf(c.to);
  const a = coordOf(c.from);
  const b = coordOf(c.to);
  if (!from || !to || !a || !b) throw new Error(`도시가 없다: ${c.from} → ${c.to}`);

  const km = distanceKm(a, b);
  const bearing = bearingDeg(a, b);
  const fastMinutes = Math.round((km / FAST_KMH) * 60) + GROUND_MINUTES;
  const slowMinutes = Math.round((km / SLOW_KMH) * 60) + GROUND_MINUTES;

  const shiftAt = (at: number) => offsetMinutes(to.zone, at) - offsetMinutes(from.zone, at);
  const winterShift = shiftAt(WINTER_AT);
  const summerShift = shiftAt(SUMMER_AT);

  const arrivals: Arrival[] = DEPARTURES.map(departHour => {
    // 떠나는 곳의 현지 시각에 비행시간을 얹고 시차를 더한다
    const total = departHour * 60 + fastMinutes + winterShift;
    const dayShift = Math.floor(total / (24 * 60));
    const mins = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
    return {
      departHour,
      arriveText: `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`,
      dayShift,
    };
  });

  return {
    cell: c,
    slug: slugOf(c),
    fromId: c.from,
    toId: c.to,
    fromZone: from.zone,
    toZone: to.zone,
    km: round(km),
    miles: round(km / 1.609344),
    share: round((km / MAX_DISTANCE_KM) * 100, 1),
    bearing: round(bearing, 1),
    compass: compassOf(bearing),
    fastMinutes,
    slowMinutes,
    winterShift,
    summerShift,
    shiftVaries: winterShift !== summerShift,
    arrivals,
    reverseSlug: slugOf({ from: c.to, to: c.from }),
  };
}

/** 시간을 '12시간 40분' 꼴로 쪼갠다 — 낱말은 ui가 붙인다 */
export const hoursOf = (minutes: number): [number, number] => [Math.floor(minutes / 60), minutes % 60];

/** 같은 도시에서 떠나는 한 줄 */
export const fromCity = (from: string): Cell[] =>
  FLIGHT_CITIES.filter(c => c.id !== from).map(c => ({ from, to: c.id }));

/** 같은 도시에 닿는 한 줄 */
export const toCity = (to: string): Cell[] =>
  FLIGHT_CITIES.filter(c => c.id !== to).map(c => ({ from: c.id, to }));

/** 좌표를 적어 둔 도시가 몇인지 — 검사가 쓴다 */
export const CITY_COUNT = Object.keys(COORDS).length;
