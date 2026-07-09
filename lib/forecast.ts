/**
 * 가격 projection 모델 — 일봉 종가의 로그수익률로 기하 브라운 운동(GBM)을 적합해
 * 각 기간의 중앙값과 불확실성 구간을 계산한다.
 *
 * 예측 로직은 지평에 따라 이원화된다.
 *
 *  ┌ 단기(5D~1M) : 기술적 합의(Trend·Bollinger·RSI·ATR)의 방향 점수로 중앙값을 기울인다.
 *  │                기술적 지표의 유효 지평은 수일~수주이므로 30일 이후로는 지수적으로 소멸시킨다.
 *  └ 장기(3M~3Y) : 기술적 신호는 사실상 0이 되고, 과거 추세(drift)만 남는데 그 drift조차
 *                  통계적으로 유의하지 않으면 통째로 버린다. 결과적으로 중앙값은 현재가 근처.
 *
 * 즉 장기 예측의 내용물은 "중앙값"이 아니라 "구간의 폭"이다.
 *
 * ── drift를 억제하는 두 단계 ──────────────────────────────────
 *  1) 축소(shrinkage): max(0, 1 - (T_CRIT/t)^2) (양의 부분 James-Stein).
 *     T_CRIT을 통상적인 2가 아니라 3으로 둔 근거: drift를 최대 1095일 복리로 늘리므로
 *     위양성 한 건의 대가가 크다. drift=0인 랜덤워크 4000회 몬테카를로 결과,
 *       t=2 → 4.6%가 위양성, 허위 3년 변동 최악 +1909%
 *       t=3 → 0.3%, 최악 276%
 *     반면 진짜 추세(|t|=9.4)는 t=3에서도 drift의 86%가 살아남는다.
 *  2) 상한(cap): 축소 후에도 연 로그드리프트를 ±MAX_ANNUAL_LOG_DRIFT로 자른다.
 *
 * ── 구간 폭에 관하여 ────────────────────────────────────────
 * 변동성은 sigma*sqrt(t)로 늘린다(랜덤워크). 평균회귀로 장기 구간을 좁힐 수 있는지
 * 허스트 지수를 실측했으나(비중첩 분산비 회귀) BTC 0.497 · ETH 0.497 · SOL 0.536 ·
 * DOGE 0.540 · PEPE 0.559 로 전부 0.5 근처이거나 그 이상이었다. 즉 좁힐 경험적 근거가
 * 없다. 그래서 폭을 줄이는 유일하게 정직한 방법인 "신뢰수준"을 택했다 — 기본 표시는
 * 50% 구간(사분위, 결과의 절반이 이 안에 들어온다)이고 80% 구간도 함께 제공한다.
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

/** 표준정규 분위수 */
const Z50 = 0.6744897501960817; // 50% 구간 (P25~P75)
const Z80 = 1.2815515655446004; // 80% 구간 (P10~P90)

/** 축소 후에도 연 로그드리프트를 이 값으로 자른다. exp(±1) ≈ 2.72배 / 0.37배 */
const MAX_ANNUAL_LOG_DRIFT = 1.0;
/** drift를 신뢰하기 시작하는 t통계량 임계값. 통상적인 2보다 엄격한 3. */
export const T_CRIT = 3;
/** drift·sigma 추정에 필요한 최소 표본 수(일) */
export const MIN_SAMPLES = 60;

/** 기술적 틸트: 합의 점수 1개당 sigma*sqrt(h)의 몇 배를 기울일지 */
const TILT_K = 0.5;
/** 기술적 신호가 완전히 유효하다고 보는 최대 지평(일). 그 뒤로는 감쇠. */
const TILT_FULL_DAYS = 30;
/** 감쇠 시정수(일) — 90일이면 틸트가 exp(-1)≈37%만 남는다 */
const TILT_DECAY_DAYS = 60;
/** 틸트 로그수익률 상한. exp(0.20)≈+22% / exp(-0.20)≈-18% */
const MAX_TILT_LOG = 0.2;
/** 일별 경로를 며칠치 만들지 (상세 페이지 차트·표) */
export const DAILY_PATH_DAYS = 30;

export interface Projection {
  key: string;
  label: string;
  short: string;
  days: number;
  /** 로그정규 분포의 중앙값 */
  median: number;
  /** 50% 구간 (P25 ~ P75) — 기본 표시 */
  low: number;
  high: number;
  /** 80% 구간 (P10 ~ P90) */
  low80: number;
  high80: number;
  /** 중앙값의 현재가 대비 변동률(%) */
  changePct: number;
}

export interface DailyPoint {
  /** 오늘로부터 며칠 뒤 (1 ~ DAILY_PATH_DAYS) */
  day: number;
  median: number;
  low: number;
  high: number;
  changePct: number;
}

export interface ForecastModel {
  spot: number;
  muRaw: number;
  /** 축소·상한 후 일간 로그드리프트 (장기 성분) */
  mu: number;
  sigma: number;
  shrink: number;
  tStat: number;
  samples: number;
  annualVolPct: number;
  /** 단기 방향을 기울인 기술적 합의 점수 (-1 ~ +1). 0이면 틸트 없음. */
  score: number;
  projections: Projection[];
  daily: DailyPoint[];
}

const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

/**
 * 기술적 합의가 지평 h일에 기여하는 로그수익률.
 * 30일까지는 sqrt(h)로 자라고, 그 뒤로는 지수 감쇠해 장기에서는 사라진다.
 */
function tiltLog(score: number, sigma: number, h: number): number {
  if (!score) return 0;
  const grow = Math.sqrt(Math.min(h, TILT_FULL_DAYS));
  const decay = Math.exp(-Math.max(0, h - TILT_FULL_DAYS) / TILT_DECAY_DAYS);
  return clamp(TILT_K * score * sigma * grow * decay, -MAX_TILT_LOG, MAX_TILT_LOG);
}

/**
 * 종가 시계열로 GBM 파라미터를 추정하고 projection을 만든다.
 * @param score 기술적 합의 점수(-1~+1). 없으면 0 — 순수 통계 모델이 된다.
 * 표본이 부족하거나(상장 직후) 변동성이 0이면 null.
 */
export function buildForecast(closes: number[], spot: number, score = 0): ForecastModel | null {
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
  const s = clamp(score, -1, 1);

  /** 지평 h일의 중앙 로그수익률 = 장기 drift + 단기 기술적 틸트 */
  const driftAt = (h: number) => mu * h + tiltLog(s, sigma, h);

  const projections: Projection[] = HORIZONS.map(hz => {
    const h = hz.days;
    const drift = driftAt(h);
    const sd = sigma * Math.sqrt(h);
    const median = spot * Math.exp(drift);
    return {
      key: hz.key,
      label: hz.label,
      short: hz.short,
      days: h,
      median,
      low: spot * Math.exp(drift - Z50 * sd),
      high: spot * Math.exp(drift + Z50 * sd),
      low80: spot * Math.exp(drift - Z80 * sd),
      high80: spot * Math.exp(drift + Z80 * sd),
      changePct: (Math.exp(drift) - 1) * 100,
    };
  });

  const daily: DailyPoint[] = [];
  for (let d = 1; d <= DAILY_PATH_DAYS; d++) {
    const drift = driftAt(d);
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
    annualVolPct: sigma * Math.sqrt(365) * 100,
    score: s,
    projections,
    daily,
  };
}

/** 최근 `window`일 중 상승 마감한 날의 수 — CoinCodex의 "Green days" */
export function greenDays(closes: number[], window = 30): { green: number; total: number } {
  const slice = closes.slice(-(window + 1));
  let green = 0;
  for (let i = 1; i < slice.length; i++) if (slice[i] > slice[i - 1]) green++;
  return { green, total: Math.max(0, slice.length - 1) };
}

/** 변동성 등급 — 연환산 변동성 기준 */
export function volatilityLabel(annualVolPct: number): 'Low' | 'Medium' | 'High' | 'Extreme' {
  if (annualVolPct < 40) return 'Low';
  if (annualVolPct < 80) return 'Medium';
  if (annualVolPct < 140) return 'High';
  return 'Extreme';
}

/**
 * drift 신뢰도 라벨. 축소 계수가 0이면 "추세가 잡음과 구별되지 않아 현재가 근처로
 * 수렴시켰다"는 뜻이므로 그대로 노출해야 정직하다.
 */
export function trendConfidenceLabel(shrink: number): string {
  if (shrink >= 0.75) return 'Strong';
  if (shrink >= 0.4) return 'Moderate';
  if (shrink >= 0.15) return 'Weak';
  return 'Noise';
}
