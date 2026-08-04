import Link from 'next/link';
import { MAX_FACTOR, slugOf } from '@/lib/times/list';

/**
 * 20 × 20 격자 — 목차이자 그림이다.
 *
 * 대각선 위아래가 거울처럼 같으므로 아래쪽 절반은 흐리게 둔다. 7×8과 8×7이
 * 한 페이지인 이유가 그림에서 그대로 보인다.
 */
export default function TimesGrid({ path, current }: { path: string; current?: { a: number; b: number } }) {
  const rows = Array.from({ length: MAX_FACTOR }, (_, i) => i + 1);
  return (
    <div className="overflow-x-auto -mx-1 px-1 pb-2">
      <div
        className="grid gap-[2px] min-w-[560px]"
        style={{ gridTemplateColumns: `repeat(${MAX_FACTOR}, minmax(0, 1fr))` }}
      >
        {rows.map(a =>
          rows.map(b => {
            const key = `${a}:${b}`;
            const lo = Math.min(a, b);
            const hi = Math.max(a, b);
            const on = current && current.a === lo && current.b === hi;
            const mirrored = a > b;
            return (
              <Link
                key={key}
                href={`${path}/${slugOf({ a: lo, b: hi })}`}
                aria-current={on ? 'page' : undefined}
                className={`rounded-[3px] border py-[2px] text-center text-[9px] font-bold tabular-nums leading-none transition-transform hover:scale-110 hover:z-10 ${
                  a === b
                    ? 'border-teal-300 bg-teal-100 text-teal-800 dark:border-teal-700 dark:bg-teal-900/60 dark:text-teal-200'
                    : mirrored
                      ? 'border-slate-100 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600'
                      : 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                } ${on ? 'ring-2 ring-slate-900 dark:ring-white' : ''}`}
              >
                {a * b}
              </Link>
            );
          }),
        )}
      </div>
    </div>
  );
}
