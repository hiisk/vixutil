'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryGrid, SummaryCard } from '@/components/CalcShell';
import { SAVINGS } from '@/lib/calc-l10n/savings';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

export default function SavingsIntl({ lang }: { lang: CalcLang }) {
  const c = SAVINGS[lang].ui;
  const tag = localeTag(lang);
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('4');
  const [months, setMonths] = useState('24');
  const [tax, setTax] = useState('0');
  const [result, setResult] = useState<{ paidIn: number; interest: number; tax: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    const m = parseFloat(monthly);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months, 10);
    const t = (parseFloat(tax) || 0) / 100;
    if (!isFinite(m) || m <= 0 || !isFinite(r) || !isFinite(n) || n <= 0 || n > 600) return;

    // 회차마다 남은 개월 수가 다르다 — n, n-1, ... 1을 더하면 n(n+1)/2.
    const interest = m * r * ((n * (n + 1)) / 2);
    setResult({ paidIn: m * n, interest, tax: interest * t });
  }

  const net = result ? result.interest - result.tax : 0;

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.monthly}</Label>
            <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-3 gap-3">
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
          <SummaryCard label={c.total} value={fmt(result.paidIn + net)} variant="primary" />
          <SummaryCard label={c.paidIn} value={fmt(result.paidIn)} />
          <SummaryCard label={c.interest} value={`+${fmt(net)}`} sub={`${c.taxPaid} −${fmt(result.tax)}`} variant="green" />
          <SummaryCard label={c.effective} value={`${((net / result.paidIn) * 100).toFixed(2)}%`} />
        </SummaryGrid>
      )}
    </div>
  );
}
