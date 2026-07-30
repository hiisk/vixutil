/**
 * 경우 그림 — 큐브를 위에서 내려다본 모습.
 *
 * 색은 손으로 칠하지 않는다. 공식을 실제로 돌려 나온 스티커 배열을 그대로
 * 받아서 칠하므로, 그림이 공식과 어긋날 방법이 없다.
 *
 * 가운데 아홉 칸이 윗면, 바깥으로 삐져나온 열두 칸이 옆면의 첫 줄이다.
 * F2L은 슬롯 안이 보여야 하므로 오른쪽 앞에 네 칸을 덧붙인다.
 */
/** U R F D L B 여섯 색과, 이 경우와 상관없는 칸을 칠할 회색 */
const COLOURS = ['#facc15', '#ef4444', '#22c55e', '#f1f5f9', '#f97316', '#3b82f6', '#94a3b8'];

/** 윗면 아홉 칸 */
const FACE = [0, 1, 2, 3, 4, 5, 6, 7, 8];
/** 옆면 첫 줄 — 위(뒤), 오른쪽, 아래(앞), 왼쪽 차례 */
const BACK = [45, 46, 47];
const RIGHT = [9, 10, 11];
const FRONT = [20, 19, 18];
const LEFT = [38, 37, 36];
/** 오른쪽 앞 슬롯 — 앞면 오른쪽 두 칸과 오른쪽 면 왼쪽 두 칸 */
const SLOT_FRONT = [23, 26];
const SLOT_RIGHT = [12, 15];

const CELL = 26;
const GAP = 3;
const TAB = 9;
const PAD = TAB + GAP + 4;
const GRID = CELL * 3 + GAP * 2;

export default function CubeTop({
  state,
  slot = false,
  label,
  className = '',
}: {
  state: number[];
  slot?: boolean;
  label: string;
  className?: string;
}) {
  const w = GRID + PAD * 2 + (slot ? TAB + GAP + 4 : 0);
  const h = GRID + PAD * 2 + (slot ? TAB + GAP + 4 : 0);
  const at = (i: number) => COLOURS[state[i]] ?? '#cbd5e1';
  const xy = (col: number, row: number) => ({ x: PAD + col * (CELL + GAP), y: PAD + row * (CELL + GAP) });

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-label={label}>
      {/* 윗면 */}
      {FACE.map(i => {
        const { x, y } = xy(i % 3, Math.floor(i / 3));
        return <rect key={`f${i}`} x={x} y={y} width={CELL} height={CELL} rx="4" fill={at(i)} stroke="#334155" strokeWidth="1" />;
      })}

      {/* 뒤쪽 첫 줄 */}
      {BACK.map((i, n) => (
        <rect key={`b${i}`} x={PAD + n * (CELL + GAP)} y={PAD - TAB - GAP} width={CELL} height={TAB} rx="2.5" fill={at(i)} stroke="#334155" strokeWidth="0.8" />
      ))}
      {/* 앞쪽 첫 줄 */}
      {FRONT.map((i, n) => (
        <rect key={`fr${i}`} x={PAD + n * (CELL + GAP)} y={PAD + GRID + GAP} width={CELL} height={TAB} rx="2.5" fill={at(i)} stroke="#334155" strokeWidth="0.8" />
      ))}
      {/* 오른쪽 첫 줄 */}
      {RIGHT.map((i, n) => (
        <rect key={`r${i}`} x={PAD + GRID + GAP} y={PAD + n * (CELL + GAP)} width={TAB} height={CELL} rx="2.5" fill={at(i)} stroke="#334155" strokeWidth="0.8" />
      ))}
      {/* 왼쪽 첫 줄 */}
      {LEFT.map((i, n) => (
        <rect key={`l${i}`} x={PAD - TAB - GAP} y={PAD + n * (CELL + GAP)} width={TAB} height={CELL} rx="2.5" fill={at(i)} stroke="#334155" strokeWidth="0.8" />
      ))}

      {/* 슬롯 — 앞면 오른쪽 칸 두 개와 오른쪽 면 왼쪽 칸 두 개 */}
      {slot && (
        <g>
          {SLOT_FRONT.map((i, n) => (
            <rect
              key={`sf${i}`}
              x={PAD + 2 * (CELL + GAP)}
              y={PAD + GRID + GAP + TAB + GAP + n * (TAB + GAP)}
              width={CELL}
              height={TAB}
              rx="2.5"
              fill={at(i)}
              stroke="#334155"
              strokeWidth="0.8"
            />
          ))}
          {SLOT_RIGHT.map((i, n) => (
            <rect
              key={`sr${i}`}
              x={PAD + GRID + GAP + TAB + GAP + n * (TAB + GAP)}
              y={PAD + 2 * (CELL + GAP)}
              width={TAB}
              height={CELL}
              rx="2.5"
              fill={at(i)}
              stroke="#334155"
              strokeWidth="0.8"
            />
          ))}
        </g>
      )}
    </svg>
  );
}
