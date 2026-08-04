/**
 * 몸무게 하나가 천체마다 어떻게 재지는지 — 중력비로 계산한다.
 *
 * 몸이 가진 물질의 양(질량)은 어디서나 같다. 달라지는 것은 그 물질을 끌어당기는
 * 힘이고, 저울은 그 힘을 잰다. 그래서 "달에서 몸무게"는 지구 몸무게에 달의
 * 중력을 지구 중력으로 나눈 값을 곱한 것이다.
 *
 * 뛰어오르는 높이는 반대로 간다. 같은 힘으로 굴러 올라가는 높이는 중력에
 * 반비례하므로, 달에서는 여섯 배 높이 뜬다.
 */
import { BODIES, EARTH_G } from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface OnBody {
  key: string;
  /** 그 천체의 중력가속도 */
  g: number;
  /** 지구를 1로 봤을 때의 중력 */
  ratio: number;
  /** 저울에 찍히는 값(kg) */
  kg: number;
  /** 실제로 끌어당기는 힘(N) */
  newton: number;
}

export interface GravityFacts {
  /** 지구에서 잰 몸무게(kg) — 질량은 어디서나 이 값이다 */
  kg: number;
  /** 지구에서의 무게(N) */
  earthNewton: number;
  bodies: OnBody[];
  /** 지구에서 50cm 뛴다면 달에서는 몇 cm인가 */
  moonJump: number;
  lighter: number | null;
  heavier: number | null;
}

/** 지구에서 잰 몸무게가 그 천체 저울에서 얼마로 찍히는가 */
export const onBody = (kg: number, g: number): number => round((kg * g) / EARTH_G, 2);

/** 질량 × 중력가속도 = 힘(뉴턴) */
export const newtonOf = (kg: number, g: number): number => round(kg * g);

export function gravityFacts(kg: number): GravityFacts {
  return {
    kg,
    earthNewton: newtonOf(kg, EARTH_G),
    bodies: BODIES.map(b => ({
      key: b.key,
      g: b.g,
      ratio: round(b.g / EARTH_G, 3),
      kg: onBody(kg, b.g),
      newton: newtonOf(kg, b.g),
    })),
    // 뛰는 높이는 중력에 반비례한다 — 지구에서 50cm면 달에서는 그 여섯 배쯤이다
    moonJump: round(50 * (EARTH_G / BODIES.find(b => b.key === 'moon')!.g)),
    lighter: kg - 1 >= 30 ? kg - 1 : null,
    heavier: kg + 1 <= 130 ? kg + 1 : null,
  };
}

/** 지구보다 무겁게 재는 천체 */
export const heavierThanEarth = (): string[] =>
  BODIES.filter(b => b.g > EARTH_G).map(b => b.key);

/** 지구보다 가볍게 재는 천체 */
export const lighterThanEarth = (): string[] =>
  BODIES.filter(b => b.g < EARTH_G).map(b => b.key);

export const neighbours = (kg: number, span = 3): number[] =>
  Array.from({ length: span * 2 + 1 }, (_, i) => kg - span + i).filter(w => w >= 30 && w <= 130 && w !== kg);
