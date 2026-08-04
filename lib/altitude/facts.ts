/**
 * 고도 하나의 값 — 국제표준대기(ISA)에서 계산한다.
 *
 * 대류권에서는 기온이 100m마다 0.65도씩 떨어진다고 본다. 그 기온 감률을 넣고
 * 기압을 적분하면 고도만으로 기압이 정해진다 —
 *
 *   기압 = 1013.25 × (1 − 0.0065 × 높이 ÷ 288.15) ^ 5.2559
 *
 * 끓는점은 그 기압에서 다시 나온다. 물이 끓는 것은 증기압이 바깥 기압과 같아지는
 * 순간이므로, 클라우지우스-클라페롱 식을 뒤집으면 기압에서 온도가 나온다.
 *
 * 산소 농도는 높은 곳에서도 20.95%로 같다. 얇아지는 것은 농도가 아니라 기압이고,
 * 그래서 한 번 숨쉴 때 들어오는 산소의 양이 줄어든다 — 그 값이 산소 분압이다.
 */
import { ALTITUDES } from './list.ts';

/** 해수면 표준 기압(hPa) */
export const SEA_HPA = 1013.25;
/** 해수면 표준 기온(℃) */
export const SEA_C = 15;
/** 기온 감률 — 100m마다 0.65도 */
export const LAPSE = 0.0065;
/** 공기 중 산소 비율 */
const O2 = 0.2095;

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface AltitudeFacts {
  m: number;
  /** 피트 */
  ft: number;
  /** 기압(hPa) */
  hpa: number;
  /** 해수면 대비 기압(%) */
  pressurePercent: number;
  /** 표준 기온(℃) */
  tempC: number;
  /** 물이 끓는 온도(℃) */
  boilC: number;
  /** 산소 분압(hPa) */
  o2hpa: number;
  /** 해수면 대비 산소(%) — 기압과 같은 비율이다 */
  o2Percent: number;
  /** 삶는 데 걸리는 시간이 몇 배가 되는가 — 어림 */
  cookFactor: number;
  lower: number | null;
  higher: number | null;
}

/** ISA 기압 — 고도에서 곧장 나온다 */
export const hpaOf = (m: number): number =>
  round(SEA_HPA * (1 - (LAPSE * m) / 288.15) ** 5.25588, 2);

/** ISA 기온 — 100m마다 0.65도씩 떨어진다 */
export const tempOf = (m: number): number => round(SEA_C - LAPSE * m * 100 / 100, 2);

/**
 * 그 기압에서 물이 끓는 온도.
 *
 * 1/T = 1/373.15 − (R ÷ L) × ln(p ÷ p0). R은 수증기의 기체상수(461.5),
 * L은 증발잠열(2.257e6)이라 그 몫이 2.0448e-4이다.
 */
export const boilOf = (hpa: number): number => {
  const inv = 1 / 373.15 - (461.5 / 2.257e6) * Math.log(hpa / SEA_HPA);
  return round(1 / inv - 273.15, 2);
};

export function altitudeFacts(m: number): AltitudeFacts {
  const hpa = hpaOf(m);
  const boil = boilOf(hpa);

  return {
    m,
    ft: Math.round(m / 0.3048),
    hpa,
    pressurePercent: round((hpa / SEA_HPA) * 100),
    tempC: tempOf(m),
    boilC: boil,
    o2hpa: round(hpa * O2, 2),
    o2Percent: round((hpa / SEA_HPA) * 100),
    // 끓는점이 10도 낮아지면 익는 데 두 배쯤 걸린다는 어림을 쓴다
    cookFactor: round(2 ** ((100 - boil) / 10), 2),
    lower: ALTITUDES.includes(m - 50) ? m - 50 : null,
    higher: ALTITUDES.includes(m + 50) ? m + 50 : null,
  };
}

/** 기압에서 고도를 되짚는다 — 검사가 쓰는 반대 길이다 */
export const altitudeFromHpa = (hpa: number): number =>
  ((1 - (hpa / SEA_HPA) ** (1 / 5.25588)) * 288.15) / LAPSE;

export const neighbours = (m: number, span = 150): number[] =>
  ALTITUDES.filter(a => Math.abs(a - m) <= span && a !== m);
