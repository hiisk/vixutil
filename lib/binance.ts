/**
 * 바이낸스 공개 시세 데이터 페치 — 브라우저에서 직접 호출한다.
 * data-api.binance.vision 은 공개 데이터 전용 호스트로 CORS를 허용하고
 * 지역 차단이 적다. API 키가 필요 없는 시세 조회만 사용한다.
 */
import type { Candle } from './atr';

const BASE = 'https://data-api.binance.vision/api/v3';

/** 24h 티커에서 제외할 스테이블/래핑 등가 코인 (ATR이 사실상 0이라 무의미) */
const STABLE_BASES = new Set([
  'USDC', 'FDUSD', 'TUSD', 'USD1', 'BUSD', 'DAI', 'USDP', 'USDD', 'RLUSD', 'PYUSD',
  'EUR', 'EURI', 'AEUR', 'GUSD', 'PAX', 'SUSD', 'USTC', 'XUSD', 'USDG',
]);

export interface Ticker24h {
  symbol: string;
  base: string;
  lastPrice: number;
  priceChangePercent: number;
  quoteVolume: number;
}

/**
 * USDT 페어 24h 티커를 받아 거래량(quoteVolume) 순으로 정렬해 상위 N개를 돌려준다.
 * 스테이블코인 페어는 제외한다. 요청 1회.
 */
export async function fetchTopSymbols(limit = 20): Promise<Ticker24h[]> {
  const res = await fetch(`${BASE}/ticker/24hr`);
  if (!res.ok) throw new Error(`ticker ${res.status}`);
  const data: Array<Record<string, string>> = await res.json();

  return data
    .filter(x => x.symbol.endsWith('USDT'))
    .map(x => ({ symbol: x.symbol, base: x.symbol.slice(0, -4), raw: x }))
    .filter(x => !STABLE_BASES.has(x.base))
    .map(x => ({
      symbol: x.symbol,
      base: x.base,
      lastPrice: Number(x.raw.lastPrice),
      priceChangePercent: Number(x.raw.priceChangePercent),
      quoteVolume: Number(x.raw.quoteVolume),
    }))
    .filter(x => x.lastPrice > 0 && isFinite(x.quoteVolume))
    .sort((a, b) => b.quoteVolume - a.quoteVolume)
    .slice(0, limit);
}

/** 일봉 캔들(고가·저가·종가)을 받아온다. ATR(14)에 최소 20개 정도면 충분하다. */
export async function fetchDailyCandles(symbol: string, limit = 20): Promise<Candle[]> {
  const res = await fetch(`${BASE}/klines?symbol=${symbol}&interval=1d&limit=${limit}`);
  if (!res.ok) throw new Error(`klines ${symbol} ${res.status}`);
  const rows: unknown[][] = await res.json();
  return rows.map(k => ({ high: Number(k[2]), low: Number(k[3]), close: Number(k[4]) }));
}

/**
 * 동시성 제한 실행기 — 배열 항목을 최대 `concurrency`개씩 병렬로 처리한다.
 * 상위 20개 klines를 브라우저에서 한꺼번에 쏘지 않고 나눠 보내 레이트리밋을 피한다.
 */
export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}
