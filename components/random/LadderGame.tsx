'use client';
import { useState } from 'react';
import { RANDOM_UI, type RandomLang } from '@/lib/random-ui-intl';

const ROWS = 9;
const COLORS = ['#f43f5e', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#ec4899', '#f97316', '#06b6d4'];

type Rungs = boolean[][]; // [level][gap] — gap g는 열 g와 g+1 사이

function buildRungs(cols: number): Rungs {
  const gaps = cols - 1;
  const rows: Rungs = [];
  for (let r = 0; r < ROWS; r++) {
    const row: boolean[] = new Array(gaps).fill(false);
    for (let g = 0; g < gaps; g++) {
      // 인접한 가로줄이 겹치면 경로가 모호해지므로, 바로 왼쪽 칸이 비었을 때만 배치
      if (g > 0 && row[g - 1]) continue;
      row[g] = Math.random() < 0.5;
    }
    rows.push(row);
  }
  return rows;
}

function trace(rungs: Rungs, start: number, cols: number): number[] {
  let pos = start;
  const path = [pos];
  for (let r = 0; r < ROWS; r++) {
    if (pos > 0 && rungs[r][pos - 1]) pos -= 1;
    else if (pos < cols - 1 && rungs[r][pos]) pos += 1;
    path.push(pos);
  }
  return path; // 길이 ROWS+1, 각 레벨 진입 후 열 위치
}

export default function LadderGame({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_UI[lang];
  const [names, setNames] = useState<string[]>([...ui.ladderNames]);
  const [results, setResults] = useState<string[]>([...ui.ladderResults]);
  const [rungs, setRungs] = useState<Rungs>(() => buildRungs(4));
  const [rungsCols, setRungsCols] = useState(4);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Record<number, number>>({});

  const cols = Math.max(names.length, results.length);

  // 열 개수가 바뀌면 effect 대신 렌더 중에 사다리를 새로 만든다(React 권장 패턴)
  if (rungsCols !== cols) {
    setRungs(buildRungs(cols));
    setRungsCols(cols);
    setSelected(null);
    setRevealed({});
  }

  function reset(c: number) {
    setRungs(buildRungs(c));
    setSelected(null);
    setRevealed({});
  }

  const W = 320, H = 300, padX = 30, padY = 20;
  const innerW = W - padX * 2;
  const x = (i: number) => (cols === 1 ? W / 2 : padX + (i * innerW) / (cols - 1));
  const yTop = padY, yBottom = H - padY;
  const rowH = (yBottom - yTop) / (ROWS + 1);
  const yLevel = (r: number) => yTop + (r + 1) * rowH;

  function pick(i: number) {
    if (i >= names.length) return;
    const path = trace(rungs, i, cols);
    setSelected(i);
    setRevealed(prev => ({ ...prev, [i]: path[path.length - 1] }));
  }

  // 선택된 경로의 폴리라인 좌표
  let pathPts = '';
  if (selected !== null) {
    const path = trace(rungs, selected, cols);
    const pts: [number, number][] = [[x(path[0]), yTop]];
    for (let r = 0; r < ROWS; r++) {
      pts.push([x(path[r]), yLevel(r)]);
      if (path[r + 1] !== path[r]) pts.push([x(path[r + 1]), yLevel(r)]);
    }
    pts.push([x(path[ROWS]), yBottom]);
    pathPts = pts.map(p => p.join(',')).join(' ');
  }

  function setName(i: number, v: string) { setNames(p => p.map((o, idx) => idx === i ? v : o)); setRevealed({}); setSelected(null); }
  function setResult(i: number, v: string) { setResults(p => p.map((o, idx) => idx === i ? v : o)); setRevealed({}); setSelected(null); }
  function addPair() {
    if (cols >= 8) return;
    setNames(p => [...p, ui.newPlayer(p.length + 1)]);
    setResults(p => [...p, ui.newResult]);
  }
  function removePair() {
    if (cols <= 2) return;
    setNames(p => p.slice(0, -1));
    setResults(p => p.slice(0, -1));
  }

  return (
    <div>
      {/* 이름 버튼 (출발) */}
      <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            disabled={i >= names.length}
            className={`text-[11px] font-bold rounded-lg py-1.5 px-0.5 truncate transition-colors ${selected === i ? 'text-white' : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/40'}`}
            style={selected === i ? { background: COLORS[i % COLORS.length] } : undefined}
          >
            {names[i] ?? ''}
          </button>
        ))}
      </div>

      {/* 사다리 */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {Array.from({ length: cols }).map((_, i) => (
          <line key={`v${i}`} x1={x(i)} y1={yTop} x2={x(i)} y2={yBottom} stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        ))}
        {rungs.map((row, r) =>
          row.map((on, g) => on ? (
            <line key={`h${r}-${g}`} x1={x(g)} y1={yLevel(r)} x2={x(g + 1)} y2={yLevel(r)} stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          ) : null)
        )}
        {selected !== null && (
          <polyline points={pathPts} fill="none" stroke={COLORS[selected % COLORS.length]} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>

      {/* 결과 라벨 */}
      <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => {
          const hit = selected !== null && revealed[selected] === i;
          return (
            <div
              key={i}
              className={`text-[11px] font-bold rounded-lg py-1.5 px-0.5 text-center truncate ${hit ? 'text-white' : 'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60'}`}
              style={hit ? { background: COLORS[selected % COLORS.length] } : undefined}
            >
              {results[i] ?? ''}
            </div>
          );
        })}
      </div>

      {/* 결과 문구 */}
      {selected !== null && (
        <div className="wc-pop text-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white py-4 mb-6">
          <span className="text-lg font-black">{names[selected]}</span>
          <span className="mx-2">→</span>
          <span className="text-lg font-black">{results[revealed[selected]]}</span>
        </div>
      )}

      <button
        onClick={() => reset(cols)}
        className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-black rounded-2xl py-3.5 mb-6 hover:-translate-y-0.5 hover:shadow-xl transition-all"
      >
        {ui.reshuffle}
      </button>

      {/* 편집 */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.players}</p>
          {names.map((v, i) => (
            <input key={i} value={v} onChange={e => setName(i, e.target.value)} placeholder={ui.playerPlaceholder(i + 1)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-400" />
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{ui.results}</p>
          {results.map((v, i) => (
            <input key={i} value={v} onChange={e => setResult(i, e.target.value)} placeholder={ui.resultPlaceholder(i + 1)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1.5 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-400" />
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={removePair} disabled={cols <= 2} className="flex-1 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-sm font-bold py-2 hover:border-violet-300 hover:text-violet-500 disabled:opacity-40 transition-colors">{ui.fewer}</button>
        <button onClick={addPair} disabled={cols >= 8} className="flex-1 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 text-sm font-bold py-2 hover:border-violet-300 hover:text-violet-500 disabled:opacity-40 transition-colors">{ui.more}</button>
      </div>

      <style jsx>{`
        @keyframes wcPop { 0% { opacity: 0; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
        .wc-pop { animation: wcPop 0.35s ease-out; }
      `}</style>
    </div>
  );
}
