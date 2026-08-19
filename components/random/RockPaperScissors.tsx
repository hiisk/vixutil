'use client';
import { useState } from 'react';
import { judge, throwHand, type Hand, type Outcome } from '@/lib/random-more';
import { RANDOM_MORE_UI } from '@/lib/random-more-ui';
import { type RandomLang } from '@/lib/random-ui-intl';

const EMOJI: Record<Hand, string> = { rock: '✊', paper: '✋', scissors: '✌️' };

export default function RockPaperScissors({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_MORE_UI[lang];
  const [mine, setMine] = useState<Hand | null>(null);
  const [theirs, setTheirs] = useState<Hand | null>(null);
  const [result, setResult] = useState<Outcome | null>(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  const play = (hand: Hand) => {
    const other = throwHand(Math.random);
    const out = judge(hand, other);
    setMine(hand);
    setTheirs(other);
    setResult(out);
    setScore(s => ({ ...s, [out]: s[out] + 1 }));
  };

  const label: Record<Hand, string> = { rock: ui.rock, paper: ui.paper, scissors: ui.scissors };
  const text = result === 'win' ? ui.youWin : result === 'lose' ? ui.youLose : ui.itsDraw;
  const tone = result === 'win' ? 'text-emerald-600' : result === 'lose' ? 'text-rose-500' : 'text-slate-500';

  return (
    <div>
      {result && (
        <div className="rounded-lg border chip-off p-6 mb-5 text-center">
          <div className="flex items-center justify-center gap-6">
            <span className="text-5xl" aria-label={label[mine!]}>{EMOJI[mine!]}</span>
            <span className="text-sm font-black text-slate-300 dark:text-slate-600">VS</span>
            <span className="text-5xl" aria-label={label[theirs!]}>{EMOJI[theirs!]}</span>
          </div>
          <p className={`mt-4 text-xl font-black ${tone}`}>{text}</p>
        </div>
      )}

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.pickYours}</p>
      <div className="grid grid-cols-3 gap-2">
        {(['rock', 'paper', 'scissors'] as Hand[]).map(h => (
          <button
            key={h}
            onClick={() => play(h)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-5 hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all"
          >
            <span className="block text-4xl">{EMOJI[h]}</span>
            <span className="block mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">{label[h]}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4 text-sm font-bold">
        <span className="text-slate-400 dark:text-slate-500">{ui.record}</span>
        <span className="text-emerald-600">{score.win}</span>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        <span className="text-slate-500">{score.draw}</span>
        <span className="text-slate-300 dark:text-slate-600">·</span>
        <span className="text-rose-500">{score.lose}</span>
      </div>
    </div>
  );
}
