'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, SummaryGrid } from '@/components/CalcShell';
import { RENTAL_YIELD } from '@/lib/calc-l10n/daily';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';
import { calcRentalYield, type RentalResult } from '@/lib/rental-yield';

export default function RentalYieldIntl({ lang }: { lang: CalcLang }) {
  const c = RENTAL_YIELD[lang].ui;
  const tag = localeTag(lang);
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');
  const [rent, setRent] = useState('');
  const [acqCost, setAcqCost] = useState('');
  const [loan, setLoan] = useState('');
  const [loanRate, setLoanRate] = useState('');
  const [monthlyCost, setMonthlyCost] = useState('');
  const [result, setResult] = useState<RentalResult | null>(null);

  const fmt = (n: number) => Math.round(n).toLocaleString(tag);
  const num = (s: string) => parseFloat(s) || 0;

  function calculate() {
    const p = num(price);
    if (p <= 0) return;
    setResult(calcRentalYield({
      price: p, deposit: num(deposit), monthlyRent: num(rent),
      acquisitionCost: num(acqCost), loan: num(loan),
      loanRate: num(loanRate), monthlyCost: num(monthlyCost),
    }));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.property}</p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.price}</Label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.rent}</Label>
              <input type="number" value={rent} onChange={e => setRent(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <Label>{c.acqCost}</Label>
            <input type="number" value={acqCost} onChange={e => setAcqCost(e.target.value)} className={inputCls} />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{c.acqHint}</p>
          </div>
          <div>
            <Label>{c.deposit}</Label>
            <input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} className={inputCls} />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{c.depositHint}</p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <p className="label-caps mb-3">{c.financing}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <Label>{c.loan}</Label>
            <input type="number" value={loan} onChange={e => setLoan(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.loanRate}</Label>
            <input type="number" step="0.1" value={loanRate} onChange={e => setLoanRate(e.target.value)} className={inputCls} />
          </div>
          <div className="col-span-2">
            <Label>{c.monthlyCost}</Label>
            <input type="number" value={monthlyCost} onChange={e => setMonthlyCost(e.target.value)} className={inputCls} />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{c.costHint}</p>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <Card className="p-5">
            <p className="label-caps mb-3">{c.netTitle}</p>
            {result.investmentNonPositive ? (
              <>
                <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{c.undef}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{c.undefNote}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {c.grossLabel} <strong className="text-slate-800 dark:text-slate-100">{result.grossYield.toFixed(2)}%</strong>
                </p>
              </>
            ) : (
              <>
                <p className={`text-3xl font-black ${result.netYield! < 0 ? 'text-red-500' : 'text-slate-900 dark:text-slate-100'}`}>
                  {result.netYield!.toFixed(2)}<span className="text-lg font-bold ml-1">%</span>
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {c.grossLabel} {result.grossYield.toFixed(2)}% · {c.investedLabel} {fmt(result.actualInvestment)}
                </p>
              </>
            )}
          </Card>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.breakdown}</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">{c.annualRent}</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{fmt(result.annualRent)}</span>
              </div>
              {result.annualCost > 0 && (
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>{c.minusCosts}</span>
                  <span className="tabular-nums">−{fmt(result.annualCost)}</span>
                </div>
              )}
              {result.annualInterest > 0 && (
                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>{c.minusInterest}</span>
                  <span className="tabular-nums">−{fmt(result.annualInterest)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">{c.netIncome}</span>
                <span className={`font-bold tabular-nums ${result.netAnnualIncome < 0 ? 'text-red-500' : 'text-slate-900 dark:text-slate-100'}`}>
                  {fmt(result.netAnnualIncome)}
                </span>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">{c.invested}</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">{fmt(result.actualInvestment)}</span>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">{c.formula}</p>
            </div>

            <SummaryGrid>
              <SummaryCard label={c.grossLabel} value={`${result.grossYield.toFixed(2)}%`} />
              <SummaryCard
                label={c.netTitle}
                value={result.netYield === null ? '—' : `${result.netYield.toFixed(2)}%`}
                variant={result.netYield !== null && result.netYield < 0 ? 'red' : 'primary'}
              />
              <SummaryCard label={c.netIncome} value={fmt(result.netAnnualIncome)} />
              <SummaryCard
                label={c.payback}
                value={result.paybackYears === null ? '—' : `${result.paybackYears.toFixed(1)} ${c.yearsSuffix}`}
              />
            </SummaryGrid>
          </Card>
        </>
      )}
    </div>
  );
}
