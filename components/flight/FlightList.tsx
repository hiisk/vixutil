import Link from 'next/link';
import { nameOf, slugOf, type Cell } from '@/lib/flight/list';
import { flightFacts } from '@/lib/flight/facts';
import type { Lang } from '@/lib/i18n/lang';

/**
 * 칸 목록 — 도시 짝 옆에 거리를 미리 적는다.
 */
export default function FlightList({
  cells,
  path,
  lang,
  current,
}: {
  cells: Cell[];
  path: string;
  lang: Lang;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = flightFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                : 'chip-off hover:border-blue-400'
            }`}
          >
            <div className="cell-sub-cut">{nameOf(lang, c.from)} → {nameOf(lang, c.to)}</div>
            <div className="cell-num">{f.km.toLocaleString('en-US')} km</div>
          </Link>
        );
      })}
    </div>
  );
}
