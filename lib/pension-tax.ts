/**
 * 연금을 받을 때 내는 세금 — 공적연금과 사적연금은 셈이 다르다.
 *
 * ── 둘을 왜 갈라야 하나 ────────────────────────────────────
 * 국민연금 같은 **공적연금**은 연금소득으로 종합과세된다. 다만 연금소득공제를
 * 크게 주므로 실제 세금은 생각보다 적고, 받는 금액이 적으면 아예 0이 된다.
 *
 * 연금저축·IRP 같은 **사적연금**은 연간 수령액이 1,500만원 이하면 낮은 세율로
 * 떼고 끝내는 것(분리과세)을 고를 수 있다. 이 세율이 **나이에 따라 내려간다** —
 * 늦게 받을수록 유리하게 설계되어 있다. 1,500만원을 넘으면 종합과세와 16.5%
 * 분리과세 중 유리한 쪽을 고른다.
 *
 * ── 규칙만 적는다 ─────────────────────────────────────────
 * 연금소득공제 구간, 저율 분리과세 세율, 1,500만원 기준선은 모두 법에 적힌
 * 값이라 해마다 바뀌지 않는다. 그래서 여기에 둔다. 반대로 다른 소득이 얼마인지,
 * 인적공제가 얼마인지는 사람마다 달라 입력으로 받는다.
 *
 * 기본세율표와 누진공제는 lib/retirement-income-tax.ts의 것을 그대로 쓴다 —
 * 같은 표를 두 곳에 적으면 한쪽만 고쳐질 때 조용히 어긋난다.
 */

import { progressiveTax } from './retirement-income-tax.ts';

/** 지방소득세는 소득세의 10%다 */
export const LOCAL_TAX_RATE = 0.1;

/** 사적연금 저율 분리과세를 고를 수 있는 연간 한도(원) */
export const PRIVATE_SEPARATE_LIMIT = 15_000_000;

/** 한도를 넘겼을 때 고를 수 있는 분리과세 세율(지방소득세 포함) */
export const PRIVATE_OVER_RATE = 0.165;

/**
 * 사적연금 저율 분리과세 세율(지방소득세 포함) — 나이가 많을수록 낮다.
 *
 * 70세 미만 5.5% · 70세 이상 4.4% · 80세 이상 3.3%.
 * 나이는 연금을 받는 시점으로 본다.
 */
export const PRIVATE_RATES: { from: number; rate: number }[] = [
  { from: 80, rate: 0.033 },
  { from: 70, rate: 0.044 },
  { from: 0, rate: 0.055 },
];

export function privateRate(age: number): number {
  return (PRIVATE_RATES.find(r => age >= r.from) ?? PRIVATE_RATES[PRIVATE_RATES.length - 1]).rate;
}

/**
 * 연금소득공제 — 총연금액에서 빼 주는 금액. 한도는 900만원이다.
 *
 *   350만원 이하        전액
 *   350만 ~ 700만       350만 + 초과분의 40%
 *   700만 ~ 1,400만     490만 + 초과분의 20%
 *   1,400만 초과        630만 + 초과분의 10%  (900만원 한도)
 *
 * 구간이 이어져 있는지는 검사가 경계마다 되짚는다 — 한 칸이 틀리면 그 구간에서만
 * 금액이 튀는데, 그것만으로는 눈에 안 띈다.
 */
export const PENSION_DEDUCTION_CAP = 9_000_000;

export function pensionDeduction(total: number): number {
  const t = Math.max(0, total);
  let d: number;
  if (t <= 3_500_000) d = t;
  else if (t <= 7_000_000) d = 3_500_000 + (t - 3_500_000) * 0.4;
  else if (t <= 14_000_000) d = 4_900_000 + (t - 7_000_000) * 0.2;
  else d = 6_300_000 + (t - 14_000_000) * 0.1;
  return Math.min(PENSION_DEDUCTION_CAP, d);
}

export interface PensionTaxInput {
  /** 공적연금 연 수령액(원) — 국민연금·공무원연금 등 */
  publicAnnual: number;
  /** 사적연금 연 수령액(원) — 연금저축·IRP */
  privateAnnual: number;
  /** 연금을 받는 나이 */
  age: number;
  /** 공적연금 말고 종합과세되는 다른 소득금액(원) */
  otherIncome: number;
  /** 인적공제 등 그 밖의 소득공제 합계(원) */
  personalDeduction: number;
}

export interface PensionTaxResult {
  /** 연금소득공제액(원) */
  deduction: number;
  /** 공적연금의 연금소득금액(원) */
  publicIncome: number;
  /** 과세표준(원) */
  taxBase: number;
  /** 공적연금 쪽 소득세(원) */
  publicTax: number;
  /** 공적연금 쪽 지방소득세(원) */
  publicLocalTax: number;
  /** 사적연금에 적용된 세율 */
  privateRate: number;
  /** 사적연금 쪽 세금(지방소득세 포함, 원) */
  privateTax: number;
  /** 사적연금이 한도를 넘겼는가 */
  privateOverLimit: boolean;
  /** 세금 합계(원) */
  totalTax: number;
  /** 세후 연 수령액(원) */
  netAnnual: number;
  /** 세후 월 수령액(원) */
  netMonthly: number;
  /** 실효세율(%) */
  effectiveRate: number;
}

export function calcPensionTax(input: PensionTaxInput): PensionTaxResult {
  const pub = Math.max(0, input.publicAnnual);
  const pri = Math.max(0, input.privateAnnual);

  const deduction = pensionDeduction(pub);
  const publicIncome = Math.max(0, pub - deduction);

  const taxBase = Math.max(
    0,
    publicIncome + Math.max(0, input.otherIncome) - Math.max(0, input.personalDeduction),
  );
  const publicTax = progressiveTax(taxBase);
  const publicLocalTax = publicTax * LOCAL_TAX_RATE;

  /*
   * 사적연금이 한도를 넘으면 종합과세와 16.5% 분리과세 중 유리한 쪽을 고른다.
   * 여기서는 넘긴 경우 16.5%를 적용한다 — 종합과세가 유리한지는 다른 소득까지
   * 다 넣어 봐야 알 수 있고, 그 판단은 이 계산기가 답하는 범위를 넘는다.
   */
  const privateOverLimit = pri > PRIVATE_SEPARATE_LIMIT;
  const rate = privateOverLimit ? PRIVATE_OVER_RATE : privateRate(input.age);
  const privateTax = pri * rate;

  const totalTax = publicTax + publicLocalTax + privateTax;
  const gross = pub + pri;

  return {
    deduction,
    publicIncome,
    taxBase,
    publicTax,
    publicLocalTax,
    privateRate: rate,
    privateTax,
    privateOverLimit,
    totalTax,
    netAnnual: gross - totalTax,
    netMonthly: (gross - totalTax) / 12,
    effectiveRate: gross > 0 ? (totalTax / gross) * 100 : 0,
  };
}

/**
 * 사적연금을 몇 년에 걸쳐 나눠 받으면 세금이 얼마나 줄어드는가.
 *
 * 한 해에 1,500만원을 넘기면 세율이 16.5%로 뛴다. 같은 총액을 더 여러 해에
 * 나누면 그 선 아래로 내려가고, 게다가 나이가 들면서 세율이 또 내려간다.
 * 두 효과가 겹치는 것이 이 표에서 보인다.
 */
export function spreadTable(
  input: PensionTaxInput,
  totalPrivate: number,
  yearsList: number[],
): { years: number; perYear: number; taxPerYear: number; totalTax: number; rate: number }[] {
  return yearsList.map(years => {
    const perYear = totalPrivate / years;
    // 해마다 한 살씩 먹는다 — 늦게 받는 몫은 더 낮은 세율을 만난다
    let sum = 0;
    for (let i = 0; i < years; i++) {
      const r = calcPensionTax({ ...input, privateAnnual: perYear, age: input.age + i });
      sum += r.privateTax;
    }
    const first = calcPensionTax({ ...input, privateAnnual: perYear });
    return {
      years,
      perYear,
      taxPerYear: first.privateTax,
      totalTax: sum,
      rate: first.privateRate,
    };
  });
}
