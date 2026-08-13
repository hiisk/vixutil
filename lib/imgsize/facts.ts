/**
 * 이미지 크기 한 장에 들어가는 값 — 가로세로 두 숫자에서 계산한다.
 *
 * 화면비도, 메가픽셀도, 300dpi로 뽑았을 때의 종이 크기도 두 숫자면 나온다.
 * 손으로 적을 것은 하나도 없고, 적으면 틀린 줄도 모른다.
 */
import { IMG_SIZES, type ImgSize } from './list.ts';
import { relatedWindow } from '../related-window.ts';

export interface SizeFacts {
  slug: string;
  name: string;
  w: number;
  h: number;
  /** 가장 간단한 정수비 — 16:9 처럼 */
  ratio: string;
  /** 흔히 부르는 이름이 있으면 그쪽 — 없으면 정수비 그대로 */
  ratioLabel: string;
  /** 긴 변 ÷ 짧은 변 */
  ratioValue: number;
  pixels: number;
  megapixels: number;
  portrait: boolean;
  square: boolean;
  /** 300dpi로 인쇄하면 몇 밀리미터인가 */
  printMm: [number, number];
  /** 인쇄물이면 정해진 밀리미터, 아니면 300dpi 환산값 */
  mm: [number, number];
  /** 압축하지 않은 24비트로 담으면 몇 메가바이트인가 — 용량 감을 잡는 기준 */
  rawMb: number;
  /** JPEG 품질 80 어림 — 픽셀당 0.25바이트로 잡는다 */
  jpegKb: number;
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** 흔히 부르는 화면비 이름 — 가장 가까운 것을 고른다 */
export function commonRatio(value: number): string | null {
  const named: [number, string][] = [
    [1, '1:1'], [5 / 4, '5:4'], [4 / 3, '4:3'], [3 / 2, '3:2'], [16 / 10, '16:10'],
    // A판 종이는 1:√2다 — 반으로 접어도 같은 비가 나오도록 정해진 값이다
    [Math.SQRT2, '1:√2'], [16 / 9, '16:9'], [1.85, '1.85:1'], [2, '2:1'], [2.35, '2.35:1'], [2.39, '2.39:1'],
    [21 / 9, '21:9'], [3, '3:1'], [4, '4:1'], [8, '8:1'],
  ];
  const v = value < 1 ? 1 / value : value;
  let best: string | null = null;
  let err = 0.02;
  for (const [target, label] of named) {
    const e = Math.abs(v - target) / target;
    if (e < err) { best = label; err = e; }
  }
  return best;
}

export function sizeFacts(x: ImgSize): SizeFacts {
  const g = gcd(x.w, x.h);
  const long = Math.max(x.w, x.h);
  const short = Math.min(x.w, x.h);
  const ratioValue = Math.round((long / short) * 100) / 100;
  const pixels = x.w * x.h;
  // 300dpi는 인쇄에서 쓰는 기본값이다 — 1인치가 300픽셀이므로 25.4밀리미터가 300픽셀이다
  const printMm: [number, number] = [r1((x.w / 300) * 25.4), r1((x.h / 300) * 25.4)];
  return {
    slug: x.slug,
    name: x.name,
    w: x.w,
    h: x.h,
    ratio: `${x.w / g}:${x.h / g}`,
    ratioLabel: commonRatio(ratioValue) ?? `${x.w / g}:${x.h / g}`,
    ratioValue,
    pixels,
    megapixels: r1(pixels / 1e6),
    portrait: x.h > x.w,
    square: x.h === x.w,
    printMm,
    mm: x.mm ?? printMm,
    // 24비트는 픽셀당 3바이트다. 압축을 안 하면 이만큼 든다
    rawMb: r1((pixels * 3) / 1024 / 1024),
    jpegKb: Math.round((pixels * 0.25) / 1024),
  };
}

/** 화면비가 같은 다른 크기 — 잘라내지 않고 바꿔 쓸 수 있는 것들 */
export function sameRatio(slug: string, limit = 8): ImgSize[] {
  const me = IMG_SIZES.find(x => x.slug === slug);
  if (!me) return [];
  const mine = sizeFacts(me).ratioValue;
  return IMG_SIZES.filter(x => x.slug !== slug && Math.abs(sizeFacts(x).ratioValue - mine) < 0.02).slice(0, limit);
}

/**
 * 같은 갈래의 다른 크기 — 한 바퀴 돌며 고른다.
 *
 * ── 앞에서 자르던 것을 원형으로 바꿨다 (2026-08-13) ──────────
 * `.slice(0, limit)`이라 목록 앞쪽만 서로 가리키고 뒤에 붙인 것은 들어오는 링크가
 * 0이었다(177개 중 44개). relatedWindow는 자기 다음부터 한 바퀴 감아 모두가 고르게 남의
 * 목록에 든다 — 까닭은 lib/related-window.ts 머리말.
 */
export function sameKind(slug: string, limit = 10): ImgSize[] {
  const me = IMG_SIZES.find(x => x.slug === slug);
  if (!me) return [];
  /*
   * 같은 갈래로 **먼저 걸러 낸 뒤** 한 바퀴 돈다. relatedWindow에 sameGroup을
   * 넘기면 마지막 한 칸을 다른 갈래에 남기는데(갈래에 혼자인 항목을 위한 장치),
   * 이 섹션은 갈래마다 항목이 둘 이상이라 그 장치가 필요 없고 "관련 항목은 전부
   * 같은 갈래"라는 기존 검사와도 어긋난다.
   */
  return relatedWindow(IMG_SIZES.filter(x => x.kind === me.kind), me, limit);
}
