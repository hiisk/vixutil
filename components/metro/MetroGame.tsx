'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import MetroMap from './MetroMap';
import { charCount, firstChar, matches, type MetroLine } from '@/lib/metro/types';
import { METRO_UI, clock } from '@/lib/metro/ui';
import type { MetroLang } from '@/lib/metro/lang';

/**
 * 역 이름 타이핑 — 기점부터 순서대로 다음 역을 쳐 나간다.
 *
 * 아무 순서로나 받는 방식도 만들어 봤지만 노선도가 움직이지 않아 힌트가 죽었다.
 * 순서대로 치면 맞힐 역이 늘 하나로 정해지므로 노선도가 매번 그 역으로 따라가고,
 * 이미 지나온 역이 화면에 남아 다음 역을 떠올리는 실마리가 된다.
 *
 * 엔터를 누르지 않아도 다 치는 순간 넘어간다. 타이핑 게임에서 한 역마다 엔터를
 * 요구하면 흐름이 끊긴다.
 *
 * 시각은 마운트 뒤에 센다 — 서버에는 지금 시각이 없어서 SSR과 어긋나면
 * 하이드레이션이 깨진다.
 */
export default function MetroGame({ line, lang }: { line: MetroLine; lang: MetroLang }) {
  const ui = METRO_UI[lang];
  const total = line.stations.length;

  const [at, setAt] = useState(0);
  const [value, setValue] = useState('');
  const [miss, setMiss] = useState(0);
  const [flash, setFlash] = useState<{ kind: 'ok' | 'no' | 'hint'; text: string } | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [hints, setHints] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const finished = at >= total;
  const target = finished ? null : line.stations[at];
  const solved = useMemo(() => line.stations.map((_, i) => i < at), [line.stations, at]);

  useEffect(() => {
    if (startedAt === null || finished) return;
    const tick = () => setNow(Date.now());
    const id = window.setInterval(tick, 1000);
    const first = window.setTimeout(tick, 0);
    return () => { window.clearInterval(id); window.clearTimeout(first); };
  }, [startedAt, finished]);

  const elapsed = startedAt === null ? 0 : Math.max(0, now - startedAt);
  // 10초는 지나야 의미가 있다. 2초에 두 역을 치면 분당 60역이라고 나와 우습다.
  const perMin = elapsed >= 10000 ? Math.round((at / (elapsed / 60000)) * 10) / 10 : null;
  const accuracy = at + miss > 0 ? Math.round((at / (at + miss)) * 100) : 100;

  /** 한 글자 칠 때마다 본다 — 다 치면 엔터 없이 넘어간다 */
  const onType = (raw: string) => {
    setValue(raw);
    if (startedAt === null && raw.length > 0) setStartedAt(Date.now());
    if (!target) return;
    if (matches(raw, target)) {
      setAt(i => i + 1);
      setValue('');
      setFlash({ kind: 'ok', text: target.name });
    }
  };

  /** 엔터를 눌렀는데 안 맞으면 오타로 센다 */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target || value.trim().length === 0) return;
    setMiss(m => m + 1);
    setFlash({ kind: 'no', text: ui.wrongTry });
  };

  const showHint = () => {
    if (!target) return;
    setHints(h => h + 1);
    if (startedAt === null) setStartedAt(Date.now());
    const before = at > 0 ? line.stations[at - 1] : null;
    const step = hints % 3;
    setFlash({
      kind: 'hint',
      text: step === 0 ? ui.hintFirst(firstChar(target))
        : step === 1 ? ui.hintLen(charCount(target))
        : before ? ui.hintNear(before.name) : ui.hintLen(charCount(target)),
    });
  };

  const skip = () => {
    if (!target) return;
    setMiss(m => m + 1);
    setAt(i => i + 1);
    setValue('');
    setFlash({ kind: 'no', text: target.name });
  };

  const reset = () => {
    setAt(0); setValue(''); setMiss(0); setFlash(null);
    setStartedAt(null); setNow(0); setHints(0); setRevealed(false);
    inputRef.current?.focus();
  };

  const reveal = () => { setAt(total); setRevealed(true); };

  const tone = flash?.kind === 'ok' ? 'text-emerald-600'
    : flash?.kind === 'no' ? 'text-rose-500'
    : 'text-slate-500 dark:text-slate-400';

  return (
    <div>
      <MetroMap line={line} solved={solved} focus={Math.min(at, total - 1)} lang={lang} />

      <div className="grid grid-cols-4 gap-2 mt-3">
        <Stat value={ui.solvedOf(at, total)} label={ui.stations} color={line.color} />
        <Stat value={clock(elapsed)} label={ui.elapsed} />
        <Stat value={perMin === null ? '—' : `${perMin}`} label={ui.perMin} />
        <Stat value={`${accuracy}%`} label={ui.accuracy} />
      </div>

      <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full [transition:width_250ms_ease-out]"
          style={{ width: `${(at / total) * 100}%`, background: line.color }}
        />
      </div>

      {!finished ? (
        <>
          <p className="mt-4 text-center text-xs font-bold text-slate-400 dark:text-slate-500">
            {ui.nextIs(at + 1, total)}
          </p>
          <form className="mt-2 flex gap-2" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={value}
              onChange={e => onType(e.target.value)}
              placeholder={ui.placeholder}
              data-metro-input
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 min-w-0 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-base font-black text-slate-800 dark:text-slate-100 text-center placeholder:font-normal placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none"
              style={{ borderColor: value.length > 0 ? line.color : undefined }}
            />
            <button
              type="button"
              onClick={skip}
              className="shrink-0 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-xs font-bold text-slate-500 dark:text-slate-400 hover:border-rose-300 transition-colors"
            >
              {ui.skip}
            </button>
          </form>
        </>
      ) : (
        <div className="mt-4 rounded-2xl px-5 py-6 text-center text-white" style={{ background: line.color }}>
          <p className="text-lg font-black" data-metro-done>{revealed ? ui.giveUp : ui.done}</p>
          {!revealed && (
            <p className="text-sm text-white/85 mt-1">
              {ui.doneIn(clock(elapsed))} · {ui.accuracy} {accuracy}%
            </p>
          )}
        </div>
      )}

      <div className="mt-2 flex items-center gap-2 flex-wrap min-h-[1.75rem]">
        {flash && <span className={`text-sm font-bold ${tone}`} data-metro-flash>{flash.text}</span>}
        {hints > 0 && <span className="text-xs text-slate-400 dark:text-slate-500">{ui.hintUsed(hints)}</span>}
      </div>

      <div className="mt-2 flex gap-2">
        <button
          onClick={showHint}
          disabled={finished}
          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-slate-400 disabled:opacity-40 transition-colors"
        >
          {ui.hint}
        </button>
        <button
          onClick={reveal}
          disabled={finished}
          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-rose-300 disabled:opacity-40 transition-colors"
        >
          {ui.giveUp}
        </button>
        <button
          onClick={reset}
          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-slate-400 transition-colors"
        >
          {ui.restart}
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3.5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.listTitle}</p>
        <div className="flex flex-wrap gap-1.5">
          {line.stations.map((st, i) => (
            <span
              key={st.name + i}
              className={`text-xs font-bold px-2 py-1 rounded-lg ${
                i < at ? 'text-white'
                  : i === at ? 'text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700'
                  : 'text-slate-300 dark:text-slate-600 bg-slate-100 dark:bg-slate-800'
              }`}
              style={i < at ? { background: line.color } : undefined}
            >
              {i < at ? st.name : '·'.repeat(charCount(st))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-2.5 text-center">
      <p className="text-sm font-black tabular-nums" style={color ? { color } : undefined}>{value}</p>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}
