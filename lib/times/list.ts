/**
 * 곱셈 210가지 — 자료를 한 줄도 적지 않는다.
 *
 * 1×1부터 20×20까지에서 **앞의 수가 뒤의 수보다 크지 않은 것**만 낸다.
 * 7×8과 8×7은 같은 답이므로 주소를 둘로 두면 한 답을 두 페이지가 나눠 갖는다.
 * 그 규칙 하나로 210가지가 정해진다(20×21÷2).
 *
 * 20까지 간 이유는 나라마다 외우는 범위가 다르기 때문이다. 한국·일본의 구구단은
 * 9단까지, 영어권의 times table은 12단까지, 인도에서는 20단까지 외운다.
 * 스물까지 두면 어느 쪽에서 와도 찾는 칸이 있다.
 */
import { prerender } from '../prerender.ts';

export const MAX_FACTOR = 22;

export interface Product {
  a: number;
  b: number;
}

export const PRODUCTS: Product[] = (() => {
  const out: Product[] = [];
  for (let a = 1; a <= MAX_FACTOR; a++) {
    for (let b = a; b <= MAX_FACTOR; b++) out.push({ a, b });
  }
  return out;
})();

/** 주소는 7x8 꼴이다 — 곱셈 기호를 그대로 쓰면 주소에 못 넣는다 */
export const slugOf = (p: Product): string => `${p.a}x${p.b}`;

export const TIMES_SLUGS = PRODUCTS.map(slugOf);

/** 8x7로 들어와도 7x8을 찾아 준다 — 사람이 순서를 뒤집어 검색하기 때문이다 */
export const productOf = (slug: string): Product | undefined => {
  const m = /^([1-9][0-9]?)x([1-9][0-9]?)$/.exec(slug);
  if (!m) return undefined;
  const a = Number(m[1]);
  const b = Number(m[2]);
  if (a > MAX_FACTOR || b > MAX_FACTOR) return undefined;
  return PRODUCTS.find(p => p.a === Math.min(a, b) && p.b === Math.max(a, b));
};

/**
 * 라우트가 낼 주소 — 대표 주소(7x8)와 뒤집힌 주소(8x7)를 함께 낸다.
 *
 * 정적 내보내기라 여기 없는 주소는 파일이 아예 없다. 사람이 8x7로 검색해
 * 들어오면 404가 되므로 뒤집힌 쪽도 페이지로 만들되, canonical은 대표 주소
 * 하나만 가리키고 사이트맵에도 대표 주소만 싣는다.
 *
 * (JSX가 없는 이 파일에 두는 이유는 검사가 부를 수 있어야 하기 때문이다 —
 *  route.ts는 공유 카드 때문에 JSX를 물고 있어 node --test가 파싱하지 못한다.)
 */
export const timesParams = () => prerender([
  ...PRODUCTS.map(p => ({ slug: slugOf(p) })),
  ...PRODUCTS.filter(p => p.a !== p.b).map(p => ({ slug: `${p.b}x${p.a}` })),
]);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const TIMES_ICON = '🔢';
