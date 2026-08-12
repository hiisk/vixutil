/**
 * ppm 하나가 나라마다 어떤 숫자로 적히는가.
 *
 * 기준은 ppm이다 — mg/L as CaCO₃, 물 1리터에 탄산칼슘 몇 밀리그램이 든 셈으로
 * 적은 값이다. 나머지 단위는 전부 이 기준의 **정해진 배수**이고, 그 배수는
 * 계수표가 아니라 각 단위의 정의에서 나온다.
 *
 *   °dH (독일 도)   1°dH = 10mg/L CaO
 *                   CaO를 CaCO₃ 셈으로 옮기면 10 × 100.09/56.08 = 17.8477ppm
 *   °fH (프랑스 도) 1°fH = 10mg/L CaCO₃ = 10ppm            (정의 그대로다)
 *   °e  (영국 도)   1°e = CaCO₃ 1그레인 / 영국 갤런
 *                   = 64.79891 ÷ 4.54609 = 14.2538ppm
 *   gpg (미국)      1gpg = CaCO₃ 1그레인 / 미국 갤런
 *                   = 64.79891 ÷ 3.785412 = 17.1181ppm
 *   mmol/L          1mmol/L = 100.09mg/L                    (몰질량 그대로다)
 *
 * **널리 인용되는 17.848·17.118·14.254를 옮겨 적지 않는 이유**는 철근의 0.006165와
 * 같다. 계수를 손으로 적으면 자릿수 하나가 틀려도 120칸이 한꺼번에 조용히
 * 어긋나고, 그러면 검사도 틀린 계수를 기준으로 서로 맞아떨어진다. 여기서는
 * 몰질량·그레인·갤런에서 만들고, 검사가 그 정의를 한 겹 더 되짚는다 —
 * 몰질량은 원자량에서, 그레인은 1/7000파운드에서, 미국 갤런은 231세제곱인치에서.
 *
 * ── 왜 °fH의 10이 중요한가 ──────────────────────────────
 * 프랑스 도만 정의가 ppm과 같은 물질(CaCO₃)이라 계수가 딱 10이다. 독일 도는
 * 물질이 CaO라 몰질량 비가 끼어 17.8477이라는 지저분한 값이 된다. 두 단위가
 * "10mg/L에 1도"라는 같은 꼴인데 값이 1.78배 다른 것이 여기서 온다.
 */
import { relatedWindow } from '../related-window.ts';
import {
  BAND_EDGES, GRAIN_MG, IMP_GALLON_L, MOLAR, CELLS, UNITS, US_GALLON_L, WRMG_MMOL,
  type UnitKey, slugOf,
} from './list.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/**
 * 단위 1에 해당하는 ppm — 정의에서 만든다.
 *
 * 이 표가 이 섹션의 전부다. 값을 적지 않고 식을 적었으므로, 몰질량이나 갤런을
 * 잘못 옮겨 적으면 널리 인용되는 값과 어긋나 검사에서 걸린다.
 */
export const PPM_PER: Record<UnitKey, number> = {
  ppm: 1,
  /* 1°dH = 10mg/L CaO — CaCO₃ 셈으로 옮기려면 몰질량 비를 곱한다 */
  dh: 10 * (MOLAR.caco3 / MOLAR.cao),
  /* 1°fH = 10mg/L CaCO₃ — 기준과 같은 물질이라 비가 끼지 않는다 */
  fh: 10,
  /* 1°e(클라크 도) = CaCO₃ 1그레인이 영국 갤런 하나에 든 농도 */
  e: GRAIN_MG / IMP_GALLON_L,
  /* 1gpg = CaCO₃ 1그레인이 미국 갤런 하나에 든 농도 */
  gpg: GRAIN_MG / US_GALLON_L,
  /* 1mmol/L = 몰질량만큼의 mg/L */
  mmol: MOLAR.caco3,
};

/** ppm을 그 단위의 값으로 */
export const toUnit = (ppm: number, key: UnitKey): number => ppm / PPM_PER[key];

/** 그 단위의 값을 ppm으로 — toUnit의 되돌림이다 */
export const toPpm = (value: number, key: UnitKey): number => value * PPM_PER[key];

/**
 * 등급 자리(0~3) — 경계를 넘을 때마다 한 칸 오른다.
 *
 * 경계값 자체는 아래쪽 등급에 넣는다(60ppm은 연수, 65ppm부터 약한 경수).
 * 흔히 인용되는 구간이 "0~60 연수"라고 닫힌 구간으로 적혀 있어서다.
 */
export const bandOf = (ppm: number): number => BAND_EDGES.filter(edge => ppm > edge).length;

/** 독일 WRMG 자리(0~2) — 같은 물을 다른 기준으로 가르면 등급이 달라진다 */
export const wrmgBandOf = (ppm: number): number =>
  WRMG_MMOL.filter(mmol => toUnit(ppm, 'mmol') > mmol).length;

/** WRMG 경계를 ppm과 °dH로 되짚은 값 — 화면이 "기준마다 다르다"를 숫자로 보인다 */
export const WRMG_EDGES = WRMG_MMOL.map(mmol => {
  const ppm = toPpm(mmol, 'mmol');
  return { mmol, ppm: round(ppm, 1), dh: round(toUnit(ppm, 'dh'), 2) };
});

/**
 * 단위로 찾아오는 사람을 받는 되짚기 색인의 눈금.
 *
 * 단위마다 한 걸음만 적고 여섯 배까지 늘린다 — 30개를 적는 대신 다섯 개다.
 * ppm은 축 자신이라 없다.
 */
const ANCHOR_STEP: Record<Exclude<UnitKey, 'ppm'>, number> = {
  dh: 5, fh: 10, e: 5, gpg: 5, mmol: 0.5,
};

const ANCHOR_COUNT = 6;

/** 눈금에서 그 ppm에 가장 가까운 칸 */
export const nearestPpm = (ppm: number): number =>
  CELLS.reduce((best, v) => (Math.abs(v - ppm) < Math.abs(best - ppm) ? v : best), CELLS[0]);

export interface Anchor {
  key: Exclude<UnitKey, 'ppm'>;
  /** 그 단위로 적은 어림수 — 10°dH, 5gpg 처럼 */
  value: number;
  /** 그 값이 정확히 몇 ppm인가 */
  exact: number;
  /** 눈금에서 가장 가까운 칸과 그 주소 */
  ppm: number;
  slug: string;
}

/**
 * "10°dH가 몇 ppm인가"로 들어오는 길.
 *
 * 단위마다 어림수 여섯을 세우고 가장 가까운 ppm 칸으로 잇는다. 주소를 단위별로
 * 새로 내지 않는 대신(까닭은 list.ts) 허브가 이 색인을 걸어 준다.
 */
export const ANCHORS: Anchor[] = (Object.keys(ANCHOR_STEP) as Exclude<UnitKey, 'ppm'>[])
  .flatMap(key =>
    Array.from({ length: ANCHOR_COUNT }, (_, i) => {
      const value = round(ANCHOR_STEP[key] * (i + 1), 3);
      const exact = toPpm(value, key);
      const ppm = nearestPpm(exact);
      return { key, value, exact: round(exact, 1), ppm, slug: slugOf(ppm) };
    }),
  );

export interface UnitValue {
  key: UnitKey;
  symbol: string;
  /** 화면에 남길 자리까지 자른 값 */
  value: number;
  digits: number;
}

export interface HardnessFacts {
  ppm: number;
  slug: string;
  /** 여섯 단위로 적은 같은 물 */
  values: UnitValue[];
  /** 우리가 고른 구간의 등급 자리(0~3) */
  band: number;
  /** 독일 WRMG 기준의 자리(0~2) — 기준이 다르면 등급도 다르다 */
  wrmgBand: number;
  /** 두 배 진한 물과 절반인 물 — 선형이라는 것을 화면에서 바로 보인다 */
  doublePpm: number;
  halfPpm: number;
  /** 이웃 칸 — 자기 자리 다음부터 원형으로 감아 고른다 */
  neighbours: string[];
}

/** 한 칸에서 뻗는 이웃 수 */
const NEAR = 6;

export function hardnessFacts(ppm: number): HardnessFacts {
  if (!CELLS.includes(ppm)) throw new Error(`눈금에 없는 경도: ${ppm}ppm`);

  /*
   * 이웃은 lib/related-window.ts가 고른다 — 자기 자리 다음부터 원형으로 감으므로
   * 눈금 뒤쪽 칸도 들어오는 링크가 0이 되지 않는다.
   *
   * 갈래를 안 가른다. 등급을 갈래로 넘겨 봤더니 들어오는 링크가 5~89로 벌어졌다 —
   * "매우 경수" 등급에 84칸이 몰려 있어서, 그 칸들이 쓰는 "다른 갈래" 한 자리가
   * 눈금을 한 바퀴 돌아 첫 칸(ppm-5)으로 죄다 쏟아졌다. 값 눈금에서는 옆 칸이
   * 곧 비슷한 물이라 갈래를 가릴 이유가 없고, 안 가리면 120칸이 정확히 여섯 번씩
   * 가리켜진다.
   */
  const near = relatedWindow(CELLS, ppm, NEAR);

  return {
    ppm,
    slug: slugOf(ppm),
    values: UNITS.map(u => ({
      key: u.key,
      symbol: u.symbol,
      value: round(toUnit(ppm, u.key), u.digits),
      digits: u.digits,
    })),
    band: bandOf(ppm),
    wrmgBand: wrmgBandOf(ppm),
    doublePpm: ppm * 2,
    halfPpm: round(ppm / 2, 1),
    neighbours: near.map(slugOf),
  };
}

/** 그 단위의 값만 꺼낸다 — 화면과 문장이 같은 자리로 자른 값을 쓴다 */
export const valueOf = (f: HardnessFacts, key: UnitKey): number =>
  f.values.find(v => v.key === key)!.value;

/** 같은 등급의 한 줄 — 허브가 등급별로 나눠 싣는다 */
export const atBand = (band: number): number[] => CELLS.filter(ppm => bandOf(ppm) === band);

/** 등급 수 — 경계가 셋이면 넷이다 */
export const BAND_COUNT = BAND_EDGES.length + 1;
