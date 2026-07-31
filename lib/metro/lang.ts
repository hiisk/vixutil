/**
 * 지하철 섹션의 언어 — 공용 레지스트리를 그대로 쓴다.
 *
 * 언어 목록은 lib/i18n/lang.ts 한 곳에만 둔다. 이 섹션에서 처음 쓴 목록이
 * 다음 섹션에도 쓰이므로, 섹션마다 다시 적으면 언어를 더하거나 뺄 때 한 곳이
 * 남고 그 한 곳은 틀린 hreflang과 빈 화면으로만 드러난다.
 */
import {
  LANGS, LANG_CODES, alternates, langInfo as info, numberedLine as numbered, langPrefix,
  type L, type Lang, type LangInfo,
} from '../i18n/lang.ts';

export type MetroLang = Lang;
export type { L };
export type MetroLangInfo = LangInfo;

export const METRO_LANGS = LANGS;
export const METRO_LANG_CODES = LANG_CODES;
export const langInfo = info;
export const metroPrefix = langPrefix;
export const numberedLine = numbered;

/** hreflang 묶음 — 노선 slug만 넣으면 열한 줄이 기계적으로 나온다 */
export const metroAlternates = (slug?: string): Record<string, string> =>
  alternates(slug ? `/metro/${slug}` : '/metro');
