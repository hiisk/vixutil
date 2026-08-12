import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/fertilizer/list';
import { fertilizerFacts } from '@/lib/fertilizer/facts';
import { SYMBOL, labelOf, mass, num } from '@/lib/fertilizer/ui';
import type { Lang } from '@/lib/i18n/lang';

/**
 * 칸 목록 — 이름과 함께 뿌릴 양을 미리 적는다.
 *
 * 목록에서 무게가 바로 보여야 "어느 비료가 더 많이 드나"를 안 헤맨다. 함량이
 * 낮은 비료일수록 같은 성분에 더 많이 들어가는데, 그 역비례가 목록에서 한눈에
 * 보이는 것이 이 섹션의 값이다.
 */
export default function FertilizerList({
  cells,
  path,
  lang,
  by,
  current,
}: {
  cells: Cell[];
  path: string;
  lang: Lang;
  /** 칸 이름을 무엇으로 적을지 — 같은 비료 줄이면 면적만, 아니면 비료 이름 */
  by: 'area' | 'fertilizer';
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = fertilizerFacts(c);
        const here = slug === current;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-lime-500 bg-lime-50 dark:bg-lime-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-lime-400'
            }`}
          >
            <div className="cell-cut">
              {by === 'area' ? `${num(lang, c.area)} m²` : labelOf(f, lang)}
            </div>
            <div className="text-sm font-bold tabular-nums text-slate-800 dark:text-slate-100">
              {mass(lang, f.main.grams)}
              <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                {SYMBOL[f.basis]} {num(lang, f.content)}%
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
