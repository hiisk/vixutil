/**
 * 수 하나의 성질 — 전부 그 수에서 계산한다.
 *
 * 이 섹션에는 베껴 적은 표가 없다. 그래서 "한 줄이 밀렸다" 같은 실수는
 * 아예 일어나지 않는 대신, 틀린다면 계산이 틀린 것이다. 검사가 잡을 수 있게
 * 같은 값에 이르는 길을 일부러 둘로 열어 둔다 — 약수의 합은 여기서 하나씩
 * 더해 구하고, 검사는 소인수의 지수에서 곱으로 구해 맞춰 본다.
 *
 * 나눠 떨어지는지만 보면 되는 계산이라 √n까지만 돌면 충분하다. 209개짜리
 * 목록이라 속도가 문제될 자리는 아니지만, 약수를 짝으로 주워 담는 편이
 * 큰 수(65536)에서도 눈에 띄게 빠르다.
 */

import { NUMBERS } from './list.ts';

export type Family = 'prime' | 'square' | 'cube' | 'triangular' | 'fibonacci' | 'power2' | 'perfect';

/** 약수의 합이 자기 자신보다 큰가 작은가 — 1은 부족수다 */
export type Kind = 'perfect' | 'abundant' | 'deficient';

export interface Factor {
  p: number;
  /** 지수 — 8이면 2^3이므로 3 */
  e: number;
}

export const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let d = 3; d * d <= n; d += 2) if (n % d === 0) return false;
  return true;
};

/** 소인수분해 — 2로 먼저 털고 홀수만 시험한다 */
export function factorize(n: number): Factor[] {
  const out: Factor[] = [];
  let left = n;
  for (let p = 2; p * p <= left; p += p === 2 ? 1 : 2) {
    let e = 0;
    while (left % p === 0) { left /= p; e++; }
    if (e) out.push({ p, e });
  }
  if (left > 1) out.push({ p: left, e: 1 });
  return out;
}

/** 약수를 짝으로 주워 담는다 — d를 찾으면 n/d도 약수다 */
export function divisorsOf(n: number): number[] {
  const small: number[] = [];
  const large: number[] = [];
  for (let d = 1; d * d <= n; d++) {
    if (n % d) continue;
    small.push(d);
    if (d !== n / d) large.push(n / d);
  }
  return [...small, ...large.reverse()];
}

/**
 * 오일러 파이 — n보다 작으면서 n과 서로소인 수의 개수.
 *
 * 소인수에서 곧바로 나온다. 하나씩 세지 않는 이유는 그것이 검사가 쓸
 * 다른 길이기 때문이다(검사는 실제로 세어 본다).
 */
export const totient = (n: number): number =>
  factorize(n).reduce((acc, { p }) => (acc / p) * (p - 1), n);

const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/**
 * 로마 숫자 — 3999까지만 적을 수 있다.
 *
 * 4000부터는 M을 넉 대 늘어놓거나 윗줄(V̄)을 그어야 하는데 표기가 하나로
 * 정해져 있지 않다. 억지로 만들어 내면 그것대로 틀린 답이 되므로 없다고 한다.
 */
export function romanOf(n: number): string | null {
  if (n < 1 || n > 3999) return null;
  let left = n;
  let out = '';
  for (const [v, sym] of ROMAN) {
    while (left >= v) { out += sym; left -= v; }
  }
  return out;
}

/**
 * 콜라츠 — 짝수면 반으로, 홀수면 3배 더하기 1. 1에 닿을 때까지 몇 번인가.
 *
 * 모든 수가 1에 닿는지는 아직 아무도 증명하지 못했다. 다만 여기 실리는
 * 범위에서는 전부 닿는다(검사가 확인한다).
 */
export function collatz(n: number): { steps: number; peak: number } {
  let cur = n;
  let steps = 0;
  let peak = n;
  while (cur !== 1) {
    cur = cur % 2 === 0 ? cur / 2 : cur * 3 + 1;
    if (cur > peak) peak = cur;
    steps++;
  }
  return { steps, peak };
}

const intRoot = (n: number, k: number): number | null => {
  const r = Math.round(n ** (1 / k));
  return r ** k === n ? r : null;
};

/** 삼각수 k(k+1)/2의 k — 아니면 null */
const triangularIndex = (n: number): number | null => {
  const k = Math.round((Math.sqrt(8 * n + 1) - 1) / 2);
  return (k * (k + 1)) / 2 === n ? k : null;
};

/** 피보나치는 범위가 좁으니 만들어 두고 찾는다 */
const FIB = (() => {
  const out = [1, 2];
  while (out[out.length - 1] < 2 ** 17) out.push(out[out.length - 2] + out[out.length - 1]);
  return new Set(out);
})();

export interface NumberFacts {
  n: number;
  factors: Factor[];
  divisors: number[];
  /** 약수의 합 σ(n) */
  divisorSum: number;
  /** 자기 자신을 뺀 약수의 합 — 완전수·과잉수·부족수를 가른다 */
  properSum: number;
  kind: Kind;
  prime: boolean;
  /** 바로 앞뒤의 소수 — 1과 2 앞에는 없다 */
  prevPrime: number | null;
  nextPrime: number | null;
  totient: number;
  digitSum: number;
  /** 자릿수를 다 더하고 또 더해 한 자리가 될 때까지 */
  digitalRoot: number;
  palindrome: boolean;
  roman: string | null;
  bin: string;
  oct: string;
  hex: string;
  base36: string;
  bits: number;
  collatz: { steps: number; peak: number };
  /** 2의 몇 제곱인가 — 아니면 null */
  power2: number | null;
  square: number | null;
  cube: number | null;
  triangular: number | null;
  fibonacci: boolean;
  /**
   * 점을 늘어놓아 직사각형을 만들 때 가장 정사각형에 가까운 모양.
   * 소수는 1 × n 한 줄뿐이라, 그림이 곧 "왜 소수인가"가 된다.
   */
  rect: { rows: number; cols: number };
}

export function numberFacts(n: number): NumberFacts {
  const divisors = divisorsOf(n);
  const divisorSum = divisors.reduce((a, b) => a + b, 0);
  const properSum = divisorSum - n;
  const digits = String(n).split('').map(Number);
  const digitSum = digits.reduce((a, b) => a + b, 0);

  let rows = 1;
  for (const d of divisors) {
    if (d * d <= n) rows = d;
  }

  return {
    n,
    factors: factorize(n),
    divisors,
    divisorSum,
    properSum,
    kind: n === 1 ? 'deficient' : properSum === n ? 'perfect' : properSum > n ? 'abundant' : 'deficient',
    prime: isPrime(n),
    prevPrime: (() => { for (let i = n - 1; i >= 2; i--) if (isPrime(i)) return i; return null; })(),
    nextPrime: (() => { for (let i = n + 1; i <= n * 2 + 2; i++) if (isPrime(i)) return i; return null; })(),
    totient: totient(n),
    digitSum,
    digitalRoot: n === 0 ? 0 : 1 + ((n - 1) % 9),
    palindrome: String(n) === [...String(n)].reverse().join(''),
    roman: romanOf(n),
    bin: n.toString(2),
    oct: n.toString(8),
    hex: n.toString(16).toUpperCase(),
    base36: n.toString(36).toUpperCase(),
    bits: n.toString(2).length,
    collatz: collatz(n),
    power2: (n & (n - 1)) === 0 ? Math.log2(n) : null,
    square: intRoot(n, 2),
    cube: intRoot(n, 3),
    triangular: triangularIndex(n),
    fibonacci: FIB.has(n),
    rect: { rows, cols: n / rows },
  };
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';

/**
 * 2³ × 5² — 수식이라 언어를 타지 않는다.
 *
 * 지수를 위첨자로 올리는 것은 글꼴 문제가 아니라 읽는 문제다. 2^3 × 5^2로
 * 적으면 곱셈 기호와 지수 기호가 한 줄에서 섞여 어디까지가 밑인지 흐려진다.
 */
export const factorText = (factors: Factor[]): string =>
  factors
    .map(({ p, e }) => (e === 1 ? String(p) : p + String(e).split('').map(d => SUP[Number(d)]).join('')))
    .join(' × ');

export const FAMILIES: Family[] = ['prime', 'square', 'cube', 'triangular', 'fibonacci', 'power2', 'perfect'];

/** 한 수가 여러 갈래에 함께 든다 — 64는 제곱수이자 세제곱수이자 2의 거듭제곱이다 */
export function familiesOf(n: number): Family[] {
  const f = numberFacts(n);
  const out: Family[] = [];
  if (f.prime) out.push('prime');
  if (f.square !== null) out.push('square');
  if (f.cube !== null) out.push('cube');
  if (f.triangular !== null) out.push('triangular');
  if (f.fibonacci) out.push('fibonacci');
  if (f.power2 !== null) out.push('power2');
  if (f.kind === 'perfect') out.push('perfect');
  return out;
}

/** 그 갈래에 드는 수들 — 목록을 적어 두지 않고 걸러 낸다 */
export const membersOf = (family: Family): number[] => NUMBERS.filter(n => familiesOf(n).includes(family));
