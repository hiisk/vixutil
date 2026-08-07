/**
 * 디스크 몇 장으로 무엇을 만들 수 있고 얼마가 남는가.
 *
 * 패리티를 쓰는 레벨은 그룹마다 패리티 장수를 떼고 나머지가 자료다.
 *
 *   쓸 수 있는 장수 = 전체 − 패리티 장수 × 그룹 수
 *
 * RAID 5는 그룹 하나에 패리티 한 장이라 n−1, RAID 6은 두 장이라 n−2다.
 * RAID 50·60은 그 그룹을 여럿 두고 이어 붙인 것이라 그룹 수만큼 곱해진다.
 * 따로 외울 공식이 아니라 한 줄에서 갈라져 나온다.
 *
 * 미러는 자료를 그대로 복사해 둔다. RAID 1은 몇 장이 있든 모두 같은 자료라
 * 한 장분만 쓸 수 있고, RAID 10은 두 장씩 짝지은 뒤 짝들을 이어 붙이므로
 * 절반이 남는다.
 *
 * 그룹을 어떻게 가르느냐는 RAID 50·60에서 진짜 선택이다. 그룹을 적게 두면
 * 용량이 늘고, 많이 두면 견딜 수 있는 고장이 는다. 이 표는 용량이 가장 큰
 * 쪽을 앞세우고 나머지 가름도 함께 적는다.
 */
import { DISKS, LEVELS, SIZES, type Cell, type Level, levelLabel, levelOf, slugOf } from './list.ts';

/** 디스크 겉면의 1TB는 10의 12제곱 바이트다 */
export const BYTES_PER_TB = 1e12;
/** 운영체제가 세는 1TiB는 2의 40제곱 바이트다 */
export const BYTES_PER_TIB = 2 ** 40;

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Split {
  /** 그룹 수 */
  groups: number;
  /** 한 그룹의 디스크 수 */
  perGroup: number;
  /** 쓸 수 있는 장수 */
  usable: number;
  /** 반드시 견디는 고장 수 */
  tolerates: number;
  /** 자리가 좋으면 견디는 고장 수 */
  bestCase: number;
}

/**
 * 디스크 n장을 이 레벨로 가르는 방법 전부.
 *
 * 그룹은 모두 같은 크기여야 한다 — 그래서 n의 약수만 그룹 수가 될 수 있다.
 * 일곱 장으로 RAID 50이 안 되는 까닭이 이것이다.
 */
export function splitsOf(l: Level, n: number): Split[] {
  const out: Split[] = [];

  if (l.mirror && l.mirrorWidth) {
    // RAID 10 — 정해진 폭의 미러를 여럿 만들어 이어 붙인다
    const w = l.mirrorWidth;
    if (n >= l.minPerGroup * l.minGroups && n % w === 0) {
      const groups = n / w;
      if (groups >= l.minGroups) {
        out.push({ groups, perGroup: w, usable: groups, tolerates: 1, bestCase: groups });
      }
    }
    return out;
  }

  if (l.mirror) {
    // RAID 1 — 전부가 같은 자료를 든다
    if (n >= l.minPerGroup) out.push({ groups: 1, perGroup: n, usable: 1, tolerates: n - 1, bestCase: n - 1 });
    return out;
  }

  if (l.minGroups === 1) {
    // 겹치지 않는 레벨 — 그룹은 언제나 하나다. 여럿으로 가르면 그건 50·60이다
    if (n < l.minPerGroup) return out;
    const usable = n - l.parity;
    if (usable < 1) return out;
    return [{
      groups: 1,
      perGroup: n,
      usable,
      tolerates: l.parity,
      bestCase: l.parity,
    }];
  }

  for (const groups of DIVISORS(n)) {
    if (groups < l.minGroups) continue;
    const perGroup = n / groups;
    if (perGroup < l.minPerGroup) continue;
    const usable = n - l.parity * groups;
    if (usable < 1) continue;
    out.push({
      groups,
      perGroup,
      usable,
      // 패리티가 없으면 한 장만 죽어도 배열이 깨진다
      tolerates: l.parity === 0 ? 0 : l.parity,
      bestCase: l.parity * groups,
    });
  }
  // 용량이 큰 쪽이 앞이고, 같으면 고장을 더 견디는 쪽이 앞이다
  return out.sort((a, b) => b.usable - a.usable || b.bestCase - a.bestCase);
}

/** n의 약수를 작은 것부터 */
function DIVISORS(n: number): number[] {
  const out: number[] = [];
  for (let d = 1; d <= n; d++) if (n % d === 0) out.push(d);
  return out;
}

export interface SizeRow {
  /** 디스크 한 장의 크기(TB, 겉면 표기) */
  size: number;
  /** 쓸 수 있는 용량(TB) */
  tb: number;
  /** 운영체제가 세는 용량(TiB) */
  tib: number;
  /** 패리티·미러로 나가는 용량(TB) */
  lostTb: number;
}

export interface RaidFacts {
  cell: Cell;
  slug: string;
  level: Level;
  levelText: string;
  disks: number;
  /** 이 장수로 만들 수 있는가 */
  possible: boolean;
  /** 못 만드는 까닭 */
  reason: 'too-few' | 'odd' | 'no-even-split' | null;
  /** 이 레벨에 필요한 최소 디스크 */
  minDisks: number;
  /** 앞세우는 가름 — 용량이 가장 큰 쪽 */
  best: Split | null;
  /** 다른 가름 */
  others: Split[];
  /** 쓸 수 있는 장수 */
  usable: number;
  /** 패리티·미러로 나가는 장수 */
  lost: number;
  /** 쓸 수 있는 비율(퍼센트) */
  efficiency: number;
  /** 크기별 용량 */
  sizes: SizeRow[];
  /** 한 장 줄인 칸 */
  fewer: string | null;
  /** 한 장 늘린 칸 */
  more: string | null;
}

/** 이 레벨을 만들 수 있는 가장 적은 장수 */
export const minDisksOf = (l: Level): number =>
  DISKS.find(n => splitsOf(l, n).length > 0) ?? Number.POSITIVE_INFINITY;

export function raidFacts(c: Cell): RaidFacts {
  const l = levelOf(c.level);
  if (!l) throw new Error(`레벨이 없다: ${c.level}`);

  const splits = splitsOf(l, c.disks);
  const best = splits[0] ?? null;
  const minDisks = minDisksOf(l);
  const usable = best?.usable ?? 0;
  const lost = best ? c.disks - best.usable : 0;

  const reason: RaidFacts['reason'] = best
    ? null
    : c.disks < minDisks
      ? 'too-few'
      : l.mirrorWidth && c.disks % l.mirrorWidth !== 0
        ? 'odd'
        : 'no-even-split';

  const near = (n: number) => (DISKS.includes(n) ? slugOf({ level: c.level, disks: n }) : null);

  return {
    cell: c,
    slug: slugOf(c),
    level: l,
    levelText: levelLabel(l),
    disks: c.disks,
    possible: best !== null,
    reason,
    minDisks,
    best,
    others: splits.slice(1),
    usable,
    lost,
    efficiency: round((usable / c.disks) * 100, 1),
    sizes: SIZES.map(size => ({
      size,
      tb: usable * size,
      tib: round((usable * size * BYTES_PER_TB) / BYTES_PER_TIB, 2),
      lostTb: lost * size,
    })),
    fewer: near(c.disks - 1),
    more: near(c.disks + 1),
  };
}

/** 같은 레벨의 한 줄 */
export const atLevel = (level: string): Cell[] => DISKS.map(disks => ({ level, disks }));

/** 같은 장수의 한 줄 */
export const atDisks = (disks: number): Cell[] => LEVELS.map(l => ({ level: l.key, disks }));
