'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  impermanentLoss, weightedImpermanentLoss, poolPosition,
  breakevenFeePct, breakevenDailyVolume,
  PRICE_SCENARIOS, POOL_FEE_TIERS,
} from '@/lib/impermanent';

/* 사이트 공용 칸 — 초점 테두리가 갈래 색을 따라간다(globals.css .dial-input) */
const inputCls = 'dial-input';
const labelCls = 'dial-k mb-1 block';

const money = (v: number) =>
  `$${v.toLocaleString(undefined, { maximumFractionDigits: v >= 100 ? 0 : 2 })}`;

/** IL은 −0.01%부터 −25%까지 폭이 넓다. 작은 값이 "0%"로 뭉개지면 요점을 놓친다. */
function fmtIl(v: number): string {
  const a = Math.abs(v);
  if (a < 0.005) return '0%';
  if (a < 1) return `−${a.toFixed(2)}%`;
  return `−${a.toFixed(1)}%`;
}

function ilTone(v: number): string {
  const a = Math.abs(v);
  if (a >= 10) return 'text-rose-600 dark:text-rose-400 font-bold';
  if (a >= 2) return 'text-orange-600 dark:text-orange-400 font-bold';
  if (a >= 0.5) return 'text-amber-600 dark:text-amber-400';
  return 'text-slate-500 dark:text-slate-400';
}

export default function IlCalculator() {
  const [deposit, setDeposit] = useState('10000');
  const [ratio, setRatio] = useState('2');
  const [feePct, setFeePct] = useState('3');
  const [poolFee, setPoolFee] = useState(0.3);
  const [days, setDays] = useState('30');

  const r = Number(ratio);
  const pos = useMemo(
    () => poolPosition(Number(deposit), r, Number(feePct)),
    [deposit, r, feePct],
  );
  const be = useMemo(() => breakevenFeePct(r), [r]);
  const beVol = useMemo(() => breakevenDailyVolume(r, poolFee, Number(days)), [r, poolFee, days]);

  const table = useMemo(
    () => PRICE_SCENARIOS.map(s => ({
      s,
      il: impermanentLoss(s),
      w80: weightedImpermanentLoss(s, 0.8),
      be: breakevenFeePct(s),
    })),
    [],
  );

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-5 mb-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls} htmlFor="il-dep">Deposit</label>
            <input id="il-dep" type="number" inputMode="decimal" step="100" min={1} value={deposit}
              onChange={e => setDeposit(e.target.value)} className={inputCls} />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">Split 50 : 50 into the pool</p>
          </div>
          <div>
            <label className={labelCls} htmlFor="il-ratio">Price change</label>
            <input id="il-ratio" type="number" inputMode="decimal" step="0.25" min={0.01} value={ratio}
              onChange={e => setRatio(e.target.value)} className={inputCls} />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              {r > 1 ? `One asset is ${r}× higher` : r < 1 && r > 0 ? `One asset fell to ${(r * 100).toFixed(0)}%` : 'Multiple, not percent'}
            </p>
          </div>
          <div>
            <label className={labelCls} htmlFor="il-fee">Fees earned (%)</label>
            <input id="il-fee" type="number" inputMode="decimal" step="0.5" min={0} value={feePct}
              onChange={e => setFeePct(e.target.value)} className={inputCls} />
            {be != null && (
              <p className={`text-[11px] mt-1.5 ${Number(feePct) >= be ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                Need {be.toFixed(2)}% to break even
              </p>
            )}
          </div>
        </div>
      </div>

      {pos ? (
        <>
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 mb-4">
            <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Impermanent loss</p>
            <p className={`text-5xl font-bold tabular-nums ${ilTone(pos.ilPct)}`}>{fmtIl(pos.ilPct)}</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-4">
              {([
                ['If you had just held', pos.holdValue, 'text-slate-700 dark:text-slate-200'],
                ['In the pool, before fees', pos.poolValue, 'text-rose-600 dark:text-rose-400'],
                ['In the pool, with fees', pos.netValue, pos.netValue >= pos.holdValue ? 'text-emerald-600 dark:text-emerald-400' : 'text-orange-600 dark:text-orange-400'],
              ] as const).map(([label, v, cls]) => (
                <div key={label} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
                  <p className={`text-lg font-bold tabular-nums ${cls}`}>{money(v)}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-4">
              Fees of <b className="tabular-nums">{money(pos.feesEarned)}</b> against an impermanent loss of{' '}
              <b className="tabular-nums">{money(pos.holdValue - pos.poolValue)}</b> leaves you{' '}
              <b className={`tabular-nums ${pos.vsHold >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {pos.vsHold >= 0 ? '+' : '−'}{money(Math.abs(pos.vsHold))}
              </b>{' '}
              versus holding — {pos.vsHold >= 0 ? 'the fees covered it' : 'the fees did not cover it'}.
            </p>
          </div>

          {/* 손익분기 거래량 — "APR 40%" 광고가 전제하는 것 */}
          <div className="rounded-lg border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/[0.07] p-5 mb-4">
            <h2 className="text-sm font-bold text-cyan-900 dark:text-cyan-200 mb-2">How much trading it takes to break even</h2>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-xs font-semibold text-cyan-900/80 dark:text-cyan-200/80">Pool fee tier</span>
              <div className="inline-flex rounded-xl border border-cyan-500/30 bg-white/60 dark:bg-slate-900/60 p-1">
                {POOL_FEE_TIERS.map(f => (
                  <button key={f} type="button" aria-pressed={poolFee === f} onClick={() => setPoolFee(f)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors tabular-nums ${
                      poolFee === f ? 'bg-cyan-500 text-white' : 'text-cyan-900/70 dark:text-cyan-200/70 hover:text-cyan-900 dark:hover:text-cyan-100'
                    }`}>
                    {f}%
                  </button>
                ))}
              </div>
              <label className="text-xs font-semibold text-cyan-900/80 dark:text-cyan-200/80" htmlFor="il-days">over</label>
              <input id="il-days" type="number" inputMode="numeric" step="1" min={1} value={days}
                onChange={e => setDays(e.target.value)}
                className="w-20 bg-white dark:bg-slate-900 border border-cyan-500/30 rounded-lg px-2 py-1.5 text-xs tabular-nums text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <span className="text-xs font-semibold text-cyan-900/80 dark:text-cyan-200/80">days</span>
            </div>
            <p className="text-xs text-cyan-900/85 dark:text-cyan-200/85 leading-relaxed max-w-[72ch]">
              {beVol != null && beVol > 0 ? (
                <>
                  The pool has to turn over <b className="tabular-nums">{beVol.toFixed(2)}×</b> your liquidity{' '}
                  <b>every day</b> for {days} days just to offset a {r}× price move at the {poolFee}% tier. Advertised APRs are quoting
                  the fee side of this equation only — whether they hold depends entirely on volume that has not happened yet.
                </>
              ) : (
                <>With no price divergence there is no loss to offset, so any fee income is profit. That is also the case that never happens.</>
              )}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Loss at every price move</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Note the symmetry: a halving and a doubling cost exactly the same.
              </p>
            </div>
            <div className="scroll-x overflow-x-auto">
              <table className="w-full text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
                    <th scope="col" className="text-left font-semibold px-4 py-3">Price move</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">50 : 50 pool</th>
                    <th scope="col" className="text-right font-semibold px-3 py-3">80 : 20 pool</th>
                    <th scope="col" className="text-right font-semibold px-4 py-3 border-l border-slate-200/70 dark:border-slate-700/70">Fees needed</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map(row => (
                    <tr key={row.s}
                      className={`border-b border-slate-200/50 dark:border-slate-700/50 last:border-0 ${
                        Math.abs(r - row.s) < 1e-9 ? 'bg-cyan-50 dark:bg-cyan-500/[0.07]' : ''
                      }`}>
                      <td className="px-4 py-2.5 font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                        {row.s}×
                        {row.s === 1 && <span className="ml-2 text-[11px] font-normal text-slate-500 dark:text-slate-400">no change</span>}
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums ${row.il != null ? ilTone(row.il) : ''}`}>
                        {row.il != null ? fmtIl(row.il) : '—'}
                      </td>
                      <td className={`px-3 py-2.5 text-right tabular-nums ${row.w80 != null ? ilTone(row.w80) : ''}`}>
                        {row.w80 != null ? fmtIl(row.w80) : '—'}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-slate-600 dark:text-slate-300 border-l border-slate-200/40 dark:border-slate-700/40">
                        {row.be != null ? `${row.be.toFixed(2)}%` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The 80 : 20 column is why weighted pools exist — skewing the weights cuts the loss substantially without removing it. And the
              loss is smaller than most people expect: a doubling costs 5.7%, a quadrupling 20%. The problem is not the size. It is that the
              column is negative everywhere except the one row where nothing happened, so being right about direction earns you nothing here.
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 mb-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Enter a deposit and a price change as a multiple — 2 for a doubling, 0.5 for a halving.
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-5 mb-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed [&>p]:max-w-[72ch]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-2">What this is and is not</h2>
        <p className="mb-2">
          The figure is exact, not an approximation. For a constant-product pool the value ratio against holding is 2√r ÷ (1 + r), where r is
          the price of one asset relative to the other at withdrawal. It follows from the pool rebalancing continuously: as one side rises the
          pool sells it, so you finish with less of the winner and more of the loser than you started with.
        </p>
        <p className="mb-2">
          The name is the misleading part. &quot;Impermanent&quot; means it reverses if prices return to where they started, not that it is
          small or theoretical. It becomes permanent the moment you withdraw, and most people withdraw before prices come back. The honest
          reading is that it is an unrealised loss with the same status as any other.
        </p>
        <p>
          Everything here is the constant-product case, which covers Uniswap v2 and the pools built on it. Concentrated liquidity behaves
          differently and worse when price leaves the range you chose, since the position converts fully into the falling asset and stops
          earning. Token rewards, gas and any depeg or exploit risk are all excluded.
        </p>
      </div>

      <div className="text-center mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        <Link href="/crypto/compound-calculator" className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
          What that APR actually compounds to →
        </Link>
        <Link href="/crypto/volatility" className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline">
          How far these pairs usually move →
        </Link>
      </div>
    </>
  );
}
