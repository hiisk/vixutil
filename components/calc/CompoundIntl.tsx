'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn } from '@/components/CalcShell';
import { COMPOUND } from '@/lib/calc-l10n/compound';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

type Freq = 12 | 4 | 1;

/**
 * 세율을 입력으로 뺐다. 한국어판은 이자소득세 15.4%를 안에 박아 두는데,
 * 그 숫자는 한국 세법이라 다른 나라에서는 틀린다. 기본값도 두지 않았다 —
 * 아무 세율이나 미리 넣으면 그것이 그 나라 세율이라는 뜻이 되어 버린다.
 */
export default function CompoundIntl({ lang }: { lang: CalcLang }) {
  const c = COMPOUND[lang].ui;
  const tag = localeTag(lang);
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [freq, setFreq] = useState<Freq>(12);
  const [tax, setTax] = useState('0');
  const [result, setResult] = useState<{ rows: { year: number; balance: number }[]; final: number; interest: number; afterTax: number } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const y = parseInt(years, 10);
    const t = (parseFloat(tax) || 0) / 100;
    if (!isFinite(p) || p <= 0 || !isFinite(r) || !isFinite(y) || y <= 0) return;

    const rows: { year: number; balance: number }[] = [];
    for (let i = 1; i <= y; i++) rows.push({ year: i, balance: p * Math.pow(1 + r / freq, freq * i) });
    const final = rows[rows.length - 1].balance;
    const interest = final - p;
    setResult({ rows, final, interest, afterTax: p + interest * (1 - t) });
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.rate}</Label>
              <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.years}</Label>
              <input type="number" value={years} onChange={e => setYears(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.frequency}</Label>
              <select value={freq} onChange={e => setFreq(Number(e.target.value) as Freq)} className={selectCls}>
                <option value={12}>{c.monthly}</option>
                <option value={4}>{c.quarterly}</option>
                <option value={1}>{c.annually}</option>
              </select>
            </div>
            <div>
              <Label>{c.tax}</Label>
              <input type="number" step="0.1" value={tax} onChange={e => setTax(e.target.value)} className={inputCls} />
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">{c.taxHint}</p>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <Card className="p-5 text-center">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">{c.result}</p>
            <p className="text-4xl font-black text-blue-600">{fmt(result.final)}</p>
            <div className="mt-3 flex justify-center gap-6 text-sm">
              <span className="text-slate-500 dark:text-slate-400">{c.interest} <strong className="text-emerald-600">{fmt(result.interest)}</strong></span>
              {parseFloat(tax) > 0 && (
                <span className="text-slate-500 dark:text-slate-400">{c.afterTax} <strong className="text-slate-800 dark:text-slate-100">{fmt(result.afterTax)}</strong></span>
              )}
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{c.table}</p>
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-auto">
              {result.rows.map(r => (
                <div key={r.year} className="flex justify-between items-center py-2 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{c.year} {r.year}</span>
                  <span className="font-mono text-slate-800 dark:text-slate-100">{fmt(r.balance)}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
