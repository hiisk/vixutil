/**
 * 단축키 설명 — 열 언어. 앱별 파일에 나눠 두고 여기서 합친다.
 *
 * 키 이름은 옮기지 않는다. 옮기는 것은 무엇을 하는지와 무엇을 틀리기 쉬운지다.
 */
import type { Ten } from './types.ts';
import { SC_DESC_EDITOR } from './desc-editor.ts';
import { SC_DESC_OFFICE } from './desc-office.ts';
import { SC_DESC_DESIGN } from './desc-design.ts';
import { SC_DESC_PS } from './desc-photoshop.ts';

const LANG_ORDER = ['ko', 'en', 'es', 'pt', 'ja', 'de', 'fr', 'hi', 'zh', 'tw'] as const;
export type ScLangKey = typeof LANG_ORDER[number];

export const SC_DESC: Record<string, Ten> = { ...SC_DESC_EDITOR, ...SC_DESC_OFFICE, ...SC_DESC_DESIGN, ...SC_DESC_PS };

/** 그 언어의 설명 — 없으면 영어로 되돌린다 */
export function scDesc(slug: string, lang: ScLangKey): string {
  const row = SC_DESC[slug];
  if (!row) return '';
  return row[LANG_ORDER.indexOf(lang)] || row[1];
}
