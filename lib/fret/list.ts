/**
 * 기타 지판 144자리 — 여섯 줄 × 0~23프렛.
 *
 * 각 자리의 음도, 그 음의 주파수도, 프렛이 너트에서 몇 밀리미터 떨어져 있는지도
 * 전부 줄과 프렛 번호에서 계산된다(facts.ts).
 *
 * 적는 것은 여섯 줄의 개방현 음 하나뿐이다. 표준 조율(E-A-D-G-B-E)은 지어낼 수
 * 없는 약속이고, 나머지는 거기서 반음씩 올라간다.
 *
 * 0프렛은 개방현이다. 줄을 누르지 않고 튕기는 자리라 프렛 번호로 0을 준다.
 */
export const STRINGS = 6;
export const MAX_FRET = 23;

/**
 * 표준 조율의 개방현 MIDI 번호 — 1번 줄(가장 가는 줄)부터.
 *
 * E4(64) B3(59) G3(55) D3(50) A2(45) E2(40). 3번과 2번 사이만 네 반음이고
 * 나머지는 다섯 반음씩 벌어진다 — 코드를 잡는 손 모양이 그 한 칸 때문에 달라진다.
 */
export const OPEN_MIDI = [64, 59, 55, 50, 45, 40];

export interface Spot {
  /** 줄 번호 — 1번이 가장 가는 줄 */
  string: number;
  /** 프렛 번호 — 0은 개방현 */
  fret: number;
}

export const SPOTS: Spot[] = Array.from({ length: STRINGS }, (_, s) =>
  Array.from({ length: MAX_FRET + 1 }, (_, f) => ({ string: s + 1, fret: f })),
).flat();

/** 3번 줄 5프렛 → s3-f5 */
export const slugOf = (p: Spot): string => `s${p.string}-f${p.fret}`;

export const FRET_SLUGS = SPOTS.map(slugOf);

export const spotOf = (slug: string): Spot | undefined => {
  const m = /^s([1-6])-f([0-9]{1,2})$/.exec(slug);
  if (!m) return undefined;
  return SPOTS.find(p => p.string === Number(m[1]) && p.fret === Number(m[2]));
};

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const FRET_ICON = '🎸';

/**
 * 지판에 점을 찍는 프렛 — 손이 자리를 찾는 표식이다.
 *
 * 12프렛은 한 옥타브 위라 점이 두 개다.
 */
export const DOTS = [3, 5, 7, 9, 12, 15, 17, 19, 21];

/** 스케일 길이(mm) — 기타마다 다르고, 프렛 사이 거리가 여기에 비례한다 */
export const SCALES: { key: string; mm: number }[] = [
  { key: 'fender', mm: 648 },
  { key: 'gibson', mm: 628 },
  { key: 'classic', mm: 650 },
];
