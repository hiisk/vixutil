import Link from 'next/link';
import { slugOf, type Cell } from '@/lib/dof/list';
import { dofFacts } from '@/lib/dof/facts';

/**
 * 칸 목록 — 초점거리·조리개와 함께 과초점거리를 미리 적는다.
 *
 * 목록에서 값이 바로 보여야 "어느 칸을 눌러야 하나"를 안 헤맨다.
 */
export default function DofList({
  cells,
  path,
  by,
  current,
}: {
  cells: Cell[];
  path: string;
  /** 칸 이름을 무엇으로 적을지 — 같은 렌즈 줄이면 조리개로, 같은 조리개 줄이면 초점거리로 */
  by: 'aperture' | 'focal';
  current?: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const slug = slugOf(c);
        const f = dofFacts(c);
        const here = slug === current;
        return (
          <Link prefetch={false}
            key={slug}
            href={`${path}/${slug}`}
            aria-current={here ? 'page' : undefined}
            className={`chip ${
              here
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
                : 'chip-off hover:border-indigo-400'
            }`}
          >
            <div className="cell-cut">{by === 'aperture' ? `f/${c.aperture}` : `${c.focal} mm`}</div>
            <div className="val">
              {f.hyperfocal} m
            </div>
          </Link>
        );
      })}
    </div>
  );
}
