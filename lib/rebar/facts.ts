/**
 * 규격 하나와 길이 하나가 만드는 무게.
 *
 * 철근은 단면이 원인 긴 막대이므로, 1미터의 부피는 단면적 × 1000mm이고 무게는
 * 거기에 강의 밀도를 곱한 값이다.
 *
 *   단면적(mm²)     = π/4 × d²                     (d는 공칭지름 mm)
 *   단위중량(kg/m)  = 단면적 ÷ 10⁶ × 7850          (mm²를 m²로 고치고 밀도를 곱한다)
 *                   = (π/4 × 7850 ÷ 10⁶) × d²
 *                   = 0.0061654 × d²
 *   총중량(kg)      = 단위중량 × 길이 × 개수
 *
 * 현장에서 쓰는 **0.006165 계수는 저 괄호 안이 전부다.** 그래서 이 파일에서는
 * 계수를 적어 두지 않고 밀도와 π로 만든다 — 계수를 옮겨 적다 자릿수가 틀리면
 * 117칸이 한꺼번에 조용히 어긋나기 때문이다.
 */
import { BARS, CELLS, LENGTHS, type Bar, type Cell, barOf, slugOf } from './list.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 유효숫자 자리로 자른다 — 규격이 표에 적는 방식을 되짚을 때 쓴다 */
const sig = (x: number, digits: number): number => Number(x.toPrecision(digits));

/** 강의 밀도(kg/m³) — 탄소강은 강종이 달라도 이 값이다 */
export const STEEL_DENSITY = 7850;

/**
 * 널리 인용되는 0.006165 — 외워 적지 않고 밀도와 π에서 만든다.
 * tests/rebar-weight.test.ts가 이 값이 0.006165 언저리인지도 함께 본다.
 */
export const UNIT_COEF = (Math.PI / 4) * STEEL_DENSITY / 1e6;

/** 겹침이음 길이를 지름의 몇 배로 잡는가 — 흔히 쓰는 40db */
export const LAP_DB = 40;

/** 발주에 얹는 로스율 — 절단 손실과 여유로 3~5%를 본다 */
export const LOSS_RATE = 0.05;

/** 공칭지름(mm)의 단면적(mm²) */
export const areaOf = (mm: number): number => (Math.PI / 4) * mm ** 2;

/** 단위중량(kg/m) — 단면적을 m²로 고쳐 밀도를 곱한 값이다 */
export const unitWeight = (mm: number): number => (areaOf(mm) * STEEL_DENSITY) / 1e6;

/**
 * 규격이 표에 적는 단위중량 — 두 번 자른다.
 *
 * 규격은 단면적을 유효숫자 넷으로 적고(126.7mm²) 그 값에 밀도를 곱한 뒤 유효숫자
 * 셋으로 적는다(0.995kg/m). 공칭지름에서 곧바로 셋으로 자르면 D13만 0.994가 되어
 * 규격값과 어긋난다 — 자르는 순서까지 따라가야 열세 줄이 모두 맞는다.
 */
export const standardUnit = (mm: number): number =>
  sig((sig(areaOf(mm), 4) * STEEL_DENSITY) / 1e6, 3);

/** 총중량(kg) = 단위중량 × 길이 × 개수 */
export const totalWeight = (unit: number, length: number, count: number): number =>
  unit * length * count;

/** 로스를 얹은 무게(kg) — 발주는 이 값으로 낸다 */
export const withLoss = (kg: number, rate = LOSS_RATE): number => kg * (1 + rate);

export interface Neighbour {
  slug: string;
  d: number;
  length: number;
}

export interface RebarFacts {
  cell: Cell;
  slug: string;
  bar: Bar;
  /** 단면적(mm²) */
  area: number;
  /** 밀도와 π로 되짚은 단위중량(kg/m) — 규격값과 0.2% 안에서 맞는다 */
  exactUnit: number;
  /** 규격 단위중량(kg/m) — 화면과 물량 산출이 쓰는 값 */
  unit: number;
  /**
   * 호칭 숫자를 공칭지름인 줄 알고 넣었을 때 나오는 값(kg/m) — 틀린 값이다.
   * 화면이 이 값을 나란히 보여 준다. 왜 공칭지름을 써야 하는지는 이 한 줄이 말한다.
   */
  nameUnit: number;
  /** 한 가닥 무게(kg) */
  perBar: number;
  /** 10가닥·100가닥 무게(kg) */
  perTen: number;
  perHundred: number;
  /** 1톤에 몇 가닥 들어가는가 — 남는 것은 버리고 센다 */
  barsPerTon: number;
  /** 100가닥이 몇 톤인가 */
  tonsPerHundred: number;
  /** 겹침이음 한 곳의 길이(m)와 그만큼 늘어나는 무게(kg) */
  lapMetres: number;
  lapWeight: number;
  /** 100가닥을 로스까지 얹어 발주할 때의 무게(kg) */
  orderPerHundred: number;
  /** 이웃 칸 — 자기 자리 다음부터 원형으로 감아 고른다 */
  neighbours: Neighbour[];
}

/**
 * 자기 다음부터 원형으로 감아 고른다.
 *
 * 앞에서 N개를 잘라 오면 줄의 앞쪽만 서로 가리키고 뒤쪽 칸은 들어오는 링크가
 * 0이 된다 — 사이트맵에는 있고 아무 페이지도 안 가리키는 낱장이다. 자기 자리
 * 다음부터 감으면 모든 칸이 정확히 같은 수만큼 가리켜진다.
 */
const ring = <T,>(list: T[], at: number, take: number): T[] =>
  [...list.slice(at + 1), ...list.slice(0, at)].slice(0, take);

/** 한 칸에서 뻗는 이웃 수 — 같은 규격 줄에서 셋, 같은 길이 줄에서 셋 */
const NEAR_EACH = 3;

export function rebarFacts(c: Cell): RebarFacts {
  const bar = barOf(c.d);
  if (!bar) throw new Error(`모르는 규격: D${c.d}`);
  if (!LENGTHS.includes(c.length)) throw new Error(`모르는 길이: ${c.length}m`);

  const unit = bar.kg;
  const perBar = unit * c.length;
  const near = (d: number, length: number): Neighbour => ({ slug: slugOf({ d, length }), d, length });

  const li = LENGTHS.indexOf(c.length);
  const bi = BARS.findIndex(b => b.d === c.d);
  const lapMetres = (LAP_DB * bar.mm) / 1000;

  return {
    cell: c,
    slug: slugOf(c),
    bar,
    area: round(areaOf(bar.mm)),
    exactUnit: round(unitWeight(bar.mm), 4),
    unit,
    nameUnit: round(UNIT_COEF * c.d ** 2, 3),
    /*
     * 자리를 셋까지 남긴다. 단위중량이 소수 셋(0.995)이고 길이가 정수라 곱은 늘
     * 소수 셋에서 끝난다 — 둘로 자르면 D13 1m이 0.995가 아니라 1이 되어, 화면과
     * 검사가 함께 "1kg"이라고 말하게 된다.
     */
    perBar: round(perBar, 3),
    perTen: round(perBar * 10, 2),
    perHundred: round(perBar * 100, 2),
    barsPerTon: Math.floor(1000 / perBar),
    tonsPerHundred: round((perBar * 100) / 1000, 4),
    /* 40 × 9.53mm = 381.2mm처럼 소수 넷까지 나온다 */
    lapMetres: round(lapMetres, 4),
    lapWeight: round(lapMetres * unit, 3),
    orderPerHundred: round(withLoss(perBar * 100)),
    neighbours: [
      ...ring(LENGTHS, li, NEAR_EACH).map(length => near(c.d, length)),
      ...ring(BARS, bi, NEAR_EACH).map(b => near(b.d, c.length)),
    ],
  };
}

/** 같은 규격의 한 줄 — 길이만 다르다 */
export const atBar = (d: number): Cell[] => LENGTHS.map(length => ({ d, length }));

/** 같은 길이의 한 줄 — 규격만 다르다 */
export const atLength = (length: number): Cell[] => CELLS.filter(c => c.length === length);
