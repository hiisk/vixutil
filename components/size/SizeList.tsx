import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/size/list';
import { sizeFacts } from '@/lib/size/facts';

/**
 * 칸 목록 — 치수와 함께 한국 호수·국제 표기를 미리 적는다.
 */
export default function SizeList({
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
        const f = sizeFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-purple-400'
            }`}
          >
            <div className="cell-sub">{c.cm}cm</div>
            <div className="cell-num">{f.korea} · {f.intl}</div>
          </Link>
        );
      })}
    </div>
  );
}
