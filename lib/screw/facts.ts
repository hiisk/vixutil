/**
 * 나사 하나의 치수 — 외경과 피치에서 ISO 68-1대로 계산한다.
 *
 * 나사산은 꼭지각 60도인 정삼각형을 잘라 만든 모양이다. 그 삼각형의 높이를
 * H라 하면 H = (√3 ÷ 2) × 피치이고, 실제 나사의 지름들은 전부 H를 몇 등분해
 * 깎아낸 값이다.
 *
 *   유효지름 d2 = 외경 − 0.75 H   (= 외경 − 0.6495 × 피치)
 *   암나사 골지름 D1 = 외경 − 1.25 H   (= 외경 − 1.0825 × 피치)
 *   수나사 골지름 d3 = 외경 − (17/12) H   (= 외경 − 1.2269 × 피치)
 *
 * 그래서 여기 적힌 계수 0.6495 같은 것은 외운 숫자가 아니라 H에서 나온 몫이다.
 * 검사도 그 몫으로 되짚는다.
 */
import { SCREWS, type Screw, labelOf, slugOf } from './list.ts';

/** 나사산 기본 삼각형의 높이 — H = (√3 ÷ 2) × 피치 */
export const H = (p: number): number => (Math.sqrt(3) / 2) * p;

const round = (x: number, digits = 3) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface ScrewFacts {
  screw: Screw;
  label: string;
  slug: string;
  /** 기본 삼각형 높이 */
  h: number;
  /** 유효(피치)지름 */
  pitchDia: number;
  /** 수나사 골지름 */
  minorMale: number;
  /** 암나사 골지름 — 탭을 낸 구멍의 안지름 */
  minorFemale: number;
  /** 탭 드릴 지름 — 외경 − 피치 (현장에서 쓰는 어림) */
  tapDrill: number;
  /** 나사산 높이 — 외경과 수나사 골지름의 차이 절반 */
  threadHeight: number;
  /** 응력단면적 — 볼트가 견디는 힘을 계산할 때 쓰는 넓이(mm²) */
  stressArea: number;
  /** 1인치에 들어가는 나사산 수 — 인치 나사와 견줄 때 쓴다 */
  tpi: number;
  /** 같은 외경의 다른 피치 */
  siblings: Screw[];
  /** 바로 위·아래 외경의 보통 나사 */
  neighbours: Screw[];
}

export const pitchDiaOf = (s: Screw): number => round(s.d - 0.75 * H(s.p));
export const minorMaleOf = (s: Screw): number => round(s.d - (17 / 12) * H(s.p));
export const minorFemaleOf = (s: Screw): number => round(s.d - 1.25 * H(s.p));

/** ISO 898-1의 응력단면적 — 유효지름과 수나사 골지름의 평균을 지름으로 본다 */
export const stressAreaOf = (s: Screw): number => {
  const mean = (pitchDiaOf(s) + minorMaleOf(s)) / 2;
  return round((Math.PI / 4) * mean * mean, 2);
};

export function screwFacts(s: Screw): ScrewFacts {
  const coarseOf = (d: number) => SCREWS.find(o => o.d === d && o.coarse);
  const diameters = [...new Set(SCREWS.map(o => o.d))].sort((a, b) => a - b);
  const i = diameters.indexOf(s.d);

  return {
    screw: s,
    label: labelOf(s),
    slug: slugOf(s),
    h: round(H(s.p)),
    pitchDia: pitchDiaOf(s),
    minorMale: minorMaleOf(s),
    minorFemale: minorFemaleOf(s),
    tapDrill: round(s.d - s.p, 2),
    threadHeight: round((s.d - minorMaleOf(s)) / 2),
    stressArea: stressAreaOf(s),
    tpi: round(25.4 / s.p, 2),
    siblings: SCREWS.filter(o => o.d === s.d && o.p !== s.p),
    neighbours: [diameters[i - 1], diameters[i + 1]]
      .filter(d => d !== undefined)
      .map(coarseOf)
      .filter((o): o is Screw => o !== undefined),
  };
}

/** 보통 나사만 — 표의 기본 줄이다 */
export const coarseOnly = (): Screw[] => SCREWS.filter(s => s.coarse);

/** 가는 나사만 */
export const fineOnly = (): Screw[] => SCREWS.filter(s => !s.coarse);
