/**
 * 퇴직소득세 — 2023년 개정 이후 기준.
 *
 * 이 사이트에는 퇴직금(severance)을 얼마 받는지 계산하는 도구는 있지만, 그 퇴직금에서
 * 세금이 얼마 떼이는지는 없었다. 실제로 사람들이 퇴직금을 계산한 뒤 곧바로 궁금해하는
 * 것이 이 세금이다.
 *
 * 퇴직소득세는 일반 소득세와 계산 방식이 다르다. 근속연수로 나눴다가 다시 곱하는
 * "연분연승" 구조라서, 오래 일할수록 같은 금액이라도 세부담이 크게 낮아진다. 근속 1년치로
 * 환산해 세율을 매기고 다시 근속연수만큼 곱하기 때문이다.
 *
 * 구조:
 *   1. 퇴직소득금액 − 근속연수공제
 *   2. ÷ 근속연수 × 12  → 환산급여
 *   3. 환산급여 − 환산급여공제  → 과세표준
 *   4. × 기본세율(누진)  → 환산산출세액
 *   5. ÷ 12 × 근속연수  → 산출세액(=퇴직소득세)
 *
 * 반영하지 않은 것: 2013년 이전 근속분에 대한 경과규정(정산 특례), 임원 퇴직소득
 * 한도초과액의 근로소득 전환. 요건이 복잡하고 대상이 좁아 결과는 추정치로 둔다.
 */

/** 근속연수는 1년 미만을 1년으로 올린다 (예: 5년 3개월 → 6년) */
export function serviceYears(months: number): number {
  if (months <= 0) return 0;
  return Math.ceil(months / 12);
}

/** 근속연수공제 — 구간별 누적식 */
export function serviceDeduction(years: number): number {
  if (years <= 0) return 0;
  if (years <= 5) return 1_000_000 * years;
  if (years <= 10) return 5_000_000 + 2_000_000 * (years - 5);
  if (years <= 20) return 15_000_000 + 2_500_000 * (years - 10);
  return 40_000_000 + 3_000_000 * (years - 20);
}

/** 환산급여공제 — 환산급여 구간별 */
export function convertedDeduction(converted: number): number {
  if (converted <= 0) return 0;
  if (converted <= 8_000_000) return converted;
  if (converted <= 70_000_000) return 8_000_000 + (converted - 8_000_000) * 0.6;
  if (converted <= 100_000_000) return 45_200_000 + (converted - 70_000_000) * 0.55;
  if (converted <= 300_000_000) return 61_700_000 + (converted - 100_000_000) * 0.45;
  return 151_700_000 + (converted - 300_000_000) * 0.35;
}

/** 종합소득 기본세율 (2023~) — [상한, 세율, 누진공제] */
export const TAX_BRACKETS: [number, number, number][] = [
  [14_000_000, 0.06, 0],
  [50_000_000, 0.15, 1_260_000],
  [88_000_000, 0.24, 5_760_000],
  [150_000_000, 0.35, 15_440_000],
  [300_000_000, 0.38, 19_940_000],
  [500_000_000, 0.40, 25_940_000],
  [1_000_000_000, 0.42, 35_940_000],
  [Infinity, 0.45, 65_940_000],
];

/** 과세표준에 기본세율을 적용한 산출세액 (누진공제 방식) */
export function progressiveTax(base: number): number {
  if (base <= 0) return 0;
  for (const [ceiling, rate, deduct] of TAX_BRACKETS) {
    if (base <= ceiling) return base * rate - deduct;
  }
  return 0; // 도달 불가 — 마지막 구간이 Infinity
}

export interface RetirementTaxInput {
  /** 퇴직급여(퇴직소득금액) — 비과세 제외 후 */
  payout: number;
  /** 근속 개월 수 */
  serviceMonths: number;
}

export interface RetirementTaxResult {
  years: number;
  serviceDeduction: number;
  /** 근속연수공제 후 금액 */
  afterServiceDeduction: number;
  convertedSalary: number;
  convertedDeduction: number;
  taxBase: number;
  /** 환산산출세액 (÷12×근속 이전) */
  convertedTax: number;
  /** 퇴직소득세 (지방소득세 제외) */
  incomeTax: number;
  /** 지방소득세 = 퇴직소득세 × 10% */
  localTax: number;
  /** 총 세금 */
  totalTax: number;
  /** 세후 실수령 */
  netPayout: number;
  /** 실효세율 (총세금 / 퇴직급여) */
  effectiveRate: number;
}

export function calcRetirementTax({ payout, serviceMonths }: RetirementTaxInput): RetirementTaxResult {
  const years = serviceYears(serviceMonths);

  // 근속연수가 0이면(개월수 0 이하) 환산 과정에서 0으로 나누게 된다. 세금 없음으로 처리.
  if (payout <= 0 || years <= 0) {
    return {
      years, serviceDeduction: 0, afterServiceDeduction: 0, convertedSalary: 0,
      convertedDeduction: 0, taxBase: 0, convertedTax: 0,
      incomeTax: 0, localTax: 0, totalTax: 0, netPayout: Math.max(0, payout), effectiveRate: 0,
    };
  }

  const svcDeduction = serviceDeduction(years);
  const afterServiceDeduction = Math.max(0, payout - svcDeduction);
  const convertedSalary = (afterServiceDeduction / years) * 12;
  const convDeduction = convertedDeduction(convertedSalary);
  const taxBase = Math.max(0, convertedSalary - convDeduction);
  const convertedTax = progressiveTax(taxBase);

  // 원 단위 절사 — 국세는 10원 미만 절사가 원칙이지만 여기서는 원 단위로 둔다.
  const incomeTax = Math.max(0, Math.floor((convertedTax / 12) * years));
  const localTax = Math.floor(incomeTax * 0.1);
  const totalTax = incomeTax + localTax;

  return {
    years,
    serviceDeduction: svcDeduction,
    afterServiceDeduction,
    convertedSalary,
    convertedDeduction: convDeduction,
    taxBase,
    convertedTax,
    incomeTax,
    localTax,
    totalTax,
    netPayout: payout - totalTax,
    effectiveRate: (totalTax / payout) * 100,
  };
}
