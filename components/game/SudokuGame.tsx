'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARD, Stat, lower, useBest } from './ui';
import { GAME_COMMON, type GameLang } from '@/lib/game-ui-intl';
import { SUDOKU_UI, fillSlots, type SudokuUiKey } from '@/lib/sudoku-ui';
import {
  DIFFICULTIES, boxOf, cellName, colOf, conflicts, hintFor, makePuzzle, rowOf,
  type Board, type Difficulty, type Hint, type Puzzle,
} from '@/lib/sudoku';

/**
 * 스도쿠 — 답이 하나뿐인 문제를 씨앗에서 만들어 낸다.
 *
 * 판·풀이·난이도 판정은 전부 lib/sudoku.ts에 있고 여기는 그리기와 조작만 한다.
 * 그렇게 가른 이유는 "답이 하나인가"·"난이도가 갈리는가"를 화면에서는 확인할
 * 방법이 없기 때문이다 — 그건 tests/sudoku.test.ts가 본다.
 *
 * ── 메모(후보 적기)를 넣은 이유 ────────────────────────────
 * 어려움은 확실한 칸이 끊기는 자리가 있어서 후보를 적어 두지 않으면 같은 칸을
 * 몇 번씩 다시 따진다. 종이 스도쿠에서 사람이 늘 하는 일이라 없으면 이상하다.
 *
 * ── 힌트가 값을 채워 주지 않는 이유 ────────────────────────
 * 채워 주면 다음에도 힌트를 누른다. 지금 판에서 확실한 칸 하나와 **그 까닭**만
 * 말해 주면 같은 꼴을 다음에는 혼자 찾는다.
 */

const LEVEL_KEY: Record<Difficulty, SudokuUiKey> = {
  easy: 'level_easy',
  normal: 'level_normal',
  hard: 'level_hard',
};

/** 화살표 키가 옮기는 칸 수. 값 자리를 number|undefined로 둬야 없는 키를 가릴 수 있다 */
const STEP: Record<string, number | undefined> = {
  ArrowLeft: -1, ArrowRight: 1, ArrowUp: -9, ArrowDown: 9,
};

/** 메모는 비트로 담는다 — 칸마다 Set을 두면 되돌리기에서 얕은 복사에 물린다 */
type Notes = number[];

const emptyNotes = (): Notes => new Array<number>(81).fill(0);

const mmss = (sec: number): string =>
  `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

export default function SudokuGame({ lang = 'ko' }: { lang?: GameLang } = {}) {
  const ui = SUDOKU_UI[lang];
  const c = GAME_COMMON[lang];

  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [board, setBoard] = useState<Board>(() => new Array<number>(81).fill(0));
  const [notes, setNotes] = useState<Notes>(emptyNotes);
  const [past, setPast] = useState<{ board: Board; notes: Notes }[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [memo, setMemo] = useState(false);
  const [hintMsg, setHintMsg] = useState('');
  const [seconds, setSeconds] = useState(0);
  const startedAt = useRef(0);

  const { best, submit } = useBest(`sudoku-${difficulty}`, lower);

  const solved = puzzle !== null && board.every((v, i) => v === puzzle.solution[i]);
  const running = puzzle !== null && !solved;

  /* 경과 시간. 1초 간격보다 촘촘히 재는 이유는, 초가 바뀌는 순간과 어긋나면
     멈춘 것처럼 보이기 때문이다 */
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(
      () => setSeconds(Math.floor((performance.now() - startedAt.current) / 1000)),
      250,
    );
    return () => window.clearInterval(id);
  }, [running]);

  /* 다 풀면 걸린 시간을 기록에 낸다 — 낮을수록 좋은 기록이다 */
  useEffect(() => {
    if (solved) submit(seconds);
  }, [solved, seconds, submit]);

  const start = useCallback((level: Difficulty) => {
    /*
     * 씨앗은 다섯 자리로 줄여 화면에 보여 준다. 사람이 옮겨 적을 수 있어야
     * "그 문제 다시"가 되고, ?seed=로 들어오면 그 문제가 그대로 나온다.
     */
    const fromUrl = new URLSearchParams(window.location.search).get('seed');
    const asked = fromUrl === null ? NaN : Number(fromUrl);
    const seed = Number.isInteger(asked) && asked >= 0 ? asked : Math.floor(Math.random() * 100000);
    const made = makePuzzle(seed, level);
    setDifficulty(level);
    setPuzzle(made);
    setBoard(made.board.slice());
    setNotes(emptyNotes());
    setPast([]);
    setPicked(null);
    setHintMsg('');
    setSeconds(0);
    startedAt.current = performance.now();
  }, []);

  /** 되돌리기를 위해 지금 판을 쌓아 둔다 */
  const remember = useCallback(() => {
    setPast(p => [...p.slice(-199), { board: board.slice(), notes: notes.slice() }]);
  }, [board, notes]);

  const put = useCallback((value: number) => {
    if (!puzzle || solved || picked === null) return;
    if (puzzle.board[picked] !== 0) return; // 처음부터 있던 단서는 못 고친다
    remember();
    setHintMsg('');
    if (memo && value !== 0) {
      setNotes(n => {
        const next = n.slice();
        next[picked] ^= 1 << (value - 1);
        return next;
      });
      return;
    }
    setBoard(b => {
      const next = b.slice();
      next[picked] = next[picked] === value ? 0 : value;
      return next;
    });
    setNotes(n => {
      const next = n.slice();
      next[picked] = 0; // 값을 넣으면 그 칸의 메모는 지운다
      return next;
    });
  }, [puzzle, solved, picked, memo, remember]);

  const undo = useCallback(() => {
    const last = past[past.length - 1];
    if (!last) return;
    setBoard(last.board);
    setNotes(last.notes);
    setPast(p => p.slice(0, -1));
    setHintMsg('');
  }, [past]);

  /** 지금 판에서 확실한 칸 하나와 그 까닭 */
  const askHint = useCallback(() => {
    if (!puzzle || solved) return;
    /*
     * 답과 다르게 채운 칸은 지운 판으로 묻는다. 그대로 물으면 잘못 넣은 수를
     * 근거 삼아 엉뚱한 칸을 짚어 주고, 그게 제일 나쁜 힌트다.
     */
    const clean = board.map((v, i) => (v !== 0 && v !== puzzle.solution[i] ? 0 : v));
    const h: Hint | null = hintFor(clean);
    if (!h) {
      setHintMsg(ui.hintNone);
      return;
    }
    const { row, col } = cellName(h.index);
    const slots = { v: h.value, r: row, c: col, n: (h.unit?.index ?? 0) + 1 };
    const text = h.kind === 'naked' ? ui.hintNaked
      : h.unit?.type === 'row' ? ui.hintRow
        : h.unit?.type === 'col' ? ui.hintCol
          : ui.hintBox;
    setPicked(h.index);
    setHintMsg(fillSlots(text, slots));
  }, [puzzle, solved, board, ui]);

  /* 키보드 — 화살표로 옮기고 숫자로 채운다. 판이 없으면 아무것도 안 듣는다 */
  useEffect(() => {
    if (!puzzle) return;
    const onKey = (e: KeyboardEvent) => {
      const step = STEP[e.key];
      if (step !== undefined) {
        // 고른 칸이 없으면 화살표를 가져가지 않는다 — 판 밖의 글을 읽는 사람의 스크롤을 막으면 안 된다
        if (picked === null) return;
        e.preventDefault();
        const to = picked + step;
        if (to < 0 || to > 80) return;
        // 좌우 이동이 줄을 넘어가면 제자리에 둔다
        if (Math.abs(step) === 1 && rowOf(to) !== rowOf(picked)) return;
        setPicked(to);
        return;
      }
      if (/^[1-9]$/.test(e.key)) { put(Number(e.key)); return; }
      if (e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') { put(0); return; }
      if (e.key === 'n' || e.key === 'N') setMemo(m => !m);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [puzzle, put, picked]);

  const bad = conflicts(board);
  const hasConflict = bad.some(Boolean);
  const blanks = board.filter(v => v === 0).length;
  const pickedValue = picked !== null ? board[picked] : 0;

  return (
    <div>
      {/* 난이도 — 고르는 즉시 새 문제를 낸다. 고르고 또 시작을 누르게 하면 한 번이 남는다 */}
      <div className="grid grid-cols-3 gap-2">
        {DIFFICULTIES.map(d => (
          <button
            key={d}
            onClick={() => start(d)}
            className={`rounded-xl py-2.5 text-sm font-bold transition-colors ${
              d === difficulty
                ? 'bg-sec shadow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {ui[LEVEL_KEY[d]]}
          </button>
        ))}
      </div>

      {/* 판. max-w를 화면 너비로도 묶어 두어야 작은 휴대폰에서 가로로 안 넘친다 */}
      <div
        role="group"
        aria-label={ui.boardLabel}
        className="mt-4 mx-auto w-full max-w-[min(92vw,26rem)] grid grid-cols-9 rounded-xl overflow-hidden border-2 border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-900 select-none"
      >
        {Array.from({ length: 81 }, (_, i) => {
          const given = puzzle !== null && puzzle.board[i] !== 0;
          const value = board[i];
          const row = rowOf(i);
          const col = colOf(i);
          const near = picked !== null
            && (row === rowOf(picked) || col === colOf(picked) || boxOf(i) === boxOf(picked));
          const twin = value !== 0 && value === pickedValue;
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              disabled={puzzle === null}
              aria-label={fillSlots(ui.cellLabel, { r: row + 1, c: col + 1 })}
              className={[
                'relative aspect-square flex items-center justify-center tabular-nums',
                'text-[clamp(0.95rem,4.2vw,1.4rem)] leading-none',
                col % 3 === 2 && col !== 8
                  ? 'border-r-2 border-r-slate-400 dark:border-r-slate-500'
                  : col !== 8 ? 'border-r border-r-slate-200 dark:border-r-slate-700' : '',
                row % 3 === 2 && row !== 8
                  ? 'border-b-2 border-b-slate-400 dark:border-b-slate-500'
                  : row !== 8 ? 'border-b border-b-slate-200 dark:border-b-slate-700' : '',
                bad[i] ? 'bg-rose-100 dark:bg-rose-900/40'
                  : picked === i ? 'bg-emerald-100 dark:bg-emerald-900/50'
                    : twin ? 'bg-amber-50 dark:bg-amber-900/25'
                      : near ? 'bg-slate-50 dark:bg-slate-800/50'
                        : given ? 'bg-slate-50/60 dark:bg-slate-800/30' : '',
                bad[i] ? 'text-rose-600 dark:text-rose-300 font-bold'
                  : given ? 'text-slate-800 dark:text-slate-100 font-bold'
                    : 'text-emerald-600 dark:text-emerald-400 font-bold',
              ].join(' ')}
            >
              {value !== 0 ? value : notes[i] !== 0 ? (
                <span className="grid grid-cols-3 gap-px w-full h-full p-[2px] text-[8px] sm:text-[9px] leading-none text-slate-400 dark:text-slate-500 font-medium">
                  {Array.from({ length: 9 }, (_, d) => (
                    <span key={d} className="flex items-center justify-center">
                      {notes[i] & (1 << d) ? d + 1 : ''}
                    </span>
                  ))}
                </span>
              ) : ''}
            </button>
          );
        })}
      </div>

      {/* 숫자 단추 — 한 줄에 아홉을 넣으면 손가락에 안 맞아 두 줄로 나눈다 */}
      <div className="grid grid-cols-5 gap-1.5 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(v => (
          <button
            key={v}
            onClick={() => put(v)}
            disabled={!running}
            className="min-h-[3rem] rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-lg font-bold tabular-nums text-slate-700 dark:text-slate-200 disabled:opacity-40 hover:border-emerald-400 transition-colors"
          >
            {v}
          </button>
        ))}
        <button
          onClick={() => put(0)}
          disabled={!running}
          className="min-h-[3rem] rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40"
        >
          {ui.erase}
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1.5 mt-2">
        <button
          onClick={() => setMemo(m => !m)}
          disabled={!running}
          aria-pressed={memo}
          className={`min-h-[2.75rem] rounded-xl text-xs font-bold transition-colors disabled:opacity-40 ${
            memo
              ? 'bg-indigo-500 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          {ui.notes}
        </button>
        <button
          onClick={askHint}
          disabled={!running}
          className="min-h-[2.75rem] rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40"
        >
          {ui.hint}
        </button>
        <button
          onClick={undo}
          disabled={!running || past.length === 0}
          className="min-h-[2.75rem] rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40"
        >
          {ui.undo}
        </button>
        <button
          onClick={() => start(difficulty)}
          className="min-h-[2.75rem] rounded-xl bg-sec text-xs font-bold shadow"
        >
          {puzzle === null ? c.start : ui.newGame}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">
        <Stat label={ui.time} value={puzzle === null ? '—' : mmss(seconds)} accent="text-emerald-600" />
        <Stat label={ui.blanks} value={puzzle === null ? '—' : blanks} />
        <Stat label={ui.bestTime} value={best === null ? '—' : mmss(best)} accent="text-teal-600" />
      </div>

      {solved && (
        <p className="text-center text-sm font-bold mt-4 text-emerald-600">
          {ui.won} · {mmss(seconds)}
          {best !== null && best >= seconds ? ` · ${ui.newBest}` : ''}
        </p>
      )}

      {!solved && hintMsg !== '' && (
        <p className="text-center text-sm font-medium mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
          {hintMsg}
        </p>
      )}

      {hasConflict && !solved && (
        <p className="text-center text-xs font-medium mt-3 text-rose-600 dark:text-rose-400">
          {ui.conflict}
        </p>
      )}

      <div className={`${CARD} mt-4`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{ui.how}</p>
        {puzzle !== null && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 tabular-nums">
            {ui.puzzleNo} {puzzle.seed} · {ui[LEVEL_KEY[puzzle.difficulty]]}
          </p>
        )}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">{ui.note}</p>
      </div>
    </div>
  );
}
