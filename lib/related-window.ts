/**
 * 이웃 항목을 고르는 한 가지 방법 — **자기 자리 다음부터 원형으로 감는다.**
 *
 * ── 왜 이 파일이 있나 (2026-08-12) ─────────────────────────
 * 이웃을 "목록의 앞에서 N개"로 고르면 N+1번째부터 **아무도 가리키지 않는
 * 페이지**가 된다. 화면은 멀쩡하다 — 관련 항목 칸에 넉 개가 잘 떠 있으니
 * 눈으로는 알 수 없고, "누가 나를 가리키나"를 세어 봐야 드러난다.
 *
 * 같은 병이 이 저장소에서 네 번 났다. lib/cmd·lib/shortcut·lib/emoji에서
 * 한 번씩, 그리고 계산기 카탈로그에서 141개 중 73개가 그 상태였다. 도구
 * 섹션 여덟 곳(color·game·image·sound·text·time·food·device)에서도 열두
 * 도구가 그랬다 — 열 언어이므로 120쪽이다.
 *
 * 들어오는 링크가 없는 페이지는 크롤러가 사이트맵으로만 닿는다. 사이트맵은
 * 그 주소가 **있다**는 것만 말해 주고 **중요하다**고는 말해 주지 않는다.
 *
 * 그래서 고르는 방법을 한 곳에 두고 검사도 한 번만 세운다. 다음에 섹션을
 * 늘릴 때 이 함수를 쓰면 같은 병이 다시 나지 않는다.
 *
 * ── 어떻게 도는가 ─────────────────────────────────────────
 * 목록을 자기 자리 **다음부터** 한 바퀴 돌려 늘어놓고, 그 순서를 유지한 채
 * 같은 갈래를 앞으로 모은다. 항목이 count보다 많으면 모두가 정확히 count번씩
 * 남의 이웃 목록에 들어간다 — 앞뒤가 고르게 이어진다.
 *
 * 같은 갈래를 먼저 채우는 것은 주제가 흐려지지 않게 하려는 것이다. 갈래가
 * 작아 자리가 남으면 나머지에서 이어 채운다.
 */

/**
 * @param all    전체 목록 (순서가 곧 원형의 순서다)
 * @param self   자기 항목. 목록에 없으면 앞에서부터 채운다
 * @param count  고를 개수
 * @param sameGroup 같은 갈래인지 — 생략하면 갈래를 안 가른다
 */
export function relatedWindow<T>(
  all: readonly T[],
  self: T | undefined,
  count: number,
  sameGroup?: (candidate: T, self: T) => boolean,
): T[] {
  if (all.length === 0 || count <= 0) return [];

  const at = self === undefined ? -1 : all.indexOf(self);
  // 자기 자리 다음부터 한 바퀴 — 자기 자신은 뺀다
  const ordered: T[] = [];
  for (let k = 1; k <= all.length; k++) {
    const item = all[(((at + k) % all.length) + all.length) % all.length];
    if (item !== self) ordered.push(item);
  }

  if (!sameGroup || self === undefined) return ordered.slice(0, count);

  // 도는 순서를 흐트리지 않고 같은 갈래만 앞으로 모은다
  const same = ordered.filter(t => sameGroup(t, self));
  const other = ordered.filter(t => !sameGroup(t, self));

  /*
   * 마지막 한 칸은 **다른 갈래에 남겨 둔다.**
   *
   * 같은 갈래만으로 채우면 갈래에 혼자 있는 항목은 아무에게도 닿지 못한다 —
   * 그 항목을 가리킬 수 있는 자리는 남의 "다른 갈래" 칸뿐인데, 다들 제 갈래로
   * 칸을 다 써 버리기 때문이다. /image의 palette가 그랬다(Analyse 갈래에 혼자).
   *
   * 한 칸을 비워 두면 갈래 밖으로도 길이 하나씩 나서 섹션 전체가 이어진다.
   * 갈래가 작아 same이 짧으면 원래대로 other가 이어 채운다.
   */
  const keepForOther = other.length > 0 && same.length >= count ? 1 : 0;
  return [...same.slice(0, count - keepForOther), ...other].slice(0, count);
}

/**
 * slug로 찾아 이웃을 고르는 흔한 꼴 — 도구 섹션 여덟 곳이 이 모양이다.
 */
export function relatedBySlug<T extends { slug: string }>(
  all: readonly T[],
  slug: string,
  count: number,
  sameGroup?: (candidate: T, self: T) => boolean,
): T[] {
  return relatedWindow(all, all.find(t => t.slug === slug), count, sameGroup);
}
