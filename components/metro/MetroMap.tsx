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

  /**
   * 보여줄 범위 — 맞힐 역과 앞뒤 몇 정거장이 다 들어가게 맞춘다.
   *
   * 처음에는 고정 크기 창을 초점에 갖다 놓았는데, 역이 마흔 개가 넘는 순환선은
   * 타원이 너무 커서 창에 짧은 사선 한 토막만 담겼다 — 순환선인 것도, 어디쯤인
   * 것도 안 보였다. 그래서 이웃 역들의 실제 범위를 재서 그 범위에 창을 맞춘다.
   * 노선 길이와 굽이에 따라 배율이 알아서 달라지고, 초점이 옮겨지면 창도 따라간다.
   */
  const NEAR = 3;
  const n = px.length;
  const near: { x: number; y: number }[] = [];
  for (let d = -NEAR; d <= NEAR; d++) {
    // 순환선은 양 끝이 이어져 있으므로 앞뒤로 감아 돈다
    const i = line.loop ? (focus + d + n * 2) % n : focus + d;
    if (i >= 0 && i < n) near.push(px[i]);
  }
  const box = near.length > 0 ? near : px;
  const xs = box.map(p => p.x);
  const ys = box.map(p => p.y);
  const PAD = 62;
  const ASPECT = 620 / 280;
  let minX = Math.min(...xs) - PAD;
  let minY = Math.min(...ys) - PAD;
  let w = Math.max(Math.max(...xs) - Math.min(...xs) + PAD * 2, 280);
  let h = Math.max(Math.max(...ys) - Math.min(...ys) + PAD * 2, 180);
  // 컨테이너 비율에 맞춰 좁은 쪽을 늘린다 — 안 맞추면 위아래에 빈 띠가 생긴다
  if (w / h < ASPECT) {
    const nw = h * ASPECT;
    minX -= (nw - w) / 2;
    w = nw;
  } else {
    const nh = w / ASPECT;
    minY -= (nh - h) / 2;
    h = nh;
  }
  const cut = (v: number) => Math.round(v * 100) / 100;
  const viewBox = `${cut(minX)} ${cut(minY)} ${cut(w)} ${cut(h)}`;

  /**
   * 배율 보정 — 선 굵기·점 크기·글자 크기를 창 크기에 비례시킨다.
   *
   * 창이 노선 길이에 따라 달라지므로 고정 값을 쓰면 마흔 개짜리 순환선에서는
   * 역 이름이 개미만 하게, 열여섯 개짜리 노선에서는 지나치게 크게 나온다.
   * 620을 기준으로 잡아 화면에서 늘 같은 크기로 보이게 한다.
   */
  /**
   * 초점에서 몇 정거장 떨어졌는지 — 순환선은 양쪽으로 감아 재야 한다.
   * 지나온 역 전부에 이름을 붙이면 마흔 개짜리 노선에서 글자가 서로 덮는다.
   * 가까운 역만 붙이고, 나머지는 채운 점으로만 둔다(전체 이름은 아래 역 목록에 있다).
   */
  const away = (i: number) => {
    const d = Math.abs(i - focus);
    return line.loop ? Math.min(d, n - d) : d;
  };
  const NAMED = 3;

  /**
   * 창이 세로로 길면 비율을 맞추느라 가로를 늘리는데, 그러면 배율이 커져 선과
   * 글자가 뚱뚱해진다. 위아래로 잘라 둔다.
   */
  const K = Math.min(Math.max(w / 620, 0.7), 1.5);
  const LINE_W = 8 * K;
  const DOT = 6 * K;
  const DOT_BIG = 8 * K;
  const FONT = 15 * K;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 overflow-hidden">
      <svg
        data-metro-map
        viewBox={viewBox}
        className="w-full h-[220px] sm:h-[260px] [transition:all_600ms_cubic-bezier(0.22,1,0.36,1)]"
        role="img"
        aria-label={line.ko.line}
      >
        <path d={path} fill="none" stroke={line.color} strokeWidth={LINE_W} strokeLinecap="round" strokeLinejoin="round" opacity={0.28} />
        {px.map((p, i) => {
          if (i === 0) return null;
          if (!solved[i] || !solved[i - 1]) return null;
          // 맞힌 역끼리 이어진 구간만 진하게 — 어디까지 채웠는지 한눈에 보인다
          return (
            <line
              key={`seg-${i}`}
              x1={px[i - 1].x} y1={px[i - 1].y} x2={p.x} y2={p.y}
              stroke={line.color} strokeWidth={LINE_W} strokeLinecap="round"
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
                <circle cx={p.x} cy={p.y} r={17 * K} fill={line.color} className="animate-pulse" opacity={0.2} />
              )}
              {/*
                역은 늘 흰 원이고 테두리 색으로만 갈린다 — 실제 노선도와 같은 방식이다.
                맞힌 역을 선 색으로 채워 봤더니 선에 묻혀 점과 선이 한 덩이로 뭉쳤다.
              */}
              <circle
                cx={p.x} cy={p.y} r={big ? DOT_BIG : DOT}
                className="fill-white dark:fill-slate-900"
                stroke={done || isFocus ? line.color : '#94a3b8'}
                strokeWidth={(isFocus && !done ? 4 : 3) * K}
              />
              {done && away(i) <= NAMED && (
                // 위아래로 번갈아 놓는다 — 한쪽에만 붙이면 옆 역 이름과 겹친다
                <text
                  x={p.x}
                  y={i % 2 === 0 ? p.y - DOT_BIG - FONT * 0.5 : p.y + DOT_BIG + FONT}
                  textAnchor="middle"
                  className="fill-slate-700 dark:fill-slate-200 stroke-slate-50 dark:stroke-slate-900"
                  // 흰 테두리를 먼저 깔고 글자를 얹는다 — 이름이 길어 옆 라벨과 겹쳐도 읽힌다
                  style={{ fontSize: FONT, fontWeight: 700, strokeWidth: FONT * 0.28, paintOrder: 'stroke' }}
                >
                  {st.name}
                </text>
              )}
              {!done && isFocus && (
                // 물음표는 점 오른쪽에 — 아래에 두면 옆 역 라벨과 부딪힌다
                <text
                  x={p.x + DOT_BIG + FONT * 0.5} y={p.y + FONT * 0.4}
                  textAnchor="middle"
                  style={{ fontSize: FONT * 1.3, fontWeight: 900, fill: line.color }}
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
