/**
 * 비밀번호 세기 100칸 — 길이 열 가지 × 문자 집합 열 가지.
 *
 * 적는 것은 길이 사다리와 집합 크기뿐이다. 경우의 수도, 비트도, 뚫리는 데
 * 걸리는 시간도 전부 계산한다(facts.ts).
 *
 * 크래킹 속도는 지어내지 않았다. hashcat 6.2.6을 RTX 4090 한 장에서 돌린
 * 공개 측정값을 그대로 옮겼다(아래 RATES의 출처). 저장 방식이 무엇이냐로
 * 같은 비밀번호의 답이 백만 배 갈리는 것이 이 표의 요지다.
 */

export interface Charset {
  key: string;
  /** 집합 크기 — 이 수의 로그가 한 글자가 담는 비트다 */
  size: number;
}

/**
 * 문자 집합 열 가지.
 *
 * 마지막의 한글은 KS X 1001 완성형이 정한 상용 음절 2,350자다. 자모가 아니라
 * 음절 하나를 한 글자로 세기 때문에 한 글자가 담는 비트가 아스키의 두 배쯤 된다.
 */
export const CHARSETS: Charset[] = [
  { key: 'digit', size: 10 },
  { key: 'hex', size: 16 },
  { key: 'lower', size: 26 },
  { key: 'base32', size: 32 },
  { key: 'loweralnum', size: 36 },
  { key: 'alpha', size: 52 },
  { key: 'alnum', size: 62 },
  { key: 'base64', size: 64 },
  { key: 'ascii', size: 94 },
  { key: 'hangul', size: 2350 },
];

/** 길이 사다리 */
export const LENGTHS: number[] = [6, 8, 10, 12, 14, 16, 20, 24, 32, 40];

/**
 * 초당 시도 횟수 — hashcat 6.2.6, RTX 4090 한 장의 공개 측정값이다.
 *
 * 뒤의 둘은 일부러 느리게 만든 저장 방식이라 자릿수가 다섯 이상 낮다.
 * 같은 비밀번호라도 사이트가 무엇으로 저장했느냐가 답을 백만 배 바꾼다.
 */
export const RATES = [
  { key: 'ntlm', perSecond: 288.5e9 },
  { key: 'md5', perSecond: 164.1e9 },
  { key: 'sha256', perSecond: 21975.5e6 },
  { key: 'wpa', perSecond: 2533.3e3 },
  { key: 'bcrypt', perSecond: 184.0e3 },
] as const;

/** 1년은 몇 초인가 — 율리우스년 */
export const SECONDS_PER_YEAR = 365.25 * 24 * 3600;

/** 우주 나이(년) — 시간이 너무 클 때 견주는 자다 */
export const UNIVERSE_YEARS = 13.8e9;

export interface Cell {
  /** CHARSETS의 key */
  charset: string;
  /** 글자 수 */
  length: number;
}

const BY_KEY = new Map(CHARSETS.map(c => [c.key, c]));

export const charsetOf = (key: string): Charset | undefined => BY_KEY.get(key);

export const CELLS: Cell[] = CHARSETS.flatMap(c => LENGTHS.map(length => ({ charset: c.key, length })));

export const slugOf = (c: Cell): string => `${c.charset}-${c.length}`;

export const PASSWORD_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const PASSWORD_ICON = '🔑';
