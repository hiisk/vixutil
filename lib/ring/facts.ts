/**
 * 내주 하나에서 나라별 표기를 만든다.
 *
 * 반지 사이즈는 표가 아니라 산식이다. 손가락에 감기는 내주(둘레) C 하나가 있으면
 * 나머지는 전부 계산이다.
 *
 *   내경 지름  D = C ÷ π
 *   미국       D = 11.63 + 0.8128 × n   →   n = (D − 11.63) ÷ 0.8128
 *   일본·한국  호수 = C − 40
 *   EU         ISO 8653 사이즈 = C 그대로
 *
 * ── 미국 상수가 왜 저 값인가 ─────────────────────────────
 * 미국 규격은 인치로 정해져 있다 — US 0의 내경이 0.458인치, 한 번호마다 0.032인치다.
 * 밀리미터로 옮기면 0.458 × 25.4 = 11.6332, 0.032 × 25.4 = 0.8128이다. 널리 쓰이는
 * 표가 11.63으로 적으므로 그 값을 쓴다. 둘레로 치면 한 번호가 0.8128π = 2.55mm,
 * 곧 0.1인치쯤이라 "한 사이즈가 둘레 0.1인치"라는 말이 나왔다 — 어림이지 정의가
 * 아니어서, 계산은 지름 쪽 상수로 한다.
 *
 * ── 영국 문자 표기를 넣지 않은 까닭 ──────────────────────
 * 영국·아일랜드·호주는 A~Z에 ½를 붙여 부른다. 미국과 대응하는 표는 널리 돌아다니지만
 * 위의 셋처럼 **확실한 산식을 확인하지 못했다.** 어림한 규칙을 넣으면 반 치수가
 * 어긋나고, 반 치수 하나면 반지가 안 들어간다. 그래서 빼고, 왜 뺐는지를 화면에
 * 적는다(ui.ts의 ukNote). 나중에 규칙을 확인하면 여기 상수로 더하고 검사로 못 박는다.
 */
import { CELLS, bandOf, slugOf } from './list.ts';

/** 미국 US 0의 내경(mm)과 한 번호의 지름 증가(mm) — 0.458인치와 0.032인치 */
export const US_BASE_MM = 11.63;
export const US_STEP_MM = 0.8128;

/** 일본·한국 호수가 내주에서 빼는 수(mm) */
export const JP_OFFSET_MM = 40;

/** 인치를 함께 적는 자리에서만 쓴다 */
export const MM_PER_INCH = 25.4;

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/** 내주(mm) → 내경 지름(mm) */
export const diameterOf = (mm: number): number => mm / Math.PI;

/** 내경 지름(mm) → 내주(mm) */
export const circumferenceOf = (diameter: number): number => diameter * Math.PI;

/** 내주(mm) → 미국 번호. 반듯한 수가 아니라 규칙이 내놓는 실수 그대로다 */
export const usOf = (mm: number): number => (diameterOf(mm) - US_BASE_MM) / US_STEP_MM;

/** 미국 번호 → 내경 지름(mm) */
export const usDiameter = (n: number): number => US_BASE_MM + US_STEP_MM * n;

/** 미국 번호 → 내주(mm) — 되짚기의 반대쪽이다 */
export const usCircumference = (n: number): number => circumferenceOf(usDiameter(n));

/** 내주(mm) → 일본·한국 호수 */
export const jpOf = (mm: number): number => mm - JP_OFFSET_MM;

/** 호수 → 내주(mm) */
export const jpCircumference = (go: number): number => go + JP_OFFSET_MM;

/** 내주(mm) → EU·ISO 8653 사이즈. 같은 수라 함수가 하는 일이 없지만, 규칙을 코드에 남긴다 */
export const isoOf = (mm: number): number => mm;

/** 가게가 부르는 눈금 — 미국은 반 사이즈, 일본·한국은 정수 호수까지 있다 */
export const nearestUsHalf = (n: number): number => Math.round(n * 2) / 2;

/** 이웃을 몇 개 걸까 — 101칸이므로 낱장마다 정확히 이만큼 들어온다 */
const NEIGHBOURS = 6;

export interface RingFacts {
  /** 내주(mm) — 이 칸 자체다 */
  mm: number;
  slug: string;
  /** 내경 지름(mm) */
  diameter: number;
  /** 내경 지름(인치) — 미국 규격이 인치라 함께 적는다 */
  inch: number;
  /** 미국 번호, 규칙이 내놓는 값 그대로 */
  us: number;
  /** 가게에서 부르는 가장 가까운 반 사이즈 */
  usHalf: number;
  /** 그 반 사이즈의 내주(mm) */
  usHalfMm: number;
  /** 이 칸이 그 반 사이즈보다 얼마나 큰가(mm) — 부호가 있다 */
  usGap: number;
  /** 일본·한국 호수, 규칙이 내놓는 값 그대로 */
  jp: number;
  /** 가장 가까운 정수 호수 */
  jpWhole: number;
  /** 그 호수의 내주(mm) */
  jpWholeMm: number;
  /** EU·ISO 8653 */
  iso: number;
  /** 손가락 자리 구간(0~3) — list.ts의 BANDS */
  band: number;
  /** 이웃 여섯 — 자기 다음부터 원형으로 감는다 */
  neighbours: string[];
  /** 0.5mm 아래·위 */
  prev: string | null;
  next: string | null;
}

/**
 * 이웃을 자기 자리 **다음부터 원형으로** 고른다.
 *
 * "목록의 앞에서 여섯 개"로 고르면 앞쪽 여섯 칸만 서로 가리키고 일곱째부터는
 * 들어오는 링크가 0이 된다 — 사이트맵에는 있고 아무 페이지도 안 가리키는 낱장이다.
 * 이 저장소에서 세 섹션이 그 병을 앓았다(tests/reference-dicts.test.ts 머리말).
 * 감아 고르면 101칸이 정확히 여섯 곳에서 가리켜진다.
 */
function around(mm: number, limit = NEIGHBOURS): string[] {
  const i = CELLS.indexOf(mm);
  return CELLS.slice(i + 1).concat(CELLS.slice(0, i)).slice(0, limit).map(slugOf);
}

export function ringFacts(mm: number): RingFacts {
  const i = CELLS.indexOf(mm);
  if (i < 0) throw new Error(`목록에 없는 내주: ${mm}`);

  const us = usOf(mm);
  const usHalf = nearestUsHalf(us);
  const usHalfMm = usCircumference(usHalf);
  const jp = jpOf(mm);
  const jpWhole = Math.round(jp);

  return {
    mm,
    slug: slugOf(mm),
    diameter: round(diameterOf(mm)),
    inch: round(diameterOf(mm) / MM_PER_INCH, 3),
    us: round(us),
    usHalf,
    usHalfMm: round(usHalfMm),
    usGap: round(mm - usHalfMm),
    jp: round(jp, 1),
    jpWhole,
    jpWholeMm: round(jpCircumference(jpWhole), 1),
    iso: round(isoOf(mm), 1),
    band: bandOf(mm),
    neighbours: around(mm),
    prev: i > 0 ? slugOf(CELLS[i - 1]) : null,
    next: i < CELLS.length - 1 ? slugOf(CELLS[i + 1]) : null,
  };
}

/** 한 구간의 칸들 — 허브가 구간별로 묶어 보여 준다 */
export const atBand = (band: number): number[] => CELLS.filter(mm => bandOf(mm) === band);
