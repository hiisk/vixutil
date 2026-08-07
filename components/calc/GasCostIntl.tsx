'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { GAS_COST } from '@/lib/calc-l10n/car2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

export default function GasCostIntl({ lang }: { lang: CalcLang }) {
  const c = GAS_COST[lang].ui;
  const tag = localeTag(lang);
  const [distance, setDistance] = useState('');
  const [economy, setEconomy] = useState('');
  const [price, setPrice] = useState('');
  const [roundTrip, setRoundTrip] = useState(false);
  const [result, setResult] = useState<{ fuel: number; cost: number; km: number } | null>(null);

  const fmt = (n: number, d = 2) => n.toLocaleString(tag, { maximumFractionDigits: d });

  function calculate() {
    const dist = parseFloat(distance);
    const e = parseFloat(economy);
    const p = parseFloat(price);
    if (!(dist > 0) || !(e > 0) || !(p > 0)) return;
    const km = roundTrip ? dist * 2 : dist;
    const fuel = km / e;
    setResult({ fuel, cost: fuel * p, km });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label>{c.distance}</Label>
            <input type="number" value={distance} onChange={e => setDistance(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.economy}</Label>
            <input type="number" step="0.1" value={economy} onChange={e => setEconomy(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.price}</Label>
            <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className={inputCls} />
          </div>
        </div>
        <label className="mt-3 flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={roundTrip} onChange={e => setRoundTrip(e.target.checked)} className="w-4 h-4 accent-blue-600" />
          <span className="text-sm text-slate-700 dark:text-slate-200">{c.roundTrip}</span>
        </label>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="bg-blue-600 rounded-2xl p-6 text-center">
            <p className="text-blue-200 text-xs mb-1">{c.cost}</p>
            <p className="text-white text-4xl font-black">{fmt(result.cost, 0)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SummaryCard label={c.fuelNeeded} value={`${fmt(result.fuel)} ${c.litres}`} />
            <SummaryCard label={c.perKm} value={fmt(result.cost / result.km, 3)} />
          </div>
        </>
      )}
    </div>
  );
}
