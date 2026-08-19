'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, PlayButton, Stat, higher, useBest } from './ui';
import { STROOP_HEX, stroopCorrect, stroopTrial, type StroopColor, type StroopTrial } from '@/lib/game-more';
import { GAME_MORE_UI } from '@/lib/game-more-ui';
import { type GameLang } from '@/lib/game-ui-intl';

/**
 * 스트룹 — 낱말의 뜻이 아니라 칠해진 색을 고른다.
 *
 * 문제를 만드는 셈은 lib/game-more.ts에 있다. 특히 "정답이 늘 첫 자리에 있지
 * 않은가"와 "낱말과 잉크가 같은 문제가 섞여 있는가"는 몇 판 해서는 모른다.
 */
const SECONDS = 45;

export default function StroopGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = GAME_MORE_UI[lang];
  const [trial, setTrial] = useState<StroopTrial | null>(null);
  const [playing, setPlaying] = useState(false);
  const [left, setLeft] = useState(SECONDS);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const { best, submit } = useBest('stroop', higher);
  const flash = useRef<number | null>(null);
  const [tone, setTone] = useState<'good' | 'bad' | null>(null);

  const next = useCallback(() => setTrial(stroopTrial(Math.random)), []);

  const start = () => {
    setRight(0); setWrong(0); setLeft(SECONDS); setPlaying(true); next();
  };

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setLeft(v => {
        if (v <= 1) {
          setPlaying(false);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (!playing && left === 0 && right + wrong > 0) submit(right);
  }, [playing, left, right, wrong, submit]);

  useEffect(() => () => { if (flash.current) window.clearTimeout(flash.current); }, []);

  const answer = (picked: StroopColor) => {
    if (!playing || !trial) return;
    const ok = stroopCorrect(trial, picked);
    if (ok) setRight(v => v + 1); else setWrong(v => v + 1);
    setTone(ok ? 'good' : 'bad');
    if (flash.current) window.clearTimeout(flash.current);
    flash.current = window.setTimeout(() => setTone(null), 220);
    next();
  };

  const LABEL: Record<StroopColor, string> = {
    red: ui.red, blue: ui.blue, green: ui.green, yellow: ui.yellow, purple: ui.purple,
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Stat label={ui.timeLeft} value={`${left}s`} accent={left <= 10 ? 'text-rose-500' : undefined} />
        <Stat label={ui.correct} value={right} accent="text-emerald-600" />
        <Stat label={ui.best} value={best ?? '—'} />
      </div>

      <div
        className={`${CARD} min-h-[12rem] flex items-center justify-center transition-colors ${
          tone === 'good' ? '!border-emerald-300' : tone === 'bad' ? '!border-rose-300' : ''
        }`}
      >
        {playing && trial ? (
          <span className="text-5xl font-bold" style={{ color: STROOP_HEX[trial.ink] }}>
            {LABEL[trial.word]}
          </span>
        ) : left === 0 && right + wrong > 0 ? (
          <Grade text={`${right} / ${right + wrong}`} tone={right > wrong ? 'good' : 'normal'} />
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center px-6">{ui.stroopHow}</p>
        )}
      </div>

      {playing && trial ? (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {trial.options.map(o => (
            <button
              key={o}
              onClick={() => answer(o)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-4 text-base font-bold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] transition-all"
            >
              {LABEL[o]}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <PlayButton onClick={start}>{left === 0 && right + wrong > 0 ? ui.again : ui.start}</PlayButton>
        </div>
      )}
    </div>
  );
}
