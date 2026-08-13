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
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'chip-off hover:border-amber-400'
            }`}
          >
            <div className="cell-sub-cut">{c.size} · {c.feet}ft</div>
            <div className="cell-num">{f.mmT}×{f.mmW}</div>
          </Link>
        );
      })}
    </div>
  );
}
