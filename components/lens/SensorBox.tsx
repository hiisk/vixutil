/**
 * 센서 크기를 실제 비율로 겹쳐 그린다 — 35mm 판이 바깥, 이 센서가 안쪽.
 *
 * 크롭 배수 1.53이라는 숫자보다, 두 사각형이 얼마나 차이 나는지가 빠르다.
 */
import { sensorOf, type SensorKey } from '@/lib/lens/list';

const FF_W = 36;
const FF_H = 24;
const PAD = 14;
const W = 260;
const SCALE = (W - PAD * 2) / FF_W;
const H = FF_H * SCALE + PAD * 2;

export default function SensorBox({ sensor, label, className = '' }: { sensor: SensorKey; label: string; className?: string }) {
  const s = sensorOf(sensor);
  const outW = FF_W * SCALE;
  const outH = FF_H * SCALE;
  const inW = s.w * SCALE;
  const inH = s.h * SCALE;
  const cx = PAD + outW / 2;
  const cy = PAD + outH / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={label}>
      {/* 35mm 판 — 기준 */}
      <rect
        x={PAD}
        y={PAD}
        width={outW}
        height={outH}
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="4 4"
        className="text-slate-500 dark:text-slate-400"
      />
      {/* 이 센서 */}
      <rect
        x={cx - inW / 2}
        y={cy - inH / 2}
        width={inW}
        height={inH}
        rx="3"
        className="fill-indigo-500/15 stroke-indigo-500 dark:stroke-indigo-400"
        strokeWidth="1.5"
      />
      <text
        x={cx}
        y={cy + 4}
        textAnchor="middle"
        className="fill-slate-600 dark:fill-slate-300"
        style={{ fontSize: 11, fontWeight: 700 }}
      >
        {s.w} × {s.h} mm
      </text>
    </svg>
  );
}
