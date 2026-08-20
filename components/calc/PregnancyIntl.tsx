'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { PREGNANCY } from '@/lib/calc-l10n/dates2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

const DAY = 86_400_000;

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

export default function PregnancyIntl({ lang }: { lang: CalcLang }) {
  const c = PREGNANCY[lang].ui;
  const tag = localeTag(lang);
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycle, setCycle] = useState('28');
  const [result, setResult] = useState<{
    due: Date; conception: Date; weeks: number; days: number; remaining: number; trimester: number;
  } | null>(null);

  const fmtDate = (d: Date) => d.toLocaleDateString(tag, { year: 'numeric', month: 'long', day: 'numeric' });
  const fmt = (n: number) => n.toLocaleString(tag);

  function calculate() {
    if (!lastPeriod) return;
    const [y, m, d] = lastPeriod.split('-').map(Number);
    const cyc = parseInt(cycle, 10);
    if (!y || !m || !d || !(cyc >= 20) || cyc > 45) return;

    const last = new Date(y, m - 1, d);
    // Naegele: 최종월경 + 280일. 28일이 아닌 주기는 배란이 밀리는 만큼 함께 민다.
    const due = addDays(last, 280 + (cyc - 28));
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const elapsed = Math.max(0, Math.round((today.getTime() - last.getTime()) / DAY));
    const weeks = Math.floor(elapsed / 7);

    setResult({
      due,
      conception: addDays(last, 14 + (cyc - 28)),
      weeks,
      days: elapsed % 7,
      remaining: Math.round((due.getTime() - today.getTime()) / DAY),
      trimester: weeks < 14 ? 1 : weeks < 28 ? 2 : 3,
    });
  }

  const trimesterLabel = result ? [c.t1, c.t2, c.t3][result.trimester - 1] : '';

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <Label>{c.lastPeriod}</Label>
            <input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.cycle}</Label>
            <input type="number" value={cycle} onChange={e => setCycle(e.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.dueDate}</p>
            <p className="stat-value">{fmtDate(result.due)}</p>
            <p className="stat-sub mt-2">
              {c.current} {result.weeks} {c.weeks} {result.days} {c.days}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5">
            <SummaryCard label={c.trimester} value={trimesterLabel} />
            <SummaryCard label={c.remaining} value={fmt(Math.max(0, result.remaining))} variant="green" />
            <SummaryCard label={c.conception} value={result.conception.toLocaleDateString(tag, { month: 'short', day: 'numeric' })} />
          </div>
        </>
      )}
    </div>
  );
}
