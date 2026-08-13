import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/purifier/list';
import { purifierFacts } from '@/lib/purifier/facts';

/**
 * 칸 목록 — 방과 청정능력 옆에 시간당 환기 횟수를 미리 적는다.
 */
const TONE: Record<string, string> = {
  ample: 'text-emerald-600 dark:text-emerald-400',
  enough: 'text-cyan-700 dark:text-cyan-300',
  tight: 'text-amber-600 dark:text-amber-400',
  short: 'text-red-600 dark:text-red-400',
};

export default function PurifierList({
  cells,
  path,
  areaWord,
  current,
}: {
  cells: Cell[];
  path: string;
  areaWord: string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = purifierFacts(c);
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
            <div className="cell-sub-cut">{c.area}{areaWord} · CADR {c.cadr}</div>
            <div className={`text-sm font-bold tabular-nums ${TONE[f.grade]}`}>{f.ach} ACH</div>
          </Link>
        );
      })}
    </div>
  );
}
