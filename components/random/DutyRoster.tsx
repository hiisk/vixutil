'use client';
import { useState } from 'react';
import { dutyCounts, dutyRoster, type Duty } from '@/lib/random-more';
import { RANDOM_MORE_UI } from '@/lib/random-more-ui';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

const TURNS = [4, 7, 10, 14];
const PER = [1, 2, 3];

export default function DutyRosterTool({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_MORE_UI[lang];
  const common = RANDOM_UI[lang];
  const [text, setText] = useState(common.sampleNames.slice(0, 5).join('\n'));
  const [turns, setTurns] = useState(7);
  const [perTurn, setPerTurn] = useState(1);
  const [roster, setRoster] = useState<Duty[] | null>(null);

  const names = text.split(/[\n,]/).map(s => s.trim()).filter(Boolean);
  const counts = roster ? dutyCounts(roster) : {};

  const pill = (on: boolean) =>
    `rounded-xl border py-2.5 text-sm font-bold transition-colors ${
      on
        ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-rose-200'
    }`;

  return (
    <div>
      <textarea
        value={text}
        onChange={e => { setText(e.target.value); setRoster(null); }}
        rows={5}
        placeholder={common.listPlaceholder}
        className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-y"
      />
      <div className="mt-2 mb-4 text-xs text-slate-400">{common.peopleCount(names.length)}</div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.turns}</p>
      <div className="grid grid-cols-4 gap-2">
        {TURNS.map(n => (
          <button key={n} onClick={() => { setTurns(n); setRoster(null); }} className={pill(turns === n)}>{n}</button>
        ))}
      </div>

      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 mb-2">{ui.perTurn}</p>
      <div className="grid grid-cols-3 gap-2">
        {PER.map(n => (
          <button key={n} onClick={() => { setPerTurn(n); setRoster(null); }} className={pill(perTurn === n)}>{n}</button>
        ))}
      </div>

      <button
        onClick={() => setRoster(dutyRoster(names, turns, perTurn, Math.random))}
        disabled={names.length < 2}
        className="w-full mt-4 mb-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-lg rounded-2xl py-4 shadow-lg shadow-rose-200 dark:shadow-none hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50"
      >
        {ui.makeRoster} 📋
      </button>

      {roster && (
        <>
          <ol className="space-y-2">
            {roster.map(d => (
              <li
                key={d.turn}
                className="wc-slide flex items-center gap-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 px-4 py-3"
                style={{ animationDelay: `${d.turn * 50}ms` }}
              >
                <span className="shrink-0 w-9 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 text-white text-xs font-black flex items-center justify-center">
                  {d.turn + 1}{ui.turnNo}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-100 break-words">{d.people.join(' · ')}</span>
              </li>
            ))}
          </ol>

          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-5 mb-2">{ui.timesEach}</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(counts).map(([who, n]) => (
              <span key={who} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300">
                {who} {n}
              </span>
            ))}
          </div>
        </>
      )}

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-5 text-center">{ui.rosterNote}</p>

      <style jsx>{`
        @keyframes wcSlide { 0% { opacity: 0; transform: translateX(-12px); } 100% { opacity: 1; transform: translateX(0); } }
        .wc-slide { animation: wcSlide 0.35s ease-out both; }
      `}</style>
    </div>
  );
}
