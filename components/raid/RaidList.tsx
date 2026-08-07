import Link from 'next/link';
import { levelLabel, levelOf, slugOf, type Cell } from '@/lib/raid/list';
import { raidFacts } from '@/lib/raid/facts';

/**
 * 칸 목록 — 레벨·장수 옆에 쓸 수 있는 장수를 미리 적는다.
 */
export default function RaidList({
  cells,
  path,
  diskWord,
  no,
  current,
}: {
  cells: Cell[];
  path: string;
  diskWord: string;
  no: string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = raidFacts(c);
        const here = slug === current;
        const l = levelOf(c.level);
        if (!l) return null;
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
            <div className="cell-sub-cut">{levelLabel(l)} · {c.disks}{diskWord}</div>
            <div className={`text-sm font-bold ${f.possible ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'} tabular-nums`}>
              {f.possible ? `${f.usable}${diskWord} · ${f.efficiency}%` : no}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
