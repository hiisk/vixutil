import Link from 'next/link';
import { slugOf } from '@/lib/quake/list';
import { quakeFacts } from '@/lib/quake/facts';

/**
 * 칸 목록 — 규모 옆에 TNT 톤수를 미리 적는다.
 *
 * 축이 하나뿐인 섹션이라 다른 목록과 달리 수를 그대로 받는다.
 */
export default function QuakeList({
  magnitudes,
  path,
  current,
}: {
  magnitudes: number[];
  path: string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {magnitudes.map(m => {
        const slug = slugOf(m);
        const f = quakeFacts(m);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40'
                : 'chip-off hover:border-rose-400'
            }`}
          >
            <div className="cell-sub">M {m.toFixed(2)}</div>
            <div className="cell-num">10^{f.logTnt} t</div>
          </Link>
        );
      })}
    </div>
  );
}
