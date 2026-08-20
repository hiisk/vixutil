/**
 * 화각을 그림으로 — 카메라 자리에서 부채꼴이 벌어진다.
 *
 * 46.8도라는 숫자는 눈에 들어오지 않는다. 8mm의 부채와 800mm의 바늘을 나란히
 * 놓아 봐야 얼마나 다른지 알 수 있다. 각도 하나만 받아 그리므로 상세 화면과
 * 목록이 같은 그림을 쓴다.
 */
const W = 320;
const H = 176;

export default function AngleFan({ deg, label, className = '' }: { deg: number; label: string; className?: string }) {
  const apexX = W / 2;
  const apexY = H - 18;
  const half = (Math.min(deg, 179) / 2) * (Math.PI / 180);

  // 위쪽 테두리에 닿는 길이와 옆 테두리에 닿는 길이 중 짧은 쪽까지만 뻗는다
  const toTop = Math.cos(half) > 0.001 ? (apexY - 14) / Math.cos(half) : Infinity;
  const toSide = Math.sin(half) > 0.001 ? (apexX - 10) / Math.sin(half) : Infinity;
  const len = Math.min(toTop, toSide);

  const dx = Math.sin(half) * len;
  const dy = Math.cos(half) * len;
  const left = { x: apexX - dx, y: apexY - dy };
  const right = { x: apexX + dx, y: apexY - dy };

  // 각도 표시용 짧은 호
  const r = 34;
  const ax = { x: apexX - Math.sin(half) * r, y: apexY - Math.cos(half) * r };
  const bx = { x: apexX + Math.sin(half) * r, y: apexY - Math.cos(half) * r };
  const bigArc = deg > 180 ? 1 : 0;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={label}>
      <defs>
        <linearGradient id="fanFill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* 담기는 범위 */}
      <path
        d={`M ${apexX} ${apexY} L ${left.x} ${left.y} A ${len} ${len} 0 ${bigArc} 1 ${right.x} ${right.y} Z`}
        fill="url(#fanFill)"
        className="text-indigo-500"
      />
      <path
        d={`M ${left.x} ${left.y} L ${apexX} ${apexY} L ${right.x} ${right.y}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="text-indigo-500 dark:text-indigo-400"
      />

      {/* 각도 호 */}
      <path
        d={`M ${ax.x} ${ax.y} A ${r} ${r} 0 0 1 ${bx.x} ${bx.y}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="3 3"
        className="text-slate-500 dark:text-slate-400"
      />

      {/* 카메라 몸통 */}
      <rect x={apexX - 17} y={apexY - 1} width="34" height="17" rx="4" className="fill-slate-700 dark:fill-slate-300" />
      <circle cx={apexX} cy={apexY + 7.5} r="5" className="fill-slate-300 dark:fill-slate-700" />

      {/* 글자가 부채 선 위에 얹히므로 바탕을 깔아 준다 — 8mm처럼 넓은 각에서 특히 겹친다 */}
      <rect
        x={apexX - (label.length * 4.3 + 10)}
        y={apexY - r - 24}
        width={label.length * 8.6 + 20}
        height="22"
        rx="6"
        className="fill-white dark:fill-slate-900"
      />
      <text
        x={apexX}
        y={apexY - r - 8}
        textAnchor="middle"
        className="fill-slate-700 dark:fill-slate-200"
        style={{ fontSize: 15, fontWeight: 800 }}
      >
        {label}
      </text>
    </svg>
  );
}
