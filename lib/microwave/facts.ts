/**
 * 출력 둘 사이에서 조리 시간을 옮긴다.
 *
 *   새 시간 = 원래 시간 × (원래 출력 ÷ 새 출력)
 *
 * 700W에서 3분이면 1000W에서는 3 × 700 ÷ 1000 = 2분 6초다. 출력이 커질수록
 * 시간이 짧아지는 반비례라, 두 출력이 같으면 비율이 1이 되어 시간이 그대로다.
 *
 * 한 가지 덧붙일 것이 있다. 이 환산은 넣은 에너지를 맞추는 것일 뿐, 데워지는
 * 방식까지 같게 만들지는 못한다. 출력이 높으면 겉이 먼저 뜨거워지므로 중간에
 * 한 번 저어 주거나 시간을 나누어 돌리는 편이 고르게 익는다.
 */
import { SAMPLE_SECONDS, WATTS, type Cell, slugOf } from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 시간에 곱할 값 — 원래 출력 ÷ 새 출력 */
export const ratioOf = (from: number, to: number): number => from / to;

/** 옮긴 시간(초) */
export const convertSeconds = (seconds: number, from: number, to: number): number =>
  seconds * ratioOf(from, to);

export interface Sample {
  /** 기준 시간(초) */
  seconds: number;
  /** 옮긴 시간(초) */
  converted: number;
  /** 분 자리 */
  minutes: number;
  /** 나머지 초 */
  rest: number;
}

export interface Neighbour {
  slug: string;
  from: number;
  to: number;
}

export interface MicrowaveFacts {
  cell: Cell;
  slug: string;
  /** 시간에 곱할 값 */
  ratio: number;
  /** 같은 출력인가 */
  same: boolean;
  /** 시간이 늘어나는가 */
  longer: boolean;
  /** 백분율로 본 변화 — 양수면 길어진다 */
  changePct: number;
  samples: Sample[];
  /** 앞뒤를 뒤집은 칸 */
  reverse: Neighbour;
  weaker: Neighbour | null;
  stronger: Neighbour | null;
}

export function microwaveFacts(c: Cell): MicrowaveFacts {
  const ratio = ratioOf(c.from, c.to);
  const i = WATTS.indexOf(c.to);
  const near = (to: number): Neighbour => ({ slug: slugOf({ from: c.from, to }), from: c.from, to });

  return {
    cell: c,
    slug: slugOf(c),
    ratio: round(ratio, 3),
    same: c.from === c.to,
    longer: ratio > 1,
    changePct: round((ratio - 1) * 100),
    samples: SAMPLE_SECONDS.map(seconds => {
      const converted = Math.round(convertSeconds(seconds, c.from, c.to));
      return { seconds, converted, minutes: Math.floor(converted / 60), rest: converted % 60 };
    }),
    reverse: { slug: slugOf({ from: c.to, to: c.from }), from: c.to, to: c.from },
    weaker: i > 0 ? near(WATTS[i - 1]) : null,
    stronger: i + 1 < WATTS.length ? near(WATTS[i + 1]) : null,
  };
}

/** 같은 포장지 출력의 한 줄 */
export const atFrom = (from: number): Cell[] => WATTS.map(to => ({ from, to }));

/** 같은 내 전자레인지 출력의 한 줄 */
export const atTo = (to: number): Cell[] => WATTS.map(from => ({ from, to }));
