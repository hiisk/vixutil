/**
 * 나라 정보 100개국 — 지역별 파일을 모아 하나의 카탈로그로 낸다.
 *
 * 공식 섹션들과 달리 계산이 아니라 사실을 보여주는 페이지다. 그래서 엔진 대신
 * 표 하나와 지역별 허브를 쓴다. 현재 시각만 클라이언트에서 계산한다.
 */
import type { Country } from './country/types.ts';
import { EAST_ASIA } from './country/asia-east.ts';
import { SOUTHEAST_ASIA } from './country/asia-southeast.ts';
import { WEST_ASIA } from './country/asia-west.ts';
import { WEST_EUROPE } from './country/europe-west.ts';
import { NORTH_EUROPE } from './country/europe-north.ts';
import { AMERICAS } from './country/americas.ts';
import { OCEANIA_AFRICA } from './country/oceania-africa.ts';
import { WEST_ASIA2 } from './country/asia-west2.ts';
import { AMERICAS2 } from './country/americas2.ts';
import { CENTRAL_EUROPE } from './country/europe-central.ts';
import { EAST_EUROPE } from './country/europe-east.ts';
import { AFRICA2 } from './country/africa2.ts';

export const COUNTRIES: Country[] = [
  ...EAST_ASIA, ...SOUTHEAST_ASIA,
  ...WEST_ASIA, ...WEST_ASIA2,
  ...WEST_EUROPE, ...NORTH_EUROPE, ...CENTRAL_EUROPE, ...EAST_EUROPE,
  ...AMERICAS, ...AMERICAS2,
  ...OCEANIA_AFRICA, ...AFRICA2,
];

export const COUNTRY_REGIONS = ['동아시아', '동남아시아', '서·남아시아', '유럽', '미주', '오세아니아·아프리카'] as const;

export const countryBySlug = (slug: string): Country | undefined => COUNTRIES.find(c => c.slug === slug);

/** 같은 지역의 다른 나라 — 상세 페이지 아래 링크로 쓴다 */
export function relatedCountries(slug: string, limit = 6): Country[] {
  const me = countryBySlug(slug);
  if (!me) return [];
  const same = COUNTRIES.filter(c => c.region === me.region && c.slug !== slug);
  const others = COUNTRIES.filter(c => c.region !== me.region && c.slug !== slug);
  return [...same, ...others].slice(0, limit);
}
