/**
 * 규모 하나가 뜻하는 에너지.
 *
 *   log10(에너지) = 1.5 × 규모 + 4.8   (에너지는 줄)
 *
 * 기울기가 1.5이므로 규모가 1 오르면 에너지는 10^1.5 = 31.6배가 되고, 2가
 * 오르면 10^3 = 정확히 1000배가 된다. 흔들림의 크기(진폭)는 10배씩이지만
 * 에너지는 그보다 훨씬 가파르게 는다 — 규모 7이 6의 두 배라는 어림이 크게
 * 어긋나는 이유다.
 *
 * 값이 10^23줄까지 올라가므로 자릿수는 로그로 다룬다. TNT 톤수와 히로시마
 * 폭탄 몇 발인지도 같은 방식으로 낸다.
 */
import {
  ENERGY_BASE, ENERGY_SLOPE, HIROSHIMA_TNT_TONS, JOULE_PER_TNT_TON, MAGNITUDES, STEP,
} from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 그 규모가 내는 에너지의 상용로그 */
export const logEnergyOf = (m: number): number => ENERGY_SLOPE * m + ENERGY_BASE;

/** 에너지(줄) */
export const energyOf = (m: number): number => 10 ** logEnergyOf(m);

/** 규모 차이가 만드는 에너지 배수 */
export const ratioFor = (delta: number): number => 10 ** (ENERGY_SLOPE * delta);

export interface Neighbour {
  slug: string;
  magnitude: number;
}

export interface QuakeFacts {
  magnitude: number;
  slug: string;
  /** 에너지의 상용로그 */
  logJoule: number;
  /** TNT 톤수 */
  tntTons: number;
  /** TNT 톤수의 상용로그 — 큰 규모에서 읽기 좋다 */
  logTnt: number;
  /** 히로시마 폭탄 몇 발분인가 */
  hiroshima: number;
  /** 한 눈금(0.05) 아래보다 몇 배인가 */
  stepRatio: number;
  /** 규모가 1 낮은 지진 몇 번을 모아야 같아지는가 */
  perOneLower: number;
  lower: Neighbour | null;
  higher: Neighbour | null;
}

export function quakeFacts(m: number): QuakeFacts {
  const i = MAGNITUDES.indexOf(m);
  const near = (magnitude: number): Neighbour => ({ slug: `${magnitude.toFixed(2).replace('.', '-')}`, magnitude });
  const tnt = energyOf(m) / JOULE_PER_TNT_TON;

  return {
    magnitude: m,
    slug: m.toFixed(2).replace('.', '-'),
    logJoule: round(logEnergyOf(m), 3),
    tntTons: tnt,
    logTnt: round(Math.log10(tnt), 2),
    hiroshima: tnt / HIROSHIMA_TNT_TONS,
    stepRatio: round(ratioFor(STEP), 3),
    perOneLower: round(ratioFor(1), 1),
    lower: i > 0 ? near(MAGNITUDES[i - 1]) : null,
    higher: i + 1 < MAGNITUDES.length ? near(MAGNITUDES[i + 1]) : null,
  };
}

/** 그 규모 언저리의 칸들 — 앞뒤로 몇 개씩 */
export const around = (m: number, span = 6): number[] => {
  const i = MAGNITUDES.indexOf(m);
  return MAGNITUDES.slice(Math.max(0, i - span), i + span + 1);
};

/** 소수 첫째 자리가 같은 칸들 — 4.3, 4.35처럼 */
export const atTenth = (m: number): number[] => {
  const tenth = Math.floor(m * 10) / 10;
  return MAGNITUDES.filter(x => Math.abs(Math.floor(x * 10) / 10 - tenth) < 1e-9);
};
