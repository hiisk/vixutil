/**
 * 이모지 설명 — 열 언어. 갈래별 파일에 나눠 두고 여기서 합친다.
 */
import type { Ten } from './types.ts';
import { EM_DESC_FACE } from './desc-face.ts';
import { EM_DESC_THING } from './desc-thing.ts';
import { EM_DESC_SYMBOL } from './desc-symbol.ts';
import { EM_DESC_HAND } from './desc-hand.ts';
import { EM_DESC_PEOPLE } from './desc-people.ts';
import { EM_DESC_MORE } from './desc-more.ts';

const LANG_ORDER = ['ko', 'en', 'es', 'pt', 'ja', 'de', 'fr', 'hi', 'zh', 'tw'] as const;
export type EmLangKey = typeof LANG_ORDER[number];

export const EM_DESC: Record<string, Ten> = { ...EM_DESC_FACE, ...EM_DESC_THING, ...EM_DESC_SYMBOL, ...EM_DESC_HAND, ...EM_DESC_PEOPLE, ...EM_DESC_MORE };

/** 그 언어의 설명 — 없으면 영어로 되돌린다 */
export function emojiDesc(slug: string, lang: EmLangKey): string {
  const row = EM_DESC[slug];
  if (!row) return '';
  return row[LANG_ORDER.indexOf(lang)] || row[1];
}
