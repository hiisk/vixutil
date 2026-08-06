/**
 * 대상과 치수 하나가 만드는 옷 사이즈.
 *
 * 여성 호수는 표가 아니라 수식이다. 55가 키 155cm·가슴 85cm이고 한 호수마다
 * 가슴 3cm·키 5cm씩 움직이므로, 가슴둘레만 있으면 호수가 나오고 호수만 있으면
 * 그 옷이 상정한 몸이 나온다.
 *
 *   칸수 = (가슴둘레 − 85) ÷ 3
 *   호수 = 55 + 칸수 × 11
 *
 * 남성 상의는 호수가 곧 가슴둘레라 반올림만 하면 되고, 하의는 인치로 부르므로
 * 2.54로 나눈다. 아동복은 호수가 곧 키다. 같은 나라 안에서 자가 셋이라,
 * 이 표는 셋을 나란히 놓고 국제 표기까지 붙인다.
 */
import {
  CELLS, CM_PER_INCH, GROUPS, INTL, M_TOP_STEP,
  W_BASE_BUST, W_BASE_HEIGHT, W_BASE_SIZE, W_BUST_STEP, W_HEIGHT_STEP, W_LABEL_STEP,
  type Cell, groupOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 여성 호수 — 55에서 몇 칸 떨어졌는지로 정한다 */
export const womenStepOf = (bust: number): number => Math.round((bust - W_BASE_BUST) / W_BUST_STEP);

export const womenSizeOf = (bust: number): number =>
  Math.max(W_BASE_SIZE - W_LABEL_STEP, W_BASE_SIZE + womenStepOf(bust) * W_LABEL_STEP);

/** 그 호수가 상정한 몸 — 가슴둘레와 키 */
export const womenBodyOf = (size: number): { bust: number; height: number } => {
  const step = (size - W_BASE_SIZE) / W_LABEL_STEP;
  return { bust: W_BASE_BUST + step * W_BUST_STEP, height: W_BASE_HEIGHT + step * W_HEIGHT_STEP };
};

/** 남성 상의 호수 — 가슴둘레를 5 눈금으로 반올림한 값이 곧 호수다 */
export const menTopSizeOf = (bust: number): number => Math.round(bust / M_TOP_STEP) * M_TOP_STEP;

/** 하의 인치 */
export const inchOf = (cm: number): number => cm / CM_PER_INCH;

export interface Neighbour {
  slug: string;
  key: string;
  cm: number;
}

export interface SizeFacts {
  cell: Cell;
  slug: string;
  measure: 'bust' | 'waist' | 'height';
  /** 한국 표기 */
  korea: string;
  /** 국제 표기 */
  intl: string;
  /** 허리·가슴을 인치로 */
  inch: number;
  /** 그 호수가 상정한 몸 — 여성 호수에만 있다 */
  assumes: { bust: number; height: number } | null;
  /** 이 사이즈가 덮는 치수의 폭(cm) */
  span: number;
  bigger: Neighbour | null;
  smaller: Neighbour | null;
}

/** 국제 표기는 호수 차례를 따라간다 — 목록 밖으로 나가면 양 끝에서 멈춘다 */
export const intlAt = (index: number): string => INTL[Math.min(Math.max(index, 0), INTL.length - 1)];

export function sizeFacts(c: Cell): SizeFacts {
  const g = groupOf(c.key);
  if (!g) throw new Error(`모르는 대상: ${c.key}`);

  let korea: string;
  let intl: string;
  let assumes: { bust: number; height: number } | null = null;
  let span: number;

  if (c.key === 'wtop' || c.key === 'wbottom') {
    // 여성은 가슴둘레로 호수를 정하고, 하의는 허리에 가슴과 같은 간격을 쓴다
    const anchor = c.key === 'wtop' ? c.cm : c.cm + 20;
    const size = womenSizeOf(anchor);
    korea = String(size);
    intl = intlAt((size - (W_BASE_SIZE - W_LABEL_STEP)) / W_LABEL_STEP);
    assumes = womenBodyOf(size);
    span = W_BUST_STEP;
  } else if (c.key === 'mtop') {
    const size = menTopSizeOf(c.cm);
    korea = String(size);
    // 95를 M으로 두고 5cm마다 한 칸씩 옮긴다
    intl = intlAt((size - 85) / M_TOP_STEP);
    span = M_TOP_STEP;
  } else if (c.key === 'mbottom') {
    const inch = Math.round(inchOf(c.cm));
    korea = `${inch}`;
    // 30인치를 M으로 두고 두 인치마다 한 칸
    intl = intlAt(Math.round((inch - 28) / 2) + 1);
    span = CM_PER_INCH;
  } else {
    // 아동복은 호수가 곧 키다
    korea = String(Math.round(c.cm / 5) * 5);
    intl = `${Math.round(c.cm / 5) * 5}`;
    span = 5;
  }

  const i = g.values.indexOf(c.cm);
  const near = (cm: number): Neighbour => ({ slug: slugOf({ key: c.key, cm }), key: c.key, cm });

  return {
    cell: c,
    slug: slugOf(c),
    measure: g.measure,
    korea,
    intl,
    inch: round(inchOf(c.cm)),
    assumes: assumes ? { bust: round(assumes.bust), height: round(assumes.height) } : null,
    span,
    bigger: i + 1 < g.values.length ? near(g.values[i + 1]) : null,
    smaller: i > 0 ? near(g.values[i - 1]) : null,
  };
}

/** 같은 대상의 한 줄 */
export const atGroup = (key: string): Cell[] => CELLS.filter(c => c.key === key);

/** 목록에 있는 대상 전부 */
export const groupKeys = (): string[] => GROUPS.map(g => g.key);
