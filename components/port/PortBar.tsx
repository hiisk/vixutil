import { PORT_MAX, REGISTERED_MAX, WELL_KNOWN_MAX } from '@/lib/port/list';

/**
 * 0부터 65535까지의 띠 — 이 포트가 어디쯤인지 한 눈에.
 *
 * 세 구간의 넓이가 실제 비율 그대로다. 잘 알려진 포트(0~1023)는 전체의 1.6%라
 * 왼쪽 끝에 실낱같이 붙는데, 그 좁은 자리에 우리가 아는 이름이 거의 다 몰려 있다는
 * 것이 이 그림의 뜻이다.
 */
export default function PortBar({ port, label }: { port: number; label: string }) {
  const pct = (n: number) => (n / PORT_MAX) * 100;
  return (
    <div className="relative h-8 w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
      <div className="absolute inset-y-0 left-0 bg-fuchsia-300 dark:bg-fuchsia-800" style={{ width: `${pct(WELL_KNOWN_MAX)}%` }} />
      <div
        className="absolute inset-y-0 bg-fuchsia-100 dark:bg-fuchsia-950/60"
        style={{ left: `${pct(WELL_KNOWN_MAX)}%`, width: `${pct(REGISTERED_MAX - WELL_KNOWN_MAX)}%` }}
      />
      <div
        className="absolute inset-y-0 bg-slate-100 dark:bg-slate-800"
        style={{ left: `${pct(REGISTERED_MAX)}%`, right: 0 }}
      />
      {/* 이 포트의 자리 — 1픽셀짜리 선은 안 보이므로 최소 너비를 준다 */}
      <div
        className="absolute inset-y-0 w-[3px] bg-slate-900 dark:bg-white"
        style={{ left: `min(calc(100% - 3px), ${pct(port)}%)` }}
        aria-label={label}
      />
    </div>
  );
}
