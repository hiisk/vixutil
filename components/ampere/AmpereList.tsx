import { slugOf, type Cell } from '@/lib/ampere/list';
import { ampereFacts } from '@/lib/ampere/facts';

/**
 * 칸 목록 — 가전·회로와 함께 흐르는 전류를 미리 적는다.
 *
 * 회로 하나로 감당이 안 되는 칸은 색으로 갈라 둔다. 그 자리가 이 표에서
 * 사람이 찾는 것이다.
 *
 * 낱장은 이 칸을 페이지로 옮긴 것뿐이라 지웠다 — 링크 없이 값만 보인다.
 */
export default function AmpereList({
  cells,
  name,
}: {
  cells: Cell[];
  name: (key: string) => string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const f = ampereFacts(c);
        return (
          <div key={slugOf(c)} className="chip chip-off">
            <div className="cell-cut">{name(c.key)}</div>
            <div className={`text-sm font-bold tabular-nums ${f.overload ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-100'}`}>
              {f.amp}A · {f.together}
            </div>
          </div>
        );
      })}
    </div>
  );
}
