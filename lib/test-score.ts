import type { Test, TestOpt, TestResult } from './types.ts';

/**
 * 테스트 채점 — 네 가지 방식.
 *
 * ── 왜 lib으로 뺐나 (2026-08-20) ───────────────────────────
 * 세 함수가 components/TestEngine.tsx 안에 있었다. 결과를 «왜 그렇게 나왔는지»
 * 되짚는 층(lib/test-why.ts)이 같은 계산을 해야 하는데, 화면 컴포넌트 안에
 * 있으면 가져다 쓸 수도 검사할 수도 없다. 한 벌 더 적으면 곧 한쪽만 고쳐진다.
 *
 * ── 네 가지 ────────────────────────────────────────────────
 * 점수합 → 구간(기본)은 결과에 순서가 있을 때만 맞는다. 「언어형/봉사형/선물형/
 * 스킨십형」처럼 순서가 없는 넷을 한 줄에 세우면 뜻 없는 순서가 생기고, 가운데
 * 유형은 답이 섞이기만 해도 나와버린다. 그래서 결과의 생김새에 맞는 채점을
 * 골라 쓴다. 데이터에 type이 없으면 예전 그대로 점수합이다.
 */

/** MBTI 축을 글자로 — 문항 넷 × 최대 4점이라 중간이 8이다 */
export const MBTI_THRESHOLD = 8;

export function getMbtiType(scores: Record<string, number>): string {
  const e = (scores.EI ?? 0) >= MBTI_THRESHOLD ? 'E' : 'I';
  const s = (scores.SN ?? 0) >= MBTI_THRESHOLD ? 'S' : 'N';
  const t = (scores.TF ?? 0) >= MBTI_THRESHOLD ? 'T' : 'F';
  const j = (scores.JP ?? 0) >= MBTI_THRESHOLD ? 'J' : 'P';
  return e + s + t + j;
}

/**
 * 범주형: 표를 가장 많이 받은 유형.
 *
 * 동점이면 그중 마지막에 고른 쪽이 이긴다. results에 먼저 적은 쪽으로 붙이면
 * 순서가 곧 가중치가 되어 맨 앞 결과가 34%·맨 뒤가 18%로 갈렸다. 마지막 선택을
 * 보면 넷이 25%씩으로 고르고, 「표가 같으면 최근에 기운 쪽」이라는 뜻도 선다.
 */
export function byVotes(results: TestResult[], chosen: TestOpt[]): TestResult | undefined {
  const votes: Record<string, number> = {};
  const last: Record<string, number> = {};
  chosen.forEach((o, i) => { if (o.k) { votes[o.k] = (votes[o.k] ?? 0) + 1; last[o.k] = i; } });
  return results.reduce((best, r) => {
    const v = votes[r.k!] ?? 0, bv = votes[best.k!] ?? 0;
    return v > bv || (v === bv && (last[r.k!] ?? -1) > (last[best.k!] ?? -1)) ? r : best;
  }, results[0]);
}

/** 사분면: 축마다 합을 내고 부호를 이어 붙인 열쇠('+-' 등)로 결과를 찾는다 */
export function byAxes(results: TestResult[], chosen: TestOpt[]): TestResult | undefined {
  const sums = axisSums(chosen);
  /* 합이 0이면 '-'다. 그 몫까지 합쳐 tests/test-result-balance.test.ts가 배분을 잰다 */
  const key = sums.map(v => (v > 0 ? '+' : '-')).join('');
  return results.find(r => r.k === key);
}

/** 사분면 축의 합 — 화면에서 «얼마나 기울었나»를 보이려면 부호 말고 값이 필요하다 */
export function axisSums(chosen: TestOpt[]): number[] {
  const sums: number[] = [];
  for (const o of chosen) (o.ax ?? []).forEach((v, i) => { sums[i] = (sums[i] ?? 0) + v; });
  return sums;
}

/** MBTI 축별 합 */
export function mbtiAxisScores(test: Test, picks: number[]): Record<string, number> {
  const scores: Record<string, number> = {};
  picks.forEach((oi, qi) => {
    const a = test.questions[qi]?.axis;
    if (a) scores[a] = (scores[a] ?? 0) + (test.questions[qi].opts[oi]?.score ?? 0);
  });
  return scores;
}

export const chosenOpts = (test: Test, picks: number[]): TestOpt[] =>
  picks.map((oi, qi) => test.questions[qi].opts[oi]);

/** 어느 결과가 나오는가 — 화면과 「왜」 층이 같은 답을 봐야 한다 */
export function resolveResult(test: Test, picks: number[]): TestResult {
  const chosen = chosenOpts(test, picks);
  const total = chosen.reduce((s, o) => s + o.score, 0);
  const found =
    test.type === 'mbti'
      ? test.results.find(r => r.mbtiType === getMbtiType(mbtiAxisScores(test, picks)))
      : test.type === 'category' ? byVotes(test.results, chosen)
      : test.type === 'quadrant' ? byAxes(test.results, chosen)
      : test.results.find(r => total >= r.min && total <= r.max);
  return found ?? test.results[test.results.length - 1];
}
