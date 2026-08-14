import { slugOf, type Cell } from '@/lib/bandwidth/list';
import { bandwidthFacts } from '@/lib/bandwidth/facts';

/**
 * 칸 목록 — 속도와 걸리는 시간을 나란히.
 *
 * 이 표를 여는 사람은 "얼마나 걸리나"를 보러 온다. 목록이 이미 답을 다
 * 적고 있어서, 낱장으로 가던 링크는 걷어냈다.
 */
export default function BandwidthList({
  cells,
  time,
}: {
  cells: Cell[];
  time: (f: ReturnType<typeof bandwidthFacts>) => string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => {
        const f = bandwidthFacts(c);
        return (
          <div key={slugOf(c)} className="chip chip-off">
            <div className="cell-sub">{f.size} · {c.mbps}Mbps</div>
            <div className="cell-num">{time(f)}</div>
          </div>
        );
      })}
    </div>
  );
}
