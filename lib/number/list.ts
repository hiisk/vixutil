/**
 * 수 209가지 — 자료를 한 줄도 적지 않는다.
 *
 * 1부터 200까지는 그냥 이어지는 수이고, 뒤에 붙는 아홉은 2의 거듭제곱이다.
 * 소인수분해도 약수도 로마 숫자도 진법도 전부 그 수에서 나오므로(facts.ts)
 * 여기에는 "어디까지 낼 것인가"만 있다.
 *
 * 200까지로 끊은 이유는 격자로 그려지기 때문이다 — 열 칸씩 스무 줄이면
 * 한 화면에 들어오고, 소수가 어디에 앉는지가 그림으로 보인다.
 *
 * 256부터 65536까지를 따로 붙인 것은 이 아홉이 다른 수들과 쓰임이 달라서다.
 * 255·1024·65535를 찾는 사람은 수의 성질이 궁금한 게 아니라 한 바이트가
 * 어디서 끝나는지, 포트 번호가 왜 65535에서 멈추는지를 찾는다.
 */

/** 격자로 그리는 구간 — 열 칸씩 끊어 스무 줄이 된다 */
export const GRID_MAX = 200;
export const GRID_COLS = 10;

/**
 * 격자 뒤에 따로 붙는 수 — 2의 거듭제곱.
 *
 * 규칙으로 고른다. 손으로 "1024, 65536 …"이라고 적으면 왜 4096은 있고
 * 3000은 없는지 설명할 수 없고, 하나를 더 넣고 싶어질 때마다 기준이 흔들린다.
 */
export const POWERS: number[] = Array.from({ length: 9 }, (_, i) => 2 ** (i + 8));

export const NUMBERS: number[] = [
  ...Array.from({ length: GRID_MAX }, (_, i) => i + 1),
  ...POWERS,
];

export const NUMBER_SLUGS = NUMBERS.map(String);

/**
 * 주소에서 수로. 앞에 0이 붙거나("007") 없는 수는 받지 않는다 —
 * 같은 수에 주소가 둘이 되면 서로 경쟁한다.
 */
export const numberOf = (slug: string): number | undefined =>
  NUMBERS.find(n => String(n) === slug);

/**
 * 목록에서 앞뒤로 몇 걸음 — 수직선이 아니라 목록을 따라간다.
 *
 * 그래서 200 다음은 201이 아니라 256이다. 없는 페이지로 보내지 않으려면
 * 이쪽이 맞다.
 */
export const neighboursOf = (n: number, span = 3): number[] => {
  const i = NUMBERS.indexOf(n);
  return NUMBERS.slice(Math.max(0, i - span), i + span + 1).filter(x => x !== n);
};

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const NUMBER_ICON = '🔢';
