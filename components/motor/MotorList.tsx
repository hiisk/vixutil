import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/motor/list';
import { motorFacts } from '@/lib/motor/facts';
import { fmtNum } from '@/lib/motor/ui';
import type { Lang } from '@/lib/i18n/lang';

/**
 * 칸 목록 — 이름과 함께 토크를 미리 적는다.
 *
 * 목록에서 토크가 바로 보여야 "어느 조합이 얼마나 무거운가"를 안 헤맨다.
 * 숫자는 fmtNum으로 찍는다 — 본문과 소수점 기호가 어긋나면 같은 값이 두 얼굴이 된다.
 */
export default function MotorList({
  cells,
  path,
  lang,
  by,
  current,
}: {
  cells: Cell[];
  path: string;
  lang: Lang;
  /** 칸 이름을 무엇으로 적을지 — 같은 출력 줄이면 회전수만, 같은 회전수 줄이면 출력만 */
  by: 'rpm' | 'power' | 'both';
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = motorFacts(c);
        const here = slug === current;
        const name =
          by === 'rpm'
            ? `${c.rpm} rpm`
            : by === 'power'
              ? `${fmtNum(lang, c.kw)} kW`
              : `${fmtNum(lang, c.kw)}kW ${c.rpm}rpm`;
        return (
          <Link
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`rounded-xl border px-3 py-2 transition-colors ${
              here
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400'
            }`}
          >
            <div className="cell-cut">{name}</div>
            <div className="text-sm font-bold tabular-nums text-slate-800 dark:text-slate-100">
              {fmtNum(lang, f.torque)} N·m
              <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                {fmtNum(lang, f.kgfm)} kgf·m
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
