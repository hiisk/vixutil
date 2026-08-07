/**
 * 수혈 적합 192칸 — 성분 셋 × 주는 혈액형 여덟 × 받는 혈액형 여덟.
 *
 * 여기에 적는 자료는 ABO 넷과 Rh 둘, 성분 셋뿐이다. 혈액형 여덟도, 어느 칸이
 * 되고 안 되는지도 전부 계산이다(facts.ts).
 *
 * 이 표의 진짜 물음은 "적혈구와 혈장의 규칙이 서로 뒤집혀 있다"는 것이다.
 * O형은 적혈구의 만능 공혈자지만 혈장은 O형에게만 줄 수 있고, AB형은
 * 적혈구의 만능 수혈자지만 혈장은 모두에게 줄 수 있다. 같은 사람이 성분에
 * 따라 정반대 자리에 선다.
 *
 * 실제 수혈은 이 표가 아니라 검사실의 교차시험(crossmatch)이 정한다.
 * 이 표는 왜 그런 규칙이 되는지를 보여 주는 것이다.
 */

/** ABO 넷 — 이름 자체가 항원 목록이다 */
export const ABO = ['O', 'A', 'B', 'AB'] as const;
export type Abo = (typeof ABO)[number];

/** RhD 항원의 있고 없음 */
export const RH = [true, false] as const;

/** 성분 셋 — 규칙이 서로 다르다 */
export const COMPONENTS = ['rbc', 'plasma', 'whole'] as const;
export type Component = (typeof COMPONENTS)[number];

export interface BloodType {
  /** 'o-neg' 같은 슬러그 조각 */
  key: string;
  abo: Abo;
  /** RhD 항원이 있으면 true */
  rh: boolean;
}

const rhTag = (rh: boolean) => (rh ? 'pos' : 'neg');

/** 혈액형 여덟 — ABO 넷과 Rh 둘의 곱이다 */
export const TYPES: BloodType[] = ABO.flatMap(abo =>
  RH.map(rh => ({ key: `${abo.toLowerCase()}-${rhTag(rh)}`, abo, rh })),
);

/** 사람이 읽는 표기 — A+ / AB− */
export const labelOf = (t: BloodType): string => `${t.abo}${t.rh ? '+' : '−'}`;

const BY_KEY = new Map(TYPES.map(t => [t.key, t]));

export const typeOf = (key: string): BloodType | undefined => BY_KEY.get(key);

export interface Cell {
  component: Component;
  /** 주는 사람의 혈액형 key */
  donor: string;
  /** 받는 사람의 혈액형 key */
  recipient: string;
}

export const CELLS: Cell[] = COMPONENTS.flatMap(component =>
  TYPES.flatMap(d => TYPES.map(r => ({ component, donor: d.key, recipient: r.key }))),
);

export const slugOf = (c: Cell): string => `${c.component}-${c.donor}-to-${c.recipient}`;

export const BLOOD_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const BLOOD_ICON = '🩸';
