/**
 * 타로 스프레드(여러 장 뽑기)의 영어·중국어 문구.
 *
 * 뽑기·섞기는 lib/fortune-data.ts의 drawCards를 그대로 쓴다 — 78장 덱과 역방향
 * 확률이 세 언어에서 같아야 하기 때문이다. 여기에는 스프레드 이름과 자리 이름,
 * 수트 이름, 화면 문구만 둔다.
 *
 * 스프레드 id와 장수는 한국어와 공유한다. 자리 순서가 어긋나면 같은 카드가
 * 다른 뜻으로 읽히므로 배열 순서도 그대로 맞춘다.
 */
export type TarotSpreadLang = 'en';

export interface SpreadCopy {
  label: string;
  desc: string;
  positions: string[];
  posDesc: string[];
}

/** id·count는 한국어와 같다 — 문구만 갈아 끼운다 */
export const SPREAD_SHAPE = [
  { id: 'one' as const, icon: '✦', count: 1 },
  { id: 'three' as const, icon: '⏳', count: 3 },
  { id: 'relationship' as const, icon: '💕', count: 5 },
  { id: 'celtic' as const, icon: '✝️', count: 10 },
];

export const SPREADS_INTL: Record<TarotSpreadLang, Record<string, SpreadCopy>> = {
  en: {
    one: {
      label: 'One card', desc: 'A single message for today',
      positions: ['Today’s message'],
      posDesc: ['The one thing worth hearing right now'],
    },
    three: {
      label: 'Past · present · future', desc: 'Three cards across time',
      positions: ['Past', 'Present', 'Future'],
      posDesc: ['What shaped the situation you are in', 'The heart of where you stand now', 'Where this current is heading'],
    },
    relationship: {
      label: 'Relationship', desc: 'Five cards, both sides of a bond',
      positions: ['You', 'Them', 'The core of it', 'The obstacle', 'Where it goes'],
      posDesc: ['Your own feelings and state', 'Their feelings and state', 'The energy that actually defines this bond', 'What stands between the two of you', 'The direction this relationship is taking'],
    },
    celtic: {
      label: 'Celtic cross', desc: 'The full ten-card spread',
      positions: [
        'The situation', 'What crosses it', 'Conscious aim', 'Unconscious ground',
        'The recent past', 'The near future', 'Your stance',
        'The environment', 'Hopes and fears', 'The outcome',
      ],
      posDesc: [
        'The core of where you are at this moment',
        'The energy blocking or challenging your path',
        'What you consciously want and think about',
        'The feelings and foundation underneath, unexamined',
        'The recent past that shaped this situation',
        'What may plausibly arrive soon',
        'The position and attitude you are taking',
        'The influence of people and circumstances around you',
        'What you are hoping for, or dreading',
        'Where the whole current is heading',
      ],
    },
  },
};

/** 수트 이름·주제 — 색·이모지는 SUIT_INFO를 그대로 쓴다 */
export const SUIT_INTL: Record<TarotSpreadLang, Record<string, { name: string; theme: string }>> = {
  en: {
    wands: { name: 'Wands', theme: 'drive, creativity, will' },
    cups: { name: 'Cups', theme: 'emotion, relationships, intuition' },
    swords: { name: 'Swords', theme: 'thought, conflict, truth' },
    pentacles: { name: 'Pentacles', theme: 'material life, stability' },
  },
};

export const SPREAD_UI: Record<TarotSpreadLang, {
  metaTitle: string; metaDesc: string;
  h1: string; lead: string;
  spreadTitle: string; cardCount: (n: number) => string;
  deckTitle: string; fullDeck: string; majorOnly: string;
  drawBtn: (label: string, n: number) => string;
  revealAll: string; revealed: (a: number, b: number) => string; drawAgain: string;
  tapToReveal: string;
  tabDraw: string; tabList: string;
  majorHeading: string; minorHeading: string;
  upright: string; reversed: string;
  privacy: string; disclaimer: string;
  home: string; section: string;
}> = {
  en: {
    metaTitle: 'Tarot Reading Online — Free 78-Card Spreads',
    metaDesc: 'Draw a free tarot reading from the full 78-card deck: one card, past-present-future, a relationship spread or the full Celtic cross. Upright and reversed meanings for every card.',
    h1: 'Tarot Reading',
    lead: 'Pick a spread, draw from the full 78-card deck, and read each position with upright and reversed meanings.',
    spreadTitle: 'Spread', cardCount: n => `${n} cards`,
    deckTitle: 'Deck', fullDeck: 'Full 78', majorOnly: 'Major 22',
    drawBtn: (label, n) => `✦ Draw ${label} (${n})`,
    revealAll: 'Reveal all', revealed: (a, b) => `${a} of ${b} revealed`, drawAgain: 'Draw again',
    tapToReveal: 'Tap to reveal',
    tabDraw: '🃏 Draw', tabList: '📚 All cards',
    majorHeading: 'Major arcana', minorHeading: 'Minor arcana',
    upright: 'Upright', reversed: 'Reversed',
    privacy: 'The draw is random each time and nothing is stored or sent anywhere.',
    disclaimer: 'Tarot is for reflection and entertainment. Decisions that matter deserve real information and your own judgement.',
    home: 'Home', section: 'Horoscopes',
  },
};
