'use client';
import { useState } from 'react';
import { Card, CardHeader, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { CAR_COST } from '@/lib/calc-l10n/car3';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';
import { carCost, fixedCost, type CarInput } from '@/lib/car-cost';

export default function CarCostIntl({ lang }: { lang: CalcLang }) {
  const c = CAR_COST[lang].ui;
  const tag = localeTag(lang);
  const [v, setV] = useState({
    km: '', kmpl: '', fuelPrice: '', tax: '', insurance: '', maintenance: '', parking: '',
  });
  const [result, setResult] = useState<null | (ReturnType<typeof carCost> & { fixed: number })>(null);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setV(prev => ({ ...prev, [k]: e.target.value }));

  const fmt = (n: number, d = 0) => n.toLocaleString(tag, { maximumFractionDigits: d });

  function calculate() {
    const input: CarInput = {
      km: Number(v.km) || 0, kmpl: Number(v.kmpl) || 0, fuelPrice: Number(v.fuelPrice) || 0,
      tax: Number(v.tax) || 0, insurance: Number(v.insurance) || 0,
      maintenance: Number(v.maintenance) || 0, parking: Number(v.parking) || 0,
    };
    const r = carCost(input);
    if (!(r.yearly > 0)) return;
    setResult({ ...r, fixed: fixedCost(input) });
  }

  const fields: [keyof typeof v, string][] = [
    ['km', c.km], ['kmpl', c.kmpl], ['fuelPrice', c.fuelPrice], ['tax', c.tax],
    ['insurance', c.insurance], ['maintenance', c.maintenance], ['parking', c.parking],
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          {fields.map(([k, label]) => (
            <div key={k}>
              <Label>{label}</Label>
              <input type="number" value={v[k]} onChange={set(k)} className={inputCls} min="0" />
            </div>
          ))}
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.yearly}</p>
            <p className="stat-value">{fmt(result.yearly)}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard label={c.monthly} value={fmt(result.monthly)} />
            <SummaryCard label={c.perKm} value={fmt(result.perKm, 2)} />
          </div>
          <Card>
            <CardHeader title={c.breakdown} />
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {([
                [c.fuel, result.fuel], [c.tax, result.tax], [c.insurance, result.insurance],
                [c.maintenance, result.maintenance], [c.parking, result.parking],
              ] as [string, number][]).map(([label, val]) => (
                <div key={label} className="px-5 py-3 flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{label}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{fmt(val)}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {c.fixed}: {fmt(result.fixed)} ({Math.round((result.fixed / result.yearly) * 100)}%)
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {c.fuelShare} {Math.round(result.fuelShare * 100)}% — {c.fixedNote}
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
