'use client';
import { useState, useEffect, useCallback, useMemo, useRef, useReducer } from 'react';
import Link from 'next/link';
import { formatPrice, type Direction } from '@/lib/atr';
import { computeStrategy, STRATEGY_META, type StrategyKey, type Bias, type StrategySignal } from '@/lib/strategies';
import { fetchTickers, fetchDailyCandles, mapWithConcurrency, type Market, type Ticker24h } from '@/lib/binance';

const BINANCE_REF = 'https://accounts.binance.com/register?ref=KLLDA01Q';
const BYBIT_REF = 'https://partner.bybit.com/b/127153';

/** 브랜드 아이콘 — 외부 요청/추적 없이 인라인 SVG로 렌더 */
function BinanceIcon() {
  return (
    <svg viewBox="0 0 126 126" className="w-6 h-6" aria-hidden="true">
      <path fill="#F3BA2F" d="M38.87 53.62 63 29.49l24.14 24.14 14.04-14.04L63 1.41 24.83 39.58zM1.4 63l14.04-14.04L29.48 63 15.44 77.04zM38.87 72.38 63 96.51l24.13-24.13 14.05 14.03L63 124.59 24.83 86.42zM96.52 63l14.04-14.04L124.6 63l-14.04 14.04zM77.25 62.99 63 48.74 52.46 59.28l-1.21 1.21-2.5 2.5L63 77.26z" />
    </svg>
  );
}
/** 공식 Bybit 워드마크(위키미디어). 어두운 배경용으로 글자는 밝게, 악센트는 골드 유지 */
function BybitWordmark({ className }: { className?: string }) {
  const L = '#F8FAFC';
  return (
    <svg viewBox="0 0 13547 4513" className={className} role="img" aria-label="Bybit">
      <polygon fill="#F6A500" points="9655,3480 9655,-1 10355,-1 10355,3480" />
      <path fill={L} d="M1500 4514l-1500 0 0 -3481 1440 0c700,0 1107,381 1107,978 0,386 -262,636 -443,719 216,98 493,318 493,782 0,650 -458,1002 -1097,1002zm-116 -2875l0 0 -685 0 0 802 685 0c297,0 463,-161 463,-401 0,-239 -166,-401 -463,-401zm45 1413l0 0 -730 0 0 856 730 0c317,0 468,-195 468,-430 0,-235 -151,-425 -468,-425z" />
      <polygon fill={L} points="4732,3086 4732,4514 4037,4514 4037,3086 2960,1033 3720,1033 4389,2436 5049,1033 5809,1033" />
      <path fill={L} d="M7793 4514l-1500 0 0 -3481 1440 0c700,0 1107,381 1107,978 0,386 -262,636 -443,719 216,98 493,318 493,782 0,650 -458,1002 -1097,1002zm-116 -2875l0 0 -685 0 0 802 685 0c297,0 463,-161 463,-401 0,-239 -166,-401 -463,-401zm45 1413l0 0 -730 0 0 856 730 0c317,0 468,-195 468,-430 0,-235 -151,-425 -468,-425z" />
      <polygon fill={L} points="12610,1639 12610,4514 11911,4514 11911,1639 10974,1639 10974,1033 13547,1033 13547,1639" />
    </svg>
  );
}

const PER_PAGE = 50;
const TP_MULT = 1.5;
const SL_MULT = 1.0;

type StratInfo = StrategySignal;

const BIAS_STYLE: Record<Bias, { label: string; cls: string }> = {
  bullish: { label: 'Bullish', cls: 'bg-emerald-500/15 text-emerald-400' },
  bearish: { label: 'Bearish', cls: 'bg-rose-500/15 text-rose-400' },
  neutral: { label: 'Neutral', cls: 'bg-slate-500/15 text-slate-400' },
};

type ListState = 'loading' | 'ready' | 'empty' | 'error';
type SortKey = 'volume' | 'atr' | 'pnl';
const STRATEGIES: StrategyKey[] = ['trend', 'bollinger', 'rsi', 'atr'];

function pnlOf(side: Direction, entry: number, price: number): number {
  const raw = ((price - entry) / entry) * 100;
  return side === 'long' ? raw : -raw;
}

function formatVolume(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}

export default function SignalsPage() {
  const [market, setMarket] = useState<Market>('futures');
  const [listState, setListState] = useState<ListState>('loading');
  const [tickers, setTickers] = useState<Ticker24h[]>([]);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('volume');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');
  const [strategy, setStrategy] = useState<StrategyKey>('trend');
  const [query, setQuery] = useState('');
  const [pageComputing, setPageComputing] = useState(false);
  const [fullCompute, setFullCompute] = useState<{ active: boolean; done: number; total: number }>({ active: false, done: 0, total: 0 });
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  // Signal cache: symbol -> info. undefined = not computed, null = insufficient data.
  // Reset when market or strategy changes (both alter the computed signal).
  const cacheRef = useRef<Map<string, StratInfo | null>>(new Map());
  const [, bump] = useReducer((x: number) => x + 1, 0);

  const loadList = useCallback(async (mkt: Market) => {
    setListState('loading');
    setPage(1);
    setSortKey('volume');
    cacheRef.current = new Map();
    setFullCompute({ active: false, done: 0, total: 0 });
    try {
      const t = await fetchTickers(mkt);
      setTickers(t);
      setUpdatedAt(new Date());
      setListState(t.length ? 'ready' : 'empty');
    } catch {
      setListState('error');
    }
  }, []);

  async function computeInfo(symbol: string, mkt: Market, strat: StrategyKey): Promise<StratInfo | null> {
    try {
      // SMA50 등 지표를 위해 마감 일봉 60개까지 사용
      const candles = await fetchDailyCandles(symbol, 60, mkt);
      return computeStrategy(candles, strat, mkt);
    } catch {
      return null;
    }
  }

  // Lazy: compute signals for the visible page only (used for Volume sort)
  const computePage = useCallback(async (list: Ticker24h[], mkt: Market, strat: StrategyKey) => {
    const todo = list.filter(t => !cacheRef.current.has(t.symbol));
    if (!todo.length) return;
    setPageComputing(true);
    await mapWithConcurrency(todo, 8, async t => {
      cacheRef.current.set(t.symbol, await computeInfo(t.symbol, mkt, strat));
    });
    setPageComputing(false);
    bump();
  }, []);

  // Full: compute signals for every coin (required to sort by ATR%/P&L across all coins)
  const computeAll = useCallback(async (list: Ticker24h[], mkt: Market, strat: StrategyKey) => {
    const todo = list.filter(t => !cacheRef.current.has(t.symbol));
    if (!todo.length) return;
    let done = list.length - todo.length;
    setFullCompute({ active: true, done, total: list.length });
    await mapWithConcurrency(todo, 8, async t => {
      cacheRef.current.set(t.symbol, await computeInfo(t.symbol, mkt, strat));
      done++;
      if (done % 8 === 0 || done === list.length) setFullCompute({ active: true, done, total: list.length });
    });
    setFullCompute({ active: false, done: list.length, total: list.length });
    bump();
  }, []);

  useEffect(() => { loadList(market); }, [market, loadList]);

  // Search filter (by base symbol), then sort. Volume sort is free (ticker order);
  // ATR%/P&L sorts read the ATR cache (require the full compute).
  const sortedTickers = useMemo(() => {
    const q = query.trim().toUpperCase();
    const base = q ? tickers.filter(t => t.base.includes(q)) : tickers;
    if (sortKey === 'volume') return base;
    const scored = base.map(t => {
      const info = cacheRef.current.get(t.symbol);
      const metric = info ? (sortKey === 'atr' ? info.atrPct : pnlOf(info.side, info.entry, t.lastPrice)) : null;
      return { t, metric };
    });
    scored.sort((a, b) => {
      if (a.metric == null && b.metric == null) return 0;
      if (a.metric == null) return 1;
      if (b.metric == null) return -1;
      return sortDir === 'desc' ? b.metric - a.metric : a.metric - b.metric;
    });
    return scored.map(x => x.t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickers, sortKey, sortDir, query, fullCompute.active]);

  const totalPages = Math.max(1, Math.ceil(sortedTickers.length / PER_PAGE));
  const pageTickers = useMemo(() => sortedTickers.slice((page - 1) * PER_PAGE, page * PER_PAGE), [sortedTickers, page]);

  // Trigger the right computation for the current sort/strategy.
  useEffect(() => {
    if (listState !== 'ready') return;
    if (sortKey === 'atr' || sortKey === 'pnl') computeAll(tickers, market, strategy);
    else if (pageTickers.length) computePage(pageTickers, market, strategy);
  }, [listState, sortKey, pageTickers, tickers, market, strategy, computeAll, computePage]);

  // 검색어가 바뀌면 첫 페이지로
  useEffect(() => { setPage(1); }, [query]);

  function selectSort(key: SortKey) {
    if (key !== 'volume' && sortKey === key) { setSortDir(d => (d === 'desc' ? 'asc' : 'desc')); return; }
    setSortKey(key);
    setPage(1);
    if (key !== 'volume') setSortDir('desc');
  }

  // 전략 변경: 신호가 달라지므로 캐시 초기화 후 재계산(effect가 처리)
  function selectStrategy(s: StrategyKey) {
    if (s === strategy) return;
    cacheRef.current = new Map();
    setStrategy(s);
    setPage(1);
    bump();
  }

  const updatedLabel = useMemo(
    () => (updatedAt ? updatedAt.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : null),
    [updatedAt],
  );

  const th = 'text-right font-semibold px-2 py-3';
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500" />

      <header className="border-b border-slate-800 sticky top-0 z-10 bg-slate-950/90 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/crypto" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-400 transition-colors font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Crypto Tools
          </Link>
          <span className="text-slate-700">·</span>
          <span className="text-sm font-semibold text-slate-300">Signal Board</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Referral links */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <a href={BYBIT_REF} target="_blank" rel="noopener noreferrer sponsored"
            className="group flex items-center gap-3 rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-yellow-600/[0.04] p-4 hover:border-yellow-400/60 hover:from-yellow-500/[0.16] transition-all">
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 mb-1">
                <BybitWordmark className="h-4 w-auto" />
                <span className="text-[9px] font-bold text-slate-500 border border-slate-700 rounded px-1 py-px">AD</span>
              </span>
              <span className="block text-[11px] text-slate-400 leading-snug">🔥 Claim $20, up to $30K rewards + fee discount</span>
            </span>
            <svg className="w-4 h-4 text-yellow-500/70 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>

          <a href={BINANCE_REF} target="_blank" rel="noopener noreferrer sponsored"
            className="group flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-amber-600/[0.04] p-4 hover:border-amber-400/60 hover:from-amber-500/[0.16] transition-all">
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 mb-1">
                <BinanceIcon />
                <span className="font-black text-amber-200 text-[15px] tracking-tight">BINANCE</span>
                <span className="text-[9px] font-bold text-slate-500 border border-slate-700 rounded px-1 py-px">AD</span>
              </span>
              <span className="block text-[11px] text-slate-400 leading-snug">🎁 10% off trading fees + up to $600 new-user bonus</span>
            </span>
            <svg className="w-4 h-4 text-amber-500/70 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📈</div>
          <h1 className="text-2xl font-black text-white mb-1.5">Crypto Signal Board</h1>
          <p className="text-slate-400 text-sm">Multi-strategy signals (Trend · Bollinger · RSI · ATR) with daily entry / TP / SL · live P&amp;L</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1">
            {(['spot', 'futures'] as Market[]).map(m => (
              <button key={m} onClick={() => setMarket(m)}
                className={`px-5 py-1.5 text-sm font-bold rounded-lg transition-colors ${market === m ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}>
                {m === 'spot' ? 'SPOT' : 'FUTURES'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Sort</span>
            <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1">
              <button onClick={() => selectSort('volume')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${sortKey === 'volume' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                Volume
              </button>
              <button onClick={() => selectSort('atr')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${sortKey === 'atr' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                ATR% {sortKey === 'atr' ? (sortDir === 'desc' ? '▼' : '▲') : ''}
              </button>
              <button onClick={() => selectSort('pnl')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${sortKey === 'pnl' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                P&amp;L {sortKey === 'pnl' ? (sortDir === 'desc' ? '▼' : '▲') : ''}
              </button>
            </div>
            <button onClick={() => loadList(market)} className="text-xs font-semibold text-slate-500 hover:text-amber-400 transition-colors">↻ Refresh</button>
          </div>
        </div>

        {/* Strategy selector */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-slate-500 shrink-0">Strategy</span>
          <div className="inline-flex flex-wrap rounded-xl border border-slate-800 bg-slate-900 p-1 gap-1">
            {STRATEGIES.map(s => (
              <button key={s} onClick={() => selectStrategy(s)} title={STRATEGY_META[s].blurb}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${strategy === s ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'}`}>
                {STRATEGY_META[s].label}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-600 hidden sm:block">{STRATEGY_META[strategy].blurb}</span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-sm pointer-events-none">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value.replace(/\s/g, ''))}
            placeholder="Search coin (e.g. BTC, SOL, PEPE)"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/60 transition"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors">✕</button>
          )}
        </div>

        {(listState === 'loading' || listState === 'empty' || listState === 'error') && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-20 flex flex-col items-center gap-3">
            {listState === 'loading' ? (
              <>
                <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
                <span className="text-sm font-bold text-slate-400">Loading market data...</span>
              </>
            ) : listState === 'error' ? (
              <>
                <span className="text-3xl">⚠️</span>
                <span className="text-sm font-bold text-rose-400">Couldn&apos;t load prices</span>
                <span className="text-xs text-slate-500">Binance may be restricted in your region</span>
                <button onClick={() => loadList(market)} className="mt-2 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-xl px-4 py-2 transition-colors">Retry</button>
              </>
            ) : (
              <><span className="text-3xl">🛠️</span><span className="text-sm font-bold text-slate-300">No data</span></>
            )}
          </div>
        )}

        {/* Full-compute progress (P&L sort) */}
        {listState === 'ready' && fullCompute.active && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-16 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
            <span className="text-sm font-bold text-slate-300">Calculating signals for all coins…</span>
            <span className="text-xs text-slate-500 tabular-nums">{fullCompute.done} / {fullCompute.total}</span>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${fullCompute.total ? (fullCompute.done / fullCompute.total) * 100 : 0}%` }} />
            </div>
          </div>
        )}

        {listState === 'ready' && !fullCompute.active && (
          <>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm whitespace-nowrap">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wide text-slate-500 border-b border-slate-800">
                      <th className="text-left font-semibold px-4 py-3">Coin</th>
                      <th className="text-left font-semibold px-2 py-3">Signal</th>
                      <th className={th}>Entry</th>
                      <th className={th}>Current</th>
                      <th className={th}>TP</th>
                      <th className={th}>SL</th>
                      <th className={th}>Volume</th>
                      <th className="text-right font-semibold px-4 py-3">P&amp;L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageTickers.map((t, i) => {
                      const info = cacheRef.current.get(t.symbol);
                      const pnl = info ? pnlOf(info.side, info.entry, t.lastPrice) : null;
                      const pending = info === undefined;
                      return (
                        <tr key={t.symbol} className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600 text-xs tabular-nums">{(page - 1) * PER_PAGE + i + 1}</span>
                              <span className="font-bold text-white">{t.base}</span>
                              {info && market === 'futures' && (
                                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${info.side === 'long' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                                  {info.side === 'long' ? 'LONG' : 'SHORT'}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500">{info ? `ATR ${info.atrPct.toFixed(1)}%` : pending ? 'calculating…' : 'no data'}</span>
                          </td>
                          <td className="px-2 py-3">
                            {info ? (
                              <div className="flex flex-col gap-0.5">
                                <span className={`inline-flex w-fit items-center text-[10px] font-black px-2 py-0.5 rounded ${BIAS_STYLE[info.bias].cls}`}>
                                  {info.bias === 'bullish' ? '🟢' : info.bias === 'bearish' ? '🔴' : '⚪'} {BIAS_STYLE[info.bias].label}
                                </span>
                                <span className="text-[10px] text-slate-500">{info.note}</span>
                              </div>
                            ) : (
                              <span className="text-slate-600 text-xs">{pending ? '…' : '-'}</span>
                            )}
                          </td>
                          <td className="px-2 py-3 text-right text-slate-300 tabular-nums">{info ? formatPrice(info.entry) : pending ? '…' : '-'}</td>
                          <td className="px-2 py-3 text-right text-white tabular-nums">{formatPrice(t.lastPrice)}</td>
                          <td className="px-2 py-3 text-right text-emerald-400 tabular-nums">{info ? formatPrice(info.tp) : pending ? '…' : '-'}</td>
                          <td className="px-2 py-3 text-right text-rose-400 tabular-nums">{info ? formatPrice(info.sl) : pending ? '…' : '-'}</td>
                          <td className="px-2 py-3 text-right text-slate-400 tabular-nums">{formatVolume(t.quoteVolume)}</td>
                          <td className="px-4 py-3 text-right tabular-nums font-bold">
                            {pnl == null ? (
                              <span className="text-slate-600">{pending ? '…' : '-'}</span>
                            ) : (
                              <span className={pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}%</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {pageTickers.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-500">
                          No coins match &ldquo;{query}&rdquo;
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500">
                <span>{market === 'spot' ? 'Spot' : 'Futures'} · {STRATEGY_META[strategy].label} · {query ? `${sortedTickers.length} / ` : ''}{tickers.length} coins · TP {TP_MULT}×ATR · SL {SL_MULT}×ATR{pageComputing ? ' · calculating…' : ''}</span>
                {updatedLabel && <span>🕒 {updatedLabel}</span>}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">« First</button>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">‹ Prev</button>
              <span className="px-3 text-sm font-bold text-slate-300 tabular-nums">{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">Next ›</button>
              <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-800 text-slate-400 disabled:opacity-30 hover:border-slate-600 transition-colors">Last »</button>
            </div>
          </>
        )}

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-500 leading-relaxed">
          <p className="mb-1">⚠️ Not investment advice — reference calculations only. All trading decisions and risks are your own.</p>
          <p>Signals come from the selected strategy (Trend = SMA 20/50, Bollinger = %B, RSI = 14, ATR = SMA20 trend). Entry / TP / SL are based on the last closed daily candle and ATR (TP {TP_MULT}× / SL {SL_MULT}×); P&amp;L is live from the current price. Spot is buy-only (long); LONG/SHORT direction applies to futures only.</p>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">🔄 Refresh to recalculate with the latest prices · Binance public market data</p>
      </div>
    </div>
  );
}
