import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/paper/list';
import { paperFacts } from '@/lib/paper/facts';

/**
 * 칸 목록 — 규격 이름과 픽셀을 나란히.
 *
 * 이 표를 여는 이유가 "몇 픽셀로 만들까"라서, 링크마다 그 답을 미리 적는다.
 */
export default function PaperList({
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
        const f = paperFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-slate-500 bg-slate-100 dark:bg-slate-800'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400'
            }`}
          >
            <div className="cell-sub">{name(c.size.key)} · {c.dpi}dpi</div>
            <div className="cell-num">{f.pixels.w}×{f.pixels.h}</div>
          </Link>
        );
      })}
    </div>
  );
}
