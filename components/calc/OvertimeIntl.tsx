'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { OVERTIME } from '@/lib/calc-l10n/work';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

export default function OvertimeIntl({ lang }: { lang: CalcLang }) {
  const c = OVERTIME[lang].ui;
  const tag = localeTag(lang);
  const [wage, setWage] = useState('');
  const [hours, setHours] = useState('');
  const [multiplier, setMultiplier] = useState('1.5');
  const [result, setResult] = useState<{ pay: number; rate: number; premium: number } | null>(null);

  const fmt = (n: number, d = 2) => n.toLocaleString(tag, { maximumFractionDigits: d });

  function calculate() {
    const w = parseFloat(wage);
    const h = parseFloat(hours);
    const m = parseFloat(multiplier);
    if (!(w > 0) || !(h > 0) || !(m > 0)) return;
    setResult({ pay: w * h * m, rate: w * m, premium: w * (m - 1) * h });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-5">
          <div>
            <Label>{c.wage}</Label>
            <input type="number" step="0.01" value={wage} onChange={e => setWage(e.target.value)} className={inputCls} min="0" />
          </div>
          <div>
            <Label>{c.hours}</Label>
            <input type="number" step="0.5" value={hours} onChange={e => setHours(e.target.value)} className={inputCls} min="0" />
          </div>
          <div>
            <Label>{c.multiplier}</Label>
            <input type="number" step="0.05" value={multiplier} onChange={e => setMultiplier(e.target.value)} className={inputCls} min="0" />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.pay}</p>
            <p className="stat-value">{fmt(result.pay)}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard label={c.otRate} value={fmt(result.rate)} />
            <SummaryCard label={c.premium} value={fmt(result.premium)} />
          </div>
        </>
      )}
    </div>
  );
}
