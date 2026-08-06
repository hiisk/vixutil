import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/microwave/list';
import { microwaveFacts } from '@/lib/microwave/facts';

/**
 * 칸 목록 — 두 출력 옆에 시간에 곱할 값을 미리 적는다.
 */
export default function MicrowaveList({
  cells,
  path,
  current,
}: {
  cells: Cell[];
  path: string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = microwaveFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-orange-400'
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate tabular-nums">{c.from}W → {c.to}W</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">×{f.ratio}</div>
          </Link>
        );
      })}
    </div>
  );
}
