/**
 * 조임 토크 152칸 — 볼트 19가지 × 등급 8가지.
 *
 * 토크는 볼트를 조이는 힘이 아니라 돌리는 힘이다. 우리가 원하는 것은 볼트가
 * 늘어나며 버티는 축력이고, 토크는 그것을 만들려고 돌리는 값일 뿐이다.
 * 그래서 이 표의 값은 전부 축력에서 나온다(facts.ts).
 *
 * 볼트 치수는 /screw의 굵은 나사를 그대로 쓴다. 지름과 피치를 두 번 적으면
 * 언젠가 한쪽만 고쳐지기 때문이다.
 */

/** 다루는 지름(mm) — 손으로 조이는 범위 */
export const DIAMETERS: number[] = [3, 3.5, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 27, 30, 33, 36];

/**
 * 강도 등급.
 *
 * 숫자 두 개짜리 등급은 그 자체가 값이다 — 8.8이면 인장강도 800MPa,
 * 항복은 그 8할인 640MPa. 표를 따로 둘 것이 없어 label만 적는다.
 *
 * 스테인리스는 규칙이 달라서 값을 적는다. A2-70의 70은 인장강도 700MPa를
 * 뜻하지만 항복은 그 비율로 따라오지 않는다.
 */
export interface Grade {
  key: string;
  label: string;
  /** 스테인리스처럼 규칙에서 벗어나는 것만 적는다 */
  rm?: number;
  re?: number;
  stainless: boolean;
}

export const GRADES: Grade[] = [
  { key: '46', label: '4.6', stainless: false },
  { key: '48', label: '4.8', stainless: false },
  { key: '58', label: '5.8', stainless: false },
  { key: '88', label: '8.8', stainless: false },
  { key: '109', label: '10.9', stainless: false },
  { key: '129', label: '12.9', stainless: false },
  { key: 'a270', label: 'A2-70', rm: 700, re: 450, stainless: true },
  { key: 'a480', label: 'A4-80', rm: 800, re: 600, stainless: true },
];

export interface Cell {
  /** 지름(mm) */
  d: number;
  /** 등급 열쇠 */
  grade: string;
}

export const CELLS: Cell[] = DIAMETERS.flatMap(d => GRADES.map(g => ({ d, grade: g.key })));

export const sizeLabel = (d: number): string => `M${d}`;

/** M8 8.8등급 → m8-88 */
export const slugOf = (c: Cell): string => `m${String(c.d).replace('.', '-')}-${c.grade}`;

export const TORQUE_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const gradeOf = (key: string): Grade | undefined => GRADES.find(g => g.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const TORQUE_ICON = '🔧';

/**
 * 나사면이 얼마나 미끄러운가 — 토크의 대부분은 여기서 마찰로 사라진다.
 *
 * 돌린 힘의 90% 가까이가 나사산과 머리 밑면의 마찰을 이기는 데 쓰이고,
 * 볼트를 늘리는 데 쓰이는 것은 10% 남짓이다. 그래서 같은 축력을 만드는
 * 토크가 기름 한 방울에 25%씩 달라진다.
 */
export const FRICTIONS: { key: string; k: number }[] = [
  { key: 'zinc', k: 0.22 },
  { key: 'dry', k: 0.2 },
  { key: 'oiled', k: 0.15 },
  { key: 'waxed', k: 0.12 },
];

/** 항복의 몇 할까지 당길 것인가 — 널리 쓰는 관행이다 */
export const PRELOAD = 0.7;

/** 어디에 쓰는 굵기인지 */
export const KNOWN: Record<number, string> = {
  5: 'small',
  8: 'bike',
  10: 'car',
  16: 'frame',
  24: 'heavy',
};
