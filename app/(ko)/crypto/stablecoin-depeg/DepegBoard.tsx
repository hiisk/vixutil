'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchTicker } from '@/lib/binance';
import {
  buildDepegRows, impliedUsdtBps, countByState, pegState,
  WATCH_BPS, DEPEG_BPS, type DepegRow, type PegState,
} from '@/lib/depeg';
import { formatVolume } from '@/components/crypto/ui';

/**
 * 감시 대상 — **달러 페그**만 넣는다.
 *
 * 처음에 EURI(유로 페그)를 넣었더니 USDT 대비 1.147이라 "+1474bp 이탈"로 표시됐다.
 * 그 값은 EUR/USD 환율이고 EURI의 페그는 정상이었다. 달러 파리티를 기준으로 재는
 * 보드에 다른 통화 페그를 섞으면 정상인 토큰을 붕괴로 보고한다.
 */
const STABLES = ['USDC', 'FDUSD', 'TUSD', 'USD1', 'USDP', 'DAI'];
/** 자동 갱신 주기 (ms) — 디페그는 분 단위로 움직인다 */
const REFRESH_MS = 60_000;

type State = 'loading' | 'ready' | 'error';

const STATE_UI: Record<PegState, { label: string; cls: string; dot: string }> = {
  pegged: { label: 'On peg', cls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
  watch: { label: 'Drifting', cls: 'bg-amber-500/15 text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
  depegged: { label: 'Off peg', cls: 'bg-rose-500/15 text-rose-700 dark:text-rose-400', dot: 'bg-rose-500' },
};

const bps = (v: number) => `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(1)} bp`;
const devCls = (v: number) => {
  const a = Math.abs(v);
  if (a >= DEPEG_BPS) return 'text-rose-600 dark:text-rose-400 font-bold';
  if (a >= WATCH_BPS) return 'text-amber-600 dark:text-amber-400 font-bold';
  return 'text-slate-700 dark:text-slate-200';
};

export default function DepegBoard() {
  const [state, setState] = useState<State>('loading');
  const [rows, setRows] = useState<DepegRow[]>([]);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const load = useCallback(async () => {
    const tickers = await Promise.all(STABLES.map(b => fetchTicker(`${b}USDT`, 'spot').catch(() => null)));
    const inputs = tickers
      .map((t, i) => (t && t.lastPrice > 0 ? {
        base: STABLES[i],
        price: t.lastPrice,
        low24h: t.low24h,
        high24h: t.high24h,
        quoteVolume: t.quoteVolume,
      } : null))
      .filter((x): x is NonNullable<typeof x> => x != null);
    return buildDepegRows(inputs);
  }, []);

  useEffect(() => {
    let alive = true;
    load()
      .then(r => {
        if (!alive) return;
        if (!r.length) { setState('error'); return; }
        setRows(r);
        setFetchedAt(Date.now());
        setState('ready');
      })
      .catch(() => { if (alive) setState('error'); });
    return () => { alive = false; };
  }, [load, reloadKey]);

  // 1분마다 조용히 갱신
  useEffect(() => {
    if (state !== 'ready') return;
    const t = setInterval(() => {
      load().then(r => { if (r.length) { setRows(r); setFetchedAt(Date.now()); } }).catch(() => {});
    }, REFRESH_MS);
    return () => clearInterval(t);
  }, [state, load]);

  const usdtBps = useMemo(() => impliedUsdtBps(rows), [rows]);
  const counts = useMemo(() => countByState(rows), [rows]);
  const usdtState = usdtBps != null ? pegState(usdtBps) : null;

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Reading stablecoin prices…</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div role="alert" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load stablecoin prices</span>
        <button type="button" onClick={() => { setState('loading'); setReloadKey(k => k + 1); }}
          className="mt-2 text-sm font-bold text-amber-950 bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* 기준이 USDT라는 사실을 먼저 밝힌다 */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
        <h2 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-1.5">These prices are against USDT, not against a dollar</h2>
        <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed">
          Binance quotes stablecoins in USDT, so a reading of 0.999 means one tenth of a percent below <b>USDT</b> — not below a dollar. If
          USDT itself moves, every other row moves with it in the opposite direction. Boards that call this &quot;depeg&quot; without saying
          so are measuring the yardstick as much as the thing.
          {usdtBps != null && (
            <> Taking the median of the coins below and inverting it puts <b>USDT itself at {bps(usdtBps)}</b>
            {usdtState !== 'pegged' ? ' — which is where the attention belongs right now.' : ', so the readings below are about those coins.'}</>
          )}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {([['pegged', counts.pegged], ['watch', counts.watch], ['depegged', counts.depegged]] as [PegState, number][]).map(([k, n]) => (
          <div key={k} className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-center">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">{STATE_UI[k].label}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">{n}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
        <div className="scroll-x overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                <th scope="col" className="text-left font-semibold px-4 py-3">Stablecoin</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Price vs USDT</th>
                <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  Deviation
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">basis points</span>
                </th>
                <th scope="col" className="text-right font-semibold px-3 py-3">
                  Widest today
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">24h range</span>
                </th>
                <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Volume</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.base} className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${STATE_UI[r.state].dot}`} aria-hidden="true" />
                      <span className="font-bold text-slate-800 dark:text-slate-100">{r.base}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${STATE_UI[r.state].cls}`}>{STATE_UI[r.state].label}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-slate-700 dark:text-slate-200">{r.price.toFixed(5)}</td>
                  <td className={`px-3 py-3 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${devCls(r.deviationBps)}`}>
                    {bps(r.deviationBps)}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-slate-500 dark:text-slate-400">{r.worst24hBps.toFixed(1)} bp</td>
                  <td className="px-4 py-3 text-right tabular-nums text-slate-500 dark:text-slate-400 border-l border-slate-200/40 dark:border-slate-700/40">
                    {formatVolume(r.quoteVolume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          One basis point is 0.01%. Labels are applied at {WATCH_BPS} bp and {DEPEG_BPS} bp from parity, which are conventions chosen for
          readability rather than thresholds with any regulatory or technical meaning. Volume matters here: a wide deviation on a coin that
          barely trades is a thin order book, not a run.
          {fetchedAt && (
            <span className="block mt-1 text-slate-500 dark:text-slate-400">
              Updated {new Date(fetchedAt).toLocaleTimeString('en-US', { hour12: false })} · refreshes every minute
            </span>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">What a small deviation does and does not mean</h2>
        <p className="mb-2">
          Stablecoins trade a few basis points either side of parity all the time. That is ordinary market-making, not distress: redemption
          takes hours and costs fees, so arbitrage does not close a five-basis-point gap instantly. A reading inside a few tens of basis points
          is noise, which is exactly why this page reports basis points rather than a percentage that rounds everything to 0.00%.
        </p>
        <p className="mb-2">
          Real depegs look different. They persist rather than oscillate, they widen rather than revert, and volume rises sharply as holders
          exit. A single snapshot cannot distinguish those cases, so the widest-today column and the volume column are there to give the
          deviation context.
        </p>
        <p>
          The measurement also cannot see the thing that actually matters, which is whether the reserves behind a token exist and are
          redeemable. Price is a market opinion about that question. It has been wrong in both directions before.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/funding-rates" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See what it costs to hold a position in these markets →
        </Link>
      </div>
    </>
  );
}
