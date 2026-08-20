'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard, SummaryGrid } from '@/components/CalcShell';
import { TIP } from '@/lib/calc-l10n/global';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { calcTip, TIP_PRESETS, type TipResult } from '@/lib/global-calc';
import { localeTag } from '@/lib/locales';

export default function TipIntl({ lang }: { lang: CalcLang }) {
  const c = TIP[lang].ui;
  const tag = localeTag(lang);
  const [bill, setBill] = useState('50');
  const [pct, setPct] = useState(20);
  const [customPct, setCustomPct] = useState('');
  const [people, setPeople] = useState('2');
  const [roundUp, setRoundUp] = useState(true);
  const [result, setResult] = useState<TipResult | null>(null);

  /* 통화 기호는 안 붙인다 — 나라마다 다르고, 어느 하나를 고르면 나머지가 틀린다 */
  const fmt = (n: number) => n.toLocaleString(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function calculate() {
    const p = customPct.trim() ? Number(customPct) : pct;
    setResult(calcTip(Number(bill) || 0, Number.isFinite(p) ? p : 0, Math.floor(Number(people) || 0), roundUp));
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>{c.bill}</Label>
              <input type="number" value={bill} onChange={e => setBill(e.target.value)} min="0" step="0.01" className={inputCls} />
            </div>
            <div>
              <Label>{c.people}</Label>
              <input type="number" value={people} onChange={e => setPeople(e.target.value)} min="1" className={inputCls} />
            </div>
          </div>

          <div>
            <Label>{c.pct}</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {TIP_PRESETS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setPct(p); setCustomPct(''); }}
                  className={`rounded-lg border px-3.5 py-2 text-sm font-bold transition-colors ${
                    !customPct.trim() && pct === p
                      ? 'bg-sec border-transparent'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {p}%
                </button>
              ))}
              <input
                type="number" value={customPct} onChange={e => setCustomPct(e.target.value)}
                min="0" placeholder={c.custom}
                className={`${inputCls} w-28`}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={roundUp} onChange={e => setRoundUp(e.target.checked)} className="h-4 w-4" />
            {c.roundUp}
          </label>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.each}</p>
            <p className="stat-value">{fmt(result.roundedPerPerson)}</p>
          </div>

          <SummaryGrid>
            <SummaryCard label={c.tip} value={fmt(result.tip)} variant="primary" />
            <SummaryCard label={c.total} value={fmt(result.total)} />
            <SummaryCard label={c.tipEach} value={fmt(result.tipPerPerson)} />
            <SummaryCard label={c.rounded} value={fmt(result.perPerson)} />
          </SummaryGrid>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{c.note}</p>
        </>
      )}
    </div>
  );
}
