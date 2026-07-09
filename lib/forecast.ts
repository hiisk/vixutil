/**
 * 가격 projection 모델 — 일봉 종가의 로그수익률로 표준적인 기하 브라운 운동(GBM)을
 * 적합해 각 기간의 중앙값과 불확실성 구간을 계산한다.
 *
 * 중요: 이것은 "예언"이 아니라 과거 추세(drift)와 변동성(sigma)을 그대로 연장했을 때의
 * 확률 분포다. 기간이 길수록 구간이 sqrt(t)로 벌어지며, 그 사실 자체가 결과의 핵심이다.
 *
 * 순진하게 최근 상승률을 3년 연장하면 말도 안 되는 숫자가 나오므로 두 단계로 억제한다.
 *  1) 축소(shrinkage): drift의 t통계량으로 신뢰도를 재서 max(0, 1 - (T_CRIT/t)^2)만큼만
 *     남긴다(양의 부분 James-Stein). 임계값을 못 넘으면 drift를 통째로 버려서
 *     "현재가 근처 + 넓은 구간"이 된다.
 *
 *     T_CRIT을 통상적인 2가 아니라 3으로 둔 근거: drift를 최대 1095일 복리로 늘리기 때문에
 *     위양성 한 건의 대가가 매우 크다. 진짜 drift가 0인 랜덤워크 4000회 몬테카를로 결과,
 *       t=2 → 4.6%가 위양성(86개 중 3.9개), 허위 3년 변동 중앙값 87%, 최악 1909%
 *       t=3 → 0.3%(86개 중 0.2개), 최악 276%
 *     반면 진짜 추세(|t|=9.4)는 t=3에서도 drift의 86%가 살아남는다.
 *  2) 상한(cap): 축소 후에도 연 로그드리프트를 ±MAX_ANNUAL_LOG_DRIFT로 자른다.
 */

export interface Horizon {
  key: string;
  label: string;
  short: string;
  days: number;
}

export const HORIZONS: Horizon[] = [
  { key: '1d', label: '1 Day', short: '1D', days: 1 },
  { key: '1w', label: '1 Week', short: '1W', days: 7 },
  { key: '1m', label: '1 Month', short: '1M', days: 30 },
  { key: '3m', label: '3 Months', short: '3M', days: 90 },
  { key: '6m', label: '6 Months', short: '6M', days: 180 },
  { key: '1y', label: '1 Year', short: '1Y', days: 365 },
  { key: '3y', label: '3 Years', short: '3Y', days: 1095 },
];

/** 80% 신뢰구간의 표준정규 분위수 (P10 ~ P90) */
const Z_80 = 1.2815515655446004;
/** 축소 후에도 연 로그드리프트를 이 값으로 자른다. exp(±1) ≈ 2.72배 / 0.37배 */
const MAX_ANNUAL_LOG_DRIFT = 1.0;
/**
 * drift를 신뢰하기 시작하는 t통계량 임계값. 이하는 전부 잡음으로 버린다.
 * 통상적인 유의수준(2)보다 엄격한 3을 쓴다 — 위 주석의 몬테카를로 근거 참고.
 */
export const T_CRIT = 3;
/** drift·sigma 추정에 필요한 최소 표본 수(일) */
export const MIN_SAMPLES = 60;

export interface Projection {
  key: string;
  label: string;
  short: string;
  days: number;
  /** 로그정규 분포의 중앙값 = spot·exp(mu·t) */
  median: number;
  /** 80% 구간 하단(P10) */
  low: number;
  /** 80% 구간 상단(P90) */
  high: number;
  /** 중앙값의 현재가 대비 변동률(%) */
  changePct: number;
}

export interface ForecastModel {
  spot: number;
  /** 원본 일간 로그드리프트 */
  muRaw: number;
  /** 축소·상한 적용 후 일간 로그드리프트 */
  mu: number;
  /** 일간 로그수익률 표준편차 */
  sigma: number;
  /** 0~1. drift를 얼마나 신뢰했는지 (1=완전 신뢰, 0=잡음으로 보고 버림) */
  shrink: number;
  /** drift의 t통계량 */
  tStat: number;
  samples: number;
  /** 연환산 변동성(%) */
  annualVolPct: number;
  projections: Projection[];
}

const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

/**
 * 종가 시계열로 GBM 파라미터를 추정하고 각 기간의 projection을 만든다.
 * 표본이 부족하거나(상장 직후) 변동성이 0이면 null.
 */
export function buildForecast(closes: number[], spot: number, horizons: Horizon[] = HORIZONS): ForecastModel | null {
  if (closes.length < MIN_SAMPLES + 1 || spot <= 0) return null;

  const rets: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    if (closes[i] > 0 && closes[i - 1] > 0) rets.push(Math.log(closes[i] / closes[i - 1]));
  }
  const n = rets.length;
  if (n < MIN_SAMPLES) return null;

  const muRaw = rets.reduce((s, r) => s + r, 0) / n;
  // 표본분산(n-1). 변동성이 0이면 스테이블코인류라 projection이 무의미하다.
  const variance = rets.reduce((s, r) => s + (r - muRaw) ** 2, 0) / (n - 1);
  const sigma = Math.sqrt(variance);
  if (!isFinite(sigma) || sigma <= 0) return null;

  // drift가 잡음과 구별되는 정도. 표준오차 = sigma/sqrt(n)
  const tStat = muRaw / (sigma / Math.sqrt(n));
  // 양의 부분 James-Stein(임계값 T_CRIT): |t| <= T_CRIT이면 drift를 0으로 버린다
  const shrink = Math.max(0, 1 - (T_CRIT * T_CRIT) / (tStat * tStat));
  const capDaily = MAX_ANNUAL_LOG_DRIFT / 365;
  const mu = clamp(muRaw * shrink, -capDaily, capDaily);

  const projections = horizons.map(h => {
    const t = h.days;
    const drift = mu * t;
    const spread = Z_80 * sigma * Math.sqrt(t);
    const median = spot * Math.exp(drift);
    return {
      key: h.key,
      label: h.label,
      short: h.short,
      days: t,
      median,
      low: spot * Math.exp(drift - spread),
      high: spot * Math.exp(drift + spread),
      changePct: (Math.exp(drift) - 1) * 100,
    };
  });

  return {
    spot,
    muRaw,
    mu,
    sigma,
    shrink,
    tStat,
    samples: n,
    annualVolPct: sigma * Math.sqrt(365) * 100,
    projections,
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
 * drift 신뢰도를 사람이 읽을 수 있는 라벨로. 축소 계수가 낮다는 건 "추세가 잡음과
 * 구별되지 않아 현재가 근처로 수렴시켰다"는 뜻이므로 그대로 노출해야 정직하다.
 */
export function trendConfidenceLabel(shrink: number): string {
  if (shrink >= 0.75) return 'Strong';
  if (shrink >= 0.4) return 'Moderate';
  if (shrink >= 0.15) return 'Weak';
  return 'Noise';
}
