'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchFullDailyKlines } from '@/lib/binance';
import {
  dailyReturns, weekdayStats, significantCount,
  WEEKDAY_SHORT, WEEKDAY_NAMES, EXPECTED_BY_CHANCE, WEEKDAYS_TESTED,
  type WeekdayStat,
} from '@/lib/weekday';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

const SUGGEST_LIMIT = 8;
/** 평균과 중앙값이 이 배수 이상 벌어지면 이상치가 평균을 끌고 있다고 본다 */
const OUTLIER_RATIO = 2;

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Snapshot {
  coin: CoinMeta;
  stats: WeekdayStat[];
  totalDays: number;
}

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';

const signed = (v: number, d = 3) => `${v >= 0 ? '+' : ''}${v.toFixed(d)}%`;
const rCls = (v: number) => (v >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400');

export default function WeekdayBoard() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const k = await fetchFullDailyKlines(symbolOf(coin), marketOf(coin));
      if (k.length < 200) { setState('nodata'); return; }
      const rets = dailyReturns(k.map(x => ({ day: x.openTime, close: x.close })));
      const stats = weekdayStats(rets);
      if (!stats.length) { setState('nodata'); return; }
      setSnap({ coin, stats, totalDays: rets.length });
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

  const sig = snap ? significantCount(snap.stats, 2) : 0;

  /** 평균이 이상치에 끌려간 요일 — 팻테일에서 t검정이 부풀려지는 자리 */
  const skewed = useMemo(() => {
    if (!snap) return [];
    return snap.stats.filter(s =>
      s.medianPct !== 0 && Math.abs(s.meanPct) > Math.abs(s.medianPct) * OUTLIER_RATIO,
    );
  }, [snap]);

  const best = snap?.stats.length ? [...snap.stats].sort((a, b) => b.meanPct - a.meanPct)[0] : null;

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="wd-coin">Coin</label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <input id="wd-coin" type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder={`${coin.base} · search another coin`} className={inputCls} autoComplete="off" />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                {suggestions.map(c => (
                  <li key={c.slug}>
                    <button type="button" onClick={() => pickCoin(c)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors">
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
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{snap.coin.base}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                  {snap.totalDays.toLocaleString()} days · ~{Math.round(snap.totalDays / 7)} of each weekday
                </p>
              </div>
            </div>
          )}
          {state === 'loading' && <span role="status" className="text-xs font-medium text-slate-500 dark:text-slate-400">Reading full history…</span>}
          {(state === 'error' || state === 'nodata') && (
            <span className="flex items-center gap-2 text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">{state === 'nodata' ? 'Not enough history' : 'Couldn’t load history'}</span>
              <button type="button" onClick={load} className="font-bold text-amber-600 dark:text-amber-400 hover:underline">Retry</button>
            </span>
          )}
        </div>
      </div>

      {snap && (
        <>
          <div className="rounded-lg border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
            <h2 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1.5">
              {sig === 0
                ? 'No weekday clears the significance bar'
                : `${sig} of ${WEEKDAYS_TESTED} weekdays clear |t| ≥ 2 — read the next paragraph before believing it`}
            </h2>
            <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed">
              Testing seven weekdays at a 5% threshold produces about <b>{EXPECTED_BY_CHANCE.toFixed(2)}</b> apparent hits from chance alone,
              so anything up to one is unremarkable.
              {sig > 0 && (
                <> Here {sig === 1 ? 'one clears it' : `${sig} clear it`}, which is more than chance predicts — but the t-test assumes a normal
                distribution and crypto daily returns are fat-tailed, which inflates it.</>
              )}
              {skewed.length > 0 && (
                <> The tell is in the table: {skewed.map(s => WEEKDAY_SHORT[s.weekday]).join(', ')} {skewed.length === 1 ? 'has' : 'have'} a
                mean more than {OUTLIER_RATIO}× the median, meaning a handful of enormous days are carrying the average rather than a
                consistent tendency.</>
              )}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">{snap.coin.name} by weekday, UTC</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Compare the mean and median columns. When they disagree, the mean is being driven by outliers.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Day</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Mean</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Median</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Up</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Daily swing</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3">
                      t
                      <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">|t| ≥ 2 = &quot;significant&quot;</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {snap.stats.map(s => {
                    const isSig = s.tStat != null && Math.abs(s.tStat) >= 2;
                    const isSkewed = s.medianPct !== 0 && Math.abs(s.meanPct) > Math.abs(s.medianPct) * OUTLIER_RATIO;
                    return (
                      <tr key={s.weekday} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                        <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200">
                          {WEEKDAY_SHORT[s.weekday]}
                          <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 tabular-nums">{s.n} obs</span>
                        </td>
                        <td className={`px-3 py-2.5 text-right tabular-nums font-bold ${rCls(s.meanPct)}`}>
                          {signed(s.meanPct)}
                          {isSkewed && <span className="block text-[10px] text-amber-600 dark:text-amber-400">outlier-driven</span>}
                        </td>
                        <td className={`px-3 py-2.5 text-right tabular-nums ${rCls(s.medianPct)}`}>{signed(s.medianPct)}</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">{s.upRatePct.toFixed(1)}%</td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400 border-l border-slate-200/40 dark:border-slate-700/40">
                          ±{s.sdPct.toFixed(2)}%
                        </td>
                        <td className={`px-4 py-2.5 text-right tabular-nums ${isSig ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                          {s.tStat != null ? s.tStat.toFixed(2) : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              A day&apos;s return is its close against the previous close, assigned to the UTC weekday it closed on. The daily-swing column is
              the standard deviation of that weekday&apos;s returns, and it dwarfs every mean in the table — which is the real reason a weekday
              tilt is not tradeable even where the average looks favourable.
              {best && (
                <> The strongest average here is {WEEKDAY_NAMES[best.weekday]} at {signed(best.meanPct)}, against a typical daily swing of
                ±{best.sdPct.toFixed(2)}% on that same day.</>
              )}
            </div>
          </div>
        </>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Why weekday effects are weak in crypto specifically</h2>
        <p className="mb-2">
          Weekday patterns in traditional markets come from structure: exchanges close, settlement takes days, funds report on schedules, and
          news is released at set times. Crypto trades continuously with none of that machinery, so there is little mechanism for a
          day-of-week effect to arise from in the first place.
        </p>
        <p className="mb-2">
          The statistics reflect that. Sample size is not the constraint — nine years gives roughly 470 observations per weekday — the problem
          is that a plausible effect of a tenth of a percent has to be detected inside daily swings of three to four percent. Even a large
          sample cannot separate those, which is why a t-statistic can sit near zero despite hundreds of observations.
        </p>
        <p>
          Two further cautions apply to any weekday table, including this one. Seven simultaneous tests mean roughly a third of a false
          positive is expected by chance, so a single flagged day proves nothing. And because crypto returns are fat-tailed, the t-test
          overstates significance: comparing each mean against its median shows immediately when a few violent days are producing the result.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/seasonality" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          The same test applied to calendar months →
        </Link>
      </div>
    </>
  );
}
