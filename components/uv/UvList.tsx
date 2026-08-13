import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/uv/list';
import { uvFacts } from '@/lib/uv/facts';

/**
 * 칸 목록 — 지수·피부와 함께 화상까지의 분을 미리 적는다.
 */
export default function UvList({
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
        const f = uvFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40'
                : 'chip-off hover:border-orange-400'
            }`}
          >
            <div className="cell-cut">{name(c.skin).split(' —')[0]} · UV {c.uv}</div>
            <div className={`text-sm font-bold tabular-nums ${f.minutes < 20 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-100'}`}>
              {f.minutes}분
            </div>
          </Link>
        );
      })}
    </div>
  );
}
