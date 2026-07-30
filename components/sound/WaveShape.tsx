/**
 * 파형 그림 — 주기 하나를 표시해 준다.
 *
 * 주기가 2.27밀리초라는 말은 숫자로만 보면 아무것도 아니다. 사인파 위에 그
 * 한 마디를 괄호로 묶어 두면, 주파수가 높아질수록 마디가 촘촘해진다는 것이
 * 표를 읽기 전에 보인다.
 *
 * 그리는 값은 전부 빌드 때 정해진다 — 브라우저가 계산할 것이 없다.
 */
export default function WaveShape({ periodLabel, cycles = 3 }: { periodLabel: string; cycles?: number }) {
  const W = 300;
  const H = 90;
  const mid = 44;
  const amp = 26;
  const per = W / cycles;

  // 사인파를 베지에로 흉내 낸다 — 반주기마다 볼록/오목을 뒤집는다
  let d = `M0 ${mid}`;
  for (let i = 0; i < cycles * 2; i++) {
    const half = per / 2;
    const dir = i % 2 === 0 ? -amp : amp;
    d += ` q ${half / 2} ${dir} ${half} 0`;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-sm" role="img" aria-label={periodLabel}>
      <line x1={0} y1={mid} x2={W} y2={mid} className="stroke-slate-200 dark:stroke-slate-700" strokeWidth={1} />
      <path d={d} fill="none" className="stroke-emerald-500" strokeWidth={2.4} strokeLinecap="round" />
      {/* 주기 한 마디 */}
      <path
        d={`M${per} ${mid + amp + 12} v6 h${per} v-6`}
        fill="none"
        className="stroke-slate-300 dark:stroke-slate-600"
        strokeWidth={1.4}
      />
      <text
        x={per * 1.5}
        y={H - 4}
        textAnchor="middle"
        className="fill-slate-500 dark:fill-slate-400"
        style={{ fontSize: 12, fontWeight: 800 }}
      >
        {periodLabel}
      </text>
    </svg>
  );
}
