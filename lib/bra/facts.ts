/**
 * 밑가슴둘레와 가슴 차이 하나가 만드는 브래지어 표기.
 *
 * 표기는 외울 표가 아니라 두 치수의 결과다.
 *
 *   앞의 숫자 = 밑가슴둘레를 5cm 눈금으로 읽은 값
 *   뒤의 알파벳 = (윗가슴 − 밑가슴 − 7.5) ÷ 2.5 칸째
 *
 * 한국·일본은 AA를 7.5cm 차이에 두고 2.5cm마다 한 컵씩 올린다. 그래서 차이가
 * 12cm면 (12 − 7.5) ÷ 2.5 = 1.8, 반올림해 두 칸이니 B다.
 *
 * 국제 표기가 같은 알파벳으로 다른 몸을 가리키는 것은 재는 자리가 달라서다.
 * 미국은 컵을 밑가슴이 아니라 **밴드 치수**에서 빼고, 그 밴드는 밑가슴보다
 * 크게 잡는다. 그래서 알파벳끼리 곧바로 옮길 수 없다 — 여기서는 두 치수를
 * 그대로 보이고, 옮겨 적는 대신 재는 자리를 밝힌다.
 */
import {
  AA_DIFF, BAND_STEP, CELLS, CM_PER_INCH, CUPS, CUP_STEP, DIFFS, UNDERS,
  type Cell, slugOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 표기의 앞 숫자 — 밑가슴을 5cm 눈금으로 */
export const bandOf = (under: number): number => Math.round(under / BAND_STEP) * BAND_STEP;

/** 차이가 몇 칸째인가 — AA가 0칸이다 */
export const cupIndexOf = (diff: number): number => Math.round((diff - AA_DIFF) / CUP_STEP);

/** 컵 이름 — 목록 밖으로 나가면 양 끝에서 멈춘다 */
export const cupOf = (diff: number): string => {
  const i = cupIndexOf(diff) + 1; // AAA가 목록의 0번이라 한 칸 민다
  return CUPS[Math.min(Math.max(i, 0), CUPS.length - 1)];
};

/** 그 컵이 상정한 차이(cm) — 이름에서 되돌린다 */
export const diffOfCup = (cup: string): number => (CUPS.indexOf(cup as (typeof CUPS)[number]) - 1) * CUP_STEP + AA_DIFF;

export interface Neighbour {
  slug: string;
  under: number;
  diff: number;
}

export interface BraFacts {
  cell: Cell;
  slug: string;
  /** 표기 — 75B처럼 */
  label: string;
  /** 표기의 앞 숫자 */
  band: number;
  /** 컵 이름 */
  cup: string;
  /** 윗가슴둘레(cm) */
  bust: number;
  /** 밑가슴을 인치로 */
  underInch: number;
  /** 그 컵이 상정한 차이(cm) — 잰 값과 얼마나 떨어졌는지 견준다 */
  cupDiff: number;
  /** 잰 값과 표기가 어긋난 폭(cm) */
  off: number;
  /** 한 컵이 덮는 폭(cm) */
  span: number;
  looser: Neighbour | null;
  tighter: Neighbour | null;
  bigger: Neighbour | null;
  smaller: Neighbour | null;
}

export function braFacts(c: Cell): BraFacts {
  const band = bandOf(c.under);
  const cup = cupOf(c.diff);
  const cupDiff = diffOfCup(cup);
  const ui = UNDERS.indexOf(c.under);
  const di = DIFFS.indexOf(c.diff);
  const near = (under: number, diff: number): Neighbour => ({ slug: slugOf({ under, diff }), under, diff });

  return {
    cell: c,
    slug: slugOf(c),
    label: `${band}${cup}`,
    band,
    cup,
    bust: round(c.under + c.diff),
    underInch: round(c.under / CM_PER_INCH),
    cupDiff: round(cupDiff),
    off: round(Math.abs(c.diff - cupDiff)),
    span: CUP_STEP,
    looser: ui + 1 < UNDERS.length ? near(UNDERS[ui + 1], c.diff) : null,
    tighter: ui > 0 ? near(UNDERS[ui - 1], c.diff) : null,
    bigger: di + 1 < DIFFS.length ? near(c.under, DIFFS[di + 1]) : null,
    smaller: di > 0 ? near(c.under, DIFFS[di - 1]) : null,
  };
}

/** 같은 밑가슴의 한 줄 */
export const atUnder = (under: number): Cell[] => DIFFS.map(diff => ({ under, diff }));

/** 같은 차이의 한 줄 */
export const atDiff = (diff: number): Cell[] => CELLS.filter(c => c.diff === diff);
