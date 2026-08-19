'use client';
import { useMemo, useState } from 'react';
import { addDays, addMonths, daysBetween, formatKo, toISODate } from '@/lib/date-calc';
import { CARD, DateField, Stat, useMounted } from './ui';
import { DATEADD_UI, type TimeLang } from '@/lib/time-ui-intl';

const QUICK: { days?: number; months?: number }[] = [
  { days: 100 }, { months: 12 }, { days: 14 }, { days: -30 },
];

export default function DateAddTool({ lang = 'ko' }: { lang?: TimeLang } = {}) {
  const ui = DATEADD_UI[lang];
  const quick = QUICK.map((q, i) => ({ ...q, label: ui.presets[i] }));
  const mounted = useMounted();
  const [base, setBase] = useState('');
  const [days, setDays] = useState(0);
  const [weeks, setWeeks] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);

  const today = mounted ? toISODate(new Date()) : '';
  const start = base || today;

  const result = useMemo(() => {
    if (!start) return null;
    const d = new Date(`${start}T00:00:00`);
    if (Number.isNaN(d.getTime())) return null;
    let out = addMonths(d, months + years * 12);
    out = addDays(out, days + weeks * 7);
    return { date: out, gap: daysBetween(d, out) };
  }, [start, days, weeks, months, years]);

  const reset = () => { setDays(0); setWeeks(0); setMonths(0); setYears(0); };

  const field = (label: string, value: number, set: (n: number) => void) => (
    <label className="block">
      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">{label}</span>
      <input
        type="number" value={value}
        onChange={e => set(Number(e.target.value) || 0)}
        className="w-full rounded-xl border chip-off px-3 py-2.5 text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums text-center focus:outline-none focus:border-violet-400"
      />
    </label>
  );

  return (
    <div>
      <DateField value={start} onChange={setBase} label={ui.baseDate} />

      <div className="grid grid-cols-4 gap-2 mt-4">
        {field(ui.day, days, setDays)}
        {field(ui.week, weeks, setWeeks)}
        {field(ui.month, months, setMonths)}
        {field(ui.year, years, setYears)}
      </div>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">{ui.negativeNote}</p>

      {result && (
        <>
          <div className="mt-4 rounded-lg bg-sec px-6 py-8 text-center">
            <p className="text-sm text-white/70 mb-1">{ui.result}</p>
            <p className="text-3xl font-black">{formatKo(result.date)}</p>
            <p className="text-sm text-white/70 mt-2">
              {result.gap >= 0 ? ui.gapAfter(result.gap) : ui.gapBefore(-result.gap)}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <Stat label={ui.diffDays} value={Math.abs(result.gap)} accent="text-violet-600" />
            <Stat label={ui.diffWeeks} value={ui.weekUnit(Math.floor(Math.abs(result.gap) / 7))} />
            <Stat label={ui.weekday} value={result.date.toLocaleDateString(ui.locale, { weekday: 'short' })} />
          </div>
        </>
      )}

      <div className="grid grid-cols-4 gap-2 mt-4">
        {quick.map(q => (
          <button
            key={q.label}
            onClick={() => { reset(); if (q.days) setDays(q.days); if (q.months) setMonths(q.months); }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            {q.label}
          </button>
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.monthEndTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.monthEndBody}
        </p>
      </div>
    </div>
  );
}
