import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/battery/list';
import { batteryFacts } from '@/lib/battery/facts';

/**
 * 칸 목록 — 충전기 출력과 채우는 시간을 나란히.
 *
 * 여기 오는 사람은 "얼마나 걸리나"를 보러 온다. 눌러 보기 전에 답이 있는
 * 편이 낫다.
 */
export default function BatteryList({
  cells,
  path,
  clock,
  current,
}: {
  cells: Cell[];
  path: string;
  clock: (minutes: number) => string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = batteryFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-green-500 bg-green-50 dark:bg-green-950/40'
                : 'chip-off hover:border-green-400'
            }`}
          >
            <div className="cell-sub">{c.mah}mAh · {c.watt}W</div>
            <div className="cell-num">{clock(f.minutes)}</div>
          </Link>
        );
      })}
    </div>
  );
}
