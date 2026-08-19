'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchTopSymbols, fetchDailyCandles, mapWithConcurrency } from '@/lib/binance';
import {
  buildAltseasonIndex, distanceToBoundary, EXCLUDED,
  ALTSEASON_THRESHOLD, BITCOIN_SEASON_THRESHOLD, type AltseasonIndex,
} from '@/lib/altseason';
import { COINS } from '@/lib/coins';
import { CoinLogo } from '@/components/crypto/ui';

/** 표본 크기 — 널리 쓰이는 정의가 상위 50개다 */
const UNIVERSE = 50;
/** 동시 요청 수 — 바이낸스 레이트리밋을 넘지 않도록 */
const CONCURRENCY = 6;
/** 기간 선택지 (일) */
const PERIODS: [string, number][] = [['30D', 30], ['90D', 90], ['180D', 180], ['1Y', 365]];
/** 경계에서 이만큼 이내면 라벨을 단정하지 않는다 */
const CLOSE_CALL_PP = 5;

type State = 'loading' | 'ready' | 'error';

const slugOf = (base: string) => COINS.find(c => c.base === base)?.slug ?? null;
const signed = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;
const roiCls = (v: number) => (v >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400');

const LABEL_UI: Record<AltseasonIndex['label'], { text: string; cls: string; ring: string }> = {
  altseason: { text: 'Altcoin season', cls: 'text-violet-600 dark:text-violet-400', ring: 'border-violet-500/30 bg-violet-50 dark:bg-violet-500/[0.07]' },
  'bitcoin-season': { text: 'Bitcoin season', cls: 'text-amber-600 dark:text-amber-400', ring: 'border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07]' },
  neutral: { text: 'Neither', cls: 'text-slate-600 dark:text-slate-300', ring: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900' },
};

export default function AltseasonBoard() {
  const [state, setState] = useState<State>('loading');
  /** 코인별 종가를 한 번만 받아두고 기간 전환은 재계산만 한다 */
  const [universe, setUniverse] = useState<{ base: string; closes: number[]; quoteVolume: number }[]>([]);
  const [btcCloses, setBtcCloses] = useState<number[]>([]);
  const [days, setDays] = useState(90);

  const load = useCallback(async () => {
    setState('loading');
    try {
      // 가장 긴 기간(1년)을 한 번만 받아두면 기간 전환에 추가 요청이 없다
      const maxDays = Math.max(...PERIODS.map(p => p[1]));
      const tops = await fetchTopSymbols(UNIVERSE + EXCLUDED.size);
      const wanted = tops.filter(t => !EXCLUDED.has(t.base)).slice(0, UNIVERSE);
      const btc = await fetchDailyCandles('BTCUSDT', maxDays);
      const closesList = await mapWithConcurrency(wanted, CONCURRENCY, async t => {
        try { return await fetchDailyCandles(t.symbol, maxDays); } catch { return null; }
      });
      const rows = wanted
        .map((t, i) => ({ base: t.base, closes: (closesList[i] ?? []).map(k => k.close), quoteVolume: t.quoteVolume }))
        .filter(r => r.closes.length >= 2);
      if (!rows.length || btc.length < 2) { setState('error'); return; }
      setUniverse(rows);
      setBtcCloses(btc.map(k => k.close));
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const idx = useMemo(
    () => (universe.length && btcCloses.length ? buildAltseasonIndex(universe, btcCloses, days) : null),
    [universe, btcCloses, days],
  );

  const closeCall = idx ? distanceToBoundary(idx.index) <= CLOSE_CALL_PP : false;

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading {UNIVERSE} coins from Binance…</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">This one takes a moment — it reads a year of history per coin.</span>
      </div>
    );
  }

  if (state === 'error' || !idx) {
    return (
      <div role="alert" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load market data</span>
        <span className="text-xs text-slate-500 dark:text-slate-400">Binance may be restricted in your region</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  const ui = LABEL_UI[idx.label];

  return (
    <>
      {/* 기간 선택 */}
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

      {/* 지수 */}
      <div className={`rounded-xl border p-6 mb-4 text-center ${ui.ring}`}>
        <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
          Altcoin Season Index · {idx.days} days
        </p>
        <p className={`text-6xl font-bold tabular-nums ${ui.cls}`}>{idx.index.toFixed(0)}</p>
        <p className={`text-lg font-bold mt-1 ${ui.cls}`}>{ui.text}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          <b className="tabular-nums">{idx.outperformers}</b> of <b className="tabular-nums">{idx.total}</b> coins beat Bitcoin,
          which returned <b className={`tabular-nums ${roiCls(idx.btcReturnPct)}`}>{signed(idx.btcReturnPct)}</b> over this period.
        </p>

        {/* 눈금 — 경계가 어디인지 보여준다 */}
        {/*
          눈금은 반드시 실제 위치에 찍혀야 한다. justify-between으로 늘어놓으면 25가 33%
          자리에, 75가 59% 자리에 가서 눈금이 거짓말을 한다 — 절대 위치로 고정한다.
        */}
        <div className="mt-5 max-w-md mx-auto">
          <div className="relative h-2.5 rounded-full bg-sec dark:via-slate-600">
            {[BITCOIN_SEASON_THRESHOLD, ALTSEASON_THRESHOLD].map(t => (
              <span key={t} aria-hidden="true"
                className="absolute top-0 h-full w-px bg-white/80 dark:bg-slate-900/70"
                style={{ left: `${t}%` }} />
            ))}
            <span
              className="absolute rounded-full border-2 border-white dark:border-slate-900 bg-slate-900 dark:bg-white shadow"
              style={{ left: `calc(${Math.min(100, Math.max(0, idx.index))}% - 9px)`, top: -4, width: 18, height: 18 }}
              aria-hidden="true"
            />
          </div>
          <div className="relative h-8 mt-1.5 text-[10px] text-slate-500 dark:text-slate-400 tabular-nums">
            <span className="absolute left-0 top-0">0</span>
            <span className="absolute top-0 -translate-x-1/2" style={{ left: `${BITCOIN_SEASON_THRESHOLD}%` }}>{BITCOIN_SEASON_THRESHOLD}</span>
            <span className="absolute top-0 -translate-x-1/2" style={{ left: `${ALTSEASON_THRESHOLD}%` }}>{ALTSEASON_THRESHOLD}</span>
            <span className="absolute right-0 top-0">100</span>
            <span className="absolute left-0 top-4">← Bitcoin season</span>
            <span className="absolute right-0 top-4">Altcoin season →</span>
          </div>
        </div>

        {closeCall && (
          <p className="mt-4 text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/60 rounded-xl px-3 py-2 inline-block">
            This sits within {CLOSE_CALL_PP} points of a threshold. The label flips there, but nothing in the market does — read it as &quot;borderline&quot;.
          </p>
        )}
      </div>

      {/* 구성 종목 — 지수는 이 표의 요약일 뿐이다 */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Every coin behind that number</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            The index is just the share of this list above zero. Sites that publish only the headline number ask you to trust the list you cannot see.
          </p>
        </div>
        <div className="scroll-x overflow-x-auto max-h-[560px] overflow-y-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10">
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">#</th>
                <th scope="col" className="text-left font-semibold px-2 py-3">Coin</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Return</th>
                <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  vs BTC
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">percentage points</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {idx.rows.map((r, i) => {
                const slug = slugOf(r.base);
                return (
                  <tr key={r.base} className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400 tabular-nums">{i + 1}</td>
                    <td className="px-2 py-2.5">
                      <span className="flex items-center gap-2">
                        <CoinLogo base={r.base} size={20} />
                        {slug ? (
                          <Link href={`/crypto/${slug}/price-prediction`} className="font-bold text-slate-800 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400">
                            {r.base}
                          </Link>
                        ) : (
                          <span className="font-bold text-slate-800 dark:text-slate-100">{r.base}</span>
                        )}
                      </span>
                    </td>
                    <td className={`px-3 py-2.5 text-right tabular-nums ${roiCls(r.returnPct)}`}>{signed(r.returnPct)}</td>
                    <td className={`px-4 py-2.5 text-right tabular-nums font-bold border-l border-slate-200/40 dark:border-slate-700/40 ${r.outperformed ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400 dark:text-slate-500'}`}>
                      {r.vsBtcPp >= 0 ? '+' : ''}{r.vsBtcPp.toFixed(1)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 정직한 한계 */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">What this index is not</h2>
        <p className="mb-2">
          <b className="text-slate-700 dark:text-slate-200">The 75 and 25 thresholds are conventions, not findings.</b> Nothing changes in the market
          between 74 and 76. They are round numbers that became standard because they are easy to say, so treat a reading near either line as
          borderline rather than as a state change.
        </p>
        <p className="mb-2">
          <b className="text-slate-700 dark:text-slate-200">It is a relative measure, so it says nothing about direction.</b> In a heavy sell-off where
          altcoins fall less than Bitcoin, the index reads as an altcoin season while every coin on the list is losing money. The returns column
          exists so that case is visible instead of hidden behind the headline.
        </p>
        <p className="mb-2">
          <b className="text-slate-700 dark:text-slate-200">The universe is ranked by trading volume, not market cap.</b> The usual definition uses the
          top 50 by market cap; a static site has no market-cap feed, and volume is the closest public proxy Binance offers. The two usually agree
          on membership but not always, so the list here can differ slightly from other trackers — which is part of why the list is shown.
        </p>
        <p>
          <b className="text-slate-700 dark:text-slate-200">It describes the recent past.</b> A high reading means altcoins have already outperformed,
          not that they will continue to. This page carries no forecast of any kind.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/signals" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See per-coin signals and forecast ranges →
        </Link>
      </div>
    </>
  );
}
