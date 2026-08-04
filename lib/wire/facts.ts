/**
 * 굵기와 전류 하나가 만드는 전선 — 저항, 강하, 그리고 쓸 수 있는 길이.
 *
 * AWG는 표가 아니라 수열이다. 36번을 0.127mm로 두고 0번까지 39단계를 같은
 * 비율로 늘린 것이라, 한 단계 건널 때마다 지름이 92^(1/39)배씩 굵어진다.
 * 그래서 여섯 단계마다 단면적이 꼭 네 배가 된다 — 외울 것이 아니라 나온다.
 *
 *   지름 = 0.127 × 92^((36 − n) / 39)   [mm]
 *
 * 전압 강하는 왕복이다. 전기는 가서 돌아와야 하므로 선의 길이가 두 번 센다.
 * 이 한 가지를 빠뜨리면 답이 정확히 절반이 된다.
 */
import { AMPS, DROP_LIMIT, RHO, SIZES, SYSTEMS, type Cell, type Size, sizeLabel, sizeSlug, slugOf } from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** AWG 번호에서 지름(mm) — 표가 아니라 식이다 */
export const diaOf = (awg: number): number => 0.127 * 92 ** ((36 - awg) / 39);

/** 지름에서 단면적(mm²) */
export const areaOfDia = (dia: number): number => Math.PI * (dia / 2) ** 2;

/**
 * 견딜 수 있는 전류는 단면적에 비례하지 않는다.
 *
 * 열은 단면적에 비례해 나지만 그 열을 버리는 것은 겉넓이다. 굵어질수록 속이
 * 식기 어려워서, 두 배 굵은 선이 두 배를 흘리지 못한다. 지수 0.65는 그
 * 어긋남을 담은 값이고, 앞의 9.2는 절연이 60도까지 견디는 흔한 전선에
 * 맞춘 것이다 — 여유 있게 잡은 쪽이라 실제 규정표보다 낮게 나온다.
 */
export const AMP_K = 9.2;
export const AMP_P = 0.65;

export const ampacityOf = (area: number): number => AMP_K * area ** AMP_P;

/** 어느 계열이든 단면적으로 모은다 */
export const areaOf = (s: Size): number =>
  s.sq !== null ? s.sq : areaOfDia(diaOf(s.awg as number));

export interface Reach {
  volt: number;
  key: string;
  /** 3% 안에 들어오는 최대 길이(m) */
  metres: number;
}

export interface Neighbour {
  slug: string;
  label: string;
  area: number;
}

export interface WireFacts {
  cell: Cell;
  slug: string;
  label: string;
  /** 지름(mm) */
  dia: number;
  /** 단면적(mm²) */
  area: number;
  /** 1미터당 저항(Ω) — 왕복이 아니라 한쪽만 */
  ohmPerM: number;
  /** 이 굵기가 무리 없이 흘리는 전류(A) */
  safeAmp: number;
  /** 흘리려는 전류가 그 안에 드는가 */
  fits: boolean;
  /** 10미터 갔다 올 때의 강하(V) */
  dropPer10m: number;
  /** 1미터마다 열이 되는 몫(W) */
  heatPerM: number;
  /** 전압마다 3% 안에 드는 길이 */
  reach: Reach[];
  /** 다른 계열에서 가장 가까운 굵기 */
  twin: Neighbour | null;
  thicker: Neighbour | null;
  thinner: Neighbour | null;
  more: number | null;
  less: number | null;
}

/** 한쪽 길이 1미터의 저항 */
export const ohmPerMetreOf = (area: number): number => RHO / area;

/** 이 전압에서 3% 안에 드는 편도 길이 — 가고 오는 두 배를 셈에 넣는다 */
export const reachOf = (area: number, amp: number, volt: number): number =>
  (DROP_LIMIT * volt) / (2 * amp * ohmPerMetreOf(area));

const near = (s: Size): Neighbour => ({ slug: sizeSlug(s), label: sizeLabel(s), area: round(areaOf(s), 3) });

const step = <T,>(list: T[], i: number, by: number): T | null => {
  const j = i + by;
  return j >= 0 && j < list.length ? list[j] : null;
};

/** 굵은 것부터 가는 것 순으로 늘어놓은다 — 두 계열을 단면적으로 섞는다 */
export const BY_AREA: Size[] = [...SIZES].sort((a, b) => areaOf(b) - areaOf(a));

export function wireFacts(c: Cell): WireFacts {
  const area = areaOf(c.size);
  const ohm = ohmPerMetreOf(area);
  const sameFamily = BY_AREA.filter(s => (s.awg === null) === (c.size.awg === null));
  const i = sameFamily.findIndex(s => sizeSlug(s) === sizeSlug(c.size));
  const other = BY_AREA.filter(s => (s.awg === null) !== (c.size.awg === null));
  const twin = other.reduce<Size | null>(
    (best, s) => (best === null || Math.abs(areaOf(s) - area) < Math.abs(areaOf(best) - area) ? s : best),
    null,
  );
  const ai = AMPS.indexOf(c.amp);

  return {
    cell: c,
    slug: slugOf(c),
    label: sizeLabel(c.size),
    dia: round(c.size.awg !== null ? diaOf(c.size.awg) : 2 * Math.sqrt(area / Math.PI), 3),
    area: round(area, 3),
    ohmPerM: round(ohm, 5),
    safeAmp: round(ampacityOf(area), 1),
    fits: c.amp <= ampacityOf(area),
    dropPer10m: round(2 * c.amp * ohm * 10, 2),
    heatPerM: round(c.amp ** 2 * ohm, 2),
    reach: SYSTEMS.map(({ volt, key }) => ({ volt, key, metres: round(reachOf(area, c.amp, volt), 1) })),
    twin: twin === null ? null : near(twin),
    thicker: step(sameFamily, i, -1) === null ? null : near(step(sameFamily, i, -1) as Size),
    thinner: step(sameFamily, i, 1) === null ? null : near(step(sameFamily, i, 1) as Size),
    more: step(AMPS, ai, 1),
    less: step(AMPS, ai, -1),
  };
}

/** 같은 굵기의 한 줄 */
export const atSize = (s: Size): Cell[] => AMPS.map(amp => ({ size: s, amp }));

/** 같은 전류의 한 줄 — 굵은 것부터 */
export const atAmp = (amp: number): Cell[] => BY_AREA.map(size => ({ size, amp }));
