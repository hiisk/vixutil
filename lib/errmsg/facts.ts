/**
 * 오류 한 장에 들어가는 값 — 목록에서 계산한다.
 *
 * 이웃은 같은 갈래에서 자기 다음부터 원형으로 고른다. 앞에서 여덟 개를 잘라
 * 오면 갈래의 뒤쪽이 들어오는 링크 0이 되기 때문이다 — /cmd·/shortcut·/emoji가
 * 같은 이유로 같은 장치를 쓴다.
 */
import { ERR_ITEMS, errItem, hasFix, type ErrItem, type ErrCategory } from './list.ts';

export interface ErrFacts {
  item: ErrItem;
  siblings: string[];
  related: string[];
  /** 고치는 명령이 있는가 */
  fixable: boolean;
  /** 문구가 몇 낱말인가 — 긴 것은 화면에서 줄을 접는다 */
  words: number;
}

function fill(me: ErrItem, limit: number): string[] {
  const same = ERR_ITEMS.filter(x => x.category === me.category).map(x => x.slug);
  const at = same.indexOf(me.slug);
  const ring = same.slice(at + 1).concat(same.slice(0, at));
  if (ring.length >= limit) return ring.slice(0, limit);
  const all = ERR_ITEMS.map(x => x.slug);
  const gAt = all.indexOf(me.slug);
  const others = all.slice(gAt + 1).concat(all.slice(0, gAt)).filter(s => !ring.includes(s));
  return [...ring, ...others].slice(0, limit);
}

export function errFacts(x: ErrItem, limit = 8): ErrFacts {
  const hand = (x.see ?? []).filter(s => errItem(s) && s !== x.slug);
  const rest = fill(x, limit).filter(s => !hand.includes(s));
  return {
    item: x,
    siblings: ERR_ITEMS.filter(o => o.category === x.category && o.slug !== x.slug).map(o => o.slug),
    related: [...hand, ...rest].slice(0, limit),
    fixable: hasFix(x),
    words: x.message.trim().split(/\s+/).length,
  };
}

/** 갈래별 개수 — 허브에서 뱃지로 쓴다 */
export function errCounts(): Record<ErrCategory, number> {
  const out = {} as Record<ErrCategory, number>;
  for (const x of ERR_ITEMS) out[x.category] = (out[x.category] ?? 0) + 1;
  return out;
}
