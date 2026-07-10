/**
 * 과거 구간 시나리오 (historical simulation).
 *
 * 모수 모델(lib/forecast.ts)은 "기대수익률은 상수 drift 하나"라는 구조 때문에 예측 경로가
 * 반드시 단조롭다. 반면 이 모듈은 아무 모델도 가정하지 않고, **이 코인이 실제로 살아낸
 * 모든 h일 구간**을 그대로 꺼내 분포를 만든다. 그래서 중앙값이 지평에 따라 부호를 바꿀 수
 * 있다 — 예: SOL은 1주·1개월 중앙값이 음수인데 3개월부터 양수가 된다.
 *
 * 이것은 예측이 아니라 기술통계다. 두 가지를 반드시 함께 노출해야 정직하다.
 *
 *  1) 독립 구간 수. 중첩 구간을 쓰면 표본이 많아 보이지만 실제 정보량은 floor(N/h)에 가깝다.
 *     BTC 3249일에서 3년 구간은 독립 표본이 2개뿐이라 중앙값 +161.8%는 아무 의미가 없다.
 *     그래서 MIN_INDEPENDENT_WINDOWS 미만이면 reliable=false로 표시한다.
 *  2) 국면(regime) 편향. 대부분 코인의 이력은 강세장에 치우쳐 있어 과거 중앙값이 낙관적이다.
 *     "과거에 이랬다"와 "앞으로 이럴 것이다"는 다르다.
 */

export interface ScenarioHorizon {
  key: string;
  label: string;
  short: string;
  days: number;
  /** 사용한 중첩 구간 수 */
  windows: number;
  /** 겹치지 않는 구간 수 = floor(N / h). 실질 표본 크기. */
  independent: number;
  /** independent >= MIN_INDEPENDENT_WINDOWS 인가 */
  reliable: boolean;
  /** 가격으로 환산한 분위수 */
  p10: number;
  p25: number;
  median: number;
  p75: number;
  p90: number;
  /** 중앙값의 현재가 대비 변동률(%) */
  medianPct: number;
  /** 과거 구간 중 상승 마감한 비율(%) */
  pUp: number;
}

/** 이보다 독립 구간이 적으면 숫자를 신뢰할 수 없다고 표시한다 */
export const MIN_INDEPENDENT_WINDOWS = 6;

function quantile(sorted: number[], f: number): number {
  const i = (sorted.length - 1) * f;
  const lo = Math.floor(i), hi = Math.ceil(i);
  return lo === hi ? sorted[lo] : sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo);
}

/**
 * @param closes 상장 이후 전체 일봉 종가(오래된 순)
 * @param spot   현재가 — 과거 수익률을 여기에 곱해 가격으로 환산한다
 */
export function historicalScenarios(
  closes: number[],
  spot: number,
  horizons: { key: string; label: string; short: string; days: number }[],
): ScenarioHorizon[] {
  if (!(spot > 0) || closes.length < 10) return [];
  const out: ScenarioHorizon[] = [];

  for (const h of horizons) {
    const d = h.days;
    if (closes.length <= d + 5) continue; // 그 지평의 구간이 아예 없다

    const rets: number[] = [];
    for (let i = 0; i + d < closes.length; i++) {
      if (closes[i] > 0) rets.push(closes[i + d] / closes[i] - 1);
    }
    if (rets.length < 5) continue;

    const sorted = [...rets].sort((a, b) => a - b);
    const median = quantile(sorted, 0.5);
    const independent = Math.floor(closes.length / d);

    out.push({
      key: h.key,
      label: h.label,
      short: h.short,
      days: d,
      windows: rets.length,
      independent,
      reliable: independent >= MIN_INDEPENDENT_WINDOWS,
      p10: spot * (1 + quantile(sorted, 0.10)),
      p25: spot * (1 + quantile(sorted, 0.25)),
      median: spot * (1 + median),
      p75: spot * (1 + quantile(sorted, 0.75)),
      p90: spot * (1 + quantile(sorted, 0.90)),
      medianPct: median * 100,
      pUp: (rets.filter(r => r > 0).length / rets.length) * 100,
    });
  }
  return out;
}

/** 지평별 중앙값 부호가 바뀌는가 — "단기는 내려가도 장기는 오른다" 같은 모양 */
export function hasSignFlip(rows: ScenarioHorizon[]): boolean {
  const usable = rows.filter(r => r.reliable);
  for (let i = 1; i < usable.length; i++) {
    if (Math.sign(usable[i].medianPct) !== Math.sign(usable[i - 1].medianPct)) return true;
  }
  return false;
}
