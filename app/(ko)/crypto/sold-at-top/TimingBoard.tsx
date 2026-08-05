'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchFullDailyKlines } from '@/lib/binance';
import {
  indexedReturns, growthWhere, perfectTiming, extremeDays,
  distancesToNearest, countWithin, adjacentPairs,
  formatMultiple, formatReturn, EXTREME_COUNTS,
  type IndexedReturn, type Growth,
} from '@/lib/timing';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

const SUGGEST_LIMIT = 8;
/** "가까이 붙어 있다"의 기준(일) */
const NEAR_DAYS = 7;
const NEARISH_DAYS = 30;

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Snapshot {
  coin: CoinMeta;
  rets: IndexedReturn[];
  hold: Growth;
  perfect: Growth;
  from: number;
  to: number;
}

const inputCls =
  'w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition';

const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const signedPct = (v: number) => `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(1)}%`;

export default function TimingBoard() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');
  const [n, setN] = useState(10);

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const k = await fetchFullDailyKlines(symbolOf(coin), marketOf(coin));
      if (k.length < 200) { setState('nodata'); return; }
      const rets = indexedReturns(k.map(x => ({ day: x.openTime, close: x.close })));
      const hold = growthWhere(rets);
      const perfect = perfectTiming(rets);
      if (!rets.length || !hold || !perfect) { setState('nodata'); return; }
      setSnap({ coin, rets, hold, perfect, from: rets[0].day, to: rets[rets.length - 1].day });
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

  /** 선택한 n에 대한 시나리오 — 이 표가 본론이다 */
  const scen = useMemo(() => {
    if (!snap) return null;
    const { best, worst } = extremeDays(snap.rets, n);
    if (!best.length || !worst.length) return null;
    const bs = new Set(best.map(x => x.i));
    const ws = new Set(worst.map(x => x.i));
    return {
      best, worst,
      missedBest: growthWhere(snap.rets, r => bs.has(r.i)),
      avoidedWorst: growthWhere(snap.rets, r => ws.has(r.i)),
      both: growthWhere(snap.rets, r => bs.has(r.i) || ws.has(r.i)),
      distances: distancesToNearest(best, worst),
      pairs: adjacentPairs(best, worst),
    };
  }, [snap, n]);

  const nearCount = scen ? countWithin(scen.distances, NEAR_DAYS) : 0;
  const nearishCount = scen ? countWithin(scen.distances, NEARISH_DAYS) : 0;
  /** 최고의 날을 놓치면 원금 아래로 내려가는가 — 가장 강한 한 줄 */
  const missedIsLoss = scen?.missedBest ? scen.missedBest.multiple < 1 : false;
  /** 둘 다 비켜 있었으면 그냥 보유보다 못한가 */
  const bothWorse = scen?.both && snap ? scen.both.log10 < snap.hold.log10 : false;

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); }

  /**
   * 표는 성적 순으로 정렬한다. 고정 순서로 두면 "둘 다 놓침"이 보유보다 위에 올 때
   * (BTC에서 실제로 그렇다) 순위표처럼 보이면서 순서가 어긋난다.
   * 맨 위는 언제나 완벽한 타이밍, 맨 아래는 언제나 "최고의 날 놓침"이다.
   */
  const rows = useMemo(() => {
    if (!snap || !scen) return [];
    return [
      { key: 'perfect', label: 'Perfect timing', note: 'Held only on days that rose', out: snap.rets.filter(r => r.pct <= 0).length, g: snap.perfect, tone: 'text-violet-600 dark:text-violet-400' },
      { key: 'avoid', label: `Avoided the worst ${n} days`, note: 'In cash for every crash', out: n, g: scen.avoidedWorst, tone: 'text-emerald-600 dark:text-emerald-400' },
      { key: 'hold', label: 'Bought and held', note: 'Did nothing at all', out: 0, g: snap.hold, tone: 'text-slate-900 dark:text-white' },
      { key: 'both', label: 'Missed both', note: `Dodged the ${n} crashes, missed the ${n} rallies`, out: n * 2, g: scen.both, tone: 'text-amber-600 dark:text-amber-400' },
      { key: 'missed', label: `Missed the best ${n} days`, note: 'Out of the market for every rally', out: n, g: scen.missedBest, tone: 'text-rose-600 dark:text-rose-400' },
    ].sort((a, b) => (b.g?.log10 ?? -Infinity) - (a.g?.log10 ?? -Infinity));
  }, [snap, scen, n]);

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-4">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="sat-coin">Coin</label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <input id="sat-coin" type="text" value={query} onChange={e => setQuery(e.target.value)}
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
          {state === 'ready' && snap && (
            <div className="flex items-center gap-2.5">
              <CoinLogo base={snap.coin.base} size={28} />
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{snap.coin.base}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                  {snap.rets.length.toLocaleString()} days · {iso(snap.from)} → {iso(snap.to)}
                </p>
              </div>
            </div>
          )}
          {state === 'loading' && <span role="status" className="text-xs font-bold text-slate-500 dark:text-slate-400">Reading full history…</span>}
          {(state === 'error' || state === 'nodata') && (
            <span className="flex items-center gap-2 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">{state === 'nodata' ? 'Not enough history' : 'Couldn’t load history'}</span>
              <button type="button" onClick={load} className="font-bold text-rose-600 dark:text-rose-400 hover:underline">Retry</button>
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Extreme days counted</span>
          <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
            {EXTREME_COUNTS.map(v => (
              <button key={v} type="button" aria-pressed={n === v} onClick={() => setN(v)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors tabular-nums ${
                  n === v ? 'bg-rose-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {snap && scen ? (
        <>
          {/* 근접성 — 이 페이지가 존재하는 이유 */}
          {scen.pairs.length > 0 && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-50 dark:bg-rose-500/[0.07] p-5 mb-4">
              <h2 className="text-sm font-black text-rose-900 dark:text-rose-200 mb-1.5">
                The best day and the worst day were {scen.pairs.length === 1 ? 'next to each other' : 'neighbours'}
              </h2>
              <p className="text-xs text-rose-900/85 dark:text-rose-200/85 leading-relaxed">
                {scen.pairs.slice(0, 2).map(p => (
                  <span key={p.best.i}>
                    {snap.coin.base} fell <b className="tabular-nums">{signedPct(p.worst.pct)}</b> on{' '}
                    <b className="tabular-nums">{iso(p.worst.day)}</b> and rose <b className="tabular-nums">{signedPct(p.best.pct)}</b>{' '}
                    the {p.gap === -1 ? 'very next day' : 'day before'}.{' '}
                  </span>
                ))}
                Of the {n} best days, <b className="tabular-nums">{nearCount}</b> fall within {NEAR_DAYS} days of one of the {n} worst, and{' '}
                <b className="tabular-nums">{nearishCount}</b> within {NEARISH_DAYS}. Selling before a crash and being back in for the
                rebound is not two decisions with room between them — it is one decision made twice inside a week.
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-black text-slate-900 dark:text-white">
                {snap.coin.name}, {iso(snap.from)} → {iso(snap.to)}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every row holds the same {snap.rets.length.toLocaleString()} days. Only which ones you sat out changes.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Scenario</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Days sat out</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Multiple</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3">Total return</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.key}
                      className={`border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 ${
                        row.key === 'hold' ? 'bg-slate-50 dark:bg-slate-800/40' : ''
                      }`}>
                      <td className="px-4 py-3">
                        <p className={`font-bold ${row.tone}`}>{row.label}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{row.note}</p>
                      </td>
                      <td className="px-3 py-3 text-right tabular-nums text-slate-500 dark:text-slate-400">
                        {row.out.toLocaleString()}
                      </td>
                      <td className={`px-3 py-3 text-right tabular-nums font-bold border-l border-slate-200/40 dark:border-slate-700/40 ${row.tone}`}>
                        {row.g ? formatMultiple(row.g) : '—'}
                      </td>
                      <td className={`px-4 py-3 text-right tabular-nums font-bold ${row.tone}`}>
                        {row.g ? formatReturn(row.g) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {missedIsLoss ? (
                <>
                  Read the bottom row. Sitting out {n} days of {snap.rets.length.toLocaleString()} — under{' '}
                  {((n / snap.rets.length) * 100).toFixed(1)}% of them — turns the entire period into a loss. That is the realistic
                  failure mode of trying to sell the top, and it does not require bad luck, only being out at the wrong moment.
                </>
              ) : (
                <>
                  Read the bottom row. Sitting out {n} days of {snap.rets.length.toLocaleString()} — under{' '}
                  {((n / snap.rets.length) * 100).toFixed(1)}% of them — costs most of the return. The top row is the opposite
                  extreme, and the size of that number is the point: an outcome that large is not a strategy anyone reaches.
                </>
              )}
              {bothWorse ? (
                <>
                  {' '}The row worth sitting with is <b>Missed both</b>: dodging every crash <em>and</em> missing every rally still leaves
                  you behind simply holding. Perfect crash-avoidance is not worth much once it costs the rebounds that follow it.
                </>
              ) : (
                <>
                  {' '}<b>Missed both</b> deserves an honest note: it finishes ahead of holding here, because {snap.coin.base}&apos;s worst days
                  are deeper than its best days are tall. That is a real result, not a rounding artefact — but it is only available to
                  someone who identified both sets in advance, and the panel above shows those two sets occupy the same weeks.
                </>
              )}
            </div>
          </div>

          {/* 극단의 날 목록 */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {([['Best days', scen.best, 'emerald'], ['Worst days', scen.worst, 'rose']] as const).map(([title, list, hue]) => (
              <div key={title} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white">{title}</h3>
                </div>
                <ul className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                  {list.slice(0, 10).map(d => (
                    <li key={d.i} className="flex items-center justify-between px-4 py-2 text-xs">
                      <span className="tabular-nums text-slate-600 dark:text-slate-300">{iso(d.day)}</span>
                      <span className={`tabular-nums font-bold ${
                        hue === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {signedPct(d.pct)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : state === 'loading' ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Reading the full daily history…
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">How each row is built</h2>
        <p className="mb-2">
          Every scenario compounds the same daily closes. Sitting out a day means that day earns zero rather than being removed from the
          series, so the periods stay identical in length and only the participation differs. Perfect timing holds on every day that
          closed higher and sits in cash on the rest, which is the arithmetic ceiling rather than an achievable result.
        </p>
        <p className="mb-2">
          Fees, spreads, slippage and tax are all excluded, which flatters the market-timing rows specifically: every one of them requires
          dozens or thousands of round trips that the buy-and-hold row never pays for. The real gap is wider than shown, in the direction
          that favours doing nothing.
        </p>
        <p>
          The extreme days are ranked by daily close-to-close return over the full listed history, so the window depends on when the coin
          began trading rather than a fixed lookback. Days are UTC, matching the exchange candles.
        </p>
      </div>

      <div className="text-center mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        <Link href="/crypto/drawdown" className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline">
          How long the holding actually hurt →
        </Link>
        <Link href="/crypto/dca-calculator" className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline">
          What buying on a schedule would have done →
        </Link>
      </div>
    </>
  );
}
