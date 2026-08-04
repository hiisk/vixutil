/**
 * 다운로드 240칸 — 파일 크기 24가지 × 회선 속도 10가지.
 *
 * 걸리는 시간도, 실제 초당 내려받는 양도, 병목이 어디인지도 이 둘에서
 * 계산된다(facts.ts). 적는 것은 두 목록과 이름 붙은 몇 자리뿐이다.
 *
 * 크기는 10진 단위다 — 1MB는 100만 바이트. 파일을 나눠 주는 쪽(웹, 통신사,
 * 디스크 겉면)이 모두 이 단위를 쓰기 때문이다. 윈도우 탐색기만 2의 제곱
 * 단위를 쓰면서 이름은 GB라고 붙여 놓아서, 같은 파일이 다르게 보인다.
 */

/** 파일 크기(MB, 10진) — 사진 몇 장부터 요즘 게임 한 편까지 */
export const SIZES: number[] = [
  10, 25, 50, 100, 200, 350, 500, 700,
  1000, 1500, 2000, 3000, 4700, 6000, 8000, 10000,
  15000, 20000, 25000, 30000, 50000, 70000, 100000, 150000,
];

/** 회선 속도(Mbps) — 통신사가 광고하는 숫자 그대로 */
export const SPEEDS: number[] = [5, 10, 20, 50, 100, 200, 300, 500, 1000, 2500];

/** 이름이 붙은 크기 — 나머지는 숫자로 충분하다 */
export const LANDMARK: Record<number, string> = {
  700: 'cd',
  4700: 'dvd',
  25000: 'bluray',
  50000: 'bluray2',
};

/** 이름이 붙은 속도 */
export const PLAN: Record<number, string> = {
  5: 'mobile',
  20: 'lte',
  100: 'basic',
  500: 'fast',
  1000: 'giga',
  2500: 'multigig',
};

export interface Cell {
  /** 파일 크기(MB) */
  mb: number;
  /** 회선 속도(Mbps) */
  mbps: number;
}

export const CELLS: Cell[] = SIZES.flatMap(mb => SPEEDS.map(mbps => ({ mb, mbps })));

/** 1000MB부터는 GB로 읽는 편이 짧다 — 4700MB는 4.7GB */
export const sizeLabel = (mb: number): string =>
  mb >= 1000 ? `${Number((mb / 1000).toFixed(1))}GB` : `${mb}MB`;

/** 4.7GB 회선 1000Mbps → 4-7gb-1000 */
export const slugOf = (c: Cell): string =>
  `${sizeLabel(c.mb).toLowerCase().replace('.', '-')}-${c.mbps}`;

export const BANDWIDTH_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const BANDWIDTH_ICON = '🔽';

/**
 * 회선이 아무리 빨라도 이 사이를 지나가야 한다 — 여기가 병목이 된다.
 *
 * 숫자는 규격이 말하는 최대치다. 실제로는 이보다 낮게 나오지만, 낮게 나오는
 * 쪽이 병목이라는 사실은 그대로다.
 */
export const LINKS: { key: string; mbps: number }[] = [
  { key: 'wifi4', mbps: 150 },
  { key: 'usb2', mbps: 480 },
  { key: 'wifi5', mbps: 866 },
  { key: 'gigabit', mbps: 1000 },
  { key: 'wifi6', mbps: 1200 },
  { key: 'cat6', mbps: 10000 },
];

/** 이 속도로 동시에 몇 개나 흘릴 수 있나 — 서비스가 권하는 값이다 */
export const STREAMS: { key: string; mbps: number }[] = [
  { key: 'music', mbps: 0.32 },
  { key: 'call', mbps: 3 },
  { key: 'hd', mbps: 5 },
  { key: 'fhd', mbps: 8 },
  { key: 'uhd', mbps: 25 },
];
