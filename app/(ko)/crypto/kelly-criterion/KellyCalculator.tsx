'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  computeKelly, kellyFraction, logGrowth, zeroGrowthFraction,
  drawdownProbabilityPct, KELLY_FRACTIONS,
} from '@/lib/kelly';

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';
const labelCls = 'dial-k mb-1 block';

function fmtPct(v: number, d = 1): string {
  if (!isFinite(v)) return '—';
  if (v > 0 && v < 0.01) return '<0.01%';
  return `${v.toFixed(d)}%`;
}

/**
 * 낙폭 확률은 자릿수 폭이 넓다 — 1/128(0.78%)부터 50%까지.
 * 12.5%가 "13%"로 뭉개지면 본문의 "one-in-eight"와 어긋나므로 크기별로 정밀도를 바꾼다.
 */
function fmtOdds(v: number): string {
  if (!isFinite(v)) return '—';
  if (v >= 20) return `${v.toFixed(0)}%`;
  if (v >= 1) return `${v.toFixed(1)}%`;
  if (v >= 0.01) return `${v.toFixed(2)}%`;
  return v > 0 ? '<0.01%' : '0%';
}

export default function KellyCalculator() {
  const [winRatePct, setWinRatePct] = useState('55');
  const [rMultiple, setRMultiple] = useState('1.5');
  const [capital, setCapital] = useState('10000');

  const p = Number(winRatePct) / 100;
  const b = Number(rMultiple);

  const r = useMemo(() => computeKelly(Number(winRatePct), b), [winRatePct, b]);
  const zero = useMemo(() => zeroGrowthFraction(p, b), [p, b]);

  /** 켈리 배수별 — 이 표가 페이지의 본론이다 */
  const rows = useMemo(() => {
    const f0 = kellyFraction(p, b);
    if (f0 == null || f0 <= 0) return null;
    const full = logGrowth(p, b, f0);
    if (full == null || !(full > 0)) return null;

    return KELLY_FRACTIONS.map(([label, c]) => {
      const f = f0 * c;
      const g = logGrowth(p, b, f);
      return {
        label, c, f,
        // 이산 계산이 정확하므로 표시는 이쪽을 쓴다
        retained: g != null && isFinite(g) ? (g / full) * 100 : 0,
        // 낙폭 확률은 연속 근사만 존재한다
        halve: drawdownProbabilityPct(c, 50),
        quarter: drawdownProbabilityPct(c, 25),
        blown: f >= 1,
      };
    });
  }, [p, b]);

  const cap = Number(capital);
  const hasCap = isFinite(cap) && cap > 0;

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls} htmlFor="k-win">Win rate (%)</label>
            <input id="k-win" type="number" inputMode="decimal" step="1" min={1} max={99} value={winRatePct}
              onChange={e => setWinRatePct(e.target.value)} className={inputCls} />
            {r && (
              <p className={`text-[11px] mt-1.5 ${r.hasEdge ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                Break-even needs {r.breakevenWinRatePct.toFixed(1)}%
              </p>
            )}
          </div>
          <div>
            <label className={labelCls} htmlFor="k-r">Reward : risk</label>
            <input id="k-r" type="number" inputMode="decimal" step="0.1" min={0.1} value={rMultiple}
              onChange={e => setRMultiple(e.target.value)} className={inputCls} />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Average win ÷ average loss</p>
          </div>
          <div>
            <label className={labelCls} htmlFor="k-cap">Account size</label>
            <input id="k-cap" type="number" inputMode="decimal" step="100" min={0} value={capital}
              onChange={e => setCapital(e.target.value)} className={inputCls} />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Only used to show dollar amounts</p>
          </div>
        </div>
      </div>

      {r && r.hasEdge && rows ? (
        <>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 mb-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Full Kelly</p>
            <p className="text-5xl font-bold tabular-nums text-violet-600 dark:text-violet-400">
              {r.fullKellyPct.toFixed(1)}%
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              {hasCap && (
                <>
                  That is <b className="tabular-nums">${((r.fullKellyPct / 100) * cap).toLocaleString(undefined, { maximumFractionDigits: 0 })}</b> of a
                  ${cap.toLocaleString()} account at risk on one trade.{' '}
                </>
              )}
              Expectancy is <b className="tabular-nums text-emerald-600 dark:text-emerald-400">+{r.expectancyR.toFixed(3)}R</b> per trade.
              {zero != null && (
                <>
                  {' '}Growth turns negative above <b className="tabular-nums">{(zero * 100).toFixed(1)}%</b> — roughly twice this figure, not
                  far above it.
                </>
              )}
            </p>
          </div>

          {/* 본론 */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">What you give up by betting less</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                And what you buy with it. The last two columns depend only on the Kelly multiple — not on your edge.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Kelly multiple</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Bet size</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Growth kept</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Ever −50%</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3">Ever −75%</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.label}
                      className={`border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 ${
                        row.c === 0.5 ? 'bg-violet-50 dark:bg-violet-500/[0.07]' : ''
                      }`}>
                      <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200">
                        {row.label}
                        <span className="text-slate-500 dark:text-slate-400 font-normal"> ×{row.c}</span>
                      </td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">
                        {row.blown ? <span className="text-rose-600 dark:text-rose-400">&gt;100%</span> : fmtPct(row.f * 100)}
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${
                        row.retained > 0 ? 'text-slate-700 dark:text-slate-200' : 'text-rose-600 dark:text-rose-400 font-bold'
                      }`}>
                        {row.blown ? '—'
                          : row.retained > 0 ? `${row.retained.toFixed(0)}%`
                          : 'none'}
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums ${
                        (row.halve ?? 0) >= 50 ? 'text-rose-600 dark:text-rose-400 font-bold'
                          : (row.halve ?? 0) >= 10 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {row.halve != null ? fmtOdds(row.halve) : '—'}
                      </td>
                      <td className={`px-4 py-2.5 text-right tabular-nums ${
                        (row.quarter ?? 0) >= 50 ? 'text-rose-600 dark:text-rose-400 font-bold'
                          : (row.quarter ?? 0) >= 10 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {row.quarter != null ? fmtOdds(row.quarter) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Read the highlighted row. Half Kelly keeps about three quarters of the growth rate while cutting the chance of ever halving the
              account from one-in-two to one-in-eight. That trade is why practitioners who use the formula at all rarely use the whole thing.
              The bottom row is the other half of the picture: twice Kelly leaves no growth at all — the same long-run result as never
              trading, after enduring every drawdown along the way.
            </div>
          </div>

          <div className="rounded-lg border border-violet-200 dark:border-violet-500/30 bg-violet-50/50 dark:bg-violet-500/[0.06] p-5 mb-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">The drawdown columns ignore your edge entirely</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-[72ch]">
              Change the win rate or the reward ratio above and watch those two columns: they do not move. Under the standard
              approximation the chance of ever falling to a fraction α of your peak is{' '}
              <span className="whitespace-nowrap font-semibold text-slate-800 dark:text-slate-100">α<sup>2/c − 1</sup></span>, where c is the Kelly multiple —
              the edge cancels out. A better strategy earns more, and gets you there faster, but it does not make full Kelly less violent.
              Bet size is what governs the ride.
            </p>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-rose-500/40 bg-rose-50 dark:bg-rose-500/[0.08] p-6 mb-4">
          <p className="text-sm text-rose-700 dark:text-rose-300 leading-relaxed max-w-[72ch]">
            {r
              ? <>At {winRatePct}% with {rMultiple}:1 the expectancy is <b className="tabular-nums">{r.expectancyR.toFixed(3)}R</b> — Kelly returns{' '}
                <b className="tabular-nums">{r.fullKellyPct.toFixed(1)}%</b>, meaning the correct bet is nothing. You would need{' '}
                <b className="tabular-nums">{r.breakevenWinRatePct.toFixed(1)}%</b> just to break even at this reward ratio. The formula has no
                position size that rescues a negative edge; it only tells you to stop.</>
              : 'Enter a win rate between 1 and 99 and a positive reward ratio.'}
          </p>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Why the answer is almost always &quot;less than this&quot;</h2>
        <p className="mb-2">
          Kelly assumes the win rate and the reward ratio are known exactly. In practice both are estimates from a limited number of trades,
          and the formula is asymmetric about that error: overstating your edge pushes the recommended size up, while the penalty for
          overbetting rises steeply. Since the zero-growth point sits at roughly twice full Kelly, an edge estimate that is off by half is
          enough to erase the growth the formula was maximising.
        </p>
        <p className="mb-2">
          The model also treats trades as independent, which crypto does not respect. Losses arrive together because the conditions that
          caused one tend to persist, and a clustered run of losses cuts deeper than the independent case assumes. Sizing that is merely
          correct on paper leaves nothing in reserve for that.
        </p>
        <p>
          The growth column is computed from the discrete formula, so it is exact for the win/loss model described. The two drawdown columns
          come from the continuous approximation, which is the standard treatment and is close for small bet sizes — but it is a lower bound
          on real risk, not a forecast.
        </p>
      </div>

      <div className="text-center mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        <Link href="/crypto/risk-of-ruin" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
          See what that bet size does to ruin odds →
        </Link>
        <Link href="/crypto/position-size-calculator" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline">
          Turn a percentage into a position →
        </Link>
      </div>
    </>
  );
}
