'use client';
import { useMemo, useState } from 'react';
import { addWorkdays, daysBetween, formatKo, toISODate, workdaysBetween } from '@/lib/date-calc';
import { CARD, DateField, Stat, useMounted } from './ui';

export default function WorkdaysTool() {
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
        <DateField value={start} onChange={setFrom} label="시작일" />
        <DateField value={end} onChange={setTo} label="종료일" />
      </div>

      {result && (
        <>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Stat label="전체 일수" value={`${result.total}일`} />
            <Stat label="근무일" value={`${result.work}일`} accent="text-emerald-600" />
            <Stat label="주말·공휴일" value={`${result.weekend}일`} accent="text-rose-500" />
          </div>
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-2">
            시작일과 종료일을 모두 포함해 셉니다
          </p>
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">공휴일 빼기</p>
        <textarea
          value={holidays}
          onChange={e => setHolidays(e.target.value)}
          rows={2}
          placeholder="2026-01-01, 2026-03-01 처럼 날짜를 적으면 근무일에서 뺍니다"
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:border-emerald-400"
        />
        <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
          {holidayList.length > 0
            ? `${holidayList.length}개 날짜를 공휴일로 뺐습니다`
            : '한국 공휴일은 음력과 대체공휴일 때문에 해마다 달라, 직접 넣도록 했습니다'}
        </p>
      </div>

      {result && (
        <div className={`${CARD} mt-4`}>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">근무일 기준 n일 뒤</p>
          <div className="flex items-center gap-3">
            <input
              type="number" min={1} max={365} value={addDays}
              onChange={e => setAddDays(Math.max(1, Number(e.target.value)))}
              className="w-24 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums focus:outline-none focus:border-emerald-400"
            />
            <span className="text-sm text-slate-500 dark:text-slate-400">근무일 뒤는</span>
          </div>
          <p className="mt-3 text-lg font-black text-emerald-600">{formatKo(result.after)}</p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            주말과 위에 적은 공휴일을 건너뛴 날짜입니다. 서류 처리 기한을 셀 때 씁니다.
          </p>
        </div>
      )}
    </div>
  );
}
