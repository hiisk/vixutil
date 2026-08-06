import Link from 'next/link';
import { sizeLabel, slugOf, type Cell } from '@/lib/wire/list';
import { wireFacts } from '@/lib/wire/facts';

/**
 * 칸 목록 — 굵기·전류와 함께 230V에서 갈 수 있는 길이를 붙인다.
 *
 * 굵기만 늘어놓으면 고를 수가 없다. 이 표를 여는 이유가 "얼마나 멀리"이므로
 * 그 답을 링크마다 미리 적는다.
 */
export default function WireList({
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
        const f = wireFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-400'
            }`}
          >
            <div className="cell-sub">{sizeLabel(c.size)} · {c.amp}A</div>
            <div className={`text-sm font-bold tabular-nums ${f.fits ? 'text-slate-800 dark:text-slate-100' : 'text-rose-600 dark:text-rose-400'}`}>
              {f.reach[3].metres}m
            </div>
          </Link>
        );
      })}
    </div>
  );
}
