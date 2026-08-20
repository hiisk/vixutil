'use client';
import { useState } from 'react';
import { Card, Label, inputCls, SummaryCard } from '@/components/CalcShell';
import { WORK_HOURS } from '@/lib/calc-l10n/work';
import type { CalcLang } from '@/lib/calc-l10n/types';

function minutesOf(hhmm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

export default function WorkHoursIntl({ lang }: { lang: CalcLang }) {
  const c = WORK_HOURS[lang].ui;
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('18:00');
  const [breakMin, setBreakMin] = useState('60');

  const fmt = (mins: number) => `${Math.floor(mins / 60)}${c.h} ${mins % 60}${c.m}`;

  const s = minutesOf(start);
  const e = minutesOf(end);

  const result = (() => {
    if (s === null || e === null) return null;
    // 퇴근이 출근보다 이르면 자정을 넘긴 것으로 본다
    const span = e >= s ? e - s : e + 24 * 60 - s;
    const br = Math.max(0, Number(breakMin) || 0);
    return { span, br, work: Math.max(0, span - br), overnight: e < s };
  })();

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-5">
        <p className="label-caps mb-3">{c.section}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <Label>{c.start}</Label>
            <input type="time" value={start} onChange={e2 => setStart(e2.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.end}</Label>
            <input type="time" value={end} onChange={e2 => setEnd(e2.target.value)} className={inputCls} />
          </div>
        </div>
        <div className="mt-3">
          <Label>{c.breakMin}</Label>
          <input type="number" value={breakMin} onChange={e2 => setBreakMin(e2.target.value)} min={0} className={inputCls} />
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{c.note}</p>
      </Card>

      {result && (
        <>
          <div className="stat-pri text-center">
            <p className="stat-label">{c.worked}</p>
            <p className="stat-value">{fmt(result.work)}</p>
            {result.overnight && <p className="stat-sub mt-3">{c.overnight}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-5">
            <SummaryCard label={c.atWork} value={fmt(result.span)} />
            <SummaryCard label={c.breakRow} value={`${result.br}${c.m}`} />
            <SummaryCard label={c.weekly} value={fmt(result.work * 5)} />
          </div>
        </>
      )}
    </div>
  );
}
