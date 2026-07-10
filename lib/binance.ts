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
 * 바이낸스 klines는 한 번에 1000개가 상한이라, endTime을 거슬러가며 여러 번 받아
 * 상장 이후 전체 일봉 종가를 모은다(오래된 순). 과거 구간 시나리오 계산에 쓴다.
 */
export async function fetchFullDailyCloses(symbol: string, market: Market = 'spot', maxPages = 4): Promise<number[]> {
  let end = Date.now();
  const out: number[] = [];
  const now = Date.now();
  for (let page = 0; page < maxPages; page++) {
    const res = await fetch(`${BASES[market]}/klines?symbol=${symbol}&interval=1d&limit=1000&endTime=${end}`);
    if (!res.ok) break;
    const rows: unknown[][] = await res.json();
    if (!rows.length) break;
    out.unshift(...rows.filter(k => Number(k[6]) < now).map(k => Number(k[4])));
    end = Number(rows[0][0]) - 1;
    if (rows.length < 1000) break; // 상장 시점까지 도달
  }
  return out;
}

/** 마감된 일봉의 시가·고가·저가·종가·거래량 (상세 페이지 Historic data 섹션용) */
export interface DailyOHLCV {
  /** 캔들 시작 시각(ms, UTC 00:00) */
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  /** 코인 수량 기준 거래량 */
  volume: number;
  /** USDT 기준 거래대금 */
  quoteVolume: number;
}

/** 마감된 일봉의 OHLCV를 오래된 순으로 돌려준다. 진행 중인 봉은 제외한다. */
export async function fetchDailyOHLCV(symbol: string, limit = 30, market: Market = 'spot'): Promise<DailyOHLCV[]> {
  const res = await fetch(`${BASES[market]}/klines?symbol=${symbol}&interval=1d&limit=${limit + 2}`);
  if (!res.ok) throw new Error(`klines ${symbol} ${res.status}`);
  const rows: unknown[][] = await res.json();
  const now = Date.now();
  return rows
    .filter(k => Number(k[6]) < now)
    .slice(-limit)
    .map(k => ({
      openTime: Number(k[0]),
      open: Number(k[1]),
      high: Number(k[2]),
      low: Number(k[3]),
      close: Number(k[4]),
      volume: Number(k[5]),
      quoteVolume: Number(k[7]),
    }));
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
