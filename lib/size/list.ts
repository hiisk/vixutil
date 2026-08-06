/**
 * 옷 사이즈 100칸 — 대상 5가지 × 치수 여러 가지.
 *
 * 44·55·66은 아무 숫자가 아니다. 1981년 의류 치수 표준이 그때 여성의 평균인
 * 키 155cm·가슴둘레 85cm를 55로 삼고, 한 호수 올라갈 때마다 키는 5cm, 가슴은
 * 3cm를 더하게 정했다. 그래서 호수 하나만 알면 그 옷이 상정한 몸이 나온다.
 *
 * 남성은 규칙이 아예 다르다. 상의 호수가 곧 가슴둘레 센티미터라서 100은
 * 가슴 100cm를 뜻하고, 하의는 인치로 부른다. 같은 나라 안에서 자가 셋인 셈이라
 * 이 표는 그 셋을 나란히 놓는다.
 */

/** 여성 호수의 출발점 — 55가 키 155cm·가슴 85cm다 */
export const W_BASE_SIZE = 55;
export const W_BASE_BUST = 85;
export const W_BASE_HEIGHT = 155;
/** 한 호수마다 가슴 3cm, 키 5cm, 호수 표기는 11씩 */
export const W_BUST_STEP = 3;
export const W_HEIGHT_STEP = 5;
export const W_LABEL_STEP = 11;

/** 남성 상의는 호수가 곧 가슴둘레라, 5cm 눈금으로 부른다 */
export const M_TOP_STEP = 5;

/** 1인치는 2.54센티미터 — 하의는 인치로 부른다 */
export const CM_PER_INCH = 2.54;

/** 국제 표기 — 호수 차례와 나란히 간다 */
export const INTL = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] as const;

export interface Group {
  key: string;
  /** 무엇을 재는가 */
  measure: 'bust' | 'waist' | 'height';
  /** 낱장으로 만드는 치수(cm) */
  values: number[];
}

const range = (from: number, to: number, step: number): number[] =>
  Array.from({ length: Math.round((to - from) / step) + 1 }, (_, i) => from + i * step);

export const GROUPS: Group[] = [
  { key: 'wtop', measure: 'bust', values: range(76, 106, 2) },
  { key: 'wbottom', measure: 'waist', values: range(58, 92, 2) },
  { key: 'mtop', measure: 'bust', values: range(80, 124, 2) },
  { key: 'mbottom', measure: 'waist', values: range(66, 112, 2) },
  { key: 'kids', measure: 'height', values: range(80, 170, 5) },
];

export interface Cell {
  /** 대상 열쇠 */
  key: string;
  /** 치수(cm) */
  cm: number;
}

export const CELLS: Cell[] = GROUPS.flatMap(g => g.values.map(cm => ({ key: g.key, cm })));

/** 여성 상의 가슴둘레 88cm → wtop-88 */
export const slugOf = (c: Cell): string => `${c.key}-${c.cm}`;

export const SIZE_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const groupOf = (key: string) => GROUPS.find(g => g.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const SIZE_ICON = '👕';
