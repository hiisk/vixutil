/**
 * 남은 점수 169가지 — 자료를 한 줄도 적지 않는다.
 *
 * 2점부터 170점까지다. 1점은 더블로 끝낼 수 없어 아예 마무리가 없고, 170점은
 * 세 다트로 낼 수 있는 가장 큰 수(T20·T20·불)라 그 위는 세 다트로 끝나지 않는다.
 *
 * 마무리 수순은 적어 두지 않는다 — 판에 있는 점수(1~20의 싱글·더블·트리플과
 * 25·50)에서 찾아내면 되고, 그렇게 해야 "왜 이 수순인가"에 답할 수 있다(facts.ts).
 */
export const MIN_SCORE = 2;
export const MAX_SCORE = 170;

export const SCORES: number[] = Array.from(
  { length: MAX_SCORE - MIN_SCORE + 1 },
  (_, i) => i + MIN_SCORE,
);

export const DARTS_SLUGS = SCORES.map(String);

export const scoreOf = (slug: string): number | undefined => SCORES.find(s => String(s) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const DARTS_ICON = '🎯';
