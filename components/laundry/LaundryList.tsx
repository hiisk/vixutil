import Link from 'next/link';
import LaundrySymbol from '@/components/laundry/LaundrySymbol';
import { laundryFacts } from '@/lib/laundry/facts';
import { LAUNDRY_UI } from '@/lib/laundry/ui';
import type { Cell } from '@/lib/laundry/list';
import type { Lang } from '@/lib/i18n/lang';

/**
 * 칸 목록 — 그림과 이름을 나란히 둔다.
 *
 * 라벨을 들고 온 사람은 이름이 아니라 그림으로 찾으므로, 목록에서도 그림이 먼저다.
 * 금지 칸은 빨강으로 둔다 — 목록에서 한눈에 갈려야 잘못 누르지 않는다.
 */
export default function LaundryList({
  cells,
  path,
  lang,
  current,
}: {
  cells: Cell[];
  path: string;
  lang: Lang;
  current?: string;
}) {
  const ui = LAUNDRY_UI[lang];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const f = laundryFacts(c);
        const here = c.slug === current;
        return (
          <Link
            key={c.slug}
            href={`${path}/${c.slug}`}
            aria-current={here ? 'page' : undefined}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-sky-400'
            }`}
          >
            <LaundrySymbol
              cell={c}
              className={`w-8 h-8 shrink-0 ${
                f.forbidden ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200'
              }`}
            />
            <span className="cell-cut">{ui.name(f)}</span>
          </Link>
        );
      })}
    </div>
  );
}
