import { colorToolsIntl } from './color-tools-intl.ts';
import { timeToolsIntl } from './time-tools-intl.ts';
import { imageToolsIntl } from './image-tools-intl.ts';
import { soundToolsIntl } from './sound-tools-intl.ts';
import { foodToolsIntl } from './food-tools-intl.ts';
import { gameToolsIntl } from './game-tools-intl.ts';
import { deviceToolsIntl } from './device-tools-intl.ts';
import { textToolsIntl } from './text-tools-intl.ts';
import { CHECKLISTS_EN } from './checklist-en.ts';
import { QUIZZES_EN } from './quiz-en.ts';
import { TESTS_EN } from './test-en.ts';

/**
 * 영어·중국어 통합 검색의 목록.
 *
 * 한국어 SEARCH_INDEX를 그대로 쓸 수 없다. 그쪽에는 계산기 107종과 크립토처럼
 * 번역하지 않은 것이 들어 있고, 체크리스트·퀴즈·심리테스트는 언어별로 항목
 * 자체가 다르다. 없는 페이지를 검색 결과로 내보내면 누르는 사람이 404를 본다.
 *
 * 그래서 언어별 도구 목록을 그대로 세어 만든다 — 어느 언어에 항목이 추가되면
 * 여기를 고치지 않아도 검색에 함께 잡힌다.
 */
export type SearchIntlLang = 'en';

export interface SearchIntlItem {
  href: string;
  title: string;
  desc: string;
  section: string;
  icon: string;
}

/** 운세·스냅은 슬러그가 세 언어에서 같아 목록을 여기 둔다 */
const FORTUNE: Record<SearchIntlLang, { slug: string; title: string; desc: string; icon: string }[]> = {
  en: [
    { slug: 'today', title: 'Today’s Fortune', desc: 'A reading for today by star sign, zodiac animal, blood type or MBTI', icon: '🔮' },
    { slug: 'daily-tarot', title: 'Today’s Tarot Card', desc: 'One card from the major arcana, the same all day', icon: '🃏' },
    { slug: 'tarot-yesno', title: 'Tarot Yes or No', desc: 'Hold a question in mind and draw one card', icon: '🔮' },
    { slug: 'tarot', title: 'Tarot Reading', desc: 'Full 78-card deck, four spreads, upright and reversed', icon: '🎴' },
    { slug: 'saju', title: 'Saju — Korean Four Pillars', desc: 'Your four pillars, five elements, day master and luck pillars', icon: '🀄' },
    { slug: 'today-color', title: 'Today’s Lucky Colour', desc: 'A colour and a number for today', icon: '🎨' },
    { slug: 'lucky-numbers', title: 'Lucky Numbers', desc: 'Six numbers from your date of birth, new each day', icon: '🍀' },
    { slug: 'biorhythm', title: 'Biorhythm', desc: 'Physical, emotional and intellectual cycles from your birth date', icon: '📈' },
  ],
};

const SNAP: Record<SearchIntlLang, { slug: string; title: string; desc: string; icon: string }[]> = {
  en: [
    { slug: 'smile-score', title: 'Smile Score', desc: 'One photo, and it scores the smile', icon: '😄' },
    { slug: 'face-symmetry', title: 'Face Symmetry', desc: 'How closely the two halves match', icon: '🪞' },
    { slug: 'face-shape', title: 'Face Shape', desc: 'Oval, round, square or heart', icon: '🥚' },
    { slug: 'golden-ratio', title: 'Golden Ratio', desc: 'Facial proportions against 1:1.618', icon: '📐' },
    { slug: 'personal-color', title: 'Personal Colour', desc: 'Warm or cool, from the photo', icon: '🎨' },
  ],
};

/** 언어별 검색 목록 — 실제로 그 언어에 있는 페이지만 담는다 */
export function searchIndexIntl(lang: SearchIntlLang): SearchIntlItem[] {
  const p = (sec: string, slug: string) => `/${lang}/${sec}/${slug}`;
  const tools = (sec: string, list: { slug: string; title: string; desc: string; icon: string }[]) =>
    list.map(t => ({ href: p(sec, t.slug), title: t.title, desc: t.desc, section: sec, icon: t.icon }));


  return [
    ...tools('color', colorToolsIntl(lang)),
    ...tools('time', timeToolsIntl(lang)),
    ...tools('image', imageToolsIntl(lang)),
    ...tools('sound', soundToolsIntl(lang)),
    ...tools('food', foodToolsIntl(lang)),
    ...tools('game', gameToolsIntl(lang)),
    ...tools('device', deviceToolsIntl(lang)),
    ...tools('text', textToolsIntl(lang)),
    ...tools('checklist', CHECKLISTS_EN),
    ...tools('quiz', QUIZZES_EN),
    ...tools('test', TESTS_EN),
    ...tools('fortune', FORTUNE[lang]),
    ...tools('snap', SNAP[lang]),
  ];
}

export const SEARCH_INTL_UI: Record<SearchIntlLang, {
  title: string; desc: string; heading: string; h1: string;
  countSuffix: (n: number) => string;
  placeholder: string; noResult: string; hint: string;
}> = {
  en: {
    title: 'Search',
    desc: 'Search every tool on the site at once — converters, tests, quizzes, checklists, games and more. You do not need to know which section it is in.',
    heading: 'Search', h1: 'Search every tool on vixutil',
    countSuffix: n => `${n} tools`,
    placeholder: 'Search by name — timer, dead pixel, cups to grams…',
    noResult: 'Nothing matched. Try a shorter word, or the name of the thing you want to measure.',
    hint: 'Everything here runs in your browser. No sign-up, nothing uploaded.',
  },
};
