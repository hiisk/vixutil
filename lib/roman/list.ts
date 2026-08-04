/**
 * 로마 숫자 연도 201가지 — 1900년부터 2100년까지.
 *
 * 작은 수(1~200)는 이미 /number가 한 줄씩 들고 있다. 그래서 여기는 겹치지
 * 않게 **연도**만 맡는다. 사람들이 로마 숫자를 찾는 자리가 대개 연도이기
 * 때문이다 — 문신에 새기는 생일, 영화 끝의 저작권 연도, 시계 문자판.
 *
 * 1900년 아래로 내려가지 않는 이유는 그 위가 검색되지 않아서가 아니라,
 * 살아 있는 사람의 생년과 앞으로 쓸 연도가 이 구간에 몰려 있기 때문이다.
 */
export const FIRST_YEAR = 1900;
export const LAST_YEAR = 2100;

export const YEARS: number[] = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }, (_, i) => FIRST_YEAR + i);

export const ROMAN_SLUGS = YEARS.map(String);

export const yearOf = (slug: string): number | undefined => YEARS.find(y => String(y) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const ROMAN_ICON = '🏛️';
