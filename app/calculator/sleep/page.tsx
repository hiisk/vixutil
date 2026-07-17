'use client';
import { useState } from 'react';
import CalcShell, { Card, Label, inputCls, TabBar } from '@/components/CalcShell';

const CYCLE_MIN = 90;

function addMinutes(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  const totalMin = h * 60 + m + minutes;
  const newH = Math.floor(totalMin / 60) % 24;
  const newM = totalMin % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

function subMinutes(timeStr: string, minutes: number): string {
  const [h, m] = timeStr.split(':').map(Number);
  let totalMin = h * 60 + m - minutes;
  if (totalMin < 0) totalMin += 24 * 60;
  const newH = Math.floor(totalMin / 60) % 24;
  const newM = totalMin % 60;
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
}

export default function SleepPage() {
  const [mode, setMode] = useState<'wakeup' | 'bedtime'>('wakeup');
  const [time, setTime] = useState('07:00');
  const [fallAsleep, setFallAsleep] = useState('15');

  const times = (() => {
    const fa = Number(fallAsleep);
    return [4, 5, 6].map(cycles => {
      const totalMin = cycles * CYCLE_MIN;
      const sleepTime = mode === 'wakeup'
        ? subMinutes(time, totalMin + fa)
        : addMinutes(time, fa + (cycles - 1) * CYCLE_MIN);
      const wakeTime = mode === 'wakeup' ? time : addMinutes(sleepTime, totalMin + fa);
      return {
        cycles,
        hours: (totalMin / 60).toFixed(1),
        bedtime: mode === 'wakeup' ? sleepTime : time,
        wakeup: mode === 'wakeup' ? time : wakeTime,
      };
    });
  })();

  return (
    <CalcShell path="/calculator/sleep" title="수면 계산기" description="90분 수면 사이클 기준 최적 취침·기상 시간">
      <div className="flex flex-col gap-4">
        <TabBar
          options={[
            { value: 'wakeup', label: '기상시간 → 취침시간' },
            { value: 'bedtime', label: '취침시간 → 기상시간' },
          ]}
          value={mode}
          onChange={v => setMode(v as 'wakeup' | 'bedtime')}
        />
        <Card className="p-5">
          <div className="flex flex-col gap-3">
            <div>
              <Label>{mode === 'wakeup' ? '기상 시간' : '취침 시간'}</Label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)} className={inputCls} />
            </div>
            <div>
              <Label>잠드는 데 걸리는 시간</Label>
              <select value={fallAsleep} onChange={e => setFallAsleep(e.target.value)} className={inputCls}>
                <option value="10">10분</option>
                <option value="15">15분</option>
                <option value="20">20분</option>
                <option value="30">30분</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-2">
          {times.map(t => (
            <div key={t.cycles} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100">
                  {mode === 'wakeup' ? `${t.bedtime}에 취침` : `${t.wakeup}에 기상`}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{t.cycles}사이클 · {t.hours}시간</p>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${t.cycles === 5 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                {t.cycles === 5 ? '권장' : `${t.cycles}사이클`}
              </div>
            </div>
          ))}
        </div>
        <Card className="p-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">수면 사이클 90분 기준 · 사람마다 차이가 있을 수 있습니다</p>
        </Card>
      </div>
    </CalcShell>
  );
}
