/**
 * 무선랜 채널 133가지 — 채널 번호 목록만 적는다.
 *
 * 중심 주파수도 20MHz 폭이 차지하는 구간도 겹치는 채널도 전부 번호에서 계산된다
 * (facts.ts). 번호와 주파수 사이에 정해진 식이 있기 때문이다 —
 *
 *   2.4GHz: 2407 + 5 × 번호        (14번만 예외로 2484)
 *   5GHz:   5000 + 5 × 번호
 *   6GHz:   5950 + 5 × 번호
 *
 * 번호 목록 자체는 계산으로 만들 수 없다. 5GHz는 나라마다 열어 둔 대역이 다르고,
 * 중간이 비어 있는 구간(120~128 언저리)도 있기 때문이다.
 */
export type Band = '2g' | '5g' | '6g';

export interface Channel {
  band: Band;
  n: number;
}

/** 2.4GHz — 1번부터 14번까지. 12·13·14번은 나라에 따라 못 쓴다 */
const CH_2G = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

/** 5GHz — 20MHz 채널로 실제 열리는 번호들 */
const CH_5G = [
  36, 40, 44, 48, 52, 56, 60, 64,
  100, 104, 108, 112, 116, 120, 124, 128, 132, 136, 140, 144,
  149, 153, 157, 161, 165, 169, 173, 177,
];

/** 6GHz — 1번부터 233번까지 4씩 (Wi-Fi 6E) */
const CH_6G = Array.from({ length: 59 }, (_, i) => 1 + i * 4);

export const CHANNELS: Channel[] = [
  ...CH_2G.map(n => ({ band: '2g' as const, n })),
  ...CH_5G.map(n => ({ band: '5g' as const, n })),
  ...CH_6G.map(n => ({ band: '6g' as const, n })),
];

/** 2.4GHz 6번 → 2g-6 (번호가 대역마다 겹치므로 대역을 앞에 붙인다) */
export const slugOf = (c: Channel): string => `${c.band}-${c.n}`;

/** 사람이 읽는 꼴 */
export const labelOf = (c: Channel): string =>
  `${{ '2g': '2.4', '5g': '5', '6g': '6' }[c.band]}GHz ${c.n}`;

export const WIFI_SLUGS = CHANNELS.map(slugOf);

export const channelOf = (slug: string): Channel | undefined => {
  const m = /^([256]g)-([0-9]{1,3})$/.exec(slug);
  if (!m) return undefined;
  return CHANNELS.find(c => c.band === m[1] && c.n === Number(m[2]));
};

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const WIFI_ICON = '📶';

export const BANDS: Band[] = ['2g', '5g', '6g'];

/**
 * 레이더를 피해 비켜 줘야 하는 구간(DFS) — 이 표에서 유일하게 적는 규칙이다.
 *
 * 5GHz의 52~144번은 기상·군용 레이더와 함께 쓰는 대역이라, 공유기가 레이더를
 * 감지하면 그 채널을 비워야 한다. 나라마다 조금씩 다르지만 이 범위는 대체로 같다.
 */
export const DFS_FROM = 52;
export const DFS_TO = 144;
