'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, higher } from './ui';
import { GAME_COMMON, MEMORY_UI, type GameLang } from '@/lib/game-ui-intl';

/**
 * 순서 기억 — 색이 켜지는 순서를 그대로 따라 누른다.
 *
 * 단계마다 앞선 순서를 그대로 두고 하나만 덧붙인다. 매번 새로 만들면 외운 것이
 * 쓸모없어져서 기억력이 아니라 순간 집중력만 재게 된다.
 */
const PADS = [
  { id: 0, on: 'bg-emerald-400', off: 'bg-emerald-700' },
  { id: 1, on: 'bg-rose-400', off: 'bg-rose-700' },
  { id: 2, on: 'bg-sky-400', off: 'bg-sky-700' },
  { id: 3, on: 'bg-amber-400', off: 'bg-amber-700' },
];

/** 렌더 스코프에서 Math.random을 부르면 린트가 막는다 — 바깥에 두고 부른다 */
const randomPad = () => Math.floor(Math.random() * PADS.length);

export default function MemoryGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = MEMORY_UI[lang];
  const c = GAME_COMMON[lang];
  const [sequence, setSequence] = useState<number[]>([]);
  const [lit, setLit] = useState<number | null>(null);
  const [phase, setPhase] = useState<'idle' | 'show' | 'input' | 'over'>('idle');
  const [step, setStep] = useState(0);
  const timers = useRef<number[]>([]);
  const { best, submit } = useBest('memory', higher);

  const clearTimers = () => { timers.current.forEach(window.clearTimeout); timers.current = []; };
  useEffect(() => clearTimers, []);

  const play = useCallback((seq: number[]) => {
    setPhase('show');
    clearTimers();
    // 순서가 길어질수록 조금 빨라진다 — 안 그러면 후반이 지루하다
    const gap = Math.max(320, 700 - seq.length * 25);
    seq.forEach((pad, i) => {
      timers.current.push(window.setTimeout(() => setLit(pad), gap * i + 200));
      timers.current.push(window.setTimeout(() => setLit(null), gap * i + gap * 0.6 + 200));
    });
    timers.current.push(window.setTimeout(() => { setPhase('input'); setStep(0); }, gap * seq.length + 300));
  }, []);

  const start = () => {
    const first = [randomPad()];
    setSequence(first);
    play(first);
  };

  const press = (pad: number) => {
    if (phase !== 'input') return;
    setLit(pad);
    window.setTimeout(() => setLit(null), 150);

    if (sequence[step] !== pad) {
      submit(sequence.length - 1);
      setPhase('over');
      return;
    }
    if (step + 1 === sequence.length) {
      const next = [...sequence, randomPad()];
      setSequence(next);
      window.setTimeout(() => play(next), 600);
      return;
    }
    setStep(s => s + 1);
  };

  const level = sequence.length;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {PADS.map(p => (
          <button
            key={p.id}
            onClick={() => press(p.id)}
            disabled={phase !== 'input'}
            aria-label={ui.buttonAria(p.id + 1)}
            className={`aspect-square rounded-2xl transition-colors duration-100 ${lit === p.id ? p.on : p.off} ${
              phase === 'input' ? 'cursor-pointer hover:opacity-90' : 'cursor-default'
            }`}
          />
        ))}
      </div>

      <p className="text-center text-sm font-bold mt-4 text-slate-600 dark:text-slate-300">
        {phase === 'idle' && ui.idle}
        {phase === 'show' && ui.show}
        {phase === 'input' && ui.input(step, sequence.length)}
        {phase === 'over' && ui.over(level - 1)}
      </p>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label={ui.currentLevel} value={phase === 'idle' ? '—' : Math.max(1, level)} accent="text-amber-600" />
        <Stat label={ui.toRemember} value={phase === 'idle' ? '—' : level} />
        <Stat label={ui.bestLevel} value={best ?? '—'} accent="text-indigo-600" />
      </div>

      {(phase === 'idle' || phase === 'over') && (
        <button
          onClick={start}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          {phase === 'over' ? c.retry : c.start}
        </button>
      )}

      {phase === 'over' && (
        <Grade
          text={
            level - 1 >= 9 ? ui.gradeGreat(level - 1) :
            level - 1 >= 6 ? ui.gradeGood(level - 1) :
            ui.gradeSlow(level - 1)
          }
          tone={level - 1 >= 6 ? 'good' : 'normal'}
        />
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
