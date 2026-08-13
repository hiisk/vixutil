import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/bed/list';
import { bedFacts } from '@/lib/bed/facts';

/**
 * 칸 목록 — 규격과 방 폭 옆에 한쪽 통로를 미리 적는다.
 */
export default function BedList({
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
        const f = bedFacts(c);
        const here = slug === current;
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
            <div className="cell-sub-cut">{name(c.bed)} · {c.room}</div>
            <div className="cell-num">{f.gap} mm</div>
          </Link>
        );
      })}
    </div>
  );
}
