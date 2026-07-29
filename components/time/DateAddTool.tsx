'use client';
import { useMemo, useState } from 'react';
import { addDays, addMonths, daysBetween, formatKo, toISODate } from '@/lib/date-calc';
import { CARD, DateField, Stat, useMounted } from './ui';

const QUICK = [
  { label: '100일 뒤', days: 100 },
  { label: '1년 뒤', months: 12 },
  { label: '2주 뒤', days: 14 },
  { label: '30일 전', days: -30 },
];

export default function DateAddTool() {
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
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm font-black text-slate-800 dark:text-slate-100 tabular-nums text-center focus:outline-none focus:border-violet-400"
      />
    </label>
  );

  return (
    <div>
      <DateField value={start} onChange={setBase} label="기준 날짜" />

      <div className="grid grid-cols-4 gap-2 mt-4">
        {field('일', days, setDays)}
        {field('주', weeks, setWeeks)}
        {field('개월', months, setMonths)}
        {field('년', years, setYears)}
      </div>
      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">음수를 넣으면 과거로 계산합니다</p>

      {result && (
        <>
          <div className="mt-4 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white px-6 py-8 text-center">
            <p className="text-sm text-white/70 mb-1">결과</p>
            <p className="text-3xl font-black">{formatKo(result.date)}</p>
            <p className="text-sm text-white/70 mt-2">
              기준일에서 {result.gap >= 0 ? `${result.gap}일 뒤` : `${-result.gap}일 전`}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <Stat label="차이(일)" value={Math.abs(result.gap)} accent="text-violet-600" />
            <Stat label="차이(주)" value={`${Math.floor(Math.abs(result.gap) / 7)}주`} />
            <Stat label="요일" value={formatKo(result.date).slice(-3)} />
          </div>
        </>
      )}

      <div className="grid grid-cols-4 gap-2 mt-4">
        {QUICK.map(q => (
          <button
            key={q.label}
            onClick={() => { reset(); if (q.days) setDays(q.days); if (q.months) setMonths(q.months); }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-violet-300 transition-colors"
          >
            {q.label}
          </button>
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">월말은 이렇게 처리합니다</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          1월 31일에 1개월을 더하면 2월 31일이 없으므로 <b className="text-slate-800 dark:text-slate-100">2월 28일(윤년이면 29일)</b>로
          맞춥니다. 그냥 두면 3월 3일로 넘어가 버려 &lsquo;한 달 뒤&rsquo;라는 말과 어긋납니다. 계약 만료일을 셀 때
          이 차이가 문제가 되는 일이 많습니다.
        </p>
      </div>
    </div>
  );
}
