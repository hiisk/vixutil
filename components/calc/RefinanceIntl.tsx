'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { REFINANCE } from '@/lib/calc-l10n/finance2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';
import { compareRefinance, type RefinanceResult } from '@/lib/refinance';

export default function RefinanceIntl({ lang }: { lang: CalcLang }) {
  const c = REFINANCE[lang].ui;
  const tag = localeTag(lang);
  const [balance, setBalance] = useState('');
  const [currentRate, setCurrentRate] = useState('');
  const [currentTerm, setCurrentTerm] = useState('');
  const [newRate, setNewRate] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [fee, setFee] = useState('0');
  const [costs, setCosts] = useState('0');
  const [result, setResult] = useState<RefinanceResult | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    const b = parseFloat(balance);
    const cm = parseFloat(currentTerm);
    const nm = parseFloat(newTerm);
    if (!(b > 0) || !(cm > 0) || !(nm > 0)) return;
    setResult(compareRefinance({
      balance: b,
      currentRate: parseFloat(currentRate) || 0,
      currentMonths: cm,
      newRate: parseFloat(newRate) || 0,
      newMonths: nm,
      prepaymentFee: parseFloat(fee) || 0,
      setupCost: parseFloat(costs) || 0,
    }));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.balance}</Label>
            <input type="number" value={balance} onChange={e => setBalance(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.currentRate}</Label>
              <input type="number" step="0.01" value={currentRate} onChange={e => setCurrentRate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.currentTerm}</Label>
              <input type="number" value={currentTerm} onChange={e => setCurrentTerm(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.newRate}</Label>
              <input type="number" step="0.01" value={newRate} onChange={e => setNewRate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.newTerm}</Label>
              <input type="number" value={newTerm} onChange={e => setNewTerm(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.fee}</Label>
              <input type="number" value={fee} onChange={e => setFee(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.costs}</Label>
              <input type="number" value={costs} onChange={e => setCosts(e.target.value)} className={inputCls} />
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">{c.feeHint}</p>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className={`${result.worthIt ? 'bg-emerald-600' : 'bg-rose-600'} rounded-lg p-6 text-center`}>
            <p className={`${result.worthIt ? 'text-emerald-200' : 'text-rose-200'} text-xs mb-1`}>{c.net}</p>
            <p className="text-white text-4xl font-bold">{fmt(result.netBenefit)}</p>
            <p className={`${result.worthIt ? 'text-emerald-200' : 'text-rose-200'} text-xs mt-1`}>
              {result.worthIt ? c.worth : c.notWorth}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard label={c.monthlyChange} value={fmt(result.paymentDiff)} />
            <SummaryCard
              label={c.breakEven}
              value={
                result.breakEvenMonths === null ? c.na
                : result.breakEvenMonths === 0 ? c.immediate
                : `${fmt(result.breakEvenMonths)} ${c.monthsUnit}`
              }
              sub={result.breakEvenMonths === null ? c.naSub : undefined}
            />
            <SummaryCard label={`${c.interestSaved} (${c.beforeCosts})`} value={fmt(result.interestSaved)} />
            <SummaryCard label={c.upfront} value={fmt(result.upfrontCost)} />
            <SummaryCard label={c.currentInterest} value={fmt(result.currentTotalInterest)} />
            <SummaryCard label={c.newInterest} value={fmt(result.newTotalInterest)} />
          </div>
        </>
      )}
    </div>
  );
}
