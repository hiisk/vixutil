'use client';
import { useState } from 'react';
import { CARD, Stat } from './ui';

/**
 * BPM 측정 — 두드린 간격의 평균.
 *
 * 최근 여덟 번만 본다. 처음 몇 번은 박자를 잡느라 흔들리고, 곡 도중에 템포가
 * 바뀌면 옛 기록이 발목을 잡기 때문이다.
 */
const WINDOW = 8;

export default function BpmTapTool() {
  const [taps, setTaps] = useState<number[]>([]);

  const tap = () => {
    const now = performance.now();
    setTaps(prev => {
      // 3초 넘게 쉬었으면 새로 시작한 것으로 본다
      const fresh = prev.length && now - prev[prev.length - 1] > 3000 ? [] : prev;
      return [...fresh, now].slice(-WINDOW);
    });
  };

  const gaps = taps.slice(1).map((t, i) => t - taps[i]);
  const avg = gaps.length ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 0;
  const bpm = avg ? Math.round(60000 / avg) : 0;
  const jitter = gaps.length > 1
    ? Math.round(Math.sqrt(gaps.reduce((a, g) => a + (g - avg) ** 2, 0) / gaps.length))
    : 0;

  return (
    <div>
      <button
        onClick={tap}
        className="w-full h-56 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-500 text-white flex flex-col items-center justify-center select-none touch-none active:scale-[0.99] transition-transform"
      >
        <span className="text-7xl font-black tabular-nums">{bpm || '—'}</span>
        <span className="text-sm text-white/80 mt-1">{bpm ? 'BPM' : '박자에 맞춰 두드리세요'}</span>
      </button>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label="두드린 횟수" value={taps.length} accent="text-amber-600" />
        <Stat label="박자 간격" value={avg ? `${Math.round(avg)}ms` : '—'} />
        <Stat label="흔들림" value={jitter ? `±${jitter}ms` : '—'} accent={jitter > 60 ? 'text-rose-500' : 'text-emerald-600'} />
      </div>

      <button
        onClick={() => setTaps([])}
        className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-amber-300 transition-colors"
      >
        다시 재기
      </button>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          여덟 번쯤 두드리면 값이 안정됩니다. 흔들림이 ±60ms를 넘으면 박자를 놓치고 있다는 뜻이니
          한 박씩 크게 세면서 다시 해보세요. 3초 넘게 쉬면 자동으로 새로 셉니다.
        </p>
      </div>
    </div>
  );
}
