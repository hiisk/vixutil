/**
 * 필라멘트 48칸 — 재료 8가지 × 스풀 무게 6가지.
 *
 * "1kg 스풀에 몇 미터 감겨 있나"는 재료만으로도 무게만으로도 답이 안 나온다.
 * 재료의 밀도로 1미터의 무게가 정해지고, 스풀 무게를 그것으로 나눠야 길이가
 * 나온다(facts.ts). 남은 무게로 남은 길이를 되짚는 것도 같은 식이다.
 *
 * 밀도는 재료의 물성이라 제조사가 달라도 거의 같다 — 여기 적은 값은 흔히
 * 공표되는 대표값이고, 채색제에 따라 몇 % 흔들린다.
 */

/** 재료와 밀도(g/cm³) — 3D프린팅에서 흔히 쓰는 여덟 가지 */
export const MATERIALS: { key: string; density: number }[] = [
  { key: 'pla', density: 1.24 },
  { key: 'abs', density: 1.04 },
  { key: 'petg', density: 1.27 },
  { key: 'tpu', density: 1.2 },
  { key: 'asa', density: 1.07 },
  { key: 'nylon', density: 1.14 },
  { key: 'pc', density: 1.2 },
  { key: 'hips', density: 1.04 },
];

/** 흔히 파는 스풀 무게(g) — 필라멘트 순 무게이지 스풀 포함이 아니다 */
export const SPOOLS: number[] = [250, 500, 750, 1000, 2000, 3000];

/**
 * 필라멘트 지름(mm).
 *
 * 1.75가 사실상 표준이고 2.85(볼든 계열)가 남아 있다. 한 칸 안에서 두 지름을
 * 나란히 보여 준다 — 지름이 축이 되면 칸만 늘고 묻는 말은 같기 때문이다.
 */
export const DIAMETERS: number[] = [1.75, 2.85];

export interface Cell {
  /** 재료 열쇠 */
  material: string;
  /** 스풀 무게(g) */
  grams: number;
}

export const CELLS: Cell[] = MATERIALS.flatMap(m => SPOOLS.map(grams => ({ material: m.key, grams })));

/** PLA 1kg → pla-1000g */
export const slugOf = (c: Cell): string => `${c.material}-${c.grams}g`;

export const FILAMENT_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const materialOf = (key: string) => MATERIALS.find(m => m.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const FILAMENT_ICON = '🧵';
