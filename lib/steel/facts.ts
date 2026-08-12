/**
 * 형상 하나와 치수 하나가 만드는 무게.
 *
 * 강재는 단면이 일정한 물건이므로 부피는 단면적 × 길이이고, 무게는 거기에 강의
 * 밀도를 곱한 값이다. 형상마다 다른 것은 첫 줄뿐이다.
 *
 *   단면적(mm²)     — 형상마다 다르다. list.ts의 FORMULA에 그 식이 그대로 있다
 *   단위중량(kg/m)  = 단면적 ÷ 10⁶ × 7850      (mm²를 m²로 고치고 밀도를 곱한다)
 *   한 개 무게(kg)  = 단위중량 × 길이
 *   1톤당 개수      = 1000 ÷ 한 개 무게        (남는 것은 버린다)
 *
 * ── 계수를 적어 두지 않는다 ──────────────────────────────
 * 현장에서 쓰는 계수 셋은 모두 저 식을 정리한 값이다.
 *
 *   강판   두께 × 7.85 = kg/m²      ← 밀도 ÷ 1000
 *   원형   0.006165 × d² = kg/m     ← π/4 × 밀도 ÷ 10⁶
 *   사각   0.00785 × a² = kg/m      ← 밀도 ÷ 10⁶
 *
 * 그래서 이 파일은 계수를 옮겨 적지 않고 밀도와 π로 만든다. 옮겨 적다 자릿수가
 * 하나 틀리면 149칸이 한꺼번에 조용히 어긋나기 때문이다 —
 * tests/steel-weight.test.ts가 이 세 계수를 밀도와 π로 되짚는다.
 */
import { relatedWindow } from '../related-window.ts';
import {
  CELLS, FORMULA, HOLLOW, SHEET_LIKE, type Cell, type ShapeKey,
  cellOf, sizeOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 강의 밀도(kg/m³) — 탄소강은 강종이 달라도 이 값이다 */
export const STEEL_DENSITY = 7850;

/**
 * 강판이 쓰는 계수 — 두께 1mm가 1m²에 7.85kg이다. 밀도를 1000으로 나눈 값이다.
 * 두께 6mm 강판 1m²가 47.1kg인 것이 이 계수 하나에서 나온다.
 */
export const SHEET_COEF = STEEL_DENSITY / 1000;

/** 원형 단면의 계수 — 널리 인용되는 0.006165가 이 값이다 */
export const ROUND_COEF = (Math.PI / 4) * STEEL_DENSITY / 1e6;

/** 사각 단면의 계수 — 0.00785. 원형과는 딱 π/4배만큼 다르다 */
export const SQUARE_COEF = STEEL_DENSITY / 1e6;

/**
 * 관의 안쪽 치수(mm) — 바깥에서 벽 두께를 양쪽으로 뺀 값이다.
 *
 * 양쪽이므로 2t를 뺀다. 한쪽만 빼는 실수가 흔하고, 그러면 벽이 절반인 관이
 * 되어 무게가 반쯤 나온다 — 그 자리를 한 곳에 모아 둔다.
 */
export const innerOf = (c: Cell): { a: number; b?: number } => ({
  a: c.a - 2 * (c.t ?? 0),
  b: c.b === undefined ? undefined : c.b - 2 * (c.t ?? 0),
});

/**
 * 단면적(mm²) — 형상마다 이 함수만 다르다.
 *
 * 관은 **바깥 단면에서 안쪽 단면을 뺀 것**으로 적었다. 벽 두께를 둘레에 곱하는
 * 어림식(둘레 × t)도 흔히 쓰이는데, 그것은 두꺼운 관에서 실제보다 크게 나온다 —
 * 뺄셈 쪽이 정확하고, 두께가 반지름에 닿으면 저절로 속이 찬 것과 같아진다.
 */
export function areaOf(c: Cell): number {
  const inner = innerOf(c);
  switch (c.shape) {
    case 'plate':
    case 'flat':
      return c.a * c.b!;
    case 'square':
      return c.a ** 2;
    case 'round':
      return (Math.PI / 4) * c.a ** 2;
    case 'round-tube':
      return (Math.PI / 4) * (c.a ** 2 - inner.a ** 2);
    case 'square-tube':
      return c.a ** 2 - inner.a ** 2;
    case 'rect-tube':
      return c.a * c.b! - inner.a * inner.b!;
  }
}

/** 관이 속까지 찼다면 얼마였을까(mm²) — 속을 비워 얼마를 아꼈는지 재는 상대다 */
export function solidAreaOf(c: Cell): number {
  switch (c.shape) {
    case 'round-tube':  return (Math.PI / 4) * c.a ** 2;
    case 'square-tube': return c.a ** 2;
    case 'rect-tube':   return c.a * c.b!;
    default:            return areaOf(c);
  }
}

/** 단위중량(kg/m) — 단면적을 m²로 고쳐 밀도를 곱한 값이다 */
export const unitWeight = (c: Cell): number => (areaOf(c) * STEEL_DENSITY) / 1e6;

/** 두께로 정해지는 m²당 무게(kg/m²) — 강판·평철에서만 뜻이 있다 */
export const perSquareMetre = (thicknessMm: number): number => thicknessMm * SHEET_COEF;

/** 총중량(kg) = 단위중량 × 길이 × 개수 */
export const totalWeight = (unit: number, length: number, count: number): number =>
  unit * length * count;

export interface SteelFacts {
  cell: Cell;
  slug: string;
  shape: ShapeKey;
  /** 언어를 안 가리는 치수 표기 — '⌀ 20', '50 × 50 × 2' */
  size: string;
  /** 형상의 단면적 식 — 낱말이 없어 열 언어가 같은 줄을 쓴다 */
  formula: string;
  /** 단면적(mm²) */
  area: number;
  /** 단위중량(kg/m) */
  unit: number;
  /** 한 개의 길이(m) — 강판은 장의 길이, 나머지는 정척 6m */
  length: number;
  /** 한 개(강판은 한 장) 무게(kg) */
  perPiece: number;
  perTen: number;
  perHundred: number;
  /** 1톤에 몇 개 들어가는가 — 남는 것은 버리고 센다 */
  piecesPerTon: number;
  /** 100개가 몇 톤인가 */
  tonsPerHundred: number;
  /** 두께로 정해지는 m²당 무게(kg/m²) — 강판·평철만 */
  perSquareMetre?: number;
  /** 강판 한 장의 넓이(m²) — 강판만 */
  sheetArea?: number;
  /** 관만 — 안쪽 치수(mm) */
  inner?: { a: number; b?: number };
  /** 관만 — 속까지 찼을 때의 단면적(mm²)과 단위중량(kg/m) */
  solidArea?: number;
  solidUnit?: number;
  /** 관만 — 속을 비워 몇 % 가벼운가 */
  hollowSaving?: number;
  /** 이웃 칸 — 같은 형상을 먼저, 자기 자리 다음부터 원형으로 감아 고른다 */
  neighbours: Cell[];
}

/**
 * 한 칸에서 뻗는 이웃 수.
 *
 * 고르는 방법은 lib/related-window.ts가 갖는다 — 앞에서 여섯 개를 잘라 오면
 * 줄의 앞쪽만 서로 가리키고 뒤쪽 칸은 들어오는 링크가 0이 된다. 사이트맵에는
 * 있고 아무 페이지도 안 가리키는 낱장이다. 그 병이 이 저장소에서 여러 번 났고,
 * 고치는 방법을 한 곳에 모아 두었으니 여기서는 그것을 부르기만 한다.
 */
const NEAR = 6;

export function steelFacts(input: Cell): SteelFacts {
  /*
   * 목록에 있는 그 객체를 다시 집어 온다. relatedWindow는 자기 자리를
   * indexOf로 찾으므로, 같은 값의 새 객체를 넘기면 자리를 못 찾고 목록 앞에서
   * 이웃을 골라 버린다 — 조용히 앞쪽만 이어지는 그 병이 그대로 돌아온다.
   */
  const slug = slugOf(input);
  const cell = cellOf(slug);
  if (!cell) throw new Error(`모르는 칸: ${slug}`);

  const area = areaOf(cell);
  const unit = (area * STEEL_DENSITY) / 1e6;
  const perPiece = unit * cell.length;
  const hollow = HOLLOW.includes(cell.shape);
  const sheetLike = SHEET_LIKE.includes(cell.shape);
  const solidArea = hollow ? solidAreaOf(cell) : undefined;

  return {
    cell,
    slug,
    shape: cell.shape,
    size: sizeOf(cell),
    formula: FORMULA[cell.shape],
    area: round(area, 2),
    /*
     * 자리를 셋까지 남긴다. 얇은 관은 단위중량이 1kg/m 아래로 내려가므로
     * (⌀20×2는 0.888kg/m) 둘로 자르면 0.89가 되어 되짚기 검사의 여유가 값보다
     * 커진다 — 검사가 뭘 봐도 통과하게 된다.
     */
    unit: round(unit, 3),
    length: cell.length,
    perPiece: round(perPiece, 2),
    perTen: round(perPiece * 10, 2),
    perHundred: round(perPiece * 100, 2),
    piecesPerTon: Math.floor(1000 / perPiece),
    tonsPerHundred: round((perPiece * 100) / 1000, 3),
    perSquareMetre: sheetLike ? round(perSquareMetre(cell.a), 2) : undefined,
    sheetArea: cell.shape === 'plate' ? round((cell.b! / 1000) * cell.length, 3) : undefined,
    inner: hollow ? innerOf(cell) : undefined,
    solidArea: solidArea === undefined ? undefined : round(solidArea, 2),
    solidUnit: solidArea === undefined ? undefined : round((solidArea * STEEL_DENSITY) / 1e6, 3),
    hollowSaving: solidArea === undefined ? undefined : round((1 - area / solidArea) * 100, 1),
    /* 같은 형상을 먼저 채우고, 형상이 작아 자리가 남으면 다른 형상이 이어 채운다 */
    neighbours: relatedWindow(CELLS, cell, NEAR, (x, self) => x.shape === self.shape),
  };
}
