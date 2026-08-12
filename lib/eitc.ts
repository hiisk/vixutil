/**
 * 근로장려금·자녀장려금 — 얼마를 받는지.
 *
 * ── 산정식의 뼈대는 꺾인 선 하나다 ────────────────────────────
 * 두 장려금은 모두 소득을 x축에 두고 **세 구간으로 꺾이는 선**이다.
 *
 *   지급액
 *     │        ┌────────┐            ← 최대 정액
 *     │       ╱          ╲
 *     │      ╱            ╲
 *     │     ╱              ╲
 *     └────┴────┴─────┴─────┴──── 소득
 *        점증  정액   점감   기준금액
 *
 * 소득이 낮을 때는 **점증** — 일해서 번 만큼 비례해 늘어난다. 가운데는
 * **최대 정액**이고, 그 위는 **점감** — 소득이 늘수록 줄어 기준금액에서 끝난다.
 * 점증 구간을 두는 것은 "일을 해야 받는다"는 제도의 뜻이고, 점감 구간을 두는 것은
 * 소득이 늘 때 장려금이 뚝 끊기지 않게 하려는 것이다. 계단으로 만들면 1원 더 벌어
 * 수십만원을 잃는 자리가 생긴다.
 *
 * 이 선은 **네 점이 완전히 정한다** — 최대 지급액, 점증이 끝나는 소득, 점감이
 * 시작하는 소득, 기준금액. 두 기울기는 그 네 점에서 나오므로 따로 받지 않는다.
 * 기울기를 따로 입력받으면 꺾인 자리가 어긋나 계단이 생길 수 있는데, 나눗셈으로
 * 구하면 **경계에서 두 구간이 반드시 만난다.** 그것이 이 파일이 지키는 값이다.
 *
 * ── 해마다 바뀌는 값은 안 박는다 ────────────────────────────
 * 기준금액·최대 지급액·구간 경계·재산 기준은 모두 **해마다 고시로 바뀐다.**
 * 박아 두면 내년에 조용히 틀린 답을 답처럼 내놓으므로 입력으로 받는다.
 * lib/basic-pension.ts와 같은 이유다.
 *
 * 반대로 **법에 적힌 비율은 코드에 둔다.** 재산이 절반 기준을 넘으면 100분의 50,
 * 기한을 놓쳐 신청하면 100분의 90 — 이 둘은 조세특례제한법 조문이고 해마다
 * 고시되는 값이 아니다. 구조는 코드에, 금액은 입력에 두는 경계가 여기다.
 *
 * ── 총소득과 총급여액 등은 다른 숫자다 ────────────────────────
 * 사람들이 가장 많이 헷갈리는 곳이다.
 *
 *   · **총소득** — 받을 자격이 있나를 볼 때 쓴다. 근로·사업소득에 이자·배당·연금·
 *     기타소득까지 모두 더한 값이고, 이 값이 기준금액을 넘으면 못 받는다.
 *   · **총급여액 등** — 얼마를 받나를 볼 때 쓴다. 근로소득과 사업소득(업종별
 *     조정률을 곱한 값), 종교인소득만 더한 값이고, 위 꺾인 선의 x축이 이것이다.
 *
 * 이자·배당이 많은 사람은 총소득 때문에 탈락하고, 통과한 사람은 총급여액 등으로
 * 금액이 정해진다. 하나로 뭉치면 둘 중 한쪽이 반드시 틀리므로 따로 받는다.
 *
 * ── 자녀장려금을 같은 파일에 둔 까닭 ──────────────────────────
 * 자녀장려금은 **같은 꺾인 선인데 점증 구간이 없고 바닥이 0이 아니다.** 소득이
 * 0이어도 자녀 1인당 최대액을 주고, 점감이 내려가 닿는 곳은 0이 아니라 최저
 * 지급액이다. 그래서 기준금액에서 그 최저액만큼 뚝 끊긴다 — 근로장려금과 달리
 * 여기에는 진짜 절벽이 있다. 이것도 위 네 점에 바닥 하나를 더하면 같은 함수로
 * 낼 수 있어 구조를 나누지 않았다. 재산 요건과 신청 기간도 둘이 똑같다.
 *
 * ── 이 계산이 답하지 못하는 것 ──────────────────────────────
 * 가구 유형 판정(단독·홑벌이·맞벌이)과 **가구원 판정 자체는 여기서 내지 않는다.**
 * 배우자·부양자녀·직계존속을 누구까지 세는지는 나이·소득·주민등록으로 갈리고,
 * 그 판정이 틀리면 어떤 계산도 무의미하다. 이 계산기는 "가구 유형을 알고 있을 때
 * 얼마인가"에만 답한다. 실제 결정액은 국세청 심사로 정해진다.
 */

/** 재산이 절반 기준을 넘을 때 주는 비율 — 법이 정한 100분의 50 */
export const HALF_RATIO = 0.5;

/** 기한 후 신청일 때 주는 비율 — 법이 정한 100분의 90 */
export const LATE_RATIO = 0.9;

/** 가구 유형 — 자녀장려금은 단독가구에 없다 */
export type Household = 'single' | 'singleEarner' | 'dualEarner';

export const HOUSEHOLD_LABEL: Record<Household, string> = {
  single: '단독가구',
  singleEarner: '홑벌이가구',
  dualEarner: '맞벌이가구',
};

/** 지금 소득이 어느 구간에 있나 */
export type Phase = 'phaseIn' | 'plateau' | 'phaseOut' | 'over';

/**
 * 꺾인 선 하나 — 그 해 고시값으로 채운다.
 *
 * 기울기가 없는 것을 눈여겨보라. 점증 기울기는 max ÷ plateauStart이고 점감
 * 기울기는 (max − floor) ÷ (ceiling − plateauEnd)로, 둘 다 이 네 값에서 나온다.
 */
export interface Schedule {
  /** 총소득 기준금액(원) — 이 값 이상이면 한 푼도 못 받는다 */
  ceiling: number;
  /** 최대 지급액(원) */
  max: number;
  /** 점증이 끝나고 최대 정액이 시작하는 소득(원). 0이면 점증 구간이 없다 */
  plateauStart: number;
  /** 최대 정액이 끝나고 점감이 시작하는 소득(원) */
  plateauEnd: number;
  /** 점감이 내려가 닿는 바닥(원) — 근로장려금은 0, 자녀장려금은 최저 지급액 */
  floor: number;
}

/**
 * 자녀 수만큼 늘린 선 — 자녀장려금은 1인당으로 고시된다.
 *
 * 최대액과 바닥만 곱하고 소득 경계는 그대로 둔다. 자녀가 둘이라고 점감이
 * 늦게 시작하는 것이 아니라 같은 자리에서 두 배 높이로 내려온다.
 */
export const perChild = (s: Schedule, children: number): Schedule => ({
  ...s,
  max: s.max * Math.max(0, Math.floor(children)),
  floor: s.floor * Math.max(0, Math.floor(children)),
});

/** 어긋난 입력을 순서대로 되잡는다 — 경계가 뒤집혀도 0으로 나누지 않게 */
function normalize(s: Schedule) {
  const max = Math.max(0, s.max);
  const plateauStart = Math.max(0, s.plateauStart);
  const plateauEnd = Math.max(plateauStart, s.plateauEnd);
  return {
    max,
    plateauStart,
    plateauEnd,
    ceiling: Math.max(plateauEnd, s.ceiling),
    floor: Math.min(Math.max(0, s.floor), max),
  };
}

/**
 * 소득 하나를 꺾인 선에 넣는다.
 *
 * 경계를 어느 구간이 갖는지가 중요하다. 점증은 plateauStart **미만**만 갖고
 * 정액이 그 점을 갖는다 — 점증 식에 plateauStart를 넣으면 max가 나오므로
 * 어느 쪽이 갖든 값은 같다. 점감도 plateauEnd에서 max를 내므로 정액과 만난다.
 * 두 꺾인 자리에 계단이 없다는 것이 이 함수가 옳다는 증거다.
 */
export function creditFor(schedule: Schedule, earnedIncome: number): { amount: number; phase: Phase } {
  const s = normalize(schedule);
  const x = Math.max(0, earnedIncome);

  // 기준금액을 넘으면 0이다. 이 검사가 먼저라 아래 나눗셈은 분모가 늘 양수다
  if (x >= s.ceiling) return { amount: 0, phase: 'over' };

  if (x < s.plateauStart) {
    // 점증 — 소득에 비례한다. x가 plateauStart에 닿으면 정확히 max다
    return { amount: (s.max * x) / s.plateauStart, phase: 'phaseIn' };
  }
  if (x < s.plateauEnd) return { amount: s.max, phase: 'plateau' };

  // 점감 — plateauEnd에서 max로 시작해 ceiling에서 floor에 닿는다
  const slope = (s.max - s.floor) / (s.ceiling - s.plateauEnd);
  return { amount: s.max - slope * (x - s.plateauEnd), phase: 'phaseOut' };
}

/**
 * 소득을 1원 더 벌면 장려금이 얼마 움직이나 — 구간별 기울기.
 *
 * 점증에서는 양수(더 벌면 더 받는다), 정액에서는 0, 점감에서는 음수다.
 * 점감 구간의 기울기가 이 제도의 숨은 세율이다 — 소득세와 별개로 100만원을
 * 더 벌면 장려금이 이 기울기만큼 깎이므로, 실제 손에 남는 몫은 그만큼 적다.
 * 사람들이 "조금 더 벌었는데 오히려 손해"라고 느끼는 자리가 여기다.
 */
export function marginalRate(schedule: Schedule, earnedIncome: number): number {
  const s = normalize(schedule);
  const { phase } = creditFor(schedule, earnedIncome);
  // 두 분모는 안전하다 — 점증 구간이 있다는 것이 plateauStart > 0이라는 뜻이고,
  // 점감 구간이 있다는 것이 ceiling > plateauEnd라는 뜻이다
  if (phase === 'phaseIn') return s.max / s.plateauStart;
  if (phase === 'phaseOut') return -(s.max - s.floor) / (s.ceiling - s.plateauEnd);
  return 0;
}

export interface EitcInput {
  /** 가구 유형 — 자녀장려금 여부를 가른다 */
  household: Household;
  /** 총소득(원) — 자격을 볼 때 쓰는 값. 이자·배당·연금까지 더한다 */
  totalIncome: number;
  /** 총급여액 등(원) — 금액을 낼 때 쓰는 값. 근로·사업(조정률)·종교인소득만 */
  earnedIncome: number;
  /** 근로장려금 산정식 — 가구 유형별로 그 해 고시된 값을 넣는다 */
  work: Schedule;
  /** 자녀장려금 산정식 — 자녀 1인당 금액으로 넣는다. 없으면 안 낸다 */
  child?: Schedule;
  /** 부양자녀 수(명) */
  children: number;
  /** 가구원 재산 합계(원) */
  asset: number;
  /** 재산이 이 금액 이상이면 못 받는다(원) — 해마다 고시된다 */
  assetLimit: number;
  /** 재산이 이 금액 이상이면 절반만 받는다(원) — 해마다 고시된다 */
  assetHalfLimit: number;
  /** 신청 기한을 놓치고 기한 후 신청하는가 */
  lateApply: boolean;
}

export interface EitcResult {
  /** 감액 전 근로장려금 산정액(원) */
  workBase: number;
  /** 감액 전 자녀장려금 산정액(원) */
  childBase: number;
  /** 근로장려금 기준으로 본 지금 소득의 구간 */
  phase: Phase;
  /** 재산이 상한 이상이라 못 받는가 */
  assetOver: boolean;
  /** 재산 때문에 절반으로 깎였는가 */
  halved: boolean;
  /** 재산·기한 감액을 곱한 비율 */
  ratio: number;
  /** 최종 근로장려금(원) */
  work: number;
  /** 최종 자녀장려금(원) */
  child: number;
  /** 두 장려금의 합(원) */
  total: number;
}

export function calcEitc(input: EitcInput): EitcResult {
  const asset = Math.max(0, input.asset);
  const limit = Math.max(0, input.assetLimit);
  // 절반 기준이 상한보다 높게 들어와도 뒤집히지 않게 상한으로 묶는다
  const halfLimit = Math.min(Math.max(0, input.assetHalfLimit), limit);

  const assetOver = limit > 0 && asset >= limit;
  const halved = !assetOver && halfLimit > 0 && asset >= halfLimit;

  /*
   * 자격은 총소득으로 보고 금액은 총급여액 등으로 낸다. 기준금액이 두 장려금에
   * 각각 따로 고시되므로 문턱도 각각 넘어야 한다.
   */
  const total = Math.max(0, input.totalIncome);
  const earned = Math.max(0, input.earnedIncome);

  const workGate = total < Math.max(0, input.work.ceiling);
  const w = workGate ? creditFor(input.work, earned) : { amount: 0, phase: 'over' as Phase };

  /*
   * 자녀장려금은 홑벌이·맞벌이가구에만 있다. 단독가구는 부양자녀가 없는 가구를
   * 뜻하니 정의상 해당되지 않는다 — 고시값이 아니라 제도의 뼈대라 코드에 둔다.
   */
  const childCount = Math.max(0, Math.floor(input.children));
  const childSchedule = input.household === 'single' || childCount === 0 ? undefined : input.child;
  const childBase = childSchedule !== undefined && total < Math.max(0, childSchedule.ceiling)
    ? creditFor(perChild(childSchedule, childCount), earned).amount
    : 0;

  const ratio = (assetOver ? 0 : halved ? HALF_RATIO : 1) * (input.lateApply ? LATE_RATIO : 1);

  return {
    workBase: w.amount,
    childBase,
    phase: w.phase,
    assetOver,
    halved,
    ratio,
    work: w.amount * ratio,
    child: childBase * ratio,
    total: (w.amount + childBase) * ratio,
  };
}
