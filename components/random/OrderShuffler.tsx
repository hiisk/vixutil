'use client';
import { useState } from 'react';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

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

export default function OrderShuffler({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_UI[lang];
  const [text, setText] = useState(ui.sampleNames.slice(0, 5).join('\n'));
  const [order, setOrder] = useState<string[] | null>(null);

  const items = parse(text);

  function run() {
    if (items.length < 2) return;
    setOrder(shuffle(items));
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={e => { setText(e.target.value); setOrder(null); }}
        rows={6}
        placeholder={ui.listPlaceholder}
        className="fld w-full focus:ring-2 focus:ring-cyan-400 resize-y"
      />
      <div className="mt-2 mb-4 text-xs text-slate-400">{ui.itemCount(items.length)}</div>

      <button
        onClick={run}
        disabled={items.length < 2}
        className="w-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-black text-lg rounded-2xl py-4 mb-6 shadow-lg shadow-cyan-200 dark:shadow-none hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50"
      >
        {ui.shuffleOrder}
      </button>

      {order && (
        <ol className="space-y-2">
          {order.map((item, i) => (
            <li
              key={i}
              className="wc-slide flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 px-4 py-3"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 text-white text-sm font-black">{i + 1}</span>
              <span className="font-bold text-slate-800 dark:text-slate-100">{item}</span>
            </li>
          ))}
        </ol>
      )}

      <style jsx>{`
        @keyframes wcSlide { 0% { opacity: 0; transform: translateX(-12px); } 100% { opacity: 1; transform: translateX(0); } }
        .wc-slide { animation: wcSlide 0.35s ease-out both; }
      `}</style>
    </div>
  );
}
