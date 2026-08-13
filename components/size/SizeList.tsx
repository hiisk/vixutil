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
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40'
                : 'chip-off hover:border-purple-400'
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
