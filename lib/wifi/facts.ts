/**
 * 채널 하나의 값 — 번호에서 주파수로, 주파수에서 겹침으로.
 *
 * 채널은 점이 아니라 구간이다. 그 구간이 얼마나 넓은지가 2.4GHz의 사정을 정한다 —
 * 번호 사이는 5MHz인데 신호가 실제로 차지하는 폭은 22MHz다. 그래서 옆 번호와
 * 구간이 겹치고, 다섯 칸을 건너뛴 1·6·11만 서로 비켜 간다.
 *
 * 흔히 "20MHz 채널"이라고 하지만 2.4GHz에서 20MHz로 재면 1·5·9·13도 겹치지 않는
 * 것으로 나온다. 실제로 1·6·11을 권하는 까닭은 신호가 22MHz를 차지하기 때문이고,
 * 그래서 여기서는 대역마다 실제 폭을 쓴다.
 *
 * 그 겹침을 표로 적지 않고 구간끼리 견주어 계산한다. 적어 두면 틀린 줄도 모른다.
 */
import { CHANNELS, DFS_FROM, DFS_TO, type Band, type Channel, slugOf } from './list.ts';

/** 대역마다 번호를 주파수로 옮기는 기준점 */
const BASE: Record<Band, number> = { '2g': 2407, '5g': 5000, '6g': 5950 };

/**
 * 대역마다 신호가 실제로 차지하는 폭(MHz).
 *
 * 2.4GHz는 번호 간격이 5MHz인데 신호는 22MHz를 차지한다. 5·6GHz는 번호 간격이
 * 20MHz라 20MHz 채널끼리는 딱 맞물려 겹치지 않는다.
 */
const WIDTH: Record<Band, number> = { '2g': 22, '5g': 20, '6g': 20 };

export interface Span {
  from: number;
  to: number;
}

export interface WifiFacts {
  channel: Channel;
  slug: string;
  /** 중심 주파수(MHz) */
  center: number;
  /** 20MHz 폭이 차지하는 구간 */
  span: Span;
  /** 이 채널과 구간이 겹치는 다른 채널들 — 같은 대역 안에서 */
  overlaps: Channel[];
  /** 레이더를 피해야 하는 채널인가 */
  dfs: boolean;
  /** 나라에 따라 못 쓰는 채널인가 */
  restricted: boolean;
  /** 40MHz로 묶을 때 짝이 되는 채널 */
  pair: Channel | null;
  lower: Channel | null;
  upper: Channel | null;
}

/** 번호 → 중심 주파수. 2.4GHz 14번만 식에서 벗어난다 */
export const centerOf = (c: Channel): number =>
  c.band === '2g' && c.n === 14 ? 2484 : BASE[c.band] + 5 * c.n;

/** 신호가 차지하는 구간 — 중심에서 좌우로 폭의 절반씩 */
export const spanOf = (c: Channel, width = WIDTH[c.band]): Span => {
  const center = centerOf(c);
  return { from: center - width / 2, to: center + width / 2 };
};

/** 두 구간이 겹치는가 — 맞닿기만 하는 것은 겹침이 아니다 */
export const overlaps = (a: Span, b: Span): boolean => a.from < b.to && b.from < a.to;

export function wifiFacts(c: Channel): WifiFacts {
  const span = spanOf(c);
  const same = CHANNELS.filter(o => o.band === c.band);
  const i = same.findIndex(o => o.n === c.n);


  return {
    channel: c,
    slug: slugOf(c),
    center: centerOf(c),
    span,
    overlaps: same.filter(o => o.n !== c.n && overlaps(span, spanOf(o))),
    dfs: c.band === '5g' && c.n >= DFS_FROM && c.n <= DFS_TO,
    restricted: c.band === '2g' && c.n >= 12,
    pair: pairOf(c),
    lower: i > 0 ? same[i - 1] : null,
    upper: i >= 0 && i < same.length - 1 ? same[i + 1] : null,
  };
}

/**
 * 40MHz로 묶을 때 짝이 되는 채널.
 *
 * 아무 이웃과나 묶이는 것이 아니라 40MHz 칸의 경계가 정해져 있다. 5GHz는 36·44·52…
 * 처럼 여덟 칸마다, 6GHz는 1·9·17…처럼 여덟 칸마다 아래쪽 짝이 온다. 2.4GHz에서는
 * 40MHz를 쓰면 대역 절반을 먹어 사실상 쓰지 않으므로 짝을 내지 않는다.
 */
export const pairOf = (c: Channel): Channel | null => {
  if (c.band === '2g') return null;
  const anchor = c.band === '6g' ? 1 : c.n >= 149 ? 149 : 36;
  const lower = (c.n - anchor) % 8 === 0;
  const n = lower ? c.n + 4 : c.n - 4;
  return CHANNELS.find(o => o.band === c.band && o.n === n) ?? null;
};

/**
 * 서로 겹치지 않는 채널을 앞에서부터 고른다 — 2.4GHz의 1·6·11이 여기서 나온다.
 *
 * 표에서 베끼지 않고 구간으로 골라야, 폭이 바뀌거나 목록이 바뀌어도 답이 따라온다.
 */
export const cleanSet = (band: Band): Channel[] => {
  const out: Channel[] = [];
  for (const c of CHANNELS.filter(o => o.band === band)) {
    if (out.every(o => !overlaps(spanOf(c), spanOf(o)))) out.push(c);
  }
  return out;
};

export const inBand = (band: Band): Channel[] => CHANNELS.filter(c => c.band === band);

export const neighbours = (c: Channel, span = 3): Channel[] => {
  const same = inBand(c.band);
  const i = same.findIndex(o => o.n === c.n);
  return same.slice(Math.max(0, i - span), i + span + 1).filter(o => o.n !== c.n);
};
