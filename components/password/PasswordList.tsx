import { slugOf, type Cell } from '@/lib/password/list';
import { passwordFacts } from '@/lib/password/facts';

/**
 * 칸 목록 — 집합과 길이에 계산된 비트를 붙인다.
 */
export default function PasswordList({
  cells,
  name,
  current,
}: {
  cells: Cell[];
  name: (key: string) => string;
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = passwordFacts(c);
        const here = slug === current;
        return (
          <span
            key={slug}
           
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40'
                : 'chip-off hover:border-teal-400'
            }`}>
            <div className="cell-cut">{name(c.charset)} · {c.length}</div>
            <div className="cell-num">{f.bits} bit</div>
          </span>
        );
      })}
    </div>
  );
}
