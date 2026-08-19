'use client';
import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '@/lib/date-calc';
import { CARD, Stat, useBeep, useNow } from './ui';
import { POMODORO_UI, type TimeLang } from '@/lib/time-ui-intl';

/**
 * 뽀모도로 — 25분 집중 뒤 5분 휴식, 네 번마다 긴 휴식.
 *
 * 지금이 어느 단계인지를 숫자가 아니라 화면 색으로 알린다. 곁눈질로 봐도
 * 집중 시간인지 쉬는 시간인지 구분돼야 타이머를 계속 보지 않게 된다.
 */
const PHASES = {
  focus: { minutes: 25, bg: 'bg-red-500' },
  short: { minutes: 5, bg: 'bg-emerald-600' },
  long: { minutes: 15, bg: 'bg-sky-600' },
} as const;
type Phase = keyof typeof PHASES;

export default function PomodoroTool({ lang = 'ko' }: { lang?: TimeLang } = {}) {
  const ui = POMODORO_UI[lang];
  const phaseLabel = { focus: ui.focus, short: ui.shortBreak, long: ui.longBreak } as const;
  const phaseNext = { focus: ui.breakTime, short: ui.focusTime, long: ui.focusTime } as const;
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
      <div className={`rounded-lg px-6 py-12 text-center transition-colors ${PHASES[phase].bg}`}>
        <p className="text-sm font-bold text-white/80 mb-2">{phaseLabel[phase]}</p>
        <p className="text-6xl sm:text-7xl font-bold text-white tabular-nums tracking-tight">
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
          className="rounded-xl bg-sec font-bold py-3.5 text-sm shadow-sm hover:opacity-90 transition-opacity"
        >
          {running ? ui.pause : paused !== null ? ui.resume : ui.start}
        </button>
        <button
          onClick={skip}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-red-300 transition-colors"
        >
          {ui.skip}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label={ui.completed} value={completed} accent="text-red-600" />
        <Stat label={ui.focused} value={`${completed * 25}${ui.minUnit}`} accent="text-rose-600" />
        <Stat label={ui.next} value={phase === 'focus' ? ui.breakLabel : ui.focus} />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.whyTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.whyBody}
        </p>
      </div>
    </div>
  );
}
