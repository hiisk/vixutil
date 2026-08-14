/**
 * 무엇이 사이트 검색에 들어가고 무엇이 안 들어가는가.
 *
 * ── 왜 규칙을 적어 두는가 ────────────────────────────────────
 * 검색 색인은 **프리렌더된 응답에 통째로 실린다.** Vercel은 그 응답이 19.07MB를
 * 넘으면 런타임에 FALLBACK_BODY_TOO_LARGE로 죽는다 — 실제로 배포 로그가
 * `search (63.17 MB)`를 찍은 적이 있다(tests/search-payload.test.ts 머리말).
 *
 * 그래서 **장수가 큰 계열은 색인에 넣지 않는다.** 값 낱장 하나를 넣는 비용은
 * 한 줄이지만, 계열 전체를 넣으면 33,120줄이 한꺼번에 들어온다.
 *
 * ── 안 넣어도 찾을 수 있다 ───────────────────────────────────
 * 값 낱장은 **쌍 페이지가 대표**한다. `/convert/kg-lb`가 색인에 있고, 거기서
 * 값 낱장으로 가는 링크가 있다. 사람은 사이트 검색창에 "70kg 파운드"를 치지
 * 않는다 — 그 말은 구글에 친다. 그쪽은 사이트맵이 받는다.
 *
 * ── 새 계열을 낼 때 ─────────────────────────────────────────
 * 낱장이 수천 장을 넘으면 여기 접두사를 적고 까닭을 남긴다. 적지 않고 색인에
 * 넣으면 tests/search-index.test.ts가 잡는다.
 */

/** 색인에서 뺀 계열 — 접두사와 까닭 */
export const EXCLUDED_PREFIXES: { prefix: string; why: string }[] = [
  {
    prefix: '/convert/',
    why: '값 낱장 33,120장. 쌍 페이지(/convert/<쌍>)가 대표하고 값은 사이트맵이 받는다',
  },
];

/**
 * 그 주소가 사이트 검색에 들어가도 되는가.
 *
 * 쌍 페이지(`/convert/kg-lb`)는 들어가고 값 낱장(`/convert/kg-lb/70`)은 빠진다 —
 * 칸 수로 가른다. 접두사만 보면 쌍 페이지까지 함께 빠진다.
 */
export function isIndexable(href: string): boolean {
  const hit = EXCLUDED_PREFIXES.find(e => href.startsWith(e.prefix));
  if (!hit) return true;
  /* 접두사 아래로 칸이 하나 더 있으면 값 낱장이다 */
  return href.slice(hit.prefix.length).split('/').length < 2;
}
