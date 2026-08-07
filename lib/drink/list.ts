/**
 * 술 224칸 — 도수 열여섯 × 용량 열넷.
 *
 * 적는 자료는 눈금 두 줄과 상수 넷뿐이다. 술 이름과 도수를 표로 옮겨 적지
 * 않는 것은, 같은 소주라도 제품마다 도수가 다르고 해마다 내려가기 때문이다.
 * 도수를 축으로 두면 병에 적힌 숫자를 그대로 짚으면 된다.
 *
 * 이 표의 물음은 "한 잔"이 나라마다 다르다는 것이다. 영국은 8g, 세계보건기구는
 * 10g, 미국은 14g을 한 잔으로 센다. 같은 맥주 한 캔이 어디서는 두 잔이 넘고
 * 어디서는 한 잔 반이다(facts.ts).
 */

/** 에탄올 밀도(g/ml, 20℃) */
export const ETHANOL_G_PER_ML = 0.789;

/** 알코올 1g이 내는 열량(kcal) */
export const KCAL_PER_G = 7;

/** 미국이 한 잔으로 세는 순수 알코올 부피(fl oz) — 무게가 아니라 부피로 정의한다 */
export const US_FL_OZ = 0.6;
export const ML_PER_FL_OZ = 29.5735295625;

/** 영국이 1유닛으로 세는 순수 알코올 부피(ml) */
export const UK_UNIT_ML = 10;

/** 세계보건기구가 한 잔으로 세는 순수 알코올 무게(g) */
export const WHO_STANDARD_G = 10;

/** 도수(%) — 병에 적힌 숫자를 그대로 짚는다 */
export const ABVS: number[] = [3, 4, 4.5, 5, 6, 7, 12, 13, 14, 16, 17, 19, 25, 35, 40, 45];

/** 용량(ml) */
export const VOLUMES: number[] = [30, 50, 100, 150, 200, 250, 330, 355, 360, 440, 500, 640, 750, 1000];

/**
 * 눈금에 이름이 붙는 자리 — 이름만 적고 도수는 안 적는다.
 * 도수는 제품마다 다르므로 축에서 고르는 쪽이 맞다.
 */
export const VOLUME_LANDMARK: Record<number, string> = {
  30: 'shot',
  50: 'soju-glass',
  355: 'can',
  360: 'soju-bottle',
  500: 'pint',
  750: 'wine-bottle',
};

export interface Cell {
  /** 도수(%) */
  abv: number;
  /** 용량(ml) */
  ml: number;
}

export const CELLS: Cell[] = ABVS.flatMap(abv => VOLUMES.map(ml => ({ abv, ml })));

/** 4.5% → '4-5' */
export const abvKey = (abv: number): string => String(abv).replace('.', '-');

export const slugOf = (c: Cell): string => `${abvKey(c.abv)}-${c.ml}ml`;

export const DRINK_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const DRINK_ICON = '🍺';
