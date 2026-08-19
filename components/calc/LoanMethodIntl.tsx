'use client';
import { useState } from 'react';
import { Card, CardHeader, Label, inputCls } from '@/components/CalcShell';
import { LOAN_METHOD } from '@/lib/calc-l10n/finance2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';
import { compareAll, type Method } from '@/lib/loan-schedule';

export default function LoanMethodIntl({ lang }: { lang: CalcLang }) {
  const c = LOAN_METHOD[lang].ui;
  const tag = localeTag(lang);
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [months, setMonths] = useState('');

  /*
   * 버튼을 없앴다 (2026-08-19). 값에서 바로 나오므로 저장할 상태가 없다.
   * 입력이 아직 성립하지 않으면 null이고, 그동안 결과가 안 그려진다 —
   * 예전에 버튼을 안 누른 상태와 같다.
   */
  const result: null | ReturnType<typeof compareAll> = ((): null | ReturnType<typeof compareAll> => {
    const loan = { principal: parseFloat(principal), annualRate: parseFloat(rate) || 0, months: parseFloat(months) };
    if (!(loan.principal > 0) || !(loan.months > 0)) return null;
    return (compareAll(loan));
  
    return null;
  })();
  const fmt = (n: number) => Math.round(n).toLocaleString(tag);
  const methodLabel: Record<Method, string> = {
    'equal-payment': c.mEqualPayment,
    'equal-principal': c.mEqualPrincipal,
    'bullet': c.mBullet,
  };



  const best = result ? result.reduce((a, b) => (a.totalInterest <= b.totalInterest ? a : b)) : null;

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.principal}</Label>
            <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.rate}</Label>
              <input type="number" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.term}</Label>
              <input type="number" value={months} onChange={e => setMonths(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && best && (
        <>
          <div className="stat-pri">
            <p className="stat-label">{c.best}</p>
            <p className="stat-value">{methodLabel[best.method]}</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              {c.totalInterest} {fmt(best.totalInterest)} · {c.firstPayment} {fmt(best.firstPayment)}
            </p>
          </div>
          {result.map(s => (
            <Card key={s.method}>
              <CardHeader title={methodLabel[s.method]} />
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {([
                  [c.firstPayment, s.firstPayment],
                  [c.lastPayment, s.lastPayment],
                  [c.totalInterest, s.totalInterest],
                  [c.totalPaid, s.totalPaid],
                ] as const).map(([k, v]) => (
                  <div key={k} className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{k}</span>
                    <span className="font-semibold">{fmt(v)}</span>
                  </div>
                ))}
                {s.method !== best.method && (
                  <div className="px-5 py-3 flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{c.vsBest}</span>
                    <span className="font-semibold text-rose-600 dark:text-rose-400">
                      +{fmt(s.totalInterest - best.totalInterest)}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}
