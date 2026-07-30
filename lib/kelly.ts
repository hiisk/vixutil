/**
 * 켈리 기준 — 장기 성장률을 최대화하는 베팅 비율.
 *
 *      f* = (p·b − q) / b        p 승률, q = 1−p, b 손익비
 *
 * 이 값은 "최적"이지만 실무에서 그대로 쓰면 거의 언제나 과하다. 이유가 셋이다.
 *
 * (1) 켈리는 p와 b를 **정확히 안다**고 가정한다. 실제로는 추정값이고, 승률을 조금만
 *     과대평가해도 f*가 크게 부풀려진다. 그리고 f*를 넘기면 성장률이 급격히 무너진다.
 * (2) 최적 성장률을 노리는 대가로 낙폭이 매우 크다. 전체 켈리의 기대 최대낙폭은
 *     대략 50% 수준이고, 이를 견디는 사람은 드물다.
 * (3) 거래는 서로 독립이 아니다. 손실이 몰리면 실제 위험은 공식보다 커진다.
 *
 * 그래서 실무에서는 분할 켈리(보통 1/4 ~ 1/2)를 쓴다. 이 모듈은 전체 켈리와 함께
 * 분할 켈리의 성장률·낙폭을 같이 계산해 "왜 줄여야 하는지"를 숫자로 보여준다.
 */

export interface KellyResult {
  /** 전체 켈리 비율(%) — 음수면 우위가 없다는 뜻이다 */
  fullKellyPct: number;
  /** 우위가 있는가 */
  hasEdge: boolean;
  /** 거래당 기대값 (R 단위) */
  expectancyR: number;
  /** 본전 승률(%) */
  breakevenWinRatePct: number;
  /** 전체 켈리에서의 기대 로그성장률 (거래당) */
  fullGrowth: number;
}

/** 켈리 비율. 우위가 없으면 0 이하가 나오며 그대로 돌려준다. */
export function kellyFraction(winRate: number, rMultiple: number): number | null {
  if (!isFinite(winRate) || winRate <= 0 || winRate >= 1) return null;
  if (!isFinite(rMultiple) || rMultiple <= 0) return null;
  const q = 1 - winRate;
  return (winRate * rMultiple - q) / rMultiple;
}

/**
 * 비율 f로 베팅할 때 거래당 기대 로그성장률.
 *   g(f) = p·ln(1 + f·b) + q·ln(1 − f)
 * f ≥ 1 이면 한 번의 손실로 전액을 잃으므로 −∞다.
 */
export function logGrowth(winRate: number, rMultiple: number, f: number): number | null {
  if (!isFinite(winRate) || winRate <= 0 || winRate >= 1) return null;
  if (!isFinite(rMultiple) || rMultiple <= 0) return null;
  if (!isFinite(f) || f < 0) return null;
  if (f >= 1) return -Infinity;
  const q = 1 - winRate;
  return winRate * Math.log(1 + f * rMultiple) + q * Math.log(1 - f);
}

/** 본전 승률(%) — p·b = 1−p 에서 p = 1/(b+1) */
export function breakevenWinRate(rMultiple: number): number | null {
  if (!isFinite(rMultiple) || rMultiple <= 0) return null;
  return (1 / (rMultiple + 1)) * 100;
}

export function computeKelly(winRatePct: number, rMultiple: number): KellyResult | null {
  if (!isFinite(winRatePct) || winRatePct <= 0 || winRatePct >= 100) return null;
  const p = winRatePct / 100;
  const f = kellyFraction(p, rMultiple);
  const be = breakevenWinRate(rMultiple);
  if (f == null || be == null) return null;

  const g = f > 0 ? logGrowth(p, rMultiple, f) : 0;
  return {
    fullKellyPct: f * 100,
    hasEdge: f > 0,
    expectancyR: p * rMultiple - (1 - p),
    breakevenWinRatePct: be,
    fullGrowth: g ?? 0,
  };
}

/**
 * 켈리를 초과했을 때 성장률이 0이 되는 비율.
 *   g(f) = 0 인 f > 0 을 찾는다. 그 지점을 넘으면 장기적으로 자본이 줄어든다.
 * 전체 켈리의 대략 2배 근처에 있다 — "조금 더 걸면 조금 더 번다"가 아니라는 뜻이다.
 */
export function zeroGrowthFraction(winRate: number, rMultiple: number): number | null {
  const f0 = kellyFraction(winRate, rMultiple);
  if (f0 == null || f0 <= 0) return null;

  let lo = f0;
  let hi = Math.min(0.999999, 1 - 1e-9);
  const g = (f: number) => logGrowth(winRate, rMultiple, f) ?? -Infinity;
  if (g(hi) > 0) return null; // 1 직전까지도 양수면 해가 없다(현실에서는 일어나지 않는다)

  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (g(mid) > 0) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

/**
 * ── 아래 두 함수는 연속(확산) 근사다 ─────────────────────────
 *
 * 로그자산을 브라운운동으로 보면 켈리의 c배를 걸 때
 *   드리프트 m = (μ²/σ²)(c − c²/2),  분산 v = c²μ²/σ²
 * 가 되고, 여기서 두 가지가 **우위와 무관하게** 따라 나온다.
 *
 *   성장률 유지 비율 = m(c)/m(1) = c(2 − c)
 *   자산이 언젠가 α배까지 떨어질 확률 = exp(−2·ln(1/α)·m/v) = α^(2/c − 1)
 *
 * 두 식 모두 p와 b가 사라진다. 즉 "언젠가 반토막 날 확률"은 내 우위가 얼마나
 * 좋은지가 아니라 **켈리의 몇 배를 거는지**만으로 정해진다. 이 페이지에서 가장
 * 말할 값어치가 있는 사실이다.
 *
 * 이산 베팅에서는 정확하지 않고(한 판이 유한한 크기라 근사), 실제로는 이보다
 * 나쁘다 — 승률 추정 오차와 손실의 군집을 이 모델은 담지 않는다.
 */

/** 켈리의 c배를 걸 때 전체 켈리 성장률의 몇 %를 남기는가 — c(2−c) */
export function growthRetainedPct(c: number): number | null {
  if (!isFinite(c) || c <= 0) return null;
  return Math.max(0, c * (2 - c)) * 100;
}

/**
 * 켈리의 c배를 걸 때 자산이 **언젠가** 최고점의 alphaPct%까지 떨어질 확률(%).
 * α^(2/c − 1). c=1이면 정확히 α — 전체 켈리는 반토막을 50% 확률로 겪는다.
 */
export function drawdownProbabilityPct(c: number, alphaPct: number): number | null {
  if (!isFinite(c) || c <= 0) return null;
  if (!isFinite(alphaPct) || alphaPct <= 0 || alphaPct >= 100) return null;
  const exp = 2 / c - 1;
  if (exp <= 0) return 100; // 켈리의 2배 이상 → 어떤 수준이든 언젠가 닿는다
  return Math.pow(alphaPct / 100, exp) * 100;
}

/** 자주 쓰는 분할 켈리 배수 */
export const KELLY_FRACTIONS: [string, number][] = [
  ['Quarter', 0.25],
  ['Half', 0.5],
  ['Three quarters', 0.75],
  ['Full', 1],
  ['Double', 2],
];
