/**
 * 러닝 페이스.
 *
 * 달리는 사람이 실제로 쓰는 값은 «시속»이 아니라 «km당 몇 분»이다. 시계도
 * 대회 기록도 그 단위로 나오고, 목표 기록을 페이스로 바꾸는 산수를 사람들이
 * 매번 손으로 한다 — 42.195를 3시간 30분으로 나누는 일이다.
 *
 * 마일 페이스도 같이 낸다. 영어권 대회는 마일로 적히고, 러닝 시계 기본값이
 * 마일인 채로 쓰는 사람도 많다.
 */

/** 대회 거리 — km. 하프·풀은 반올림한 값이 아니라 공인 거리다. */
export const RACE_DISTANCES = [
  { id: '5k', km: 5, label: '5K' },
  { id: '10k', km: 10, label: '10K' },
  { id: 'half', km: 21.0975, label: '하프마라톤' },
  { id: 'full', km: 42.195, label: '마라톤' },
] as const;

const KM_PER_MILE = 1.609344;

export interface PaceResult {
  /** 초/km */
  paceKm: number;
  /** 초/mile */
  paceMile: number;
  /** km/h */
  speedKmh: number;
  /** 총 소요 초 */
  totalSec: number;
  km: number;
  /** 구간별 통과 시각 — 5km마다, 마지막은 결승 */
  splits: { at: number; sec: number }[];
  /** 같은 페이스로 달렸을 때 다른 대회 거리의 기록 */
  equivalents: { label: string; km: number; sec: number }[];
}

/** 초 → "1:23:45" 또는 "23:45". 음수·NaN은 "0:00"으로 눕힌다. */
export function fmtTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const t = Math.round(sec);
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  const mm = h ? String(m).padStart(2, '0') : String(m);
  return `${h ? `${h}:` : ''}${mm}:${String(s).padStart(2, '0')}`;
}

/** 초 → "5'30\"" — 페이스는 시계에 이 꼴로 뜬다 */
export function fmtPace(sec: number): string {
  if (!Number.isFinite(sec) || sec <= 0) return "0'00\"";
  const t = Math.round(sec);
  return `${Math.floor(t / 60)}'${String(t % 60).padStart(2, '0')}"`;
}

export function calcPace(km: number, totalSec: number): PaceResult | null {
  if (!(km > 0) || !(totalSec > 0)) return null;

  const paceKm = totalSec / km;
  const splits: { at: number; sec: number }[] = [];
  for (let d = 5; d < km; d += 5) splits.push({ at: d, sec: d * paceKm });
  splits.push({ at: km, sec: totalSec });

  return {
    paceKm,
    paceMile: paceKm * KM_PER_MILE,
    speedKmh: 3600 / paceKm,
    totalSec,
    km,
    splits,
    /*
      같은 페이스를 그대로 늘린 값이다 — 리겔 지수(1.06)처럼 «길수록 느려진다»를
      반영한 예측이 아니다. 예측을 내려면 그 사람의 지구력을 알아야 하는데
      이 화면은 그걸 묻지 않는다. 표에 «같은 페이스로 달린다면»이라고 적어 둔다.
    */
    equivalents: RACE_DISTANCES.map(r => ({ label: r.label, km: r.km, sec: r.km * paceKm })),
  };
}

/** 페이스(초/km)로 거리를 달리는 데 걸리는 시간 — 반대 방향 */
export function timeFromPace(km: number, paceSec: number): number {
  return km * paceSec;
}
