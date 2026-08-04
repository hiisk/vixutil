import Link from 'next/link';
import { RIMS, TIRES, labelOf, slugOf } from '@/lib/tire/list';
import { diameterOf } from '@/lib/tire/facts';

/**
 * 휠 지름별 목록 — 타이어만 갈아 끼우는 경우가 가장 많아서다.
 *
 * 204가지를 한 줄로 늘어놓으면 자기 치수를 찾기 어렵다. 휠은 그대로 두고
 * 타이어만 바꾸는 것이 보통이므로, 휠 지름이 곧 첫 갈래가 된다.
 */
export default function TireRims({
  path,
  current,
  name,
  only,
}: {
  path: string;
  current?: string;
  name: (rim: number) => string;
  only?: number;
}) {
  const rims = only === undefined ? RIMS : [only];
  return (
    <div className="space-y-4">
      {rims.map(rim => (
        <section key={rim}>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">{name(rim)}</h3>
          <div className="flex flex-wrap gap-1.5">
            {TIRES.filter(t => t.rim === rim).map(t => {
              const here = slugOf(t) === current;
              return (
                <Link
                  key={slugOf(t)}
                  href={`${path}/${slugOf(t)}`}
                  aria-current={here ? 'page' : undefined}
                  className={[
                    'rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums transition-colors',
                    here
                      ? 'bg-slate-700 text-white'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-100',
                  ].join(' ')}
                >
                  {labelOf(t)} <span className="font-normal text-[11px] opacity-70">{diameterOf(t)}mm</span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
