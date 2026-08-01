import type { FortuneCopy, ZodiacId, AnimalId, BloodId, MbtiId } from './types.ts';
import { ES } from './es.ts';
import { PT } from './pt-br.ts';
import { JA } from './ja.ts';
import { DE } from './de.ts';
import { FR } from './fr.ts';
import { HI } from './hi.ts';
import { ZH_HANS } from './zh-hans.ts';
import { ZH_HANT } from './zh-hant.ts';

/**
 * 나중에 옮긴 여덟 언어의 운세 문구.
 *
 * 영어는 [[lib/fortune-en.ts]]에 그대로 두었다 — 이 층이 생기기 전에 쓰인 자료라
 * 지금 옮기면 diff가 커지기만 하고 얻는 게 없다. 대신 이 파일이 그 파일과 같은
 * 모양을 내주므로, 부르는 쪽은 언어만 넘기면 된다.
 *
 * 뼈대(id·이모지·hex·주기 일수)는 언어와 무관해서 여기 한 번만 둔다. 색 하나를
 * 바꿀 때 아홉 곳을 고치지 않아도 되고, 무엇보다 **같은 시드가 언어와 상관없이
 * 같은 색을 고르도록** 순서가 한 곳에서 정해진다.
 */
export type FortuneL10nLang = 'es' | 'pt-br' | 'ja' | 'de' | 'fr' | 'hi' | 'zh-hans' | 'zh-hant';

export const FORTUNE_L10N: Record<FortuneL10nLang, FortuneCopy> = {
  es: ES, 'pt-br': PT, ja: JA, de: DE, fr: FR, hi: HI, 'zh-hans': ZH_HANS, 'zh-hant': ZH_HANT,
};

/* ── 언어와 무관한 뼈대 ── */

const ZODIAC_SKELETON: { id: ZodiacId; emoji: string }[] = [
  { id: 'aries', emoji: '♈' }, { id: 'taurus', emoji: '♉' }, { id: 'gemini', emoji: '♊' },
  { id: 'cancer', emoji: '♋' }, { id: 'leo', emoji: '♌' }, { id: 'virgo', emoji: '♍' },
  { id: 'libra', emoji: '♎' }, { id: 'scorpio', emoji: '♏' }, { id: 'sagittarius', emoji: '♐' },
  { id: 'capricorn', emoji: '♑' }, { id: 'aquarius', emoji: '♒' }, { id: 'pisces', emoji: '♓' },
];

const ANIMAL_SKELETON: { id: AnimalId; emoji: string }[] = [
  { id: 'rat', emoji: '🐭' }, { id: 'ox', emoji: '🐂' }, { id: 'tiger', emoji: '🐯' },
  { id: 'rabbit', emoji: '🐰' }, { id: 'dragon', emoji: '🐲' }, { id: 'snake', emoji: '🐍' },
  { id: 'horse', emoji: '🐴' }, { id: 'goat', emoji: '🐑' }, { id: 'monkey', emoji: '🐒' },
  { id: 'rooster', emoji: '🐓' }, { id: 'dog', emoji: '🐕' }, { id: 'pig', emoji: '🐷' },
];

const BLOOD_SKELETON: { id: BloodId; emoji: string }[] = [
  { id: 'A', emoji: '🅰️' }, { id: 'B', emoji: '🅱️' }, { id: 'O', emoji: '🅾️' }, { id: 'AB', emoji: '🆎' },
];

const MBTI_SKELETON: { id: MbtiId; emoji: string }[] = [
  { id: 'ISTJ', emoji: '🏛️' }, { id: 'ISFJ', emoji: '🛡️' }, { id: 'INFJ', emoji: '🔭' }, { id: 'INTJ', emoji: '🧠' },
  { id: 'ISTP', emoji: '🔧' }, { id: 'ISFP', emoji: '🎨' }, { id: 'INFP', emoji: '🌿' }, { id: 'INTP', emoji: '💡' },
  { id: 'ESTP', emoji: '⚡' }, { id: 'ESFP', emoji: '🎉' }, { id: 'ENFP', emoji: '✨' }, { id: 'ENTP', emoji: '🚀' },
  { id: 'ESTJ', emoji: '📊' }, { id: 'ESFJ', emoji: '🤝' }, { id: 'ENFJ', emoji: '🎤' }, { id: 'ENTJ', emoji: '🦅' },
];

/** 행운 색 열두 개의 hex — 순서가 곧 시드가 고르는 자리다. 영어판과 같아야 한다. */
const COLOR_HEX = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#6366f1',
  '#a855f7', '#ec4899', '#f1f5f9', '#f59e0b', '#94a3b8', '#14b8a6',
] as const;

/**
 * 오늘의 행운 색 카드에 쓰는 hex.
 *
 * 열두 개로 개수는 같지만 LUCKY_COLORS와 목록이 다르다 — 여섯 번째가 남색이
 * 아니라 감색이고, 열 번째는 은색이 아니라 검정이다. 영어판이 그렇게 되어 있어
 * 그대로 맞춘다. 이름도 colorInfo가 따로 갖는다.
 */
const COLOR_INFO_HEX = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#4338ca',
  '#a855f7', '#ec4899', '#e2e8f0', '#334155', '#f59e0b', '#14b8a6',
] as const;

/** 탄생석 이모지와 색 — 보석 자체는 언어와 무관하다 */
const BIRTH_SKELETON = [
  { month: 1, emoji: '❤️', color: '#9b1b30' },
  { month: 2, emoji: '🟣', color: '#8b5cf6' },
  { month: 3, emoji: '🩵', color: '#7fd4d4' },
  { month: 4, emoji: '💎', color: '#b9f2ff' },
  { month: 5, emoji: '💚', color: '#2ecc71' },
  { month: 6, emoji: '🤍', color: '#f4f0e6' },
  { month: 7, emoji: '❤️‍🔥', color: '#e0115f' },
  { month: 8, emoji: '🫒', color: '#9bbb59' },
  { month: 9, emoji: '🔷', color: '#0f52ba' },
  { month: 10, emoji: '🌈', color: '#a8c3bc' },
  { month: 11, emoji: '🟡', color: '#ffc87c' },
  { month: 12, emoji: '🩵', color: '#30d5c8' },
] as const;

/** 바이오리듬 주기 — 일수는 언어와 무관하다 */
const CYCLE_SKELETON = [
  { key: 'physical', period: 23, emoji: '💪' },
  { key: 'emotional', period: 28, emoji: '💗' },
  { key: 'intellectual', period: 33, emoji: '🧠' },
] as const;

/* ── 조립 ── */

export interface Subject {
  id: string; name: string; emoji: string;
  period?: string; element?: string; ruling?: string; trait?: string; nickname?: string;
}

export function zodiacOf(lang: FortuneL10nLang): Subject[] {
  const c = FORTUNE_L10N[lang];
  return ZODIAC_SKELETON.map(s => ({
    id: s.id, emoji: s.emoji, name: c.zodiac[s.id].name,
    period: c.zodiacPeriod[s.id], element: c.zodiac[s.id].element, ruling: c.zodiac[s.id].ruling,
  }));
}

export function animalsOf(lang: FortuneL10nLang): Subject[] {
  const c = FORTUNE_L10N[lang];
  return ANIMAL_SKELETON.map(s => ({ id: s.id, emoji: s.emoji, name: c.animals[s.id].name, trait: c.animals[s.id].trait }));
}

export function bloodTypesOf(lang: FortuneL10nLang): Subject[] {
  const c = FORTUNE_L10N[lang];
  return BLOOD_SKELETON.map(s => ({
    id: s.id, emoji: s.emoji,
    name: c.bloodTypes[s.id].name, nickname: c.bloodTypes[s.id].nickname, trait: c.bloodTypes[s.id].trait,
  }));
}

export function mbtiTypesOf(lang: FortuneL10nLang): Subject[] {
  const c = FORTUNE_L10N[lang];
  return MBTI_SKELETON.map(s => ({
    id: s.id, emoji: s.emoji, name: s.id,
    nickname: c.mbti[s.id].nickname, trait: c.mbti[s.id].trait,
  }));
}

export function colorsOf(lang: FortuneL10nLang): [string, string][] {
  return FORTUNE_L10N[lang].colors.map((name, i) => [name, COLOR_HEX[i]] as [string, string]);
}

export interface BirthInfo {
  month: number; stone: string; emoji: string; color: string;
  stoneMeaning: string; flower: string; flowerMeaning: string; blurb: string;
}

export function birthInfoOf(lang: FortuneL10nLang): BirthInfo[] {
  const c = FORTUNE_L10N[lang];
  return BIRTH_SKELETON.map((s, i) => ({ month: s.month, emoji: s.emoji, color: s.color, ...c.birthInfo[i] }));
}

export interface ColorInfo {
  name: string; hex: string; meaning: string; tip: string; keywords: readonly string[];
}

export function colorInfoOf(lang: FortuneL10nLang): ColorInfo[] {
  return FORTUNE_L10N[lang].colorInfo.map((info, i) => ({ hex: COLOR_INFO_HEX[i], ...info }));
}

export type CycleKey = 'physical' | 'emotional' | 'intellectual';

export interface Cycle {
  key: CycleKey; label: string; period: number; emoji: string; desc: string;
}

export function cyclesOf(lang: FortuneL10nLang): Cycle[] {
  const c = FORTUNE_L10N[lang];
  return CYCLE_SKELETON.map((s, i) => ({ key: s.key, period: s.period, emoji: s.emoji, ...c.cycles[i] }));
}
