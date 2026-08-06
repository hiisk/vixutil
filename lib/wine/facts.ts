/**
 * 병 크기와 잔 크기 하나가 만드는 잔 수.
 *
 *   잔 수 = 병 용량 ÷ 잔 용량
 *
 * 큰 병의 크기는 표준병 750ml의 배수로 정해져 있다. 매그넘이 두 병, 므두셀라가
 * 여덟 병, 느부갓네살이 스무 병이다. 그래서 표준병 몇 병분인지도 계산으로
 * 나온다 — 자료가 아니라 나눗셈이다.
 *
 * 이름 쪽이 오히려 어수선하다. 제로보암은 부르고뉴·샹파뉴에서 3리터인데
 * 보르도에서는 5리터를 가리키고, 보르도는 3리터짜리를 더블 매그넘이라
 * 부른다. 그래서 이 표는 제로보암을 둘로 나눠 적는다.
 */
import { BOTTLES, GLASSES_PER_PERSON, POURS, STANDARD_ML, type Cell, bottleOf, slugOf } from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 잔 수 — 딱 떨어지지 않을 수 있다 */
export const glassesOf = (ml: number, pour: number): number => ml / pour;

/** 표준병 몇 병분인가 */
export const standardsOf = (ml: number): number => ml / STANDARD_ML;

export interface Neighbour {
  slug: string;
  bottle: string;
  pour: number;
}

export interface WineFacts {
  cell: Cell;
  slug: string;
  /** 병 용량(ml) */
  ml: number;
  /** 리터 */
  litres: number;
  /** 표준병 몇 병분 */
  standards: number;
  /** 잔 수(소수) */
  glasses: number;
  /** 가득 채워 낼 수 있는 잔 수 */
  fullGlasses: number;
  /** 마지막 잔에 남는 양(ml) */
  remainder: number;
  /** 한 사람이 두 잔씩 마신다면 몇 사람 */
  people: number;
  /** 같은 용량을 보르도에서 부르는 다른 이름 */
  bordeaux: string | null;
  smaller: Neighbour | null;
  larger: Neighbour | null;
}

export function wineFacts(c: Cell): WineFacts {
  const b = bottleOf(c.bottle);
  if (!b) throw new Error(`병이 없다: ${c.bottle}`);
  const glasses = glassesOf(b.ml, c.pour);
  const i = POURS.indexOf(c.pour);
  const near = (pour: number): Neighbour => ({ slug: slugOf({ bottle: c.bottle, pour }), bottle: c.bottle, pour });

  return {
    cell: c,
    slug: slugOf(c),
    ml: b.ml,
    litres: round(b.ml / 1000, 3),
    standards: round(standardsOf(b.ml), 2),
    glasses: round(glasses, 2),
    fullGlasses: Math.floor(glasses),
    remainder: round(b.ml - Math.floor(glasses) * c.pour, 1),
    people: Math.floor(glasses / GLASSES_PER_PERSON),
    bordeaux: b.bordeaux ?? null,
    smaller: i > 0 ? near(POURS[i - 1]) : null,
    larger: i + 1 < POURS.length ? near(POURS[i + 1]) : null,
  };
}

/** 같은 병의 한 줄 */
export const atBottle = (bottle: string): Cell[] => POURS.map(pour => ({ bottle, pour }));

/** 같은 잔 크기의 한 줄 */
export const atPour = (pour: number): Cell[] => BOTTLES.map(b => ({ bottle: b.key, pour }));
