'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, lower } from './ui';
import { GAME_COMMON, REACTION_UI, type GameLang } from '@/lib/game-ui-intl';

/**
 * 반응속도 — 초록으로 바뀐 순간부터 누를 때까지의 시간.
 *
 * 대기 시간을 무작위로 둔다(1~4초). 일정하면 사람이 박자를 세서 기다리다가
 * 미리 누르게 되는데, 그건 반응이 아니라 예측이다. 초록이 되기 전에 누르면
 * 그 판을 무효로 하는 것도 같은 이유다.
 */
type Phase = 'idle' | 'waiting' | 'ready' | 'result' | 'early';

const ROUNDS = 5;

export default function ReactionGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = REACTION_UI[lang];
  const c = GAME_COMMON[lang];
  const [phase, setPhase] = useState<Phase>('idle');
  const [times, setTimes] = useState<number[]>([]);
  const [last, setLast] = useState(0);
  const startedAt = useRef(0);
  const timer = useRef(0);
  const { best, submit } = useBest('reaction', lower);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const arm = useCallback(() => {
    setPhase('waiting');
    timer.current = window.setTimeout(() => {
      startedAt.current = performance.now();
      setPhase('ready');
    }, 1000 + Math.random() * 3000);
  }, []);

  const hit = () => {
    if (phase === 'idle' || phase === 'result' || phase === 'early') {
      if (phase === 'result' && times.length >= ROUNDS) setTimes([]);
      arm();
      return;
    }
    if (phase === 'waiting') {
      window.clearTimeout(timer.current);
      setPhase('early');
      return;
    }
    const ms = Math.round(performance.now() - startedAt.current);
    setLast(ms);
    setTimes(prev => [...prev, ms]);
    submit(ms);
    setPhase('result');
  };

  const done = times.length >= ROUNDS;
  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const fastest = times.length ? Math.min(...times) : 0;

  const face = {
    idle: { bg: 'bg-slate-800', title: ui.idleTitle, sub: ui.idleSub },
    waiting: { bg: 'bg-rose-600', title: ui.waitTitle, sub: ui.waitSub },
    ready: { bg: 'bg-emerald-500', title: ui.nowTitle, sub: '' },
    result: { bg: 'bg-slate-800', title: `${last}ms`, sub: done ? ui.resultSub : ui.roundSub(times.length, ROUNDS) },
    early: { bg: 'bg-amber-500', title: ui.earlyTitle, sub: ui.earlySub },
  }[phase];

  return (
    <div>
      <button
        onClick={hit}
        className={`w-full h-64 sm:h-80 rounded-lg ${face.bg} text-white flex flex-col items-center justify-center transition-colors select-none touch-none`}
      >
        <span className="text-3xl sm:text-4xl font-bold mb-2">{face.title}</span>
        {face.sub && <span className="text-sm text-white/70 px-6 text-center">{face.sub}</span>}
      </button>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <Stat label={ui.thisRound} value={last ? `${last}ms` : '—'} accent="text-emerald-600" />
        <Stat label={ui.avgOf(times.length)} value={avg ? `${avg}ms` : '—'} />
        <Stat label={ui.fastest} value={fastest ? `${fastest}ms` : '—'} />
        <Stat label={c.best} value={best ? `${best}ms` : '—'} accent="text-indigo-600" />
      </div>

      {done && (
        <>
          <Grade
            text={
              avg < 200 ? ui.gradeTop(avg) :
              avg < 250 ? ui.gradeFast(avg) :
              avg < 320 ? ui.gradeNormal(avg) :
              ui.gradeSlow(avg)
            }
            tone={avg < 250 ? 'good' : avg < 320 ? 'normal' : 'bad'}
          />
          <button
            onClick={() => { setTimes([]); setLast(0); setPhase('idle'); }}
            className="mt-3 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            {c.fromStart}
          </button>
        </>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.noteTitle}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {ui.note}
        </p>
      </div>
    </div>
  );
}
