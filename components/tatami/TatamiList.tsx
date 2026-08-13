import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/tatami/list';
import { tatamiFacts } from '@/lib/tatami/facts';

/**
 * 칸 목록 — 장수 옆에 계산된 넓이를 미리 적는다.
 */
export default function TatamiList({
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
        const f = tatamiFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-green-500 bg-green-50 dark:bg-green-950/40'
                : 'chip-off hover:border-green-400'
            }`}
          >
            <div className="cell-sub-cut">{name(c.kind).split('(')[0].trim()} · {c.mats}</div>
            <div className="cell-num">{f.sqm} m²</div>
          </Link>
        );
      })}
    </div>
  );
}
