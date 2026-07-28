'use client';
import { useState } from 'react';

function parse(text: string): string[] {
  return text.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function RandomPicker() {
  const [text, setText] = useState('철수\n영희\n민수\n지연\n현우\n서준');
  const [count, setCount] = useState(1);
  const [winners, setWinners] = useState<string[] | null>(null);

  const items = parse(text);
  const max = Math.max(1, items.length);
  const c = Math.min(count, max);

  function draw() {
    if (items.length === 0) return;
    setWinners(shuffle(items).slice(0, c));
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={e => { setText(e.target.value); setWinners(null); }}
        rows={6}
        placeholder="한 줄에 하나씩, 또는 쉼표로 구분해 입력하세요"
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y"
      />
      <div className="flex items-center justify-between mt-2 mb-4 text-xs text-slate-400">
        <span>총 {items.length}명 · {c}명 뽑기</span>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">뽑을 인원</span>
        <input
          type="number" min={1} max={max} value={count}
          onChange={e => setCount(Math.max(1, Math.min(max, Number(e.target.value) || 1)))}
          className="w-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1.5 text-sm text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <button
        onClick={draw}
        disabled={items.length === 0}
        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-lg rounded-2xl py-4 mb-6 shadow-lg shadow-amber-200 dark:shadow-none hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50"
      >
        🎯 뽑기
      </button>

      {winners && (
        <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white p-5 text-center">
          <div className="text-xs font-bold text-amber-100 mb-3">당첨 🎉</div>
          <div className="flex flex-wrap justify-center gap-2">
            {winners.map((w, i) => (
              <span key={i} className="wc-pop inline-block bg-white/25 rounded-full px-4 py-2 text-lg font-black" style={{ animationDelay: `${i * 80}ms` }}>
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes wcPop { 0% { opacity: 0; transform: scale(0.6); } 60% { transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); } }
        .wc-pop { animation: wcPop 0.4s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>
    </div>
  );
}
