/**
 * ATR 타점 신호 생성 스크립트 (GitHub Actions에서 3시간마다 실행).
 * 바이낸스 SPOT/FUTURES 거래량 상위 코인의 UTC 일봉으로 ATR(14)을 계산해
 * 진입가·TP·SL·방향을 산출하고 signals.json 으로 저장한다.
 *
 * 서버(Actions)에서 도는 스크립트라 CORS와 무관하며, API 키가 필요 없다.
 * 계산 로직은 lib/atr.ts 와 동일하며 실데이터로 교차검증되었다.
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const SPOT_BASE = 'https://data-api.binance.vision/api/v3';
const FUT_BASE = 'https://fapi.binance.com/fapi/v1';
const TOP_N = 20;
const ATR_PERIOD = 14;
const TP_MULT = 1.5;
const SL_MULT = 1.0;

const STABLE = new Set([
  'USDC', 'FDUSD', 'TUSD', 'USD1', 'BUSD', 'DAI', 'USDP', 'USDD', 'RLUSD', 'PYUSD',
  'EUR', 'EURI', 'AEUR', 'GUSD', 'PAX', 'SUSD', 'USTC', 'XUSD', 'USDG',
]);

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'vixutil-signals' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

function computeATR(candles, period = ATR_PERIOD) {
  if (candles.length < period + 1) return null;
  const tr = [];
  for (let i = 1; i < candles.length; i++) {
    const h = candles[i].high, l = candles[i].low, pc = candles[i - 1].close;
    tr.push(Math.max(h - l, Math.abs(h - pc), Math.abs(l - pc)));
  }
  if (tr.length < period) return null;
  let atr = tr.slice(0, period).reduce((s, v) => s + v, 0) / period;
  for (let i = period; i < tr.length; i++) atr = (atr * (period - 1) + tr[i]) / period;
  return atr;
}

function sma(values, period) {
  if (values.length < period) return null;
  const slice = values.slice(-period);
  return slice.reduce((s, v) => s + v, 0) / period;
}

async function buildMarket(base, kind) {
  const tickers = await getJson(`${base}/ticker/24hr`);
  const tops = tickers
    .filter(x => x.symbol.endsWith('USDT'))
    .map(x => ({ ...x, baseAsset: x.symbol.slice(0, -4) }))
    .filter(x => !STABLE.has(x.baseAsset) && Number(x.lastPrice) > 0)
    .sort((a, b) => Number(b.quoteVolume) - Number(a.quoteVolume))
    .slice(0, TOP_N);

  const out = [];
  for (const t of tops) {
    try {
      const rows = await getJson(`${base}/klines?symbol=${t.symbol}&interval=1d&limit=30`);
      const candles = rows.map(k => ({ high: +k[2], low: +k[3], close: +k[4] }));
      const atr = computeATR(candles);
      if (!atr) continue;
      const entry = candles[candles.length - 1].close;
      const trend = sma(candles.map(c => c.close), 20);
      const side = trend == null ? 'long' : entry >= trend ? 'long' : 'short';
      const tpDist = atr * TP_MULT;
      const slDist = atr * SL_MULT;
      const tp = side === 'long' ? entry + tpDist : entry - tpDist;
      const sl = side === 'long' ? entry - slDist : entry + slDist;
      out.push({
        symbol: t.symbol,
        base: t.baseAsset,
        side,
        entry,
        tp,
        sl,
        atr,
        atrPct: (atr / entry) * 100,
        change24h: Number(t.priceChangePercent),
      });
    } catch (e) {
      console.warn(`skip ${kind} ${t.symbol}: ${e.message}`);
    }
  }
  return out;
}

async function main() {
  const [spot, futures] = await Promise.all([
    buildMarket(SPOT_BASE, 'spot'),
    buildMarket(FUT_BASE, 'futures'),
  ]);

  const payload = {
    generatedAt: new Date().toISOString(),
    tpMult: TP_MULT,
    slMult: SL_MULT,
    atrPeriod: ATR_PERIOD,
    spot,
    futures,
  };

  mkdirSync('public/data', { recursive: true });
  writeFileSync('public/data/signals.json', JSON.stringify(payload, null, 2));
  console.log(`signals.json written: spot=${spot.length}, futures=${futures.length}, at ${payload.generatedAt}`);
}

main().catch(e => { console.error(e); process.exit(1); });
