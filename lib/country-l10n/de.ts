import type { CountryText } from '../country/types.ts';

/**
 * 나라 100개의 독일어 문구.
 *
 * 전압·플러그·국가번호·시간대처럼 언어와 무관한 값은 여기 두지 않는다 —
 * 그건 lib/country/*.ts 한 곳에만 있다. 여기에는 이름·수도·공용어·통화와
 * 소개·조언·입국·긴급전화만 둔다.
 *
 * visa는 여권별 일수를 적지 않는다. 전자여행허가나 사전등록처럼 여권을 가리지
 * 않는 것만 적고, 며칠 머물 수 있는지는 본인 여권으로 확인하라고 넘긴다.
 */
export const COUNTRY_DE: Record<string, CountryText> = {
};
