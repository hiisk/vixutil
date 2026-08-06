import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/lumen/list';
import { lumenFacts } from '@/lib/lumen/facts';

/**
 * 칸 목록 — 넓이·쓰임과 함께 필요한 루멘을 미리 적는다.
 */
export default function LumenList({
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
        const f = lumenFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-yellow-400'
            }`}
          >
            <div className="cell-sub">{c.area}㎡ · {name(c.use)}</div>
            <div className="cell-num">{f.lumen}lm</div>
          </Link>
        );
      })}
    </div>
  );
}
