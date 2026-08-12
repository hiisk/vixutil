/**
 * 세뱃돈 — 얼마를 주면 되는가.
 *
 * 이 계산에는 근거로 삼을 법도 고시도 없다. 축의금과 마찬가지로 관습이고,
 * 집안·지역·형편마다 다르다. 그래서 여기서 내는 것은 **정답 금액이 아니라
 * 우리가 정한 어림**이다. 하는 일은 두 가지뿐이다 —
 *
 *   1. 널리 쓰이는 단위(지폐로 세어 떨어지는 금액)만 내놓는다
 *   2. 사람들이 실제로 따지는 축으로 범위를 좁힌다 — 나이·관계·형제·받은 것
 *
 * ── 왜 금액이 아니라 사다리인가 ────────────────────────────────
 * 세뱃돈은 7,000원이나 12,000원으로 주지 않는다. 5천·1만·2만·3만·5만처럼
 * 지폐로 세어 떨어지는 몇 개의 단위만 쓴다. 그래서 금액을 연속된 숫자로 곱하고
 * 나누지 않고, **단위 사다리의 몇 번째 칸**으로 다룬다. 모든 축이 하는 일은
 * 이 사다리를 몇 칸 올리거나 내리는 것뿐이다. 그러면 어떤 조합에서도 결과가
 * 사다리 위에 남는다 — 7,000원이 나올 길이 없다.
 *
 * 4가 들어가는 금액(4만·40만)은 사다리에 두지 않았다. 축의금에서 4를 피하는
 * 것과 같은 관례다.
 *
 * ── 이 파일이 답하지 않는 것 ──────────────────────────────────
 * "얼마가 맞느냐"에는 답하지 않는다. 나이 구간마다 사다리 한 칸 폭의 **범위**를
 * 내고, 여러 아이를 넣으면 그 범위의 합계를 낸다. 하나의 숫자를 내지 않는 것은
 * 낼 근거가 없기 때문이다.
 */

/**
 * 단위 사다리 — 이 아홉 개 말고는 내놓지 않는다.
 *
 * 5만원권·1만원권·5천원권으로 세어 떨어지고, 사람들이 실제로 입에 올리는
 * 단위만 골랐다. 4만·40만은 관례로 뺐다. 위로는 30만에서 멈춘다 —
 * 그보다 큰 금액은 세뱃돈이라기보다 다른 이름의 돈이고, 증여 문제도 걸린다.
 */
export const UNITS = [5_000, 10_000, 20_000, 30_000, 50_000, 100_000, 150_000, 200_000, 300_000];

/** 사다리 맨 위 칸 번호 */
export const TOP_RUNG = UNITS.length - 1;

/** 칸 번호를 금액으로. 사다리 밖으로 밀려난 칸은 끝 칸에 붙인다 */
export const unitAt = (rung: number): number =>
  UNITS[Math.min(Math.max(Math.round(rung), 0), TOP_RUNG)];

/** 금액을 사다리에서 가장 가까운 칸으로 읽는다 — 받은 금액을 견줄 때 쓴다 */
export function nearestRung(won: number): number {
  let best = 0;
  for (let i = 1; i <= TOP_RUNG; i++) {
    if (Math.abs(UNITS[i] - won) < Math.abs(UNITS[best] - won)) best = i;
  }
  return best;
}

export type StageId = 'preschool' | 'lower' | 'upper' | 'middle' | 'high' | 'univ' | 'adult';

export interface Stage {
  id: StageId;
  label: string;
  hint: string;
  /**
   * 이 나이의 출발 칸. 범위의 상한은 **언제나 한 칸 위**다.
   *
   * 구간마다 폭을 다르게 두고 싶은 마음이 들지만, 한 칸 폭으로 고정한 것은
   * 근거 없이 어떤 나이는 넓게 어떤 나이는 좁게 잡을 이유가 없기 때문이다.
   * 폭이 한 칸으로 같으면 나이가 올라갈 때 범위가 통째로 밀려 올라간다.
   */
  rung: number;
}

/**
 * 나이·학년 — 사다리를 오르는 순서다.
 *
 * 학년이 올라가면 칸이 줄지 않는다. 고등학생부터 위는 같은 칸에 두었다 —
 * 관습이 여기서 오르기를 멈추는 쪽이 흔하고, 취업하면 아예 주지 않는
 * 집도 많다. 근거 없이 더 올리는 대신 멈춰 세웠다.
 */
export const STAGES: Stage[] = [
  { id: 'preschool', label: '미취학',            hint: '세배를 막 배우는 나이',     rung: 0 },
  { id: 'lower',     label: '초등 저학년(1~3학년)', hint: '혼자 쓰기 시작하는 나이',  rung: 1 },
  { id: 'upper',     label: '초등 고학년(4~6학년)', hint: '친구들과 견주기 시작한다',  rung: 2 },
  { id: 'middle',    label: '중학생',            hint: '쓰는 데가 늘어난다',        rung: 3 },
  { id: 'high',      label: '고등학생',          hint: '어른 금액에 가까워진다',     rung: 4 },
  { id: 'univ',      label: '대학생',            hint: '고등학생과 같은 자리에 둔다', rung: 4 },
  { id: 'adult',     label: '취업 전 성인',       hint: '주지 않는 집도 많다',        rung: 4 },
];

export type RelationId = 'child' | 'nephew' | 'cousinKid' | 'friendKid' | 'neighbor';

export interface Relation {
  id: RelationId;
  label: string;
  /** 사다리를 몇 칸 움직이나. 조카를 0으로 두고 그 위아래를 잡았다 */
  steps: number;
}

/**
 * 관계 — 가까운 순서로 적는다. 가까울수록 칸이 줄지 않는다.
 *
 * 조카를 기준(0칸)으로 삼은 것은 이 계산을 찾는 말이 대개 "조카 세뱃돈
 * 얼마"이기 때문이다. 내 자녀를 한 칸 위에 둔 것은 **우리가 정한 순서**다 —
 * 실제로는 남의 아이에게 체면을 세우고 내 아이에게는 덜 주거나 통장에
 * 넣어 두는 집도 많다.
 */
export const RELATIONS: Relation[] = [
  { id: 'child',     label: '내 자녀',    steps: 1 },
  { id: 'nephew',    label: '조카',       steps: 0 },
  { id: 'cousinKid', label: '사촌 조카',  steps: -1 },
  { id: 'friendKid', label: '친구 자녀',  steps: -1 },
  { id: 'neighbor',  label: '이웃',       steps: -2 },
];

export type SiblingPolicy = 'byAge' | 'oneStep' | 'same';

/**
 * 형제간 균형 — 같은 집 아이들 사이의 차이를 얼마로 둘까.
 *
 * 나이대로 주면 어린 쪽이 서운해하고, 똑같이 주면 큰 쪽이 서운해한다.
 * 어느 쪽도 정답이 아니라 고르는 문제이므로 고르게 해 두었다.
 * 세 가지 모두 **금액을 내리지 않는다** — 맞추려고 큰 아이 금액을 깎으면
 * 그것이 다시 서운한 일이 된다. 아래 아이를 올려 맞춘다.
 */
export const SIBLING_POLICIES: { id: SiblingPolicy; label: string; desc: string }[] = [
  { id: 'byAge',   label: '나이대로',      desc: '계산한 대로 아이마다 다르게' },
  { id: 'oneStep', label: '한 칸 차이까지', desc: '맏이와 한 단위 안쪽으로 좁힌다' },
  { id: 'same',    label: '모두 같은 금액', desc: '그 집 맏이 금액으로 맞춘다' },
];

export interface ChildInput {
  stage: StageId;
  relation: RelationId;
  /**
   * 같은 집 표시. 같은 값이면 형제로 본다.
   * 비워 두면 형제가 없는 것으로 보고 균형 맞추기에서 혼자 선다.
   */
  house?: string;
}

export interface Reason {
  /** 어느 축인가 */
  axis: string;
  /** 그 축에서 무엇이 골라졌나 */
  choice: string;
  /** 사다리를 몇 칸 올렸나(내렸으면 음수). 나이 축은 출발점이라 0 */
  steps: number;
}

export interface ChildAmount {
  stage: Stage;
  relation: Relation;
  house: string;
  /** 권하는 범위의 하한(원) — 사다리 위의 값이다 */
  min: number;
  /** 권하는 범위의 상한(원) — 하한보다 한 칸 위다 */
  max: number;
  /** 이 금액이 나온 까닭 — 어느 축이 몇 칸을 움직였나 */
  reasons: Reason[];
}

export interface ReceivedNote {
  /** 그 집에서 우리 아이 한 명이 받은 금액(원) */
  perChild: number;
  /** 그 금액을 사다리에서 읽은 칸 */
  rung: number;
  /** 우리 기준보다 몇 칸 위인가(음수면 아래) */
  gap: number;
  /** 그래서 모든 아이를 몇 칸 움직였나 */
  steps: number;
}

export interface NewYearMoney {
  children: ChildAmount[];
  /** 아이별 하한의 합(원) */
  totalMin: number;
  /** 아이별 상한의 합(원) */
  totalMax: number;
  /** 받은 금액을 기준으로 썼을 때의 셈. 안 넣었으면 null */
  received: ReceivedNote | null;
}

export interface GiveInput {
  children: ChildInput[];
  /** 기본은 나이대로 */
  policy?: SiblingPolicy;
  /** 그 집에서 우리 아이 한 명이 받은 금액(원). 0이면 안 쓴다 */
  receivedPerChild?: number;
}

const stageOf = (id: StageId): Stage => STAGES.find(s => s.id === id) ?? STAGES[0];
const relationOf = (id: RelationId): Relation => RELATIONS.find(r => r.id === id) ?? RELATIONS[1];

/**
 * 받은 금액이 기준을 몇 칸 움직이나.
 *
 * 상대 집 아이 수가 우리 집과 다르면 총액으로는 맞출 수가 없다 —
 * 셋에게 받고 하나에게 주면 총액을 맞추는 순간 아이별 금액이 세 배가 된다.
 * 그래서 **아이 한 명당**으로 견준다.
 *
 * 사다리 두 칸 이상 벌어졌을 때만 한 칸 움직인다. 한 칸 차이는 그냥 둔다 —
 * 그 정도는 집집마다 늘 있는 차이고, 여기서 반응하면 받은 금액을 조금
 * 바꿀 때마다 권하는 금액이 출렁인다.
 */
function receivedShift(receivedPerChild: number, baseRungs: number[]): ReceivedNote | null {
  if (!(receivedPerChild > 0) || baseRungs.length === 0) return null;
  const rung = nearestRung(receivedPerChild);
  const avg = Math.round(baseRungs.reduce((a, b) => a + b, 0) / baseRungs.length);
  const gap = rung - avg;
  return { perChild: receivedPerChild, rung, gap, steps: gap >= 2 ? 1 : gap <= -2 ? -1 : 0 };
}

/**
 * 아이마다 권하는 범위와 합계.
 *
 * 순서가 중요하다 — 나이·관계로 출발 칸을 잡고(①), 받은 금액으로 전체를
 * 같이 움직이고(②), 그다음에 같은 집 형제를 맞춘다(③). ③을 먼저 하면
 * ②가 맞춰 놓은 형제 금액을 다시 벌려 놓는다.
 */
export function calcNewYearMoney({ children, policy = 'byAge', receivedPerChild = 0 }: GiveInput): NewYearMoney {
  // ① 나이 + 관계 — 아직 사다리 밖으로 나가 있어도 그냥 둔다. 끝에 한 번만 붙인다
  const base = children.map((c, i) => {
    const stage = stageOf(c.stage);
    const relation = relationOf(c.relation);
    return {
      stage,
      relation,
      house: c.house ?? '',
      // 집 표시가 없으면 자기 혼자가 한 집이다 — 남의 아이와 형제로 묶이지 않게 한다
      group: c.house ? `h:${c.house}` : `alone:${i}`,
      rung: stage.rung + relation.steps,
    };
  });

  // ② 받은 금액 — 모든 아이를 같은 칸수만큼 움직인다
  const received = receivedShift(receivedPerChild, base.map(b => b.rung));
  const shifted = base.map(b => ({ ...b, rung: b.rung + (received?.steps ?? 0) }));

  // ③ 형제 균형 — 같은 집의 맏이(가장 높은 칸)에 맞춰 아래 아이를 올린다
  const top = new Map<string, number>();
  for (const s of shifted) top.set(s.group, Math.max(top.get(s.group) ?? -Infinity, s.rung));

  const result: ChildAmount[] = shifted.map(s => {
    const houseTop = top.get(s.group)!;
    const leveled =
      policy === 'same' ? houseTop
      : policy === 'oneStep' ? Math.max(s.rung, houseTop - 1)
      : s.rung;

    const reasons: Reason[] = [
      { axis: '나이·학년', choice: s.stage.label, steps: 0 },
      { axis: '관계', choice: s.relation.label, steps: s.relation.steps },
    ];
    if (received) {
      reasons.push({
        axis: '받은 금액',
        choice: received.steps === 0 ? '우리 기준과 비슷해 그대로' : received.steps > 0 ? '받은 쪽이 커서 올림' : '받은 쪽이 적어서 내림',
        steps: received.steps,
      });
    }
    if (leveled !== s.rung) {
      reasons.push({ axis: '형제 균형', choice: '같은 집 맏이에 맞춰 올림', steps: leveled - s.rung });
    }

    return {
      stage: s.stage,
      relation: s.relation,
      house: s.house,
      min: unitAt(leveled),
      max: unitAt(leveled + 1),
      reasons,
    };
  });

  return {
    children: result,
    totalMin: result.reduce((a, c) => a + c.min, 0),
    totalMax: result.reduce((a, c) => a + c.max, 0),
    received,
  };
}
