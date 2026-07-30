/**
 * 합마다의 경우의 수를 막대로 — 주사위가 늘수록 가운데로 몰리는 모습이 보인다.
 *
 * 숫자만 늘어놓으면 4332와 1의 차이가 눈에 들어오지 않는다. 막대 하나가
 * 경우의 수에 그대로 비례하므로, 여섯 개짜리에서 양 끝이 바닥에 붙는 것이
 * 보인다. 지금 보고 있는 합만 색을 달리한다.
 */
const H = 120;
const PAD_BOTTOM = 18;

export default function SumBars({
  curve,
  active,
  label,
  className = '',
}: {
  curve: { sum: number; ways: number }[];
  active?: number;
  label: string;
  className?: string;
}) {
  const peak = Math.max(...curve.map(c => c.ways));
  const gap = curve.length > 20 ? 1.5 : 3;
  const barW = 14;
  const step = barW + gap;
  const w = curve.length * step - gap;
  // 합이 열 개를 넘으면 눈금을 띄엄띄엄 — 다 적으면 겹친다
  const tickEvery = curve.length > 20 ? 5 : curve.length > 12 ? 2 : 1;

  return (
    <svg viewBox={`0 0 ${w} ${H + PAD_BOTTOM}`} className={className} role="img" aria-label={label}>
      {curve.map((c, i) => {
        const h = Math.max(1.5, (c.ways / peak) * H);
        const on = c.sum === active;
        return (
          <g key={c.sum}>
            <rect
              x={i * step}
              y={H - h}
              width={barW}
              height={h}
              rx="2"
              className={on ? 'fill-rose-500' : 'fill-slate-300 dark:fill-slate-600'}
            />
            {(c.sum - curve[0].sum) % tickEvery === 0 || on ? (
              <text
                x={i * step + barW / 2}
                y={H + 13}
                textAnchor="middle"
                className={on ? 'fill-rose-600 dark:fill-rose-400' : 'fill-slate-400 dark:fill-slate-500'}
                style={{ fontSize: 10, fontWeight: on ? 800 : 600 }}
              >
                {c.sum}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
