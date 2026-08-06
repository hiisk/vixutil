import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/ampere/list';
import { ampereFacts } from '@/lib/ampere/facts';

/**
 * 칸 목록 — 가전·회로와 함께 흐르는 전류를 미리 적는다.
 *
 * 회로 하나로 감당이 안 되는 칸은 색으로 갈라 둔다. 그 자리가 이 표에서
 * 사람이 찾는 것이다.
 */
export default function AmpereList({
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
        const f = ampereFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-yellow-400'
            }`}
          >
            <div className="cell-cut">{name(c.key)}</div>
            <div className={`text-sm font-bold tabular-nums ${f.overload ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-100'}`}>
              {f.amp}A · {f.together}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
