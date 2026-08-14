import { slugOf, type Cell } from '@/lib/lumen/list';
import { lumenFacts } from '@/lib/lumen/facts';

/**
 * 칸 목록 — 넓이·쓰임과 함께 필요한 루멘을 미리 적는다.
 *
 * 낱장을 없앴으므로 칸은 더 이상 링크가 아니다 — 값은 그대로 여기서 다 읽힌다.
 */
export default function LumenList({
  cells,
  name,
}: {
  cells: Cell[];
  name: (key: string) => string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const f = lumenFacts(c);
        return (
          <div key={slugOf(c)} className="chip chip-off">
            <div className="cell-sub">{c.area}㎡ · {name(c.use)}</div>
            <div className="cell-num">{f.lumen}lm</div>
          </div>
        );
      })}
    </div>
  );
}
