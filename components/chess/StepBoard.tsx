'use client';
import { useState } from 'react';
import Board from './Board';

/**
 * 한 수씩 넘겨 보는 판.
 *
 * 자리마다 판을 통째로 그려 두고 번호만 바꾼다 — 규칙을 브라우저에서 다시
 * 돌릴 필요가 없다. 판 하나가 64글자라 열일곱 자리를 다 실어도 1KB 남짓이다.
 *
 * 문구는 문자열로 받는다. 서버에서 함수를 넘길 수 없어서 언어별 문장을
 * 여기서 만들지 않는다.
 */
export default function StepBoard({
  frames,
  san,
  labels,
  boardLabel,
}: {
  /** 시작 자리부터 각 수를 둔 뒤까지 — 길이는 수순보다 하나 많다 */
  frames: string[];
  san: string[];
  labels: { start: string; prev: string; next: string; end: string; hint: string };
  boardLabel: string;
}) {
  const [at, setAt] = useState(frames.length - 1);
  const go = (n: number) => setAt(Math.max(0, Math.min(frames.length - 1, n)));

  return (
    <div className="flex flex-col gap-3">
      <Board board={frames[at]} label={boardLabel} />

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => go(0)}
          disabled={at === 0}
          aria-label={labels.start}
          className="rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40"
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={() => go(at - 1)}
          disabled={at === 0}
          aria-label={labels.prev}
          className="rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40"
        >
          ◀
        </button>
        <span className="px-1 text-xs font-bold tabular-nums text-slate-500 dark:text-slate-400">
          {at} / {frames.length - 1}
        </span>
        <button
          type="button"
          onClick={() => go(at + 1)}
          disabled={at === frames.length - 1}
          aria-label={labels.next}
          className="rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40"
        >
          ▶
        </button>
        <button
          type="button"
          onClick={() => go(frames.length - 1)}
          disabled={at === frames.length - 1}
          aria-label={labels.end}
          className="rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40"
        >
          ⏭
        </button>
      </div>

      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
        {san.map((move, i) => (
          <li key={`${move}-${i}`} className="flex items-center gap-1.5">
            {i % 2 === 0 && (
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 tabular-nums">{i / 2 + 1}.</span>
            )}
            <button
              type="button"
              onClick={() => go(i + 1)}
              className={`rounded px-1.5 py-0.5 font-mono font-bold transition-colors ${
                at === i + 1
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-sec-soft '
              }`}
            >
              {move}
            </button>
          </li>
        ))}
      </ol>

      <p className="text-xs text-slate-500 dark:text-slate-400">{labels.hint}</p>
    </div>
  );
}
