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

/*
 * ── 낱장마다 다른 문장을 만드는 갈래 (2026-08-12) ──────────────
 *
 * 애드센스가 "가치 없는 콘텐츠"로 거절한 뒤 111개 섹션을 실측했더니 이 섹션이
 * 가장 나빴다 — 형제 낱장끼리 **낱말 95.9%가 같았다**. 두 페이지를 맞대어 보니
 * 고유 낱말 357개 중 다른 것이 여섯 개뿐이었고, 그 여섯이 전부 숫자였다.
 * 글이 짧아서가 아니었다(본문 2,400자). 문장이 틀에서 나와 같았을 뿐이다.
 *
 * 그래서 **칸의 구조에서 갈래를 뽑는다.** 아래 열쇠는 언어를 가리지 않고
 * 계산으로 정해지므로, 언어마다 짧은 문장 한 줄씩만 두면 열 언어가 함께 갈린다.
 * 지어낸 사실이 아니라 이미 계산해 둔 것을 말로 옮기는 것이다.
 *
 * 열쇠를 facts에 두는 까닭은 검사가 되짚을 수 있어야 하기 때문이다 — 어느 칸에
 * 어떤 열쇠가 붙는지는 유전 규칙이 정하고, ui.ts는 그것을 읽어 쓰기만 한다.
 */
export type ReasonKey =
  /** 부모 유전자형이 둘 다 하나로 정해진다 — 확률이 값 하나다 */
  | 'bothFixed'
  /** 한쪽만 정해진다 */
  | 'oneFixed'
  /** 둘 다 여럿이라 확률이 범위로 나온다 */
  | 'neitherFixed'
  /** 이 부모에게서는 이 혈액형 하나만 나온다 */
  | 'onlyChild'
  /** 여덟 가지가 다 나올 수 있다 */
  | 'allEight'
  /** Rh−가 나오려면 부모가 둘 다 D를 하나만 가져야 한다 */
  | 'rhNegFromBothPlus'
  /** ABO 대립유전자가 없어서 안 된다 */
  | 'noAboAllele'
  /** Rh− 부모에게서 Rh+ 는 안 된다 */
  | 'noRhFromNeg'
  /** AB형 아이는 부모에게 A와 B가 따로 있어야 한다 */
  | 'abNeedsBoth'
  /** O형 아이는 부모가 둘 다 O를 하나씩 물려줘야 한다 */
  | 'oNeedsBoth';

/**
 * 이 칸에 붙는 갈래 열쇠들 — 앞의 것이 더 중요하다.
 *
 * 불가능한 칸은 **왜 불가능한지**를 먼저 말한다. 가능한 칸은 확률이 하나로
 * 정해지는지부터 말한다 — 사람들이 가장 먼저 묻는 것이 그것이다.
 */
export function reasonKeys(f: HeredityFacts): ReasonKey[] {
  const out: ReasonKey[] = [];

  if (!f.possible) {
    /*
     * 불가능한 까닭은 ABO 쪽일 수도 Rh 쪽일 수도 있고 둘 다일 수도 있다.
     * ABO만 떼어 보고 Rh만 떼어 봐서 어느 쪽이 막았는지 가른다.
     */
    const aboOk = childrenOf(f.father, f.mother).some(k => typeOf(k)!.abo === f.child.abo);
    const rhOk = childrenOf(f.father, f.mother).some(k => typeOf(k)!.rh === f.child.rh);
    /* Rh+ 아이가 Rh− 부모 둘에게서 나올 수 없는 자리 — D가 어디에도 없다 */
    if (!rhOk && f.child.rh) out.push('noRhFromNeg');
    if (!aboOk) {
      if (f.child.abo === 'AB') out.push('abNeedsBoth');
      else if (f.child.abo === 'O') out.push('oNeedsBoth');
      else out.push('noAboAllele');
    }
    if (!out.length) out.push(f.child.rh ? 'noRhFromNeg' : 'noAboAllele');
    return out;
  }

  if (f.fatherFixed && f.motherFixed) out.push('bothFixed');
  else if (f.fatherFixed || f.motherFixed) out.push('oneFixed');
  else out.push('neitherFixed');

  if (f.possibleChildren.length === 1) out.push('onlyChild');
  else if (f.possibleChildren.length === TYPES.length) out.push('allEight');

  // Rh− 아이가 Rh+ 부모 둘에게서 나오는 칸 — 사람들이 가장 많이 놀라는 자리다
  if (!f.child.rh && f.father.rh && f.mother.rh) out.push('rhNegFromBothPlus');

  return out;
}
