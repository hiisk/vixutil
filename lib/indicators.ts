/**
 * 기술적 지표 모음 — 상세 페이지의 "Technical Analysis" 섹션용.
 *
 * 여기서 계산하는 값과 BUY/SELL 라벨은 **지표의 현재 상태를 서술**한 것이지 예측이 아니다.
 * 같은 지표들의 실제 예측력은 이 저장소에서 반복 측정했다(lib/forecast.ts 주석 참조):
 *   MA + RSI + MACD 합성의 5일 방향 적중률 49.4% (MACD 단독 49.5%)
 *   21특성 ML 아웃오브샘플 48.79%
 * 그러므로 화면에는 값과 상태만 보여주고, 그 라벨이 수익을 뜻하지 않는다고 함께 적는다.
 */
import type { DailyOHLCV } from './binance';

export type Action = 'BUY' | 'SELL' | 'NEUTRAL';
export interface Reading {
  name: string;
  value: number;
  action: Action;
}

const last = <T>(a: T[]): T => a[a.length - 1];
const mean = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;

export function sma(v: number[], p: number): number | null {
  if (v.length < p) return null;
  return mean(v.slice(-p));
}

/** 전체 EMA 시계열 (첫 값은 seed) */
export function emaSeries(v: number[], p: number): number[] {
  if (!v.length) return [];
  const k = 2 / (p + 1);
  const out = [v[0]];
  for (let i = 1; i < v.length; i++) out.push(v[i] * k + out[i - 1] * (1 - k));
  return out;
}
export function ema(v: number[], p: number): number | null {
  if (v.length < p) return null;
  return last(emaSeries(v, p));
}

/** 가격이 이동평균 위면 BUY, 아래면 SELL (관례적 판독) */
const maAction = (price: number, ma: number): Action => (price > ma ? 'BUY' : price < ma ? 'SELL' : 'NEUTRAL');

/** Wilder RSI */
export function rsi(v: number[], p = 14): number | null {
  if (v.length < p + 1) return null;
  let g = 0, l = 0;
  for (let i = 1; i <= p; i++) {
    const ch = v[i] - v[i - 1];
    if (ch >= 0) g += ch; else l -= ch;
  }
  let ag = g / p, al = l / p;
  for (let i = p + 1; i < v.length; i++) {
    const ch = v[i] - v[i - 1];
    ag = (ag * (p - 1) + Math.max(ch, 0)) / p;
    al = (al * (p - 1) + Math.max(-ch, 0)) / p;
  }
  if (al === 0 && ag === 0) return 50;
  if (al === 0) return 100;
  return 100 - 100 / (1 + ag / al);
}

/** RSI 시계열 (Stoch RSI에 필요) */
function rsiSeries(v: number[], p = 14): number[] {
  const out: number[] = [];
  for (let i = p; i < v.length; i++) {
    const r = rsi(v.slice(0, i + 1), p);
    if (r != null) out.push(r);
  }
  return out;
}

/** Stochastic RSI %K (0~100) */
export function stochRsi(v: number[], p = 14): number | null {
  const rs = rsiSeries(v, p);
  if (rs.length < p) return null;
  const w = rs.slice(-p);
  const lo = Math.min(...w), hi = Math.max(...w);
  if (hi === lo) return 50;
  return ((last(rs) - lo) / (hi - lo)) * 100;
}

/** Fast Stochastic %K */
export function stochFast(c: DailyOHLCV[], p = 14): number | null {
  if (c.length < p) return null;
  const w = c.slice(-p);
  const hi = Math.max(...w.map(x => x.high));
  const lo = Math.min(...w.map(x => x.low));
  if (hi === lo) return 50;
  return ((last(c).close - lo) / (hi - lo)) * 100;
}

/** Commodity Channel Index */
export function cci(c: DailyOHLCV[], p = 20): number | null {
  if (c.length < p) return null;
  const tp = c.map(x => (x.high + x.low + x.close) / 3);
  const w = tp.slice(-p);
  const m = mean(w);
  const md = mean(w.map(x => Math.abs(x - m)));
  if (md === 0) return 0;
  return (last(tp) - m) / (0.015 * md);
}

/** Wilder ADX(14) + 방향(DI+/DI-) */
export function adx(c: DailyOHLCV[], p = 14): { adx: number; plusDI: number; minusDI: number } | null {
  if (c.length < p * 2 + 1) return null;
  const tr: number[] = [], pdm: number[] = [], mdm: number[] = [];
  for (let i = 1; i < c.length; i++) {
    const up = c[i].high - c[i - 1].high;
    const dn = c[i - 1].low - c[i].low;
    pdm.push(up > dn && up > 0 ? up : 0);
    mdm.push(dn > up && dn > 0 ? dn : 0);
    tr.push(Math.max(c[i].high - c[i].low, Math.abs(c[i].high - c[i - 1].close), Math.abs(c[i].low - c[i - 1].close)));
  }
  // Wilder smoothing
  const smooth = (a: number[]) => {
    let s = a.slice(0, p).reduce((x, y) => x + y, 0);
    const out = [s];
    for (let i = p; i < a.length; i++) { s = s - s / p + a[i]; out.push(s); }
    return out;
  };
  const trS = smooth(tr), pS = smooth(pdm), mS = smooth(mdm);
  const dx: number[] = [];
  for (let i = 0; i < trS.length; i++) {
    if (trS[i] === 0) { dx.push(0); continue; }
    const pdi = (pS[i] / trS[i]) * 100, mdi = (mS[i] / trS[i]) * 100;
    const sum = pdi + mdi;
    dx.push(sum === 0 ? 0 : (Math.abs(pdi - mdi) / sum) * 100);
  }
  if (dx.length < p) return null;
  let a = mean(dx.slice(0, p));
  for (let i = p; i < dx.length; i++) a = (a * (p - 1) + dx[i]) / p;
  const i = trS.length - 1;
  return { adx: a, plusDI: (pS[i] / trS[i]) * 100, minusDI: (mS[i] / trS[i]) * 100 };
}

/** Awesome Oscillator: SMA5(median price) - SMA34(median price) */
export function awesome(c: DailyOHLCV[]): number | null {
  if (c.length < 34) return null;
  const mp = c.map(x => (x.high + x.low) / 2);
  const a = sma(mp, 5), b = sma(mp, 34);
  return a != null && b != null ? a - b : null;
}

/** Momentum(10): close - close[n-10] */
export function momentum(v: number[], p = 10): number | null {
  if (v.length < p + 1) return null;
  return last(v) - v[v.length - 1 - p];
}

/** MACD line (12,26) */
export function macd(v: number[], fast = 12, slow = 26): number | null {
  if (v.length < slow) return null;
  return last(emaSeries(v, fast)) - last(emaSeries(v, slow));
}

/** Williams %R (-100 ~ 0) */
export function williamsR(c: DailyOHLCV[], p = 14): number | null {
  if (c.length < p) return null;
  const w = c.slice(-p);
  const hi = Math.max(...w.map(x => x.high));
  const lo = Math.min(...w.map(x => x.low));
  if (hi === lo) return -50;
  return ((hi - last(c).close) / (hi - lo)) * -100;
}

/** Bull Bear Power(13) = (high - EMA13) + (low - EMA13) */
export function bullBearPower(c: DailyOHLCV[], p = 13): number | null {
  if (c.length < p) return null;
  const e = ema(c.map(x => x.close), p);
  if (e == null) return null;
  return (last(c).high - e) + (last(c).low - e);
}

/** Ultimate Oscillator (7,14,28) */
export function ultimate(c: DailyOHLCV[], s = 7, m = 14, l = 28): number | null {
  if (c.length < l + 1) return null;
  const bp: number[] = [], tr: number[] = [];
  for (let i = 1; i < c.length; i++) {
    const lowTrue = Math.min(c[i].low, c[i - 1].close);
    const highTrue = Math.max(c[i].high, c[i - 1].close);
    bp.push(c[i].close - lowTrue);
    tr.push(highTrue - lowTrue);
  }
  const avg = (n: number) => {
    const b = bp.slice(-n).reduce((x, y) => x + y, 0);
    const t = tr.slice(-n).reduce((x, y) => x + y, 0);
    return t === 0 ? 0 : b / t;
  };
  return (100 * (4 * avg(s) + 2 * avg(m) + avg(l))) / 7;
}

/** Volume Weighted Moving Average(10) */
export function vwma(c: DailyOHLCV[], p = 10): number | null {
  if (c.length < p) return null;
  const w = c.slice(-p);
  const num = w.reduce((s, x) => s + x.close * x.volume, 0);
  const den = w.reduce((s, x) => s + x.volume, 0);
  return den === 0 ? sma(w.map(x => x.close), p) : num / den;
}

/** Hull Moving Average(9) — WMA 기반 */
function wma(v: number[], p: number): number | null {
  if (v.length < p) return null;
  const w = v.slice(-p);
  let num = 0, den = 0;
  for (let i = 0; i < p; i++) { num += w[i] * (i + 1); den += i + 1; }
  return num / den;
}
export function hullMa(v: number[], p = 9): number | null {
  const half = Math.round(p / 2), sq = Math.round(Math.sqrt(p));
  if (v.length < p + sq) return null;
  const raw: number[] = [];
  for (let i = v.length - sq; i < v.length; i++) {
    const slice = v.slice(0, i + 1);
    const a = wma(slice, half), b = wma(slice, p);
    if (a == null || b == null) return null;
    raw.push(2 * a - b);
  }
  return wma(raw, sq);
}

/** Ichimoku Base Line (Kijun-sen, 26) */
export function ichimokuBase(c: DailyOHLCV[], p = 26): number | null {
  if (c.length < p) return null;
  const w = c.slice(-p);
  return (Math.max(...w.map(x => x.high)) + Math.min(...w.map(x => x.low))) / 2;
}

/** 종가만 주봉으로 리샘플. 주봉 SMA200에는 일봉 1400개가 필요해 전체 이력 종가를 쓴다. */
export function resampleCloses(v: number[], k = 7): number[] {
  const out: number[] = [];
  for (let i = k - 1; i < v.length; i += k) out.push(v[i]);
  return out;
}

/** 종가 배열로 이동평균 표 (주봉용) */
export function maTableFromCloses(closes: number[], periods: number[], kind: 'sma' | 'ema', label: string): Reading[] {
  const price = closes[closes.length - 1];
  const out: Reading[] = [];
  for (const p of periods) {
    const v = kind === 'sma' ? sma(closes, p) : ema(closes, p);
    if (v == null) continue;
    out.push({ name: `${label} ${p}`, value: v, action: maAction(price, v) });
  }
  return out;
}

/** 일봉을 주봉으로 리샘플 (7개씩 묶어 마지막 종가를 취함) */
export function toWeekly(c: DailyOHLCV[]): DailyOHLCV[] {
  const out: DailyOHLCV[] = [];
  for (let i = 0; i + 7 <= c.length; i += 7) {
    const w = c.slice(i, i + 7);
    out.push({
      openTime: w[0].openTime,
      open: w[0].open,
      high: Math.max(...w.map(x => x.high)),
      low: Math.min(...w.map(x => x.low)),
      close: last(w).close,
      volume: w.reduce((s, x) => s + x.volume, 0),
      quoteVolume: w.reduce((s, x) => s + x.quoteVolume, 0),
    });
  }
  return out;
}

/** 이동평균 표 한 벌 (가격 대비 위/아래로 BUY/SELL) */
export function maTable(c: DailyOHLCV[], periods: number[], kind: 'sma' | 'ema'): Reading[] {
  const closes = c.map(x => x.close);
  const price = last(closes);
  const out: Reading[] = [];
  for (const p of periods) {
    const v = kind === 'sma' ? sma(closes, p) : ema(closes, p);
    if (v == null) continue;
    out.push({ name: `${kind.toUpperCase()} ${p}`, value: v, action: maAction(price, v) });
  }
  return out;
}

/** 오실레이터 표 — 값과 관례적 판독 */
export function oscillatorTable(c: DailyOHLCV[]): Reading[] {
  const closes = c.map(x => x.close);
  const out: Reading[] = [];
  const push = (name: string, value: number | null, action: (v: number) => Action) => {
    if (value == null || !isFinite(value)) return;
    out.push({ name, value, action: action(value) });
  };

  push('RSI (14)', rsi(closes, 14), v => (v > 70 ? 'SELL' : v < 30 ? 'BUY' : 'NEUTRAL'));
  push('Stoch RSI (14)', stochRsi(closes, 14), v => (v > 80 ? 'SELL' : v < 20 ? 'BUY' : 'NEUTRAL'));
  push('Stochastic Fast (14)', stochFast(c, 14), v => (v > 80 ? 'SELL' : v < 20 ? 'BUY' : 'NEUTRAL'));
  push('CCI (20)', cci(c, 20), v => (v > 100 ? 'SELL' : v < -100 ? 'BUY' : 'NEUTRAL'));

  const a = adx(c, 14);
  if (a) out.push({ name: 'ADX (14)', value: a.adx, action: a.adx < 20 ? 'NEUTRAL' : a.plusDI > a.minusDI ? 'BUY' : 'SELL' });

  push('Awesome Oscillator (5, 34)', awesome(c), v => (v > 0 ? 'BUY' : v < 0 ? 'SELL' : 'NEUTRAL'));
  push('Momentum (10)', momentum(closes, 10), v => (v > 0 ? 'BUY' : v < 0 ? 'SELL' : 'NEUTRAL'));
  push('MACD (12, 26)', macd(closes), v => (v > 0 ? 'BUY' : v < 0 ? 'SELL' : 'NEUTRAL'));
  push('Williams %R (14)', williamsR(c, 14), v => (v > -20 ? 'SELL' : v < -80 ? 'BUY' : 'NEUTRAL'));
  push('Bull Bear Power (13)', bullBearPower(c, 13), v => (v > 0 ? 'BUY' : v < 0 ? 'SELL' : 'NEUTRAL'));
  push('Ultimate Oscillator (7, 14, 28)', ultimate(c), v => (v > 70 ? 'SELL' : v < 30 ? 'BUY' : 'NEUTRAL'));

  const price = last(closes);
  push('VWMA (10)', vwma(c, 10), v => maAction(price, v));
  push('Hull MA (9)', hullMa(closes, 9), v => maAction(price, v));
  push('Ichimoku Base (26)', ichimokuBase(c, 26), v => maAction(price, v));
  return out;
}

/** 고전적 피벗 포인트 — 마지막 마감 캔들의 H/L/C에서 결정론적으로 계산 */
export interface Pivots {
  p: number;
  s1: number; s2: number; s3: number;
  r1: number; r2: number; r3: number;
}
export function pivots(c: DailyOHLCV[]): Pivots | null {
  if (!c.length) return null;
  const { high: h, low: l, close: cl } = last(c);
  const p = (h + l + cl) / 3;
  return {
    p,
    r1: 2 * p - l,
    s1: 2 * p - h,
    r2: p + (h - l),
    s2: p - (h - l),
    r3: h + 2 * (p - l),
    s3: l - 2 * (h - p),
  };
}

/** BUY/SELL 개수 집계. 이는 지표 상태의 합계이지 예측이 아니다. */
export interface Sentiment {
  bullish: number;
  bearish: number;
  neutral: number;
  bullishPct: number;
  label: 'Bullish' | 'Bearish' | 'Neutral';
}
export function sentiment(readings: Reading[]): Sentiment {
  const bullish = readings.filter(r => r.action === 'BUY').length;
  const bearish = readings.filter(r => r.action === 'SELL').length;
  const neutral = readings.filter(r => r.action === 'NEUTRAL').length;
  const decided = bullish + bearish;
  const bullishPct = decided ? (bullish / decided) * 100 : 50;
  return {
    bullish, bearish, neutral, bullishPct,
    label: bullishPct > 55 ? 'Bullish' : bullishPct < 45 ? 'Bearish' : 'Neutral',
  };
}
