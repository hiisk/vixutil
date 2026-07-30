/**
 * 렌즈 한 장에 들어가는 값 — 초점거리와 센서 크기에서 계산한다.
 *
 * 화각은 삼각함수 한 줄이다. 센서의 한 변을 초점거리의 두 배로 나눈 값의
 * 아크탄젠트를 두 배 하면 그 방향의 화각이 나온다. 크롭 배수도 대각선을
 * 재면 나오므로 적어 둘 이유가 없다.
 */
import { LENSES, SENSORS, sensorOf, type Lens } from './list.ts';

/** 35mm 판의 대각선 — 크롭 배수의 기준이다 */
const FF_DIAGONAL = Math.hypot(36, 24);

export interface LensFacts {
  slug: string;
  focal: number;
  sensorName: string;
  /** 대각·수평·수직 화각(도) */
  diagonal: number;
  horizontal: number;
  vertical: number;
  /** 크롭 배수 — 대각선 비 */
  crop: number;
  /** 35mm 환산 초점거리 */
  equiv: number;
  /** 2미터 앞에서 담기는 가로 폭(미터) */
  widthAt2m: number;
  /** 화각으로 가른 갈래 */
  kind: 'ultrawide' | 'wide' | 'standard' | 'tele' | 'supertele';
}

const deg = (rad: number) => (rad * 180) / Math.PI;
const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

/** 한 변의 화각 — 2 × atan(변 ÷ 2f) */
export function angleOf(side: number, focal: number): number {
  return deg(2 * Math.atan(side / (2 * focal)));
}

export function lensFacts(l: Lens): LensFacts {
  const s = sensorOf(l.sensor);
  const diag = Math.hypot(s.w, s.h);
  // 화면에 내보내는 값으로 먼저 자른 뒤 그 값으로 곱한다. 자르지 않은 1.5342로
  // 계산하면 400mm에서 614가 나오는데, 화면에는 1.53이라 적히므로 읽는 사람이
  // 곱해 보면 612가 된다. 보이는 숫자끼리 맞는 편이 낫다.
  const crop = r2(FF_DIAGONAL / diag);
  const horizontal = angleOf(s.w, l.focal);
  const equiv = l.focal * crop;
  return {
    slug: l.slug,
    focal: l.focal,
    sensorName: s.name,
    diagonal: r1(angleOf(diag, l.focal)),
    horizontal: r1(horizontal),
    vertical: r1(angleOf(s.h, l.focal)),
    crop,
    equiv: Math.round(equiv),
    // 2미터 앞의 가로 폭 — 화각의 절반 탄젠트에 거리와 2를 곱한다
    widthAt2m: r2(2 * 2 * Math.tan(Math.atan(s.w / (2 * l.focal)))),
    // 갈래는 35mm 환산으로 가른다 — 센서가 달라도 같은 잣대가 된다
    kind: equiv < 18 ? 'ultrawide' : equiv < 35 ? 'wide' : equiv <= 70 ? 'standard' : equiv <= 300 ? 'tele' : 'supertele',
  };
}

/** 같은 환산 화각을 주는 다른 센서의 초점거리 */
export function sameFieldOfView(slug: string): Lens[] {
  const me = LENSES.find(l => l.slug === slug);
  if (!me) return [];
  const mine = lensFacts(me).equiv;
  return SENSORS.filter(s => s.key !== me.sensor)
    .map(s => {
      const list = LENSES.filter(l => l.sensor === s.key);
      // 환산 초점거리가 가장 가까운 것 하나
      return list.reduce((best, l) =>
        Math.abs(lensFacts(l).equiv - mine) < Math.abs(lensFacts(best).equiv - mine) ? l : best);
    });
}

/** 같은 센서에서 이웃한 초점거리 */
export function neighbourFocals(slug: string, limit = 6): Lens[] {
  const me = LENSES.find(l => l.slug === slug);
  if (!me) return [];
  return LENSES.filter(l => l.sensor === me.sensor && l.slug !== me.slug)
    .sort((a, b) => Math.abs(Math.log2(a.focal / me.focal)) - Math.abs(Math.log2(b.focal / me.focal)))
    .slice(0, limit)
    .sort((a, b) => a.focal - b.focal);
}
