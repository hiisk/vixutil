/**
 * 한 칸의 노출값.
 *
 *   EV = log2(N² ÷ t)      N은 조리개값, t는 노출 시간(초)
 *
 * 눈금이 두 배씩 가므로 조리개를 한 칸 조이면 EV가 1 오르고 셔터를 한 칸
 * 빠르게 해도 1 오른다. 그래서 EV는 사실 **두 축의 눈금 번호를 더한 값**이다.
 * 로그를 쓰지 않고도 나온다.
 *
 * 그런데 다이얼에 새겨진 숫자를 그대로 로그에 넣으면 정수가 나오지 않는다.
 * f/11은 진짜 8√2 = 11.314인데 11이라 새기고, 1/60초는 진짜 1/64초 자리인데
 * 60이라 새긴다. 이 표는 두 값을 나란히 두고 그 차이를 적는다.
 *
 * 감도는 눈금 하나가 EV 하나다 — ISO를 두 배로 올리면 같은 밝기를 한 칸
 * 어두운 노출로 담을 수 있으니 EV가 1 올라간다.
 */
import {
  APERTURES, BASE_ISO, ISOS, SHUTTERS, type Cell, type Shutter,
  apertureLabel, secondsOf, shutterLabel, slugOf,
} from './list.ts';

const round = (x: number, digits = 2) => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 새겨진 숫자를 그대로 넣은 EV */
export const evOf = (aperture: number, seconds: number): number => Math.log2((aperture * aperture) / seconds);

/** 눈금 번호를 더한 EV — 조리개 자리 + 셔터 자리다 */
export const evStops = (i: number, j: number): number => i + (SHUTTERS.length - 1 - j) - 5;

/** 감도가 바뀌면 EV가 그만큼 움직인다 */
export const evAtIso = (ev: number, iso: number): number => ev + Math.log2(iso / BASE_ISO);

/**
 * EV100이 가리키는 빛.
 *
 * 널리 쓰이는 기준점만 적는다 — 맑은 날 한낮이 15, 흐린 날이 13, 그늘이 10,
 * 실내가 7 안팎이다. 사이 값은 가까운 쪽으로 읽는다.
 */
export const LIGHTS: { ev: number; key: string }[] = [
  { ev: 16, key: 'snow' },
  { ev: 15, key: 'sunny' },
  { ev: 14, key: 'hazy' },
  { ev: 13, key: 'cloudy' },
  { ev: 12, key: 'overcast' },
  { ev: 10, key: 'shade' },
  { ev: 9, key: 'sunset' },
  { ev: 7, key: 'indoor' },
  { ev: 5, key: 'dim' },
  { ev: 3, key: 'candle' },
  { ev: -2, key: 'night' },
];

/** 가장 가까운 기준점 — 범위 밖이면 양 끝을 준다 */
export function lightOf(ev: number): string {
  let best = LIGHTS[0];
  for (const l of LIGHTS) {
    if (Math.abs(l.ev - ev) < Math.abs(best.ev - ev)) best = l;
  }
  return best.key;
}

export interface Equivalent {
  slug: string;
  aperture: number;
  shutter: number;
}

export interface IsoRow {
  iso: number;
  ev: number;
}

export interface ExposureFacts {
  cell: Cell;
  slug: string;
  aperture: number;
  apertureText: string;
  shutter: Shutter;
  shutterText: string;
  /** 문장 안에 넣을 때의 표기 — 뒤에 '초'를 붙일 수 있게 따옴표를 뺀다 */
  shutterProse: string;
  seconds: number;
  /** 눈금 번호를 더한 값 — 이 칸이 뜻하는 EV다 */
  ev: number;
  /** 새겨진 숫자를 그대로 로그에 넣은 값 */
  evPrinted: number;
  /** 둘의 차 — 눈금의 반올림이 얼마나 밀어 놓았는가 */
  drift: number;
  /** 조리개 눈금만의 어긋남 */
  apertureDrift: number;
  /** 셔터 눈금만의 어긋남 */
  shutterDrift: number;
  /** 새겨진 숫자가 눈금과 정확히 맞는가 */
  exact: boolean;
  /** 이 EV가 가리키는 빛 */
  light: string;
  /** 같은 EV의 다른 조합 — 표의 대각선이다 */
  equivalents: Equivalent[];
  /** 감도를 올리면 EV가 어떻게 움직이는가 */
  isoRows: IsoRow[];
  /** 맑은 날 f/16 규칙에 해당하는 칸인가 */
  sunny16: boolean;
}

export function exposureFacts(c: Cell): ExposureFacts {
  const i = APERTURES.indexOf(c.aperture);
  if (i < 0) throw new Error(`조리개가 없다: ${c.aperture}`);
  const s = SHUTTERS[c.shutter];
  if (!s) throw new Error(`셔터가 없다: ${c.shutter}`);

  const seconds = secondsOf(s);
  const ev = evStops(i, c.shutter);
  const evPrinted = evOf(c.aperture, seconds);
  const apertureDrift = 2 * Math.log2(c.aperture) - i;
  const shutterDrift = Math.log2(1 / seconds) - (ev - i);

  const equivalents = APERTURES.flatMap((aperture, k) =>
    SHUTTERS.flatMap((_x, j) =>
      evStops(k, j) === ev && !(k === i && j === c.shutter)
        ? [{ slug: slugOf({ aperture, shutter: j }), aperture, shutter: j }]
        : [],
    ),
  );

  return {
    cell: c,
    slug: slugOf(c),
    aperture: c.aperture,
    apertureText: apertureLabel(c.aperture),
    shutter: s,
    shutterText: shutterLabel(s),
    shutterProse: s.den === 1 ? `${s.num}` : `1/${s.den}`,
    seconds,
    ev,
    evPrinted: round(evPrinted),
    drift: round(evPrinted - ev, 3),
    apertureDrift: round(apertureDrift, 3),
    shutterDrift: round(shutterDrift, 3),
    exact: Math.abs(evPrinted - ev) < 1e-9,
    light: lightOf(ev),
    equivalents,
    isoRows: ISOS.map(iso => ({ iso, ev: evAtIso(ev, iso) })),
    sunny16: c.aperture === 16 && s.den === 125,
  };
}

/** 같은 조리개의 한 줄 */
export const atAperture = (aperture: number): Cell[] => SHUTTERS.map((_s, shutter) => ({ aperture, shutter }));

/** 같은 셔터의 한 줄 */
export const atShutter = (shutter: number): Cell[] => APERTURES.map(aperture => ({ aperture, shutter }));
