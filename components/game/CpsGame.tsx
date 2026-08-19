'use client';
import { useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, higher } from './ui';
import { CPS_UI, GAME_COMMON, type GameLang } from '@/lib/game-ui-intl';

/**
 * 클릭 속도 — 정해진 시간 동안의 클릭 수를 초로 나눈다.
 *
 * 시간은 첫 클릭에서 시작한다. 시작 버튼을 따로 두면 그 버튼을 누른 뒤
 * 손을 옮기는 시간이 기록에 섞여 초반 CPS가 낮게 나온다.
 */
const DURATIONS = [5, 10, 30];

export default function CpsGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = CPS_UI[lang];
  const c = GAME_COMMON[lang];
  const [duration, setDuration] = useState(10);
  const [clicks, setClicks] = useState(0);
  const [left, setLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const endAt = useRef(0);
  const { best, submit } = useBest(`cps-${duration}`, higher);

  useEffect(() => {
    if (!running) return;
    let id = 0;
    const loop = () => {
      const remain = endAt.current - performance.now();
      if (remain <= 0) {
        setLeft(0);
        setRunning(false);
        setDone(true);
        return;
      }
      setLeft(remain / 1000);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [running]);

  const click = () => {
    if (done) return;
    if (!running) {
      setClicks(1);
      endAt.current = performance.now() + duration * 1000;
      setRunning(true);
      return;
    }
    setClicks(c => c + 1);
  };

  const cps = done || running ? clicks / duration : 0;

  useEffect(() => {
    if (done) submit(Number((clicks / duration).toFixed(2)));
  }, [done, clicks, duration, submit]);

  const reset = () => {
    setClicks(0);
    setLeft(0);
    setRunning(false);
    setDone(false);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {DURATIONS.map(d => (
          <button
            key={d}
            onClick={() => { reset(); setDuration(d); }}
            disabled={running}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors disabled:opacity-40 ${
              duration === d
                ? 'border-sky-300 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui.secSuffix(d)}
          </button>
        ))}
      </div>

      <button
        onClick={click}
        disabled={done}
        className={`w-full h-64 sm:h-72 rounded-lg text-white flex flex-col items-center justify-center select-none touch-none transition-colors ${
          done ? 'bg-slate-700' : running ? 'bg-sec active:scale-[0.99]' : 'bg-slate-800'
        }`}
      >
        {done ? (
          <>
            <span className="text-5xl font-bold tabular-nums">{cps.toFixed(1)}</span>
            <span className="text-sm text-white/70 mt-1">CPS · {ui.clicksSuffix(clicks)}</span>
          </>
        ) : running ? (
          <>
            <span className="text-6xl font-bold tabular-nums">{clicks}</span>
            <span className="text-sm text-white/70 mt-1">{c.secLeft(left.toFixed(1))}</span>
          </>
        ) : (
          <>
            <span className="text-2xl font-bold">{ui.tapHere}</span>
            <span className="text-sm text-white/70 mt-1">{ui.startsOnFirst(duration)}</span>
          </>
        )}
      </button>

      <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-sec transition-[width] duration-75"
          style={{ width: running ? `${(left / duration) * 100}%` : done ? '0%' : '100%' }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label={ui.clicks} value={clicks} accent="text-sky-600" />
        <Stat label={ui.cps} value={cps ? cps.toFixed(1) : '—'} accent="text-indigo-600" />
        <Stat label={ui.bestOf(duration)} value={best !== null ? best.toFixed(1) : '—'} />
      </div>

      {done && (
        <>
          <Grade
            text={
              cps >= 10 ? ui.gradeVeryFast(cps.toFixed(1)) :
              cps >= 7 ? ui.gradeFast(cps.toFixed(1)) :
              cps >= 5 ? ui.gradeNormal(cps.toFixed(1)) :
              ui.gradeSlow(cps.toFixed(1))
            }
            tone={cps >= 7 ? 'good' : cps >= 5 ? 'normal' : 'bad'}
          />
          <button
            onClick={reset}
            className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            {c.again}
          </button>
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
