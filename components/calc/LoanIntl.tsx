'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, TabBar } from '@/components/CalcShell';
import { LOAN } from '@/lib/calc-l10n/loan';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Method = 'level' | 'straight';
interface Row { month: number; payment: number; principal: number; interest: number; balance: number }

export default function LoanIntl({ lang }: { lang: CalcLang }) {
  const c = LOAN[lang].ui;
  const tag = localeTag(lang);
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [method, setMethod] = useState<Method>('level');
  const [result, setResult] = useState<{ rows: Row[]; totalInterest: number; totalPaid: number } | null>(null);
  const [showAll, setShowAll] = useState(false);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(years, 10) * 12;
    if (!isFinite(p) || p <= 0 || !isFinite(r) || !isFinite(n) || n <= 0) return;

    const rows: Row[] = [];
    let balance = p;

    if (method === 'level') {
      const pay = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      for (let m = 1; m <= n; m++) {
        const interest = balance * r;
        const principal = pay - interest;
        balance = Math.max(0, balance - principal);
        rows.push({ month: m, payment: pay, principal, interest, balance });
      }
    } else {
      const principal = p / n;
      for (let m = 1; m <= n; m++) {
        const interest = balance * r;
        balance = Math.max(0, balance - principal);
        rows.push({ month: m, payment: principal + interest, principal, interest, balance });
      }
    }

    const totalInterest = rows.reduce((s, x) => s + x.interest, 0);
    setResult({ rows, totalInterest, totalPaid: p + totalInterest });
    setShowAll(false);
  }

  const visible = result ? (showAll ? result.rows : result.rows.slice(0, 12)) : [];

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'level' as Method, label: c.level },
          { value: 'straight' as Method, label: c.straight },
        ]}
        value={method}
        onChange={m => { setMethod(m); setResult(null); }}
      />

      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.amount}</Label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.rate}</Label>
              <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.years}</Label>
              <input type="number" value={years} onChange={e => setYears(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <Card className="p-5 text-center">
            <p className="label-caps mb-2">
              {method === 'level' ? c.monthly : c.firstMonth}
            </p>
            <p className="text-4xl font-black text-blue-600">{fmt(result.rows[0].payment)}</p>
            <div className="mt-3 flex justify-center gap-6 text-sm">
              <span className="text-slate-500 dark:text-slate-400">{c.totalInterest} <strong className="text-rose-600">{fmt(result.totalInterest)}</strong></span>
              <span className="text-slate-500 dark:text-slate-400">{c.totalPaid} <strong className="text-slate-800 dark:text-slate-100">{fmt(result.totalPaid)}</strong></span>
            </div>
          </Card>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.schedule}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 text-left">
                    <th className="py-1.5 font-semibold">{c.month}</th>
                    <th className="py-1.5 font-semibold text-right">{c.payment}</th>
                    <th className="py-1.5 font-semibold text-right">{c.principalPart}</th>
                    <th className="py-1.5 font-semibold text-right">{c.interestPart}</th>
                    <th className="py-1.5 font-semibold text-right">{c.balance}</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {visible.map(r => (
                    <tr key={r.month} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="py-1.5 text-slate-500 dark:text-slate-400">{r.month}</td>
                      <td className="py-1.5 text-right text-slate-800 dark:text-slate-100">{fmt(r.payment)}</td>
                      <td className="py-1.5 text-right text-slate-600 dark:text-slate-300">{fmt(r.principal)}</td>
                      <td className="py-1.5 text-right text-rose-600">{fmt(r.interest)}</td>
                      <td className="py-1.5 text-right text-slate-600 dark:text-slate-300">{fmt(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!showAll && result.rows.length > 12 && (
              <button onClick={() => setShowAll(true)} className="mt-3 w-full py-2 text-xs font-bold text-blue-600 hover:underline">
                + {result.rows.length - 12}
              </button>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
