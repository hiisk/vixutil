/**
 * 원소 하나의 자리와 성질 — 원자번호에서 계산한다.
 *
 * 주기율표는 번호를 순서대로 늘어놓다가 정해진 자리에서 줄을 바꾼 표다.
 * 그러니 주기도 족도 블록도 번호에서 나온다. 전자 배치도 쌓임 순서를 따라
 * 채우면 나오므로, 규칙에서 벗어나는 몇 개만 예외로 적어 둔다.
 */
import { ELEMENTS, PERIOD_ENDS, type Element } from './list.ts';

export type Block = 's' | 'p' | 'd' | 'f';

export type Category =
  | 'alkali'
  | 'alkaline'
  | 'transition'
  | 'post-transition'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble'
  | 'lanthanide'
  | 'actinide';

/** 금속과 비금속 사이에 걸친 원소들 — 경계는 계산으로 나오지 않아 적어 둔다 */
const METALLOIDS = new Set([5, 14, 32, 33, 51, 52, 84]);

/** 족은 아니지만 비금속으로 묶이는 것들 — 수소와 14~16족 위쪽 */
const NONMETALS = new Set([1, 6, 7, 8, 15, 16, 34]);

export const periodOf = (z: number): number => PERIOD_ENDS.findIndex(end => z <= end) + 1;

/** 주기 안에서 몇 번째인가 — 1부터 */
const indexInPeriod = (z: number): number => {
  const period = periodOf(z);
  return z - (period === 1 ? 0 : PERIOD_ENDS[period - 2]);
};

/**
 * 족 — 란타넘족과 악티늄족은 표 아래에 따로 빼는 자리라 0으로 둔다.
 */
export function groupOf(z: number): number {
  const period = periodOf(z);
  const i = indexInPeriod(z);
  if (period === 1) return i === 1 ? 1 : 18;
  if (period === 2 || period === 3) return i <= 2 ? i : i + 10;
  if (period === 4 || period === 5) return i;
  // 6·7주기는 가운데에 f블록 열넷이 끼어 있다
  if (i <= 2) return i;
  if (i <= 16) return 0;
  return i - 14;
}

export function blockOf(z: number): Block {
  const group = groupOf(z);
  if (group === 0) return 'f';
  if (group <= 2) return 's';
  if (group >= 13) return z === 2 ? 's' : 'p';
  return 'd';
}

export function categoryOf(z: number): Category {
  const period = periodOf(z);
  const group = groupOf(z);
  if (group === 0) return period === 6 ? 'lanthanide' : 'actinide';
  if (group === 18) return 'noble';
  if (group === 17) return 'halogen';
  if (METALLOIDS.has(z)) return 'metalloid';
  if (NONMETALS.has(z)) return 'nonmetal';
  if (group === 1) return z === 1 ? 'nonmetal' : 'alkali';
  if (group === 2) return 'alkaline';
  if (group >= 3 && group <= 12) return 'transition';
  return 'post-transition';
}

/** 오비탈을 채우는 순서 — 마델룽 규칙대로 (n+l)이 작은 것부터 */
const ORBITALS: [string, number][] = [
  ['1s', 2], ['2s', 2], ['2p', 6], ['3s', 2], ['3p', 6], ['4s', 2], ['3d', 10],
  ['4p', 6], ['5s', 2], ['4d', 10], ['5p', 6], ['6s', 2], ['4f', 14], ['5d', 10],
  ['6p', 6], ['7s', 2], ['5f', 14], ['6d', 10], ['7p', 6],
];

/**
 * 전자 배치 — 쌓임 순서대로 채운다.
 *
 * 크로뮴과 구리처럼 규칙에서 한 칸 벗어나는 원소가 스물 남짓 있다. 그런
 * 원소는 여기서 다루지 않고 "규칙대로라면" 이라는 값으로 둔다. 표에서
 * 예외까지 외우는 일은 이 화면의 몫이 아니다.
 */
export function configOf(z: number): string {
  const parts: string[] = [];
  let left = z;
  for (const [name, cap] of ORBITALS) {
    if (left <= 0) break;
    const put = Math.min(cap, left);
    parts.push(`${name}${put}`);
    left -= put;
  }
  return parts.join(' ');
}

/** 가장 바깥 껍질의 전자 수 — 주족 원소에서만 뜻이 있다 */
export function valenceOf(z: number): number | null {
  const group = groupOf(z);
  if (group === 0 || (group >= 3 && group <= 12)) return null;
  if (z === 2) return 2;
  return group <= 2 ? group : group - 10;
}

export interface ElementFacts {
  z: number;
  symbol: string;
  mass: number;
  period: number;
  /** 0이면 표 아래로 빠지는 란타넘·악티늄족 */
  group: number;
  block: Block;
  category: Category;
  config: string;
  /** 짧게 적은 전자 배치 — 앞선 비활성 기체로 묶는다 */
  shortConfig: string;
  valence: number | null;
  /** 중성자 수 — 가장 흔한 동위원소 기준(원자량을 반올림한 값에서 뺀다) */
  neutrons: number;
  /** 표에서의 자리 — 그리는 쪽이 다시 계산하지 않게 */
  cell: { row: number; col: number };
}

/** 비활성 기체 — 짧은 배치를 적을 때 앞을 묶는 기준이 된다 */
const NOBLE = [2, 10, 18, 36, 54, 86];

export function elementFacts(x: Element): ElementFacts {
  const period = periodOf(x.z);
  const group = groupOf(x.z);
  const before = [...NOBLE].reverse().find(n => n < x.z);
  const core = before ? ELEMENTS[before - 1].symbol : '';
  const full = configOf(x.z);
  const coreLen = before ? configOf(before).split(' ').length : 0;

  return {
    z: x.z,
    symbol: x.symbol,
    mass: x.mass,
    period,
    group,
    block: blockOf(x.z),
    category: categoryOf(x.z),
    config: full,
    shortConfig: before ? `[${core}] ${full.split(' ').slice(coreLen).join(' ')}` : full,
    valence: valenceOf(x.z),
    neutrons: Math.round(x.mass) - x.z,
    // 란타넘·악티늄족은 표 아래 두 줄에 따로 놓는다
    cell: group === 0
      ? { row: period === 6 ? 9 : 10, col: x.z - (period === 6 ? 57 : 89) + 3 }
      : { row: period, col: group },
  };
}

/** 같은 족의 다른 원소들 — 성질이 비슷한 줄이다 */
export function sameGroup(z: number): Element[] {
  const group = groupOf(z);
  if (!group) return ELEMENTS.filter(o => groupOf(o.z) === 0 && periodOf(o.z) === periodOf(z) && o.z !== z);
  return ELEMENTS.filter(o => groupOf(o.z) === group && o.z !== z);
}

/** 번호가 앞뒤인 원소들 */
export const neighbours = (z: number, span = 3): Element[] =>
  ELEMENTS.filter(o => Math.abs(o.z - z) <= span && o.z !== z);

export const elementsOfCategory = (c: Category): Element[] => ELEMENTS.filter(x => categoryOf(x.z) === c);

export const CATEGORIES: Category[] = [
  'nonmetal', 'noble', 'halogen', 'alkali', 'alkaline',
  'transition', 'post-transition', 'metalloid', 'lanthanide', 'actinide',
];
