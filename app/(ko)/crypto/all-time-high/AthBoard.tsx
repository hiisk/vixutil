'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import { fetchTopSymbols, fetchDailyCandles, mapWithConcurrency } from '@/lib/binance';
import { athInfo, recoveryGainPct, type AthInfo } from '@/lib/ath';
import { COINS } from '@/lib/coins';
import { CoinLogo, formatVolume } from '@/components/crypto/ui';

/** 표에 올릴 코인 수 */
const UNIVERSE = 60;
const CONCURRENCY = 6;
/** 바이낸스 1회 요청 상한 */
const HISTORY_DAYS = 1000;

type State = 'loading' | 'ready' | 'error';
type SortKey = 'drawdown' | 'recovery' | 'volume' | 'recent';

interface Row extends AthInfo {
  base: string;
  price: number;
  quoteVolume: number;
}

const slugOf = (base: string) => COINS.find(c => c.base === base)?.slug ?? null;

/** 하락 폭에 따라 강조 — 숫자와 함께 쓰고 색만으로 전달하지 않는다 */
function ddCls(v: number): string {
  if (v >= 90) return 'text-rose-600 dark:text-rose-400 font-bold';
  if (v >= 70) return 'text-rose-600/80 dark:text-rose-400/80';
  if (v >= 40) return 'text-amber-600 dark:text-amber-400';
  if (v >= 10) return 'text-slate-600 dark:text-slate-300';
  return 'text-emerald-600 dark:text-emerald-400';
}

const SORTS: [SortKey, string][] = [
  ['drawdown', 'Furthest from high'],
  ['recovery', 'Needs the biggest gain'],
  ['recent', 'Closest to its high'],
  ['volume', 'By volume'],
];

export default function AthBoard() {
  const [state, setState] = useState<State>('loading');
  const [rows, setRows] = useState<Row[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('drawdown');
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const tops = await fetchTopSymbols(UNIVERSE);
      const candles = await mapWithConcurrency(tops, CONCURRENCY, async t => {
        try { return await fetchDailyCandles(t.symbol, HISTORY_DAYS); } catch { return null; }
      });
      const out: Row[] = [];
      tops.forEach((t, i) => {
        const closes = (candles[i] ?? []).map(k => k.close);
        if (closes.length < 30) return;
        const a = athInfo(closes, t.lastPrice);
        if (!a) return;
        out.push({ ...a, base: t.base, price: t.lastPrice, quoteVolume: t.quoteVolume });
      });
      if (!out.length) { setState('error'); return; }
      setRows(out);
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const shown = useMemo(() => {
    const q = query.trim().toUpperCase();
    const list = q ? rows.filter(r => r.base.includes(q)) : rows;
    const sorted = [...list];
    if (sortKey === 'drawdown') sorted.sort((a, b) => b.drawdownPct - a.drawdownPct);
    else if (sortKey === 'recovery') sorted.sort((a, b) => b.gainToRecoverPct - a.gainToRecoverPct);
    else if (sortKey === 'recent') sorted.sort((a, b) => a.drawdownPct - b.drawdownPct);
    else sorted.sort((a, b) => b.quoteVolume - a.quoteVolume);
    return sorted;
  }, [rows, sortKey, query]);

  /** 요약 — 몇 개가 전고점 근처이고 몇 개가 반토막 아래인가 */
  const summary = useMemo(() => {
    if (!rows.length) return null;
    return {
      nearHigh: rows.filter(r => r.drawdownPct < 10).length,
      halved: rows.filter(r => r.drawdownPct >= 50).length,
      deep: rows.filter(r => r.drawdownPct >= 80).length,
      median: [...rows].sort((a, b) => a.drawdownPct - b.drawdownPct)[Math.floor(rows.length / 2)].drawdownPct,
    };
  }, [rows]);

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Reading {UNIVERSE} coins&apos; full history…</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div role="alert" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load market data</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">Binance may be restricted in your region</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* 비대칭을 먼저 보여준다 — 이 페이지의 요점이다 */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
        <h2 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1.5">A 50% drop needs a 100% gain</h2>
        <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed mb-3">
          Falling and recovering are not the same number, and the gap widens fast. This is the single most misread figure in a drawdown,
          so the table shows both: how far below the high a coin sits, and the gain required to get back.
        </p>
        <div className="flex flex-wrap gap-2">
          {[50, 70, 80, 90, 95].map(dd => (
            <span key={dd} className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-900/60 text-amber-900 dark:text-amber-200 border border-amber-500/25 tabular-nums">
              −{dd}% → +{recoveryGainPct(dd)!.toFixed(0)}%
            </span>
          ))}
        </div>
      </div>

      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            ['Within 10% of high', summary.nearHigh, 'text-emerald-600 dark:text-emerald-400'],
            ['Down 50% or more', summary.halved, 'text-amber-600 dark:text-amber-400'],
            ['Down 80% or more', summary.deep, 'text-rose-600 dark:text-rose-400'],
            ['Median drawdown', `−${summary.median.toFixed(0)}%`, 'text-slate-900 dark:text-white'],
          ].map(([label, v, cls]) => (
            <div key={label as string} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{label as string}</p>
              <p className={`text-xl font-bold tabular-nums ${cls as string}`}>{v as string | number}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="inline-flex flex-wrap rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
          {SORTS.map(([k, label]) => (
            <button key={k} type="button" aria-pressed={sortKey === k} onClick={() => setSortKey(k)}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                sortKey === k ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[150px]">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search ticker" aria-label="Search ticker"
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition" />
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="scroll-x overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Coin</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Price</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">All-time high</th>
                <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">From high</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">
                  To recover
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">gain needed</span>
                </th>
                <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">High set</th>
              </tr>
            </thead>
            <tbody>
              {shown.map(r => {
                const slug = slugOf(r.base);
                return (
                  <tr key={r.base} className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-2">
                        <CoinLogo base={r.base} size={20} />
                        {slug ? (
                          <Link href={`/crypto/${slug}/price-prediction`} className="font-bold text-slate-800 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400">{r.base}</Link>
                        ) : <span className="font-bold text-slate-800 dark:text-slate-100">{r.base}</span>}
                      </span>
                      <span className="block pl-7 text-[10px] text-slate-500 dark:text-slate-400 tabular-nums">{formatVolume(r.quoteVolume)}</span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-700 dark:text-slate-200">${formatPrice(r.price)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400">${formatPrice(r.ath)}</td>
                    <td className={`px-3 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${ddCls(r.drawdownPct)}`}>
                      {r.atHigh ? 'at high' : `−${r.drawdownPct.toFixed(1)}%`}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-bold text-amber-600 dark:text-amber-400">
                      {r.atHigh ? '—' : `+${r.gainToRecoverPct.toFixed(0)}%`}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400 text-[11px] border-l border-slate-200/40 dark:border-slate-700/40">
                      {r.atHigh ? 'today' : `${r.daysSince.toLocaleString()}d ago`}
                    </td>
                  </tr>
                );
              })}
              {shown.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500 dark:text-slate-400">No coin matches &quot;{query}&quot;</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Highs are the highest <b className="text-slate-600 dark:text-slate-300">daily close</b> in up to {HISTORY_DAYS.toLocaleString()} days of Binance
          history — not an intraday wick, and not a price from before the coin listed here. A coin that traded higher on another venue, or before its
          Binance listing, will show a high below its true record. Every model on this site is built on daily closes, so using the same basis keeps
          these figures consistent with the forecasts.
        </div>
      </div>
    </>
  );
}
