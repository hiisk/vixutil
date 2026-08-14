import { slugOf, type Cell } from '@/lib/battery/list';
import { batteryFacts } from '@/lib/battery/facts';

/**
 * 칸 목록 — 충전기 출력과 채우는 시간을 나란히.
 *
 * 목록이 이미 답을 다 적고 있어서, 낱장으로 가던 링크는 걷어냈다.
 */
export default function BatteryList({
  cells,
  clock,
}: {
  cells: Cell[];
  clock: (minutes: number) => string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
      {cells.map(c => (
        <div key={slugOf(c)} className="chip chip-off">
          <div className="cell-sub">{c.mah}mAh · {c.watt}W</div>
          <div className="cell-num">{clock(batteryFacts(c).minutes)}</div>
        </div>
      ))}
    </div>
  );
}
