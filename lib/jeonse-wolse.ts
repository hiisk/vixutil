/**
 * 전세 vs 월세 유불리 비교.
 *
 * 기존 전월세 전환 계산기(jeonwolse)는 전환율로 전세↔월세 금액을 환산할 뿐, "나에게
 * 어느 쪽이 이득인가"는 답하지 않는다. 이 계산기가 그 질문에 답한다.
 *
 * 핵심은 묶인 돈의 기회비용이다. 전세는 큰 보증금을 통째로 묶는 대신 월세를 안 내고,
 * 월세는 보증금이 작아 돈이 남지만 매달 월세가 나간다. 그래서 각각의 "연간 실비용"을
 * 같은 기준으로 계산해 비교한다:
 *
 *   전세 연 비용 = 전세보증금 × 자금비용률
 *   월세 연 비용 = 월세×12 + 월세보증금 × 자금비용률
 *
 * 자금비용률은 그 돈이 대출이면 대출금리, 내 돈이면 예금·투자로 벌 수 있었던
 * 수익률(기회비용)이다. 하나의 값으로 단순화한 건 이 비교의 본질이 "돈의 시간가치를
 * 몇 %로 보느냐"에 달려 있어서다 — 그 값에 따라 답이 뒤집힌다.
 *
 * 그래서 손익분기 금리를 함께 낸다: 내 돈이 이 금리보다 높게 굴러가면 월세가, 낮으면
 * 전세가 유리하다. 이 한 숫자가 "지금 예금금리에서는 어느 쪽?"을 바로 답해준다.
 */

export interface JeonseWolseInput {
  /** 전세보증금 */
  jeonseDeposit: number;
  /** 월세 보증금 */
  wolseDeposit: number;
  /** 월세 */
  monthlyRent: number;
  /** 연 자금비용률(%) — 대출금리 또는 예금·투자 기회비용 */
  rate: number;
}

export type Cheaper = 'jeonse' | 'wolse' | 'equal';

export interface JeonseWolseResult {
  jeonseAnnualCost: number;
  wolseAnnualCost: number;
  /** 월세 연비용 − 전세 연비용. 양수면 전세가 저렴 */
  annualDiff: number;
  /** 월 기준 차액 (절댓값) */
  monthlyDiff: number;
  cheaper: Cheaper;
  /**
   * 두 방식의 비용이 같아지는 자금비용률(%). 이 값보다 금리가 높으면 월세,
   * 낮으면 전세가 유리하다. 두 보증금이 같으면 정의되지 않아 null.
   */
  breakevenRate: number | null;
}

export function calcJeonseWolse({
  jeonseDeposit, wolseDeposit, monthlyRent, rate,
}: JeonseWolseInput): JeonseWolseResult {
  const jeonse = Math.max(0, jeonseDeposit);
  const wDeposit = Math.max(0, wolseDeposit);
  const rent = Math.max(0, monthlyRent);
  const r = Math.max(0, rate) / 100;

  const jeonseAnnualCost = jeonse * r;
  const wolseAnnualCost = rent * 12 + wDeposit * r;
  const annualDiff = wolseAnnualCost - jeonseAnnualCost;

  let cheaper: Cheaper = 'equal';
  if (Math.abs(annualDiff) >= 1) cheaper = annualDiff > 0 ? 'jeonse' : 'wolse';

  // 손익분기: 월세×12 = (전세보증금 − 월세보증금) × rate*
  // 전세보증금이 더 커야 의미가 있다(정상적인 경우). 차이가 0 이하면 정의 안 함.
  const depositGap = jeonse - wDeposit;
  const breakevenRate = depositGap > 0 ? (rent * 12) / depositGap * 100 : null;

  return {
    jeonseAnnualCost,
    wolseAnnualCost,
    annualDiff,
    monthlyDiff: Math.abs(annualDiff) / 12,
    cheaper,
    breakevenRate,
  };
}
