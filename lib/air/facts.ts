/**
 * 오염물질과 농도 하나가 만드는 대기질 — 나라마다 다른 등급.
 *
 * 미국 지수는 농도 구간과 지수 구간을 곧게 이어 붙인 뒤 그 사이를 직선으로
 * 잇는다. 그래서 어떤 농도든 지수가 나오고, 거꾸로 지수에서 농도도 나온다.
 *
 *   지수 = (지수위 − 지수아래) ÷ (농도위 − 농도아래) × (농도 − 농도아래) + 지수아래
 *
 * 한국 통합대기환경지수는 구간을 넷으로 나누고 경계도 다르다. 그래서 같은
 * PM2.5 35µg/m³가 한국에서는 보통의 끝이고 미국 지수로는 이미 100을 넘는다.
 * 이 표가 보여 주려는 것이 그 어긋남이다.
 */
import {
  CATEGORIES, CELLS, CIGARETTE, INDEX_EDGES, KOREA_GRADES, POLLUTANTS,
  type Band, type Cell, pollutantOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 농도 위끝만 적어 둔 것을 아래끝과 이어 구간으로 만든다 */
export const bandsOf = (key: string): Band[] => {
  const p = pollutantOf(key);
  if (!p) throw new Error(`모르는 오염물질: ${key}`);
  return p.epa.map((cHi, i) => ({
    cLo: i === 0 ? 0 : p.epa[i - 1],
    cHi,
    iLo: INDEX_EDGES[i][0],
    iHi: INDEX_EDGES[i][1],
  }));
};

/** 그 농도가 든 구간 — 맨 위를 넘으면 마지막 구간을 그대로 늘려 쓴다 */
export const bandAt = (key: string, value: number): Band => {
  const bands = bandsOf(key);
  return bands.find(b => value <= b.cHi) ?? bands[bands.length - 1];
};

/** 미국 지수 — 구간 안에서 직선으로 잇는다 */
export const epaOf = (key: string, value: number): number => {
  const b = bandAt(key, value);
  return ((b.iHi - b.iLo) / (b.cHi - b.cLo)) * (value - b.cLo) + b.iLo;
};

/** 지수에서 농도로 되돌린다 — 같은 직선을 거꾸로 탄다 */
export const concentrationOf = (key: string, index: number): number => {
  const bands = bandsOf(key);
  const b = bands.find(x => index <= x.iHi) ?? bands[bands.length - 1];
  return ((b.cHi - b.cLo) / (b.iHi - b.iLo)) * (index - b.iLo) + b.cLo;
};

export const categoryOf = (index: number): string => CATEGORIES.find(c => index < c.below)!.key;

/** 한국 통합대기환경지수의 네 등급 — 경계 셋으로 가른다 */
export const koreaGradeOf = (key: string, value: number): string => {
  const p = pollutantOf(key);
  if (!p) throw new Error(`모르는 오염물질: ${key}`);
  const i = p.korea.findIndex(edge => value <= edge);
  return KOREA_GRADES[i === -1 ? 3 : i];
};

export interface Neighbour {
  slug: string;
  key: string;
  value: number;
}

export interface AirFacts {
  cell: Cell;
  slug: string;
  unit: string;
  /** 미국 지수 */
  epa: number;
  /** 미국 지수의 등급 */
  category: string;
  /** 한국 등급 */
  korea: string;
  /** 두 나라의 판정이 갈리는가 */
  split: boolean;
  /** 이 농도의 공기를 하루 마시면 담배 몇 개비인가 — 초미세먼지만 */
  cigarettes: number | null;
  /** 지수 100(보통의 끝)이 되는 농도 */
  hundred: number;
  higher: Neighbour | null;
  lower: Neighbour | null;
}

export function airFacts(c: Cell): AirFacts {
  const p = pollutantOf(c.key);
  if (!p) throw new Error(`모르는 오염물질: ${c.key}`);
  const epa = epaOf(c.key, c.value);
  const category = categoryOf(epa);
  const korea = koreaGradeOf(c.key, c.value);
  const i = p.levels.indexOf(c.value);
  const near = (value: number): Neighbour => ({ slug: slugOf({ key: c.key, value }), key: c.key, value });

  return {
    cell: c,
    slug: slugOf(c),
    unit: p.unit,
    epa: Math.round(epa),
    category,
    korea,
    // 미국이 보통을 넘겼는데 한국은 아직 보통이면 갈린 것이다
    split: (epa > 100) !== (korea === 'bad' || korea === 'veryBad'),
    cigarettes: c.key === 'pm25' ? round(c.value / CIGARETTE, 2) : null,
    hundred: round(concentrationOf(c.key, 100), 1),
    higher: i + 1 < p.levels.length ? near(p.levels[i + 1]) : null,
    lower: i > 0 ? near(p.levels[i - 1]) : null,
  };
}

/** 같은 오염물질의 한 줄 */
export const atPollutant = (key: string): Cell[] => CELLS.filter(c => c.key === key);
