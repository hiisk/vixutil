import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/drink/list';
import { drinkFacts } from '@/lib/drink/facts';

/**
 * 칸 목록 — 도수와 용량 옆에 순수 알코올 무게를 미리 적는다.
 */
export default function DrinkList({
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
        const f = drinkFacts(c);
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
            <div className="cell-sub-cut">{c.abv}% · {c.ml}ml</div>
            <div className="cell-num">{f.grams} g</div>
          </Link>
        );
      })}
    </div>
  );
}
