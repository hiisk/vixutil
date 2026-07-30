/* ────────────────────────────────────────────────
   다국어 운세 조회 — vixutil.com

   fortune-data.ts의 시드 로직(seededInt·todaySeed·pick·starRating)을 그대로
   재사용한다. 별점과 뽑히는 인덱스가 언어와 무관하게 같은 시드에서 나오므로,
   같은 날 같은 별자리를 ko/en/zh로 열면 문장은 각 언어로 나오되
   별점·행운의 숫자는 일치한다. 언어를 바꿨더니 운세가 달라지는
   (그래서 어느 쪽이 "진짜"인지 알 수 없는) 상황을 피하기 위한 것이다.
──────────────────────────────────────────────── */
import {
  todaySeed, pick, pickIdx, seededInt, starRating,
  FORTUNE_POOL, ADVICE_POOL, LUCKY_ITEMS, KEYWORD_POOL, LUCKY_COLORS, LUCKY_DIRECTIONS,
  ZODIAC_SIGNS, ANIMALS, BLOOD_TYPES, MBTI_TYPES,
// 테스트가 node --test로 직접 이 파일을 불러오므로 확장자를 명시한다.
// (tsconfig의 allowImportingTsExtensions가 켜져 있어 빌드에도 문제없다)
} from './fortune-data.ts';
import {
  FORTUNE_POOL_EN, ADVICE_POOL_EN, LUCKY_ITEMS_EN, KEYWORD_POOL_EN, LUCKY_COLORS_EN, LUCKY_DIRECTIONS_EN,
  ZODIAC_SIGNS_EN, ANIMALS_EN, BLOOD_TYPES_EN, MBTI_TYPES_EN,
} from './fortune-en.ts';

export type Lang = 'ko' | 'en';

/** 언어별 주제 목록 — id는 세 언어가 동일하다 */
export interface Subject {
  id: string;
  name: string;
  emoji: string;
  period?: string;
  element?: string;
  ruling?: string;
  trait?: string;
  nickname?: string;
}

export function zodiacSigns(lang: Lang): readonly Subject[] {
  return lang === 'ko' ? ZODIAC_SIGNS : ZODIAC_SIGNS_EN;
}

export function animals(lang: Lang): readonly Subject[] {
  return lang === 'ko' ? ANIMALS : ANIMALS_EN;
}

export function bloodTypes(lang: Lang): readonly Subject[] {
  return lang === 'ko' ? BLOOD_TYPES : BLOOD_TYPES_EN;
}

export function mbtiTypes(lang: Lang): readonly Subject[] {
  return lang === 'ko' ? MBTI_TYPES : MBTI_TYPES_EN;
}

interface Pools {
  fortune: { overall: string[]; love: string[]; money: string[]; health: string[]; work: string[] };
  advice: string[];
  items: string[];
  keywords: string[];
  colors: [string, string][];
  directions: string[];
}

function pools(lang: Lang): Pools {
  if (lang === 'ko') {
    return {
      fortune: FORTUNE_POOL, advice: ADVICE_POOL, items: LUCKY_ITEMS,
      keywords: KEYWORD_POOL, colors: LUCKY_COLORS, directions: LUCKY_DIRECTIONS,
    };
  }
  return {
    fortune: FORTUNE_POOL_EN, advice: ADVICE_POOL_EN, items: LUCKY_ITEMS_EN,
    keywords: KEYWORD_POOL_EN, colors: LUCKY_COLORS_EN, directions: LUCKY_DIRECTIONS_EN,
  };
}

/** 오늘의 운세 조회 — 언어별 풀에서 뽑되 시드는 언어와 무관하다 */
export function getTodayFortuneIntl(subjectId: string, lang: Lang) {
  const p = pools(lang);

  const kwA = pickIdx(p.keywords, todaySeed(subjectId, 'kw1'));
  let kwB = pickIdx(p.keywords, todaySeed(subjectId, 'kw2'));
  if (kwB === kwA) kwB = (kwB + 1) % p.keywords.length;

  const [colorName, colorHex] = pick(p.colors, todaySeed(subjectId, 'color'));

  return {
    overall: pick(p.fortune.overall, todaySeed(subjectId, 'overall')),
    love:    pick(p.fortune.love,    todaySeed(subjectId, 'love')),
    money:   pick(p.fortune.money,   todaySeed(subjectId, 'money')),
    health:  pick(p.fortune.health,  todaySeed(subjectId, 'health')),
    work:    pick(p.fortune.work,    todaySeed(subjectId, 'work')),
    advice:    pick(p.advice, todaySeed(subjectId, 'advice')),
    luckyItem: pick(p.items,  todaySeed(subjectId, 'item')),
    keywords: [p.keywords[kwA], p.keywords[kwB]],
    luckyColor: colorName,
    luckyColorHex: colorHex,
    luckyNumber: (seededInt(todaySeed(subjectId, 'number')) % 30) + 1,
    luckyDirection: pick(p.directions, todaySeed(subjectId, 'direction')),
    stars: {
      overall: starRating(subjectId, 'star-overall'),
      love:    starRating(subjectId, 'star-love'),
      money:   starRating(subjectId, 'star-money'),
      health:  starRating(subjectId, 'star-health'),
      work:    starRating(subjectId, 'star-work'),
    },
  };
}

/* ── UI 문구 ── */
type Copy = Record<Lang, string>;
const c = (ko: string, en: string): Copy => ({ ko, en });

export const FORTUNE_UI = {
  fortuneOf:     c('운세', 'Horoscope'),
  todaysFortune: c('오늘의 종합운', 'Today’s overall'),
  overall:       c('✨ 오늘의 총운', '✨ Overall'),
  advice:        c('💡 오늘의 조언', '💡 Advice'),
  luck:          c('🍀 오늘의 행운', '🍀 Today’s luck'),
  luckyColor:    c('행운의 색', 'Lucky colour'),
  luckyNumber:   c('행운의 숫자', 'Lucky number'),
  luckyDirection: c('행운의 방향', 'Lucky direction'),
  luckyItem:     c('행운의 아이템', 'Lucky item'),
  love:          c('연애운', 'Love'),
  money:         c('금전운', 'Money'),
  work:          c('직업운', 'Work'),
  health:        c('건강운', 'Health'),
  share:         c('공유', 'Share'),
  copied:        c('복사됨', 'Copied'),
  disclaimer: c(
    '운세는 오늘 날짜를 기준으로 생성되며 오락·참고 목적입니다',
    'Horoscopes are generated from today’s date and are for entertainment only',
  ),
} as const;

export function t(key: keyof typeof FORTUNE_UI, lang: Lang): string {
  return FORTUNE_UI[key][lang];
}

/** 언어별 오늘 날짜 표기 */
export function formatToday(lang: Lang, d = new Date()): string {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  if (lang === 'ko') return `${y}년 ${m}월 ${day}일`;
  if (false) return `${y}年${m}月${day}日`;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
