/**
 * 일본 연호 163칸 — 연호 다섯과 그 연호에 실제로 있었던 해 전부.
 *
 * 칸을 임의로 자르지 않았다. 明治는 45년, 大正은 15년, 昭和는 64년, 平成은
 * 31년까지 실제로 있었고, 令和는 지금까지 여덟 해다. 그래서 45 + 15 + 64 +
 * 31 + 8 = 163칸이 된다 — "어디까지 낼까"를 사람이 고르지 않는다.
 *
 * 서기로 옮기는 것은 더하기 하나다. 연호마다 기준이 되는 수가 있고, 연차에
 * 그 수를 더하면 서기가 나온다(facts.ts). 표를 옮겨 적을 것이 없다.
 *
 * 어려운 자리는 연호가 바뀐 해다. 明治에서 大正, 大正에서 昭和로는 **즉일
 * 개원**이라 같은 날이 두 연호에 걸치고, 昭和에서 平成, 平成에서 令和로는
 * **익일 개원**이라 하루 차이로 갈린다. 어느 쪽이든 서기로는 한 해에 두
 * 연호가 앉는다.
 */

export interface Era {
  key: string;
  /** 연차에 이 수를 더하면 서기가 된다 */
  base: number;
  /** 실제로 있었던 마지막 연차 */
  last: number;
  /** 개원한 날 — 이 연호의 원년이 시작된 날이다 */
  from: string;
  /** 끝난 날 — 이어지는 연호가 없으면 null */
  until: string | null;
  /**
   * 앞 연호와 같은 날에 시작했는가.
   *
   * 참이면 즉일 개원이라 그 하루가 두 연호에 함께 든다. 거짓이면 익일
   * 개원이라 앞 연호가 끝난 다음 날부터다.
   */
  sameDay: boolean;
}

/**
 * 연호 다섯.
 *
 * 令和는 지금까지 여덟 해다. 해가 바뀌면 한 칸이 늘어난다 — 그 한 칸을
 * 더하는 것 말고는 손댈 곳이 없도록 last만 고쳐 쓴다.
 */
export const ERAS: Era[] = [
  { key: 'meiji', base: 1867, last: 45, from: '1868-01-25', until: '1912-07-30', sameDay: false },
  { key: 'taisho', base: 1911, last: 15, from: '1912-07-30', until: '1926-12-25', sameDay: true },
  { key: 'showa', base: 1925, last: 64, from: '1926-12-25', until: '1989-01-07', sameDay: true },
  { key: 'heisei', base: 1988, last: 31, from: '1989-01-08', until: '2019-04-30', sameDay: false },
  { key: 'reiwa', base: 2018, last: 8, from: '2019-05-01', until: null, sameDay: false },
];

const BY_KEY = new Map(ERAS.map(e => [e.key, e]));

export const eraOf = (key: string): Era | undefined => BY_KEY.get(key);

export interface Cell {
  /** ERAS의 key */
  era: string;
  /** 연차 — 원년이 1이다 */
  year: number;
}

export const CELLS: Cell[] = ERAS.flatMap(e =>
  Array.from({ length: e.last }, (_, i) => ({ era: e.key, year: i + 1 })),
);

export const slugOf = (c: Cell): string => `${c.era}-${c.year}`;

export const GENGO_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const GENGO_ICON = '🎌';
