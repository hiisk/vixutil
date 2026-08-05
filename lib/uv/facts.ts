/**
 * 자외선 지수와 피부 타입 하나가 만드는 화상 시간.
 *
 * 자외선 지수는 홍반에 유효한 자외선의 세기다 — 지수 1이 0.025W/m²이므로,
 * 지수 8이면 0.2W/m²가 피부에 내린다. 최소 홍반량은 "그만큼 쌓이면 발갛게
 * 되는" 양이라 단위가 J/m²다. 세기로 양을 나누면 시간이 된다.
 *
 *   화상까지 시간(초) = 최소 홍반량 ÷ (지수 × 0.025)
 *
 * 차단제는 그 시간을 지수만큼 늘린다 — SPF 30이면 서른 배다. 다만 그것은
 * 실험실에서 2mg/cm²를 고르게 발랐을 때의 값이고, 실제로 바르는 양은 그
 * 절반이 안 된다. 그래서 이 표의 SPF 시간은 넉넉한 쪽으로 틀린 값이다.
 */
import {
  BANDS, CELLS, INDEXES, OUTING, PER_INDEX, SKINS, SPFS,
  type Cell, skinOf, slugOf,
} from './list.ts';

const round = (x: number, digits = 1) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

export interface Shield {
  spf: number;
  /** 그 차단제를 발랐을 때의 화상 시간(분) */
  minutes: number;
}

export interface Neighbour {
  slug: string;
  uv: number;
  skin: string;
}

export interface UvFacts {
  cell: Cell;
  slug: string;
  /** 피부에 내리는 홍반 유효 조사량(W/m²) */
  irradiance: number;
  /** 최소 홍반량(J/m²) */
  med: number;
  /** 아무것도 안 바르고 화상까지(분) */
  minutes: number;
  /** 차단제별 화상 시간 */
  shields: Shield[];
  /** 두 시간을 버티려면 필요한 차단 지수 */
  needSpf: number;
  /** 세계보건기구 구간 */
  band: string;
  /** 그림자가 키보다 짧아지는 구간인가 — 지수가 높을 때의 눈대중 */
  shortShadow: boolean;
  stronger: Neighbour | null;
  weaker: Neighbour | null;
  darker: Neighbour | null;
  fairer: Neighbour | null;
}

/** 그 지수가 피부에 내리는 세기(W/m²) */
export const irradianceOf = (uv: number): number => uv * PER_INDEX;

/** 화상까지 걸리는 시간(분) */
export const burnMinutesOf = (med: number, uv: number): number => med / irradianceOf(uv) / 60;

export const bandOf = (uv: number): string => BANDS.find(b => uv < b.below)!.key;

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

export function uvFacts(c: Cell): UvFacts {
  const skin = skinOf(c.skin);
  if (!skin) throw new Error(`모르는 피부 타입: ${c.skin}`);
  const minutes = burnMinutesOf(skin.med, c.uv);
  const ui = INDEXES.indexOf(c.uv);
  const si = SKINS.findIndex(s => s.key === c.skin);
  const near = (cell: Cell): Neighbour => ({ slug: slugOf(cell), uv: cell.uv, skin: cell.skin });

  return {
    cell: c,
    slug: slugOf(c),
    irradiance: round(irradianceOf(c.uv), 4),
    med: skin.med,
    minutes: round(minutes),
    shields: SPFS.map(spf => ({ spf, minutes: round(minutes * spf) })),
    // 두 시간을 채우려면 몇 배가 더 필요한가 — 올림해서 파는 지수로 답한다
    needSpf: Math.max(1, Math.ceil(OUTING / minutes)),
    band: bandOf(c.uv),
    // 지수 6을 넘으면 해가 높이 떠 그림자가 키보다 짧아진다
    shortShadow: c.uv >= 6,
    stronger: step(INDEXES, ui, 1) === null ? null : near({ uv: step(INDEXES, ui, 1) as number, skin: c.skin }),
    weaker: step(INDEXES, ui, -1) === null ? null : near({ uv: step(INDEXES, ui, -1) as number, skin: c.skin }),
    darker: step(SKINS, si, 1) === null ? null : near({ uv: c.uv, skin: (step(SKINS, si, 1) as { key: string }).key }),
    fairer: step(SKINS, si, -1) === null ? null : near({ uv: c.uv, skin: (step(SKINS, si, -1) as { key: string }).key }),
  };
}

/** 같은 지수의 한 줄 */
export const atIndex = (uv: number): Cell[] => SKINS.map(s => ({ uv, skin: s.key }));

/** 같은 피부 타입의 한 줄 */
export const atSkin = (skin: string): Cell[] => CELLS.filter(c => c.skin === skin);
