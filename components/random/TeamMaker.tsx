'use client';
import { useState } from 'react';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

const TEAM_COLORS = ['from-rose-500 to-pink-600', 'from-sky-500 to-blue-600', 'from-emerald-400 to-teal-600', 'from-amber-400 to-orange-500', 'from-violet-500 to-purple-600', 'from-fuchsia-500 to-rose-500'];

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

export default function TeamMaker({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_UI[lang];
  const [text, setText] = useState(ui.sampleNames.join('\n'));
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][] | null>(null);

  const members = parse(text);
  const maxTeams = Math.max(2, Math.min(6, members.length));
  const tc = Math.min(teamCount, maxTeams);

  function make() {
    if (members.length < 2) return;
    const shuffled = shuffle(members);
    const result: string[][] = Array.from({ length: tc }, () => []);
    shuffled.forEach((m, i) => result[i % tc].push(m));
    setTeams(result);
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={e => { setText(e.target.value); setTeams(null); }}
        rows={6}
        placeholder={ui.listPlaceholder}
        className="fld w-full focus:ring-2 focus:ring-sky-400 resize-y"
      />
      <div className="mt-2 mb-4 text-xs text-slate-400">{ui.peopleCount(members.length)}</div>

      <div className="flex items-center gap-2 mb-5">
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{ui.teamCount}</span>
        <input
          type="number" min={2} max={maxTeams} value={teamCount}
          onChange={e => setTeamCount(Math.max(2, Math.min(maxTeams, Number(e.target.value) || 2)))}
          className="w-20 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1.5 text-sm text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <button
        onClick={make}
        disabled={members.length < 2}
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-lg rounded-2xl py-4 mb-6 shadow-lg shadow-sky-200 dark:shadow-none hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-50"
      >
        {ui.makeTeams}
      </button>

      {teams && (
        <div className="grid grid-cols-2 gap-3">
          {teams.map((team, i) => (
            <div key={i} className={`wc-pop rounded-2xl bg-gradient-to-br ${TEAM_COLORS[i % TEAM_COLORS.length]} text-white p-4`} style={{ animationDelay: `${i * 70}ms` }}>
              <div className="text-xs font-bold text-white/80 mb-2">{ui.teamLabel(i + 1, team.length)}</div>
              <div className="flex flex-wrap gap-1.5">
                {team.map((m, j) => (
                  <span key={j} className="inline-block bg-white/25 rounded-full px-2.5 py-1 text-sm font-bold">{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes wcPop { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
        .wc-pop { animation: wcPop 0.35s ease-out both; }
      `}</style>
    </div>
  );
}
