/**
 * 공기청정기 224칸 — 방 넓이 열여섯 × 청정능력 열넷.
 *
 * 적는 자료는 눈금 두 줄과 상수 셋뿐이다. 시간당 몇 번 공기가 갈리는지도,
 * 먼지가 절반으로 줄기까지 몇 분이 걸리는지도, 이 방에 필요한 청정능력이
 * 얼마인지도 전부 거기서 나온다(facts.ts).
 *
 * 광고에 적힌 "○○평형"과 실제로 필요한 크기가 갈리는 자리가 이 표의 물음이다.
 * 한국 표준(KS C 9314)의 표준사용면적은 자연 환기가 함께 일어난다고 보고 잰
 * 값이라, 창을 닫고 쓰는 방에서는 그만큼 여유가 없다.
 */

/** 1평은 여섯 자 곱하기 여섯 자 — 3.3058㎡다 */
export const SQM_PER_PYEONG = 400 / 121;

/** 시험실 천장 높이(m) — KS C 9314가 2.4m로 잰다. 미국 기준의 8피트와 거의 같다 */
export const CEILING_M = 2.4;

/** 널리 쓰이는 권장 환기 횟수(회/시) */
export const TARGET_ACH = 5;

/** 방 넓이(평) */
export const AREAS: number[] = [3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40];

/** 청정능력 CADR(㎥/분) — 한국 제품이 이 단위로 적는다 */
export const CADRS: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 24];

export const sqmOf = (pyeong: number): number => pyeong * SQM_PER_PYEONG;

/** CADR 값을 주소에 넣을 때 — 소수점이 없어 그대로 쓴다 */
export interface Cell {
  /** 방 넓이(평) */
  area: number;
  /** 청정능력(㎥/분) */
  cadr: number;
}

export const CELLS: Cell[] = AREAS.flatMap(area => CADRS.map(cadr => ({ area, cadr })));

export const slugOf = (c: Cell): string => `${c.area}p-${c.cadr}`;

export const PURIFIER_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const PURIFIER_ICON = '🌬️';
