/**
 * 픽셀 하나의 값 — CSS가 못 박아 둔 환산으로 계산한다.
 *
 * CSS는 절대 단위를 픽셀에 묶어 두었다. 1in = 96px, 1pt = 1/72in, 1pc = 12pt.
 * 그래서 1pt는 정확히 96/72 = 1.333…px이고, 16px은 12pt다.
 *
 * rem만 성격이 다르다. 이것은 루트 글자 크기에 대한 배수라 브라우저 기본값
 * 16px을 기준으로 잰다. 사용자가 브라우저에서 글자를 키우면 같은 rem이 더 큰
 * 픽셀이 되는데, 그 점이 rem을 쓰는 이유이기도 하다.
 */
import { PIXELS, ROOT_PX } from './list.ts';

const PX_PER_INCH = 96;
const PT_PER_INCH = 72;

const round = (x: number, digits = 4) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface PxFacts {
  px: number;
  /** 루트 글자 크기(16px)에 대한 배수 */
  rem: number;
  /** 포인트 — 1pt = 1/72인치 */
  pt: number;
  /** 파이카 — 1pc = 12pt */
  pc: number;
  inch: number;
  mm: number;
  cm: number;
  /** 루트 글자 크기에 대한 백분율 */
  percent: number;
  /** 딱 떨어지는 rem인가 — 16의 배수일 때 */
  wholeRem: boolean;
  /** 딱 떨어지는 pt인가 — 4의 배수일 때 3pt 단위로 떨어진다 */
  wholePt: boolean;
  prev: number | null;
  next: number | null;
}

export const remOf = (px: number): number => round(px / ROOT_PX);
export const ptOf = (px: number): number => round((px * PT_PER_INCH) / PX_PER_INCH);

export function pxFacts(px: number): PxFacts {
  const inch = round(px / PX_PER_INCH, 5);
  const pt = ptOf(px);

  return {
    px,
    rem: remOf(px),
    pt,
    pc: round(pt / 12),
    inch,
    mm: round(inch * 25.4, 3),
    cm: round(inch * 2.54, 4),
    percent: round((px / ROOT_PX) * 100, 2),
    wholeRem: px % ROOT_PX === 0,
    wholePt: Number.isInteger(pt),
    prev: PIXELS.includes(px - 1) ? px - 1 : null,
    next: PIXELS.includes(px + 1) ? px + 1 : null,
  };
}

/** rem이 딱 떨어지는 픽셀 — 16, 32, 48… */
export const wholeRems = (): number[] => PIXELS.filter(p => p % ROOT_PX === 0);

/** pt가 딱 떨어지는 픽셀 — 4의 배수다 */
export const wholePts = (): number[] => PIXELS.filter(p => Number.isInteger(ptOf(p)));

/** 흔히 쓰이는 값들 — 글자 크기와 여백에서 반복해서 나온다 */
export const COMMON = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80, 96];

export const neighbours = (px: number, span = 3): number[] =>
  PIXELS.filter(p => Math.abs(p - px) <= span && p !== px);
