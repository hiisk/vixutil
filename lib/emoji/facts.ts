/**
 * 이모지 한 장에 들어가는 값 — 목록에서 계산한다.
 *
 * 손으로 적는 것은 see뿐이고 이웃은 같은 갈래에서 나온다. 이웃이 모자라면 다른
 * 갈래에서 빌려 온다 — 사이트맵에만 있고 아무도 안 가리키는 낱장을 만들지
 * 않으려는 것이고, /cmd·/shortcut에 같은 장치를 뒀다.
 */
import { EM_ITEMS, emojiItem, codePoints, needsVs16, isZwj, type EmojiItem, type EmojiGroup } from './list.ts';

export interface EmojiFacts {
  item: EmojiItem;
  siblings: string[];
  related: string[];
  /** 코드포인트 몇 개로 된 글자인가 */
  cpCount: number;
  /** U+FE0F가 있어야 그림으로 나오는가 */
  vs16: boolean;
  /** ZWJ로 이어 붙였는가 */
  zwj: boolean;
  /** 공식 이름과 사람들이 치는 이름이 다른가 — 이 섹션에서 가장 쓸모 있는 자리다 */
  nameDiffers: boolean;
}

/**
 * 이웃을 갈래 안에서 자기 다음부터 원형으로 고른다.
 *
 * 앞에서 열 개를 잘라 오면 갈래의 앞쪽만 서로 가리키고 뒤쪽은 들어오는 링크가
 * 0이 된다. 감아 고르면 모든 이모지가 정확히 열 곳에서 가리켜진다.
 */
function fill(me: EmojiItem, limit: number): string[] {
  const same = EM_ITEMS.filter(x => x.group === me.group).map(x => x.slug);
  const at = same.indexOf(me.slug);
  const ring = same.slice(at + 1).concat(same.slice(0, at));
  if (ring.length >= limit) return ring.slice(0, limit);
  const all = EM_ITEMS.map(x => x.slug);
  const gAt = all.indexOf(me.slug);
  const others = all.slice(gAt + 1).concat(all.slice(0, gAt)).filter(s => !ring.includes(s));
  return [...ring, ...others].slice(0, limit);
}

export function emojiFacts(x: EmojiItem, limit = 10): EmojiFacts {
  const hand = (x.see ?? []).filter(s => emojiItem(s) && s !== x.slug);
  const rest = fill(x, limit).filter(s => !hand.includes(s));
  return {
    item: x,
    siblings: EM_ITEMS.filter(o => o.group === x.group && o.slug !== x.slug).map(o => o.slug),
    related: [...hand, ...rest].slice(0, limit),
    cpCount: codePoints(x.char),
    vs16: needsVs16(x.char),
    zwj: isZwj(x.char),
    nameDiffers: x.unicodeName.toLowerCase() !== x.common.toLowerCase(),
  };
}

/** 갈래별 개수 — 허브에서 뱃지로 쓴다 */
export function emojiCounts(): Record<EmojiGroup, number> {
  const out = {} as Record<EmojiGroup, number>;
  for (const x of EM_ITEMS) out[x.group] = (out[x.group] ?? 0) + 1;
  return out;
}
