import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/air/list';
import { airFacts } from '@/lib/air/facts';

/**
 * 칸 목록 — 농도와 함께 미국 지수를 미리 적는다.
 *
 * 두 나라의 판정이 갈리는 칸은 색으로 갈라 둔다. 이 표를 여는 사람이
 * 실제로 찾는 것이 그 자리다.
 */
export default function AirList({
  cells,
  path,
  unit,
  current,
}: {
  cells: Cell[];
  path: string;
  unit: (key: string) => string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = airFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-slate-500 bg-slate-100 dark:bg-slate-800'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400'
            }`}
          >
            <div className="cell-sub">{c.value} {unit(c.key)}</div>
            <div className={`text-sm font-bold tabular-nums ${f.split ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-100'}`}>
              AQI {f.epa}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
