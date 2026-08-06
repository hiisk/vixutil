/**
 * "관련 항목"을 고를 때 목록 앞쪽만 뽑지 않게 한다.
 *
 * ── 무엇이 문제였나 (2026-08-06에 재 보고 알았다) ────────────────
 * 열두 개 섹션이 모두 `[...같은갈래, ...나머지].slice(0, limit)`이었다.
 * 늘 목록의 **앞 여섯**이 나온다는 뜻이다. 그래서 뒤에 붙인 항목은 나가는 링크는
 * 있는데 **들어오는 링크가 하나도 없다.**
 *
 *   사자성어 82/124 · 나라 83/124 · 지하철 9/50 이 들어오는 링크 0이었다.
 *   열두 섹션을 합치면 174/504, 열 언어를 곱하면 천칠백 장 남짓이 사이트 안에서
 *   아무도 가리키지 않는 페이지다.
 *
 * 사이트맵에만 있는 페이지는 크롤러가 늦게 닿고, 내부 링크가 없으니 사이트 안에서
 * 아무 무게도 못 받는다. 항목을 늘릴수록 나빠지는 종류의 문제라 — 새로 넣은 것이
 * 언제나 목록 끝에 붙기 때문에 — 늘리기를 계속하는 이 저장소에서는 특히 나쁘다.
 *
 * ── 어떻게 고치나 ───────────────────────────────────────────────
 * **자기 갈래 안에서 몇 번째인지**를 시작점으로 삼아 돌아가며 고른다.
 * 갈래에 m개가 있으면 고를 수 있는 상대는 m−1개이고, m개의 항목이 저마다 다른
 * 자리에서 시작하므로 m−1개가 빠짐없이 한 번씩은 가리켜진다.
 *
 * 처음에는 전체 목록에서의 자리를 씨앗으로 썼는데, 그러면 같은 갈래의 두 항목이
 * 나머지 연산에서 같은 자리로 떨어져 여섯이 남았다(convert 4 · hanja 2).
 * 갈래 안의 자리를 쓰면 그 겹침이 생기지 않는다.
 *
 * 무작위가 아니라 **자리로 정한다.** 무작위면 서버와 브라우저가 다른 목록을
 * 그려 하이드레이션이 깨지고, 배포마다 링크가 바뀌어 크롤러가 헷갈린다.
 */

/** pool을 from 자리부터 한 바퀴 돌며 limit개를 고른다 */
export function rotatePick<T>(pool: T[], from: number, limit: number): T[] {
  if (pool.length === 0 || limit <= 0) return [];
  const start = ((from % pool.length) + pool.length) % pool.length;
  const out: T[] = [];
  for (let k = 0; k < pool.length && out.length < limit; k++) {
    out.push(pool[(start + k) % pool.length]);
  }
  return out;
}

/**
 * 같은 갈래를 먼저, 모자라면 나머지로 채운다 — 둘 다 자기 자리부터 돌아가며.
 *
 * @param all    섹션의 전체 목록
 * @param me     지금 페이지의 항목
 * @param sameAs 같은 갈래인지 판단 (카테고리·지역·도시)
 */
export function relatedFor<T>(all: T[], me: T, sameAs: (x: T) => boolean, limit: number): T[] {
  const cat = all.filter(sameAs);
  const seed = cat.indexOf(me);
  const same = cat.filter(x => x !== me);
  const rest = all.filter(x => x !== me && !sameAs(x));
  const picked = rotatePick(same, seed, limit);
  if (picked.length >= limit) return picked;
  // 나머지에서 채울 때도 자리를 흩는다 — 안 그러면 갈래가 작은 항목들이 다 같은 것을 가리킨다
  return [...picked, ...rotatePick(rest, all.indexOf(me), limit - picked.length)];
}
