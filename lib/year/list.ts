/**
 * 연도 사전 201해 — 1900년부터 2100년까지, 자료는 한 줄도 적지 않는다.
 *
 * 윤년인지, 그 해가 며칠인지, 1월 1일이 무슨 요일인지, 몇 주짜리 해인지,
 * 간지와 띠가 무엇인지 — 전부 연도 하나에서 계산된다(facts.ts).
 *
 * 1900과 2100을 양 끝으로 잡은 데는 이유가 있다. 둘 다 4로 나뉘는데 윤년이
 * 아니어서, "4년마다 윤년"이라는 어림이 깨지는 자리다. 구간 안에 그 두 해가
 * 다 들어와야 규칙을 제대로 보일 수 있다.
 */
export const FIRST_YEAR = 1880;
export const LAST_YEAR = 2120;

export const YEARS: number[] = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);

export const YEAR_SLUGS = YEARS.map(String);

export const yearOf = (slug: string): number | undefined => YEARS.find(y => String(y) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const YEAR_ICON = '📅';
