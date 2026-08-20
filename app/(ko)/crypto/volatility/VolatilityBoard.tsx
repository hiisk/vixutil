'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchTopSymbols, fetchDailyCandles, mapWithConcurrency } from '@/lib/binance';
import { stdev, DAYS_PER_YEAR } from '@/lib/metrics';
import { logReturns } from '@/lib/correlation';
import { COINS } from '@/lib/coins';
import { CoinLogo, formatVolume } from '@/components/crypto/ui';

const UNIVERSE = 40;
const CONCURRENCY = 6;
/** 변동성을 재는 지평 (일) — 짧은 쪽이 지금, 긴 쪽이 평소 */
const WINDOWS = [7, 30, 90, 365];
/** 이보다 낮으면 페그 토큰이라 랭킹에 넣지 않는다 */
const MIN_VOL_PCT = 5;

type State = 'loading' | 'ready' | 'error';
type SortKey = 'now' | 'usual' | 'change';

interface Row {
  base: string;
  quoteVolume: number;
  /** WINDOWS와 같은 순서의 연환산 변동성(%) */
  vols: (number | null)[];
}

const slugOf = (base: string) => COINS.find(c => c.base === base)?.slug ?? null;

const SORTS: [SortKey, string][] = [
  ['now', 'Highest right now'],
  ['usual', 'Highest normally'],
  ['change', 'Biggest change'],
];

/** 변동성 크기에 따라 강조 */
function volCls(v: number | null): string {
  if (v == null) return 'text-slate-500 dark:text-slate-400';
  if (v >= 150) return 'text-rose-600 dark:text-rose-400 font-bold';
  if (v >= 100) return 'text-orange-600 dark:text-orange-400 font-bold';
  if (v >= 60) return 'text-amber-600 dark:text-amber-400';
  return 'text-slate-700 dark:text-slate-200';
}

/** 연환산 변동성을 "하루 평균 몇 %" 로 되돌린다 — 훨씬 직관적이다 */
const dailyFrom = (annualPct: number) => annualPct / Math.sqrt(DAYS_PER_YEAR);

export default function VolatilityBoard() {
  const [state, setState] = useState<State>('loading');
  const [rows, setRows] = useState<Row[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('now');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const maxDays = Math.max(...WINDOWS);
      const tops = await fetchTopSymbols(UNIVERSE);
      const out = await mapWithConcurrency(tops, CONCURRENCY, async t => {
        try {
          const k = await fetchDailyCandles(t.symbol, maxDays);
          const closes = k.map(x => x.close);
          if (closes.length < 30) return null;
          const vols = WINDOWS.map(w => {
            const rets = logReturns(closes.slice(-(w + 1)));
            if (rets.length < Math.min(w, 20)) return null;
            const sd = stdev(rets.filter(v => isFinite(v)));
            return sd != null && sd > 0 ? sd * Math.sqrt(DAYS_PER_YEAR) * 100 : null;
          });
          return { base: t.base, quoteVolume: t.quoteVolume, vols };
        } catch { return null; }
      });
      // 가장 긴 창의 변동성이 페그 수준이면 제외한다
      const rs = out.filter((r): r is Row => {
        if (r == null) return false;
        const longest = r.vols[r.vols.length - 1] ?? r.vols.find(v => v != null) ?? null;
        return longest != null && longest >= MIN_VOL_PCT;
      });
      if (!rs.length) { setState('error'); return; }
      setRows(rs);
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  /** 지금(7일) 대비 평소(365일) 배수 */
  const ratioOf = useCallback((r: Row) => {
    const now = r.vols[0];
    const usual = r.vols[WINDOWS.length - 1];
    return now != null && usual != null && usual > 0 ? now / usual : null;
  }, []);

  const shown = useMemo(() => {
    const s = [...rows];
    const val = (r: Row) => {
      if (sortKey === 'now') return r.vols[0];
      if (sortKey === 'usual') return r.vols[WINDOWS.length - 1];
      const q = ratioOf(r);
      return q == null ? null : Math.abs(Math.log(q));
    };
    s.sort((a, b) => (val(b) ?? -Infinity) - (val(a) ?? -Infinity));
    return s;
  }, [rows, sortKey, ratioOf]);

  /** 지금과 평소가 가장 크게 갈린 코인 */
  const mostChanged = useMemo(() => {
    let best: { base: string; q: number } | null = null;
    for (const r of rows) {
      const q = ratioOf(r);
      if (q == null) continue;
      if (!best || Math.abs(Math.log(q)) > Math.abs(Math.log(best.q))) best = { base: r.base, q };
    }
    return best;
  }, [rows, ratioOf]);

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Measuring {UNIVERSE} coins over four windows…</span>
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
      <div className="rounded-lg border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
        <h2 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1.5">Volatility is the one thing here that does predict</h2>
        <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed">
          Direction is not forecastable from price, but volatility is: a coin that has been violent this week is more likely than not to be
          violent next week. That makes this the most useful ranking on the site — and the reason four windows are shown rather than one.
          The short window is what is happening now; the long one is the coin&apos;s normal state. When they diverge, the coin is in an unusual
          regime rather than simply being a volatile coin.
          {mostChanged && (
            <> The widest gap right now is <b>{mostChanged.base}</b>, running at <b>{mostChanged.q.toFixed(2)}×</b> its usual level.</>
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
        <div className="scroll-x overflow-x-auto max-h-[620px] overflow-y-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Coin</th>
                {WINDOWS.map((w, i) => (
                  <th scope="col" key={w} className={`text-right font-semibold px-3 py-3 ${i === 0 ? 'border-l border-slate-200/70 dark:border-slate-700/70' : ''}`}>
                    {w}d
                    {i === 0 && <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">now</span>}
                    {i === WINDOWS.length - 1 && <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">usual</span>}
                  </th>
                ))}
                <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  Now ÷ usual
                </th>
                <th scope="col" className="text-right font-semibold px-4 py-3">
                  Typical day
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">from 7d</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {shown.map(r => {
                const slug = slugOf(r.base);
                const q = ratioOf(r);
                const now = r.vols[0];
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
                    {r.vols.map((v, i) => (
                      <td key={WINDOWS[i]} className={`px-3 py-2.5 text-right tabular-nums ${i === 0 ? 'border-l border-slate-200/40 dark:border-slate-700/40' : ''} ${volCls(v)}`}>
                        {v != null ? `${v.toFixed(0)}%` : '—'}
                      </td>
                    ))}
                    <td className={`px-3 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${
                      q == null ? 'text-slate-500 dark:text-slate-400'
                      : q >= 1.5 ? 'text-rose-600 dark:text-rose-400 font-bold'
                      : q <= 0.67 ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300'
                    }`}>
                      {q != null ? `${q.toFixed(2)}×` : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">
                      {now != null ? `±${dailyFrom(now).toFixed(1)}%` : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          All figures are annualised standard deviations of daily log returns, so they are comparable across windows. The last column divides
          the annualised number back down by the square root of 365 to give the size of an ordinary day, which is usually the more legible
          form: 150% a year is roughly an eight percent day. Coins whose one-year volatility is under {MIN_VOL_PCT}% are excluded as effectively
          pegged.
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Why four windows instead of one</h2>
        <p className="mb-2">
          A single volatility figure conflates two different questions: how wild is this coin, and how wild is it being at the moment. The
          one-year number answers the first and the one-week number answers the second, and the ratio between them is the interesting part.
          A coin at three times its usual volatility is in an unusual state; a coin permanently at 150% is simply that kind of asset.
        </p>
        <p className="mb-2">
          The distinction matters for anything sized off volatility. Stops and position sizes set from a long-run figure will be too tight
          during a spike and needlessly wide during a lull, which is why the forecasts on this site blend a current and a long-run estimate
          rather than picking one.
        </p>
        <p>
          Volatility clustering is what makes this ranking worth reading at all. Regressing next week&apos;s volatility on the trailing twenty
          days across major coins gives a clearly positive relationship — high volatility is followed by high volatility. No equivalent
          statement is true of direction, which is why this page ranks turbulence and never suggests which way it will resolve.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/atr-tpsl" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          Turn that volatility into stop and target levels →
        </Link>
      </div>
    </>
  );
}
