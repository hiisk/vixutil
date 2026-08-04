/**
 * 러닝 페이스 241가지 — 1km에 3분부터 7분까지 1초 간격.
 *
 * 완주 시간도, 시속도, 마일 페이스도 전부 이 한 수에서 계산된다(facts.ts).
 * 적는 것은 구간의 양 끝과 간격뿐이다.
 *
 * 3분에서 끊은 것은 그보다 빠르면 세계기록 언저리이기 때문이고, 7분에서
 * 끊은 것은 그보다 느리면 걷기와 섞이기 때문이다. 1초 간격인 이유는 사람들이
 * 목표를 초 단위로 세우기 때문이다 — "5분 30초 페이스로 가면 서브4가 되나".
 */
export const FASTEST = 180;
export const SLOWEST = 420;

/** 1km를 가는 데 걸리는 초 */
export const PACES: number[] = Array.from({ length: SLOWEST - FASTEST + 1 }, (_, i) => FASTEST + i);

/** 270 → 4-30 */
export const slugOf = (sec: number): string => `${Math.floor(sec / 60)}-${String(sec % 60).padStart(2, '0')}`;

/** 270 → 4:30 */
export const labelOf = (sec: number): string => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

export const PACE_SLUGS = PACES.map(slugOf);

export const paceOf = (slug: string): number | undefined => {
  const m = /^([0-9])-([0-5][0-9])$/.exec(slug);
  if (!m) return undefined;
  const sec = Number(m[1]) * 60 + Number(m[2]);
  return PACES.includes(sec) ? sec : undefined;
};

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const PACE_ICON = '🏃';

/** 거리(km) — 사람들이 실제로 뛰는 것들 */
export const RACES: { key: string; km: number }[] = [
  { key: '5k', km: 5 },
  { key: '10k', km: 10 },
  { key: 'half', km: 21.0975 },
  { key: 'full', km: 42.195 },
];
