/**
 * 가격 projection 모델 — 일봉 종가로 기하 브라운 운동(GBM)을 적합해 미래 가격의
 * 확률분포를 만든다. 점 예측(중앙값 하나)이 아니라 분포를 다루는 이유는 아래 실측 때문이다.
 *
 * ── 왜 "방향 예측"을 하지 않는가 ─────────────────────────────
 * 바이낸스 상위 46개 코인 · 일봉 1000개로 백테스트했다(미래 정보 누출 없음, 겹치지 않는
 * 전방 구간, 코인 단위 t검정):
 *
 *   예측자          지평   IC       코인단위 t   방향 적중률
 *   기술적 합의     5일   -0.0005    -0.35       49.8%
 *   기술적 합의    30일   -0.055     -2.39       48.3%
 *   모멘텀(20일)   30일    0.100      1.57       51.5%
 *   모멘텀(60일)   30일    0.036     -1.77       53.8%
 *   모멘텀(120일)  30일   -0.009     -4.61       49.0%
 *
 * 기술적 합의(Trend·Bollinger·RSI·ATR)는 예측력이 사실상 0이고 30일에서는 오히려 부호가
 * 음수다. 모멘텀은 pooled와 coin-level에서 부호가 뒤집혀 견고하지 않다. 즉 이 데이터로
 * 중앙값을 어느 방향으로든 기울일 근거가 없다. 예전 버전은 합의 점수로 중앙값을 기울였는데,
 * 그것은 잡음을 예측으로 포장한 것이었으므로 제거했다.
 *
 * 남는 것: drift는 0에 가깝고(아래 축소 참조), 따라서 중앙값 ≈ 현재가다. 이것은 버그가
 * 아니라 정답이며, 그래서 UI는 중앙값 대신 **구간과 확률**을 보여준다. 구간 폭과 목표
 * 도달 확률은 코인·지평마다 크게 다르고 전부 실측 변동성에서 나온다.
 *
 * ── drift를 억제하는 두 단계 ──────────────────────────────────
 *  1) 축소: max(0, 1 - (T_CRIT/t)^2) (양의 부분 James-Stein).
 *     T_CRIT을 통상적인 2가 아니라 3으로 둔 근거: drift를 최대 1095일 복리로 늘리므로
 *     위양성 한 건의 대가가 크다. drift=0인 랜덤워크 4000회 몬테카를로 결과,
 *       t=2 → 4.6%가 위양성, 허위 3년 변동 최악 +1909%
 *       t=3 → 0.3%, 최악 276%
 *     반면 진짜 추세(|t|=9.4)는 t=3에서도 drift의 86%가 살아남는다.
 *  2) 상한: 축소 후에도 연 로그드리프트를 ±MAX_ANNUAL_LOG_DRIFT로 자른다.
 *
 * ── 구간 폭 ────────────────────────────────────────────────
 * 변동성은 sigma*sqrt(t)로 늘린다. 평균회귀로 장기 구간을 좁힐 수 있는지 허스트 지수를
 * 실측했으나(비중첩 분산비 회귀) BTC 0.497 · ETH 0.497 · SOL 0.536 · DOGE 0.540 ·
 * PEPE 0.559 로 전부 0.5 근처이거나 그 이상이었다. 좁힐 경험적 근거가 없으므로 정직한
 * 방법인 "신뢰수준"만 조정한다 — 기본은 50% 구간(결과의 절반이 이 안에 들어온다).
 */

export interface Horizon {
  key: string;
  label: string;
  short: string;
  days: number;
}

export const HORIZONS: Horizon[] = [
  { key: '5d', label: '5 Days', short: '5D', days: 5 },
  { key: '1w', label: '1 Week', short: '1W', days: 7 },
  { key: '1m', label: '1 Month', short: '1M', days: 30 },
  { key: '3m', label: '3 Months', short: '3M', days: 90 },
  { key: '6m', label: '6 Months', short: '6M', days: 180 },
  { key: '1y', label: '1 Year', short: '1Y', days: 365 },
  { key: '3y', label: '3 Years', short: '3Y', days: 1095 },
];

const Z50 = 0.6744897501960817; // 50% 구간 (P25~P75)
const Z80 = 1.2815515655446004; // 80% 구간 (P10~P90)

const MAX_ANNUAL_LOG_DRIFT = 1.0;
/** drift를 신뢰하기 시작하는 t통계량 임계값. 통상적인 2보다 엄격한 3. */
export const T_CRIT = 3;
/** 최소 표본 수(일). 이보다 적으면 sigma조차 못 믿는다. */
export const MIN_SAMPLES = 20;
/** 이 수보다 표본이 적으면 "제한된 이력"으로 표시한다 */
export const RELIABLE_SAMPLES = 60;
/** 일별 경로를 며칠치 만들지 (상세 페이지 차트·표) */
export const DAILY_PATH_DAYS = 30;

/** 표준정규 누적분포 — Abramowitz & Stegun 7.1.26 기반 erf 근사 (|오차| < 1.5e-7) */
export function normalCdf(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp(-x * x / 2);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x >= 0 ? 1 - p : p;
}

export interface Projection {
  key: string;
  label: string;
  short: string;
  days: number;
  /** 로그정규 분포의 중앙값. drift가 0이면 현재가와 같다. */
  median: number;
  /** 50% 구간 (P25 ~ P75) — 기본 표시 */
  low: number;
  high: number;
  /** 80% 구간 (P10 ~ P90) */
  low80: number;
  high80: number;
  changePct: number;
  /** 50% 구간의 반폭(%) — "이 지평에서 흔한 변동 크기" */
  swingPct: number;
  /** 현재가 대비 +10% 이상 오를 확률(%) */
  pUp10: number;
  /** 현재가 대비 -10% 이상 내릴 확률(%) */
  pDown10: number;
}

export interface DailyPoint {
  day: number;
  median: number;
  low: number;
  high: number;
  changePct: number;
}

export interface ForecastModel {
  spot: number;
  muRaw: number;
  mu: number;
  sigma: number;
  shrink: number;
  tStat: number;
  samples: number;
  /** 표본이 RELIABLE_SAMPLES 미만 — 신규 상장이라 추정이 거칠다 */
  limitedHistory: boolean;
  annualVolPct: number;
  projections: Projection[];
  daily: DailyPoint[];
}

const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

/**
 * 종가 시계열로 GBM 파라미터를 추정하고 projection을 만든다.
 * 표본이 부족하거나(상장 직후) 변동성이 0이면 null.
 */
export function buildForecast(closes: number[], spot: number): ForecastModel | null {
  if (closes.length < MIN_SAMPLES + 1 || !(spot > 0)) return null;

  const rets: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    if (closes[i] > 0 && closes[i - 1] > 0) rets.push(Math.log(closes[i] / closes[i - 1]));
  }
  const n = rets.length;
  if (n < MIN_SAMPLES) return null;

  const muRaw = rets.reduce((s, r) => s + r, 0) / n;
  const variance = rets.reduce((s, r) => s + (r - muRaw) ** 2, 0) / (n - 1);
  const sigma = Math.sqrt(variance);
  if (!isFinite(sigma) || sigma <= 0) return null;

  const tStat = muRaw / (sigma / Math.sqrt(n));
  const shrink = Math.max(0, 1 - (T_CRIT * T_CRIT) / (tStat * tStat));
  const capDaily = MAX_ANNUAL_LOG_DRIFT / 365;
  const mu = clamp(muRaw * shrink, -capDaily, capDaily);

  const ln11 = Math.log(1.1), ln09 = Math.log(0.9);

  const projections: Projection[] = HORIZONS.map(hz => {
    const h = hz.days;
    const drift = mu * h;
    const sd = sigma * Math.sqrt(h);
    const median = spot * Math.exp(drift);
    const low = spot * Math.exp(drift - Z50 * sd);
    const high = spot * Math.exp(drift + Z50 * sd);
    return {
      key: hz.key,
      label: hz.label,
      short: hz.short,
      days: h,
      median,
      low,
      high,
      low80: spot * Math.exp(drift - Z80 * sd),
      high80: spot * Math.exp(drift + Z80 * sd),
      changePct: (Math.exp(drift) - 1) * 100,
      swingPct: (Math.exp(Z50 * sd) - 1) * 100,
      // P(S_h >= 1.1·S_0) = 1 - Phi((ln1.1 - drift)/sd)
      pUp10: (1 - normalCdf((ln11 - drift) / sd)) * 100,
      pDown10: normalCdf((ln09 - drift) / sd) * 100,
    };
  });

  const daily: DailyPoint[] = [];
  for (let d = 1; d <= DAILY_PATH_DAYS; d++) {
    const drift = mu * d;
    const sd = sigma * Math.sqrt(d);
    daily.push({
      day: d,
      median: spot * Math.exp(drift),
      low: spot * Math.exp(drift - Z50 * sd),
      high: spot * Math.exp(drift + Z50 * sd),
      changePct: (Math.exp(drift) - 1) * 100,
    });
  }

  return {
    spot, muRaw, mu, sigma, shrink, tStat, samples: n,
    limitedHistory: n < RELIABLE_SAMPLES,
    annualVolPct: sigma * Math.sqrt(365) * 100,
    projections, daily,
  };
}

/**
 * 목표가(target)에 h일 안에 "종가 기준으로" 도달할 확률(%).
 * 상승 목표면 P(S_h >= target), 하락 목표면 P(S_h <= target).
 */
export function probReach(m: ForecastModel, target: number, days: number): number {
  if (!(target > 0) || !(m.spot > 0)) return NaN;
  const drift = m.mu * days;
  const sd = m.sigma * Math.sqrt(days);
  const z = (Math.log(target / m.spot) - drift) / sd;
  return target >= m.spot ? (1 - normalCdf(z)) * 100 : normalCdf(z) * 100;
}

/**
 * TP를 SL보다 먼저 건드릴 확률(%) — 두 배리어 중 어디에 먼저 닿는지.
 * 로그가격이 drift 0인 브라운 운동이면 정확해가 있다: 반대쪽 배리어까지의
 * 로그거리 비율. drift가 0에 가깝게 축소되므로 이 근사가 타당하다.
 * (도달만 따지므로 종가가 아니라 장중 경로 기준이다.)
 */
export function probTpBeforeSl(spot: number, tp: number, sl: number): number {
  if (!(spot > 0 && tp > 0 && sl > 0)) return NaN;
  const lo = Math.min(tp, sl), hi = Math.max(tp, sl);
  if (!(spot > lo && spot < hi)) return NaN; // 이미 한쪽을 벗어남
  const pUpper = Math.log(spot / lo) / Math.log(hi / lo); // 위쪽 배리어를 먼저 칠 확률
  return (tp > sl ? pUpper : 1 - pUpper) * 100;
}

/** 최근 `window`일 중 상승 마감한 날의 수 */
export function greenDays(closes: number[], window = 30): { green: number; total: number } {
  const slice = closes.slice(-(window + 1));
  let green = 0;
  for (let i = 1; i < slice.length; i++) if (slice[i] > slice[i - 1]) green++;
  return { green, total: Math.max(0, slice.length - 1) };
}

export function volatilityLabel(annualVolPct: number): 'Low' | 'Medium' | 'High' | 'Extreme' {
  if (annualVolPct < 40) return 'Low';
  if (annualVolPct < 80) return 'Medium';
  if (annualVolPct < 140) return 'High';
  return 'Extreme';
}

export function trendConfidenceLabel(shrink: number): string {
  if (shrink >= 0.75) return 'Strong';
  if (shrink >= 0.4) return 'Moderate';
  if (shrink >= 0.15) return 'Weak';
  return 'Noise';
}
