/** 공식 도구가 공유하는 숫자 유틸 */
export const round = (n: number, d = 2): number => {
  const p = 10 ** d;
  return Math.round((Number.isFinite(n) ? n : 0) * p) / p;
};

/** 최대공약수 — 비를 최소 정수비로 줄일 때 쓴다 */
export const gcd = (a: number, b: number): number => {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) [x, y] = [y, x % y];
  return x || 1;
};
