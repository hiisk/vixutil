/**
 * 코인 신호 전략 — 일봉 캔들로 여러 기술적 지표를 계산해 방향(강세/약세/중립)을
 * 예측하고, 진입가·TP·SL을 산출한다. ATR은 손절폭(변동성) 산정에만 쓰고, 방향은
 * 선택한 전략(추세·볼린저밴드·RSI 등)이 결정한다. 모두 실제 지표 계산이며 투자
 * 자문이 아니다.
 */
import { computeATR, computeTpSl, type Direction, type Candle } from './atr';

export type StrategyKey = 'trend' | 'bollinger' | 'rsi' | 'atr';
export type Bias = 'bullish' | 'bearish' | 'neutral';

export const STRATEGY_META: Record<StrategyKey, { label: string; short: string; blurb: string }> = {
  trend: { label: 'Trend', short: 'T', blurb: 'SMA 20/50 alignment' },
  bollinger: { label: 'Bollinger', short: 'B', blurb: 'Band position (%B)' },
  rsi: { label: 'RSI', short: 'R', blurb: 'Overbought / oversold' },
  atr: { label: 'ATR', short: 'A', blurb: 'Volatility + SMA20 trend' },
};

export const STRATEGIES: StrategyKey[] = ['trend', 'bollinger', 'rsi', 'atr'];

const TP_MULT = 1.5;
const SL_MULT = 1.0;

export function sma(vals: number[], p: number): number | null {
  if (vals.length < p) return null;
  return vals.slice(-p).reduce((s, v) => s + v, 0) / p;
}

export function stddev(vals: number[], p: number): number | null {
  const m = sma(vals, p);
  if (m == null) return null;
  const slice = vals.slice(-p);
  return Math.sqrt(slice.reduce((s, v) => s + (v - m) ** 2, 0) / p);
}

/**
 * Wilder RSI(period) — 전체 시리즈에 지수평활 적용. p+1개 미만(신규 상장으로
 * 기간 미달)이면 null. 상승/하락이 전혀 없는 완전 무변동일 때만 계산 불가로 null,
 * 그 외에는 0~100 값을 그대로 돌려준다(극단 0/100도 유효 신호로 사용).
 */
export function rsi(closes: number[], p = 14): number | null {
  if (closes.length < p + 1) return null;
  let gain = 0, loss = 0;
  for (let i = 1; i <= p; i++) {
    const ch = closes[i] - closes[i - 1];
    if (ch >= 0) gain += ch; else loss -= ch;
  }
  let ag = gain / p, al = loss / p;
  for (let i = p + 1; i < closes.length; i++) {
    const ch = closes[i] - closes[i - 1];
    ag = (ag * (p - 1) + Math.max(ch, 0)) / p;
    al = (al * (p - 1) + Math.max(-ch, 0)) / p;
  }
  if (al === 0 && ag === 0) return null; // 완전 무변동 → 계산 불가
  if (al === 0) return 100;
  return 100 - 100 / (1 + ag / al);
}

export interface StrategySignal {
  bias: Bias;
  /** -1(강한 약세) ~ +1(강한 강세) 연속 점수. 신호가 강할수록 절댓값이 크다. */
  score: number;
  side: Direction;
  entry: number;
  tp: number;
  sl: number;
  atr: number;
  atrPct: number;
  note: string;
}

/** 점수 절댓값이 이 값보다 작으면 중립으로 본다(약한 신호 무시). */
const NEUTRAL_ZONE = 0.15;
const clamp1 = (x: number) => Math.max(-1, Math.min(1, x));
const biasOf = (score: number): Bias => (score > NEUTRAL_ZONE ? 'bullish' : score < -NEUTRAL_ZONE ? 'bearish' : 'neutral');

/**
 * 한 전략의 방향 점수(-1~+1)와 근거를 계산한다. 양수=강세, 음수=약세, 절댓값=강도.
 * 현물(spot)은 매수만 가능하므로 side는 항상 long, 선물은 bias를 따른다.
 */
export function computeStrategy(candles: Candle[], strategy: StrategyKey, market: 'spot' | 'futures'): StrategySignal | null {
  if (candles.length < 15) return null;
  const closes = candles.map(c => c.close);
  const entry = closes[closes.length - 1];
  const atr = computeATR(candles, 14);
  if (!atr || entry <= 0) return null;

  let score = 0;
  let note = '';

  // 각 전략은 필요한 최소 기간(상장 기간)을 못 채우면 null을 돌려 합의에서 빠진다.
  if (strategy === 'trend') {
    const s20 = sma(closes, 20), s50 = sma(closes, 50);
    if (s20 == null) return null; // SMA20(20봉) 필요
    const a = Math.sign(entry - s20) * 0.5;
    const b = s50 != null ? Math.sign(s20 - s50) * 0.5 : 0; // SMA50 없으면 SMA20만으로 부분 판정
    score = a + b; // -1(역배열) ~ +1(정배열)
    note = score >= 0.9 ? 'Price > SMA20 > SMA50' : score <= -0.9 ? 'Price < SMA20 < SMA50' : score > 0 ? 'Above SMA20' : score < 0 ? 'Below SMA20' : 'Mixed MAs';
  } else if (strategy === 'bollinger') {
    const mid = sma(closes, 20), sd = stddev(closes, 20);
    if (mid == null || sd == null || sd === 0) return null; // 20봉 필요
    const pctB = (entry - (mid - 2 * sd)) / (4 * sd);
    score = clamp1((0.5 - pctB) * 2); // 하단밴드(과매도)=+1, 상단밴드(과매수)=-1
    note = `%B ${Math.round(pctB * 100)}%${pctB <= 0.1 ? ' (oversold)' : pctB >= 0.9 ? ' (overbought)' : ''}`;
  } else if (strategy === 'rsi') {
    const r = rsi(closes, 14);
    if (r == null) return null; // 15봉(≈14일) 미만 → 기간 미달로 제외
    // RSI 값에 선형 비례: 50=중립, 0=+1(과매도 최대), 100=-1(과매수 최대)
    score = clamp1((50 - r) / 50);
    note = `RSI ${r.toFixed(0)}${r <= 30 ? ' (oversold)' : r >= 70 ? ' (overbought)' : ''}`;
  } else {
    // atr: SMA20 대비 거리를 변동성(ATR)으로 정규화한 추세 강도
    const s20 = sma(closes, 20);
    if (s20 == null) return null; // SMA20(20봉) 필요
    score = clamp1((entry - s20) / (atr * 3));
    note = `${score >= 0 ? '+' : ''}${((entry - s20) / atr).toFixed(1)} ATR vs SMA20`;
  }

  const bias = biasOf(score);
  const side: Direction = market === 'spot' ? 'long' : bias === 'bearish' ? 'short' : 'long';
  const { tp, sl } = computeTpSl(entry, atr, side, TP_MULT, SL_MULT);
  return { bias, score, side, entry, tp, sl, atr, atrPct: (atr / entry) * 100, note };
}

export interface StrategyVote {
  key: StrategyKey;
  bias: Bias;
  note: string;
}

export interface ConsensusSignal {
  bias: Bias;
  confidence: number; // 0~100, 방향에 동의한 전략 비율
  /** 부호 있는 합의 점수 (-1 약세 ~ +1 강세). 예측 모델의 단기 틸트 입력. */
  score: number;
  side: Direction;
  entry: number;
  tp: number;
  sl: number;
  atr: number;
  atrPct: number;
  votes: StrategyVote[];
  /** 최근 7개 마감 일봉 종가 — 스파크라인용(같은 캔들 재사용, 추가 요청 없음) */
  spark: number[];
}

/**
 * 모든 전략을 실행해 방향 점수를 확신도 가중 평균으로 합친다.
 *   aggregate = Σ(score · |score|) / Σ|score|
 * 이렇게 하면 강한 신호(절댓값이 큰 전략)일수록 결과를 크게 끌어당겨서,
 * 한 전략만 아주 적절해도(예: RSI 15) 확신도가 높게 나오고, 반대 방향의
 * 강한 신호끼리는 서로 상쇄된다. 지표 계산은 같은 캔들 순수 연산이라 추가
 * 네트워크 요청이 없다.
 */
export function computeConsensus(candles: Candle[], market: 'spot' | 'futures'): ConsensusSignal | null {
  const votes: StrategyVote[] = [];
  let base: StrategySignal | null = null;
  let num = 0, den = 0;
  for (const key of STRATEGIES) {
    const sig = computeStrategy(candles, key, market);
    if (!sig) continue;
    if (!base) base = sig;
    num += sig.score * Math.abs(sig.score);
    den += Math.abs(sig.score);
    votes.push({ key, bias: sig.bias, note: sig.note });
  }
  if (!base || votes.length === 0) return null;

  const agg = den > 0 ? num / den : 0; // -1 ~ +1
  const bias = biasOf(agg);
  const confidence = Math.round(Math.abs(agg) * 100);

  const side: Direction = market === 'spot' ? 'long' : bias === 'bearish' ? 'short' : 'long';
  const { tp, sl } = computeTpSl(base.entry, base.atr, side, TP_MULT, SL_MULT);
  const spark = candles.slice(-7).map(c => c.close);
  return { bias, confidence, score: agg, side, entry: base.entry, tp, sl, atr: base.atr, atrPct: (base.atr / base.entry) * 100, votes, spark };
}
