/** 테스트·퀴즈·체크리스트·제너레이터가 공유하는 최소 형태. */
export interface RelatedItem {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
}

/**
 * 같은 카테고리를 우선해 추천 목록을 고른다.
 *
 * 두 가지를 지킨다:
 *  1. 순환 선택 — 앞에서부터 고르면 목록 앞쪽 몇 개가 링크를 독식한다.
 *  2. 마지막 한 칸은 목록상 바로 다음 항목에 고정 — 전체가 하나의 순환 고리로
 *     이어져 어떤 항목도 인바운드 링크 0이 되지 않는다. 이게 없으면 자기
 *     카테고리에 혼자뿐인 항목이 고아 페이지가 된다.
 *
 * 무작위가 아니라 결정론적이어야 한다. 빌드마다 링크가 바뀌면 크롤러가 보는
 * 링크 구조가 흔들린다.
 */
export function pickRelated(
  items: readonly RelatedItem[],
  currentSlug: string,
  limit = 6,
): RelatedItem[] {
  const current = items.find(i => i.slug === currentSlug);
  if (!current) return [];

  const here = items.indexOf(current);
  const neighbor = items[(here + 1) % items.length];

  const sameCategory = items.filter(
    i => i.category === current.category && i.slug !== currentSlug && i.slug !== neighbor.slug,
  );
  const start = sameCategory.findIndex(i => items.indexOf(i) > here);
  const from = start === -1 ? 0 : start;

  const picked = Array.from(
    { length: Math.min(limit - 1, sameCategory.length) },
    (_, n) => sameCategory[(from + n) % sameCategory.length],
  );

  if (neighbor.slug !== currentSlug) picked.push(neighbor);

  // 그래도 자리가 남으면 다른 카테고리에서 순환하며 보충한다.
  if (picked.length < limit) {
    const taken = new Set(picked.map(i => i.slug));
    const others = items.filter(i => i.slug !== currentSlug && !taken.has(i.slug));
    for (let n = 0; picked.length < limit && n < others.length; n++) {
      picked.push(others[(here + n) % others.length]);
    }
  }

  return picked;
}
