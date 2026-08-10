/**
 * 자전거 기어 168칸 — 앞 체인링 12가지 × 뒤 스프라켓 14가지.
 *
 * "이 기어가 무거운가 가벼운가"는 앞니 수만으로도, 뒷니 수만으로도 답이 안
 * 나온다. 53×19와 39×14는 앞뒤가 전혀 다른데 페달 한 바퀴에 나아가는 거리는
 * 거의 같다. 둘을 나눠야 비교할 수 있는 수 하나가 나온다(facts.ts).
 */

/**
 * 앞 체인링 잇수.
 *
 * 34·36은 컴팩트 크랭크의 작은 쪽, 50·52·53은 큰 쪽이다. 42·44·46은 싱글
 * 스피드와 픽시가 쓰는 자리다.
 */
export const CHAINRINGS: number[] = [34, 36, 38, 39, 40, 42, 44, 46, 48, 50, 52, 53];

/**
 * 뒤 스프라켓 잇수.
 *
 * 11부터 17까지는 한 이씩, 그 위는 실제 카세트가 건너뛰는 대로 벌어진다 —
 * 뒤로 갈수록 한 이의 차이가 작아져서 촘촘히 둘 이유가 없기 때문이다.
 */
export const COGS: number[] = [11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 28, 32, 36];

/**
 * 바퀴 한 바퀴가 나아가는 거리(mm).
 *
 * 700×25C의 실측 둘레로 널리 쓰는 값이다. 타이어 폭과 공기압에 따라 몇 mm씩
 * 다르지만, 기어끼리 견주는 데에는 같은 값을 쓰면 되므로 하나로 고정한다.
 */
export const WHEEL_MM = 2105;

/** 발전거리(gear inches)를 낼 때 쓰는 명목 바퀴 지름(인치) */
export const WHEEL_INCH = 26.3;

/** 견주는 데 쓰는 페달 회전수(rpm) — 오래 달릴 때의 흔한 값 */
export const CADENCES: number[] = [60, 80, 90, 100];

export interface Cell {
  /** 앞 체인링 잇수 */
  front: number;
  /** 뒤 스프라켓 잇수 */
  rear: number;
}

export const CELLS: Cell[] = CHAINRINGS.flatMap(front => COGS.map(rear => ({ front, rear })));

/** 53T × 19T → 53-19 */
export const slugOf = (c: Cell): string => `${c.front}-${c.rear}`;

export const GEAR_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const GEAR_ICON = '🚲';
