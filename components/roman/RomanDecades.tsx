import { decades, toRoman } from '@/lib/roman/facts';

/**
 * 십 년씩 묶은 목차 — 201해를 한 줄로 늘어놓지 않는다.
 *
 * 사람은 "1994년"보다 "90년대 어디쯤"으로 기억해 온다. 그래서 묶음이 곧
 * 길잡이가 된다.
 */
export default function RomanDecades({ current,
  name,
}: {
  current?: number;
  name: (from: number) => string;
}) {
  return (
    <div className="space-y-4">
      {decades().map(({ from, years }) => (
        <section key={from}>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2">{name(from)}</h3>
          <div className="flex flex-wrap gap-1.5">
            {years.map(y => (
              <span
                key={y}
               
                aria-current={y === current ? 'page' : undefined}
                className={[
                  'rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums transition-colors',
                  y === current
                    ? 'bg-amber-600 text-white'
                    : 'border chip-off text-slate-600 dark:text-slate-300 hover:border-amber-400 hover:text-amber-700 dark:hover:text-amber-400',
                ].join(' ')}>
                {y} <span className="font-bold">{toRoman(y)}</span>
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
