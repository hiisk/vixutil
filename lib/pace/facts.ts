/**
 * 페이스 하나의 값 — 1km에 걸리는 초에서 전부 계산한다.
 *
 * 페이스와 속도는 서로 뒤집힌 값이다. 1km에 300초면 시속 12km인데, 페이스
 * 숫자는 작을수록 빠르고 속도 숫자는 클수록 빠르다. 그래서 두 값을 나란히
 * 두면 헷갈리지 않는다.
 *
 * 완주 시간은 거리를 곱하기만 하면 된다. 다만 하프는 21.0975km, 풀은
 * 42.195km라 어림하면 몇 분씩 어긋난다 — 풀코스에서 42km로 잡으면 1분 넘게
 * 빠지게 나온다.
 */
import { PACES, RACES, labelOf, slugOf } from './list.ts';

export interface Finish {
  key: string;
  km: number;
  /** 완주에 걸리는 초 */
  seconds: number;
  text: string;
}

export interface PaceFacts {
  /** 1km에 걸리는 초 */
  sec: number;
  label: string;
  slug: string;
  /** 시속(km/h) */
  kmh: number;
  /** 초속(m/s) */
  ms: number;
  /** 1마일에 걸리는 초 */
  mileSec: number;
  mileText: string;
  /** 400m 한 바퀴 */
  lapSec: number;
  lapText: string;
  finishes: Finish[];
  faster: number | null;
  slower: number | null;
}

const MILE_KM = 1.609344;

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 초를 시:분:초로 — 한 시간이 안 되면 분:초로 적는다 */
export function hms(total: number): string {
  const t = Math.round(total);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function paceFacts(sec: number): PaceFacts {
  return {
    sec,
    label: labelOf(sec),
    slug: slugOf(sec),
    // 1km에 sec초 → 1시간(3600초)에 3600/sec 킬로미터
    kmh: round(3600 / sec),
    ms: round(1000 / sec, 3),
    mileSec: Math.round(sec * MILE_KM),
    mileText: hms(sec * MILE_KM),
    lapSec: Math.round(sec * 0.4),
    lapText: hms(sec * 0.4),
    finishes: RACES.map(r => ({ ...r, seconds: Math.round(sec * r.km), text: hms(sec * r.km) })),
    faster: PACES.includes(sec - 1) ? sec - 1 : null,
    slower: PACES.includes(sec + 1) ? sec + 1 : null,
  };
}

/** 마라톤을 이 시간 안에 끝내려면 필요한 페이스 — 서브3·서브4 같은 목표들 */
export const GOALS: { key: string; km: number; limit: number }[] = [
  { key: 'sub20-5k', km: 5, limit: 20 * 60 },
  { key: 'sub25-5k', km: 5, limit: 25 * 60 },
  { key: 'sub30-5k', km: 5, limit: 30 * 60 },
  { key: 'sub50-10k', km: 10, limit: 50 * 60 },
  { key: 'sub60-10k', km: 10, limit: 60 * 60 },
  { key: 'sub100-half', km: 21.0975, limit: 100 * 60 },
  { key: 'sub2-half', km: 21.0975, limit: 120 * 60 },
  { key: 'sub3-full', km: 42.195, limit: 180 * 60 },
  { key: 'sub330-full', km: 42.195, limit: 210 * 60 },
  { key: 'sub4-full', km: 42.195, limit: 240 * 60 },
  { key: 'sub5-full', km: 42.195, limit: 300 * 60 },
];

/** 그 목표를 이루는 가장 느린 페이스 — 이보다 느리면 못 끊는다 */
export const paceForGoal = (goal: { km: number; limit: number }): number =>
  Math.floor(goal.limit / goal.km);

/** 이 페이스로 끊을 수 있는 목표들 */
export const goalsMet = (sec: number) => GOALS.filter(g => sec * g.km <= g.limit);

export const neighbours = (sec: number, span = 5): number[] =>
  PACES.filter(p => Math.abs(p - sec) <= span && p !== sec);

/** 30초 간격의 대표 페이스 — 목록의 눈금이 된다 */
export const ROUND_PACES = PACES.filter(p => p % 30 === 0);
