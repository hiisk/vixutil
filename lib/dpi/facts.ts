/**
 * 셀 하나에서 나오는 모든 수 — 감도는 **목표 거리에서 거꾸로** 구한다.
 *
 * 뼈대는 두 줄이다. 게임마다 마우스 카운트 하나가 시야를 돌리는 각(yaw)이 정해져
 * 있고, DPI는 1인치를 미는 동안 나오는 카운트 수다. 그래서
 *
 *   360°에 드는 카운트   360 ÷ (yaw × 감도)
 *   그 카운트가 가는 거리 카운트 ÷ DPI 인치 = 2.54 × 360 ÷ (yaw × 감도 × DPI) cm
 *   eDPI                DPI × 감도
 *
 * 감도를 한 개도 적지 않는 것은 list.ts가 정한 방향이다. 축은 **목표 cm/360**이고
 * 감도가 답이다 — 20cm를 돌리려면 이 게임 이 DPI에서 감도가 얼마여야 하는가.
 *
 *   감도 = 2.54 × 360 ÷ (yaw × DPI × 목표 cm)
 *
 * 두 식은 서로의 역이라 **왕복이 검사가 된다.** 목표 거리로 감도를 구한 뒤 그
 * 감도로 거리를 다시 내면 목표가 나와야 한다(tests/dpi.test.ts).
 *
 * ── eDPI가 DPI를 안 따라간다 ──────────────────────────────────
 * 위 두 식을 곱해 보면 eDPI가 DPI에서 사라진다.
 *
 *   eDPI = DPI × 감도 = 2.54 × 360 ÷ (yaw × 목표 cm)
 *
 * 곧 **한 게임에서 목표 거리가 같으면 eDPI는 어느 DPI에서도 같은 값이다.** 그것이
 * "DPI를 두 배로 하고 감도를 반으로 하면 그대로"라는 말의 정체다. 그래서 낱점 칸은
 * 같은 거리를 내는 DPI 축 전체를 함께 낸다 — 눈으로 그 불변량이 보인다.
 *
 * 반대로 eDPI는 **게임을 건너 견줄 수 없다.** yaw가 다르면 같은 eDPI가 다른 거리를
 * 돈다(발로란트 eDPI 800은 소스 계열 eDPI 800보다 세 배 넘게 빠르다). 화면이 그
 * 사실을 밝히고, 쌍 칸은 두 게임의 eDPI를 나란히 적어 다른 값임을 보여 준다.
 *
 * ── 옮기는 곱수는 yaw의 비 하나다 ─────────────────────────────
 * 같은 거리를 유지하려면 yaw × 감도가 같아야 하므로
 *
 *   감도_B = 감도_A × yaw_A ÷ yaw_B
 *
 * DPI가 식에서 빠진다 — 마우스를 안 건드리면 곱수는 DPI와 무관하다. A→B로 옮긴 뒤
 * B→A로 되돌리면 곱수가 서로 역수라 원래 감도가 나온다(그것도 검사한다).
 *
 * ── 자리를 어떻게 자르나 ──────────────────────────────────────
 * 감도는 0.2166부터 17.32까지 여든 배 폭이다. 소수 두 자리로 자르면 빠른 쪽이
 * 0.22로 뭉개져 왕복이 2% 어긋난다. 그래서 유효숫자 넷으로 자른다(sig) — 그 폭을
 * 검사가 알고 있다. eDPI는 어차피 정수로 부르는 값이라 정수로 자른다.
 *
 * 여기서 자른 값은 **화면에 찍는 값**이고, 되짚기는 자르지 않은 함수로 한다.
 */
import {
  CM_TARGETS, DPIS, PAIRS, POINTS, REF_DPI,
  type Cell, type Game, type PairCell, type PointCell,
  cellOf, gameOf, pairSlug, pairsFrom, pointsOf,
} from './list.ts';
import { relatedBySlug } from '../related-window.ts';

/** 국제 인치의 정의값 — 1인치는 정확히 2.54cm다 */
export const CM_PER_INCH = 2.54;

/** 한 바퀴(°) */
export const FULL_TURN = 360;

/**
 * 제목과 요약이 대표로 쓰는 목표 거리(cm/360).
 *
 * 20~60cm 축의 앞쪽 가운데다. 어느 값을 골라도 페이지의 표는 여덟 줄 전부를
 * 내므로 이것은 **고르는 자리**일 뿐 주장이 아니다. 축에 있는 값인지는 검사가 본다.
 */
export const REF_CM = 30;

/** 유효숫자 자리로 자른다 — 감도는 폭이 여든 배라 소수 자리로 자를 수 없다 */
const sig = (x: number, digits = 4): number => Number(x.toPrecision(digits));

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 감도 1에서 360°를 돌리는 데 드는 마우스 카운트 */
export const countsPerTurn = (yaw: number, sens: number): number => FULL_TURN / (yaw * sens);

/** 360°를 돌리는 데 마우스를 미는 거리(cm) */
export const cm360 = (yaw: number, sens: number, dpi: number): number =>
  (CM_PER_INCH * FULL_TURN) / (yaw * sens * dpi);

/** 목표 거리에서 감도를 거꾸로 — 이 섹션의 감도는 전부 이 함수에서 나온다 */
export const sensFor = (yaw: number, dpi: number, cm: number): number =>
  (CM_PER_INCH * FULL_TURN) / (yaw * dpi * cm);

/**
 * 화면에 찍는 자리로 자른 감도.
 *
 * 표 밖에서도(허브의 게임 줄, 목록 카드) 같은 규칙으로 자르려고 여기 둔다 —
 * 부르는 쪽에서 각자 자르면 같은 값이 화면 두 곳에서 다르게 보인다.
 */
export const shownSens = (yaw: number, dpi: number, cm: number): number => sig(sensFor(yaw, dpi, cm));

/** eDPI = DPI × 감도 */
export const edpiOf = (dpi: number, sens: number): number => dpi * sens;

/** 목표 거리가 정하는 eDPI — DPI가 식에서 빠진다(머리말) */
export const edpiFor = (yaw: number, cm: number): number => (CM_PER_INCH * FULL_TURN) / (yaw * cm);

/**
 * 밖에서 확인해 주는 한 자리 — 소스 계열(yaw 0.022) eDPI 800의 cm/360°.
 *
 * 400 DPI 감도 2.0도, 800 DPI 감도 1.0도 이 값이고 널리 공표돼 있다. 큰 제목이 이
 * 숫자를 말하고 검사가 그것을 못 박으므로, 상수(2.54·360·yaw) 하나를 잘못 바꾸면
 * 제목이 먼저 거짓이 된다.
 */
export const ANCHOR_CM = round(cm360(0.022, 1, 800));

/** A의 감도에 곱하면 B의 감도가 되는 수 — yaw의 비다 */
export const factorOf = (from: Game, to: Game): number => from.yaw / to.yaw;

/** A의 감도를 B로 옮긴다 */
export const convertSens = (from: Game, to: Game, sens: number): number => sens * factorOf(from, to);

/** 그 DPI를 쓰는 낱점 한 줄 — 게임만 다르다 */
export const pointsAt = (dpi: number): PointCell[] => POINTS.filter(c => c.dpi === dpi);

/** 그 게임으로 들어오는 쌍 — 나가는 쪽은 list.ts의 pairsFrom이다 */
export const pairsTo = (game: string): PairCell[] => PAIRS.filter(c => c.to === game);

/** 낱점 칸의 한 줄 — 목표 거리 하나가 정하는 값들 */
export interface SensRow {
  /** 목표 cm/360 — 축의 값이다 */
  cm: number;
  /** 같은 거리를 인치로 */
  inch: number;
  /** 그 거리를 내는 감도 */
  sens: number;
  /** DPI × 감도. 그 게임 안에서는 거리와 일대일이다 */
  edpi: number;
  /** 360°에 드는 마우스 카운트 */
  counts: number;
}

/** 쌍 칸의 한 줄 — 같은 거리를 두 게임에서 내는 감도 */
export interface PairRow {
  cm: number;
  inch: number;
  /** 옮기기 전 게임의 감도 */
  from: number;
  /** 옮긴 뒤 게임의 감도 */
  to: number;
  /** 두 게임의 eDPI — 거리가 같아도 yaw가 다르면 값이 다르다 */
  fromEdpi: number;
  toEdpi: number;
}

/** 같은 거리를 내는 DPI 축 — eDPI는 이 줄 전체에서 한 값이다 */
export interface DpiRow {
  dpi: number;
  sens: number;
  /** 지금 보고 있는 칸의 DPI인가 */
  here: boolean;
}

const rowFor = (yaw: number, dpi: number, cm: number): SensRow => {
  const sens = sensFor(yaw, dpi, cm);
  return {
    cm,
    inch: round(cm / CM_PER_INCH),
    sens: sig(sens),
    edpi: Math.round(edpiFor(yaw, cm)),
    counts: Math.round(countsPerTurn(yaw, sens)),
  };
};

export interface PairFacts {
  kind: 'pair';
  cell: PairCell;
  slug: string;
  from: Game;
  to: Game;
  /** 옮기기 전 감도에 곱하는 수 */
  factor: number;
  /** 되돌리는 곱수 — factor의 역수다 */
  back: number;
  /** yaw가 같아 감도 숫자가 그대로인가 */
  same: boolean;
  /** 보기표가 기준으로 삼은 DPI */
  dpi: number;
  rows: PairRow[];
  /** 제목과 요약이 쓰는 한 줄 */
  pick: PairRow;
  /** 반대 방향 칸 — 곱수가 역수인 다른 페이지다 */
  reverse: string;
  neighbours: Cell[];
}

export interface PointFacts {
  kind: 'point';
  cell: PointCell;
  slug: string;
  game: Game;
  dpi: number;
  rows: SensRow[];
  /** 제목과 요약이 쓰는 한 줄 */
  pick: SensRow;
  /** 같은 거리를 내는 DPI 축 전체 */
  dpiRows: DpiRow[];
  neighbours: Cell[];
}

export type DpiFacts = PairFacts | PointFacts;

/** 한 칸에서 뻗는 이웃 수 — 두 줄에서 셋씩 모아 여섯이다 */
const NEAR_EACH = 3;

/**
 * 이웃은 자기 자리 다음부터 원형으로 감아 고른다(lib/related-window.ts).
 *
 * 갈래를 섞지 않는 것이 중요하다. 쌍 칸은 쌍에서만, 낱점 칸은 낱점에서만 고른다 —
 * 그래야 두 줄이 정확히 한 번씩 덮여 128칸이 모두 여섯 번씩 가리켜진다. 섞으면
 * 어떤 칸은 열 번, 어떤 칸은 두 번이 되어 뒤쪽 낱장이 들어오는 링크 없이 남는다.
 *
 *   쌍   나가는 줄 pairsFrom(from) 일곱 · 들어오는 줄 pairsTo(to) 일곱
 *   낱점 그 게임의 DPI 줄 아홉 · 그 DPI의 게임 줄 여덟
 *
 * 두 줄이 겹치는 자리는 자기 자신뿐이라(a→b가 pairsFrom(a)와 pairsTo(b)에 함께
 * 있는 다른 칸은 없다) 이웃이 중복되지 않는다.
 */
const neighboursOf = (c: Cell): Cell[] =>
  c.kind === 'pair'
    ? [
      ...relatedBySlug(pairsFrom(c.from), c.slug, NEAR_EACH),
      ...relatedBySlug(pairsTo(c.to), c.slug, NEAR_EACH),
    ]
    : [
      ...relatedBySlug(pointsOf(c.game), c.slug, NEAR_EACH),
      ...relatedBySlug(pointsAt(c.dpi), c.slug, NEAR_EACH),
    ];

const gameOrThrow = (slug: string): Game => {
  const g = gameOf(slug);
  if (!g) throw new Error(`모르는 게임: ${slug}`);
  return g;
};

const pickOf = <T extends { cm: number }>(rows: T[]): T => {
  const row = rows.find(r => r.cm === REF_CM);
  if (!row) throw new Error(`대표 거리 ${REF_CM}cm가 축에 없다`);
  return row;
};

export function dpiFacts(c: Cell): DpiFacts {
  if (c.kind === 'pair') {
    const from = gameOrThrow(c.from);
    const to = gameOrThrow(c.to);
    const factor = factorOf(from, to);
    const rows: PairRow[] = CM_TARGETS.map(cm => {
      const a = sensFor(from.yaw, REF_DPI, cm);
      const b = sensFor(to.yaw, REF_DPI, cm);
      return {
        cm,
        inch: round(cm / CM_PER_INCH),
        from: sig(a),
        to: sig(b),
        fromEdpi: Math.round(edpiFor(from.yaw, cm)),
        toEdpi: Math.round(edpiFor(to.yaw, cm)),
      };
    });
    return {
      kind: 'pair',
      cell: c,
      slug: c.slug,
      from,
      to,
      factor: sig(factor),
      back: sig(1 / factor),
      same: from.yaw === to.yaw,
      dpi: REF_DPI,
      rows,
      pick: pickOf(rows),
      reverse: pairSlug(c.to, c.from),
      neighbours: neighboursOf(c),
    };
  }

  const game = gameOrThrow(c.game);
  if (!DPIS.includes(c.dpi)) throw new Error(`모르는 DPI: ${c.dpi}`);
  const rows = CM_TARGETS.map(cm => rowFor(game.yaw, c.dpi, cm));
  return {
    kind: 'point',
    cell: c,
    slug: c.slug,
    game,
    dpi: c.dpi,
    rows,
    pick: pickOf(rows),
    dpiRows: DPIS.map(dpi => ({
      dpi,
      sens: sig(sensFor(game.yaw, dpi, REF_CM)),
      here: dpi === c.dpi,
    })),
    neighbours: neighboursOf(c),
  };
}

/** slug에서 바로 — 라우트와 검사가 같은 문을 쓴다 */
export const factsOf = (slug: string): DpiFacts | undefined => {
  const c = cellOf(slug);
  return c ? dpiFacts(c) : undefined;
};
