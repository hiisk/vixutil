import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/cable/list';
import { cableFacts } from '@/lib/cable/facts';

/**
 * 칸 목록 — 주사율 옆에 계산된 자료량을 미리 적는다.
 */
export default function CableList({
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
        const f = cableFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400'
            }`}
          >
            <div className="cell-sub-cut">{name(c.res).split(' ')[0]} · {c.hz}Hz</div>
            <div className="cell-num">{f.raw8} Gbps</div>
          </Link>
        );
      })}
    </div>
  );
}
