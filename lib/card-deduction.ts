/**
 * 신용카드 등 사용금액 소득공제 — 문턱을 넘긴 몫만 공제된다.
 *
 * 이 공제의 첫째 규칙은 **총급여의 25%를 넘게 써야 시작한다**는 것이다.
 * 총급여 4,000만원이면 1,000만원까지는 카드를 어떻게 긁어도 공제가 0원이고,
 * 1,000만원을 넘는 금액부터 공제 대상이 된다. 사람들이 가장 많이 오해하는
 * 자리라서 이 계산기는 문턱을 결과 첫 줄에 내놓는다.
 *
 * ── 수단마다 공제율이 다르다 ────────────────────────────────────
 *   신용카드              15%
 *   체크카드·현금영수증    30%
 *   전통시장·대중교통      40%
 *   도서·공연·박물관      30%
 * 같은 100만원을 써도 체크카드가 신용카드의 두 배를 공제받는다.
 *
 * ── 문턱을 누가 먼저 채우는가 ───────────────────────────────────
 * 문턱(총급여 25%)은 사용액에서 **깎아 없애는** 금액이다. 그러니 공제율이
 * 낮은 수단이 먼저 문턱에 먹히는 것이 납세자에게 유리하다 — 15%짜리가
 * 사라지고 40%짜리가 남는 편이 공제액이 크다. 소득세법의 차감 순서도
 * 신용카드 → 체크카드·현금영수증 → 도서·공연 → 전통시장·대중교통이라
 * 결과가 같다. thresholdOrder가 공제율이 낮은 것부터 줄을 세우고,
 * tests/card-deduction.test.ts가 순서를 뒤집어 이 방식이 늘 크거나 같은지
 * 지킨다.
 *
 * ── 확신하지 못하는 값은 박지 않는다 ────────────────────────────
 * 공제율과 추가한도는 해마다 손질돼 왔다(전통시장·대중교통 40%는 한시로
 * 80%까지 올라간 해가 있었고, 추가한도의 묶음도 바뀌었다). 그래서 공제율
 * 다섯 개와 추가한도는 **입력으로 받고** DEFAULT_RATES·DEFAULT_EXTRA_LIMIT을
 * 화면에서 고칠 수 있는 기본값으로만 둔다. 총급여 구간별 기본한도만
 * BASIC_LIMIT_RULES에 적어 두었고, 그 표도 화면에 그대로 밝혀 둔다.
 *
 * ── 소득공제라 절감액이 사람마다 다르다 ─────────────────────────
 * 이것은 세액공제가 아니라 소득공제다. 과세표준을 줄이므로 실제로 줄어드는
 * 세금은 **그 사람의 세율**에 달렸다. 그래서 근로소득공제는
 * lib/year-end-tax.ts의 earningDeductionWon(안에서 lib/salary.ts의
 * earningDeduction을 부른다)을, 기본세율은 lib/retirement-income-tax.ts의
 * progressiveTax를 그대로 빌려 과세표준을 낸다. 세율표를 여기 다시 적으면
 * 세법이 바뀔 때 한쪽만 고쳐지고 두 계산기가 다른 답을 낸다.
 *
 * 연말정산 전체 셈은 lib/year-end-tax.ts가 낸다. 그쪽은 카드 공제를
 * "소득공제 합계" 칸으로 받아 두었고, 이 계산기가 그 칸에 넣을 값을 낸다.
 */
import { earningDeductionWon } from './year-end-tax.ts';
import { progressiveTax } from './retirement-income-tax.ts';

/** 문턱 — 총급여의 25% */
export const THRESHOLD_RATIO = 0.25;

/** 지방소득세는 소득세의 10%다 */
export const LOCAL_RATE = 0.1;

export type Means = 'credit' | 'check' | 'market' | 'transit' | 'culture';

export type Spending = Record<Means, number>;

export interface Rates {
  /** 신용카드 */
  credit: number;
  /** 체크카드·현금영수증 */
  check: number;
  /** 전통시장 */
  market: number;
  /** 대중교통 */
  transit: number;
  /** 도서·공연·박물관·미술관 */
  culture: number;
}

/** 화면에서 고칠 수 있는 기본 공제율 — 해마다 바뀌어 온 값이다 */
export const DEFAULT_RATES: Rates = {
  credit: 0.15,
  check: 0.30,
  market: 0.40,
  transit: 0.40,
  culture: 0.30,
};

export const MEANS_LABEL: Record<Means, string> = {
  credit: '신용카드',
  check: '체크카드·현금영수증',
  market: '전통시장',
  transit: '대중교통',
  culture: '도서·공연·박물관',
};

/** 기본한도를 넘긴 몫에 추가한도가 열리는 수단 */
export const EXTRA_MEANS: Means[] = ['market', 'transit', 'culture'];

/**
 * 수단을 적는 차례. 문턱 차감 순서의 밑바탕이고, 공제율이 같을 때의
 * 앞뒤도 이 차례를 따른다(sort가 안정 정렬이다).
 */
export const MEANS_ORDER: Means[] = ['credit', 'check', 'culture', 'market', 'transit'];

/**
 * 문턱을 채우는 순서 — **공제율이 낮은 수단이 먼저**다.
 *
 * 공제율을 입력으로 받으므로 순서도 그 값에서 끌어낸다. 40%가 어느 해에
 * 80%로 올라도, 신용카드가 15%에서 20%로 바뀌어도 순서가 저절로 따라온다.
 */
export const thresholdOrder = (rates: Rates): Means[] =>
  [...MEANS_ORDER].sort((a, b) => rates[a] - rates[b]);

/** 총급여 구간별 기본한도 — [상한, 한도] */
export const BASIC_LIMIT_RULES: [number, number][] = [
  [70_000_000, 3_000_000],
  [Infinity, 2_500_000],
];

export function basicLimit(grossSalary: number): number {
  const g = Math.max(0, grossSalary);
  for (const [upTo, limit] of BASIC_LIMIT_RULES) if (g <= upTo) return limit;
  return 2_500_000; // 도달 불가 — 마지막 구간이 Infinity
}

/**
 * 추가한도 기본값 — 전통시장·대중교통·도서공연 몫에만 열린다.
 *
 * 묶는 방식과 금액이 자주 바뀌어(총급여 7천만원을 넘으면 도서·공연이 빠지고
 * 금액도 줄어든 해가 있다) 입력으로 받는다. 이 상수는 화면 기본값일 뿐이다.
 */
export const DEFAULT_EXTRA_LIMIT = 3_000_000;

export interface MeansDetail {
  means: Means;
  /** 이 수단으로 쓴 금액 */
  spending: number;
  /** 적용한 공제율 */
  rate: number;
  /** 문턱에 먹힌 금액 — 이 몫은 공제가 없다 */
  usedForThreshold: number;
  /** 공제 대상으로 남은 금액 */
  eligible: number;
  /** 그 금액에 공제율을 곱한 공제액 */
  deduction: number;
  /** 추가한도가 열리는 수단인가 */
  extra: boolean;
}

/**
 * 문턱을 주어진 순서대로 깎고 수단별 공제액을 낸다.
 *
 * order에는 다섯 수단이 모두 들어 있어야 한다. 검사가 순서를 뒤집어
 * 견주는 데 쓰므로 순서를 인자로 열어 두었다.
 */
export function deductByOrder(
  spending: Spending,
  rates: Rates,
  threshold: number,
  order: Means[],
): MeansDetail[] {
  let left = Math.max(0, threshold);
  const eaten = {} as Record<Means, number>;
  for (const means of order) {
    const amount = Math.max(0, spending[means] ?? 0);
    const used = Math.min(amount, left);
    eaten[means] = used;
    left -= used;
  }
  return MEANS_ORDER.map(means => {
    const amount = Math.max(0, spending[means] ?? 0);
    const used = eaten[means] ?? 0;
    const eligible = amount - used;
    return {
      means,
      spending: amount,
      rate: rates[means],
      usedForThreshold: used,
      eligible,
      deduction: eligible * rates[means],
      extra: EXTRA_MEANS.includes(means),
    };
  });
}

export interface CardInput {
  /** 총급여(원) — 비과세 수당을 뺀 한 해 급여 */
  grossSalary: number;
  /** 수단별 한 해 사용액(원) */
  spending: Spending;
  /** 공제율 — 비우면 DEFAULT_RATES */
  rates?: Rates;
  /** 추가한도(원) — 비우면 DEFAULT_EXTRA_LIMIT */
  extraLimit?: number;
  /**
   * 이 공제를 빼기 전의 그 밖의 소득공제 합계(원) — 인적공제·보험료 등.
   * 줄어드는 세금은 과세표준이 어느 구간에 있느냐로 갈리므로 필요하다.
   */
  otherDeduction?: number;
}

export interface CardResult {
  /** 문턱 = 총급여 × 25% */
  threshold: number;
  /** 총사용액 */
  totalSpending: number;
  /** 공제 대상 금액 = 문턱을 넘긴 사용액 */
  eligibleSpending: number;
  /** 수단별 내역 — 문턱을 무엇이 얼마나 먹었는지 보여 준다 */
  byMeans: MeansDetail[];
  /** 한도 적용 전 공제액 */
  rawDeduction: number;
  /** 총급여 구간별 기본한도 */
  basicLimit: number;
  /** 추가한도 */
  extraLimit: number;
  /** 기본한도까지 인정된 공제액 */
  basicApplied: number;
  /** 기본한도를 넘긴 몫 가운데 추가한도로 되살린 공제액 */
  extraApplied: number;
  /** 한도까지 적용한 최종 공제액(원) */
  deduction: number;
  /** 문턱을 못 넘었나 — 그러면 공제는 0이다 */
  belowThreshold: boolean;
  /** 한도에 걸려 깎였나 */
  cappedByLimit: boolean;
  /** 이 공제를 빼기 전 과세표준 */
  taxBaseBefore: number;
  /** 이 공제를 뺀 뒤 과세표준 */
  taxBaseAfter: number;
  /** 줄어드는 소득세 */
  incomeTaxSaved: number;
  /** 줄어드는 지방소득세 (소득세의 10%) */
  localTaxSaved: number;
  /** 줄어드는 세금 합계 */
  totalSaved: number;
  /** 그때 실제로 붙은 세율 = 줄어든 소득세 ÷ 공제액 */
  marginalRate: number;
}

const sum = (list: number[]) => list.reduce((a, b) => a + b, 0);

export function calcCardDeduction(input: CardInput): CardResult {
  const rates = input.rates ?? DEFAULT_RATES;
  const gross = Math.max(0, input.grossSalary);
  const threshold = gross * THRESHOLD_RATIO;

  const byMeans = deductByOrder(input.spending, rates, threshold, thresholdOrder(rates));
  const totalSpending = sum(byMeans.map(m => m.spending));
  const eligibleSpending = sum(byMeans.map(m => m.eligible));
  const rawDeduction = sum(byMeans.map(m => m.deduction));

  // 기본한도를 먼저 씌우고, 넘친 몫 가운데 전통시장·대중교통·도서공연에서
  // 나온 공제액만 추가한도까지 되살린다. 셋 중 가장 작은 값이 이긴다.
  const limit = basicLimit(gross);
  const basicApplied = Math.min(rawDeduction, limit);
  const overflow = rawDeduction - basicApplied;
  const extraRaw = sum(byMeans.filter(m => m.extra).map(m => m.deduction));
  const extraLimit = Math.max(0, input.extraLimit ?? DEFAULT_EXTRA_LIMIT);
  const extraApplied = Math.min(overflow, extraRaw, extraLimit);
  const deduction = Math.floor(basicApplied + extraApplied);

  // 소득공제이므로 과세표준을 줄인다. 줄어든 세금은 과세표준을 넣은
  // progressiveTax 두 번의 차이다 — 공제가 세율 구간을 걸쳐도 맞는다.
  const earnedIncome = Math.max(0, gross - earningDeductionWon(gross));
  const taxBaseBefore = Math.max(0, earnedIncome - Math.max(0, input.otherDeduction ?? 0));
  const taxBaseAfter = Math.max(0, taxBaseBefore - deduction);
  const incomeTaxSaved = Math.max(0, progressiveTax(taxBaseBefore) - progressiveTax(taxBaseAfter));

  return {
    threshold,
    totalSpending,
    eligibleSpending,
    byMeans,
    rawDeduction,
    basicLimit: limit,
    extraLimit,
    basicApplied,
    extraApplied,
    deduction,
    belowThreshold: totalSpending <= threshold,
    cappedByLimit: rawDeduction > basicApplied + extraApplied + 1e-9,
    taxBaseBefore,
    taxBaseAfter,
    incomeTaxSaved,
    localTaxSaved: incomeTaxSaved * LOCAL_RATE,
    totalSaved: incomeTaxSaved * (1 + LOCAL_RATE),
    marginalRate: deduction > 0 ? incomeTaxSaved / deduction : 0,
  };
}

export interface Headroom {
  /** 문턱까지 남은 사용액 — 여기까지는 무엇을 써도 공제가 0이다 */
  toThreshold: number;
  /** 문턱을 이미 넘긴 금액 */
  overThreshold: number;
  /** 기본한도까지 남은 공제액(원) */
  limitLeft: number;
  /** 추가한도까지 남은 공제액(원) — 전통시장·대중교통·도서공연에만 열린다 */
  extraLimitLeft: number;
  /** 남은 기본한도를 체크카드·현금영수증으로 채우려면 더 써야 하는 금액 */
  moreByCheck: number;
  /** 같은 것을 신용카드로 채우려면 — 공제율이 낮으니 훨씬 많이 써야 한다 */
  moreByCredit: number;
}

/**
 * "얼마를 더 써야 공제가 늘어나나"를 되짚는다.
 *
 * 문턱이 남아 있으면 그 금액은 공제 없이 사라지므로 **문턱 남은 몫까지
 * 더해서** 답해야 한다. 남은 한도를 공제율로 나눈 금액이 그다음이다.
 * 기본한도가 이미 찼으면 더 써도 늘지 않으므로 0을 낸다.
 */
export function spendingHeadroom(input: CardInput): Headroom {
  const r = calcCardDeduction(input);
  const rates = input.rates ?? DEFAULT_RATES;
  const toThreshold = Math.max(0, r.threshold - r.totalSpending);
  const limitLeft = Math.max(0, r.basicLimit - r.basicApplied);
  return {
    toThreshold,
    overThreshold: Math.max(0, r.totalSpending - r.threshold),
    limitLeft,
    extraLimitLeft: Math.max(0, r.extraLimit - r.extraApplied),
    moreByCheck: limitLeft > 0 ? toThreshold + limitLeft / rates.check : 0,
    moreByCredit: limitLeft > 0 ? toThreshold + limitLeft / rates.credit : 0,
  };
}
