'use client';
import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '@/lib/date-calc';
import { CARD, useBeep, useMounted, useNow } from './ui';
import { ALARM_UI, type TimeLang } from '@/lib/time-ui-intl';

/**
 * 알람 — "몇 시 몇 분"에 울린다.
 *
 * 타이머와 다른 점은 기준이 절대 시각이라는 것이다. 지금보다 이른 시각을
 * 넣으면 오늘이 아니라 내일 그 시각으로 잡는다 — 아침 알람이 그 경우다.
 */
export default function AlarmTool({ lang = 'ko' }: { lang?: TimeLang } = {}) {
  const ui = ALARM_UI[lang];
  const [time, setTime] = useState('07:00');
  const [target, setTarget] = useState<number | null>(null);
  const [ringing, setRinging] = useState(false);
  const beep = useBeep();
  const firedRef = useRef(false);
  const mounted = useMounted();

  const now = useNow(true, 250);
  const left = target !== null ? Math.max(0, target - now) : 0;

  useEffect(() => {
    if (target === null || left > 0 || firedRef.current) return;
    firedRef.current = true;
    setRinging(true);
    beep(6);
  }, [left, target, beep]);

  const set = () => {
    const [h, m] = time.split(':').map(Number);
    const at = new Date();
    at.setHours(h, m, 0, 0);
    // 이미 지난 시각이면 내일로
    if (at.getTime() <= Date.now()) at.setDate(at.getDate() + 1);
    firedRef.current = false;
    setRinging(false);
    setTarget(at.getTime());
  };

  const cancel = () => { setTarget(null); setRinging(false); firedRef.current = false; };

  const targetDate = target !== null ? new Date(target) : null;
  const tomorrow = targetDate ? targetDate.getDate() !== new Date(now).getDate() : false;

  return (
    <div>
      <div className={`rounded-2xl px-6 py-12 text-center transition-colors ${ringing ? 'bg-amber-500' : 'bg-slate-900'}`}>
        {ringing ? (
          <>
            <p className="text-4xl font-black text-white mb-2">{ui.ringing}</p>
            <p className="text-sm text-white/80">{ui.itIsNow(time)}</p>
          </>
        ) : target !== null ? (
          <>
            <p className="text-sm text-white/60 mb-2">{ui.until(tomorrow ? ui.tomorrow : ui.today, time)}</p>
            <p className="text-5xl sm:text-6xl font-black text-white tabular-nums">{formatDuration(left)}</p>
            <p className="text-sm text-white/60 mt-3">{ui.remaining}</p>
          </>
        ) : (
          <>
            <p className="text-5xl font-black text-white tabular-nums">
              {mounted && now ? new Date(now).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
            </p>
            <p className="text-sm text-white/60 mt-3">{ui.currentTime}</p>
          </>
        )}
      </div>

      <label className="block mt-4">
        <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">{ui.alarmAt}</span>
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-3.5 text-2xl font-black text-slate-800 dark:text-slate-100 tabular-nums text-center focus:outline-none focus:border-amber-400"
        />
      </label>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <button
          onClick={set}
          className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          {target !== null ? ui.reset : ui.set}
        </button>
        <button
          onClick={cancel}
          disabled={target === null}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-rose-300 disabled:opacity-40 transition-colors"
        >
          {ui.stop}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {['07:00', '08:30', '12:00', '18:00'].map(t => (
          <button
            key={t}
            onClick={() => setTime(t)}
            className={`rounded-xl border py-2.5 text-sm font-bold tabular-nums transition-colors ${
              time === t
                ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
