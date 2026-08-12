import { glyph, VIEW, type Prim } from '@/lib/laundry/facts';
import type { Cell } from '@/lib/laundry/list';

/**
 * 라벨의 기호를 그린다 — 이모지가 아니라 도형이다.
 *
 * 그림이 자료가 아니라 **조합**이므로, 여기서 하는 일은 lib/laundry/facts.ts가
 * 낸 조각 목록을 SVG 태그로 옮기는 것뿐이다. 점 세 개를 그릴지 네 개를 그릴지는
 * 저쪽이 정하고, 이 파일은 세지 않는다 — 그래서 개수가 맞는지는 JSX 없는
 * 검사(tests/laundry-symbol.test.ts)가 조각을 세어 확인할 수 있다.
 *
 * 서버에서 끝난다. 상태도 이벤트도 없다.
 */

/** 밑줄은 도형 아래를 가로지른다 — 길이는 어느 도형에서나 같다 */
const BAR_X = [5.5, 18.5];

/** ×표는 그림 전체를 가로지르는 두 줄이다 */
const CROSS: [number, number, number, number][] = [
  [1.6, 1.8, 22.4, 18.6],
  [22.4, 1.8, 1.6, 18.6],
];

function draw(p: Prim, i: number) {
  switch (p.kind) {
    case 'path':
      return <path key={i} d={p.d} />;
    case 'line':
      return <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} />;
    case 'circle':
      return <circle key={i} cx={p.cx} cy={p.cy} r={p.r} />;
    /* 점은 채운 원 — 온도를 세는 자리라 윤곽선만으로 두지 않는다 */
    case 'dot':
      return <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="currentColor" stroke="none" />;
    case 'bar':
      return <line key={i} x1={BAR_X[0]} y1={p.y} x2={BAR_X[1]} y2={p.y} strokeWidth={1.7} />;
    case 'cross':
      return (
        <g key={i}>
          {CROSS.map(([x1, y1, x2, y2], k) => (
            <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.7} />
          ))}
        </g>
      );
    case 'text':
      return (
        <text
          key={i}
          x={12}
          y={p.cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={p.size}
          fontWeight={700}
          fill="currentColor"
          stroke="none"
        >
          {p.text}
        </text>
      );
  }
}

export default function LaundrySymbol({
  cell,
  className = 'w-9 h-9',
  label,
}: {
  cell: Cell;
  className?: string;
  /** 읽어 주는 이름 — 없으면 그림으로만 둔다 */
  label?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-hidden={label ? undefined : true}
      aria-label={label}
    >
      {label ? <title>{label}</title> : null}
      {glyph(cell).map(draw)}
    </svg>
  );
}
