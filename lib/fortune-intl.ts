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
  BIRTH_INFO_EN, LUCKY_COLOR_INFO_EN, LOTTO_EN, CYCLES_EN, PHASE_LABEL_EN, BIORHYTHM_COMMENT_EN,
} from './fortune-en.ts';
import {
  FORTUNE_L10N, zodiacOf, animalsOf, bloodTypesOf, mbtiTypesOf, colorsOf,
  birthInfoOf, colorInfoOf, cyclesOf,
  type FortuneL10nLang, type BirthInfo, type ColorInfo, type Cycle, type CycleKey,
} from './fortune-l10n/index.ts';

export type Lang = 'ko' | 'en' | FortuneL10nLang;

/** 나중에 옮긴 여덟 언어인지 — 영어·한국어는 예전 자료 파일을 그대로 쓴다 */
function l10n(lang: Lang): lang is FortuneL10nLang {
  return lang !== 'ko' && lang !== 'en';
}

/** 언어별 주제 목록 — id는 열 언어가 동일하다 */
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
  if (l10n(lang)) return zodiacOf(lang);
  return lang === 'ko' ? ZODIAC_SIGNS : ZODIAC_SIGNS_EN;
}

export function animals(lang: Lang): readonly Subject[] {
  if (l10n(lang)) return animalsOf(lang);
  return lang === 'ko' ? ANIMALS : ANIMALS_EN;
}

export function bloodTypes(lang: Lang): readonly Subject[] {
  if (l10n(lang)) return bloodTypesOf(lang);
  return lang === 'ko' ? BLOOD_TYPES : BLOOD_TYPES_EN;
}

export function mbtiTypes(lang: Lang): readonly Subject[] {
  if (l10n(lang)) return mbtiTypesOf(lang);
  return lang === 'ko' ? MBTI_TYPES : MBTI_TYPES_EN;
}

/* ── 도구별 자료 — 예전에는 컴포넌트가 _EN 상수를 직접 읽어서 언어를 무시했다 ── */

export function birthInfo(lang: Lang): readonly BirthInfo[] {
  return l10n(lang) ? birthInfoOf(lang) : BIRTH_INFO_EN;
}

export function luckyColorInfo(lang: Lang): readonly ColorInfo[] {
  return l10n(lang) ? colorInfoOf(lang) : LUCKY_COLOR_INFO_EN;
}

export function lottoLabels(lang: Lang): { weekdays: readonly string[]; timeSlots: readonly string[] } {
  return l10n(lang) ? FORTUNE_L10N[lang].lotto : LOTTO_EN;
}

export type { CycleKey };

export function cycles(lang: Lang): readonly Cycle[] {
  return l10n(lang) ? cyclesOf(lang) : CYCLES_EN;
}

export function phaseLabels(lang: Lang): { high: string; low: string; critical: string } {
  return l10n(lang) ? FORTUNE_L10N[lang].phaseLabel : PHASE_LABEL_EN;
}

export function biorhythmComment(lang: Lang) {
  return l10n(lang) ? FORTUNE_L10N[lang].biorhythm : BIORHYTHM_COMMENT_EN;
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
  if (l10n(lang)) {
    const c = FORTUNE_L10N[lang];
    return {
      fortune: c.pool, advice: c.advice, items: c.items,
      keywords: c.keywords, colors: colorsOf(lang), directions: [...c.directions],
    };
  }
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

/**
 * 언어별 행운의 색 — [이름, hex]. hex는 열 언어가 같고 이름만 갈린다.
 * 이걸 안 거치고 LUCKY_COLORS_EN을 직접 읽으면 아홉 언어에 영어 색 이름이 나간다.
 */
export function luckyColors(lang: Lang): readonly [string, string][] {
  return pools(lang).colors;
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

/**
 * 한국어와 영어만 여기 적고, 나머지 여덟 언어는 언어 파일의 ui에서 꺼낸다.
 * 열쇠가 같아서 tsc가 빠진 항목을 잡는다.
 */
type UiKey = keyof FortuneCopyUi;
type FortuneCopyUi = (typeof FORTUNE_L10N)['es']['ui'];

const KO_EN: Record<UiKey, [string, string]> = {
  fortuneOf: ['운세', 'Horoscope'],
  todaysFortune: ['오늘의 종합운', 'Today’s overall'],
  overall: ['✨ 오늘의 총운', '✨ Overall'],
  advice: ['💡 오늘의 조언', '💡 Advice'],
  luck: ['🍀 오늘의 행운', '🍀 Today’s luck'],
  luckyColor: ['행운의 색', 'Lucky colour'],
  luckyNumber: ['행운의 숫자', 'Lucky number'],
  luckyDirection: ['행운의 방향', 'Lucky direction'],
  luckyItem: ['행운의 아이템', 'Lucky item'],
  love: ['연애운', 'Love'],
  money: ['금전운', 'Money'],
  work: ['직업운', 'Work'],
  health: ['건강운', 'Health'],
  share: ['공유', 'Share'],
  copied: ['복사됨', 'Copied'],
  disclaimer: [
    '운세는 오늘 날짜를 기준으로 생성되며 오락·참고 목적입니다',
    'Horoscopes are generated from today’s date and are for entertainment only',
  ],
};

export function t(key: UiKey, lang: Lang): string {
  if (l10n(lang)) return FORTUNE_L10N[lang].ui[key];
  return KO_EN[key][lang === 'ko' ? 0 : 1];
}

/**
 * 언어별 오늘 날짜 표기.
 *
 * toLocaleDateString에 언어 태그를 넘긴다 — 언어마다 순서와 구분자가 다르고
 * (스페인어는 "1 de agosto de 2026", 독일어는 "1. August 2026") 그걸 직접
 * 적기 시작하면 열 벌이 된다. 한자권만 예전처럼 손으로 만든다.
 */
const DATE_TAG: Record<Lang, string> = {
  ko: 'ko-KR', en: 'en-US', es: 'es-ES', 'pt-br': 'pt-BR', ja: 'ja-JP',
  de: 'de-DE', fr: 'fr-FR', hi: 'hi-IN', 'zh-hans': 'zh-Hans', 'zh-hant': 'zh-Hant',
};

export function formatToday(lang: Lang, d = new Date()): string {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  if (lang === 'ko') return `${y}년 ${m}월 ${day}일`;
  if (lang === 'ja' || lang === 'zh-hans' || lang === 'zh-hant') return `${y}年${m}月${day}日`;
  return d.toLocaleDateString(DATE_TAG[lang], { year: 'numeric', month: 'long', day: 'numeric' });
}
