/**
 * 속도 하나의 정지거리 — 두 부분으로 갈린다.
 *
 * 하나는 위험을 보고 브레이크를 밟기까지 그대로 굴러간 거리(공주거리)이고,
 * 다른 하나는 브레이크가 듣기 시작한 뒤 멈출 때까지의 거리(제동거리)다.
 *
 * 공주거리는 속도에 비례한다. 반응하는 1초 동안 속도만큼 간다.
 * 제동거리는 **속도의 제곱에 비례한다** — 운동에너지가 v²로 늘기 때문이다.
 * 그래서 속도가 두 배면 제동거리는 네 배가 된다. 이 표가 말하려는 것이 그것이다.
 */
import { REACTION_SEC, SPEEDS, SURFACES } from './list.ts';

/** 중력가속도 */
const G = 9.81;
/** 승용차 한 대 길이 — 거리를 가늠하려고 견준다 */
const CAR_M = 4.5;

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Braking {
  key: string;
  mu: number;
  /** 제동거리(m) */
  braking: number;
  /** 공주 + 제동 */
  total: number;
  /** 승용차 몇 대분인가 */
  cars: number;
}

export interface StopFacts {
  kmh: number;
  /** 초속(m/s) */
  ms: number;
  /** 반응하는 동안 굴러간 거리 */
  reaction: number;
  surfaces: Braking[];
  /** 마른 노면 기준 정지거리 — 표의 대표값 */
  dryTotal: number;
  /** 절반 속도의 마른 노면 제동거리 — 제곱 비례를 보이려고 함께 낸다 */
  halfBraking: number | null;
  slower: number | null;
  faster: number | null;
}

/** 시속을 초속으로 — 1000m를 3600초로 */
export const msOf = (kmh: number): number => round((kmh * 1000) / 3600, 3);

/** 반응하는 동안 굴러간 거리 = 초속 × 반응시간 */
export const reactionOf = (kmh: number): number => round(msOf(kmh) * REACTION_SEC, 1);

/**
 * 제동거리 = v² ÷ (2 × 마찰계수 × 중력가속도).
 *
 * 운동에너지 ½mv²를 마찰력 μmg가 다 먹어야 멈추므로, 질량이 약분되어 사라진다 —
 * 무거운 차라고 더 멀리 가지 않는다(타이어가 같다면).
 */
export const brakingOf = (kmh: number, mu: number): number => {
  const v = (kmh * 1000) / 3600;
  return round((v * v) / (2 * mu * G), 1);
};

export function stopFacts(kmh: number): StopFacts {
  const reaction = reactionOf(kmh);

  const surfaces = SURFACES.map(s => {
    const braking = brakingOf(kmh, s.mu);
    const total = round(reaction + braking, 1);
    return { key: s.key, mu: s.mu, braking, total, cars: round(total / CAR_M) };
  });

  const half = Math.round(kmh / 2);

  return {
    kmh,
    ms: msOf(kmh),
    reaction,
    surfaces,
    dryTotal: surfaces[0].total,
    halfBraking: SPEEDS.includes(half) ? brakingOf(half, SURFACES[0].mu) : null,
    slower: SPEEDS.includes(kmh - 1) ? kmh - 1 : null,
    faster: SPEEDS.includes(kmh + 1) ? kmh + 1 : null,
  };
}

export const neighbours = (kmh: number, span = 5): number[] =>
  SPEEDS.filter(s => Math.abs(s - kmh) <= span && s !== kmh);

/** 10km 간격의 눈금 */
export const ROUND_SPEEDS = SPEEDS.filter(s => s % 10 === 0);
