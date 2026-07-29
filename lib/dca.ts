/**
 * 적립식 매수(DCA) 백테스트 — "그때부터 매달 넣었으면 지금 얼마?"
 *
 * 이런 계산기는 대부분 시작일 하나를 골라 결과 하나를 보여준다. 그런데 암호화폐에서
 * 시작일은 결과를 지배한다. 같은 전략·같은 기간이라도 언제 시작했느냐로 수익률이
 * 몇 배씩 갈린다. 시작일 하나만 보여주는 숫자는 사실상 그 날짜를 고른 사람의 선택이다.
 *
 * 그래서 여기서는 두 가지를 같이 낸다.
 *   (1) 사용자가 고른 기간의 결과 — 흔히 보는 그 숫자
 *   (2) **가능한 모든 시작일**에 같은 전략을 돌린 분포 — 중앙값, 사분위, 손실로 끝난 비율
 * (2)가 있어야 (1)이 운이 좋았던 창인지 아닌지 알 수 있다.
 *
 * 일시불(lump sum) 비교도 같이 낸다. "DCA가 더 안전하다"는 통념은 검증 대상이지
 * 전제가 아니다. 상승장이 길었던 자산에서는 일시불이 이기는 창이 더 많다.
 *
 * ── 표본 수 주의 ─────────────────────────────────────────
 * 겹치는 창(overlapping window)은 표본 수를 부풀린다. 3년치 일별 데이터로 1년 창을
 * 만들면 창은 700개가 넘지만 서로 겹치지 않는 창은 3개뿐이다. scenarios.ts와 같은
 * 기준으로 독립 창 수를 함께 돌려주고, 부족하면 reliable=false로 표시한다.
 */

/** 독립 창이 이보다 적으면 분포를 신뢰할 수 없다 (scenarios.ts와 같은 기준) */
export const MIN_INDEPENDENT_WINDOWS = 6;

export type Frequency = 'daily' | 'weekly' | 'monthly';

/** 매수 주기 → 며칠마다인지 */
export const FREQ_DAYS: Record<Frequency, number> = { daily: 1, weekly: 7, monthly: 30 };

export const FREQ_LABEL: Record<Frequency, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
};

export interface DcaResult {
  /** 실제로 넣은 총액 */
  invested: number;
  /** 매수 횟수 */
  buys: number;
  /** 모은 수량 */
  units: number;
  /** 종료 시점 평가액 */
  finalValue: number;
  /** 수익률(%) */
  roiPct: number;
  /** 평균 매입단가 */
  avgCost: number;
  /** 종료 시점 가격 */
  finalPrice: number;
  /** 시작 시점 가격 */
  startPrice: number;
}

/**
 * closes[start] 부터 days 동안 freq 주기로 amount씩 매수한다.
 * 마지막 종가로 평가한다. 구간이 모자라면 null.
 */
export function runDca(closes: number[], start: number, days: number, amount: number, freq: Frequency): DcaResult | null {
  const step = FREQ_DAYS[freq];
  if (!(amount > 0) || !(days > 0) || start < 0) return null;
  const end = start + days;
  if (end > closes.length) return null;

  let units = 0;
  let invested = 0;
  let buys = 0;
  for (let i = start; i < end; i += step) {
    const p = closes[i];
    if (!(p > 0)) continue;
    units += amount / p;
    invested += amount;
    buys++;
  }
  if (buys === 0 || invested === 0) return null;

  const finalPrice = closes[end - 1];
  if (!(finalPrice > 0)) return null;
  const finalValue = units * finalPrice;

  return {
    invested,
    buys,
    units,
    finalValue,
    roiPct: (finalValue / invested - 1) * 100,
    avgCost: invested / units,
    finalPrice,
    startPrice: closes[start],
  };
}

/**
 * 같은 총액을 시작일에 한 번에 넣었을 때의 수익률(%).
 * DCA와 공정하게 비교하려면 투입 총액이 같아야 한다.
 */
export function lumpRoi(closes: number[], start: number, days: number): number | null {
  const end = start + days;
  if (start < 0 || end > closes.length) return null;
  const p0 = closes[start];
  const p1 = closes[end - 1];
  if (!(p0 > 0) || !(p1 > 0)) return null;
  return (p1 / p0 - 1) * 100;
}

export interface DcaDistribution {
  /** 겹치는 창까지 포함한 시작일 수 */
  windows: number;
  /** 서로 겹치지 않는 창 수 — 실제 표본 크기에 가깝다 */
  independent: number;
  reliable: boolean;
  medianRoi: number;
  p25: number;
  p75: number;
  best: number;
  worst: number;
  /** 이익으로 끝난 시작일 비율(%) */
  pProfit: number;
  /** 일시불이 DCA를 이긴 시작일 비율(%) */
  lumpWinPct: number;
  medianLumpRoi: number;
}

const quantile = (sorted: number[], q: number): number => {
  if (sorted.length === 1) return sorted[0];
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return lo === hi ? sorted[lo] : sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
};

/**
 * 가능한 모든 시작일에 같은 전략을 돌려 결과 분포를 만든다.
 * 창이 아주 많으면 균등 간격으로 솎아낸다(정확도보다 응답성이 중요한 자리다).
 */
export function dcaDistribution(
  closes: number[],
  days: number,
  amount: number,
  freq: Frequency,
  maxWindows = 1200,
): DcaDistribution | null {
  if (!(days > 0) || closes.length < days + 1) return null;

  const total = closes.length - days;
  if (total < 1) return null;
  // 창 개수는 floor(total/stride) + 1 이다. total/maxWindows 로 나누면 딱 하나가
  // 초과하므로 (maxWindows - 1) 로 나눈다.
  const stride = maxWindows > 1 ? Math.max(1, Math.ceil(total / (maxWindows - 1))) : total + 1;

  const rois: number[] = [];
  const lumps: number[] = [];
  let lumpWins = 0;

  for (let s = 0; s <= total; s += stride) {
    const r = runDca(closes, s, days, amount, freq);
    const l = lumpRoi(closes, s, days);
    if (!r || l == null) continue;
    rois.push(r.roiPct);
    lumps.push(l);
    if (l > r.roiPct) lumpWins++;
  }
  if (rois.length === 0) return null;

  const sorted = [...rois].sort((a, b) => a - b);
  const sortedLump = [...lumps].sort((a, b) => a - b);

  return {
    windows: rois.length,
    independent: Math.floor(closes.length / days),
    reliable: Math.floor(closes.length / days) >= MIN_INDEPENDENT_WINDOWS,
    medianRoi: quantile(sorted, 0.5),
    p25: quantile(sorted, 0.25),
    p75: quantile(sorted, 0.75),
    best: sorted[sorted.length - 1],
    worst: sorted[0],
    pProfit: (sorted.filter(v => v > 0).length / sorted.length) * 100,
    lumpWinPct: (lumpWins / rois.length) * 100,
    medianLumpRoi: quantile(sortedLump, 0.5),
  };
}

/**
 * 사용자가 고른 결과가 전체 분포에서 어디쯤인지 (백분위, 0~100).
 * "당신이 고른 구간은 상위 12%였습니다" 같은 문장을 만들기 위한 값이다.
 */
export function percentileOf(dist: DcaDistribution, roi: number): number {
  // 분포 요약만 갖고 정확한 백분위를 낼 수는 없으므로 사분위 사이를 선형 보간한다.
  const pts: [number, number][] = [
    [dist.worst, 0],
    [dist.p25, 25],
    [dist.medianRoi, 50],
    [dist.p75, 75],
    [dist.best, 100],
  ];
  if (roi <= pts[0][0]) return 0;
  if (roi >= pts[4][0]) return 100;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (roi >= x0 && roi <= x1) {
      if (x1 === x0) return y1;
      return y0 + ((roi - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return 50;
}
