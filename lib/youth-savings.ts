/**
 * 정부 기여금이 붙는 청년 적금 — 만기에 얼마를 받나.
 *
 * ── 왜 일반 적금 계산기로는 안 되나 ─────────────────────────
 * 정부가 월 납입액의 일부를 얹어 주는 적금은 셈이 세 군데서 갈린다. ①얹어 준
 * 기여금이 원금에 더해지고, ②그 기여금에도 이자가 붙고, ③이자소득세가 면제되는
 * 경우가 있다. 세 가지가 겹치면 같은 금리·같은 납입액인데도 만기 수령액이 일반
 * 적금과 크게 벌어진다. 가입을 정하는 숫자는 결국 둘이다 — **만기에 얼마를 받나**,
 * 그리고 **일반 적금 연 몇 %에 해당하나**.
 *
 * ── 이자 셈은 일반 적금과 똑같다 ───────────────────────────
 * 회차마다 돈이 계좌에 머무는 기간이 다르다. 첫 회차는 n개월치, 마지막 회차는
 * 한 달치 이자를 받으므로 각 회차에 남은 개월 수만큼 단리를 붙여 전부 더한다.
 *
 *   이자 = 월납입액 × (연이율 ÷ 12) × n(n+1)/2
 *
 * /calculator/savings(적금 계산기)가 쓰는 식과 같다. 정부 기여금도 매달 들어오는
 * 돈이므로 같은 식을 기여금 월액에 한 번 더 적용한다 — 기여금이 이자를 얼마나
 * 더 벌어 주는지를 따로 보여 주려고 두 번 나눠 센다.
 *
 * 세율은 lib/interest-tax.ts의 것을 그대로 쓴다. 15.4%를 여기 또 적으면 한쪽만
 * 고쳤을 때 두 계산기가 다른 답을 내놓는다.
 *
 * ── 비율·한도·소득 구간은 안 박는다 ────────────────────────
 * 얹어 주는 비율, 비율이 붙는 납입액 한도, 소득 구간의 경계는 **상품마다 다르고
 * 해마다 바뀐다.** 박아 두면 내년에 조용히 틀린 답을 내놓으므로 구간표 자체를
 * 입력으로 받는다. 코드에 두는 것은 "소득 구간에 따라 비율과 한도가 갈린다"는
 * 구조뿐이다 — lib/basic-pension.ts가 고시값을 다루는 것과 같은 태도다.
 *
 * 그래서 이 계산기는 특정 상품 전용이 아니다. 구간표를 넣는 방식으로 정부가
 * 기여금을 얹어 주는 적립식 상품 어디에나 쓸 수 있다.
 *
 * ── 이 계산이 답하지 못하는 것 ─────────────────────────────
 * **중도 해지는 여기서 내지 않는다.** 대부분의 상품이 만기 전에 깨면 정부 기여금을
 * 주지 않거나 깎고, 약정이율 대신 중도해지이율을 적용한다. 그 이율은 상품마다
 * 다르고 가입 시점에 공시되는 값이라 지어낼 수 없다. 이 계산은 "만기까지 넣었다면
 * 얼마"에만 답한다 — 중도 해지하면 최소한 matchTotal + matchInterest만큼을 놓친다는
 * 것만 알린다.
 *
 * 우대금리 조건, 기본금리와 우대금리가 갈리는 구조, 만기 후 이율, 회차를 거른
 * 경우, 소득이 중간에 바뀌어 구간이 옮겨 가는 경우도 다루지 않는다.
 */
import { WITHHOLDING_RATE } from './interest-tax.ts';

/**
 * 소득 구간 하나 — 구간마다 비율과 한도가 갈린다.
 *
 * 흔한 모양은 "소득이 낮을수록 비율이 높고 한도는 낮다"지만 상품마다 다르므로
 * 규칙을 세우지 않고 값을 그대로 받는다.
 */
export interface MatchTier {
  /** 구간 이름 — 화면에 그대로 보여 줄 말 (예: '총급여 2,400만원 이하') */
  label: string;
  /** 이 구간의 소득 상한(원/년). 맨 위 구간은 Infinity로 적는다 */
  incomeCeiling: number;
  /** 월 납입액에 얹어 주는 비율. 0.06이면 6% */
  matchRate: number;
  /** 비율이 붙는 월 납입액 한도(원). 이 금액을 넘게 넣어도 기여금은 안 늘어난다 */
  matchLimit: number;
}

export interface YouthSavingsInput {
  /** 월 납입액(원) */
  monthly: number;
  /** 납입 기간(개월) */
  months: number;
  /** 연이율(%) — 우대금리를 받는다면 그것까지 더한 값 */
  annualRate: number;
  /** 개인 연소득(원) — 어느 구간에 드는지만 가른다 */
  annualIncome: number;
  /** 소득 구간표 — 상품·연도별로 다르므로 쓰는 쪽에서 넣는다 */
  tiers: MatchTier[];
  /** 이자소득이 비과세인가. 아니면 15.4%를 뗀다 */
  taxFree: boolean;
}

export interface YouthSavingsResult {
  /** 적용된 소득 구간. 어느 구간에도 안 들면 null이고 기여금은 0이다 */
  tier: MatchTier | null;
  /** 월 정부 기여금(원) */
  monthlyMatch: number;
  /** 납입액이 한도를 넘어 기여금이 더 안 붙고 있는가 */
  matchCapped: boolean;
  /** 내가 넣은 원금 합계(원) */
  principal: number;
  /** 정부 기여금 합계(원) */
  matchTotal: number;
  /** 내 원금에 붙는 이자(원) */
  principalInterest: number;
  /** 정부 기여금에 붙는 이자(원) */
  matchInterest: number;
  /** 이자 합계(원, 세전) */
  grossInterest: number;
  /** 이자소득세(원). 비과세면 0 */
  tax: number;
  /** 만기 수령액(원) */
  maturity: number;
  /** 같은 돈을 일반 과세 적금에 넣었을 때의 만기 수령액(원) */
  plainMaturity: number;
  /** 일반 적금이라면 떼였을 이자소득세(원) */
  plainTax: number;
  /** 일반 적금보다 더 받는 금액(원) — 이 계산기의 값은 이 한 줄이다 */
  gap: number;
  /** 원금 대비 연 환산 수익률(%) */
  annualReturn: number;
  /** 같은 만기 수령액을 내는 일반 과세 적금의 연이율(%) — "연 몇 % 적금과 같은가" */
  equivalentRate: number;
}

export interface PlainSavings {
  principal: number;
  interest: number;
  tax: number;
  maturity: number;
}

/**
 * 적금 단리 이자 — 회차별 예치 기간을 더한 셈.
 *
 *   Σ(i=1..n) 월납입액 × (연이율/12) × (n − i + 1) = 월납입액 × (연이율/12) × n(n+1)/2
 *
 * 개월 수를 정수로 자른다. 반 달치 회차는 없다.
 */
export function savingsInterest(monthly: number, months: number, annualRate: number): number {
  const m = Math.max(0, monthly);
  const n = Math.floor(Math.max(0, months));
  const r = Math.max(0, annualRate) / 100;
  return (m * r * (n * (n + 1))) / 2 / 12;
}

/** 일반 과세 적금 — 비교 기준이다. 이자에서 15.4%를 뗀다 */
export function plainSavings(monthly: number, months: number, annualRate: number): PlainSavings {
  const principal = Math.max(0, monthly) * Math.floor(Math.max(0, months));
  const interest = savingsInterest(monthly, months, annualRate);
  const tax = interest * WITHHOLDING_RATE;
  return { principal, interest, tax, maturity: principal + interest - tax };
}

/**
 * 소득이 어느 구간에 드는가 — 상한이 낮은 구간부터 본다.
 *
 * 구간표를 넣는 순서에 답이 달라지면 안 되므로 사본을 정렬해서 찾는다.
 * 어느 구간에도 안 들면(모든 상한을 넘으면) null이다 — 소득이 높아 기여금을
 * 못 받는 경우를 "0원"이 아니라 "구간 밖"으로 구분해 화면에서 달리 말할 수 있게
 * 한다. "그 이상은 전부 이 비율"인 상품이면 맨 위 구간의 상한을 Infinity로 적는다.
 */
export function pickTier(tiers: MatchTier[], annualIncome: number): MatchTier | null {
  const income = Math.max(0, annualIncome);
  return [...tiers]
    .sort((a, b) => a.incomeCeiling - b.incomeCeiling)
    .find(t => income <= t.incomeCeiling) ?? null;
}

/**
 * 월 정부 기여금 — 한도까지의 납입액에만 비율을 매긴다.
 *
 *   기여금 = min(월납입액, 한도) × 비율
 *
 * 한도를 넘게 넣는 것은 자유지만 넘은 부분에는 기여금이 안 붙는다. 원 단위로
 * 자르지 않는 것은 일부러다 — 상품마다 절사·반올림 기준이 달라서, 여기서 임의로
 * 자르면 되짚기가 어긋나고 실제 지급액과도 어차피 안 맞는다.
 */
export function monthlyMatch(tier: MatchTier | null, monthly: number): number {
  if (!tier) return 0;
  return Math.min(Math.max(0, monthly), Math.max(0, tier.matchLimit)) * Math.max(0, tier.matchRate);
}

export function calcYouthSavings(input: YouthSavingsInput): YouthSavingsResult {
  const monthly = Math.max(0, input.monthly);
  const months = Math.floor(Math.max(0, input.months));
  const rate = Math.max(0, input.annualRate);

  const tier = pickTier(input.tiers, input.annualIncome);
  const match = monthlyMatch(tier, monthly);

  const principal = monthly * months;
  const matchTotal = match * months;

  /* 기여금도 매달 들어오는 돈이라 같은 단리 식을 한 번 더 쓴다 */
  const principalInterest = savingsInterest(monthly, months, rate);
  const matchInterest = savingsInterest(match, months, rate);
  const grossInterest = principalInterest + matchInterest;

  const tax = input.taxFree ? 0 : grossInterest * WITHHOLDING_RATE;
  const maturity = principal + matchTotal + grossInterest - tax;

  /*
   * 비교 기준은 "같은 돈을 일반 적금에 넣었을 때"다. 월 납입액·기간·이율을 그대로
   * 두고 기여금과 비과세만 뺀다. 기여금 0 · 비과세 아님이면 두 값이 정확히 같아야
   * 하고, 그것이 이 계산의 가장 확실한 되짚기다.
   */
  const plain = plainSavings(monthly, months, rate);

  /*
   * 연 환산 수익률 — 원금 대비 총수익을 연수로 나눈 단순 연율이다.
   *   만기 = 원금 × (1 + 연환산수익률 × 연수)
   * 뒤집으면 만기 수령액이 그대로 복원된다.
   */
  const years = months / 12;
  const annualReturn = principal > 0 && years > 0
    ? ((maturity - principal) / principal / years) * 100
    : 0;

  /*
   * "일반 적금 연 몇 %에 해당하나" — 사람들이 실제로 알고 싶어 하는 숫자다.
   * 같은 만기 수령액을 내는 일반 **과세** 적금의 연이율을 구한다.
   *
   *   만기 = 원금 + 월납입액 × (r/12) × n(n+1)/2 × (1 − 0.154)
   *   →  r = (만기 − 원금) ÷ (월납입액 × n(n+1)/2 ÷ 12 × (1 − 0.154))
   *
   * 적금은 돈이 평균 절반쯤만 머물러서 분모가 작다. 그래서 기여금이 얹히면 이
   * 값이 두 자릿수까지 튀어 오른다 — 계산이 틀린 게 아니라 그게 이 상품의 값이다.
   */
  const weight = (months * (months + 1)) / 2 / 12;
  const denom = monthly * weight * (1 - WITHHOLDING_RATE);
  const equivalentRate = denom > 0 ? ((maturity - principal) / denom) * 100 : 0;

  return {
    tier,
    monthlyMatch: match,
    matchCapped: tier !== null && monthly > tier.matchLimit,
    principal,
    matchTotal,
    principalInterest,
    matchInterest,
    grossInterest,
    tax,
    maturity,
    plainMaturity: plain.maturity,
    plainTax: plain.tax,
    gap: maturity - plain.maturity,
    annualReturn,
    equivalentRate,
  };
}
