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
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400'
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate tabular-nums">{c.inch}&quot; · {name(c.res).split(' ')[0]}</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{f.smpte} cm</div>
          </Link>
        );
      })}
    </div>
  );
}
