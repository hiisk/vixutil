import Link from 'next/link';
import { labelOf, slugOf, typeOf, type Cell } from '@/lib/blood/list';
import { bloodFacts } from '@/lib/blood/facts';

/**
 * 칸 목록 — 주는 쪽과 받는 쪽, 그리고 되는지 안 되는지를 함께 적는다.
 */
export default function BloodList({
  cells,
  path,
  ok,
  no,
  current,
}: {
  cells: Cell[];
  path: string;
  ok: string;
  no: string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = bloodFacts(c);
        const here = slug === current;
        const d = typeOf(c.donor);
        const r = typeOf(c.recipient);
        if (!d || !r) return null;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-red-500 bg-red-50 dark:bg-red-950/40'
                : 'chip-off hover:border-red-400'
            }`}
          >
            <div className="cell-sub-cut">{labelOf(d)} → {labelOf(r)}</div>
            <div className={`text-sm font-bold ${f.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              {f.ok ? ok : no}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
