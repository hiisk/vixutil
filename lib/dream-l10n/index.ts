import type { DreamEntry } from '../dream-data.ts';
import type { DreamCopy, DreamId, DreamCategoryKey } from './types.ts';
import { ES } from './es.ts';
import { PT } from './pt-br.ts';
import { JA } from './ja.ts';
import { DE } from './de.ts';
import { FR } from './fr.ts';
import { HI } from './hi.ts';
import { ZH_HANS } from './zh-hans.ts';
import { ZH_HANT } from './zh-hant.ts';

/**
 * 나중에 옮긴 여덟 언어의 꿈해몽.
 *
 * 영어는 [[lib/dream-en.ts]]에 그대로 있다. 뼈대(id·이모지·분류·길흉)는 언어와
 * 무관하므로 여기 한 번만 두고, 언어 파일은 사람이 읽는 말만 갖는다 — 스무 항목의
 * 이모지를 아홉 벌 적어 두면 하나를 바꿀 때 아홉 곳을 오간다.
 */
export type DreamL10nLang = 'es' | 'pt-br' | 'ja' | 'de' | 'fr' | 'hi' | 'zh-hans' | 'zh-hant';

export const DREAM_L10N: Record<DreamL10nLang, DreamCopy> = {
  es: ES, 'pt-br': PT, ja: JA, de: DE, fr: FR, hi: HI, 'zh-hans': ZH_HANS, 'zh-hant': ZH_HANT,
};

/** 스무 항목의 뼈대 — 순서가 곧 화면의 순서다. 영어판과 같아야 한다. */
const SKELETON: { id: DreamId; emoji: string; category: DreamCategoryKey; luck: DreamEntry['luck'] }[] = [
  { id: 'falling', emoji: '🪂', category: 'Movement', luck: -1 },
  { id: 'teeth', emoji: '🦷', category: 'Body', luck: -1 },
  { id: 'flying', emoji: '🕊️', category: 'Movement', luck: 2 },
  { id: 'chased', emoji: '🏃', category: 'Movement', luck: -1 },
  { id: 'water', emoji: '🌊', category: 'Nature', luck: 1 },
  { id: 'snake', emoji: '🐍', category: 'Animals', luck: 1 },
  { id: 'house', emoji: '🏠', category: 'Places', luck: 1 },
  { id: 'death', emoji: '⚰️', category: 'People', luck: 0 },
  { id: 'baby', emoji: '👶', category: 'People', luck: 2 },
  { id: 'money', emoji: '💰', category: 'Objects', luck: 1 },
  { id: 'exam', emoji: '📝', category: 'Situations', luck: -1 },
  { id: 'naked', emoji: '🙈', category: 'Situations', luck: -1 },
  { id: 'fire', emoji: '🔥', category: 'Nature', luck: 0 },
  { id: 'lost', emoji: '🧭', category: 'Situations', luck: -1 },
  { id: 'cat', emoji: '🐱', category: 'Animals', luck: 0 },
  { id: 'bird', emoji: '🐦', category: 'Animals', luck: 1 },
  { id: 'mountain', emoji: '⛰️', category: 'Nature', luck: 1 },
  { id: 'mirror', emoji: '🪞', category: 'Objects', luck: 0 },
  { id: 'rain', emoji: '🌧️', category: 'Nature', luck: 1 },
  { id: 'road', emoji: '🛣️', category: 'Places', luck: 0 },
];

export const DREAM_CATEGORY_KEYS: DreamCategoryKey[] =
  ['Animals', 'Body', 'Movement', 'Nature', 'Objects', 'People', 'Places', 'Situations'];

export function dreamDataOf(lang: DreamL10nLang): DreamEntry[] {
  const c = DREAM_L10N[lang];
  return SKELETON.map(s => {
    const e = c.entries[s.id];
    return {
      id: s.id, emoji: s.emoji, luck: s.luck,
      category: c.categories[s.category] as DreamEntry['category'],
      keyword: e.keyword, summary: e.summary, detail: [...e.detail],
    };
  });
}

export function dreamCategoriesOf(lang: DreamL10nLang): string[] {
  const c = DREAM_L10N[lang];
  return DREAM_CATEGORY_KEYS.map(k => c.categories[k]);
}

/** `{ en: {...}, ...spreadDream('ui') }` 꼴로 표 하나를 여덟 언어로 펼친다 */
export function spreadDream<K extends keyof DreamCopy>(key: K): Record<DreamL10nLang, DreamCopy[K]> {
  const out = {} as Record<DreamL10nLang, DreamCopy[K]>;
  for (const lang of Object.keys(DREAM_L10N) as DreamL10nLang[]) out[lang] = DREAM_L10N[lang][key];
  return out;
}
