/**
 * 국민연금 분할연금 — 이혼할 때 배우자의 노령연금을 나눠 받는 제도.
 *
 * ── 무엇을 나누는가 ────────────────────────────────────────
 * 연금 전체가 아니라 **혼인기간에 해당하는 몫**만 나눈다. 가입기간 30년 중
 * 혼인기간이 10년이었다면 나눌 수 있는 것은 연금의 3분의 1이고, 그 3분의 1을
 * 다시 절반으로 갈라 한 사람 몫이 6분의 1이 된다.
 *
 *   나눌 몫  = 노령연금액 × (혼인 중 가입월수 ÷ 총 가입월수)
 *   분할연금 = 나눌 몫 × 분할 비율(기본 절반)
 *
 * ── 분할 비율을 입력으로 받는 까닭 ──────────────────────────
 * 법이 정한 기본은 **절반**이지만, 당사자 협의나 재판으로 정한 비율이 있으면
 * 그 비율을 따른다. 그래서 0.5를 박아 두지 않고 받아 쓴다 — lib/heating.ts의
 * 열단가나 lib/lease-renewal.ts의 전월세전환율과 같은 이유다. 실제 사건에서
 * 절반이 아닌 비율로 갈라지는 경우가 있고, 그때 이 계산기가 틀린 금액을
 * 답처럼 보여 주면 안 된다.
 *
 * ── 나눠 준 쪽은 그만큼 줄어든다 ────────────────────────────
 * 분할연금은 없던 돈을 새로 만드는 것이 아니라 **하나를 둘로 가르는 것**이다.
 * 그래서 이 계산에서 가장 중요한 성질은 항등식이다.
 *
 *   분할연금 + 나눠 준 쪽에 남는 연금 = 원래 노령연금액
 *
 * 검사가 이 항등식을 여러 입력으로 못 박는다. 어느 한쪽 식을 잘못 고치면
 * 합이 안 맞아 바로 걸린다.
 *
 * ── 부양가족연금액은 나누지 않는다 ──────────────────────────
 * 부양가족연금액은 가입기간이나 소득으로 정해지는 것이 아니라 부양할 가족이
 * 있을 때 정액으로 붙는 돈이다. 혼인기간에 비례해 쌓인 몫이 아니므로 분할
 * 대상이 아니고, 나눠 준 쪽에 그대로 남는다. 그래서 아래 셈은 노령연금
 * 본체(monthlyBeforeFamily)만 가르고 부양가족연금은 따로 얹는다.
 *
 * ── 기본연금액은 빌려 쓴다 ──────────────────────────────────
 * 노령연금액 자체는 lib/national-pension.ts의 식으로 낸다. 같은 식을 두 곳에
 * 적으면 한쪽만 고쳐질 때 조용히 어긋난다. 가입기간이 10년(120개월)에 못 미쳐
 * 노령연금이 0이면 나눌 것도 없어 분할연금도 0이 된다 — 지어낸 금액을
 * 내놓지 않는다.
 *
 * ── 이 계산이 답하지 않는 것 ───────────────────────────────
 * 분할연금에는 요건이 있다. 혼인기간(가입기간 중의 혼인기간)이 5년 이상이어야
 * 하고, 이혼이 성립해야 하고, **양쪽이 모두 수급연령에 이르러야** 한다.
 * 이혼했더라도 전 배우자가 연금을 받기 시작하기 전에는 받을 수 없다.
 * 이런 요건은 사정마다 달라 여기서 판정하지 않는다 — 이 계산은
 * **"받는다면 얼마"에만 답한다.**
 */

import { calcPension, type PensionInput } from './national-pension.ts';

/** 법이 정한 기본 분할 비율 — 절반 */
export const DEFAULT_SPLIT_RATIO = 0.5;

/**
 * 분할연금을 청구할 수 있는 최소 혼인기간(개월).
 *
 * 여기서 요건을 판정하지는 않는다. 다만 5년에 못 미치면 확실히 안 되는 것이라
 * 화면에 알려 주기 위해 표시용으로만 쓴다.
 */
export const MIN_MARRIAGE_MONTHS = 60;

/**
 * 협의·재판으로 정해질 수 있는 비율을 견줘 보기 위한 값들.
 *
 * 법이 정한 기본은 0.5뿐이고 나머지는 **근거 있는 수치가 아니다** — 비율이
 * 달라지면 금액이 어떻게 움직이는지 보여 주기 위한 눈금일 뿐이다.
 */
export const SPLIT_RATIO_PRESETS = [0.3, 0.4, 0.5, 0.6, 0.7] as const;

export interface SplitInput extends PensionInput {
  /**
   * 혼인 중 국민연금 가입월수.
   *
   * 혼인기간 전체가 아니라 **가입기간과 겹치는 개월수**다. 결혼 전이나 가입
   * 전의 기간은 세지 않는다.
   */
  marriageMonths: number;
  /** 분할 비율(0~1). 기본은 절반이고 협의·재판으로 달라질 수 있다 */
  splitRatio: number;
}

export interface SplitResult {
  /** 나누기 전 노령연금 월액(부양가족연금 제외, 원) */
  baseMonthly: number;
  /** 부양가족연금 월액(원) — 분할 대상이 아니라 나눠 준 쪽에 그대로 남는다 */
  familyMonthly: number;
  /** 실제로 센 혼인 중 가입월수 — 총 가입월수를 넘게 들어오면 잘라 낸 값 */
  countedMarriageMonths: number;
  /** 혼인기간이 총 가입기간에서 차지하는 비율(0~1) */
  marriageShare: number;
  /** 나눌 수 있는 몫의 월액(원) = 노령연금 × 혼인기간 비율 */
  divisibleMonthly: number;
  /** 실제로 쓴 분할 비율(0~1) */
  ratio: number;
  /** 분할연금을 받는 쪽의 월액(원) */
  spouseMonthly: number;
  /** 나눠 준 쪽에 남는 노령연금 월액(부양가족연금 제외, 원) */
  ownBeforeFamily: number;
  /** 나눠 준 쪽이 실제로 받는 월액(부양가족연금 포함, 원) */
  ownMonthly: number;
  /** 나눠 준 쪽이 줄어드는 월액(원) — 분할연금액과 같다 */
  reduction: number;
  /** 분할연금이 원래 노령연금에서 차지하는 비율(%) */
  sharePercent: number;
  /** 혼인 중 가입기간이 5년을 넘는가 — 요건 안내용이고 금액을 깎지 않는다 */
  marriageMonthsMeetsMinimum: boolean;
}

export function calcSplit(input: SplitInput): SplitResult {
  const months = Math.max(0, Math.floor(input.months));

  /*
   * 노령연금은 lib/national-pension.ts에 맡긴다. 앞당김·미룸까지 반영된
   * 실제 연금액을 나누는 것이므로 입력을 그대로 넘긴다 — 유족연금(lib/
   * survivor-pension.ts)이 기본연금액만 빌려 오는 것과 다른 점이다.
   */
  const p = calcPension(input);

  /*
   * 혼인 중 가입월수는 총 가입월수를 넘을 수 없다. 넘게 들어오면 잘라 낸다 —
   * 그대로 두면 혼인기간 비율이 1을 넘어 나눌 몫이 노령연금보다 커지고,
   * "두 사람 몫의 합 = 원래 연금" 항등식이 깨진다. 입력 실수(혼인기간 전체를
   * 넣는 경우)가 흔한 자리라 조용히 통과시키지 않고 여기서 막는다.
   */
  const countedMarriageMonths = Math.min(months, Math.max(0, Math.floor(input.marriageMonths)));

  // 총 가입월수가 0이면 나눌 연금 자체가 없다 — 0으로 나누지 않는다
  const marriageShare = months > 0 ? countedMarriageMonths / months : 0;

  const baseMonthly = p.monthlyBeforeFamily;
  const divisibleMonthly = baseMonthly * marriageShare;

  const ratio = Math.max(0, Math.min(1, input.splitRatio));
  const spouseMonthly = divisibleMonthly * ratio;

  // 가른 것을 도로 합치면 원래 연금이다 — 뺄셈으로 내야 그 성질이 유지된다
  const ownBeforeFamily = baseMonthly - spouseMonthly;

  return {
    baseMonthly,
    familyMonthly: p.familyMonthly,
    countedMarriageMonths,
    marriageShare,
    divisibleMonthly,
    ratio,
    spouseMonthly,
    ownBeforeFamily,
    ownMonthly: ownBeforeFamily + p.familyMonthly,
    reduction: spouseMonthly,
    sharePercent: baseMonthly > 0 ? (spouseMonthly / baseMonthly) * 100 : 0,
    marriageMonthsMeetsMinimum: countedMarriageMonths >= MIN_MARRIAGE_MONTHS,
  };
}

/**
 * 분할연금이 원래 노령연금에서 차지하는 비율.
 *
 *   분할연금 ÷ 노령연금 = 혼인기간 비율 × 분할 비율
 *
 * 두 비율을 곱한 것뿐이다. 혼인기간이 가입기간의 절반이고 절반씩 나누면
 * 4분의 1이 된다 — "절반을 나눈다"고 들었는데 생각보다 적은 이유가 여기다.
 * 식을 풀어 두면 검사가 금액 쪽 셈을 이 식으로 되짚을 수 있다.
 */
export const splitShare = (marriageShare: number, ratio: number): number => marriageShare * ratio;

/**
 * 분할 비율을 여러 값으로 늘어놓는다.
 *
 * 협의나 재판으로 비율이 달라지면 두 사람 몫이 어떻게 움직이는지 나란히
 * 보여 주기 위한 것이다. 어느 비율이든 두 몫의 합은 그대로다.
 */
export function splitTable(
  input: SplitInput,
  ratios: readonly number[] = SPLIT_RATIO_PRESETS,
): { ratio: number; spouseMonthly: number; ownMonthly: number }[] {
  return ratios.map(ratio => {
    const r = calcSplit({ ...input, splitRatio: ratio });
    return { ratio: r.ratio, spouseMonthly: r.spouseMonthly, ownMonthly: r.ownMonthly };
  });
}
