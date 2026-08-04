/**
 * 규격 하나의 치수 — 문자열에서 전부 계산한다.
 *
 * 205/55R16은 세 수를 이어 적은 것이다. 폭 205mm, 편평비 55%, 휠 지름 16인치.
 * 사이드월 높이는 폭의 55%이므로 112.75mm이고, 외경은 휠 지름에 사이드월을
 * 위아래로 더한 값이다 — 16인치는 406.4mm이니 632mm쯤 된다.
 *
 * **바꿔 끼울 수 있는가**는 결국 외경 하나로 갈린다. 외경이 달라지면 바퀴가
 * 한 바퀴 도는 거리가 달라지고, 그 차이가 그대로 속도계 오차가 된다. 그래서
 * 여기서는 외경 비율이 3% 안에 드는 규격을 대체 후보로 본다.
 */
import { TIRES, labelOf, slugOf, type Tire } from './list.ts';

const MM_PER_INCH = 25.4;

const round = (x: number, digits = 1) => {
  const p = 10 ** digits;
  return Math.round(x * p) / p;
};

export interface Alternative {
  tire: Tire;
  slug: string;
  label: string;
  /** 외경 지름(mm) */
  diameter: number;
  /** 이 규격으로 바꿨을 때 속도계가 틀리는 정도(%) — 양수면 실제가 더 빠르다 */
  speedo: number;
}

export interface TireFacts {
  tire: Tire;
  label: string;
  slug: string;
  /** 사이드월 높이(mm) — 폭 × 편평비 */
  sidewall: number;
  /** 휠 지름(mm) */
  rimMm: number;
  /** 외경(mm) */
  diameter: number;
  /** 외경(인치) */
  diameterInch: number;
  /** 둘레(mm) */
  circumference: number;
  /** 1km를 갈 때 도는 횟수 */
  revsPerKm: number;
  /** 외경이 3% 안에 드는 다른 규격 — 가까운 순 */
  alternatives: Alternative[];
}

/** 폭 × 편평비 — 205/55라면 112.75mm */
export const sidewallOf = (t: Tire): number => round((t.width * t.aspect) / 100, 2);

/** 휠 지름에 사이드월을 위아래로 더한다 */
export const diameterOf = (t: Tire): number => round(t.rim * MM_PER_INCH + 2 * sidewallOf(t), 1);

/** 두 규격의 외경 차이 — 큰 쪽을 작은 쪽으로 나눈 값이라 순서를 바꿔도 같다 */
export const gapOf = (a: Tire, b: Tire): number => {
  const [x, y] = [diameterOf(a), diameterOf(b)];
  return Math.max(x, y) / Math.min(x, y) - 1;
};

/** 바꿔 끼웠을 때 속도계가 틀리는 정도(%) — 새 규격이 크면 실제 속도가 더 빠르다 */
export const speedoOf = (from: Tire, to: Tire): number =>
  round((diameterOf(to) / diameterOf(from) - 1) * 100, 2);

export function tireFacts(t: Tire): TireFacts {
  const diameter = diameterOf(t);
  const circumference = round(Math.PI * diameter, 1);

  const alternatives = TIRES.filter(o => slugOf(o) !== slugOf(t) && gapOf(t, o) <= 0.03)
    .sort((a, b) => gapOf(t, a) - gapOf(t, b))
    .slice(0, 12)
    .map(o => ({
      tire: o,
      slug: slugOf(o),
      label: labelOf(o),
      diameter: diameterOf(o),
      speedo: speedoOf(t, o),
    }));

  return {
    tire: t,
    label: labelOf(t),
    slug: slugOf(t),
    sidewall: sidewallOf(t),
    rimMm: round(t.rim * MM_PER_INCH, 1),
    diameter,
    diameterInch: round(diameter / MM_PER_INCH, 2),
    circumference,
    // 1km = 1,000,000mm
    revsPerKm: round(1_000_000 / circumference, 1),
    alternatives,
  };
}

/** 같은 휠에 들어가는 규격들 */
export const sameRim = (t: Tire): Tire[] =>
  TIRES.filter(o => o.rim === t.rim && slugOf(o) !== slugOf(t));

/** 폭만 다른 규격 — 한 치수 넓히거나 좁힐 때 본다 */
export const sameShape = (t: Tire): Tire[] =>
  TIRES.filter(o => o.rim === t.rim && o.aspect === t.aspect && o.width !== t.width);

/** 외경이 가장 크고 작은 규격 */
export const extremes = (): { biggest: Tire; smallest: Tire } => {
  const sorted = [...TIRES].sort((a, b) => diameterOf(a) - diameterOf(b));
  return { smallest: sorted[0], biggest: sorted[sorted.length - 1] };
};
