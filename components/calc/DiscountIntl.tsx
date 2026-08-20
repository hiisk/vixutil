'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, TabBar, SummaryGrid, SummaryCard } from '@/components/CalcShell';
import { DISCOUNT } from '@/lib/calc-l10n/age-discount';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { discountFromRate, discountFromPrices, originalFromDiscount, type DiscountResult } from '@/lib/global-calc';
import { localeTag } from '@/lib/locales';

type Mode = 'price' | 'rate' | 'reverse';

const QUICK = [10, 20, 25, 30, 40, 50, 70];

export default function DiscountIntl({ lang }: { lang: CalcLang }) {
  const c = DISCOUNT[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('price');
  const [original, setOriginal] = useState('');
  const [rate, setRate] = useState('');
  const [extra, setExtra] = useState('');
  const [sale, setSale] = useState('');
  const [result, setResult] = useState<DiscountResult | null>(null);

  /* 통화 기호는 안 붙인다 — 나라마다 다르고, 어느 하나를 고르면 나머지가 틀린다 */
  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 2 });
  const pct = (n: number) => `${n.toLocaleString(tag, { maximumFractionDigits: 2 })}%`;
  const num = (s: string) => Number(s.replace(',', '.'));

  const stacked = mode === 'price' && extra.trim() !== '';

  function calculate() {
    if (mode === 'price') {
      const rates = [num(rate), ...(stacked ? [num(extra)] : [])];
      setResult(discountFromRate(num(original), rates));
    } else if (mode === 'rate') {
      setResult(discountFromPrices(num(original), num(sale)));
    } else {
      setResult(originalFromDiscount(num(sale), num(rate)));
    }
  }

  function switchMode(m: Mode) {
    setMode(m);
    setResult(null);
  }

  const rateField = (
    <div>
      <Label>{c.rate}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {QUICK.map(r => (
          <button
            key={r} type="button" onClick={() => setRate(String(r))}
            className={`rounded-lg border px-3.5 py-2 text-sm font-bold transition-colors ${
              rate === String(r)
                ? 'bg-sec border-transparent'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {r}%
          </button>
        ))}
      </div>
      <input type="number" value={rate} onChange={e => setRate(e.target.value)} min="0" max="100" className={inputCls} />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'price' as Mode, label: c.tabPrice },
          { value: 'rate' as Mode, label: c.tabRate },
          { value: 'reverse' as Mode, label: c.tabReverse },
        ]}
        value={mode}
        onChange={switchMode}
      />

      <Card className="p-5">
        <div className="flex flex-col gap-3">
          {mode !== 'reverse' && (
            <div>
              <Label>{c.original}</Label>
              <input type="number" value={original} onChange={e => setOriginal(e.target.value)} min="0" step="0.01" className={inputCls} />
            </div>
          )}
          {mode !== 'price' && (
            <div>
              <Label>{c.sale}</Label>
              <input type="number" value={sale} onChange={e => setSale(e.target.value)} min="0" step="0.01" className={inputCls} />
            </div>
          )}
          {mode !== 'rate' && rateField}
          {mode === 'price' && (
            <div>
              <Label>{c.extra}</Label>
              <input type="number" value={extra} onChange={e => setExtra(e.target.value)} min="0" max="100" className={inputCls} />
            </div>
          )}
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <SummaryGrid>
            <SummaryCard
              label={mode === 'reverse' ? c.outOriginal : c.outFinal}
              value={fmt(mode === 'reverse' ? result.original : result.final)}
              variant="primary"
            />
            <SummaryCard label={c.outSaved} value={`-${fmt(result.saved)}`} variant="red" />
            <SummaryCard label={c.outRate} value={pct(result.rate)} />
            <SummaryCard
              label={mode === 'reverse' ? c.outFinal : c.outOriginal}
              value={fmt(mode === 'reverse' ? result.final : result.original)}
            />
          </SummaryGrid>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {stacked ? c.stackNote : c.note}
          </p>
        </>
      )}
    </div>
  );
}
