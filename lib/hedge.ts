/**
 * "디지털 금" 주장을 검정하기 위한 도구들.
 *
 * 이 주장은 사실 두 개다. 따로 재야 한다.
 *
 *   (1) 가치 저장 — 금처럼 안정적인가? → 변동성과 최대낙폭으로 답한다.
 *   (2) 헤지     — 금과 따로 놀거나, 위기에 오르는가? → 상관계수로는 부족하다.
 *
 * (2)에서 상관계수 하나만 내면 오해를 부른다. 전 구간 상관이 0.1처럼 작게 나오면
 * "무상관 = 헤지"로 읽히는데, 정작 중요한 건 **내가 깨질 때 상대가 무엇을 했는가**다.
 * 그래서 이 모듈은 세 가지를 더 낸다.
 *
 *   · 신뢰구간 — 0.14가 "0과 다르다"고 말할 수 있는지. 표본이 크면 작은 값도 유의하다.
 *   · 스트레스 반응 — 기준 자산 최악의 날들에 상대 자산의 평균 수익률과 상승 횟수.
 *   · 롤링 상관 — 관계가 안정적인지. 구간마다 −0.4에서 +0.6을 오간다면 그 관계에
 *     기대어 자산배분을 짤 수 없다. 그 불안정성 자체가 결론이다.
 */

/**
 * 피셔 z 변환으로 상관계수의 신뢰구간을 낸다.
 *
 * 상관계수는 −1..1로 잘려 있어 분포가 치우친다. z = atanh(r)로 펴서 정규근사로
 * 구간을 잡고 다시 tanh로 되돌린다. 표준오차는 1/√(n−3).
 */
export function correlationCI(r: number, n: number, zScore = 1.96): { lo: number; hi: number } | null {
  if (!isFinite(r) || Math.abs(r) >= 1) return null;
  if (!isFinite(n) || n < 5) return null;
  const se = 1 / Math.sqrt(n - 3);
  const z = Math.atanh(r);
  return { lo: Math.tanh(z - zScore * se), hi: Math.tanh(z + zScore * se) };
}

/** 신뢰구간이 0을 포함하지 않으면 "0과 다르다"고 말할 수 있다 */
export function excludesZero(ci: { lo: number; hi: number } | null): boolean {
  return ci != null && (ci.lo > 0 || ci.hi < 0);
}

export interface RollingSummary {
  /** 각 창의 상관계수 */
  values: number[];
  min: number;
  median: number;
  max: number;
  /** 가장 최근 창 */
  latest: number;
  /** 양수인 창의 비율(%) */
  positivePct: number;
}

/**
 * 슬라이딩 창 상관계수.
 *
 * lib/correlation.ts의 rollingRange는 구간을 몇 조각으로 **나눠** 재지만, 여기서는
 * 하루씩 밀며 잰다. 관계가 얼마나 흔들리는지 보려면 조각 4개로는 부족하다.
 */
export function rollingCorrelation(a: number[], b: number[], window = 90): RollingSummary | null {
  const n = Math.min(a.length, b.length);
  if (!isFinite(window) || window < 10 || n < window + 10) return null;
  const x = a.slice(a.length - n);
  const y = b.slice(b.length - n);

  const values: number[] = [];
  for (let end = window; end <= n; end++) {
    const c = pearsonRaw(x.slice(end - window, end), y.slice(end - window, end));
    if (c != null) values.push(c);
  }
  if (values.length < 2) return null;

  const sorted = [...values].sort((p, q) => p - q);
  const k = Math.floor(sorted.length / 2);
  return {
    values,
    min: sorted[0],
    median: sorted.length % 2 ? sorted[k] : (sorted[k - 1] + sorted[k]) / 2,
    max: sorted[sorted.length - 1],
    latest: values[values.length - 1],
    positivePct: (values.filter(v => v > 0).length / values.length) * 100,
  };
}

/**
 * 최소 검사만 하는 상관계수 — 슬라이딩 창 안에서 수천 번 불린다.
 * 상수 계열(분산 0)은 null. 부동소수점 잔차를 걸러내려 평균 크기에 비례한 허용치를 쓴다.
 */
function pearsonRaw(x: number[], y: number[]): number | null {
  const n = x.length;
  if (n < 3) return null;
  let sx = 0, sy = 0;
  for (let i = 0; i < n; i++) {
    if (!isFinite(x[i]) || !isFinite(y[i])) return null;
    sx += x[i]; sy += y[i];
  }
  const mx = sx / n, my = sy / n;
  let cov = 0, vx = 0, vy = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx, dy = y[i] - my;
    cov += dx * dy; vx += dx * dx; vy += dy * dy;
  }
  const tol = (m: number) => Math.max(Math.abs(m), 1) * 1e-12;
  if (!(Math.sqrt(vx / n) > tol(mx)) || !(Math.sqrt(vy / n) > tol(my))) return null;
  return cov / Math.sqrt(vx * vy);
}

export interface StressResponse {
  /** 대상이 된 날 수 */
  days: number;
  /** 그 날들 기준 자산의 평균 수익률(%) */
  benchMeanPct: number;
  /** 그 날들 상대 자산의 평균 수익률(%) */
  assetMeanPct: number;
  /** 상대 자산이 오른 날 수 */
  assetUpDays: number;
  /** 오른 비율(%) */
  assetUpPct: number;
}

/**
 * 기준 자산이 가장 크게 빠진 worstN일에 상대 자산은 무엇을 했나.
 *
 * 헤지 주장을 직접 때리는 검정이다. 헤지라면 이 날들에 평균이 양수여야 하거나
 * 최소한 오른 날이 절반은 되어야 한다.
 *
 * **단순 수익률(%)을 받는다** — 로그수익률이 아니다. 평균을 그대로 "그날 평균 −0.8%"로
 * 읽히게 하려는 것이고, 상관계수 쪽과는 입력이 다르다는 점을 호출부가 알아야 한다.
 */
export function stressResponse(assetPct: number[], benchPct: number[], worstN: number): StressResponse | null {
  const n = Math.min(assetPct.length, benchPct.length);
  const k = Math.floor(worstN);
  if (n < 3 || k < 1 || k > n) return null;

  const idx: number[] = [];
  for (let i = 0; i < n; i++) {
    if (isFinite(assetPct[i]) && isFinite(benchPct[i])) idx.push(i);
  }
  if (idx.length < k) return null;

  const worst = idx.sort((p, q) => benchPct[p] - benchPct[q]).slice(0, k);
  const up = worst.filter(i => assetPct[i] > 0).length;
  return {
    days: k,
    benchMeanPct: worst.reduce((s, i) => s + benchPct[i], 0) / k,
    assetMeanPct: worst.reduce((s, i) => s + assetPct[i], 0) / k,
    assetUpDays: up,
    assetUpPct: (up / k) * 100,
  };
}

/**
 * 기준 자산이 thresholdPct% 넘게 빠진 **모든** 날의 반응.
 * 상위 N일과 달리 표본 수가 데이터에 따라 정해지므로, 몇 개였는지 함께 돌려준다.
 */
export function thresholdResponse(
  assetPct: number[],
  benchPct: number[],
  thresholdPct = 5,
): StressResponse | null {
  const n = Math.min(assetPct.length, benchPct.length);
  if (n < 3 || !(thresholdPct > 0)) return null;

  const hit: number[] = [];
  for (let i = 0; i < n; i++) {
    if (!isFinite(assetPct[i]) || !isFinite(benchPct[i])) continue;
    if (benchPct[i] <= -thresholdPct) hit.push(i);
  }
  if (!hit.length) return null;

  const up = hit.filter(i => assetPct[i] > 0).length;
  return {
    days: hit.length,
    benchMeanPct: hit.reduce((s, i) => s + benchPct[i], 0) / hit.length,
    assetMeanPct: hit.reduce((s, i) => s + assetPct[i], 0) / hit.length,
    assetUpDays: up,
    assetUpPct: (up / hit.length) * 100,
  };
}

/**
 * 헤지 판정을 한 문장으로.
 * 상관이 낮아도 스트레스 반응이 나쁘면 헤지가 아니다 — 그 구분이 이 함수의 존재 이유다.
 */
export function hedgeVerdict(stress: StressResponse | null): 'hedge' | 'neutral' | 'fails' | 'unknown' {
  if (!stress) return 'unknown';
  if (stress.assetMeanPct > 0 && stress.assetUpPct >= 50) return 'hedge';
  if (stress.assetMeanPct >= 0 || stress.assetUpPct >= 50) return 'neutral';
  return 'fails';
}
