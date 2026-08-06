import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/password/list';
import { passwordFacts } from '@/lib/password/facts';

/**
 * 칸 목록 — 집합과 길이에 계산된 비트를 붙인다.
 */
export default function PasswordList({
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
        const f = passwordFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-teal-400'
            }`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{name(c.charset)} · {c.length}</div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-100 tabular-nums">{f.bits} bit</div>
          </Link>
        );
      })}
    </div>
  );
}
