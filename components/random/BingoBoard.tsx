'use client';
import { useEffect, useState } from 'react';
import { bingoBoard, bingoCount, type BingoBoard } from '@/lib/random-more';
import { RANDOM_MORE_UI } from '@/lib/random-more-ui';
import { type RandomLang } from '@/lib/random-ui-intl';

const SIZES = [3, 4, 5];

export default function BingoBoardTool({ lang = 'ko' }: { lang?: RandomLang }) {
  const ui = RANDOM_MORE_UI[lang];
  const [size, setSize] = useState(5);
  const [free, setFree] = useState(true);
  const [nonce, setNonce] = useState(0);
  const [marked, setMarked] = useState<Set<number>>(new Set());

  /*
   * 판은 **브라우저에서만** 만든다.
   *
   * useMemo로 만들면 서버 렌더링에서도 Math.random이 돌아 서버와 브라우저가
   * 서로 다른 판을 그린다. 그러면 하이드레이션이 깨지고 React가 트리를 통째로
   * 다시 그린다(헤드리스 콘솔에서 실제로 잡혔다).
   *
   * nonce가 바뀔 때만 새로 만든다 — 칸을 지울 때마다 판이 바뀌면 못 쓴다.
   */
  const [board, setBoard] = useState<BingoBoard | null>(null);
  // 무작위 판은 프리렌더 시점에 만들 수 없다(서버와 어긋난다) — 붙은 뒤 만든다
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setBoard(bingoBoard(size, Math.random, free)); }, [size, free, nonce]);
  const lines = board ? bingoCount(board.size, marked) : 0;

  const reset = (fn: () => void) => { fn(); setMarked(new Set()); };
  const toggle = (i: number) => setMarked(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });

  // 무료 칸은 처음부터 지워진 것으로 친다
  const isMarked = (i: number) => marked.has(i) || board?.cells[i] === null;

  return (
    <div>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{ui.boardSize}</p>
      <div className="grid grid-cols-3 gap-2">
        {SIZES.map(n => (
          <button
            key={n}
            onClick={() => reset(() => setSize(n))}
            className={`rounded-xl border py-2.5 text-sm font-bold transition-colors ${
              size === n
                ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {n} × {n}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-3 mt-3 cursor-pointer">
        <input
          type="checkbox" checked={free}
          onChange={e => reset(() => setFree(e.target.checked))}
          disabled={size % 2 === 0}
          className="accent-rose-500 w-4 h-4 disabled:opacity-40"
        />
        <span className={`text-sm font-bold ${size % 2 === 0 ? 'text-slate-300 dark:text-slate-600' : 'text-slate-700 dark:text-slate-200'}`}>
          {ui.freeCenter}
        </span>
      </label>

      <button
        onClick={() => reset(() => setNonce(n => n + 1))}
        className="w-full mt-4 mb-5 bg-sec font-black text-lg rounded-lg py-4 shadow-sm shadow-rose-200 dark:shadow-none hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
      >
        {ui.newBoard} 🎲
      </button>

      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${board?.size ?? size}, minmax(0, 1fr))` }}
      >
        {/* 첫 렌더에는 빈 칸을 같은 수만큼 깔아 둔다 — 판이 생길 때 화면이 튀지 않는다 */}
        {(board?.cells ?? Array.from({ length: size * size }, () => null)).map((v, i) => (
          <button
            key={i}
            onClick={() => board && v !== null && toggle(i)}
            className={`aspect-square rounded-xl border-2 flex items-center justify-center font-black transition-all ${
              (board?.size ?? size) >= 5 ? 'text-base' : 'text-xl'
            } ${
              isMarked(i)
                ? 'border-rose-400 bg-sec '
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            {v ?? (board ? '★' : '')}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        <span className="text-sm font-bold text-slate-400 dark:text-slate-500">{ui.bingoCount}</span>
        <span className="text-2xl font-black text-rose-600 tabular-nums">{lines}</span>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 text-center">{ui.tapToMark}</p>
    </div>
  );
}
