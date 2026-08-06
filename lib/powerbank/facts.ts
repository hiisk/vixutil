/**
 * 표기 용량과 전압 하나가 만드는 와트시, 그리고 기내 반입 여부.
 *
 *   와트시 = mAh × 전압 ÷ 1000
 *
 * 20,000mAh를 3.7V로 세면 74Wh라 자유롭게 들고 탈 수 있다. 같은 20,000mAh를
 * 11.1V 팩으로 만들면 222Wh가 되어 아예 못 탄다 — mAh만 보고 판단할 수 없는
 * 이유가 이것이다.
 *
 * 반대 방향의 혼동도 있다. mAh 표기는 셀 전압을 기준으로 하는데 실제로 USB로
 * 나올 때는 5V이므로, 5V 기준으로 다시 세면 수가 줄어든다. 20,000mAh(3.7V)는
 * 5V 기준으로 14,800mAh다. 충전기가 "표기보다 덜 채워 준다"고 느끼는 몫의
 * 상당 부분이 여기서 나온다(나머지는 변환 손실이다).
 */
import {
  APPROVAL_WH, CAPACITIES, FREE_WH, USB_VOLTS, VOLTAGES,
  type Cell, slugOf, voltageOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 와트시 = mAh × 전압 ÷ 1000 */
export const whOf = (mah: number, volts: number): number => (mah * volts) / 1000;

/** 와트시에서 다시 mAh로 — 기준 전압을 바꿔 셀 때 쓴다 */
export const mahOf = (wh: number, volts: number): number => (wh * 1000) / volts;

export type Verdict = 'free' | 'approval' | 'banned';

/** 규정이 어느 갈래에 두는가 */
export function verdictOf(wh: number): Verdict {
  if (wh <= FREE_WH) return 'free';
  return wh <= APPROVAL_WH ? 'approval' : 'banned';
}

export interface Neighbour {
  slug: string;
  mah: number;
  volt: string;
}

export interface PowerFacts {
  cell: Cell;
  slug: string;
  volts: number;
  /** 와트시 */
  wh: number;
  /** 5V 기준으로 다시 센 용량(mAh) */
  usbMah: number;
  verdict: Verdict;
  /** 자유롭게 들고 탈 수 있는 위끝까지 얼마나 남았나(Wh) — 음수면 넘어섰다 */
  headroom: number;
  /** 그 전압에서 100Wh를 넘지 않는 가장 큰 용량(mAh) */
  maxFree: number;
  smaller: Neighbour | null;
  larger: Neighbour | null;
}

export function powerFacts(c: Cell): PowerFacts {
  const v = voltageOf(c.volt);
  if (!v) throw new Error(`전압이 없다: ${c.volt}`);
  const wh = whOf(c.mah, v.volts);
  const i = CAPACITIES.indexOf(c.mah);
  const near = (mah: number): Neighbour => ({ slug: slugOf({ mah, volt: c.volt }), mah, volt: c.volt });

  return {
    cell: c,
    slug: slugOf(c),
    volts: v.volts,
    wh: round(wh),
    usbMah: round(mahOf(wh, USB_VOLTS), 0),
    verdict: verdictOf(wh),
    headroom: round(FREE_WH - wh),
    maxFree: round(mahOf(FREE_WH, v.volts), 0),
    smaller: i > 0 ? near(CAPACITIES[i - 1]) : null,
    larger: i + 1 < CAPACITIES.length ? near(CAPACITIES[i + 1]) : null,
  };
}

/** 같은 전압의 한 줄 */
export const atVoltage = (volt: string): Cell[] => CAPACITIES.map(mah => ({ mah, volt }));

/** 같은 용량의 한 줄 */
export const atCapacity = (mah: number): Cell[] => VOLTAGES.map(v => ({ mah, volt: v.key }));
