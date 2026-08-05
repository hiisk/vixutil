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
    <CalcShell
      path="/calculator/sleep"
      title="수면 계산기"
      description="90분 수면 사이클 기준 최적 취침·기상 시간"
      intro={
        <>
          <h2>90분 사이클이란</h2>
          <p>
            잠은 얕은 잠과 깊은 잠, 렘수면을 오가며 한 바퀴를 도는데 그 주기가 대략 90분으로 이야기됩니다.
            사이클이 끝나갈 무렵 얕은 잠일 때 깨면 개운하고, <strong>깊은 잠 한가운데서 알람이
            울리면</strong> 충분히 잤어도 몸이 무겁습니다. 그래서 총 수면 시간을 90분 단위로 맞추면
            덜 피곤할 수 있다는 것이 이 계산기의 발상입니다.
          </p>
          <h2>90분은 평균일 뿐입니다</h2>
          <p>
            실제 주기는 사람마다 <strong>70~120분</strong> 정도로 차이가 있고, 같은 사람도 그날 상태에
            따라 달라집니다. 잠드는 데 걸리는 시간도 매일 다릅니다. 그러니 여기서 나온 시각을 정확한
            정답으로 볼 게 아니라 <strong>목표 취침 시각의 후보</strong>로 쓰는 편이 맞습니다.
          </p>
          <h2>사이클보다 총량이 먼저입니다</h2>
          <p>
            사이클을 맞춘다고 <strong>4시간 반이 7시간 반보다 낫지는 않습니다</strong>. 성인은 보통
            7~9시간이 권장되고, 부족한 잠을 사이클 타이밍으로 메울 수는 없습니다. 시간을 확보한 다음에
            타이밍을 다듬는 순서가 맞습니다.
          </p>
          <h2>잠이 계속 문제라면</h2>
          <p>
            매일 같은 시각에 자고 일어나는 것이 어떤 계산보다 효과가 큽니다. 잠들기 어렵거나 자주 깨는
            일이 몇 주 이상 이어진다면, 코골이·수면무호흡 같은 원인이 있을 수 있으니 진료를 받아보세요.
            이 계산기는 참고용이며 의학적 조언이 아닙니다.
          </p>
        </>
      }
    >
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
