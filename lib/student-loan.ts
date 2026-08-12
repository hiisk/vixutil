/**
 * 학자금 대출 — 취업 후 상환(ICL)과 일반 상환은 갚는 방식 자체가 다르다.
 *
 *   일반 상환      정해진 기간에 원리금균등으로 갚는다. 소득과 무관하다.
 *   취업 후 상환   **소득이 상환기준소득을 넘는 해에만** 갚는다. 그 해 갚는 돈은
 *                  (연 소득 − 상환기준소득) × 상환율이다.
 *
 * 그래서 일반 대출 계산기로는 취업 후 상환의 답이 안 나온다. 월 상환액이 정해져
 * 있지 않고, **소득이 얼마나 오르느냐에 따라 상환 기간이 바뀐다.** 소득이 빨리
 * 오르면 갚는 금액도 커져서 일찍 끝나고, 오르지 않으면 한없이 길어진다.
 *
 * ── 유예는 면제가 아니다 ────────────────────────────────────────
 * 소득이 기준 아래인 해는 **상환 유예**다. 그 해에 내는 돈은 0이지만 **이자는
 * 그대로 붙는다.** 잔액이 줄지 않고 오히려 늘어난다. 이 파일은 그 해를
 * deferred로 표시하고, 붙은 이자를 잔액에 더한다 — 안 갚은 해를 빈칸으로 두면
 * 계산이 실제보다 유리하게 나온다.
 *
 * 소득이 계속 기준 아래면 잔액은 영원히 줄지 않는다. 이때 **완료 연도를 지어내지
 * 않고 null을 낸다.** MAX_YEARS는 고시된 값이 아니라 이 계산이 멈추는 지평이다.
 *
 * ── 숫자를 박지 않는 이유 ───────────────────────────────────────
 * **상환기준소득·상환율·금리는 해마다 고시로 바뀐다.** 학자금 대출 금리는 반기마다
 * 정해지고, 상환기준소득은 그 해 최저생계비 등을 따라 매년 새로 고시된다.
 * lib/lease-renewal.ts의 전월세전환율, lib/dti.ts의 규제 비율과 같은 이유로
 * 기본값을 두지 않고 인자로 받는다 — 확인 못 한 숫자가 답처럼 보이면 안 된다.
 *
 * ── 이 계산의 한계 ──────────────────────────────────────────────
 * 취업 후 상환은 **연 단위로 굴린다.** 이자는 그 해 초 잔액에 한 번 붙고, 그 해
 * 상환액을 한 번 뺀다. 실제로는 원천공제로 달마다 나뉘어 들어가므로 총 이자가
 * 여기서 낸 값보다 조금 적게 나온다. 상환 기간을 해 단위로 보는 계산이라
 * 그 정도 차이는 결론을 뒤집지 않지만, 총액을 원 단위로 맞출 계산은 아니다.
 */

import { equalPayment, monthlyRate } from './loan-schedule.ts';

/**
 * 취업 후 상환을 굴려 보는 지평(년).
 *
 * 상환 의무 자체는 기간 제한이 없어서 "몇 년이면 끝난다"는 상한이 없다. 소득이
 * 기준 아래로 머물면 잔액이 줄지 않으므로 반복이 끝나지 않는다 — 그 무한 반복을
 * 막는 계산상의 한계일 뿐이고, 고시된 값이 아니다.
 */
export const MAX_YEARS = 60;

/* ── 일반 상환 ────────────────────────────────────────────────── */

export interface StandardInput {
  /** 원금(원) */
  principal: number;
  /** 연이율(%) — 1.7%면 1.7 */
  annualRate: number;
  /** 전체 기간(개월). 거치기간을 포함한 값이다 */
  months: number;
  /** 거치기간(개월) — 이 동안은 이자만 낸다. 없으면 0 */
  graceMonths?: number;
}

export interface StandardResult {
  /** 거치기간 중 월 상환액 — 이자뿐(원) */
  monthlyDuringGrace: number;
  /** 거치가 끝난 뒤 월 원리금(원) */
  monthlyAfterGrace: number;
  /** 원금을 나눠 갚는 실제 개월수 — 전체 기간에서 거치기간을 뺀 값 */
  repayMonths: number;
  /** 이자 합계(원) */
  totalInterest: number;
  /** 원금과 이자를 합한 총 상환액(원) */
  totalPaid: number;
  /** 상환이 끝나는 해 — 기간이 정해져 있으므로 늘 나온다 */
  finishYear: number;
}

/**
 * 일반 상환의 월 상환액과 총액.
 *
 * 원리금균등의 월 상환액은 lib/loan-schedule.ts의 equalPayment를 그대로 쓴다.
 * 같은 식을 여기 또 적으면 한쪽만 고쳐지는 날이 온다. 금리 0%에서 0으로 나뉘는
 * 것도 그쪽에서 이미 막아 두었다(원금 ÷ 개월수). lib/dti.ts가 같은 이유로 같은
 * 함수를 쓴다.
 *
 * 거치기간이 전체 기간을 다 먹으면 원금을 갚는 달이 없다 — 만기에 원금을 한꺼번에
 * 내는 만기일시가 되므로 거치 후 상환액도 이자로 두고 총액에 원금을 더한다.
 * 방어가 아니라 그게 실제 모양이다.
 */
export function standard({ principal, annualRate, months, graceMonths = 0 }: StandardInput): StandardResult {
  const total = Math.max(months, 0);
  const grace = Math.min(Math.max(graceMonths, 0), total);
  const repayMonths = total - grace;
  const interestOnly = Math.max(principal, 0) * monthlyRate(annualRate);
  const monthlyAfterGrace = repayMonths > 0
    ? equalPayment(Math.max(principal, 0), annualRate, repayMonths)
    : interestOnly;

  const totalPaid = repayMonths > 0
    ? interestOnly * grace + monthlyAfterGrace * repayMonths
    : interestOnly * total + Math.max(principal, 0);

  return {
    monthlyDuringGrace: interestOnly,
    monthlyAfterGrace,
    repayMonths,
    totalInterest: totalPaid - Math.max(principal, 0),
    totalPaid,
    finishYear: total / 12,
  };
}

/* ── 취업 후 상환(ICL) ─────────────────────────────────────────── */

export interface IclInput {
  /** 원금(원) */
  principal: number;
  /** 연이율(%) — 해마다(실제로는 반기마다) 고시된다 */
  annualRate: number;
  /** 첫해 연 소득(원) */
  annualIncome: number;
  /** 상환기준소득(원) — 이 아래인 해는 갚지 않는다. 해마다 고시된다 */
  threshold: number;
  /** 상환율(%) — 기준 초과 소득에 곱하는 비율. 해마다 고시된다 */
  repayRate: number;
  /** 소득 증가율(%/년) — 이 값이 상환 기간을 정한다 */
  incomeGrowth: number;
}

export interface IclYear {
  /** 몇 해째인가 — 1부터 */
  year: number;
  /** 그 해 연 소득(원) */
  income: number;
  /** 그 해 잔액에 붙은 이자(원) — 유예된 해에도 붙는다 */
  interest: number;
  /** 그 해 상환액(원) — 소득이 기준 이하면 0 */
  payment: number;
  /** 그 해 말 잔액(원) */
  balance: number;
  /** 소득이 기준 이하여서 상환이 유예된 해인가 */
  deferred: boolean;
}

export interface IclResult {
  /** 해마다의 소득·이자·상환액·잔액 */
  years: IclYear[];
  /**
   * 상환이 끝나는 해. **끝나지 않으면 null이다** — 소득이 계속 기준 아래면
   * 잔액이 줄지 않으므로 완료 연도가 없다. 지어낸 숫자를 내지 않는다.
   * 갚을 원금이 없으면 0이다.
   */
  finishYear: number | null;
  /** 이자 합계(원) */
  totalInterest: number;
  /** 실제로 낸 돈의 합계(원) */
  totalPaid: number;
  /** 상환이 유예된 해의 수 */
  deferredYears: number;
  /** 지평 안에 못 갚고 잔액이 처음 원금보다 늘어 있는가 — 화면에서 경고한다 */
  growing: boolean;
}

/**
 * 취업 후 상환을 해마다 굴린다.
 *
 * 한 해에 일어나는 일은 셋이다.
 *
 *   1. 그 해 소득 = 첫해 소득 × (1 + 증가율)^(해 − 1)
 *   2. 이자가 붙는다 — 잔액 × 연이율. **유예된 해에도 붙는다.**
 *   3. 소득이 기준을 넘으면 (소득 − 기준) × 상환율을 갚는다.
 *
 * 마지막 해에는 남은 것보다 더 낼 이유가 없으므로 갚을 금액을 "잔액 + 그 해
 * 이자"로 잘라낸다. 그래서 **원금 + 이자 합계 = 낸 돈 합계**가 정확히 맞는다
 * (tests/student-loan.test.ts가 잔액 되짚기로 지킨다).
 */
export function icl({
  principal, annualRate, annualIncome, threshold, repayRate, incomeGrowth,
}: IclInput): IclResult {
  // 갚을 원금이 없으면 굴릴 해도 없다. 0년째에 끝났다는 뜻으로 0을 낸다.
  if (!(principal > 0)) {
    return { years: [], finishYear: 0, totalInterest: 0, totalPaid: 0, deferredYears: 0, growing: false };
  }

  const rate = annualRate / 100;
  const share = repayRate / 100;
  const growth = incomeGrowth / 100;
  const first = Math.max(annualIncome, 0);
  const line = Math.max(threshold, 0);

  const years: IclYear[] = [];
  let balance = principal;
  let finishYear: number | null = null;
  let totalInterest = 0;
  let totalPaid = 0;

  for (let year = 1; year <= MAX_YEARS; year++) {
    const income = first * (1 + growth) ** (year - 1);
    const interest = balance * rate;
    // 기준을 넘는 몫에만 상환율이 걸린다. 기준 이하면 유예다 — 0을 갚는다.
    const due = income > line ? (income - line) * share : 0;
    // 남은 것보다 더 낼 수는 없다
    const owed = balance + interest;
    const payment = Math.min(due, owed);

    balance = owed - payment;
    totalInterest += interest;
    totalPaid += payment;
    years.push({ year, income, interest, payment, balance, deferred: due === 0 });

    if (balance <= 0) {
      finishYear = year;
      break;
    }
  }

  const last = years[years.length - 1];
  return {
    years,
    finishYear,
    totalInterest,
    totalPaid,
    deferredYears: years.filter(y => y.deferred).length,
    growing: finishYear === null && last.balance > principal,
  };
}

/* ── 두 방식을 맞대기 ─────────────────────────────────────────── */

export interface Comparison {
  standard: StandardResult;
  icl: IclResult;
  /** 취업 후 상환의 총액에서 일반 상환의 총액을 뺀 값 — 양수면 ICL이 더 많이 낸다 */
  totalDiff: number;
  /**
   * 총액이 적은 쪽. 취업 후 상환이 지평 안에 끝나지 않으면 **비교할 총액이
   * 없으므로 null이다** — 그때 억지로 한쪽을 고르면 거짓말이 된다.
   */
  cheaper: 'standard' | 'icl' | null;
}

/**
 * 두 방식의 총액을 맞댄다.
 *
 * **총액이 적은 쪽이 늘 유리한 것은 아니다.** 취업 후 상환은 소득이 적은 해에
 * 내는 돈이 0이라 현금 흐름이 훨씬 가볍고, 앞으로의 소득이 얼마가 될지는 아무도
 * 모른다. 여기서 내는 것은 "입력한 소득 경로가 실제로 그렇게 될 때의 총액"이고,
 * 그 전제가 틀리면 결론도 틀린다. 화면에서 그 사실을 함께 적는다.
 */
export function compare(std: StandardInput, i: IclInput): Comparison {
  const s = standard(std);
  const c = icl(i);
  const totalDiff = c.totalPaid - s.totalPaid;
  return {
    standard: s,
    icl: c,
    totalDiff,
    cheaper: c.finishYear === null ? null : totalDiff > 0 ? 'standard' : 'icl',
  };
}
