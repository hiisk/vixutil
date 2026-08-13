import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/petfood/list';
import { petFacts } from '@/lib/petfood/facts';

/**
 * 칸 목록 — 체중과 함께 계산된 하루 열량 범위를 미리 적는다.
 */
export default function PetFoodList({
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
        const f = petFacts(c);
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
            <div className="cell-sub truncate">{name(c.state)} · {c.kg}kg</div>
            <div className="cell-num">{f.kcalLo}~{f.kcalHi} kcal</div>
          </Link>
        );
      })}
    </div>
  );
}
