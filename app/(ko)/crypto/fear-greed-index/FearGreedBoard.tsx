'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchFullDailyKlines } from '@/lib/binance';
import {
  classify, percentileOf, forwardReturnsByBucket, toUtcDay,
  type FngPoint, type FngBucket, type BucketStat,
} from '@/lib/feargreed';

const FNG_API = 'https://api.alternative.me/fng/?limit=0&format=json';
/** 이후 수익률을 재는 지평 (일) */
const HORIZONS = [30, 90];

type State = 'loading' | 'ready' | 'error';

interface Snapshot {
  current: number;
  currentBucket: FngBucket;
  updatedAt: number;
  values: number[];
  points: FngPoint[];
  closeByDay: Map<number, number>;
  /** 지수와 가격이 모두 있는 날 수 */
  overlapDays: number;
}

const BUCKET_UI: Record<FngBucket, { cls: string; bar: string }> = {
  'Extreme Fear': { cls: 'text-rose-600 dark:text-rose-400', bar: 'bg-rose-500' },
  Fear: { cls: 'text-orange-600 dark:text-orange-400', bar: 'bg-orange-500' },
  Neutral: { cls: 'text-slate-600 dark:text-slate-300', bar: 'bg-slate-400' },
  Greed: { cls: 'text-lime-600 dark:text-lime-400', bar: 'bg-lime-500' },
  'Extreme Greed': { cls: 'text-emerald-600 dark:text-emerald-400', bar: 'bg-emerald-500' },
};

const signed = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;
const rCls = (v: number) => (v >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400');

export default function FearGreedBoard() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [horizon, setHorizon] = useState(90);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const [fngRes, klines] = await Promise.all([
        fetch(FNG_API).then(r => r.json()),
        fetchFullDailyKlines('BTCUSDT', 'spot'),
      ]);
      const raw: Array<{ value: string; value_classification: string; timestamp: string }> = fngRes?.data ?? [];
      if (!raw.length || !klines.length) { setState('error'); return; }

      // 지수를 만든 곳의 분류를 그대로 쓴다 — 경계를 우리가 임의로 정하지 않는다
      const points: FngPoint[] = raw
        .map(d => ({
          day: toUtcDay(Number(d.timestamp) * 1000),
          value: Number(d.value),
          bucket: (d.value_classification as FngBucket) ?? classify(Number(d.value)),
        }))
        .filter(p => isFinite(p.value) && isFinite(p.day))
        .sort((a, b) => a.day - b.day);

      const closeByDay = new Map<number, number>();
      for (const k of klines) closeByDay.set(k.openTime, k.close);

      const latest = points[points.length - 1];
      setSnap({
        current: latest.value,
        currentBucket: latest.bucket,
        updatedAt: latest.day,
        values: points.map(p => p.value),
        points,
        closeByDay,
        overlapDays: points.filter(p => closeByDay.has(p.day)).length,
      });
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 지수와 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const stats: BucketStat[] = useMemo(
    () => (snap ? forwardReturnsByBucket(snap.points, snap.closeByDay, horizon) : []),
    [snap, horizon],
  );

  const pct = snap ? percentileOf(snap.values, snap.current) : null;

  /** 극단적 공포와 극단적 탐욕을 직접 비교 — 통념이 성립하는지 보는 자리 */
  const contrarian = useMemo(() => {
    const fear = stats.find(s => s.bucket === 'Extreme Fear');
    const greed = stats.find(s => s.bucket === 'Extreme Greed');
    if (!fear || !greed || !isFinite(fear.medianReturnPct) || !isFinite(greed.medianReturnPct)) return null;
    return { fear, greed, fearWins: fear.medianReturnPct > greed.medianReturnPct };
  }, [stats]);

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading the index and Bitcoin&apos;s full history…</span>
      </div>
    );
  }

  if (state === 'error' || !snap) {
    return (
      <div role="alert" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load the index</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  const ui = BUCKET_UI[snap.currentBucket];

  return (
    <>
      {/* 현재 값 */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 mb-4 text-center">
        <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Crypto Fear &amp; Greed Index</p>
        <p className={`text-6xl font-black tabular-nums ${ui.cls}`}>{snap.current}</p>
        <p className={`text-lg font-black mt-1 ${ui.cls}`}>{snap.currentBucket}</p>
        {pct != null && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
            Higher than <b className="tabular-nums">{pct.toFixed(0)}%</b> of the {snap.values.length.toLocaleString()} days since 2018
          </p>
        )}

        <div className="mt-5 max-w-md mx-auto">
          <div className="relative h-2.5 rounded-full bg-sec dark:via-slate-600">
            <span className="absolute rounded-full border-2 border-white dark:border-slate-900 bg-slate-900 dark:bg-white shadow"
              style={{ left: `calc(${Math.min(100, Math.max(0, snap.current))}% - 9px)`, top: -4, width: 18, height: 18 }} aria-hidden="true" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-2 tabular-nums">
            <span>0 · Extreme fear</span>
            <span>100 · Extreme greed</span>
          </div>
        </div>
      </div>

      {/* 백테스트 — 이 페이지의 존재 이유 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white">Does &quot;buy when there&apos;s fear&quot; actually work?</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Every day of the index joined to Bitcoin&apos;s close, grouped by reading. {snap.overlapDays.toLocaleString()} days overlap.
            </p>
          </div>
          <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
            {HORIZONS.map(h => (
              <button key={h} type="button" aria-pressed={horizon === h} onClick={() => setHorizon(h)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  horizon === h ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}>
                {h}d
              </button>
            ))}
          </div>
        </div>

        <div className="scroll-x overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Reading</th>
                <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  Median {horizon}d return
                </th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Positive</th>
                <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Days</th>
                <th scope="col" className="text-right font-semibold px-4 py-3">
                  Episodes
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">real sample size</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.map(s => (
                <tr key={s.bucket} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${BUCKET_UI[s.bucket].bar}`} aria-hidden="true" />
                      <span className={`font-bold ${BUCKET_UI[s.bucket].cls}`}>{s.bucket}</span>
                    </span>
                  </td>
                  <td className={`px-3 py-3 text-right tabular-nums font-black border-l border-slate-200/40 dark:border-slate-700/40 ${rCls(s.medianReturnPct)}`}>
                    {signed(s.medianReturnPct)}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-slate-600 dark:text-slate-300">{s.winRatePct.toFixed(0)}%</td>
                  <td className="px-3 py-3 text-right tabular-nums text-slate-500 dark:text-slate-400 border-l border-slate-200/40 dark:border-slate-700/40">{s.days.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-500 dark:text-slate-400">{s.episodes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {contrarian && (
          <div className={`px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-sm ${contrarian.fearWins ? 'bg-emerald-50 dark:bg-emerald-500/[0.07]' : 'bg-amber-50 dark:bg-amber-500/[0.07]'}`}>
            {contrarian.fearWins ? (
              <p className="text-slate-700 dark:text-slate-200">
                Over {horizon} days, buying at <b>Extreme Fear</b> returned a median of{' '}
                <b className={rCls(contrarian.fear.medianReturnPct)}>{signed(contrarian.fear.medianReturnPct)}</b> against{' '}
                <b className={rCls(contrarian.greed.medianReturnPct)}>{signed(contrarian.greed.medianReturnPct)}</b> at Extreme Greed —
                the contrarian reading holds at this horizon.
              </p>
            ) : (
              <p className="text-slate-700 dark:text-slate-200">
                Over {horizon} days, buying at <b>Extreme Fear</b> returned a median of{' '}
                <b className={rCls(contrarian.fear.medianReturnPct)}>{signed(contrarian.fear.medianReturnPct)}</b>, while{' '}
                <b>Extreme Greed</b> returned <b className={rCls(contrarian.greed.medianReturnPct)}>{signed(contrarian.greed.medianReturnPct)}</b>.
                The famous contrarian rule <b>does not hold</b> in this data — the sign runs the other way.
              </p>
            )}
          </div>
        )}

        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          <b className="text-slate-600 dark:text-slate-300">Read the episode column, not the day column.</b> Consecutive days at the same reading are
          not independent observations — a single month of fear contributes about thirty rows and one actual event. The episode count collapses each
          run into one, and it is far smaller. On top of that, the windows overlap and the entire sample sits inside one Bitcoin era, so this is
          evidence about what happened rather than a rule that will keep working. It is shown because the claim is testable and usually goes untested,
          not because the answer is dependable.
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">What the index is made of</h2>
        <p className="mb-2">
          The index is published by alternative.me and blends volatility, market momentum and volume, social media activity, Bitcoin dominance
          and Google Trends into a single 0–100 number. Most of those inputs are themselves derived from price, so the index moves closely with
          the market rather than independently of it — a low reading largely means the price has already fallen.
        </p>
        <p>
          That is worth holding onto when reading any signal drawn from it. An indicator built mostly from price cannot tell you much about price
          that the price has not already said. The table above is the direct test of whether it adds anything.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/bitcoin/price-prediction" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See Bitcoin&apos;s forward-looking ranges instead →
        </Link>
      </div>
    </>
  );
}
