'use client';
import { useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, useBest, higher } from './ui';
import { GAME_COMMON, MATH_UI, type GameLang } from '@/lib/game-ui-intl';

/**
 * 암산 대결 — 제한 시간 안에 푼 문제 수.
 *
 * 나눗셈은 답이 정수로 떨어지게 만든다. 몫과 나머지를 묻기 시작하면 암산이
 * 아니라 규칙 이해를 재게 되고, 소수점을 허용하면 입력 형식 싸움이 된다.
 */
const DURATION = 30;

type Op = '+' | '-' | '×' | '÷';
const LEVELS = {
  easy: { max: 20 },
  normal: { max: 50 },
  hard: { max: 99 },
} as const;
type LevelKey = keyof typeof LEVELS;

function makeQuestion(ops: Op[], max: number) {
  const op = ops[Math.floor(Math.random() * ops.length)];
  const r = (n: number) => 1 + Math.floor(Math.random() * n);
  if (op === '+') { const a = r(max), b = r(max); return { text: `${a} + ${b}`, answer: a + b }; }
  if (op === '-') { const a = r(max), b = r(a); return { text: `${a} - ${b}`, answer: a - b }; }
  if (op === '×') {
    const a = r(Math.min(12, max)), b = r(Math.min(12, max));
    return { text: `${a} × ${b}`, answer: a * b };
  }
  const b = r(9) + 1;
  const answer = r(Math.min(12, max));
  return { text: `${b * answer} ÷ ${b}`, answer };
}

export default function MathGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = MATH_UI[lang];
  const c = GAME_COMMON[lang];
  const [level, setLevel] = useState<LevelKey>('normal');
  const [ops, setOps] = useState<Op[]>(['+', '-']);
  const [question, setQuestion] = useState({ text: '', answer: 0 });
  const [input, setInput] = useState('');
  const [solved, setSolved] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const [left, setLeft] = useState(DURATION);
  const [phase, setPhase] = useState<'idle' | 'run' | 'over'>('idle');
  const endAt = useRef(0);
  const { best, submit } = useBest('math', higher);

  useEffect(() => {
    if (phase !== 'run') return;
    let id = 0;
    const loop = () => {
      const remain = (endAt.current - performance.now()) / 1000;
      if (remain <= 0) { setLeft(0); setPhase('over'); return; }
      setLeft(remain);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [phase]);

  const start = () => {
    setSolved(0);
    setWrong([]);
    setInput('');
    setQuestion(makeQuestion(ops, LEVELS[level].max));
    endAt.current = performance.now() + DURATION * 1000;
    setPhase('run');
  };

  useEffect(() => { if (phase === 'over') submit(solved); }, [phase, solved, submit]);

  const answer = (value: string) => {
    setInput(value);
    if (value === '' || value === '-') return;
    if (Number(value) === question.answer) {
      setSolved(s => s + 1);
      setInput('');
      setQuestion(makeQuestion(ops, LEVELS[level].max));
    }
  };

  const skip = () => {
    setWrong(w => [...w, `${question.text} = ${question.answer}`]);
    setInput('');
    setQuestion(makeQuestion(ops, LEVELS[level].max));
  };

  const toggleOp = (op: Op) =>
    setOps(prev => (prev.includes(op) ? (prev.length > 1 ? prev.filter(o => o !== op) : prev) : [...prev, op]));

  const perQuestion = solved > 0 ? (DURATION / solved).toFixed(1) : '—';

  return (
    <div>
      {phase === 'idle' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.opTitle}</p>
          <div className="grid grid-cols-4 gap-2">
            {(['+', '-', '×', '÷'] as Op[]).map(op => (
              <button
                key={op}
                onClick={() => toggleOp(op)}
                className={`rounded-xl border py-3 text-lg font-black transition-colors ${
                  ops.includes(op)
                    ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-400'
                }`}
              >
                {op}
              </button>
            ))}
          </div>

          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.levelTitle}</p>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(LEVELS) as LevelKey[]).map((k, i) => (
              <button
                key={k}
                onClick={() => setLevel(k)}
                className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                  level === k
                    ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {ui.levels[i]}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'run' && (
        <div className="rounded-2xl bg-slate-900 text-white px-6 py-10 text-center">
          <p className="text-sm text-white/60 mb-3 tabular-nums">{ui.timeLeft(left.toFixed(1), solved)}</p>
          <p className="text-4xl sm:text-5xl font-black tabular-nums mb-5">{question.text}</p>
          <input
            value={input}
            onChange={e => answer(e.target.value.replace(/[^\d-]/g, ''))}
            inputMode="numeric"
            autoFocus
            placeholder={ui.answerPlaceholder}
            className="w-full max-w-[10rem] mx-auto rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-center text-2xl font-black text-white tabular-nums focus:outline-none focus:border-white/60"
          />
          <button onClick={skip} className="block mx-auto mt-3 text-xs font-bold text-white/50 hover:text-white/80">
            {ui.skip}
          </button>
        </div>
      )}

      {phase === 'over' && (
        <div className="rounded-2xl bg-slate-900 text-white px-6 py-10 text-center">
          <p className="text-6xl font-black tabular-nums">{solved}</p>
          <p className="text-sm text-white/70 mt-1">{ui.solvedIn(DURATION)}</p>
        </div>
      )}

      <button
        onClick={start}
        disabled={phase === 'run'}
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-lime-600 text-white font-bold py-3.5 text-sm shadow-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {phase === 'over' ? c.retry : phase === 'run' ? c.running : ui.startIn(DURATION)}
      </button>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <Stat label={ui.solved} value={solved} accent="text-emerald-600" />
        <Stat label={ui.skipped} value={wrong.length} />
        <Stat label={ui.perQuestion} value={perQuestion === '—' ? '—' : ui.secSuffix(String(perQuestion))} />
        <Stat label={c.best} value={best ?? '—'} accent="text-lime-600" />
      </div>

      {phase === 'over' && (
        <>
          <Grade
            text={
              solved >= 25 ? ui.gradeFast(solved) :
              solved >= 15 ? ui.gradeGood(solved) :
              ui.gradeSlow(solved)
            }
            tone={solved >= 15 ? 'good' : 'normal'}
          />
          {wrong.length > 0 && (
            <div className={`${CARD} mt-4`}>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.skippedTitle}</p>
              <div className="flex flex-wrap gap-1.5">
                {wrong.map((w, i) => (
                  <span key={i} className="rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-mono text-slate-600 dark:text-slate-300">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
