/**
 * 그림 한 장이 만드는 뜻과, 그 그림을 그리는 좌표.
 *
 * 라벨의 기호는 요소가 뜻을 정하므로, 여기서 하는 일은 **되짚기**다.
 *
 *   점 개수 → 온도    물세탁은 WASH_TEMPS의 그 자리, 다림질은 IRON_TEMPS의 그 자리
 *   밑줄 개수 → 강도  0 보통 · 1 약하게 · 2 아주 약하게
 *   ×표 → 금지        그 손질을 하지 말라는 뜻이다
 *
 * 표를 적어 두지 않는다. 점 세 개가 50°C인 것은 온도 줄의 세 번째가 50이기
 * 때문이고, 그 줄은 list.ts에 한 번만 있다. 그래서 온도 하나를 고치면 점 표기와
 * 숫자 표기, 화면과 검사가 함께 움직인다 —
 * tests/laundry-symbol.test.ts가 점↔온도를 양쪽으로 대조한다.
 *
 * ── 그림 좌표를 왜 여기서 만드는가 ─────────────────────
 * 조합이 곧 그림이라, 점 개수와 밑줄 개수를 좌표로 바꾸는 일은 자료를 읽는 일과
 * 같은 규칙이다. 컴포넌트에 두면 검사가 못 본다(JSX는 node --test가 못 읽는다).
 * 그래서 도형 조각을 값으로 내고, 컴포넌트는 그 값을 SVG 태그로 옮기기만 한다 —
 * lib/og-icon-map.ts를 og-icons.tsx에서 떼어낸 것과 같은 까닭이다.
 */
import { relatedBySlug } from '../related-window.ts';
import {
  BARS,
  CELLS,
  IRON_TEMPS,
  STRENGTH_SLUGS,
  WASH_TEMPS,
  cellOf,
  type Cell,
  type Family,
  type Mark,
  type Notation,
} from './list.ts';

/** 밑줄 개수가 말하는 세기 */
export type Strength = 'normal' | 'mild' | 'very-mild';

/**
 * 뜻을 만들 때 가르는 갈피 — 열 언어 문구가 이것으로 갈라진다.
 * 갈래(family)보다 잘다: 사각형 하나가 기계건조와 자연건조로 갈리기 때문이다.
 */
export type Kind =
  | 'wash'
  | 'hand'
  | 'wring'
  | 'bleach'
  | 'bleach-oxygen'
  | 'tumble'
  | 'natural'
  | 'iron'
  | 'dryclean'
  | 'wetclean';

/** 자연건조 방식 — 줄에 걸든 눕히든, 물을 빼며 하는지가 갈린다 */
export type NaturalWay = 'line' | 'drip-line' | 'flat' | 'drip-flat';

/** 밑줄 개수 → 세기. 개수가 곧 자리다 */
export const strengthOf = (bars: number): Strength => STRENGTH_SLUGS[bars] as Strength;

/** 세기 → 밑줄 개수. 되짚어도 같은 값이어야 한다 */
export const barsOfStrength = (s: Strength): number => STRENGTH_SLUGS.indexOf(s);

/** 점 개수 → 물세탁 최고 온도(°C). 점이 없으면 온도가 안 적힌 것이다 */
export const washTempOfDots = (dots: number): number | undefined => WASH_TEMPS[dots - 1];

/** 물세탁 온도 → 점 개수 */
export const dotsOfWashTemp = (t: number): number => WASH_TEMPS.indexOf(t) + 1;

/** 점 개수 → 다림질 밑판 온도(°C) */
export const ironTempOfDots = (dots: number): number | undefined => IRON_TEMPS[dots - 1];

/** 다림질 온도 → 점 개수 */
export const dotsOfIronTemp = (t: number): number => IRON_TEMPS.indexOf(t) + 1;

/* ── 그림 조각 ────────────────────────────────────────── */

/**
 * SVG 한 조각. 컴포넌트가 이 일곱 가지를 태그로 옮긴다.
 *
 * dot·bar·cross를 path와 갈라 둔 것은 **셀 수 있어야** 하기 때문이다.
 * 점 세 개를 그리라고 했는데 두 개가 나가면 온도가 한 단계 낮게 읽힌다.
 */
export type Prim =
  | { kind: 'path'; d: string }
  | { kind: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { kind: 'circle'; cx: number; cy: number; r: number }
  | { kind: 'dot'; cx: number; cy: number; r: number }
  | { kind: 'bar'; y: number }
  | { kind: 'cross' }
  | { kind: 'text'; text: string; cy: number; size: number };

/** 조각 종류 전부 — 컴포넌트가 하나도 빠뜨리지 않았는지 검사가 이 목록으로 본다 */
export const PRIM_KINDS = ['path', 'line', 'circle', 'dot', 'bar', 'cross', 'text'] as const;

/** 그림판 — 24 × 24, 바탕 도형은 y 2.5~17.5에 두고 밑줄은 그 아래에 둔다 */
export const VIEW = 24;

/** 밑줄이 놓이는 높이 — 첫 줄이 위, 둘째 줄이 아래다 */
const BAR_Y = [20, 22.3];

/** 통(대야) — 물결진 물 위에 벌어진 통 */
const TUB: Prim[] = [
  { kind: 'path', d: 'M2 7 q2 -2.2 4 0 t4 0 t4 0 t4 0 t4 0' },
  { kind: 'path', d: 'M2 7 L4.3 17.5 H19.7 L22 7' },
];

const TRIANGLE: Prim[] = [{ kind: 'path', d: 'M12 2.5 L21.5 17.5 H2.5 Z' }];

const SQUARE: Prim[] = [{ kind: 'path', d: 'M4 3.2 H20 V17.5 H4 Z' }];

const IRON_BODY: Prim[] = [
  { kind: 'path', d: 'M2.4 17.2 L21.6 17.2 C21.6 11.5 17.8 8.4 12.8 8.4 L9 8.4 C5.4 8.4 2.4 11.2 2.4 14.2 Z' },
];

const CIRCLE: Prim[] = [{ kind: 'circle', cx: 12, cy: 10.5, r: 7.6 }];

/** 갈래마다 바탕 도형이 하나다 */
const BASE: Record<Family, Prim[]> = {
  wash: TUB,
  bleach: TRIANGLE,
  dry: SQUARE,
  iron: IRON_BODY,
  dryclean: CIRCLE,
};

/** 점을 가운데 맞춰 한 줄로 놓는다 — 개수가 늘면 좁혀서 넣는다 */
function dotRow(n: number, cy: number, span: number): Prim[] {
  if (n <= 0) return [];
  const gap = Math.min(3.4, span / n);
  const r = Math.min(1.15, gap / 2.6);
  return Array.from({ length: n }, (_, i) => ({
    kind: 'dot' as const,
    cx: 12 + (i - (n - 1) / 2) * gap,
    cy,
    r,
  }));
}

/** 표시(mark)가 얹는 조각들 */
function markPrims(mark: Mark): Prim[] {
  switch (mark) {
    /* 통 안의 손 — 손가락 넷과 손바닥 */
    case 'hand':
      return [{
        kind: 'path',
        d: 'M8.4 16.4 V12.2 c0-.55.45-1 1-1s1 .45 1 1 V10 c0-.55.45-1 1-1s1 .45 1 1 v-.5 c0-.55.45-1 1-1s1 .45 1 1 v1.2 c0-.5.45-.9 1-.9s1 .4 1 .95 V16.4 z',
      }];
    /* 비틀린 천 — 두 곡선이 가운데서 엇갈린다 */
    case 'wring':
      return [
        { kind: 'path', d: 'M4 8.5 C9 10, 15 14, 20 15.5' },
        { kind: 'path', d: 'M4 15.5 C9 14, 15 10, 20 8.5' },
      ];
    /* 삼각형 안 사선 두 줄 — 산소계만 */
    case 'stripes':
      return [
        { kind: 'line', x1: 7.8, y1: 15.2, x2: 11.8, y2: 9.6 },
        { kind: 'line', x1: 10.6, y1: 15.2, x2: 14.6, y2: 9.6 },
      ];
    /* 사각형 안의 원 — 기계건조 */
    case 'tumble':
      return [{ kind: 'circle', cx: 12, cy: 10.35, r: 5.1 }];
    case 'line':
      return [{ kind: 'line', x1: 12, y1: 5.2, x2: 12, y2: 15.5 }];
    case 'drip-line':
      return [
        { kind: 'line', x1: 9.8, y1: 5.2, x2: 9.8, y2: 15.5 },
        { kind: 'line', x1: 14.2, y1: 5.2, x2: 14.2, y2: 15.5 },
      ];
    case 'flat':
      return [{ kind: 'line', x1: 6.2, y1: 10.35, x2: 17.8, y2: 10.35 }];
    case 'drip-flat':
      return [
        { kind: 'line', x1: 6.2, y1: 8.6, x2: 17.8, y2: 8.6 },
        { kind: 'line', x1: 6.2, y1: 12.1, x2: 17.8, y2: 12.1 },
      ];
    /* 다리미 아래 스팀 셋에 사선 하나 — 스팀 금지 */
    case 'no-steam':
      return [
        { kind: 'line', x1: 9, y1: 18.8, x2: 9, y2: 21.6 },
        { kind: 'line', x1: 12, y1: 18.8, x2: 12, y2: 21.6 },
        { kind: 'line', x1: 15, y1: 18.8, x2: 15, y2: 21.6 },
        { kind: 'line', x1: 6.8, y1: 22, x2: 17.2, y2: 18.4 },
      ];
  }
}

/** 사각형 왼쪽 위 사선 둘 — 그늘에서 */
const SHADE: Prim[] = [
  { kind: 'line', x1: 4, y1: 9.6, x2: 10.4, y2: 3.2 },
  { kind: 'line', x1: 4, y1: 6.4, x2: 7.2, y2: 3.2 },
];

/** 점이 놓이는 높이와 폭 — 도형마다 안쪽이 다르다 */
const DOT_SPOT: Record<Family, { cy: number; span: number }> = {
  wash: { cy: 12.6, span: 15 },
  bleach: { cy: 13, span: 10 },
  dry: { cy: 10.35, span: 8 },
  iron: { cy: 13.8, span: 14 },
  dryclean: { cy: 10.5, span: 12 },
};

/**
 * 한 칸이 그려지는 조각 전부.
 *
 * 순서가 그리는 순서다 — 바탕 도형, 안에 얹는 표시, 점, 글자, 밑줄, 마지막에 ×표.
 */
export function glyph(c: Cell): Prim[] {
  const spot = DOT_SPOT[c.family];
  /*
   * 짜기 기호에는 바탕 도형이 없다 — 비틀린 천 하나에 ×표가 얹힌 그림이다.
   * 통을 함께 그리면 "물세탁 금지"와 같은 그림이 되어 두 칸이 겹쳐 보인다.
   */
  const base = c.mark === 'wring' ? [] : BASE[c.family];
  return [
    ...base,
    ...(c.mark ? markPrims(c.mark) : []),
    ...(c.shade ? SHADE : []),
    ...dotRow(c.dots, spot.cy, spot.span),
    /* 글자는 도형 가운데에 — 두 자리(40·95)는 한 자리보다 조금 작게 넣는다 */
    ...(c.text ? [{ kind: 'text' as const, text: c.text, cy: spot.cy, size: c.text.length > 1 ? 7.6 : 9 }] : []),
    ...Array.from({ length: c.bars }, (_, i) => ({ kind: 'bar' as const, y: BAR_Y[i] })),
    ...(c.forbidden ? [{ kind: 'cross' as const }] : []),
  ];
}

/* ── 한 칸의 사실 ─────────────────────────────────────── */

export interface LaundryFacts {
  cell: Cell;
  slug: string;
  family: Family;
  kind: Kind;
  /** 점 개수와 밑줄 개수 — 뜻이 여기서 나온다 */
  dots: number;
  bars: number;
  /** 밑줄 개수가 말하는 세기 */
  strength: Strength;
  /** 온도를 무엇으로 적었나 */
  notation: Notation;
  /** 최고 온도(°C) — 물세탁과 다림질에만 있다 */
  temp?: number;
  /** 기계건조 온도 단계 1·2·3 — 점이 없으면 없다 */
  tumbleLevel?: number;
  /** 자연건조 방식 */
  natural?: NaturalWay;
  shade: boolean;
  /** 도형 안의 용제 글자 */
  solvent?: string;
  noSteam: boolean;
  forbidden: boolean;
  /** 그림 조각 */
  prims: Prim[];
  /** 이웃 칸 — 같은 갈래를 앞으로 모아 원형으로 감아 고른다 */
  neighbours: Cell[];
}

const NATURAL_WAYS: NaturalWay[] = ['line', 'drip-line', 'flat', 'drip-flat'];

/** 한 칸에서 뻗는 이웃 수 */
export const NEAR = 6;

function kindOf(c: Cell): Kind {
  if (c.mark === 'hand') return 'hand';
  if (c.mark === 'wring') return 'wring';
  if (c.mark === 'stripes') return 'bleach-oxygen';
  if (c.mark === 'tumble') return 'tumble';
  if (c.mark && NATURAL_WAYS.includes(c.mark as NaturalWay)) return 'natural';
  if (c.family === 'dryclean') return c.text === 'W' ? 'wetclean' : 'dryclean';
  if (c.family === 'iron') return 'iron';
  if (c.family === 'bleach') return 'bleach';
  return 'wash';
}

export function laundryFacts(c: Cell): LaundryFacts {
  if (!BARS.includes(c.bars)) throw new Error(`모르는 밑줄 개수: ${c.bars}`);
  const kind = kindOf(c);

  /*
   * 온도는 두 곳에서 온다. 점 표기는 점 개수가 온도 줄의 자리를 가리키고, 숫자
   * 표기는 도형 안의 글자가 곧 온도다. 두 길이 같은 값에 닿는지는 검사가 본다.
   */
  const numeric = c.text && /^\d+$/.test(c.text) ? Number(c.text) : undefined;
  const notation: Notation = numeric !== undefined ? 'num' : c.dots > 0 ? 'dot' : 'none';
  const temp =
    kind === 'wash' ? (numeric ?? washTempOfDots(c.dots))
    : kind === 'iron' ? ironTempOfDots(c.dots)
    : undefined;

  if (notation === 'dot' && kind === 'wash' && temp === undefined) {
    throw new Error(`점 ${c.dots}개에 맞는 물세탁 온도가 없다: ${c.slug}`);
  }

  return {
    cell: c,
    slug: c.slug,
    family: c.family,
    kind,
    dots: c.dots,
    bars: c.bars,
    strength: strengthOf(c.bars),
    notation: kind === 'tumble' ? 'none' : notation,
    temp,
    tumbleLevel: kind === 'tumble' && c.dots > 0 ? c.dots : undefined,
    natural: kind === 'natural' ? (c.mark as NaturalWay) : undefined,
    shade: Boolean(c.shade),
    solvent: kind === 'dryclean' || kind === 'wetclean' ? c.text : undefined,
    noSteam: c.mark === 'no-steam',
    forbidden: c.forbidden,
    prims: glyph(c),
    /*
     * 이웃은 lib/related-window.ts에 맡긴다 — 앞에서 여섯 개를 잘라 오면 줄의
     * 뒤쪽 칸은 들어오는 링크가 0이 되고, 그것은 사이트맵에만 있는 낱장이다.
     */
    neighbours: relatedBySlug(CELLS, c.slug, NEAR, (a, b) => a.family === b.family),
  };
}

/** 주소로 바로 — 라우트와 검사가 쓴다 */
export function factsOf(slug: string): LaundryFacts | undefined {
  const c = cellOf(slug);
  return c ? laundryFacts(c) : undefined;
}
