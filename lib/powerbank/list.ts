/**
 * 보조배터리 100칸 — 용량 스무 가지 × 전압 다섯 가지.
 *
 * 기내에 들고 탈 수 있는지는 mAh가 아니라 **와트시(Wh)**로 정해진다. 그런데
 * 제품에 크게 적힌 것은 mAh뿐이라, 같은 20,000mAh라도 셀 전압이 다르면
 * 와트시가 달라진다. 그 계산이 이 표다(facts.ts).
 *
 * 여기 적는 것은 용량 사다리와 전압 목록, 그리고 항공 규정의 경계 둘뿐이다.
 */

/** 표기 용량(mAh) 스무 가지 */
export const CAPACITIES: number[] = [
  3000, 5000, 6000, 8000, 10000, 12000, 15000, 20000, 25000, 26800,
  27000, 30000, 40000, 50000, 60000, 65000, 70000, 80000, 90000, 100000,
];

export interface Voltage {
  key: string;
  volts: number;
}

/**
 * 전압 다섯 가지.
 *
 * 리튬이온 셀의 공칭 전압은 3.6~3.85V이고, 제조사마다 어느 값으로 적는지가
 * 다르다. 5V는 USB로 나올 때의 전압이라 mAh 표기가 여기 맞춰지면 수가 작아
 * 보이고, 11.1V는 셀 셋을 직렬로 이은 노트북용 팩이다.
 */
export const VOLTAGES: Voltage[] = [
  { key: '3v6', volts: 3.6 },
  { key: '3v7', volts: 3.7 },
  { key: '3v85', volts: 3.85 },
  { key: '5v', volts: 5 },
  { key: '11v1', volts: 11.1 },
];

/** 규정이 자유롭게 두는 위끝(Wh) */
export const FREE_WH = 100;

/** 항공사 승인을 받으면 되는 위끝(Wh) */
export const APPROVAL_WH = 160;

/** USB로 나올 때의 전압 — 표기 용량을 이 기준으로 다시 세면 수가 줄어든다 */
export const USB_VOLTS = 5;

export interface Cell {
  /** 표기 용량(mAh) */
  mah: number;
  /** VOLTAGES의 key */
  volt: string;
}

const BY_KEY = new Map(VOLTAGES.map(v => [v.key, v]));

export const voltageOf = (key: string): Voltage | undefined => BY_KEY.get(key);

export const CELLS: Cell[] = CAPACITIES.flatMap(mah => VOLTAGES.map(v => ({ mah, volt: v.key })));

export const slugOf = (c: Cell): string => `${c.mah}-${c.volt}`;

export const POWERBANK_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const POWERBANK_ICON = '🔋';
