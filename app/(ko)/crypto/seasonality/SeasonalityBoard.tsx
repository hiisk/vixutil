'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchFullDailyKlines } from '@/lib/binance';
import {
  seasonality, maxDrawdownPct, binomialTwoSidedP, MONTH_SHORT, MONTH_NAMES,
  type MonthStat,
} from '@/lib/seasonality';
import { COINS, marketOf, symbolOf, type CoinMeta } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

const SUGGEST_LIMIT = 8;
/** 이 아래면 계절성을 말할 표본이 아니다 */
const MIN_YEARS = 5;
/** 다중비교 — 12개 월을 동시에 보므로 이만큼은 우연히 "유의"해 보인다 */
const MONTHS_TESTED = 12;

type State = 'loading' | 'ready' | 'nodata' | 'error';

interface Snapshot {
  coin: CoinMeta;
  stats: MonthStat[];
  totalDays: number;
  maxDd: number | null;
  firstYear: number;
  lastYear: number;
}

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';

const signed = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;
const rCls = (v: number) => (v >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400');

export default function SeasonalityBoard() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [slug, setSlug] = useState('bitcoin');
  const [query, setQuery] = useState('');

  const coin = useMemo(() => COINS.find(c => c.slug === slug) ?? COINS.find(c => c.base === 'BTC')!, [slug]);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const market = marketOf(coin);
      // 이 페이지는 현재가가 필요 없다. 예전엔 fetchTickers(1.8MB)를 함께 불렀는데
      // 결과를 쓰지도 않았다 — 순수 낭비라 제거했다.
      const klines = await fetchFullDailyKlines(symbolOf(coin), market);
      if (klines.length < 120) { setState('nodata'); return; }
      const stats = seasonality(klines.map(k => ({ day: k.openTime, close: k.close })));
      if (!stats.length) { setState('nodata'); return; }
      setSnap({
        coin,
        stats,
        totalDays: klines.length,
        maxDd: maxDrawdownPct(klines.map(k => k.close)),
        firstYear: new Date(klines[0].openTime).getUTCFullYear(),
        lastYear: new Date(klines[klines.length - 1].openTime).getUTCFullYear(),
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

  /** 각 월의 승률이 동전 던지기와 구별되는지 */
  const rows = useMemo(() => {
    if (!snap) return [];
    return snap.stats.map(s => {
      const wins = Math.round((s.winRatePct / 100) * s.years);
      const p = binomialTwoSidedP(wins, s.years);
      return { ...s, wins, p };
    });
  }, [snap]);

  const maxYears = rows.length ? Math.max(...rows.map(r => r.years)) : 0;
  /** p<0.05인 월 수 — 다중비교 기준선과 비교하기 위한 값 */
  const significant = rows.filter(r => r.p != null && r.p < 0.05).length;
  const expectedByChance = MONTHS_TESTED * 0.05;

  const best = rows.length ? [...rows].sort((a, b) => b.medianPct - a.medianPct)[0] : null;
  const worst = rows.length ? [...rows].sort((a, b) => a.medianPct - b.medianPct)[0] : null;

  function pickCoin(c: CoinMeta) { setSlug(c.slug); setQuery(''); }

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5" htmlFor="se-coin">Coin</label>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <input id="se-coin" type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder={`${coin.base} · search another coin`} className={inputCls} autoComplete="off" />
            {suggestions.length > 0 && (
              <ul className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
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
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{snap.coin.base}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                  {snap.firstYear}–{snap.lastYear} · {snap.totalDays.toLocaleString()} days
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

      {/* 표본 경고를 표보다 먼저 놓는다 — 순서가 곧 강조다 */}
      {snap && (
        <div className={`rounded-lg border p-5 mb-4 ${maxYears < MIN_YEARS ? 'border-rose-500/40 bg-rose-50 dark:bg-rose-500/[0.08]' : 'border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07]'}`}>
          <h2 className={`text-sm font-bold mb-1.5 ${maxYears < MIN_YEARS ? 'text-rose-800 dark:text-rose-300' : 'text-amber-900 dark:text-amber-200'}`}>
            Each month has {maxYears} observations, not {snap.totalDays.toLocaleString()}
          </h2>
          <p className={`text-xs leading-relaxed ${maxYears < MIN_YEARS ? 'text-rose-800/85 dark:text-rose-300/85' : 'text-amber-900/85 dark:text-amber-200/85'}`}>
            A seasonality table looks like it rests on years of daily data. It does not. Every &quot;September&quot; figure comes from the
            number of Septembers observed — for {snap.coin.base} that is <b>{maxYears}</b>. A median built from {maxYears} numbers flips
            entirely if one year happened to move hard, and with twelve months examined at once roughly{' '}
            <b>{expectedByChance.toFixed(1)}</b> of them should look statistically interesting by chance alone.
            {maxYears < MIN_YEARS
              ? ' At this sample size the table below is not evidence of a seasonal pattern. It is shown so you can see how thin it is.'
              : ' Read the p column before the return column.'}
          </p>
        </div>
      )}

      {rows.length > 0 && snap && (
        <>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">{snap.coin.name} by calendar month</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Each row is the same month across every year of history. The bar shows the median.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Month</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Median</th>
                    <th scope="col" className="text-left font-semibold px-3 py-3 w-[150px]">&nbsp;</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Up years</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">
                      p
                      <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">vs a coin flip</span>
                    </th>
                    <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Worst</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3">Best</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => {
                    const w = Math.min(100, Math.abs(r.medianPct) * 4);
                    return (
                      <tr key={r.month} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200">
                          {MONTH_SHORT[r.month]}
                          <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 tabular-nums">{r.years} yrs</span>
                        </td>
                        <td className={`px-3 py-2.5 text-right tabular-nums font-bold ${rCls(r.medianPct)}`}>{signed(r.medianPct)}</td>
                        <td className="px-3 py-2.5">
                          {/* 0을 가운데 두고 좌우로 뻗는 막대 */}
                          <span className="relative block h-2 rounded-full bg-slate-100 dark:bg-slate-800" aria-hidden="true">
                            <span className="absolute inset-y-0 w-px bg-slate-300 dark:bg-slate-600" style={{ left: '50%' }} />
                            <span
                              className={`absolute inset-y-0 rounded-full ${r.medianPct >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                              style={r.medianPct >= 0 ? { left: '50%', width: `${w / 2}%` } : { right: '50%', width: `${w / 2}%` }}
                            />
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300 border-l border-slate-200/40 dark:border-slate-700/40">
                          {r.wins}/{r.years}
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400">{r.winRatePct.toFixed(0)}%</span>
                        </td>
                        <td className={`px-3 py-2.5 text-right tabular-nums ${r.p != null && r.p < 0.05 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                          {r.p != null ? r.p.toFixed(2) : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-rose-600/80 dark:text-rose-400/80 border-l border-slate-200/40 dark:border-slate-700/40">{signed(r.worstPct)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-emerald-600/80 dark:text-emerald-400/80">{signed(r.bestPct)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <b className="text-slate-600 dark:text-slate-300">p</b> is the two-sided probability of seeing that many up-years or fewer, or that
              many or more, from a fair coin. A value of 0.50 means the split is unremarkable. Months here reach p&lt;0.05:{' '}
              <b className="text-slate-600 dark:text-slate-300">{significant}</b> — against roughly {expectedByChance.toFixed(1)} expected purely by
              chance from testing twelve months, so even the flagged ones are not surprising on their own.
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {[
              ['Strongest month', best ? `${MONTH_NAMES[best.month]} ${signed(best.medianPct)}` : '—', best ? `${best.wins}/${best.years} up · p=${best.p?.toFixed(2) ?? '—'}` : ''],
              ['Weakest month', worst ? `${MONTH_NAMES[worst.month]} ${signed(worst.medianPct)}` : '—', worst ? `${worst.wins}/${worst.years} up · p=${worst.p?.toFixed(2) ?? '—'}` : ''],
              ['Worst drawdown ever', snap.maxDd != null ? `−${snap.maxDd.toFixed(1)}%` : '—', 'peak to trough, any period'],
            ].map(([label, v, note]) => (
              <div key={label} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                <p className="text-base font-bold text-slate-900 dark:text-white tabular-nums">{v}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{note}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Why &quot;Uptober&quot; is not evidence</h2>
        <p className="mb-2">
          Named seasonal patterns get repeated because they are memorable, and the arithmetic that would deflate them is rarely shown.
          Nine Octobers is nine observations. Seven of nine going up sounds convincing until you work out how often a fair coin does that —
          often enough that it needs no explanation at all.
        </p>
        <p>
          The problem compounds because twelve months are examined together. Testing twelve things at a 5% threshold produces about
          0.6 apparent hits by chance, so finding one striking month in a calendar year is the expected outcome of looking, not a discovery.
          That is why the p column sits next to every return here, and why this page draws no conclusion from the table.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href={`/crypto/${coin.slug}/price-prediction`} className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See {coin.name}&apos;s forward-looking ranges →
        </Link>
      </div>
    </>
  );
}
