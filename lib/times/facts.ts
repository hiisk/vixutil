/**
 * 곱셈 한 칸의 값 — 두 수에서 계산한다.
 *
 * 곱만 내놓으면 표를 옮겨 적은 것과 다를 바 없다. 이 페이지가 답해야 하는 것은
 * "왜 그 값인가"이므로, 나누기로 되돌리는 식과 앞뒤 칸(7×7과 7×9)을 함께 낸다 —
 * 곱셈표를 외울 때 사람이 실제로 붙잡는 것이 그 이웃 관계다.
 */
import { MAX_FACTOR, PRODUCTS, type Product } from './list.ts';

export interface TimesFacts {
  a: number;
  b: number;
  product: number;
  /** 같은 답을 주는 다른 순서 — 7×8과 8×7 */
  swapped: Product;
  /** 나누기로 되돌린 두 식 */
  divisions: [string, string];
  /** 더하기로 풀어 쓴 식 — 7 + 7 + … 여덟 번 */
  repeated: string;
  /** 앞 칸과 뒤 칸의 곱. 한 칸이 b만큼 자란다 */
  before?: number;
  after?: number;
  /** 두 수가 같은 제곱수인가 */
  square: boolean;
  /** 곱이 짝수인가 — 둘 중 하나만 짝수여도 짝수다 */
  even: boolean;
  /** 이 곱을 만드는 다른 짝들 — 24는 3×8이기도 4×6이기도 하다 */
  otherPairs: Product[];
}

export function timesFacts({ a, b }: Product): TimesFacts {
  const product = a * b;
  return {
    a,
    b,
    product,
    swapped: { a: b, b: a },
    divisions: [`${product} ÷ ${a} = ${b}`, `${product} ÷ ${b} = ${a}`],
    // 열 번을 넘으면 줄이 길어져 읽히지 않는다
    repeated: b <= 10 ? Array.from({ length: b }, () => String(a)).join(' + ') : '',
    before: b > 1 ? a * (b - 1) : undefined,
    after: b < MAX_FACTOR ? a * (b + 1) : undefined,
    square: a === b,
    even: product % 2 === 0,
    otherPairs: PRODUCTS.filter(p => p.a * p.b === product && !(p.a === a && p.b === b)),
  };
}

/** 몇 단인가로 묶는다 — 7단은 7이 든 칸 전부다 */
export const tableOf = (n: number): Product[] => PRODUCTS.filter(p => p.a === n || p.b === n);

export const TABLES: number[] = Array.from({ length: MAX_FACTOR }, (_, i) => i + 1);

/** 같은 단에서 앞뒤 칸 */
export const neighbours = (p: Product, span = 3): Product[] => {
  const table = tableOf(p.a);
  const i = table.findIndex(o => o.a === p.a && o.b === p.b);
  return table.slice(Math.max(0, i - span), i + span + 1).filter(o => !(o.a === p.a && o.b === p.b));
};
