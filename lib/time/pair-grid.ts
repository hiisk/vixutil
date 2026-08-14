/**
 * 도시 쌍 시차 낱장 — `/time/seoul-vs-new-york`.
 *
 * ── 왜 쌍인가 ───────────────────────────────────────────────
 * 시차는 도시 하나로는 답이 안 나온다. 사람이 치는 말이 "서울 뉴욕 시차"이지
 * "뉴욕 시간대"가 아니다. 도시 낱장 173곳은 이미 있고, 여기서 더할 것은 **두
 * 도시 사이의 관계**뿐이다 — 그것도 IANA 시간대 두 개에서 전부 계산된다.
 *
 * ── 무엇을 말하는가 ────────────────────────────────────────
 * 시차 하나가 아니다. **서머타임 때문에 시차가 해마다 두 번 바뀐다.** 서울과
 * 뉴욕은 겨울에 14시간, 여름에 13시간이다. 한쪽만 서머타임을 쓰면 그렇게 되고,
 * 둘 다 쓰거나 둘 다 안 쓰면 안 바뀐다. 이 사실을 적어 두는 곳이 드물어서
 * 낱장마다 할 말이 생긴다.
 *
 * ── 어느 쌍을 내는가 ───────────────────────────────────────
 * 173곳을 전부 조합하면 14,878쌍이다. 그중 대부분은 아무도 안 친다 —
 * 아크라–수바, 몬테비데오–울란바토르 같은 쌍이다. "나라마다 대표 도시"로 걸러도
 * 그 둘이 다 대표라서 그대로 남았다. 나라를 고르게 덮는 규칙이지 **검색 수요를
 * 고르게 덮는 규칙이 아니었다.**
 *
 * 그래서 기준을 바꿨다. **한쪽이 세계 허브 도시여야 한다.** 시차를 찾는 사람은
 * 거의 언제나 한쪽 끝에 뉴욕·런던·도쿄·두바이 같은 도시를 두고 묻는다. 이 규칙이면
 * 낱장마다 한쪽에 사람이 실제로 치는 이름이 들어간다.
 *
 * ── 오늘에 기대지 않는다 ───────────────────────────────────
 * 기준 연도를 못 박는다. `new Date()`를 쓰면 여는 날마다 답이 달라져 ISR 캐시를
 * 매번 다시 쓰고 하이드레이션도 깨진다 — lib/time/facts.ts와 같은 판단이다.
 */
import { TIME_CITIES, type TimeCity } from './cities8.ts';
import { gapMinutes, timeFacts } from './facts.ts';

/** 기준 연도 — 해가 바뀌면 이 한 줄을 고친다 */
export const PAIR_YEAR = 2026;

export const VS = '-vs-';

/**
 * 세계 허브 도시 — 시차 검색이 몰리는 쪽 끝.
 *
 * 이것만은 계산으로 못 만든다. 인구도 GDP도 시차 검색량과 안 맞는다(카라치는
 * 인구 1,700만인데 시차로 묻는 사람이 거의 없고, 두바이는 그보다 작은데 훨씬
 * 많이 묻는다). 국제 항공 허브와 원격근무가 몰리는 도시를 손으로 적는다.
 *
 * 여기서 빼는 것이 곧 낱장을 안 내는 것이다 — 늘리기 전에 "그 이름을 사람이
 * 치는가"만 본다.
 */
export const HUB_SLUGS: readonly string[] = [
  'new-york', 'london', 'los-angeles', 'tokyo', 'paris', 'dubai', 'singapore',
  'hong-kong', 'sydney', 'toronto', 'chicago', 'san-francisco', 'seoul', 'berlin',
  'madrid', 'rome', 'amsterdam', 'delhi', 'mumbai', 'bangkok', 'shanghai', 'beijing',
  'sao-paulo', 'mexico-city', 'istanbul', 'moscow', 'frankfurt', 'vancouver',
  'melbourne', 'taipei',
];

export const hubCities = (): TimeCity[] =>
  HUB_SLUGS.map(s => TIME_CITIES.find(c => c.slug === s)).filter((c): c is TimeCity => Boolean(c));

export interface CityPair { a: TimeCity; b: TimeCity }

/**
 * 주소 조각 — 늘 사전순으로 앞선 slug가 먼저다.
 *
 * 순서를 고정하지 않으면 같은 쌍이 두 주소가 되고 정경로가 갈라진다.
 * 뒤집힌 주소는 목록에 없으므로 404가 된다.
 */
export const pairSlug = (a: TimeCity, b: TimeCity): string =>
  a.slug < b.slug ? `${a.slug}${VS}${b.slug}` : `${b.slug}${VS}${a.slug}`;

/** 한쪽이 허브 도시인 쌍 전부 */
export function allCityPairs(): CityPair[] {
  const hubs = new Set(HUB_SLUGS);
  const out: CityPair[] = [];
  for (let i = 0; i < TIME_CITIES.length; i++) {
    for (let j = i + 1; j < TIME_CITIES.length; j++) {
      const a = TIME_CITIES[i], b = TIME_CITIES[j];
      if (!hubs.has(a.slug) && !hubs.has(b.slug)) continue;
      out.push(a.slug < b.slug ? { a, b } : { a: b, b: a });
    }
  }
  return out;
}

const cityBySlug = (slug: string): TimeCity | undefined => TIME_CITIES.find(c => c.slug === slug);

/**
 * 주소 조각 → 두 도시. 목록 밖이거나 순서가 뒤집혔으면 null이라 404가 된다.
 *
 * 도시 slug 자체에 `-`가 들어간다(new-york). 그래서 `-vs-`를 **한 번만** 쪼갠다 —
 * 도시 이름에는 `vs`가 통째로 들어가지 않으므로 이 구분자가 안전하다.
 */
export function parsePairSlug(slug: string): CityPair | null {
  const at = slug.indexOf(VS);
  if (at < 0 || slug.indexOf(VS, at + 1) >= 0) return null;
  const a = cityBySlug(slug.slice(0, at));
  const b = cityBySlug(slug.slice(at + VS.length));
  if (!a || !b || a.slug === b.slug) return null;
  if (pairSlug(a, b) !== slug) return null;      // 뒤집힌 주소는 안 받는다
  if (!HUB_SLUGS.includes(a.slug) && !HUB_SLUGS.includes(b.slug)) return null;
  return { a, b };
}

export interface PairFacts {
  a: TimeCity;
  b: TimeCity;
  slug: string;
  /** 1월(북반구 표준시) 기준 시차 — a에서 b를 뺀 분 */
  winterMinutes: number;
  /** 7월 기준 시차 */
  summerMinutes: number;
  /** 서머타임 때문에 시차가 바뀌는가 */
  shifts: boolean;
  /** 시차가 바뀐다면 그 폭(분) */
  shiftBy: number;
  /** 어느 쪽이 서머타임을 쓰는가 */
  aDst: boolean;
  bDst: boolean;
  /** a가 앞선다(동쪽)면 true — 시차 0이면 null */
  aAhead: boolean | null;
  /**
   * a의 0~23시가 b에서 몇 시인가(겨울 기준).
   *
   * 분까지 담는다 — 인도 +5:30, 네팔 +5:45, 애들레이드 +9:30이라 정시끼리
   * 대응하지 않는다. 시만 적으면 그 지역이 통째로 30분 틀린다.
   */
  clock: { aHour: number; bHour: number; bMinute: number; dayDelta: number }[];
  /** 양쪽이 다 업무시간(9~18시)인 a의 시각 */
  overlap: number[];
}

export function pairFacts(a: TimeCity, b: TimeCity, year = PAIR_YEAR): PairFacts {
  const winterMinutes = gapMinutes(a, b, new Date(Date.UTC(year, 0, 15)));
  const summerMinutes = gapMinutes(a, b, new Date(Date.UTC(year, 6, 15)));
  const fa = timeFacts(a, year), fb = timeFacts(b, year);

  /* a의 시각에서 시차를 빼면 b의 시각이다. 분으로 셈해야 +5:30 지역이 안 뭉개진다 */
  const clock = Array.from({ length: 24 }, (_, aHour) => {
    const raw = aHour * 60 - winterMinutes;
    /* 날짜 넘김은 나눗셈으로 센다 — 시차가 22시간까지 벌어지므로(오클랜드↔호놀룰루)
       "0보다 작으면 −1"로 두면 하루가 모자란다 */
    const dayDelta = Math.floor(raw / 1440);
    const m = raw - dayDelta * 1440;
    return { aHour, bHour: Math.floor(m / 60), bMinute: m % 60, dayDelta };
  });

  /* 양쪽이 다 9~18시인 시각 — 회의를 잡을 수 있는 폭이다 */
  const overlap = clock.filter(c => c.aHour >= 9 && c.aHour < 18 && c.bHour >= 9 && c.bHour < 18)
    .map(c => c.aHour);

  return {
    a, b,
    slug: pairSlug(a, b),
    winterMinutes,
    summerMinutes,
    shifts: winterMinutes !== summerMinutes,
    shiftBy: Math.abs(summerMinutes - winterMinutes),
    aDst: fa.dst,
    bDst: fb.dst,
    aAhead: winterMinutes === 0 ? null : winterMinutes > 0,
    clock,
    overlap,
  };
}

/**
 * 이웃 쌍 — 같은 a로 b만 바꾼 것과, 같은 b로 a만 바꾼 것.
 *
 * 목록 안에서 원형으로 감는다. 앞에서 N개만 뽑으면 목록 뒤쪽이 통째로 고아가
 * 된다 — 이 저장소가 174곳에서 겪은 병이다.
 */
export function neighborPairs(a: TimeCity, b: TimeCity, limit = 8): CityPair[] {
  const pairs = allCityPairs();
  const keyed = pairs.map(p => pairSlug(p.a, p.b));
  const at = keyed.indexOf(pairSlug(a, b));
  const out: CityPair[] = [];
  for (let k = 1; out.length < limit && k <= pairs.length; k++) {
    const p = pairs[(at + k) % pairs.length];
    if (pairSlug(p.a, p.b) !== pairSlug(a, b)) out.push(p);
  }
  return out;
}
