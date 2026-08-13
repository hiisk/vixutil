import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/gengo/list';
import { gengoFacts } from '@/lib/gengo/facts';

/**
 * 칸 목록 — 연차 옆에 서기를 미리 적는다.
 */
export default function GengoList({
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
        const f = gengoFacts(c);
        const here = slug === current;
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
            <div className="cell-cut">{name(c.era)} {c.year}</div>
            <div className="cell-num">
              {f.gregorian}
              {f.overlap ? <span className="ml-1 text-xs font-normal text-red-600 dark:text-red-400">·2</span> : null}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
