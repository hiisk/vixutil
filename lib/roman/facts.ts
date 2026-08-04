/**
 * 연도 하나를 로마 숫자로 — 표를 베끼지 않고 규칙에서 만든다.
 *
 * 값이 큰 것부터 뺄 수 있을 때까지 빼면 된다. 뺄셈 꼴(CM = 900, XC = 90,
 * IV = 4)까지 같은 표에 넣어 두는 것이 요령이다. 그러면 "네 번 반복하지
 * 않는다"는 규칙이 따로 필요 없어진다 — IIII가 만들어질 자리에서 IV가 먼저
 * 걸리기 때문이다.
 *
 * 읽는 쪽(parseRoman)은 만드는 쪽과 아주 다른 길로 간다. 글자를 왼쪽부터
 * 훑다가 뒤 글자가 더 크면 빼고 아니면 더한다. 검사는 이 두 길이 같은
 * 자리에서 만나는지를 본다.
 */
import { YEARS } from './list.ts';

/** 값이 큰 것부터 — 뺄셈 꼴도 한 줄로 넣는다 */
export const NUMERALS: { value: number; letters: string }[] = [
  { value: 1000, letters: 'M' },
  { value: 900, letters: 'CM' },
  { value: 500, letters: 'D' },
  { value: 400, letters: 'CD' },
  { value: 100, letters: 'C' },
  { value: 90, letters: 'XC' },
  { value: 50, letters: 'L' },
  { value: 40, letters: 'XL' },
  { value: 10, letters: 'X' },
  { value: 9, letters: 'IX' },
  { value: 5, letters: 'V' },
  { value: 4, letters: 'IV' },
  { value: 1, letters: 'I' },
];

/** 글자 하나의 값 — 읽는 쪽이 쓴다 */
export const LETTER_VALUE: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

export interface Part {
  letters: string;
  value: number;
  /** IV·IX처럼 큰 수에서 빼는 꼴인가 */
  subtractive: boolean;
}

export interface RomanFacts {
  year: number;
  roman: string;
  /** 조각난 자리 — M + CM + XC + IV */
  parts: Part[];
  /** 글자 수 */
  length: number;
  /** 뺄셈 꼴이 쓰였는가 */
  hasSubtractive: boolean;
  /** 자릿수별로 나눈 값 — 1000의 자리부터 */
  digits: { place: number; value: number; letters: string }[];
  prev: number | null;
  next: number | null;
}

/** 값이 큰 것부터 뺄 수 있을 때까지 뺀다 */
export function toRoman(n: number): string {
  let left = n;
  let out = '';
  for (const { value, letters } of NUMERALS) {
    while (left >= value) {
      out += letters;
      left -= value;
    }
  }
  return out;
}

/** 왼쪽부터 훑다가 뒤가 더 크면 뺀다 — 만드는 쪽과 다른 길이다 */
export function parseRoman(s: string): number {
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const here = LETTER_VALUE[s[i]];
    const next = LETTER_VALUE[s[i + 1]];
    if (here === undefined) return NaN;
    total += next !== undefined && next > here ? -here : here;
  }
  return total;
}

const splitParts = (n: number): Part[] => {
  let left = n;
  const parts: Part[] = [];
  for (const { value, letters } of NUMERALS) {
    while (left >= value) {
      parts.push({ letters, value, subtractive: letters.length === 2 });
      left -= value;
    }
  }
  return parts;
};

export function romanFacts(year: number): RomanFacts {
  const roman = toRoman(year);
  const parts = splitParts(year);

  // 1000·100·10·1의 자리로 나눠 각각을 로마 숫자로 적는다 — 자리마다 따로 읽는 법이다
  const digits = [1000, 100, 10, 1]
    .map(place => {
      const value = Math.floor(year / place) % 10 * place;
      return { place, value, letters: toRoman(value) };
    })
    .filter(d => d.value > 0);

  return {
    year,
    roman,
    parts,
    length: roman.length,
    hasSubtractive: parts.some(p => p.subtractive),
    digits,
    prev: YEARS.includes(year - 1) ? year - 1 : null,
    next: YEARS.includes(year + 1) ? year + 1 : null,
  };
}

/** 글자가 가장 긴 연도 — 이 구간에서는 1888이 아니라 1988 쪽이다 */
export const longest = (): number[] => {
  const max = Math.max(...YEARS.map(y => toRoman(y).length));
  return YEARS.filter(y => toRoman(y).length === max);
};

/** 글자가 가장 짧은 연도 */
export const shortest = (): number[] => {
  const min = Math.min(...YEARS.map(y => toRoman(y).length));
  return YEARS.filter(y => toRoman(y).length === min);
};

/** 십 년 단위로 묶는다 — 목록이 그대로 목차가 된다 */
export const decades = (): { from: number; years: number[] }[] => {
  const out: { from: number; years: number[] }[] = [];
  for (let from = Math.floor(YEARS[0] / 10) * 10; from <= YEARS[YEARS.length - 1]; from += 10) {
    const years = YEARS.filter(y => y >= from && y < from + 10);
    if (years.length) out.push({ from, years });
  }
  return out;
};

export const neighbours = (year: number, span = 3): number[] =>
  YEARS.filter(y => Math.abs(y - year) <= span && y !== year);
