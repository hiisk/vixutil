/**
 * 가격 예측 모델 — 일봉 종가로 기하 브라운 운동(GBM)을 적합해 미래 가격의 확률분포를
 * 만들고, 그 분포의 중앙값을 점 예측가(forecast)로 내놓는다.
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
 * 음수다. 모멘텀은 pooled와 coin-level에서 부호가 뒤집혀 견고하지 않다. 그래서 단기 방향을
 * 기술적 지표로 기울이지 않는다(예전 버전은 그렇게 했고, 그건 잡음을 예측으로 포장한 것이었다).
 *
 * 점 예측의 방향과 크기는 오직 아래 사후 drift에서 나온다. 하루하루 오르내리는 예측선을
 * 그리지 않는 이유도 같다 — 일간 방향을 맞힐 수 있다는 증거가 없으므로(적중률 49.8%),
 * 정직한 점 예측 경로는 단조로운 곡선이다.
 *
 * ── drift 추정: 베이지안 사후평균 ─────────────────────────────
 * 어떤 코인도 drift가 유의하지 않다. 전체 바이낸스 이력을 다 써도 그렇다:
 *   BTC 3248일 t=1.32 · ETH 0.67 · BNB 2.11 · XRP 0.07 · ADA -0.13 · SOL 1.13
 * 그래서 "유의하면 쓰고 아니면 버린다"는 하드 컷오프 대신, 0을 향해 당기는
 * 사후평균을 쓴다. 사전분포는 "코인의 진짜 연 로그드리프트는 대략 ±15% 안"이라는 것:
 *
 *   mu_posterior = mu_hat · tau^2 / (tau^2 + se^2),   se = sigma/sqrt(n), tau = 0.15/365
 *
 * 이러면 추정이 흐릴수록(se가 클수록) 0에 가까워지고, 결코 0이 되지는 않는다.
 * 사전분포 폭은 몬테카를로로 정했다. 진짜 drift가 0인 랜덤워크에서 나오는 "가짜" 3년 변동:
 *   사전 10% → 중앙값 3.0% · p95  8.6% · 최악  21%
 *   사전 15% → 중앙값 6.4% · p95 18.8% · 최악  49%   ← 채택
 *   사전 25% → 중앙값16.6% · p95 50.3% · 최악 186%
 *   사전 40% → 중앙값34.6% · p95137.4% · 최악1048%
 * (참고: 이전의 하드 컷오프 |t|>=3은 같은 조건에서 최악 276%였다. 즉 지금이 더 안전하면서
 *  동시에 예측값이 0으로 죽지 않는다.)
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

/** 사후평균에도 상한을 둔다. exp(±0.5) ≈ 1.65배 / 0.61배 per year */
const MAX_ANNUAL_LOG_DRIFT = 0.5;
/** 사전분포: 코인의 진짜 연 로그드리프트 표준편차. 몬테카를로로 보정(위 주석). */
export const PRIOR_ANNUAL_DRIFT_SD = 0.15;
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
  /** 점 예측가 — 사후 drift를 적용한 분포의 중앙값 */
  forecast: number;
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
  /** 점 예측가 */
  forecast: number;
  low: number;
  high: number;
  changePct: number;
}

export interface ForecastModel {
  spot: number;
  muRaw: number;
  mu: number;
  sigma: number;
  /** 사후평균에서 데이터에 실린 가중치 (0=전부 사전분포, 1=전부 데이터) */
  shrink: number;
  tStat: number;
  /** 사후 연 드리프트(%) — 점 예측의 방향과 크기 */
  annualDriftPct: number;
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

  const se = sigma / Math.sqrt(n);
  const tStat = muRaw / se;
  // 베이지안 사후평균: 데이터가 흐릴수록(se가 클수록) 사전분포(0)로 당겨진다
  const tau = PRIOR_ANNUAL_DRIFT_SD / 365;
  const shrink = (tau * tau) / (tau * tau + se * se); // 0~1, data에 실리는 가중치
  const capDaily = MAX_ANNUAL_LOG_DRIFT / 365;
  const mu = clamp(muRaw * shrink, -capDaily, capDaily);

  const ln11 = Math.log(1.1), ln09 = Math.log(0.9);

  const projections: Projection[] = HORIZONS.map(hz => {
    const h = hz.days;
    const drift = mu * h;
    const sd = sigma * Math.sqrt(h);
    const forecast = spot * Math.exp(drift);
    const low = spot * Math.exp(drift - Z50 * sd);
    const high = spot * Math.exp(drift + Z50 * sd);
    return {
      key: hz.key,
      label: hz.label,
      short: hz.short,
      days: h,
      forecast,
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
      forecast: spot * Math.exp(drift),
      low: spot * Math.exp(drift - Z50 * sd),
      high: spot * Math.exp(drift + Z50 * sd),
      changePct: (Math.exp(drift) - 1) * 100,
    });
  }

  return {
    spot, muRaw, mu, sigma, shrink, tStat, samples: n,
    limitedHistory: n < RELIABLE_SAMPLES,
    annualDriftPct: (Math.exp(mu * 365) - 1) * 100,
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
 * 로그거리 비율. 사후 drift는 사전분포에 강하게 당겨져 매우 작으므로 이 근사가 타당하다.
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

/** 사후평균에서 데이터가 차지한 비중을 사람 말로 */
export function trendConfidenceLabel(shrink: number): string {
  if (shrink >= 0.5) return 'Strong';
  if (shrink >= 0.2) return 'Moderate';
  if (shrink >= 0.08) return 'Weak';
  return 'Very weak';
}
