/**
 * 단축키 한 장에 들어가는 값 — 목록에서 계산한다.
 *
 * 손으로 적는 것은 see뿐이고 이웃은 같은 앱·같은 갈래에서 나온다. 이웃이
 * 모자라면 다른 앱에서 빌려 온다 — 사이트맵에만 있고 아무도 안 가리키는
 * 낱장을 만들지 않으려는 것이고, /cmd에서 같은 이유로 같은 장치를 뒀다.
 */
import { SC_ITEMS, scItem, scDiffers, type ScItem, type ScApp } from './list.ts';
import { NA } from './types.ts';

export interface ScFacts {
  item: ScItem;
  /** 같은 앱의 다른 단축키 */
  siblings: string[];
  /** 손으로 이은 것 + 같은 앱·갈래로 채운 것 */
  related: string[];
  /** 윈도우와 맥이 다른가 */
  differs: boolean;
  /** 키를 몇 개 함께 누르는가 — 'Ctrl+Shift+P'는 3 */
  keyCount: number;
  /** 다른 앱에서 같은 일을 하는 단축키 */
  crossApp: string[];
}

/**
 * 'Ctrl+Shift+P' → 3. 'Ctrl++'처럼 더하기가 키인 경우가 있어 빈 조각은 +로 되돌린다.
 * 그 운영체제에 없는 자리(NA)는 누를 키가 없으니 0이다.
 */
export function keyCount(combo: string): number {
  if (combo === NA) return 0;
  const parts = combo.split('+').map(p => p.trim());
  return parts.filter((p, i) => p !== '' || i === parts.length - 1).length;
}

/**
 * 이웃을 같은 앱 안에서 자기 다음부터 원형으로 고른다.
 *
 * 앞에서 여덟 개를 잘라 오면 앱의 앞쪽만 서로 가리키고 뒤쪽은 들어오는 링크가
 * 0이 된다. 자기 자리 다음부터 감아 고르면 모든 단축키가 여덟 곳에서 가리켜진다.
 * 같은 갈래를 먼저 두는 것은 그 다음 문제라, 원형으로 돌린 뒤 갈래가 같은 것을
 * 앞으로 끌어올린다 — 순서만 바뀌고 어느 것도 빠지지 않는다.
 */
function fill(me: ScItem, limit: number): string[] {
  const app = SC_ITEMS.filter(x => x.app === me.app).map(x => x.slug);
  const at = app.indexOf(me.slug);
  const ring = app.slice(at + 1).concat(app.slice(0, at));
  const sameGroup = (s: string) => SC_ITEMS.find(x => x.slug === s)?.group === me.group;
  const sorted = [...ring.filter(sameGroup), ...ring.filter(s => !sameGroup(s))];
  if (sorted.length >= limit) return sorted.slice(0, limit);
  const all = SC_ITEMS.map(x => x.slug);
  const gAt = all.indexOf(me.slug);
  const others = all.slice(gAt + 1).concat(all.slice(0, gAt)).filter(s => !sorted.includes(s));
  return [...sorted, ...others].slice(0, limit);
}

export function scFacts(x: ScItem, limit = 8): ScFacts {
  const hand = (x.see ?? []).filter(s => scItem(s) && s !== x.slug);
  const rest = fill(x, limit).filter(s => !hand.includes(s));
  return {
    item: x,
    siblings: SC_ITEMS.filter(o => o.app === x.app && o.slug !== x.slug).map(o => o.slug),
    related: [...hand, ...rest].slice(0, limit),
    differs: scDiffers(x),
    // 윈도우에 없는 기능이면 맥 조합을 센다 — 0을 보여 주면 화면이 거짓말을 한다
    keyCount: keyCount(x.win === NA ? x.mac : x.win),
    crossApp: SC_ITEMS.filter(o => o.app !== x.app && o.action.toLowerCase() === x.action.toLowerCase()).map(o => o.slug).slice(0, 4),
  };
}

/** 앱별 개수 — 허브에서 뱃지로 쓴다 */
export function scCounts(): Record<ScApp, number> {
  const out = {} as Record<ScApp, number>;
  for (const x of SC_ITEMS) out[x.app] = (out[x.app] ?? 0) + 1;
  return out;
}
