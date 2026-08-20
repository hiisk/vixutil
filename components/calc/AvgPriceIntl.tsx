'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { AVG_PRICE } from '@/lib/calc-l10n/avg-price';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

interface Row { price: string; qty: string }

export default function AvgPriceIntl({ lang }: { lang: CalcLang }) {
  const c = AVG_PRICE[lang].ui;
  const tag = localeTag(lang);
  const [rows, setRows] = useState<Row[]>([{ price: '', qty: '' }, { price: '', qty: '' }]);
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState<{
    avg: number; qty: number; cost: number; value?: number; pl?: number; plRate?: number;
  } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 2 });

  function update(i: number, key: keyof Row, v: string) {
    setRows(prev => prev.map((r, idx) => (idx === i ? { ...r, [key]: v } : r)));
  }

  function calculate() {
    const valid = rows
      .map(r => ({ price: parseFloat(r.price), qty: parseFloat(r.qty) }))
      .filter(r => isFinite(r.price) && r.price > 0 && isFinite(r.qty) && r.qty > 0);
    if (valid.length === 0) return;

    const cost = valid.reduce((s, r) => s + r.price * r.qty, 0);
    const qty = valid.reduce((s, r) => s + r.qty, 0);
    const avg = cost / qty;
    const cp = parseFloat(current);
    if (isFinite(cp) && cp > 0) {
      setResult({ avg, qty, cost, value: cp * qty, pl: (cp - avg) * qty, plRate: (cp / avg - 1) * 100 });
    } else {
      setResult({ avg, qty, cost });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-2">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-5 gap-2 items-end">
              <div className="col-span-2">
                {i === 0 && <Label>{c.price}</Label>}
                <input type="number" value={row.price} onChange={e => update(i, 'price', e.target.value)} className={inputCls} />
              </div>
              <div className="col-span-2">
                {i === 0 && <Label>{c.qty}</Label>}
                <input type="number" value={row.qty} onChange={e => update(i, 'qty', e.target.value)} className={inputCls} />
              </div>
              <button
                type="button"
                onClick={() => setRows(prev => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev))}
                className="py-3 text-slate-500 dark:text-slate-400 hover:text-rose-500 text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
          {rows.length < 10 && (
            <button type="button" onClick={() => setRows(prev => [...prev, { price: '', qty: '' }])}
              className="mt-1 text-sm text-blue-600 font-semibold hover:underline text-left">
              {c.add}
            </button>
          )}
        </div>
        <div className="mt-4">
          <Label>{c.current}</Label>
          <input type="number" value={current} onChange={e => setCurrent(e.target.value)} className={inputCls} />
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <div className="stat-pri">
            <p className="stat-label">{c.avgPrice}</p>
            <p className="stat-value">{fmt(result.avg)}</p>
            <p className="stat-sub">
              {fmt(result.qty)} {c.totalQty} · {fmt(result.cost)} {c.totalCost}
            </p>
          </div>
          {result.pl !== undefined && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <SummaryCard label={c.marketValue} value={fmt(result.value!)} />
              <SummaryCard
                label={c.unrealised}
                value={`${result.pl >= 0 ? '+' : ''}${fmt(result.pl)}`}
                sub={`${result.plRate! >= 0 ? '+' : ''}${result.plRate!.toFixed(2)}%`}
                variant={result.pl >= 0 ? 'green' : 'red'}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
