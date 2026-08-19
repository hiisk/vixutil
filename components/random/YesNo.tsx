'use client';
import { useState } from 'react';
import { decideYesNo } from '@/lib/random-more';
import { RANDOM_MORE_UI } from '@/lib/random-more-ui';
import { type RandomLang } from '@/lib/random-ui-intl';

export default function YesNo({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_MORE_UI[lang];
  const [question, setQuestion] = useState('');
  const [lean, setLean] = useState(50);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [spinning, setSpinning] = useState(false);

  const go = () => {
    setSpinning(true);
    // 바로 답이 뜨면 "돌린" 느낌이 없다 — 잠깐 뜸을 들인다
    window.setTimeout(() => {
      setAnswer(decideYesNo(lean, Math.random).yes);
      setSpinning(false);
    }, 550);
  };

  return (
    <div>
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder={ui.askIt}
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
      />

      <div className="flex items-baseline justify-between mt-5 mb-1.5">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.lean}</span>
        <span className="text-sm font-black text-rose-600 tabular-nums">{lean}%</span>
      </div>
      <input
        type="range" min={0} max={100} step={5} value={lean}
        onChange={e => setLean(Number(e.target.value))}
        className="w-full accent-rose-500" aria-label={ui.lean}
      />

      <button
        onClick={go}
        disabled={spinning}
        className="w-full mt-5 bg-sec font-black text-lg rounded-2xl py-4 shadow-lg shadow-rose-200 dark:shadow-none hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-60"
      >
        {ui.decide} 🪙
      </button>

      <div className="mt-6 min-h-[9rem] flex items-center justify-center">
        {spinning ? (
          <span className="text-5xl wc-spin">🪙</span>
        ) : answer !== null ? (
          <div className="wc-pop text-center">
            {question.trim() && (
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-2 break-words">{question}</p>
            )}
            <p className={`text-6xl font-black ${answer ? 'text-emerald-600' : 'text-rose-500'}`}>
              {answer ? ui.yes : ui.no}
            </p>
          </div>
        ) : null}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-center">{ui.leanNote}</p>

      <style jsx>{`
        @keyframes wcSpin { 0% { transform: rotateY(0); } 100% { transform: rotateY(1080deg); } }
        .wc-spin { display: inline-block; animation: wcSpin 0.55s linear; }
        @keyframes wcPop { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
        .wc-pop { animation: wcPop 0.3s ease-out both; }
      `}</style>
    </div>
  );
}
