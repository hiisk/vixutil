/**
 * 가전 160칸 — 가전 20가지 × 회로 8가지.
 *
 * 콘센트에 무엇을 함께 꽂아도 되는지는 와트가 아니라 전류로 갈린다. 차단기는
 * 암페어로 끊고, 멀티탭도 암페어로 견딘다. 그래서 이 표는 소비전력을 전압으로
 * 나눈 값에서 시작한다(facts.ts).
 *
 * 나라마다 전압이 다르고 그것이 답을 통째로 바꾼다 — 같은 1500W 드라이어가
 * 220V에서는 6.8A, 120V에서는 12.5A다. 그래서 회로를 축으로 둔다.
 */

/** 가전과 그 소비전력(W) — 정격이 붙어 있는 흔한 것들 */
export const APPLIANCES: { key: string; watt: number }[] = [
  { key: 'purifier', watt: 45 },
  { key: 'laptop', watt: 65 },
  { key: 'fan', watt: 80 },
  { key: 'tv', watt: 120 },
  { key: 'fridge', watt: 150 },
  { key: 'blanket', watt: 200 },
  { key: 'console', watt: 220 },
  { key: 'desktop', watt: 350 },
  { key: 'washer', watt: 500 },
  { key: 'toaster', watt: 900 },
  { key: 'rice', watt: 1100 },
  { key: 'microwave', watt: 1200 },
  { key: 'coffee', watt: 1400 },
  { key: 'iron', watt: 1500 },
  { key: 'dryer', watt: 1600 },
  { key: 'vacuum', watt: 1700 },
  { key: 'aircon', watt: 1800 },
  { key: 'kettle', watt: 2000 },
  { key: 'heater', watt: 2200 },
  { key: 'induction', watt: 3000 },
];

/**
 * 회로 — 전압과 차단기 용량의 짝.
 *
 * 한국·유럽은 220~230V에 16~32A, 북미는 120V에 15~20A, 일본은 100V에 15A다.
 * 전압이 절반이면 같은 가전이 전류를 두 배로 먹는다.
 */
export const CIRCUITS: { key: string; volt: number; amp: number }[] = [
  { key: 'jp15', volt: 100, amp: 15 },
  { key: 'us15', volt: 120, amp: 15 },
  { key: 'us20', volt: 120, amp: 20 },
  { key: 'kr16', volt: 220, amp: 16 },
  { key: 'kr20', volt: 220, amp: 20 },
  { key: 'kr32', volt: 220, amp: 32 },
  { key: 'eu16', volt: 230, amp: 16 },
  { key: 'us30', volt: 240, amp: 30 },
];

/**
 * 이어 쓰는 부하는 차단기의 8할까지만 잡는다.
 *
 * 차단기는 정격에서 바로 끊기지 않고 한참 버티다 끊긴다. 세 시간 넘게 이어
 * 걸리는 부하는 8할까지만 잡으라는 것이 널리 쓰는 규칙이다.
 */
export const CONTINUOUS = 0.8;

/** 흔한 멀티탭이 견디는 전류(A) — 넘으면 탭이 먼저 녹는다 */
export const STRIP_AMP = 15;

export interface Cell {
  /** 가전 열쇠 */
  key: string;
  /** 회로 열쇠 */
  circuit: string;
}

export const CELLS: Cell[] = APPLIANCES.flatMap(a => CIRCUITS.map(c => ({ key: a.key, circuit: c.key })));

/** 전기포트를 220V 16A 회로에 → kettle-kr16 */
export const slugOf = (c: Cell): string => `${c.key}-${c.circuit}`;

export const AMPERE_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const applianceOf = (key: string) => APPLIANCES.find(a => a.key === key);
export const circuitOf = (key: string) => CIRCUITS.find(c => c.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const AMPERE_ICON = '⚡';
