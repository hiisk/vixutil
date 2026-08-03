'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, TabBar } from '@/components/CalcShell';
import { DISCOUNT } from '@/lib/calc-l10n/life2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Mode = 'price' | 'rate' | 'original';

export default function DiscountIntl({ lang }: { lang: CalcLang }) {
  const c = DISCOUNT[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('price');
  const [original, setOriginal] = useState('');
  const [rate, setRate] = useState('30');
  const [sale, setSale] = useState('');
  const [result, setResult] = useState<{ main: number; saved: number; rate: number; label: string } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 2 });

  function calculate() {
    const o = parseFloat(original);
    const r = parseFloat(rate);
    const s = parseFloat(sale);

    if (mode === 'price') {
      if (!(o > 0) || !(r >= 0) || r > 100) return;
      const saved = o * (r / 100);
      setResult({ main: o - saved, saved, rate: r, label: c.finalPrice });
    } else if (mode === 'rate') {
      if (!(o > 0) || !(s >= 0) || s > o) return;
      setResult({ main: ((o - s) / o) * 100, saved: o - s, rate: ((o - s) / o) * 100, label: c.tabRate });
    } else {
      if (!(s > 0) || !(r > 0) || r >= 100) return;
      const orig = s / (1 - r / 100);
      setResult({ main: orig, saved: orig - s, rate: r, label: c.wasPrice });
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'price' as Mode, label: c.tabPrice },
          { value: 'rate' as Mode, label: c.tabRate },
          { value: 'original' as Mode, label: c.tabOriginal },
        ]}
        value={mode}
        onChange={m => { setMode(m); setResult(null); }}
      />

      <Card className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {mode !== 'original' && (
            <div className={mode === 'price' ? '' : ''}>
              <Label>{c.original}</Label>
              <input type="number" value={original} onChange={e => setOriginal(e.target.value)} className={inputCls} />
            </div>
          )}
          {mode !== 'rate' && (
            <div>
              <Label>{c.rate}</Label>
              <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
            </div>
          )}
          {mode !== 'price' && (
            <div>
              <Label>{c.sale}</Label>
              <input type="number" value={sale} onChange={e => setSale(e.target.value)} className={inputCls} />
            </div>
          )}
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="bg-blue-600 rounded-2xl p-6 text-center">
            <p className="text-blue-200 text-xs mb-1">{result.label}</p>
            <p className="text-white text-4xl font-black">
              {mode === 'rate' ? `${fmt(result.main)}%` : fmt(result.main)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SummaryCard label={c.saved} value={fmt(result.saved)} variant="green" />
            <SummaryCard label={c.savedRate} value={`${fmt(result.rate)}%`} />
          </div>
        </>
      )}
    </div>
  );
}
