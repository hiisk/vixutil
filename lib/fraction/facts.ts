/**
 * 분수 하나의 값 — 분자와 분모에서 계산한다.
 *
 * 소수는 나눗셈을 손으로 하듯 자리를 하나씩 만들어 낸다. 그렇게 해야 3분의 1이
 * 0.3333…이 아니라 **0.(3)**, 6분의 1이 0.1(6)이라고 정확히 적을 수 있다.
 * 부동소수점으로 나누면 0.16666666666666666처럼 어디까지가 참인지 알 수 없는
 * 숫자가 나오고, 그것을 반올림해 적으면 순환마디가 사라진다.
 *
 * 순환마디의 길이는 나눗셈을 돌려 보면 나오지만, 짧아지는 자리(앞머리)는
 * 분모에서 2와 5를 몇 번 뽑아낼 수 있는가로 정해진다 — 10 = 2 × 5이기 때문이다.
 */
import { FRACTIONS, type Fraction } from './list.ts';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export interface Decimal {
  /** 소수점 앞 — 진분수만 다루므로 늘 0이다 */
  integer: number;
  /** 순환하기 전의 자리들 */
  head: string;
  /** 되풀이되는 자리들. 비어 있으면 딱 떨어지는 소수다 */
  period: string;
  /** 0.375 · 0.(3) · 0.1(6) */
  text: string;
  terminating: boolean;
}

/**
 * 나눗셈을 자리마다 세워 소수를 만든다.
 *
 * 나머지가 한 번 나왔던 값으로 돌아오면 그때부터 같은 자리가 되풀이된다 —
 * 그 지점이 순환마디의 시작이다.
 */
export function decimalOf(n: number, d: number): Decimal {
  const integer = Math.floor(n / d);
  let rest = n % d;
  const digits: number[] = [];
  const seen = new Map<number, number>();

  while (rest !== 0 && !seen.has(rest)) {
    seen.set(rest, digits.length);
    rest *= 10;
    digits.push(Math.floor(rest / d));
    rest %= d;
  }

  const start = rest === 0 ? digits.length : seen.get(rest)!;
  const head = digits.slice(0, start).join('');
  const period = digits.slice(start).join('');

  return {
    integer,
    head,
    period,
    // 딱 떨어지면서 소수 자리가 없으면 정수다 — "50."처럼 점만 남기지 않는다
    text: period ? `${integer}.${head}(${period})` : head ? `${integer}.${head}` : String(integer),
    terminating: period === '',
  };
}

export interface FractionFacts {
  n: number;
  d: number;
  /** 0.375 — 계산에 쓰는 값. 화면에는 decimal.text를 쓴다 */
  value: number;
  decimal: Decimal;
  /** 37.5% — 딱 떨어지지 않으면 반올림한 자리를 함께 알려 준다 */
  percent: Decimal;
  /** 소수점 아래 몇 자리에서 끝나는가. 순환소수면 null */
  places: number | null;
  /** 순환마디 길이 */
  periodLength: number;
  /** 같은 값을 나타내는 분수들 — 2/4, 3/6 … */
  equivalents: Fraction[];
  /** 뒤집은 분수. 1보다 크므로 대분수로도 적는다 */
  reciprocal: { n: number; d: number; whole: number; rest: number };
  /** 360도 가운데 몇 도 — 7분의 5는 257.(142857)도라 소수로 적으면 어긋난다 */
  degrees: Decimal;
  /** 한 시간 가운데 몇 분 */
  minutes: Decimal;
}

/** 소수점 아래 자리 수 — 순환소수는 끝이 없으므로 null */
const placesOf = (dec: Decimal): number | null => (dec.terminating ? dec.head.length : null);

export function fractionFacts({ n, d }: Fraction): FractionFacts {
  const dec = decimalOf(n, d);
  const whole = Math.floor(d / n);

  return {
    n,
    d,
    value: n / d,
    decimal: dec,
    // 퍼센트는 100을 곱한 분수다. 100n/d를 다시 약분해 같은 방식으로 소수를 만든다
    percent: decimalOf(100 * n, d),
    places: placesOf(dec),
    periodLength: dec.period.length,
    equivalents: [2, 3, 4, 5].map(k => ({ n: n * k, d: d * k })),
    reciprocal: { n: d, d: n, whole, rest: d - whole * n },
    degrees: decimalOf(360 * n, d),
    minutes: decimalOf(60 * n, d),
  };
}

/** 수직선에서 가까운 분수들 — 값 순으로 늘어놓고 앞뒤를 집는다 */
const BY_VALUE = [...FRACTIONS].sort((a, b) => a.n / a.d - b.n / b.d);

export const nearby = (f: Fraction, span = 3): Fraction[] => {
  const i = BY_VALUE.findIndex(o => o.n === f.n && o.d === f.d);
  return BY_VALUE.slice(Math.max(0, i - span), i + span + 1).filter(o => !(o.n === f.n && o.d === f.d));
};

/** 같은 분모의 다른 분수들 */
export const sameDenominator = (f: Fraction): Fraction[] =>
  FRACTIONS.filter(o => o.d === f.d && o.n !== f.n);

/** 분모별로 묶는다 — 허브가 이 순서로 늘어놓는다 */
export const DENOMINATORS: number[] = [...new Set(FRACTIONS.map(f => f.d))];

export const fractionsOfDenominator = (d: number): Fraction[] => FRACTIONS.filter(f => f.d === d);

/** 딱 떨어지는 소수인가 — 분모에 2와 5 말고 다른 소인수가 없으면 그렇다 */
export const terminates = (d: number): boolean => {
  let left = d;
  while (left % 2 === 0) left /= 2;
  while (left % 5 === 0) left /= 5;
  return left === 1;
};

/** 약분이 끝났는지 — 목록을 만드는 규칙이자 검사가 다시 확인하는 값 */
export const isReduced = ({ n, d }: Fraction): boolean => gcd(n, d) === 1;
