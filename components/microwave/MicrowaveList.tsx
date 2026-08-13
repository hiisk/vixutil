import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/microwave/list';
import { microwaveFacts } from '@/lib/microwave/facts';

/**
 * 칸 목록 — 두 출력 옆에 시간에 곱할 값을 미리 적는다.
 */
export default function MicrowaveList({
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
        const f = microwaveFacts(c);
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
            <div className="cell-sub-cut">{c.from}W → {c.to}W</div>
            <div className="cell-num">×{f.ratio}</div>
          </Link>
        );
      })}
    </div>
  );
}
