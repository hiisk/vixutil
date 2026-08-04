import Link from 'next/link';
import { decades, isLeap } from '@/lib/year/facts';

/**
 * 십 년씩 묶은 목차 — 윤년은 진하게 둔다.
 *
 * 201해를 한 줄로 늘어놓으면 어디가 어딘지 모른다. 윤년이 눈에 띄면 네 해마다
 * 한 번씩 규칙적으로 박혀 있는 것이 보이고, 1900·2100에서 그 규칙이 한 번씩
 * 끊기는 것도 그대로 드러난다.
 */
export default function YearDecades({
  path,
  current,
  name,
}: {
  path: string;
  current?: number;
  name: (from: number) => string;
}) {
  return (
    <div className="space-y-4">
      {decades().map(({ from, years }) => (
        <section key={from}>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">{name(from)}</h3>
          <div className="flex flex-wrap gap-1.5">
            {years.map(y => {
              const here = y === current;
              const leap = isLeap(y);
              return (
                <Link
                  key={y}
                  href={`${path}/${y}`}
                  aria-current={here ? 'page' : undefined}
                  className={[
                    'rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums transition-colors',
                    here
                      ? 'bg-rose-700 text-white'
                      : leap
                        ? 'border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:border-rose-500'
                        : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-rose-400 hover:text-rose-700 dark:hover:text-rose-400',
                  ].join(' ')}
                >
                  {y}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
