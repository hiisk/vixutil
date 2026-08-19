'use client';
import { useState } from 'react';
import { Card, Label, inputCls, PrimaryBtn, SummaryCard } from '@/components/CalcShell';
import { OVULATION } from '@/lib/calc-l10n/dates2';
import type { CalcLang } from '@/lib/calc-l10n/types';
import { localeTag } from '@/lib/locales';

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

export default function OvulationIntl({ lang }: { lang: CalcLang }) {
  const c = OVULATION[lang].ui;
  const tag = localeTag(lang);
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycle, setCycle] = useState('28');
  const [periodDays, setPeriodDays] = useState('5');
  const [result, setResult] = useState<{
    ovulation: Date; fertileStart: Date; fertileEnd: Date; nextPeriod: Date; nextEnd: Date;
  } | null>(null);

  const fmt = (d: Date) => d.toLocaleDateString(tag, { month: 'long', day: 'numeric', weekday: 'short' });

  function calculate() {
    if (!lastPeriod) return;
    const [y, m, d] = lastPeriod.split('-').map(Number);
    const cyc = parseInt(cycle, 10);
    const pd = parseInt(periodDays, 10) || 0;
    if (!y || !m || !d || !(cyc >= 20) || cyc > 45) return;

    const last = new Date(y, m - 1, d);
    const nextPeriod = addDays(last, cyc);
    // 황체기 14일은 대체로 일정하다 — 그래서 다음 생리에서 거꾸로 뺀다.
    const ovulation = addDays(nextPeriod, -14);
    setResult({
      ovulation,
      fertileStart: addDays(ovulation, -5),
      fertileEnd: addDays(ovulation, 1),
      nextPeriod,
      nextEnd: addDays(nextPeriod, pd - 1),
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="flex flex-col gap-3">
          <div>
            <Label>{c.lastPeriod}</Label>
            <input type="date" value={lastPeriod} onChange={e => setLastPeriod(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <div>
              <Label>{c.cycle}</Label>
              <input type="number" value={cycle} onChange={e => setCycle(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>{c.periodDays}</Label>
              <input type="number" value={periodDays} onChange={e => setPeriodDays(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={calculate}>{c.calc}</PrimaryBtn></div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.ovulation}</p>
            <p className="stat-value">{fmt(result.ovulation)}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
            <SummaryCard
              label={c.fertile}
              value={`${fmt(result.fertileStart)} ${c.to} ${fmt(result.fertileEnd)}`}
              variant="green"
            />
            <SummaryCard
              label={c.nextPeriod}
              value={`${fmt(result.nextPeriod)} ${c.to} ${fmt(result.nextEnd)}`}
            />
          </div>
        </>
      )}
    </div>
  );
}
