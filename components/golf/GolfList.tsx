import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/golf/list';
import { golfFacts } from '@/lib/golf/facts';

/**
 * 칸 목록 — 스코어와 슬로프 옆에 계산된 디퍼렌셜을 미리 적는다.
 */
export default function GolfList({
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
        const f = golfFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-lime-500 bg-lime-50 dark:bg-lime-950/40'
                : 'chip-off hover:border-lime-400'
            }`}
          >
            <div className="cell-sub-cut">{c.score} · {c.slope}</div>
            <div className="cell-num">{f.differential}</div>
          </Link>
        );
      })}
    </div>
  );
}
