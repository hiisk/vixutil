import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/insul/list';
import { insulFacts } from '@/lib/insul/facts';

/**
 * 칸 목록 — 재료·두께와 함께 열저항을 미리 적는다.
 */
export default function InsulList({
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
        const f = insulFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-stone-500 bg-stone-100 dark:bg-stone-800'
                : 'chip-off hover:border-stone-400'
            }`}
          >
            <div className="cell-cut">{name(c.key)} {c.mm}mm</div>
            <div className={`text-sm font-bold tabular-nums ${f.meets.length ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-100'}`}>
              R {f.r}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
