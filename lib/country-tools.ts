/**
 * 나라 정보 50개국 — 지역별 파일을 모아 하나의 카탈로그로 낸다.
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

export const COUNTRIES: Country[] = [
  ...EAST_ASIA, ...SOUTHEAST_ASIA, ...WEST_ASIA, ...WEST_EUROPE, ...NORTH_EUROPE, ...AMERICAS, ...OCEANIA_AFRICA,
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
