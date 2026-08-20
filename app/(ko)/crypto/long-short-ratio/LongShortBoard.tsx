'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchTopSymbols, mapWithConcurrency } from '@/lib/binance';
import {
  fetchPositioning, ratioOf, skewPp, accountVsMoneyGapPp, crowding,
  type LongShortRow, type Crowding,
} from '@/lib/longshort';
import { COINS } from '@/lib/coins';
import { CoinLogo, formatVolume } from '@/components/crypto/ui';

/** 표에 올릴 종목 수 — 종목마다 요청 3건이라 무한정 늘릴 수 없다 */
const UNIVERSE = 24;
const CONCURRENCY = 5;

type State = 'loading' | 'ready' | 'error';
type SortKey = 'crowded' | 'long' | 'short' | 'oi';

const slugOf = (base: string) => COINS.find(c => c.base === base)?.slug ?? null;

const CROWD_UI: Record<Crowding, { label: string; cls: string }> = {
  crowded: { label: 'Crowded', cls: 'bg-rose-500/15 text-rose-700 dark:text-rose-400' },
  tilted: { label: 'Tilted', cls: 'bg-amber-500/15 text-amber-700 dark:text-amber-400' },
  balanced: { label: 'Balanced', cls: 'bg-slate-500/15 text-slate-500 dark:text-slate-400' },
};

const SORTS: [SortKey, string][] = [
  ['oi', 'Biggest market'],
  ['crowded', 'Most one-sided'],
  ['long', 'Most long'],
  ['short', 'Most short'],
];

export default function LongShortBoard() {
  const [state, setState] = useState<State>('loading');
  const [rows, setRows] = useState<LongShortRow[]>([]);
  /**
   * 기본 정렬을 미결제약정으로 둔다. 거래대금 상위에는 토큰화 주식(SNDK·XAG 등)이
   * 몰려 있어 "가장 쏠린 순"으로 시작하면 정작 사람들이 찾는 BTC·ETH가 아래로 밀린다.
   */
  const [sortKey, setSortKey] = useState<SortKey>('oi');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const tops = await fetchTopSymbols(UNIVERSE, 'futures');
      const results = await mapWithConcurrency(tops, CONCURRENCY, async t => {
        const p = await fetchPositioning(t.symbol);
        return p ? { ...p, base: t.base, symbol: t.symbol, quoteVolume: t.quoteVolume } : null;
      });
      const out = results.filter((r): r is LongShortRow => r != null);
      if (!out.length) { setState('error'); return; }
      setRows(out);
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 포지셔닝 데이터는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const shown = useMemo(() => {
    const s = [...rows];
    if (sortKey === 'crowded') s.sort((a, b) => Math.abs(b.globalLongAccount - 0.5) - Math.abs(a.globalLongAccount - 0.5));
    else if (sortKey === 'long') s.sort((a, b) => b.globalLongAccount - a.globalLongAccount);
    else if (sortKey === 'short') s.sort((a, b) => a.globalLongAccount - b.globalLongAccount);
    else s.sort((a, b) => (b.openInterestUsd ?? 0) - (a.openInterestUsd ?? 0));
    return s;
  }, [rows, sortKey]);

  /** 계정과 금액이 가장 크게 갈리는 종목 — 이 페이지가 보여주려는 것 */
  const widestGap = useMemo(() => {
    let best: { row: LongShortRow; gap: number } | null = null;
    for (const r of rows) {
      const g = accountVsMoneyGapPp(r.globalLongAccount, r.topLongPosition);
      if (g == null) continue;
      if (!best || Math.abs(g) > Math.abs(best.gap)) best = { row: r, gap: g };
    }
    return best;
  }, [rows]);

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Reading positioning for {UNIVERSE} futures markets…</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div role="alert" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load positioning data</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">Binance futures may be restricted in your region</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-amber-950 bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* 세 가지가 다른 것을 잰다는 점을 먼저 밝힌다 */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
        <h2 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1.5">Counting people is not counting money</h2>
        <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed">
          Binance publishes three different ratios and most sites pick one and call it &quot;the&quot; long/short ratio. The account ratio counts
          how many traders sit on each side; the top-trader position ratio weights by how much money is actually there. When many small
          accounts are long while a few large positions are short, the two point in opposite directions — which is exactly the case worth seeing.
          {widestGap && (
            <> Right now the widest split is <b>{widestGap.row.base}</b>, where the account skew is
            {' '}<b>{Math.abs(widestGap.gap).toFixed(1)}%p</b> {widestGap.gap > 0 ? 'more long than the money is' : 'less long than the money is'}.</>
          )}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="inline-flex flex-wrap rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
          {SORTS.map(([k, label]) => (
            <button key={k} type="button" aria-pressed={sortKey === k} onClick={() => setSortKey(k)}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                sortKey === k ? 'bg-amber-500 text-amber-950' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="scroll-x overflow-x-auto max-h-[600px] overflow-y-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Coin</th>
                <th scope="col" className="text-left font-semibold px-3 py-3">
                  Accounts
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">how many traders</span>
                </th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Ratio</th>
                <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  Top traders&apos; money
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">position weighted</span>
                </th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Gap</th>
                <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Open interest</th>
              </tr>
            </thead>
            <tbody>
              {shown.map(r => {
                const slug = slugOf(r.base);
                const longPct = r.globalLongAccount * 100;
                const ratio = ratioOf(r.globalLongAccount);
                const gap = accountVsMoneyGapPp(r.globalLongAccount, r.topLongPosition);
                const c = crowding(r.globalLongAccount);
                const skew = skewPp(r.globalLongAccount) ?? 0;
                return (
                  <tr key={r.symbol} className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-2">
                        <CoinLogo base={r.base} size={20} />
                        {slug ? (
                          <Link href={`/crypto/${slug}/price-prediction`} className="font-bold text-slate-800 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400">{r.base}</Link>
                        ) : <span className="font-bold text-slate-800 dark:text-slate-100">{r.base}</span>}
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${CROWD_UI[c].cls}`}>{CROWD_UI[c].label}</span>
                      </span>
                    </td>
                    <td className="px-3 py-2.5 min-w-[150px]">
                      {/* 색만으로 방향을 전달하지 않도록 숫자를 함께 쓴다 */}
                      <span className="flex h-2 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800" role="img"
                        aria-label={`${longPct.toFixed(1)}% long, ${(100 - longPct).toFixed(1)}% short`}>
                        <span className="bg-emerald-500" style={{ width: `${longPct}%` }} />
                        <span className="bg-rose-500" style={{ width: `${100 - longPct}%` }} />
                      </span>
                      <span className="block text-[10px] tabular-nums text-slate-500 dark:text-slate-400 mt-1">
                        {longPct.toFixed(1)}% long · {(100 - longPct).toFixed(1)}% short
                      </span>
                    </td>
                    <td className={`px-3 py-2.5 text-right tabular-nums font-bold ${skew >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {ratio != null ? `${ratio.toFixed(2)}` : '—'}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300 border-l border-slate-200/40 dark:border-slate-700/40">
                      {r.topLongPosition != null ? `${(r.topLongPosition * 100).toFixed(1)}% long` : '—'}
                    </td>
                    <td className={`px-3 py-2.5 text-right tabular-nums ${gap != null && Math.abs(gap) >= 5 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                      {gap != null ? `${gap >= 0 ? '+' : ''}${gap.toFixed(1)}%p` : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400 border-l border-slate-200/40 dark:border-slate-700/40">
                      {r.openInterestUsd != null ? formatVolume(r.openInterestUsd) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <b className="text-slate-600 dark:text-slate-300">Gap</b> is the account skew minus the money skew, in percentage points. A positive gap
          means the crowd is more long than the capital is. <b className="text-slate-600 dark:text-slate-300">Open interest</b> is the notional value
          of all open positions — a lopsided ratio on a thin market says much less than the same ratio on a deep one.
          &quot;Crowded&quot; and &quot;tilted&quot; are labels at 20 and 10 percentage points from even; those cutoffs are conventions, not findings.
        </div>
      </div>

      {/* 검증할 수 없다는 사실을 숨기지 않는다 */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Why there is no backtest on this page</h2>
        <p className="mb-2">
          Other pages on this site test the popular claim rather than repeating it — the fear and greed index gets a direct measurement of whether
          buying the fear paid. The obvious equivalent here is &quot;fade the crowd&quot;: when accounts pile onto one side, does the price go the
          other way? That claim is everywhere and almost never checked.
        </p>
        <p>
          It is not checked here either, and the reason is the data. Binance exposes only <b className="text-slate-700 dark:text-slate-200">30 days</b> of
          this positioning history at any interval. Thirty days sits inside a single market mood, so a backtest over it would produce a number with
          no evidential weight — and a number with no weight is worse than none, because it looks like evidence. The board below is a description of
          where people are standing right now. It is not a signal, and this page will not dress it up as one.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/funding-rates" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See what that positioning costs to hold →
        </Link>
      </div>
    </>
  );
}
