'use client';
import { useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, higher } from './ui';

/**
 * 클릭 속도 — 정해진 시간 동안의 클릭 수를 초로 나눈다.
 *
 * 시간은 첫 클릭에서 시작한다. 시작 버튼을 따로 두면 그 버튼을 누른 뒤
 * 손을 옮기는 시간이 기록에 섞여 초반 CPS가 낮게 나온다.
 */
const DURATIONS = [5, 10, 30];

export default function CpsGame() {
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
            {d}초
          </button>
        ))}
      </div>

      <button
        onClick={click}
        disabled={done}
        className={`w-full h-64 sm:h-72 rounded-2xl text-white flex flex-col items-center justify-center select-none touch-none transition-colors ${
          done ? 'bg-slate-700' : running ? 'bg-gradient-to-br from-sky-500 to-indigo-600 active:scale-[0.99]' : 'bg-slate-800'
        }`}
      >
        {done ? (
          <>
            <span className="text-5xl font-black tabular-nums">{cps.toFixed(1)}</span>
            <span className="text-sm text-white/70 mt-1">CPS · {clicks}번 클릭</span>
          </>
        ) : running ? (
          <>
            <span className="text-6xl font-black tabular-nums">{clicks}</span>
            <span className="text-sm text-white/70 mt-1">{left.toFixed(1)}초 남음</span>
          </>
        ) : (
          <>
            <span className="text-2xl font-black">여기를 계속 누르세요</span>
            <span className="text-sm text-white/70 mt-1">첫 클릭과 함께 {duration}초가 시작됩니다</span>
          </>
        )}
      </button>

      <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-[width] duration-75"
          style={{ width: running ? `${(left / duration) * 100}%` : done ? '0%' : '100%' }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label="클릭 수" value={clicks} accent="text-sky-600" />
        <Stat label="초당 클릭(CPS)" value={cps ? cps.toFixed(1) : '—'} accent="text-indigo-600" />
        <Stat label={`최고 기록 (${duration}초)`} value={best !== null ? best.toFixed(1) : '—'} />
      </div>

      {done && (
        <>
          <Grade
            text={
              cps >= 10 ? `${cps.toFixed(1)} CPS — 아주 빠릅니다` :
              cps >= 7 ? `${cps.toFixed(1)} CPS — 빠른 편입니다` :
              cps >= 5 ? `${cps.toFixed(1)} CPS — 보통입니다` :
              `${cps.toFixed(1)} CPS — 손가락 두 개를 번갈아 쓰면 더 나옵니다`
            }
            tone={cps >= 7 ? 'good' : cps >= 5 ? 'normal' : 'bad'}
          />
          <button
            onClick={reset}
            className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-sky-300 transition-colors"
          >
            다시 하기
          </button>
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          보통 한 손가락으로는 6~8 CPS 정도가 한계입니다. 두 손가락을 번갈아 쓰거나(버터플라이) 손목을 떠는
          방식으로 10 CPS를 넘기기도 하지만, 마우스와 손목에 무리가 가니 오래 하지 마세요.
        </p>
      </div>
    </div>
  );
}
