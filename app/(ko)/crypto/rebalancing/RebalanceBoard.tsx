'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchDailyCandles, mapWithConcurrency } from '@/lib/binance';
import { simulateRebalance, INTERVALS, type RebalanceResult } from '@/lib/rebalance';
import { CoinLogo } from '@/components/crypto/ui';

/** 고를 수 있는 자산 — 이력이 길고 사람들이 실제로 섞는 대형 코인 */
const CANDIDATES = ['BTC', 'ETH', 'SOL', 'XRP', 'BNB', 'DOGE', 'ADA', 'LINK', 'TRX', 'AVAX'];
/** 기본 포트폴리오 */
const DEFAULT_PICKS = ['BTC', 'ETH', 'SOL'];
const CONCURRENCY = 5;
/** 백테스트 구간 (일) */
const PERIODS: [string, number][] = [['1Y', 365], ['2Y', 730]];
const CONCURRENT_MAX = 5;

type State = 'loading' | 'ready' | 'error';

const mult = (v: number) => `${v.toFixed(2)}×`;
const signed = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%p`;

export default function RebalanceBoard() {
  const [state, setState] = useState<State>('loading');
  const [closes, setCloses] = useState<Record<string, number[]>>({});
  const [picks, setPicks] = useState<string[]>(DEFAULT_PICKS);
  const [days, setDays] = useState(730);
  const [feePct, setFeePct] = useState('0.1');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const maxDays = Math.max(...PERIODS.map(p => p[1]));
      const out = await mapWithConcurrency(CANDIDATES, CONCURRENCY, async base => {
        try {
          const k = await fetchDailyCandles(`${base}USDT`, maxDays, 'spot');
          return { base, closes: k.map(x => x.close) };
        } catch { return null; }
      });
      const map: Record<string, number[]> = {};
      for (const r of out) if (r && r.closes.length > 200) map[r.base] = r.closes;
      if (Object.keys(map).length < 2) { setState('error'); return; }
      setCloses(map);
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const available = useMemo(() => CANDIDATES.filter(b => closes[b]), [closes]);
  const active = useMemo(() => picks.filter(b => closes[b]), [picks, closes]);

  /** 주기별 결과 — "언제 되돌리든 방치보다 나은가"를 한 표로 본다 */
  const results = useMemo(() => {
    if (active.length < 2) return [];
    const series = active.map(b => closes[b].slice(-days));
    const w = active.map(() => 1 / active.length);
    return INTERVALS.map(([label, interval]) => ({
      label,
      interval,
      r: simulateRebalance({ series, weights: w, intervalDays: interval, feePct: Number(feePct) }),
    }));
  }, [active, closes, days, feePct]);

  /** 방치 경로는 주기와 무관하므로 아무 결과에서 꺼낸다 */
  const buyHold: RebalanceResult | null = results.find(x => x.r != null)?.r ?? null;

  function toggle(base: string) {
    setPicks(p => {
      if (p.includes(base)) return p.length > 2 ? p.filter(x => x !== base) : p;
      return p.length < CONCURRENT_MAX ? [...p, base] : p;
    });
  }

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading two years for {CANDIDATES.length} coins…</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div role="alert" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load market data</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-amber-950 bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
          Equal-weight portfolio · pick 2 to {CONCURRENT_MAX}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {available.map(b => {
            const on = picks.includes(b);
            return (
              <button key={b} type="button" aria-pressed={on} onClick={() => toggle(b)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-colors ${
                  on ? 'bg-amber-500 border-amber-500 text-amber-950'
                     : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}>
                <CoinLogo base={b} size={16} />{b}
              </button>
            );
          })}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Backtest window</span>
            <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
              {PERIODS.map(([label, d]) => (
                <button key={d} type="button" aria-pressed={days === d} onClick={() => setDays(d)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    days === d ? 'bg-amber-500 text-amber-950' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="rb-fee">Fee per trade (%)</label>
            <input id="rb-fee" type="number" inputMode="decimal" step="0.01" min={0} value={feePct}
              onChange={e => setFeePct(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 transition tabular-nums" />
          </div>
        </div>
      </div>

      {active.length < 2 ? (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Pick at least two coins.
        </div>
      ) : (
        <>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Equal weight in {active.join(' / ')} over the last {days} days
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Every row starts from the same portfolio. Only the rebalancing interval differs.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Rebalance</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Final value</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                      vs never
                      <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">after fees</span>
                    </th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Max drawdown</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Trades</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3">Fees paid</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(({ label, interval, r }) => {
                    if (!r) return (
                      <tr key={label}><td colSpan={6} className="px-4 py-3 text-slate-500 dark:text-slate-400">{label} — not enough data</td></tr>
                    );
                    const isNever = interval === 0;
                    const val = isNever ? r.buyHoldMultiple : r.rebalancedMultiple;
                    const edge = isNever ? 0 : r.edgePp;
                    const dd = isNever ? r.buyHoldMaxDdPct : r.rebalancedMaxDdPct;
                    return (
                      <tr key={label} className={`border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 ${isNever ? 'bg-slate-50 dark:bg-slate-950/60' : ''}`}>
                        <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200">
                          {label}
                          {isNever && <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400">baseline</span>}
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums font-bold text-slate-900 dark:text-white">{mult(val)}</td>
                        <td className={`px-3 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${
                          isNever ? 'text-slate-500 dark:text-slate-400'
                          : edge > 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                          : 'text-rose-600 dark:text-rose-400 font-bold'
                        }`}>
                          {isNever ? '—' : signed(edge)}
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-rose-600/80 dark:text-rose-400/80">−{dd.toFixed(1)}%</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400 border-l border-slate-200/40 dark:border-slate-700/40">
                          {isNever ? '0' : r.rebalances}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400">
                          {isNever ? '0%' : `${r.feeCostPct.toFixed(2)}%`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              &quot;Never&quot; is the baseline: buy once at equal weight and leave it. Every other row pays fees on every rebalance, and those
              fees are already deducted from the value shown. Final value is a multiple of the starting amount, so 1.50× means a 50% gain.
            </div>
          </div>

          {/* 방치했을 때 얼마나 쏠렸는가 */}
          {buyHold && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
              <h2 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1.5">Leaving it alone is a decision too</h2>
              {/*
                문구가 결과를 단정하지 않게 한다. 초기 버전은 "방치가 보통 이긴다"고 썼는데
                화면에 뜬 값은 리밸런싱이 +0.6%p 앞선 경우였다 — 표와 어긋나는 주장이었다.
              */}
              <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed mb-3">
                Starting at {(100 / active.length).toFixed(0)}% each, the untouched portfolio has drifted to the weights below — whichever coin
                led took over the allocation. That drift is the mechanism behind whatever the table above shows: rebalancing would have kept
                trimming the leader, which helps when the lead rotates and hurts when it does not. Either way, the portfolio you end up holding
                is not the one you chose.
              </p>
              <div className="flex flex-wrap gap-2">
                {active.map((b, i) => (
                  <span key={b} className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1.5 rounded-lg bg-white/70 dark:bg-slate-900/60 text-amber-900 dark:text-amber-200 border border-amber-500/25 tabular-nums">
                    <CoinLogo base={b} size={14} />
                    {b} {(buyHold.finalDriftWeights[i] * 100).toFixed(1)}%
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">When rebalancing helps, and when it does the opposite</h2>
        <p className="mb-2">
          Rebalancing sells whatever rose and buys whatever fell. That is profitable when assets take turns leading, because it systematically
          trims the expensive one and adds to the cheap one. It is costly when one asset simply keeps winning, because it repeatedly cuts the
          winner. Crypto has mostly been the second case, which is why the advice to rebalance regularly is worth testing rather than assuming.
        </p>
        <p className="mb-2">
          The claim that rebalancing reduces risk is also conditional. In a sustained decline it makes drawdown <b>worse</b>, because each
          rebalance moves money into the asset that is falling. It reduces drawdown only when the pair mean-reverts. Both drawdown columns are
          shown so the direction is visible rather than assumed.
        </p>
        <p>
          Fees are included because leaving them out flatters rebalancing, and the effect compounds with frequency: weekly rebalancing trades
          roughly thirteen times as often as quarterly. Taxes are not modelled at all, and in jurisdictions where each rebalance is a disposal
          they can dominate everything on this page.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/correlation" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          Check whether these coins actually diversify each other →
        </Link>
      </div>
    </>
  );
}
