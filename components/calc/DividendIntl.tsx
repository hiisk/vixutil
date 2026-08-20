'use client';
import { useState } from 'react';
import { Card, Label, inputCls, selectCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { DIVIDEND } from '@/lib/calc-l10n/dividend';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

const TIMES: Record<string, number> = { monthly: 12, quarterly: 4, semi: 2, annual: 1 };

export default function DividendIntl({ lang }: { lang: CalcLang }) {
  const c = DIVIDEND[lang].ui;
  const tag = localeTag(lang);
  const [invest, setInvest] = useState('');
  const [rate, setRate] = useState('4');
  const [freq, setFreq] = useState('quarterly');
  const [tax, setTax] = useState('0');
  const [target, setTarget] = useState('');
  const [result, setResult] = useState<{
    annual: number; annualNet: number; perPayment: number; perPaymentNet: number; needed?: number;
  } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag, { maximumFractionDigits: 0 });

  function calculate() {
    const inv = parseFloat(invest);
    const r = parseFloat(rate) / 100;
    const t = (parseFloat(tax) || 0) / 100;
    if (!isFinite(inv) || inv <= 0 || !isFinite(r) || r <= 0) return;

    const times = TIMES[freq];
    const annual = inv * r;
    const annualNet = annual * (1 - t);
    const tm = parseFloat(target);
    const needed = isFinite(tm) && tm > 0 ? (tm * 12) / (1 - t) / r : undefined;

    setResult({ annual, annualNet, perPayment: annual / times, perPaymentNet: annualNet / times, needed });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.invest}</Label>
              <input type="number" value={invest} onChange={e => setInvest(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.yield}</Label>
              <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.freq}</Label>
              <select value={freq} onChange={e => setFreq(e.target.value)} className={selectCls}>
                <option value="monthly">{c.monthly}</option>
                <option value="quarterly">{c.quarterly}</option>
                <option value="semi">{c.semi}</option>
                <option value="annual">{c.annual}</option>
              </select>
            </div>
            <div>
              <Label>{c.tax}</Label>
              <input type="number" step="0.1" value={tax} onChange={e => setTax(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <Label>{c.target}</Label>
            <input type="number" value={target} onChange={e => setTarget(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard
              label={c.annualIncome}
              value={fmt(result.annualNet)}
              sub={`${fmt(result.annual)} → ${c.afterTax}`}
              variant="primary"
            />
            <SummaryCard
              label={c.perPayment}
              value={fmt(result.perPaymentNet)}
              sub={`${fmt(result.perPayment)} → ${c.afterTax}`}
              variant="green"
            />
          </div>
          {result.needed !== undefined && (
            <div className="stat-pri">
              <p className="stat-label">{c.needed}</p>
              <p className="stat-value">{fmt(result.needed)}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
