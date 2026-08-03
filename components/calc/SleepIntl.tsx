'use client';
import { useState } from 'react';
import { Card, Label, inputCls, TabBar } from '@/components/CalcShell';
import { SLEEP } from '@/lib/calc-l10n/life';
import type { CalcLang } from '@/lib/calc-l10n/types';

const CYCLE = 90; // 분

type Mode = 'wake' | 'bed';

function shift(hhmm: string, minutes: number): string {
  const [h, m] = hhmm.split(':').map(Number);
  const total = (((h * 60 + m + minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export default function SleepIntl({ lang }: { lang: CalcLang }) {
  const c = SLEEP[lang].ui;
  const [mode, setMode] = useState<Mode>('wake');
  const [time, setTime] = useState('07:00');
  const [fallAsleep, setFallAsleep] = useState('15');

  const fa = Number(fallAsleep) || 0;
  const rows = [6, 5, 4, 3].map(cycles => {
    const sleepMinutes = cycles * CYCLE;
    const bedtime = mode === 'wake' ? shift(time, -(sleepMinutes + fa)) : time;
    const wake = mode === 'wake' ? time : shift(time, fa + sleepMinutes);
    return { cycles, bedtime, wake, hours: sleepMinutes / 60 };
  });

  return (
    <div className="flex flex-col gap-4">
      <TabBar
        options={[
          { value: 'wake' as Mode, label: c.tabWake },
          { value: 'bed' as Mode, label: c.tabBed },
        ]}
        value={mode}
        onChange={setMode}
      />

      <Card className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>{c.time}</Label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} className={inputCls} />
          </div>
          <div>
            <Label>{c.fallAsleep}</Label>
            <input type="number" value={fallAsleep} onChange={e => setFallAsleep(e.target.value)} className={inputCls} />
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{c.note}</p>
      </Card>

      <div className="flex flex-col gap-3">
        {rows.map(r => {
          const best = r.cycles >= 5;
          return (
            <div
              key={r.cycles}
              className={`rounded-2xl p-5 flex items-baseline justify-between gap-4 ${
                best ? 'bg-blue-600' : 'bg-white/85 dark:bg-slate-900/85 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <div>
                <p className={`text-xs mb-1 ${best ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>
                  {mode === 'wake' ? c.bedtime : c.wake}
                </p>
                <p className={`text-3xl font-black ${best ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
                  {mode === 'wake' ? r.bedtime : r.wake}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${best ? 'text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                  {r.cycles} {c.cycles}
                </p>
                <p className={`text-xs ${best ? 'text-blue-200' : 'text-slate-400 dark:text-slate-500'}`}>
                  {r.hours} {c.hours}
                </p>
                <p className={`text-xs mt-1 font-semibold ${best ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                  {best ? c.best : c.good}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
