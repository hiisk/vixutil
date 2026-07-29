'use client';
import { useState } from 'react';

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

export default function NumberPicker({ lang = 'ko' }: { lang?: 'ko' | 'en' | 'zh' }) {
  const ko = lang === 'ko';
  const zh = lang === 'zh';
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
        {num(min, setMin, ko ? '최소' : zh ? '最小' : 'Min')}
        {num(max, setMax, ko ? '최대' : zh ? '最大' : 'Max')}
        {num(count, v => setCount(Math.max(1, v)), ko ? '개수' : zh ? '数量' : 'Count')}
      </div>
      <label className="flex items-center gap-2 mb-5 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
        <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} className="w-4 h-4 accent-emerald-500" />
        {ko ? '중복 없이 뽑기' : zh ? '不重复' : 'No duplicates'}
      </label>

      <button
        onClick={draw}
        className="w-full bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-black text-lg rounded-2xl py-4 mb-3 shadow-lg shadow-emerald-200 dark:shadow-none hover:-translate-y-0.5 hover:shadow-xl transition-all"
      >
        {ko ? '🔢 숫자 뽑기' : zh ? '🔢 生成数字' : '🔢 Generate numbers'}
      </button>
      <button
        onClick={lotto}
        className="w-full border-2 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-300 font-bold rounded-2xl py-3 mb-6 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
      >
        {ko ? '🍀 로또 번호 (1~45 중 6개)' : zh ? '🍀 彩票号码（1~45 选 6）' : '🍀 Lottery (6 of 1–45)'}
      </button>

      {result && (
        <div className="rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white p-6 text-center">
          <div className="text-xs font-bold text-emerald-100 mb-3">{isLotto ? (ko ? '이번 주 행운의 번호 🍀' : zh ? '你的幸运号码 🍀' : 'Your lucky numbers 🍀') : (ko ? '결과' : zh ? '结果' : 'Result')}</div>
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
