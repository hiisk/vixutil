import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/bignum/list';
import { bigNumFacts } from '@/lib/bignum/facts';

/**
 * 칸 목록 — 이름 옆에 셋씩 끊은 값을 미리 적는다.
 */
export default function BigNumList({
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
        const f = bigNumFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40'
                : 'chip-off hover:border-cyan-400'
            }`}
          >
            <div className="cell-sub-cut">{c.factor} {name(c.unit)}</div>
            <div className="cell-num truncate">{f.western}</div>
          </Link>
        );
      })}
    </div>
  );
}
