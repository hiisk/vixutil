'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  halvingInfo, etaMs, observedBlockSeconds, breakdown, rewardAt,
  HALVING_INTERVAL, TARGET_BLOCK_SECONDS, type HalvingInfo,
} from '@/lib/halving';

const MEMPOOL = 'https://mempool.space/api';

type State = 'loading' | 'ready' | 'error';

/** 어떤 블록 시간 기준으로 환산할지 */
type Basis = 'epoch' | 'recent' | 'target';

interface Snapshot {
  info: HalvingInfo;
  /** 난이도 주기 전체 평균 (초) — 표본이 가장 크다 */
  epochSeconds: number | null;
  /** 난이도 주기에서 이미 지난 블록 수 = 위 평균의 표본 크기 */
  epochBlocks: number | null;
  /** 최근 블록들의 평균 (초) */
  recentSeconds: number | null;
  recentBlocks: number;
  /** 데이터를 받은 시각 — 서버에서 만들지 않고 클라이언트에서 채운다 */
  fetchedAt: number;
}

const BASIS_LABEL: Record<Basis, string> = {
  epoch: 'This difficulty epoch',
  recent: 'Last 15 blocks',
  target: 'Theoretical 10 min',
};

const fmtDate = (ms: number) =>
  new Date(ms).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export default function HalvingCountdown() {
  const [state, setState] = useState<State>('loading');
  const [snap, setSnap] = useState<Snapshot | null>(null);
  const [basis, setBasis] = useState<Basis>('epoch');
  /** 카운트다운을 매초 다시 그리기 위한 틱 */
  const [now, setNow] = useState<number | null>(null);

  const load = useCallback(async () => {
    setState('loading');
    try {
      const [heightRes, blocksRes, diffRes] = await Promise.all([
        fetch(`${MEMPOOL}/blocks/tip/height`).then(r => r.text()),
        fetch(`${MEMPOOL}/v1/blocks`).then(r => r.json()).catch(() => []),
        fetch(`${MEMPOOL}/v1/difficulty-adjustment`).then(r => r.json()).catch(() => null),
      ]);
      const height = Number(heightRes);
      const info = halvingInfo(height);
      if (!info) { setState('error'); return; }

      const blocks: Array<{ timestamp: number }> = Array.isArray(blocksRes) ? blocksRes : [];
      const recentSeconds = observedBlockSeconds(blocks.map(b => b.timestamp));

      // mempool의 timeAvg는 현재 난이도 주기 전체 평균이라 표본이 훨씬 크다
      const epochSeconds = diffRes?.timeAvg > 0 ? diffRes.timeAvg / 1000 : null;
      const epochBlocks = diffRes?.remainingBlocks != null ? 2016 - diffRes.remainingBlocks : null;

      setSnap({
        info, epochSeconds, epochBlocks, recentSeconds,
        recentBlocks: blocks.length,
        fetchedAt: Date.now(),
      });
      setNow(Date.now());
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 블록 높이는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  // 1초마다 카운트다운을 갱신한다. setState를 콜백 안에서만 부르므로 렌더 경로가 늘지 않는다.
  useEffect(() => {
    if (state !== 'ready') return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [state]);

  const blockSeconds = useMemo(() => {
    if (!snap) return TARGET_BLOCK_SECONDS;
    if (basis === 'target') return TARGET_BLOCK_SECONDS;
    if (basis === 'recent') return snap.recentSeconds ?? TARGET_BLOCK_SECONDS;
    return snap.epochSeconds ?? TARGET_BLOCK_SECONDS;
  }, [snap, basis]);

  const eta = useMemo(
    () => (snap && now != null ? etaMs(snap.info.blocksRemaining, blockSeconds, snap.fetchedAt) : null),
    [snap, blockSeconds, now],
  );
  const left = eta != null && now != null ? breakdown(Math.max(0, eta - now)) : null;

  /** 세 기준이 얼마나 벌어지는지 — 카운트다운 사이트마다 날짜가 다른 이유다 */
  const spread = useMemo(() => {
    if (!snap) return null;
    const opts = [snap.epochSeconds, snap.recentSeconds, TARGET_BLOCK_SECONDS].filter(
      (v): v is number => v != null && v > 0,
    );
    if (opts.length < 2) return null;
    const days = opts.map(s => (snap.info.blocksRemaining * s * 1000) / 86_400_000);
    return { minDays: Math.min(...days), maxDays: Math.max(...days) };
  }, [snap]);

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Reading the current block height…</span>
      </div>
    );
  }

  if (state === 'error' || !snap) {
    return (
      <div role="alert" className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t reach the block explorer</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  const i = snap.info;

  return (
    <>
      <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white via-white to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-amber-500/[0.05] p-6 mb-4 text-center">
        <p className="text-[11px] uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-2">
          Next halving · block {i.nextHeight.toLocaleString()}
        </p>
        {left ? (
          <div className="flex justify-center gap-3 sm:gap-5 mb-3">
            {[['Days', left.days], ['Hours', left.hours], ['Minutes', left.minutes]].map(([label, v]) => (
              <div key={label as string} className="min-w-[76px]">
                <p className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tabular-nums">{v as number}</p>
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">{label as string}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-3xl font-black text-slate-900 dark:text-white mb-3">—</p>
        )}
        {eta != null && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Around <b>{fmtDate(eta)}</b> at {(blockSeconds / 60).toFixed(2)} min per block
          </p>
        )}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          <b className="tabular-nums">{i.blocksRemaining.toLocaleString()}</b> blocks to go · reward drops from
          {' '}<b className="tabular-nums">{i.reward} BTC</b> to <b className="tabular-nums">{i.nextReward} BTC</b>
        </p>

        <div className="mt-5 max-w-lg mx-auto">
          <div className="relative h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <span className="absolute inset-y-0 left-0 rounded-full bg-sec" style={{ width: `${i.progressPct}%` }} aria-hidden="true" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 tabular-nums">
            <span>block {(i.epoch * HALVING_INTERVAL).toLocaleString()}</span>
            <span>{i.progressPct.toFixed(1)}% through this epoch</span>
            <span>{i.nextHeight.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* 기준 선택 — 사이트마다 날짜가 다른 이유를 그대로 보여준다 */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
        <h2 className="text-sm font-black text-amber-900 dark:text-amber-200 mb-1.5">Why countdowns disagree</h2>
        <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed mb-3">
          A halving happens at a block height, not on a date. Converting blocks to a date needs an assumed block time, and blocks do not
          arrive every 10 minutes — that is only the target the difficulty adjustment aims at. Pick the assumption and watch the date move.
          {spread && (
            <> Right now the three assumptions below span <b>{(spread.maxDays - spread.minDays).toFixed(0)} days</b>.</>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {(['epoch', 'recent', 'target'] as Basis[]).map(k => {
            const secs = k === 'target' ? TARGET_BLOCK_SECONDS : k === 'recent' ? snap.recentSeconds : snap.epochSeconds;
            const usable = secs != null && secs > 0;
            const d = usable ? etaMs(i.blocksRemaining, secs, snap.fetchedAt) : null;
            return (
              <button key={k} type="button" disabled={!usable} aria-pressed={basis === k} onClick={() => setBasis(k)}
                className={`text-left px-3 py-2 rounded-xl border transition-colors ${
                  !usable ? 'border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : basis === k ? 'bg-amber-500 border-amber-500 text-white'
                  : 'border-amber-500/30 bg-white/70 dark:bg-slate-900/60 text-amber-900 dark:text-amber-200 hover:border-amber-500/60'
                }`}>
                <span className="block text-[11px] font-bold">{BASIS_LABEL[k]}</span>
                <span className="block text-[11px] tabular-nums opacity-90">
                  {usable ? `${(secs / 60).toFixed(2)} min` : '—'}
                  {d != null && ` · ${fmtDate(d)}`}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-amber-900/70 dark:text-amber-200/70 mt-2.5 leading-relaxed">
          The epoch average uses {snap.epochBlocks?.toLocaleString() ?? '—'} blocks and is the steadiest of the three;
          the 15-block figure moves a lot and is shown because short-run swings are real, not because they predict better.
          None of them is the answer — the honest reading is a range.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          ['Block height', i.height.toLocaleString(), 'right now'],
          ['Current reward', `${i.reward} BTC`, `epoch ${i.epoch}`],
          ['After halving', `${i.nextReward} BTC`, 'per block'],
          ['Halvings so far', String(i.epoch), 'since 2009'],
        ].map(([label, v, note]) => (
          <div key={label} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{label}</p>
            <p className="text-lg font-black text-slate-900 dark:text-white tabular-nums">{v}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{note}</p>
          </div>
        ))}
      </div>

      {/* 다음 반감기들 */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-sm font-black text-slate-900 dark:text-white">The schedule from here</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dates beyond the next one compound the block-time assumption, so they drift by months. The heights do not.
          </p>
        </div>
        <div className="scroll-x overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Halving</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Block</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Reward</th>
                <th scope="col" className="text-right font-semibold px-4 py-3">Rough date</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map(n => {
                const h = (i.epoch + 1 + n) * HALVING_INTERVAL;
                const d = etaMs(h - i.height, blockSeconds, snap.fetchedAt);
                return (
                  <tr key={h} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                    <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200">#{i.epoch + 1 + n}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">{h.toLocaleString()}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-amber-600 dark:text-amber-400 font-bold">{rewardAt(h)} BTC</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-slate-500 dark:text-slate-400">{d != null ? fmtDate(d) : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">What a halving does and does not do</h2>
        <p className="mb-2">
          It halves the reward paid to miners for each block, which halves the rate of new supply. That is the whole mechanism. It is
          scheduled in the protocol, has happened on the same rule since 2009, and every participant has known the date range for years —
          which is precisely why treating it as new information is a mistake.
        </p>
        <p>
          This page deliberately shows no price forecast around the event. The sample is the reason: Bitcoin has had four halvings, so any
          claim about &quot;what happens after a halving&quot; rests on four observations, each embedded in a completely different market. Four
          points cannot separate a halving effect from everything else that was happening at the time.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/bitcoin/price-prediction" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See Bitcoin&apos;s modelled price ranges instead →
        </Link>
      </div>
    </>
  );
}
