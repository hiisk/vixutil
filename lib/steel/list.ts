/**
 * 강재 149칸 — 형상 일곱 가지 × 유통 치수.
 *
 * 강재 무게는 표를 외워서 아는 것이 아니라 **부피 × 밀도**다. 형상마다 다른 것은
 * 단면적을 구하는 식 하나뿐이고, 그 뒤는 전부 같다 — 단면적에 밀도 7850kg/m³을
 * 곱하면 단위중량(kg/m)이고, 길이와 개수를 곱하면 총 중량이다(facts.ts).
 *
 * ── 왜 형상을 일곱으로 끊었는가 ──────────────────────────
 * **순수 기하로 계산되는 형상만 낸다.** H형강·I형강·ㄱ형강(앵글)·ㄷ형강(찬넬)·
 * 경량 C형강·T형강은 단위중량이 규격표로만 정해진다 — 웨브와 플랜지가 만나는
 * 자리의 필렛(모서리 살)과 플랜지 안쪽의 테이퍼가 무게를 좌우하고, 그 치수는
 * 겉보기 치수에 안 적혀 있다. 표를 옮겨 적으면 한 칸이 틀려도 되짚을 방법이
 * 없다. 그래서 이 섹션은 그 형상들을 빼고, 왜 뺐는지를 화면에 열 언어로 적는다
 * (ui.ts의 excludedNote). 빼기로 한 목록은 아래 EXCLUDED에 남겨 둔다 —
 * 이름만 남겨 두면 다음에 누가 "형상이 모자라니 더 넣자"고 할 때 근거가 된다.
 *
 * ── 각관의 모서리 라운드 ────────────────────────────────
 * 각관은 실제로 모서리가 둥글다. 이 표는 그것을 무시하고 직각으로 셈하므로
 * **2~3% 무겁게 나온다**(50×50×2.3의 규격값 3.34kg/m에 대해 여기 셈은 3.44kg/m다).
 * 무시하는 쪽이 옳다고 말하려는 것이 아니라, 무시했다는 사실을 화면에 밝힌다 —
 * 라운드 반지름은 제조사마다 다르고 겉보기 치수에 안 적혀 있어 계산에 못 넣는다.
 * 원형관은 라운드가 없으므로 이 셈이 규격값과 그대로 맞는다.
 *
 * ── 왜 치수를 정수만 쓰는가 ─────────────────────────────
 * 1.6T 강판·2.3t 각관·48.6mm 배관처럼 소수 치수도 널리 유통된다. 그래도 여기서는
 * 정수 치수만 낸다 — 주소에 소수점이 들어가면(`plate-1.6mm-1000x2000`) 링크가
 * 잘리거나 마지막 칸이 파일 확장자로 읽히는 자리가 생긴다. 식은 소수 치수에도
 * 그대로 쓰이므로, 화면이 알려 주려는 것은 하나도 줄지 않는다.
 */

/** 순수 기하로 단면적이 나오는 일곱 형상 */
export type ShapeKey =
  | 'plate'        // 강판 — 두께 × 폭
  | 'flat'         // 평철 — 두께 × 폭 (강판과 식은 같고 파는 꼴이 다르다)
  | 'square'       // 각재(정사각 봉) — 한 변²
  | 'round'        // 원형봉 — π/4 × d²
  | 'round-tube'   // 원형관 — π/4 × (D² − d²)
  | 'square-tube'  // 정사각 각관 — 바깥² − 안쪽²
  | 'rect-tube';   // 직사각 각관 — 바깥 − 안쪽

/** 형상 순서 — 화면 목록과 이웃 원형이 이 순서를 따른다 */
export const SHAPES: ShapeKey[] = [
  'plate', 'flat', 'square', 'round', 'round-tube', 'square-tube', 'rect-tube',
];

/**
 * 단위중량이 규격표로만 정해져 **빼기로 한** 형상.
 *
 * 여기 있는 것들은 겉보기 치수만으로 단면적이 안 나온다. 넣으려면 표를 옮겨
 * 적어야 하고, 그러면 이 섹션의 모든 숫자가 밀도로 되짚어지는 성질이 깨진다.
 * tests/steel-weight.test.ts가 이 목록의 어느 것도 ShapeKey에 없는지 본다.
 */
export const EXCLUDED = ['h-beam', 'i-beam', 'angle', 'channel', 'c-channel', 'tee'] as const;

export interface Cell {
  shape: ShapeKey;
  /**
   * 첫 치수(mm) — 형상마다 무엇인지가 다르다.
   * 강판·평철은 두께, 각재는 한 변, 원형봉은 지름, 관은 바깥 치수(직사각은 긴 변).
   */
  a: number;
  /** 둘째 치수(mm) — 강판·평철은 폭, 직사각 각관은 짧은 바깥 변. 나머지는 없다 */
  b?: number;
  /** 관의 벽 두께(mm). 관이 아니면 없다 */
  t?: number;
  /** 한 개의 길이(m) — 강판은 장의 길이, 나머지는 정척이다 */
  length: number;
}

/** 봉·관의 정척(m) — 국내에서 6m가 기본이다 */
export const STOCK_M = 6;

/**
 * 강판 두께(mm) — 낱장으로 유통되는 두께다.
 * 2·3·4·5·6은 판금, 8~12는 구조용, 15~25는 베이스 플레이트 쪽에서 흔하다.
 */
const PLATE_MM = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 20, 25];

/**
 * 강판 정척 두 가지 — [폭, 길이] (mm).
 * 1000×2000은 국내 정척이고, 1219×2438은 4×8피트를 mm로 옮긴 것이다.
 * 두 가지를 다 내는 것은 같은 두께에서 장의 크기만 바뀌었을 때 무게가
 * 넓이에 정비례한다는 것을 나란히 보여 주기 위해서다.
 */
const SHEETS: [number, number][] = [[1000, 2000], [1219, 2438]];

/** 평철 두께(mm) — 유통되는 네 가지 */
const FLAT_T = [3, 6, 9, 12];

/** 평철 폭(mm) — 유통되는 여섯 가지. 폭이 늘 두께보다 크므로 빼 둘 조합이 없다 */
const FLAT_W = [25, 32, 38, 50, 65, 75];

/** 각재 한 변(mm) */
const SQUARE_MM = [9, 12, 16, 19, 22, 25, 32, 38, 50];

/** 원형봉 지름(mm) */
const ROUND_MM = [6, 8, 10, 12, 13, 16, 19, 20, 22, 25, 28, 30, 32, 38, 40, 50];

/** 원형관 바깥지름(mm) */
const ROUND_TUBE_OD = [20, 25, 32, 40, 50, 60, 75, 90, 100, 125, 150];

/** 정사각 각관 바깥 한 변(mm) */
const SQUARE_TUBE_A = [20, 25, 30, 40, 50, 60, 75, 100];

/** 직사각 각관 [긴 변, 짧은 변] (mm) */
const RECT_TUBE: [number, number][] = [[40, 20], [50, 25], [50, 30], [60, 30], [75, 45], [100, 50]];

/** 관 벽 두께(mm) */
const TUBE_T = [2, 3, 4, 5];

/** 직사각 각관 벽 두께(mm) — 얇은 쪽만 유통된다 */
const RECT_TUBE_T = [2, 3];

/**
 * 관 조합을 거르는 규칙 — **벽 두께는 짧은 바깥 치수의 1/8을 넘지 않는다.**
 *
 * 두께 축을 바깥 치수 축에 그대로 곱하면 20×20×5처럼 안쪽이 10mm밖에 안 남는
 * 조합이 나온다. 그런 관은 만들지도 팔지도 않는다 — 속이 거의 찼으니 봉을 쓴다.
 * 실제로 유통되는 관은 모두 이 안에 든다(50×50은 1.6~3.2t, 배관 48.6mm는 3.2t,
 * 100×100은 4.5t까지다). 1/8은 그 전부를 받아들이면서 헛조합만 걷어내는 선이다.
 *
 * 물리적으로도 두께가 반지름에 닿으면(2t = 바깥) 관이 아니라 속이 찬 봉이 된다 —
 * 1/8은 그보다 훨씬 안쪽이라 안쪽 치수가 0이 되는 일이 없다.
 */
export const TUBE_MAX_RATIO = 8;
export const tubeFits = (shortOuter: number, t: number): boolean => t * TUBE_MAX_RATIO <= shortOuter;

/**
 * 149칸 — 형상마다 위의 치수 축을 곱하고, 관은 tubeFits로 거른 것이다.
 * 칸을 손으로 적는 곳은 위의 치수 목록뿐이고, 나머지는 전부 여기서 만든다.
 */
export const CELLS: Cell[] = [
  ...PLATE_MM.flatMap(a => SHEETS.map(([w, l]): Cell => ({ shape: 'plate', a, b: w, length: l / 1000 }))),
  ...FLAT_T.flatMap(a => FLAT_W.map((b): Cell => ({ shape: 'flat', a, b, length: STOCK_M }))),
  ...SQUARE_MM.map((a): Cell => ({ shape: 'square', a, length: STOCK_M })),
  ...ROUND_MM.map((a): Cell => ({ shape: 'round', a, length: STOCK_M })),
  ...ROUND_TUBE_OD.flatMap(a =>
    TUBE_T.filter(t => tubeFits(a, t)).map((t): Cell => ({ shape: 'round-tube', a, t, length: STOCK_M })),
  ),
  ...SQUARE_TUBE_A.flatMap(a =>
    TUBE_T.filter(t => tubeFits(a, t)).map((t): Cell => ({ shape: 'square-tube', a, t, length: STOCK_M })),
  ),
  ...RECT_TUBE.flatMap(([a, b]) =>
    RECT_TUBE_T.filter(t => tubeFits(b, t)).map((t): Cell => ({ shape: 'rect-tube', a, b, t, length: STOCK_M })),
  ),
];

/**
 * 주소 — 언어를 안 가린다. `plate-6mm-1000x2000`·`round-20mm`·`square-tube-50x50x2`.
 *
 * 형상 이름을 앞에 두므로 형상이 달라도 주소가 겹치지 않는다. 정사각 각관은
 * 한 변을 두 번 적는다(50x50x2) — 치수만 보고 직사각과 같은 꼴로 읽히게 두면
 * 사람이 주소를 손으로 고쳐 넣을 때 헷갈린다.
 */
export const slugOf = (c: Cell): string => {
  switch (c.shape) {
    case 'plate':       return `plate-${c.a}mm-${c.b}x${Math.round(c.length * 1000)}`;
    case 'flat':        return `flat-${c.a}x${c.b}mm`;
    case 'square':      return `square-${c.a}mm`;
    case 'round':       return `round-${c.a}mm`;
    case 'round-tube':  return `round-tube-${c.a}x${c.t}`;
    case 'square-tube': return `square-tube-${c.a}x${c.a}x${c.t}`;
    case 'rect-tube':   return `rect-tube-${c.a}x${c.b}x${c.t}`;
  }
};

/**
 * 치수 표기 — 열 언어가 이것을 그대로 쓴다.
 *
 * 숫자와 곱셈 기호뿐이라 옮겨 적을 낱말이 없다. 치수가 전부 정수이므로
 * 소수점 기호가 언어마다 갈리는 문제도 여기서는 안 생긴다.
 */
export const sizeOf = (c: Cell): string => {
  switch (c.shape) {
    case 'plate':       return `${c.a} × ${c.b} × ${Math.round(c.length * 1000)}`;
    case 'flat':        return `${c.a} × ${c.b}`;
    case 'square':      return `${c.a} × ${c.a}`;
    case 'round':       return `⌀ ${c.a}`;
    case 'round-tube':  return `⌀ ${c.a} × ${c.t}`;
    case 'square-tube': return `${c.a} × ${c.a} × ${c.t}`;
    case 'rect-tube':   return `${c.a} × ${c.b} × ${c.t}`;
  }
};

/**
 * 단면적 식 — 형상마다 이것 하나만 다르다.
 *
 * 낱말이 없어 열 언어가 같은 줄을 쓴다. 화면이 계수 대신 이 식을 보여 주는 것이
 * 이 섹션의 요점이다 — 계수는 이 식에 밀도를 곱해 정리한 값일 뿐이다.
 */
export const FORMULA: Record<ShapeKey, string> = {
  'plate': 't × w',
  'flat': 't × w',
  'square': 'a²',
  'round': 'π/4 × d²',
  'round-tube': 'π/4 × (D² − (D − 2t)²)',
  'square-tube': 'a² − (a − 2t)²',
  'rect-tube': 'a × b − (a − 2t)(b − 2t)',
};

/** 속이 빈 형상 — 안쪽 치수와 속을 비운 만큼의 절감이 있는 칸들 */
export const HOLLOW: ShapeKey[] = ['round-tube', 'square-tube', 'rect-tube'];

/** 두께 하나로 m²당 무게가 정해지는 형상 — 강판과 평철이다 */
export const SHEET_LIKE: ShapeKey[] = ['plate', 'flat'];

export const STEEL_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/** 같은 형상의 한 줄 */
export const atShape = (shape: ShapeKey): Cell[] => CELLS.filter(c => c.shape === shape);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const STEEL_ICON = '🔲';
