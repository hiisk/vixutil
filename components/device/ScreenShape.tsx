/**
 * 화면 모양 그림 — 실제 화면비 그대로 그린다.
 *
 * 숫자만 늘어놓으면 19.5:9가 얼마나 길쭉한지 감이 안 온다. 같은 자리에 실제
 * 비율로 사각형을 그리고 대각선을 그어 두면, 표를 읽기 전에 모양이 먼저 보인다.
 *
 * 그리는 값은 전부 빌드 때 정해진다 — 브라우저가 계산할 것이 없으니 수화(hydration)
 * 어긋남이 생길 자리도 없다.
 */
export default function ScreenShape({
  ratio,
  portrait,
  diagonal,
  widthLabel,
  heightLabel,
}: {
  /** 긴 변 ÷ 짧은 변 */
  ratio: number;
  /** 세로가 더 긴 화면인가 — 휴대폰은 세우고 TV는 눕힌다 */
  portrait: boolean;
  /** 가운데 적을 글 — 6.3" 처럼 */
  diagonal: string;
  widthLabel: string;
  heightLabel: string;
}) {
  // 긴 변을 100으로 잡고 짧은 변을 비례로 — 세우고 눕히는 것은 화면이 정한다
  const long = 100;
  const short = Math.round((100 / ratio) * 10) / 10;
  const w = portrait ? short : long;
  const h = portrait ? long : short;
  const pad = 20;
  const vb = `0 0 ${w + pad * 2} ${h + pad * 2}`;
  const fontSize = Math.min(w, h) * 0.16;
  // 글자 폭을 어림한다 — 6.3인치처럼 짧은 글이라 이 정도면 충분하다
  const label = diagonal.length * fontSize * 0.62 + fontSize * 0.6;

  return (
    <svg
      viewBox={vb}
      className="w-full max-h-56 text-slate-500 dark:text-slate-400"
      role="img"
      aria-label={`${widthLabel} × ${heightLabel}`}
    >
      <rect
        x={pad}
        y={pad}
        width={w}
        height={h}
        rx={Math.min(w, h) * 0.06}
        className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600"
        strokeWidth={1.4}
      />
      {/* 대각선 — 인치가 재는 것이 바로 이 선이다 */}
      <line
        x1={pad}
        y1={pad + h}
        x2={pad + w}
        y2={pad}
        className="stroke-sky-500"
        strokeWidth={1.4}
        strokeDasharray="3 2.5"
      />
      {/* 대각선이 글자를 가로지르므로 뒤에 바탕을 깐다 */}
      <rect
        x={pad + w / 2 - label / 2}
        y={pad + h / 2 - fontSize * 0.72}
        width={label}
        height={fontSize * 1.44}
        rx={fontSize * 0.4}
        className="fill-white dark:fill-slate-800"
      />
      <text
        x={pad + w / 2}
        y={pad + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-slate-700 dark:fill-slate-200"
        style={{ fontSize, fontWeight: 800 }}
      >
        {diagonal}
      </text>
      <text
        x={pad + w / 2}
        y={pad + h + 11}
        textAnchor="middle"
        className="fill-slate-400 dark:fill-slate-500"
        style={{ fontSize: Math.min(w, h) * 0.1, fontWeight: 700 }}
      >
        {widthLabel}
      </text>
      <text
        x={pad - 8}
        y={pad + h / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-slate-400 dark:fill-slate-500"
        style={{ fontSize: Math.min(w, h) * 0.1, fontWeight: 700, writingMode: 'vertical-rl' }}
      >
        {heightLabel}
      </text>
    </svg>
  );
}
