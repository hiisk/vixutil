'use client';
import { useEffect, useRef, useState } from 'react';
import { CARD, Grade, PlayButton, Stat, higher, useBest } from './ui';
import { nBackRun, nBackScore, type NBackRun } from '@/lib/game-more';
import { GAME_MORE_UI } from '@/lib/game-more-ui';
import { type GameLang } from '@/lib/game-ui-intl';

/**
 * 엔백 — n칸 앞과 같은 자리가 나오면 누른다.
 *
 * 수열을 만드는 셈과 채점은 lib/game-more.ts에 있다. 일치를 일부러 넣지 않으면
 * "아니오"만 눌러도 높은 점수가 나오고, 오답을 빼지 않으면 "전부 누르기"가
 * 최적 전략이 된다 — 둘 다 화면에서는 안 보인다.
 */
const LENGTH = 24;
const STEP_MS = 2000;

export default function NBackGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = GAME_MORE_UI[lang];
  const [n, setN] = useState(2);
  const [run, setRun] = useState<NBackRun | null>(null);
  const [at, setAt] = useState(-1);
  const [pressed, setPressed] = useState<Set<number>>(new Set());
  const [done, setDone] = useState<ReturnType<typeof nBackScore> | null>(null);
  const { best, submit } = useBest('nback', higher);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  const start = () => {
    setRun(nBackRun(LENGTH, n, Math.random));
    setPressed(new Set());
    setDone(null);
    setAt(0);
  };

  useEffect(() => {
    if (!run || at < 0 || done) return;
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setAt(v => {
        if (v + 1 >= run.items.length) {
          if (timer.current) window.clearInterval(timer.current);
          return -2; // 끝
        }
        return v + 1;
      });
    }, STEP_MS);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [run, at >= 0, done]);

  useEffect(() => {
    if (at !== -2 || !run || done) return;
    const s = nBackScore(run, pressed);
    setDone(s);
    submit(s.score);
  }, [at, run, pressed, done, submit]);

  const playing = !!run && at >= 0;

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Stat label="N" value={n} />
        <Stat label={ui.score} value={done ? done.score : '—'} accent="text-emerald-600" />
        <Stat label={ui.best} value={best ?? '—'} />
      </div>

      {!playing && !done && (
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map(v => (
            <button
              key={v}
              onClick={() => setN(v)}
              className={`flex-1 rounded-xl border py-2.5 text-sm font-bold transition-colors ${
                n === v
                  ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-200'
              }`}
            >
              {v}-back
            </button>
          ))}
        </div>
      )}

      <div className={`${CARD} flex items-center justify-center min-h-[16rem]`}>
        {playing && run ? (
          <div className="grid grid-cols-3 gap-2 w-48">
            {Array.from({ length: 9 }, (_, i) => (
              <span
                key={i}
                className={`aspect-square rounded-xl transition-colors ${
                  run.items[at] === i
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                    : 'bg-slate-100 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        ) : done ? (
          <div className="text-center">
            <Grade text={`${done.score}점`} tone={done.score >= 70 ? 'good' : done.score >= 40 ? 'normal' : 'bad'} />
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {ui.hit} {done.hit} · {ui.miss} {done.miss} · {ui.falseAlarm} {done.falseAlarm}
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center px-6">
            {ui.nbackHow.replace('{n}', String(n))}
          </p>
        )}
      </div>

      <div className="mt-4">
        {playing ? (
          <PlayButton onClick={() => setPressed(p => new Set(p).add(at))}>{ui.match}</PlayButton>
        ) : (
          <PlayButton onClick={start}>{done ? ui.again : ui.start}</PlayButton>
        )}
      </div>

      {playing && run && (
        <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500 tabular-nums">
          {at + 1} / {run.items.length}
        </p>
      )}
    </div>
  );
}
