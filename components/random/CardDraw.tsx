'use client';
import { useState } from 'react';
import { drawCards, type Card } from '@/lib/random-more';
import { RANDOM_MORE_UI } from '@/lib/random-more-ui';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

const COUNTS = [1, 2, 3, 5];

export default function CardDraw({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_MORE_UI[lang];
  const common = RANDOM_UI[lang];
  const [count, setCount] = useState(1);
  const [hand, setHand] = useState<Card[] | null>(null);

  return (
    <div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{ui.howManyCards}</p>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {COUNTS.map(n => (
          <button
            key={n}
            onClick={() => { setCount(n); setHand(null); }}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              count === n
                ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <button
        onClick={() => setHand(drawCards(count, Math.random))}
        className="w-full bg-sec font-bold text-lg rounded-lg py-4 mb-6 shadow-sm shadow-rose-200 dark:shadow-none hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
      >
        {hand ? ui.again : ui.drawCard} 🃏
      </button>

      {hand && (
        <div className="flex flex-wrap justify-center gap-3">
          {hand.map((c, i) => (
            <div
              key={`${c.suit}${c.rank}`}
              className="wc-flip w-20 h-28 rounded-xl border-2 chip-off flex flex-col items-center justify-center shadow-sm"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className={`text-3xl font-bold ${c.red ? 'text-rose-500' : 'text-slate-800 dark:text-slate-100'}`}>{c.rank}</span>
              <span className={`text-2xl ${c.red ? 'text-rose-500' : 'text-slate-800 dark:text-slate-100'}`}>{c.suit}</span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-6 text-center">{ui.deckNote}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">{common.privacyNote}</p>

      <style jsx>{`
        @keyframes wcFlip { 0% { opacity: 0; transform: rotateY(90deg); } 100% { opacity: 1; transform: rotateY(0); } }
        .wc-flip { animation: wcFlip 0.4s ease-out both; }
      `}</style>
    </div>
  );
}
