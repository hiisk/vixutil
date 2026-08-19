'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { LTV } from '@/lib/calc-l10n/finance2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

export default function LtvIntl({ lang }: { lang: CalcLang }) {
  const c = LTV[lang].ui;
  const tag = localeTag(lang);
  const [propertyValue, setPropertyValue] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [limit, setLimit] = useState('80');
  const [result, setResult] = useState<{ ltv: number; limit: number; equity: number; maxLoan: number; headroom: number } | null>(null);

  const fmt = (n: number, d = 0) => n.toLocaleString(tag, { maximumFractionDigits: d });

  function calculate() {
    const pv = parseFloat(propertyValue);
    const la = parseFloat(loanAmount);
    const lim = parseFloat(limit);
    if (!(pv > 0) || !(la >= 0)) return;
    const ltv = (la / pv) * 100;
    const maxLoan = lim > 0 ? (pv * lim) / 100 : 0;
    setResult({
      ltv,
      limit: lim,
      equity: Math.max(0, pv - la),
      maxLoan,
      headroom: Math.max(0, maxLoan - la),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-5">
          <div>
            <Label>{c.propertyValue}</Label>
            <input type="number" value={propertyValue} onChange={e => setPropertyValue(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.loanAmount}</Label>
            <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.limit}</Label>
            <input type="number" value={limit} onChange={e => setLimit(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.ltv}</p>
            <p className="stat-value">{fmt(result.ltv, 1)}%</p>
            {result.limit > 0 && (
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                {c.limitShort} {fmt(result.limit)}% · {result.ltv <= result.limit ? c.within : c.over}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5">
            <SummaryCard label={c.equity} value={fmt(result.equity)} />
            <SummaryCard label={c.maxLoan} value={fmt(result.maxLoan)} />
            <SummaryCard label={c.headroom} value={fmt(result.headroom)} />
          </div>
        </>
      )}
    </div>
  );
}
