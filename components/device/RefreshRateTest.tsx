'use client';
import { REFRESH_UI, type DeviceLang } from '@/lib/device-ui-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 주사율 측정 — requestAnimationFrame이 불리는 간격을 잰다.
 *
 * 브라우저는 화면이 새로 그려질 때마다 rAF를 부르므로, 그 간격의 역수가 곧
 * 화면 주사율이다. 평균 대신 중앙값을 쓴다 — 측정 중 다른 탭이 잠깐 CPU를
 * 물면 프레임 하나가 크게 튀는데, 평균은 그 하나에 통째로 끌려간다.
 *
 * 브라우저·전원 설정에 따라 실제 패널보다 낮게 잡힐 수 있다(노트북 절전 모드,
 * 배터리 사용 시 60Hz 고정 등). 그래서 결과에 흔한 규격값을 같이 보여준다.
 */
const COMMON = [30, 48, 60, 75, 90, 100, 120, 144, 165, 180, 240, 360];
const SAMPLES = 240;

type Result = { hz: number; median: number; min: number; max: number; jitter: number; dropped: number };

export default function RefreshRateTest({ lang = 'ko' }: { lang?: DeviceLang } = {}) {
  const ui = REFRESH_UI[lang];
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [live, setLive] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [motion, setMotion] = useState(true);
  const rafRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const run = useCallback(() => {
    setRunning(true);
    setResult(null);
    setProgress(0);

    const gaps: number[] = [];
    let prev = performance.now();

    const tick = (now: number) => {
      const gap = now - prev;
      prev = now;
      // 첫 프레임은 버튼 클릭 직후라 간격이 의미 없다
      if (gaps.length > 0 || gap < 100) gaps.push(gap);

      if (gaps.length % 10 === 0 && gaps.length > 0) {
        setProgress(Math.round((gaps.length / SAMPLES) * 100));
        setLive(Math.round(1000 / gap));
      }

      if (gaps.length < SAMPLES) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const sorted = [...gaps].sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      const hz = Math.round(1000 / median);
      // 중앙값의 1.5배를 넘는 프레임은 한 번 걸러진 것으로 본다
      const dropped = gaps.filter(g => g > median * 1.5).length;
      const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
      const jitter = Math.sqrt(gaps.reduce((a, b) => a + (b - mean) ** 2, 0) / gaps.length);

      setResult({
        hz,
        median: Number(median.toFixed(2)),
        min: Number(sorted[0].toFixed(2)),
        max: Number(sorted[sorted.length - 1].toFixed(2)),
        jitter: Number(jitter.toFixed(2)),
        dropped,
      });
      setProgress(100);
      setRunning(false);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const nearest = result ? COMMON.reduce((a, b) => (Math.abs(b - result.hz) < Math.abs(a - result.hz) ? b : a)) : null;
  const offSpec = result && nearest ? Math.abs(result.hz - nearest) > 3 : false;

  return (
    <div>
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-6 text-center">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">
          {running ? ui.measuring : result ? ui.resultLabel : ui.ready}
        </p>
        <p className="text-6xl font-black bg-sec bg-clip-text text-transparent tabular-nums">
          {result ? result.hz : running ? live || '–' : '–'}
          <span className="text-2xl ml-1.5 text-slate-400 dark:text-slate-500">Hz</span>
        </p>

        <div className="mt-5 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-sec transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={run}
          disabled={running}
          className="mt-5 rounded-xl bg-sec font-bold px-8 py-3 text-sm shadow-sm hover:opacity-90 disabled:opacity-60 transition-opacity"
        >
          {running ? ui.measuringBtn : result ? ui.again : ui.startBtn}
        </button>
        <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          {ui.stayHere}
        </p>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {[
              { label: ui.frameInterval, val: `${result.median}ms` },
              { label: ui.fastestFrame, val: `${result.min}ms` },
              { label: ui.slowestFrame, val: `${result.max}ms` },
              { label: ui.jitter, val: `${result.jitter}ms` },
            ].map(s => (
              <div key={s.label} className="rounded-xl border chip-off px-3 py-3 text-center">
                <p className="text-base font-black text-slate-800 dark:text-slate-100 tabular-nums">{s.val}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl border chip-off px-4 py-3.5 text-sm leading-relaxed">
            {offSpec ? (
              <p className="text-slate-600 dark:text-slate-300">
                {ui.oddNote(result.hz, nearest ?? 0)}
              </p>
            ) : (
              <p className="text-slate-600 dark:text-slate-300">
                {ui.normalNote(nearest ?? 0)}
                {nearest && nearest <= 60 && ui.sixtyHint}
              </p>
            )}
            {result.dropped > 0 && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {ui.droppedNote(result.dropped)}
              </p>
            )}
          </div>
        </>
      )}

      {/* 눈으로 비교하는 부분 — 숫자보다 이쪽이 체감에 가깝다 */}
      <div className="mt-4 rounded-lg border chip-off p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.motionTitle}</p>
          <button
            onClick={() => setMotion(m => !m)}
            className="text-xs font-bold text-amber-600 hover:underline"
          >
            {motion ? ui.stopMove : ui.move}
          </button>
        </div>
        <div className="relative h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="absolute top-1/2 w-10 h-10 rounded-lg bg-sec-soft shadow-sm"
            style={{
              transform: 'translateY(-50%)',
              left: 0,
              animation: motion ? 'device-slide 1.4s linear infinite alternate' : 'none',
            }}
          />
        </div>
        <p className="mt-2.5 text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
          {ui.motionNote}
        </p>
      </div>

      {/* left를 움직인다 — transform의 %는 자기 크기 기준이라 트랙 끝까지 못 간다 */}
      <style>{`
        @keyframes device-slide {
          from { left: 0; }
          to { left: calc(100% - 2.5rem); }
        }
      `}</style>
    </div>
  );
}
