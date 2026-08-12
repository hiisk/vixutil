/**
 * 월세 세액공제 — 조세특례제한법 제95조의2.
 *
 * ── 왜 셈이 페이지가 아니라 이 파일에 있나 ─────────────────
 * 이 저장소의 계산기 화면은 'use client' 페이지다. node가 불러올 수 없어서
 * **페이지 본문에 박힌 셈은 어떤 검사도 보지 못한다.** 2026-08-12에 취득세
 * 계산기가 정확히 그 구조 때문에 100배 버그로 검사 3,013개를 통과했고(7억
 * 주택의 취득세를 32억으로 냈다), 같은 자리에서 종부세를 초과누진이 아니라
 * 전체 과세표준에 한 세율을 곱해 내던 것(lib/holding-tax.ts 첫 주석)과 복비
 * 경계 버그도 나왔다. 그래서 이 계산기는 처음부터 셈을 여기 두고, 페이지는
 * 값을 받아 그리기만 한다.
 *
 * ── 이 공제의 뼈대 ────────────────────────────────────────
 *   1. 한 해 낸 월세 = 월세액 × 낸 개월 수
 *   2. 그 가운데 **연 한도**까지만 공제 대상이다
 *   3. 대상 금액 × **총급여 구간별 공제율** = 공제액
 *   4. 그 공제액은 **결정세액을 넘겨 환급되지 않는다**
 *
 * 4번이 이 계산기의 심장이다. 월세 세액공제는 소득세에서 바로 빼는 것이라
 * **낼 세금이 없으면 받을 것도 없다.** 총급여 3,000만원 1인 가구의 결정세액은
 * 50만원대인데 월세 60만원이면 공제액이 122만원이라, 70만원 넘는 금액이 그냥
 * 사라진다. 다른 월세 계산기들이 122만원을 크게 띄워 놓는 자리다. 그래서 이
 * 셈은 결정세액 상한을 반드시 물리고, 사라진 금액을 `wasted`로 따로 내놓는다.
 *
 * ── 구간 경계에서 공제액이 절벽처럼 뛴다 (그게 맞다) ──────
 * 이 공제율은 **초과누진이 아니다.** 총급여가 5,500만원에서 1원만 넘어도
 * 공제율이 17%에서 15%로 통째로 갈리고, 한도까지 낸 사람은 공제액이
 * 170만원에서 150만원으로 **20만원 떨어진다.** 8,000만원을 1원 넘으면 공제가
 * 아예 0이 된다. 소득세 기본세율(lib/retirement-income-tax.ts)이 초과누진이라
 * 경계에서 튀지 않는 것과 정반대이므로, 여기서 종부세 버그와 같은 "경계가
 * 튀면 틀렸다"는 직관을 쓰면 오히려 틀린다. 조특법이 그렇게 적혀 있고,
 * tests/monthly-rent-deduction.test.ts가 이 절벽의 높이를 못 박아 지킨다.
 *
 * ── 확신하지 못하는 것은 코드에 박지 않았다 ───────────────
 * 공제율·소득 기준·한도액은 조특법 개정으로 계속 바뀌어 왔다(한도는 750만원
 * 이던 해가 있고, 총급여 상한은 7,000만원이던 해가 있다). 그래서 전부 인자로
 * 받을 수 있게 두고, 화면이 넘기지 않으면 아래 기본값을 쓴다. 화면에는 공제율
 * 표와 한도를 직접 고치는 칸을 두었다.
 *
 * **요건은 이 파일이 판단하지 않는다.** 국민주택규모·기준시가 기준, 세대주
 * 요건, 전입신고 요건은 숫자와 예외가 촘촘하고 개정을 거듭했다. 면적이나
 * 기준시가를 받아 우리가 판정하면 그럴듯하지만 틀린 답을 내놓게 되므로,
 * **요건 충족 여부를 예·아니오로 받는다**(`Requirements`). 하나라도 못 채우면
 * 공제율이 0이 되고, 대신 아래 소득공제 갈래를 보여 준다.
 *
 * ── 세액공제와 소득공제는 **둘 중 하나**다 ────────────────
 * 요건을 못 채워 월세 세액공제를 못 받아도, 월세를 현금영수증으로 신고하면
 * 신용카드 등 사용금액 **소득공제**로 넣을 수 있다. 다만 같은 월세를 두 갈래로
 * 함께 받을 수는 없다. 사람들이 가장 헷갈리는 자리라 두 갈래를 나란히 낸다.
 *
 * 소득공제 갈래의 절세액은 **그 사람의 세율**에 달렸다. 그래서 세율표를 여기
 * 다시 적지 않고 lib/year-end-tax.ts의 calcYearEnd를 두 번 불러(공제 전·후)
 * 결정세액의 차이를 본다. 그러면 소득공제가 산출세액을 줄일 때 근로소득세액공제
 * (산출세액의 55%)도 함께 줄어드는 것까지 저절로 맞는다 — 세율만 곱하면 저소득
 * 구간에서 절세액을 두 배 넘게 부풀린다.
 *
 * 소득공제 갈래는 **가장 좋은 경우의 상한**이다. 카드 등 사용금액 공제에는
 * 총급여 25% 문턱과 구간별 한도가 있어서 월세를 얹어도 한 푼도 안 늘 수 있다.
 * 실제 금액은 lib/card-deduction.ts(/calculator/card-deduction)가 낸다. 그래서
 * 그 계산기에서 나온 증가분을 `cashDeduction`으로 직접 넣을 수 있게 두었다.
 */
import {
  LOCAL_RATE, calcYearEnd, earningDeductionWon, estimatePremiums,
} from './year-end-tax.ts';

/* 지방소득세율을 여기 다시 적지 않는다 — 소득세가 줄면 그 10%가 따라 줄어든다 */
export { LOCAL_RATE };

/**
 * 공제 대상 월세액의 **연간 한도**(원).
 *
 * 조특법 개정으로 바뀐다(750만원이던 해가 있다). 인자로 갈아 끼울 수 있다.
 */
export const RENT_LIMIT = 10_000_000;

/**
 * 월세를 현금영수증으로 돌렸을 때의 소득공제율.
 *
 * 신용카드 등 사용금액 공제의 현금영수증 공제율을 쓴다. 그 값도 개정되므로
 * 인자로 받고, 실제 공제율은 lib/card-deduction.ts의 DEFAULT_RATES.check와
 * 같아야 한다 — 검사가 두 값을 맞대 갈리지 않는지 본다.
 */
export const CASH_RECEIPT_RATE = 0.30;

/**
 * 총급여 구간별 공제율 — **초과누진이 아니라 한 구간의 율을 전체에 곱한다.**
 *
 * 줄마다 조건이 둘이다. 총급여가 `salaryUpTo` 이하이고 **동시에** 종합소득금액이
 * `incomeUpTo` 이하여야 그 줄의 율을 쓴다. 종합소득금액 조건은 근로 말고 다른
 * 소득이 있는 사람을 걸러내는 장치다 — 순수 근로자는 총급여 5,500만원의
 * 근로소득금액이 4,250만원이라 이 조건에 걸리지 않는다.
 *
 * 위에서 아래로 훑어 **처음 맞는 줄**을 쓴다. 그래서 줄의 차례가 값을 정한다:
 * 총급여 상한은 오름차순, 공제율은 내림차순이어야 한다. 순서를 뒤집으면 낮은
 * 율이 먼저 걸려 모두가 15%를 받게 되므로, 검사가 정렬을 직접 확인한다.
 *
 * 어느 줄에도 안 맞으면 공제율은 0 — 소득이 상한을 넘어 대상이 아니다.
 */
export interface RateRule {
  /** 총급여 상한(원) */
  salaryUpTo: number;
  /** 종합소득금액 상한(원) */
  incomeUpTo: number;
  /** 공제율 */
  rate: number;
}

export const DEFAULT_RATE_RULES: RateRule[] = [
  { salaryUpTo: 55_000_000, incomeUpTo: 45_000_000, rate: 0.17 },
  { salaryUpTo: 80_000_000, incomeUpTo: 70_000_000, rate: 0.15 },
];

export function creditRate(
  grossSalary: number,
  totalIncome: number,
  rules: RateRule[] = DEFAULT_RATE_RULES,
): number {
  const g = Math.max(0, grossSalary);
  const i = Math.max(0, totalIncome);
  for (const r of rules) if (g <= r.salaryUpTo && i <= r.incomeUpTo) return r.rate;
  return 0;
}

/**
 * 요건 — 우리가 판정하지 않고 예·아니오로 받는 것들.
 *
 * 라벨에 숫자를 적지 않았다. 국민주택규모와 기준시가 기준은 개정돼 왔고, 여기
 * 적어 두면 그 숫자가 확인된 값처럼 보인다. 화면이 그 숫자를 안내로 덧붙이면서
 * "홈택스에서 확인하라"고 함께 적는다.
 */
export const REQUIREMENT_KEYS = [
  'noHouse', 'household', 'houseSize', 'contract', 'address',
] as const;

export type RequirementKey = typeof REQUIREMENT_KEYS[number];

export const REQUIREMENT_LABEL: Record<RequirementKey, string> = {
  noHouse: '과세기간 종료일 기준 세대 전원이 무주택',
  household: '세대주 (세대주가 주택자금·주택마련저축 공제를 받지 않으면 세대원도 가능)',
  houseSize: '국민주택규모 이하이거나 기준시가 요건을 채운 주택',
  contract: '임대차계약자가 본인 또는 기본공제대상자',
  address: '전입신고를 마쳤고 임대차계약서 주소와 주민등록 주소가 같다',
};

export type Requirements = Record<RequirementKey, boolean>;

/** 모두 충족한 상태 — 화면의 처음 값이고, 검사가 여기서 하나씩 꺼 본다 */
export const ALL_MET: Requirements = {
  noHouse: true, household: true, houseSize: true, contract: true, address: true,
};

/** 못 채운 요건의 열쇠 — 화면이 이 목록을 그대로 보여 준다 */
export const unmetRequirements = (req: Requirements): RequirementKey[] =>
  REQUIREMENT_KEYS.filter(k => !req[k]);

/**
 * 결정세액을 남김없이 쓰는 월세액(원/월).
 *
 * 이보다 월세가 높으면 넘는 몫의 공제가 사라진다. 결정세액 ÷ 공제율 ÷ 개월 수다.
 * 낸 값이 한도(RENT_LIMIT ÷ 개월)를 넘으면 **한도가 먼저 걸린다는 뜻**이고, 그
 * 사람은 월세를 얼마 내도 공제가 사라지지 않는다.
 */
export function rentUsingAllTax(
  taxBeforeCredit: number,
  rate: number,
  months: number,
): number {
  if (rate <= 0 || months <= 0) return 0;
  return Math.max(0, taxBeforeCredit) / rate / months;
}

/** 어느 갈래로 갔을 때 얼마를 아끼나 */
export interface RouteSaving {
  /** 공제액(원) — 세액공제는 세금에서 빼는 금액, 소득공제는 과세표준에서 빼는 금액 */
  deduction: number;
  /** 줄어드는 소득세(원) */
  incomeTaxSaved: number;
  /** 줄어드는 지방소득세(원) — 소득세의 10% */
  localTaxSaved: number;
  /** 줄어드는 세금 합계(원) */
  totalSaved: number;
}

export interface RentDeductionInput {
  /** 총급여(원) — 비과세 수당을 뺀 한 해 급여 */
  grossSalary: number;
  /** 월세액(원/월) */
  monthlyRent: number;
  /** 월세를 낸 개월 수. 안 넘기면 12 */
  months?: number;
  /** 요건 충족 여부. 안 넘기면 모두 충족으로 본다 */
  requirements?: Requirements;
  /**
   * 종합소득금액(원). 안 넘기면 근로소득금액(총급여 − 근로소득공제)으로 본다.
   * 근로 말고 다른 소득이 있는 사람만 이 값이 따로 필요하다.
   */
  totalIncome?: number;
  /**
   * 이 공제를 빼기 **전**의 결정세액(원) — 원천징수영수증에 적혀 있다.
   * 안 넘기면 총급여와 부양가족 수로 어림한다(`taxEstimated`가 true가 된다).
   */
  taxBeforeCredit?: number;
  /** 결정세액을 어림할 때 쓰는 부양가족 수 — 본인은 빼고 센다 */
  dependents?: number;
  /** 그 밖의 소득공제 합계(원) — 결정세액 어림과 소득공제 갈래의 밑바탕이다 */
  otherIncomeDeduction?: number;
  /** 월세 말고 이미 받는 세액공제 합계(원) — 결정세액 상한을 그만큼 깎는다 */
  otherCredits?: number;
  /** 총급여 구간별 공제율. 안 넘기면 DEFAULT_RATE_RULES */
  rateRules?: RateRule[];
  /** 공제 대상 월세액의 연 한도(원). 안 넘기면 RENT_LIMIT */
  rentLimit?: number;
  /** 현금영수증 소득공제율. 안 넘기면 CASH_RECEIPT_RATE */
  cashReceiptRate?: number;
  /**
   * 소득공제 갈래의 공제액(원)을 직접 넣는다.
   * /calculator/card-deduction에서 월세를 넣어 늘어난 공제액을 그대로 쓴다.
   * 안 넘기면 한 해 월세 × 현금영수증 공제율 — **문턱과 한도를 무시한 상한**이다.
   */
  cashDeduction?: number;
}

export interface RentDeductionResult {
  /** 한 해 낸 월세(원) */
  annualRent: number;
  /** 적용한 연 한도(원) */
  rentLimit: number;
  /** 공제 대상 월세액(원) = min(한 해 월세, 한도) */
  eligibleRent: number;
  /** 한도를 넘겨 버려진 월세(원) */
  overLimit: number;
  /** 적용된 공제율 — 요건을 못 채우거나 소득이 상한을 넘으면 0 */
  rate: number;
  /** 요건을 모두 채웠나 */
  qualified: boolean;
  /** 못 채운 요건 */
  unmet: RequirementKey[];
  /** 소득이 상한을 넘어 대상이 아닌가 — 요건과 다른 이유다 */
  overIncomeLimit: boolean;
  /** 결정세액 상한을 물리기 **전**의 공제액(원) */
  rawCredit: number;
  /** 이 공제를 빼기 전 결정세액(원) */
  taxBeforeCredit: number;
  /** 그 결정세액을 어림했나 — true면 원천징수영수증 값으로 바꿔야 한다 */
  taxEstimated: boolean;
  /** 실제로 받는 공제액(원) = min(공제액, 결정세액) */
  credit: number;
  /** 결정세액이 모자라 사라진 공제액(원) */
  wasted: number;
  /** 결정세액을 남김없이 쓰는 월세액(원/월) */
  fullCreditMonthlyRent: number;
  /** 세액공제로 갔을 때 */
  creditRoute: RouteSaving;
  /** 월세를 현금영수증 소득공제로 돌렸을 때 (상한) */
  incomeRoute: RouteSaving;
  /** 소득공제 갈래에서 실제로 붙은 세율 = 줄어든 소득세 ÷ 공제액 */
  incomeRouteMarginalRate: number;
  /** 어느 쪽이 유리한가 */
  better: 'credit' | 'income' | 'same';
}

const won = (n: number) => Math.floor(Math.max(0, n));

/**
 * 결정세액을 총급여와 부양가족 수로 어림한다.
 *
 * 세율표·근로소득공제·근로소득세액공제를 여기 다시 적지 않고 lib/year-end-tax.ts의
 * calcYearEnd를 그대로 부른다. 보험료도 그 파일의 estimatePremiums가 낸다.
 * 같은 표를 두 곳에 적으면 세법이 바뀔 때 한쪽만 고쳐지고, 두 계산기가 다른
 * 답을 내면서도 둘 다 통과한다.
 */
export function estimateFinalTax({
  grossSalary,
  dependents = 0,
  otherIncomeDeduction = 0,
  otherCredits = 0,
}: {
  grossSalary: number;
  dependents?: number;
  otherIncomeDeduction?: number;
  otherCredits?: number;
}): number {
  const gross = Math.max(0, grossSalary);
  if (gross <= 0) return 0;
  const premiums = estimatePremiums(gross);
  return calcYearEnd({
    grossSalary: gross,
    dependents: Math.max(0, dependents),
    elderly: 0,
    disabled: 0,
    children: 0,
    pensionPremium: premiums.pension,
    insurancePremium: premiums.insurance,
    otherIncomeDeduction: Math.max(0, otherIncomeDeduction),
    taxCredits: Math.max(0, otherCredits),
    prepaid: 0,
  }).finalTax;
}

export function calcMonthlyRentDeduction(input: RentDeductionInput): RentDeductionResult {
  const gross = Math.max(0, input.grossSalary);
  const months = Math.max(0, Math.round(input.months ?? 12));
  const annualRent = Math.max(0, input.monthlyRent) * months;

  const rentLimit = Math.max(0, input.rentLimit ?? RENT_LIMIT);
  const eligibleRent = Math.min(annualRent, rentLimit);

  /* 종합소득금액을 안 넘기면 근로소득금액으로 본다 — 근로소득만 있는 사람이다 */
  const totalIncome = input.totalIncome ?? Math.max(0, gross - earningDeductionWon(gross));

  const requirements = input.requirements ?? ALL_MET;
  const unmet = unmetRequirements(requirements);
  const qualified = unmet.length === 0;

  const byIncome = creditRate(gross, totalIncome, input.rateRules ?? DEFAULT_RATE_RULES);
  const rate = qualified ? byIncome : 0;
  const rawCredit = won(eligibleRent * rate);

  /*
   * 결정세액 상한 — 이것이 없으면 낼 세금이 없는 사람에게 환급을 약속하게 된다.
   * 세액공제는 세금에서 빼는 것이라 뺄 세금이 없으면 그냥 사라진다.
   */
  const taxEstimated = input.taxBeforeCredit === undefined;
  const taxBeforeCredit = won(
    input.taxBeforeCredit ?? estimateFinalTax({
      grossSalary: gross,
      dependents: input.dependents,
      otherIncomeDeduction: input.otherIncomeDeduction,
      otherCredits: input.otherCredits,
    }),
  );
  const credit = Math.min(rawCredit, taxBeforeCredit);

  /*
   * ── 소득공제 갈래 ──────────────────────────────────────
   * 같은 월세를 현금영수증으로 돌렸을 때 줄어드는 세금. calcYearEnd를 공제
   * 전·후로 두 번 불러 결정세액의 차이를 본다. 세율만 곱하면 산출세액이 줄 때
   * 근로소득세액공제도 함께 줄어드는 것을 놓쳐 절세액이 부풀려진다.
   */
  const cashRate = input.cashReceiptRate ?? CASH_RECEIPT_RATE;
  const cashDeduction = won(input.cashDeduction ?? eligibleRent * cashRate);
  const otherIncomeDeduction = Math.max(0, input.otherIncomeDeduction ?? 0);
  const base = { grossSalary: gross, dependents: input.dependents, otherCredits: input.otherCredits };
  const taxWithout = estimateFinalTax({ ...base, otherIncomeDeduction });
  const taxWith = estimateFinalTax({ ...base, otherIncomeDeduction: otherIncomeDeduction + cashDeduction });
  /* 소득공제로 줄어드는 세금도 결정세액을 넘을 수 없다 — 세금이 음수가 되지는 않는다 */
  const incomeTaxSaved = Math.min(won(taxWithout - taxWith), taxBeforeCredit);

  const route = (deduction: number, saved: number): RouteSaving => ({
    deduction,
    incomeTaxSaved: saved,
    localTaxSaved: saved * LOCAL_RATE,
    totalSaved: saved * (1 + LOCAL_RATE),
  });
  const creditRoute = route(rawCredit, credit);
  const incomeRoute = route(cashDeduction, incomeTaxSaved);

  return {
    annualRent,
    rentLimit,
    eligibleRent,
    overLimit: Math.max(0, annualRent - eligibleRent),
    rate,
    qualified,
    unmet,
    overIncomeLimit: byIncome === 0,
    rawCredit,
    taxBeforeCredit,
    taxEstimated,
    credit,
    wasted: rawCredit - credit,
    fullCreditMonthlyRent: rentUsingAllTax(taxBeforeCredit, rate, months),
    creditRoute,
    incomeRoute,
    incomeRouteMarginalRate: cashDeduction > 0 ? incomeTaxSaved / cashDeduction : 0,
    better:
      credit > incomeTaxSaved ? 'credit'
        : incomeTaxSaved > credit ? 'income'
          : 'same',
  };
}
