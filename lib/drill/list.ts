/**
 * 드릴 비트 195가지 — 세 계열을 한 표에 모은다.
 *
 * 지름은 계열마다 다른 방식으로 정해진다. 미터 계열은 밀리미터를 그대로 적고,
 * 인치 계열은 64분의 몇으로 적으며, 번호·문자 계열은 옛 철사 굵기에서 온 이름이라
 * 규칙이 없다.
 *
 * 그래서 여기 적는 것은 각 계열의 지름 목록뿐이고, 밀리미터↔인치 환산도 가장
 * 가까운 다른 계열의 비트도 계산된다(facts.ts).
 *
 * 번호·문자 계열은 미국에서만 쓰지만, 나사 탭을 낼 때 표에 그 이름으로 적혀
 * 있는 일이 많아 함께 싣는다.
 */
export type Kind = 'metric' | 'fraction' | 'number' | 'letter';

export interface Bit {
  kind: Kind;
  /** 사람이 부르는 이름 — 6.5, 1/4, #21, F */
  name: string;
  /** 지름(mm) */
  mm: number;
}

/**
 * 미터 드릴 — 눈금에 더해 탭 드릴 지름을 따로 채운다.
 *
 * 0.2mm 간격만으로는 M3의 2.5, M4의 3.3, M8의 6.8처럼 실제로 가장 많이 쓰는
 * 지름이 빠진다. 나사 탭을 낼 때 찾는 것이 바로 그 값들이라 목록에 넣는다.
 */
const TAP_SIZES = [1.25, 1.6, 2.05, 2.5, 3.3, 4.5, 4.8, 5.5, 6.8, 7.5, 8.5, 9.5, 10.2, 10.5, 11.5, 12.5];

const METRIC: number[] = [
  ...new Set([
    ...Array.from({ length: 10 }, (_, i) => Math.round((0.1 + i * 0.1) * 100) / 100),
    ...Array.from({ length: 25 }, (_, i) => Math.round((1.2 + i * 0.2) * 100) / 100),
    ...Array.from({ length: 14 }, (_, i) => Math.round((6.5 + i * 0.5) * 100) / 100),
    ...TAP_SIZES,
  ]),
].sort((a, b) => a - b);

/** 인치 드릴 — 1/64부터 1인치까지 64분의 1씩 */
const FRACTION = Array.from({ length: 64 }, (_, i) => i + 1);

/**
 * 번호 드릴 #1~#40의 지름(인치) — 규칙이 없어 그대로 적는다.
 *
 * 옛 철사 굵기(Stubs Steel Wire Gauge)에서 온 이름이라 번호와 지름 사이에
 * 식이 없다. 번호가 클수록 가늘어지는 것만 지켜진다.
 */
const NUMBER_IN: number[] = [
  0.228, 0.221, 0.213, 0.209, 0.2055, 0.204, 0.201, 0.199, 0.196, 0.1935,
  0.191, 0.189, 0.185, 0.182, 0.180, 0.177, 0.173, 0.1695, 0.166, 0.161,
  0.159, 0.157, 0.154, 0.152, 0.1495, 0.147, 0.144, 0.1405, 0.136, 0.1285,
  0.120, 0.116, 0.113, 0.111, 0.110, 0.1065, 0.104, 0.1015, 0.0995, 0.098,
];

/** 문자 드릴 A~Z의 지름(인치) — 번호 드릴 위쪽을 잇는다 */
const LETTER_IN: number[] = [
  0.234, 0.238, 0.242, 0.246, 0.250, 0.257, 0.261, 0.266, 0.272, 0.277,
  0.281, 0.290, 0.295, 0.302, 0.316, 0.323, 0.332, 0.339, 0.348, 0.358,
  0.368, 0.377, 0.386, 0.397, 0.404, 0.413,
];

const round = (x: number, d = 3) => Math.round(x * 10 ** d) / 10 ** d;

export const BITS: Bit[] = [
  ...METRIC.map(mm => ({ kind: 'metric' as const, name: String(round(mm, 2)), mm: round(mm, 2) })),
  ...FRACTION.map(n => ({ kind: 'fraction' as const, name: `${n}/64`, mm: round((n / 64) * 25.4, 3) })),
  ...NUMBER_IN.map((inch, i) => ({ kind: 'number' as const, name: `#${i + 1}`, mm: round(inch * 25.4, 3) })),
  ...LETTER_IN.map((inch, i) => ({ kind: 'letter' as const, name: String.fromCharCode(65 + i), mm: round(inch * 25.4, 3) })),
];

/** 6.5 → m6-5, 1/4 → f16-64, #21 → n21, F → lF */
export const slugOf = (b: Bit): string =>
  ({
    metric: () => `m${b.name.replace('.', '-')}`,
    fraction: () => `f${b.name.replace('/', '-')}`,
    number: () => `n${b.name.slice(1)}`,
    letter: () => `l${b.name}`,
  }[b.kind]());

export const DRILL_SLUGS = BITS.map(slugOf);

export const bitOf = (slug: string): Bit | undefined => BITS.find(b => slugOf(b) === slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const DRILL_ICON = '🔩';

export const KINDS: Kind[] = ['metric', 'fraction', 'number', 'letter'];
