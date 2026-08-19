'use client';
import { useState } from 'react';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

function pickNumbers(min: number, max: number, count: number, unique: boolean): number[] {
  const lo = Math.min(min, max), hi = Math.max(min, max);
  const span = hi - lo + 1;
  if (unique) {
    const pool = Array.from({ length: span }, (_, i) => lo + i);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(count, span)).sort((a, b) => a - b);
  }
  return Array.from({ length: count }, () => lo + Math.floor(Math.random() * span));
}

export default function NumberPicker({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_UI[lang];
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(true);
  const [result, setResult] = useState<number[] | null>(null);
  const [isLotto, setIsLotto] = useState(false);

  function draw() {
    setResult(pickNumbers(min, max, count, unique));
    setIsLotto(false);
  }
  function lotto() {
    setResult(pickNumbers(1, 45, 6, true));
    setIsLotto(true);
    setMin(1); setMax(45); setCount(6); setUnique(true);
  }

  const num = (v: number, set: (n: number) => void, label: string) => (
    <label className="flex-1">
      <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{label}</span>
      <input type="number" value={v} onChange={e => { set(Number(e.target.value) || 0); }}
        className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
    </label>
  );

  return (
    <div>
      <div className="flex gap-3 mb-3">
        {num(min, setMin, ui.min)}
        {num(max, setMax, ui.max)}
        {num(count, v => setCount(Math.max(1, v)), ui.count)}
      </div>
      <label className="flex items-center gap-2 mb-5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
        <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
        {ui.noDuplicates}
      </label>

      <button
        onClick={draw}
        className="w-full bg-sec font-black text-lg rounded-lg py-4 mb-3 shadow-sm shadow-emerald-200 dark:shadow-none hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
      >
        {ui.generate}
      </button>
      <button
        onClick={lotto}
        className="w-full border-2 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-300 font-bold rounded-lg py-3 mb-6 hover:bg-sec-soft transition-colors"
      >
        {ui.lottery}
      </button>

      {result && (
        <div className="rounded-lg bg-sec p-6 text-center">
          <div className="text-xs font-bold text-emerald-100 mb-3">{isLotto ? ui.luckyNumbers : ui.result}</div>
          <div className="flex flex-wrap justify-center gap-2">
            {result.map((n, i) => (
              <span key={i} className="wc-pop flex items-center justify-center w-12 h-12 rounded-full bg-white text-emerald-700 text-lg font-black" style={{ animationDelay: `${i * 90}ms` }}>
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes wcPop { 0% { opacity: 0; transform: scale(0.4) rotate(-30deg); } 60% { transform: scale(1.12) rotate(6deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }
        .wc-pop { animation: wcPop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>
    </div>
  );
}
