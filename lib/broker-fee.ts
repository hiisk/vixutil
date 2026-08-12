/**
 * 부동산 중개보수(복비) — 주택 거래금액 구간별 상한요율.
 *
 * ── 왜 이 파일이 생겼고, 무엇이 틀려 있었나 (2026-08-12) ──────
 * 이 셈은 `app/(ko)/calculator/broker-fee/page.tsx` 본문에 박혀 있었다. 클라이언트
 * 컴포넌트라 node가 불러올 수 없어 **어떤 검사도 그 파일을 보지 못했다.** 같은 날
 * 취득세에서 100배 버그가, 보유세에서 종부세 절벽 버그가 정확히 같은 자리에서
 * 나왔다. 복비는 이 사이트에서 유입이 가장 많은 계산기라 마지막으로 확인했다.
 *
 * 흠이 둘 있었다.
 *
 * **(1) 구간 경계가 한 칸 아래로 밀려 있었다.**
 *
 *   const tier = tiers.find(t => eff <= t.limit)!;   // ← `<=`
 *
 * 요율표는 「5천만원 이상 ~ 2억원 **미만**」꼴이다. 그래서 상한값 자체는 **위**
 * 구간에 속한다. `<=`로 찾으면 딱 그 금액일 때 한 칸 낮은 요율이 잡힌다.
 *
 *   매매 9억원      0.4% 360만원  →  0.5% 450만원   (90만원 적게)
 *   매매 12억원     0.5% 600만원  →  0.6% 720만원   (120만원)
 *   매매 15억원     0.6% 900만원  →  0.7% 1,050만원 (150만원)
 *   임대차 6억원    0.3% 180만원  →  0.4% 240만원   (60만원)
 *
 * 하필 사람들이 가장 많이 치는 반듯한 숫자에서 어긋난다. 아래쪽 두 경계(5천만·
 * 2억)에서는 한도액이 걸려 두 셈이 우연히 같은 값을 낸다 — 그래서 눈으로 훑을
 * 때 표가 맞는 것처럼 보였다. 검사가 경계를 밟아야 하는 까닭이 이것이다.
 *
 * **(2) 월세 환산보증금에 ×70 규칙이 없었다.**
 *
 *   eff = deposit + monthly * 100;                   // ← 이것뿐
 *
 * 환산보증금은 보증금 + 월세×100이지만, **그 값이 5천만원 미만이면 월세×70으로
 * 다시 센다.** 그 규칙이 빠져 있어 보증금 500만·월세 40만원이면
 * 4,500만원(→ 한도 20만원)으로 잡혔다. 옳게는 3,300만원이라 16.5만원이다.
 * 원룸 월세가 거의 다 이 구간이라, 가장 흔한 거래에서 3.5만원을 더 물렸다.
 *
 * ── 이 요율은 상한이다 ─────────────────────────────────────
 * 표의 값은 「상한요율」이고 그 안에서 협의한다. 정해진 금액이 아니다. 화면에도
 * 그렇게 적었다. 요율표는 시행규칙으로 개정되므로 lib/yearly-values.ts에 등록해
 * 새해마다 훑게 했다.
 */

/** 구간 하나 — `min` 이상 `limit` 미만에 `rate`(%)를 매기고, `cap`이 있으면 그것을 넘지 않는다 */
export interface FeeTier {
  /** 이 구간의 상한(원). 이 금액은 **다음** 구간에 속한다 */
  limit: number;
  /** 상한요율(%) */
  rate: number;
  /** 한도액(원). 0이면 한도가 없다 */
  cap: number;
}

/** 매매·교환 */
export const BUY_TIERS: FeeTier[] = [
  { limit: 50_000_000, rate: 0.6, cap: 250_000 },
  { limit: 200_000_000, rate: 0.5, cap: 800_000 },
  { limit: 900_000_000, rate: 0.4, cap: 0 },
  { limit: 1_200_000_000, rate: 0.5, cap: 0 },
  { limit: 1_500_000_000, rate: 0.6, cap: 0 },
  { limit: Infinity, rate: 0.7, cap: 0 },
];

/** 임대차(전세·월세) */
export const RENT_TIERS: FeeTier[] = [
  { limit: 50_000_000, rate: 0.5, cap: 200_000 },
  { limit: 100_000_000, rate: 0.4, cap: 300_000 },
  { limit: 600_000_000, rate: 0.3, cap: 0 },
  { limit: 1_200_000_000, rate: 0.4, cap: 0 },
  { limit: 1_500_000_000, rate: 0.5, cap: 0 },
  { limit: Infinity, rate: 0.6, cap: 0 },
];

/** 주택이 아닌 것(상가·토지 등)은 구간이 없고 이 요율 안에서 협의한다 */
export const NON_HOUSING_MAX_RATE = 0.9;

/** 월세를 보증금으로 환산할 때 곱하는 수 */
export const MONTHLY_MULTIPLIER = 100;
/** 환산액이 이 금액 미만이면 곱하는 수를 낮춘다 */
export const LOW_RENT_THRESHOLD = 50_000_000;
export const LOW_RENT_MULTIPLIER = 70;

/** 부가가치세율 — 중개사가 일반과세자일 때만 붙는다 */
export const VAT_RATE = 0.1;

export type TxType = 'buy' | 'jeonse' | 'monthly';

/**
 * 월세 거래의 거래금액(환산보증금).
 *
 * 보증금 + 월세 × 100 이 원칙이고, **그 값이 5천만원 미만이면** 보증금 + 월세 × 70
 * 으로 다시 센다. 두 번째 셈의 결과가 5천만원을 넘어도 그대로 쓴다 — 규칙이
 * 「환산한 값이 5천만원 미만인 경우」를 보고 곱하는 수를 정하기 때문이다.
 */
export function monthlyToDeposit(deposit: number, monthly: number): number {
  const d = Math.max(0, deposit);
  const m = Math.max(0, monthly);
  const full = d + m * MONTHLY_MULTIPLIER;
  return full < LOW_RENT_THRESHOLD ? d + m * LOW_RENT_MULTIPLIER : full;
}

/**
 * 거래금액이 속하는 구간.
 *
 * `limit` **미만**을 찾는다. 상한값 자체는 다음 구간이다 — 그것이 원래 틀려
 * 있었던 곳이고, 검사가 경계를 1원 차이로 밟아 지킨다.
 */
export function tierFor(amount: number, tiers: FeeTier[]): FeeTier {
  return tiers.find(t => amount < t.limit) ?? tiers[tiers.length - 1];
}

export interface BrokerFeeInput {
  type: TxType;
  /** 매매가 또는 전세보증금(원). 월세일 때는 쓰지 않는다 */
  amount?: number;
  /** 월세일 때의 보증금(원) */
  deposit?: number;
  /** 월세일 때의 월 임대료(원) */
  monthly?: number;
  /** 부가세를 더할지 */
  vat?: boolean;
}

export interface BrokerFeeResult {
  /** 거래금액(원). 월세면 환산보증금이다 */
  dealAmount: number;
  /** 적용 상한요율(%) */
  rate: number;
  /** 한도액(원). 0이면 한도가 없다 */
  cap: number;
  /** 한도에 걸렸는가 */
  cappedAt: boolean;
  /** 중개보수 상한(원) */
  fee: number;
  /** 부가세(원) */
  vatAmount: number;
  /** 합계(원) */
  total: number;
}

export function calcBrokerFee({
  type,
  amount = 0,
  deposit = 0,
  monthly = 0,
  vat = true,
}: BrokerFeeInput): BrokerFeeResult {
  const dealAmount =
    type === 'monthly' ? monthlyToDeposit(deposit, monthly) : Math.max(0, amount);

  const tier = tierFor(dealAmount, type === 'buy' ? BUY_TIERS : RENT_TIERS);
  const rawFee = (dealAmount * tier.rate) / 100;
  const capped = tier.cap > 0 && rawFee > tier.cap;
  const fee = Math.round(capped ? tier.cap : rawFee);
  const vatAmount = vat ? Math.round(fee * VAT_RATE) : 0;

  return {
    dealAmount,
    rate: tier.rate,
    cap: tier.cap,
    cappedAt: capped,
    fee,
    vatAmount,
    total: fee + vatAmount,
  };
}
