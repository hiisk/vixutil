'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { fetchTopSymbols, fetchDailyCandles, mapWithConcurrency } from '@/lib/binance';
import { riskMetrics, rankDisagreement, type RiskMetrics } from '@/lib/metrics';
import { COINS } from '@/lib/coins';
import { CoinLogo, formatVolume } from '@/components/crypto/ui';

const UNIVERSE = 40;
/**
 * 연 변동성이 이보다 낮으면 위험조정 순위에 넣지 않는다.
 * 목록에 없는 페그 토큰(실측: 수익 0.15% / 변동성 0.39%)이 섞이면 샤프가
 * "잡음 ÷ 잡음"으로 0.38 같은 값이 나와 152% 변동성 자산과 나란히 줄을 선다.
 */
const MIN_VOL_PCT = 5;
const CONCURRENCY = 6;
/** 구간 선택지 (일) */
const PERIODS: [string, number][] = [['180D', 180], ['1Y', 365], ['2Y', 730]];

type State = 'loading' | 'ready' | 'error';
type SortKey = 'sharpe' | 'sortino' | 'calmar' | 'return' | 'disagree';

interface Row extends RiskMetrics {
  base: string;
  quoteVolume: number;
}

const slugOf = (base: string) => COINS.find(c => c.base === base)?.slug ?? null;
/** 작은 값이 "0%"로 뭉개지면 계산이 깨진 것처럼 읽힌다 — 크기에 맞춰 자릿수를 준다 */
const pct = (v: number | null): string => {
  if (v == null || !isFinite(v)) return '—';
  const a = Math.abs(v);
  return `${v.toFixed(a >= 100 ? 0 : a >= 10 ? 1 : 2)}%`;
};
const signed = (v: number | null) => (v == null || !isFinite(v) ? '—' : `${v >= 0 ? '+' : ''}${pct(v)}`);
const ratio = (v: number | null) => (v == null || !isFinite(v) ? '—' : v.toFixed(2));
const rCls = (v: number | null) => (v == null ? 'text-slate-400 dark:text-slate-500' : v >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400');

const SORTS: [SortKey, string][] = [
  ['sharpe', 'Sharpe'],
  ['sortino', 'Sortino'],
  ['calmar', 'Calmar'],
  ['return', 'Raw return'],
  ['disagree', 'Most disputed'],
];

export default function RiskAdjustedBoard() {
  const [state, setState] = useState<State>('loading');
  /** 코인별 종가 — 가장 긴 구간을 한 번 받고 구간 전환은 재계산만 한다 */
  const [closesByBase, setClosesByBase] = useState<{ base: string; closes: number[]; quoteVolume: number }[]>([]);
  const [days, setDays] = useState(365);
  const [sortKey, setSortKey] = useState<SortKey>('sharpe');

  const load = useCallback(async () => {
    setState('loading');
    try {
      const maxDays = Math.max(...PERIODS.map(p => p[1]));
      const tops = await fetchTopSymbols(UNIVERSE);
      const out = await mapWithConcurrency(tops, CONCURRENCY, async t => {
        try {
          const k = await fetchDailyCandles(t.symbol, maxDays);
          return { base: t.base, closes: k.map(x => x.close), quoteVolume: t.quoteVolume };
        } catch { return null; }
      });
      const rows = out.filter((r): r is { base: string; closes: number[]; quoteVolume: number } => r != null && r.closes.length > 90);
      if (!rows.length) { setState('error'); return; }
      setClosesByBase(rows);
      setState('ready');
    } catch {
      setState('error');
    }
  }, []);

  // 시세는 프리렌더 시점에 없으므로 마운트 후 받아온다.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load(); }, [load]);

  const rows = useMemo(() => {
    const out: Row[] = [];
    for (const c of closesByBase) {
      const m = riskMetrics(c.closes.slice(-days), 60);
      if (m && m.annualVolPct >= MIN_VOL_PCT) out.push({ ...m, base: c.base, quoteVolume: c.quoteVolume });
    }
    return out;
  }, [closesByBase, days]);

  /** 세 지표가 매긴 순위가 얼마나 갈리는가 — 이 페이지의 요점 */
  const disagreement = useMemo(
    () => rankDisagreement(rows, [r => r.sharpe, r => r.sortino, r => r.calmar]),
    [rows],
  );

  const shown = useMemo(() => {
    const s = [...rows];
    const val = (r: Row) => {
      if (sortKey === 'sharpe') return r.sharpe;
      if (sortKey === 'sortino') return r.sortino;
      if (sortKey === 'calmar') return r.calmar;
      if (sortKey === 'return') return r.annualReturnPct;
      return disagreement.get(r)?.spread ?? null;
    };
    s.sort((a, b) => (val(b) ?? -Infinity) - (val(a) ?? -Infinity));
    return s;
  }, [rows, sortKey, disagreement]);

  /** 순위가 가장 크게 뒤집힌 코인 */
  const widest = useMemo(() => {
    let best: { base: string; spread: number; ranks: (number | null)[] } | null = null;
    for (const r of rows) {
      const d = disagreement.get(r);
      if (!d?.spread) continue;
      if (!best || d.spread > best.spread) best = { base: r.base, spread: d.spread, ranks: d.ranks };
    }
    return best;
  }, [rows, disagreement]);

  if (state === 'loading') {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <div aria-hidden="true" className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-amber-500 rounded-full animate-spin" />
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Loading two years for {UNIVERSE} coins…</span>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div role="alert" className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 flex flex-col items-center gap-3">
        <span aria-hidden="true" className="text-3xl">⚠️</span>
        <span className="text-sm font-bold text-rose-600 dark:text-rose-400">Couldn&apos;t load market data</span>
        <button type="button" onClick={load} className="mt-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-2 transition-colors">Retry</button>
      </div>
    );
  }

  return (
    <>
      {/* 세 지표가 다른 것을 잰다 */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-50 dark:bg-amber-500/[0.07] p-5 mb-4">
        <h2 className="text-sm font-black text-amber-900 dark:text-amber-200 mb-1.5">Three ratios, three definitions of risk</h2>
        <p className="text-xs text-amber-900/85 dark:text-amber-200/85 leading-relaxed">
          Sharpe divides by total standard deviation, which punishes large gains as heavily as large losses and assumes a normal distribution
          that crypto returns plainly violate. Sortino divides only by downside deviation. Calmar divides by the worst drawdown actually
          endured. They frequently disagree, and the disagreement is the useful part — it tells you the ranking depends on which definition
          of risk you accept.
          {widest && (
            <> Right now <b>{widest.base}</b> moves {widest.spread} places between them
            (Sharpe #{widest.ranks[0] ?? '—'}, Sortino #{widest.ranks[1] ?? '—'}, Calmar #{widest.ranks[2] ?? '—'}).</>
          )}
        </p>
      </div>

      <div className="flex flex-wrap justify-between gap-2 mb-4">
        <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
          {PERIODS.map(([label, d]) => (
            <button key={d} type="button" aria-pressed={days === d} onClick={() => setDays(d)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                days === d ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}>
              {label}
            </button>
          ))}
        </div>
        <div className="inline-flex flex-wrap rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
          {SORTS.map(([k, label]) => (
            <button key={k} type="button" aria-pressed={sortKey === k} onClick={() => setSortKey(k)}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-colors ${
                sortKey === k ? 'bg-slate-700 text-white dark:bg-slate-200 dark:text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
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
                <th scope="col" className="text-right font-semibold px-3 py-3">Return</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Vol</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Max DD</th>
                <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Sharpe</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Sortino</th>
                <th scope="col" className="text-right font-semibold px-3 py-3">Calmar</th>
                <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                  Rank spread
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400 normal-case tracking-normal">places apart</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {shown.map(r => {
                const slug = slugOf(r.base);
                const d = disagreement.get(r);
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
                    <td className={`px-3 py-2.5 text-right tabular-nums font-bold ${rCls(r.annualReturnPct)}`}>{signed(r.annualReturnPct)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">{pct(r.annualVolPct)}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-rose-600/80 dark:text-rose-400/80">−{pct(r.maxDrawdownPct)}</td>
                    <td className={`px-3 py-2.5 text-right tabular-nums font-bold border-l border-slate-200/40 dark:border-slate-700/40 ${rCls(r.sharpe)}`}>{ratio(r.sharpe)}</td>
                    <td className={`px-3 py-2.5 text-right tabular-nums font-bold ${rCls(r.sortino)}`}>{ratio(r.sortino)}</td>
                    <td className={`px-3 py-2.5 text-right tabular-nums font-bold ${rCls(r.calmar)}`}>{ratio(r.calmar)}</td>
                    <td className={`px-4 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${d?.spread && d.spread >= 5 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                      {d?.spread != null ? d.spread : '—'}
                      {d?.spread != null && (
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                          #{d.ranks[0] ?? '—'}/#{d.ranks[1] ?? '—'}/#{d.ranks[2] ?? '—'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          The risk-free rate is taken as zero. Against crypto return magnitudes it is within rounding, and pinning it to a specific figure
          would make comparisons across time periods worse rather than better. Coins with annualised volatility under {MIN_VOL_PCT}% are excluded: they are effectively pegged, and dividing a tiny return by a tiny deviation produces a ratio that is noise.
          <b className="text-slate-600 dark:text-slate-300"> Rank spread</b> is
          how many places a coin moves between the three ratios; the three numbers beneath it are its rank under Sharpe, Sortino and Calmar.
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">Why a single risk-adjusted number is not enough</h2>
        <p className="mb-2">
          Sharpe assumes returns are normally distributed. Crypto returns are not — they have fat tails, so the standard deviation understates
          how bad the worst days get and the ratio flatters assets whose losses arrive in rare large chunks. It also treats a violent rally as
          risk, which is defensible for a pension fund and odd for someone choosing between volatile assets.
        </p>
        <p className="mb-2">
          Sortino fixes the second problem by only counting downside, and Calmar sidesteps distributions altogether by dividing by the worst
          drawdown that actually happened. Neither is correct in general. Calmar depends on one historical episode, so a coin that avoided a
          crash by luck scores well; Sortino still assumes the downside shape is stable.
        </p>
        <p>
          The reason to show all three is the rank spread column. When a coin sits near the top under one ratio and far down under another,
          any ranking you were given elsewhere was a choice of definition presented as a measurement. All of these are also backward looking:
          volatility persists to a useful degree, but past return does not.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/drawdown" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          See how long those drawdowns lasted →
        </Link>
      </div>
    </>
  );
}
