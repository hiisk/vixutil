'use client';
import { useState, useEffect, useCallback } from 'react';
import { formatPrice } from '@/lib/atr';
import { fetchTickers, fetchDailyCandles } from '@/lib/binance';
import { buildForecast, greenDays, volatilityLabel, trendConfidenceLabel, HORIZONS, T_CRIT, type ForecastModel } from '@/lib/forecast';
import { sma, rsi } from '@/lib/strategies';
import { symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo, Sparkline, Pct } from '@/components/crypto/ui';

const HISTORY_DAYS = 365;

interface Snapshot {
  price: number;
  chg24h: number;
  model: ForecastModel;
  closes: number[];
  sma50: number | null;
  sma200: number | null;
  rsi14: number | null;
  green: { green: number; total: number };
}

type State = 'loading' | 'ready' | 'nodata' | 'error';

const VOL_CLR: Record<string, string> = {
  Low: 'text-emerald-400', Medium: 'text-amber-400', High: 'text-orange-400', Extreme: 'text-rose-400',
};

/** RSI 해석 — 색만이 아니라 라벨로도 상태를 알린다 */
function rsiLabel(r: number): { text: string; cls: string } {
  if (r >= 70) return { text: 'Overbought', cls: 'text-rose-400' };
  if (r <= 30) return { text: 'Oversold', cls: 'text-emerald-400' };
  return { text: 'Neutral', cls: 'text-slate-400' };
}

export default function CoinPrediction({ coin }: { coin: CoinMeta }) {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const symbol = symbolOf(coin);
      const [tickers, candles] = await Promise.all([
        fetchTickers('spot'),
        fetchDailyCandles(symbol, HISTORY_DAYS, 'spot'),
      ]);
      const t = tickers.find(x => x.base === coin.base);
      if (!t) { setState('nodata'); return; }

      const closes = candles.map(c => c.close);
      const model = buildForecast(closes, t.lastPrice);
      if (!model) { setState('nodata'); return; }

      setSnap({
        price: t.lastPrice,
        chg24h: t.priceChangePercent,
        model,
        closes,
        sma50: sma(closes, 50),
        sma200: sma(closes, 200),
        rsi14: rsi(closes, 14),
        green: greenDays(closes, 30),
      });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  useEffect(() => { load(); }, [load]);

  if (state === 'loading') {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-400">Loading {coin.name} market data…</span>
      </div>
    );
  }

  if (state === 'error' || state === 'nodata') {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span className="text-3xl">{state === 'nodata' ? '📉' : '⚠️'}</span>
        <span className="text-sm font-bold text-rose-400">
          {state === 'nodata' ? `Not enough price history for ${coin.name}` : 'Couldn’t load market data'}
        </span>
        <span className="text-xs text-slate-500">
          {state === 'nodata' ? 'A projection needs at least 60 days of daily closes.' : 'Binance may be restricted in your region'}
        </span>
        <button onClick={load} className="mt-2 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl px-4 py-2">Retry</button>
      </div>
    );
  }

  const s = snap!;
  const m = s.model;
  const volLabel = volatilityLabel(m.annualVolPct);
  const trendLabel = trendConfidenceLabel(m.shrink);
  const greenPct = s.green.total ? Math.round((s.green.green / s.green.total) * 100) : 0;
  const short = HORIZONS.filter(h => ['1d', '1w', '1m'].includes(h.key));

  return (
    <>
      {/* Hero */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CoinLogo base={coin.base} size={40} />
            <div>
              <h1 className="text-xl font-black text-white leading-tight">{coin.name} Price Prediction</h1>
              <p className="text-xs text-slate-500 font-semibold">{coin.base} · Binance spot</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-black text-white tabular-nums">${formatPrice(s.price)}</p>
              <p className="text-xs"><Pct value={s.chg24h} /> <span className="text-slate-600">24h</span></p>
            </div>
            <Sparkline points={s.closes.slice(-30).concat(s.price)} w={110} h={36} />
          </div>
        </div>
      </div>

      {/* 단기 예측 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {short.map(h => {
          const p = m.projections.find(x => x.key === h.key)!;
          return (
            <div key={h.key} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1.5">{h.label}</p>
              <p className="text-xl font-black text-white tabular-nums">${formatPrice(p.median)}</p>
              <p className="text-[11px] text-slate-500 tabular-nums mt-1">
                80% range <span className="text-slate-400">${formatPrice(p.low)} – ${formatPrice(p.high)}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* 전체 기간 표 */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden mb-5">
        <div className="px-4 py-3 border-b border-slate-800">
          <h2 className="text-sm font-black text-white">{coin.name} projection by horizon</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                <th className="text-left font-semibold px-4 py-3">Period</th>
                <th className="text-right font-semibold px-3 py-3">Low (P10)</th>
                <th className="text-right font-semibold px-3 py-3">Median</th>
                <th className="text-right font-semibold px-3 py-3">High (P90)</th>
                <th className="text-right font-semibold px-4 py-3">Median vs now</th>
              </tr>
            </thead>
            <tbody>
              {m.projections.map(p => (
                <tr key={p.key} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-300">{p.label}</td>
                  <td className="px-3 py-3 text-right text-rose-400/80 tabular-nums">${formatPrice(p.low)}</td>
                  <td className="px-3 py-3 text-right text-white font-bold tabular-nums">${formatPrice(p.median)}</td>
                  <td className="px-3 py-3 text-right text-emerald-400/80 tabular-nums">${formatPrice(p.high)}</td>
                  <td className="px-4 py-3 text-right"><Pct value={p.changePct} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500">
          The 80% range means: if the measured volatility keeps holding, the price lands inside this band 8 times out of 10. It is not a floor or a ceiling.
        </div>
      </div>

      {/* 기술적 요약 */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden mb-5">
        <div className="px-4 py-3 border-b border-slate-800">
          <h2 className="text-sm font-black text-white">{coin.base} technical summary</h2>
        </div>
        <dl className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-slate-800/60">
          <div className="p-4">
            <dt className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Annual volatility</dt>
            <dd className="text-lg font-black tabular-nums text-white">
              {m.annualVolPct.toFixed(1)}% <span className={`text-xs font-bold ${VOL_CLR[volLabel]}`}>{volLabel}</span>
            </dd>
          </div>
          <div className="p-4">
            <dt className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Green days (30d)</dt>
            <dd className="text-lg font-black tabular-nums text-white">{s.green.green}/{s.green.total} <span className="text-xs text-slate-500">{greenPct}%</span></dd>
          </div>
          <div className="p-4">
            <dt className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">Trend significance</dt>
            <dd className="text-lg font-black text-white">
              {trendLabel} <span className="text-xs text-slate-500 tabular-nums">t={m.tStat.toFixed(2)}</span>
            </dd>
          </div>
          <div className="p-4">
            <dt className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">50-day SMA</dt>
            <dd className="text-lg font-black tabular-nums text-white">{s.sma50 != null ? `$${formatPrice(s.sma50)}` : '-'}</dd>
          </div>
          <div className="p-4">
            <dt className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">200-day SMA</dt>
            <dd className="text-lg font-black tabular-nums text-white">{s.sma200 != null ? `$${formatPrice(s.sma200)}` : '-'}</dd>
          </div>
          <div className="p-4">
            <dt className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">14-day RSI</dt>
            <dd className="text-lg font-black tabular-nums text-white">
              {s.rsi14 != null ? (
                <>{s.rsi14.toFixed(1)} <span className={`text-xs font-bold ${rsiLabel(s.rsi14).cls}`}>{rsiLabel(s.rsi14).text}</span></>
              ) : '-'}
            </dd>
          </div>
        </dl>
      </div>

      {/* 방법론 — 왜 중앙값이 평평한지 밝힌다 */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 mb-5 text-xs text-slate-500 leading-relaxed">
        <h2 className="text-sm font-black text-slate-300 mb-2">How this {coin.name} prediction is made</h2>
        <p className="mb-2">
          We take {m.samples + 1} daily closes from Binance, convert them to log returns, and estimate a drift (μ) and a volatility (σ).
          {coin.base}&apos;s measured annual volatility is <b className="text-slate-400">{m.annualVolPct.toFixed(1)}%</b>.
        </p>
        <p className="mb-2">
          The drift&apos;s t-statistic is <b className="text-slate-400">{m.tStat.toFixed(2)}</b>
          {m.shrink === 0
            ? ` — it does not clear the conventional |t| ≥ ${T_CRIT} significance bar, meaning the historical trend cannot be told apart from random noise. We therefore discard the drift entirely and anchor the median at today’s price, rather than compound noise over years and dress it up as a forecast.`
            : `, which clears the |t| ≥ ${T_CRIT} significance bar, so we keep ${(m.shrink * 100).toFixed(0)}% of the measured drift (a positive-part James-Stein shrinkage of max(0, 1 - (${T_CRIT}/t)²)) and cap it at ±1.0 annual log drift.`}
        </p>
        <p>
          Prices are then projected as a geometric Brownian motion: the median is spot·exp(μt) and the 80% range is spot·exp(μt ± 1.28·σ√t).
          Because uncertainty grows with √t, the band widens sharply with the horizon — that widening, not the median, is the real content of a long-term projection.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-500 leading-relaxed">
        <p>
          ⚠️ Not investment advice. This page contains statistical projections of a price distribution, not a forecast of what {coin.name} will do.
          The model knows nothing about news, regulation, liquidity or market structure. All trading decisions and risks are your own.
        </p>
      </div>
    </>
  );
}
