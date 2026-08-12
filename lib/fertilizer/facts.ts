/**
 * 비료 하나와 밭 면적 하나가 만드는 시비량.
 *
 * 셈은 두 걸음이고 둘 다 한 줄이다.
 *
 *   필요 성분량(g) = 면적(㎡) × 목표 시비량(g/㎡)
 *   뿌릴 비료량(g) = 필요 성분량 ÷ (함량% ÷ 100)
 *
 * 두 번째 줄의 방향이 이 파일의 전부다. 나누는 것이지 곱하는 것이 아니다 —
 * 함량이 46%면 비료는 성분보다 **많이** 들어가고(10 ÷ 0.46 = 21.7), 곱하면
 * 4.6이 나와 그럴듯한 자리에 앉는다. 그래서 검사가 함량 100%인 가상의 비료로
 * 식이 뒤집혔는지를 먼저 본다: 함량이 100%면 비료량과 성분량이 같아야 한다.
 *
 * ── 복합비료: 한 성분을 맞추면 나머지 둘이 정해진다 ─────────────────
 * 21-17-17로 질소를 ㎡당 10g 넣으려면 비료를 47.6g 뿌리는데, 그 47.6g에는
 * 인산 8.1g과 칼리 8.1g이 함께 들어간다. 고를 수 있는 것이 아니다 — 비료량이
 * 정해지면 나머지 둘은 함량 비율대로 끌려온다. along이 그 값이다.
 *
 * ── P₂O₅·K₂O 표기 ──────────────────────────────────────────────
 * 봉지의 두 번째·세 번째 숫자는 원소가 아니라 산화물 무게다(P₂O₅·K₂O). 토양검정
 * 성적서와 문헌은 원소(P·K)로 적는 곳도 있어 같은 밭을 두고 숫자가 두 배 넘게
 * 달라 보인다. 계수는 분자량 비율이라 정해져 있다.
 *
 *   P = P₂O₅ × 0.436      (61.95 ÷ 141.94)
 *   K = K₂O  × 0.830      (78.20 ÷ 94.20)
 *
 * 질소는 봉지도 원소로 적어 계수가 1이다.
 */
import {
  AREAS, BASE_TARGET, CELLS, FERTILIZERS, NUTRIENTS, TARGETS,
  type Cell, type Fertilizer, type NutrientKey,
  contentOf, fertilizerOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/**
 * 산화물 표기를 원소 표기로 옮기는 계수 — 분자량 비율이다.
 *
 * 손으로 적은 값이 아니라 아래 MOLAR에서 계산해도 되지만, 문헌이 인용하는 값이
 * 0.436·0.830으로 굳어 있어 그 값을 쓰고 근거를 검사가 되짚는다.
 */
export const TO_ELEMENT: Record<NutrientKey, number> = { n: 1, p: 0.436, k: 0.830 };

/** 산화물 g → 원소 g */
export const elementOf = (key: NutrientKey, oxideGrams: number): number => oxideGrams * TO_ELEMENT[key];

/** 원소 g → 산화물 g. 왕복하면 제자리로 돌아온다 */
export const oxideOf = (key: NutrientKey, elementGrams: number): number => elementGrams / TO_ELEMENT[key];

/**
 * 성분량(g)을 비료량(g)으로 — 이 섹션의 나눗셈.
 *
 * 함량이 0이면 아무리 뿌려도 그 성분이 들어가지 않는다. 0으로 나누면 Infinity가
 * 나와 화면에 그대로 앉으므로 여기서 막는다 — 부르는 쪽은 함량이 0인 성분을
 * 애초에 넘기지 않는다(facts의 along은 함량 0을 건너뛴다).
 */
export const fertilizerFor = (nutrientGrams: number, contentPct: number): number => {
  if (contentPct <= 0) throw new Error(`함량이 0인 성분으로는 비료량을 낼 수 없다: ${contentPct}%`);
  return (nutrientGrams * 100) / contentPct;
};

/** 되짚기 — 비료 얼마에 성분이 얼마 들어 있나 */
export const nutrientIn = (fertilizerGrams: number, contentPct: number): number =>
  (fertilizerGrams * contentPct) / 100;

/**
 * 기준 성분 — 그 비료를 사는 목적이 되는 성분이다.
 *
 * 함량이 가장 큰 것을 고르고, 같으면 N → P₂O₅ → K₂O 차례다(20-20-20은 질소를
 * 맞추는 것이 관행이다). 이 규칙에는 두 가지 값이 있다. 하나는 손으로 적을
 * 것이 한 줄도 늘지 않는다는 것이고, 다른 하나는 **고른 함량이 늘 0보다 크다는
 * 것**이다 — 세 값 중 가장 큰 것이 0이면 비료가 아니므로, 0으로 나누는 자리가
 * 이 규칙 아래에서는 생기지 않는다.
 */
export const basisOf = (f: Fertilizer): NutrientKey =>
  NUTRIENTS.reduce((best, key) => (contentOf(f, key) > contentOf(f, best) ? key : best), 'n' as NutrientKey);

/** 함량이 0보다 큰 성분들 — 봉지 순서(N-P-K)를 지킨다 */
export const nutrientsOf = (f: Fertilizer): NutrientKey[] => NUTRIENTS.filter(k => contentOf(f, k) > 0);

export interface Along {
  /** 따라 들어오는 성분 */
  key: NutrientKey;
  /** 그 성분의 함량(%) */
  content: number;
  /** 이 면적에 함께 들어가는 양(g) — 산화물 표기 */
  grams: number;
  /** ㎡당(g) */
  perM2: number;
  /** 원소 표기로 옮긴 양(g) — P₂O₅→P, K₂O→K */
  element: number;
}

export interface Dose {
  /** 기준 성분의 목표 시비량(g/㎡) */
  target: number;
  /** 이 면적에 필요한 기준 성분량(g) */
  need: number;
  /** 실제로 뿌릴 비료량(g) */
  grams: number;
  /** ㎡당 비료량(g) */
  perM2: number;
  /** 그 비료량에 함께 들어가는 나머지 성분들 — 기준 성분과 함량 0은 뺀다 */
  along: Along[];
}

export interface Neighbour {
  slug: string;
  fertilizer: string;
  area: number;
}

export interface FertilizerFacts {
  cell: Cell;
  slug: string;
  fert: Fertilizer;
  /** 기준 성분 */
  basis: NutrientKey;
  /** 기준 성분의 함량(%) */
  content: number;
  /** 함량이 0보다 큰 성분들 */
  nutrients: NutrientKey[];
  /** 복합비료인가 — 나머지 둘이 따라오는 이야기가 붙는다 */
  compound: boolean;
  /** 목표 시비량별 — TARGETS 차례다 */
  doses: Dose[];
  /** 제목과 큰 숫자가 쓰는 것 — 목표 10g/㎡ */
  main: Dose;
  /** 이웃 넷 */
  neighbours: Neighbour[];
}

/** 이웃을 몇 개 걸 것인가 */
const NEIGHBOUR_COUNT = 4;

/**
 * 이웃 — 자기 자리 **다음부터 원형으로 감아** 고른다.
 *
 * 앞에서 뒤로만 가리키면 목록 끝에 붙인 칸은 들어오는 링크가 0이 된다(174곳이
 * 그랬다). 원형으로 감으면 칸마다 나가는 링크 넷과 들어오는 링크 넷이 정확히
 * 맞아떨어진다 — i+1 … i+4는 자리를 옮기는 짝짓기라 어느 칸도 빠지지 않는다.
 */
export const neighboursOf = (c: Cell): Neighbour[] => {
  const here = slugOf(c);
  const i = CELLS.findIndex(x => slugOf(x) === here);
  if (i < 0) throw new Error(`목록에 없는 칸: ${here}`);
  return Array.from({ length: NEIGHBOUR_COUNT }, (_, step) => CELLS[(i + 1 + step) % CELLS.length])
    .map(x => ({ slug: slugOf(x), fertilizer: x.fertilizer, area: x.area }));
};

/** 목표 하나에 대한 한 줄 — 여기가 나눗셈이 일어나는 유일한 자리다 */
const doseAt = (f: Fertilizer, area: number, basis: NutrientKey, target: number): Dose => {
  const need = area * target;
  const grams = fertilizerFor(need, contentOf(f, basis));
  return {
    target,
    need: round(need, 1),
    grams: round(grams, 1),
    perM2: round(grams / area, 2),
    along: NUTRIENTS.filter(k => k !== basis && contentOf(f, k) > 0).map(key => {
      const content = contentOf(f, key);
      const along = nutrientIn(grams, content);
      return {
        key,
        content,
        grams: round(along, 1),
        perM2: round(along / area, 2),
        element: round(elementOf(key, along), 1),
      };
    }),
  };
};

export function fertilizerFacts(c: Cell): FertilizerFacts {
  const fert = fertilizerOf(c.fertilizer);
  if (!fert) throw new Error(`모르는 비료: ${c.fertilizer}`);
  if (!AREAS.includes(c.area)) throw new Error(`모르는 면적: ${c.area}`);

  const basis = basisOf(fert);
  const content = contentOf(fert, basis);
  if (content <= 0) throw new Error(`성분이 하나도 없는 비료: ${fert.key}`);

  const doses = TARGETS.map(target => doseAt(fert, c.area, basis, target));
  const main = doses.find(d => d.target === BASE_TARGET);
  if (!main) throw new Error(`기준 목표 ${BASE_TARGET}g/㎡가 TARGETS에 없다`);

  return {
    cell: c,
    slug: slugOf(c),
    fert,
    basis,
    content,
    nutrients: nutrientsOf(fert),
    compound: nutrientsOf(fert).length > 1,
    doses,
    main,
    neighbours: neighboursOf(c),
  };
}

/** 같은 비료의 한 줄 */
export const atFertilizer = (key: string): Cell[] => AREAS.map(area => ({ fertilizer: key, area }));

/** 같은 면적의 한 줄 */
export const atArea = (area: number): Cell[] => CELLS.filter(c => c.area === area);

/** 봉지의 세 숫자 — '21-17-17'. 이름에 붙일 것이라 언어를 안 가린다 */
export const npkOf = (f: Fertilizer): string => `${f.n}-${f.p}-${f.k}`;
