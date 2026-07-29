'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, higher } from './ui';

/**
 * 패턴 기억 — 격자에서 켜졌던 칸의 위치를 기억한다.
 *
 * 순서는 묻지 않고 위치만 본다. 순서까지 요구하면 순서 기억 게임과 같아지고,
 * 위치만 재는 쪽이 공간 기억을 더 정확히 본다.
 */
export default function SequenceGame() {
  const [level, setLevel] = useState(1);
  const [size, setSize] = useState(3);
  const [pattern, setPattern] = useState<number[]>([]);
  const [picked, setPicked] = useState<number[]>([]);
  const [phase, setPhase] = useState<'idle' | 'show' | 'input' | 'over'>('idle');
  const timer = useRef(0);
  const { best, submit } = useBest('sequence', higher);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const round = useCallback((lv: number) => {
    // 3×3에서 시작해 칸이 모자라면 격자를 넓힌다
    const grid = lv <= 4 ? 3 : lv <= 9 ? 4 : 5;
    const count = Math.min(lv + 2, grid * grid - 2);
    const cells = new Set<number>();
    while (cells.size < count) cells.add(Math.floor(Math.random() * grid * grid));

    setSize(grid);
    setPattern([...cells]);
    setPicked([]);
    setPhase('show');
    timer.current = window.setTimeout(() => setPhase('input'), 900 + count * 220);
  }, []);

  const start = () => { setLevel(1); round(1); };

  const tap = (index: number) => {
    if (phase !== 'input' || picked.includes(index)) return;
    if (!pattern.includes(index)) {
      submit(level - 1);
      setPicked(p => [...p, index]);
      setPhase('over');
      return;
    }
    const next = [...picked, index];
    setPicked(next);
    if (next.length === pattern.length) {
      const lv = level + 1;
      setLevel(lv);
      timer.current = window.setTimeout(() => round(lv), 600);
    }
  };

  const cellState = (i: number) => {
    if (phase === 'show') return pattern.includes(i) ? 'on' : 'off';
    if (phase === 'over') {
      if (picked.includes(i) && !pattern.includes(i)) return 'wrong';
      return pattern.includes(i) ? 'on' : 'off';
    }
    return picked.includes(i) ? 'on' : 'off';
  };

  return (
    <div>
      <div
        className="grid gap-2 max-w-sm mx-auto"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: size * size }, (_, i) => {
          const state = cellState(i);
          return (
            <button
              key={i}
              onClick={() => tap(i)}
              disabled={phase !== 'input'}
              aria-label={`${i + 1}번 칸`}
              className={`aspect-square rounded-xl transition-colors duration-150 ${
                state === 'on' ? 'bg-gradient-to-br from-indigo-400 to-violet-600'
                : state === 'wrong' ? 'bg-rose-500'
                : 'bg-slate-200 dark:bg-slate-800'
              }`}
            />
          );
        })}
      </div>

      <p className="text-center text-sm font-bold mt-4 text-slate-600 dark:text-slate-300">
        {phase === 'idle' && '켜진 칸의 위치를 기억하세요'}
        {phase === 'show' && '잘 보세요…'}
        {phase === 'input' && `켜졌던 칸을 누르세요 (${picked.length}/${pattern.length})`}
        {phase === 'over' && `${level - 1}단계에서 끝났습니다 — 빨간 칸이 틀린 곳입니다`}
      </p>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label="단계" value={phase === 'idle' ? '—' : level} accent="text-indigo-600" />
        <Stat label="격자" value={`${size}×${size}`} />
        <Stat label="최고 단계" value={best ?? '—'} accent="text-violet-600" />
      </div>

      {(phase === 'idle' || phase === 'over') && (
        <button
          onClick={start}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-slate-600 to-indigo-700 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          {phase === 'over' ? '다시 도전' : '시작하기'}
        </button>
      )}

      {phase === 'over' && (
        <Grade
          text={level - 1 >= 7 ? `${level - 1}단계 — 공간 기억이 좋습니다` : `${level - 1}단계 — 모양으로 묶어 외우면 늘어납니다`}
          tone={level - 1 >= 7 ? 'good' : 'normal'}
        />
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          칸 하나하나를 외우는 대신 켜진 칸들이 이루는 모양(ㄱ자, 대각선)으로 기억하면 훨씬 오래 갑니다.
          위치 기억은 순서 기억과 다른 종류라, 한쪽을 잘해도 다른 쪽이 약할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
