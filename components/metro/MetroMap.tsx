'use client';
import { useMemo } from 'react';
import type { MetroLine } from '@/lib/metro/types';
import { layout } from '@/lib/metro/types';

/**
 * 노선도 — 맞힐 역 쪽으로 화면이 움직이며 힌트를 준다.
 *
 * 실제 지리가 아니라 도식이다. 지리 좌표를 쓰면 역이 한곳에 뭉쳐 이름을 얹을
 * 자리가 없고, 노선 하나만 그릴 때는 굽이의 순서만 맞으면 충분하다.
 *
 * 움직임은 viewBox를 CSS transition으로 옮겨서 만든다. 안쪽 요소를 각각
 * 옮기면 라벨까지 흔들려 읽기 어려워지는데, viewBox 하나만 바꾸면 화면이
 * 통째로 따라간다.
 */
export default function MetroMap({
  line,
  solved,
  focus,
}: {
  line: MetroLine;
  /** 역마다 맞혔는지 */
  solved: boolean[];
  /** 화면을 가져다 놓을 역의 자리 */
  focus: number;
}) {
  const pts = useMemo(() => layout(line), [line]);

  // 격자 한 칸을 픽셀로 늘린다. 라벨이 겹치지 않을 만큼만.
  const S = 46;
  const px = pts.map(p => ({ x: p.x * S, y: p.y * S }));

  const path = px.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ')
    + (line.loop ? ' Z' : '');

  // 보여줄 범위 — 맞힐 역을 가운데 두고 앞뒤 몇 정거장만
  const W = 620;
  const H = 300;
  const c = px[Math.min(focus, px.length - 1)] ?? { x: 0, y: 0 };
  const cut = (n: number) => Math.round(n * 100) / 100;
  const viewBox = `${cut(c.x - W / 2)} ${cut(c.y - H / 2)} ${W} ${H}`;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 overflow-hidden">
      <svg
        data-metro-map
        viewBox={viewBox}
        className="w-full h-[220px] sm:h-[260px] [transition:all_600ms_cubic-bezier(0.22,1,0.36,1)]"
        role="img"
        aria-label={line.ko.line}
      >
        <path d={path} fill="none" stroke={line.color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" opacity={0.28} />
        {px.map((p, i) => {
          if (i === 0) return null;
          if (!solved[i] || !solved[i - 1]) return null;
          // 맞힌 역끼리 이어진 구간만 진하게 — 어디까지 채웠는지 한눈에 보인다
          return (
            <line
              key={`seg-${i}`}
              x1={px[i - 1].x} y1={px[i - 1].y} x2={p.x} y2={p.y}
              stroke={line.color} strokeWidth={9} strokeLinecap="round"
            />
          );
        })}

        {px.map((p, i) => {
          const st = line.stations[i];
          const done = solved[i];
          const isFocus = i === focus;
          const big = st.mark === 'transfer' || st.mark === 'terminus';
          return (
            <g key={st.name + i}>
              {isFocus && !done && (
                // SMIL <animate>는 하이드레이션 직전에 r을 바꿔 서버 HTML과 어긋난다.
                // opacity만 흔드는 CSS 맥동은 속성을 다시 쓰지 않아 안전하다.
                <circle cx={p.x} cy={p.y} r={17} fill={line.color} className="animate-pulse" opacity={0.2} />
              )}
              <circle
                cx={p.x} cy={p.y} r={big ? 8 : 6}
                fill={done ? line.color : '#ffffff'}
                stroke={isFocus && !done ? line.color : done ? line.color : '#94a3b8'}
                strokeWidth={isFocus && !done ? 4 : 3}
              />
              {done && (
                <text
                  x={p.x} y={p.y - 15}
                  textAnchor="middle"
                  className="fill-slate-700 dark:fill-slate-200"
                  style={{ fontSize: 15, fontWeight: 700 }}
                >
                  {st.name}
                </text>
              )}
              {!done && isFocus && (
                <text
                  x={p.x} y={p.y + 27}
                  textAnchor="middle"
                  style={{ fontSize: 15, fontWeight: 700, fill: line.color }}
                >
                  ?
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
