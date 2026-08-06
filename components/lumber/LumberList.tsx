import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/lumber/list';
import { lumberFacts } from '@/lib/lumber/facts';

/**
 * 칸 목록 — 공칭 이름 옆에 실측 밀리미터를 미리 적는다.
 */
export default function LumberList({
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
        const f = lumberFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-400'
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate tabular-nums">{c.size} · {c.feet}ft</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{f.mmT}×{f.mmW}</div>
          </Link>
        );
      })}
    </div>
  );
}
