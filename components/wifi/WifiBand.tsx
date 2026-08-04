import Link from 'next/link';
import { type Band, labelOf, slugOf } from '@/lib/wifi/list';
import { centerOf, inBand, wifiFacts } from '@/lib/wifi/facts';

/**
 * 한 대역의 채널을 늘어놓는다 — 겹치지 않는 자리를 진하게.
 *
 * 2.4GHz에서 눈에 띄는 세 칸이 1·6·11이다. 목록만 봐도 왜 그 셋인지 짐작이
 * 가도록, 겹침이 없는 채널에만 색을 준다.
 */
export default function WifiBand({
  band,
  path,
  current,
  clean,
}: {
  band: Band;
  path: string;
  current?: string;
  clean: Set<number>;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {inBand(band).map(c => {
        const here = slugOf(c) === current;
        const isClean = clean.has(c.n);
        return (
          <Link
            key={slugOf(c)}
            href={`${path}/${slugOf(c)}`}
            aria-current={here ? 'page' : undefined}
            title={`${labelOf(c)} · ${centerOf(c)}MHz`}
            className={[
              'rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums transition-colors',
              here
                ? 'bg-blue-700 text-white'
                : isClean
                  ? 'border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 hover:border-blue-500'
                  : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-blue-400 hover:text-blue-700 dark:hover:text-blue-400',
            ].join(' ')}
          >
            {c.n}
            {wifiFacts(c).dfs && <span className="ml-1 text-[10px] opacity-60">DFS</span>}
          </Link>
        );
      })}
    </div>
  );
}
