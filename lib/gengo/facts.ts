/**
 * 연호와 연차 하나가 만드는 서기, 그리고 연호가 갈리는 자리.
 *
 *   서기 = 연차 + 그 연호의 기준 수
 *
 * 明治는 1867, 大正은 1911, 昭和는 1925, 平成은 1988, 令和는 2018을 더한다.
 * 기준 수가 다른 것은 개원한 해가 다르기 때문이지 규칙이 다른 게 아니다 —
 * 어느 연호든 원년이 개원한 해에 앉는다.
 *
 * 서기 한 해에 연호가 둘 앉는 자리가 넷 있다. 1912년은 明治45년이면서
 * 大正원년이고, 1926년은 大正15년이면서 昭和원년, 1989년은 昭和64년이면서
 * 平成원년, 2019년은 平成31년이면서 令和원년이다. 이 표는 그 겹침을 지우지
 * 않고 양쪽에서 서로를 가리킨다.
 */
import { CELLS, ERAS, type Cell, type Era, eraOf, slugOf } from './list.ts';

/** 연차에서 서기로 */
export const gregorianOf = (base: number, year: number): number => base + year;

/** 서기에서 연차로 — 되돌리는 길이다 */
export const eraYearOf = (base: number, gregorian: number): number => gregorian - base;

export interface Overlap {
  slug: string;
  era: string;
  year: number;
  /** 같은 날에 갈렸는가 — 즉일 개원이면 참이다 */
  sameDay: boolean;
}

export interface Neighbour {
  slug: string;
  era: string;
  year: number;
}

export interface GengoFacts {
  cell: Cell;
  slug: string;
  era: Era;
  /** 서기 연도 */
  gregorian: number;
  /** 원년인가 */
  first: boolean;
  /** 그 연호의 마지막 해인가 */
  final: boolean;
  /** 같은 서기 연도에 앉는 다른 연호 */
  overlap: Overlap | null;
  prev: Neighbour | null;
  next: Neighbour | null;
}

export function gengoFacts(c: Cell): GengoFacts {
  const era = eraOf(c.era);
  if (!era) throw new Error(`연호가 없다: ${c.era}`);
  const gregorian = gregorianOf(era.base, c.year);
  const i = ERAS.findIndex(e => e.key === era.key);
  const first = c.year === 1;
  const final = c.year === era.last;

  /*
   * 겹치는 자리는 둘 중 하나다 — 내가 마지막 해라면 다음 연호의 원년과,
   * 내가 원년이라면 앞 연호의 마지막 해와 같은 서기에 앉는다.
   */
  let overlap: Overlap | null = null;
  const nextEra = ERAS[i + 1];
  const prevEra = ERAS[i - 1];
  if (final && nextEra && gregorianOf(nextEra.base, 1) === gregorian) {
    overlap = { slug: `${nextEra.key}-1`, era: nextEra.key, year: 1, sameDay: nextEra.sameDay };
  } else if (first && prevEra && gregorianOf(prevEra.base, prevEra.last) === gregorian) {
    overlap = { slug: `${prevEra.key}-${prevEra.last}`, era: prevEra.key, year: prevEra.last, sameDay: era.sameDay };
  }

  const step = (delta: number): Neighbour | null => {
    const year = c.year + delta;
    if (year >= 1 && year <= era.last) return { slug: slugOf({ era: era.key, year }), era: era.key, year };
    const other = delta < 0 ? prevEra : nextEra;
    if (!other) return null;
    const y = delta < 0 ? other.last : 1;
    return { slug: slugOf({ era: other.key, year: y }), era: other.key, year: y };
  };

  return {
    cell: c,
    slug: slugOf(c),
    era,
    gregorian,
    first,
    final,
    overlap,
    prev: step(-1),
    next: step(1),
  };
}

/** 같은 연호의 모든 해 */
export const atEra = (era: string): Cell[] => CELLS.filter(c => c.era === era);

/** 그 서기 연도에 앉는 칸들 — 겹치는 해라면 둘이다 */
export const atGregorian = (gregorian: number): Cell[] =>
  ERAS.flatMap(e => {
    const year = eraYearOf(e.base, gregorian);
    return year >= 1 && year <= e.last ? [{ era: e.key, year }] : [];
  });
