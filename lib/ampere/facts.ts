/**
 * 가전과 회로 하나가 만드는 전류 — 몇 대까지 함께 쓸 수 있는가.
 *
 * 와트는 나라를 건너면 그대로지만 전류는 그렇지 않다. 1500W 드라이어가
 * 220V에서는 6.8A, 120V에서는 12.5A다. 차단기도 멀티탭도 암페어로 견디므로,
 * "함께 꽂아도 되는가"는 언제나 전류로 물어야 한다.
 *
 *   전류 = 소비전력 ÷ 전압
 *   함께 쓸 수 있는 대수 = (차단기 × 0.8) ÷ 전류
 *
 * 0.8은 이어 걸리는 부하를 차단기의 8할까지만 잡는 규칙이다. 차단기는 정격에서
 * 바로 끊기지 않고 한참 버티다 끊긴다 — 그 사이 전선이 먼저 뜨거워진다.
 */
import {
  APPLIANCES, CELLS, CIRCUITS, CONTINUOUS, STRIP_AMP,
  type Cell, applianceOf, circuitOf, slugOf,
} from './list.ts';
import { ampacityOf, areaOf } from '../wire/facts.ts';
import { SIZES, sizeLabel } from '../wire/list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Neighbour {
  slug: string;
  key: string;
  circuit: string;
}

export interface AmpereFacts {
  cell: Cell;
  slug: string;
  /** 소비전력(W) */
  watt: number;
  /** 전압(V) */
  volt: number;
  /** 차단기 용량(A) */
  breaker: number;
  /** 흐르는 전류(A) */
  amp: number;
  /** 이어 쓸 때 잡는 한도(A) */
  budget: number;
  /** 이 회로에 함께 꽂을 수 있는 대수 */
  together: number;
  /** 이 가전 하나가 회로를 넘기는가 */
  overload: boolean;
  /** 흔한 멀티탭 하나로 감당되는가 */
  stripOk: boolean;
  /** 이 전류를 흘리려면 적어도 이 굵기 — /wire의 값을 그대로 쓴다 */
  wire: string;
  /** 하루 두 시간 쓰면 한 달에(kWh) */
  monthlyKwh: number;
  stronger: Neighbour | null;
  weaker: Neighbour | null;
  bigger: Neighbour | null;
  smaller: Neighbour | null;
}

/** 전류 — 소비전력을 전압으로 나눈다 */
export const ampOf = (watt: number, volt: number): number => watt / volt;

/** 그 전류를 무리 없이 흘리는 가장 가는 굵기 */
export const wireFor = (amp: number): string => {
  const fits = [...SIZES].sort((a, b) => areaOf(a) - areaOf(b)).find(s => ampacityOf(areaOf(s)) >= amp);
  return sizeLabel(fits ?? SIZES[0]);
};

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

export function ampereFacts(c: Cell): AmpereFacts {
  const a = applianceOf(c.key);
  const circuit = circuitOf(c.circuit);
  if (!a || !circuit) throw new Error(`모르는 칸: ${slugOf(c)}`);
  const amp = ampOf(a.watt, circuit.volt);
  const budget = circuit.amp * CONTINUOUS;
  const ai = APPLIANCES.findIndex(x => x.key === c.key);
  const ci = CIRCUITS.findIndex(x => x.key === c.circuit);
  const near = (cell: Cell): Neighbour => ({ slug: slugOf(cell), key: cell.key, circuit: cell.circuit });

  return {
    cell: c,
    slug: slugOf(c),
    watt: a.watt,
    volt: circuit.volt,
    breaker: circuit.amp,
    amp: round(amp),
    budget: round(budget),
    together: Math.floor(budget / amp),
    overload: amp > budget,
    stripOk: amp <= STRIP_AMP,
    wire: wireFor(amp),
    // 하루 두 시간 × 서른 날
    monthlyKwh: round((a.watt * 2 * 30) / 1000, 1),
    stronger: step(APPLIANCES, ai, 1) === null ? null : near({ key: (step(APPLIANCES, ai, 1) as { key: string }).key, circuit: c.circuit }),
    weaker: step(APPLIANCES, ai, -1) === null ? null : near({ key: (step(APPLIANCES, ai, -1) as { key: string }).key, circuit: c.circuit }),
    bigger: step(CIRCUITS, ci, 1) === null ? null : near({ key: c.key, circuit: (step(CIRCUITS, ci, 1) as { key: string }).key }),
    smaller: step(CIRCUITS, ci, -1) === null ? null : near({ key: c.key, circuit: (step(CIRCUITS, ci, -1) as { key: string }).key }),
  };
}

/** 같은 가전의 한 줄 */
export const atAppliance = (key: string): Cell[] => CIRCUITS.map(c => ({ key, circuit: c.key }));

/** 같은 회로의 한 줄 */
export const atCircuit = (circuit: string): Cell[] => CELLS.filter(c => c.circuit === circuit);
