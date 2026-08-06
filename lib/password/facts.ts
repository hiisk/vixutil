/**
 * 길이와 문자 집합 하나가 만드는 세기, 그리고 뚫리는 데 걸리는 시간.
 *
 *   한 글자가 담는 비트 = log2(집합 크기)
 *   전체 비트          = 길이 × 한 글자 비트
 *   경우의 수          = 집합 크기 ^ 길이
 *   평균 시도          = 경우의 수 ÷ 2
 *   걸리는 시간        = 평균 시도 ÷ 초당 시도 횟수
 *
 * 경우의 수가 10^100을 넘어가므로 자릿수는 로그로 다룬다. 화면에 내는 것도
 * "10의 몇 제곱"이지 자릿수를 늘어놓은 숫자가 아니다.
 *
 * 여기서 보이려는 것은 길이보다 **저장 방식**이 답을 더 크게 바꾼다는 점이다.
 * NTLM으로 저장한 곳과 bcrypt로 저장한 곳은 같은 비밀번호를 놓고도 시간이
 * 백만 배 넘게 갈린다.
 */
import {
  CHARSETS, LENGTHS, RATES, SECONDS_PER_YEAR, UNIVERSE_YEARS,
  type Cell, charsetOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 한 글자가 담는 비트 */
export const bitsPerChar = (size: number): number => Math.log2(size);

/** 전체 비트 */
export const bitsOf = (size: number, length: number): number => length * bitsPerChar(size);

/** 평균 시도 횟수를 초당 속도로 나눈 초 */
export const secondsOf = (bits: number, perSecond: number): number => 2 ** (bits - 1) / perSecond;

/** 같은 비트를 내려면 그 집합으로 몇 글자가 필요한가 */
export const lengthFor = (bits: number, size: number): number => bits / bitsPerChar(size);

export interface Crack {
  key: string;
  perSecond: number;
  seconds: number;
  /** 년으로 고친 값 */
  years: number;
  /** 우주 나이의 몇 배인가 — 1보다 작으면 우주 나이 안쪽이다 */
  universes: number;
}

export interface Neighbour {
  slug: string;
  charset: string;
  length: number;
}

export interface PasswordFacts {
  cell: Cell;
  slug: string;
  /** 문자 집합 크기 */
  size: number;
  /** 한 글자가 담는 비트 */
  perChar: number;
  /** 전체 비트 */
  bits: number;
  /** 경우의 수의 자릿수 — 10^digits 꼴로 읽는다 */
  digits: number;
  /** 아스키 94자로 같은 세기를 내려면 몇 글자인가 */
  asciiEquivalent: number;
  cracks: Crack[];
  shorter: Neighbour | null;
  longer: Neighbour | null;
}

const ASCII_SIZE = 94;

export function passwordFacts(c: Cell): PasswordFacts {
  const set = charsetOf(c.charset);
  if (!set) throw new Error(`문자 집합이 없다: ${c.charset}`);
  const bits = bitsOf(set.size, c.length);
  const i = LENGTHS.indexOf(c.length);
  const near = (length: number): Neighbour => ({ slug: slugOf({ charset: c.charset, length }), charset: c.charset, length });

  return {
    cell: c,
    slug: slugOf(c),
    size: set.size,
    perChar: round(bitsPerChar(set.size), 2),
    bits: round(bits),
    digits: round(c.length * Math.log10(set.size), 1),
    asciiEquivalent: round(lengthFor(bits, ASCII_SIZE), 1),
    cracks: RATES.map(r => {
      const seconds = secondsOf(bits, r.perSecond);
      const years = seconds / SECONDS_PER_YEAR;
      return {
        key: r.key,
        perSecond: r.perSecond,
        seconds,
        years,
        universes: years / UNIVERSE_YEARS,
      };
    }),
    shorter: i > 0 ? near(LENGTHS[i - 1]) : null,
    longer: i + 1 < LENGTHS.length ? near(LENGTHS[i + 1]) : null,
  };
}

export type TimeUnit = 'instant' | 'second' | 'minute' | 'hour' | 'day' | 'year' | 'exp';

export interface TimeParts {
  unit: TimeUnit;
  /** unit이 exp면 10의 지수, 아니면 그 단위로 센 값 */
  value: number;
}

/**
 * 초를 사람이 읽을 자리로 옮긴다 — 낱말은 언어가 붙이고 수는 여기서 낸다.
 *
 * 백만 년을 넘으면 자릿수 자체가 답이므로 10의 지수로 바꾼다. 1억 년을
 * "100000000년"이라고 적어 봐야 읽히지 않는다.
 */
export function timeParts(seconds: number): TimeParts {
  if (seconds < 1) return { unit: 'instant', value: 0 };
  if (seconds < 60) return { unit: 'second', value: round(seconds) };
  if (seconds < 3600) return { unit: 'minute', value: round(seconds / 60) };
  if (seconds < 86400) return { unit: 'hour', value: round(seconds / 3600) };
  if (seconds < SECONDS_PER_YEAR) return { unit: 'day', value: round(seconds / 86400) };
  const years = seconds / SECONDS_PER_YEAR;
  if (years < 1e6) return { unit: 'year', value: round(years) };
  return { unit: 'exp', value: round(Math.log10(years)) };
}

/** 같은 집합의 한 줄 */
export const atCharset = (charset: string): Cell[] => LENGTHS.map(length => ({ charset, length }));

/** 같은 길이의 한 줄 */
export const atLength = (length: number): Cell[] => CHARSETS.map(c => ({ charset: c.key, length }));
