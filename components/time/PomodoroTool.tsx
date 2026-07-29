'use client';
import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '@/lib/date-calc';
import { CARD, Stat, useBeep, useNow } from './ui';

/**
 * 뽀모도로 — 25분 집중 뒤 5분 휴식, 네 번마다 긴 휴식.
 *
 * 지금이 어느 단계인지를 숫자가 아니라 화면 색으로 알린다. 곁눈질로 봐도
 * 집중 시간인지 쉬는 시간인지 구분돼야 타이머를 계속 보지 않게 된다.
 */
const PHASES = {
  focus: { label: '집중', minutes: 25, bg: 'bg-red-500', next: '쉬는 시간입니다' },
  short: { label: '짧은 휴식', minutes: 5, bg: 'bg-emerald-600', next: '다시 집중할 시간입니다' },
  long: { label: '긴 휴식', minutes: 15, bg: 'bg-sky-600', next: '다시 집중할 시간입니다' },
} as const;
type Phase = keyof typeof PHASES;

export default function PomodoroTool() {
  const [phase, setPhase] = useState<Phase>('focus');
  const [endAt, setEndAt] = useState<number | null>(null);
  const [paused, setPaused] = useState<number | null>(null);
  const [completed, setCompleted] = useState(0);
  const beep = useBeep();
  const firedRef = useRef(false);

  const now = useNow(endAt !== null, 200);
  const total = PHASES[phase].minutes * 60000;
  const left = paused !== null ? paused : endAt !== null ? Math.max(0, endAt - now) : total;

  /* eslint-disable react-hooks/set-state-in-effect --
     타이머가 0에 닿는 순간은 렌더가 알 수 없다. 시간이 다 됐을 때만 한 번
     도는 전환이라 렌더가 연쇄로 돌지 않는다. */
  useEffect(() => {
    if (endAt === null || left > 0 || firedRef.current) return;
    firedRef.current = true;
    beep(3);
    setEndAt(null);
    setPaused(null);

    if (phase === 'focus') {
      const done = completed + 1;
      setCompleted(done);
      // 네 번 집중할 때마다 길게 쉰다
      setPhase(done % 4 === 0 ? 'long' : 'short');
    } else {
      setPhase('focus');
    }
  }, [left, endAt, phase, completed, beep]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const start = () => {
    firedRef.current = false;
    setEndAt(Date.now() + (paused ?? total));
    setPaused(null);
  };
  const pause = () => { setPaused(left); setEndAt(null); };
  const skip = () => {
    setEndAt(null);
    setPaused(null);
    firedRef.current = false;
    setPhase(p => (p === 'focus' ? 'short' : 'focus'));
  };

  const running = endAt !== null;
  const progress = ((total - left) / total) * 100;

  return (
    <div>
      <div className={`rounded-2xl px-6 py-12 text-center transition-colors ${PHASES[phase].bg}`}>
        <p className="text-sm font-bold text-white/80 mb-2">{PHASES[phase].label}</p>
        <p className="text-6xl sm:text-7xl font-black text-white tabular-nums tracking-tight">
          {formatDuration(left)}
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {[0, 1, 2, 3].map(i => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${completed % 4 > i || (completed > 0 && completed % 4 === 0) ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className="h-full bg-red-500 transition-[width] duration-200" style={{ width: `${progress}%` }} />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={running ? pause : start}
          className="rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          {running ? '⏸ 일시정지' : paused !== null ? '▶ 이어서' : '▶ 시작'}
        </button>
        <button
          onClick={skip}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-red-300 transition-colors"
        >
          이 단계 건너뛰기
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label="완료한 뽀모도로" value={completed} accent="text-red-600" />
        <Stat label="집중한 시간" value={`${completed * 25}분`} accent="text-rose-600" />
        <Stat label="다음" value={phase === 'focus' ? '휴식' : '집중'} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">왜 25분인가요</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          한 번에 집중을 유지할 수 있는 시간이 대체로 그 정도이고, 짧아서 시작하는 부담이 적기 때문입니다.
          중요한 건 시간보다 &lsquo;한 번에 하나만&rsquo;입니다. 25분 동안은 알림을 끄고 한 가지 일만 하세요.
          네 번 하면 15분쯤 길게 쉬어 주는 편이 다음 집중에 도움이 됩니다.
        </p>
      </div>
    </div>
  );
}
