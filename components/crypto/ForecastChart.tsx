'use client';
import { useId } from 'react';
import type { DailyPoint } from '@/lib/forecast';

/**
 * 과거 종가 + 향후 30일 projection 차트.
 *
 * 두 개의 시계열(실제 / 예측)이므로 범례를 둔다 — 색만으로 구분하게 두지 않는다.
 * 예측 구간(50%)은 채도 낮은 면(10% 불투명도)으로 깔고, 중앙값은 2px 실선으로 그린다.
 * 축·격자는 데이터보다 뒤로 물러나도록 1px 실선 회색.
 */
export default function ForecastChart({
  history,
  daily,
  spot,
  paths = [],
  height = 260,
}: {
  /** 과거 종가 (오래된 순) */
  history: number[];
  daily: DailyPoint[];
  spot: number;
  /** 같은 모델에서 뽑은 시뮬레이션 경로 — 예측이 아니라 표본이다 */
  paths?: number[][];
  height?: number;
}) {
  const uid = useId().replace(/:/g, '');
  if (history.length < 2 || daily.length < 2) {
    return <div className="h-40 grid place-items-center text-sm text-slate-600">Not enough data to chart</div>;
  }

  const W = 720, H = height;
  const padL = 8, padR = 62, padT = 12, padB = 26;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const nH = history.length;
  const nF = daily.length;
  const total = nH + nF; // 마지막 과거점(=오늘) 다음에 예측 1일차가 온다

  // y 범위: 과거 + 예측 구간을 담되, 시뮬레이션 경로도 대부분 들어오게 한다.
  // 경로 하나가 크게 튀어 축이 뭉개지지 않도록 2~98 분위로 자른다.
  const lows = [...history, ...daily.map(d => d.low)];
  const highs = [...history, ...daily.map(d => d.high)];
  if (paths.length) {
    const flat = paths.flat().sort((a, b) => a - b);
    const q = (f: number) => flat[Math.min(flat.length - 1, Math.max(0, Math.floor(f * flat.length)))];
    lows.push(q(0.02));
    highs.push(q(0.98));
  }
  let lo = Math.min(...lows), hi = Math.max(...highs);
  if (!(hi > lo)) { hi = lo * 1.01 || 1; lo = lo * 0.99; }
  const padY = (hi - lo) * 0.04;
  lo -= padY; hi += padY;

  const x = (i: number) => padL + (i / (total - 1)) * innerW;
  const y = (v: number) => padT + (1 - (v - lo) / (hi - lo)) * innerH;

  const histLine = history.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  // 예측선은 오늘(마지막 과거점)에서 이어붙여 끊기지 않게 한다
  const fx = (i: number) => x(nH - 1 + 1 + i);
  const medLine = [`M${x(nH - 1).toFixed(1)},${y(spot).toFixed(1)}`, ...daily.map((d, i) => `L${fx(i).toFixed(1)},${y(d.forecast).toFixed(1)}`)].join(' ');

  const bandTop = [`M${x(nH - 1).toFixed(1)},${y(spot).toFixed(1)}`, ...daily.map((d, i) => `L${fx(i).toFixed(1)},${y(d.high).toFixed(1)}`)];
  const bandBottom = [...daily].reverse().map((d, i) => `L${fx(nF - 1 - i).toFixed(1)},${y(d.low).toFixed(1)}`);
  const bandPath = [...bandTop, ...bandBottom, 'Z'].join(' ');

  const divX = x(nH - 1);
  const last = daily[nF - 1];
  const up = last.forecast >= spot;
  const accent = up ? '#34d399' : '#fb7185';

  const ticks = [lo + (hi - lo) * 0.08, (lo + hi) / 2, hi - (hi - lo) * 0.08];
  const fmtTick = (v: number) => (v >= 1000 ? v.toLocaleString('en-US', { maximumFractionDigits: 0 }) : v >= 1 ? v.toFixed(2) : v.toPrecision(3));

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }} role="img" aria-label="Price history and 30-day forecast with 50% range">
        {/* 격자 — 데이터보다 뒤로 */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={padL + innerW} y1={y(t)} y2={y(t)} stroke="#1e293b" strokeWidth={1} />
            <text x={padL + innerW + 6} y={y(t) + 4} fill="#475569" fontSize={11} fontFamily="ui-monospace, monospace">{fmtTick(t)}</text>
          </g>
        ))}

        {/* 오늘 경계 */}
        <line x1={divX} x2={divX} y1={padT} y2={padT + innerH} stroke="#334155" strokeWidth={1} />
        <text x={divX + 5} y={padT + 11} fill="#64748b" fontSize={10}>today</text>

        {/* 시뮬레이션 경로 — 데이터가 아니라 표본이므로 가장 뒤에, 가장 옅게 */}
        {paths.length > 0 && (
          <g clipPath={`url(#clip-${uid})`} opacity={0.35}>
            {paths.map((pth, pi) => (
              <path key={pi} d={[`M${x(nH - 1).toFixed(1)},${y(spot).toFixed(1)}`,
                ...pth.map((v, i) => `L${fx(i).toFixed(1)},${y(v).toFixed(1)}`)].join(' ')}
                fill="none" stroke={accent} strokeWidth={1} strokeLinejoin="round" />
            ))}
          </g>
        )}

        {/* 50% 구간 — 옅은 면 */}
        <path d={bandPath} fill={accent} opacity={0.1} />

        {/* 과거 종가 */}
        <path d={histLine} fill="none" stroke="#94a3b8" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {/* 예측 중앙값 */}
        <path d={medLine} fill="none" stroke={accent} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {/* 오늘 지점 마커 — 표면색 링으로 겹침 방지 */}
        <circle cx={divX} cy={y(spot)} r={4} fill="#e2e8f0" stroke="#0f172a" strokeWidth={2} />
        <circle cx={fx(nF - 1)} cy={y(last.forecast)} r={4} fill={accent} stroke="#0f172a" strokeWidth={2} />

        <defs>
          <clipPath id={`clip-${uid}`}><rect x={padL} y={padT} width={innerW} height={innerH} /></clipPath>
        </defs>
      </svg>

      {/* 두 개 이상의 시계열 → 범례는 항상 둔다 */}
      <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 mt-1">
        <span className="inline-flex items-center gap-1.5"><span className="w-4 h-0.5 bg-slate-400 rounded" /> Actual close</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-4 h-0.5 rounded" style={{ background: accent }} /> Forecast</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-4 h-2 rounded-sm" style={{ background: accent, opacity: 0.25 }} /> 50% range</span>
        {paths.length > 0 && (
          <span className="inline-flex items-center gap-1.5"><span className="w-4 h-0.5 rounded" style={{ background: accent, opacity: 0.4 }} /> simulated paths</span>
        )}
      </div>
    </div>
  );
}
