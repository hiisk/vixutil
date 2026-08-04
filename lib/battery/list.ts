/**
 * 충전 200칸 — 배터리 용량 20가지 × 충전기 20가지 중 열 가지.
 *
 * 채우는 데 걸리는 시간도, 어떤 전압으로 흐르는지도, 기내에 들고 탈 수 있는지도
 * 용량과 충전기 둘에서 계산된다(facts.ts). 적는 것은 두 목록과 USB PD가 정한
 * 전압 단계뿐이다.
 *
 * mAh는 전압 없이는 에너지가 아니다. 제조사가 Wh를 적을 때 쓰는 3.7V를 여기서도
 * 쓴다 — 26800mAh 보조배터리가 99Wh로 적혀 기내 반입선을 아슬아슬하게 넘지
 * 않는 것이 그 셈이다.
 */

/** 셀 공칭 전압(V) — 제조사가 Wh를 적을 때 쓰는 값 */
export const NOMINAL = 3.7;

/** 배터리 용량(mAh) — 작은 휴대폰부터 노트북용 보조배터리까지 */
export const CAPACITIES: number[] = [
  1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000,
  7000, 8000, 10000, 12000, 15000, 20000, 26800, 30000, 40000, 50000,
];

/** 충전기 출력(W) */
export const CHARGERS: number[] = [5, 10, 15, 18, 20, 30, 45, 65, 100, 140];

/** 이름이 붙은 용량 */
export const KNOWN_CAPACITY: Record<number, string> = {
  5000: 'phone',
  10000: 'powerbank',
  26800: 'flightLimit',
  50000: 'laptopBank',
};

/** 이름이 붙은 충전기 */
export const KNOWN_CHARGER: Record<number, string> = {
  5: 'oldUsb',
  20: 'phoneFast',
  65: 'laptop',
  140: 'proLaptop',
};

/**
 * USB PD가 정해 둔 고정 전압(V).
 *
 * 20V까지가 오래된 PD이고, 28V부터는 확장 규격(EPR)이다. 140W 충전기가
 * 28V를 쓰는 것도 20V로는 5A를 다 써도 100W에서 끝나기 때문이다.
 */
export const PD_VOLTS: number[] = [5, 9, 12, 15, 20, 28];

/** 케이블에 칩이 없어도 흘릴 수 있는 전류(A) */
export const PLAIN_CABLE_AMP = 3;
/** 칩이 든 케이블의 한계(A) */
export const MAX_AMP = 5;

export interface Cell {
  /** 배터리 용량(mAh) */
  mah: number;
  /** 충전기 출력(W) */
  watt: number;
}

export const CELLS: Cell[] = CAPACITIES.flatMap(mah => CHARGERS.map(watt => ({ mah, watt })));

/** 5000mAh를 65W로 → 5000-65 */
export const slugOf = (c: Cell): string => `${c.mah}-${c.watt}`;

export const BATTERY_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const BATTERY_ICON = '🔋';

/**
 * 기내 반입 기준(Wh) — 나라가 아니라 국제 규정이라 어디서나 같다.
 *
 * 100Wh 아래는 그냥 들고 타고, 160Wh까지는 항공사 승인을 받아 두 개까지,
 * 그 위는 여객기에 실을 수 없다.
 */
export const FLIGHT: { below: number; key: string }[] = [
  { below: 100, key: 'free' },
  { below: 160, key: 'approval' },
  { below: Infinity, key: 'banned' },
];
