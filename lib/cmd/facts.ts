/**
 * 명령 한 장에 들어가는 값 — 목록에서 계산한다.
 *
 * 손으로 적는 것은 see(같이 볼 명령)뿐이고, 나머지는 갈래에서 나온다. 같은
 * 갈래의 다른 명령을 이웃으로 잇는 것이 이 섹션의 내부 링크다 — 사이트맵에만
 * 있고 아무도 안 가리키는 낱장이 생기지 않게, 이웃이 비면 갈래 순서로 채운다.
 */
import { CMD_ITEMS, cmdItem, type CmdItem, type CmdCategory } from './list.ts';

export interface CmdFacts {
  item: CmdItem;
  /** 같은 갈래의 다른 명령 */
  siblings: string[];
  /** 손으로 이어 둔 것 + 같은 갈래로 채운 것 */
  related: string[];
  /** 옵션이 몇 개인지 — 화면에서 표를 접을지 정한다 */
  flagCount: number;
}

/**
 * 이웃을 갈래 안에서 자기 다음부터 원형으로 고른다.
 *
 * 앞에서 여덟 개를 잘라 오면 갈래의 앞쪽만 서로 가리키고, 아홉째부터는 들어오는
 * 링크가 0이 된다 — 사이트맵에는 있고 아무 페이지도 안 가리키는 낱장이다.
 * 자기 자리 다음부터 감아 고르면 모든 항목이 정확히 여덟 곳에서 가리켜진다.
 *
 * 갈래에 여덟이 안 차면 다른 갈래에서 빌려 오는데, 그때도 자기 자리부터 감는다.
 */
function fill(me: CmdItem, limit: number): string[] {
  const same = CMD_ITEMS.filter(x => x.category === me.category).map(x => x.slug);
  const at = same.indexOf(me.slug);
  const ring = same.slice(at + 1).concat(same.slice(0, at));
  if (ring.length >= limit) return ring.slice(0, limit);
  const all = CMD_ITEMS.map(x => x.slug);
  const gAt = all.indexOf(me.slug);
  const others = all.slice(gAt + 1).concat(all.slice(0, gAt)).filter(s => !ring.includes(s));
  return [...ring, ...others].slice(0, limit);
}

export function cmdFacts(x: CmdItem, limit = 8): CmdFacts {
  const hand = (x.see ?? []).filter(s => cmdItem(s) && s !== x.slug);
  const rest = fill(x, limit).filter(s => !hand.includes(s));
  return {
    item: x,
    siblings: CMD_ITEMS.filter(o => o.category === x.category && o.slug !== x.slug).map(o => o.slug),
    related: [...hand, ...rest].slice(0, limit),
    flagCount: x.flags.length,
  };
}

/** 갈래별 개수 — 허브에서 뱃지로 쓴다 */
export function cmdCounts(): Record<CmdCategory, number> {
  const out = {} as Record<CmdCategory, number>;
  for (const x of CMD_ITEMS) out[x.category] = (out[x.category] ?? 0) + 1;
  return out;
}
