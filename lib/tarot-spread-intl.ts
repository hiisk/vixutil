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
export type TarotSpreadLang = 'en' | 'zh';

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
  zh: {
    one: {
      label: '单张', desc: '今天的一句话',
      positions: ['今日讯息'],
      posDesc: ['此刻最值得听的那一件事'],
    },
    three: {
      label: '过去 · 现在 · 未来', desc: '按时间看的三张牌',
      positions: ['过去', '现在', '未来'],
      posDesc: ['塑造了当下处境的过去', '你现在所处位置的核心', '这股流向要去的地方'],
    },
    relationship: {
      label: '关系牌阵', desc: '五张牌看关系的两边',
      positions: ['你', '对方', '关系的核心', '阻碍', '走向'],
      posDesc: ['你自己的情绪与状态', '对方的情绪与状态', '真正定义这段关系的能量', '挡在两人之间的东西', '这段关系正在走的方向'],
    },
    celtic: {
      label: '凯尔特十字', desc: '完整的十张牌阵',
      positions: [
        '当前处境', '横在其上的', '意识层目标', '潜意识根基',
        '刚过去的过去', '临近的未来', '你的态度',
        '外部环境', '希望与恐惧', '最终结果',
      ],
      posDesc: [
        '此刻你所处处境的核心',
        '阻挡或挑战你这条路的能量',
        '你有意识地想要与在想的事',
        '底下那层未被审视的情绪与根基',
        '塑造了这个处境的近期过去',
        '接下来可能会到来的事',
        '你在这件事上采取的立场与态度',
        '周围的人与环境带来的影响',
        '你怀着的期望，或是害怕的事',
        '整股流向最终要去的地方',
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
  zh: {
    wands: { name: '权杖', theme: '热情、创造、意志' },
    cups: { name: '圣杯', theme: '情感、关系、直觉' },
    swords: { name: '宝剑', theme: '思考、冲突、真相' },
    pentacles: { name: '星币', theme: '物质、现实、安稳' },
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
  zh: {
    metaTitle: '在线塔罗占卜 — 免费 78 张全牌阵',
    metaDesc: '用完整的 78 张塔罗牌免费占卜：单张、过去现在未来、关系牌阵，或完整的凯尔特十字。每张牌都有正位与逆位解释。',
    h1: '塔罗占卜',
    lead: '选一个牌阵，从完整的 78 张牌里抽牌，逐个位置读正位与逆位的含义。',
    spreadTitle: '牌阵', cardCount: n => `${n} 张`,
    deckTitle: '牌组', fullDeck: '全 78 张', majorOnly: '大牌 22 张',
    drawBtn: (label, n) => `✦ 抽${label}（${n} 张）`,
    revealAll: '全部翻开', revealed: (a, b) => `已翻开 ${a}/${b}`, drawAgain: '重新抽牌',
    tapToReveal: '点一下翻开',
    tabDraw: '🃏 抽牌', tabList: '📚 全部牌',
    majorHeading: '大阿尔卡纳', minorHeading: '小阿尔卡纳',
    upright: '正位', reversed: '逆位',
    privacy: '每次抽牌都是随机的，不保存任何内容，也不会发送到任何地方。',
    disclaimer: '塔罗用于自省与娱乐。重要的决定值得用充分的信息和自己的判断来做。',
    home: '首页', section: '运势',
  },
};
