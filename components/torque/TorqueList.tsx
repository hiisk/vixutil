import Link from 'next/link';
import { gradeOf, sizeLabel, slugOf, type Cell } from '@/lib/torque/list';
import { torqueFacts } from '@/lib/torque/facts';

/**
 * 칸 목록 — 볼트와 등급, 그리고 건조 상태의 토크.
 *
 * 이 표를 여는 이유가 "몇으로 조이나"라서 그 값을 링크마다 미리 적는다.
 */
export default function TorqueList({
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
        const f = torqueFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-orange-400'
            }`}
          >
            <div className="cell-sub">{sizeLabel(c.d)} · {gradeOf(c.grade)?.label}</div>
            <div className="cell-num">{f.turns[1].nm} N·m</div>
          </Link>
        );
      })}
    </div>
  );
}
