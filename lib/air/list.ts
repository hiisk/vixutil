/**
 * 대기질 108칸 — 오염물질 6가지 × 농도 18가지.
 *
 * "PM2.5 35"라는 숫자 하나가 나라를 건너면 등급이 바뀐다. 한국은 그 값을
 * 보통의 끝으로 보고, 미국 지수로 옮기면 이미 나쁨 구간이다. 같은 공기를
 * 두고 예보가 다르게 말하는 이유가 여기 있다.
 *
 * 적는 것은 각 나라가 공표한 구간표와 사람이 실제로 검색하는 농도 목록뿐이고,
 * 지수도 등급도 담배 개비 환산도 거기서 계산된다(facts.ts).
 */

/**
 * 미국 환경보호청의 지수 구간.
 *
 * 농도 구간 하나가 지수 구간 하나에 곧게 대응되고, 그 사이는 직선으로 잇는다.
 * 그래서 표만 있으면 어떤 농도든 지수가 나온다.
 */
export interface Band {
  /** 농도 아래끝 */
  cLo: number;
  /** 농도 위끝 */
  cHi: number;
  /** 지수 아래끝 */
  iLo: number;
  /** 지수 위끝 */
  iHi: number;
}

/** 지수 구간은 어느 오염물질이나 같다 — 농도만 다르다 */
export const INDEX_EDGES: [number, number][] = [
  [0, 50], [51, 100], [101, 150], [151, 200], [201, 300], [301, 500],
];

/** 지수 구간의 이름 */
export const CATEGORIES: { below: number; key: string }[] = [
  { below: 51, key: 'good' },
  { below: 101, key: 'moderate' },
  { below: 151, key: 'sensitive' },
  { below: 201, key: 'unhealthy' },
  { below: 301, key: 'veryUnhealthy' },
  { below: Infinity, key: 'hazardous' },
];

/**
 * 오염물질마다의 농도 구간과, 사람들이 실제로 찾아보는 농도.
 *
 * 지수 쪽 구간은 여섯으로 같으므로 농도 위끝만 적는다 — 아래끝은 앞 구간에서
 * 이어진다(facts.ts에서 잇는다).
 *
 * 한국 통합대기환경지수는 네 등급이라 경계가 셋이다.
 */
export const POLLUTANTS: {
  key: string;
  unit: string;
  /** 미국 지수 구간의 농도 위끝 여섯 */
  epa: number[];
  /** 한국 등급 경계 셋 — 좋음·보통·나쁨의 끝 */
  korea: number[];
  /** 낱장으로 만드는 농도 */
  levels: number[];
}[] = [
  {
    key: 'pm25', unit: 'µg/m³',
    epa: [9, 35.4, 55.4, 125.4, 225.4, 325.4],
    korea: [15, 35, 75],
    levels: [5, 9, 12, 15, 20, 25, 30, 35, 40, 50, 60, 75, 90, 100, 125, 150, 200, 250],
  },
  {
    key: 'pm10', unit: 'µg/m³',
    epa: [54, 154, 254, 354, 424, 604],
    korea: [30, 80, 150],
    levels: [10, 20, 30, 40, 50, 60, 80, 100, 120, 150, 180, 200, 250, 300, 350, 400, 450, 500],
  },
  {
    key: 'o3', unit: 'ppb',
    epa: [54, 70, 85, 105, 200, 400],
    korea: [30, 90, 150],
    levels: [10, 20, 30, 40, 50, 54, 60, 70, 80, 85, 90, 100, 110, 120, 140, 160, 180, 200],
  },
  {
    key: 'no2', unit: 'ppb',
    epa: [53, 100, 360, 649, 1249, 2049],
    korea: [30, 60, 200],
    levels: [10, 20, 30, 40, 50, 60, 70, 80, 100, 120, 150, 200, 250, 300, 400, 500, 700, 1000],
  },
  {
    key: 'co', unit: 'ppm',
    epa: [4.4, 9.4, 12.4, 15.4, 30.4, 50.4],
    korea: [2, 9, 15],
    levels: [0.5, 1, 1.5, 2, 3, 4, 4.4, 5, 6, 7, 9, 10, 12, 15, 20, 25, 30, 40],
  },
  {
    key: 'so2', unit: 'ppb',
    epa: [35, 75, 185, 304, 604, 1004],
    korea: [20, 50, 150],
    levels: [5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 75, 100, 120, 150, 200, 300, 500, 800],
  },
];

/** 한국 통합대기환경지수의 네 등급 */
export const KOREA_GRADES = ['good', 'normal', 'bad', 'veryBad'] as const;

/**
 * 초미세먼지를 담배로 옮기는 눈금(µg/m³·일).
 *
 * 버클리 어스가 내놓은 어림이다 — 하루 22µg/m³를 마시는 것이 담배 한 개비에
 * 해당한다. 숫자만으로는 와닿지 않는 농도를 몸으로 옮겨 준다.
 */
export const CIGARETTE = 22;

export interface Cell {
  /** 오염물질 열쇠 */
  key: string;
  /** 농도 */
  value: number;
}

export const CELLS: Cell[] = POLLUTANTS.flatMap(p => p.levels.map(value => ({ key: p.key, value })));

/** PM2.5 35µg/m³ → pm25-35 */
export const slugOf = (c: Cell): string => `${c.key}-${String(c.value).replace('.', '-')}`;

export const AIR_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const pollutantOf = (key: string) => POLLUTANTS.find(p => p.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const AIR_ICON = '🌫️';
