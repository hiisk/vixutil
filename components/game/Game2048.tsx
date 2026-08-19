'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Stat, higher, useBest } from './ui';
import { type Dir, type Game, canUndo, maxTile, move, newGame, undo } from '@/lib/game2048';
import { GAME_2048_UI } from '@/lib/game2048-ui';
import { type GameLang } from '@/lib/game-ui-intl';

/**
 * 2048 — 판을 밀어 같은 수를 합친다.
 *
 * 밀기·합치기·점수·판정은 전부 lib/game2048.ts에 있다. 여기서는 손가락과 키를
 * 방향으로 바꾸고 판을 그리는 일만 한다.
 *
 * ── 스와이프와 페이지 스크롤을 어떻게 갈랐나 ─────────────────
 * 판에만 `touch-none`(touch-action: none)을 걸었다. 그러면 판 위에서 시작한
 * 손가락 움직임은 브라우저가 스크롤로 쓰지 않으므로, 아래로 밀 때 페이지가
 * 함께 내려가지 않는다. 판 밖(점수·단추·설명)은 그대로 스크롤되니 페이지에
 * 갇히지도 않는다.
 *
 * preventDefault로 막지 않는 이유는 React가 touchmove를 passive로 붙여서
 * 거기서 막아도 경고만 나고 스크롤은 그대로 일어나기 때문이다. 막는 일은
 * CSS에 맡기는 편이 확실하다.
 */

/** 첫 그림은 서버와 같아야 한다 — 시계로 씨앗을 가는 것은 붙은 뒤에 한다 */
const START_SEED = 1;

/** 새 판의 씨앗. 렌더 안에서 부르면 서버와 화면이 갈리므로 효과에서만 부른다 */
const freshSeed = (): number => (Date.now() ^ Math.floor(performance.now() * 1000)) >>> 0;

const KEY_DIR: Record<string, Dir> = {
  arrowleft: 'left', arrowright: 'right', arrowup: 'up', arrowdown: 'down',
  a: 'left', d: 'right', w: 'up', s: 'down',
};

/**
 * 값마다 색이 갈린다 — 숫자만 있는 판에서 "얼마나 왔나"를 색이 먼저 알려준다.
 * 2·4는 옅게 두고 커질수록 진해지다가 2048에서 색이 확 바뀐다.
 */
const TILE: Record<number, string> = {
  2: 'bg-amber-50 text-slate-600 dark:bg-slate-700 dark:text-slate-200',
  4: 'bg-amber-100 text-slate-700 dark:bg-slate-600 dark:text-slate-100',
  8: 'bg-orange-300 text-white',
  16: 'bg-orange-400 text-white',
  32: 'bg-orange-500 text-white',
  64: 'bg-rose-500 text-white',
  128: 'bg-amber-400 text-white',
  256: 'bg-amber-500 text-white',
  512: 'bg-emerald-500 text-white',
  1024: 'bg-teal-500 text-white',
  2048: 'bg-indigo-500 text-white',
};
const tileClass = (v: number) => TILE[v] ?? 'bg-slate-800 text-white dark:bg-slate-950';

/** 네 자리 수가 칸을 넘지 않게 글자를 줄인다 */
const sizeClass = (v: number) =>
  v >= 1024 ? 'text-base sm:text-xl' : v >= 128 ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl';

export default function Game2048({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = GAME_2048_UI[lang];
  const [game, setGame] = useState<Game>(() => newGame(START_SEED));
  /** 2048을 만든 뒤 "계속하기"를 눌렀는가 — 눌렀으면 알림을 다시 띄우지 않는다 */
  const [kept, setKept] = useState(false);
  const { best, submit } = useBest('2048', higher);

  // 서버가 그린 첫 판은 누구에게나 같다. 붙은 뒤 씨앗을 갈아 사람마다 다른 판을 깐다
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGame(newGame(freshSeed()));
  }, []);

  useEffect(() => {
    if (game.score > 0) submit(game.score);
  }, [game.score, submit]);

  const push = useCallback((dir: Dir) => setGame(g => move(g, dir)), []);

  const restart = () => { setGame(newGame(freshSeed())); setKept(false); };
  const back = () => setGame(g => undo(g));

  /* 화살표·WASD. 화살표는 페이지도 스크롤하므로 우리가 쓸 때만 막는다 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      // 검색창에 글자를 치는 중이면 판이 키를 가로채면 안 된다
      if (el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable)) return;
      const dir = KEY_DIR[e.key.toLowerCase()];
      if (!dir) return;
      e.preventDefault();
      push(dir);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [push]);

  /* 스와이프 — 시작점만 들고 있다가 손을 뗄 때 방향을 정한다 */
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
    // 24px은 넘겨야 스와이프로 본다 — 탭이나 손떨림으로 판이 움직이면 억울하다
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    push(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
  };

  const showWin = game.won && !kept;

  return (
    /* 가로로 든 휴대폰에서도 판이 화면을 넘지 않게, 폭을 높이로도 묶는다 */
    <div className="mx-auto w-full max-w-[min(24rem,80vh)]">
      <div className="grid grid-cols-3 gap-2">
        <Stat label={ui.score} value={game.score} accent="text-orange-600" />
        <Stat label={ui.best} value={best ?? '—'} accent="text-indigo-600" />
        <Stat label={ui.moves} value={game.moves} />
      </div>

      <div
        role="group"
        aria-label={ui.boardLabel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="mt-3 aspect-square w-full touch-none select-none rounded-lg bg-slate-200 p-2 dark:bg-slate-800"
      >
        <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-2">
          {game.board.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-xl bg-slate-100/80 dark:bg-slate-700/40"
            >
              {v !== 0 && (
                <div
                  /* 수가 바뀔 때마다 새로 붙어야 짧은 움직임이 다시 돈다 */
                  key={`${game.moves}-${v}`}
                  className={`flex h-full w-full items-center justify-center rounded-xl font-black tabular-nums ${tileClass(v)} ${sizeClass(v)} ${
                    i === game.spawnAt ? 'tile-in' : game.merged.includes(i) ? 'tile-pop' : ''
                  }`}
                >
                  {v}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 min-h-[1.5rem] text-center text-sm font-bold text-slate-600 dark:text-slate-300">
        {game.over ? `${ui.over} · ${maxTile(game.board)}` : showWin ? ui.won : ui.how}
      </p>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          onClick={restart}
          className="rounded-xl bg-sec py-3 text-sm font-bold shadow-sm transition-opacity hover:opacity-90"
        >
          {ui.newGame}
        </button>
        {showWin ? (
          <button
            onClick={() => setKept(true)}
            className="rounded-xl bg-sec py-3 text-sm font-bold shadow-sm transition-opacity hover:opacity-90"
          >
            {ui.keepGoing}
          </button>
        ) : (
          <button
            onClick={back}
            disabled={!canUndo(game)}
            className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-colors hover:border-orange-300 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {ui.undo}
          </button>
        )}
      </div>

      <div className={`${CARD} mt-4`}>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{ui.note}</p>
      </div>

      <style jsx>{`
        /* 새로 놓인 칸은 작게 나타나고, 합쳐진 칸은 한 번 튄다. 둘 다 150ms 안에 끝난다 */
        @keyframes tileIn { from { transform: scale(0.4); opacity: 0.4; } to { transform: scale(1); opacity: 1; } }
        @keyframes tilePop { 0% { transform: scale(1); } 45% { transform: scale(1.16); } 100% { transform: scale(1); } }
        .tile-in { animation: tileIn 0.12s ease-out both; }
        .tile-pop { animation: tilePop 0.15s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .tile-in, .tile-pop { animation: none; }
        }
      `}</style>
    </div>
  );
}
