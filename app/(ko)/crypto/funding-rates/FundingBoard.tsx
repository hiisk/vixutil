'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/atr';
import {
  fetchFunding, fetchFundingHistory, intervalBreakdown, ratePercentile, fundingCost,
  DEFAULT_INTERVAL_HOURS, type FundingRow,
} from '@/lib/funding';
import { COINS } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

/** 표에 한 번에 보여줄 행 수 */
const ROWS = 40;
/** 백분위 계산에 쓸 과거 정산 횟수 */
const HISTORY_LIMIT = 500;

type State = 'loading' | 'ready' | 'error';
type View = 'longs-pay' | 'shorts-pay';

const inputCls =
  'w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition';

const slugOf = (base: string) => COINS.find(c => c.base === base)?.slug ?? null;

/** 연환산 값은 절대값이 커지므로 구간별로 강조한다 */
function annualCls(v: number): string {
  const a = Math.abs(v);
  if (a >= 100) return v >= 0 ? 'text-rose-600 dark:text-rose-400 font-black' : 'text-emerald-600 dark:text-emerald-400 font-black';
  if (a >= 20) return v >= 0 ? 'text-rose-600/80 dark:text-rose-400/80' : 'text-emerald-600/80 dark:text-emerald-400/80';
  return 'text-slate-600 dark:text-slate-300';
}

const utcTime = (ms: number) =>
  ms > 0 ? new Date(ms).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false }) + ' UTC' : '—';

export default function FundingBoard() {
  const [state, setState] = useState<State>('loading');
  const [rows, setRows] = useState<FundingRow[]>([]);
  const [view, setView] = useState<View>('longs-pay');
  const [query, setQuery] = useState('');

  const [selected, setSelected] = useState<string | null>(null);
  /** 어느 종목의 이력인지 함께 담는다 — 종목이 바뀌는 순간 이전 이력이 잠깐 보이는 것을 막는다 */
  const [history, setHistory] = useState<{ symbol: string; rates: number[] } | null>(null);
  const [notional, setNotional] = useState('10000');
  const [holdDays, setHoldDays] = useState('30');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const r = await fetchFunding();
      if (!r.length) { setState('error'); return; }
      setRows(r);
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  /**
   * 선택한 종목의 과거 정산 이력 — 지금이 평소보다 높은지 판단하는 데 쓴다.
   * 이펙트 본문에서 직접 setState를 부르면 렌더가 한 번 더 도므로, 상태 변경을
   * 전부 promise 콜백 안에 둔다. 로딩 표시는 "담긴 종목 ≠ 선택한 종목"으로 판단한다.
   */
  useEffect(() => {
    if (!selected) return;
    let alive = true;
    fetchFundingHistory(selected, HISTORY_LIMIT)
      .then(h => { if (alive) setHistory({ symbol: selected, rates: h }); })
      .catch(() => { if (alive) setHistory({ symbol: selected, rates: [] }); });
    return () => { alive = false; };
  }, [selected]);

  const breakdown = useMemo(() => intervalBreakdown(rows), [rows]);
  const offSchedule = useMemo(
    () => rows.filter(r => r.intervalHours !== DEFAULT_INTERVAL_HOURS).length,
    [rows],
  );

  const shown = useMemo(() => {
    const q = query.trim().toUpperCase();
    const filtered = q ? rows.filter(r => r.base.includes(q)) : rows;
    const sorted = [...filtered].sort((a, b) => (view === 'longs-pay' ? b.annualPct - a.annualPct : a.annualPct - b.annualPct));
    return sorted.slice(0, ROWS);
  }, [rows, view, query]);

  const sel = useMemo(() => rows.find(r => r.symbol === selected) ?? null, [rows, selected]);
  /** 선택한 종목의 이력이 도착했을 때만 값이 된다. null이면 아직 로딩 중이다. */
  const rates = history && history.symbol === selected ? history.rates : null;
  const pctile = useMemo(() => (sel && rates?.length ? ratePercentile(rates, sel.rate) : null), [sel, rates]);

  const cost = useMemo(() => {
    if (!sel) return null;
    const n = Number(notional);
    const d = Number(holdDays);
    if (!(n > 0) || !(d >= 0)) return null;
    const settlements = Math.floor((d * 24) / sel.intervalHours);
    return { total: fundingCost(n, sel.rate, sel.intervalHours, d), settlements };
  }, [sel, notional, holdDays]);

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading funding rates from Binance…</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div role="alert" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load funding rates</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">Binance futures may be restricted in your region</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* 정산 주기 분포 — 이 페이지의 존재 이유를 숫자로 먼저 보여준다 */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
        <h2 className="text-sm font-black text-amber-900 dark:text-amber-200 mb-1.5">Not every coin settles every 8 hours</h2>
        <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed mb-3">
          Funding tables almost always annualise by assuming three settlements a day. Right now
          {' '}<b>{offSchedule.toLocaleString()} of {rows.length.toLocaleString()}</b> USDT perpetuals on Binance
          {' '}({((offSchedule / rows.length) * 100).toFixed(0)}%) are on a different schedule, and a 4-hour coin annualised as if it were
          8-hour comes out at exactly <b>half</b>{' '}its real rate. Every figure below uses each symbol&apos;s actual interval.
        </p>
        <div className="flex flex-wrap gap-2">
          {breakdown.map(b => (
            <span key={b.hours} className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/70 dark:bg-slate-900/60 text-amber-900 dark:text-amber-200 border border-amber-500/25 tabular-nums">
              {b.hours}h · {b.count.toLocaleString()} coins
            </span>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
          {([['longs-pay', 'Longs pay most'], ['shorts-pay', 'Shorts pay most']] as [View, string][]).map(([k, label]) => (
            <button key={k} type="button" aria-pressed={view === k} onClick={() => setView(k)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                view === k ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}>
              {label}
            </button>
          ))}
        </div>
        <div className="flex-1 min-w-[160px]">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search ticker" className={inputCls} aria-label="Search ticker" />
        </div>
      </div>

      {/* 표 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="scroll-x overflow-x-auto max-h-[560px] overflow-y-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Coin</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">
                  Rate
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">per settlement</span>
                </th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Every</th>
                <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  Annualised
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">if it held</span>
                </th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Mark</th>
                <th scope="col" className="text-right font-semibold px-4 py-3">Next</th>
              </tr>
            </thead>
            <tbody>
              {shown.map(r => {
                const slug = slugOf(r.base);
                return (
                  <tr key={r.symbol}
                    onClick={() => setSelected(r.symbol)}
                    className={`border-b border-slate-200/50 dark:border-slate-700/50 cursor-pointer transition-colors ${
                      selected === r.symbol ? 'bg-amber-50 dark:bg-amber-500/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}>
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-2">
                        <CoinLogo base={r.base} size={20} />
                        {slug ? (
                          <Link href={`/crypto/${slug}/price-prediction`} onClick={e => e.stopPropagation()}
                            className="font-bold text-slate-800 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400">
                            {r.base}
                          </Link>
                        ) : (
                          <span className="font-bold text-slate-800 dark:text-slate-100">{r.base}</span>
                        )}
                      </span>
                    </td>
                    <td className={`px-3 py-2.5 text-right tabular-nums ${r.rate >= 0 ? 'text-rose-600/80 dark:text-rose-400/80' : 'text-emerald-600/80 dark:text-emerald-400/80'}`}>
                      {r.rate >= 0 ? '+' : ''}{(r.rate * 100).toFixed(4)}%
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400">{r.intervalHours}h</td>
                    <td className={`px-3 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${annualCls(r.annualPct)}`}>
                      {r.annualPct >= 0 ? '+' : ''}{r.annualPct.toFixed(1)}%
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">${formatPrice(r.markPrice)}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400 text-[11px]">{utcTime(r.nextFundingTime)}</td>
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
          A <b className="text-slate-600 dark:text-slate-300">positive</b> rate means longs pay shorts; negative means shorts pay longs.
          Showing the top {ROWS} of {rows.length.toLocaleString()} symbols. Tap a row to price it out below.
        </div>
      </div>

      {/* 비용 계산 */}
      {sel ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <CoinLogo base={sel.base} size={24} />
            <h2 className="text-sm font-black text-slate-900 dark:text-white">What {sel.base} funding costs you</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="notional">Position size (USDT)</label>
              <input id="notional" type="number" inputMode="decimal" min={1} value={notional}
                onChange={e => setNotional(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="hold">Days held</label>
              <input id="hold" type="number" inputMode="decimal" min={0} value={holdDays}
                onChange={e => setHoldDays(e.target.value)} className={inputCls} />
            </div>
          </div>

          {cost && (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-4">
              <p className="text-sm text-slate-700 dark:text-slate-200">
                A long would{' '}
                <b className={cost.total >= 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
                  {cost.total >= 0 ? 'pay' : 'receive'} ${Math.abs(cost.total).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </b>{' '}
                over {cost.settlements.toLocaleString()} settlements ({sel.intervalHours}h apart). A short is the mirror image.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                That is {((Math.abs(cost.total) / Number(notional)) * 100).toFixed(2)}% of the position, assuming the rate stays where it is —
                which it will not. Only the next settlement is fixed.
              </p>
            </div>
          )}

          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {rates == null ? (
              'Loading rate history…'
            ) : pctile != null ? (
              <>
                Against {rates.length.toLocaleString()} past settlements, the current rate sits at the
                {' '}<b className="text-slate-700 dark:text-slate-200">{pctile.toFixed(0)}th percentile</b> for {sel.base}
                {pctile >= 90 ? ' — unusually high for this coin.' : pctile <= 10 ? ' — unusually low for this coin.' : '. Ordinary for this coin.'}
                {' '}Whether a rate is extreme is only answerable relative to its own history, not to an absolute number.
              </>
            ) : (
              'No settlement history available for this symbol.'
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Tap any row to see what its funding would cost on a position you size.
        </div>
      )}

      {/* 정직한 한계 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">Before treating a high rate as free money</h2>
        <p className="mb-2">
          A large negative rate looks like it pays you to go long, and the &quot;funding arbitrage&quot; framing is to hold the perpetual and hedge
          it with the opposite spot position so the price move cancels and the funding is kept. Three things eat that in practice.
          <b className="text-slate-700 dark:text-slate-200"> Fees</b> apply on both legs and on both entry and exit.
          <b className="text-slate-700 dark:text-slate-200"> The rate is not fixed</b> — only the next settlement is known, and the extreme rates
          that make the trade attractive are usually the ones that revert fastest.
          <b className="text-slate-700 dark:text-slate-200"> The hedge is not free</b>: shorting spot requires borrowing, and the borrow cost on
          exactly the coins with extreme funding tends to be high for the same reason the funding is.
        </p>
        <p>
          The annualised column exists to make the size of the number legible, not to suggest anyone earns it for a year. Rates on the
          most extreme symbols here often move by an order of magnitude within days. Read it as &quot;what this costs while it lasts&quot;.
        </p>
      </div>
    </>
  );
}
