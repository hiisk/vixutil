/**
 * 전자레인지 와트 환산 144칸 — 출력 열두 가지끼리 서로 옮긴다.
 *
 * 포장지에 적힌 "700W에서 3분"을 내 전자레인지로 옮기려면 시간을 고쳐야
 * 한다. 흡수하는 에너지가 출력 × 시간이므로, 출력이 커진 만큼 시간을 줄이면
 * 같은 양이 들어간다 — 반비례다(facts.ts).
 *
 * 두 축이 같은 목록이라 대각선은 자기 자신이다. 그 자리가 비율 1이 되는지가
 * 이 표의 첫 검사다.
 */

/** 출력(W) 열두 가지 — 가정용에서 흔한 값들 */
export const WATTS: number[] = [500, 600, 700, 750, 800, 900, 1000, 1100, 1200, 1300, 1500, 1700];

/** 기준으로 삼는 조리 시간(초) — 화면에 함께 내는 세 가지다 */
export const SAMPLE_SECONDS: number[] = [60, 180, 300];

export interface Cell {
  /** 포장지에 적힌 출력(W) */
  from: number;
  /** 내 전자레인지의 출력(W) */
  to: number;
}

export const CELLS: Cell[] = WATTS.flatMap(from => WATTS.map(to => ({ from, to })));

export const slugOf = (c: Cell): string => `${c.from}-${c.to}`;

export const MICROWAVE_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const MICROWAVE_ICON = '🍽️';
