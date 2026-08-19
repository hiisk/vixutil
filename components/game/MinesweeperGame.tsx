'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, lower, useBest } from './ui';
import {
  LEVELS, LEVEL_ORDER, bbbv, markAt, newBoard, openAt, remaining,
  type Board, type Level,
} from '@/lib/minesweeper';
import { MINESWEEPER_UI } from '@/lib/minesweeper-ui';
import { type GameLang } from '@/lib/game-ui-intl';

/**
 * 지뢰찾기 — 셈은 lib/minesweeper.ts에 있고 여기는 그리는 일만 한다.
 *
 * ── 이모지를 안 쓴다 ────────────────────────────────────────
 * 깃발과 지뢰는 아래 인라인 SVG로 그린다. 이 저장소는 공유 카드에서 컬러
 * 이모지가 걷혀 나가는 문제를 겪었고, 무엇보다 칸 크기가 24px까지 내려가는
 * 고급 판에서는 이모지가 글자보다 커서 칸을 넘친다.
 *
 * ── 휴대폰에서 깃발 ─────────────────────────────────────────
 * 오른쪽 클릭이 없으므로 두 길을 둔다. 위의 깃발 단추를 켜면 그냥 눌러서
 * 꽂히고, 켜지 않아도 길게 누르면 꽂힌다. 둘 중 하나만 두면 안 된다 —
 * 단추만 두면 열 때마다 모드를 오가야 하고, 길게 누르기만 두면 그런 조작이
 * 있는 줄 아무도 모른다.
 */

/** 렌더 스코프에서 Math.random을 부르면 린트가 막는다 — 바깥에 두고 부른다 */
const newSeed = () => Math.floor(Math.random() * 0x100000000) >>> 0;

/** 난이도마다 칸 크기가 다르다. 고급 30칸은 좁은 화면을 넘으므로 그 안에서 밀린다 */
const CELL: Record<Level, number> = { beginner: 34, intermediate: 28, expert: 24 };

/** 숫자 색은 원래 판의 관용을 따른다 — 1은 파랑, 2는 초록, 3은 빨강 */
const NUM_COLOR = [
  '', 'text-blue-600 dark:text-blue-400', 'text-emerald-600 dark:text-emerald-400',
  'text-rose-600 dark:text-rose-400', 'text-indigo-700 dark:text-indigo-400',
  'text-amber-700 dark:text-amber-500', 'text-teal-600 dark:text-teal-400',
  'text-slate-700 dark:text-slate-200', 'text-slate-500 dark:text-slate-400',
];

function FlagIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-[70%] h-[70%]" fill="none" aria-hidden="true">
      <path d="M4.5 14h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 14V2.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8.6 2.6l4.6 2.1-4.6 2.1z" fill="currentColor" />
    </svg>
  );
}

function MineIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-[72%] h-[72%]" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none">
        <path d="M8 1.6v12.8M1.6 8h12.8M3.5 3.5l9 9M12.5 3.5l-9 9" />
      </g>
      <circle cx="8" cy="8" r="3.3" fill="currentColor" />
    </svg>
  );
}

/** 0:00 — 어느 언어에서도 그대로 읽히므로 단위 낱말을 안 붙인다 */
const clock = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

export default function MinesweeperGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = MINESWEEPER_UI[lang];
  const [level, setLevel] = useState<Level>('beginner');
  const [board, setBoard] = useState<Board>(() => newBoard(LEVELS.beginner, newSeed()));
  const [flagMode, setFlagMode] = useState(false);
  const [sec, setSec] = useState(0);
  const { best, submit } = useBest(`minesweeper-${level}`, lower);

  /** 길게 누르기 — 시간이 다 차면 깃발을 꽂고, 뒤따라오는 클릭은 흘린다 */
  const hold = useRef<number | null>(null);
  const held = useRef(false);
  const clearHold = () => {
    if (hold.current !== null) window.clearTimeout(hold.current);
    hold.current = null;
  };
  useEffect(() => clearHold, []);

  const running = board.status === 'playing';

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSec(v => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const reset = useCallback((lv: Level) => {
    clearHold();
    setLevel(lv);
    setBoard(newBoard(LEVELS[lv], newSeed()));
    setSec(0);
  }, []);

  const dig = (i: number) => {
    const next = openAt(board, i);
    setBoard(next);
    if (next.status === 'won') submit(sec);
  };

  const flag = (i: number) => setBoard(markAt(board, i));

  const tap = (i: number) => {
    // 길게 눌러 이미 깃발을 꽂았으면 뒤따라오는 클릭은 흘린다
    if (held.current) { held.current = false; return; }
    if (flagMode) flag(i); else dig(i);
  };

  const pressStart = (i: number, button: number) => {
    held.current = false;
    clearHold();
    // 오른쪽 단추는 onContextMenu가 이미 꽂는다 — 여기서 또 꽂으면 물음표로 넘어간다
    if (button !== 0) return;
    hold.current = window.setTimeout(() => { held.current = true; flag(i); }, 450);
  };

  const size = CELL[level];
  const done = board.status === 'won' || board.status === 'lost';
  const clicks = board.placed ? bbbv(board) : null;

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {LEVEL_ORDER.map(lv => (
          <button
            key={lv}
            onClick={() => reset(lv)}
            className={`rounded-xl border py-2.5 text-xs font-bold transition-colors ${
              lv === level
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            {ui[`level_${lv}`]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        <Stat label={ui.minesLeft} value={remaining(board)} accent="text-rose-600" />
        <Stat label={ui.time} value={clock(sec)} />
        <Stat label={ui.bestTime} value={best === null ? '—' : clock(best)} accent="text-indigo-600" />
        <Stat label={ui.clicks} value={clicks ?? '—'} />
      </div>

      <div className="flex gap-2 mt-3">
        <div className="grid grid-cols-2 gap-1 flex-1 rounded-xl border border-slate-200 dark:border-slate-700 p-1">
          {([false, true] as const).map(mode => (
            <button
              key={String(mode)}
              onClick={() => setFlagMode(mode)}
              aria-pressed={flagMode === mode}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-colors ${
                flagMode === mode
                  ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {mode && <span className="w-3.5 h-3.5 flex items-center justify-center"><FlagIcon /></span>}
              {mode ? ui.flag : ui.dig}
            </button>
          ))}
        </div>
        <button
          onClick={() => reset(level)}
          className="rounded-xl bg-sec font-bold px-5 text-xs shadow-sm hover:opacity-90 transition-opacity"
        >
          {done ? ui.restart : ui.newGame}
        </button>
      </div>

      {/* 판이 화면보다 넓으면 이 안에서만 좌우로 밀린다 — 문서 전체가 밀리면 안 된다 */}
      <div
        className="mt-3 overflow-x-auto overscroll-x-contain select-none"
        onContextMenu={e => e.preventDefault()}
      >
        <div
          className="grid gap-px mx-auto rounded-lg bg-slate-300 dark:bg-slate-700 p-px"
          style={{ gridTemplateColumns: `repeat(${board.cols}, ${size}px)`, width: 'max-content' }}
        >
          {board.mark.map((mk, i) => {
            const isOpen = board.open[i];
            const showMine = board.mine[i] && (isOpen || board.status === 'lost');
            const wrongFlag = done && mk === 'flag' && !board.mine[i];
            const label = `${ui.cell} ${(i % board.cols) + 1}, ${Math.floor(i / board.cols) + 1}`
              + (mk === 'flag' ? ` — ${ui.flagged}` : mk === 'guess' ? ` — ${ui.unknown}` : '')
              + (isOpen && !board.mine[i] ? ` — ${board.near[i]}` : '');
            return (
              <button
                key={i}
                onClick={() => tap(i)}
                onContextMenu={e => { e.preventDefault(); flag(i); }}
                onPointerDown={e => pressStart(i, e.button)}
                onPointerUp={clearHold}
                onPointerLeave={clearHold}
                onPointerCancel={clearHold}
                disabled={done}
                aria-label={label}
                style={{ width: size, height: size, fontSize: Math.round(size * 0.52) }}
                className={`flex items-center justify-center font-bold tabular-nums touch-manipulation ${
                  i === board.blast
                    ? 'bg-rose-500 text-white'
                    : isOpen
                      ? `bg-slate-100 dark:bg-slate-800 ${NUM_COLOR[board.near[i]] ?? ''}`
                      : wrongFlag
                        ? 'bg-white dark:bg-slate-900 text-rose-400 line-through'
                        : showMine
                          ? 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                          : 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100'
                }`}
              >
                {showMine && mk !== 'flag' ? <MineIcon />
                  : mk === 'flag' ? <FlagIcon />
                  : mk === 'guess' ? '?'
                  : isOpen && board.near[i] > 0 ? board.near[i]
                  : ''}
              </button>
            );
          })}
        </div>
      </div>

      {done && (
        <Grade
          text={board.status === 'won' ? `${ui.won} — ${clock(sec)}` : ui.lost}
          tone={board.status === 'won' ? 'good' : 'bad'}
        />
      )}

      <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
        {ui.modeHint}
        {board.cols >= 20 && <> {ui.wide}</>}
      </p>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.how}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{ui.note}</p>
      </div>
    </div>
  );
}
