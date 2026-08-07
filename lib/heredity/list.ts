/**
 * 혈액형 유전 512칸 — 아버지 8 × 어머니 8 × 아이 8.
 *
 * 적는 자료는 대립유전자 이름뿐이다. ABO는 A·B·O 셋, Rh는 D·d 둘이다.
 * 유전자형도, 어떤 아이가 나올 수 있는지도, 그 확률도 전부 계산이다(facts.ts).
 *
 * 혈액형 여덟은 `/blood`가 이미 같은 열쇠로 들고 있어 그대로 가져다 쓴다.
 * 주소도 같은 조각(`a-pos`, `ab-neg`)으로 맞춘다.
 *
 * 이 표가 답하는 물음은 "A형 아버지와 B형 어머니에게서 O형 아이가 나올 수
 * 있는가" 같은 것이다. 확률은 부모의 유전자형이 정해졌을 때의 값이라 인구
 * 통계가 필요 없다 — 사람들이 실제로 알고 싶어 하는 것도 그쪽이다.
 */
export { TYPES, labelOf, typeOf, type BloodType } from '../blood/list.ts';
import { TYPES } from '../blood/list.ts';

/** ABO 대립유전자 셋 — A와 B는 공동우성이고 둘 다 O보다 세다 */
export const ABO_ALLELES = ['A', 'B', 'O'] as const;
export type AboAllele = (typeof ABO_ALLELES)[number];

/** Rh 대립유전자 둘 — D가 d보다 세다 */
export const RH_ALLELES = ['D', 'd'] as const;
export type RhAllele = (typeof RH_ALLELES)[number];

/** 순서 없는 짝을 모두 만든다 — AA·AB·AO·BB·BO·OO 여섯이 나온다 */
const pairsOf = <T extends string>(alleles: readonly T[]): [T, T][] =>
  alleles.flatMap((a, i) => alleles.slice(i).map(b => [a, b] as [T, T]));

export const ABO_GENOTYPES: [AboAllele, AboAllele][] = pairsOf(ABO_ALLELES);
export const RH_GENOTYPES: [RhAllele, RhAllele][] = pairsOf(RH_ALLELES);

export const genotypeText = (g: [string, string]): string => g.join('');

export interface Cell {
  /** 부모 한쪽의 혈액형 key */
  father: string;
  /** 부모 다른 쪽의 혈액형 key */
  mother: string;
  /** 아이의 혈액형 key */
  child: string;
}

export const CELLS: Cell[] = TYPES.flatMap(f =>
  TYPES.flatMap(m => TYPES.map(c => ({ father: f.key, mother: m.key, child: c.key }))),
);

export const slugOf = (c: Cell): string => `${c.father}-x-${c.mother}-to-${c.child}`;

export const HEREDITY_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const HEREDITY_ICON = '🧬';
