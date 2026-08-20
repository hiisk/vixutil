'use client';
import { useState } from 'react';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

/* 팀 색 — 여기서는 색이 «몇 팀인가»를 나르므로 갈래 색 하나로 합칠 수 없다.
   그라디언트만 걷고 단색으로 둔다. */
const TEAM_COLORS = ['#e11d48', '#0284c7', '#059669', '#d97706', '#7c3aed', '#c026d3'];

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
      <div className="mt-2 mb-4 text-xs text-slate-500 dark:text-slate-400">{ui.peopleCount(members.length)}</div>

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
        className="w-full bg-sec font-bold text-lg rounded-lg py-4 mb-6 shadow-sm shadow-sky-200 dark:shadow-none hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all disabled:opacity-50"
      >
        {ui.makeTeams}
      </button>

      {teams && (
        <div className="grid grid-cols-2 gap-3">
          {teams.map((team, i) => (
            <div key={i}
              className="wc-pop rounded-lg p-4 text-white"
              style={{ background: TEAM_COLORS[i % TEAM_COLORS.length], animationDelay: `${i * 70}ms` }}>
              <div className="text-xs font-bold text-white/80 mb-2">{ui.teamLabel(i + 1, team.length)}</div>
              <div className="flex flex-wrap gap-1.5">
                {team.map((m, j) => (
                  <span key={j} className="inline-block bg-white dark:bg-slate-900/25 rounded-full px-2.5 py-1 text-sm font-bold">{m}</span>
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
