'use client';
import { useState, useRef } from 'react';
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

const CONFETTI = ['🎉', '🎊', '✨', '🎈', '⭐', '💫'];

export default function RandomPicker({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_UI[lang];
  const [text, setText] = useState(ui.sampleNames.slice(0, 6).join('\n'));
  const [count, setCount] = useState(1);
  const [winners, setWinners] = useState<string[] | null>(null);
  const [rolling, setRolling] = useState(false);
  const [flash, setFlash] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const items = parse(text);
  const max = Math.max(1, items.length);
  const c = Math.min(count, max);

  function draw() {
    if (rolling || items.length === 0) return;
    setWinners(null);
    setRolling(true);
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const totalMs = 1600;
    let elapsed = 0;
    let delay = 60;
    const tick = () => {
      setFlash(items[Math.floor(Math.random() * items.length)]);
      elapsed += delay;
      delay = Math.min(delay * 1.18, 240);
      if (elapsed < totalMs) {
        timers.current.push(setTimeout(tick, delay));
      } else {
        setWinners(shuffle(items).slice(0, c));
        setRolling(false);
      }
    };
    tick();
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={e => { setText(e.target.value); setWinners(null); }}
        rows={6}
        placeholder={ui.listPlaceholder}
        className="fld w-full focus:ring-2 focus:ring-amber-400 resize-y"
      />
      <div className="flex items-center justify-between mt-2 mb-4 text-xs text-slate-400">
        <span>{ui.pickLine(items.length, c)}</span>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{ui.howMany}</span>
        <input
          type="number" min={1} max={max} value={count}
          onChange={e => setCount(Math.max(1, Math.min(max, Number(e.target.value) || 1)))}
          className="w-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1.5 text-sm text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div className="relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white min-h-[7rem] flex flex-col items-center justify-center p-5">
        {rolling ? (
          <>
            <div className="text-xs font-bold text-amber-100 mb-1 tracking-widest">🥁 {ui.drumroll}</div>
            <div className="rp-shake text-3xl font-black drop-shadow">{flash || '?'}</div>
          </>
        ) : winners ? (
          <>
            <div className="text-xs font-bold text-amber-100 mb-2">{ui.winner}</div>
            <div className="flex flex-wrap justify-center gap-2">
              {winners.map((w, i) => (
                <span key={i} className="rp-pop relative inline-block bg-white/25 rounded-full px-4 py-2 text-lg font-black" style={{ animationDelay: `${i * 120}ms` }}>
                  <span className="absolute -top-2 -right-1 text-sm">{CONFETTI[i % CONFETTI.length]}</span>
                  {w}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="text-lg font-black text-white/90">{ui.whoWillIt}</div>
        )}
      </div>

      <button
        onClick={draw}
        disabled={items.length === 0 || rolling}
        className="w-full bg-sec font-black text-lg rounded-2xl py-4 shadow-lg shadow-amber-200 dark:shadow-none hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {rolling ? ui.drawing : winners ? ui.drawAgain : ui.draw}
      </button>

      <style jsx>{`
        @keyframes rpShake { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-3px) scale(1.06); } }
        .rp-shake { animation: rpShake 0.12s ease-in-out infinite; }
        @keyframes rpPop { 0% { opacity: 0; transform: scale(0.4) rotate(-8deg); } 60% { transform: scale(1.12) rotate(3deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }
        .rp-pop { animation: rpPop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>
    </div>
  );
}
