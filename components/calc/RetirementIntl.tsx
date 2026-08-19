'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { RETIREMENT } from '@/lib/calc-l10n/retirement';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

interface Row { age: number; start: number; added: number; interest: number; end: number }

export default function RetirementIntl({ lang }: { lang: CalcLang }) {
  const c = RETIREMENT[lang].ui;
  const tag = localeTag(lang);
  const [currentAge, setCurrentAge] = useState('35');
  const [retireAge, setRetireAge] = useState('65');
  const [savings, setSavings] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('5');
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ rows: Row[]; total: number; paidIn: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    setError('');
    const ca = parseInt(currentAge, 10);
    const ra = parseInt(retireAge, 10);
    const cs = parseFloat(savings) || 0;
    const mc = parseFloat(monthly) || 0;
    const r = parseFloat(rate) / 100;
    if (!isFinite(ca) || !isFinite(ra) || ra <= ca) { setError(c.badAge); setResult(null); return; }
    if (!isFinite(r) || r < 0 || cs + mc <= 0) return;

    const mr = r / 12;
    const rows: Row[] = [];
    let balance = cs;
    for (let y = 0; y < ra - ca; y++) {
      const start = balance;
      const added = mc * 12;
      // 월 적립은 매달 들어오므로 12개월치를 연금 종가로 굴린다.
      const end = mr === 0 ? start + added : start * (1 + r) + mc * ((Math.pow(1 + mr, 12) - 1) / mr);
      rows.push({ age: ca + y + 1, start, added, interest: end - start - added, end });
      balance = end;
    }
    setResult({ rows, total: balance, paidIn: cs + mc * 12 * (ra - ca) });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.currentAge}</Label>
              <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.retireAge}</Label>
              <input type="number" value={retireAge} onChange={e => setRetireAge(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.savings}</Label>
              <input type="number" value={savings} onChange={e => setSavings(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.monthly}</Label>
              <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <Label>{c.rate}</Label>
            <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        {error && <p className="mt-3 text-xs text-rose-500">{error}</p>}
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.total}</p>
            <p className="stat-value">{fmt(result.total)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SummaryCard label={c.paidIn} value={fmt(result.paidIn)} />
            <SummaryCard label={c.growth} value={`+${fmt(result.total - result.paidIn)}`} variant="green" />
          </div>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.payout}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[20, 25, 30].map(y => (
                <SummaryCard key={y} label={`${y} ${c.years}`} value={fmt(result.total / (y * 12))} />
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="label-caps mb-3">{c.table}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 text-left">
                    <th className="py-1.5 font-semibold">{c.age}</th>
                    <th className="py-1.5 font-semibold text-right">{c.start}</th>
                    <th className="py-1.5 font-semibold text-right">{c.added}</th>
                    <th className="py-1.5 font-semibold text-right">{c.interest}</th>
                    <th className="py-1.5 font-semibold text-right">{c.end}</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {result.rows.map(r => (
                    <tr key={r.age} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="py-1.5 text-slate-500 dark:text-slate-400">{r.age}</td>
                      <td className="py-1.5 text-right text-slate-600 dark:text-slate-300">{fmt(r.start)}</td>
                      <td className="py-1.5 text-right text-slate-600 dark:text-slate-300">{fmt(r.added)}</td>
                      <td className="py-1.5 text-right text-emerald-600">+{fmt(r.interest)}</td>
                      <td className="py-1.5 text-right text-slate-800 dark:text-slate-100">{fmt(r.end)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
