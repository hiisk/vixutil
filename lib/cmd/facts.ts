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

/** 갈래가 비면 다음 갈래에서 빌려 온다 — 이웃 0인 낱장을 만들지 않는다 */
function fill(me: CmdItem, limit: number): string[] {
  const same = CMD_ITEMS.filter(x => x.category === me.category && x.slug !== me.slug).map(x => x.slug);
  if (same.length >= limit) return same.slice(0, limit);
  const others = CMD_ITEMS.filter(x => x.category !== me.category).map(x => x.slug);
  return [...same, ...others].slice(0, limit);
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
