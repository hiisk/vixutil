/**
 * 체감온도 210가지 — 기온 21가지 × 풍속 10가지.
 *
 * 체감온도는 기온과 풍속 둘에서 계산된다(facts.ts). 적는 것은 두 구간과
 * 간격뿐이다.
 *
 * 구간이 영상 10도에서 끊기는 데는 까닭이 있다. 이 공식(2001년 북미 표준)은
 * 기온 10도 이하, 풍속 시속 4.8km 이상에서만 쓰도록 정해져 있다. 그 밖에서는
 * 바람이 식히는 정도를 이 식으로 잴 수 없다.
 */
export const COLDEST = -30;
export const WARMEST = 10;
export const TEMP_STEP = 2;

export const SLOWEST_WIND = 5;
export const FASTEST_WIND = 50;
export const WIND_STEP = 5;

export const TEMPS: number[] = Array.from(
  { length: (WARMEST - COLDEST) / TEMP_STEP + 1 },
  (_, i) => COLDEST + i * TEMP_STEP,
);

export const WINDS: number[] = Array.from(
  { length: (FASTEST_WIND - SLOWEST_WIND) / WIND_STEP + 1 },
  (_, i) => SLOWEST_WIND + i * WIND_STEP,
);

export interface Cell {
  /** 기온(℃) */
  t: number;
  /** 풍속(km/h) */
  v: number;
}

export const CELLS: Cell[] = TEMPS.flatMap(t => WINDS.map(v => ({ t, v })));

/** 영하 10도·풍속 20 → m10-20, 영상 4도 → 4-20 */
export const slugOf = (c: Cell): string => `${c.t < 0 ? `m${-c.t}` : `${c.t}`}-${c.v}`;

export const WINDCHILL_SLUGS = CELLS.map(slugOf);

export const cellOf = (slug: string): Cell | undefined => {
  const m = /^(m?)([0-9]{1,2})-([0-9]{1,2})$/.exec(slug);
  if (!m) return undefined;
  const t = (m[1] === 'm' ? -1 : 1) * Number(m[2]);
  return CELLS.find(c => c.t === t && c.v === Number(m[3]));
};

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const WINDCHILL_ICON = '❄️';

/**
 * 동상까지 걸리는 시간의 경계 — 캐나다 기상청 기준을 따른다.
 *
 * 체감온도가 이 값보다 낮으면 드러난 살갗이 그 시간 안에 얼 수 있다는 뜻이다.
 * 실제로는 바람·습기·옷차림에 따라 크게 달라진다.
 */
export const FROSTBITE: { below: number; minutes: number }[] = [
  { below: -48, minutes: 2 },
  { below: -38, minutes: 10 },
  { below: -28, minutes: 30 },
];
