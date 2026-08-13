import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/viewing/list';
import { viewingFacts } from '@/lib/viewing/facts';

/**
 * 칸 목록 — 크기와 해상도에 계산된 권장 거리를 붙인다.
 */
export default function ViewingList({
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
        const f = viewingFacts(c);
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
            <div className="cell-sub-cut">{c.inch}&quot; · {name(c.res).split(' ')[0]}</div>
            <div className="cell-num">{f.smpte} cm</div>
          </Link>
        );
      })}
    </div>
  );
}
