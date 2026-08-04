/**
 * 배터리 용량과 충전기 하나가 만드는 충전 — 시간, 전압, 그리고 기내 반입.
 *
 * mAh는 "몇 밀리암페어를 한 시간 흘릴 수 있나"일 뿐이라 전압을 곱해야 에너지가
 * 된다. 5000mAh 휴대폰과 5000mAh 노트북 배터리는 이름만 같고 담긴 것이 세 배
 * 넘게 다르다. 여기서는 제조사가 Wh를 적을 때 쓰는 3.7V로 통일한다.
 *
 * 충전기 쪽은 와트만 적혀 있지만 실제로는 전압과 전류의 곱이다. USB PD는
 * 아무 전압이나 쓰지 않고 정해진 단계 중 하나를 고르므로, 그 단계를 다시
 * 골라내면 케이블에 칩이 필요한지까지 따라 나온다.
 */
import { CELLS, CHARGERS, CAPACITIES, FLIGHT, MAX_AMP, NOMINAL, PD_VOLTS, PLAIN_CABLE_AMP, type Cell, slugOf } from './list.ts';

/**
 * 충전기가 낸 전력 중 배터리에 남는 몫.
 *
 * 나머지는 열이 된다 — 충전 중 뒷면이 따뜻한 것이 그 몫이다.
 */
export const EFFICIENCY = 0.9;

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Step {
  volt: number;
  amp: number;
}

export interface Neighbour {
  slug: string;
  mah: number;
  watt: number;
}

export interface BatteryFacts {
  cell: Cell;
  slug: string;
  /** 담긴 에너지(Wh) */
  wh: number;
  /** 가득 채우는 데 걸리는 시간(분) */
  minutes: number;
  /** 80%까지 걸리는 시간(분) — 나머지 20%는 이보다 더 걸린다 */
  to80: number;
  /** 배터리 용량 대비 충전 속도 — 1C면 한 시간에 가득 찬다 */
  crate: number;
  /** 이 충전기가 실제로 쓰는 전압과 전류 */
  step: Step;
  /** 칩이 든 케이블이 있어야 하는가 */
  needsEmarker: boolean;
  /** 이 충전기가 낼 수 있는 다른 단계들 */
  steps: Step[];
  /** 기내 반입 */
  flight: string;
  /** 5V로 뽑아 쓸 때 남는 양(mAh) — 보조배터리의 표기와 실제가 갈리는 자리 */
  usable5v: number;
  /** 한 시간 안에 이 배터리를 채우려면 필요한 출력(W) */
  hourWatt: number;
  faster: Neighbour | null;
  slower: Neighbour | null;
  bigger: Neighbour | null;
  smaller: Neighbour | null;
}

/** 담긴 에너지 — mAh에 공칭 전압을 곱한다 */
export const whOf = (mah: number): number => round((mah * NOMINAL) / 1000, 2);

/**
 * 이 충전기가 쓰는 전압과 전류.
 *
 * 같은 와트라도 전압을 올리면 전류가 내려간다. 칩 없는 케이블은 3A까지라,
 * 충전기는 그 안에 드는 가장 낮은 전압을 고른다 — 20W 충전기가 5V가 아니라
 * 9V를 쓰는 것이 그래서다(5V로는 4A가 된다).
 *
 * 3A 안에 드는 전압이 없으면 칩이 든 케이블을 쓰면서 전압을 끝까지 올린다.
 * 오래된 규격의 끝이 20V이고, 20V로 5A를 다 써도 모자라는 100W 위에서만
 * 확장 규격의 28V가 나온다.
 */
export const SPR_MAX_VOLT = 20;

export const stepOf = (watt: number): Step => {
  const plain = PD_VOLTS.filter(v => v <= SPR_MAX_VOLT).find(v => watt / v <= PLAIN_CABLE_AMP);
  const volt = plain ?? (watt / SPR_MAX_VOLT <= MAX_AMP ? SPR_MAX_VOLT : PD_VOLTS[PD_VOLTS.length - 1]);
  return { volt, amp: round(watt / volt, 2) };
};

/** 그 충전기가 낼 수 있는 단계 전부 — 5A를 넘는 것은 못 낸다 */
export const stepsOf = (watt: number): Step[] =>
  PD_VOLTS.filter(v => watt / v <= MAX_AMP).map(v => ({ volt: v, amp: round(watt / v, 2) }));

export const flightOf = (wh: number): string => FLIGHT.find(f => wh < f.below)!.key;

const near = (c: Cell): Neighbour => ({ slug: slugOf(c), mah: c.mah, watt: c.watt });

const step = (list: number[], value: number, by: number): number | null => {
  const i = list.indexOf(value) + by;
  return i >= 0 && i < list.length ? list[i] : null;
};

export function batteryFacts(c: Cell): BatteryFacts {
  const wh = whOf(c.mah);
  const full = (wh / (c.watt * EFFICIENCY)) * 60;
  const s = stepOf(c.watt);
  const fasterWatt = step(CHARGERS, c.watt, 1);
  const slowerWatt = step(CHARGERS, c.watt, -1);
  const biggerMah = step(CAPACITIES, c.mah, 1);
  const smallerMah = step(CAPACITIES, c.mah, -1);

  return {
    cell: c,
    slug: slugOf(c),
    wh,
    minutes: Math.round(full),
    to80: Math.round(full * 0.8),
    crate: round(c.watt / wh, 2),
    step: s,
    needsEmarker: s.amp > PLAIN_CABLE_AMP,
    steps: stepsOf(c.watt),
    // 기내 기준은 보여 주려고 끊은 값이 아니라 셈한 그대로에 대고 가른다
    flight: flightOf((c.mah * NOMINAL) / 1000),
    // 3.7V에 담긴 것을 5V로 올려 내보내면 전압 비만큼 줄고, 올리는 동안 또 샌다
    usable5v: Math.round((c.mah * NOMINAL) / 5 * EFFICIENCY),
    hourWatt: Math.ceil(wh / EFFICIENCY),
    faster: fasterWatt === null ? null : near({ mah: c.mah, watt: fasterWatt }),
    slower: slowerWatt === null ? null : near({ mah: c.mah, watt: slowerWatt }),
    bigger: biggerMah === null ? null : near({ mah: biggerMah, watt: c.watt }),
    smaller: smallerMah === null ? null : near({ mah: smallerMah, watt: c.watt }),
  };
}

/** 같은 충전기의 한 줄 */
export const atWatt = (watt: number): Cell[] => CELLS.filter(c => c.watt === watt);

/** 같은 배터리의 한 줄 */
export const atCapacity = (mah: number): Cell[] => CELLS.filter(c => c.mah === mah);
