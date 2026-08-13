import Link from 'next/link';
import { type Bit, slugOf } from '@/lib/drill/list';

/**
 * 비트 목록 한 덩어리 — 이름 아래에 밀리미터를 붙인다.
 *
 * 인치·번호·문자 계열은 이름만 봐서는 굵기를 알 수 없다. 밀리미터가 늘 함께
 * 보여야 계열을 건너뛰어 고를 수 있다.
 */
export default function DrillList({
  bits,
  path,
  current,
}: {
  bits: Bit[];
  path: string;
  current?: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {bits.map(b => {
        const here = slugOf(b) === current;
        return (
          <Link prefetch={false}
            key={slugOf(b)}
            href={`${path}/${slugOf(b)}`}
            aria-current={here ? 'page' : undefined}
            className={[
              'rounded-lg px-2 py-1 text-center text-[11px] font-bold tabular-nums transition-colors',
              here
                ? 'bg-neutral-700 text-white'
                : 'border chip-off text-slate-600 dark:text-slate-300 hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100',
            ].join(' ')}
          >
            {b.name}
            <span className="ml-1 font-normal opacity-60">{b.mm}</span>
          </Link>
        );
      })}
    </div>
  );
}
