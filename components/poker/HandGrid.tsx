import Link from 'next/link';
import { HANDS, RANKS, labelOf } from '@/lib/poker/list';
import { chenScore } from '@/lib/poker/facts';

/**
 * 13×13 시작 핸드 표.
 *
 * 포커에서 쓰는 그 표다 — 대각선이 포켓 페어, 위쪽 삼각형이 수티드, 아래쪽이
 * 오프수트다. 표 자체가 목차라서 169줄짜리 목록을 훑을 일이 줄어든다.
 *
 * 칸 색은 첸 점수에서 나온다. 점수를 손으로 칠하면 표를 고칠 때마다 색도 같이
 * 고쳐야 하지만, 계산에서 나오면 어긋날 자리가 없다.
 */

/** 점수 20점(AA)에서 -1점(72o)까지를 다섯 단계로 나눈다 */
function shade(score: number): string {
  if (score >= 10) return 'bg-emerald-600 text-white';
  if (score >= 8) return 'bg-emerald-400 text-emerald-950';
  if (score >= 6) return 'bg-amber-300 text-amber-950';
  if (score >= 4) return 'bg-orange-200 text-orange-950 dark:bg-orange-300/80';
  return 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';
}

export default function HandGrid({ path, current }: { path: string; current?: string }) {
  // 표는 A가 왼쪽 위다 — 포커 책이 전부 그 방향이라 뒤집으면 낯설다
  const order = [...RANKS].reverse();
  const at = (row: number, col: number) => {
    const high = row <= col ? order[row] : order[col];
    const low = row <= col ? order[col] : order[row];
    const kind = row === col ? 'pair' : row < col ? 'suited' : 'offsuit';
    return HANDS.find(h => RANKS[h.high] === high && RANKS[h.low] === low && h.kind === kind)!;
  };

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="grid min-w-[520px] grid-cols-13 gap-0.5" style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}>
        {order.map((_, row) =>
          order.map((__, col) => {
            const hand = at(row, col);
            const label = labelOf(hand);
            const here = hand.slug === current;
            return (
              <Link
                key={`${row}-${col}`}
                href={`${path}/${hand.slug}`}
                className={`flex aspect-square items-center justify-center rounded text-[10px] font-black tabular-nums transition-transform hover:scale-110 ${shade(chenScore(hand))} ${
                  here ? 'ring-2 ring-slate-900 dark:ring-white' : ''
                }`}
              >
                {label}
              </Link>
            );
          }),
        )}
      </div>
    </div>
  );
}
