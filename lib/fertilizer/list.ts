/**
 * 비료 135칸 — 비료 15가지 × 밭 면적 9가지.
 *
 * "이 밭에 이 비료를 몇 킬로 뿌리나"는 표가 아니라 한 줄 나눗셈에서 나온다.
 * 면적에 목표 시비량을 곱하면 필요한 **성분량**이고, 그것을 봉지에 적힌 **함량**으로
 * 나누면 실제로 뿌릴 **비료량**이다(facts.ts). 요소는 질소가 46%뿐이라 질소 10g을
 * 넣으려면 요소를 21.7g 뿌려야 한다 — 사람들이 틀리는 자리가 이 나눗셈이다.
 *
 * 복합비료는 그 나눗셈이 한 번에 끝나지 않는다. 한 성분을 목표에 맞추면 나머지
 * 둘은 함량 비율대로 따라 들어간다 — 21-17-17로 질소를 맞추면 인산과 칼리가
 * 얼마 들어가는지가 함께 나와야 값이 있다. 그것도 facts.ts가 낸다.
 *
 * ── 함량 값에 대하여 (이 파일에서 가장 위험한 자리) ────────────────
 * 함량은 비료의 성질이라 나라를 가리지 않는다. 요소가 46%인 것은 CO(NH₂)₂의
 * 질소 무게 비율이 46.6%이기 때문이고, 어느 나라 봉지에도 46으로 적혀 있다.
 * 그래서 아래에는 **널리 통용되는 표시 함량만** 적었다.
 *
 * 지어낸 함량은 그럴듯해서 아무도 못 잡는다. 그래서 다음은 일부러 뺐다 —
 * 값이 넓게 흔들리거나 나라마다 표시가 갈리는 것들이다.
 *   · 계분·퇴비·유기질 비료  N 1~4%로 건조·부숙 정도에 따라 몇 배씩 갈린다
 *   · 과인산석회(과석)       P₂O₅ 16%와 20% 표시가 나라마다 다르다
 *   · 용성인비              구용성 인산 표시가 제품마다 흔들린다
 *   · 석회질소              원료는 N 35%인데 제품은 20% 남짓으로 희석돼 나온다
 *   · 골분·유박             원료에 따라 갈린다
 * 이것들은 표로 만들지 않고, 화면에서 "봉지의 세 숫자를 그대로 읽으라"고 밝힌다
 * (ui.ts의 labelNote). 나눗셈은 함량만 있으면 같으므로 값을 잃는 것이 아니다.
 */

/** 성분 열쇠 — p는 P₂O₅, k는 K₂O다(봉지의 세 숫자가 그 표기다) */
export type NutrientKey = 'n' | 'p' | 'k';

/** 세 숫자를 읽는 차례 — 봉지의 N-P-K 순서다 */
export const NUTRIENTS: NutrientKey[] = ['n', 'p', 'k'];

export interface Fertilizer {
  /** 언어를 안 가리는 열쇠 — 복합비료는 'npk-'로 시작하고 뒤가 세 숫자다 */
  key: string;
  /** 질소 함량(%) */
  n: number;
  /** 인산 함량(%) — P₂O₅ 표기 */
  p: number;
  /** 칼리 함량(%) — K₂O 표기 */
  k: number;
}

/**
 * 비료 15가지 — 표시 함량이 널리 통용되는 것만.
 *
 * 앞의 열하나는 단일 성분이 뚜렷한 비료이고, 뒤의 넷은 복합비료다. 복합비료의
 * 열쇠는 'npk-' 뒤에 세 숫자를 그대로 붙였다 — 이름을 열 언어로 또 적지 않고
 * 낱말 하나에 숫자를 붙여 만들기 때문이다(ui.ts의 fertilizerName). 열쇠의 숫자와
 * 아래 함량이 어긋나면 화면에 적힌 이름이 거짓이 되므로 검사가 둘을 맞춰 본다.
 */
export const FERTILIZERS: Fertilizer[] = [
  { key: 'urea', n: 46, p: 0, k: 0 },
  { key: 'ammonium-sulfate', n: 21, p: 0, k: 0 },
  { key: 'ammonium-nitrate', n: 34, p: 0, k: 0 },
  { key: 'calcium-nitrate', n: 15.5, p: 0, k: 0 },
  { key: 'dap', n: 18, p: 46, k: 0 },
  { key: 'map', n: 11, p: 52, k: 0 },
  { key: 'tsp', n: 0, p: 46, k: 0 },
  { key: 'potassium-chloride', n: 0, p: 0, k: 60 },
  { key: 'potassium-sulfate', n: 0, p: 0, k: 50 },
  { key: 'potassium-nitrate', n: 13, p: 0, k: 46 },
  { key: 'mkp', n: 0, p: 52, k: 34 },
  { key: 'npk-21-17-17', n: 21, p: 17, k: 17 },
  { key: 'npk-17-21-17', n: 17, p: 21, k: 17 },
  { key: 'npk-20-20-20', n: 20, p: 20, k: 20 },
  { key: 'npk-10-10-10', n: 10, p: 10, k: 10 },
];

/**
 * 밭 면적(㎡) — 1에서 1000까지 아홉 자리.
 *
 * 1은 기준 자리다(㎡당 몇 그램인지가 여기 나온다). 5~20은 베란다와 상자 텃밭,
 * 50~100은 뒷마당 텃밭, 200~500은 주말농장 한 구획, 1000㎡는 10a — 농사에서
 * 시비량을 말하는 단위다. 평이나 에이커를 쓰지 않는 이유는 나라마다 다른 단위를
 * 축에 넣으면 슬러그가 언어를 가리게 되기 때문이다.
 */
export const AREAS: number[] = [1, 5, 10, 20, 50, 100, 200, 500, 1000];

/**
 * 목표 시비량(g/㎡) — 기준 성분을 ㎡당 몇 그램 넣을 것인가.
 *
 * 이것을 축으로 삼지 않는다. 비료량은 목표에 정비례하므로 축으로 만들면 칸만
 * 네 배가 되고 묻는 말은 같다 — 필라멘트가 지름 둘을 한 칸에 나란히 둔 것과
 * 같은 까닭이다. 그래서 한 칸 안에서 네 값을 함께 낸다.
 *
 * 목표 자체는 작물과 토양검정이 정하는 값이고 이 표가 정해 줄 수 있는 것이 아니다.
 * 이 섹션이 하는 일은 그 목표를 받아 비료량으로 옮기는 나눗셈이다.
 */
export const TARGETS: number[] = [5, 10, 15, 20];

/** 낱장의 큰 숫자와 제목이 쓰는 목표 — 가운데 값이다 */
export const BASE_TARGET = 10;

export interface Cell {
  /** 비료 열쇠 */
  fertilizer: string;
  /** 밭 면적(㎡) */
  area: number;
}

export const CELLS: Cell[] = FERTILIZERS.flatMap(f => AREAS.map(area => ({ fertilizer: f.key, area })));

/** 요소 100㎡ → urea-100m2 */
export const slugOf = (c: Cell): string => `${c.fertilizer}-${c.area}m2`;

export const FERTILIZER_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const fertilizerOf = (key: string): Fertilizer | undefined => FERTILIZERS.find(f => f.key === key);

/** 그 비료의 성분 함량(%) */
export const contentOf = (f: Fertilizer, key: NutrientKey): number => f[key];

/** 복합비료인가 — 열쇠가 'npk-'로 시작하면 뒤가 세 숫자다 */
export const isCompound = (key: string): boolean => key.startsWith('npk-');

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const FERTILIZER_ICON = '🌱';
