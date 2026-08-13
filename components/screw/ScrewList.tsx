import Link from 'next/link';
import { SCREWS, labelOf, slugOf } from '@/lib/screw/list';
import { screwFacts } from '@/lib/screw/facts';

/**
 * 나사 목록 한 덩어리 — 규격 옆에 탭 드릴을 함께 적는다.
 *
 * 이 표를 여는 손은 대개 드릴을 들고 있다. 목록에서 바로 그 숫자가 보이면
 * 낱장까지 들어가지 않아도 된다.
 */
export default function ScrewList({
  screws,
  path,
  current,
}: {
  screws: typeof SCREWS;
  path: string;
  current?: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {screws.map(s => {
        const here = slugOf(s) === current;
        return (
          <Link prefetch={false}
            key={slugOf(s)}
            href={`${path}/${slugOf(s)}`}
            aria-current={here ? 'page' : undefined}
            className={[
              'rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums transition-colors',
              here
                ? 'bg-slate-700 text-white'
                : 'border chip-off text-slate-600 dark:text-slate-300 hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100',
            ].join(' ')}
          >
            {labelOf(s)} <span className="font-normal text-[11px] opacity-70">⌀{screwFacts(s).tapDrill}</span>
          </Link>
        );
      })}
    </div>
  );
}
