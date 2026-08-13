import Link from 'next/link';
import { NUMBERS } from '@/lib/sqrt/list';
import { sqrtFacts } from '@/lib/sqrt/facts';

/**
 * 1부터 200까지 한 줄로 — 완전제곱수는 진하게 둔다.
 *
 * 200개를 그냥 늘어놓으면 어디가 어딘지 모른다. 딱 떨어지는 열넷을 눈에 띄게
 * 두면 그것이 눈금이 되어, 찾는 수가 어느 언저리인지 바로 잡힌다.
 */
export default function SqrtStrip({ path, current }: { path: string; current?: number }) {
  return (
    <div className="flex flex-wrap gap-1">
      {NUMBERS.map(n => {
        const exact = sqrtFacts(n).exact !== null;
        const here = n === current;
        return (
          <Link
            key={n}
            href={`${path}/${n}`}
            aria-current={here ? 'page' : undefined}
            className={[
              'w-9 rounded-md py-1 text-center text-[11px] font-bold tabular-nums transition-colors',
              here
                ? 'bg-indigo-600 text-white'
                : exact
                  ? 'border border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:border-indigo-500'
                  : 'border chip-off text-slate-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400',
            ].join(' ')}
          >
            {n}
          </Link>
        );
      })}
    </div>
  );
}
