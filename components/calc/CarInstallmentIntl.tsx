'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, RatioBar } from '@/components/CalcShell';
import { CAR_INSTALLMENT } from '@/lib/calc-l10n/car';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

export default function CarInstallmentIntl({ lang }: { lang: CalcLang }) {
  const c = CAR_INSTALLMENT[lang].ui;
  const tag = localeTag(lang);
  const [price, setPrice] = useState('');
  const [down, setDown] = useState('0');
  const [months, setMonths] = useState('60');
  const [rate, setRate] = useState('5');
  const [result, setResult] = useState<{ loan: number; monthly: number; paid: number; interest: number } | null>(null);

  const fmt = (n: number) => Math.round(n).toLocaleString(tag);

  function calculate() {
    const p = parseFloat(price);
    const d = parseFloat(down) || 0;
    const n = parseInt(months, 10);
    const r = parseFloat(rate) / 100 / 12;
    if (!(p > 0) || !(n > 0) || !isFinite(r) || r < 0 || d >= p) return;

    const loan = p - d;
    const monthly = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    setResult({ loan, monthly, paid: monthly * n + d, interest: monthly * n - loan });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.price}</Label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.down}</Label>
              <input type="number" value={down} onChange={e => setDown(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.months}</Label>
              <input type="number" value={months} onChange={e => setMonths(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.rate}</Label>
              <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="bg-blue-600 rounded-2xl p-6 text-center">
            <p className="text-blue-200 text-xs mb-1">{c.monthly}</p>
            <p className="text-white text-4xl font-black">{fmt(result.monthly)}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <SummaryCard label={c.borrowed} value={fmt(result.loan)} />
            <SummaryCard label={c.totalPaid} value={fmt(result.paid)} />
            <SummaryCard label={c.totalInterest} value={fmt(result.interest)} variant="red" />
          </div>
          <Card className="p-5">
            <p className="label-caps mb-3">{c.split}</p>
            <RatioBar
              a={result.loan} b={result.interest}
              labelA={`${c.principalLabel} ${fmt(result.loan)}`}
              labelB={`${c.interestLabel} ${fmt(result.interest)}`}
            />
          </Card>
        </>
      )}
    </div>
  );
}
