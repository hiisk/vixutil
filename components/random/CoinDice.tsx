'use client';
import { useState } from 'react';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

const DICE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function CoinDice({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_UI[lang];
  const [tab, setTab] = useState<'coin' | 'dice'>('coin');

  // 동전 — 내부 상태는 head/tail, 표시만 언어별
  const [coin, setCoin] = useState<'head' | 'tail' | null>(null);
  const [flipping, setFlipping] = useState(false);
  const coinFace = coin === 'head' ? ui.heads : coin === 'tail' ? ui.tails : null;
  function flip() {
    if (flipping) return;
    setFlipping(true);
    setCoin(null);
    window.setTimeout(() => {
      setCoin(Math.random() < 0.5 ? 'head' : 'tail');
      setFlipping(false);
    }, 700);
  }

  // 주사위
  const [diceCount, setDiceCount] = useState(1);
  const [dice, setDice] = useState<number[] | null>(null);
  const [rolling, setRolling] = useState(false);
  function roll() {
    if (rolling) return;
    setRolling(true);
    setDice(null);
    window.setTimeout(() => {
      setDice(Array.from({ length: diceCount }, () => 1 + Math.floor(Math.random() * 6)));
      setRolling(false);
    }, 600);
  }

  return (
    <div>
      <div className="flex gap-2 mb-6 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
        {(['coin', 'dice'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg py-2 text-sm font-bold transition-colors ${tab === t ? 'bg-white dark:bg-slate-700 text-fuchsia-600 dark:text-fuchsia-300 shadow' : 'text-slate-500 dark:text-slate-400'}`}
          >
            {t === 'coin' ? ui.coinTab : ui.diceTab}
          </button>
        ))}
      </div>

      {tab === 'coin' && (
        <div className="text-center">
          <div className={`mx-auto mb-6 flex items-center justify-center w-32 h-32 rounded-full bg-sec-soft text-4xl font-black shadow-lg ${flipping ? 'coin-spin' : ''}`}>
            {flipping || !coinFace ? '🪙' : coinFace}
          </div>
          {coinFace && !flipping && (
            <div className="wc-pop text-2xl font-black text-slate-800 dark:text-slate-100 mb-6">{ui.coinResult(coinFace)}</div>
          )}
          <button onClick={flip} disabled={flipping} className="w-full bg-sec font-black text-lg rounded-2xl py-4 hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-60">
            {flipping ? ui.flipping : ui.flip}
          </button>
        </div>
      )}

      {tab === 'dice' && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{ui.diceCount}</span>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => { setDiceCount(n); setDice(null); }}
                className={`w-8 h-8 rounded-lg text-sm font-bold transition-colors ${diceCount === n ? 'bg-fuchsia-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                {n}
              </button>
            ))}
          </div>
          <div className={`flex flex-wrap justify-center gap-3 mb-4 min-h-[5rem] items-center ${rolling ? 'dice-shake' : ''}`}>
            {(dice ?? Array.from({ length: diceCount }, () => 0)).map((d, i) => (
              <span key={i} className="text-6xl leading-none text-fuchsia-600 dark:text-fuchsia-300">
                {rolling || d === 0 ? '🎲' : DICE_FACES[d]}
              </span>
            ))}
          </div>
          {dice && !rolling && dice.length > 1 && (
            <div className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4">{ui.diceTotal(dice.reduce((a, b) => a + b, 0))}</div>
          )}
          <button onClick={roll} disabled={rolling} className="w-full bg-sec font-black text-lg rounded-2xl py-4 hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-60">
            {rolling ? ui.rolling : ui.roll}
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes coinSpin { 0% { transform: rotateY(0); } 100% { transform: rotateY(1440deg); } }
        .coin-spin { animation: coinSpin 0.7s ease-out; }
        @keyframes diceShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px) rotate(-4deg); } 75% { transform: translateX(4px) rotate(4deg); } }
        .dice-shake { animation: diceShake 0.15s linear infinite; }
        @keyframes wcPop { 0% { opacity: 0; transform: scale(0.7); } 100% { opacity: 1; transform: scale(1); } }
        .wc-pop { animation: wcPop 0.3s ease-out; }
      `}</style>
    </div>
  );
}
