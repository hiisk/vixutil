import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/hike/list';
import { hikeFacts } from '@/lib/hike/facts';

/**
 * 칸 목록 — 거리·오름과 함께 올라가는 시간을 미리 적는다.
 */
export default function HikeList({
  cells,
  path,
  clock,
  current,
}: {
  cells: Cell[];
  path: string;
  clock: (minutes: number) => string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = hikeFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-green-600 bg-green-50 dark:bg-green-950/40'
                : 'chip-off hover:border-green-500'
            }`}
          >
            <div className="cell-sub">{c.km}km · ↑{c.up}m</div>
            <div className="cell-num">{clock(f.upMinutes)}</div>
          </Link>
        );
      })}
    </div>
  );
}
