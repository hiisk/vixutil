/**
 * 신호 성적표 — 보드가 자기 신호를 스스로 채점한다.
 *
 * 신호 사이트는 어디나 신호를 보여준다. 그게 맞았는지 보여주는 곳은 거의 없다.
 * 이 모듈은 같은 일봉으로 **워크포워드** 검정을 돌려 실제 성적을 낸다.
 *
 * 각 날 t에서
 *   1) t까지의 캔들만으로 신호를 만든다 (미래를 보지 않는다)
 *   2) t+1부터 최대 maxHold일까지 걸어가며 TP/SL 중 어디에 먼저 닿는지 본다
 *   3) 방향 적중(다음날 종가가 신호 방향으로 갔는가)도 따로 센다
 *
 * ── 대조군이 있어야 의미가 있다 ──────────────────────────
 * 암호화폐는 우상향 표류가 있어서 **아무 날이나 롱**을 잡아도 적중률이 50%를 넘는다.
 * 그래서 "적중률 54%"는 그 자체로 아무 말도 하지 않는다. 같은 날, 같은 ATR 기반
 * TP/SL로 **언제나 롱**을 잡는 대조군을 나란히 재고 그 차이를 본다.
 * 차이가 0 근처면 신호가 기여한 게 없다는 뜻이다.
 *
 * ── 일봉으로는 알 수 없는 것 ─────────────────────────────
 * 하루 안에 TP와 SL을 **둘 다** 건드린 날은 어느 쪽이 먼저였는지 일봉으로 알 수 없다.
 * 그런 날은 SL로 센다(보수적). 대신 그런 날이 몇 %였는지 같이 돌려준다 —
 * 그 비율이 크면 이 성적표 자체를 믿을 수 없다는 신호다.
 */
import { computeStrategy, computeConsensus, type StrategyKey, type Bias } from './strategies.ts';
import { computeATR, computeTpSl, type Candle, type Direction } from './atr.ts';

/** strategies.ts와 같은 값을 써야 성적표가 화면의 TP/SL과 일치한다 */
const TP_MULT = 1.5;
const SL_MULT = 1.0;

/** 지표 계산에 필요한 최소 과거 봉 (SMA50 + 여유) */
export const LOOKBACK = 220;
/** TP/SL 중 하나에 닿을 때까지 기다리는 최대 일수 */
export const MAX_HOLD = 10;
/** 성적표를 내려면 최소 이만큼의 거래 표본이 필요하다 */
export const MIN_TRADES = 20;

export type Resolution = 'tp' | 'sl' | 'timeout' | 'ambiguous';

export interface Trade {
  /** 진입 캔들의 인덱스 */
  i: number;
  side: Direction;
  entry: number;
  tp: number;
  sl: number;
  resolution: Resolution;
  /** 결과를 R 단위로. TP=+TP_MULT/SL_MULT, SL=−1, 타임아웃은 종가 기준 */
  r: number;
  /** 며칠 만에 끝났나 */
  heldDays: number;
  /** 다음날 종가가 신호 방향으로 갔는가 */
  nextDayHit: boolean;
}

export interface Score {
  /** 거래 수 */
  trades: number;
  /** 다음날 방향 적중률(%) */
  nextDayHitPct: number;
  /** TP에 먼저 닿은 비율(%) — 타임아웃 포함 전체 대비 */
  tpFirstPct: number;
  /** 거래당 기대값(R) */
  expectancyR: number;
  /** 같은 날 TP·SL을 둘 다 건드려 순서를 알 수 없었던 비율(%) */
  ambiguousPct: number;
  /** 평균 보유일 */
  avgHeldDays: number;
}

export interface StrategyScore {
  key: StrategyKey | 'consensus';
  signal: Score;
  /** 언제나 롱을 잡는 대조군 — 표류를 걷어내기 위한 기준선 */
  baseline: Score;
  /** 방향 적중률 차이(%p). 0 근처면 신호가 기여한 게 없다. */
  hitEdgePP: number;
  /** 기대값 차이(R) */
  expectancyEdgeR: number;
  /** 신호가 중립이라 건너뛴 날 수 */
  skipped: number;
}

const ok = (v: number) => isFinite(v) && v > 0;

/**
 * 진입 후 TP/SL 중 어디에 먼저 닿는지 앞으로 걸어간다.
 * 같은 날 둘 다 닿으면 'ambiguous'로 표시하고 손실로 센다.
 */
function resolve(
  candles: Candle[],
  from: number,
  side: Direction,
  entry: number,
  tp: number,
  sl: number,
  maxHold: number,
): { resolution: Resolution; r: number; heldDays: number } {
  const rWin = TP_MULT / SL_MULT;
  for (let k = 1; k <= maxHold && from + k < candles.length; k++) {
    const c = candles[from + k];
    if (!ok(c.high) || !ok(c.low)) continue;
    const hitTp = side === 'long' ? c.high >= tp : c.low <= tp;
    const hitSl = side === 'long' ? c.low <= sl : c.high >= sl;
    if (hitTp && hitSl) return { resolution: 'ambiguous', r: -1, heldDays: k };
    if (hitTp) return { resolution: 'tp', r: rWin, heldDays: k };
    if (hitSl) return { resolution: 'sl', r: -1, heldDays: k };
  }
  // 기간 안에 안 끝났다 — 마지막 종가로 청산한 셈 친다
  const last = candles[Math.min(from + maxHold, candles.length - 1)];
  if (!last || !ok(last.close) || !ok(entry)) return { resolution: 'timeout', r: 0, heldDays: maxHold };
  const move = side === 'long' ? last.close - entry : entry - last.close;
  const risk = Math.abs(entry - sl);
  return { resolution: 'timeout', r: risk > 0 ? move / risk : 0, heldDays: maxHold };
}

function summarize(trades: Trade[]): Score {
  const n = trades.length;
  if (!n) return { trades: 0, nextDayHitPct: 0, tpFirstPct: 0, expectancyR: 0, ambiguousPct: 0, avgHeldDays: 0 };
  return {
    trades: n,
    nextDayHitPct: (trades.filter(t => t.nextDayHit).length / n) * 100,
    tpFirstPct: (trades.filter(t => t.resolution === 'tp').length / n) * 100,
    expectancyR: trades.reduce((s, t) => s + t.r, 0) / n,
    ambiguousPct: (trades.filter(t => t.resolution === 'ambiguous').length / n) * 100,
    avgHeldDays: trades.reduce((s, t) => s + t.heldDays, 0) / n,
  };
}

export interface WalkOptions {
  lookback?: number;
  maxHold?: number;
  /** 최근 몇 일을 검정할지. 생략하면 가능한 만큼 전부. */
  window?: number;
}

/**
 * 한 전략(또는 합의)을 워크포워드로 채점한다.
 *
 * `key === 'consensus'`면 computeConsensus를, 아니면 computeStrategy를 쓴다.
 * 중립 신호는 거래하지 않으므로 건너뛰고 그 수를 따로 돌려준다 —
 * 중립이 많으면 표본이 작아지고, 그 사실을 숨기면 성적이 부풀려 보인다.
 */
export function walkForward(
  candles: Candle[],
  key: StrategyKey | 'consensus',
  market: 'spot' | 'futures',
  opts: WalkOptions = {},
): StrategyScore | null {
  const lookback = opts.lookback ?? LOOKBACK;
  const maxHold = opts.maxHold ?? MAX_HOLD;
  const n = candles.length;
  if (n < lookback + maxHold + MIN_TRADES) return null;

  const lastEntry = n - maxHold - 1;
  const firstEntry = opts.window != null
    ? Math.max(lookback, lastEntry - opts.window + 1)
    : lookback;
  if (lastEntry < firstEntry) return null;

  const sig: Trade[] = [];
  const base: Trade[] = [];
  let skipped = 0;

  for (let t = firstEntry; t <= lastEntry; t++) {
    // 지표에 필요한 만큼만 잘라 넘긴다 — 매번 전체를 복사하면 O(n²)가 된다
    const win = candles.slice(t - lookback + 1, t + 1);
    const cur = candles[t];
    const next = candles[t + 1];
    if (!cur || !next || !ok(cur.close) || !ok(next.close)) continue;

    // ── 대조군: 언제나 롱 (같은 날, 같은 ATR 기반 TP/SL)
    const atr = computeATR(win, 14);
    if (atr && ok(cur.close)) {
      const b = computeTpSl(cur.close, atr, 'long', TP_MULT, SL_MULT);
      const rr = resolve(candles, t, 'long', cur.close, b.tp, b.sl, maxHold);
      base.push({
        i: t, side: 'long', entry: cur.close, tp: b.tp, sl: b.sl,
        resolution: rr.resolution, r: rr.r, heldDays: rr.heldDays,
        nextDayHit: next.close > cur.close,
      });
    }

    // ── 신호
    const s = key === 'consensus'
      ? computeConsensus(win, market)
      : computeStrategy(win, key, market);
    if (!s) continue;
    const bias: Bias = s.bias;
    if (bias === 'neutral') { skipped++; continue; }

    const rr = resolve(candles, t, s.side, s.entry, s.tp, s.sl, maxHold);
    const up = next.close > cur.close;
    sig.push({
      i: t, side: s.side, entry: s.entry, tp: s.tp, sl: s.sl,
      resolution: rr.resolution, r: rr.r, heldDays: rr.heldDays,
      nextDayHit: s.side === 'long' ? up : !up,
    });
  }

  if (sig.length < MIN_TRADES) return null;
  const signal = summarize(sig);
  const baseline = summarize(base);
  return {
    key,
    signal,
    baseline,
    hitEdgePP: signal.nextDayHitPct - baseline.nextDayHitPct,
    expectancyEdgeR: signal.expectancyR - baseline.expectancyR,
    skipped,
  };
}

/**
 * 여러 코인의 성적을 합친다. 코인 하나의 결과는 표본 추출이라 믿을 게 못 된다 —
 * forecast.ts 주석이 지적한 함정(BTC만 보면 +44%, 22개 평균은 −30%)이 정확히 이것이다.
 * 그래서 화면에는 언제나 합산값을 앞세운다.
 */
export function mergeScores(scores: (StrategyScore | null)[]): StrategyScore | null {
  const list = scores.filter((s): s is StrategyScore => s != null);
  if (!list.length) return null;

  const wavg = (pick: (s: StrategyScore) => number, w: (s: StrategyScore) => number) => {
    const den = list.reduce((a, s) => a + w(s), 0);
    return den > 0 ? list.reduce((a, s) => a + pick(s) * w(s), 0) / den : 0;
  };
  const sw = (s: StrategyScore) => s.signal.trades;
  const bw = (s: StrategyScore) => s.baseline.trades;

  const signal: Score = {
    trades: list.reduce((a, s) => a + s.signal.trades, 0),
    nextDayHitPct: wavg(s => s.signal.nextDayHitPct, sw),
    tpFirstPct: wavg(s => s.signal.tpFirstPct, sw),
    expectancyR: wavg(s => s.signal.expectancyR, sw),
    ambiguousPct: wavg(s => s.signal.ambiguousPct, sw),
    avgHeldDays: wavg(s => s.signal.avgHeldDays, sw),
  };
  const baseline: Score = {
    trades: list.reduce((a, s) => a + s.baseline.trades, 0),
    nextDayHitPct: wavg(s => s.baseline.nextDayHitPct, bw),
    tpFirstPct: wavg(s => s.baseline.tpFirstPct, bw),
    expectancyR: wavg(s => s.baseline.expectancyR, bw),
    ambiguousPct: wavg(s => s.baseline.ambiguousPct, bw),
    avgHeldDays: wavg(s => s.baseline.avgHeldDays, bw),
  };
  return {
    key: list[0].key,
    signal,
    baseline,
    hitEdgePP: signal.nextDayHitPct - baseline.nextDayHitPct,
    expectancyEdgeR: signal.expectancyR - baseline.expectancyR,
    skipped: list.reduce((a, s) => a + s.skipped, 0),
  };
}

/**
 * 적중률 차이의 표준오차(%p). 이항분포 근사.
 * 표본이 작으면 5%p 차이도 잡음이라는 걸 보여주기 위한 것이다.
 */
export function hitEdgeStdErrPP(signalTrades: number, baselineTrades: number): number | null {
  if (!(signalTrades > 0) || !(baselineTrades > 0)) return null;
  // p≈0.5에서 최대 분산을 가정 — 보수적으로 넓게 잡는다
  const v = 0.25 / signalTrades + 0.25 / baselineTrades;
  return Math.sqrt(v) * 100;
}

/** 차이가 표준오차의 2배를 넘는가 */
export function isSignificant(edgePP: number, stdErrPP: number | null): boolean {
  return stdErrPP != null && Math.abs(edgePP) >= 2 * stdErrPP;
}

/**
 * 판정.
 *
 * 적중률과 돈을 반드시 나눠서 본다. 실측에서 볼린저는 적중률이 대조군보다
 * +2.0%p 높게(표준오차 밖) 나오는데 기대값은 +0.006R이다. 이걸 "대조군을
 * 이긴다"고 부르면 거짓말이다 — 더 자주 맞히면서 돈은 못 벌고 있다.
 * TP를 1.5R, SL을 1R로 잡았으니 자주 맞히는 것만으로는 부족하기 때문이다.
 */
export type Verdict = 'no-edge' | 'hit-only' | 'real-edge' | 'worse';

export function verdict(edgePP: number, expectancyEdgeR: number, stdErrPP: number | null): Verdict {
  if (!isSignificant(edgePP, stdErrPP)) return 'no-edge';
  if (edgePP < 0) return 'worse';
  // 적중률은 올랐다. 돈도 따라왔는가?
  return expectancyEdgeR > 0.02 ? 'real-edge' : 'hit-only';
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  'no-edge': 'indistinguishable from always-long',
  'hit-only': 'right more often, no richer',
  'real-edge': 'beats always-long on both',
  worse: 'worse than always-long',
};

export function verdictLabel(edgePP: number, expectancyEdgeR: number, stdErrPP: number | null): string {
  return VERDICT_LABEL[verdict(edgePP, expectancyEdgeR, stdErrPP)];
}
