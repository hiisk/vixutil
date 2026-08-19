'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { EV_CHARGE } from '@/lib/calc-l10n/car2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

export default function EvChargeIntl({ lang }: { lang: CalcLang }) {
  const c = EV_CHARGE[lang].ui;
  const tag = localeTag(lang);
  const [capacity, setCapacity] = useState('');
  const [fromPct, setFromPct] = useState('20');
  const [toPct, setToPct] = useState('80');
  const [price, setPrice] = useState('');
  const [efficiency, setEfficiency] = useState('6');
  const [result, setResult] = useState<{ kWh: number; cost: number; range: number } | null>(null);

  const fmt = (n: number, d = 2) => n.toLocaleString(tag, { maximumFractionDigits: d });

  function calculate() {
    const cap = parseFloat(capacity);
    const from = parseFloat(fromPct);
    const to = parseFloat(toPct);
    const p = parseFloat(price);
    const eff = parseFloat(efficiency);
    if (!(cap > 0) || !(p > 0) || !(eff > 0) || !(to > from) || from < 0 || to > 100) return;

    const kWh = cap * ((to - from) / 100);
    setResult({ kWh, cost: kWh * p, range: kWh * eff });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-x-4 gap-y-5">
            <div>
              <Label>{c.capacity}</Label>
              <input type="number" step="0.1" value={capacity} onChange={e => setCapacity(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.fromPct}</Label>
              <input type="number" value={fromPct} onChange={e => setFromPct(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.toPct}</Label>
              <input type="number" value={toPct} onChange={e => setToPct(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.price}</Label>
              <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.efficiency}</Label>
              <input type="number" step="0.1" value={efficiency} onChange={e => setEfficiency(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.cost}</p>
            <p className="stat-value">{fmt(result.cost, 0)}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5">
            <SummaryCard label={c.energy} value={`${fmt(result.kWh, 1)} kWh`} />
            <SummaryCard label={c.range} value={`${fmt(result.range, 0)} km`} variant="green" />
            <SummaryCard label={c.per100} value={fmt((result.cost / result.range) * 100, 2)} />
          </div>
        </>
      )}
    </div>
  );
}
