/**
 * 어떤 아이가 나올 수 있는가 — 퍼넷 사각형 하나로 끝난다.
 *
 * 부모는 저마다 두 개씩 가진 대립유전자 가운데 하나를 물려준다. 그러니 아이의
 * 유전자형은 (아버지 둘) × (어머니 둘) = 네 가지이고, 네 칸을 표현형으로
 * 바꿔 세면 확률이 나온다.
 *
 * ABO와 Rh는 서로 다른 염색체에 있어 따로 논다. 그래서 A+ 가 나올 확률은
 * A가 나올 확률 × Rh+ 가 나올 확률이다.
 *
 * 부모의 혈액형만으로는 유전자형이 하나로 정해지지 않는다 — A형은 AA일 수도
 * AO일 수도 있다. 그래서 이 표는 "될 수 있는가"를 먼저 답하고, 확률은 부모의
 * 유전자형이 정해졌을 때의 값으로 낸다. 인구 통계를 가져다 쓰지 않는 편이
 * 정직하고, 사람들이 알고 싶어 하는 것도 그쪽이다.
 */
import {
  ABO_GENOTYPES, RH_GENOTYPES, TYPES, type AboAllele, type BloodType, type Cell, type RhAllele,
  genotypeText, slugOf, typeOf,
} from './list.ts';

/** A와 B는 공동우성, O는 둘 다에 진다 */
export const aboPhenotype = (g: [AboAllele, AboAllele]): string => {
  const a = g.includes('A');
  const b = g.includes('B');
  if (a && b) return 'AB';
  if (a) return 'A';
  if (b) return 'B';
  return 'O';
};

/** D 하나만 있어도 Rh+ 다 */
export const rhPhenotype = (g: [RhAllele, RhAllele]): boolean => g.includes('D');

/** 그 혈액형으로 보이는 유전자형들 */
export const aboGenotypesFor = (abo: string): [AboAllele, AboAllele][] =>
  ABO_GENOTYPES.filter(g => aboPhenotype(g) === abo);

export const rhGenotypesFor = (rh: boolean): [RhAllele, RhAllele][] =>
  RH_GENOTYPES.filter(g => rhPhenotype(g) === rh);

/** 퍼넷 사각형 — 네 칸을 세어 표현형별 몫을 돌려준다 */
function cross<T extends string, P extends string | boolean>(
  a: [T, T],
  b: [T, T],
  pheno: (g: [T, T]) => P,
): Map<P, number> {
  const out = new Map<P, number>();
  for (const x of a) {
    for (const y of b) {
      const p = pheno([x, y] as [T, T]);
      out.set(p, (out.get(p) ?? 0) + 1);
    }
  }
  return out;
}

export interface Route {
  /** 아버지 쪽 유전자형 */
  father: string;
  /** 어머니 쪽 유전자형 */
  mother: string;
  /** 이 조합에서 이 아이가 나올 확률 — 넷 중 몇 꼴로 적는다 */
  numerator: number;
  denominator: number;
}

export interface HeredityFacts {
  cell: Cell;
  slug: string;
  father: BloodType;
  mother: BloodType;
  child: BloodType;
  /** 나올 수 있는가 */
  possible: boolean;
  /** 나올 수 있게 하는 부모 유전자형 조합들 */
  routes: Route[];
  /** 그 가운데 가장 낮은 확률(퍼센트) */
  minChance: number;
  /** 가장 높은 확률(퍼센트) */
  maxChance: number;
  /** 화면에 찍는 확률 — 갈래가 여럿이면 범위로 낸다. 최댓값만 보이면 확정처럼 읽힌다 */
  chanceText: string;
  /** 이 부모에게서 나올 수 있는 혈액형 전부 */
  possibleChildren: string[];
  /** 절대 나올 수 없는 혈액형 */
  impossibleChildren: string[];
  /** 아버지·어머니를 바꿔도 답은 같다 */
  swapSlug: string;
  /** 부모의 혈액형만으로 유전자형이 하나로 정해지는가 */
  fatherFixed: boolean;
  motherFixed: boolean;
}

const pct = (n: number) => Math.round(n * 1000) / 10;

/** 부모 한 쌍에서 나올 수 있는 아이의 혈액형 열쇠들 */
export function childrenOf(f: BloodType, m: BloodType): string[] {
  const out = new Set<string>();
  for (const fa of aboGenotypesFor(f.abo)) {
    for (const ma of aboGenotypesFor(m.abo)) {
      for (const abo of cross(fa, ma, aboPhenotype).keys()) {
        for (const fr of rhGenotypesFor(f.rh)) {
          for (const mr of rhGenotypesFor(m.rh)) {
            for (const rh of cross(fr, mr, rhPhenotype).keys()) {
              out.add(`${abo.toLowerCase()}-${rh ? 'pos' : 'neg'}`);
            }
          }
        }
      }
    }
  }
  return TYPES.filter(t => out.has(t.key)).map(t => t.key);
}

export function heredityFacts(c: Cell): HeredityFacts {
  const f = typeOf(c.father);
  const m = typeOf(c.mother);
  const child = typeOf(c.child);
  if (!f || !m || !child) throw new Error(`혈액형이 없다: ${c.father} × ${c.mother} → ${c.child}`);

  const routes: Route[] = [];
  for (const fa of aboGenotypesFor(f.abo)) {
    for (const ma of aboGenotypesFor(m.abo)) {
      const aboShare = cross(fa, ma, aboPhenotype).get(child.abo) ?? 0;
      if (aboShare === 0) continue;
      for (const fr of rhGenotypesFor(f.rh)) {
        for (const mr of rhGenotypesFor(m.rh)) {
          const rhShare = cross(fr, mr, rhPhenotype).get(child.rh) ?? 0;
          if (rhShare === 0) continue;
          routes.push({
            father: `${genotypeText(fa)} · ${genotypeText(fr)}`,
            mother: `${genotypeText(ma)} · ${genotypeText(mr)}`,
            numerator: aboShare * rhShare,
            denominator: 16,
          });
        }
      }
    }
  }

  const chances = routes.map(r => r.numerator / r.denominator);
  const lo = chances.length ? pct(Math.min(...chances)) : 0;
  const hi = chances.length ? pct(Math.max(...chances)) : 0;
  const possibleChildren = childrenOf(f, m);

  return {
    cell: c,
    slug: slugOf(c),
    father: f,
    mother: m,
    child,
    possible: routes.length > 0,
    routes,
    minChance: lo,
    maxChance: hi,
    chanceText: chances.length === 0 ? '0%' : lo === hi ? `${hi}%` : `${lo}~${hi}%`,
    possibleChildren,
    impossibleChildren: TYPES.filter(t => !possibleChildren.includes(t.key)).map(t => t.key),
    swapSlug: slugOf({ father: c.mother, mother: c.father, child: c.child }),
    fatherFixed: aboGenotypesFor(f.abo).length === 1 && rhGenotypesFor(f.rh).length === 1,
    motherFixed: aboGenotypesFor(m.abo).length === 1 && rhGenotypesFor(m.rh).length === 1,
  };
}

/** 같은 부모의 여덟 칸 */
export const atParents = (father: string, mother: string): Cell[] =>
  TYPES.map(t => ({ father, mother, child: t.key }));
