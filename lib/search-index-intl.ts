import { colorToolsIntl } from './color-tools-intl.ts';
import { timeToolsIntl } from './time-tools-intl.ts';
import { imageToolsIntl } from './image-tools-intl.ts';
import { soundToolsIntl } from './sound-tools-intl.ts';
import { foodToolsIntl } from './food-tools-intl.ts';
import { gameToolsIntl } from './game-tools-intl.ts';
import { deviceToolsIntl } from './device-tools-intl.ts';
import { textToolsIntl } from './text-tools-intl.ts';
import { CHECKLISTS_EN } from './checklist-en.ts';
import { CHECKLISTS_ZH } from './checklist-zh.ts';
import { QUIZZES_EN } from './quiz-en.ts';
import { QUIZZES_ZH } from './quiz-zh.ts';
import { TESTS_EN } from './test-en.ts';
import { TESTS_ZH } from './test-zh.ts';

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
export type SearchIntlLang = 'en' | 'zh';

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
  zh: [
    { slug: 'today', title: '今日运势', desc: '按星座、生肖、血型或 MBTI 看今天', icon: '🔮' },
    { slug: 'daily-tarot', title: '今日塔罗', desc: '从大阿尔卡纳中抽一张，一整天都一样', icon: '🃏' },
    { slug: 'tarot-yesno', title: '塔罗是与否', desc: '心里想着问题，抽一张牌', icon: '🔮' },
    { slug: 'tarot', title: '塔罗占卜', desc: '完整 78 张牌，四种牌阵，正位与逆位', icon: '🎴' },
    { slug: 'saju', title: '四柱（韩国传统命理）', desc: '四柱、五行、日干与大运', icon: '🀄' },
    { slug: 'today-color', title: '今日幸运色', desc: '今天的颜色与数字', icon: '🎨' },
    { slug: 'lucky-numbers', title: '幸运号码', desc: '按出生日期取六个号码，每天更新', icon: '🍀' },
    { slug: 'biorhythm', title: '生物节律', desc: '按出生日期算体力、情绪与智力周期', icon: '📈' },
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
  zh: [
    { slug: 'smile-score', title: '微笑评分', desc: '一张照片，给笑容打分', icon: '😄' },
    { slug: 'face-symmetry', title: '脸部对称', desc: '左右两半有多接近', icon: '🪞' },
    { slug: 'face-shape', title: '脸型判断', desc: '椭圆、圆、方还是心形', icon: '🥚' },
    { slug: 'golden-ratio', title: '黄金比例', desc: '五官比例与 1:1.618 的差距', icon: '📐' },
    { slug: 'personal-color', title: '个人色彩', desc: '从照片判断冷暖调', icon: '🎨' },
  ],
};

/** 언어별 검색 목록 — 실제로 그 언어에 있는 페이지만 담는다 */
export function searchIndexIntl(lang: SearchIntlLang): SearchIntlItem[] {
  const p = (sec: string, slug: string) => `/${lang}/${sec}/${slug}`;
  const tools = (sec: string, list: { slug: string; title: string; desc: string; icon: string }[]) =>
    list.map(t => ({ href: p(sec, t.slug), title: t.title, desc: t.desc, section: sec, icon: t.icon }));

  const checklists = lang === 'en' ? CHECKLISTS_EN : CHECKLISTS_ZH;
  const quizzes = lang === 'en' ? QUIZZES_EN : QUIZZES_ZH;
  const tests = lang === 'en' ? TESTS_EN : TESTS_ZH;

  return [
    ...tools('color', colorToolsIntl(lang)),
    ...tools('time', timeToolsIntl(lang)),
    ...tools('image', imageToolsIntl(lang)),
    ...tools('sound', soundToolsIntl(lang)),
    ...tools('food', foodToolsIntl(lang)),
    ...tools('game', gameToolsIntl(lang)),
    ...tools('device', deviceToolsIntl(lang)),
    ...tools('text', textToolsIntl(lang)),
    ...tools('checklist', checklists),
    ...tools('quiz', quizzes),
    ...tools('test', tests),
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
  zh: {
    title: '搜索',
    desc: '一次搜索站内所有工具 —— 换算、测试、问答、清单、小游戏等。不知道在哪个分类也能找到。',
    heading: '搜索', h1: '搜索 vixutil 的全部工具',
    countSuffix: n => `${n} 个工具`,
    placeholder: '按名称搜索 —— 计时器、坏点、量杯换克…',
    noResult: '没有匹配的结果。换个更短的词，或直接搜你想测的东西。',
    hint: '这里的一切都在浏览器内运行。无需注册，也不会上传。',
  },
};
