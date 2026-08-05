'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import { fetchFullDailyKlines } from '@/lib/binance';
import { drawdownSummary, type DrawdownSummary } from '@/lib/drawdown';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

const SUGGEST_LIMIT = 8;
/** 표에 보여줄 구간 수 */
const TOP_EPISODES = 8;

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Snapshot {
  coin: CoinMeta;
  summary: DrawdownSummary;
  /** 인덱스 → UTC 자정 ms */
  dayAt: (i: number) => number;
  closeAt: (i: number) => number;
}

const inputCls =
  'w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition';

const ymd = (ms: number) => new Date(ms).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
const days = (n: number | null) => (n == null ? '—' : n >= 365 ? `${(n / 365).toFixed(1)} yr` : `${n} d`);

function depthCls(v: number): string {
  if (v >= 80) return 'text-rose-600 dark:text-rose-400 font-black';
  if (v >= 50) return 'text-rose-600/85 dark:text-rose-400/85 font-bold';
  if (v >= 30) return 'text-amber-600 dark:text-amber-400 font-bold';
  return 'text-slate-700 dark:text-slate-200';
}

export default function DrawdownBoard() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const k = await fetchFullDailyKlines(symbolOf(coin), marketOf(coin));
      if (k.length < 120) { setState('nodata'); return; }
      const summary = drawdownSummary(k.map(x => x.close));
      if (!summary) { setState('nodata'); return; }
      setSnap({
        coin,
        summary,
        dayAt: i => k[Math.min(Math.max(i, 0), k.length - 1)].openTime,
        closeAt: i => k[Math.min(Math.max(i, 0), k.length - 1)].close,
      });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  // 전체 이력은 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return COINS.filter(c => c.base.startsWith(q) || c.name.toUpperCase().includes(q)).slice(0, SUGGEST_LIMIT);
  }, [query]);

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); }

  const s = snap?.summary;

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-4">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="dd-coin">Coin</label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <input id="dd-coin" type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder={`${coin.base} · search another coin`} className={inputCls} autoComplete="off" />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
                {suggestions.map(c => (
                  <li key={c.slug}>
                    <button type="button" onClick={() => pickCoin(c)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <CoinLogo base={c.base} size={18} />
                      <span className="font-bold text-slate-800 dark:text-slate-100">{c.base}</span>
                      <span className="text-slate-500 dark:text-slate-400 truncate">{c.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {state === 'ready' && snap && s && (
            <div className="flex items-center gap-2.5">
              <CoinLogo base={snap.coin.base} size={28} />
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{snap.coin.base}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">{s.totalDays.toLocaleString()} days of history</p>
              </div>
            </div>
          )}
          {state === 'loading' && <span role="status" className="text-xs font-bold text-slate-500 dark:text-slate-400">Reading full history…</span>}
          {(state === 'error' || state === 'nodata') && (
            <span className="flex items-center gap-2 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">{state === 'nodata' ? 'Not enough history' : 'Couldn’t load history'}</span>
              <button type="button" onClick={load} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">Retry</button>
            </span>
          )}
        </div>
      </div>

      {snap && s && (
        <>
          {/* 수중 기간 — 가장 자주 빠지고 가장 놀라운 숫자 */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
            <h2 className="text-sm font-black text-amber-900 dark:text-amber-200 mb-1.5">
              {snap.coin.base} has spent {s.underwaterPct.toFixed(0)}% of its life below a previous high
            </h2>
            <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed">
              Depth is the number everyone quotes; duration is the one that decides whether a position gets held. A 50% drawdown recovered in
              three months and a 50% drawdown still unrecovered after three years are the same figure and completely different experiences.
              New highs are rare by definition — only <b>{s.newHighDays.toLocaleString()}</b> of {s.totalDays.toLocaleString()} days set one —
              so most of the time holding this asset has meant sitting below a price you already saw.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              ['Worst drawdown', `−${s.maxDrawdownPct.toFixed(1)}%`, 'peak to trough'],
              ['Right now', s.currentDrawdownPct < 0.05 ? 'at a high' : `−${s.currentDrawdownPct.toFixed(1)}%`, 'below the record'],
              ['Longest recovery', days(s.longest?.totalDays ?? null), 'peak back to peak'],
              ['Days at a new high', `${((s.newHighDays / s.totalDays) * 100).toFixed(1)}%`, `${s.newHighDays.toLocaleString()} days`],
            ].map(([label, v, note]) => (
              <div key={label} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                <p className="text-lg font-black text-slate-900 dark:text-white tabular-nums">{v}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{note}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-black text-slate-900 dark:text-white">Every drawdown of 10% or more</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Deepest first. Note how often the deepest and the longest are not the same episode.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Peak</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Depth</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Falling</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Recovering</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3">Total underwater</th>
                  </tr>
                </thead>
                <tbody>
                  {s.episodes.slice(0, TOP_EPISODES).map(e => (
                    <tr key={`${e.peakIndex}-${e.troughIndex}`}
                      className={`border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 ${e.ongoing ? 'bg-amber-50 dark:bg-amber-500/[0.06]' : ''}`}>
                      <td className="px-4 py-2.5">
                        <span className="font-bold text-slate-700 dark:text-slate-200">{ymd(snap.dayAt(e.peakIndex))}</span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400 tabular-nums">
                          ${formatPrice(snap.closeAt(e.peakIndex))} → ${formatPrice(snap.closeAt(e.troughIndex))}
                        </span>
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums ${depthCls(e.depthPct)}`}>−{e.depthPct.toFixed(1)}%</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300 border-l border-slate-200/40 dark:border-slate-700/40">{days(e.declineDays)}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">
                        {e.ongoing ? <span className="text-amber-600 dark:text-amber-400 font-bold">still down</span> : days(e.recoveryDays)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums font-bold text-slate-900 dark:text-white">{days(e.totalDays)}</td>
                    </tr>
                  ))}
                  {s.episodes.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">No drawdown of 10% or more in this history.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              An episode runs from a record high, through the lowest close before the record is beaten, to the day it is beaten. Drawdowns
              shallower than 10% are excluded as noise. A highlighted row has not recovered yet, so its total is measured to today and will keep
              growing. All figures use daily closes since the coin listed on Binance, which means an earlier peak elsewhere is not counted.
            </div>
          </div>
        </>
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">Duration is the part that gets left out</h2>
        <p className="mb-2">
          Backtests and rankings quote maximum drawdown as a single depth, which makes two very different histories look identical. What
          actually removes people from a position is how long it stays down: the cost of a drawdown is paid in months of watching, not in the
          one day the low prints.
        </p>
        <p>
          The share of days spent below a previous high is the least flattering statistic an asset has, and it is almost never shown. It is high
          even for assets that rose a great deal, because new highs are rare by construction — most days sit somewhere under a level you have
          already seen. Knowing that number in advance is a better test of whether you can hold something than knowing its worst depth.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/all-time-high" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See how far every major coin sits below its high →
        </Link>
      </div>
    </>
  );
}
