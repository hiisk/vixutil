'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryGrid, SummaryCard, RatioBar } from '@/components/CalcShell';
import { SIMPLE_INTEREST } from '@/lib/calc-l10n/simple-interest';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

interface Row { label: string; interest: number; afterTax: number; cumulative: number; balance: number }

export default function SimpleInterestIntl({ lang }: { lang: CalcLang }) {
  const c = SIMPLE_INTEREST[lang].ui;
  const tag = localeTag(lang);
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('3');
  const [months, setMonths] = useState('24');
  const [tax, setTax] = useState('0');
  const [result, setResult] = useState<{ rows: Row[]; principal: number; interest: number; tax: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseInt(months, 10);
    const t = (parseFloat(tax) || 0) / 100;
    if (!isFinite(p) || p <= 0 || !isFinite(r) || !isFinite(n) || n <= 0 || n > 1200) return;

    const rows: Row[] = [];
    let cumulative = 0;
    const fullYears = Math.floor(n / 12);
    const rest = n % 12;

    for (let y = 1; y <= fullYears; y++) {
      const interest = p * r * 12;
      cumulative += interest;
      rows.push({ label: `${y}${c.year}`, interest, afterTax: interest * (1 - t), cumulative, balance: p + cumulative });
    }
    if (rest > 0) {
      const interest = p * r * rest;
      cumulative += interest;
      const label = fullYears > 0 ? `${fullYears}${c.year} ${rest}${c.month}` : `${rest}${c.month}`;
      rows.push({ label, interest, afterTax: interest * (1 - t), cumulative, balance: p + cumulative });
    }

    setResult({ rows, principal: p, interest: cumulative, tax: cumulative * t });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.principal}</Label>
            <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className={inputCls} />
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
        <>
          <SummaryGrid>
            <SummaryCard label={c.maturity} value={fmt(result.principal + result.interest)} variant="primary" />
            <SummaryCard label={c.totalInterest} value={`+${fmt(result.interest)}`} variant="green" />
            <SummaryCard label={c.netInterest} value={`+${fmt(result.interest - result.tax)}`} sub={`${c.taxPaid} −${fmt(result.tax)}`} variant="green" />
            <SummaryCard label={c.netMaturity} value={fmt(result.principal + result.interest - result.tax)} />
          </SummaryGrid>

          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.split}</p>
            <RatioBar
              a={result.principal} b={result.interest}
              labelA={`${c.principalLabel} ${fmt(result.principal)}`}
              labelB={`${c.interestLabel} ${fmt(result.interest)}`}
            />
          </Card>

          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.schedule}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 text-left">
                    <th className="py-1.5 font-semibold">{c.period}</th>
                    <th className="py-1.5 font-semibold text-right">{c.interest}</th>
                    <th className="py-1.5 font-semibold text-right">{c.afterTax}</th>
                    <th className="py-1.5 font-semibold text-right">{c.cumulative}</th>
                    <th className="py-1.5 font-semibold text-right">{c.balance}</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {result.rows.map((r, i) => (
                    <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                      <td className="py-1.5 text-slate-500 dark:text-slate-400 font-sans">{r.label}</td>
                      <td className="py-1.5 text-right text-emerald-600">+{fmt(r.interest)}</td>
                      <td className="py-1.5 text-right text-slate-600 dark:text-slate-300">+{fmt(r.afterTax)}</td>
                      <td className="py-1.5 text-right text-emerald-600">+{fmt(r.cumulative)}</td>
                      <td className="py-1.5 text-right text-slate-800 dark:text-slate-100">{fmt(r.balance)}</td>
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
