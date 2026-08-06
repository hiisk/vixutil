import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/wine/list';
import { wineFacts } from '@/lib/wine/facts';

/**
 * 칸 목록 — 병과 잔 옆에 나오는 잔 수를 미리 적는다.
 */
export default function WineList({
  cells,
  path,
  name,
  current,
}: {
  cells: Cell[];
  path: string;
  name: (key: string) => string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = wineFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-pink-400'
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate tabular-nums">{name(c.bottle)} · {c.pour}ml</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{f.fullGlasses}</div>
          </Link>
        );
      })}
    </div>
  );
}
