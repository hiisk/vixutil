/**
 * 코인 신호 전략 — 일봉 캔들로 여러 기술적 지표를 계산해 방향(강세/약세/중립)을
 * 예측하고, 진입가·TP·SL을 산출한다. ATR은 손절폭(변동성) 산정에만 쓰고, 방향은
 * 선택한 전략(추세·볼린저밴드·RSI 등)이 결정한다. 모두 실제 지표 계산이며 투자
 * 자문이 아니다.
 */
import { computeATR, computeTpSl, type Direction, type Candle } from './atr';

export type StrategyKey = 'trend' | 'bollinger' | 'rsi' | 'atr';
export type Bias = 'bullish' | 'bearish' | 'neutral';

export const STRATEGY_META: Record<StrategyKey, { label: string; blurb: string }> = {
  trend: { label: 'Trend', blurb: 'SMA 20/50 alignment' },
  bollinger: { label: 'Bollinger', blurb: 'Band position (%B)' },
  rsi: { label: 'RSI', blurb: 'Overbought / oversold' },
  atr: { label: 'ATR', blurb: 'Volatility + SMA20 trend' },
};

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

/** Wilder RSI(period) — 전체 시리즈에 지수평활 적용 */
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
  if (al === 0) return 100;
  return 100 - 100 / (1 + ag / al);
}

export interface StrategySignal {
  bias: Bias;
  side: Direction;
  entry: number;
  tp: number;
  sl: number;
  atr: number;
  atrPct: number;
  note: string;
}

/**
 * 선택한 전략으로 방향(bias)을 예측하고 ATR 기반 TP/SL을 계산한다.
 * 현물(spot)은 매수만 가능하므로 side는 항상 long, 선물은 bias를 따른다.
 */
export function computeStrategy(candles: Candle[], strategy: StrategyKey, market: 'spot' | 'futures'): StrategySignal | null {
  if (candles.length < 15) return null;
  const closes = candles.map(c => c.close);
  const entry = closes[closes.length - 1];
  const atr = computeATR(candles, 14);
  if (!atr || entry <= 0) return null;

  let bias: Bias = 'neutral';
  let note = '';

  if (strategy === 'trend') {
    const s20 = sma(closes, 20), s50 = sma(closes, 50);
    if (s20 == null) { bias = 'neutral'; note = 'Not enough data'; }
    else if (s50 == null) { bias = entry >= s20 ? 'bullish' : 'bearish'; note = `Price ${entry >= s20 ? 'above' : 'below'} SMA20`; }
    else {
      bias = entry > s20 && s20 > s50 ? 'bullish' : entry < s20 && s20 < s50 ? 'bearish' : 'neutral';
      note = bias === 'bullish' ? 'Price > SMA20 > SMA50' : bias === 'bearish' ? 'Price < SMA20 < SMA50' : 'Mixed moving averages';
    }
  } else if (strategy === 'bollinger') {
    const mid = sma(closes, 20), sd = stddev(closes, 20);
    if (mid == null || sd == null || sd === 0) { note = 'Not enough data'; }
    else {
      const upper = mid + 2 * sd, lower = mid - 2 * sd;
      const pctB = (entry - lower) / (upper - lower);
      bias = pctB <= 0.1 ? 'bullish' : pctB >= 0.9 ? 'bearish' : 'neutral';
      note = pctB <= 0.1 ? 'Near lower band (oversold)' : pctB >= 0.9 ? 'Near upper band (overbought)' : `%B ${Math.round(pctB * 100)}%`;
    }
  } else if (strategy === 'rsi') {
    const r = rsi(closes, 14);
    if (r == null) { note = 'Not enough data'; }
    else { bias = r <= 30 ? 'bullish' : r >= 70 ? 'bearish' : 'neutral'; note = `RSI ${r.toFixed(0)}${r <= 30 ? ' (oversold)' : r >= 70 ? ' (overbought)' : ''}`; }
  } else {
    // atr: SMA20 추세로 방향, ATR%로 변동성 표시
    const s20 = sma(closes, 20);
    bias = s20 == null || entry >= s20 ? 'bullish' : 'bearish';
    note = `Trend ${bias === 'bullish' ? 'up' : 'down'} · ATR ${(atr / entry * 100).toFixed(1)}%`;
  }

  const side: Direction = market === 'spot' ? 'long' : bias === 'bearish' ? 'short' : 'long';
  const { tp, sl } = computeTpSl(entry, atr, side, TP_MULT, SL_MULT);
  return { bias, side, entry, tp, sl, atr, atrPct: (atr / entry) * 100, note };
}
