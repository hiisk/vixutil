/**
 * 저항 하나의 색띠와 성질 — 옴 값에서 계산한다.
 *
 * 색띠는 자릿수를 색으로 적은 것뿐이다. 0이 검정, 1이 갈색… 9가 흰색이고,
 * 셋째 띠는 뒤에 붙는 0의 개수(곱하는 수)다. 그러니 값만 있으면 띠가 나오고,
 * 반대로 띠에서 값도 나온다 — 검사가 그 되돌리기로 확인한다.
 *
 * ── 오차 띠를 금색으로 두는 이유 ────────────────────────
 * 여기 싣는 값은 전부 E24에 드는 값이고, E24의 표준 오차는 ±5%(금)다. 그중
 * 일부는 E12·E6에도 들어(10·15·22…) 어디서나 구할 수 있는데, 그것은 오차가
 * 아니라 **얼마나 흔한 값인가**의 이야기라 따로 둔다. 같은 4.7kΩ이 ±5%로도
 * ±1%로도 팔리므로, 계열을 오차로 바꿔 읽으면 틀린 말이 된다.
 */
import { E6, E12, E24, VALUES } from './list.ts';

export type BandColor =
  | 'black' | 'brown' | 'red' | 'orange' | 'yellow'
  | 'green' | 'blue' | 'violet' | 'grey' | 'white'
  | 'gold' | 'silver' | 'none';

/** 숫자 띠 — 자리에 그대로 대응한다 */
export const DIGIT_COLORS: BandColor[] = [
  'black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white',
];

/** 곱하는 수 띠 — 0.1과 0.01은 색이 따로 있다 */
const MULTIPLIER: Partial<Record<BandColor, number>> = { gold: 0.1, silver: 0.01 };

export const multiplierOf = (c: BandColor): number =>
  MULTIPLIER[c] ?? 10 ** DIGIT_COLORS.indexOf(c);

/** 오차 띠 — 금 ±5%가 E24의 표준이다 */
export const TOLERANCE_BAND: BandColor = 'gold';
export const TOLERANCE_PERCENT = 5;

/** 이 값이 얼마나 흔한가 — 성긴 계열에 들수록 아무 데서나 구한다 */
export type Series = 'E6' | 'E12' | 'E24';
export const SERIES: Series[] = ['E6', 'E12', 'E24'];

export interface ResistorFacts {
  /** 옴 단위의 값 */
  ohms: number;
  /** 앞의 두 자리 — 10~91 */
  base: number;
  /** 10을 몇 번 곱했는가 */
  exp: number;
  /** 네 띠: 숫자·숫자·곱하는 수·오차 */
  bands4: [BandColor, BandColor, BandColor, BandColor];
  /** 다섯 띠: 숫자 셋에 곱하는 수와 오차. E24 값은 셋째 자리가 0이다 */
  bands5: [BandColor, BandColor, BandColor, BandColor, BandColor];
  /** 이 값이 드는 가장 성긴 계열 */
  series: Series;
  /** 이 값이 드는 계열 전부 */
  inSeries: Series[];
  tolerance: number;
  /** 오차를 적용한 아래위 끝 */
  min: number;
  max: number;
  /** 4.7 kΩ 처럼 읽는 값 */
  display: string;
  /** 4k7 — 소수점 대신 단위를 끼워 넣는 표기. 인쇄가 흐려도 안 헷갈린다 */
  code: string;
  /** E24 안에서 몇 번째인가 */
  index: number;
}

const UNITS: [number, string][] = [[1_000_000, 'M'], [1_000, 'k'], [1, '']];

/** 4700 → 4.7 kΩ · 4k7 */
function readable(ohms: number): { display: string; code: string } {
  const [factor, prefix] = UNITS.find(([f]) => ohms >= f)!;
  const n = ohms / factor;
  // 소수점 한 자리까지만 — E24 값은 그보다 잘게 나뉘지 않는다
  const text = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return {
    display: `${text} ${prefix}Ω`,
    // 4.7k는 4k7로 적는다. 소수점이 인쇄에서 사라져도 자리를 알 수 있다
    code: text.includes('.') ? text.replace('.', prefix || 'R') : `${text}${prefix || 'R'}`,
  };
}

export function resistorFacts(ohms: number): ResistorFacts {
  const base = Number(String(ohms).slice(0, 2));
  const exp = String(ohms).length - 2;

  const inSeries: Series[] = [
    ...(E6.includes(base) ? (['E6'] as const) : []),
    ...(E12.includes(base) ? (['E12'] as const) : []),
    ...(E24.includes(base) ? (['E24'] as const) : []),
  ];

  return {
    ohms,
    base,
    exp,
    bands4: [
      DIGIT_COLORS[Math.floor(base / 10)],
      DIGIT_COLORS[base % 10],
      DIGIT_COLORS[exp],
      TOLERANCE_BAND,
    ],
    // 다섯 띠는 자리를 하나 더 읽으므로 곱하는 수가 한 자리 작아진다.
    // 10~91Ω에서는 그 값이 10^-1이 되어 금색 띠가 곱하는 자리에 온다
    bands5: [
      DIGIT_COLORS[Math.floor(base / 10)],
      DIGIT_COLORS[base % 10],
      DIGIT_COLORS[0],
      exp === 0 ? 'gold' : DIGIT_COLORS[exp - 1],
      TOLERANCE_BAND,
    ],
    series: inSeries[0],
    inSeries,
    tolerance: TOLERANCE_PERCENT,
    min: (ohms * (100 - TOLERANCE_PERCENT)) / 100,
    max: (ohms * (100 + TOLERANCE_PERCENT)) / 100,
    ...readable(ohms),
    index: E24.indexOf(base),
  };
}

/**
 * 색띠를 되읽어 값으로.
 *
 * 화면이 쓰는 길과 검사가 쓰는 길을 하나로 두면 서로를 확인해 주지 못하므로,
 * 이쪽은 "띠 → 값"만 안다. 검사는 값에서 만든 띠를 여기에 넣어 제자리로
 * 돌아오는지 본다.
 */
export function decodeBands(bands: BandColor[]): number {
  const digit = (c: BandColor) => DIGIT_COLORS.indexOf(c);
  if (bands.length === 5) {
    const [a, b, c, mult] = bands;
    return (digit(a) * 100 + digit(b) * 10 + digit(c)) * multiplierOf(mult);
  }
  const [a, b, mult] = bands;
  return (digit(a) * 10 + digit(b)) * multiplierOf(mult);
}

export const valuesOfSeries = (s: Series): number[] =>
  VALUES.filter(v => resistorFacts(v).inSeries.includes(s));

/** 같은 자릿수의 값들 — 4.7kΩ 옆에는 5.1kΩ이 있다 */
export const sameDecade = (ohms: number): number[] => {
  const { exp } = resistorFacts(ohms);
  return VALUES.filter(v => resistorFacts(v).exp === exp && v !== ohms);
};

/** 목록에서 앞뒤로 몇 걸음 */
export const neighbours = (ohms: number, span = 3): number[] => {
  const i = VALUES.indexOf(ohms);
  return VALUES.slice(Math.max(0, i - span), i + span + 1).filter(v => v !== ohms);
};
