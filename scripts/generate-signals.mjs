/**
 * ATR 타점 신호 생성/갱신 스크립트 (GitHub Actions, UTC 3시간마다).
 *
 * 타이밍 로직:
 *  - 00:00 UTC (또는 기존 데이터가 없거나 날짜가 바뀐 경우): 그날의 전략을 새로
 *    생성한다. 방금 마감된 일봉 기준으로 진입가·ATR·TP·SL·방향을 확정하고,
 *    이 값은 하루 동안 고정된다.
 *  - 03/06/09/12/15/18/21 UTC: 전략(진입가·TP·SL)은 그대로 두고, 현재가 대비
 *    수익률(pnl)만 갱신한다.
 *
 * 서버(Actions)에서 도는 스크립트라 CORS 무관, API 키 불필요.
 * 현물·선물은 서로 독립적으로 처리해 한쪽이 실패(예: 지역 차단)해도 다른 쪽은 저장한다.
 */
import { writeFileSync, mkdirSync } from 'node:fs';

const SPOT_BASE = 'https://data-api.binance.vision/api/v3';
const FUT_BASE = 'https://fapi.binance.com/fapi/v1';
const EXISTING_URL = 'https://raw.githubusercontent.com/hiisk/vixutil/data/signals.json';
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
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
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
  return values.slice(-period).reduce((s, v) => s + v, 0) / period;
}

function pnlOf(side, entry, price) {
  if (!price || !entry) return null;
  const raw = ((price - entry) / entry) * 100;
  return side === 'long' ? raw : -raw;
}

/** 하루 전략을 새로 생성한다(마감된 일봉만 사용). */
async function buildStrategy(base) {
  const tickers = await getJson(`${base}/ticker/24hr`);
  const tops = tickers
    .filter(x => x.symbol.endsWith('USDT'))
    .map(x => ({ ...x, baseAsset: x.symbol.slice(0, -4) }))
    .filter(x => !STABLE.has(x.baseAsset) && Number(x.lastPrice) > 0)
    .sort((a, b) => Number(b.quoteVolume) - Number(a.quoteVolume))
    .slice(0, TOP_N);

  const now = Date.now();
  const out = [];
  for (const t of tops) {
    try {
      const rows = await getJson(`${base}/klines?symbol=${t.symbol}&interval=1d&limit=30`);
      // 진행 중(미마감) 캔들은 제외 — closeTime(index 6)이 미래면 아직 안 닫힌 봉이다.
      const completed = rows.filter(k => Number(k[6]) < now);
      const candles = completed.map(k => ({ high: +k[2], low: +k[3], close: +k[4] }));
      const atr = computeATR(candles);
      if (!atr) continue;
      const entry = candles[candles.length - 1].close; // 방금 마감된 일봉 종가 = 오늘 시가
      const trend = sma(candles.map(c => c.close), 20);
      const side = trend == null ? 'long' : entry >= trend ? 'long' : 'short';
      const tpDist = atr * TP_MULT, slDist = atr * SL_MULT;
      const tp = side === 'long' ? entry + tpDist : entry - tpDist;
      const sl = side === 'long' ? entry - slDist : entry + slDist;
      out.push({
        symbol: t.symbol, base: t.baseAsset, side,
        entry, tp, sl, atr, atrPct: (atr / entry) * 100,
        change24h: Number(t.priceChangePercent),
        currentPrice: Number(t.lastPrice),
        pnl: pnlOf(side, entry, Number(t.lastPrice)),
      });
    } catch (e) {
      console.warn(`  skip ${t.symbol}: ${e.message}`);
    }
  }
  return out;
}

/** 기존 전략을 유지하고 현재가·수익률만 갱신한다. */
async function refreshPnl(base, signals) {
  if (!signals?.length) return signals ?? [];
  const arr = await getJson(`${base}/ticker/price`);
  const price = {};
  for (const p of arr) price[p.symbol] = Number(p.price);
  return signals.map(s => {
    const live = price[s.symbol] ?? s.currentPrice ?? s.entry;
    return { ...s, currentPrice: live, pnl: pnlOf(s.side, s.entry, live) };
  });
}

async function fetchExisting() {
  try {
    const res = await fetch(`${EXISTING_URL}?t=${Date.now()}`);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

function sameUtcDay(a, b) {
  return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
}

async function main() {
  const now = new Date();
  const existing = await fetchExisting();
  const strategyStale = !existing?.strategyDate || !sameUtcDay(new Date(existing.strategyDate), now);
  const isDailyReset = now.getUTCHours() === 0 || strategyStale;

  console.log(`UTC ${now.toISOString()} · ${isDailyReset ? '전략 재생성(daily reset)' : '수익률만 갱신(3h refresh)'}`);

  async function forMarket(base, name) {
    if (isDailyReset) {
      console.log(`[${name}] 전략 생성...`);
      return buildStrategy(base);
    }
    console.log(`[${name}] 수익률 갱신...`);
    return refreshPnl(base, existing?.[name] ?? []);
  }

  const [spotR, futR] = await Promise.allSettled([forMarket(SPOT_BASE, 'spot'), forMarket(FUT_BASE, 'futures')]);

  const spot = spotR.status === 'fulfilled' ? spotR.value : (existing?.spot ?? []);
  const futures = futR.status === 'fulfilled' ? futR.value : (existing?.futures ?? []);
  if (spotR.status === 'rejected') console.error(`[spot] 실패: ${spotR.reason?.message ?? spotR.reason}`);
  if (futR.status === 'rejected') console.error(`[futures] 실패: ${futR.reason?.message ?? futR.reason}`);

  // 둘 다 실패했고 기존 데이터도 없으면 신호가 없는 셈 → 실패로 종료
  if (!spot.length && !futures.length) {
    throw new Error('현물·선물 모두 데이터를 가져오지 못했습니다 (지역 차단 가능성 — 로그의 HTTP 상태 확인)');
  }

  const payload = {
    strategyDate: isDailyReset ? now.toISOString() : existing.strategyDate,
    generatedAt: now.toISOString(),
    tpMult: TP_MULT, slMult: SL_MULT, atrPeriod: ATR_PERIOD,
    spot, futures,
  };

  mkdirSync('public/data', { recursive: true });
  writeFileSync('public/data/signals.json', JSON.stringify(payload, null, 2));
  console.log(`✅ signals.json 저장: spot=${spot.length}, futures=${futures.length}`);
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
