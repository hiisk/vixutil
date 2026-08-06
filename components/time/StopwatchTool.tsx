'use client';
import { useState } from 'react';
import { formatDuration } from '@/lib/date-calc';
import { CARD, Stat, useNow } from './ui';
import { STOPWATCH_UI, type TimeLang } from '@/lib/time-ui-intl';

export default function StopwatchTool({ lang = 'ko' }: { lang?: TimeLang } = {}) {
  const ui = STOPWATCH_UI[lang];
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [held, setHeld] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

  const now = useNow(startedAt !== null, 31);
  const elapsed = startedAt !== null ? held + (now - startedAt) : held;

  const start = () => setStartedAt(Date.now());
  const stop = () => { setHeld(elapsed); setStartedAt(null); };
  const reset = () => { setStartedAt(null); setHeld(0); setLaps([]); };
  const lap = () => setLaps(prev => [...prev, elapsed]);

  // 구간 시간 = 이번 랩 - 지난 랩
  const segments = laps.map((t, i) => t - (laps[i - 1] ?? 0));
  const fastest = segments.length > 1 ? Math.min(...segments) : null;
  const slowest = segments.length > 1 ? Math.max(...segments) : null;

  return (
    <div>
      <div className="rounded-2xl bg-slate-900 px-6 py-12 text-center">
        <p className="text-5xl sm:text-6xl font-black text-white tabular-nums tracking-tight">
          {formatDuration(elapsed, true)}
        </p>
        <p className="text-sm text-white/60 mt-3">
          {startedAt !== null ? ui.measuring : held > 0 ? ui.stopped : ui.idle}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <button
          onClick={startedAt !== null ? stop : start}
          className={`rounded-xl font-bold py-3.5 text-sm shadow-lg text-white transition-opacity hover:opacity-90 ${
            startedAt !== null ? 'bg-slate-700' : 'bg-gradient-to-r from-sky-500 to-indigo-600'
          }`}
        >
          {startedAt !== null ? ui.stop : held > 0 ? ui.resume : ui.start}
        </button>
        <button
          onClick={lap}
          disabled={startedAt === null}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-sky-300 disabled:opacity-40 transition-colors"
        >
          {ui.lap}
        </button>
        <button
          onClick={reset}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold py-3.5 text-sm text-slate-600 dark:text-slate-300 hover:border-rose-300 transition-colors"
        >
          {ui.reset}
        </button>
      </div>

      {laps.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Stat label={ui.lapCount} value={laps.length} accent="text-sky-600" />
            <Stat label={ui.fastest} value={fastest ? formatDuration(fastest, true) : '—'} accent="text-emerald-600" />
            <Stat label={ui.slowest} value={slowest ? formatDuration(slowest, true) : '—'} accent="text-rose-500" />
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {[...laps].map((t, i) => {
              const seg = segments[i];
              const tone =
                fastest !== null && seg === fastest ? 'text-emerald-600'
                : slowest !== null && seg === slowest ? 'text-rose-500'
                : 'text-slate-700 dark:text-slate-200';
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-2.5 row-line bg-white dark:bg-slate-900"
                >
                  <span className="w-10 text-xs font-black text-slate-400 dark:text-slate-500">#{i + 1}</span>
                  <span className={`flex-1 text-sm font-mono font-bold tabular-nums ${tone}`}>
                    {formatDuration(seg, true)}
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 tabular-nums">
                    {ui.cumulative} {formatDuration(t, true)}
                  </span>
                </div>
              );
            }).reverse()}
          </div>
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
