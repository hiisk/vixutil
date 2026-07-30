/**
 * 주사위 합 111가지 — 몇 개를 굴려 얼마가 나오는가.
 *
 * 자료라고 할 것이 거의 없다. 주사위 개수와 합, 두 숫자뿐이다. 경우의 수도
 * 확률도 순위도 전부 계산한다(facts.ts). 확률표를 손으로 옮겨 적으면 111줄에
 * 다섯 칸이고, 한 칸이 틀려도 그럴듯한 숫자라 아무도 못 잡는다.
 *
 * 주사위 여섯 면은 어느 나라에서나 여섯 면이다 — 옮길 이름이 없다.
 */
/** 한 개부터 여섯 개까지 — 굴릴 만한 범위이면서, 한 갈래가 통째로 들어간다 */
export const DICE_COUNTS = [1, 2, 3, 4, 5, 6];

/** 주사위 한 개의 면 수 */
export const FACES = 6;

export interface Roll {
  slug: string;
  /** 주사위 개수 */
  dice: number;
  /** 눈의 합 */
  sum: number;
}

/** n개를 굴렸을 때 나올 수 있는 합은 n부터 6n까지다 */
const rollsOf = (dice: number): Roll[] =>
  Array.from({ length: dice * FACES - dice + 1 }, (_, i) => ({
    slug: `${dice}d6-${dice + i}`,
    dice,
    sum: dice + i,
  }));

export const ROLLS: Roll[] = DICE_COUNTS.flatMap(rollsOf);

export const ROLL_SLUGS = ROLLS.map(r => r.slug);

export const rollOf = (slug: string): Roll | undefined => ROLLS.find(r => r.slug === slug);

export const rollsOfDice = (dice: number): Roll[] => ROLLS.filter(r => r.dice === dice);

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 주사위 아이콘으로 그려진다 */
export const DICE_ICON = '🎲';
