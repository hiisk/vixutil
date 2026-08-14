/**
 * 넓이와 쓰임 하나가 만드는 조명 — 루멘에서 와트로.
 *
 * 순서가 거꾸로 되기 쉽다. "몇 와트짜리를 달까"부터 묻지만, 와트는 전기를 얼마나
 * 먹는지일 뿐 밝기가 아니다. 밝기는 루멘이고, 필요한 루멘은 이렇게 나온다.
 *
 *   필요한 빛 = 바닥에 닿아야 할 밝기(lux) × 넓이(m²)
 *   와트 = 필요한 빛 ÷ 광원의 효율(lm/W)
 *
 * 같은 1000루멘을 LED는 10W로, 백열은 77W로 낸다. 와트로 고르던 버릇이 남아
 * "60W짜리"를 찾게 되지만, 찾아야 할 것은 800루멘이다.
 */
import { AREAS, BULB_LUMEN, CELLS, PYEONG, SOURCES, USES, type Cell, slugOf, usageOf } from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Watt {
  key: string;
  efficacy: number;
  /** 그 광원으로 이 밝기를 내는 데 드는 전력(W) */
  watt: number;
}

export interface Neighbour {
  slug: string;
  area: number;
  use: string;
}

export interface LumenFacts {
  cell: Cell;
  slug: string;
  /** 바닥에 닿아야 하는 밝기(lux) */
  lux: number;
  /** 조명이 내야 하는 빛의 양(lm) */
  lumen: number;
  /** 넓이를 평으로 */
  pyeong: number;
  /** 광원마다의 전력 */
  watts: Watt[];
  /** 800루멘 전구로 몇 개 */
  bulbs: number;
  /** LED로 하루 다섯 시간, 한 달 쓰면(kWh) */
  monthlyKwh: number;
  /** 백열로 같은 밝기를 낼 때 더 드는 전력(W) */
  wasted: number;
  brighter: Neighbour | null;
  dimmer: Neighbour | null;
  bigger: Neighbour | null;
  smaller: Neighbour | null;
}

/** 필요한 빛의 양 — 밝기에 넓이를 곱한다 */
export const lumenOf = (lux: number, area: number): number => lux * area;

/** 그 빛을 내는 데 드는 전력 */
export const wattOf = (lumen: number, efficacy: number): number => lumen / efficacy;

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

export function lumenFacts(c: Cell): LumenFacts {
  const use = usageOf(c.use);
  if (!use) throw new Error(`모르는 쓰임: ${c.use}`);
  const lumen = lumenOf(use.lux, c.area);
  const led = SOURCES.find(s => s.key === 'led')!;
  const bulbSource = SOURCES.find(s => s.key === 'incandescent')!;
  const ai = AREAS.indexOf(c.area);
  const ui = USES.findIndex(u => u.key === c.use);
  const near = (cell: Cell): Neighbour => ({ slug: slugOf(cell), area: cell.area, use: cell.use });

  return {
    cell: c,
    slug: slugOf(c),
    lux: use.lux,
    lumen,
    pyeong: round(c.area / PYEONG),
    watts: SOURCES.map(s => ({ key: s.key, efficacy: s.efficacy, watt: round(wattOf(lumen, s.efficacy)) })),
    bulbs: Math.ceil(lumen / BULB_LUMEN),
    // 하루 다섯 시간 × 서른 날
    monthlyKwh: round((wattOf(lumen, led.efficacy) * 5 * 30) / 1000, 1),
    wasted: Math.round(wattOf(lumen, bulbSource.efficacy) - wattOf(lumen, led.efficacy)),
    brighter: step(USES, ui, 1) === null ? null : near({ area: c.area, use: (step(USES, ui, 1) as { key: string }).key }),
    dimmer: step(USES, ui, -1) === null ? null : near({ area: c.area, use: (step(USES, ui, -1) as { key: string }).key }),
    bigger: step(AREAS, ai, 1) === null ? null : near({ area: step(AREAS, ai, 1) as number, use: c.use }),
    smaller: step(AREAS, ai, -1) === null ? null : near({ area: step(AREAS, ai, -1) as number, use: c.use }),
  };
}

/** 같은 넓이의 한 줄 */
export const atArea = (area: number): Cell[] => USES.map(u => ({ area, use: u.key }));

/** 같은 쓰임의 한 줄 */
export const atUse = (use: string): Cell[] => CELLS.filter(c => c.use === use);
