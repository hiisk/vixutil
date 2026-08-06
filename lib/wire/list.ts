/**
 * 전선 200칸 — 굵기 20가지 × 전류 10가지.
 *
 * 굵기는 두 계열이 섞여 쓰인다. 미국은 AWG 번호로, 나머지는 단면적(mm²)으로
 * 부른다. AWG는 번호가 커질수록 가늘어지고, 그 사이가 일정한 비율이라 번호
 * 하나만 알면 지름이 계산된다(facts.ts) — 표를 외울 일이 아니다.
 *
 * 전류를 함께 두는 것은 굵기만으로는 아무 말도 못 하기 때문이다. 같은 전선도
 * 1A를 흘리느냐 30A를 흘리느냐에 따라 쓸 수 있는 길이가 서른 배 달라진다.
 */

/** 구리의 비저항(Ω·mm²/m, 20도) */
export const RHO = 0.0172;

export interface Size {
  /** AWG 번호 — 4/0은 −3, 1/0은 0으로 센다 */
  awg: number | null;
  /** 미터 계열의 단면적(mm²) */
  sq: number | null;
}

/**
 * AWG 쪽 굵기.
 *
 * 0000(4/0)부터 24까지. 0이 넷 붙은 것은 −3번으로 세면 공식이 그대로 이어진다.
 */
export const AWGS: number[] = [-3, -1, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

/** 미터 계열 굵기(mm²) — 콘센트 배선에서 흔히 쓰는 것들 */
export const SQS: number[] = [0.75, 1, 1.5, 2.5, 4, 6, 10, 16];

export const SIZES: Size[] = [
  ...AWGS.map(awg => ({ awg, sq: null })),
  ...SQS.map(sq => ({ awg: null, sq })),
];

/** 흘리는 전류(A) */
export const AMPS: number[] = [1, 3, 5, 7, 10, 15, 20, 25, 30, 40, 50, 63, 80, 100, 125];

export interface Cell {
  size: Size;
  amp: number;
}

export const CELLS: Cell[] = SIZES.flatMap(size => AMPS.map(amp => ({ size, amp })));

/** 4/0은 0이 넷, 1/0은 0이 하나 — 0 아래로는 번호 대신 0을 늘려 부른다 */
export const awgName = (n: number): string => (n <= 0 ? `${'0'.repeat(1 - n)}` : String(n));

export const sizeLabel = (s: Size): string =>
  s.awg !== null ? `AWG ${awgName(s.awg)}` : `${s.sq}mm²`;

/** AWG 12에 15A → awg12-15, 2.5mm²에 20A → sq2-5-20 */
export const sizeSlug = (s: Size): string =>
  s.awg !== null ? `awg${awgName(s.awg)}` : `sq${String(s.sq).replace('.', '-')}`;

export const slugOf = (c: Cell): string => `${sizeSlug(c.size)}-${c.amp}`;

export const WIRE_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const WIRE_ICON = '🔌';

/**
 * 어디에 쓰는 굵기인지 — 흔히 마주치는 것만 이름을 붙인다.
 */
export const KNOWN: Record<string, string> = {
  awg24: 'signal',
  awg18: 'lamp',
  awg14: 'outlet',
  awg12: 'kitchen',
  'sq1-5': 'lighting',
  'sq2-5': 'socket',
};

/**
 * 전압이 낮을수록 같은 강하가 아프다.
 *
 * 12V에서 0.36V는 3%지만 230V에서 0.36V는 0.16%다. 자동차 배선이 유난히
 * 굵은 것도 이 때문이다.
 */
export const SYSTEMS: { volt: number; key: string }[] = [
  { volt: 12, key: 'car' },
  { volt: 24, key: 'truck' },
  { volt: 120, key: 'us' },
  { volt: 230, key: 'eu' },
];

/** 이 안에 들어야 한다고 보는 강하 비율 */
export const DROP_LIMIT = 0.03;
