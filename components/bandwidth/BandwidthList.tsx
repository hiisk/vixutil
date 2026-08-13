import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/bandwidth/list';
import { bandwidthFacts } from '@/lib/bandwidth/facts';

/**
 * 칸 목록 — 속도와 걸리는 시간을 나란히.
 *
 * 이 표를 여는 사람은 "얼마나 걸리나"를 보러 온다. 그래서 링크마다 시간을
 * 미리 붙인다 — 눌러 보기 전에 답이 있는 편이 낫다.
 */
export default function BandwidthList({
  cells,
  path,
  time,
  current,
}: {
  cells: Cell[];
  path: string;
  time: (f: ReturnType<typeof bandwidthFacts>) => string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = bandwidthFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40'
                : 'chip-off hover:border-sky-400'
            }`}
          >
            <div className="cell-sub">{f.size} · {c.mbps}Mbps</div>
            <div className="cell-num">{time(f)}</div>
          </Link>
        );
      })}
    </div>
  );
}
