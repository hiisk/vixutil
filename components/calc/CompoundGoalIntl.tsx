'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, TabBar } from '@/components/CalcShell';
import { COMPOUND_GOAL } from '@/lib/calc-l10n/compound-goal';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Mode = 'years' | 'monthly';
interface Row { year: number; amount: number }

export default function CompoundGoalIntl({ lang }: { lang: CalcLang }) {
  const c = COMPOUND_GOAL[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('years');
  const [start, setStart] = useState('');
  const [goal, setGoal] = useState('');
  const [rate, setRate] = useState('6');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<{ years?: number; monthly?: number; rows: Row[]; already?: boolean } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    const p = parseFloat(start);
    const g = parseFloat(goal);
    const r = parseFloat(rate) / 100;
    if (!isFinite(p) || p <= 0 || !isFinite(g) || g <= p || !isFinite(r) || r <= 0) return;

    if (mode === 'years') {
      const t = Math.log(g / p) / Math.log(1 + r);
      const rows = Array.from({ length: Math.ceil(t) + 1 }, (_, i) => ({ year: i, amount: p * Math.pow(1 + r, i) }));
      setResult({ years: t, rows });
    } else {
      const n = parseInt(years, 10);
      if (!isFinite(n) || n <= 0 || n > 100) return;
      const mr = r / 12;
      const grown = p * Math.pow(1 + mr, n * 12);
      const remain = g - grown;
      // 이미 목표를 넘는다면 매달 넣을 돈이 없다 — 음수를 보여 주지 않는다.
      if (remain <= 0) {
        const rows = Array.from({ length: n + 1 }, (_, i) => ({ year: i, amount: p * Math.pow(1 + mr, i * 12) }));
        setResult({ monthly: 0, rows, already: true });
        return;
      }
      const monthly = (remain * mr) / (Math.pow(1 + mr, n * 12) - 1);
      const rows = Array.from({ length: n + 1 }, (_, i) => {
        const m = i * 12;
        return { year: i, amount: p * Math.pow(1 + mr, m) + monthly * ((Math.pow(1 + mr, m) - 1) / mr) };
      });
      setResult({ monthly, rows });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'years' as Mode, label: c.tabYears },
          { value: 'monthly' as Mode, label: c.tabMonthly },
        ]}
        value={mode}
        onChange={m => { setMode(m); setResult(null); }}
      />

      <Card className="p-5">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.start}</Label>
              <input type="number" value={start} onChange={e => setStart(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.goal}</Label>
              <input type="number" value={goal} onChange={e => setGoal(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.rate}</Label>
              <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
            </div>
            {mode === 'monthly' && (
              <div>
                <Label>{c.years}</Label>
                <input type="number" value={years} onChange={e => setYears(e.target.value)} className={inputCls} />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <div className="bg-blue-600 rounded-2xl p-5 text-center">
            <p className="text-blue-200 text-xs mb-1">{mode === 'years' ? c.resultYears : c.resultMonthly}</p>
            {mode === 'years' ? (
              <p className="text-white text-3xl font-black">
                {Math.floor(result.years!)} {c.yearsUnit} {Math.round((result.years! % 1) * 12)} {c.monthsUnit}
              </p>
            ) : (
              <p className="text-white text-3xl font-black">{fmt(result.monthly!)}</p>
            )}
            {result.already && <p className="text-blue-200 text-sm mt-2">{c.already}</p>}
          </div>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.growth}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 text-left">
                    <th className="py-1.5 font-semibold">{c.year}</th>
                    <th className="py-1.5 font-semibold text-right">{c.amount}</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {result.rows.map(r => (
                    <tr key={r.year} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="py-1.5 text-slate-500 dark:text-slate-400">{r.year}</td>
                      <td className="py-1.5 text-right text-slate-800 dark:text-slate-100">{fmt(r.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
