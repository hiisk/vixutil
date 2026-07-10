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
 * 장기 기준선(SMA200) 평균회귀도 검정했다. 시장 성분을 제거한 고유(idiosyncratic) 수익률을
 * 타깃으로, 비중첩 구간·코인단위 t·반기 안정성까지 봤다. h=5/20/60/120 전부에서
 * pooled 계수는 양수(추세)인데 coin-level은 음수(회귀)로 **부호가 반대**였고 반기별로도
 * 무너졌다. 즉 "특이성에 따른 조정"으로 방향을 바꿀 근거도 없다.
 *
 * 예측선이 단조로운 이유가 여기 있다. 선이 휘려면 지평마다 부호가 다른 기대수익률이
 * 있어야 하는데, 어느 지평에서도 유의한 부호가 없다. 반면 **변동성**은 지평마다 확실히
 * 다르므로(아래) 일/주/월 뷰는 각자의 변동성 모델을 쓴다.
 *
 * 기술적 합의(Trend·Bollinger·RSI·ATR)는 예측력이 사실상 0이고 30일에서는 오히려 부호가
 * 음수다. 모멘텀은 pooled와 coin-level에서 부호가 뒤집혀 견고하지 않다. 그래서 단기 방향을
 * 기술적 지표로 기울이지 않는다(예전 버전은 그렇게 했고, 그건 잡음을 예측으로 포장한 것이었다).
 *
 * 점 예측의 방향과 크기는 오직 아래 사후 drift에서 나온다. 하루하루 오르내리는 예측선을
 * 그리지 않는 이유도 같다 — 일간 방향을 맞힐 수 있다는 증거가 없으므로(적중률 49.8%),
 * 정직한 점 예측 경로는 단조로운 곡선이다.
 *
 * ── drift 추정: 시장모형 + 베이지안 사후평균 ──────────────────
 * 코인의 drift를 그대로 연장하면 안 된다. 실측: 상위 63개 코인의 평균 베타가 1.00이고,
 * 최근 1년 시장(동일가중) drift가 -74%/yr였다. 그래서 각 코인 drift ≈ 1.0 × 시장 drift
 * 가 되어 63개 중 57개가 음수였다. 즉 "예측"이 시장 한 해 낙폭을 코인마다 복사한 것에
 * 불과했다. (BTC는 그 기간 116,010 -> 63,230, -45.5%.)
 *
 * 그래서 BTC를 시장 대용치로 두고 분해한다:
 *
 *   r_i = alpha_i + beta_i · r_market + e_i
 *   mu_i = beta_i · shrink(mu_market) + shrink(alpha_i)
 *
 * 두 성분에 서로 다른 사전분포를 쓴다.
 *  · 시장 drift는 **연장하지 않는다**(사전 ±5%/yr). 한 해 낙폭을 앞으로 투영할 근거가 없다.
 *    시장 drift의 t는 -1.80으로 유의하지 않고, 연장(모멘텀)도 반전도 안정적이지 않았다:
 *      120일 모멘텀 -> 향후 90일: pooled t=-0.68 인데 coin-level t=-3.97, 반기별 t=-0.28/-0.71
 *      120일 모멘텀 -> 향후 30일: pooled와 coin-level의 부호가 아예 반대
 *    즉 방향을 말해주는 신호가 없다.
 *  · alpha(코인 고유 drift)는 코인별 정보가 살 수 있는 유일한 자리이므로 사전 ±15%/yr.
 *
 * 결과: 부호가 섞이고(45 음수 / 11 양수), 폭이 완만하다(-6.6% ~ +7.6%/yr).
 *
 * 사전분포 폭은 몬테카를로로 보정했다. 진짜 drift가 0인 랜덤워크의 "가짜" 3년 변동:
 *   사전 10% → 중앙값 3.0% · 최악  21%
 *   사전 15% → 중앙값 6.4% · 최악  49%   ← alpha에 채택
 *   사전 25% → 중앙값16.6% · 최악 186%
 *   사전 40% → 중앙값34.6% · 최악1048%
 * (이전의 하드 컷오프 |t|>=3은 같은 조건에서 최악 276%였다.)
 *
 * ── 왜 drift를 더 크게 잡지 않는가 (out-of-sample 검정) ──────────
 * "BTC는 과거 연 +35%였으니 그걸 연장해야 한다"는 직관을 실제로 검정했다.
 * 24개 코인, 확장창(expanding window), 1년 앞 로그수익률 RMSE:
 *
 *   mu = 0 (아무 예측 안 함)          1.0723   <- 기준
 *   전체이력 drift, 사전 5%           1.0726   +0.0%
 *   전체이력 drift, 사전 25%          1.0820   +0.9%
 *   전체이력 drift, 축소 없음         1.4363  +33.9%
 *   최근365일 drift, 축소 없음        1.7505  +63.2%
 *
 * 모든 drift 추정기가 "가격이 안 변한다"보다 나빴고, 축소를 강하게 할수록 좋아졌다.
 * 전체 이력을 써도 나아지지 않는다 — 표준오차는 줄지만 drift 자체가 비정상(non-stationary)
 * 이라 과거 국면이 미래로 전이되지 않기 때문이다. 그래서 사전분포를 좁게 유지한다.
 *
 * 반감기 4년 주기(또는 2년 주기)로 drift를 넣자는 발상도 검정했다. 결론은 "기각"이 아니라
 * **검정 불가**다. 바이낸스 데이터 8.9년에는 반감기 사이클이 2~3개뿐이다. 반감기 후 0~1년
 * 구간이 연 +191.8%(t=2.55)로 보이지만 그 t값은 무의미하다 — 한 사이클 내부의 일간 수익률은
 * 사이클에 대한 독립 관측이 아니며, 실효 표본은 ~800이 아니라 ~2다. 비중첩 연간 수익률은
 * 8개뿐이고 lag-1 자기상관 -0.428(|t|=1.21)로 유의하지 않다. 주기를 확인하려면 수십 년이 필요하다.
 *
 * 사용자가 기대하는 큰 숫자(예: "BTC 3년 뒤 10만")는 예측값이 아니라 **확률**로 답한다.
 * 그리고 물어야 할 확률은 종점이 아니라 **경로 최고점**이다 — lib/barriers.ts 참조.
 *   P(3년 뒤 종가 >= $100k)        = 23.8%
 *   P(3년 안에 한 번이라도 $100k)  = 47.2%
 *
 * ── 기간별로 다른 변동성(구간 폭) ──────────────────────────────
 * 방향은 예측 불가능하지만 **변동성은 예측 가능하다** — 금융에서 실제로 예측되는 거의
 * 유일한 것이다. 실측(28개 코인, 전체 이력): 과거 20일 변동성 -> 향후 5일 변동성
 * 회귀의 기울기 0.645, R^2 0.236, t=63.9.
 *
 * 그래서 지평마다 다른 변동성을 쓴다. 현재 변동성(EWMA, 반감기 20일)과 장기 변동성을
 * 로그공간에서 섞되, 현재 변동성에 실리는 가중치 w(h)를 직접 측정했다:
 *
 *   h(일)    1      5     10     20     60    120    240
 *   w(h)  0.803  0.742  0.684  0.612  0.464  0.391  0.290
 *
 * (AR(1) phi=0.9675로 맞춰봤으나 양 끝에서 어긋난다 — h=1에서 모델 0.967 vs 실측 0.803,
 *  h=240에서 0.124 vs 0.290. 장기기억이 있어 단일 AR(1)로는 부족하다. 그래서 함수형을
 *  지어내지 않고 측정한 곡선을 log h 축에서 보간해 쓴다.)
 *
 * sigma_h = exp( w(h)·ln(sigma_now) + (1-w(h))·ln(sigma_long) )
 *
 * 결과: 지금 조용한 코인은 단기 구간이 좁고, 원래 험한 코인은 장기 구간이 넓어진다.
 * 순진한 sigma·sqrt(t)로는 나오지 않는 구조다.
 *
 * 폭 자체를 평균회귀로 더 좁힐 수 있는지도 봤다(허스트 지수, 비중첩 분산비 회귀):
 * BTC 0.497 · ETH 0.497 · SOL 0.536 · DOGE 0.540 · PEPE 0.559 — 전부 0.5 근처이거나
 * 그 이상이라 근거가 없다. 그래서 신뢰수준만 조정한다(기본 50% 구간).
 *
 * ── 지그재그하는 일별 예측선을 그리지 않는 이유 ─────────────────
 * 요일 효과를 의심해 검정했다. 코인 단위로는 목요일 t=-7.39처럼 강해 보이지만, 32개 코인은
 * 같은 목요일을 겪으므로 독립 표본이 아니다. 시장 시계열 하나로 다시 재면 |t|가 2를 넘는
 * 요일이 하나도 없다(최대 화요일 -1.79). 전반기로 학습해 후반기를 맞히면 적중률 54.8%가
 * 나오지만 요일별 평균의 전·후반 상관이 0.336으로 불안정하다. 즉 지그재그를 정당화할
 * 근거가 없다. 대신 차트에는 같은 모델에서 뽑은 **시뮬레이션 경로**를 그린다 — 그것은
 * 예측이 아니라 "이런 식으로 움직일 수 있다"는 표본이며, 그렇게 명시한다.
 */

export interface Horizon {
  key: string;
  label: string;
  short: string;
  days: number;
}

export const HORIZONS: Horizon[] = [
  { key: '3d', label: '3 Days', short: '3D', days: 3 },
  { key: '1w', label: '1 Week', short: '1W', days: 7 },
  { key: '1m', label: '1 Month', short: '1M', days: 30 },
  { key: '3m', label: '3 Months', short: '3M', days: 90 },
  { key: '6m', label: '6 Months', short: '6M', days: 180 },
  { key: '1y', label: '1 Year', short: '1Y', days: 365 },
  { key: '3y', label: '3 Years', short: '3Y', days: 1095 },
];

/**
 * 지평별 Student-t 자유도. 40개 코인 롤링 백테스트로 표준화 잔차의 |z| 분위수를 재고
 * 표준화 t분포를 적합했다(50·80 분위를 동시에 맞춤).
 *
 *   h     실측|z|@50  실측|z|@80   적합 v   t(v)@50  t(v)@80
 *   1      0.5174      1.0750      3.9    0.5183   1.0755
 *   5      0.5438      1.1546      5.0    0.5629   1.1432
 *   30     0.6178      1.2330      9.9    0.6254   1.2266
 *   180    0.6427      1.2518     15.7    0.6450   1.2497
 *   (정규분포는 0.6745 / 1.2816 = v -> 무한대 극한)
 *
 * 정규분포를 그대로 쓰면 단기 구간이 너무 넓다: 실측 커버리지가 "50% 구간"에서 60.7%(h=1),
 * "80% 구간"에서 84.5%였다. 자유도가 지평에 따라 커지는 건 중심극한정리 때문이다.
 * h=60에서 18.2가 나왔으나 앞뒤(30:9.9, 90:12.6)와 어긋나는 잡음이라 매듭에서 뺐다.
 * 측정 범위(1~180일) 밖으로는 외삽하지 않고 양 끝 값으로 고정한다.
 */
const T_DF_KNOTS: [number, number][] = [
  [1, 3.9], [2, 4.4], [3, 4.5], [5, 5.0], [10, 5.3], [20, 7.5], [30, 9.9], [90, 12.6], [180, 15.7],
];

/** 지평 h의 자유도 — log h 축 선형보간, 범위 밖은 양 끝 고정 */
export function dfAt(h: number): number {
  if (h <= T_DF_KNOTS[0][0]) return T_DF_KNOTS[0][1];
  const last = T_DF_KNOTS[T_DF_KNOTS.length - 1];
  if (h >= last[0]) return last[1];
  for (let i = 1; i < T_DF_KNOTS.length; i++) {
    const [h0, v0] = T_DF_KNOTS[i - 1], [h1, v1] = T_DF_KNOTS[i];
    if (h <= h1) {
      const f = (Math.log(h) - Math.log(h0)) / (Math.log(h1) - Math.log(h0));
      return v0 + f * (v1 - v0);
    }
  }
  return last[1];
}

// ── Student-t (분산 1로 표준화) ────────────────────────────────
function lgamma(x: number): number {
  const g = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
  let y = x, tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += g[j] / ++y;
  return -tmp + Math.log(2.5066282746310005 * ser / x);
}
function betacf(a: number, b: number, x: number): number {
  const MAXIT = 200, EPS = 3e-14, FPMIN = 1e-300;
  const qab = a + b, qap = a + 1, qam = a - 1;
  let c = 1, d = 1 - qab * x / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c; h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  return h;
}
function ibeta(a: number, b: number, x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b;
}
/** 표준화 t분포(분산 1)의 누적분포 */
export function tCdfStd(z: number, v: number): number {
  const t = z / Math.sqrt((v - 2) / v);
  const x = v / (v + t * t);
  const p = 0.5 * ibeta(v / 2, 0.5, x);
  return t > 0 ? 1 - p : p;
}
/** 표준화 t분포의 분위수 (CDF 이분법) */
export function tQuantStd(p: number, v: number): number {
  let lo = -60, hi = 60;
  for (let i = 0; i < 120; i++) {
    const mid = (lo + hi) / 2;
    if (tCdfStd(mid, v) < p) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/** 사후평균에도 상한을 둔다. exp(±0.5) ≈ 1.65배 / 0.61배 per year */
const MAX_ANNUAL_LOG_DRIFT = 0.5;
/**
 * 사전분포: 시장(BTC) 연 로그드리프트.
 *
 * 사이트 소유자의 선택으로 0.40을 쓴다. 이는 "코인의 장기 추세를 예측에 반영한다"는 입장이며,
 * 아래 측정된 비용을 감수하는 판단이다.
 *   · 1년 앞 예측 RMSE: 1.1005 (mu=0 기준 1.0723 대비 +2.6%). 즉 순수 예측력만 보면 손해다.
 *   · 진짜 drift가 0인 랜덤워크에서 나오는 허위 3년 변동: 중앙값 34.6%, 최악 1048%.
 * 두 번째 항목이 위험하므로 아래 MIN_DRIFT_HISTORY 게이팅과 상한(cap)으로 막는다.
 *
 * 또한 drift 추정은 창 길이에 매우 민감하다(BTC 기준 연 -45.6% / +36.7% / +10.9% / +35.3%
 * for 365 / 1000 / 2000 / 3248일). 이 불안정성이 RMSE가 나빠지는 이유다.
 */
export const PRIOR_MARKET_DRIFT_SD = 0.40;
/** 이력이 이보다 짧으면 공격적 사전분포를 신뢰할 수 없어 보수적으로 되돌린다 */
export const MIN_DRIFT_HISTORY = 730;
/** 짧은 이력 코인에 적용하는 보수적 시장 사전분포 */
export const PRIOR_MARKET_DRIFT_SD_SHORT = 0.15;
/** 사전분포: 코인 고유(alpha) 연 로그드리프트. 코인별 정보가 사는 자리라 조금 넓게. */
export const PRIOR_ALPHA_DRIFT_SD = 0.15;
/** 최소 표본 수(일). 이보다 적으면 sigma조차 못 믿는다. */
export const MIN_SAMPLES = 20;
/** 이 수보다 표본이 적으면 "제한된 이력"으로 표시한다 */
export const RELIABLE_SAMPLES = 60;
/** 일별 경로를 며칠치 만들지 (상세 페이지 차트·표) */
export const DAILY_PATH_DAYS = 30;
/** 현재 변동성 EWMA 반감기(일) */
const EWMA_HALFLIFE = 20;
/**
 * 지평 h일에서 "현재 변동성"에 실리는 가중치. 28개 코인 전체 이력으로 실측한 값.
 * 나머지 (1-w)는 장기 변동성에 실린다. log h 축에서 선형보간한다.
 */
const VOL_WEIGHTS: [number, number][] = [
  [1, 0.803], [5, 0.742], [10, 0.684], [20, 0.612], [60, 0.464], [120, 0.391], [240, 0.290],
];

/** 측정된 곡선을 log h 축에서 보간. 범위 밖은 양 끝 값으로 고정한다. */
export function currentVolWeight(h: number): number {
  if (h <= VOL_WEIGHTS[0][0]) return VOL_WEIGHTS[0][1];
  const last = VOL_WEIGHTS[VOL_WEIGHTS.length - 1];
  if (h >= last[0]) return last[1];
  for (let i = 1; i < VOL_WEIGHTS.length; i++) {
    const [h0, w0] = VOL_WEIGHTS[i - 1], [h1, w1] = VOL_WEIGHTS[i];
    if (h <= h1) {
      const f = (Math.log(h) - Math.log(h0)) / (Math.log(h1) - Math.log(h0));
      return w0 + f * (w1 - w0);
    }
  }
  return last[1];
}

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
  /** 오늘로부터 며칠 뒤 */
  day: number;
  /** 점 예측가 */
  forecast: number;
  low: number;
  high: number;
  changePct: number;
}

/** 예측 시계열을 만들 때 쓰는 간격 */
export type Timeframe = 'daily' | 'weekly' | 'monthly';
export const TIMEFRAMES: Record<Timeframe, { stepDays: number; count: number; label: string }> = {
  daily: { stepDays: 1, count: 30, label: 'Daily · next 30 days' },
  weekly: { stepDays: 7, count: 12, label: 'Weekly · next 12 weeks' },
  monthly: { stepDays: 30, count: 12, label: 'Monthly · next 12 months' },
};

export interface ForecastModel {
  spot: number;
  muRaw: number;
  mu: number;
  /** 장기(전체 표본) 일간 변동성 */
  sigma: number;
  /** 현재 일간 변동성 (EWMA, 반감기 20일) */
  sigmaNow: number;
  /** 지평 h일의 평균 일간 변동성 — 현재/장기를 로그공간에서 섞은 값 */
  sigmaAt: (h: number) => number;
  /** alpha 사후평균에서 데이터에 실린 가중치 (0=전부 사전분포, 1=전부 데이터) */
  shrink: number;
  tStat: number;
  /** 시장(BTC) 대비 민감도 */
  beta: number;
  /** 시장 성분이 기여하는 연 드리프트(%) = beta × 축소된 시장 drift */
  marketAnnualPct: number;
  /** 코인 고유(alpha) 성분이 기여하는 연 드리프트(%) */
  alphaAnnualPct: number;
  /** 시장 기준계열을 실제로 썼는지 */
  hasMarket: boolean;
  /** 이력이 짧아 보수적 사전분포로 되돌렸는지 */
  driftGated: boolean;
  /** 사후 연 드리프트(%) — 점 예측의 방향과 크기 (market + alpha) */
  annualDriftPct: number;
  samples: number;
  /** 표본이 RELIABLE_SAMPLES 미만 — 신규 상장이라 추정이 거칠다 */
  limitedHistory: boolean;
  annualVolPct: number;
  /** 현재 변동성의 연환산(%) */
  currentAnnualVolPct: number;
  projections: Projection[];
  daily: DailyPoint[];
}

const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));

/**
 * 종가 시계열로 GBM 파라미터를 추정하고 projection을 만든다.
 * 표본이 부족하거나(상장 직후) 변동성이 0이면 null.
 */
const logReturns = (closes: number[]): number[] => {
  const r: number[] = [];
  for (let i = 1; i < closes.length; i++) if (closes[i] > 0 && closes[i - 1] > 0) r.push(Math.log(closes[i] / closes[i - 1]));
  return r;
};
const avg = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
const sampleSd = (a: number[]) => {
  const m = avg(a);
  return Math.sqrt(a.reduce((x, y) => x + (y - m) ** 2, 0) / (a.length - 1));
};
/** 사후평균 가중치 tau^2/(tau^2 + se^2) */
const bayesWeight = (priorAnnualSd: number, se: number) => {
  const tau = priorAnnualSd / 365;
  return (tau * tau) / (tau * tau + se * se);
};

/**
 * @param marketCloses 시장 대용치(BTC) 일봉 종가. 주면 market-model로 분해한다.
 *   없으면 자기 drift를 시장 성분으로 보고 시장 사전분포로 강하게 축소한다.
 */
export function buildForecast(closes: number[], spot: number, marketCloses?: number[]): ForecastModel | null {
  if (closes.length < MIN_SAMPLES + 1 || !(spot > 0)) return null;

  const rets = logReturns(closes);
  const n = rets.length;
  if (n < MIN_SAMPLES) return null;

  const muRaw = avg(rets);
  const sigma = sampleSd(rets);
  if (!isFinite(sigma) || sigma <= 0) return null;

  // 현재 변동성: EWMA. 장기 분산으로 초기화해 표본 앞부분의 편향을 줄인다.
  const lam = Math.pow(0.5, 1 / EWMA_HALFLIFE);
  let v = sigma * sigma;
  for (const r of rets) v = lam * v + (1 - lam) * r * r;
  const sigmaNow = Math.sqrt(v) > 0 ? Math.sqrt(v) : sigma;

  /** 지평 h의 평균 일간 변동성 (측정된 가중치로 로그공간 혼합) */
  const sigmaAt = (h: number) => {
    const w = currentVolWeight(h);
    return Math.exp(w * Math.log(sigmaNow) + (1 - w) * Math.log(sigma));
  };

  const se = sigma / Math.sqrt(n);
  const tStat = muRaw / se;
  const capDaily = MAX_ANNUAL_LOG_DRIFT / 365;

  let beta = 1, muMarket = 0, alphaPost = 0, shrink = 0, hasMarket = false;
  const mret = marketCloses ? logReturns(marketCloses) : [];

  if (mret.length >= MIN_SAMPLES) {
    // 같은 길이로 맞춘다(신규 상장은 짧다)
    const k = Math.min(n, mret.length);
    const y = rets.slice(-k), x = mret.slice(-k);
    const mx = avg(x), my = avg(y);
    let sxy = 0, sxx = 0;
    for (let i = 0; i < k; i++) { sxy += (x[i] - mx) * (y[i] - my); sxx += (x[i] - mx) ** 2; }
    beta = sxx > 0 ? sxy / sxx : 1;
    const alpha = my - beta * mx;
    const resid = y.map((v, i) => v - alpha - beta * x[i]);

    const seM = sampleSd(x) / Math.sqrt(k);
    const seA = sampleSd(resid) / Math.sqrt(k);
    // 이력이 짧은 코인(신규 상장·잡코인)에 공격적 drift를 적용하면 잡음이 예측으로 증폭된다
    const marketPrior = k >= MIN_DRIFT_HISTORY ? PRIOR_MARKET_DRIFT_SD : PRIOR_MARKET_DRIFT_SD_SHORT;
    muMarket = clamp(mx * bayesWeight(marketPrior, seM), -capDaily, capDaily);
    shrink = bayesWeight(PRIOR_ALPHA_DRIFT_SD, seA);
    alphaPost = clamp(alpha * shrink, -capDaily, capDaily);
    hasMarket = true;
  } else {
    // 시장 기준계열이 없으면 자기 drift를 시장 성분으로 취급한다
    const marketPrior = n >= MIN_DRIFT_HISTORY ? PRIOR_MARKET_DRIFT_SD : PRIOR_MARKET_DRIFT_SD_SHORT;
    shrink = bayesWeight(marketPrior, se);
    muMarket = clamp(muRaw * shrink, -capDaily, capDaily);
  }

  const mu = clamp(beta * muMarket + alphaPost, -capDaily, capDaily);

  const ln11 = Math.log(1.1), ln09 = Math.log(0.9);

  const projections: Projection[] = HORIZONS.map(hz => {
    const h = hz.days;
    const drift = mu * h;
    const sd = sigmaAt(h) * Math.sqrt(h);
    const v = dfAt(h);
    const z50 = tQuantStd(0.75, v), z80 = tQuantStd(0.90, v);
    const forecast = spot * Math.exp(drift);
    const low = spot * Math.exp(drift - z50 * sd);
    const high = spot * Math.exp(drift + z50 * sd);
    return {
      key: hz.key,
      label: hz.label,
      short: hz.short,
      days: h,
      forecast,
      low,
      high,
      low80: spot * Math.exp(drift - z80 * sd),
      high80: spot * Math.exp(drift + z80 * sd),
      changePct: (Math.exp(drift) - 1) * 100,
      swingPct: (Math.exp(z50 * sd) - 1) * 100,
      // 팻테일을 반영해 t분포로 확률을 낸다
      pUp10: (1 - tCdfStd((ln11 - drift) / sd, v)) * 100,
      pDown10: tCdfStd((ln09 - drift) / sd, v) * 100,
    };
  });

  const daily: DailyPoint[] = [];
  for (let d = 1; d <= DAILY_PATH_DAYS; d++) {
    const drift = mu * d;
    const sd = sigmaAt(d) * Math.sqrt(d);
    const z50 = tQuantStd(0.75, dfAt(d));
    daily.push({
      day: d,
      forecast: spot * Math.exp(drift),
      low: spot * Math.exp(drift - z50 * sd),
      high: spot * Math.exp(drift + z50 * sd),
      changePct: (Math.exp(drift) - 1) * 100,
    });
  }

  return {
    spot, muRaw, mu, sigma, sigmaNow, sigmaAt, shrink, tStat, samples: n,
    beta, hasMarket,
    driftGated: n < MIN_DRIFT_HISTORY,
    marketAnnualPct: (Math.exp(beta * muMarket * 365) - 1) * 100,
    alphaAnnualPct: (Math.exp(alphaPost * 365) - 1) * 100,
    limitedHistory: n < RELIABLE_SAMPLES,
    annualDriftPct: (Math.exp(mu * 365) - 1) * 100,
    annualVolPct: sigma * Math.sqrt(365) * 100,
    currentAnnualVolPct: sigmaNow * Math.sqrt(365) * 100,
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
  const sd = m.sigmaAt(days) * Math.sqrt(days);
  const z = (Math.log(target / m.spot) - drift) / sd;
  const v = dfAt(days);
  return target >= m.spot ? (1 - tCdfStd(z, v)) * 100 : tCdfStd(z, v) * 100;
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

/**
 * 임의 간격의 예측 시계열. 각 지점의 변동성은 그 지평의 sigmaAt(h)를 쓰므로,
 * 일/주/월 뷰는 단순한 재표집이 아니라 지평마다 다른 변동성 모델을 반영한다.
 */
export function forecastSeries(m: ForecastModel, stepDays: number, count: number): DailyPoint[] {
  const out: DailyPoint[] = [];
  for (let i = 1; i <= count; i++) {
    const h = i * stepDays;
    const drift = m.mu * h;
    const sd = m.sigmaAt(h) * Math.sqrt(h);
    const z50 = tQuantStd(0.75, dfAt(h));
    out.push({
      day: h,
      forecast: m.spot * Math.exp(drift),
      low: m.spot * Math.exp(drift - z50 * sd),
      high: m.spot * Math.exp(drift + z50 * sd),
      changePct: (Math.exp(drift) - 1) * 100,
    });
  }
  return out;
}

/**
 * 시뮬레이션 경로 — 같은 모델에서 뽑은 표본이지, 예측이 아니다.
 * 일별 조건부 분산은 지평별 총분산의 차분 V(k)-V(k-1)에서 얻는다(변동성 기간구조와 일관).
 * 결정적 시드를 받아 리렌더마다 경로가 바뀌지 않게 한다.
 */
export function simulatePaths(m: ForecastModel, days: number, count: number, seed: number): number[][] {
  let s = seed >>> 0 || 1;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return (s >>> 8) / 16777216; };
  // 일별 충격은 정규분포가 아니라 t(df(1)) — 실측된 팻테일과 일치시킨다.
  // 역CDF 표집이 비싸므로 분위수 표를 한 번 만들어 선형보간한다.
  const v1 = dfAt(1), TABLE = 512;
  const quant: number[] = [];
  for (let i = 0; i <= TABLE; i++) quant.push(tQuantStd((i + 0.5) / (TABLE + 1), v1));
  const shock = () => {
    const u = rnd() * TABLE;
    const i = Math.min(TABLE - 1, Math.max(0, Math.floor(u)));
    return quant[i] + (u - i) * (quant[i + 1] - quant[i]);
  };

  // 일별 분산: V(k) = k · sigmaAt(k)^2
  const V = (k: number) => k * Math.pow(m.sigmaAt(k), 2);
  const dailyVar: number[] = [];
  for (let k = 1; k <= days; k++) dailyVar.push(Math.max(V(k) - V(k - 1), 1e-12));

  const out: number[][] = [];
  for (let p = 0; p < count; p++) {
    const path: number[] = [];
    let logS = Math.log(m.spot);
    for (let k = 0; k < days; k++) {
      logS += m.mu + Math.sqrt(dailyVar[k]) * shock();
      path.push(Math.exp(logS));
    }
    out.push(path);
  }
  return out;
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
