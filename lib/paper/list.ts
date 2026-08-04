/**
 * 종이 280칸 — 규격 35가지 × 해상도 8가지.
 *
 * ISO 규격은 표가 아니라 반으로 접기다. A0 한 장의 넓이를 1제곱미터로 두고
 * 긴 변을 반씩 접어 내려간 것이 A1, A2, A3다. 그래서 적는 것은 맨 위 세 장뿐이고
 * 나머지 서른 장은 접어서 만든다(facts.ts).
 *
 * 접어도 모양이 변하지 않으려면 두 변의 비가 √2여야 한다. 이 한 가지가 A4가
 * 210×297인 이유이자, 확대·축소 배율이 141%와 71%인 이유다.
 */

/** 밀리미터로 적은 한 장 — 짧은 변, 긴 변 */
export interface Sheet {
  short: number;
  long: number;
}

/**
 * 세 계열의 맨 위 한 장.
 *
 * A0은 넓이가 1제곱미터, B0은 짧은 변이 딱 1미터, C0은 그 둘의 기하평균이다.
 * C가 봉투에 쓰이는 것도 A를 넣고 B에 담을 수 있는 중간이기 때문이다.
 */
export const ROOTS: Record<string, Sheet> = {
  a: { short: 841, long: 1189 },
  b: { short: 1000, long: 1414 },
  c: { short: 917, long: 1297 },
};

/** 계열마다 몇 번까지 내려가는가 */
export const DEPTH: Record<string, number> = { a: 10, b: 10, c: 8 };

/**
 * 인치로 정해진 미국 규격 — 밀리미터는 곱해서 낸다.
 */
export const INCH_SIZES: { key: string; w: number; h: number }[] = [
  { key: 'letter', w: 8.5, h: 11 },
  { key: 'legal', w: 8.5, h: 14 },
  { key: 'tabloid', w: 11, h: 17 },
  { key: 'executive', w: 7.25, h: 10.5 },
];

/** 1인치는 25.4밀리미터 */
export const MM_PER_INCH = 25.4;

export interface Size {
  /** 주소에 쓰는 이름 — a4, b5, letter */
  key: string;
  /** iso 계열이면 a·b·c, 아니면 null */
  family: string | null;
  /** 몇 번 접었나 */
  step: number | null;
}

export const ISO_SIZES: Size[] = Object.keys(ROOTS).flatMap(family =>
  Array.from({ length: DEPTH[family] + 1 }, (_, step) => ({ key: `${family}${step}`, family, step })),
);

export const SIZES: Size[] = [
  ...ISO_SIZES,
  ...INCH_SIZES.map(s => ({ key: s.key, family: null, step: null })),
];

/** 찍거나 그릴 때의 해상도(DPI) */
export const DPIS: number[] = [72, 96, 150, 200, 300, 400, 600, 1200];

export interface Cell {
  size: Size;
  dpi: number;
}

export const CELLS: Cell[] = SIZES.flatMap(size => DPIS.map(dpi => ({ size, dpi })));

export const slugOf = (c: Cell): string => `${c.size.key}-${c.dpi}`;

export const PAPER_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const sizeOf = (key: string): Size | undefined => SIZES.find(s => s.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const PAPER_ICON = '📄';

/** 어디에 쓰는 크기인지 — 흔히 마주치는 것만 이름을 붙인다 */
export const KNOWN: Record<string, string> = {
  a4: 'office',
  a3: 'poster',
  a5: 'notebook',
  a6: 'postcard',
  a7: 'card',
  b5: 'book',
  c5: 'envelope',
  c6: 'smallEnvelope',
  letter: 'usOffice',
};

/** 종이 무게(g/m²) — 장당 무게는 넓이를 곱해 낸다 */
export const GSMS: number[] = [70, 80, 100, 120, 160, 200, 250, 300];

/** 우편 한 통이 이 무게를 넘으면 요금이 올라간다 */
export const LETTER_LIMIT_G = 25;
