import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/bra/list';
import { braFacts } from '@/lib/bra/facts';

/**
 * 칸 목록 — 두 치수와 함께 계산된 표기를 미리 적는다.
 */
export default function BraList({
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
        const f = braFacts(c);
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
            <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">{c.under}cm · +{c.diff}cm</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{f.label}</div>
          </Link>
        );
      })}
    </div>
  );
}
