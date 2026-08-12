/**
 * 국민연금 추납·임의가입이 얼마나 이득인가.
 *
 * ── 무엇에 답하나 ────────────────────────────────────────
 * "지금 몇백만 원을 넣으면 연금이 얼마 늘고, 몇 년 만에 본전을 뽑나."
 * 가입기간이 늘면 연금이 얼마 오르는지는 lib/national-pension.ts의 식이
 * 이미 안다. 여기서는 **낸 보험료와 늘어난 연금을 맞대 보는 일**만 한다.
 *
 * 보험료율은 기준소득월액의 9%다(사업장 가입자는 회사와 반씩, 지역·임의
 * 가입자는 전액 본인 부담). 추납·임의가입은 본인이 전액 낸다.
 *
 * ── 왜 본전 계산이 의미가 있나 ──────────────────────────────
 * 연금은 죽을 때까지 나오므로, 본전을 뽑는 해를 넘겨 살면 그 뒤는 전부 이득이다.
 * 그래서 "몇 년"이라는 답이 실제 판단에 쓰인다. 다만 두 가지를 정직하게 밝혀야
 * 한다 — 물가에 따라 연금이 오르는 것(연금액 실질가치 보전)을 여기서는 세지
 * 않았고, 낸 돈의 기회비용(그 돈을 다른 데 넣었을 때의 수익)도 세지 않았다.
 * 그래서 이 셈은 **연금 쪽에 조금 유리하게** 나온다.
 *
 * ── 임의가입과 추납의 차이 ─────────────────────────────────
 * 임의가입은 앞으로의 기간을 채우는 것이고, 추납은 과거에 못 낸 기간을
 * 소급해 채우는 것이다. 늘어나는 가입월수의 효과는 같으므로 계산은 하나로
 * 두고, 낼 수 있는 개월 수의 한도만 다르다.
 */

import { MIN_MONTHS, calcPension, type PensionInput } from './national-pension.ts';

/** 국민연금 보험료율 — 기준소득월액의 9% */
export const CONTRIBUTION_RATE = 0.09;

/**
 * 추납할 수 있는 최대 개월수 — 119개월.
 *
 * 10년(120개월)을 넘겨 한꺼번에 채우는 것은 막혀 있다. 2020년 개정으로
 * 생긴 한도이며, 이 값을 넘겨 넣어도 여기서 잘라 낸다.
 */
export const MAX_CATCHUP_MONTHS = 119;

export interface CatchupInput extends PensionInput {
  /** 더 넣을 개월수 */
  addMonths: number;
  /** 그 기간에 적용할 기준소득월액(원) — 보험료의 기준이 된다 */
  contributionBase: number;
  /** 추납인가(true) 임의가입인가(false) — 한도가 다르다 */
  isCatchup: boolean;
}

export interface CatchupResult {
  /** 실제로 인정되는 추가 개월수(한도를 넘기면 잘린다) */
  addedMonths: number;
  /** 한 달 보험료(원) */
  monthlyContribution: number;
  /** 총 납부액(원) */
  totalPaid: number;
  /** 넣기 전 월 연금(원) */
  beforeMonthly: number;
  /** 넣은 뒤 월 연금(원) */
  afterMonthly: number;
  /** 늘어나는 월 연금(원) */
  gainMonthly: number;
  /** 늘어나는 연 연금(원) */
  gainAnnual: number;
  /** 낸 돈을 늘어난 연금으로 회수하는 데 걸리는 개월수. 늘지 않으면 null */
  paybackMonths: number | null;
  /** 낸 돈 1만원이 월 연금을 얼마 늘리는가(원) */
  gainPerTenThousand: number;
  /** 넣기 전에는 못 받았는데 넣어서 받게 되는가 — 10년을 넘기는 경우 */
  unlocksPension: boolean;
}

export function calcCatchup(input: CatchupInput): CatchupResult {
  const limit = input.isCatchup ? MAX_CATCHUP_MONTHS : Infinity;
  const addedMonths = Math.max(0, Math.min(limit, Math.floor(input.addMonths)));

  const monthlyContribution = Math.max(0, input.contributionBase) * CONTRIBUTION_RATE;
  const totalPaid = monthlyContribution * addedMonths;

  const before = calcPension(input);
  const after = calcPension({ ...input, months: input.months + addedMonths });

  const gainMonthly = after.monthly - before.monthly;
  const paybackMonths = gainMonthly > 0 ? totalPaid / gainMonthly : null;

  return {
    addedMonths,
    monthlyContribution,
    totalPaid,
    beforeMonthly: before.monthly,
    afterMonthly: after.monthly,
    gainMonthly,
    gainAnnual: gainMonthly * 12,
    paybackMonths,
    gainPerTenThousand: totalPaid > 0 ? (gainMonthly / totalPaid) * 10_000 : 0,
    unlocksPension: !before.eligible && after.eligible,
  };
}

/**
 * 개월수를 늘려 가며 본전 뽑는 기간이 어떻게 달라지는지 본다.
 *
 * 10년(120개월)을 갓 넘기는 자리에서는 아예 못 받던 연금이 생기므로 회수
 * 기간이 급격히 짧아진다. 그 계단이 실제로 보이는 것이 이 표의 값이다.
 */
export function catchupTable(input: CatchupInput, steps: number[]): (CatchupResult & { months: number })[] {
  return steps.map(months => ({ months, ...calcCatchup({ ...input, addMonths: months }) }));
}

/**
 * 10년을 채우기까지 남은 개월수 — 못 채운 사람에게는 이것이 가장 중요한 숫자다.
 *
 * 120개월에 한 달이라도 못 미치면 연금이 아예 없고 반환일시금만 받는다.
 * 그래서 남은 개월을 채우는 것이 다른 어떤 추납보다 이득이 크다.
 */
export const monthsToUnlock = (months: number): number => Math.max(0, MIN_MONTHS - months);
