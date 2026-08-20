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

/** 자기 자신에게 배정되지 않는 순열(교란순열)을 만든다. */
function derange(names: string[]): Record<string, string> {
  const n = names.length;
  for (let attempt = 0; attempt < 1000; attempt++) {
    const idx = shuffle([...names.keys()]);
    if (idx.every((t, i) => t !== i)) {
      const map: Record<string, string> = {};
      names.forEach((g, i) => { map[g] = names[idx[i]]; });
      return map;
    }
  }
  // 안전장치: 한 칸씩 밀기(항상 자기 자신 제외)
  const map: Record<string, string> = {};
  names.forEach((g, i) => { map[g] = names[(i + 1) % n]; });
  return map;
}

export default function SecretSanta({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_UI[lang];
  const [text, setText] = useState(ui.sampleNames.slice(0, 5).join('\n'));
  const [assign, setAssign] = useState<Record<string, string> | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [openFor, setOpenFor] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  const names = parse(text);
  const dupWarning = new Set(names).size !== names.length;

  function run() {
    if (names.length < 3 || dupWarning) return;
    setAssign(derange(names));
    setOrder(names);
    setSeen(new Set());
    setOpenFor(null);
    setRevealed(false);
  }

  function open(name: string) {
    setOpenFor(name);
    setRevealed(false);
  }
  function close() {
    if (openFor) setSeen(prev => new Set(prev).add(openFor));
    setOpenFor(null);
    setRevealed(false);
  }

  return (
    <div>
      {!assign && (
        <>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={6}
            placeholder={ui.santaPlaceholder}
            className="fld w-full focus:ring-2 focus:ring-rose-400 resize-y"
          />
          <div className="mt-2 mb-4 text-xs text-slate-500 dark:text-slate-400">{ui.peopleCount(names.length)}</div>
          {dupWarning && <p className="text-xs text-rose-500 mb-3">{ui.santaDuplicate}</p>}
          <button
            onClick={run}
            disabled={names.length < 3 || dupWarning}
            className="w-full bg-sec font-bold text-lg rounded-lg py-4 shadow-sm shadow-rose-200 dark:shadow-none hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {ui.santaDraw}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            {ui.santaHint}
          </p>
        </>
      )}

      {assign && (
        <>
          <div className="text-center mb-4">
            <div className="text-sm font-bold text-rose-600">{ui.santaMatched}</div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ui.santaTapName}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
            {order.map(name => (
              <button
                key={name}
                onClick={() => open(name)}
                className={`relative rounded-xl py-3 px-2 text-sm font-bold border transition-all ${seen.has(name)
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-rose-200 dark:border-rose-900/50 hover:-translate-y-0.5 hover:shadow'}`}
              >
                {seen.has(name) && <span className="absolute top-1 right-1.5 text-[11px]">✅</span>}
                {name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setAssign(null)}
            className="w-full border-2 border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-300 font-bold rounded-lg py-3 hover:bg-sec-soft transition-colors"
          >
            {ui.drawAgain}
          </button>

          {/* 확인 패널 (인라인 카드, 오버레이 아님) */}
          {openFor && (
            <div className="ss-pop mt-5 rounded-lg border-2 border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/20 p-6 text-center">
              <div className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3">{ui.santaOnly(openFor)}</div>
              {!revealed ? (
                <button
                  onClick={() => setRevealed(true)}
                  className="w-full bg-sec font-bold rounded-xl py-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  {ui.santaReveal}
                </button>
              ) : (
                <>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{ui.santaYourMatch}</div>
                  <div className="text-3xl font-bold text-rose-600 dark:text-rose-300 mb-4">{assign[openFor]}</div>
                  <button
                    onClick={close}
                    className="w-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold rounded-xl py-2.5 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  >
                    {ui.santaGotIt}
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes ssPop { 0% { opacity: 0; transform: translateY(8px) scale(0.98); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .ss-pop { animation: ssPop 0.3s ease-out; }
      `}</style>
    </div>
  );
}
