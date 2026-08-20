'use client';
import { useState } from 'react';
import { Card, Label, inputCls } from '@/components/CalcShell';
import { DEV_CRON } from '@/lib/calc-l10n/dev-cron';
import type { CalcLang } from '@/lib/calc-l10n/types';
import CopyButton from '@/components/calc/CopyButton';

/** 표현식 자체는 어디서나 같다 — 설명하는 말만 언어별이다. */
const PRESETS: { expr: string; key: string }[] = [
  { expr: '* * * * *', key: 'pEveryMin' },
  { expr: '*/5 * * * *', key: 'pEvery5' },
  { expr: '0 * * * *', key: 'pHourly' },
  { expr: '0 0 * * *', key: 'pDaily' },
  { expr: '0 9 * * *', key: 'pDaily9' },
  { expr: '0 0 * * 1', key: 'pWeekly' },
  { expr: '0 0 1 * *', key: 'pMonthly' },
  { expr: '0 9-18 * * 1-5', key: 'pWorkHours' },
];

const FIELDS = [
  { key: 'minute', range: '0–59' },
  { key: 'hour', range: '0–23' },
  { key: 'dayOfMonth', range: '1–31' },
  { key: 'month', range: '1–12' },
  { key: 'dayOfWeek', range: '0–7' },
];

export default function DevCronIntl({ lang }: { lang: CalcLang }) {
  const c = DEV_CRON[lang].ui;
  const [expr, setExpr] = useState('0 9 * * *');

  const parts = expr.trim().split(/\s+/);
  const valid = parts.length === 5;
  const preset = PRESETS.find(p => p.expr === expr.trim());

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <div className="flex items-center justify-between mb-2">
          <Label>{c.expression}</Label>
          <CopyButton text={expr} copy={c.copy} copied={c.copied} />
        </div>
        <input type="text" value={expr} onChange={e => setExpr(e.target.value)} className={`${inputCls} font-mono text-center text-lg`} />
        {!valid && <p className="mt-3 text-xs font-semibold text-rose-600">{c.invalidCron}</p>}
      </Card>

      {valid && (
        <Card className="p-5">
          <p className="label-caps mb-3">{c.fields}</p>
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {FIELDS.map((f, i) => (
              <div key={f.key} className="flex justify-between items-center gap-3 py-2.5 text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  {c[f.key]} <span className="text-xs text-slate-500 dark:text-slate-400">{f.range}</span>
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{parts[i]}</span>
              </div>
            ))}
          </div>
          {preset && (
            <p className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-sm font-bold text-blue-600">
              {c.explain}: {c[preset.key]}
            </p>
          )}
        </Card>
      )}

      <Card className="p-5">
        <p className="label-caps mb-3">{c.presets}</p>
        <div className="flex flex-col gap-1.5">
          {PRESETS.map(p => (
            <button
              key={p.expr}
              onClick={() => setExpr(p.expr)}
              className="flex justify-between items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="text-sm text-slate-600 dark:text-slate-300">{c[p.key]}</span>
              <span className="font-mono row-label">{p.expr}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
