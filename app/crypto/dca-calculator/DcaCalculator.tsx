'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import { fetchTicker, fetchFullDailyCloses } from '@/lib/binance';
import {
  runDca, lumpRoi, dcaDistribution, percentileOf,
  FREQ_DAYS, FREQ_LABEL, MIN_INDEPENDENT_WINDOWS,
  type Frequency,
} from '@/lib/dca';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

/** 투자 기간 선택지 */
const PERIODS: [string, number][] = [['6M', 180], ['1Y', 365], ['2Y', 730], ['3Y', 1095], ['5Y', 1825]];
/** 코인 검색에서 한 번에 보여줄 개수 */
const SUGGEST_LIMIT = 8;

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Snapshot {
  coin: CoinMeta;
  price: number;
  closes: number[];
}

const inputCls =
  'w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition tabular-nums';
const labelCls = 'block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5';

const money = (v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
const signed = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;
const roiCls = (v: number) => (v >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400');

export default function DcaCalculator() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');

  const [amount, setAmount] = useState('100');
  const [freq, setFreq] = useState<Frequency>('weekly');
  const [days, setDays] = useState(365);

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const market = marketOf(coin);
      const [t, closes] = await Promise.all([
        fetchTicker(symbolOf(coin), market),
        fetchFullDailyCloses(symbolOf(coin), market),
      ]);
      if (!t || closes.length < 60) { setState('nodata'); return; }
      setSnap({ coin, price: t.lastPrice, closes });
      setState('ready');
    } catch {
      setState('error');
    }
  }, [coin]);

  // 시세·이력은 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const suggestions = useMemo(() => {
    const q = query.trim().toUpperCase();
    if (!q) return [];
    return COINS.filter(c => c.base.startsWith(q) || c.name.toUpperCase().includes(q)).slice(0, SUGGEST_LIMIT);
  }, [query]);

  /** 이력이 짧으면 고른 기간을 쓸 수 없다 — 가능한 최장 기간으로 줄인다 */
  const effDays = useMemo(() => {
    if (!snap) return days;
    return Math.min(days, snap.closes.length - 1);
  }, [snap, days]);

  const amt = Number(amount);

  // 가장 최근 구간의 결과 — 다른 계산기가 보여주는 바로 그 숫자
  const recent = useMemo(() => {
    if (!snap || !(amt > 0)) return null;
    const start = snap.closes.length - effDays;
    if (start < 0) return null;
    const dca = runDca(snap.closes, start, effDays, amt, freq);
    const lump = lumpRoi(snap.closes, start, effDays);
    return dca ? { dca, lump } : null;
  }, [snap, effDays, amt, freq]);

  // 가능한 모든 시작일의 분포 — 위 숫자가 운이었는지 알려주는 부분
  const dist = useMemo(
    () => (snap && amt > 0 ? dcaDistribution(snap.closes, effDays, amt, freq) : null),
    [snap, effDays, amt, freq],
  );

  const pct = recent && dist ? percentileOf(dist, recent.dca.roiPct) : null;

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); }

  return (
    <>
      {/* 코인 + 입력 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 mb-4">
        <label className={labelCls} htmlFor="dca-coin">Coin</label>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[220px]">
            <input
              id="dca-coin" type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder={`${coin.base} · search another coin`} className={inputCls} autoComplete="off"
            />
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
                <p className="text-lg font-black text-slate-900 dark:text-white tabular-nums leading-tight">${formatPrice(snap.price)}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{snap.closes.length.toLocaleString()} daily closes</p>
              </div>
            </div>
          )}
          {state === 'loading' && <span role="status" className="text-xs font-bold text-slate-500 dark:text-slate-400">Loading history…</span>}
          {(state === 'error' || state === 'nodata') && (
            <span className="flex items-center gap-2 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">
                {state === 'nodata' ? 'Not enough history' : 'Couldn’t load market data'}
              </span>
              <button type="button" onClick={load} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">Retry</button>
            </span>
          )}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls} htmlFor="dca-amount">Amount per buy (USD)</label>
            <input id="dca-amount" type="number" inputMode="decimal" min={1} value={amount}
              onChange={e => setAmount(e.target.value)} className={inputCls} />
          </div>
          <div>
            <span className={labelCls}>Frequency</span>
            <div className="inline-flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
              {(Object.keys(FREQ_DAYS) as Frequency[]).map(f => (
                <button key={f} type="button" aria-pressed={freq === f} onClick={() => setFreq(f)}
                  className={`flex-1 px-2 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                    freq === f ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}>
                  {FREQ_LABEL[f]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={labelCls}>Period</span>
            <div className="inline-flex w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
              {PERIODS.map(([label, d]) => (
                <button key={d} type="button" aria-pressed={days === d} onClick={() => setDays(d)}
                  className={`flex-1 px-1.5 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                    days === d ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {snap && effDays < days && (
          <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-3">
            {coin.base} only has {snap.closes.length.toLocaleString()} days of history, so the period was shortened to {effDays} days.
          </p>
        )}
      </div>

      {/* 최근 구간 결과 */}
      {recent ? (
        <>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white via-white to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-amber-500/[0.05] p-6 mb-4">
            <p className="text-[11px] uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1">
              {money(amt)} {FREQ_LABEL[freq].toLowerCase()} into {coin.base} for the last {effDays} days
            </p>
            <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
              <div>
                <p className="text-4xl font-black text-slate-900 dark:text-white tabular-nums">{money(recent.dca.finalValue)}</p>
                <p className={`text-sm font-black tabular-nums ${roiCls(recent.dca.roiPct)}`}>{signed(recent.dca.roiPct)}</p>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                <p>You would have invested <b className="tabular-nums">{money(recent.dca.invested)}</b> over {recent.dca.buys} buys</p>
                <p className="text-slate-500 dark:text-slate-400">
                  Average cost <b className="tabular-nums">${formatPrice(recent.dca.avgCost)}</b> · price today <b className="tabular-nums">${formatPrice(recent.dca.finalPrice)}</b>
                </p>
              </div>
            </div>
          </div>

          {/* 분포 — 이 페이지가 다른 DCA 계산기와 갈리는 지점 */}
          {dist && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
              <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-sm font-black text-slate-900 dark:text-white">Was that a lucky window?</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  The same strategy run from <b className="text-slate-700 dark:text-slate-200">every possible start date</b> in {coin.base}&apos;s history —
                  {' '}{dist.windows.toLocaleString()} of them. One start date is a story; the spread is the evidence.
                </p>
              </div>

              {pct != null && (
                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 bg-amber-50/60 dark:bg-amber-500/[0.06]">
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    The window above landed around the <b className="tabular-nums">{pct.toFixed(0)}th percentile</b> of all start dates —
                    {' '}{pct >= 75 ? 'an unusually good stretch to have picked.'
                      : pct >= 50 ? 'a better-than-typical stretch.'
                      : pct >= 25 ? 'a worse-than-typical stretch.'
                      : 'one of the worse stretches in this coin’s history.'}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-200 dark:divide-slate-700">
                {[
                  ['Worst', dist.worst], ['25th pct', dist.p25], ['Median', dist.medianRoi], ['Best', dist.best],
                ].map(([label, v]) => (
                  <div key={label as string} className="p-4 text-center">
                    <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{label as string}</p>
                    <p className={`text-lg font-black tabular-nums ${roiCls(v as number)}`}>{signed(v as number)}</p>
                  </div>
                ))}
              </div>

              <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <span className="text-slate-600 dark:text-slate-300">
                  Start dates that ended in profit: <b className={`tabular-nums ${roiCls(dist.pProfit - 50)}`}>{dist.pProfit.toFixed(1)}%</b>
                </span>
                <span className="text-slate-600 dark:text-slate-300">
                  Lump sum beat DCA: <b className="tabular-nums text-slate-900 dark:text-white">{dist.lumpWinPct.toFixed(1)}%</b> of start dates
                  <span className="text-slate-500 dark:text-slate-400"> (median {signed(dist.medianLumpRoi)})</span>
                </span>
              </div>

              <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {dist.reliable ? (
                  <>
                    Those {dist.windows.toLocaleString()} windows overlap heavily, so they are not {dist.windows.toLocaleString()} independent
                    observations — {coin.base}&apos;s history contains only <b className="text-slate-700 dark:text-slate-200">{dist.independent}</b> non-overlapping
                    windows of this length. Read the spread as a rough shape, not a precise probability.
                  </>
                ) : (
                  <>
                    <b className="text-amber-700 dark:text-amber-400">Treat this spread with caution.</b> {coin.base}&apos;s history contains only
                    {' '}<b className="text-slate-700 dark:text-slate-200">{dist.independent}</b> non-overlapping window{dist.independent === 1 ? '' : 's'} of
                    this length — below the {MIN_INDEPENDENT_WINDOWS} we consider meaningful. The {dist.windows.toLocaleString()} overlapping windows
                    mostly re-measure the same stretch of history.
                  </>
                )}
              </div>
            </div>
          )}

          {/* DCA vs 일시불 */}
          {recent.lump != null && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4">
              <h2 className="text-sm font-black text-slate-900 dark:text-white mb-1">DCA vs putting it all in at the start</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Same total money, same window — one spread out, one invested on day one.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-4">
                  <p className="text-[11px] uppercase tracking-wide text-amber-700 dark:text-amber-400 mb-1">DCA</p>
                  <p className={`text-2xl font-black tabular-nums ${roiCls(recent.dca.roiPct)}`}>{signed(recent.dca.roiPct)}</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Lump sum</p>
                  <p className={`text-2xl font-black tabular-nums ${roiCls(recent.lump)}`}>{signed(recent.lump)}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                DCA is often described as the safer choice, but that is a claim to check rather than assume. Spreading purchases lowers your
                average cost only when the price falls after you start; in a market that mostly rose, buying later means buying higher.
                {dist && (
                  <> Across {coin.base}&apos;s history, lump sum finished ahead in <b className="text-slate-700 dark:text-slate-200">{dist.lumpWinPct.toFixed(1)}%</b> of
                  start dates. What DCA reliably reduces is not the average outcome but how much the <i>timing</i> of your entry decides it.</>
                )}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {state === 'loading' ? 'Loading price history…' : 'Enter an amount to run the backtest.'}
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">What this backtest does and does not include</h2>
        <p className="mb-2">
          Buys happen at the daily close from Binance, with no trading fees, no spread and no slippage. Real exchange fees would lower every
          figure here by roughly the fee rate. Past prices are also survivorship-filtered by definition: coins that collapsed and were delisted
          are not in this list at all, so any &quot;average coin&quot; intuition drawn from these pages is biased upward.
        </p>
        <p>
          The bigger caveat is the sample. Crypto price history is short, and overlapping windows make it look far longer than it is —
          which is why the number of <b className="text-slate-700 dark:text-slate-200">non-overlapping</b> windows is shown next to every spread.
          A backtest tells you what one particular past would have paid. It is not a forecast, and this page does not turn it into one.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href={`/crypto/${coin.slug}/price-prediction`} className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See {coin.name} forward-looking ranges →
        </Link>
      </div>
    </>
  );
}
