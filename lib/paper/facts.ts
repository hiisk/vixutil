/**
 * 규격과 해상도 하나가 만드는 종이 — 밀리미터, 픽셀, 그리고 무게.
 *
 * ISO 규격의 치수는 접어서 나온다. 긴 변을 반으로 접으면 짧은 변이 되고,
 * 남은 밀리미터는 버린다 — 297을 접으면 148.5가 아니라 148이다. 규격이
 * 정한 것도 그 버림이라, 여기서도 같은 자리에서 버린다.
 *
 * 접어도 모양이 같으려면 긴 변과 짧은 변의 비가 √2여야 한다. 접힌 뒤의 비는
 * (짧은 변) : (긴 변÷2)이고, 이것이 처음과 같으려면 비의 제곱이 2가 되기
 * 때문이다. 복사기의 141%와 71%도 √2와 그 역수다.
 */
import {
  CELLS, DPIS, GSMS, INCH_SIZES, LETTER_LIMIT_G, MM_PER_INCH, ROOTS, SIZES,
  type Cell, type Sheet, type Size, slugOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 긴 변을 반으로 접고 남는 밀리미터는 버린다 */
export const fold = (s: Sheet): Sheet => ({ short: Math.floor(s.long / 2), long: s.short });

/** 계열의 맨 위에서 step번 접은 한 장 */
export const isoSheet = (family: string, step: number): Sheet => {
  let sheet = ROOTS[family];
  for (let i = 0; i < step; i++) sheet = fold(sheet);
  return sheet;
};

/** 어느 계열이든 밀리미터로 모은다 */
export const sheetOf = (size: Size): Sheet => {
  if (size.family !== null) return isoSheet(size.family, size.step as number);
  const inch = INCH_SIZES.find(i => i.key === size.key);
  if (!inch) throw new Error(`모르는 규격: ${size.key}`);
  return { short: round(inch.w * MM_PER_INCH), long: round(inch.h * MM_PER_INCH) };
};

export interface Weight {
  gsm: number;
  grams: number;
}

export interface Neighbour {
  key: string;
  short: number;
  long: number;
}

export interface PaperFacts {
  cell: Cell;
  slug: string;
  sheet: Sheet;
  /** 짧은 변·긴 변(인치) */
  inches: { short: number; long: number };
  /** 이 해상도에서의 픽셀 */
  pixels: { w: number; h: number };
  /** 픽셀을 다 합치면(백만) */
  megapixels: number;
  /** 색을 한 점에 3바이트로 담을 때의 크기(MB) */
  rawMb: number;
  /** 넓이(m²) */
  area: number;
  /** 짧은 변에 대한 긴 변의 비 */
  ratio: number;
  /** 평량마다의 장당 무게(g) */
  weights: Weight[];
  /** 80g/m² 종이로 우편 한 통에 몇 장까지 */
  lettersheets: number;
  /** 이 규격 몇 장이 계열 맨 위 한 장에 들어가나 */
  perRoot: number | null;
  /** 반으로 접으면 */
  smaller: Neighbour | null;
  /** 펼치면 */
  bigger: Neighbour | null;
  /** 이 종이가 들어가는 가장 작은 봉투 */
  envelope: Neighbour | null;
  finer: number | null;
  coarser: number | null;
}

/** 밀리미터를 그 해상도의 픽셀로 */
export const pixelsOf = (mm: number, dpi: number): number => Math.round((mm / MM_PER_INCH) * dpi);

/** 넓이(m²) */
export const areaOf = (s: Sheet): number => (s.short * s.long) / 1e6;

const near = (size: Size): Neighbour => {
  const s = sheetOf(size);
  return { key: size.key, short: s.short, long: s.long };
};

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

/** 이 종이가 들어가는 가장 작은 C 규격 봉투 */
export const envelopeOf = (size: Size): Size | null => {
  const s = sheetOf(size);
  const fits = SIZES.filter(o => o.family === 'c')
    .filter(o => {
      const e = sheetOf(o);
      return e.short >= s.short && e.long >= s.long && o.key !== size.key;
    });
  return fits.length === 0 ? null : fits[fits.length - 1];
};

export function paperFacts(c: Cell): PaperFacts {
  const sheet = sheetOf(c.size);
  const area = areaOf(sheet);
  const w = pixelsOf(sheet.short, c.dpi);
  const h = pixelsOf(sheet.long, c.dpi);
  const family = c.size.family;
  const siblings = SIZES.filter(s => s.family === family);
  const i = siblings.findIndex(s => s.key === c.size.key);
  const di = DPIS.indexOf(c.dpi);
  const envelope = envelopeOf(c.size);

  return {
    cell: c,
    slug: slugOf(c),
    sheet,
    inches: { short: round(sheet.short / MM_PER_INCH, 2), long: round(sheet.long / MM_PER_INCH, 2) },
    pixels: { w, h },
    megapixels: round((w * h) / 1e6, 2),
    rawMb: round((w * h * 3) / 1024 ** 2, 1),
    area: round(area, 4),
    ratio: round(sheet.long / sheet.short, 3),
    weights: GSMS.map(gsm => ({ gsm, grams: round(area * gsm, 2) })),
    lettersheets: Math.floor(LETTER_LIMIT_G / (area * 80)),
    perRoot: c.size.step === null ? null : 2 ** c.size.step,
    smaller: family === null || step(siblings, i, 1) === null ? null : near(step(siblings, i, 1) as Size),
    bigger: family === null || step(siblings, i, -1) === null ? null : near(step(siblings, i, -1) as Size),
    envelope: envelope === null ? null : near(envelope),
    finer: step(DPIS, di, 1),
    coarser: step(DPIS, di, -1),
  };
}

/** 같은 규격의 한 줄 */
export const atSize = (size: Size): Cell[] => DPIS.map(dpi => ({ size, dpi }));

/** 같은 해상도의 한 줄 */
export const atDpi = (dpi: number): Cell[] => CELLS.filter(c => c.dpi === dpi);
