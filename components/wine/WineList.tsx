import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/wine/list';
import { wineFacts } from '@/lib/wine/facts';

/**
 * 칸 목록 — 병과 잔 옆에 나오는 잔 수를 미리 적는다.
 */
export default function WineList({
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
        const f = wineFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40'
                : 'chip-off hover:border-pink-400'
            }`}
          >
            <div className="cell-sub-cut">{name(c.bottle)} · {c.pour}ml</div>
            <div className="cell-num">{f.fullGlasses}</div>
          </Link>
        );
      })}
    </div>
  );
}
