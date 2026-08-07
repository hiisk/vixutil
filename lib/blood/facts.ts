/**
 * 한 칸이 되는지 안 되는지 — 항원과 항체 둘만으로 정한다.
 *
 * 적혈구에는 항원이 붙어 있고, 혈장에는 자기가 갖지 않은 항원을 치는 항체가
 * 떠 있다. A형은 A항원을 갖고 항-B를 갖는다. O형은 항원이 없고 항-A·항-B를
 * 둘 다 갖는다. AB형은 항원이 둘 다 있고 항체가 없다.
 *
 *   적혈구 수혈 — 받는 사람의 항체가 주는 적혈구의 항원을 치면 안 된다
 *   혈장 수혈  — 주는 혈장의 항체가 받는 사람의 항원을 치면 안 된다
 *
 * 방향이 뒤집혀 있다. 그래서 O형은 적혈구를 모두에게 줄 수 있지만 혈장은
 * O형에게만 줄 수 있고, AB형은 정확히 그 반대다.
 *
 * 전혈은 적혈구와 혈장을 같이 넣는 것이니 두 조건을 모두 만족해야 한다.
 * 두 조건을 겹치면 ABO가 같은 경우만 남는다 — 따로 규칙을 적지 않았는데
 * "전혈은 동형만"이라는 실무 규칙이 계산에서 나온다.
 *
 * RhD는 자연항체가 없다. Rh− 사람이 Rh+ 적혈구를 받으면 그때 항-D를 만들기
 * 때문에 적혈구에서만 걸리고, 혈장에서는 따지지 않는다.
 */
import { COMPONENTS, TYPES, type BloodType, type Cell, type Component, slugOf, typeOf } from './list.ts';

export interface Antigens {
  A: boolean;
  B: boolean;
  D: boolean;
}

/** 혈액형 이름이 그대로 항원 목록이다 */
export const antigensOf = (t: BloodType): Antigens => ({
  A: t.abo === 'A' || t.abo === 'AB',
  B: t.abo === 'B' || t.abo === 'AB',
  D: t.rh,
});

/** 자연항체는 자기가 갖지 않은 ABO 항원을 친다 — RhD에는 자연항체가 없다 */
export const antibodiesOf = (t: BloodType): { A: boolean; B: boolean } => {
  const ag = antigensOf(t);
  return { A: !ag.A, B: !ag.B };
};

/** 막히는 까닭 — ui가 옮길 수 있게 열쇠말로 돌려준다 */
export type Reason = 'recip-anti-a' | 'recip-anti-b' | 'rh-sensitise' | 'donor-anti-a' | 'donor-anti-b';

/** 적혈구를 막는 것들 */
export function rbcReasons(d: BloodType, r: BloodType): Reason[] {
  const dAg = antigensOf(d);
  const rAg = antigensOf(r);
  const rAb = antibodiesOf(r);
  const out: Reason[] = [];
  if (dAg.A && rAb.A) out.push('recip-anti-a');
  if (dAg.B && rAb.B) out.push('recip-anti-b');
  if (dAg.D && !rAg.D) out.push('rh-sensitise');
  return out;
}

/** 혈장을 막는 것들 — 방향이 뒤집혀 있고 Rh는 따지지 않는다 */
export function plasmaReasons(d: BloodType, r: BloodType): Reason[] {
  const dAb = antibodiesOf(d);
  const rAg = antigensOf(r);
  const out: Reason[] = [];
  if (dAb.A && rAg.A) out.push('donor-anti-a');
  if (dAb.B && rAg.B) out.push('donor-anti-b');
  return out;
}

/** 성분 하나가 막히는 까닭 — 전혈은 적혈구와 혈장을 겹친 것이다 */
export function reasonsFor(component: Component, d: BloodType, r: BloodType): Reason[] {
  if (component === 'rbc') return rbcReasons(d, r);
  if (component === 'plasma') return plasmaReasons(d, r);
  return [...rbcReasons(d, r), ...plasmaReasons(d, r)];
}

export const okFor = (component: Component, d: BloodType, r: BloodType): boolean =>
  reasonsFor(component, d, r).length === 0;

/** 이 성분으로 줄 수 있는 상대의 수 */
export const reachOf = (component: Component, d: BloodType): number =>
  TYPES.filter(r => okFor(component, d, r)).length;

/** 이 성분으로 받을 수 있는 상대의 수 */
export const poolOf = (component: Component, r: BloodType): number =>
  TYPES.filter(d => okFor(component, d, r)).length;

export interface OtherComponent {
  component: Component;
  slug: string;
  ok: boolean;
}

export interface BloodFacts {
  cell: Cell;
  slug: string;
  donor: BloodType;
  recipient: BloodType;
  donorAntigens: Antigens;
  recipientAntigens: Antigens;
  donorAntibodies: { A: boolean; B: boolean };
  recipientAntibodies: { A: boolean; B: boolean };
  ok: boolean;
  reasons: Reason[];
  /** 반대 방향은 되는가 — 표가 대칭이 아니라는 것을 여기서 본다 */
  reverseOk: boolean;
  reverseSlug: string;
  /** 같은 짝의 다른 두 성분 */
  others: OtherComponent[];
  /** 주는 쪽이 이 성분으로 닿는 혈액형 수(여덟 중) */
  reach: number;
  /** 받는 쪽이 이 성분으로 고를 수 있는 혈액형 수(여덟 중) */
  pool: number;
  /** 이 성분의 만능 공혈자인가 */
  universalDonor: boolean;
  /** 이 성분의 만능 수혈자인가 */
  universalRecipient: boolean;
  /** 같은 짝의 적혈구 답 — 성분이 무엇이든 들고 다닌다 */
  rbcOk: boolean;
  /** 같은 짝의 혈장 답 */
  plasmaOk: boolean;
  /** 같은 짝에서 적혈구와 혈장의 답이 갈리는가 */
  split: boolean;
}

export function bloodFacts(c: Cell): BloodFacts {
  const d = typeOf(c.donor);
  const r = typeOf(c.recipient);
  if (!d || !r) throw new Error(`혈액형이 없다: ${c.donor} → ${c.recipient}`);

  const reach = reachOf(c.component, d);
  const pool = poolOf(c.component, r);

  return {
    cell: c,
    slug: slugOf(c),
    donor: d,
    recipient: r,
    donorAntigens: antigensOf(d),
    recipientAntigens: antigensOf(r),
    donorAntibodies: antibodiesOf(d),
    recipientAntibodies: antibodiesOf(r),
    ok: okFor(c.component, d, r),
    reasons: reasonsFor(c.component, d, r),
    reverseOk: okFor(c.component, r, d),
    reverseSlug: slugOf({ component: c.component, donor: c.recipient, recipient: c.donor }),
    others: COMPONENTS.filter(x => x !== c.component).map(component => ({
      component,
      slug: slugOf({ component, donor: c.donor, recipient: c.recipient }),
      ok: okFor(component, d, r),
    })),
    reach,
    pool,
    universalDonor: reach === TYPES.length,
    universalRecipient: pool === TYPES.length,
    rbcOk: okFor('rbc', d, r),
    plasmaOk: okFor('plasma', d, r),
    split: okFor('rbc', d, r) !== okFor('plasma', d, r),
  };
}

/** 한 성분의 8×8 표 — 줄이 주는 쪽, 칸이 받는 쪽이다 */
export const gridOf = (component: Component): Cell[][] =>
  TYPES.map(d => TYPES.map(r => ({ component, donor: d.key, recipient: r.key })));
