'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { DDAY } from '@/lib/calc-l10n/dates';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

const DAY = 86_400_000;

function midnight(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// 월~금만 센다. 공휴일은 나라마다 다르므로 손대지 않는다.
function countWeekdays(from: Date, to: Date): number {
  const [a, b] = from <= to ? [from, to] : [to, from];
  let n = 0;
  for (const d = new Date(a); d < b; d.setDate(d.getDate() + 1)) {
    const w = d.getDay();
    if (w !== 0 && w !== 6) n++;
  }
  return n;
}

export default function DdayIntl({ lang }: { lang: CalcLang }) {
  const c = DDAY[lang].ui;
  const tag = localeTag(lang);
  const [target, setTarget] = useState('');
  const [label, setLabel] = useState('');
  const [result, setResult] = useState<{ diff: number; weekdays: number; label: string } | null>(null);

  const fmt = (n: number) => n.toLocaleString(tag);

  function calculate() {
    if (!target) return;
    const [y, m, d] = target.split('-').map(Number);
    if (!y || !m || !d) return;
    const t = new Date(y, m - 1, d);
    const today = midnight(new Date());
    setResult({
      diff: Math.round((t.getTime() - today.getTime()) / DAY),
      weekdays: countWeekdays(today, t),
      label: label.trim() || c.defaultLabel,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <Label>{c.target}</Label>
            <input type="date" value={target} onChange={e => setTarget(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.label}</Label>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{result.label}</p>
            {result.diff === 0 ? (
              <p className="stat-value">{c.today}</p>
            ) : (
              <p className="stat-value">
                {fmt(Math.abs(result.diff))} <span className="text-2xl">{result.diff > 0 ? c.until : c.since}</span>
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5">
            <SummaryCard label={c.totalDays} value={fmt(Math.abs(result.diff))} />
            <SummaryCard label={c.weeks} value={fmt(Math.floor(Math.abs(result.diff) / 7))} />
            <SummaryCard label={c.workdays} value={fmt(result.weekdays)} variant="green" />
          </div>
        </>
      )}
    </div>
  );
}
