'use client';
import { useState } from 'react';
import { formatPrice } from '@/lib/atr';

/** 코인 로고 — 공개 CDN(jsDelivr). 목록에 없는 코인은 티커 앞 2글자 아바타로 폴백 */
export function CoinLogo({ base, size = 24 }: { base: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const style = { width: size, height: size };
  if (failed) {
    return (
      <span style={style} className="shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-black grid place-items-center">
        {base.slice(0, 2)}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/32/color/${base.toLowerCase()}.png`}
      alt="" width={size} height={size} loading="lazy" onError={() => setFailed(true)}
      style={style} className="shrink-0 rounded-full"
    />
  );
}

/**
 * 종가 스파크라인. 단일 시계열이라 축·범례 없이 2px 선만 그린다.
 * 방향은 색만으로 전달하지 않는다 — 옆의 부호·삼각형(▲▼)이 같은 정보를 중복 인코딩한다.
 */
export function Sparkline({ points, w = 84, h = 28 }: { points: number[]; w?: number; h?: number }) {
  if (points.length < 2) return <span className="text-slate-700 dark:text-slate-200">-</span>;
  const min = Math.min(...points), max = Math.max(...points);
  const flat = max === min; // 무변동 구간은 바닥이 아니라 세로 중앙에 그린다
  const span = max - min;
  const pad = 3;
  const d = points
    .map((p, i) => {
      const x = pad + (i / (points.length - 1)) * (w - pad * 2);
      const y = flat ? h / 2 : pad + (1 - (p - min) / span) * (h - pad * 2);
      return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const up = points[points.length - 1] >= points[0];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="inline-block align-middle">
      <path d={d} fill="none" className={up ? 'stroke-emerald-600 dark:stroke-emerald-400' : 'stroke-rose-600 dark:stroke-rose-400'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 변동률 — 색 + 삼각형 + 부호로 이중 인코딩(색만으로 방향을 전달하지 않음) */
export function Pct({ value, bold = false }: { value: number; bold?: boolean }) {
  const up = value >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 tabular-nums ${bold ? 'font-black' : ''} ${up ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
      <span className="text-[0.65em] leading-none">{up ? '▲' : '▼'}</span>
      {up ? '+' : '-'}{Math.abs(value).toFixed(2)}%
    </span>
  );
}

/**
 * 시뮬레이션 경로 미니 차트 — 같은 모델에서 뽑은 표본 몇 개.
 * 예측선이 아니라 "이 코인이 30일 동안 이런 식으로 움직일 수 있다"는 표본이므로
 * 얇고 흐리게 그리고, 헤더에 그렇게 표기한다.
 */
export function MiniPaths({ paths, spot, w = 76, h = 26 }: { paths: number[][]; spot: number; w?: number; h?: number }) {
  if (!paths.length || paths[0].length < 2) return <span className="text-slate-700 dark:text-slate-200">-</span>;
  const flat = paths.flat();
  let lo = Math.min(spot, ...flat), hi = Math.max(spot, ...flat);
  if (!(hi > lo)) { hi = lo * 1.01 || 1; lo = lo * 0.99; }
  const pad = 2;
  const n = paths[0].length;
  const x = (i: number) => pad + ((i + 1) / n) * (w - pad * 2);
  const y = (v: number) => pad + (1 - (v - lo) / (hi - lo)) * (h - pad * 2);
  const up = paths.reduce((s, p) => s + (p[p.length - 1] >= spot ? 1 : 0), 0) >= paths.length / 2;
  const color = up ? 'stroke-emerald-600 dark:stroke-emerald-400' : 'stroke-rose-600 dark:stroke-rose-400';
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" className="inline-block align-middle">
      <line x1={pad} x2={w - pad} y1={y(spot)} y2={y(spot)} className="stroke-slate-300 dark:stroke-slate-600" strokeWidth={1} />
      {paths.map((p, pi) => (
        <path
          key={pi}
          d={[`M${pad.toFixed(1)},${y(spot).toFixed(1)}`, ...p.map((v, i) => `L${x(i).toFixed(1)},${y(v).toFixed(1)}`)].join(' ')}
          fill="none" className={color} strokeWidth={1} strokeLinejoin="round" opacity={0.55}
        />
      ))}
    </svg>
  );
}

/** 큰 숫자를 좁은 표 셀에 넣기 위한 축약 표기. 소액 코인은 formatPrice에 맡긴다. */
export function compactPrice(v: number): string {
  if (!isFinite(v)) return '-';
  if (v >= 1e9) return `${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return formatPrice(v);
}

export function formatVolume(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
  return `$${v.toFixed(0)}`;
}
