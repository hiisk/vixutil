'use client';
import { useCallback, useEffect, useState } from 'react';
import { CARD, Grade, PlayButton, Stat, higher, useBest } from './ui';
import { dotRound, dotScore, type DotRound } from '@/lib/game-more';
import { GAME_MORE_UI } from '@/lib/game-more-ui';
import { type GameLang } from '@/lib/game-ui-intl';

/**
 * 개수 어림 — 점이 잠깐 보이고 몇 개였는지 맞힌다.
 *
 * 난이도는 개수와 보이는 시간을 함께 움직인다(lib/game-more.ts). 시간만 줄이면
 * 열 개도 못 세게 되고, 개수만 늘리면 하나씩 셀 수 있어 어림이 아니게 된다.
 */
type Phase = 'idle' | 'show' | 'ask' | 'result';

export default function DotCountGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = GAME_MORE_UI[lang];
  const [phase, setPhase] = useState<Phase>('idle');
  const [level, setLevel] = useState(1);
  const [round, setRound] = useState<DotRound | null>(null);
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [last, setLast] = useState<{ actual: number; guess: number; points: number } | null>(null);
  const { best, submit } = useBest('dot-count', higher);

  const play = useCallback((lv: number) => {
    const r = dotRound(lv, Math.random);
    setRound(r);
    setGuess('');
    setPhase('show');
  }, []);

  useEffect(() => {
    if (phase !== 'show' || !round) return;
    const id = window.setTimeout(() => setPhase('ask'), round.showMs);
    return () => window.clearTimeout(id);
  }, [phase, round]);

  const check = () => {
    if (!round) return;
    const g = Number(guess);
    if (!Number.isFinite(g)) return;
    const points = dotScore(round.count, g);
    setLast({ actual: round.count, guess: g, points });
    setScore(s => s + points);
    setPhase('result');
  };

  const next = () => { const lv = level + 1; setLevel(lv); play(lv); };
  const stop = () => { submit(score); setPhase('idle'); setLevel(1); setScore(0); setLast(null); };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Stat label={ui.level} value={level} />
        <Stat label={ui.score} value={score} accent="text-emerald-600" />
        <Stat label={ui.best} value={best ?? '—'} />
      </div>

      <div className={`${CARD} relative min-h-[16rem] flex items-center justify-center overflow-hidden`}>
        {phase === 'show' && round ? (
          <div className="absolute inset-0">
            {round.dots.map((d, i) => (
              <span
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full bg-amber-500"
                style={{ left: `${4 + d.x * 92}%`, top: `${4 + d.y * 92}%` }}
              />
            ))}
          </div>
        ) : phase === 'ask' ? (
          <div className="w-full px-6 text-center">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3">{ui.howMany}</p>
            <input
              type="number" inputMode="numeric" autoFocus
              value={guess}
              onChange={e => setGuess(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && check()}
              className="w-32 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-3 text-center text-2xl font-black text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>
        ) : phase === 'result' && last ? (
          <div className="text-center">
            <Grade text={`+${last.points}`} tone={last.points >= 80 ? 'good' : last.points >= 40 ? 'normal' : 'bad'} />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {ui.actual} {last.actual} · {ui.howMany.replace('?', '').replace('？', '')} {last.guess}
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center px-6">{ui.dotHow}</p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        {phase === 'idle' && <PlayButton onClick={() => play(1)}>{ui.start}</PlayButton>}
        {phase === 'ask' && <PlayButton onClick={check}>{ui.submit}</PlayButton>}
        {phase === 'result' && (
          <>
            <div className="flex-1"><PlayButton onClick={next}>{ui.level} +1</PlayButton></div>
            <button
              onClick={stop}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-amber-300 transition-colors"
            >
              {ui.again}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
