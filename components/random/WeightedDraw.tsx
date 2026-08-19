'use client';
import { useState } from 'react';
import { weightedPercents, weightedPick, type Weighted } from '@/lib/random-more';
import { RANDOM_MORE_UI } from '@/lib/random-more-ui';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

export default function WeightedDraw({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_MORE_UI[lang];
  const common = RANDOM_UI[lang];
  const [items, setItems] = useState<Weighted[]>(
    common.rouletteDefaults.slice(0, 4).map((label, i) => ({ label, weight: [5, 3, 2, 1][i] ?? 1 })),
  );
  const [won, setWon] = useState<string | null>(null);

  const percents = weightedPercents(items);
  const set = (i: number, patch: Partial<Weighted>) =>
    setItems(prev => prev.map((v, n) => (n === i ? { ...v, ...patch } : v)));

  return (
    <div>
      {won !== null && (
        <div className="rounded-2xl border-2 border-rose-300 bg-gradient-to-br from-rose-500 to-pink-600 p-6 mb-5 text-center">
          <p className="text-xs font-bold text-white/70">{common.winner}</p>
          <p className="mt-1 text-2xl font-black text-white break-words">{won}</p>
        </div>
      )}

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.weightTitle}</p>
      <div className="flex flex-col gap-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={it.label}
              onChange={e => set(i, { label: e.target.value })}
              placeholder={common.optionPlaceholder(i + 1)}
              className="fld flex-1 min-w-0 focus:ring-2 focus:ring-rose-400"
            />
            <input
              type="number" min={0} max={999} value={it.weight}
              onChange={e => set(i, { weight: Math.max(0, Number(e.target.value) || 0) })}
              aria-label={ui.weight}
              className="w-16 shrink-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-2.5 text-sm text-center font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
            <span className="w-14 shrink-0 text-right text-xs font-black text-rose-600 tabular-nums">{percents[i]}%</span>
            <button
              onClick={() => setItems(prev => prev.filter((_, n) => n !== i))}
              disabled={items.length <= 2}
              aria-label={common.remove}
              className="shrink-0 w-8 h-8 rounded-lg text-slate-300 dark:text-slate-600 hover:text-rose-500 disabled:opacity-30"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => setItems(prev => [...prev, { label: '', weight: 1 }])}
        className="w-full mt-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 py-2.5 text-sm font-bold text-slate-400 dark:text-slate-500 hover:border-rose-300 hover:text-rose-500 transition-colors"
      >
        {ui.addItem}
      </button>

      <button
        onClick={() => {
          const hit = weightedPick(items.filter(i => i.label.trim()), Math.random);
          setWon(hit ? hit.label : null);
        }}
        className="w-full mt-4 bg-sec font-black text-lg rounded-2xl py-4 shadow-lg shadow-rose-200 dark:shadow-none hover:-translate-y-0.5 hover:shadow-xl transition-all"
      >
        {ui.drawWeighted} 🎯
      </button>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 text-center">{ui.weightNote}</p>
    </div>
  );
}
