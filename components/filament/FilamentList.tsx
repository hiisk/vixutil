import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/filament/list';
import { filamentFacts } from '@/lib/filament/facts';
import { kgOf, materialName } from '@/lib/filament/ui';

/**
 * 칸 목록 — 이름과 함께 1.75mm 길이를 미리 적는다.
 *
 * 목록에서 길이가 바로 보여야 "어느 재료가 더 길게 감기나"를 안 헤맨다.
 */
export default function FilamentList({
  cells,
  path,
  by,
  current,
}: {
  cells: Cell[];
  path: string;
  /** 칸 이름을 무엇으로 적을지 — 같은 무게 줄이면 재료만, 아니면 재료와 무게 */
  by: 'spool' | 'material';
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = filamentFacts(c);
        const d = f.diameters[0];
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40'
                : 'chip-off hover:border-violet-400'
            }`}
          >
            <div className="cell-cut">{by === 'spool' ? `${materialName(c.material)} ${kgOf(c.grams)}` : materialName(c.material)}</div>
            <div className="val">
              {d.metres} m
              <span className="val-unit">
                {d.gramsPerMetre} g/m
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
