/**
 * 도시의 시간 정보 — IANA 시간대 이름 하나에서 계산한다.
 *
 * 오프셋을 데이터에 적지 않는 이유는 서머타임이다. 뉴욕은 겨울에 UTC−5,
 * 여름에 −4이고, 나라가 정책을 바꾸면(터키 2016, 브라질 2019) 적어 둔 값은
 * 조용히 틀린다. Intl API에게 물으면 늘 그 시점의 답이 나온다.
 *
 * 다만 "지금 몇 시"는 서버에서 계산하면 안 된다 — 빌드 시각이 굳어 버리고
 * 브라우저와 어긋나 하이드레이션이 깨진다. 그래서 정적 페이지에는 시간대의
 * 성질(표준 오프셋·서머타임 여부·시차)만 담고, 현재 시각은 브라우저가 그린다.
 */
import { TIME_CITIES, type TimeCity } from './cities8.ts';

/** 그 시간대의 UTC 오프셋(분) — 기준 시각에서의 값 */
export function offsetMinutes(zone: string, at: Date): number {
  // Intl로 그 시간대의 벽시계 값을 읽고 UTC와의 차이를 잰다.
  // getTimezoneOffset류는 실행 환경의 시간대에 물들어 서버와 브라우저가 갈린다.
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: zone, hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
  const p: Record<string, string> = {};
  for (const part of f.formatToParts(at)) if (part.type !== 'literal') p[part.type] = part.value;
  const asUtc = Date.UTC(
    Number(p.year), Number(p.month) - 1, Number(p.day),
    Number(p.hour) % 24, Number(p.minute), Number(p.second),
  );
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** "+09:00" 꼴로 */
export function offsetLabel(minutes: number): string {
  const sign = minutes < 0 ? '-' : '+';
  const abs = Math.abs(minutes);
  return `${sign}${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`;
}

/** 1월과 7월의 오프셋이 다르면 서머타임을 쓴다 */
export function usesDst(zone: string, year = 2026): boolean {
  const jan = offsetMinutes(zone, new Date(Date.UTC(year, 0, 15)));
  const jul = offsetMinutes(zone, new Date(Date.UTC(year, 6, 15)));
  return jan !== jul;
}

export interface TimeFacts {
  zone: string;
  /** 겨울(1월)의 오프셋 — 표준시 */
  standardMinutes: number;
  /** 여름(7월)의 오프셋 — 서머타임을 쓰면 표준시와 다르다 */
  summerMinutes: number;
  standardLabel: string;
  summerLabel: string;
  dst: boolean;
  /** 서머타임으로 몇 분 앞당기는가 */
  dstShift: number;
}

/**
 * 시간대의 성질. 기준 연도를 못 박는 이유는 정적 페이지이기 때문이다 —
 * "지금"으로 계산하면 빌드한 날에 따라 문서가 달라진다.
 */
export function timeFacts(city: TimeCity, year = 2026): TimeFacts {
  const standardMinutes = offsetMinutes(city.zone, new Date(Date.UTC(year, 0, 15)));
  const summerMinutes = offsetMinutes(city.zone, new Date(Date.UTC(year, 6, 15)));
  return {
    zone: city.zone,
    standardMinutes,
    summerMinutes,
    standardLabel: offsetLabel(standardMinutes),
    summerLabel: offsetLabel(summerMinutes),
    dst: standardMinutes !== summerMinutes,
    dstShift: Math.abs(summerMinutes - standardMinutes),
  };
}

/** 두 도시의 시차(분) — 같은 순간을 두 벽시계로 읽은 차이 */
export function gapMinutes(a: TimeCity, b: TimeCity, at = new Date(Date.UTC(2026, 0, 15))): number {
  return offsetMinutes(a.zone, at) - offsetMinutes(b.zone, at);
}

/**
 * 시차를 "+3:15" 꼴로 적는다.
 *
 * 소수로 적으면 45분·30분 시간대가 뭉개진다 — 인도는 +5:30, 네팔은 +5:45,
 * 애들레이드는 +9:30이라 "3.3시간"으로는 몇 분인지 알 수 없다. 부호 있는 시:분은
 * 어느 언어에서나 같게 읽히므로 번역도 필요 없다.
 */
export function gapLabel(minutes: number): string {
  const sign = minutes < 0 ? '\u2212' : '+';
  const abs = Math.abs(minutes);
  return `${sign}${Math.floor(abs / 60)}:${String(abs % 60).padStart(2, '0')}`;
}

/**
 * 시차를 견줄 기준 도시들 — 사람들이 실제로 묻는 조합이다.
 * 자기 자신은 뺀다.
 */
export const ANCHOR_SLUGS = ['seoul', 'tokyo', 'new-york', 'london', 'los-angeles', 'paris'];

export const anchorsFor = (city: TimeCity): TimeCity[] =>
  ANCHOR_SLUGS.filter(s => s !== city.slug)
    .map(s => TIME_CITIES.find(c => c.slug === s))
    .filter((c): c is TimeCity => Boolean(c));

/** 같은 시간대의 다른 도시 — 시차가 0인 곳부터 준다 */
export function sameZoneCities(city: TimeCity, limit = 8): TimeCity[] {
  const same = TIME_CITIES.filter(c => c.slug !== city.slug && c.zone === city.zone);
  const near = TIME_CITIES.filter(
    c => c.slug !== city.slug && c.zone !== city.zone && Math.abs(gapMinutes(c, city)) <= 60,
  );
  return [...same, ...near].slice(0, limit);
}

/**
 * 문구에 넣을 도시의 사실 — 이름과 시차까지 붙인다.
 *
 * 시차는 기준 도시들과의 차이를 그 언어 이름으로 적어 둔다. FAQ와 메타 설명이
 * 116곳 × 여덟 언어라 문장 틀에서 바로 쓸 수 있는 꼴로 넘겨야 한다.
 */
import type { Lang8 } from '../i18n/lang.ts';
import { timeCountry } from './cities8.ts';
import type { CityFacts } from './ui.ts';

export function cityFacts(city: TimeCity, lang: Lang8, year = 2026): CityFacts {
  const base = timeFacts(city, year);
  const at = new Date(Date.UTC(year, 0, 15));
  return {
    ...base,
    city: city.name[lang],
    country: timeCountry(city.country)?.name[lang] ?? '',
    gaps: anchorsFor(city).slice(0, 4).map(a => ({
      city: a.name[lang],
      label: gapLabel(gapMinutes(city, a, at)),
    })),
  };
}
