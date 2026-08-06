/**
 * 브래지어 100칸 — 밑가슴둘레 10가지 × 가슴 차이 10가지.
 *
 * 표기는 두 숫자에서 나온다. 앞의 숫자는 밑가슴둘레를 5cm 눈금으로 읽은 것이고,
 * 뒤의 알파벳은 윗가슴에서 밑가슴을 뺀 차이가 몇 칸인지다. 그래서 두 치수만
 * 재면 표기가 계산된다(facts.ts) — 표를 외울 것이 아니다.
 *
 * 한국·일본은 AA를 7.5cm 차이로 두고 2.5cm마다 한 컵씩 올린다. 국제 표기가
 * 같은 알파벳으로 다른 몸을 가리키는 것도 이 눈금이 달라서다.
 */

/** 밑가슴둘레(cm) — 표기의 앞 숫자가 되는 값 */
export const UNDERS: number[] = [60, 65, 70, 75, 80, 85, 90, 95, 100, 105];

/** 윗가슴에서 밑가슴을 뺀 차이(cm) */
export const DIFFS: number[] = [5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5];

/**
 * 컵 이름 — AA가 7.5cm 차이이고 2.5cm마다 한 칸씩 올라간다.
 *
 * 목록의 자리가 곧 칸수라, 이름을 찾는 데 표가 따로 필요 없다.
 */
export const CUPS = ['AAA', 'AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;

/** AA가 되는 차이(cm)와 한 컵의 폭(cm) */
export const AA_DIFF = 7.5;
export const CUP_STEP = 2.5;

/** 밑가슴 표기는 5cm 눈금으로 읽는다 */
export const BAND_STEP = 5;

/** 1인치는 2.54센티미터 — 미국 표기가 인치를 쓴다 */
export const CM_PER_INCH = 2.54;

export interface Cell {
  /** 밑가슴둘레(cm) */
  under: number;
  /** 윗가슴 − 밑가슴(cm) */
  diff: number;
}

export const CELLS: Cell[] = UNDERS.flatMap(under => DIFFS.map(diff => ({ under, diff })));

/** 밑가슴 75cm에 차이 12.5cm → 75-12-5 */
export const slugOf = (c: Cell): string => `${c.under}-${String(c.diff).replace('.', '-')}`;

export const BRA_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const BRA_ICON = '👙';
