'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { computeATR, computeTpSl, formatPrice, type Direction } from '@/lib/atr';
import { fetchTopSymbols, fetchDailyCandles, mapWithConcurrency } from '@/lib/binance';

interface Row {
  rank: number;
  symbol: string;
  base: string;
  lastPrice: number;
  priceChangePercent: number;
  atr: number | null;
  atrPct: number | null;
}

type LoadState = 'loading' | 'ready' | 'error';

const inputCls = 'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition';

export default function AtrTpslPage() {
  const [state, setState] = useState<LoadState>('loading');
  const [rows, setRows] = useState<Row[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  const [selected, setSelected] = useState<string | null>(null);
  const [entry, setEntry] = useState('');
  const [direction, setDirection] = useState<Direction>('long');
  const [tpMult, setTpMult] = useState('1.5');
  const [slMult, setSlMult] = useState('1');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const tops = await fetchTopSymbols(20);
      const candlesList = await mapWithConcurrency(tops, 6, async t => {
        try { return await fetchDailyCandles(t.symbol, 20); } catch { return null; }
      });
      const next: Row[] = tops.map((t, i) => {
        const candles = candlesList[i];
        const atr = candles ? computeATR(candles, 14) : null;
        return {
          rank: i + 1,
          symbol: t.symbol,
          base: t.base,
          lastPrice: t.lastPrice,
          priceChangePercent: t.priceChangePercent,
          atr,
          atrPct: atr && t.lastPrice > 0 ? (atr / t.lastPrice) * 100 : null,
        };
      });
      setRows(next);
      setUpdatedAt(new Date());
      setState('ready');
      if (!selected && next.length) {
        setSelected(next[0].symbol);
        setEntry(String(next[0].lastPrice));
      }
    } catch {
      setState('error');
    }
  }, [selected]);

  useEffect(() => { load(); /* on mount */ // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedRow = useMemo(() => rows.find(r => r.symbol === selected) ?? null, [rows, selected]);

  function pickRow(row: Row) {
    setSelected(row.symbol);
    setEntry(String(row.lastPrice));
  }

  const calc = useMemo(() => {
    const e = Number(entry);
    const atr = selectedRow?.atr;
    const tm = Number(tpMult);
    const sm = Number(slMult);
    if (!e || !atr || !tm || sm <= 0) return null;
    return computeTpSl(e, atr, direction, tm, sm);
  }, [entry, selectedRow, direction, tpMult, slMult]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-600 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-200">·</span>
          <span className="text-sm font-semibold text-slate-700">ATR TP/SL Calculator</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">📊</div>
          <h1 className="text-2xl font-black text-slate-900 mb-1.5">ATR-based TP/SL Calculator</h1>
          <p className="text-slate-500 text-sm">Compute take-profit / stop-loss from the daily ATR(14) of top-volume Binance coins</p>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 text-xs text-amber-800 leading-relaxed">
          <p className="font-bold mb-1">⚠️ Not investment advice</p>
          <p>This tool fetches Binance public market data in your browser and computes the ATR (average true range). TP/SL are volatility-based reference values only — nothing here is a trade recommendation, and all decisions and risks are your own.</p>
        </div>

        {/* Volatility ranking table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Top 20 by volume · Daily ATR</p>
            <button
              onClick={load}
              disabled={state === 'loading'}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 disabled:text-slate-300 transition-colors"
            >
              {state === 'loading' ? 'Loading…' : '↻ Refresh'}
            </button>
          </div>

          {state === 'loading' && (
            <div className="py-16 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
              <span className="text-sm font-bold text-slate-500">Loading prices from Binance...</span>
            </div>
          )}

          {state === 'error' && (
            <div className="py-12 px-4 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl">⚠️</span>
              <span className="text-sm font-bold text-rose-600">Couldn&apos;t load prices</span>
              <span className="text-xs text-rose-400">Check your connection and refresh. Binance may be restricted in some regions.</span>
              <button onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
            </div>
          )}

          {state === 'ready' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] text-slate-400 border-b border-slate-100">
                    <th className="text-left font-semibold px-4 py-2">#</th>
                    <th className="text-left font-semibold px-2 py-2">Coin</th>
                    <th className="text-right font-semibold px-2 py-2">Price</th>
                    <th className="text-right font-semibold px-2 py-2">24h</th>
                    <th className="text-right font-semibold px-4 py-2">ATR%</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr
                      key={r.symbol}
                      onClick={() => pickRow(r)}
                      className={`border-b border-slate-50 cursor-pointer transition-colors ${selected === r.symbol ? 'bg-amber-50' : 'hover:bg-slate-50'}`}
                    >
                      <td className="px-4 py-2.5 text-slate-400">{r.rank}</td>
                      <td className="px-2 py-2.5 font-bold text-slate-800">{r.base}<span className="text-slate-300 font-medium">/USDT</span></td>
                      <td className="px-2 py-2.5 text-right text-slate-700">{formatPrice(r.lastPrice)}</td>
                      <td className={`px-2 py-2.5 text-right font-semibold ${r.priceChangePercent >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {r.priceChangePercent >= 0 ? '+' : ''}{r.priceChangePercent.toFixed(2)}%
                      </td>
                      <td className="px-4 py-2.5 text-right font-bold text-amber-600">{r.atrPct != null ? r.atrPct.toFixed(2) + '%' : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {updatedAt && (
                <p className="text-[11px] text-slate-300 px-4 py-2 text-right">
                  as of {updatedAt.toLocaleTimeString('en-US')} · tap a row to load it into the calculator below
                </p>
              )}
            </div>
          )}
        </div>

        {/* TP/SL calculator */}
        {selectedRow && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">TP/SL Calculation</p>
              <span className="text-sm font-black text-slate-800">{selectedRow.base}/USDT</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="col-span-2 flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
                <span className="text-xs text-slate-500">Daily ATR(14)</span>
                <span className="text-sm font-bold text-slate-800">
                  {selectedRow.atr != null ? formatPrice(selectedRow.atr) : '-'}
                  {selectedRow.atrPct != null && <span className="text-amber-600"> ({selectedRow.atrPct.toFixed(2)}%)</span>}
                </span>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Entry price (USDT)</label>
                <input type="number" value={entry} onChange={e => setEntry(e.target.value)} className={inputCls} />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Direction</label>
                <div className="flex gap-2">
                  {([['long', 'Long (buy)'], ['short', 'Short (sell)']] as [Direction, string][]).map(([d, label]) => (
                    <button
                      key={d}
                      onClick={() => setDirection(d)}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-colors ${
                        direction === d
                          ? d === 'long' ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-rose-500 border-rose-500 text-white'
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">TP multiplier (×ATR)</label>
                <input type="number" step="0.1" value={tpMult} onChange={e => setTpMult(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">SL multiplier (×ATR)</label>
                <input type="number" step="0.1" value={slMult} onChange={e => setSlMult(e.target.value)} className={inputCls} />
              </div>
            </div>

            {calc && (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-xs text-emerald-600 font-semibold mb-1">🎯 Take Profit (TP)</p>
                  <p className="text-lg font-black text-emerald-700">{formatPrice(calc.tp)}</p>
                  <p className="text-xs text-emerald-600 mt-0.5">{direction === 'long' ? '+' : '-'}{calc.tpDistPct.toFixed(2)}%</p>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <p className="text-xs text-rose-500 font-semibold mb-1">🛑 Stop Loss (SL)</p>
                  <p className="text-lg font-black text-rose-600">{formatPrice(calc.sl)}</p>
                  <p className="text-xs text-rose-500 mt-0.5">{direction === 'long' ? '-' : '+'}{calc.slDistPct.toFixed(2)}%</p>
                </div>
                <div className="col-span-2 flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
                  <span className="text-xs text-slate-500">Risk : Reward</span>
                  <span className="text-sm font-bold text-slate-800">1 : {calc.riskReward.toFixed(2)}</span>
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              TP/SL = entry {direction === 'long' ? '± ' : '∓ '}ATR × multiplier. ATR is the 14-day average daily range, so a
              1.5× multiplier sets the take-profit 1.5× the recent average daily move away from entry. Higher-volatility coins get wider levels.
            </p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
