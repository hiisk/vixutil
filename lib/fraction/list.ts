/**
 * 분수 127가지 — 자료를 한 줄도 적지 않는다.
 *
 * 소수도 퍼센트도 동치분수도 순환마디도 분자와 분모에서 계산된다(facts.ts).
 * 여기에는 "어디까지 낼 것인가"만 있다.
 *
 * ── 분모 20까지로 끊은 이유 ─────────────────────────────
 * 분수를 찾는 사람은 대개 소수를 손에 들고 온다 — "0.375가 몇 분의 몇인가".
 * 그렇게 눈에 띄는 소수를 만드는 분모는 2·4·8·16(2의 거듭제곱)과 5·10·20,
 * 그리고 3·6·7·9·12처럼 자주 쓰이는 것들이라 스무 개 안에 거의 다 든다.
 *
 * 기약분수만 낸다. 2/4는 1/2와 같은 수이므로 페이지가 둘이 되면 같은 답을
 * 두 주소가 나눠 갖는다. 약분되지 않는 것만 남기는 규칙 하나로 127가지가
 * 정해지므로 "왜 이건 있고 저건 없나"에 답할 수 있다.
 */
export const MAX_DENOMINATOR = 24;

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

export interface Fraction {
  /** 분자 */
  n: number;
  /** 분모 */
  d: number;
}

export const FRACTIONS: Fraction[] = (() => {
  const out: Fraction[] = [];
  for (let d = 2; d <= MAX_DENOMINATOR; d++) {
    for (let n = 1; n < d; n++) {
      if (gcd(n, d) === 1) out.push({ n, d });
    }
  }
  return out;
})();

/** 주소는 1-2 꼴이다 — 슬래시는 경로를 갈라 버리고, 밑줄은 검색에서 붙어 읽힌다 */
export const slugOf = (f: Fraction): string => `${f.n}-${f.d}`;

export const FRACTION_SLUGS = FRACTIONS.map(slugOf);

export const fractionOf = (slug: string): Fraction | undefined =>
  FRACTIONS.find(f => slugOf(f) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const FRACTION_ICON = '➗';
