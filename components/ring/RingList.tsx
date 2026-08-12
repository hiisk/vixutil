import Link from 'next/link';
import { slugOf } from '@/lib/ring/list';
import { ringFacts } from '@/lib/ring/facts';

/**
 * 칸 목록 — 내주와 함께 미국 반 사이즈, 일본 호수를 미리 적는다.
 *
 * 목록에서 세 표기가 같이 보여야 "내가 아는 표기"로 자기 칸을 찾는다. 내주만
 * 늘어놓으면 미국 6이라고만 아는 사람은 어디를 눌러야 하는지 모른다.
 */
export default function RingList({
  cells,
  path,
  current,
}: {
  /** 내주(mm) 목록 */
  cells: number[];
  path: string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(mm => {
        const slug = slugOf(mm);
        const f = ringFacts(mm);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-rose-400'
            }`}
          >
            <div className="cell-cut tabular-nums">{mm} mm</div>
            <div className="text-sm font-bold tabular-nums text-slate-800 dark:text-slate-100">
              US {f.usHalf}
              <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                JP {f.jpWhole}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
