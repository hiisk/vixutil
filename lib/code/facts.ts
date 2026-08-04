/**
 * 부호 하나의 값 — 적어 둔 부호에서 나머지를 계산한다.
 *
 * 모스 부호의 길이는 점과 선을 세면 나온다. 점은 한 단위, 선은 세 단위,
 * 사이는 한 단위이므로 "A(·−)는 몇 단위인가"가 곧 덧셈이다. 20단어/분에서
 * 한 단위가 60밀리초라는 것도 거기서 나온다(PARIS 기준).
 *
 * 점자 셀은 6비트다. 점 번호도 유니코드 글자도 그 수에서 만들어 낸다 —
 * ⠀(U+2800)에 값을 더하면 그 셀의 글자가 된다.
 */
import { CELLS, CHARS, dotsOf, maskOfDots, type Char } from './list.ts';

export const DOT = 1;
export const DASH = 3;
export const GAP = 1;

/** 20단어/분에서 한 단위의 길이. PARIS를 1분에 스무 번 치는 속도다 */
export const UNIT_MS_AT_20WPM = 60;

export interface CharFacts extends Char {
  /** 모스에서 점의 개수 */
  dotCount: number;
  dashCount: number;
  /** 부호 하나를 치는 데 드는 단위 시간 */
  units: number;
  /** 20단어/분에서 걸리는 밀리초 */
  ms: number;
  /** 점자 셀의 6비트 값 — 점 번호에서 만든다 */
  mask?: number;
  /** 점자 유니코드 글자 */
  braille?: string;
  /** ASCII 코드 — 글자 자체에서 나온다 */
  ascii: number;
}

/** 점과 선을 단위 시간으로 — 사이의 빈틈도 한 단위씩 든다 */
export function unitsOf(morse: string): number {
  const marks = [...morse].map(m => (m === '·' ? DOT : DASH));
  return marks.reduce((a, b) => a + b, 0) + (marks.length - 1) * GAP;
}

export function charFacts(x: Char): CharFacts {
  const dotCount = [...x.morse].filter(m => m === '·').length;
  const units = unitsOf(x.morse);
  const mask = x.dots ? maskOfDots(x.dots) : undefined;

  return {
    ...x,
    dotCount,
    dashCount: x.morse.length - dotCount,
    units,
    ms: units * UNIT_MS_AT_20WPM,
    mask,
    braille: mask === undefined ? undefined : String.fromCharCode(0x2800 + mask),
    ascii: x.char.charCodeAt(0),
  };
}

export interface CellFacts {
  mask: number;
  /** 125처럼 켜진 점의 번호 */
  dots: string;
  /** 켜진 점의 개수 */
  raised: number;
  /** 유니코드 글자와 코드 포인트 */
  char: string;
  codePoint: string;
  /** 이 셀을 쓰는 글자 — 없을 수도 있다 */
  chars: Char[];
}

export function cellFacts(mask: number): CellFacts {
  const dots = dotsOf(mask);
  return {
    mask,
    dots,
    raised: dots.length,
    char: String.fromCharCode(0x2800 + mask),
    codePoint: `U+${(0x2800 + mask).toString(16).toUpperCase()}`,
    chars: CHARS.filter(x => x.dots !== undefined && maskOfDots(x.dots) === mask),
  };
}

export const KINDS = ['letter', 'digit', 'punct'] as const;

export const charsOfKind = (kind: (typeof KINDS)[number]): Char[] => CHARS.filter(x => x.kind === kind);

/** 켜진 점의 개수로 셀을 묶는다 — 한 점짜리 여섯, 두 점짜리 열다섯 … */
export const cellsOfRaised = (n: number): number[] => CELLS.filter(m => dotsOf(m).length === n);

/** 같은 갈래에서 앞뒤로 몇 자 */
export const neighbours = (x: Char, span = 3): Char[] => {
  const group = charsOfKind(x.kind);
  const i = group.findIndex(o => o.name === x.name);
  return group.slice(Math.max(0, i - span), i + span + 1).filter(o => o.name !== x.name);
};
