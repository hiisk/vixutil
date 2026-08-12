import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/rebar/list';
import { rebarFacts } from '@/lib/rebar/facts';
import { barName, fmtNum } from '@/lib/rebar/ui';
import type { Lang } from '@/lib/i18n/lang';

/**
 * 칸 목록 — 이름과 함께 한 가닥 무게를 미리 적는다.
 *
 * 목록에서 무게가 바로 보여야 "어느 규격이 얼마나 무거운가"를 안 헤맨다.
 * 숫자는 fmtNum으로 찍는다 — 본문과 소수점 기호가 어긋나면 같은 값이 두 얼굴이 된다.
 */
export default function RebarList({
  cells,
  path,
  lang,
  by,
  current,
}: {
  cells: Cell[];
  path: string;
  lang: Lang;
  /** 칸 이름을 무엇으로 적을지 — 같은 규격 줄이면 길이만, 같은 길이 줄이면 규격만 */
  by: 'length' | 'bar' | 'both';
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = rebarFacts(c);
        const here = slug === current;
        const name =
          by === 'length' ? `${c.length}m` : by === 'bar' ? barName(c.d) : `${barName(c.d)} ${c.length}m`;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-400'
            }`}
          >
            <div className="cell-cut">{name}</div>
            <div className="text-sm font-bold tabular-nums text-slate-800 dark:text-slate-100">
              {fmtNum(lang, f.perBar)} kg
              <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                {fmtNum(lang, f.unit)} kg/m
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
