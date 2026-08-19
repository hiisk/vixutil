'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { computeRuin, ruinProbability, breakevenWinRate } from '@/lib/ruin';

/** 표에서 비교할 거래당 리스크(%) */
const RISK_ROWS = [0.5, 1, 2, 3, 5, 10, 20];
/** 감내 하락폭 선택지(%) */
const THRESHOLDS: [string, number][] = [['25%', 25], ['50%', 50], ['75%', 75], ['90%', 90]];

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';
const labelCls = 'dial-k mb-1 block';

/** 파산 확률을 크기에 맞게 표시 — 아주 작은 값이 "0%"로 뭉개지면 안전하다고 오해한다 */
function fmtPct(v: number): string {
  if (!isFinite(v)) return '—';
  if (v >= 10) return `${v.toFixed(0)}%`;
  if (v >= 1) return `${v.toFixed(1)}%`;
  if (v >= 0.01) return `${v.toFixed(2)}%`;
  if (v > 0) return '<0.01%';
  return '0%';
}

function tone(v: number): string {
  if (v >= 50) return 'text-rose-600 dark:text-rose-400 font-bold';
  if (v >= 20) return 'text-orange-600 dark:text-orange-400 font-bold';
  if (v >= 5) return 'text-amber-600 dark:text-amber-400 font-bold';
  if (v >= 1) return 'text-slate-700 dark:text-slate-200';
  return 'text-emerald-600 dark:text-emerald-400';
}

export default function RuinCalculator() {
  const [winRatePct, setWinRatePct] = useState('55');
  const [rMultiple, setRMultiple] = useState('1');
  const [riskPerTradePct, setRiskPerTradePct] = useState('2');
  const [ruinThresholdPct, setRuinThresholdPct] = useState(50);

  const r = useMemo(
    () => computeRuin({
      winRatePct: Number(winRatePct),
      rMultiple: Number(rMultiple),
      riskPerTradePct: Number(riskPerTradePct),
      ruinThresholdPct,
    }),
    [winRatePct, rMultiple, riskPerTradePct, ruinThresholdPct],
  );

  const be = useMemo(() => breakevenWinRate(Number(rMultiple)), [rMultiple]);

  /** 같은 우위에서 거래당 리스크만 바꿔본 표 — 이 페이지의 요점 */
  const table = useMemo(() => {
    const p = Number(winRatePct) / 100;
    const R = Number(rMultiple);
    return RISK_ROWS.map(risk => {
      const units = ruinThresholdPct / risk;
      return {
        risk,
        losses: Math.floor(units),
        ruin: units >= 1 ? ruinProbability(p, R, units) : null,
      };
    });
  }, [winRatePct, rMultiple, ruinThresholdPct]);

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls} htmlFor="ror-win">Win rate (%)</label>
            <input id="ror-win" type="number" inputMode="decimal" step="1" min={1} max={99} value={winRatePct}
              onChange={e => setWinRatePct(e.target.value)} className={inputCls} />
            {be != null && (
              <p className={`text-[11px] mt-1.5 ${Number(winRatePct) > be ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                Break-even needs {be.toFixed(1)}%
              </p>
            )}
          </div>
          <div>
            <label className={labelCls} htmlFor="ror-r">Reward : risk</label>
            <input id="ror-r" type="number" inputMode="decimal" step="0.1" min={0.1} value={rMultiple}
              onChange={e => setRMultiple(e.target.value)} className={inputCls} />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">1 means wins equal losses</p>
          </div>
          <div>
            <label className={labelCls} htmlFor="ror-risk">Risk per trade (%)</label>
            <input id="ror-risk" type="number" inputMode="decimal" step="0.5" min={0.1} max={100} value={riskPerTradePct}
              onChange={e => setRiskPerTradePct(e.target.value)} className={inputCls} />
          </div>
          <div className="sm:col-span-3">
            <span className={labelCls}>Count it as ruin at a drawdown of</span>
            <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-1">
              {THRESHOLDS.map(([label, v]) => (
                <button key={v} type="button" aria-pressed={ruinThresholdPct === v} onClick={() => setRuinThresholdPct(v)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    ruinThresholdPct === v ? 'bg-amber-500 text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {r ? (
        <>
          <div className={`rounded-xl border p-6 mb-4 ${r.hasEdge ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900' : 'border-rose-500/40 bg-rose-50 dark:bg-rose-500/[0.08]'}`}>
            <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
              Chance of losing {ruinThresholdPct}% of the account
            </p>
            <p className={`text-5xl font-bold tabular-nums ${tone(r.ruinPct)}`}>{fmtPct(r.ruinPct)}</p>
            {!r.hasEdge ? (
              <p className="text-sm text-rose-700 dark:text-rose-300 mt-2">
                At {winRatePct}% with {rMultiple}:1 the expectancy is {r.expectancyR.toFixed(3)}R — negative. Ruin is then a matter of time
                rather than probability, and no position size prevents it. You need {r.breakevenWinRatePct.toFixed(1)}% just to break even.
              </p>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                Expectancy is <b className="tabular-nums text-emerald-600 dark:text-emerald-400">+{r.expectancyR.toFixed(3)}R</b> per trade, so the edge
                is real — but {r.lossesToRuin} consecutive losses still reach that drawdown, and a losing run that long happens on its own
                with probability <b className="tabular-nums">{fmtPct(r.streakPct)}</b>.
              </p>
            )}
          </div>

          {/* 같은 우위, 다른 리스크 */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Same edge, different bet size</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Win rate and reward ratio are held at your inputs. Only the risk per trade changes.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Risk per trade</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">Losses it survives</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">
                      Chance of ruin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {table.map(row => (
                    <tr key={row.risk}
                      className={`border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 ${
                        Number(riskPerTradePct) === row.risk ? 'bg-amber-50 dark:bg-amber-500/[0.07]' : ''
                      }`}>
                      <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200 tabular-nums">{row.risk}%</td>
                      <td className="px-3 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300">
                        {row.losses >= 1 ? row.losses : '—'}
                      </td>
                      <td className={`px-4 py-2.5 text-right tabular-nums border-l border-slate-200/40 dark:border-slate-700/40 ${row.ruin != null ? tone(row.ruin) : 'text-slate-400 dark:text-slate-500'}`}>
                        {row.ruin != null ? fmtPct(row.ruin) : 'one loss ends it'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              This is the whole point of the page. The edge in the rows above is identical — the same win rate, the same reward ratio. Only
              the fraction risked per trade differs, and it moves the chance of ruin by orders of magnitude. Traders argue about entries;
              this column is decided before any entry is taken.
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          {Number(riskPerTradePct) >= ruinThresholdPct
            ? `Risking ${riskPerTradePct}% per trade means a single loss already reaches a ${ruinThresholdPct}% drawdown.`
            : 'Enter a win rate, a reward ratio and a risk per trade.'}
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">What this model assumes</h2>
        <p className="mb-2">
          Each trade is treated as independent with a fixed win rate and a fixed reward ratio, and the risk is a constant fraction of the
          account. The result is the classic gambler&apos;s ruin probability, solved in closed form rather than simulated — for a reward ratio
          of 1 it reduces exactly to (q/p) raised to the number of losses you can absorb.
        </p>
        <p className="mb-2">
          Real trading violates the independence assumption. Losses cluster, because the conditions that produced one usually persist for a
          while, and clustering makes ruin more likely than this figure suggests. Win rates also drift, and the figure you enter here is
          typically an estimate from too few trades.
        </p>
        <p>
          Without a positive expectancy the calculation degenerates: ruin becomes certain given enough trades, and reducing position size only
          delays it. That is worth stating plainly because the usual advice — trade smaller — treats a size problem as if it could fix an
          edge problem.
        </p>
      </div>

      <div className="text-center mb-4">
        <Link href="/crypto/position-size-calculator" className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline">
          Size a single trade from that risk figure →
        </Link>
      </div>
    </>
  );
}
