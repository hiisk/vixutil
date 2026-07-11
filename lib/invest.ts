/**
 * 투자 결과 분포 — "지금 $X를 넣고 N일 들고 있으면?"
 *
 * 경쟁 사이트는 이 질문에 단일 ROI 숫자로 답한다. 그러나 결과는 분포이지 숫자가 아니다.
 * 같은 모델(팻테일 t + 지평별 변동성)에서 분위수와 확률을 그대로 뽑아 쓴다.
 *
 * 중앙값을 쓰고 평균은 헤드라인에 쓰지 않는다. 로그정규 평균은 중앙값보다 10% 이상 높아
 * (BTC 1년 기준 $1,340 vs $1,217) 평균을 내세우면 실제보다 매력적으로 보이지만,
 * 그 값은 절반보다 적은 확률로만 초과된다.
 */
import { dfAt, tQuantStd, tCdfStd, type ForecastModel } from './forecast';

export interface InvestOutcome {
  days: number;
  /** 분위수별 최종 평가액 */
  p10: number;
  p25: number;
  median: number;
  p75: number;
  p90: number;
  /** 원금 대비 중앙값 수익률(%) */
  medianRoi: number;
  /** 원금 손실 확률(%) */
  pLoss: number;
  /** 2배 이상이 될 확률(%) */
  pDouble: number;
}

export function investOutcome(m: ForecastModel, amount: number, days: number): InvestOutcome | null {
  if (!(amount > 0) || !(days > 0)) return null;
  const drift = m.mu * days;
  const sd = m.sigmaAt(days) * Math.sqrt(days);
  if (!(sd > 0)) return null;
  const v = dfAt(days);
  const at = (p: number) => amount * Math.exp(drift + tQuantStd(p, v) * sd);
  const median = amount * Math.exp(drift); // t분위수의 중앙값은 0이므로 해석적으로 계산
  return {
    days,
    p10: at(0.10),
    p25: at(0.25),
    median,
    p75: at(0.75),
    p90: at(0.90),
    medianRoi: (median / amount - 1) * 100,
    pLoss: tCdfStd((0 - drift) / sd, v) * 100,
    pDouble: (1 - tCdfStd((Math.log(2) - drift) / sd, v)) * 100,
  };
}
