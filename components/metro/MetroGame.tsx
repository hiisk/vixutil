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
/**
 * 역 하나에 주는 힌트 — 첫 글자, 글자 수, 옆 역.
 *
 * 기점에서는 둘뿐이다. 세 번째가 "옆 역"인데 앞 역이 없어서, 그대로 두면 두
 * 번째와 똑같은 글자 수 힌트가 한 번 더 나온다. 남은 횟수는 세는데 얻는 것이
 * 없으니 쓰는 사람에게는 버튼이 헛도는 것으로 보인다.
 */
const hintsFor = (at: number) => (at > 0 ? 3 : 2);

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
  /**
   * 힌트는 역마다 첫 글자 → 글자 수 → 옆 역 순으로 셋뿐이다.
   *
   * 예전에는 누른 횟수를 게임 전체로 세어 3으로 나눈 나머지를 단계로 썼다.
   * 그래서 앞 역에서 두 번 썼으면 다음 역은 첫 글자가 아니라 "옆 역"부터
   * 나왔고, 세 번을 넘겨 계속 누르면 같은 셋이 끝없이 돌았다. 어느 쪽도
   * 쓰는 사람에게는 고장으로 보인다 — 역이 바뀌면 단계도 처음으로 돌린다.
   */
  const [hintStep, setHintStep] = useState<{ at: number; step: number }>({ at: 0, step: 0 });
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

  /** 이 역에서 이미 쓴 힌트 수 — 역이 바뀌면 0부터다 */
  const usedHere = hintStep.at === at ? hintStep.step : 0;
  const hintsHere = hintsFor(at);
  const hintsLeft = hintsHere - usedHere;

  const showHint = () => {
    if (!target || hintsLeft <= 0) return;
    setHints(h => h + 1);
    setHintStep({ at, step: usedHere + 1 });
    if (startedAt === null) setStartedAt(Date.now());
    const before = at > 0 ? line.stations[at - 1] : null;
    setFlash({
      kind: 'hint',
      text: usedHere === 0 ? ui.hintFirst(firstChar(target))
        : usedHere === 1 ? ui.hintLen(charCount(target))
        : ui.hintNear(before!.name),
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
    setStartedAt(null); setNow(0); setHints(0); setHintStep({ at: 0, step: 0 }); setRevealed(false);
    inputRef.current?.focus();
  };

  const reveal = () => { setAt(total); setRevealed(true); };

  const tone = flash?.kind === 'ok' ? 'text-emerald-600'
    : flash?.kind === 'no' ? 'text-rose-500'
    : 'text-slate-500 dark:text-slate-400';

  return (
    <div>
      {/*
        노선도를 무대로 쓴다 — 지도를 크게 깔고 입력창과 계기를 그 위에 얹는다.
        지도가 작고 입력창이 따로 있을 때는 눈이 두 곳을 오갔고, 다음 역이 어디로
        가는지 보려면 시선을 올려야 했다. 이렇게 두면 치는 자리 바로 위에서 선이
        흐르고 화면이 따라 움직인다.
      */}
      <div className="relative rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 overflow-hidden shadow-sm">
        <MetroMap line={line} solved={solved} focus={Math.min(at, total - 1)} lang={lang} />

        {/* 진행 막대는 카드 맨 위에 실선으로 — 계기 넷을 다시 읽지 않아도 보인다 */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-slate-200/70 dark:bg-slate-800/70">
          <div
            className="h-full [transition:width_250ms_ease-out]"
            style={{ width: `${(at / total) * 100}%`, background: line.color }}
          />
        </div>

        <div className="absolute inset-x-0 top-0 p-3 flex items-start gap-1.5 pointer-events-none">
          <Pill value={ui.solvedOf(at, total)} label={ui.stations} color={line.color} />
          <Pill value={clock(elapsed)} label={ui.elapsed} />
          <span className="ml-auto flex gap-1.5">
            <Pill value={perMin === null ? '—' : `${perMin}`} label={ui.perMin} />
            <Pill value={`${accuracy}%`} label={ui.accuracy} />
          </span>
        </div>

        {/* 아래쪽 그러데이션 — 선과 역 이름 위에 글자를 얹어도 읽히게 한다 */}
        <div className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-slate-50 via-slate-50/95 dark:from-slate-900 dark:via-slate-900/95 to-transparent">
          <div className="flex items-center justify-center gap-2 mb-1.5 min-h-[1.25rem]">
            {flash ? (
              <span className={`text-sm font-black ${tone}`} data-metro-flash>{flash.text}</span>
            ) : (
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                {finished ? '' : ui.nextIs(at + 1, total)}
              </span>
            )}
            {hints > 0 && <span className="text-[11px] text-slate-400 dark:text-slate-500">{ui.hintUsed(hints)}</span>}
          </div>

          {!finished ? (
            <form className="flex gap-2" onSubmit={onSubmit}>
              <input
                ref={inputRef}
                value={value}
                onChange={e => onType(e.target.value)}
                placeholder={ui.placeholder}
                data-metro-input
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="flex-1 min-w-0 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-3.5 text-base font-black text-slate-800 dark:text-slate-100 text-center placeholder:font-normal placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none shadow-sm"
                style={{ borderColor: value.length > 0 ? line.color : undefined }}
              />
              <button
                type="button"
                onClick={skip}
                className="shrink-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur px-4 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:border-rose-300 transition-colors"
              >
                {ui.skip}
              </button>
            </form>
          ) : (
            <div className="rounded-2xl px-5 py-4 text-center text-white shadow-sm" style={{ background: line.color }}>
              <p className="text-lg font-black" data-metro-done>{revealed ? ui.giveUp : ui.done}</p>
              {!revealed && (
                <p className="text-sm text-white/85 mt-0.5">
                  {ui.doneIn(clock(elapsed))} · {ui.accuracy} {accuracy}%
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <button
          onClick={showHint}
          disabled={finished || hintsLeft <= 0}
          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-slate-400 disabled:opacity-40 transition-colors"
        >
          {ui.hint}{finished ? '' : ` ${hintsLeft}/${hintsHere}`}
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

      <div className="mt-5 rounded-2xl border chip-off px-4 py-3.5">
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

/** 지도 위에 얹는 작은 계기 — 지도를 가리지 않게 반투명하고 낮게 만든다 */
function Pill({ value, label, color }: { value: string; label: string; color?: string }) {
  return (
    <span className="rounded-xl bg-white/85 dark:bg-slate-900/85 backdrop-blur border border-slate-200/80 dark:border-slate-700/80 px-2.5 py-1 text-center leading-tight">
      <span className="block text-xs font-black tabular-nums" style={color ? { color } : undefined}>{value}</span>
      <span className="block text-[9px] text-slate-400 dark:text-slate-500">{label}</span>
    </span>
  );
}
