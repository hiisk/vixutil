/**
 * 세탁 기호 86칸 — 갈래 다섯을 요소의 조합으로 펼친다.
 *
 * 옷 라벨의 그림은 표가 아니라 **규칙**이다. 바탕 도형이 무엇을 하는 일인지 정하고,
 * 그 위에 얹힌 요소가 얼마나·어떻게를 정한다.
 *
 *   통(대야)     물세탁      점 개수 = 최고 온도, 통 안의 숫자 = 같은 온도를 숫자로
 *   삼각형       표백        빈 것 = 모두 가능, 사선 두 줄 = 산소계만
 *   사각형       건조        안에 원 = 기계건조, 원 없이 줄 = 자연건조
 *   다리미       다림질      점 개수 = 밑판 온도
 *   원           전문 관리   안의 글자 = 쓸 수 있는 용제(P·F·A), W = 웨트클리닝
 *
 * 그 위에 어느 갈래에나 같은 뜻으로 붙는 것이 둘이다.
 *
 *   밑줄 0·1·2   보통 · 약하게 · 아주 약하게   (물세탁·기계건조·전문 관리에 붙는다)
 *   ×표          하지 마라
 *
 * ── 이 파일에 적는 것 ───────────────────────────────────
 * 갈래와 축(온도 목록·밑줄 개수·표시 종류)만 적는다. 뜻과 온도와 그림 좌표는
 * facts.ts가 만들고, 열 언어 문구는 ui.ts가 만든다. 칸을 손으로 적지 않으므로
 * 축을 한 줄 고치면 86칸이 함께 움직인다.
 *
 * ── 86칸이 어디서 나오는가 ──────────────────────────────
 *   물세탁   숫자 표기 6온도 × 3강도 = 18
 *            점 표기   6온도 × 3강도 = 18   (같은 뜻을 점으로 적은 그림이다)
 *            온도 표시 없는 통 × 3강도 =  3
 *            손세탁 1 · 물세탁 금지 1 · 짜기 금지 1        → 42
 *   표백     모두 가능 1 · 산소계만 1 · 금지 1              →  3
 *   건조     기계건조 4단계(무표시·저온·중온·고온) × 3강도 = 12
 *            기계건조 금지 1
 *            자연건조 4가지(줄·물빼서 줄·눕혀·물빼서 눕혀) × 그늘 2 = 8  → 21
 *   다림질   4단계(무표시·110·150·200) × 스팀 2 = 8 · 금지 1  →  9
 *   전문관리 P·F 각 2강도 = 4 · A 1 · 빈 원 1 · 금지 1
 *            W 3강도 = 3 · 웨트클리닝 금지 1                 → 11
 *
 * ── 86에서 멈춘 까닭 ────────────────────────────────────
 * 여기서 더 늘리려면 **어느 규격도 정하지 않은 그림을 지어내야 한다.** 밑줄은
 * 물세탁·기계건조·전문 관리에만 붙고(표백·다림질·자연건조에는 붙지 않는다),
 * 점은 물세탁·기계건조·다림질에만 있다. 축을 곱해 칸을 늘리는 자리가 여기서
 * 끝난다 — 셀을 채우려고 없는 기호를 만들면 라벨을 잘못 읽게 되고, 그것은 옷을
 * 망치는 종류의 틀림이다. 그래서 100을 넘기지 않고 86으로 둔다.
 *
 * ── 규격에 따라 다른 대목 ───────────────────────────────
 * 온도를 **숫자로 적는 것이 ISO 3758·GINETEX·JIS L 0001**이고, **점으로 적는 것이
 * 북미(ASTM D5489)**다. 같은 뜻을 두 가지 그림으로 적으므로 두 칸으로 둔다 —
 * 라벨을 든 사람은 점을 세거나 숫자를 읽는 것 중 하나만 하기 때문이다.
 *
 * 규격표에 실려 있는 조합은 이 표의 일부다. 예를 들어 ISO 3758의 물세탁 표는
 * 열두 가지(95·70·60·60약·50·50약·40·40약·40아주약·30·30약·30아주약)를 싣는다.
 * 이 표는 규칙을 펼친 것이므로, 규격표에 없는 조합도 규칙대로 읽어 준다.
 * 자세한 갈림은 ui.ts의 standardNote가 열 언어로 밝힌다.
 */

export type Family = 'wash' | 'bleach' | 'dry' | 'iron' | 'dryclean';

/** 갈래 다섯 — 허브가 이 순서로 나눠 보여 준다 */
export const FAMILIES: Family[] = ['wash', 'bleach', 'dry', 'iron', 'dryclean'];

/**
 * 바탕 도형 위에 얹히는 표시.
 *
 * 점·밑줄·×표는 개수나 참거짓이라 따로 두고, 그림이 되는 표시만 여기 이름으로 둔다.
 */
export type Mark =
  /** 통 안의 손 — 손세탁 */
  | 'hand'
  /** 비틀린 천 — 짜기(금지로만 나온다) */
  | 'wring'
  /** 삼각형 안 사선 두 줄 — 산소계 표백만 */
  | 'stripes'
  /** 사각형 안의 원 — 기계건조(텀블) */
  | 'tumble'
  /** 사각형 안 세로선 하나 — 줄에 걸어 */
  | 'line'
  /** 세로선 둘 — 물을 빼며 줄에 걸어 */
  | 'drip-line'
  /** 가로선 하나 — 눕혀서 */
  | 'flat'
  /** 가로선 둘 — 물을 빼며 눕혀서 */
  | 'drip-flat'
  /** 다리미 아래 사선 — 스팀 금지 */
  | 'no-steam';

export interface Cell {
  family: Family;
  /** 주소 — 언어를 가리지 않는다 */
  slug: string;
  /** 점 개수. 0은 점이 없다는 뜻이다 */
  dots: number;
  /** 밑줄 개수 — 0 보통, 1 약하게, 2 아주 약하게 */
  bars: number;
  /** ×표가 얹혔나 */
  forbidden: boolean;
  /** 도형 안에 적는 글자 — 숫자 표기의 '40', 용제의 'P' */
  text?: string;
  mark?: Mark;
  /** 그늘 표시(사각형 왼쪽 위 사선 둘) */
  shade?: boolean;
}

/**
 * 물세탁 최고 온도(°C) — 점 개수가 이 줄의 몇 번째인지를 가리킨다.
 * 점 1개가 첫 칸(30°C)이고 점 6개가 마지막 칸(95°C)이다.
 */
export const WASH_TEMPS: number[] = [30, 40, 50, 60, 70, 95];

/** 다림질 밑판 온도(°C) — 점 1개 110, 2개 150, 3개 200 */
export const IRON_TEMPS: number[] = [110, 150, 200];

/** 밑줄 개수 — 세 강도가 전부다 */
export const BARS: number[] = [0, 1, 2];

/** 밑줄 개수를 주소에 적는 이름 — 자리가 곧 개수다 */
export const STRENGTH_SLUGS: string[] = ['normal', 'mild', 'very-mild'];

/** 기계건조 온도 단계를 주소에 적는 이름 — 자리가 곧 점 개수다 */
export const TUMBLE_SLUGS: string[] = ['any', 'low', 'medium', 'high'];

/** 온도를 무엇으로 적었나 — 숫자(ISO)냐 점(ASTM)이냐, 아니면 안 적었나 */
export type Notation = 'num' | 'dot' | 'none';

const cell = (family: Family, slug: string, rest: Partial<Cell> = {}): Cell => ({
  family,
  slug,
  dots: 0,
  bars: 0,
  forbidden: false,
  ...rest,
});

/* ── 물세탁 ────────────────────────────────────────────── */

/** 숫자 표기 — 통 안에 최고 온도를 그대로 적는다(ISO·GINETEX·JIS) */
const WASH_NUM: Cell[] = WASH_TEMPS.flatMap(t =>
  BARS.map(bars => cell('wash', `wash-${t}-${STRENGTH_SLUGS[bars]}`, { bars, text: String(t) })),
);

/** 점 표기 — 같은 온도를 점 개수로 적는다(북미 ASTM) */
const WASH_DOT: Cell[] = WASH_TEMPS.flatMap((t, i) =>
  BARS.map(bars => cell('wash', `wash-${t}-${STRENGTH_SLUGS[bars]}-dots`, { bars, dots: i + 1 })),
);

/** 온도가 안 적힌 통 — 강도만 밑줄로 말한다 */
const WASH_ANY: Cell[] = BARS.map(bars => cell('wash', `wash-any-${STRENGTH_SLUGS[bars]}`, { bars }));

const WASH_REST: Cell[] = [
  cell('wash', 'wash-hand', { mark: 'hand' }),
  cell('wash', 'wash-do-not', { forbidden: true }),
  cell('wash', 'wash-do-not-wring', { forbidden: true, mark: 'wring' }),
];

/* ── 표백 ─────────────────────────────────────────────── */

const BLEACH: Cell[] = [
  cell('bleach', 'bleach-any'),
  cell('bleach', 'bleach-oxygen-only', { mark: 'stripes' }),
  cell('bleach', 'bleach-do-not', { forbidden: true }),
];

/* ── 건조 ─────────────────────────────────────────────── */

/** 기계건조 — 사각형 안의 원, 점 개수가 온도 단계다(무표시 0단계 포함) */
const TUMBLE: Cell[] = TUMBLE_SLUGS.flatMap((name, dots) =>
  BARS.map(bars => cell('dry', `dry-tumble-${name}-${STRENGTH_SLUGS[bars]}`, { bars, dots, mark: 'tumble' })),
);

/** 자연건조 — 원이 없고 줄만 있다. 그늘 표시가 붙으면 한 칸이 더 갈린다 */
const NATURAL_MARKS: Mark[] = ['line', 'drip-line', 'flat', 'drip-flat'];

const NATURAL: Cell[] = NATURAL_MARKS.flatMap(mark =>
  [false, true].map(shade => cell('dry', `dry-${mark}${shade ? '-shade' : ''}`, { mark, shade })),
);

const DRY_REST: Cell[] = [cell('dry', 'dry-tumble-do-not', { forbidden: true, mark: 'tumble' })];

/* ── 다림질 ───────────────────────────────────────────── */

/**
 * 온도 4단계(무표시 포함) × 스팀 두 가지.
 * 다림질에는 밑줄이 붙지 않는다 — 강도를 말하는 자리가 없다.
 */
const IRON: Cell[] = [0, 1, 2, 3].flatMap(dots =>
  [false, true].map(noSteam => {
    const name = dots === 0 ? 'any' : String(IRON_TEMPS[dots - 1]);
    return cell('iron', `iron-${name}${noSteam ? '-no-steam' : ''}`, {
      dots,
      ...(noSteam ? { mark: 'no-steam' as Mark } : {}),
    });
  }),
);

const IRON_REST: Cell[] = [cell('iron', 'iron-do-not', { forbidden: true })];

/* ── 전문 관리(드라이클리닝·웨트클리닝) ─────────────────── */

/** 용제 글자와 그 글자가 받을 수 있는 밑줄 개수 */
const SOLVENTS: { letter: string; bars: number[] }[] = [
  { letter: 'P', bars: [0, 1] },
  { letter: 'F', bars: [0, 1] },
  { letter: 'A', bars: [0] },
  { letter: 'W', bars: [0, 1, 2] },
];

const DRYCLEAN: Cell[] = SOLVENTS.flatMap(s =>
  s.bars.map(bars =>
    cell('dryclean', `dryclean-${s.letter.toLowerCase()}${bars ? `-${STRENGTH_SLUGS[bars]}` : ''}`, {
      bars,
      text: s.letter,
    }),
  ),
);

const DRYCLEAN_REST: Cell[] = [
  cell('dryclean', 'dryclean-any'),
  cell('dryclean', 'dryclean-do-not', { forbidden: true }),
  cell('dryclean', 'dryclean-w-do-not', { forbidden: true, text: 'W' }),
];

export const CELLS: Cell[] = [
  ...WASH_NUM,
  ...WASH_DOT,
  ...WASH_ANY,
  ...WASH_REST,
  ...BLEACH,
  ...TUMBLE,
  ...NATURAL,
  ...DRY_REST,
  ...IRON,
  ...IRON_REST,
  ...DRYCLEAN,
  ...DRYCLEAN_REST,
];

export const LAUNDRY_SLUGS: string[] = CELLS.map(c => c.slug);

const BY_SLUG = new Map(CELLS.map(c => [c.slug, c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/** 같은 갈래의 칸들 — 허브가 갈래마다 한 줄로 낸다 */
export const atFamily = (family: Family): Cell[] => CELLS.filter(c => c.family === family);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const LAUNDRY_ICON = '🧺';
