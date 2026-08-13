import Link from 'next/link';
import { labelOf, slugOf, typeOf, type Cell } from '@/lib/heredity/list';
import { heredityFacts } from '@/lib/heredity/facts';

/**
 * 칸 목록 — 아이의 혈액형 옆에 되는지 안 되는지를 함께 적는다.
 */
export default function HeredityList({
  cells,
  path,
  yes,
  no,
  current,
}: {
  cells: Cell[];
  path: string;
  yes: string;
  no: string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = heredityFacts(c);
        const here = slug === current;
        const child = typeOf(c.child);
        if (!child) return null;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40'
                : 'chip-off hover:border-violet-400'
            }`}
          >
            <div className="cell-sub-cut">{labelOf(child)}</div>
            <div className={`text-sm font-bold ${f.possible ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
              {f.possible ? `${yes} ${f.chanceText}` : no}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
