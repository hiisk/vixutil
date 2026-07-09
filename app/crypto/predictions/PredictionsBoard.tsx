'use client';
import { useState, useEffect, useCallback, useMemo, useRef, useReducer } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import { fetchTickers, fetchDailyCandles, mapWithConcurrency, type Ticker24h } from '@/lib/binance';
import { buildForecast, HORIZONS, type ForecastModel } from '@/lib/forecast';
import { COINS, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo, Sparkline, Pct, compactPrice } from '@/components/crypto/ui';

const PER_PAGE = 25;
/** drift·sigma 추정에 쓰는 일봉 수. 많을수록 추정이 안정적이다(바이낸스 limit 상한 1000). */
const HISTORY_DAYS = 365;

interface Row {
  coin: CoinMeta;
  price: number;
  chg: number;
  vol: number;
}

/** 심볼별 계산 결과. undefined = 미계산, model=null = 데이터 부족(신규 상장 등) */
interface Entry {
  model: ForecastModel | null;
  spark: number[];
}

type ListState = 'loading' | 'ready' | 'error';

export default function PredictionsBoard() {
  const [listState, setListState] = useState<ListState>('loading');
  const [rows, setRows] = useState<Row[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [computing, setComputing] = useState(false);

  const cacheRef = useRef<Map<string, Entry>>(new Map());
  const [, bump] = useReducer((x: number) => x + 1, 0);

  const load = useCallback(async () => {
    setListState('loading');
    try {
      const tickers = await fetchTickers('spot');
      const byBase = new Map(tickers.map((t: Ticker24h) => [t.base, t]));
      // 큐레이션한 코인 중 현재 거래 중인 것만, 거래량 순으로
      const next: Row[] = COINS.flatMap(coin => {
        const t = byBase.get(coin.base);
        return t ? [{ coin, price: t.lastPrice, chg: t.priceChangePercent, vol: t.quoteVolume }] : [];
      }).sort((a, b) => b.vol - a.vol);
      setRows(next);
      setListState('ready');
    } catch {
      setListState('error');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return rows;
    return rows.filter(r => r.coin.base.includes(q) || r.coin.name.toUpperCase().includes(q));
  }, [rows, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageRows = useMemo(() => filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE), [filtered, page]);

  useEffect(() => { setPage(1); }, [query]);

  // 보이는 페이지의 코인만 지연 계산 — 한 번에 86개 klines를 쏘지 않는다
  useEffect(() => {
    if (listState !== 'ready' || !pageRows.length) return;
    const todo = pageRows.filter(r => !cacheRef.current.has(r.coin.base));
    if (!todo.length) return;
    let cancelled = false;
    setComputing(true);
    mapWithConcurrency(todo, 6, async r => {
      let entry: Entry = { model: null, spark: [] };
      try {
        const candles = await fetchDailyCandles(symbolOf(r.coin), HISTORY_DAYS, 'spot');
        const closes = candles.map(c => c.close);
        entry = { model: buildForecast(closes, r.price), spark: closes.slice(-7) };
      } catch { /* 데이터 없음 → model null 유지 */ }
      if (!cancelled) cacheRef.current.set(r.coin.base, entry);
    }).then(() => {
      if (cancelled) return;
      setComputing(false);
      bump();
    });
    return () => { cancelled = true; };
  }, [listState, pageRows]);

  const th = 'text-right font-semibold px-2 py-3';

  return (
    <>
      <div className="relative mb-4">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-sm pointer-events-none">🔍</span>
        <input
          type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search coin (e.g. BTC, Bitcoin, Solana)"
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 transition"
        />
        {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300">✕</button>}
      </div>

      {listState === 'loading' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 py-20 flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
          <span className="text-sm font-bold text-slate-400">Loading market data…</span>
        </div>
      )}

      {listState === 'error' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 py-20 flex flex-col items-center gap-3">
          <span className="text-3xl">⚠️</span>
          <span className="text-sm font-bold text-rose-400">Couldn&apos;t load prices</span>
          <span className="text-xs text-slate-500">Binance may be restricted in your region</span>
          <button onClick={load} className="mt-2 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl px-4 py-2">Retry</button>
        </div>
      )}

      {listState === 'ready' && (
        <>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                    <th className="sticky left-0 z-20 bg-slate-900 text-left font-semibold px-4 py-3">Coin</th>
                    <th className={th}>Price</th>
                    <th className="text-right font-semibold px-2 py-3">7d</th>
                    {HORIZONS.map(h => (
                      <th key={h.key} className={`${th} border-l border-slate-800/70`}>{h.short}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((r, i) => {
                    const entry = cacheRef.current.get(r.coin.base);
                    const pending = entry === undefined;
                    const model = entry?.model ?? null;
                    return (
                      <tr key={r.coin.base} className="group border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                        <td className="sticky left-0 z-10 bg-slate-900 p-0 border-b border-slate-800/50">
                          <Link href={`/crypto/${r.coin.slug}/price-prediction`} className="block px-4 py-3 group-hover:bg-slate-800/40 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600 text-xs tabular-nums w-5 shrink-0">{(page - 1) * PER_PAGE + i + 1}</span>
                              <CoinLogo base={r.coin.base} />
                              <span className="font-bold text-white">{r.coin.name}</span>
                              <span className="text-slate-500 text-xs font-semibold">{r.coin.base}</span>
                            </div>
                          </Link>
                        </td>
                        <td className="px-2 py-3 text-right tabular-nums">
                          <div className="flex flex-col items-end leading-tight">
                            <span className="text-white">${formatPrice(r.price)}</span>
                            <span className="text-[10px] opacity-70"><Pct value={r.chg} /></span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-right">
                          {entry && entry.spark.length > 1
                            ? <Sparkline points={[...entry.spark, r.price]} w={64} h={24} />
                            : <span className="text-slate-700">{pending ? '…' : '-'}</span>}
                        </td>
                        {HORIZONS.map(h => {
                          const p = model?.projections.find(x => x.key === h.key);
                          return (
                            <td key={h.key} className="px-2 py-3 text-right border-l border-slate-800/40">
                              {p ? (
                                <div className="flex flex-col items-end leading-tight">
                                  <span className="text-white tabular-nums">${compactPrice(p.median)}</span>
                                  <span className="text-[10px] text-slate-500 tabular-nums">{compactPrice(p.low)} – {compactPrice(p.high)}</span>
                                </div>
                              ) : (
                                <span className="text-slate-600 text-xs">{pending ? '…' : '-'}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  {pageRows.length === 0 && (
                    <tr><td colSpan={3 + HORIZONS.length} className="px-4 py-12 text-center text-sm text-slate-500">No coins match &quot;{query}&quot;</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500">
              Each cell shows the <b className="text-slate-400">median</b> projection with the <b className="text-slate-400">80% range</b> (P10 – P90) below it.
              {computing && <span className="text-amber-500/80"> · calculating…</span>}
            </div>
            <div className="px-4 pb-3 text-[11px] text-slate-600">{filtered.length} coins · projections from {HISTORY_DAYS} days of daily closes</div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600">« First</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600">‹ Prev</button>
            <span className="px-3 text-sm font-bold text-slate-300 tabular-nums">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600">Next ›</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600">Last »</button>
          </div>
        </>
      )}
    </>
  );
}
