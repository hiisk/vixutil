'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn } from '@/components/CalcShell';
import { APPLIANCE_POWER } from '@/lib/calc-l10n/daily';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

/* 한국어판의 누진제 계산은 한국 요금표라 버리고, kWh 단가를 입력으로 받는다 */
export default function AppliancePowerIntl({ lang }: { lang: CalcLang }) {
  const c = APPLIANCE_POWER[lang].ui;
  const tag = localeTag(lang);
  const [watts, setWatts] = useState('');
  const [hours, setHours] = useState('');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState<{ kwhDay: number; costDay: number } | null>(null);

  const fmt = (n: number, d = 2) => n.toLocaleString(tag, { maximumFractionDigits: d });

  function calculate() {
    const w = parseFloat(watts);
    const h = parseFloat(hours);
    const p = parseFloat(price);
    if (!(w > 0) || !(h > 0) || h > 24 || !(p > 0)) return;
    const kwhDay = (w / 1000) * h;
    setResult({ kwhDay, costDay: kwhDay * p });
  }

  const periods = result
    ? [
        { label: c.day, mult: 1 },
        { label: c.month, mult: 30 },
        { label: c.year, mult: 365 },
      ]
    : [];

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>{c.watts}</Label>
            <input type="number" value={watts} onChange={e => setWatts(e.target.value)} className={inputCls} min="0" />
          </div>
          <div>
            <Label>{c.hours}</Label>
            <input type="number" step="0.5" value={hours} onChange={e => setHours(e.target.value)} className={inputCls} min="0" max="24" />
          </div>
          <div>
            <Label>{c.price}</Label>
            <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className={inputCls} min="0" />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.costMonth}</p>
            <p className="stat-value">{fmt(result.costDay * 30)}</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">{fmt(result.kwhDay * 30)} kWh</p>
          </div>

          <Card className="p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 text-left text-xs">
                    <th className="py-1.5 font-semibold">{c.period}</th>
                    <th className="py-1.5 font-semibold text-right">{c.energy}</th>
                    <th className="py-1.5 font-semibold text-right">{c.cost}</th>
                  </tr>
                </thead>
                <tbody>
                  {periods.map(p => (
                    <tr key={p.label} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="py-2 text-slate-600 dark:text-slate-300">{p.label}</td>
                      <td className="py-2 text-right tabular-nums text-slate-600 dark:text-slate-300">{fmt(result.kwhDay * p.mult)}</td>
                      <td className="py-2 text-right tabular-nums font-semibold text-slate-900 dark:text-slate-100">{fmt(result.costDay * p.mult)}</td>
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
