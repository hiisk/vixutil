'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryGrid, SummaryCard, TabBar } from '@/components/CalcShell';
import { DEPOSIT } from '@/lib/calc-l10n/deposit';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Mode = 'simple' | 'compound';

export default function DepositIntl({ lang }: { lang: CalcLang }) {
  const c = DEPOSIT[lang].ui;
  const tag = localeTag(lang);
  const [mode, setMode] = useState<Mode>('simple');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('3.5');
  const [months, setMonths] = useState('12');
  const [tax, setTax] = useState('0');
  const [result, setResult] = useState<{ principal: number; interest: number; tax: number; years: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    const n = parseInt(months, 10);
    const t = (parseFloat(tax) || 0) / 100;
    if (!isFinite(p) || p <= 0 || !isFinite(r) || !isFinite(n) || n <= 0 || n > 1200) return;

    const years = n / 12;
    const interest = mode === 'simple' ? p * r * years : p * (Math.pow(1 + r, years) - 1);
    setResult({ principal: p, interest, tax: interest * t, years });
  }

  const net = result ? result.interest - result.tax : 0;

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'simple' as Mode, label: c.tabSimple },
          { value: 'compound' as Mode, label: c.tabCompound },
        ]}
        value={mode}
        onChange={m => { setMode(m); setResult(null); }}
      />

      <Card className="p-5">
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.amount}</Label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-5">
            <div>
              <Label>{c.rate}</Label>
              <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.months}</Label>
              <input type="number" value={months} onChange={e => setMonths(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.tax}</Label>
              <input type="number" step="0.1" value={tax} onChange={e => setTax(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <SummaryGrid>
          <SummaryCard label={c.total} value={fmt(result.principal + net)} variant="primary" />
          <SummaryCard label={c.interest} value={`+${fmt(result.interest)}`} variant="green" />
          <SummaryCard label={c.netInterest} value={`+${fmt(net)}`} sub={`${c.taxPaid} −${fmt(result.tax)}`} variant="green" />
          <SummaryCard
            label={c.effective}
            value={`${((net / result.principal / result.years) * 100).toFixed(2)}%`}
          />
        </SummaryGrid>
      )}
    </div>
  );
}
