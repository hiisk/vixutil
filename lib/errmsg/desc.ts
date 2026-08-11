/**
 * 오류 설명 — 열 언어. 갈래별 파일에 나눠 두고 여기서 합친다.
 */
import type { Ten } from './types.ts';
import { ERR_DESC_VCS } from './desc-vcs.ts';
import { ERR_DESC_RUNTIME } from './desc-runtime.ts';

const LANG_ORDER = ['ko', 'en', 'es', 'pt', 'ja', 'de', 'fr', 'hi', 'zh', 'tw'] as const;
export type ErrLangKey = typeof LANG_ORDER[number];

export const ERR_DESC: Record<string, Ten> = { ...ERR_DESC_VCS, ...ERR_DESC_RUNTIME };

/** 그 언어의 설명 — 없으면 영어로 되돌린다 */
export function errDesc(slug: string, lang: ErrLangKey): string {
  const row = ERR_DESC[slug];
  if (!row) return '';
  return row[LANG_ORDER.indexOf(lang)] || row[1];
}
