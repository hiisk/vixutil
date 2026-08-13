'use client';
import { useMemo, useState } from 'react';
import { addWorkdays, daysBetween, formatKo, toISODate, workdaysBetween } from '@/lib/date-calc';
import { CARD, DateField, Stat, useMounted } from './ui';
import { WORKDAYS_UI, type TimeLang } from '@/lib/time-ui-intl';

export default function WorkdaysTool({ lang = 'ko' }: { lang?: TimeLang } = {}) {
  const ui = WORKDAYS_UI[lang];
  const mounted = useMounted();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [holidays, setHolidays] = useState('');
  const [addDays, setAddDays] = useState(10);

  // 오늘 날짜는 서버에 없다 — 마운트 후에 채운다
  const today = mounted ? toISODate(new Date()) : '';
  const start = from || today;
  const end = to || today;

  const holidayList = useMemo(
    () => holidays.split(/[\s,]+/).map(s => s.trim()).filter(s => /^\d{4}-\d{2}-\d{2}$/.test(s)),
    [holidays],
  );

  const result = useMemo(() => {
    if (!start || !end) return null;
    const a = new Date(`${start}T00:00:00`);
    const b = new Date(`${end}T00:00:00`);
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
    const total = Math.abs(daysBetween(a, b)) + 1;
    const work = workdaysBetween(a, b, holidayList);
    return { total, work, weekend: total - work, after: addWorkdays(a, addDays, holidayList) };
  }, [start, end, holidayList, addDays]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3">
        <DateField value={start} onChange={setFrom} label={ui.startDate} />
        <DateField value={end} onChange={setTo} label={ui.endDate} />
      </div>

      {result && (
        <>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Stat label={ui.totalDays} value={ui.dayUnit(result.total)} />
            <Stat label={ui.workdays} value={ui.dayUnit(result.work)} accent="text-emerald-600" />
            <Stat label={ui.weekendHoliday} value={ui.dayUnit(result.weekend)} accent="text-rose-500" />
          </div>
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">
            {ui.inclusive}
          </p>
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.addHolidays}</p>
        <textarea
          value={holidays}
          onChange={e => setHolidays(e.target.value)}
          rows={2}
          placeholder={ui.holidayPlaceholder}
          className="w-full rounded-xl border chip-off px-3.5 py-2.5 text-sm font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
        />
        <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
          {holidayList.length > 0
            ? ui.holidaysApplied(holidayList.length)
            : ui.holidayNote}
        </p>
      </div>

      {result && (
        <div className={`${CARD} mt-4`}>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.nAfterTitle}</p>
          <div className="flex items-center gap-3">
            <input
              type="number" min={1} max={365} value={addDays}
              onChange={e => setAddDays(Math.max(1, Number(e.target.value)))}
              className="w-24 rounded-xl border chip-off px-3 py-2.5 text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums focus:outline-none focus:border-emerald-400"
            />
            <span className="text-sm text-slate-500 dark:text-slate-400">{ui.nAfterResult}</span>
          </div>
          <p className="mt-3 text-lg font-black text-emerald-600">{formatKo(result.after)}</p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            {ui.nAfterNote}
          </p>
        </div>
      )}
    </div>
  );
}
