/**
 * 와인 병 126칸 — 병 크기 열넷 × 잔 크기 아홉.
 *
 * 큰 병에는 성경 속 왕의 이름이 붙는다. 그런데 같은 이름이 지방마다 다른
 * 크기를 가리킨다 — 제로보암은 부르고뉴·샹파뉴에서 3리터지만 보르도에서는
 * 5리터다. 보르도는 3리터짜리를 더블 매그넘이라 부른다.
 *
 * 크기 자체는 표준병 750ml의 배수로 정해져 있어 자료가 아니라 규칙이다.
 * 몇 잔이 나오는지, 몇 사람이 마실 수 있는지는 계산한다(facts.ts).
 */

export interface Bottle {
  key: string;
  /** 용량(ml) */
  ml: number;
  /** 보르도에서 다르게 부르는 이름이 있으면 그 key */
  bordeaux?: string;
}

/** 표준병 — 모든 크기가 이 병의 배수로 적힌다 */
export const STANDARD_ML = 750;

/**
 * 병 크기 열넷.
 *
 * 표준병 아래로 셋, 위로 열이다. 제로보암을 둘로 나눠 적은 것은 지방마다
 * 다른 크기를 가리키기 때문이고, 검사가 그 둘이 실제로 다른지 확인한다.
 */
export const BOTTLES: Bottle[] = [
  { key: 'piccolo', ml: 187.5 },
  { key: 'demi', ml: 375 },
  { key: 'jennie', ml: 500 },
  { key: 'standard', ml: 750 },
  { key: 'magnum', ml: 1500 },
  { key: 'jeroboam-burgundy', ml: 3000, bordeaux: 'doublemagnum' },
  { key: 'rehoboam', ml: 4500 },
  { key: 'jeroboam-bordeaux', ml: 5000 },
  { key: 'methuselah', ml: 6000 },
  { key: 'salmanazar', ml: 9000 },
  { key: 'balthazar', ml: 12000 },
  { key: 'nebuchadnezzar', ml: 15000 },
  { key: 'melchior', ml: 18000 },
  { key: 'primat', ml: 27000 },
];

/** 잔에 따르는 양(ml) 아홉 가지 */
export const POURS: number[] = [100, 120, 125, 150, 175, 180, 200, 250, 300];

/** 한 사람이 마시는 잔 수 — 사람 수를 어림할 때 쓴다 */
export const GLASSES_PER_PERSON = 2;

export interface Cell {
  /** BOTTLES의 key */
  bottle: string;
  /** 잔에 따르는 양(ml) */
  pour: number;
}

const BY_KEY = new Map(BOTTLES.map(b => [b.key, b]));

export const bottleOf = (key: string): Bottle | undefined => BY_KEY.get(key);

export const CELLS: Cell[] = BOTTLES.flatMap(b => POURS.map(pour => ({ bottle: b.key, pour })));

export const slugOf = (c: Cell): string => `${c.bottle}-${c.pour}`;

export const WINE_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const WINE_ICON = '🍷';
