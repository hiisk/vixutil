/**
 * 리스크 오브 루인 — 연속된 손실로 계좌가 특정 수준까지 줄어들 확률.
 *
 * ── 이 페이지가 다르게 하는 것 ────────────────────────────
 * 파산 확률 계산기는 승률과 손익비를 사용자가 입력하게 하고 끝난다. 그런데 정작 중요한
 * 것은 **거래당 리스크**다. 같은 우위(승률·손익비)를 갖고도 한 번에 1%를 걸면 파산이
 * 사실상 불가능하고 10%를 걸면 흔한 일이 된다. 그래서 이 모듈은 우위와 리스크를
 * 분리해 보여주고, 손익비가 요구하는 최소 승률(1/(R+1))을 옆에 놓는다.
 *
 * 계산은 몬테카를로가 아니라 닫힌 해다. 파산은 분포의 꼬리에서 결정되므로 표집으로는
 * 오차가 크고, 같은 입력에 같은 답이 나와야 한다.
 */

export interface RuinInput {
  /** 승률(%) */
  winRatePct: number;
  /** 손익비 — 1을 잃을 때 얼마를 버는가 */
  rMultiple: number;
  /** 한 거래에서 감수하는 계좌 비율(%) */
  riskPerTradePct: number;
  /** 이만큼 줄어들면 "파산"으로 본다(%) — 예: 50이면 반토막 */
  ruinThresholdPct: number;
}

export interface RuinResult {
  /** 파산 확률(%) */
  ruinPct: number;
  /** 거래당 기대값 (R 단위) */
  expectancyR: number;
  /** 손익비가 요구하는 본전 승률(%) */
  breakevenWinRatePct: number;
  /** 입력 승률이 본전 승률을 넘는가 */
  hasEdge: boolean;
  /** 파산까지 견딜 수 있는 연속 손실 횟수 */
  lossesToRuin: number;
  /** 그 연속 손실이 그냥 일어날 확률(%) */
  streakPct: number;
}

/**
 * 파산 확률 — 닫힌 해.
 *
 * 자본 k단위에서 파산 확률 P(k)는  P(k) = p·P(k+R) + q·P(k−1),  P(≤0)=1,  P(∞)=0.
 * 해는 기하급수 P(k) = z^k 이고, 대입하면 z는 다음의 (0,1) 근이다.
 *
 *      p·z^(R+1) − z + q = 0
 *
 * R=1이면 인수분해로 z = q/p 가 나오고, 고전 도박사 파산 공식과 정확히 같다.
 * z=1은 항상 근이므로(p+q=1), 기대값이 0 이하면 (0,1) 안에 근이 없고 파산이 확실하다.
 *
 * 처음에는 격자 위 반복 해법을 썼는데 손실 한 단위를 격자 한 칸으로 잘못 옮겨
 * 실제로는 0.25단위만 잃는 계산이 됐다(테스트가 이론 36.66% vs 계산 0%로 잡았다).
 * 닫힌 해는 그런 실수의 여지가 없고 더 빠르며 결정적이다.
 */
export function ruinProbability(
  winRate: number,
  rMultiple: number,
  unitsOfCapital: number,
): number | null {
  if (!isFinite(winRate) || winRate <= 0 || winRate >= 1) return null;
  if (!isFinite(rMultiple) || rMultiple <= 0) return null;
  if (!isFinite(unitsOfCapital) || unitsOfCapital < 1) return null;

  const q = 1 - winRate;
  // 기대값이 0 이하면 무한 시간에서 파산은 확실하다
  if (winRate * rMultiple - q <= 0) return 100;

  // f(z) = p·z^(R+1) − z + q.  f(0) = q > 0,  f(1) = 0.  그 사이에 근이 하나 있다.
  const f = (z: number) => winRate * Math.pow(z, rMultiple + 1) - z + q;

  let lo = 0;
  let hi = 1 - 1e-15;
  for (let i = 0; i < 300; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) > 0) lo = mid; else hi = mid;
  }
  const z = (lo + hi) / 2;
  if (!(z > 0) || !(z < 1)) return 100;

  return Math.min(100, Math.max(0, Math.pow(z, unitsOfCapital) * 100));
}

/** 손익비가 요구하는 본전 승률(%) — p·R = (1−p) 에서 p = 1/(R+1) */
export function breakevenWinRate(rMultiple: number): number | null {
  if (!isFinite(rMultiple) || rMultiple <= 0) return null;
  return (1 / (rMultiple + 1)) * 100;
}

/** 전체 계산 */
export function computeRuin(input: RuinInput): RuinResult | null {
  const { winRatePct, rMultiple, riskPerTradePct, ruinThresholdPct } = input;
  if (!isFinite(winRatePct) || winRatePct <= 0 || winRatePct >= 100) return null;
  if (!isFinite(rMultiple) || rMultiple <= 0) return null;
  if (!isFinite(riskPerTradePct) || riskPerTradePct <= 0 || riskPerTradePct > 100) return null;
  if (!isFinite(ruinThresholdPct) || ruinThresholdPct <= 0 || ruinThresholdPct >= 100) return null;

  const p = winRatePct / 100;
  // 파산까지 견딜 수 있는 손실 단위 수 = 감내 하락폭 / 거래당 리스크
  const units = ruinThresholdPct / riskPerTradePct;
  if (!(units >= 1)) return null;

  const ruin = ruinProbability(p, rMultiple, units);
  if (ruin == null) return null;

  const be = breakevenWinRate(rMultiple);
  if (be == null) return null;

  const lossesToRuin = Math.floor(units);
  return {
    ruinPct: ruin,
    expectancyR: p * rMultiple - (1 - p),
    breakevenWinRatePct: be,
    hasEdge: winRatePct > be,
    lossesToRuin,
    // 연속 손실이 그냥 나올 확률 — 우위가 있어도 이건 일어난다
    streakPct: Math.pow(1 - p, lossesToRuin) * 100,
  };
}
