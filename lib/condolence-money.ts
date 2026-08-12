/**
 * 부의금(조의금) — 얼마가 맞다고 정한 곳이 없다.
 *
 * 축의금과 달라서가 아니라 **경조사비 전체가** 그렇다. 법도 고시도 표준도 없고,
 * 지역·집안·나이대·직장 관례마다 다르다. 그래서 이 파일은 "정답 금액"을 내지
 * 않는다. 널리 쓰이는 단위(3·5·7·10만원)와 **판단의 축** 몇 개를 두고, 고른
 * 조건에 따라 **범위를 좁혀** 준다. 여기 적힌 기준액과 배율은 모두 우리가 정한
 * 어림이고, 화면에도 그렇게 적어 둔다.
 *
 * ── 축이 여섯이다 ──────────────────────────────────────────────
 *  ① 관계        — 거래처에서 친척까지. 기준액을 정한다
 *  ② 왕래의 깊이 — 이름만 아는 사이인지, 자주 만나는 사이인지
 *  ③ 조문 여부   — 직접 가면 **식대 몫**이 더 든다. 부의금만 보내면 그것이 없다
 *  ④ 동반 인원   — 배우자·자녀와 함께 가면 식대가 그만큼 늘어난다
 *  ⑤ 나이대      — 사회 초년생과 중년의 관습이 같지 않다
 *  ⑥ 받은 부조   — 전에 받은 적이 있으면 그만큼 맞추는 것이 관습이다(하한이 된다)
 *
 * ① ② ⑤는 곱으로, ③ ④는 식대라는 덧셈으로 들어간다. 식대는 사람 수에 비례하는
 * 실제 비용이라 관계에 비례할 이유가 없다 — 그래서 배율이 아니라 덧셈이다.
 *
 * ── 관습 단위로 맞춘다 ─────────────────────────────────────────
 * 셈해서 나온 값(예: 8.5만원)을 그대로 내지 않는다. 봉투에 넣는 금액은
 * 3·5·7·10만원처럼 **홀수 또는 10의 배수**로 맞추는 관습이 있고, 4가 들어간
 * 금액은 피한다. CUSTOMARY_UNITS가 그 사다리이고 isCustomaryUnit이 규칙이다.
 * 둘을 따로 둔 것은 사다리에 규칙을 어긴 값이 섞이면 검사가 잡게 하려는 것이다.
 *
 * ── 이 계산 밖에 있는 것 ───────────────────────────────────────
 * 부모·형제자매·직계 가족은 관습이 아예 다르고(상주 쪽으로 들어가는 경우가 많다)
 * 회사가 정한 경조사비 규정이 있으면 그것이 먼저다. 둘 다 여기서 다루지 않는다.
 */

/** 장례식장 식사 한 사람 몫(만원) — 조문을 가면 이만큼이 더 든다는 어림 */
export const MEAL_PER_PERSON = 1.5;

/** 권하는 범위를 중심값의 몇 배로 잡는가 — 아래로 조금, 위로 조금 */
export const RANGE_LOW = 0.85;
export const RANGE_HIGH = 1.4;

/**
 * 봉투에 넣는 금액으로 널리 쓰이는 단위(만원).
 *
 * 3만원이 바닥이다 — 1만원은 부조로 너무 적다는 인식이 널리 있다. 위쪽 150만원
 * 이상은 셈으로는 닿지 않고, 받은 부조가 그만큼일 때 하한으로만 쓰인다.
 */
export const CUSTOMARY_UNITS = [3, 5, 7, 10, 15, 20, 30, 50, 70, 100, 150, 200, 300, 500];

/**
 * 관습 단위인가 — 사다리가 아니라 규칙이다.
 *
 *  · 4가 들어간 금액은 피한다(4 → 死). 40만원은 10의 배수여도 안 된다
 *  · 홀수로 맞추거나(3·5·7·15만원), 10의 배수로 맞춘다(10·20·30만원)
 */
export const isCustomaryUnit = (man: number): boolean =>
  Number.isInteger(man)
  && man > 0
  && !String(man).includes('4')
  && (man % 2 === 1 || man % 10 === 0);

const MIN_UNIT = CUSTOMARY_UNITS[0];
const MAX_UNIT = CUSTOMARY_UNITS[CUSTOMARY_UNITS.length - 1];

/**
 * 가장 가까운 관습 단위로 맞춘다. 딱 가운데면 **올려** 맞춘다 —
 * 부조는 모자란 쪽보다 넉넉한 쪽으로 올리는 것이 관습이다.
 */
export function snapNearest(man: number): number {
  if (man <= MIN_UNIT) return MIN_UNIT;
  if (man >= MAX_UNIT) return MAX_UNIT;
  let best = MIN_UNIT;
  for (const u of CUSTOMARY_UNITS) {
    if (Math.abs(u - man) <= Math.abs(best - man)) best = u;
  }
  return best;
}

/** 관습 단위로 올려 맞춘다 — 받은 부조를 하한으로 쓸 때 모자라지 않게 */
export function snapUp(man: number): number {
  for (const u of CUSTOMARY_UNITS) if (u >= man) return u;
  return MAX_UNIT;
}

export type RelationKey = 'client' | 'coworker' | 'boss' | 'friend' | 'closeFriend' | 'relative';
export type ClosenessKey = 'name' | 'sometimes' | 'often';
export type AgeKey = 'young' | 'mid' | 'senior';

export interface RelationSpec {
  key: RelationKey;
  label: string;
  /** 부의금만 보낼 때의 기준액(만원). 조문을 가면 여기에 식대가 붙는다 */
  base: number;
}

/**
 * 관계 — 먼 쪽에서 가까운 쪽으로 늘어놓았다. 뒤로 갈수록 기준액이 커진다.
 *
 * 기준액은 우리가 정한 어림이다. 근거는 "널리 오간다고 이야기되는 금액대"이지
 * 조사나 고시가 아니다. 관습 단위로 맞추는 단계에서 어차피 3·5·7·10만원으로
 * 모이므로, 이 숫자들의 소수점 한 자리를 두고 다툴 이유는 없다.
 */
export const RELATIONS: readonly RelationSpec[] = [
  { key: 'client',      label: '거래처·업무로 아는 사이', base: 3 },
  { key: 'coworker',    label: '직장 동료',               base: 4 },
  { key: 'boss',        label: '직장 상사·부하',          base: 5 },
  { key: 'friend',      label: '친구·동창',               base: 7 },
  { key: 'closeFriend', label: '아주 친한 친구',          base: 12 },
  { key: 'relative',    label: '친척',                    base: 18 },
];

export interface FactorSpec<K extends string> {
  key: K;
  label: string;
  /** 기준액에 곱하는 배율 */
  mult: number;
}

/** 왕래의 깊이 — 같은 '직장 동료'라도 이름만 아는 사이와 매일 붙어 있는 사이가 다르다 */
export const CLOSENESS: readonly FactorSpec<ClosenessKey>[] = [
  { key: 'name',      label: '이름만 아는 사이',   mult: 0.7 },
  { key: 'sometimes', label: '가끔 연락하는 사이', mult: 1.0 },
  { key: 'often',     label: '자주 만나는 사이',   mult: 1.3 },
];

/** 본인 나이대 — 사회 초년생에게 중년의 관습을 그대로 씌우지 않는다 */
export const AGES: readonly FactorSpec<AgeKey>[] = [
  { key: 'young',  label: '사회 초년생·학생', mult: 0.8 },
  { key: 'mid',    label: '30대',             mult: 1.0 },
  { key: 'senior', label: '40대 이상',        mult: 1.25 },
];

export interface Answers {
  relation: RelationKey;
  closeness: ClosenessKey;
  /** 직접 문상을 가는가. 아니면 부의금만 보내는가 */
  attend: boolean;
  /** 본인 말고 함께 가는 사람 수(배우자·자녀). 조문을 안 가면 셈에 안 들어간다 */
  companions: number;
  age: AgeKey;
  /** 전에 이 상대에게서 받은 부조 금액(만원). 없으면 0 */
  received: number;
}

/** 어느 축이 얼마를 올렸나 — 한 줄씩 더하면 center가 된다 */
export interface Reason {
  label: string;
  /** 만원. 기준액이거나 증감분 */
  amount: number;
}

export interface Suggestion {
  /** 관습 단위로 맞추기 전의 중심값(만원) */
  center: number;
  /** 권하는 하한(만원, 관습 단위) */
  low: number;
  /** 권하는 상한(만원, 관습 단위) */
  high: number;
  /** 범위 안에 있는 관습 단위들 — 이 중에서 고르면 된다 */
  picks: number[];
  /** 그 중 가장 무난한 값 — 중심값에 가장 가까운 관습 단위 */
  common: number;
  /** 식대 몫(만원). 부의금만 보내면 0 */
  meal: number;
  reasons: Reason[];
  /** 받은 부조가 하한을 끌어올렸으면 그 값(만원). 아니면 null */
  receivedFloor: number | null;
}

const spec = <K extends string, T extends { key: K }>(list: readonly T[], key: K): T => {
  const found = list.find(x => x.key === key);
  if (!found) throw new Error(`모르는 값: ${key}`);
  return found;
};

/** 소수점 두 자리까지 — 배율을 곱하면 0.1의 자리 밑에 부동소수 찌꺼기가 남는다 */
const round2 = (n: number): number => Math.round(n * 100) / 100;

export function suggest(a: Answers): Suggestion {
  const relation = spec(RELATIONS, a.relation);
  const closeness = spec(CLOSENESS, a.closeness);
  const age = spec(AGES, a.age);

  // 조문을 가지 않으면 동반 인원은 셈에 들어가지 않는다 — 식대가 없으니 사람 수도 없다
  const heads = a.attend ? 1 + Math.max(0, Math.floor(a.companions)) : 0;
  const meal = round2(heads * MEAL_PER_PERSON);

  const afterCloseness = relation.base * closeness.mult;
  const afterAge = afterCloseness * age.mult;

  /*
    까닭을 먼저 만들고 중심값을 그 합으로 낸다 — 순서를 뒤집으면 화면에 뜬
    줄들을 더한 값과 큰 숫자가 1,000원쯤 어긋난다(배율을 곱하면 소수점 밑에
    찌꺼기가 남아 각 줄을 반올림하기 때문이다). 합이 맞아야 "왜 이 금액인가"가
    설명이 된다.
  */
  const reasons: Reason[] = [
    { label: `관계 · ${relation.label}`, amount: round2(relation.base) },
    { label: `왕래 · ${closeness.label}`, amount: round2(afterCloseness - relation.base) },
    { label: `나이대 · ${age.label}`, amount: round2(afterAge - afterCloseness) },
    {
      label: a.attend ? `조문 식대 · ${heads}명 몫` : '부의금만 보냄 · 식대 없음',
      amount: meal,
    },
  ];
  const center = round2(reasons.reduce((sum, r) => sum + r.amount, 0));

  // 받은 부조는 하한을 끌어올린다 — 받은 것보다 적게 내지 않도록 올려 맞춘다
  const received = Math.max(0, a.received);
  const floor = received > 0 ? snapUp(received) : null;

  let low = snapNearest(center * RANGE_LOW);
  let high = snapNearest(center * RANGE_HIGH);
  if (floor !== null) {
    low = Math.max(low, floor);
    high = Math.max(high, low);
  }

  const common = Math.min(Math.max(snapNearest(center), low), high);

  return {
    center,
    low,
    high,
    picks: CUSTOMARY_UNITS.filter(u => u >= low && u <= high),
    common,
    meal,
    reasons,
    receivedFloor: floor,
  };
}
