/**
 * 복리 — 스테이킹·이자 상품의 APR과 APY.
 *
 * ── 대부분의 계산기가 흐리는 두 가지 ─────────────────────
 *
 * (1) APR과 APY는 다르다. APR은 복리를 빼고 단순히 연 이율을 말한 값이고, APY는
 *     복리를 넣은 실제 결과다. 같은 상품을 "12% APR"과 "12.68% APY"로 둘 다 표기할
 *     수 있어서, 두 상품을 비교할 때 한쪽만 APY로 보면 없는 차이를 만든다.
 *
 *       APY = (1 + APR/n)^n − 1        n = 연간 복리 횟수
 *       APR = ((1 + APY)^(1/n) − 1)·n
 *
 * (2) 더 중요한 문제. 코인으로 받는 이자는 **코인 수가 늘어나는 것**이지 가치가
 *     늘어나는 것이 아니다. 연 12%를 받는 동안 토큰이 20% 빠지면 결과는 손실이다.
 *     암호화폐의 연 변동성은 흔히 50~100%이므로 이자율은 그 소음 안에 묻힌다.
 *     그래서 이 모듈은 "수익률을 지우는 데 필요한 가격 하락"을 함께 계산하고,
 *     페이지에서는 그 하락이 이 코인에서 얼마나 흔한지를 실측 변동성으로 보여준다.
 */

/** 연간 복리 횟수 선택지 */
export const COMPOUND_FREQ: [string, number][] = [
  ['Daily', 365],
  ['Weekly', 52],
  ['Monthly', 12],
  ['Quarterly', 4],
  ['Annually', 1],
];

/** APR → APY. n회 복리. */
export function aprToApy(aprPct: number, perYear: number): number | null {
  if (!isFinite(aprPct) || !isFinite(perYear) || perYear < 1) return null;
  const r = aprPct / 100;
  // −100% 미만은 의미가 없다
  if (1 + r / perYear <= 0) return null;
  return (Math.pow(1 + r / perYear, perYear) - 1) * 100;
}

/** APY → APR. 같은 상품을 같은 기준으로 되돌린다. */
export function apyToApr(apyPct: number, perYear: number): number | null {
  if (!isFinite(apyPct) || !isFinite(perYear) || perYear < 1) return null;
  const y = apyPct / 100;
  if (1 + y <= 0) return null;
  return (Math.pow(1 + y, 1 / perYear) - 1) * perYear * 100;
}

export interface CompoundInput {
  /** 시작 원금 (코인 수량 또는 금액) */
  principal: number;
  /** 표시된 이율(%) */
  ratePct: number;
  /** 위 이율이 APR인가 APY인가 */
  rateKind: 'apr' | 'apy';
  /** 연간 복리 횟수 */
  perYear: number;
  /** 보유 기간(년) */
  years: number;
  /** 매 복리 시점마다 추가로 넣는 금액 */
  contribution?: number;
}

export interface CompoundResult {
  /** 최종 잔액 */
  finalBalance: number;
  /** 넣은 총액 = 원금 + 추가 납입 합 */
  totalContributed: number;
  /** 이자로 늘어난 몫 */
  interestEarned: number;
  /** 실효 APY(%) — 입력이 APR이었어도 이 값으로 비교해야 한다 */
  effectiveApyPct: number;
  /** 표시 이율을 APR로 환산한 값(%) */
  aprPct: number;
  /** 기간 전체 수익률(%) */
  totalReturnPct: number;
  /**
   * 이 수익을 정확히 지우는 데 필요한 가격 하락(%).
   * 최종 잔액이 원금의 k배면 1/k 로 떨어지면 본전이다 — 수익률과 대칭이 아니다.
   */
  breakevenDropPct: number;
}

/**
 * 복리 계산. 추가 납입은 각 복리 시점 **말**에 들어간다고 본다.
 * 입력이 성립하지 않으면 null.
 */
export function computeCompound(input: CompoundInput): CompoundResult | null {
  const { principal, ratePct, rateKind, perYear, years } = input;
  const contribution = input.contribution ?? 0;

  if (!isFinite(principal) || principal < 0) return null;
  if (!isFinite(ratePct)) return null;
  if (!isFinite(perYear) || perYear < 1) return null;
  if (!isFinite(years) || years <= 0) return null;
  if (!isFinite(contribution) || contribution < 0) return null;
  if (principal <= 0 && contribution <= 0) return null;

  // 표시 이율을 APR 기준으로 통일한다
  const aprPct = rateKind === 'apr' ? ratePct : apyToApr(ratePct, perYear);
  if (aprPct == null) return null;
  const periodRate = aprPct / 100 / perYear;
  if (1 + periodRate <= 0) return null;

  const periods = Math.round(perYear * years);
  if (periods < 1) return null;

  let balance = principal;
  for (let i = 0; i < periods; i++) {
    balance = balance * (1 + periodRate) + contribution;
  }

  const totalContributed = principal + contribution * periods;
  const interestEarned = balance - totalContributed;
  const effectiveApyPct = aprToApy(aprPct, perYear);
  if (effectiveApyPct == null) return null;

  const totalReturnPct = totalContributed > 0 ? (balance / totalContributed - 1) * 100 : 0;
  // 1.5배가 됐으면 1/1.5 = 33.3% 하락이 본전이다
  const growth = totalContributed > 0 ? balance / totalContributed : 1;
  const breakevenDropPct = growth > 0 ? (1 - 1 / growth) * 100 : 0;

  return {
    finalBalance: balance,
    totalContributed,
    interestEarned,
    effectiveApyPct,
    aprPct,
    totalReturnPct,
    breakevenDropPct,
  };
}

/**
 * APR을 그대로 APY처럼 읽었을 때의 오차(%p).
 * 상품 비교에서 이 값만큼 없는 차이가 생긴다.
 */
export function aprApyGapPp(aprPct: number, perYear: number): number | null {
  const apy = aprToApy(aprPct, perYear);
  return apy == null ? null : apy - aprPct;
}
