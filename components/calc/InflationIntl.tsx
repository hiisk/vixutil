'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { INFLATION } from '@/lib/calc-l10n/inflation';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Mode = 'future' | 'present';
interface Row { year: number; value: number; power: number }

export default function InflationIntl({ lang }: { lang: CalcLang }) {
  const c = INFLATION[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('future');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('3');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<{ rows: Row[]; base: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    const a = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const y = parseInt(years, 10);
    if (!isFinite(a) || a <= 0 || !isFinite(r) || !isFinite(y) || y <= 0 || y > 100) return;

    const rows = Array.from({ length: y }, (_, i) => {
      const n = i + 1;
      const value = mode === 'future' ? a * Math.pow(1 + r, n) : a / Math.pow(1 + r, n);
      return { year: n, value, power: mode === 'future' ? (a / value) * 100 : (value / a) * 100 };
    });
    setResult({ rows, base: a });
  }

  const last = result?.rows[result.rows.length - 1];

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'future' as Mode, label: c.tabFuture },
          { value: 'present' as Mode, label: c.tabPresent },
        ]}
        value={mode}
        onChange={m => { setMode(m); setResult(null); }}
      />

      <Card className="p-5">
        <div className="flex flex-col gap-3">
          <div>
            <Label>{mode === 'future' ? c.amount : c.futureAmount}</Label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.rate}</Label>
              <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.years}</Label>
              <input type="number" value={years} onChange={e => setYears(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && last && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{mode === 'future' ? c.resultFuture : c.resultPresent}</p>
            <p className="stat-value">{fmt(last.value)}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard
              label={c.cumulative}
              value={`${(mode === 'future' ? (last.value / result.base - 1) * 100 : (result.base / last.value - 1) * 100).toFixed(1)}%`}
              variant="red"
            />
            <SummaryCard label={c.power} value={`${last.power.toFixed(1)}%`} />
          </div>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.table}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 text-left">
                    <th className="py-1.5 font-semibold">{c.year}</th>
                    <th className="py-1.5 font-semibold text-right">{c.value}</th>
                    <th className="py-1.5 font-semibold text-right">{c.powerCol}</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {result.rows.map(r => (
                    <tr key={r.year} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="py-1.5 text-slate-500 dark:text-slate-400">{r.year}</td>
                      <td className="py-1.5 text-right text-slate-800 dark:text-slate-100">{fmt(r.value)}</td>
                      <td className="py-1.5 text-right text-slate-500 dark:text-slate-400">{r.power.toFixed(1)}%</td>
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
