'use client';
import { useMemo, useState } from 'react';
import { addDays, dayOfYear, formatKo, isLeapYear, isoWeek, quarter, toISODate } from '@/lib/date-calc';
import { CARD, DateField, Stat, useMounted } from './ui';
import { WEEKNUMBER_UI, type TimeLang } from '@/lib/time-ui-intl';

export default function WeekNumberTool({ lang = 'ko' }: { lang?: TimeLang } = {}) {
  const ui = WEEKNUMBER_UI[lang];
  const mounted = useMounted();
  const [value, setValue] = useState('');
  const today = mounted ? toISODate(new Date()) : '';
  const picked = value || today;

  const info = useMemo(() => {
    if (!picked) return null;
    const d = new Date(`${picked}T00:00:00`);
    if (Number.isNaN(d.getTime())) return null;

    const { year, week } = isoWeek(d);
    // 그 주의 월요일 — ISO 주는 월요일에 시작한다
    const monday = addDays(d, -(((d.getDay() + 6) % 7)));
    const doy = dayOfYear(d);
    const total = isLeapYear(d.getFullYear()) ? 366 : 365;

    return {
      date: d, year, week, quarter: quarter(d), doy, total,
      monday, sunday: addDays(monday, 6),
      progress: Math.round((doy / total) * 100),
      left: total - doy,
    };
  }, [picked]);

  return (
    <div>
      <DateField value={picked} onChange={setValue} label={ui.date} />

      {info && (
        <>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-slate-600 to-indigo-700 text-white px-6 py-8 text-center">
            <p className="text-sm text-white/70 mb-1">{formatKo(info.date)}</p>
            <p className="text-5xl font-black tabular-nums">{ui.weekBig(info.week)}</p>
            <p className="text-sm text-white/70 mt-2">{ui.yearQuarter(info.year, info.quarter)}</p>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-3">
            <Stat label={ui.week} value={info.week} accent="text-indigo-600" />
            <Stat label={ui.quarter} value={`${info.quarter}Q`} />
            <Stat label={ui.dayOfYear} value={ui.doyValue(info.doy)} />
            <Stat label={ui.daysLeft} value={ui.daysValue(info.left)} accent="text-slate-500" />
          </div>

          <div className="mt-4">
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.progress}</span>
              <span className="text-sm font-black text-indigo-600 tabular-nums">{info.progress}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-slate-600 to-indigo-700" style={{ width: `${info.progress}%` }} />
            </div>
          </div>

          <div className={`${CARD} mt-4`}>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.rangeTitle}</p>
            <p className="text-sm text-slate-700 dark:text-slate-200 font-bold">
              {formatKo(info.monday)} ~ {formatKo(info.sunday)}
            </p>
          </div>
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.isoNote}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.isoBody}
        </p>
      </div>
    </div>
  );
}
