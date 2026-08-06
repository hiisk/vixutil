import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/powerbank/list';
import { powerFacts } from '@/lib/powerbank/facts';

/**
 * 칸 목록 — 용량 옆에 계산된 와트시를 미리 적는다.
 */
export default function PowerBankList({
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
        const f = powerFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-teal-400'
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate tabular-nums">{c.mah.toLocaleString()} mAh</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{f.wh} Wh</div>
          </Link>
        );
      })}
    </div>
  );
}
