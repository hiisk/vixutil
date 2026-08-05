'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchDailyCandles, mapWithConcurrency } from '@/lib/binance';
import {
  logReturns, pearson, downsideCapture, rollingRange, corrLabel,
} from '@/lib/correlation';
import { COINS } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

/** 매트릭스에 넣을 코인 — 사람들이 실제로 비교하는 대형 코인 */
const UNIVERSE = ['BTC', 'ETH', 'SOL', 'XRP', 'BNB', 'DOGE', 'ADA', 'LINK', 'AVAX', 'TRX'];
const CONCURRENCY = 5;
/** 구간 선택지 (일) */
const PERIODS: [string, number][] = [['90D', 90], ['180D', 180], ['1Y', 365], ['2Y', 730]];
/** 급락일 기준 (%) */
const CRASH_PCT = 3;
/** 불안정성을 볼 때 나눌 구간 수 */
const CHUNKS = 4;

type State = 'loading' | 'ready' | 'error';

const slugOf = (base: string) => COINS.find(c => c.base === base)?.slug ?? null;

/** 상관계수를 배경색으로 — 숫자를 항상 함께 쓴다 */
function cellBg(r: number | null): string {
  if (r == null) return '';
  const a = Math.max(0, Math.min(1, Math.abs(r)));
  const alpha = 0.06 + a * 0.3;
  return r >= 0 ? `rgba(16,185,129,${alpha})` : `rgba(244,63,94,${alpha})`;
}

export default function CorrelationBoard() {
  const [state, setState] = useState<State>('loading');
  /** 코인별 로그수익률 — 가장 긴 구간을 한 번만 받고 구간 전환은 재계산만 한다 */
  const [rets, setRets] = useState<Record<string, number[]>>({});
  const [days, setDays] = useState(365);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const maxDays = Math.max(...PERIODS.map(p => p[1]));
      const out = await mapWithConcurrency(UNIVERSE, CONCURRENCY, async base => {
        try {
          const k = await fetchDailyCandles(`${base}USDT`, maxDays, 'spot');
          return { base, rets: logReturns(k.map(x => x.close)) };
        } catch { return null; }
      });
      const map: Record<string, number[]> = {};
      for (const r of out) if (r && r.rets.length > 60) map[r.base] = r.rets;
      if (Object.keys(map).length < 3) { setState('error'); return; }
      setRets(map);
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const bases = useMemo(() => UNIVERSE.filter(b => rets[b]), [rets]);

  /** 선택한 구간으로 자른 수익률 */
  const win = useMemo(() => {
    const m: Record<string, number[]> = {};
    for (const b of bases) m[b] = rets[b].slice(-days);
    return m;
  }, [bases, rets, days]);

  const matrix = useMemo(() => {
    const m: Record<string, Record<string, number | null>> = {};
    for (const a of bases) {
      m[a] = {};
      for (const b of bases) m[a][b] = a === b ? 1 : pearson(win[a], win[b], 30);
    }
    return m;
  }, [bases, win]);

  /** BTC 기준: 구간별 불안정성 + 급락일 하방 추종 */
  const vsBtc = useMemo(() => {
    const btc = win.BTC;
    if (!btc) return [];
    return bases.filter(b => b !== 'BTC').map(b => ({
      base: b,
      corr: pearson(win[b], btc, 30),
      range: rollingRange(win[b], btc, CHUNKS, 25),
      down: downsideCapture(win[b], btc, CRASH_PCT),
    }));
  }, [bases, win]);

  /** 가장 흔들리는 쌍 — "상관계수는 고정값이 아니다"의 증거 */
  const widest = useMemo(() => {
    let best: { base: string; width: number; min: number; max: number } | null = null;
    for (const v of vsBtc) {
      if (!v.range) continue;
      const width = v.range.max - v.range.min;
      if (!best || width > best.width) best = { base: v.base, width, min: v.range.min, max: v.range.max };
    }
    return best;
  }, [vsBtc]);

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading two years for {UNIVERSE.length} coins…</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div role="alert" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load market data</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
          {PERIODS.map(([label, d]) => (
            <button key={d} type="button" aria-pressed={days === d} onClick={() => setDays(d)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                days === d ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 매트릭스 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-sm font-black text-slate-900 dark:text-white">Daily return correlation · last {days} days</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            1.00 means the two moved together every day; 0 means no linear relationship.
          </p>
        </div>
        <div className="scroll-x overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-3 py-2.5 sticky left-0 bg-white dark:bg-slate-900">&nbsp;</th>
                {bases.map(b => (
                  <th scope="col" key={b} className="text-center font-semibold px-2 py-2.5 tabular-nums">{b}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bases.map(a => (
                <tr key={a} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                  <th scope="row" className="text-left font-bold px-3 py-2 sticky left-0 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                    <span className="flex items-center gap-1.5">
                      <CoinLogo base={a} size={16} />{a}
                    </span>
                  </th>
                  {bases.map(b => {
                    const v = matrix[a]?.[b] ?? null;
                    return (
                      <td key={b} className="text-center px-2 py-2 tabular-nums text-[12px] text-slate-700 dark:text-slate-200"
                        style={{ background: a === b ? undefined : cellBg(v) }}>
                        {a === b ? <span className="text-slate-300 dark:text-slate-600">—</span> : v != null ? v.toFixed(2) : '·'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 불안정성 — 이 페이지의 요점 */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
        <h2 className="text-sm font-black text-amber-900 dark:text-amber-200 mb-1.5">That matrix is one number for a moving target</h2>
        <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed">
          Correlation is not a property of a pair; it is a property of a pair over a window. Split the same {days} days into {CHUNKS} equal
          parts and the figure moves — sometimes a lot.
          {widest && (
            <> Over this window <b>{widest.base}</b> against BTC ranged from <b>{widest.min.toFixed(2)}</b> to <b>{widest.max.toFixed(2)}</b>,
            a spread of <b>{widest.width.toFixed(2)}</b>. A portfolio built on the single average would have been designed for a relationship
            that did not hold for most of the period.</>
          )}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-sm font-black text-slate-900 dark:text-white">Against Bitcoin, and on the days that matter</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Diversification is only tested when things fall. The last column reports what each coin actually did on days BTC dropped more than {CRASH_PCT}%.
          </p>
        </div>
        <div className="scroll-x overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Coin</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">vs BTC</th>
                <th scope="col" className="text-left font-semibold px-3 py-3">Reading</th>
                <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  Across {CHUNKS} sub-periods
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">how much it moved</span>
                </th>
                <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  On BTC −{CRASH_PCT}% days
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">median move · ×BTC</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {vsBtc.map(v => {
                const slug = slugOf(v.base);
                return (
                  <tr key={v.base} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5">
                      <span className="flex items-center gap-2">
                        <CoinLogo base={v.base} size={20} />
                        {slug ? (
                          <Link href={`/crypto/${slug}/price-prediction`} className="font-bold text-slate-800 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400">{v.base}</Link>
                        ) : <span className="font-bold text-slate-800 dark:text-slate-100">{v.base}</span>}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-black text-slate-900 dark:text-white">
                      {v.corr != null ? v.corr.toFixed(2) : '—'}
                    </td>
                    <td className="px-3 py-2.5 text-slate-500 dark:text-slate-400 text-[12px]">
                      {v.corr != null ? corrLabel(v.corr) : '—'}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40">
                      {v.range ? (
                        <>
                          <span className="text-slate-700 dark:text-slate-200">{v.range.min.toFixed(2)} – {v.range.max.toFixed(2)}</span>
                          <span className={`block text-[10px] ${v.range.max - v.range.min >= 0.2 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                            spread {(v.range.max - v.range.min).toFixed(2)}
                          </span>
                        </>
                      ) : <span className="text-slate-400 dark:text-slate-500">—</span>}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40">
                      {v.down.capture != null ? (
                        <>
                          <span className="text-rose-600 dark:text-rose-400 font-bold">{v.down.assetMedianPct!.toFixed(2)}%</span>
                          <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                            {v.down.capture.toFixed(2)}× BTC · {v.down.days}d
                          </span>
                        </>
                      ) : <span className="text-slate-400 dark:text-slate-500">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          The last column deliberately reports a <b className="text-slate-600 dark:text-slate-300">median move</b> rather than a correlation
          measured on those days. Restricting a sample to days when one variable moved a lot mechanically distorts correlation, so a
          &quot;crash correlation&quot; figure can drift up or down for reasons that have nothing to do with diversification. How far each coin
          actually fell has no such artefact and answers the question directly.
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">What a correlation matrix cannot tell you</h2>
        <p className="mb-2">
          It measures linear co-movement of daily returns over one chosen window, and nothing else. It does not say the pair will keep
          behaving that way, does not capture relationships that are not linear, and gives equal weight to a quiet Tuesday and a liquidation
          cascade. Two coins at 0.6 can behave very differently in the only week you would care about.
        </p>
        <p>
          The wider point for crypto is that low correlations here are mostly low by degree rather than in kind. Almost every pair on this
          board sits well above zero, so a portfolio of them is closer to one position in different proportions than to a diversified one.
          The numbers are worth knowing; treating them as risk reduction is where it goes wrong.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/all-time-high" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See how far each of these sits below its high →
        </Link>
      </div>
    </>
  );
}
