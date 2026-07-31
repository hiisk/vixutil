/**
 * 카드 한 장에 들어가는 값 — 메이저는 적어 둔 것을, 마이너는 조합한 것을 준다.
 *
 * 화면은 두 종류를 구별할 필요가 없다. 이름도 해석도 여기서 만들어 같은 모양으로
 * 내보내므로, 페이지는 78장을 한 가지 방식으로 그린다.
 */
import type { Lang } from '../i18n/lang.ts';
import { CARDS, SUIT_ELEMENT, cardOf, cardsOfSuit, type Card, type Rank, type Suit } from './deck.ts';
import { MAJOR_COPY } from './majors.ts';
import { TAROT_UI } from './ui.ts';

export interface CardView {
  slug: string;
  id: number;
  arcana: 'major' | 'minor';
  name: string;
  upright: string;
  reversed: string;
  /** "메이저 아르카나 0번" 또는 "마이너 아르카나 · 컵 · 3" */
  kindLine: string;
  number?: number;
  suit?: Suit;
  suitName?: string;
  rank?: Rank;
  rankName?: string;
  elementName?: string;
}

export function cardView(slug: string, lang: Lang): CardView | null {
  const card = cardOf(slug);
  if (!card) return null;
  const ui = TAROT_UI[lang];

  if (card.arcana === 'major') {
    const copy = MAJOR_COPY[slug];
    return {
      slug,
      id: card.id,
      arcana: 'major',
      name: copy.name[lang],
      upright: copy.up[lang],
      reversed: copy.rev[lang],
      kindLine: ui.majorLine(card.number ?? 0),
      number: card.number,
    };
  }

  const suit = card.suit!;
  const rank = card.rank!;
  const suitName = ui.suitLabel[suit];
  const rankName = ui.rankLabel[rank];
  const suitTheme = ui.suitTheme[suit];
  const rankTheme = ui.rankTheme[rank];
  return {
    slug,
    id: card.id,
    arcana: 'minor',
    name: ui.minorName(suitName, rankName),
    // 계급이 가진 단계와 수트가 가진 주제를 겹쳐 읽는 것이 전통적인 방법이다
    upright: ui.minorReading(rankTheme, suitTheme),
    reversed: ui.minorReversed(rankTheme, suitTheme),
    kindLine: ui.minorLine(suitName, rankName),
    suit,
    suitName,
    rank,
    rankName,
    elementName: ui.elementLabel[SUIT_ELEMENT[suit]],
  };
}

/** 같은 수트의 나머지 열세 장 */
export function sameSuit(slug: string): Card[] {
  const card = cardOf(slug);
  if (!card?.suit) return [];
  return cardsOfSuit(card.suit).filter(c => c.slug !== slug);
}

/** 같은 숫자의 다른 수트 세 장 — 3이 네 영역에서 각각 어떻게 나타나는지 */
export function sameRank(slug: string): Card[] {
  const card = cardOf(slug);
  if (!card?.rank) return [];
  return CARDS.filter(c => c.rank === card.rank && c.slug !== slug);
}

/** 메이저는 앞뒤 카드를 잇는다 — 광대에서 세계까지 한 줄로 읽히도록 */
export function majorNeighbours(slug: string): Card[] {
  const card = cardOf(slug);
  if (card?.arcana !== 'major') return [];
  return CARDS.filter(c => c.arcana === 'major' && Math.abs((c.number ?? 0) - (card.number ?? 0)) === 1);
}
