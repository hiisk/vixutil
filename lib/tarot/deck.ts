/**
 * 타로 78장 — 메이저 22장만 적고 마이너 56장은 계산한다.
 *
 * 마이너 아르카나는 수트 네 개 × 계급 열넷이라 표를 손으로 적을 이유가 없다.
 * 이름도("컵 3", "Three of Cups") 해석도 수트가 가진 주제와 계급이 가진 단계를
 * 겹쳐 읽는 것이 전통적인 방법이라, 조합으로 만드는 편이 오히려 정확하다.
 *
 * 그래서 언어마다 적을 것은 메이저 22장 + 수트 4개 + 계급 14개 = 40덩어리다.
 * 78장을 열 언어로 적으면 780덩어리인데, 그중 어느 하나가 빠져도 아무도 못
 * 찾는다.
 */
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';

/** 에이스부터 왕까지 — 숫자 열 장과 인물 넉 장 */
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;
export type Rank = (typeof RANKS)[number];

export const SUITS: Suit[] = ['wands', 'cups', 'swords', 'pentacles'];

export interface Card {
  slug: string;
  /** 덱에서의 자리 — 메이저 0~21, 마이너 22~77 */
  id: number;
  arcana: 'major' | 'minor';
  /** 메이저의 번호 0~21 */
  number?: number;
  suit?: Suit;
  rank?: Rank;
}

/**
 * 메이저 22장의 주소 — 널리 쓰는 영어 이름을 그대로 쓴다.
 *
 * 이름을 언어마다 옮기더라도 주소는 하나여야 하고, 타로에서 그 하나는 영어다.
 */
export const MAJOR_SLUGS = [
  'the-fool', 'the-magician', 'the-high-priestess', 'the-empress', 'the-emperor',
  'the-hierophant', 'the-lovers', 'the-chariot', 'strength', 'the-hermit',
  'wheel-of-fortune', 'justice', 'the-hanged-man', 'death', 'temperance',
  'the-devil', 'the-tower', 'the-star', 'the-moon', 'the-sun',
  'judgement', 'the-world',
];

/** 마이너 주소 — three-of-cups 처럼 계급과 수트를 잇는다 */
const RANK_SLUGS: Record<Rank, string> = {
  1: 'ace', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven',
  8: 'eight', 9: 'nine', 10: 'ten', 11: 'page', 12: 'knight', 13: 'queen', 14: 'king',
};

export const rankSlug = (r: Rank): string => RANK_SLUGS[r];

export const minorSlug = (suit: Suit, rank: Rank): string => `${RANK_SLUGS[rank]}-of-${suit}`;

/** 78장 — 메이저 22장 다음에 완드·컵·소드·펜타클 순으로 열넷씩 */
export const CARDS: Card[] = [
  ...MAJOR_SLUGS.map((slug, i) => ({ slug, id: i, arcana: 'major' as const, number: i })),
  ...SUITS.flatMap((suit, si) =>
    RANKS.map(rank => ({
      slug: minorSlug(suit, rank),
      id: 22 + si * 14 + (rank - 1),
      arcana: 'minor' as const,
      suit,
      rank,
    })),
  ),
];

export const CARD_SLUGS = CARDS.map(c => c.slug);

export const cardOf = (slug: string): Card | undefined => CARDS.find(c => c.slug === slug);

export const cardsOfSuit = (suit: Suit): Card[] => CARDS.filter(c => c.suit === suit);

export const MAJORS = CARDS.filter(c => c.arcana === 'major');

/**
 * 수트마다 원소가 하나씩 붙는다 — 해석의 절반이 여기서 나온다.
 *
 * 완드는 불(의지·행동), 컵은 물(감정·관계), 소드는 공기(생각·말),
 * 펜타클은 흙(돈·몸)이다. 원소 이름은 언어마다 옮기지만 짝은 어디서나 같다.
 */
export const SUIT_ELEMENT: Record<Suit, 'fire' | 'water' | 'air' | 'earth'> = {
  wands: 'fire', cups: 'water', swords: 'air', pentacles: 'earth',
};

/** 목록과 공유 카드가 같은 그림을 쓴다 — 이 이모지가 카드 아이콘으로 그려진다 */
export const TAROT_ICON = '🃏';
