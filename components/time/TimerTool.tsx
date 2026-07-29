'use client';
import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '@/lib/date-calc';
import { CARD, useBeep, useNow } from './ui';

const PRESETS = [1, 3, 5, 10, 15, 30];

export default function TimerTool() {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [paused, setPaused] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const beep = useBeep();
  const firedRef = useRef(false);

  const now = useNow(endAt !== null && paused === null, 100);
  const total = minutes * 60000 + seconds * 1000;
  const left = paused !== null ? paused : endAt !== null ? Math.max(0, endAt - now) : total;

  useEffect(() => {
    if (endAt === null || paused !== null || left > 0 || firedRef.current) return;
    firedRef.current = true;
    setDone(true);
    setEndAt(null);
    beep(4);
  }, [left, endAt, paused, beep]);

  // 다른 탭을 보고 있어도 남은 시간이 보이게 제목에 싣는다
  useEffect(() => {
    if (endAt === null && !done) {
      document.title = '타이머 | vixutil';
      return;
    }
    document.title = done ? '⏰ 시간 종료! | vixutil' : `${formatDuration(left)} | 타이머`;
    return () => { document.title = '타이머 | vixutil'; };
  }, [left, endAt, done]);

  const start = () => {
    if (total <= 0) return;
    firedRef.current = false;
    setDone(false);
    setEndAt(Date.now() + (paused ?? total));
    setPaused(null);
  };
  const pause = () => { setPaused(left); setEndAt(null); };
  const reset = () => { setEndAt(null); setPaused(null); setDone(false); firedRef.current = false; };

  const running = endAt !== null;
  const progress = total > 0 ? (left / total) * 100 : 0;

  return (
    <div>
      <div className={`rounded-2xl px-6 py-12 text-center transition-colors ${done ? 'bg-rose-500' : 'bg-slate-900'}`}>
        <p className="text-6xl sm:text-7xl font-black text-white tabular-nums tracking-tight">
          {formatDuration(left)}
        </p>
        <p className="text-sm text-white/60 mt-3">
          {done ? '시간이 다 됐습니다' : running ? '진행 중' : paused !== null ? '일시정지' : '시작을 누르세요'}
        </p>
      </div>

      <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className={`h-full transition-[width] duration-100 ${done ? 'bg-rose-500' : 'bg-gradient-to-r from-rose-500 to-orange-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {!running && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <label>
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">분</span>
            <input
              type="number" min={0} max={180} value={minutes}
              onChange={e => { setMinutes(Math.max(0, Number(e.target.value))); reset(); }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-3 text-lg font-black text-slate-800 dark:text-slate-100 tabular-nums focus:outline-none focus:border-rose-400"
            />
          </label>
          <label>
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">초</span>
            <input
              type="number" min={0} max={59} value={seconds}
              onChange={e => { setSeconds(Math.min(59, Math.max(0, Number(e.target.value)))); reset(); }}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-3 text-lg font-black text-slate-800 dark:text-slate-100 tabular-nums focus:outline-none focus:border-rose-400"
            />
          </label>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={running ? pause : start}
          className="rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          {running ? '⏸ 일시정지' : paused !== null ? '▶ 이어서' : '▶ 시작'}
        </button>
        <button
          onClick={reset}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-rose-300 transition-colors"
        >
          처음으로
        </button>
      </div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">빠른 설정</p>
      <div className="grid grid-cols-6 gap-2">
        {PRESETS.map(m => (
          <button
            key={m}
            onClick={() => { setMinutes(m); setSeconds(0); reset(); }}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              minutes === m && seconds === 0
                ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {m}분
          </button>
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          남은 시간은 끝나는 시각을 기준으로 다시 계산합니다. 다른 탭을 보다가 돌아와도 시간이 밀리지
          않고, 브라우저 탭 제목에도 남은 시간이 표시돼 창을 바꿔도 확인할 수 있습니다. 다만 탭을 완전히
          닫으면 알림음은 울리지 않습니다.
        </p>
      </div>
    </div>
  );
}
