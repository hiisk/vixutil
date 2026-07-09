/**
 * 바이낸스 공개 시세 데이터 페치 — 브라우저에서 직접 호출한다.
 * 현물(data-api.binance.vision)·선물(fapi.binance.com) 모두 CORS를 허용하고
 * API 키가 필요 없는 시세 조회만 사용한다.
 */
import type { Candle } from './atr';

export type Market = 'spot' | 'futures';

const BASES: Record<Market, string> = {
  spot: 'https://data-api.binance.vision/api/v3',
  futures: 'https://fapi.binance.com/fapi/v1',
};

/** 24h 티커에서 제외할 스테이블/등가 코인 (ATR이 사실상 0이라 무의미) */
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
 * USDT 페어 24h 티커를 거래량(quoteVolume) 내림차순으로 정렬해 전부 돌려준다.
 * 스테이블코인 페어는 제외한다. 요청 1회로 전체 목록·현재가·24h 변동을 얻는다.
 */
export async function fetchTickers(market: Market = 'spot'): Promise<Ticker24h[]> {
  const res = await fetch(`${BASES[market]}/ticker/24hr`);
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
    .sort((a, b) => b.quoteVolume - a.quoteVolume);
}

/** 거래량 상위 N개만 (계산기 페이지용). */
export async function fetchTopSymbols(limit = 20, market: Market = 'spot'): Promise<Ticker24h[]> {
  return (await fetchTickers(market)).slice(0, limit);
}

/**
 * 마감된 일봉 캔들(고가·저가·종가)을 받아온다. 진행 중(미마감) 캔들은 제외해,
 * 마지막 캔들 종가가 곧 "오늘 00:00 UTC에 확정된 진입가(어제 종가)"가 되도록 한다.
 */
export async function fetchDailyCandles(symbol: string, limit = 20, market: Market = 'spot'): Promise<Candle[]> {
  const res = await fetch(`${BASES[market]}/klines?symbol=${symbol}&interval=1d&limit=${limit + 2}`);
  if (!res.ok) throw new Error(`klines ${symbol} ${res.status}`);
  const rows: unknown[][] = await res.json();
  const now = Date.now();
  return rows
    .filter(k => Number(k[6]) < now) // closeTime(index 6)이 과거인 = 마감된 봉만
    .slice(-limit)
    .map(k => ({ high: Number(k[2]), low: Number(k[3]), close: Number(k[4]) }));
}

/**
 * 동시성 제한 실행기 — 배열 항목을 최대 `concurrency`개씩 병렬로 처리한다.
 * 한 페이지(50개) klines를 한꺼번에 쏘지 않고 나눠 보내 레이트리밋을 피한다.
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
