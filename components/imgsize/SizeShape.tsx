/**
 * 크기 그림 — 화면비 그대로 사각형을 그린다.
 *
 * 1080×1920이 얼마나 길쭉한지 숫자만으로는 안 잡힌다. 실제 비로 그려 두면
 * 목록에서 고를 때 모양이 먼저 보인다.
 */
export default function SizeShape({ w, h, label }: { w: number; h: number; label: string }) {
  const long = 100;
  const ratio = Math.max(w, h) / Math.min(w, h);
  const short = Math.round((long / ratio) * 10) / 10;
  const portrait = h > w;
  const bw = portrait ? short : long;
  const bh = portrait ? long : short;
  const pad = 16;

  return (
    <svg viewBox={`0 0 ${bw + pad * 2} ${bh + pad * 2}`} className="w-full max-h-48" role="img" aria-label={label}>
      <rect
        x={pad}
        y={pad}
        width={bw}
        height={bh}
        rx={Math.min(bw, bh) * 0.05}
        className="fill-white dark:fill-slate-800 stroke-pink-400"
        strokeWidth={1.4}
      />
      <text
        x={pad + bw / 2}
        y={pad + bh / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-slate-600 dark:fill-slate-300"
        style={{ fontSize: Math.min(bw, bh) * 0.13, fontWeight: 800 }}
      >
        {label}
      </text>
    </svg>
  );
}
