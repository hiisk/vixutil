import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/gear/list';
import { gearFacts } from '@/lib/gear/facts';

/**
 * 칸 목록 — 앞뒤 잇수와 함께 기어비를 미리 적는다.
 *
 * 목록에서 기어비가 바로 보여야 "어느 칸이 더 무거운가"를 안 헤맨다.
 */
export default function GearList({
  cells,
  path,
  by,
  current,
}: {
  cells: Cell[];
  path: string;
  /** 칸 이름을 무엇으로 적을지 — 같은 체인링 줄이면 스프라켓으로, 반대면 체인링으로 */
  by: 'rear' | 'front';
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = gearFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-400'
            }`}
          >
            <div className="cell-cut">{by === 'rear' ? `${c.front}×${c.rear}` : `${c.front}T`}</div>
            <div className="text-sm font-bold tabular-nums text-slate-800 dark:text-slate-100">
              {f.ratio}
              <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                {f.development} m
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
