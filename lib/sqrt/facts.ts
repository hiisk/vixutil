/**
 * 제곱근 하나의 값 — 그 수에서 계산한다.
 *
 * 소수는 반올림한 값이라 어디까지가 참인지 함께 밝혀야 한다. 반면 근호를
 * 간단히 한 꼴(√50 = 5√2)은 **정확한 값**이라, 소수보다 그쪽이 답인 자리가 많다.
 * 그래서 두 가지를 나란히 둔다.
 *
 * 간단히 하는 방법은 제곱인 약수 가운데 가장 큰 것을 밖으로 꺼내는 것이다.
 * 50 = 25 × 2이므로 5가 나오고 2가 남는다.
 */
import { NUMBERS } from './list.ts';

export interface SqrtFacts {
  n: number;
  /** 소수로 적은 값 — 소수점 아래 여섯 자리에서 반올림했다 */
  value: number;
  text: string;
  /** 완전제곱수면 그 뿌리, 아니면 null */
  exact: number | null;
  /** 근호 밖으로 나온 수 — √50의 5 */
  outside: number;
  /** 근호 안에 남은 수 — √50의 2 */
  inside: number;
  /** 5√2 처럼 적은 꼴. 완전제곱수면 정수만 남는다 */
  radical: string;
  /** 값이 사이에 드는 두 정수 */
  between: [number, number];
  /** 제곱 — 되돌리면 그 수다 */
  square: number;
  /** 세제곱근도 함께 — 사람이 같은 자리에서 찾는다 */
  cbrt: number;
  cbrtExact: number | null;
}

/** 제곱인 약수 가운데 가장 큰 것을 밖으로 꺼낸다 */
export function simplify(n: number): { outside: number; inside: number } {
  let outside = 1;
  let inside = n;
  for (let d = 2; d * d <= inside; d++) {
    const sq = d * d;
    while (inside % sq === 0) {
      inside /= sq;
      outside *= d;
    }
  }
  return { outside, inside };
}

const round6 = (x: number) => Math.round(x * 1e6) / 1e6;

const intRoot = (n: number, k: number): number | null => {
  const r = Math.round(n ** (1 / k));
  return r ** k === n ? r : null;
};

export function sqrtFacts(n: number): SqrtFacts {
  const value = round6(Math.sqrt(n));
  const { outside, inside } = simplify(n);
  const floor = Math.floor(Math.sqrt(n));
  const exact = intRoot(n, 2);

  return {
    n,
    value,
    text: exact === null ? String(value) : String(exact),
    exact,
    outside,
    inside,
    radical: inside === 1 ? String(outside) : outside === 1 ? `√${inside}` : `${outside}√${inside}`,
    between: exact === null ? [floor, floor + 1] : [exact, exact],
    square: n * n,
    cbrt: round6(Math.cbrt(n)),
    cbrtExact: intRoot(n, 3),
  };
}

/** 완전제곱수만 — 목록에서 걸러 낸다 */
export const perfectSquares = (): number[] => NUMBERS.filter(n => sqrtFacts(n).exact !== null);

/** 근호가 간단해지는 수 — √50처럼 밖으로 꺼낼 것이 있는 수 */
export const simplifiable = (): number[] =>
  NUMBERS.filter(n => {
    const f = sqrtFacts(n);
    return f.exact === null && f.outside > 1;
  });

/** 앞뒤 수 */
export const neighbours = (n: number, span = 3): number[] =>
  NUMBERS.filter(o => Math.abs(o - n) <= span && o !== n);
