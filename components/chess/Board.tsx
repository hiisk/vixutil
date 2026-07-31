import type { ReactElement } from 'react';

/**
 * 판 그림.
 *
 * 기물은 유니코드 체스 글자(♞)가 아니라 직접 그린 도형이다. 글자로 그리면
 * 기기마다 다른 글꼴이 나와서 어떤 곳에서는 네모(▯)가 뜨고, 흰 기물과 검은
 * 기물이 같은 굵기로 보이지 않는 일도 있다. 도형은 어디서나 같게 나온다.
 *
 * 칸은 64글자로 받는다 — 배열로 받으면 페이지에 실리는 양이 몇 배가 된다.
 * 순서는 FEN과 같다. 0이 a8이고 63이 h1이다.
 */

const LIGHT = '#efe0c4';
const DARK = '#b58863';
const WHITE_FILL = '#fffdf8';
const BLACK_FILL = '#2b2622';

/** 기물 하나의 도형 — 100×100 상자 안에 그린다 */
const SHAPES: Record<string, ReactElement> = {
  p: (
    <g>
      <circle cx="50" cy="28" r="12" />
      <path d="M37 60 C37 49 45 45 50 38 C55 45 63 49 63 60 Z" />
      <path d="M30 80 C30 68 39 63 50 63 C61 63 70 68 70 80 Z" />
    </g>
  ),
  r: (
    <g>
      <path d="M26 20 h12 v8 h8 v-8 h8 v8 h8 v-8 h12 v20 l-8 6 v24 l8 10 v8 H26 v-8 l8 -10 V46 l-8 -6 Z" />
    </g>
  ),
  n: (
    <g>
      <path d="M30 84 C30 68 38 60 48 54 C54 50 56 46 54 40 L44 46 L40 38 C44 28 54 20 64 20 C74 20 80 28 82 40 C84 56 78 72 74 84 Z" />
      <circle cx="65" cy="36" r="3" fill="#8a7f74" stroke="none" />
    </g>
  ),
  b: (
    <g>
      <circle cx="50" cy="18" r="6" />
      <path d="M50 26 C63 35 69 47 67 60 H33 C31 47 37 35 50 26 Z" />
      <path d="M28 84 C28 72 38 66 50 66 C62 66 72 72 72 84 Z" />
      <path d="M50 36 V52" strokeWidth="4" stroke="#8a7f74" fill="none" />
    </g>
  ),
  q: (
    <g>
      <path d="M24 34 L32 66 H68 L76 34 L64 48 L57 28 L50 46 L43 28 L36 48 Z" />
      <path d="M30 70 H70 L75 84 H25 Z" />
    </g>
  ),
  k: (
    <g>
      <path d="M46 10 H54 V18 H62 V26 H54 V34 H46 V26 H38 V18 H46 Z" />
      <path d="M28 48 C28 38 40 34 50 42 C60 34 72 38 72 48 C72 58 60 64 50 72 C40 64 28 58 28 48 Z" />
      <path d="M30 74 H70 L75 86 H25 Z" />
    </g>
  ),
};

export default function Board({
  board,
  label,
  size = 320,
}: {
  /** 64글자. 빈 칸은 점 */
  board: string;
  label?: string;
  size?: number;
}) {
  const squares = [...board];
  return (
    <svg
      viewBox="0 0 8 8"
      width={size}
      height={size}
      role="img"
      aria-label={label}
      className="max-w-full h-auto rounded-lg shadow-sm"
    >
      {squares.map((_, i) => {
        const file = i % 8;
        const rank = Math.floor(i / 8);
        const dark = (file + rank) % 2 === 1;
        return <rect key={`s${i}`} x={file} y={rank} width={1} height={1} fill={dark ? DARK : LIGHT} />;
      })}
      {squares.map((piece, i) => {
        if (piece === '.') return null;
        const shape = SHAPES[piece.toLowerCase()];
        if (!shape) return null;
        const white = piece === piece.toUpperCase();
        return (
          <svg key={`p${i}`} x={i % 8} y={Math.floor(i / 8)} width={1} height={1} viewBox="0 0 100 100">
            <g
              fill={white ? WHITE_FILL : BLACK_FILL}
              stroke={white ? BLACK_FILL : '#f6f1e7'}
              strokeWidth={5}
              strokeLinejoin="round"
            >
              {shape}
            </g>
          </svg>
        );
      })}
    </svg>
  );
}
