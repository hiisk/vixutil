/**
 * ATR(Average True Range) 및 ATR 기반 TP/SL 계산 — 순수 함수 모음.
 * 바이낸스 일봉(klines)으로 변동성을 재고, 진입가·방향·배수에 따라
 * 익절(TP)·손절(SL) 가격을 산출한다. 투자 자문이 아니라 계산 도구다.
 */

export interface Candle { high: number; low: number; close: number }

/**
 * True Range = max( 고가-저가, |고가-전일종가|, |저가-전일종가| ).
 * 첫 캔들은 전일 종가가 없어 (고가-저가)로 계산한다.
 */
export function trueRanges(candles: Candle[]): number[] {
  const tr: number[] = [];
  for (let i = 0; i < candles.length; i++) {
    const c = candles[i];
    if (i === 0) {
      tr.push(c.high - c.low);
    } else {
      const prevClose = candles[i - 1].close;
      tr.push(Math.max(c.high - c.low, Math.abs(c.high - prevClose), Math.abs(c.low - prevClose)));
    }
  }
  return tr;
}

/**
 * Wilder 방식 ATR(period). 첫 ATR은 앞 period개 TR의 단순평균,
 * 이후 ATR_i = (ATR_{i-1} * (period-1) + TR_i) / period 로 평활한다.
 * TR은 두 번째 캔들부터 유효(전일 종가 필요)하므로 최소 period+1개 캔들이 필요하다.
 */
export function computeATR(candles: Candle[], period = 14): number | null {
  if (candles.length < period + 1) return null;
  const tr = trueRanges(candles);
  // 전일 종가가 있는 TR만 사용(첫 캔들 TR 제외)
  const valid = tr.slice(1);
  if (valid.length < period) return null;

  let atr = valid.slice(0, period).reduce((s, v) => s + v, 0) / period;
  for (let i = period; i < valid.length; i++) {
    atr = (atr * (period - 1) + valid[i]) / period;
  }
  return atr;
}

/** 종가 단순이동평균(추세 판정용). 데이터가 period보다 적으면 null. */
export function smaClose(candles: Candle[], period: number): number | null {
  if (candles.length < period) return null;
  return candles.slice(-period).reduce((s, c) => s + c.close, 0) / period;
}

export type Direction = 'long' | 'short';

export interface TpSlResult {
  entry: number;
  tp: number;
  sl: number;
  tpDistPct: number;
  slDistPct: number;
  riskReward: number;
}

/**
 * ATR 기반 TP/SL.
 *  롱: TP = 진입 + ATR×tpMult, SL = 진입 - ATR×slMult
 *  숏: TP = 진입 - ATR×tpMult, SL = 진입 + ATR×slMult
 * 손익비(R:R) = TP까지 거리 / SL까지 거리.
 */
export function computeTpSl(
  entry: number,
  atr: number,
  direction: Direction,
  tpMult: number,
  slMult: number,
): TpSlResult {
  const tpDist = atr * tpMult;
  const slDist = atr * slMult;
  const tp = direction === 'long' ? entry + tpDist : entry - tpDist;
  const sl = direction === 'long' ? entry - slDist : entry + slDist;
  return {
    entry,
    tp,
    sl,
    tpDistPct: entry > 0 ? (tpDist / entry) * 100 : 0,
    slDistPct: entry > 0 ? (slDist / entry) * 100 : 0,
    riskReward: slDist > 0 ? tpDist / slDist : 0,
  };
}

/** 가격대에 맞춰 소수 자릿수를 자동 조정해 문자열로 포맷한다. */
export function formatPrice(v: number): string {
  if (!isFinite(v)) return '-';
  const abs = Math.abs(v);
  let digits: number;
  if (abs >= 1000) digits = 2;
  else if (abs >= 1) digits = 3;
  else if (abs >= 0.01) digits = 5;
  else digits = 8;
  return v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: digits });
}
