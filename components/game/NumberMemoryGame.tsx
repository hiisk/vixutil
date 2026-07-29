'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Stat, useBest, higher } from './ui';
import { GAME_COMMON, NUMBER_MEMORY_UI, type GameLang } from '@/lib/game-ui-intl';

/**
 * 숫자 암기 — 자릿수를 하나씩 늘려간다.
 *
 * 보여주는 시간은 자릿수에 비례해 늘린다. 고정해 두면 뒤로 갈수록 다 읽기도
 * 전에 사라져서, 기억력이 아니라 읽는 속도를 재게 된다.
 */
export default function NumberMemoryGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = NUMBER_MEMORY_UI[lang];
  const c = GAME_COMMON[lang];
  const [digits, setDigits] = useState(3);
  const [answer, setAnswer] = useState('');
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'idle' | 'show' | 'input' | 'over'>('idle');
  const [left, setLeft] = useState(0);
  const timer = useRef(0);
  const raf = useRef(0);
  const { best, submit } = useBest('number-memory', higher);

  useEffect(() => () => { window.clearTimeout(timer.current); cancelAnimationFrame(raf.current); }, []);

  const show = useCallback((n: number) => {
    const value = Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('');
    setAnswer(value);
    setInput('');
    setPhase('show');

    const ms = 1500 + n * 400;
    const endAt = performance.now() + ms;
    const tick = () => {
      const remain = endAt - performance.now();
      setLeft(Math.max(0, remain / ms));
      if (remain > 0) raf.current = requestAnimationFrame(tick);
    };
    tick();
    timer.current = window.setTimeout(() => setPhase('input'), ms);
  }, []);

  const start = () => { setDigits(3); show(3); };

  const check = () => {
    if (input === answer) {
      const next = digits + 1;
      setDigits(next);
      show(next);
    } else {
      submit(digits - 1);
      setPhase('over');
    }
  };

  return (
    <div>
      <div className="rounded-2xl bg-slate-900 h-52 flex flex-col items-center justify-center px-6 text-center">
        {phase === 'idle' && (
          <>
            <span className="text-white text-xl font-black mb-1">{ui.memorise}</span>
            <span className="text-white/60 text-sm">{ui.briefly}</span>
          </>
        )}
        {phase === 'show' && (
          <span className="text-white text-4xl sm:text-5xl font-black tracking-[0.15em] tabular-nums">{answer}</span>
        )}
        {phase === 'input' && (
          <>
            <span className="text-white/60 text-sm mb-3">{ui.typeBack}</span>
            <input
              value={input}
              onChange={e => setInput(e.target.value.replace(/[^\d]/g, ''))}
              onKeyDown={e => { if (e.key === 'Enter') check(); }}
              inputMode="numeric"
              autoFocus
              className="w-full max-w-xs rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-center text-2xl font-black text-white tracking-[0.15em] tabular-nums focus:outline-none focus:border-white/60"
            />
          </>
        )}
        {phase === 'over' && (
          <>
            <span className="text-white text-xl font-black mb-2">{ui.reached(digits - 1)}</span>
            <span className="text-white/60 text-sm font-mono">{ui.answerVs(answer, input || ui.nothing)}</span>
          </>
        )}
      </div>

      {phase === 'show' && (
        <div className="mt-2 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-indigo-500 transition-none" style={{ width: `${left * 100}%` }} />
        </div>
      )}

      {phase === 'input' && (
        <button
          onClick={check}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          {ui.confirm}
        </button>
      )}

      {(phase === 'idle' || phase === 'over') && (
        <button
          onClick={start}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          {phase === 'over' ? c.retry : c.start}
        </button>
      )}

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label={ui.currentDigits} value={phase === 'idle' ? '—' : digits} accent="text-indigo-600" />
        <Stat label={ui.memorised} value={phase === 'over' ? digits - 1 : '—'} />
        <Stat label={c.best} value={best ?? '—'} accent="text-violet-600" />
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
