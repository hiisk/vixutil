'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Grade, Stat, lower, useBest } from './ui';
import {
  DEFAULT_SIZE, SIZES, blankIndex, canUndo, isSolved, manhattan, moveAt, newGame, pushAt, undo,
  type Game, type Size,
} from '@/lib/sliding';
import { SLIDING_UI } from '@/lib/sliding-ui';
import { type GameLang } from '@/lib/game-ui-intl';

/**
 * 슬라이딩 퍼즐 — 셈은 lib/sliding.ts에 있고 여기는 그리는 일만 한다.
 *
 * ── 판이 화면을 넘지 않게 ────────────────────────────────────
 * 판은 정사각형 한 덩어리(`aspect-square`)이고 폭은 부모에 맞춘다. 칸 크기를
 * px로 주지 않는 이유는 5×5에서 좁은 화면을 넘기 때문이다 — 칸은 판의
 * `100/size`%를 차지하므로 어느 폭에서도 스스로 줄어든다.
 *
 * ── 짧은 움직임을 어떻게 넣었나 ──────────────────────────────
 * 칸을 자리 순서대로 늘어놓으면 React가 DOM을 갈아 끼워서 미끄러지는 모습이
 * 안 나온다. 그래서 칸마다 `key`를 **숫자**로 주고(자리가 아니라 타일에 붙는다)
 * 자리는 `transform: translate`로만 옮긴다. 같은 원소가 남아 있으니 CSS가
 * 이동을 이어 그린다.
 *
 * 이 화면에는 **이모지를 쓰지 않는다.** 판에 있는 것은 숫자뿐이다.
 */

/** 첫 그림은 서버와 같아야 한다 — 시계로 씨앗을 가는 것은 붙은 뒤에 한다 */
const START_SEED = 1;

/** 렌더 스코프에서 Math.random을 부르면 린트가 막는다 — 바깥에 두고 부른다 */
const freshSeed = () => Math.floor(Math.random() * 0x100000000) >>> 0;

/** 0:00 — 어느 언어에서도 그대로 읽히므로 단위 낱말을 안 붙인다 */
const clock = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

/** 판이 커지면 숫자를 줄인다. 5×5의 두 자리 수가 칸을 넘치지 않아야 한다 */
const FONT: Record<number, string> = {
  3: 'text-3xl sm:text-4xl',
  4: 'text-2xl sm:text-3xl',
  5: 'text-lg sm:text-2xl',
};

export default function SlidingGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = SLIDING_UI[lang];
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const [game, setGame] = useState<Game>(() => newGame(DEFAULT_SIZE, START_SEED));
  const [sec, setSec] = useState(0);
  const { best, submit } = useBest(`sliding-${size}`, lower);

  const solved = isSolved(game.tiles);
  const running = game.moves > 0 && !solved;

  // 서버가 그린 첫 판은 누구에게나 같다. 붙은 뒤 씨앗을 갈아 사람마다 다른 판을 깐다
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGame(newGame(DEFAULT_SIZE, freshSeed()));
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSec(v => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const reset = useCallback((n: Size) => {
    setSize(n);
    setGame(newGame(n, freshSeed()));
    setSec(0);
  }, []);

  /** 다 맞춘 순간의 시간만 기록으로 남긴다. 판 크기마다 따로 쌓인다 */
  const apply = (next: Game) => {
    setGame(next);
    if (isSolved(next.tiles)) submit(sec);
  };

  const press = (i: number) => apply(pushAt(game, i));
  const back = () => setGame(g => undo(g));

  /*
   * 스와이프 — 미는 방향의 반대편에 있는 칸이 빈 칸으로 들어온다. 오른쪽으로
   * 밀면 빈 칸의 왼쪽 칸이 오른쪽으로 미끄러지는 것이 손의 느낌과 맞는다.
   *
   * 판에만 `touch-none`을 걸어 판 위에서 시작한 손가락이 페이지를 스크롤하지
   * 않게 한다. 판 밖은 그대로 스크롤되니 페이지에 갇히지 않는다.
   */
  const from = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    from.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = from.current;
    from.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // 24px은 넘겨야 스와이프로 본다 — 칸을 누른 것이 판을 움직이면 억울하다
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    const blank = blankIndex(game.tiles);
    const step = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? -1 : 1) : dy > 0 ? -size : size;
    apply(moveAt(game, blank + step));
  };

  const cell = `${100 / size}%`;

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="grid grid-cols-3 gap-2">
        {SIZES.map(n => (
          <button
            key={n}
            onClick={() => reset(n)}
            aria-pressed={n === size}
            className={`rounded-xl border py-2.5 text-xs font-bold tabular-nums transition-colors ${
              n === size
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                : 'border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
            }`}
          >
            {n}×{n}
          </button>
        ))}
      </div>
      <p className="mt-1.5 text-center text-[11px] text-slate-400 dark:text-slate-500">{ui.size}</p>

      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label={ui.moves} value={game.moves} accent="text-indigo-600" />
        <Stat label={ui.time} value={clock(sec)} />
        <Stat label={ui.left} value={manhattan(game.tiles)} accent="text-amber-600" />
        <Stat label={ui.best} value={best === null ? '—' : clock(best)} accent="text-emerald-600" />
      </div>

      <div
        role="group"
        aria-label={ui.boardLabel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative mt-3 aspect-square w-full touch-none select-none rounded-lg bg-slate-200 p-1.5 dark:bg-slate-800"
      >
        <div className="relative h-full w-full">
          {game.tiles.map((v, i) =>
            v === 0 ? null : (
              <button
                /* key가 타일 값이라 자리만 옮겨진다 — 그래서 이동이 이어 그려진다 */
                key={v}
                onClick={() => press(i)}
                aria-label={`${ui.tile} ${v}`}
                style={{ width: cell, height: cell, transform: `translate(${(i % size) * 100}%, ${Math.floor(i / size) * 100}%)` }}
                className="tile absolute left-0 top-0 p-[3px]"
              >
                <span
                  className={`flex h-full w-full items-center justify-center rounded-xl font-black tabular-nums shadow-sm ${FONT[size]} ${
                    solved
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-slate-700 hover:bg-emerald-50 active:bg-emerald-100 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {v}
                </span>
              </button>
            ),
          )}
        </div>
      </div>

      <p className="mt-3 min-h-[1.5rem] text-center text-sm font-bold text-slate-600 dark:text-slate-300">
        {solved ? ui.solved : ui.how}
      </p>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          onClick={() => reset(size)}
          className="rounded-xl bg-sec py-3 text-sm font-bold shadow-sm transition-opacity hover:opacity-90"
        >
          {ui.shuffle}
        </button>
        <button
          onClick={back}
          disabled={!canUndo(game)}
          className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-300 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {ui.undo}
        </button>
      </div>

      {/* 다 맞춘 뒤에는 두 값이 곧 성적이다 — 위 칸은 새 판을 누르면 지워지므로 여기 남긴다 */}
      {solved && <Grade text={`${ui.moves} ${game.moves} · ${ui.time} ${clock(sec)}`} tone="good" />}

      <p className="mt-3 text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">{ui.pushHint}</p>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{ui.note}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{ui.distanceNote}</p>
      </div>

      <style jsx>{`
        /* 미끄러지는 시간은 짧게 — 길면 여러 칸을 잇달아 누를 때 손이 앞선다 */
        .tile { transition: transform 0.11s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .tile { transition: none; }
        }
      `}</style>
    </div>
  );
}
