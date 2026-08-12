/**
 * 연말정산 — 환급이냐 추가납부냐.
 *
 * 연말정산은 새로 세금을 매기는 것이 아니다. 회사가 매달 어림으로 떼어 간
 * 세금(기납부세액)과 한 해를 다 살고 나서 확정한 세금(결정세액)의 **차액을
 * 맞추는 일**이다. 그래서 이 계산기의 마지막 줄은 뺄셈 하나다.
 *
 *   기납부세액 − 결정세액 = 환급(+) 또는 추가납부(−)
 *
 * ── 셈의 뼈대 ───────────────────────────────────────────────────
 *   총급여 − 근로소득공제                → 근로소득금액
 *   근로소득금액 − 소득공제              → 과세표준
 *   과세표준 × 기본세율(누진)            → 산출세액
 *   산출세액 − 세액공제                  → 결정세액
 *   기납부세액 − 결정세액                → 환급 또는 추가납부
 *
 * ── 표를 두 곳에 적지 않는다 ────────────────────────────────────
 * 근로소득공제는 lib/salary.ts의 earningDeduction을, 기본세율은
 * lib/retirement-income-tax.ts의 progressiveTax를 그대로 쓴다. 4대보험
 * 요율도 calcSalary에 이미 있어 estimatePremiums가 그것을 빌려 온다.
 * 같은 표를 파일마다 다시 적으면 세법이 바뀔 때 한쪽만 고쳐지고, 두
 * 계산기가 다른 답을 내면서도 둘 다 통과한다.
 *
 * ── 무엇을 일부러 계산하지 않았나 ───────────────────────────────
 * 의료비·교육비·기부금·신용카드 사용액 같은 항목은 요건이 촘촘하다.
 * 총급여의 3%를 넘는 의료비만, 카드는 총급여 25% 초과분만, 항목마다
 * 한도와 공제율이 따로다. 그 요건을 반쯤 구현해 그럴듯한 숫자를 내놓는
 * 것보다 **합계를 입력으로 받고 무엇이 거기 들어가는지 화면에 적는 것**이
 * 정직하다. 국세청 간소화 자료에 그 합계가 이미 나와 있다.
 *
 * 연금계좌(연금저축·IRP) 세액공제는 lib/pension-credit.ts가 따로 낸다.
 * 여기서는 그 결과를 세액공제 칸에 더해 쓰는 것으로 둔다 — 같은 셈을
 * 두 곳에 두지 않는다.
 *
 * 표준세액공제(13만원)도 넣지 않았다. 특별소득공제·특별세액공제를 하나도
 * 신청하지 않은 사람만 받는 것이라 조건을 반만 구현하면 오히려 틀린다.
 * 공제를 거의 넣지 않은 경우 결정세액이 실제보다 조금 크게 나온다.
 */
import { calcSalary, earningDeduction } from './salary.ts';
import { progressiveTax } from './retirement-income-tax.ts';

/** 근로소득공제(원). lib/salary.ts의 식은 만원 단위라 여기서 감싼다. */
export const earningDeductionWon = (grossSalary: number): number =>
  grossSalary <= 0 ? 0 : earningDeduction(grossSalary / 10_000) * 10_000;

/** 기본공제 — 본인과 부양가족 1인당 */
export const BASIC_DEDUCTION = 1_500_000;
/** 경로우대 추가공제 — 70세 이상 1인당 */
export const ELDERLY_DEDUCTION = 1_000_000;
/** 장애인 추가공제 — 1인당 */
export const DISABLED_DEDUCTION = 2_000_000;

export interface Family {
  /** 기본공제 대상 부양가족 수 — 본인은 빼고 센다 */
  dependents: number;
  /** 그 가운데 70세 이상 인원 */
  elderly: number;
  /** 그 가운데 장애인 인원 */
  disabled: number;
}

/**
 * 인적공제. 법이 금액을 딱 정해 둔 자리라 상수로 박아도 된다.
 *
 * 추가공제는 기본공제에 **얹는** 것이다 — 70세 넘는 부모를 모시면
 * 150만원에 100만원이 더 붙는다. 그래서 인원을 따로 곱해 더한다.
 */
export const personalDeduction = ({ dependents, elderly, disabled }: Family): number =>
  BASIC_DEDUCTION * (1 + Math.max(0, dependents))
  + ELDERLY_DEDUCTION * Math.max(0, elderly)
  + DISABLED_DEDUCTION * Math.max(0, disabled);

/**
 * 자녀세액공제 — 첫째 15만, 둘째 20만, 셋째부터 30만원씩.
 *
 * 그래서 1명 15만, 2명 35만, 3명 65만원이 된다. 8세 미만은 아동수당을
 * 받으므로 이 공제에서 빠진다 — 인원을 셀 때 8세 이상만 넣어야 한다.
 */
export function childCredit(children: number): number {
  const n = Math.max(0, Math.floor(children));
  if (n === 0) return 0;
  if (n === 1) return 150_000;
  return 350_000 + (n - 2) * 300_000;
}

/**
 * 근로소득세액공제의 한도 — 총급여로 갈린다.
 *
 * 소득세법이 정한 네 구간이고, 뒤쪽 세 구간에는 "이보다 적으면 이 금액"이라는
 * 바닥이 함께 붙어 있다. 그 바닥 덕분에 구간이 바뀌는 자리에서 값이 튀지
 * 않는다 — 4,300만원을 넘으면 66만원에서 평평해지고, 7,000만원에서 다음
 * 구간이 정확히 66만원부터 다시 내려간다.
 */
export const CREDIT_LIMIT_RULES = [
  { upTo: 33_000_000, base: 740_000, rate: 0, floor: 740_000 },
  { upTo: 70_000_000, base: 740_000, rate: 0.008, floor: 660_000 },
  { upTo: 120_000_000, base: 660_000, rate: 0.5, floor: 500_000 },
  { upTo: Infinity, base: 500_000, rate: 0.5, floor: 200_000 },
] as const;

export function earnedIncomeCreditLimit(grossSalary: number): number {
  const g = Math.max(0, grossSalary);
  let from = 0;
  for (const rule of CREDIT_LIMIT_RULES) {
    if (g <= rule.upTo) return Math.max(rule.floor, rule.base - (g - from) * rule.rate);
    from = rule.upTo;
  }
  return 200_000; // 도달 불가 — 마지막 구간이 Infinity
}

/** 55%가 적용되는 산출세액의 경계 */
export const CREDIT_STEP = 1_300_000;
export const CREDIT_HIGH_RATE = 0.55;
export const CREDIT_LOW_RATE = 0.3;

/**
 * 근로소득세액공제 — 산출세액 130만원까지는 55%, 넘는 몫은 30%.
 *
 * 130만원에서 55%와 30%가 갈리지만 값은 이어진다(130만 × 55% = 71.5만원에서
 * 30%로 기울기만 꺾인다). 마지막에 총급여로 정해진 한도를 씌운다.
 */
export function earnedIncomeCredit(calculatedTax: number, grossSalary: number): number {
  if (calculatedTax <= 0) return 0;
  const raw = calculatedTax <= CREDIT_STEP
    ? calculatedTax * CREDIT_HIGH_RATE
    : CREDIT_STEP * CREDIT_HIGH_RATE + (calculatedTax - CREDIT_STEP) * CREDIT_LOW_RATE;
  return Math.min(raw, earnedIncomeCreditLimit(grossSalary));
}

/** 지방소득세는 소득세의 10%다 */
export const LOCAL_RATE = 0.1;

/** 4대보험료(연간, 원) — 소득공제로 들어가는 몫만 본다 */
export interface Premiums {
  /** 국민연금 보험료 — 연금보험료공제 */
  pension: number;
  /** 건강보험 + 장기요양 + 고용보험 — 특별소득공제(보험료) */
  insurance: number;
}

/**
 * 총급여만으로 보험료를 어림한다.
 *
 * 요율을 여기 다시 적지 않고 lib/salary.ts의 calcSalary가 낸 월 보험료에
 * 12를 곱한다. 실제 연말정산은 원천징수영수증에 적힌 실제 납부액을 쓰므로
 * 이 값은 **칸을 채워 주는 어림**이고, 명세서가 있으면 그 숫자가 이긴다.
 */
export function estimatePremiums(grossSalary: number): Premiums {
  if (grossSalary <= 0) return { pension: 0, insurance: 0 };
  const s = calcSalary(grossSalary, 1, false);
  return {
    pension: s.pension * 12,
    insurance: (s.health + s.longCare + s.employment) * 12,
  };
}

export interface YearEndInput extends Family {
  /** 총급여(원) — 비과세 수당을 뺀 한 해 급여 */
  grossSalary: number;
  /** 8세 이상 자녀 수 — 자녀세액공제 */
  children: number;
  /** 국민연금 보험료(연간, 원) */
  pensionPremium: number;
  /** 건강·장기요양·고용보험료(연간, 원) */
  insurancePremium: number;
  /**
   * 그 밖의 소득공제 합계(원) — 신용카드 등 사용금액, 주택자금,
   * 주택마련저축, 개인연금저축 소득공제처럼 **과세표준을 줄이는** 것들
   */
  otherIncomeDeduction: number;
  /**
   * 세액공제 합계(원) — 보험료·의료비·교육비·기부금, 연금계좌,
   * 월세처럼 **세금에서 바로 빼는** 것들
   */
  taxCredits: number;
  /** 기납부세액(원) — 원천징수영수증의 소득세. 지방소득세는 뺀 금액 */
  prepaid: number;
}

export interface YearEndResult {
  /** 근로소득공제 */
  earningDeduction: number;
  /** 근로소득금액 = 총급여 − 근로소득공제 */
  earnedIncome: number;
  /** 인적공제 */
  personalDeduction: number;
  /** 소득공제 합계 */
  incomeDeductions: number;
  /** 과세표준 */
  taxBase: number;
  /** 산출세액 */
  calculatedTax: number;
  /** 근로소득세액공제 */
  earnedIncomeCredit: number;
  /** 그때 적용된 한도 — 왜 이만큼인지 화면에 보여 준다 */
  creditLimit: number;
  /** 자녀세액공제 */
  childCredit: number;
  /** 세액공제 합계 */
  creditTotal: number;
  /** 결정세액 (소득세) */
  finalTax: number;
  /** 결정세액에 딸린 지방소득세 */
  localTax: number;
  /** 소득세 환급(+) 또는 추가납부(−) */
  refund: number;
  /** 지방소득세도 같은 방향으로 10%가 따라 움직인다 */
  localRefund: number;
  /** 손에 들어오는(또는 더 내는) 합계 */
  totalRefund: number;
  /** 실효세율 = 결정세액 ÷ 총급여 (%) */
  effectiveRate: number;
}

const won = (n: number) => Math.floor(Math.max(0, n));

export function calcYearEnd(input: YearEndInput): YearEndResult {
  const gross = Math.max(0, input.grossSalary);

  const earnDeduct = earningDeductionWon(gross);
  const earnedIncome = Math.max(0, gross - earnDeduct);

  const personal = personalDeduction(input);
  const incomeDeductions = personal
    + Math.max(0, input.pensionPremium)
    + Math.max(0, input.insurancePremium)
    + Math.max(0, input.otherIncomeDeduction);

  // 공제가 소득보다 많아도 과세표준은 0에서 멈춘다 — 음의 세금은 없다
  const taxBase = Math.max(0, earnedIncome - incomeDeductions);
  const calculatedTax = Math.max(0, progressiveTax(taxBase));

  const workCredit = earnedIncomeCredit(calculatedTax, gross);
  const child = childCredit(input.children);
  // 세액공제는 산출세액을 넘겨 받을 수 없다 — 넘는 몫은 그냥 사라진다
  const creditTotal = Math.min(
    calculatedTax,
    workCredit + child + Math.max(0, input.taxCredits),
  );

  const finalTax = won(calculatedTax - creditTotal);
  const localTax = won(finalTax * LOCAL_RATE);

  const prepaid = Math.max(0, input.prepaid);
  const refund = prepaid - finalTax;

  return {
    earningDeduction: earnDeduct,
    earnedIncome,
    personalDeduction: personal,
    incomeDeductions,
    taxBase,
    calculatedTax,
    earnedIncomeCredit: workCredit,
    creditLimit: earnedIncomeCreditLimit(gross),
    childCredit: child,
    creditTotal,
    finalTax,
    localTax,
    refund,
    localRefund: refund * LOCAL_RATE,
    totalRefund: refund * (1 + LOCAL_RATE),
    effectiveRate: gross > 0 ? (finalTax / gross) * 100 : 0,
  };
}
